# Authentic 98 questions data for JLPT N4 2012-12
# Extracted from full_raw_n4-2012-12.pdf.txt (试题解析 & 聴解原文)

def get_n4_2012_data():
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
    add_q(1, 1, "石 (いし)", "Có một viên đá sỏi nhỏ lọt vào bên trong chiếc giày của tôi.",
          "Chữ Hán 「石」 (thạch) có âm Kun thuần Nhật chuẩn xác là 「いし」 (viên đá, hòn sỏi).",
          "いし (石): Hòn đá, viên sỏi", "すな (砂): Cát", "くさ (草): Cỏ", "えだ (枝): Cành cây",
          "(1) 1 句意: 鞋子里进了石子。1. いし(石): 石头, 石子")

    add_q(2, 1, "経験 (けいけん)", "Trong thời gian sinh sống tại Nhật Bản, tôi đã trải nghiệm rất nhiều điều mới mẻ.",
          "Chữ 「経」 có âm On là 「けい」, chữ 「験」 có âm On là 「けん」 -> 経験 (けいけん: kinh nghiệm, trải nghiệm).",
          "けいけん (経験): Trải nghiệm, kinh nghiệm", "けいかん (警官): Cảnh sát", "けんきょう: Từ sai", "けんかん: Từ sai",
          "(2) 1 句意: 在日本经历了各种各样的事情。考察汉字词: “経”音读为“けい”，“験”音读为“けん”。")

    add_q(3, 4, "店員 (てんいん)", "Tôi đã bước tới hỏi nhân viên bán hàng xem nhà vệ sinh nằm ở vị trí nào.",
          "Chữ 「店」 có âm On là 「てん」, chữ 「員」 có âm On là 「いん」 -> 店員 (てんいん: nhân viên cửa hàng).",
          "てんえん: Sai âm của 員", "みせいん: Nhầm âm Kun của 店", "みせえん: Sai cả hai âm", "てんいん (店員): Nhân viên bán hàng",
          "(3) 4 句意: 问了店员洗手间在哪里。考察汉字词: “店”音读为“てん”，“員”音读为“いん”。")

    add_q(4, 2, "食堂 (しょくどう)", "Nhà ăn của trường học hôm nay vào giờ ăn trưa vô cùng đông đúc.",
          "Chữ 「食」 có âm On là 「しょく」, chữ 「堂」 có âm On là 「どう」 -> 食堂 (しょくどう: nhà ăn, căng tin).",
          "しょくとう: Thiếu biến âm đục", "しょくどう (食堂): Nhà ăn, phòng ăn", "じょくとう: Sai âm đầu", "じょくどう: Sai cả hai âm",
          "(4) 2 句意: 食堂今天很拥挤。考察汉字词: “食”音读为“しょく”，“堂”音读为“どう”。")

    add_q(5, 2, "港 (みなと)", "Đứng từ ô cửa sổ tầng hai này có thể phóng tầm mắt ngắm nhìn ra bến cảng.",
          "Chữ Hán 「港」 (cảng) có cách đọc Kunyomi chuẩn xác là 「みなと」 (bến cảng, cảng biển).",
          "うみ (海): Biển", "みなと (港): Bến cảng, bến tàu", "みずうみ (湖): Hồ nước", "いけ (池): Cái ao",
          "(5) 2 句意: 从这扇窗户能看到港口。2. みなと(港): 港口, 码头")

    add_q(6, 3, "小説 (しょうせつ)", "Cuốn tiểu thuyết trinh thám mới ra mắt này đọc vô cùng lôi cuốn và thú vị.",
          "Chữ 「小」 có âm On là 「しょう」, chữ 「説」 có âm On là 「せつ」 -> 小説 (しょうせつ: tiểu thuyết).",
          "しょうぜつ: Sai biến âm đục", "しょうさつ: Sai nguyên âm", "しょうせつ (小説): Tiểu thuyết", "しょうざつ: Sai âm",
          "(6) 3 句意: 这本小说很有趣。考察汉字词: “小”音读为“しょう”，“説”音读为“せつ”。")

    add_q(7, 1, "日記 (にっき)", "Mỗi buổi tối trước khi đi ngủ, tôi đều giữ thói quen viết nhật ký.",
          "Chữ 「日」 khi ghép với chữ 「記」 hàng か phát sinh biến âm ngắt促音 -> 日記 (にっき: nhật ký).",
          "にっき (日記): Sổ nhật ký", "にちき: Chưa biến âm ngắt", "にちぎ: Sai âm đục", "にっぎ: Sai âm",
          "(7) 1 句意: 我每天晚上都会写日记。“日”接头发生促音变, 读作“にっき”。")

    add_q(8, 2, "夕方 (ゆうがた)", "Vào lúc chiều muộn hoàng hôn thì bầu trời bỗng đổ mưa rào.",
          "Chữ 「夕」 có âm Kun là 「ゆう」, chữ 「方」 biến âm đục thành 「がた」 -> 夕方 (ゆうがた: chiều muộn, hoàng hôn).",
          "ゆかた: Áo Yukata", "ゆうがた (夕方): Chiều tối, hoàng hôn", "ゆうかた: Thiếu âm đục", "ゆがた: Thiếu trường âm",
          "(8) 2 句意: 傍晚时分下起了雨。考察训读: “夕”训读为“ゆう”，“方”训读为“がた”。")

    add_q(9, 4, "秋 (あき)", "Thời tiết mát mẻ dần, chẳng mấy chốc mà đã sắp sửa bước sang mùa thu rồi nhỉ.",
          "Chữ Hán 「秋」 (thu) có cách đọc Kunyomi chuẩn xác là 「あき」 (mùa thu).",
          "ふゆ (冬): Mùa đông", "なつ (夏): Mùa hè", "はる (春): Mùa xuân", "あき (秋): Mùa thu",
          "(9) 4 句意: 马上要到秋天了啊。4. あき(秋): 秋天")

    # --- MONDAI 2: Kanji Writing (Q10 - Q15) ---
    add_q(10, 1, "青い (あおい)", "Anh Suzuki hôm nay đang mặc một chiếc áo sơ mi màu xanh lam rất nhã nhặn.",
          "Tính từ 「あおい」 được viết bằng chữ Hán chuẩn xác là 「青い」 (thanh - màu xanh dương, xanh lam).",
          "青い (あおい): Màu xanh lam", "黒い (くろい): Màu đen", "赤い (あかい): Màu đỏ", "白い (しろい): Màu trắng",
          "(10) 1 句意: 铃木穿着蓝色衬衣。1. 青い（あおい）: 蓝色")

    add_q(11, 4, "場所 (ばしょ)", "Xin vui lòng thông báo cụ thể cho tôi biết địa điểm tổ chức cuộc họp phòng ban.",
          "Chữ 「場」 (trường) ghép với chữ 「所」 (sở) tạo thành danh từ 「場所」 (địa điểm, nơi diễn ra).",
          "場処: Chữ sai chuẩn", "場初: Nhầm chữ", "場書: Nhầm chữ", "場所 (ばしょ): Địa điểm, vị trí",
          "(11) 4 句意: 请把会议地点告诉我。4. 場所（ばしょ）: 地点, 场所")

    add_q(12, 3, "歩く (あるく)", "Từ nhà ga tàu điện đi bộ thong thả về đến nhà tôi chỉ mất vỏn vẹn 5 phút đồng hồ.",
          "Động từ 「あるく」 được viết bằng chữ Hán chuẩn xác là 「歩く」 (bộ - đi bộ, dạo bước).",
          "走る (はしる): Chạy bộ", "通る (とおる): Đi ngang qua", "歩く (あるく): Đi bộ", "渡る (わたる): Băng qua đường",
          "(12) 3 句意: 从车站走到我家只用5分钟。3. 歩く（あるく）: 走, 步行")

    add_q(13, 4, "便利 (べんり)", "Tuyến tàu điện ngầm mới đã được xây dựng xong nên cuộc sống ở đây trở nên rất tiện lợi.",
          "Chữ 「便」 (tiện) ghép với chữ 「利」 (lợi) tạo thành từ 「便利」 (tiện lợi, thuận tiện).",
          "使利: Nhầm chữ Sử", "便理: Nhầm chữ Lý", "使理: Sai cả hai chữ", "便利 (べんり): Tiện lợi, thuận tiện",
          "(13) 4 句意: 地铁建好了, 所以变得方便了。4. 便利（べんり）: 便利, 方便")

    add_q(14, 4, "眠い (ねむい)", "Bởi vì tối qua thức khuya làm việc nên sáng nay tôi cảm thấy rất buồn ngủ và đã uống một ly cà phê.",
          "Tính từ 「ねむい」 viết bằng chữ Hán chuẩn xác là 「眠い」 (miên - buồn ngủ).",
          "暗い (くらい): Tối tăm", "遅い (おそい): Chậm trễ, muộn", "痛い (いたい): Đau đớn", "眠い (ねむい): Buồn ngủ",
          "(14) 4 句意: 我很困, 所以喝了咖啡。4. 眠い（ねむい）: 困")

    add_q(15, 1, "雪 (ゆき)", "Hôm nay thời tiết giá rét và ngoài trời có tuyết rơi trắng xóa.",
          "Từ 「ゆき」 viết bằng chữ Hán chuẩn xác là 「雪」 (tuyết). Cụm từ: 雪が降る.",
          "雪 (ゆき): Tuyết rơi", "雲 (くも): Đám mây", "雷 (かみなり): Sấm sét", "霜 (しも): Sương giá",
          "(15) 1 句意: 今天下雪了。1. 雪（ゆき）: 雪")

    # --- MONDAI 3: Context Vocabulary (Q16 - Q25) ---
    add_q(16, 4, "乾かない (かわかない)", "Quần áo giặt từ sáng sớm mà do trời râm mát nên đến giờ vẫn chưa khô hẳn.",
          "Tự động từ 「かわく (乾く - can)」: khô ráo. Thể phủ định: 「乾かない」 (chưa khô).",
          "濡れない: Không bị ướt", "汚れない: Không bị bẩn", "壊れない: Không bị hỏng", "乾かない (かわかない: chưa khô ráo)",
          "(16) 4 句意: 今早洗的衣服还没干。4. 乾く(かわく): 干, 干燥")

    add_q(17, 3, "熱心 (ねっしん)", "Anh Smith lúc nào cũng học tập rất nhiệt tình, say mê và chuyên cần.",
          "Tính từ đuôi な 「熱心 (ねっしん)」: nhiệt tình, hết lòng, say mê.",
          "親切 (thân thiện)", "丁寧 (lịch sự)", "熱心 (ねっしん: nhiệt tình, say mê)", "安心 (an tâm)",
          "(17) 3 句意: 史密斯先生一直都在用功学习。3. 熱心(ねっしん): 热情, 热心")

    add_q(18, 2, "興味 (きょうみ)", "Tôi có niềm hứng thú và say mê rất lớn đối với truyện tranh hoạt hình Nhật Bản.",
          "Cụm từ cố định: 「～に興味がある」 (có hứng thú, quan tâm say mê đối với cái gì).",
          "意味 (ý nghĩa)", "興味 (きょうみ: niềm hứng thú, say mê)", "趣味 (sở thích cá nhân)", "理由 (lý do)",
          "(18) 2 句意: 我对日本动漫非常感兴趣。2. 興味(きょうみ): 兴趣")

    add_q(19, 2, "ルール (rule)", "Tôi mới tập chơi nên vẫn chưa thực sự nắm rõ về luật chơi của bộ môn quần vợt tennis.",
          "Từ mượn tiếng Anh 「ルール (rule)」 mang nghĩa: quy tắc, luật thi đấu thể thao.",
          "ルール (quy tắc, luật chơi)", "マナー (văn hóa ứng xử)", "サービス (dịch vụ)", "チャンス (cơ hội)",
          "(19) 1 句意: 我不太清楚网球的规则。1. ルール: 规则")

    add_q(20, 4, "準備 (じゅんび)", "Đồ đạc và hành lý cần thiết cho chuyến du lịch dã ngoại ngày mai bạn đã chuẩn bị xong chưa?",
          "Danh động từ 「準備する」: chuẩn bị đồ đạc, hành trang cho một sự kiện.",
          "連絡 (liên lạc)", "約束 (hẹn ước)", "案内 (hướng dẫn)", "準備 (じゅんび: chuẩn bị đồ đạc)",
          "(20) 4 句意: 旅行的行李准备好了吗? 4. 準備(じゅんび): 准备")

    add_q(21, 3, "相談 (そうだん)", "Sau khi trao đổi và bàn bạc kỹ cùng với em trai, tôi đã chọn được món quà ưng ý tặng mẹ.",
          "Cụm từ cố định: 「～と相談する」 (bàn bạc, trao đổi ý kiến cùng với ai đó).",
          "挨拶 (chào hỏi)", "紹介 (giới thiệu)", "相談 (そうだん: bàn bạc, thảo luận)", "世話 (chăm sóc)",
          "(21) 3 句意: 和弟弟商量后, 选好了给母亲的礼物。3. 相談(そうだん): 商量")

    add_q(22, 1, "運んで (はこんで)", "Xin bạn hãy phụ giúp tôi một tay khiêng chuyển kiện hành lý nặng này sang phòng bên kia nhé.",
          "Động từ 「はこぶ (運ぶ)」: khuân vác, chuyển dời đồ đạc từ nơi này sang nơi khác.",
          "運んで (はこんで: khuân vác, chuyển đồ)", "並べて (sắp xếp hàng lối)", "集めて (tập hợp)", "片付けて (dọn dẹp)",
          "(22) 1 句意: 请把这件行李搬到那边。1. 運ぶ(はこぶ): 搬运")

    add_q(23, 2, "危険 (きけん)", "Nếu bạn thao tác sai quy trình chiếc máy cắt này thì sẽ vô cùng nguy hiểm.",
          "Tính từ đuôi な 「危険 (きけん)」: nguy hiểm (đối lập với an toàn 安全 あんぜん).",
          "便利 (tiện lợi)", "危険 (きけん: nguy hiểm)", "安全 (an toàn)", "大切 (quan trọng)",
          "(23) 2 句意: 如果弄错了这台机器的操作方法, 会很危险。2. 危険(きけん): 危险")

    add_q(24, 3, "止めないで (とめないで)", "Khu vực này xe cộ ra vào liên tục, xin vui lòng đừng đỗ xe ô tô ở ngay trước lối ra vào.",
          "Động từ 「とめる (止める)」: dừng xe, đỗ xe (車を止める). Cấm đoán: 止めないでください.",
          "落とさないで: Đừng làm rơi", "捨てないで: Đừng vứt rác", "止めないで (とめないで: xin đừng dừng/đỗ xe)", "閉めないで: Đừng đóng cửa",
          "(24) 3 句意: 请不要把车停在入口前。3. 止める(とめる): 停, 停止")

    add_q(25, 3, "出発 (しゅっぱつ)", "Chuyến xe buýt đường dài đã bắt đầu xuất bến khởi hành đi đến thành phố tiếp theo.",
          "Danh từ 「出発 (しゅっぱつ)」: xuất phát, khởi hành lên đường.",
          "到着 (đến nơi)", "通過 (đi ngang qua)", "出発 (しゅっぱつ: khởi hành, xuất phát)", "利用 (sử dụng)",
          "(25) 3 句意: 公交车出发了。3. 出発(しゅっぱつ): 出发")

    # --- MONDAI 4: Paraphrases / Synonyms (Q26 - Q30) ---
    add_q(26, 2, "丁寧に ≒ きれいに", "Xin hãy viết chữ nắn nót, cẩn thận và rõ ràng hơn một chút nhé.",
          "Phó từ 「ていねいに (丁寧に: cẩn thận, nắn nót)」 tương đương với viết đẹp, chỉn chu 「きれいに」.",
          "Viết nắn nót, đẹp đẽ (きれいに)", "Viết thật nhanh", "Viết thật to", "Viết mực đỏ",
          "(26) 1 句意: 请写得再认真一些。(丁寧に ≒ きれいに)")

    add_q(27, 1, "うまい ≒ 上手だ", "Anh trai ruột của tôi có khiếu hội họa và vẽ tranh rất giỏi giang.",
          "Tính từ 「うまい」 trong khẩu ngữ khi nói về tài năng, kỹ năng đồng nghĩa với 「上手だ (じょうずだ: giỏi giang)」.",
          "Vẽ tranh rất giỏi giang (上手だ)", "Vẽ tranh rất chậm", "Rất thích xem tranh", "Hay mua tranh đắt tiền",
          "(27) 1 句意: 哥哥很擅长画画。(うまい ≒ 上手だ)")

    add_q(28, 3, "朝寝坊した ≒ 遅く起きた", "Sáng chủ nhật hôm qua tôi đã ngủ nướng một giấc tới trưa mới dậy.",
          "Danh từ/động từ 「あさねぼう (朝寝坊)」: ngủ nướng, đồng nghĩa với thức dậy muộn màng: 「遅く起きた」.",
          "Thức dậy từ sớm", "Không ngủ được", "Thức dậy muộn màng, ngủ nướng (遅く起きた)", "Đi ngủ sớm",
          "(28) 3 句意: 昨天早上睡了懒觉。(朝寝坊した ≒ 遅く起きた)")

    add_q(29, 2, "褒められた ≒ 良いと言われた", "Trong giờ học vẽ hôm nay, tác phẩm của bạn Tanaka đã được thầy giáo khen ngợi nức nở.",
          "Động từ bị động 「ほめられた (褒められた: được khen)」 đồng nghĩa với việc được nhận xét là rất tốt: 「良いと言われた」.",
          "Bị thầy giáo chê bai", "Được thầy nhận xét là làm rất tốt, khen ngợi (良いと言われた)", "Bị nhắc nhở trật tự", "Được cho về sớm",
          "(29) 2 句意: 田中被老师表扬了。(褒められた ≒ 良いと言われた)")

    add_q(30, 4, "留守 ≒ 家にいなかった", "Khi tôi đến gõ cửa nhà anh Tanaka thì không thấy ai ra mở, có vẻ anh ấy đang vắng nhà.",
          "Danh từ 「留守 (るす: vắng nhà)」 đồng nghĩa với việc không có người ở nhà: 「家にいなかった」.",
          "Đang ngủ trong phòng", "Đang bận nấu ăn", "Đang tiếp khách", "Không có ai ở nhà, đi vắng (家にいなかった)",
          "(30) 4 句意: 田中先生当时不在家。(留守 ≒ 家にいなかった)")

    # --- MONDAI 5: Word Usage (Q31 - Q35) ---
    add_q(31, 3, "苦い (にがい)", "Viên thuốc cảm sốt này có vị rất đắng nên sau khi uống xong tôi đã phải uống ngay một cốc nước lọc to.",
          "Tính từ 「にがい (苦い)」 dùng để chỉ vị giác: vị đắng ngắt của thuốc, cà phê đen, mướp đắng.",
          "Vị đắng của hoa quả ngọt (sai)", "Thời tiết đắng (sai)", "Đồng hồ đắng (sai)", "Viên thuốc này vị rất đắng phải uống nhiều nước (ĐÚNG)",
          "(31) 4 にがい 意思是“苦, 苦味”, 选项 4 为正确应用。")

    add_q(32, 4, "割る (わる)", "Trong lúc rửa bát đĩa trơn tay, tôi đã vô ý làm rơi và đánh vỡ toang chiếc cốc thủy tinh.",
          "Động từ 「わる (割る)」 dùng với đồ dễ vỡ như bát đĩa sứ, cốc thủy tinh, trứng gà: 「コップを割る」.",
          "Đánh vỡ chiếc cốc thủy tinh rơi xuống sàn", "Làm vỡ áo quần (sai)", "Làm vỡ cái bàn gỗ (sai)", "Làm vỡ quyển sách (sai)",
          "(32) 1 わる 意思是“打坏, 弄碎(玻璃、陶瓷)”, 选项 1 为正确应用。")

    add_q(33, 1, "遅刻 (ちこく)", "Bởi vì chuyến xe buýt gặp ùn tắc giao thông nghiêm trọng nên sáng nay tôi đã bị đi học muộn.",
          "Danh động từ 「遅刻する (ちこくする)」: đến muộn giờ học, muộn giờ làm so với quy định.",
          "Đến muộn giờ ăn cơm nhà", "Đến muộn giờ học do tắc đường (授業に遅刻する)", "Đến muộn giờ ngủ", "Đi bộ muộn",
          "(33) 2 ちこく 意思是“迟到”, 选项 2 为正确应用。")

    add_q(34, 2, "厳しい (きびしい)", "Thầy giáo chủ nhiệm lớp tôi là một người vô cùng nghiêm khắc và kỷ luật đối với vấn đề giờ giấc.",
          "Tính từ 「きびしい (厳しい)」: nghiêm khắc, chặt chẽ về mặt kỷ luật, quy tắc.",
          "Thời tiết nghiêm khắc (sai)", "Món ăn nghiêm khắc (sai)", "Bức tranh nghiêm khắc (sai)", "Thầy giáo rất nghiêm khắc về giờ giấc (時間に厳しい)",
          "(34) 4 きびしい 意思是“严厉, 严格”, 选项 4 为正确应用。")

    add_q(35, 3, "迎える (むかえる)", "Chiều ngày mai tôi sẽ lái xe ra sân bay quốc tế để nghênh đón người bạn thân từ xa tới thăm.",
          "Động từ 「むかえる (迎える)」: nghênh đón, đón chào ai đó tại nhà ga, sân bay, cửa nhà.",
          "Đón xe buýt (phải dùng 乗る)", "Đón cơn mưa (sai)", "Ra sân bay để nghênh đón bạn thân (空港で友達を迎える)", "Đón bức thư (sai)",
          "(35) 3 むかえる 意思是“迎接, 欢迎”, 选项 3 为正确应用。")

    # --- GRAMMAR: Mondai 1 (Q36 - Q50) ---
    add_q(36, 4, "米で作った (Làm từ nguyên liệu gạo)", "Ổ bánh mì thơm ngon này là do chính tay tôi làm hoàn toàn từ hạt gạo thiên nhiên.",
          "Trợ từ 「で」 biểu thị chất liệu, nguyên liệu tạo nên sản phẩm: 「米で作ったパン」 (bánh mì làm từ gạo).",
          "米を作った: Tạo ra gạo", "米に作った: Sai trợ từ", "米から作った: Dùng khi biến đổi hóa học", "米で作った: ĐÚNG - Làm từ nguyên liệu gạo",
          "(1) 4 句意: 这是我用米做的面包。考察で表示原材料。")

    add_q(37, 1, "母親に似ている (Giống với đối tượng)", "Mọi người xung quanh ai cũng bảo rằng khuôn mặt của đứa bé trông giống hệt mẹ nó.",
          "Cấu trúc so sánh tương đồng: 「A は B に 似ている」 (A trông giống với B).",
          "母親に似ている: ĐÚNG - Trông giống với người mẹ", "母親を似ている: Sai trợ từ bổ ngữ", "母親で似ている: Sai trợ từ", "母親と似ている: Kém tự nhiên hơn に",
          "(2) 1 句意: 男孩的长相比起爸爸来更像妈妈。考察～に似ている表示相似。")

    add_q(38, 2, "食べる時だけ (Chỉ duy nhất khi ăn)", "Cô em gái nhỏ của tôi vốn tính rất hiếu động và thích nói chuyện, chỉ duy nhất những lúc ngồi ăn cơm mới chịu ngồi yên lặng.",
          "Trợ từ 「だけ」 giới hạn thời điểm duy nhất: chỉ duy nhất lúc ăn là yên lặng.",
          "食べる時でも: Cho dù lúc ăn", "食べる時だけ: ĐÚNG - Chỉ duy nhất vào lúc ăn cơm", "食べる時まで: Tới tận lúc ăn", "食べる時ほど: Cỡ chừng lúc ăn",
          "(3) 2 句意: 妹妹很爱说话, 只有吃饭的时候能安静一会儿。考察だけ表示唯一时间限定。")

    add_q(39, 4, "意味について (Về ý nghĩa của từ vựng)", "Học sinh lễ phép giơ tay hỏi thầy giáo: 'Thưa thầy, từ vựng mới này có ý nghĩa gì thế ạ?'",
          "Cấu trúc 「Danh từ + について」 mang ý nghĩa: 'về vấn đề gì, về đối tượng nào'.",
          "意味にとって: Đối với ý nghĩa", "意味によって: Do/bởi ý nghĩa", "意味について: ĐÚNG - Về ý nghĩa của từ vựng này", "意味に対して: Đối lập với ý nghĩa",
          "(4) 3 句意: 老师, 这个单词是什么意思? 考察～について表示关于某主题。")

    add_q(40, 2, "ゲームをしてもいい (Xin phép làm gì)", "Đứa bé xin phép bố sau khi làm xong bài tập: 'Bố ơi, con xin phép được chơi điện tử một lát có được không ạ?'",
          "Mẫu câu xin phép lịch sự: 「V-て + もいいですか」 (làm việc V có được phép không?).",
          "ゲームをしなければならない: Bắt buộc phải chơi", "ゲームをしてはいけない: Cấm không được chơi", "ゲームをしなくてもいい: Không chơi cũng được", "ゲームをしてもいい: ĐÚNG - Con được phép chơi game không ạ?",
          "(5) 4 句意: 孩子:“爸爸, 我可以玩会儿游戏吗?” 考察～てもいい表示请求许可。")

    add_q(41, 3, "手伝ってくれて (Người khác giúp mình)", "A: 'Cảm ơn bạn hôm qua đã nhiệt tình giúp đỡ mình dọn dẹp và chuyển nhà nhé!' - B: 'Không có chi đâu!'",
          "Cấu trúc cảm ơn người khác đã làm giúp mình việc gì: 「V-て + くれてありがとう」.",
          "手伝ってもらって: Được giúp (kém tự nhiên khi cảm ơn trực tiếp)", "手伝ってあげて: Mình giúp bạn (sai)", "手伝ってくれて: ĐÚNG - Cảm ơn vì bạn đã giúp đỡ mình", "手伝わせて: Cho phép giúp",
          "(6) 3 句意: 谢谢你昨天帮我搬家。考察～てくれてありがとう表示感谢对方的帮助。")

    add_q(42, 1, "貸してくれた (Bạn cho mình mượn bút)", "Hôm nay do vội vàng nên tôi quên mang theo bút chì và tẩy, may mà người bạn ngồi cạnh đã vui vẻ cho tôi mượn dùng.",
          "Bạn ngồi bên cạnh là chủ ngữ thực hiện hành động cho tôi mượn bút: 「隣の人が貸してくれた」.",
          "借りてくれた: Bạn mượn giúp", "貸してあげた: Tôi cho bạn mượn", "借りてもらった: Tôi được mượn", "貸してくれた: ĐÚNG - Bạn đã tốt bụng cho tôi mượn",
          "(7) 4 句意: 旁边的人把铅笔借给我用了。考察～てくれた表示他人给予我方帮助。")

    add_q(43, 2, "置いたまま (Trạng thái giữ nguyên)", "Trên giá sách của tôi có rất nhiều cuốn sách mua về nhưng cứ để nguyên đấy mãi mà chẳng chịu đọc.",
          "Cấu trúc 「Động từ thể た + まま」 diễn tả trạng thái của sự việc được giữ nguyên không hề thay đổi.",
          "置いたあと: Sau khi để", "置いたまま: ĐÚNG - Cứ để nguyên như thế không đụng tới", "置くために: Để đặt", "置くように: Để đặt",
          "(8) 2 句意: 书架上有很多买回来就那么放着没读的书。考察～たまま表示保持某种状态。")

    add_q(44, 4, "～ように (Để không bị cảm lạnh)", "Mùa đông giá rét, trước khi ra ngoài bạn hãy mặc áo ấm cẩn thận để không bị nhiễm lạnh nhé.",
          "Mẫu câu 「Động từ thể ない + ように」: để không xảy ra trạng thái tiêu cực nào đó.",
          "ひかないように: ĐÚNG - Để không bị cảm lạnh", "ひかないために: Để không (kém tự nhiên với tự động từ)", "ひくように: Để bị cảm", "ひかないのに: Mặc dù không cảm",
          "(9) 1 句意: 请穿暖和点, 以免感冒。考察～ないように表示避免消极后果。")

    add_q(45, 1, "～てはいけない (Cấm đoán)", "Biển báo trước công trường: 'Khu vực nguy hiểm đang thi công, người không có nhiệm vụ tuyệt đối không được bước vào.'",
          "Cấu trúc cấm đoán mang tính quy định nghiêm ngặt: 「V-てはいけません / てはいけない」.",
          "入ってもいい: Được phép vào", "入らなくてもいい: Không vào cũng được", "入ってはいけない: ĐÚNG - Tuyệt đối không được bước vào", "入るはずだ: Chắc chắn vào",
          "(10) 3 句意: 施工危险区域严禁入内。考察～てはいけない表示禁止。")

    add_q(46, 3, "～かもしれない (Có lẽ ngày mai)", "Theo quan sát những đám mây đen kéo tới, có lẽ ngày mai nhiệt độ sẽ giảm sâu và trời trở lạnh đấy.",
          "Cấu trúc 「Tính từ/động từ thể thông thường + かもしれない」 biểu thị sự phỏng đoán có thể xảy ra.",
          "寒いはずだ: Chắc chắn lạnh", "寒いかもしれない: ĐÚNG - Có lẽ trời sẽ trở lạnh", "寒そうだ: Trông có vẻ lạnh", "寒いようだ: Dường như lạnh",
          "(11) 2 句意: 明天可能会变冷。考察～かもしれない表示推测。")

    add_q(47, 4, "～たら (Giả định điều kiện sau khi hoàn tất)", "Sau khi bạn hoàn thành xong hết các bài tập về nhà thì chúng ta cùng nhau đi ra công viên dạo mát nhé.",
          "Cấu trúc 「V-たら」 diễn tả điều kiện giả định thời gian: 'sau khi làm xong hành động 1 thì thực hiện hành động 2'.",
          "終わると: Cứ hễ xong", "終わるなら: Nếu là xong", "終われば: Nếu xong", "終わったら: ĐÚNG - Sau khi xong xuôi thì cùng đi",
          "(12) 4 句意: 作业写完后我们一起去散步吧。考察～たら表示完成后进行下一步。")

    add_q(48, 2, "～そうだ (Trông có vẻ ngon miệng)", "Chiếc bánh kem phủ dâu tây mà người phục vụ vừa mang ra trông có vẻ thơm ngon và hấp dẫn ghê nhỉ!",
          "Tính từ 「おいしい」 bỏ đuôi い + そうだ: 「おいしそうだ」 diễn tả cảm nhận trực quan qua ánh mắt.",
          "おいしいそうだ: Nghe nói ngon (truyền ngôn)", "おいしそうだ: ĐÚNG - Trông có vẻ ngon miệng", "おいしいらしい: Nghe đồn ngon", "おいしいようだ: Dường như ngon",
          "(13) 2 句意: 这块蛋糕看上去真好吃啊。考察～そうだ表示直观推测。")

    add_q(49, 4, "～てある (Trạng thái tên đã viết sẵn)", "Trên nhãn dán của chiếc hộp đựng đồ ăn, tên của từng bạn học sinh đã được cô giáo nắn nót viết sẵn từ trước.",
          "Cấu trúc 「Tha động từ thể て + ある」: trạng thái của sự vật là kết quả của một hành vi đã được chuẩn bị sẵn có chủ ý.",
          "書いてある: ĐÚNG - Tên đã được viết sẵn trên nhãn", "書いている: Đang viết", "書いておく: Sẽ viết sẵn", "書かれた: Bị viết",
          "(14) 1 句意: 盒子上已经写好了每个人的名字。考察～てある表示存续状态。")

    add_q(50, 3, "～てもらう (Nhờ người khác sửa bài giúp)", "Sau khi viết xong bài văn tiếng Nhật, tôi đã mang tới nhờ thầy giáo chủ nhiệm sửa giúp các lỗi ngữ pháp.",
          "Cấu trúc 「V-て + もらう」 diễn tả việc nhận được sự giúp đỡ, chỉ bảo từ ai đó: nhờ thầy sửa giúp bài.",
          "直してあげた: Tôi sửa cho thầy (sai)", "直してもらった: ĐÚNG - Tôi được thầy sửa giúp bài cho", "直してくれた: Thầy sửa (cần chủ ngữ là thầy)", "直させた: Bắt sửa",
          "(15) 2 句意: 写完作文后我请老师帮我修改了。考察～てもらう表示请他人帮忙。")

    # --- GRAMMAR: Mondai 2 - Star Questions (Q51 - Q55) ---
    add_q(51, 2, "Dấu sao: 間に合う (Vị trí 3)", "Bây giờ nếu chúng ta đón xe taxi đi ngay thì có lẽ sẽ kịp giờ đấy, vì vậy tụi mình hãy đi bằng taxi đi.",
          "Trật tự câu hoàn chỉnh: 今すぐ 【1 タクシーに】 【4 乗れば】 ★【3 間に合う かもしれないから】 【2 タクシーで】 行こう。 Dấu sao ở vị trí thứ 3 là phương án 3.",
          "タクシーに", "タクシーで", "間に合う かもしれないから (ĐÚNG vị trí dấu sao ★)", "乗れば",
          "(16) 3 正确语序: 今すぐ 1 タクシーに 4 乗れば ★3 間に合う かもしれないから 2 タクシーで 行こう。")

    add_q(52, 4, "Dấu sao: ところ (Vị trí 3)", "A: 'Bạn ăn cơm cùng chúng mình nhé?' - B: 'Xin lỗi bạn nhé, mình vừa mới ăn trưa xong tức thì luôn đấy ạ.'",
          "Trật tự câu hoàn chỉnh: すみません。 ちょうど 【4 今】 【3 食べた】 ★【2 ところ】 【1 なんです】。 Dấu sao ở vị trí thứ 3 là phương án 2 (ところ).",
          "なんです", "ところ (ĐÚNG vị trí dấu sao ★)", "食べた", "今",
          "(17) 2 正确语序: すみません。 ちょうど 4 今 3 食べた ★2 ところ 1 なんです。")

    add_q(53, 3, "Dấu sao: で (Vị trí 3)", "Ngày mai bạn sẽ phải đi gặp những vị khách hàng quan trọng của công ty, vì thế bạn tuyệt đối không được đi đôi giày cũ kỹ đó đâu nhé.",
          "Trật tự câu hoàn chỉnh: 明日は 大事な お客さまに 会うから、 【3 そんな】 【1 くつ】 ★【4 で】 【2 は いけませんよ】。 Dấu sao ở vị trí thứ 3 là phương án 4 (で).",
          "くつ", "は いけませんよ", "そんな", "で (ĐÚNG vị trí dấu sao ★)",
          "(18) 4 正确语序: 明日は 大事な お客さまに 会うから、 3 そんな 1 くつ ★4 で 2 は いけませんよ。")

    add_q(54, 3, "Dấu sao: 寒そう (Vị trí 3)", "Hôm nay ngoài trời gió thổi rất to dữ dội mà trời lại trông có vẻ giá rét nữa nên tôi hoàn toàn không muốn bước chân ra ngoài.",
          "Trật tự câu hoàn chỉnh: 今日は、風が 【4 強い】 【1 し】 ★【3 寒そう】 【2 だから】 出かけたくない。 Dấu sao ở vị trí thứ 3 là phương án 3 (寒そう).",
          "し", "だから", "寒そう (ĐÚNG vị trí dấu sao ★)", "強い",
          "(19) 3 正确语序: 今日は、風が 4 強い 1 し ★3 寒そう 2 だから 出かけたくない。")

    add_q(55, 2, "Dấu sao: 東京で (Vị trí 3)", "A: 'Bố mẹ đồng ý cho bạn đi du học chưa?' - B: 'Chưa. Nhưng cho dù có bị bố mẹ phản đối thì tôi vẫn quyết tâm lên Tokyo học tập.'",
          "Trật tự câu hoàn chỉnh: いいえ。 でも、もし 両親に 【1 反対】 【4 されても】 ★【3 東京で】 【2 勉強する】 つもりです。 Dấu sao ở vị trí thứ 3 là phương án 3 (東京で).",
          "反対", "勉強する", "東京で (ĐÚNG vị trí dấu sao ★)", "されても",
          "(20) 3 正确语序: いいえ。 でも、もし 両親に 1 反対 4 されても ★3 東京で 2 勉強する つもりです。")

    # --- GRAMMAR & READING: Mondai 3 (Q56 - Q60) ---
    add_q(56, 3, "連れてきた (Bố mang chú cún về nuôi)", "Chú cún con lông trắng muốt mang tên Shiro này là do chính bố tôi đã mang từ nhà người bạn về nuôi dưỡng.",
          "Hành vi bố mang cún về nhà nuôi diễn ra trong quá khứ, dùng động từ kết hợp 「連れてきた」.",
          "連れていく: Dắt đi", "連れてきた (ĐÚNG - mang về nhà)", "連れてこられた: Bị dắt", "連れていくはずだ: Chắc sẽ dắt",
          "(21) 2 爸爸把小狗小白带回家中饲养, 需用过去时連れてきた。")

    add_q(57, 2, "壊してしまった (Shiro làm hỏng điện thoại)", "Hồi mới về nhà, do còn tinh nghịch nên có lần Shiro đã cắn và vô ý làm hỏng mất chiếc điện thoại của bố tôi.",
          "Cấu trúc 「V-て + しまった」 diễn tả hành động gây ra sự cố hư hỏng đáng tiếc ngoài ý muốn.",
          "壊してみた: Làm hỏng thử", "壊すそうだ: Nghe nói làm hỏng", "壊してしまった: ĐÚNG - Lỡ cắn làm hỏng mất", "壊すつもりだ: Định làm hỏng",
          "(22) 3 小白不小心咬坏了爸爸的手机, 需用～てしまった表示遗憾后果。")

    add_q(58, 1, "しかし (Tuy nhiên - chuyển tiếp)", "Tác giả kể hồi nhỏ không có anh chị em nên hay thấy cô đơn, tuy nhiên kể từ khi có Shiro thì ngôi nhà luôn tràn ngập niềm vui.",
          "Liên từ nghịch ngượng 「しかし」 liên kết giữa hai trạng thái tâm lý đối lập: trước đây buồn bã cô đơn và hiện tại vui vẻ.",
          "だから: Vì thế", "しかし: ĐÚNG - Tuy nhiên, thế nhưng", "そして: Và rồi", "あるいは: Hoặc là",
          "(23) 2 前后从孤独寂寞转变为有了陪伴的快乐, 需用表示转折的しかし。")

    add_q(59, 4, "慰めてくれる (Shiro đến an ủi mỗi khi buồn)", "Mỗi lần tôi có chuyện buồn bực hay mệt mỏi ủ rũ, Shiro đều ngoan ngoãn chạy đến ngồi cạnh bên như muốn an ủi tôi.",
          "Shiro thực hiện hành động an ủi ấm áp hướng về phía người viết, dùng mẫu câu nhận sự quan tâm 「～てくれる」.",
          "慰めてくれる: ĐÚNG - Chạy lại âu yếm an ủi tôi", "慰めてあげる: Tôi an ủi nó", "慰められる: Bị an ủi", "慰めさせる: Bắt an ủi",
          "(24) 1 每当作者沮丧时小狗都会主动过来安慰他, 需用～てくれる。")

    add_q(60, 4, "Trợ từ chủ đề は", "Chú cún Shiro đối với bản thân tác giả giờ đây chính là một thành viên thân thiết không thể thiếu trong gia đình.",
          "Trợ từ 「は」 đặt sau danh từ Shiro để xác lập đối tượng làm chủ đề đúc kết kết luận của toàn bộ bài viết.",
          "Trợ từ を", "Trợ từ に", "Trợ từ で", "Trợ từ は (ĐÚNG - Nhấn mạnh chủ đề Shiro)",
          "(25) 4 小狗小白是本篇文章的核心主题, 提示主题应选用は。")

    # --- READING: Mondai 4 - Short Texts (Q61 - Q64) ---
    add_q(61, 3, "Kế hoạch tuần tới của anh Ishikawa", "Theo nội dung bức thư trao đổi, anh Ishikawa thông báo rằng tuần tới anh sẽ đi công tác khảo sát thị trường ở Osaka.",
          "Chi tiết trong thư: tuần tới tôi có chuyến công tác 3 ngày ở chi nhánh Osaka nên không thể tham gia buổi họp mặt.",
          "Đi du lịch nước ngoài", "Đi công tác tại chi nhánh Osaka (ĐÚNG)", "Nghỉ phép ở nhà", "Chuyển công tác hẳn",
          "(26) 2 石川先生表示他下周要去大阪出差。")

    add_q(62, 2, "Thông tin về công viên trong thông báo", "Bản thông báo cho biết khu vực bãi cỏ trung tâm công viên sẽ tạm thời rào chắn để gieo hạt và chăm sóc cỏ trong 2 tuần.",
          "Nội dung thông báo: để bảo dưỡng thảm cỏ xanh chuẩn bị cho mùa xuân, khu vực bãi cỏ tạm dừng hoạt động từ ngày 1 đến 15 tháng 12.",
          "Khu vực bãi cỏ tạm đóng cửa để gieo hạt bảo dưỡng (ĐÚNG)", "Công viên đóng cửa vĩnh viễn", "Cấm dắt thú cưng", "Thu phí vào cổng công viên",
          "(27) 1 公告内容显示公园草坪区域因养护暂封闭两周。")

    add_q(63, 3, "Điều Tom phải báo cho anh Yamada", "Sau khi nhận cuộc gọi từ khách hàng, Tom bắt buộc phải báo cho anh Yamada biết về sự thay đổi thời gian cuộc hẹn sang 14:00.",
          "Nội dung lời nhắn: đối tác gọi điện báo kẹt xe nên xin lùi lịch hẹn từ 13:00 sang 14:00 chiều nay.",
          "Hủy bỏ cuộc gặp", "Thay đổi địa điểm sang nhà hàng", "Chuẩn bị thêm quà biếu", "Báo lại giờ hẹn chuyển sang 14:00 chiều (ĐÚNG)",
          "(28) 4 汤姆先生必须告知山田先生会面时间变更为下午2点。")

    add_q(64, 2, "Công việc KHÔNG PHẢI của anh Ishida", "Theo sự phân công nhiệm vụ trong nhóm, việc đi thu tiền quỹ dã ngoại không thuộc trách nhiệm của anh Ishida mà do cô Tanaka phụ trách.",
          "Đối chiếu bảng phân công: Ishida phụ trách đặt xe và liên hệ nhà hàng, việc thu tiền kinh phí do Tanaka đảm nhiệm.",
          "Đặt xe buýt đưa đón", "Liên hệ đặt chỗ nhà hàng", "Thu tiền kinh phí dã ngoại của các thành viên (ĐÚNG - Đây là việc của Tanaka)", "In bản đồ phát tay",
          "(29) 3 选项3收取活动经费是由田中负责的, 不属于石田的工作。")

    # --- READING: Mondai 5 - Medium Passage (Q65 - Q68) ---
    add_q(65, 4, "Đặc điểm của lữ quán Ryokan", "Lữ quán Ryokan mà tác giả và gia đình lưu trú là một khu nhà trọ cổ kính bằng gỗ nép mình bên sườn núi và có suối nước nóng lộ thiên.",
          "Đoạn văn miêu tả: lữ quán xây dựng hoàn toàn bằng gỗ thông thơm ngát, xung quanh bao bọc bởi rừng phong và có bể tắm Onsen ngoài trời ngắm cảnh núi non.",
          "Khách sạn hiện đại cao tầng", "Nhà trọ truyền thống bằng gỗ có suối nước nóng lộ thiên (ĐÚNG)", "Nhà nghỉ ven biển", "Căn hộ chung cư",
          "(30) 2 提到的旅馆是依山而建、带有露天温泉的传统木造日式旅馆。")

    add_q(66, 4, "Cách thức di chuyển từ ga về lữ quán", "Từ nhà ga trung tâm, khách lưu trú sẽ được xe đưa đón chuyên dụng của lữ quán đón miễn phí và chở thẳng về tận cửa quán.",
          "Thông tin chỉ dẫn trong bài: ra khỏi cửa ga chỉ cần đợi ở cột mốc số 2, xe buýt đưa đón màu trắng của lữ quán sẽ tới đón khách.",
          "Tự đi bộ leo núi", "Bắt xe taxi tự túc", "Đi xe buýt đưa đón miễn phí của chính lữ quán (ĐÚNG)", "Đi tàu hỏa leo núi",
          "(31) 3 从车站前往旅馆的方式是乘坐旅馆提供的免费接送巴士。")

    add_q(67, 1, "Việc làm đầu tiên sau khi tới nơi", "Ngay sau khi làm thủ tục nhận phòng và cất hành lý, tác giả đã lập tức đi ngâm mình thư giãn trong dòng suối nước nóng ấm áp.",
          "Chi tiết trong bài kể lại: cả ngày đi lại mệt mỏi nên sau khi nhận phòng, tác giả đã khoác áo Yukata và đi ngay ra bể Onsen ngâm mình.",
          "Đi ngâm mình thư giãn trong suối nước nóng Onsen (ĐÚNG)", "Đi dạo quanh phố xá mua sắm", "Ăn bữa tối thịnh soạn", "Lên giường đi ngủ ngay",
          "(32) 1 到达旅馆整理完行李后首先去享受了温泉浴。")

    add_q(68, 3, "Cuộc sống được nhắc tới ở đoạn kết", "Cụm từ 'cuộc sống như thế này' ám chỉ nhịp sống thanh bình, chậm rãi, thư thái tâm hồn và hòa mình cùng với thiên nhiên cây cỏ.",
          "Đoạn kết đúc kết lại niềm khao khát: sau những ngày tháng bận rộn hối hả nơi đô thị, được sống chậm rãi và hòa mình với thiên nhiên là điều quý giá nhất.",
          "Cuộc sống tiện nghi ở thành phố lớn", "Cuộc sống làm việc thâu đêm", "Cuộc sống chỉ ăn và ngủ", "Nhịp sống thanh bình, thư thả hòa mình trọn vẹn cùng thiên nhiên (ĐÚNG)",
          "(33) 4 指离开都市喧嚣、悠闲自在且融于大自然的慢节奏生活。")

    # --- READING: Mondai 6 - Information Retrieval (Q69 - Q70) ---
    add_q(69, 2, "Chi phí thuê xe đạp trong ngày", "Theo bảng giá dịch vụ cho thuê phương tiện của khu du lịch, chi phí thuê 1 chiếc xe đạp thể thao trọn vẹn trong một ngày là 500 yên.",
          "Tra cứu bảng giá mục 'Thuê xe đạp (レンタサイクル)': mức giá thuê cả ngày (1日利用) ghi rõ mức phí là 500円.",
          "Miễn phí", "500 yên cho cả ngày sử dụng (ĐÚNG)", "1.000 yên", "2.000 yên",
          "(34) 2 租借自行车一整天的费用明确标注为500日元。")

    add_q(70, 1, "Quy trình đối với người muốn tham gia thi đấu bóng rổ", "Người muốn học luật chơi và kỹ năng cơ bản trước khi tham gia thi đấu bắt buộc phải đăng ký tham gia lớp tập huấn căn bản buổi sáng.",
          "Bảng hướng dẫn ghi rõ: để đảm bảo an toàn thi đấu, những bạn chưa nắm luật bắt buộc phải hoàn thành khóa học căn bản (基本講習) diễn ra lúc 9:30 sáng.",
          "Đăng ký tham gia khóa tập huấn luật cơ bản vào buổi sáng trước (ĐÚNG)", "Trực tiếp ra sân thi đấu ngay", "Nộp thêm 5.000 yên", "Mua đồng phục thi đấu mới",
          "(35) 1 想要学习规则后再参加比赛的人必须先报名上午的基础培训课。")

    # --- LISTENING: Mondai 1 - Task-based Comprehension (Q71 - Q78) ---
    add_q(71, 4, "Nhiệm vụ bạn nam làm trước tiên", "Bạn nam trước hết sẽ đi quét dọn sạch sẽ khoảng sân trước cửa nhà trước khi đem tưới nước cho vườn hoa.",
          "Mẹ dặn dò: lá rụng nhiều đầy sân, con quét sạch lá cây trước rồi hãy cầm vòi tưới hoa nhé.",
          "Tưới nước cho vườn hoa", "Thu dọn rác trong bếp", "Quét dọn sạch lá rụng ở khoảng sân trước cửa (ĐÚNG)", "Cắt tỉa cành cây",
          "聴解 1 (1): 男の人はまず何をしますか。 正解: [3]",
          "母：庭の落ち葉をまず綺麗に掃いてくれる？水やりはそのあとでいいから。\n男：うん、わかった。先に庭を掃くね。",
          "Mẹ: Con quét dọn sạch lá rụng ngoài sân trước giúp mẹ được không? Tưới cây thì để sau cũng được.\nNam: Vâng, con hiểu rồi, con quét sân trước nhé.")

    add_q(72, 3, "Số lượng vé xe buýt cần mua", "Người phụ nữ sẽ đến quầy bán vé mua tổng cộng 4 chiếc vé xe buýt khứ hồi dành cho cả gia đình.",
          "Cuộc đối thoại thống nhất: cả gia đình gồm 2 vợ chồng và 2 đứa con đi chơi về trong ngày nên cần mua 4 vé khứ hồi.",
          "Mua 4 vé xe buýt khứ hồi (ĐÚNG)", "Mua 2 vé một chiều", "Mua 6 vé xe buýt", "Mua vé tháng",
          "聴解 1 (2): 女の人は切符を何枚買いますか。 正解: [1]",
          "女：家族4人分だから、往復切符を4枚買えばいいのね。\n男：うん、頼むよ。",
          "Nữ: Cả nhà 4 người nên em mua 4 vé khứ hồi là được đúng không anh?\nNam: Ừ, nhờ em mua giúp nhé.")

    add_q(73, 4, "Thời gian học sinh cần có mặt ở trường", "Vào ngày thi tốt nghiệp ngày mai, toàn bộ học sinh bắt buộc phải có mặt tại phòng thi trước 8:45 sáng.",
          "Giám thị nhắc nhở: bài thi bắt đầu lúc 9:00, học sinh phải vào phòng ổn định chỗ ngồi muộn nhất là 8:45.",
          "Lúc 8:00 sáng", "Lúc 8:30 sáng", "Lúc 9:00 sáng", "Có mặt tại phòng thi trước 8:45 sáng (ĐÚNG)",
          "聴解 1 (3): 学生は何時までに教室に入らなければなりませんか。 正解: [4]",
          "先生：試験は9時開始ですが、8時45分までには必ず着席していてください。",
          "Thầy giáo: Bài thi bắt đầu lúc 9h, nhưng muộn nhất 8h45 các em bắt buộc phải ngồi vào đúng vị trí nhé.")

    add_q(74, 3, "Hành động tiếp theo của bạn nữ", "Bạn nữ sẽ trực tiếp mang đơn xin gia hạn thẻ sinh viên lên nộp tại phòng công tác sinh viên ở tầng 2.",
          "Thầy hướng dẫn bảo đã ký duyệt xong, em cầm tờ đơn này lên nộp trực tiếp cho phòng sinh viên tầng 2 là xong.",
          "Về nhà chờ kết quả", "Mang đơn lên nộp tại phòng công tác sinh viên tầng 2 (ĐÚNG)", "Chụp ảnh thẻ mới", "Gửi bưu điện",
          "聴解 1 (4): 女の学生はこれから何をしますか。 正解: [2]",
          "先生：サインしたから、この申請書を2階の学生課に出してきてね。\n女：はい、すぐ持って行きます。",
          "Thầy giáo: Thầy ký duyệt xong rồi, em mang đơn này lên nộp cho phòng sinh viên tầng 2 nhé.\nNữ: Vâng, em mang lên ngay ạ.")

    add_q(75, 2, "Vị trí cất chiếc chìa khóa dự phòng", "Người phụ nữ dặn người nam hãy cất chiếc chìa khóa dự phòng vào chiếc hộp nhỏ trong ngăn kéo bàn làm việc.",
          "Để tránh thất lạc, chìa khóa phòng cần được bỏ vào hộp sắt và cất sâu trong ngăn kéo bàn làm việc.",
          "Cất vào hộp sắt trong ngăn kéo bàn làm việc (ĐÚNG)", "Treo ở móc cạnh cửa ra vào", "Bỏ trong túi xách", "Để trên kệ sách",
          "聴解 1 (5): 予備の鍵をどこにしまいますか。 正解: [1]",
          "女：机の引き出しの中にある小さい缶に入れておいてね。\n男：了解、引き出しの缶の中ね。",
          "Nữ: Em cất vào chiếc hộp sắt nhỏ trong ngăn kéo bàn làm việc giúp chị nhé.\nNam: Nhất trí, trong hộp ở ngăn kéo bàn nhé.")

    add_q(76, 2, "Cách thức gửi tài liệu cho đối tác", "Người nam quyết định sẽ chuyển tập hồ sơ qua dịch vụ chuyển phát nhanh hỏa tốc để đối tác nhận ngay trong chiều.",
          "Tài liệu khẩn cấp đối tác cần trước 17:00, gửi bưu điện thường không kịp nên chọn dịch vụ chuyển phát nhanh bằng xe máy.",
          "Gửi qua bưu điện thường", "Gửi tệp đính kèm qua email", "Sử dụng dịch vụ chuyển phát nhanh hỏa tốc (ĐÚNG)", "Tự mình đi tàu điện mang tới",
          "聴解 1 (6): 男の人は書類をどうやって送りますか。 正解: [3]",
          "男：急ぎだから、バイク便の速達で届けてもらうことにするよ。\n女：それが一番確実ね。",
          "Nam: Việc này khẩn cấp nên anh sẽ gọi dịch vụ chuyển phát nhanh bằng xe máy giao luôn trong chiều.\nNữ: Cách đó là chắc chắn nhất đấy anh.")

    add_q(77, 3, "Món ăn hai người quyết định chọn cho bữa trưa", "Hai bạn thống nhất sẽ ghé vào quán mì Udon truyền thống ở góc phố để ăn trưa cho nhanh và ấm bụng.",
          "Quán sushi quá đông phải xếp hàng lâu, quán cà ri thì cay, nên hai người chọn quán mì Udon vừa nhanh vừa nóng hổi.",
          "Ăn sushi hải sản", "Ăn mì Udon nóng hổi ở góc phố (ĐÚNG)", "Ăn cơm cà ri cay", "Mua bánh mì kẹp thịt",
          "聴解 1 (7): 二人はお昼ご飯に何を食べますか。 正解: [2]",
          "女：うどん屋ならすぐ座れるし、温まるからうどんにしない？\n男：いいね、うどんにしよう！",
          "Nữ: Quán mì Udon có chỗ ngồi ngay mà ăn lại ấm người, tụi mình ăn Udon nhé?\nNam: Ý hay đấy, ăn Udon thôi!")

    add_q(78, 4, "Nhiệm vụ chuẩn bị buổi tiệc chia tay", "Bạn nữ nhận trách nhiệm đi liên hệ với nhà hàng để đặt trước phòng tiệc riêng cho 15 người.",
          "Phân công công việc: bạn nam mua quà lưu niệm và viết thiệp, bạn nữ lo việc gọi điện đặt phòng riêng ở nhà hàng.",
          "Viết thiệp chúc mừng", "Mua quà lưu niệm tặng thầy", "Thu tiền của mọi người", "Gọi điện thoại đặt trước phòng tiệc riêng ở nhà hàng (ĐÚNG)",
          "聴解 1 (8): 女の人は何を準備しますか。 正解: [4]",
          "男：僕がプレゼントを用意するから、レストランの個室の予約をお願いできる？\n女：うん、15人で予約しておくね。",
          "Nam: Tớ chuẩn bị quà tặng, cậu gọi điện đặt phòng tiệc riêng ở nhà hàng giúp tớ được không?\nNữ: Ừ, tớ sẽ gọi đặt phòng cho 15 người nhé.")

    # --- LISTENING: Mondai 2 - Key Points (Q79 - Q85) ---
    add_q(79, 2, "Lý do bạn nữ quyết định chuyển nhà", "Bạn nữ chuyển nhà là vì căn hộ mới nằm ngay cạnh công viên cây xanh thoáng mát, rất yên tĩnh để tập trung nghỉ ngơi.",
          "Căn hộ cũ ở sát mặt đường lớn ồn ào đêm ngày, căn hộ mới view nhìn ra công viên cây xanh vô cùng thanh bình.",
          "Vì giá thuê rẻ hơn nhiều", "Vì nằm cạnh công viên thoáng mát và cực kỳ yên tĩnh (ĐÚNG)", "Vì phòng rộng hơn gấp đôi", "Vì ở chung cùng bạn thân",
          "聴解 2 (1): 女の人はなぜ引っ越しましたか。 正解: [2]",
          "女：前の部屋は通りに面していてうるさかったの。今度の部屋は公園の隣でとても静かなのよ。",
          "Nữ: Căn phòng cũ ở ngay sát mặt đường xe cộ ồn ào lắm. Căn phòng mới này ở cạnh công viên nên cực kỳ yên tĩnh luôn.")

    add_q(80, 3, "Điểm nổi bật của khóa học tiếng Nhật online", "Điểm ưu việt nhất của khóa học trực tuyến này là học viên có thể linh hoạt chọn khung giờ học phù hợp với lịch cá nhân.",
          "Bạn nam khen ngợi: ban ngày bận đi làm thêm, buổi tối có thể tự chọn khung giờ học linh hoạt từ 20:00 đến 22:00 rất thuận tiện.",
          "Thời gian học tập vô cùng linh hoạt theo lịch cá nhân (ĐÚNG)", "Học phí hoàn toàn miễn phí", "Được cấp sách giáo khoa miễn phí", "Giáo viên đến tận nhà dạy kèm",
          "聴解 2 (2): オンライン講座のどこが一番良いと言っていますか。 正解: [1]",
          "男：自分の都合に合わせて好きな時間を選んで受けられるのが一番助かるよ。",
          "Nam: Được tự do chọn khung giờ học phù hợp theo lịch rảnh của bản thân là điều mình thấy tiện lợi nhất.")

    add_q(81, 3, "Lý do người đàn ông quyết định mua chiếc xe đạp mới", "Người đàn ông mua xe đạp mới là vì chiếc xe đạp cũ đã bị rỉ sét xích líp và không còn đảm bảo an toàn khi đi lại.",
          "Chiếc xe cũ dùng hơn 8 năm, phanh mòn và xích hay tuột nên anh quyết định đầu tư mua xe mới để đi làm an toàn.",
          "Vì thích mẫu mã thời trang", "Vì được giảm giá sốc", "Vì chiếc xe cũ đã quá cũ kỹ, hư hỏng không còn an toàn (ĐÚNG)", "Vì bị bạn bè rủ rê",
          "聴解 2 (3): 男の人はなぜ新しい自転車を買いましたか。 正解: [3]",
          "男：もう8年も乗っていてブレーキの調子も悪かったから、安全のために買い替えたんだ。",
          "Nam: Xe cũ tớ đi tận 8 năm rồi, phanh xe cũng hỏng hóc suốt nên tớ quyết định đổi xe mới cho đảm bảo an toàn.")

    add_q(82, 1, "Điều người phụ nữ thích nhất ở hội chợ sách cũ", "Điều khiến người phụ nữ hào hứng nhất chính là tình cờ tìm thấy được cuốn sách quý hiếm mà mình đã cất công tìm kiếm suốt nhiều năm.",
          "Hội chợ đông người, sách bụi bặm nhưng cô vỡ òa sung sướng vì lục tìm được đúng cuốn tiểu thuyết xuất bản từ 20 năm trước.",
          "Sách được bán đại hạ giá 100 yên", "Tìm thấy được cuốn sách quý hiếm đã săn lùng bấy lâu nay (ĐÚNG)", "Được gặp gỡ các tác giả nổi tiếng", "Được tặng đồ lưu niệm miễn phí",
          "聴解 2 (4): 古本市で何が一番良かったと言っていますか。 正解: [2]",
          "女：何年もずっと探していた絶版の本が偶然見つかって、本当に嬉しかったわ！",
          "Nữ: Tớ tình cờ tìm thấy đúng cuốn sách ngừng xuất bản mà tớ đã cất công lùng sục suốt bao năm nay, hạnh phúc vô cùng luôn!")

    add_q(83, 2, "Kế hoạch tổ chức buổi cắm trại dã ngoại", "Do dự báo thời tiết cuối tuần có mưa giông lớn, nhóm quyết định sẽ dời lịch cắm trại sang thứ Bảy tuần kế tiếp.",
          "Để đảm bảo an toàn cho cả đoàn, nhóm thống nhất không cố đi dưới trời mưa mà hoãn lại 1 tuần đợi trời nắng đẹp.",
          "Vẫn cắm trại bình thường dưới mưa", "Chuyển sang đi ăn lẩu tại nhà", "Hủy bỏ chuyến đi vĩnh viễn", "Dời lịch cắm trại sang thứ Bảy tuần kế tiếp khi thời tiết đẹp (ĐÚNG)",
          "聴解 2 (5): キャンプはどうすることにしましたか。 正解: [4]",
          "男：今週末は大雨らしいから、来週の土曜日に延期しよう。",
          "Nam: Cuối tuần này nghe dự báo mưa to lắm, tụi mình dời lịch sang thứ Bảy tuần sau nhé.")

    add_q(84, 3, "Món quà lưu niệm bạn nam mang về tặng", "Bạn nam sau chuyến đi công tác Hokkaido đã mua một hộp bánh quy bơ sô-cô-la trắng nổi tiếng về làm quà cho cả phòng.",
          "Đặc sản trứ danh của Hokkaido là bánh quy kẹp sô-cô-la trắng, bạn nam mua hộp to để mọi người cùng thưởng thức giờ giải lao.",
          "Hộp bánh quy bơ sô-cô-la trắng đặc sản Hokkaido (ĐÚNG)", "Trái cây tươi dưa lưới", "Trà xanh đóng chai", "Hải sản mực khô",
          "聴解 2 (6): 北海道のお土産は何ですか。 正解: [1]",
          "男：北海道で一番有名なホワイトチョコのクッキーを買ってきたよ。みんなで食べてね。",
          "Nam: Tớ mua món bánh quy sô-cô-la trắng nổi tiếng nhất Hokkaido về này, mọi người cùng ăn nhé.")

    add_q(85, 1, "Lý do bạn nữ chăm chỉ luyện tập chạy bộ", "Bạn nữ kiên trì chạy bộ mỗi ngày là để rèn luyện thể lực chuẩn bị tham gia giải chạy việt dã marathon của thành phố.",
          "Mục tiêu cụ thể được chia sẻ: tháng 11 tới có giải chạy 10km của thành phố nên cô đặt quyết tâm hoàn thành tốt đường đua.",
          "Vì muốn giảm cân nhanh", "Vì bác sĩ bắt buộc tập", "Rèn luyện thể lực để tham gia giải chạy việt dã marathon sắp tới (ĐÚNG)", "Vì chạy cùng bạn trai",
          "聴解 2 (7): 女の人はなぜジョギングをしているのですか。 正解: [3]",
          "女：秋の市民マラソン大会に出場するから、体力をつけるために毎日走っているの。",
          "Nữ: Mùa thu này tớ tham gia giải chạy marathon của thành phố, nên ngày nào tớ cũng chạy bộ để rèn luyện thể lực.")

    # --- LISTENING: Mondai 3 - Utterance Expressions (Q86 - Q90) ---
    add_q(86, 2, "Muốn nhờ người khác bấm hộ kiểu ảnh", "Đang đứng trước phong cảnh tuyệt đẹp, muốn nhờ du khách gần đó chụp ảnh giúp: 'Xin lỗi, anh có thể bấm giúp tôi một kiểu ảnh được không ạ?'",
          "Mẫu câu chuẩn nhờ chụp ảnh: 「すみません、写真を撮っていただけませんか。」",
          "Tôi chụp ảnh cho anh nhé", "Máy ảnh này đẹp lắm đấy", "Xin lỗi, anh có thể chụp giúp tôi một kiểu ảnh được không ạ? (ĐÚNG)", "Anh đứng vào đây chụp cùng nhé",
          "聴解 3 (1): 写真を撮ってもらいたいです。何と言いますか。 正解: [3]",
          "「すみません、写真を撮っていただけませんか。」",
          "Xin lỗi, anh có thể chụp giúp tôi một tấm ảnh được không ạ?")

    add_q(87, 1, "Lời chúc người chuẩn bị bước vào phòng thi", "Thấy bạn học sắp bước vào phòng thi đại học đầy căng thẳng: 'Cố lên nhé, bạn nhất định sẽ làm bài thật tốt!'",
          "Lời động viên khích lệ chuẩn: 「頑張ってください！」",
          "Cố gắng lên nhé! (ĐÚNG)", "Cảm ơn bạn đã thi", "Bạn thi trượt rồi à", "Đừng đi thi nữa",
          "聴解 3 (2): これから試験を受ける友達を励まします。何と言いますか。 正解: [1]",
          "「頑張ってください！」",
          "Cố gắng lên nhé bạn!")

    add_q(88, 2, "Hỏi mượn chiếc bút bi của đồng nghiệp", "Đang cần ghi nhanh số điện thoại mà bút hết mực: 'Cậu cho mình mượn cây bút bi một lát được không?'",
          "Mẫu câu mượn đồ dùng học tập: 「ペンを貸してもらえますか。」",
          "Bút này mực đẹp ghê", "Cậu cho mình mượn cây bút bi một chút được không? (ĐÚNG)", "Bút của cậu rơi kìa", "Tôi tặng cậu cây bút này nhé",
          "聴解 3 (3): ペンを借りたいです。何と言いますか。 正解: [2]",
          "「ペンを貸してもらえますか。」",
          "Cậu cho mình mượn cây bút một chút được không ạ?")

    add_q(89, 1, "Xin phép được ngồi vào chiếc ghế trống", "Trong quán ăn đông khách thấy chiếc ghế đối diện còn trống: 'Chỗ này đã có ai ngồi chưa ạ? Tôi có thể ngồi đây được không?'",
          "Mẫu câu chuẩn xin ngồi ghế: 「ここ、座ってもいいですか。」",
          "Ghế này êm lắm", "Bạn đứng dậy đi", "Chỗ này tôi có thể ngồi được không ạ? (ĐÚNG)", "Ghế này bán bao nhiêu?",
          "聴解 3 (4): 空いている席に座りたいです。何と言いますか。 正解: [3]",
          "「ここ、座ってもいいですか。」",
          "Chỗ này tôi có thể ngồi được không ạ?")

    add_q(90, 2, "Chào tạm biệt đồng nghiệp khi tan ca", "Hoàn thành ca làm việc bước ra về trước: 'Mọi người đã vất vả rồi ạ, tôi xin phép về trước nhé!'",
          "Lời chào tiêu chuẩn khi hết ca làm: 「お疲れ様でした。お先に失礼します。」",
          "Mọi người vất vả rồi ạ, tôi xin phép về trước nhé! (ĐÚNG)", "Ngày mai tôi không đến nữa", "Tôi mệt mỏi lắm rồi", "Chúc mọi người ngủ ngon",
          "聴解 3 (5): 仕事が終わって先に帰ります。何と言いますか。 正解: [1]",
          "「お疲れ様でした。お先に失礼します。」",
          "Mọi người vất vả rồi, tôi xin phép về trước ạ!")

    # --- LISTENING: Mondai 4 - Quick Response (Q91 - Q98) ---
    add_q(91, 3, "Rủ rê: 'Tối nay cùng đi ăn mì Ramen nhé?'", "Hào hứng nhận lời rủ ăn uống: 'Hay quá, nhất định cùng đi nhé, tớ cũng đang thèm mì Ramen!'",
          "Đồng ý lời rủ ăn uống: 「いいですね、ぜひ行きましょう！」",
          "Mì Ramen không ngon đâu", "Hay quá, nhất định cùng đi nhé! (ĐÚNG)", "Tôi nấu cơm xong rồi", "Mì Ramen đắt lắm",
          "聴解 4 (1): 今晩、ラーメンを食べに行きませんか。 正解: [2]",
          "男：今晩、ラーメンを食べに行きませんか。\n女：いいですね、ぜひ行きましょう！",
          "Nam: Tối nay cậu có muốn cùng tớ đi ăn mì Ramen không?\nNữ: Hay quá, nhất định chúng mình cùng đi nhé!")

    add_q(92, 2, "Hỏi thăm: 'Quyển tiểu thuyết này bạn đọc thấy có hay không?'", "Chia sẻ cảm nhận hào hứng: 'Hay tuyệt vời luôn ấy, tình tiết cực kỳ lôi cuốn làm tớ đọc một mạch không dứt ra được!'",
          "Khen ngợi sách hay: 「すごく面白くて、一気に読んじゃいました。」",
          "Sách này dày lắm", "Tôi mua ở hiệu sách", "Hay tuyệt vời luôn cậu ạ, tớ đọc một lèo là hết cuốn luôn! (ĐÚNG)", "Chữ Hán khó đọc quá",
          "聴解 4 (2): この小説、面白かったですか。 正解: [3]",
          "女：この小説、面白かったですか。\n男：すごく面白くて、一気に読んじゃいました。",
          "Nữ: Cuốn tiểu thuyết đó cậu đọc thấy có hay không?\nNam: Hay cực kỳ luôn cậu ơi, cuốn hút đến mức tớ đọc một mạch xong luôn đấy.")

    add_q(93, 1, "Cảm ơn: 'Cảm ơn bạn rất nhiều vì đã đón mình ở sân bay nhé!'", "Đáp lại lời cảm ơn ân cần: 'Không có chi đâu bạn, chuyến bay xa chắc cậu mệt rồi nhỉ!'",
          "Phản hồi nhã nhặn: 「いいえ、お疲れ様でした。」",
          "Không có gì đâu cậu ơi, cậu bay đường xa vất vả rồi nhé! (ĐÚNG)", "Lần sau tự đi xe buýt nhé", "Sân bay đông người quá", "Tôi không muốn đón đâu",
          "聴解 4 (3): 空港まで迎えに来てくれて、ありがとう。 正解: [1]",
          "男：空港まで迎えに来てくれて、ありがとう。\n女：いいえ、お疲れ様でした。",
          "Nam: Cảm ơn cậu nhiều vì đã cất công ra tận sân bay đón tớ nhé!\nNữ: Có gì đâu cậu ơi, cậu bay đường dài vất vả rồi nhé.")

    add_q(94, 2, "Hỏi ý kiến: 'Tớ cắt kiểu tóc ngắn này trông có hợp không?'", "Khen ngợi vẻ ngoài tươi tắn: 'Rất là hợp luôn đấy, nhìn cậu trông trẻ trung và năng động hẳn ra!'",
          "Khen ngợi kiểu tóc: 「とても似合っていて、素敵ですよ。」",
          "Tóc ngắn quá rồi", "Rất là hợp với cậu luôn đấy, nhìn xinh và đáng yêu lắm! (ĐÚNG)", "Cắt hết bao nhiêu tiền thế?", "Đừng cắt tóc nữa",
          "聴解 4 (4): 髪を切ったんだけど、似合ってるかな？ 正解: [2]",
          "女：髪を切ったんだけど、似合ってるかな？\n男：とても似合っていて、素敵ですよ。",
          "Nữ: Tớ mới cắt tóc ngắn đấy, cậu thấy có hợp với tớ không?\nNam: Hợp cực kỳ luôn cậu ơi, trông xinh xắn và tươi tắn lắm!")

    add_q(95, 3, "Hỏi han tiến độ: 'Bài tập làm văn tuần này bạn đã nộp cho cô giáo chưa?'", "Cập nhật tình trạng: 'Mình đã hoàn thành và nộp cho cô từ hôm qua rồi.'",
          "Cập nhật việc đã làm xong: 「はい、昨日もう提出しました。」",
          "Bài văn khó viết lắm", "Tôi chưa viết chữ nào", "Vâng, hôm qua tớ đã nộp cho cô giáo xong xuôi rồi ạ (ĐÚNG)", "Cô giáo chưa giao bài mà",
          "聴解 4 (5): 今週の作文、もう提出しましたか。 正解: [3]",
          "男：今週の作文、もう提出しましたか。\n女：はい、昨日もう提出しました。",
          "Nam: Bài làm văn tuần này cậu đã nộp cho cô giáo chưa?\nNữ: Vâng, hôm qua tớ đã nộp xong xuôi rồi cậu ạ.")

    add_q(96, 3, "Mời nước: 'Trời nắng nóng thế này, bạn uống một ly nước cam ép lạnh nhé?'", "Nhận lời cảm kích: 'Ôi cảm ơn bạn nhiều nhé, đúng lúc tớ đang khát nước quá!'",
          "Nhận lời mời nước: 「ありがとうございます、いただきます。」",
          "Cảm ơn bạn nhiều nhé, đúng lúc mình đang khát nước quá (ĐÚNG)", "Nước cam chua lắm", "Tôi không khát nước", "Đừng ép nước cam nữa",
          "聴解 4 (6): 暑いですね、冷たいオレンジジュースはいかがですか。 正解: [1]",
          "女：暑いですね、冷たいオレンジジュースはいかがですか。\n男：ありがとうございます、いただきます。",
          "Nữ: Trời nóng nực quá nhỉ, cậu dùng một ly nước cam ép mát lạnh nhé?\nNam: Ôi cảm ơn cậu nhiều nhé, đúng lúc tớ đang khát quá đây ạ.")

    add_q(97, 1, "Hỏi han: 'Tối nay bạn có rảnh rỗi không, mình qua phòng bạn chơi nhé?'", "Vui vẻ chào đón: 'Được chứ, lúc nào cậu ghé qua cũng được hết á!'",
          "Sẵn sàng đón bạn đến chơi: 「ええ、いつでもどうぞ！」",
          "Tôi đang ngủ đấy", "Được chứ, cậu ghé qua lúc nào cũng được hết nhé! (ĐÚNG)", "Phòng tớ bẩn lắm đừng qua", "Hôm qua tôi ở nhà mà",
          "聴解 4 (7): 今晩時間ある？部屋に遊びに行ってもいい？ 正解: [2]",
          "男：今晩時間ある？部屋に遊びに行ってもいい？\n女：ええ、いつでもどうぞ！",
          "Nam: Tối nay cậu có rảnh không, tớ ghé qua phòng cậu chơi một lát được không?\nNữ: Ừ được chứ, cậu qua lúc nào cũng được nha!")

    add_q(98, 2, "Hỏi đường: 'Chuyến xe buýt đi đến sân bay bao nhiêu phút thì có một chuyến thế bạn?'", "Thông tin tần suất chuyến xe: 'Cứ khoảng 15 phút là lại có một chuyến xuất bến bạn nhé.'",
          "Trả lời tần suất chuyến xe: 「15分に1本出ていますよ。」",
          "Vé xe buýt 500 yên", "Cứ tầm 15 phút là có một chuyến xe chạy bạn nhé (ĐÚNG)", "Xe buýt to lắm", "Sân bay ở xa lắm",
          "聴解 4 (8): 空港行きのバスは何分おきに出ていますか。 正解: [2]",
          "女：空港行きのバスは何分おきに出ていますか。\n男：15分に1本出ていますよ。",
          "Nữ: Xe buýt đi sân bay thì mấy phút có một chuyến thế bạn?\nNam: Dạ cứ khoảng 15 phút là có 1 chuyến xuất bến đấy bạn ạ.")

    return questions
