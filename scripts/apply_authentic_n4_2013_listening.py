# -*- coding: utf-8 -*-
"""
Script to apply 100% authentic questions, options, audio transcripts, and explanations
for JLPT N4 2013-07 Questions 71 to 98 (Section 3: 聴解 - Listening)
Extracted directly from n4-2013-07.pdf:
- Page 14: Official answer sheet (参考答案)
- Pages 20 to 23: Official listening transcripts (聴解原文)
- Pages 10 to 13: Original exam booklet questions and illustration options
"""

import json
import os
import urllib.request

N4_2013_LISTENING = {
    71: {
        "localPdfNumber": 1,
        "mondai": 1,
        "sectionType": "LISTENING",
        "text": "歯医者で受付の人と男の人が話しています。男の人は次、いつ歯医者に行きますか。",
        "options": [
            "1. 月ようびの 午前10時",
            "2. 月ようびの 午後3時",
            "3. 火ようびの 午前10時",
            "4. 火ようびの 午後3時"
        ],
        "correctOption": 2,
        "snippet": "男の人は次、いつ歯医者に行きますか -> 月曜日の午後3時",
        "audioScriptJa": """女：次は来週ですね。いつがよろしいですか。
男：じゃあ、今日と同じ火曜日にお願いします。10時は空いていますか。
女：来週の火曜は午後しか空いていませんね。
男：ああ、その日は午後会議があってこられないんですよ。
女：前の日の月曜日なら空いていますよ。
男：そうですか。その日だったら、3時にお願いします。
女：はい、承知しました。どうぞお大事に。

質問：男の人は次、いつ歯医者に行きますか。""",
        "audioScriptVi": """Nữ: Lần tới là tuần sau anh nhé. Khi nào thì thuận tiện cho anh ạ?
Nam: Vậy cho tôi đăng ký vào thứ Ba giống như hôm nay nhé. 10 giờ sáng có còn trống không ạ?
Nữ: Thứ Ba tuần sau thì bên em chỉ còn trống vào buổi chiều thôi ạ.
Nam: À, chiều hôm đó tôi lại có cuộc họp nên không thể đến được rồi.
Nữ: Nếu là ngày thứ Hai trước đó thì còn trống đấy ạ.
Nam: Thế à. Nếu là ngày đó thì cho tôi hẹn lúc 3 giờ chiều nhé.
Nữ: Vâng, tôi đã ghi nhận rồi. Chúc anh mau chóng bình phục.

Câu hỏi: Người đàn ông lần tới sẽ đi khám nha sĩ vào lúc nào?""",
        "explanation": """🎯 Đáp án đúng: [2] 月ようびの 午後3時

💬 Dịch nghĩa bài nghe & Câu hỏi:
• Nữ: "Lần tới là tuần sau anh nhé. Khi nào thì thuận tiện cho anh ạ?"
• Nam: "Vậy cho tôi hẹn vào thứ Ba giống hôm nay nhé. 10 giờ sáng có trống không?"
• Nữ: "Thứ Ba tuần sau chỉ còn trống vào buổi chiều thôi ạ."
• Nam: "À, chiều hôm đó tôi có cuộc họp nên không đến được."
• Nữ: "Nếu là ngày thứ Hai trước đó thì còn trống đấy ạ."
• Nam: "Thế à. Nếu ngày đó thì cho tôi hẹn lúc 3 giờ chiều nhé."
• Nữ: "Vâng, tôi đã ghi nhận. Chúc anh mau khỏe."
❓ Câu hỏi: Người đàn ông lần tới sẽ đi khám nha sĩ vào lúc nào?

💡 Phân tích tiến trình lựa chọn:
1. Ban đầu người nam muốn hẹn thứ Ba 10:00 sáng (火曜日 10時) nhưng lễ tân báo chỉ trống buổi chiều (午後しか空いていません).
2. Chiều thứ Ba người nam bận họp (午後会議があってこられない).
3. Lễ tân gợi ý thứ Hai trước đó (前の日の月曜日なら空いていますよ).
4. Người nam chốt hẹn: "その日だったら、3時にお願いします" (Nếu là ngày thứ Hai thì cho tôi hẹn lúc 3 giờ chiều).
=> Lịch hẹn chính xác: Chiều thứ Hai lúc 3:00 (月曜日の午後3時).

🔍 Phân tích các lựa chọn:
- 1. 月ようびの 午前10時: Sai mốc thời gian (hẹn 3 giờ chiều, không phải 10 giờ sáng).
- 2. 月ようびの 午後3時: ĐÚNG - Khớp 100% quyết định cuối cùng của người nam.
- 3. 火ようびの 午前10時: Sai vì sáng thứ Ba nha sĩ kín lịch.
- 4. 火ようびの 午後3時: Sai vì chiều thứ Ba người nam bận họp.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 1 (1) -> 正解: 2"""
    },
    72: {
        "localPdfNumber": 2,
        "mondai": 1,
        "sectionType": "LISTENING",
        "text": "日本語の授業のあとで男の学生と先生が話しています。男の学生はどのカードを箱に入れますか。",
        "options": [
            "1. ア イ ウ",
            "2. ア イ",
            "3. ア ウ",
            "4. イ"
        ],
        "correctOption": 3,
        "snippet": "どのカードを箱に入れますか -> ア(平仮名) と ウ(絵)",
        "audioScriptJa": """男：先生、何かお手伝いしましょうか。
女：ああ、ありがとう。じゃ、机の上にあるカードを片付けてもらえますか。
男：はい。
女：平仮名のカードと絵のカードはこの箱に入れてください。
男：はい。漢字のカードもありますけど、これも入れましょうか。
女：あっ、それはこの後の授業で使いますから、入れないでください。
男：わかりました。

質問：男の学生はどのカードを箱に入れますか。""",
        "audioScriptVi": """Nam: Thưa cô, em có thể giúp cô việc gì không ạ?
Nữ: À, cảm ơn em. Vậy em có thể dọn dẹp các thẻ bài trên bàn giúp cô được không?
Nam: Vâng ạ.
Nữ: Thẻ chữ Hiragana và thẻ tranh vẽ thì em cho vào chiếc hộp này nhé.
Nam: Vâng. Còn có cả thẻ chữ Hán nữa, em cũng cho vào luôn nhé cô?
Nữ: À, thẻ đó cô sẽ dùng cho tiết học sau nên em đừng bỏ vào nhé.
Nam: Vâng em hiểu rồi ạ.

Câu hỏi: Nam sinh sẽ bỏ những thẻ nào vào trong hộp?""",
        "explanation": """🎯 Đáp án đúng: [3] ア ウ (Thẻ Hiragana và Thẻ tranh vẽ)

💬 Dịch nghĩa bài nghe & Câu hỏi:
• Nam sinh: "Thưa cô, em giúp cô việc gì nhé?"
• Cô giáo: "Cảm ơn em. Vậy em dọn các thẻ trên bàn giúp cô nhé."
• Cô giáo: "Thẻ chữ Hiragana (ア) và thẻ tranh vẽ (ウ) thì em cho vào chiếc hộp này."
• Nam sinh: "Vâng. Có cả thẻ chữ Hán (イ) nữa, em bỏ vào luôn nhé cô?"
• Cô giáo: "À, thẻ chữ Hán cô dùng cho tiết học sau nên ĐỪNG bỏ vào nhé."
❓ Câu hỏi: Nam sinh sẽ bỏ những thẻ nào vào trong hộp?

💡 Phân tích chi tiết:
• Thẻ bỏ vào hộp:
  - 平仮名のカード (Thẻ chữ Hiragana - Ký hiệu ア)
  - 絵のカード (Thẻ hình vẽ - Ký hiệu ウ)
• Thẻ KHÔNG bỏ vào:
  - 漢字のカード (Thẻ chữ Hán - Ký hiệu イ) vì sẽ dùng cho tiết sau (入れないでください).
=> Kết quả: Chọn ア và ウ -> Lựa chọn 3.

🔍 Phân tích các lựa chọn:
- 1. ア イ ウ: Sai vì thừa thẻ chữ Hán (イ).
- 2. ア イ: Sai vì nhầm thẻ chữ Hán (イ) thay vì thẻ tranh (ウ).
- 3. ア ウ: ĐÚNG - Gồm thẻ Hiragana (ア) và thẻ tranh (ウ).
- 4. イ: Sai hoàn toàn.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 1 (2) -> 正解: 3"""
    },
    73: {
        "localPdfNumber": 3,
        "mondai": 1,
        "sectionType": "LISTENING",
        "text": "女の人と男の人が話しています。男の人はあした何時にどこで女の人と会いますか。",
        "options": [
            "1. 10時45分に こうえんで",
            "2. 10時45分に えきで",
            "3. 11時に こうえんで",
            "4. 11時に えきで"
        ],
        "correctOption": 2,
        "snippet": "あした何時にどこで会いますか -> 10時45分にさくら駅で",
        "audioScriptJa": """女：あしたみんなでお花見をするんですが、よかったら、一緒に行きませんか。
男：いいですね。場所はどこですか。
女：さくら公園です。11時に集まります。
男：さくら公園？どこですか。
女：あっ、場所、わかりませんか。じゃ、一緒に行きましょう。15分前にさくら駅に来てください。
男：わかりました。よろしくお願いします。

質問：男の人はあした何時にどこで女の人と会いますか。""",
        "audioScriptVi": """Nữ: Ngày mai mọi người rủ nhau đi ngắm hoa anh đào, nếu được thì anh đi cùng không?
Nam: Hay quá. Địa điểm ở đâu thế?
Nữ: Ở công viên Sakura. Mọi người tập trung lúc 11 giờ.
Nam: Công viên Sakura ư? Ở chỗ nào vậy nhỉ?
Nữ: À, anh không biết chỗ đó à? Vậy thì chúng mình cùng đi nhé. Anh hãy đến ga Sakura trước 15 phút nhé.
Nam: Tôi hiểu rồi. Cảm ơn cô nhé.

Câu hỏi: Ngày mai người đàn ông sẽ gặp người phụ nữ vào lúc mấy giờ và ở đâu?""",
        "explanation": """🎯 Đáp án đúng: [2] 10時45分に えきで

💬 Dịch nghĩa bài nghe & Câu hỏi:
• Nữ rủ nam đi ngắm hoa ở công viên Sakura (さくら公園), giờ tập trung của cả nhóm là 11 giờ (11時に集まります).
• Nam không biết vị trí công viên ở đâu (場所、わかりませんか).
• Nữ hẹn đi cùng và dặn: "15分前にさくら駅に来てください" (Hãy đến ga Sakura trước 15 phút nhé).
• 11 giờ trừ đi 15 phút = 10 giờ 45 phút (10時45分). Địa điểm hẹn gặp riêng: Ga Sakura (さくら駅).
❓ Câu hỏi: Người đàn ông ngày mai sẽ gặp người phụ nữ lúc mấy giờ và ở đâu?

💡 Phân tích bẫy nghe:
- 11 giờ là giờ tập trung tại công viên Sakura của toàn bộ đoàn ngắm hoa.
- Người nam và người nữ hẹn gặp nhau trước tại nhà ga để cùng đi vì người nam không biết đường: 11時の15分前 = 10時45分 tại さくら駅.

🔍 Phân tích các lựa chọn:
- 1. 10時45分に こうえんで: Sai địa điểm (ga Sakura chứ không phải công viên).
- 2. 10時45分に えきで: ĐÚNG - 10:45 tại nhà ga.
- 3. 11時に こうえんで: Sai giờ và địa điểm gặp giữa 2 người (đây là lịch cả nhóm tập trung).
- 4. 11時に えきで: Sai thời gian (phải đến trước 15 phút, tức 10:45).

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 1 (3) -> 正解: 2"""
    },
    74: {
        "localPdfNumber": 4,
        "mondai": 1,
        "sectionType": "LISTENING",
        "text": "パソコン教室の受付で男の人と係りの人が話しています。男の人は何を書かなければなりませんか。",
        "options": [
            "1. ア イ",
            "2. ア ウ",
            "3. ア イ エ",
            "4. ア ウ エ"
        ],
        "correctOption": 1,
        "snippet": "男の人は何を書かなければなりませんか -> ア(名前) と イ(電話番号)",
        "audioScriptJa": """男：すみません、クラスを見学したいんですが。
女：はい。では、この紙に見学したい日を書いてください。
男：あのう、今日、今から見学できませんか。どのクラスでもいいんですが。
女：今から、いいですけど、すぐ始まりますよ。
男：あっ、はい。
女：では、こちらにお名前とお電話番号を書いてください。
男：見学したい日もですか。
女：今日ですから、それはいいです。
男：クラスの前のところはどうしますか。
女：それはこちらで書きますから、大丈夫ですよ。

質問：男の人は何を書かなければなりませんか。""",
        "audioScriptVi": """Nam: Xin lỗi, tôi muốn tham quan dự giờ lớp học vi tính ạ.
Nữ: Vâng. Vậy anh vui lòng ghi ngày muốn tham quan vào tờ giấy này nhé.
Nam: À, hôm nay, ngay bây giờ tôi có thể dự giờ được không ạ? Lớp nào cũng được ạ.
Nữ: Bây giờ ạ, được chứ nhưng lớp sắp bắt đầu ngay rồi đấy ạ.
Nam: Dạ vâng.
Nữ: Vậy thì anh hãy ghi họ tên và số điện thoại vào đây nhé.
Nam: Cả ngày muốn tham quan nữa ạ?
Nữ: Vì là hôm nay luôn rồi nên mục đó không cần ghi đâu ạ.
Nam: Thế còn phần tên lớp học thì sao ạ?
Nữ: Phần đó bên em sẽ ghi giúp anh, không sao đâu ạ.

Câu hỏi: Người đàn ông phải điền những thông tin nào?""",
        "explanation": """🎯 Đáp án đúng: [1] ア イ (名前 & 電話番号)

💬 Dịch nghĩa bài nghe & Câu hỏi:
• Người nam muốn đăng ký dự giờ lớp máy tính ngay hôm nay.
• Nhân viên lễ tân hướng dẫn: "こちらにお名前とお電話番号を書いてください" (Xin hãy ghi họ tên [ア] và số điện thoại [イ] vào đây).
• Về ngày dự giờ [ウ]: "今日ですから、それはいいです" (Vì là ngày hôm nay luôn rồi nên không cần ghi).
• Về mục lớp học [エ]: "それはこちらで書きますから、大丈夫ですよ" (Mục đó bên tôi sẽ ghi giúp, anh không cần ghi).
❓ Câu hỏi: Người đàn ông phải tự tay viết những mục nào?

💡 Kết luận:
Chỉ viết 2 mục: Tên (ア) và Số điện thoại (イ).

🔍 Phân tích các lựa chọn:
- 1. ア イ: ĐÚNG - Chỉ cần viết Tên và Số điện thoại.
- 2. ア ウ: Sai vì ngày dự giờ không cần điền.
- 3. ア イ エ: Sai vì tên lớp học nhân viên lễ tân sẽ tự điền.
- 4. ア ウ エ: Sai nhiều mục.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 1 (4) -> 正解: 1"""
    },
    75: {
        "localPdfNumber": 5,
        "mondai": 1,
        "sectionType": "LISTENING",
        "text": "電話で女の人と男の人が話しています。男の人はこのあと何をしますか。",
        "options": [
            "1. 部屋の掃除をする",
            "2. 隣の部屋から椅子を持ってくる",
            "3. コーヒーカップを出す",
            "4. お菓子・ケーキを用意する"
        ],
        "correctOption": 2,
        "snippet": "男の人はこのあと何をしますか -> 隣の部屋から椅子を持ってくる",
        "audioScriptJa": """女：もしもし、今から帰るね。友達も一緒なんだけど、掃除しておいてもらえる？
男：掃除なら、やってあるよ。
女：ありがとう。あっ、椅子が一つ足りないから、隣の部屋から持ってきておいて。
男：わかった。ほかに何かやっておくことある？お菓子を用意しておこうか？
女：ううん、大丈夫。ケーキを買って帰るから。
男：じゃ、コーヒーカップを出しておくね。
女：それはすぐできるから、いいよ。
男：わかった。

質問：男の人はこのあと何をしますか。""",
        "audioScriptVi": """Nữ: A lô, bây giờ em chuẩn bị về đây. Có bạn cùng về nữa, anh dọn dẹp nhà cửa trước giúp em được không?
Nam: Dọn dẹp thì anh đã dọn xong xuôi rồi nhé.
Nữ: Cảm ơn anh. À, thiếu mất một chiếc ghế, anh mang một cái từ phòng bên cạnh sang sẵn nhé.
Nam: Anh biết rồi. Còn việc gì cần chuẩn bị trước nữa không? Anh chuẩn bị bánh kẹo sẵn nhé?
Nữ: Thôi không cần đâu, em đang mua bánh kem mang về rồi.
Nam: Thế anh lấy sẵn mấy tách cà phê ra nhé.
Nữ: Việc đó tí về làm nhanh loáng cái là xong mà, không cần đâu anh.
Nam: Được rồi.

Câu hỏi: Người đàn ông sẽ làm gì ngay sau đây?""",
        "explanation": """🎯 Đáp án đúng: [2] 隣の部屋から椅子を持ってくる (Hình 2: Bê ghế từ phòng bên sang)

💬 Dịch nghĩa bài nghe & Câu hỏi:
• Nữ nhờ nam dọn dẹp -> Nam đã làm xong trước đó rồi (掃除なら、やってあるよ).
• Nữ bảo: "椅子が一つ足りないから、隣の部屋から持ってきておいて" (Thiếu mất 1 cái ghế, anh bê 1 cái từ phòng bên cạnh sang nhé) -> Nam nhận lời: "わかった" (Anh biết rồi).
• Nam hỏi có cần chuẩn bị bánh kẹo không (お菓子を用意しておこうか) -> Nữ bảo không cần vì đã mua bánh kem đem về.
• Nam bảo lấy tách cà phê ra sẵn (コーヒーカップを出しておくね) -> Nữ bảo không cần, lát về làm loáng cái là xong (それはすぐできるから、いいよ).
❓ Câu hỏi: Người đàn ông sẽ làm gì ngay sau đây?

💡 Phân tích hành động:
Hành động duy nhất người nam cần thực hiện ngay lúc này là mang ghế từ phòng bên cạnh sang.

🔍 Phân tích các lựa chọn:
- 1. Dọn dẹp nhà cửa: Đã làm xong từ trước (やってある).
- 2. Mang ghế từ phòng bên sang: ĐÚNG - Hành động cần làm ngay.
- 3. Chuẩn bị tách cà phê: Nữ bảo không cần làm trước (それはすぐできるから、いいよ).
- 4. Chuẩn bị bánh kẹo/bánh kem: Nữ tự mua mang về.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 1 (5) -> 正解: 2"""
    },
    76: {
        "localPdfNumber": 6,
        "mondai": 1,
        "sectionType": "LISTENING",
        "text": "男の人と女の人が話しています。男の人はどう行きますか。",
        "options": [
            "1. 経路 1",
            "2. 経路 2（一つ目の交差点を右、一つ目の角を左）",
            "3. 経路 3",
            "4. 経路 4"
        ],
        "correctOption": 2,
        "snippet": "男の人はどう行きますか -> 一つ目の交差点を右、一つ目の角を左（経路2）",
        "audioScriptJa": """男：すみません、みどり病院はどこですか。
女：ああ、みどり病院ですか。ええ、この道をまっすぐ行きます。一つ目の交差点を右に曲がってください。少し行って、一つ目の角を左に曲がります。50メートルくらい行くと、みどり病院がありますよ。
男：まっすぐ、それから右、次左ですね。ありがとうございました。

質問：男の人はどう行きますか。""",
        "audioScriptVi": """Nam: Xin lỗi, bệnh viện Midori ở đâu thế ạ?
Nữ: À, bệnh viện Midori ạ. Vâng, anh đi thẳng con đường này nhé. Hãy rẽ phải ở ngã tư đầu tiên. Đi một đoạn ngắn rồi rẽ trái ở góc rẽ đầu tiên. Đi tiếp khoảng chừng 50 mét nữa là sẽ thấy bệnh viện Midori đấy.
Nam: Đi thẳng, sau đó rẽ phải, rồi rẽ trái tiếp theo đúng không ạ. Cảm ơn chị nhiều nhé.

Câu hỏi: Người đàn ông sẽ đi như thế nào?""",
        "explanation": """🎯 Đáp án đúng: [2] 経路 2 (Đi thẳng -> rẽ phải ở ngã tư đầu tiên -> rẽ trái ở góc đầu tiên)

💬 Dịch nghĩa bài nghe & Chỉ đường:
• Nữ chỉ đường:
  1. "この道をまっすぐ行きます" (Đi thẳng con đường này).
  2. "一つ目の交差点を右に曲がってください" (Tại ngã tư đầu tiên, hãy rẽ phải).
  3. "少し行って、一つ目の角を左に曲がります" (Đi một đoạn ngắn, rẽ trái ở góc rẽ đầu tiên).
  4. "50メートルくらい行くと、みどり病院がありますよ" (Đi tiếp chừng 50m là tới bệnh viện).
• Nam xác nhận lại: "まっすぐ、それから右、次左ですね" (Đi thẳng, sau đó rẽ phải, tiếp theo rẽ trái đúng không).
❓ Câu hỏi: Người đàn ông sẽ đi theo lộ trình nào?

💡 Đối chiếu hình vẽ bản đồ (Trang 11):
- Lộ trình 1: Rẽ trái ở ngã tư đầu tiên (Sai).
- Lộ trình 2: Rẽ phải ở ngã tư đầu tiên, sau đó rẽ trái ở góc rẽ đầu tiên -> ĐÚNG TUYỆT ĐỐI.
- Lộ trình 3, 4: Đi thẳng qua ngã tư hoặc rẽ sai các khúc cua tiếp theo.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 1 (6) -> 正解: 2"""
    },
    77: {
        "localPdfNumber": 7,
        "mondai": 1,
        "sectionType": "LISTENING",
        "text": "家で男の人と女の人が話しています。女の人はこの後どれを捨てますか。",
        "options": [
            "1. ア イ ウ",
            "2. ア イ",
            "3. ア ウ",
            "4. イ ウ"
        ],
        "correctOption": 4,
        "snippet": "女の人はこの後どれを捨てますか -> イ(雑誌) と ウ(かばん)",
        "audioScriptJa": """男：ごめん、ちょっとお願い。ごみを捨ててきてくれない？
女：いいよ。どれ？
男：そこの雑誌とかばん。
女：えっ？このかばんも？
男：うん、中がすごく汚れていて、もう使えないんだ。
女：そうなんだ。この黒い袋は？
男：あっ、それにはごみを入れるから、置いておいて。
女：わかった。

質問：女の人はこの後どれを捨てますか。""",
        "audioScriptVi": """Nam: Xin lỗi, nhờ em một chút nhé. Em đi vứt rác giúp anh được không?
Nữ: Được chứ. Những thứ nào thế anh?
Nam: Mấy cuốn tạp chí đằng kia với lại chiếc túi xách.
Nữ: Hả? Cả chiếc túi xách này nữa á?
Nam: Ừ, bên trong bẩn lắm rồi không dùng được nữa đâu.
Nữ: Thế à. Thế còn chiếc túi ni lông màu đen này thì sao?
Nam: À, cái túi đó anh để đựng rác nên cứ để lại đấy nhé.
Nữ: Em hiểu rồi.

Câu hỏi: Người phụ nữ sau đây sẽ vứt những đồ vật nào?""",
        "explanation": """🎯 Đáp án đúng: [4] イ ウ (雑誌 & かばん)

💬 Dịch nghĩa bài nghe & Câu hỏi:
• Nam nhờ: "そこの雑誌とかばん" (Vứt chồng tạp chí [イ] và chiếc túi xách [ウ] đằng kia nhé).
• Nữ ngạc nhiên hỏi chiếc túi xách cũng vứt sao -> Nam bảo bên trong bẩn quá không dùng được nữa nên vứt đi.
• Nữ hỏi về túi ni lông màu đen [ア]: "この黒い袋は？"
• Nam bảo: "それにはごみを入れるから、置いておいて" (Cái túi đó dùng để đựng rác nên cứ để lại đấy, ĐỪNG vứt).
❓ Câu hỏi: Người phụ nữ sẽ đem vứt những thứ nào?

💡 Phân loại đồ vật:
- ア: 黒い袋 (Túi đen đựng rác) -> Giữ lại (置いておいて).
- イ: 雑誌 (Tạp chí) -> Vứt đi (捨ててきて).
- ウ: かばん (Túi xách bẩn) -> Vứt đi (捨ててきて).
=> Chọn イ và ウ (Lựa chọn 4).

🔍 Phân tích các lựa chọn:
- 1. ア イ ウ: Sai vì túi đen [ア] không vứt.
- 2. ア イ: Sai túi đen.
- 3. ア ウ: Sai túi đen và thiếu tạp chí.
- 4. イ ウ: ĐÚNG - Tạp chí (イ) và túi xách (ウ).

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 1 (7) -> 正解: 4"""
    },
    78: {
        "localPdfNumber": 8,
        "mondai": 1,
        "sectionType": "LISTENING",
        "text": "学校で先生が話しています。学生は何で書きますか。",
        "options": [
            "1. くろの えんぴつ",
            "2. くろの ペン",
            "3. あかの ペン",
            "4. あおの ペン"
        ],
        "correctOption": 3,
        "snippet": "学生は何で書きますか -> 赤のペン",
        "audioScriptJa": """女：みなさん、漢字の宿題は持ってきましたか。いつもは私が見ていますが、今日はみんなでチェックしましょう。隣の人の漢字を見てあげてください。正しく書けていますか。間違っているところがあったら、直しましょう。黒の鉛筆やペンではわかりにくいですから、必ず赤のペンを使ってください。持っていない人はここにありますから、使ってください。あとでわたしが青のペンを使ってチェックします。じゃ、自分の宿題を隣の人に渡してください。

質問：学生は何で書きますか。""",
        "audioScriptVi": """Nữ (Cô giáo): Các em đã mang bài tập chữ Hán đến lớp chưa? Mọi khi là cô chấm, nhưng hôm nay cả lớp chúng ta cùng kiểm tra chéo nhé. Các em hãy xem bài chữ Hán của bạn ngồi bên cạnh. Bạn viết đúng chưa? Nếu có chỗ sai sót thì hãy sửa lại nhé. Viết bằng bút chì đen hay bút mực đen thì rất khó nhìn, nên các em nhất định phải dùng bút mực đỏ nhé. Bạn nào không có thì ở đây có sẵn, hãy lên lấy dùng. Lát nữa cô sẽ dùng bút xanh để kiểm tra lại sau. Nào, các em hãy chuyển bài tập của mình cho bạn bên cạnh nhé.

Câu hỏi: Học sinh sẽ dùng bút gì để viết/chữa bài?""",
        "explanation": """🎯 Đáp án đúng: [3] あかの ペン (Bút mực đỏ)

💬 Dịch nghĩa bài nghe & Phân tích bẫy nghe:
• Cô giáo cho học sinh kiểm tra bài chữ Hán chéo nhau của bạn ngồi cạnh.
• Bẫy 1: "黒の鉛筆やペンではわかりにくいですから" (Dùng bút chì hay bút mực đen thì khó nhìn) -> Loại trừ bút đen / bút chì đen.
• Yêu cầu bắt buộc đối với học sinh: "必ず赤のペンを使ってください" (Nhất định phải dùng bút mực đỏ).
• Bẫy 2: "あとでわたしが青のペンを使ってチェックします" (Lát nữa cô sẽ dùng bút xanh để kiểm tra lại) -> Bút xanh là cô giáo dùng, không phải học sinh.
❓ Câu hỏi: Học sinh (学生) sẽ dùng bút gì để viết?
=> Đáp án: Bút đỏ (あかの ペン).

🔍 Phân tích các lựa chọn:
- 1. くろの えんぴつ: Sai vì cô dặn khó nhìn không được dùng.
- 2. くろの ペン: Sai vì cô dặn khó nhìn không được dùng.
- 3. あかの ペン: ĐÚNG - Học sinh nhất định phải dùng bút đỏ.
- 4. あおの ペン: Bút màu xanh là của cô giáo dùng sau đó.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 1 (8) -> 正解: 3"""
    },

    # MONDAI 2 (Points, Q79..85)
    79: {
        "localPdfNumber": 1,
        "mondai": 2,
        "sectionType": "LISTENING",
        "text": "女の学生と男の学生が話しています。男の学生は子供のとき何になりたかったと言っていますか。男の学生です。",
        "options": [
            "1. けいさつかん",
            "2. バスの うんてんしゅ",
            "3. ケーキやの てんいん",
            "4. レストランの ウエーター"
        ],
        "correctOption": 1,
        "snippet": "男の学生は子供のとき何になりたかったか -> 警察官",
        "audioScriptJa": """女：佐藤君、子供の時、何になりたかった？
男：警察官。パトカーが好きで、運転したかったんだ。でも今はバスの運転をしてみたいと思っている。
女：そう。車が好きなんだね。わたしは子供の時ケーキ屋になりたかったよ。
男：今はレストランのアルバイトをしているよね。
女：うん、楽しいよ。

質問：男の学生は子供のとき何になりたかったと言っていますか。""",
        "audioScriptVi": """Nữ: Satou này, hồi còn nhỏ cậu từng ước mơ lớn lên làm nghề gì?
Nam: Cảnh sát. Hồi đó tớ thích xe tuần tra cảnh sát nên rất muốn lái nó. Nhưng bây giờ thì tớ lại muốn thử làm tài xế xe buýt.
Nữ: Thế à. Cậu mê các loại xe cộ nhỉ. Hồi nhỏ tớ thì muốn mở tiệm bánh kem đấy.
Nam: Giờ cậu đang làm thêm ở nhà hàng đúng không?
Nữ: Ừ, vui lắm.

Câu hỏi: Nam sinh nói rằng hồi còn nhỏ cậu ấy muốn trở thành gì?""",
        "explanation": """🎯 Đáp án đúng: [1] けいさつかん (Cảnh sát)

💬 Dịch nghĩa bài nghe & Phân tích chi tiết:
• Nữ hỏi: "佐藤君、子供の時、何になりたかった？" (Satou ơi, hồi nhỏ cậu muốn làm nghề gì?).
• Nam trả lời trực tiếp: "警察官。パトカーが好きで、運転したかったんだ。" (Cảnh sát. Vì hồi nhỏ tớ thích xe tuần tra và muốn lái xe đó).
• Phân tích các thông tin gây nhiễu:
  - バスの運転: Nam muốn thử làm ở thời điểm hiện tại ("でも今はバスの運転をしてみたいと思っている").
  - ケーキ屋: Ước mơ hồi nhỏ của bạn NỮ chứ không phải bạn nam ("わたしは子供の時ケーキ屋になりたかったよ").
  - レストランのアルバイト: Công việc làm thêm hiện tại của bạn NỮ.
❓ Câu hỏi: Nam sinh hồi còn nhỏ muốn làm nghề gì?
=> Đáp án: Cảnh sát (警察官 - けいさつかん).

🔍 Phân tích các lựa chọn:
- 1. けいさつかん: ĐÚNG - Ước mơ thuở nhỏ của nam sinh.
- 2. バスの うんてんしゅ: Nguyện vọng hiện tại của nam sinh.
- 3. ケーキやの てんいん: Ước mơ hồi nhỏ của nữ sinh.
- 4. レストランの ウエーター: Công việc part-time hiện tại của nữ sinh.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 2 (1) -> 正解: 1"""
    },
    80: {
        "localPdfNumber": 2,
        "mondai": 2,
        "sectionType": "LISTENING",
        "text": "携帯電話で女の人と男の人が話しています。男の人は今からどうすると言っていますか。男の人です。",
        "options": [
            "1. はやく しごとを おわらせる",
            "2. きっさてんで 女の人を まつ",
            "3. タクシーで かいじょうに 行く",
            "4. 女の人に 電話を かける"
        ],
        "correctOption": 2,
        "snippet": "男の人は今からどうするか -> 喫茶店で女の人を待つ",
        "audioScriptJa": """女：もしもし、田中君？わたし、まだ仕事が終わらなくて、6時半の約束には遅れそう。ごめん。
男：えっ？僕は早く仕事が終わったから、コンサート会場にもう着いたよ。じゃ、近くの喫茶店でコーヒーを飲んで待っているよ。コンサートは7時からだけど、間に合う？
女：あと少しで出られるから、タクシーで行けば大丈夫だと思う。
男：わかった。じゃ、また電話して。
女：うん。

質問：男の人は今からどうすると言っていますか。""",
        "audioScriptVi": """Nữ: A lô, Tanaka đấy à? Tớ vẫn chưa xong việc nên chắc sẽ bị trễ hẹn lúc 6 giờ rưỡi rồi. Xin lỗi cậu nhé.
Nam: Ơ thế à? Tớ xong việc sớm nên đã đến địa điểm tổ chức buổi hòa nhạc rồi nè. Thế thì tớ sẽ vào quán cà phê gần đây uống cà phê ngồi chờ cậu nhé. Buổi biểu diễn bắt đầu lúc 7 giờ, liệu có kịp không?
Nữ: Tớ sắp xong để đi được rồi, đi taxi chắc là sẽ kịp thôi.
Nam: Ừ tớ hiểu rồi. Thế lát nữa gọi lại cho tớ nhé.
Nữ: Ừ.

Câu hỏi: Người đàn ông nói từ bây giờ anh ấy sẽ làm gì?""",
        "explanation": """🎯 Đáp án đúng: [2] きっさてんで 女の人を まつ (Uống cà phê đợi bạn nữ)

💬 Dịch nghĩa bài nghe & Phân tích chi tiết:
• Nữ gọi điện báo bận làm thêm chưa xong, trễ hẹn 6:30.
• Nam cho biết mình đã làm xong sớm và đã tới địa điểm ca nhạc rồi ("コンサート会場にもう着いたよ").
• Nam thông báo hành động của mình từ bây giờ: "じゃ、近くの喫茶店でコーヒーを飲んで待っているよ" (Vậy thì tớ sẽ ngồi uống cà phê ở quán gần đây để đợi cậu nhé).
• Nữ nói sẽ đi taxi tới, nam dặn đến nơi thì gọi điện lại cho nam.
❓ Câu hỏi: Người đàn ông nói từ bây giờ sẽ làm gì?

🔍 Phân tích các lựa chọn:
- 1. Hoàn thành công việc sớm: Nam đã xong việc từ trước rồi.
- 2. Đợi người phụ nữ ở quán cà phê: ĐÚNG - Khớp lời nói 「近くの喫茶店でコーヒーを飲んで待っているよ」.
- 3. Đi taxi tới hội trường: Đây là người nữ đi taxi tới.
- 4. Gọi điện cho người phụ nữ: Nam bảo nữ lát gọi cho nam (また電話して).

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 2 (2) -> 正解: 2"""
    },
    81: {
        "localPdfNumber": 3,
        "mondai": 2,
        "sectionType": "LISTENING",
        "text": "会社で女の人と男の人が話しています。男の人はいつコピーをしますか。",
        "options": [
            "1. 今日の 午前",
            "2. 今日の 午後",
            "3. あしたの 午前",
            "4. あしたの 午後"
        ],
        "correctOption": 1,
        "snippet": "男の人はいつコピーをしますか -> 今日の午前",
        "audioScriptJa": """女：この資料を200枚コピーしてくれませんか。明日朝の会議で使うんです。
男：はい、わかりました。
女：あっ、今すぐじゃなくてもいいですよ。
男：はい。あのう、今ちょっと忙しいんですが、午前中にはやります。午後、昼休みのあと、すぐ課長のところへ持って行きます。
女：じゃ、お願いします。

質問：男の人はいつコピーをしますか。""",
        "audioScriptVi": """Nữ: Anh có thể photo giúp tôi 200 bản tài liệu này được không? Dùng cho cuộc họp sáng mai đấy.
Nam: Vâng, tôi rõ rồi.
Nữ: À, không cần phải làm ngay lập tức đâu nhé.
Nam: Vâng. Hiện tại tôi đang hơi bận một chút, nhưng trong buổi sáng nay tôi sẽ photo xong. Buổi chiều sau giờ nghỉ trưa tôi sẽ mang sang cho trưởng phòng ngay.
Nữ: Vậy nhờ anh nhé.

Câu hỏi: Người đàn ông sẽ photocopy vào lúc nào?""",
        "explanation": """🎯 Đáp án đúng: [1] 今日の 午前 (Sáng hôm nay)

💬 Dịch nghĩa bài nghe & Phân tích mốc thời gian:
• Nữ nhờ photo 200 bản tài liệu dùng cho cuộc họp sáng mai (明日朝の会議).
• Nữ bảo không cần làm ngay lập tức (今すぐじゃなくてもいい).
• Người nam trình bày lịch trình:
  - "今ちょっと忙しいんですが、午前中にはやります" (Bây giờ tôi đang bận một chút, nhưng trong buổi sáng hôm nay tôi sẽ photo).
  - "午後、昼休みのあと、すぐ課長のところへ持って行きます" (Buổi chiều sau giờ nghỉ trưa, tôi sẽ mang sang nộp ngay cho trưởng phòng).
❓ Câu hỏi: Người đàn ông sẽ PHOTOCOPY (コピーをします) vào lúc nào?
=> Thao tác photo tài liệu diễn ra vào BUỔI SÁNG HÔM NAY (午前中 = 今日の午前).

🔍 Phân tích các lựa chọn:
- 1. 今日の 午前: ĐÚNG - Làm trong buổi sáng hôm nay (午前中にはやります).
- 2. 今日の 午後: Chiều là thời điểm mang tài liệu đã photo nộp cho trưởng phòng.
- 3. あしたの 午前: Sáng mai là thời gian diễn ra cuộc họp (会議).
- 4. あしたの 午後: Hoàn toàn sai.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 2 (3) -> 正解: 1"""
    },
    82: {
        "localPdfNumber": 4,
        "mondai": 2,
        "sectionType": "LISTENING",
        "text": "家でお母さんと息子が話しています。息子はこれからかばんに何を入れますか。",
        "options": [
            "1. セーター",
            "2. かさ",
            "3. レインコート",
            "4. てぶくろ"
        ],
        "correctOption": 3,
        "snippet": "息子はこれからかばんに何を入れますか -> レインコート",
        "audioScriptJa": """女：あしたの山に登る準備はできた？セーター、入れた？
男：うん、必要なものはかばんに全部入れたよ。
女：傘も入れた？
男：要らないよ。天気予報ではあさってまで晴れだから。
女：山は天気が変わりやすいから。雨が降るかもしれないよ。
男：そうだね。でも、傘を差して山に登れないから、レインコートを持っていくよ。
女：あっ、手袋も入れた？
男：うん、もう入れてあるよ。

質問：息子はこれからかばんに何を入れますか。""",
        "audioScriptVi": """Mẹ: Con đã chuẩn bị đồ đi leo núi ngày mai xong chưa? Áo len đã cho vào chưa?
Con: Dạ, những thứ cần thiết con đã cho hết vào cặp rồi ạ.
Mẹ: Cả ô che mưa con cũng cho vào rồi chứ?
Con: Không cần đâu mẹ. Dự báo thời tiết bảo trời nắng đẹp cho đến tận ngày kia cơ mà.
Mẹ: Trên núi thời tiết dễ thay đổi thất thường lắm, có thể trời sẽ mưa đấy con.
Con: Đúng mẹ nhỉ. Nhưng vừa cầm ô vừa leo núi thì không được, nên con sẽ mang theo áo mưa đi ạ.
Mẹ: À, găng tay con đã bỏ vào chưa?
Con: Vâng, găng tay con bỏ vào sẵn rồi mẹ ạ.

Câu hỏi: Cậu con trai từ bây giờ sẽ bỏ thêm đồ vật gì vào trong cặp?""",
        "explanation": """🎯 Đáp án đúng: [3] レインコート (Áo mưa)

💬 Dịch nghĩa bài nghe & Phân tích từng món đồ:
1. Áo len (セーター): Con đã cho vào cặp từ trước ("必要なものはかばんに全部入れたよ").
2. Ô che mưa (傘): Con không mang vì leo núi không thể vừa che ô vừa leo ("傘を差して山に登れない").
3. Áo mưa (レインコート): Con quyết định mang theo thay vì ô ("レインコートを持っていくよ").
4. Găng tay (手袋): Con đã cho sẵn vào túi từ trước ("うん、もう入れてあるよ").
❓ Câu hỏi: Cậu con trai TỪ BÂY GIỜ sẽ cho món gì vào cặp (これからかばんに何を入れるか)?
=> Món đồ chưa có trong cặp và sẽ cho thêm vào là: Áo mưa (レインコート).

🔍 Phân tích các lựa chọn:
- 1. セーター: Đã cho vào từ trước.
- 2. かさ: Không mang theo.
- 3. レインコート: ĐÚNG - Quyết định mang thêm để phòng trời mưa trên núi.
- 4. てぶくろ: Đã bỏ sẵn vào từ trước (もう入れてある).

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 2 (4) -> 正解: 3"""
    },
    83: {
        "localPdfNumber": 5,
        "mondai": 2,
        "sectionType": "LISTENING",
        "text": "女の学生と男の学生が話しています。女の学生はどうしてアルバイトをしますか。女の学生です。",
        "options": [
            "1. ひっこしを するため",
            "2. 新しい パソコンを 買うため",
            "3. お母さんに プレゼントを 買うため",
            "4. 友だちと おんせんに 行くため"
        ],
        "correctOption": 3,
        "snippet": "女の学生はどうしてアルバイトをしますか -> お母さんにプレゼントを買うため",
        "audioScriptJa": """女：加藤君、夏休みはアルバイトする？
男：うん、するよ。引越しする予定なんだ。それに、新しいパソコンもほしいし、お金がかかるんだ。
女：そう。わたしも今年の夏休みはアルバイトするつもり。
男：山田さんも？
女：うん、母の誕生日にプレゼントをあげたいんだ。
男：そうなんだ。何をあげる予定？
女：旅行のチケット。温泉が好きだから。

質問：女の学生はどうしてアルバイトをしますか。""",
        "audioScriptVi": """Nữ: Katou này, nghỉ hè cậu có đi làm thêm không?
Nam: Ừ, có chứ. Tớ dự định chuyển nhà, với lại cũng muốn mua máy tính mới nữa nên tốn kém lắm.
Nữ: Thế à. Nghỉ hè năm nay tớ cũng dự định đi làm thêm đấy.
Nam: Yamada cũng đi làm thêm á?
Nữ: Ừ, tớ muốn tặng quà sinh nhật cho mẹ tớ.
Nam: Vậy à. Cậu dự định tặng gì thế?
Nữ: Vé đi du lịch. Vì mẹ tớ rất thích tắm suối nước nóng.

Câu hỏi: Nữ sinh tại sao lại đi làm thêm?""",
        "explanation": """🎯 Đáp án đúng: [3] お母さんに プレゼントを 買うため (Mua quà sinh nhật cho mẹ)

💬 Dịch nghĩa bài nghe & Phân biệt chủ thể:
• Nam sinh (Kato) đi làm thêm vì: Dự định chuyển nhà (引越し) và muốn mua máy tính mới (新しいパソコン).
• Nữ sinh (Yamada) đi làm thêm vì: "母の誕生日にプレゼントをあげたいんだ" (Muốn tặng quà sinh nhật cho mẹ). Cụ thể là vé du lịch suối nước nóng onsen cho mẹ vì mẹ rất thích onsen.
❓ Câu hỏi: Nữ sinh (女の学生) tại sao lại đi làm thêm?
=> Đáp án: Để mua quà cho mẹ (お母さんにプレゼントを買うため).

🔍 Phân tích các lựa chọn:
- 1. Để chuyển nhà: Lý do của bạn Nam (Kato).
- 2. Để mua máy tính mới: Lý do của bạn Nam (Kato).
- 3. Để mua quà tặng mẹ: ĐÚNG - Lý do của bạn Nữ (Yamada).
- 4. Để đi suối nước nóng với bạn bè: Sai (tặng vé tắm suối nước nóng cho mẹ).

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 2 (5) -> 正解: 3"""
    },
    84: {
        "localPdfNumber": 6,
        "mondai": 2,
        "sectionType": "LISTENING",
        "text": "男の学生と女の留学生が話しています。女の留学生は今日何をしたいと言っていますか。",
        "options": [
            "1. にもつを おくる",
            "2. おみやげを 買う",
            "3. パーティーに 行く",
            "4. 車で あそびに 行く"
        ],
        "correctOption": 2,
        "snippet": "女の留学生は今日何をしたいか -> お土産を買う",
        "audioScriptJa": """男：来週帰国ですね。帰る準備は終わりましたか。
女：荷物はもう送りましたが、お土産をまだ買っていないんです。最近、ずっとパーティーなどがあって、忙しかったので、今日買いに行こうと思っています。
男：そうですか。わたしも買い物があるんです。車で行こうと思っているんですが、いっしょにどうですか。
女：ありがとうございます。じゃ、お願いします。

質問：女の留学生は今日何をしたいと言っていますか。""",
        "audioScriptVi": """Nam: Tuần sau bạn về nước rồi nhỉ. Đã chuẩn bị xong xuôi chưa?
Nữ: Hành lý thì mình đã gửi đi rồi, nhưng quà lưu niệm thì mình vẫn chưa kịp mua. Dạo gần đây bận liên hoan tiệc tùng liên miên nên mình định hôm nay sẽ đi mua đây.
Nam: Thế à. Tớ cũng có đồ cần mua này. Tớ định đi bằng ô tô, hay là đi cùng nhau nhé?
Nữ: Cảm ơn bạn nhiều nhé. Vậy nhờ bạn đi cùng nha.

Câu hỏi: Nữ du học sinh hôm nay nói rằng muốn làm gì?""",
        "explanation": """🎯 Đáp án đúng: [2] おみやげを 買う (Đi mua quà lưu niệm)

💬 Dịch nghĩa bài nghe & Phân tích chi tiết:
• Nam hỏi nữ du học sinh chuẩn bị về nước xong chưa.
• Nữ cho biết:
  - "荷物はもう送りましたが" (Hành lý thì tớ đã gửi xong xuôi rồi) -> Đã làm xong.
  - "お土産をまだ買っていないんです" (Quà lưu niệm thì tớ vẫn chưa mua).
  - "今日買いに行こうと思っています" (Nên hôm nay tớ dự định sẽ đi mua quà lưu niệm).
• Nam cũng có đồ cần mua và đề nghị chở bạn nữ đi bằng ô tô.
❓ Câu hỏi: Nữ du học sinh HÔM NAY (今日) muốn làm gì?
=> Đáp án: Mua quà lưu niệm (おみやげを買う).

🔍 Phân tích các lựa chọn:
- 1. Gửi hành lý: Đã làm xong rồi (もう送りました).
- 2. Mua quà lưu niệm: ĐÚNG - Dự định làm hôm nay (今日買いに行こうと思っています).
- 3. Đi dự tiệc: Đã diễn ra trong những ngày qua (最近、ずっとパーティーなどがあって).
- 4. Đi chơi bằng ô tô: Bạn nam tiện có ô tô nên rủ đi mua sắm cùng, không phải mục đích đi chơi.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 2 (6) -> 正解: 2"""
    },
    85: {
        "localPdfNumber": 7,
        "mondai": 2,
        "sectionType": "LISTENING",
        "text": "テレビで男の人がレストランについて話しています。このレストランはどうして最近客が増えましたか。",
        "options": [
            "1. テレビで しょうかいされたから",
            "2. りょうりが 安くなったから",
            "3. ゆうめいな 人が りょうりを つくるから",
            "4. えいがに 出たから"
        ],
        "correctOption": 4,
        "snippet": "どうして最近客が増えましたか -> 映画に出たから",
        "audioScriptJa": """男：今日は今人気のレストランを紹介します。こちらは百年前建てられたレストランです。料理は安くておいしいです。こちらで料理を作っている佐藤さんは有名のホテルで働いていたことがあるそうです。このレストランは先月映画に出てから、大勢の人に知られるようになりました。今はたくさんの人が食べにくるようになったそうです。

質問：このレストランはどうして最近客が増えましたか。""",
        "audioScriptVi": """Nam: Hôm nay tôi xin giới thiệu một nhà hàng đang rất được ưa chuộng. Nhà hàng này được xây dựng từ 100 năm trước. Món ăn ở đây vừa rẻ lại vừa ngon. Đầu bếp Satou nấu ăn ở đây nghe nói từng làm việc tại khách sạn nổi tiếng. Nhà hàng này kể từ sau khi xuất hiện trong một bộ phim vào tháng trước đã được đông đảo mọi người biết đến. Nghe nói hiện tại có rất nhiều thực khách đã tìm đến đây thưởng thức.

Câu hỏi: Nhà hàng này tại sao gần đây lượng khách lại tăng lên?""",
        "explanation": """🎯 Đáp án đúng: [4] えいがに 出たから (Vì xuất hiện trong phim)

💬 Dịch nghĩa bài nghe & Phân tích nguyên nhân:
• Người dẫn chương trình giới thiệu các đặc điểm của nhà hàng:
  - Xây từ 100 năm trước.
  - Món ăn rẻ và ngon (料理は安くておいしい).
  - Đầu bếp từng làm ở khách sạn nổi tiếng.
• Câu then chốt chỉ nguyên nhân khách tăng đột biến gần đây (最近客が増えた理由):
  "このレストランは先月映画に出てから、大勢の人に知られるようになりました。今はたくさんの人が食べにくるようになったそうです。"
  (Nhà hàng này kể từ sau khi xuất hiện trong bộ phim hồi tháng trước thì được đông đảo mọi người biết đến, hiện nay có rất đông người tìm đến ăn).
❓ Câu hỏi: Tại sao gần đây khách đến quán lại tăng lên?
=> Đáp án: Vì nhà hàng xuất hiện trong phim (映画に出たから).

🔍 Phân tích các lựa chọn:
- 1. Được giới thiệu trên tivi: Tivi đang phát sóng hôm nay chứ không phải lý do tháng trước lượng khách đã tăng vọt.
- 2. Món ăn rẻ đi: Món ăn vốn rẻ ngon từ trước, không phải mới giảm giá.
- 3. Người nổi tiếng nấu: Đầu bếp từng làm ở khách sạn nổi tiếng chứ bản thân không phải ngôi sao nổi tiếng.
- 4. Xuất hiện trong phim: ĐÚNG - Khớp chính xác với 「先月映画に出てから」.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 2 (7) -> 正解: 4"""
    },

    # MONDAI 3 (Utterance Expressions, Q86..90)
    86: {
        "localPdfNumber": 1,
        "mondai": 3,
        "sectionType": "LISTENING",
        "text": "先輩が荷物をたくさん持っています。先輩に何と言いますか。",
        "options": [
            "1. 先輩、持ちませんか。",
            "2. 先輩、持ちますよ。",
            "3. 先輩、持ってください。"
        ],
        "correctOption": 2,
        "snippet": "先輩が荷物をたくさん持っています -> 先輩、持ちますよ。",
        "audioScriptJa": """先輩が荷物をたくさん持っています。先輩に何と言いますか。
1. 先輩、持ちませんか。
2. 先輩、持ちますよ。
3. 先輩、持ってください。""",
        "audioScriptVi": """Tiền bối đang xách rất nhiều hành lý nặng. Bạn sẽ nói gì với tiền bối?
1. Tiền bối không xách à?
2. Tiền bối ơi, để em xách giúp tiền bối nhé ạ! (ĐÚNG)
3. Tiền bối hãy xách đi ạ.""",
        "explanation": """🎯 Đáp án đúng: [2] 先輩、持ちますよ。

💬 Ngữ cảnh hình ảnh & Lời thoại:
• Tình huống: Người tiền bối đang mang vác rất nhiều đồ đạc cồng kềnh, bạn muốn chủ động đề nghị giúp đỡ xách bớt cho tiền bối.
• Mẫu câu đề nghị làm giúp người khác: 「V-ますよ」 (để tôi xách cho nhé) hoặc khiêm nhường hơn là 「お持ちしましょうか」.
• Ở đây câu [2] 「先輩、持ちますよ」 (Tiền bối ơi, để em cầm giúp cho ạ!) là câu biểu đạt chuẩn xác và lịch sự nhất.

🔍 Phân tích các lựa chọn:
- 1. 先輩、持ちませんか: "Tiền bối không xách đồ à?" -> Hỏi rủ rê hoặc nghi vấn, sai hoàn toàn ngữ cảnh giúp đỡ.
- 2. 先輩、持ちますよ: ĐÚNG - Chủ động đề nghị xách đồ giúp tiền bối.
- 3. 先輩、持ってください: "Tiền bối hãy xách đồ đi" -> Sai lễ phép (ra lệnh / yêu cầu tiền bối xách đồ cho mình).

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 3 (1) -> 正解: 2"""
    },
    87: {
        "localPdfNumber": 2,
        "mondai": 3,
        "sectionType": "LISTENING",
        "text": "ソースが使いたいです。何と言いますか。",
        "options": [
            "1. ソースを取ってもらえませんか。",
            "2. ソース、いかがですか。",
            "3. ソースをあげましょうか。"
        ],
        "correctOption": 1,
        "snippet": "ソースが使いたいです -> ソースを取ってもらえませんか。",
        "audioScriptJa": """ソースが使いたいです。何と言いますか。
1. ソースを取ってもらえませんか。
2. ソース、いかがですか。
3. ソースをあげましょうか。""",
        "audioScriptVi": """Bạn muốn dùng nước xốt (chai xốt ở phía bên kia bàn). Bạn sẽ nói gì?
1. Bạn có thể lấy giúp mình chai nước xốt được không ạ? (ĐÚNG)
2. Bạn dùng thử nước xốt nhé?
3. Để mình cho bạn nước xốt nhé?""",
        "explanation": """🎯 Đáp án đúng: [1] ソースを取ってもらえませんか。

💬 Ngữ cảnh hình ảnh & Lời thoại:
• Tình huống: Trong bữa ăn, chai nước xốt đặt ở phía xa tầm với của bạn (gần người đối diện). Bạn muốn dùng chai sốt đó nên cần nhờ người kia lấy hộ đưa cho mình.
• Mẫu câu nhờ vả lịch sự: 「～てもらえませんか / てくれませんか」 (Bạn có thể làm giúp tôi việc gì đó được không?).
• 「ソースを取ってもらえませんか」: Bạn lấy giúp tôi chai nước xốt được không ạ?

🔍 Phân tích các lựa chọn:
- 1. ソースを取ってもらえませんか: ĐÚNG - Nhờ đối phương lấy giùm chai nước xốt.
- 2. ソース、いかがですか: "Bạn dùng chút nước sốt nhé?" -> Mời đối phương dùng nước sốt.
- 3. ソースをあげましょうか: "Tôi đưa nước sốt cho bạn nhé?" -> Sai vì chính mình đang cần chứ không phải đối phương.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 3 (2) -> 正解: 1"""
    },
    88: {
        "localPdfNumber": 3,
        "mondai": 3,
        "sectionType": "LISTENING",
        "text": "映画館で大きい声で話している人がいます。注意したいです。何と言いますか。",
        "options": [
            "1. 静かにしてください。",
            "2. 話しましょうか。",
            "3. うるさくて、すみません。"
        ],
        "correctOption": 1,
        "snippet": "映画館で大きい声で話している人に注意したい -> 静かにしてください。",
        "audioScriptJa": """映画館で大きい声で話している人がいます。注意したいです。何と言いますか。
1. 静かにしてください。
2. 話しましょうか。
3. うるさくて、すみません。""",
        "audioScriptVi": """Ở rạp chiếu phim có người đang nói chuyện rất to tiếng. Bạn muốn nhắc nhở họ giữ trật tự. Bạn sẽ nói gì?
1. Xin hãy giữ trật tự / nói nhỏ lại giùm cho ạ. (ĐÚNG)
2. Chúng ta cùng nói chuyện nhé?
3. Ồn ào quá, xin lỗi bạn nhé.""",
        "explanation": """🎯 Đáp án đúng: [1] 静かにしてください。

💬 Ngữ cảnh hình ảnh & Lời thoại:
• Tình huống: Ở trong rạp chiếu phim có người nói chuyện lớn tiếng làm ảnh hưởng đến mọi người. Bạn muốn nhắc nhở (注意したい) họ giữ im lặng.
• Lời yêu cầu, nhắc nhở lịch sự nhưng dứt khoát: 「静かにしてください」 (Xin hãy giữ trật tự / xin hãy giữ im lặng).

🔍 Phân tích các lựa chọn:
- 1. 静かにしてください: ĐÚNG - Nhắc nhở người khác giữ trật tự ở nơi công cộng.
- 2. 話しましょうか: "Chúng ta cùng nói chuyện nhé?" -> Rủ người ta nói chuyện tiếp (sai hoàn toàn).
- 3. うるさくて、すみません: "Tôi làm ồn quá, xin lỗi bạn nhé" -> Câu tự xin lỗi khi chính bản thân mình gây ồn cho người khác (ngược chủ thể).

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 3 (3) -> 正解: 1"""
    },
    89: {
        "localPdfNumber": 4,
        "mondai": 3,
        "sectionType": "LISTENING",
        "text": "用事があるので、先に帰ります。友達に何と言いますか。",
        "options": [
            "1. 今、帰ったところです。",
            "2. え？もう行くんですか。",
            "3. そろそろ出ないといけないんです。"
        ],
        "correctOption": 3,
        "snippet": "用事があるので先に帰ります -> そろそろ出ないといけないんです。",
        "audioScriptJa": """用事があるので、先に帰ります。友達に何と言いますか。
1. 今、帰ったところです。
2. え？もう行くんですか。
3. そろそろ出ないといけないんです。""",
        "audioScriptVi": """Vì có việc bận nên bạn phải về trước. Bạn sẽ nói gì với bạn bè trong bàn tiệc?
1. Mình vừa mới về tới nơi.
2. Ơ? Bạn đã về rồi đấy à?
3. Đã đến lúc mình phải xin phép rời đi rồi. (ĐÚNG)""",
        "explanation": """🎯 Đáp án đúng: [3] そろそろ出ないといけないんです。

💬 Ngữ cảnh hình ảnh & Lời thoại:
• Tình huống: Đang tụ tập cùng bạn bè thì bản thân bạn có việc bận cá nhân nên cần xin phép ra về trước mọi người.
• Mẫu câu báo hiệu sắp phải rời đi: 「そろそろ～ないといけない (Đã đến lúc phải... / Tôi phải đi rồi)」.
• 「そろそろ出ないといけないんです」: Đến giờ mình phải xin phép rời đi rồi.

🔍 Phân tích các lựa chọn:
- 1. 今、帰ったところです: "Tôi vừa mới về đến nơi xong" -> Diễn tả hành động vừa hoàn thành trong quá khứ.
- 2. え？もう行くんですか: "Ơ? Cậu đã đi về rồi đấy à?" -> Câu hỏi người khác khi thấy người ta ra về.
- 3. そろそろ出ないといけないんです: ĐÚNG - Lời giải thích bản thân phải rời đi vì có việc bận.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 3 (4) -> 正解: 3"""
    },
    90: {
        "localPdfNumber": 5,
        "mondai": 3,
        "sectionType": "LISTENING",
        "text": "ネクタイを選んでいます。友達の意見が聞きたいです。何と言いますか。",
        "options": [
            "1. どっちがいい？",
            "2. これ、着てもいい？",
            "3. 両方、いいと思うよ。"
        ],
        "correctOption": 1,
        "snippet": "ネクタイを選んで友達の意見が聞きたい -> どっちがいい？",
        "audioScriptJa": """ネクタイを選んでいます。友達の意見が聞きたいです。何と言いますか。
1. どっちがいい？
2. これ、着てもいい？
3. 両方、いいと思うよ。""",
        "audioScriptVi": """Bạn đang chọn cà vạt và muốn hỏi ý kiến của người bạn đi cùng. Bạn sẽ nói gì?
1. Cậu thấy chiếc nào trong hai cái này đẹp/hợp hơn? (ĐÚNG)
2. Cái này mình mặc vào được không?
3. Mình nghĩ cả hai cái đều đẹp đấy.""",
        "explanation": """🎯 Đáp án đúng: [1] どっちがいい？

💬 Ngữ cảnh hình ảnh & Lời thoại:
• Tình huống: Bạn đang cầm 2 chiếc cà vạt trước ngực để so sánh và muốn hỏi ý kiến người bạn đi cùng xem chiếc nào đẹp hơn, hợp hơn.
• Câu hỏi xin ý kiến so sánh giữa 2 vật: 「どっちがいい？ / どっちがいいと思う？」 (Cậu thấy cái nào ổn hơn?).

🔍 Phân tích các lựa chọn:
- 1. どっちがいい？: ĐÚNG - Hỏi bạn xem chiếc nào đẹp/phù hợp hơn.
- 2. これ、着てもいい？: "Cái này tôi mặc vào được không?" -> Sai từ vựng: cà vạt không dùng động từ 着る (mặc áo quần) mà dùng する hoặc 締める.
- 3. 両方、いいと思うよ: "Tớ thấy cả hai đều đẹp đấy" -> Đây là câu bạn trả lời đưa ra nhận xét chứ không phải câu hỏi xin ý kiến.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 3 (5) -> 正解: 1"""
    },

    # MONDAI 4 (Quick Response, Q91..98)
    91: {
        "localPdfNumber": 1,
        "mondai": 4,
        "sectionType": "LISTENING",
        "text": "あっ、お子さんの写真ですね。おいくつですか。",
        "options": [
            "1. 一人です。",
            "2. 一枚です。",
            "3. 一歳です。"
        ],
        "correctOption": 3,
        "snippet": "おいくつですか -> 一歳です。",
        "audioScriptJa": """あっ、お子さんの写真ですね。おいくつですか。
1. 一人です。
2. 一枚です。
3. 一歳です。""",
        "audioScriptVi": """A: Ôi, đây là ảnh của bé nhà anh chị phải không ạ. Cháu năm nay được mấy tuổi rồi ạ?
1. Có một người.
2. Có một tấm.
3. Cháu được 1 tuổi rồi ạ. (ĐÚNG)""",
        "explanation": """🎯 Đáp án đúng: [3] 一歳です。

💬 Phân tích câu hỏi & Phản xạ giao tiếp:
• Câu hỏi: 「あっ、お子さんの写真ですね。おいくつですか。」 (A, đây là ảnh con của anh/chị nhỉ. Bé năm nay bao nhiêu tuổi rồi ạ?).
• 「おいくつですか」 là cách hỏi tuổi lịch sự (kính ngữ của 何歳ですか).
• Đáp lại câu hỏi về số tuổi chỉ có thể là: 「一歳です」 (Cháu 1 tuổi rồi ạ).

🔍 Phân tích các lựa chọn:
- 1. 一人です: Đếm 1 người (hỏi いくつ không trả lời 一人).
- 2. 一枚です: Đếm 1 tấm ảnh (hỏi tuổi đứa bé chứ không hỏi có mấy bức ảnh).
- 3. 一歳です: ĐÚNG - Trả lời đúng tuổi của em bé.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 4 (1) -> 正解: 3"""
    },
    92: {
        "localPdfNumber": 2,
        "mondai": 4,
        "sectionType": "LISTENING",
        "text": "ジョンさん、来月から夏休みですね。予定はありますか。",
        "options": [
            "1. 楽しそうですね。",
            "2. ２か月の予定です。",
            "3. 国へ帰るつもりです。"
        ],
        "correctOption": 3,
        "snippet": "夏休みの予定はありますか -> 国へ帰るつもりです。",
        "audioScriptJa": """ジョンさん、来月から夏休みですね。予定はありますか。
1. 楽しそうですね。
2. ２か月の予定です。
3. 国へ帰るつもりです。""",
        "audioScriptVi": """A: Anh John ơi, từ tháng sau là bắt đầu nghỉ hè rồi nhỉ. Anh đã có dự định gì chưa?
1. Trông có vẻ vui đấy nhỉ.
2. Dự định là 2 tháng.
3. Tôi dự định sẽ về nước chơi. (ĐÚNG)""",
        "explanation": """🎯 Đáp án đúng: [3] 国へ帰るつもりです。

💬 Phân tích câu hỏi & Phản xạ giao tiếp:
• Câu hỏi: 「ジョンさん、来月から夏休みですね。予定はありますか。」 (Anh John ơi, từ tháng sau là nghỉ hè rồi nhỉ. Anh đã có kế hoạch dự định gì chưa?).
• Hỏi về dự định làm gì trong kỳ nghỉ (予定はありますか), câu trả lời tương ứng là nêu kế hoạch hành động: 「～つもりです / ～予定です」.
• 「国へ帰るつもりです」: Tôi dự định sẽ về nước.

🔍 Phân tích các lựa chọn:
- 1. 楽しそうですね: "Trông có vẻ vui nhỉ" -> Lời bình luận của người nghe, không trả lời dự định của mình.
- 2. ２か月の予定です: Trả lời về độ dài thời gian nghỉ (hỏi bao lâu) chứ không trả lời kế hoạch làm gì.
- 3. 国へ帰るつもりです: ĐÚNG - Nêu rõ dự định về nước thăm gia đình.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 4 (2) -> 正解: 3"""
    },
    93: {
        "localPdfNumber": 3,
        "mondai": 4,
        "sectionType": "LISTENING",
        "text": "どうやってアルバイトを探しましたか。",
        "options": [
            "1. 夏休みに旅行したいです。",
            "2. アルバイトは楽しいですから。",
            "3. インターネットで見つけました。"
        ],
        "correctOption": 3,
        "snippet": "どうやって探しましたか -> インターネットで見つけました。",
        "audioScriptJa": """どうやってアルバイトを探しましたか。
1. 夏休みに旅行したいです。
2. アルバイトは楽しいですから。
3. インターネットで見つけました。""",
        "audioScriptVi": """A: Cậu đã tìm công việc làm thêm bằng cách nào thế?
1. Nghỉ hè tớ muốn đi du lịch.
2. Vì công việc làm thêm rất vui.
3. Tớ đã tìm thấy trên mạng Internet đấy. (ĐÚNG)""",
        "explanation": """🎯 Đáp án đúng: [3] インターネットで見つけました。

💬 Phân tích câu hỏi & Phản xạ giao tiếp:
• Câu hỏi: 「どうやってアルバイトを探しましたか。」 (Cậu đã tìm công việc làm thêm bằng cách nào / phương thức nào vậy?).
• Từ để hỏi là 「どうやって」 (bằng cách nào, phương thức nào).
• Đáp lại phương thức tìm kiếm: 「インターネットで見つけました」 (Tớ đã tìm thấy trên mạng Internet).

🔍 Phân tích các lựa chọn:
- 1. Nghỉ hè tớ muốn đi du lịch: Lạc đề (nói về mong muốn nghỉ hè).
- 2. Vì công việc làm thêm rất vui: Trả lời cho câu hỏi lý do (どうして).
- 3. Tớ tìm thấy trên Internet: ĐÚNG - Trả lời chính xác phương thức cách làm.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 4 (3) -> 正解: 3"""
    },
    94: {
        "localPdfNumber": 4,
        "mondai": 4,
        "sectionType": "LISTENING",
        "text": "この椅子はどこに置きましょうか。",
        "options": [
            "1. ええ、そうしましょう。",
            "2. そっちに並べてください。",
            "3. 隣の部屋にあります。"
        ],
        "correctOption": 2,
        "snippet": "この椅子はどこに置きましょうか -> そっちに並べてください。",
        "audioScriptJa": """この椅子はどこに置きましょうか。
1. ええ、そうしましょう。
2. そっちに並べてください。
3. 隣の部屋にあります。""",
        "audioScriptVi": """A: Những chiếc ghế này chúng ta nên đặt ở đâu bây giờ ạ?
1. Vâng, chúng ta làm thế đi.
2. Xin hãy xếp hàng dài sang phía đằng kia giúp tôi nhé. (ĐÚNG)
3. Ghế đang ở phòng bên cạnh.""",
        "explanation": """🎯 Đáp án đúng: [2] そっちに並べてください。

💬 Phân tích câu hỏi & Phản xạ giao tiếp:
• Câu hỏi: 「この椅子はどこに置きましょうか。」 (Những chiếc ghế này chúng ta nên xếp/đặt ở đâu bây giờ ạ?).
• Từ để hỏi là 「どこに」 (ở vị trí nào, chỗ nào).
• Câu trả lời chỉ dẫn địa điểm sắp đặt: 「そっちに並べてください」 (Xin hãy xếp gọn sang phía đằng kia giúp tôi).

🔍 Phân tích các lựa chọn:
- 1. ええ、そうしましょう: "Ừ, chúng ta cùng làm thế đi" -> Dùng để đồng ý với lời rủ rê chứ không trả lời vị trí.
- 2. そっちに並べてください: ĐÚNG - Chỉ vị trí và cách sắp xếp ghế.
- 3. 隣の部屋にあります: "Nó đang ở phòng bên cạnh" -> Nói vị trí hiện tại của vật chứ không trả lời yêu cầu muốn chuyển đi đâu.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 4 (4) -> 正解: 2"""
    },
    95: {
        "localPdfNumber": 5,
        "mondai": 4,
        "sectionType": "LISTENING",
        "text": "正月の休みの間、どこかへ出かけましたか。",
        "options": [
            "1. 学校と駅の間にありました。",
            "2. かぜでずっと寝ていました。",
            "3. スキーに行ったことがあります。"
        ],
        "correctOption": 2,
        "snippet": "正月の休みの間、どこかへ出かけましたか -> かぜでずっと寝ていました。",
        "audioScriptJa": """正月の休みの間、どこかへ出かけましたか。
1. 学校と駅の間にありました。
2. かぜでずっと寝ていました。
3. スキーに行ったことがあります。""",
        "audioScriptVi": """A: Trong kỳ nghỉ Tết vừa rồi cậu có đi đâu chơi không?
1. Nằm ở giữa trường học và nhà ga.
2. Tớ bị cảm sốt nên suốt ngày nằm ngủ ở nhà thôi. (ĐÚNG)
3. Tớ đã từng đi trượt tuyết rồi.""",
        "explanation": """🎯 Đáp án đúng: [2] かぜでずっと寝ていました。

💬 Phân tích câu hỏi & Phản xạ giao tiếp:
• Câu hỏi: 「正月の休みの間、どこかへ出かけましたか。」 (Trong suốt kỳ nghỉ Tết vừa qua, cậu có đi đâu chơi không?).
• Câu hỏi Yes/No về hoạt động đi lại trong kỳ nghỉ Tết.
• Trả lời: 「かぜでずっと寝ていました」 (Tớ bị cảm cúm nên suốt ngày chỉ nằm ngủ ở nhà thôi -> ngụ ý không đi đâu cả).

🔍 Phân tích các lựa chọn:
- 1. 学校と駅の間にありました: Bẫy từ đồng âm 「間 (あいだ)」 hiểu nhầm sang vị trí không gian giữa 2 nơi.
- 2. かぜでずっと寝ていました: ĐÚNG - Trả lời việc không đi đâu do bị ốm.
- 3. スキーに行ったことがあります: Trả lời về kinh nghiệm từng trải trong đời (V-たことがある) chứ không phải kỳ nghỉ Tết vừa rồi.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 4 (5) -> 正解: 2"""
    },
    96: {
        "localPdfNumber": 6,
        "mondai": 4,
        "sectionType": "LISTENING",
        "text": "料理、下手なんだけど、最近家で毎晩作っているんだ。",
        "options": [
            "1. 誰から？",
            "2. どんなの？",
            "3. どこに？",
        ],
        "correctOption": 2,
        "snippet": "料理、最近家で毎晩作っているんだ -> どんなの？",
        "audioScriptJa": """料理、下手なんだけど、最近家で毎晩作っているんだ。
1. 誰から？
2. どんなの？
3. どこに？""",
        "audioScriptVi": """A: Tớ nấu ăn dở tệ lắm, nhưng dạo gần đây tối nào ở nhà tớ cũng tự nấu ăn đấy.
1. Từ ai thế?
2. Cậu thường nấu những món như thế nào vậy? (ĐÚNG)
3. Ở đâu thế?""",
        "explanation": """🎯 Đáp án đúng: [2] どんなの？

💬 Phân tích câu nói & Phản xạ giao tiếp:
• Người đối thoại chia sẻ: 「料理、下手なんだけど、最近家で毎晩作っているんだ。」 (Tớ nấu ăn vụng về lắm, nhưng dạo gần đây tối nào ở nhà tớ cũng tự nấu nướng đấy).
• Để duy trì cuộc hội thoại và thể hiện sự tò mò, quan tâm đến món ăn đối phương nấu: 「どんなの？ (Cậu nấu những món kiểu như thế nào thế?)」.

🔍 Phân tích các lựa chọn:
- 1. 誰から？: "Từ ai thế?" -> Vô nghĩa (đối phương tự nấu chứ có phải nhận từ ai đâu).
- 2. どんなの？: ĐÚNG - Hỏi loại món ăn bạn đang nấu.
- 3. どこに？: "Ở đâu thế?" -> Đối phương đã nói rõ là nấu ở nhà (家で) rồi nên hỏi lại ở đâu là thừa thãi, phi lý.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 4 (6) -> 正解: 2"""
    },
    97: {
        "localPdfNumber": 7,
        "mondai": 4,
        "sectionType": "LISTENING",
        "text": "この大学には学生が全部でどのぐらいいますか。",
        "options": [
            "1. 全部かどうかわかりません。",
            "2. だいたい１万人です。",
            "3. 夜9時ぐらいまでいます。"
        ],
        "correctOption": 2,
        "snippet": "学生が全部でどのぐらいいますか -> だいたい１万人です。",
        "audioScriptJa": """この大学には学生が全部でどのぐらいいますか。
1. 全部かどうかわかりません。
2. だいたい１万人です。
3. 夜9時ぐらいまでいます。""",
        "audioScriptVi": """A: Trường đại học này tổng cộng có khoảng bao nhiêu sinh viên vậy bạn?
1. Tôi không biết có phải tất cả hay không.
2. Khoảng chừng 1 vạn (10.000) sinh viên bạn nhé. (ĐÚNG)
3. Sinh viên ở lại đến khoảng 9 giờ tối.""",
        "explanation": """🎯 Đáp án đúng: [2] だいたい１万人です。

💬 Phân tích câu hỏi & Phản xạ giao tiếp:
• Câu hỏi: 「この大学には学生が全部でどのぐらいいますか。」 (Trường đại học này tổng cộng có khoảng bao nhiêu sinh viên vậy?).
• Từ để hỏi: 「どのぐらい (khoảng bao nhiêu)」 dùng để hỏi số lượng người.
• Đáp lại số lượng người: 「だいたい１万人です」 (Có khoảng chừng 10.000 sinh viên).

🔍 Phân tích các lựa chọn:
- 1. 全部かどうかわかりません: "Tôi không biết có phải tất cả không" -> Trả lời lệch trọng tâm.
- 2. だいたい１万人です: ĐÚNG - Ước lượng số lượng sinh viên chuẩn xác.
- 3. 夜9時ぐらいまでいます: "Ở lại đến khoảng 9 giờ tối" -> Trả lời cho câu hỏi về mốc thời gian (何時まで).

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 4 (7) -> 正解: 2"""
    },
    98: {
        "localPdfNumber": 8,
        "mondai": 4,
        "sectionType": "LISTENING",
        "text": "このバスはみどり公園行きですか。",
        "options": [
            "1. いいえ、東京駅ですよ。",
            "2. 公園に行ったんですね。",
            "3. バスで行きたいです。"
        ],
        "correctOption": 1,
        "snippet": "このバスはみどり公園行きですか -> いいえ、東京駅ですよ。",
        "audioScriptJa": """このバスはみどり公園行きですか。
1. いいえ、東京駅ですよ。
2. 公園に行ったんですね。
3. バスで行きたいです。""",
        "audioScriptVi": """A: Tuyến xe buýt này có đi đến công viên Midori không ạ?
1. Không phải đâu bạn ơi, xe này đi ga Tokyo đấy nhé. (ĐÚNG)
2. Ra là bạn đã đi đến công viên rồi nhỉ.
3. Tôi muốn đi bằng xe buýt.""",
        "explanation": """🎯 Đáp án đúng: [1] いいえ、東京駅ですよ。

💬 Phân tích câu hỏi & Phản xạ giao tiếp:
• Câu hỏi: 「このバスはみどり公園行きですか。」 (Tuyến xe buýt này có đi tới công viên Midori không ạ?).
• Hậu tố 「～行き (いき / ゆき)」 nghĩa là xe hướng về / chạy tới điểm đến nào.
• Trả lời: 「いいえ、東京駅ですよ」 (Không phải đâu bạn, tuyến xe này đi ga Tokyo đấy).

🔍 Phân tích các lựa chọn:
- 1. いいえ、東京駅ですよ: ĐÚNG - Đính chính lại điểm đến thực sự của chuyến xe buýt.
- 2. 公園に行ったんですね: "Ra là bạn đã đi công viên rồi nhỉ" -> Lạc đề.
- 3. バスで行きたいです: "Tôi muốn đi bằng xe buýt" -> Lạc đề.

📄 Trích đề thi gốc & Đáp án tham khảo:
• 参考答案 (Trang 14): 問題 4 (8) -> 正解: 1"""
    }
}

def apply_listening_updates():
    print("=== Applying 100% Authentic N4 2013-07 Listening (Q71..98) ===")

    # 1. Update scanned_n4_2013_official_answers.json
    scanned_path = r"frontend/src/app/data/scanned_n4_2013_official_answers.json"
    if os.path.exists(scanned_path):
        with open(scanned_path, "r", encoding="utf-8") as f:
            scanned_data = json.load(f)
        ans = scanned_data.get("officialAnswers", {})
        for q_idx, item in N4_2013_LISTENING.items():
            ans[str(q_idx)] = item["correctOption"]
        with open(scanned_path, "w", encoding="utf-8") as f:
            json.dump(scanned_data, f, ensure_ascii=False, indent=2)
        print(f"Updated {len(N4_2013_LISTENING)} keys in {scanned_path}!")

    # 2. Update master_gold_explanations.json
    master_path = r"scripts/master_gold_explanations.json"
    if os.path.exists(master_path):
        with open(master_path, "r", encoding="utf-8") as f:
            master = json.load(f)
        if "n4-2013-07" not in master:
            master["n4-2013-07"] = {}
        target_dict = master["n4-2013-07"]
        for q_idx, item in N4_2013_LISTENING.items():
            s_key = str(q_idx)
            target_dict[s_key] = {
                "snippet": item["snippet"],
                "explanation": item["explanation"],
                "correctOption": item["correctOption"],
                "text": item["text"],
                "options": item["options"],
                "audioScriptJa": item.get("audioScriptJa"),
                "audioScriptVi": item.get("audioScriptVi")
            }
        with open(master_path, "w", encoding="utf-8") as f:
            json.dump(master, f, ensure_ascii=False, indent=2)
        print(f"Updated {len(N4_2013_LISTENING)} listening questions in {master_path}!")

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
                for q_idx, item in N4_2013_LISTENING.items():
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
                    q_obj["audioScriptJa"] = item.get("audioScriptJa")
                    q_obj["audioScriptVi"] = item.get("audioScriptVi")
                    updated_count += 1
                with open(json_path, "w", encoding="utf-8") as f:
                    json.dump(admin_data, f, ensure_ascii=False, indent=2)
                print(f"Updated {updated_count} listening questions in {json_path}!")

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
    apply_listening_updates()
