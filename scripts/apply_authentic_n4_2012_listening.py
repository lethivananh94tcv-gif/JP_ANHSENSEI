# -*- coding: utf-8 -*-
"""
Build and apply 100% authentic explanations and official answers for JLPT N4 2012-12
Listening Section (Môn 3: 聴解, Câu 1 đến Câu 28, Global indices 70..97)
Extracted directly from Pages 11 to 15 and Pages 22 to 24 of n4-2012-12.pdf
"""
import os
import json
import urllib.request

LISTENING_QUESTIONS = {
    70: {
        "globalIndex": 70,
        "localPdfNumber": 1,
        "mondai": 1,
        "snippet": "Mondai 1 - Câu 1: Phương tiện đi đến bảo tàng mỹ thuật (何で美術館へ行きますか)",
        "options": ["自転車 (Xe đạp)", "電車 (Tàu điện)", "バス (Xe buýt)", "車 (Ô tô)"],
        "correctOption": 1,
        "audioScriptJa": "男：美術館に行きたいんですけど、何で行くのが便利ですか。\n女：車で行けば10分ですよ。\n男：そうですか。電車かバスでも行けますか。\n女：ううん、行けますけど、時間がかかりますよ。自転車は持っていますか。\n男：はい。\n女：じゃあ、自転車のほうが便利ですよ。\n男：そうですか。分かりました。じゃ、そうします。\n質問：男の人は、何で美術館へ行きますか。",
        "audioScriptVi": "Nam: Tôi muốn đi đến bảo tàng mỹ thuật, đi bằng gì thì tiện nhỉ?\nNữ: Nếu đi bằng ô tô thì mất 10 phút thôi.\nNam: Vậy à. Đi bằng tàu điện hay xe buýt có được không?\nNữ: Đi được nhưng mất thời gian lắm. Anh có xe đạp không?\nNam: Có chứ.\nNữ: Thế thì đi xe đạp tiện hơn đấy.\nNam: Vậy à. Tôi hiểu rồi. Vậy tôi sẽ đi xe đạp.\nCâu hỏi: Người đàn ông sẽ đi đến bảo tàng mỹ thuật bằng phương tiện gì?",
        "explanation": "🎯 Đáp án đúng: [1] 自転車 (Xe đạp)\n\n💬 Dịch đoạn hội thoại:\n• Nam: \"Tôi muốn đi đến bảo tàng mỹ thuật, đi bằng phương tiện gì thì tiện nhỉ?\"\n• Nữ: \"Nếu đi bằng ô tô thì mất 10 phút thôi.\"\n• Nam: \"Thế à. Đi tàu điện hoặc xe buýt có được không?\"\n• Nữ: \"Đi được nhưng tốn thời gian lắm. Anh có xe đạp không?\"\n• Nam: \"Tôi có.\"\n• Nữ: \"Vậy thì đi xe đạp tiện hơn đấy.\"\n• Nam: \"Thế à, tôi hiểu rồi. Vậy tôi sẽ đi xe đạp.\"\n• Câu hỏi: Người đàn ông sẽ đi đến bảo tàng bằng phương tiện gì?\n\n💡 Phân tích & Giải thích:\n• Người phụ nữ ban đầu gợi ý ô tô, nhưng người đàn ông hỏi tiếp tàu điện/xe buýt. Nữ bảo đi tàu điện/xe buýt tốn thời gian rồi hỏi nam có xe đạp không. Khi nam xác nhận có xe đạp, nữ khuyên \"自転車のほうが便利ですよ\" (Đi xe đạp tiện hơn đấy).\n• Nam lập tức đồng ý: \"じゃ、そうします\" (Vậy tôi sẽ đi xe đạp).\n• Do đó người đàn ông quyết định đi bằng xe đạp (自転車).\n\n🔍 Phân tích các lựa chọn:\n- [1] 自転車 (Xe đạp): ĐÚNG, theo lời khuyên của bạn nữ và nam đã chốt đi xe đạp.\n- [2] 電車 (Tàu điện): SAI, tốn thời gian (時間がかかります).\n- [3] バス (Xe buýt): SAI, tốn thời gian.\n- [4] 車 (Ô tô): SAI, nam không chọn ô tô.\n\n📄 Trích đề thi gốc (聴解原文):\n「じゃあ、自転車のほうが便利ですよ。」「じゃ、そうします。」→ 正解: [1]"
    },
    71: {
        "globalIndex": 71,
        "localPdfNumber": 2,
        "mondai": 1,
        "snippet": "Mondai 1 - Câu 2: Quà sinh nhật bạn nam chọn mua tặng Sato (何を買いますか)",
        "options": ["かばん (Túi xách)", "カップ (Cốc uống nước)", "コーヒー (Cà phê)", "タオル (Khăn)"],
        "correctOption": 4,
        "audioScriptJa": "男：来週、佐藤さんの誕生日だね。もうプレゼント、買った？\n女：うん。かばん、買った。\n男：そうか。僕はまだ決められなくて困っているんだ。\n女：そう。じゃあ、カップはどう？佐藤さん、コーヒーが好きで、よく飲んでいるよ。\n男：ううん、でも、カップはもうたくさん持っているかもしれないな。\n女：じゃあ、タオルはどう？よくスポーツをしているから。\n男：そうだね。じゃあ、そうしよう。ありがとう。\n質問：男の学生は、何を買いますか。",
        "audioScriptVi": "Nam: Tuần sau là sinh nhật bạn Sato rồi nhỉ. Cậu đã mua quà chưa?\nNữ: Ừ, tớ mua túi xách rồi.\nNam: Thế à. Tớ vẫn chưa quyết định được nên đang băn khoăn đây.\nNữ: Vậy à. Thế tặng cốc uống nước thì sao? Sato thích cà phê, hay uống lắm.\nNam: Ừm, nhưng có khi bạn ấy đã có nhiều cốc rồi.\nNữ: Thế thì khăn lau/khăn thể thao thì sao? Vì bạn ấy hay chơi thể thao mà.\nNam: Đúng rồi nhỉ. Vậy tớ sẽ mua khăn. Cảm ơn cậu nhé.\nCâu hỏi: Nam sinh sẽ mua cái gì?",
        "explanation": "🎯 Đáp án đúng: [4] タオル (Khăn)\n\n💬 Dịch đoạn hội thoại:\n• Nam: \"Tuần sau là sinh nhật Sato rồi nhỉ. Cậu mua quà chưa?\"\n• Nữ: \"Ừ, tớ mua túi xách rồi.\"\n• Nam: \"Thế à. Tớ chưa quyết định được nên đang đau đầu đây.\"\n• Nữ: \"Thế à. Hay là tặng cốc uống cà phê? Sato thích cà phê, hay uống lắm.\"\n• Nam: \"Ừm, nhưng chắc bạn ấy có nhiều cốc rồi.\"\n• Nữ: \"Thế thì khăn thì sao? Bạn ấy hay chơi thể thao mà.\"\n• Nam: \"Ừ nhỉ. Quyết định mua khăn vậy. Cảm ơn cậu.\"\n• Câu hỏi: Nam sinh sẽ mua quà gì?\n\n💡 Phân tích & Giải thích:\n• Bạn nữ đã mua túi xách (かばん) rồi.\n• Bạn nữ gợi ý cốc (カップ) nhưng nam từ chối vì Sato có thể đã có nhiều cốc.\n• Bạn nữ gợi ý tiếp khăn (タオル) vì Sato hay chơi thể thao. Nam đồng ý ngay: \"じゃあ、そうしよう\" (Vậy tớ sẽ mua cái đó).\n• Do đó nam sinh sẽ mua khăn (タオル).\n\n🔍 Phân tích các lựa chọn:\n- [1] かばん (Túi xách): SAI, đây là quà do bạn nữ mua.\n- [2] カップ (Cốc): SAI, nam từ chối vì nghĩ Sato đã có nhiều.\n- [3] コーヒー (Cà phê): SAI, chỉ được nhắc tới vì Sato thích uống.\n- [4] タオル (Khăn): ĐÚNG, nam sinh chốt mua khăn tặng bạn.\n\n📄 Trích đề thi gốc (聴解原文):\n「じゃあ、タオルはどう？よくスポーツをしているから。」「じゃあ、そうしよう。」→ 正解: [4]"
    },
    72: {
        "globalIndex": 72,
        "localPdfNumber": 3,
        "mondai": 1,
        "snippet": "Mondai 1 - Câu 3: Số vé buổi hòa nhạc bạn nữ đặt trước (チケットを何枚予約しますか)",
        "options": ["2まい (2 vé)", "4まい (4 vé)", "5まい (5 vé)", "6まい (6 vé)"],
        "correctOption": 3,
        "audioScriptJa": "男：来月のコンサートのチケット、予約してくれる？\n女：うん、いいよ。何枚？\n男：僕たち二人と、友達四人。\n女：じゃあ、6枚ね。\n男：あ、そうだ、ごめん。一人都合が悪くなったから、五人だ。\n女：あ、そう。分かった。\n男：ありがとう。じゃあ、お願い。\n質問：女の人は、チケットを何枚予約しますか。",
        "audioScriptVi": "Nam: Cậu đặt giúp vé buổi hòa nhạc tháng sau nhé?\nNữ: Ừ, được chứ. Mấy vé vậy?\nNam: Hai đứa mình với 4 người bạn nữa.\nNữ: Thế là 6 vé nhỉ.\nNam: À đúng rồi, xin lỗi cậu. Một người bận việc đột xuất nên là 5 người thôi.\nNữ: À thế à. Tớ hiểu rồi.\nNam: Cảm ơn cậu nhé. Nhờ cậu đấy.\nCâu hỏi: Người phụ nữ sẽ đặt bao nhiêu vé?",
        "explanation": "🎯 Đáp án đúng: [3] 5まい (5 vé)\n\n💬 Dịch đoạn hội thoại:\n• Nam: \"Cậu đặt trước vé buổi hòa nhạc tháng sau giúp tớ nhé?\"\n• Nữ: \"Ừ được thôi. Đặt mấy vé?\"\n• Nam: \"Hai đứa mình với bốn người bạn nữa.\"\n• Nữ: \"Vậy là 6 vé nhé.\"\n• Nam: \"À xin lỗi, có 1 người bận việc không đi được, nên là 5 người.\"\n• Nữ: \"À thế à, tớ hiểu rồi.\"\n• Nam: \"Cảm ơn cậu, nhờ cậu nhé.\"\n• Câu hỏi: Người phụ nữ sẽ đặt bao nhiêu vé?\n\n💡 Phân tích & Giải thích:\n• Ban đầu nam tính 2 người bọn họ + 4 người bạn = 6 vé.\n• Tuy nhiên ngay sau đó nam đính chính: \"一人都合が悪くなったから、五人だ\" (Một người bận việc đột xuất nên chỉ còn 5 người). Nữ xác nhận hiểu rồi.\n• Vì vậy người phụ nữ sẽ đặt tổng cộng 5 vé.\n\n🔍 Phân tích các lựa chọn:\n- [1] 2まい: SAI, chỉ tính 2 người nam nữ.\n- [2] 4まい: SAI, chỉ tính 4 người bạn.\n- [3] 5まい: ĐÚNG, 6 người trừ đi 1 người bận = 5 người cần vé.\n- [4] 6まい: SAI, đây là dự tính ban đầu trước khi có 1 người bận.\n\n📄 Trích đề thi gốc (聴解原文):\n「一人都合が悪くなったから、五人だ。」「分かった。」→ 正解: [3]"
    },
    73: {
        "globalIndex": 73,
        "localPdfNumber": 4,
        "mondai": 1,
        "snippet": "Mondai 1 - Câu 4: Hai bức ảnh bạn nữ chọn gửi về cho bố mẹ (どの写真を送りますか)",
        "options": ["ア イ (Biển & Núi)", "ア エ (Biển & Trước trường)", "イ ウ (Núi & Trong phòng)", "イ エ (Núi & Trước trường)"],
        "correctOption": 4,
        "audioScriptJa": "女：国の両親に写真を送りたいんだけど、どれがいいと思う？\n男：この海の写真(ア)は顔が小さくてよく見えないね。\n女：うん。じゃ、だめだね。この山の写真(イ)はどう？\n男：うん、これ、いいね。\n女：じゃ、これ1枚。もう1枚は、この、わたしの部屋の写真(ウ)は？\n男：部屋があまりきれいじゃないから、やめたほうがいいよ。それより、大学の前でとった写真(エ)がいいよ。\n女：そうだな。この2枚にしよう。\n質問：女の人は、どの写真を送りますか。",
        "audioScriptVi": "Nữ: Tớ muốn gửi ảnh cho bố mẹ ở quê nhà, cậu thấy tấm nào đẹp?\nNam: Bức chụp ở biển này (ảnh ア) mặt cậu nhỏ quá nhìn không rõ nhỉ.\nNữ: Ừ, thế thì không được rồi. Tấm chụp ở ngọn núi này (ảnh イ) thì sao?\nNam: Ừ, tấm này đẹp đấy.\nNữ: Vậy chọn 1 tấm này nhé. Còn 1 tấm nữa, tấm chụp phòng ngủ của tớ này (ảnh ウ) được không?\nNam: Phòng không được ngăn nắp sạch sẽ lắm, cậu đừng gửi thì hơn. Thay vào đó, tấm chụp trước trường đại học (ảnh エ) đẹp đấy.\nNữ: Đúng rồi nhỉ. Vậy tớ chọn 2 tấm này (イ và エ).\nCâu hỏi: Người phụ nữ sẽ gửi những bức ảnh nào?",
        "explanation": "🎯 Đáp án đúng: [4] イ エ (Ảnh chụp ở ngọn núi và Ảnh chụp trước trường đại học)\n\n💬 Dịch đoạn hội thoại:\n• Nữ: \"Tớ muốn gửi ảnh cho bố mẹ ở quê nhà, cậu thấy bức nào đẹp?\"\n• Nam: \"Bức chụp ở biển (ảnh ア) này mặt nhỏ quá không thấy rõ.\"\n• Nữ: \"Ừ nhỉ, thế thì thôi. Bức chụp ngọn núi (ảnh イ) này thì sao?\"\n• Nam: \"Ừ, bức này đẹp đấy.\"\n• Nữ: \"Vậy lấy 1 tấm này. Còn 1 tấm nữa, tấm chụp phòng tớ (ảnh ウ) thì sao?\"\n• Nam: \"Phòng bừa bộn không sạch lắm, đừng gửi. Bức chụp trước trường đại học (ảnh エ) đẹp hơn.\"\n• Nữ: \"Ừ nhỉ. Tớ sẽ chọn 2 bức này (イ và エ).\"\n• Câu hỏi: Người phụ nữ sẽ gửi những bức ảnh nào?\n\n💡 Phân tích & Giải thích:\n• Bức ア (biển): mặt nhỏ không rõ -> Loại.\n• Bức イ (núi): cả hai đều khen đẹp -> Chọn tấm đầu tiên.\n• Bức ウ (phòng ngủ): phòng bừa bộn không đẹp -> Loại.\n• Bức エ (trước cổng trường đại học): bạn nam khen đẹp và bạn nữ đồng ý -> Chọn tấm thứ hai.\n• Hai bức ảnh được chọn là bức イ và bức エ.\n\n🔍 Phân tích các lựa chọn:\n- [1] ア イ: SAI vì bức ア bị loại do mặt nhỏ không rõ.\n- [2] ア エ: SAI vì bức ア bị loại.\n- [3] イ ウ: SAI vì bức ウ bị loại do phòng bừa bộn.\n- [4] イ エ: ĐÚNG, chọn ảnh ngọn núi (イ) và ảnh trước trường (エ).\n\n📄 Trích đề thi gốc (聴解原文):\n「この山の写真(イ)はどう？うん、これ、いいね。」「大学の前でとった写真(エ)がいいよ。そうだな。この2枚にしよう。」→ 正解: [4]"
    },
    74: {
        "globalIndex": 74,
        "localPdfNumber": 5,
        "mondai": 1,
        "snippet": "Mondai 1 - Câu 5: Đồ vật nam du học sinh mang đi thăm người ốm (何を持っていきますか)",
        "options": ["花 (Hoa)", "果物 (Hoa quả)", "本 (Sách)", "音楽のCD (Đĩa CD)"],
        "correctOption": 3,
        "audioScriptJa": "男：友達がけがをして、入院しているんです。お見舞いに行きたいんですが、日本では何を持っていきますか。\n女：そうですね。よく花や果物を持っていきます。病院では時間がたくさんあるから、本もいいと思いますよ。\n男：ああ、いいですね。本読むのが好きだから、そうします。\n女：ああ、それから、若い人なら音楽のCDもいいと思いますよ。\n男：ううん、でも、音楽はあまり聴きませんから。\n質問：男の留学生は、何を持っていきますか。",
        "audioScriptVi": "Nam: Bạn em bị thương đang phải nằm viện. Em muốn đi thăm bệnh, ở Nhật thì người ta thường mang theo gì ạ?\nNữ: À, mọi người hay mang hoa hoặc trái cây. Nhưng ở bệnh viện có nhiều thời gian rảnh rỗi nên cô nghĩ tặng sách cũng hay đấy.\nNam: A, hay quá ạ. Bạn em thích đọc sách nên em sẽ chọn mua sách.\nNữ: À, hơn nữa nếu là người trẻ thì đĩa CD âm nhạc cô nghĩ cũng tốt đấy.\nNam: Dạ, nhưng bạn em không hay nghe nhạc lắm.\nCâu hỏi: Nam sinh sẽ mang theo cái gì đi thăm bệnh?",
        "explanation": "🎯 Đáp án đúng: [3] 本 (Cuốn sách)\n\n💬 Dịch đoạn hội thoại:\n• Nam: \"Bạn em bị chấn thương đang nằm viện. Em muốn đi thăm bệnh (お見舞い), ở Nhật thì nên mang theo gì ạ?\"\n• Nữ: \"Mọi người thường mang hoa hoặc hoa quả. Nhưng ở bệnh viện nhiều thời gian rảnh nên cô thấy tặng sách cũng tốt.\"\n• Nam: \"A hay quá, bạn em thích đọc sách nên em sẽ mang sách.\"\n• Nữ: \"Ngoài ra, người trẻ thì tặng đĩa CD ca nhạc cũng hay.\"\n• Nam: \"Nhưng bạn em không hay nghe nhạc lắm ạ.\"\n• Câu hỏi: Nam du học sinh sẽ mang món quà gì đi thăm bệnh?\n\n💡 Phân tích & Giải thích:\n• Người phụ nữ gợi ý sách (\"本もいいと思いますよ\").\n• Nam sinh đồng ý ngay vì bạn mình rất thích đọc sách: \"本読むのが好きだから、そうします\" (Bạn em thích đọc sách nên em sẽ mang sách).\n• Khi nữ gợi ý đĩa CD thì nam từ chối vì bạn không hay nghe nhạc.\n• Do đó nam sinh chọn mang sách đi thăm bệnh.\n\n🔍 Phân tích các lựa chọn:\n- [1] 花 (Hoa): SAI, chỉ là phong tục chung được nữ nhắc tới.\n- [2] 果物 (Hoa quả): SAI, chỉ là phong tục chung được nữ nhắc tới.\n- [3] 本 (Sách): ĐÚNG, nam chọn vì bạn thích đọc sách.\n- [4] 音楽のCD (Đĩa CD): SAI, nam từ chối vì bạn không hay nghe nhạc.\n\n📄 Trích đề thi gốc (聴解原文):\n「本読むのが好きだから、そうします。」→ 正解: [3]"
    },
    75: {
        "globalIndex": 75,
        "localPdfNumber": 6,
        "mondai": 1,
        "snippet": "Mondai 1 - Câu 6: Việc bạn nữ sẽ làm tiếp theo ngay sau cuộc nói chuyện (このあと何をしますか)",
        "options": ["パソコンで作業する (Làm việc máy tính)", "資料のコピーをする (Photo tài liệu)", "会議に出席する (Dự cuộc họp)", "会議室にいすを並べる (Xếp ghế phòng họp)"],
        "correctOption": 2,
        "audioScriptJa": "男：ちょっと、いい？\n女：はい。\n男：今部長から電話があって、資料のコピーを頼まれたんだ。お願いしてもいい？\n女：分かりました。明日の会議の資料ですね。\n男：うん。それから、会議室の準備だけど、いすを並べておいてくれる？\n女：はい。でも、会議室は今、使っています。\n男：そうか。じゃあ、それは明日だね。\n質問：女の人は今日、このあと何をしますか。",
        "audioScriptVi": "Nam: Anh nhờ chút được không?\nNữ: Vâng ạ.\nNam: Vừa nãy trưởng phòng gọi điện nhờ photo tài liệu. Anh nhờ em làm giúp được không?\nNữ: Vâng em hiểu rồi ạ. Là tài liệu cuộc họp ngày mai đúng không ạ?\nNam: Ừ. Thêm nữa, về chuẩn bị phòng họp, em xếp sẵn ghế giúp anh nhé?\nNữ: Vâng. Nhưng hiện giờ phòng họp đang có người sử dụng ạ.\nNam: Thế à. Vậy việc đó để ngày mai nhé.\nCâu hỏi: Hôm nay người phụ nữ sau đây sẽ làm gì?",
        "explanation": "🎯 Đáp án đúng: [2] 資料のコピーをする (Photo tài liệu)\n\n💬 Dịch đoạn hội thoại:\n• Nam: \"Anh nhờ chút được không?\"\n• Nữ: \"Dạ vâng.\"\n• Nam: \"Vừa rồi trưởng phòng gọi nhờ photo tài liệu. Anh nhờ em photo giúp nhé?\"\n• Nữ: \"Vâng, tài liệu cuộc họp ngày mai đúng không ạ?\"\n• Nam: \"Ừ. Thêm nữa, em xếp sẵn ghế chuẩn bị phòng họp giúp anh được không?\"\n• Nữ: \"Vâng. Nhưng mà phòng họp hiện tại đang có người dùng ạ.\"\n• Nam: \"Thế à. Vậy thì việc xếp ghế để ngày mai nhé.\"\n• Câu hỏi: Hôm nay người phụ nữ sau đây sẽ làm gì?\n\n💡 Phân tích & Giải thích:\n• Nam giao 2 công việc: photo tài liệu (資料のコピー) và xếp ghế phòng họp (いすを並べる).\n• Do phòng họp đang có người dùng nên việc xếp ghế được dời sang ngày mai (\"じゃあ、それは明日だね\").\n• Vì vậy hôm nay sau đây người phụ nữ chỉ thực hiện việc photo tài liệu.\n\n🔍 Phân tích các lựa chọn:\n- [1] パソコンで作業する: SAI, không được nhắc đến.\n- [2] 資料のコピーをする: ĐÚNG, công việc cần làm ngay hôm nay.\n- [3] 会議に出席する: SAI, cuộc họp diễn ra vào ngày mai.\n- [4] 会議室にいすを並べる: SAI, đã hoãn sang ngày mai vì phòng họp đang có người dùng.\n\n📄 Trích đề thi gốc (聴解原文):\n「資料のコピーを頼まれたんだ。お願いしてもいい？」「分かりました。」「（いすを並べるのは）明日だね。」→ 正解: [2]"
    },
    76: {
        "globalIndex": 76,
        "localPdfNumber": 7,
        "mondai": 1,
        "snippet": "Mondai 1 - Câu 7: Giờ và địa điểm học sinh phải tập trung vào ngày mai (何時にどこに集まりますか)",
        "options": ["8時半に きょうしつ (8h30 ở phòng học)", "8時半に たいいくかんの 前 (8h30 trước nhà thể chất)", "9時に きょうしつ (9h00 ở phòng học)", "9時に たいいくかんの 前 (9h00 trước nhà thể chất)"],
        "correctOption": 2,
        "audioScriptJa": "男：ええ、これから、明日のバス旅行について連絡します。明日は、朝8時半までに来てください。いつもは9時からですが、30分早いので、間違えないでくださいね。学校の体育館の前に集まってください。いいですか。教室じゃなくて、体育館の前ですよ。\n質問：学生は明日、何時にどこに集まらなければなりませんか。",
        "audioScriptVi": "Nam: Sau đây thầy xin thông báo về chuyến dã ngoại bằng xe buýt ngày mai. Ngày mai, các em hãy đến trước 8 giờ 30 sáng nhé. Mọi khi là từ 9 giờ, nhưng ngày mai sớm hơn 30 phút nên đừng nhầm lẫn nhé. Các em hãy tập trung ở trước nhà thể chất của trường. Nhớ rõ chưa, không phải ở phòng học mà là trước nhà thể chất đấy nhé.\nCâu hỏi: Ngày mai học sinh phải tập trung lúc mấy giờ và ở đâu?",
        "explanation": "🎯 Đáp án đúng: [2] 8時半に たいいくかんの 前 (8 giờ 30 trước nhà thể chất)\n\n💬 Dịch lời thông báo của thầy giáo:\n• \"Sau đây thầy thông báo về chuyến du lịch xe buýt ngày mai.\n• Ngày mai các em hãy đến trước 8 giờ 30 sáng (朝8時半までに来てください). Bình thường bắt đầu từ 9 giờ, nhưng ngày mai sớm hơn 30 phút nên các em đừng đến nhầm giờ nhé.\n• Hãy tập trung ở trước nhà thể chất của trường (学校の体育館の前に集まってください). Các em rõ chưa, không phải ở phòng học mà là trước nhà thể chất đấy nhé (教室じゃなくて、体育館の前ですよ).\"\n• Câu hỏi: Học sinh ngày mai phải tập trung lúc mấy giờ và ở đâu?\n\n💡 Phân tích & Giải thích:\n• Thời gian tập trung: 8 giờ 30 sáng (sớm hơn ngày thường 30 phút, ngày thường là 9 giờ).\n• Địa điểm tập trung: Trước nhà thể chất (体育館の前), thầy giáo nhấn mạnh không phải ở lớp học (教室じゃなくて).\n• Do đó thời gian và địa điểm đúng là: 8 giờ 30 trước nhà thể chất.\n\n🔍 Phân tích các lựa chọn:\n- [1] 8時半に きょうしつ: SAI địa điểm (không phải lớp học).\n- [2] 8時半に たいいくかんの 前: ĐÚNG cả thời gian (8h30) và địa điểm (trước nhà thể chất).\n- [3] 9時に きょうしつ: SAI cả thời gian lẫn địa điểm.\n- [4] 9時に たいいくかんの 前: SAI thời gian (9h là giờ ngày thường).\n\n📄 Trích đề thi gốc (聴解原文):\n「明日は、朝8時半までに来てください。」「教室じゃなくて、体育館の前ですよ。」→ 正解: [2]"
    },
    77: {
        "globalIndex": 77,
        "localPdfNumber": 8,
        "mondai": 1,
        "snippet": "Mondai 1 - Câu 8: Nút bấm máy photocopy người đàn ông sẽ ấn tiếp theo (どのボタンを押しますか)",
        "options": ["あかと きいろ (Đỏ và Vàng)", "あかと しろ (Đỏ và Trắng)", "あおと きいろ (Xanh và Vàng)", "あおと しろ (Xanh và Trắng)"],
        "correctOption": 1,
        "audioScriptJa": "男：すみません。ちょっと、コピーの仕方を教えてもらえませんか。青いボタンを押したんですが、字が小さくなってしまったんです。\n女：字を大きくするなら、赤いボタンを押してください。\n男：あ、はい。それから、もう少し濃くしたいんです。\n女：じゃあ黄色いボタンを押してください。薄くするときは、白いボタンです。\n男：そうですか。どうもありがとうございます。\n質問：男の人はこのあとどのボタンを押しますか。",
        "audioScriptVi": "Nam: Xin lỗi, chị có thể chỉ cho tôi cách photo được không? Tôi vừa bấm nút màu xanh da trời, thế là chữ bị nhỏ đi mất rồi.\nNữ: Nếu muốn chữ to ra thì anh nhấn nút màu đỏ nhé.\nNam: À vâng. Thêm nữa, tôi muốn mực đậm hơn một chút ạ.\nNữ: Thế thì anh nhấn nút màu vàng nhé. Khi muốn mực nhạt hơn thì là nút màu trắng.\nNam: Vậy à. Cảm ơn chị nhiều nhé.\nCâu hỏi: Người đàn ông sau đây sẽ nhấn những nút nào?",
        "explanation": "🎯 Đáp án đúng: [1] あかと きいろ (Nút đỏ và nút vàng)\n\n💬 Dịch đoạn hội thoại:\n• Nam: \"Xin lỗi, chị chỉ giúp tôi cách photo được không? Tôi bấm nút xanh da trời (青) nên chữ bị thu nhỏ lại rồi.\"\n• Nữ: \"Muốn chữ to ra thì anh bấm nút màu đỏ (赤いボタン) nhé.\"\n• Nam: \"Vâng. Thêm nữa tôi muốn làm đậm mực hơn một chút.\"\n• Nữ: \"Vậy thì anh bấm nút màu vàng (黄色いボタン) nhé. Nút màu trắng là để làm nhạt đi.\"\n• Nam: \"Tôi hiểu rồi, cảm ơn chị.\"\n• Câu hỏi: Sau đây người đàn ông sẽ bấm những nút nào?\n\n💡 Phân tích & Giải thích:\n• Người đàn ông có 2 mong muốn:\n  1. Phóng to lại chữ (sau khi lỡ bấm nút xanh làm nhỏ chữ) -> Nữ bảo bấm nút đỏ (赤いボタン).\n  2. Làm chữ đậm hơn (\"もう少し濃くしたい\") -> Nữ bảo bấm nút vàng (黄色いボタン).\n• Vì vậy hai nút người đàn ông sẽ bấm là: Nút đỏ và nút vàng (あかと きいろ).\n\n🔍 Phân tích các lựa chọn:\n- [1] あかと きいろ: ĐÚNG, nút đỏ để phóng to chữ và nút vàng để tăng độ đậm mực.\n- [2] あかと しろ: SAI, nút trắng là để làm nhạt mực.\n- [3] あおと きいろ: SAI, nút xanh làm nhỏ chữ (anh ấy vừa bấm nhầm).\n- [4] あおと しろ: SAI hoàn toàn.\n\n📄 Trích đề thi gốc (聴解原文):\n「字を大きくするなら、赤いボタンを押してください。」「濃くしたいなら黄色いボタンを押してください。」→ 正解: [1]"
    },
    78: {
        "globalIndex": 78,
        "localPdfNumber": 1,
        "mondai": 2,
        "snippet": "Mondai 2 - Câu 1: Người mà bạn nữ đang sống cùng (だれと住んでいますか)",
        "options": ["りょうしん (Bố mẹ)", "あね (Chị gái)", "いもうと (Em gái)", "おとうと (Em trai)"],
        "correctOption": 4,
        "audioScriptJa": "男：山田さん、新しい生活はどう？\n女：はい、毎日楽しいです。\n男：ご両親と一緒じゃなくて、寂しくない？\n女：ええ、少し。でも、弟と一緒に住んでいるので、大丈夫です。\n男：そうなんだ。兄弟は弟さん一人？\n女：姉もいます。姉は両親と一緒に住んでいます。\n質問：女の学生は、だれと住んでいますか。",
        "audioScriptVi": "Nam: Yamada này, cuộc sống mới thế nào rồi?\nNữ: Dạ, ngày nào cũng vui lắm ạ.\nNam: Không sống cùng bố mẹ, em không thấy buồn à?\nNữ: Dạ, có một chút. Nhưng em sống cùng em trai nên cũng ổn ạ.\nNam: Thế à. Em chỉ có một người em trai thôi à?\nNữ: Em có cả chị gái nữa ạ. Chị gái em thì sống cùng với bố mẹ.\nCâu hỏi: Nữ sinh đang sống cùng với ai?",
        "explanation": "🎯 Đáp án đúng: [4] おとうと (Em trai)\n\n💬 Dịch đoạn hội thoại:\n• Nam: \"Yamada ơi, cuộc sống mới thế nào rồi?\"\n• Nữ: \"Dạ, ngày nào cũng vui ạ.\"\n• Nam: \"Không sống cùng bố mẹ, em không thấy cô đơn à?\"\n• Nữ: \"Dạ có một chút ạ. Nhưng vì em đang sống cùng em trai nên cũng không sao ạ.\"\n• Nam: \"Thế à. Nhà em chỉ có một người em trai thôi à?\"\n• Nữ: \"Em còn có chị gái nữa ạ. Chị gái thì đang sống cùng bố mẹ.\"\n• Câu hỏi: Nữ sinh đang sống cùng với ai?\n\n💡 Phân tích & Giải thích:\n• Nữ sinh nói rõ ràng hiện tại đang sống cùng em trai: \"弟と一緒に住んでいるので、大丈夫です\" (Vì em sống cùng em trai nên không sao ạ).\n• Bố mẹ và chị gái sống cùng nhau ở nơi khác.\n• Vì vậy người sống cùng bạn nữ là em trai (おとうと).\n\n🔍 Phân tích các lựa chọn:\n- [1] りょうしん (Bố mẹ): SAI, bạn nữ không sống cùng bố mẹ.\n- [2] あね (Chị gái): SAI, chị gái sống cùng bố mẹ.\n- [3] いもうと (Em gái): SAI, bạn nữ không có em gái.\n- [4] おとうと (Em trai): ĐÚNG, bạn nữ sống cùng em trai.\n\n📄 Trích đề thi gốc (聴解原文):\n「でも、弟と一緒に住んでいるので、大丈夫です。」→ 正解: [4]"
    },
    79: {
        "globalIndex": 79,
        "localPdfNumber": 2,
        "mondai": 2,
        "snippet": "Mondai 2 - Câu 2: Thời điểm nữ sinh hẹn gặp nam sinh để thảo luận (いつ相談しますか)",
        "options": ["今すぐ (Ngay bây giờ)", "今日の 4時 (4 giờ chiều hôm nay)", "今日の 6時 (6 giờ chiều hôm nay)", "あしたの ひる (Trưa mai)"],
        "correctOption": 2,
        "audioScriptJa": "女：先輩、相談したいことがあるんですが、今、いいですか。\n男：ごめん。今から授業があるんだ。\n女：そうですか。じゃ、今日の夕方はどうですか。\n男：6時から約束があるけど、4時頃なら大丈夫だよ。\n女：4時ですね。\n男：あ、明日の昼でもいいよ。\n女：すみません。明日は用事があるんです。\n男：そう。じゃあ、やっぱり今日にしよう。\n女：はい。お願いします。じゃ、教室で待っています。\n質問：女の学生は、いつ、男の学生に相談しますか。",
        "audioScriptVi": "Nữ: Tiền bối, em có chuyện muốn xin lời khuyên, bây giờ anh có rảnh không ạ?\nNam: Xin lỗi em. Bây giờ anh sắp có tiết học rồi.\nNữ: Thế ạ. Vậy chiều muộn hôm nay thì sao ạ?\nNam: Từ 6 giờ anh có hẹn rồi, nhưng khoảng 4 giờ thì được đấy.\nNữ: 4 giờ đúng không ạ.\nNam: À, trưa mai cũng được đấy.\nNữ: Em xin lỗi. Ngày mai em lại bận việc mất rồi.\nNam: Thế à. Vậy thì cứ chọn hôm nay đi.\nNữ: Vâng ạ. Nhờ tiền bối nhé. Vậy em sẽ đợi ở phòng học ạ.\nCâu hỏi: Nữ sinh sẽ hẹn gặp trao đổi với nam sinh vào lúc nào?",
        "explanation": "🎯 Đáp án đúng: [2] 今日の 4時 (4 giờ chiều hôm nay)\n\n💬 Dịch đoạn hội thoại:\n• Nữ: \"Tiền bối ơi, em có chuyện muốn nhờ anh tư vấn, bây giờ có tiện không ạ?\"\n• Nam: \"Xin lỗi, bây giờ anh phải vào học rồi.\"\n• Nữ: \"Thế ạ. Vậy chiều tối nay thì sao ạ?\"\n• Nam: \"6 giờ anh có hẹn rồi, nhưng khoảng 4 giờ thì được.\"\n• Nữ: \"4 giờ ạ.\"\n• Nam: \"À, trưa mai cũng được đấy.\"\n• Nữ: \"Dạ ngày mai em có việc bận mất rồi.\"\n• Nam: \"Thế thì cứ chốt hôm nay đi nhé.\"\n• Nữ: \"Vâng, em đợi anh ở phòng học.\"\n• Câu hỏi: Nữ sinh sẽ gặp trao đổi với nam sinh lúc nào?\n\n💡 Phân tích & Giải thích:\n• \"Bây giờ\" (今すぐ): Nam bận học -> Không được.\n• \"6 giờ tối nay\": Nam bận hẹn -> Không được.\n• \"Trưa mai\": Nữ bận việc riêng -> Không được.\n• \"4 giờ chiều nay\" (今日の4時): Nam rảnh (\"4時頃なら大丈夫だよ\") và hai người đã chốt gặp vào lúc này (\"じゃあ、やっぱり今日にしよう\").\n• Do đó thời gian gặp là 4 giờ chiều hôm nay.\n\n🔍 Phân tích các lựa chọn:\n- [1] 今すぐ: SAI, nam sinh bận vào lớp học ngay.\n- [2] 今日の 4時: ĐÚNG, thời gian cả hai người đều rảnh và thống nhất hẹn gặp.\n- [3] 今日の 6時: SAI, nam sinh có hẹn từ 6h.\n- [4] あしたの ひる: SAI, nữ sinh bận việc riêng vào ngày mai.\n\n📄 Trích đề thi gốc (聴解原文):\n「4時頃なら大丈夫だよ。」「じゃあ、やっぱり今日にしよう。」→ 正解: [2]"
    },
    80: {
        "globalIndex": 80,
        "localPdfNumber": 3,
        "mondai": 2,
        "snippet": "Mondai 2 - Câu 3: Lý do nữ du học sinh muốn đi làm thêm (どうしてアルバイトがしたいですか)",
        "options": ["りょこうに 行きたいから (Muốn đi du lịch)", "デパートで かいものが したいから (Muốn mua sắm)", "日本人の はたらきかたが しりたいから (Muốn biết cách làm việc người Nhật)", "日本語の べんきょうが したいから (Muốn học tiếng Nhật)"],
        "correctOption": 3,
        "audioScriptJa": "男：もうすぐ冬休みですね。どこかへ旅行に行きますか。\n女：いいえ。冬休みは、デパートでアルバイトをするつもりです。\n男：あ、そうですか。\n女：日本人の働き方が知りたいんです。\n男：いい経験になりますね。日本語も上手になると思いますよ。\n質問：女の留学生は、どうしてアルバイトがしたいですか。",
        "audioScriptVi": "Nam: Sắp tới kỳ nghỉ đông rồi nhỉ. Em có đi du lịch ở đâu không?\nNữ: Dạ không. Kỳ nghỉ đông này em dự định đi làm thêm ở trung tâm thương mại ạ.\nNam: À thế à.\nNữ: Em muốn tìm hiểu cách làm việc của người Nhật ạ.\nNam: Đó sẽ là trải nghiệm tốt đấy. Thầy nghĩ tiếng Nhật của em cũng sẽ giỏi lên nữa đấy.\nCâu hỏi: Tại sao nữ du học sinh lại muốn đi làm thêm?",
        "explanation": "🎯 Đáp án đúng: [3] 日本人の はたらきかたが しりたいから (Vì muốn tìm hiểu cách làm việc của người Nhật)\n\n💬 Dịch đoạn hội thoại:\n• Nam (thầy giáo): \"Sắp nghỉ đông rồi nhỉ. Em có đi du lịch đâu không?\"\n• Nữ: \"Dạ không, kỳ nghỉ đông em định đi làm thêm ở trung tâm thương mại.\"\n• Nam: \"À thế à.\"\n• Nữ: \"Em muốn tìm hiểu cách làm việc của người Nhật ạ (日本人の働き方が知りたいんです).\"\n• Nam: \"Trải nghiệm hay đấy. Thầy nghĩ tiếng Nhật của em cũng sẽ tiến bộ đấy.\"\n• Câu hỏi: Tại sao nữ du học sinh muốn đi làm thêm?\n\n💡 Phân tích & Giải thích:\n• Khi thầy giáo hỏi, nữ du học sinh trực tiếp giải thích lý do đi làm thêm: \"日本人の働き方が知りたいんです\" (Em muốn biết/tìm hiểu về cách làm việc của người Nhật).\n• Chi tiết tiếng Nhật tiến bộ là nhận xét của thầy giáo chứ không phải lý do nữ sinh đưa ra.\n• Do đó đáp án chính xác là [3].\n\n🔍 Phân tích các lựa chọn:\n- [1] りょこうに 行きたいから: SAI, bạn nữ nói không đi du lịch (いいえ).\n- [2] デパートで かいものが したいから: SAI, làm việc ở trung tâm thương mại chứ không phải để đi mua sắm.\n- [3] 日本人の はたらきかたが しりたいから: ĐÚNG, đúng nguyên văn lý do của bạn nữ.\n- [4] 日本語の べんきょうが したいから: SAI, đây là nhận xét khích lệ thêm của thầy giáo.\n\n📄 Trích đề thi gốc (聴解原文):\n「日本人の働き方が知りたいんです。」→ 正解: [3]"
    },
    81: {
        "globalIndex": 81,
        "localPdfNumber": 4,
        "mondai": 2,
        "snippet": "Mondai 2 - Câu 4: Ngày trong tuần có mưa suốt cả ngày (何曜日に、一日中雨が降るか)",
        "options": ["かようび (Thứ Ba)", "すいようび (Thứ Tư)", "もくようび (Thứ Năm)", "きんようび (Thứ Sáu)"],
        "correctOption": 3,
        "audioScriptJa": "男：東京の月曜日から1週間の天気予報です。月曜日と火曜日は晴れるでしょう。水曜日は、午前中は晴れますが、午後から曇って、夜には雨になるでしょう。木曜日は一日ずっと雨になるでしょう。金曜日と土曜日は晴れて、いい天気になるでしょう。\n質問：何曜日に、一日中雨が降ると言っていますか。",
        "audioScriptVi": "Nam: Sau đây là dự báo thời tiết 1 tuần từ thứ Hai tại Tokyo. Thứ Hai và thứ Ba trời sẽ nắng ráo. Thứ Tư, buổi sáng trời nắng nhưng buổi chiều nhiều mây và đêm sẽ có mưa. Thứ Năm sẽ có mưa suốt cả ngày. Thứ Sáu và thứ Bảy trời sẽ nắng và thời tiết đẹp.\nCâu hỏi: Bản tin nói thứ mấy sẽ mưa cả ngày?",
        "explanation": "🎯 Đáp án đúng: [3] もくようび (Thứ Năm)\n\n💬 Dịch bản tin dự báo thời tiết:\n• \"Dự báo thời tiết Tokyo một tuần bắt đầu từ thứ Hai:\n• Thứ Hai và thứ Ba: Trời nắng ráo.\n• Thứ Tư: Buổi sáng nắng, chiều nhiều mây, ban đêm sẽ có mưa.\n• Thứ Năm: Suốt cả ngày sẽ có mưa (木曜日は一日ずっと雨になるでしょう).\n• Thứ Sáu và thứ Bảy: Trời nắng, thời tiết đẹp.\"\n• Câu hỏi: Thứ mấy được thông báo là sẽ mưa cả ngày (一日中雨が降る)?\n\n💡 Phân tích & Giải thích:\n• Thứ Tư (水曜日): Chỉ mưa vào ban đêm (夜には雨).\n• Thứ Năm (木曜日): \"一日ずっと雨\" = mưa liên tục suốt cả ngày = \"一日中雨が降る\".\n• Do đó thứ Năm là ngày mưa cả ngày.\n\n🔍 Phân tích các lựa chọn:\n- [1] かようび (Thứ Ba): SAI, trời nắng.\n- [2] すいようび (Thứ Tư): SAI, sáng nắng, chiều mây, đêm mới mưa.\n- [3] もくようび (Thứ Năm): ĐÚNG, mưa cả ngày (一日ずっと雨).\n- [4] きんようび (Thứ Sáu): SAI, trời nắng thời tiết đẹp.\n\n📄 Trích đề thi gốc (聴解原文):\n「木曜日は一日ずっと雨になるでしょう。」→ 正解: [3]"
    },
    82: {
        "globalIndex": 82,
        "localPdfNumber": 5,
        "mondai": 2,
        "snippet": "Mondai 2 - Câu 5: Số lượng sách người đàn ông đọc dạo gần đây (最近、どのぐらい本を読んでいますか)",
        "options": ["ぜんぜん 読まない (Hoàn toàn không đọc)", "月に 1さつ 読む (Đọc 1 quyển/tháng)", "月に 3さつ 読む (Đọc 3 quyển/tháng)", "月に 10さついじょう 読む (Đọc trên 10 quyển/tháng)"],
        "correctOption": 1,
        "audioScriptJa": "女：山田さんは、よく本を読みますか。\n男：ううん、子供のときは月に10冊以上読んでいましたが、最近は全然読んでいませんね。\n女：そうですか。\n男：ええ、仕事が忙しいんです。田中さんはどうですか。\n女：最近は、専門の本を月に3冊ぐらい読んでいます。\n男：そうですか。わたしも月に1冊ぐらいは読みたいんですが。\n質問：男の人は、最近、どのぐらい本を読んでいますか。",
        "audioScriptVi": "Nữ: Anh Yamada có hay đọc sách không?\nNam: Hồi nhỏ thì mỗi tháng tôi đọc hơn 10 cuốn sách đấy, nhưng dạo gần đây thì hoàn toàn không đọc cuốn nào cả.\nNữ: Vậy à.\nNam: Vâng, công việc bận rộn quá. Còn cô Tanaka thì sao?\nNữ: Dạo gần đây mỗi tháng tôi đọc khoảng 3 cuốn sách chuyên ngành.\nNam: Thế à. Tôi cũng muốn đọc tầm 1 cuốn một tháng nhưng mà...\nCâu hỏi: Dạo gần đây, người đàn ông đọc khoảng bao nhiêu sách? (Lưu ý: người đàn ông)",
        "explanation": "🎯 Đáp án đúng: [1] ぜんぜん 読まない (Hoàn toàn không đọc sách)\n\n💬 Dịch đoạn hội thoại:\n• Nữ: \"Anh Yamada có hay đọc sách không?\"\n• Nam: \"Hồi nhỏ mỗi tháng tôi đọc trên 10 cuốn, nhưng dạo này thì hoàn toàn không đọc cuốn nào (最近は全然読んでいませんね).\"\n• Nữ: \"Vậy à.\"\n• Nam: \"Vâng, vì công việc bận quá. Còn cô Tanaka thì sao?\"\n• Nữ: \"Dạo này mỗi tháng tôi đọc khoảng 3 cuốn chuyên ngành.\"\n• Nam: \"Thế à, tôi cũng muốn đọc khoảng 1 cuốn mỗi tháng...\"\n• Câu hỏi: Gần đây, người đàn ông đọc bao nhiêu sách?\n\n💡 Phân tích & Giải thích:\n• Người đàn ông nói rõ thực trạng gần đây của mình: \"最近は全然読んでいませんね\" (Dạo này hoàn toàn không đọc).\n• \"10 quyển/tháng\": Là thời còn nhỏ (子供のとき).\n• \"3 quyển/tháng\": Là người phụ nữ đọc (Tanaka).\n• \"1 quyển/tháng\": Là mong muốn của người đàn ông (\"読みたいんですが\") chứ chưa thực hiện được.\n• Do đó người đàn ông hoàn toàn không đọc sách dạo gần đây.\n\n🔍 Phân tích các lựa chọn:\n- [1] ぜんぜん 読まない: ĐÚNG, hoàn toàn không đọc sách do bận rộn.\n- [2] 月に 1さつ 読む: SAI, chỉ là nguyện vọng muốn đọc.\n- [3] 月に 3さつ 読む: SAI, đây là số lượng người phụ nữ đọc.\n- [4] 月に 10さついじょう 読む: SAI, đây là thói quen hồi còn nhỏ.\n\n📄 Trích đề thi gốc (聴解原文):\n「最近は全然読んでいませんね。」→ 正解: [1]"
    },
    83: {
        "globalIndex": 83,
        "localPdfNumber": 6,
        "mondai": 2,
        "snippet": "Mondai 2 - Câu 6: Nghề nghiệp bạn nữ từng muốn làm khi còn nhỏ (子供のとき何になりたかったですか)",
        "options": ["小学校の 先生 (Giáo viên tiểu học)", "ピアニスト (Nghệ sĩ dương cầm)", "けいさつかん (Cảnh sát)", "かんごし (Y tá / điều dưỡng)"],
        "correctOption": 2,
        "audioScriptJa": "男：田中さんは、将来、どんな仕事がしたいですか。\n女：将来は、小学校の先生になりたいです。\n男：先生ですか。子供のときからですか。\n女：子供のときは、ピアニストになりたかったんです。\n男：音楽が好きだったんですね。わたしは子供のとき、警察官になるのが夢でした。\n女：警察官ですか。\n男：でも、最近は、看護師になりたいんです。\n女：へえ、そうなんですか。\n質問：女の学生は、子供のとき、何になりたかったですか。",
        "audioScriptVi": "Nam: Tanaka này, trong tương lai bạn muốn làm công việc gì?\nNữ: Trong tương lai mình muốn trở thành giáo viên tiểu học.\nNam: Giáo viên à? Bạn thích làm giáo viên từ hồi bé à?\nNữ: Hồi bé thì mình từng muốn trở thành nghệ sĩ dương cầm.\nNam: Hóa ra bạn thích âm nhạc nhỉ. Còn mình hồi bé ước mơ là trở thành cảnh sát.\nNữ: Cảnh sát á?\nNam: Nhưng dạo gần đây mình lại muốn trở thành điều dưỡng viên/y tá.\nNữ: Ồ, vậy sao.\nCâu hỏi: Nữ sinh hồi còn nhỏ từng muốn làm nghề gì?",
        "explanation": "🎯 Đáp án đúng: [2] ピアニスト (Nghệ sĩ dương cầm)\n\n💬 Dịch đoạn hội thoại:\n• Nam: \"Tanaka ơi, tương lai bạn muốn làm nghề gì?\"\n• Nữ: \"Tương lai mình muốn làm giáo viên tiểu học.\"\n• Nam: \"Giáo viên à? Từ hồi nhỏ bạn đã muốn thế à?\"\n• Nữ: \"Hồi nhỏ thì mình từng muốn làm nghệ sĩ dương cầm (子供のときは、ピアニストになりたかったんです).\"\n• Nam: \"Hóa ra bạn thích âm nhạc. Mình hồi nhỏ ước làm cảnh sát, nhưng gần đây lại muốn làm y tá.\"\n• Câu hỏi: Bạn nữ hồi còn nhỏ muốn làm nghề gì?\n\n💡 Phân tích & Giải thích:\n• Câu hỏi tập trung vào bạn nữ (女の学生) vào thời điểm hồi nhỏ (子供のとき).\n• Bạn nữ nói rõ: \"子供のときは、ピアニストになりたかったんです\" (Hồi nhỏ mình từng muốn làm nghệ sĩ dương cầm).\n• \"Giáo viên tiểu học\": Là ước mơ tương lai hiện tại của bạn nữ.\n• \"Cảnh sát\", \"Y tá\": Là các ước mơ của bạn nam.\n• Do đó đáp án là nghệ sĩ dương cầm (ピアニスト).\n\n🔍 Phân tích các lựa chọn:\n- [1] 小学校の 先生: SAI, đây là nghề nghiệp mong muốn trong tương lai hiện tại của bạn nữ.\n- [2] ピアニスト: ĐÚNG, nghề bạn nữ từng muốn làm khi còn nhỏ.\n- [3] けいさつかん: SAI, ước mơ hồi nhỏ của bạn nam.\n- [4] かんごし: SAI, ước mơ hiện tại của bạn nam.\n\n📄 Trích đề thi gốc (聴解原文):\n「子供のときは、ピアニストになりたかったんです。」→ 正解: [2]"
    },
    84: {
        "globalIndex": 84,
        "localPdfNumber": 7,
        "mondai": 2,
        "snippet": "Mondai 2 - Câu 7: Giờ khởi hành của chuyến tàu tiếp theo (次の船は何時に出発しますか)",
        "options": ["10時 (10 giờ 00)", "10時10分 (10 giờ 10 phút)", "10時20分 (10 giờ 20 phút)", "10時30分 (10 giờ 30 phút)"],
        "correctOption": 3,
        "audioScriptJa": "女：みなさま、もうすぐ、次の船が出発します。船は、近くの島を30分で回ります。海からの美しい景色を楽しむことができます。出発は10時20分の予定です。出発まで10分です。チケットは船の中で買うことができます。みなさま、乗ってみませんか。\n質問：次の船は、何時に出発しますか。",
        "audioScriptVi": "Nữ: Kính thưa quý khách, chuyến tàu tiếp theo sắp khởi hành. Tàu sẽ chạy quanh hòn đảo gần đây trong 30 phút. Quý khách có thể thưởng thức cảnh đẹp từ biển. Giờ khởi hành dự kiến là 10 giờ 20 phút. Còn 10 phút nữa là đến giờ khởi hành. Vé có thể mua ngay trên tàu. Kính mời quý khách lên tàu trải nghiệm.\nCâu hỏi: Chuyến tàu tiếp theo sẽ khởi hành lúc mấy giờ?",
        "explanation": "🎯 Đáp án đúng: [3] 10時20分 (10 giờ 20 phút)\n\n💬 Dịch bản thông báo tại bến cảng:\n• \"Kính thưa quý khách, chuyến tàu tiếp theo sắp sửa khởi hành.\n• Tàu sẽ chạy một vòng quanh hòn đảo gần đây trong 30 phút. Quý khách có thể ngắm cảnh biển tuyệt đẹp.\n• Tàu dự kiến khởi hành lúc 10 giờ 20 phút (出発は10時20分の予定です).\n• Còn 10 phút nữa là tàu chạy (出発まで10分です). Vé có thể mua ngay trên tàu. Mời quý khách cùng lên tàu.\"\n• Câu hỏi: Chuyến tàu tiếp theo sẽ khởi hành lúc mấy giờ?\n\n💡 Phân tích & Giải thích:\n• Thông báo nêu rõ ràng giờ khởi hành của tàu: \"出発は10時20分の予定です\" (Dự kiến khởi hành lúc 10 giờ 20 phút).\n• Chi tiết \"còn 10 phút nữa tàu chạy\" cho biết thời điểm hiện tại lúc thông báo là 10h10, chứ không phải giờ tàu chạy.\n• Chi tiết \"30 phút\" là thời gian tàu chạy 1 vòng quanh đảo.\n• Do đó giờ khởi hành là 10h20.\n\n🔍 Phân tích các lựa chọn:\n- [1] 10時: SAI.\n- [2] 10時10分: SAI, đây là thời điểm đang phát thông báo (còn 10 phút nữa đến 10h20).\n- [3] 10時20分: ĐÚNG, giờ tàu khởi hành theo thông báo.\n- [4] 10時30分: SAI, số 30 là thời gian hành trình 30 phút đi quanh đảo.\n\n📄 Trích đề thi gốc (聴解原文):\n「出発は10時20分の予定です。」→ 正解: [3]"
    },
    85: {
        "globalIndex": 85,
        "localPdfNumber": 1,
        "mondai": 3,
        "snippet": "Mondai 3 - Câu 1: Mua quà lưu niệm tặng tiền bối thì nói câu gì (先輩にあげます)",
        "options": ["これ、お土産です。どうぞ。 (Quà lưu niệm, xin mời nhận.)", "お土産、頂きます。 (Tôi xin nhận quà lưu niệm.)", "お土産を買っておきます。 (Tôi sẽ mua sẵn quà lưu niệm.)"],
        "correctOption": 1,
        "audioScriptJa": "状況：お土産を買いました。先輩にあげます。何と言いますか。\n1. これ、お土産です。どうぞ。\n2. お土産、頂きます。\n3. お土産を買っておきます。",
        "audioScriptVi": "Tình huống: Bạn mua quà lưu niệm. Bạn tặng cho tiền bối. Bạn sẽ nói gì?\n1. Đây là quà lưu niệm ạ. Xin mời anh/chị nhận ạ.\n2. Em xin nhận quà lưu niệm ạ.\n3. Em sẽ mua sẵn quà lưu niệm.",
        "explanation": "🎯 Đáp án đúng: [1] これ、お土産です。どうぞ。\n\n💬 Dịch tình huống và các lựa chọn:\n• Tình huống: Bạn đã mua quà lưu niệm và muốn tặng cho tiền bối (先輩にあげます). Bạn sẽ nói gì?\n• 1. これ、お土産です。どうぞ。 (Dạ đây là chút quà lưu niệm ạ. Em mời anh/chị nhận ạ.)\n• 2. お土産、頂きます。 (Dạ em xin nhận quà lưu niệm ạ.)\n• 3. お土産を買っておきます。 (Em sẽ mua sẵn quà lưu niệm.)\n\n💡 Phân tích & Giải thích:\n• Tình huống tặng quà cho người khác: Người tặng đưa quà và nói lịch sự: \"これ、お土産です。どうぞ。\" (hoặc つまらないものですが、どうぞ).\n• Lựa chọn 2 \"お土産、頂きます\" là câu dùng khi mình là người NHẬN quà từ người khác.\n• Lựa chọn 3 \"お土産を買っておきます\" (V-ておく) diễn tả chuẩn bị sẵn việc gì đó, không phù hợp khi đang trao quà.\n• Do đó đáp án chính xác là [1].\n\n🔍 Phân tích các lựa chọn:\n- [1] これ、お土産です。どうぞ。: ĐÚNG, mẫu câu chuẩn mực khi trao quà cho người khác.\n- [2] お土産、頂きます。: SAI, dùng khi nhận quà từ người khác.\n- [3] お土産を買っておきます。: SAI, dùng khi chuẩn bị sẵn quà trước.\n\n📄 Trích đề thi gốc (聴解原文):\n「お土産を買いました。先輩にあげます。何と言いますか。」→ 正解: [1]"
    },
    86: {
        "globalIndex": 86,
        "localPdfNumber": 2,
        "mondai": 3,
        "snippet": "Mondai 3 - Câu 2: Rủ bạn cùng đi xem phim vào ngày mai (明日、二人で映画に行きたいです)",
        "options": ["明日、映画に誘いましょう。 (Ngày mai cùng rủ đi xem phim nhé.)", "明日、映画を見に行きませんか。 (Ngày mai bạn có đi xem phim cùng mình không?)", "明日、映画に行きたいそうですよ。 (Nghe nói ngày mai muốn đi xem phim đấy.)"],
        "correctOption": 2,
        "audioScriptJa": "状況：明日、二人で映画に行きたいです。何と言いますか。\n1. 明日、映画に誘いましょう。\n2. 明日、映画を見に行きませんか。\n3. 明日、映画に行きたいそうですよ。",
        "audioScriptVi": "Tình huống: Ngày mai bạn muốn đi xem phim cùng với người kia. Bạn sẽ nói gì?\n1. Ngày mai rủ đi xem phim thôi nào.\n2. Ngày mai bạn có đi xem phim cùng với mình không?\n3. Nghe nói ngày mai muốn đi xem phim đấy.",
        "explanation": "🎯 Đáp án đúng: [2] 明日、映画を見に行きませんか。\n\n💬 Dịch tình huống và các lựa chọn:\n• Tình huống: Ngày mai bạn muốn hai người cùng đi xem phim (明日、二人で映画に行きたいです). Bạn sẽ nói gì để rủ người đó?\n• 1. 明日、映画に誘いましょう。 (Ngày mai hãy rủ đi xem phim nào.)\n• 2. 明日、映画を見に行きませんか。 (Ngày mai bạn đi xem phim với mình không?)\n• 3. 明日、映画に行きたいそうですよ。 (Nghe nói ngày mai muốn đi xem phim đấy.)\n\n💡 Phân tích & Giải thích:\n• Mẫu câu rủ rê, mời mọc đối phương lịch sự trong tiếng Nhật là: ~ませんか (Bạn cùng làm... với mình nhé?).\n• Cụ thể: \"明日、映画を見に行きませんか。\" là câu mời tự nhiên và chuẩn xác nhất.\n• Lựa chọn 1 dùng động từ 誘う (rủ rê) để nói với chính người mình định rủ là sai đối tượng.\n• Lựa chọn 3 dùng ~そうですよ để thuật lại lời người khác.\n• Do đó đáp án đúng là [2].\n\n🔍 Phân tích các lựa chọn:\n- [1] 明日、映画に誘いましょう。: SAI ngữ cảnh, không dùng động từ 誘う để mời trực tiếp.\n- [2] 明日、映画を見に行きませんか。: ĐÚNG, mẫu câu rủ rê mời mọc chuẩn mực (~ませんか).\n- [3] 明日、映画に行きたいそうですよ。: SAI, truyền đạt thông tin nghe từ người thứ ba.\n\n📄 Trích đề thi gốc (聴解原文):\n「明日、二人で映画に行きたいです。何と言いますか。」→ 正解: [2]"
    },
    87: {
        "globalIndex": 87,
        "localPdfNumber": 3,
        "mondai": 3,
        "snippet": "Mondai 3 - Câu 3: Chữ trên bảng nhỏ quá không đọc được thì nói gì với thầy (黒板の字が小さくて読めません)",
        "options": ["すいません、よく見えません。 (Xin lỗi thầy, em không nhìn rõ ạ.)", "すいません、読んでもいいですか。 (Xin lỗi thầy, em đọc có được không ạ?)", "すいません、書きましょうか。 (Xin lỗi thầy, để em viết hộ nhé?)"],
        "correctOption": 1,
        "audioScriptJa": "状況：黒板の字が小さくて、読めません。先生に何と言いますか。\n1. すいません、よく見えません。\n2. すいません、読んでもいいですか。\n3. すいません、書きましょうか。",
        "audioScriptVi": "Tình huống: Chữ trên bảng nhỏ quá không đọc được. Bạn sẽ nói gì với thầy giáo?\n1. Xin lỗi thầy, em không nhìn rõ ạ.\n2. Xin lỗi thầy, em đọc có được không ạ?\n3. Xin lỗi thầy, để em viết giúp thầy nhé?",
        "explanation": "🎯 Đáp án đúng: [1] すいません、よく見えません。\n\n💬 Dịch tình huống và các lựa chọn:\n• Tình huống: Chữ trên bảng nhỏ quá không đọc được (黒板の字が小さくて、読めません). Bạn sẽ nói gì với giáo viên?\n• 1. すいません、よく見えません。 (Thưa thầy xin lỗi, em nhìn không rõ ạ.)\n• 2. すいません、読んでもいいですか。 (Thưa thầy, em đọc có được không ạ?)\n• 3. すいません、書きましょうか。 (Thưa thầy, để em viết giúp nhé?)\n\n💡 Phân tích & Giải thích:\n• Tình huống học sinh ngồi xa/chữ nhỏ không thấy đường đọc: cần báo cho thầy giáo biết tình trạng tầm nhìn của mình bằng câu: \"すいません、よく見えません。\" (Em nhìn không rõ ạ) để thầy viết chữ to hơn.\n• Lựa chọn 2 xin phép được đọc (không giải quyết việc chữ nhỏ không thấy).\n• Lựa chọn 3 đề nghị viết hộ lên bảng (sai vai vế học sinh với giáo viên).\n• Do đó đáp án chính xác là [1].\n\n🔍 Phân tích các lựa chọn:\n- [1] すいません、よく見えません。: ĐÚNG, phản ánh chính xác tình trạng không nhìn rõ chữ.\n- [2] すいません、読んでもいいですか。: SAI, xin phép đọc bài.\n- [3] すいません、書きましょうか。: SAI, đề nghị viết giúp thầy.\n\n📄 Trích đề thi gốc (聴解原文):\n「黒板の字が小さくて、読めません。先生に何と言いますか。」→ 正解: [1]"
    },
    88: {
        "globalIndex": 88,
        "localPdfNumber": 4,
        "mondai": 3,
        "snippet": "Mondai 3 - Câu 4: Muốn xin ý kiến thầy giáo ngay bây giờ thì nói gì (先生に今、相談したいです)",
        "options": ["あのう、いつでしょうか。 (À, khi nào vậy ạ?)", "ちょっとよろしいでしょうか。 (Thầy có tiện chút thời gian không ạ?)", "相談してくださいませんか。 (Thầy hãy trao đổi/hỏi ý kiến em nhé?)"],
        "correctOption": 2,
        "audioScriptJa": "状況：先生に今、相談したいです。何と言いますか。\n1. あのう、いつでしょうか。\n2. ちょっとよろしいでしょうか。\n3. 相談してくださいませんか。",
        "audioScriptVi": "Tình huống: Bạn muốn trao đổi/xin ý kiến thầy giáo ngay bây giờ. Bạn sẽ nói gì?\n1. À, khi nào thế ạ?\n2. Thầy có tiện cho em xin ít phút được không ạ?\n3. Thầy hãy trao đổi/hỏi ý kiến em có được không ạ?",
        "explanation": "🎯 Đáp án đúng: [2] ちょっとよろしいでしょうか。\n\n💬 Dịch tình huống và các lựa chọn:\n• Tình huống: Bạn muốn xin ý kiến, trao đổi với thầy giáo ngay lúc này (先生に今、相談したいです). Bạn sẽ mở lời thế nào?\n• 1. あのう、いつでしょうか。 (À, là khi nào vậy ạ?)\n• 2. ちょっとよろしいでしょうか。 (Dạ thưa thầy, thầy có tiện ít phút không ạ?)\n• 3. 相談してくださいませんか。 (Thầy có thể trao đổi/xin ý kiến em không ạ?)\n\n💡 Phân tích & Giải thích:\n• Khi muốn mở lời để hỏi ý kiến cấp trên/thầy cô giáo ngay bây giờ, người Nhật luôn mở đầu bằng câu kính ngữ lịch sự hỏi xem đối phương có đang rảnh/tiện nói chuyện không: \"ちょっとよろしいでしょうか。\" (Thầy có tiện chút thời gian không ạ?).\n• Lựa chọn 1 hỏi về thời gian \"khi nào\" trong khi tình huống muốn hỏi ngay lúc này.\n• Lựa chọn 3 dùng 相談してくださいませんか là nhờ đối phương hỏi ý kiến mình (sai vai vế).\n• Do đó đáp án chính xác là [2].\n\n🔍 Phân tích các lựa chọn:\n- [1] あのう、いつでしょうか。: SAI, không đúng ngữ cảnh mở đầu cuộc nói chuyện ngay bây giờ.\n- [2] ちょっとよろしいでしょうか。: ĐÚNG, câu mở lời kính ngữ chuẩn mực để xin vài phút nói chuyện với giáo viên.\n- [3] 相談してくださいませんか。: SAI, dùng sai vai vế (nghĩa là yêu cầu thầy hỏi ý kiến em).\n\n📄 Trích đề thi gốc (聴解原文):\n「先生に今、相談したいです。何と言いますか。」→ 正解: [2]"
    },
    89: {
        "globalIndex": 89,
        "localPdfNumber": 5,
        "mondai": 3,
        "snippet": "Mondai 3 - Câu 5: Muốn mượn bút của bạn bè thì nói thế nào (友達のペンを借りたいです)",
        "options": ["ペン、貸してもらえる？ (Cậu cho tớ mượn bút được không?)", "ペン、取ってあげる。 (Để tớ lấy bút cho cậu nhé.)", "ペン、使ってくれる？ (Cậu dùng bút giúp tớ nhé?)"],
        "correctOption": 1,
        "audioScriptJa": "状況：友達のペンを借りたいです。何と言いますか。\n1. ペン、貸してもらえる？\n2. ペン、取ってあげる。\n3. ペン、使ってくれる？",
        "audioScriptVi": "Tình huống: Bạn muốn mượn bút của bạn bè. Bạn sẽ nói gì?\n1. Cậu cho tớ mượn cây bút được không?\n2. Để tớ lấy bút cho cậu nhé.\n3. Cậu dùng bút giúp tớ nhé?",
        "explanation": "🎯 Đáp án đúng: [1] ペン、貸してもらえる？\n\n💬 Dịch tình huống và các lựa chọn:\n• Tình huống: Bạn muốn mượn bút của bạn bè (友達のペンを借りたいです). Bạn sẽ nói gì?\n• 1. ペン、貸してもらえる？ (Cậu cho tớ mượn cây bút được không?)\n• 2. ペン、取ってあげる。 (Để tớ lấy bút cho cậu nhé.)\n• 3. ペン、使ってくれる？ (Cậu dùng bút giúp tớ nhé?)\n\n💡 Phân tích & Giải thích:\n• Mẫu câu nhờ vả thân mật với bạn bè là V-てもらえる？ (Cậu làm... cho tớ được không?).\n• Ở đây mình muốn mượn bút, tức là nhờ bạn cho mình mượn (貸す -> 貸してもらえる？).\n• Lựa chọn 2 dùng ~てあげる nghĩa là mình làm ơn/giúp bạn (\"tớ lấy cho cậu\").\n• Lựa chọn 3 dùng 使ってくれる？ nghĩa là nhờ bạn dùng bút của mình.\n• Do đó đáp án đúng là [1].\n\n🔍 Phân tích các lựa chọn:\n- [1] ペン、貸してもらえる？: ĐÚNG, cấu trúc mượn đồ thân mật chuẩn ngữ pháp.\n- [2] ペン、取ってあげる。: SAI hướng hành động (~てあげる là làm giúp cho đối phương).\n- [3] ペン、使ってくれる？: SAI, mang nghĩa nhờ bạn dùng bút.\n\n📄 Trích đề thi gốc (聴解原文):\n「友達のペンを借りたいです。何と言いますか。」→ 正解: [1]"
    },
    90: {
        "globalIndex": 90,
        "localPdfNumber": 1,
        "mondai": 4,
        "snippet": "Mondai 4 - Câu 1: Phản xạ khi được hỏi 'Cậu đang đi đâu thế?' (どこに行くんですか)",
        "options": ["いってらっしゃい。 (Anh đi nhé / Chúc đi bình an.)", "ちょっと食事に行ってきます。 (Tôi đi ăn cơm một chút rồi về.)", "気をつけてください。 (Bạn đi cẩn thận nhé.)"],
        "correctOption": 2,
        "audioScriptJa": "質問：どこに行くんですか。\n1. いってらっしゃい。\n2. ちょっと食事に行ってきます。\n3. 気をつけてください。",
        "audioScriptVi": "Câu hỏi: Bạn đang đi đâu thế?\n1. Anh đi nhé / Chúc đi bình an.\n2. Tôi đi ăn cơm một lát rồi về.\n3. Bạn đi cẩn thận nhé.",
        "explanation": "🎯 Đáp án đúng: [2] ちょっと食事に行ってきます。\n\n💬 Dịch câu hỏi và các phản hồi:\n• Câu hỏi: \"どこに行くんですか。\" (Cậu đang đi đâu đấy?)\n• 1. いってらっしゃい。 (Anh đi nhé / Chúc đi may mắn.)\n• 2. ちょっと食事に行ってきます。 (Tôi đi ăn một chút rồi về đây.)\n• 3. 気をつけてください。 (Anh đi cẩn thận nhé.)\n\n💡 Phân tích & Giải thích:\n• Câu hỏi hỏi về địa điểm/mục đích đi đâu (どこに行くんですか).\n• Phản hồi [2] \"ちょっと食事に行ってきます\" (Tôi đi ra ngoài ăn một chút rồi về) trả lời trực tiếp và hoàn hảo cho câu hỏi đi đâu.\n• Các lựa chọn 1 và 3 là câu người ở lại nói để tiễn người ra ngoài, không phải câu trả lời của người đang đi.\n• Do đó đáp án đúng là [2].\n\n🔍 Phân tích các lựa chọn:\n- [1] いってらっしゃい。: SAI, câu chúc người khác ra ngoài an toàn.\n- [2] ちょっと食事に行ってきます。: ĐÚNG, câu trả lời nêu rõ mục đích đi ăn.\n- [3] 気をつけてください。: SAI, lời nhắc nhở người khác đi cẩn thận.\n\n📄 Trích đề thi gốc (聴解原文):\n「どこに行くんですか。」→ 正解: [2]"
    },
    91: {
        "globalIndex": 91,
        "localPdfNumber": 2,
        "mondai": 4,
        "snippet": "Mondai 4 - Câu 2: Phản xạ khi được hỏi 'Cậu đã từng đi Kyoto chưa?' (京都、行ったことある？)",
        "options": ["行かなかったよ。 (Tớ đã không đi đâu.)", "そう、行ったんだ。 (Thế à, đã đi rồi đấy à.)", "うん、1回あるよ。 (Ừ, tớ từng đi 1 lần rồi.)"],
        "correctOption": 3,
        "audioScriptJa": "質問：ねえ、京都、行ったことある？\n1. 行かなかったよ。\n2. そう、行ったんだ。\n3. うん、1回あるよ。",
        "audioScriptVi": "Câu hỏi: Này, cậu đã từng đi Kyoto bao giờ chưa?\n1. Tớ đã không đi đâu.\n2. Thế à, đã đi rồi đấy à.\n3. Ừ, tớ từng đi một lần rồi.",
        "explanation": "🎯 Đáp án đúng: [3] うん、1回あるよ。\n\n💬 Dịch câu hỏi và các phản hồi:\n• Câu hỏi: \"ねえ、京都、行ったことある？\" (Này, cậu đã từng đến Kyoto bao giờ chưa?)\n• 1. 行かなかったよ。 (Tớ đã không đi.)\n• 2. そう、行ったんだ。 (Thế à, cậu đã đi rồi à.)\n• 3. うん、1回あるよ。 (Ừ, tớ từng đi một lần rồi.)\n\n💡 Phân tích & Giải thích:\n• Câu hỏi dùng cấu trúc hỏi kinh nghiệm V-たことがある (đã từng làm gì chưa?).\n• Trả lời: Nếu có kinh nghiệm thì trả lời bằng số lần kèm ある: \"うん、1回あるよ。\" (Ừ, tớ từng đi 1 lần rồi).\n• Lựa chọn 1 dùng thì quá khứ đơn giản (sai ngữ pháp hỏi kinh nghiệm).\n• Lựa chọn 2 là câu cảm thán tiếp lời người khác.\n• Do đó đáp án chính xác là [3].\n\n🔍 Phân tích các lựa chọn:\n- [1] 行かなかったよ。: SAI về ngữ nghĩa và cấu trúc hỏi kinh nghiệm.\n- [2] そう、行ったんだ。: SAI, phản hồi tiếp lời người kể chuyện.\n- [3] うん、1回あるよ。: ĐÚNG, trả lời đúng cấu trúc hỏi kinh nghiệm (đã từng đi 1 lần).\n\n📄 Trích đề thi gốc (聴解原文):\n「ねえ、京都、行ったことある？」「うん、1回あるよ。」→ 正解: [3]"
    },
    92: {
        "globalIndex": 92,
        "localPdfNumber": 3,
        "mondai": 4,
        "snippet": "Mondai 4 - Câu 3: Phản xạ khi được hỏi 'Tại sao hôm qua cậu nghỉ học thế?' (どうして昨日、授業を休んだんですか)",
        "options": ["休むかもしれません。 (Có lẽ tôi sẽ nghỉ.)", "風邪をひいてしまいました。 (Tại tôi bị cảm lạnh mất rồi.)", "ゆっくり休んでください。 (Bạn hãy nghỉ ngơi thong thả nhé.)"],
        "correctOption": 2,
        "audioScriptJa": "質問：どうして昨日、授業を休んだんですか。\n1. 休むかもしれません。\n2. 風邪をひいてしまいました。\n3. ゆっくり休んでください。",
        "audioScriptVi": "Câu hỏi: Tại sao hôm qua bạn lại nghỉ học vậy?\n1. Có lẽ tôi sẽ nghỉ.\n2. Tại tôi bị cảm lạnh mất rồi.\n3. Bạn hãy nghỉ ngơi thong thả nhé.",
        "explanation": "🎯 Đáp án đúng: [2] 風邪をひいてしまいました。\n\n💬 Dịch câu hỏi và các phản hồi:\n• Câu hỏi: \"どうして昨日、授業を休んだんですか。\" (Tại sao hôm qua bạn lại nghỉ học thế?)\n• 1. 休むかもしれません。 (Có lẽ tôi sẽ nghỉ.)\n• 2. 風邪をひいてしまいました。 (Tôi bị cảm lạnh mất rồi.)\n• 3. ゆっくり休んでください。 (Bạn hãy nghỉ ngơi thong thả nhé.)\n\n💡 Phân tích & Giải thích:\n• Câu hỏi hỏi lý do trong quá khứ (どうして昨日...休んだんですか).\n• Phản hồi [2] \"風邪をひいてしまいました\" (Tôi bị cảm mất rồi) giải thích trực tiếp nguyên nhân nghỉ ốm hôm qua.\n• Lựa chọn 1 diễn tả phỏng đoán tương lai (~かもしれません).\n• Lựa chọn 3 là lời khuyên người khác hãy nghỉ ngơi.\n• Do đó đáp án chính xác là [2].\n\n🔍 Phân tích các lựa chọn:\n- [1] 休むかもしれません。: SAI thì (phỏng đoán tương lai, không giải thích việc hôm qua).\n- [2] 風邪をひいてしまいました。: ĐÚNG, nêu nguyên nhân bị ốm nghỉ học hôm qua.\n- [3] ゆっくり休んでください。: SAI, lời chúc người khác nghỉ ngơi.\n\n📄 Trích đề thi gốc (聴解原文):\n「どうして昨日、授業を休んだんですか。」→ 正解: [2]"
    },
    93: {
        "globalIndex": 93,
        "localPdfNumber": 4,
        "mondai": 4,
        "snippet": "Mondai 4 - Câu 4: Phản xạ khi được hỏi 'Nghỉ hè về nước xong bạn sẽ làm gì?' (国へ帰ったら、何をしますか)",
        "options": ["友達に会うつもりです。 (Tôi dự định sẽ đi gặp bạn bè.)", "母に会いました。 (Tôi đã gặp mẹ rồi.)", "来月にします。 (Tôi để sang tháng sau.)"],
        "correctOption": 1,
        "audioScriptJa": "質問：夏休みに国へ帰ったら、何をしますか。\n1. 友達に会うつもりです。\n2. 母に会いました。\n3. 来月にします。",
        "audioScriptVi": "Câu hỏi: Nghỉ hè về nước xong bạn sẽ làm gì?\n1. Tôi dự định sẽ gặp bạn bè.\n2. Tôi đã gặp mẹ rồi.\n3. Tôi để sang tháng sau.",
        "explanation": "🎯 Đáp án đúng: [1] 友達に会うつもりです。\n\n💬 Dịch câu hỏi và các phản hồi:\n• Câu hỏi: \"夏休みに国へ帰ったら、何をしますか。\" (Nghỉ hè về nước xong bạn sẽ làm gì?)\n• 1. 友達に会うつもりです。 (Tôi dự định đi gặp bạn bè.)\n• 2. 母に会いました。 (Tôi đã gặp mẹ rồi.)\n• 3. 来月にします。 (Để sang tháng sau.)\n\n💡 Phân tích & Giải thích:\n• Câu hỏi hỏi về dự định trong tương lai sau khi về nước (何をしますか).\n• Cấu trúc trả lời dự định tương lai: V-る + つもりです (dự định làm gì).\n• Phản hồi [1] \"友達に会うつもりです\" (Tôi dự định sẽ gặp bạn bè) trả lời hoàn hảo cho câu hỏi.\n• Lựa chọn 2 dùng thì quá khứ \"đã gặp\" trong khi chuyến về nước nghỉ hè chưa diễn ra.\n• Lựa chọn 3 không trả lời cho câu hỏi \"làm gì\".\n• Do đó đáp án chính xác là [1].\n\n🔍 Phân tích các lựa chọn:\n- [1] 友達に会うつもりです。: ĐÚNG, nêu dự định tương lai khi về nước (~つもり).\n- [2] 母に会いました。: SAI thì (dùng quá khứ cho sự việc chưa xảy ra).\n- [3] 来月にします。: SAI nội dung, không trả lời cho câu hỏi làm gì.\n\n📄 Trích đề thi gốc (聴解原文):\n「夏休みに国へ帰ったら、何をしますか。」→ 正解: [1]"
    },
    94: {
        "globalIndex": 94,
        "localPdfNumber": 5,
        "mondai": 4,
        "snippet": "Mondai 4 - Câu 5: Phản xạ khi được dặn 'Khi nghỉ học nhớ gọi điện nhé' (学校を休むときは電話してください)",
        "options": ["いつ休むんですか。 (Khi nào bạn nghỉ thế?)", "はい、連絡します。 (Vâng, em sẽ liên lạc ạ.)", "電話を待っています。 (Tôi đang chờ điện thoại.)"],
        "correctOption": 2,
        "audioScriptJa": "質問：学校を休むときは電話してください。\n1. いつ休むんですか。\n2. はい、連絡します。\n3. 電話を待っています。",
        "audioScriptVi": "Câu hỏi: Khi nghỉ học thì bạn hãy gọi điện thoại nhé.\n1. Khi nào bạn nghỉ thế?\n2. Vâng, em sẽ liên lạc ạ.\n3. Tôi đang chờ điện thoại đây.",
        "explanation": "🎯 Đáp án đúng: [2] はい、連絡します。\n\n💬 Dịch câu nhắc nhở và các phản hồi:\n• Lời dặn: \"学校を休むときは電話してください。\" (Khi nghỉ học thì em hãy gọi điện báo nhé.)\n• 1. いつ休むんですか。 (Bao giờ em nghỉ thế ạ?)\n• 2. はい、連絡します。 (Vâng, em sẽ liên lạc ạ.)\n• 3. 電話を待っています。 (Em đang đợi điện thoại.)\n\n💡 Phân tích & Giải thích:\n• Đối phương đưa ra lời dặn dò, hướng dẫn quy định (~てください).\n• Người nghe cần tiếp nhận và cam kết tuân thủ: \"はい、連絡します。\" (Vâng, em sẽ liên lạc/báo tin ạ).\n• Lựa chọn 1 hỏi ngược lại người dặn là vô lý.\n• Lựa chọn 3 nói mình đang đợi điện thoại là sai ngữ cảnh.\n• Do đó đáp án chính xác là [2].\n\n🔍 Phân tích các lựa chọn:\n- [1] いつ休むんですか。: SAI, hỏi ngược lại người vừa dặn dò mình.\n- [2] はい、連絡します。: ĐÚNG, tiếp thu lời dặn và xác nhận sẽ liên lạc khi có việc nghỉ.\n- [3] 電話を待っています。: SAI, không ăn nhập với lời dặn.\n\n📄 Trích đề thi gốc (聴解原文):\n「学校を休むときは電話してください。」→ 正解: [2]"
    },
    95: {
        "globalIndex": 95,
        "localPdfNumber": 6,
        "mondai": 4,
        "snippet": "Mondai 4 - Câu 6: Phản xạ khi được nhờ 'Lấy giúp tôi cuốn sách kia được không?' (その本を取ってくれませんか)",
        "options": ["ありがとう。 (Cảm ơn bạn nhé.)", "もらいましたよ。 (Tôi đã nhận được rồi đấy.)", "え、どれですか。 (Ơ, là cuốn nào vậy bạn?)"],
        "correctOption": 3,
        "audioScriptJa": "質問：あのう、その本を取ってくれませんか。\n1. ありがとう。\n2. もらいましたよ。\n3. え、どれですか。",
        "audioScriptVi": "Câu hỏi: Xin lỗi, bạn có thể lấy giúp tôi cuốn sách đó được không?\n1. Cảm ơn bạn nhé.\n2. Tôi đã nhận được rồi đấy.\n3. Hả, là cuốn nào vậy bạn?",
        "explanation": "🎯 Đáp án đúng: [3] え、どれですか。\n\n💬 Dịch lời nhờ và các phản hồi:\n• Lời nhờ: \"あのう、その本を取ってくれませんか。\" (Xin lỗi, bạn lấy giúp tôi cuốn sách đó với được không?)\n• 1. ありがとう。 (Cảm ơn bạn.)\n• 2. もらいましたよ。 (Tôi nhận được rồi đấy.)\n• 3. え、どれですか。 (Ơ, là cuốn nào cơ?)\n\n💡 Phân tích & Giải thích:\n• Đối phương nhờ mình lấy giúp cuốn sách ở gần mình (その本を取ってくれませんか).\n• Phản xạ tự nhiên để xác định đúng cuốn sách đối phương cần lấy là: \"え、どれですか。\" (Ơ, là cuốn nào vậy bạn?).\n• Lựa chọn 1 \"Cảm ơn\" là câu của người NHỜ sau khi được giúp, không phải câu của người được nhờ.\n• Lựa chọn 2 \"Tôi nhận rồi\" sai ngữ cảnh.\n• Do đó đáp án chính xác là [3].\n\n🔍 Phân tích các lựa chọn:\n- [1] ありがとう。: SAI vai vế, người nhờ mới nói cảm ơn.\n- [2] もらいましたよ。: SAI ngữ cảnh.\n- [3] え、どれですか。: ĐÚNG, câu hỏi lại tự nhiên để xác định cuốn sách cần lấy giúp.\n\n📄 Trích đề thi gốc (聴解原文):\n「あのう、その本を取ってくれませんか。」→ 正解: [3]"
    },
    96: {
        "globalIndex": 96,
        "localPdfNumber": 7,
        "mondai": 4,
        "snippet": "Mondai 4 - Câu 7: Phản xạ khi được hỏi 'John ơi, bạn có nói được tiếng Nhật không?' (日本語が話せますか)",
        "options": ["勉強してください。 (Bạn hãy học đi nhé.)", "分かりました。 (Tôi hiểu rồi.)", "少しならできます。 (Nếu là một chút thì tôi có thể nói được.)"],
        "correctOption": 3,
        "audioScriptJa": "質問：ジョンさん、日本語が話せますか。\n1. 勉強してください。\n2. 分かりました。\n3. 少しならできます。",
        "audioScriptVi": "Câu hỏi: John ơi, bạn có nói được tiếng Nhật không?\n1. Bạn hãy học đi nhé.\n2. Tôi hiểu rồi.\n3. Nếu là một chút thì tôi có thể nói được.",
        "explanation": "🎯 Đáp án đúng: [3] 少しならできます。\n\n💬 Dịch câu hỏi và các phản hồi:\n• Câu hỏi: \"ジョンさん、日本語が話せますか。\" (John ơi, bạn có nói được tiếng Nhật không?)\n• 1. 勉強してください。 (Bạn hãy học đi.)\n• 2. 分かりました。 (Tôi hiểu rồi.)\n• 3. 少しならできます。 (Nếu là một chút thì tôi có thể.)\n\n💡 Phân tích & Giải thích:\n• Câu hỏi hỏi về khả năng tiếng Nhật của John (話せますか - thể khả năng).\n• Phản hồi [3] \"少しならできます\" (~ならできます: Nếu là một chút thì tôi có thể nói được) là cách trả lời khiêm tốn, lịch sự và rất phổ biến trong tiếng Nhật khi được hỏi về khả năng ngoại ngữ.\n• Lựa chọn 1 bảo người hỏi hãy học đi là bất lịch sự.\n• Lựa chọn 2 dùng để nhận lệnh/yêu cầu.\n• Do đó đáp án chính xác là [3].\n\n🔍 Phân tích các lựa chọn:\n- [1] 勉強してください。: SAI, tự dưng bảo người khác đi học.\n- [2] 分かりました。: SAI, dùng để tiếp nhận yêu cầu, không dùng trả lời câu hỏi khả năng.\n- [3] 少しならできます。: ĐÚNG, câu trả lời khiêm tốn chuẩn mực về khả năng ngoại ngữ.\n\n📄 Trích đề thi gốc (聴解原文):\n「ジョンさん、日本語が話せますか。」→ 正解: [3]"
    },
    97: {
        "globalIndex": 97,
        "localPdfNumber": 8,
        "mondai": 4,
        "snippet": "Mondai 4 - Câu 8: Phản xạ khi được nhờ 'Tanaka ơi, bạn lau bảng trước giúp tôi được không?' (黒板を消しておいてくれませんか)",
        "options": ["はい、すぐにやります。 (Vâng, tôi sẽ làm ngay đây ạ.)", "きれいになりましたね。 (Đã trở nên sạch đẹp rồi nhỉ.)", "ここに置きましょう。 (Chúng ta hãy để ở đây nào.)"],
        "correctOption": 1,
        "audioScriptJa": "質問：あ、田中さん、黒板を消しておいてくれませんか。\n1. はい、すぐにやります。\n2. きれいになりましたね。\n3. ここに置きましょう。",
        "audioScriptVi": "Câu hỏi: A, Tanaka ơi, bạn có thể lau bảng sẵn trước giúp tôi được không?\n1. Vâng, tôi sẽ làm ngay đây ạ.\n2. Đã trở nên sạch đẹp rồi nhỉ.\n3. Chúng ta hãy để ở đây nào.",
        "explanation": "🎯 Đáp án đúng: [1] はい、すぐにやります。\n\n💬 Dịch lời nhờ và các phản hồi:\n• Lời nhờ: \"あ、田中さん、黒板を消しておいてくれませんか。\" (A, Tanaka ơi, bạn xóa bảng sẵn trước giúp tôi được không?)\n• 1. はい、すぐにやります。 (Vâng, tôi sẽ làm ngay đây ạ.)\n• 2. きれいになりましたね。 (Đã sạch đẹp rồi nhỉ.)\n• 3. ここに置きましょう。 (Hãy để ở đây nào.)\n\n💡 Phân tích & Giải thích:\n• Đối phương nhờ vả mình xóa bảng (黒板を消しておいてくれませんか).\n• Phản hồi sẵn sàng nhận lời và thực hiện ngay: \"はい、すぐにやります。\" (Vâng, em sẽ làm ngay ạ).\n• Lựa chọn 2 khen đã sạch trong khi mình chưa lau bảng.\n• Lựa chọn 3 nói về việc đặt để đồ vật, không liên quan đến lau bảng.\n• Do đó đáp án chính xác là [1].\n\n🔍 Phân tích các lựa chọn:\n- [1] はい、すぐにやります。: ĐÚNG, câu nhận lời và thực hiện công việc được nhờ một cách tích cực.\n- [2] きれいになりましたね。: SAI, bảng chưa lau thì không thể nói đã sạch.\n- [3] ここに置きましょう。: SAI nội dung, không liên quan đến hành động xóa bảng.\n\n📄 Trích đề thi gốc (聴解原文):\n「あ、田中さん、黒板を消しておいてくれませんか。」→ 正解: [1]"
    }
}

def apply_listening_updates():
    print(f"Applying {len(LISTENING_QUESTIONS)} authentic listening questions (70..97)...")

    # 1. Update official answers json files
    for ans_path in [
        r"frontend/src/app/data/scanned_n4_2012_official_answers.json",
        r"frontend/src/app/data/scanned_n4_2012_12_official_answers.json"
    ]:
        if os.path.exists(ans_path):
            with open(ans_path, "r", encoding="utf-8") as f:
                d = json.load(f)
            d["totalQuestions"] = 97
            answers = d.get("officialAnswers", d)
            for q_idx, item in LISTENING_QUESTIONS.items():
                answers[str(q_idx)] = item["correctOption"]
            answers.pop("98", None)
            with open(ans_path, "w", encoding="utf-8") as f:
                json.dump(d, f, ensure_ascii=False, indent=2)
            print(f"Updated answers in {ans_path} (removed Q98, totalQuestions=97)")

    # 2. Update master_gold_explanations.json
    master_path = r"scripts/master_gold_explanations.json"
    if os.path.exists(master_path):
        with open(master_path, "r", encoding="utf-8") as f:
            master = json.load(f)
        if "n4-2012-12" in master:
            for q_idx, item in LISTENING_QUESTIONS.items():
                master["n4-2012-12"][str(q_idx)] = {
                    "snippet": item["snippet"],
                    "correctOption": item["correctOption"],
                    "explanation": item["explanation"],
                    "audioScriptJa": item["audioScriptJa"],
                    "audioScriptVi": item["audioScriptVi"]
                }
            master["n4-2012-12"].pop("98", None)
            with open(master_path, "w", encoding="utf-8") as f:
                json.dump(master, f, ensure_ascii=False, indent=2)
            print(f"Updated {master_path} successfully (removed Q98)!")

    # 3. Update jlptDetailedExplanations.ts
    ts_file = r"frontend/src/app/data/jlptDetailedExplanations.ts"
    with open(master_path, "r", encoding="utf-8") as f:
        master = json.load(f)
    
    all_exams_to_export = ["n4-2010-2011", "n4-2012-12"]
    ts_content = """export interface DetailedExplanationItem {
  snippet: string;
  explanation: string;
  audioScriptJa?: string;
  audioScriptVi?: string;
  correctOption?: number;
}

export const EXAM_DETAILED_EXPLANATION_MAP: Record<string, Record<number, DetailedExplanationItem>> = {
"""
    for exam_id in all_exams_to_export:
        if exam_id in master:
            ts_content += f'  "{exam_id}": {{\n'
            q_map = master[exam_id]
            sorted_keys = sorted([int(k) for k in q_map.keys() if int(k) <= 97 or exam_id != "n4-2012-12"])
            for q_idx in sorted_keys:
                item = q_map[str(q_idx)]
                ts_content += f'    "{q_idx}": {{\n'
                ts_content += f'      "snippet": {json.dumps(item.get("snippet", ""), ensure_ascii=False)},\n'
                ts_content += f'      "explanation": {json.dumps(item.get("explanation", ""), ensure_ascii=False)}'
                if item.get("audioScriptJa"):
                    ts_content += f',\n      "audioScriptJa": {json.dumps(item["audioScriptJa"], ensure_ascii=False)}'
                if item.get("audioScriptVi"):
                    ts_content += f',\n      "audioScriptVi": {json.dumps(item["audioScriptVi"], ensure_ascii=False)}'
                if item.get("correctOption") is not None:
                    ts_content += f',\n      "correctOption": {item["correctOption"]}'
                ts_content += "\n    },\n"
            ts_content += "  },\n"
    ts_content += "};\n"
    
    with open(ts_file, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"Updated {ts_file} (Size: {os.path.getsize(ts_file)} bytes)!")

    # 4. Update server_admin_exams.json and scratch/server_admin_exams.json
    for json_path in [
        r"frontend/src/app/data/server_admin_exams.json",
        r"scratch/server_admin_exams.json"
    ]:
        if os.path.exists(json_path):
            with open(json_path, "r", encoding="utf-8") as f:
                admin_data = json.load(f)
            exams = admin_data.get("exams", [])
            ex2 = next((e for e in exams if e.get("id") == "ex-2" or e.get("examCode") == "n4-2012-12"), None)
            if ex2 and ex2.get("versions"):
                ex2["totalQuestions"] = 97
                v = ex2["versions"][0]
                v["totalQuestions"] = 97
                qs = v.get("questions", {})
                updated_count = 0
                for q_idx, item in LISTENING_QUESTIONS.items():
                    s_key = str(q_idx)
                    if s_key not in qs:
                        qs[s_key] = {}
                    q_obj = qs[s_key]
                    q_obj["globalIndex"] = q_idx
                    q_obj["localPdfNumber"] = item["localPdfNumber"]
                    q_obj["sectionType"] = "LISTENING"
                    q_obj["mondai"] = item["mondai"]
                    q_obj["snippet"] = item["snippet"]
                    q_obj["options"] = item["options"]
                    q_obj["correctOption"] = item["correctOption"]
                    q_obj["correctAnswer"] = item["correctOption"]
                    q_obj["explanation"] = item["explanation"]
                    q_obj["audioScriptJa"] = item["audioScriptJa"]
                    q_obj["audioScriptVi"] = item["audioScriptVi"]
                    q_obj["optionText"] = f"Phương án [{item['correctOption']}]"
                    updated_count += 1
                qs.pop("98", None)
                
                with open(json_path, "w", encoding="utf-8") as f:
                    json.dump(admin_data, f, ensure_ascii=False, indent=2)
                print(f"Updated {updated_count} listening questions in {json_path} (removed Q98, totalQuestions=97)!")

    # 5. Push to live running Next.js /api/jlpt-exams backend endpoint if online
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
