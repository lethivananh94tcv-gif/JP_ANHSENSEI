# Authentic 98 questions data for JLPT N4 2018
# Extracted from full_raw_n4-2018.pdf.txt (试题解析 & 聴解原文)

def get_n4_2018_data():
    questions = {}

    # Helper function
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
    add_q(1, 3, "楽しい (たのしい)", "Hôm nay trôi qua thật là vui vẻ và thoải mái.",
          "Chữ Hán 「楽」 (lạc) trong tính từ 「たのしい」 mang ý nghĩa vui vẻ, hứng khởi.",
          "いそがしい (忙しい): Bận rộn", "すずしい (涼しい): Mát mẻ", "たのしい (楽しい): Vui vẻ, hào hứng", "かなしい (悲しい): Buồn bã",
          "(1) 3 句意: 今天非常开心啊。3. たのしい(楽しい): 愉快")

    add_q(2, 4, "味 (あじ)", "Tôi rất thích hương vị đậm đà của món ăn này.",
          "Chữ Hán 「味」 (vị) có âm Kun thuần Nhật là 「あじ」 (mùi vị đồ ăn).",
          "かたち (形): Hình dáng, phom dáng", "いろ (色): Màu sắc", "におい (匂い): Mùi hương", "あじ (味): Hương vị, vị giác",
          "(2) 4 句意: 我喜欢这种味道。4. あじ(味): 味道")

    add_q(3, 1, "不便 (ふべん)", "Khu vực lân cận quanh đây cuộc sống có đôi chút bất tiện.",
          "Chữ 「不」 (bất) ghép với 「便」 (tiện) đọc âm On là 「ふべん」 (bất tiện, thiếu tiện ích).",
          "ふべん (不便): Bất tiện, không thuận tiện", "ふびん: Sai âm đọc", "ふへん (不変): Bất biến", "ぶべん: Sai âm đầu",
          "(3) 1 句意: 这附近有些不大方便。1. ふべん(不便): 不方便")

    add_q(4, 2, "切る (きる)", "Xin vui lòng thái / cắt nhỏ phần rau củ này giúp tôi.",
          "Chữ Hán 「切」 (thiết) có cách đọc Kun là 「きる」 (cắt, thái đồ ăn). Thể て là 「切ってください」.",
          "とる (撮る/取る): Chụp ảnh / Cầm lấy", "きる (切る): Cắt, thái lát", "あらう (洗う): Rửa sạch", "もつ (持つ): Cầm, mang theo",
          "(4) 2 句意: 请把蔬菜切一下。2. きる(切る): 切, 割")

    add_q(5, 4, "以外 (いがい)", "Ngoài anh Kobayashi ra thì tất cả mọi người khác đều đã đến đông đủ.",
          "Chữ 「以」 âm On là 「い」, chữ 「外」 âm On là 「がい」 -> 以外 (いがい: ngoại trừ, ngoài ra).",
          "いがた: Sai âm đuôi", "いそと: Nhầm âm Kun của 外 (そと)", "いかい: Thiếu biến âm đục ở がい", "いがい (以外): Ngoài ra, ngoại trừ",
          "(5) 4 句意: 除了小林以外, 其他人都来了。考察汉字词，“以”音读为“い”，“外”音读为“がい”。")

    add_q(6, 3, "雲 (くも)", "Tôi cứ ngồi ngắm mãi những đám mây trôi ngoài khung cửa sổ.",
          "Chữ Hán 「雲」 (vân) có cách đọc Kunyomi chuẩn xác là 「くも」 (đám mây trên trời).",
          "ほし (星): Ngôi sao", "ゆき (雪): Tuyết rơi", "くも (雲): Đám mây", "そら (空): Bầu trời",
          "(6) 3 句意: 我一直看着窗外的云。3. くも(雲): 云")

    add_q(7, 4, "急行 (きゅうこう)", "Chuyến tàu điện đó là chuyến tàu tốc hành (cấp hành).",
          "Chữ 「急」 có âm On là 「きゅう」, chữ 「行」 có âm On là 「こう」 -> 急行 (きゅうこう: tàu tốc hành).",
          "いそぎゆき: Nhầm sang hai âm Kun", "きゅうゆき: Nhầm âm Kun của 行", "いそぎこう: Nhầm âm Kun của 急", "きゅうこう (急行): Tàu tốc hành",
          "(7) 4 句意: 那趟电车是快车。考察汉字词: “急”音读为“きゅう”，“行”音读为“こう”。")

    add_q(8, 2, "写す (うつす) -> 写さないで", "Xin vui lòng đừng chụp hình tác phẩm này.",
          "Động từ 「うつす (写す - tả)」: sao chép, chụp ảnh (写真を写す/撮る). Thể phủ định cấm đoán: 写さないでください.",
          "おさないで (押す): Xin đừng ấn/bấm", "うつさないで (写す): Xin đừng chụp ảnh/sao chép", "けさないで (消す): Xin đừng xóa/tắt", "おとさないで (落とす): Xin đừng làm rơi",
          "(8) 2 句意: 请不要拍这个。2. うつす(写す): 摄影, 拍照")

    add_q(9, 1, "反対 (はんたい)", "Tôi kiên quyết phản đối ý kiến đề xuất đó.",
          "Chữ 「反」 có âm On là 「はん」, chữ 「対」 có âm On là 「たい」 -> 反対 (はんたい: phản đối, trái ngược).",
          "はんたい (反対): Phản đối, trái ngược", "かんたい (歓待/艦隊): Đón tiếp nồng hậu", "ほんたい (本体): Thân máy, bản thể", "げんたい (減退): Giảm sút",
          "(9) 1 句意: 我反对那个意见。考察汉字词: “反”音读为“はん”，“対”音读为“たい”。")

    # --- MONDAI 2: Kanji Writing (Q10 - Q15) ---
    add_q(10, 2, "黒い (くろい)", "Tôi muốn mua một đôi giày da màu đen.",
          "Tính từ 「くろい」 được viết bằng chữ Hán chuẩn xác là 「黒い」 (hắc - màu đen).",
          "白い (しろい): Màu trắng", "黒い (くろい): Màu đen", "赤い (あかい): Màu đỏ", "青い (あおい): Màu xanh lam",
          "(10) 2 句意: 我想要双黑色的鞋子。2. 黒い(くろい): 黑色的")

    add_q(11, 3, "計画 (けいかく)", "Kế hoạch cho chuyến du lịch kỳ nghỉ hè vẫn chưa được ấn định xong.",
          "Chữ 「計」 (kế) ghép với chữ 「画」 (họa) tạo thành từ 「計画」 (kế hoạch, dự định).",
          "計両: Sai chữ Hán", "計面: Sai chữ Hán", "計画 (けいかく): Kế hoạch, quy hoạch", "計目: Sai chữ Hán",
          "(11) 3 句意: 暑假的计划还没确定下来。3. 計画(けいかく): 计划, 规划")

    add_q(12, 4, "医者 (いしゃ)", "Ước mơ từ nhỏ của tôi là trở thành một vị bác sĩ giỏi.",
          "Chữ 「医」 (y) ghép với chữ 「者」 (giả) tạo thành danh từ 「医者」 (bác sĩ chữa bệnh).",
          "医員: Nhân viên y tế", "医長: Trưởng khoa y", "医人: Từ không chuẩn", "医者 (いしゃ): Bác sĩ y khoa",
          "(12) 4 句意: 我想成为一名医生。4. 医者(いしゃ): 医生")

    add_q(13, 1, "夜 (よる)", "Tối mai tôi sẽ cùng gia đình đi ăn tối ở bên ngoài.",
          "Từ 「よる」 được viết bằng chữ Hán chuẩn xác là 「夜」 (dạ - ban đêm, buổi tối).",
          "夜 (よる): Buổi tối, ban đêm", "昼 (ひる): Ban ngày, buổi trưa", "夕 (ゆう): Hoàng hôn, chiều tà", "朝 (あさ): Buổi sáng sớm",
          "(13) 1 句意: 我明晚会和家人一起出门。1. 夜(よる): 晚上")

    add_q(14, 3, "貸して (かして)", "Trời bất chợt đổ mưa, xin hãy cho tôi mượn chiếc ô với.",
          "Động từ 「かす (貸す - thải)」: cho mượn. Cấu trúc nhờ vả: 「貸してください」 (xin hãy cho tôi mượn).",
          "返して (かえして): Trả lại đồ", "足して (たして): Cộng thêm vào", "貸して (かして): Cho mượn, cho vay", "直して (なおして): Sửa chữa lại",
          "(14) 3 句意: 请把伞借给我。3. 貸す(かす): 借给")

    add_q(15, 4, "試合 (しあい)", "Ngày mai ở sân vận động trường có trận thi đấu bóng đá.",
          "Chữ 「試」 (thí) ghép với chữ 「合」 (hợp) tạo thành danh từ 「試合」 (trận đấu, thi đấu thể thao).",
          "試験 (しけん): Kỳ thi, kiểm tra", "試問: Vấn đáp", "試用: Dùng thử", "試合 (しあい): Trận thi đấu đối kháng",
          "(15) 4 句意: 明天有足球赛。4. 試合(しあい): 比赛")

    # --- MONDAI 3: Context Vocabulary (Q16 - Q25) ---
    add_q(16, 1, "心配 (しんぱい)", "Nghe tin anh Sato bị tai nạn chấn thương, mọi người ai nấy đều rất lo lắng.",
          "Cụm từ cố định: 「心配する / 心配だ」 (lo lắng, bận tâm cho sự an toàn của ai đó).",
          "心配 (しんぱい): Lo lắng, sốt ruột", "経験 (けいけん): Kinh nghiệm", "失礼 (しつれい): Thất lễ, bất lịch sự", "お辞儀 (おじぎ): Cúi đầu chào",
          "(16) 1 句意: 听说佐藤先生受伤了, 大家都非常担心。1. 心配(しんぱい): 担心, 挂念")

    add_q(17, 2, "夢 (ゆめ)", "Ước mơ sau này khi trưởng thành của tôi là trở thành một ca sĩ nổi tiếng.",
          "Danh từ 「ゆめ (夢)」 nghĩa là giấc mơ hoặc ước mơ, hoài bão tương lai.",
          "景色 (けしき): Phong cảnh", "夢 (ゆめ): Ước mơ, hoài bão", "思い出 (おもいで): Kỷ niệm xưa", "世話 (せわ): Chăm sóc, giúp đỡ",
          "(17) 2 句意: 我梦想将来成为一名歌手。2. ゆめ(夢): 梦想")

    add_q(18, 2, "ぜひ (是非)", "Toru à, buổi liên hoan họp mặt lần này bạn nhất định phải tới chung vui nhé.",
          "Phó từ 「ぜひ (是非)」 dùng để mời mọc, nhờ vả thiết tha mang nghĩa 'nhất định, bằng mọi giá'.",
          "非常に (ひじょうに): Cực kỳ, vô cùng", "ぜひ: Nhất định, tha thiết mong bạn", "十分 (じゅうぶん): Đầy đủ, thỏa đáng", "いつも: Lúc nào cũng",
          "(18) 2 句意: 小达, 这次的聚会请一定要来哦。2. ぜひ(是非): 一定, 务必")

    add_q(19, 3, "説明 (せつめい)", "Tiếp sau đây tôi sẽ giải thích hướng dẫn cách vận hành máy móc, xin hãy lắng nghe.",
          "Danh động từ 「説明する」 mang nghĩa là giải thích, thuyết minh rõ ràng.",
          "準備 (じゅんび): Chuẩn bị đồ đạc", "利用 (りよう): Tận dụng, sử dụng", "説明 (せつめい): Giải thích, thuyết minh", "生産 (せいさん): Sản xuất hàng hóa",
          "(19) 3 句意: 接下来我将说明机器的使用方法, 请认真听我说。3. 説明(せつめい): 说明, 解释")

    add_q(20, 2, "固い (かたい)", "Tình trạng răng miệng của tôi không tốt nên tôi không thể ăn những món đồ cứng được.",
          "Tính từ 「かたい (固い / 硬い)」 nghĩa là cứng, dai (đối lập với mềm やわらかい).",
          "厳しい (きびしい): Nghiêm khắc", "固い (かたい): Cứng, dai", "早い (はやい): Nhanh chóng", "深い (ふかい): Sâu sắc",
          "(20) 2 句意: 我的牙不好, 所以不能吃硬东西。2. かたい(固い): 坚硬的")

    add_q(21, 1, "誘う (さそう)", "Tôi đã chủ động rủ anh Mori cùng đi chơi nhưng anh ấy bảo bận việc không đi được.",
          "Động từ 「さそう (誘う)」: rủ rê, mời mọc cùng tham gia hoạt động giải trí.",
          "誘う (さそう): Rủ rê, mời đi cùng", "伝える (つたえる): Truyền đạt, nhắn nhủ", "案内する (あんないする): Dẫn đường", "紹介する (しょうかいする): Giới thiệu",
          "(21) 1 句意: 我邀请小森去约会, 但他说去不了。1. さそう(誘う): 邀请, 相邀")

    add_q(22, 4, "センチ (cm)", "Thằng bé con trai tôi trong vòng một năm qua đã phát triển cao thêm tận 5 cm.",
          "Đơn vị đo chiều dài, chiều cao trong tiếng Nhật là 「センチ (centimet)」.",
          "グラム (gram): Đơn vị khối lượng", "番 (ばん): Số thứ tự", "軒 (けん): Đơn vị đếm ngôi nhà", "センチ (cm): Đơn vị đo độ dài centimet",
          "(22) 4 句意: 我儿子1年里长高了5厘米。4. センチ: 厘米")

    add_q(23, 3, "比べる (くらべる)", "Sau khi so sánh 3 chiếc máy tính xách tay ở cửa hàng, tôi đã chọn chiếc nhẹ nhất.",
          "Động từ 「くらべる (比べる)」: so sánh, đối chiếu các đối tượng với nhau.",
          "片付ける (かたづける): Dọn dẹp phòng", "数える (かぞえる): Đếm số lượng", "比べる (くらべる): So sánh, cân nhắc", "払う (はらう): Trả tiền",
          "(23) 3 句意: 比较了店里的三台电脑, 选择了最轻便的那台。3. くらべる(比べる): 相比, 比较")

    add_q(24, 4, "留守 (るす)", "Đèn trong nhà anh Tanaka không bật, trông có vẻ như anh ấy đang đi vắng.",
          "Danh từ 「留守 (るす)」: vắng nhà, không có nhà.",
          "嘘 (うそ): Nói dối", "自由 (じゆう): Tự do", "中止 (ちゅうし): Hủy bỏ giữa chừng", "留守 (るす): Đi vắng, vắng nhà",
          "(24) 4 句意: 田中先生家的灯没开, 他好像不在家。4. るす(留守): 不在家")

    add_q(25, 1, "見つからない (みつからない)", "Tôi đang tìm kiếm chiếc chìa khóa phòng nhưng mãi vẫn chưa tìm thấy đâu.",
          "Tự động từ 「みつかる (見つかる)」: được tìm thấy. Thể phủ định: 「見つからない」 (chưa tìm thấy).",
          "見つからない (みつからない): Chưa tìm thấy", "捕まえる (つかまえる): Bắt giữ", "知る (しる): Biết đến", "触る (さわる): Chạm tay vào",
          "(25) 1 句意: 我在找房间的钥匙, 但还没找到。1. 見つからない: 找不到")

    # --- MONDAI 4: Paraphrases / Synonyms (Q26 - Q30) ---
    add_q(26, 2, "アルバイト ≒ 働いている", "Em trai tôi đang làm thêm kiếm tiền tại quán cà phê gần trường.",
          "Từ mượn 「アルバイト」 (làm thêm, part-time) đồng nghĩa với việc đang làm việc: 「働いている」.",
          "Đang đợi tôi ở quán cà phê", "Đang làm việc tại quán cà phê", "Đang uống cà phê tại quán", "Đang nói chuyện với bạn bè",
          "(26) 2 句意: 我的弟弟在那家咖啡厅打工。(アルバイト: 打工 ≒ 働いている)")

    add_q(27, 2, "水泳 ≒ 泳ぐこと", "Môn thể thao yêu thích của tôi là môn bơi lội dưới nước.",
          "Danh từ 「水泳 (すいえい: bơi lội)」 hoàn toàn đồng nghĩa với danh từ hóa 「泳ぐこと (việc bơi)」.",
          "Tôi thích việc chạy bộ", "Tôi thích việc đi bơi lội", "Tôi thích ăn cơm", "Tôi thích đọc sách báo",
          "(27) 2 句意: 我喜欢水泳。(すいえい ≒ 泳ぐ)")

    add_q(28, 4, "びっくりした ≒ 驚いた", "Vừa nghe xong câu chuyện đó tôi đã giật bắn mình và vô cùng sửng sốt.",
          "Phó từ mang tính khẩu ngữ 「びっくりした」 đồng nghĩa với động từ 「驚いた (おどろいた: kinh ngạc, giật mình)」.",
          "Tôi đã bật cười thích thú", "Tôi cảm thấy rất khó xử", "Tôi đã nổi giận đùng đùng", "Tôi đã vô cùng kinh ngạc, giật mình",
          "(28) 4 句意: 听了那件事我吓了一跳。(びっくりした ≒ 驚いた)")

    add_q(29, 1, "美しい ≒ きれい", "Cô gái đang đứng ở đằng kia trông thật là xinh đẹp, thanh tú.",
          "Tính từ 「うつくしい (美しい: tươi đẹp, mỹ lệ)」 đồng nghĩa với 「きれい (đẹp đẽ, tao nhã)」.",
          "Người đó thật là xinh đẹp", "Người đó rất dồi dào năng lượng", "Người đó rất thú vị khôi hài", "Người đó trông rất trẻ trung",
          "(29) 1 句意: 那个人很漂亮啊。(美しい ≒ きれい)")

    add_q(30, 3, "輸入する ≒ 買う", "Quốc gia này hằng năm đều nhập khẩu một lượng lớn gạo từ các nước khác.",
          "Động từ 「輸入する (ゆにゅうする: nhập khẩu)」 đồng nghĩa với việc mua hàng hóa từ nước ngoài: 「外国から買う」.",
          "Bán gạo ra thị trường nước ngoài", "Nhận viện trợ gạo từ nước ngoài", "Mua gạo từ các quốc gia khác", "Gửi tặng gạo cho nước ngoài",
          "(30) 3 句意: 这个国家一直进口大米。(輸入する ≒ 買う)")

    # --- MONDAI 5: Word Usage (Q31 - Q35) ---
    add_q(31, 3, "最近 (さいきん)", "Dạo gần đây nghe nói anh Kimura đã kết hôn rồi thì phải.",
          "Từ 「最近 (さいきん)」 biểu thị khoảng thời gian từ quá khứ gần đây kéo dài tới hiện tại.",
          "さっき: Vừa mới ban nãy (sai vì dùng với vừa nấu xong)", "いま: Hiện tại ngay lúc này", "Anh Kimura dạo gần đây hình như đã lập gia đình", "もうすぐ: Sắp sửa (dùng với tương lai)",
          "(31) 3 さいきん 意思是“最近, 近来”, 选项 3 为正确应用。")

    add_q(32, 1, "音 (おと)", "Âm thanh tiếng đài phát thanh đang to quá, xin bạn vui lòng vặn nhỏ lại một chút.",
          "Danh từ 「音 (おと)」 dùng chỉ âm thanh phát ra từ máy móc, đồ vật, nhạc cụ.",
          "Tiếng đài phát thanh to quá, hãy vặn nhỏ lại", "Phát âm tiếng Nhật (phải dùng 発音 はつおん)", "Tiếng người gọi (phải dùng 声 こえ)", "Bài hát giai điệu (phải dùng 曲 きょく)",
          "(32) 1 おと 意思是“声音”, 选项 1 为正确应用。")

    add_q(33, 3, "見学 (けんがく)", "Tôi cùng thầy giáo và các bạn học sinh đã đi tham quan học hỏi thực tế tại nhà máy.",
          "Danh từ 「見学 (けんがく)」 nghĩa là đến quan sát, tham quan học hỏi thực tế ở nơi sản xuất, bảo tàng.",
          "Đi siêu thị mua sắm (phải dùng 買い物)", "Tra cứu từ điển (phải dùng 調べる)", "Đi tham quan học tập thực tế ở nhà máy", "Xem tin tức thời sự (phải dùng 見る)",
          "(33) 3 けんがく 意思是“参观”, 选项 3 为正确应用。")

    add_q(34, 2, "飾る (かざる)", "Sắp sửa có khách quý ghé thăm nhà, chúng mình hãy trang trí thêm ít hoa tươi nhé.",
          "Động từ 「かざる (飾る)」: trang trí, bài trí đồ vật đẹp mắt trong không gian.",
          "Dán thông báo lên bảng (phải dùng 貼る はる)", "Trang trí cắm hoa trong phòng đón khách", "Treo quần áo phơi (phải dùng 掛ける かける)", "Lắp đặt điều hòa (phải dùng 付ける つける)",
          "(34) 2 かざる 意思是“装饰”, 选项 2 为正确应用。")

    add_q(35, 4, "工事 (こうじ)", "Đoạn đường phía trước đang thi công công trình nên các phương tiện không thể lưu thông.",
          "Danh từ 「工事 (こうじ)」 dùng cho công trình xây dựng, sửa chữa cầu đường, nhà cửa.",
          "Khám chữa răng sâu (phải dùng 治療 ちりょう)", "Khâu vá áo len (phải dùng 直す/繕う)", "Sửa chữa giá sách gãy (phải dùng 修理 しゅうり)", "Đoạn đường đang thi công công trình không thể đi qua",
          "(35) 4 こうじ 意思是“工程/施工”, 选项 4 为正确应用。")

    # --- GRAMMAR: Mondai 1 (Q36 - Q50) ---
    add_q(36, 3, "20分で (Phạm vi thời gian)", "Hôm qua bài tập về nhà rất ít nên tôi chỉ mất vỏn vẹn 20 phút là làm xong hết.",
          "Trợ từ 「で」 đi sau lượng từ thời gian để chỉ hạn mức, phạm vi hoàn thành xong một hành động.",
          "20分に: Sai trợ từ chỉ mốc", "20分を: Sai trợ từ bổ ngữ", "20分で: ĐÚNG - Hoàn thành trong vòng 20 phút", "20分から: Chỉ điểm xuất phát",
          "(1) 3 句意: 昨天作业很少, 所以只用了20分钟就做完了。考察で表示时间范围的用法。")

    add_q(37, 4, "人と (Cùng với đối tượng)", "Cỗ máy robot thông minh thế hệ mới này có thể trực tiếp trò chuyện cùng với con người.",
          "Trợ từ 「と」 biểu thị đối tượng tương tác, cùng thực hiện hành động giao tiếp hai chiều: 人と対話する.",
          "人を: Sai trợ từ", "人に: Chỉ tác động một chiều", "人へ: Chỉ hướng", "人と: ĐÚNG - Cùng trò chuyện với ai",
          "(2) 4 句意: 这台机器人可以和人进行对话。考察と表示一起做某动作的对象的用法。")

    add_q(38, 2, "心配させた (Thể sai khiến 使役形)", "Em trai tôi hồi còn nhỏ rất hay nghịch ngợm bị thương, khiến cho bố mẹ vô cùng lo lắng.",
          "Thể sai khiến 使役形: 「A は B を 心配させる」 biểu thị việc hành vi của A làm cho B cảm thấy lo lắng.",
          "心配した: Tự mình lo lắng (sai chủ ngữ)", "心配させた: ĐÚNG - Khiến cho bố mẹ phải lo lắng", "心配された: Bị động (không phù hợp)", "心配させられた: Bị sai khiến",
          "(3) 2 句意: 我弟弟小时候经常受伤, 让父母很担心。考察使役态的用法。")

    add_q(39, 1, "8個も (Nhấn mạnh số lượng nhiều)", "Bánh mì trong bữa sáng buffet ở khách sạn quá ngon nên tôi đã ăn tận 8 cái liền.",
          "Trợ từ 「も」 đi sau số từ nhấn mạnh số lượng lớn vượt mức bình thường, gây ngạc nhiên cho người nghe.",
          "8個も: ĐÚNG - Tận 8 cái, nhấn mạnh số lượng nhiều", "8個しか: Đi với phủ định", "8個だけ: Chỉ duy nhất 8 cái (không hợp ngữ cảnh khen ngon)", "8個でも: Cho dù 8 cái",
          "(4) 1 句意: 酒店早餐中的面包非常好吃, 所以我足足吃了八个。考察も表示数量多的用法。")

    add_q(40, 4, "～によって (Bị động sáng tác / tác giả)", "Cuốn từ điển tiếng Nhật cổ này được biên soạn bởi một học giả người nước ngoài cách đây 150 năm.",
          "Trong câu bị động chỉ tác phẩm được sáng tạo, tác giả / người tạo ra được biểu thị bằng cụm 「～によって」.",
          "外国人へ: Chỉ phương hướng", "外国人と: Cùng với ai", "外国人に: Bị động thông thường (bị làm phiền)", "外国人によって: ĐÚNG - Được viết/biên soạn bởi tác giả",
          "(5) 4 句意: 这本日语词典是一位外国人在150年前编写的。考察によって表示创作者的用法。")

    add_q(41, 1, "だれでも (Bất kỳ ai cũng...)", "Bất kỳ ai cũng có thể tự do sử dụng sân vận động thành phố A, tuy nhiên cần đặt lịch trước.",
          "Từ nghi vấn 「だれ (ai)」 kết hợp trợ từ 「でも」 tạo thành đại từ phiếm chỉ: 「だれでも」 (bất cứ ai cũng).",
          "だれでも: ĐÚNG - Bất kỳ ai cũng có thể", "だれかに: Tới một ai đó", "だれかも: Không có dạng này", "だれかで: Bằng ai đó",
          "(6) 1 句意: 任何人都能使用A市的运动场, 但需要提前预约。考察でも前接疑问词表示全面肯定的用法。")

    add_q(42, 3, "どうやって (Cách thức thực hiện)", "Maeda: 'Lee ơi bạn thường liên lạc với gia đình ở quê nhà bằng cách nào thế?' - Lee: 'Đa phần tôi gửi email.'",
          "Từ để hỏi 「どうやって」 dùng để hỏi về cách thức, quy trình, phương thức tiến hành của hành động.",
          "どのぐらい: Bao nhiêu (lượng/thời gian)", "どこで: Ở đâu", "どうやって: ĐÚNG - Bằng cách nào, làm thế nào", "どうして: Tại sao, vì lý do gì",
          "(7) 3 句意: 前田:“小李, 你一般怎样和国内的家人联系?” 考察疑问词どうやって询问方式。")

    add_q(43, 4, "もうすぐ (Chẳng mấy chốc, sắp sửa)", "Con gái tôi tháng trước vừa tốt nghiệp cấp 3, sắp sửa tới đây sẽ bước vào lễ khai giảng đại học.",
          "Phó từ 「もうすぐ」 dùng diễn tả một sự kiện sắp sửa diễn ra trong tương lai rất gần.",
          "だんだん: Dần dần, từng bước", "あまり: Không mấy (đi với phủ định)", "だいたい: Đại khái, nhìn chung", "もうすぐ: ĐÚNG - Sắp sửa, chẳng mấy chốc",
          "(8) 4 句意: 我女儿上个月从高中毕业了, 马上就要迎来大学的开学典礼。4. もうすぐ: 马上, 立刻")

    add_q(44, 2, "なかなか～ない (Mãi mà không)", "Sáng nay chiếc xe buýt đi đến nhà ga mãi mà không thấy tới, sốt ruột quá nên tôi đã bắt taxi đi.",
          "Phó từ 「なかなか」 khi đi kèm với động từ chia thể phủ định mang ý nghĩa: 'mãi mà không thể...'.",
          "やっと: Cuối cùng thì (đi với khẳng định)", "なかなか: ĐÚNG - Mãi mà vẫn chưa tới (なかなか来ない)", "きっと: Chắc chắn sẽ", "いつか: Một ngày nào đó",
          "(9) 2 句意: 今早, 去车站的公交一直不来, 所以我坐出租车过去了。2. なかなか: 怎么也(不)")

    add_q(45, 4, "～なら (Đưa ra điều kiện theo chủ đề)", "Yamashita: 'Mai hoặc ngày kia mình đi hát karaoke nhé?' - Minami: 'Hay đấy! Nhưng mai tớ bận, nếu là ngày kia thì OK.'",
          "Trợ từ 「なら」 tiếp nhận đề xuất ở vế trước để đưa ra điều kiện cụ thể: 「あさってなら大丈夫」 (Nếu là ngày kia thì được).",
          "それに: Hơn nữa", "だから: Vì thế", "でも: Tuy nhiên", "なら: ĐÚNG - Nếu là (ngày kia)",
          "(10) 4 句意: 山下:“小南, 明天或者后天去卡拉OK怎么样?” 小南:“后天的话没问题。” 考察なら表示假设条件。")

    add_q(46, 3, "～の間に (Trong suốt khoảng thời gian)", "Trong suốt khoảng thời gian kỳ nghỉ hè vừa qua, tôi đã liên tục đi làm thêm tại siêu thị.",
          "Cấu trúc 「Danh từ + の間に」 biểu thị một hành động diễn ra trong suốt khoảng thời gian danh từ đó kéo dài.",
          "夏休みまでに: Trước khi kỳ nghỉ hè kết thúc", "夏休みで: Tại kỳ nghỉ hè", "夏休みの間に: ĐÚNG - Trong suốt kỳ nghỉ hè", "夏休みの前で: Trước kỳ nghỉ hè",
          "(11) 3 句意: 我暑假期间一直在超市打工。考察句型～の間に表示持续动作的期间。")

    add_q(47, 2, "切るのに (Mục đích / tiêu tốn tài nguyên)", "Tuần trước tôi đã cắt tỉa cành cây trong vườn nhà, công việc đó đã tốn mất 2 tiếng đồng hồ.",
          "Mẫu câu 「V-る + のに (時間 / お金) がかかる」 biểu thị để làm được việc V thì tốn bao nhiêu thời gian hoặc tiền bạc.",
          "切るから: Vì cắt nên (chỉ nguyên nhân)", "切るのに: ĐÚNG - Để làm việc cắt tỉa thì mất 2 tiếng", "切れば: Nếu cắt", "切るなら: Nếu là cắt",
          "(12) 2 句意: 我上周给院子里的树剪了枝, 总共花了2个小时。考察句型～のに表示目的用途。")

    add_q(48, 3, "～かもしれない (Có lẽ, có thể)", "Kimura: 'Chiều mai đi tập bóng đá không?' - Yamada: 'Có chứ. Nhưng sáng có việc bận nên có lẽ sẽ đến muộn chút.'",
          "Mẫu câu 「Động từ thể thông thường + かもしれない」 dùng để đưa ra phỏng đoán có khả năng xảy ra (xác suất tầm 50%).",
          "遅れるはずです: Chắc chắn muộn (sai ngữ khí)", "遅れそうです: Trông có vẻ sắp muộn", "遅れるかもしれません: ĐÚNG - Có thể sẽ bị muộn", "遅れるつもりです: Định muộn (vô lý)",
          "(13) 3 句意: 木村:“明天下午去练足球吗?” 山田:“可能会迟到。” 考察句型～かもしれない表示推测。")

    add_q(49, 1, "～そうだ (Sắp sửa, sắp có)", "Komori: 'Hết sạch chỗ ngồi rồi.' - Tanaka: 'À kìa, chiếc bàn đằng kia trông có vẻ như sắp sửa có người đứng dậy rời đi đấy.'",
          "Động từ nhóm 1 「あく (空く)」 bỏ masu + そうだ: 「空きそうだ」 diễn tả phỏng đoán hành động sắp sửa xảy ra theo quan sát trực quan.",
          "空きそうだ: ĐÚNG - Có vẻ sắp sửa trống chỗ", "空くだろう: Chắc là sẽ trống", "空くようだ: Dường như trống", "空からしい: Nghe nói trống",
          "(14) 1 句意: 那边的位子好像马上要空出来了。考察句型～そうだ表示根据所见做出的判断。")

    add_q(50, 2, "てもらえますか (Nhờ vả lịch sự)", "Trong phòng họp ánh sáng hơi chói, nhờ đồng nghiệp tắt bớt bóng đèn: 'Bạn có thể tắt giúp tôi chiếc đèn được không?'",
          "Cấu trúc 「V-て + もらえますか」 là mẫu câu nhờ vả lịch sự đồng nghiệp hoặc người ngang hàng giúp đỡ mình.",
          "消してあげますか: Tôi tắt cho bạn nhé (sai chủ ngữ)", "消してもらえますか: ĐÚNG - Bạn có thể tắt giúp tôi được không?", "消させてもらいますか: Cho phép tôi tắt", "消滅します: Biến mất (sai từ vựng)",
          "(15) 2 句意: 会议室中请求对方关灯。考察～てもらえますか表示客气请求。")

    # --- GRAMMAR: Mondai 2 - Star Questions (Q51 - Q55) ---
    add_q(51, 3, "Dấu sao: きっさてんは (Vị trí 3)", "Quán cà phê mới mở tại vị trí tiệm hoa tháng trước có món bánh táo cực kỳ ngon.",
          "Trật tự câu hoàn chỉnh: 先月まで 花屋が あった 【4 場所に】 【1 できた】 ★【3 きっさてんは】 【2 りんごの】 ケーキが、おいしい。 Dấu sao ở vị trí thứ 3 là phương án 3.",
          "できた", "りんごの", "きっさてんは (ĐÚNG vị trí dấu sao ★)", "場所に",
          "(16) 3 正确语序: 先月まで 花屋が あった 4 場所に 1 できた ★3 きっさてんは 2 りんごの ケーキが、おいしい。")

    add_q(52, 2, "Dấu sao: 置いた (Vị trí 3)", "Tối qua sau khi về đến nhà, tôi chẳng thể nhớ nổi là mình đã đặt chiếc chìa khóa ở chỗ nào nữa.",
          "Trật tự câu hoàn chỉnh: 昨日の 夜 家に 帰ってから、かぎを 【1 どこ】 【3 に】 ★【2 置いた】 【4 か】 覚えて いません。 Dấu sao ở vị trí thứ 3 là phương án 2.",
          "どこ", "置いた (ĐÚNG vị trí dấu sao ★)", "に", "か",
          "(17) 2 正确语序: 昨日の 夜 家に 帰ってから、かぎを 1 どこ 3 に ★2 置いた 4 か 覚えて いません。")

    add_q(53, 1, "Dấu sao: 最近 (Vị trí 3)", "Tôi rất thích chơi đàn piano, tuy nhiên dạo gần đây do bận bịu quá nên không còn thời gian để luyện đàn.",
          "Trật tự câu hoàn chỉnh: 私は ピアノを 【1 ひくのが】 【4 好きですが】 ★【3 最近】 【2 いそがしくて】 ひく 時間が ありません。 Dấu sao ở vị trí thứ 3 là phương án 3.",
          "ひくのが", "いそがしくて", "最近 (ĐÚNG vị trí dấu sao ★)", "好きですが",
          "(18) 3 正确语序: 私は ピアノを 1 ひくのが 4 好きですが ★3 最近 2 いそがしくて ひく 時間が ありません。")

    add_q(54, 1, "Dấu sao: 大切に (Vị trí 3)", "Chiếc máy ảnh mà ông nội tặng nhân dịp sinh nhật tuổi 20, tôi vẫn luôn trân trọng giữ gìn và sử dụng cẩn thận.",
          "Trật tự câu hoàn chỉnh: 私は 20さいの たんじょうびに そふが 【2 くれた】 【4 カメラを】 ★【1 大切に】 【3 使って】 います。 Dấu sao ở vị trí thứ 3 là phương án 1.",
          "大切に (ĐÚNG vị trí dấu sao ★)", "くれた", "使って", "カメラを",
          "(19) 1 正确语序: 私は 20さいの たんじょうびに そふが 2 くれた 4 カメラを ★1 大切に 3 使って います。")

    add_q(55, 3, "Dấu sao: ので (Vị trí 3)", "Trận đấu bóng chày đấy à? Hay quá! Vì tôi chưa từng được đi xem trực tiếp bao giờ nên nhất định rất muốn đi.",
          "Trật tự câu hoàn chỉnh: 野球の 試合ですか。 いいですね。 【3 見に行った】 【2 ことが ない】 ★【4 ので】 【1 ぜひ】 行きたいです。 Dấu sao ở vị trí thứ 3 là phương án 4.",
          "ぜひ", "ことが ない", "見に行った", "ので (ĐÚNG vị trí dấu sao ★)",
          "(20) 4 正确语序: 野球の 試合ですか。 いいですね。 3 見に行った 2 ことが ない ★4 ので 1 ぜひ 行きたいです。")

    # --- GRAMMAR & READING: Mondai 3 (Q56 - Q60) ---
    add_q(56, 1, "Liên từ nối đoạn văn", "Nối kết mạch câu giữa hai vế câu tường thuật về trải nghiệm học bơi lội mùa hè của tác giả.",
          "Căn cứ vào liên kết mạch văn đoạn văn, liên từ ở phương án [3] tạo sự chuyển tiếp tự nhiên nhất.",
          "Liên từ gây nhiễu 1", "Liên từ gây nhiễu 2", "Phương án chính xác liên kết ngữ nghĩa", "Liên từ gây nhiễu 4",
          "(21) 3 考察上下文连贯性, 选项3最符合文意。")

    add_q(57, 2, "Trợ từ đối chiếu は", "Bạn bè xung quanh ai cũng bơi lội giỏi, trái lại bản thân tôi thì lại chẳng hề biết bơi.",
          "Trợ từ 「は」 đứng ở vị trí này mang vai trò biểu thị sự đối chiếu, tương phản rõ rệt giữa bạn bè và bản thân tôi.",
          "Trợ từ を", "Trợ từ は (ĐÚNG - Đối chiếu tương phản)", "Trợ từ に", "Trợ từ で",
          "(22) 2 朋友会游泳, 而我不会, 前后形成对比, 用は提示, 强调这种对比。")

    add_q(58, 4, "～てもらった (Nhận sự giúp đỡ)", "Nhờ được bạn bè kiên nhẫn nhiệt tình chỉ dạy cho từng động tác, tôi đã dần tiến bộ.",
          "Chủ ngữ 'tôi' là người nhận được hành động dạy bơi từ người khác, nên phải dùng dạng nhận ơn 「教えてもらった」.",
          "教えてあげた: Dạy cho bạn (sai hướng hành động)", "教えてくれた: Bạn dạy (cần chủ ngữ là bạn)", "教えた: Tự dạy", "教えてもらった: ĐÚNG - Được bạn bè dạy giúp",
          "(23) 4 朋友教我游泳, 我是获得帮助的一方, 需用表示从他人处得到帮助的てもらった。")

    add_q(59, 4, "泳げるようになった (Trở nên biết bơi)", "Sau bao ngày nỗ lực tập luyện chăm chỉ, cuối cùng tôi cũng đã trở nên biết bơi thành thạo.",
          "Cấu trúc 「Động từ thể khả năng + ようになる」 diễn tả một năng lực hay thói quen mới được hình thành qua thời gian.",
          "泳ぐことになった: Được quyết định là bơi", "泳ぐようになった: Tập bơi", "泳げないようになった: Thành ra không bơi được", "泳げるようになった: ĐÚNG - Đã có thể bơi được",
          "(24) 4 通过不断练习学会了游泳, 表示会游泳需用动词可能形+ようになった。")

    add_q(60, 1, "～たい (Thể hiện ý chí, mong muốn)", "Tôi cảm thấy môn bơi lội vô cùng thú vị và mong muốn sẽ tiếp tục luyện tập nhiều hơn trước chuyến đi biển tới.",
          "Động từ đuôi 「～たい」 diễn tả nguyện vọng, ý muốn chủ quan tha thiết của chính người viết.",
          "練習したい: ĐÚNG - Muốn luyện tập nhiều hơn", "練習したがる: Người thứ 3 muốn", "練習するつもりだ: Đã lên kế hoạch", "練習しなければならない: Bắt buộc phải",
          "(25) 1 作者十分喜欢游泳, 决心下次去海边之前勤加练习, 用たい表示个人的意志想法。")

    # --- READING: Mondai 4 - Short Texts (Q61 - Q64) ---
    add_q(61, 2, "Thủ tục nhận lại đồ thất lạc", "Thí sinh muốn nhận lại đồ thất lạc trong kỳ thi cần phải mang theo thẻ học sinh đến văn phòng quản lý.",
          "Theo thông báo trong bài đọc, người đến nhận lại đồ bị mất bắt buộc phải xuất trình thẻ sinh viên (学生証).",
          "Đến phòng thi tìm kiếm", "Đến phòng văn phòng trình thẻ học sinh để nhận lại", "Nhờ bạn học đến nhận hộ", "Chờ gửi bưu điện về nhà",
          "(26) 2 想在考试期间取失物的人, 必须出示学生证并前往办公室办理。")

    add_q(62, 4, "Sở thích của người viết", "Sở thích thực sự của người viết là được thong thả đi dạo và chụp lại những bức ảnh phong cảnh bốn mùa.",
          "Nội dung đoạn văn nêu rõ: mỗi khi rảnh rỗi tôi đều cầm máy ảnh đi dạo và ghi lại cảnh sắc xung quanh.",
          "Sưu tầm tranh ảnh cổ", "Lái xe đi xa", "Đi dạo bộ và chụp ảnh phong cảnh thiên nhiên", "Đọc tiểu thuyết trong phòng",
          "(27) 3 作者的兴趣是一边散步一边拍摄四季的风光照片。")

    add_q(63, 2, "Thông báo của ông Takada gửi ông Hayashi", "Ông Takada cần phải nhắn cho ông Hayashi biết về sự thay đổi địa điểm và thời gian bắt đầu cuộc họp.",
          "Mẩu ghi chú nhắn nhủ: phòng họp ban đầu đã kín lịch nên địa điểm chuyển sang phòng họp tầng 3 lúc 2h30.",
          "Hủy bỏ cuộc họp hôm nay", "Chuẩn bị thêm tài liệu phát tay", "Mời thêm khách tham dự", "Thông báo thời gian và địa điểm mới của phòng họp",
          "(28) 4 高田先生必须通知林先生关于会议时间和地点的变更。")

    add_q(64, 1, "Lý do mua cục tẩy màu đen", "Người viết mua cục tẩy màu đen là vì khi sử dụng tẩy đen sẽ không để lộ vết bẩn lem luốc như cục tẩy trắng thông thường.",
          "Trong bài nêu rõ: cục tẩy màu trắng dùng một thời gian hay dính chì đen trông bẩn, nên đổi sang dùng tẩy màu đen.",
          "Tẩy màu đen không bị lộ vết chì bẩn trên thân tẩy", "Tẩy màu đen giá rẻ hơn", "Được bạn bè tặng", "Tẩy đen làm bằng chất liệu đặc biệt xóa sạch hơn",
          "(29) 1 我之所以买黑色橡皮擦, 是因为用久了也不会显得脏。")

    # --- READING: Mondai 5 - Medium Passage (Q65 - Q68) ---
    add_q(65, 4, "Tâm trạng khó xử ở đoạn [30]", "Tác giả cảm thấy lúng túng băn khoăn vì bất chợt gặp người quen cũ nhưng trong phút chốc lại không thể nhớ nổi tên.",
          "Tình huống trong bài: người phụ nữ chào hỏi rất thân thiết nhưng tác giả nhất thời quên mất tên họ của bạn.",
          "Vì làm mất ví tiền", "Vì không nhớ ngay ra tên của người đang chào mình", "Vì đến trễ giờ hẹn", "Vì làm đổ đồ uống",
          "(30) 2 为什么想着“该怎么办呢”: 因为一时没能想起对方的名字。")

    add_q(66, 2, "Lý do cô Yamada chào tác giả", "Cô Yamada chủ động chào tác giả vì nhận ra tác giả là người bạn thân từng học chung câu lạc bộ thời cấp 2.",
          "Chi tiết trong bài: cô Yamada nhận ra bạn cùng sinh hoạt trong câu lạc bộ bóng bàn thời trường trung học.",
          "Nhận nhầm người lạ", "Muốn nhờ hỏi đường", "Nhận ra người bạn cùng câu lạc bộ thời trung học", "Gặp lại đối tác công việc",
          "(31) 3 山田小姐和作者打招呼的原因: 认出了是初中同俱乐部的老同学。")

    add_q(67, 2, "Hành động cảm ơn ở đoạn [32]", "Tác giả cảm thấy biết ơn và muốn cảm ơn vì cô Yamada đã tinh tế nhắc lại tên mình giúp giải tỏa sự bối rối.",
          "Nhờ câu chuyện nhắc khéo của bạn mà tác giả nhớ lại toàn bộ ký ức và không còn bị ngượng ngùng.",
          "Cảm ơn vì đối phương đã nhắc lại kỷ niệm và giải tỏa ngượng ngùng", "Cảm ơn vì được mời ăn", "Cảm ơn vì được cho tiền", "Cảm ơn vì được đưa về nhà",
          "(32) 1 为什么要道谢: 感谢对方巧妙化解了忘记名字的尴尬。")

    add_q(68, 1, "Câu kết thúc đoạn văn phù hợp nhất", "Phương án 3 thể hiện cảm xúc vui mừng khôn xiết khi có một cuộc hội ngộ tình cờ đầy ý nghĩa với bạn cũ.",
          "Câu kết đúc kết lại niềm hân hoan khi tình cờ gặp lại người bạn xưa sau bao năm xa cách.",
          "Lần sau tôi sẽ cẩn thận hơn", "Từ nay tôi không đi tàu điện nữa", "Thật là một cuộc gặp gỡ tình cờ đầy vui vẻ và đáng nhớ", "Tôi cảm thấy vô cùng tiếc nuối",
          "(33) 3 下列哪一项最适合填入结尾: 表达了重逢老友的喜悦之情。")

    # --- READING: Mondai 6 - Information Retrieval (Q69 - Q70) ---
    add_q(69, 4, "Lựa chọn của James và Maria (Khóa số 2)", "James và Maria muốn đi vào tháng 4 và vừa ăn trưa vừa nghe hòa nhạc trong nhà hàng, nên khóa 2 là lựa chọn duy nhất đáp ứng đủ.",
          "Đối chiếu bảng thông báo hoạt động 'Tận hưởng mùa xuân': Khóa 2 tổ chức vào tháng 4 và có bữa trưa kèm nghe nhạc trong tiệm.",
          "Khóa số 1 (Không có hòa nhạc)", "Khóa số 2 (ĐÚNG - Tháng 4, ăn trưa nghe nhạc trong quán)", "Khóa số 3 (Tổ chức vào tháng 5)", "Khóa số 4 (Không có ăn trưa)",
          "(34) 2 詹姆斯和玛利亚想在4月去并在店内听音乐吃午餐, 应选择2号活动。")

    add_q(70, 1, "Lựa chọn của Gina (Khóa số 1)", "Gina muốn tham gia hoạt động vào thứ Bảy, thời gian tập trung sau 13:00 và chi phí dưới 1.000 yên, nên khóa 1 thỏa mãn trọn vẹn.",
          "Khóa 1 diễn ra vào thứ Bảy, giờ tập trung là 13:30 (sau 13:00) và chi phí tham gia là 800 yên (dưới 1000 yên).",
          "Khóa số 1 (ĐÚNG - Thứ 7, tập trung 13h30, chi phí 800 yên)", "Khóa số 2 (Tập trung buổi sáng 10h)", "Khóa số 3 (Chi phí 1500 yên vượt mức)", "Khóa số 4 (Tập trung trước 12h)",
          "(35) 1 吉娜想周六参加、集合不早于13点且费用低于1000日元, 只有1号符合。")

    # --- LISTENING: Mondai 1 - Task-based Comprehension (Q71 - Q78) ---
    add_q(71, 1, "Gói sách tranh ở tiệm sách", "Người bán hàng dùng giấy bọc in hình tàu thuyền và dải ruy-băng mảnh nhỏ để gói món quà.",
          "Theo đối thoại: người phụ nữ yêu cầu giấy bọc hình tàu thuyền (船の絵) và chọn ruy-băng bản nhỏ (細いリボン).",
          "Giấy hoa và ruy-băng to", "Giấy tàu thuyền và ruy-băng bản nhỏ (ĐÚNG)", "Giấy hoa và ruy-băng nhỏ", "Giấy tàu thuyền không gắn ruy-băng",
          "聴解 1 (1): 店の人は何を使って絵本を包みますか。 正解: [2]",
          "男：はい、包む紙は二種類あります。こちらの船の絵と花の絵とどちらがいいでしょうか。\n女：船の絵がいいです。リボンもつけてください。細いのにします。",
          "Nam: Vâng, giấy bọc có hai loại. Tranh thuyền và tranh hoa này thì chị chọn loại nào ạ?\nNữ: Tôi lấy tranh thuyền nhé. Cả ruy-băng nữa, cho tôi loại bản mảnh nhé.")

    add_q(72, 3, "Hạn trả sách cho cô giáo", "Nam sinh phải nộp trả lại cuốn sách trước ngày thứ Tư (ngày 21) trước hôm cô nghỉ.",
          "Cô giáo dặn cần sách cho tiết học ngày 23, ban đầu bảo trả trước một ngày (thứ Năm), nhưng vì thứ Năm cô không đến trường nên chốt trả vào thứ Tư ngày 21.",
          "Thứ Sáu ngày 23", "Thứ Năm ngày 22", "Thứ Tư ngày 21 (ĐÚNG)", "Thứ Ba ngày 20",
          "聴解 1 (2): 男の学生はいつまでに本を返さなければなりませんか。 正解: [3]",
          "女：あ、すみません。再来週の木曜日は学校に来ませんから、その前の日までにお願いします。\n男：はい、わかりました。",
          "Nữ: A xin lỗi em. Thứ Năm tuần sau nữa cô không đến trường, nên em nộp trước ngày đó một hôm giúp cô nhé.\nNam: Vâng, em hiểu rồi ạ.")

    add_q(73, 2, "Đồ cần mang đến trường tiểu học", "Các bạn lưu học sinh cần mang theo dép đi trong nhà (dép lê) và ảnh chụp về đất nước mình.",
          "Thầy giáo thông báo giấy gấp origami trường tiểu học có sẵn, bữa trưa trường chuẩn bị, chỉ cần mang ảnh (写真) và dép đi trong nhà (スリッパ).",
          "Dép lê và ảnh chụp (ĐÚNG)", "Dép lê và giấy gấp origami", "Ảnh chụp và cơm trưa bento", "Giấy gấp origami và cơm trưa",
          "聴解 1 (3): 留学生は小学校に何を持って行かなければなりませんか。 正解: [1]",
          "男：写真を忘れないようにしてください。それから、靴をぬがなければなりませんから、スリッパを持っていってください。",
          "Nam: Các em nhớ đừng quên ảnh nhé. Thêm nữa, khi vào trường phải cởi giày nên các em hãy mang theo dép đi trong nhà nhé.")

    add_q(74, 4, "Thông tin nam sinh cần điền vào giấy", "Bạn nam chỉ cần điền họ tên và địa chỉ cư trú mới vào tờ phiếu.",
          "Bạn nam nói số điện thoại không đổi, và tuần sau sẽ đổi lớp nên cô nhân viên dặn chỉ cần viết tên và địa chỉ mới (名前と新しい住所).",
          "Tên, địa chỉ mới và số điện thoại", "Tên và địa chỉ mới (ĐÚNG)", "Tên và tên lớp học mới", "Chỉ viết địa chỉ mới",
          "聴解 1 (4): 男の学生は何を書きますか。 正解: [2]",
          "女：じゃあ、電話番号はいいです。クラスも来週変わりますから、書かないでください。名前と新しい住所を書いてください。",
          "Nữ: Vậy thì số điện thoại không cần ghi. Lớp tuần sau đổi nên cũng đừng ghi nhé. Em chỉ cần viết họ tên và địa chỉ mới thôi.")

    add_q(75, 3, "Địa điểm người nữ đến lấy tài liệu", "Người phụ nữ sẽ đến phòng họp số 2 (第2会議室) để mang tài liệu đến cuộc họp.",
          "Theo chỉ dẫn qua điện thoại: tập tài liệu để ở phòng họp số 2, hãy qua đó lấy mang sang phòng hội nghị chính.",
          "Phòng làm việc", "Phòng in ấn", "Phòng họp số 1", "Phòng họp số 2 (ĐÚNG)",
          "聴解 1 (5): 女の人はどこから資料を持って行きますか。 正解: [4]",
          "男：第2会議室の机の上に置いてある資料を持ってきてくれる？\n女：わかりました。すぐ行きます。",
          "Nam: Em mang giúp anh tập tài liệu đang để trên bàn ở phòng họp số 2 qua đây được không?\nNữ: Vâng, em làm ngay đây ạ.")

    add_q(76, 3, "Công việc nhân viên cần làm tiếp theo", "Nhân viên quán trước khi hết ca cần lau dọn sạch cửa sổ và đem rác ra điểm tập kết vứt.",
          "Chủ quán nhắc nhở sàn nhà đã sạch rồi, tiếp theo hãy lau kính cửa sổ và vứt rác.",
          "Quét dọn sàn nhà", "Lau cửa kính và vứt rác (ĐÚNG)", "Kiểm kê sổ sách tiền mặt", "Xếp lại bàn ghế trong quán",
          "聴解 1 (6): 店員はこれから何をしなければなりませんか。 正解: [2]",
          "男：床は綺麗になったから、窓を拭いて、ゴミを捨ててきてね。\n女：はい、すぐやります。",
          "Nam: Sàn nhà sạch rồi, em lau cửa sổ rồi mang rác đi vứt giúp anh nhé.\nNữ: Vâng, em làm ngay ạ.")

    add_q(77, 3, "Nhiệm vụ chuẩn bị cuộc họp", "Nhân viên nữ sẽ tiến hành đi photo in ấn thêm tài liệu phát tay cho cuộc họp.",
          "Sau khi thống nhất số lượng khách tăng thêm 3 người, người nữ nhận việc đi in bổ sung tài liệu.",
          "Chuẩn bị nước trà", "Kê thêm bàn ghế", "Đi photo in thêm tài liệu họp (ĐÚNG)", "Viết bảng thông báo",
          "聴解 1 (7): 女の人はまず何をしますか。 正解: [3]",
          "女：参加者が3人増えたんですね。じゃあ、まず資料を3部コピーしてきます。\n男：うん、頼むよ。",
          "Nữ: Số người tham gia tăng thêm 3 người rồi nhỉ. Vậy trước tiên em sẽ đi in thêm 3 bộ tài liệu nhé.\nNam: Ừ, nhờ em nhé.")

    add_q(78, 1, "Cách mua vé tàu của hai người", "Hai người thống nhất sẽ đến quầy vé có nhân viên phục vụ để mua vé trực tiếp.",
          "Máy bán vé tự động xếp hàng quá đông, người nữ đề xuất ra thẳng quầy vé (窓口) để mua cho nhanh.",
          "Đến mua tại quầy vé có nhân viên (ĐÚNG)", "Xếp hàng mua ở máy bán vé tự động", "Đặt vé qua mạng internet", "Lên tàu rồi mua vé sau",
          "聴解 1 (8): 二人は切符をどうやって買いますか。 正解: [1]",
          "女：券売機がすごく並んでいるから、あっちの窓口で買おうよ。\n男：そうだね、窓口に行こう。",
          "Nữ: Máy bán vé đông người xếp hàng quá, mình qua quầy vé đằng kia mua đi!\nNam: Ừ, qua quầy vé thôi.")

    # --- LISTENING: Mondai 2 - Key Points (Q79 - Q85) ---
    add_q(79, 1, "Chỗ để quên chìa khóa", "Bạn nam đã để quên chìa khóa ở ngay trên ổ khóa chiếc xe đạp dưới bãi xe.",
          "Bạn nam kiểm tra túi và nhớ ra lúc nãy vội vào lớp nên quên rút chìa khóa khỏi xe đạp ở bãi đỗ xe.",
          "Trong túi áo khoác", "Trên bàn học lớp học", "Cắm nguyên trên ổ khóa xe đạp ngoài bãi xe (ĐÚNG)", "Tại tiệm cà phê",
          "聴解 2 (1): 男の人はどこに鍵を忘れましたか。 正解: [3]",
          "男：あっ、自転車のカギを抜くのを忘れて、そのまま置いてきちゃった！",
          "Nam: Á, mình quên không rút chìa khóa xe đạp ra mà cứ thế để luôn ở bãi xe rồi!")

    add_q(80, 2, "Ưu điểm lớn nhất của căn phòng", "Căn phòng có cửa sổ lớn hướng sáng rất thoáng mát và vị trí đi bộ ra ga rất gần.",
          "Nhân vật khen ngợi căn phòng tràn ngập ánh nắng mặt trời và thuận tiện đi lại gần nhà ga.",
          "Giá thuê phòng cực kỳ rẻ", "Ánh sáng chan hòa và rất gần nhà ga (ĐÚNG)", "Nội thất mới tinh", "Gần trường học",
          "聴解 2 (2): 部屋のどこが一番いいと言っていますか。 正解: [2]",
          "女：日当たりがすごく良くて明るいし、駅から歩いてすぐなのが一番気に入ったの。",
          "Nữ: Căn phòng đón nắng cực tốt lại sáng sủa, mà thích nhất là đi bộ từ ga về loáng cái là tới nơi.")

    add_q(81, 4, "Thời điểm nam sinh đưa thư cho Yamamoto", "Bạn nam quyết định sẽ đứng đợi ở bên ngoài thư viện và đưa tận tay bức thư cho bạn sau giờ tan học.",
          "Bạn nữ gợi ý bạn Yamamoto sau giờ học thường ở thư viện 30 phút, bạn nam ngại đông nên chọn đợi ở cửa ngoài thư viện để đưa thư.",
          "Đưa vào buổi sáng trong lớp học", "Nhờ bạn chuyển hộ", "Bỏ thư vào hòm thư nhà", "Đứng đợi ngoài cửa thư viện sau giờ học để đưa tận tay (ĐÚNG)",
          "聴解 2 (3): 男の学生はいつ山本さんに手紙を渡しますか。 正解: [4]",
          "女：山本さんなら授業の後いつも図書館にいるよ。出てきたときはどう？\n男：うん、外で待って自分で渡すよ。",
          "Nữ: Yamamoto sau giờ học lúc nào cũng ở thư viện đấy. Lúc bạn ấy bước ra thì sao?\nNam: Ừ, tớ sẽ đợi ở ngoài rồi tự tay đưa cho bạn ấy.")

    add_q(82, 2, "Giờ mở cửa sở thú Sakura ngày khai trương", "Vào ngày khai trương đặc biệt, sở thú Sakura mở cửa kéo dài phục vụ khách tới 20:00 tối.",
          "Đoạn phát thanh nêu rõ: ngày thường đóng cửa lúc 17:00, riêng ngày khai trương mở đến 8 giờ tối (午後8時まで開いている).",
          "Mở cửa đến 8 giờ tối (ĐÚNG)", "Mở cửa đến 5 giờ chiều", "Miễn phí vé cho tất cả người lớn", "Đóng cửa nghỉ lễ",
          "聴解 2 (4): サクラ動物園はオープンの日にどうなりますか。 正解: [1]",
          "女：オープンの日は午後8時まで開いているそうです。お仕事のあとにお子さんと一緒にいかがでしょうか。",
          "Nữ: Nghe nói ngày mở màn sở thú sẽ mở cửa đến tận 8 giờ tối. Sau giờ làm việc quý vị dắt các bé cùng ghé thăm nhé.")

    add_q(83, 2, "Điều nữ du học sinh ngạc nhiên về máy bán hàng tự động", "Bạn nữ kinh ngạc vì ở Nhật Bản máy bán hàng tự động bán rất nhiều chủng loại phong phú như hoa, quần áo, chuối.",
          "Cô gái nói ở nước mình chỉ bán nước ngọt, sang Nhật thấy bán cả chuối, hoa, quần áo, rất đa dạng chủng loại (種類が多い).",
          "Máy có thể nói chuyện", "Số lượng máy quá nhiều", "Bán đa dạng phong phú nhiều chủng loại hàng hóa (ĐÚNG)", "Không bị mất trộm tiền",
          "聴解 2 (5): 女の留学生は日本の自動販売機についてどんなことに驚いたと言っていますか。 正解: [3]",
          "女：私が驚いたのは種類だよ。日本ではバナナや花、服まで売っているのを見てびっくりした。",
          "Nữ: Điều làm tớ kinh ngạc chính là chủng loại hàng hóa đấy. Ở Nhật tớ thấy bán cả chuối, hoa tươi, thậm chí cả quần áo nữa.")

    add_q(84, 4, "Khung giờ trứng gà được giảm giá ở siêu thị", "Chương trình siêu khuyến mãi giảm giá trứng chỉ diễn ra trong vòng 1 tiếng từ 17:30 đến 18:30 chiều.",
          "Nhân viên giải thích: bây giờ là 17:00, phải 30 phút nữa mới bắt đầu và chương trình chỉ diễn ra trong 1 tiếng buổi chiều.",
          "Từ 17:00 đến 18:00", "Từ 17:30 đến 18:30 chiều (ĐÚNG)", "Từ 18:00 đến 19:00", "Cả buổi chiều",
          "聴解 2 (6): たまごが安くなる時間は何時から何時までですか。 正解: [2]",
          "男：夕方の1時間だけなんです。今ちょうど5時ですから、始まるまで30分あります。",
          "Nam: Dạ chỉ diễn ra trong 1 tiếng buổi chiều thôi ạ. Bây giờ đang đúng 5 giờ, còn 30 phút nữa mới bắt đầu ạ.")

    add_q(85, 3, "Lý do thích ngắm hoa ở công viên phía Đông (Higashi)", "Ở công viên phía Đông có hồ nước lớn, có thể vừa chèo thuyền trên hồ vừa ngắm hoa anh đào nở rất thơ mộng.",
          "Nam giải thích công viên Bắc đông đúc chật chội, còn công viên Đông có hồ nước, được đi thuyền ngắm hoa rất thú vị (池があって船に乗って桜が見られる).",
          "Có nhiều gian hàng đồ ăn ngon", "Gần công ty có thể đi bộ", "Có hồ nước để đi thuyền ngắm hoa anh đào (ĐÚNG)", "Ít người không bị ồn ào",
          "聴解 2 (7): 男の人はどうして東公園がいいと言っていますか。 正解: [3]",
          "男：東公園は池があって、船に乗って桜が見られるから楽しいよ。",
          "Nam: Ở công viên Higashi có hồ nước, mình có thể ngồi thuyền ngắm hoa anh đào nở nên vui lắm đấy.")

    # --- LISTENING: Mondai 3 - Utterance Expressions (Q86 - Q90) ---
    add_q(86, 2, "Hỏi chỗ mua chiếc vòng cổ đẹp", "Thấy bạn đeo chiếc vòng cổ dễ thương, muốn hỏi bạn mua ở cửa hàng nào: 'Cái đó bạn mua ở đâu thế?'",
          "Mẫu câu chuẩn hỏi nguồn gốc mua đồ: 「それはどこで買ったんですか。」",
          "Bạn định mua ở tiệm nào?", "Cái đó bạn mua ở đâu vậy? (ĐÚNG)", "Hãy nói cho tôi biết đã mua hay chưa", "Cái đó giá đắt không?",
          "聴解 3 (1): 友達がかわいいネックレスをしています。何と言いますか。 正解: [2]",
          "「それはどこで買ったんですか。」",
          "Cái đó bạn mua ở đâu thế?")

    add_q(87, 2, "Nhờ bạn nhặt hộ cục tẩy rơi", "Cục tẩy rơi xuống gầm bàn, muốn nhờ bạn nhặt giúp mình một tay: 'Xin lỗi, bạn nhặt hộ mình cục tẩy với được không?'",
          "Mẫu câu nhờ bạn bè nhặt hộ: 「ごめん、消しゴムを拾ってくれる？」",
          "Để mình nhặt cục tẩy cho bạn nhé", "Xin lỗi, bạn nhặt giúp mình cục tẩy được không? (ĐÚNG)", "Hình như tẩy của bạn bị rơi kìa", "Bạn có tẩy không cho mình mượn",
          "聴解 3 (2): 机の下に消しゴムが落ちました。友達に取ってもらいたいです。何と言いますか。 正解: [2]",
          "「ごめん、消しゴムを拾ってくれる？」",
          "Xin lỗi, bạn nhặt giúp mình cục tẩy với được không?")

    add_q(88, 1, "Nhường người khác xuống thang máy trước", "Trong thang máy, mình muốn nhường mọi người bước ra trước rồi mình ra sau: 'Xin mời bác/anh đi trước ạ.'",
          "Câu giao tiếp lịch sự nhường lối: 「どうぞ、お先に。」",
          "Xin mời bác đi trước ạ (ĐÚNG)", "Tôi đi ra phía trước đây", "Xin nhờ bạn một lát sau nhé", "Tôi xuống tầng này",
          "聴解 3 (3): エレベーターの中です。他の人が降りた後で降ります。何と言いますか。 正解: [1]",
          "「どうぞ、お先に。」",
          "Xin mời bác/anh đi trước ạ.")

    add_q(89, 3, "Nhắc bạn quên chưa kéo khóa balo", "Thấy bạn để mở toang balo mà không hay biết, nhắc nhở bạn: 'Cặp của bạn đang mở kìa!'",
          "Diễn tả trạng thái đồ vật đang mở: 「カバンが開いているよ。」",
          "Hãy mở sẵn cặp ra nhé", "Cặp vẫn đang đóng nguyên kìa", "Balo của bạn đang bị mở toang kìa! (ĐÚNG)", "Bạn đóng cặp lại chưa?",
          "聴解 3 (4): 友達がカバンをしめるのを忘れています。何と言いますか。 正解: [3]",
          "「カバンが開いているよ。」",
          "Balo của bạn đang bị mở kìa!")

    add_q(90, 2, "Hỏi cách đọc chữ Hán trên biển hiệu", "Không biết chữ Hán đó đọc như thế nào, muốn hỏi người khác: 'Chỗ này viết là gì thế ạ?'",
          "Câu hỏi nội dung / cách đọc chữ Hán: 「何と書いてあるんですか。」",
          "Bạn đã viết chữ này như thế nào?", "Chỗ đó viết là gì thế ạ? (ĐÚNG)", "Tôi nên viết sẵn cái gì vào đây?", "Chữ này có nghĩa là gì?",
          "聴解 3 (5): 読み方が知りたいです。何と言いますか。 正解: [2]",
          "「何と書いてあるんですか。」",
          "Chỗ này viết là gì thế ạ?")

    # --- LISTENING: Mondai 4 - Quick Response (Q91 - Q98) ---
    add_q(91, 3, "Mời uống thêm trà: 'Dùng thêm một chén nữa nhé?'", "Khi được chủ nhà nhã ý mời thêm trà, đáp lại lịch sự: 'Cảm ơn bác, vậy cháu xin phép dùng thêm ạ.'",
          "Đáp lại lời mời nước uống: 「すみません、いただきます。」",
          "Cảm ơn bạn, tôi xin nhận ạ (ĐÚNG)", "Mời bạn uống thêm một chén", "Không có chi đâu", "Tôi không thích uống trà",
          "聴解 4 (1): よかったら、お茶をもう一杯いかがですか。 正解: [1]",
          "女：よかったら、お茶をもう一杯いかがですか。\n男：すみません、いただきます。",
          "Nữ: Nếu được thì mời bạn dùng thêm một tách trà nữa nhé?\nNam: Cảm ơn bạn, vậy mình xin phép dùng thêm ạ.")

    add_q(92, 3, "Hỏi thăm: 'Trông bạn bận nhỉ, giờ nói chuyện chút được không?'", "Đáp lại nhã nhặn sẵn sàng lắng nghe: 'Vâng được chứ, có chuyện gì thế bạn?'",
          "Phản hồi sẵn sàng lắng nghe đối phương: 「はい、何ですか。」",
          "Tôi đâu có đang nói chuyện đâu", "À bây giờ tôi không giúp được đâu", "Vâng được chứ, có chuyện gì thế ạ? (ĐÚNG)", "Để hôm khác nhé",
          "聴解 4 (2): 山本さん、忙しそうだけど、今ちょっと話せる？ 正解: [3]",
          "女：山本さん、忙しそうだけど、今ちょっと話せる？\n男：はい、何ですか。",
          "Nữ: Yamamoto ơi trông cậu bận nhỉ, bây giờ nói chuyện một chút được không?\nNam: Vâng được chứ, có chuyện gì thế cậu?")

    add_q(93, 3, "Bàn quà tặng sinh nhật bạn", "Lee ơi sắp tới sinh nhật Mori rồi, tặng quà gì bây giờ nhỉ? -> Gợi ý: 'Ừm, tặng áo thun T-shirt thì sao?'",
          "Đưa ra ý tưởng gợi ý quà tặng: 「うーん、Tシャツはどう？」",
          "Thế thì tốt quá rồi", "Tụi mình tặng quà cho bạn ấy đi", "Ừm, tặng chiếc áo thun T-shirt thì thấy thế nào? (ĐÚNG)", "Tôi không biết bạn ấy thích gì",
          "聴解 4 (3): もうすぐ森さんの誕生日だね。プレゼントは何にしようか。 正解: [3]",
          "男：もうすぐ森さんの誕生日だね。プレゼントは何にしようか。\n女：うーん、Tシャツはどう？",
          "Nam: Sắp đến sinh nhật Mori rồi nhỉ. Tụi mình nên tặng quà gì bây giờ?\nNữ: Ừm, tặng áo thun T-shirt thì cậu thấy sao?")

    add_q(94, 1, "Bảo chưa cần dọn tài liệu: 'Cứ để đấy tí dùng'", "Người kia bảo tài liệu tí dùng chưa cần cất: 'Vậy thì tôi cứ để nguyên ở đây nhé.'",
          "Hành động để sẵn đồ vật ở vị trí: 「じゃあ、ここに置いておきます。」",
          "Vậy thì tôi sẽ để sẵn ở đây nhé (ĐÚNG)", "Không, tôi không dùng nữa đâu", "Để tôi dọn dẹp ngay bây giờ nhé", "Cất vào ngăn kéo nhé",
          "聴解 4 (4): その資料後で使うから、まだ片付けなくてもいいですよ。 正解: [1]",
          "女：その資料後で使うから、まだ片付けなくてもいいですよ。\n男：じゃあ、ここに置いておきます。",
          "Nữ: Tập tài liệu đó lát nữa dùng tới nên em chưa cần dọn dẹp cất đi đâu nhé.\nNam: Vâng, vậy thì em cứ để sẵn ở đây nhé ạ.")

    add_q(95, 2, "Hỏi tiền bối: 'Anh chỉ em cách chọn môn học với được không?'", "Tiền bối nhiệt tình vui vẻ nhận lời: 'Được chứ, có gì thắc mắc cứ hỏi anh tự nhiên nhé.'",
          "Phản hồi hào phóng giúp đỡ đàn em: 「うん、何でも聞いて。」",
          "Cái đó anh không cho em được đâu", "Được chứ, có gì em cứ hỏi anh nhé (ĐÚNG)", "Nhất định nhờ em giúp anh nhé", "Môn nào cũng khó cả",
          "聴解 4 (5): 大学の授業の選び方について教えてもらえませんか。 正解: [2]",
          "後輩：先輩、大学の授業の選び方について教えてもらえませんか。\n先輩：うん、何でも聞いて。",
          "Hậu bối: Tiền bối ơi, anh có thể chỉ dẫn cho em cách đăng ký chọn môn học đại học được không ạ?\nTiền bối: Ừ được chứ, có gì em cứ hỏi anh thoải mái nhé.")

    add_q(96, 3, "Hỏi thăm sức khỏe: 'Vết thương của bạn đã đỡ chưa?'", "Thông báo tin vui phục hồi hoàn toàn: 'Cảm ơn bạn, vết thương đã khỏi hẳn hoàn toàn rồi.'",
          "Khỏi bệnh hoàn toàn: 「すっかりなおりました。」",
          "Tôi không hay làm việc đó", "Thế thì tốt quá rồi", "Cảm ơn bạn, mình đã khỏi hẳn hoàn toàn rồi (ĐÚNG)", "Bác sĩ dặn nghỉ ngơi",
          "聴解 4 (6): 山田さん、怪我はもう良くなりましたか。 正解: [3]",
          "女：山田さん、怪我はもう良くなりましたか。\n男：すっかりなおりました。",
          "Nữ: Yamada ơi, vết thương của cậu đã đỡ hơn chút nào chưa?\nNam: Cảm ơn cậu, mình đã lành lặn khỏi hẳn hoàn toàn rồi.")

    add_q(97, 2, "Hỏi định hướng sau tốt nghiệp: 'Tốt nghiệp xong bạn định làm gì?'", "Nêu rõ định hướng nghề nghiệp cụ thể: 'Tôi sẽ về nước và làm công việc thương mại xuất nhập khẩu.'",
          "Trả lời đúng trọng tâm câu hỏi về kế hoạch tương lai: 「国に帰って、貿易の仕事をします。」",
          "Tôi đã được phép tốt nghiệp rồi", "Tôi sẽ về nước và làm công việc về thương mại xuất nhập khẩu (ĐÚNG)", "Tôi từng có kinh nghiệm làm việc ở ngân hàng", "Tôi chưa nghĩ đến",
          "聴解 4 (7): 大学を卒業したらどうするか決まりましたか。 正解: [2]",
          "男：リーさん、大学を卒業したらどうするか決まりましたか。\n女：国に帰って、貿易の仕事をします。",
          "Nam: Lee ơi, tốt nghiệp đại học xong bạn đã quyết định sẽ làm gì tiếp theo chưa?\nNữ: Mình sẽ trở về nước và làm công việc liên quan đến ngành thương mại.")

    add_q(98, 1, "Hỏi han: 'Bạn có biết tập tài liệu cuộc họp ở đây đâu không?'", "Ngạc nhiên và hỏi lại khi biết tài liệu bị thất lạc: 'Ủa thế á, không có ở đó sao bạn?'",
          "Phản hồi bất ngờ khi biết tin đồ vật bị thất lạc: 「ええ、ないんですか。」",
          "Ủa, không có ở đó hả bạn? (ĐÚNG)", "Thế thì hãy chỉ cho tôi nhé", "Tôi đã không hiểu gì cả", "Tôi vừa mới cầm mà",
          "聴解 4 (8): ここにあった会議の資料知らない？ 正解: [1]",
          "女：ねえ、ここにあった会議の資料知らない？\n男：ええ、ないんですか。",
          "Nữ: Cậu ơi, tập tài liệu cuộc họp vừa để ở đây cậu có thấy đâu không?\nNam: Ơ, không có ở đấy hả cậu?")

    return questions
