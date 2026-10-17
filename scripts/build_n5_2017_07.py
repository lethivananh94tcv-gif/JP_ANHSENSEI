# -*- coding: utf-8 -*-
"""
Build 100% authentic official answers (pages 40-41) and detailed explanations + listening scripts (pages 42-49)
for JLPT N5 07/2017 (examCode: n5-2026-8652 / n5-2017-07, Total: 89 questions).
- Section 1 (Moji-Goi): Q1 - Q33 (33 questions)
- Section 2 (Bunpou-Dokkai): Q34 - Q65 (32 questions, local 1 - 32)
- Section 3 (Choukai): Q66 - Q89 (24 questions: M1=7, M2=6, M3=5, M4=6)
"""
import json
import os
import tempfile
import urllib.request

data_89 = {}

def add_q(num, snippet, correct_opt, explanation, audio_ja=None, audio_vi=None, local_num=None, section_name=None, mondai=None):
    if section_name is None:
        if num <= 33:
            section_name = "Từ vựng"
        elif num <= 65:
            section_name = "Ngữ pháp & Đọc"
        else:
            section_name = "Nghe hiểu"
    if local_num is None:
        if num <= 33:
            local_num = num
        elif num <= 65:
            local_num = num - 33
        else:
            if num <= 72:
                local_num = num - 65
            elif num <= 78:
                local_num = num - 72
            elif num <= 83:
                local_num = num - 78
            else:
                local_num = num - 83
    if mondai is None:
        if num <= 10: mondai = 1
        elif num <= 18: mondai = 2
        elif num <= 28: mondai = 3
        elif num <= 33: mondai = 4
        elif num <= 49: mondai = 1
        elif num <= 54: mondai = 2
        elif num <= 59: mondai = 3
        elif num <= 62: mondai = 4
        elif num <= 64: mondai = 5
        elif num == 65: mondai = 6
        elif num <= 72: mondai = 1
        elif num <= 78: mondai = 2
        elif num <= 83: mondai = 3
        else: mondai = 4

    item = {
        "questionNumber": num,
        "localPdfNumber": local_num,
        "sectionType": section_name,
        "mondai": mondai,
        "snippet": snippet,
        "questionSnippet": snippet,
        "explanation": explanation,
        "correctOption": correct_opt,
        "correctAnswer": correct_opt
    }
    if audio_ja:
        item["audioScriptJa"] = audio_ja
    if audio_vi:
        item["audioScriptVi"] = audio_vi
    data_89[str(num)] = item

# ==============================================================================
# SECTION 1: 文字・語彙 (Q1 - Q33)
# ==============================================================================
# 問題1 (Q1 - Q10): Cách đọc Kanji
add_q(1, "先週 (せんしゅう) デパートに かいものに いきました。", 2,
"""🎯 Đáp án đúng: [2] せんしゅう (先週)

💬 Dịch nghĩa câu:
「先週 デパートに かいものに いきました。」
-> "Tuần trước tôi đã đi mua sắm ở trung tâm thương mại."

💡 Phân tích & Giải thích chi tiết:
• Chữ Hán 「先週」 (Tiên Chu) nghĩa là "tuần trước".
• 「先」 đọc âm On là 「せん」 (không có âm đục), 「週」 đọc là 「しゅう」 (có trường âm う).

🔍 Phân tích các lựa chọn:
- 1. せんしゅ: Thiếu trường âm 「う」 ở chữ 週
- 2. せんしゅう (先週): (ĐÚNG) - Tuần trước
- 3. ぜんしゅ: Sai âm đục 「ぜん」 và thiếu trường âm
- 4. ぜんしゅう: Sai âm đục 「ぜん」

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題1 - Câu 1):
【先週】デパートに かいものに いきました。 -> 2. せんしゅう""")

add_q(2, "ごはんの 後 (あと) で さんぽします。", 4,
"""🎯 Đáp án đúng: [4] あと (後)

💬 Dịch nghĩa câu:
「ごはんの 後で さんぽします。」
-> "Sau bữa ăn tôi sẽ đi dạo."

💡 Phân tích & Giải thích chi tiết:
• Chữ Hán 「後」 đi kèm với trợ từ 「で」 trong cấu trúc 「N + の + 後で」 (sau khi ~), đọc theo âm Kun là 「あと」.

🔍 Phân tích các lựa chọn:
- 1. つぎ (次): Tiếp theo, kế tiếp
- 2. うしろ (後ろ): Phía sau (chỉ vị trí không gian, phải có okurigana ろ)
- 3. まえ (前): Phía trước, trước khi
- 4. あと (後): (ĐÚNG) - Sau, sau khi (ごはんの後で = sau bữa cơm)

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題1 - Câu 2):
ごはんの【後】で さんぽします。 -> 4. あと""")

add_q(3, "もう いちど 言って (いって) ください。", 1,
"""🎯 Đáp án đúng: [1] いって (言って)

💬 Dịch nghĩa câu:
「もう いちど 言って ください。」
-> "Xin vui lòng nói lại một lần nữa."

💡 Phân tích & Giải thích chi tiết:
• Động từ 「言う」 (nói) có cách đọc nguyên mẫu là 「いう」.
• Khi chia sang thể て (て形) sẽ biến âm xúc âm thành 「言って」 (いって).

🔍 Phân tích các lựa chọn:
- 1. いって (言って): (ĐÚNG) - Hãy nói
- 2. きって (切って): Hãy cắt
- 3. まって (待って): Hãy đợi
- 4. たって (立って): Hãy đứng lên

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題1 - Câu 3):
もう いちど【言って】ください。 -> 1. いって""")

add_q(4, "ちかくに 山 (やま) が あります。", 2,
"""🎯 Đáp án đúng: [2] やま (山)

💬 Dịch nghĩa câu:
「ちかくに 山が あります。」
-> "Ở gần đây có một ngọn núi."

💡 Phân tích & Giải thích chi tiết:
• Chữ Hán 「山」 (Sơn) khi đứng độc lập mang nghĩa là ngọn núi, đọc âm Kun là 「やま」.

🔍 Phân tích các lựa chọn:
- 1. かわ (川): Dòng sông
- 2. やま (山): (ĐÚNG) - Ngọn núi
- 3. いけ (池): Cái ao, hồ nhỏ
- 4. うみ (海): Biển

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題1 - Câu 4):
ちかくに【山】が あります。 -> 2. やま""")

add_q(5, "この ホテルは へやが 多い (おおい) です。", 2,
"""🎯 Đáp án đúng: [2] おおい (多い)

💬 Dịch nghĩa câu:
「この ホテルは へやが 多いです。」
-> "Khách sạn này có nhiều phòng."

💡 Phân tích & Giải thích chi tiết:
• Tính từ đuôi い 「多い」 (Đa) mang nghĩa là "nhiều", đọc chuẩn xác là 「おおい」 (có chữ お lặp lại).

🔍 Phân tích các lựa chọn:
- 1. すくない (少ない): Ít
- 2. おおい (多い): (ĐÚNG) - Nhiều
- 3. せまい (狭い): Chật, hẹp
- 4. ひろい (広い): Rộng rãi

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題1 - Câu 5):
この ホテルは へやが【多い】です。 -> 2. おおい""")

add_q(6, "ともだちと いっしょに 学校 (がっこう) に いきます。", 3,
"""🎯 Đáp án đúng: [3] がっこう (学校)

💬 Dịch nghĩa câu:
「ともだちと いっしょに 学校に いきます。」
-> "Tôi đi đến trường cùng với bạn bè."

💡 Phân tích & Giải thích chi tiết:
• Từ ghép 「学校」 (Học Hiệu - trường học) có biến âm xúc âm 「っ」 ở giữa và trường âm 「う」 ở cuối: 「がっこう」.

🔍 Phân tích các lựa chọn:
- 1. がこう: Thiếu âm ngắt (xúc âm っ)
- 2. がこお: Thiếu âm ngắt và sai trường âm お
- 3. がっこう (学校): (ĐÚNG) - Trường học
- 4. がっこお: Sai trường âm cuối (phải là う)

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題1 - Câu 6):
ともだちと いっしょに【学校】に いきます。 -> 3. がっこう""")

add_q(7, "えんぴつが 六本 (ろっぽん) あります。", 4,
"""🎯 Đáp án đúng: [4] ろっぽん (六本)

💬 Dịch nghĩa câu:
「えんぴつが 六本 あります。」
-> "Có 6 cây bút chì."

💡 Phân tích & Giải thích chi tiết:
• Lượng từ 「～本」 dùng để đếm vật thon dài (bút chì, ô dù, chai lọ...).
• Khi ghép với số 6 「六」 (ろく), xảy ra biến âm ngắt và bán đục: 「六本」 đọc là 「ろっぽん」.

🔍 Phân tích các lựa chọn:
- 1. ろくぼん: Sai quy tắc biến âm
- 2. ろくぽん: Thiếu xúc âm っ
- 3. ろっぼん: Sai âm đục ぼ (phải là âm bán đục ぽ)
- 4. ろっぽん (六本): (ĐÚNG) - 6 chiếc/cây

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題1 - Câu 7):
えんぴつが【六本】あります。 -> 4. ろっぽん""")

add_q(8, "この 新聞 (しんぶん) は いくらですか。", 2,
"""🎯 Đáp án đúng: [2] しんぶん (新聞)

💬 Dịch nghĩa câu:
「この 新聞は いくらですか。」
-> "Tờ báo này giá bao nhiêu tiền vậy?"

💡 Phân tích & Giải thích chi tiết:
• Chữ Hán 「新聞」 (Tân Văn - tờ báo): 「新」 đọc là 「しん」, 「聞」 đọc là 「ぶん」 -> 「しんぶん」.

🔍 Phân tích các lựa chọn:
- 1. しんむん: Sai âm đọc chữ 聞
- 2. しんぶん (新聞): (ĐÚNG) - Tờ báo
- 3. しむん: Thiếu âm ん và sai chữ 聞
- 4. しぶん: Thiếu âm ん ở chữ 新

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題1 - Câu 8):
この【新聞】は いくらですか。 -> 2. しんぶん""")

add_q(9, "この カメラは 安い (やすい) です。", 2,
"""🎯 Đáp án đúng: [2] やすい (安い)

💬 Dịch nghĩa câu:
「この カメラは 安いです。」
-> "Chiếc máy ảnh này rẻ."

💡 Phân tích & Giải thích chi tiết:
• Tính từ 「安い」 (An) chỉ giá cả "rẻ", đọc theo âm Kun là 「やすい」.

🔍 Phân tích các lựa chọn:
- 1. たかい (高い): Đắt, cao
- 2. やすい (安い): (ĐÚNG) - Rẻ
- 3. おもい (重い): Nặng
- 4. かるい (軽い): Nhẹ

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題1 - Câu 9):
この カメラは【安い】です。 -> 2. やすい""")

add_q(10, "かさは 外 (そと) に あります。", 3,
"""🎯 Đáp án đúng: [3] そと (外)

💬 Dịch nghĩa câu:
「かさは 外に あります。」
-> "Chiếc ô ở bên ngoài."

💡 Phân tích & Giải thích chi tiết:
• Chữ Hán 「外」 (Ngoại) khi đứng độc lập chỉ vị trí "bên ngoài", đọc âm Kun là 「そと」.

🔍 Phân tích các lựa chọn:
- 1. いえ (家): Ngôi nhà
- 2. なか (中): Bên trong
- 3. そと (外): (ĐÚNG) - Bên ngoài
- 4. にわ (庭): Sân vườn

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題1 - Câu 10):
かさは【外】に あります。 -> 3. そと""")

# 問題2 (Q11 - Q18): Cách viết Kanji / Katakana
add_q(11, "けさ しゃわー (シャワー) を あびました。", 1,
"""🎯 Đáp án đúng: [1] シャワー (しゃわー)

💬 Dịch nghĩa câu:
「けさ しゃわーを あびました。」
-> "Sáng nay tôi đã tắm vòi hoa sen."

💡 Phân tích & Giải thích chi tiết:
• Từ ngoại lai 「しゃわー」 (shower) viết bằng Katakana là 「シャワー」 (gồm chữ シ + ャ nhỏ + ワ + dấu trường âm ー).
• Cụm từ cố định: シャワーを浴びる (tắm vòi hoa sen).

🔍 Phân tích các lựa chọn:
- 1. シャワー: (ĐÚNG) - Vòi hoa sen
- 2. シャウー: Sai chữ ワ thành ウ
- 3. ツャワー: Sai chữ シ thành ツ
- 4. ツャウー: Sai cả ツ và ウ

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題2 - Câu 11):
けさ【しゃわー】を あびました。 -> 1. シャワー""")

add_q(12, "コーヒーを のみました (飲みました)。", 2,
"""🎯 Đáp án đúng: [2] 飲みました (のみました)

💬 Dịch nghĩa câu:
「コーヒーを のみました。」
-> "Tôi đã uống cà phê."

💡 Phân tích & Giải thích chi tiết:
• Động từ 「のみます」 (uống) viết bằng chữ Hán 「飲」 (Ẩm - gồm bộ Thực 飠 phía trái và bộ Khiếm 欠 phía phải): 「飲みました」.

🔍 Phân tích các lựa chọn:
- 1. 飯みました: Chữ 飯 (Phạn - cơm: ごはん)
- 2. 飲みました: (ĐÚNG) - Đã uống (chữ 飲 - Ẩm)
- 3. 餃みました: Chữ 餃 (Sủi cảo - ギョーザ)
- 4. 欽みました: Chữ 欽 (Khâm - bộ Kim 金, không phải bộ Thực)

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題2 - Câu 12):
コーヒーを【のみました】。 -> 2. 飲みました""")

add_q(13, "あたらしい くるま (車) を かいました。", 3,
"""🎯 Đáp án đúng: [3] 車 (くるま)

💬 Dịch nghĩa câu:
「あたらしい くるまを かいました。」
-> "Tôi đã mua một chiếc xe ô tô mới."

💡 Phân tích & Giải thích chi tiết:
• Danh từ 「くるま」 (xe hơi, xe cộ) được viết bằng chữ Hán 「車」 (Xa).

🔍 Phân tích các lựa chọn:
- 1. 卓: Chữ Trác (cái bàn: 食卓)
- 2. 束: Chữ Thúc (bó)
- 3. 車: (ĐÚNG) - Chiếc xe (くるま)
- 4. 東: Chữ Đông (phía đông: ひがし)

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題2 - Câu 13):
あたらしい【くるま】を かいました。 -> 3. 車""")

add_q(14, "この ぼうしは 1000えん (1000円) です。", 4,
"""🎯 Đáp án đúng: [4] 1000円 (1000えん)

💬 Dịch nghĩa câu:
「この ぼうしは 1000えんです。」
-> "Chiếc mũ này có giá 1000 yên."

💡 Phân tích & Giải thích chi tiết:
• Đơn vị tiền tệ của Nhật Bản 「えん」 (Yên) viết bằng chữ Hán 「円」 (Viên).

🔍 Phân tích các lựa chọn:
- 1. 1000内: Chữ Nội (bên trong)
- 2. 1000用: Chữ Dụng (sử dụng)
- 3. 1000冊: Chữ Sách (đếm quyển sách)
- 4. 1000円: (ĐÚNG) - 1000 Yên

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題2 - Câu 14):
この ぼうしは【1000えん】です。 -> 4. 1000円""")

add_q(15, "しゅくだいが はんぶん (半分) おわりました。", 4,
"""🎯 Đáp án đúng: [4] 半分 (はんぶん)

💬 Dịch nghĩa câu:
「しゅくだいが はんぶん おわりました。」
-> "Bài tập về nhà đã làm xong được một nửa."

💡 Phân tích & Giải thích chi tiết:
• Từ 「はんぶん」 (một nửa / phân nửa) gồm chữ 「半」 (Bán - một nửa) và 「分」 (Phân - phần): 「半分」.

🔍 Phân tích các lựa chọn:
- 1. 羊分: Sai chữ 羊 (Dương - con cừu)
- 2. 半刀: Sai chữ 刀 (Đao - thanh đao)
- 3. 羊刀: Sai cả 2 chữ Hán
- 4. 半分: (ĐÚNG) - Một nửa (はんぶん)

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題2 - Câu 15):
しゅくだいが【はんぶん】おわりました。 -> 4. 半分""")

add_q(16, "わたしの うちに きませんか (来ませんか)。", 1,
"""🎯 Đáp án đúng: [1] 来ませんか (きませんか)

💬 Dịch nghĩa câu:
「わたしの うちに きませんか。」
-> "Bạn có muốn đến nhà tôi chơi không?"

💡 Phân tích & Giải thích chi tiết:
• Động từ 「きます」 (đến) viết bằng chữ Hán 「来」 (Lai): 「来ませんか」.

🔍 Phân tích các lựa chọn:
- 1. 来ませんか: (ĐÚNG) - Bạn có đến không? (chữ 来 - Lai)
- 2. 釆ませんか: Chữ Biện (khác nét trên)
- 3. 木ませんか: Chữ Mộc (cái cây - き)
- 4. 未ませんか: Chữ Vị (chưa)

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題2 - Câu 16):
わたしの うちに【きませんか】。 -> 1. 来ませんか""")

add_q(17, "きのう たなかさんと あいました (会いました)。", 3,
"""🎯 Đáp án đúng: [3] 会いました (あいました)

💬 Dịch nghĩa câu:
「きのう たなかさんと あいました。」
-> "Hôm qua tôi đã gặp anh Tanaka."

💡 Phân tích & Giải thích chi tiết:
• Động từ 「あいます」 (gặp gỡ ai đó) viết bằng chữ Hán 「会」 (Hội): 「会いました」.

🔍 Phân tích các lựa chọn:
- 1. 見いました: Sai (見ました - đã xem)
- 2. 書いました: Sai (書きました - đã viết)
- 3. 会いました: (ĐÚNG) - Đã gặp (会う -> 会いました)
- 4. 話いました: Sai (話しました - đã nói chuyện)

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題2 - Câu 17):
きのう たなかさんと【あいました】。 -> 3. 会いました""")

add_q(18, "いもうとと おなじ (同じ) ふくを かいました。", 1,
"""🎯 Đáp án đúng: [1] 同じ (おなじ)

💬 Dịch nghĩa câu:
「いもうとと おなじ ふくを かいました。」
-> "Tôi đã mua bộ quần áo giống với em gái."

💡 Phân tích & Giải thích chi tiết:
• Từ 「おなじ」 (giống nhau, cùng loại) viết bằng chữ Hán 「同」 (Đồng): 「同じ」.

🔍 Phân tích các lựa chọn:
- 1. 同じ: (ĐÚNG) - Giống nhau (おなじ)
- 2. 回じ: Chữ Hồi (số lần: ～回)
- 3. 向じ: Chữ Hướng (phía bên kia: 向こう)
- 4. 周じ: Chữ Chu (xung quanh: 周り)

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題2 - Câu 18):
いもうとと【おなじ】ふくを かいました。 -> 1. 同じ""")

# 問題3 (Q19 - Q28): Điền từ vào chỗ trống
add_q(19, "わたしの へやは この（ アパート ）の 2かいです。", 4,
"""🎯 Đáp án đúng: [4] アパート

💬 Dịch nghĩa câu:
「わたしの へやは この（アパート）の 2かいです。」
-> "Phòng của tôi ở tầng 2 của khu căn hộ chung cư này."

💡 Phân tích & Giải thích chi tiết:
• Cụm từ 「この（　）の 2かい」 (tầng 2 của ... này) cần một danh từ chỉ tòa nhà / nơi ở.
• Trong 4 lựa chọn, chỉ có 「アパート」 (chung cư, khu nhà trọ) là tòa nhà có tầng 2.

🔍 Phân tích các lựa chọn:
- 1. エレベーター: Thang máy
- 2. プール: Hồ bơi
- 3. エアコン: Máy điều hòa
- 4. アパート: (ĐÚNG) - Khu căn hộ / nhà chung cư

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題3 - Câu 19):
わたしの へやは この（　）の 2かいです。 -> 4. アパート""")

add_q(20, "さとうさんは ギターを じょうずに（ ひきます ）。", 3,
"""🎯 Đáp án đúng: [3] ひきます (弾きます)

💬 Dịch nghĩa câu:
「さとうさんは ギターを じょうずに（ひきます）。」
-> "Anh Sato chơi đàn guitar rất giỏi."

💡 Phân tích & Giải thích chi tiết:
• Khi nói về việc chơi các nhạc cụ dây hoặc phím (như đàn guitar ギター, đàn piano ピアノ), tiếng Nhật dùng động từ 「弾きます（ひきます）」.

🔍 Phân tích các lựa chọn:
- 1. うたいます (歌います): Hát (dùng với 歌をうたいます)
- 2. ききます (聞きます): Nghe
- 3. ひきます (弾きます): (ĐÚNG) - Chơi đàn, gảy đàn (ギターをひきます)
- 4. あそびます (遊びます): Đi chơi

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題3 - Câu 20):
さとうさんは ギターを じょうずに（　）。 -> 3. ひきます""")

add_q(21, "テーブルに おさらと はしを（ ならべて ）ください。", 1,
"""🎯 Đáp án đúng: [1] ならべて (並べて)

💬 Dịch nghĩa câu:
「テーブルに おさらと はしを（ならべて）ください。」
-> "Hãy xếp đĩa và đũa lên bàn giúp nhé."

💡 Phân tích & Giải thích chi tiết:
• 「テーブルに」 (lên trên mặt bàn) + 「おさらと はしを」 (đĩa và đũa) đi với động từ 「並べます（ならべます）」 nghĩa là bày biện, sắp xếp đồ vật lên bàn ăn.

🔍 Phân tích các lựa chọn:
- 1. ならべて (並べて): (ĐÚNG) - Bày ra, xếp ra
- 2. とって (取って): Lấy
- 3. たべて (食べて): Ăn
- 4. あらって (洗って): Rửa

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題3 - Câu 21):
テーブルに おさらと はしを（　）ください。 -> 1. ならべて""")

add_q(22, "けさ そうじを したから へやは（ きれい ）です。", 1,
"""🎯 Đáp án đúng: [1] きれい

💬 Dịch nghĩa câu:
「けさ そうじを したから へやは（きれい）です。」
-> "Vì sáng nay tôi đã dọn vệ sinh nên căn phòng rất sạch đẹp."

💡 Phân tích & Giải thích chi tiết:
• Mệnh đề nguyên nhân 「そうじをしたから」 (vì đã dọn dẹp vệ sinh) dẫn đến kết quả là căn phòng trở nên sạch sẽ, gọn gàng: 「きれい」.

🔍 Phân tích các lựa chọn:
- 1. きれい: (ĐÚNG) - Sạch sẽ, đẹp đẽ
- 2. きたない (汚い): Bẩn thỉu, bừa bộn
- 3. あかるい (明るい): Sáng sủa
- 4. くらい (暗い): Tối tăm

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題3 - Câu 22):
けさ そうじを したから へやは（　）です。 -> 1. きれい""")

add_q(23, "きょうは 500（ メートル ）およぎました。", 3,
"""🎯 Đáp án đúng: [3] メートル

💬 Dịch nghĩa câu:
「きょうは 500（メートル）およぎました。」
-> "Hôm nay tôi đã bơi được 500 mét."

💡 Phân tích & Giải thích chi tiết:
• Động từ 「およぎました」 (đã bơi) đi với đơn vị đo độ dài quãng đường bơi là 「メートル」 (mét).

🔍 Phân tích các lựa chọn:
- 1. ど (度): Độ (nhiệt độ) hoặc số lần
- 2. ばん (番): Số thứ tự
- 3. メートル: (ĐÚNG) - Mét (500メートル = 500 mét)
- 4. グラム: Gam (đơn vị đo khối lượng)

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題3 - Câu 23):
きょうは 500（　）およぎました。 -> 3. メートル""")

add_q(24, "えきから たいしかんまでの（ ちず ）を かいて ください。", 2,
"""🎯 Đáp án đúng: [2] ちず (地図)

💬 Dịch nghĩa câu:
「えきから たいしかんまでの（ちず）を かいて ください。」
-> "Xin hãy vẽ giúp tôi bản đồ đường đi từ nhà ga đến đại sứ quán."

💡 Phân tích & Giải thích chi tiết:
• Cụm từ 「えきから たいしかんまでの～」 (từ nhà ga đến đại sứ quán) kết hợp với 「かいてください」 (hãy vẽ) -> vẽ bản đồ chỉ đường 「地図（ちず）」.

🔍 Phân tích các lựa chọn:
- 1. しゃしん (写真): Bức ảnh (đi với 撮る - chụp)
- 2. ちず (地図): (ĐÚNG) - Bản đồ (地図をかく = vẽ bản đồ)
- 3. てがみ (手紙): Bức thư
- 4. きっぷ (切符): Vé tàu xe

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題3 - Câu 24):
えきから たいしかんまでの（　）を かいて ください。 -> 2. ちず""")

add_q(25, "うるさいから テレビを（ けして ）ください。", 1,
"""🎯 Đáp án đúng: [1] けして (消して)

💬 Dịch nghĩa câu:
「うるさいから テレビを（けして）ください。」
-> "Vì ồn quá nên hãy tắt tivi đi giúp tôi."

💡 Phân tích & Giải thích chi tiết:
• Vì 「うるさいから」 (vì ồn ào) nên cần tắt thiết bị điện (tivi): dùng động từ 「消します（けします）」 -> 「けしてください」.

🔍 Phân tích các lựa chọn:
- 1. けして (消して): (ĐÚNG) - Hãy tắt (tivi, đèn điện)
- 2. つけて: Hãy bật
- 3. しめて (閉めて): Hãy đóng (cửa)
- 4. あけて (開けて): Hãy mở (cửa)

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題3 - Câu 25):
うるさいから テレビを（　）ください。 -> 1. けして""")

add_q(26, "きょうは（ ゆき ）が ふって います。", 4,
"""🎯 Đáp án đúng: [4] ゆき (雪)

💬 Dịch nghĩa câu:
「きょうは（ゆき）が ふって います。」
-> "Hôm nay tuyết đang rơi."

💡 Phân tích & Giải thích chi tiết:
• Động từ 「降っています（ふっています）」 (đang rơi từ trên trời xuống) chỉ kết hợp với 「雨（あめ - mưa）」 hoặc 「雪（ゆき - tuyết）」.

🔍 Phân tích các lựa chọn:
- 1. くもり (曇り): Trời nhiều mây
- 2. はれ (晴れ): Trời nắng quang đãng
- 3. かぜ (風): Gió (đi với 吹く - thổi)
- 4. ゆき (雪): (ĐÚNG) - Tuyết (雪が降っています = tuyết đang rơi)

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題3 - Câu 26):
きょうは（　）が ふって います。 -> 4. ゆき""")

add_q(27, "はこに りんごが（ いつつ ）あります。", 2,
"""🎯 Đáp án đúng: [2] いつつ (五つ)

💬 Dịch nghĩa câu:
「はこに りんごが（いつつ）あります。」
-> "Trong hộp có 5 quả táo."

💡 Phân tích & Giải thích chi tiết:
• Quan sát hình minh họa trong đề thi: Bên trong chiếc hộp có đúng 5 quả táo.
• Cách đếm đồ vật nói chung (ひとつ、ふたつ、みっつ、よっつ、いつつ...): 5 quả là 「いつつ」 (五つ).

🔍 Phân tích các lựa chọn:
- 1. よっつ (四つ): 4 quả
- 2. いつつ (五つ): (ĐÚNG) - 5 quả
- 3. むっつ (六つ): 6 quả
- 4. ななつ (七つ): 7 quả

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題3 - Câu 27):
はこに りんごが（　）あります。[Hình 5 quả táo] -> 2. いつつ""")

add_q(28, "めがねは つくえの（ うえ ）に あります。", 4,
"""🎯 Đáp án đúng: [4] うえ (上)

💬 Dịch nghĩa câu:
「めがねは つくえの（うえ）に あります。」
-> "Cặp mắt kính nằm ở trên mặt bàn."

💡 Phân tích & Giải thích chi tiết:
• Quan sát hình minh họa trong đề thi: Cặp mắt kính (めがね) được đặt nằm ngay phía trên mặt bàn (つくえの上), trong khi chiếc túi xách ở dưới gầm bàn và chiếc ô ở cạnh ghế.

🔍 Phân tích các lựa chọn:
- 1. そば: Bên cạnh
- 2. よこ (横): Ngay sát bên hông
- 3. した (下): Phía dưới, gầm bàn
- 4. うえ (上): (ĐÚNG) - Phía trên mặt bàn

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題3 - Câu 28):
めがねは つくえの（　）に あります。[Hình mắt kính trên mặt bàn] -> 4. うえ""")

# 問題4 (Q29 - Q33): Câu đồng nghĩa
add_q(29, "まいばん くにの かぞくに でんわします。", 3,
"""🎯 Đáp án đúng: [3] よるは いつも くにの かぞくに でんわします。

💬 Dịch nghĩa câu:
「まいばん くにの かぞくに でんわします。」
-> "Mỗi tối tôi đều gọi điện thoại cho gia đình ở quê nhà."

💡 Phân tích & Giải thích chi tiết:
• 「まいばん（毎晩）」 nghĩa là "mỗi buổi tối / tối nào cũng", đồng nghĩa hoàn toàn với 「よるは いつも」 (buổi tối lúc nào cũng).

🔍 Phân tích các lựa chọn:
- 1. よるは ときどき...: Buổi tối thỉnh thoảng (sai vì ときどき là thỉnh thoảng)
- 2. あさは ときどき...: Buổi sáng thỉnh thoảng (sai cả thời điểm lẫn tần suất)
- 3. よるは いつも くにの かぞくに でんわします。: (ĐÚNG) - Buổi tối lúc nào tôi cũng gọi điện cho gia đình ở nước nhà
- 4. あさは いつも...: Buổi sáng lúc nào cũng (sai thời điểm あさ)

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題4 - Câu 29):
【まいばん】くにの かぞくに でんわします。 -> 3. よるは いつも くにの かぞくに でんわします。""")

add_q(30, "この まちには ゆうめいな たてものが あります。", 1,
"""🎯 Đáp án đúng: [1] この まちには ゆうめいな ビルが あります。

💬 Dịch nghĩa câu:
「この まちには ゆうめいな たてものが あります。」
-> "Ở thị trấn này có một tòa nhà nổi tiếng."

💡 Phân tích & Giải thích chi tiết:
• 「たてもの（建物）」 nghĩa là "tòa nhà, công trình kiến trúc", tương đương với từ 「ビル」 (building - tòa nhà cao tầng).

🔍 Phân tích các lựa chọn:
- 1. この まちには ゆうめいな ビルが あります。: (ĐÚNG) - Ở thị trấn này có một tòa nhà (ビル) nổi tiếng
- 2. おちゃ (trà): Sai nghĩa
- 3. ケーキ (bánh kem): Sai nghĩa
- 4. こうえん (công viên): Không phải là たてもの (tòa nhà)

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題4 - Câu 30):
この まちには ゆうめいな【たてもの】が あります。 -> 1. この まちには ゆうめいな ビルが あります。""")

add_q(31, "その えいがは おもしろくなかったです。", 2,
"""🎯 Đáp án đúng: [2] その えいがは つまらなかったです。

💬 Dịch nghĩa câu:
「その えいがは おもしろくなかったです。」
-> "Bộ phim đó đã không thú vị (không hay)."

💡 Phân tích & Giải thích chi tiết:
• 「おもしろくなかった」 (đã không thú vị / không hấp dẫn) đồng nghĩa với 「つまらなかった」 (đã nhàm chán, tẻ nhạt).

🔍 Phân tích các lựa chọn:
- 1. たのしかったです: Đã rất vui (trái nghĩa)
- 2. その えいがは つまらなかったです。: (ĐÚNG) - Bộ phim đó đã rất nhàm chán
- 3. みじかかったです: Đã ngắn
- 4. ながかったです: Đã dài

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題4 - Câu 31):
その えいがは【おもしろくなかった】です。 -> 2. その えいがは つまらなかったです。""")

add_q(32, "たんじょうびは 6がつ15にちです。", 3,
"""🎯 Đáp án đúng: [3] 6がつ15にちに うまれました。

💬 Dịch nghĩa câu:
「たんじょうびは 6がつ15にちです。」
-> "Sinh nhật của tôi là ngày 15 tháng 6."

💡 Phân tích & Giải thích chi tiết:
• 「たんじょうび（誕生日）」 là "ngày sinh nhật", tức là ngày mình được sinh ra đời: 「うまれました（生まれました）」.

🔍 Phân tích các lựa chọn:
- 1. 6がつ15にちに けっこんしました。: Đã kết hôn vào ngày 15/6
- 2. 6がつ15にちに テストが はじまりました。: Bài kiểm tra bắt đầu vào ngày 15/6
- 3. 6がつ15にちに うまれました。: (ĐÚNG) - Đã sinh ra vào ngày 15 tháng 6
- 4. 6がつ15にちに くにへ かえりました。: Đã về nước vào ngày 15/6

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題4 - Câu 32):
【たんじょうびは 6がつ15にちです。】 -> 3. 6がつ15にちに うまれました。""")

add_q(33, "にねんまえに きょうとへ いきました。", 4,
"""🎯 Đáp án đúng: [4] おととし きょうとへ いきました。

💬 Dịch nghĩa câu:
「にねんまえに きょうとへ いきました。」
-> "Hai năm trước tôi đã đi Kyoto."

💡 Phân tích & Giải thích chi tiết:
• 「にねんまえ（二年前）」 (2 năm trước) đồng nghĩa trực tiếp với danh từ chỉ thời gian 「おととし（一昨年 - năm kia）」.

🔍 Phân tích các lựa chọn:
- 1. きのう (昨日): Hôm qua
- 2. おととい (一昨日): Hôm kia (2 ngày trước)
- 3. きょねん (去年): Năm ngoái (1 năm trước)
- 4. おととし きょうとへ いきました。: (ĐÚNG) - Năm kia (2 năm trước) tôi đã đi Kyoto

📄 Trích PDF gốc (N5 7/2017 - 文字・語彙 問題4 - Câu 33):
【にねんまえ】に きょうとへ いきました。 -> 4. おととし きょうとへ いきました。""")

# ==============================================================================
# SECTION 2: 言語知識（文法）・読解 (Global Q34 - Q65 / Section Q1 - Q32)
# ==============================================================================
# 問題1 (Global Q34 - Q49 / Section Q1 - Q16): Ngữ pháp điền câu
add_q(34, "日本（ の ）ラーメンは おいしいです。", 2,
"""🎯 Đáp án đúng: [2] の

💬 Dịch nghĩa câu:
「日本の ラーメンは おいしいです。」
-> "Mì Ramen của Nhật Bản rất ngon."

💡 Phân tích & Giải thích chi tiết:
• Trợ từ 「の」 dùng để nối hai danh từ 「日本」 (Nhật Bản) và 「ラーメン」 (mì Ramen), biểu thị nguồn gốc/sở hữu: 「日本のラーメン」.

🔍 Phân tích các lựa chọn:
- 1. に: Chỉ địa điểm/thời gian
- 2. の: (ĐÚNG) - Của / thuộc về (日本のラーメン)
- 3. を: Chỉ tân ngữ trực tiếp của động từ
- 4. へ: Chỉ phương hướng di chuyển

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 1):
日本（　）ラーメンは おいしいです。 -> 2. の""")

add_q(35, "わたしには きょうだいが 二人 います。弟（ と ）妹です。", 3,
"""🎯 Đáp án đúng: [3] と

💬 Dịch nghĩa câu:
「わたしには きょうだいが 二人 います。弟と 妹です。」
-> "Tôi có hai người anh chị em. Đó là em trai và em gái."

💡 Phân tích & Giải thích chi tiết:
• Trợ từ 「と」 dùng để liệt kê đầy đủ các danh từ ngang hàng nhau: 「弟と妹」 (em trai và em gái).

🔍 Phân tích các lựa chọn:
- 1. は: Trợ từ chủ đề
- 2. も: Cũng
- 3. と: (ĐÚNG) - Và (liệt kê 弟と妹)
- 4. か: Hoặc (chỉ sự lựa chọn)

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 2):
わたしには きょうだいが 二人 います。弟（　）妹です。 -> 3. と""")

add_q(36, "山下「田中さん（ は ）きのう どこかに 出かけましたか。」", 2,
"""🎯 Đáp án đúng: [2] は

💬 Dịch nghĩa câu:
「山下：田中さんは きのう どこかに 出かけましたか。
　田中：いいえ、いえに いました。」
-> "Yamashita: Hôm qua anh Tanaka có đi ra ngoài đâu không?
　Tanaka: Không, tôi đã ở nhà."

💡 Phân tích & Giải thích chi tiết:
• Trợ từ 「は」 đứng sau chủ ngữ 「田中さん」 để nêu chủ đề của câu hỏi.

🔍 Phân tích các lựa chọn:
- 1. で: Chỉ nơi diễn ra hành động / phương tiện
- 2. は: (ĐÚNG) - Trợ từ đánh dấu chủ đề câu (田中さんは)
- 3. を: Trợ từ tân ngữ
- 4. に: Trợ từ chỉ đích đến / thời điểm

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 3):
山下「田中さん（　）きのう どこかに 出かけましたか。」 -> 2. は""")

add_q(37, "A「つぎの かどを 右（ に ）まがって ください。」", 4,
"""🎯 Đáp án đúng: [4] に

💬 Dịch nghĩa câu:
「（タクシーで）
　A：つぎの かどを 右に まがって ください。
　B：わかりました。」
-> "(Trên xe taxi) A: Hãy rẽ phải ở góc đường tiếp theo. / B: Tôi hiểu rồi."

💡 Phân tích & Giải thích chi tiết:
• Cấu trúc chỉ hướng rẽ: 「右 / 左 に（へ）曲がる」 (rẽ sang bên phải / bên trái). Do đó điền trợ từ 「に」.

🔍 Phân tích các lựa chọn:
- 1. が: Trợ từ chủ ngữ
- 2. や: Liệt kê không đầy đủ
- 3. か: Hoặc / nghi vấn
- 4. に: (ĐÚNG) - Chỉ phương hướng chuyển động (右に曲がる)

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 4):
つぎの かどを 右（　）まがって ください。 -> 4. に""")

add_q(38, "きのう、わたしは ひとり（ で ）えいがを 見に 行きました。", 3,
"""🎯 Đáp án đúng: [3] で

💬 Dịch nghĩa câu:
「きのう、わたしは ひとりで えいがを 見に 行きました。」
-> "Hôm qua tôi đã đi xem phim một mình."

💡 Phân tích & Giải thích chi tiết:
• Trợ từ 「で」 đi sau từ chỉ số lượng người biểu thị trạng thái thực hiện hành động: 「ひとりで」 (một mình).

🔍 Phân tích các lựa chọn:
- 1. が: Trợ từ chủ ngữ
- 2. を: Trợ từ tân ngữ
- 3. で: (ĐÚNG) - Chỉ trạng thái số người thực hiện (ひとりで = một mình)
- 4. は: Trợ từ chủ đề

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 5):
きのう、わたしは ひとり（　）えいがを 見に 行きました。 -> 3. で""")

add_q(39, "山下「今日 パーティーが ありますから、田中さん（ も ）来て ください。」", 2,
"""🎯 Đáp án đúng: [2] も

💬 Dịch nghĩa câu:
「山下：今日 パーティーが ありますから、田中さんも 来て ください。
　田中：ありがとうございます。」
-> "Yamashita: Hôm nay có bữa tiệc đấy, anh Tanaka cũng hãy đến nhé!
　Tanaka: Cảm ơn anh."

💡 Phân tích & Giải thích chi tiết:
• Khi mời thêm một người nữa cùng tham gia bữa tiệc với mọi người, ta dùng trợ từ 「も」 (cũng): 「田中さんも来てください」.

🔍 Phân tích các lựa chọn:
- 1. に: Sai cấu trúc chủ ngữ
- 2. も: (ĐÚNG) - Cũng (anh Tanaka cũng hãy đến nhé)
- 3. や: Liệt kê danh từ
- 4. で: Phương tiện / nơi chốn

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 6):
今日 パーティーが ありますから、田中さん（　）来て ください。 -> 2. も""")

add_q(40, "田中「この ぼうしは 山田さん（ の ）ですか。」", 3,
"""🎯 Đáp án đúng: [3] の

💬 Dịch nghĩa câu:
「田中：この ぼうしは 山田さんのですか。
　山田：はい。」
-> "Tanaka: Chiếc mũ này là của anh Yamada phải không? / Yamada: Vâng."

💡 Phân tích & Giải thích chi tiết:
• Trợ từ 「の」 đứng sau danh từ chỉ người ở vị trí vị ngữ (「山田さんのですか」 = 「山田さんのぼうしですか」) mang nghĩa "cái của anh Yamada".

🔍 Phân tích các lựa chọn:
- 1. や: Liệt kê
- 2. は: Chủ đề
- 3. の: (ĐÚNG) - Của (山田さんの = của anh Yamada)
- 4. か: Hoặc

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 7):
この ぼうしは 山田さん（　）ですか。 -> 3. の""")

add_q(41, "駅まで タクシーで 1000円（ ぐらい ）です。", 1,
"""🎯 Đáp án đúng: [1] ぐらい

💬 Dịch nghĩa câu:
「駅まで タクシーで 1000円ぐらいです。」
-> "Đi đến nhà ga bằng taxi hết khoảng 1000 yên."

💡 Phân tích & Giải thích chi tiết:
• 「ぐらい / くらい」 đi sau từ chỉ số lượng / giá tiền (1000円) để chỉ mức độ ước lượng "khoảng chừng ~".
• Phân biệt với 「ごろ」 chỉ dùng sau mốc thời gian (ví dụ: 3時ごろ).

🔍 Phân tích các lựa chọn:
- 1. ぐらい: (ĐÚNG) - Khoảng chừng (đi với số lượng, giá tiền 1000円ぐらい)
- 2. など: Vân vân
- 3. ごろ: Khoảng (chỉ dùng cho mốc giờ giấc/thời điểm)
- 4. も: Đến tận / cũng

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 8):
駅まで タクシーで 1000円（　）です。 -> 1. ぐらい""")

add_q(42, "A「さようなら。」 B「さようなら。また（ 来週 ）。」", 3,
"""🎯 Đáp án đúng: [3] 来週 (らいしゅう)

💬 Dịch nghĩa câu:
「A：さようなら。
　B：さようなら。また来週。」
-> "A: Tạm biệt nhé. / B: Tạm biệt. Hẹn gặp lại tuần sau nhé!"

💡 Phân tích & Giải thích chi tiết:
• Trong câu chào tạm biệt 「また + [thời gian tương lai]」 (Hẹn gặp lại vào ~), từ chỉ thời gian phải là tương lai: 「来週（らいしゅう - tuần sau）」.

🔍 Phân tích các lựa chọn:
- 1. おととい: Hôm kia (quá khứ)
- 2. 今日 (きょう): Hôm nay
- 3. 来週 (らいしゅう): (ĐÚNG) - Tuần sau (また来週 = Hẹn gặp lại tuần sau)
- 4. 今月 (こんげつ): Tháng này

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 9):
B「さようなら。また（　）。」 -> 3. 来週""")

add_q(43, "母は 50さいです。父は 55さいです。母は 父（ より ）5さい わかいです。", 3,
"""🎯 Đáp án đúng: [3] より

💬 Dịch nghĩa câu:
「わたしの 母は 50さいです。父は 55さいです。母は 父より 5さい わかいです。」
-> "Mẹ tôi 50 tuổi. Bố tôi 55 tuổi. Mẹ tôi trẻ hơn bố tôi 5 tuổi."

💡 Phân tích & Giải thích chi tiết:
• Cấu trúc so sánh hơn: 「A は B より + Tính từ」 (A hơn B...).
• Mẹ (50 tuổi) trẻ hơn bố (55 tuổi) 5 tuổi -> 「母は 父より 5さい わかいです」.

🔍 Phân tích các lựa chọn:
- 1. から: Từ ~
- 2. まで: Đến ~
- 3. より: (ĐÚNG) - So với / hơn (父よりわかい = trẻ hơn bố)
- 4. のほうが: Phía ~ hơn (nếu dùng のほうが thì phải viết 父のほうが年上, không đi trước 5さいわかいです)

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 10):
母は 父（　）5さい わかいです。 -> 3. より""")

add_q(44, "子ども「いただきます。」 母「あ、食べる（ まえに ）手を あらいましょう。」", 1,
"""🎯 Đáp án đúng: [1] まえに

💬 Dịch nghĩa câu:
「子ども：いただきます。
　母：あ、食べる まえに 手を あらいましょう。」
-> "Con: Con xin phép ăn cơm ạ. / Mẹ: Ơ kìa, trước khi ăn chúng ta hãy rửa tay đã nhé."

💡 Phân tích & Giải thích chi tiết:
• Cấu trúc 「Vる (nguyên mẫu) + まえに」 (trước khi làm V) hoặc 「Danh từ + の + まえに」.
• Vì 「食べる」 là động từ thể nguyên mẫu (Vる) nên đi trực tiếp với 「まえに」 (không có の).

🔍 Phân tích các lựa chọn:
- 1. まえに: (ĐÚNG) - Trước khi (食べるまえに = trước khi ăn)
- 2. のまえに: Sai ngữ pháp (のまえに chỉ đi sau Danh từ, ví dụ: 食事のまえに)
- 3. あとに: Sai cả nghĩa lẫn ngữ pháp (sau khi ăn)
- 4. のあとに: Sai nghĩa

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 11):
あ、食べる（　）手を あらいましょう。 -> 1. まえに""")

add_q(45, "B「ええ、ふりますよ。でも、きょねんは あまり（ ふりませんでした ）。」", 1,
"""🎯 Đáp án đúng: [1] ふりませんでした

💬 Dịch nghĩa câu:
「A：東京でも 雪が ふりますか。
　B：ええ、ふりますよ。でも、きょねんは あまり ふりませんでした。」
-> "A: Ở Tokyo tuyết cũng rơi à? / B: Vâng, có rơi chứ. Nhưng năm ngoái thì đã không rơi nhiều lắm."

💡 Phân tích & Giải thích chi tiết:
• Có trạng từ 「きょねん（去年 - năm ngoái）」 chỉ quá khứ VÀ phó từ 「あまり」 (không ~ lắm, luôn đi với thể phủ định).
• Do đó động từ phải chia ở thể phủ định quá khứ: 「ふりませんでした」.

🔍 Phân tích các lựa chọn:
- 1. ふりませんでした: (ĐÚNG) - Đã không rơi (quá khứ phủ định đi với きょねん + あまり)
- 2. ふりません: Hiện tại phủ định (sai vì có きょねん)
- 3. ふりました: Quá khứ khẳng định (sai vì あまり phải đi với phủ định)
- 4. ふります: Hiện tại khẳng định

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 12):
でも、きょねんは あまり（　）。 -> 1. ふりませんでした""")

add_q(46, "A「見て ください。小さな 魚が たくさん（ およいで います ）よ。」", 4,
"""🎯 Đáp án đúng: [4] およいで います

💬 Dịch nghĩa câu:
「（川で）
　A：見て ください。小さな 魚が たくさん およいで いますよ。
　B：ほんとうですね。30びきくらい いますね。」
-> "(Ở bờ sông) A: Hãy nhìn kìa! Có rất nhiều cá nhỏ đang bơi đấy. / B: Đúng thật nhỉ. Có khoảng 30 con nhỉ."

💡 Phân tích & Giải thích chi tiết:
• Câu mở đầu bằng 「見てください」 (Hãy nhìn kìa!) miêu tả cảnh tượng đang diễn ra ngay trước mắt người nói -> Dùng thì hiện tại tiếp diễn 「Vて + います」: 「およいで います」.

🔍 Phân tích các lựa chọn:
- 1. およぎます: Thì hiện tại đơn / tương lai
- 2. およぎません: Phủ định
- 3. およぎました: Quá khứ
- 4. およいで います: (ĐÚNG) - Đang bơi (diễn tả hành động đang diễn ra trước mắt)

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 13):
見て ください。小さな 魚が たくさん（　）よ。 -> 4. およいで います""")

add_q(47, "山田「いえ、これは 兄に（ もらいました ）。」", 2,
"""🎯 Đáp án đúng: [2] もらいました

💬 Dịch nghĩa câu:
「中川：山田さんの その カメラは いいですね。どこで かいましたか。
　山田：いえ、これは 兄に もらいました。」
-> "Nakagawa: Chiếc máy ảnh đó của anh Yamada đẹp quá nhỉ. Anh mua ở đâu thế?
　Yamada: Không, cái này là tôi được anh trai tặng (nhận từ anh trai) đấy."

💡 Phân tích & Giải thích chi tiết:
• Chủ ngữ là 「わたし（山田）」 nhận món đồ từ 「兄に」 (từ anh trai) -> Dùng động từ nhận 「もらいました」 (Tôi đã nhận từ anh trai).

🔍 Phân tích các lựa chọn:
- 1. あげました: Tôi tặng cho anh trai (trái ngược ngữ cảnh vì Yamada đang sở hữu máy ảnh)
- 2. もらいました: (ĐÚNG) - Tôi đã nhận được từ anh trai (兄にもらいました)
- 3. うりました: Đã bán
- 4. かいました: Đã mua (sai vì Yamada vừa trả lời 「いえ」 - không phải mua)

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 14):
山田「いえ、これは 兄に（　）。」 -> 2. もらいました""")

add_q(48, "たまごりょうりの じょうずな 作りかたを（ 何かで ）読みました。", 4,
"""🎯 Đáp án đúng: [4] 何かで

💬 Dịch nghĩa câu:
「たまごりょうりの じょうずな 作りかたを 何かで 読みました。」
-> "Tôi đã đọc cách chế biến món trứng ngon ở đâu đó (trên một ấn phẩm/phương tiện nào đó)."

💡 Phân tích & Giải thích chi tiết:
• Khi đọc thông tin trên sách, báo, tạp chí hoặc phương tiện truyền thông, ta dùng trợ từ 「で」 (예: 本で読みました / 雑誌で読みました).
• Do không nhớ rõ là sách hay tạp chí nào nên dùng đại từ bất định 「何か」 + trợ từ 「で」 -> 「何かで読みました」 (đã đọc trên một cái gì đó).

🔍 Phân tích các lựa chọn:
- 1. 何に: Sai trợ từ
- 2. 何も: Đi với phủ định (không đọc cái gì cả)
- 3. 何かへ: へ chỉ phương hướng di chuyển
- 4. 何かで: (ĐÚNG) - Đọc ở đâu đó / trên ấn phẩm nào đó

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 15):
たまごりょうりの じょうずな 作りかたを（　）読みました。 -> 4. 何かで""")

add_q(49, "北山「あ、北山花子です。すみません、（ ひろこさんを おねがいします ）。」", 1,
"""🎯 Đáp án đúng: [1] ひろこさんを おねがいします

💬 Dịch nghĩa câu:
「（電話で）
　本田：はい、本田です。
　北山：あ、北山花子です。すみません、ひろこさんを おねがいします。
　本田：はい。ちょっと まって くださいね。」
-> "(Qua điện thoại) Honda: Vâng, nhà Honda nghe ạ. / Kitayama: À, cháu là Kitayama Hanako đây ạ. Xin lỗi, cho cháu gặp bạn Hiroko với ạ. / Honda: Vâng, đợi một chút nhé."

💡 Phân tích & Giải thích chi tiết:
• Mẫu câu giao tiếp chuẩn khi gọi điện thoại muốn nhờ chuyển máy gặp một người nào đó: 「[Tên người] + を おねがいします」.

🔍 Phân tích các lựa chọn:
- 1. ひろこさんを おねがいします: (ĐÚNG) - Xin cho gặp bạn Hiroko ạ
- 2. ひろこさんを ください: Sai (ください chỉ dùng khi xin/mua đồ vật)
- 3. ひろこさんと 話しますか: Bạn có nói chuyện với Hiroko không?
- 4. ひろこさんと 話しませんか: Cùng nói chuyện với Hiroko nhé?

📄 Trích PDF gốc (N5 7/2017 - 文法 問題1 - Câu 16):
北山「あ、北山花子です。すみません、（　）。」 -> 1. ひろこさんを おねがいします""")

# 問題2 (Global Q50 - Q54 / Section Q17 - Q21): Sắp xếp dấu sao ★
add_q(50, "田中「すみません。くだもの ＿ ＿ ★[に] ＿ か。」 (くだものは どこに ありますか)", 4,
"""🎯 Đáp án đúng: [4] に

💬 Dịch nghĩa câu hoàn chỉnh:
「田中：すみません。くだものは どこに ありますか。
　店の人：こちらです。」
-> "Tanaka: Xin lỗi, quầy trái cây ở đâu vậy ạ? / Nhân viên: Ở lối này ạ."

💡 Phân tích & Giải thích chi tiết:
• Các từ cho sẵn: `1. どこ` | `2. あります` | `3. は` | `4. に`
• Cấu trúc hỏi vị trí đồ vật: 「N は どこ に ありますか」.
• Thứ tự đúng của 4 chỗ trống: `くだもの [3. は] [1. どこ] [4. ★に] [2. あります] か。`
• Vị trí dấu sao ★ (ô thứ 3) là phương án **[4] に**.

📄 Trích PDF gốc (N5 7/2017 - 文法 問題2 - Câu 17):
くだもの [3:は] [1:どこ] ★[4:に] [2:あります] か。 -> 4. に""")

add_q(51, "B「となりの へやで ＿ ＿ ★[れんしゅう] ＿ して います。」 (ギターの れんしゅうを しています)", 1,
"""🎯 Đáp án đúng: [1] れんしゅう

💬 Dịch nghĩa câu hoàn chỉnh:
「A：山下さんは？
　B：となりの へやで ギターの れんしゅうを して います。」
-> "A: Anh Yamashita đâu rồi? / B: Anh ấy đang tập đàn guitar ở phòng bên cạnh."

💡 Phân tích & Giải thích chi tiết:
• Các từ cho sẵn: `1. れんしゅう` | `2. の` | `3. ギター` | `4. を`
• Cụm danh từ: 「ギターのれんしゅう」 (việc luyện tập đàn guitar) + 「をしています」 (đang thực hiện).
• Thứ tự đúng của 4 chỗ trống: `となりの へやで [3. ギター] [2. の] [1. ★れんしゅう] [4. を] して います。`
• Vị trí dấu sao ★ (ô thứ 3) là phương án **[1] れんしゅう**.

📄 Trích PDF gốc (N5 7/2017 - 文法 問題2 - Câu 18):
となりの へやで [3:ギター] [2:の] ★[1:れんしゅう] [4:を] して います。 -> 1. れんしゅう""")

add_q(52, "A「会社 ＿ ＿ ★[何] ＿ 行って いますか。」 (会社へは 何で 行っていますか)", 4,
"""🎯 Đáp án đúng: [4] 何

💬 Dịch nghĩa câu hoàn chỉnh:
「A：会社へは 何で 行って いますか。
　B：わたしは あるいて 行って います。」
-> "A: Bạn đi đến công ty bằng phương tiện gì? / B: Tôi đi bộ đến công ty."

💡 Phân tích & Giải thích chi tiết:
• Các từ cho sẵn: `1. で` | `2. は` | `3. へ` | `4. 何`
• Câu trả lời là 「あるいて 行っています」 (đi bộ), nên câu hỏi phải hỏi phương tiện di chuyển: 「何で（なんで）行っていますか」.
• Thứ tự đúng: `会社 [3. へ] [2. は] [4. ★何] [1. で] 行って いますか。`
• Vị trí dấu sao ★ là phương án **[4] 何**.

📄 Trích PDF gốc (N5 7/2017 - 文法 問題2 - Câu 19):
会社 [3:へ] [2:は] ★[4:何] [1:で] 行って いますか。 -> 4. 何""")

add_q(53, "ジョン「いいえ、まだです。ここ ＿ ＿ ★[かんたんでした] ＿ 、さいごの もんだいが むずかしいです。」", 2,
"""🎯 Đáp án đúng: [2] かんたんでした

💬 Dịch nghĩa câu hoàn chỉnh:
「ジョン：いいえ、まだです。ここまでは かんたんでしたが、さいごの もんだいが むずかしいです。」
-> "John: Không, vẫn chưa xong. Đến chỗ này thì dễ, nhưng câu hỏi cuối cùng lại khó."

💡 Phân tích & Giải thích chi tiết:
• Các từ cho sẵn: `1. は` | `2. かんたんでした` | `3. が` | `4. まで`
• Hai vế đối lập nối với nhau bằng liên từ 「が」 (nhưng): 「ここまでは かんたんでしたが」 (tới đoạn này thì đã dễ, nhưng...).
• Thứ tự đúng của 4 chỗ trống: `ここ [4. まで] [1. は] [2. ★かんたんでした] [3. が]、さいごの もんだいが むずかしいです。`
• Vị trí dấu sao ★ (ô thứ 3) là phương án **[2] かんたんでした**.

📄 Trích PDF gốc (N5 7/2017 - 文法 問題2 - Câu 20):
ここ [4:まで] [1:は] ★[2:かんたんでした] [3:が] -> 2. かんたんでした""")

add_q(54, "アンナ「わたしは もう 少し ＿ ＿ ★[かんたんな] ＿ が いいです。」 (日本語が かんたんな 本)", 2,
"""🎯 Đáp án đúng: [2] かんたんな

💬 Dịch nghĩa câu hoàn chỉnh:
「ヤン：わたしは この 本を 買います。アンナさんは どんな 本が いいですか。
　アンナ：わたしは もう 少し 日本語が かんたんな 本が いいです。」
-> "Yan: Tôi mua quyển sách này. Còn Anna thích quyển sách như thế nào?
　Anna: Tôi thích quyển sách có tiếng Nhật dễ hơn một chút."

💡 Phân tích & Giải thích chi tiết:
• Các từ cho sẵn: `1. 本` | `2. かんたんな` | `3. が` | `4. 日本語`
• Mệnh đề định ngữ bổ nghĩa cho danh từ 「本」 (quyển sách): 「日本語が かんたんな 本」 (quyển sách có tiếng Nhật đơn giản/dễ).
• Thứ tự đúng: `もう 少し [4. 日本語] [3. が] [2. ★かんたんな] [1. 本] が いいです。`
• Vị trí dấu sao ★ là phương án **[2] かんたんな**.

📄 Trích PDF gốc (N5 7/2017 - 文法 問題2 - Câu 21):
もう 少し [4:日本語] [3:が] ★[2:かんたんな] [1:本] が いいです。 -> 2. かんたんな""")

# 問題3 (Global Q55 - Q59 / Section Q22 - Q26): Ngữ pháp đoạn văn
add_q(55, "日本に【22: 来てから 】、いろいろな 店で 食べました。", 4,
"""🎯 Đáp án đúng: [4] 来てから

💬 Dịch nghĩa đoạn văn (1) của bạn Ken:
「日本で べんきょうして いる 学生が『すきな 店』の ぶんしょうを 書いて、クラスの みんなの 前で 読みました。
　わたしは すしが すきです。… 日本に【来てから】、いろいろな 店で 食べました。」
-> "Từ sau khi đến Nhật Bản, tôi đã ăn thử ở rất nhiều cửa hàng khác nhau."

💡 Phân tích & Giải thích chi tiết:
• Người viết (Ken) hiện đang là du học sinh đang ở Nhật Bản (「日本で べんきょうしている学生」).
• Khi người nói đang ở tại địa điểm đích (Nhật Bản), hành động di chuyển tới Nhật phải dùng động từ 「来る（くる）」, kết hợp cấu trúc 「Vてから」 (sau khi ~): 「日本に来てから」 (từ sau khi đến Nhật).

🔍 Phân tích các lựa chọn:
- 1. 行くから: Vì đi (sai hướng di chuyển và cấu trúc)
- 2. 行ってから: Sau khi đi (sai vì Ken đang ở tại Nhật Bản)
- 3. 来るから: Vì đến
- 4. 来てから: (ĐÚNG) - Từ sau khi đến Nhật Bản

📄 Trích PDF gốc (N5 7/2017 - 文法 問題3 - Câu 22):
日本に【22】、いろいろな 店で 食べました。 -> 4. 来てから""")

add_q(56, "すしが すきな 人は、いっしょに【23: 行きませんか 】。", 2,
"""🎯 Đáp án đúng: [2] 行きませんか

💬 Dịch nghĩa câu:
「学校の 前の 店は、安くて おいしいです。すしが すきな 人は、いっしょに【行きませんか】。」
-> "Cửa hàng sushi ở trước cổng trường vừa rẻ vừa ngon. Những bạn nào thích sushi thì cùng đi ăn với mình nhé?"

💡 Phân tích & Giải thích chi tiết:
• Ken đang đọc bài văn trước cả lớp để giới thiệu quán sushi yêu thích và rủ các bạn trong lớp cùng đi ăn.
• Mẫu câu rủ rê, mời gọi lịch sự trong tiếng Nhật là 「いっしょに Vませんか」 -> 「いっしょに 行きませんか」.

🔍 Phân tích các lựa chọn:
- 1. 行きましたか: Đã đi chưa?
- 2. 行きませんか: (ĐÚNG) - Cùng đi với mình không? (mẫu câu mời/rủ rê)
- 3. 行って いましたか: Đã đang ở đó phải không?
- 4. 行って いませんか: Chưa đi phải không?

📄 Trích PDF gốc (N5 7/2017 - 文法 問題3 - Câu 23):
すしが すきな 人は、いっしょに【23】。 -> 2. 行きませんか""")

add_q(57, "えきの ちかくの 本屋【24: は 】大きい お店です。", 4,
"""🎯 Đáp án đúng: [4] は

💬 Dịch nghĩa câu:
「わたしは えきの ちかくの 本屋が すきです。えきの ちかくの 本屋【は】大きい お店です。」
-> "Tôi thích hiệu sách ở gần nhà ga. Hiệu sách ở gần nhà ga là một cửa hàng lớn."

💡 Phân tích & Giải thích chi tiết:
• Câu đầu tiên giới thiệu 「えきの ちかくの 本屋」; câu thứ hai lặp lại cụm danh từ này làm chủ đề chính để miêu tả đặc điểm (「大きいお店です」) nên dùng trợ từ chủ đề 「は」.

🔍 Phân tích các lựa chọn:
- 1. か: Hoặc / nghi vấn
- 2. と: Và
- 3. の: Của
- 4. は: (ĐÚNG) - Trợ từ đánh dấu chủ đề câu (本屋は大きいお店です)

📄 Trích PDF gốc (N5 7/2017 - 文法 問題3 - Câu 24):
えきの ちかくの 本屋【24】大きい お店です。 -> 4. は""")

add_q(58, "外国の 本も 売って います。わたしの 国のも【25: あります 】。", 3,
"""🎯 Đáp án đúng: [3] あります

💬 Dịch nghĩa câu:
「外国の 本も 売って います。わたしの 国のも【あります】。」
-> "Ở đó cũng có bán cả sách nước ngoài. Sách của đất nước tôi cũng có nữa."

💡 Phân tích & Giải thích chi tiết:
• 「わたしの国の（本）も」 (Sách của nước tôi cũng...) là danh từ chỉ đồ vật vô tri (sách), nên động từ chỉ sự tồn tại "có" phải là 「あります」.

🔍 Phân tích các lựa chọn:
- 1. います: Dùng cho người và động vật
- 2. 読みます: Đọc
- 3. あります: (ĐÚNG) - Có (tồn tại đồ vật: わたしの国の本もあります)
- 4. します: Làm

📄 Trích PDF gốc (N5 7/2017 - 文法 問題3 - Câu 25):
外国の 本も 売って います。わたしの 国のも【25】。 -> 3. あります""")

add_q(59, "【26: だから 】、本は いつも えきの ちかくの 本屋で 買います。", 1,
"""🎯 Đáp án đúng: [1] だから

💬 Dịch nghĩa câu:
「そして、わたしが すきな りょうりの 本も 多いです。【だから】、本は いつも えきの ちかくの 本屋で 買います。」
-> "Thêm vào đó, sách nấu ăn mà tôi yêu thích cũng có rất nhiều. Vì thế nên tôi luôn mua sách ở hiệu sách gần nhà ga."

💡 Phân tích & Giải thích chi tiết:
• Các câu trước nêu lý do vì sao hiệu sách gần ga tuyệt vời (to lớn, có sách nước mình, có nhiều sách nấu ăn yêu thích), dẫn đến kết quả luôn mua sách ở đó -> Dùng liên từ chỉ nguyên nhân - kết quả 「だから」 (Vì vậy, do đó).

🔍 Phân tích các lựa chọn:
- 1. だから: (ĐÚNG) - Vì vậy, cho nên
- 2. では: Thế thì
- 3. それから: Sau đó, thêm nữa
- 4. でも: Tuy nhiên, nhưng

📄 Trích PDF gốc (N5 7/2017 - 文法 問題3 - Câu 26):
【26】、本は いつも えきの ちかくの 本屋で 買います。 -> 1. だから""")

# 問題4 (Global Q60 - Q62 / Section Q27 - Q29): Đọc hiểu ngắn (Đoản văn)
add_q(60, "「わたし」は 今日、何を しましたか。", 2,
"""🎯 Đáp án đúng: [2] 友だちと DVDを 買いに 行きました。

💬 Dịch nghĩa bài đọc (1):
「わたしは 今日、友だちと 買い物に 行きました。3か月前に 見た えいがの DVDが ほしかったからです。買った DVDは、友だちや 姉と いっしょに 見ます。」
-> "Hôm nay tôi đã đi mua sắm cùng với bạn. Vì tôi muốn mua đĩa DVD của bộ phim đã xem cách đây 3 tháng. Đĩa DVD đã mua tôi sẽ xem cùng với bạn và chị gái."

💡 Phân tích & Giải thích chi tiết:
• Câu hỏi: 「『わたし』は 今日、何を しましたか。」 (Hôm nay nhân vật "tôi" đã làm gì?)
• Trong bài nêu rõ: Hôm nay đi mua sắm với bạn để mua đĩa DVD (「友だちと買い物に行きました… DVDがほしかったからです。買ったDVDは…」).
• Do đó đáp án chính xác là **[2] Đi mua đĩa DVD cùng với bạn**.

🔍 Phân tích các lựa chọn:
- 1. 友だちと えいがを 見に 行きました。: Sai (bộ phim đã xem ở rạp từ 3 tháng trước)
- 2. 友だちと DVDを 買いに 行きました。: (ĐÚNG) - Đi mua đĩa DVD cùng bạn
- 3. 姉と えいがを 見に 行きました。: Sai
- 4. 姉と DVDを 買いに 行きました。: Sai (đi mua với bạn, còn chị gái là người sẽ cùng xem sau này)

📄 Trích PDF gốc (N5 7/2017 - 読解 問題4 - Câu 27):
「わたし」は 今日、何を しましたか。 -> 2. 友だちと DVDを 買いに 行きました。""")

add_q(61, "今の へやは どれですか。", 3,
"""🎯 Đáp án đúng: [3] Hình 3 (1 bàn, 2 ghế và 1 kệ sách)

💬 Dịch nghĩa bài đọc (2):
「わたしの へやには、テーブルが 一つと いすが 二つと 本だなが 一つ あります。本が たくさん ありますから、もっと 大きい 本だなが ほしいです。」
-> "Trong phòng của tôi hiện có 1 cái bàn, 2 cái ghế và 1 cái giá sách. Vì có rất nhiều sách nên tôi muốn có một cái giá sách to hơn nữa."

💡 Phân tích & Giải thích chi tiết:
• Câu hỏi: 「今の へやは どれですか。」 (Căn phòng hiện tại là hình nào?)
• Đối chiếu số lượng đồ đạc hiện có trong phòng:
  - テーブルが 一つ (1 cái bàn)
  - いすが 二つ (2 cái ghế)
  - 本だなが 一つ (1 cái kệ sách có nhiều sách)
• Quan sát 4 bức tranh:
  - Hình 1: 1 bàn, 2 ghế, 2 kệ sách (sai số kệ sách)
  - Hình 2: 1 bàn, 1 ghế, 1 kệ sách (sai số ghế)
  - Hình 3: 1 bàn, 2 ghế, 1 kệ sách (ĐÚNG 100%)
  - Hình 4: 1 bàn, 1 ghế, 2 kệ sách (sai)

📄 Trích PDF gốc (N5 7/2017 - 読解 問題4 - Câu 28):
今の へやは どれですか。 -> 3""")

add_q(62, "森さんは コピーを した あとで、本を どうしますか。", 4,
"""🎯 Đáp án đúng: [4] 山口先生の 机の 上に おきます。

💬 Dịch nghĩa bài đọc (3) - Lời nhắn của thầy Yamaguchi gửi bạn Mori:
「森さんの 机の 上に、山口先生の メモと 本が あります。
　-----------------------
　森さん
　クラスで 使う 本を 中川先生に かりました。
　5ページを 25枚 コピーして ください。
　コピーは 南さんに わたして ください。
　本は、わたしが あした かえしますから、わたしの 机の 上に おいて ください。
　山口」
-> "Bạn Mori, thầy đã mượn thầy Nakagawa quyển sách dùng trong lớp học. Em hãy photo trang số 5 ra 25 bản nhé. Bản photo thì hãy đưa cho bạn Minami. Còn quyển sách thì ngày mai thầy sẽ trả, nên em hãy đặt lên trên bàn của thầy (thầy Yamaguchi) nhé."

💡 Phân tích & Giải thích chi tiết:
• Câu hỏi hỏi về **quyển sách (本)** sau khi photo xong: 「森さんは コピーを した あとで、本を どうしますか。」
• Lời nhắn của thầy Yamaguchi ghi rõ: 「本は、わたしが あした かえしますから、わたしの 机の 上に おいて ください。山口」 (Quyển sách thì hãy đặt lên trên bàn của tôi - tức là bàn của thầy Yamaguchi).

🔍 Phân tích các lựa chọn:
- 1. クラスで 使います。: Sai
- 2. 南さんに わたします。: Sai (thứ đưa cho Minami là bản photo コピー, không phải quyển sách 本)
- 3. 中川先生に かえします。: Sai (thầy Yamaguchi ngày mai mới là người đem trả cho thầy Nakagawa)
- 4. 山口先生の 机の 上に おきます。: (ĐÚNG) - Đặt lên trên bàn của thầy Yamaguchi

📄 Trích PDF gốc (N5 7/2017 - 読解 問題4 - Câu 29):
森さんは コピーを した あとで、本を どうしますか。 -> 4. 山口先生の 机の 上に おきます。""")

# 問題5 (Global Q63 - Q64 / Section Q30 - Q31): Đọc hiểu trung bình (Trung văn)
add_q(63, "どうして こまりましたか。", 4,
"""🎯 Đáp án đúng: [4] かさが なかったから

💬 Dịch nghĩa đoạn văn (問題5):
「きのうの 夜は おそくまで しごとを しました。とても つかれました。しごとの あと、電車で 帰りました。
　家の 近くの 駅で 電車を おりました。外は 雨でしたが、わたしは かさが ありませんでした。とても こまりました。…」
-> "Tối hôm qua tôi đã làm việc đến tận khuya. Tôi rất mệt. Sau giờ làm việc, tôi đi tàu điện về nhà. Tôi xuống tàu ở nhà ga gần nhà. Bên ngoài trời mưa nhưng tôi lại không có ô (dù). Tôi đã vô cùng bối rối/khó xử..."

💡 Phân tích & Giải thích chi tiết:
• Câu hỏi: 「どうして こまりましたか。」 (Tại sao tác giả lại gặp khó khăn / bối rối?)
• Ngay trước câu 「とても こまりました。」 là câu giải thích nguyên nhân trực tiếp: 「外は 雨でしたが、わたしは かさが ありませんでした。」 (Bên ngoài trời đang mưa mà tôi lại không có ô).

🔍 Phân tích các lựa chọn:
- 1. おそい 時間に 駅に 着いたから: Vì đến ga muộn
- 2. しごとが たくさん あったから: Vì có nhiều việc
- 3. とても つかれたから: Vì rất mệt
- 4. かさが なかったから: (ĐÚNG) - Vì không có ô (dù) khi trời đang mưa

📄 Trích PDF gốc (N5 7/2017 - 読解 問題5 - Câu 30):
どうして こまりましたか。 -> 4. かさが なかったから""")

add_q(64, "「わたし」は、あした どうしますか。", 1,
"""🎯 Đáp án đúng: [1] かさを はこの 中に 入れます。

💬 Dịch nghĩa đoạn văn tiếp theo (問題5):
「駅の 人が わたしを 見て、『あの はこの 中の かさを 使って ください。』と 言いました。はこの 中には かさが 3本 ありました。
　わたしは『えっ、いいんですか。』と 聞きました。
　駅の 人は『あれは「みんなの かさ」です。お金は いりません。あした、あの はこに かえして ください。』と 言いました。
　わたしは『わかりました。ありがとうございます。』と 言って、かさを かりて 帰りました。」
-> "Nhân viên nhà ga nhìn thấy tôi liền bảo: 'Xin hãy dùng chiếc ô ở trong chiếc hộp kia'. ... Nhân viên nhà ga nói: 'Đó là Ô của mọi người. Không cần tiền đâu. Ngày mai bạn hãy trả lại vào trong chiếc hộp kia nhé.' Tôi đáp: 'Tôi hiểu rồi, xin cảm ơn' rồi mượn chiếc ô đi về."

💡 Phân tích & Giải thích chi tiết:
• Câu hỏi: 「『わたし』は、あした どうしますか。」 (Ngày mai nhân vật "tôi" sẽ làm gì?)
• Nhân viên dặn: 「あした、あの はこに かえして ください。」 (Ngày mai hãy trả chiếc ô lại vào trong chiếc hộp kia). Trả ô vào hộp tức là bỏ chiếc ô vào lại bên trong hộp: 「かさを はこの 中に 入れます」.

🔍 Phân tích các lựa chọn:
- 1. かさを はこの 中に 入れます。: (ĐÚNG) - Bỏ chiếc ô vào lại trong chiếc hộp
- 2. かさを 駅の 人に わたします。: Sai (trả vào hộp あのはこ, không phải đưa cho nhân viên)
- 3. お金を はこの 中に 入れます。: Sai (お金はいりません - không cần tiền)
- 4. お金を 駅の 人に わたします。: Sai

📄 Trích PDF gốc (N5 7/2017 - 読解 問題5 - Câu 31):
「わたし」は、あした どうしますか。 -> 1. かさを はこの 中に 入れます。""")

# 問題6 (Global Q65 / Section Q32): Tìm kiếm thông tin
add_q(65, "あらきやで トイレットペーパーと にくと やさいを 同じ 日に 買いたいです。いつが 安いですか。", 2,
"""🎯 Đáp án đúng: [2] 6月13日（水）と 14日（木）

💬 Dịch nghĩa câu hỏi & tờ rơi siêu thị Arakiya (あらきや):
• Câu hỏi: "Tôi muốn mua giấy vệ sinh (トイレットペーパー), thịt (にく) và rau củ (やさい) vào cùng một ngày tại cửa hàng Arakiya. Ngày nào thì được giảm giá rẻ?"
• Thông tin trên tờ rơi:
  1. Đợt 1 (`6月11日(月) ～ 14日(木)`): Giảm giá đường (`さとう 128円`) và **giấy vệ sinh (`トイレットペーパー 490円`)**.
  2. Đợt 2 (`6月15日(金) ～ 18日(月)`): Giảm giá nước tương (`しょうゆ`) và khăn giấy hộp (`ティッシュペーパー`).
  3. Giảm giá hàng tuần (`毎週安い！`):
     - Thứ Hai & Thứ Ba (`月・火`): Trái cây, cá, nước ép
     - **Thứ Tư & Thứ Năm (`水・木`)**: Đậu phụ, **thịt (`にく`)**, **rau củ (`やさい`)**
     - Thứ Sáu & Thứ Bảy (`金・土`): Bánh mì, sữa bò, cá, rau củ

💡 Phân tích & Giải thích chi tiết:
• Để mua cả **トイレットペーパー** (rẻ từ thứ Hai 11/6 đến thứ Năm 14/6) VÀ **にく + やさい** (rẻ vào thứ Tư & thứ Năm hàng tuần) trong cùng một ngày, ta chọn ngày giao nhau là **Thứ Tư 13/6 và Thứ Năm 14/6**: `6月13日（水）と 14日（木）`.

🔍 Phân tích các lựa chọn:
- 1. 6月11日（月）と 12日（火）: Thịt và rau không giảm giá vào thứ Hai, thứ Ba
- 2. 6月13日（水）と 14日（木）: (ĐÚNG) - Cả giấy vệ sinh, thịt và rau đều giảm giá
- 3. 6月15日（金）と 16日（土）: Giấy vệ sinh và thịt không giảm giá
- 4. 6月17日（日）と 18日（月）: Không có mặt hàng nào trong 3 món giảm giá

📄 Trích PDF gốc (N5 7/2017 - 読解 問題6 - Câu 32):
いつが 安いですか。 -> 2. 6月13日（水）と 14日（木）""")

# ==============================================================================
# SECTION 3: 聴解 (Global Q66 - Q89 / 24 câu) - Trang 42 -> 49 của PDF
# ==============================================================================
# 問題1 (Global Q66 - Q72 / Local 1 - 7)
add_q(66, "聴解 問題1 - 1番: 女の人は、どの靴下を買いますか。", 2,
"""🎯 Đáp án đúng: [2] 長い・動物の絵の靴下 (Tất dài có hình động vật)

💬 Dịch nghĩa câu hỏi:
「靴下の店で、女の人と店の人が話しています。女の人は、どの靴下を買いますか。」
-> "Tại cửa hàng bít tất, người phụ nữ và nhân viên cửa hàng đang nói chuyện. Người phụ nữ sẽ mua đôi tất nào?"

💡 Phân tích & Giải thích chi tiết:
• Người phụ nữ hỏi mua tất trẻ em loại dài (「長いのです」 -> loại bỏ hình 3 và 4 là tất ngắn).
• Nhân viên hỏi thích hình trái cây (果物の絵) hay hình động vật (動物の絵), người phụ nữ chọn hình động vật (「動物のを下さい」).
• Đối chiếu hình ảnh: Hình [1] là tất dài hình trái cây, Hình [2] là tất dài hình động vật -> Chọn **[2]**.

📄 Trích Script gốc trang 42 PDF (N5 7/2017 - 聴解 問題1 - 1番):
F: 長いのです。… 動物のを下さい。 -> Đáp án [2]""",
"""【音声テキスト（PDF 42ページ）】
靴下の店で、女の人と店の人が話しています。女の人は、どの靴下を買いますか。
Ｆ：子供の靴下、ありますか。
Ｍ：はい。長いのですか、短いのですか。
Ｆ：長いのです。
Ｍ：はい。果物の絵と動物の絵があります。どちらがいいですか。
Ｆ：そうですね、動物のを下さい。
女の人は、どの靴下を買いますか。""",
"""【Bản dịch Script】
Tại cửa hàng tất, người phụ nữ và nhân viên đang nói chuyện. Người phụ nữ sẽ mua đôi tất nào?
Nữ: Cửa hàng có tất trẻ em không ạ?
Nam: Vâng có ạ. Chị tìm loại dài hay loại ngắn ạ?
Nữ: Loại dài ạ.
Nam: Vâng. Có loại in hình trái cây và loại in hình động vật. Chị thích loại nào hơn?
Nữ: Để xem nào, cho tôi lấy đôi có hình động vật nhé.""")

add_q(67, "聴解 問題1 - 2番: 女の人は、一日に何回薬を飲みますか。", 2,
"""🎯 Đáp án đúng: [2] 2かい (2 lần / ngày)

💬 Dịch nghĩa câu hỏi:
「病院で、医者と女の人が話しています。女の人は、一日に何回薬を飲みますか。」
-> "Ở bệnh viện, bác sĩ và người phụ nữ đang nói chuyện. Người phụ nữ uống thuốc mấy lần trong một ngày?"

💡 Phân tích & Giải thích chi tiết:
• Bác sĩ hướng dẫn: Thuốc này uống vào **buổi sáng và buổi tối** sau khi ăn cơm (「朝と夜、ご飯を食べたあとで飲んでください」), buổi trưa không uống (「昼は飲まないでください」).
• Cẩn thận bẫy ở câu cuối bác sĩ dặn 「4日間飲んでくださいね」 (hãy uống trong vòng 4 ngày). Câu hỏi hỏi **một ngày uống mấy lần (一日に何回)** -> Sáng + Tối = **2 lần (2かい)**.

🔍 Phân tích các lựa chọn:
- 1. 1かい: 1 lần
- 2. 2かい: (ĐÚNG) - 2 lần (buổi sáng và buổi tối)
- 3. 3かい: 3 lần
- 4. 4かい: 4 lần (bẫy từ 4日間 - 4 ngày)

📄 Trích Script gốc trang 42-43 PDF (N5 7/2017 - 聴解 問題1 - 2番):
M: この薬は、朝と夜、ご飯を食べたあとで飲んでください。昼は飲まないでください。 -> 2. 2かい""",
"""【音声テキスト（PDF 42-43ページ）】
病院で、医者と女の人が話しています。女の人は、一日に何回薬を飲みますか。
Ｍ：この薬は、朝と夜、ご飯を食べたあとで飲んでください。
Ｆ：昼ご飯のあとは?
Ｍ：昼は飲まないでください。
Ｆ：はい。
Ｍ：４日間飲んでくださいね。
Ｆ：分かりました。
女の人は、一日に何回薬を飲みますか。""",
"""【Bản dịch Script】
Tại bệnh viện, bác sĩ và người phụ nữ đang nói chuyện. Người phụ nữ uống thuốc mấy lần một ngày?
Nam (Bác sĩ): Thuốc này chị hãy uống vào buổi sáng và buổi tối sau khi ăn cơm nhé.
Nữ: Thế còn sau bữa trưa thì sao ạ?
Nam: Buổi trưa thì xin đừng uống.
Nữ: Vâng ạ.
Nam: Chị hãy uống trong 4 ngày nhé.
Nữ: Tôi hiểu rồi ạ.""")

add_q(68, "聴解 問題1 - 3番: 店の人は、どのかばんを取りますか。", 3,
"""🎯 Đáp án đúng: [3] 上の黒くて大きいかばん (Chiếc túi màu đen cỡ lớn ở kệ trên)

💬 Dịch nghĩa câu hỏi:
「デパートで、女の人と店の人が話しています。店の人は、どのかばんを取りますか。」
-> "Ở trung tâm thương mại, người phụ nữ và nhân viên đang nói chuyện. Nhân viên sẽ lấy chiếc túi xách nào?"

💡 Phân tích & Giải thích chi tiết:
• Người phụ nữ nhờ lấy chiếc túi màu đen ở kệ phía trên (「その上の黒いかばんを取ってください」).
• Nhân viên hỏi lại là chiếc nhỏ (小さいの) phải không, người phụ nữ đáp: "Không, là chiếc to cơ" (「いいえ。大きいのです」).
• Nhìn tranh trên kệ trên (1, 2, 3, 4):
  - 1: Túi trắng nhỏ
  - 2: Túi trắng to
  - 3: Túi đen to (ĐÚNG)
  - 4: Túi đen nhỏ

📄 Trích Script gốc trang 43 PDF (N5 7/2017 - 聴解 問題1 - 3番):
F: その上の黒いかばんを取ってください。… いいえ。大きいのです。 -> 3""",
"""【音声テキスト（PDF 43ページ）】
デパートで、女の人と店の人が話しています。店の人は、どのかばんを取りますか。
Ｆ：すみません、その上の黒いかばんを取ってください。
Ｍ：どちらですか。この小さいのですか。
Ｆ：いいえ。大きいのです。
Ｍ：はい。
店の人は、どのかばんを取りますか。""",
"""【Bản dịch Script】
Tại trung tâm thương mại, người phụ nữ và nhân viên đang nói chuyện. Nhân viên sẽ lấy chiếc túi nào?
Nữ: Xin lỗi, làm ơn lấy giúp tôi chiếc túi màu đen ở phía trên kia.
Nam: Chiếc nào ạ? Chiếc nhỏ này phải không ạ?
Nữ: Không, là chiếc to cơ ạ.
Nam: Vâng ạ.""")

add_q(69, "聴解 問題1 - 4番: 学生は、机の上に何を置きますか。", 3,
"""🎯 Đáp án đúng: [3] 辞書と鉛筆と消しゴム (Từ điển, bút chì và cục tẩy)

💬 Dịch nghĩa câu hỏi:
「教室で、先生が話しています。学生は、机の上に何を置きますか。」
-> "Trong lớp học, thầy giáo đang dặn dò. Học sinh sẽ đặt những đồ vật gì ở trên mặt bàn?"

💡 Phân tích & Giải thích chi tiết:
• Thầy giáo thông báo bài kiểm tra này có câu hỏi dùng từ điển nên hãy để **từ điển (辞書)**, **bút chì (鉛筆)** và **cục tẩy (消しゴム)** lên mặt bàn.
• Đồng hồ (時計) và vở ghi (ノート) đều phải cất vào trong cặp (かばんの中に入れてください).
• Đối chiếu hình ảnh: Hình [3] gồm 1 cuốn từ điển (辞書), bút chì và cục tẩy -> Chọn **[3]**.

📄 Trích Script gốc trang 43 PDF (N5 7/2017 - 聴解 問題1 - 4番):
M: 机の上に辞書を出してください。鉛筆と消しゴムも出してください。 -> 3""",
"""【音声テキスト（PDF 43ページ）】
教室で、先生が話しています。学生は、机の上に何を置きますか。
Ｍ：今からテストをします。このテストでは、辞書を使う問題がありますから、机の上に辞書を出してください。鉛筆と消しゴムも出してください。時計は、かばんの中に入れてください。
Ｆ：先生、ノートはどうしますか。
Ｍ：ノートもかばんの中に入れてください。
学生は、机の上に何を置きますか。""",
"""【Bản dịch Script】
Trong phòng học, thầy giáo đang nói chuyện. Học sinh sẽ để những gì trên mặt bàn?
Nam (Thầy giáo): Bây giờ chúng ta sẽ làm bài kiểm tra. Trong bài kiểm tra này có câu hỏi được dùng từ điển nên các em hãy lấy từ điển để lên bàn. Hãy lấy cả bút chì và cục tẩy ra nữa. Đồng hồ thì hãy cất vào trong cặp.
Nữ: Thưa thầy, còn vở thì sao ạ?
Nam: Vở cũng hãy cất vào trong cặp nhé.""")

add_q(70, "聴解 問題1 - 5番: 学生は、始めに何をしますか。", 1,
"""🎯 Đáp án đúng: [1] レストランで晩ご飯を食べます (Ăn tối tại nhà hàng)

💬 Dịch nghĩa câu hỏi:
「バスの中で、旅行会社の人が学生に話しています。学生は、始めに何をしますか。」
-> "Trên xe buýt, nhân viên công ty du lịch đang thông báo cho học sinh. Đầu tiên học sinh sẽ làm gì?"

💡 Phân tích & Giải thích chi tiết:
• Nhân viên thông báo: Đã tới khách sạn, ngay bây giờ sẽ ăn bữa tối tại nhà hàng ở tầng 1, vì đã 6h50 mà bữa tối bắt đầu lúc 7h nên hãy đi đến nhà hàng ngay lập tức (「今から1階のレストランで晩ご飯を食べます… すぐに行ってください」).
• Hành lý thì nhân viên khách sạn sẽ mang lên phòng giúp, còn xem tivi hay mua sắm là sau bữa tối.
• Đối chiếu hình ảnh: Hình [1] là ăn tối tại nhà hàng -> Chọn **[1]**.

📄 Trích Script gốc trang 43 PDF (N5 7/2017 - 聴解 問題1 - 5番):
F: 今から1階のレストランで晩ご飯を食べます。… すぐに行ってください。 -> 1""",
"""【音声テキスト（PDF 43ページ）】
バスの中で、旅行会社の人が学生に話しています。学生は、始めに何をしますか。
Ｆ：皆さん、ホテルに着きました。今から１階のレストランで晩ご飯を食べます。晩ご飯は７時からです。今６時50分ですから、すぐに行ってください。皆さんの荷物は、ホテルの人が部屋に持っていきます。晩ご飯のあとは、テレビを見たり、買い物をしたりしてください。
学生は、始めに何をしますか。""",
"""【Bản dịch Script】
Trên xe buýt, nhân viên công ty du lịch đang nói với các học sinh. Trước tiên học sinh sẽ làm gì?
Nữ: Các em ơi, chúng ta đã đến khách sạn rồi. Ngay bây giờ chúng ta sẽ ăn tối tại nhà hàng ở tầng 1. Bữa tối bắt đầu từ lúc 7 giờ. Bây giờ đã là 6 giờ 50 phút rồi nên các em hãy đi ngay nhé. Hành lý của các em sẽ do nhân viên khách sạn mang lên phòng. Sau bữa tối, các em có thể xem tivi hoặc đi mua sắm.""")

add_q(71, "聴解 問題1 - 6番: 男の人は、何を持っていきますか。", 4,
"""🎯 Đáp án đúng: [4] お菓子だけ (Chỉ mang theo bánh kẹo)

💬 Dịch nghĩa câu hỏi:
「男の人と女の人が話しています。男の人は、何を持っていきますか。」
-> "Người đàn ông và người phụ nữ đang nói chuyện. Người đàn ông sẽ mang theo thứ gì?"

💡 Phân tích & Giải thích chi tiết:
• Người phụ nữ nhận mang cơm nắm (おにぎり).
• Lúc đầu người phụ nữ nhờ người đàn ông mang đồ uống và bánh kẹo (飲み物とお菓子), nhưng ngay sau đó cô ấy đổi ý vì đồ uống nặng nên khi nào tới biển sẽ mua sau (「あ、飲み物は重いですね。海に着いてから買いましょう」).
• Vậy người đàn ông chỉ mang theo **bánh kẹo (お菓子)** -> Hình **[4]**.

📄 Trích Script gốc trang 44 PDF (N5 7/2017 - 聴解 問題1 - 6番):
F: 飲み物とお菓子をお願いします。… あ、飲み物は重いですね。海に着いてから買いましょう。 -> 4""",
"""【音声テキスト（PDF 44ページ）】
男の人と女の人が話しています。男の人は、何を持っていきますか。
Ｍ：来週の日曜日、海へ行きますね。何を持っていきましょうか。
Ｆ：私はおにぎりを持っていきます。
Ｍ：じゃあ僕は。
Ｆ：飲み物とお菓子をお願いします。
Ｍ：はい。飲み物とお菓子ですね。
Ｆ：あ、飲み物は重いですね。海に着いてから買いましょう。
Ｍ：そうですね。
男の人は、何を持っていきますか。""",
"""【Bản dịch Script】
Người đàn ông và người phụ nữ đang nói chuyện. Người đàn ông sẽ mang theo thứ gì?
Nam: Chủ nhật tuần sau chúng mình đi biển nhỉ. Chúng ta nên mang theo những gì đây?
Nữ: Tôi sẽ mang cơm nắm.
Nam: Thế còn tôi thì sao?
Nữ: Nhờ anh mang đồ uống và bánh kẹo nhé.
Nam: Vâng, đồ uống và bánh kẹo nhỉ.
Nữ: À, đồ uống thì nặng đấy nhỉ. Đợi khi nào tới biển rồi chúng mình mua sau đi.
Nam: Ừ, đúng đấy.""")

add_q(72, "聴解 問題1 - 7番: 女の人は、何番のバスに乗りますか。", 4,
"""🎯 Đáp án đúng: [4] 7ばん (Xe buýt số 7)

💬 Dịch nghĩa câu hỏi:
「バス停で、女の人とバス会社の人が話しています。女の人は、何番のバスに乗りますか。」
-> "Tại trạm xe buýt, người phụ nữ và nhân viên hãng xe buýt đang nói chuyện. Người phụ nữ sẽ lên xe buýt số mấy?"

💡 Phân tích & Giải thích chi tiết:
• Xe đi tới ga Midori có xe số 3, số 5 và số 7.
• Tuy nhiên:
  - Hôm nay là Chủ nhật nên không có xe số 5 (「今日は日曜日ですから、5番のバスはありません」).
  - Xe số 3 chỉ chạy vào buổi sáng và chiều tối, nên khung giờ hiện tại phải đi **xe số 7** (「今の時間は7番ですね」).
• Đối chiếu 4 đáp án (`1. 1ばん | 2. 3ばん | 3. 5ばん | 4. 7ばん`) -> Chọn **[4] 7ばん**.

📄 Trích Script gốc trang 44 PDF (N5 7/2017 - 聴解 問題1 - 7番):
M: 今の時間は7番ですね。 -> 4. 7ばん""",
"""【音声テキスト（PDF 44ページ）】
バス停で、女の人とバス会社の人が話しています。女の人は、何番のバスに乗りますか。
Ｆ：すみません、１番のバスはみどり駅に行きますか。
Ｍ：いいえ、みどり駅に行くバスは３番と５番と７番ですよ。
Ｆ：そうですか。
Ｍ：あ、でも、今日は日曜日ですから、５番のバスはありません。
Ｆ：そうですか。
Ｍ：それから、３番は朝と夕方のバスですから、今の時間は７番ですね。
Ｆ：分かりました。ありがとうございます。
女の人は、何番のバスに乗りますか。""",
"""【Bản dịch Script】
Tại trạm xe buýt, người phụ nữ và nhân viên công ty xe buýt đang nói chuyện. Người phụ nữ sẽ đi xe buýt số mấy?
Nữ: Xin lỗi, xe buýt số 1 có đi đến ga Midori không ạ?
Nam: Không, xe đi đến ga Midori là xe số 3, số 5 và số 7 cơ ạ.
Nữ: Vậy ạ.
Nam: À, nhưng vì hôm nay là Chủ nhật nên không có chuyến xe số 5 đâu ạ.
Nữ: Thế ạ.
Nam: Ngoài ra, xe số 3 chỉ chạy vào buổi sáng và buổi chiều tối thôi, nên giờ này chị đi xe số 7 nhé.
Nữ: Tôi hiểu rồi. Cảm ơn anh nhiều.""")

# 問題2 (Global Q73 - Q78 / Local 1 - 6)
add_q(73, "聴解 問題2 - 1番: 女の学生は、今日、何時間勉強しますか。", 4,
"""🎯 Đáp án đúng: [4] 4じかん (4 tiếng)

💬 Dịch nghĩa câu hỏi:
「大学で、男の学生と女の学生が話しています。女の学生は、今日、何時間勉強しますか。」
-> "Ở trường đại học, nam sinh và nữ sinh đang nói chuyện. Hôm nay bạn nữ sinh sẽ học trong mấy tiếng đồng hồ?"

💡 Phân tích & Giải thích chi tiết:
• Hàng ngày bạn nữ thường học khoảng 3 tiếng (毎日3時間ぐらい), bạn nam học 1 tiếng.
• Nhưng vì ngày mai có bài kiểm tra nên **hôm nay bạn nữ sẽ học 4 tiếng** (「あ、でも、明日はテストがありますから、今日は4時間勉強します」).

🔍 Phân tích các lựa chọn:
- 1. 1じかん: Số giờ học mỗi ngày của bạn nam
- 2. 2じかん: Sai
- 3. 3じかん: Số giờ học mọi ngày của bạn nữ
- 4. 4じかん: (ĐÚNG) - Số giờ học hôm nay của bạn nữ

📄 Trích Script gốc trang 45 PDF (N5 7/2017 - 聴解 問題2 - 1番):
F: 明日はテストがありますから、今日は4時間勉強します。 -> 4. 4じかん""",
"""【音声テキスト（PDF 45ページ）】
大学で、男の学生と女の学生が話しています。女の学生は、今日、何時間勉強しますか。
Ｍ：山田さんはいつも何時間ぐらい勉強しますか。
Ｆ：うーん、毎日３時間ぐらいです。
Ｍ：えっ、私は毎日１時間です。
Ｆ：あ、でも、明日はテストがありますから、今日は４時間勉強します。
Ｍ：そうですか。
女の学生は、今日、何時間勉強しますか。""",
"""【Bản dịch Script】
Ở trường đại học, nam sinh và nữ sinh đang nói chuyện. Hôm nay nữ sinh sẽ học mấy tiếng?
Nam: Bạn Yamada thường học khoảng mấy tiếng?
Nữ: Ừm, mỗi ngày khoảng 3 tiếng.
Nam: Ôi, mình thì mỗi ngày học 1 tiếng.
Nữ: À, nhưng vì ngày mai có bài kiểm tra nên hôm nay mình sẽ học 4 tiếng.
Nam: Ra vậy.""")

add_q(74, "聴解 問題2 - 2番: 女の人の電話番号は何番ですか。", 3,
"""🎯 Đáp án đúng: [3] 512-7743

💬 Dịch nghĩa câu hỏi:
「男の人と女の人が話しています。女の人の電話番号は何番ですか。」
-> "Người đàn ông và người phụ nữ đang nói chuyện. Số điện thoại của người phụ nữ là số mấy?"

💡 Phân tích & Giải thích chi tiết:
• Người đàn ông hỏi xác nhận xem có phải số `512-7734` không.
• Người phụ nữ đính chính: "Không, không phải 7734 mà là **7743**" (「いいえ、7734じゃなくて7743です」 -> `512-7743`).

🔍 Phân tích các lựa chọn:
- 1. 512-7733: Sai
- 2. 512-7734: Số người đàn ông nhớ nhầm
- 3. 512-7743: (ĐÚNG) - Số điện thoại đúng của người phụ nữ
- 4. 512-7744: Sai

📄 Trích Script gốc trang 45 PDF (N5 7/2017 - 聴解 問題2 - 2番):
F: いいえ、7734じゃなくて7743です。 -> 3. 512-7743""",
"""【音声テキスト（PDF 45ページ）】
男の人と女の人が話しています。女の人の電話番号は何番ですか。
Ｍ：あのう、山田さんの電話番号は、512-7734ですね？
Ｆ：いいえ、7734じゃなくて7743です。
Ｍ：え、ちょっと待ってください。メモします。512の。
Ｆ：7743です。
Ｍ：はい。ありがとうございました。
女の人の電話番号は何番ですか。""",
"""【Bản dịch Script】
Người đàn ông và người phụ nữ đang nói chuyện. Số điện thoại của người phụ nữ là số mấy?
Nam: À này, số điện thoại của chị Yamada là 512-7734 phải không nhỉ?
Nữ: Không ạ, không phải 7734 mà là 7743 cơ ạ.
Nam: Ơ, đợi tôi một chút nhé. Để tôi ghi chép lại. 512...
Nữ: 7743 ạ.
Nam: Vâng, cảm ơn chị nhiều.""")

add_q(75, "聴解 問題2 - 3番: 男の学生は、だれと住んでいますか。", 2,
"""🎯 Đáp án đúng: [2] あね (Chị gái)

💬 Dịch nghĩa câu hỏi:
「女の学生と男の学生が話しています。男の学生は、だれと住んでいますか。」
-> "Nữ sinh và nam sinh đang nói chuyện. Bạn nam sinh hiện đang sống cùng với ai?"

💡 Phân tích & Giải thích chi tiết:
• Bố mẹ bạn nam sống ở xa (「両親は遠くに住んでいます」).
• Hiện tại bạn nam đang sống cùng với **chị gái** (「いま、姉と一緒に住んでいます」), còn em trai thì sống cùng bố mẹ.

🔍 Phân tích các lựa chọn:
- 1. りょうしん (両親): Bố mẹ (ở xa)
- 2. あね (姉): (ĐÚNG) - Chị gái
- 3. いもうと (妹): Em gái
- 4. おとうと (弟): Em trai (đang sống với bố mẹ)

📄 Trích Script gốc trang 45-46 PDF (N5 7/2017 - 聴解 問題2 - 3番):
M: いま、姉と一緒に住んでいます。 -> 2. あね""",
"""【音声テキスト（PDF 45-46ページ）】
女の学生と男の学生が話しています。男の学生は、だれと住んでいますか。
Ｆ：山田さんは、お父さんとお母さんと、一緒に住んでいますか。
Ｍ：いえ、両親は遠くに住んでいます。
Ｆ：そうですか。
Ｍ：いま、姉と一緒に住んでいます。
Ｆ：兄弟は一人ですか。
Ｍ：あ、弟もいますよ。弟は両親と一緒です。
男の学生は、だれと住んでいますか。""",
"""【Bản dịch Script】
Nữ sinh và nam sinh đang nói chuyện. Nam sinh đang sống cùng với ai?
Nữ: Bạn Yamada có đang sống cùng với bố mẹ không?
Nam: Không, bố mẹ mình sống ở xa.
Nữ: Thế à.
Nam: Hiện giờ mình đang sống cùng với chị gái.
Nữ: Anh chị em của bạn chỉ có một người thôi à?
Nam: À, mình còn có cả em trai nữa. Em trai thì sống cùng với bố mẹ.""")

add_q(76, "聴解 問題2 - 4番: 二人はどこで昼ご飯を食べますか。", 4,
"""🎯 Đáp án đúng: [4] きょうしつ (Phòng học)

💬 Dịch nghĩa câu hỏi:
「学校で男の学生と女の学生が話しています。二人はどこで昼ご飯を食べますか。」
-> "Ở trường học, nam sinh và nữ sinh đang nói chuyện. Hai người sẽ ăn bữa trưa ở đâu?"

💡 Phân tích & Giải thích chi tiết:
• Vì hôm nay là thứ Bảy nên nhà ăn (食堂) và quán giải khát (喫茶店) của trường đều nghỉ.
• Bạn nam đề nghị mua bánh mì ở tiệm bánh (パン屋でパンを買って) rồi mang về **ăn ở phòng học (教室で食べましょうか)**, và bạn nữ đồng ý.

🔍 Phân tích các lựa chọn:
- 1. しょくどう (食堂): Nhà ăn (hôm nay nghỉ)
- 2. きっさてん (喫茶店): Quán nước (hôm nay nghỉ)
- 3. パンや (パン屋): Tiệm bánh mì (chỉ là nơi mua bánh mì)
- 4. きょうしつ (教室): (ĐÚNG) - Phòng học (nơi hai người ngồi ăn trưa)

📄 Trích Script gốc trang 46 PDF (N5 7/2017 - 聴解 問題2 - 4番):
M: じゃ、パン屋でパンを買って、教室で食べましょうか。 F: そうですね。 -> 4. きょうしつ""",
"""【音声テキスト（PDF 46ページ）】
学校で男の学生と女の学生が話しています。二人はどこで昼ご飯を食べますか。
Ｍ：もう１時ですね。何か食べませんか。
Ｆ：そうですね。でも今日は土曜日だから、学校の、食堂や喫茶店は休みですよ。
Ｍ：じゃ、パン屋でパンを買って、教室で食べましょうか。
Ｆ：そうですね。
二人はどこで昼ご飯を食べますか。""",
"""【Bản dịch Script】
Tại trường học, nam sinh và nữ sinh đang nói chuyện. Hai người sẽ ăn trưa ở đâu?
Nam: Đã 1 giờ rồi nhỉ. Chúng mình đi ăn gì đó không?
Nữ: Ừ nhỉ. Nhưng vì hôm nay là thứ Bảy nên nhà ăn và quán giải khát của trường đều đóng cửa nghỉ đấy.
Nam: Vậy chúng mình mua bánh mì ở tiệm bánh, rồi ăn ở phòng học nhé?
Nữ: Ừ, làm vậy đi.""")

add_q(77, "聴解 問題2 - 5番: 学生は何で名前を書きますか。", 1,
"""🎯 Đáp án đúng: [1] くろい ボールペン (Bút bi màu đen)

💬 Dịch nghĩa câu hỏi:
「教室で、先生が学生に話しています。学生は何で名前を書きますか。」
-> "Trong lớp học, cô giáo đang dặn học sinh. Học sinh sẽ viết tên bằng dụng cụ gì?"

💡 Phân tích & Giải thích chi tiết:
• Cô giáo dặn những ai muốn đăng ký chuyến du lịch bằng xe buýt vào tháng sau thì hãy viết tên vào tờ giấy này bằng **bút bi (ボールペン)** chứ không phải bút chì (鉛筆じゃなくて).
• Về màu mực: Hãy viết bằng **màu đen (黒で書いてください)**, không được viết bằng màu đỏ (赤で書かないで).

🔍 Phân tích các lựa chọn:
- 1. くろい ボールペン: (ĐÚNG) - Bút bi màu đen
- 2. あかい ボールペン: Bút bi màu đỏ (bị cấm)
- 3. くろい えんぴつ: Bút chì đen (bị cấm)
- 4. あかい えんぴつ: Bút chì đỏ

📄 Trích Script gốc trang 46 PDF (N5 7/2017 - 聴解 問題2 - 5番):
F: 鉛筆じゃなくて、ボールペンですよ。黒で書いてください。 -> 1. くろい ボールペン""",
"""【音声テキスト（PDF 46ページ）】
教室で、先生が学生に話しています。学生は何で名前を書きますか。
Ｆ：はい、じゃあちょっと聞いてください。えー、来月のバス旅行に行きたい人は、この紙に、ボールペンで名前を書いてください。鉛筆じゃなくて、ボールペンですよ。黒で書いてください。赤で書かないでくださいね。
学生は何で名前を書きますか。""",
"""【Bản dịch Script】
Trong phòng học, cô giáo đang nói chuyện với học sinh. Học sinh sẽ viết tên bằng gì?
Nữ (Cô giáo): Nào, các em hãy lắng nghe một chút nhé. Bạn nào muốn tham gia chuyến du lịch bằng xe buýt vào tháng sau thì hãy ghi tên vào tờ giấy này bằng bút bi nhé. Không phải bút chì mà là bút bi đấy nhé. Hãy viết bằng mực đen. Đừng viết bằng mực đỏ nhé.""")

add_q(78, "聴解 問題2 - 6番: 二人は明日どこで会いますか。", 3,
"""🎯 Đáp án đúng: [3] きっさてん (Quán giải khát)

💬 Dịch nghĩa câu hỏi:
「女の学生と男の学生が話しています。二人は明日どこで会いますか。」
-> "Nữ sinh và nam sinh đang nói chuyện. Ngày mai hai người sẽ hẹn gặp nhau ở đâu?"

💡 Phân tích & Giải thích chi tiết:
• Lúc đầu bạn nữ gợi ý gặp ở nhà ga (駅), nhưng bạn nam bảo nhà ga đông người lắm (「駅は人が多いですよ」).
• Sau đó bạn nữ đề xuất gặp nhau tại **quán giải khát ở trước nhà ga (駅の前の喫茶店はどうですか)** và bạn nam đồng ý (「はい、そうしましょう」). Còn nhà hàng (レストラン) là nơi sẽ đi ăn tối sau khi xem xong bóng đá.

🔍 Phân tích các lựa chọn:
- 1. こうえん (公園): Công viên
- 2. えき (駅): Nhà ga (bị từ chối vì đông người)
- 3. きっさてん (喫茶店): (ĐÚNG) - Quán giải khát trước nhà ga
- 4. レストラン: Nhà hàng (nơi ăn tối sau khi xem bóng đá)

📄 Trích Script gốc trang 46-47 PDF (N5 7/2017 - 聴解 問題2 - 6番):
F: じゃあ、駅の前の喫茶店はどうですか。 M: はい、そうしましょう。 -> 3. きっさてん""",
"""【音声テキスト（PDF 46-47ページ）】
女の学生と男の学生が話しています。二人は明日どこで会いますか。
Ｆ：明日の夜、一緒にサッカーを見に行きませんか。
Ｍ：いいですね。どこで会いましょうか。
Ｆ：５時に駅で会いませんか。
Ｍ：駅は人が多いですよ。
Ｆ：そうですね。じゃあ、駅の前の喫茶店はどうですか。
Ｍ：はい、そうしましょう。あ、サッカーを見てから近くのレストランで晩ご飯を食べませんか。
Ｆ：ええ。じゃ、明日５時に会いましょう。
二人は明日どこで会いますか。""",
"""【Bản dịch Script】
Nữ sinh và nam sinh đang nói chuyện. Ngày mai hai người sẽ gặp nhau ở đâu?
Nữ: Tối mai chúng mình cùng đi xem bóng đá không?
Nam: Hay đấy. Chúng mình hẹn gặp nhau ở đâu nhỉ?
Nữ: 5 giờ gặp ở nhà ga nhé?
Nam: Ở nhà ga đông người lắm đấy.
Nữ: Đúng nhỉ. Vậy quán giải khát ở trước nhà ga thì sao?
Nam: Ừ, thống nhất vậy đi. À, xem bóng đá xong chúng mình ăn tối ở nhà hàng gần đó nhé?
Nữ: Vâng. Vậy hẹn gặp lại lúc 5 giờ chiều mai nhé.""")

# 問題3 (Global Q79 - Q83 / Local 1 - 5): Nghe diễn đạt tình huống (3 lựa chọn 1..3)
add_q(79, "聴解 問題3 - 1番: ご飯を食べました。何と言いますか。", 1,
"""🎯 Đáp án đúng: [1] ごちそうさまでした。

💬 Dịch nghĩa tình huống:
「ご飯を食べました。何と言いますか。」
-> "Bạn đã ăn xong bữa cơm. Bạn sẽ nói câu gì?"

💡 Phân tích & Giải thích chi tiết:
• Trong văn hóa Nhật Bản, sau khi ăn xong bữa cơm, người ta chắp tay nói 「ごちそうさまでした」 (Cảm ơn vì bữa ăn ngon).

🔍 Phân tích các lựa chọn:
- 1. ごちそうさまでした。: (ĐÚNG) - Cảm ơn vì bữa ăn ngon (nói sau khi ăn xong)
- 2. いただきます。: Xin phép dùng bữa (nói trước khi bắt đầu ăn)
- 3. どういたしまして。: Không có chi

📄 Trích Script gốc trang 47 PDF (N5 7/2017 - 聴解 問題3 - 1番):
ご飯を食べました。何と言いますか。 -> 1. ごちそうさまでした。""",
"""【音声テキスト（PDF 47ページ）】
１番
ご飯を食べました。何と言いますか。
Ｆ：１．ごちそうさまでした。
　　２．いただきます。
　　３．どういたしまして。""",
"""【Bản dịch Script】
Câu 1: Bạn đã ăn cơm xong. Bạn sẽ nói gì?
1. Cảm ơn vì bữa ăn ngon. (ごちそうさまでした)
2. Xin phép dùng bữa. (いただきます)
3. Không có chi. (どういたしまして)""")

add_q(80, "聴解 問題3 - 2番: 電車の中です。女の人が来ました。何と言いますか。", 3,
"""🎯 Đáp án đúng: [3] ここ、どうぞ。

💬 Dịch nghĩa tình huống:
「電車の中です。女の人が来ました。何と言いますか。」
-> "Ở trên tàu điện. Có một người phụ nữ lớn tuổi đi tới. Bạn đứng dậy nhường ghế và nói gì?"

💡 Phân tích & Giải thích chi tiết:
• Khi nhường chỗ ngồi trên tàu điện cho người khác, ta chỉ vào ghế và mời lịch sự: 「ここ、どうぞ。」 (Xin mời ngồi chỗ này ạ).

🔍 Phân tích các lựa chọn:
- 1. どうもありがとう。: Cảm ơn rất nhiều
- 2. 初めまして。: Rất hân hạnh được gặp lần đầu
- 3. ここ、どうぞ。: (ĐÚNG) - Xin mời ngồi chỗ này ạ

📄 Trích Script gốc trang 47 PDF (N5 7/2017 - 聴解 問題3 - 2番):
電車の中です。女の人が来ました。何と言いますか。 -> 3. ここ、どうぞ。""",
"""【音声テキスト（PDF 47ページ）】
２番
電車の中です。女の人が来ました。何と言いますか。
Ｍ：１．どうもありがとう。
　　２．初めまして。
　　３．ここ、どうぞ。""",
"""【Bản dịch Script】
Câu 2: Ở trên tàu điện. Có một người phụ nữ lớn tuổi bước tới. Bạn nhường ghế và nói gì?
1. Cảm ơn rất nhiều.
2. Rất hân hạnh được gặp lần đầu.
3. Xin mời ngồi chỗ này ạ. (ここ、どうぞ)""")

add_q(81, "聴解 問題3 - 3番: 家へ帰ります。友達に何と言いますか。", 2,
"""🎯 Đáp án đúng: [2] じゃ、また。

💬 Dịch nghĩa tình huống:
「家へ帰ります。友達に何と言いますか。」
-> "Bạn ra về (về nhà). Bạn chào tạm biệt bạn bè như thế nào?"

💡 Phân tích & Giải thích chi tiết:
• Khi tạm biệt bạn bè để ra về, câu chào thân mật tự nhiên là 「じゃ、また。」 (Thế nhé, hẹn gặp lại sau).

🔍 Phân tích các lựa chọn:
- 1. いってきます。: Tôi đi đây (nói với người nhà khi rời khỏi nhà mình)
- 2. じゃ、また。: (ĐÚNG) - Tạm biệt, hẹn gặp lại nhé
- 3. ただいま。: Tôi đã về rồi đây (nói khi vừa về tới nhà mình)

📄 Trích Script gốc trang 47-48 PDF (N5 7/2017 - 聴解 問題3 - 3番):
家へ帰ります。友達に何と言いますか。 -> 2. じゃ、また。""",
"""【音声テキスト（PDF 47-48ページ）】
３番
家へ帰ります。友達に何と言いますか。
Ｍ：１．いってきます。
　　２．じゃ、また。
　　３．ただいま。""",
"""【Bản dịch Script】
Câu 3: Bạn đi về nhà. Bạn sẽ nói câu gì với bạn bè?
1. Tôi đi đây. (いってきます)
2. Thế nhé, hẹn gặp lại. (じゃ、また)
3. Tôi đã về rồi đây. (ただいま)""")

add_q(82, "聴解 問題3 - 4番: 郵便局で切手を買います。何と言いますか。", 3,
"""🎯 Đáp án đúng: [3] 切手を下さい。

💬 Dịch nghĩa tình huống:
「郵便局で切手を買います。何と言いますか。」
-> "Bạn mua tem thư tại bưu điện. Bạn sẽ nói gì với nhân viên bưu điện?"

💡 Phân tích & Giải thích chi tiết:
• Khi mua hàng hóa (tem thư - 切手), mẫu câu yêu cầu người bán đưa món hàng cho mình là 「N + を下さい」: 「切手を下さい。」 (Cho tôi mua tem thư ạ).

🔍 Phân tích các lựa chọn:
- 1. 切手を買いませんか。: Bạn có muốn mua tem không?
- 2. 切手をどうぞ。: Xin mời lấy tem (lời của người đưa)
- 3. 切手を下さい。: (ĐÚNG) - Làm ơn bán cho tôi tem thư ạ

📄 Trích Script gốc trang 48 PDF (N5 7/2017 - 聴解 問題3 - 4番):
郵便局で切手を買います。何と言いますか。 -> 3. 切手を下さい。""",
"""【音声テキスト（PDF 48ページ）】
４番
郵便局で切手を買います。何と言いますか。
Ｍ：１．切手を買いませんか。
　　２．切手をどうぞ。
　　３．切手を下さい。""",
"""【Bản dịch Script】
Câu 4: Bạn mua tem ở bưu điện. Bạn sẽ nói gì?
1. Bạn có mua tem không?
2. Xin mời lấy tem.
3. Làm ơn bán cho tôi tem thư ạ. (切手を下さい)""")

add_q(83, "聴解 問題3 - 5番: 友達は鉛筆がありません。友達に何と言いますか。", 2,
"""🎯 Đáp án đúng: [2] 鉛筆、使いますか。

💬 Dịch nghĩa tình huống:
「友達は鉛筆がありません。友達に何と言いますか。」
-> "Người bạn ngồi cạnh không có bút chì. Bạn cầm cây bút chì đưa cho bạn và nói gì?"

💡 Phân tích & Giải thích chi tiết:
• Nhìn tranh: Cô gái đang cầm cây bút chì của mình đưa sang cho người bạn đang lục tìm hộp bút.
• Vì mình là người **cho mượn** (không phải người đi mượn), nên câu nói đúng là hỏi bạn có dùng bút chì không: 「鉛筆、使いますか。」 (Bạn có dùng bút chì không?).

🔍 Phân tích các lựa chọn:
- 1. 鉛筆、借りましょうか。: Sai (借りる là mình đi mượn của người khác)
- 2. 鉛筆、使いますか。: (ĐÚNG) - Bạn có dùng bút chì này không?
- 3. 鉛筆、貸してください。: Sai (Hãy cho tôi mượn bút chì - lời của người đi mượn)

📄 Trích Script gốc trang 48 PDF (N5 7/2017 - 聴解 問題3 - 5番):
友達は鉛筆がありません。友達に何と言いますか。 -> 2. 鉛筆、使いますか。""",
"""【音声テキスト（PDF 48ページ）】
５番
友達は鉛筆がありません。友達に何と言いますか。
Ｆ：１．鉛筆、借りましょうか。
　　２．鉛筆、使いますか。
　　３．鉛筆、貸してください。""",
"""【Bản dịch Script】
Câu 5: Người bạn không có bút chì. Bạn đưa bút chì của mình cho bạn và nói gì?
1. Để tôi mượn bút chì nhé?
2. Bạn có dùng bút chì không? (鉛筆、使いますか)
3. Hãy cho tôi mượn bút chì.""")

# 問題4 (Global Q84 - Q89 / Local 1 - 6): Nghe phản xạ nhanh (3 lựa chọn 1..3)
add_q(84, "聴解 問題4 - 1番: Ｆ「今日は何日ですか。」", 1,
"""🎯 Đáp án đúng: [1] 三日（みっか）です。

💬 Dịch nghĩa câu hỏi & đáp:
「Ｆ：今日は何日ですか。
　Ｍ：１．三日（みっか）です。」
-> "Nữ: Hôm nay là ngày mùng mấy? / Nam: Là ngày mùng 3."

💡 Phân tích & Giải thích chi tiết:
• Câu hỏi 「今日は何日（なんにち）ですか」 hỏi về **ngày trong tháng**, nên câu trả lời phải dùng cách đếm ngày: 「三日（みっか）です」 (Ngày mùng 3).

🔍 Phân tích các lựa chọn:
- 1. 三日（みっか）です。: (ĐÚNG) - Là ngày mùng 3
- 2. 3週間（さんしゅうかん）です。: Là 3 tuần lễ (khoảng thời gian)
- 3. 3時（さんじ）です。: Là 3 giờ

📄 Trích Script gốc trang 48 PDF (N5 7/2017 - 聴解 問題4 - 1番):
F: 今日は何日ですか。 -> 1. 三日です。""",
"""【音声テキスト（PDF 48ページ）】
１番
Ｆ：今日は何日ですか。
Ｍ：１．三日です。
　　２．3週間です。
　　３．3時です。""",
"""【Bản dịch Script】
Câu 1:
Nữ: Hôm nay là ngày mùng mấy?
Nam:
1. Là ngày mùng 3. (三日です)
2. Là 3 tuần lễ.
3. Là 3 giờ.""")

add_q(85, "聴解 問題4 - 2番: Ｍ「すみません、図書館はどこですか。」", 1,
"""🎯 Đáp án đúng: [1] あそこです。

💬 Dịch nghĩa câu hỏi & đáp:
「Ｍ：すみません、図書館はどこですか。
　Ｆ：１．あそこです。」
-> "Nam: Xin lỗi, thư viện ở đâu vậy ạ? / Nữ: Ở đằng kia kìa."

💡 Phân tích & Giải thích chi tiết:
• Câu hỏi 「図書館はどこですか」 hỏi về **địa điểm / vị trí**, nên câu trả lời chỉ vị trí là 「あそこです」 (Ở đằng kia).

🔍 Phân tích các lựa chọn:
- 1. あそこです。: (ĐÚNG) - Ở đằng kia ạ
- 2. 6時までです。: Đến 6 giờ (trả lời cho 何時まで)
- 3. 本を借ります。: Tôi mượn sách

📄 Trích Script gốc trang 49 PDF (N5 7/2017 - 聴解 問題4 - 2番):
M: すみません、図書館はどこですか。 -> 1. あそこです。""",
"""【音声テキスト（PDF 49ページ）】
２番
Ｍ：すみません、図書館はどこですか。
Ｆ：１．あそこです。
　　２．6時までです。
　　３．本を借ります。""",
"""【Bản dịch Script】
Câu 2:
Nam: Xin lỗi, thư viện ở đâu vậy ạ?
Nữ:
1. Ở đằng kia ạ. (あそこです)
2. Đến 6 giờ ạ.
3. Mượn sách ạ.""")

add_q(86, "聴解 問題4 - 3番: Ｆ「明日、何時に学校に来ますか。」", 2,
"""🎯 Đáp án đúng: [2] 9時半です。

💬 Dịch nghĩa câu hỏi & đáp:
「Ｆ：明日、何時に学校に来ますか。
　Ｍ：２．9時半です。」
-> "Nữ: Ngày mai bạn đến trường lúc mấy giờ? / Nam: Lúc 9 giờ rưỡi."

💡 Phân tích & Giải thích chi tiết:
• Câu hỏi 「何時に」 (vào lúc mấy giờ) đòi hỏi câu trả lời chỉ thời gian giờ giấc: 「9時半です」 (9 giờ rưỡi).

🔍 Phân tích các lựa chọn:
- 1. バスで来ます。: Đến bằng xe buýt (trả lời cho 何で)
- 2. 9時半です。: (ĐÚNG) - Lúc 9 giờ rưỡi
- 3. 6人です。: 6 người (trả lời cho 何人)

📄 Trích Script gốc trang 49 PDF (N5 7/2017 - 聴解 問題4 - 3番):
F: 明日、何時に学校に来ますか。 -> 2. 9時半です。""",
"""【音声テキスト（PDF 49ページ）】
３番
Ｆ：明日、何時に学校に来ますか。
Ｍ：１．バスで来ます。
　　２．9時半です。
　　３．6人です。""",
"""【Bản dịch Script】
Câu 3:
Nữ: Ngày mai mấy giờ bạn đến trường?
Nam:
1. Tôi đến bằng xe buýt.
2. Lúc 9 giờ rưỡi. (9時半です)
3. Có 6 người.""")

add_q(87, "聴解 問題4 - 4番: Ｍ「田中さん、その荷物を持ちましょうか。」", 3,
"""🎯 Đáp án đúng: [3] ありがとうございます。

💬 Dịch nghĩa câu hỏi & đáp:
「Ｍ：田中さん、その荷物を持ちましょうか。
　Ｆ：３．ありがとうございます。」
-> "Nam: Chị Tanaka ơi, để tôi xách giúp hành lý đó nhé? / Nữ: Vâng, cảm ơn anh nhiều ạ."

💡 Phân tích & Giải thích chi tiết:
• Mẫu câu 「Vましょうか」 (Để tôi làm giúp bạn việc này nhé?) là lời đề nghị giúp đỡ nhiệt tình. Khi đón nhận sự giúp đỡ, ta nói lời cảm ơn: 「ありがとうございます。」.

🔍 Phân tích các lựa chọn:
- 1. どういたしまして。: Không có chi (dùng để đáp lại lời cảm ơn)
- 2. 持ちませんでした。: Đã không cầm
- 3. ありがとうございます。: (ĐÚNG) - Cảm ơn anh nhiều ạ

📄 Trích Script gốc trang 49 PDF (N5 7/2017 - 聴解 問題4 - 4番):
M: 田中さん、その荷物を持ちましょうか。 -> 3. ありがとうございます。""",
"""【音声テキスト（PDF 49ページ）】
４番
Ｍ：田中さん、その荷物を持ちましょうか。
Ｆ：１．どういたしまして。
　　２．持ちませんでした。
　　３．ありがとうございます。""",
"""【Bản dịch Script】
Câu 4:
Nam: Chị Tanaka, để tôi xách giúp chỗ hành lý đó nhé?
Nữ:
1. Không có chi.
2. Tôi đã không xách.
3. Cảm ơn anh nhiều ạ. (ありがとうございます)""")

add_q(88, "聴解 問題4 - 5番: Ｍ「ちょっと休みませんか。」", 3,
"""🎯 Đáp án đúng: [3] そうしましょう。

💬 Dịch nghĩa câu hỏi & đáp:
「Ｍ：ちょっと休みませんか。
　Ｆ：３．そうしましょう。」
-> "Nam: Chúng mình nghỉ giải lao một chút nhé? / Nữ: Ừ, chúng mình làm vậy đi."

💡 Phân tích & Giải thích chi tiết:
• Đáp lại lời đề nghị / rủ rê 「ちょっと休みませんか」 (Nghỉ ngơi một lát không?), câu đồng tình tự nhiên là 「そうしましょう。」 (Ừ, làm vậy đi / Chúng ta nghỉ thôi).

🔍 Phân tích các lựa chọn:
- 1. 日曜日です。: Là ngày Chủ nhật
- 2. お元気ですか。: Bạn có khỏe không?
- 3. そうしましょう。: (ĐÚNG) - Ừ, chúng mình làm vậy đi

📄 Trích Script gốc trang 49 PDF (N5 7/2017 - 聴解 問題4 - 5番):
M: ちょっと休みませんか。 -> 3. そうしましょう。""",
"""【音声テキスト（PDF 49ページ）】
５番
Ｍ：ちょっと休みませんか。
Ｆ：１．日曜日です。
　　２．お元気ですか。
　　３．そうしましょう。""",
"""【Bản dịch Script】
Câu 5:
Nam: Chúng mình nghỉ ngơi một chút nhé?
Nữ:
1. Là ngày Chủ nhật.
2. Bạn có khỏe không?
3. Ừ, chúng mình làm vậy đi. (そうしましょう)""")

add_q(89, "聴解 問題4 - 6番: Ｍ「それは、何の本ですか。」", 1,
"""🎯 Đáp án đúng: [1] 料理の本です。

💬 Dịch nghĩa câu hỏi & đáp:
「Ｍ：それは、何の本ですか。
　Ｆ：１．料理の本です。」
-> "Nam: Đó là sách về chủ đề gì vậy? / Nữ: Đó là sách dạy nấu ăn."

💡 Phân tích & Giải thích chi tiết:
• Phân biệt: 「だれの本ですか」 hỏi sách của ai (trả lời: 私の本です), còn 「何（なん）の本ですか」 hỏi nội dung/chủ đề quyển sách đó viết về cái gì -> Trả lời: 「料理の本です」 (Sách dạy nấu ăn).

🔍 Phân tích các lựa chọn:
- 1. 料理の本です。: (ĐÚNG) - Là sách dạy nấu ăn
- 2. 私の本です。: Là sách của tôi (trả lời cho だれの本ですか)
- 3. はい、そうです。: Vâng, đúng vậy (không dùng cho câu hỏi có từ nghi vấn 何)

📄 Trích Script gốc trang 49 PDF (N5 7/2017 - 聴解 問題4 - 6番):
M: それは、何の本ですか。 -> 1. 料理の本です。""",
"""【音声テキスト（PDF 49ページ）】
６番
Ｍ：それは、何の本ですか。
Ｆ：１．料理の本です。
　　２．私の本です。
　　３．はい、そうです。""",
"""【Bản dịch Script】
Câu 6:
Nam: Đó là sách về cái gì vậy?
Nữ:
1. Là sách dạy nấu ăn. (料理の本です)
2. Là sách của tôi.
3. Vâng, đúng vậy.""")

print(f"Total questions built: {len(data_89)}")
assert len(data_89) == 89, f"Expected 89 questions, got {len(data_89)}"

# 1. Write scanned_n5_2017_07_official_answers.json
official_answers_map = {k: v["correctOption"] for k, v in sorted(data_89.items(), key=lambda x: int(x[0]))}
scanned_json_path = r"H:\JP_ANHSENSEI\frontend\src\app\data\scanned_n5_2017_07_official_answers.json"
scanned_content = {
    "examCode": "n5-2017-07",
    "yearTitle": "Đề Thi JLPT N5 7/2017",
    "officialKey": "Official 2017-07 N5 Answer Table 89 Questions (Pages 40-41)",
    "meta": {
        "sourceFile": "n5-2026-8652.pdf",
        "totalQuestions": 89,
        "scannedAt": "2026-09-27T00:25:00.000Z",
        "scannedBy": "AnhSensei 100% Authentic Official N5 7/2017 Answer Table (Pages 40-41) & Scripts (Pages 42-49)"
    },
    "officialAnswers": official_answers_map
}
with open(scanned_json_path, "w", encoding="utf-8") as f:
    json.dump(scanned_content, f, ensure_ascii=False, indent=2)
print("Saved scanned_n5_2017_07_official_answers.json!")

# 2. Inject "n5-2017-07" and "n5-2026-8652" into jlptDetailedExplanations.ts
ts_path = r"H:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts"
with open(ts_path, "r", encoding="utf-8") as f:
    ts_content = f.read()

def build_ts_block(key_name):
    lines = [f'  "{key_name}": {{']
    for num in range(1, 90):
        item = data_89[str(num)]
        lines.append(f'    "{num}": {{')
        lines.append(f'      "snippet": {json.dumps(item["snippet"], ensure_ascii=False)},')
        lines.append(f'      "explanation": {json.dumps(item["explanation"], ensure_ascii=False)},')
        if "audioScriptJa" in item:
            lines.append(f'      "audioScriptJa": {json.dumps(item["audioScriptJa"], ensure_ascii=False)},')
        if "audioScriptVi" in item:
            lines.append(f'      "audioScriptVi": {json.dumps(item["audioScriptVi"], ensure_ascii=False)},')
        lines.append(f'      "correctOption": {item["correctOption"]}')
        lines.append('    },')
    lines.append('  },')
    return "\n".join(lines)

block_2017 = build_ts_block("n5-2017-07") + "\n" + build_ts_block("n5-2026-8652")

# Remove existing n5-2017-07 / n5-2026-8652 if present, otherwise insert right before the closing `};`
import re
ts_content = re.sub(r'  "n5-2017-07": \{.*?\n  \},\n?', '', ts_content, flags=re.DOTALL)
ts_content = re.sub(r'  "n5-2026-8652": \{.*?\n  \},\n?', '', ts_content, flags=re.DOTALL)

last_brace_idx = ts_content.rfind("};")
assert last_brace_idx != -1, "Could not find closing }; in jlptDetailedExplanations.ts"
ts_content = ts_content[:last_brace_idx] + block_2017 + "\n};\n"
with open(ts_path, "w", encoding="utf-8") as f:
    f.write(ts_content)
print("Updated jlptDetailedExplanations.ts with n5-2017-07 and n5-2026-8652!")

# 3. Update scratch/server_admin_exams.json and temp store + POST to /api/jlpt-exams
store_paths = [
    r"H:\JP_ANHSENSEI\scratch\server_admin_exams.json",
    os.path.join(tempfile.gettempdir(), "anhsensei_server_admin_exams.json")
]

for sp in store_paths:
    if os.path.exists(sp):
        with open(sp, "r", encoding="utf-8") as f:
            raw = json.load(f)
        exams = raw.get("exams", []) if isinstance(raw, dict) else raw
        updated_count = 0
        for ex in exams:
            if not isinstance(ex, dict):
                continue
            code = (ex.get("examCode") or "").lower()
            title = (ex.get("yearTitle") or "").lower()
            lvl = (ex.get("level") or "").upper()
            if code == "n5-2026-8652" or (lvl == "N5" and "2017" in title):
                ex["level"] = "N5"
                for ver in ex.get("versions", []):
                    ver["totalQuestions"] = 89
                    ver["sections"] = [
                        {"name": "Từ vựng", "duration": 20, "questionsCount": 33},
                        {"name": "Ngữ pháp & Đọc", "duration": 40, "questionsCount": 32},
                        {"name": "Nghe hiểu", "duration": 30, "questionsCount": 24}
                    ]
                    ver["questions"] = data_89
                updated_count += 1
        if isinstance(raw, dict):
            raw["exams"] = exams
            to_save = raw
        else:
            to_save = exams
        with open(sp, "w", encoding="utf-8") as f:
            json.dump(to_save, f, ensure_ascii=False, indent=2)
        print(f"Updated {updated_count} exam(s) in {sp}")

        # Also POST to running Next.js API
        try:
            req = urllib.request.Request(
                "http://localhost:3000/api/jlpt-exams",
                data=json.dumps({"exams": exams, "authoritativeOverwrite": True}).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=5) as resp:
                print("POST /api/jlpt-exams status:", resp.status)
        except Exception as e:
            print("Note: Could not POST to localhost:3000:", e)

