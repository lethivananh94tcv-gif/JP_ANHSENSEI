# Authentic 98 questions data for JLPT N4 2014-07
# Extracted from full_raw_n4-2014-07.pdf.txt (试题解析 & 聴解原文)

def get_n4_2014_data():
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
    add_q(1, 4, "案内 (あんない)", "Tôi đã được anh ấy nhiệt tình dẫn đi tham quan thành phố.",
          "Chữ 「案」 (án) có âm On là 「あん」, chữ 「内」 (nội) có âm On là 「ない」 -> 案内 (あんない: hướng dẫn, dẫn đường).",
          "あんねい: Sai âm On của 内", "あんない (案内): Hướng dẫn, dẫn đường", "あない: Thiếu âm ん", "あねい: Sai cả hai âm",
          "(1) 2 句意: 他热情地带我参观了城市。2. あんない(案内): 引导, 导游")

    add_q(2, 3, "習い (ならい)", "Thầy Kuninaka ơi, thầy đã bắt đầu học kiếm đạo từ khi nào thế ạ?",
          "Động từ 「ならう (習う - tập)」: học tập một kỹ năng. Dạng danh từ / liên dụng: 「ならい」.",
          "すまい (住まい): Nơi ở", "つかい (使い): Cách dùng", "ならい (習い): Việc học tập, rèn luyện", "てつだい (手伝い): Giúp đỡ",
          "(2) 3 句意: 国中老师你是从什么时候开始学的? 3. ならう(習う): 学习")

    add_q(3, 1, "軽い (かるい)", "Chiếc máy tính xách tay đời mới này cầm rất là nhẹ nhàng.",
          "Tính từ 「かるい」 viết bằng chữ Hán là 「軽い」 (khinh - nhẹ, đối lập với nặng 重い).",
          "かるい (軽い): Nhẹ nhàng", "おもい (重い): Nặng nề", "あかるい (明るい): Sáng sủa", "くらい (暗い): Tối tăm",
          "(3) 1 句意: 这台电脑很轻。1. かるい(軽い): 轻")

    add_q(4, 2, "安い (やすい)", "Thực phẩm và rau củ quả ở siêu thị này giá cả rất là rẻ.",
          "Tính từ 「やすい」 viết bằng chữ Hán là 「安い」 (an - rẻ, giá cả bình dân).",
          "たかい (高い): Đắt đỏ", "やすい (安い): Rẻ, bình dân", "ひくい (低い): Thấp", "あまい (甘い): Ngọt ngào",
          "(4) 2 句意: 这家超市的食品很便宜。2. やすい(安い): 便宜")

    add_q(5, 4, "顔 (かお)", "Trên khuôn mặt của bạn đang bị dính vết bẩn kìa.",
          "Danh từ 「かお」 viết bằng chữ Hán chuẩn xác là 「顔」 (nhan - khuôn mặt).",
          "あたま (頭): Cái đầu", "こころ (心): Trái tim", "からだ (体): Cơ thể", "かお (顔): Khuôn mặt",
          "(5) 4 句意: 你的脸上沾上了点东西哦。4. かお(顔): 脸")

    add_q(6, 1, "天気予報 (てんきよほう)", "Sáng nay vội đi làm nên tôi đã không kịp xem bản tin dự báo thời tiết.",
          "Chữ 「天気」 (てんき) ghép với 「予報」 (よほう) tạo thành cụm từ 「天気予報 (てんきよほう: dự báo thời tiết)」.",
          "てんきよほう (天気予報): Dự báo thời tiết", "でんきよほう: Nhầm sang điện khí 電気", "てんきよぼう: Sai âm đục", "でんきよぼう: Sai cả hai âm",
          "(6) 1 句意: 今天早上没有看天气预报。1. 天気予報(てんきよほう): 天气预报")

    add_q(7, 2, "動かないで (うごかないで)", "Anh Yamamoto ơi, xin anh hãy giữ nguyên tư thế và đừng cử động nhé.",
          "Động từ 「うごく (動く - động)」: chuyển động, cử động. Cấm đoán lịch sự: 「動かないでください」.",
          "はたらかないで (働く): Xin đừng làm việc", "うごかないで (動く): Xin đừng cử động, nhúc nhích", "ならわないで (習う): Xin đừng học", "あるかないで (歩く): Xin đừng đi bộ",
          "(7) 2 句意: 山本先生, 请不要动。2. うごく(動く): 动, 移动")

    add_q(8, 2, "運んで (はこんで)", "Xin hãy giúp tôi một tay khuân vác chiếc hòm hành lý này sang phòng bên cạnh.",
          "Động từ 「はこぶ (運ぶ - vận)」: vận chuyển, khuân vác dời đồ đạc.",
          "たのんで (頼む): Nhờ vả", "ふんで (踏む): Giẫm đạp", "かんで (噛む): Cắn nhai", "はこんで (運ぶ): Khuân vác, chuyển dời",
          "(8) 4 句意: 请帮我把这件行李搬到隔壁。4. はこぶ(運ぶ): 搬运")

    add_q(9, 3, "特急 (とっきゅう)", "Chuyến tàu tốc hành đặc biệt (đặc cấp) sắp sửa tiến vào sân ga rồi.",
          "Chữ 「特」 biến âm ngắt 「とっ」 ghép với chữ 「急」 (きゅう) -> 特急 (とっきゅう: tàu tốc hành đặc biệt).",
          "とくきゅう: Chưa biến âm ngắt", "とっきゅ: Thiếu trường âm う", "とっきゅう (特急): Tàu đặc cấp, tốc hành", "どっきゅう: Sai âm đầu",
          "(9) 3 句意: 特快列车马上就要来了。3. とっきゅう(特急): 特快列车")

    # --- MONDAI 2: Kanji Writing (Q10 - Q15) ---
    add_q(10, 3, "面白い (おもしろい)", "Bộ phim điện ảnh chiếu rạp cuối tuần vừa rồi vô cùng thú vị và lôi cuốn.",
          "Từ 「おもしろい」 viết bằng chữ Hán chuẩn xác là 「面白い」 (diện bạch - thú vị, hay ho).",
          "面白: Thiếu Okurigana い", "面自い: Sai chữ Hán tự", "面白い (おもしろい): Thú vị, hấp dẫn", "面白り: Sai đuôi",
          "(10) 3 句意: 那部电影很有趣。3. 面白い（おもしろい）: 有趣")

    add_q(11, 2, "昼 (ひる)", "Buổi trưa nay tôi đã cùng đồng nghiệp đi ăn cơm ở nhà hàng trước cổng công ty.",
          "Từ 「ひる」 viết bằng chữ Hán chuẩn xác là 「昼」 (trú - buổi trưa, ban ngày).",
          "朝 (あさ): Buổi sáng", "昼 (ひる): Buổi trưa, ban ngày", "夕 (ゆう): Chiều tối", "夜 (よる): Ban đêm",
          "(11) 2 句意: 中午和同事一起吃了午饭。2. 昼（ひる）: 中午, 白天")

    add_q(12, 1, "売り場 (うりば)", "Xin lỗi cho tôi hỏi, quầy bán đồ chơi trẻ em nằm ở tầng mấy vậy ạ?",
          "Từ ghép: Động từ 「売る」 dạng liên dụng 「売り」 ghép với danh từ 「場」 -> 「売り場」 (quầy bán hàng).",
          "売り場 (うりば): Quầy bán hàng", "買場: Quầy mua (sai)", "売所: Sai chữ", "買所: Sai chữ",
          "(12) 1 句意: 玩具卖场在哪里? 1. 売り場（うりば）: 柜台, 售货处")

    add_q(13, 4, "終わる (おわる)", "Buổi biểu diễn hòa nhạc thính phòng dự kiến sẽ kết thúc vào lúc 4 giờ chiều.",
          "Động từ 「おわる」 được viết bằng chữ Hán chuẩn xác là 「終わる」 (chung - kết thúc, chấm dứt).",
          "始る (はじまる): Bắt đầu (sai nghĩa)", "止る (とまる): Dừng lại", "休る (やすむ): Nghỉ ngơi", "終わる (おわる): Kết thúc, hoàn tất",
          "(13) 4 句意: 演奏会四点结束。4. 終わる（おわる）: 结束")

    add_q(14, 3, "本屋 (ほんや)", "Khu vực lân cận quanh đây có tiệm bán sách nào không ạ?",
          "Chữ 「本」 (sách) ghép với chữ 「屋」 (tiệm, quán) tạo thành danh từ 「本屋」 (tiệm sách).",
          "本家: Nhà gốc, dòng chính", "本室: Phòng đọc", "本屋 (ほんや): Hiệu sách, tiệm sách", "本所: Trụ sở chính",
          "(14) 3 句意: 这附近有书店吗? 3. 本屋（ほんや）: 书店")

    add_q(15, 2, "係の人 (かかりのひと)", "Nếu bạn không rõ quy định, hãy đến hỏi trực tiếp người phụ trách nhé.",
          "Chữ Hán chuẩn xác cho 「かかり」 trong người phụ trách công việc là 「係」 (hệ - người phụ trách).",
          "任の人: Nhầm chữ", "係の人 (かかりのひと): Người phụ trách, nhân viên trực", "役の人: Nhầm chữ", "関の人: Nhầm chữ",
          "(15) 2 句意: 问问负责人吧? 2. 係（かかり）: 负责人, 经办人")

    # --- MONDAI 3: Context Vocabulary (Q16 - Q25) ---
    add_q(16, 2, "乗り換え (のりかえ)", "Xin hành khách hãy xuống tàu ở nhà ga thứ hai, sau đó đổi sang chuyến xe buýt số 5.",
          "Cụm từ: 「乗り換える / 乗り換え」 mang nghĩa chuyển đổi từ phương tiện này sang phương tiện khác.",
          "乗り降り (lên xuống xe)", "乗り換え (chuyển tuyến, đổi xe)", "乗り越し (đi quá ga)", "乗り止め (ngừng xe)",
          "(16) 2 句意: 请在第二站下电车, 换乘公交车。2. のりかえ(乗り換え): 换乘")

    add_q(17, 4, "英語 (えいご)", "Trên thực đơn của nhà hàng đó có ghi cả phần giải thích chú thích bằng tiếng Anh.",
          "Danh từ 「英語 (えいご)」: tiếng Anh. Dùng trong giải thích thực đơn cho khách ngoại quốc.",
          "日本語: Tiếng Nhật", "中国語: Tiếng Trung", "フランス語: Tiếng Pháp", "英語 (えいご): Tiếng Anh",
          "(17) 4 句意: 那家餐厅的菜单上还写有英文说明。4. えいご(英語): 英语")

    add_q(18, 4, "卒業 (そつぎょう)", "Tháng trước tôi vừa tốt nghiệp trường đại học, hiện tại tôi đang đi làm tại một công ty ở Nhật.",
          "Cụm từ: 「大学を卒業する」 (tốt nghiệp ra trường đại học).",
          "入学 (nhập học)", "退学 (thôi học)", "休学 (nghỉ học tạm thời)", "卒業 (そつぎょう: tốt nghiệp)",
          "(18) 4 句意: 上个月从大学毕业了, 现在在日本工作。4. そつぎょう(卒業): 毕业")

    add_q(19, 2, "工事 (こうじ)", "Đoạn đường này hiện đang trong quá trình thi công sửa chữa nên tạm thời không thể lưu thông.",
          "Danh từ 「工事 (こうじ)」 nghĩa là công trình xây dựng, sửa chữa cầu đường.",
          "事故 (tai nạn giao thông)", "工事 (công trình xây dựng, thi công)", "故障 (sự cố hỏng hóc)", "混雑 (tắc nghẽn đông đúc)",
          "(19) 2 句意: 这条路正在施工, 所以无法通过。2. こうじ(工事): 施工, 工程")

    add_q(20, 3, "割ってしまった (わってしまった)", "Hôm nay trong lúc dọn dẹp bát đĩa, tôi đã vô ý làm rơi và đánh vỡ mất một chiếc đĩa.",
          "Động từ 「わる (割る)」: làm vỡ đồ gốm sứ, thủy tinh. Cấu trúc lỡ làm vỡ: 「割ってしまった」.",
          "折ってしまった (làm gãy cành)", "切ってしまった (cắt đứt)", "割ってしまった (làm vỡ đồ sứ, đĩa)", "破ってしまった (làm rách giấy)",
          "(20) 3 句意: 我今天打碎了一个盘子。3. 割る(わる): 打碎, 弄碎")

    add_q(21, 1, "すっかり", "Sau một tuần uống thuốc và nghỉ ngơi điều độ, bệnh cảm cúm của tôi đã khỏi hẳn hoàn toàn.",
          "Phó từ 「すっかり」 kết hợp với động từ hồi phục 「治る」 mang nghĩa: hoàn toàn khỏi hẳn.",
          "すっかり (hoàn toàn, khỏi hẳn)", "ぴったり (vừa vặn khít khao)", "しっかり (chắc chắn, chăm chỉ)", "びっくり (giật mình sửng sốt)",
          "(21) 1 句意: 感冒彻底痊愈了。1. すっかり: 彻底, 完全")

    add_q(22, 4, "相談 (そうだん)", "Điểm đến cho chuyến du lịch dã ngoại đã được quyết định sau khi tôi bàn bạc kỹ lưỡng với bạn bè.",
          "Cụm từ: 「～と相談する」 (bàn bạc, thảo luận, trao đổi ý kiến cùng với ai đó).",
          "挨拶 (chào hỏi)", "約束 (hẹn ước)", "連絡 (liên lạc)", "相談 (そうだん: bàn bạc, thảo luận)",
          "(22) 4 句意: 要去哪里旅行, 是在问了班上同学的意见后决定的。4. 相談(そうだん): 商量, 讨论")

    add_q(23, 1, "迎える (むかえる)", "Bố mẹ tôi từ quê nhà chuẩn bị bay lên thăm, nên chiều nay tôi sẽ ra sân bay đón bố mẹ.",
          "Động từ 「むかえる (迎える)」: nghênh đón, đi đón người thân ở sân bay, nhà ga.",
          "迎える (むかえる: nghênh đón)", "送る (おくる: tiễn đưa)", "送別する (chia tay)", "訪ねる (ghé thăm)",
          "(23) 1 句意: 父母要从故乡过来, 所以我要去机场接他们。1. 迎える(むかえる): 迎接")

    add_q(24, 1, "固い (かたい)", "Khúc thịt nướng này dai và cứng quá, trước khi nuốt bạn nhớ phải nhai thật kỹ nhé.",
          "Tính từ 「かたい (固い / 硬い)」: cứng, dai (đối lập với mềm やわらかい).",
          "固い (かたい: cứng, dai)", "柔らかい (やわらかい: mềm)", "甘い (ngọt)", "辛い (cay nồng)",
          "(24) 1 句意: 这块肉很硬, 吃之前请好好嚼一下。1. かたい(固い): 硬, 坚硬")

    add_q(25, 3, "飾る (かざる)", "Hôm nay nhà tôi có tổ chức tiệc chiêu đãi bạn bè, nên tôi đã cắm hoa tươi trang trí trên bàn ăn.",
          "Động từ 「かざる (飾る)」: trang trí, bài trí không gian cho thêm phần đẹp đẽ, trang trọng.",
          "片付ける (thu dọn ngăn nắp)", "捨てる (vứt bỏ đồ)", "飾る (かざる: bài trí, trang trí hoa tươi)", "運ぶ (khuân vác vận chuyển)",
          "(25) 3 句意: 今天有个聚会, 所以在桌上装饰了些花。3. 飾る(かざる): 装饰")

    # --- MONDAI 4: Paraphrases / Synonyms (Q26 - Q30) ---
    add_q(26, 2, "大切 ≒ 大事", "Văn kiện này là tài liệu quan trọng tuyệt đối không được làm thất lạc.",
          "Tính từ đuôi な 「たいせつ (大切: quan trọng, quý giá)」 hoàn toàn đồng nghĩa với 「だいじ (大事: hệ trọng, quan trọng)」.",
          "Dễ dàng, đơn giản (簡単)", "Quan trọng, hệ trọng (大事)", "Đẹp mắt (綺麗)", "Rẻ tiền (安い)",
          "(26) 2 句意: 这个非常重要。(大切 ≒ 大事)")

    add_q(27, 4, "禁煙 ≒ タバコを吸ってはいけない", "Khu vực sảnh chờ nhà ga này là khu vực cấm hút thuốc lá tuyệt đối.",
          "Danh từ 「禁煙 (きんえん: cấm hút thuốc)」 có ý nghĩa tương đương là: không được phép hút thuốc lá ở đây.",
          "Có thể hút thuốc thoải mái", "Nơi bán thuốc lá", "Chỉ hút thuốc sau giờ làm", "Tuyệt đối không được hút thuốc lá ở đây",
          "(27) 4 句意: 这里禁烟。(禁煙 ≒ タバコを吸ってはいけない)")

    add_q(28, 4, "叱られた ≒ 怒られた", "Hôm qua do đi chơi về muộn không xin phép nên tôi đã bị bố lớn tiếng trách mắng.",
          "Động từ bị động 「しかられた (叱られた: bị quở mắng)」 đồng nghĩa với 「怒られた (おこられた: bị nổi giận, mắng mỏ)」.",
          "Được khen ngợi (褒められた)", "Được tặng quà", "Được tha thứ", "Bị bố nổi giận trách mắng (怒られた)",
          "(28) 4 句意: 昨天被爸爸骂了。(叱られた ≒ 怒られた)")

    add_q(29, 1, "届く ≒ 着く", "Kiện hàng bưu điện dự kiến sẽ được giao tới địa chỉ của bạn vào lúc 9 giờ sáng mai.",
          "Động từ 「とどく (届く: được chuyển tới nơi)」 có ý nghĩa tương đương với 「つく (着く: tới nơi, đến tay người nhận)」.",
          "Giao tới nơi, đến nơi (着く)", "Bị hoàn trả lại", "Bị hư hỏng", "Gửi đi xa",
          "(29) 1 句意: 明天9点送达那边。(届く ≒ 着く)")

    add_q(30, 3, "生産 ≒ 作る", "Khu công nghiệp ngoại thành này là nơi chuyên sản xuất các dòng xe ô tô xuất khẩu.",
          "Danh từ 「生産 (せいさん: sản xuất)」 đồng nghĩa với động từ chế tạo, tạo ra sản phẩm: 「作る (つくる)」.",
          "Sửa chữa xe hơi", "Mua bán xe ô tô", "Sản xuất, chế tạo xe ô tô (作る)", "Lái thử xe ô tô",
          "(30) 3 句意: 这里是生产车的地方。(生産 ≒ 作る)")

    # --- MONDAI 5: Word Usage (Q31 - Q35) ---
    add_q(31, 2, "計画 (けいかく)", "Chúng tôi đang lên kế hoạch cụ thể cho chuyến du lịch Hokkaido vào kỳ nghỉ đông tới.",
          "Từ 「計画 (けいかく)」 dùng để chỉ kế hoạch, dự định sắp xếp các hoạt động trong tương lai.",
          "Kế hoạch cho chuyến đi du lịch mùa đông", "Kế hoạch bài tập (dùng sai)", "Kế hoạch bữa sáng (dùng sai)", "Kế hoạch thời tiết (dùng sai)",
          "(31) 2 けいかく 意思是“计划, 规划”, 选项 2 为正确应用。")

    add_q(32, 1, "お礼 (おれい)", "Tôi đã mua một món quà lưu niệm nhỏ để bày tỏ lời cảm ơn sâu sắc tới người đã giúp đỡ mình.",
          "Danh từ 「お礼 (おれい)」 dùng để biểu thị sự cảm ơn, đền đáp ơn nghĩa đối với người đã giúp đỡ mình.",
          "Tặng quà để nói lời cảm ơn người đã giúp đỡ", "Nói lời cảm ơn vì đi muộn (phải dùng お詫び/謝罪)", "Xin lỗi khi làm rơi vỡ đồ", "Chào tạm biệt",
          "(32) 1 お礼 意思是“感谢, 谢礼”, 选项 1 为正确应用。")

    add_q(33, 1, "丁寧 (ていねい)", "Khi nói chuyện giao tiếp với thầy cô giáo, việc dùng lời lẽ lịch sự và lễ phép là vô cùng quan trọng.",
          "Tính từ đuôi な 「丁寧 (ていねい)」 mang nghĩa là lịch thiệp, lễ phép, cẩn thận chỉn chu.",
          "Sử dụng ngôn ngữ lịch sự, lễ phép với thầy giáo", "Thời tiết lịch sự (dùng sai)", "Đồ ăn lịch sự (dùng sai)", "Con đường lịch sự (dùng sai)",
          "(33) 1 ていねい 意思是“有礼貌, 恭敬”, 选项 1 为正确应用。")

    add_q(34, 3, "濡れる (ぬれる)", "Trời bất chợt đổ mưa to mà tôi lại không mang theo ô nên quần áo đã bị ướt sũng hết cả.",
          "Động từ 「ぬれる (濡れる)」: bị dính nước, bị ướt sũng do trời mưa hay đổ nước.",
          "Bị rách áo", "Bị bẩn áo", "Áo quần bị dính nước mưa ướt sũng", "Bị khô quần áo",
          "(34) 3 ぬれる 意思是“淋湿, 湿透”, 选项 3 为正确应用。")

    add_q(35, 4, "沸かす (わかす)", "Tôi đang đun sôi nước nóng trong ấm đun để pha một tách trà nóng ấm.",
          "Động từ tha động từ 「わかす (沸かす)」: đun sôi nước (お湯を沸かす).",
          "Đun sôi thức ăn (phải dùng 煮る/炊く)", "Nấu cơm (phải dùng ご飯を炊く)", "Nướng bánh (phải dùng 焼く)", "Đun sôi nước để pha trà (お湯を沸かす)",
          "(35) 4 わかす 意思是“烧开, 煮沸”, 选项 4 为正确应用。")

    # --- GRAMMAR: Mondai 1 (Q36 - Q50) ---
    add_q(36, 2, "料理に使う (Dùng vào mục đích nấu ăn)", "Nhà hàng này tự trồng các loại rau củ sạch ngay trong vườn nhà để dùng vào việc nấu nướng.",
          "Cấu trúc 「Danh từ + に使う」 biểu thị mục đích sử dụng của một sự vật: rau sạch dùng cho việc nấu nướng món ăn.",
          "料理を使う: Sai trợ từ bổ ngữ", "料理に使う: ĐÚNG - Dùng vào mục đích nấu nướng món ăn", "料理で使う: Bằng món ăn", "料理を使うに: Sai cấu trúc",
          "(1) 2 句意: 这家餐馆在院子里种植做菜时要用的蔬菜。考察に表示目的用途。")

    add_q(37, 3, "2個ずつ (Mỗi thứ 2 cái)", "Khách hàng trong tiệm bánh ngọt: 'Xin lỗi, bánh dâu tây và bánh sô-cô-la cho tôi mỗi loại 2 chiếc nhé.'",
          "Hậu tố 「～ずつ」 đứng sau lượng từ mang ý nghĩa 'mỗi... / từng... đều đặn một phần bằng nhau'.",
          "2個まで: Tối đa 2 cái", "2個ほど: Khoảng chừng 2 cái", "2個ずつ: ĐÚNG - Mỗi loại 2 chiếc đều nhau", "2個ばかり: Khoảng tầm 2 cái",
          "(2) 3 句意: 草莓蛋糕和巧克力蛋糕请各给我两个。考察ずつ表示等量分配。")

    add_q(38, 1, "きのうと (Khác biệt so với hôm qua)", "Trái ngược hoàn toàn so với ngày hôm qua mưa gió, thời tiết ngày hôm nay vô cùng đẹp và nắng ráo.",
          "Mẫu câu so sánh đối chiếu: 「A は B と 違う」 (A thì khác biệt so với B). Cụm từ: きのうと違って.",
          "きのうと: ĐÚNG - Khác với ngày hôm qua", "きのうに: Sai trợ từ đối chiếu", "きのうを: Sai trợ từ bổ ngữ", "きのうで: Sai trợ từ phương tiện",
          "(3) 1 句意: 和昨天不同, 今天天气很好。考察～と違って表示对比不同。")

    add_q(39, 2, "からいですね (Cảm thán khen/chê hương vị)", "A: 'Món cà ri kiểu Ấn Độ này cay nồng thật đấy nhỉ!' - B: 'Vâng, cay nhưng mà hương vị rất tuyệt.'",
          "Trợ từ cuối câu 「ね」 dùng để tìm kiếm sự đồng cảm của đối phương trước một thực tế hiển nhiên đang cùng trải nghiệm.",
          "からいです: Câu trần thuật đơn thuần", "からいですね: ĐÚNG - Cay thật đấy nhỉ (đồng cảm)", "からいですよ: Nhấn mạnh thông tin đối phương chưa biết", "からいのか: Nghi vấn tự hỏi",
          "(4) 2 句意: 这种咖喱好辣呀。考察终助词ね表示寻求认同。")

    add_q(40, 4, "いいにおい (Mùi hương thơm bay ra)", "Từ phía gian bếp đang tỏa ra một mùi hương thơm phức ngào ngạt của đồ ăn chín tới.",
          "Cụm từ cố định: 「においがする / 味がする / 声がする」 (có mùi hương tỏa ra / có vị / có tiếng phát ra).",
          "いい味: Vị ngon (không dùng với tỏa mùi từ bếp)", "いい声: Giọng nói hay", "いい音: Âm thanh hay", "いいにおい: ĐÚNG - Mùi thơm phức tỏa ra",
          "(5) 4 句意: 厨房飘出了一阵香味。考察においがする表示散发气味。")

    add_q(41, 1, "～ように (Để có thể - chỉ mục đích)", "Mỗi ngày tôi đều kiên trì luyện nghe và nói tiếng Nhật để có thể giao tiếp trôi chảy tự nhiên.",
          "Mẫu câu 「Động từ thể khả năng + ように」 diễn tả mục đích hướng tới một trạng thái hoặc năng lực mong muốn.",
          "話せるように: ĐÚNG - Để có thể nói được trôi chảy", "話すために: Để nói (thiếu khả năng)", "話すように: Sai dạng", "話せるために: Sai ngữ pháp",
          "(6) 1 句意: 为了能流利地用日语交流而每天练习。考察ように前接可能态表示目的。")

    add_q(42, 2, "落としてしまった (Lỡ tay đánh rơi)", "Ở nhà ga, hành khách hớt hải báo nhân viên: 'Xin lỗi, hình như có ai đó vừa lỡ tay đánh rơi chiếc ví này.'",
          "Cấu trúc 「V-て + しまう」 diễn tả một hành động xảy ra ngoài ý muốn, sơ ý gây ra sự việc đáng tiếc.",
          "落としかけた: Suýt nữa đánh rơi", "落としてしまった: ĐÚNG - Lỡ đánh rơi mất", "落としそうだ: Trông có vẻ sắp rơi", "落とすはずだ: Chắc chắn rơi",
          "(7) 2 句意: 不好意思, 有人掉了钱包。考察～てしまう表示意外发生的事情。")

    add_q(43, 3, "～だけ (Chỉ duy nhất)", "Buổi sáng tôi thường rất bận rộn nên bữa sáng tôi chỉ ăn duy nhất một quả chuối là đi làm ngay.",
          "Trợ từ 「だけ」 biểu thị sự giới hạn duy nhất: chỉ ăn chuối chứ không ăn gì khác.",
          "バナナしか: Đi với phủ định (phải là 食べない)", "バナナだけ: ĐÚNG - Chỉ ăn chuối (đi với khẳng định 食べる)", "バナナでも: Cho dù là chuối", "バナナほど: Cỡ chừng chuối",
          "(8) 2 句意: 我早上一般都只吃香蕉。考察だけ接肯定句表示唯一限定。")

    add_q(44, 3, "～たらいい (Lời khuyên nên làm gì)", "Sắp đến ngày sinh nhật bạn Komori rồi, tôi nên tặng món quà gì cho bạn ấy thì tốt bây giờ nhỉ?",
          "Mẫu câu hỏi xin ý kiến hoặc gợi ý: 「Từ để hỏi + V-たらいいですか」 (Nên làm thế nào thì tốt?).",
          "あげるといい: Nếu tặng", "あげてもいい: Tặng cũng được", "あげたらいい: ĐÚNG - Nên tặng quà gì thì được", "あげるならいい: Nếu là tặng thì được",
          "(9) 3 句意: 小森的生日送她什么好呢? 考察～たらいいですか征求建议。")

    add_q(45, 4, "～てくる (Làm gì rồi quay lại)", "Tôi cảm thấy khát nước quá, để tôi chạy qua máy bán hàng tự động đằng kia mua lon nước rồi quay lại ngay nhé.",
          "Cấu trúc 「V-て + くる」 biểu thị việc đi đến một nơi khác thực hiện hành động V rồi quay trở về vị trí hiện tại.",
          "買いに行く: Đi mua (chưa thể hiện quay về)", "買っていく: Mua rồi mang đi nơi khác", "買ったところだ: Vừa mới mua xong", "買ってくる: ĐÚNG - Mua xong rồi quay lại ngay",
          "(10) 4 句意: 我想喝点东西, 马上买完过来。考察～てくる表示去去就回。")

    add_q(46, 1, "～のに (Mặc dù... mà)", "Mặc dù hôm nay tôi đã hẹn trước rất cẩn thận với anh ấy, thế nhưng mãi mà anh ấy chẳng thấy xuất hiện.",
          "Cấu trúc 「Thể thông thường + のに」 biểu thị sự tương phản mang sắc thái bất ngờ, tiếc nuối hoặc trách móc.",
          "約束したのに: ĐÚNG - Mặc dù đã hẹn trước vậy mà", "約束するのに: Dùng cho mục đích", "約束したから: Vì đã hẹn", "約束すれば: Nếu hẹn",
          "(11) 1 句意: 明明已经约好了, 他却没有来。考察句型～のに表示逆接。")

    add_q(47, 1, "～なければならない (Bắt buộc phải làm)", "Bản báo cáo tiến độ công việc quan trọng này bắt buộc phải nộp cho cấp trên trước 5 giờ chiều mai.",
          "Cấu trúc thể hiện nghĩa vụ, quy định bắt buộc phải thi hành: 「V-なければならない」.",
          "出してもいい: Nộp cũng được (cho phép)", "出さなくてもいい: Không cần nộp", "出さなければならない: ĐÚNG - Bắt buộc phải nộp", "出すはずがない: Không thể nào nộp",
          "(12) 3 句意: 必须在明天下午5点前提交报告。考察～なければならない表示义务。")

    add_q(48, 2, "～かどうか (Liệu có... hay không)", "Tôi vẫn đang rất phân vân không biết ngày mai thời tiết có mưa hay không để còn chuẩn bị mang ô.",
          "Mẫu câu lồng câu hỏi không có từ để hỏi: 「Động từ thể thông thường + かどうか」 (liệu có hay không).",
          "降るかを: Sai trợ từ", "降るから: Vì mưa", "降るかどうか: ĐÚNG - Liệu trời có mưa hay không", "降るのに: Mặc dù mưa",
          "(13) 3 句意: 还不知道明天会不会下雨。考察句型～かどうか表示是否。")

    add_q(49, 3, "～てある (Trạng thái được bố trí sẵn)", "Bản đồ hướng dẫn sơ tán khi có động đất đã được dán sẵn ngay trên bức tường trước hành lang.",
          "Cấu trúc 「Tha động từ thể て + ある」 diễn tả trạng thái của sự vật là kết quả của một hành động đã được ai đó làm sẵn có chủ ý.",
          "貼ってある: ĐÚNG - Được dán sẵn trên tường", "貼っている: Đang dán (hành động đang xảy ra)", "貼っておく: Sẽ dán sẵn (chưa làm)", "貼られた: Bị dán",
          "(14) 1 句意: 避难指南已经贴在走廊的墙上了。考察～てある表示动作存续状态。")

    add_q(50, 4, "～てはいけない (Cấm đoán không được làm)", "Bên trong khu vực phòng trưng bày hiện vật quý của bảo tàng, du khách tuyệt đối không được chụp ảnh.",
          "Cấu trúc cấm đoán mang tính quy tắc, nội quy nghiêm ngặt: 「V-てはいけない / てはなりません」.",
          "撮ってもいい: Được phép chụp", "撮らなくてもいい: Không chụp cũng được", "撮らなければならない: Bắt buộc phải chụp", "撮ってはいけない: ĐÚNG - Cấm không được chụp ảnh",
          "(15) 4 句意: 博物馆展厅内严禁拍照。考察～てはいけない表示禁止。")

    # --- GRAMMAR: Mondai 2 - Star Questions (Q51 - Q55) ---
    add_q(51, 2, "Dấu sao: だれ (Vị trí 3)", "Không, tôi không biết đường. Hãy cùng ra nhà ga rồi hỏi thử một ai đó xem sao nhé.",
          "Trật tự câu hoàn chỉnh: いいえ、わかりません。 【3 駅で】 【1 だれ】 ★【2 か に】 【4 聞きましょう】。 Dấu sao ở vị trí thứ 3 là phương án 2 (だれかに).",
          "だれ", "か に (ĐÚNG vị trí dấu sao ★)", "駅で", "聞きましよう",
          "(16) 2 正确语序: いいえ、わかりません。 3 駅で 1 だれ ★2 か に 4 聞きましょう。")

    add_q(52, 3, "Dấu sao: 遅く (Vị trí 3)", "Dạo gần đây công việc ở công ty bận quá nên có rất nhiều ngày tôi phải về nhà muộn màng.",
          "Trật tự câu hoàn chỉnh: 最近、仕事が いそがしくて、 【1 帰る】 【4 のが】 ★【3 遅く】 【2 なる】 日が 多い。 Dấu sao ở vị trí thứ 3 là phương án 3 (遅く).",
          "帰る", "なる", "遅く (ĐÚNG vị trí dấu sao ★)", "のが",
          "(17) 3 正确语序: 最近、仕事が いそがしくて、 1 帰る 4 のが ★3 遅く 2 なる 日が 多い。")

    add_q(53, 4, "Dấu sao: 建てる (Vị trí 3)", "Để dành dụm tiền xây dựng một ngôi nhà lớn có thể sống chung cùng với bố mẹ, tôi đang rất nỗ lực tiết kiệm.",
          "Trật tự câu hoàn chỉnh: 両親と いっしょに 【3 住める】 【2 家を】 ★【4 建てる】 【1 ために】 貯金しています。 Dấu sao ở vị trí thứ 3 là phương án 4 (建てる).",
          "ために", "家を", "住める", "建てる (ĐÚNG vị trí dấu sao ★)",
          "(18) 4 正确语序: 両親と いっしょに 3 住める 2 家を ★4 建てる 1 ために 貯金しています。")

    add_q(54, 1, "Dấu sao: が (Vị trí 3)", "Ngày mai tôi bắt buộc phải ra khỏi nhà từ sáng sớm, thế nhưng tôi đang rất lo lắng không biết liệu mình có dậy sớm nổi không.",
          "Trật tự câu hoàn chỉnh: 明日は 朝早く 出かけない 【2 と】 【4 いけないのです】 ★【1 が】 【3 早起きできる】 かどうか 心配です。 Dấu sao ở vị trí thứ 3 là phương án 1 (が).",
          "が (ĐÚNG vị trí dấu sao ★)", "と", "早起きできる", "いけないのです",
          "(19) 1 正确语序: 明日は 朝早く 出かけない 2 と 4 いけないのです ★1 が 3 早起きできる かどうか 心配です。")

    add_q(55, 3, "Dấu sao: 赤くて (Vị trí 3)", "Trong bữa tiệc hôm qua, tôi đã được thưởng thức một loại trái cây hình tròn, màu đỏ tươi và có vị rất ngọt ngào.",
          "Trật tự câu hoàn chỉnh: 昨日の パーティーで 丸い 【4 形】 【2 の】 ★【3 赤くて】 【1 あまい】 くだものを 食べました。 Dấu sao ở vị trí thứ 3 là phương án 3 (赤くて).",
          "あまい", "の", "赤くて (ĐÚNG vị trí dấu sao ★)", "形",
          "(20) 3 正确语序: 昨日の パーティーで 丸い 4 形 2 の ★3 赤くて 1 あまい くだものを 食べました。")

    # --- GRAMMAR & READING: Mondai 3 (Q56 - Q60) ---
    add_q(56, 2, "くれる (Hành động người khác tặng mình)", "Bức bưu thiếp này là do anh Tanaka đã gửi tặng cho tôi nhân dịp năm mới.",
          "Khi người khác làm cho tôi (hoặc phía người nói) một điều gì đó, ta dùng động từ cho nhận 「～てくれる」.",
          "あげた: Tôi tặng bạn", "くれた: ĐÚNG - Bạn Tanaka gửi tặng cho tôi", "もらった: Cần trợ từ に", "やった: Tặng cấp dưới",
          "(21) 2 根据前后文卡片是由田中送给作者的, 需使用くれる表示他人主动给予我方。")

    add_q(57, 4, "Chủ ngữ は", "Trợ từ 「は」 đóng vai trò đưa danh từ lên làm chủ đề chính của câu văn thuyết minh.",
          "Vị trí này cần trợ từ 「は」 để nhấn mạnh chủ đề thông tin cần được miêu tả ở vế tiếp theo.",
          "Trợ từ を", "Trợ từ に", "Trợ từ で", "Trợ từ は (ĐÚNG - Nhấn mạnh chủ đề)",
          "(22) 4 说明句的主题通常使用は提示, 引导后文的阐述。")

    add_q(58, 3, "Thì quá khứ 働いた", "Việc tôi vào làm việc tại công ty thương mại đã là một sự kiện diễn ra trọn vẹn trong quá khứ.",
          "Mô tả sự kiện đã hoàn tất trong quá khứ nên bắt buộc động từ phải chia về thì quá khứ 「～た」.",
          "働く: Hiện tại tương lai", "働いている: Hiện tại tiếp diễn", "働いた: ĐÚNG - Đã làm việc (quá khứ)", "働くだろう: Phỏng đoán",
          "(23) 3 进入贸易公司工作发生在过去的既定事实, 需用过去时。")

    add_q(59, 1, "ぜひ (Nhất định thiết tha)", "Nếu trong khoảng thời gian từ ngày 27 đến 31 tháng 8 bạn rảnh rỗi, tôi nhất định rất muốn được gặp bạn.",
          "Phó từ 「ぜひ」 đi với động từ mong muốn 「～たい」 biểu thị sự tha thiết, khát khao muốn gặp mặt.",
          "ぜひ: ĐÚNG - Nhất định mong được gặp bạn", "たぶん: Có lẽ", "きっと: Chắc chắn", "なかなか: Mãi mà",
          "(24) 1 询问对方是否有空想要见面, 选项只有表示“一定”的ぜひ能表达热情期待。")

    add_q(60, 2, "Gửi kèm quà tặng mời thưởng thức", "Cùng với bức thư này, tôi có gửi kèm theo một hộp trà đặc sản của công ty, xin mời bạn thưởng thức thử nhé.",
          "Cấu trúc mời mọc lịch sự: 「飲んでみてください」 (xin bạn hãy uống thử xem sao).",
          "飲まないでください: Xin đừng uống", "飲んでみてください: ĐÚNG - Xin hãy uống thử xem sao", "飲むはずです: Chắc là sẽ uống", "飲んだことがあります: Đã từng uống",
          "(25) 2 随信寄去自己公司的茶叶, 邀请对方品尝尝试。")

    # --- READING: Mondai 4 - Short Texts (Q61 - Q64) ---
    add_q(61, 1, "Thang máy sử dụng ngày 8/7 lúc 15:30", "Theo lịch bảo trì thang máy, vào lúc 15:30 chiều ngày 8/7, thang máy số 1 là thang máy duy nhất được phép sử dụng để chuyển đồ.",
          "Đối chiếu bảng phân công lịch bảo trì: thang máy số 2 đang kiểm tra kỹ thuật lúc 15h30, chỉ có thang máy số 1 hoạt động bình thường.",
          "Thang máy số 1 (ĐÚNG)", "Thang máy số 2", "Cả hai thang máy đều dùng được", "Cả hai thang máy đều tạm dừng",
          "(26) 1 查阅电梯检修日程表, 7月8日下午3点半只有1号电梯可以搬运行李。")

    add_q(62, 1, "Đặc điểm trứng gà quán Genki", "Trứng gà của trang trại quán Genki nổi tiếng là trứng tươi mới thu hoạch trong ngày và có giá trị dinh dưỡng rất cao.",
          "Chi tiết trong bài nêu rõ: trứng được vận chuyển trực tiếp từ trang trại vào mỗi sáng sớm nên luôn đảm bảo độ tươi mới tuyệt đối.",
          "Trứng nhập khẩu từ nước ngoài", "Trứng bảo quản đông lạnh lâu ngày", "Trứng tươi mới thu hoạch từ trang trại mỗi ngày (ĐÚNG)", "Trứng đã luộc chín sẵn",
          "(27) 3 对元气蛋店的鸡蛋描述: 每天早晨直接从农场采摘送达, 保证绝对新鲜。")

    add_q(63, 1, "Cách thức bán trứng gà của quán", "Cửa hàng đóng gói trứng theo các hộp tiêu chuẩn gồm loại 6 quả và loại 10 quả để khách hàng tiện lựa chọn.",
          "Thông tin đóng gói trong bài: khách có thể chọn vỉ 6 quả (6個入り) hoặc vỉ 10 quả (10個入り).",
          "Bán lẻ từng quả một", "Đóng gói theo hộp 6 quả và 10 quả (ĐÚNG)", "Chỉ bán theo thùng 50 quả", "Bán theo cân nặng kilogram",
          "(28) 2 店铺按6枚装和10枚装的规格进行包装销售。")

    add_q(64, 2, "Nhiệm vụ của ông Yamaguchi", "Sau khi đọc xong mẩu giấy nhắn của đối tác, ông Yamaguchi cần phải liên hệ lại để xác nhận số lượng đơn đặt hàng.",
          "Nội dung lời nhắn để lại trên bàn: xin anh Yamaguchi gọi điện lại cho phía nhà cung cấp để chốt số lượng trước 17:00.",
          "Hủy bỏ hợp đồng", "Gửi tiền thanh toán ngay", "Đi gặp trực tiếp khách hàng", "Gọi điện thoại xác nhận số lượng đơn hàng trước 5h chiều (ĐÚNG)",
          "(29) 4 山口先生读完便签后必须电话联系对方确认订单数量。")

    # --- READING: Mondai 5 - Medium Passage (Q65 - Q68) ---
    add_q(65, 4, "Thể loại sách trong phong trào đọc sách", "Các cuốn sách được giới thiệu trong phong trào đọc sách mùa hè chủ yếu là sách thiếu nhi và tác phẩm văn học nhẹ nhàng.",
          "Bài viết nêu rõ: đối tượng tham gia phong trào hướng tới việc đọc các cuốn sách văn học và truyện dành cho lứa tuổi thanh thiếu niên.",
          "Sách chuyên ngành kinh tế", "Sách truyện văn học và sách thiếu nhi (ĐÚNG)", "Sách khoa học tự nhiên phức tạp", "Từ điển ngoại ngữ",
          "(30) 2 提到的读书活动, 读的是文学故事和少儿读物。")

    add_q(66, 3, "Điều kiện nhận phiếu ưu đãi 500 yên", "Để được nhận phiếu mua sắm ưu đãi trị giá 500 yên, người tham gia bắt buộc phải đọc đủ 5 cuốn sách và viết nộp 5 bài cảm nhận.",
          "Quy định chương trình ghi rất rõ ràng: cứ đọc 5 cuốn và nộp phiếu giới thiệu tóm tắt 5 cuốn thì sẽ nhận được 1 phiếu coupon 500 yên.",
          "Đọc 1 cuốn sách", "Đọc 3 cuốn sách và nộp 1 bài", "Đọc 5 cuốn sách và nộp 5 bản cảm nhận (ĐÚNG)", "Đọc 10 cuốn sách",
          "(31) 3 获得500日元优惠券的条件: 读满5本书并提交5份读后推荐卡。")

    add_q(67, 2, "Lý do xem đây là một phương pháp hay", "Tác giả đánh giá cao hoạt động này vì nó tạo được động lực mạnh mẽ thúc đẩy các bạn trẻ hình thành thói quen say mê đọc sách.",
          "Bài viết phân tích: việc nhận được phần thưởng khích lệ sẽ giúp mọi người hào hứng hơn với việc mở sách ra đọc mỗi ngày.",
          "Tạo động lực hứng thú giúp duy trì thói quen đọc sách (ĐÚNG)", "Giúp hiệu sách bán được nhiều sách ế", "Tiết kiệm tiền bạc", "Không phải làm bài tập hè",
          "(32) 1 认为是个好方法的原因: 能有效激发和培养长期阅读的兴趣。")

    add_q(68, 4, "Ý nghĩa của cụm từ 'có thể làm được'", "Cụm từ trong bài ám chỉ việc mọi người thông qua các bài viết giới thiệu có thể chia sẻ niềm vui đọc sách cho nhiều bạn bè khác.",
          "Liên hệ ngữ cảnh câu: từ những mẩu cảm nhận dán trên bảng tin, độc giả khác có thể tìm thấy những cuốn sách hay phù hợp với mình.",
          "Có thể kiếm được nhiều tiền", "Có thể đi du lịch miễn phí", "Có thể trở thành nhà văn", "Có thể chia sẻ và lan tỏa niềm vui đọc sách tới mọi người (ĐÚNG)",
          "(33) 4 指通过读后感能够向更多人传递分享阅读的乐趣。")

    # --- READING: Mondai 6 - Information Retrieval (Q69 - Q70) ---
    add_q(69, 3, "Lựa chọn thực đơn của Emi (Set C)", "Emi muốn ăn món cà ri kèm salad rau tươi và sau bữa ăn có thêm cà phê tráng miệng, nên Set C là set ăn phù hợp nhất.",
          "Tra cứu bảng thực đơn nhà hàng: Set C bao gồm trọn gói: Cà ri (カレー), Salad (サラダ) và Cà phê (コーヒー).",
          "Set A (Thiếu cà phê)", "Set B (Thiếu salad)", "Set C (ĐÚNG - Đầy đủ cà ri, salad và cà phê)", "Set D (Không có món cà ri)",
          "(34) 3 惠美想吃咖喱和沙拉并喝咖啡, 符合要求的套餐是C套餐。")

    add_q(70, 3, "Lựa chọn cho người muốn ăn cà ri gà", "Đối với khách hàng có mong muốn thưởng thức món cà ri gà (チキンカレー), có tổng cộng 2 set thực đơn có món này.",
          "Dò tìm trong bảng thực đơn: món gà (チキン) chỉ xuất hiện trong 2 lựa chọn là Cà ri gà tiêu chuẩn và Cà ri gà đặc biệt.",
          "Có 1 set", "Có 2 set thực đơn phù hợp (ĐÚNG)", "Có 3 set", "Có 4 set",
          "(35) 2 想吃鸡肉咖喱的人共有2种菜单可选。")

    # --- LISTENING: Mondai 1 - Task-based Comprehension (Q71 - Q78) ---
    add_q(71, 3, "Nhiệm vụ chuẩn bị phòng họp", "Người nam trước tiên sẽ đi photo in ấn 10 bộ tài liệu họp trước khi kê lại bàn ghế.",
          "Trưởng nhóm nhắc nhở tài liệu quan trọng cần in trước để phát tay, sau đó mới dọn dẹp phòng.",
          "Kê bàn ghế trước", "Pha trà phục vụ", "Đi photo in 10 bộ tài liệu phát tay trước (ĐÚNG)", "Bật máy chiếu",
          "聴解 1 (1): 男の人はまず何をしますか。 正解: [3]",
          "女：会議室の準備だけど、まず資料を10部コピーしてきてくれる？そのあと机を並べよう。\n男：はい、わかりました。",
          "Nữ: Chuẩn bị phòng họp nhé, trước tiên em đi photo giúp chị 10 bộ tài liệu được không? Sau đó tụi mình kê bàn ghế nhé.\nNam: Vâng, em đi làm ngay ạ.")

    add_q(72, 3, "Địa điểm tập trung chuyến dã ngoại", "Cả lớp thống nhất địa điểm tập trung vào sáng chủ nhật là trước cổng soát vé phía Bắc nhà ga.",
          "Bạn nữ lưu ý cổng Nam đang sửa chữa đông đúc, nên đổi địa điểm hẹn sang cổng Bắc (北口改札前).",
          "Trước cổng soát vé phía Bắc (北口) (ĐÚNG)", "Trước cổng phía Nam", "Tại sân ga số 2", "Tại quán cà phê đối diện ga",
          "聴解 1 (2): 二人はどこで待ち合わせをしますか。 正解: [1]",
          "女：南口は混んでいるから、北口の改札の前にしない？\n男：いいね、そうしよう。",
          "Nữ: Cổng Nam đông lắm, mình hẹn nhau ở trước cổng soát vé phía Bắc nhé?\nNam: Được đấy, hẹn ở đó nhé.")

    add_q(73, 1, "Món đồ cần nộp vào ngày mai", "Học sinh ngày mai bắt buộc phải nộp bản đăng ký tham gia hoạt động dã ngoại có chữ ký phụ huynh.",
          "Thầy giáo dặn tiền dã ngoại tuần sau mới thu, bài thu hoạch nộp sau, ngày mai hạn chót nộp phiếu đăng ký có chữ ký bố mẹ.",
          "Tiền kinh phí dã ngoại", "Ảnh chụp kỷ yếu", "Bài tập hè", "Phiếu đăng ký tham gia có chữ ký của phụ huynh (ĐÚNG)",
          "聴解 1 (3): 学生は明日何を出さなければなりませんか。 正解: [4]",
          "先生：お金は来週でいいですが、保護者のサインをもらった申込書は明日必ず出してください。",
          "Thầy giáo: Tiền tuần sau nộp cũng được, nhưng đơn đăng ký có chữ ký của phụ huynh thì ngày mai các em nhất định phải nộp nhé.")

    add_q(74, 1, "Hành động tiếp theo của bạn nữ", "Bạn nữ sẽ trực tiếp gọi điện thoại cho giáo viên chủ nhiệm để xin phép nghỉ học do ốm.",
          "Bạn nam khuyên không nên nhờ bạn nhắn miệng mà hãy gọi điện thoại trực tiếp thông báo cho cô giáo an tâm.",
          "Nhờ bạn vào lớp xin phép hộ", "Tự mình gọi điện thoại trực tiếp báo cô giáo (ĐÚNG)", "Gửi email cho trường", "Đến phòng y tế trường",
          "聴解 1 (4): 女の学生はこれから何をしますか。 正解: [2]",
          "男：先生には自分で電話したほうがいいよ。\n女：そうだね、今すぐ電話してみる。",
          "Nam: Em nên tự mình gọi điện cho cô giáo thì tốt hơn đấy.\nNữ: Ừ đúng rồi, để mình gọi điện cho cô ngay.")

    add_q(75, 4, "Món quà bạn nam chọn mua", "Bạn nam quyết định chọn mua chiếc khăn quàng cổ màu xanh ấm áp làm quà tặng sinh nhật mẹ.",
          "Sau khi cân nhắc giữa găng tay và khăn quàng cổ, bạn nam thấy mùa đông lạnh nên mua khăn quàng cổ xanh mẹ rất thích.",
          "Đôi găng tay da", "Chiếc khăn quàng cổ màu xanh (ĐÚNG)", "Chiếc áo len mùa đông", "Bó hoa tươi",
          "聴解 1 (5): 男の人はお母さんに何を買いますか。 正解: [2]",
          "男：母は青色が好きだから、この青いマフラーにするよ。\n女：お母さん、きっと喜ぶね。",
          "Nam: Mẹ mình thích màu xanh da trời, nên mình sẽ chọn chiếc khăn quàng cổ màu xanh này.\nNữ: Mẹ cậu chắc chắn sẽ vui lắm đấy.")

    add_q(76, 3, "Cách đi đến bảo tàng mỹ thuật", "Hai người quyết định sẽ đi bộ ra bến xe buýt trước ga và bắt chuyến xe buýt số 3 đi thẳng tới cổng bảo tàng.",
          "Đi taxi quá đắt, đi tàu điện ngầm phải đi bộ xa, xe buýt số 3 đỗ ngay trước cổng nên hai người chọn đi xe buýt.",
          "Đi taxi", "Đi tàu điện ngầm", "Bắt chuyến xe buýt số 3 đi thẳng (ĐÚNG)", "Mượn xe đạp đi",
          "聴解 1 (6): 二人は美術館へどうやって行きますか。 正解: [3]",
          "女：バスなら美術館の真ん前で止まるから便利だよ。\n男：じゃあ、バスで行こう。",
          "Nữ: Đi xe buýt thì xe dừng đỗ ngay trước cổng bảo tàng luôn, tiện lắm.\nNam: Vậy tụi mình đi xe buýt nhé.")

    add_q(77, 3, "Công việc người phụ nữ làm ngay bây giờ", "Người phụ nữ sẽ lập tức gọi điện thoại xác nhận lại giờ hạ cánh của đoàn khách đối tác.",
          "Để chuẩn bị xe đón đúng giờ, việc cấp bách trước mắt là gọi điện kiểm tra giờ chuyến bay đáp xuống sân bay.",
          "Gọi điện thoại kiểm tra giờ hạ cánh chuyến bay (ĐÚNG)", "Lái xe ra sân bay ngay", "In bảng tên đón khách", "Đặt phòng khách sạn",
          "聴解 1 (7): 女の人はまず何をしますか。 正解: [1]",
          "男：飛行機が遅れているかもしれないから、まず空港に電話して確認してくれる？\n女：はい、すぐ確認します。",
          "Nam: Có thể máy bay đang bị trễ chuyến, em gọi điện kiểm tra trước với sân bay được không?\nNữ: Vâng, em kiểm tra ngay ạ.")

    add_q(78, 1, "Địa điểm kiểm tra thông tin thời khóa biểu", "Bạn sinh viên cần lên trang web của trường đại học để xem bảng thời khóa biểu lớp học mới cập nhật.",
          "Bảng thông báo ở sảnh đã gỡ xuống để sửa đổi, cô văn phòng bảo học sinh tra cứu bản chuẩn nhất trên trang web khoa.",
          "Hỏi trực tiếp thầy cô giảng đường", "Đến phòng giáo vụ trường", "Xem bảng tin dán ở hành lang", "Tra cứu trên trang web chính thức của trường (ĐÚNG)",
          "聴解 1 (8): 学生はどこで時間割を見ますか。 正解: [4]",
          "女：最新の時間割は学校のホームページに載っていますから、そちらを見てくださいね。\n男：はい、わかりました。",
          "Nữ: Thời khóa biểu mới nhất đã đăng tải trên trang chủ của trường, em vào đó xem nhé.\nNam: Vâng, em hiểu rồi ạ.")

    # --- LISTENING: Mondai 2 - Key Points (Q79 - Q85) ---
    add_q(79, 2, "Lý do bạn nữ thích công việc làm thêm ở tiệm bánh", "Bạn nữ thích làm việc ở đây vì được học hỏi rất nhiều công thức làm bánh ngọt từ những người thợ làm bánh chuyên nghiệp.",
          "Dù lương không quá cao nhưng bạn nữ rất hào hứng vì được học nghề làm bánh từ các tiền bối tay nghề giỏi.",
          "Được học nghề làm bánh từ thợ chuyên nghiệp (ĐÚNG)", "Mức lương làm thêm rất cao", "Cửa hàng rất gần nhà", "Được ăn bánh miễn phí thoải mái",
          "聴解 2 (1): 女の人はどうしてこのアルバイトが好きだと言っていますか。 正解: [1]",
          "女：プロのケーキ職人さんから直接いろんな作り方を教えてもらえるのが一番楽しいの。",
          "Nữ: Được các nghệ nhân làm bánh ngọt chuyên nghiệp trực tiếp chỉ dạy cho đủ mọi công thức là điều mình thấy vui nhất.")

    add_q(80, 2, "Điểm nổi bật của chiếc máy ảnh mới mua", "Chiếc máy ảnh có khả năng chụp ảnh vô cùng sắc nét ngay cả trong điều kiện đêm tối thiếu ánh sáng.",
          "Bạn nam giải thích điểm ưng ý nhất là máy có cảm biến cao cấp, chụp cảnh đêm không hề bị nhòe hay nhiễu hạt.",
          "Máy ảnh có màu sắc bắt mắt", "Máy ảnh giá rẻ bất ngờ", "Máy ảnh có trọng lượng rất nhẹ", "Chụp ảnh ban đêm cực kỳ rõ nét và đẹp mắt (ĐÚNG)",
          "聴解 2 (2): 新しいカメラのどこが一番いいと言っていますか。 正解: [4]",
          "男：夜の暗いところでも、フラッシュなしですごく綺麗に撮れるところが気に入っているんだ。",
          "Nam: Dù ở nơi tối tăm vào ban đêm, không cần đèn flash mà máy vẫn chụp được cực kỳ đẹp và sắc nét, đó là điểm tớ thích nhất.")

    add_q(81, 2, "Lý do bạn nam đến muộn buổi hẹn", "Bạn nam đến trễ là vì tuyến tàu điện ngầm gặp sự cố mất điện đột ngột nên đoàn tàu phải dừng giữa đường.",
          "Bạn nam xin lỗi rối rít và giải thích tàu bị dừng khẩn cấp do sự cố mất điện ở nhà ga trước.",
          "Ngủ quên không nghe chuông báo thức", "Tàu điện gặp sự cố mất điện phải dừng giữa chừng (ĐÚNG)", "Bị kẹt xe buýt", "Quên mất giờ hẹn",
          "聴解 2 (3): 男の人はどうして遅刻しましたか。 正解: [2]",
          "男：ごめん！乗っていた電車が停電で途中で20分も止まっちゃって…",
          "Nam: Xin lỗi cậu nhé! Chuyến tàu tớ đi bị mất điện đột ngột nên phải dừng khựng giữa đường tận 20 phút...")

    add_q(82, 1, "Kế hoạch kỳ nghỉ hè của cô giáo", "Kỳ nghỉ hè này cô giáo dự định sẽ về thăm quê hương thăm ông bà và dành thời gian nghỉ ngơi thư giãn ở suối nước nóng.",
          "Cô chia sẻ lâu rồi không về quê nên sẽ về thăm quê nhà và cùng cả gia đình đi tắm Onsen thư giãn.",
          "Đi du lịch nước ngoài", "Tham gia khóa học nâng cao", "Về quê thăm ông bà và đi suối nước nóng nghỉ dưỡng (ĐÚNG)", "Ở lại trường nghiên cứu sách",
          "聴解 2 (4): 先生は夏休みに何をしますか。 正解: [3]",
          "女：田舎に帰って祖父母に会って、久しぶりに温泉にでも行こうと思っているのよ。",
          "Nữ: Cô định về quê thăm ông bà, rồi nhân tiện cả nhà cùng đi tắm suối nước nóng nghỉ dưỡng một chuyến.")

    add_q(83, 3, "Món ăn nổi tiếng nhất của nhà hàng", "Món ăn được đông đảo thực khách ưa chuộng và nổi tiếng nhất của quán là món mì Ramen nước hầm xương đậm đà.",
          "Nhân viên phục vụ giới thiệu món mì Ramen truyền thống hầm xương heo suốt 12 tiếng là món 'cháy hàng' nhất quán.",
          "Mì Ramen truyền thống nước hầm xương đậm đà (ĐÚNG)", "Món cơm chiên hải sản", "Món sủi cảo gyoza nướng", "Món lẩu bò",
          "聴解 2 (5): この店の人気メニューは何ですか。 正解: [1]",
          "店員：当店で一番人気があるのは、12時間煮込んだこちらの特製豚骨ラーメンです。",
          "Nhân viên: Món được khách hàng yêu thích và gọi nhiều nhất tại quán em là món mì Ramen Tonkotsu đặc chế hầm suốt 12 tiếng này ạ.")

    add_q(84, 3, "Điều bạn nữ khuyên bạn nam khi học Kanji", "Bạn nữ khuyên bạn nam thay vì chỉ viết lặp lại hãy cố gắng vừa viết vừa phát âm và đặt câu thực tế.",
          "Bí quyết học Kanji được chia sẻ: hãy liên tưởng chữ Hán vào trong câu văn cụ thể có ý nghĩa để nhớ được lâu bền.",
          "Học thuộc lòng cả cuốn từ điển", "Liên tưởng chữ Hán vào văn cảnh và đặt câu thực tế (ĐÚNG)", "Chỉ học qua ứng dụng trên điện thoại", "Mỗi ngày chép phạt 100 lần",
          "聴解 2 (6): 女の人は漢字をどうやって覚えるのがいいと言っていますか。 正解: [2]",
          "女：単語だけで覚えるより、例文を作って声に出しながら書くのが一番身につくよ。",
          "Nữ: Thay vì chỉ học từ vựng riêng lẻ, cậu vừa đặt câu ví dụ vừa đọc to lên rồi viết thì sẽ nhớ sâu nhất đấy.")

    add_q(85, 4, "Tại sao thư viện lại thông báo tạm dừng hoạt động cuối tuần", "Thư viện tạm đóng cửa cuối tuần để tiến hành kiểm kê tổng thể toàn bộ đầu sách và nâng cấp hệ thống phần mềm tra cứu.",
          "Loa phát thanh thư viện thông báo đóng cửa 2 ngày cuối tuần phục vụ công tác kiểm kê định kỳ hàng năm và bảo trì máy chủ.",
          "Thư viện bị ngập nước", "Tổ chức ngày hội đọc sách", "Thầy cô giáo đi vắng", "Kiểm kê định kỳ toàn bộ sách và bảo trì hệ thống phần mềm (ĐÚNG)",
          "聴解 2 (7): 図書館はなぜ今週末休みですか。 正解: [4]",
          "アナウンス：蔵書の一斉点検とシステム更新のため、今週末は休館とさせていただきます。",
          "Phát thanh: Do công tác kiểm kê đồng loạt các đầu sách và nâng cấp hệ thống dữ liệu, thư viện xin phép tạm ngừng phục vụ vào cuối tuần này.")

    # --- LISTENING: Mondai 3 - Utterance Expressions (Q86 - Q90) ---
    add_q(86, 2, "Xin phép mượn chiếc kéo", "Muốn mượn cây kéo của bạn cùng bàn để cắt giấy thủ công: 'Xin lỗi, bạn cho mình mượn cây kéo một lát được không?'",
          "Mẫu câu chuẩn nhờ mượn đồ dùng: 「ちょっとハサミを貸してもらえますか。」",
          "Kéo của bạn bén ghê nhỉ", "Bạn cho mình mượn cây kéo một chút được không? (ĐÚNG)", "Mình đưa kéo cho bạn nhé", "Kéo này cắt được giấy không?",
          "聴解 3 (1): ハサミを借りたいです。何と言いますか。 正解: [2]",
          "「ちょっとハサミを貸してもらえますか。」",
          "Bạn cho mình mượn cây kéo một chút được không ạ?")

    add_q(87, 2, "Chào khi khách bước vào cửa hàng", "Khách bước chân vào quán ăn, nhân viên đon đả cất lời chào đón khách nồng hậu: 'Kính chào quý khách!'",
          "Lời chào tiêu chuẩn ngành dịch vụ Nhật: 「いらっしゃいませ！」",
          "Kính chào quý khách! (ĐÚNG)", "Cảm ơn quý khách đã ghé thăm", "Quý khách đi thong thả nhé", "Xin mời quý khách ngồi đằng kia",
          "聴解 3 (2): 店に客が入ってきました。何と言いますか。 正解: [1]",
          "「いらっしゃいませ！」",
          "Kính chào quý khách ạ!")

    add_q(88, 1, "Hỏi đường đến bưu điện gần nhất", "Muốn hỏi người đi đường đường tới bưu điện: 'Xin lỗi, cho tôi hỏi đường đi đến bưu điện đi như thế nào ạ?'",
          "Câu hỏi đường lịch sự: 「すみません、郵便局へはどう行けばいいですか。」",
          "Bưu điện nằm ở đâu thế bạn?", "Bưu điện mở cửa lúc mấy giờ?", "Xin lỗi, cho tôi hỏi đường đi đến bưu điện đi như thế nào ạ? (ĐÚNG)", "Bưu điện có xa không?",
          "聴解 3 (3): 郵便局への行き方が知りたいです。何と言いますか。 正解: [3]",
          "「すみません、郵便局へはどう行けばいいですか。」",
          "Xin lỗi, cho tôi hỏi đến bưu điện thì đi đường nào ạ?")

    add_q(89, 3, "Đề nghị giúp đỡ người đang mang vác đồ nặng", "Thấy cụ già mang túi đồ rất nặng đi lên bậc thang bộ: 'Bác ơi, để cháu xách giúp bác một tay nhé?'",
          "Đề nghị giúp đỡ lịch sự: 「荷物を持ちましょうか。」",
          "Đồ nặng thế hả bác?", "Bác để cháu xách giúp một tay nhé? (ĐÚNG)", "Bác đừng mang đồ nặng nhé", "Bác có cần xe đẩy không?",
          "聴解 3 (4): 重い荷物を持っている人を手伝いたいです。何と言いますか。 正解: [2]",
          "「荷物を持ちましょうか。」",
          "Để cháu xách giúp bác chiếc túi nhé ạ?")

    add_q(90, 2, "Rời khỏi chỗ ngồi trước trong bữa tiệc", "Có việc bận đột xuất phải rời khỏi buổi tiệc sớm hơn mọi người: 'Tôi xin lỗi, tôi xin phép về trước ạ.'",
          "Lời xin phép rời tiệc lịch sự: 「お先に失礼します。」",
          "Tôi xin phép về trước ạ (ĐÚNG)", "Mọi người về vui vẻ nhé", "Tôi no rồi cảm ơn", "Hẹn gặp lại tuần sau",
          "聴解 3 (5): パーティーの途中で先に帰ります。何と言いますか。 正解: [1]",
          "「お先に失礼します。」",
          "Tôi xin phép ra về trước mọi người ạ.")

    # --- LISTENING: Mondai 4 - Quick Response (Q91 - Q98) ---
    add_q(91, 3, "Rủ rê: 'Cuối tuần này cùng đi xem phim điện ảnh nhé?'", "Hào hứng nhận lời rủ đi chơi: 'Hay quá, nhất định mình cùng đi nhé!'",
          "Nhận lời rủ rê nhiệt tình: 「いいですね、ぜひ行きましょう！」",
          "Phim đó không hay đâu", "Tôi không thích xem phim rạp", "Hay quá, nhất định chúng mình cùng đi nhé! (ĐÚNG)", "Tôi xem tuần trước rồi",
          "聴解 4 (1): 今週末、一緒に映画を見に行きませんか。 正解: [3]",
          "男：今週末、一緒に映画を見に行きませんか。\n女：いいですね、ぜひ行きましょう！",
          "Nam: Cuối tuần này cậu có muốn cùng tớ đi xem phim điện ảnh không?\nNữ: Ý hay quá, nhất định tụi mình cùng đi nhé!")

    add_q(92, 3, "Hỏi mượn tài liệu: 'Cho mình xem tập ghi chép bài học này một lát nhé?'", "Sẵn lòng cho bạn mượn tập vở ghi: 'Được chứ, đây bạn cầm lấy này.'",
          "Đồng ý cho mượn đồ: 「ええ、どうぞ。」",
          "Được chứ, xin mời bạn (ĐÚNG)", "Tôi không có ở đây", "Cái này đắt tiền lắm đấy", "Bạn trả lại cho tôi rồi mà",
          "聴解 4 (2): このノート、ちょっと見せてもらってもいい？ 正解: [1]",
          "女：このノート、ちょっと見せてもらってもいい？\n男：ええ、どうぞ。",
          "Nữ: Cậu cho tớ xem nhờ quyển vở ghi này một chút được không?\nNam: Ừ được chứ, cậu cứ xem đi.")

    add_q(93, 2, "Hỏi thăm: 'Hôm nay trời lạnh thật đấy nhỉ!'", "Đồng tình chia sẻ cảm nhận thời tiết: 'Đúng thế thật, lạnh buốt thấu xương luôn ấy.'",
          "Đồng thuận cảm nhận: 「ええ、本当に寒いですね。」",
          "Không hề lạnh chút nào", "Vâng đúng thế thật, rét quá bạn nhỉ (ĐÚNG)", "Ngày mai trời sẽ nắng", "Tôi thích mùa đông",
          "聴解 4 (3): 今日は本当に寒いですね。 正解: [2]",
          "男：今日は本当に寒いですね。\n女：ええ、本当に寒いですね。",
          "Nam: Hôm nay trời rét buốt thật đấy cậu nhỉ!\nNữ: Vâng đúng thế thật, lạnh cóng luôn ấy cậu.")

    add_q(94, 3, "Hỏi han: 'Bạn đã ăn thử món bánh này lần nào chưa?'", "Trả lời trải nghiệm ẩm thực: 'Chưa, đây là lần đầu tiên tôi được ăn thử món này đấy.'",
          "Diễn đạt trải nghiệm lần đầu: 「いいえ、食べるのは初めてです。」",
          "Tôi ăn no rồi", "Món này nấu khó lắm", "Chưa ạ, đây là lần đầu tiên tôi được thưởng thức món này đấy (ĐÚNG)", "Tôi không biết ai làm",
          "聴解 4 (4): このお菓子、もう食べたことがありますか。 正解: [3]",
          "女：このお菓子、もう食べたことがありますか。\n男：いいえ、食べるのは初めてです。",
          "Nữ: Món bánh này cậu đã từng được ăn thử lần nào chưa?\nNam: Dạ chưa, đây là lần đầu tiên tớ được ăn thử đấy.")

    add_q(95, 1, "Cảm ơn: 'Hôm nay cảm ơn bạn rất nhiều vì đã giúp đỡ mình nhé!'", "Đáp lại lời cảm ơn nhã nhặn: 'Không có chi đâu, bạn đừng bận tâm nhé.'",
          "Đáp từ khi được cảm ơn: 「いいえ、どういたしまして。」",
          "Không có gì đâu bạn ơi, đừng khách sáo nhé (ĐÚNG)", "Cảm ơn bạn rất nhiều", "Lần sau nhớ trả ơn nhé", "Tôi không giúp được gì nhiều",
          "聴解 4 (5): 今日はいろいろ手伝ってくれて、ありがとう。 正解: [1]",
          "男：今日はいろいろ手伝ってくれて、ありがとう。\n女：いいえ、どういたしまして。",
          "Nam: Hôm nay cậu giúp đỡ tớ nhiều việc quá, cảm ơn cậu nhiều nhé!\nNữ: Không có gì đâu cậu ơi, có chi đâu mà khách sáo.")

    add_q(96, 1, "Hỏi ý kiến: 'Chiếc cà vạt này trông có hợp với tớ không?'", "Khen ngợi chân thành: 'Hợp lắm luôn, màu sắc trông rất nhã nhặn và đẹp mắt!'",
          "Khen ngợi vẻ ngoài: 「とてもよく似合っていますよ。」",
          "Cái đó dài quá", "Rất là hợp với cậu luôn đấy, đẹp lắm! (ĐÚNG)", "Cậu mua bao nhiêu tiền thế?", "Đừng đeo cái đó",
          "聴解 4 (6): このネクタイ、私に似合いますか。 正解: [2]",
          "男：このネクタイ、私に似合いますか。\n女：ええ、とてもよく似合っていますよ。",
          "Nam: Chiếc cà vạt này cậu thấy có hợp với tớ không?\nNữ: Vâng, trông rất hợp với anh luôn đấy ạ, đẹp lắm!")

    add_q(97, 2, "Mời trà: 'Bạn uống thêm một tách cà phê nữa nhé?'", "Từ chối lịch sự khi đã dùng đủ: 'Cảm ơn bạn, mình đã uống đủ rồi ạ.'",
          "Từ chối lời mời lịch thiệp: 「あ、もう十分いただきました。」",
          "Cà phê đắng quá", "Tôi không thích đồ ngọt", "A cảm ơn bạn, mình đã uống no và đủ rồi nhé (ĐÚNG)", "Pha cho tôi ly to nhé",
          "聴解 4 (7): コーヒーのおかわりはいかがですか。 正解: [3]",
          "女：コーヒーのおかわりはいかがですか。\n男：あ、もう十分いただきました。ありがとうございます。",
          "Nữ: Cậu có muốn dùng thêm một tách cà phê nữa không?\nNam: A cảm ơn cậu nhiều nhé, tớ đã uống đủ rồi ạ.")

    add_q(98, 1, "Hỏi thăm tiến độ: 'Bản thảo bài báo cáo của bạn đã viết xong xuôi chưa?'", "Báo cáo tiến độ chuẩn bị: 'Gần xong rồi ạ, chỉ còn đọc soát lại một chút nữa thôi.'",
          "Cập nhật trạng thái sắp xong: 「あと少しで書き終わります。」",
          "Còn một chút xíu nữa là mình viết xong xuôi rồi (ĐÚNG)", "Tôi chưa viết chữ nào", "Báo cáo nộp tuần trước rồi mà", "Thầy giáo chưa chấm bài",
          "聴解 4 (8): レポートはもう書き終わりましたか。 正解: [1]",
          "男：レポートはもう書き終わりましたか。\n女：あと少しで書き終わります。",
          "Nam: Bài báo cáo của cậu đã viết xong xuôi hết chưa?\nNữ: Còn một chút xíu nữa là xong rồi cậu ạ.")

    return questions
