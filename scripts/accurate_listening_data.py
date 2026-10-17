# -*- coding: utf-8 -*-
"""
Script to accurately update all 24 listening questions (Q66..Q89) in generate_n5_master_data.py
and regenerate jlptDetailedExplanations.ts.
"""

ACCURATE_LISTENING_DATA = {
    66: {
        "mondai": 1,
        "section": "LISTENING",
        "localNum": 1,
        "opt": 2,
        "snippet": "Choukai M1-1: 女の人は、どの靴下を買いますか",
        "meaning": "Người phụ nữ sẽ mua đôi tất (vớ) nào?",
        "analysis": "• Theo đối thoại tại cửa hàng tất: Người nữ muốn mua tất trẻ em. Người bán hỏi: 'Tất dài hay tất ngắn ạ?'. Nữ trả lời: 'Loại dài ạ (長いのです)'. Người bán giới thiệu có hình hoa quả và hình động vật. Người nữ quyết định: 'Cho tôi lấy loại hình động vật nhé (動物のをください)'.\n• Vậy người phụ nữ chọn mua: Tất dài và có hình động vật -> Đáp án đúng là phương án [2].",
        "options": [
            "- 1. Tất ngắn có hình động vật",
            "- 2. Tất dài có hình động vật (長い靴下・動物の絵): (ĐÚNG)",
            "- 3. Tất dài có hình hoa quả",
            "- 4. Tất ngắn có hình hoa quả"
        ],
        "audioJa": "【音声テキスト】\n靴下の店で、女の人と店の人が話しています。女の人は、どの靴下を買いますか。\n女：子供の靴下、ありますか。\n男：はい。長いのですか、短いのですか。\n女：長いのです。\n男：はい。果物の絵と動物の絵があります。どちらがいいですか。\n女：そうですね。動物のをください。\n男：ありがとうございます。\n質問：女の人は、どの靴下を買いますか。",
        "audioVi": "【Bản dịch Script】\nTại cửa hàng bán tất, người phụ nữ nói chuyện với nhân viên:\nNữ: Ở đây có tất trẻ em không ạ?\nNam: Dạ có ạ. Chị muốn tìm loại tất dài hay tất ngắn ạ?\nNữ: Loại dài nhé.\nNam: Vâng. Cửa hàng có mẫu in hình hoa quả và mẫu in hình động vật, chị thích mẫu nào hơn ạ?\nNữ: Để xem nào. Cho tôi lấy đôi có hình động vật nhé.\nNam: Vâng, xin cảm ơn chị ạ.\nCâu hỏi: Người phụ nữ sẽ mua đôi tất nào?",
        "pdfPage": 19
    },
    67: {
        "mondai": 1,
        "section": "LISTENING",
        "localNum": 2,
        "opt": 2,
        "snippet": "Choukai M1-2: 女の人は、一日に何回くすりを飲みますか",
        "meaning": "Người phụ nữ mỗi ngày phải uống thuốc mấy lần?",
        "analysis": "• Theo lời căn dặn của bác sĩ tại bệnh viện: 'Thuốc này hãy uống sau bữa ăn sáng và tối (朝と夜、ご飯を食べたあとで)'. Người nữ hỏi buổi trưa thì bác sĩ dặn: 'Buổi trưa không được uống nhé (昼は飲まないでください)'. Uống trong vòng 4 ngày.\n• Vậy mỗi ngày chỉ uống 2 lần (sáng và tối) -> Đáp án đúng là phương án [2].",
        "options": [
            "- 1. Uống 1 lần mỗi ngày",
            "- 2. Uống 2 lần mỗi ngày (sáng và tối - 2回): (ĐÚNG)",
            "- 3. Uống 3 lần mỗi ngày (sáng, trưa, tối)",
            "- 4. Uống 4 lần mỗi ngày"
        ],
        "audioJa": "【音声テキスト】\n病院で、医者と女の人が話しています。女の人は、一日に何回くすりを飲みますか。\n男：このくすりは、朝と夜、ご飯を食べたあとで飲んでください。\n女：昼ご飯のあとは？\n男：昼は飲まないでください。\n女：はい。\n男：4日間飲んでくださいね。\n女：わかりました。\n質問：女の人は、一日に何回くすりを飲みますか。",
        "audioVi": "【Bản dịch Script】\nBác sĩ và người phụ nữ đang nói chuyện tại bệnh viện:\nBác sĩ: Thuốc này hãy uống sau bữa ăn sáng và bữa ăn tối nhé.\nNữ: Sau bữa trưa thì có uống không ạ?\nBác sĩ: Buổi trưa thì đừng uống nhé.\nNữ: Vâng ạ.\nBác sĩ: Hãy uống liên tục trong 4 ngày nhé.\nNữ: Vâng, tôi hiểu rồi ạ.\nCâu hỏi: Người phụ nữ một ngày uống thuốc mấy lần?",
        "pdfPage": 19
    },
    68: {
        "mondai": 1,
        "section": "LISTENING",
        "localNum": 3,
        "opt": 3,
        "snippet": "Choukai M1-3: 店の人はどのかばんを取りますか",
        "meaning": "Người nhân viên bán hàng sẽ lấy chiếc túi xách nào đưa cho khách?",
        "analysis": "• Căn cứ cuộc đối thoại tại trung tâm thương mại: Khách hàng yêu cầu: 'Xin lấy giúp tôi chiếc túi xách màu đen ở phía trên kia với ạ (その上の黒いかばん)'. Nhân viên hỏi: 'Có phải chiếc nhỏ này không?'. Khách nói: 'Không, là chiếc to cơ (いいえ。大きいのです)'.\n• Vậy nhân viên lấy chiếc túi to màu đen ở hàng trên -> Đáp án đúng là phương án [3].",
        "options": [
            "- 1. Chiếc túi nhỏ màu đen ở hàng dưới",
            "- 2. Chiếc túi to màu trắng ở hàng trên",
            "- 3. Chiếc túi to màu đen ở hàng trên (上の黒い大きいかばん): (ĐÚNG)",
            "- 4. Chiếc túi nhỏ màu đen ở hàng trên"
        ],
        "audioJa": "【音声テキスト】\nデパートで、女の人と店の人が話しています。店の人はどのかばんを取りますか。\n女：すみません。その上の黒いかばんを取ってください。\n男：どちらですか。この小さいのですか。\n女：いいえ。大きいのです。\n男：はい。\n質問：店の人はどのかばんを取りますか。",
        "audioVi": "【Bản dịch Script】\nTại trung tâm thương mại, khách nữ và nhân viên bán hàng nói chuyện:\nNữ: Xin lỗi, xin hãy lấy giúp tôi chiếc túi xách màu đen ở phía trên kia với ạ.\nNam: Chiếc nào ạ? Có phải chiếc nhỏ này không ạ?\nNữ: Không phải. Là chiếc to ấy ạ.\nNam: Vâng, có ngay đây ạ.\nCâu hỏi: Người nhân viên bán hàng sẽ lấy chiếc túi nào?",
        "pdfPage": 19
    },
    69: {
        "mondai": 1,
        "section": "LISTENING",
        "localNum": 4,
        "opt": 3,
        "snippet": "Choukai M1-4: 学生は机の上に何を置きますか",
        "meaning": "Các bạn học sinh phải để những đồ vật gì lên trên bàn học?",
        "analysis": "• Theo lời thầy giáo phổ biến bài thi: Thầy dặn lấy từ điển ra để lên bàn vì có phần tra cứu (机の上に辞書を出してください), lấy bút chì và tẩy ra (鉛筆と消しゴムも出してください). Thầy dặn đồng hồ cất vào cặp (時計はカバンの中に入れてください) và vở ghi cũng cất vào cặp (ノートもカバンの中に入れてください).\n• Như vậy, đồ vật để trên mặt bàn gồm có: Từ điển, bút chì và tẩy. Đối chiếu tranh vẽ trong đề thi, phương án [3] minh họa chính xác bộ ba đồ vật này -> Đáp án đúng là phương án [3].",
        "options": [
            "- 1. Tranh vẽ gồm đồng hồ, bút chì và tẩy (Sai vì đồng hồ phải cất vào cặp)",
            "- 2. Tranh vẽ gồm vở ghi, bút chì và từ điển (Sai vì vở ghi phải cất vào cặp)",
            "- 3. Tranh vẽ gồm từ điển, bút chì và cục tẩy (辞書・鉛筆・消しゴム): (ĐÚNG)",
            "- 4. Tranh vẽ gồm từ điển và đồng hồ (Sai)"
        ],
        "audioJa": "【音声テキスト】\n教室で先生が話しています。学生は机の上に何を置きますか。\n男：今からテストをします。このテストでは辞書を使う問題がありますから、机の上に辞書を出してください。鉛筆と消しゴムも出してください。時計はカバンの中に入れてください。\n女：先生、ノートはどうしますか。\n男：ノートもカバンの中に入れてください。\n質問：学生は机の上に何を置きますか。",
        "audioVi": "【Bản dịch Script】\nThầy giáo phổ biến quy chế trong phòng thi:\nThầy giáo: Bây giờ chúng ta sẽ bắt đầu làm bài thi. Trong bài thi này có câu hỏi phải dùng từ điển nên các em hãy để từ điển lên trên bàn nhé. Bút chì và tẩy cũng để lên bàn luôn. Còn đồng hồ thì hãy cất vào trong cặp.\nHọc sinh: Thưa thầy, còn vở ghi thì sao ạ?\nThầy giáo: Vở ghi cũng cất vào trong cặp luôn nhé.\nCâu hỏi: Học sinh sẽ để những đồ vật gì lên trên bàn?",
        "pdfPage": 19
    },
    70: {
        "mondai": 1,
        "section": "LISTENING",
        "localNum": 5,
        "opt": 1,
        "snippet": "Choukai M1-5: 学生は、始めになにをしますか",
        "meaning": "Các bạn học sinh sẽ làm hành động gì trước tiên?",
        "analysis": "• Theo thông báo của hướng dẫn viên trên xe bus: 'Đoàn đã đến khách sạn rồi. Bây giờ chúng ta sẽ ăn tối tại nhà hàng tầng 1 (今から1階のレストランで晩ご飯を食べます). Bữa tối bắt đầu từ 7 giờ, bây giờ là 6 giờ 50 rồi nên hãy đi ngay nhé. Hành lý thì nhân viên khách sạn sẽ tự mang lên phòng. Sau bữa ăn mới xem tivi hoặc đi mua sắm'.\n• Hành động các bạn học sinh phải làm ngay trước tiên là đến nhà hàng tầng 1 để ăn tối -> Đáp án đúng là phương án [1].",
        "options": [
            "- 1. Đến nhà hàng tầng 1 ăn tối trước tiên (晩ご飯を食べる): (ĐÚNG)",
            "- 2. Tự mang hành lý lên phòng ngủ",
            "- 3. Đi dạo mua sắm quà lưu niệm",
            "- 4. Đi xem tivi ở phòng nghỉ"
        ],
        "audioJa": "【音声テキスト】\nバスの中で旅行会社の人が話しています。学生は、始めになにをしますか。\n女：皆さん、ホテルに着きました。今から1階のレストランで晩ご飯を食べます。晩ご飯は7時からです。今6時50分ですから、すぐに行ってください。皆さんの荷物は、ホテルの人が部屋に持って行きます。晩ご飯の後はテレビを見たり、買い物をしたりしてください。\n質問：学生は、始めになにをしますか。",
        "audioVi": "【Bản dịch Script】\nHướng dẫn viên du lịch thông báo trên xe bus:\nNữ: Thưa các bạn, chúng ta đã đến khách sạn rồi. Bây giờ chúng ta sẽ ăn bữa tối tại nhà hàng ở tầng 1. Bữa ăn bắt đầu từ 7 giờ, hiện tại là 6 giờ 50 phút rồi nên xin mời các bạn đi ngay nhé. Hành lý của mọi người sẽ có nhân viên khách sạn mang lên phòng giúp. Sau khi ăn tối xong các bạn có thể xem tivi hoặc đi mua sắm tùy ý nhé.\nCâu hỏi: Các bạn học sinh sẽ làm gì đầu tiên?",
        "pdfPage": 19
    },
    71: {
        "mondai": 1,
        "section": "LISTENING",
        "localNum": 6,
        "opt": 4,
        "snippet": "Choukai M1-6: 男の人は何を持っていきますか",
        "meaning": "Người nam sẽ chuẩn bị và mang theo đồ vật gì khi đi biển?",
        "analysis": "• Theo đối thoại bàn về chuyến đi biển: Nữ nhận mang cơm nắm: 'Tôi sẽ mang cơm nắm onigiri (わたしはおにぎりを持っていきます)'. Nữ ban đầu nhờ nam mang đồ uống và bánh kẹo: 'Nhờ bạn mang đồ uống và bánh kẹo nhé'. Nhưng ngay sau đó nữ bảo: 'A, đồ uống nặng lắm. Đến biển rồi chúng mình hãy mua (飲み物は重いですね。海に着いてから買いましょう)'. Bạn nam đồng ý.\n• Như vậy bạn nam chỉ cần mang theo bánh kẹo (お菓子). Đối chiếu hình vẽ trong đề thi, phương án [4] minh họa gói bánh kẹo -> Đáp án đúng là phương án [4].",
        "options": [
            "- 1. Cơm nắm và chai nước ngọt",
            "- 2. Chai đồ uống",
            "- 3. Cơm nắm và bánh kẹo",
            "- 4. Bánh kẹo ăn vặt (お菓子): (ĐÚNG)"
        ],
        "audioJa": "【音声テキスト】\n男の人と女の人が話しています。男の人は何を持っていきますか。\n男：来週の日曜日、海へ行きますね。何を持っていきましょうか。\n女：わたしはおにぎりを持っていきます。\n男：じゃあ、僕は……\n女：飲み物とお菓子をお願いします。\n男：はい。飲み物とお菓子ですね。\n女：あ、飲み物は重いですね。海に着いてから買いましょう。\n男：そうですね。\n質問：男の人は何を持っていきますか。",
        "audioVi": "【Bản dịch Script】\nHai bạn trẻ bàn việc chuẩn bị đồ đi biển:\nNam: Chủ nhật tuần sau chúng mình đi biển nhỉ. Mình nên mang theo gì đây?\nNữ: Tôi sẽ mang theo cơm nắm onigiri nhé.\nNam: Vậy còn tôi thì sao...\nNữ: Bạn mang giúp tôi đồ uống và bánh kẹo nhé.\nNam: Được, đồ uống và bánh kẹo nhé.\nNữ: À thôi, đồ uống xách nặng lắm. Đến biển rồi chúng mình hãy mua nhé.\nNam: Ừ, thế cũng hay đấy.\nCâu hỏi: Người nam sẽ mang theo gì?",
        "pdfPage": 19
    },
    72: {
        "mondai": 1,
        "section": "LISTENING",
        "localNum": 7,
        "opt": 4,
        "snippet": "Choukai M1-7: 女の人は、何番のバスに乗りますか",
        "meaning": "Người phụ nữ sẽ lên tuyến xe buýt số mấy?",
        "analysis": "• Theo đối thoại tại trạm xe bus: Người nữ hỏi xe số 1 có đi đến ga Midori không. Nhân viên trả lời: 'Xe đi ga Midori là xe số 8, số 5 và số 7'. Sau đó giải thích tiếp: 'Hôm nay là Chủ nhật nên xe số 5 không chạy (今日は日曜日ですから、5番のバスはありません). Xe số 8 chỉ chạy buổi sáng và chiều tối (8番は朝と夕方のバスですから), nên thời điểm hiện tại hãy đi xe số 7 (今の時間は7番ですね)'.\n• Người nữ phải đi xe buýt số 7. Đối chiếu hình vẽ các tuyến xe buýt trong đề thi, phương án [4] ghi số 7 -> Đáp án đúng là phương án [4].",
        "options": [
            "- 1. Xe buýt số 1",
            "- 2. Xe buýt số 5 (Không chạy vào Chủ nhật)",
            "- 3. Xe buýt số 8 (Chỉ chạy sáng và chiều tối)",
            "- 4. Xe buýt số 7 (Tuyến xe buýt đúng lúc này - 7番): (ĐÚNG)"
        ],
        "audioJa": "【音声テキスト】\nバス停で、女の人とバス会社の人が話しています。女の人は、何番のバスに乗りますか。\n女：すみません、1番のバスが緑駅に行きますか。\n男：いいえ、緑駅に行くバスは8番と5番と7番ですよ。\n女：そうですか。\n男：あ、でも今日は日曜日ですから、5番のバスはありません。\n女：そうですか。\n男：それから、8番は朝と夕方のバスですから、今の時間は7番ですね。\n女：わかりました。ありがとうございます。\n質問：女の人は、何番のバスに乗りますか。",
        "audioVi": "【Bản dịch Script】\nTại điểm chờ xe buýt, người phụ nữ hỏi nhân viên nhà xe:\nNữ: Xin lỗi bác, xe buýt số 1 có đi tới ga Midori không ạ?\nNam: Không cháu ạ, xe buýt đi ga Midori là tuyến số 8, số 5 và số 7 cơ.\nNữ: Ra là vậy ạ.\nNam: À nhưng hôm nay là Chủ nhật nên tuyến số 5 không chạy đâu nhé.\nNữ: Vâng ạ.\nNam: Thêm nữa là xe số 8 chỉ chạy vào buổi sáng sớm và lúc chiều tối thôi, cho nên vào giờ này cháu hãy lên xe số 7 nhé.\nNữ: Cháu hiểu rồi ạ, cháu cảm ơn bác.\nCâu hỏi: Người phụ nữ sẽ lên xe buýt số mấy?",
        "pdfPage": 20
    },

    # ==================== MONDAI 2 (73..78) ====================
    73: {
        "mondai": 2,
        "section": "LISTENING",
        "localNum": 1,
        "opt": 4,
        "snippet": "Choukai M2-1: 女の学生はきょう何時間勉強しますか",
        "meaning": "Hôm nay bạn nữ sinh viên sẽ học trong mấy tiếng đồng hồ?",
        "analysis": "• Theo đối thoại giữa hai sinh viên tại trường: Nam hỏi Yamada mỗi ngày học mấy tiếng. Bạn nữ bảo bình thường mỗi ngày học khoảng 3 tiếng (毎日3時間ぐらいです). Nhưng bạn nữ nói thêm ngay sau đó: 'À nhưng vì ngày mai có bài thi nên hôm nay tôi sẽ học 4 tiếng (あ、でも明日はテストがありますから、今日は4時間勉強します)'.\n• Câu hỏi hỏi về 'Hôm nay học mấy tiếng (きょう何時間)', vậy đáp án là 4 tiếng -> Đáp án đúng là phương án [4].",
        "options": [
            "- 1. Học 1 tiếng (Thời gian học mỗi ngày của bạn nam)",
            "- 2. Học 2 tiếng",
            "- 3. Học 3 tiếng (Thời gian học bình thường mỗi ngày)",
            "- 4. Học 4 tiếng (Thời gian học ngày hôm nay để ôn thi - 4時間): (ĐÚNG)"
        ],
        "audioJa": "【音声テキスト】\n大学で、男の学生と女の学生が話しています。女の学生はきょう何時間勉強しますか。\n男：山田さんは、いつも何時間ぐらい勉強しますか。\n女：ううん、毎日3時間ぐらいです。\n男：えっ、私は毎日1時間です。\n女：あ、でも明日はテストがありますから、今日は4時間勉強します。\n男：そうですか。\n質問：女の学生はきょう何時間勉強しますか。",
        "audioVi": "【Bản dịch Script】\nHai bạn sinh viên trò chuyện tại trường đại học:\nNam: Yamada này, bình thường mỗi ngày bạn học khoảng mấy tiếng vậy?\nNữ: Ừm, ngày nào tôi cũng học khoảng 3 tiếng đấy.\nNam: Ồ, tôi thì mỗi ngày chỉ học có 1 tiếng thôi.\nNữ: À nhưng mà vì ngày mai có bài thi nên hôm nay tôi sẽ học 4 tiếng đấy.\nNam: Thế à.\nCâu hỏi: Hôm nay bạn nữ sinh viên sẽ học trong mấy tiếng?",
        "pdfPage": 20
    },
    74: {
        "mondai": 2,
        "section": "LISTENING",
        "localNum": 2,
        "opt": 3,
        "snippet": "Choukai M2-2: 女の人の電話番号は何番ですか",
        "meaning": "Số điện thoại chính xác của người phụ nữ là số nào?",
        "analysis": "• Theo đoạn hội thoại: Bạn nam đọc thử lại số điện thoại: 'Số điện thoại của Yamada là 512-7734 đúng không?'. Người nữ đính chính rõ ràng: 'Không, không phải 7734 đâu mà là 7743 cơ (いいえ、7734じゃなくて、7743です)'. Nam xác nhận lại: '512-7743'.\n• Vậy số điện thoại chuẩn xác là 512-7743 -> Đáp án đúng là phương án [3].",
        "options": [
            "- 1. 512-7734 (Số bạn nam đọc nhầm ban đầu)",
            "- 2. 512-7434",
            "- 3. 512-7743 (Số điện thoại chính xác của Yamada): (ĐÚNG)",
            "- 4. 512-7443"
        ],
        "audioJa": "【音声テキスト】\n男の人と女の人が話しています。女の人の電話番号は何番ですか。\n男：あのう、山田さんの電話番号は512-7734ですね。\n女：いいえ、7734じゃなくて、7743です。\n男：えっ、ちょっと待ってください。メモします。512の……\n女：7743です。\n男：はい、ありがとうございました。\n質問：女の人の電話番号は何番ですか。",
        "audioVi": "【Bản dịch Script】\nNgười nam và người nữ đang trao đổi số liên lạc:\nNam: Cậu ơi, số điện thoại của Yamada là 512-7734 đúng không nhỉ?\nNữ: Không phải đâu, không phải 7734 mà là 7743 cơ.\nNam: Ơ đợi tớ chút để ghi lại nhé. 512 rồi...\nNữ: 7743 nhé.\nNam: Rồi, cảm ơn cậu nhiều nhé.\nCâu hỏi: Số điện thoại của người phụ nữ là số nào?",
        "pdfPage": 20
    },
    75: {
        "mondai": 2,
        "section": "LISTENING",
        "localNum": 3,
        "opt": 2,
        "snippet": "Choukai M2-3: 男の学生はだれと住んでいますか",
        "meaning": "Bạn nam sinh viên đang sống cùng với ai?",
        "analysis": "• Theo cuộc đối thoại giữa hai sinh viên: Bạn nữ hỏi: 'Yamada đang sống cùng bố mẹ à?'. Bạn nam trả lời: 'Không, bố mẹ tớ sống ở xa. Hiện tại tớ đang sống cùng chị gái (いま、姉と一緒に住んでいます)'. Bạn nữ hỏi có một anh chị em thôi à, nam bảo: 'Còn có em trai nữa nhưng em trai sống cùng bố mẹ'.\n• Như vậy bạn nam đang sống cùng chị gái (姉と). Đối chiếu các phương án lựa chọn, phương án [2] chỉ người chị gái -> Đáp án đúng là phương án [2].",
        "options": [
            "- 1. Sống một mình",
            "- 2. Sống cùng chị gái (姉と一緒に住んでいる): (ĐÚNG)",
            "- 3. Sống cùng bố mẹ",
            "- 4. Sống cùng em trai"
        ],
        "audioJa": "【音声テキスト】\n女の学生と男の学生が話しています。男の学生はだれと住んでいますか。\n女：山田さんはお父さんとお母さんと一緒に住んでいますか。\n男：いいえ、両親は遠くに住んでいます。\n女：そうですか。\n男：いま、姉と一緒に住んでいます。\n女：ご兄弟はひとりですか。\n男：あっ、弟もいますよ。弟は両親と一緒です。\n質問：男の学生はだれと住んでいますか。",
        "audioVi": "【Bản dịch Script】\nHai bạn sinh viên nói chuyện về cuộc sống gia đình:\nNữ: Yamada này, bạn đang sống chung với cả bố và mẹ à?\nNam: Không, bố mẹ tớ sống ở quê xa lắm.\nNữ: Thế à.\nNam: Hiện tại tớ đang ở chung với chị gái.\nNữ: Cậu chỉ có một chị gái thôi à?\nNam: À không, tớ còn có một cậu em trai nữa. Nhưng em trai thì ở quê cùng với bố mẹ.\nCâu hỏi: Bạn nam sinh viên đang sống cùng với ai?",
        "pdfPage": 20
    },
    76: {
        "mondai": 2,
        "section": "LISTENING",
        "localNum": 4,
        "opt": 4,
        "snippet": "Choukai M2-4: 二人はどこで昼ご飯を食べますか",
        "meaning": "Hai bạn sẽ ăn bữa trưa ở địa điểm nào?",
        "analysis": "• Theo đối thoại giữa hai bạn sinh viên: Nam rủ đi ăn trưa. Bạn nữ nhắc: 'Hôm nay là thứ Bảy nên căng tin trường và quán giải khát đều nghỉ rồi (土曜日だから、学校の食堂や喫茶店は休みですよ)'. Bạn nam đưa ra giải pháp: 'Thế thì chúng mình mua bánh mì ở tiệm bánh rồi mang vào phòng học ăn nhé (パン屋でパンを買って、教室で食べましょうか)'. Bạn nữ đồng ý ngay.\n• Địa điểm ăn trưa là ở phòng học (教室で). Đối chiếu các lựa chọn, phương án [4] là phòng học -> Đáp án đúng là phương án [4].",
        "options": [
            "- 1. Ăn ở căng tin nhà trường (Thứ Bảy căng tin đóng cửa)",
            "- 2. Ăn ở quán giải khát (Quán nghỉ)",
            "- 3. Ăn ở tiệm bánh mì",
            "- 4. Ăn ở trong phòng học (教室で食べる): (ĐÚNG)"
        ],
        "audioJa": "【音声テキスト】\n学校で、男の学生と女の学生が話しています。二人はどこで昼ご飯を食べますか。\n男：もう1時ですね。何か食べませんか。\n女：そうですね。でも、今日は土曜日だから、学校の食堂や喫茶店は休みですよ。\n男：じゃあ、パン屋でパンを買って、教室で食べましょうか。\n女：そうですね。\n質問：二人はどこで昼ご飯を食べますか。",
        "audioVi": "【Bản dịch Script】\nHai bạn sinh viên bàn chuyện đi ăn trưa tại trường:\nNam: Đã 1 giờ rồi nhỉ. Chúng mình đi ăn gì đó đi?\nNữ: Ừ đi thôi. Nhưng mà hôm nay là thứ Bảy nên nhà ăn trường với cả quán nước đều đóng cửa nghỉ rồi đấy.\nNam: Thế thì mình ra tiệm bánh mua bánh mì rồi mang về lớp học ăn nhé?\nNữ: Ừ, thế cũng được đấy.\nCâu hỏi: Hai người sẽ ăn trưa ở đâu?",
        "pdfPage": 20
    },
    77: {
        "mondai": 2,
        "section": "LISTENING",
        "localNum": 5,
        "opt": 1,
        "snippet": "Choukai M2-5: 学生は何で名前を書きますか",
        "meaning": "Học sinh sẽ dùng dụng cụ gì để viết họ tên?",
        "analysis": "• Theo lời cô giáo dặn cả lớp: 'Ai muốn đăng ký đi dã ngoại bằng xe bus tháng sau thì hãy viết tên vào tờ giấy này bằng bút bi nhé (ボールペンで名前を書いてください). Không dùng bút chì mà phải dùng bút bi (鉛筆じゃなくて、ボールペンですよ). Hãy viết bằng mực đen, đừng viết bằng mực đỏ nhé (黒で書いてください。赤で書かないでくださいね)'.\n• Vậy học sinh phải dùng bút bi màu đen (黒のボールペン) để viết tên. Phương án [1] là bút bi đen -> Đáp án đúng là phương án [1].",
        "options": [
            "- 1. Bút bi màu đen (黒のボールペン): (ĐÚNG)",
            "- 2. Bút bi màu đỏ (Cô dặn không được viết)",
            "- 3. Bút chì đen (Cô dặn không được dùng bút chì)",
            "- 4. Bút dạ"
        ],
        "audioJa": "【音声テキスト】\n教室で、先生が学生に話しています。学生は何で名前を書きますか。\n女：はい。じゃあ、ちょっと聞いてください。ええ、来月のバス旅行に行きたい人は、この紙にボールペンで名前を書いてください。鉛筆じゃなくて、ボールペンですよ。黒で書いてください。赤で書かないでくださいね。\n質問：学生は何で名前を書きますか。",
        "audioVi": "【Bản dịch Script】\nCô giáo thông báo trong lớp học:\nCô giáo: Cả lớp trật tự nghe cô dặn một chút nhé. Những bạn nào muốn tham gia chuyến du lịch bằng xe buýt vào tháng sau thì hãy viết họ tên vào tờ giấy này bằng bút bi nhé. Dùng bút bi chứ không dùng bút chì nhé. Viết bằng mực đen, tuyệt đối không được viết bằng mực đỏ đâu đấy nhé.\nCâu hỏi: Học sinh sẽ dùng cái gì để viết tên?",
        "pdfPage": 20
    },
    78: {
        "mondai": 2,
        "section": "LISTENING",
        "localNum": 6,
        "opt": 3,
        "snippet": "Choukai M2-6: 二人は明日どこで会いますか",
        "meaning": "Ngày mai hai bạn sẽ gặp nhau ở địa điểm nào?",
        "analysis": "• Theo đối thoại hẹn đi xem bóng đá: Nữ rủ mai đi xem bóng đá và đề xuất: 'Gặp nhau ở ga lúc 5 giờ nhé (5時に駅で会いませんか)'. Bạn nam bảo: 'Ở ga đông người lắm (駅は人が多いですよ)'. Bạn nữ liền đổi ý: 'Ừ nhỉ, vậy quán cà phê trước ga thì sao? (駅の前の喫茶店はどうですか)'. Bạn nam tán thành ngay: 'Ừ, quyết định thế nhé (はい、そうしましょう)'. Sau đó hai bạn bàn thêm xem xong thì đi ăn nhà hàng gần đó.\n• Địa điểm hẹn gặp mặt lúc 5 giờ là quán cà phê trước ga (駅の前の喫茶店). Đối chiếu các lựa chọn, phương án [3] là quán cà phê -> Đáp án đúng là phương án [3].",
        "options": [
            "- 1. Gặp ở ga tàu điện (Bị hủy vì ở ga quá đông người)",
            "- 2. Gặp ở sân vận động bóng đá",
            "- 3. Gặp ở quán cà phê trước nhà ga (駅の前の喫茶店): (ĐÚNG)",
            "- 4. Gặp ở nhà hàng gần sân vận động"
        ],
        "audioJa": "【音声テキスト】\n女の学生と男の学生が話しています。二人は明日どこで会いますか。\n女：あしたの夜、一緒にサッカーを見に行きませんか。\n男：いいですね。どこで会いましょうか。\n女：5時に駅で会いませんか。\n男：駅は人が多いですよ。\n女：そうですね。じゃあ、駅の前の喫茶店はどうですか。\n男：はい、そうしましょう。あっ、サッカーを見てから、近くのレストランで晩ご飯を食べましょうか。\n女：ええ、じゃ、明日5時に会いましょう。\n質問：二人は明日どこで会いますか。",
        "audioVi": "【Bản dịch Script】\nHai bạn sinh viên hẹn nhau đi xem bóng đá:\nNữ: Tối mai cậu cùng tớ đi xem bóng đá không?\nNam: Hay quá, đi chứ! Thế chúng mình gặp nhau ở đâu đây?\nNữ: 5 giờ gặp nhau ở nhà ga nhé?\nNam: Ở ga giờ đấy đông người lắm cậu ạ.\nNữ: Ừ nhỉ. Vậy quán cà phê ở ngay trước ga thì sao?\nNam: Ừ, chốt thế đi. À, xem bóng đá xong thì mình vào nhà hàng gần đó ăn tối luôn nhé?\nNữ: Ừ trí, vậy mai 5 giờ gặp nhau ở quán cà phê nhé.\nCâu hỏi: Ngày mai hai người sẽ gặp nhau ở đâu?",
        "pdfPage": 20
    },

    # ==================== MONDAI 3 (79..83) ====================
    79: {
        "mondai": 3,
        "section": "LISTENING",
        "localNum": 1,
        "opt": 1,
        "snippet": "Choukai M3-1: ご飯を食べました。なんと言いますか",
        "meaning": "Vừa ăn cơm xong, bạn sẽ nói câu giao tiếp nào?",
        "analysis": "• Văn hóa giao tiếp tiếng Nhật: Sau khi dùng bữa xong, câu chào cảm ơn bữa ăn chuẩn mực là 「ごちそうさまでした」 (Cảm ơn vì bữa ăn ngon).\n• Câu 「いただきます」 chỉ dùng trước khi bắt đầu ăn. Câu 「どういたしまして」 là Không có gì (đáp lại lời cảm ơn).\n• Phương án 1 là câu nói chuẩn xác nhất -> Đáp án đúng là phương án [1].",
        "options": [
            "- 1. ごちそうさまでした (Cảm ơn vì bữa ăn ngon): (ĐÚNG)",
            "- 2. いただきます (Xin phép dùng bữa - dùng TRƯỚC khi ăn)",
            "- 3. どういたしまして (Không có chi - đáp lại lời cảm ơn)"
        ],
        "audioJa": "【音声テキスト】\nご飯を食べました。なんと言いますか。\n1. ごちそうさまでした。\n2. いただきます。\n3. どういたしまして。",
        "audioVi": "【Bản dịch Script】\nSau khi ăn cơm xong, bạn sẽ nói câu nào?\n1. Cảm ơn vì bữa ăn ngon (ごちそうさまでした).\n2. Xin mời mọi người cùng ăn (いただきます - nói trước khi ăn).\n3. Không có chi (nhường lời).",
        "pdfPage": 21
    },
    80: {
        "mondai": 3,
        "section": "LISTENING",
        "localNum": 2,
        "opt": 3,
        "snippet": "Choukai M3-2: 電車の中です。女の人が来ました。なんと言いますか",
        "meaning": "Đang ngồi trên tàu điện thì có một người phụ nữ bước tới. Bạn muốn nhường ghế thì nói câu nào?",
        "analysis": "• Tình huống nhường chỗ ngồi lịch sự trên tàu xe: Khi muốn nhường ghế cho người khác ngồi, câu nói tự nhiên và lịch sự nhất là 「ここ、どうぞ」 (Chỗ này, xin mời bạn / bác ngồi ạ).\n• Phương án 3 hoàn toàn chính xác -> Đáp án đúng là phương án [3].",
        "options": [
            "- 1. どうもありがとう (Cảm ơn bạn rất nhiều - sai ngữ cảnh)",
            "- 2. はじめまして (Rất hân hạnh được làm quen lần đầu)",
            "- 3. ここ、どうぞ (Chỗ này, xin mời bạn ngồi ạ): (ĐÚNG)"
        ],
        "audioJa": "【音声テキスト】\n電車の中です。女の人が来ました。なんと言いますか。\n1. どうもありがとう。\n2. はじめまして。\n3. ここ、どうぞ。",
        "audioVi": "【Bản dịch Script】\nĐang ngồi trên tàu điện, có người phụ nữ bước đến trước mặt bạn. Bạn sẽ nói câu gì?\n1. Cảm ơn bạn rất nhiều.\n2. Rất vui được làm quen với bạn lần đầu.\n3. Chỗ này, xin mời bạn ngồi (ここ、どうぞ).",
        "pdfPage": 21
    },
    81: {
        "mondai": 3,
        "section": "LISTENING",
        "localNum": 3,
        "opt": 2,
        "snippet": "Choukai M3-3: うちへ帰ります。友達になんと言いますか",
        "meaning": "Bạn chuẩn bị đi về nhà. Bạn sẽ nói câu chào tạm biệt nào với bạn bè?",
        "analysis": "• Khi chuẩn bị chia tay bạn bè để đi về nhà, câu chào tạm biệt thân mật và phổ biến nhất giữa bạn bè là 「じゃ、また」 (Hẹn gặp lại bạn sau nhé).\n• Câu 「行ってきます」 dùng chào người trong nhà khi mình chuẩn bị rời nhà đi đâu đó. Câu 「ただいま」 dùng khi mình đã về tới nhà của mình.\n• Phương án 2 là câu chào chuẩn xác -> Đáp án đúng là phương án [2].",
        "options": [
            "- 1. 行ってきます (Con đi đây - nói khi rời khỏi nhà)",
            "- 2. じゃ、また (Tạm biệt, hẹn gặp lại bạn nhé): (ĐÚNG)",
            "- 3. ただいま (Con đã về rồi đây - nói khi bước chân vào nhà)"
        ],
        "audioJa": "【音声テキスト】\nうちへ帰ります。友達になんと言いますか。\n1. 行ってきます。\n2. じゃ、また。\n3. ただいま。",
        "audioVi": "【Bản dịch Script】\nBạn chuẩn bị đi về nhà. Bạn sẽ chào tạm biệt bạn bè bằng câu nào?\n1. Tôi đi đây (chào khi rời nhà).\n2. Hẹn gặp lại nhé (じゃ、また).\n3. Tôi đã về rồi đây (chào khi bước về đến nhà).",
        "pdfPage": 21
    },
    82: {
        "mondai": 3,
        "section": "LISTENING",
        "localNum": 4,
        "opt": 3,
        "snippet": "Choukai M3-4: 郵便局で切手を買います。なんと言いますか",
        "meaning": "Ở bưu điện, bạn muốn mua tem thì nói câu nào với nhân viên?",
        "analysis": "• Khi mua hàng hoặc yêu cầu món đồ tại quầy phục vụ, mẫu câu chuẩn là: [Tên đồ vật] + をください (Làm ơn cho tôi lấy cái này).\n• Ở bưu điện mua tem: 「切手をください」 (Làm ơn bán cho tôi con tem / Cho tôi xin tem).\n• Phương án 3 là mẫu câu mua hàng chuẩn mực -> Đáp án đúng là phương án [3].",
        "options": [
            "- 1. 切手をかいませんか (Bạn mua tem với tôi không? - Lời rủ rê sai ngữ cảnh)",
            "- 2. 切手をどうぞ (Xin mời bạn lấy tem - Lời người bán nói với khách)",
            "- 3. 切手をください (Làm ơn bán cho tôi con tem): (ĐÚNG)"
        ],
        "audioJa": "【音声テキスト】\n郵便局で切手を買います。なんと言いますか。\n1. 切手をかいませんか。\n2. 切手をどうぞ。\n3. 切手をください。",
        "audioVi": "【Bản dịch Script】\nỞ bưu điện, bạn muốn mua tem. Bạn sẽ nói câu gì với nhân viên?\n1. Bạn có mua tem không?\n2. Xin mời bạn lấy tem.\n3. Làm ơn cho tôi mua con tem (切手をください).",
        "pdfPage": 21
    },
    83: {
        "mondai": 3,
        "section": "LISTENING",
        "localNum": 5,
        "opt": 2,
        "snippet": "Choukai M3-5: 友達は鉛筆がありません。友達になんと言いますか",
        "meaning": "Bạn của bạn không có bút chì. Bạn muốn cho bạn mượn dùng thì nói câu nào?",
        "analysis": "• Tình huống: Thấy bạn mình không có bút chì để viết, mình có sẵn bút chì và muốn đưa cho bạn dùng thì sẽ ngỏ ý: 「えんぴつ、使いますか」 (Bạn có dùng bút chì của tôi không? / Tôi đưa bạn dùng nhé).\n• Câu 1 「えんぴつ、借りましょうか」 là 'Tôi mượn bút chì của bạn nhé' (bạn không có thì sao mượn được). Câu 3 「えんぴつ、かしてください」 là 'Hãy cho tôi mượn bút chì' (sai chủ ngữ).\n• Phương án 2 là câu ngỏ ý chuẩn xác nhất -> Đáp án đúng là phương án [2].",
        "options": [
            "- 1. えんぴつ、借りましょうか (Tôi mượn bút của bạn nhé - Bạn làm gì có bút mà mượn)",
            "- 2. えんぴつ、使いますか (Cậu có dùng bút chì của tớ không? - Đưa cho bạn mượn): (ĐÚNG)",
            "- 3. えんぴつ、かしてください (Cậu hãy cho tớ mượn bút chì đi - Sai ngữ cảnh)"
        ],
        "audioJa": "【音声テキスト】\n友達は鉛筆がありません。友達になんと言いますか。\n1. えんぴつ、借りましょうか。\n2. えんぴつ、使いますか。\n3. えんぴつ、かしてください。",
        "audioVi": "【Bản dịch Script】\nBạn của bạn không có bút chì. Bạn muốn đưa bút cho bạn dùng thì nói câu gì?\n1. Tớ mượn bút của cậu nhé?\n2. Cậu có dùng bút chì không, tớ đưa cậu dùng? (えんぴつ、使いますか).\n3. Hãy cho tớ mượn bút chì của cậu đi.",
        "pdfPage": 21
    },

    # ==================== MONDAI 4 (84..89) ====================
    84: {
        "mondai": 4,
        "section": "LISTENING",
        "localNum": 1,
        "opt": 1,
        "snippet": "Choukai M4-1: 今日は何日ですか",
        "meaning": "Hôm nay là ngày mùng mấy?",
        "analysis": "• Câu hỏi hỏi về ngày trong tháng: 「何日 (なんにち) ですか」: Câu trả lời tương thích phải nêu ngày trong tháng: 「三日 (みっか) です」 (Hôm nay là ngày mùng 3).\n• Lựa chọn 2 「三週間 (さんしゅうかん)」 là 3 tuần lễ (khoảng thời gian). Lựa chọn 3 「3時」 là 3 giờ đúng (giờ giấc).\n• Phương án 1 chuẩn xác -> Đáp án đúng là phương án [1].",
        "options": [
            "- 1. 三日です (Hôm nay là ngày mùng 3): (ĐÚNG)",
            "- 2. 三週間です (Là 3 tuần lễ - hỏi về khoảng thời gian)",
            "- 3. 3時です (Bây giờ là 3 giờ đúng - hỏi về giờ giấc)"
        ],
        "audioJa": "【音声テキスト】\n今日は何日ですか。\n1. 三日です。\n2. 三週間です。\n3. 3時です。",
        "audioVi": "【Bản dịch Script】\nHôm nay là ngày mùng mấy?\n1. Là ngày mùng 3 (三日です).\n2. Là 3 tuần lễ.\n3. Là 3 giờ đúng.",
        "pdfPage": 21
    },
    85: {
        "mondai": 4,
        "section": "LISTENING",
        "localNum": 2,
        "opt": 1,
        "snippet": "Choukai M4-2: すみません。図書館はどこですか",
        "meaning": "Xin lỗi, thư viện nằm ở vị trí nào vậy ạ?",
        "analysis": "• Câu hỏi hỏi về vị trí địa điểm 「どこですか」: Câu trả lời tương thích phải chỉ phương hướng vị trí: 「あそこです」 (Ở đằng kia kìa ạ).\n• Lựa chọn 2 nói về giờ đóng cửa (6時までです). Lựa chọn 3 nói về hành động mượn sách (本を借ります).\n• Phương án 1 chuẩn xác -> Đáp án đúng là phương án [1].",
        "options": [
            "- 1. あそこです (Thư viện ở đằng kia kìa ạ): (ĐÚNG)",
            "- 2. 6時までです (Mở cửa đến 6 giờ - trả lời cho 何時まで)",
            "- 3. 本を借ります (Tôi mượn sách - trả lời cho 何をしますか)"
        ],
        "audioJa": "【音声テキスト】\nすみません。図書館はどこですか。\n1. あそこです。\n2. 6時までです。\n3. 本を借ります。",
        "audioVi": "【Bản dịch Script】\nXin lỗi, thư viện nằm ở đâu vậy ạ?\n1. Ở đằng kia kìa (あそこです).\n2. Mở cửa đến 6 giờ.\n3. Tôi mượn sách.",
        "pdfPage": 21
    },
    86: {
        "mondai": 4,
        "section": "LISTENING",
        "localNum": 3,
        "opt": 2,
        "snippet": "Choukai M4-3: 明日、何時に学校にきますか",
        "meaning": "Ngày mai bạn sẽ đến trường học vào lúc mấy giờ?",
        "analysis": "• Câu hỏi hỏi về mốc thời gian 「何時に (mấy giờ)」: Câu trả lời tương thích phải nêu mốc giờ cụ thể: 「9時半です」 (Tôi đến lúc 9 giờ rưỡi).\n• Lựa chọn 1 nêu phương tiện xe bus (バスできます). Lựa chọn 3 là người lớn (大人です).\n• Phương án 2 chuẩn xác -> Đáp án đúng là phương án [2].",
        "options": [
            "- 1. バスできます (Tôi đi bằng xe buýt - trả lời cho 何で)",
            "- 2. 9時半です (Tôi đến lúc 9 giờ rưỡi): (ĐÚNG)",
            "- 3. 大人です (Là người lớn - không liên quan)"
        ],
        "audioJa": "【音声テキスト】\n明日、何時に学校にきますか。\n1. バスできます。\n2. 9時半です。\n3. 大人です。",
        "audioVi": "【Bản dịch Script】\nNgày mai mấy giờ bạn sẽ đến trường?\n1. Tôi đi bằng xe buýt.\n2. Lúc 9 giờ rưỡi (9時半です).\n3. Là người lớn.",
        "pdfPage": 21
    },
    87: {
        "mondai": 4,
        "section": "LISTENING",
        "localNum": 4,
        "opt": 3,
        "snippet": "Choukai M4-4: 田中さん、その荷物を持ちましょうか",
        "meaning": "Anh Tanaka ơi, để tôi xách giúp anh chỗ hành lý đó nhé?",
        "analysis": "• Người nói đưa ra lời đề nghị giúp đỡ lịch sự 「V-ましょうか (Để tôi giúp bạn nhé)」: Khi được người khác ngỏ lời giúp đỡ xách đồ, câu đáp lại lịch sự và đúng chuẩn mực là cảm ơn: 「ありがとうございます」 (Cảm ơn bạn nhiều nhé).\n• Lựa chọn 1 「どういたしまして」 là Không có gì (đáp lại lời cảm ơn). Lựa chọn 2 「持ちませんでした」 là Tôi đã không xách (sai ngữ nghĩa).\n• Phương án 3 chuẩn xác -> Đáp án đúng là phương án [3].",
        "options": [
            "- 1. どういたしまして (Không có chi - đáp lại lời cảm ơn)",
            "- 2. 持ちませんでした (Tôi đã không xách đồ - sai ngữ nghĩa)",
            "- 3. ありがとうございます (Cảm ơn bạn rất nhiều vì đã ngỏ lời giúp): (ĐÚNG)"
        ],
        "audioJa": "【音声テキスト】\n田中さん、その荷物を持ちましょうか。\n1. どういたしまして。\n2. 持ちませんでした。\n3. ありがとうございます。",
        "audioVi": "【Bản dịch Script】\nAnh Tanaka ơi, để tôi xách giúp anh túi hành lý đó nhé?\n1. Không có chi.\n2. Tôi đã không xách.\n3. Cảm ơn bạn rất nhiều (ありがとうございます).",
        "pdfPage": 21
    },
    88: {
        "mondai": 4,
        "section": "LISTENING",
        "localNum": 5,
        "opt": 3,
        "snippet": "Choukai M4-5: ちょっと休みませんか",
        "meaning": "Chúng mình cùng nghỉ giải lao một lát không?",
        "analysis": "• Lời rủ rê đề xuất 「～ませんか」: Câu đồng ý hưởng ứng lời rủ rê là 「そうしましょう」 (Ừ, chúng ta cùng làm thế nhé / Nghỉ một chút nhé).\n• Lựa chọn 1 「日曜日です」 là Hôm nay là Chủ nhật. Lựa chọn 2 「お元気ですか」 là Bạn có khỏe không.\n• Phương án 3 chuẩn xác -> Đáp án đúng là phương án [3].",
        "options": [
            "- 1. 日曜日です (Là ngày Chủ nhật - không liên quan)",
            "- 2. お元気ですか (Bạn có khỏe không? - lời chào hỏi)",
            "- 3. そうしましょう (Ừ, chúng ta cùng nghỉ một lát nhé): (ĐÚNG)"
        ],
        "audioJa": "【音声テキスト】\nちょっと休みませんか。\n1. 日曜日です。\n2. お元気ですか。\n3. そうしましょう。",
        "audioVi": "【Bản dịch Script】\nChúng mình nghỉ giải lao một lát nhé?\n1. Là ngày Chủ nhật.\n2. Bạn có khỏe không?\n3. Ừ, nghỉ một lát đi (そうしましょう).",
        "pdfPage": 21
    },
    89: {
        "mondai": 4,
        "section": "LISTENING",
        "localNum": 6,
        "opt": 1,
        "snippet": "Choukai M4-6: それはなんの本ですか",
        "meaning": "Đó là cuốn sách về chủ đề gì vậy bạn?",
        "analysis": "• Hỏi về nội dung hoặc thể loại của cuốn sách 「なんの本ですか」: Câu trả lời tương thích phải nêu chủ đề nội dung cuốn sách: 「料理の本です」 (Đó là cuốn sách dạy nấu ăn).\n• Lựa chọn 2 「私の本です」 nêu quyền sở hữu (trả lời cho だれの本). Lựa chọn 3 「はい、そうです」 là câu trả lời Yes/No (không dùng cho câu hỏi từ để hỏi なん).\n• Phương án 1 chuẩn xác -> Đáp án đúng là phương án [1].",
        "options": [
            "- 1. 料理の本です (Đó là cuốn sách dạy nấu ăn): (ĐÚNG)",
            "- 2. 私の本です (Đó là cuốn sách của tôi - trả lời cho だれの本)",
            "- 3. はい、そうです (Vâng, đúng vậy - không trả lời cho câu hỏi có từ để hỏi なん)"
        ],
        "audioJa": "【音声テキスト】\nそれはなんの本ですか。\n1. 料理の本です。\n2. 私の本です。\n3. はい、そうです。",
        "audioVi": "【Bản dịch Script】\nĐó là cuốn sách về cái gì vậy?\n1. Là cuốn sách dạy nấu ăn (料理の本です).\n2. Là sách của tôi.\n3. Vâng, đúng vậy.",
        "pdfPage": 21
    }
}
