import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

def find_omr_corners(thresh_img, orig_img):
    """ওএমআর শিটের ৪ কোণার স্কয়ার মার্কার নিখুঁতভাবে খোঁজার ফাংশন"""
    contours, _ = cv2.findContours(thresh_img, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    detected_centers = []

    for cnt in contours:
        approx = cv2.approxPolyDP(cnt, 0.04 * cv2.arcLength(cnt, True), True)
        if len(approx) == 4: # চারকোনা বক্স খুঁজছি
            x, y, w, h = cv2.boundingRect(approx)
            aspect_ratio = w / float(h)
            area = cv2.contourArea(cnt)
            
            # মার্কারের সাইজ ও অনুপাত ফিল্টার (স্ক্রিনশটের বক্সের মতো)
            if 150 < area < 5000 and 0.8 <= aspect_ratio <= 1.2:
                M = cv2.moments(cnt)
                if M["m00"] != 0:
                    cx = int(M["m10"] / M["m00"])
                    cy = int(M["m01"] / M["m00"])
                    detected_centers.append((cx, cy))

    # ডুপ্লিকেট বা কাছাকাছি বিন্দু থাকলে তা বাদ দেওয়া
    clean_centers = []
    for pt in detected_centers:
        if all(np.linalg.norm(np.array(pt) - np.array(c)) > 20 for c in clean_centers):
            clean_centers.append(pt)

    if len(clean_centers) != 4:
        return None

    # ৪টি বিন্দুকে ক্রমানুসারে সাজানো: Top-Left, Top-Right, Bottom-Right, Bottom-Left
    pts = np.array(clean_centers, dtype="float32")
    rect = np.zeros((4, 2), dtype="float32")
    
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]       # Top-Left
    rect[2] = pts[np.argmax(s)]       # Bottom-Right
    
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]    # Top-Right
    rect[3] = pts[np.argmax(diff)]    # Bottom-Left

    return rect

def get_bubble_darkness(thresh_img, cx, cy, r=6):
    mask = np.zeros(thresh_img.shape, dtype="uint8")
    cv2.circle(mask, (int(cx), int(cy)), r, 255, -1)
    mask = cv2.bitwise_and(thresh_img, thresh_img, mask=mask)
    return cv2.countNonZero(mask)

@app.route('/scan-omr', methods=['POST'])
def scan_omr():
    try:
        file = request.files['image']
        questions_data = json.loads(request.form['questions'])
        
        filestr = file.read()
        npimg = np.frombuffer(filestr, np.uint8)
        image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        
        # ইমেজ প্রি-প্রসেসিং
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        thresh = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2)
        
        # কোণার মার্কার খোঁজা
        corners = find_omr_corners(thresh, image)
        
        if corners is None:
            return jsonify({
                "status": "error", 
                "message": "ওএমআর শিটের ৪ কোণার স্কয়ার মার্কার পাওয়া যায়নি। ক্যামেরা সোজা ও আলো পরিষ্কার রাখুন।"
            })
            
        # 🟢 প্রপার ক্রপ এবং সোজা করা (Warp Perspective) - ঠিক ৫০০x৭০০ সাইজে কনভার্ট হবে
        dst = np.array([[0, 0], [500, 0], [500, 700], [0, 700]], dtype="float32")
        M = cv2.getPerspectiveTransform(corners, dst)
        warped_gray = cv2.warpPerspective(gray, M, (500, 700))
        warped_thresh = cv2.threshold(warped_gray, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
        
        # ১. বুকলেট নম্বর রিড (৬ কলাম) - আপনার ফিজিক্যাল শিটের রেশিও অনুযায়ী
        detected_booklet = ""
        booklet_start_x = 288 
        booklet_start_y = 78 
        for col in range(6):
            max_d = -1
            selected_digit = 0
            for digit in range(10):
                bx = booklet_start_x + (col * 14.5)
                by = booklet_start_y + (digit * 13.5)
                d = get_bubble_darkness(warped_thresh, bx, by, r=4)
                if d > 35 and d > max_d:
                    max_d = d
                    selected_digit = digit
            detected_booklet += str(selected_digit)

        # ২. রোল নম্বর রিড (৬ কলাম)
        detected_roll = ""
        roll_start_x = 385 
        roll_start_y = 78 
        for col in range(6):
            max_d = -1
            selected_digit = 0
            for digit in range(10):
                bx = roll_start_x + (col * 14.5)
                by = roll_start_y + (digit * 13.5)
                d = get_bubble_darkness(warped_thresh, bx, by, r=4)
                if d > 35 and d > max_d:
                    max_d = d
                    selected_digit = digit
            detected_roll += str(selected_digit)

        # ৩. প্রশ্নের বাবল এনালাইসিস গ্রিড (৮৪ বা ১০০ প্রশ্নের জন্য ৪টি প্রধান কলাম)
        correct_count = 0
        wrong_count = 0
        blank_count = 0
        ring_overlays = []
        
        ans_start_y = 388  # পার্ট-বি এর বাবল শুরুর ওয়াই কোঅর্ডিনেট
        column_x_offsets = [35, 155, 275, 395] # ৪টি কলামের এক্স স্টার্ট
        
        for i, q in enumerate(questions_data):
            correct_opt = q['correct'] # ০=A, ১=B, ২=C, ৩=D
            col_idx = i // 21  # প্রতি কলামে ২১টি করে প্রশ্ন (আপনার ইমেজ অনুযায়ী ১-২১, ২২-৪২...)
            row_idx = i % 21
            
            col_x = column_x_offsets[col_idx]
            row_y = ans_start_y + (row_idx * 13.8)
            
            best_opt = -1
            max_pixels = 0
            
            for opt in range(4):
                bubble_x = col_x + 30 + (opt * 14.2)
                bubble_y = row_y + 5
                darkness = get_bubble_darkness(warped_thresh, bubble_x, bubble_y, r=4)
                
                if darkness > 40 and darkness > max_pixels:
                    max_pixels = darkness
                    best_opt = opt
            
            if best_opt == correct_opt:
                correct_count += 1
                color = "green"
                target_opt = correct_opt
            elif best_opt == -1:
                blank_count += 1
                color = "yellow"
                target_opt = correct_opt
            else:
                wrong_count += 1
                color = "red"
                target_opt = best_opt
                
            ring_x = col_x + 30 + (target_opt * 14.2)
            ring_y = row_y + 5
            ring_overlays.append({"x": int(ring_x), "y": int(ring_y), "color": color})
            
        total_score = (correct_count * 1) - (wrong_count * 0.25)
        
        return jsonify({
            "status": "success",
            "rollNumber": detected_roll,
            "bookletNo": detected_booklet,
            "correct": correct_count,
            "wrong": wrong_count,
            "blank": blank_count,
            "score": round(total_score, 2),
            "rings": ring_overlays,
            "totalQuestions": len(questions_data)
        })
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
