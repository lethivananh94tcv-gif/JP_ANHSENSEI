# -*- coding: utf-8 -*-
"""
Build and apply 100% authentic explanations for JLPT N4 2012-12 Vocab (Q16 - Q34)
Based on Pages 17 and 18 of n4-2012-12.pdf
"""
import os
import json

def get_n4_2012_vocab_16_34():
    return {
        16: {
            "snippet": "けさ せんたくした ふくが まだ（ 4: かわいて ）いません。",
            "correctOption": 4,
            "explanation": """🎯 Đáp án đúng: [4] かわいて (乾く)

💬 Dịch nghĩa câu:
"Quần áo giặt từ sáng sớm mà đến giờ vẫn chưa khô hẳn."

💡 Phân tích & Giải thích:
• Tự động từ 「かわく (乾く - can)」: khô ráo, hết ẩm ướt.
• Dạng tiếp diễn phủ định: 「まだ乾いていません」 biểu thị trạng thái "vẫn chưa khô".

🔍 Phân tích các lựa chọn:
- 1. ひえて (冷える): Nguội đi, lạnh đi (đồ ăn, thời tiết)
- 2. なおって (治る): Khỏi bệnh, bình phục
- 3. ぬれて (濡れる): Bị ướt sũng (trái ngược nghĩa câu)
- 4. かわいて (乾く): ĐÚNG - Khô ráo

📄 Trích PDF gốc (Trang 17 - 试题解析):
(16) 4 句意: 今早洗的衣服还没干。1. ひえる（冷える）: 变冷，变凉; 2. なおる（治る）: 治好，痊愈; 3. ぬれる（濡れる）: 淋湿，沾湿; 4. かわく（乾く）: 干"""
        },
        17: {
            "snippet": "スミスさんは いつも（ 3: ねっしんに ）べんきょうして います。",
            "correctOption": 3,
            "explanation": """🎯 Đáp án đúng: [3] ねっしんに (熱心に)

💬 Dịch nghĩa câu:
"Anh Smith lúc nào cũng học tập rất chăm chỉ, say mê và nhiệt tình."

💡 Phân tích & Giải thích:
• Tính từ đuôi な: 「熱心 (ねっしん - nhiệt tâm)」: nhiệt tình, say mê, chuyên cần.
• Khi bổ nghĩa cho động từ 「べんきょうしています」, thêm に tạo thành phó từ: 「ねっしんに 勉強している」 (học tập một cách say mê, chuyên cần).

🔍 Phân tích các lựa chọn:
- 1. だいじに (大事に): Trân trọng, giữ gìn cẩn thận
- 2. たいせつに (大切に): Coi trọng, quý giá
- 3. ねっしんに (熱心に): ĐÚNG - Chăm chỉ, nhiệt tình, hăng say học tập
- 4. まっすぐに (真っ直ぐに): Thẳng thắn, thẳng một mạch

📄 Trích PDF gốc (Trang 17 - 试题解析):
(17) 3 句意: 史密斯先生一直都在用功学习。1. だいじ（大事）: 重要；珍惜; 2. たいせつ（大切）: 关键，宝贵; 3. ねっしん（熱心）: 热心，热忱; 4. まっすぐ（真っ直ぐ）: 径直，比直"""
        },
        18: {
            "snippet": "わたしは にほんの まんがに（ 2: きょうみ ）が あります。",
            "correctOption": 2,
            "explanation": """🎯 Đáp án đúng: [2] きょうみ (興味)

💬 Dịch nghĩa câu:
"Tôi rất có hứng thú và say mê đối với truyện tranh Nhật Bản."

💡 Phân tích & Giải thích:
• Cụm từ cố định: 「～に 興味（きょうみ）がある」: có niềm hứng thú, quan tâm đặc biệt đối với lĩnh vực gì.
• Nếu dùng 「趣味 (しゅみ)」 thì cấu trúc câu sẽ là 「わたしの趣味は～です」 (Sở thích của tôi là...), không đi với cấu trúc 「～に趣味がある」.

🔍 Phân tích các lựa chọn:
- 1. きぶん (気分): Tâm trạng, thể trạng cơ thể
- 2. きょうみ (興味): ĐÚNG - Niềm hứng thú, quan tâm (～に興味がある)
- 3. こころ (心): Trái tim, tấm lòng
- 4. しゅみ (趣味): Sở thích (sai cấu trúc trợ từ に)

📄 Trích PDF gốc (Trang 17 - 试题解析):
(18) 2 句意: 我对日本漫画很感兴趣。1. きぶん（気分）: 情绪，心情; 2. きょうみ（興味）: 兴趣，趣味; 3. こころ（心）: 心情，心绪; 4. しゅみ（趣味）: 爱好"""
        },
        19: {
            "snippet": "わたしは テニスの（ 2: ルール ）を よく しりません。",
            "correctOption": 2,
            "explanation": """🎯 Đáp án đúng: [2] ルール (rule)

💬 Dịch nghĩa câu:
"Tôi không biết rõ luật chơi của môn quần vợt (tennis)."

💡 Phân tích & Giải thích:
• Từ mượn Katakana: 「ルール (rule)」 mang nghĩa là "luật lệ, quy tắc" trong thể thao, trò chơi hoặc quy ước xã hội.
• 「テニスのルールを知らない」: không biết luật chơi tennis.

🔍 Phân tích các lựa chọn:
- 1. アイディア (idea): Ý tưởng, sáng kiến
- 2. ルール (rule): ĐÚNG - Quy tắc, luật thi đấu
- 3. あんない (案内): Hướng dẫn, dẫn đường
- 4. せつめい (説明): Thuyết minh, giải thích

📄 Trích PDF gốc (Trang 17 - 试题解析):
(19) 2 句意: 我不太清楚网球的规则。1. アイディア: 想法，主意; 2. ルール: 规则，章程; 3. あんない（案内）: 引导，向导; 4. せつめい（説明）: 说明"""
        },
        20: {
            "snippet": "りょこうの にもつは もう（ 4: ようい ）できましたか。",
            "correctOption": 4,
            "explanation": """🎯 Đáp án đúng: [4] ようい (用意)

💬 Dịch nghĩa câu:
"Hành lý chuẩn bị cho chuyến đi du lịch bạn đã sửa soạn xong xuôi chưa?"

💡 Phân tích & Giải thích:
• Danh từ 「用意（ようい - dụng ý）」: sự chuẩn bị, sửa soạn đồ đạc trước một chuyến đi hoặc sự kiện.
• Cụm từ thành ngữ: 「用意ができる」: đã chuẩn bị xong, sẵn sàng.

🔍 Phân tích các lựa chọn:
- 1. やくそく (約束): Lời hứa, hẹn ước
- 2. りよう (利用): Sử dụng, tận dụng tiện ích
- 3. せわ (世話): Chăm sóc, giúp đỡ
- 4. ようい (用意): ĐÚNG - Chuẩn bị hành lý, đồ đạc (用意ができる)

📄 Trích PDF gốc (Trang 17 - 试题解析):
(20) 4 句意: 旅行的行李已经整理好了吗？1. やくそく（約束）: 约定，规定; 2. りよう（利用）: 利用; 3. せわ（世話）: 照顾，照料; 4. ようい（用意）: 准备，预备"""
        },
        21: {
            "snippet": "おとうとと（ 3: そうだん ）して 母に あげる プレゼントを えらびました。",
            "correctOption": 3,
            "explanation": """🎯 Đáp án đúng: [3] そうだん (相談)

💬 Dịch nghĩa câu:
"Sau khi bàn bạc cùng với em trai, tôi đã chọn được món quà để tặng mẹ."

💡 Phân tích & Giải thích:
• Cụm từ cố định: 「～と 相談（そうだん）する」: trao đổi, thảo luận, bàn bạc với ai đó để tìm ra hướng giải quyết hoặc lựa chọn chung.

🔍 Phân tích các lựa chọn:
- 1. さんせい (賛成): Tán thành, đồng ý quan điểm
- 2. あいさつ (挨拶): Chào hỏi xã giao
- 3. そうだん (相談): ĐÚNG - Thảo luận, bàn bạc với em trai
- 4. へんじ (返事): Trả lời, hồi âm

📄 Trích PDF gốc (Trang 17 - 试题解析):
(21) 3 句意: 和弟弟商量后，选好了给母亲的礼物。1. さんせい（賛成）: 赞成; 2. あいさつ（挨拶）: 寒暄; 3. そうだん（相談）: 商量; 4. へんじ（返事）: 回答"""
        },
        22: {
            "snippet": "この にもつを あそこに（ 1: はこんで ）ください。",
            "correctOption": 1,
            "explanation": """🎯 Đáp án đúng: [1] はこんで (運ぶ)

💬 Dịch nghĩa câu:
"Xin vui lòng chuyển/khiêng kiện hành lý này đến chỗ đằng kia giúp tôi."

💡 Phân tích & Giải thích:
• Động từ 「はこぶ (運ぶ - vận)」: khuân vác, chuyển dời đồ vật từ vị trí này sang vị trí khác (荷物を運ぶ).
• Thể て nhờ vả lịch sự: 「運んでください」 (xin hãy khiêng giúp).

🔍 Phân tích các lựa chọn:
- 1. はこんで (運ぶ): ĐÚNG - Khuân vác, chuyển đồ đạc
- 2. つたえて (伝える): Truyền đạt lời nhắn, tin tức
- 3. ひろって (拾う): Nhặt lên (từ dưới đất)
- 4. むかえて (迎える): Đón tiếp (người)

📄 Trích PDF gốc (Trang 17 - 试题解析):
(22) 1 句意: 请把这件行李搬到那边。1. はこぶ（運ぶ）: 搬运; 2. つたえる（伝える）: 传送; 3. ひろう（拾う）: 拾，捡; 4. むかえる（迎える）: 迎接"""
        },
        23: {
            "snippet": "この きかいは つかいかたを まちがえると とても（ 2: きけん ）です。",
            "correctOption": 2,
            "explanation": """🎯 Đáp án đúng: [2] きけん (危険)

💬 Dịch nghĩa câu:
"Cỗ máy này nếu thao tác nhầm cách sử dụng thì sẽ vô cùng nguy hiểm."

💡 Phân tích & Giải thích:
• Tính từ đuôi な: 「きけん (危険 - nguy hiểm)」 mang nghĩa mất an toàn, có khả năng gây tai nạn thương tích.
• Câu điều kiện: 「つかいかたをまちがえると」 (nếu nhầm cách dùng) dẫn đến kết quả tiêu cực là 「とても危険です」 (rất nguy hiểm).

🔍 Phân tích các lựa chọn:
- 1. けっこう (結構): Khá tốt, đủ rồi
- 2. きけん (危険): ĐÚNG - Nguy hiểm, rủi ro cao
- 3. じゆう (自由): Tự do, tùy ý
- 4. あんぜん (安全): An toàn (trái ngược ý câu)

📄 Trích PDF gốc (Trang 17 - 试题解析):
(23) 2 句意: 如果弄错了这台机器的操作方法，会很危险。1. けっこう（結構）: 足够，可以; 2. きけん（危険）: 危险; 3. じゆう（自由）: 自由; 4. あんぜん（安全）: 安全"""
        },
        24: {
            "snippet": "入口の 前には 車を（ 3: とめないで ）ください。",
            "correctOption": 3,
            "explanation": """🎯 Đáp án đúng: [3] とめないで (止める)

💬 Dịch nghĩa câu:
"Xin vui lòng đừng đỗ/dừng xe ở ngay phía trước lối ra vào."

💡 Phân tích & Giải thích:
• Tha động từ dừng, đỗ phương tiện giao thông: 「とめる (止める - chỉ)」 -> 「車を止める」 (đỗ ô tô).
• Thể cấm đoán lịch sự: 「V-ないでください」 -> 「車を止めないでください」.
• Phân biệt: 「やめる (止める)」 là từ bỏ thói quen/công việc, không dùng cho đỗ xe.

🔍 Phân tích các lựa chọn:
- 1. やめないで (止める): Đừng từ bỏ/hủy bỏ (sai nghĩa ngữ cảnh này)
- 2. しめないで (締める/閉める): Đừng thắt chặt / đừng đóng
- 3. とめないで (止める): ĐÚNG - Đừng đỗ/dừng xe ô tô
- 4. きめないで (決める): Đừng quyết định

📄 Trích PDF gốc (Trang 17 - 试题解析):
(24) 3 句意: 请不要把车停在入口前。1. やめる（止める）: 中止，取消; 2. しめる（締める）: 系紧; 3. とめる（止める）: 停止（停车）; 4. きめる（決める）: 决定，决心"""
        },
        25: {
            "snippet": "バスが しゅっぱつしました。 ≒ バスが でました。",
            "correctOption": 3,
            "explanation": """🎯 Đáp án đúng: [3] バスが でました。

💬 Dịch nghĩa câu đề bài:
「バスが しゅっぱつしました。」
-> "Xe buýt đã xuất phát / khởi hành."

💡 Phân tích từ đồng nghĩa:
• Động từ 「出発する (しゅっぱつする)」: xuất phát, rời bến.
• Tương đương với động từ 「出る (でる - xuất)」: xuất bến, lăn bánh rời trạm -> 「バスが でました」.

🔍 Phân tích các lựa chọn:
- 1. バスが とまりました: Xe buýt đã dừng lại (trái nghĩa)
- 2. バスが つきました: Xe buýt đã đến nơi (đến bến đích)
- 3. バスが でました: ĐÚNG - Xe buýt đã xuất bến/rời trạm
- 4. バスが まがりました: Xe buýt đã bẻ lái rẽ hướng

📄 Trích PDF gốc (Trang 17 - 试题解析):
(25) 3 句意: 公交出发了。（しゅっぱつ: 出发，启程）1. 公交停下了。2. 公交到了。3. 公交离开了。4. 公交转弯了。"""
        },
        26: {
            "snippet": "もっと ていねいに かいて ください。 ≒ もっと きれいに かいて ください。",
            "correctOption": 2,
            "explanation": """🎯 Đáp án đúng: [2] もっと きれいに かいて ください。

💬 Dịch nghĩa câu đề bài:
「もっと ていねいに かいて ください。」
-> "Xin hãy viết cẩn thận, nắn nót và chỉn chu hơn."

💡 Phân tích từ đồng nghĩa:
• Phó từ 「ていねいに (丁寧に)」 khi dùng với việc viết chữ có nghĩa là "cẩn thận, nắn nót, tỉ mỉ từng nét".
• Tương đương với 「きれいに (đẹp đẽ, ngay ngắn, gọn gàng sạch sẽ)」: 「もっと きれいに かいてください」.

🔍 Phân tích các lựa chọn trong đề thi:
- 1. もっと おおきく かいて ください: Viết chữ to hơn (おおきく)
- 2. もっと きれいに かいて ください: ĐÚNG - Viết nắn nót, đẹp đẽ, ngay ngắn (きれいに)
- 3. もっと ふとく かいて ください: Viết nét chữ đậm/dày hơn (ふとく)
- 4. もっと かんたんに かいて ください: Viết đơn giản hơn (かんたんに)

📄 Trích PDF gốc (Trang 17 - 试题解析):
(26) 2 句意: 请写得再认真一些。（ていねい: 细心，认真）1. 请把字写大一些。2. 请写得更整齐一些。3. 请把字写粗一些。4. 请写得更简单一些。"""
        },
        27: {
            "snippet": "あには えが うまいです。 ≒ あには えが じょうずです。",
            "correctOption": 1,
            "explanation": """🎯 Đáp án đúng: [1] あには えが じょうずです。

💬 Dịch nghĩa câu đề bài:
「あには えが うまいです。」
-> "Anh trai tôi vẽ tranh rất giỏi."

💡 Phân tích từ đồng nghĩa:
• Tính từ 「うまい」 ngoài nghĩa thức ăn ngon còn mang nghĩa kỹ năng, tay nghề cao cường, "giỏi giang/khéo léo".
• Đồng nghĩa tuyệt đối với 「上手だ (じょうずだ)」: 「あには えが じょうずです」.

🔍 Phân tích các lựa chọn trong đề thi:
- 1. あには えが じょうずです: ĐÚNG - Anh tôi vẽ giỏi (じょうずだ)
- 2. あには えが きらいです: Anh tôi ghét vẽ (きらい)
- 3. あには えが へたです: Anh tôi vẽ vụng về, dở (へた)
- 4. あには えが すきです: Anh tôi thích vẽ (すき)

📄 Trích PDF gốc (Trang 18 - 试题解析):
(27) 1 句意: 哥哥很擅长画画。（うまい: 高明）1. 哥哥很会画画。2. 哥哥不喜欢画。3. 哥哥不擅长画画。4. 哥哥喜欢画。"""
        },
        28: {
            "snippet": "きのうは ねぼうしました。 ≒ きのうは おきるのが おそく なって しまいました。",
            "correctOption": 3,
            "explanation": """🎯 Đáp án đúng: [3] きのうは おきるのが おそく なって しまいました。

💬 Dịch nghĩa câu đề bài:
「きのうは ねぼうしました。」
-> "Hôm qua tôi đã ngủ nướng / ngủ quên dậy muộn."

💡 Phân tích từ đồng nghĩa:
• Động từ 「ねぼうする (寝坊する)」: ngủ nướng quá giờ dự định.
• Tương đương với cách nói: Việc thức dậy đã bị muộn mất: 「起きるのが遅くなってしまいました」.

🔍 Phân tích các lựa chọn trong đề thi:
- 1. きのうは ねるのが おそく なって しまいました: Đi ngủ muộn (ねる)
- 2. きのうは はやく ねて しまいました: Đi ngủ sớm (はやくねる)
- 3. きのうは おきるのが おそく なって しまいました: ĐÚNG - Thức dậy muộn (おきるのがおそい)
- 4. きのうは はやく おきて しまいました: Dậy sớm (はやくおきる)

📄 Trích PDF gốc (Trang 18 - 试题解析):
(28) 3 句意: 昨天早上睡了懒觉。（ねぼう: 睡懒觉）1. 昨天睡晚了。2. 昨天睡得很早。3. 昨天起晚了。4. 昨天起得很早。"""
        },
        29: {
            "snippet": "たなかさんは 先生に ほめられました。 ≒ 「とても よかったですよ」と言いました。",
            "correctOption": 2,
            "explanation": """🎯 Đáp án đúng: [2] 先生は たなかさんに「とても よかったですよ」と言いました。

💬 Dịch nghĩa câu đề bài:
「たなかさんは 先生に ほめられました。」
-> "Bạn Tanaka đã được thầy giáo khen ngợi."

💡 Phân tích từ đồng nghĩa:
• Động từ bị động: 「ほめられる (褒められる)」: được khen ngợi, tán dương.
• Câu nói mang sắc thái khen ngợi, động viên là: 「とても よかったですよ」 (Làm rất tốt đấy / Xuất sắc lắm).

🔍 Phân tích các lựa chọn trong đề thi:
- 1. 「気をつけてね」 (Hãy cẩn thận nhé - lời nhắc nhở)
- 2. 「とても よかったですよ」: ĐÚNG - Lời khen ngợi thành tích, biểu dương
- 3. 「ちょっと 休みましょう」 (Nghỉ ngơi chút đi - rủ nghỉ ngơi)
- 4. 「たいへんですね」 (Vất vả cực nhọc quá nhỉ - lời an ủi)

📄 Trích PDF gốc (Trang 18 - 试题解析):
(29) 2 句意: 田中被老师表扬了。（ほめる: 称赞，夸奖）1. 老师对田中说：“注意啊。” 2. 老师对田中说：“非常棒。” 3. 老师对田中说：“休息一下吧。” 4. 老师对田中说：“真糟糕啊。”"""
        },
        30: {
            "snippet": "留守 (るす): ともだちの いえに 行ったら るすでした。",
            "correctOption": 4,
            "explanation": """🎯 Đáp án đúng: [4] ともだちの いえに 行ったら るすでした。

💬 Phân tích cách dùng từ 「るす (留守)」:
• Danh từ 「留守 (るす)」 có nghĩa là "vắng nhà, đi vắng" (người không có ở nhà lúc người khác ghé qua).
• Câu sử dụng đúng chuẩn: 「ともだちの いえに 行ったら るすでした。」 (Khi tôi ghé qua nhà bạn thì bạn lại đi vắng).

🔍 Phân tích lỗi sai của các phương án còn lại:
- 1. しごとが るすに なりません: Sai, công việc bận rộn không dứt phải dùng 「終わり (おわり)」.
- 2. あの デパートは きょうは るすです: Sai, trung tâm bách hóa đóng cửa nghỉ bán phải dùng 「休み (やすみ)」.
- 3. この ひこうきには るすの せきが ありません: Sai, máy bay không còn ghế trống phải dùng 「空き (あき) の席」.
- 4. ともだちの いえに 行ったら るすでした: ĐÚNG - Dùng cho người vắng nhà.

📄 Trích PDF gốc (Trang 18 - 试题解析):
(30) 4 るす 意思是“不在家”，选项4为正确应用。1. 終わり: 最近很忙，工作怎么都做不完。2. やすみ: 那家超市今天休业。3. 空き: 这趟飞机没有空位。4. 去了朋友家的话，就不在家。"""
        },
        31: {
            "snippet": "親切 (しんせつ): この びょういんの おいしゃさんは とても しんせつですよ。",
            "correctOption": 3,
            "explanation": """🎯 Đáp án đúng: [3] この びょういんの おいしゃさんは とても しんせつですよ。

💬 Phân tích cách dùng từ 「しんせつ (親切)」:
• Tính từ đuôi な 「親切 (しんせつ)」 có nghĩa là "thân thiện, tốt bụng, nhiệt tình, ân cần" (dùng để miêu tả tính cách, tấm lòng và thái độ đối xử của con người với người khác).
• Câu sử dụng đúng chuẩn: 「この びょういんの おいしゃさんは とても しんせつですよ。」 (Bác sĩ của bệnh viện này rất thân thiện và ân cần chu đáo).

🔍 Phân tích lỗi sai của các phương án còn lại:
- 1. この りょうりは からだに とても しんせつです: Sai, món ăn tốt cho sức khỏe phải dùng 「からだに いい」.
- 2. コンビニは 何でも 買えるので とても しんせつです: Sai, cửa hàng tiện ích mua sắm dễ dàng phải dùng 「便利 (べんり)」.
- 3. この びょういんの おいしゃさんは とても しんせつですよ: ĐÚNG - Bác sĩ thân thiện, nhiệt tình.
- 4. わたしの 母は にわの 花に とても しんせつです: Sai, chăm sóc hoa cẩn thận yêu thương phải dùng 「丁寧 (ていねい)」 hoặc 「かわいがる」.

📄 Trích PDF gốc (Trang 18 - 试题解析):
(31) 3 しんせつ 意思是“热情，亲切”，选项3为正确应用。1. いい: 这道菜对身体很好。2. 便利: 超市里什么都能买到，十分方便。3. 这家医院的医生非常亲切。4. 丁寧: 我妈妈非常爱护庭院里的花。"""
        },
        32: {
            "snippet": "苦い (にがい): この くすりは とても にがいです。",
            "correctOption": 4,
            "explanation": """🎯 Đáp án đúng: [4] この くすりは とても にがいです。

💬 Phân tích cách dùng từ 「にがい (苦い)」:
• Tính từ đuôi い 「苦い (にがい)」 có nghĩa là vị "đắng" (vị giác khi nếm thuốc, trà đặc, mướp đắng...).
• Câu sử dụng đúng chuẩn: 「この くすりは とても にがいです。」 (Loại thuốc này có vị rất đắng).

🔍 Phân tích lỗi sai của các phương án còn lại:
- 1. こえが にがいです: Sai, bị cảm giọng khàn đặc phải dùng 「声が かれた / 太い」.
- 2. くらい みちを 一人で あるくのは にがいです: Sai, đi đường tối một mình nguy hiểm phải dùng 「危ない (あぶない) / 危険 (きけん)」.
- 3. にもつが おもかったので、うでが にがいです: Sai, xách hành lý nặng mỏi nhừ cánh tay phải dùng 「怠い (だるい) / 痛い (いたい)」.
- 4. この くすりは とても にがいです: ĐÚNG - Thuốc đắng.

📄 Trích PDF gốc (Trang 18 - 试题解析):
(32) 4 にがい 意思是“苦”，选项4为正确应用。1. 太い/かれた: 感冒了，声音哑了。2. 危ない: 一个人走在黑暗的路上很危险。3. 怠い: 行李很重，胳膊都提酸了。4. 这种药很苦。"""
        },
        33: {
            "snippet": "割る (わる): おさらを おとして わって しまいました。",
            "correctOption": 1,
            "explanation": """🎯 Đáp án đúng: [1] おさらを おとして わって しまいました。

💬 Phân tích cách dùng từ 「わる (割る)」:
• Tha động từ 「割る (わる)」 có nghĩa là "làm vỡ, đập vỡ, làm bể" (chuyên dùng cho các vật cứng, giòn, dễ vỡ như đĩa bát sành sứ, ly cốc thủy tinh, quả trứng...).
• Câu sử dụng đúng chuẩn: 「おさらを おとして わって しまいました。」 (Tôi lỡ tay làm rơi và làm vỡ tan chiếc đĩa mất rồi).

🔍 Phân tích lỗi sai của các phương án còn lại:
- 1. おさらを おとして わって しまいました: ĐÚNG - Làm rơi vỡ đĩa sứ.
- 2. しんぶんを わって、かばんに 入れました: Sai, gấp gập tờ báo phải dùng 「折る (おる)」.
- 3. ようふくを わって、母に おこられました: Sai, xé rách quần áo vải vóc phải dùng 「破る (やぶる)」.
- 4. この ジャムを 三本の びんに わって ください: Sai, chia đều mứt vào 3 lọ phải dùng 「分ける (わける)」.

📄 Trích PDF gốc (Trang 18 - 试题解析):
(33) 1 わる 意思是“打坏，弄碎”，选项1为正确应用。1. 盘子掉了，摔碎了。2. 折る: 把报纸折起来，放进了包里。3. 破る: 把衣服弄破了，所以被妈妈骂了。4. 分ける: 把果酱分装进三个瓶子里。"""
        },
        34: {
            "snippet": "遅刻 (ちこく): じゅぎょうに ちこくして すみません。",
            "correctOption": 2,
            "explanation": """🎯 Đáp án đúng: [2] じゅぎょうに ちこくして すみません。

💬 Phân tích cách dùng từ 「ちこく (遅刻)」:
• Danh động từ 「遅刻する (ちこくする)」 có nghĩa là "đi muộn, đến trễ" đối với giờ học, buổi họp, ca làm việc (dùng cho con người đến muộn so với giờ quy định).
• Cấu trúc chuẩn: 「～に 遅刻する」 -> 「授業に 遅刻して すみません」 (Em xin lỗi vì đã đến muộn giờ học ạ).

🔍 Phân tích lỗi sai của các phương án còn lại:
- 1. あの とけいは ちょっと ちこくして います: Sai, đồng hồ chạy chậm phải dùng 「遅れる (おくれる)」.
- 2. じゅぎょうに ちこくして すみません: ĐÚNG - Đến muộn giờ học.
- 3. 10時の でんしゃに ちこくして しまいました: Sai, lỡ/trễ chuyến tàu phải dùng 「乗り遅れる (のりおくれる)」 hoặc 「間に合わなかった」.
- 4. れんらくが ちこくして すみません: Sai, liên lạc trễ/chậm chạp phải dùng 「遅くなる (おそくなって)」.

📄 Trích PDF gốc (Trang 18 - 试题解析):
(34) 2 ちこく 意思是“迟到”，选项2为正确应用。1. 遅れる: 那个钟走得有点慢。2. 不好意思，我上课迟到了。3. 遅れる: 没赶上10点的电车。4. 遅くなる: 联络晚了，不好意思。"""
        }
    }

def apply_n4_2012():
    vocab_data = get_n4_2012_vocab_16_34()
    print(f"Loaded {len(vocab_data)} authentic vocab explanations for N4 2012-12.")

    # 1. Update master_gold_explanations.json
    master_path = os.path.join(os.path.dirname(__file__), "master_gold_explanations.json")
    if os.path.exists(master_path):
        with open(master_path, "r", encoding="utf-8") as f:
            master = json.load(f)
        if "n4-2012-12" in master:
            for q_idx, item in vocab_data.items():
                master["n4-2012-12"][str(q_idx)] = item
            with open(master_path, "w", encoding="utf-8") as f:
                json.dump(master, f, ensure_ascii=False, indent=2)
            print(f"Updated {master_path} successfully!")

    # 2. Update jlptDetailedExplanations.ts with both n4-2010-2011 and n4-2012-12
    ts_file = r"h:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts"
    if os.path.exists(master_path):
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
                sorted_keys = sorted([int(k) for k in q_map.keys()])
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
        print(f"Updated {ts_file} with exams {all_exams_to_export} (Size: {os.path.getsize(ts_file)} bytes)!")

    # 3. Update server_admin_exams.json and scratch/server_admin_exams.json
    for json_path in [
        r"h:\JP_ANHSENSEI\frontend\src\app\data\server_admin_exams.json",
        r"h:\JP_ANHSENSEI\scratch\server_admin_exams.json"
    ]:
        if os.path.exists(json_path):
            with open(json_path, "r", encoding="utf-8") as f:
                admin_data = json.load(f)
            exams = admin_data.get("exams", [])
            ex2 = next((e for e in exams if e.get("id") == "ex-2" or e.get("examCode") == "n4-2012-12"), None)
            if ex2 and ex2.get("versions"):
                v = ex2["versions"][0]
                qs = v.get("questions", {})
                updated_count = 0
                for q_idx, item in vocab_data.items():
                    s_key = str(q_idx)
                    if s_key in qs:
                        q_obj = qs[s_key]
                        q_obj["snippet"] = item["snippet"]
                        q_obj["explanation"] = item["explanation"]
                        q_obj["correctOption"] = item["correctOption"]
                        q_obj["correctAnswer"] = item["correctOption"]
                        q_obj["optionText"] = f"Phương án [{item['correctOption']}]"
                        updated_count += 1
                with open(json_path, "w", encoding="utf-8") as f:
                    json.dump(admin_data, f, ensure_ascii=False, indent=2)
                print(f"Updated {updated_count} questions in {json_path}!")

if __name__ == "__main__":
    apply_n4_2012()

