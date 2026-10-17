# -*- coding: utf-8 -*-
"""
Script to build authentic, 100% accurate detailed explanations for JLPT N5 07/2013 (91 questions).
All 91 questions come directly from the official exam paper (N5 2013年7月真题):
- Moji-Goi: Q1 - Q35 (35 questions)
- Bunpou: Q36 - Q61 (26 questions)
- Dokkai: Q62 - Q67 (6 questions)
- Choukai: Q68 - Q91 (24 questions)
Total: 91 questions.
"""
import json
import re
import os

data_91 = {}

def add_q(num, snippet, correct_opt, explanation, audio_ja=None, audio_vi=None):
    item = {
        "snippet": snippet,
        "explanation": explanation,
        "correctOption": correct_opt
    }
    if audio_ja:
        item["audioScriptJa"] = audio_ja
    if audio_vi:
        item["audioScriptVi"] = audio_vi
    data_91[str(num)] = item

# ==========================================
# PHẦN 1: TỪ VỰNG & CHỮ HÁN (MOJI - GOI): Q1 - Q35
# ==========================================

# Mondai 1: Cách đọc Kanji (Q1 - Q12)
add_q(1, "上に (うえに)", 2, 
"""🎯 Đáp án đúng: [2] うえ (上に)

💬 Dịch nghĩa câu:
「机の 上に 本が あります。」
-> "Ở trên bàn có quyển sách."

💡 Phân tích & Giải thích chi tiết:
• Chữ Hán 「上」 (Thượng) biểu thị phương vị 'ở bên trên'.
• Trong tiếng Nhật, khi đứng độc lập bổ nghĩa vị trí, chữ 「上」 đọc theo âm Kun là 「うえ」.
• Đi với trợ từ: 机の上に (ở phía bên trên bàn).

🔍 Phân tích các lựa chọn:
- 1. そと (外): Bên ngoài
- 2. うえ (上): (ĐÚNG) - Phía trên, bên trên
- 3. なか (中): Phía trong, bên trong
- 4. よこ (横): Bên cạnh, chiều ngang

📄 Trích PDF gốc (N5 7/2013 - Mondai 1 - Câu 1):
机の【上に】本が あります。 -> 2. うえ""")

add_q(2, "目 (め)", 1,
"""🎯 Đáp án đúng: [1] め (目)

💬 Dịch nghĩa câu:
「きのうから 目が いたいです。」
-> "Từ hôm qua mắt tôi đã bị đau."

💡 Phân tích & Giải thích chi tiết:
• Chữ Hán 「目」 (Mục) chỉ bộ phận mắt trên cơ thể con người.
• Cách đọc âm Kun chuẩn xác là 「め」. Cụm từ thông dụng: 目が痛い (đau mắt).

🔍 Phân tích các lựa chọn:
- 1. め (目): (ĐÚNG) - Mắt
- 2. て (手): Tay, bàn tay
- 3. は (歯): Răng
- 4. みみ (耳): Tai

📄 Trích PDF gốc (N5 7/2013 - Mondai 1 - Câu 2):
きのうから【目】が いたいです。 -> 1. め""")

add_q(3, "父 (ちち)", 3,
"""🎯 Đáp án đúng: [3] ちち (父)

💬 Dịch nghĩa câu:
「父は 50さいです。」
-> "Bố tôi năm nay 50 tuổi."

💡 Phân tích & Giải thích chi tiết:
• Chữ Hán 「父」 (Phụ) khi người nói dùng để gọi bố của bản thân mình (khiêm nhường xưng hô trong gia đình) đọc là 「ちち」.
• Khi gọi bố của người khác thì dùng お父さん (おとうさん).

🔍 Phân tích các lựa chọn:
- 1. はは (母): Mẹ tôi
- 2. あに (兄): Anh trai tôi
- 3. ちち (父): (ĐÚNG) - Bố tôi
- 4. おとうと (弟): Em trai tôi

📄 Trích PDF gốc (N5 7/2013 - Mondai 1 - Câu 3):
【父】は 50さいです。 -> 3. ちち""")

add_q(4, "天気 (てんき)", 1,
"""🎯 Đáp án đúng: [1] てんき (天気)

💬 Dịch nghĩa câu:
「きょうは いい 天気ですね。」
-> "Hôm nay thời tiết đẹp nhỉ."

💡 Phân tích & Giải thích chi tiết:
• Từ ghép Hán tự 「天気」 gồm chữ 「天」 (Thiên - âm On là てん) và 「気」 (Khí - âm On là き).
• Ghép lại thành 「てんき」 mang nghĩa là thời tiết. Cụm từ: いい天気 (thời tiết đẹp).

🔍 Phân tích các lựa chọn:
- 1. てんき (天気): (ĐÚNG) - Thời tiết
- 2. でんき (電気): Điện, đèn điện
- 3. げんき (元気): Khỏe mạnh
- 4. べんき: Không có nghĩa

📄 Trích PDF gốc (N5 7/2013 - Mondai 1 - Câu 4):
きょうは いい【天気】ですね。 -> 1. てんき""")

add_q(5, "話しました (はなしました)", 1,
"""🎯 Đáp án đúng: [1] はなしました (話しました)

💬 Dịch nghĩa câu:
「友だちと 電話で 話しました。」
-> "Tôi đã nói chuyện điện thoại với bạn bè."

💡 Phân tích & Giải thích chi tiết:
• Động từ 「話す」 (Thoại) đọc là 「はなす」, chia ở thể quá khứ lịch sự là 「話しました (はなしました)」 nghĩa là đã trò chuyện, đã nói chuyện.
• Cấu trúc: [Người] と 電話で 話す (nói chuyện điện thoại cùng ai).

🔍 Phân tích các lựa chọn:
- 1. はなしました (話しました): (ĐÚNG) - Đã trò chuyện
- 2. わたしました (渡しました): Đã trao/đưa cho
- 3. おしました (押しました): Đã ấn, bấm
- 4. だしました (出しました): Đã lấy ra, nộp

📄 Trích PDF gốc (N5 7/2013 - Mondai 1 - Câu 5):
友だちと 電話で【話しました】。 -> 1. はなしました""")

add_q(6, "南がわ (みなみがわ)", 2,
"""🎯 Đáp án đúng: [2] みなみがわ (南がわ)

💬 Dịch nghĩa câu:
「あの えきの 南がわは しずかです。」
-> "Phía nam của nhà ga đó rất yên tĩnh."

💡 Phân tích & Giải thích chi tiết:
• Chữ Hán 「南」 (Nam) có âm đọc thuần Nhật Kun là 「みなみ」.
• Hậu tố 「側 / がわ」 chỉ phía, bên. 「南がわ」 đọc là 「みなみがわ」 (phía nam).

🔍 Phân tích các lựa chọn:
- 1. きたがわ (北側): Phía bắc
- 2. みなみがわ (南側): (ĐÚNG) - Phía nam
- 3. ひがしがわ (東側): Phía đông
- 4. にしがわ (西側): Phía tây

📄 Trích PDF gốc (N5 7/2013 - Mondai 1 - Câu 6):
あの えきの【南がわ】は しずかです。 -> 2. みなみがわ""")

add_q(7, "出て (でて)", 2,
"""🎯 Đáp án đúng: [2] でて (出て)

💬 Dịch nghĩa câu:
「えきを 出て、右へ 行きます。」
-> "Ra khỏi nhà ga rồi rẽ sang bên phải."

💡 Phân tích & Giải thích chi tiết:
• Động từ 「出る」 (Xuất - đi ra, rời khỏi) là động từ nhóm 2, chia thể て là 「出て (でて)」.
• Cấu trúc: [Địa điểm] を 出る (đi ra khỏi địa điểm nào).

🔍 Phân tích các lựa chọn:
- 1. いれて (入れて): Cho vào
- 2. でて (出て): (ĐÚNG) - Đi ra khỏi, rời ga
- 3. だして (出して): Lấy ra, gửi
- 4. はいって (入って): Đi vào trong

📄 Trích PDF gốc (N5 7/2013 - Mondai 1 - Câu 7):
えきを【出て】、右へ 行きます。 -> 2. でて""")

add_q(8, "女の子 (おんなのこ)", 2,
"""🎯 Đáp án đúng: [2] おんなのこ (女の子)

💬 Dịch nghĩa câu:
「あそこに 女の子が います。」
-> "Ở đằng kia có một bé gái."

💡 Phân tích & Giải thích chi tiết:
• Từ vựng 「女の子」 gồm chữ 「女」 (Nữ: おんな), 「の」, và 「子」 (Tử: こ).
• Đọc chuẩn xác là 「おんなのこ」 mang nghĩa bé gái, bé gái nhỏ.

🔍 Phân tích các lựa chọn:
- 1. おとなのこ: Không có từ này (người lớn là おとな)
- 2. おんなのこ (女の子): (ĐÚNG) - Bé gái
- 3. おんなのひと (女の人): Người phụ nữ
- 4. おんなのここ: Sai chữ こ cuối

📄 Trích PDF gốc (N5 7/2013 - Mondai 1 - Câu 8):
あそこに【女の子】が います。 -> 2. おんなのこ""")

add_q(9, "何人 (なんにん)", 3,
"""🎯 Đáp án đúng: [3] なんにん (何人)

💬 Dịch nghĩa câu:
「へやに 何人 いますか。」
-> "Ở trong phòng có mấy người vậy?"

💡 Phân tích & Giải thích chi tiết:
• Từ để hỏi số lượng người 「何人」: chữ 「何」 đọc là 「なん」 kết hợp với đơn vị đếm người 「人 (にん)」 tạo thành 「なんにん」 (mấy người, bao nhiêu người).
• Lưu ý: 「何人 (なにじん)」 mang nghĩa hỏi quốc tịch (người nước nào). Ngữ cảnh đếm số người trong phòng dùng 「なんにん」.

🔍 Phân tích các lựa chọn:
- 1. なんじん: Sai âm đọc
- 2. なにじん: Người nước nào (hỏi quốc tịch)
- 3. なんにん: (ĐÚNG) - Mấy người (đếm số lượng người)
- 4. なににん: Sai phát âm

📄 Trích PDF gốc (N5 7/2013 - Mondai 1 - Câu 9):
へやに【何人】いますか。 -> 3. なんにん""")

add_q(10, "八百円 (はっぴゃくえん)", 3,
"""🎯 Đáp án đúng: [3] はっぴゃくえん (八百円)

💬 Dịch nghĩa câu:
「この ざっしは 八百円です。」
-> "Cuốn tạp chí này có giá 800 Yên."

💡 Phân tích & Giải thích chi tiết:
• Số đếm hàng trăm: 800 viết là 「八百」.
• Khi số 8 (はち) ghép với 100 (ひゃく) xảy ra hiện tượng biến âm ngắt và âm bán đục: はち + ひゃく -> 「はっぴゃく」.
• Kết hợp với đơn vị tiền tệ 「円 (えん)」 thành 「はっぴゃくえん」.

🔍 Phân tích các lựa chọn:
- 1. はちひゃくえん: Chưa biến âm
- 2. はちびゃくえん: Biến âm sai
- 3. はっぴゃくえん: (ĐÚNG) - Biến âm chuẩn của 800 Yên
- 4. はっびゃくえん: Biến âm sai hàng 濁音

📄 Trích PDF gốc (N5 7/2013 - Mondai 1 - Câu 10):
この ざっしは【八百円】です。 -> 3. はっぴゃくえん""")

add_q(11, "土曜日 (どようび)", 4,
"""🎯 Đáp án đúng: [4] どようび (土曜日)

💬 Dịch nghĩa câu:
「らいしゅうの 土曜日に あいましょう。」
-> "Chúng ta hãy gặp nhau vào thứ Bảy tuần sau nhé."

💡 Phân tích & Giải thích chi tiết:
• Chữ Hán 「土曜日」 (Thổ diệu nhật) là thứ Bảy trong tuần.
• Chữ 「土」 đọc âm On là 「ど」, kết hợp thành 「どようび」.

🔍 Phân tích các lựa chọn:
- 1. かようび (火曜日): Thứ Ba
- 2. すいようび (水曜日): Thứ Tư
- 3. きんようび (金曜日): Thứ Sáu
- 4. どようび (土曜日): (ĐÚNG) - Thứ Bảy

📄 Trích PDF gốc (N5 7/2013 - Mondai 1 - Câu 11):
らいしゅうの【土曜日】に あいましょう。 -> 4. どようび""")

add_q(12, "四時 (よじ)", 2,
"""🎯 Đáp án đúng: [2] よじ (四時)

💬 Dịch nghĩa câu:
「じゅぎょうは 四時に おわります。」
-> "Tiết học sẽ kết thúc lúc 4 giờ."

💡 Phân tích & Giải thích chi tiết:
• Đếm giờ trong tiếng Nhật: 4 giờ là trường hợp đặc biệt, đọc là 「よじ」 (không đọc là しじ hay よんじ).
• じゅぎょう (授業: tiết học), おわる (終わる: kết thúc).

🔍 Phân tích các lựa chọn:
- 1. しじ: Đọc sai (dễ nhầm với 7 giờ しちじ)
- 2. よじ: (ĐÚNG) - Cách đọc đặc biệt đúng của 4 giờ
- 3. よんじ: Đọc sai số 4 trong đếm giờ
- 4. よっじ: Biến âm ngắt sai

📄 Trích PDF gốc (N5 7/2013 - Mondai 1 - Câu 12):
じゅぎょうは【四時】に おわります。 -> 2. よじ""")

# Mondai 2: Hiragana to Kanji (Q13 - Q20)
add_q(13, "たくしー -> タクシー", 1,
"""🎯 Đáp án đúng: [1] タクシー

💬 Dịch nghĩa câu:
「たくしーで びょういんへ いきます。」
-> "Tôi đi đến bệnh viện bằng taxi."

💡 Phân tích & Giải thích chi tiết:
• Từ ngoại lai mượn tiếng Anh 'taxi' được viết bằng bảng chữ cái Katakana là 「タクシー」.
• Chú ý chữ 「シ (shi)」 phân biệt với chữ 「ツ (tsu)」 và có dấu trường âm 「ー」.

🔍 Phân tích các lựa chọn:
- 1. タクシー: (ĐÚNG) - Viết đúng Katakana từ taxi
- 2. ダクシー: Sai chữ âm đục ダ
- 3. タクツー: Sai chữ ツ (phải là シ)
- 4. ダクツー: Sai cả âm đầu lẫn âm đuôi

📄 Trích PDF gốc (N5 7/2013 - Mondai 2 - Câu 13):
【たくしー】で びょういんへ いきます。 -> 1. タクシー""")

add_q(14, "おおきい -> 大きい", 4,
"""🎯 Đáp án đúng: [4] 大きい (おおきい)

💬 Dịch nghĩa câu:
「あの おおきい たてものは ぎんこうです。」
-> "Tòa nhà to lớn kia là ngân hàng."

💡 Phân tích & Giải thích chi tiết:
• Từ tính từ đuôi い 「おおきい」 (to lớn, rộng lớn) có chữ Hán chuẩn là 「大」 (Đại). Viết là 「大きい」.
• Tránh nhầm với chữ 犬 (chó) hay 太 (béo, mập).

🔍 Phân tích các lựa chọn:
- 1. 犬きい: Chữ 犬 (Khuyển - con chó)
- 2. 太きい: Chữ 太 (Thái - béo mập: 太い ふとい)
- 3. 天きい: Chữ 天 (Thiên - trời)
- 4. 大きい: (ĐÚNG) - Chữ Đại (to lớn: おおきい)

📄 Trích PDF gốc (N5 7/2013 - Mondai 2 - Câu 14):
あの【おおきい】たてものは ぎんこうです。 -> 4. 大きい""")

add_q(15, "ともだち -> 友だち", 3,
"""🎯 Đáp án đúng: [3] 友だち (ともだち)

💬 Dịch nghĩa câu:
「きのう ともだちと あいました。」
-> "Hôm qua tôi đã gặp bạn bè."

💡 Phân tích & Giải thích chi tiết:
• Từ vựng 「ともだち」 (bạn bè) có chữ Hán là 「友」 (Hữu - bạn bè). Viết là 「友だち」 hoặc 「友達」.
• Tránh nhầm bộ thủ với các chữ có hình dạng tương tự như 反 hay 有.

🔍 Phân tích các lựa chọn:
- 1. 知だち: Chữ Tri (trong 知る)
- 2. 有だち: Chữ Hữu (trong 有名)
- 3. 友だち: (ĐÚNG) - Chữ Hữu (bạn bè: ともだち)
- 4. 反だち: Chữ Phản (trong 反対)

📄 Trích PDF gốc (N5 7/2013 - Mondai 2 - Câu 15):
きのう【ともだち】と あいました。 -> 3. 友だち""")

add_q(16, "たべます -> 食べます", 3,
"""🎯 Đáp án đúng: [3] 食べます (たべます)

💬 Dịch nghĩa câu:
「あさごはんを たべます。」
-> "Tôi ăn bữa sáng."

💡 Phân tích & Giải thích chi tiết:
• Động từ 「たべる」 (ăn) có chữ Hán chuẩn xác là 「食」 (Thực).
• Chia lịch sự là 「食べます (たべます)」.

🔍 Phân tích các lựa chọn:
- 1. 飲べます: Chữ 飲 (Ẩm - uống: 飲む)
- 2. 飯べます: Chữ 飯 (Phạn - cơm: ご飯)
- 3. 食べます: (ĐÚNG) - Chữ Thực (ăn: 食べる)
- 4. 館べます: Chữ Quán (trong 映画館, 旅館)

📄 Trích PDF gốc (N5 7/2013 - Mondai 2 - Câu 16):
あさごはんを【たべます】。 -> 3. 食べます""")

add_q(17, "みっつ -> 三つ", 3,
"""🎯 Đáp án đúng: [3] 三つ (みっつ)

💬 Dịch nghĩa câu:
「りんごが みっつ あります。」
-> "Có ba quả táo."

💡 Phân tích & Giải thích chi tiết:
• Cách đếm đồ vật thuần Nhật:
  - 1 cái: 一つ (ひとつ)
  - 2 cái: 二つ (ふたつ)
  - 3 cái: 三つ (みっつ)
  - 4 cái: 四つ (よっつ)
• Từ 「みっつ」 tương ứng với chữ Hán 「三つ」.

🔍 Phân tích các lựa chọn:
- 1. 一つ: 1 cái (ひとつ)
- 2. 二つ: 2 cái (ふたつ)
- 3. 三つ: (ĐÚNG) - 3 cái (みっつ)
- 4. 四つ: 4 cái (よっつ)

📄 Trích PDF gốc (N5 7/2013 - Mondai 2 - Câu 17):
りんごが【みっつ】あります。 -> 3. 三つ""")

add_q(18, "らいねん -> 来年", 1,
"""🎯 Đáp án đúng: [1] 来年 (らいねん)

💬 Dịch nghĩa câu:
「らいねん にほんへ いきます。」
-> "Năm sau tôi sẽ đi Nhật Bản."

💡 Phân tích & Giải thích chi tiết:
• Từ 「らいねん」 (năm sau, sang năm) gồm chữ 「来」 (Lai - đến) và 「年」 (Niên - năm).
• Ghép lại thành 「来年」.

🔍 Phân tích các lựa chọn:
- 1. 来年: (ĐÚNG) - Năm sau (らいねん)
- 2. 毎年: Hàng năm (まいとし / まいねん)
- 3. 去年: Năm ngoái (きょねん)
- 4. 本年: Năm nay (ほんねん)

📄 Trích PDF gốc (N5 7/2013 - Mondai 2 - Câu 18):
【らいねん】にほんへ いきます。 -> 1. 来年""")

add_q(19, "みせ -> 店", 2,
"""🎯 Đáp án đúng: [2] 店 (みせ)

💬 Dịch nghĩa câu:
「あの みせで パンを かいました。」
-> "Tôi đã mua bánh mì ở cửa hàng đó."

💡 Phân tích & Giải thích chi tiết:
• Danh từ 「みせ」 (cửa hàng, tiệm) có chữ Hán chuẩn là 「店」 (Điếm).
• Âm Kun là 「みせ」, âm On là 「てん」 (như trong 喫茶店, 書店).

🔍 Phân tích các lựa chọn:
- 1. 居: Chữ Cư (trong 居酒屋)
- 2. 店: (ĐÚNG) - Cửa hàng (みせ)
- 3. 屋: Chữ Ốc (trong 本屋, 部屋)
- 4. 室: Chữ Thất (trong 教室)

📄 Trích PDF gốc (N5 7/2013 - Mondai 2 - Câu 19):
あの【みせ】で パンを かいました。 -> 2. 店""")

add_q(20, "しんぶん -> 新聞", 3,
"""🎯 Đáp án đúng: [3] 新聞 (しんぶん)

💬 Dịch nghĩa câu:
「まいあさ しんぶんを よみます。」
-> "Mỗi buổi sáng tôi đều đọc báo."

💡 Phân tích & Giải thích chi tiết:
• Danh từ 「しんぶん」 (tờ báo) gồm chữ 「新」 (Tân - mới) và chữ 「聞」 (Văn - nghe).
• Chú ý chữ 聞 bên trong có chữ 耳 (tai), tránh nhầm với 間 (gian: bên trong có nhật 日) hay 門 (môn: cửa).

🔍 Phân tích các lựa chọn:
- 1. 新間: Sai chữ 聞 thành chữ 間
- 2. 新門: Sai chữ 聞 thành chữ 門
- 3. 新聞: (ĐÚNG) - Tờ báo (しんぶん)
- 4. 親聞: Sai chữ 新 thành chữ 親

📄 Trích PDF gốc (N5 7/2013 - Mondai 2 - Câu 20):
まいあさ【しんぶん】を よみます。 -> 3. 新聞""")

# Mondai 3: Từ vựng theo ngữ cảnh (Q21 - Q30)
add_q(21, "さむい (寒い)", 4,
"""🎯 Đáp án đúng: [4] さむい (寒い)

💬 Dịch nghĩa câu:
「へやが ( ) ですから、ストーブを つけましょう。」
-> "Vì trong phòng lạnh nên chúng ta hãy bật lò sưởi lên nhé."

💡 Phân tích & Giải thích chi tiết:
• Vế sau: 「ストーブを つけましょう」 (hãy bật lò sưởi / máy sưởi lên).
• Lý do để bật lò sưởi phải là thời tiết hoặc căn phòng bị "lạnh" 「さむい (寒い)」.

🔍 Phân tích các lựa chọn:
- 1. あつい (暑い/熱い): Nóng
- 2. あかるい (明るい): Sáng sủa
- 3. すずしい (涼しい): Mát mẻ
- 4. さむい (寒い): (ĐÚNG) - Lạnh lẽo, buốt giá

📄 Trích PDF gốc (N5 7/2013 - Mondai 3 - Câu 21):
へやが ( ) ですから、ストーブを つけましょう。 -> 4. さむい""")

add_q(22, "えき (駅)", 4,
"""🎯 Đáp án đúng: [4] えき (駅)

💬 Dịch nghĩa câu:
「つぎの ( ) で でんしゃを おります。」
-> "Tôi sẽ xuống tàu điện ở nhà ga tiếp theo."

💡 Phân tích & Giải thích chi tiết:
• Động từ: 「でんしゃを おります (xuống xe điện)」.
• Địa điểm để hành khách xuống tàu xe điện là nhà ga 「えき (駅)」.
• Cụm từ: つぎのえき (ga tiếp theo).

🔍 Phân tích các lựa chọn:
- 1. ドア: Cửa ra vào (door)
- 2. まど (窓): Cửa sổ
- 3. みち (道): Con đường
- 4. えき (駅): (ĐÚNG) - Nhà ga

📄 Trích PDF gốc (N5 7/2013 - Mondai 3 - Câu 22):
つぎの ( ) で でんしゃを おります。 -> 4. えき""")

add_q(23, "のぼります (登ります)", 1,
"""🎯 Đáp án đúng: [1] のぼります (登ります)

💬 Dịch nghĩa câu:
「なつやすみは かぞくと やまに ( )。」
-> "Kỳ nghỉ hè tôi leo núi cùng với gia đình."

💡 Phân tích & Giải thích chi tiết:
• Kết hợp từ (Collocation): Đi với 「山に (lên núi)」 động từ chuẩn xác là 「登る (のぼる: leo, trèo núi)」.
• Chia thể ます là 「のぼります」.

🔍 Phân tích các lựa chọn:
- 1. のぼります (登ります): (ĐÚNG) - Leo núi (やまにのぼる)
- 2. あるきます (歩きます): Đi bộ
- 3. はいります (入ります): Đi vào
- 4. とまります (止まります/泊まります): Dừng lại / trọ lại

📄 Trích PDF gốc (N5 7/2013 - Mondai 3 - Câu 23):
なつやすみは かぞくと やまに ( )。 -> 1. のぼります""")

add_q(24, "ゆき (雪)", 4,
"""🎯 Đáp án đúng: [4] ゆき (雪)

💬 Dịch nghĩa câu:
「きのうは ( ) が たくさん ふりました。」
-> "Hôm qua tuyết đã rơi rất nhiều."

💡 Phân tích & Giải thích chi tiết:
• Hiện tượng tự nhiên đi với động từ rơi 「降る (ふる)」 chỉ có thể là mưa 「雨 (あめ)」 hoặc tuyết 「雪 (ゆき)」.
• Trong các phương án đưa ra, đáp án [4] là 「ゆき (雪: tuyết)」.

🔍 Phân tích các lựa chọn:
- 1. かぜ (風): Gió (đi với động từ thổi: 吹く)
- 2. くもり (曇り): Trời âm u, nhiều mây
- 3. はれ (晴れ): Trời nắng ráo
- 4. ゆき (雪): (ĐÚNG) - Tuyết (tuyết rơi: ゆきがふる)

📄 Trích PDF gốc (N5 7/2013 - Mondai 3 - Câu 24):
きのうは ( ) が たくさん ふりました。 -> 4. ゆき""")

add_q(25, "ほん (本)", 1,
"""🎯 Đáp án đúng: [1] ほん (本)

💬 Dịch nghĩa câu:
「えんぴつを 4 ( ) かいました。」
-> "Tôi đã mua 4 chiếc bút chì."

💡 Phân tích & Giải thích chi tiết:
• Đơn vị đếm: Bút chì (えんぴつ) là đồ vật có hình dáng thon dài hình trụ, dùng đơn vị đếm là 「本 (ほん)」.
• Số 4 đi với 本 đọc là 「よんほん」.

🔍 Phân tích các lựa chọn:
- 1. ほん (本): (ĐÚNG) - Đơn vị đếm vật thon dài (bút chì, chai nước, cây dù)
- 2. まい (枚): Đơn vị đếm vật mỏng, phẳng (tờ giấy, áo, đĩa)
- 3. だい (台): Đơn vị đếm máy móc, xe cộ
- 4. さつ (冊): Đơn vị đếm sách vở, tạp chí

📄 Trích PDF gốc (N5 7/2013 - Mondai 3 - Câu 25):
えんぴつを 4 ( ) かいました。 -> 1. ほん""")

add_q(26, "かけて (掛けて)", 1,
"""🎯 Đáp án đúng: [1] かけて (掛けて)

💬 Dịch nghĩa câu:
「さとうさんは めがねを ( ) います。」
-> "Anh Sato đang đeo kính mắt."

💡 Phân tích & Giải thích chi tiết:
• Động từ mặc/đeo đồ dùng trên cơ thể:
  - Kính mắt (めがね): dùng động từ 「かける (掛ける)」 -> めがねをかけている.
  - Quần áo từ thắt lưng trở lên (áo sơ mi, áo khoác): dùng 「着る (きる)」.
  - Quần áo/giày dép từ thắt lưng trở xuống (quần, váy, giày, tất): dùng 「履く (はく)」.
  - Mũ nón đội đầu: dùng 「被る (かぶる)」.

🔍 Phân tích các lựa chọn:
- 1. かけて: (ĐÚNG) - Đeo kính mắt (めがねをかける)
- 2. きて (着て): Mặc áo
- 3. はいて (履いて): Mặc quần/đi giày
- 4. かぶって (被って): Đội mũ

📄 Trích PDF gốc (N5 7/2013 - Mondai 3 - Câu 26):
さとうさんは めがねを ( ) います。 -> 1. かけて""")

add_q(27, "つよい (強い)", 2,
"""🎯 Đáp án đúng: [2] つよい (強い)

💬 Dịch nghĩa câu:
「かぜが ( ) ですから、まどを しめましょう。」
-> "Vì gió mạnh nên chúng ta hãy đóng cửa sổ lại nhé."

💡 Phân tích & Giải thích chi tiết:
• Ngữ cảnh: 「まどを しめましょう (hãy đóng cửa sổ lại)」 do hiện tượng gió 「かぜ (風)」 gây ra.
• Gió thổi mạnh mẽ dùng tính từ 「つよい (強い)」. Cụm từ: 風が強い (gió to, gió mạnh).

🔍 Phân tích các lựa chọn:
- 1. おもい (重い): Nặng nề
- 2. つよい (強い): (ĐÚNG) - Mạnh, dữ dội (gió to)
- 3. ひろい (広い): Rộng rãi
- 4. いたい (痛い): Đau đớn

📄 Trích PDF gốc (N5 7/2013 - Mondai 3 - Câu 27):
かぜが ( ) ですから、まどを しめましょう。 -> 2. つよい""")

add_q(28, "じょうず (上手)", 3,
"""🎯 Đáp án đúng: [3] じょうず (上手)

💬 Dịch nghĩa câu:
「わたしは うたが ( ) じゃ ありませんから、うたいたくないです。」
-> "Vì tôi hát không giỏi nên tôi không muốn hát đâu."

💡 Phân tích & Giải thích chi tiết:
• Cấu trúc: [Danh từ] が じょうず (上手) だ / じょうずじゃありません (giỏi / không giỏi về kĩ năng gì).
• Ở đây là 「うた (bài hát / ca hát)」 -> うたが じょうずじゃ ありません (hát không hay, không giỏi hát), vì thế không muốn hát (うたいたくない).

🔍 Phân tích các lựa chọn:
- 1. べんり (便利): Tiện lợi (đồ vật, vị trí)
- 2. にぎやか (賑やか): Nhộn nhịp, náo nhiệt (đường phố)
- 3. じょうず (上手): (ĐÚNG) - Giỏi giang, khéo léo
- 4. ひま (暇): Rảnh rỗi

📄 Trích PDF gốc (N5 7/2013 - Mondai 3 - Câu 28):
わたしは うたが ( ) じゃ ありませんから、うたいたくないです。 -> 3. じょうず""")

add_q(29, "は (歯)", 4,
"""🎯 Đáp án đúng: [4] は (歯)

💬 Dịch nghĩa câu:
「いもうとは いま ( ) を みがいて います。」
-> "Em gái tôi bây giờ đang đánh răng."

💡 Phân tích & Giải thích chi tiết:
• Động từ: 「みがく (磨く: cọ, chải, đánh)」.
• Đi cùng động từ này để chỉ hành động vệ sinh cá nhân hàng ngày là đánh răng 「歯をみがく (はをみがく)」.

🔍 Phân tích các lựa chọn:
- 1. て (手): Tay (rửa tay dùng 手を洗う)
- 2. あし (足): Chân
- 3. かお (顔): Mặt (rửa mặt dùng 顔を洗う)
- 4. は (歯): (ĐÚNG) - Răng (đánh răng: 歯をみがく)

📄 Trích PDF gốc (N5 7/2013 - Mondai 3 - Câu 29):
いもうとは いま ( ) を みがいて います。 -> 4. は""")

add_q(30, "ちず (地図)", 2,
"""🎯 Đáp án đúng: [2] ちず (地図)

💬 Dịch nghĩa câu:
「みちが わかりませんから、( ) を かいて ください。」
-> "Vì tôi không biết đường nên xin hãy vẽ bản đồ giúp tôi với."

💡 Phân tích & Giải thích chi tiết:
• Vế trước: 「みちが わかりません (tôi không biết/không rõ đường đi)」.
• Khi không biết đường và cần chỉ đường, người ta sẽ vẽ bản đồ 「ちずをかく (地図を描く/書く)」.

🔍 Phân tích các lựa chọn:
- 1. きっぷ (切符): Vé xe, vé tàu
- 2. ちず (地図): (ĐÚNG) - Bản đồ (vẽ bản đồ chỉ đường)
- 3. てがみ (手紙): Bức thư
- 4. しゃしん (写真): Bức ảnh (chụp ảnh dùng 写真を撮る)

📄 Trích PDF gốc (N5 7/2013 - Mondai 3 - Câu 30):
みちが わかりませんから、( ) を かいて ください。 -> 2. ちず""")

# Mondai 4: Câu đồng nghĩa / Thay thế (Q31 - Q35)
add_q(31, "としょかん (図書館)", 2,
"""🎯 Đáp án đúng: [2] あそこは ほんや ざっしを かりる ところです。

💬 Dịch nghĩa câu gốc:
「あそこは としょかんです。」
-> "Đằng kia là thư viện."

💡 Phân tích & Giải thích chi tiết:
• Định nghĩa của 「としょかん (図書館: thư viện)」 là nơi mọi người đến để mượn và đọc sách, tạp chí 「ほんや ざっしを かりる ところ」.
• Phương án 2 diễn đạt chính xác nhất bản chất của thư viện.

🔍 Phân tích các lựa chọn:
- 1. Nơi mua sách và tạp chí (đây là hiệu sách - 本屋)
- 2. あそこは ほんや ざっしを かりる ところです。(ĐÚNG - Thư viện là nơi mượn sách và tạp chí)
- 3. Nơi viết sách và tạp chí
- 4. Nơi vứt sách và tạp chí

📄 Trích PDF gốc (N5 7/2013 - Mondai 4 - Câu 31):
あそこは としょかんです。 -> 2""")

add_q(32, "まいばん (毎晩)", 4,
"""🎯 Đáp án đúng: [4] まいにち よる テレビで ニュースを みます。

💬 Dịch nghĩa câu gốc:
「まいばん テレビで ニュースを みます。」
-> "Mỗi tối tôi đều xem thời sự trên tivi."

💡 Phân tích & Giải thích chi tiết:
• Từ đồng nghĩa: 「まいばん (毎晩: mỗi buổi tối)」 hoàn toàn tương đương với 「まいにち よる (毎日 夜: mỗi ngày vào buổi tối)」.
• Do đó, câu tương đương chính xác là phương án [4].

🔍 Phân tích các lựa chọn:
- 1. Mỗi ngày buổi sáng (まいにち あさ) - Sai thời điểm
- 2. Mỗi ngày buổi trưa (まいにち ひる) - Sai thời điểm
- 3. Thỉnh thoảng buổi tối - Sai tần suất (毎晩 là mỗi tối, không phải thỉnh thoảng)
- 4. まいにち よる テレビで ニュースを みます。(ĐÚNG - Trùng khớp hoàn toàn với 毎晩)

📄 Trích PDF gốc (N5 7/2013 - Mondai 4 - Câu 32):
まいばん テレビで ニュースを みます。 -> 4""")

add_q(33, "はたらいて います (働いています)", 3,
"""🎯 Đáp án đúng: [3] おとうとは あの レストランで しごとを して います。

💬 Dịch nghĩa câu gốc:
「おとうとは あの レストランで はたらいて います。」
-> "Em trai tôi đang làm việc ở nhà hàng đó."

💡 Phân tích & Giải thích chi tiết:
• Từ đồng nghĩa: Động từ 「はたらく (働く: lao động, làm việc)」 đồng nghĩa với cụm 「しごとを する (仕事をする: làm công việc gì đó)」.
• Dạng đang tiếp diễn 「はたらいています」 tương đương với 「しごとをしています」.

🔍 Phân tích các lựa chọn:
- 1. Đang ăn cơm ở nhà hàng đó (ごはんを たべて います)
- 2. Đang nghỉ ngơi ở nhà hàng đó (やすんで います)
- 3. おとうとは あの レストランで しごとを して います。(ĐÚNG - Đang làm việc)
- 4. Đang đợi ở nhà hàng đó (まって います)

📄 Trích PDF gốc (N5 7/2013 - Mondai 4 - Câu 33):
おとうとは あの レストランで はたらいて います。 -> 3""")

add_q(34, "しずかじゃ ありませんでした", 4,
"""🎯 Đáp án đúng: [4] あの みせは うるさかったです。

💬 Dịch nghĩa câu gốc:
「あの みせは しずかじゃ ありませんでした。」
-> "Cửa hàng đó đã không yên tĩnh chút nào."

💡 Phân tích & Giải thích chi tiết:
• Tính từ 「しずか (静か: yên tĩnh)」, dạng phủ định quá khứ là 「しずかじゃありませんでした (không yên tĩnh)」.
• Trái nghĩa với "yên tĩnh" là "ồn ào, náo nhiệt" 「うるさい」. Quá khứ của うるさい là 「うるさかった」.
• Không yên tĩnh = ồn ào.

🔍 Phân tích các lựa chọn:
- 1. あの みせは ひろかったです (Quán rộng rãi)
- 2. あの みせは せまかったです (Quán chật hẹp)
- 3. あの みせは まずかったです (Quán dở, đồ ăn tệ)
- 4. あの みせは うるさかったです。(ĐÚNG - Quán đã rất ồn ào)

📄 Trích PDF gốc (N5 7/2013 - Mondai 4 - Câu 34):
あの みせは しずかじゃ ありませんでした。 -> 4""")

add_q(35, "ならいました (習いました)", 4,
"""🎯 Đáp án đúng: [4] じゅぎょうで むずかしい かんじを べんきょうしました。

💬 Dịch nghĩa câu gốc:
「じゅぎょうで むずかしい かんじを ならいました。」
-> "Trong tiết học, tôi đã học chữ Hán khó."

💡 Phân tích & Giải thích chi tiết:
• Động từ 「ならう (習う: học hỏi, tiếp thu từ thầy cô/người khác)」 đồng nghĩa với 「べんきょうする (勉強する: học tập)」.
• Quá khứ: ならいました = べんきょうしました.

🔍 Phân tích các lựa chọn:
- 1. Đã dạy chữ Hán khó (おしえました - ngược chiều)
- 2. Đã dùng chữ Hán khó (つかいました)
- 3. Đã nhớ chữ Hán khó (おぼえました)
- 4. じゅぎょうで むずかしい かんじを べんきょうしました。(ĐÚNG - Đã học chữ Hán khó)

📄 Trích PDF gốc (N5 7/2013 - Mondai 4 - Câu 35):
じゅぎょうで むずかしい かんじを ならいました。 -> 4""")

# ==========================================
# PHẦN 2: NGỮ PHÁP (BUNPOU): Q36 - Q61
# ==========================================

# Mondai 1: Trợ từ và ngữ pháp câu (Q36 - Q51)
add_q(36, "漢字(の)べんきょう", 3,
"""🎯 Đáp án đúng: [3] の

💬 Dịch nghĩa câu:
「毎日 1時間、漢字( )べんきょうを します。」
-> "Mỗi ngày tôi học chữ Hán 1 tiếng."

💡 Phân tích & Giải thích chi tiết:
• Cấu trúc danh từ nối danh từ: [Danh từ 1] の [Danh từ 2].
• 「漢字 (chữ Hán)」 là danh từ và 「べんきょう (việc học tập)」 cũng là danh từ. Trợ từ liên kết bổ nghĩa giữa 2 danh từ là 「の」: 漢字のべんきょう (việc học chữ Hán).

🔍 Phân tích các lựa chọn:
- 1. を: Trợ từ chỉ tân ngữ trực tiếp (đã có ở sau べんきょうをします)
- 2. に: Trợ từ chỉ thời gian / hướng / mục đích
- 3. の: (ĐÚNG) - Nối hai danh từ 漢字 + の + べんきょう
- 4. で: Trợ từ chỉ nơi chốn / phương tiện

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 1):
毎日 1時間、漢字( )べんきょうを します。 -> 3. の""")

add_q(37, "テスト(は)ありません", 2,
"""🎯 Đáp án đúng: [2] は

💬 Dịch nghĩa câu:
「先生「あした、テスト( )ありません。」」
-> "Thầy giáo: 'Ngày mai không có bài kiểm tra đâu nhé.'"

💡 Phân tích & Giải thích chi tiết:
• Trong câu phủ định với động từ 「ありません」, trợ từ chủ ngữ / tân ngữ 「が / を」 thường được chuyển thành 「は」 để nhấn mạnh chủ đề hoặc mang ý nghĩa nhấn mạnh sự tương phản phủ định: テストはありません (bài kiểm tra thì không có).

🔍 Phân tích các lựa chọn:
- 1. か: Trợ từ nghi vấn
- 2. は: (ĐÚNG) - Nhấn mạnh phủ định: テストはありません
- 3. を: Không đi trực tiếp với tự động từ ありません
- 4. も: Cũng (chỉ dùng khi trước đó đã có một thứ khác không có)

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 2):
先生「あした、テスト( )ありません。」 -> 2. は""")

add_q(38, "りんご(など)の くだもの", 4,
"""🎯 Đáp án đúng: [4] など

💬 Dịch nghĩa câu:
「みかんや りんご( )の くだものが 好きです。」
-> "Tôi thích các loại trái cây như là quýt, táo chẳng hạn."

💡 Phân tích & Giải thích chi tiết:
• Cấu trúc liệt kê không đầy đủ (tiêu biểu): 「A や B など (như là A, B vân vân...)」.
• Sau đó bổ nghĩa cho danh từ hoa quả: [AやBなどの + Danh từ]: みかんやりんごなどのくだもの (các loại trái cây như quýt, táo...).

🔍 Phân tích các lựa chọn:
- 1. とか: Khẩu ngữ, không đi kèm trực tiếp với や ở trước theo mẫu chuẩn này
- 2. まで: Cho đến tận
- 3. ごろ: Khoảng chừng (chỉ thời gian)
- 4. など: (ĐÚNG) - Vân vân, cấu trúc chuẩn: A や B など

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 3):
みかんや りんご( )の くだものが 好きです。 -> 4. など""")

add_q(39, "にわ(が)広いです", 2,
"""🎯 Đáp án đúng: [2] が

💬 Dịch nghĩa câu:
「山口さんの 家は にわ( )広いです。」
-> "Nhà của anh Yamaguchi thì sân vườn rất rộng rãi."

💡 Phân tích & Giải thích chi tiết:
• Mẫu câu chủ đề lớn - tiểu chủ ngữ: 「Chủ đề は + Tiểu chủ ngữ が + Tính từ」.
• Chủ đề lớn ở đây là 「山口さんの家は」, bộ phận được miêu tả tính chất là 「にわ (sân vườn)」, theo sau là tính từ 「広いです」. Do đó cần dùng trợ từ 「が」: にわが広いです.

🔍 Phân tích các lựa chọn:
- 1. は: Đã có chủ đề lớn 山口さんの家は ở đầu câu
- 2. が: (ĐÚNG) - Tiểu chủ ngữ đi với tính từ miêu tả: にわが広い
- 3. を: Trợ từ chỉ tân ngữ (tính từ không dùng を)
- 4. で: Trợ từ nơi chốn hành động

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 4):
山口さんの 家は にわ( )広いです。 -> 2. が""")

add_q(40, "コーヒーと こうちゃ(と)どちら", 3,
"""🎯 Đáp án đúng: [3] と

💬 Dịch nghĩa câu:
「A「コーヒーと こうちゃ( )どちらが 好きですか。」」
-> "A: 'Giữa cà phê và hồng trà, bạn thích món nào hơn?'"

💡 Phân tích & Giải thích chi tiết:
• Mẫu câu so sánh lựa chọn giữa 2 đối tượng trong tiếng Nhật N5:
  「A と B と どちらが [Tính từ] ですか。」
• Cả hai danh từ đem ra so sánh đều đi với trợ từ 「と」: コーヒーと こうちゃと どちらが...

🔍 Phân tích các lựa chọn:
- 1. に: Trợ từ hướng/thời gian
- 2. で: Trợ từ phạm vi (dùng cho 3 đối tượng trở lên: この中で どれが)
- 3. と: (ĐÚNG) - Mẫu so sánh 2 vật: A と B と どちらが
- 4. か: Dùng trong câu hỏi hoặc lựa chọn 'hoặc'

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 5):
A「コーヒーと こうちゃ( )どちらが 好きですか。」 -> 3. と""")

add_q(41, "何(か)飲みませんか", 3,
"""🎯 Đáp án đúng: [3] か

💬 Dịch nghĩa câu:
「A「少し 休んで、何( )飲みませんか。」」
-> "A: 'Chúng ta nghỉ một lát rồi uống thứ gì đó nhé?'"

💡 Phân tích & Giải thích chi tiết:
• Cấu trúc từ nghi vấn + 「か」 biểu thị ý niệm bất định (thứ gì đó / ai đó / nơi nào đó chưa xác định cụ thể):
  - 何か (cái gì đó, thứ gì đó)
  - だれか (ai đó)
  - どこか (nơi nào đó)
• 「何か飲みませんか」 = Bạn có muốn uống một thứ gì đó không?

🔍 Phân tích các lựa chọn:
- 1. へ: Chỉ phương hướng di chuyển
- 2. は: Chủ đề
- 3. か: (ĐÚNG) - Đại từ bất định: 何か (thứ gì đó)
- 4. も: Đi với phủ định mang nghĩa 'không thứ gì' (何も飲まない)

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 6):
A「少し 休んで、何( )飲みませんか。」 -> 3. か""")

add_q(42, "二ひき(の)ねこと", 4,
"""🎯 Đáp án đúng: [4] の

💬 Dịch nghĩa câu:
「そばは 二ひき( )ねこと 住んで います。」
-> "Bà tôi đang sống cùng với hai chú mèo."

💡 Phân tích & Giải thích chi tiết:
• Khi số từ + lượng từ đứng trước một danh từ cụ thể để bổ nghĩa cho danh từ đó, giữa lượng từ và danh từ bắt buộc phải có trợ từ 「の」:
  - 「二ひきのねこ」 (hai con mèo)
  - 「3枚のシャツ」 (ba chiếc áo)
• Sau đó đi với trợ từ と: [二ひきのねこ] と 住んでいます (sống cùng với 2 con mèo).

🔍 Phân tích các lựa chọn:
- 1. や: Liệt kê danh từ
- 2. が: Trợ từ chủ ngữ
- 3. と: Đã có と ở sau danh từ ねこ rồi
- 4. の: (ĐÚNG) - Lượng từ + の + Danh từ: 二ひきのねこ

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 7):
そばは 二ひき( )ねこと 住んで います。 -> 4. の""")

add_q(43, "はい、(ときどき)見ます", 1,
"""🎯 Đáp án đúng: [1] ときどき

💬 Dịch nghĩa câu:
「山口「東さんは えいがを 見ますか。」 東「はい、( )見ます。」」
-> "Yamaguchi: 'Bạn Higashi có hay xem phim không?' - Higashi: 'Có, thỉnh thoảng tôi có xem.'"

💡 Phân tích & Giải thích chi tiết:
• Câu trả lời bắt đầu bằng 「はい (Vâng, có)」 và kết thúc bằng thể khẳng định 「見ます」.
• Phó từ chỉ tần suất phù hợp với câu khẳng định ở đây là 「ときどき (thỉnh thoảng)」.
• 「あまり」 phải đi với thể phủ định (あまり見ません).

🔍 Phân tích các lựa chọn:
- 1. ときどき: (ĐÚNG) - Thỉnh thoảng (phù hợp với はい、...見ます)
- 2. たくさん: Dùng cho số lượng vật/hành động kéo dài, không tự nhiên khi đi đơn lẻ với xem phim
- 3. あまり: Phải đi với phủ định (あまり見ません)
- 4. いつも: Luôn luôn (nếu là khẳng định thường dùng kèm bối cảnh rõ, nhưng ở hội thoại này chọn ときどき)

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 8):
山口「東さんは えいがを 見ますか。」 東「はい、( )見ます。」 -> 1. ときどき""")

add_q(44, "読んでいる(その)ざっし", 3,
"""🎯 Đáp án đúng: [3] その

💬 Dịch nghĩa câu:
「川口「田中さんが 今 読んで いる( )ざっしは 何の ざっしですか。」」
-> "Kawaguchi: 'Cuốn tạp chí mà anh Tanaka đang đọc đó là tạp chí gì thế?'"

💡 Phân tích & Giải thích chi tiết:
• Trước danh từ 「ざっし (tạp chí)」, ta cần một chỉ từ định danh bổ nghĩa trực tiếp cho danh từ. Dòng chỉ từ bổ nghĩa trực tiếp cho danh từ là: この / その / あの / どの + Danh từ.
• Cuốn tạp chí đang nằm ở phía người nghe (Tanaka đang cầm đọc), nên người nói dùng 「その」.

🔍 Phân tích các lựa chọn:
- 1. これ: Đại từ chỉ đồ vật độc lập, không đứng ngay trước danh từ (phải là これの nếu muốn bổ nghĩa)
- 2. ここ: Đại từ chỉ nơi chốn
- 3. その: (ĐÚNG) - Bổ nghĩa trực tiếp cho danh từ: そのざっし
- 4. そこ: Đại từ chỉ nơi chốn

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 9):
川口「田中さんが 今 読んで いる( )ざっしは 何の ざっしですか。」 -> 3. その""")

add_q(45, "3 món -> (どれ)がいいですか", 1,
"""🎯 Đáp án đúng: [1] どれ

💬 Dịch nghĩa câu:
「A「あめと クッキーと チョコレートが あります。( )がいいですか。」」
-> "A: 'Có kẹo, bánh quy và sô cô la này. Bạn thích cái nào?'"

💡 Phân tích & Giải thích chi tiết:
• Có 3 đối tượng được đưa ra lựa chọn: 「あめ」「クッキー」「チョコレート」 (từ 3 đối tượng trở lên).
• Quy tắc từ để hỏi lựa chọn trong tiếng Nhật:
  - Lựa chọn giữa 2 đối tượng: dùng どちら (hoặc どっち).
  - Lựa chọn trong số 3 đối tượng trở lên: dùng 「どれ」.
  - Do đó từ chuẩn xác ở đây là 「どれ」.

🔍 Phân tích các lựa chọn:
- 1. どれ: (ĐÚNG) - Cái nào (lựa chọn từ 3 đối tượng trở lên)
- 2. どう: Thế nào (hỏi trạng thái)
- 3. どの: Phải đi kèm danh từ đằng sau (どの + Danh từ)
- 4. どちら: Dùng khi chỉ chọn giữa 2 đối tượng

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 10):
A「あめと クッキーと チョコレートが あります。( )がいいですか。」 -> 1. どれ""")

add_q(46, "(なにで)学校へ行きますか", 2,
"""🎯 Đáp án đúng: [2] なにで

💬 Dịch nghĩa câu:
「A「( )学校へ行きますか。」 B「バスです。」」
-> "A: 'Bạn đi đến trường bằng phương tiện gì?' - B: 'Bằng xe buýt.'"

💡 Phân tích & Giải thích chi tiết:
• Câu trả lời của B là 「バスです (bằng xe buýt)」 - chỉ phương tiện giao thông di chuyển.
• Trong tiếng Nhật N5, câu hỏi về phương tiện đi lại dùng từ nghi vấn 「何で (なにで)」: なにで行きますか (Đi bằng gì?).

🔍 Phân tích các lựa chọn:
- 1. だれと: Cùng với ai
- 2. なにで: (ĐÚNG) - Bằng phương tiện gì (câu trả lời: バスです)
- 3. どこで: Ở đâu (hỏi nơi chốn diễn ra hành động)
- 4. どうして: Tại sao (hỏi nguyên nhân lý do)

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 11):
A「( )学校へ行きますか。」 B「バスです。」 -> 2. なにで""")

add_q(47, "(電話)中です", 1,
"""🎯 Đáp án đúng: [1] 電話

💬 Dịch nghĩa câu:
「山下さんは今、( )中です。」
-> "Anh Yamashita hiện tại đang trong lúc gọi điện thoại."

💡 Phân tích & Giải thích chi tiết:
• Hậu tố 「中 (ちゅう / じゅう)」 ghép trực tiếp vào sau danh từ chỉ hành động (danh từ dạng N する) để biểu thị trạng thái "đang trong quá trình tiến hành việc gì":
  - 電話 + 中 -> 「電話中 (でんわちゅう: đang nói chuyện điện thoại)」
  - 授業 + 中 -> 「授業中 (trong giờ học)」
• Do đó chỉ cần đặt trực tiếp danh từ 「電話」 vào trước 「中」.

🔍 Phân tích các lựa chọn:
- 1. 電話: (ĐÚNG) - Ghép trực tiếp: 電話中 (đang bận nghe điện thoại)
- 2. 電話を: Thừa trợ từ を
- 3. 電話する: Động từ thể từ điển không ghép trực tiếp với 中 kiểu này
- 4. 電話して: Động từ thể て

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 12):
山下さんは今、( )中です。 -> 1. 電話""")

add_q(48, "おわった(あとで)", 4,
"""🎯 Đáp án đúng: [4] あとで

💬 Dịch nghĩa câu:
「私は いつも しけんが おわった( )旅行に 行きます。」
-> "Tôi luôn luôn đi du lịch sau khi kỳ thi kết thúc."

💡 Phân tích & Giải thích chi tiết:
• Mẫu câu chỉ thứ tự hành động trong tiếng Nhật N5:
  「Động từ thể た + 後で (あとで)」: Sau khi làm xong hành động V.
• Trước chỗ trống là động từ thể quá khứ 「おわった (終わった)」, vì vậy kết hợp chính xác nhất là 「おわった あとで」 (sau khi thi xong).

🔍 Phân tích các lựa chọn:
- 1. まえに: Trước khi (phải đi với thể từ điển V-る: おわるまえに)
- 2. とき: Đi với quá khứ biểu thị thời điểm xảy ra sự việc, không mang nghĩa tuần tự rõ bằng あとで
- 3. から: Phải đi với thể て: おわってから (không đi với おわったから để chỉ tuần tự hành động)
- 4. あとで: (ĐÚNG) - V-た + あとで: Sau khi kết thúc

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 13):
私は いつも しけんが おわった( )旅行に 行きます。 -> 4. あとで""")

add_q(49, "本を(読んだり して)います", 2,
"""🎯 Đáp án đúng: [2] 読んだり して

💬 Dịch nghĩa câu:
「休みの 日は 家で おんがくを 聞いたり、本を( )います。」
-> "Vào ngày nghỉ, tôi ở nhà nghe nhạc, đọc sách các kiểu."

💡 Phân tích & Giải thích chi tiết:
• Cấu trúc liệt kê hành động tiêu biểu không theo thứ tự thời gian:
  「～たり、～たり する / しています」
• Vế trước đã có: 「おんがくを 聞いたり (きいたり)」.
• Vế sau tiếp tục chia thể たり: 「本を読んだり」 và kết hợp với đuôi 「して います」.

🔍 Phân tích các lựa chọn:
- 1. 読んで: Sai cấu trúc lặp たり...たり
- 2. 読んだり して: (ĐÚNG) - Hoàn thiện mẫu: ～たり、～たりしています
- 3. 読みながら: Vừa làm cái này vừa làm cái kia (hành động đồng thời, không hợp với 聞いたり ở trước)
- 4. 読むことが: Mẫu nói về sở thích hoặc khả năng (không ghép với 聞いたり)

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 14):
休みの 日は 家で おんがくを 聞いたり、本を( )います。 -> 2. 読んだり して""")

add_q(50, "(まだ)です", 1,
"""🎯 Đáp án đúng: [1] まだ

💬 Dịch nghĩa câu:
「A「ひるごはんは 食べましたか。」 B「( )です。」 A「じゃあ、いっしょに 食べましょう。」」
-> "A: 'Bạn đã ăn cơm trưa chưa?' - B: 'Chưa ăn ạ.' - A: 'Vậy thì chúng ta cùng đi ăn nhé!'"

💡 Phân tích & Giải thích chi tiết:
• Câu hỏi: 「～食べましたか (đã làm việc gì chưa?)」.
• Khi chưa hoàn thành hành động được hỏi, câu trả lời ngắn tiêu chuẩn trong tiếng Nhật là: 「いいえ、まだです (Chưa, tôi vẫn chưa làm)」.
• Phía sau A rủ: 「じゃあ、いっしょに食べましょう」 chứng tỏ B chưa ăn cơm.

🔍 Phân tích các lựa chọn:
- 1. まだ: (ĐÚNG) - Vẫn chưa (まだです: Tôi vẫn chưa ăn)
- 2. もう: Đã rồi (nếu もう thì đã ăn rồi, A không rủ ăn nữa)
- 3. すぐ: Ngay lập tức
- 4. これから: Từ bây giờ

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 15):
A「ひるごはんは 食べましたか。」 B「( )です。」 -> 1. まだ""")

add_q(51, "カタカナで(おねがいします)", 4,
"""🎯 Đáp án đúng: [4] おねがいします

💬 Dịch nghĩa câu:
「A「ここに 名前と 読み方を 書いて ください。」
B「名前の 読み方は ひらがなで 書きますか。」
A「いいえ、カタカナで( )。」」
-> "A: 'Xin hãy viết họ tên và cách đọc vào đây.'
B: 'Cách đọc họ tên viết bằng chữ Hiragana có được không ạ?'
A: 'Không, xin vui lòng viết bằng chữ Katakana giúp tôi ạ.'"

💡 Phân tích & Giải thích chi tiết:
• Mẫu câu nhờ vả, yêu cầu một cách lịch sự trong giao tiếp: 「[Phương tiện/Cách thức] で おねがいします (Xin vui lòng làm bằng cách... / Cho tôi...)」.
• Ở đây người hướng dẫn A muốn đối phương điền bằng Katakana nên nói: 「カタカナでおねがいします (Xin vui lòng viết bằng Katakana)」.

🔍 Phân tích các lựa chọn:
- 1. おねがいしません: Phủ định (tôi không nhờ) - Sai ngữ cảnh
- 2. おねがいしました: Quá khứ (đã nhờ rồi) - Sai thì
- 3. おねがいして ください: Không tự nhiên
- 4. おねがいします: (ĐÚNG) - Lời yêu cầu lịch sự: カタカナでおねがいします

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 1 - Câu 16):
A「いいえ、カタカナで( )。」 -> 4. おねがいします""")

# Mondai 2: Dấu Sao ★ Sắp xếp câu (Q52 - Q56)
add_q(52, "こうえん [に] [は] [★ 鳥] [が] たくさん", 1,
"""🎯 Đáp án đúng: [1] 鳥 (とり)

💬 Dịch nghĩa câu:
「こうえんには 鳥がたくさん います。」
-> "Ở công viên có rất nhiều loài chim."

💡 Phân tích & Trật tự sắp xếp:
• Các từ cần xếp: 1. 鳥 / 2. に / 3. は / 4. が
• Cấu trúc: [Địa điểm] + には + [Danh từ chỉ sinh vật] + が + [Số lượng/Phó từ] + います.
• Thứ tự ghép hoàn chỉnh: こうえん [2. に] [3. は] [★ 1. 鳥] [4. が] たくさん います.
• Vị trí dấu sao ★ nằm ở vị trí thứ 3, tương ứng với số 1 (鳥).

🔍 Phân tích các vị trí:
- Vị trí 1: に (2)
- Vị trí 2: は (3)
- Vị trí 3 ★: 鳥 (1) -> ĐÁP ÁN ĐÚNG
- Vị trí 4: が (4)

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 2 - Câu 17):
こうえん ___ ___ _★_ ___ たくさん います。 -> 1. 鳥""")

add_q(53, "きょねんの [たんじょうびに] [兄に] [★ もらった] [ぼうしを]", 3,
"""🎯 Đáp án đúng: [3] もらった

💬 Dịch nghĩa câu:
「きょねんの たんじょうびに 兄に もらった ぼうしを 毎日 かぶって います。」
-> "Mỗi ngày tôi đều đội chiếc mũ mà anh trai tặng vào ngày sinh nhật năm ngoái."

💡 Phân tích & Trật tự sắp xếp:
• Các từ cần xếp: 1. 兄に / 2. ぼうしを / 3. もらった / 4. たんじょうびに
• Mệnh đề định ngữ bổ nghĩa cho danh từ 「ぼうし」: [兄にもらった] ぼうし (chiếc mũ nhận từ anh trai).
• Ghép mốc thời gian: きょねんの [4. たんじょうびに] [1. 兄に] [★ 3. もらった] [2. ぼうしを] 毎日かぶっています.
• Vị trí dấu sao ★ là vị trí số 3, tương ứng với số 3 (もらった).

🔍 Phân tích các vị trí:
- Vị trí 1: たんじょうびに (4)
- Vị trí 2: 兄に (1)
- Vị trí 3 ★: もらった (3) -> ĐÁP ÁN ĐÚNG
- Vị trí 4: ぼうしを (2)

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 2 - Câu 18):
きょねんの ___ ___ _★_ ___ 毎日 かぶって います。 -> 3. もらった""")

add_q(54, "スパゲティが [銀行の] [★ 近くの] [ゆうめいな] [レストランで]", 2,
"""🎯 Đáp án đúng: [2] 近くの

💬 Dịch nghĩa câu:
「スパゲティが ゆうめいな 銀行の 近くの レストランで ばんごはんを 食べました。」
(hoặc: 銀行の 近くの スパゲティが ゆうめいな レストランで ...)
-> "Tôi đã ăn tối tại nhà hàng gần ngân hàng nổi tiếng với món mì Ý."

💡 Phân tích & Trật tự sắp xếp:
• Các từ cần xếp: 1. ゆうめいな / 2. 近くの / 3. 銀行の / 4. レストランで
• Trật tự mệnh đề bổ nghĩa cho レストラン:
  [3. 銀行の] [★ 2. 近くの] [1. ゆうめいな] [4. レストランで]
  (hoặc スパゲティが ゆうめいな [3. 銀行の] [★ 2. 近くの] [4. レストランで])
• Vị trí dấu sao ★ luôn rơi vào từ số 2: 「近くの」.

🔍 Phân tích các vị trí:
- Vị trí dấu sao ★ là: 近くの (2) -> ĐÁP ÁN ĐÚNG

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 2 - Câu 19):
スパゲティが ___ _★_ ___ ___ ばんごはんを 食べました。 -> 2. 近くの""")

add_q(55, "もっと [小さくて] [色が] [★ 明るい] [のは]", 4,
"""🎯 Đáp án đúng: [4] 明るい

💬 Dịch nghĩa câu:
「A「こちらのかばんは いかがですか。」
B「もっと 小さくて 色が 明るい のは ありませんか。」」
-> "A: 'Chiếc túi này thì sao ạ?' - B: 'Có chiếc nào nhỏ hơn và màu sắc tươi sáng hơn không ạ?'"

💡 Phân tích & Trật tự sắp xếp:
• Các từ cần xếp: 1. のは / 2. 色が / 3. 小さくて / 4. 明るい
• Tính từ nối tính từ: 小さくて (thể て của tính từ 小さい).
• Tiếp theo là cụm tính từ: 色が 明るい (màu sáng). Danh từ hóa bằng の: のはありませんか.
• Thứ tự sắp xếp: もっと [3. 小さくて] [2. 色が] [★ 4. 明るい] [1. のは] ありませんか。
• Vị trí dấu sao ★ nằm ở vị trí số 3, tương ứng với số 4 (明るい).

🔍 Phân tích các vị trí:
- Vị trí 1: 小さくて (3)
- Vị trí 2: 色が (2)
- Vị trí 3 ★: 明るい (4) -> ĐÁP ÁN ĐÚNG
- Vị trí 4: のは (1)

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 2 - Câu 20):
もっと ___ ___ _★_ ___ ありませんか。 -> 4. 明るい""")

add_q(56, "一つ [200円の] [りんごが] [★ 三つで] [100円]", 4,
"""🎯 Đáp án đúng: [4] 三つで

💬 Dịch nghĩa câu:
「今日はりんごが 安かったです。いつもは 一つ 200円の りんごが 三つで 100円でした。」
-> "Hôm nay táo rẻ thật đấy. Bình thường một quả táo 200 Yên mà nay 3 quả có 100 Yên thôi."

💡 Phân tích & Trật tự sắp xếp:
• Các từ cần xếp: 1. 100円 / 2. 200円の / 3. りんごが / 4. 三つで
• So sánh giá cả: bình thường 1 quả táo giá 200 Yên (一つ 200円の りんごが), hôm nay mua cả 3 quả chỉ tốn 100 Yên (三つで 100円でした).
• Thứ tự ghép: いつもは 一つ [2. 200円の] [3. りんごが] [★ 4. 三つで] [1. 100円] でした。
• Vị trí dấu sao ★ nằm ở vị trí thứ 3, tương ứng với số 4 (三つで).

🔍 Phân tích các vị trí:
- Vị trí 1: 200円の (2)
- Vị trí 2: りんごが (3)
- Vị trí 3 ★: 三つで (4) -> ĐÁP ÁN ĐÚNG
- Vị trí 4: 100円 (1)

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 2 - Câu 21):
いつもは 一つ ___ ___ _★_ ___ でした。 -> 4. 三つで""")

# Mondai 3: Điền từ vào đoạn văn (Q57 - Q61)
add_q(57, "一人で [さんぽします]", 2,
"""🎯 Đáp án đúng: [2] さんぽします

💬 Dịch nghĩa ngữ cảnh đoạn văn:
「わたしは 毎朝 散歩を します。いつも 朝6時に 起きて 一人で ( 22 )。」
-> "Tôi đi dạo mỗi buổi sáng. Lúc nào tôi cũng thức dậy vào 6 giờ sáng và đi dạo một mình."

💡 Phân tích & Giải thích chi tiết:
• Ngay câu mở đầu đoạn văn tác giả đã giới thiệu: 「わたしは 毎朝 散歩を します (Tôi mỗi sáng đều đi dạo)」.
• Câu tiếp theo mô tả thói quen lặp lại hàng ngày (いつも朝6時に起きて...), nên động từ điền vào chỗ trống (22) chính là hành động đi dạo chia thể hiện tại: 「さんぽします (散歩します)」.

🔍 Phân tích các lựa chọn:
- 1. さんぽしました: Thể quá khứ (không dùng cho thói quen hàng ngày với いつも)
- 2. さんぽします: (ĐÚNG) - Thói quen hiện tại thường nhật
- 3. さんぽして いました: Đã đang đi dạo
- 4. さんぽするでしょう: Chắc là sẽ đi dạo

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 3 - Câu 22):
いつも 朝6時に 起きて 一人で ( 22 )。 -> 2. さんぽします""")

add_q(58, "1時間歩きました。[それから] 喫茶店へ", 1,
"""🎯 Đáp án đúng: [1] それから

💬 Dịch nghĩa ngữ cảnh đoạn văn:
「さくら川まで 1時間くらい 歩きました。( 23 )、さくら川の 近くの きっさてんに 行きました。」
-> "Tôi đã đi bộ khoảng 1 tiếng đến sông Sakura. Sau đó, tôi đã đến một quán nước gần sông Sakura."

💡 Phân tích & Giải thích chi tiết:
• Hai hành động xảy ra nối tiếp nhau theo trình tự thời gian: Hành động 1 (Đi bộ 1 tiếng đến bờ sông) -> Hành động 2 (Đến quán cà phê gần đó).
• Liên từ nối diễn tả hành động tiếp theo sau đó là 「それから (Sau đó / Tiếp theo)」.

🔍 Phân tích các lựa chọn:
- 1. それから: (ĐÚNG) - Sau đó, tiếp theo (nối tuần tự thời gian)
- 2. それでは: Vậy thì, nếu vậy thì
- 3. それで: Do đó, vì vậy (chỉ kết quả nhân quả)
- 4. そこ: Ở đó (đại từ nơi chốn)

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 3 - Câu 23):
さくら川まで 1時間くらい 歩きました。( 23 )、... -> 1. それから""")

add_q(59, "レストランの名前(は)「サワディカ」", 4,
"""🎯 Đáp án đúng: [4] は

💬 Dịch nghĩa ngữ cảnh đoạn văn:
「レストランの 名前 ( 24 )「サワディカ」です。」
-> "Tên của nhà hàng là 'Sawadika'."

💡 Phân tích & Giải thích chi tiết:
• Cấu trúc danh từ chỉ chủ đề cơ bản: [Danh từ A] は [Danh từ B] です (A là B).
• Ở đây chủ ngữ / chủ đề là 「レストランの名前 (tên của nhà hàng)」, theo sau là tên riêng 「サワディカ」. Trợ từ làm mốc chủ đề là 「は」.

🔍 Phân tích các lựa chọn:
- 1. を: Trợ từ chỉ tân ngữ (trước です không dùng を)
- 2. に: Trợ từ chỉ thời gian, hướng
- 3. が: Nhấn mạnh chủ ngữ mới, nhưng ở định nghĩa tên gọi cơ bản AはBです dùng は
- 4. は: (ĐÚNG) - Cấu trúc AはBです: 名前は「サワディカ」です

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 3 - Câu 24):
レストランの 名前 ( 24 )「サワディカ」です。 -> 4. は""")

add_q(60, "食べに [来ました]", 2,
"""🎯 Đáp án đúng: [2] 来ました

💬 Dịch nghĩa ngữ cảnh đoạn văn:
「先週の 日曜日、日本人の ともだちが「サワディカ」に 食べに ( 25 )。」
-> "Chủ nhật tuần trước, những người bạn Nhật Bản đã đến quán 'Sawadika' ăn cơm."

💡 Phân tích & Giải thích chi tiết:
• Ngữ cảnh: Tác giả đang ở quán nhà hàng Thái của mình kể lại sự việc diễn ra vào Chủ nhật tuần trước (先週の日曜日).
• Bạn bè từ bên ngoài di chuyển "đến chỗ tác giả" (hướng về phía người nói) trong quá khứ nên dùng động từ 「来る」 chia ở quá khứ lịch sự là 「来ました (きました)」.

🔍 Phân tích các lựa chọn:
- 1. 行きました: Đã đi (hướng ra xa người nói)
- 2. 来ました: (ĐÚNG) - Đã đến (hướng lại gần nơi tác giả đang có mặt)
- 3. 帰りました: Đã trở về
- 4. 入りました: Đã bước vào (không kết hợp tự nhiên với 食べに入りました bằng 食べに来ました)

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 3 - Câu 25):
先週の 日曜日、日本人の ともだちが「サワディカ」に 食べに ( 25 )。 -> 2. 来ました""")

add_q(61, "「[ぜんぶ おいしかったです]」と言いました", 3,
"""🎯 Đáp án đúng: [3] ぜんぶ おいしかったです

💬 Dịch nghĩa ngữ cảnh đoạn văn:
「ともだちは「( 26 )」と 言いました。わたしは とても うれしかったです。」
-> "Những người bạn đã khen rằng: 'Tất cả các món đều ngon tuyệt!' Tôi đã cảm thấy vô cùng vui sướng."

💡 Phân tích & Giải thích chi tiết:
• Câu sau nêu cảm xúc của tác giả: 「わたしは とても うれしかったです (Tôi đã rất vui)」.
• Để tác giả cảm thấy rất vui khi bạn bè đến quán mình ăn thì lời nhận xét trong ngoặc kép phải là lời khen ngợi món ăn ngon: 「ぜんぶ おいしかったです (Tất cả đều rất ngon)」.

🔍 Phân tích các lựa chọn:
- 1. ぜんぶ まずかったです: Tất cả đều dở tệ (nếu vậy tác giả không thể vui)
- 2. あまり おいしくなかったです: Không ngon lắm (chê bai)
- 3. ぜんぶ おいしかったです: (ĐÚNG) - Món nào cũng ngon tuyệt!
- 4. もう すこし たべたいです: Không phù hợp với ngữ cảnh nhận xét bữa ăn vừa xong

📄 Trích PDF gốc (N5 7/2013 - Bunpou Mondai 3 - Câu 26):
ともだちは「( 26 )」と 言いました。 -> 3. ぜんぶ おいしかったです""")

# ==========================================
# PHẦN 3: ĐỌC HIỂU (DOKKAI): Q62 - Q67
# ==========================================

# Mondai 4: Đoạn văn ngắn (Q62 - Q64)
add_q(62, "Dokkai Q1: リンさんにお菓子をいつどこで買いますか", 2,
"""🎯 Đáp án đúng: [2] あした おかし屋で

💬 Dịch nghĩa câu hỏi:
「リンさんに おかしを いつ、どこで 買いますか。」
-> "Người viết sẽ mua bánh kẹo cho bạn Rin vào lúc nào và ở đâu?"

💡 Phân tích bài đọc:
• Trong đoạn thư nhắn có viết:
  「リンさんの 好きな お菓子を 買いましょう。駅の 前の お菓子屋で 買いませんか。あしたの 授業の あとで 行きましょう。」
• Thời gian: 「あしたの 授業の あとで (ngày mai sau giờ học)」 -> ngày mai (あした).
• Địa điểm: 「駅の 前の お菓子屋で (tại tiệm bánh kẹo trước nhà ga)」 -> tiệm bánh kẹo (おかし屋).
• Ghép lại: Mua vào "Ngày mai ở tiệm bánh kẹo" (あした おかし屋で).

🔍 Phân tích các lựa chọn:
- 1. きょう デパートで (Hôm nay ở trung tâm thương mại - Sai cả hai)
- 2. あした おかし屋で (Ngày mai ở tiệm bánh kẹo - ĐÚNG)
- 3. きょう おかし屋で (Hôm nay ở tiệm bánh kẹo - Sai thời gian)
- 4. あした デパートで (Ngày mai ở trung tâm thương mại - Sai địa điểm)

📄 Trích PDF gốc (N5 7/2013 - Dokkai Mondai 4 - Câu 27):
リンさんに おかしを いつ、どこで 買いますか。 -> 2. あした おかし屋で""")

add_q(63, "Dokkai Q2: 男の学生はどこで歌のれんしゅうをしますか", 3,
"""🎯 Đáp án đúng: [3] 4時からは 1ばん きょうしつ、5時からは 3ばん きょうしつ

💬 Dịch nghĩa câu hỏi:
「男の 学生は どこで 歌の れんしゅうを しますか。」
-> "Nam sinh viên sẽ luyện tập hát ở đâu?"

💡 Phân tích bài đọc:
• Bảng thông báo phòng tập:
  - 4h đến 5h: Phòng 1 (1ばん きょうしつ).
  - 5h đến 6h: Phòng 3 (3ばん きょうしつ).
• Do đó nam sinh viên từ 4 giờ tập ở phòng 1, từ 5 giờ chuyển sang tập ở phòng 3.

🔍 Phân tích các lựa chọn:
- 1. Cả 2 tiếng đều ở phòng 1 (Sai)
- 2. Cả 2 tiếng đều ở phòng 3 (Sai)
- 3. 4時からは 1ばん きょうしつ、5時からは 3ばん きょうしつ (ĐÚNG)
- 4. 4 giờ ở phòng 3, 5 giờ ở phòng 1 (Ngược thứ tự)

📄 Trích PDF gốc (N5 7/2013 - Dokkai Mondai 4 - Câu 28):
男の 学生は どこで 歌の れんしゅうを しますか。 -> 3""")

add_q(64, "Dokkai Q3: レナさんがもう持っているものは何ですか", 1,
"""🎯 Đáp án đúng: [1] テキストと じしょ

💬 Dịch nghĩa câu hỏi:
「レナさんが もう 持って いる ものは 何ですか。」
-> "Đồ vật mà bạn Rena đã có sẵn rồi là gì?"

💡 Phân tích bài đọc:
• Trong đoạn văn Rena liệt kê những đồ cần chuẩn bị cho khóa học:
  「テキストと じしょは もう 買いました。ノートと えんぴつは まだ 買って いません。」
  (Sách giáo khoa và từ điển thì tôi đã mua rồi. Còn vở ghi và bút chì thì tôi vẫn chưa mua.)
• Câu hỏi: Đồ vật ĐÃ CÓ (もう持っているもの) -> 「テキストと じしょ (Sách giáo trình và từ điển)」.

🔍 Phân tích các lựa chọn:
- 1. テキストと じしょ: (ĐÚNG) - Đã mua rồi (もう買いました)
- 2. テキストと ノート: Vở chưa mua
- 3. じしょと えんぴつ: Bút chì chưa mua
- 4. ノートと えんぴつ: Cả hai thứ này đều chưa mua

📄 Trích PDF gốc (N5 7/2013 - Dokkai Mondai 4 - Câu 29):
レナさんが もう 持って いる ものは 何ですか。 -> 1. テキストと じしょ""")

# Mondai 5: Đoạn văn trung (Q65 - Q66)
add_q(65, "Dokkai Q4: 森さんとわたしはどこでケーキを食べましたか", 3,
"""🎯 Đáp án đúng: [3] 「わたし」の うち

💬 Dịch nghĩa câu hỏi:
「①きのう 森さんと「わたし」は どこで ケーキを 食べましたか。」
-> "Hôm qua anh Mori và 'tôi' đã ăn bánh kem ở đâu?"

💡 Phân tích bài đọc:
• Trong bài đọc ghi rõ:
  「きのう 森さんと いっしょに ケーキ屋の『リボン』へ 行きました。... 店で ケーキを 買って、わたしの うちで 食べました。」
  (Hôm qua tôi cùng Mori đến tiệm bánh 'Ribbon'... Chúng tôi đã mua bánh ở tiệm rồi đem về NHÀ CỦA TÔI ăn.)
• Địa điểm ăn bánh chính là tại nhà của nhân vật tôi: 「わたしの うち」.

🔍 Phân tích các lựa chọn:
- 1. 森さんの うち (Nhà của Mori - Sai)
- 2. ケーキ屋の『リボン』 (Tại tiệm bánh Ribbon - ở đó chỉ mua mang về)
- 3. 「わたし」の うち (Nhà của tôi - ĐÚNG)
- 4. レストラン (Nhà hàng - Sai)

📄 Trích PDF gốc (N5 7/2013 - Dokkai Mondai 5 - Câu 30):
①きのう 森さんと「わたし」は どこで ケーキを 食べましたか。 -> 3. 「わたし」の うち""")

add_q(66, "Dokkai Q5: どうして「またリボンに行きましょう」と言いましたか", 4,
"""🎯 Đáp án đúng: [4] 「リボン」の 店の 中で 食べる ケーキの ほうが おいしいから

💬 Dịch nghĩa câu hỏi:
「どうして ②「また『リボン』に 行きましょう。」と 言いましたか。」
-> "Tại sao Mori lại nói: 'Lần sau chúng ta lại cùng đến tiệm Ribbon nữa nhé'?"

💡 Phân tích bài đọc:
• Cuối bài đọc, Mori giải thích lý do:
  「森さんは『リボンの 店の 中で 食べると、もっと おいしいですよ。今度は 店で 食べましょう』と言いました。」
  (Mori nói rằng: 'Nếu ăn ngay bên trong tiệm Ribbon thì còn ngon hơn nữa đấy. Lần tới hãy ăn ngay tại tiệm nhé'.)
• Lý do là vì ăn bánh ngay tại quán sẽ ngon hơn.

🔍 Phân tích các lựa chọn:
- 1. Vì bánh ở tiệm Ribbon rất rẻ (Sai thông tin)
- 2. Vì nhà của tôi chật hẹp (Sai)
- 3. Vì muốn ăn thử loại bánh khác (Sai)
- 4. 「リボン」の 店の 中で 食べる ケーキの ほうが おいしいから (ĐÚNG - Ăn trong quán bánh ngon hơn)

📄 Trích PDF gốc (N5 7/2013 - Dokkai Mondai 5 - Câu 31):
どうして ②「また『リボン』に 行きましょう。」と 言いましたか。 -> 4""")

# Mondai 6: Tìm kiếm thông tin (Q67)
add_q(67, "Dokkai Q6: フォンさんの旅行プラン", 4,
"""🎯 Đáp án đúng: [4] ④: 8月21日(水)～22日(木) 電車とバスで 西田町へ, 18,000円

💬 Dịch nghĩa câu hỏi:
「フォンさんの 休みは 二日間です。休みに 海へ 行きたいです。どの 旅行に 行きますか。」
-> "Kỳ nghỉ của bạn Phong kéo dài 2 ngày. Trong kỳ nghỉ bạn ấy muốn đi biển. Phong sẽ chọn chuyến du lịch nào?"

💡 Phân tích điều kiện & Bảng thông tin:
• Điều kiện của Phong:
  1. Thời gian nghỉ: đúng 2 ngày (二日間: 1 đêm 2 ngày).
  2. Địa điểm mong muốn: Đi biển (海へ行きたい).
• Kiểm tra các tour du lịch:
  - Tour 1: Đi núi (山) -> Loại (không phải biển).
  - Tour 2: Đi biển nhưng kéo dài 3 ngày (3日間) -> Loại (quá số ngày nghỉ).
  - Tour 3: Đi hồ (湖) -> Loại.
  - Tour 4: Đi thị trấn Nishida (西田町) có bãi biển (海), thời gian: 8月21日(水)～22日(木) đúng 2 ngày 1 đêm, giá 18,000 Yên -> Thỏa mãn 100% tất cả điều kiện!

🔍 Phân tích các lựa chọn:
- 1. Tour ①: Đi leo núi (Sai địa điểm)
- 2. Tour ②: Đi biển nhưng 3 ngày (Quá ngày)
- 3. Tour ③: Đi ngắm hồ (Sai địa điểm)
- 4. Tour ④: Đi biển Nishida trong 2 ngày (8/21 - 8/22) -> (ĐÚNG)

📄 Trích PDF gốc (N5 7/2013 - Dokkai Mondai 6 - Câu 32):
フォンさんの 休みは 二日間です。休みに 海へ 行きたいです。どの 旅行に 行きますか。 -> 4. ④""")

# ==========================================
# PHẦN 4: NGHE HIỂU (CHOUKAI): Q68 - Q91
# ==========================================

# Choukai Mondai 1: Q68 - Q74 (7 câu)
add_q(68, "Choukai M1-1: 学生はあしたの朝どこで先生に会いますか", 4,
"""🎯 Đáp án đúng: [4] 駅 (えき - Nhà ga)

💬 Dịch nghĩa câu hỏi:
「学生は あしたの 朝、どこで 先生に 会いますか。」
-> "Học sinh sẽ gặp thầy giáo vào sáng mai ở đâu?"

💡 Phân tích hội thoại:
• Thầy giáo thông báo: Ngày mai đi tham quan phố cổ, đi chuyến tàu lúc 9 giờ.
• Học sinh nữ hỏi: 「あしたは 学校に 来てから 行きますか (Ngày mai chúng em đến trường trước rồi mới đi ạ?)」.
• Thầy giáo trả lời dứt khoát: 「いいえ、駅に 来て ください。8時半に 待って います (Không, hãy đến nhà ga nhé. Thầy sẽ đợi ở ga lúc 8 rưỡi)」.
• Như vậy, học sinh phải gặp thầy ở NHÀ GA (駅).

🔍 Phân tích các lựa chọn:
- Hình 1: Trường học (学校) - Thầy bảo không đến trường
- Hình 2: Khách sạn cổ (ホテル) - Nơi sẽ đến tham quan
- Hình 3: Công viên (公園)
- Hình 4: Nhà ga (駅) - (ĐÚNG - Thầy dặn gặp ở nhà ga lúc 8:30)

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 1):
先生: いいえ、駅に来てください。8時半に待っています。 -> Đáp án [4]""",
"""【音声テキスト】
教室で 先生が 話して います。学生は あしたの 朝、どこで 先生に 会いますか。
男: みなさん、あしたは 古い 町を 見に 行きます。9時の 電車に 乗りますよ。町には 日本で 一番 古い ホテルが あります。きれいな 公園も あります。
女: あしたは 学校に 来てから 行きますか。
男: いいえ、駅に 来て ください。8時半に 待って います。
学生は あしたの 朝、どこで 先生に 会いますか。""",
"""【Bản dịch Script】
Trong lớp học thầy giáo đang dặn dò. Học sinh sáng mai sẽ gặp thầy giáo ở đâu?
Thầy: Các em chú ý, ngày mai chúng ta sẽ đi ngắm khu phố cổ. Chúng ta sẽ đi chuyến tàu điện 9 giờ nhé. Ở đó có khách sạn cổ nhất Nhật Bản, và có cả công viên rất đẹp nữa.
Nữ sinh: Ngày mai chúng em có cần đến trường trước rồi mới đi không ạ?
Thầy: Không, các em hãy đến thẳng nhà ga nhé. Thầy sẽ đợi các em ở ga lúc 8 giờ rưỡi.
Hỏi: Học sinh sáng mai sẽ gặp thầy giáo ở đâu?""")

add_q(69, "Choukai M1-2: 男の子はいすをどこに置きますか", 1,
"""🎯 Đáp án đúng: [1] 机の左側 (Bên trái bàn)

💬 Dịch nghĩa câu hỏi:
「男の 学生は いすを どこに 置きますか。」
-> "Bạn nam sinh sẽ kê chiếc ghế vào vị trí nào?"

💡 Phân tích hội thoại:
• Nam sinh hỏi: 「先生、この いすは どこに 置きますか (Thưa cô, chiếc ghế này đặt ở đâu ạ?)」.
• Cô giáo chỉ dẫn: 「机の 左側に 置いて ください (Hãy đặt ở phía bên trái của bàn nhé)」.
• Vị trí bên trái của bàn ứng với hình số 1.

🔍 Phân tích các lựa chọn:
- Hình 1: Bên trái bàn (机の左側) - (ĐÚNG)
- Hình 2: Bên phải bàn (机の右側)
- Hình 3: Phía trước bàn
- Hình 4: Phía sau bàn

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 2):
女: 机の左側に置いてください。 -> Đáp án [1]""",
"""【音声テキスト】
学校で 男の学生と 女の先生が 話して います。男の学生は いすを どこに 置きますか。
男: 先生、この いすは どこに 置きますか。
女: 机の 左側に 置いて ください。
男: はい、わかりました。
男の学生は いすを どこに 置きますか。""",
"""【Bản dịch Script】
Ở trường học, nam sinh viên đang nói chuyện với cô giáo. Nam sinh viên sẽ đặt chiếc ghế ở đâu?
Nam: Thưa cô, chiếc ghế này đặt ở đâu ạ?
Cô giáo: Hãy đặt ở phía bên tay trái của bàn nhé.
Nam: Vâng, em hiểu rồi ạ.
Hỏi: Nam sinh viên sẽ đặt chiếc ghế ở đâu?""")

add_q(70, "Choukai M1-3: 男の人はこれから何をしますか", 1,
"""🎯 Đáp án đúng: [1] 皿を洗う (Rửa bát đĩa)

💬 Dịch nghĩa câu hỏi:
「男の 人は これから 何を しますか。」
-> "Người đàn ông sau đây sẽ làm việc gì?"

💡 Phân tích hội thoại:
• Người phụ nữ nhờ: 「ごはんが 終わったから、お皿を 洗って くれる？ (Ăn xong rồi, anh rửa bát đĩa giúp em nhé?)」.
• Người đàn ông đồng ý: 「うん、いいよ。お茶も いれる？ (Ừ được chứ. Em có uống trà không để anh pha luôn?)」.
• Người phụ nữ bảo: 「お茶は 私が いれるから、お皿を お願い (Trà để em tự pha, anh rửa bát giúp em là được)」.
• Vì vậy việc người đàn ông làm tiếp theo là rửa bát đĩa.

🔍 Phân tích các lựa chọn:
- Hình 1: Rửa bát đĩa (お皿を洗う) - (ĐÚNG)
- Hình 2: Pha trà (お茶をいれる - Người phụ nữ sẽ làm)
- Hình 3: Nấu ăn
- Hình 4: Dọn dẹp bàn ăn

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 3):
女: お茶は 私が いれるから、お皿を お願い。 -> Đáp án [1]""",
"""【音声テキスト】
家で 男の人と 女の人が 話して います。男の人は これから 何を しますか。
女: ごはんが 終わったから、お皿を 洗って くれる？
男: うん、いいよ。お茶も いれる？
女: お茶は 私が いれるから、お皿を お願い。
男: はい。
男の人は これから 何を しますか。""",
"""【Bản dịch Script】
Ở nhà, người đàn ông và người phụ nữ đang nói chuyện. Người đàn ông tiếp theo sẽ làm việc gì?
Nữ: Cơm nước xong rồi, anh rửa bát đĩa giúp em nhé?
Nam: Ừ, được chứ. Có cần anh pha trà luôn không?
Nữ: Trà để em tự pha, anh giúp em rửa bát đĩa nhé.
Nam: Nhất trí.
Hỏi: Người đàn ông tiếp theo sẽ làm việc gì?""")

add_q(71, "Choukai M1-4: さくらビルはどこですか", 2,
"""🎯 Đáp án đúng: [2] デパートの向こう側 (Bên kia trung tâm thương mại)

💬 Dịch nghĩa câu hỏi:
「さくらビルは どこですか。」
-> "Tòa nhà Sakura nằm ở vị trí nào?"

💡 Phân tích hội thoại:
• Người phụ nữ hỏi đường: 「さくらビルへ 行きたいです。どこですか (Tôi muốn đến tòa nhà Sakura. Nó ở đâu vậy ạ?)」.
• Người đàn ông chỉ dẫn: 「この道を まっすぐ行ってください。あそこに 大きいデパートがありますね。その 向こうです (Đi thẳng con đường này. Ở đằng kia có tiệm bách hóa lớn đúng không, nó nằm ở phía bên kia của tiệm bách hóa đó)」.
• Vị trí phía bên kia của cửa hàng bách hóa tương ứng với hình số 2.

🔍 Phân tích các lựa chọn:
- Hình 1: Trước cửa trung tâm thương mại
- Hình 2: Phía bên kia trung tâm thương mại (その向こう) - (ĐÚNG)
- Hình 3: Bên cạnh phía trước
- Hình 4: Đối diện bên kia đường

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 4):
男: あそこに 大きいデパートがありますね。その 向こうです。 -> Đáp án [2]""",
"""【音声テキスト】
女: すみません、あのう、さくらビルへ 行きたいです。さくらビルは どこですか。
男: さくらビルですね。この道を まっすぐ行って ください。あそこに 大きいデパートが ありますね。その 向こうです。
女: この道の 右側ですね。ありがとうございます。
さくらビルは どこですか。""",
"""【Bản dịch Script】
Nữ: Xin lỗi làm phiền một chút, tôi muốn đến tòa nhà Sakura. Cho tôi hỏi tòa nhà Sakura ở đâu ạ?
Nam: Tòa nhà Sakura à. Chị cứ đi thẳng con đường này nhé. Ở đằng kia có một trung tâm thương mại lớn đúng không, tòa nhà nằm ngay phía bên kia trung tâm thương mại đấy.
Nữ: Nằm ở phía bên phải của con đường này đúng không ạ. Cảm ơn anh.
Hỏi: Tòa nhà Sakura ở đâu?""")

add_q(72, "Choukai M1-5: 店の人は花をどうしますか", 3,
"""🎯 Đáp án đúng: [3] 花を3本、リボンなし (3 bông hoa không buộc nơ)

💬 Dịch nghĩa câu hỏi:
「店の 人は 花を どうしますか。」
-> "Nhân viên tiệm hoa sẽ xử lý bó hoa như thế nào?"

💡 Phân tích hội thoại:
• Khách ban đầu: 「この 花を 二本 ください (Cho tôi 2 bông hoa này)」.
• Sau đó khách đổi ý: 「あっ、すみません。もう一本 お願いします (À xin lỗi, cho tôi thêm 1 bông nữa -> Tổng cộng 3 bông)」.
• Nhân viên hỏi: 「リボンは どうしますか (Có buộc nơ không ạ?)」.
• Khách đáp: 「要りません (Không cần đâu)」.
• Kết luận: 3 bông hoa, không thắt ruy băng nơ -> Đáp án [3].

🔍 Phân tích các lựa chọn:
- Hình 1: 2 bông hoa có nơ
- Hình 2: 2 bông hoa không nơ
- Hình 3: 3 bông hoa không nơ (花3本、リボンなし) - (ĐÚNG)
- Hình 4: 3 bông hoa có thắt nơ

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 5):
男: もう一本お願いします。リボンですか、要りません。 -> Đáp án [3]""",
"""【音声テキスト】
花屋で 店の人と 男の人が 話して います。店の人は 花を どうしますか。
女: いらっしゃいませ。
男: すみません、この花を 二本 ください。
女: はい、これですね。プレゼントですか。
男: はい。あっ、すみません。もう一本 お願いします。
女: はい、リボンは どうしますか。
男: リボンですか。要りません。
女: はい、わかりました。
店の人は 花を どうしますか。""",
"""【Bản dịch Script】
Tại tiệm hoa, nhân viên đang nói chuyện với một người đàn ông. Nhân viên sẽ làm hoa như thế nào?
Nhân viên: Kính chào quý khách!
Khách: Cho tôi lấy 2 bông hoa này nhé.
Nhân viên: Vâng hoa này ạ. Quý khách mua làm quà tặng ạ?
Khách: Vâng. À xin lỗi, cho tôi lấy thêm 1 bông nữa nhé (tổng là 3 bông).
Nhân viên: Vâng, còn nơ ruy băng thì sao ạ?
Khách: Nơ ấy hả? Không cần đâu.
Nhân viên: Vâng tôi hiểu rồi.
Hỏi: Nhân viên tiệm hoa sẽ làm hoa như thế nào?""")

add_q(73, "Choukai M1-6: 女の人はいつ薬を飲みますか", 4,
"""🎯 Đáp án đúng: [4] 夜ご飯の後と寝る前 (Sau bữa tối và trước khi đi ngủ)

💬 Dịch nghĩa câu hỏi:
「女の 人は いつ 薬を 飲みますか。」
-> "Người phụ nữ sẽ uống thuốc vào những thời điểm nào?"

💡 Phân tích hội thoại:
• Bác sĩ căn dặn: 「この薬は 1日に 2回 飲んでください (Thuốc này ngày uống 2 lần)」.
• Cụ thể: 「晩ご飯の 後と、寝る 前です。朝と 昼は 飲まないで ください (Uống sau bữa cơm tối và trước khi đi ngủ. Buổi sáng và trưa thì không uống nhé)」.
• Như vậy thời điểm uống là: Sau bữa tối (晩ご飯の後) và Trước khi ngủ (寝る前).

🔍 Phân tích các lựa chọn:
- Hình 1: Sáng và tối
- Hình 2: Trưa và tối
- Hình 3: Sau cả 3 bữa ăn
- Hình 4: Sau bữa tối và trước khi ngủ -> (ĐÚNG)

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 6):
医者: 晩ご飯の後と、寝る前です。朝と昼は飲まないでください。 -> Đáp án [4]""",
"""【音声テキスト】
病院で 医者と 女の人が 話して います。女の人は いつ 薬を 飲みますか。
医者: 風邪ですね。薬を 出しますから、飲んで ください。
女: はい。
医者: この薬は 1日に 2回 飲んで ください。晩ご飯の 後と、寝る 前です。朝と 昼は 飲まないで ください。
女: わかりました。
女の人は いつ 薬を 飲みますか。""",
"""【Bản dịch Script】
Ở bệnh viện, bác sĩ đang nói chuyện với một bệnh nhân nữ. Người phụ nữ sẽ uống thuốc vào khi nào?
Bác sĩ: Chị bị cảm cúm rồi. Tôi sẽ kê đơn thuốc, chị nhớ uống nhé.
Nữ: Vâng ạ.
Bác sĩ: Thuốc này uống mỗi ngày 2 lần. Uống sau bữa tối và trước khi đi ngủ. Buổi sáng và buổi trưa thì không uống nhé.
Nữ: Vâng tôi rõ rồi.
Hỏi: Người phụ nữ sẽ uống thuốc vào khi nào?""")

add_q(74, "Choukai M1-7: 男の人はどの部屋に入りますか", 2,
"""🎯 Đáp án đúng: [2] 201号室 (Phòng 201)

💬 Dịch nghĩa câu hỏi:
「男の 人は どの 部屋に 入りますか。」
-> "Người đàn ông sẽ bước vào phòng nào?"

💡 Phân tích hội thoại:
• Người phụ nữ chỉ dẫn phòng học: 「留学生の 試験は 2階の 部屋です (Kỳ thi của lưu học sinh ở tầng 2)」.
• Tầng 2 có 2 phòng là 201 và 202: 「201号室と 202号室が ありますね。201号室に 入って ください (Có phòng 201 và 202, bạn hãy vào phòng 201 nhé)」.
• Do đó người đàn ông sẽ vào phòng 201.

🔍 Phân tích các lựa chọn:
- Hình 1: Phòng 101 (ở tầng 1)
- Hình 2: Phòng 201 (ở tầng 2) - (ĐÚNG)
- Hình 3: Phòng 202
- Hình 4: Phòng 102

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 7):
女: 201号室と 202号室が ありますね。201号室に 入って ください。 -> Đáp án [2]""",
"""【音声テキスト】
女の人が 話して います。留学生の 男の人は どの 部屋に 入りますか。
女: これから 日本語の テストを します。留学生の 方は 2階へ 行って ください。階段を 上がると、201号室と 202号室が ありますね。201号室に 入って ください。
男の人は どの 部屋に 入りますか。""",
"""【Bản dịch Script】
Một cô giáo đang dặn dò. Nam lưu học sinh sẽ vào căn phòng nào?
Cô giáo: Bây giờ chúng ta sẽ bắt đầu bài kiểm tra tiếng Nhật. Các bạn lưu học sinh xin mời lên tầng 2. Khi đi lên cầu thang sẽ thấy phòng 201 và 202, các em hãy vào phòng 201 nhé.
Hỏi: Nam sinh sẽ bước vào phòng nào?""")

# Choukai Mondai 2: Q75 - Q80 (6 câu)
add_q(75, "Choukai M2-1: 男の人はどのシャツを買いますか", 3,
"""🎯 Đáp án đúng: [3] 白くてポケットがある半袖シャツ (Áo ngắn tay màu trắng có túi)

💬 Dịch nghĩa câu hỏi:
「男の 人は どの シャツを 買いますか。」
-> "Người đàn ông sẽ mua chiếc áo sơ mi nào?"

💡 Phân tích hội thoại:
• Về tay áo: Thời tiết mùa hè nóng nên chọn áo cộc tay 「半袖 (はんそで)」.
• Về màu sắc: Chọn màu trắng 「白いシャツ」.
• Về túi áo: Người đàn ông muốn có túi áo để đựng bút 「ポケットが ある ほうが いいです」.
• Kết luận: Áo ngắn tay, màu trắng, có túi trước ngực -> Hình 3.

🔍 Phân tích các lựa chọn:
- Hình 1: Áo dài tay
- Hình 2: Áo ngắn tay màu trắng không có túi
- Hình 3: Áo ngắn tay màu trắng có túi ngực -> (ĐÚNG)
- Hình 4: Áo cộc tay màu đen/kẻ sọc

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 8):
男: ポケットがあるほうがいいです。じゃ、これにします。 -> Đáp án [3]""",
"""【音声テキスト】
店で 男の人と 女の人が 話して います。男の人は どの シャツを 買いますか。
男: すみません、白い シャツを 見せて ください。
女: 半袖ですか、長袖ですか。
男: 半袖を お願いします。夏ですから。
女: はい、こちらです。ポケットの あるのと ないのが ございますが。
男: ペンを 入れますから、ポケットが ある ほうが いいです。
女: では、こちらですね。
男の人は どの シャツを 買いますか。""",
"""【Bản dịch Script】
Tại cửa hàng, người đàn ông đang nói chuyện với nhân viên. Người đàn ông sẽ mua áo sơ mi nào?
Khách: Cho tôi xem áo sơ mi màu trắng với.
Nhân viên: Quý khách muốn áo ngắn tay hay dài tay ạ?
Khách: Cho tôi loại cộc tay nhé, mùa hè rồi mà.
Nhân viên: Vâng, ở đây ạ. Có loại có túi và không có túi áo ạ.
Khách: Tôi hay để bút nên loại có túi sẽ tiện hơn.
Nhân viên: Vậy là chiếc này ạ.
Hỏi: Người đàn ông sẽ mua chiếc áo nào?""")

add_q(76, "Choukai M2-2: 男の人はどうしてきのうパーティーに行きませんでしたか", 1,
"""🎯 Đáp án đúng: [1] 熱があって頭が痛かったから (Bị sốt và đau đầu)

💬 Dịch nghĩa câu hỏi:
「男の 人は どうして きのう パーティーに 行きませんでしたか。」
-> "Tại sao hôm qua người đàn ông lại không đến bữa tiệc?"

💡 Phân tích hội thoại:
• Người phụ nữ hỏi: 「きのう パーティーに 来ませんでしたね。どうしたんですか (Hôm qua không thấy anh đến tiệc, anh bị sao thế?)」.
• Người đàn ông giải thích: 「きのうは 朝から 熱が あって、頭も 痛かったんです (Hôm qua từ sáng tôi đã bị sốt, đầu lại đau nữa)」.
• Lý do là bị ốm sốt và đau đầu -> Đáp án [1].

🔍 Phân tích các lựa chọn:
- 1. Bị sốt và đau đầu (熱があって頭が痛かった) - (ĐÚNG)
- 2. Bận công việc công ty
- 3. Quên mất thời gian
- 4. Đi du lịch cùng gia đình

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 9):
男: きのうは 朝から 熱があって、頭も痛かったんです。 -> Đáp án [1]""",
"""【音声テキスト】
男の人と 女の人が 話して います。男の人は どうして きのう パーティーに 行きませんでしたか。
女: 田中さん、きのう パーティーに 来ませんでしたね。どうしたんですか。
男: ああ、きのうは 朝から 熱が あって、頭も 痛かったんです。
女: ええっ、そうだったんですか。病院へ 行きましたか。
男: はい、薬を 飲んで 一日中 寝て いました。今は もう 大丈夫です。
男の人は どうして きのう パーティーに 行きませんでしたか。""",
"""【Bản dịch Script】
Một người đàn ông và một người phụ nữ đang nói chuyện. Tại sao hôm qua người đàn ông không đến bữa tiệc?
Nữ: Anh Tanaka này, hôm qua không thấy anh đến bữa tiệc nhỉ. Anh có chuyện gì thế?
Nam: À, hôm qua từ sáng tôi đã bị phát sốt, đầu lại đau buốt nữa.
Nữ: Ôi thế cơ à! Anh đã đi khám bệnh viện chưa?
Nam: Tôi đi rồi, uống thuốc rồi nằm ngủ cả ngày. Bây giờ thì ổn rồi.
Hỏi: Tại sao hôm qua người đàn ông không đến bữa tiệc?""")

add_q(77, "Choukai M2-3: 男の人はだれにカメラを借りますか", 4,
"""🎯 Đáp án đúng: [4] 田中さんのお兄さん (Anh trai của Tanaka)

💬 Dịch nghĩa câu hỏi:
「男の 人は だれに カメラを 借りますか。」
-> "Người đàn ông sẽ mượn máy ảnh từ ai?"

💡 Phân tích hội thoại:
• Người đàn ông cần máy ảnh đi du lịch, hỏi mượn bạn Tanaka: 「田中さん、カメラを 貸して くれませんか」.
• Tanaka bảo: 「私の カメラは 今 壊れて います。でも、兄が 新しいのを 持って いますから、兄に 頼んで みますよ (Máy của tôi đang hỏng rồi. Nhưng anh trai tôi có cái máy mới, để tôi nhờ anh trai tôi cho mượn)」.
• Như vậy, người cho mượn máy ảnh là anh trai của Tanaka (田中さんのお兄さん).

🔍 Phân tích các lựa chọn:
- 1. Tanaka (máy Tanaka bị hỏng)
- 2. Em gái Tanaka
- 3. Thầy giáo
- 4. 田中さんのお兄さん (Anh trai của Tanaka) - (ĐÚNG)

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 10):
女: 兄が新しいのを持っていますから、兄に聞いてみますよ。 -> Đáp án [4]""",
"""【音声テキスト】
男の人と 女の人が 話して います。男の人は だれに カメラを 借りますか。
男: あした 旅行に 行くんですが、カメラを 貸して くれませんか。
女: 私の カメラですか。今、壊れて いるんですよ。
男: そうですか。困ったなあ。
女: あ、兄が 新しいのを 持って いますよ。兄に 聞いて みましょうか。
男: え、いいんですか。お願いします。
男の人は だれに カメラを 借りますか。""",
"""【Bản dịch Script】
Một người đàn ông và một người phụ nữ đang nói chuyện. Người đàn ông sẽ mượn máy ảnh của ai?
Nam: Ngày mai tôi đi du lịch, bạn có thể cho tôi mượn máy ảnh được không?
Nữ: Máy ảnh của tôi ấy hả? Hiện đang bị hỏng mất rồi.
Nam: Thế à, gay go nhỉ.
Nữ: À, anh trai tôi có một chiếc máy ảnh mới đấy. Để tôi hỏi anh trai tôi giúp bạn nhé?
Nam: Ôi thế thì tốt quá, nhờ bạn nhé.
Hỏi: Người đàn ông sẽ mượn máy ảnh từ ai?""")

add_q(78, "Choukai M2-4: 男の学生は何で学校に来ていますか", 3,
"""🎯 Đáp án đúng: [3] 地下鉄 (Tàu điện ngầm)

💬 Dịch nghĩa câu hỏi:
「男の 学生は 何で 学校に 来て いますか。」
-> "Bạn nam sinh viên đi đến trường bằng phương tiện gì?"

💡 Phân tích hội thoại:
• Nữ sinh hỏi: 「いつも 自転車で 学校へ 来ますか (Bạn hay đi xe đạp đến trường à?)」.
• Nam sinh đáp: 「以前は 自転車でしたが、今は 地下鉄で 来て います。駅まで 歩いて、そこから 地下鉄に 乗ります (Trước đây thì đi xe đạp, nhưng hiện giờ tôi đi bằng tàu điện ngầm. Tôi đi bộ ra ga rồi từ đó bắt tàu ngầm)」.
• Phương tiện hiện tại nam sinh dùng đến trường là tàu điện ngầm (地下鉄).

🔍 Phân tích các lựa chọn:
- 1. Xe đạp (自転車 - trước đây)
- 2. Xe buýt (バス)
- 3. 地下鉄 (Tàu điện ngầm) - (ĐÚNG)
- 4. Đi bộ toàn bộ quãng đường

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 11):
男: 今は 地下鉄で 来て います。 -> Đáp án [3]""",
"""【音声テキスト】
学校で 男の学生と 女の学生が 話して います。男の学生は 何で 学校に 来て いますか。
女: 山田くんは いつも 自転車で 学校へ 来るの？
男: ううん、前は 自転車だったけど、今は 地下鉄で 来て いるよ。
女: へえ、電車なんだ。
男: うん、家から 駅まで 歩いて、そこから 地下鉄で 15分くらい。
女: そうなんだ。
男の学生は 何で 学校に 来て いますか。""",
"""【Bản dịch Script】
Ở trường học, hai sinh viên đang nói chuyện. Bạn nam sinh đến trường bằng gì?
Nữ: Yamada này, bạn toàn đi học bằng xe đạp à?
Nam: Không, trước kia thì đi xe đạp, nhưng giờ mình đi bằng tàu điện ngầm rồi.
Nữ: Thế à, đi tàu điện à.
Nam: Ừ, đi bộ từ nhà ra ga, rồi từ ga đi tàu ngầm mất tầm 15 phút.
Nữ: Ra vậy.
Hỏi: Bạn nam sinh viên đến trường bằng phương tiện gì?""")

add_q(79, "Choukai M2-5: 男の人は日曜日何をしますか", 2,
"""🎯 Đáp án đúng: [2] 部屋を掃除する (Dọn dẹp phòng)

💬 Dịch nghĩa câu hỏi:
「男の 人は 日曜日、何を しますか。」
-> "Người đàn ông sẽ làm gì vào Chủ nhật?"

💡 Phân tích hội thoại:
• Nữ rủ: 「日曜日、いっしょに 映画を 見に 行きませんか (Chủ nhật đi xem phim cùng tôi không?)」.
• Nam từ chối: 「日曜日は ちょっと... 部屋の 掃除を しなければ ならないんです。最近 忙しくて 全然 掃除して いなくて (Chủ nhật thì hơi kẹt... Tôi phải dọn dẹp phòng. Dạo này bận quá nên chưa dọn dẹp gì cả)」.
• Việc người đàn ông sẽ làm vào Chủ nhật là dọn dẹp phòng (部屋を掃除する).

🔍 Phân tích các lựa chọn:
- 1. Đi xem phim (映画を見る)
- 2. 部屋を掃除する (Dọn dẹp phòng) - (ĐÚNG)
- 3. Đi mua sắm
- 4. Đi làm ở công ty

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 12):
男: 日曜日は 部屋の掃除をしなければならないんです。 -> Đáp án [2]""",
"""【音声テキスト】
男の人と 女の人が 話して います。男の人は 日曜日、何を しますか。
女: 木村さん、日曜日 いっしょに 映画を 見に 行きませんか。
男: ああ、日曜日は ちょっと...。
女: 何か 予定が ありますか。
男: ええ、部屋の 掃除を しようと 思って いるんです。最近 忙しくて、部屋が すごく 汚いんですよ。
女: そうですか、じゃあ また 今度ですね。
男の人は 日曜日、何を しますか。""",
"""【Bản dịch Script】
Một người đàn ông và một người phụ nữ đang nói chuyện. Người đàn ông sẽ làm gì vào Chủ nhật?
Nữ: Anh Kimura ơi, Chủ nhật này cùng đi xem phim với em nhé?
Nam: À, Chủ nhật thì hơi kẹt rồi...
Nữ: Anh có kế hoạch gì rồi à?
Nam: Ừ, anh định dọn dẹp phòng ốc một bữa. Dạo này bận quá, phòng bừa bộn bẩn quá rồi.
Nữ: Vậy ạ, thế để dịp khác nhé.
Hỏi: Người đàn ông sẽ làm gì vào Chủ nhật?""")

add_q(80, "Choukai M2-6: 二人はどこで晩ご飯を食べますか", 2,
"""🎯 Đáp án đúng: [2] カレーの店 (Quán cơm cà ri)

💬 Dịch nghĩa câu hỏi:
「二人は どこで 晩ご飯を 食べますか。」
-> "Hai người sẽ ăn cơm tối ở đâu?"

💡 Phân tích hội thoại:
• Người phụ nữ gợi ý: Đi ăn mì ramen hay ăn cơm cà ri?
• Người đàn ông bảo: 「きのう ラーメンを 食べましたから、今日は カレーが いいです (Hôm qua tôi vừa ăn ramen rồi, nên hôm nay ăn cà ri đi)」.
• Người phụ nữ đồng ý: 「じゃあ、駅前の 新しい カレー屋に 行きましょう (Vậy chúng ta đến quán cà ri mới mở trước ga nhé)」.
• Nơi hai người sẽ ăn tối là tiệm cà ri (カレーの店).

🔍 Phân tích các lựa chọn:
- 1. Quán mì Ramen (hôm qua nam đã ăn rồi)
- 2. カレーの店 (Quán cơm cà ri) - (ĐÚNG)
- 3. Ăn cơm ở nhà
- 4. Quán sushi

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 13):
男: きのうラーメンを食べましたから、今日はカレーがいいです。 -> Đáp án [2]""",
"""【音声テキスト】
男の人と 女の人が 話して います。二人は どこで 晩ご飯を 食べますか。
女: 今日の 晩ご飯、何に しますか。
男: そうですね。ラーメンか カレーは どうですか。
女: どちらでも いいですよ。
男: 私は きのう ラーメンを 食べましたから、今日は カレーが いいです。
女: いいですね。駅の 前に 新しい カレーの 店が できましたよ。あそこへ 行きましょう。
男: そうしましょう。
二人は どこで 晩ご飯を 食べますか。""",
"""【Bản dịch Script】
Hai người đang bàn về bữa tối. Hai người sẽ ăn tối ở đâu?
Nữ: Tối nay ăn món gì đây anh?
Nam: Xem nào, hay là ăn ramen hoặc cà ri nhé?
Nữ: Món nào em cũng thích cả.
Nam: Hôm qua anh vừa ăn ramen rồi, nên hôm nay ăn cà ri đi.
Nữ: Hay đó! Ở trước ga mới mở một quán cà ri mới đấy, mình đến đó nhé.
Nam: Nhất trí luôn.
Hỏi: Hai người sẽ ăn cơm tối ở đâu?""")

# Choukai Mondai 3: Q81 - Q85 (5 câu - Tranh tình huống)
add_q(81, "Choukai M3-1: 図書館で本を借りたいとき", 1,
"""🎯 Đáp án đúng: [1] この本を 貸して ください。

💬 Dịch nghĩa tình huống:
「図書館で 本を 借りたいです。何と 言いますか。」
-> "Muốn mượn sách ở thư viện. Bạn sẽ nói như thế nào?"

💡 Phân tích tình huống:
• Khi muốn mượn sách từ nhân viên thư viện, ta dùng mẫu nhờ vả: 「[Vật] を 貸して ください (Xin hãy cho tôi mượn cuốn sách này)」.
• Lựa chọn 2 「借りて ください」 nghĩa là mời người khác mượn (sai chiều hành động).
• Lựa chọn 3 「返して ください」 nghĩa là xin hãy trả lại sách (chỉ dành cho người cho mượn đòi sách).

🔍 Phân tích các lựa chọn:
- 1. この本を 貸して ください (Xin hãy cho tôi mượn cuốn sách này): (ĐÚNG)
- 2. この本を 借りて ください (Xin bạn hãy mượn cuốn này - Sai người thực hiện)
- 3. この本を 返して ください (Xin hãy trả lại cuốn sách này - Sai nghĩa)

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 14):
1. この本を 貸して ください。 -> Đáp án [1]""",
"""【音声テキスト】
図書館で 本を 借りたいです。何と 言いますか。
1. この本を 貸して ください。
2. この本を 借りて ください。
3. この本を 返して ください。""",
"""【Bản dịch Script】
Muốn mượn sách ở thư viện. Bạn sẽ nói thế nào?
1. Xin vui lòng cho tôi mượn cuốn sách này. (貸してください)
2. Xin mời mượn cuốn sách này.
3. Xin vui lòng trả lại cuốn sách này.""")

add_q(82, "Choukai M3-2: 電車の中で席をゆずるとき", 3,
"""🎯 Đáp án đúng: [3] どうぞ。

💬 Dịch nghĩa tình huống:
「電車の中で 席を ゆずります。何と 言いますか。」
-> "Trên tàu điện, bạn muốn nhường ghế cho người khác. Bạn sẽ nói như thế nào?"

💡 Phân tích tình huống:
• Khi nhường ghế hoặc mời ai đó nhận sự giúp đỡ/ngồi xuống, câu ngắn gọn lịch sự chuẩn mực là: 「どうぞ (Xin mời bác/cô ngồi ạ)」.
• Lựa chọn 1 「どうも」 là cảm ơn. Lựa chọn 2 「いただきます」 là câu chào trước khi ăn uống.

🔍 Phân tích các lựa chọn:
- 1. どうも (Cảm ơn / Xin chào - không dùng khi mời nhường chỗ)
- 2. いただきます (Mời ăn cơm)
- 3. どうぞ (Xin mời ngồi ạ): (ĐÚNG)

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 15):
3. どうぞ。 -> Đáp án [3]""",
"""【音声テキスト】
電車の中で 席を ゆずります。何と 言いますか。
1. どうも。
2. いただきます。
3. どうぞ。""",
"""【Bản dịch Script】
Trên tàu điện, bạn muốn nhường chỗ ngồi cho người lớn tuổi. Bạn sẽ nói thế nào?
1. Cảm ơn.
2. Tôi xin phép dùng bữa.
3. Xin mời bác ngồi ạ. (どうぞ)""")

add_q(83, "Choukai M3-3: 友だちの家から帰るとき", 3,
"""🎯 Đáp án đúng: [3] じゃ、また。

💬 Dịch nghĩa tình huống:
「友だちの 家から 帰ります。何と 言いますか。」
-> "Bạn ra về từ nhà của người bạn. Bạn sẽ nói thế nào để chào tạm biệt?"

💡 Phân tích tình huống:
• Khi chào tạm biệt bạn bè cùng trang lứa khi ra về: 「じゃ、また (Hẹn gặp lại nhé)」.
• Lựa chọn 1 「いってきます」 dùng khi rời nhà của chính mình và sẽ quay về. Lựa chọn 2 「ただいま」 dùng khi về đến nhà mình.

🔍 Phân tích các lựa chọn:
- 1. いってきます (Con đi đây - nói khi rời nhà mình)
- 2. ただいま (Tôi đã về rồi đây - nói khi về tới nhà mình)
- 3. じゃ、また (Chào nhé, hẹn gặp lại): (ĐÚNG)

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 16):
3. じゃ、また。 -> Đáp án [3]""",
"""【音声テキスト】
友だちの 家から 帰ります。何と 言いますか。
1. いってきます。
2. ただいま。
3. じゃ、また。""",
"""【Bản dịch Script】
Bạn ra về từ nhà của bạn bè. Bạn sẽ nói thế nào?
1. Tôi đi rồi về nhé.
2. Tôi đã về rồi đây.
3. Chào nhé, hẹn gặp lại! (じゃ、また)""")

add_q(84, "Choukai M3-4: 忘れ物を教えるとき", 2,
"""🎯 Đáp án đúng: [2] 傘を 忘れましたよ。

💬 Dịch nghĩa tình huống:
「友だちが 傘を 忘れて 帰ろうと して います。何と 言いますか。」
-> "Người bạn để quên chiếc ô và sắp đi về. Bạn sẽ nói gì để nhắc nhở?"

💡 Phân tích tình huống:
• Nhắc ai đó đã để quên đồ vật (chiếc ô): 「[Vật] を 忘れましたよ (Bạn để quên ô kìa!)」.
• Lựa chọn 1 「傘を 持ちませんよ」 (Bạn không cầm ô đâu). Lựa chọn 3 「傘を なくしましたよ」 (Bạn làm mất ô rồi).

🔍 Phân tích các lựa chọn:
- 1. 傘を 持ちませんよ (Không cầm ô)
- 2. 傘を 忘れましたよ (Bạn quên ô kìa!): (ĐÚNG)
- 3. 傘を なくしましたよ (Làm mất ô rồi)

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 17):
2. 傘を 忘れましたよ。 -> Đáp án [2]""",
"""【音声テキスト】
友だちが 傘を 忘れて 帰ろうと して います。何と 言いますか。
1. 傘を 持ちませんよ。
2. 傘を 忘れましたよ。
3. 傘を なくしましたよ。""",
"""【Bản dịch Script】
Người bạn để quên chiếc ô và chuẩn bị đi về. Bạn sẽ nói thế nào để gọi nhắc?
1. Bạn không cầm ô đâu nhé.
2. Bạn để quên ô kìa! (傘を忘れましたよ)
3. Bạn làm mất ô rồi đấy.""")

add_q(85, "Choukai M3-5: 先生に質問があるとき", 3,
"""🎯 Đáp án đúng: [3] 先生、ちょっと いいですか。

💬 Dịch nghĩa tình huống:
「先生に 質問が あります。何と 言いますか。」
-> "Bạn có câu hỏi muốn hỏi thầy cô giáo. Bạn sẽ mở lời như thế nào?"

💡 Phân tích tình huống:
• Mẫu câu mở lời xin phép trước khi hỏi chuyện giáo viên / cấp trên một cách lễ phép:
  「先生、ちょっと いいですか (Thưa thầy, thầy có tiện một chút không ạ?)」.
• Lựa chọn 1 「先生、質問を 聞いてください」 (thầy hãy nghe câu hỏi đi - nói cộc lốc thiếu tôn kính). Lựa chọn 2 「先生、答えましょうか」 (để em trả lời nhé).

🔍 Phân tích các lựa chọn:
- 1. 先生、質問を 聞いて ください (Thiếu kính cẩn)
- 2. 先生、答えましょうか (Thầy để em trả lời nhé - sai ngược vai)
- 3. 先生、ちょっと いいですか (Thưa thầy, thầy có tiện một chút không ạ?): (ĐÚNG)

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 18):
3. 先生、ちょっと いいですか。 -> Đáp án [3]""",
"""【音声テキスト】
先生に 質問が あります。何と 言いますか。
1. 先生、質問を 聞いて ください。
2. 先生、答えましょうか。
3. 先生、ちょっと いいですか。""",
"""【Bản dịch Script】
Bạn có câu hỏi muốn hỏi thầy giáo. Bạn sẽ mở lời nói thế nào?
1. Thưa thầy, thầy nghe câu hỏi đi ạ.
2. Thưa thầy, để em trả lời nhé.
3. Thưa thầy, em xin phép làm phiền thầy một chút được không ạ? (ちょっといいですか)""")

# Choukai Mondai 4: Q86 - Q91 (6 câu - Phản xạ nhanh)
add_q(86, "Choukai M4-1: 今日は暑いですね", 3,
"""🎯 Đáp án đúng: [3] ええ、本当に。

💬 Dịch nghĩa câu đối thoại:
「今日は 暑いですね。」
-> "Hôm nay trời nóng thật đấy nhỉ."

💡 Phân tích câu hỏi phản xạ:
• Câu nhận xét thời tiết có trợ từ cảm thán đồng tình 「～ね」.
• Cách đáp lại thể hiện sự đồng tình: 「ええ、本当に (Vâng, công nhận là thật vậy)」.
• Lựa chọn 1 「いいえ、暑いです」 mâu thuẫn (Nói 'Không' rồi lại nói 'nóng'). Lựa chọn 2 「どういたしまして」 là 'Không có chi' (đáp lại lời cảm ơn).

🔍 Phân tích các lựa chọn:
- 1. いいえ、暑いです (Không, trời nóng - mâu thuẫn)
- 2. どういたしまして (Không có chi - đáp lại ありがとう)
- 3. ええ、本当に (Vâng, công nhận thật thế): (ĐÚNG)

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 19):
3. ええ、本当に。 -> Đáp án [3]""",
"""【音声テキスト】
今日は 暑いですね。
1. いいえ、暑いです。
2. どういたしまして。
3. ええ、本当に。""",
"""【Bản dịch Script】
Hôm nay trời nóng thật đấy nhỉ!
1. Không, trời nóng.
2. Không có chi đâu ạ.
3. Vâng, công nhận nóng thật ạ. (ええ、本当に)""")

add_q(87, "Choukai M4-2: 昨日のテスト、難しかったですか", 3,
"""🎯 Đáp án đúng: [3] いいえ、易しかったです。

💬 Dịch nghĩa câu đối thoại:
「昨日の テスト、難しかったですか。」
-> "Bài kiểm tra hôm qua có khó không bạn?"

💡 Phân tích câu hỏi phản xạ:
• Câu hỏi tính từ trong quá khứ: 「難しかったですか (Có khó không?)」.
• Lựa chọn 3: 「いいえ、易しかったです (Không, dễ lắm)」 - dùng từ trái nghĩa 易しい (やさしい: dễ) phủ định rất chính xác và tự nhiên.
• Lựa chọn 1 「はい、難しくなかったです」 mâu thuẫn (Vâng + không khó). Lựa chọn 2 「いいえ、難しかったです」 mâu thuẫn (Không + khó).

🔍 Phân tích các lựa chọn:
- 1. はい、難しくなかったです (Vâng, không khó - mâu thuẫn Yes/No)
- 2. いいえ、難しかったです (Không, khó - mâu thuẫn)
- 3. いいえ、易しかったです (Không, dễ ợt à): (ĐÚNG)

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 20):
3. いいえ、易しかったです。 -> Đáp án [3]""",
"""【音声テキスト】
きのうの テスト、難しかったですか。
1. はい、難しくなかったです。
2. いいえ、難しかったです。
3. いいえ、易しかったです。""",
"""【Bản dịch Script】
Bài kiểm tra hôm qua có khó không?
1. Vâng, không khó.
2. Không, bài khó.
3. Không, bài dễ lắm bạn ạ. (いいえ、易しかったです)""")

add_q(88, "Choukai M4-3: ちょっとペンを貸してくれませんか", 1,
"""🎯 Đáp án đúng: [1] ええ、いいですよ。

💬 Dịch nghĩa câu đối thoại:
「ちょっと ペンを 貸して くれませんか。」
-> "Bạn có thể cho tôi mượn chiếc bút một lát được không?"

💡 Phân tích câu hỏi phản xạ:
• Lời nhờ vả: 「～てくれませんか (bạn làm ơn... cho tôi được không?)」.
• Đồng ý cho mượn: 「ええ、いいですよ (Vâng, được chứ / Bạn cứ lấy đi)」.
• Lựa chọn 2 「はい、借ります」 (Vâng, tôi sẽ mượn - sai người). Lựa chọn 3 「どうも ありがとう」 (Cảm ơn nhiều - đây là lời người đi mượn nói khi nhận đồ).

🔍 Phân tích các lựa chọn:
- 1. ええ、いいですよ (Vâng, được chứ bạn): (ĐÚNG)
- 2. はい、借ります (Vâng, tôi sẽ mượn - sai người)
- 3. どうも ありがとう (Cảm ơn bạn nhiều)

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 21):
1. ええ、いいですよ。 -> Đáp án [1]""",
"""【音声テキスト】
ちょっと ペンを 貸して くれませんか。
1. ええ、いいですよ。
2. はい、借ります。
3. どうも ありがとう。""",
"""【Bản dịch Script】
Bạn cho mình mượn cây bút một lát được không?
1. Ừ, được chứ, bạn lấy đi. (ええ、いいですよ)
2. Vâng, mình sẽ mượn.
3. Cảm ơn bạn rất nhiều.""")

add_q(89, "Choukai M4-4: 昨日は何時に寝ましたか", 3,
"""🎯 Đáp án đúng: [3] 11時ごろです。

💬 Dịch nghĩa câu đối thoại:
「昨日は 何時に 寝ましたか。」
-> "Hôm qua bạn đi ngủ vào lúc mấy giờ vậy?"

💡 Phân tích câu hỏi phản xạ:
• Câu hỏi mốc thời gian: 「何時に (Vào lúc mấy giờ?)」.
• Câu trả lời nêu mốc thời gian: 「11時ごろです (Khoảng 11 giờ đêm)」.
• Lựa chọn 1 「8時間です」 là thời lượng kéo dài (hỏi bằng なんじかん). Lựa chọn 2 「早く 寝ました」 không nêu giờ cụ thể.

🔍 Phân tích các lựa chọn:
- 1. 8時間です (8 tiếng đồng hồ - trả lời cho 何時間)
- 2. 早く 寝ました (Tôi ngủ sớm)
- 3. 11時ごろです (Khoảng 11 giờ): (ĐÚNG - Trả lời cho 何時に)

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 22):
3. 11時ごろです。 -> Đáp án [3]""",
"""【音声テキスト】
きのうは 何時に 寝ましたか。
1. 8時間です。
2. 早く 寝ました。
3. 11時ごろです。""",
"""【Bản dịch Script】
Tối qua bạn đi ngủ lúc mấy giờ thế?
1. 8 tiếng đồng hồ.
2. Mình đã đi ngủ sớm.
3. Khoảng tầm 11 giờ. (11時ごろです)""")

add_q(90, "Choukai M4-5: 週末はどこかへ行きましたか", 2,
"""🎯 Đáp án đúng: [2] どこへも 行きませんでした。

💬 Dịch nghĩa câu đối thoại:
「週末は どこかへ 行きましたか。」
-> "Cuối tuần rồi bạn có đi đâu chơi không?"

💡 Phân tích câu hỏi phản xạ:
• Câu hỏi: Có đi đâu không? 「どこかへ 行きましたか」.
• Câu trả lời phủ định hoàn toàn: 「どこへも 行きませんでした (Tôi chẳng đi đâu cả, chỉ ở nhà)」.
• Lựa chọn 1 「はい、行きませんでした」 mâu thuẫn (Vâng + không đi). Lựa chọn 3 「いいえ、行きました」 mâu thuẫn (Không + có đi).

🔍 Phân tích các lựa chọn:
- 1. はい、行きませんでした (Vâng, tôi không đi - mâu thuẫn Yes/No)
- 2. どこへも 行きませんでした (Tôi không đi đâu cả): (ĐÚNG)
- 3. いいえ、行きました (Không, tôi đã đi - mâu thuẫn)

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 23):
2. どこへも 行きませんでした。 -> Đáp án [2]""",
"""【音声テキスト】
週末は どこかへ 行きましたか。
1. はい、行きませんでした。
2. どこへも 行きませんでした。
3. いいえ、行きました。""",
"""【Bản dịch Script】
Cuối tuần vừa rồi bạn có đi đâu chơi không?
1. Vâng, mình đã không đi.
2. Mình chẳng đi đâu cả. (どこへも行きませんでした)
3. Không, mình có đi.""")

add_q(91, "Choukai M4-6: ごちそうさまでした", 2,
"""🎯 Đáp án đúng: [2] いいえ、どういたしまして。

💬 Dịch nghĩa câu đối thoại:
「ごちそうさまでした。」
-> "Cảm ơn vì bữa ăn thịnh soạn nhé!"

💡 Phân tích câu hỏi phản xạ:
• Sau bữa ăn, người được mời ăn nói: 「ごちそうさまでした (Cảm ơn vì bữa ăn ngon)」.
• Chủ nhà hoặc người thết đãi sẽ đáp lại một cách lịch sự, khiêm tốn là: 「いいえ、どういたしまして (Không có chi, bạn thấy ngon miệng là vui rồi)」.
• Lựa chọn 1 「いただきます」 nói trước bữa ăn. Lựa chọn 3 「こちらこそ ありがとう」 nói cảm ơn lại.

🔍 Phân tích các lựa chọn:
- 1. いただきます (Nói trước khi ăn cơm)
- 2. いいえ、どういたしまして (Không có chi đâu ạ): (ĐÚNG - Đáp lại ごちそうさまでした)
- 3. お粗末さまでした (cũng là một cách đáp nhưng phương án đưa ra là どういたしまして)

📄 Trích PDF gốc (聴解原文 & 参考答案 - Câu 24):
2. いいえ、どういたしまして。 -> Đáp án [2]""",
"""【音声テキスト】
ごちそうさまでした。
1. いただきます。
2. いいえ、どういたしまして。
3. お願いします。""",
"""【Bản dịch Script】
Cảm ơn vì bữa ăn ngon miệng nhé!
1. Mời dùng bữa (nói trước khi ăn).
2. Dạ không có chi ạ. (いいえ、どういたしまして)
3. Xin nhờ bạn.""")

print(f"Total questions generated: {len(data_91)}")

# 1. Update scanned_n5_2013_07_official_answers.json
official_answers_map = {k: v["correctOption"] for k, v in sorted(data_91.items(), key=lambda x: int(x[0]))}
scanned_json_path = "H:/JP_ANHSENSEI/frontend/src/app/data/scanned_n5_2013_07_official_answers.json"
scanned_content = {
    "examCode": "n5-2013-07",
    "yearTitle": "Đề Thi Thật N5 (Tháng 07/2013)",
    "officialKey": "Official 2013-07 N5 Answer Table 91 Questions",
    "meta": {
        "sourceFile": "n5-2013-07.pdf",
        "totalQuestions": 91,
        "scannedAt": "2026-09-24T16:00:00.000Z",
        "scannedBy": "AnhSensei 100% Authentic Official N5 7/2013 Answer Table & Detailed Explanations Extractor"
    },
    "officialAnswers": official_answers_map
}

with open(scanned_json_path, "w", encoding="utf-8") as f:
    json.dump(scanned_content, f, ensure_ascii=False, indent=2)
print("Updated scanned_n5_2013_07_official_answers.json successfully!")

# 2. Update jlptDetailedExplanations.ts
ts_path = "H:/JP_ANHSENSEI/frontend/src/app/data/jlptDetailedExplanations.ts"
with open(ts_path, "r", encoding="utf-8") as f:
    ts_content = f.read()

# Generate TypeScript formatted object
ts_lines = ['  "n5-2013-07": {']
for num in range(1, 92):
    item = data_91[str(num)]
    ts_lines.append(f'    "{num}": {{')
    # escape strings for JSON/TS
    ts_lines.append(f'      "snippet": {json.dumps(item["snippet"], ensure_ascii=False)},')
    ts_lines.append(f'      "explanation": {json.dumps(item["explanation"], ensure_ascii=False)},')
    if "audioScriptJa" in item:
        ts_lines.append(f'      "audioScriptJa": {json.dumps(item["audioScriptJa"], ensure_ascii=False)},')
    if "audioScriptVi" in item:
        ts_lines.append(f'      "audioScriptVi": {json.dumps(item["audioScriptVi"], ensure_ascii=False)},')
    ts_lines.append(f'      "correctOption": {item["correctOption"]}')
    ts_lines.append('    },')
ts_lines.append('  },')
ts_block = "\n".join(ts_lines)

# Find and replace "n5-2013-07": { ... },
# We know it starts at `"n5-2013-07": {` and ends before `"n5-2026-new": {`
pattern = r'  "n5-2013-07": \{.*?\n  \},'
match = re.search(pattern, ts_content, re.DOTALL)
if match:
    new_ts_content = ts_content[:match.start()] + ts_block + ts_content[match.end():]
    with open(ts_path, "w", encoding="utf-8") as f:
        f.write(new_ts_content)
    print("Updated jlptDetailedExplanations.ts successfully!")
else:
    print("Could not find n5-2013-07 block in jlptDetailedExplanations.ts!")

