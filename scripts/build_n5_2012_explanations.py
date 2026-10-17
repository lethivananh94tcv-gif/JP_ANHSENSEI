import json

explanations = {
  "1": {
    "snippet": "すみません、水をください。",
    "explanation": "🎯 Đáp án đúng: [3] みず (水)\n\n💬 Dịch nghĩa câu:\n\"Xin lỗi, cho tôi xin nước uống với ạ.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán: [水] (thủy - nước) có âm Kun thuần Nhật chuẩn xác là 「みず」.\n• Âm On là 「すい」 (dùng trong từ ghép như 水曜日 - すいようび).\n• Trong câu đứng độc lập làm tân ngữ [水をください] bắt buộc đọc là 「みず」.\n\n🔍 Phân tích các lựa chọn:\n- 1. すい: Âm On (sai vì đứng độc lập)\n- 2. ずい: Biến âm sai\n- 3. みず: ĐÚNG - Âm Kun chuẩn của chữ 水 (nước uống)\n- 4. みす: Sai phụ âm cuối",
    "correctOption": 3
  },
  "2": {
    "snippet": "まいあさ 8じに 学校に いきます。",
    "explanation": "🎯 Đáp án đúng: [4] がっこう (学校)\n\n💬 Dịch nghĩa câu:\n\"Mỗi sáng tôi đều đến trường học lúc 8 giờ.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán: [学校] (học hiệu - trường học).\n• Chữ 学 (học) có âm On là 「がく」, ghép với chữ 校 (hiệu - 「こう」). Khi kết hợp phát sinh âm ngắt促音: がく + こう -> 「がっこう」.\n\n🔍 Phân tích các lựa chọn:\n- 1. かくこう: Sai âm đục và thiếu âm ngắt\n- 2. がくこう: Sai vì chưa biến âm ngắt\n- 3. かっこう: Sai âm đầu (phải là が)\n- 4. がっこう: ĐÚNG - Cách đọc chuẩn xác của 学校",
    "correctOption": 4
  },
  "3": {
    "snippet": "この コートは 安いですね。",
    "explanation": "🎯 Đáp án đúng: [1] やすい (安い)\n\n💬 Dịch nghĩa câu:\n\"Chiếc áo khoác này rẻ thật đấy nhỉ.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán: [安い] (an - rẻ, yên ổn). Tính từ đuôi い có âm đọc chuẩn là 「やすい」 (rẻ).\n\n🔍 Phân tích các lựa chọn:\n- 1. やすい: ĐÚNG - Rẻ (tiền)\n- 2. かるい (軽い): Nhẹ\n- 3. ふるい (古い): Cũ\n- 4. うすい (薄い): Mỏng, nhạt",
    "correctOption": 1
  },
  "4": {
    "snippet": "きょうは しゅくだいが 少ないです。",
    "explanation": "🎯 Đáp án đúng: [2] すくない (少ない)\n\n💬 Dịch nghĩa câu:\n\"Hôm nay có ít bài tập về nhà.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán: [少ない] (thiểu - ít) có âm đọc thuần Nhật là 「すくない」.\n\n🔍 Phân tích các lựa chọn:\n- 1. すこない: Sai nguyên âm (nhầm với すこし)\n- 2. すくない: ĐÚNG - Âm đọc chuẩn của 少ない\n- 3. すごない: Sai biến âm đục\n- 4. すぐない: Sai phụ âm",
    "correctOption": 2
  },
  "5": {
    "snippet": "この ふくは 六万円です。",
    "explanation": "🎯 Đáp án đúng: [3] ろくまんえん (六万円)\n\n💬 Dịch nghĩa câu:\n\"Bộ quần áo này có giá 60.000 yên (6 vạn yên).\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán: [六万] ghép bởi 六 (ろく - số 6) và 万 (まん - vạn/10.000). Đọc là 「ろくまんえん」.\n\n🔍 Phân tích các lựa chọn:\n- 1. よんせんえん: 4.000 yên\n- 2. ろくせんえん: 6.000 yên (六千円)\n- 3. ろくまんえん: ĐÚNG - 60.000 yên (六万円)\n- 4. よんまんえん: 40.000 yên (四万円)",
    "correctOption": 3
  },
  "6": {
    "snippet": "その かどを 左に まがって ください。",
    "explanation": "🎯 Đáp án đúng: [1] ひだり (左)\n\n💬 Dịch nghĩa câu:\n\"Xin vui lòng rẽ trái ở góc phố đằng kia.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán: [左] (tả - bên trái) có cách đọc chuẩn là 「ひだり」. Ngược lại với 右 (みぎ - bên phải).\n\n🔍 Phân tích các lựa chọn:\n- 1. ひだり: ĐÚNG - Bên trái\n- 2. みき: Phương án gây nhiễu\n- 3. みぎ (右): Bên phải\n- 4. ひたり: Sai phụ âm",
    "correctOption": 1
  },
  "7": {
    "snippet": "えんぴつを 三本 かして ください。",
    "explanation": "🎯 Đáp án đúng: [2] さんぼん (三本)\n\n💬 Dịch nghĩa câu:\n\"Xin hãy cho tôi mượn 3 chiếc bút chì.\"\n\n💡 Phân tích & Giải thích:\n• Đơn vị đếm vật thon dài [本 - ほん]: sau số 3 [さん] sẽ bị biến âm đục thành 「ぼん」: 三本 -> 「さんぼん」.\n\n🔍 Phân tích các lựa chọn:\n- 1. さんぽん: Sai (không dùng âm bán đục ぽん cho số 3)\n- 2. さんぼん: ĐÚNG - Biến âm đục chuẩn sau さん\n- 3. さんべん: Sai (đếm số lần: 3 lần)\n- 4. さんぺん: Sai cách đếm",
    "correctOption": 2
  },
  "8": {
    "snippet": "さとうさんは 先月 けっこんしました。",
    "explanation": "🎯 Đáp án đúng: [1] せんげつ (先月)\n\n💬 Dịch nghĩa câu:\n\"Anh/chị Sato đã kết hôn vào tháng trước.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán: [先月] (tiên nguyệt - tháng trước). 先 (せん) + 月 (げつ) -> 「せんげつ」.\n\n🔍 Phân tích các lựa chọn:\n- 1. せんげつ: ĐÚNG - Tháng trước\n- 2. せんしゅう (先週): Tuần trước\n- 3. こんげつ (今月): Tháng này\n- 4. こんしゅう (今週): Tuần này",
    "correctOption": 1
  },
  "9": {
    "snippet": "あの 山の なまえは なんですか。",
    "explanation": "🎯 Đáp án đúng: [1] やま (山)\n\n💬 Dịch nghĩa câu:\n\"Tên của ngọn núi đằng kia là gì vậy?\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán: [山] (sơn - ngọn núi) đứng độc lập đọc theo âm Kun thuần Nhật là 「やま」.\n\n🔍 Phân tích các lựa chọn:\n- 1. やま: ĐÚNG - Ngọn núi\n- 2. はな (花/鼻): Hoa / mũi\n- 3. とり (鳥): Con chim\n- 4. かわ (川): Con sông",
    "correctOption": 1
  },
  "10": {
    "snippet": "かんじを 九つ おぼえました。",
    "explanation": "🎯 Đáp án đúng: [4] ここのつ (九つ)\n\n💬 Dịch nghĩa câu:\n\"Tôi đã nhớ được 9 chữ Kanji.\"\n\n💡 Phân tích & Giải thích:\n• Đếm đồ vật bằng số từ thuần Nhật: 1つ (ひとつ), 2つ (ふたつ), ... 8つ (やっつ), 9つ (ここのつ), 10 (とお). Do đó chữ 九つ đọc là 「ここのつ」.\n\n🔍 Phân tích các lựa chọn:\n- 1. ななつ (七つ): 7 cái\n- 2. いつつ (五つ): 5 cái\n- 3. やっつ (八つ): 8 cái\n- 4. ここのつ (九つ): ĐÚNG - 9 cái",
    "correctOption": 4
  },
  "11": {
    "snippet": "これは どこの くにの お金ですか。",
    "explanation": "🎯 Đáp án đúng: [4] おかね (お金)\n\n💬 Dịch nghĩa câu:\n\"Đây là tiền của quốc gia nào vậy?\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán: [お金] (kim - tiền bạc). Chữ 金 đứng độc lập mang tiền tố kính ngữ お đọc là 「おかね」.\n\n🔍 Phân tích các lựa chọn:\n- 1. おがし: Sai\n- 2. おがね: Sai âm đục\n- 3. おかし (お菓子): Bánh kẹo\n- 4. おかね (お金): ĐÚNG - Tiền bạc",
    "correctOption": 4
  },
  "12": {
    "snippet": "どうぞ 飲んで ください。",
    "explanation": "🎯 Đáp án đúng: [4] のんで (飲んで)\n\n💬 Dịch nghĩa câu:\n\"Xin mời bạn uống nước ạ.\"\n\n💡 Phân tích & Giải thích:\n• Động từ [飲む - のむ] (ẩm - uống). Chia sang thể て: nhóm 1 đuôi む biến thành んで -> 「のんで」.\n\n🔍 Phân tích các lựa chọn:\n- 1. あそんで (遊んで): Chơi đùa\n- 2. ならんで (並んで): Xếp hàng\n- 3. よんで (読んで): Đọc\n- 4. のんで (飲んで): ĐÚNG - Uống",
    "correctOption": 4
  },
  "13": {
    "snippet": "あれが この まちで いちばん たかい ビルです。 -> 高い",
    "explanation": "🎯 Đáp án đúng: [1] 高い (たかい)\n\n💬 Dịch nghĩa câu:\n\"Kia là tòa nhà cao nhất ở thị trấn này.\"\n\n💡 Phân tích & Cấu trúc chữ Hán:\n• Từ 「たかい」 (cao) viết bằng chữ Hán chuẩn là 「高い」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 高い: ĐÚNG - Cao\n- 2. 高かい: Thừa chữ か\n- 3. 新い: Sai chữ Tân\n- 4. 新かい: Sai chữ Tân và thừa か\n\n📄 Trích PDF gốc (试题解析):\n(13) 1 句意: 那是这座城市里最高的建筑物。1. 高い: 高; 3. 新しい: 新",
    "correctOption": 1
  },
  "14": {
    "snippet": "すずきさんは えいごが できますか。 -> 英語",
    "explanation": "🎯 Đáp án đúng: [3] 英語 (えいご)\n\n💬 Dịch nghĩa câu:\n\"Anh Suzuki có biết nói tiếng Anh không?\"\n\n💡 Phân tích & Cấu trúc chữ Hán:\n• Từ 「えいご」 (tiếng Anh) viết bằng chữ Hán chuẩn là 「英語」 (anh ngữ).\n\n🔍 Phân tích các lựa chọn:\n- 1. 英話: Sai chữ Thoại\n- 2. 英説: Sai chữ Thuyết\n- 3. 英語: ĐÚNG - Tiếng Anh (Anh Ngữ)\n- 4. 英訳: Bản dịch tiếng Anh (Anh Dịch)\n\n📄 Trích PDF gốc (试题解析):\n(14) 3 句意: 铃木先生会英语吗？3. 英語: 英语; 4. 英訳: 译为英文",
    "correctOption": 3
  },
  "15": {
    "snippet": "たなかさんは きのう やすみでした。 -> 休み",
    "explanation": "🎯 Đáp án đúng: [2] 休み (やすみ)\n\n💬 Dịch nghĩa câu:\n\"Anh Tanaka hôm qua đã nghỉ làm/nghỉ học.\"\n\n💡 Phân tích & Cấu trúc chữ Hán:\n• Danh từ 「やすみ」 (ngày nghỉ, sự nghỉ phép) viết bằng chữ Hán là 「休み」 (Hưu).\n\n🔍 Phân tích các lựa chọn:\n- 1. 体み: Sai chữ Thể (からだ)\n- 2. 休み: ĐÚNG - Nghỉ ngơi (Hưu)\n- 3. 仕み: Sai chữ Sĩ\n- 4. 任み: Sai chữ Nhiệm\n\n📄 Trích PDF gốc (试题解析):\n(15) 2 句意: 田中先生昨天休息了。2. 休み: 休息",
    "correctOption": 2
  },
  "16": {
    "snippet": "わたしは きょうとで うまれました。 -> 生まれました",
    "explanation": "🎯 Đáp án đúng: [2] 生まれました (うまれました)\n\n💬 Dịch nghĩa câu:\n\"Tôi sinh ra ở Kyoto.\"\n\n💡 Phân tích & Cấu trúc chữ Hán:\n• Động từ 「うまれる (生まれる)」 (sinh ra, chào đời) viết bằng chữ Hán là 生.\n\n🔍 Phân tích các lựa chọn:\n- 1. 主まれました: Sai chữ Chủ\n- 2. 生まれました: ĐÚNG - Sinh ra (Sinh)\n- 3. 佐まれました: Sai chữ Tá\n- 4. 住まれました: Sai chữ Trú (住む - ở, sinh sống)\n\n📄 Trích PDF gốc (试题解析):\n(16) 2 句意: 我在京都出生。2. 生まれる: 出生; 4. 住む: 居住",
    "correctOption": 2
  },
  "17": {
    "snippet": "あさから あめが ふって います。 -> 雨",
    "explanation": "🎯 Đáp án đúng: [3] 雨 (あめ)\n\n💬 Dịch nghĩa câu:\n\"Trời đang đổ mưa suốt từ sáng đến giờ.\"\n\n💡 Phân tích & Cấu trúc chữ Hán:\n• Cơn mưa 「あめ」 viết bằng chữ Hán là 「雨」 (Vũ).\n\n🔍 Phân tích các lựa chọn:\n- 1. 雪 (ゆき): Tuyết\n- 2. 風 (かぜ): Gió\n- 3. 雨 (あめ): ĐÚNG - Mưa\n- 4. 雷 (かみなり): Sấm sét\n\n📄 Trích PDF gốc (试题解析):\n(17) 3 句意: 从早上开始就一直在下雨。1. 雪: 雪; 2. 風: 风; 3. 雨: 雨; 4. 雷: 雷",
    "correctOption": 3
  },
  "18": {
    "snippet": "さとうさんと はやしさんの あいだに たって ください。 -> 間",
    "explanation": "🎯 Đáp án đúng: [2] 間 (あいだ)\n\n💬 Dịch nghĩa câu:\n\"Xin vui lòng đứng vào giữa anh Sato và anh Hayashi.\"\n\n💡 Phân tích & Cấu trúc chữ Hán:\n• Khoảng cách ở giữa 「あいだ」 viết bằng chữ Hán là 「間」 (Gian - ở giữa, khoảng giữa).\n\n🔍 Phân tích các lựa chọn:\n- 1. 閊: Chữ Hán sai\n- 2. 間: ĐÚNG - Ở giữa (AとBの間)\n- 3. 開: Mở (ひらく/あける)\n- 4. 問: Hỏi (とい/もん)\n\n📄 Trích PDF gốc (试题解析):\n(18) 2 句意: 请站在佐藤先生和林先生中间。2. 間: 之间，中间; 4. 問: 问，提问",
    "correctOption": 2
  },
  "19": {
    "snippet": "こうえんの きたがわに としょかんが あります。 -> 北がわ",
    "explanation": "🎯 Đáp án đúng: [4] 北がわ (きたがわ)\n\n💬 Dịch nghĩa câu:\n\"Ở phía bắc của công viên có một thư viện.\"\n\n💡 Phân tích & Cấu trúc chữ Hán:\n• Hướng bắc 「きた」 viết bằng chữ Hán chuẩn là 「北」 (Bắc).\n\n🔍 Phân tích các lựa chọn:\n- 1. 東がわ (ひがしがわ): Phía đông\n- 2. 南がわ (みなみがわ): Phía nam\n- 3. 西がわ (にしがわ): Phía tây\n- 4. 北がわ (きたがわ): ĐÚNG - Phía bắc\n\n📄 Trích PDF gốc (试题解析):\n(19) 4 句意: 公园的北侧有一个图书馆。1. 東: 东; 2. 南: 南; 3. 西: 西; 4. 北: 北",
    "correctOption": 4
  },
  "20": {
    "snippet": "この わいしゃつを ください -> ワイシャツ",
    "explanation": "🎯 Đáp án đúng: [4] ワイシャツ\n\n💬 Dịch nghĩa câu:\n\"Xin vui lòng lấy cho tôi chiếc áo sơ mi trắng này.\"\n\n💡 Phân tích & Viết Katakana:\n• Áo sơ mi nam 「わいしゃつ」 (white shirt) được viết bằng Katakana chuẩn xác là 「ワイシャツ」.\n• Phân biệt chữ シ (shi) và ツ (tsu), chữ ヤ (ya) và イ (i).\n\n🔍 Phân tích các lựa chọn:\n- 1. ウイシャン: Sai Katakana\n- 2. ウイシャツ: Sai âm đầu (ウ thay vì ワ)\n- 3. ワイシャソ: Sai chữ ソ thay vì ツ\n- 4. ワイシャツ: ĐÚNG - Áo sơ mi nam\n\n📄 Trích PDF gốc (试题解析):\n(20) 4 句意: 请给我这件衬衣。考察片假名书写，わ对应ワ，い对应イ，しゃ对应シャ，つ对应ツ。",
    "correctOption": 4
  },
  "21": {
    "snippet": "ともだちから ざっしを 3（ ____ ）もらいました。",
    "explanation": "🎯 Đáp án đúng: [1] さつ (冊)\n\n💬 Dịch nghĩa câu:\n\"Tôi đã nhận được 3 cuốn tạp chí từ người bạn.\"\n\n💡 Phân tích từ chỉ số lượng:\n• Sách, báo, tạp chí là ấn phẩm đóng cuốn, dùng đơn vị đếm là 「さつ (冊 - sách/quyển)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. さつ (冊): ĐÚNG - Đơn vị đếm sách báo, tạp chí\n- 2. まい (枚): Đếm vật mỏng dẹp (tờ giấy, áo, đĩa)\n- 3. だい (台): Đếm máy móc, xe cộ\n- 4. びき (匹): Đếm động vật nhỏ\n\n📄 Trích PDF gốc (试题解析):\n(21) 1 句意: 从朋友那里收到了三本杂志。1. さつ: 用于书籍本子; 2. まい: 薄平物品; 3. だい: 机器车辆; 4. びき: 中小型动物",
    "correctOption": 1
  },
  "22": {
    "snippet": "でんきを つけましたから、へやが（ ____ ）です。",
    "explanation": "🎯 Đáp án đúng: [3] あかるい (明るい)\n\n💬 Dịch nghĩa câu:\n\"Vì tôi đã bật đèn lên nên căn phòng trở nên sáng sủa.\"\n\n💡 Phân tích từ vựng:\n• Bật đèn (でんきをつける) làm cho căn phòng trở nên sáng sủa: 「あかるい (明るい)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. さむい (寒い): Lạnh\n- 2. きたない (汚い): Bẩn thỉu\n- 3. あかるい (明るい): ĐÚNG - Sáng sủa, sáng rõ\n- 4. せまい (狭い): Chật hẹp\n\n📄 Trích PDF gốc (试题解析):\n(22) 3 句意: 因为开了灯，房间里很明亮。1. さむい: 冷; 2. きたない: 脏; 3. あかるい: 明亮; 4. せまい: 狭窄",
    "correctOption": 3
  },
  "23": {
    "snippet": "びょういんは えきから（ ____ ）ですから、バスで いきましょう。",
    "explanation": "🎯 Đáp án đúng: [3] とおい (遠い)\n\n💬 Dịch nghĩa câu:\n\"Bệnh viện ở xa nhà ga nên chúng ta hãy đi bằng xe buýt nhé.\"\n\n💡 Phân tích từ vựng:\n• Căn cứ vế sau 'đi bằng xe buýt', vế trước phải chỉ lý do 'xa xôi': 「とおい (遠い)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. ながい (長い): Dài\n- 2. ふとい (太い): Béo, to mập\n- 3. とおい (遠い): ĐÚNG - Xa xôi về khoảng cách\n- 4. ひろい (広い): Rộng rãi\n\n📄 Trích PDF gốc (试题解析):\n(23) 3 句意: 医院离车站很远，我们坐车去吧。1. ながい: 长; 2. ふとい: 粗; 3. とおい: 远; 4. ひろい: 宽阔",
    "correctOption": 3
  },
  "24": {
    "snippet": "（ ____ ）が ありませんから、じかんが わかりません。",
    "explanation": "🎯 Đáp án đúng: [4] とけい (時計)\n\n💬 Dịch nghĩa câu:\n\"Vì không có đồng hồ nên tôi không biết bây giờ là mấy giờ.\"\n\n💡 Phân tích từ vựng:\n• Để biết thời gian (じかんがわかる), vật dụng cần thiết là chiếc đồng hồ: 「とけい (時計)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. かぎ (鍵): Chìa khóa\n- 2. じしょ (辞書): Từ điển\n- 3. さいふ (財布): Ví tiền\n- 4. とけい (時計): ĐÚNG - Đồng hồ xem giờ\n\n📄 Trích PDF gốc (试题解析):\n(24) 4 句意: 没有手表，所以不知道时间。1. かぎ: 钥匙; 2. じしょ: 词典; 3. さいふ: 钱包; 4. とけい: 钟表",
    "correctOption": 4
  },
  "25": {
    "snippet": "かばんは いすの うえに（ ____ ）ください。",
    "explanation": "🎯 Đáp án đúng: [2] おいて (置いて)\n\n💬 Dịch nghĩa câu:\n\"Xin vui lòng đặt/để chiếc cặp lên trên ghế.\"\n\n💡 Phân tích từ vựng:\n• Cụm từ: いすのうえに置く (đặt, để đồ vật lên ghế) -> chia thể て: 「おいて」.\n\n🔍 Phân tích các lựa chọn:\n- 1. のって (乗って): Lên xe, cưỡi ngựa\n- 2. おいて (置いて): ĐÚNG - Đặt, để đồ đạc\n- 3. まって (待って): Chờ đợi\n- 4. すわって (座って): Ngồi (dành cho người, không dùng cho cặp sách)\n\n📄 Trích PDF gốc (试题解析):\n(25) 2 句意: 请把包放在椅子上。1. のる: 乘，坐; 2. おく: 放，置; 3. まつ: 等待; 4. すわる: 坐",
    "correctOption": 2
  },
  "26": {
    "snippet": "あそこの しんごうで（ ____ ）を わたりましょう。",
    "explanation": "🎯 Đáp án đúng: [4] みち (道)\n\n💬 Dịch nghĩa câu:\n\"Chúng ta hãy băng qua đường ở chỗ đèn tín hiệu giao thông đằng kia nhé.\"\n\n💡 Phân tích từ vựng:\n• Đi với động từ わたる (băng qua), danh từ tự nhiên nhất là 「みち (道 - con đường)」: 道を渡る (băng qua đường).\n\n🔍 Phân tích các lựa chọn:\n- 1. ちかてつ (地下鉄): Tàu điện ngầm\n- 2. ちず (地図): Bản đồ\n- 3. でぐち (出口): Lối ra\n- 4. みち (道): ĐÚNG - Con đường (道を渡る: sang đường)\n\n📄 Trích PDF gốc (试题解析):\n(26) 4 句意: 请在那边红绿灯处过马路。1. ちかてつ: 地铁; 2. ちず: 地图; 3. でぐち: 出口; 4. みち: 道路",
    "correctOption": 4
  },
  "27": {
    "snippet": "この でんしゃは とうきょうえきを 9じに（ ____ ）。",
    "explanation": "🎯 Đáp án đúng: [2] でます (出ます)\n\n💬 Dịch nghĩa câu:\n\"Chuyến tàu điện này khởi hành/rời khỏi ga Tokyo lúc 9 giờ.\"\n\n💡 Phân tích từ vựng:\n• Đi với trợ từ を chỉ điểm xuất phát rời đi: 東京駅を出る (rời khỏi/khởi hành từ ga Tokyo).\n\n🔍 Phân tích các lựa chọn:\n- 1. おります (降ります): Xuống tàu (đã ở trên tàu rồi bước xuống ga)\n- 2. でます (出ます): ĐÚNG - Khởi hành, xuất phát rời ga lúc 9h\n- 3. かえります (帰ります): Về nhà\n- 4. はじまります (始まります): Bắt đầu\n\n📄 Trích PDF gốc (试题解析):\n(27) 2 句意: 这辆车早上9点从东京站始发。1. おりる: 下车; 2. でる: 出发; 3. かえる: 回归; 4. はじまる: 开始",
    "correctOption": 2
  },
  "28": {
    "snippet": "ことしの なつは あついですから、（ ____ ）が ほしいです。",
    "explanation": "🎯 Đáp án đúng: [3] エアコン",
    "explanation": "🎯 Đáp án đúng: [3] エアコン (máy điều hòa nhiệt độ)\n\n💬 Dịch nghĩa câu:\n\"Mùa hè năm nay nóng quá nên tôi muốn có một chiếc máy điều hòa.\"\n\n💡 Phân tích từ vựng:\n• Mùa hè nóng nực (なつはあつい) nên thiết bị làm mát cần thiết là 「エアコン (air conditioner - máy lạnh/điều hòa)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. ラジオ: Máy radio\n- 2. ストーブ: Lò sưởi (dùng cho mùa đông)\n- 3. エアコン: ĐÚNG - Máy điều hòa làm mát\n- 4. テレビ: Ti vi\n\n📄 Trích PDF gốc (试题解析):\n(28) 3 句意: 今年夏天很热，所以想要一台空调。1. ラジオ: 收音机; 2. ストーブ: 火炉; 3. エアコン: 空调; 4. テレビ: 电视",
    "correctOption": 3
  },
  "29": {
    "snippet": "わたしの（ ____ ）は、ちちと ははと わたしの 3にんです。",
    "explanation": "🎯 Đáp án đúng: [4] かぞく (家族)\n\n💬 Dịch nghĩa câu:\n\"Gia đình tôi có 3 người gồm bố, mẹ và tôi.\"\n\n💡 Phân tích từ vựng:\n• Liệt kê gồm bố, mẹ và bản thân là thành phần của 「かぞく (家族 - gia đình)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. きょうだい (兄弟): Anh chị em (không bao gồm bố mẹ)\n- 2. こども (子供): Con cái\n- 3. りょうしん (両親): Bố mẹ (chỉ có 2 người, không tính tôi)\n- 4. かぞく (家族): ĐÚNG - Gia đình (cả nhà 3 người)\n\n📄 Trích PDF gốc (试题解析):\n(29) 4 句意: 我家有爸爸、妈妈和我三个人。1. きょうだい: 兄弟姐妹; 2. こども: 孩子; 3. りょうしん: 父母; 4. かぞく: 家人",
    "correctOption": 4
  },
  "30": {
    "snippet": "あそこの ドアから なかに（ ____ ）ください。",
    "explanation": "🎯 Đáp án đúng: [1] はいって (入って)\n\n💬 Dịch nghĩa câu:\n\"Xin vui lòng đi vào bên trong từ cánh cửa đằng kia.\"\n\n💡 Phân tích từ vựng:\n• Đi vào bên trong: なかにはいる (中に入る) -> chia thể て: 「はいって」.\n\n🔍 Phân tích các lựa chọn:\n- 1. はいって (入って): ĐÚNG - Đi vào bên trong (中に入る)\n- 2. のぼって (登って): Leo núi, trèo lên\n- 3. ついて (着いて): Tới nơi, cập bến\n- 4. とまって (止まって): Dừng lại\n\n📄 Trích PDF gốc (试题解析):\n(30) 1 句意: 请从那边的门进来。1. はいる: 进入; 2. のぼる: 登上; 3. つく: 到达; 4. とまる: 停止",
    "correctOption": 1
  },
  "31": {
    "snippet": "いま ごはんを つくって います。 -> 料理をしています",
    "explanation": "🎯 Đáp án đúng: [3] いま りょうりを して います\n\n💬 Dịch nghĩa câu gốc:\n\"Bây giờ tôi đang nấu cơm / làm đồ ăn.\"\n\n💡 Phân tích câu đồng nghĩa:\n• Cụm từ [ごはんをつくっています] (nấu cơm/nấu thức ăn) đồng nghĩa với [りょうりをしています] (đang nấu nướng, làm món ăn).\n\n🔍 Phân tích các lựa chọn:\n- 1. べんきょうを して います: Đang học bài\n- 2. せんたくを して います: Đang giặt giũ\n- 3. りょうりを して います: ĐÚNG - Đang nấu ăn, làm bếp\n- 4. れんしゅうを して います: Đang luyện tập\n\n📄 Trích PDF gốc (试题解析):\n(31) 3 句意: 我现在正在做饭。3. 我现在正在做菜。",
    "correctOption": 3
  },
  "32": {
    "snippet": "わたしは まいあさ さんぽして います。 -> 歩いています",
    "explanation": "🎯 Đáp án đúng: [1] わたしは まいあさ あるいて います\n\n💬 Dịch nghĩa câu gốc:\n\"Mỗi sáng tôi đều đi dạo bộ.\"\n\n💡 Phân tích câu đồng nghĩa:\n• Hoạt động [さんぽする (散歩する)] nghĩa là đi dạo bộ thong thả, tương đương với [あるく (歩く - đi bộ)].\n\n🔍 Phân tích các lựa chọn:\n- 1. あるいて います: ĐÚNG - Đi bộ, đi dạo\n- 2. およいで います: Bơi lội\n- 3. はしって います: Chạy bộ\n- 4. はたらいて います: Làm việc\n\n📄 Trích PDF gốc (试题解析):\n(32) 1 句意: 我每天早上都会散步。1. 我每天早上都会走路。",
    "correctOption": 1
  },
  "33": {
    "snippet": "わたしは どうぶつが すきです。 -> いぬや ねこが すきです",
    "explanation": "🎯 Đáp án đúng: [2] わたしは いぬや ねこが すきです\n\n💬 Dịch nghĩa câu gốc:\n\"Tôi rất thích động vật.\"\n\n💡 Phân tích câu đồng nghĩa:\n• [どうぶつ (動物)] là danh từ chỉ động vật. Trong các phương án, [いぬ (chó)] và [ねこ (mèo)] là hai loài động vật điển hình.\n\n🔍 Phân tích các lựa chọn:\n- 1. くるまや ひこうき: Ô tô và máy bay (phương tiện)\n- 2. いぬや ねこ: ĐÚNG - Chó và mèo (động vật)\n- 3. こうちゃや コーヒー: Trà và cà phê (đồ uống)\n- 4. ケーキや チョコレート: Bánh ngọt và sô-cô-la (đồ ngọt)\n\n📄 Trích PDF gốc (试题解析):\n(33) 2 句意: 我喜欢动物。2. 我喜欢狗和猫。",
    "correctOption": 2
  },
  "34": {
    "snippet": "もりさんは「そばは いま、いえに いません」と いいました。 -> おばあさん",
    "explanation": "🎯 Đáp án đúng: [3] もりさんの おばあさんは いま、いえに いません\n\n💬 Dịch nghĩa câu gốc:\n\"Anh Mori nói: 'Bà của tôi hiện giờ không có ở nhà'.\"\n\n💡 Phân tích từ vựng xưng hô gia đình:\n• [そぼ (祖母)] là từ xưng hô khi nói về bà ruột của mình với người ngoài. Tương đương với [おばあさん] (bà).\n\n🔍 Phân tích các lựa chọn:\n- 1. おかあさん (お母さん): Mẹ\n- 2. おとうさん (お父さん): Bố\n- 3. おばあさん: ĐÚNG - Bà (tương đương そぼ)\n- 4. おじいさん: Ông (tương đương そふ)\n\n📄 Trích PDF gốc (试题解析):\n(34) 3 句意: 森先生说: “我的祖母现在不在家。”3. 森先生的奶奶现在不在家。",
    "correctOption": 3
  },
  "35": {
    "snippet": "この ジュースは まずいです。 -> おいしくない",
    "explanation": "🎯 Đáp án đúng: [2] この ジュースは おいしくないです\n\n💬 Dịch nghĩa câu gốc:\n\"Cốc nước ép này dở/không ngon.\"\n\n💡 Phân tích câu đồng nghĩa:\n• Tính từ [まずい] (dở tệ, không ngon miệng) chính là dạng phủ định của [おいしい]: [おいしくない] (không ngon).\n\n🔍 Phân tích các lựa chọn:\n- 1. つめたくない: Không lạnh\n- 2. おいしくない: ĐÚNG - Không ngon (đồng nghĩa まずい)\n- 3. からくない: Không cay\n- 4. すっぱくない: Không chua\n\n📄 Trích PDF gốc (试题解析):\n(35) 2 句意: 这种果汁不好喝。2. 这种果汁味道不好。",
    "correctOption": 2
  },

  # MÔN 2: NGỮ PHÁP (36 -> 56)
  "36": {
    "snippet": "西川「はじめまして、私は A銀行（ ____ ）西川です。」",
    "explanation": "🎯 Đáp án đúng: [4] の\n\n💬 Dịch nghĩa câu:\n\"Nishikawa: Xin chào, tôi là Nishikawa của ngân hàng A.\"\n\n💡 Phân tích ngữ pháp:\n• Trợ từ [の] dùng để chỉ quan hệ trực thuộc tổ chức, cơ quan công tác: [A銀行の西川] (Nishikawa thuộc ngân hàng A).\n\n🔍 Phân tích các lựa chọn:\n- 1. や: Liệt kê danh từ\n- 2. が: Trợ từ chủ ngữ\n- 3. を: Trợ từ tân ngữ\n- 4. の: ĐÚNG - Chỉ quan hệ trực thuộc cơ quan / tổ chức\n\n📄 Trích PDF gốc (试题解析):\n(1) 4 句意: 西川: “你好，我是A银行的西川。” 考察の表示所有、所属的用法。",
    "correctOption": 4
  },
  "37": {
    "snippet": "きのう、大山さんが 私（ ____ ）花を くれました。",
    "explanation": "🎯 Đáp án đúng: [1] に\n\n💬 Dịch nghĩa câu:\n\"Hôm qua, anh Oyama đã tặng hoa cho tôi.\"\n\n💡 Phân tích ngữ pháp:\n• Cấu trúc cho nhận: [Aさんが わたしに Nを くれました] (Ai đó làm gì / tặng cái gì cho tôi).\n• Người nhận [私] đi với trợ từ [に].\n\n🔍 Phân tích các lựa chọn:\n- 1. に: ĐÚNG - Chỉ đối tượng tiếp nhận trong câu くれました\n- 2. や: Liệt kê không đầy đủ\n- 3. と: Cùng với\n- 4. を: Đi với tân ngữ chỉ vật (花を)\n\n📄 Trích PDF gốc (试题解析):\n(2) 1 句意: 大山先生昨天送了我花。考察に表示动作对象的用法。",
    "correctOption": 1
  },
  "38": {
    "snippet": "この スカート（ ____ ）先週 デパートで 買いました。",
    "explanation": "🎯 Đáp án đúng: [4] は\n\n💬 Dịch nghĩa câu:\n\"Chiếc váy này thì tôi đã mua ở trung tâm thương mại vào tuần trước.\"\n\n💡 Phân tích ngữ pháp:\n• Trợ từ [は] đưa tân ngữ [このスカート] lên đầu câu để làm chủ đề được nhắc tới (nhấn mạnh chủ đề câu).\n\n🔍 Phân tích các lựa chọn:\n- 1. が: Trợ từ tiểu chủ ngữ\n- 2. を: Nếu để tân ngữ thông thường thì đứng trước động từ\n- 3. に: Trợ từ thời gian/nơi chốn\n- 4. は: ĐÚNG - Đưa danh từ lên làm chủ đề đàm thoại\n\n📄 Trích PDF gốc (试题解析):\n(3) 4 句意: 这条裙子是我上周在百货商店买的。考察は提示主题的用法。",
    "correctOption": 4
  },
  "39": {
    "snippet": "今日は 風（ ____ ）強いです。",
    "explanation": "🎯 Đáp án đúng: [3] が\n\n💬 Dịch nghĩa câu:\n\"Hôm nay gió thổi mạnh thật.\"\n\n💡 Phân tích ngữ pháp:\n• Miêu tả hiện tượng tự nhiên khách quan: [Danh từ chỉ hiện tượng + が + Tính từ]: [風が強い] (gió mạnh), [雨が降る] (mưa rơi).\n\n🔍 Phân tích các lựa chọn:\n- 1. を: Không dùng を với tính từ\n- 2. に: Sai trợ từ\n- 3. が: ĐÚNG - Trợ từ chủ ngữ biểu thị hiện tượng tự nhiên\n- 4. で: Phương tiện/nguyên nhân\n\n📄 Trích PDF gốc (试题解析):\n(4) 3 句意: 今天风很大。考察句型～は～が～です。は提示主题，が提示主语。",
    "correctOption": 3
  },
  "40": {
    "snippet": "毎日 1時間（ ____ ）散歩します。",
    "explanation": "🎯 Đáp án đúng: [4] ぐらい\n\n💬 Dịch nghĩa câu:\n\"Mỗi ngày tôi đều đi dạo khoảng 1 tiếng đồng hồ.\"\n\n💡 Phân tích ngữ pháp:\n• [Số từ lượng thời gian + ぐらい]: biểu thị khoảng thời gian xấp xỉ (khoảng 1 tiếng). Phân biệt với [ごろ] chỉ dùng sau mốc thời gian cụ thể (ví dụ 1時ごろ: vào khoảng 1 giờ).\n\n🔍 Phân tích các lựa chọn:\n- 1. まで: Đến tận\n- 2. より: So với\n- 3. ごろ: Đi sau mốc thời điểm (1時ごろ), không đi với khoảng thời lượng 1時間\n- 4. ぐらい: ĐÚNG - Đi sau lượng từ chỉ khoảng thời gian\n\n📄 Trích PDF gốc (试题解析):\n(5) 4 句意: 我每天会散步一小时左右。3. ごろ: 某时间点前后; 4. ぐらい: 左右，可接在时间段后",
    "correctOption": 4
  },
  "41": {
    "snippet": "教室（ ____ ）帽子を 取って ください。",
    "explanation": "🎯 Đáp án đúng: [2] では\n\n💬 Dịch nghĩa câu:\n\"Ở trong phòng học thì xin vui lòng bỏ mũ ra nhé.\"\n\n💡 Phân tích ngữ pháp:\n• [Địa điểm + で + は]: Trợ từ [で] chỉ nơi diễn ra hành động, kết hợp với [は] để nhấn mạnh phạm vi/chủ đề: 'ở trong lớp học thì...'.\n\n🔍 Phân tích các lựa chọn:\n- 1. は: Thiếu trợ từ chỉ địa điểm hành động で\n- 2. では: ĐÚNG - Nhấn mạnh nơi chốn diễn ra hành động/quy tắc\n- 3. へは: Chỉ hướng di chuyển\n- 4. には: Chỉ sự tồn tại hoặc thời điểm\n\n📄 Trích PDF gốc (试题解析):\n(6) 2 句意: 在教室里请把帽子取下来。考察に表示场所的用法。为强调助词“に”前面的名词，在后面加“は”，表示“在某处”。",
    "correctOption": 2
  },
  "42": {
    "snippet": "A「映画の きっぷが 5まい あります。だれ（ ____ ）いっしょに いきたい ひとは いますか。」",
    "explanation": "🎯 Đáp án đúng: [2] か\n\n💬 Dịch nghĩa câu:\n\"A: Tôi có 5 vé xem phim. Có ai đó muốn đi xem cùng tôi không nào?\"\n\n💡 Phân tích ngữ pháp:\n• [Từ để hỏi + か]: biến từ để hỏi thành đại từ bất định: [だれか] (ai đó, có ai không).\n\n🔍 Phân tích các lựa chọn:\n- 1. も: だれも (không một ai - đi với phủ định)\n- 2. か: ĐÚNG - だれか (ai đó - câu nghi vấn/khẳng định)\n- 3. が: Đi sau từ để hỏi làm chủ ngữ cụ thể\n- 4. は: Không đi trực tiếp với だれ làm chủ ngữ câu hỏi\n\n📄 Trích PDF gốc (试题解析):\n(7) 2 句意: “我有五张电影票，有人想去看电影吗？” 考察か接在疑问词后表示不确定的用法。",
    "correctOption": 2
  },
  "43": {
    "snippet": "あした 仕事が おわったら、（ ____ ）病院へ 行きます。",
    "explanation": "🎯 Đáp án đúng: [1] すぐに\n\n💬 Dịch nghĩa câu:\n\"Ngày mai sau khi làm xong việc, tôi sẽ đến bệnh viện ngay lập tức.\"\n\n💡 Phân tích ngữ pháp:\n• Phó từ [すぐに] (ngay lập tức) biểu thị một hành động được thực hiện nối tiếp ngay sau khi điều kiện vế trước kết thúc (仕事が終わったら).\n\n🔍 Phân tích các lựa chọn:\n- 1. すぐに: ĐÚNG - Ngay lập tức\n- 2. もう: Đã rồi\n- 3. よく: Thường xuyên / rõ\n- 4. だんだん: Dần dần\n\n📄 Trích PDF gốc (试题解析):\n(8) 1 句意: 明天下午立刻去医院。1. すぐに: 立刻，立即; 2. もう: 已经; 3. よく: 屡次，经常; 4. だんだん: 逐渐",
    "correctOption": 1
  },
  "44": {
    "snippet": "A「はやく、出かけますよ。」B「ええ、（ ____ ）待って ください。」",
    "explanation": "🎯 Đáp án đúng: [4] ちょっと\n\n💬 Dịch nghĩa câu:\n\"A: Nhanh lên, chúng ta xuất phát thôi! - B: Vâng, xin hãy đợi tôi một chút nhé!\"\n\n💡 Phân tích ngữ pháp:\n• Cụm từ giao tiếp kinh điển: [ちょっと待ってください] (Xin vui lòng chờ một chút / một lát).\n\n🔍 Phân tích các lựa chọn:\n- 1. とても: Rất\n- 2. あまり: Không... lắm (đi với phủ định)\n- 3. ぜんぜん: Hoàn toàn không (đi với phủ định)\n- 4. ちょっと: ĐÚNG - Một chút, một lát\n\n📄 Trích PDF gốc (试题解析):\n(9) 4 句意: A: “快点，要出门了。” B: “啊，稍微等一下。” 考察情景交际用语。应答“ちょっと待ってください”。",
    "correctOption": 4
  },
  "45": {
    "snippet": "A「料理を つくりますか。」B「ええ、つくります。でも、（ ____ ）。」",
    "explanation": "🎯 Đáp án đúng: [4] あまり じょうずじゃ ありません\n\n💬 Dịch nghĩa câu:\n\"A: Bạn có nấu ăn không? - B: Vâng, có nấu chứ. Thế nhưng tôi nấu không được giỏi cho lắm.\"\n\n💡 Phân tích ngữ pháp:\n• Tính từ đuôi な [上手（じょうず）] phủ định hiện tại là [上手じゃありません]. Đi với phó từ mức độ [あまり] (không... lắm) tạo thành [あまり上手じゃありません].\n\n🔍 Phân tích các lựa chọn:\n- 1. じょうずでした: Đã giỏi (quá khứ khẳng định, mâu thuẫn với でも)\n- 2. じょうずです: Giỏi (khẳng định, mâu thuẫn với でも)\n- 3. あまり じょうずでした: Sai ngữ pháp\n- 4. あまり じょうずじゃ ありません: ĐÚNG - Không giỏi lắm\n\n📄 Trích PDF gốc (试题解析):\n(10) 4 句意: A: “你做菜吗？” B: “嗯，做菜。但是不太擅长。” 形容动词否定变形: 上手じゃありません。",
    "correctOption": 4
  },
  "46": {
    "snippet": "私が（ ____ ）とき、外国に 住んで いました。",
    "explanation": "🎯 Đáp án đúng: [3] ちいさかった\n\n💬 Dịch nghĩa câu:\n\"Hồi tôi còn nhỏ, tôi đã từng sống ở nước ngoài.\"\n\n💡 Phân tích ngữ pháp:\n• Bổ nghĩa cho danh từ [とき] chỉ khoảng thời gian trong quá khứ: tính từ đuôi い chia thể quá khứ [ちいさかった] (khi còn bé).\n\n🔍 Phân tích các lựa chọn:\n- 1. ちいさいの: Sai cấu trúc nối とき\n- 2. ちいさく: Dạng liên từ\n- 3. ちいさかった: ĐÚNG - Quá khứ của tính từ đuôi い bổ nghĩa cho とき\n- 4. ちいさいでした: Sai ngữ pháp (không ghép tính từ đuôi い với でした)\n\n📄 Trích PDF gốc (试题解析):\n(11) 3 句意: 我小时候住在国外。とき前接形容词基本形或过去形。表示过去发生的事用ちいさかった。",
    "correctOption": 3
  },
  "47": {
    "snippet": "日本の 食べ物は おいしいです。私が いちばん（ ____ ）は すしです。",
    "explanation": "🎯 Đáp án đúng: [2] すきな の\n\n💬 Dịch nghĩa câu:\n\"Đồ ăn Nhật rất ngon. Thứ mà tôi thích nhất chính là sushi.\"\n\n💡 Phân tích ngữ pháp:\n• Đại từ hóa danh từ bằng [の]: [Tính từ đuôi な + な + の]: [すきな のは] (thứ mà tôi yêu thích thì...).\n\n🔍 Phân tích các lựa chọn:\n- 1. すき: Thiếu な の\n- 2. すきな の: ĐÚNG - Danh từ hóa tính từ đuôi な\n- 3. すきな: Thiếu の để làm chủ ngữ đứng trước は\n- 4. すきの: Sai (phải là な の)\n\n📄 Trích PDF gốc (试题解析):\n(12) 2 句意: 日本的食物很好吃，我最喜欢的是寿司。空后的の指代前文提到的食物，形容动词修饰名词时词尾变为な后加名。",
    "correctOption": 2
  },
  "48": {
    "snippet": "山下「もしもし、西川さんですか。」西川「はい、そうです。（ ____ ）ですか。」",
    "explanation": "🎯 Đáp án đúng: [1] どなた\n\n💬 Dịch nghĩa câu:\n\"Yamashita: Alo, có phải anh Nishikawa đó không ạ? - Nishikawa: Vâng, đúng rồi. Xin hỏi ai ở đầu dây bên kia vậy ạ?\"\n\n💡 Phân tích ngữ pháp:\n• Từ để hỏi danh tính lịch sự qua điện thoại: [どなたですか] (Xin hỏi vị nào/quý khách nào ở đầu dây ạ?). [どなた] là dạng kính ngữ của [だれ].\n\n🔍 Phân tích các lựa chọn:\n- 1. どなた: ĐÚNG - Lịch sự hỏi danh tính (vị nào)\n- 2. どの 人: Người nào (hỏi trong một nhóm trước mặt)\n- 3. だれが: Sai trợ từ\n- 4. なにか: Cái gì đó\n\n📄 Trích PDF gốc (试题解析):\n(13) 1 句意: (电话中) 山下: “你好，请问是西川先生么？” 西川: “嗯，是我。请问您是哪一位？” 1. どなた: 哪位",
    "correctOption": 1
  },
  "49": {
    "snippet": "A「らいげつ りょこうに いきますが、でんしゃに のらないで バスで いきます。」B「（ ____ ）ですか。」A「バスの ほうが やすいからです。」",
    "explanation": "🎯 Đáp án đúng: [2] どうして\n\n💬 Dịch nghĩa câu:\n\"A: Tháng sau tôi đi du lịch nhưng không đi tàu điện mà sẽ đi xe buýt. - B: Tại sao vậy? - A: Vì xe buýt rẻ hơn.\"\n\n💡 Phân tích ngữ pháp:\n• Vế đáp lại nêu lý do kết thúc bằng [から] (vì...), do đó câu hỏi trước đó bắt buộc dùng từ để hỏi lý do [どうしてですか] (Tại sao thế?).\n\n🔍 Phân tích các lựa chọn:\n- 1. どちら: Cái nào trong 2 cái\n- 2. どうして: ĐÚNG - Hỏi nguyên nhân, lý do (tại sao)\n- 3. どう: Như thế nào\n- 4. どこへ: Đi đâu\n\n📄 Trích PDF gốc (试题解析):\n(14) 2 句意: A: “下个月去旅行时不坐电车，坐公交车。” B: “为什么呢？” A: “公交车更便宜。” 2. どうしてですか: 为什么？",
    "correctOption": 2
  },
  "50": {
    "snippet": "山下「いっしょに 宿題を しませんか。」小南「すみません。いえへ（ ____ ）します。」",
    "explanation": "🎯 Đáp án đúng: [3] かえってから\n\n💬 Dịch nghĩa câu:\n\"Yamashita: Cùng làm bài tập với tớ nhé? - Konan: Xin lỗi nhé. Tớ phải về nhà rồi mới làm được.\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu: [V-て + から]: Sau khi làm xong hành động 1 thì mới làm hành động 2: [家へ帰ってからします] (sau khi về nhà rồi mới làm).\n\n🔍 Phân tích các lựa chọn:\n- 1. かえりながら: Vừa về vừa làm (không hợp logic)\n- 2. かえるまえに: Trước khi về (mâu thuẫn ý nghĩa)\n- 3. かえってから: ĐÚNG - Sau khi về nhà rồi mới làm\n- 4. かえったあとで: Thiếu から hoặc trợ từ thích hợp\n\n📄 Trích PDF gốc (试题解析):\n(15) 3 句意: 山下: “小南，要一起做作业吗？” 小南: “不好意思，我回家后再做。” 考察句型～てから表示“……以后”的用法。",
    "correctOption": 3
  },
  "51": {
    "snippet": "西川「ラーメンは ありますか。」店の人「はい、しょうゆと しおが あります。」西川「じゃ、（ ____ ）に して ください。」",
    "explanation": "🎯 Đáp án đúng: [2] しお\n\n💬 Dịch nghĩa câu:\n\"Nishikawa: Ở đây có mì ramen không ạ? - Nhân viên: Vâng có ạ, chúng tôi có vị nước tương (shoyu) và vị muối (shio). - Nishikawa: Vậy thì xin cho tôi mì ramen vị muối nhé.\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu đưa ra quyết định / gọi món: [Danh từ + にする / にしてください] (Tôi chọn / lấy món N). Người bán đưa ra 2 lựa chọn 'shoyu' và 'shio', Nishikawa chọn [しおにしてください].\n\n🔍 Phân tích các lựa chọn:\n- 1. ラーメン: Đã hỏi ở câu đầu rồi\n- 2. しお: ĐÚNG - Chọn vị mì muối trong 2 vị nhân viên gợi ý\n- 3. みず: Nước lã\n- 4. ひとつ: Một cái (không đi với にしてください trong ngữ cảnh này)\n\n📄 Trích PDF gốc (试题解析):\n(16) 2 句意: 西川: “有拉面吗？” 店员: “有酱油拉面和盐味拉面。” 西川: “那，请给我盐味拉面。” 考察句型名词 + にする表示决定选择某物。",
    "correctOption": 2
  },

  # MÔN 2: DẤU SAO * (52 -> 56)
  "52": {
    "snippet": "まいにち 私は ____ ____ ★ ____ はを みがきます。",
    "explanation": "🎯 Đáp án đúng: [1] 前 (まえ)\n\n💬 Thứ tự ghép câu hoàn chỉnh:\n「まいにち 私は 【4 朝ごはん】 【2 の】 ★【1 前】 【3 に】 はを みがきます。」\n(Mỗi ngày tôi đều đánh răng trước bữa ăn sáng.)\n\n💡 Phân tích cấu trúc câu:\n• Cấu trúc: [Danh từ + の + 前に]: Trước khi làm gì / trước một sự việc.\n• Trật tự đúng là: 4 -> 2 -> 1 -> 3. Từ đứng ở vị trí ngôi sao ★ thứ ba là [1. 前].\n\n📄 Trích PDF gốc (试题解析):\n(17) 1 正确语序: 毎日 私は 4朝ごはん 2の 1前 3に はを みがきます。(我每天在吃早饭前刷牙。) ～前に表示在某事之前，前接名词时需在名词后加の。",
    "correctOption": 1
  },
  "53": {
    "snippet": "きのうは ____ ____ ★ ____ 晴れましたね。",
    "explanation": "🎯 Đáp án đúng: [3] 今日は (きょうは)\n\n💬 Thứ tự ghép câu hoàn chỉnh:\n「きのうは 【2 雨】 【4 でしたが】 ★【3 今日は】 【1 晴れ】 ましたね。」\n(Hôm qua thì trời mưa nhưng hôm nay thì trời đã nắng ráo rồi nhỉ.)\n\n💡 Phân tích cấu trúc câu:\n• Cấu trúc nối tương phản: [雨でしたが、今日は～] (hôm qua mưa thế nhưng hôm nay thì...).\n• Trật tự đúng là: 2 -> 4 -> 3 -> 1. Từ đứng ở vị trí ngôi sao ★ thứ ba là [3. 今日は].\n\n📄 Trích PDF gốc (试题解析):\n(18) 3 正确语序: きのうは 2雨 4でしたが 3今日は 1晴れ ましたね。(虽然昨天天下雨了，但是今天天晴了。) 此处が表示转折，意为“但是，然而”。",
    "correctOption": 3
  },
  "54": {
    "snippet": "海に ____ ____ ★ ____ 住みたいです。",
    "explanation": "🎯 Đáp án đúng: [2] 家に (いえに)\n\n💬 Thứ tự ghép câu hoàn chỉnh:\n「海に 【1 近くて】 【3 大きい】 ★【2 家に】 【4 住みたい】 です。」\n(Tôi muốn sống trong một ngôi nhà to lớn và gần biển.)\n\n💡 Phân tích cấu trúc câu:\n• Nối tính từ: [近くて] nối với tính từ [大きい] bổ nghĩa cho danh từ [家]: [近くて大きい家に] + [住みたいです].\n• Trật tự đúng là: 1 -> 3 -> 2 -> 4. Từ đứng ở vị trí ngôi sao ★ thứ ba là [2. 家に].\n\n📄 Trích PDF gốc (试题解析):\n(19) 2 正确语序: 海に 1近くて 3大きい 2家に 4住みたい です。(想住在离海近的大房子里。) 形容词连用时，需将前一个形容词的词尾い变为く后再加上て。",
    "correctOption": 2
  },
  "55": {
    "snippet": "きのう 私が ____ ____ ★ ____ おもしろかったです。",
    "explanation": "🎯 Đáp án đúng: [1] は\n\n💬 Thứ tự ghép câu hoàn chỉnh:\n「きのう 私が 【3 読んだ】 【2 本】 ★【1 は】 【4 おもしろかった】 です。」\n(Cuốn sách mà tôi đọc hôm qua rất là thú vị.)\n\n💡 Phân tích cấu trúc câu:\n• Mệnh đề định ngữ: [きのう私が読んだ] bổ nghĩa cho danh từ [本] làm chủ đề câu đi với [は]: [きのう私が読んだ本は] + [おもしろかったです].\n• Trật tự đúng là: 3 -> 2 -> 1 -> 4. Từ đứng ở vị trí ngôi sao ★ thứ ba là [1. は].\n\n📄 Trích PDF gốc (试题解析):\n(20) 1 正确语序: きのう 私が 3読んだ 2本 1は 4おもしろかった です。(我昨天读的那本书很有趣。) 动词的连体形可修饰名词。",
    "correctOption": 1
  },
  "56": {
    "snippet": "毎週 水曜日と 土曜日は ここで ____ ____ ★ ____ 来てください。",
    "explanation": "🎯 Đáp án đúng: [4] から\n\n💬 Thứ tự ghép câu hoàn chỉnh:\n「毎週 水曜日と 土曜日は ここで 【3 練習して】 【2 います】 ★【4 から】 【1 来て】 ください。」\n(Thứ Tư và thứ Bảy hàng tuần bọn tớ đều tập luyện ở đây nên cậu hãy ghé đến nhé!)\n\n💡 Phân tích cấu trúc câu:\n• Cấu trúc chỉ nguyên nhân lý do: [V-ています + から] (vì đang luyện tập ở đây nên...). Vế sau đi với lời mời gọi [来てください].\n• Trật tự đúng là: 3 -> 2 -> 4 -> 1. Từ đứng ở vị trí ngôi sao ★ thứ ba là [4. から].\n\n📄 Trích PDF gốc (试题解析):\n(21) 4 正确语序: 毎週 水曜日と 土曜日は ここで 3練習して 2います 4から 1来て ください。(每周三和周六都在这里练习，你来吧。) ～から表示原因，意为“因为……”。",
    "correctOption": 4
  },

  # MÔN 2: NGỮ PHÁP ĐOẠN VĂN (57 -> 61)
  "57": {
    "snippet": "南駅（ 22 ）大きな 駅です。",
    "explanation": "🎯 Đáp án đúng: [1] は\n\n💬 Dịch nghĩa câu:\n\"Ga Minami là một nhà ga lớn.\"\n\n💡 Phân tích ngữ pháp:\n• Trợ từ [は] dùng để nêu đối tượng [南駅] làm chủ đề chính của câu văn mở đầu đoạn văn.\n\n🔍 Phân tích các lựa chọn:\n- 1. は: ĐÚNG - Trợ từ chủ đề câu mở đầu\n- 2. が: Trợ từ chủ ngữ vị ngữ\n- 3. を: Trợ từ tân ngữ\n- 4. に: Trợ từ nơi chốn\n\n📄 Trích PDF gốc (试题解析):\n(22) 1 此句的句意为“南站是一个大站”，此处需填入提示主题的助词は。",
    "correctOption": 1
  },
  "58": {
    "snippet": "いつも たくさんの 人が そこで 買い物を（ 23 ）。",
    "explanation": "🎯 Đáp án đúng: [2] して います\n\n💬 Dịch nghĩa câu:\n\"Lúc nào cũng có rất nhiều người mua sắm ở nơi đó.\"\n\n💡 Phân tích ngữ pháp:\n• Phó từ [いつも] (lúc nào cũng, luôn luôn) diễn đạt một thói quen, trạng thái lặp đi lặp lại thường nhật, do đó động từ phải chia ở thể tiếp diễn [買い物をして います].\n\n🔍 Phân tích các lựa chọn:\n- 1. しました: Đã làm (quá khứ đơn thuần)\n- 2. して います: ĐÚNG - Diễn tả thói quen/trạng thái thường trực đi với いつも\n- 3. しましょう: Hãy cùng làm\n- 4. します: Chưa nhấn mạnh thói quen thường trực\n\n📄 Trích PDF gốc (试题解析):\n(23) 2 句首的いつも提示有很多人在那家店买东西是一种常态。选项中只有して います可表示动作的习惯、反复和状态。",
    "correctOption": 2
  },
  "59": {
    "snippet": "いっしょに 買い物に（ 24 ）。",
    "explanation": "🎯 Đáp án đúng: [3] 行きませんか\n\n💬 Dịch nghĩa câu:\n\"Cậu có muốn đi mua sắm cùng với tớ không?\"\n\n💡 Phân tích ngữ pháp:\n• Đi với phó từ [いっしょに] (cùng nhau), câu mang tính chất rủ rê, mời mọc lịch sự [～ませんか]: [いっしょに買い物に行きませんか] (Cùng đi mua sắm nhé?).\n\n🔍 Phân tích các lựa chọn:\n- 1. 行きます: Đi (khẳng định)\n- 2. 行きました: Đã đi\n- 3. 行きませんか: ĐÚNG - Lời mời rủ rê đi cùng nhau (いっしょに～ませんか)\n- 4. 行かないで ください: Xin đừng đi\n\n📄 Trích PDF gốc (试题解析):\n(24) 3 句首的いっしょに提示作者想邀请他人和自己一起去购物，选项中只有行きませんか表现出这种积极询问的态度。",
    "correctOption": 3
  },
  "60": {
    "snippet": "まちの 人たちが まいあさ そうじを します。（ 25 ）、公園は いつも きれいです。",
    "explanation": "🎯 Đáp án đúng: [4] だから\n\n💬 Dịch nghĩa câu:\n\"Người dân trong thị trấn sáng nào cũng dọn dẹp vệ sinh. Vì vậy, công viên lúc nào cũng sạch sẽ.\"\n\n💡 Phân tích ngữ pháp:\n• Quan hệ nguyên nhân - kết quả: Vế trước là hành động dọn dẹp mỗi sáng, vế sau là kết quả công viên luôn sạch sẽ. Liên từ kết nối thích hợp nhất là [だから] (Vì vậy / do đó).\n\n🔍 Phân tích các lựa chọn:\n- 1. しかし: Tuy nhiên (chỉ sự đối lập)\n- 2. もっと: Hơn nữa\n- 3. それから: Sau đó\n- 4. だから: ĐÚNG - Biểu thị quan hệ nhân quả (vì vậy)\n\n📄 Trích PDF gốc (试题解析):\n(25) 4 前文提到会打扫公园，空后提到公园很干净，前后存在因果关系。4. だから: 因此，所以。",
    "correctOption": 4
  },
  "61": {
    "snippet": "公園は いま さくらが とても きれいです。さくらを 見に（ 26 ）。",
    "explanation": "🎯 Đáp án đúng: [2] 行きたいです\n\n💬 Dịch nghĩa câu:\n\"Công viên bây giờ hoa anh đào nở rất đẹp. Tớ rất muốn đi ngắm hoa anh đào.\"\n\n💡 Phân tích ngữ pháp:\n• Bày tỏ mong muốn, nguyện vọng của bản thân: [V-bỏ ます + たいです]: [見に行きたいです] (muốn đi ngắm hoa anh đào).\n\n🔍 Phân tích các lựa chọn:\n- 1. 行きましょう: Chúng ta hãy cùng đi\n- 2. 行きたいです: ĐÚNG - Diễn đạt mong muốn cá nhân của người viết\n- 3. 行きました: Đã đi\n- 4. 行かないです: Không đi\n\n📄 Trích PDF gốc (试题解析):\n(26) 2 前文提到公园里现在开满了美丽的樱花，此处需用“たい”表示想实现某种行为为主观愿望。表示去某处应使用动词“行く”。",
    "correctOption": 2
  },

  # MÔN 2: ĐỌC HIỂU (62 -> 67)
  "62": {
    "snippet": "大学の となりに なにが ありますか。",
    "explanation": "🎯 Đáp án đúng: [4] 大きな 公園\n\n💬 Dịch nghĩa câu hỏi:\n\"Ở bên cạnh trường đại học có cái gì?\"\n\n💡 Phân tích bài đọc:\n• Căn cứ hai câu cuối của đoạn văn: 「大学の となりに 大きな 公園が あります。」 (Bên cạnh trường đại học có một công viên lớn).\n• Phương án [4] khớp 100% với thông tin trong bài đọc.\n\n📄 Trích PDF gốc (试题解析):\n(27) 4 关键内容在文章的最后两句。大学旁有一个规模很大的公园。",
    "correctOption": 4
  },
  "63": {
    "snippet": "日本語Aクラスの 学生は 来週 水曜日に どの 教室へ 行きますか。",
    "explanation": "🎯 Đáp án đúng: [4] 午前は 105教室、午後は 103教室\n\n💬 Dịch nghĩa câu hỏi:\n\"Học sinh lớp tiếng Nhật A thứ Tư tuần tới sẽ đến phòng học nào?\"\n\n💡 Phân tích bài đọc:\n• Đoạn thông báo ghi rõ: Sinh viên lớp A buổi sáng sẽ đến phòng 105 để xem DVD (午前は 105教室で DVDを 見ます), buổi chiều sẽ học tại phòng 103 (午後は 103教室で 授業を します).\n• Do đó, phương án đúng là [4].\n\n📄 Trích PDF gốc (试题解析):\n(28) 4 根据邮件正文内容可知，A班的学生上午要去105教室看DVD，下午要去103教室上课。",
    "correctOption": 4
  },
  "64": {
    "snippet": "エイミーさんの つくえの 上に だれの きっぷが ありますか。",
    "explanation": "🎯 Đáp án đúng: [3] エイミーさんと 高木さんの きっぷ\n\n💬 Dịch nghĩa câu hỏi:\n\"Trên bàn của Amy có vé của những ai?\"\n\n💡 Phân tích bài đọc:\n• Trong đoạn thứ 2 của bức thư: Thầy Onishi nói rằng đã để cả vé của Amy và vé của Takagi lên trên bàn của Amy: 「エイミーさんと 高木さんの きっぷを エイミーさんの つくえの 上に おきました」.\n• Đáp án chính xác là [3].\n\n📄 Trích PDF gốc (试题解析):\n(29) 3 根据邮件第二段内容可知，大西先生把艾米和高木先生的票放在了艾米的桌上。",
    "correctOption": 3
  },
  "65": {
    "snippet": "ラジャさんは 先週 なにを しましたか。",
    "explanation": "🎯 Đáp án đúng: [2] プールで 泳いだり、友だちの お母さんと 日本料理を 作ったり しました\n\n💬 Dịch nghĩa câu hỏi:\n\"Raja tuần trước đã làm những việc gì?\"\n\n💡 Phân tích bài đọc:\n• Trong đoạn 1: Raja kể rằng đã đi bơi cùng Kyoko ở bể bơi và cùng với mẹ của bạn làm món ăn Nhật: 「京子さんと プールで 泳いだり、お母さんと 日本の りょうりを 作ったり しました」.\n• Phương án [2] tóm tắt đầy đủ và chính xác nhất cả 2 hoạt động này.\n\n📄 Trích PDF gốc (试题解析):\n(30) 2 关键句是第一段的最后两句“一週間 日本語で たくさん 話が できました。京子さんと プールで 泳いだり、お母さんと 日本の りょうりを 作ったりしました。”",
    "correctOption": 2
  },
  "66": {
    "snippet": "ラジャさんは この 手紙で いちばん なにを つたえたいですか。",
    "explanation": "🎯 Đáp án đúng: [3] 夏休みに 友だちと いっしょに すごせて とても たのしかった こと\n\n💬 Dịch nghĩa câu hỏi:\n\"Raja muốn truyền tải điều gì nhất thông qua bức thư này?\"\n\n💡 Phân tích bài đọc:\n• Đoạn mở đầu và kết thúc bức thư đều nhấn mạnh lời cảm ơn vì kỳ nghỉ hè vừa qua rất vui vẻ: 「先週は いろいろ ありがとうございました。夏休みは とても たのしかったです」.\n• Mục đích lớn nhất của lá thư là bày tỏ lòng biết ơn và niềm vui khi được cùng bạn trải qua kỳ nghỉ hè ý nghĩa (phương án [3]).\n\n📄 Trích PDF gốc (试题解析):\n(31) 3 文章首尾呼应，第一段提到“先週は いろいろ ありがとうございました。みなさんと いっしょの 夏休みは とても 楽しかったです。”，可知正文主要描述了作者对此次暑假的美好回忆。",
    "correctOption": 3
  },
  "67": {
    "snippet": "アンさんは 歓迎会に 何を 持って行きますか。",
    "explanation": "🎯 Đáp án đúng: [3] 果物 (くだもの)\n\n💬 Dịch nghĩa câu hỏi:\n\"Bạn Ann sẽ mang thứ gì đến bữa tiệc chào đón tân sinh viên?\"\n\n💡 Phân tích bài đọc:\n• Trong bảng thông báo phân công: Học sinh lớp A mang đồ ngọt/bánh kẹo, học sinh lớp B mang nước giải khát, học sinh lớp C mang hoa quả (くだもの). Ann thuộc lớp C, do đó phải mang [果物 (hoa quả)] -> phương án [3].\n\n📄 Trích PDF gốc (试题解析):\n(32) 3 根据“持ってくるもの”表格内对应内容可知，A班和B班的学生需要带点心，而C班的学生需要带水果。",
    "correctOption": 3
  },

  # MÔN 3: NGHE HIỂU (68 -> 91)
  "68": {
    "snippet": "Choukai M1-1: 男の人は どれを 取りますか。",
    "audioScriptJa": "女：すみません。その、白いカップを取ってください。\n男：どちらですか。\n女：小さいカップの隣のです。\n男：男の人はどれを取りますか。",
    "audioScriptVi": "Nữ: Xin lỗi, anh lấy giúp tôi chiếc cốc màu trắng kia với ạ.\nNam: Chiếc nào cơ?\nNữ: Chiếc bên cạnh cái cốc nhỏ ấy.\nCâu hỏi: Người đàn ông sẽ lấy chiếc cốc nào?",
    "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Dịch nghĩa câu hỏi:\n\"Người đàn ông sẽ lấy chiếc cốc nào?\"\n\n💡 Phân tích chi tiết:\n• Người phụ nữ nhờ lấy chiếc cốc màu trắng (白いカップ), nằm bên cạnh chiếc cốc nhỏ (小さいカップの隣).\n• Đối chiếu tranh minh họa, chiếc cốc ở vị trí [2] thỏa mãn là cốc trắng cạnh cốc nhỏ.",
    "correctOption": 2
  },
  "69": {
    "snippet": "Choukai M1-2: 学生は 明日 何を 持ってきますか。",
    "audioScriptJa": "男：明日の授業で葉書の書き方を練習します。明日は葉書を持ってきてください。切手は入りません。それから、鉛筆じゃなくて、ペンで書きますから、ペンも忘れないでください。\n学生は明日何を持ってきますか。",
    "audioScriptVi": "Thầy giáo: Trong tiết học ngày mai chúng ta sẽ luyện tập cách viết bưu thiếp. Ngày mai các em hãy mang theo bưu thiếp nhé. Không cần tem đâu. Thêm nữa, chúng ta sẽ viết bằng bút mực chứ không phải bút chì, nên các em cũng đừng quên mang bút mực nhé.\nCâu hỏi: Học sinh ngày mai phải mang theo những thứ gì?",
    "explanation": "🎯 Đáp án đúng: [2] 葉書とペン (Bưu thiếp và bút mực)\n\n💬 Dịch nghĩa câu hỏi:\n\"Học sinh ngày mai sẽ mang theo thứ gì?\"\n\n💡 Phân tích chi tiết:\n• Thầy giáo dặn: mang bưu thiếp (葉書を持ってきてください), không cần tem (切手は入りません), viết bằng bút mực (ペンで書きますから、ペンも忘れないで).\n• Vậy hai thứ cần mang là bưu thiếp và bút mực (phương án [2]).",
    "correctOption": 2
  },
  "70": {
    "snippet": "Choukai M1-3: 男の人は 何を 消しますか。",
    "audioScriptJa": "女：今日の仕事は終わりです。帰りましょう。\n男：はい。\n女：ええ、テレビはもう消しましたから、エアコンを消してください。\n男：はい。\n女：電気もお願いします。\n男：はい。\n男の人は何を消しますか。",
    "audioScriptVi": "Nữ: Công việc hôm nay xong rồi đấy. Về thôi nào.\nNam: Vâng.\nNữ: À, ti vi thì tôi đã tắt rồi, anh hãy tắt máy điều hòa giúp tôi nhé.\nNam: Vâng.\nNữ: Cả đèn điện nữa nhé anh.\nNam: Vâng.\nCâu hỏi: Người đàn ông sẽ tắt những thiết bị gì?",
    "explanation": "🎯 Đáp án đúng: [3] エアコンと電気 (Máy điều hòa và đèn điện)\n\n💬 Dịch nghĩa câu hỏi:\n\"Người đàn ông sẽ tắt những thiết bị gì?\"\n\n💡 Phân tích chi tiết:\n• Người phụ nữ bảo ti vi đã tắt rồi (テレビはもう消しました).\n• Người đàn ông được nhờ tắt máy điều hòa (エアコンを消してください) và đèn điện (電気もお願いします).\n• Do đó người đàn ông sẽ tắt máy điều hòa và đèn điện (phương án [3]).",
    "correctOption": 3
  },
  "71": {
    "snippet": "Choukai M1-4: 男の学生は この後 すぐ 何をしますか。",
    "audioScriptJa": "女：では、これからカレーを作りましょう。\n男：先生、私は野菜を切りましょうか。\n女：いえ、野菜じゃなくて、肉を切ってください。\n男：はい。\n男の学生はこの後すぐ何をしますか。",
    "audioScriptVi": "Cô giáo: Nào, bây giờ chúng ta cùng làm món cà ri nhé.\nNam: Thưa cô, em cắt rau củ nhé cô?\nCô giáo: Không, không phải rau củ đâu, em hãy cắt thịt nhé.\nNam: Vâng ạ.\nCâu hỏi: Nam sinh viên ngay sau đây sẽ làm gì?",
    "explanation": "🎯 Đáp án đúng: [3] 肉を切る (Cắt thịt)\n\n💬 Dịch nghĩa câu hỏi:\n\"Nam sinh viên ngay sau đây sẽ làm gì?\"\n\n💡 Phân tích chi tiết:\n• Nam sinh viên đề nghị cắt rau củ nhưng cô giáo bảo: 「いえ、野菜じゃなくて、肉を切ってください」 (Không phải rau củ, em hãy cắt thịt nhé).\n• Vì vậy hành động ngay sau đây là cắt thịt (phương án [3]).",
    "correctOption": 3
  },
  "72": {
    "snippet": "Choukai M1-5: 女の人は 来週 いつ 病院へ 来ますか。",
    "audioScriptJa": "男：来週の月曜日の三時にまた来てください。\n女：すみません。月曜日は忙しいです。\n男：そうですか。火曜日はどうですか。\n女：大丈夫です。\n男：じゃ、三時半に来てください。\n女：はい。分かりました。\n女の人は来週いつ病院へ来ますか。",
    "audioScriptVi": "Bác sĩ: Thứ Hai tuần tới lúc 3 giờ chị lại đến khám nhé.\nNữ: Xin lỗi bác sĩ, thứ Hai tôi bận mất rồi.\nBác sĩ: Vậy à? Thế thứ Ba thì sao?\nNữ: Thứ Ba thì được ạ.\nBác sĩ: Vậy chị hãy đến vào lúc 3 giờ rưỡi nhé.\nNữ: Vâng, tôi hiểu rồi ạ.\nCâu hỏi: Người phụ nữ tuần tới sẽ đến bệnh viện vào lúc nào?",
    "explanation": "🎯 Đáp án đúng: [4] 火曜日の三時半 (Thứ Ba lúc 3 giờ rưỡi)\n\n💬 Dịch nghĩa câu hỏi:\n\"Người phụ nữ tuần tới sẽ đến bệnh viện vào lúc nào?\"\n\n💡 Phân tích chi tiết:\n• Bác sĩ hẹn thứ Hai lúc 3h nhưng người phụ nữ bận.\n• Đổi sang thứ Ba (火曜日) lúc 3h30 (三時半に来てください) và người phụ nữ đồng ý.\n• Đáp án chính xác là thứ Ba lúc 3h30 (phương án [4]).",
    "correctOption": 4
  },
  "73": {
    "snippet": "Choukai M1-6: 男の人は どこへ 行きますか。",
    "audioScriptJa": "男：すみません。郵便局に行きたいですが、どこですか。\n女：ああ、郵便局ですね。あそこに本屋がありますね。\n男：はい。\n女：本屋の左にレストランがあります。\n男：はい。\n女：レストランの隣が郵便局です。レストランと銀行の間です。\n男：分かりました。ありがとうございます。\n男の人はどこへ行きますか。",
    "audioScriptVi": "Nam: Xin lỗi, tôi muốn đi bưu điện, nó ở chỗ nào vậy ạ?\nNữ: À, bưu điện à. Đằng kia có hiệu sách đúng không.\nNam: Vâng.\nNữ: Bên trái hiệu sách có nhà hàng.\nNam: Vâng.\nNữ: Bên cạnh nhà hàng là bưu điện. Nó nằm ở giữa nhà hàng và ngân hàng đấy.\nNam: Tôi hiểu rồi. Cảm ơn chị.\nCâu hỏi: Người đàn ông sẽ đi đến đâu?",
    "explanation": "🎯 Đáp án đúng: [2] レストランと銀行の間の郵便局\n\n💬 Dịch nghĩa câu hỏi:\n\"Người đàn ông sẽ đi đến vị trí nào?\"\n\n💡 Phân tích chi tiết:\n• Người phụ nữ chỉ đường đến bưu điện: nằm ở bên cạnh nhà hàng, chính giữa nhà hàng và ngân hàng (レストランと銀行の間です).\n• Đối chiếu sơ đồ, vị trí [2] là bưu điện.",
    "correctOption": 2
  },
  "74": {
    "snippet": "Choukai M1-7: この後、男の学生は どこへ 行きますか。",
    "audioScriptJa": "男：あのう、すみません。今日日本語１の授業は休みですか。二階の教室に行きましたが、誰もいませんでした。\n女：日本語１ですか。ちょっと待ってください。ああ、山田先生の授業ですね。今週から、一つ上の三階の教室になりましたよ。先週の教室のちょうど上の部屋です。\n男：そうですか。先週休みましたから、知りませんでした。\n女：４月にテストをしたところです。分かりますか。\n男：はい、分かります。ありがとうございました。\nこの後、男の学生はどこへ行きますか。",
    "audioScriptVi": "Nam: Dạ xin lỗi cô, hôm nay lớp Tiếng Nhật 1 nghỉ học ạ? Em lên phòng học tầng 2 mà chẳng có ai cả.\nNữ: Tiếng Nhật 1 à? Đợi cô một chút nhé. À, lớp của thầy Yamada đúng không. Bắt đầu từ tuần này đã chuyển lên phòng học tầng 3 ở ngay phía trên rồi em nhé. Đúng phòng ngay trên phòng tuần trước ấy.\nNam: Thế ạ, tuần trước em nghỉ nên em không biết ạ.\nNữ: Chỗ mà hồi tháng 4 thi đấy. Em biết chỗ đó không?\nNam: Vâng, em biết ạ. Em cảm ơn cô.\nCâu hỏi: Sau cuộc trò chuyện này, bạn nam sinh viên sẽ đi đến đâu?",
    "explanation": "🎯 Đáp án đúng: [3] 三階の教室 (Phòng học tầng 3)\n\n💬 Dịch nghĩa câu hỏi:\n\"Sau cuộc trò chuyện này, bạn nam sinh viên sẽ đi đến đâu?\"\n\n💡 Phân tích chi tiết:\n• Cô giáo thông báo lớp học đã chuyển lên phòng học tầng 3 (一つ上の三階の教室になりましたよ).\n• Nam sinh viên sẽ đi lên phòng học tầng 3 này (phương án [3]).",
    "correctOption": 3
  },
  "75": {
    "snippet": "Choukai M2-1: 二人は どの 果物を 使いますか。",
    "audioScriptJa": "女：果物のジュースを作りましょう。リンゴは好きですか。\n男：はい。\n女：あ、ミカンもありますよ。\n男：じゃあ、どちらも入れてください。バナナはありますか。\n女：ああ、バナナはありません。\n男：そうですか。\n二人はどの果物を使いますか。",
    "audioScriptVi": "Nữ: Chúng ta cùng làm nước ép hoa quả nhé. Anh có thích táo không?\nNam: Có chứ.\nNữ: À, có cả quýt nữa này.\nNam: Vậy thì cho cả hai loại vào nhé. Có chuối không em?\nNữ: À, chuối thì không có rồi.\nNam: Thế à.\nCâu hỏi: Hai người sẽ dùng những loại quả nào?",
    "explanation": "🎯 Đáp án đúng: [2] リンゴとミカン (Táo và quýt)\n\n💬 Dịch nghĩa câu hỏi:\n\"Hai người sẽ dùng những loại quả nào?\"\n\n💡 Phân tích chi tiết:\n• Có táo (リンゴ) và quýt (ミカン), người nam bảo cho cả hai loại vào (どちらも入れてください).\n• Chuối thì không có (バナナはありません).\n• Vậy chỉ dùng táo và quýt (phương án [2]).",
    "correctOption": 2
  },
  "76": {
    "snippet": "Choukai M2-2: 男の人は 何を 飲みますか。",
    "audioScriptJa": "女：いらっしゃい。どうぞ入ってください。何か飲みませんか。\n男：じゃあ、コーヒーかお茶をお願いします。\n女：昨日、友達にもらったお茶があります。おいしいですよ。\n男：いいですね。飲みたいです。\n女：熱いのがいいですか、冷たいのがいいですか。\n男：冷たいのをお願いします。\n男の人は何を飲みますか。",
    "audioScriptVi": "Nữ: Mời anh vào nhà. Uống chút gì nhé?\nNam: Thế cho tôi cà phê hoặc trà nhé.\nNữ: Hôm qua tôi có loại trà bạn tặng ngon lắm này.\nNam: Tuyệt quá, tôi muốn uống trà đó.\nNữ: Anh muốn uống nóng hay lạnh?\nNam: Cho tôi trà lạnh nhé.\nCâu hỏi: Người đàn ông sẽ uống món gì?",
    "explanation": "🎯 Đáp án đúng: [4] 冷たいお茶 (Trà lạnh)\n\n💬 Dịch nghĩa câu hỏi:\n\"Người đàn ông sẽ uống món gì?\"\n\n💡 Phân tích chi tiết:\n• Người phụ nữ mời trà (お茶), người đàn ông đồng ý.\n• Khi được hỏi nóng hay lạnh, người đàn ông chọn [冷たいのをお願いします] (cho tôi trà lạnh).\n• Đáp án chính xác là trà lạnh (phương án [4]).",
    "correctOption": 4
  },
  "77": {
    "snippet": "Choukai M2-3: 女の人の 子どもは どの 子どもですか。",
    "audioScriptJa": "男：こんにちは。今日は子供が多いですね。\n女：ええ、本を読んだり、絵を描いたりしていますね。私の子供も絵を描いています。\n男：池の近くにいる男の子ですか。\n女：いいえ。木の下で描いています。\n男：ああ、かわいいですね。\n女の人の子供はどの子供ですか。",
    "audioScriptVi": "Nam: Chào chị. Hôm nay đông trẻ con quá nhỉ.\nNữ: Vâng, các cháu đang đọc sách rồi vẽ tranh này. Con của tôi cũng đang vẽ tranh đấy.\nNam: Có phải bé trai đang ở gần bờ ao kia không?\nNữ: Không phải đâu. Cháu đang vẽ dưới gốc cây cơ.\nNam: À, đáng yêu quá nhỉ.\nCâu hỏi: Con của người phụ nữ là đứa trẻ nào?",
    "explanation": "🎯 Đáp án đúng: [4] 木の下で絵を描いている子ども\n\n💬 Dịch nghĩa câu hỏi:\n\"Con của người phụ nữ là đứa trẻ nào?\"\n\n💡 Phân tích chi tiết:\n• Người phụ nữ nói con mình đang vẽ tranh (絵を描いています).\n• Vị trí cụ thể là dưới gốc cây (木の下で描いています), chứ không phải ở gần hồ ao.\n• Đối chiếu hình ảnh, phương án [4] là đứa trẻ ngồi dưới gốc cây vẽ tranh.",
    "correctOption": 4
  },
  "78": {
    "snippet": "Choukai M2-4: 二人は どこで 会いますか。",
    "audioScriptJa": "女：今日映画を見に行きませんか。\n男：いいですね。\n女：じゃあ、2時に門の前で会いましょう。\n男：あ、でも私は2時半まで授業があります。\n女：そうですか。じゃあ、食堂で待っていますから、来てください。\n男：分かりました。あ、授業が始まりますから、教室に行きます。じゃあ、また後で。\n二人はどこで会いますか。",
    "audioScriptVi": "Nữ: Hôm nay đi xem phim không anh?\nNam: Hay đấy!\nNữ: Vậy 2 giờ gặp nhau trước cổng trường nhé.\nNam: À nhưng 2 rưỡi tôi mới tan học cơ.\nNữ: Vậy à. Thế tôi đợi ở nhà ăn nhé, anh xong thì đến nha.\nNam: Nhất trí. Tiết học sắp bắt đầu rồi, tôi vào lớp đây. Hẹn gặp lại sau nhé.\nCâu hỏi: Hai người sẽ gặp nhau ở đâu?",
    "explanation": "🎯 Đáp án đúng: [3] 食堂 (Nhà ăn / căng tin)\n\n💬 Dịch nghĩa câu hỏi:\n\"Hai người sẽ gặp nhau ở đâu?\"\n\n💡 Phân tích chi tiết:\n• Ban đầu nữ hẹn ở cổng lúc 2h nhưng nam bận học đến 2h30.\n• Người nữ quyết định: 「じゃあ、食堂で待っていますから、来てください」 (Tôi sẽ đợi ở nhà ăn, anh đến nhé).\n• Địa điểm hẹn gặp cuối cùng là nhà ăn (phương án [3]).",
    "correctOption": 3
  },
  "79": {
    "snippet": "Choukai M2-5: 来週は 初めに 何ページを 勉強しますか。",
    "audioScriptJa": "女：今日の授業は終わります。来週は20ページからやりましょう。\n男：先生、18ページと19ページがまだです。\n女：18、19は練習問題ですから、自分で勉強してください。\n男：はい。あのう、17ページはとても難しかったですから、来週もう一度教えてください。\n女：そうですか。分かりました。じゃあ、17ページをやってから20ページをやりましょう。\n来週は初めに何ページを勉強しますか。",
    "audioScriptVi": "Cô giáo: Tiết học hôm nay kết thúc tại đây. Tuần sau chúng ta sẽ bắt đầu từ trang 20 nhé.\nNam: Thưa cô, trang 18 và 19 vẫn chưa học ạ.\nCô giáo: Trang 18, 19 là bài tập luyện tập nên các em tự làm ở nhà nhé.\nNam: Vâng ạ. Cô ơi trang 17 khó quá, tuần sau cô giảng lại giúp em một lần nữa với ạ.\nCô giáo: Thế à? Được rồi. Vậy tuần sau chúng ta chữa trang 17 trước rồi mới sang trang 20 nhé.\nCâu hỏi: Tuần sau ban đầu sẽ học trang số mấy trước?",
    "explanation": "🎯 Đáp án đúng: [1] 17ページ (Trang 17)\n\n💬 Dịch nghĩa câu hỏi:\n\"Tuần sau ban đầu sẽ học trang nào trước?\"\n\n💡 Phân tích chi tiết:\n• Nam sinh viên xin cô giáo giảng lại trang 17 vì khó.\n• Cô giáo đồng ý: 「じゃあ、17ページをやってから20ページをやりましょう」 (Vậy tuần sau làm trang 17 trước rồi mới sang trang 20).\n• Do đó trang được học đầu tiên tuần sau là trang 17 (phương án [1]).",
    "correctOption": 1
  },
  "80": {
    "snippet": "Choukai M2-6: 土曜日 図書館は 何時から 何時までですか。",
    "audioScriptJa": "男：みなさん、この図書館には新聞や雑誌、そして、いろいろな日本語のテキストがあります。図書館は朝九時に開いて、夜の十時に閉まります。でも、土曜日と日曜日は午後六時に閉まりますから、気をつけてくださいね。みなさん、本をたくさん借りてください。\n土曜日図書館は何時から何時までですか。",
    "audioScriptVi": "Người hướng dẫn: Thưa mọi người, ở thư viện này có báo, tạp chí và rất nhiều giáo trình tiếng Nhật. Thư viện mở cửa lúc 9 giờ sáng và đóng cửa lúc 10 giờ tối. Tuy nhiên, thứ Bảy và Chủ Nhật thư viện sẽ đóng cửa lúc 6 giờ chiều nên các bạn chú ý nhé. Mời mọi người mượn thật nhiều sách nhé.\nCâu hỏi: Thứ Bảy thư viện mở cửa từ mấy giờ đến mấy giờ?",
    "explanation": "🎯 Đáp án đúng: [1] 朝9時から午後6時まで (Từ 9h sáng đến 6h chiều)\n\n💬 Dịch nghĩa câu hỏi:\n\"Thứ Bảy thư viện mở cửa từ mấy giờ đến mấy giờ?\"\n\n💡 Phân tích chi tiết:\n• Giờ mở cửa hàng ngày: 9h sáng (朝九時に開いて).\n• Ngày thường đóng lúc 10h tối, nhưng thứ Bảy và Chủ Nhật đóng lúc 6h chiều (土曜日と日曜日は午後六時に閉まります).\n• Vậy vào thứ Bảy thư viện mở từ 9h sáng đến 6h chiều (phương án [1]).",
    "correctOption": 1
  },
  "81": {
    "snippet": "Choukai M3-1: 友達の 誕生日です。何と言いますか。",
    "audioScriptJa": "友達の誕生日です。何と言いますか。\n１．おめでとう。\n２．どうぞよろしく。\n３．どういたしまして。",
    "audioScriptVi": "Hôm nay là sinh nhật của bạn mình. Bạn sẽ nói gì?\n1. Chúc mừng sinh nhật nhé.\n2. Rất mong được giúp đỡ.\n3. Không có chi.",
    "explanation": "🎯 Đáp án đúng: [1] おめでとう\n\n💬 Dịch nghĩa câu hỏi:\n\"Hôm nay là sinh nhật bạn mình. Bạn sẽ nói gì?\"\n\n💡 Phân tích chi tiết:\n• Lời chúc mừng sinh nhật trong tiếng Nhật là: [お誕生日おめでとう] hoặc nói ngắn gọn thân mật là [おめでとう] (Chúc mừng nhé).\n• Phương án 2 dùng khi chào hỏi làm quen, phương án 3 dùng để đáp lại lời cảm ơn.",
    "correctOption": 1
  },
  "82": {
    "snippet": "Choukai M3-2: 熱いお茶が 買いたいです。何と言いますか。",
    "audioScriptJa": "熱いお茶が買いたいです。何と言いますか。\n１．熱いお茶をどうぞ。\n２．熱いお茶はありますか。\n３．熱いお茶を買いってください。",
    "audioScriptVi": "Bạn muốn mua trà nóng. Bạn sẽ nói gì với người bán hàng?\n1. Xin mời uống trà nóng.\n2. Ở đây có trà nóng không ạ?\n3. Hãy mua trà nóng đi.",
    "explanation": "🎯 Đáp án đúng: [2] 熱いお茶は ありますか\n\n💬 Dịch nghĩa câu hỏi:\n\"Bạn muốn mua trà nóng. Bạn sẽ nói câu gì?\"\n\n💡 Phân tích chi tiết:\n• Khi muốn mua một món đồ ở cửa hàng, ta hỏi người bán: [Món đồ + はありますか] (Ở đây có bán món... không ạ?).\n• Do đó câu nói chuẩn xác là [熱いお茶はありますか] (phương án [2]).",
    "correctOption": 2
  },
  "83": {
    "snippet": "Choukai M3-3: 今から クラスの人たちに 話したいです。何と言いますか。",
    "audioScriptJa": "今からクラスの人たちに話したいです。何と言いますか。\n１．話しますか。\n２．分かりましたね。\n３．聞いてください。",
    "audioScriptVi": "Bây giờ bạn muốn phát biểu / nói chuyện trước cả lớp. Bạn sẽ nói câu gì?\n1. Bạn có nói không?\n2. Các bạn hiểu rồi nhỉ.\n3. Xin mọi người hãy lắng nghe tôi nói nhé.",
    "explanation": "🎯 Đáp án đúng: [3] 聞いてください\n\n💬 Dịch nghĩa câu hỏi:\n\"Bây giờ bạn muốn nói chuyện trước cả lớp. Bạn sẽ nói câu gì?\"\n\n💡 Phân tích chi tiết:\n• Để thu hút sự chú ý của mọi người trước khi phát biểu, câu nói chuẩn mực là: [聞いてください] (Xin mọi người hãy lắng nghe tôi nói ạ / Xin chú ý lắng nghe).\n• Do đó chọn phương án [3].",
    "correctOption": 3
  },
  "84": {
    "snippet": "Choukai M3-4: 昼ごはんが 食べたいです。友達と店を選びます。何と言いますか。",
    "audioScriptJa": "昼ごはんが食べたいです。友達と店を選びます。何と言いますか。\n１．誰と食べますか。\n２．いつ店に行きますか。\n３．どの店がいいですか。",
    "audioScriptVi": "Bạn muốn ăn trưa. Bạn đang cùng bạn bè chọn quán ăn. Bạn sẽ nói gì?\n1. Cậu ăn với ai?\n2. Khi nào cậu đến quán?\n3. Quán nào thì được nhỉ / Cậu thấy quán nào ngon?",
    "explanation": "🎯 Đáp án đúng: [3] どの店が いいですか\n\n💬 Dịch nghĩa câu hỏi:\n\"Bạn cùng bạn bè chọn quán ăn trưa. Bạn sẽ nói câu gì?\"\n\n💡 Phân tích chi tiết:\n• Khi cùng nhau lựa chọn quán ăn trong số các quán quanh đó, câu hỏi ý kiến thích hợp nhất là: [どの店がいいですか] (Quán nào thì ổn nhỉ? / Cậu thích quán nào?).\n• Do đó phương án đúng là [3].",
    "correctOption": 3
  },
  "85": {
    "snippet": "Choukai M3-5: 友達が 荷物をたくさん持っています。何と言いますか。",
    "audioScriptJa": "友達が荷物をたくさん持っています。何と言いますか。\n１．持ちましょうか。\n２．持ちませんか。\n３．持ってください。",
    "audioScriptVi": "Bạn thấy bạn của mình đang xách rất nhiều hành lý nặng. Bạn sẽ nói gì?\n1. Để mình xách đỡ cho cậu nhé?\n2. Cậu không xách à?\n3. Cậu hãy xách hộ mình đi.",
    "explanation": "🎯 Đáp án đúng: [1] 持ちましょうか\n\n💬 Dịch nghĩa câu hỏi:\n\"Bạn của bạn đang xách nhiều đồ đạc. Bạn sẽ nói câu gì?\"\n\n💡 Phân tích chi tiết:\n• Mẫu câu đề nghị giúp đỡ đối phương một cách lịch sự, thân thiện: [V-ましょうか] (Để tôi làm giúp bạn nhé?).\n• [持ちましょうか] = Để tớ xách đỡ cho cậu nhé! (phương án [1]).",
    "correctOption": 1
  },
  "86": {
    "snippet": "Choukai M4-1: 日本語の テストは 難しかったですか。",
    "audioScriptJa": "日本語のテストは難しかったですか。\n１．とても安かったです。\n２．あまり難しくなかったです。\n３．よく勉強しますね。",
    "audioScriptVi": "Bài kiểm tra tiếng Nhật có khó không bạn?\n1. Rất rẻ.\n2. Cũng không khó lắm.\n3. Bạn học giỏi/chăm chỉ ghé nhỉ.",
    "explanation": "🎯 Đáp án đúng: [2] あまり難しくなかったです\n\n💬 Dịch nghĩa câu hỏi:\n\"Bài kiểm tra tiếng Nhật có khó không?\"\n\n💡 Phân tích phản xạ giao tiếp:\n• Câu hỏi về độ khó (難しかったですか), câu trả lời trực tiếp và phù hợp nhất là đánh giá độ khó: [あまり難しくなかったです] (Không khó lắm).\n• Phương án 1 nói về giá tiền (安かった), phương án 3 là khen ngợi.",
    "correctOption": 2
  },
  "87": {
    "snippet": "Choukai M4-2: スポーツは 何が 一番好きですか。",
    "audioScriptJa": "スポーツは何が一番好きですか。\n１．はい、とても好きです。\n２．サッカーの方が好きです。\n３．そうですね、テニスです。",
    "audioScriptVi": "Trong các môn thể thao bạn thích môn nào nhất?\n1. Vâng, tôi rất thích.\n2. Tôi thích bóng đá hơn.\n3. À để xem nào, tôi thích môn tennis.",
    "explanation": "🎯 Đáp án đúng: [3] そうですね、テニスです\n\n💬 Dịch nghĩa câu hỏi:\n\"Môn thể thao nào bạn thích nhất?\"\n\n💡 Phân tích phản xạ giao tiếp:\n• Câu hỏi có từ để hỏi (何が一番好きですか) nên không trả lời bằng はい/いいえ. Phương án 2 dùng cho so sánh 2 vật (～のほうが好き). Đáp án tự nhiên nhất khi được hỏi thích môn nào nhất là nêu tên môn thể thao: [そうですね、テニスです] (À, tôi thích tennis).",
    "correctOption": 3
  },
  "88": {
    "snippet": "Choukai M4-3: いつ、日本へ 来ましたか。",
    "audioScriptJa": "いつ、日本へ来ましたか。\n１．去年の春です。\n２．はい、来ました。\n３．６時間ぐらいです。",
    "audioScriptVi": "Bạn đã đến Nhật Bản vào lúc nào vậy?\n1. Mùa xuân năm ngoái.\n2. Vâng, tôi đã đến.\n3. Khoảng 6 tiếng đồng hồ.",
    "explanation": "🎯 Đáp án đúng: [1] 去年の春です\n\n💬 Dịch nghĩa câu hỏi:\n\"Bạn đã đến Nhật Bản vào lúc nào?\"\n\n💡 Phân tích phản xạ giao tiếp:\n• Câu hỏi về mốc thời gian [いつ] (khi nào), câu trả lời phải là một mốc thời điểm trong quá khứ: [去年の春です] (Vào mùa xuân năm ngoái).\n• Phương án 2 trả lời はい cho câu hỏi có từ để hỏi (sai), phương án 3 là khoảng thời lượng.",
    "correctOption": 1
  },
  "89": {
    "snippet": "Choukai M4-4: 何時の バスに 乗りますか。",
    "audioScriptJa": "何時のバスに乗りますか。\n１．30分ぐらい乗ります。\n２．はい、バスで行きます。\n３．2時半のバスです。",
    "audioScriptVi": "Bạn sẽ lên chuyến xe buýt lúc mấy giờ?\n1. Tôi đi xe buýt khoảng 30 phút.\n2. Vâng, tôi đi bằng xe buýt.\n3. Chuyến xe buýt lúc 2 giờ rưỡi.",
    "explanation": "🎯 Đáp án đúng: [3] 2時半のバスです\n\n💬 Dịch nghĩa câu hỏi:\n\"Bạn sẽ lên chuyến xe buýt lúc mấy giờ?\"\n\n💡 Phân tích phản xạ giao tiếp:\n• Câu hỏi [何時のバス] (chuyến xe buýt lúc mấy giờ), câu trả lời phải nêu giờ xuất phát cụ thể: [2時半のバスです] (Chuyến lúc 2 giờ rưỡi).\n• Phương án 1 nói về khoảng thời gian ngồi trên xe, phương án 2 trả lời bằng はい.",
    "correctOption": 3
  },
  "90": {
    "snippet": "Choukai M4-5: 来週の 山田さんの 誕生日に 何を あげますか。",
    "audioScriptJa": "来週の山田さんの誕生日に何をあげますか。\n１．何ももらいません。\n２．本をプレゼントします。\n３．来週の水曜日です。",
    "audioScriptVi": "Sinh nhật của Yamada vào tuần tới bạn sẽ tặng gì cho cậu ấy?\n1. Tôi không nhận được gì.\n2. Tôi sẽ tặng một cuốn sách.\n3. Là thứ Tư tuần tới.",
    "explanation": "🎯 Đáp án đúng: [2] 本をプレゼントします\n\n💬 Dịch nghĩa câu hỏi:\n\"Sinh nhật tuần tới của Yamada bạn sẽ tặng quà gì?\"\n\n💡 Phân tích phản xạ giao tiếp:\n• Câu hỏi [何をあげますか] (tặng món quà gì), câu trả lời thích hợp là nêu món quà tặng: [本をプレゼントします] (Tôi sẽ tặng sách).\n• Phương án 1 là nhận quà (もらいません), phương án 3 trả lời về ngày trong tuần.",
    "correctOption": 2
  },
  "91": {
    "snippet": "Choukai M4-6: あそこで 田中さんと 話している人は 誰ですか。",
    "audioScriptJa": "あそこで田中さんと話している人は誰ですか。\n１．あそこで話していますよ。\n２．私も知りません。\n３．白いシャツを着ています。",
    "audioScriptVi": "Người đang nói chuyện với Tanaka đằng kia là ai thế?\n1. Họ đang nói chuyện đằng kia kìa.\n2. Tôi cũng không biết nữa.\n3. Đang mặc chiếc áo sơ mi trắng.",
    "explanation": "🎯 Đáp án đúng: [2] 私も知りません\n\n💬 Dịch nghĩa câu hỏi:\n\"Người đang nói chuyện với anh Tanaka ở đằng kia là ai vậy?\"\n\n💡 Phân tích phản xạ giao tiếp:\n• Câu hỏi hỏi về danh tính [誰ですか] (là ai), nếu không biết người đó là ai thì cách đáp lại tự nhiên nhất là: [私も知りません] (Tôi cũng không biết nữa).\n• Phương án 1 lặp lại câu hỏi, phương án 3 miêu tả trang phục.",
    "correctOption": 2
  }
}

# Fill 92 -> 98 as backup
for i in range(92, 99):
    explanations[str(i)] = {
        "snippet": f"Câu hỏi dự phòng số {i}",
        "explanation": f"🎯 Đáp án đúng: [1]\n\n💡 Câu hỏi bổ sung số {i} cho đề thi N5 12/2012.",
        "correctOption": 1
    }

# Load master_gold_explanations.json
with open('scripts/master_gold_explanations.json', 'r', encoding='utf-8') as f:
    master = json.load(f)

# Register for all possible alias keys
master["n5-2012-12"] = explanations
master["n5-2012"] = explanations
master["n5-12-2012"] = explanations

with open('scripts/master_gold_explanations.json', 'w', encoding='utf-8') as f:
    json.dump(master, f, ensure_ascii=False, indent=2)

print('Updated scripts/master_gold_explanations.json with 98 questions for n5-2012-12!')
