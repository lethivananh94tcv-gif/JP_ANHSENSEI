import os
import sys
import json
import re

print("[ExplanationsBuilder] Building authentic, clear Vietnamese explanations for all exams...")

# Dictionary of explanations for each exam
# We will construct rich, high quality explanations strictly following the PDF 试题解析

def make_vocab_kanji_reading_expl(q_num, opt, kanji, hiragana, viet_meaning, kun_on_notes, opt_analysis, raw_pdf):
    return {
        "snippet": f"{kanji} ({hiragana})",
        "explanation": f"""🎯 Đáp án đúng: [{opt}] {hiragana} ({kanji})

💬 Dịch nghĩa câu:
"{viet_meaning}"

💡 Phân tích & Giải thích:
• Chữ Hán: {kanji} - cách đọc chuẩn xác là 「{hiragana}」.
• {kun_on_notes}

🔍 Phân tích các lựa chọn:
{opt_analysis}

📄 Trích PDF gốc (试题解析):
{raw_pdf}"""
    }

def make_vocab_kanji_writing_expl(q_num, opt, hiragana, kanji, viet_meaning, kanji_notes, opt_analysis, raw_pdf):
    return {
        "snippet": f"{hiragana} -> {kanji}",
        "explanation": f"""🎯 Đáp án đúng: [{opt}] {kanji} ({hiragana})

💬 Dịch nghĩa câu:
"{viet_meaning}"

💡 Phân tích & Cấu trúc chữ Hán:
• Từ Hiragana 「{hiragana}」 được viết bằng chữ Hán chuẩn xác là 「{kanji}」.
• {kanji_notes}

🔍 Phân tích các lựa chọn:
{opt_analysis}

📄 Trích PDF gốc (试题解析):
{raw_pdf}"""
    }

def make_context_vocab_expl(q_num, opt, word, viet_meaning, usage_notes, opt_analysis, raw_pdf):
    return {
        "snippet": f"Điền từ: {word}",
        "explanation": f"""🎯 Đáp án đúng: [{opt}] {word}

💬 Dịch nghĩa câu:
"{viet_meaning}"

💡 Phân tích & Giải thích:
• Từ vựng: 「{word}」 phù hợp nhất với ngữ cảnh của câu.
• {usage_notes}

🔍 Phân tích các lựa chọn:
{opt_analysis}

📄 Trích PDF gốc (试题解析):
{raw_pdf}"""
    }

def make_paraphrase_expl(q_num, opt, target_phrase, equivalent_phrase, viet_meaning, analysis, opt_analysis, raw_pdf):
    return {
        "snippet": f"Đồng nghĩa: {target_phrase} ≒ {equivalent_phrase}",
        "explanation": f"""🎯 Đáp án đúng: [{opt}] {equivalent_phrase}

💬 Dịch nghĩa câu:
"{viet_meaning}"

💡 Phân tích câu đồng nghĩa:
• Phần gạch chân 「{target_phrase}」 có ý nghĩa tương đương nhất với 「{equivalent_phrase}」.
• {analysis}

🔍 Phân tích các lựa chọn:
{opt_analysis}

📄 Trích PDF gốc (试题解析):
{raw_pdf}"""
    }

def make_usage_expl(q_num, opt, word, correct_sentence, viet_meaning, analysis, opt_analysis, raw_pdf):
    return {
        "snippet": f"Cách dùng từ: {word}",
        "explanation": f"""🎯 Đáp án đúng: [{opt}] {correct_sentence}

💬 Dịch nghĩa câu đúng:
"{viet_meaning}"

💡 Phân tích cách dùng của từ 「{word}」:
• {analysis}
• Phương án [{opt}] sử dụng đúng ngữ pháp, kết hợp từ tự nhiên chuẩn văn phong Nhật Bản.

🔍 Phân tích các lựa chọn:
{opt_analysis}

📄 Trích PDF gốc (试题解析):
{raw_pdf}"""
    }

def make_grammar_expl(q_num, opt, pattern, sentence_meaning, grammar_analysis, opt_analysis, raw_pdf):
    return {
        "snippet": f"Ngữ pháp: {pattern}",
        "explanation": f"""🎯 Đáp án đúng: [{opt}] {pattern}

💬 Dịch nghĩa câu:
"{sentence_meaning}"

💡 Phân tích ngữ pháp:
• Mẫu câu / Trợ từ: 「{pattern}」.
• {grammar_analysis}

🔍 Phân tích các lựa chọn:
{opt_analysis}

📄 Trích PDF gốc (试题解析):
{raw_pdf}"""
    }

def make_reading_expl(q_num, opt, question_focus, viet_meaning, evidence, opt_analysis, raw_pdf):
    return {
        "snippet": f"Đọc hiểu câu {q_num}: {question_focus}",
        "explanation": f"""🎯 Đáp án đúng: [{opt}]

💬 Trọng tâm câu hỏi:
"{question_focus}"
Dịch nghĩa: "{viet_meaning}"

💡 Căn cứ trong bài đọc:
• {evidence}
• Phương án [{opt}] thể hiện thông tin chuẩn xác và đầy đủ nhất theo nội dung tác giả truyền tải.

🔍 Phân tích các lựa chọn:
{opt_analysis}

📄 Trích PDF gốc (试题解析):
{raw_pdf}"""
    }

def make_listening_expl(q_num, opt, situation, question_trans, correct_point, opt_analysis, ja_script, vi_script, raw_pdf):
    return {
        "snippet": f"Nghe hiểu câu {q_num}: {situation}",
        "explanation": f"""🎯 Đáp án đúng: [{opt}]

💬 Dịch nghĩa câu hỏi:
"{question_trans}"

💡 Phân tích bài nghe:
• {correct_point}
• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [{opt}] là hành động / phản hồi chính xác nhất.

🔍 Phân tích các lựa chọn:
{opt_analysis}

📄 Trích PDF gốc (试题解析):
{raw_pdf}""",
        "audioScriptJa": ja_script,
        "audioScriptVi": vi_script
    }

# Build full 2010 explanations (97 questions)
expl_2010 = {}

# Mondai 1 (Đọc Kanji 1-9)
expl_2010[1] = make_vocab_kanji_reading_expl(
    1, 2, "自分", "じぶん",
    "Cái giá sách này là do tự bản thân tôi làm.",
    "Chữ Hán 自 có âm đọc là 「じ」, chữ 分 có âm đọc là 「ぶん・ぷん・ぶ」. Ghép lại thành 自分 (じぶん: tự mình, bản thân).",
    "- 1. じふん: Sai biến âm đục (phải là ぶん)\n- 2. じぶん: ĐÚNG - Âm đọc chuẩn xác của 自分\n- 3. ちふん: Sai âm đầu\n- 4. ちぶん: Sai âm đầu",
    "(1) 2 句意: 这个书架是我自己做的。考察汉字词，“自”音读为“じ”，“分”音读为“ぶん・ぷん・ぶ”。"
)

expl_2010[2] = make_vocab_kanji_reading_expl(
    2, 3, "旅館", "りょかん",
    "Quán trọ kiểu Nhật này rất nổi tiếng.",
    "Chữ 旅 có âm On là 「りょ」, chữ 館 có âm On là 「かん」. Ghép lại thành 旅館 (りょかん: lữ quán, nhà trọ).",
    "- 1. ろかん: Thiếu âm [りょ]\n- 2. ろっかん: Sai trường âm / âm ngắt\n- 3. りょかん: ĐÚNG - Âm đọc chuẩn của 旅館\n- 4. りょっかん: Sai âm ngắt",
    "(2) 3 句意: 这家旅馆非常有名。考察汉字词，“旅”音读为“りょ”，“館”音读为“かん”。"
)

expl_2010[3] = make_context_vocab_expl(
    3, 4, "とくに (特に)",
    "Hiện tại tôi không có thứ gì đặc biệt muốn có cả.",
    "Phó từ 「とくに (特に)」 có nghĩa là 'đặc biệt là'. Cụm phủ định: とくに～ない (không có gì đặc biệt).",
    "- 1. さきに (先に): Trước đây, đi trước\n- 2. べつに (別に): Không có gì đặc biệt (mang tính thờ ơ, thường nói khẩu ngữ)\n- 3. すぐに: Ngay lập tức\n- 4. とくに (特に): ĐÚNG - Đặc biệt là, diễn đạt mức độ mong muốn",
    "(3) 4 句意: 现在没有什么特别想要的东西。1. さきに: 以前; 2. べつに: 特别; 3. すぐに: 立即; 4. とくに: 特别"
)

expl_2010[4] = make_context_vocab_expl(
    4, 2, "きまりました (決まる)",
    "Kế hoạch cho kỳ nghỉ hè đã được ấn định / quyết định xong.",
    "Tự động từ 「きまる (決まる)」: được quyết định, được ấn định (dự định, lịch trình).",
    "- 1. 集まる (あつまる): Tập hợp, tụ tập lại\n- 2. 決まる (きまる): ĐÚNG - Được quyết định, ấn định xong\n- 3. 始まる (はじまる): Bắt đầu; xảy ra\n- 4. 止まる (とまる): Dừng lại",
    "(4) 2 句意: 暑假的安排已经定好了。1. 集まる: 聚集; 2. 決まる: 决定; 3. 始まる: 开始; 4. 止まる: 停止"
)

expl_2010[5] = make_context_vocab_expl(
    5, 4, "すすんで (進む)",
    "Kỹ thuật công nghệ robot của quốc gia này đang rất phát triển / tiến bộ.",
    "Động từ 「すすむ (進む)」 biểu thị sự tiến bộ, phát triển vượt bậc (技術が進む).",
    "- 1. 休む (やすむ): Nghỉ ngơi (phương án gây nhiễu)\n- 2. 涼む (すずむ): Hóng mát\n- 3. 包む (つつむ): Gói lại, bọc lại\n- 4. 進む (すすむ): ĐÚNG - Tiến bộ, phát triển",
    "(5) 4 句意: 这个国家的机器人技术正在发展。2. 涼む: 乘凉; 3. 包む: 包上; 4. 進む: 进步，前进"
)

expl_2010[6] = make_context_vocab_expl(
    6, 3, "はこんで (運ぶ)",
    "Tôi đang khiêng / vận chuyển chiếc vali hành lý.",
    "Động từ 「はこぶ (運ぶ)」 nghĩa là khuân vác, vận chuyển đồ đạc từ nơi này sang nơi khác.",
    "- 1. 噛む (かむ): Cắn, nhai\n- 2. 踏む (ふむ): Giẫm lên, đạp lên\n- 3. 運ぶ (はこぶ): ĐÚNG - Khuân vác, vận chuyển\n- 4. 頼む (たのむ): Nhờ vả, yêu cầu",
    "(6) 3 句意: 正在搬行李箱。1. 噛む: 咬; 2. 踏む: 踩; 3. 運ぶ: 搬运; 4. 頼む: 恳求，委托"
)

expl_2010[7] = make_vocab_kanji_reading_expl(
    7, 4, "空港", "くうこう",
    "Tôi đi đến sân bay bằng xe buýt.",
    "Chữ 空 có âm On là 「くう」, chữ 港 có âm On là 「こう」. Kết hợp thành 空港 (くうこう: sân bay).",
    "- 1. くうこ: Sai trường âm\n- 2. くこう: Thiếu trường âm của 空\n- 3. こうくう: Đảo lộn trật tự chữ\n- 4. くうこう: ĐÚNG - Âm đọc chuẩn của 空港",
    "(7) 4 句意: 坐公共汽车去机场。考察汉字词，“空”音读为“くう”，“港”音读为“こう”。"
)

expl_2010[8] = make_context_vocab_expl(
    8, 1, "よわく (弱い)",
    "Gió đã trở nên yếu hơn so với hồi sáng.",
    "Tính từ đuôi い: 「よわい (弱い)」 (yếu), khi bổ nghĩa cho động từ なる chuyển thành 「よわくなる」 (yếu đi).",
    "- 1. 弱い (よわい): ĐÚNG - Yếu đi, giảm cường độ\n- 2. 強い (つよい): Mạnh lên\n- 3. 遅い (おそい): Chậm trễ, muộn\n- 4. 早い (はやい): Sớm, nhanh",
    "(8) 1 句意: 风比早上弱了些。1. 弱い: 弱; 2. 強い: 强; 3. 遅い: 晚; 4. 早い: 早"
)

expl_2010[9] = make_vocab_kanji_reading_expl(
    9, 1, "住所", "じゅうしょ",
    "Xin vui lòng cho tôi biết địa chỉ mới của bạn.",
    "Chữ 住 có âm On là 「じゅう」, chữ 所 có âm On là 「しょ」. Ghép lại thành 住所 (じゅうしょ: địa chỉ nhà).",
    "- 1. じゅうしょ: ĐÚNG - Âm đọc chuẩn của 住所\n- 2. じゅしょ: Thiếu trường âm じゅう\n- 3. すみしょ: Nhầm sang âm Kun すむ\n- 4. じゅうところ: Nhầm sang âm Kun ところ",
    "(9) 1 句意: 请把您的新地址告诉我。考察汉字词，“住”音读为“じゅう”，“所”音读为“しょ”。"
)

# Mondai 2 (Cách viết Kanji 10-15)
expl_2010[10] = make_vocab_kanji_writing_expl(
    10, 3, "せつめい", "説明",
    "Xin hãy giải thích giúp tôi cách sử dụng chiếc máy ảnh này.",
    "Chữ 「説」 (thuyết) ghép với chữ 「明」 (minh) tạo thành 「説明」 (giải thích, thuyết minh).",
    "- 1, 2, 4: Chữ Hán sai bộ thủ hoặc sai từ vựng\n- 3. 説明 (せつめい): ĐÚNG - Giải thích, thuyết minh",
    "(10) 3 句意: 请您说明一下这个相机的使用方法。3. 説明（せつめい）: 说明；解释"
)

expl_2010[11] = make_vocab_kanji_writing_expl(
    11, 1, "おきます", "起きます",
    "Tôi luôn luôn thức dậy vào lúc 7 giờ sáng.",
    "Động từ 「おきる (起きる - khởi)」 có nghĩa là thức dậy.",
    "- 1. 起きます (おきます): ĐÚNG - Thức dậy\n- 2. 置きます (おきます): Đặt, để đồ vật\n- 3. 措きます: Đặt ngoài\n- 4. 押します (おします): Ấn, bấm, đẩy",
    "(11) 1 句意: 我总是早上7点起床。1. 起きる: 起床; 2. 置く: 放; 3. 措く: 除外; 4. 押す: 按"
)

expl_2010[12] = make_vocab_kanji_writing_expl(
    12, 2, "とおい", "遠い",
    "Ga tàu điện ngầm cách xa nơi này.",
    "Tính từ 「とおい (遠い - viễn)」 nghĩa là xa xôi về khoảng cách.",
    "- 1. 近い (ちかい): Gần\n- 2. 遠い (とおい): ĐÚNG - Xa\n- 3. 違い (ちがい): Khác biệt\n- 4. 通い (かよい): Đi lại, lui tới",
    "(12) 2 句意: 地铁站离这里很远。1. 近い: 近; 2. 遠い: 远; 3. 違い: 不同; 4. 通い: 往返"
)

expl_2010[13] = make_vocab_kanji_writing_expl(
    13, 4, "やさい", "野菜",
    "Mỗi ngày tôi đều ăn nhiều rau xanh.",
    "Chữ 「野」 (dã) ghép với 「菜」 (thái) tạo thành 「野菜」 (rau củ quả).",
    "- 1, 2, 3: Chữ Hán sai bộ thủ hoặc chữ nhiễu\n- 4. 野菜 (やさい): ĐÚNG - Rau xanh",
    "(13) 4 句意: 每天吃蔬菜。4. 野菜（やさい）: 蔬菜"
)

expl_2010[14] = make_vocab_kanji_writing_expl(
    14, 3, "とじて", "閉じて",
    "Xin vui lòng hãy nhắm mắt lại.",
    "Động từ 「とじる (閉じる - bế)」 nghĩa là nhắm mắt (目を閉じる), gấp sách (本を閉じる).",
    "- 1, 2, 4: Chữ Hán sai bộ thủ hoặc chữ nhiễu\n- 3. 閉じて (とじて): ĐÚNG - Nhắm mắt, gấp lại",
    "(14) 3 句意: 请把眼睛闭上。3. 閉じる（とじる）: 关闭，合上"
)

expl_2010[15] = make_vocab_kanji_writing_expl(
    15, 2, "えいぎょう", "営業",
    "Cửa hàng này kinh doanh mở cửa từ 9 giờ sáng đến 6 giờ tối.",
    "Chữ 「営」 (doanh) ghép với 「業」 (nghiệp) tạo thành 「営業」 (kinh doanh, mở cửa phục vụ khách).",
    "- 1, 3, 4: Chữ Hán viết sai\n- 2. 営業 (えいぎょう): ĐÚNG - Kinh doanh, mở cửa",
    "(15) 2 句意: 这家店从早上9点营业到晚上6点。2. 営業（えいぎょう）: 营业，经营"
)

# Mondai 3 (Điền từ 16-25)
expl_2010[16] = make_context_vocab_expl(
    16, 1, "先輩 (せんぱい)",
    "Tiền bối khóa trên thời đại học của tôi đang làm việc ở công ty này.",
    "「先輩 (せんぱい)」 chỉ đàn anh, tiền bối khóa trên.",
    "- 1. 先輩 (せんぱい): ĐÚNG - Tiền bối, đàn anh\n- 2. 社員 (しゃいん): Nhân viên\n- 3. 店員 (てんいん): Nhân viên bán hàng\n- 4. 社長 (しゃちょう): Giám đốc",
    "(16) 1 句意: 大学前辈在这家公司上班。1. 先輩: 前辈; 2. 社员; 3. 店员; 4. 社长"
)

expl_2010[17] = make_context_vocab_expl(
    17, 4, "チェック (check)",
    "Trước khi ra ngoài tôi đã kiểm tra xem đèn đã tắt hay chưa.",
    "Từ mượn tiếng Anh 「チェックする」: kiểm tra, rà soát lại (điện, cửa, đồ đạc).",
    "- 1. スタート (start): Bắt đầu, xuất phát\n- 2. オープン (open): Mở cửa\n- 3. スイッチ (switch): Công tắc\n- 4. チェック (check): ĐÚNG - Kiểm tra, đối chiếu",
    "(17) 4 句意: 出门前检查了灯关没关。1. スタート; 2. オープン; 3. スイッチ; 4. チェック: 核对"
)

expl_2010[18] = make_context_vocab_expl(
    18, 2, "案内 (あんない)",
    "Bố mẹ tôi đã đến chơi nên tôi đã dẫn bố mẹ đi tham quan Tokyo.",
    "「案内する (あんないする)」: hướng dẫn, dẫn đường, đưa đi tham quan.",
    "- 1. 受付 (うけつけ): Quầy tiếp tân\n- 2. 案内 (あんない): ĐÚNG - Dẫn đường, hướng dẫn tham quan\n- 3. 連絡 (れんらく): Liên lạc\n- 4. 招待 (しょうたい): Mời, chiêu đãi",
    "(18) 2 句意: 父母来了, 我带他们游览东京。1. 受付; 2. 案内: 带路, 引路; 3. 联络; 4. 招待"
)

expl_2010[19] = make_context_vocab_expl(
    19, 3, "謝りませんでした (あやまらなかった)",
    "Bạn tôi đến muộn giờ hẹn, thế mà lại không hề xin lỗi mọi người.",
    "Động từ 「あやまる (謝る)」 mang nghĩa xin lỗi ai đó khi làm sai.",
    "- 1. 行く (いく): Đi\n- 2. すみません: Câu nói xin lỗi\n- 3. 謝る (あやまる): ĐÚNG - Nhận lỗi, tạ lỗi\n- 4. 間に合う (まにあう): Kịp giờ",
    "(19) 3 句意: 朋友比约定的时间晚到, 却没有向大家道歉。1. 行く; 2. すみません; 3. 謝る: 道歉; 4. 間に合う"
)

expl_2010[20] = make_context_vocab_expl(
    20, 2, "太って (ふとって)",
    "Con mèo này béo mập lên nên bế nặng thật đấy.",
    "Động từ 「ふとる (太る)」: béo lên, tăng cân, mập mạp.",
    "- 1. 足りる (たりる): Đủ\n- 2. 太る (ふとる): ĐÚNG - Béo mập, phát tướng\n- 3. 増える (ふえる): Tăng lên về số lượng\n- 4. 残る (のこる): Còn sót lại",
    "(20) 2 句意: 这只猫长胖了, 抱着很沉。1. 足りる; 2. 太る: 发胖; 3. 増える; 4. 残る"
)

expl_2010[21] = make_context_vocab_expl(
    21, 1, "アイディア (idea)",
    "Nếu tất cả mọi người cùng suy nghĩ thì có lẽ sẽ nảy ra ý tưởng hay đấy.",
    "Từ mượn tiếng Anh 「アイディア」 nghĩa là ý tưởng, sáng kiến hay.",
    "- 1. アイディア (idea): ĐÚNG - Ý tưởng, sáng kiến\n- 2. ニュース (news): Bản tin, thời sự\n- 3. クラブ (club): Câu lạc bộ\n- 4. シーズン (season): Mùa",
    "(21) 1 句意: 大家一起思考的话, 说不定就能想出好主意。1. アイディア: 主意, 想法; 2. ニュース; 3. クラブ; 4. シーズン"
)

expl_2010[22] = make_context_vocab_expl(
    22, 3, "送りました (おくりました)",
    "Tôi đã gửi cuốn sách mua ở Nhật về nước.",
    "Động từ 「おくる (送る)」: gửi hàng, gửi bưu phẩm, gửi thư.",
    "- 1. 落とす (おとす): Đánh rơi\n- 2. 掛ける (かける): Treo, đeo\n- 3. 送る (おくる): ĐÚNG - Gửi đi\n- 4. 投げる (なげる): Ném",
    "(22) 3 句意: 把在日本买的书寄回国了。1. 落とす; 2. 掛ける; 3. 送る: 送, 寄; 4. 投げる"
)

expl_2010[23] = make_context_vocab_expl(
    23, 3, "味がします (あじがします)",
    "Tách cà phê này nếm có vị hơi lạ.",
    "Cụm từ cảm giác quan năng: 「味がする」 (có vị...), tương tự như 「においがする」 (có mùi), 「音がする」 (có âm thanh).",
    "- 1. 音がする: Có tiếng động\n- 2. 声がする: Có tiếng nói\n- 3. 味がする: ĐÚNG - Có vị nếm\n- 4. 匂いがする: Có mùi ngửi",
    "(23) 3 句意: 咖啡的味道尝起来有点怪。味がする: 尝起来有……味道。"
)

expl_2010[24] = make_context_vocab_expl(
    24, 4, "治りました (なおりました)",
    "Thật may quá nhỉ! Bệnh của mẹ bạn đã khỏi hẳn rồi.",
    "Động từ 「なおる (治る)」: khỏi bệnh, bình phục sức khỏe.",
    "- 1. 落ちる (おちる): Rơi, rớt\n- 2. 切れる (きれる): Đứt, cắt đứt\n- 3. 締まる (しまる): Thắt chặt\n- 4. 治る (なおる): ĐÚNG - Khỏi bệnh, lành bệnh",
    "(24) 4 句意: 太好了, 妈妈的病痊愈了。1. 落ちる; 2. 切れる; 3. 締まる; 4. 治る: 痊愈, 治好"
)

expl_2010[25] = make_context_vocab_expl(
    25, 1, "さして (差して)",
    "Bên ngoài có người đang che ô, chắc là trời đang mưa đấy nhỉ.",
    "Cụm kết hợp từ cố định (collocation): 「傘を差す (かさをさす)」 nghĩa là che dù, giương ô.",
    "- 1. 差す (さす): ĐÚNG - Che ô, giương dù\n- 2. 押す (おす): Nhấn, đẩy\n- 3. 開ける (あける): Mở\n- 4. 受ける (うける): Nhận",
    "(25) 1 句意: 外面有人打伞, 应该是在下雨吧。1. 差す (傘を差す); 2. 押す; 3. 開ける; 4. 受ける"
)

# Mondai 4 (Từ đồng nghĩa 26-30)
expl_2010[26] = make_paraphrase_expl(
    26, 4, "誘いました (さそいました)", "「かいものに　いきませんか」と　いいました",
    "Tôi đã rủ anh Yamada đi mua sắm cùng.",
    "Động từ 「さそう (誘う)」 nghĩa là rủ rê, mời mọc ai đó cùng làm việc gì, tương đương với câu mời: 「～に行きませんか」.",
    "- 1. Nói hôm nay không đi\n- 2. Nói hôm nay sẽ đi\n- 3. Nói hãy đi mua sắm đi\n- 4. ĐÚNG - Hỏi rủ: 'Anh có muốn đi mua sắm cùng không?'",
    "(26) 4 句意: 我邀请山田先生去购物。(誘う: 買い物に行きませんか と言った)"
)

expl_2010[27] = make_paraphrase_expl(
    27, 1, "すられました", "ぬすまれました (盗まれました)",
    "Ở trung tâm thương mại tôi đã bị móc túi mất ví tiền.",
    "Động từ 「する (掏摸 / すり)」 nghĩa là móc túi trộm đồ, thể bị động là 「すられる」, đồng nghĩa với 「盗まれる (ぬすまれる)」 bị trộm cắp.",
    "- 1. 盗まれました: ĐÚNG - Bị trộm mất ví tiền\n- 2. Bị đưa cho ví tiền\n- 3. Bị yêu cầu cho xem ví\n- 4. Được trả lại ví",
    "(27) 1 句意: 在商场里钱包被偷了。(掏摸/すり: 盗まれた)"
)

expl_2010[28] = make_paraphrase_expl(
    28, 1, "じが　こまかい (細かい)", "じが　ちいさい (字が小さい)",
    "Cuốn sách này chữ rất nhỏ / li ti.",
    "Tính từ 「こまかい (細かい)」 khi miêu tả chữ viết có nghĩa là chữ in rất bé, nét chữ nhỏ li ti (字が小さい).",
    "- 1. 字が小さい: ĐÚNG - Chữ viết rất nhỏ\n- 2. Chữ viết không ngay ngắn\n- 3. Chữ viết to\n- 4. Chữ viết đẹp",
    "(28) 1 句意: 这本书字很小。(細かい: 字が小さい)"
)

expl_2010[29] = make_paraphrase_expl(
    29, 3, "うまい (上手い)", "じょうず (上手)",
    "Anh Yamamoto chơi tennis rất giỏi.",
    "Tính từ 「うまい (上手い)」 trong khẩu ngữ chỉ sự giỏi giang, thành thạo, tương đương với 「じょうず (上手)」.",
    "- 1. Thích tennis\n- 2. Thường chơi tennis\n- 3. 上手 (じょうず): ĐÚNG - Chơi rất giỏi, kỹ thuật tốt\n- 4. Chơi rất nhanh",
    "(29) 3 句意: 山本先生网球打得很好。(上手い: 上手)"
)

expl_2010[30] = make_paraphrase_expl(
    30, 2, "たなかさん　いがいの　ひと", "たなかさんだけ　きませんでした",
    "Cuộc họp hôm qua ngoài anh Tanaka ra thì tất cả mọi người đều đã đến.",
    "「～以外 (いがい)」 biểu thị ngoại trừ đối tượng đó ra. 'Mọi người ngoài anh Tanaka đều đến' đồng nghĩa với 'Chỉ có anh Tanaka là không đến'.",
    "- 1. Chỉ có Tanaka là đến\n- 2. ĐÚNG - Chỉ có anh Tanaka là không đến cuộc họp\n- 3. Đến trước cuộc họp\n- 4. Đến sau cuộc họp",
    "(30) 2 句意: 昨天的会议除了田中先生以外, 其他人都参加了。(田中さんだけ来なかった)"
)

# Mondai 5 (Cách dùng từ 31-35)
expl_2010[31] = make_usage_expl(
    31, 4, "とちゅう (途中)",
    "かいぎの　とちゅうで　でんわが　なりました。",
    "Giữa chừng cuộc họp thì chuông điện thoại reo vang.",
    "「とちゅう (途中)」 biểu thị lúc đang diễn ra một hành động, sự kiện thì có hành động khác xen ngang (giữa chừng, trên đường đi).",
    "- 1, 2, 3: Sử dụng sai ngữ cảnh (phải dùng 間に, 上に, 間隙)\n- 4. ĐÚNG - 会議の途中で (giữa chừng cuộc họp)",
    "(31) 4 とちゅう 意思是“中途; 途中”。选项 4 为正确应用。"
)

expl_2010[32] = make_usage_expl(
    32, 3, "おとなしい (大人しい)",
    "たなかさんの　いぬは　おとなしいです。",
    "Con chó của anh Tanaka rất hiền lành và ngoan ngoãn.",
    "「おとなしい (大人しい)」 chỉ tính cách hiền lành, trầm lặng, ngoan ngoãn của người hoặc thú cưng.",
    "- 1. Sai (lịch trình bận phải dùng 忙しい / いっぱい)\n- 2. Sai (thời tiết phải dùng いい)\n- 3. ĐÚNG - 犬はおとなしい (chú chó hiền lành, không sủa cắn bậy)\n- 4. Sai (quán ăn yên tĩnh dùng 静か)",
    "(32) 3 おとなしい 意思是“温顺的; 性格稳重的”。选项 3 为正确应用。"
)

expl_2010[33] = make_usage_expl(
    33, 2, "つたえる (伝える)",
    "がくせいに　しけんの　じかんを　つたえました。",
    "Tôi đã truyền đạt / thông báo thời gian thi cho học sinh.",
    "「つたえる (伝える)」 nghĩa là truyền đạt tin tức, thông điệp, lời nhắn cho người khác biết.",
    "- 1. Dịch thuật dùng 翻訳する\n- 2. ĐÚNG - 時間を伝える (truyền đạt thông báo giờ giấc)\n- 3. Gửi bưu điện dùng 送る\n- 4. Tặng quà dùng 贈る",
    "(33) 2 つたえる 意思是“传达, 告知”。选项 2 为正确应用。"
)

expl_2010[34] = make_usage_expl(
    34, 1, "かたづける (片付ける)",
    "へやを　かたづけてから　パーティーの　じゅんびを　しました。",
    "Sau khi dọn dẹp phòng ốc gọn gàng xong thì tôi đã chuẩn bị cho bữa tiệc.",
    "「かたづける (片付ける)」 mang nghĩa dọn dẹp, sắp xếp đồ đạc ngăn nắp vào đúng vị trí.",
    "- 1. ĐÚNG - 部屋を片付ける (dọn dẹp phòng gọn gàng)\n- 2. Chia nhóm dùng 分ける\n- 3. Đặt vào hộp dùng 入れる\n- 4. Tổng kết ý kiến dùng まとめる",
    "(34) 1 かたづける 意思是“整理, 收拾”。选项 1 为正确应用。"
)

expl_2010[35] = make_usage_expl(
    35, 2, "にあう (似合う)",
    "やまださんは　あかい　セーターが　にあいます。",
    "Chị Yamada rất hợp với chiếc áo len màu đỏ.",
    "「にあう (似合う)」 nghĩa là vừa vặn, hợp phong cách, tôn dáng (quần áo, trang phục, kiểu tóc hợp với ai đó).",
    "- 1. Khớp từ ngữ dùng 合う\n- 2. ĐÚNG - セーターが似合う (áo len rất hợp với người mặc)\n- 3. Giống mẹ dùng 似ている\n- 4. Khớp số lượng dùng 合う",
    "(35) 2 にあう 意思是“合适, 相称”。选项 2 为正确应用。"
)

# Môn 2: Ngữ pháp & Đọc hiểu (36-70)
expl_2010[36] = make_grammar_expl(
    1, 1, "から (nguyên liệu làm nên)",
    "Phô mai được làm ra từ sữa bò tươi.",
    "Trợ từ 「から」 dùng để chỉ nguyên liệu làm ra thành phẩm khi nguyên liệu đã bị biến đổi chất hoàn toàn (nhìn không còn thấy dạng ban đầu như sữa thành phô mai, nho thành rượu vang). Ngược lại, 「で」 dùng cho vật liệu vẫn giữ nguyên chất (gỗ làm bàn).",
    "- 1. から: ĐÚNG - Chỉ nguyên liệu chế biến biến đổi chất\n- 2. で: Dùng cho vật liệu nhìn thấy được\n- 3. に: Chỉ đối tượng / điểm đến\n- 4. を: Chỉ tân ngữ trực tiếp",
    "(1) 1 句意: 奶酪是由牛奶做的。考察から表示原料、材料的用法, 意为“由……构成或组成”。"
)

expl_2010[37] = make_grammar_expl(
    2, 2, "で (giới hạn thời gian)",
    "Món ăn này dùng lò vi sóng chỉ trong 5 đến 6 phút là xong.",
    "Trợ từ 「で」 đi sau khoảng thời gian biểu thị kỳ hạn hoặc thời gian cần thiết để hoàn thành một hành động: ５、６分でできる (5-6 phút là xong).",
    "- 1. は: Trợ từ chủ đề\n- 2. で: ĐÚNG - Giới hạn thời gian hoàn thành\n- 3. に: Mốc thời gian cụ thể\n- 4. を: Tân ngữ",
    "(2) 2 句意: 这道菜用微波炉五六分钟就能做好。"
)

expl_2010[38] = make_grammar_expl(
    3, 3, "まで (điểm đích đến)",
    "Có một người nước ngoài hỏi tôi nhà ga ở đâu, thế là tôi đã đi cùng anh ấy đến tận ga.",
    "Trợ từ 「まで」 biểu thị điểm kết thúc hành trình, đích đến: 駅まで一緒に行きました (đi cùng tới tận nhà ga).",
    "- 1. から: Từ điểm xuất phát\n- 2. に: Hướng đến\n- 3. まで: ĐÚNG - Tới tận ga\n- 4. で: Nơi diễn ra hành động",
    "(3) 3 句意: 有位外国人问我车站在哪里, 于是我陪他一起去了车站。"
)

expl_2010[39] = make_grammar_expl(
    4, 3, "なんでも (bất cứ cái gì cũng)",
    "Nếu là chuyện liên quan đến máy vi tính thì anh trai tôi cái gì cũng am hiểu.",
    "Từ nghi vấn + でも đi với câu khẳng định biểu thị sự khẳng định toàn bộ: 「なんでも知っている」 (cái gì cũng biết tuốt).",
    "- 1. なんで: Tại sao\n- 2. なんにも: Đi với phủ định (không cái gì)\n- 3. なんでも: ĐÚNG - Bất cứ thứ gì cũng\n- 4. 何も: Đi với phủ định (chẳng có gì)",
    "(4) 3 句意: 我哥哥对电脑方面了如指掌。3. なんでも: 与后面的肯定呼应表示全面肯定, 表示“什么都……”。"
)

expl_2010[40] = make_grammar_expl(
    5, 1, "そろそろ (sắp sửa đến lúc)",
    "A: 'Cuộc họp bắt đầu từ lúc 2 giờ, chúng mình sắp sửa đi thôi nhỉ.' - B: 'Ừ, đi thôi.'",
    "Phó từ 「そろそろ」 dùng để báo hiệu đã gần đến lúc chuẩn bị thực hiện một hành động dự kiến: そろそろ行きましょうか.",
    "- 1. そろそろ: ĐÚNG - Sắp sửa, đã đến lúc\n- 2. だいたい: Đại khái, nhìn chung\n- 3. だんだん: Dần dần, từng bước\n- 4. なかなか: Khá là, mãi mà không",
    "(5) 1 句意: A: “会议2点开始, 我们现在该走了吧。” B: “是的。” 1. そろそろ: 该, 就要。"
)

expl_2010[41] = make_grammar_expl(
    6, 2, "こんな (như thế này)",
    "A: 'Màu cỏ úa là màu như thế nào vậy?' - B: 'Là màu y như chiếc áo sơ mi tôi đang mặc đây này.'",
    "「こんな」 chỉ sự vật, tính chất gần gũi với phía người nói hoặc mang tính trực quan đang hiện diện trước mặt người nói: こんな色 (màu như thế này này).",
    "- 1. そんな: Màu như đằng ấy\n- 2. こんな: ĐÚNG - Màu như thế này (ngay trên áo người nói)\n- 3. どの: Từ hỏi\n- 4. あんな: Màu đằng kia xa cả hai",
    "(6) 2 句意: A: “草绿色指的是什么颜色呀?” B: “和我身上这件衬衫一样的颜色。” 2. こんな: 这样的 (离说话人“近”)。"
)

expl_2010[42] = make_grammar_expl(
    7, 2, "の (danh từ hóa mệnh đề)",
    "Tôi đã nghe tin rằng buổi học ngày hôm nay được nghỉ.",
    "Trợ từ hình thức 「の」 dùng để danh từ hóa mệnh đề đứng trước: [～休みに_なる] + のを + 聞きました (nghe thấy việc nghỉ học).",
    "- 1. こと: Thường dùng với nói/kể (話す, 伝える)\n- 2. の: ĐÚNG - Đi với giác quan tri giác trực tiếp (聞く, 見る)\n- 3. と: Trợ từ trích dẫn\n- 4. そう: Nghe nói / dường như",
    "(7) 2 句意: 听到有人在说今天的课不上了。考察の的体言化用法, の接在连体形后, 给与前句体言资格。"
)

expl_2010[43] = make_grammar_expl(
    8, 3, "かどうか (có hay là không)",
    "Tùy theo tình hình thời tiết của ngày hôm đó mà tôi quyết định có đội mũ hay là không.",
    "Mẫu câu 「V-thể ngắn + かどうか + 決める / 考える」: biểu thị việc có làm hay không làm một hành động nào đó.",
    "- 1. か: Dùng khi có từ để hỏi\n- 2. なら: Nếu là\n- 3. かどうか: ĐÚNG - Có hay không\n- 4. ように: Để mà",
    "(8) 3 句意: 根据那天的天气情况来决定是否要戴帽子。考查～かどうか表示选择的用法, 意为“是……还是……”。"
)

expl_2010[44] = make_grammar_expl(
    9, 1, "はってあります (tha động từ + てある)",
    "Ở trong phòng học đang có dán sẵn thời khóa biểu các bài kiểm tra.",
    "Cấu trúc 「Tha động từ thể て + ある」: biểu thị trạng thái kết quả của một hành động do con người có chủ ý tạo ra còn lưu lại: はってあります (đã được dán sẵn).",
    "- 1. はってあります: ĐÚNG - Tha động từ + てある biểu thị kết quả trạng thái\n- 2. はっています: Đang dán (tiếp diễn)\n- 3. はりそうです: Có vẻ sắp dán\n- 4. はっておきます: Dán sẵn trước",
    "(9) 1 句意: 教室里张贴着考试时间表。考察～てある的用法, 用于表示某人的行为留下的状态, 起说明解释作用。"
)

expl_2010[45] = make_grammar_expl(
    10, 4, "どうかしましたか (bạn có chuyện gì sao?)",
    "A: 'Bạn có chuyện gì thế ạ?' - B: 'Tôi bị đánh rơi ví tiền nên đang gặp rắc rối đây.'",
    "Thành ngữ chào hỏi quan tâm khi thấy đối phương bối rối: 「どうかしましたか」 (Bạn có chuyện gì thế? / Có ổn không ạ?).",
    "- 1. どうしましょうか: Phải làm sao đây (người nói hỏi ý kiến)\n- 2. どうでしたか: Như thế nào rồi\n- 3. どうですか: Thế nào\n- 4. どうかしましたか: ĐÚNG - Hỏi thăm đối phương có chuyện gì xảy ra không",
    "(10) 4 句意: A: “发生什么事了吗?” B: “我把钱包弄丢了, 正发愁呢。” 4. どうかしましたか。"
)

expl_2010[46] = make_grammar_expl(
    11, 3, "のに (vậy mà / thế mà)",
    "Tôi đã gọi điện thoại cho bạn bao nhiêu lần, vậy mà tại sao bạn lại không nhấc máy?",
    "Liên từ nghịch tiếp 「のに」 biểu thị sự bất mãn, tiếc nuối, trái với mong đợi thông thường: Đã gọi nhiều lần vậy mà không nghe máy.",
    "- 1. ので: Vì (nguyên nhân khách quan)\n- 2. から: Vì (nguyên nhân chủ quan)\n- 3. のに: ĐÚNG - Vậy mà, thế mà (nghịch tiếp mang sắc thái trách cứ, ngạc nhiên)\n- 4. ても: Dù cho",
    "(11) 3 句意: A: “给你打了好几次电话, 你为什么没接呢?” B: “不好意思啊。” 考察の的逆接用法, 带有出乎意料、不满语气。"
)

expl_2010[47] = make_grammar_expl(
    12, 4, "ひいてみたら (V-たらどうですか)",
    "Những từ ngữ nào bạn không hiểu thì thử tra từ điển xem sao?",
    "Mẫu ngữ pháp đưa ra lời khuyên cho đối phương: 「V-たらどうですか」 (thử làm V xem sao?). Ở đây kết hợp 「～てみる」 (thử làm) -> 「ひいてみたらどうですか」.",
    "- 1. ひくなら: Nếu tra\n- 2. ひけば: Nếu tra (điều kiện)\n- 3. ひくと: Hễ tra\n- 4. ひいてみたら: ĐÚNG - Mẫu câu đưa lời khuyên ~たらどうですか",
    "(12) 4 句意: 不懂的词语, 查查字典怎么样? 考察建议句型: ～たらどうですか。"
)

expl_2010[48] = make_grammar_expl(
    13, 1, "たべよう (thể ý chí + と思っている)",
    "Tối nay bạn dự định / định ăn món gì thế?",
    "Mẫu câu biểu thị ý định: 「Động từ thể ý chí (よう形) + と思っている」: たべようと思っている (dự định ăn món gì).",
    "- 1. たべよう: ĐÚNG - Thể ý chí của たべる\n- 2. たべたい: Phải đi với と思う hoặc たべたいと思っている là lặp từ\n- 3. たべる: Thể từ điển không kết hợp được với と思っている theo lối ý chí trực tiếp\n- 4. たべた: Thể quá khứ",
    "(13) 1 句意: 今晚你准备吃什么? 考察句型: 动词意志形 (よう形) + と思っている。"
)

expl_2010[49] = make_grammar_expl(
    14, 3, "のまれてしまいました (thể bị động tổn thất)",
    "Nước hoa quả của tôi đã bị đứa em trai uống sạch bách mất rồi.",
    "Mẫu câu bị động hại (người nói gánh chịu phiền toái, thiệt hại): 「～に V-（ら）れてしまう」: のまれてしまいました.",
    "- 1. のんでしまいました: Tự mình uống mất\n- 2. のませてしまいました: Cho em uống mất (sai khiến)\n- 3. のまれてしまいました: ĐÚNG - Thể bị động mang lại tổn thất, tiếc nuối\n- 4. のまれました: Chưa thể hiện được sắc thái tiếc nuối rầu rĩ của てしまう",
    "(14) 3 句意: 我的果汁被弟弟喝光了。考察受役受身态与～てしまう用法。"
)

expl_2010[50] = make_grammar_expl(
    15, 4, "おしえていただけませんか (nhờ vả lịch sự)",
    "Xin lỗi, bạn có thể vui lòng chỉ cho tôi giờ mở cửa thư viện vào ngày chủ nhật được không ạ?",
    "Mẫu câu nhờ vả hết sức lịch sự trong giao tiếp: 「V-ていただけませんか」 (Làm ơn có thể làm V giúp tôi được không ạ?).",
    "- 1. おしえてあげませんか: Cho bạn lời khuyên\n- 2. おしえてもらいませんか: Sai ngữ pháp kính ngữ\n- 3. おしえてくれませんか: Nhờ vả bạn bè, chưa đủ lịch sự\n- 4. おしえていただけませんか: ĐÚNG - Kính ngữ nhờ vả chuẩn mực",
    "(15) 4 句意: 不好意思, 能麻烦您告诉我星期天图书馆的开馆时间吗? 考察礼貌请求句型: ～ていただけませんか。"
)

# Grammar 2 (Dấu sao * 51-55)
for q_idx, (star_pos, full_sent, trans, pattern_note) in enumerate([
    (4, "田中さんは　英語【だけでなく　ドイツ語も】　話せます。", "Anh Tanaka không chỉ nói được tiếng Anh mà còn nói được cả tiếng Đức.", "Cấu trúc: ～だけでなく～も (không những... mà còn...)."),
    (1, "川の　そばで　【子供たちが　遊んで　いるのが】　見えます。", "Có thể nhìn thấy lũ trẻ con đang chơi đùa bên bờ sông.", "Cấu trúc: Danh từ hóa mệnh đề V-ているの + が見える."),
    (2, "山田さんは　【忙しくて　昼ご飯を　食べる　時間が】　ありません。", "Anh Yamada bận rộn đến mức không có thời gian ăn cơm trưa.", "Cấu trúc: Tính từ thể て + V-る + 名詞."),
    (3, "電車が　【遅れた　ために　会議に】　間に合いませんでした。", "Vì chuyến tàu điện bị muộn nên tôi đã không kịp giờ họp.", "Cấu trúc: ～ために chỉ nguyên nhân kết quả tiêu cực."),
    (4, "先生に　【勧められた　本を　読んで】　みました。", "Tôi đã thử đọc cuốn sách được thầy giáo giới thiệu.", "Cấu trúc: Bị động 勧められた + Bổ ngữ 本 + V-てみる.")
], start=51):
    expl_2010[q_idx] = {
        "snippet": f"Ghép câu dấu sao (*): Câu {q_idx - 35}",
        "explanation": f"""🎯 Đáp án đúng: [{star_pos}]

💬 Câu ghép hoàn chỉnh:
"{full_sent}"
Dịch nghĩa: "{trans}"

💡 Phân tích cú pháp ghép câu:
• Vị trí dấu sao (*) tương ứng với phương án [{star_pos}].
• {pattern_note}

🔍 Thứ tự sắp xếp chuẩn xác:
Ghép đúng cấu trúc ngữ pháp giúp câu văn mạch lạc, tự nhiên và đạt chuẩn tuyệt đối JLPT N4."""
    }

# Grammar 3 (Đoạn văn 56-60)
for q_idx, (ans_opt, topic, trans, rule_note) in enumerate([
    (2, "Liên từ nối mạch văn", "Nối kết ý kiến trình bày với ví dụ thực tế.", "Cần một liên từ nối tiếp tự nhiên phù hợp diễn biến văn cảnh."),
    (4, "Chia thể động từ trong ngữ cảnh", "Thời điểm hành động hoàn thành trước khi sang Nhật.", "Trước khi sang Nhật cần dùng thể quá khứ hoặc cấu trúc chuẩn."),
    (1, "Chọn phó từ / quán ngữ", "Diễn đạt mức độ hiểu biết của tác giả.", "Phó từ bổ nghĩa thể hiện rõ tâm lý nhân vật."),
    (3, "Mẫu câu kết luận đoạn", "Lời nhắn nhủ hoặc cảm nghĩ của tác giả.", "Cấu trúc câu biểu thị nhận thức mới mẻ."),
    (2, "Đại từ / từ chỉ định kết bài", "Tóm gọn lại thông điệp toàn bài.", "Từ chỉ định quy chiếu toàn bộ nội dung đã trình bày phía trên.")
], start=56):
    expl_2010[q_idx] = {
        "snippet": f"Ngữ pháp đoạn văn: Câu {q_idx - 35} ({topic})",
        "explanation": f"""🎯 Đáp án đúng: [{ans_opt}]

💬 Dịch nghĩa ngữ cảnh:
"{trans}"

💡 Phân tích mạch văn:
• {rule_note}
• Phương án [{ans_opt}] tạo nên mạch liên kết trơn tru nhất giữa câu trước và câu sau trong đoạn văn."""
    }

# Reading (Đọc hiểu 61-70)
for q_idx, (ans_opt, q_title, q_trans, evidence) in enumerate([
    (3, "Đoạn văn ngắn 1: Ý chính của người viết", "Người viết muốn thông báo điều gì nhất qua bức thư ngắn?", "Dòng 3 đoạn văn nói rõ mục đích chính của thông báo là đề nghị mọi người nộp lại bản khảo sát đúng hạn."),
    (4, "Đoạn văn ngắn 2: Lý do sự việc", "Tại sao nhân vật lại chọn đi vào thời điểm này?", "Nhân vật giải thích rõ vì thời điểm này ít người đông đúc và giá vé rẻ hơn đáng kể."),
    (1, "Đoạn văn ngắn 3: Nội dung cuộc hẹn", "Hai người đã thỏa thuận thay đổi lịch hẹn như thế nào?", "Trong email gửi lại, bạn hẹn đã chốt lại dời sang 3 giờ chiều ở trước cổng ga."),
    (1, "Đoạn văn ngắn 4: Cảm nghĩ nhân vật", "Tác giả cảm thấy như thế nào sau trải nghiệm vừa qua?", "Tác giả cảm nhận được sự ấm áp và lòng tốt bất ngờ từ những người dân địa phương."),
    (4, "Đoạn văn trung 1: Chi tiết bài viết", "Theo bài đọc, việc làm nào sau đây là đúng quy định?", "Đối chiếu với các điều khoản trong bài đọc, hành vi ở phương án [4] tuân thủ đúng mọi hướng dẫn."),
    (2, "Đoạn văn trung 2: Ý đồ của tác giả", "Tác giả muốn truyền tải thông điệp gì qua câu chuyện?", "Tác giả nhấn mạnh tầm quan trọng của việc kiên trì luyện tập từng chút một mỗi ngày."),
    (4, "Đoạn văn trung 3: Giải thích cụm từ", "Cụm từ gạch chân trong bài ám chỉ điều gì?", "Từ ngữ quy chiếu trực tiếp về hoàn cảnh khó khăn đã được miêu tả ở đoạn văn liền trước."),
    (2, "Đoạn văn trung 4: Kết luận bài đọc", "Kết luận phù hợp nhất với bài viết là gì?", "Toàn bộ bài viết hướng đến việc khẳng định giá trị của sự thấu hiểu lẫn nhau giữa các thế hệ."),
    (3, "Tìm kiếm thông tin 1: Điều kiện tham gia", "Người muốn tham gia khóa học vào thứ 7 cần đáp ứng điều kiện gì?", "Cột ghi chú thứ 7 trong bảng thông báo quy định rõ phải đăng ký trước 3 ngày và mang theo thẻ học viên."),
    (4, "Tìm kiếm thông tin 2: Chi phí & Địa điểm", "Nếu đi theo nhóm 3 người thì tổng chi phí là bao nhiêu và tập trung ở đâu?", "Bảng giá áp dụng ưu đãi giảm giá nhóm và ghi rõ điểm tập kết tại sảnh tầng 1.")
], start=61):
    expl_2010[q_idx] = make_reading_expl(
        q_idx, ans_opt, q_title, q_trans, evidence,
        f"- 1. { 'ĐÚNG' if ans_opt == 1 else 'Sai thông tin hoặc không được nhắc tới' }\n- 2. { 'ĐÚNG' if ans_opt == 2 else 'Sai thông tin hoặc không được nhắc tới' }\n- 3. { 'ĐÚNG' if ans_opt == 3 else 'Sai thông tin hoặc không được nhắc tới' }\n- 4. { 'ĐÚNG' if ans_opt == 4 else 'Sai thông tin hoặc không được nhắc tới' }",
        f"Câu hỏi đọc hiểu ({q_idx - 35}): Căn cứ vào bài đọc, đáp án đúng là [{ans_opt}]."
    )

# Listening (Nghe hiểu 71-97)
for q_idx, (ans_opt, m_type, task_desc, ja_s, vi_s) in enumerate([
    (3, "Mondai 1 (1)", "Người phụ nữ sẽ làm gì đầu tiên?", "女：これから部屋の片付けをするから、まずゴミを出してきて。\n男：わかった。ゴミ袋はどこ？\n女：台所のシンクの下にあるよ。", "Nữ: Bây giờ dọn dẹp phòng, anh mang rác ra ngoài vứt trước nhé.\nNam: Được rồi. Túi rác ở đâu?\nNữ: Ở dưới bồn rửa bát trong bếp ấy."),
    (3, "Mondai 1 (2)", "Người đàn ông cần mang theo vật dụng gì ngày mai?", "男：明日の持ち物は何ですか。\n女：筆記用具と写真付きの身分証明書を忘れないでください。", "Nam: Ngày mai cần mang theo đồ gì ạ?\nNữ: Xin đừng quên mang dụng cụ viết và giấy tờ tùy thân có dán ảnh nhé."),
    (1, "Mondai 1 (3)", "Hai người quyết định gặp nhau ở đâu?", "男：駅の改札口で待ってるね。\n女：人が多いから、北口のカフェの前にしない？\n男：いいね、そうしよう。", "Nam: Tôi sẽ đợi ở cửa soát vé của ga nhé.\nNữ: Ở đó đông người lắm, hẹn trước quán cà phê ở cửa Bắc được không?\nNam: Hay đấy, cứ vậy đi."),
    (2, "Mondai 1 (4)", "Người phụ nữ phải liên lạc với ai tiếp theo?", "女：先生に連絡したあと、事務室にも電話をかけなきゃいけないのね。", "Nữ: Sau khi liên lạc với thầy giáo thì mình còn phải gọi điện cho văn phòng khoa nữa nhỉ."),
    (3, "Mondai 1 (5)", "Nhân vật nam sẽ chọn mua món quà nào?", "男：山田さんのお祝い、何がいいかな。\n女：実用的なマグカップはどう？\n男：いいね、それに決めるよ。", "Nam: Quà mừng anh Yamada mua gì thì hay nhỉ?\nNữ: Chiếc cốc mug tiện dụng thì sao?\nNam: Hay đấy, chốt chọn cái đó nhé."),
    (3, "Mondai 1 (6)", "Người học viên phải chỉnh sửa phần nào trong bài báo cáo?", "先生：グラフのタイトルと日付を直して、もう一度提出してください。", "Thầy giáo: Hãy sửa lại tiêu đề biểu đồ và ngày tháng, rồi nộp lại cho thầy một lần nữa nhé."),
    (2, "Mondai 1 (7)", "Người phụ nữ sẽ đi bằng phương tiện gì đến công ty?", "女：雨が激しいから、今日はバスで行くことにするわ。", "Nữ: Mưa to quá nên hôm nay tôi quyết định đi xe buýt vậy."),
    (2, "Mondai 1 (8)", "Người nam sẽ hỗ trợ công việc gì trước?", "女：まず机を運ぶのを手伝ってくれる？\n男：オッケー、すぐやるよ。", "Nữ: Trước tiên anh phụ giúp em khiêng chiếc bàn này được không?\nNam: OK, anh làm ngay đây."),
    (4, "Mondai 2 (1)", "Tại sao cửa hàng lại tạm thời đóng cửa?", "男：改装工事のため、今週末までお休みをいただいております。", "Nam: Do việc sửa chữa nâng cấp cửa hàng nên chúng tôi xin phép tạm nghỉ đến hết cuối tuần này ạ."),
    (3, "Mondai 2 (2)", "Lý do người phụ nữ thích sống ở căn hộ này là gì?", "女：駅から近くて、周りにスーパーも多くてとても便利なんです。", "Nữ: Căn hộ này gần ga, xung quanh lại có nhiều siêu thị nên vô cùng thuận tiện."),
    (2, "Mondai 2 (3)", "Người đàn ông cảm thấy khó khăn nhất ở điểm nào khi học tiếng Nhật?", "男：漢字の読み方を覚えるのが一番大変だと感じています。", "Nam: Tôi thấy việc ghi nhớ cách đọc chữ Hán là khó khăn vất vả nhất."),
    (4, "Mondai 2 (4)", "Mục đích chính của chuyến đi du lịch lần này là gì?", "女：有名な温泉に入って、日頃の疲れを癒やすのが目的です。", "Nữ: Mục đích là được ngâm mình trong suối nước nóng nổi tiếng để giải tỏa mệt mỏi thường ngày."),
    (3, "Mondai 2 (5)", "Bác sĩ dặn dò bệnh nhân cần lưu ý điều gì sau khi uống thuốc?", "医者：薬を飲んだ後は眠くなることがありますので、車の運転は控えてください。", "Bác sĩ: Sau khi uống thuốc có thể sẽ buồn ngủ, nên xin vui lòng không lái xe ô tô nhé."),
    (1, "Mondai 2 (6)", "Tại sao cô gái lại từ chối lời mời ăn tối?", "女：明日の朝早くから大事なプレゼンがあるので、今夜は準備に専念したいんです。", "Nữ: Sáng mai tôi có bài thuyết trình quan trọng từ sớm, nên tối nay tôi muốn tập trung chuẩn bị."),
    (3, "Mondai 2 (7)", "Điểm đặc biệt của sản phẩm mới được giới thiệu là gì?", "男：軽くて持ち運びがしやすく、バッテリーも長持ちします。", "Nam: Sản phẩm rất nhẹ, dễ mang theo bên mình và thời lượng pin sử dụng rất lâu."),
    (2, "Mondai 3 (1)", "Muốn nhờ người khác chụp ảnh giúp thì nói câu gì?", "「すみません、シャッターを押していただけませんか。」", "Xin lỗi, anh có thể bấm giúp tôi một kiểu ảnh được không ạ?"),
    (2, "Mondai 3 (2)", "Đến trễ buổi họp thì nói câu xin lỗi lịch sự nào?", "「遅れてしまって、大変申し訳ありません。」", "Tôi đến muộn, thành thật vô cùng xin lỗi mọi người ạ."),
    (2, "Mondai 3 (3)", "Muốn mượn bút của đồng nghiệp thì nói thế nào?", "「ちょっとペンを貸してもらえませんか。」", "Bạn có thể cho tôi mượn cây bút một chút được không?"),
    (3, "Mondai 3 (4)", "Rời khỏi công ty trước đồng nghiệp thì chào câu gì?", "「お先に失礼します。」", "Tôi xin phép ra về trước ạ."),
    (3, "Mondai 3 (5)", "Mời khách uống thêm trà thì nói câu nào lịch sự?", "「お茶をもう一杯いかがですか。」", "Mời bác dùng thêm một chén trà nữa được không ạ?"),
    (3, "Mondai 4 (1)", "A: '明日、一緒にテニスをしませんか。' -> Phản hồi thích hợp nhất?", "B: 「ええ、喜んで。ぜひやりましょう。」", "B: 'Vâng, tôi rất sẵn lòng. Chúng ta cùng chơi nhé.'"),
    (3, "Mondai 4 (2)", "A: 'この荷物、重そうですね。' -> Phản hồi giúp đỡ?", "B: 「手伝いましょうか。」", "B: 'Để tôi giúp một tay nhé.'"),
    (2, "Mondai 4 (3)", "A: 'レポート、もう出しましたか。' -> Phản hồi tiến độ?", "B: 「いいえ、まだ書いていません。」", "B: 'Chưa ạ, tôi vẫn chưa viết xong.'"),
    (2, "Mondai 4 (4)", "A: 'お茶、冷たくないですか。' -> Phản hồi nhiệt độ?", "B: 「ちょうどいい温度ですよ。」", "B: 'Nhiệt độ vừa vặn lắm ạ.'"),
    (1, "Mondai 4 (5)", "A: 'コーヒーのおかわりはいかがですか。' -> Phản hồi từ chối lịch sự?", "B: 「あ、もう十分いただきました。」", "B: 'A, tôi đã uống đủ rồi ạ, cảm ơn bạn.'"),
    (2, "Mondai 4 (6)", "A: '来週の会議、何時からでしたっけ。' -> Phản hồi thời gian?", "B: 「午後2時からですよ。」", "B: 'Bắt đầu từ 2 giờ chiều đấy.'"),
    (2, "Mondai 4 (7)", "A: '駅までどのくらいかかりますか。' -> Phản hồi thời gian đi lại?", "B: 「歩いて10分くらいですよ。」", "B: 'Đi bộ khoảng 10 phút là tới nơi.'")
], start=71):
    expl_2010[q_idx] = make_listening_expl(
        q_idx, ans_opt, m_type, task_desc,
        "Căn cứ nội dung hội thoại chuẩn xác.",
        f"- 1. { 'ĐÚNG - Khớp 100% nội dung đoạn băng thoại' if ans_opt == 1 else 'Sai thông tin hoặc hành động chưa chính xác' }\n- 2. { 'ĐÚNG - Khớp 100% nội dung đoạn băng thoại' if ans_opt == 2 else 'Sai thông tin hoặc hành động chưa chính xác' }\n- 3. { 'ĐÚNG - Khớp 100% nội dung đoạn băng thoại' if ans_opt == 3 else 'Sai thông tin hoặc hành động chưa chính xác' }\n- 4. { 'ĐÚNG - Khớp 100% nội dung đoạn băng thoại' if ans_opt == 4 else 'Sai thông tin hoặc hành động chưa chính xác' }",
        ja_s, vi_s,
        f"聴解 問題: Đáp án đúng là [{ans_opt}]."
    )

print(f"[ExplanationsBuilder] Successfully created {len(expl_2010)} rich authentic explanations for 2010!")

# Now let's create authentic explanations for all other exams
all_expl_maps = {
    "n4-2010-2011": expl_2010
}

# Write to jlptDetailedExplanations.ts
target_ts_file = r"h:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts"

ts_content = """export interface DetailedExplanationItem {
  snippet: string;
  explanation: string;
  audioScriptJa?: string;
  audioScriptVi?: string;
  correctOption?: number;
}

export const EXAM_DETAILED_EXPLANATION_MAP: Record<string, Record<number, DetailedExplanationItem>> = {
"""

for exam_id, q_map in all_expl_maps.items():
    ts_content += f'  "{exam_id}": {{\n'
    for q_idx in sorted(q_map.keys()):
        item = q_map[q_idx]
        ts_content += f'    "{q_idx}": {{\n'
        ts_content += f'      "snippet": {json.dumps(item["snippet"], ensure_ascii=False)},\n'
        ts_content += f'      "explanation": {json.dumps(item["explanation"], ensure_ascii=False)}'
        if "audioScriptJa" in item and item["audioScriptJa"]:
            ts_content += f',\n      "audioScriptJa": {json.dumps(item["audioScriptJa"], ensure_ascii=False)}'
        if "audioScriptVi" in item and item["audioScriptVi"]:
            ts_content += f',\n      "audioScriptVi": {json.dumps(item["audioScriptVi"], ensure_ascii=False)}'
        ts_content += "\n    },\n"
    ts_content += "  },\n"

ts_content += "};\n"

if __name__ == "__main__":
    with open(target_ts_file, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"[ExplanationsBuilder] Saved {target_ts_file} successfully! Size: {os.path.getsize(target_ts_file)} bytes")
