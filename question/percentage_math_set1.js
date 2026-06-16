// PERCENTAGE CHAPTER ALL TYPES MOCK TEST
// Total Questions: 36 (12 Types × 3 Questions each)
// Language: Bengali & English
// Format: JavaScript Array Object

window.currentMockTestBookletNo = "763673";
window.currentMockTestData = [
    // ==========================================
    // ১. GENERAL CALCULATION & FRACTION BASED (সাধারণ গণনা এবং ভগ্নাংশ ভিত্তিক)
    // ==========================================
    {
        question: {
            bn: "যদি কোনো সংখ্যার 37.5% এর মান 45 হয়, তবে সংখ্যাটি কত?",
            en: "If 37.5% of a number is 45, then what is the number?"
        },
        options: {
            bn: ["110", "120", "130", "140"],
            en: ["110", "120", "130", "140"]
        },
        correct: 1
    },
    {
        question: {
            bn: "যদি A-এর 20% = B-এর 50% হয়, তবে B, A-এর কত শতাংশ?",
            en: "If 20% of A = 50% of B, then B is what percentage of A?"
        },
        options: {
            bn: ["30%", "40%", "25%", "15%"],
            en: ["30%", "40%", "25%", "15%"]
        },
        correct: 1
    },
    {
        question: {
            bn: "একটি সংখ্যার 80%-এর সাথে 80 যোগ করলে প্রাপ্ত ফলাফল সেই সংখ্যাটিই হয়। সংখ্যাটি কত?",
            en: "When 80 is added to 80% of a number, the result is the number itself. What is the number?"
        },
        options: {
            bn: ["320", "400", "480", "520"],
            en: ["320", "400", "480", "520"]
        },
        correct: 1
    },

    // ==========================================
    // ২. INCREASE OR DECREASE IN PERCENTAGE (হ্রাস এবং বৃদ্ধি ভিত্তিক)
    // ==========================================
    {
        question: {
            bn: "যদি A-এর আয় B-এর আয়ের চেয়ে 25% বেশি হয়, তবে B-এর আয় A-এর আয়ের চেয়ে কত শতাংশ কম?",
            en: "If A's income is 25% more than B's income, then B's income is how much percent less than A's income?"
        },
        options: {
            bn: ["15%", "20%", "25%", "30%"],
            en: ["15%", "20%", "25%", "30%"]
        },
        correct: 1
    },
    {
        question: {
            bn: "একটি সংখ্যার মান প্রথমে 20% বাড়ানো হলো এবং পরে আবার 20% কমানো হলো। সংখ্যাটির মোটের ওপর কী পরিবর্তন হলো?",
            en: "A number is first increased by 20% and then decreased by 20%. What is the net change in the number?"
        },
        options: {
            bn: ["4% বৃদ্ধি (Increase)", "4% হ্রাস (Decrease)", "কোনো পরিবর্তন হয়নি (No change)", "2% হ্রাস (Decrease)"],
            en: ["4% Increase", "4% Decrease", "No change", "2% Decrease"]
        },
        correct: 1
    },
    {
        question: {
            bn: "যদি কোনো বৃত্তের ব্যাসার্ধ 50% হ্রাস পায়, তবে তার ক্ষেত্রফল কত শতাংশ হ্রাস পাবে?",
            en: "If the radius of a circle is decreased by 50%, then its area will decrease by what percent?"
        },
        options: {
            bn: ["50%", "75%", "25%", "60%"],
            en: ["50%", "75%", "25%", "60%"]
        },
        correct: 1
    },

    // ==========================================
    // ৩. SUCCESSIVE PERCENTAGE CHANGE (ক্রমাগত পরিবর্তন বা সাকসেসিভ পার্সেন্টেজ)
    // ==========================================
    {
        question: {
            bn: "একটি আয়তক্ষেত্রের দৈর্ঘ্য 20% বৃদ্ধি এবং প্রস্থ 10% বৃদ্ধি করা হলে, তার ক্ষেত্রফল কত শতাংশ বৃদ্ধি পাবে?",
            en: "If the length of a rectangle is increased by 20% and the breadth is increased by 10%, by what percent will its area increase?"
        },
        options: {
            bn: ["30%", "32%", "35%", "28%"],
            en: ["30%", "32%", "35%", "28%"]
        },
        correct: 1
    },
    {
        question: {
            bn: "কোনো দ্রব্যের ওপর পরপর দুবার যথাক্রমে 10% এবং 20% ছাড় দেওয়া হলে, সমতুল্য একক ছাড় (Single Equivalent Discount) কত হবে?",
            en: "If successive discounts of 10% and 20% are given on an item, what will be the single equivalent discount?"
        },
        options: {
            bn: ["30%", "28%", "25%", "32%"],
            en: ["30%", "28%", "25%", "32%"]
        },
        correct: 1
    },
    {
        question: {
            bn: "একটি ঘনকের (Cube) প্রতিটি বাহু 10% বৃদ্ধি করা হলে, তার আয়তন (Volume) কত শতাংশ বৃদ্ধি পাবে?",
            en: "If each side of a cube is increased by 10%, by what percent will its volume increase?"
        },
        options: {
            bn: ["30%", "31%", "33.1%", "21%"],
            en: ["30%", "31%", "33.1%", "21%"]
        },
        correct: 2
    },

    // ==========================================
    // ৪. INCOME, EXPENDITURE & SAVINGS BASED (আয়, ব্যয় এবং সঞ্চয় ভিত্তিক)
    // ==========================================
    {
        question: {
            bn: "একজন ব্যক্তি তার আয়ের 75% খরচ করেন। যদি তার আয় 20% বৃদ্ধি পায় এবং খরচ 10% বৃদ্ধি পায়, তবে তার সঞ্চয় কত শতাংশ বৃদ্ধি পাবে?",
            en: "A man spends 75% of his income. If his income increases by 20% and expenditure increases by 10%, by what percent will his savings increase?"
        },
        options: {
            bn: ["50%", "30%", "40%", "25%"],
            en: ["50%", "30%", "40%", "25%"]
        },
        correct: 0
    },
    {
        question: {
            bn: "রমেশ তার মোট আয়ের 20% বাড়ি ভাড়ায় এবং অবশিষ্ট আয়ের 70% সংসারের অন্যান্য কাজে খরচ করেন। যদি তার সঞ্চয় 3600 টাকা হয়, তবে তার মোট আয় কত?",
            en: "Ramesh spends 20% of his income on house rent and 70% of the remaining on household expenses. If he saves ₹3600, what is his total income?"
        },
        options: {
            bn: ["₹15000", "₹12000", "₹10000", "₹18000"],
            en: ["₹15000", "₹12000", "₹10000", "₹18000"]
        },
        correct: 1
    },
    {
        question: {
            bn: "A এবং B এর আয়ের অনুপাত 5:3 এবং তাদের ব্যয়ের অনুপাত 9:5। যদি তারা যথাক্রমে ₹1300 এবং ₹900 সঞ্চয় করে, তবে A-এর আয় কত?",
            en: "The income of A and B are in the ratio 5:3 and their expenditures are in the ratio 9:5. If they save ₹1300 and ₹900 respectively, find A's income."
        },
        options: {
            bn: ["₹4000", "₹4500", "₹5000", "₹6000"],
            en: ["₹4000", "₹4500", "₹5000", "₹6000"]
        },
        correct: 0
    },

    // ==========================================
    // ৫. EXAMINATION, MARKS & PASS-FAIL (পরীক্ষা এবং পাস-ফেল ভিত্তিক)
    // ==========================================
    {
        question: {
            bn: "একটি পরীক্ষায় পাস করার জন্য ন্যূনতম 36% নম্বর প্রয়োজন। এক ছাত্র 190 নম্বর পেয়ে 26 নম্বরের জন্য ফেল করল। পরীক্ষার মোট নম্বর কত ছিল?",
            en: "A student has to secure 36% marks to pass an exam. He gets 190 marks and fails by 26 marks. What is the total marks of the exam?"
        },
        options: {
            bn: ["500", "600", "700", "800"],
            en: ["500", "600", "700", "800"]
        },
        correct: 1
    },
    {
        question: {
            bn: "একজন ছাত্র একটি পরীক্ষায় 30% নম্বর পেয়ে 45 নম্বরের জন্য ফেল করে। অন্য একজন ছাত্র 42% নম্বর পেয়ে পাস নম্বর অপেক্ষা 45 নম্বর বেশি পায়। পরীক্ষায় পাসের শতাংশ (Pass Percentage) কত?",
            en: "A student secures 30% marks and fails by 45 marks. Another student secures 42% marks and gets 45 marks more than the pass marks. Find the pass percentage."
        },
        options: {
            bn: ["35%", "36%", "38%", "40%"],
            en: ["35%", "36%", "38%", "40%"]
        },
        correct: 1
    },
    {
        question: {
            bn: "একটি পরীক্ষায় মোট পরীক্ষার্থীর 65% ছাত্র পাস করেছে। যদি ফেল করা ছাত্রীর সংখ্যা 420 হয়, তবে মোট কতজন ছাত্র পরীক্ষা দিয়েছিল?",
            en: "In an examination, 65% of the total examinees passed. If the number of failed candidates is 420, find the total number of examinees."
        },
        options: {
            bn: ["1200", "1000", "1400", "1500"],
            en: ["1200", "1000", "1400", "1500"]
        },
        correct: 0
    },

    // ==========================================
    // ৬. POPULATION & DEPRECIATION (জনসংখ্যা এবং অবমূল্যায়ন)
    // ==========================================
    {
        question: {
            bn: "একটি শহরের বর্তমান জনসংখ্যা 1,80,000। যদি জনসংখ্যা প্রতি বছর 10% হারে বৃদ্ধি পায়, তবে 2 বছর পর শহরের জনসংখ্যা কত হবে?",
            en: "The population of a town is 1,80,000. If it increases at the rate of 10% per annum, what will be its population after 2 years?"
        },
        options: {
            bn: ["2,17,800", "2,18,000", "2,15,600", "2,20,000"],
            en: ["2,17,800", "2,18,000", "2,15,600", "2,20,000"]
        },
        correct: 0
    },
    {
        question: {
            bn: "একটি মোটরবাইকের বর্তমান মূল্য ₹80,000। যদি প্রতি বছর বাইকটির মূল্য 10% হারে হ্রাস পায়, তবে 2 বছর আগে বাইকটির মূল্য কত ছিল?",
            en: "The present value of a motorbike is ₹80,000. If its value depreciates at the rate of 10% per annum, what was its value 2 years ago? (Approx.)"
        },
        options: {
            bn: ["₹95,000", "₹98,765", "₹1,00,000", "₹1,10,000"],
            en: ["₹95,000", "₹98,765", "₹1,00,000", "₹1,10,000"]
        },
        correct: 1
    },
    {
        question: {
            bn: "একটি শহরের জনসংখ্যা প্রথম বছর 5% বৃদ্ধি পায় এবং দ্বিতীয় বছর 5% হ্রাস পায়। যদি দ্বিতীয় বছরের শেষে জনসংখ্যা 9975 হয়, তবে শুরুতে জনসংখ্যা কত ছিল?",
            en: "The population of a town increases by 5% in the first year and decreases by 5% in the second year. If the population at the end of the second year is 9975, what was the initial population?"
        },
        options: {
            bn: ["10,000", "10,500", "9,500", "11,000"],
            en: ["10,000", "10,500", "9,500", "11,000"]
        },
        correct: 0
    },

    // ==========================================
    // ৭. ELECTION BASED PROBLEMS (নির্বাচনী অংক)
    // ==========================================
    {
        question: {
            bn: "একটি নির্বাচনে দুজন প্রার্থীর মধ্যে বিজয়ী প্রার্থী মোট ভোটের 60% পেয়ে 1400 ভোটে জয়লাভ করেন। মোট প্রদত্ত ভোটের সংখ্যা কত?",
            en: "In an election between two candidates, the winning candidate gets 60% of the total votes and wins by 1400 votes. What is the total number of votes polled?"
        },
        options: {
            bn: ["6000", "7000", "8000", "7500"],
            en: ["6000", "7000", "8000", "7500"]
        },
        correct: 1
    },
    {
        question: {
            bn: "একটি নির্বাচনে 10% ভোটার ভোট দেননি। প্রদত্ত ভোটের 10% ভোট অবৈধ (Invalid) ঘোষিত হয়। সফল প্রার্থী বৈধ ভোটের 54% পেয়ে 1620 ভোটে জয়ী হন। মোট ভোটার তালিকায় কতজন নাম ছিল?",
            en: "In an election, 10% of the voters did not cast their vote. 10% of the votes polled were found invalid. The successful candidate got 54% of the valid votes and won by 1620 votes. Find the total number of voters on the enrollment list."
        },
        options: {
            bn: ["25000", "20000", "22000", "18000"],
            en: ["25000", "20000", "22000", "18000"]
        },
        correct: 0
    },
    {
        question: {
            bn: "একটি নির্বাচনে A এবং B প্রতিদ্বন্দ্বিতা করেন। A মোট ভোটের 40% পায় এবং B এর কাছে 600 ভোটে হেরে যায়। যদি 100 টি ভোট অবৈধ হতো, তবে মোট ভোটার সংখ্যা কত হতো?",
            en: "In an election, A and B contested. A secured 40% of the total votes and was defeated by B by 600 votes. If there were no invalid votes, what was the total number of votes?"
        },
        options: {
            bn: ["2500", "3000", "3500", "4000"],
            en: ["2500", "3000", "3500", "4000"]
        },
        correct: 1
    },

    // ==========================================
    // ৮. MIXTURE & SOLUTION BASED (মিশ্রণ ভিত্তিক)
    // ==========================================
    {
        question: {
            bn: "40 লিটার দুধ ও জলের মিশ্রণে 10% জল আছে। এই মিশ্রণে আরও কত লিটার জল মিশালে নতুন মিশ্রণে জলের পরিমাণ 20% হবে?",
            en: "A mixture of 40 liters of milk and water contains 10% water. How many liters of water must be added to this mixture so that water becomes 20% in the new mixture?"
        },
        options: {
            bn: ["4 লিটার", "5 লিটার", "6 লিটার", "8 লিটার"],
            en: ["4 liters", "5 liters", "6 liters", "8 liters"]
        },
        correct: 1
    },
    {
        question: {
            bn: "চিনি ও জলের একটি 6 লিটার দ্রবণে 4% চিনি আছে। দ্রবণটি ফুটিয়ে 1 লিটার জল বাষ্পীভূত করা হলে, অবশিষ্ট দ্রবণে চিনির শতাংশ কত?",
            en: "A 6-liter solution of sugar and water contains 4% sugar. If 1 liter of water is evaporated by boiling the solution, what is the percentage of sugar in the remaining solution?"
        },
        options: {
            bn: ["4.8%", "5%", "4.5%", "5.2%"],
            en: ["4.8%", "5%", "4.5%", "5.2%"]
        },
        correct: 0
    },
    {
        question: {
            bn: "টাটকা ফলের মধ্যে 68% জল থাকে এবং শুকনো ফলের মধ্যে 20% জল থাকে। 100 কেজি টাটকা ফল থেকে কত কেজি শুকনো ফল পাওয়া যাবে?",
            en: "Fresh fruit contains 68% water and dry fruit contains 20% water. How much dry fruit can be obtained from 100 kg of fresh fruits?"
        },
        options: {
            bn: ["32 কেজি", "40 কেজি", "52 কেজি", "80 কেজি"],
            en: ["32 kg", "40 kg", "52 kg", "80 kg"]
        },
        correct: 1
    },

    // ==========================================
    // ৯. PRICE, CONSUMPTION & EXPENDITURE (দ্রব্যমূল্য এবং ব্যবহার ভিত্তিক)
    // ==========================================
    {
        question: {
            bn: "চিনির মূল্য 20% বৃদ্ধি পাওয়ায় একটি পরিবারের চিনির ব্যবহার কত শতাংশ কমাতে হবে যাতে মাসিক খরচ অপরিবর্তিত থাকে?",
            en: "The price of sugar rises by 20%. By how much percent should a family reduce the consumption of sugar so that the expenditure remains the same?"
        },
        options: {
            bn: ["16.66%", "20%", "15%", "18.33%"],
            en: ["16.66%", "20%", "15%", "18.33%"]
        },
        correct: 0
    },
    {
        question: {
            bn: "পেট্রোলের মূল্য 10% হ্রাস পাওয়ায় একজন চালক পেট্রোলের ব্যবহার কত শতাংশ বাড়াতে পারবেন যাতে তার খরচ একই থাকে?",
            en: "The price of petrol decreases by 10%. By how much percent can a driver increase the consumption of petrol so that his expenditure remains unchanged?"
        },
        options: {
            bn: ["10%", "11.11%", "9.09%", "12.5%"],
            en: ["10%", "11.11%", "9.09%", "12.5%"]
        },
        correct: 1
    },
    {
        question: {
            bn: "গমের মূল্য 20% হ্রাস পাওয়ায় একজন ব্যক্তি ₹320 টাকায় 5 কেজি গম বেশি কিনতে পারেন। গমের মূল (আগের) প্রতি কেজি মূল্য কত ছিল?",
            en: "A reduction of 20% in the price of wheat enables a person to buy 5 kg more wheat for ₹320. What was the original price of wheat per kg?"
        },
        options: {
            bn: ["₹16", "₹12.8", "₹18", "₹20"],
            en: ["₹16", "₹12.8", "₹18", "₹20"]
        },
        correct: 0
    },

    // ==========================================
    // ১০. VENN DIAGRAM BASED (ভেনচিত্র ভিত্তিক)
    // ==========================================
    {
        question: {
            bn: "একটি পরীক্ষায় 52% ছাত্র ইংরেজিতে এবং 42% ছাত্র গণিতে ফেল করেছে। যদি 17% ছাত্র উভয় বিষয়ে ফেল করে থাকে, তবে দুই বিষয়ে পাস করা ছাত্রের শতাংশ কত?",
            en: "In an examination, 52% of students failed in English and 42% failed in Mathematics. If 17% failed in both subjects, what is the percentage of students who passed in both subjects?"
        },
        options: {
            bn: ["23%", "21%", "25%", "22%"],
            en: ["23%", "21%", "25%", "22%"]
        },
        correct: 0
    },
    {
        question: {
            bn: "একটি অফিসে 72% কর্মচারী চা পছন্দ করেন এবং 44% কফি পছন্দ করেন। যদি প্রতিটি কর্মচারী চা বা কফির মধ্যে অন্তত একটি পছন্দ করেন এবং 40 জন উভয়ই পছন্দ করেন, তবে অফিসে মোট কর্মচারীর সংখ্যা কত?",
            en: "In an office, 72% of the employees prefer tea and 44% prefer coffee. If each employee prefers at least one and 40 employees prefer both, find the total number of employees in the office."
        },
        options: {
            bn: ["200", "240", "250", "300"],
            en: ["200", "240", "250", "300"]
        },
        correct: 2
    },
    {
        question: {
            bn: "একটি গ্রামে 60% পরিবারের কাছে একটি গরু আছে, 30% পরিবারের কাছে একটি মহিষ আছে এবং 15% পরিবারের কাছে গরু ও মহিষ উভয়ই আছে। যদি গ্রামে মোট 96 টি পরিবার থাকে, তবে কতগুলি পরিবারের কাছে কোনোটিই নেই?",
            en: "In a village, 60% of families have a cow, 30% have a buffalo and 15% have both. If there are 96 families in total, how many families do not have either a cow or a buffalo?"
        },
        options: {
            bn: ["20", "24", "26", "28"],
            en: ["20", "24", "26", "28"]
        },
        correct: 1
    },

    // ==========================================
    // ১১. COMPARISON BETWEEN NUMBERS (সংখ্যার তুলনা ভিত্তিক)
    // ==========================================
    {
        question: {
            bn: "দুটি সংখ্যা একটি তৃতীয় সংখ্যার চেয়ে যথাক্রমে 20% এবং 50% বেশি। প্রথম সংখ্যাটি দ্বিতীয় সংখ্যার কত শতাংশ?",
            en: "Two numbers are respectively 20% and 50% more than a third number. What percentage is the first number of the second?"
        },
        options: {
            bn: ["80%", "75%", "60%", "70%"],
            en: ["80%", "75%", "60%", "70%"]
        },
        correct: 0
    },
    {
        question: {
            bn: "যদি একটি সংখ্যার 60% অন্য একটি সংখ্যার তিন-চতুর্থাংশের ($\frac{3}{4}$) সমান হয়, তবে প্রথম ও দ্বিতীয় সংখ্যার অনুপাত কত?",
            en: "If 60% of a number is equal to three-fourth of another number, what is the ratio of the first number to the second number?"
        },
        options: {
            bn: ["4:5", "5:4", "9:20", "20:9"],
            en: ["4:5", "5:4", "9:20", "20:9"]
        },
        correct: 1
    },
    {
        question: {
            bn: "দুটি সংখ্যা একটি তৃতীয় সংখ্যার চেয়ে যথাক্রমে 30% এবং 37% কম। দ্বিতীয় সংখ্যাটি প্রথম সংখ্যার চেয়ে কত শতাংশ কম?",
            en: "Two numbers are less than a third number by 30% and 37% respectively. By how much percent is the second number less than the first?"
        },
        options: {
            bn: ["7%", "10%", "15%", "20%"],
            en: ["7%", "10%", "15%", "20%"]
        },
        correct: 1
    },

    // ==========================================
    // ১২. TAX, COMMISSION & BONUS BASED (ট্যাক্স, কমিশন এবং বোনাস ভিত্তিক)
    // ==========================================
    {
        question: {
            bn: "যদি আয়কর (Income Tax) 19% বৃদ্ধি পায়, তবে নিট আয় (Net Income) 1% হ্রাস পায়। আয়করের হার (Rate of Income Tax) কত?",
            en: "If the income tax is increased by 19%, the net income is reduced by 1%. The rate of income tax is:"
        },
        options: {
            bn: ["4%", "5%", "6.25%", "7.5%"],
            en: ["4%", "5%", "6.25%", "7.5%"]
        },
        correct: 1
    },
    {
        question: {
            bn: "একজন বিক্রেতা মোট বিক্রির ওপর 9% কমিশন পান এবং ₹20000-এর বেশি বিক্রির ওপর 1% বোনাস পান। যদি তার মোট আয় ₹6800 হয়, তবে তার মোট বিক্রির পরিমাণ কত ছিল?",
            en: "A salesman is allowed 9% commission on total sales and a bonus of 1% on sales over ₹20000. If his total earnings are ₹6800, find the total sales."
        },
        options: {
            bn: ["₹60000", "₹70000", "₹80000", "₹75000"],
            en: ["₹60000", "₹70000", "₹80000", "₹75000"]
        },
        correct: 1
    },
    {
        question: {
            bn: "একটি কোম্পানির লাভ বাৎসরিক ₹20 লক্ষ টাকার নিচে হলে 10% কর্পোরেট ট্যাক্স দিতে হয়, এবং এর ওপরে হলে 15% ট্যাক্স দিতে হয়। কোম্পানিটি ট্যাক্স দেওয়ার পর ₹25.5 লক্ষ লাভ রাখলে, ট্যাক্স দেওয়ার আগে কোম্পানির মোট লাভ কত ছিল?",
            en: "A company pays 10% corporate tax if profits are below ₹20 lakhs, and 15% if above. If the net profit after tax is ₹25.5 lakhs, what was the gross profit before tax?"
        },
        options: {
            bn: ["₹28 লক্ষ", "₹30 লক্ষ", "₹32 লক্ষ", "₹35 লক্ষ"],
            en: ["₹28 lakhs", "₹30 lakhs", "₹32 lakhs", "₹35 lakhs"]
        },
        correct: 1
    }
];
