import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

def order_points(pts):
    rect = np.zeros((4, 2), dtype="float32")
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
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
        
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        thresh = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2)
        
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        detected_markers = []
        for cnt in contours:
            x, y, w, h = cv2.boundingRect(cnt)
            aspect_ratio = w / float(h)
            area = w * h
            if 100 < area < 3000 and 0.8 <= aspect_ratio <= 1.2:
                detected_markers.append([x + w//2, y + h//2])
                
        if len(detected_markers) != 4:
            return jsonify({"status": "error", "message": f"৪টি মার্কার পাওয়া যায়নি। মাত্র {len(detected_markers)}টি পাওয়া গেছে। ওএমআর সোজা রাখুন।"})
            
        pts = np.array(detected_markers, dtype="float32")
        rect = order_points(pts)
        dst = np.array([[0, 0], [500, 0], [500, 700], [0, 700]], dtype="float32")
        M = cv2.getPerspectiveTransform(rect, dst)
        warped_gray = cv2.warpPerspective(gray, M, (500, 700))
        
        warped_thresh = cv2.threshold(warped_gray, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
        
        # ১. বুকলেট নম্বর অটো রিড (৬ কলাম)
        detected_booklet = ""
        booklet_start_x = 45 
        booklet_start_y = 95 
        for col in range(6):
            max_d = -1
            selected_digit = 0
            for digit in range(10):
                bx = booklet_start_x + (col * 16)
                by = booklet_start_y + (digit * 15)
                d = get_bubble_darkness(warped_thresh, bx, by, r=5)
                if d > 45 and d > max_d:
                    max_d = d
                    selected_digit = digit
            detected_booklet += str(selected_digit)

        # ২. রোল নম্বর অটো রিড (৬ কলাম)
        detected_roll = ""
        roll_start_x = 320 
        roll_start_y = 95 
        for col in range(6):
            max_d = -1
            selected_digit = 0
            for digit in range(10):
                bx = roll_start_x + (col * 16)
                by = roll_start_y + (digit * 15)
                d = get_bubble_darkness(warped_thresh, bx, by, r=5)
                if d > 45 and d > max_d:
                    max_d = d
                    selected_digit = digit
            detected_roll += str(selected_digit)

        # ৩. ১০০টি ওএমআর বাবল এনালাইসিস ইঞ্জিন (৪টি প্রধান কলাম)
        correct_count = 0
        wrong_count = 0
        blank_count = 0
        ring_overlays = []
        
        ans_start_y = 310
        column_x_offsets = [35, 155, 275, 395] 
        
        for i, q in enumerate(questions_data):
            correct_opt = q['correct']
            col_idx = i // 25
            row_idx = i % 25
            
            col_x = column_x_offsets[col_idx]
            row_y = ans_start_y + (row_idx * 14.5)
            
            best_opt = -1
            max_pixels = 0
            
            for opt in range(4):
                bubble_x = col_x + 32 + (opt * 15)
                bubble_y = row_y + 6
                darkness = get_bubble_darkness(warped_thresh, bubble_x, bubble_y, r=5)
                
                if darkness > 50 and darkness > max_pixels:
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
                
            ring_x = col_x + 32 + (target_opt * 15)
            ring_y = row_y + 6
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
