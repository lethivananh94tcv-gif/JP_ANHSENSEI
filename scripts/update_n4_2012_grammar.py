# -*- coding: utf-8 -*-
"""
Script to update JLPT N4 2012-12 Grammar & Reading questions (câu 1 đến câu 35, Global indices 35 đến 69)
Extracted directly from pages 18 to 21 of n4-2012-12.pdf.
"""

import json
import re

GRAMMAR_QUESTIONS = {
    35: {
        "localPdfNumber": 1,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "わたしの 父は 中国語も 英語（　）話せます。",
        "options": ["1. を", "2. で", "3. も", "4. が"],
        "correctOption": 3,
        "snippet": "中国語も 英語も (Cả... lẫn...)",
        "explanation": """🎯 Đáp án đúng: [3] も

💬 Dịch nghĩa câu:
"Bố của tôi vừa có thể nói được tiếng Trung, mà cả tiếng Anh cũng có thể nói được."

💡 Phân tích & Giải thích ngữ pháp:
• Cấu trúc sóng đôi đối ứng: 「Danh từ 1 + も + Danh từ 2 + も」 biểu thị "cả... lẫn... / ...cũng... mà... cũng...".
• Vế trước đã sử dụng 「中国語も」 (cả tiếng Trung), nên vế sau đi kèm để tạo sự tương đồng đối xứng bắt buộc dùng 「英語も」 (cả tiếng Anh).
• Cấu trúc 「～も～も話せます」 thể hiện khả năng nói được cả hai thứ tiếng.

🔍 Phân tích các lựa chọn:
- 1. を: Kém tự nhiên vì không tạo được cặp sóng đôi đối ứng 「～も～も」, hơn nữa với tha động từ khả năng 話せる thì trợ từ thông dụng thường là が hoặc も.
- 2. で: Trợ từ で chỉ phương tiện công cụ (ví dụ: 英語で話す - nói bằng tiếng Anh), không hợp ngữ cảnh làm tân ngữ bổ nghĩa khả năng ở đây.
- 3. も: ĐÚNG - Hoàn thiện cấu trúc đối ứng song song 「中国語も 英語も 話せます」 (nói được cả tiếng Trung lẫn tiếng Anh).
- 4. が: Đứng riêng thì hợp ngữ pháp (英語が話せます), tuy nhiên ở đây vế trước đã dùng 中国語も nên vế sau phải dùng も để tạo cấu trúc đối xứng.

📄 Trích PDF gốc (试题解析 Trang 18):
(1) 3 句意: 我父亲会说中文, 也会说英语。考察～も～も表示“两者都”的用法。"""
    },
    36: {
        "localPdfNumber": 2,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "これは わたしが 米（　）作った パンです。",
        "options": ["1. に", "2. の", "3. や", "4. で"],
        "correctOption": 4,
        "snippet": "米で作った (Làm bằng nguyên liệu gạo)",
        "explanation": """🎯 Đáp án đúng: [4] で

💬 Dịch nghĩa câu:
"Đây là chiếc bánh mì mà tôi đã làm bằng bột gạo."

💡 Phân tích & Giải thích ngữ pháp:
• Trợ từ 「で」 biểu thị chất liệu, nguyên liệu tạo tác nên đồ vật mà bằng mắt thường hoặc nhận thức cơ học người ta vẫn nhận biết được: 「Danh từ (nguyên liệu) + で 作る」 (làm bằng/từ chất liệu...).
• Ở đây, bánh mì được làm từ nguyên liệu chính là gạo: 「米で作ったパン」.

🔍 Phân tích các lựa chọn:
- 1. に: Trợ từ に chỉ đích đến, mục tiêu hoặc thời điểm, không biểu thị nguyên liệu chế tạo.
- 2. の: 米のパン chỉ mang nghĩa sở hữu hoặc bổ nghĩa, không đi kèm trực tiếp với động từ 作った để chỉ hành động làm bằng nguyên liệu.
- 3. や: Trợ từ nối các danh từ mang nghĩa liệt kê ("và/hoặc").
- 4. で: ĐÚNG - Chỉ phương tiện, chất liệu, nguyên liệu tạo nên sản phẩm (米で作った).

📄 Trích PDF gốc (试题解析 Trang 18):
(2) 4 句意: 这是我用米做的面包。考察で表示动作或作用的手段、方法、材料等的用法, 意为“用……做……”。"""
    },
    37: {
        "localPdfNumber": 3,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "男の子の 顔は 父親より 母親（　）にるという 話を聞いた。",
        "options": ["1. に", "2. へ", "3. も", "4. を"],
        "correctOption": 1,
        "snippet": "母親に似る (Giống người mẹ)",
        "explanation": """🎯 Đáp án đúng: [1] に

💬 Dịch nghĩa câu:
"Tôi nghe người ta bảo rằng khuôn mặt của bé trai thường giống mẹ hơn là giống bố."

💡 Phân tích & Giải thích ngữ pháp:
• Cấu trúc ngữ pháp cố định: 「A は B に 似る / 似ている」 mang ý nghĩa "A trông giống với B".
• Trợ từ 「に」 đánh dấu đối tượng chuẩn mực quy chiếu mà chủ thể mang nét tương đồng giống theo.
• Cụm kết hợp so sánh hơn kém: 「父親より 母親に 似る」 (so với bố thì giống mẹ hơn).

🔍 Phân tích các lựa chọn:
- 1. に: ĐÚNG - Hoàn thiện cấu trúc chuẩn mực 母親に似る (trông giống người mẹ).
- 2. へ: Chỉ phương hướng di chuyển trong không gian, sai.
- 3. も: Mang nghĩa "cũng", làm mất cấu trúc so sánh hơn kém より...に.
- 4. を: Chỉ đối tượng chịu tác động trực tiếp của ngoại động từ, trong khi 似る là tự động từ chỉ trạng thái tương đồng, không dùng を.

📄 Trích PDF gốc (试题解析 Trang 18):
(3) 1 句意: 听说男生的脸比起爸爸来更像妈妈。考察に表示比较、判断的基准的用法。"""
    },
    38: {
        "localPdfNumber": 4,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "妹は おしゃべりだ。静かなのは、食事の とき（　）だ。",
        "options": ["1. しか", "2. だけ", "3. は", "4. の"],
        "correctOption": 2,
        "snippet": "食事のときだけ (Chỉ duy nhất lúc ăn)",
        "explanation": """🎯 Đáp án đúng: [2] だけ

💬 Dịch nghĩa câu:
"Em gái tôi nói rất nhiều. Lúc nó chịu yên lặng chỉ có duy nhất khi ăn cơm mà thôi."

💡 Phân tích & Giải thích ngữ pháp:
• Trợ từ 「だけ」 biểu thị sự giới hạn duy nhất ("chỉ duy nhất..."), đi với vị ngữ khẳng định: 「～のときだけだ」 (chỉ duy nhất vào thời điểm...).
• Lưu ý phân biệt quan trọng: Cả 「だけ」 và 「しか」 đều biểu thị tính giới hạn, nhưng 「しか」 bắt buộc phải đi với đuôi phủ định (～しか...ない). Do câu kết thúc bằng đuôi khẳng định 「だ」 nên bắt buộc phải chọn 「だけ」.

🔍 Phân tích các lựa chọn:
- 1. しか: Sai quy tắc ngữ pháp vì しか luôn đi với thể phủ định ない, không thể đi với câu khẳng định kết thúc bằng だ.
- 2. だけ: ĐÚNG - Biểu thị giới hạn duy nhất ("chỉ mỗi lúc ăn cơm") và kết hợp hoàn hảo với khẳng định だ.
- 3. は: Trợ từ chủ đề, không thể hiện được tính hạn định duy nhất theo văn cảnh.
- 4. の: Tạo cụm vô nghĩa trong ngữ cảnh này.

📄 Trích PDF gốc (试题解析 Trang 18):
(4) 2 句意: 我的妹妹很爱说话, 只有吃饭的时候能安静一会儿。考察だけ表示“只、仅”的用法。だけ和しか都可表示限定, 但后者需与否定表达呼应使用, 故选择前者。"""
    },
    39: {
        "localPdfNumber": 5,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "A「誕生日に 田中さんから 何を もらったんですか。」 B「田中さん（　）腕時計を もらいました。」",
        "options": ["1. からが", "2. からに", "3. からで", "4. からは"],
        "correctOption": 4,
        "snippet": "田中さんからは (Từ anh Tanaka thì...)",
        "explanation": """🎯 Đáp án đúng: [4] からは

💬 Dịch nghĩa câu:
"A: 'Vào ngày sinh nhật, bạn đã nhận được món gì từ anh Tanaka thế?' - B: 'Từ anh Tanaka thì tôi đã nhận được một chiếc đồng hồ đeo tay.'"

💡 Phân tích & Giải thích ngữ pháp:
• Cấu trúc nhận đồ vật từ ai: 「～から / に もらう」 (nhận cái gì từ ai).
• Trợ từ kết hợp 「からは」: Trợ từ 「から」 chỉ nguồn gốc/người trao tặng, kết hợp cùng trợ từ 「は」 để đưa đối tượng "anh Tanaka" lên làm chủ đề nhấn mạnh nhằm hồi đáp trực tiếp cho câu hỏi của người A (田中さんから).

🔍 Phân tích các lựa chọn:
- 1. からが: Không có kết hợp trợ từ này.
- 2. からに: Không có kết hợp trợ từ này trong ngữ cảnh.
- 3. からで: Không có kết hợp trợ từ này.
- 4. からは: ĐÚNG - Từ anh Tanaka thì... (đối ứng và nhấn mạnh chủ đề tương thích với câu hỏi 田中さんから).

📄 Trích PDF gốc (试题解析 Trang 18):
(5) 4 句意: A: “你生日的时候, 田中送了你什么?” B: “田中送了我手表。” 考察から/に表示授予者的用法, 后面的起强调作用。"""
    },
    40: {
        "localPdfNumber": 6,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "(会社で) A「すみません、山田さんは どこですか。」 B「山田さんは 会議中ですが、会議は 11 時半（　）終わると 思いますよ。」",
        "options": ["1. までは", "2. までには", "3. までも", "4. までにも"],
        "correctOption": 2,
        "snippet": "11時半までには (Muộn nhất trước 11h30)",
        "explanation": """🎯 Đáp án đúng: [2] までには

💬 Dịch nghĩa câu:
"(Ở công ty) A: 'Xin lỗi, anh Yamada đang ở đâu thế ạ?' - B: 'Anh Yamada đang họp, nhưng tôi nghĩ cuộc họp muộn nhất là trước 11 giờ rưỡi sẽ kết thúc đấy.'"

💡 Phân tích & Giải thích ngữ pháp:
• Cấu trúc chỉ hạn chót: 「Thời gian + までに」 (trước thời điểm / muộn nhất vào lúc...).
• Động từ 「終わる」 (kết thúc) là động từ chỉ khoảnh khắc hoàn thành, diễn ra trước một mốc thời gian, do đó bắt buộc dùng 「までに」.
• Trợ từ 「は」 gắn thêm sau までに (「までには」) đóng vai trò nhấn mạnh hạn mức thời gian "chậm nhất là trước 11 giờ 30".

🔍 Phân tích các lựa chọn:
- 1. までは: Trợ từ まで chỉ sự kéo dài liên tục suốt tới thời điểm đó (ví dụ: 11時まで待つ - đợi tới 11 giờ), không đi với động từ khoảnh khắc kết thúc 終わる.
- 2. までには: ĐÚNG - Chỉ hạn chót hoàn tất trước thời điểm 11h30, có は nhấn mạnh.
- 3. までも: Mang nghĩa "cho đến tận cả...", hoàn toàn sai ý nghĩa.
- 4. までにも: Sai kết hợp trợ từ.

📄 Trích PDF gốc (试题解析 Trang 19):
(6) 2 句意: (公司中) A: “不好意思, 请问山田先生在哪里?” B: “山田先生正在开会, 估计会议 11 点半结束。” 考察には表示“在……时间”的用法, 后面的起强调作用。"""
    },
    41: {
        "localPdfNumber": 7,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "学生「先生、この 言葉は (　) 意味ですか。」 先生「『やさしい』と いう 意味です。」",
        "options": ["1. どうやって", "2. どのぐらい", "3. どういう", "4. どう"],
        "correctOption": 3,
        "snippet": "どういう意味ですか (Có nghĩa như thế nào?)",
        "explanation": """🎯 Đáp án đúng: [3] どういう

💬 Dịch nghĩa câu:
"Học sinh: 'Thưa thầy, từ vựng này mang ý nghĩa như thế nào ạ?' - Thầy giáo: 'Nó có nghĩa là \"dễ dàng / hiền từ\" đấy em.'"

💡 Phân tích & Giải thích ngữ pháp:
• Cụm từ định từ nghi vấn: 「どういう + Danh từ」 mang ý nghĩa "mang tính chất gì / có nghĩa như thế nào".
• Đi trước danh từ 意味 (ý nghĩa) để hỏi giải nghĩa từ ngữ, ta luôn dùng mẫu câu chuẩn mực: 「どういう意味ですか」.

🔍 Phân tích các lựa chọn:
- 1. どうやって: Bằng cách nào / làm thế nào (hỏi phương thức, thao tác), không bổ nghĩa trực tiếp cho danh từ 意味.
- 2. どのぐらい: Khoảng bao nhiêu (hỏi số lượng, thời lượng, mức độ).
- 3. どういう: ĐÚNG - Bổ nghĩa cho danh từ 意味 tạo thành cụm どういう意味 (nghĩa là như thế nào).
- 4. どう: Thế nào (phó từ/vị ngữ, không đứng trực tiếp bổ nghĩa trước danh từ mà phải là どういう hoặc どんな).

📄 Trích PDF gốc (试题解析 Trang 19):
(7) 3 句意: 学生: “老师, 这个单词是什么意思?” 老师: “意思是‘亲切’。” 1. どうやって: 怎样(地) 2. どのぐらい: 多少 3. どういう: 怎样的 4. どう: 如何"""
    },
    42: {
        "localPdfNumber": 8,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "チャン「古川さん、この じゅぎょうの レポート、おわりましたか。」 古川「はい、一週間 かかりましたが、きのうの 夜、(　) 終わりました。」",
        "options": ["1. やっと", "2. ずっと", "3. もっと", "4. きっと"],
        "correctOption": 1,
        "snippet": "やっと終わりました (Cuối cùng cũng xong)",
        "explanation": """🎯 Đáp án đúng: [1] やっと

💬 Dịch nghĩa câu:
"Trương: 'Anh Furukawa ơi, bài báo cáo của môn học này anh đã làm xong chưa?' - Furukawa: 'Vâng, đã mất cả một tuần trời, nhưng tối hôm qua cuối cùng thì tôi cũng hoàn thành xong rồi.'"

💡 Phân tích & Giải thích ngữ pháp:
• Phó từ 「やっと」 mang nghĩa "cuối cùng thì cũng... / rốt cuộc cũng...": diễn tả một kết quả mong đợi đạt được sau khi đã trải qua một khoảng thời gian dài, nhiều công sức hoặc vượt qua khó khăn vất vả (一週間かかりましたが...やっと終わりました).

🔍 Phân tích các lựa chọn:
- 1. やっと: ĐÚNG - Cuối cùng cũng (hoàn thành sau 1 tuần cố gắng).
- 2. ずっと: Suốt, liên tục, hoặc hơn hẳn (chỉ sự liên tục không ngắt quãng hoặc so sánh chênh lệch lớn).
- 3. もっと: Hơn nữa, thêm nữa (chỉ mức độ gia tăng).
- 4. きっと: Chắc chắn (phó từ dùng trong câu phỏng đoán, dự đoán ở tương lai, không dùng cho sự việc đã hoàn tất trong quá khứ).

📄 Trích PDF gốc (试题解析 Trang 19):
(8) 1 句意: 小张: “古川, 这门课的报告你完成了吗?” 古川: “嗯, 花了一周时间, 昨天晚上终于完成了。” 1. やっと: 好不容易, 终于 2. ずっと: 一直, 始终 3. もっと: 更, 更加 4. きっと: 一定"""
    },
    43: {
        "localPdfNumber": 9,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "A「あした いっしょに ドライブに 行きませんか。」 B「(　)、ごめんなさい、あしたは アルバイトが あるんです。」",
        "options": ["1. 行きたいから", "2. 行きたいけれど", "3. 行きたいし", "4. 行きたくて"],
        "correctOption": 2,
        "snippet": "行きたいけれど (Muốn đi nhưng mà...)",
        "explanation": """🎯 Đáp án đúng: [2] 行きたいけれど

💬 Dịch nghĩa câu:
"A: 'Ngày mai bạn có muốn cùng đi lái xe dạo mát với mình không?' - B: 'Mình rất muốn đi nhưng mà xin lỗi nhé, ngày mai mình có ca làm thêm mất rồi.'"

💡 Phân tích & Giải thích ngữ pháp:
• Trợ từ liên kết nghịch đối 「けれど」: mang nghĩa "nhưng, tuy nhiên", dùng để đưa ra lời nói đệm từ chối khéo léo một lời rủ rê ("tôi muốn đi NHƯNG xin lỗi vì bận...").
• Cụm từ 「行きたいけれど、ごめんなさい」 thể hiện thái độ tiếc nuối và lịch sự khi không thể nhận lời mời.

🔍 Phân tích các lựa chọn:
- 1. 行きたいから: "Vì muốn đi..." (chỉ lý do, mâu thuẫn hoàn toàn với lời từ chối xin lỗi ở vế sau).
- 2. 行きたいけれど: ĐÚNG - "Rất muốn đi nhưng mà..." thể hiện sự tiếc nuối khi từ chối lời mời.
- 3. 行きたいし: "Vừa muốn đi và lại còn..." (chỉ sự liệt kê lý do tương đồng).
- 4. 行きたくて: Dạng て nối tiếp chỉ nguyên nhân - kết quả.

📄 Trích PDF gốc (试题解析 Trang 19):
(9) 2 句意: A: “明天一起去兜风吗?” B: “我也想去, 不过不好意思, 我明天要去打工。” 1. から: 表示原因 2. けれど: 表示逆接 3. し: 表示因果或并列 4. て: 表示并列或轻微理由"""
    },
    44: {
        "localPdfNumber": 10,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "子ども「ねえ、ゲームを しても いい？」 母親「しゅくだいを (　) あとでね。」",
        "options": ["1. していた", "2. している", "3. する", "4. した"],
        "correctOption": 4,
        "snippet": "したあとで (Sau khi đã làm xong)",
        "explanation": """🎯 Đáp án đúng: [4] した

💬 Dịch nghĩa câu:
"Đứa con: 'Mẹ ơi, con chơi trò chơi điện tử có được không?' - Người mẹ: 'Phải sau khi làm xong bài tập về nhà đã nhé.'"

💡 Phân tích & Giải thích ngữ pháp:
• Cấu trúc ngữ pháp chỉ trình tự thời gian: 「Động từ thể た + あとで」 biểu thị "sau khi đã làm xong hành động A thì mới làm hành động B".
• Vì hành động làm bài tập phải được hoàn thành trước khi chơi game nên động từ 「する」 phải chia ở thể quá khứ/hoàn tất là 「した」: 「しゅくだいをしたあとで」.

🔍 Phân tích các lựa chọn:
- 1. していた: Thể quá khứ tiếp diễn, không kết hợp với あとで.
- 2. している: Thể hiện tại tiếp diễn, sai cấu trúc.
- 3. する: Thể từ điển (chỉ đi với まえに - trước khi làm gì, không đi với あとで).
- 4. した: ĐÚNG - Động từ thể た + あとで (sau khi đã làm xong bài tập).

📄 Trích PDF gốc (试题解析 Trang 19):
(10) 4 句意: 孩子: “那个, 我可以玩游戏吗?” 母亲: “做完作业才能玩。” 考察句型～あと前接动词た形, 表示“……之后”的用法。"""
    },
    45: {
        "localPdfNumber": 11,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "この すいかは (　) すぎて、れいぞうこに 入らない。",
        "options": ["1. 大き", "2. 大きい", "3. 大きく", "4. 大きくて"],
        "correctOption": 1,
        "snippet": "大きすぎて (Quá to)",
        "explanation": """🎯 Đáp án đúng: [1] 大き

💬 Dịch nghĩa câu:
"Quả dưa hấu này to quá mức, không thể nào nhét vừa vào trong tủ lạnh được."

💡 Phân tích & Giải thích ngữ pháp:
• Cấu trúc biểu thị mức độ thái quá, vượt quá giới hạn: 「Tính từ đuôi い (bỏ い) + すぎる」 (quá... / quá mức...).
• Tính từ đuôi い 「大きい」 khi kết hợp với ～すぎる phải bỏ đuôi 「い」, chỉ giữ lại thân từ là 「大き」 -> 「大きすぎる / 大きすぎて」.

🔍 Phân tích các lựa chọn:
- 1. 大き: ĐÚNG - Thân từ của tính từ đuôi い bỏ い kết hợp chuẩn mực với すぎて.
- 2. 大きい: Chưa bỏ đuôi い, sai quy tắc ngữ pháp.
- 3. 大きく: Dạng phó từ (dùng khi đi với động từ hoặc なる), không đi với すぎて.
- 4. 大きくて: Thể て của tính từ, dùng để nối câu, không đi với すぎて.

📄 Trích PDF gốc (试题解析 Trang 19):
(11) 1 句意: 这个西瓜太大了, 没法放进冰箱里。考察句型～すぎる表示“太……, 过于……”的用法, 接形容词时接其词干后。"""
    },
    46: {
        "localPdfNumber": 12,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "A「誕生日 おめでとうございます。これ、プレゼントです。どうぞ。」 B「ありがとうございます。大切に (　)。」",
        "options": ["1. します", "2. います", "3. なります", "4. あります"],
        "correctOption": 1,
        "snippet": "大切にします (Tôi sẽ trân trọng)",
        "explanation": """🎯 Đáp án đúng: [1] します

💬 Dịch nghĩa câu:
"A: 'Chúc mừng sinh nhật bạn nhé! Đây là món quà dành tặng bạn, xin mời bạn nhận lấy.' - B: 'Cảm ơn bạn rất nhiều! Tôi sẽ luôn nâng niu và trân trọng giữ gìn nó cẩn thận.'"

💡 Phân tích & Giải thích ngữ pháp:
• Quán ngữ cố định trong tiếng Nhật: 「大切にする / 大切にします」 mang nghĩa "trân trọng, quý trọng, gìn giữ nâng niu đồ vật/tình cảm".
• Tính từ đuôi な 「大切」 biến đổi sang phó từ đi với động từ する thành cụm cố định 「大切にする」.

🔍 Phân tích các lựa chọn:
- 1. します: ĐÚNG - Hoàn thiện quán ngữ 大切にします (tôi sẽ luôn trân trọng giữ gìn).
- 2. います: Không kết hợp với 大切に theo ngữ cảnh này.
- 3. なります: 大切になります mang nghĩa "trở nên quan trọng", không thể hiện ý chí gìn giữ của người nhận quà.
- 4. あります: Sai ngữ nghĩa và ngữ pháp.

📄 Trích PDF gốc (试题解析 Trang 19):
(12) 1 句意: A: “生日快乐。这是给你的礼物, 请收下。” B: “谢谢, 我会好好对待的。” 考察大切にする表示会珍惜某物的用法, 多表对物品、事物的珍惜。"""
    },
    47: {
        "localPdfNumber": 13,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "A「きのうは ひっこしを (　)、どうも ありがとうございました。」 B「いいえ。どういたしまして。」",
        "options": ["1. 手伝って", "2. 手伝ったので", "3. 手伝って くれて", "4. 手伝ったから"],
        "correctOption": 3,
        "snippet": "手伝ってくれて (Cảm ơn vì đã giúp đỡ)",
        "explanation": """🎯 Đáp án đúng: [3] 手伝って くれて

💬 Dịch nghĩa câu:
"A: 'Hôm qua cảm ơn bạn rất nhiều vì đã nhiệt tình giúp đỡ mình chuyển nhà nhé!' - B: 'Không có chi đâu, đừng bận tâm.'"

💡 Phân tích & Giải thích ngữ pháp:
• Mẫu câu cảm ơn sâu sắc vì người khác đã làm việc gì mang lại lợi ích cho mình: 「Động từ thể て + くれて ありがとう (ございました)」.
• Động từ cho nhận 「くれる」 thể hiện hành động hướng về phía người nói (đối phương làm ơn giúp tôi). Vì vậy để cảm tạ sự giúp đỡ chuyển nhà, bắt buộc phải dùng 「手伝ってくれて」.

🔍 Phân tích các lựa chọn:
- 1. 手伝って: Thiếu trợ động từ cho nhận くれて, không tạo nên mẫu câu cảm ơn chuẩn mực.
- 2. 手伝ったので: Không kết hợp trực tiếp với どうもありがとうございました theo cách tự nhiên.
- 3. 手伝って くれて: ĐÚNG - Cấu trúc chuẩn mực biểu đạt lòng biết ơn: ～てくれてありがとうございました.
- 4. 手伝ったから: Sai phong cách giao tiếp khi cảm ơn đối phương.

📄 Trích PDF gốc (试题解析 Trang 19):
(13) 3 句意: A: “谢谢你昨天帮我搬家。” B: “不用客气。” 考察授受动词, A对B帮忙搬家表示感谢, 此处主语是授与者, 接受者一定是“我”, 应使用てくれる表示他人为我(方)做某事。"""
    },
    48: {
        "localPdfNumber": 14,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "今日、わたしは えんぴつと 消しゴムを 忘れたので、となりの 人に 貸して (　)。",
        "options": ["1. やりました", "2. あげました", "3. くれました", "4. もらいました"],
        "correctOption": 4,
        "snippet": "貸してもらいました (Được người bên cạnh cho mượn)",
        "explanation": """🎯 Đáp án đúng: [4] もらいました

💬 Dịch nghĩa câu:
"Hôm nay tôi để quên bút chì và cục tẩy ở nhà, nên tôi đã nhờ và được người ngồi bên cạnh cho mượn."

💡 Phân tích & Giải thích ngữ pháp:
• Cấu trúc động từ cho nhận với chủ ngữ "tôi": 「(わたしは) Người trao tặng + に + V-て + もらう」 (tôi nhận được hành vi giúp đỡ từ ai / được ai đó làm giúp).
• Trong câu có trợ từ 「となりの人に」: trợ từ 「に」 đánh dấu người trao tặng hành động, chủ ngữ là 「わたしは」 -> bắt buộc chọn 「もらいました」 (貸してもらいました).
• Nếu dùng くれました thì người cho mượn phải đi với trợ từ が (となりの人が貸してくれました).

🔍 Phân tích các lựa chọn:
- 1. やりました: Tôi làm gì cho người dưới hoặc động vật, hoàn toàn sai.
- 2. あげました: Tôi làm gì cho người khác, trái ngược hoàn toàn tình huống bản thân quên đồ đi mượn.
- 3. くれました: Chỉ đi với chủ ngữ là となりの人が (người cạnh tôi cho tôi mượn), không đi với trợ từ となりの人に.
- 4. もらいました: ĐÚNG - Phù hợp 100% với cấu trúc となりの人に貸してもらいました (tôi được người ngồi bên cạnh cho mượn).

📄 Trích PDF gốc (试题解析 Trang 19):
(14) 4 句意: 我今天忘带铅笔和橡皮了, 所以旁边的人借给我用了。考察授受动词, “我”没有带东西, 旁边的人借给了“我”, 对方是授予者, 我是接受者。句中用に提示授予者, 可推测应用もらう表示从他方获得的意思。"""
    },
    49: {
        "localPdfNumber": 15,
        "mondai": 1,
        "sectionType": "GRAMMAR",
        "text": "わたしの 本だなには (　) 読んで いない まんがが たくさん あります。",
        "options": ["1. 買うあいだ", "2. 買ったまま", "3. 買いそうで", "4. 買っている"],
        "correctOption": 2,
        "snippet": "買ったまま (Mua về cứ để nguyên đấy)",
        "explanation": """🎯 Đáp án đúng: [2] 買ったまま

💬 Dịch nghĩa câu:
"Trên giá sách của tôi có rất nhiều cuốn truyện tranh mua về rồi cứ để nguyên đấy mãi mà chưa hề đọc tới."

💡 Phân tích & Giải thích ngữ pháp:
• Mẫu ngữ pháp: 「Động từ thể た + まま」 diễn tả trạng thái của sự việc sau khi xảy ra được giữ nguyên không thay đổi ("cứ để nguyên như thế...").
• Cụm 「買ったまま読んでいない」: mua về rồi cứ để nguyên tình trạng đó mà chẳng chịu đọc.

🔍 Phân tích các lựa chọn:
- 1. 買うあいだ: Trong khoảng thời gian mua, không hợp ngữ nghĩa.
- 2. 買ったまま: ĐÚNG - ～たまま diễn tả trạng thái giữ nguyên từ khi mua về mà chưa đọc.
- 3. 買いそうで: Trông có vẻ sẽ mua, sai ý nghĩa.
- 4. 買っている: Đang mua, không hợp với thực tế truyện đang nằm trên giá sách.

📄 Trích PDF gốc (试题解析 Trang 19):
(15) 2 句意: 我的书架上有很多买回来就那么放着没读的书。考察句型～まま, 表示没有变化的方法, 前推动词时接其た形, 意为“就那样……”。"""
    },
    50: {
        "localPdfNumber": 16,
        "mondai": 2,
        "sectionType": "GRAMMAR",
        "text": "A「コンサートには もう 間に合わないですね。」\nB「今すぐ _____ _____ ★ _____ 行こう。」",
        "options": ["1. タクシーに", "2. タクシーで", "3. 間に合うかもしれないから", "4. 乗れば"],
        "correctOption": 3,
        "snippet": "Dấu sao ★: 間に合うかもしれないから (Vị trí 3)",
        "explanation": """🎯 Đáp án đúng: [3] 間に合うかもしれないから (Vị trí dấu sao ★ là vị trí số 3)

💬 Dịch nghĩa câu:
"A: 'Không còn kịp giờ buổi hòa nhạc nữa rồi nhỉ.' - B: 'Nếu bây giờ lên taxi ngay thì biết đâu có thể kịp giờ đấy, chúng ta đi taxi thôi!'"

💡 Phân tích & Giải thích trật tự câu:
• Đi taxi: タクシーに 乗る -> điều kiện giả định: [1 タクシーに] [4 乗れば].
• Lý do phỏng đoán: [3 間に合うかもしれないから] (vì biết đâu có thể kịp).
• Phương tiện di chuyển: [2 タクシーで] 行こう (chúng ta hãy đi bằng taxi).
• Trật tự hoàn chỉnh: 今すぐ [1 タクシーに] [4 乗れば] ★[3 間に合うかもしれないから] [2 タクシーで] 行こう。
• Vị trí dấu sao ★ là vị trí số 3, tương ứng với phương án [3].

📄 Trích PDF gốc (试题解析 Trang 19):
(16) 3 正确语序: 今すぐ 1 タクシーに 4 乗れば ★3 間に合うかもしれないから 2 タクシーで 行こう。(现在坐出租车的话说不定能赶上, 我们坐出租去吧。) ~ば 表示假定条件, 表示前项是后项成立的必要条件。"""
    },
    51: {
        "localPdfNumber": 17,
        "mondai": 2,
        "sectionType": "GRAMMAR",
        "text": "山田「田中さん、これから 食事でも どうですか。」\n田中「すみません。ちょうど _____ _____ ★ _____ です。」",
        "options": ["1. なん", "2. ところ", "3. 食べた", "4. 今"],
        "correctOption": 2,
        "snippet": "Dấu sao ★: ところ (Vị trí 3)",
        "explanation": """🎯 Đáp án đúng: [2] ところ (Vị trí dấu sao ★ là vị trí số 3)

💬 Dịch nghĩa câu:
"Yamada: 'Anh Tanaka ơi, lát nữa cùng đi dùng bữa nhé?' - Tanaka: 'Xin lỗi anh, đúng lúc tôi vừa mới ăn cơm xong mất rồi ạ.'"

💡 Phân tích & Giải thích trật tự câu:
• Phó từ thời gian: ちょうど [4 今] (đúng ngay lúc này).
• Cấu trúc vừa mới hoàn thành hành động: 「V-た + ところ」 -> [3 食べた] [2 ところ].
• Đi kèm phân từ giải thích nguyên do: [1 なん] です.
• Trật tự hoàn chỉnh: すみません。ちょうど [4 今] [3 食べた] ★[2 ところ] [1 なん] です。
• Vị trí dấu sao ★ là vị trí số 3, tương ứng với phương án [2].

📄 Trích PDF gốc (试题解析 Trang 19):
(17) 2 正确语序: すみません。ちょうど 4 今 3 食べた ★2 ところ 1 なん です。(不好意思, 我刚吃完。) ~たところ 前接表示动作的动词た形, 表示刚刚完成某动作。"""
    },
    52: {
        "localPdfNumber": 18,
        "mondai": 2,
        "sectionType": "GRAMMAR",
        "text": "A「あしたは 大事な おきゃくさまに 会うから、_____ _____ ★ _____ いけませんよ。」\nB「わかりました。あしたは 新しい くつを はいて 来ます。」",
        "options": ["1. くつ", "2. は", "3. そんな", "4. で"],
        "correctOption": 4,
        "snippet": "Dấu sao ★: で (Vị trí 3)",
        "explanation": """🎯 Đáp án đúng: [4] で (Vị trí dấu sao ★ là vị trí số 3)

💬 Dịch nghĩa câu:
"A: 'Ngày mai chúng ta sẽ gặp một vị khách quý quan trọng, nên mang đôi giày kiểu như thế kia là không được đâu đấy nhé.' - B: 'Tôi hiểu rồi. Ngày mai tôi sẽ đi đôi giày mới tới.'"

💡 Phân tích & Giải thích trật tự câu:
• Cụm từ định từ bổ nghĩa danh từ: [3 そんな] [1 くつ] (đôi giày kiểu như thế).
• Cấu trúc nhắc nhở cấm đoán: 「Danh từ + ではいけません」 -> [4 で] [2 は] いけませんよ.
• Trật tự hoàn chỉnh: あしたは 大事な おきゃくさまに 会うから、[3 そんな] [1 くつ] ★[4 で] [2 は] いけませんよ。
• Vị trí dấu sao ★ là vị trí số 3, tương ứng với phương án [4].

📄 Trích PDF gốc (试题解析 Trang 20):
(18) 4 正确语序: あしたは 大事な おきゃくさまに 会うから、3 そんな 1 くつ ★4 で 2 は いけませんよ。(明天要见一位重要客户, 不能穿这种鞋子去哦。) ~では 前接名词, 表示在……情况下。"""
    },
    53: {
        "localPdfNumber": 19,
        "mondai": 2,
        "sectionType": "GRAMMAR",
        "text": "今日は、風が _____ _____ ★ _____ 出かけたくない。",
        "options": ["1. し", "2. だから", "3. 寒そう", "4. 強い"],
        "correctOption": 3,
        "snippet": "Dấu sao ★: 寒そう (Vị trí 3)",
        "explanation": """🎯 Đáp án đúng: [3] 寒そう (Vị trí dấu sao ★ là vị trí số 3)

💬 Dịch nghĩa câu:
"Hôm nay gió vừa thổi mạnh, mà trời trông lại có vẻ lạnh nữa, nên tôi chẳng muốn bước chân ra ngoài chút nào."

💡 Phân tích & Giải thích trật tự câu:
• Liệt kê lý do song song thứ nhất: 風が [4 強い] [1 し] (gió thì thổi mạnh, hơn nữa...).
• Lý do thứ hai kèm liên từ chỉ nguyên nhân: [3 寒そう] [2 だから] (trông có vẻ lạnh nên...).
• Trật tự hoàn chỉnh: 今日は、風が [4 強い] [1 し] ★[3 寒そう] [2 だから] 出かけたくない。
• Vị trí dấu sao ★ là vị trí số 3, tương ứng với phương án [3].

📄 Trích PDF gốc (试题解析 Trang 20):
(19) 3 正确语序: 今日は、風が 4 強い 1 し ★3 寒そう 2 だから 出かけたくない。(今天风很大, 天气也很冷, 所以不想出门。) ~し 表示并列, 意为“而且……”。"""
    },
    54: {
        "localPdfNumber": 20,
        "mondai": 2,
        "sectionType": "GRAMMAR",
        "text": "田中「山田さん。東京の 大学に 行く ことを、もう ご両親に 話しましたか。」\n山田「いいえ。でも、もし 両親に _____ _____ ★ _____ つもりです。」",
        "options": ["1. 反対", "2. する", "3. 東京で 勉強", "4. されても"],
        "correctOption": 3,
        "snippet": "Dấu sao ★: 東京で 勉強 (Vị trí 3)",
        "explanation": """🎯 Đáp án đúng: [3] 東京で 勉強 (Vị trí dấu sao ★ là vị trí số 3)

💬 Dịch nghĩa câu:
"Tanaka: 'Anh Yamada ơi, chuyện lên đại học ở Tokyo thì anh đã thưa chuyện với bố mẹ chưa?' - Yamada: 'Chưa. Nhưng mà cho dù có bị bố mẹ phản đối đi chăng nữa, tôi vẫn dự định sẽ học tập tại Tokyo.'"

💡 Phân tích & Giải thích trật tự câu:
• Cụm bị động nhượng bộ: 両親に [1 反対] [4 されても] (cho dù có bị bố mẹ phản đối).
• Kế hoạch dự định: [3 東京で 勉強] [2 する] つもりです (vẫn dự định sẽ học tập ở Tokyo).
• Trật tự hoàn chỉnh: いいえ。でも、もし 両親に [1 反対] [4 されても] ★[3 東京で 勉強] [2 する] つもりです。
• Vị trí dấu sao ★ là vị trí số 3, tương ứng với phương án [3].

📄 Trích PDF gốc (试题解析 Trang 20):
(20) 3 正确语序: いいえ。でも、もし 両親に 1 反対 4 されても ★3 東京で 勉強 2 する つもりです。(还没有。但是即使父母反对, 我也打算去东京学习。) ~つもり 表示打算、准备, 前接动词的基本形。"""
    },
    55: {
        "localPdfNumber": 21,
        "mondai": 3,
        "sectionType": "GRAMMAR",
        "text": "わたしたちは ポチを 家の中で 21。",
        "options": ["1. かうでしょう", "2. かって います", "3. かって いますか", "4. かって いました"],
        "correctOption": 2,
        "snippet": "かって います (Đang nuôi dưỡng)",
        "explanation": """🎯 Đáp án đúng: [2] かって います

💬 Dịch nghĩa câu:
"Gia đình chúng tôi hiện đang nuôi chú cún Pochi ở trong nhà."

💡 Phân tích & Giải thích ngữ pháp:
• Mở đầu bài viết tác giả giới thiệu: 「わたしの 家には『ポチ』という 名前の 犬が います」 (nhà tôi có một chú chó tên Pochi).
• Chú chó được mang về cách đây 1 tháng và gia đình hiện vẫn đang tiếp tục nuôi dưỡng nó trong nhà ở hiện tại, biểu thị trạng thái duy trì liên tục -> dùng thể 「～ています」 (かっています).

🔍 Phân tích các lựa chọn:
- 1. かうでしょう: Có lẽ sẽ nuôi (phỏng đoán tương lai, sai thực tế đang nuôi).
- 2. かって います: ĐÚNG - Diễn tả trạng thái nuôi nấng liên tục ở hiện tại.
- 3. かって いますか: Câu hỏi nghi vấn, không phù hợp văn tự sự.
- 4. かって いました: Thể quá khứ (đã từng nuôi nhưng giờ không nuôi nữa), mâu thuẫn với câu mở đầu chú chó vẫn đang ở nhà.

📄 Trích PDF gốc (试题解析 Trang 20):
(21) 2 前文作者提到他家有一只叫“小白”的狗, 后文提到这条狗是爸爸送给他后, 他养在家的。根据文章首句的时态可知, 这条狗现在仍被作者养在家中, 此处需要用表示“动作正持续进行中”的ている体。"""
    },
    56: {
        "localPdfNumber": 22,
        "mondai": 3,
        "sectionType": "GRAMMAR",
        "text": "先週は 本当に こまりました。ポチが 父の けいたいでんわを 22 からです。",
        "options": ["1. こわした ところだ", "2. こわされて いる", "3. こわして しまった", "4. こわされた"],
        "correctOption": 3,
        "snippet": "こわして しまった (Đã lỡ cắn hỏng mất)",
        "explanation": """🎯 Đáp án đúng: [3] こわして しまった

💬 Dịch nghĩa câu:
"Tuần trước gia đình tôi thật sự đã gặp rắc rối lớn. Đó là vì chú cún Pochi đã lỡ cắn làm hỏng mất chiếc điện thoại di động của bố tôi."

💡 Phân tích & Giải thích ngữ pháp:
• Cấu trúc: 「V-て + しまう」 diễn tả một hành động đã lỡ xảy ra mang lại hậu quả đáng tiếc, không mong muốn ("lỡ làm hỏng mất").
• Chủ ngữ gây ra hành động là chú cún: 「ポチが 父のけいたいでんわを...」 (chủ ngữ chủ động có trợ từ tân ngữ を). Vì vậy động từ ở dạng chủ động hoàn thành việc đáng tiếc: 「こわしてしまった」.

🔍 Phân tích các lựa chọn:
- 1. こわした ところだ: Vừa mới làm hỏng xong tức thì, không khớp với mốc thời gian tuần trước (先週).
- 2. こわされて いる: Thể bị động tiếp diễn, sai cấu trúc.
- 3. こわして しまった: ĐÚNG - Thể hiện sự tiếc nuối khi chú chó đã lỡ cắn hỏng chiếc điện thoại.
- 4. こわされた: Thể bị động, không hợp với trợ từ を và chủ ngữ gây ra hành động ポチが.

📄 Trích PDF gốc (试题解析 Trang 20):
(22) 3 本句的句意为“小白把爸爸的手机弄坏了”, 句中用が提示动作的施动者, 故本句应使用主动语态。たところ表示偶然的契机; てしまう表示完了或某种不如意的结果, 此处应选用后者。"""
    },
    57: {
        "localPdfNumber": 23,
        "mondai": 3,
        "sectionType": "GRAMMAR",
        "text": "わたしは 兄弟が いないので、ずっと さびしかったです。しかし、ポチを かってからは、23。",
        "options": ["1. さびしく なります", "2. さびしく なくなりました", "3. さびしく なるかもしれません", "4. さびしく なくなったそうです"],
        "correctOption": 2,
        "snippet": "さびしく なくなりました (Đã không còn cô đơn nữa)",
        "explanation": """🎯 Đáp án đúng: [2] さびしく なくなりました

💬 Dịch nghĩa câu:
"Tôi vốn không có anh chị em nào nên trước đây luôn cảm thấy rất cô đơn. Tuy nhiên, kể từ sau khi nuôi chú cún Pochi thì tôi đã không còn cảm thấy buồn bã, cô đơn nữa."

💡 Phân tích & Giải thích ngữ pháp:
• Trước đó tác giả viết: 「ずっと さびしかったです」 (trước đây luôn buồn bã cô đơn).
• Liên từ chuyển ý đối lập: 「しかし、ポチを かってからは」 (Tuy nhiên, kể từ sau khi nuôi Pochi thì...).
• Trạng thái thay đổi sang không còn cô đơn: さびしい -> phủ định さびしくない -> biến đổi trạng thái trong quá khứ: 「さびしく なくなりました」 (đã không còn cô đơn nữa).

🔍 Phân tích các lựa chọn:
- 1. さびしく なります: Sẽ trở nên cô đơn, trái ngược hoàn toàn ý nghĩa mạch văn.
- 2. さびしく なくなりました: ĐÚNG - Thể hiện sự chuyển biến tích cực: đã không còn cảm thấy cô đơn nữa.
- 3. さびしく なるかもしれません: Có lẽ sẽ trở nên cô đơn, sai logic.
- 4. さびしく なくなったそうです: Nghe nói là không còn cô đơn (dùng truyền văn cho chính cảm xúc của bản thân người nói là sai ngữ dụng).

📄 Trích PDF gốc (试题解析 Trang 20):
(23) 2 前文中, 作者表示因为自己没有兄弟姐妹, 所以一直觉得很寂寞。后文用然而(しかし)表示转折, 可知想表达有了小狗后自己变得不再寂寞之意。用一般陈述语气即可。"""
    },
    58: {
        "localPdfNumber": 24,
        "mondai": 3,
        "sectionType": "GRAMMAR",
        "text": "ポチは わたしが 家を 出る とき、いつも げんかんまで 出て きます。24、元気が ない ときは、そばに 来て くれます。",
        "options": ["1. それに", "2. たとえば", "3. だから", "4. それなら"],
        "correctOption": 1,
        "snippet": "それに (Thêm vào đó, hơn nữa)",
        "explanation": """🎯 Đáp án đúng: [1] それに

💬 Dịch nghĩa câu:
"Mỗi khi tôi chuẩn bị ra khỏi nhà, Pochi luôn chạy ra tận bậc cửa hiên tiễn tôi. Thêm vào đó, những lúc tôi cảm thấy mệt mỏi buồn bã, nó lại đến ngồi sát bên cạnh an ủi tôi."

💡 Phân tích & Giải thích ngữ pháp:
• Liên từ bổ sung thông tin cùng chiều: 「それに」 mang nghĩa "thêm vào đó, hơn nữa, ngoài ra".
• Hai câu miêu tả hai hành vi tình cảm nối tiếp nhau của chú chó Pochi: câu trước là ra cửa tiễn tác giả, câu sau bổ sung thêm là những lúc ủ rũ thì đến bên cạnh an ủi -> mối quan hệ bổ sung tăng tiến, dùng 「それに」.

🔍 Phân tích các lựa chọn:
- 1. それに: ĐÚNG - Liên từ chỉ sự bổ sung, tăng tiến ("hơn nữa / thêm vào đó").
- 2. たとえば: Ví dụ như (dùng khi đưa ra một ví dụ cụ thể cho định nghĩa trước đó).
- 3. だから: Vì vậy, do đó (chỉ mối quan hệ nguyên nhân - kết quả).
- 4. それなら: Nếu thế thì (dùng để hồi đáp đưa ra gợi ý dựa trên lời đối phương).

📄 Trích PDF gốc (试题解析 Trang 20):
(24) 1 前文作者提到他们一直在一起, 他回家时小狗会来迎接, 后文提到他没精神时小狗也会来身边安慰他, 空处前后是小狗一直在陪伴作者的两个示例, 应为并列关系。 1. それに: 而且, 并且 2. たとえば: 例如 3. だから: 因此 4. それなら: 如果那样"""
    },
    59: {
        "localPdfNumber": 25,
        "mondai": 3,
        "sectionType": "GRAMMAR",
        "text": "ポチ 25 わたしたちの 大切な 家族の 一員です。",
        "options": ["1. が", "2. で", "3. を", "4. は"],
        "correctOption": 4,
        "snippet": "ポチは (Trợ từ chủ đề は)",
        "explanation": """🎯 Đáp án đúng: [4] は

💬 Dịch nghĩa câu:
"Chú cún Pochi chính là một thành viên gia đình quan trọng của chúng tôi."

💡 Phân tích & Giải thích ngữ pháp:
• Trợ từ nêu chủ đề bàn luận: 「は」.
• Câu đúc kết cuối bài nêu bật và khẳng định chủ đề bàn luận xuyên suốt bài viết: chú chó Pochi là một thành viên gia đình quan trọng (ポチは わたしたちの 大切な 家族の 一員です).

🔍 Phân tích các lựa chọn:
- 1. が: Trợ từ chủ ngữ nhấn mạnh chủ thể hành động hoặc phát hiện mới, không mang tính khái quát chủ đề kết bài như は.
- 2. で: Trợ từ chỉ phương tiện, địa điểm, trạng thái.
- 3. を: Trợ từ tân ngữ cho ngoại động từ, không dùng trong câu vị ngữ danh từ A は B です.
- 4. は: ĐÚNG - Xác lập Pochi làm chủ đề đúc kết của toàn bài văn: ポチは...

📄 Trích PDF gốc (试题解析 Trang 20):
(25) 4 作者通过这篇文章介绍了自家的小狗, 小狗“小白”是本篇文章的主题, 提示主题应选用は。"""
    },
    60: {
        "localPdfNumber": 26,
        "mondai": 4,
        "sectionType": "GRAMMAR",
        "text": "石川さんは、来週、何をすると言っていますか。",
        "options": [
            "1. アリさんに本を2冊返します。",
            "2. アリさんに本を3冊返します。",
            "3. アリさんに本を2冊貸します。",
            "4. アリさんに本を3冊貸します。"
        ],
        "correctOption": 4,
        "snippet": "アリさんに本を3冊貸します (Cho mượn 3 cuốn sách)",
        "explanation": """🎯 Đáp án đúng: [4] アリさんに本を3冊貸します。 (Cho bạn Ali mượn 3 cuốn sách)

💬 Dịch nghĩa câu hỏi & Nội dung đoạn thư:
• Câu hỏi: "Anh Ishikawa nói rằng tuần tới anh ấy sẽ làm việc gì?"
• Nội dung đoạn thư gửi Ali:
"Tôi để lại cuốn sách đã mượn từ Ali ở đây nhé. Cảm ơn bạn rất nhiều.
Còn những cuốn sách mà Ali nói muốn mượn tôi thì tôi cũng để ở đây cùng. Do nặng quá nên hôm nay tôi chỉ mang tới được 2 cuốn thôi. Tuần sau tôi sẽ mang nốt 3 cuốn còn lại tới nhé. (石川)"

💡 Phân tích chi tiết:
• Hôm nay anh Ishikawa mang 2 cuốn cho Ali mượn: 「今日は2冊しか持ってきませんでした」.
• Tuần sau (来週): anh ấy sẽ mang nốt 3 cuốn còn lại cho Ali mượn: 「来週、ほかの3冊を持ってきます」.
• Như vậy sang tuần tới, anh Ishikawa sẽ cho Ali mượn 3 cuốn sách (アリさんに本を3冊貸します).

🔍 Phân tích các lựa chọn:
- 1. Trả 2 cuốn sách cho Ali: Sai (hôm nay đã trả xong cuốn sách mượn rồi).
- 2. Trả 3 cuốn sách cho Ali: Sai (không phải trả mà là cho Ali mượn).
- 3. Cho Ali mượn 2 cuốn sách: Sai (2 cuốn đã cho mượn hôm nay, tuần sau là 3 cuốn còn lại).
- 4. Cho Ali mượn 3 cuốn sách: ĐÚNG - Khớp hoàn toàn với lời hẹn 来週、ほかの3冊を持ってきます.

📄 Trích PDF gốc (试题解析 Trang 20):
(26) 4 关键内容在正文的第二段。石川提到之前アリ想找他借的书, 他带了两本来, 另外三本他下周再带来。所以下周他会再借三本书给アリ。"""
    },
    61: {
        "localPdfNumber": 27,
        "mondai": 4,
        "sectionType": "GRAMMAR",
        "text": "このお知らせから、公園についてわかることは何ですか。",
        "options": [
            "1. 午後10時に公園に入ってもいいです。",
            "2. 入り口にオートバイをとめてはいけません。",
            "3. サッカーの練習をしてはいけません。",
            "4. たばこを吸ってもいいです。"
        ],
        "correctOption": 3,
        "snippet": "サッカーの練習をしてはいけません (Cấm tập bóng đá)",
        "explanation": """🎯 Đáp án đúng: [3] サッカーの練習をしてはいけません。 (Không được phép tập luyện đá bóng)

💬 Dịch nghĩa câu hỏi & Nội dung thông báo công viên:
• Câu hỏi: "Từ bản thông báo này, điều chúng ta biết được về công viên là gì?"
• Nội dung bản thông báo 「公園で遊ぶときの注意」 (Lưu ý khi vui chơi ở công viên):
1. Thời gian mở cửa: từ 6:00 sáng đến 9:00 tối (午後9時). Ngoài giờ này không được vào.
2. Xe đạp và xe máy (オートバイ) phải đỗ ở lối ra vào, cấm mang vào bên trong công viên.
3. Trong công viên nghiêm cấm:
   - Chơi đùa bằng bóng (ボールを使って遊ぶこと)
   - Hút thuốc lá (たばこを吸うこと)

💡 Phân tích chi tiết:
• Bản quy định ghi rõ cấm chơi bóng (ボールを使って遊ぶこと), vì vậy việc tập đá bóng (サッカーの練習) là hành vi bị cấm: 「サッカーの練習をしてはいけません」.

🔍 Phân tích các lựa chọn:
- 1. Được vào lúc 10 giờ tối: Sai (công viên đóng cửa lúc 9 giờ tối).
- 2. Cấm đỗ xe máy ở lối vào: Sai (thông báo yêu cầu đỗ ở lối vào, cấm mang vào trong).
- 3. Không được phép tập đá bóng: ĐÚNG - Vì cấm chơi bóng (ボールを使って遊ぶこと).
- 4. Được phép hút thuốc lá: Sai (nghiêm cấm hút thuốc たばこを吸うこと).

📄 Trích PDF gốc (试题解析 Trang 20):
(27) 3 这则通知主要提醒游客三点内容: 公园开放时间为早上6点至晚上9点; 自行车和摩托车需停在入口处不得入内; 不允许在公园中玩球类运动或吸烟。只有选项3与通知表述内容相符。"""
    },
    62: {
        "localPdfNumber": 28,
        "mondai": 4,
        "sectionType": "GRAMMAR",
        "text": "トムさんは、山田先生に何を知らせなければなりませんか。",
        "options": [
            "1. 約束を明日に変えられるかどうか",
            "2. 約束をあさってに変えられるかどうか",
            "3. トムさんの明日の午後の都合",
            "4. トムさんのあさっての午前の都合"
        ],
        "correctOption": 2,
        "snippet": "約束をあさってに変えられるかどうか (Đổi hẹn sang ngày kia)",
        "explanation": """🎯 Đáp án đúng: [2] 約束をあさってに変えられるかどうか (Liệu có thể đổi cuộc hẹn sang ngày kia được hay không)

💬 Dịch nghĩa câu hỏi & Thư của thầy Yamada gửi Tom:
• Câu hỏi: "Bạn Tom phải báo cho thầy Yamada biết điều gì?"
• Nội dung email:
"Gửi Tom, cuộc hẹn ngày mai (ngày 30) do tôi phải đi dự họp nên không thể gặp được.
Vì vậy, rất xin lỗi em, không biết em có thể đổi cuộc hẹn sang lúc 3 giờ chiều ngày 31 được không?
Nếu em tiện thì tôi sẽ chờ em ở văn phòng. Sau khi đọc thư này hãy hồi âm cho tôi biết nhé. (Yamada)"

💡 Phân tích chi tiết:
• Thư gửi ngày hôm nay (ngày 29), ngày mai là ngày 30, còn ngày 31 chính là ngày kia (あさって).
• Thầy Yamada muốn dời lịch hẹn sang chiều ngày 31 (ngày kia) và yêu cầu Tom trả lời thư xem có đổi sang ngày đó được không.
• Do đó Tom cần báo cho thầy biết liệu có thể đổi hẹn sang ngày kia được không (約束をあさってに変えられるかどうか).

🔍 Phân tích các lựa chọn:
- 1. Đổi sang ngày mai: Sai (ngày mai thầy Yamada bận họp).
- 2. Đổi sang ngày kia: ĐÚNG - Ngày 31 chính là ngày kia (あさって).
- 3. Lịch rảnh chiều mai: Sai (ngày mai bận họp rồi).
- 4. Lịch rảnh sáng ngày kia: Sai (thầy hẹn vào 3 giờ chiều ngày 31 午後3時, tức buổi chiều chứ không phải buổi sáng).

📄 Trích PDF gốc (试题解析 Trang 20):
(28) 2 根据邮件内容可知, 两人本来约好了明天见面, 但因为山田先生要参加会议, 所以想把时间改为后天下午三点。山田先生希望汤姆先生回复他, 告知后天下午是否有空, 能否把时间改到那个时候。"""
    },
    63: {
        "localPdfNumber": 29,
        "mondai": 4,
        "sectionType": "GRAMMAR",
        "text": "石田さんの仕事ではないものはどれですか。",
        "options": [
            "1. 相談に来た人に本について紹介します。",
            "2. 本を置く場所はどこがいいか、考えます。",
            "3. 新聞にのっている、よい本の紹介文をさがします。",
            "4. 小さな子どもたちに、いろいろな絵本を読みます。"
        ],
        "correctOption": 3,
        "snippet": "新聞にのっている...さがします (KHÔNG PHẢI việc của Ishida)",
        "explanation": """🎯 Đáp án đúng: [3] 新聞にのっている、よい本の紹介文をさがします。 (Tìm kiếm bài viết giới thiệu sách hay trên báo)

💬 Dịch nghĩa câu hỏi & Nội dung bài đọc về anh Ishida:
• Câu hỏi: "Việc nào KHÔNG PHẢI là công việc của anh Ishida?"
• Nội dung đoạn văn:
"Anh Ishida làm việc tại thư viện Kawa-shita. Công việc của anh là tiếp nhận tư vấn về sách từ bạn đọc, suy nghĩ xem nên sắp xếp đặt sách ở vị trí nào thì tốt. Thêm vào đó, anh còn viết các bài giới thiệu sách hay cho tờ báo của thư viện, và đọc nhiều cuốn tranh truyện cho các em nhỏ nghe."

💡 Phân tích 4 công việc thực tế của anh Ishida:
1. Tiếp nhận tư vấn và giới thiệu sách cho người đến hỏi: 「本についての相談を受けたり」 -> tương ứng phương án 1.
2. Suy nghĩ vị trí đặt sách cho hợp lý: 「どこにどの本を置くのがいいか考えたり」 -> tương ứng phương án 2.
3. Tự mình viết bài giới thiệu sách cho tờ báo của thư viện: 「図書館の新聞によい本の紹介文を書いたり」 -> anh ấy TỰ TAY VIẾT bài giới thiệu chứ KHÔNG PHẢI đi tìm kiếm bài viết giới thiệu có sẵn trên báo.
4. Đọc truyện tranh cho các em thiếu nhi: 「小さな子どもたちに絵本を読んだり」 -> tương ứng phương án 4.
• Do đó, phương án 3 là công việc SAI, không phải việc của anh Ishida.

📄 Trích PDF gốc (试题解析 Trang 20):
(29) 3 根据文章内容可知, 石田先生一共有四项工作内容: 接受关于图书的咨询; 考虑书本如何摆放; 写书本介绍; 给孩子们读绘本。选项3“查找好的书本介绍”与文章内容表述不符。"""
    },
    64: {
        "localPdfNumber": 30,
        "mondai": 5,
        "sectionType": "GRAMMAR",
        "text": "どんな ①ホテル に泊まりましたか。",
        "options": [
            "1. 山の中の大きなホテル",
            "2. 古いが、中はきれいなホテル",
            "3. テレビやゲームが楽しめるホテル",
            "4. いろいろなものがあって、便利なホテル"
        ],
        "correctOption": 2,
        "snippet": "古いが、中はきれいなホテル (Cũ nhưng bên trong sạch)",
        "explanation": """🎯 Đáp án đúng: [2] 古いが、中はきれいなホテル (Khách sạn cũ nhưng bên trong rất sạch sẽ)

💬 Dịch nghĩa câu hỏi & Vị trí thông tin trong bài đọc:
• Câu hỏi: "Gia đình tác giả đã nghỉ chân tại một khách sạn ① như thế nào?"
• Câu then chốt trong đoạn 2:
「ホテルは小さくて古かったですが、中はとてもきれいでした。」
(Khách sạn tuy nhỏ và cũ, nhưng bên trong thì rất là sạch sẽ.)
• Đoạn 3 cho biết thêm: khách sạn không có TV, không có máy chơi game, không có tủ lạnh hay điều hòa nên không hề tiện nghi.

🔍 Phân tích các lựa chọn:
- 1. Khách sạn to lớn ở giữa núi: Sai (khách sạn nhỏ 小さくて).
- 2. Cũ nhưng bên trong sạch sẽ: ĐÚNG - Khớp 100% với câu chữ trong bài ホテルは小さくて古かったですが、中はとてもきれいでした.
- 3. Tha hồ xem TV và chơi game: Sai (đoạn 3 nói rõ là không có TV và máy chơi game).
- 4. Đầy đủ tiện nghi hiện đại: Sai (không hề tiện lợi).

📄 Trích PDF gốc (试题解析 Trang 21):
(30) 2 关键句是第二段最后一句“ホテルは小さくて古かったですが、中はとてもきれいでした。”和文章第三段内容。旅馆虽然又小又旧, 但是内部很干净。不过那里没有电视和游戏机, 冰箱和空调也没有, 很不方便。"""
    },
    65: {
        "localPdfNumber": 31,
        "mondai": 5,
        "sectionType": "GRAMMAR",
        "text": "駅からホテルまでどうやって行きましたか。",
        "options": [
            "1. 駅から30分バスに乗って、バス停から2時間以上歩きました。",
            "2. 駅から30分バス停まで歩いて、バスに2時間以上乗りました。",
            "3. 駅から2時間近くバスに乗って、バス停から30分以上歩きました。",
            "4. 駅から2時間以上バスに乗って、バス停から30分近く歩きました。"
        ],
        "correctOption": 4,
        "snippet": "駅から2時間以上バスに... (Đi xe buýt hơn 2 tiếng, đi bộ gần 30 phút)",
        "explanation": """🎯 Đáp án đúng: [4] 駅から2時間以上バスに乗って、バス停から30分近く歩きました。 (Từ ga đi xe buýt hơn 2 tiếng, rồi từ trạm xe buýt đi bộ gần 30 phút)

💬 Dịch nghĩa câu hỏi & Vị trí thông tin trong bài đọc:
• Câu hỏi: "Từ nhà ga đến khách sạn, tác giả đã đi bằng cách nào?"
• Câu then chốt trong đoạn 2:
「駅からホテルの近くのバス停まで、バスで 2時間以上かかりました。バス停からホテルまでは、細い道を 30分近く歩きました。」
(Từ ga đến trạm xe buýt gần khách sạn, đi bằng xe buýt mất hơn 2 tiếng đồng hồ. Từ trạm xe buýt đến khách sạn, chúng tôi đã đi bộ theo con đường hẹp mất gần 30 phút.)

🔍 Phân tích các lựa chọn:
- 1. Đi xe buýt 30 phút, đi bộ hơn 2 tiếng: Đảo ngược sai thời gian.
- 2. Đi bộ 30 phút rồi đi xe buýt hơn 2 tiếng: Trình tự và phương tiện sai.
- 3. Đi xe buýt gần 2 tiếng, đi bộ hơn 30 phút: Dùng sai từ chỉ lượng (trong bài là xe buýt hơn 2 tiếng 2時間以上, đi bộ gần 30 phút 30分近く).
- 4. Đi xe buýt hơn 2 tiếng, đi bộ gần 30 phút: ĐÚNG - Hoàn toàn chuẩn xác với văn bản gốc.

📄 Trích PDF gốc (试题解析 Trang 21):
(31) 4 关键句是文章第二段中的“駅からホテルの近くのバス停まで、バスで2時間以上かかりました。バス停からホテルまでは、細い道を30分近く歩きました。”, 作者先坐两个多小时车到旅馆附近的车战, 再从车站步行30分钟左右去旅馆。"""
    },
    66: {
        "localPdfNumber": 32,
        "mondai": 5,
        "sectionType": "GRAMMAR",
        "text": "ホテルに着いてから、何をしましたか。",
        "options": [
            "1. 部屋に行かないで、すぐに湖に行きました。",
            "2. 部屋に行って、夜までずっと休みました。",
            "3. 部屋でテレビを見てから、星を見に外へ出ました。",
            "4. 部屋で少し休んでから、散歩に行きました。"
        ],
        "correctOption": 4,
        "snippet": "部屋で少し休んでから、散歩に行きました (Nghỉ một lát rồi đi dạo)",
        "explanation": """🎯 Đáp án đúng: [4] 部屋で少し休んでから、散歩に行きました。 (Sau khi nghỉ ngơi một lát ở phòng, đã ra ngoài đi dạo)

💬 Dịch nghĩa câu hỏi & Vị trí thông tin trong bài đọc:
• Câu hỏi: "Sau khi tới khách sạn, tác giả và gia đình đã làm gì?"
• Câu then chốt trong đoạn 4:
「部屋に荷物を置いて窓を開けると、湖から涼しい風が入ってきました。少し休んでから、まだ明るかったので、散歩に出かけました。」
(Sau khi đặt hành lý vào phòng và mở cửa sổ ra, làn gió mát lành từ phía hồ ùa vào. Nghỉ ngơi một chút, vì trời vẫn còn sáng nên chúng tôi đã ra ngoài đi dạo bộ.)

🔍 Phân tích các lựa chọn:
- 1. Không vào phòng mà đi ra hồ ngay: Sai (có vào phòng cất hành lý và nghỉ ngơi).
- 2. Vào phòng nghỉ suốt tới đêm: Sai (có ra ngoài đi dạo).
- 3. Xem TV trong phòng rồi ra ngắm sao: Sai (khách sạn không có TV).
- 4. Nghỉ một lát trong phòng rồi đi dạo: ĐÚNG - Khớp hoàn toàn với câu chữ 少し休んでから、まだ明るかったので、散歩に出かけました.

📄 Trích PDF gốc (试题解析 Trang 21):
(32) 4 关键句是第四段中的“少し休んでから、まだ明るかったので、散歩に出かけました。空気がおいしくて、景色も美しかったです。”, 作者在稍事休息后, 出去散步了。"""
    },
    67: {
        "localPdfNumber": 33,
        "mondai": 5,
        "sectionType": "GRAMMAR",
        "text": "②こんな生活とありますが、どんな生活ですか。",
        "options": [
            "1. 山で遊んだり、昼寝をしたりする生活",
            "2. ゲームをしたり、虫をとったりする生活",
            "3. 散歩をしたり、テレビを見たりする生活",
            "4. おいしいものを食べて、何もしない生活"
        ],
        "correctOption": 1,
        "snippet": "山で遊んだり、昼寝をしたりする生活 (Vui chơi ở núi, ngủ trưa)",
        "explanation": """🎯 Đáp án đúng: [1] 山で遊んだり、昼寝をしたりする生活 (Cuộc sống vui chơi trên núi, ngủ trưa thảnh thơi)

💬 Dịch nghĩa câu hỏi & Vị trí thông tin trong bài đọc:
• Câu hỏi: "Trong bài có nhắc đến cụm từ ②'cuộc sống như thế này', đó là cuộc sống như thế nào?"
• Câu then chốt đoạn 4:
「ホテルにいる間は毎日、みんなで散歩をしたり、湖で泳いだり、虫をとったり、昼寝をしたりしました。」
(Trong suốt thời gian ở khách sạn, mỗi ngày cả nhà cùng nhau đi dạo bộ, bơi lội dưới hồ, bắt côn trùng, rồi ngủ trưa thảnh thơi.)
• Khách sạn nằm giữa vùng núi (山の中にあるホテル). Các hoạt động đi dạo, bơi lội dưới hồ, bắt côn trùng được khái quát thành vui chơi hòa mình vào thiên nhiên vùng núi (山で遊んだり) kết hợp cùng ngủ trưa (昼寝をしたり).

🔍 Phân tích các lựa chọn:
- 1. Vui chơi vùng núi, ngủ trưa thảnh thơi: ĐÚNG - Khái quát chuẩn xác các hoạt động dã ngoại thiên nhiên và ngủ trưa được nhắc tới.
- 2. Chơi game, bắt côn trùng: Sai (khách sạn không hề có máy chơi game).
- 3. Đi dạo, xem TV: Sai (khách sạn không hề có TV).
- 4. Ăn đồ ngon và không làm gì cả: Sai lệch nội dung bài đọc.

📄 Trích PDF gốc (试题解析 Trang 21):
(33) 1 关键句是第四段的最后一句“ホテルにいる間は毎日、みんなで散歩をしたり、湖で泳いだり、虫をとったり、昼寝をしたりしました。”, 作者认为一周的旅程十分愉快, “这样的生活”指的就是每天散步、游游泳、捉捉虫、睡睡懒觉的生活。"""
    },
    68: {
        "localPdfNumber": 34,
        "mondai": 6,
        "sectionType": "GRAMMAR",
        "text": "自転車を借りて乗りたい人は、いくら払わなければなりませんか。",
        "options": ["1. ただ", "2. 100 円", "3. 200 円", "4. 300 円"],
        "correctOption": 3,
        "snippet": "200 円 (Phí thuê xe đạp 200 yên)",
        "explanation": """🎯 Đáp án đúng: [3] 200 円 (200 Yên)

💬 Dịch nghĩa câu hỏi & Tra cứu tờ rơi thông tin:
• Câu hỏi: "Người muốn mượn/thuê xe đạp để tham gia đạp xe thì phải trả bao nhiêu tiền?"
• Tra cứu bảng thông báo lớp học thể thao ngoài trời 「あおぞら一日スポーツ教室」:
- Trong bảng: Dòng 「自転車」 (Xe đạp) cột tiền ghi là 「ただ※」 (Miễn phí *).
- Dấu hoa thị dẫn xuống dòng chú thích ngay bên dưới bảng:
  「※注意 自転車を借りる人は 200 円かかります。」
  (※ Chú ý: Người thuê xe đạp sẽ mất chi phí là 200 Yên).
• Do câu hỏi hỏi người muốn thuê xe đạp (自転車を借りて乗りたい人), nên chi phí bắt buộc phải trả là 200 Yên.

🔍 Phân tích các lựa chọn:
- 1. ただ (Miễn phí): Chỉ áp dụng cho người tự mang xe đạp của mình đến.
- 2. 100 円: Chi phí của môn bóng đá / bóng rổ.
- 3. 200 円: ĐÚNG - Chi phí thuê xe đạp ghi rõ ở mục chú ý: 自転車を借りる人は 200 円かかります.
- 4. 300 円: Chi phí của môn bơi lội (水泳).

📄 Trích PDF gốc (试题解析 Trang 21):
(34) 3 关键句是表格下方的提示“自転車を借りる人は 200 円かかります。”, 可知想租借自行车需要支付200日元。"""
    },
    69: {
        "localPdfNumber": 35,
        "mondai": 6,
        "sectionType": "GRAMMAR",
        "text": "バスケットボールのルールや、やり方を習ってから試合に出たい人は、まずどうしなければなりませんか。",
        "options": [
            "1. 10:00 までに受付に行きます。",
            "2. 10:00 までに体育館に行きます。",
            "3. 13:00 までに受付に行きます。",
            "4. 13:00 までに体育館に行きます。"
        ],
        "correctOption": 2,
        "snippet": "10:00 までに体育館に行きます (Đến nhà thi đấu trước 10:00)",
        "explanation": """🎯 Đáp án đúng: [2] 10:00 までに体育館に行きます。 (Đến nhà thi đấu thể dục trước 10:00)

💬 Dịch nghĩa câu hỏi & Tra cứu tờ rơi thông tin:
• Câu hỏi: "Người muốn học luật chơi và cách chơi bóng rổ trước rồi mới tham gia thi đấu thì trước tiên phải làm gì?"
• Tra cứu mục ② 「サッカー、バスケットボール」 trong tờ thông báo:
- Buổi sáng (午前): 「ルールや、やり方を先生が教えます。」 (Giáo viên hướng dẫn luật và cách chơi).
  Địa điểm và thời gian: 「サッカーは第2運動場、バスケットボールは体育館に、10:00 までに来てください。」
  (Bóng đá đến sân vận động số 2, bóng rổ đến Nhà thi đấu thể dục (体育館) trước 10:00).
  Ghi chú: 「初めてサッカーやバスケットボールをする人は、ぜひ午前の教室から来てください。」
  (Những ai lần đầu chơi bóng rổ/bóng đá thì nhất định hãy đến từ lớp học buổi sáng).
- Buổi chiều (午後): Thi đấu theo nhóm (グループで試合をします). Ai chỉ thi đấu buổi chiều thì đến quầy lễ tân trước 13:00.
• Vì người này muốn học luật và cách chơi trước (習ってから), nên bắt buộc phải đến lớp học sáng: trước tiên phải có mặt tại Nhà thi đấu thể dục (体育館) trước 10:00.

🔍 Phân tích các lựa chọn:
- 1. Đến quầy lễ tân trước 10:00: Sai địa điểm (học bóng rổ phải đến nhà thi đấu 体育館).
- 2. Đến nhà thi đấu thể dục trước 10:00: ĐÚNG - Khớp với chỉ dẫn バスケットボールは体育館に、10:00 までに来てください.
- 3. Đến quầy lễ tân trước 13:00: Chỉ dành cho người đã biết chơi và chỉ đăng ký thi đấu buổi chiều.
- 4. Đến nhà thi đấu trước 13:00: Sai thời gian và thủ tục đăng ký buổi chiều là ở quầy lễ tân.

📄 Trích PDF gốc (试题解析 Trang 21):
(35) 2 根据表格可知, 篮球属于第②类, 根据“サッカーは第2運動場、バスケットボールは体育館に、10:00 までに来てください。”和“初めてサッカーやバスケットボールをする人は、ぜひ午前の教室から来てください。”, 可知首先要在10点前到达体育馆, 进行学习。"""
    }
}

print(f"Loaded {len(GRAMMAR_QUESTIONS)} grammar questions (35..69).")
