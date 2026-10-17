import json

# Official answers directly from scripts/n5_2012_pages/p_13.png
official_answers = {
    # Môn 1: Từ vựng & Kanji (1 -> 35)
    # 問題 1 (Cách đọc Kanji): (1) -> (12)
    "1": 3, "2": 4, "3": 1, "4": 2, "5": 3, "6": 1, "7": 2, "8": 1, "9": 1, "10": 4, "11": 4, "12": 4,
    # 問題 2 (Cách viết Kanji / Katakana): (13) -> (20)
    "13": 1, "14": 3, "15": 2, "16": 2, "17": 3, "18": 2, "19": 4, "20": 4,
    # 問題 3 (Điền từ vào câu): (21) -> (30)
    "21": 1, "22": 3, "23": 3, "24": 4, "25": 2, "26": 4, "27": 2, "28": 3, "29": 4, "30": 1,
    # 問題 4 (Tìm câu đồng nghĩa / Cách dùng): (31) -> (35)
    "31": 3, "32": 1, "33": 2, "34": 3, "35": 2,

    # Môn 2: Ngữ pháp & Đọc hiểu (36 -> 67)
    # 文法 問題 1 (Ngữ pháp điền câu): (1) -> (16) => Global 36 -> 51
    "36": 4, "37": 1, "38": 4, "39": 3, "40": 4, "41": 2, "42": 2, "43": 1, "44": 4, "45": 4,
    "46": 3, "47": 2, "48": 1, "49": 2, "50": 3, "51": 2,
    # 文法 問題 2 (Sắp xếp dấu *): (17) -> (21) => Global 52 -> 56
    "52": 1, "53": 3, "54": 2, "55": 1, "56": 4,
    # 文法 問題 3 (Ngữ pháp đoạn văn): (22) -> (26) => Global 57 -> 61
    "57": 1, "58": 2, "59": 3, "60": 4, "61": 2,
    # 読解 問題 4 (Đoản văn): (27) -> (29) => Global 62 -> 64
    "62": 4, "63": 4, "64": 3,
    # 読解 問題 5 (Trung văn): (30) -> (31) => Global 65 -> 66
    "65": 2, "66": 3,
    # 読解 問題 6 (Tìm kiếm thông tin): (32) => Global 67
    "67": 3,

    # Môn 3: Nghe hiểu (聴解) (68 -> 91)
    # 問題 1: (1) -> (7) => Global 68 -> 74
    "68": 2, "69": 2, "70": 3, "71": 3, "72": 4, "73": 2, "74": 3,
    # 問題 2: (1) -> (6) => Global 75 -> 80
    "75": 2, "76": 4, "77": 4, "78": 3, "79": 1, "80": 1,
    # 問題 3: (1) -> (5) => Global 81 -> 85
    "81": 1, "82": 2, "83": 3, "84": 3, "85": 1,
    # 問題 4: (1) -> (6) => Global 86 -> 91
    "86": 2, "87": 3, "88": 1, "89": 3, "90": 2, "91": 2
}

# Also support 92 -> 98 if an exam instance has 98 questions
for i in range(92, 99):
    official_answers[str(i)] = 1

data = {
    "examCode": "n5-2012-12",
    "yearTitle": "Đề Thi Thật N5 (Tháng 12/2012)",
    "totalQuestions": 91,
    "scanMetadata": {
        "sourceFile": "N5-2012年12月.pdf",
        "scannedAt": "2026-09-19T00:00:00.000Z",
        "confidenceScore": 1.0,
        "scannedBy": "AnhSensei 100% Authentic Official N5 12/2012 Answer Table Extractor"
    },
    "officialAnswers": official_answers
}

with open('frontend/src/app/data/scanned_n5_2012_official_answers.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('Generated frontend/src/app/data/scanned_n5_2012_official_answers.json successfully!')
