# -*- coding: utf-8 -*-
"""
Script to apply 100% authentic questions, answers, and explanations for JLPT N4 2013-07
Questions 36 to 70 (Section 2: 言語知識（文法）・読解)
Extracted directly from n4-2013-07.pdf:
- Page 14: Official answer sheet (参考答案)
- Pages 17 to 20: Official explanations (试题解析)
- Pages 5 to 10: Original exam booklet questions and options
"""

import json
import os
import urllib.request

N4_2013_GRAMMAR = {
    36: {
        "localPdfNumber": 1,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "母が 育てた トマト（　）ジュースを 作りました。",
        "options": ["1. で", "2. に", "3. へ", "4. や"],
        "correctOption": 1,
        "snippet": "トマトで作りました (Làm bằng nguyên liệu cà chua)",
        "explanation": """🎯 Đáp án đúng: [1] で

💬 Dịch nghĩa câu:
"Tôi đã làm nước ép từ những quả cà chua do chính mẹ tôi trồng."

💡 Phân tích & Giải thích ngữ pháp:
• Trợ từ 「で」 biểu thị nguyên liệu, chất liệu chế tạo tạo tác nên đồ vật: 「Danh từ (nguyên liệu) + で 作る」 (làm từ/bằng...).
• Ở đây, món nước ép được chế biến từ nguyên liệu cà chua do mẹ trồng: 「トマトで作りました」.

🔍 Phân tích các lựa chọn:
- 1. で: ĐÚNG - Biểu thị nguyên liệu chế biến (トマトで作りました).
- 2. に: Chỉ đích đến hoặc kết quả biến đổi (トマトにする).
- 3. へ: Chỉ phương hướng di chuyển.
- 4. や: Nối các danh từ mang tính liệt kê không đầy đủ.

📄 Trích PDF gốc (试题解析 Trang 17):
(1) 1 句意: 我用妈妈种的西红柿做了果汁。考察で表示动作或作用的手段、方法、材料等的用法, 意为“用……做某事”。"""
    },
    37: {
        "localPdfNumber": 2,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "この かばんは 軽いから、旅行（　）便利です。",
        "options": ["1. と", "2. を", "3. に", "4. の"],
        "correctOption": 3,
        "snippet": "旅行に便利 (Tiện lợi cho việc du lịch)",
        "explanation": """🎯 Đáp án đúng: [3] に

💬 Dịch nghĩa câu:
"Chiếc túi xách này vì rất nhẹ nên tiện lợi cho việc đi du lịch."

💡 Phân tích & Giải thích ngữ pháp:
• Cấu trúc biểu thị mục đích, phương diện hoặc tiêu chuẩn đánh giá: 「Danh từ / V-るの + に 便利だ / 役に立つ」 (tiện lợi, có ích cho việc gì).
• Ở đây chiếc túi nhẹ rất tiện lợi cho mục đích du lịch: 「旅行に便利です」.

🔍 Phân tích các lựa chọn:
- 1. と: Đi cùng với, và.
- 2. を: Đánh dấu tân ngữ của tha động từ.
- 3. に: ĐÚNG - Chỉ phương diện quy chiếu mục đích (旅行に便利).
- 4. の: Sở hữu hoặc định ngữ danh từ.

📄 Trích PDF gốc (试题解析 Trang 17):
(2) 3 句意: 这个包很轻, 所以旅行时很方便。考察に表示比较、判断的基准的用法。"""
    },
    38: {
        "localPdfNumber": 3,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "（教室で）先生「じゃあ、一人（　）じこしょうかいを して ください。」",
        "options": ["1. など", "2. ずつ", "3. しか", "4. も"],
        "correctOption": 2,
        "snippet": "一人ずつ (Từng người một)",
        "explanation": """🎯 Đáp án đúng: [2] ずつ

💬 Dịch nghĩa câu:
"(Trong phòng học) Thầy giáo: 'Nào, xin mời từng người một hãy tự giới thiệu bản thân nhé.'"`

💡 Phân tích & Giải thích ngữ pháp:
• Phó trợ từ 「～ずつ」 đứng sau số từ biểu thị sự phân chia đồng đều theo từng lượng, từng đơn vị: 「一人ずつ」 (từng người một, mỗi người một lượt).

🔍 Phân tích các lựa chọn:
- 1. など: Vân vân, chẳng hạn như.
- 2. ずつ: ĐÚNG - Biểu thị từng lượng một đều nhau (一人ずつ: từng người một).
- 3. しか: Chỉ (bắt buộc đi với động từ thể phủ định).
- 4. も: Cũng, đến mức.

📄 Trích PDF gốc (试题解析 Trang 17):
(3) 2 句意: (教室里)老师:“那么, 请大家一个一个地做下自我介绍吧。” 1. など: 等等, 之类; 2. ずつ: 每, 各; 3. しか: 只, 仅; 4. も: 也"""
    },
    39: {
        "localPdfNumber": 4,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "（料理教室で）先生「今日は だれ（　）かんたんに 作れる ケーキの 作り方を 教えます。」",
        "options": ["1. で", "2. は", "3. でも", "4. なら"],
        "correctOption": 3,
        "snippet": "だれでも (Bất kỳ ai cũng...)",
        "explanation": """🎯 Đáp án đúng: [3] でも

💬 Dịch nghĩa câu:
"(Tại lớp dạy nấu ăn) Giáo viên: 'Hôm nay tôi sẽ dạy các bạn cách làm một loại bánh kem mà bất kỳ ai cũng có thể làm được một cách dễ dàng.'"`

💡 Phân tích & Giải thích ngữ pháp:
• Từ nghi vấn + 「でも」: 「だれでも」 mang nghĩa toàn thể khẳng định: "bất kỳ ai cũng..., ai ai cũng...".
• Cụm định ngữ: 「だれでもかんたんに作れるケーキ」 (bánh kem mà ai cũng làm được dễ dàng).

🔍 Phân tích các lựa chọn:
- 1. で: Trợ từ phương tiện/địa điểm.
- 2. は: Đánh dấu chủ đề (だれは không tồn tại cấu trúc này).
- 3. でも: ĐÚNG - Từ để hỏi + でも biểu thị toàn thể khẳng định (だれでも: bất cứ ai).
- 4. なら: Nếu là (thường đi sau danh từ xác định).

📄 Trích PDF gốc (试题解析 Trang 17):
(4) 3 句意: (料理教室里)老师:“今天教大家一个谁都能成功的蛋糕简单制作方法。”考察でも接疑问词后表示全面肯定的用法, 意为“无论……, 不管……”。"""
    },
    40: {
        "localPdfNumber": 5,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "いっしょうけんめい 勉強して、（　）外国の 大学に 行きたいです。",
        "options": ["1. すっかり", "2. たぶん", "3. やっと", "4. いつか"],
        "correctOption": 4,
        "snippet": "いつか (Một ngày nào đó trong tương lai)",
        "explanation": """🎯 Đáp án đúng: [4] いつか

💬 Dịch nghĩa câu:
"Tôi sẽ cố gắng học tập hết mình và hy vọng một ngày nào đó có thể theo học tại một trường đại học nước ngoài."

💡 Phân tích & Giải thích ngữ pháp:
• Phó từ 「いつか」 mang nghĩa "một ngày nào đó", dùng để diễn tả ước nguyện, dự định ở một thời điểm chưa xác định trong tương lai (kết hợp tự nhiên với thể mong muốn ～たい).

🔍 Phân tích các lựa chọn:
- 1. すっかり: Hoàn toàn, sạch trơn (đã hoàn tất).
- 2. たぶん: Có lẽ, có thể (thường đi với đuôi phỏng đoán ～だろう / ～でしょう).
- 3. やっと: Cuối cùng thì (đi với kết quả đã đạt được sau nhiều gian nan).
- 4. いつか: ĐÚNG - Một ngày nào đó trong tương lai (いつか行きたい).

📄 Trích PDF gốc (试题解析 Trang 17):
(5) 4 句意: 拼尽全力学习, 希望有一天能考入国外的大学。1. すっかり: 完全; 2. たぶん: 大概; 3. やっと: 好不容易; 4. いつか: 总有一天"""
    },
    41: {
        "localPdfNumber": 6,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "今朝、ねぼうして しまったので、学校まで 走っていったが、（　）ちこくした。",
        "options": ["1. かならず", "2. ときどき", "3. そろそろ", "4. やはり"],
        "correctOption": 4,
        "snippet": "やはり (Quả nhiên là, rốt cuộc)",
        "explanation": """🎯 Đáp án đúng: [4] やはり

💬 Dịch nghĩa câu:
"Sáng nay do ngủ quên mất nên tôi đã chạy một mạch đến trường, thế nhưng rốt cuộc vẫn bị muộn học."

💡 Phân tích & Giải thích ngữ pháp:
• Phó từ 「やはり / やっぱり」: quả nhiên, rốt cuộc thì, đúng như dự đoán/lo sợ ban đầu. Mặc dù đã cố chạy hết sức nhưng kết quả vẫn bị muộn như lo ngại.

🔍 Phân tích các lựa chọn:
- 1. かならず (必ず): Nhất định, chắc chắn (thường dùng trong câu khẳng định/mệnh lệnh tương lai).
- 2. ときどき (時々): Thỉnh thoảng, đôi khi.
- 3. そろそろ: Sắp sửa, chuẩn bị đến lúc.
- 4. やはり: ĐÚNG - Quả nhiên, rốt cuộc thì vẫn (đúng như dự đoán).

📄 Trích PDF gốc (试题解析 Trang 17):
(6) 4 句意: 今天早上睡过头了, 虽然一路跑去了学校, 但还是迟到了。1. かならず: 一定, 肯定; 2. ときどき: 有时, 时常; 3. そろそろ: 慢慢, 渐渐; 4. やはり: 仍然, 还是"""
    },
    42: {
        "localPdfNumber": 7,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "（電話で）A「もしもし、これから（　）に 行くよ。」B「じゃあ、駅に 着いたら、電話を ください。私の 家は 駅から 遠いので、車で むかえに 行きます。」",
        "options": ["1. こっち", "2. そっち", "3. あっち", "4. どっち"],
        "correctOption": 2,
        "snippet": "そっち (Phía đằng chỗ bạn)",
        "explanation": """🎯 Đáp án đúng: [2] そっち

💬 Dịch nghĩa câu:
"(Nói chuyện điện thoại) A: 'Alo, bây giờ tớ sẽ đi sang chỗ cậu đấy.' - B: 'Thế thì khi nào đến ga hãy gọi cho tớ nhé. Nhà tớ xa ga nên tớ sẽ lái xe ra đón.'"`

💡 Phân tích & Giải thích ngữ pháp:
• Hệ thống chỉ từ vị trí Ko-So-A-Do:
  - 「こっち」: phía người nói.
  - 「そっち」: phía người nghe (phía đối phương).
  - 「あっち」: phía xa cả hai người.
• Trong cuộc gọi điện thoại, A nói đang đi tới địa điểm của B, nên bắt buộc dùng 「そっち」 (chỗ của cậu).

🔍 Phân tích các lựa chọn:
- 1. こっち: Phía người nói.
- 2. そっち: ĐÚNG - Phía đối phương/người nghe (đến chỗ của bạn).
- 3. あっち: Phía xa cả người nói lẫn người nghe.
- 4. どっち: Phía nào (từ để hỏi).

📄 Trích PDF gốc (试题解析 Trang 18):
(7) 2 句意: (电话里) A:“喂, 我现在去你那边。” B:“那你到车站后给我打电话吧。我家离车站很远, 我开车去接你。” 1. こっち: 这里(离说话人较近); 2. そっち: 那里(离听话人较近); 3. あっち: 那里(离说话人和听话人都远); 4. どっち: 哪里"""
    },
    43: {
        "localPdfNumber": 8,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "あしたは 朝、会議が あるから、（　）家を 出ます。",
        "options": ["1. 早くて", "2. 早く", "3. 早い", "4. 早いと"],
        "correctOption": 2,
        "snippet": "早く (Rời nhà sớm)",
        "explanation": """🎯 Đáp án đúng: [2] 早く

💬 Dịch nghĩa câu:
"Ngày mai vì buổi sáng có cuộc họp nên tôi sẽ rời nhà đi sớm."

💡 Phân tích & Giải thích ngữ pháp:
• Quy tắc biến đổi tính từ đuôi い bổ nghĩa cho động từ: đổi đuôi 「い」 thành 「く」.
• Tính từ 「早い (はやい - sớm)」 chuyển thành phó từ 「早く」 để bổ nghĩa cho động từ 「出ます」: 「早く家を出ます」 (rời nhà sớm).

🔍 Phân tích các lựa chọn:
- 1. 早くて: Thể て dùng nối vế câu, không bổ nghĩa trực tiếp cho động từ 出ます.
- 2. 早く: ĐÚNG - Dạng phó từ bổ nghĩa cho động từ (早く出ます).
- 3. 早い: Thể nguyên bản đứng trước danh từ, không đứng trước động từ.
- 4. 早いと: Dạng điều kiện, sai cấu trúc câu.

📄 Trích PDF gốc (试题解析 Trang 18):
(8) 2 句意: 明天早上要开会, 所以要早点出门。形容词修饰动词时, 词尾い需变成く。"""
    },
    44: {
        "localPdfNumber": 9,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "田中さんは 体が 大きくて こわそう（　）、本当は こわくありません。",
        "options": ["1. し", "2. だし", "3. だけれど", "4. けれど"],
        "correctOption": 3,
        "snippet": "こわそうだけれど (Trông dữ nhưng thực ra không đáng sợ)",
        "explanation": """🎯 Đáp án đúng: [3] だけれど

💬 Dịch nghĩa câu:
"Anh Tanaka vóc dáng to lớn trông có vẻ dữ dằn, thế nhưng thực ra anh ấy không hề đáng sợ chút nào."

💡 Phân tích & Giải thích ngữ pháp:
• Cụm từ 「こわそう」 là dạng phán đoán dáng vẻ bên ngoài của tính từ 怖い (bỏ い + そう), đóng vai trò ngữ pháp như một tính từ đuôi な.
• Khi nối hai vế câu mang nghĩa đối lập tương phản với liên từ 「けれど」, tính từ đuôi な cần thêm 「だ」: 「Tính từ đuôi な + だけれど」 -> 「こわそうだけれど」.

🔍 Phân tích các lựa chọn:
- 1. し / 2. だし: Biểu thị liệt kê đồng thuận, không phù hợp vì hai vế câu đối lập nhau.
- 3. だけれど: ĐÚNG - Hoàn thiện cấu trúc đối lập tương phản cho tính từ な (こわそうだけれど).
- 4. けれど: Thiếu だ (こわそう là tính từ な nên phải có だ đi kèm trước けれど).

📄 Trích PDF gốc (试题解析 Trang 18):
(9) 3 句意: 田中先生身材高大, 虽然看上去挺吓人, 但他其实并不可怕。し表示并列, 意为“既……又……”; けれど表示逆接, 意为“但是”。こわそう相当于な形容词词干, 需接だけれど。"""
    },
    45: {
        "localPdfNumber": 10,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "インターネットラジオを（　）ために、パソコンを 買いました。",
        "options": ["1. 聞きます", "2. 聞こう", "3. 聞く", "4. 聞ける"],
        "correctOption": 3,
        "snippet": "聞くために (Để nghe radio)",
        "explanation": """🎯 Đáp án đúng: [3] 聞く

💬 Dịch nghĩa câu:
"Tôi đã mua máy tính để nghe các chương trình radio trên Internet."

💡 Phân tích & Giải thích ngữ pháp:
• Cấu trúc mục đích ý chí có chủ đích: 「Động từ thể từ điển (V-る) + ために」 mang nghĩa "để làm gì...". Ở đây là để nghe đài: 「聞くために」.
• Động từ thể khả năng (聞ける) không kết hợp với ために (khả năng biểu thị trạng thái tự nhiên nên thường đi với ように).

🔍 Phân tích các lựa chọn:
- 1. 聞きます: Dạng lịch sự, không đứng trước ために.
- 2. 聞こう: Thể ý chí, sai ngữ pháp.
- 3. 聞く: ĐÚNG - V-る + ために (để nghe).
- 4. 聞ける: Động từ khả năng không dùng với ために.

📄 Trích PDF gốc (试题解析 Trang 18):
(10) 3 句意: 为了听网络广播, 买了电脑。考察句型～ために, 表示“为了……”, 前接动词时接动词的基本形。"""
    },
    46: {
        "localPdfNumber": 11,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "もらった りんごを ジャムに（　）食べました。",
        "options": ["1. して", "2. されて", "3. なって", "4. なれて"],
        "correctOption": 1,
        "snippet": "ジャムにして (Làm thành mứt rồi ăn)",
        "explanation": """🎯 Đáp án đúng: [1] して

💬 Dịch nghĩa câu:
"Tôi đã làm mứt từ những quả táo được cho rồi ăn."

💡 Phân tích & Giải thích ngữ pháp:
• Cấu trúc tác động nhân tạo làm biến đổi bản chất đồ vật: 「Danh từ + に する」 (làm cho thành / chế biến thành).
• Ở đây chủ ngữ "tôi" chủ động biến đổi táo thành mứt: 「ジャムにして食べました」.
• Ngược lại 「～になる」 chỉ sự biến đổi tự nhiên khách quan và không đi cùng với tha động từ có tân ngữ を.

🔍 Phân tích các lựa chọn:
- 1. して: ĐÚNG - Cấu trúc tác động chủ động AをBにする (làm thành mứt).
- 2. されて: Thể bị động, sai nghĩa.
- 3. なって: Biến đổi tự nhiên khách quan, không đi với りんごを.
- 4. なれて: Dạng khả năng.

📄 Trích PDF gốc (试题解析 Trang 18):
(11) 1 句意: 把收到的苹果做成果酱吃了。此处主语为“我”, 应使用主动态。にする多指人为意志使之产生变化, になる多指自然而然地发生变化, 此处“我”人为地把苹果做成了果酱, 应选择前者。"""
    },
    47: {
        "localPdfNumber": 12,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "最近、私は 仕事が いそがしくて、なかなか ともだちと（　）。",
        "options": ["1. 会える", "2. 会えない", "3. 会う", "4. 会った"],
        "correctOption": 2,
        "snippet": "なかなか会えない (Mãi mà không thể gặp)",
        "explanation": """🎯 Đáp án đúng: [2] 会えない

💬 Dịch nghĩa câu:
"Dạo gần đây do công việc bận rộn nên mãi mà tôi không thể gặp gỡ bạn bè được."

💡 Phân tích & Giải thích ngữ pháp:
• Cấu trúc kết hợp phó từ: 「なかなか + Động từ thể khả năng phủ định」 mang ý nghĩa "mãi mà không thể làm được việc gì".
• Động từ 会う (gặp gỡ) ở thể khả năng phủ định là 「会えない」: 「なかなか会えない」 (mãi mà không thể gặp bạn).

🔍 Phân tích các lựa chọn:
- 1. 会える: Thể khả năng khẳng định (sai vì なかなか trong ngữ cảnh này đi với phủ định).
- 2. 会えない: ĐÚNG - なかなか会えない (mãi mà không thể gặp gỡ).
- 3. 会う: Thể từ điển khẳng định.
- 4. 会った: Thể quá khứ.

📄 Trích PDF gốc (试题解析 Trang 18):
(12) 2 句意: 我最近工作很忙, 没空和朋友见面。考察动词的可能形。会う的可能形为会える, 句子表达了因为过于忙碌没法见朋友, 需要使用否定表达。"""
    },
    48: {
        "localPdfNumber": 13,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "山本「田中さん、元気が ありませんね。どう（　）か。」田中「ええ、かぜを ひきました。」",
        "options": ["1. でしょう", "2. なります", "3. します", "4. したんです"],
        "correctOption": 4,
        "snippet": "どうしたんですか (Có chuyện gì thế?)",
        "explanation": """🎯 Đáp án đúng: [4] したんです

💬 Dịch nghĩa câu:
"Yamamoto: 'Anh Tanaka, trông anh có vẻ không được khỏe nhỉ. Có chuyện gì thế anh?' - Tanaka: 'Vâng, tôi bị cảm lạnh rồi.'"`

💡 Phân tích & Giải thích ngữ pháp:
• Mẫu câu chào hỏi, quan tâm hỏi thăm tình hình người khác khi thấy điều bất thường: 「どうしたんですか (Đã xảy ra chuyện gì thế?)」.
• Sử dụng đuôi 「～んですか」 nhằm nhấn mạnh việc tìm hiểu lý do, nguyên nhân của biểu hiện mệt mỏi ở đối phương.

🔍 Phân tích các lựa chọn:
- 1. でしょう: Dùng để phỏng đoán, không dùng hỏi thăm trực tiếp.
- 2. なります: Làm sao trở thành.
- 3. します: Hỏi về kế hoạch (どうしますか: bạn định làm sao).
- 4. したんです: ĐÚNG - Mẫu câu chuẩn mực どうしたんですか (có chuyện gì xảy ra thế).

📄 Trích PDF gốc (试题解析 Trang 18):
(13) 4 句意: 山本:“田中, 你看起来很没精神啊。怎么了?” 田中:“嗯, 我感冒了。” 考察常用寒暄语, どうしたんですか常用于询问对方发生了什么事, 可理解为“你怎么了”。"""
    },
    49: {
        "localPdfNumber": 14,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "こども「ご飯 まだ？」母「うん。今から（　）だよ。」",
        "options": ["1. 作るところ", "2. 作って いるところ", "3. 作るとき", "4. 作って いるとき"],
        "correctOption": 1,
        "snippet": "今から作るところ (Giờ mới bắt đầu nấu)",
        "explanation": """🎯 Đáp án đúng: [1] 作るところ

💬 Dịch nghĩa câu:
"Con: 'Cơm vẫn chưa xong hả mẹ?' - Mẹ: 'Ừ. Giờ mẹ mới bắt đầu nấu đây này.'"`

💡 Phân tích & Giải thích ngữ pháp:
• Mẫu câu chỉ thời điểm diễn ra hành vi với ところ:
  - 「V-る + ところだ」: chuẩn bị, sắp sửa thực hiện hành động ngay lập tức (thường đi kèm 今から, これから).
  - 「V-ている + ところだ」: đang trong quá trình thực hiện hành động.
• Ở đây người mẹ nói 「今から (từ bây giờ)」 chứng tỏ hành động nấu nướng sắp sửa bắt đầu nên dùng 「作るところ」.

🔍 Phân tích các lựa chọn:
- 1. 作るところ: ĐÚNG - Đi với 今から biểu thị việc sắp sửa bắt đầu làm (今から作るところ).
- 2. 作っているところ: Đang nấu (mâu thuẫn với 今から).
- 3. 作るとき: Khi nấu.
- 4. 作っているとき: Trong khi đang nấu.

📄 Trích PDF gốc (试题解析 Trang 18):
(14) 1 句意: 孩子:“饭还没好吗?” 母亲:“嗯。我现在开始做。” ところ前接动词基本形表示“正要做某事”, 前接持续体表示“正在做某事”。由“今から”可知应选1。"""
    },
    50: {
        "localPdfNumber": 15,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "田中「木村さん、荷物が 重そうだね。（　）。」木村「ありがとうございます。」",
        "options": ["1. てつだいたいんですか", "2. てつだって くださいよ", "3. てつだったよ", "4. てつだおうか"],
        "correctOption": 4,
        "snippet": "てつだおうか (Để tớ giúp cậu nhé?)",
        "explanation": """🎯 Đáp án đúng: [4] てつだおうか

💬 Dịch nghĩa câu:
"Tanaka: 'Kimura ơi, hành lý trông nặng thế nhỉ. Để tớ giúp một tay nhé?' - Kimura: 'Cảm ơn cậu nhiều nhé.'"`

💡 Phân tích & Giải thích ngữ pháp:
• Cấu trúc đưa ra lời đề nghị giúp đỡ đối phương một cách thân mật, suồng sã: 「Động từ thể ý chí + か」 (V-おうか). Tương đương dạng lịch sự 「手伝いましょうか」.
• Thấy bạn mang đồ nặng nên chủ động ngỏ lời: 「手伝おうか」 (Để tớ giúp cậu nhé).

🔍 Phân tích các lựa chọn:
- 1. てつだいたいんですか: Hỏi đối phương có muốn giúp không (sai vai vế).
- 2. てつだってくださいよ: Nhờ đối phương giúp mình (ngược vai vế).
- 3. てつだったよ: Đã giúp rồi (sai thì).
- 4. てつだおうか: ĐÚNG - Chủ động đề nghị giúp đỡ thân mật (手伝おうか).

📄 Trích PDF gốc (试题解析 Trang 18):
(15) 4 句意: 田中:“木村, 你的行李好像很重啊。需要我帮忙吗?” 木村:“谢谢你。” 1. たいんですか: 想要……吗?; 2. てください: 请……; 3. た: 标志过去时; 4. おうか: 我来……吧。故选4。"""
    },

    # --- MONDAI 2: Star Questions (Q51 - Q55) ---
    51: {
        "localPdfNumber": 16,
        "mondai": 2,
        "sectionType": "GRAMMAR",
        "text": "れいぞうこに ___ ___ ★ ___ ので、食べました。",
        "options": ["1. ケーキが", "2. 父が", "3. 買って きた", "4. 残って いた"],
        "correctOption": 1,
        "snippet": "Dấu sao ★: ケーキが (Vị trí 3)",
        "explanation": """🎯 Đáp án đúng: [1] ケーキが (Vị trí dấu sao ★ là [1])

💬 Dịch nghĩa câu:
"Trong tủ lạnh vẫn còn thừa lại chiếc bánh kem mà bố mua về nên tôi đã ăn nó."

💡 Phân tích cấu trúc & Thứ tự sắp xếp câu:
• Mệnh đề định ngữ bổ nghĩa cho danh từ: 「父が 買って きた ケーキ」 (chiếc bánh kem bố đã mua về).
• Vị ngữ mô tả trạng thái còn lại trong tủ lạnh: 「ケーキが 残って いた」.
• Hoàn chỉnh câu: 「れいぞうこに [2. 父が] [3. 買って きた] [★ 1. ケーキが] [4. 残って いた] ので、食べました。」
• Vị trí dấu sao ★ rơi vào vị trí thứ 3: Phương án 1 (ケーキが).

🔍 Phân tích các vị trí:
- Vị trí 1: [2] 父が
- Vị trí 2: [3] 買って きた
- Vị trí 3 (★): [1] ケーキが (ĐÚNG)
- Vị trí 4: [4] 残って いた

📄 Trích PDF gốc (试题解析 Trang 18):
(16) 1 正确语序: れいぞうこに 2 父が 3 買って きた 1 ケーキが 4 残って いた ので、食べました。(冰箱里还有父亲买回来没吃完的蛋糕, 我吃掉了。)"""
    },
    52: {
        "localPdfNumber": 17,
        "mondai": 2,
        "sectionType": "GRAMMAR",
        "text": "大事な ___ ___ ★ ___ が かかって きた。",
        "options": ["1. 電話", "2. とちゅう", "3. 話の", "4. で"],
        "correctOption": 4,
        "snippet": "Dấu sao ★: で (Vị trí 3)",
        "explanation": """🎯 Đáp án đúng: [4] で (Vị trí dấu sao ★ là [4])

💬 Dịch nghĩa câu:
"Ngay giữa lúc đang nói câu chuyện quan trọng thì có một cuộc điện thoại gọi đến."

💡 Phân tích cấu trúc & Thứ tự sắp xếp câu:
• 「大事な + 話」: câu chuyện quan trọng.
• Mẫu câu chỉ hành động diễn ra giữa chừng: 「Danh từ + のとちゅうで」 (ngay giữa lúc...). Do đó ghép 「話の」 + 「とちゅう」 + 「で」.
• Đi với vị ngữ 「電話がかかってきた」 (có điện thoại gọi đến): 「で」 + 「電話」 + 「が かかって きた」.
• Hoàn chỉnh câu: 「大事な [3. 話の] [2. とちゅう] [★ 4. で] [1. 電話] が かかって きた。」
• Vị trí dấu sao ★ rơi vào vị trí thứ 3: Phương án 4 (で).

🔍 Phân tích các vị trí:
- Vị trí 1: [3] 話の
- Vị trí 2: [2] とちゅう
- Vị trí 3 (★): [4] で (ĐÚNG)
- Vị trí 4: [1] 電話

📄 Trích PDF gốc (试题解析 Trang 18):
(17) 4 正确语序: 大事な 3 話の 2 とちゅう 4 で 1 電話 が かかって きた。(正在说些重要的事, 电话响了。) ～とちゅうで 表示时间或场所的“中途”之意。"""
    },
    53: {
        "localPdfNumber": 18,
        "mondai": 2,
        "sectionType": "GRAMMAR",
        "text": "（学校で）先生「ろうかが ぬれて います。歩く ___ ___ ★ ___ して ください。」",
        "options": ["1. ように", "2. 注意", "3. ときは", "4. すべらない"],
        "correctOption": 1,
        "snippet": "Dấu sao ★: ように (Vị trí 3)",
        "explanation": """🎯 Đáp án đúng: [1] ように (Vị trí dấu sao ★ là [1])

💬 Dịch nghĩa câu:
"(Ở trường học) Thầy giáo: 'Hành lang đang bị ướt đấy. Khi đi lại các em hãy chú ý để không bị trượt ngã nhé.'"`

💡 Phân tích cấu trúc & Thứ tự sắp xếp câu:
• Mốc thời gian: 「歩くときは」: khi đi bộ, khi đi lại.
• Cấu trúc nhắc nhở, căn dặn: 「V-ない + ように + 注意する」 (chú ý sao cho không...). Ghép 「すべらない」 + 「ように」 + 「注意」 + 「して ください」.
• Hoàn chỉnh câu: 「歩く [3. ときは] [4. すべらない] [★ 1. ように] [2. 注意] して ください。」
• Vị trí dấu sao ★ rơi vào vị trí thứ 3: Phương án 1 (ように).

🔍 Phân tích các vị trí:
- Vị trí 1: [3] ときは
- Vị trí 2: [4] すべらない
- Vị trí 3 (★): [1] ように (ĐÚNG)
- Vị trí 4: [2] 注意

📄 Trích PDF gốc (试题解析 Trang 18):
(18) 1 正确语序: 先生「ろうかが ぬれて います。歩く 3 ときは 4 すべらない 1 ように 2 注意 して ください。」(老师:“走廊还是湿的, 大家走的时候注意不要滑倒。”) ～ように 此处表示劝告。"""
    },
    54: {
        "localPdfNumber": 19,
        "mondai": 2,
        "sectionType": "GRAMMAR",
        "text": "来週、会社の ___ ___ ★ ___ しました。",
        "options": ["1. 近くに", "2. する", "3. ことに", "4. ひっこしを"],
        "correctOption": 2,
        "snippet": "Dấu sao ★: する (Vị trí 3)",
        "explanation": """🎯 Đáp án đúng: [2] する (Vị trí dấu sao ★ là [2])

💬 Dịch nghĩa câu:
"Tôi đã quyết định sang tuần sau sẽ chuyển nhà về gần công ty."

💡 Phân tích cấu trúc & Thứ tự sắp xếp câu:
• 「会社の近くに」: về gần công ty.
• Cụm từ: 「ひっこしをする」 (chuyển nhà, dọn nhà).
• Cấu trúc quyết định hành vi: 「V-る + ことにする」 (quyết định làm gì). Ghép 「ひっこしを」 + 「する」 + 「ことに」 + 「しました」.
• Hoàn chỉnh câu: 「来週、会社の [1. 近くに] [4. ひっこしを] [★ 2. する] [3. ことに] しました。」
• Vị trí dấu sao ★ rơi vào vị trí thứ 3: Phương án 2 (する).

🔍 Phân tích các vị trí:
- Vị trí 1: [1] 近くに
- Vị trí 2: [4] ひっこしを
- Vị trí 3 (★): [2] する (ĐÚNG)
- Vị trí 4: [3] ことに

📄 Trích PDF gốc (试题解析 Trang 18):
(19) 2 正确语序: 来週、会社の 1 近くに 4 ひっこしを 2 する 3 ことに しました。(我下周要搬去公司附近。) ～ことにする 表示对将来行为的某种决定或决心。"""
    },
    55: {
        "localPdfNumber": 20,
        "mondai": 2,
        "sectionType": "GRAMMAR",
        "text": "北町に ___ ___ ★ ___ そうです。",
        "options": ["1. 和食の お店は", "2. 「さくら」と いう", "3. 有名だ", "4. ある"],
        "correctOption": 1,
        "snippet": "Dấu sao ★: 和食の お店は (Vị trí 3)",
        "explanation": """🎯 Đáp án đúng: [1] 和食の お店は (Vị trí dấu sao ★ là [1])

💬 Dịch nghĩa câu:
"Nghe nói quán ăn món Nhật mang tên Sakura nằm ở thị trấn phía Bắc rất nổi tiếng."

💡 Phân tích cấu trúc & Thứ tự sắp xếp câu:
• Mệnh đề định ngữ: 「北町にある」 (nằm ở thị trấn Kitamachi).
• Tên gọi: 「『さくら』という」 (có tên gọi là Sakura).
• Chủ ngữ cụm danh từ: 「和食のお店は」 (quán ăn món Nhật thì...).
• Vị ngữ truyền văn nghe nói: 「有名だ + そうです」 (nghe nói là nổi tiếng).
• Hoàn chỉnh câu: 「北町に [4. ある] [2. 「さくら」と いう] [★ 1. 和食の お店は] [3. 有名だ] そうです。」
• Vị trí dấu sao ★ rơi vào vị trí thứ 3: Phương án 1 (和食の お店は).

🔍 Phân tích các vị trí:
- Vị trí 1: [4] ある
- Vị trí 2: [2] 「さくら」と いう
- Vị trí 3 (★): [1] 和食の お店は (ĐÚNG)
- Vị trí 4: [3] 有名だ

📄 Trích PDF gốc (试题解析 Trang 18):
(20) 1 正确语序: 北町に 4 ある 2 「さくら」と いう 1 和食の お店は 3 有名だ そうです。(听说北町有家名为“樱花”的日料店很有名。) ～という 前后都接名词时, 可表示称为……, 名为……"""
    },

    # --- MONDAI 3: Text Grammar (Q56 - Q60) ---
    56: {
        "localPdfNumber": 21,
        "mondai": 3,
        "sectionType": "GRAMMAR",
        "text": "大学の 夏休みは 長いので、いろいろな ことを（　21　）。",
        "options": ["1. していたのです", "2. するようになりました", "3. しようと 思います", "4. する予定だからです"],
        "correctOption": 3,
        "snippet": "しようと 思います (Dự định làm nhiều điều)",
        "explanation": """🎯 Đáp án đúng: [3] しようと 思います

💬 Dịch nghĩa văn cảnh:
"Kỳ nghỉ hè của trường đại học rất dài nên tôi dự định sẽ làm nhiều điều khác nhau."

💡 Phân tích & Giải thích ngữ pháp:
• Cấu trúc thể hiện dự định, ý đồ của người nói: 「Động từ thể ý chí + と思う」 (V-ようと思う: dự định làm gì).
• Bài văn đang trình bày về kế hoạch kỳ nghỉ hè sắp tới nên chọn 「しようと思います」 là hoàn toàn phù hợp với ngữ cảnh.

🔍 Phân tích các lựa chọn:
- 1. していたのです: Đang làm trong quá khứ (sai thì, kỳ nghỉ hè chưa tới).
- 2. するようになりました: Đã trở nên làm gì (thay đổi thói quen).
- 3. しようと 思います: ĐÚNG - Dự định làm nhiều việc trong kỳ nghỉ hè (しようと思います).
- 4. する予定だからです: Vì là có dự định (thừa からです vì vế trước đã có ので).

📄 Trích PDF gốc (试题解析 Trang 18–19):
(21) 3 不久后, 作者就要迎来大学后的第一个暑假, 前文说“因为大学暑假假期很长”, 后文应该会接着说自己的假期计划。选项中“ようと思う”表示“打算做某事”, 符合此处句意。"""
    },
    57: {
        "localPdfNumber": 22,
        "mondai": 3,
        "sectionType": "GRAMMAR",
        "text": "夏休み（　22　）好きな本を たくさん 読む つもりです。",
        "options": ["1. には", "2. にも", "3. からも", "4. までは"],
        "correctOption": 1,
        "snippet": "夏休みには (Vào kỳ nghỉ hè thì)",
        "explanation": """🎯 Đáp án đúng: [1] には

💬 Dịch nghĩa văn cảnh:
"Vào kỳ nghỉ hè, tôi dự định sẽ đọc thật nhiều cuốn sách mà mình yêu thích."

💡 Phân tích & Giải thích ngữ pháp:
• Trợ từ 「には」: Trợ từ 「に」 đánh dấu mốc thời gian, kết hợp cùng trợ từ nhấn mạnh chủ đề 「は」 tạo thành 「夏休みには」 nhằm nhấn mạnh thời điểm nghỉ hè (ngược lại với thời gian đi học bận rộn không có lúc nào đọc).

🔍 Phân tích các lựa chọn:
- 1. には: ĐÚNG - Nhấn mạnh mốc thời gian thực hiện dự định (夏休みには).
- 2. にも: Cũng vào kỳ nghỉ (vế trước chưa nêu mốc thời gian tương đương nào).
- 3. からも: Cũng từ kỳ nghỉ hè.
- 4. までは: Cho đến tận kỳ nghỉ hè.

📄 Trích PDF gốc (试题解析 Trang 19):
(22) 1 作者表示因为上学时太忙所以没时间读自己喜欢的书, 打算在假期多读几本, 此处是要强调暑假这个时间。“には”表示在某个时间, は表示一种强调。"""
    },
    58: {
        "localPdfNumber": 23,
        "mondai": 3,
        "sectionType": "GRAMMAR",
        "text": "（　23　）、初めて アルバイトを します。兄が 働いている 花屋です。",
        "options": ["1. では", "2. それから", "3. たとえば", "4. ですから"],
        "correctOption": 2,
        "snippet": "それから (Thêm vào đó, tiếp theo)",
        "explanation": """🎯 Đáp án đúng: [2] それから

💬 Dịch nghĩa văn cảnh:
"Thêm vào đó / Tiếp theo, lần đầu tiên tôi sẽ đi làm thêm. Đó là một tiệm hoa nơi anh trai tôi đang làm việc."

💡 Phân tích & Giải thích ngữ pháp:
• Liên từ nối câu: Đoạn trên tác giả nêu kế hoạch thứ nhất là đọc sách (まず、本を読みます). Sang đoạn này tác giả bổ sung thêm một kế hoạch thứ hai là đi làm thêm.
• Từ nối mang tính bổ sung, liệt kê tiếp nối kế hoạch: 「それから」 (tiếp đó, ngoài ra).

🔍 Phân tích các lựa chọn:
- 1. では: Vậy thì, thế thì.
- 2. それから: ĐÚNG - Bổ sung kế hoạch tiếp theo (sau đó, thêm vào đó).
- 3. たとえば: Ví dụ như (đây là kế hoạch làm thêm mới, không phải ví dụ của việc đọc sách).
- 4. ですから: Vì vậy, do đó (không có mối quan hệ nhân quả).

📄 Trích PDF gốc (试题解析 Trang 19):
(23) 2 本段说明了作者的另一项计划, 即在假期做兼职, 与上一段为并列关系。1. では: 那么; 2. それから: 其次; 3. たとえば: 例如; 4. ですから: 所以"""
    },
    59: {
        "localPdfNumber": 24,
        "mondai": 3,
        "sectionType": "GRAMMAR",
        "text": "兄に しょうかいして（　24　）、初めてなので 少し 心配ですが、がんばります。",
        "options": ["1. くれました", "2. あげました", "3. もらいました", "4. やりました"],
        "correctOption": 3,
        "snippet": "兄に紹介してもらいました (Được anh trai giới thiệu giúp)",
        "explanation": """🎯 Đáp án đúng: [3] もらいました

💬 Dịch nghĩa văn cảnh:
"Tôi được anh trai giới thiệu cho, vì là lần đầu đi làm nên tôi có hơi lo một chút nhưng tôi sẽ cố gắng."

💡 Phân tích & Giải thích ngữ pháp:
• Ngữ pháp cho nhận: Vế trước có 「兄に」 (người thực hiện hành động giúp đỡ đi với に), và đối tượng nhận ơn huệ là người nói (tôi).
• Cấu trúc chuẩn xác: 「[Người khác] に + V-て + もらう」 (được ai đó làm việc gì cho mình) -> 「兄に紹介してもらいました」.

🔍 Phân tích các lựa chọn:
- 1. くれました: Đi với trợ từ が (兄が紹介してくれました).
- 2. あげました: Tôi làm cho anh trai (ngược hướng hành động).
- 3. もらいました: ĐÚNG - 兄に紹介してもらいました (được anh trai giới thiệu việc cho).
- 4. やりました: Dùng cho cấp dưới hoặc động vật.

📄 Trích PDF gốc (试题解析 Trang 19):
(24) 3 此处是哥哥把我介绍给了自己工作的花店, 我是获得帮助的一方, 此处省略了主语“我”。此处前接的是授予者, 可知此处需用表示我(方)从他人处得到某事物的“もらう”。"""
    },
    60: {
        "localPdfNumber": 25,
        "mondai": 3,
        "sectionType": "GRAMMAR",
        "text": "いろいろな 経験を して、初めての 夏休みを（　25　）。",
        "options": ["1. 楽しむそうです", "2. 楽しんで います", "3. 楽しむようです", "4. 楽しみたいです"],
        "correctOption": 4,
        "snippet": "楽しみたいです (Muốn tận hưởng kỳ nghỉ)",
        "explanation": """🎯 Đáp án đúng: [4] 楽しみたいです

💬 Dịch nghĩa văn cảnh:
"Tôi muốn trải nghiệm thật nhiều điều để tận hưởng kỳ nghỉ hè đầu tiên thời đại học này."

💡 Phân tích & Giải thích ngữ pháp:
• Thể hiện nguyện vọng, mong muốn thiết tha của tác giả trước khi bước vào kỳ nghỉ: sử dụng đuôi nguyện vọng 「～たい (～たいです)」 (muốn làm gì).
• Câu kết bài: 「楽しみたいです」 (tôi muốn tận hưởng trọn vẹn) thể hiện trọn vẹn tinh thần bài văn.

🔍 Phân tích các lựa chọn:
- 1. 楽しむそうです: Nghe nói sẽ tận hưởng (truyền văn, không dùng cho mong muốn bản thân).
- 2. 楽しんでいます: Đang tận hưởng (kỳ nghỉ hè chưa diễn ra).
- 3. 楽しむようです: Dường như sẽ tận hưởng (suy đoán khách quan).
- 4. 楽しみたいです: ĐÚNG - Thể hiện nguyện vọng cá nhân (楽しみたいです).

📄 Trích PDF gốc (试题解析 Trang 19):
(25) 4 作者表示希望自己能好好享受大学后的第一个暑假, 此处表示作者的一种期望, “たい”常用于表示说话人想实现某种行为的强烈愿望, 最符合此处的文意。"""
    },

    # --- MONDAI 4: Short Reading (Q61 - Q64) ---
    61: {
        "localPdfNumber": 26,
        "mondai": 4,
        "sectionType": "GRAMMAR",
        "text": "魚の切手をはるのは、どうしてですか。",
        "options": [
            "1. 手紙に、海に関係があることを書いたから",
            "2. 魚の切手を集めることが趣味だから",
            "3. 手紙を読む人が、海が好きだから",
            "4. 魚の切手はとてもきれいだから"
        ],
        "correctOption": 1,
        "snippet": "Lý do dán tem hình con cá",
        "explanation": """🎯 Đáp án đúng: [1] 手紙に、海に関係があることを書いたから

💬 Dịch nghĩa câu hỏi & Tìm câu then chốt trong bài đọc:
• Câu hỏi: "Tại sao người viết lại dán con tem hình con cá?"
• Câu then chốt đoạn văn (Trang 7):
  「手紙を出すときは、書いたことに関係がある切手を選んで、封筒にはります。例えば、海で泳いだことを書いたときは、魚の切手をはります。」
  (Khi gửi thư, tôi chọn con tem có liên quan đến nội dung đã viết trong thư để dán vào phong bì. Chẳng hạn, khi viết về việc bơi ở biển, tôi sẽ dán con tem hình con cá).
• Vì vậy, dán tem hình con cá là vì trong thư đã viết nội dung liên quan đến biển (海に関係があることを書いたから).

🔍 Phân tích các lựa chọn:
- 1. ĐÚNG - Khớp chính xác với: 海で泳いだことを書いたときは、魚の切手をはります.
- 2. Sai vì sở thích là sưu tầm tem đẹp nói chung, không giải thích lý do dán tem cá.
- 3. Sai vì bài đọc không nhắc người nhận thích biển.
- 4. Sai vì tem đẹp chỉ là đặc điểm chung của bộ sưu tập.

📄 Trích PDF gốc (试题解析 Trang 19):
(26) 1 关键内容在文章的第二句。作者表示他在写信时, 会选择使用与信件内容相关的邮票。故选1。"""
    },
    62: {
        "localPdfNumber": 27,
        "mondai": 4,
        "sectionType": "GRAMMAR",
        "text": "このメモを読んで。真一さんがしなければならないことは何ですか。",
        "options": [
            "1. お母さんが帰る前に、ピザ屋でピザを食べます。",
            "2. ピザ屋に行って、8時ごろまでに家に帰ります。",
            "3. ピザ屋が来たら、封筒の中にあるお金を払います。",
            "4. お母さんが帰るまで、ピザを食べないで待ちます。"
        ],
        "correctOption": 3,
        "snippet": "Việc Shin'ichi phải làm sau khi đọc giấy nhắn",
        "explanation": """🎯 Đáp án đúng: [3] ピザ屋が来たら、封筒の中にあるお金を払います。

💬 Dịch nghĩa câu hỏi & Tìm câu then chốt trong tờ ghi chú:
• Câu hỏi: "Đọc mảnh giấy nhắn này, việc Shin'ichi bắt buộc phải làm là gì?"
• Mảnh giấy của người mẹ dặn dò (Trang 7):
  「7時ごろ、ピザ屋さんがピザを持ってくるので、封筒の中のお金を渡してください。ピザを食べて、待っていてください。」
  (Khoảng 7 giờ nhân viên giao pizza sẽ mang bánh tới, con hãy đưa tiền trong phong bì cho họ nhé. Con hãy ăn pizza rồi đợi mẹ nhé).
• Do đó việc Shin'ichi phải làm là trả tiền trong phong bì khi nhân viên giao pizza đến (ピザ屋が来たら、封筒の中にあるお金を払います).

🔍 Phân tích các lựa chọn:
- 1. Sai vì ăn pizza tại nhà chứ không phải ra tiệm bánh.
- 2. Sai vì nhân viên giao bánh đến nhà, Shin'ichi không phải ra ngoài.
- 3. ĐÚNG - Trả tiền trong phong bì khi nhân viên giao bánh tới.
- 4. Sai vì người mẹ bảo con ăn pizza trước đi (ピザを食べて、待っていてください).

📄 Trích PDF gốc (试题解析 Trang 19):
(27) 3 根据留言内容可知, 真一的母亲在回家前要去爷爷家一趟, 8点左右才能到家。所以她给真一点了晚餐, 并把晚餐的费用放在了旁边的信封里, 让真一收到外卖后把信封内的钱付给对方。"""
    },
    63: {
        "localPdfNumber": 28,
        "mondai": 4,
        "sectionType": "GRAMMAR",
        "text": "日本で働きたい理由について、どんなことがわかりますか。",
        "options": [
            "1. 日本語が上手になりたいから、という人が一番多い。",
            "2. 日本の技術を勉強したいから、という人が二番目に多い。",
            "3. 日本にずっと住みたいから、という人は5人だった。",
            "4. お金をたくさんもらえるから、という人は三番目に多い。"
        ],
        "correctOption": 2,
        "snippet": "Lý do du học sinh muốn làm việc tại Nhật",
        "explanation": """🎯 Đáp án đúng: [2] 日本の技術を勉強したいから、という人が二番目に多い。

💬 Dịch nghĩa câu hỏi & Đối chiếu số liệu trong bài đọc:
• Câu hỏi: "Về lý do muốn làm việc tại Nhật Bản, ta có thể hiểu được điều gì?"
• Thứ hạng các lý do trong bài khảo sát (Trang 7):
  1. Hạng nhất (一番多かった): Muốn làm công việc sử dụng tiếng Nhật (日本語を使う仕事がしたい).
  2. Hạng nhì (次は): Muốn vừa làm vừa học kỹ thuật của Nhật Bản (日本の技術を勉強したい).
  3. Hạng ba (三番目): Muốn sống lâu dài ở Nhật (日本にずっと住みたい).
  4. Ít nhất (一番少なくて, 5人): Nhận được nhiều tiền lương (お金がたくさんもらえる).
• Đối chiếu phương án [2]: Người muốn học kỹ thuật Nhật Bản đứng thứ hai (日本の技術を勉強したいから、という人が二番目に多い) -> Hoàn toàn chuẩn xác!

🔍 Phân tích các lựa chọn:
- 1. Sai vì hạng nhất là muốn dùng tiếng Nhật làm việc, không phải muốn giỏi tiếng Nhật.
- 2. ĐÚNG - Đứng thứ hai là lý do muốn học hỏi kỹ thuật của Nhật Bản.
- 3. Sai vì 5 người là lý do nhận nhiều tiền, không phải định cư.
- 4. Sai vì kiếm nhiều tiền là lý do ít nhất (hạng 4), không phải hạng 3.

📄 Trích PDF gốc (试题解析 Trang 19):
(28) 2 关键内容在文章的第二段, 由第二段可知, 排在第一的理由是想做使用日语的工作, 排在第二的是想在工作过程中学习日本的技术, 排在第三的是想在日本久居, 排在最后的是想多赚些钱。"""
    },
    64: {
        "localPdfNumber": 29,
        "mondai": 4,
        "sectionType": "GRAMMAR",
        "text": "このメールを見て、チンさんはどうしなければなりませんか。",
        "options": [
            "1. 8月15日までに石田先生に作文を送って、9月3日までに直しておきます。",
            "2. 8月15日までに石田先生に作文を送って、9月15日までに直しておきます。",
            "3. 8月31日までに石田先生に作文を送って、9月3日までに直しておきます。",
            "4. 8月31日までに石田先生に作文を送って、9月15日までに直しておきます。"
        ],
        "correctOption": 4,
        "snippet": "Lịch nộp và sửa bài văn của bạn Chin",
        "explanation": """🎯 Đáp án đúng: [4] 8月31日までに石田先生に作文を送って、9月15日までに直しておきます。

💬 Dịch nghĩa câu hỏi & Phân tích lịch trình trong email:
• Câu hỏi: "Đọc email này, bạn Chin bắt buộc phải làm như thế nào?"
• Chi tiết các mốc thời gian trong email thầy Ishida (Trang 7):
  1. Hạn gửi bài luận cho thầy: 「8月中に私にメールで送ってください」 -> Trong tháng 8 (tức trước ngày cuối tháng: 8月31日までに).
  2. Thầy đi công tác nước ngoài: từ ngày 3 tháng 9 đến ngày 15 tháng 9 (9月3日から15日まで).
  3. Thầy sửa trước khi đi (trước 9/3) và yêu cầu Chin chỉnh sửa xong trước khi thầy trở về nước: 「私が戻るまでに直しておいてください」 -> Thầy về ngày 15/9 nên hạn sửa bài là trước ngày 15 tháng 9 (9月15日までに直しておきます).
• Kết hợp 2 mốc thời gian: Gửi bài trước 31/8 và sửa chữa xong trước 15/9 (8月31日までに石田先生に作文を送って、9月15日までに直しておきます).

🔍 Phân tích các lựa chọn:
- 1, 2: Sai mốc gửi bài 8月15日 (thầy yêu cầu 8月中 = trước 31/8).
- 3: Sai mốc sửa bài (9月3日 là ngày thầy khởi hành đi công tác).
- 4. ĐÚNG - Gửi bài trước 31/8 và sửa bài xong trước 15/9.

📄 Trích PDF gốc (试题解析 Trang 19):
(29) 4 根据邮件正文内容可知, 石田老师9月3日到15日要去国外, 希望小陈能在八月内把作文发给他(8月31日之前), 他会在离开前发送检查后的文件, 希望小陈在他回来之前完成修改(9月15日之前)。故选4。"""
    },

    # --- MONDAI 5: Medium Reading (Q65 - Q68) ---
    65: {
        "localPdfNumber": 30,
        "mondai": 5,
        "sectionType": "GRAMMAR",
        "text": "「わたし」は 10 歳のとき、母の誕生日プレゼントをどうやって選びましたか。",
        "options": [
            "1. 自分一人で選びました。",
            "2. 姉と一緒に選びました。",
            "3. 姉に何がいいか聞いて選びました。",
            "4. 母に何がいいか聞いて選びました。"
        ],
        "correctOption": 1,
        "snippet": "Cách chọn quà sinh nhật mẹ năm 10 tuổi",
        "explanation": """🎯 Đáp án đúng: [1] 自分一人で選びました。

💬 Dịch nghĩa câu hỏi & Vị trí thông tin trong bài đọc:
• Câu hỏi: "Năm 10 tuổi, nhân vật 'tôi' đã chọn quà sinh nhật cho mẹ như thế nào?"
• Câu then chốt đoạn 2 (Trang 8):
  「10歳になって、母の誕生日プレゼントについて姉と話しているとき、姉が『今年は一人で選んでみる？』と言いました。わたしはびっくりしましたが、少し考えてから『うん。』と答えました。そして、プレゼントを選びに、一人で本屋に行ったり、花屋に行ったりしました。」
  (Đến năm 10 tuổi, khi bàn với chị về quà tặng mẹ, chị bảo: "Năm nay em thử tự mình chọn xem sao?". Tôi giật mình, nhưng suy nghĩ một lúc rồi đáp "Vâng". Thế rồi tôi tự một mình đi hiệu sách, đi tiệm hoa để chọn quà).
• Như vậy tác giả đã tự một mình chọn quà (自分一人で選びました).

🔍 Phân tích các lựa chọn:
- 1. ĐÚNG - Tự một mình đi chọn quà (一人で選んでみる -> うん -> 自分一人で選びました).
- 2. Sai vì các năm trước mới cùng chọn với chị gái.
- 3. Sai vì không hỏi chị nên chọn cái gì mà tự đi tìm chọn.
- 4. Sai vì muốn tặng bất ngờ cho mẹ nên không hỏi mẹ.

📄 Trích PDF gốc (试题解析 Trang 19):
(30) 1 关键句是“しかし 10 歳になって、母の誕生日プレゼントについて姉と話しているとき、姉が「今年は一人で選んでみる？」と言いました。わたしはびっくりしましたが、少し考えてから「うん。」と答えました。”, 姐姐在“我”十岁时提出让“我”自己买礼物, “我”答应了。故选1。"""
    },
    66: {
        "localPdfNumber": 31,
        "mondai": 5,
        "sectionType": "GRAMMAR",
        "text": "「わたし」は母に何をプレゼントしましたか。",
        "options": [
            "1. 本",
            "2. 花",
            "3. 花の絵",
            "4. ハンカチ"
        ],
        "correctOption": 4,
        "snippet": "Món quà tác giả tặng mẹ",
        "explanation": """🎯 Đáp án đúng: [4] ハンカチ

💬 Dịch nghĩa câu hỏi & Vị trí thông tin trong bài đọc:
• Câu hỏi: "Nhân vật 'tôi' đã tặng cho mẹ món quà gì?"
• Câu then chốt đoạn 3 (Trang 8):
  「母の誕生日の前の日曜日に、わたしはスーパーに行って、ハンカチを一枚買いました。母の好きな花の絵がかいてあるハンカチでした。」
  (Vào ngày chủ nhật trước sinh nhật mẹ, tôi đã đến siêu thị và mua một chiếc khăn tay. Đó là chiếc khăn tay có vẽ bông hoa mà mẹ yêu thích).
• Món quà thực tế được mua tặng là chiếc khăn tay (ハンカチ), trên khăn có in hình bông hoa.

🔍 Phân tích các lựa chọn:
- 1. 本: Cuốn sách (sai, chỉ ghé vào hiệu sách xem).
- 2. 花: Hoa tươi (sai, chỉ ghé vào tiệm hoa xem).
- 3. 花の絵: Bức tranh hoa (sai, hoa chỉ là họa tiết in trên khăn tay).
- 4. ハンカチ: Chiếc khăn tay (ĐÚNG).

📄 Trích PDF gốc (试题解析 Trang 19):
(31) 4 关键句是“母の誕生日の前の日曜日に、わたしはスーパーに行って、ハンカチを一枚買いました。”, 可知作者最终选择了手帕作为礼物。"""
    },
    67: {
        "localPdfNumber": 32,
        "mondai": 5,
        "sectionType": "GRAMMAR",
        "text": "安心しましたとありますが。どうしてですか。",
        "options": [
            "1. スーパーでハンカチが見つけられたから",
            "2. 姉がプレゼントをきれいだとほめてくれたから",
            "3. 母がプレゼントを喜んでくれたから",
            "4. 姉が「よかったね。」と言ってくれたから"
        ],
        "correctOption": 3,
        "snippet": "Lý do tác giả thấy nhẹ nhõm, an tâm",
        "explanation": """🎯 Đáp án đúng: [3] 母がプレゼントを喜んでくれたから

💬 Dịch nghĩa câu hỏi & Vị trí thông tin trong bài đọc:
• Câu hỏi: "Trong bài có câu 'Tôi đã thấy an tâm / nhẹ nhõm', tại sao lại như vậy?"
• Câu then chốt đoạn 3 (Trang 8):
  「母が喜んでくれるかどうか心配でしたが、母はハンカチを見て『とてもきれいね。ありがとう。』と言いました。わたしはとても安心しました。」
  (Tôi đã rất lo lắng không biết mẹ có vui lòng thích món quà không, nhưng khi nhìn thấy chiếc khăn tay, mẹ đã khen: "Đẹp quá con à. Mẹ cảm ơn con nhé". Tôi đã cảm thấy vô cùng yên tâm/nhẹ nhõm).
• Tác giả an tâm là vì mẹ đã vui vẻ đón nhận và thích món quà (母がプレゼントを喜んでくれたから).

🔍 Phân tích các lựa chọn:
- 1. Sai vì tìm được khăn tay ở siêu thị chưa giải tỏa được nỗi lo mẹ có thích không.
- 2. Sai vì lời khen của chị không phải nguyên nhân trực tiếp làm tác giả trút bỏ lo lắng.
- 3. ĐÚNG - Mẹ vui vẻ nhận quà và khen đẹp (母が喜んでくれたから).
- 4. Sai vì câu nói của chị gái diễn ra sau khi mẹ đã khen.

📄 Trích PDF gốc (试题解析 Trang 19):
(32) 3 关键句是“母が喜んでくれるかどうか心配でしたが、母はハンカチを見て「とてもきれいね。ありがとう。」と言いました。”, 可知作者担心母亲会不会不喜欢自己的礼物, 母亲表示喜欢后, 作者便放心了。"""
    },
    68: {
        "localPdfNumber": 33,
        "mondai": 5,
        "sectionType": "GRAMMAR",
        "text": "この文章で、「わたし」が一番言いたかったことは何ですか。",
        "options": [
            "1. 初めて一人で買い物ができて、とても楽しかったこと",
            "2. プレゼントがなかなか選べなくて、困ったこと",
            "3. 自分が少し大人になったと思えて、うれしかったこと",
            "4. 母がプレゼントを喜んでくれるかどうか、心配だったこと"
        ],
        "correctOption": 3,
        "snippet": "Điều tác giả muốn truyền đạt nhất qua bài văn",
        "explanation": """🎯 Đáp án đúng: [3] 自分が少し大人になったと思えて、うれしかったこと

💬 Dịch nghĩa câu hỏi & Chủ đề chính của toàn bài viết:
• Câu hỏi: "Trong bài văn này, điều nhân vật 'tôi' muốn nói nhất là gì?"
• Mở bài và kết bài bài viết gắn kết trực tiếp với nhau (Trang 8):
  - Đoạn mở đầu: 「わたしが、初めて自分が少し大人になったと思ったのは、10歳のときでした。とてもうれしかったことを今でもよく覚えています。」 (Lần đầu tiên tôi cảm thấy mình đã lớn thêm một chút là năm 10 tuổi. Tôi vẫn nhớ như in cảm xúc vui sướng khi ấy).
  - Đoạn kết bài: 「もう子どもじゃないと思ったときの思い出です。」 (Đó là kỷ niệm khi tôi cảm thấy mình không còn là một đứa trẻ con nữa).
• Cả bài văn hướng về cảm xúc vui sướng, tự hào khi cảm nhận được sự trưởng thành của chính mình (自分が少し大人になったと思えて、うれしかったこと).

🔍 Phân tích các lựa chọn:
- 1. Sai vì bài viết không tập trung vào niềm vui khi đi mua sắm.
- 2. Sai vì sự phân vân khi chọn quà chỉ là chi tiết phụ.
- 3. ĐÚNG - Cảm giác vui sướng khi cảm nhận bản thân đã trưởng thành hơn một chút.
- 4. Sai vì lo lắng mẹ thích quà hay không chỉ là tâm trạng nhất thời.

📄 Trích PDF gốc (试题解析 Trang 19):
(33) 3 文章首尾呼应, 首段便说明了文中这件事让他觉得自己长大了, 末段又提到这一点, 可知文章的重点落在“成长”二字之上。故选3。"""
    },

    # --- MONDAI 6: Information Retrieval (Q69 - Q70) ---
    69: {
        "localPdfNumber": 34,
        "mondai": 6,
        "sectionType": "GRAMMAR",
        "text": "住むところについて相談できるのはいつですか。",
        "options": [
            "1. 火曜日の午前か木曜日の午前",
            "2. 火曜日の午前か木曜日の夜",
            "3. 木曜日の午後か土曜日の午前",
            "4. 木曜日の午後か土曜日の夜"
        ],
        "correctOption": 2,
        "snippet": "Thời gian tư vấn về nơi ở (住むところ)",
        "explanation": """🎯 Đáp án đúng: [2] 火曜日の午前か木曜日の夜

💬 Dịch nghĩa câu hỏi & Tra cứu bảng thông báo A:
• Câu hỏi: "Thời gian có thể đến tư vấn về nơi ở (住むところ) là khi nào?"
• Tra cứu bảng thông báo A (Trang 9) tại dòng 「住むところ・病院」:
  - Cột buổi sáng (午前 10:00 ~ 12:00): Hàng thứ ba (火).
  - Cột buổi tối (夜 18:00 ~ 20:00): Hàng thứ năm (木).
• Như vậy có thể tư vấn vào sáng thứ ba hoặc tối thứ năm (火曜日の午前か木曜日の夜).

🔍 Phân tích các lựa chọn:
- 1. Sai vì thứ năm là buổi tối (夜 18:00~20:00), không phải buổi sáng.
- 2. ĐÚNG - Sáng thứ ba hoặc tối thứ năm (火曜日の午前か木曜日の夜).
- 3, 4: Sai các ngày khác không có lịch tư vấn nơi ở.

📄 Trích PDF gốc (试题解析 Trang 19):
(34) 2 根据A中的表格可知, 可在每周二上午和每周四晚上商谈关于住所的事情。故选2。"""
    },
    70: {
        "localPdfNumber": 35,
        "mondai": 6,
        "sectionType": "GRAMMAR",
        "text": "リーさんは国際結婚について相談をしたいと思っています。今週と来週で、いつ相談ができますか。",
        "options": [
            "1. 9 日の午後",
            "2. 10 日の午前",
            "3. 16 日の午後",
            "4. 17 日の午前"
        ],
        "correctOption": 4,
        "snippet": "Thời gian bạn Lee có thể đi tư vấn kết hôn quốc tế",
        "explanation": """🎯 Đáp án đúng: [4] 17 日の午前

💬 Dịch nghĩa câu hỏi & Đối chiếu kết hợp 2 bảng thông tin:
• Câu hỏi: "Anh Lee muốn được tư vấn về thủ tục kết hôn quốc tế (国際結婚). Trong tuần này và tuần sau, anh ấy có thể đi tư vấn vào lúc nào?"
• Lịch tư vấn kết hôn quốc tế tại Văn phòng A (Trang 9):
  - Chiều thứ sáu (午後 14:00 ~ 16:00).
  - Sáng thứ bảy (午前 10:00 ~ 12:00).
• Đối chiếu lịch trình làm việc của anh Lee tại Bảng B (Trang 9):
  - Ngày 9 (Thứ sáu tuần này): Lee bận làm việc 14:00 ~ 21:00 (trùng giờ tư vấn chiều) -> KHÔNG ĐI ĐƯỢC.
  - Ngày 10 (Thứ bảy tuần này): Lee bận làm việc 9:00 ~ 15:00 (trùng giờ tư vấn sáng) -> KHÔNG ĐI ĐƯỢC.
  - Ngày 16 (Thứ sáu tuần sau): Lee bận làm việc 9:00 ~ 17:00 (trùng giờ tư vấn chiều) -> KHÔNG ĐI ĐƯỢC.
  - Ngày 17 (Thứ bảy tuần sau): Lee làm việc ca chiều tối 14:00 ~ 21:00. Buổi sáng 10:00 ~ 12:00 anh Lee hoàn toàn rảnh rỗi -> CÓ THỂ ĐI TƯ VẤN ĐƯỢC!
• Kết luận: Buổi duy nhất anh Lee có thể đến tư vấn là sáng thứ bảy ngày 17 (17日の午前).

🔍 Phân tích các lựa chọn:
- 1. Ngày 9 chiều: Vướng ca làm việc (14:00 ~ 21:00).
- 2. Ngày 10 sáng: Vướng ca làm việc (9:00 ~ 15:00).
- 3. Ngày 16 chiều: Vướng ca làm việc (9:00 ~ 17:00).
- 4. Ngày 17 sáng: ĐÚNG - Buổi sáng rảnh rỗi, ca làm việc bắt đầu từ 14:00.

📄 Trích PDF gốc (试题解析 Trang 19):
(35) 4 根据A中的表格可知, 可在每周五下午和每周六上午商量关于跨国婚姻的事情。根据B表可知, 小李两周的周五下午以及本周六的上午都没空, 只有下周六, 即17号上午有空去进行商谈。故选4。"""
    }
}

def apply_grammar_updates():
    print(f"=== Applying 100% Authentic N4 2013-07 Grammar & Reading (Q36..70) ===")

    # 1. Update scanned_n4_2013_official_answers.json
    scanned_path = r"frontend/src/app/data/scanned_n4_2013_official_answers.json"
    if os.path.exists(scanned_path):
        with open(scanned_path, "r", encoding="utf-8") as f:
            scanned_data = json.load(f)
        ans = scanned_data.get("officialAnswers", {})
        for q_idx, item in N4_2013_GRAMMAR.items():
            ans[str(q_idx)] = item["correctOption"]
        with open(scanned_path, "w", encoding="utf-8") as f:
            json.dump(scanned_data, f, ensure_ascii=False, indent=2)
        print(f"Updated {len(N4_2013_GRAMMAR)} keys in {scanned_path}!")

    # 2. Update master_gold_explanations.json
    master_path = r"scripts/master_gold_explanations.json"
    if os.path.exists(master_path):
        with open(master_path, "r", encoding="utf-8") as f:
            master = json.load(f)
        if "n4-2013-07" not in master:
            master["n4-2013-07"] = {}
        target_dict = master["n4-2013-07"]
        for q_idx, item in N4_2013_GRAMMAR.items():
            s_key = str(q_idx)
            target_dict[s_key] = {
                "snippet": item["snippet"],
                "explanation": item["explanation"],
                "correctOption": item["correctOption"],
                "text": item["text"],
                "options": item["options"]
            }
        with open(master_path, "w", encoding="utf-8") as f:
            json.dump(master, f, ensure_ascii=False, indent=2)
        print(f"Updated {len(N4_2013_GRAMMAR)} grammar questions in {master_path}!")

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
                for q_idx, item in N4_2013_GRAMMAR.items():
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
                print(f"Updated {updated_count} grammar questions in {json_path}!")

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
    apply_grammar_updates()
