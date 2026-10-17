# -*- coding: utf-8 -*-
"""
Script to apply 100% authentic questions, answers, and explanations for JLPT N4 2013-07
Questions 1 to 35 (Section 1: 文字・語彙)
Extracted directly from n4-2013-07.pdf:
- Page 14: Official answer sheet (参考答案)
- Pages 15 to 17: Official explanations (试题解析)
- Pages 2 to 4: Original exam booklet questions and options
"""

import json
import os
import urllib.request

N4_2013_VOCAB = {
    1: {
        "localPdfNumber": 1,
        "mondai": 1,
        "sectionType": "VOCAB",
        "text": "ちょっと 味 がへんですよ。",
        "options": ["1. こえ", "2. あじ", "3. おと", "4. におい"],
        "correctOption": 2,
        "snippet": "味 (あじ)",
        "explanation": """🎯 Đáp án đúng: [2] あじ (味)

💬 Dịch nghĩa câu:
"Hương vị của món súp này nếm có vẻ hơi là lạ nhỉ."

💡 Phân tích & Giải thích:
• Chữ Hán 「味」 (vị) có âm Kun thuần Nhật chuẩn xác là 「あじ」 (vị giác, hương vị).
• Cụm từ thường gặp: 味が変 (vị hơi lạ, nếm thấy là lạ).

🔍 Phân tích các lựa chọn:
- 1. こえ (声): Giọng nói, âm thanh phát ra từ người/động vật
- 2. あじ (味): Hương vị, vị giác (ĐÚNG)
- 3. おと (音): Tiếng động, âm thanh vật lý
- 4. におい (匂い): Mùi hương, khứu giác

📄 Trích PDF gốc (试题解析 Trang 15):
(1) 2 句意: 味道有点奇怪啊。1. こえ(声): 声音; 2. あじ(味): 味道; 3. おと(音): 声音; 4. におい(匂い): 气味"""
    },
    2: {
        "localPdfNumber": 2,
        "mondai": 1,
        "sectionType": "VOCAB",
        "text": "この ビルは 世界 で いちばん 高いです。",
        "options": ["1. せいがい", "2. せいかい", "3. せがい", "4. せかい"],
        "correctOption": 4,
        "snippet": "世界 (せかい)",
        "explanation": """🎯 Đáp án đúng: [4] せかい (世界)

💬 Dịch nghĩa câu:
"Tòa nhà này là tòa nhà cao nhất trên toàn thế giới."

💡 Phân tích & Giải thích:
• Chữ Hán 「世界」 (thế giới):
  - Chữ 「世」 có âm On là 「せ」 (hoặc せい trong một số từ, ở đây là せ).
  - Chữ 「界」 có âm On là 「かい」.
  - Kết hợp thành: 「せかい」 (thế giới, hoàn cầu).

🔍 Phân tích các lựa chọn:
- 1. せいがい: Thừa trường âm và biến âm đục sai
- 2. せいかい (正解): Đáp án chính xác (sai nghĩa trong văn cảnh này)
- 3. せがい: Sai âm đọc của chữ Thế
- 4. せかい (世界): Thế giới (ĐÚNG)

📄 Trích PDF gốc (试题解析 Trang 15):
(2) 4 句意: 这座建筑是世界上最高的一座。考察汉字词，“世”音读为“せ・せい”，“界”音读为“かい”。4. せかい(世界): 世界"""
    },
    3: {
        "localPdfNumber": 3,
        "mondai": 1,
        "sectionType": "VOCAB",
        "text": "それは たなかさんが 考えて くれました。",
        "options": ["1. かぞえて", "2. こたえて", "3. かんがえて", "4. つたえて"],
        "correctOption": 3,
        "snippet": "考える (かんがえる)",
        "explanation": """🎯 Đáp án đúng: [3] かんがえて (考えて)

💬 Dịch nghĩa câu:
"Điều đó là do anh Tanaka đã suy nghĩ giúp cho tôi."

💡 Phân tích & Giải thích:
• Động từ 「かんがえる (考える - khảo)」: suy nghĩ, ngẫm nghĩ, suy tính ý tưởng.
• Dạng nối tiếp thể て: 「かんがえて」 kết hợp 「～てくれました」 (làm giúp cho mình).

🔍 Phân tích các lựa chọn:
- 1. かぞえて (数える): Đếm số lượng
- 2. こたえて (答える): Trả lời câu hỏi
- 3. かんがえて (考える): Suy nghĩ, cân nhắc (ĐÚNG)
- 4. つたえて (伝える): Truyền đạt, nhắn lại

📄 Trích PDF gốc (试题解析 Trang 15):
(3) 3 句意: 那是田中先生帮我想的。1. かぞえる(数える): 数, 计算; 2. こたえる(答える): 回答; 3. かんがえる(考える): 想, 考虑; 4. つたえる(伝える): 传达"""
    },
    4: {
        "localPdfNumber": 4,
        "mondai": 1,
        "sectionType": "VOCAB",
        "text": "じしょが 買いたかった のに、お金が 足りません でした。",
        "options": ["1. たりません", "2. ありません", "3. たしりません", "4. あまりません"],
        "correctOption": 1,
        "snippet": "足りる (たりる)",
        "explanation": """🎯 Đáp án đúng: [1] たりません (足りません)

💬 Dịch nghĩa câu:
"Mặc dù tôi rất muốn mua cuốn từ điển, nhưng số tiền tôi có lại không đủ."

💡 Phân tích & Giải thích:
• Động từ 「たりる (足りる - túc)」: đầy đủ, đáp ứng đủ số lượng hay tiền bạc.
• Thể phủ định lịch sự quá khứ: 「足りませんでした」 (đã không đủ). Cụm từ: お金が足りない (không đủ tiền).

🔍 Phân tích các lựa chọn:
- 1. たりません (足りる): Đầy đủ -> phủ định: không đủ (ĐÚNG)
- 2. ありません: Không có (nếu là tiền không có thì dùng お金がありませんでした, nhưng muốn mua từ điển mà thiếu tiền thì dùng 足りません chuẩn xác nhất)
- 3. たしりません: Từ không có nghĩa (phương án gây nhiễu)
- 4. あまりません: Dư thừa

📄 Trích PDF gốc (试题解析 Trang 15):
(4) 1 句意: 我想买辞典, 但钱不够。1. たりる(足りる): 足, 够; 4. ある(有る): 有; 其他选项为干扰项"""
    },
    5: {
        "localPdfNumber": 5,
        "mondai": 1,
        "sectionType": "VOCAB",
        "text": "わたしの かぞくは みんな 体 が じょうぶです。",
        "options": ["1. かたら", "2. からた", "3. かだら", "4. からだ"],
        "correctOption": 4,
        "snippet": "体 (からだ)",
        "explanation": """🎯 Đáp án đúng: [4] からだ (体)

💬 Dịch nghĩa câu:
"Tất cả các thành viên trong gia đình tôi cơ thể đều rất khỏe mạnh, dẻo dai."

💡 Phân tích & Giải thích:
• Chữ Hán 「体」 (thể) có âm Kun thuần Nhật chuẩn xác là 「からだ」 (cơ thể, thân thể).
• Cụm từ thông dụng: 「体がじょうぶ (cơ thể dẻo dai, khỏe mạnh)」.

🔍 Phân tích các lựa chọn:
- 1, 2, 3: Các cách gieo âm nhầm lẫn vị trí âm đục (かたら, からた, かだら)
- 4. からだ (体): Thân thể, cơ thể (ĐÚNG)

📄 Trích PDF gốc (试题解析 Trang 15):
(5) 4 句意: 我的家人身体都很健康。考察日语固有词汇的训读，“体”训读为“からだ”。"""
    },
    6: {
        "localPdfNumber": 6,
        "mondai": 1,
        "sectionType": "VOCAB",
        "text": "今度 の 日よう日に きこくします。",
        "options": ["1. こんどう", "2. こんど", "3. こんと", "4. こんとう"],
        "correctOption": 2,
        "snippet": "今度 (こんど)",
        "explanation": """🎯 Đáp án đúng: [2] こんど (今度)

💬 Dịch nghĩa câu:
"Chủ nhật lần này tôi sẽ về nước."

💡 Phân tích & Giải thích:
• Chữ Hán 「今度」 (kim độ):
  - Chữ 「今」 có âm On là 「こん」.
  - Chữ 「度」 khi biểu thị số lần hoặc dịp tới có âm On là 「ど」 (âm ngắn, không có trường âm).
  - Ghép lại thành: 「こんど」 (lần này, dịp sắp tới).

🔍 Phân tích các lựa chọn:
- 1. こんどう: Sai vì thừa trường âm う
- 2. こんど (今度): Lần này, dịp tới (ĐÚNG)
- 3. こんと: Sai vì thiếu âm đục (phải là ど)
- 4. こんとう: Sai vừa thiếu âm đục vừa thừa trường âm

📄 Trích PDF gốc (试题解析 Trang 15):
(6) 2 句意: 我本周日回国。考察汉字词，“今”音读为“こん・きん”，“度”音读为“ど・たく”。“度”表次数的意思时, 读音为“ど”, 这里应为“こんど”。"""
    },
    7: {
        "localPdfNumber": 7,
        "mondai": 1,
        "sectionType": "VOCAB",
        "text": "あしたの 営業 は あさ 9時からです。",
        "options": ["1. じゅぎょう", "2. えいきょう", "3. えいぎょう", "4. じゅきょう"],
        "correctOption": 3,
        "snippet": "営業 (えいぎょう)",
        "explanation": """🎯 Đáp án đúng: [3] えいぎょう (営業)

💬 Dịch nghĩa câu:
"Giờ mở cửa kinh doanh ngày mai bắt đầu từ 9 giờ sáng."

💡 Phân tích & Giải thích:
• Chữ Hán 「営業」 (doanh nghiệp):
  - Chữ 「営」 có âm On là 「えい」.
  - Chữ 「業」 có âm On là 「ぎょう」.
  - Kết hợp thành: 「えいぎょう」 (kinh doanh, mở cửa phục vụ).

🔍 Phân tích các lựa chọn:
- 1. じゅぎょう (授業): Tiết học, buổi dạy học
- 2. えいきょう (影響): Ảnh hưởng
- 3. えいぎょう (営業): Kinh doanh, mở cửa phục vụ (ĐÚNG)
- 4. じゅきょう: Sai từ

📄 Trích PDF gốc (试题解析 Trang 15):
(7) 3 句意: 明天从早上9点开始营业。考察汉字词，“営”音读为“えい”，“業”音读为“ぎょう・ごう”。故选3。"""
    },
    8: {
        "localPdfNumber": 8,
        "mondai": 1,
        "sectionType": "VOCAB",
        "text": "ずっと まどから 雲 を 見ていました。",
        "options": ["1. くも", "2. ほし", "3. つき", "4. そら"],
        "correctOption": 1,
        "snippet": "雲 (くも)",
        "explanation": """🎯 Đáp án đúng: [1] くも (雲)

💬 Dịch nghĩa câu:
"Tôi đã ngồi ngắm nhìn những đám mây qua khung cửa sổ suốt một lúc lâu."

💡 Phân tích & Giải thích:
• Chữ Hán 「雲」 (vân) có âm Kun chuẩn xác là 「くも」 mang nghĩa là đám mây.

🔍 Phân tích các lựa chọn:
- 1. くも (雲): Đám mây (ĐÚNG)
- 2. ほし (星): Ngôi sao
- 3. つき (月): Mặt trăng
- 4. そら (空): Bầu trời

📄 Trích PDF gốc (试题解析 Trang 15):
(8) 1 句意: 我一直在看窗外的云。1. くも(雲): 云; 2. ほし(星): 星星; 3. つき(月): 月亮; 4. そら(空): 天空"""
    },
    9: {
        "localPdfNumber": 9,
        "mondai": 1,
        "sectionType": "VOCAB",
        "text": "まいあさ 近所 の こうえんで ジョギングを しています。",
        "options": ["1. きんじょ", "2. ちかじょ", "3. きんじょう", "4. ちかじょう"],
        "correctOption": 1,
        "snippet": "近所 (きんじょ)",
        "explanation": """🎯 Đáp án đúng: [1] きんじょ (近所)

💬 Dịch nghĩa câu:
"Mỗi buổi sáng tôi đều chạy bộ ở công viên gần nhà."

💡 Phân tích & Giải thích:
• Chữ Hán 「近所」 (cận sở):
  - Chữ 「近」 có âm On là 「きん」.
  - Chữ 「所」 có âm On là 「しょ」, khi ghép vào từ phức đứng sau âm mũi 'n' xảy ra hiện tượng liên thanh biến âm đục thành 「じょ」 (âm ngắn, không có trường âm).
  - Kết hợp thành: 「きんじょ」 (hàng xóm láng giềng, vùng lân cận).

🔍 Phân tích các lựa chọn:
- 1. きんじょ (近所): Vùng lân cận, gần nhà (ĐÚNG)
- 2. ちかじょ: Nhầm âm On thành âm Kun ちか
- 3. きんじょう: Sai vì thừa trường âm う
- 4. ちかじょう: Vừa nhầm âm Kun vừa thừa trường âm

📄 Trích PDF gốc (试题解析 Trang 15):
(9) 1 句意: 我每天都在附近的公园跑步。考察汉字词，“近”音读为“きん”，“所”音读为“しょ”。复合词中后续词首音在“か、さ、た、は行”，一般发生浊音变。这里应为“きんじょ”。"""
    },
    10: {
        "localPdfNumber": 10,
        "mondai": 2,
        "sectionType": "VOCAB",
        "text": "この くすり は いくらですか。",
        "options": ["1. 果", "2. 楽", "3. 菓", "4. 薬"],
        "correctOption": 4,
        "snippet": "くすり -> 薬",
        "explanation": """🎯 Đáp án đúng: [4] 薬 (くすり)

💬 Dịch nghĩa câu:
"Loại thuốc uống này có giá bao nhiêu tiền vậy?"

💡 Phân tích & Cấu trúc chữ Hán:
• Từ Hiragana 「くすり」 biểu thị thuốc men phòng chữa bệnh, chữ Hán tương ứng chuẩn xác là 「薬」 (Dược).
• Chữ 「薬」 gồm bộ Thảo 艹 ở trên và chữ Lạc 楽 ở dưới.

🔍 Phân tích các lựa chọn:
- 1. 果: Chữ "Quả" (trong 果物 - くだもの: hoa quả)
- 2. 楽: Chữ "Lạc/Nhạc" (trong 楽しい - たのしい: vui vẻ; 音楽 - おんがく: âm nhạc)
- 3. 菓: Chữ "Quả" có bộ thảo (trong お菓子 - おかし: bánh kẹo)
- 4. 薬: Chữ "Dược" (くすり: thuốc men) (ĐÚNG)

📄 Trích PDF gốc (试题解析 Trang 15):
(10) 4 句意: 这种药多少钱? 1. 果(か): 果实, 结果; 2. 楽(らく): 舒适, 轻松; 3. 菓(か): 点心; 4. 薬(くすり): 药品"""
    },
    11: {
        "localPdfNumber": 11,
        "mondai": 2,
        "sectionType": "VOCAB",
        "text": "きのうは 9時に おきました。",
        "options": ["1. 赴きました", "2. 題きました", "3. 起きました", "4. 匙きました"],
        "correctOption": 3,
        "snippet": "おきました -> 起きました",
        "explanation": """🎯 Đáp án đúng: [3] 起きました

💬 Dịch nghĩa câu:
"Hôm qua tôi đã thức dậy vào lúc 9 giờ."

💡 Phân tích & Cấu trúc chữ Hán:
• Động từ thức dậy 「おきる」 được viết bằng chữ Hán 「起」 (Khởi - thức dậy, bắt đầu).
• Thể quá khứ lịch sự: 「起きました」 (đã thức dậy).

🔍 Phân tích các lựa chọn:
- 1. 赴きました: Chữ "Phó" (赴く - おもむく: tiến về, hướng đến)
- 2. 題きました: Chữ "Đề" (題 - だい: đề tài, tiêu đề)
- 3. 起きました: Chữ "Khởi" (起きる - おきる: thức dậy) (ĐÚNG)
- 4. 匙きました: Chữ "Thi" (匙 - さじ: cái thìa, muỗng - phương án gây nhiễu bộ thủ)

📄 Trích PDF gốc (试题解析 Trang 15):
(11) 3 句意: 我昨天9点起了床。1. 赴く(おもむく): 奔赴, 前往; 2. 題する(だいする): 命题, 题字; 3. 起きる(おきる): 起床; 其他选项为干扰项"""
    },
    12: {
        "localPdfNumber": 12,
        "mondai": 2,
        "sectionType": "VOCAB",
        "text": "だんせい の おてあらいは あちらです。",
        "options": ["1. 男姓", "2. 女性", "3. 男性", "4. 女姓"],
        "correctOption": 3,
        "snippet": "だんせい -> 男性",
        "explanation": """🎯 Đáp án đúng: [3] 男性

💬 Dịch nghĩa câu:
"Nhà vệ sinh dành cho nam giới ở đằng kia."

💡 Phân tích & Cấu trúc chữ Hán:
• Từ Hiragana 「だんせい」 nghĩa là nam giới, phái nam.
• Chữ Hán ghép từ 「男」 (Nam) và 「性」 (Tính - giới tính, tính chất) -> 「男性」.

🔍 Phân tích các lựa chọn:
- 1. 男姓: Sai chữ "Tính" (nhầm sang chữ 姓 - họ trong dòng họ)
- 2. 女性: Nữ giới (nhầm phái)
- 3. 男性: Nam giới (ĐÚNG)
- 4. 女姓: Sai chữ Tính (nhầm họ)

📄 Trích PDF gốc (试题解析 Trang 15):
(12) 3 句意: 男洗手间在那边。2. 女性(じょせい): 女性; 3. 男性(だんせい): 男性; 其他选项为干扰项"""
    },
    13: {
        "localPdfNumber": 13,
        "mondai": 2,
        "sectionType": "VOCAB",
        "text": "この スイッチを おせば、電気が つきます。",
        "options": ["1. 伸せば", "2. 挿せば", "3. 押せば", "4. 坤せば"],
        "correctOption": 3,
        "snippet": "おせば -> 押せば",
        "explanation": """🎯 Đáp án đúng: [3] 押せば

💬 Dịch nghĩa câu:
"Nếu ấn công tắc này thì đèn sẽ bật sáng."

💡 Phân tích & Cấu trúc chữ Hán:
• Động từ nhấn, ấn (công tắc, nút bấm) là 「おす」, viết bằng chữ Hán 「押」 (Áp).
• Dạng điều kiện thể ば: 「押せば」 (nếu ấn vào).

🔍 Phân tích các lựa chọn:
- 1. 伸せば: Chữ "Thân" (伸びる - のびる: vươn dài, kéo dài)
- 2. 挿せば: Chữ "Sáp" (挿す - さす: cắm vào)
- 3. 押せば: Chữ "Áp" (押す - おす: nhấn, ấn) (ĐÚNG)
- 4. 坤せば: Chữ "Khôn" (phương án gây nhiễu bộ thủ)

📄 Trích PDF gốc (试题解析 Trang 15):
(13) 3 句意: 按下这个开关, 灯就会亮。1. 伸びる(のびる): 伸长; 2. 挿す(さす): 插; 3. 押す(おす): 按, 压; 其他选项为干扰项"""
    },
    14: {
        "localPdfNumber": 14,
        "mondai": 2,
        "sectionType": "VOCAB",
        "text": "国の りょうしんに にもつを おくりました。",
        "options": ["1. 込りました", "2. 返りました", "3. 速りました", "4. 送りました"],
        "correctOption": 4,
        "snippet": "おくりました -> 送りました",
        "explanation": """🎯 Đáp án đúng: [4] 送りました

💬 Dịch nghĩa câu:
"Tôi đã gửi hành lý về cho bố mẹ ở quê nhà."

💡 Phân tích & Cấu trúc chữ Hán:
• Động từ gửi (hành lý, thư tín, bưu phẩm) là 「おくる」, viết bằng chữ Hán 「送」 (Tống - gửi đi, tiễn đưa).
• Thể quá khứ lịch sự: 「送りました」.

🔍 Phân tích các lựa chọn:
- 1. 込りました: Chữ "Nhập/Kính" (込める - こめる: bao gồm, dồn tâm trí)
- 2. 返りました: Chữ "Phản" (返る - かえる: quay lại, trở lại)
- 3. 速りました: Chữ "Tốc" (速める - はやめる: đẩy nhanh tốc độ)
- 4. 送りました: Chữ "Tống" (送る - おくる: gửi bưu kiện, hành lý) (ĐÚNG)

📄 Trích PDF gốc (试题解析 Trang 16):
(14) 4 句意: 我把行李寄给了国内的父母。1. 込める(こめる): 包括在内; 2. 返る(かえる): 归还, 回; 3. 速める(はやめる): 加快, 提前; 4. 送る(おくる): 寄, 送"""
    },
    15: {
        "localPdfNumber": 15,
        "mondai": 2,
        "sectionType": "VOCAB",
        "text": "あには 車の うんてん が できます。",
        "options": ["1. 運転", "2. 運軽", "3. 連転", "4. 連軽"],
        "correctOption": 1,
        "snippet": "うんてん -> 運転",
        "explanation": """🎯 Đáp án đúng: [1] 運転

💬 Dịch nghĩa câu:
"Anh trai tôi có thể lái xe ô tô."

💡 Phân tích & Cấu trúc chữ Hán:
• Danh từ lái xe, điều khiển phương tiện 「うんてん」 được viết bằng chữ Hán 「運転」 (Vận chuyển).
• Cụm từ: 「車の運転ができる」 (biết lái xe ô tô).

🔍 Phân tích các lựa chọn:
- 1. 運転: Vận chuyển (lái xe) (ĐÚNG)
- 2. 運軽: Sai chữ thứ hai (nhầm chữ 軽 - khinh thay vì 転 - chuyển)
- 3. 連転: Sai chữ đầu (nhầm chữ 連 - liên thay vì 運 - vận)
- 4. 連軽: Sai cả hai chữ Hán

📄 Trích PDF gốc (试题解析 Trang 16):
(15) 1 句意: 我的哥哥会开车。1. 運転(うんてん): 开, 驾驶; 其他选项为干扰项"""
    },
    16: {
        "localPdfNumber": 16,
        "mondai": 3,
        "sectionType": "VOCAB",
        "text": "とても 行きたかったのに、りょこうが ちゅうしに なって、（　）です。",
        "options": ["1. ざんねん", "2. ふべん", "3. だめ", "4. しんぱい"],
        "correctOption": 1,
        "snippet": "ざんねん (残念)",
        "explanation": """🎯 Đáp án đúng: [1] ざんねん

💬 Dịch nghĩa câu:
"Mặc dù rất muốn đi, nhưng chuyến du lịch lại bị hủy bỏ nên thật là đáng tiếc."

💡 Phân tích & Giải thích:
• Tính từ đuôi な: 「ざんねん (残念)」 có nghĩa là đáng tiếc, tiếc nuối.
• Sử dụng để biểu lộ tâm trạng tiếc nuối khi sự việc kỳ vọng không diễn ra như ý muốn. Vế trước là 「行きたかったのに、中止になって」 (rất muốn đi nhưng bị hủy).

🔍 Phân tích các lựa chọn:
- 1. ざんねん (残念): Đáng tiếc, tiếc nuối (ĐÚNG)
- 2. ふべん (不便): Bất tiện, không thuận lợi
- 3. だめ (駄目): Không được, vô ích, hỏng
- 4. しんぱい (心配): Lo lắng, bất an

📄 Trích PDF gốc (试题解析 Trang 16):
(16) 1 句意: 明明很想去, 但是旅行却取消了, 我感到十分遗憾。1. ざんねん(残念): 遗憾; 2. ふべん(不便): 不方便; 3. だめ(駄目): 无望; 4. しんぱい(心配): 担忧"""
    },
    17: {
        "localPdfNumber": 17,
        "mondai": 3,
        "sectionType": "VOCAB",
        "text": "なくした かぎを（　）けど、どこにも ないんです。",
        "options": ["1. しらべた", "2. さがした", "3. みつけた", "4. あつめた"],
        "correctOption": 2,
        "snippet": "さがした (探した)",
        "explanation": """🎯 Đáp án đúng: [2] さがした

💬 Dịch nghĩa câu:
"Tôi đã tìm chiếc chìa khóa bị mất nhưng chẳng thấy nó ở đâu cả."

💡 Phân tích & Giải thích:
• Động từ 「さがす (探す)」: tìm kiếm thứ bị thất lạc. Cụm từ: かぎをさがす (tìm chìa khóa).
• Vế sau có mệnh đề tương phản: 「けど、どこにもない」 (nhưng mà ở đâu cũng không có).

🔍 Phân tích các lựa chọn:
- 1. しらべた (調べた): Tra cứu, điều tra thông tin/tài liệu
- 2. さがした (探した): Tìm kiếm đồ vật thất lạc (ĐÚNG)
- 3. みつけた (見つけた): Đã tìm thấy (mâu thuẫn với vế sau どこにもない - không có ở đâu)
- 4. あつめた (集めた): Gom lại, thu thập

📄 Trích PDF gốc (试题解析 Trang 16):
(17) 2 句意: 我找了丢失的钥匙, 但是哪里都没找到。1. しらべる(調べる): 调查; 2. さがす(探す): 寻找; 3. みつける(見つける): 找到; 4. あつめる(集める): 收集"""
    },
    18: {
        "localPdfNumber": 18,
        "mondai": 3,
        "sectionType": "VOCAB",
        "text": "スポーツの あとで、シャワーを あびるのは（　）がいいです。",
        "options": ["1. ぐあい", "2. こころ", "3. きもち", "4. げんき"],
        "correctOption": 3,
        "snippet": "きもち (気持ち)",
        "explanation": """🎯 Đáp án đúng: [3] きもち

💬 Dịch nghĩa câu:
"Sau khi chơi thể thao, việc tắm vòi hoa sen cho cảm giác thật sảng khoái, dễ chịu."

💡 Phân tích & Giải thích:
• Cụm từ cố định: 「きもちがいい (気持ちがいい)」 biểu thị cảm giác khoan khoái, sảng khoái về thể chất hoặc tâm trạng khi được thư giãn.

🔍 Phân tích các lựa chọn:
- 1. ぐあい (具合): Tình trạng máy móc hoặc trạng thái sức khỏe (cụm: 具合が悪い)
- 2. こころ (心): Tấm lòng, trái tim, tâm trí
- 3. きもち (気持ち): Cảm giác, tâm trạng (きもちがいい: sảng khoái) (ĐÚNG)
- 4. げんき (元気): Khỏe khoắn, tràn đầy năng lượng

📄 Trích PDF gốc (试题解析 Trang 16):
(18) 3 句意: 在运动后洗个澡会非常舒服。1. ぐあい(具合): 情况; 2. こころ(心): 心绪; 3. きもち(気持): 心情; 4. げんき(元気): 精力"""
    },
    19: {
        "localPdfNumber": 19,
        "mondai": 3,
        "sectionType": "VOCAB",
        "text": "日本へ りょこうに 行った とき、いろいろな（　）を しました。",
        "options": ["1. けいけん", "2. おもいで", "3. おみやげ", "4. きょうみ"],
        "correctOption": 1,
        "snippet": "けいけん (経験)",
        "explanation": """🎯 Đáp án đúng: [1] けいけん

💬 Dịch nghĩa câu:
"Khi đi du lịch Nhật Bản, tôi đã trải nghiệm rất nhiều điều khác nhau."

💡 Phân tích & Giải thích:
• Cụm động từ kết hợp chuẩn mực: 「けいけんをする (経験をする)」 nghĩa là trải nghiệm thực tế, tích lũy vốn sống.
• Từ 「おもいで」 thường đi với 「おもいでができる」 (có kỷ niệm đẹp), không kết hợp với 「～をする」.

🔍 Phân tích các lựa chọn:
- 1. けいけん (経験): Kinh nghiệm, trải nghiệm thực tế (ĐÚNG)
- 2. おもいで (思い出): Kỷ niệm (không đi với ～をする)
- 3. おみやげ (お土産): Quà lưu niệm
- 4. きょうみ (興味): Hứng thú, quan tâm (cụm: 興味がある)

📄 Trích PDF gốc (试题解析 Trang 16):
(19) 1 句意: 去日本旅行的时候, 体验了各种各样的事情。1. けいけん(経験): 经历, 体验; 2. おもいで(思い出): 回忆; 3. おみやげ(お土産): 特产; 4. きょうみ(興味): 兴趣"""
    },
    20: {
        "localPdfNumber": 20,
        "mondai": 3,
        "sectionType": "VOCAB",
        "text": "雨が ふっているので、さんぽに 行くのは（　）。",
        "options": ["1. とじました", "2. すてました", "3. しめました", "4. やめました"],
        "correctOption": 4,
        "snippet": "やめました (止めた)",
        "explanation": """🎯 Đáp án đúng: [4] やめました

💬 Dịch nghĩa câu:
"Vì trời đang mưa nên tôi đã thôi / quyết định không đi dạo nữa."

💡 Phân tích & Giải thích:
• Động từ 「やめる (止める)」 kết hợp với danh từ hóa động từ 「[Động từ thể từ điển] のをやめる」 mang ý nghĩa từ bỏ, ngừng lại hoặc hủy bỏ một dự định hành động.
• Dạng quá khứ: 「やめました」.

🔍 Phân tích các lựa chọn:
- 1. とじました (閉じた): Khép lại, nhắm (mắt), gấp (sách vở)
- 2. すてました (捨てた): Vứt bỏ rác hay đồ vật không dùng nữa
- 3. しめました (閉めた): Đóng (cửa, nắp hộp)
- 4. やめました (止めた): Thôi, dừng lại, hủy bỏ ý định (ĐÚNG)

📄 Trích PDF gốc (试题解析 Trang 16):
(20) 4 句意: 现在正在下雨, 所以不去散步了。1. とじる(閉じる): 关闭; 2. すてる(捨てる): 抛弃; 3. しめる(閉める): 关闭; 4. やめる(止める): 放弃, 作罢"""
    },
    21: {
        "localPdfNumber": 21,
        "mondai": 3,
        "sectionType": "VOCAB",
        "text": "にもつが 多いので、やまださんが ひっこしを（　）くれました。",
        "options": ["1. はこんで", "2. てつだって", "3. かたづけて", "4. つつんで"],
        "correctOption": 2,
        "snippet": "てつだって (手伝って)",
        "explanation": """🎯 Đáp án đúng: [2] てつだって

💬 Dịch nghĩa câu:
"Vì đồ đạc nhiều nên anh Yamada đã phụ giúp tôi việc chuyển nhà."

💡 Phân tích & Giải thích:
• Cụm từ cố định: 「ひっこしをてつだう (引越しを手伝う)」: giúp đỡ, phụ việc chuyển nhà.
• Kết hợp ngữ pháp 「～てくれる」 (ai đó làm điều gì giúp mình) -> 「てつだってくれました」.

🔍 Phân tích các lựa chọn:
- 1. はこんで (運んで): Vận chuyển (người ta nói にもつを運ぶ, chứ không nói ひっこしを運ぶ)
- 2. てつだって (手伝って): Phụ giúp công việc (ひっこしを手伝う) (ĐÚNG)
- 3. かたづけて (片付けて): Sắp xếp, dọn dẹp
- 4. つつんで (包んで): Bọc gói lại

📄 Trích PDF gốc (试题解析 Trang 16):
(21) 2 句意: 因为行李很多, 所以山田先生来帮我搬家了。1. はこぶ(運ぶ): 搬运; 2. てつだう(手伝う): 帮忙; 3. かたづける(片付ける): 整理; 4. つつむ(包む): 包, 裹"""
    },
    22: {
        "localPdfNumber": 22,
        "mondai": 3,
        "sectionType": "VOCAB",
        "text": "もりさんに、先週 学校に 来なかった（　）を 聞きました。",
        "options": ["1. れんらく", "2. りゆう", "3. いけん", "4. そうだん"],
        "correctOption": 2,
        "snippet": "りゆう (理由)",
        "explanation": """🎯 Đáp án đúng: [2] りゆう

💬 Dịch nghĩa câu:
"Tôi đã hỏi anh Mori lý do tại sao tuần trước anh ấy không đến trường."

💡 Phân tích & Giải thích:
• Danh từ 「りゆう (理由)」: lý do, nguyên cớ.
• Cụm định ngữ bổ nghĩa danh từ: 「先週学校に来なかった理由」 (nguyên nhân/lý do tuần trước vắng mặt ở trường).

🔍 Phân tích các lựa chọn:
- 1. れんらく (連絡): Liên lạc, thông báo
- 2. りゆう (理由): Lý do, nguyên do (ĐÚNG)
- 3. いけん (意見): Ý kiến, quan điểm
- 4. そうだん (相談): Thảo luận, bàn bạc

📄 Trích PDF gốc (试题解析 Trang 16):
(22) 2 句意: 询问了小森上周没来学校的原因。1. れんらく(連絡): 联系; 2. りゆう(理由): 理由; 3. いけん(意見): 意见; 4. そうだん(相談): 商量"""
    },
    23: {
        "localPdfNumber": 23,
        "mondai": 3,
        "sectionType": "VOCAB",
        "text": "どうぞ（　）しないで、たくさん 食べて ください。",
        "options": ["1. しつれい", "2. えんりょ", "3. ちゅうい", "4. はんたい"],
        "correctOption": 2,
        "snippet": "えんりょ (遠慮)",
        "explanation": """🎯 Đáp án đúng: [2] えんりょ

💬 Dịch nghĩa câu:
"Xin bạn đừng ngại ngùng khách sáo nhé, hãy ăn thật nhiều vào."

💡 Phân tích & Giải thích:
• Danh từ/Động từ 「えんりょ（する） (遠慮)」: khách khí, ngại ngần, giữ kẽ.
• Khẩu ngữ mời khách ăn uống thân mật, hiếu khách: 「どうぞ遠慮しないで (xin đừng ngại/khách sáo)」.

🔍 Phân tích các lựa chọn:
- 1. しつれい (失礼): Thất lễ, bất lịch sự
- 2. えんりょ (遠慮): Khách khí, ngại ngần (ĐÚNG)
- 3. ちゅうい (注意): Chú ý, cẩn trọng
- 4. はんたい (反対): Phản đối

📄 Trích PDF gốc (试题解析 Trang 16):
(23) 2 句意: 请不要客气, 多吃一点。1. しつれい(失礼): 失礼; 2. えんりょ(遠慮): 客气; 3. ちゅうい(注意): 注意; 4. はんたい(反対): 反对"""
    },
    24: {
        "localPdfNumber": 24,
        "mondai": 3,
        "sectionType": "VOCAB",
        "text": "えさを やったり、さんぽに つれて いったり、毎日 犬の（　）を して います。",
        "options": ["1. せわ", "2. うんどう", "3. ようい", "4. しゅうかん"],
        "correctOption": 1,
        "snippet": "せわ (世話)",
        "explanation": """🎯 Đáp án đúng: [1] せわ

💬 Dịch nghĩa câu:
"Nào là cho ăn thức ăn, nào là dắt đi dạo bộ, ngày nào tôi cũng chăm sóc chú chó cưng."

💡 Phân tích & Giải thích:
• Cụm từ cố định: 「せわをする (世話をする)」: chăm sóc, trông nom, săn sóc (chăm sóc chó mèo thú cưng, con nhỏ, người ốm).
• Cụm từ: 犬の世話をする (chăm sóc chó).

🔍 Phân tích các lựa chọn:
- 1. せわ (世話): Chăm sóc, săn sóc (ĐÚNG)
- 2. うんどう (運動): Vận động, rèn luyện thể thao
- 3. ようい (用意): Chuẩn bị sẵn sàng
- 4. しゅうかん (習慣): Tập quán, thói quen

📄 Trích PDF gốc (试题解析 Trang 16):
(24) 1 句意: 我每天都在照顾小狗, 给它喂食, 带它散步。1. せわ(世話): 照顾; 2. うんどう(運動): 运动; 3. ようい(用意): 准备; 4. しゅうかん(習慣): 习惯"""
    },
    25: {
        "localPdfNumber": 25,
        "mondai": 3,
        "sectionType": "VOCAB",
        "text": "ねつが あるので、びょういんに（　）から 会社に 行きます。",
        "options": ["1. もどって", "2. よって", "3. まがって", "4. かよって"],
        "correctOption": 2,
        "snippet": "よって (寄って)",
        "explanation": """🎯 Đáp án đúng: [2] よって

💬 Dịch nghĩa câu:
"Vì đang bị sốt nên tôi sẽ ghé qua bệnh viện trước rồi mới đến công ty."

💡 Phân tích & Giải thích:
• Động từ 「よる (寄る)」 đi với trợ từ に: 「～に寄る」 biểu thị việc tạt qua, ghé vào một địa điểm nào đó trên lộ trình di chuyển trước khi tới đích chính.
• Thể て: 「よってから」 (sau khi ghé qua bệnh viện).

🔍 Phân tích các lựa chọn:
- 1. もどって (戻って): Quay trở lại nơi xuất phát cũ
- 2. よって (寄って): Ghé qua, tạt vào (びょういんによる) (ĐÚNG)
- 3. まがって (曲がって): Rẽ sang hướng khác, quẹo
- 4. かよって (通って): Đi lại thường xuyên (như đi học, đi làm)

📄 Trích PDF gốc (试题解析 Trang 16):
(25) 2 句意: 因为发烧了, 所以我先顺路去趟医院再回去公司。1. もどる(戻る): 返回; 2. よる(寄る): 顺便去; 3. まがる(曲がる): 拐弯; 4. かよう(通う): 去, 往来"""
    },
    26: {
        "localPdfNumber": 26,
        "mondai": 4,
        "sectionType": "VOCAB",
        "text": "おとうとは あそこで アルバイトを しています。",
        "options": [
            "1. おとうとは あそこで まっています。",
            "2. おとうとは あそこで やすんでいます。",
            "3. おとうとは あそこで あそんでいます。",
            "4. おとうとは あそこで はたらいています。"
        ],
        "correctOption": 4,
        "snippet": "アルバイト ≒ 働いている",
        "explanation": """🎯 Đáp án đúng: [4] おとうとは あそこで はたらいています。

💬 Dịch nghĩa câu gốc:
"Em trai tôi đang làm thêm (part-time) ở đằng kia."

💡 Phân tích & Từ đồng nghĩa:
• Từ vựng gốc: 「アルバイトをする」 có nghĩa là làm công việc làm thêm, bán thời gian.
• Hoàn toàn tương đương về mặt ý nghĩa với động từ 「はたらく (働く - làm việc)」. Do đó câu [4] 「おとうとは あそこで はたらいています」 là câu đồng nghĩa chuẩn xác nhất.

🔍 Phân tích các lựa chọn:
- 1. まっています: Đang đứng đợi ai đó (sai nghĩa)
- 2. やすんでいます: Đang nghỉ ngơi (sai nghĩa)
- 3. あそんでいます: Đang chơi đùa (sai nghĩa)
- 4. はたらいています: Đang làm việc (đồng nghĩa với アルバイトをしている) (ĐÚNG)

📄 Trích PDF gốc (试题解析 Trang 16):
(26) 4 句意: 弟弟在那里打工。(アルバイト: 打工) 1. 弟弟在那里等我。2. 弟弟在那里休息。3. 弟弟在那里玩耍。4. 弟弟在那里工作。"""
    },
    27: {
        "localPdfNumber": 27,
        "mondai": 4,
        "sectionType": "VOCAB",
        "text": "あの 人は ほんとうに うつくしいですね。",
        "options": [
            "1. あの 人は ほんとうに きれいですね。",
            "2. あの 人は ほんとうに おもしろいですね。",
            "3. あの 人は ほんとうに わかいですね。",
            "4. あの 人は ほんとうに かわいいですね。"
        ],
        "correctOption": 1,
        "snippet": "うつくしい ≒ きれい",
        "explanation": """🎯 Đáp án đúng: [1] あの 人は ほんとうに きれいですね。

💬 Dịch nghĩa câu gốc:
"Người đó thực sự rất đẹp đẽ, xinh đẹp nhỉ."

💡 Phân tích & Từ đồng nghĩa:
• Tính từ đuôi い: 「うつくしい (美しい)」 có nghĩa là đẹp, xinh đẹp, mỹ lệ.
• Hoàn toàn tương đương về ý nghĩa diễn đạt với tính từ 「きれい（な）」 (đẹp đẽ, xinh xắn).

🔍 Phân tích các lựa chọn:
- 1. きれいですね: Xinh đẹp nhỉ (hoàn toàn tương đồng với うつくしい) (ĐÚNG)
- 2. おもしろいですね: Thú vị, hài hước nhỉ
- 3. わかいですね: Trẻ trung nhỉ
- 4. かわいいですね: Đáng yêu, dễ thương nhỉ

📄 Trích PDF gốc (试题解析 Trang 16):
(27) 1 句意: 那个真人漂亮啊。(うつくしい: 美丽) 1. 那个真人好看啊。2. 那个真人有趣啊。3. 那个真人年轻啊。4. 那个真人可爱啊。"""
    },
    28: {
        "localPdfNumber": 28,
        "mondai": 4,
        "sectionType": "VOCAB",
        "text": "あの 店は すいて います。",
        "options": [
            "1. あの 店は しなものが 少ないです。",
            "2. あの 店は おきゃくさんが 多いです。",
            "3. あの 店は おきゃくさんが 少ないです。",
            "4. あの 店は しなものが 多いです。"
        ],
        "correctOption": 3,
        "snippet": "すいている ≒ お客さんが少ない",
        "explanation": """🎯 Đáp án đúng: [3] あの 店は おきゃくさんが 少ないです。

💬 Dịch nghĩa câu gốc:
"Cửa hàng đó đang vắng khách / thưa người."

💡 Phân tích & Từ đồng nghĩa:
• Động từ 「すく (空く)」 diễn tả trạng thái thưa thớt, trống trải, ít người qua lại.
• Khi nói về hàng quán hay cửa tiệm, 「すいている」 biểu thị lượng khách ghé thăm rất ít: 「おきゃくさんがすくない (khách hàng ít)」, đối lập với 「こんでいる (混んでいる - đông đúc khách)」.

🔍 Phân tích các lựa chọn:
- 1. Hàng hóa trong tiệm ít (sai đối tượng bổ nghĩa)
- 2. Khách hàng trong tiệm rất đông (trái ngược hoàn toàn ý nghĩa)
- 3. Khách hàng trong tiệm rất ít (vắng khách, đồng nghĩa với すいている) (ĐÚNG)
- 4. Hàng hóa trong tiệm rất nhiều (sai đối tượng bổ nghĩa)

📄 Trích PDF gốc (试题解析 Trang 16):
(28) 3 句意: 那家店现在空着。(すく: 空, 人少) 1. 那家店的商品很少。2. 那家店的客人很多。3. 那家店的客人很少。4. 那家店的商品很多。"""
    },
    29: {
        "localPdfNumber": 29,
        "mondai": 4,
        "sectionType": "VOCAB",
        "text": "この シャワーは ぬるいです。",
        "options": [
            "1. この シャワーは あつくないです。",
            "2. この シャワーは あついです。",
            "3. この シャワーは つよいです。",
            "4. この シャワーは つよくないです。"
        ],
        "correctOption": 1,
        "snippet": "ぬるい ≒ あつくない",
        "explanation": """🎯 Đáp án đúng: [1] この シャワーは あつくないです。

💬 Dịch nghĩa câu gốc:
"Nước vòi hoa sen này âm ấm / hơi nguội, không đủ nóng."

💡 Phân tích & Từ đồng nghĩa:
• Tính từ đuôi い: 「ぬるい (温い)」 đặc tả nhiệt độ của chất lỏng (nước tắm, canh, trà) ở mức âm ấm, lành lạnh, không đủ độ nóng cần thiết.
• Đồng nghĩa với cách diễn đạt phủ định nhiệt độ: 「あつくない (không nóng)」.

🔍 Phân tích các lựa chọn:
- 1. あつくないです: Không nóng (đồng nghĩa với ぬるい) (ĐÚNG)
- 2. あついです: Nóng (trái ngược ý nghĩa)
- 3. つよいです: Nước chảy mạnh (nói về áp lực nước)
- 4. つよくないです: Nước chảy yếu (nói về áp lực nước)

📄 Trích PDF gốc (试题解析 Trang 17):
(29) 1 句意: 这洗澡水是温的。(ぬるい: 温, 不凉不热, 不够热) 1. 这洗澡水不烫。2. 这洗澡水很烫。3. 这洗澡水的冲力很大。4. 这洗澡水的冲力不大。"""
    },
    30: {
        "localPdfNumber": 30,
        "mondai": 4,
        "sectionType": "VOCAB",
        "text": "友だちに 日本の りょうりを おそわりました。",
        "options": [
            "1. 友だちに 日本の りょうりを もらいました。",
            "2. 友だちに 日本の りょうりを おしえました。",
            "3. 友だちに 日本の りょうりを あげました。",
            "4. 友だちに 日本の りょうりを ならいました。"
        ],
        "correctOption": 4,
        "snippet": "おそわる ≒ ならう",
        "explanation": """🎯 Đáp án đúng: [4] 友だちに 日本の りょうりを ならいました。

💬 Dịch nghĩa câu gốc:
"Tôi đã được người bạn dạy cho cách nấu món ăn Nhật Bản."

💡 Phân tích & Từ đồng nghĩa:
• Động từ 「おそわる (教わる)」 có nghĩa là được người khác truyền thụ chỉ dạy cho mình (theo học từ ai đó).
• Hoàn toàn tương đương với cấu trúc 「[Người] に ならう (習う - học tập từ ai đó)」. Do đó câu [4] 「ならいました」 là đáp án chuẩn xác nhất.

🔍 Phân tích các lựa chọn:
- 1. もらいました: Nhận được món ăn từ bạn
- 2. おしえました: Dạy cho bạn (ngược hướng hành động)
- 3. あげました: Tặng món ăn cho bạn
- 4. ならいました: Học hỏi từ bạn (đồng nghĩa với おそわりました) (ĐÚNG)

📄 Trích PDF gốc (试题解析 Trang 17):
(30) 4 句意: 朋友教了我做日本料理的方法。(おそわる: 跟着……学习) 1. 朋友送了我日本料理。2. 我教朋友做了日本料理。3. 我送了朋友日本料理。4. 我向朋友学了如何做日本料理。"""
    },
    31: {
        "localPdfNumber": 31,
        "mondai": 5,
        "sectionType": "VOCAB",
        "text": "けしき (Cách dùng đúng của từ 景色)",
        "options": [
            "1. 先週 えきまえに できた 店は、中の けしきが とても あかるいです。",
            "2. わたしは かぞくの たのしそうな けしきを いつも ビデオで とっています。",
            "3. この まちは 山も 川も あって、けしきが とても いいです。",
            "4. 子どもの けしきが へんだったので、びょういんに つれて いきました。"
        ],
        "correctOption": 3,
        "snippet": "けしき (景色)",
        "explanation": """🎯 Đáp án đúng: [3] この まちは 山も 川も あって、けしきが とても いいです。

💬 Dịch nghĩa câu đúng:
"Thị trấn này có cả núi lẫn sông, phong cảnh cảnh sắc thiên nhiên vô cùng tươi đẹp."

💡 Phân tích cách dùng chuẩn của từ 「けしき (景色)」:
• 「けしき」 chỉ phong cảnh, cảnh sắc thiên nhiên tự nhiên ngoài trời (núi sông, cây cối, bờ biển, bầu trời...).
• Sự kết hợp giữa núi non, sông suối và phong cảnh đẹp: 「山も川もあって、けしきがとてもいい」 là cách dùng chuẩn mực nhất.

🔍 Phân tích các phương án:
- 1. Sai từ: Không gian bên trong cửa tiệm phải dùng 「雰囲気 (ふんいき: bầu không khí)」 hoặc 「内装 (nội thất)」, không dùng けしき.
- 2. Sai từ: Dáng vẻ hạnh phúc vui vẻ của gia đình phải dùng 「姿 (すがた: bóng dáng)」 hoặc 「様子 (ようす: điệu bộ)」.
- 3. ĐÚNG: Cảnh sắc thiên nhiên núi sông tuyệt đẹp (山も川もあって、けしきがとてもいい).
- 4. Sai từ: Sắc mặt, tình trạng kỳ lạ của trẻ nhỏ phải dùng 「様子 (ようす)」 hoặc 「顔色 (sắc mặt)」, không dùng けしき.

📄 Trích PDF gốc (试题解析 Trang 17):
(31) 3 けしき 意思是“景色, 风景”, 选项 3 正确应用。1. 雰囲気; 2. 姿; 3. 这个城市既有山又有水, 风景很美。4. 様子"""
    },
    32: {
        "localPdfNumber": 32,
        "mondai": 5,
        "sectionType": "VOCAB",
        "text": "おどろく (Cách dùng đúng của từ 驚く)",
        "options": [
            "1. みんなの 前で 話す とき、いつも おどろいて じょうずに 話せません。",
            "2. やまださんの おにいさんが ゆうめいな かしゅだと 聞いて、おどろきました。",
            "3. ねる 前に コーヒーを 飲むと、おどろいて ねむれません。",
            "4. あしたは はじめての デートなので、いまから おどろいて います。"
        ],
        "correctOption": 2,
        "snippet": "おどろく (驚く)",
        "explanation": """🎯 Đáp án đúng: [2] やまださんの おにいさんが ゆうめいな かしゅだと 聞いて、おどろきました。

💬 Dịch nghĩa câu đúng:
"Nghe tin anh trai của anh Yamada là ca sĩ nổi tiếng, tôi đã vô cùng kinh ngạc / bất ngờ."

💡 Phân tích cách dùng chuẩn của từ 「おどろく (驚く)」:
• Tự động từ 「おどろく」 diễn tả cảm xúc ngạc nhiên, kinh ngạc, sửng sốt trước một sự việc bất ngờ hoặc một tin tức chưa từng nghĩ tới.
• Mẫu câu tiêu biểu: 「[Tin tức/Sự việc] と聞いて、おどろきました」 (nghe nói rằng... thì rất kinh ngạc).

🔍 Phân tích các phương án:
- 1. Sai từ: Cảm giác run rẩy, hồi hộp lo lắng khi phát biểu trước đám đông phải dùng 「緊張する (きんちょうする: căng thẳng)」, không dùng おどろく.
- 2. ĐÚNG: Bất ngờ sửng sốt khi hay tin anh trai bạn là ca sĩ nổi tiếng (聞いて、おどろきました).
- 3. Sai từ: Uống cà phê trước khi ngủ dẫn đến khó ngủ vì kích thích thần kinh, phải dùng 「目が冴えて」 hoặc 「興奮する」.
- 4. Sai từ: Hồi hộp, nôn nao chờ đợi buổi hẹn hò đầu tiên phải dùng 「どきどきする」 hoặc 「楽しみにする」.

📄 Trích PDF gốc (试题解析 Trang 17):
(32) 2 おどろく 意思是“惊讶”, 选项 2 为正确应用。1. 緊張する; 2. 听说山田先生的哥哥是一位著名歌手, 我感到很惊讶。3. 興奮する; 4. どきどきする"""
    },
    33: {
        "localPdfNumber": 33,
        "mondai": 5,
        "sectionType": "VOCAB",
        "text": "ひろう (Cách dùng đúng của từ 拾う)",
        "options": [
            "1. みちが わからなく なったので、かばんから ちずを ひろいました。",
            "2. すみません、たなの 上の はこを ひろって くれませんか。",
            "3. 木から りんごを ひろって、ふくろに 入れました。",
            "4. 小学生が ごみを ひろって、こうえんを そうじして います。"
        ],
        "correctOption": 4,
        "snippet": "ひろう (拾う)",
        "explanation": """🎯 Đáp án đúng: [4] 小学生が ごみを ひろって、こうえんを そうじして います。

💬 Dịch nghĩa câu đúng:
"Các em học sinh tiểu học đang nhặt rác để dọn dẹp vệ sinh công viên."

💡 Phân tích cách dùng chuẩn của từ 「ひろう (拾う)」:
• Động từ 「ひろう」 mang nghĩa nhặt, lượm đồ vật bị rơi rớt ở dưới đất, mặt sàn lên.
• Cụm từ thông dụng nhất trong tiếng Nhật: 「ごみをひろう (nhặt rác)」.

🔍 Phân tích các phương án:
- 1. Sai từ: Lấy bản đồ từ trong cặp ra dùng động từ 「取り出す (とりだす)」 hoặc 「出す (だす)」.
- 2. Sai từ: Lấy chiếc hộp ở trên giá kệ xuống dùng động từ 「取る (とる)」.
- 3. Sai từ: Hái quả táo từ trên cành cây xuống dùng động từ 「もぐ」 hoặc 「摘む (つむ)」.
- 4. ĐÚNG: Nhặt rác trên mặt đất để làm sạch công viên (ごみをひろって、こうえんをそうじしています).

📄 Trích PDF gốc (试题解析 Trang 17):
(33) 4 ひろう 意思是“拾, 捡”, 选项 4 为正确应用。1. 持ち出す; 2. 取る; 3. 摘む; 4. 小学生们在公园捡垃圾, 打扫地面。"""
    },
    34: {
        "localPdfNumber": 34,
        "mondai": 5,
        "sectionType": "VOCAB",
        "text": "しょうたい (Cách dùng đúng của từ 招待)",
        "options": [
            "1. 119ばんに 電話して、きゅうきゅうしゃを いえに しょうたいして ください。",
            "2. ぶちょうに しょうたいされて、休みの 日に 会社に 行きました。",
            "3. 大学の こうはいを けっこんしきに しょうたいする つもりです。",
            "4. いしゃに しょうたいされて、あしたから にゅういんする ことに なりました。"
        ],
        "correctOption": 3,
        "snippet": "しょうたい (招待)",
        "explanation": """🎯 Đáp án đúng: [3] 大学の こうはいを けっこんしきに しょうたいする つもりです。

💬 Dịch nghĩa câu đúng:
"Tôi dự định sẽ mời các bạn hậu bối thời đại học đến tham dự lễ cưới của mình."

💡 Phân tích cách dùng chuẩn của từ 「しょうたい (招待)」:
• Danh từ/Động từ 「しょうたい（する）」 là mời, đón tiếp ai đó đến tham dự một buổi tiệc tùng, sự kiện trang trọng hay ngày vui mừng: 「[Ai đó] を [Sự kiện] に 招待する」.
• Mời bạn bè, hậu bối đến dự tiệc cưới: 「けっこんしきにしょうたいする」 là cách dùng chuẩn mực, trang trọng và chính xác tuyệt đối.

🔍 Phân tích các phương án:
- 1. Sai từ: Gọi xe cứu thương đến nhà dùng động từ 「呼ぶ (よぶ)」, không dùng しょうたい.
- 2. Sai từ: Trưởng phòng yêu cầu đi làm ngày nghỉ dùng 「要求する」 hoặc 「命じる / 言われて」.
- 3. ĐÚNG: Mời đàn em thời đại học tới dự đám cưới (大学のこうはいをけっこんしきにしょうたいするつもりです).
- 4. Sai từ: Bác sĩ chỉ định hoặc yêu cầu nhập viện dùng 「指示される」 hoặc 「言われて」.

📄 Trích PDF gốc (试题解析 Trang 17):
(34) 3 しょうたい 意思是“邀请, 款待”, 选项 3 为正确应用。1. 呼ぶ; 2. 要求する; 3. 打算邀请大学后辈参加我的婚礼。4. 注意する / 建议"""
    },
    35: {
        "localPdfNumber": 35,
        "mondai": 5,
        "sectionType": "VOCAB",
        "text": "わたす (Cách dùng đúng của từ 渡す)",
        "options": [
            "1. 毎日 にわの 花に 水を わたして います。",
            "2. この きっぷは、かいさつぐちを 出る とき、えきいんに わたして ください。",
            "3. この てがみを ポストに わたして きて ください。",
            "4. わたしは いつも こうちゃに さとうと ぎゅうにゅうを わたします。"
        ],
        "correctOption": 2,
        "snippet": "わたす (渡す)",
        "explanation": """🎯 Đáp án đúng: [2] この きっぷは、かいさつぐちを 出る とき、えきいんに わたして ください。

💬 Dịch nghĩa câu đúng:
"Chiếc vé này khi ra khỏi cửa soát vé, xin vui lòng đưa/trao cho nhân viên nhà ga."

💡 Phân tích cách dùng chuẩn của từ 「わたす (渡す)」:
• Tha động từ 「わたす」 mang nghĩa là trao tận tay, đưa trực tiếp một vật gì đó cho người khác: 「[Người] に [Đồ vật] を わたす」.
• Trao vé cho nhân viên ga: 「えきいんにわたしてください」 là cách dùng chuẩn mực nhất.

🔍 Phân tích các phương án:
- 1. Sai từ: Tưới nước cho cây hoa trong vườn dùng động từ 「やる」 hoặc 「あげる」 (水をやる).
- 2. ĐÚNG: Trao vé tận tay cho nhân viên nhà ga tại cửa soát vé (えきいんにわたしてください).
- 3. Sai từ: Bỏ thư vào thùng thư dùng động từ 「入れる (いれる)」 (ポストに入れる).
- 4. Sai từ: Cho đường và sữa vào trà dùng động từ 「入れる (いれる)」.

📄 Trích PDF gốc (试题解析 Trang 17):
(35) 2 わたす 意思是“交, 递”, 选项 2 为正确应用。1. やる; 2. 在出检票口时, 请将这张票递给车站的工作人员。3. 入れる; 4. 入れる"""
    }
}

def apply_vocab_updates():
    print(f"=== Applying 100% Authentic N4 2013-07 Vocab (Q1..35) ===")

    # 1. Update scanned_n4_2013_official_answers.json
    scanned_path = r"frontend/src/app/data/scanned_n4_2013_official_answers.json"
    if os.path.exists(scanned_path):
        with open(scanned_path, "r", encoding="utf-8") as f:
            scanned_data = json.load(f)
        ans = scanned_data.get("officialAnswers", {})
        for q_idx, item in N4_2013_VOCAB.items():
            ans[str(q_idx)] = item["correctOption"]
        with open(scanned_path, "w", encoding="utf-8") as f:
            json.dump(scanned_data, f, ensure_ascii=False, indent=2)
        print(f"Updated {len(N4_2013_VOCAB)} keys in {scanned_path} (e.g. Q10 -> 4)!")

    # 2. Update master_gold_explanations.json
    master_path = r"scripts/master_gold_explanations.json"
    if os.path.exists(master_path):
        with open(master_path, "r", encoding="utf-8") as f:
            master = json.load(f)
        if "n4-2013-07" not in master:
            master["n4-2013-07"] = {}
        target_dict = master["n4-2013-07"]
        for q_idx, item in N4_2013_VOCAB.items():
            s_key = str(q_idx)
            target_dict[s_key] = {
                "snippet": item["snippet"],
                "explanation": item["explanation"],
                "correctOption": item["correctOption"]
            }
        with open(master_path, "w", encoding="utf-8") as f:
            json.dump(master, f, ensure_ascii=False, indent=2)
        print(f"Updated {len(N4_2013_VOCAB)} vocab questions in {master_path}!")

    # 3. Update server_admin_exams.json and scratch/server_admin_exams.json
    for json_path in [
        r"frontend/src/app/data/server_admin_exams.json",
        r"scratch/server_admin_exams.json"
    ]:
        if os.path.exists(json_path):
            with open(json_path, "r", encoding="utf-8") as f:
                admin_data = json.load(f)
            exams = admin_data.get("exams", [])
            ex3 = next((e for e in exams if e.get("id") == "ex-3" or e.get("examCode") == "n4-2013-07"), None)
            if ex3 and ex3.get("versions"):
                v = ex3["versions"][0]
                qs = v.get("questions", {})
                updated_count = 0
                for q_idx, item in N4_2013_VOCAB.items():
                    s_key = str(q_idx)
                    if s_key not in qs:
                        qs[s_key] = {}
                    q_obj = qs[s_key]
                    q_obj["globalIndex"] = q_idx
                    q_obj["localPdfNumber"] = item["localPdfNumber"]
                    q_obj["sectionType"] = item["sectionType"]
                    q_obj["mondai"] = item["mondai"]
                    q_obj["text"] = item["text"]
                    q_obj["snippet"] = item["snippet"]
                    q_obj["options"] = item["options"]
                    q_obj["correctOption"] = item["correctOption"]
                    q_obj["correctAnswer"] = item["correctOption"]
                    q_obj["explanation"] = item["explanation"]
                    q_obj["optionText"] = f"Phương án [{item['correctOption']}]"
                    updated_count += 1
                with open(json_path, "w", encoding="utf-8") as f:
                    json.dump(admin_data, f, ensure_ascii=False, indent=2)
                print(f"Updated {updated_count} vocab questions in {json_path}!")

    # 4. Push to live running Next.js /api/jlpt-exams backend endpoint if online
    try:
        api_url = "http://localhost:3000/api/jlpt-exams"
        server_json = r"frontend/src/app/data/server_admin_exams.json"
        if os.path.exists(server_json):
            with open(server_json, "r", encoding="utf-8") as f:
                payload = json.load(f)
            payload["authoritativeOverwrite"] = True
            req = urllib.request.Request(
                api_url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=5) as response:
                res_code = response.getcode()
                print(f"Successfully synced with {api_url} (HTTP {res_code})")
    except Exception as e:
        print(f"Notice: /api/jlpt-exams sync: {e}")

if __name__ == "__main__":
    apply_vocab_updates()
