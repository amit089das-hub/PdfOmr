// ==========================================
// ১. গলোবাল ডেটা স্টোরেজ ভেরিয়েবল
// ==========================================
let loadedQuestions = [];
let currentBookletNo = ""; 

const languageMap = {
    bn: "বাংলা (Bengali)",
    en: "English",
    hi: "হিন্দি (Hindi)",
    or: "ওড়িয়া (Oriya)"
};

// ==========================================
// ২. সমস্ত কোর ইউটিলিটি ফাংশনস (সবার আগে ডিফাইন করা হলো)
// ==========================================

// ৬ ডিজিটের র্যান্ডম বুকলেট নাম্বার মেকার
function generateRandomBookletNo() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// ৪ ডিজিটের র্যান্ডম ইউনিক আইডি মেকার (ইন্ট্রোডাকশন পেজের বারকোডের জন্য)
function generateUniqueID() {
    return "ID-" + Math.floor(1000 + Math.random() * 9000).toString();
}

// ওএমআর অপশন টগল করার ফাংশন
function toggleOMROptions() {
    const showOMR = document.getElementById('showOMR');
    const container = document.getElementById('omrOptionsContainer');
    if (showOMR && container) {
        container.style.display = showOMR.checked ? 'block' : 'none';
    }
}

// মক টেস্ট ফাইল নেম থেকে ছোট শর্টকোড বানানোর ফাংশন
function getMockTestShortCode(fileName) {
    if (!fileName) return "MOCK-EXAM";
    let cleanName = fileName.replace('question/', '').replace('.js', '');
    return cleanName.substring(0, 15).toUpperCase();
}

// ==========================================
// ৩. পেজ লোড ও মক টেস্ট ড্রপডাউন ইনিশিয়ালাইজেশন
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const selectMenu = document.getElementById('mockTestSelect');
    if (window.availableMockTests && window.availableMockTests.length > 0) {
        if (selectMenu) {
            selectMenu.innerHTML = '<option value="">-- একটি পরীক্ষা বাছুন --</option>';
            window.availableMockTests.forEach(fileName => {
                const option = document.createElement('option');
                option.value = fileName; 
                option.textContent = fileName; 
                selectMenu.appendChild(option);
            });
        }
    }
    toggleOMROptions();
});

// ==========================================
// ৪. ডাইনামিক স্ক্রিপ্ট ও মক টেস্ট ডাটা লোডিং ফাংশন
// ==========================================
function loadMockTestScript() {
    const selectMenu = document.getElementById('mockTestSelect');
    if (!selectMenu || !selectMenu.value) return;

    let fileName = selectMenu.value;
    
    // নিখুঁত পাথ হ্যান্ডলিং: ফাইলটি question/ দিয়ে শুরু না হলে তা যোগ হবে
    if (!fileName.startsWith('question/')) {
        fileName = 'question/' + fileName;
    }
    
    // পুরনো স্ক্রিপ্ট মেমরি থেকে সম্পূর্ণ রিমুভ করা
    const oldScript = document.getElementById('dynamicTestScript');
    if (oldScript) oldScript.remove();

    // নতুন স্ক্রিপ্ট ট্যাগ তৈরি
    const script = document.createElement('script');
    script.id = 'dynamicTestScript';
    script.src = fileName; 

    script.onload = function() {
        // ফাইল সফলভাবে লোড হওয়ার পর ডাটা স্ট্রাকচার রিড করার লজিক
        if (window.currentMockTestData) {
            // ১. যদি ডাটা সরাসরি একটি অ্যারে হয়
            if (Array.isArray(window.currentMockTestData)) {
                loadedQuestions = window.currentMockTestData;
                currentBookletNo = generateRandomBookletNo(); 
            } 
            // ২. যদি ডাটা একটি অবজেক্ট হয় যার ভেতরে questions এবং bookletNo আলাদা করে দেওয়া আছে
            else if (window.currentMockTestData.questions) {
                loadedQuestions = window.currentMockTestData.questions;
                currentBookletNo = window.currentMockTestData.bookletNo || generateRandomBookletNo();
            } 
            else {
                alert('❌ ফাইলের ভেতরের অবজেক্টের স্ট্রাকচার সঠিক নয়!');
                return;
            }

            // ল্যাঙ্গুয়েজ ড্রপডাউন সেটআপ
            detectAndSetupLanguages();
            
            alert(`✅ ${selectMenu.value} সফলভাবে লোড হয়েছে!\nবুকলেট নম্বর: ${currentBookletNo}\nমোট প্রশ্ন: ${loadedQuestions.length}টি`);
        } else {
            alert('❌ ফাইলে কোনো বৈধ মক টেস্ট ডেটা (window.currentMockTestData) পাওয়া যায়নি!');
        }
    };

    script.onerror = function() {
        alert(`❌ মক টেস্ট ফাইলটি লোড করা যায়নি!\nদয়া করে নিশ্চিত করুন আপনার ফাইলটি '${fileName}' পাথে উপস্থিত আছে কি না।`);
    };

    document.head.appendChild(script);
}

function detectAndSetupLanguages() {
    const langSelect = document.getElementById('languageSelect');
    if (!langSelect || loadedQuestions.length === 0) return;

    langSelect.innerHTML = ""; 
    const firstQ = loadedQuestions[0];

    if (firstQ.question && typeof firstQ.question === 'object' && !Array.isArray(firstQ.question)) {
        const availableLangs = Object.keys(firstQ.question);
        availableLangs.forEach(langKey => {
            const option = document.createElement('option');
            option.value = langKey;
            option.textContent = languageMap[langKey] || langKey.toUpperCase();
            langSelect.appendChild(option);
        });
    } else {
        const option = document.createElement('option');
        option.value = "default";
        option.textContent = "Default";
        langSelect.appendChild(option);
    }
}

// ==========================================
// ৫. মূল ভিউ জেনারেট করার ফাংশন
// ==========================================
function generateView() {
    if (loadedQuestions.length === 0) {
        alert("দয়া করে প্রথমে একটি মক টেস্ট সিলেক্ট করুন এবং লোড হওয়া পর্যন্ত অপেক্ষা করুন!");
        return;
    }

    const uniqueID = generateUniqueID(); 

    const selectMenu = document.getElementById('mockTestSelect');
    const selectedFileName = selectMenu ? selectMenu.value : "";
    const mockShortCode = getMockTestShortCode(selectedFileName); 

    const langSelectEl = document.getElementById('languageSelect');
    const langSelect = langSelectEl ? langSelectEl.value : "default";

    const coachingNameEl = document.getElementById('coachingName');
    const coachingName = coachingNameEl ? (coachingNameEl.value || "কোচিং সেন্টার") : "কোচিং সেন্টার";

    const testNameEl = document.getElementById('testName');
    const testName = testNameEl ? (testNameEl.value || "মক টেস্ট") : "মক টেস্ট";

    const totalMarksEl = document.getElementById('totalMarks');
    const totalMarks = totalMarksEl ? (totalMarksEl.value || "৮৫") : "৮৫";

    const examTimeEl = document.getElementById('examTime');
    const examTime = examTimeEl ? (examTimeEl.value || "১ ঘণ্টা") : "১ ঘণ্টা";

    const negMarksEl = document.getElementById('negMarks');
    const negMarks = negMarksEl ? (negMarksEl.value || "0.25") : "0.25";
    
    const showIntroEl = document.getElementById('showIntro');
    const showIntro = showIntroEl ? showIntroEl.checked : true;

    const showOMREl = document.getElementById('showOMR');
    const showOMR = showOMREl ? showOMREl.checked : false;

    const omrDownloadTypeEl = document.querySelector('input[name="omrDownloadType"]:checked');
    const omrDownloadType = omrDownloadTypeEl ? omrDownloadTypeEl.value : "end";

    let printArea = document.getElementById('printArea');
    if (!printArea) {
        alert("❌ 'printArea' আইডি যুক্ত কোনো ডিভ খুঁজে পাওয়া যায়নি!");
        return;
    }
    printArea.innerHTML = ""; 

    let finalHtml = "";

    // --- ১. ইন্ট্রোডাকশন পেজ জেনারেশন ---
    if (showIntro) {
        let bookletDigits = currentBookletNo.toString().padStart(6, '0').split('');

        finalHtml += `
        <div class="intro-page-wrapper">
            <div class="intro-top-code">${mockShortCode}/2026</div>
            <div class="intro-alert-text">DO NOT OPEN THIS BOOKLET UNTIL YOU ARE ASKED TO DO SO.</div>
            <div class="intro-main-title">QUESTION BOOKLET</div>
            <div class="intro-meta-info">
                Time allotted : ${examTime}<br>
                Full marks : ${totalMarks}<br>
                All questions carry equal marks.
            </div>
            <div class="intro-barcode-serial-flex">
                <div class="intro-barcode-box">
                    <div class="barcode-lines"></div>
                    <span class="barcode-text">${uniqueID}</span>
                </div>
                <div class="intro-serial-box">
                    <div class="serial-label">Question Booklet Serial No.</div>
                    <div class="serial-number-digits">
                        ${bookletDigits.map(digit => `<span>${digit}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="intro-divider-line"></div>
            <div class="intro-instructions-grid">
                <div class="intro-lang-col eng-col">
                    <h3>INSTRUCTIONS</h3>
                    <ol>
                        <li>This booklet consists of several pages including this front page. Verify your Question Booklet page layout upon opening. If there is any discrepancy, bring it to the notice of the Invigilator.</li>
                        <li>Answers will have to be given in the special answer sheet (OMR Answer Sheets) supplied for the purpose. Do not tear or separate any leaf of the OMR Answer Sheet.</li>
                        <li>Before you proceed to mark on the Answer Sheet in response to various items in the Question Booklet, you have to fill in some particulars in the OMR Sheet. <strong>Do not fold the Answer Sheet as this will result in error in your marks.</strong></li>
                        <li>All questions have four probable answers <strong>(A), (B), (C)</strong> and <strong>(D)</strong>. Find out which of the four answers appears to you to be correct. Now darken the circle corresponding to the letter of the selected answer in the OMR Answer Sheet with <strong>Black/Blue Ball Point Pen</strong>.</li>
                        <li>If more than one circle is encoded for a particular answer, it will be treated as a wrong answer.</li>
                        <li><strong>1/4 th of the allotted marks (i.e. ${negMarks}) will be deducted for each wrong answer.</strong></li>
                        <li>There are blank pages at the beginning and end of this booklet for Rough Work.</li>
                        <li><strong>The OMR Answer Sheet should be handed over to the Invigilator before leaving the Examination Hall.</strong></li>
                    </ol>
                </div>
                <div class="intro-lang-col ben-col">
                    <h3>নির্দেশাবলী</h3>
                    <ol>
                        <li>সামনের পৃষ্ঠা সহ এই বুকলেটের সমস্ত পৃষ্ঠা প্রিন্ট হওয়া নিশ্চিত করুন। পরীক্ষার্থীরা প্রথমেই তাদের বুকলেটের প্রতিটি পৃষ্ঠা চেক করে নেবেন। কোনরকম অসামঞ্জস্য বা প্রিন্টিং মিসিং থাকলে সেটি পরীক্ষা কক্ষের তত্ত্বাবধায়কের নজরে আনবেন।</li>
                        <li>উত্তর কেবলমাত্র <strong>OMR উত্তরপত্রেই</strong> দিতে হবে যা একটি পৃথক পৃষ্ঠা। উত্তরপত্রের পৃষ্ঠাটিকে ছিঁড়বেন না বা ভাঁজ করবেন না।</li>
                        <li>উত্তরপত্রে প্রশ্নের উত্তর লেখা শুরু করার আগে পরীক্ষার্থীদের নির্দিষ্ট কিছু বিবরণ ওএমআর শিটের নির্দিষ্ট স্থানে পূরণ করতে হবে। উত্তরপত্রটি কখনোই ভাঁজ করবেন না, কারণ এতে আপনার উত্তরপত্র মূল্যায়নের সময় প্রাপ্ত নম্বরের ভুল হতে পারে।</li>
                        <li>প্রতিটি প্রশ্নের চারটি সম্ভাব্য উত্তর দেওয়া আছে, যথা <strong>(A), (B), (C)</strong> এবং <strong>(D)</strong>। এর মধ্যে যেটি সঠিক মনে হবে, ওএমআর উত্তরপত্রে সেই নির্দিষ্ট গোলকটিকে <strong>কালো/নীল কালির বল-পয়েন্ট পেনের</strong> মাধ্যমে সম্পূর্ণ কালো করতে হবে।</li>
                        <li>একটি প্রশ্নের উত্তর হিসাবে একাধিক গোলককে চিহ্নিত করলে সেই উত্তরটি ভুল বলে বিবেচিত হবে।</li>
                        <li><strong>প্রতিটি ভুল উত্তরের জন্য এক-চতুর্থাংশ নম্বর (অর্থাৎ ${negMarks}) কেটে নেওয়া হবে।</strong></li>
                        <li>প্রশ্নপত্রের প্রথমে ও শেষে রাফ কাজের জন্য পৃষ্ঠা রাখা আছে।</li>
                        <li>পরীক্ষা শেষে পরীক্ষা কক্ষ ত্যাগ করার পূর্বে <strong>OMR উত্তরপত্রটি</strong> তত্ত্বাবধায়কের হাতে জমা দেবেন। ওএমআর উত্তরপত্রটি নিজস্ব সম্পত্তি, সুতরাং এটিকে অবশ্যই জমা দিতে হবে।</li>
                    </ol>
                    <div class="intro-footer-turn">[Please Turn Over]</div>
                </div>
            </div>
            
            <div class="intro-custom-footer">
                <div class="intro-footer-date">14.06.2026</div>
                <div class="intro-footer-page">Page 1</div>
            </div>
        </div>
        <div class="page-break"></div>
        `;
    }

    // --- ২. কোশ্চেন পেপার পেজ জেনারেশন ---
    let examHtml = `<div class="exam-paper-page">`;
    
    if (!showIntro) {
        examHtml += `
        <div class="exam-header">
            <h1>${coachingName}</h1>
            <h2>${testName}</h2>
            <div class="exam-meta">
                <span><strong>সময়:</strong> ${examTime}</span>
                <span><strong>পূর্ণমান:</strong> ${totalMarks}</span>
            </div>
        </div>
        <hr class="header-divider">`;
    } else {
        examHtml += `
        <div class="exam-running-header">
            <span>${testName}</span>
            <span style="float: right;">Full Marks: ${totalMarks}</span>
            <div style="clear: both; border-bottom: 1px solid #000; margin-top: 5px; margin-bottom: 15px;"></div>
        </div>`;
    }

    examHtml += `<div class="questions-grid">`;

    loadedQuestions.forEach((q, index) => {
        let qText = "";
        let optionsArray = [];

        if (langSelect === "default" || typeof q.question === 'string') {
            qText = q.question || "";
            optionsArray = q.options || [];
        } else {
            qText = q.question[langSelect] || q.question['bn'] || "";
            optionsArray = (q.options && q.options[langSelect]) ? q.options[langSelect] : (q.options ? q.options['bn'] : []);
        }

        examHtml += `
        <div class="question-block">
            <div class="question-title"><strong>Q${index + 1}.</strong> ${qText}</div>
            <div class="options-container">`;
        
        const optionLetters = ["A", "B", "C", "D"];
        optionsArray.forEach((opt, optIdx) => {
            examHtml += `<div class="option-item"><strong>(${optionLetters[optIdx]})</strong> ${opt}</div>`;
        });

        examHtml += `</div></div>`;
    });

    examHtml += `</div></div>`;
    finalHtml += examHtml;

    // --- ৩. ওএমআর শিট জেনারেশন ---
    if (showOMR) {
        let omrHtml = generateProfessionalOMR(loadedQuestions.length, coachingName, testName);
        if (omrDownloadType === "end") {
            finalHtml += `<div class="page-break"></div>` + omrHtml;
        } else if (omrDownloadType === "separate") {
            finalHtml = omrHtml; 
        }
    }

    printArea.innerHTML = finalHtml;

    if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise([printArea]).catch(function (err) {
            console.log("MathJax failed: " + err.message);
        });
    }
}

// ==========================================
// ৬. ওএমআর শিট জেনারেশন ফাংশন (৪টি মার্কার ও ব্ল্যাঙ্ক বাবল কলাম সহ)
// ==========================================
function generateProfessionalOMR(totalQ, coaching, test) {
    let html = `
    <div class="omr-pro-page">
        <div class="omr-fiducial-marker marker-top-left"></div>
        <div class="omr-fiducial-marker marker-top-right"></div>
        <div class="omr-fiducial-marker marker-bottom-left"></div>
        <div class="omr-fiducial-marker marker-bottom-right"></div>

        <div class="omr-pro-header">
            <h2>${coaching}</h2>
            <h3>OMR ANSWER SHEET (অরিজিনাল কপি)</h3>
            <p style="margin:2px 0; font-size:13px; color:#555;">EXAM: ${test}</p>
        </div>

        <div class="omr-top-flex">
            <div class="omr-info-left">
                <div class="omr-name-field-container">
                    <label class="omr-field-label">CANDIDATE'S NAME (IN BLOCK LETTERS):</label>
                    <div class="omr-underline-space"></div>
                </div>

                <div class="date-sig-flex">
                    <div style="width: 48%;">
                        <div class="omr-box-title">DATE OF EXAMINATION</div>
                        <div class="date-box-row">
                            <div class="name-box"></div><div class="name-box"></div> / 
                            <div class="name-box"></div><div class="name-box"></div> / 
                            <div class="name-box"></div><div class="name-box"></div><div class="name-box"></div><div class="name-box"></div>
                        </div>
                    </div>
                    <div style="width: 48%;">
                        <div class="omr-box-title">INVIGILATOR'S SIGNATURE</div>
                        <div class="signature-blank-box"></div>
                    </div>
                </div>
                
                <div class="omr-pro-instructions">
                    <strong>IMPORTANT INSTRUCTIONS:</strong>
                    <ul>
                        <li>Use BLACK/BLUE BALL POINT PEN only.</li>
                        <li>Darken only ONE circle completely for each question.</li>
                        <li>Do not make any stray marks or fold this sheet.</li>
                    </ul>
                </div>
            </div>

            <div class="omr-grids-right">
                <div class="number-bubble-structure">
                    <div class="omr-box-title">BOOKLET NO.</div>
                    <div class="num-digit-boxes">
                        <div class="digit-box"></div><div class="digit-box"></div><div class="digit-box"></div>
                        <div class="digit-box"></div><div class="digit-box"></div><div class="digit-box"></div>
                    </div>
                    <div class="num-bubble-columns">`;
                        for(let col=0; col<6; col++) {
                            html += `<div class="bubble-column-item">`;
                            for(let row=0; row<10; row++) {
                                html += `<div class="omr-grid-circle">${row}</div>`;
                            }
                            html += `</div>`;
                        }
    html += `       </div>
                </div>

                <div class="number-bubble-structure">
                    <div class="omr-box-title">ROLL NUMBER</div>
                    <div class="num-digit-boxes">
                        <div class="digit-box"></div><div class="digit-box"></div><div class="digit-box"></div>
                        <div class="digit-box"></div><div class="digit-box"></div><div class="digit-box"></div>
                    </div>
                    <div class="num-bubble-columns">`;
                        for(let col=0; col<6; col++) {
                            html += `<div class="bubble-column-item">`;
                            for(let row=0; row<10; row++) {
                                html += `<div class="omr-grid-circle">${row}</div>`;
                            }
                            html += `</div>`;
                        }
    html += `       </div>
                </div>
            </div>
        </div>

        <div class="omr-pro-part-b">PART - B : ANSWER BUBBLES</div>
        <div class="omr-answers-flex-container">`;

            const numColumns = 4;
            const rowsPerColumn = Math.ceil(totalQ / numColumns);

            for (let row = 0; row < rowsPerColumn; row++) {
                for (let col = 0; col < numColumns; col++) {
                    let qIndex = row + (col * rowsPerColumn);
                    
                    if (qIndex < totalQ) {
                        html += `
                        <div class="omr-question-row">
                            <span class="omr-q-number">${qIndex + 1}.</span>
                            <div class="omr-opt-circle">A</div>
                            <div class="omr-opt-circle">B</div>
                            <div class="omr-opt-circle">C</div>
                            <div class="omr-opt-circle">D</div>
                        </div>`;
                    } else {
                        html += `<div class="omr-question-row" style="border:none; visibility:hidden;"></div>`;
                    }
                }
            }
            
    html += `
        </div>
        <div class="omr-footer-signatures">
            <div class="sig-line-box">Candidate's Full Signature</div>
            <div class="sig-line-box">Center Superintendent Stamp</div>
        </div>
    </div>`;
    
    return html;
}
