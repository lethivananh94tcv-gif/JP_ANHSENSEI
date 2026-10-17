# -*- coding: utf-8 -*-
"""
Build 100% authentic official answers (page 15) and detailed explanations + listening scripts (pages 16-24)
for JLPT N5 2018 (examCode: n5-2026-3588 / n5-2018, Total: 91 questions).
- Section 1 (Moji-Goi): Q1 - Q35 (35 questions: M1=12, M2=8, M3=10, M4=5)
- Section 2 (Bunpou-Dokkai): Q36 - Q67 (32 questions, local 1 - 32: M1=16, M2=5, M3=5, M4=3, M5=2, M6=1)
- Section 3 (Choukai): Q68 - Q91 (24 questions: M1=7, M2=6, M3=5, M4=6)
"""
import json
import os
import re
import tempfile
import urllib.request

data_91 = {}

def add_q(num, snippet, correct_opt, explanation, audio_ja=None, audio_vi=None, local_num=None, section_name=None, mondai=None):
    if section_name is None:
        if num <= 35:
            section_name = "Từ vựng"
        elif num <= 67:
            section_name = "Ngữ pháp & Đọc"
        else:
            section_name = "Nghe hiểu"
    if local_num is None:
        if num <= 35:
            local_num = num
        elif num <= 67:
            local_num = num - 35
        else:
            if num <= 74:
                local_num = num - 67
            elif num <= 80:
                local_num = num - 74
            elif num <= 85:
                local_num = num - 80
            else:
                local_num = num - 85
    if mondai is None:
        if num <= 12: mondai = 1
        elif num <= 20: mondai = 2
        elif num <= 30: mondai = 3
        elif num <= 35: mondai = 4
        elif num <= 51: mondai = 1
        elif num <= 56: mondai = 2
        elif num <= 61: mondai = 3
        elif num <= 64: mondai = 4
        elif num <= 66: mondai = 5
        elif num == 67: mondai = 6
        elif num <= 74: mondai = 1
        elif num <= 80: mondai = 2
        elif num <= 85: mondai = 3
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
    data_91[str(num)] = item

# ==============================================================================
# SECTION 1: 文字・語彙 (Q1 - Q35)
# ==============================================================================
# 問題1 (Q1 - Q12): Cách đọc Kanji
add_q(1, "たくさん 雨 (あめ) が ふりました。", 2,
"""🎯 Đáp án đúng: [2] あめ (雨)

💬 Dịch nghĩa câu:
「たくさん 雨が ふりました。」
-> "Trời đã mưa rất nhiều."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Chữ Hán 「雨」 (Vũ) đọc là 「あめ」, nghĩa là "mưa".
• Cụm từ 「雨が降る (あめがふる)」: trời mưa.

🔍 Phân tích các lựa chọn:
- 1. ゆき (雪): Tuyết
- 2. あめ (雨): (ĐÚNG) - Mưa
- 3. くも (雲): Mây
- 4. かぜ (風): Gió

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題1 - Câu 1):
たくさん【雨】がふりました。 -> 2. あめ""")

add_q(2, "ここに 名前を 書いて (かいて) ください。", 3,
"""🎯 Đáp án đúng: [3] かいて (書いて)

💬 Dịch nghĩa câu:
「ここに 名前を 書いて ください。」
-> "Xin hãy viết tên vào đây."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Động từ 「書く」 (Thư - viết) có âm đọc là 「かく」, khi chia sang thể て biến âm thành 「書いて (かいて)」.

🔍 Phân tích các lựa chọn:
- 1. きいて (聞いて): Nghe / Hỏi
- 2. はいて (履いて): Đi, mặc (giày, quần)
- 3. かいて (書いて): (ĐÚNG) - Viết
- 4. ひいて (弾いて / 引いて): Đánh đàn / Kéo

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題1 - Câu 2):
ここに名前を【書いて】ください。 -> 3. かいて""")

add_q(3, "かばんの 中 (なか) に さいふが あります。", 2,
"""🎯 Đáp án đúng: [2] なか (中)

💬 Dịch nghĩa câu:
「かばんの 中に さいふが あります。」
-> "Ở bên trong cặp có chiếc ví."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Chữ Hán 「中」 (Trung) khi chỉ vị trí "bên trong" đọc âm Kun là 「なか」.

🔍 Phân tích các lựa chọn:
- 1. そば (側 / 傍): Bên cạnh
- 2. なか (中): (ĐÚNG) - Bên trong
- 3. した (下): Bên dưới
- 4. よこ (横): Bên ngang / Bên cạnh

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題1 - Câu 3):
かばんの【中】にさいふがあります。 -> 2. なか""")

add_q(4, "その 小さい (ちいさい) じしょを 見せて ください。", 3,
"""🎯 Đáp án đúng: [3] ちいさい (小さい)

💬 Dịch nghĩa câu:
「その 小さい じしょを 見せて ください。」
-> "Xin hãy cho tôi xem cuốn từ điển nhỏ đó."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Tính từ 「小さい」 (Tiểu - nhỏ bé) có trường âm 「い」 ở đầu: đọc là 「ちいさい」 (không phải ちさい).

🔍 Phân tích các lựa chọn:
- 1. ちっさい: Cách nói khẩu ngữ, không phải cách đọc chuẩn của 小さい
- 2. ちさい: Thiếu trường âm 「い」
- 3. ちいさい (小さい): (ĐÚNG) - Nhỏ bé
- 4. しさい: Sai phụ âm đầu

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題1 - Câu 4):
その【小さい】じしょを見せてください。 -> 3. ちいさい""")

add_q(5, "テストは 来週の 火よう日 (かようび) です。", 1,
"""🎯 Đáp án đúng: [1] かようび (火よう日)

💬 Dịch nghĩa câu:
「テストは 来週の 火よう日 です。」
-> "Bài kiểm tra sẽ diễn ra vào thứ Ba tuần sau."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• 「火よう日 (火曜日)」 (Hỏa Diệu Nhật) đọc là 「かようび」, nghĩa là "thứ Ba".

🔍 Phân tích các lựa chọn:
- 1. かようび (火曜日): (ĐÚNG) - Thứ Ba
- 2. すいようび (水曜日): Thứ Tư
- 3. きんようび (金曜日): Thứ Sáu
- 4. もくようび (木曜日): Thứ Năm

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題1 - Câu 5):
テストは来週の【火よう日】です。 -> 1. かようび""")

add_q(6, "きれいな 空 (そら) ですね。", 3,
"""🎯 Đáp án đúng: [3] そら (空)

💬 Dịch nghĩa câu:
「きれいな 空 ですね。」
-> "Bầu trời đẹp quá nhỉ."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Chữ Hán 「空」 (Không) đọc là 「そら」, nghĩa là "bầu trời".

🔍 Phân tích các lựa chọn:
- 1. いえ (家): Ngôi nhà
- 2. うみ (海): Biển
- 3. そら (空): (ĐÚNG) - Bầu trời
- 4. にわ (庭): Sân vườn

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題1 - Câu 6):
きれいな【空】ですね。 -> 3. そら""")

add_q(7, "パーティーに 百人 (ひゃくにん) 来ました。", 4,
"""🎯 Đáp án đúng: [4] ひゃくにん (百人)

💬 Dịch nghĩa câu:
「パーティーに 百人 来ました。」
-> "Đã có 100 người đến buổi tiệc."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• 「百」 (Bách = 100) đọc là 「ひゃく」, kết hợp với hậu tố đếm người 「人 (にん)」 tạo thành 「ひゃくにん」 (100 người).

🔍 Phân tích các lựa chọn:
- 1. びゃくじん: Sai âm đục và hậu tố
- 2. びゃくにん: Sai âm đục びゃく (chỉ 三百 mới đọc là さんびゃく)
- 3. ひゃくじん: Sai hậu tố đếm người (じん chỉ quốc tịch)
- 4. ひゃくにん (百人): (ĐÚNG) - 100 người

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題1 - Câu 7):
パーティーに【百人】来ました。 -> 4. ひゃくにん""")

add_q(8, "この 魚 (さかな) は いくらですか。", 1,
"""🎯 Đáp án đúng: [1] さかな (魚)

💬 Dịch nghĩa câu:
「この 魚は いくらですか。」
-> "Con cá này giá bao nhiêu tiền vậy?"

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Chữ Hán 「魚」 (Ngư) đọc là 「さかな」, nghĩa là "cá".

🔍 Phân tích các lựa chọn:
- 1. さかな (魚): (ĐÚNG) - Cá
- 2. たまご (卵 / 玉子): Trứng
- 3. にく (肉): Thịt
- 4. やさい (野菜): Rau củ

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題1 - Câu 8):
この【魚】はいくらですか。 -> 1. さかな""")

add_q(9, "この ケーキを 半分 (はんぶん) ください。", 4,
"""🎯 Đáp án đúng: [4] はんぶん (半分)

💬 Dịch nghĩa câu:
「この ケーキを 半分 ください。」
-> "Cho tôi phân nửa (một nửa) chiếc bánh ngọt này."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Chữ Hán 「半分」 (Bán Phân) đọc là 「はんぶん」 (có biến âm đục ぶん), nghĩa là "một nửa / phân nửa".

🔍 Phân tích các lựa chọn:
- 1. ほんぶん (本文): Phần thân bài / chính văn
- 2. ほんぷん: Sai cách đọc
- 3. はんぷん: Sai âm nửa đục ぷん
- 4. はんぶん (半分): (ĐÚNG) - Một nửa / Phân nửa

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題1 - Câu 9):
このケーキを【半分】ください。 -> 4. はんぶん""")

add_q(10, "ポストは ぎんこうと としょかんの 間 (あいだ) に あります。", 2,
"""🎯 Đáp án đúng: [2] あいだ (間)

💬 Dịch nghĩa câu:
「ポストは ぎんこうと としょかんの 間に あります。」
-> "Hòm thư nằm ở giữa ngân hàng và thư viện."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Chữ Hán 「間」 (Gian) khi chỉ khoảng không gian ở giữa hai vật (AとBの間に) đọc là 「あいだ」.

🔍 Phân tích các lựa chọn:
- 1. となり (隣): Bên cạnh (cùng loại)
- 2. あいだ (間): (ĐÚNG) - Ở giữa
- 3. ちかく (近く): Ở gần
- 4. むこう (向こう): Phía bên kia / Đối diện

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題1 - Câu 10):
ポストはぎんこうととしょかんの【間】にあります。 -> 2. あいだ""")

add_q(11, "はこが 三つ (みっつ) あります。", 1,
"""🎯 Đáp án đúng: [1] みっつ (三つ)

💬 Dịch nghĩa câu:
「はこが 三つ あります。」
-> "Có 3 cái hộp."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Đếm đồ vật nói chung với số 3 「三つ」 đọc theo âm thuần Nhật là 「みっつ」 (có xúc âm nhỏ っ).

🔍 Phân tích các lựa chọn:
- 1. みっつ (三つ): (ĐÚNG) - 3 cái
- 2. むっつ (六つ): 6 cái
- 3. みつ: Thiếu xúc âm っ
- 4. むつ: Thiếu xúc âm っ

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題1 - Câu 11):
はこが【三つ】あります。 -> 1. みっつ""")

add_q(12, "あしたも いい 天気 (てんき) でしょう。", 4,
"""🎯 Đáp án đúng: [4] てんき (天気)

💬 Dịch nghĩa câu:
「あしたも いい 天気 でしょう。」
-> "Ngày mai chắc thời tiết cũng đẹp nhỉ."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Chữ Hán 「天気」 (Thiên Khí) đọc là 「てんき」, nghĩa là "thời tiết".

🔍 Phân tích các lựa chọn:
- 1. てんぎ: Sai âm đục ぎ
- 2. でんぎ: Sai cả hai âm đục
- 3. でんき (電気): Điện / Đèn điện
- 4. てんき (天気): (ĐÚNG) - Thời tiết

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題1 - Câu 12):
あしたもいい【天気】でしょう。 -> 4. てんき""")

# 問題2 (Q13 - Q20): Chọn chữ Kanji / Katakana
add_q(13, "ちちに わいしゃつ (ワイシャツ) を もらいました。", 2,
"""🎯 Đáp án đúng: [2] ワイシャツ (わいしゃつ)

💬 Dịch nghĩa câu:
「ちちに ワイシャツを もらいました。」
-> "Tôi đã nhận được chiếc áo sơ mi từ bố."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• 「わいしゃつ」 là từ ngoại lai (White shirt -> áo sơ mi trắng/áo sơ mi nam), viết bằng chữ Katakana là 「ワイシャツ」.

🔍 Phân tích các lựa chọn:
- 1. ワトシャツ: Sai chữ ト
- 2. ワイシャツ: (ĐÚNG) - Áo sơ mi
- 3. ウイシャツ: Sai chữ ウ
- 4. ウトシャツ: Sai chữ ウ và ト

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題2 - Câu 13):
ちちに【わいしゃつ】をもらいました。 -> 2. ワイシャツ""")

add_q(14, "この かわ (川) は とても きれいです。", 1,
"""🎯 Đáp án đúng: [1] 川 (かわ)

💬 Dịch nghĩa câu:
「この 川は とても きれいです。」
-> "Con sông này rất sạch đẹp."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• 「かわ」 (dòng sông) viết bằng chữ Hán là 「川」 (Xuyên - tượng hình dòng nước chảy).

🔍 Phân tích các lựa chọn:
- 1. 川 (かわ - Xuyên): (ĐÚNG) - Con sông
- 2. 山 (やま - Sơn): Ngọn núi
- 3. 池 (いけ - Trì): Cái ao
- 4. 村 (むら - Thôn): Ngôi làng

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題2 - Câu 14):
この【かわ】はとてもきれいです。 -> 1. 川""")

add_q(15, "バスで がっこう (学校) に 行きます。", 4,
"""🎯 Đáp án đúng: [4] 学校 (がっこう)

💬 Dịch nghĩa câu:
「バスで 学校に 行きます。」
-> "Tôi đi đến trường bằng xe buýt."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• 「がっこう」 (trường học) viết bằng chữ Hán là 「学校」 (Học Hiệu).

🔍 Phân tích các lựa chọn:
- 1. 学枚: Sai chữ 枚 (Mai - tờ)
- 2. 字枚: Sai cả hai chữ
- 3. 字校: Sai chữ 字 (Tự)
- 4. 学校 (がっこう - Học Hiệu): (ĐÚNG) - Trường học

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題2 - Câu 15):
バスで【がっこう】に行きます。 -> 4. 学校""")

add_q(16, "きのうの ばん どんな テレビを みて (見て) いましたか。", 1,
"""🎯 Đáp án đúng: [1] 見て (みて)

💬 Dịch nghĩa câu:
「きのうの ばん どんな テレビを 見て いましたか。」
-> "Tối hôm qua bạn đã xem chương trình tivi gì thế?"

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Động từ 「みる」 (xem, nhìn) viết bằng chữ Hán 「見る」 (Kiến), chia thể て là 「見て」.

🔍 Phân tích các lựa chọn:
- 1. 見て (みて - Kiến): (ĐÚNG) - Xem, nhìn
- 2. 貝て: Chữ 貝 (Bối - vỏ sò)
- 3. 目て: Chữ 目 (Mục - con mắt)
- 4. 自て: Chữ 自 (Tự - bản thân)

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題2 - Câu 16):
きのうのばんどんなテレビを【みて】いましたか。 -> 1. 見て""")

add_q(17, "この くるまは たかい (高い) ですね。", 3,
"""🎯 Đáp án đúng: [3] 高い (たかい)

💬 Dịch nghĩa câu:
「この くるまは 高い ですね。」
-> "Chiếc xe ô tô này đắt giá nhỉ."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Tính từ 「たかい」 (cao / đắt) viết bằng chữ Hán là 「高い」 (Cao).

🔍 Phân tích các lựa chọn:
- 1. 長い (ながい - Trường): Dài
- 2. 白い (しろい - Bạch): Màu trắng
- 3. 高い (たかい - Cao): (ĐÚNG) - Cao / Đắt đỏ
- 4. 安い (やすい - An): Rẻ

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題2 - Câu 17):
このくるまは【たかい】ですね。 -> 3. 高い""")

add_q(18, "あそこに かいしゃ (会社) が あります。", 4,
"""🎯 Đáp án đúng: [4] 会社 (かいしゃ)

💬 Dịch nghĩa câu:
「あそこに 会社が あります。」
-> "Ở đằng kia có một công ty."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• 「かいしゃ」 (công ty) viết bằng chữ Hán là 「会社」 (Hội Xã).

🔍 Phân tích các lựa chọn:
- 1. 令社: Sai chữ 令 (Lệnh)
- 2. 令仕: Sai cả hai chữ
- 3. 会仕: Sai chữ 仕 (Sĩ)
- 4. 会社 (かいしゃ - Hội Xã): (ĐÚNG) - Công ty

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題2 - Câu 18):
あそこに【かいしゃ】があります。 -> 4. 会社""")

add_q(19, "だれにも いわないで (言わないで) ください。", 3,
"""🎯 Đáp án đúng: [3] 言わないで (いわないで)

💬 Dịch nghĩa câu:
「だれにも 言わないで ください。」
-> "Xin đừng nói cho bất kỳ ai nhé."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Động từ 「いう」 (nói) viết bằng chữ Hán 「言う」 (Ngôn), chia sang thể ない + で là 「言わないで」 (đừng nói).

🔍 Phân tích các lựa chọn:
- 1. 買わないで (かわないで - Mãi): Đừng mua
- 2. 合わないで (あわないで - Hợp): Đừng khớp/hợp
- 3. 言わないで (いわないで - Ngôn): (ĐÚNG) - Đừng nói
- 4. 会わないで (あわないで - Hội): Đừng gặp

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題2 - Câu 19):
だれにも【いわないで】ください。 -> 3. 言わないで""")

add_q(20, "らいげつ (来月) けっこんします。", 2,
"""🎯 Đáp án đúng: [2] 来月 (らいげつ)

💬 Dịch nghĩa câu:
「来月 けっこんします。」
-> "Tháng sau tôi sẽ kết hôn."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• 「らいげつ」 (tháng sau) viết bằng chữ Hán là 「来月」 (Lai Nguyệt).

🔍 Phân tích các lựa chọn:
- 1. 来日 (らいにち): Đến Nhật Bản
- 2. 来月 (らいげつ - Lai Nguyệt): (ĐÚNG) - Tháng sau
- 3. 未月: Sai chữ 未 (Vị)
- 4. 未日: Sai cả hai chữ

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題2 - Câu 20):
【らいげつ】けっこんします。 -> 2. 来月""")

# 問題3 (Q21 - Q30): Điền từ phù hợp vào chỗ trống
add_q(21, "わたしの へやは アパートの 2 ( かい ) です。", 4,
"""🎯 Đáp án đúng: [4] かい (階)

💬 Dịch nghĩa câu:
「わたしの へやは アパートの 2階（かい）です。」
-> "Phòng của tôi ở tầng 2 của khu chung cư."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Hậu tố đếm tầng của tòa nhà là 「～階（かい / がい）」. 「アパートの2かい」 = tầng 2 của chung cư.

🔍 Phân tích các lựa chọn:
- 1. まい (枚): Đếm vật mỏng phẳng (tờ, tấm)
- 2. だい (台): Đếm máy móc, xe cộ (chiếc)
- 3. ほん (本): Đếm vật thon dài
- 4. かい (階): (ĐÚNG) - Tầng lầu (tầng 2)

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題3 - Câu 21):
わたしのへやはアパートの2（　）です。 -> 4. かい""")

add_q(22, "ナイフで りんごを ( きって ) ください。", 3,
"""🎯 Đáp án đúng: [3] きって (切って)

💬 Dịch nghĩa câu:
「ナイフで りんごを 切って ください。」
-> "Xin hãy dùng dao cắt quả táo."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Có công cụ 「ナイフで」 (bằng con dao) và tân ngữ 「りんごを」 (quả táo) -> dùng động từ 「切る（きる -> きって）」 (cắt, gọt).

🔍 Phân tích các lựa chọn:
- 1. つけて (点けて / 付けて): Bật (điện) / Gắn vào
- 2. しめて (閉めて / 締めて): Đóng (cửa) / Thắt
- 3. きって (切って): (ĐÚNG) - Cắt, gọt
- 4. けして (消して): Tắt (điện) / Xóa

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題3 - Câu 22):
ナイフでりんごを（　）ください。 -> 3. きって""")

add_q(23, "きょうは いえに ( とけい ) を わすれましたから、じかんが わかりません。", 2,
"""🎯 Đáp án đúng: [2] とけい (時計)

💬 Dịch nghĩa câu:
「きょうは いえに 時計（とけい）を わすれましたから、じかんが わかりません。」
-> "Hôm nay vì để quên đồng hồ ở nhà nên tôi không biết mấy giờ."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Vế sau nói 「じかんが わかりません」 (không biết thời gian) -> vật để quên ở nhà là 「とけい (時計 - đồng hồ)」.

🔍 Phân tích các lựa chọn:
- 1. ぼうし (帽子): Cái mũ
- 2. とけい (時計): (ĐÚNG) - Đồng hồ
- 3. かさ (傘): Cái ô (dù)
- 4. かぎ (鍵): Chìa khóa

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題3 - Câu 23):
きょうはいえに（　）をわすれましたから、じかんがわかりません。 -> 2. とけい""")

add_q(24, "わたしの いえは えきに ちかいですから、( べんり ) です。", 4,
"""🎯 Đáp án đúng: [4] べんり (便利)

💬 Dịch nghĩa câu:
「わたしの いえは えきに ちかいですから、便利です。」
-> "Nhà của tôi vì gần nhà ga nên rất tiện lợi."

💡 Phân tích & Giải thích chi tiết (Trang 16):
• Nhà ở gần nhà ga (えきに ちかい) nên việc đi lại rất thuận tiện -> dùng tính từ 「べんり (便利 - tiện lợi)」.

🔍 Phân tích các lựa chọn:
- 1. じょうず (上手): Giỏi, khéo léo
- 2. ひま (暇): Rảnh rỗi
- 3. いっぱい: Đầy / Nhiều
- 4. べんり (便利): (ĐÚNG) - Tiện lợi, thuận tiện

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題3 - Câu 24):
わたしのいえはえきにちかいですから、（　）です。 -> 4. べんり""")

add_q(25, "なつやすみは まいにち ( プール ) で およぎました。", 1,
"""🎯 Đáp án đúng: [1] プール

💬 Dịch nghĩa câu:
「なつやすみは まいにち プールで およぎました。」
-> "Kỳ nghỉ hè ngày nào tôi cũng bơi ở hồ bơi."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• Động từ 「およぎました (泳ぎました - đã bơi)」 đi với địa điểm bơi lội là 「プール (hồ bơi / bể bơi)」.

🔍 Phân tích các lựa chọn:
- 1. プール (Pool): (ĐÚNG) - Hồ bơi, bể bơi
- 2. エレベーター (Elevator): Thang máy
- 3. デパート (Department store): Trung tâm thương mại
- 4. レストラン (Restaurant): Nhà hàng

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題3 - Câu 25):
なつやすみはまいにち（　）でおよぎました。 -> 1. プール""")

add_q(26, "きょうしつで せんせいに ( しつもん ) しました。", 1,
"""🎯 Đáp án đúng: [1] しつもん (質問)

💬 Dịch nghĩa câu:
「きょうしつで せんせいに 質問（しつもん）しました。」
-> "Tôi đã đặt câu hỏi cho thầy giáo ở trong lớp học."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• Cụm từ 「先生に質問する（せんせいに しつもんする）」: đặt câu hỏi / hỏi bài giáo viên.

🔍 Phân tích các lựa chọn:
- 1. しつもん (質問): (ĐÚNG) - Câu hỏi / Đặt câu hỏi
- 2. べんきょう (勉強): Học tập
- 3. れんしゅう (練習): Luyện tập
- 4. じゅぎょう (授業): Giờ học, tiết học

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題3 - Câu 26):
きょうしつでせんせいに（　）しました。 -> 1. しつもん""")

add_q(27, "あついですから、( まど ) を あけましょう。", 2,
"""🎯 Đáp án đúng: [2] まど (窓)

💬 Dịch nghĩa câu:
「あついですから、窓（まど）を あけましょう。」
-> "Vì trời nóng nên chúng ta hãy mở cửa sổ ra nhé."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• Trời nóng (あつい) và đi với động từ 「あけましょう (開けましょう - hãy mở ra)」 -> mở cửa sổ 「まど (窓)」.

🔍 Phân tích các lựa chọn:
- 1. おふろ (お風呂): Bồn tắm / Nhà tắm
- 2. まど (窓): (ĐÚNG) - Cửa sổ
- 3. か단 (花壇) / かいだん (階段): Cầu thang
- 4. テーブル (Table): Cái bàn

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題3 - Câu 27):
あついですから、（　）をあけましょう。 -> 2. まど""")

add_q(28, "きのうは たくさん かんじを ( おぼえました )。", 1,
"""🎯 Đáp án đúng: [1] おぼえました (覚えました)

💬 Dịch nghĩa câu:
「きのうは たくさん かんじを 覚えました（おぼえました）。」
-> "Hôm qua tôi đã ghi nhớ được rất nhiều chữ Hán."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• Với tân ngữ 「かんじを」 (chữ Hán), động từ phù hợp nhất là 「おぼえました (覚えました - đã nhớ / học thuộc)」.

🔍 Phân tích các lựa chọn:
- 1. おぼえました (覚えました): (ĐÚNG) - Đã nhớ, học thuộc
- 2. はしりました (走りました): Đã chạy
- 3. のぼりました (登りました): Đã leo (núi)
- 4. こまりました (困りました): Đã gặp rắc rối, khốn đốn

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題3 - Câu 28):
きのうはたくさんかんじを（　）。 -> 1. おぼえました""")

add_q(29, "この こうちゃは さとうを たくさん いれましたから、( あまい ) です。", 2,
"""🎯 Đáp án đúng: [2] あまい (甘い)

💬 Dịch nghĩa câu:
「この こうちゃは さとうを たくさん いれましたから、甘い（あまい）です。」
-> "Trà đen này vì đã cho nhiều đường vào nên rất ngọt."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• Cho nhiều đường (さとうを たくさん いれました) nên vị của trà sẽ ngọt -> 「あまい (甘い - ngọt)」.

🔍 Phân tích các lựa chọn:
- 1. わかい (若い): Trẻ tuổi
- 2. あまい (甘い): (ĐÚNG) - Ngọt
- 3. いた (痛い): Đau
- 4. わるい (悪い): Xấu

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題3 - Câu 29):
このこうちゃはさとうをたくさんいれましたから、（　）です。 -> 2. あまい""")

add_q(30, "きょうは つよい かぜが ( ふいて ) います。", 4,
"""🎯 Đáp án đúng: [4] ふいて (吹いて)

💬 Dịch nghĩa câu:
「きょうは つよい かぜが 吹いて（ふいて）います。」
-> "Hôm nay có gió mạnh đang thổi."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• Cụm từ cố định trong tiếng Nhật: 「風が吹く（かぜがふく）」 = gió thổi. Khi chia sang thể て + います là 「ふいています」.

🔍 Phân tích các lựa chọn:
- 1. たって (立って): Đang đứng
- 2. うごいて (動いて): Đang chuyển động
- 3. とんで (飛んで): Đang bay
- 4. ふいて (吹いて): (ĐÚNG) - Đang thổi (gió thổi)

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題3 - Câu 30):
きょうはつよいかぜが（　）います。 -> 4. ふいて""")

# 問題4 (Q31 - Q35): Chọn câu đồng nghĩa
add_q(31, "りょうしんの しゃしんを とりました。 ≒ ちちと ははの しゃしんを とりました。", 3,
"""🎯 Đáp án đúng: [3] ちちと ははの しゃしんを とりました。

💬 Dịch nghĩa câu gốc:
「りょうしんの しゃしんを とりました。」
-> "Tôi đã chụp ảnh bố mẹ."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• Từ khóa 「りょうしん (両親 - Lưỡng Thân)」 có nghĩa là cả bố và mẹ (「ちちと はは - 父と母」).
• Do đó câu đồng nghĩa là: 「ちちと ははの しゃしんを とりました。」 (Tôi đã chụp ảnh bố và mẹ).

🔍 Phân tích các lựa chọn:
- 1. おじいさんと おばあさんの しゃしんをとりました: Đã chụp ảnh ông và bà
- 2. あにと あねの しゃしんをとりました: Đã chụp ảnh anh trai và chị gái
- 3. ちちと ははの しゃしんをとりました: (ĐÚNG) - Đã chụp ảnh bố và mẹ
- 4. おとうとと いもうとの しゃしんをとりました: Đã chụp ảnh em trai và em gái

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題4 - Câu 31):
りょうしんのしゃしんをとりました。 -> 3. ちちとははのしゃしんをとりました。""")

add_q(32, "この ダンスは やさしいですね。 ≒ この ダンスは かんたんですね。", 1,
"""🎯 Đáp án đúng: [1] この ダンスは かんたんですね。

💬 Dịch nghĩa câu gốc:
「この ダンスは やさしいですね。」
-> "Điệu nhảy này dễ thật nhỉ."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• Tính từ 「やさしい (易しい)」 nghĩa là dễ dàng, đơn giản, đồng nghĩa với 「かんたん (簡単 - đơn giản, dễ)」.

🔍 Phân tích các lựa chọn:
- 1. この ダンスは かんたんですね: (ĐÚNG) - Điệu nhảy này đơn giản (dễ) nhỉ
- 2. この ダンスは たいへんですね: Điệu nhảy này vất vả nhỉ
- 3. この ダンスは たのしいですね: Điệu nhảy này vui nhỉ
- 4. この ダンスは むずかしいですね: Điệu nhảy này khó nhỉ (trái nghĩa)

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題4 - Câu 32):
このダンスはやさしいですね。 -> 1. このダンスはかんたんですね。""")

add_q(33, "ふくを せんたくしました。 ≒ ふくを あらいました。", 4,
"""🎯 Đáp án đúng: [4] ふくを あらいました。

💬 Dịch nghĩa câu gốc:
「ふくを せんたくしました。」
-> "Tôi đã giặt quần áo."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• Động từ 「せんたくする (洗濯する - giặt giũ)」 đồng nghĩa với 「あらう (洗う - giặt, rửa)」 khi đi với 「ふく (服 - quần áo)」.

🔍 Phân tích các lựa chọn:
- 1. ふくを ぬぎました: Đã cởi quần áo
- 2. ふくを きました: Đã mặc quần áo
- 3. ふくを かいました: Đã mua quần áo
- 4. ふくを あらいました: (ĐÚNG) - Đã giặt quần áo

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題4 - Câu 33):
ふくをせんたくしました。 -> 4. ふくをあらいました。""")

add_q(34, "この へやは くらいですね。 ≒ この へやは あかるくないですね。", 2,
"""🎯 Đáp án đúng: [2] この へやは あかるくないですね。

💬 Dịch nghĩa câu gốc:
「この へやは くらいですね。」
-> "Căn phòng này tối nhỉ."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• Tính từ 「くらい (暗い - tối)」 trái nghĩa với 「あかるい (明るい - sáng)」.
• Vì vậy 「くらいですね」 (tối nhỉ) đồng nghĩa với phủ định 「あかるくないですね」 (không sáng sủa nhỉ).

🔍 Phân tích các lựa chọn:
- 1. この へやは しずかじゃないですね: Căn phòng này không yên tĩnh nhỉ
- 2. この へやは あかるくないですね: (ĐÚNG) - Căn phòng này không sáng nhỉ
- 3. この へやは ひろくないですね: Căn phòng này không rộng nhỉ
- 4. この へやは きれいじゃないですね: Căn phòng này không sạch đẹp nhỉ

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題4 - Câu 34):
このへやはくらいですね。 -> 2. このへやはあかるくないですね。""")

add_q(35, "リーさんは もりさんに ペンを かしました。 ≒ もりさんは リーさんに ペンを かりました。", 2,
"""🎯 Đáp án đúng: [2] もりさんは リーさんに ペンを かりました。

💬 Dịch nghĩa câu gốc:
「リーさんは もりさんに ペンを かしました。」
-> "Bạn Lee đã cho bạn Mori mượn cây bút."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• 「Aは Bに ～を 貸す（かす）」 (A cho B mượn cái gì) tương đương góc nhìn ngược lại: 「Bは Aに ～を 借りる（かりる）」 (B mượn cái gì từ A).
• Lee cho Mori mượn bút = Mori đã mượn bút từ Lee (「もりさんは リーさんに ペンを かりました」).

🔍 Phân tích các lựa chọn:
- 1. リーさんは もりさんに ペンを かりました: Lee mượn bút từ Mori (ngược chiều)
- 2. もりさんは リーさんに ペンを かりました: (ĐÚNG) - Mori đã mượn bút từ Lee
- 3. リーさんは もりさんに ペンを もらいました: Lee nhận bút từ Mori
- 4. もりさんは リーさんに ペンを あげました: Mori tặng bút cho Lee

📄 Trích PDF gốc (N5 2018 - 文字・語彙 問題4 - Câu 35):
リーさんはもりさんにペンをかしました。 -> 2. もりさんはリーさんにペンをかりました。""")

# ==============================================================================
# SECTION 2: 文法・読解 (Q36 - Q67 / Local 1 - 32)
# ==============================================================================
# 問題1 (Q36 - Q51 / Local 1 - 16): Chọn ngữ pháp / trợ từ đúng
add_q(36, "あしたの ひこうき ( で ) 国へ 帰ります。", 3,
"""🎯 Đáp án đúng: [3] で

💬 Dịch nghĩa câu:
「あしたの ひこうきで 国へ 帰ります。」
-> "Tôi sẽ về nước bằng chuyến máy bay ngày mai."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• Trợ từ 「で」 đứng sau danh từ chỉ phương tiện giao thông (「ひこうきで」 = bằng máy bay) đi kèm động từ di chuyển 「帰ります」.

🔍 Phân tích các lựa chọn:
- 1. に: Chỉ đích đến / thời điểm
- 2. を: Chỉ tân ngữ
- 3. で: (ĐÚNG) - Chỉ phương tiện đi lại (ひこうきで = bằng máy bay)
- 4. が: Chỉ chủ ngữ

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 1):
あしたのひこうき（　）国へ帰ります。 -> 3. で""")

add_q(37, "デパートで かばん ( や ) くつなどを 買いました。", 1,
"""🎯 Đáp án đúng: [1] や

💬 Dịch nghĩa câu:
「デパートで かばんや くつなどを 買いました。」
-> "Ở trung tâm thương mại tôi đã mua những thứ như cặp sách, giày dép..."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• Cấu trúc liệt kê tiêu biểu (không đầy đủ): 「N1 や N2 など」 (những thứ như N1, N2...). Có từ 「など」 ở sau 「くつ」 nên chắc chắn chọn trợ từ 「や」.

🔍 Phân tích các lựa chọn:
- 1. や: (ĐÚNG) - Liệt kê tiêu biểu (AやBなど)
- 2. も: Cũng
- 3. に: Vào / ở
- 4. で: Bằng / tại

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 2):
デパートでかばん（　）くつなどを買いました。 -> 1. や""")

add_q(38, "わたしたちは 毎朝 7時ごろ 家 ( を ) 出ます。", 4,
"""🎯 Đáp án đúng: [4] を

💬 Dịch nghĩa câu:
「わたしたちは 毎朝 7時ごろ 家を 出ます。」
-> "Mỗi sáng chúng tôi rời khỏi nhà vào khoảng 7 giờ."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• Với các động từ chỉ sự rời đi, xuất phát khỏi một không gian như 「出る（でる）」「降りる（おりる）」, địa điểm rời khỏi đi kèm trợ từ 「を」: 「家を出る」 (ra khỏi nhà).

🔍 Phân tích các lựa chọn:
- 1. が: Chủ ngữ
- 2. で: Nơi diễn ra hành động
- 3. に: Đích đến (家に帰る / 家に入る)
- 4. を: (ĐÚNG) - Điểm xuất phát/rời khỏi (家を出る = ra khỏi nhà)

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 3):
わたしたちは毎朝7時ごろ家（　）出ます。 -> 4. を""")

add_q(39, "きのう スーパーで 田中さん ( に ) 会いました。", 3,
"""🎯 Đáp án đúng: [3] に

💬 Dịch nghĩa câu:
「きのう スーパーで 田中さんに 会いました。」
-> "Hôm qua ở siêu thị tôi đã gặp anh Tanaka."

💡 Phân tích & Giải thích chi tiết (Trang 17):
• Động từ 「会う（あう - gặp gỡ）」 dùng trợ từ 「に」 (hoặc 「と」) để chỉ đối tượng gặp gỡ: 「人に会う」.

🔍 Phân tích các lựa chọn:
- 1. を: Không dùng を với 会う
- 2. へ: Chỉ hướng di chuyển
- 3. に: (ĐÚNG) - Chỉ đối tượng gặp gỡ (田中さんに会う)
- 4. で: Chỉ địa điểm

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 4):
きのうスーパーで田中さん（　）会いました。 -> 3. に""")

add_q(40, "この いすは きょねん 父 ( が ) 作りました。", 2,
"""🎯 Đáp án đúng: [2] が

💬 Dịch nghĩa câu:
「この いすは きょねん 父が 作りました。」
-> "Chiếc ghế này là do bố tôi đã làm vào năm ngoái."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Trong câu đã có chủ đề 「このいすは」 (Chiếc ghế này thì...), nên chủ thể trực tiếp thực hiện hành động 「作りました」 (đã làm) là 「父」 được đánh dấu bằng trợ từ chủ ngữ 「が」.

🔍 Phân tích các lựa chọn:
- 1. を: Tân ngữ
- 2. が: (ĐÚNG) - Trợ từ chỉ chủ thể của hành động (父が作りました)
- 3. に: Đối tượng nhận
- 4. で: Phương tiện

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 5):
このいすはきょねん父（　）作りました。 -> 2. が""")

add_q(41, "きのう りんごを 買いました。五つ ( で ) 1,000円でした。", 1,
"""🎯 Đáp án đúng: [1] で

💬 Dịch nghĩa câu:
「きのう りんごを 買いました。五つで 1,000円でした。」
-> "Hôm qua tôi đã mua táo. Tổng cộng 5 quả là 1,000 yên."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Trợ từ 「で」 đi sau từ chỉ số lượng biểu thị tổng mức/phạm vi tính giá tiền: 「五つで 1,000円」 (5 quả tổng cộng 1,000 yên).

🔍 Phân tích các lựa chọn:
- 1. で: (ĐÚNG) - Chỉ phạm vi tổng cộng số lượng (五つで1,000円)
- 2. に: Không dùng trong cấu trúc tổng giá tiền
- 3. と: Và / Với
- 4. を: Tân ngữ

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 6):
きのうりんごを買いました。五つ（　）1,000円でした。 -> 1. で""")

add_q(42, "きのう ( は ) 少し 寒かったですが、今日 ( は ) 寒くないです。", 2,
"""🎯 Đáp án đúng: [2] は / は

💬 Dịch nghĩa câu:
「きのうは 少し 寒かったですが、今日は 寒くないです。」
-> "Hôm qua thì hơi lạnh một chút, nhưng hôm nay thì không lạnh."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Khi so sánh đối chiếu giữa hai thời điểm 「きのう」 (hôm qua) và 「今日」 (hôm nay), ta dùng cặp trợ từ 「は ... は」.

🔍 Phân tích các lựa chọn:
- 1. が / が: Không dùng để đối chiếu thời gian
- 2. は / は: (ĐÚNG) - Trợ từ nhấn mạnh sự đối比 (きのうは…今日は…)
- 3. に / に: Không đi sau きのう và 今日
- 4. から / から: Từ...

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 7):
きのう（　）少し寒かったですが、今日（　）寒くないです。 -> 2. は／は""")

add_q(43, "南町は、海が きれい ( で )、静かです。", 3,
"""🎯 Đáp án đúng: [3] で

💬 Dịch nghĩa câu:
「南町は、海が きれいで、静かです。」
-> "Thị trấn Minami vừa có biển đẹp, vừa yên tĩnh."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• 「きれい」 là tính từ đuôi な (な形容詞). Khi nối hai mệnh đề tính từ trong câu, tính từ đuôi な chuyển 「だ」 thành 「で」: 「きれいで、静かです」.

🔍 Phân tích các lựa chọn:
- 1. だ: Dạng kết thúc câu thông thường, không dùng để nối câu trực tiếp
- 2. な: Dùng khi bổ nghĩa cho danh từ đứng sau (きれいな海)
- 3. で: (ĐÚNG) - Thể て của tính từ đuôi な dùng để nối 2 vế câu
- 4. に: Biến thành phó từ bổ nghĩa cho động từ

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 8):
南町は、海がきれい（　）、静かです。 -> 3. で""")

add_q(44, "ヤン「林さん、( そこ ) に ある カメラは 林さんのですか。」", 1,
"""🎯 Đáp án đúng: [1] そこ

💬 Dịch nghĩa câu:
「ヤン：林さん、そこに ある カメラは 林さんのですか。
　林：ええ、そうです。」
-> "Yan: Anh Hayashi ơi, chiếc máy ảnh ở chỗ đó là của anh Hayashi phải không? / Hayashi: Vâng, đúng vậy."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Trước trợ từ 「に」 và động từ tồn tại 「ある」 cần một danh từ chỉ địa điểm (「ここ / そこ / あそこ」). Trong các đáp án chỉ có 「そこ」 là danh từ chỉ nơi chốn.

🔍 Phân tích các lựa chọn:
- 1. そこ: (ĐÚNG) - Chỗ đó (そこに ある カメラ = chiếc máy ảnh ở chỗ đó)
- 2. それ: Cái đó (chỉ đồ vật, không đi với に ある カメラ)
- 3. あの: Kia (phải đi trực tiếp với danh từ: あのカメラ)
- 4. どの: Nào (nghi vấn từ đi trước danh từ)

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 9):
ヤン「林さん、（　）にあるカメラは林さんのですか。」 -> 1. そこ""")

add_q(45, "A「先週、友だちと はじめて スキーを しました。」 B「そうですか。( いかが ) でしたか。」", 4,
"""🎯 Đáp án đúng: [4] いかが

💬 Dịch nghĩa câu:
「A：先週、友だちと はじめて スキーを しました。
　B：そうですか。いかがでしたか。
　A：とても たのしかったです。」
-> "A: Tuần trước tôi đã trượt tuyết lần đầu tiên cùng với bạn. / B: Thế à. Bạn thấy thế nào? / A: Đã rất vui."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Câu trả lời của A là 「とても たのしかったです」 (Đã rất vui - nêu cảm tưởng).
• Do đó B đã hỏi cảm nhận: 「いかがでしたか」 (ịch sự của 「どうでしたか」 = Thế nào?).

🔍 Phân tích các lựa chọn:
- 1. どんな: Như thế nào (phải đứng trước danh từ: どんな＋N)
- 2. いつ: Khi nào
- 3. なに: Cái gì
- 4. いかが: (ĐÚNG) - Thế nào (cách hỏi lịch sự của どう)

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 10):
B「そうですか。（　）でしたか。」 A「とてもたのしかったです。」 -> 4. いかが""")

add_q(46, "A「アンさん、日本の 大学は もう じゅぎょうが 始まりましたか。」アン「いいえ、( まだ ) です。来週 始まります。」", 3,
"""🎯 Đáp án đúng: [3] まだ

💬 Dịch nghĩa câu:
「A：アンさん、日本の 大学は もう じゅぎょうが 始まりましたか。
　アン：いいえ、まだです。来週 始まります。」
-> "A: Bạn An ơi, trường đại học ở Nhật đã bắt đầu giờ học chưa? / An: Chưa, vẫn chưa đâu ạ. Tuần sau mới bắt đầu."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Khi trả lời phủ định cho câu hỏi có 「もう ～ましたか」 (Đã ... chưa?), ta dùng 「いいえ、まだです」 (Chưa, vẫn chưa).

🔍 Phân tích các lựa chọn:
- 1. もう: Đã rồi
- 2. ちょっと: Một chút
- 3. まだ: (ĐÚNG) - Vẫn chưa (いいえ、まだです)
- 4. これから: Từ bây giờ

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 11):
アン「いいえ、（　）です。来週始まります。」 -> 3. まだ""")

add_q(47, "（びょういんで）いしゃ「来週の 月曜日に ( また ) 来て ください。」", 2,
"""🎯 Đáp án đúng: [2] また

💬 Dịch nghĩa câu:
「（びょういんで）
　いしゃ：来週の 月曜日に また 来て ください。
　ソム：はい、わかりました。」
-> "(Ở bệnh viện) Bác sĩ: Thứ Hai tuần sau anh hãy lại đến khám nhé. / Som: Vâng, tôi hiểu rồi."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Bác sĩ hẹn bệnh nhân quay lại khám vào thứ Hai tuần sau -> dùng phó từ 「また」 (lại, lần nữa: 「また来てください」).

🔍 Phân tích các lựa chọn:
- 1. もっと: Hơn nữa
- 2. また: (ĐÚNG) - Lại, lần nữa (また来てください)
- 3. いつも: Luôn luôn
- 4. よく: Thường xuyên

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 12):
いしゃ「来週の月曜日に（　）来てください。」 -> 2. また""")

add_q(48, "わたしは 毎朝 コーヒーを ( 飲み ) ながら 新聞を 読みます。", 1,
"""🎯 Đáp án đúng: [1] 飲み

💬 Dịch nghĩa câu:
「わたしは 毎朝 コーヒーを 飲みながら 新聞を 読みます。」
-> "Mỗi sáng tôi vừa uống cà phê vừa đọc báo."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Cấu trúc ngữ pháp 「Vます (bỏ ます) ＋ ながら」 diễn tả hai hành động diễn ra đồng thời (vừa ... vừa ...).
• Động từ 「飲みます」 bỏ 「ます」 còn 「飲み」 + 「ながら」 -> 「飲みながら」.

🔍 Phân tích các lựa chọn:
- 1. 飲み: (ĐÚNG) - Thể ます bỏ ます + ながら (飲みながら)
- 2. 飲む: Thể từ điển, không đi trực tiếp với ながら
- 3. 飲んで: Thể て
- 4. 飲んだり: Thể たり

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 13):
わたしは毎朝コーヒーを（　）ながら新聞を読みます。 -> 1. 飲み""")

add_q(49, "わたしは 小さいとき、なっとうが 好き ( じゃありません ) でした。", 4,
"""🎯 Đáp án đúng: [4] じゃありません

💬 Dịch nghĩa câu:
「わたしは 小さいとき、なっとうが 好きじゃありませんでした。」
-> "Hồi còn nhỏ, tôi đã không thích món đậu tương lên men (natto)."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• 「好き」 là tính từ đuôi な. Khi chia sang phủ định quá khứ với 「～でした」 ở cuối câu, ta dùng 「好きじゃありませんでした」.

🔍 Phân tích các lựa chọn:
- 1. くない: Cách chia của tính từ đuôi い
- 2. なかった: Không đi trực tiếp sau 好き (phải là 好きじゃなかった)
- 3. じゃない: Không cộng trực tiếp với でした trong văn viết chuẩn N5 (phải là じゃありませんでした)
- 4. じゃありません: (ĐÚNG) - 好きじゃありませんでした (đã không thích)

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 14):
わたしは小さいとき、なっとうが好き（　）でした。 -> 4. じゃありません""")

add_q(50, "（ケーキ屋で）客「すみません。いちごの ケーキを 二つ ( ください )。」", 2,
"""🎯 Đáp án đúng: [2] ください

💬 Dịch nghĩa câu:
「（ケーキ屋で）
　客：すみません。いちごの ケーキを 二つ ください。
　店の人：はい。かしこまりました。」
-> "(Ở tiệm bánh ngọt) Khách: Xin lỗi, cho tôi lấy 2 chiếc bánh ngọt dâu tây. / Nhân viên: Vâng, tôi đã rõ ạ."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Khi mua hàng tại cửa tiệm, mẫu câu yêu cầu người bán đưa món hàng cho mình là: 「N を [Số lượng] ください」 (Cho tôi ...).

🔍 Phân tích các lựa chọn:
- 1. します: Làm / Chọn (phải là ～にします nếu chọn món)
- 2. ください: (ĐÚNG) - Hãy cho tôi (ケーキを二つください)
- 3. 買いますか: Có mua không?
- 4. どうですか: Thế nào?

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 15):
客「すみません。いちごのケーキを二つ（　）。」 -> 2. ください""")

add_q(51, "モハメド「日曜日に わたしの うちで 田中さんと 日本語の べんきょうを します。キムさんも ( 来ませんか )。」", 1,
"""🎯 Đáp án đúng: [1] 来ませんか

💬 Dịch nghĩa câu:
「モハメド：日曜日に わたしの うちで 田中さんと 日本語の べんきょうを します。キムさんも 来ませんか。
　キム：はい、行きます。」
-> "Mohamed: Chủ nhật này tôi sẽ học tiếng Nhật cùng anh Tanaka ở nhà tôi. Bạn Kim cũng đến học cùng nhé? / Kim: Vâng, mình sẽ đến."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Mohamed đang ở phía ngôi nhà của mình và rủ bạn Kim đến nhà mình học cùng -> dùng mẫu câu mời rủ lịch sự 「～ませんか」 với động từ 「来ます」: 「キムさんも来ませんか」 (Bạn Kim cũng đến nhé?).

🔍 Phân tích các lựa chọn:
- 1. 来ませんか: (ĐÚNG) - Bạn có đến không? (Lời mời rủ lịch sự)
- 2. 来ましたか: Đã đến chưa? (Quá khứ, sai vì Chủ nhật chưa tới)
- 3. 行きませんか: Đi không? (Sai hướng vì nói về việc đến nhà người nói)
- 4. 行きましたか: Đã đi chưa?

📄 Trích PDF gốc (N5 2018 - 文法 問題1 - Câu 16):
モハメド「…キムさんも（　）。」 キム「はい、行きます。」 -> 1. 来ませんか""")

# 問題2 (Q52 - Q56 / Local 17 - 21): Sắp xếp dấu sao ★
add_q(52, "つぎの [4: しんごう] [1: を] ★[2: 右] [3: に] まがって ください。", 2,
"""🎯 Đáp án đúng: [2] 右 (Vị trí dấu ★)

💬 Câu hoàn chỉnh:
「つぎの しんごう を 【右】 に まがって ください。」
-> "Xin hãy rẽ phải ở cột đèn tín hiệu giao thông tiếp theo."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Cụm danh từ mở đầu: 「つぎの しんごう (4)」 (đèn giao thông tiếp theo).
• Đi qua/rẽ tại ngã tư hoặc đèn giao thông dùng trợ từ 「を (1)」 -> 「つぎの しんごう を」.
• Rẽ sang hướng nào dùng 「右 (2) に (3) まがってください」 (rẽ sang bên phải).
• Thứ tự đúng: [4: しんごう] -> [1: を] -> ★[2: 右] -> [3: に]. Từ ở dấu ★ là [2] 右.

📄 Trích PDF gốc (N5 2018 - 文法 問題2 - Câu 17):
つぎの 4(しんごう) 1(を) ★2(右) 3(に) まがってください。 -> 2. 右""")

add_q(53, "日曜日に 兄 [3: の] [4: 子ども] ★[1: と] [2: いっしょに] でかけました。", 1,
"""🎯 Đáp án đúng: [1] と (Vị trí dấu ★)

💬 Câu hoàn chỉnh:
「日曜日に 兄 の 子ども 【と】 いっしょに でかけました。」
-> "Vào ngày Chủ nhật, tôi đã đi ra ngoài cùng với con của anh trai."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Cụm sở hữu: 「兄 の (3) 子ども (4)」 (con của anh trai).
• Cấu trúc làm việc gì cùng với ai: 「N と (1) いっしょに (2) でかけました」 (đã đi ra ngoài cùng với N).
• Thứ tự đúng: [3: の] -> [4: 子ども] -> ★[1: と] -> [2: いっしょに]. Từ ở dấu ★ là [1] と.

📄 Trích PDF gốc (N5 2018 - 文法 問題2 - Câu 18):
日曜日に 兄 3(の) 4(子ども) ★1(と) 2(いっしょに) でかけました。 -> 1. と""")

add_q(54, "きのう 買った おかしは [4: まるくて] [1: 色] ★[2: が] [3: きれい] でした。", 2,
"""🎯 Đáp án đúng: [2] が (Vị trí dấu ★)

💬 Câu hoàn chỉnh:
「きのう 買った おかしは まるくて 色 【が】 きれい でした。」
-> "Món bánh kẹo mua hôm qua vừa tròn vừa có màu sắc rất đẹp."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Chủ đề câu là 「きのう買ったおかしは」 (Bánh kẹo mua hôm qua thì...).
• Đầu tiên nối tính từ 「まるくて (4)」 (tròn, và...), tiếp theo miêu tả bộ phận/đặc điểm phụ dùng cấu trúc 「色 (1) が (2) きれい (3) でした」 (màu sắc đẹp).
• Thứ tự đúng: [4: まるくて] -> [1: 色] -> ★[2: が] -> [3: きれい]. Từ ở dấu ★ là [2] が.

📄 Trích PDF gốc (N5 2018 - 文法 問題2 - Câu 19):
きのう買ったおかしは 4(まるくて) 1(色) ★2(が) 3(きれい) でした。 -> 2. が""")

add_q(55, "きのう、駅の [1: 近く] [3: に] ★[4: ある] [2: 本屋] で ざっしを 買いました。", 4,
"""🎯 Đáp án đúng: [4] ある (Vị trí dấu ★)

💬 Câu hoàn chỉnh:
「きのう、駅の 近く に 【ある】 本屋 で ざっしを 買いました。」
-> "Hôm qua tôi đã mua tạp chí ở hiệu sách nằm ở gần nhà ga."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Cụm vị trí: 「駅の 近く (1) に (3) ある (4)」 (nằm ở gần nhà ga).
• Mệnh đề định ngữ 「駅の近くにある」 bổ nghĩa cho danh từ 「本屋 (2)」 (hiệu sách nằm ở gần nhà ga), sau đó nối với 「で ざっしを買いました」.
• Thứ tự đúng: [1: 近く] -> [3: に] -> ★[4: ある] -> [2: 本屋]. Từ ở dấu ★ là [4] ある.

📄 Trích PDF gốc (N5 2018 - 文法 問題2 - Câu 20):
きのう、駅の 1(近く) 3(に) ★4(ある) 2(本屋) でざっしを買いました。 -> 4. ある""")

add_q(56, "先週 [4: ともだち] [2: に] ★[3: もらった] [1: 外国] の こうちゃは とても おいしかったです。", 3,
"""🎯 Đáp án đúng: [3] もらった (Vị trí dấu ★)

💬 Câu hoàn chỉnh:
「先週 ともだち に 【もらった】 外国 の こうちゃは とても おいしかったです。」
-> "Trà đen nước ngoài mà tôi nhận được từ người bạn vào tuần trước đã rất ngon."

💡 Phân tích & Giải thích chi tiết (Trang 18):
• Mệnh đề bổ nghĩa: 「先週 ともだち (4) に (2) もらった (3)」 (đã nhận được từ người bạn vào tuần trước).
• Cụm danh từ được bổ nghĩa: 「外国 (1) の こうちゃ」 (trà đen của nước ngoài).
• Thứ tự đúng: [4: ともだち] -> [2: に] -> ★[3: もらった] -> [1: 外国]. Từ ở dấu ★ là [3] もらった.

📄 Trích PDF gốc (N5 2018 - 文法 問題2 - Câu 21):
先週 4(ともだち) 2(に) ★3(もらった) 1(外国) のこうちゃはとてもおいしかったです。 -> 3. もらった""")

# 問題3 (Q57 - Q61 / Local 22 - 26): Đục lỗ đoạn văn (Bài viết của Martin và Karina)
add_q(57, "【22】 わたしは たくさん 買い物を します。( でも )、日本では まだ わたしの 国の ジュースを 売っている 店を 知りません。", 2,
"""🎯 Đáp án đúng: [2] でも

💬 Dịch nghĩa đoạn văn (Câu 22):
「わたしの アパートの 近くには、いろいろな 店が ありますから、わたしは たくさん 買い物を します。【でも】、日本では まだ わたしの 国の ジュースを 売っている 店を 知りません。」
-> "Ở gần chung cư của tôi có rất nhiều cửa hàng đa dạng nên tôi mua sắm rất nhiều. 【Tuy nhiên】, ở Nhật Bản tôi vẫn chưa biết cửa hàng nào bán nước trái cây của nước tôi."

💡 Phân tích & Giải thích chi tiết (Trang 19):
• Câu trước nói ở gần nhà có đủ loại cửa hàng và mua sắm được rất nhiều thứ; câu sau lại nói vẫn chưa biết tiệm nào bán nước ép của nước mình -> hai vế mang ý nghĩa đối lập/chuyển ý -> dùng liên từ 「でも」 (Tuy nhiên / Nhưng).

🔍 Phân tích các lựa chọn:
- 1. ですから: Vì vậy
- 2. でも: (ĐÚNG) - Tuy nhiên, nhưng
- 3. じゃ: Thế thì
- 4. そして: Và, rồi thì

📄 Trích PDF gốc (N5 2018 - 文法 問題3 - Câu 22):
【22】、日本ではまだわたしの国のジュースを売っている店を知りません。 -> 2. でも""")

add_q(58, "【23】 日本のみなさん、わたしの 国へ 来てください。好きな ジュースを ( 教えて ください )。", 3,
"""🎯 Đáp án đúng: [3] 教えて ください

💬 Dịch nghĩa đoạn văn (Câu 23):
「わたしの 国の スーパーには、いろいろな くだものの ジュースが あります。とても おいしいです。日本の みなさん、わたしの 国へ 来てください。好きな ジュースを【教えて ください】。」
-> "Ở siêu thị nước tôi có rất nhiều loại nước ép trái cây. Chúng rất ngon. Các bạn người Nhật ơi, hãy đến đất nước của tôi nhé. Hãy cho tôi biết loại nước ép mà các bạn yêu thích nhé."

💡 Phân tích & Giải thích chi tiết (Trang 19):
• Tác giả Martin mời các bạn Nhật Bản đến thăm đất nước mình, thưởng thức nhiều loại nước trái cây và hãy cho tác giả biết loại nước ép mà mọi người thích (「好きなジュースを教えてください」).

🔍 Phân tích các lựa chọn:
- 1. 教えます: Tôi sẽ chỉ cho
- 2. 教えています: Đang chỉ / dạy
- 3. 教えてください: (ĐÚNG) - Hãy cho tôi biết / Hãy chỉ cho tôi
- 4. 教えましたか: Đã chỉ chưa?

📄 Trích PDF gốc (N5 2018 - 文法 問題3 - Câu 23):
好きなジュースを【23】。 -> 3. 教えてください""")

add_q(59, "【24】 先週の 土曜日に、はじめて 大学の 近くの きっさてんに ( 入りました )。", 3,
"""🎯 Đáp án đúng: [3] 入りました

💬 Dịch nghĩa đoạn văn (Câu 24):
「先週の 土曜日に、はじめて 大学の 近くの きっさてんに【入りました】。店の 名前は『はな』です。」
-> "Thứ Bảy tuần trước, lần đầu tiên tôi đã bước vào một quán cà phê ở gần trường đại học. Tên của quán là 'Hana'."

💡 Phân tích & Giải thích chi tiết (Trang 19):
• Mở đầu câu có mốc thời gian quá khứ 「先週の土曜日に」 (Vào thứ Bảy tuần trước) nên vị ngữ phải chia ở thì quá khứ khẳng định 「入りました」 (đã vào quán).

🔍 Phân tích các lựa chọn:
- 1. 入ります: Sẽ vào (hiện tại/tương lai)
- 2. 入ってから: Sau khi vào
- 3. 入りました: (ĐÚNG) - Đã bước vào (quá khứ ứng với 先週の土曜日に)
- 4. 入ったあとで: Sau khi đã vào

📄 Trích PDF gốc (N5 2018 - 文法 問題3 - Câu 24):
先週の土曜日に、はじめて大学の近くのきっさてんに【24】。 -> 3. 入りました""")

add_q(60, "【25】 日本では コーヒーが 高いですから、あまり 飲みません。でも、『はな』( の ) コーヒーは 安かったです。", 1,
"""🎯 Đáp án đúng: [1] の

💬 Dịch nghĩa đoạn văn (Câu 25):
「日本では コーヒーが 高いですから、あまり 飲みません。でも、『はな』【の】コーヒーは 安かったです。」
-> "Ở Nhật Bản vì cà phê đắt nên tôi không uống mấy. Nhưng cà phê của quán 'Hana' thì lại rẻ."

💡 Phân tích & Giải thích chi tiết (Trang 19):
• Giữa hai danh từ 「『はな』」 (quán Hana) và 「コーヒー」 (cà phê), cần trợ từ 「の」 để nối định ngữ sở hữu/nguồn gốc: 「『はな』のコーヒー」 (cà phê của quán Hana).

🔍 Phân tích các lựa chọn:
- 1. の: (ĐÚNG) - Của (「はな」のコーヒー = cà phê của quán Hana)
- 2. と: Và
- 3. か: Hoặc
- 4. で: Ở / Bằng

📄 Trích PDF gốc (N5 2018 - 文法 問題3 - Câu 25):
でも、「はな」【25】コーヒーは安かったです。 -> 1. の""")

add_q(61, "【26】 おいしい コーヒーを 3ばい 飲みました。来週も『はな』に コーヒーを ( 飲みに 行きます )。", 4,
"""🎯 Đáp án đúng: [4] 飲みに 行きます

💬 Dịch nghĩa đoạn văn (Câu 26):
「わたしは 本を 読みながら、おいしい コーヒーを 3ばい 飲みました。来週も『はな』に コーヒーを【飲みに 行きます】。」
-> "Tôi đã vừa đọc sách vừa uống 3 tách cà phê thơm ngon. Tuần sau tôi cũng sẽ đi đến quán 'Hana' để uống cà phê."

💡 Phân tích & Giải thích chi tiết (Trang 19):
• Câu có mốc tương lai 「来週も」 (Tuần sau cũng) và địa điểm đích 「『はな』に」 + mục đích 「コーヒーを」 -> dùng cấu trúc chỉ mục đích di chuyển 「Vます(bỏ ます) ＋ に 行きます」: 「コーヒーを 飲みに 行きます」 (sẽ đi uống cà phê).

🔍 Phân tích các lựa chọn:
- 1. 飲みたいです: Muốn uống (không khớp với cấu trúc địa điểm 『はな』に ở trước)
- 2. 飲みに 行きました: Đã đi uống (sai thì vì 来週も là tuần sau)
- 3. 飲みたかったです: Đã muốn uống (quá khứ)
- 4. 飲みに 行きます: (ĐÚNG) - Sẽ đi uống (来週も「はな」にコーヒーを飲みに行きます)

📄 Trích PDF gốc (N5 2018 - 文法 問題3 - Câu 26):
来週も「はな」にコーヒーを【26】。 -> 4. 飲みに行きます""")

# 問題4 (Q62 - Q64 / Local 27 - 29): Đọc hiểu đoạn văn ngắn
add_q(62, "【問題4 - 27】 けさ「わたし」は 学校へ 行く 前に、何を 食べましたか。 -> なにも 食べませんでした。", 3,
"""🎯 Đáp án đúng: [3] なにも 食べませんでした。

📖 Nội dung bài đọc (Câu 27):
「けさ わたしは 9時ごろ 起きました。いつもは 7時ごろ 起きて、パンと くだものを 食べますが、けさは 時間が ありませんでしたから、朝ごはんを 食べませんでした。学校の 近くの 店で 牛乳を 買って、教室で 飲みました。」
-> "Sáng nay tôi thức dậy lúc khoảng 9 giờ. Mọi khi tôi dậy lúc khoảng 7 giờ và ăn bánh mì với trái cây, nhưng sáng nay vì không có thời gian nên tôi đã không ăn sáng. Tôi đã mua sữa bò ở cửa hàng gần trường rồi uống ở trong lớp học."

💡 Phân tích & Giải thích chi tiết (Trang 19):
• Câu hỏi: 「けさ『わたし』は 学校へ 行く 前に、何を 食べましたか。」 (Sáng nay trước khi đi đến trường, tác giả đã ăn gì?).
• Trong bài ghi rõ: 「けさは 時間が ありませんでしたから、朝ごはんを 食べませんでした。」 (Sáng nay vì không có thời gian nên tôi đã không ăn sáng; đến gần trường mới mua sữa vào lớp uống).
• Do đó trước khi đến trường tác giả đã **không ăn gì cả** (「なにも 食べませんでした」).

🔍 Phân tích các lựa chọn:
- 1. パンと くだものを 食べました: Đã ăn bánh mì và hoa quả (đây là thói quen いつもは, không phải sáng nay)
- 2. 牛乳を 飲みました: Đã uống sữa (sữa được uống ở trong lớp học 教室で飲みました, không phải trước khi đến trường, và sữa là đồ uống)
- 3. なにも 食べませんでした: (ĐÚNG) - Đã không ăn gì cả
- 4. なにも 食べませんでしたし、なにも 飲みませんでした: Sai ý câu hỏi

📄 Trích PDF gốc (N5 2018 - 読解 問題4 - Câu 27):
けさ「わたし」は学校へ行く前に、何を食べましたか。 -> 3. なにも食べませんでした。""")

add_q(63, "【問題4 - 28】 大学は「日本語1」の クラスの 学生に 何が 言いたいですか。 -> 今日 クラスは ありません。しゅくだいは 来週 出して ください。", 4,
"""🎯 Đáp án đúng: [4] 今日 クラスは ありません。しゅくだいは 来週 出して ください。

📖 Nội dung thông báo (Câu 28):
「6月8日
『日本語1』の クラスの みなさんへ
今日、山下先生は びょうきですから、『日本語1』の クラスは 休みです。
今日の しゅくだいは、来週の クラスで 出して ください。
さくら大学」
-> "Ngày 8 tháng 6 - Gửi các bạn lớp 'Tiếng Nhật 1': Hôm nay vì thầy Yamashita bị ốm nên lớp 'Tiếng Nhật 1' được nghỉ. Bài tập về nhà của hôm nay xin hãy nộp vào buổi học tuần sau. - Đại học Sakura."

💡 Phân tích & Giải thích chi tiết (Trang 19):
• Thông báo của trường đại học truyền đạt 2 nội dung chính:
  1. Hôm nay lớp Tiếng Nhật 1 được nghỉ (「今日 クラスは ありません」).
  2. Bài tập về nhà của hôm nay hãy nộp vào buổi học tuần sau (「しゅくだいは 来週 出して ください」).

🔍 Phân tích các lựa chọn:
- 1. 今日 クラスが あります。しゅくだいを 出して ください: Sai (hôm nay nghỉ)
- 2. 今日 クラスが あります。しゅくだいは 来週 出して ください: Sai (hôm nay nghỉ)
- 3. 今日 クラスは ありません。でも、今日 しゅくだいを 出して ください: Sai (bài tập nộp vào tuần sau)
- 4. 今日 クラスは ありません。しゅくだいは 来週 出して ください: (ĐÚNG) - Hôm nay không có lớp học. Bài tập hãy nộp vào tuần sau.

📄 Trích PDF gốc (N5 2018 - 読解 問題4 - Câu 28):
大学は「日本語1」のクラスの学生に何が言いたいですか。 -> 4. 今日クラスはありません。しゅくだいは来週出してください。""")

add_q(64, "【問題4 - 29】 この メモを 読んで、ボゴさんは はじめに 何を しますか。 -> 中西さんに お金を もらいます。", 1,
"""🎯 Đáp án đúng: [1] 中西さんに お金を もらいます。

📖 Nội dung tờ lời nhắn (Câu 29):
「ボゴさん
郵便局へ 7,000円 持って 行って、80円の 切手を 50まいと 50円の はがきを 60まい 買って ください。お金は 中西さんが 持っていますから、もらって ください。よろしく おねがいします。
北川」
-> "Bạn Bogo ơi, hãy mang 7,000 yên đến bưu điện, mua giúp tôi 50 con tem loại 80 yên và 60 tấm bưu thiếp loại 50 yên nhé. Tiền thì anh Nakanishi đang cầm đấy, nên hãy nhận tiền từ anh ấy nhé. Nhờ bạn nhé. - Kitagawa."

💡 Phân tích & Giải thích chi tiết (Trang 19):
• Câu hỏi: 「この メモを 読んで、ボゴさんは はじめに 何を しますか。」 (Đọc xong tờ ghi chú này, đầu tiên bạn Bogo sẽ làm gì?).
• Muốn mang 7,000 yên đi bưu điện mua tem và bưu thiếp, trước hết Bogo phải lấy tiền từ anh Nakanishi (「お金は 中西さんが 持っていますから、もらって ください」).
• Do đó việc đầu tiên Bogo làm là **nhận tiền từ anh Nakanishi** (「中西さんに お金を もらいます」).

🔍 Phân tích các lựa chọn:
- 1. 中西さんに お金を もらいます: (ĐÚNG) - Nhận tiền từ anh Nakanishi
- 2. 中西さんに 切手と はがきを もらいます: Sai (tem và bưu thiếp phải ra bưu điện mua)
- 3. 郵便局へ お金を 取りに 行きます: Sai (không phải đi bưu điện rút tiền)
- 4. 郵便局へ 切手と はがきを 買いに 行きます: Đây là bước thứ hai sau khi đã lấy tiền từ Nakanishi

📄 Trích PDF gốc (N5 2018 - 読解 問題4 - Câu 29):
このメモを読んで、ボゴさんははじめに何をしますか。 -> 1. 中西さんにお金をもらいます。""")

# 問題5 (Q65 - Q66 / Local 30 - 31): Đọc hiểu văn bản trung bình (Bài kiểm tra Kanji)
add_q(65, "【問題5 - 30】 けさ「わたし」は どうして 6時に 起きましたか。 -> かんじの べんきょうを したかったからです。", 3,
"""🎯 Đáp án đúng: [3] かんじの べんきょうを したかったからです。

📖 Nội dung đoạn văn (Câu 30 - 31):
「きのうの 夜、わたしは とても つかれて いましたから、早く ねました。いつもは ねる 前に、テストの べんきょうを します。でも、きのうは しませんでしたから、けさ 6時に 起きて、かんじの べんきょうを しました。かんじは むずかしいですが、おもしろいです。
学校へ 行って、友だちに『きょうは かんじの テストが ありますね。』と 言いました。友だちは『えっ？ かんじの テストは あしたですよ。』と 言いました。まちがえました。テストは 今日ではなくて、あしたでした。」

💡 Phân tích & Giải thích chi tiết (Trang 19):
• Câu hỏi 30: 「けさ『わたし』は どうして 6時に 起きましたか。」 (Tại sao sáng nay tác giả lại thức dậy lúc 6 giờ?).
• Trong đoạn 1 có viết: 「きのうは（テストのべんきょうを）しませんでしたから、けさ 6時に 起きて、かんじの べんきょうを しました。」 (Vì tối qua chưa học bài kiểm tra nên sáng nay đã dậy lúc 6 giờ để học chữ Hán).
• Vậy lý do dậy lúc 6 giờ là **vì muốn học bài chữ Hán** (「かんじの べんきょうを したかったからです」).

🔍 Phân tích các lựa chọn:
- 1. きのうの 夜、たくさん ねたかったからです: Vì tối qua muốn ngủ nhiều
- 2. きのうの 夜、早く ねたからです: Chỉ nêu sự việc tối qua ngủ sớm, chưa nêu mục đích dậy lúc 6h sáng
- 3. かんじの べんきょうを したかったからです: (ĐÚNG) - Vì muốn ôn tập chữ Hán chuẩn bị cho bài kiểm tra
- 4. 学校へ 早く 行きたかったからです: Vì muốn đến trường sớm (sai)

📄 Trích PDF gốc (N5 2018 - 読解 問題5 - Câu 30):
けさ「わたし」はどうして6時に起きましたか。 -> 3. かんじのべんきょうをしたかったからです。""")

add_q(66, "【問題5 - 31】 『まちがえました』と ありますが、何を まちがえましたか。 -> かんじの テストの 日。", 2,
"""🎯 Đáp án đúng: [2] かんじの テストの 日。

💬 Dịch nghĩa đoạn 2 (Câu 31):
「学校へ 行って、友だちに『きょうは かんじの テストが ありますね。』と 言いました。友だちは『えっ？ かんじの テストは あしたですよ。』と 言いました。まちがえました。テストは 今日ではなくて、あしたでした。」
-> "Khi đến trường, tôi nói với bạn là: 'Hôm nay có bài kiểm tra chữ Hán nhỉ.' Người bạn đáp: 'Ơ? Bài kiểm tra chữ Hán là ngày mai cơ mà.' Tôi đã nhầm mất rồi. Bài kiểm tra không phải là hôm nay mà là ngày mai."

💡 Phân tích & Giải thích chi tiết (Trang 19):
• Câu ngay sau chữ 「まちがえました」 giải thích rõ: 「テストは 今日ではなくて、あしたでした。」 (Bài kiểm tra không phải là hôm nay mà là ngày mai).
• Do đó điều tác giả đã nhầm lẫn là **ngày kiểm tra chữ Hán** (「かんじの テストの 日」).

🔍 Phân tích các lựa chọn:
- 1. かんじの テストの 時間: Giờ kiểm tra chữ Hán
- 2. かんじの テストの 日: (ĐÚNG) - Ngày kiểm tra chữ Hán (tưởng là hôm nay nhưng thực ra là ngày mai)
- 3. かんじの 書き方: Cách viết chữ Hán
- 4. かんじの 読み方: Cách đọc chữ Hán

📄 Trích PDF gốc (N5 2018 - 読解 問題5 - Câu 31):
「まちがえました」とありますが、何をまちがえましたか。 -> 2. かんじのテストの日。""")

# 問題6 (Q67 / Local 32): Đọc hiểu tìm kiếm thông tin (Bảng đường đi đến Đại học Takagi)
add_q(67, "【問題6 - 32】 パブロさんは、どの 行き方で 行きますか。 -> [4] 緑川駅 -> (バス 10分・190円) -> 山田駅 -> (電車 15分・250円) -> かわさき駅 -> (歩く 10分) -> 高木大学 (35分・440円)", 4,
"""🎯 Đáp án đúng: [4] Cách đi số 4 (Tổng thời gian 35 phút, chi phí 440 yên)

📖 Điều kiện của bạn Pablo (Câu 32):
• Điểm xuất phát: Có thể đi từ **Ga Hanada (`花田駅`)** hoặc **Ga Midorikawa (`緑川駅`)**.
• Điểm đến: **Đại học Takagi (`高木大学`)**.
• Điều kiện 1: Chi phí **trong vòng 500 yên (`500円まで`)**.
• Điều kiện 2: Thời gian đi **ngắn nhất có thể (`いちばん みじかい 時間`)**.

💡 Phân tích 4 cách đi trong bảng (Trang 19):
- **Cách 1** (Từ `花田駅`): Đi tàu đến `かわさき駅` (30 phút, 380 yên) + Đi bộ đến trường (10 phút, 0 yên)
  -> Tổng: **40 phút**, **380 yên** (Thỏa mãn ≤ 500 yên, mất 40 phút).
- **Cách 2** (Từ `花田駅`): Đi tàu đến `かわさき駅` (30 phút, 380 yên) + Đi xe buýt đến trường (5 phút, 200 yên)
  -> Tổng: **35 phút**, **580 yên** (Loại vì 580 yên > 500 yên).
- **Cách 3** (Từ `緑川駅`): Đi xe buýt thẳng đến trường `高木大学`
  -> Tổng: **45 phút**, **300 yên** (Thỏa mãn ≤ 500 yên, nhưng mất 45 phút).
- **Cách 4** (Từ `緑川駅`): Đi xe buýt đến `山田駅` (10 phút, 190 yên) + Đi tàu đến `かわさき駅` (15 phút, 250 yên) + Đi bộ đến trường (10 phút, 0 yên)
  -> Tổng: `10 + 15 + 10 =` **35 phút**, `190 + 250 =` **440 yên** (Thỏa mãn ≤ 500 yên và thời gian ngắn nhất 35 phút!).

👉 Do đó, Pablo sẽ chọn **Cách đi số [4]**.

📄 Trích PDF gốc (N5 2018 - 読解 問題6 - Câu 32):
パブロさんは、どの行き方で行きますか。 -> 4""")

# ==============================================================================
# SECTION 3: 聴解 (Q68 - Q91: 24 questions)
# ==============================================================================
# 問題1 (Q68 - Q74 / Local 1 - 7)
add_q(68, "【聴解 問題1 - 1番】 喫茶店ミドリは どこですか。", 3,
"""🎯 Đáp án đúng: [3] Quán nước Midori nằm ở bên trái đường, ngay bên cạnh Ngân hàng (sau khi qua ngã tư rẽ trái)

💡 Phân tích & Giải thích chi tiết (Trang 20):
• Người phụ nữ hỏi đường đến quán cà phê Midori (`喫茶店ミドリ`).
• Người đàn ông chỉ đường: Đi qua ngã tư trước mặt rồi rẽ trái (`この交差点を渡って、左へ曲がってください`). Đi trên con đường đó sẽ thấy ngân hàng ở phía bên trái (`道の左に銀行があります`). Quán cà phê Midori nằm ngay bên cạnh ngân hàng đó (`喫茶店ミドリは銀行の隣です`).
• Đối chiếu bản đồ: Qua ngã tư rẽ trái, vị trí bên cạnh ngân hàng ở phía bên trái đường là **[3]**.

📄 Trích PDF gốc (N5 2018 - 聴解 問題1 - 1番):
喫茶店ミドリはどこですか。 -> 3""",
audio_ja="""女：すみません、喫茶店ミドリはどこですか。
男：喫茶店ミドリですか。あ、あそこに交差点がありますね。この交差点を渡って、左へ曲がってください。
女：交差点を渡って、左ですね。
男：はい。その道を行くと、道の左に銀行があります。喫茶店ミドリは銀行の隣です。
女：わかりました。ありがとうございます。

質問：喫茶店ミドリはどこですか。""",
audio_vi="""Nữ: Xin lỗi, quán giải khát Midori ở đâu vậy ạ?
Nam: Quán giải khát Midori à? À, ở đằng kia có ngã tư nhỉ. Bạn hãy băng qua ngã tư này rồi rẽ sang bên trái nhé.
Nữ: Qua ngã tư rồi rẽ trái đúng không ạ?
Nam: Đúng rồi. Đi theo con đường đó thì ở bên trái đường có một ngân hàng. Quán giải khát Midori nằm ở ngay bên cạnh ngân hàng đó.
Nữ: Tôi hiểu rồi. Xin cảm ơn anh.

Câu hỏi: Quán giải khát Midori nằm ở đâu?""")

add_q(69, "【聴解 問題1 - 2番】 木村さんは どの 雑誌を 取りますか。", 1,
"""🎯 Đáp án đúng: [1] Tạp chí Đồng hồ số tháng 7 (時計の雑誌・7月)

💡 Phân tích & Giải thích chi tiết (Trang 20):
• Người đàn ông nhờ cô Kimura lấy giúp cuốn tạp chí ở kệ phía sau lưng: 「時計の雑誌です」 (Là tạp chí đồng hồ - loại bỏ tạp chí xe hơi).
• Cô Kimura hỏi lấy số tháng 8 mới nhất phải không (`一番新しい8月のですか`), người đàn ông đáp: 「いいえ、7月のをお願いします」 (Không, làm ơn lấy cho tôi cuốn tháng 7).
• Vậy cuốn tạp chí cần lấy là **Tạp chí Đồng hồ tháng 7 [1]**.

📄 Trích PDF gốc (N5 2018 - 聴解 問題1 - 2番):
木村さんはどの雑誌を取りますか。 -> 1""",
audio_ja="""男：木村さん、すみません。木村さんの後ろにある雑誌を取ってください。
女：はい、車の雑誌ですか。
男：いいえ、時計の雑誌です。
女：ああ、これですね。一番新しい8月のですか。
男：いいえ、7月のをお願いします。
女：はい。

質問：木村さんはどの雑誌を取りますか。""",
audio_vi="""Nam: Cô Kimura ơi, xin lỗi, nhờ cô lấy giúp tôi cuốn tạp chí ở phía sau lưng cô với.
Nữ: Vâng, là tạp chí ô tô phải không ạ?
Nam: Không, là tạp chí đồng hồ cơ.
Nữ: À, là chỗ này nhỉ. Có phải cuốn tháng 8 mới nhất không ạ?
Nam: Không, làm ơn lấy giúp tôi cuốn tháng 7 nhé.
Nữ: Vâng ạ.

Câu hỏi: Cô Kimura sẽ lấy cuốn tạp chí nào?""")

add_q(70, "【聴解 問題1 - 3番】 男の学生は 来月 何日に 学校へ 来ますか。", 4,
"""🎯 Đáp án đúng: [4] Ngày mùng 10 (十日 - とおか)

💡 Phân tích & Giải thích chi tiết (Trang 20):
• Nam sinh viên xin phép nghỉ học từ ngày mùng 4 đến ngày mùng 9 tháng sau (`来月の四日から九日まで6日学校を休みます`).
• Cô giáo nhắc: 「十日はテストがありますよ」 (Ngày mùng 10 có bài kiểm tra đấy nhé).
• Nam sinh viên trả lời: 「はい、十日は来ます」 (Vâng, ngày mùng 10 em sẽ đến trường).
• Do đó ngày nam sinh viên đi học trở lại là **ngày mùng 10 (`十日`) [4]**.

📄 Trích PDF gốc (N5 2018 - 聴解 問題1 - 3番):
男の学生は来月何日に学校へ来ますか。 -> 4. 十日（とおか）""",
audio_ja="""男：先生、あのう、わたしは来月の四日から九日まで6日、学校を休みます。
女：そうですか。どうしたんですか。
男：姉の結婚式がありますから、国へ帰ります。
女：ああ、そうですか。十日はテストがありますよ。
男：はい、十日は来ます。
女：わかりました。

質問：男の学生は来月何日に学校へ来ますか。""",
audio_vi="""Nam: Thưa cô, dạ em xin phép nghỉ học 6 ngày từ ngày mùng 4 đến ngày mùng 9 tháng sau ạ.
Nữ: Thế à. Có chuyện gì vậy em?
Nam: Vì có lễ cưới của chị gái nên em về nước ạ.
Nữ: À, ra là vậy. Ngày mùng 10 có bài kiểm tra đấy nhé.
Nam: Vâng, ngày mùng 10 em sẽ đến trường ạ.
Nữ: Cô hiểu rồi.

Câu hỏi: Nam sinh viên sẽ đến trường vào ngày mấy tháng sau?""")

add_q(71, "【聴解 問題1 - 4番】 男の人は 冷蔵庫から 何を 出しますか。", 2,
"""🎯 Đáp án đúng: [2] 3 quả trứng, sữa bò và cá (たまご3個、牛乳、魚)

💡 Phân tích & Giải thích chi tiết (Trang 20):
• Lúc đầu người phụ nữ nhờ lấy từ tủ lạnh: **2 quả trứng** và **sữa bò** (`たまごを2個と牛乳を出してください`).
• Sau đó người phụ nữ nói thêm: lấy giúp cả **cá** mua hôm qua (`昨日買った魚もお願いします`), và đổi trứng từ 2 quả thành **3 quả** (`たまごは3個お願いします`).
• Tổng hợp lại các thứ lấy ra khỏi tủ lạnh: **3 quả trứng + sữa bò + cá** -> Hình **[2]**.

📄 Trích PDF gốc (N5 2018 - 聴解 問題1 - 4番):
男の人は冷蔵庫から何を出しますか。 -> 2""",
audio_ja="""女：ジョンさん、ちょっと冷蔵庫からたまごを2個と牛乳を出してください。今から晩ご飯を作ります。
男：うん、たまご2個と牛乳ね。
女：あ、それから、昨日買った魚もお願いします。
男：魚？ これ？
女：ええ、それ。あ、ごめんなさい。たまごは3個お願いします。
男：はい、わかった。

質問：男の人は冷蔵庫から何を出しますか。""",
audio_vi="""Nữ: John ơi, lấy giúp mình 2 quả trứng và sữa bò từ trong tủ lạnh ra với. Bây giờ mình sẽ nấu bữa tối.
Nam: Ừ, 2 quả trứng và sữa bò nhỉ.
Nữ: À, thêm nữa, lấy giúp mình cả con cá mua hôm qua nữa nhé.
Nam: Cá á? Cái này hả?
Nữ: Ừ, nó đấy. À, xin lỗi nhé. Trứng thì lấy giúp mình 3 quả nhé.
Nam: Ừ, mình hiểu rồi.

Câu hỏi: Người đàn ông sẽ lấy những gì từ trong tủ lạnh ra?""")

add_q(72, "【聴解 問題1 - 5番】 男の人は 何曜日の クラスに 入りますか。", 1,
"""🎯 Đáp án đúng: [1] Lớp học ngày thứ Hai (月曜日)

💡 Phân tích & Giải thích chi tiết (Trang 20):
• Các lớp buổi tối gồm: Thứ Hai, Thứ Ba, Thứ Năm, Thứ Sáu (`月曜日、火曜日、木曜日、金曜日`).
• Thứ Ba và Thứ Sáu (`火曜日と金曜日`) người đàn ông bận làm việc đến 6 giờ nên không kịp.
• Giữa Thứ Hai (`月曜日`) và Thứ Năm (`木曜日`): Lớp thứ Hai luyện nói nhiều, lớp thứ Năm chủ yếu đọc viết mà thời gian nói ít (`木曜日は話す時間が短いですね`).
• Người đàn ông muốn luyện nói nên chọn **lớp ngày thứ Hai (`じゃ、月曜日のクラスにします`) [1]**.

📄 Trích PDF gốc (N5 2018 - 聴解 問題1 - 5番):
男の人は何曜日のクラスに入りますか。 -> 1. 月曜日""",
audio_ja="""男：すみません。来月から日本語のクラスに入りたいんですが。
女：はい。夜のクラスは月曜日、火曜日、木曜日、金曜日の4つです。すべて5時半からです。
男：火曜日と金曜日は6時まで仕事があります。月曜日と木曜日はどんなクラスですか。
女：月曜日はたくさん話すクラスです。木曜日はたくさん読んだり書いたりします。少し話しますが。
男：そうですか。木曜日は話す時間が短いですね。じゃ、月曜日のクラスにします。

質問：男の人は何曜日のクラスに入りますか。""",
audio_vi="""Nam: Xin lỗi, tôi muốn đăng ký vào lớp tiếng Nhật từ tháng sau ạ.
Nữ: Vâng. Lớp buổi tối có 4 lớp vào thứ Hai, thứ Ba, thứ Năm và thứ Sáu. Tất cả đều bắt đầu từ 5 giờ rưỡi.
Nam: Thứ Ba và thứ Sáu tôi phải làm việc đến 6 giờ. Thế lớp thứ Hai và thứ Năm là lớp như thế nào ạ?
Nữ: Thứ Hai là lớp luyện nói rất nhiều. Còn thứ Năm thì đọc và viết nhiều, cũng có nói một chút.
Nam: Ra vậy. Thứ Năm thì thời gian luyện nói ngắn nhỉ. Vậy tôi xin chọn lớp ngày thứ Hai.

Câu hỏi: Người đàn ông sẽ vào học lớp ngày thứ mấy?""")

add_q(73, "【聴解 問題1 - 6番】 学生は 明日の 午前、どこの 教室で 勉強しますか。", 4,
"""🎯 Đáp án đúng: [4] Tầng 2 - Phòng học số 4 (2階の4番の教室)

💡 Phân tích & Giải thích chi tiết (Trang 21):
• Câu hỏi hỏi về **buổi sáng ngày mai (`明日の午前`)**.
• Hôm nay học ở tầng 1 phòng số 1 (`1階の1番の教室`).
• Ngày mai (`明日`):
  - **Buổi sáng (`午前`)**: học ở **tầng 2, phòng số 4 (`2階の4番の教室`)**.
  - Buổi chiều (`午後`): mới học ở tầng 1, phòng số 3 (`1階の3番の教室`).
• Vì câu hỏi hỏi **buổi sáng ngày mai (`明日の午前`)**, đáp án chính xác là **Tầng 2 phòng số 4 [4]**.

📄 Trích PDF gốc (N5 2018 - 聴解 問題1 - 6番):
学生は明日の午前、どこの教室で勉強しますか。 -> 4. 2階の4番""",
audio_ja="""女：皆さん、明日の授業は、この1階の1番の教室ではありません。午前は、2階の4番の教室で勉強します。午後、映画を見ますね。映画は、1階の3番の教室で見ます。時間を間違えないでくださいね。

質問：学生は明日の午前、どこの教室で勉強しますか。""",
audio_vi="""Nữ: Các em chú ý, tiết học ngày mai sẽ không học ở phòng số 1 tầng 1 này. Buổi sáng, các em sẽ học ở phòng số 4 tầng 2. Buổi chiều chúng ta sẽ xem phim nhỉ. Phim sẽ xem ở phòng số 3 tầng 1. Các em đừng nhầm thời gian nhé.

Câu hỏi: Sáng ngày mai các học sinh sẽ học ở phòng học nào?""")

add_q(74, "【聴解 問題1 - 7番】 女の人は パーティーに 何を 持って 行きますか。", 3,
"""🎯 Đáp án đúng: [3] Cơm nắm và Máy ảnh (おにぎりとカメラ)

💡 Phân tích & Giải thích chi tiết (Trang 21):
• Về đồ ăn: Bạn nam mang nước trái cây, còn bạn nữ sẽ mang **cơm nắm (`おにぎり`)** (`わたしはおにぎりを持っていくね`).
• Về đồ vật: Bạn nam định mượn các đĩa CD của bạn nữ nhưng bạn nữ đã cho người khác mượn hết rồi; thay vào đó bạn nam hỏi mượn **máy ảnh (`カメラ`)** và bạn nữ đồng ý mang theo (`うん、いいよ`).
• Vậy bạn nữ mang theo **Cơm nắm (`おにぎり`) và Máy ảnh (`カメラ`)** -> Đáp án **[3]**.

📄 Trích PDF gốc (N5 2018 - 聴解 問題1 - 7番):
女の人はパーティーに何を持って行きますか。 -> 3. おにぎりとカメラ""",
audio_ja="""男：明日のパーティー、飲み物は何がいいかな。僕はジュースを持っていくよ。
女：じゃあ、食べ物は、わたしはおにぎりを持っていくね。
男：ありがとう。あのさ、ちょっと頼みたいことがあるんだけど。
女：何？
男：音楽のCDを借りたいんだ。いい？
女：ごめん。今、友達に全部貸しているの。
男：そっか。じゃあ、カメラは？ 貸してくれる？
女：うん、いいよ。

質問：女の人はパーティーに何を持って行きますか。""",
audio_vi="""Nam: Bữa tiệc ngày mai mang đồ uống gì thì được nhỉ. Mình sẽ mang nước trái cây đi nhé.
Nữ: Vậy về đồ ăn thì mình sẽ mang cơm nắm (onigiri) đi nhé.
Nam: Cảm ơn cậu. À này, mình có chuyện muốn nhờ cậu một chút.
Nữ: Chuyện gì thế?
Nam: Mình muốn mượn đĩa CD nhạc của cậu. Có được không?
Nữ: Xin lỗi nhé. Hiện tại mình đang cho bạn mượn hết cả rồi.
Nam: Thế à. Vậy còn máy ảnh thì sao? Cậu cho mình mượn nhé?
Nữ: Ừ, được chứ.

Câu hỏi: Người phụ nữ sẽ mang những gì đến bữa tiệc?""")

# 問題2 (Q75 - Q80 / Local 1 - 6)
add_q(75, "【聴解 問題2 - 1番】 果物の ジュースは、何と 何と 何の ジュースですか。", 4,
"""🎯 Đáp án đúng: [4] Táo, Quýt và Chuối (リンゴとミカンとバナナ)

💡 Phân tích & Giải thích chi tiết (Trang 21):
• Hai người nói về món nước ép làm từ 3 loại trái cây (`3つの果物のジュース`).
• Người phụ nữ đoán: Táo và quýt (`リンゴとミカンですね`), nhưng đoán loại thứ 3 là dứa (`パイナップル`) thì sai.
• Người đàn ông cho biết loại thứ 3 là chuối: 「リンゴと、それからミカンとバナナですよ」 (Là táo, quýt và chuối).

📄 Trích PDF gốc (N5 2018 - 聴解 問題2 - 1番):
果物のジュースは、何と何と何のジュースですか。 -> 4. リンゴとミカンとバナナ""",
audio_ja="""男：これ、どうぞ。3つの果物のジュースです。
女：わあ、おいしそうですね。いただきます。うーん、リンゴとミカンですね。あともう一つは何ですか。パイナップルですか。
男：いいえ、パイナップルじゃありませんよ。
女：え、じゃあ、何ですか。
男：リンゴと、それからミカンとバナナですよ。
女：ああ、バナナですか。おいしいですね。

質問：果物のジュースは、何と何と何のジュースですか。""",
audio_vi="""Nam: Xin mời cô uống thử cái này. Đây là nước ép từ 3 loại trái cây đấy.
Nữ: Chà, trông ngon quá nhỉ. Tôi xin phép thưởng thức ạ. Ưm, là táo và quýt nhỉ. Thế còn một loại nữa là gì vậy? Là dứa phải không?
Nam: Không, không phải là dứa đâu.
Nữ: Ủa, thế là quả gì vậy ạ?
Nam: Là táo, cộng với quýt và chuối đấy.
Nữ: À, là chuối sao. Ngon thật đấy!

Câu hỏi: Nước ép trái cây được làm từ 3 loại quả nào?""")

add_q(76, "【聴解 問題2 - 2番】 男の学生は、お兄さんが 何人 いますか。", 1,
"""🎯 Đáp án đúng: [1] 1 người (1人)

💡 Phân tích & Giải thích chi tiết (Trang 21):
• Xem bức ảnh gia đình có 6 người, bạn nữ tưởng nhà bạn nam có 6 người.
• Bạn nam giải thích: Gia đình mình có 4 người gồm **bố mẹ, 1 người anh trai và mình** (`家族は4人です。両親と兄が一人とぼくです`).
• Còn 2 người nữa trong ảnh là những đứa con của anh trai (`兄の子供が2人います`).
• Câu hỏi hỏi: Bạn nam có **mấy người anh trai (`お兄さんが何人いますか`)** -> **1 người anh trai [1]**.

📄 Trích PDF gốc (N5 2018 - 聴解 問題2 - 2番):
男の学生は、お兄さんが何人いますか。 -> 1. 1人""",
audio_ja="""女：わあ、いい写真ですね。これはご家族の写真ですか。1、2、3… 6人ですか。
男：あ、家族は4人です。両親と兄が一人とぼくです。
女：え？ じゃあ、あとの2人は？
男：兄の子供が2人います。とてもかわいいですよ。

質問：男の学生は、お兄さんが何人いますか。""",
audio_vi="""Nữ: Chà, bức ảnh đẹp quá nhỉ. Đây là ảnh gia đình bạn à? 1, 2, 3... có 6 người phải không?
Nam: À, gia đình mình có 4 người thôi. Gồm bố mẹ, 1 người anh trai và mình.
Nữ: Ủa? Thế còn 2 người nữa là ai?
Nam: Là 2 đứa con của anh trai mình đấy. Tụi nhỏ dễ thương lắm.

Câu hỏi: Nam sinh viên có mấy người anh trai?""")

add_q(77, "【聴解 問題2 - 3番】 加藤さんは、何で 会社に 来ていますか。", 3,
"""🎯 Đáp án đúng: [3] Xe đạp (自転車)

💡 Phân tích & Giải thích chi tiết (Trang 22):
• Anh Kato (`加藤さん` - nhân vật nam) hỏi cô Yamada đi làm bằng gì (cô Yamada đi bộ và đi tàu điện).
• Khi cô Yamada hỏi lại anh Kato, anh Kato nói: 「僕は自転車です。前は車でしたが、お金がかかりますから」 (Tôi đi bằng **xe đạp**. Trước đây tôi đi bằng ô tô nhưng vì tốn tiền nên đã đổi sang xe đạp).

📄 Trích PDF gốc (N5 2018 - 聴解 問題2 - 3番):
加藤さんは、何で会社に来ていますか。 -> 3. 自転車""",
audio_ja="""男：山田さんは毎日、何で会社に来ていますか。バスですか。
女：いいえ。家から駅まで歩いて、それから電車で来ています。加藤さんは？
男：僕は自転車です。前は車でしたが、お金がかかりますから。
女：そうですか。自転車はいいですね。

質問：加藤さんは、何で会社に来ていますか。""",
audio_vi="""Nam: Cô Yamada hàng ngày đi làm bằng phương tiện gì vậy? Bằng xe buýt à?
Nữ: Không ạ. Tôi đi bộ từ nhà ra ga, sau đó đi bằng tàu điện đến công ty. Còn anh Kato thì sao?
Nam: Tôi đi bằng xe đạp. Trước đây tôi đi bằng ô tô nhưng vì tốn kém tiền bạc nên thôi.
Nữ: Thế à. Đi xe đạp tốt thật đấy nhỉ.

Câu hỏi: Anh Kato đi đến công ty bằng phương tiện gì?""")

add_q(78, "【聴解 問題2 - 4番】 2人は 今日、一緒に 何を しますか。", 1,
"""🎯 Đáp án đúng: [1] Xem phim (映画を見ます)

💡 Phân tích & Giải thích chi tiết (Trang 22):
• Bạn nữ có DVD bộ phim rất hay nên rủ bạn nam chiều nay đến nhà xem phim: 「今日の午後、わたしの家で映画を見ませんか」 (Chiều nay đến nhà mình xem phim nhé?).
• Bạn nam đồng ý: 「いいですね。行きます。じゃあ、ぼくはお菓子を買っていきますね」 (Hay quá, mình sẽ đến. Vậy mình sẽ mua bánh kẹo mang tới nhé).
• Như vậy hôm nay hai người sẽ cùng nhau **xem phim [1]**.

📄 Trích PDF gốc (N5 2018 - 聴解 問題2 - 4番):
2人は今日、一緒に何をしますか。 -> 1. 映画を見ます""",
audio_ja="""女：ヤンさん、この映画のDVD、とても面白いですよ。今日の午後、わたしの家で映画を見ませんか。
男：いいですね。行きます。じゃあ、ぼくはお菓子を買っていきますね。家の近くにいいお店があるんです。
女：ありがとうございます。じゃあ、飲み物はわたしが買いますね。
男：はい、楽しみですね。

質問：2人は今日、一緒に何をしますか。""",
audio_vi="""Nữ: Bạn Yan ơi, đĩa DVD bộ phim này hay lắm đấy. Chiều hôm nay bạn đến nhà mình xem phim cùng không?
Nam: Tuyệt quá. Mình sẽ đến. Vậy để mình mua bánh kẹo mang qua nhé. Ở gần nhà mình có một tiệm bánh ngon lắm.
Nữ: Cảm ơn bạn nhé. Vậy đồ uống để mình mua cho.
Nam: Ừ, háo hức thật đấy!

Câu hỏi: Hôm nay hai người sẽ cùng nhau làm gì?""")

add_q(79, "【聴解 問題2 - 5番】 日本から 男の学生の 国まで、飛行機で 何時間 かかりますか。", 2,
"""🎯 Đáp án đúng: [2] 3 tiếng rưỡi (3時間半)

💡 Phân tích & Giải thích chi tiết (Trang 22):
• Cô giáo hỏi nam sinh viên: Từ Nhật về nước của em bằng máy bay mất bao nhiêu tiếng (`日本から飛行機で何時間ぐらいかかりますか`).
• Nam sinh viên trả lời trực tiếp: **「3時間半です」 (Mất 3 tiếng rưỡi)**. (Còn 2 tiếng sau đó là đi tàu điện từ sân bay về đến nhà).
• Do câu hỏi hỏi thời gian đi bằng **máy bay từ Nhật về nước của nam sinh viên**, đáp án là **3 tiếng rưỡi (`3時間半`) [2]**.

📄 Trích PDF gốc (N5 2018 - 聴解 問題2 - 5番):
日本から男の学生の国まで、飛行機で何時間かかりますか。 -> 2. 3時間半""",
audio_ja="""女：もうすぐ夏休みですね。国へ帰りますか。
男：はい、来週の水曜日に帰ります。
女：そうですか。日本から飛行機で何時間ぐらいかかりますか。
男：3時間半です。
女：ああ、近いですね。
男：ええ。でも、空港から家まで電車で2時間かかります。
女：そうですか。

質問：日本から男の学生の国まで、飛行機で何時間かかりますか。""",
audio_vi="""Nữ: Sắp đến kỳ nghỉ hè rồi nhỉ. Em có về nước không?
Nam: Dạ có, thứ Tư tuần sau em sẽ về ạ.
Nữ: Thế à. Đi máy bay từ Nhật Bản về nước em mất khoảng bao nhiêu tiếng?
Nam: Dạ mất 3 tiếng rưỡi ạ.
Nữ: À, gần quá nhỉ.
Nam: Dạ vâng. Nhưng từ sân bay về đến nhà em phải đi tàu điện mất thêm 2 tiếng nữa ạ.
Nữ: Ra là vậy.

Câu hỏi: Từ Nhật Bản đến đất nước của nam sinh viên đi bằng máy bay mất bao nhiêu tiếng?""")

add_q(80, "【聴解 問題2 - 6番】 2人は 今晩、どこの 店に 行きますか。", 2,
"""🎯 Đáp án đúng: [2] Tiệm Pizza (ピザ屋)

💡 Phân tích & Giải thích chi tiết (Trang 22):
• Lúc đầu bạn nam rủ đi ăn ở tiệm cà ri (`カレー屋`), nhưng bạn nữ cho biết hôm nay là thứ Tư nên tiệm cà ri đóng cửa nghỉ (`水曜日だから、あのカレー屋は休みですよ`).
• Bạn nữ gợi ý đi **tiệm Pizza (`ピザ屋`)** ở tầng 3 tòa nhà có tiệm mì Soba ở tầng 1, và bạn nam đồng ý (`いいですね、そこに行きましょう`).
• Vậy tối nay hai người sẽ đi đến **tiệm Pizza (`ピザ屋`) [2]**.

📄 Trích PDF gốc (N5 2018 - 聴解 問題2 - 6番):
2人は今晩、どこの店に行きますか。 -> 2. ピザ屋""",
audio_ja="""男：今日の晩ご飯、駅の近くのカレー屋に行きませんか。
女：あ、今日は水曜日だから、あのカレー屋は休みですよ。
男：えっ、そうですか。じゃあ、どこに行きましょうか。
女：カレー屋の隣に新しいビルがありますよね。そのビルの3階にピザ屋があります。そこはどうですか。1階にお蕎麦屋があるビルです。
男：ああ、わかります。いいですね、そこに行きましょう。

質問：2人は今晩、どこの店に行きますか。""",
audio_vi="""Nam: Bữa tối hôm nay chúng mình đến tiệm cà ri ở gần nhà ga ăn nhé?
Nữ: À, hôm nay là thứ Tư nên tiệm cà ri đó nghỉ bán rồi.
Nam: Ủa, thế à. Vậy chúng mình đi đâu bây giờ nhỉ?
Nữ: Ở bên cạnh tiệm cà ri có một tòa nhà mới đúng không? Trên tầng 3 của tòa nhà đó có một tiệm Pizza đấy. Tiệm đó thì sao? Tòa nhà mà ở tầng 1 có tiệm mì Soba ấy.
Nam: À, mình biết chỗ đó rồi. Tuyệt đấy, chúng mình đến đó đi!

Câu hỏi: Tối nay hai người sẽ đi đến cửa tiệm nào?""")

# 問題3 (Q81 - Q85 / Local 1 - 5): Phản xạ tình huống (発話表現)
add_q(81, "【聴解 問題3 - 1番】 友達と 山を 歩いています。疲れましたから、休みたいです。友達に 何と 言いますか。", 3,
"""🎯 Đáp án đúng: [3] すこし 休みましょう。

💡 Phân tích & Giải thích chi tiết (Trang 23):
• Tình huống: Đang đi bộ leo núi cùng với bạn, vì đã thấm mệt nên muốn nghỉ ngơi một chút.
• Câu rủ bạn cùng nghỉ giải lao tự nhiên nhất là: **「3. すこし 休みましょう。」** (Chúng mình nghỉ ngơi một chút nhé!).

🔍 Phân tích các lựa chọn:
- 1. とても 元気ですね: Cậu khỏe thật đấy nhỉ
- 2. 山は いいですね: Ngọn núi tuyệt nhỉ
- 3. すこし 休みましょう: (ĐÚNG) - Chúng mình hãy nghỉ ngơi một chút nhé!

📄 Trích PDF gốc (N5 2018 - 聴解 問題3 - 1番):
友達と山を歩いています。疲れましたから、休みたいです。 -> 3. すこし休みましょう。""",
audio_ja="""友達と山を歩いています。疲れましたから、休みたいです。友達に何と言いますか。
1. とても元気ですね。
2. 山はいいですね。
3. すこし休みましょう。""",
audio_vi="""Bạn đang đi bộ trên núi cùng với người bạn. Vì đã mệt nên muốn nghỉ ngơi. Bạn sẽ nói gì với người bạn?
1. Cậu khỏe thật đấy nhỉ.
2. Ngọn núi đẹp quá nhỉ.
3. Chúng mình nghỉ ngơi một chút nhé.""")

add_q(82, "【聴解 問題3 - 2番】 友達に チョコレートを あげます。何と 言いますか。", 3,
"""🎯 Đáp án đúng: [3] チョコレート、いかがですか。

💡 Phân tích & Giải thích chi tiết (Trang 23):
• Tình huống: Người có mũi tên đang cầm hộp sô-cô-la mời bạn mình ăn.
• Khi mời người khác dùng đồ ăn/thức uống, ta nói: **「3. チョコレート、いかがですか。」** (Bạn dùng thử sô-cô-la nhé? / Sô-cô-la nhé?).

🔍 Phân tích các lựa chọn:
- 1. チョコレート、ありますか: Bạn có sô-cô-la không?
- 2. チョコレート、買いましたか: Bạn đã mua sô-cô-la chưa?
- 3. チョコレート、いかがですか: (ĐÚNG) - Mời bạn dùng sô-cô-la nhé?

📄 Trích PDF gốc (N5 2018 - 聴解 問題3 - 2番):
友達にチョコレートをあげます。何と言いますか。 -> 3. チョコレート、いかがですか。""",
audio_ja="""友達にチョコレートをあげます。何と言いますか。
1. チョコレート、ありますか。
2. チョコレート、買いましたか。
3. チョコレート、いかがですか。""",
audio_vi="""Bạn tặng/mời bạn mình ăn sô-cô-la. Bạn sẽ nói gì?
1. Bạn có sô-cô-la không?
2. Bạn đã mua sô-cô-la chưa?
3. Bạn dùng thử sô-cô-la nhé?""")

add_q(83, "【聴解 問題3 - 3番】 みんなと 一緒に エレベーターに 乗りたいです。何と 言いますか。", 2,
"""🎯 Đáp án đúng: [2] さあ、乗りましょう。

💡 Phân tích & Giải thích chi tiết (Trang 23):
• Tình huống: Cửa thang máy vừa mở, người đàn ông muốn rủ mọi người đi cùng mình bước vào thang máy.
• Câu nói phù hợp là: **「2. さあ、乗りましょう。」** (Nào, chúng ta cùng lên thang máy thôi!).

🔍 Phân tích các lựa chọn:
- 1. ちょっと 待ってください: Xin đợi một chút (dùng khi đang chạy tới từ xa, còn trong tranh mọi người đang đứng ngay cửa thang máy)
- 2. さあ、乗りましょう: (ĐÚNG) - Nào, chúng ta cùng vào thang máy thôi!
- 3. まだ 乗らないでください: Xin đừng bước vào vội

📄 Trích PDF gốc (N5 2018 - 聴解 問題3 - 3番):
みんなと一緒にエレベーターに乗りたいです。 -> 2. さあ、乗りましょう。""",
audio_ja="""みんなと一緒にエレベーターに乗りたいです。何と言いますか。
1. ちょっと待ってください。
2. さあ、乗りましょう。
3. まだ乗らないでください。""",
audio_vi="""Bạn muốn cùng mọi người bước vào thang máy. Bạn sẽ nói gì?
1. Xin hãy đợi một chút.
2. Nào, chúng ta cùng lên thang máy thôi!
3. Xin đừng bước lên vội.""")

add_q(84, "【聴解 問題3 - 4番】 まえから 自転車が 来ますが、友達は 見て いません。友達に 何と 言いますか。", 2,
"""🎯 Đáp án đúng: [2] 危ないですよ。

💡 Phân tích & Giải thích chi tiết (Trang 23):
• Tình huống: Phía trước có chiếc xe đạp đang lao tới nhưng người bạn đi cùng đang quay mặt đi chỗ khác không nhìn thấy.
• Để cảnh báo nguy hiểm cho bạn ngay lập tức, ta nói: **「2. 危ないですよ。」** (Nguy hiểm kìa!).

🔍 Phân tích các lựa chọn:
- 1. 自転車に 乗っていますよ: Đang đi xe đạp đấy
- 2. 危ないですよ: (ĐÚNG) - Nguy hiểm đấy / Coi chừng kìa!
- 3. 見ては いけませんよ: Không được nhìn đâu đấy

📄 Trích PDF gốc (N5 2018 - 聴解 問題3 - 4番):
まえから自転車が来ますが、友達は見ていません。 -> 2. 危ないですよ。""",
audio_ja="""まえから自転車が来ますが、友達は見ていません。友達に何と言いますか。
1. 自転車に乗っていますよ。
2. 危ないですよ。
3. 見てはいけませんよ。""",
audio_vi="""Từ phía trước có chiếc xe đạp đang đi tới nhưng người bạn không nhìn thấy. Bạn sẽ nói gì với bạn mình?
1. Đang đi xe đạp kìa.
2. Nguy hiểm kìa!
3. Không được nhìn đâu nhé.""")

add_q(85, "【聴解 問題3 - 5番】 レストランで コーヒーが まだ 来ません。店の 人に 何と 言いますか。", 2,
"""🎯 Đáp án đúng: [2] コーヒーは まだですか。

💡 Phân tích & Giải thích chi tiết (Trang 23):
• Tình huống: Ở trong nhà hàng, đã gọi món và đợi khá lâu mà cà phê vẫn chưa được mang ra.
• Khi hỏi nhân viên xem món mình gọi đã có chưa, ta nói: **「2. コーヒーは まだですか。」** (Cà phê của tôi vẫn chưa có ạ?).

🔍 Phân tích các lựa chọn:
- 1. コーヒーは ありませんか: Quán không có cà phê ạ?
- 2. コーヒーは まだですか: (ĐÚNG) - Cà phê của tôi vẫn chưa có ạ?
- 3. コーヒーを もう 一杯 ください: Cho tôi thêm một tách cà phê nữa

📄 Trích PDF gốc (N5 2018 - 聴解 問題3 - 5番):
レストランでコーヒーがまだ来ません。店の人に何と言いますか。 -> 2. コーヒーはまだですか。""",
audio_ja="""レストランでコーヒーがまだ来ません。店の人に何と言いますか。
1. コーヒーはありませんか。
2. コーヒーはまだですか。
3. コーヒーをもう一杯ください。""",
audio_vi="""Ở nhà hàng, cà phê đã gọi vẫn chưa được mang ra. Bạn sẽ nói gì với nhân viên cửa hàng?
1. Quán không có cà phê ạ?
2. Cà phê của tôi vẫn chưa có ạ?
3. Cho tôi thêm một tách cà phê nữa.""")

# 問題4 (Q86 - Q91 / Local 1 - 6): Phản xạ hội thoại ngắn (即時応答)
add_q(86, "【聴解 問題4 - 1番】 「リーさんは いつ 日本に 来ましたか。」 -> 「1. 去年です。」", 1,
"""🎯 Đáp án đúng: [1] 去年です。

💡 Phân tích & Giải thích chi tiết (Trang 23):
• Câu hỏi: 「リーさんは いつ 日本に 来ましたか。」 (Bạn Lee đã đến Nhật Bản từ khi nào?).
• Nghi vấn từ 「いつ」 (khi nào) hỏi về thời điểm -> Trả lời: **「1. 去年です。」** (Từ năm ngoái).

🔍 Phân tích các lựa chọn:
- 1. 去年です: (ĐÚNG) - Vào năm ngoái
- 2. 飛行機です: Bằng máy bay (trả lời cho 何で)
- 3. 一人で 来ました: Đã đến một mình (trả lời cho だれと)

📄 Trích PDF gốc (N5 2018 - 聴解 問題4 - 1番):
「リーさんはいつ日本に来ましたか。」 -> 1. 去年です。""",
audio_ja="""女：リーさんはいつ日本に来ましたか。
男：
1. 去年です。
2. 飛行機です。
3. 一人で来ました。""",
audio_vi="""Nữ: Bạn Lee đã đến Nhật Bản khi nào vậy?
Nam:
1. Vào năm ngoái ạ.
2. Bằng máy bay ạ.
3. Tôi đã đến một mình.""")

add_q(87, "【聴解 問題4 - 2番】 「昼ご飯は もう 食べましたか。」 -> 「3. いえ、今からです。」", 3,
"""🎯 Đáp án đúng: [3] いえ、今からです。

💡 Phân tích & Giải thích chi tiết (Trang 23):
• Câu hỏi: 「昼ご飯は もう 食べましたか。」 (Bạn đã ăn cơm trưa chưa?).
• Cách đáp tự nhiên: **「3. いえ、今からです。」** (Chưa, bây giờ tôi mới bắt đầu ăn).

🔍 Phân tích các lựa chọn:
- 1. はい、食べませんでした: Sai (はい không đi với phủ định 食べませんでした)
- 2. いえ、食べました: Sai (いえ không đi với khẳng định 食べました)
- 3. いえ、今からです: (ĐÚNG) - Chưa, bây giờ tôi mới ăn

📄 Trích PDF gốc (N5 2018 - 聴解 問題4 - 2番):
「昼ご飯はもう食べましたか。」 -> 3. いえ、今からです。""",
audio_ja="""女：昼ご飯はもう食べましたか。
男：
1. はい、食べませんでした。
2. いえ、食べました。
3. いえ、今からです。""",
audio_vi="""Nữ: Bạn đã ăn cơm trưa chưa?
Nam:
1. Vâng, tôi đã không ăn.
2. Không, tôi đã ăn rồi.
3. Chưa, bây giờ tôi mới ăn.""")

add_q(88, "【聴解 問題4 - 3番】 「美味しい クッキーですね。どこで 買いましたか。」 -> 「3. 私が 作りました。」", 3,
"""🎯 Đáp án đúng: [3] 私が 作りました。

💡 Phân tích & Giải thích chi tiết (Trang 15 & 24):
• Câu hỏi: 「美味しい クッキーですね。どこで 買いましたか。」 (Bánh quy ngon quá nhỉ. Bạn đã mua ở đâu vậy?).
• Người phụ nữ trả lời rằng bánh này không phải đi mua ở tiệm mà là tự tay làm: **「3. 私が 作りました。」** (Chính tôi đã tự làm đấy ạ).

🔍 Phân tích các lựa chọn:
- 1. はい、あそこです: Không tự nhiên với câu hỏi どこで買いましたか
- 2. とても おいしいですよ: Rất ngon đấy (không trả lời câu hỏi)
- 3. 私が 作りました: (ĐÚNG) - Do tự tay tôi làm đấy (không phải mua)

📄 Trích PDF gốc (N5 2018 - 聴解 問題4 - 3番):
「美味しいクッキーですね。どこで買いましたか。」 -> 3. 私が作りました。""",
audio_ja="""男：美味しいクッキーですね。どこで買いましたか。
女：
1. はい、あそこです。
2. とてもおいしいですよ。
3. 私が作りました。""",
audio_vi="""Nam: Bánh quy ngon quá nhỉ. Bạn đã mua ở đâu vậy?
Nữ:
1. Vâng, ở đằng kia.
2. Ngon lắm đấy.
3. Chính tôi đã tự làm đấy.""")

add_q(89, "【聴解 問題4 - 4番】 「あした、きょうとに 行きますね。何時の 飛行機に 乗りますか。」 -> 「2. 4時半の 飛行機です。」", 2,
"""🎯 Đáp án đúng: [2] 4時半の 飛行機です。

💡 Phân tích & Giải thích chi tiết (Trang 24):
• Câu hỏi: 「あした、きょうとに 行きますね。何時の 飛行機に 乗りますか。」 (Ngày mai bạn đi Kyoto nhỉ. Bạn sẽ đi chuyến máy bay lúc mấy giờ?).
• Câu hỏi hỏi **chuyến máy bay lúc mấy giờ (`何時の飛行機`)** -> Trả lời: **「2. 4時半の 飛行機です。」** (Chuyến máy bay lúc 4 giờ rưỡi).

🔍 Phân tích các lựa chọn:
- 1. 2時間 乗ります: Đi mất 2 tiếng (khoảng thời gian, không phải thời điểm)
- 2. 4時半の 飛行機です: (ĐÚNG) - Chuyến máy bay lúc 4 giờ rưỡi
- 3. はい、飛行機で 行きます: Vâng, đi bằng máy bay

📄 Trích PDF gốc (N5 2018 - 聴解 問題4 - 4番):
「何時の飛行機に乗りますか。」 -> 2. 4時半の飛行機です。""",
audio_ja="""女：あした、きょうとに行きますね。何時の飛行機に乗りますか。
男：
1. 2時間乗ります。
2. 4時半の飛行機です。
3. はい、飛行機で行きます。""",
audio_vi="""Nữ: Ngày mai anh đi Kyoto nhỉ. Anh sẽ lên chuyến máy bay lúc mấy giờ?
Nam:
1. Tôi đi mất 2 tiếng.
2. Là chuyến máy bay lúc 4 giờ rưỡi.
3. Vâng, tôi đi bằng máy bay.""")

add_q(90, "【聴解 問題4 - 5番】 「すみません、田中さんの 電話番号を 知って いますか。」 -> 「1. はい、わかりますよ。」", 1,
"""🎯 Đáp án đúng: [1] はい、わかりますよ。

💡 Phân tích & Giải thích chi tiết (Trang 24):
• Câu hỏi: 「すみません、田中さんの 電話番号を 知って いますか。」 (Xin lỗi, bạn có biết số điện thoại của anh Tanaka không?).
• Trả lời đồng ý và cho biết mình nắm được thông tin: **「1. はい、わかりますよ。」** (Vâng, tôi biết đấy ạ).

🔍 Phân tích các lựa chọn:
- 1. はい、わかりますよ: (ĐÚNG) - Vâng, tôi biết đấy
- 2. いいえ、知りませんでした: Sai thì quá khứ (phải là いいえ、知りません)
- 3. はい、そうです: Không dùng để trả lời cho 知っていますか

📄 Trích PDF gốc (N5 2018 - 聴解 問題4 - 5番):
「すみません、田中さんの電話番号を知っていますか。」 -> 1. はい、わかりますよ。""",
audio_ja="""男：すみません、田中さんの電話番号を知っていますか。
女：
1. はい、わかりますよ。
2. いいえ、知りませんでした。
3. はい、そうです。""",
audio_vi="""Nam: Xin lỗi, cô có biết số điện thoại của anh Tanaka không?
Nữ:
1. Vâng, tôi biết đấy ạ.
2. Không, tôi đã không biết.
3. Vâng, đúng vậy.""")

add_q(91, "【聴解 問題4 - 6番】 「夏休みは どこかへ 出かけましたか。」 -> 「2. どこへも 行きませんでした。」", 2,
"""🎯 Đáp án đúng: [2] どこへも 行きませんでした。

💡 Phân tích & Giải thích chi tiết (Trang 24):
• Câu hỏi: 「夏休みは どこかへ 出かけましたか。」 (Kỳ nghỉ hè bạn có đi chơi đâu không?).
• Khi trả lời phủ định hoàn toàn ("không đi đâu cả"), dùng cấu trúc 「どこへも ＋ Phủ định」: **「2. どこへも 行きませんでした。」** (Tôi đã không đi đâu cả).

🔍 Phân tích các lựa chọn:
- 1. デパートへ 買い物を しました: Sai trợ từ (phải là デパートで買い物しました hoặc デパートへ買い物に行きました)
- 2. どこへも 行きませんでした: (ĐÚNG) - Tôi đã không đi đâu cả
- 3. いいえ、出かけて いませんでした: Không tự nhiên khi nói về kỳ nghỉ hè đã qua

📄 Trích PDF gốc (N5 2018 - 聴解 問題4 - 6番):
「夏休みはどこかへ出かけましたか。」 -> 2. どこへも行きませんでした。""",
audio_ja="""女：夏休みはどこかへ出かけましたか。
男：
1. デパートへ買い物をしました。
2. どこへも行きませんでした。
3. いいえ、出かけていませんでした。""",
audio_vi="""Nữ: Kỳ nghỉ hè anh có đi ra ngoài chơi đâu không?
Nam:
1. Tôi đã mua sắm tới trung tâm thương mại (sai ngữ pháp).
2. Tôi đã không đi đâu cả.
3. Không, tôi đã không đang đi ra ngoài.""")

print(f"Total questions built: {len(data_91)}")
assert len(data_91) == 91, f"Expected 91 questions, got {len(data_91)}"

# 1. Write scanned_n5_2018_official_answers.json
official_answers_map = {k: v["correctOption"] for k, v in sorted(data_91.items(), key=lambda x: int(x[0]))}
scanned_json_path = r"H:\JP_ANHSENSEI\frontend\src\app\data\scanned_n5_2018_official_answers.json"
scanned_content = {
    "examCode": "n5-2018",
    "yearTitle": "Đề Thi JLPT N5 2018",
    "officialKey": "Official 2018 N5 Answer Table 91 Questions (Page 15)",
    "meta": {
        "sourceFile": "n5-2026-3588.pdf",
        "totalQuestions": 91,
        "scannedAt": "2026-09-27T01:20:00.000Z",
        "scannedBy": "AnhSensei 100% Authentic Official N5 2018 Answer Table (Page 15) & Scripts (Pages 16-24)"
    },
    "officialAnswers": official_answers_map
}
with open(scanned_json_path, "w", encoding="utf-8") as f:
    json.dump(scanned_content, f, ensure_ascii=False, indent=2)
print("Saved scanned_n5_2018_official_answers.json!")

# 2. Inject "n5-2018" and "n5-2026-3588" into jlptDetailedExplanations.ts
ts_path = r"H:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts"
with open(ts_path, "r", encoding="utf-8") as f:
    ts_content = f.read()

def build_ts_block(key_name):
    lines = [f'  "{key_name}": {{']
    for num in range(1, 92):
        item = data_91[str(num)]
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

block_2018 = build_ts_block("n5-2018") + "\n" + build_ts_block("n5-2026-3588")

ts_content = re.sub(r'  "n5-2018": \{.*?\n  \},\n?', '', ts_content, flags=re.DOTALL)
ts_content = re.sub(r'  "n5-2026-3588": \{.*?\n  \},\n?', '', ts_content, flags=re.DOTALL)

last_brace_idx = ts_content.rfind("};")
assert last_brace_idx != -1, "Could not find closing }; in jlptDetailedExplanations.ts"
ts_content = ts_content[:last_brace_idx] + block_2018 + "\n};\n"
with open(ts_path, "w", encoding="utf-8") as f:
    f.write(ts_content)
print("Updated jlptDetailedExplanations.ts with n5-2018 and n5-2026-3588!")

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
            if code in ("n5-2026-3588", "n5-2018") or (lvl == "N5" and "2018" in title):
                ex["level"] = "N5"
                for ver in ex.get("versions", []):
                    ver["totalQuestions"] = 91
                    ver["sections"] = [
                        {"name": "Từ vựng", "duration": 20, "questionsCount": 35},
                        {"name": "Ngữ pháp & Đọc", "duration": 40, "questionsCount": 32},
                        {"name": "Nghe hiểu", "duration": 30, "questionsCount": 24}
                    ]
                    ver["questions"] = data_91
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
