# -*- coding: utf-8 -*-
"""
Script to build 100% authentic listening explanations for JLPT N4 2010-2011 (Pages 20-23 of PDF)
"""
import os
import json

def get_listening_2010_explanations():
    expls = {}

    # Q71 (Mondai 1 - 1)
    expls[71] = {
        "snippet": "聴解 問題1 (1): 男の学生は明日の研究会でどんな服を着ますか",
        "correctOption": 3,
        "audioScriptJa": """【問題1 - 1番】
大学で、女の先生と男の学生が話しています。男の学生は明日の研究会でどんな服を着ますか。
女：明日の研究会ですが、受付の仕事よろしくお願いします。
男：はい。あのう、何を着てきましょうか。
女：そうですね。スーツは持っていますか。
男：はい。じゃ、スーツを着てきます。
女：あっ、でも、熱いですから、上着はいらないです。
男：はい。
女：ネクタイはしてきてください。
男：分かりました。
質問：男の学生は明日の研究会でどんな服を着ますか。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Tại trường đại học, cô giáo và một nam sinh đang nói chuyện. Nam sinh sẽ mặc trang phục gì trong buổi hội thảo ngày mai?
Cô giáo: Về buổi hội thảo nghiên cứu ngày mai, nhờ em làm công việc lễ tân tiếp đón nhé.
Nam sinh: Vâng ạ. À, em nên mặc trang phục gì đến ạ?
Cô giáo: Xem nào. Em có đồ vest không?
Nam sinh: Dạ có ạ. Vậy em sẽ mặc bộ vest đến.
Cô giáo: À, nhưng mà vì trời nóng nên không cần áo khoác ngoài đâu nhé.
Nam sinh: Vâng ạ.
Cô giáo: Nhớ thắt cà vạt đến nhé.
Nam sinh: Vâng, em hiểu rồi ạ.
Câu hỏi: Nam sinh sẽ mặc trang phục như thế nào trong buổi hội thảo ngày mai?""",
        "explanation": """🎯 Đáp án đúng: [3]

💬 Dịch nghĩa câu hỏi:
"Nam sinh sẽ mặc trang phục như thế nào trong buổi hội thảo ngày mai?"

💡 Phân tích nội dung bài nghe:
• Cô giáo giao cho nam sinh nhiệm vụ làm lễ tân tiếp đón tại buổi hội thảo (受付の仕事).
• Ban đầu nam sinh định mặc đầy đủ cả bộ vest (スーツを着てきます).
• Tuy nhiên, cô giáo dặn dò rõ 2 điểm quan trọng về trang phục:
  1. Vì trời nóng nên không cần mặc áo khoác ngoài: 「熱いですから、上着はいらないです」.
  2. Bắt buộc phải thắt cà vạt: 「ネクタイはしてきてください」.
• Kết luận: Nam sinh mặc áo sơ mi thắt cà vạt, không mặc áo khoác vest ngoài. Đối chiếu với 4 hình ảnh minh họa trong đề thi, hình [3] thể hiện đúng trang phục áo sơ mi có thắt cà vạt và không khoác áo vest.

🔍 Phân tích các lựa chọn:
- Hình 1: Mặc áo sơ mi cộc tay, không thắt cà vạt (Sai)
- Hình 2: Mặc áo khoác vest, không thắt cà vạt (Sai)
- Hình 3: Mặc áo sơ mi thắt cà vạt, không khoác áo vest: ĐÚNG 100%
- Hình 4: Mặc cả bộ vest có áo khoác ngoài và cà vạt (Sai vì cô giáo bảo không cần áo khoác)

📄 Trích PDF gốc (Trang 20 - 聴解原文):
女: あっ、でも、熱いですから、上着はいらないです。
女: ネクタイはしてきてください。"""
    }

    # Q72 (Mondai 1 - 2)
    expls[72] = {
        "snippet": "聴解 問題1 (2): 男の人はこの後最初に何をしますか",
        "correctOption": 3,
        "audioScriptJa": """【問題1 - 2番】
会社で男の人と女の人が話しています。男の人はこの後最初に何をしますか。
男：忙しそうだね。手伝おうか。
女：あっ、お願い。今封筒にお客様の宛先を書いているところなんだけど。
男：じゃあ、僕も一緒に書こうか。
女：ううん、これはもうすこしで終わるから、私がやる。うーん、じゃ、封筒に資料を入れてもらえない？
男：うん。
女：資料はもうコピーして、机の上に置いてあるから。
男：わかった。
女：それから、後で郵便局に持っていくの手伝ってくれる？
男：うん、いいよ。
質問：男の人はこの後最初に何をしますか。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Tại công ty, một người nam và một người nữ đang nói chuyện. Người nam sau đây sẽ làm gì trước tiên?
Nam: Trông em có vẻ bận rộn nhỉ. Anh giúp một tay nhé?
Nữ: A, nhờ anh nhé. Bây giờ em đang viết địa chỉ khách hàng lên phong bì thư.
Nam: Vậy anh cùng viết với em nhé?
Nữ: Dạ thôi, việc này sắp xong rồi nên để em làm nốt. Ừm, vậy anh bỏ tài liệu vào phong bì giúp em được không?
Nam: Ừ được chứ.
Nữ: Tài liệu em đã photocopy sẵn để trên bàn rồi đấy ạ.
Nam: Anh biết rồi.
Nữ: Sau đó thì lát nữa anh phụ em mang ra bưu điện nhé?
Nam: Ừ, được thôi.
Câu hỏi: Người nam sau đây sẽ làm việc gì trước tiên?""",
        "explanation": """🎯 Đáp án đúng: [3]

💬 Dịch nghĩa câu hỏi:
"Người nam sau đây sẽ làm việc gì trước tiên?"

💡 Phân tích nội dung bài nghe:
• Người nam thấy người nữ bận rộn nên chủ động ngỏ ý giúp đỡ.
• Người nữ đang viết địa chỉ khách hàng lên phong bì (宛先を書いている). Người nam đề nghị viết cùng nhưng người nữ từ chối vì việc đó sắp xong rồi, để người nữ tự làm.
• Người nữ nhờ người nam công việc tiếp theo: 「封筒に資料を入れてもらえない？」 (Bỏ tài liệu vào trong phong bì). Tài liệu đã được copy sẵn ở trên bàn.
• Việc mang ra bưu điện (郵便局に持っていく) là công việc làm sau đó (後で).
• Do đó, hành động người nam làm đầu tiên ngay sau cuộc hội thoại là: Bỏ tài liệu vào phong bì thư (封筒に資料を入れる).

🔍 Phân tích các lựa chọn:
- Hình 1: Viết địa chỉ lên phong bì (Sai vì người nữ tự làm)
- Hình 2: Photocopy tài liệu (Sai vì đã copy xong sẵn trên bàn)
- Hình 3: Bỏ tài liệu vào phong bì thư: ĐÚNG
- Hình 4: Mang thư ra bưu điện (Sai vì đây là việc làm sau cùng)

📄 Trích PDF gốc (Trang 20 - 聴解原文):
女: うーん、じゃ、封筒に資料を入れてもらえない？
男: わかった。"""
    }

    # Q73 (Mondai 1 - 3)
    expls[73] = {
        "snippet": "聴解 問題1 (3): 女の人はいつ時計を取りに来ますか",
        "correctOption": 1,
        "audioScriptJa": """【問題1 - 3番】
時計屋で、女の人と店の人が話しています。女の人はいつ時計を取りに来ますか。
女：すみません。この時計壊れてしまったんですが、直りますか。
男：ああ、これなら直りますよ。四五日かかりますが。ええと、今週の土曜日にはできます。
女：土曜日ですか。あのう、金曜日に使いたいんですが。
男：じゃあ、木曜日でいいですか。
女：木曜日は取りに来られないんですが。
男：ううん、すこし値段が高くなりますけど、水曜日の夕方なら。
女：何時頃ですか。
男：ううん、五時頃ですね。
女：ああ、じゃ、それでお願します。
質問：女の人はいつ時計を取りに来ますか。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Tại tiệm đồng hồ, người phụ nữ và nhân viên tiệm đang nói chuyện. Người phụ nữ sẽ đến lấy đồng hồ vào lúc nào?
Nữ: Xin lỗi, chiếc đồng hồ này của tôi bị hỏng mất rồi, có sửa được không ạ?
Nam: À, cái này sửa được chứ. Mất khoảng 4-5 ngày, ừm, thứ Bảy tuần này sẽ xong.
Nữ: Thứ Bảy cơ ạ? Tôi lại muốn dùng vào ngày thứ Sáu.
Nam: Vậy thì thứ Năm có được không?
Nữ: Thứ Năm tôi lại không thể đến lấy được.
Nam: Ừm, giá sẽ đắt hơn một chút, nhưng nếu là chiều muộn thứ Tư thì được.
Nữ: Khoảng mấy giờ ạ?
Nam: Khoảng tầm 5 giờ chiều nhé.
Nữ: À, vậy thì nhờ anh làm như thế giúp tôi nhé.
Câu hỏi: Người phụ nữ sẽ đến lấy đồng hồ vào lúc nào?""",
        "explanation": """🎯 Đáp án đúng: [1]

💬 Dịch nghĩa câu hỏi:
"Người phụ nữ sẽ đến lấy đồng hồ vào lúc nào?"

💡 Phân tích nội dung bài nghe:
• Khách nữ mang đồng hồ đi sửa:
  - Thợ hẹn thứ Bảy (土曜日) -> Khách không đồng ý vì cần dùng vào thứ Sáu (金曜日に使いたい).
  - Thợ đề xuất thứ Năm (木曜日) -> Khách bận không đến lấy được (木曜日は取りに来られない).
  - Thợ đưa ra phương án làm gấp với chi phí cao hơn một chút: Chiều muộn thứ Tư khoảng 5 giờ chiều (水曜日の夕方、五時頃).
  - Khách đồng ý chốt phương án này: 「ああ、じゃ、それでお願します」.
• Kết luận: Người phụ nữ sẽ đến nhận đồng hồ vào chiều tối thứ Tư lúc 5 giờ -> Phương án [1].

🔍 Phân tích các lựa chọn:
- 1. 水曜日の夕方 (Chiều muộn thứ Tư): ĐÚNG
- 2. 木曜日 (Thứ Năm - khách bận không đến được)
- 3. 金曜日 (Thứ Sáu - ngày khách cần dùng)
- 4. 土曜日 (Thứ Bảy - quá muộn)

📄 Trích PDF gốc (Trang 20 - 聴解原文):
男: すこし値段が高くなりますけど、水曜日の夕方なら。
女: 何時頃ですか。
男: ううん、五時頃ですね。
女: ああ、じゃ、それでお願します。"""
    }

    # Q74 (Mondai 1 - 4)
    expls[74] = {
        "snippet": "聴解 問題1 (4): この女の学生は何色の帽子をかぶりますか",
        "correctOption": 2,
        "audioScriptJa": """【問題1 - 4番】
体育館で、男の先生が話しています。その後、女の学生が質問します。この女の学生は何色の帽子をかぶりますか。
男：ええと、今日はバスケットボールをします。四つのグループになって練習します。第一グループの人は赤の帽子をかぶってください。第二グループの人は黄色、第三の人は青、第四の人は緑の帽子です。
女：あのう、先生。私、どのグループか分からないんですけど。
男：ちょっと待ってください。ええと、第四ですよ。
女：分かりました。じゃ、緑ですね。
男：あっ、でも、今日は第二グループに休みのひとが多いなあ。悪いけど、このグループに入ってもらえますか。
女：はい、分かりました。
質問：この女の学生は何色の帽子をかぶりますか。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Tại nhà thi đấu thể dục, thầy giáo đang phổ biến. Sau đó, một nữ sinh đặt câu hỏi. Nữ sinh này sẽ đội chiếc mũ màu gì?
Thầy giáo: Ừm, hôm nay chúng ta sẽ tập bóng rổ. Cả lớp chia thành 4 nhóm để luyện tập nhé. Nhóm thứ nhất đội mũ màu đỏ. Nhóm thứ hai đội mũ màu vàng, nhóm thứ ba mũ màu xanh lam, nhóm thứ tư đội mũ màu xanh lá cây.
Nữ sinh: Thưa thầy, em không biết mình thuộc nhóm nào ạ.
Thầy giáo: Đợi thầy chút nhé. Ừm, em thuộc nhóm thứ tư đấy.
Nữ sinh: Dạ vâng, vậy là màu xanh lá cây đúng không ạ.
Thầy giáo: À, nhưng mà hôm nay nhóm thứ hai có nhiều bạn nghỉ quá. Phiền em chuyển sang nhóm thứ hai này được không?
Nữ sinh: Dạ vâng, em hiểu rồi ạ.
Câu hỏi: Nữ sinh này sẽ đội chiếc mũ màu gì?""",
        "explanation": """🎯 Đáp án đúng: [2]

💬 Dịch nghĩa câu hỏi:
"Nữ sinh này sẽ đội chiếc mũ màu gì?"

💡 Phân tích nội dung bài nghe:
• Thầy giáo quy định màu mũ cho 4 nhóm:
  - Nhóm 1: Đỏ (赤)
  - Nhóm 2: Vàng (黄色)
  - Nhóm 3: Xanh lam (青)
  - Nhóm 4: Xanh lá cây (緑)
• Ban đầu thầy tra danh sách thấy nữ sinh ở nhóm 4 (mũ xanh lá).
• Tuy nhiên ngay sau đó, thầy thấy nhóm 2 có nhiều người nghỉ nên nhờ nữ sinh chuyển sang nhóm 2: 「今日は第二グループに休みのひとが多いなあ。悪いけど、このグループに入ってもらえますか」.
• Nữ sinh đồng ý vào nhóm 2 -> Nhóm 2 đội mũ màu vàng (黄色) -> Đáp án [2].

🔍 Phân tích các lựa chọn:
- 1. 赤 (Đỏ - Nhóm 1)
- 2. 黄色 (Vàng - Nhóm 2): ĐÚNG
- 3. 青 (Xanh lam - Nhóm 3)
- 4. 緑 (Xanh lá cây - Nhóm 4 ban đầu trước khi bị đổi)

📄 Trích PDF gốc (Trang 20 - 聴解原文):
第二グループの人は黄色...
男: 悪いけど、このグループ（第二グループ）に入ってもらえますか。
女: はい、分かりました。"""
    }

    # Q75 (Mondai 1 - 5)
    expls[75] = {
        "snippet": "聴解 問題1 (5): バスのお客さんは何時までにバスに戻らなければなりませんか",
        "correctOption": 3,
        "audioScriptJa": """【問題1 - 5番】
バスの中で、旅行会社の人が話しています。バスのお客さんは何時までにバスに戻らなければなりませんか。
女：皆様、西山公園に着きました。今、予定より少し遅れまして、1時25分です。ここでバスを降りて、一時間半ぐらい自由時間があります。西山公園はとても広い公園で、1200年前に建てられた寺や神社が残っています。ぜひ行ってみてください。3時には出発しますから、5分前までに必ずバスに戻ってください。
質問：バスの中のお客さんは何時までにバスに戻らなければなりませんか。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Trên xe buýt, hướng dẫn viên du lịch đang thông báo. Các hành khách trên xe buýt phải quay trở lại xe trước mấy giờ?
Hướng dẫn viên: Thưa quý khách, chúng ta đã đến công viên Nishiyama. Hiện tại xe đến muộn hơn dự kiến một chút, đang là 1 giờ 25 phút. Tại đây chúng ta sẽ xuống xe và có khoảng 1 tiếng rưỡi thời gian tự do. Công viên Nishiyama rất rộng lớn, có ngôi chùa và đền thờ được xây dựng từ 1200 năm trước vẫn còn lưu giữ lại. Quý khách hãy ghé thăm nhé. Xe sẽ khởi hành vào lúc 3 giờ, nên xin quý khách nhất định phải quay trở lại xe trước giờ khởi hành 5 phút.
Câu hỏi: Các hành khách trên xe buýt phải quay trở lại xe trước mấy giờ?""",
        "explanation": """🎯 Đáp án đúng: [3]

💬 Dịch nghĩa câu hỏi:
"Hành khách trên xe buýt phải quay trở lại xe trước mấy giờ?"

💡 Phân tích nội dung bài nghe:
• Xe đến công viên lúc 1 giờ 25 phút (1時25分).
• Hướng dẫn viên thông báo: Xe buýt sẽ khởi hành lúc 3 giờ đúng: 「3時には出発します」.
• Yêu cầu bắt buộc đối với hành khách: Phải quay lại xe trước giờ xuất phát 5 phút: 「5分前までに必ずバスに戻ってください」.
• Tính toán mốc thời gian: 3 giờ 00 phút - 5 phút = 2 giờ 55 phút (2時55分).
• Do đó, hành khách phải có mặt ở xe trước 2 giờ 55 phút -> Đáp án [3].

🔍 Phân tích các lựa chọn:
- Hình 1: 2:30 (Sai)
- Hình 2: 2:50 (Sai)
- Hình 3: 2:55: ĐÚNG (3:00 trừ 5 phút)
- Hình 4: 3:00 (Sai vì đây là giờ xe xuất phát)

📄 Trích PDF gốc (Trang 20-21 - 聴解原文):
女: 3時には出発しますから、5分前までに必ずバスに戻ってください。"""
    }

    # Q76 (Mondai 1 - 6)
    expls[76] = {
        "snippet": "聴解 問題1 (6): 男の学生はこれからどこへ行きますか",
        "correctOption": 3,
        "audioScriptJa": """【問題1 - 6番】
男の学生と女の学生が話しています。男の学生はこれからどこへ行きますか。
男：宿題の作文、出した？
女：私はもう出したよ。
男：早いね。作文を出す前に直したいところがあるんだけど。辞書をうちに忘れてきたんだ。持っている？
女：私も持っていないなあ。きっと図書館にあるよ。
男：そうか。でも、図書館のは古いよ。いつもの辞書がいいから、やっぱりうちへ帰ろう。
女：あっ、ヤンさんも同じの持ってるから、借りられると思うよ。次の授業があるから、教室にいると思う。
男：あっ、そうか。聞いてみるよ。それから、作文はどこに出すの。
女：事務所だよ。
男：ありがとう。
質問：男の学生はこれからどこへ行きますか。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Một nam sinh và một nữ sinh đang nói chuyện. Nam sinh bây giờ sẽ đi đâu?
Nam sinh: Cậu đã nộp bài tập làm văn chưa?
Nữ sinh: Tớ nộp rồi đấy.
Nam sinh: Nhanh thế. Tớ có chỗ muốn sửa trước khi nộp nhưng lại để quên từ điển ở nhà mất rồi. Cậu có mang theo không?
Nữ sinh: Tớ cũng không mang. Chắc chắn ở thư viện có đấy.
Nam sinh: Thế à. Nhưng từ điển ở thư viện cũ lắm, tớ muốn dùng cuốn từ điển quen thuộc cơ, có khi tớ về nhà lấy vậy.
Nữ sinh: À, bạn Yan cũng có cuốn y hệt như thế, tớ nghĩ mượn được đấy. Tiết sau bạn ấy có giờ học nên chắc đang ở phòng học đấy.
Nam sinh: À, vậy à. Để tớ qua hỏi mượn xem sao. Mà này, bài văn nộp ở đâu thế?
Nữ sinh: Nộp ở văn phòng khoa đấy.
Nam sinh: Cảm ơn cậu nhé.
Câu hỏi: Nam sinh bây giờ sẽ đi đâu?""",
        "explanation": """🎯 Đáp án đúng: [3]

💬 Dịch nghĩa câu hỏi:
"Nam sinh bây giờ sẽ đi đâu?"

💡 Phân tích nội dung bài nghe:
• Nam sinh muốn sửa bài tập làm văn trước khi nộp nhưng để quên từ điển ở nhà.
• Nữ sinh gợi ý lên thư viện nhưng nam chê từ điển thư viện cũ và định về nhà lấy.
• Nữ sinh liền mách: Bạn Yan có cuốn từ điển y hệt, hiện bạn ấy sắp có tiết học nên đang ở phòng học: 「ヤンさんも同じの持ってるから... 教室にいると思う」.
• Nam sinh lập tức đổi ý sang phòng học tìm bạn Yan để mượn từ điển: 「あっ、そうか。聞いてみるよ」.
• Do đó, điểm đến ngay lúc này của nam sinh là phòng học (教室) -> Đáp án [3].

🔍 Phân tích các lựa chọn:
- Hình 1: Về nhà (うち - lúc đầu định về nhưng đã hủy để đi mượn bạn Yan)
- Hình 2: Thư viện (図書館 - không đi vì chê từ điển cũ)
- Hình 3: Phòng học (教室 - đi gặp bạn Yan mượn từ điển): ĐÚNG
- Hình 4: Văn phòng khoa (事務所 - nơi nộp bài sau khi sửa xong)

📄 Trích PDF gốc (Trang 21 - 聴解原文):
女: 次の授業があるから、教室にいると思う。
男: あっ、そうか。聞いてみるよ。"""
    }

    # Q77 (Mondai 1 - 7)
    expls[77] = {
        "snippet": "聴解 問題1 (7): 男の人は何をしなければなりませんか",
        "correctOption": 2,
        "audioScriptJa": """【問題1 - 7番】
女の人が公園の掃除について話しています。男の人は何をしなければなりませんか。
女：皆さん、今日は公園の掃除に来てくれて、ありがとうございます。では、まず、小学生のお子さんたちは公園に落ちている紙のゴミを拾って、袋に入れてください。それから、ええと、男の人は空き缶や瓶を拾ってもらえますか。缶と瓶は一緒の袋に入れてください。最後に、女の人ですが、私たちは木の周りに落ちている葉っぱを掃除しましょう。それでは、始めましょう。
質問：男の人は何をしなければなりませんか。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Người phụ nữ đang phân công về việc dọn vệ sinh công viên. Những người nam phải làm công việc gì?
Phụ nữ: Xin cảm ơn mọi người hôm nay đã đến tham gia dọn dẹp vệ sinh công viên. Đầu tiên, các em học sinh tiểu học hãy nhặt rác giấy rơi trong công viên và bỏ vào túi nhé. Tiếp theo, ừm, những người nam thì có thể nhặt vỏ lon và chai lọ rỗng giúp tôi được không ạ? Vỏ lon và chai lọ hãy cho chung vào một túi rác nhé. Cuối cùng, phái nữ chúng ta sẽ quét dọn lá cây rụng quanh các gốc cây. Nào, chúng ta cùng bắt đầu nhé.
Câu hỏi: Những người nam phải làm công việc gì?""",
        "explanation": """🎯 Đáp án đúng: [2]

💬 Dịch nghĩa câu hỏi:
"Những người nam phải làm công việc gì?"

💡 Phân tích nội dung bài nghe:
• Người phụ nữ phân công nhiệm vụ dọn vệ sinh công viên cho từng nhóm:
  1. Trẻ em tiểu học (小学生のお子さんたち): Nhặt rác giấy bỏ vào túi (紙のゴミを拾う).
  2. Phái nam (男の人): Nhặt vỏ lon và chai lọ rỗng bỏ chung vào một túi: 「男の人は空き缶や瓶を拾ってもらえますか。缶と瓶は一緒の袋に入れてください」.
  3. Phái nữ (女の人): Quét dọn lá cây rụng quanh gốc cây (葉っぱを掃除する).
• Đề bài hỏi nhiệm vụ của người nam (男の人) -> Nhặt lon và chai lọ rỗng -> Đáp án [2].

🔍 Phân tích các lựa chọn:
- Hình 1: Quét dọn lá cây (Nhiệm vụ của phái nữ)
- Hình 2: Nhặt vỏ lon và chai lọ rỗng (空き缶や瓶): ĐÚNG
- Hình 3: Nhặt rác giấy (Nhiệm vụ của học sinh tiểu học)
- Hình 4: Tưới cây / công việc khác (Sai)

📄 Trích PDF gốc (Trang 21 - 聴解原文):
女: 男の人は空き缶や瓶を拾ってもらえますか。缶と瓶は一緒の袋に入れてください。"""
    }

    # Q78 (Mondai 1 - 8)
    expls[78] = {
        "snippet": "聴解 問題1 (8): 女の学生はこれから何を調べなければなりませんか",
        "correctOption": 2,
        "audioScriptJa": """【問題1 - 8番】
大学で写真クラブの男の学生と女の学生が話しています。女の学生はこれから何を調べなければなりませんか。
男：今年の夏の旅行、場所はもう決まった？
女：はい、先輩。今年は海へ行くことになりました。電車の時間はまだ調べてないんですが。
男：そう。海なら、電車よりバスのほうがいいよ。荷物も多くなるし、一台借りて。
女：ああ、バスですか。そうですね。でも、高くないでしょうか。
男：ううん、行く人は何人になった？
女：ええと、28人です。
男：28人いたら、一人の値段はそんなに高くないと思うけど。ちょっと調べてみてよ。
女：はい。
男：旅館は？
女：はい。この旅館にしようと思っています。値段はちょっと高いんですが、海から近くて、とてもいいところです。
男：それはいいね。
質問：女の学生はこれから何を調べなければなりませんか。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Tại trường đại học, một nam sinh và một nữ sinh thuộc câu lạc bộ nhiếp ảnh đang nói chuyện. Nữ sinh bây giờ phải tìm hiểu/tra cứu thông tin gì?
Nam sinh: Chuyến du lịch hè năm nay đã chốt được địa điểm chưa em?
Nữ sinh: Dạ rồi tiền bối. Năm nay tụi em quyết định đi biển ạ. Giờ tàu điện thì em vẫn chưa tra cứu.
Nam sinh: Thế à. Đi biển thì đi xe buýt tốt hơn đi tàu điện đấy. Hành lý nhiều, lại có thể thuê trọn một chiếc xe.
Nữ sinh: A, xe buýt ạ? Cũng hay đấy ạ. Nhưng mà liệu có đắt không anh?
Nam sinh: Ừm, số người tham gia là bao nhiêu rồi em?
Nữ sinh: Dạ, 28 người ạ.
Nam sinh: Có 28 người thì anh nghĩ chia ra giá mỗi người cũng không đắt lắm đâu. Em thử tìm hiểu tra cứu xem nhé.
Nữ sinh: Dạ vâng.
Nam sinh: Còn nhà trọ thì sao?
Nữ sinh: Dạ, em định chọn nhà trọ này. Giá hơi cao một chút nhưng rất gần biển và là một nơi tuyệt vời ạ.
Nam sinh: Thế thì tốt quá rồi.
Câu hỏi: Nữ sinh bây giờ phải tìm hiểu/tra cứu thông tin gì?""",
        "explanation": """🎯 Đáp án đúng: [2]

💬 Dịch nghĩa câu hỏi:
"Nữ sinh bây giờ phải tìm hiểu/tra cứu thông tin gì?"

💡 Phân tích nội dung bài nghe:
• Hai người bàn về kế hoạch du lịch của CLB nhiếp ảnh:
  - Nữ sinh định đi tàu điện nhưng nam sinh khuyên đi biển đông người nên thuê xe buýt (バス).
  - Nữ sinh lo giá đắt, nam sinh hỏi có 28 người thì chia đầu người giá không đắt đâu, bảo nữ sinh hãy tìm hiểu thông tin về xe buýt: 「28人いたら、一人の値段はそんなに高くないと思うけど。ちょっと調べてみてよ」.
  - Về nhà trọ (旅館) thì nữ sinh đã quyết định chọn xong rồi.
• Vì vậy, điều mà nữ sinh cần tra cứu/tìm hiểu ngay bây giờ là: Thông tin và giá thuê xe buýt (バス) -> Đáp án [2].

🔍 Phân tích các lựa chọn:
- 1. 電車 (Tàu điện - đã bỏ phương án này để chuyển sang xe buýt)
- 2. バス (Xe buýt - tìm hiểu thông tin và giá thuê trọn gói): ĐÚNG
- 3. 旅館 (Nhà trọ - đã chọn xong rồi, không cần tra thêm)
- 4. 海の場所 (Địa điểm bãi biển - đã quyết định xong từ trước)

📄 Trích PDF gốc (Trang 21 - 聴解原文):
男: 28人いたら、一人の値段はそんなに高くないと思うけど。ちょっと調べてみてよ。
女: はい。"""
    }

    # Q79 (Mondai 2 - 1)
    expls[79] = {
        "snippet": "聴解 問題2 (1): 二人はどこで会いますか",
        "correctOption": 4,
        "audioScriptJa": """【問題2 - 1番】
女の人と男の人が話しています。二人はどこで会いますか？
女：来月のパーティーの知らせ、見た？
男：うん、桜ホテルだね。一緒に行こうよ。
女：いいよ、どこで会う？ホテルの入り口にする？
男：僕は場所がよく分からないから、駅の出口でもいい？
女：駅は人が多いから、駅前の喫茶店はどう？
男：わかった。
質問：二人はどこで会いますか？""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Một người nữ và một người nam đang nói chuyện. Hai người sẽ gặp nhau ở đâu?
Nữ: Cậu đã xem thông báo về bữa tiệc tháng sau chưa?
Nam: Ừ, tổ chức ở khách sạn Sakura nhỉ. Chúng mình cùng đi chung đi.
Nữ: Được thôi, gặp nhau ở đâu bây giờ? Ở cổng khách sạn nhé?
Nam: Tớ không rành chỗ đó lắm, hay hẹn ở cửa ra của nhà ga được không?
Nữ: Nhà ga đông người lắm, hay hẹn ở quán cà phê trước nhà ga nhé?
Nam: Được, nhất trí vậy đi.
Câu hỏi: Hai người sẽ gặp nhau ở đâu?""",
        "explanation": """🎯 Đáp án đúng: [4]

💬 Dịch nghĩa câu hỏi:
"Hai người sẽ gặp nhau ở đâu?"

💡 Phân tích nội dung bài nghe:
• Hai người hẹn nhau cùng đi dự tiệc tại khách sạn Sakura:
  - Nữ đề xuất cổng khách sạn (ホテルの入り口) -> Nam từ chối vì không biết đường.
  - Nam đề xuất cửa ra của nhà ga (駅の出口) -> Nữ từ chối vì ga rất đông người.
  - Nữ đưa ra phương án chốt cuối cùng: Hẹn gặp ở quán cà phê trước nhà ga (駅前の喫茶店).
  - Nam đồng ý: 「わかった」.
• Kết luận: Địa điểm hai người chốt gặp nhau là quán cà phê trước nhà ga (駅前の喫茶店) -> Đáp án [4].

🔍 Phân tích các lựa chọn:
- 1. ホテルの入り口 (Cổng khách sạn - bị loại)
- 2. ホテルのロビー (Sảnh khách sạn - không nhắc tới)
- 3. 駅の出口 (Cửa ra của nhà ga - quá đông người nên bị loại)
- 4. 駅前の喫茶店 (Quán cà phê trước ga): ĐÚNG

📄 Trích PDF gốc (Trang 21 - 聴解原文):
女: 駅は人が多いから、駅前の喫茶店はどう？
男: わかった。"""
    }

    # Q80 (Mondai 2 - 2)
    expls[80] = {
        "snippet": "聴解 問題2 (2): 女の人はテニスを何年しましたか",
        "correctOption": 3,
        "audioScriptJa": """【問題2 - 2番】
女の人がテニスクラブで自己紹介をしています。女の人はテニスを何年しましたか？
女：はじめまして、今日こちらのテニスクラブに入りました木村です。テニスは高校で三年、それから大学で四年、毎日練習していました。その後、会社に入ってから、二年はぜんぜんしていなかったんですが、このクラブが出来たと聞いて、こちらに来ました。どうぞよろしくお願いします。
質問：女の人はテニスを何年しましたか？""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Người phụ nữ đang tự giới thiệu bản thân tại câu lạc bộ quần vợt. Người phụ nữ đã chơi quần vợt được bao nhiêu năm?
Nữ: Xin chào mọi người, tôi là Kimura, hôm nay vừa mới gia nhập câu lạc bộ tennis này. Tôi đã chơi tennis 3 năm thời cấp ba, sau đó lên đại học chơi tiếp 4 năm nữa, ngày nào tôi cũng chăm chỉ luyện tập. Sau đó, từ khi đi làm tại công ty thì suốt 2 năm tôi hoàn toàn không chơi bóng, nhưng khi nghe nói câu lạc bộ này mới mở nên tôi đã tìm đến đây. Rất mong được mọi người giúp đỡ ạ.
Câu hỏi: Người phụ nữ đã chơi quần vợt được bao nhiêu năm?""",
        "explanation": """🎯 Đáp án đúng: [3]

💬 Dịch nghĩa câu hỏi:
"Người phụ nữ đã chơi tennis được bao nhiêu năm?"

💡 Phân tích nội dung bài nghe:
• Cô Kimura liệt kê quá trình chơi tennis của mình:
  1. Thời cấp ba: Chơi 3 năm (高校で三年).
  2. Thời đại học: Chơi 4 năm (大学で四年), ngày nào cũng luyện tập.
  3. Thời gian sau khi đi làm: 2 năm hoàn toàn không chơi (二年はぜんぜんしていなかった).
• Tổng số năm người phụ nữ đã thực sự chơi tennis: 3 năm + 4 năm = 7 năm (7年).
• Lưu ý bẫy: Khoảng thời gian 2 năm đi làm là KHÔNG chơi bóng, không được cộng dồn.
• Do đó đáp án chuẩn xác là 7 năm -> Đáp án [3].

🔍 Phân tích các lựa chọn:
- 1. 3年 (Chỉ tính thời cấp ba)
- 2. 4年 (Chỉ tính thời đại học)
- 3. 7年: ĐÚNG (3 năm cấp ba + 4 năm đại học)
- 4. 9年 (Bẫy cộng nhầm cả 2 năm không chơi sau khi đi làm)

📄 Trích PDF gốc (Trang 21-22 - 聴解原文):
女: テニスは高校で三年、それから大学で四年、毎日練習していました。その後、会社に入ってから、二年はぜんぜんしていなかったんですが..."""
    }

    # Q81 (Mondai 2 - 3)
    expls[81] = {
        "snippet": "聴解 問題2 (3): 明日の天気はどうだと言っていますか",
        "correctOption": 2,
        "audioScriptJa": """【問題2 - 3番】
学校で先生が話しています。明日の天気はどうだと言っていますか？
先生：ええ、明日は運動会です。今日は午前中ずっと雨でしたから、運動会ができるかどうか心配でしたね。でも、天気予報で明日の朝はいい天気だと言っていました。昼からは曇りますが、雨の心配はないそうです。じゃあ、皆さん一緒に運動会の準備を始めましょう。
質問：明日の天気はどうだと言っていますか？""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Tại trường học, thầy giáo đang thông báo. Thời tiết ngày mai được nói là sẽ như thế nào?
Thầy giáo: Vâng, ngày mai là ngày hội thể thao. Sáng hôm nay trời mưa suốt cả buổi nên chắc các em cũng lo lắng không biết ngày hội có diễn ra được không đúng không. Tuy nhiên, theo dự báo thời tiết thì sáng mai thời tiết sẽ rất đẹp. Từ trưa trở đi trời sẽ nhiều mây nhưng nghe nói không có gì phải lo về mưa cả. Nào, bây giờ chúng ta hãy cùng nhau bắt tay vào chuẩn bị cho ngày hội thể thao nhé.
Câu hỏi: Thời tiết ngày mai được nói là sẽ như thế nào?""",
        "explanation": """🎯 Đáp án đúng: [2]

💬 Dịch nghĩa câu hỏi:
"Thời tiết ngày mai được nói là sẽ như thế nào?"

💡 Phân tích nội dung bài nghe:
• Thầy giáo thông báo về thời tiết cho ngày hội thể thao ngày mai:
  - Buổi sáng ngày mai: Thời tiết rất đẹp/nắng ráo: 「明日の朝はいい天気だ」.
  - Buổi trưa/chiều: Trời sẽ có mây nhưng không có mưa: 「昼からは曇りますが、雨の心配はない」.
• Đối chiếu các phương án: Sáng trời đẹp, trưa chiều chuyển nhiều mây -> Đáp án [2].

🔍 Phân tích các lựa chọn:
- 1. Sáng mưa, chiều đẹp trời (Ngược thông tin)
- 2. Sáng trời đẹp nắng, trưa chiều nhiều mây: ĐÚNG
- 3. Cả ngày đều mưa (Sai)
- 4. Cả ngày trời đều nắng đẹp (Sai vì buổi trưa nhiều mây)

📄 Trích PDF gốc (Trang 22 - 聴解原文):
先生: 明日の朝はいい天気だと言っていました。昼からは曇りますが、雨の心配はないそうです。"""
    }

    # Q82 (Mondai 2 - 4)
    expls[82] = {
        "snippet": "聴解 問題2 (4): 男の人はどうやって映画館まで行きますか",
        "correctOption": 4,
        "audioScriptJa": """【問題2 - 4番】
大学で男の人と女の人が話しています。男の人はどうやって映画館まで行きますか？
男：いまから映画を見に行こうと思ってるんだ。
女：どこ？新しい映画館？
男：そう、行ったことある？
女：うん、私は先週、大学からバスで行ったんだけど、道が込んでいて大変だった。
男：じゃあ、駅まで少し歩くけど、電車に乗ったほうがいいかもしれないね。
女：あっ、でも、映画館まで自転車で行っても10分ぐらいしかかからないと思うよ。
男：そうか。けっこう近いんだね。でも、今日は自転車で来ていないから、あまり遠くないなら、歩いていくよ。
女：今日は天気もいいからね。
質問：男の人はどうやって映画館まで行きますか？""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Tại trường đại học, một nam và một nữ đang nói chuyện. Người nam sẽ đi đến rạp chiếu phim bằng phương tiện gì?
Nam: Bây giờ tớ định đi xem phim.
Nữ: Ở đâu thế? Rạp chiếu phim mới mở à?
Nam: Đúng rồi, cậu đến đó bao giờ chưa?
Nữ: Ừ, tuần trước tớ đi xe buýt từ trường đại học nhưng tắc đường khổ lắm.
Nam: Thế thì có khi tớ đi bộ ra ga rồi đi tàu điện lại tốt hơn nhỉ.
Nữ: A, nhưng mà tớ nghĩ đạp xe ra rạp phim chỉ mất tầm 10 phút thôi đấy.
Nam: Thế à, khá là gần nhỉ. Nhưng hôm nay tớ lại không đi xe đạp đến trường, nên nếu không xa lắm thì tớ sẽ đi bộ vậy.
Nữ: Hôm nay trời cũng đẹp nữa mà.
Câu hỏi: Người nam sẽ đi đến rạp chiếu phim bằng phương tiện gì?""",
        "explanation": """🎯 Đáp án đúng: [4]

💬 Dịch nghĩa câu hỏi:
"Người nam sẽ đi đến rạp chiếu phim bằng phương tiện/cách thức nào?"

💡 Phân tích nội dung bài nghe:
• Người nam muốn đến rạp chiếu phim mới:
  - Nữ cảnh báo đi xe buýt (バス) bị tắc đường kẹt xe.
  - Nam tính đi tàu điện (電車).
  - Nữ bảo đi xe đạp (自転車) chỉ mất khoảng 10 phút.
  - Nam nhận xét là khá gần, nhưng hôm nay nam không mang xe đạp đến trường, và chốt lại: Nếu gần như vậy thì nam sẽ đi bộ: 「今日は自転車で来ていないから、あまり遠くないなら、歩いていくよ」.
  - Nữ ủng hộ vì hôm nay trời đẹp.
• Kết luận: Người nam sẽ đi bộ (歩く) đến rạp phim -> Đáp án [4].

🔍 Phân tích các lựa chọn:
- 1. バス (Xe buýt - bị kẹt xe nên không đi)
- 2. 電車 (Tàu điện - không chọn)
- 3. 自転車 (Xe đạp - hôm nay không mang theo)
- 4. 歩いていく (Đi bộ): ĐÚNG

📄 Trích PDF gốc (Trang 22 - 聴解原文):
男: 今日は自転車で来ていないから、あまり遠くないなら、歩いていくよ。"""
    }

    # Q83 (Mondai 2 - 5)
    expls[83] = {
        "snippet": "聴解 問題2 (5): 課長はどうして女の人に注意をしましたか",
        "correctOption": 3,
        "audioScriptJa": """【問題2 - 5番】
会社でアルバイトの女の人と課長が話しています。課長はどうして女の人に注意をしましたか？
女：すみません、課長、明日アルバイトを休みたいんですが。
男：ええ？明日？どうしたんですか？
女：あのう、外国の友達から電話があって、明日日本に来るそうなんです。友達は日本語がよく分からないので。
男：困りましたね。休むのはいいんですが、もっと早く言わなければだめですよ。
女：はい、すみません。
男：これからは気をつけてくださいね。じゃ、明日の会議の資料を急いでコピーしておいてください。
質問：課長はどうして女の人に注意をしましたか？""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Tại công ty, một nữ nhân viên làm thêm và người tổ trưởng đang nói chuyện. Tại sao người tổ trưởng lại nhắc nhở người nữ?
Nữ: Xin lỗi tổ trưởng, ngày mai em muốn xin nghỉ làm thêm ạ.
Tổ trưởng: Hả? Ngày mai á? Có chuyện gì thế em?
Nữ: Dạ, em vừa nhận điện thoại từ người bạn ở nước ngoài, nghe nói ngày mai bạn ấy sang Nhật. Vì bạn ấy không rành tiếng Nhật nên...
Tổ trưởng: Gay go nhỉ. Nghỉ thì cũng được thôi, nhưng em phải báo sớm hơn chứ, báo sát ngày thế này không được đâu.
Nữ: Dạ vâng, em xin lỗi ạ.
Tổ trưởng: Từ giờ em nhớ chú ý nhé. Thôi được rồi, em hãy photocopy gấp tập tài liệu cuộc họp ngày mai đi nhé.
Câu hỏi: Tại sao người tổ trưởng lại nhắc nhở người nữ?""",
        "explanation": """🎯 Đáp án đúng: [3]

💬 Dịch nghĩa câu hỏi:
"Tại sao người tổ trưởng lại nhắc nhở người phụ nữ?"

💡 Phân tích nội dung bài nghe:
• Nhân viên nữ xin nghỉ làm thêm vào ngày mai vì đón bạn ngoại quốc.
• Tổ trưởng đồng ý cho nghỉ nhưng nhắc nhở nghiêm túc về tác phong: 「休むのはいいんですが、もっと早く言わなければだめですよ」 (Nghỉ thì được nhưng phải báo trước sớm hơn chứ).
• Lý do bị khiển trách/nhắc nhở là vì báo xin nghỉ quá muộn/quá gấp (連絡が遅かったから / もっと早く言わなかったから) -> Đáp án [3].

🔍 Phân tích các lựa chọn:
- 1. Vì lý do nghỉ không chính đáng (Sai, bạn sang Nhật dẫn đi là lý do được chấp nhận)
- 2. Vì không chịu photocopy tài liệu (Sai, tổ trưởng vẫn nhờ photocopy)
- 3. Vì báo xin nghỉ quá trễ, không báo sớm hơn: ĐÚNG
- 4. Vì làm việc không chăm chỉ (Sai thông tin)

📄 Trích PDF gốc (Trang 22 - 聴解原文):
男: 困りましたね。休むのはいいんですが、もっと早く言わなければだめですよ。"""
    }

    # Q84 (Mondai 2 - 6)
    expls[84] = {
        "snippet": "聴解 問題2 (6): 女の人はいつ行くのが一番いいといっていますか",
        "correctOption": 1,
        "audioScriptJa": """【問題2 - 6番】
女の人が生まれた町について話しています。女の人はいつ行くのが一番いいといっていますか？
女：私の生まれた町は山川町です。日本の北のほうにある町です。冬が長いので、春になると、いろいろなお祭りをします。その中でも歴史祭りが一番有名です。夏は雨が降らなくて気持ちがいいです。秋にはいろいろな果物が食べられます。どの季節もいいですが、歴史祭りの時が一番面白いです。ぜひ、歴史祭りのときに来てください。
質問：女の人はいつ行くのが一番いいといっていますか？""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Người phụ nữ đang kể về thị trấn nơi mình sinh ra. Người phụ nữ nói thời điểm nào đến thăm là tuyệt vời nhất?
Nữ: Thị trấn nơi tôi sinh ra là thị trấn Yamakawa, nằm ở phía bắc của Nhật Bản. Mùa đông ở đây kéo dài, nên hễ sang mùa xuân là người ta tổ chức rất nhiều lễ hội phong phú. Trong số đó thì Lễ hội Lịch sử là nổi tiếng nhất. Mùa hè trời không mưa nên rất dễ chịu thoải mái. Mùa thu thì có thể thưởng thức rất nhiều loại trái cây ngon. Mùa nào cũng có nét đẹp riêng, nhưng vào thời điểm diễn ra Lễ hội Lịch sử là thú vị nhất. Mọi người nhất định hãy đến vào dịp Lễ hội Lịch sử nhé.
Câu hỏi: Người phụ nữ nói thời điểm nào đến thăm là tuyệt vời nhất?""",
        "explanation": """🎯 Đáp án đúng: [1]

💬 Dịch nghĩa câu hỏi:
"Người phụ nữ nói thời điểm nào đến thăm là tuyệt vời nhất?"

💡 Phân tích nội dung bài nghe:
• Người phụ nữ miêu tả 4 mùa của thị trấn Yamakawa:
  - Mùa đông dài; mùa xuân (春) có nhiều lễ hội, nổi tiếng nhất là Lễ hội Lịch sử (歴史祭り).
  - Mùa hè (夏) trời ít mưa dễ chịu; mùa thu (秋) có nhiều hoa quả.
• Đoạn kết người phụ nữ nhấn mạnh mức độ cao nhất: 「歴史祭りの時が一番面白いです。ぜひ、歴史祭りのときに来てください」 (Thời điểm diễn ra Lễ hội Lịch sử là thú vị nhất, hãy đến vào lúc đó).
• Lễ hội Lịch sử diễn ra vào mùa xuân -> Đáp án [1].

🔍 Phân tích các lựa chọn:
- 1. 春の歴史祭りの時 (Dịp Lễ hội Lịch sử mùa xuân): ĐÚNG
- 2. 夏の雨が降らない時 (Mùa hè - chỉ là thời tiết dễ chịu)
- 3. 秋の果物が多い時 (Mùa thu - chỉ là nhiều hoa quả)
- 4. 冬の雪が降る時 (Mùa đông - mùa đông dài buốt giá)

📄 Trích PDF gốc (Trang 22 - 聴解原文):
女: どの季節もいいですが、歴史祭りの時が一番面白いです。ぜひ、歴史祭りのときに来てください。"""
    }

    # Q85 (Mondai 2 - 7)
    expls[85] = {
        "snippet": "聴解 問題2 (7): 誰が今度の土曜日に結婚しますか",
        "correctOption": 3,
        "audioScriptJa": """【問題2 - 7番】
会社で女の課長と男の人が話しています。誰が今度の土曜日に結婚しますか？
女：田中さん、悪いけど、今度の土曜日、会社に来て会議の準備してくれない？
男：あっ、すみません。課長、土曜日はちょっと、結婚式なんです。
女：えっ？田中さん結婚するんですか？
男：あっ、違います。妹です。
女：妹さんですか。おめでとうございます。私の妹も先月結婚したんですよ。
男：そうなんですか。おめでとうございます。
質問：誰が今度の土曜日に結婚しますか？""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Tại công ty, nữ tổ trưởng và một nhân viên nam đang nói chuyện. Ai sẽ kết hôn vào thứ Bảy tuần này?
Tổ trưởng: Anh Tanaka này, phiền anh một chút, thứ Bảy tuần này anh có thể đến công ty chuẩn bị cho cuộc họp giúp tôi được không?
Tanaka: A, xin lỗi tổ trưởng ạ. Thứ Bảy này em lại vướng đám cưới mất rồi.
Tổ trưởng: Hả? Tanaka làm đám cưới đấy à?
Tanaka: Dạ không phải đâu ạ, là em gái em cưới ạ.
Tổ trưởng: Em gái anh cưới à. Chúc mừng nhé! Em gái tôi cũng vừa mới kết hôn hồi tháng trước đấy.
Tanaka: Thế ạ? Xin chúc mừng cô nhé!
Câu hỏi: Ai sẽ kết hôn vào thứ Bảy tuần này?""",
        "explanation": """🎯 Đáp án đúng: [3]

💬 Dịch nghĩa câu hỏi:
"Ai sẽ kết hôn vào thứ Bảy tuần này?"

💡 Phân tích nội dung bài nghe:
• Tổ trưởng nhờ Tanaka thứ Bảy đi làm thêm chuẩn bị họp.
• Tanaka xin phép vắng mặt vì bận đi dự đám cưới (結婚式).
• Tổ trưởng tưởng Tanaka cưới, nhưng Tanaka đính chính ngay: 「あっ、違います。妹です」 (Dạ không phải em, là em gái em ạ).
• Tổ trưởng nói thêm rằng em gái của tổ trưởng cũng đã cưới nhưng là vào tháng trước (先月).
• Đề bài hỏi ai cưới vào thứ Bảy tuần này -> Em gái của Tanaka (anh chàng nhân viên) -> Đáp án [3].

🔍 Phân tích các lựa chọn:
- 1. 田中さん (Tanaka - anh đã phủ nhận)
- 2. 課長 (Tổ trưởng - không phải)
- 3. 田中さんの妹 (Em gái của Tanaka): ĐÚNG
- 4. 課長の妹 (Em gái của tổ trưởng - đã cưới vào tháng trước 先月)

📄 Trích PDF gốc (Trang 22 - 聴解原文):
女: えっ？田中さん結婚するんですか？
男: あっ、違います。妹です。"""
    }

    # Q86 (Mondai 3 - 1)
    expls[86] = {
        "snippet": "聴解 問題3 (1): クレジットカードで払いたいです。何といいますか",
        "correctOption": 2,
        "audioScriptJa": """【問題3 - 1番】
買い物をしました。クレジットカードで払いたいです。何といいますか。
1. クレジットカードで払ってください。
2. クレジットカードが使えますか。
3. クレジットカードを見せるつもりです。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Bạn đi mua sắm và muốn thanh toán bằng thẻ tín dụng. Trong tình huống này bạn sẽ nói gì với nhân viên?
1. Hãy thanh toán bằng thẻ tín dụng giúp tôi.
2. Ở đây có sử dụng thẻ tín dụng được không ạ?
3. Tôi dự định cho xem thẻ tín dụng.""",
        "explanation": """🎯 Đáp án đúng: [2]

💬 Tình huống đề bài:
"Bạn vừa mua sắm xong và muốn thanh toán bằng thẻ tín dụng. Bạn sẽ hỏi nhân viên thế nào?"

💡 Phân tích tình huống & Giao tiếp chuẩn:
• Khi muốn hỏi cửa hàng có chấp nhận thanh toán bằng hình thức nào đó (như thẻ tín dụng, ví điện tử) hay không, câu hỏi lịch sự thông dụng nhất là: 「～が使えますか」(Ở đây có dùng được ~ không ạ?).
• Câu 1 「～で払ってください」 mang nghĩa yêu cầu đối phương thanh toán bằng thẻ (chỉ dùng khi người bán yêu cầu khách, không dùng cho khách nói).
• Câu 3 「見せるつもりです」 mang nghĩa "Tôi dự định cho xem thẻ", không phù hợp để giao dịch mua bán.
• Do đó phương án đúng duy nhất là [2]: 「クレジットカードが使えますか」.

🔍 Phân tích các lựa chọn:
- 1. クレジットカードで払ってください (Bảo đối phương trả bằng thẻ - sai ngôi)
- 2. クレジットカードが使えますか: ĐÚNG - Hỏi cửa hàng có quẹt thẻ được không
- 3. クレジットカードを見せるつもりです (Nói ý định cho xem thẻ - sai ngữ cảnh)

📄 Trích PDF gốc (Trang 22 - 聴解原文):
2. クレジットカードが使えますか。"""
    }

    # Q87 (Mondai 3 - 2)
    expls[87] = {
        "snippet": "聴解 問題3 (2): 雨がふりそうです。会社の人が出かけます。何といいますか",
        "correctOption": 2,
        "audioScriptJa": """【問題3 - 2番】
雨がふりそうです。会社の人が出かけます。何といいますか？
1. 傘を持たせてください。
2. 傘を持っていったほうがいいですよ。
3. 傘を持たなくてもいいですよ。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Trời trông có vẻ sắp mưa. Người trong công ty sắp sửa đi ra ngoài. Bạn sẽ nói gì để nhắc nhở họ?
1. Hãy để tôi cầm ô giúp bạn.
2. Bạn nên mang theo ô đi thì hơn đấy ạ.
3. Bạn không cần mang ô theo cũng được.""",
        "explanation": """🎯 Đáp án đúng: [2]

💬 Tình huống đề bài:
"Trời trông có vẻ sắp đổ mưa. Đồng nghiệp ở công ty chuẩn bị đi ra ngoài. Bạn sẽ nói câu gì?"

💡 Phân tích tình huống & Giao tiếp chuẩn:
• Trời sắp mưa (雨がふりそう), để đưa ra lời khuyên hữu ích cho người sắp ra ngoài, cấu trúc chuẩn là: 「V-たほうがいいですよ」 (Nên làm V thì hơn).
• Do đó câu nhắc nhở phù hợp nhất là: 「傘を持っていったほうがいいですよ」 (Bạn nên mang theo ô đi nhé).
• Câu 1 「持たせてください」 là xin phép cho tôi cầm (sai nghĩa). Câu 3 「持たなくてもいい」 là khuyên không cần mang ô thì trái ngược hoàn toàn với tình hình trời sắp mưa.

🔍 Phân tích các lựa chọn:
- 1. 傘を持たせてください (Hãy cho phép tôi cầm ô - sai nghĩa)
- 2. 傘を持っていったほうがいいですよ: ĐÚNG - Lời khuyên nên mang theo ô
- 3. 傘を持たなくてもいいですよ (Không mang ô cũng được - ngược thực tế)

📄 Trích PDF gốc (Trang 23 - 聴解原文):
2. 傘を持っていったほうがいいですよ。"""
    }

    # Q88 (Mondai 3 - 3)
    expls[88] = {
        "snippet": "聴解 問題3 (3): 友達が暗い教室で本を読んでいます。何といいますか",
        "correctOption": 2,
        "audioScriptJa": """【問題3 - 3番】
友達が暗い教室で本を読んでいます。何といいますか？
1. 電気、消してもいい？
2. 電気、付けようか？
3. 電気、付けたままだよ。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Bạn của bạn đang ngồi đọc sách trong phòng học tối. Bạn sẽ nói câu gì để giúp đỡ bạn mình?
1. Tớ tắt điện đi có được không?
2. Để tớ bật điện lên cho cậu nhé?
3. Cậu vẫn đang để nguyên điện bật kìa.""",
        "explanation": """🎯 Đáp án đúng: [2]

💬 Tình huống đề bài:
"Bạn của bạn đang đọc sách trong lớp học bị tối. Bạn sẽ nói câu gì?"

💡 Phân tích tình huống & Giao tiếp chuẩn:
• Thấy bạn đọc sách trong phòng tối (暗い教室), người nói muốn đề nghị làm việc tốt giúp bạn (bật điện lên).
• Mẫu câu đề nghị giúp đỡ: 「V-ようか」 (Để tôi làm giúp bạn nhé?).
• Bật điện là 「電気を付ける」 -> 「電気、付けようか？」 (Để tớ bật đèn lên cho cậu nhé?).
• Câu 1 là "tắt điện" (消す) làm phòng càng tối thêm (vô lý). Câu 3 là thông báo đèn đang bật (trái với đề bài phòng đang tối).

🔍 Phân tích các lựa chọn:
- 1. 電気、消してもいい？ (Tắt đèn đi - làm phòng tối hơn)
- 2. 電気、付けようか？: ĐÚNG - Đề nghị bật đèn giúp bạn
- 3. 電気、付けたままだよ (Bảo đang bật đèn - sai thực tế phòng đang tối)

📄 Trích PDF gốc (Trang 23 - 聴解原文):
2. 電気、付けようか？"""
    }

    # Q89 (Mondai 3 - 4)
    expls[89] = {
        "snippet": "聴解 問題3 (4): 靴を買う前に履いてみたいです。店の人に何と言いますか",
        "correctOption": 3,
        "audioScriptJa": """【問題3 - 4番】
靴を買う前に履いてみたいです。店の人に何と言いますか。
1. これ、履かなければなりませんか。
2. これ、履いてみたらどうですか。
3. これ、履いてみてもいいですか。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Trước khi mua giày, bạn muốn xỏ thử vào chân xem vừa không. Bạn sẽ nói gì với nhân viên bán hàng?
1. Đôi này tôi bắt buộc phải đi thử vào à?
2. Đôi này anh/chị xỏ thử vào xem sao?
3. Đôi này tôi có thể xỏ thử xem được không ạ?""",
        "explanation": """🎯 Đáp án đúng: [3]

💬 Tình huống đề bài:
"Trước khi quyết định mua giày, bạn muốn đi thử vào chân. Bạn sẽ xin phép nhân viên cửa hàng thế nào?"

💡 Phân tích tình huống & Giao tiếp chuẩn:
• Muốn xin phép người khác cho mình thử làm một hành động gì đó, sử dụng cấu trúc: 「V-てみてもいいですか」 (Tôi có thể làm thử V được không ạ?).
• Đi giày/xỏ giày là động từ 「履く (はく)」 -> 「履いてみてもいいですか」 (Tôi có thể xỏ thử đôi này được không ạ?).
• Câu 1 là câu hỏi về nghĩa vụ bắt buộc (Tôi bắt buộc phải xỏ à?). Câu 2 là đưa ra lời khuyên cho đối phương (Anh thử xỏ vào xem).
• Do đó đáp án chuẩn xác là phương án [3].

🔍 Phân tích các lựa chọn:
- 1. これ、履かなければなりませんか (Hỏi nghĩa vụ bắt buộc - sai ngữ cảnh)
- 2. これ、履いてみたらどうですか (Khuyên nhân viên đi thử - sai ngôi)
- 3. これ、履いてみてもいいですか: ĐÚNG - Xin phép được đi thử giày

📄 Trích PDF gốc (Trang 23 - 聴解原文):
3. これ、履いてみてもいいですか。"""
    }

    # Q90 (Mondai 3 - 5)
    expls[90] = {
        "snippet": "聴解 問題3 (5): 友達がかわいいネックレスをしています。何と言いますか",
        "correctOption": 3,
        "audioScriptJa": """【問題3 - 5番】
友達がかわいいネックレスをしています。買った店が知りたいです。何と言いますか。
1. どの店で買うつもりですか。
2. 買ったかどうか教えてください。
3. それはどこで買ったんですか。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Bạn của bạn đang đeo một chiếc vòng cổ rất dễ thương. Bạn muốn biết bạn mình đã mua ở cửa hàng nào. Bạn sẽ nói câu gì?
1. Cậu dự định mua ở cửa hàng nào thế?
2. Hãy cho tớ biết cậu đã mua hay chưa nhé.
3. Chiếc đó cậu đã mua ở đâu thế?""",
        "explanation": """🎯 Đáp án đúng: [3]

💬 Tình huống đề bài:
"Bạn của bạn đang đeo một chiếc vòng cổ rất xinh xắn. Bạn muốn hỏi xem bạn ấy đã mua ở tiệm nào. Bạn sẽ nói thế nào?"

💡 Phân tích tình huống & Giao tiếp chuẩn:
• Người bạn ĐÃ mua chiếc vòng cổ và hiện ĐANG đeo trên cổ (ネックレスをしている), nên hành động mua đã hoàn thành trong quá khứ.
• Muốn biết địa điểm mua sắm, câu hỏi chuẩn xác là: 「どこで買ったんですか」 (Cậu đã mua cái đó ở đâu vậy?).
• Câu 1 dùng thì tương lai 「買うつもり」 (dự định mua ở đâu) là sai vì bạn đã mua rồi. Câu 2 hỏi "đã mua hay chưa" (買ったかどうか) cũng sai vì sờ sờ trước mắt bạn đang đeo rồi.
• Vì vậy đáp án chính xác là [3].

🔍 Phân tích các lựa chọn:
- 1. どの店で買うつもりですか (Hỏi dự định mua tương lai - sai vì bạn đã mua rồi)
- 2. 買ったかどうか教えてください (Hỏi đã mua hay chưa - sai thực tế)
- 3. それはどこで買ったんですか: ĐÚNG - Hỏi nguồn gốc nơi đã mua

📄 Trích PDF gốc (Trang 23 - 聴解原文):
3. それはどこで買ったんですか。"""
    }

    # Q91 (Mondai 4 - 1)
    expls[91] = {
        "snippet": "聴解 問題4 (1): 家でパーティーするんだけど、よかったら来ない？",
        "correctOption": 3,
        "audioScriptJa": """【問題4 - 1番】
家でパーティーするんだけど、よかったら来ない？
1. えっ、行ったんですか。
2. きっと来ませんよ。
3. はい、行きたいです。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Tớ tổ chức tiệc tại nhà, nếu được thì cậu ghé chơi nhé?
1. Ơ, cậu đã đi rồi à?
2. Chắc chắn là sẽ không đến đâu.
3. Vâng/Có chứ, tớ rất muốn đi!""",
        "explanation": """🎯 Đáp án đúng: [3]

💬 Dịch nghĩa câu hỏi:
"Tớ tổ chức tiệc tại nhà, nếu được thì cậu ghé chơi nhé?"

💡 Phân tích câu hỏi & Đối đáp phản xạ:
• Mẫu câu rủ rê, mời mọc thân mật: 「～ない？」 (Làm... không?).
• Khi nhận được lời mời tham gia tiệc vui vẻ, câu đáp lại lịch sự và tự nhiên nhất là nhận lời: 「はい、行きたいです」 (Vâng, tớ rất muốn đi!).
• Câu 1 「行ったんですか」 hỏi về hành động đã đi trong quá khứ (lạc đề). Câu 2 「きっと来ませんよ」 (chắc chắn sẽ không đến đâu) là câu nói cộc cằn, sai ngôi nói.
• Do đó đáp án đúng là [3].

🔍 Phân tích các lựa chọn:
- 1. えっ、行ったんですか (Ủa cậu đã đi rồi à - sai thì quá khứ)
- 2. きっと来ませんよ (Chắc chắn sẽ không đến đâu - lạc đề)
- 3. はい、行きたいです: ĐÚNG - Hào hứng nhận lời mời

📄 Trích PDF gốc (Trang 23 - 聴解原文):
3. はい、行きたいです。"""
    }

    # Q92 (Mondai 4 - 2)
    expls[92] = {
        "snippet": "聴解 問題4 (2): てんぷらを食べるのは、初めてですか",
        "correctOption": 3,
        "audioScriptJa": """【問題4 - 2番】
てんぷらを食べるのは、初めてですか。
1. これから始めます。
2. ほとんど食べてしまいました。
3. いいえ、二度目です。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Đây là lần đầu tiên bạn ăn món Tempura à?
1. Từ bây giờ tôi sẽ bắt đầu.
2. Tôi đã ăn gần hết sạch mất rồi.
3. Dạ không, đây là lần thứ hai rồi ạ.""",
        "explanation": """🎯 Đáp án đúng: [3]

💬 Dịch nghĩa câu hỏi:
"Đây là lần đầu tiên bạn ăn món Tempura à?"

💡 Phân tích câu hỏi & Đối đáp phản xạ:
• Câu hỏi xác nhận tần suất/kinh nghiệm lần đầu: 「初めてですか」 (Có phải là lần đầu không?).
• Cách đối đáp chuẩn là xác nhận có phải lần đầu hay không, hoặc nêu số lần đã từng trải nghiệm: 「いいえ、二度目です」 (Dạ không, đây là lần thứ hai rồi ạ).
• Câu 1 nhầm từ đồng âm 「初めて (lần đầu)」 với động từ 「始める (bắt đầu)」. Câu 2 trả lời về lượng thức ăn đã ăn sạch mất rồi (lạc đề).
• Do đó đáp án chuẩn xác là [3].

🔍 Phân tích các lựa chọn:
- 1. これから始めます (Bắt đầu - bẫy nhầm từ vựng)
- 2. ほとんど食べてしまいました (Ăn gần hết - lạc đề)
- 3. いいえ、二度目です: ĐÚNG - Trả lời số lần từng ăn

📄 Trích PDF gốc (Trang 23 - 聴解原文):
3. いいえ、二度目です。"""
    }

    # Q93 (Mondai 4 - 3)
    expls[93] = {
        "snippet": "聴解 問題4 (3): 今度みんなで行く旅行、どこにしようか",
        "correctOption": 2,
        "audioScriptJa": """【問題4 - 3番】
今度みんなで行く旅行、どこにしようか。
1. うん、そうしよう。
2. どこでもいいよ。
3. 行ったことがないよ。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Chuyến du lịch sắp tới mọi người cùng đi, chúng mình chọn địa điểm ở đâu được nhỉ?
1. Ừ, cứ quyết định làm thế đi.
2. Đi đâu cũng được hết á!
3. Tớ chưa từng đi bao giờ cả.""",
        "explanation": """🎯 Đáp án đúng: [2]

💬 Dịch nghĩa câu hỏi:
"Chuyến du lịch sắp tới mọi người cùng đi, chúng mình chọn địa điểm ở đâu được nhỉ?"

💡 Phân tích câu hỏi & Đối đáp phản xạ:
• Người nói hỏi ý kiến về địa điểm: 「どこにしようか」 (Chọn nơi nào bây giờ nhỉ?).
• Khi được hỏi chọn nơi nào, phương án phản hồi tự nhiên thể hiện sự thoải mái, tán đồng ý kiến tập thể là: 「どこでもいいよ」 (Ở đâu cũng được cả!).
• Câu 1 「うん、そうしよう」 (Ừ cứ vậy đi) chỉ dùng khi đối phương đã đưa ra một đề xuất cụ thể (ở đây đối phương đang hỏi chưa đề xuất). Câu 3 「行ったことがない」 (Tôi chưa từng đi) không trả lời cho câu hỏi chọn nơi nào.
• Do đó đáp án đúng là [2].

🔍 Phân tích các lựa chọn:
- 1. うん、そうしよう (Đồng ý đề xuất - sai vì chưa ai đưa ra đề xuất địa điểm)
- 2. どこでもいいよ: ĐÚNG - Bày tỏ quan điểm đi đâu cũng được
- 3. 行ったことがないよ (Chưa từng đi - lạc đề)

📄 Trích PDF gốc (Trang 23 - 聴解原文):
2. どこでもいいよ。"""
    }

    # Q94 (Mondai 4 - 4)
    expls[94] = {
        "snippet": "聴解 問題4 (4): このペン、ちょっと書きにくいですね",
        "correctOption": 2,
        "audioScriptJa": """【問題4 - 4番】
このペン、ちょっと書きにくいですね。
1. 本当によく書けますね。
2. じゃあ、こちらを使ってください。
3. ちょっと安いですよ。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Cây bút này hơi khó viết nhỉ.
1. Công nhận là viết rất mượt trơn tru nhỉ.
2. Vậy thì xin mời dùng cây bút này của tôi ạ.
3. Hơi bị rẻ tiền đấy.""",
        "explanation": """🎯 Đáp án đúng: [2]

💬 Dịch nghĩa câu hỏi:
"Cây bút này hơi khó viết nhỉ."

💡 Phân tích câu hỏi & Đối đáp phản xạ:
• Người nói phàn nàn bút khó viết: 「書きにくいですね」 (Khó viết nhỉ).
• Cách phản ứng lịch thiệp, chu đáo trong giao tiếp tiếng Nhật là đưa ra sự hỗ trợ đổi bút khác: 「じゃあ、こちらを使ってください」 (Thế thì xin mời bạn dùng cây bút này nhé).
• Câu 1 bảo "viết rất trơn tru tốt" (trái ngược hoàn toàn cảm nhận của người nói). Câu 3 bảo "rẻ tiền đấy" (khiếm nhã, lạc đề).
• Do đó đáp án chuẩn xác là [2].

🔍 Phân tích các lựa chọn:
- 1. 本当によく書けますね (Viết rất tốt - ngược ý đối phương)
- 2. じゃあ、こちらを使ってください: ĐÚNG - Đưa ra giải pháp đổi bút giúp bạn
- 3. ちょっと安いですよ (Hơi rẻ tiền - bất lịch sự)

📄 Trích PDF gốc (Trang 23 - 聴解原文):
2. じゃあ、こちらを使ってください。"""
    }

    # Q95 (Mondai 4 - 5)
    expls[95] = {
        "snippet": "聴解 問題4 (5): 大学を卒業したら、どうするんですか",
        "correctOption": 1,
        "audioScriptJa": """【問題4 - 5番】
大学を卒業したら、どうするんですか。
1. デパートで働くことにしました。
2. デパートへ行くところです。
3. デパートでアルバイトをしたことがあります。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Sau khi tốt nghiệp đại học, bạn dự định sẽ làm gì?
1. Tôi đã quyết định sẽ làm việc tại một trung tâm bách hóa.
2. Tôi đang chuẩn bị đi đến trung tâm bách hóa.
3. Tôi từng làm thêm ở trung tâm bách hóa rồi.""",
        "explanation": """🎯 Đáp án đúng: [1]

💬 Dịch nghĩa câu hỏi:
"Sau khi tốt nghiệp đại học, bạn dự định sẽ làm gì?"

💡 Phân tích câu hỏi & Đối đáp phản xạ:
• Câu hỏi hỏi về dự định sau khi tốt nghiệp trong tương lai: 「大学を卒業したら、どうするんですか」.
• Mẫu câu nói về quyết định, dự định tương lai: 「V-る + ことにする / ことにしました」 -> 「デパートで働くことにしました」 (Tôi đã quyết định sẽ vào làm việc tại một trung tâm thương mại bách hóa).
• Câu 2 「～ところです」 diễn tả hành động đang sắp sửa diễn ra ngay tại thời điểm nói. Câu 3 「～たことがある」 kể về kinh nghiệm đã làm trong quá khứ. Cả hai câu này đều không trả lời được cho dự định sau tốt nghiệp.
• Do đó đáp án đúng là [1].

🔍 Phân tích các lựa chọn:
- 1. デパートで働くことにしました: ĐÚNG - Chia sẻ quyết định tương lai
- 2. デパートへ行くところです (Đang chuẩn bị đi bách hóa ngay bây giờ - sai thời điểm)
- 3. デパートでアルバイトをしたことがあります (Kể kinh nghiệm quá khứ - sai ngữ cảnh)

📄 Trích PDF gốc (Trang 23 - 聴解原文):
1. デパートで働くことにしました。"""
    }

    # Q96 (Mondai 4 - 6)
    expls[96] = {
        "snippet": "聴解 問題4 (6): 料理、上手ですね。誰に教えてもらったんですか",
        "correctOption": 2,
        "audioScriptJa": """【問題4 - 6番】
料理、上手ですね。誰に教えてもらったんですか。
1. はい、教えてもらいました。
2. 自分で覚えたんです。
3. 姉に教えましたよ。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Bạn nấu ăn giỏi thật đấy. Bạn được ai chỉ dạy cho vậy?
1. Vâng, tôi đã được dạy rồi.
2. Là do tôi tự học/tự mày mò lấy đấy ạ.
3. Tôi đã dạy cho chị gái tôi đấy.""",
        "explanation": """🎯 Đáp án đúng: [2]

💬 Dịch nghĩa câu hỏi:
"Bạn nấu ăn khéo quá. Ai đã chỉ dạy cho bạn thế?"

💡 Phân tích câu hỏi & Đối đáp phản xạ:
• Câu hỏi có từ để hỏi danh tính người dạy: 「誰に教えてもらったんですか」 (Được AI dạy cho thế?).
• Câu trả lời phù hợp phải chỉ ra người dạy, hoặc giải thích là tự mình học lấy: 「自分で覚えたんです」 (Là tôi tự học/tự mò mẫm nhớ lấy đấy ạ).
• Câu 1 chỉ trả lời 「はい、教えてもらいました」 (Vâng, tôi đã được dạy) mà không trả lời là được AI dạy. Câu 3 「姉に教えました」 (Tôi dạy cho chị gái) là ngược hướng cho nhận.
• Do đó đáp án chuẩn xác là [2].

🔍 Phân tích các lựa chọn:
- 1. はい、教えてもらいました (Chưa trả lời được hỏi 'ai')
- 2. 自分で覚えたんです: ĐÚNG - Trả lời là tự học, không có ai dạy
- 3. 姉に教えましたよ (Ngược hướng: mình dạy chị)

📄 Trích PDF gốc (Trang 23 - 聴解原文):
2. 自分で覚えたんです。"""
    }

    # Q97 (Mondai 4 - 7)
    expls[97] = {
        "snippet": "聴解 問題4 (7): あのう、ちょっとお願いしたいことがあるんですが……",
        "correctOption": 2,
        "audioScriptJa": """【問題4 - 7番】
あのう、ちょっとお願いしたいことがあるんですが……
1. いいえ、ありませんよ。
2. はい、何でしょうか。
3. こちらこそ、お願いします。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Xin lỗi, tôi có một việc muốn nhờ bạn một chút...
1. Không, không có việc gì đâu.
2. Vâng, có chuyện gì thế ạ?
3. Chính tôi mới phải nhờ bạn giúp đỡ.""",
        "explanation": """🎯 Đáp án đúng: [2]

💬 Dịch nghĩa câu hỏi:
"Xin lỗi, tôi có một việc muốn nhờ bạn một chút..."

💡 Phân tích câu hỏi & Đối đáp phản xạ:
• Lời mở đầu đặt vấn đề trước khi nhờ vả: 「あのう、ちょっとお願いしたいことがあるんですが……」 (Tôi có chút việc muốn nhờ...).
• Khi người khác mở lời muốn nhờ mình, phản xạ đáp lại lịch sự và sẵn sàng lắng nghe là: 「はい、何でしょうか」 (Vâng, có chuyện gì thế ạ? / Bạn cứ nói đi).
• Câu 1 「いいえ、ありませんよ」 (Không có đâu) là cộc lốc vô nghĩa. Câu 3 「こちらこそ、お願いします」 (Chính tôi mới cần nhờ) chỉ dùng khi cả hai bên cùng hợp tác hoặc nhờ vả lẫn nhau.
• Do đó đáp án chuẩn xác là [2].

🔍 Phân tích các lựa chọn:
- 1. いいえ、ありませんよ (Lạc đề, vô nghĩa)
- 2. はい、何でしょうか: ĐÚNG - Sẵn sàng lắng nghe lời nhờ vả
- 3. こちらこそ、お願いします (Chỉ dùng khi cùng nhờ nhau)

📄 Trích PDF gốc (Trang 23 - 聴解原文):
2. はい、何でしょうか。"""
    }

    # Optional Q98 fallback if needed
    expls[98] = {
        "snippet": "聴解 問題4 (8): お疲れ様でした",
        "correctOption": 2,
        "audioScriptJa": """【問題4 - 8番】
お疲れ様でした。
1. お大事に。
2. お疲れ様でした。
3. ごちそうさまでした。""",
        "audioScriptVi": """【Dịch kịch bản bài nghe】
Bạn đã vất vả rồi! (Chào sau giờ làm việc)
1. Hãy giữ gìn sức khỏe nhé (chúc người ốm).
2. Bạn cũng đã vất vả rồi! (đáp lễ sau giờ làm).
3. Cảm ơn vì bữa ăn ngon.""",
        "explanation": """🎯 Đáp án đúng: [2]

💬 Dịch nghĩa câu hỏi:
"Chào bạn sau một ngày làm việc vất vả (お疲れ様でした)."

💡 Phân tích câu hỏi & Đối đáp phản xạ:
• Câu chào kết thúc ngày làm việc: 「お疲れ様でした」.
• Đáp lễ chuẩn mực: 「お疲れ様でした」 -> Đáp án [2]."""
    }

    return expls

if __name__ == "__main__":
    data = get_listening_2010_explanations()
    print(f"Prepared {len(data)} authentic listening explanations for 2010!")
