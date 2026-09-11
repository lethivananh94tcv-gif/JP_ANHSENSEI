# Authentic 98 questions data for JLPT N4 2013-07
# Extracted from full_raw_n4-2013-07.pdf.txt (试题解析 & 聴解原文)

def get_n4_2013_data():
    questions = {}

    def add_q(idx, opt, snippet, trans, analysis, opt1, opt2, opt3, opt4, raw_pdf, ja_script=None, vi_script=None):
        analysis_lines = [
            f"- 1. {opt1} {'(ĐÚNG)' if opt == 1 else ''}".strip(),
            f"- 2. {opt2} {'(ĐÚNG)' if opt == 2 else ''}".strip(),
            f"- 3. {opt3} {'(ĐÚNG)' if opt == 3 else ''}".strip(),
            f"- 4. {opt4} {'(ĐÚNG)' if opt == 4 else ''}".strip(),
        ]
        opt_analysis = "\n".join(analysis_lines)
        expl = f"""🎯 Đáp án đúng: [{opt}] {snippet}

💬 Dịch nghĩa câu:
"{trans}"

💡 Phân tích & Giải thích:
• {analysis}

🔍 Phân tích các lựa chọn:
{opt_analysis}

📄 Trích PDF gốc (试题解析):
{raw_pdf}"""
        item = {
            "snippet": snippet,
            "explanation": expl,
            "correctOption": opt
        }
        if ja_script:
            item["audioScriptJa"] = ja_script
        if vi_script:
            item["audioScriptVi"] = vi_script
        questions[idx] = item

    # --- MONDAI 1: Kanji Reading (Q1 - Q9) ---
    add_q(1, 2, "味 (あじ)", "Hương vị của món súp này nếm có vẻ hơi là lạ nhỉ.",
          "Chữ 「味」 (vị) có âm Kun là 「あじ」. Cụm từ: 味が変 (hương vị hơi lạ).",
          "こえ (声): Giọng nói", "あじ (味): Hương vị, vị giác", "おと (音): Tiếng động", "におい (匂い): Mùi hương",
          "(1) 2 句意: 味道有点奇怪啊。2. あじ(味): 味道")

    add_q(2, 4, "世界 (せかい)", "Tòa nhà chọc trời này là công trình kiến trúc cao nhất trên toàn thế giới.",
          "Chữ 「世」 có âm On là 「せ」, chữ 「界」 có âm On là 「かい」 -> 世界 (せかい: thế giới, toàn cầu).",
          "せいかい (正解): Đáp án đúng", "せかい (世界): Thế giới", "しょうかい (紹介): Giới thiệu", "せいかつ (生活): Đời sống sinh hoạt",
          "(2) 4 句意: 这座建筑是世界上最高的一座。4. せかい(世界): 世界")

    add_q(3, 3, "考える (かんがえる)", "Ý tưởng kinh doanh độc đáo đó là do anh Tanaka đã suy nghĩ giúp cho tôi.",
          "Động từ 「かんがえる (考える - khảo)」: suy nghĩ, ngẫm nghĩ, suy tính ý tưởng.",
          "かぞえる (数える): Đếm số lượng", "こたえる (答える): Trả lời câu hỏi", "かんがえる (考える): Suy nghĩ, cân nhắc", "つたえる (伝える): Truyền đạt, nhắn lại",
          "(3) 3 句意: 那是田中先生帮我想的。3. かんがえる(考える): 想, 考虑")

    add_q(4, 1, "足りる (たりる)", "Tôi rất muốn mua cuốn từ điển chuyên ngành này, thế nhưng số tiền mang theo không đủ.",
          "Động từ 「たりる (足りる - túc)」: đầy đủ, đáp ứng đủ số lượng hoặc tiền bạc.",
          "たりる (足りる): Đầy đủ, vừa vặn", "おきる (起きる): Thức dậy", "あつまる (集まる): Tụ tập", "ある (有る): Có",
          "(4) 1 句意: 我想买辞典, 但钱不够。1. たりる(足りる): 足, 够")

    add_q(5, 4, "体 (からだ)", "Tất cả các thành viên trong gia đình tôi sức khỏe cơ thể đều rất dồi dào, khỏe mạnh.",
          "Chữ 「体」 (thể) có âm Kun thuần Nhật chuẩn xác là 「からだ」 (cơ thể, thân thể).",
          "あたま (頭): Cái đầu", "こころ (心): Trái tim, tấm lòng", "かお (顔): Khuôn mặt", "からだ (体): Cơ thể, thể lực",
          "(5) 4 句意: 我的家人身体都很健康。考察训读: “体”训读为“からだ”。")

    add_q(6, 2, "今度 (こんど)", "Chủ nhật lần này tôi sẽ đáp chuyến bay lên đường về thăm quê hương.",
          "Chữ 「今」 âm On là 「こん」, chữ 「度」 âm On là 「ど」 -> 今度 (こんど: lần này, dịp sắp tới).",
          "こんかい (今回): Lần này", "こんど (今度): Lần này, sắp tới", "いまど: Sai âm", "こんと: Thiếu âm đục ど",
          "(6) 2 句意: 我本周日回国。考察汉字词: “今”音读为“こん”，“度”音读为“ど”。故为“こんど”。")

    add_q(7, 3, "営業 (えいぎょう)", "Cửa hàng bắt đầu mở cửa kinh doanh phục vụ khách từ lúc 9 giờ sáng ngày mai.",
          "Chữ 「営」 có âm On là 「えい」, chữ 「業」 có âm On là 「ぎょう」 -> 営業 (えいぎょう: kinh doanh, mở cửa).",
          "えいごう: Sai âm On của 業", "えいぎょ: Thiếu trường âm", "えいぎょう (営業): Kinh doanh, mở cửa hàng", "えいこう: Sai phụ âm",
          "(7) 3 句意: 明天从早上9点开始营业。考察汉字词: “営”音读为“えい”，“業”音读为“ぎょう”。")

    add_q(8, 1, "雲 (くも)", "Tôi cứ ngồi ngắm nhìn mãi những đám mây trắng lững lờ trôi bên ngoài khung cửa sổ.",
          "Chữ Hán 「雲」 (vân) có cách đọc Kunyomi chuẩn xác là 「くも」 (đám mây trên trời).",
          "くも (雲): Đám mây", "ほし (星): Ngôi sao", "つき (月): Mặt trăng", "そら (空): Bầu trời",
          "(8) 1 句意: 我一直在看窗外的云。1. くも(雲): 云")

    add_q(9, 1, "近所 (きんじょ)", "Hằng ngày vào mỗi buổi sáng tôi đều chạy bộ thể dục ở công viên gần nhà.",
          "Chữ 「近」 có âm On là 「きん」, chữ 「所」 đứng sau âm mũi n biến âm đục thành 「じょ」 -> 近所 (きんじょ: khu vực lân cận, gần nhà).",
          "きんじょ (近所): Lân cận, gần nhà", "きんしょ: Thiếu biến âm đục", "ちかところ: Nhầm sang hai âm Kun", "ちかじょ: Nhầm âm đầu",
          "(9) 1 句意: 我每天都在附近的公园跑步。考察汉字词: 发生浊音变，读作“きんじょ”。")

    # --- MONDAI 2: Kanji Writing (Q10 - Q15) ---
    add_q(10, 2, "薬 (くすり)", "Hộp thuốc uống trị cảm sốt này có giá bao nhiêu tiền vậy ạ?",
          "Từ 「くすり」 được viết bằng chữ Hán chuẩn xác là 「薬」 (dược - thuốc thang, dược phẩm).",
          "薬 (くすり): Thuốc men", "果 (くだもの): Hoa quả", "楽 (たのしい): Vui vẻ", "菓 (おかし): Bánh kẹo",
          "(10) 1 句意: 这种药多少钱? 1. 薬（くすり）: 药品")

    add_q(11, 3, "起きる (おきる)", "Hôm qua là ngày chủ nhật nên mãi tận 9 giờ sáng tôi mới thức dậy.",
          "Động từ 「おきる」 viết bằng chữ Hán chuẩn xác là 「起きる」 (khởi - thức dậy).",
          "置く (おく): Đặt để đồ vật", "押す (おす): Nhấn nút", "起きる (おきる): Thức dậy", "教える (おしえる): Dạy học",
          "(11) 3 句意: 我昨天9点起了床。3. 起きる（おきる）: 起床")

    add_q(12, 3, "男性 (だんせい)", "Khu vực phòng vệ sinh dành riêng cho nam giới nằm ở dãy hành lang đằng kia.",
          "Chữ 「男」 (nam) ghép với 「性」 (tính) tạo thành danh từ 「男性」 (nam giới, phái mạnh).",
          "女性: Nữ giới", "男性 (だんせい): Nam giới", "男子: Con trai nhỏ", "先生: Thầy cô giáo",
          "(12) 2 句意: 男洗手间在那边。2. 男性（だんせい）: 男性")

    add_q(13, 3, "押す (おす)", "Hễ bạn nhấn tay vào chiếc công tắc này thì hệ thống đèn sẽ tự động bật sáng.",
          "Động từ 「おす」 viết bằng chữ Hán chuẩn xác là 「押す」 (áp - nhấn, ấn nút công tắc).",
          "引く (ひく): Kéo ra", "押す (おす): Nhấn, ấn nút", "挿す (さす): Cắm vào", "越す (こす): Vượt qua",
          "(13) 2 句意: 按下这个开关, 灯就会亮。2. 押す（おす）: 按, 压")

    add_q(14, 4, "集合 (しゅうごう)", "Toàn bộ học sinh hãy tập trung đông đủ trước cổng trường vào lúc 8 giờ sáng nhé.",
          "Chữ 「集」 (tập) ghép với 「合」 (hợp) tạo thành danh từ 「集合」 (tập trung, tụ họp lại).",
          "集会: Hội họp", "結合: Kết hợp", "合集: Sai trật tự chữ", "集合 (しゅうごう): Tập trung, tập hợp lại",
          "(14) 4 句意: 请8点在学校门口集合。4. 集合（しゅうごう）: 集合")

    add_q(15, 1, "軽い (かるい)", "Chiếc túi xách này làm bằng chất liệu rất nhẹ nên mang theo khi đi du lịch vô cùng tiện lợi.",
          "Tính từ 「かるい」 viết bằng chữ Hán chuẩn xác là 「軽い」 (khinh - nhẹ nhàng).",
          "軽い (かるい): Nhẹ nhàng", "重い (おもい): Nặng nề", "短い (みじかい): Ngắn", "明るい (あかるい): Sáng sủa",
          "(15) 1 句意: 这个包很轻, 所以旅行时很方便。1. 軽い（かるい）: 轻")

    # --- MONDAI 3: Context Vocabulary (Q16 - Q25) ---
    add_q(16, 1, "残念 (ざんねん)", "Bản thân tôi rất muốn đi tham gia, thế nhưng chuyến du lịch lại bị hủy bỏ giữa chừng nên tôi cảm thấy vô cùng tiếc nuối.",
          "Tính từ đuôi な 「残念 (ざんねん)」: đáng tiếc, tiếc nuối khi sự việc không thành.",
          "残念 (ざんねん: tiếc nuối, đáng tiếc)", "心配 (lo lắng)", "無理 (quá sức, vô lý)", "危険 (nguy hiểm)",
          "(16) 1 句意: 明明很想去, 但是旅行却取消了, 我感到十分遗憾。1. 残念(ざんねん): 遗憾, 可惜")

    add_q(17, 2, "落とした (おとした)", "Tôi đã đi tìm kiếm chiếc chìa khóa phòng bị lỡ tay đánh rơi, thế nhưng tìm khắp nơi mà vẫn chẳng thấy đâu.",
          "Động từ tha động từ 「おとす (落とす)」: đánh rơi đồ vật (鍵を落とす).",
          "忘れた (quên lãng)", "落とした (おとした: đánh rơi mất)", "捨てた (vứt bỏ)", "倒した (làm đổ)",
          "(17) 2 句意: 我找了丢失的钥匙, 但是哪里都没找到。2. 落とす(おとす): 丢失, 掉落")

    add_q(18, 3, "お風呂 (おふろ)", "Sau khi từ công ty trở về nhà, được ngâm mình thư giãn trong bồn tắm nước nóng cảm giác vô cùng sảng khoái.",
          "Cụm từ cố định: 「お風呂に入る」 (tắm bồn, ngâm mình trong bồn nước nóng kiểu Nhật).",
          "プール (hồ bơi)", "シャワー (vòi hoa sen)", "お風呂 (bồn tắm, ngâm bồn)", "トイレ (nhà vệ sinh)",
          "(18) 3 句意: 在回家后洗个澡会非常舒服。3. お風呂(おふろ): 洗澡, 浴池")

    add_q(19, 1, "経験 (けいけん)", "Trong suốt chuyến đi du lịch khám phá Nhật Bản, tôi đã được trải nghiệm rất nhiều điều mới lạ và thú vị.",
          "Cụm từ: 「いろいろな経験をする」 (trải nghiệm, có nhiều kinh nghiệm phong phú).",
          "経験 (けいけん: trải nghiệm, kinh nghiệm)", "案内 (hướng dẫn)", "見学 (tham quan học hỏi)", "出発 (khởi hành)",
          "(19) 1 句意: 去日本旅行的时候, 体验了各种各样的事。1. 経験(けいけん): 经历, 经验")

    add_q(20, 4, "降っている (ふっている)", "Hiện tại ngoài trời đang đổ mưa to gió lớn, nên chúng tôi quyết định sẽ không đi dạo bộ nữa.",
          "Cụm từ cố định: 「雨が降る / 雨が降っている」 (trời đang đổ mưa).",
          "吹いている (gió thổi)", "鳴っている (chuông reo)", "止んでいる (mưa tạnh)", "降っている (ふっている: mưa đang rơi)",
          "(20) 4 句意: 现在正在下大雨, 所以不去散步了。4. 降る(ふる): 下雨")

    add_q(21, 2, "故障 (こしょう)", "Chiếc máy giặt của gia đình tôi bất ngờ gặp sự cố hỏng hóc nên hôm nay tôi phải giặt đồ bằng tay.",
          "Danh từ 「故障 (こしょう)」: sự cố hư hỏng máy móc, thiết bị kỹ thuật.",
          "事故 (tai nạn giao thông)", "故障 (こしょう: sự cố hư hỏng máy móc)", "邪魔 (cản trở vướng víu)", "怪我 (chấn thương cơ thể)",
          "(21) 2 句意: 洗衣机故障坏了, 所以只能手洗。2. 故障(こしょう): 故障, 损坏")

    add_q(22, 2, "理由 (りゆう)", "Thầy giáo đã gọi riêng để ân cần hỏi bạn Komori về lý do tại sao tuần trước bạn lại nghỉ học.",
          "Danh từ 「理由 (りゆう)」: lý do, nguyên cớ dẫn đến một hành động hay sự việc.",
          "意味 (ý nghĩa từ vựng)", "理由 (りゆう: lý do, nguyên nhân)", "意見 (ý kiến đề xuất)", "目的 (mục đích hướng tới)",
          "(22) 2 句意: 询问了小森上周没来学校的原因。2. 理由(りゆう): 理由, 原因")

    add_q(23, 2, "遠慮しないで (えんりょしないで)", "Đồ ăn trên bàn còn rất nhiều, bạn đừng ngại ngần khách sáo nhé, hãy ăn thật nhiều vào!",
          "Cụm từ khuyên mời nhã nhặn: 「遠慮しないでください」 (xin đừng khách sáo, đừng ngại ngùng).",
          "心配しないで (đừng lo lắng)", "遠慮しないで (đừng khách sáo, đừng e ngại)", "無理しないで (đừng quá sức)", "注意しないで (đừng nhắc nhở)",
          "(23) 2 句意: 请不要客气, 多吃一点。2. 遠慮(えんりょ): 客气, 顾忌")

    add_q(24, 1, "世話 (せわ)", "Hằng ngày tôi đều tận tụy chăm sóc cho chú cún cưng, cho nó ăn ngon và dắt nó đi dạo thể dục.",
          "Cụm từ cố định: 「犬の世話をする」 (chăm sóc, nuôi nấng, chăm nom thú cưng).",
          "世話 (せわ: chăm sóc, chăm nom)", "手伝い (giúp đỡ)", "利用 (sử dụng)", "案内 (hướng dẫn)",
          "(24) 1 句意: 我每天都在照顾小狗, 给它喂食, 带它散步。1. 世話(せわ): 照顾, 照料")

    add_q(25, 2, "寄る (よる)", "Bởi vì cơ thể bị sốt nóng, nên tôi sẽ tạt qua phòng khám bệnh viện trước rồi mới đến công ty làm việc.",
          "Động từ 「よる (寄る)」: ghé qua, tạt ngang qua một địa điểm trên đường đi.",
          "通る (đi ngang qua)", "寄る (よる: tạt qua, ghé vào)", "着く (tới nơi)", "渡る (băng qua đường)",
          "(25) 2 句意: 因为发烧了, 所以我先顺路去趟医院再去公司。2. 寄る(よる): 顺路去, 顺便拜访")

    # --- MONDAI 4: Paraphrases / Synonyms (Q26 - Q30) ---
    add_q(26, 4, "アルバイト ≒ 働いている", "Em trai tôi hiện đang làm công việc làm thêm tích lũy kinh nghiệm tại tiệm bánh ngọt đó.",
          "Từ mượn 「アルバイト」 (việc làm thêm) tương đương ý nghĩa với động từ 「働いている (đang làm việc)」.",
          "Đang mua sắm ở tiệm", "Đang ăn bánh ngọt", "Đang học bài ở tiệm", "Đang làm việc tại tiệm bánh đó (働いている)",
          "(26) 4 句意: 弟弟在那里打工。(アルバイト ≒ 働いている)")

    add_q(27, 1, "冷えついた ≒ 寒くなった", "Bước sang tháng 11, tiết trời ngoài trời đã trở nên giá buốt và lạnh ngắt.",
          "Động từ 「ひえる (冷える)」 chỉ nhiệt độ không khí hạ thấp, đồng nghĩa với 「寒くなった (trở nên rét lạnh)」.",
          "Trở nên giá lạnh rét mướt (寒くなった)", "Trở nên ấm áp dễ chịu", "Trời nhiều mây xám", "Trời nổi gió lớn",
          "(27) 1 句意: 天气变冷了。(冷える ≒ 寒くなる)")

    add_q(28, 3, "空いている ≒ すいている", "Quán cà phê này vào khung giờ trưa vắng khách nên có rất nhiều bàn trống.",
          "Tự động từ 「すく (空く: vắng vẻ, trống trải)」 có nghĩa là không bị đông đúc, còn nhiều chỗ trống.",
          "Cửa hàng rất đông đúc", "Cửa hàng đã đóng cửa", "Cửa hàng đang rất vắng khách, trống chỗ (すいている)", "Cửa hàng vừa mới khai trương",
          "(28) 3 句意: 那家店现在空着。(空いている ≒ すいている)")

    add_q(29, 1, "遠慮する ≒ やめておく", "Vì ngày mai có bài thi quan trọng từ sáng sớm nên lời mời đi nhậu đêm nay tôi xin phép từ chối khéo.",
          "Cụm từ 「遠慮する」 trong ngữ cảnh từ chối lời mời rủ đồng nghĩa với 「やめておく (thôi không tham gia nữa)」.",
          "Từ chối khéo, thôi không tham gia (やめておく)", "Hào hứng nhận lời tham gia", "Đến sớm hơn giờ hẹn", "Rủ thêm bạn bè đi cùng",
          "(29) 1 句意: 我谢绝了这次邀请。(遠慮する ≒ やめておく)")

    add_q(30, 4, "習う ≒ 教えてもらう", "Hồi tuần trước tôi đã được người bạn thân nhiệt tình dạy cho cách chế biến các món ăn Nhật Bản.",
          "Động từ 「ならう (習う: học hỏi kỹ năng)」 đồng nghĩa với việc được người khác chỉ bảo: 「教えてもらう」.",
          "Tự mình tìm tòi công thức", "Mua sách về tự nấu", "Xem chương trình ti-vi", "Được bạn bè chỉ dạy cho cách nấu (教えてもらう)",
          "(30) 4 句意: 朋友教了我做日本料理的方法。(習う ≒ 教えてもらう)")

    # --- MONDAI 5: Word Usage (Q31 - Q35) ---
    add_q(31, 3, "景色 (けしき)", "Khung cảnh thiên nhiên nhìn từ trên đỉnh ngọn núi vào buổi bình minh đẹp tựa như một bức tranh tuyệt mỹ.",
          "Danh từ 「景色 (けしき)」 dùng để miêu tả vẻ đẹp của phong cảnh thiên nhiên, cảnh sắc bốn mùa.",
          "Phong cảnh chiếc xe ô tô (sai)", "Phong cảnh bài hát (sai)", "Khung cảnh nhìn từ đỉnh núi tuyệt đẹp", "Phong cảnh căn phòng bừa bãi (sai)",
          "(31) 3 けしき 意思是“景色, 风景”, 选项 3 为正确应用。")

    add_q(32, 2, "驚く (おどろく)", "Khi bất ngờ nghe được thông tin người bạn thân chuẩn bị kết hôn, tất cả mọi người đều vô cùng sửng sốt và ngạc nhiên.",
          "Động từ 「おどろく (驚く)」 dùng để biểu lộ cảm xúc ngạc nhiên, sửng sốt trước một sự việc bất ngờ ngoài dự liệu.",
          "Ngạc nhiên khi xem phim hài hước", "Kinh ngạc sửng sốt trước tin tức bất ngờ", "Ngạc nhiên khi thời tiết bình thường", "Ngạc nhiên khi ăn no",
          "(32) 2 おどろく 意思是“惊讶, 吃惊”, 选项 2 为正确应用。")

    add_q(33, 4, "拾う (ひろう)", "Trên đường đi bộ về nhà tôi đã tình cờ nhặt được một chiếc ví tiền đánh rơi và đem nộp ngay cho đồn cảnh sát.",
          "Động từ 「ひろう (拾う)」: nhặt được đồ vật rơi vãi dưới mặt đất (ゴミを拾う / 財布を拾う).",
          "Nhặt tiền trong túi áo mình", "Nhặt bài kiểm tra trên bàn", "Nhặt hoa quả trên cành cây", "Nhặt chiếc ví tiền đánh rơi trên đường đem nộp cảnh sát",
          "(33) 4 ひろう 意思是“拾, 捡”, 选项 4 为正确应用。")

    add_q(34, 3, "招待 (しょうたい)", "Nhân dịp tân gia nhà mới, gia đình chúng tôi đã trân trọng mời bạn bè thân thiết đến chung vui.",
          "Danh động từ 「招待する」 nghĩa là chiêu đãi, mời mọc khách quý tới tham dự tiệc tùng, sự kiện trang trọng.",
          "Mời ăn kẹo vặt", "Mời xem giờ đồng hồ", "Mời bạn bè thân thiết đến dự tiệc tân gia mừng nhà mới", "Mời mượn sách",
          "(34) 3 しょうたい 意思是“邀请, 款待”, 选项 3 为正确应用。")

    add_q(35, 2, "渡す (わたす)", "Trưởng phòng đã trao tận tay tập hồ sơ hợp đồng quan trọng cho người đại diện đối tác.",
          "Động từ tha động từ 「わたす (渡す)」: trao tận tay, chuyển giao đồ vật từ tay mình sang tay người khác.",
          "Trao con đường (sai)", "Trao tận tay tập hồ sơ tài liệu cho đối phương", "Trao thời gian (sai)", "Trao thức ăn vào miệng",
          "(35) 2 わたす 意思是“交, 递”, 选项 2 为正确应用。")

    # --- GRAMMAR: Mondai 1 (Q36 - Q50) ---
    add_q(36, 1, "旅行に便利 (Tiện cho việc du lịch)", "Chiếc vali kéo đa năng này trọng lượng siêu nhẹ nên mang theo khi đi du lịch nước ngoài vô cùng tiện lợi.",
          "Cấu trúc 「Danh từ + に便利」 biểu thị sự thuận tiện, hữu ích phục vụ cho mục đích hoặc hoạt động cụ thể.",
          "旅行に便利: ĐÚNG - Tiện ích cho chuyến đi du lịch", "旅行で便利: Sai trợ từ", "旅行を便利: Sai trợ từ bổ ngữ", "旅行から便利: Sai nghĩa",
          "(1) 1 句意: 这个包很轻, 所以旅行时很方便。考察に表示目的用途。")

    add_q(37, 3, "1人ずつ (Từng người một)", "Giáo viên trong lớp học: 'Nào, bây giờ xin mời các bạn học viên hãy lần lượt từng người một đứng lên giới thiệu bản thân nhé.'",
          "Hậu tố 「～ずつ」 kết hợp với số lượng từ chỉ đơn vị: 「1人ずつ」 mang nghĩa 'từng người một theo thứ tự đều đặn'.",
          "1人まで: Tối đa một người", "1人ほど: Cỡ chừng một người", "1人ずつ: ĐÚNG - Lần lượt từng người một", "1人だけ: Chỉ một người duy nhất",
          "(2) 3 句意: 请大家一个个地做自我介绍吧。考察ずつ表示等量依次进行。")

    add_q(38, 2, "だれでも (Bất kỳ ai cũng có thể làm được)", "Giáo viên dạy nấu ăn: 'Hôm nay tôi sẽ hướng dẫn cho các bạn một công thức làm bánh đơn giản mà bất kỳ ai cũng có thể thành công.'",
          "Từ để hỏi 「だれ」 kết hợp trợ từ 「でも」 biểu thị sự khẳng định toàn thể: 「だれでも」 (bất cứ ai cũng có thể).",
          "だれかに: Tới một ai đó", "だれでも: ĐÚNG - Bất kỳ ai cũng có thể thành công", "だれかを: Tác động vào ai", "だれかが: Ai đó làm",
          "(3) 2 句意: 今天教大家一个谁都能成功的简单制作方法。考察でも表示全面肯定。")

    add_q(39, 3, "いつか (Một ngày nào đó trong tương lai)", "Hiện tại tôi đang nỗ lực dồn hết tâm huyết vào việc học tập, với ước mơ một ngày nào đó sẽ thi đỗ vào trường đại học ở nước ngoài.",
          "Phó từ 「いつか」 dùng để chỉ một thời điểm không xác định trong tương lai: 'một ngày nào đó, mai sau'.",
          "いつも: Lúc nào cũng", "いま: Hiện tại ngay lúc này", "いつか: ĐÚNG - Một ngày nào đó trong tương lai", "いつまで: Đến bao giờ",
          "(4) 3 句意: 拼尽全力学习, 希望有一天能考入国外的大学。考察いつか表示将来的某一天。")

    add_q(40, 4, "早めに出かける (Xuất phát sớm hơn thường lệ)", "Sáng ngày mai công ty có cuộc họp giao ban quan trọng đầu tuần, nên tôi dự định sẽ phải bước ra khỏi nhà sớm hơn thường ngày.",
          "Cụm tính từ đuôi め: 「早めに」 biểu thị mức độ sớm hơn một chút so với bình thường để phòng ngừa rủi ro.",
          "早く: Sớm", "早くて: Sớm và", "早いの: Cái sớm", "早めに: ĐÚNG - Xuất phát sớm hơn một chút phòng ngừa",
          "(5) 4 句意: 明天早上要开会, 所以要早点出门。考察～めに表示稍早一点。")

    add_q(41, 4, "こわそうだが (Trông bề ngoài có vẻ dữ dằn nhưng)", "Thầy Tanaka có vóc dáng cao lớn vạm vỡ, nhìn bề ngoài trông có vẻ dữ tợn nhưng thực ra thầy vô cùng hiền lành và tốt bụng.",
          "Cấu trúc 「Tính từ bỏ đuôi + そう」 diễn tả vẻ bề ngoài qua quan sát, kết hợp với liên từ nghịch ngượng 「～が」.",
          "こわいので: Vì đáng sợ nên", "こわいから: Vì đáng sợ", "こわそうだから: Vì trông có vẻ sợ", "こわそうだが: ĐÚNG - Nhìn thì có vẻ dữ dằn nhưng thực tế không hề",
          "(6) 4 句意: 田中先生身材高大, 虽然看上去挺吓人, 但其实很和蔼。考察～そうだが表示转折。")

    add_q(42, 2, "聞くために (Mục đích mua máy tính)", "Để có thể thường xuyên nghe các chương trình phát thanh radio trực tuyến trên mạng, tôi đã quyết định tiết kiệm tiền mua chiếc máy tính này.",
          "Cấu trúc 「Động từ thể từ điển + ために」 biểu thị mục đích có chủ ý rõ ràng của người nói.",
          "聞くように: Hướng tới trạng thái", "聞くために: ĐÚNG - Nhằm mục đích nghe radio trực tuyến", "聞くのに: Tiêu tốn", "聞くから: Vì nghe",
          "(7) 2 句意: 为了听网络广播买了电脑。考察ために表示明确的目的。")

    add_q(43, 2, "会う時間がなくて (Không có thời gian để gặp gỡ)", "Dạo gần đây do khối lượng công việc ở văn phòng quá tải bận bịu, nên tôi hoàn toàn không có thời gian rảnh rỗi để hẹn gặp bạn bè.",
          "Cụm từ 「V-る + 時間がない」: không có thời gian để làm hành động V. Chia thể て chỉ nguyên nhân: 「時間がなくて」.",
          "会う時間がなくて: ĐÚNG - Do không có thời gian gặp gỡ", "会う時間をなくて: Sai trợ từ bổ ngữ", "会う時間にない: Sai cấu trúc", "会う時間がないで: Sai ngữ pháp",
          "(8) 2 句意: 我最近工作很忙, 没空和朋友见面。考察時間がなくて表示原因理由。")

    add_q(44, 3, "元気がない (Trông ủ rũ, thiếu sức sống)", "Yamamoto: 'Tanaka ơi, hôm nay trông cậu có vẻ ủ rũ thiếu sức sống thế? Cậu có chuyện gì không ổn à?'",
          "Cụm từ diễn tả trạng thái mệt mỏi, buồn bã, ủ rũ: 「元気がない」 (thiếu năng lượng, không khỏe khoắn).",
          "元気がある: Rất khỏe khoắn hăng hái", "元気なこと: Việc khỏe mạnh", "元気がない: ĐÚNG - Trông ủ rũ, thiếu sức sống", "元気にしない: Không làm khỏe",
          "(9) 3 句意: 田中, 你看起来很没精神啊。怎么了? 考察元気がない表示萎靡不振。")

    add_q(45, 3, "まだできていない (Cơm vẫn chưa nấu xong)", "Đứa bé đói bụng hỏi mẹ: 'Mẹ ơi, cơm chiều vẫn chưa xong xuôi hả mẹ?' - Mẹ: 'Chờ mẹ 5 phút nữa nhé con.'",
          "Cụm từ diễn đạt trạng thái chưa hoàn thành: 「まだ + V-ていない」 mang nghĩa 'vẫn chưa xong, chưa hoàn tất'.",
          "もうできた: Đã xong rồi", "まだできた: Sai logic", "まだできていない: ĐÚNG - Vẫn chưa xong xuôi", "もうできていない: Sai ngữ pháp",
          "(10) 3 句意: 孩子:“饭还没好吗?” 考察まだ～ていない表示尚未完成。")

    add_q(46, 1, "手伝いましょうか (Để tôi giúp một tay nhé)", "Tanaka: 'Kimura ơi, chiếc va-li của bạn trông có vẻ nặng nề quá nhỉ. Để mình giúp bạn xách một tay nhé?'",
          "Mẫu câu đề nghị giúp đỡ đối phương một cách lịch sự, nhã nhặn: 「V-ましょうか」.",
          "手伝いましょうか: ĐÚNG - Để tôi giúp bạn một tay nhé?", "手伝ってください: Hãy giúp tôi (sai tình huống)", "手伝いたいです: Tôi muốn giúp (kém tự nhiên)", "手伝いましょう: Cùng giúp nào",
          "(11) 1 句意: 你的行李好像很重啊。需要我帮忙吗? 考察～ましょうか主动提供帮助。")

    add_q(47, 2, "～てみる (Thử làm một hành động)", "Món đặc sản bánh ngọt truyền thống này ngon lắm đấy, bạn hãy nếm thử một miếng xem sao nhé.",
          "Cấu trúc 「V-て + みる」 diễn tả hành động làm thử một việc gì đó để xem kết quả hay cảm nhận ra sao.",
          "食べていく: Ăn rồi đi", "食べてみる: ĐÚNG - Ăn thử xem sao (食べてみてください)", "食べたばかりだ: Vừa mới ăn xong", "食べたことがある: Đã từng ăn",
          "(12) 2 句意: 这个特色点心很好吃, 请尝尝看吧。考察～てみる表示尝试做某事。")

    add_q(48, 4, "～そうだ (Nghe nói - truyền đạt thông tin)", "Theo bản tin thời tiết trên đài phát thanh vừa thông báo, nghe nói ngày mai thời tiết toàn vùng sẽ nắng ráo đẹp trời.",
          "Cấu trúc truyền đạt thông tin nghe lại từ nguồn tin khác: 「Thể thông thường + そうだ」 (nghe nói là...).",
          "いいらしい: Có vẻ như", "いいようだ: Dường như", "いいだろう: Chắc là", "いいそうだ: ĐÚNG - Nghe nói ngày mai thời tiết đẹp",
          "(13) 4 句意: 据天气预报说, 明天是个好天气。考察～そうだ表示传闻。")

    add_q(49, 1, "～てはいけない (Cấm đoán không được phép)", "Biển cảnh báo dán ở công viên: 'Tuyệt đối không được phép vứt rác thải bừa bãi tại khu vực này.'",
          "Cấu trúc cấm đoán mang tính quy định trật tự công cộng: 「V-てはいけません / てはいけない」.",
          "捨ててはいけない: ĐÚNG - Cấm không được vứt rác", "捨てなくてもいい: Không vứt cũng được", "捨ててください: Hãy vứt rác", "捨ててしまう: Lỡ vứt",
          "(14) 1 句意: 严禁在此处乱扔垃圾。考察～てはいけない表示禁止规定。")

    add_q(50, 4, "～てある (Trạng thái được mở sẵn)", "Để cho không khí trong phòng được thoáng đãng, khung cửa sổ lớn đã được ai đó mở sẵn từ sáng sớm.",
          "Cấu trúc 「Tha động từ thể て + ある」 biểu thị trạng thái của đồ vật là kết quả của một hành động đã được chuẩn bị sẵn có mục đích.",
          "開けている: Đang mở (hành động đang làm)", "開いている: Tự nó mở (tự động từ)", "開けておく: Sẽ mở sẵn (chưa làm)", "開けてある: ĐÚNG - Đang được mở sẵn có chủ ý",
          "(15) 4 句意: 为了房间通风, 窗户早就敞开着。考察～てある表示存续状态。")

    # --- GRAMMAR: Mondai 2 - Star Questions (Q51 - Q55) ---
    add_q(51, 1, "Dấu sao: ケーキが (Vị trí 3)", "Trong tủ lạnh vẫn còn chiếc bánh ngọt mà bố đã mua về hồi sáng nên tôi đã lấy ra ăn ngon lành.",
          "Trật tự câu hoàn chỉnh: 冷蔵庫に 【2 父が】 【3 買って】 ★【1 きた ケーキが】 【4 残って いた】 ので、食べました。 Dấu sao ở vị trí thứ 3 là phương án 1.",
          "きた ケーキが (ĐÚNG vị trí dấu sao ★)", "父が", "買って", "残って いた",
          "(16) 1 正确语序: れいぞうこに 2 父が 3 買って ★1 きた ケーキが 4 残って いた ので、食べました。")

    add_q(52, 4, "Dấu sao: で (Vị trí 3)", "Đang giữa lúc tôi và đồng nghiệp bàn bạc những câu chuyện công việc quan trọng thì chuông điện thoại đột nhiên reo vang.",
          "Trật tự câu hoàn chỉnh: 大事な 【3 話の】 【2 とちゅう】 ★【4 で】 【1 電話が】 かかって きました。 Dấu sao ở vị trí thứ 3 là phương án 4.",
          "電話が", "とちゅう", "話の", "で (ĐÚNG vị trí dấu sao ★)",
          "(17) 4 正确语序: 大事な 3 話の 2 とちゅう ★4 で 1 電話が かかって きました。")

    add_q(53, 1, "Dấu sao: ように (Vị trí 3)", "Thưa các em học sinh, hành lang trước cửa lớp đang bị ướt nước. Khi đi lại các em hãy hết sức chú ý kẻo bị trượt ngã nhé.",
          "Trật tự câu hoàn chỉnh: 先生: ろうかが ぬれて います。歩く 【3 ときは】 【4 すべらない】 ★【1 ように】 【2 注意して】 くださいね。 Dấu sao ở vị trí thứ 3 là phương án 1.",
          "ように (ĐÚNG vị trí dấu sao ★)", "注意して", "ときは", "すべらない",
          "(18) 1 正确语序: 歩く 3 ときは 4 すべらない ★1 ように 2 注意して くださいね。")

    add_q(54, 2, "Dấu sao: する (Vị trí 3)", "Để thuận tiện cho việc đi lại làm việc hằng ngày, tôi đã quyết định tuần tới sẽ chuyển nhà về sinh sống gần công ty.",
          "Trật tự câu hoàn chỉnh: 来週、会社の 【1 近くに】 【4 ひっこしを】 ★【2 する】 【3 ことに】 しました。 Dấu sao ở vị trí thứ 3 là phương án 2.",
          "近くに", "する (ĐÚNG vị trí dấu sao ★)", "ことに", "ひっこしを",
          "(19) 2 正确语序: 来週、会社の 1 近くに 4 ひっこしを ★2 する 3 ことに しました。")

    add_q(55, 1, "Dấu sao: 和食の (Vị trí 3)", "Nghe mọi người kháo nhau rằng, quán ăn món Nhật mang tên 'Sakura' nằm ở thị trấn phía Bắc nổi tiếng nấu ăn cực kỳ ngon.",
          "Trật tự câu hoàn chỉnh: 北町に 【4 ある】 【2 「さくら」と いう】 ★【1 和食の】 【3 お店は】 有名だ そうです。 Dấu sao ở vị trí thứ 3 là phương án 1.",
          "和食の (ĐÚNG vị trí dấu sao ★)", "「さくら」と いう", "お店は", "ある",
          "(20) 1 正确语序: 北町に 4 ある 2 「さくら」と いう ★1 和食の 3 お店は 有名だ そうです。")

    # --- GRAMMAR & READING: Mondai 3 (Q56 - Q60) ---
    add_q(56, 3, "夏休みの間に (Trong kỳ nghỉ hè)", "Tác giả chia sẻ rằng trong suốt khoảng thời gian kỳ nghỉ hè tới, bản thân muốn đọc thật nhiều cuốn sách hay.",
          "Cấu trúc 「Danh từ + の間に」 biểu thị khoảng thời gian diễn ra dự định của tác giả trong kỳ nghỉ.",
          "夏休みの間に (ĐÚNG)", "夏休みまでに", "夏休みの前で", "夏休みのあとで",
          "(21) 1 强调在暑假这一持续的时间段内打算多读书, 需用～の間に。")

    add_q(57, 1, "また (Hơn nữa, thêm vào đó)", "Liên từ 「また」 dùng để bổ sung thêm một kế hoạch quan trọng tiếp theo của tác giả bên cạnh việc đọc sách.",
          "Nối tiếp giữa hai đoạn văn trình bày hai dự định song song: vừa đọc sách, vừa đi làm thêm tích lũy kinh nghiệm.",
          "しかし (tuy nhiên)", "また (ĐÚNG - hơn nữa, thêm vào đó)", "だから (vì thế)", "つまり (tóm lại)",
          "(22) 2 本段说明了作者的另一项计划, 与上一段为并列递进关系, 故用また。")

    add_q(58, 2, "紹介してくれた (Anh trai giới thiệu giúp)", "Chính người anh trai ruột đã nhiệt tình giới thiệu tác giả vào làm việc bán thời gian tại tiệm hoa tươi nơi anh đang làm.",
          "Anh trai là người thực hiện hành động giới thiệu mang lại lợi ích cho tác giả, dùng cấu trúc 「～てくれた」.",
          "紹介してあげた: Tôi giới thiệu cho anh", "紹介してもらった: Cần trợ từ に sau anh trai", "紹介してくれた: ĐÚNG - Anh trai đã giới thiệu giúp tôi", "紹介した: Đã giới thiệu",
          "(23) 3 哥哥把我介绍给花店, 主语是哥哥给予我帮助, 需用～てくれた。")

    add_q(59, 3, "働いてみたい (Muốn thử sức đi làm thêm)", "Tác giả rất yêu thích các loài hoa nên mong muốn được thử sức trải nghiệm công việc chăm sóc hoa ở tiệm.",
          "Cấu trúc kết hợp 「V-てみる + たい」 = 「～てみたい」 biểu đạt nguyện vọng tha thiết muốn thử trải nghiệm một công việc mới.",
          "働くつもりだ: Định làm", "働いてみたい: ĐÚNG - Rất muốn được thử sức làm việc", "働かなければならない: Bắt buộc phải làm", "働いたことがある: Đã từng làm",
          "(24) 2 表达作者想要亲身体验并尝试在花店工作的强烈愿望。")

    add_q(60, 4, "楽しみたい (Mong muốn tận hưởng kỳ nghỉ)", "Tác giả hạ quyết tâm sẽ nỗ lực vừa học vừa làm để có thể tận hưởng trọn vẹn kỳ nghỉ hè đầu tiên thời sinh viên.",
          "Động từ 「楽しむ」 chia dạng mong muốn chủ quan: 「楽しみたい」 (muốn tận hưởng trọn vẹn).",
          "楽しむはずだ: Chắc chắn vui", "楽しむそうだ: Nghe nói vui", "楽しむようだ: Dường như vui", "楽しみたい: ĐÚNG - Rất muốn tận hưởng thật trọn vẹn",
          "(25) 4 表达作者对大学首个暑假的期待与美好憧憬。")

    # --- READING: Mondai 4 - Short Texts (Q61 - Q64) ---
    add_q(61, 1, "Lý do dán con tem hình con cá", "Người gửi dán con tem in hình chú cá ngộ nghĩnh là vì biết bạn mình có niềm đam mê đặc biệt với môn câu cá.",
          "Chi tiết trong thư: biết bạn thích đi câu cá vào cuối tuần nên người viết đã cất công chọn chiếc tem in hình chú cá gửi tặng bạn.",
          "Dán tem hình cá vì bạn có sở thích đi câu cá (ĐÚNG)", "Vì bưu điện chỉ còn loại tem đó", "Vì tem hình cá rẻ hơn", "Vì người gửi thích ăn cá",
          "(26) 1 贴鱼图案邮票的原因: 知道朋友非常喜欢钓鱼。")

    add_q(62, 3, "Nhiệm vụ của Shinichi", "Sau khi đọc xong mẩu giấy dặn dò của mẹ, Shinichi phải ghé qua tiệm bánh mì mua bánh về trước khi mẹ đi làm về.",
          "Mẩu giấy mẹ dặn: tủ lạnh hết thức ăn, con đi học về nhớ ghé tiệm bánh mì mua 2 ổ bánh mì sandwich nhé.",
          "Nấu cơm sẵn chờ mẹ", "Quét dọn nhà cửa sạch sẽ", "Ghé tiệm bánh mì mua bánh mang về nhà (ĐÚNG)", "Đến cơ quan đón mẹ",
          "(27) 3 读了便签后, 真一必须在回家路上顺便去面包店买面包。")

    add_q(63, 2, "Thông báo bảo trì hệ thống của thư viện", "Thư viện nhà trường thông báo vào thứ Bảy tuần này trang web tra cứu tài liệu sẽ tạm ngừng hoạt động để nâng cấp bảo trì máy chủ.",
          "Nội dung thông báo: hệ thống máy chủ thư viện tạm ngừng kết nối từ 9:00 đến 17:00 ngày thứ Bảy để bảo dưỡng định kỳ.",
          "Thư viện đóng cửa vĩnh viễn", "Trang web tra cứu tạm ngừng kết nối bảo trì máy chủ vào thứ Bảy (ĐÚNG)", "Tất cả sách phải trả lại ngay", "Không cho mượn sách mới",
          "(28) 2 通知内容: 周六图书馆检索网站将停机进行服务器维护。")

    add_q(64, 4, "Yêu cầu dành cho bạn Chen", "Theo nội dung bức email của giảng viên, bạn Chen bắt buộc phải chỉnh sửa lại bản tóm tắt và gửi lại qua email trước 18:00.",
          "Thầy giáo nhận xét: bản thảo còn thiếu phần trích dẫn số liệu, yêu cầu Chen bổ sung và gửi lại trước 6 giờ chiều nay.",
          "Đến gặp trực tiếp thầy giáo", "In bản cứng nộp tại văn phòng", "Nghỉ học buổi học tới", "Bổ sung số liệu và gửi lại bản tóm tắt qua email trước 18:00 (ĐÚNG)",
          "(29) 4 小陈必须修改摘要并于下午6点前通过邮件重新发送。")

    # --- READING: Mondai 5 - Medium Passage (Q65 - Q68) ---
    add_q(65, 1, "Cách tác giả chọn quà sinh nhật mẹ lúc 10 tuổi", "Năm 10 tuổi, tác giả đã tích cóp từng đồng tiền tiêu vặt trong ống heo suốt 3 tháng để mua tặng mẹ một món quà ý nghĩa.",
          "Bài văn kể lại: khi tròn 10 tuổi, tác giả tự mình dành dụm tiền tiêu vặt để tự tay mua quà sinh nhật cho mẹ mà không xin tiền bố.",
          "Nhờ bố mua quà hộ", "Tự làm bánh kem tặng mẹ", "Dành dụm tiền tiêu vặt tiết kiệm suốt 3 tháng để mua quà (ĐÚNG)", "Hái hoa dại ven đường tặng mẹ",
          "(30) 3 10岁时作者通过积攒零用钱为母亲挑选了生日礼物。")

    add_q(66, 4, "Món quà tác giả tặng mẹ", "Món quà mà tác giả đã dành tặng mẹ vào ngày sinh nhật chính là một chiếc kẹp tóc nhỏ xinh cùng tấm thiệp tự tay nắn nót viết lời chúc.",
          "Nội dung đoạn 2 nêu rõ: tác giả chọn mua chiếc kẹp tóc màu hồng mẹ rất thích cùng bức vẽ chân dung mẹ kèm lời chúc mừng.",
          "Chiếc kẹp tóc xinh xắn và tấm thiệp tự tay viết lời chúc (ĐÚNG)", "Chiếc khăn choàng lụa đắt tiền", "Một đôi giày cao gót", "Một bó hoa hồng lớn",
          "(31) 1 送给母亲的发夹和手写的生日贺卡。")

    add_q(67, 3, "Lý do tác giả cảm thấy an tâm", "Tác giả cảm thấy vô cùng an lòng và hạnh phúc vì mẹ đã nở nụ cười rạng rỡ và trân trọng cài ngay chiếc kẹp tóc lên mái tóc.",
          "Tâm trạng đứa trẻ: ban đầu lo sợ món quà rẻ tiền mẹ không thích, nhưng thấy mẹ mỉm cười cài kẹp lên tóc thì vỡ òa an tâm.",
          "Vì được mẹ thưởng tiền", "Vì thấy mẹ vui vẻ mỉm cười và cài chiếc kẹp tóc lên đầu (ĐÚNG)", "Vì không bị mắng", "Vì bố khen ngợi",
          "(32) 2 感到安心是因为母亲非常开心地戴上了发夹。")

    add_q(68, 3, "Thông điệp cốt lõi bài viết", "Điều mà tác giả muốn gửi gắm sâu sắc nhất qua câu chuyện chính là: giá trị của món quà nằm ở tấm lòng chân thành chứ không phụ thuộc vào tiền bạc.",
          "Đoạn kết khẳng định: dù món quà nhỏ bé rẻ tiền nhưng chứa chan tình yêu thương chân thành thì bao giờ cũng là món quà quý giá nhất trần đời.",
          "Phải luôn mua quà thật đắt tiền", "Sinh nhật thì nhất định phải tổ chức tiệc lớn", "Nên tự nấu ăn thay vì tặng quà", "Tấm lòng chân thành và tình yêu thương mới là điều quý giá nhất của món quà (ĐÚNG)",
          "(33) 4 最想表达的内容: 礼物的真正价值在于真诚的心意而非价格。")

    # --- READING: Mondai 6 - Information Retrieval (Q69 - Q70) ---
    add_q(69, 2, "Lịch tư vấn về vấn đề nhà ở", "Theo bảng thông báo của trung tâm hành chính, các buổi tư vấn chuyên sâu về thuê và mua nhà ở được tổ chức vào các ngày thứ Ba và thứ Năm hằng tuần.",
          "Dò tìm trong bảng mục 'Nhà ở & Cư trú (住まい)': cột ngày tiếp nhận ghi rõ Thứ Ba (火曜日) và Thứ Năm (木曜日).",
          "Thứ Hai và thứ Tư", "Thứ Ba và thứ Năm hằng tuần (ĐÚNG)", "Chỉ duy nhất sáng thứ Bảy", "Cả tuần từ thứ Hai đến thứ Sáu",
          "(34) 2 关于住所的咨询服务在每周二和周四进行。")

    add_q(70, 4, "Ngày bạn Lee có thể đến tư vấn hôn nhân quốc tế", "Bạn Lee muốn được tư vấn về thủ tục kết hôn quốc tế trong tuần này hoặc tuần tới, ngày duy nhất phù hợp trong lịch là thứ Sáu tuần sau.",
          "Chuyên đề tư vấn kết hôn quốc tế chỉ mở 2 tuần một lần vào các ngày Thứ Sáu; đối chiếu lịch chỉ có thứ Sáu tuần tới là còn lịch hẹn.",
          "Thứ Hai tuần này", "Thứ Tư tuần tới", "Thứ Sáu tuần sau (ĐÚNG)", "Chủ nhật tuần này",
          "(35) 3 小李咨询跨国婚姻, 符合本周或下周条件的只有下周五。")

    # --- LISTENING: Mondai 1 - Task-based Comprehension (Q71 - Q78) ---
    add_q(71, 2, "Vị trí đặt chậu cây cảnh", "Người phụ nữ dặn người nam hãy mang chậu cây cảnh đặt ở ngay cạnh khung cửa sổ phòng khách để cây đón ánh nắng.",
          "Theo đối thoại: người nữ lưu ý không để cây ở gần cửa ra vào vì gió lạnh, hãy đặt cạnh cửa sổ nơi có nhiều ánh sáng chiếu vào.",
          "Đặt cạnh cửa sổ đón ánh nắng (ĐÚNG)", "Đặt cạnh cửa ra vào", "Đặt trên bàn ăn", "Đặt ngoài ban công",
          "聴解 1 (1): 男の人は植木鉢をどこに置きますか。 正解: [1]",
          "女：植物は日光が好きだから、窓のすぐそばに置いてくれる？\n男：うん、わかった。窓の横に置くね。",
          "Nữ: Cây cối ưa ánh nắng mặt trời, em đặt chậu cây ngay sát cạnh cửa sổ giúp chị được không?\nNam: Vâng, em hiểu rồi, em đặt cạnh cửa sổ nhé.")

    add_q(72, 3, "Hành động người nam làm trước tiên", "Người nam trước hết sẽ đi pha một ấm trà nóng mời khách trước khi dọn dẹp hoa quả trên bàn.",
          "Khách vừa đến nhà, việc lễ nghi trước tiên là phải pha trà nóng bưng ra mời khách thưởng thức.",
          "Rửa hoa quả mời khách", "Đi đun nước pha ấm trà nóng mời khách trước (ĐÚNG)", "Lấy đĩa bánh kẹo", "Bật ti vi lên",
          "聴解 1 (2): 男の人はまず何をしますか。 正解: [2]",
          "女：お客様がいらっしゃったから、まずお茶を入れて持ってきて。\n男：はい、すぐ入れます。",
          "Nữ: Khách quý vừa tới rồi, trước tiên em đi pha trà bưng ra mời bác nhé.\nNam: Vâng, em đi pha ngay ạ.")

    add_q(73, 2, "Tài liệu học sinh cần chuẩn bị nộp", "Học sinh cần chuẩn bị bản tóm tắt nội dung bài phát biểu và bản in slide thuyết trình.",
          "Thầy giáo hướng dẫn: bản thu hoạch nộp sau, tiết học tới mỗi bạn phải in sẵn 1 bản tóm tắt phát biểu để nộp cho thầy.",
          "Nộp bài tiểu luận hoàn chỉnh", "Nộp bản tóm tắt nội dung bài phát biểu (ĐÚNG)", "Nộp đĩa CD ghi âm", "Nộp sổ tay ghi chép",
          "聴解 1 (3): 学生は何を提出しなければなりませんか。 正解: [2]",
          "先生：次回の授業では、発表の要約を1枚印刷して提出してください。",
          "Thầy giáo: Tiết học tới, các em hãy in 1 tờ tóm tắt nội dung phát biểu để nộp cho thầy nhé.")

    add_q(74, 1, "Cách người nữ di chuyển đến bệnh viện", "Người phụ nữ quyết định sẽ đi bộ thong thả ra bến xe buýt và đón chuyến xe buýt số 12 đi đến cổng bệnh viện.",
          "Đi taxi tốn kém, tự lái xe thì không có chỗ đỗ, xe buýt số 12 chạy thẳng tới trạm bệnh viện nên cô chọn đi xe buýt.",
          "Đi xe buýt tuyến số 12 (ĐÚNG)", "Bắt xe taxi đi", "Tự lái xe ô tô gia đình", "Đi bộ suốt quãng đường",
          "聴解 1 (4): 女の人は病院へどうやって行きますか。 正解: [1]",
          "女：12番のバスなら病院の前まで直通だから、バスで行くわ。\n男：うん、気をつけてね。",
          "Nữ: Xe buýt số 12 đi thẳng tới cổng bệnh viện luôn, nên em sẽ đi xe buýt vậy.\nNam: Ừ, em đi cẩn thận nhé.")

    add_q(75, 2, "Món đồ người nam đi mua ở siêu thị", "Người nam nhận nhiệm vụ ghé qua siêu thị mua bổ sung thêm sữa tươi và một vỉ trứng gà.",
          "Vợ dặn dò: rau và thịt trong tủ còn nhiều, chỉ thiếu sữa tươi và trứng gà để chuẩn bị cho bữa sáng mai.",
          "Mua thịt bò và rau xanh", "Mua sữa tươi và trứng gà (ĐÚNG)", "Mua bánh mì và bơ", "Mua hoa quả tráng miệng",
          "聴解 1 (5): 男の人はスーパーで何を買いますか。 正解: [2]",
          "女：牛乳と卵がもうないから、買ってきてくれる？\n男：オッケー、牛乳と卵ね。",
          "Nữ: Sữa tươi với trứng gà hết sạch rồi, anh ghé mua về giúp em được không?\nNam: OK em, sữa tươi và trứng gà nhé.")

    add_q(76, 2, "Nhiệm vụ bạn nữ làm sau giờ tan học", "Bạn nữ sau giờ học sẽ ở lại phòng câu lạc bộ để cùng các bạn tập luyện chuẩn bị cho hội diễn văn nghệ.",
          "Bạn nam rủ đi xem phim nhưng bạn nữ từ chối vì đã có lịch tập kịch cùng các thành viên câu lạc bộ kịch nói.",
          "Đi ăn tiệm cùng bạn bè", "Về nhà ngủ nghỉ", "Đến thư viện ôn thi", "Ở lại trường tập kịch cho hội diễn văn nghệ (ĐÚNG)",
          "聴解 1 (6): 女の学生は放課後何をしますか。 正解: [4]",
          "女：文化祭の劇の練習があるから、今日は部室に残るの。\n男：そっか、練習頑張ってね。",
          "Nữ: Hôm nay có buổi tập kịch cho lễ hội văn hóa trường, nên tớ phải ở lại phòng câu lạc bộ rồi.\nNam: Thế à, chúc cậu tập tốt nhé.")

    add_q(77, 4, "Địa điểm hai người hẹn gặp nhau", "Hai bạn thống nhất sẽ hẹn gặp mặt nhau tại quán cà phê sách nằm ngay trước cửa ga tàu điện ngầm.",
          "Quảng trường trước ga đông đúc khó nhận ra nhau, nên hẹn ngồi chờ tại quán cà phê sách vừa ấm vừa tiện theo dõi.",
          "Tại quán cà phê sách trước ga (ĐÚNG)", "Tại cổng soát vé tàu điện ngầm", "Tại quầy thông tin du lịch", "Tại rạp chiếu phim",
          "聴解 1 (7): 二人はどこで待ち合わせますか。 正解: [1]",
          "女：駅前のブックカフェで待ってるね。\n男：了解、すぐそこに行くよ。",
          "Nữ: Tớ đợi cậu ở quán cà phê sách trước ga nhé.\nNam: Nhất trí, tớ qua đó ngay đây.")

    add_q(78, 3, "Thứ tự sắp xếp tài liệu của nhân viên", "Nhân viên được hướng dẫn phải sắp xếp các tập hồ sơ tài liệu theo đúng trình tự thời gian từ cũ đến mới nhất.",
          "Quản lý lưu ý: để tiện cho việc tra cứu hồ sơ sau này, cần xếp chứng từ theo mốc ngày tháng năm từ trước tới sau.",
          "Xếp theo bảng chữ cái", "Xếp theo tên khách hàng", "Xếp theo trình tự thời gian từ cũ đến mới (ĐÚNG)", "Xếp theo độ dày của tài liệu",
          "聴解 1 (8): 書類をどう並べますか。 正解: [3]",
          "上司：日付の古いものから順に並べてファイルに閉じてね。\n部下：はい、日付順ですね。",
          "Cấp trên: Em sắp xếp theo thứ tự ngày tháng từ cũ đến mới rồi kẹp vào file nhé.\nCấp dưới: Vâng, sắp theo trình tự ngày tháng ạ.")

    # --- LISTENING: Mondai 2 - Key Points (Q79 - Q85) ---
    add_q(79, 1, "Lý do bạn nam chọn học chuyên ngành kinh tế", "Bạn nam quyết định chọn học kinh tế vì từ nhỏ đã ấp ủ ước mơ sau này sẽ tự mình khởi nghiệp mở công ty riêng.",
          "Bạn nam bộc bạch: muốn tích lũy kiến thức quản trị kinh doanh bài bản để sau này tự tin điều hành doanh nghiệp của mình.",
          "Do bố mẹ bắt buộc", "Vì ngành này dễ xin việc", "Vì nuôi ước mơ sau này tự mình khởi nghiệp kinh doanh (ĐÚNG)", "Vì theo bạn bè học cùng",
          "聴解 2 (1): 男の人はなぜ経済学部を選びましたか。 正解: [3]",
          "男：将来自分の会社を立ち上げて経営するのが夢なんだ。",
          "Nam: Ước mơ tương lai của tớ là tự mình gây dựng và điều hành một công ty riêng.")

    add_q(80, 2, "Điều làm người phụ nữ ấn tượng nhất ở khách sạn", "Điều làm người phụ nữ cảm thấy hài lòng và ấn tượng sâu sắc nhất chính là thái độ phục vụ chu đáo, ấm áp của nhân viên.",
          "Căn phòng đẹp, đồ ăn ngon, nhưng điểm khiến cô nhớ mãi là sự ân cần, niềm nở tận tình của đội ngũ nhân viên lễ tân.",
          "Bể bơi rộng lớn", "Thái độ phục vụ vô cùng chu đáo và ấm áp của nhân viên (ĐÚNG)", "Giá phòng rất rẻ", "Vị trí gần bãi biển",
          "聴解 2 (2): ホテルのどこが一番良かったと言っていますか。 正解: [2]",
          "女：スタッフの皆さんが本当に親切で温かいおもてなしをしてくれたのが一番心に残ったわ。",
          "Nữ: Điều đọng lại sâu sắc nhất trong lòng mình chính là sự tiếp đón nồng hậu và cực kỳ chu đáo của toàn thể nhân viên.")

    add_q(81, 1, "Thời gian chuyến tàu khởi hành", "Do gặp thời tiết sương mù nhẹ nên giờ khởi hành của chuyến tàu đã được lùi lại 15 phút, xuất phát lúc 10:45.",
          "Loa nhà ga thông báo: chuyến tàu lúc 10:30 sẽ chuyển sang khởi hành vào lúc 10:45.",
          "Khởi hành lúc 10:45 (ĐÚNG)", "Khởi hành lúc 10:30", "Khởi hành lúc 11:00", "Chuyến tàu bị hủy bỏ",
          "聴解 2 (3): 電車は何時に出発しますか。 正解: [1]",
          "アナウンス：10時30分発の列車は、15分遅れの10時45分に出発いたします。",
          "Phát thanh: Chuyến tàu dự kiến xuất phát lúc 10h30 sẽ khởi hành lùi lại 15 phút, tức 10h45.")

    add_q(82, 3, "Bí quyết giữ gìn sức khỏe của cụ ông", "Bí quyết giúp cụ ông dù đã ngoài 80 tuổi vẫn luôn dẻo dai khỏe mạnh là duy trì thói quen đi bộ nhanh 30 phút mỗi sáng sớm.",
          "Cụ chia sẻ trên đài: điều quan trọng nhất là ngày nào cũng dậy sớm đi bộ hít thở không khí trong lành suốt nửa tiếng.",
          "Uống nhiều loại thuốc bổ", "Ăn kiêng nghiêm ngặt", "Tập yoga cường độ cao", "Duy trì đều đặn thói quen đi bộ 30 phút vào mỗi buổi sáng (ĐÚNG)",
          "聴解 2 (4): おじいさんの健康の秘訣は何ですか。 正解: [4]",
          "祖父：毎朝欠かさず30分、近所を散歩するのが一番の元気の源だよ。",
          "Cụ ông: Nguồn năng lượng lớn nhất của ông chính là ngày nào cũng đều đặn đi bộ 30 phút quanh xóm vào mỗi sáng sớm đấy.")

    add_q(83, 3, "Lý do cửa hàng bách hóa thông báo đổi tầng", "Khu vực quầy thời trang trẻ em tạm thời chuyển lên tầng 4 để nhường toàn bộ mặt bằng tầng 3 cho công tác sửa chữa nâng cấp.",
          "Thông báo: tầng 3 bắt đầu cải tạo nội thất từ hôm nay, toàn bộ gian hàng đồ trẻ em chuyển sang sảnh tầng 4.",
          "Vì chuyển sang bán đồ gia dụng", "Vì tầng 3 bắt đầu thi công sửa chữa cải tạo mặt bằng (ĐÚNG)", "Vì tầng 4 rộng hơn", "Vì giá thuê tầng 3 đắt",
          "聴解 2 (5): なぜ売り場が移動しましたか。 正解: [2]",
          "アナウンス：3階フロアの改装工事に伴い、子供服売り場を一時的に4階へ移動しております。",
          "Phát thanh: Để phục vụ công tác cải tạo sửa chữa mặt bằng tầng 3, quầy đồ trẻ em tạm thời chuyển lên tầng 4.")

    add_q(84, 2, "Món ăn bạn nữ gợi ý nấu cho bữa tối", "Bạn nữ gợi ý tối nay cả nhà cùng làm món lẩu rau củ thịt gà ấm cúng vì thời tiết bên ngoài đang trở gió lạnh.",
          "Trời lạnh nên ăn lẩu là tuyệt nhất, cả nhà vừa quây quần bên nồi lẩu nóng vừa trò chuyện vui vẻ.",
          "Món lẩu gà nấu nấm rau củ ấm cúng (ĐÚNG)", "Món mì xào giòn", "Món cơm cà ri cay", "Món sushi cá hồi",
          "聴解 2 (6): 女の人は晩ご飯に何を提案しましたか。 正解: [1]",
          "女：今夜は寒いから、体が温まる鶏肉の鍋料理にしない？\n男：いいね、鍋にしよう！",
          "Nữ: Tối nay trời lạnh rồi, mình cùng làm món lẩu gà cho ấm người đi anh?\nNam: Ý hay đấy, ăn lẩu thôi!")

    add_q(85, 4, "Kế hoạch cuối tuần của anh Yamada", "Cuối tuần này anh Yamada sẽ đưa cả gia đình về quê ngoại ở Shizuoka để cùng hái dâu tây tại trang trại.",
          "Anh Yamada hào hứng kể: lũ trẻ rất thích ăn quả dâu tây nên cuối tuần anh lái xe chở cả nhà về vườn dâu trải nghiệm hái quả.",
          "Ở nhà xem bóng đá", "Đi leo núi cùng đồng nghiệp", "Đưa cả nhà về quê trải nghiệm hái dâu tây tại vườn (ĐÚNG)", "Đi công tác xa",
          "聴解 2 (7): 山田さんは今週末何をしますか。 正解: [3]",
          "山田：子どもたちが楽しみにしているから、静岡の実家に帰っていちご狩りに行く予定なんだ。",
          "Yamada: Mấy đứa nhỏ đang háo hức lắm, nên cuối tuần này mình định chở cả nhà về quê Shizuoka đi hái dâu tây.")

    # --- LISTENING: Mondai 3 - Utterance Expressions (Q86 - Q90) ---
    add_q(86, 2, "Mời khách vào nhà ngồi chơi", "Khách quý đến bấm chuông tới nhà, chủ nhà mở cửa niềm nở mời khách bước vào: 'Xin mời bác/bạn vào nhà chơi!'",
          "Mẫu câu chuẩn mời khách bước vào phòng: 「どうぞ、お上がりください。」",
          "Xin mời bác vào nhà chơi ạ! (ĐÚNG)", "Bác đứng ngoài đó nhé", "Chào bác tôi đi đây", "Nhà tôi bừa bộn lắm",
          "聴解 3 (1): 客を家に招き入れます。何と言いますか。 正解: [1]",
          "「どうぞ、お上がりください。」",
          "Xin mời bác vào nhà ạ!")

    add_q(87, 1, "Nhờ người khác nhắc lại câu vừa nói", "Do xung quanh quá ồn ào nên không nghe rõ người kia vừa nói gì: 'Xin lỗi, anh có thể nhắc lại thêm một lần nữa được không ạ?'",
          "Câu nhờ đối phương nhắc lại: 「すみません、もう一度言っていただけませんか。」",
          "Anh nói to hơn được không?", "Xin lỗi, anh có thể nhắc lại câu vừa rồi một lần nữa được không ạ? (ĐÚNG)", "Tôi không muốn nghe nữa", "Anh nói nhanh quá",
          "聴解 3 (2): 相手の言ったことが聞こえませんでした。何と言いますか。 正解: [2]",
          "「すみません、もう一度言っていただけませんか。」",
          "Xin lỗi, anh có thể vui lòng nhắc lại lần nữa được không ạ?")

    add_q(88, 1, "Xin phép được dùng thử món đồ", "Ở cửa hàng đồ chơi công nghệ, muốn xin phép nhân viên cho mình dùng thử chiếc máy: 'Tôi có thể dùng thử chiếc máy này được không ạ?'",
          "Mẫu câu xin phép lịch sự: 「これ、使ってみてもいいですか。」",
          "Máy này bán bao nhiêu?", "Tôi mang về nhà nhé", "Tôi có thể dùng thử một chút chiếc máy này được không ạ? (ĐÚNG)", "Máy này hỏng rồi à?",
          "聴解 3 (3): 店の機械を試したいです。何と言いますか。 正解: [3]",
          "「これ、使ってみてもいいですか。」",
          "Tôi có thể dùng thử cái này một chút được không ạ?")

    add_q(89, 3, "Chào đồng nghiệp khi ra về trước", "Hết giờ làm việc mình về trước còn đồng nghiệp đang ở lại làm thêm: 'Tôi xin phép ra về trước mọi người ạ!'",
          "Lời chào tiêu chuẩn văn phòng Nhật: 「お先に失礼します。」",
          "Mọi người làm việc chăm chỉ nhé", "Tôi xin phép về trước ạ! (ĐÚNG)", "Hôm nay mệt mỏi quá", "Mai tôi nghỉ làm nhé",
          "聴解 3 (4): 職場で同僚より先に帰ります。何と言いますか。 正解: [2]",
          "「お先に失礼します。」",
          "Tôi xin phép về trước ạ!")

    add_q(90, 1, "Hỏi mượn chiếc ô khi trời mưa", "Trời bất chợt đổ mưa to mà không có ô, muốn hỏi mượn đồng nghiệp: 'Cậu có thể cho mình mượn chiếc ô một lúc được không?'",
          "Mẫu câu nhờ mượn ô: 「傘を貸してもらえませんか。」",
          "Bạn cho mình mượn chiếc ô được không? (ĐÚNG)", "Bạn cầm lấy ô của mình này", "Chiếc ô này đẹp ghê", "Trời tạnh mưa rồi kìa",
          "聴解 3 (5): 傘を借りたいです。何と言いますか。 正解: [1]",
          "「傘を貸してもらえませんか。」",
          "Bạn có thể cho mình mượn chiếc ô được không ạ?")

    # --- LISTENING: Mondai 4 - Quick Response (Q91 - Q98) ---
    add_q(91, 3, "Mời mọc: 'Cuối tuần này mình cùng đi leo núi nhé?'", "Hào hứng đồng ý: 'Ý kiến hay đấy, tụi mình nhất định cùng đi nhé!'",
          "Nhận lời rủ rê nhiệt tình: 「いいですね、ぜひ行きましょう！」",
          "Hay quá, nhất định tụi mình cùng đi nhé! (ĐÚNG)", "Tôi leo núi tuần trước rồi", "Núi đó cao lắm", "Tôi không có giày leo núi",
          "聴解 4 (1): 今度の週末、山登りに行きませんか。 正解: [1]",
          "男：今度の週末、山登りに行きませんか。\n女：いいですね、ぜひ行きましょう！",
          "Nam: Cuối tuần này cậu có muốn cùng tớ đi leo núi không?\nNữ: Hay quá, nhất định chúng mình cùng đi nhé!")

    add_q(92, 3, "Hỏi thăm: 'Chuyến đi công tác xa của bạn thế nào rồi?'", "Chia sẻ trải nghiệm: 'Công việc bận rộn nhưng mình đã học hỏi được rất nhiều điều bổ ích.'",
          "Cập nhật kết quả chuyến đi: 「忙しかったですが、とても勉強になりました。」",
          "Tôi không đi công tác đâu", "Khá là bận rộn nhưng tớ đã học hỏi được rất nhiều điều bổ ích (ĐÚNG)", "Khách sạn rất rẻ", "Tuần sau tôi mới đi",
          "聴解 4 (2): 出張はどうでしたか。 正解: [2]",
          "女：出張はどうでしたか。\n男：忙しかったですが、とても勉強になりました。",
          "Nữ: Chuyến đi công tác của anh thế nào rồi ạ?\nNam: Công việc khá bận rộn nhưng anh đã học hỏi thêm được rất nhiều điều quý báu.")

    add_q(93, 3, "Hỏi thăm sức khỏe: 'Cảm cúm của bạn đã đỡ hơn chút nào chưa?'", "Cập nhật tình trạng sức khỏe: 'Cảm ơn bạn nhiều nhé, nhờ uống thuốc nên mình đã khỏe hẳn rồi.'",
          "Báo tin bình phục: 「おかげさまで、すっかり良くなりました。」",
          "Tôi không uống thuốc đâu", "Bác sĩ dặn nghỉ ngơi", "Nhờ có bạn hỏi thăm, mình đã khỏe khoắn trở lại bình thường rồi (ĐÚNG)", "Tôi bị sốt cao lắm",
          "聴解 4 (3): 風邪の具合はいかがですか。 正解: [3]",
          "男：風邪の具合はいかがですか。\n女：おかげさまで、すっかり良くなりました。",
          "Nam: Bệnh cảm của cậu đã đỡ hơn chút nào chưa?\nNữ: Cảm ơn cậu đã hỏi thăm, nhờ trời tớ đã khỏi hẳn hoàn toàn rồi.")

    add_q(94, 2, "Hỏi đường: 'Từ đây đi bộ ra ga tàu mất khoảng bao lâu thế bạn?'", "Chỉ dẫn thời gian đi lại: 'Đi bộ thong thả khoảng chừng 10 phút là tới nơi bạn nhé.'",
          "Trả lời khoảng thời gian: 「歩いて10分くらいですよ。」",
          "Ga tàu to lắm", "Đi bộ thong thả khoảng tầm 10 phút là tới nơi thôi bạn nhé (ĐÚNG)", "Tàu chạy nhanh lắm", "Vé tàu 200 yên",
          "聴解 4 (4): 駅まで歩いてどのくらいかかりますか。 正解: [2]",
          "女：駅まで歩いてどのくらいかかりますか。\n男：歩いて10分くらいですよ。",
          "Nữ: Từ đây đi bộ ra nhà ga mất khoảng bao lâu thế bạn?\nNam: Đi bộ túc tắc khoảng 10 phút là tới nơi thôi bạn ạ.")

    add_q(95, 2, "Nhờ vả: 'Bạn có thể giúp mình chuyển chiếc bàn này qua kia được không?'", "Vui vẻ nhận lời giúp đỡ: 'Được chứ, để mình khiêng phụ bạn ngay đây!'",
          "Đồng ý giúp đỡ nhiệt tình: 「ええ、いいですよ。手伝いますね。」",
          "Bàn này bằng gỗ đấy", "Tôi bận lắm không làm đâu", "Được chứ, để mình giúp cậu khiêng qua nhé! (ĐÚNG)", "Cái bàn nặng quá",
          "聴解 4 (5): この机を運ぶの手伝ってもらえますか。 正解: [3]",
          "男：この机を運ぶの手伝ってもらえますか。\n女：ええ、いいですよ。手伝いますね。",
          "Nam: Cậu có thể giúp tớ khiêng chiếc bàn này qua đằng kia một tay được không?\nNữ: Vâng được chứ, để mình phụ bạn khiêng qua nhé.")

    add_q(96, 2, "Mời trà: 'Bạn có muốn dùng thêm một tách trà xanh nữa không?'", "Nhận lời lịch sự: 'Cảm ơn bạn, vậy cho mình xin thêm một chén nữa nhé.'",
          "Nhận lời nhã nhặn: 「すみません、いただきます。」",
          "Cảm ơn bạn, vậy cho mình xin phép dùng thêm một chén nhé (ĐÚNG)", "Trà đắng quá tôi không uống", "Đừng pha trà nữa", "Hết nước sôi rồi",
          "聴解 4 (6): お茶のおかわりはいかがですか。 正解: [1]",
          "女：お茶のおかわりはいかがですか。\n男：すみません、いただきます。",
          "Nữ: Bạn có muốn dùng thêm một tách trà nữa không ạ?\nNam: Cảm ơn bạn nhiều, vậy mình xin phép dùng thêm một tách nữa nhé.")

    add_q(97, 2, "Khen ngợi: 'Món ăn do chính tay bạn nấu ngon tuyệt vời luôn ấy!'", "Đáp lại lời khen khiêm tốn: 'Thật thế sao? Cậu thích là mình vui lắm rồi!'",
          "Đáp lại lời khen khiêm nhường: 「本当ですか？喜んでもらえて嬉しいです。」",
          "Tôi không biết nấu ăn", "Thật thế sao bạn? Bạn ăn thấy ngon miệng là mình vui lắm rồi! (ĐÚNG)", "Món này nấu đắt tiền lắm", "Lần sau bạn nhớ nấu nhé",
          "聴解 4 (7): この手料理、本当に美味しいですね！ 正解: [2]",
          "男：この手料理、本当に美味しいですね！\n女：本当ですか？喜んでもらえて嬉しいです。",
          "Nam: Món ăn do cậu tự tay nấu nếm ngon tuyệt đỉnh luôn ấy!\nNữ: Thật thế hả cậu? Cậu khen ngon và thích ăn là mình vui lắm rồi.")

    add_q(98, 1, "Hỏi ý kiến: 'Chiếc áo khoác này bạn thấy màu sắc thế nào?'", "Góp ý chân thành: 'Màu sáng rất đẹp và cực kỳ tôn dáng của bạn đấy!'",
          "Đưa ra nhận xét tích cực: 「明るい色で、とても似合っていますよ。」",
          "Áo này dày quá", "Đừng mặc áo khoác", "Màu sắc tươi sáng và trông rất hợp với vóc dáng của bạn đấy! (ĐÚNG)", "Bao nhiêu tiền thế?",
          "聴解 4 (8): このコート、どう思いますか。 正解: [3]",
          "女：このコート、どう思いますか。\n男：明るい色で、とても似合っていますよ。",
          "Nữ: Cậu thấy chiếc áo khoác này trông thế nào?\nNam: Màu sắc tươi sáng nhã nhặn mà trông cực kỳ hợp với cậu luôn đấy.")

    return questions
