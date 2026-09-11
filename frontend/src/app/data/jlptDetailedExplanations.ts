export interface DetailedExplanationItem {
  snippet: string;
  explanation: string;
  audioScriptJa?: string;
  audioScriptVi?: string;
  correctOption?: number;
}

export const EXAM_DETAILED_EXPLANATION_MAP: Record<string, Record<number, DetailedExplanationItem>> = {
  "n4-2010-2011": {
    "1": {
      "snippet": "自分 (じぶん)",
      "explanation": "🎯 Đáp án đúng: [2] じぶん (自分)\n\n💬 Dịch nghĩa câu:\n\"Cái giá sách này là do tự bản thân tôi làm.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán: 自分 - cách đọc chuẩn xác là 「じぶん」.\n• Chữ Hán 自 có âm đọc là 「じ」, chữ 分 có âm đọc là 「ぶん・ぷん・ぶ」. Ghép lại thành 自分 (じぶん: tự mình, bản thân).\n\n🔍 Phân tích các lựa chọn:\n- 1. じふん: Sai biến âm đục (phải là ぶん)\n- 2. じぶん: ĐÚNG - Âm đọc chuẩn xác của 自分\n- 3. ちふん: Sai âm đầu\n- 4. ちぶん: Sai âm đầu\n\n📄 Trích PDF gốc (试题解析):\n(1) 2 句意: 这个书架是我自己做的。考察汉字词，“自”音读为“じ”，“分”音读为“ぶん・ぷん・ぶ”。",
      "correctOption": 2
    },
    "2": {
      "snippet": "旅館 (りょかん)",
      "explanation": "🎯 Đáp án đúng: [3] りょかん (旅館)\n\n💬 Dịch nghĩa câu:\n\"Quán trọ kiểu Nhật này rất nổi tiếng.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán: 旅館 - cách đọc chuẩn xác là 「りょかん」.\n• Chữ 旅 có âm On là 「りょ」, chữ 館 có âm On là 「かん」. Ghép lại thành 旅館 (りょかん: lữ quán, nhà trọ).\n\n🔍 Phân tích các lựa chọn:\n- 1. ろかん: Thiếu âm [りょ]\n- 2. ろっかん: Sai trường âm / âm ngắt\n- 3. りょかん: ĐÚNG - Âm đọc chuẩn của 旅館\n- 4. りょっかん: Sai âm ngắt\n\n📄 Trích PDF gốc (试题解析):\n(2) 3 句意: 这家旅馆非常有名。考察汉字词，“旅”音读为“りょ”，“館”音读为“かん”。",
      "correctOption": 3
    },
    "3": {
      "snippet": "Điền từ: とくに (特に)",
      "explanation": "🎯 Đáp án đúng: [4] とくに (特に)\n\n💬 Dịch nghĩa câu:\n\"Hiện tại tôi không có thứ gì đặc biệt muốn có cả.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「とくに (特に)」 phù hợp nhất với ngữ cảnh của câu.\n• Phó từ 「とくに (特に)」 có nghĩa là 'đặc biệt là'. Cụm phủ định: とくに～ない (không có gì đặc biệt).\n\n🔍 Phân tích các lựa chọn:\n- 1. さきに (先に): Trước đây, đi trước\n- 2. べつに (別に): Không có gì đặc biệt (mang tính thờ ơ, thường nói khẩu ngữ)\n- 3. すぐに: Ngay lập tức\n- 4. とくに (特に): ĐÚNG - Đặc biệt là, diễn đạt mức độ mong muốn\n\n📄 Trích PDF gốc (试题解析):\n(3) 4 句意: 现在没有什么特别想要的东西。1. さきに: 以前; 2. べつに: 特别; 3. すぐに: 立即; 4. とくに: 特别",
      "correctOption": 4
    },
    "4": {
      "snippet": "Điền từ: きまりました (決まる)",
      "explanation": "🎯 Đáp án đúng: [2] きまりました (決まる)\n\n💬 Dịch nghĩa câu:\n\"Kế hoạch cho kỳ nghỉ hè đã được ấn định / quyết định xong.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「きまりました (決まる)」 phù hợp nhất với ngữ cảnh của câu.\n• Tự động từ 「きまる (決まる)」: được quyết định, được ấn định (dự định, lịch trình).\n\n🔍 Phân tích các lựa chọn:\n- 1. 集まる (あつまる): Tập hợp, tụ tập lại\n- 2. 決まる (きまる): ĐÚNG - Được quyết định, ấn định xong\n- 3. 始まる (はじまる): Bắt đầu; xảy ra\n- 4. 止まる (とまる): Dừng lại\n\n📄 Trích PDF gốc (试题解析):\n(4) 2 句意: 暑假的安排已经定好了。1. 集まる: 聚集; 2. 決まる: 决定; 3. 始まる: 开始; 4. 止まる: 停止",
      "correctOption": 2
    },
    "5": {
      "snippet": "Điền từ: すすんで (進む)",
      "explanation": "🎯 Đáp án đúng: [4] すすんで (進む)\n\n💬 Dịch nghĩa câu:\n\"Kỹ thuật công nghệ robot của quốc gia này đang rất phát triển / tiến bộ.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「すすんで (進む)」 phù hợp nhất với ngữ cảnh của câu.\n• Động từ 「すすむ (進む)」 biểu thị sự tiến bộ, phát triển vượt bậc (技術が進む).\n\n🔍 Phân tích các lựa chọn:\n- 1. 休む (やすむ): Nghỉ ngơi (phương án gây nhiễu)\n- 2. 涼む (すずむ): Hóng mát\n- 3. 包む (つつむ): Gói lại, bọc lại\n- 4. 進む (すすむ): ĐÚNG - Tiến bộ, phát triển\n\n📄 Trích PDF gốc (试题解析):\n(5) 4 句意: 这个国家的机器人技术正在发展。2. 涼む: 乘凉; 3. 包む: 包上; 4. 進む: 进步，前进",
      "correctOption": 4
    },
    "6": {
      "snippet": "Điền từ: はこんで (運ぶ)",
      "explanation": "🎯 Đáp án đúng: [3] はこんで (運ぶ)\n\n💬 Dịch nghĩa câu:\n\"Tôi đang khiêng / vận chuyển chiếc vali hành lý.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「はこんで (運ぶ)」 phù hợp nhất với ngữ cảnh của câu.\n• Động từ 「はこぶ (運ぶ)」 nghĩa là khuân vác, vận chuyển đồ đạc từ nơi này sang nơi khác.\n\n🔍 Phân tích các lựa chọn:\n- 1. 噛む (かむ): Cắn, nhai\n- 2. 踏む (ふむ): Giẫm lên, đạp lên\n- 3. 運ぶ (はこぶ): ĐÚNG - Khuân vác, vận chuyển\n- 4. 頼む (たのむ): Nhờ vả, yêu cầu\n\n📄 Trích PDF gốc (试题解析):\n(6) 3 句意: 正在搬行李箱。1. 噛む: 咬; 2. 踏む: 踩; 3. 運ぶ: 搬运; 4. 頼む: 恳求，委托",
      "correctOption": 3
    },
    "7": {
      "snippet": "空港 (くうこう)",
      "explanation": "🎯 Đáp án đúng: [4] くうこう (空港)\n\n💬 Dịch nghĩa câu:\n\"Tôi đi đến sân bay bằng xe buýt.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán: 空港 - cách đọc chuẩn xác là 「くうこう」.\n• Chữ 空 có âm On là 「くう」, chữ 港 có âm On là 「こう」. Kết hợp thành 空港 (くうこう: sân bay).\n\n🔍 Phân tích các lựa chọn:\n- 1. くうこ: Sai trường âm\n- 2. くこう: Thiếu trường âm của 空\n- 3. こうくう: Đảo lộn trật tự chữ\n- 4. くうこう: ĐÚNG - Âm đọc chuẩn của 空港\n\n📄 Trích PDF gốc (试题解析):\n(7) 4 句意: 坐公共汽车去机场。考察汉字词，“空”音读为“くう”，“港”音读为“こう”。",
      "correctOption": 4
    },
    "8": {
      "snippet": "Điền từ: よわく (弱い)",
      "explanation": "🎯 Đáp án đúng: [1] よわく (弱い)\n\n💬 Dịch nghĩa câu:\n\"Gió đã trở nên yếu hơn so với hồi sáng.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「よわく (弱い)」 phù hợp nhất với ngữ cảnh của câu.\n• Tính từ đuôi い: 「よわい (弱い)」 (yếu), khi bổ nghĩa cho động từ なる chuyển thành 「よわくなる」 (yếu đi).\n\n🔍 Phân tích các lựa chọn:\n- 1. 弱い (よわい): ĐÚNG - Yếu đi, giảm cường độ\n- 2. 強い (つよい): Mạnh lên\n- 3. 遅い (おそい): Chậm trễ, muộn\n- 4. 早い (はやい): Sớm, nhanh\n\n📄 Trích PDF gốc (试题解析):\n(8) 1 句意: 风比早上弱了些。1. 弱い: 弱; 2. 強い: 强; 3. 遅い: 晚; 4. 早い: 早",
      "correctOption": 1
    },
    "9": {
      "snippet": "住所 (じゅうしょ)",
      "explanation": "🎯 Đáp án đúng: [1] じゅうしょ (住所)\n\n💬 Dịch nghĩa câu:\n\"Xin vui lòng cho tôi biết địa chỉ mới của bạn.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán: 住所 - cách đọc chuẩn xác là 「じゅうしょ」.\n• Chữ 住 có âm On là 「じゅう」, chữ 所 có âm On là 「しょ」. Ghép lại thành 住所 (じゅうしょ: địa chỉ nhà).\n\n🔍 Phân tích các lựa chọn:\n- 1. じゅうしょ: ĐÚNG - Âm đọc chuẩn của 住所\n- 2. じゅしょ: Thiếu trường âm じゅう\n- 3. すみしょ: Nhầm sang âm Kun すむ\n- 4. じゅうところ: Nhầm sang âm Kun ところ\n\n📄 Trích PDF gốc (试题解析):\n(9) 1 句意: 请把您的新地址告诉我。考察汉字词，“住”音读为“じゅう”，“所”音读为“しょ”。",
      "correctOption": 1
    },
    "10": {
      "snippet": "せつめい -> 説明",
      "explanation": "🎯 Đáp án đúng: [3] 説明 (せつめい)\n\n💬 Dịch nghĩa câu:\n\"Xin hãy giải thích giúp tôi cách sử dụng chiếc máy ảnh này.\"\n\n💡 Phân tích & Cấu trúc chữ Hán:\n• Từ Hiragana 「せつめい」 được viết bằng chữ Hán chuẩn xác là 「説明」.\n• Chữ 「説」 (thuyết) ghép với chữ 「明」 (minh) tạo thành 「説明」 (giải thích, thuyết minh).\n\n🔍 Phân tích các lựa chọn:\n- 1, 2, 4: Chữ Hán sai bộ thủ hoặc sai từ vựng\n- 3. 説明 (せつめい): ĐÚNG - Giải thích, thuyết minh\n\n📄 Trích PDF gốc (试题解析):\n(10) 3 句意: 请您说明一下这个相机的使用方法。3. 説明（せつめい）: 说明；解释",
      "correctOption": 3
    },
    "11": {
      "snippet": "おきます -> 起きます",
      "explanation": "🎯 Đáp án đúng: [1] 起きます (おきます)\n\n💬 Dịch nghĩa câu:\n\"Tôi luôn luôn thức dậy vào lúc 7 giờ sáng.\"\n\n💡 Phân tích & Cấu trúc chữ Hán:\n• Từ Hiragana 「おきます」 được viết bằng chữ Hán chuẩn xác là 「起きます」.\n• Động từ 「おきる (起きる - khởi)」 có nghĩa là thức dậy.\n\n🔍 Phân tích các lựa chọn:\n- 1. 起きます (おきます): ĐÚNG - Thức dậy\n- 2. 置きます (おきます): Đặt, để đồ vật\n- 3. 措きます: Đặt ngoài\n- 4. 押します (おします): Ấn, bấm, đẩy\n\n📄 Trích PDF gốc (试题解析):\n(11) 1 句意: 我总是早上7点起床。1. 起きる: 起床; 2. 置く: 放; 3. 措く: 除外; 4. 押す: 按",
      "correctOption": 1
    },
    "12": {
      "snippet": "とおい -> 遠い",
      "explanation": "🎯 Đáp án đúng: [2] 遠い (とおい)\n\n💬 Dịch nghĩa câu:\n\"Ga tàu điện ngầm cách xa nơi này.\"\n\n💡 Phân tích & Cấu trúc chữ Hán:\n• Từ Hiragana 「とおい」 được viết bằng chữ Hán chuẩn xác là 「遠い」.\n• Tính từ 「とおい (遠い - viễn)」 nghĩa là xa xôi về khoảng cách.\n\n🔍 Phân tích các lựa chọn:\n- 1. 近い (ちかい): Gần\n- 2. 遠い (とおい): ĐÚNG - Xa\n- 3. 違い (ちがい): Khác biệt\n- 4. 通い (かよい): Đi lại, lui tới\n\n📄 Trích PDF gốc (试题解析):\n(12) 2 句意: 地铁站离这里很远。1. 近い: 近; 2. 遠い: 远; 3. 違い: 不同; 4. 通い: 往返",
      "correctOption": 2
    },
    "13": {
      "snippet": "やさい -> 野菜",
      "explanation": "🎯 Đáp án đúng: [4] 野菜 (やさい)\n\n💬 Dịch nghĩa câu:\n\"Mỗi ngày tôi đều ăn nhiều rau xanh.\"\n\n💡 Phân tích & Cấu trúc chữ Hán:\n• Từ Hiragana 「やさい」 được viết bằng chữ Hán chuẩn xác là 「野菜」.\n• Chữ 「野」 (dã) ghép với 「菜」 (thái) tạo thành 「野菜」 (rau củ quả).\n\n🔍 Phân tích các lựa chọn:\n- 1, 2, 3: Chữ Hán sai bộ thủ hoặc chữ nhiễu\n- 4. 野菜 (やさい): ĐÚNG - Rau xanh\n\n📄 Trích PDF gốc (试题解析):\n(13) 4 句意: 每天吃蔬菜。4. 野菜（やさい）: 蔬菜",
      "correctOption": 4
    },
    "14": {
      "snippet": "とじて -> 閉じて",
      "explanation": "🎯 Đáp án đúng: [3] 閉じて (とじて)\n\n💬 Dịch nghĩa câu:\n\"Xin vui lòng hãy nhắm mắt lại.\"\n\n💡 Phân tích & Cấu trúc chữ Hán:\n• Từ Hiragana 「とじて」 được viết bằng chữ Hán chuẩn xác là 「閉じて」.\n• Động từ 「とじる (閉じる - bế)」 nghĩa là nhắm mắt (目を閉じる), gấp sách (本を閉じる).\n\n🔍 Phân tích các lựa chọn:\n- 1, 2, 4: Chữ Hán sai bộ thủ hoặc chữ nhiễu\n- 3. 閉じて (とじて): ĐÚNG - Nhắm mắt, gấp lại\n\n📄 Trích PDF gốc (试题解析):\n(14) 3 句意: 请把眼睛闭上。3. 閉じる（とじる）: 关闭，合上",
      "correctOption": 3
    },
    "15": {
      "snippet": "えいぎょう -> 営業",
      "explanation": "🎯 Đáp án đúng: [2] 営業 (えいぎょう)\n\n💬 Dịch nghĩa câu:\n\"Cửa hàng này kinh doanh mở cửa từ 9 giờ sáng đến 6 giờ tối.\"\n\n💡 Phân tích & Cấu trúc chữ Hán:\n• Từ Hiragana 「えいぎょう」 được viết bằng chữ Hán chuẩn xác là 「営業」.\n• Chữ 「営」 (doanh) ghép với 「業」 (nghiệp) tạo thành 「営業」 (kinh doanh, mở cửa phục vụ khách).\n\n🔍 Phân tích các lựa chọn:\n- 1, 3, 4: Chữ Hán viết sai\n- 2. 営業 (えいぎょう): ĐÚNG - Kinh doanh, mở cửa\n\n📄 Trích PDF gốc (试题解析):\n(15) 2 句意: 这家店从早上9点营业到晚上6点。2. 営業（えいぎょう）: 营业，经营",
      "correctOption": 2
    },
    "16": {
      "snippet": "Điền từ: 先輩 (せんぱい)",
      "explanation": "🎯 Đáp án đúng: [1] 先輩 (せんぱい)\n\n💬 Dịch nghĩa câu:\n\"Tiền bối khóa trên thời đại học của tôi đang làm việc ở công ty này.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「先輩 (せんぱい)」 phù hợp nhất với ngữ cảnh của câu.\n• 「先輩 (せんぱい)」 chỉ đàn anh, tiền bối khóa trên.\n\n🔍 Phân tích các lựa chọn:\n- 1. 先輩 (せんぱい): ĐÚNG - Tiền bối, đàn anh\n- 2. 社員 (しゃいん): Nhân viên\n- 3. 店員 (てんいん): Nhân viên bán hàng\n- 4. 社長 (しゃちょう): Giám đốc\n\n📄 Trích PDF gốc (试题解析):\n(16) 1 句意: 大学前辈在这家公司上班。1. 先輩: 前辈; 2. 社员; 3. 店员; 4. 社长",
      "correctOption": 1
    },
    "17": {
      "snippet": "Điền từ: チェック (check)",
      "explanation": "🎯 Đáp án đúng: [4] チェック (check)\n\n💬 Dịch nghĩa câu:\n\"Trước khi ra ngoài tôi đã kiểm tra xem đèn đã tắt hay chưa.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「チェック (check)」 phù hợp nhất với ngữ cảnh của câu.\n• Từ mượn tiếng Anh 「チェックする」: kiểm tra, rà soát lại (điện, cửa, đồ đạc).\n\n🔍 Phân tích các lựa chọn:\n- 1. スタート (start): Bắt đầu, xuất phát\n- 2. オープン (open): Mở cửa\n- 3. スイッチ (switch): Công tắc\n- 4. チェック (check): ĐÚNG - Kiểm tra, đối chiếu\n\n📄 Trích PDF gốc (试题解析):\n(17) 4 句意: 出门前检查了灯关没关。1. スタート; 2. オープン; 3. スイッチ; 4. チェック: 核对",
      "correctOption": 4
    },
    "18": {
      "snippet": "Điền từ: 案内 (あんない)",
      "explanation": "🎯 Đáp án đúng: [2] 案内 (あんない)\n\n💬 Dịch nghĩa câu:\n\"Bố mẹ tôi đã đến chơi nên tôi đã dẫn bố mẹ đi tham quan Tokyo.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「案内 (あんない)」 phù hợp nhất với ngữ cảnh của câu.\n• 「案内する (あんないする)」: hướng dẫn, dẫn đường, đưa đi tham quan.\n\n🔍 Phân tích các lựa chọn:\n- 1. 受付 (うけつけ): Quầy tiếp tân\n- 2. 案内 (あんない): ĐÚNG - Dẫn đường, hướng dẫn tham quan\n- 3. 連絡 (れんらく): Liên lạc\n- 4. 招待 (しょうたい): Mời, chiêu đãi\n\n📄 Trích PDF gốc (试题解析):\n(18) 2 句意: 父母来了, 我带他们游览东京。1. 受付; 2. 案内: 带路, 引路; 3. 联络; 4. 招待",
      "correctOption": 2
    },
    "19": {
      "snippet": "Điền từ: 謝りませんでした (あやまらなかった)",
      "explanation": "🎯 Đáp án đúng: [3] 謝りませんでした (あやまらなかった)\n\n💬 Dịch nghĩa câu:\n\"Bạn tôi đến muộn giờ hẹn, thế mà lại không hề xin lỗi mọi người.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「謝りませんでした (あやまらなかった)」 phù hợp nhất với ngữ cảnh của câu.\n• Động từ 「あやまる (謝る)」 mang nghĩa xin lỗi ai đó khi làm sai.\n\n🔍 Phân tích các lựa chọn:\n- 1. 行く (いく): Đi\n- 2. すみません: Câu nói xin lỗi\n- 3. 謝る (あやまる): ĐÚNG - Nhận lỗi, tạ lỗi\n- 4. 間に合う (まにあう): Kịp giờ\n\n📄 Trích PDF gốc (试题解析):\n(19) 3 句意: 朋友比约定的时间晚到, 却没有向大家道歉。1. 行く; 2. すみません; 3. 謝る: 道歉; 4. 間に合う",
      "correctOption": 3
    },
    "20": {
      "snippet": "Điền từ: 太って (ふとって)",
      "explanation": "🎯 Đáp án đúng: [2] 太って (ふとって)\n\n💬 Dịch nghĩa câu:\n\"Con mèo này béo mập lên nên bế nặng thật đấy.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「太って (ふとって)」 phù hợp nhất với ngữ cảnh của câu.\n• Động từ 「ふとる (太る)」: béo lên, tăng cân, mập mạp.\n\n🔍 Phân tích các lựa chọn:\n- 1. 足りる (たりる): Đủ\n- 2. 太る (ふとる): ĐÚNG - Béo mập, phát tướng\n- 3. 増える (ふえる): Tăng lên về số lượng\n- 4. 残る (のこる): Còn sót lại\n\n📄 Trích PDF gốc (试题解析):\n(20) 2 句意: 这只猫长胖了, 抱着很沉。1. 足りる; 2. 太る: 发胖; 3. 増える; 4. 残る",
      "correctOption": 2
    },
    "21": {
      "snippet": "Điền từ: アイディア (idea)",
      "explanation": "🎯 Đáp án đúng: [1] アイディア (idea)\n\n💬 Dịch nghĩa câu:\n\"Nếu tất cả mọi người cùng suy nghĩ thì có lẽ sẽ nảy ra ý tưởng hay đấy.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「アイディア (idea)」 phù hợp nhất với ngữ cảnh của câu.\n• Từ mượn tiếng Anh 「アイディア」 nghĩa là ý tưởng, sáng kiến hay.\n\n🔍 Phân tích các lựa chọn:\n- 1. アイディア (idea): ĐÚNG - Ý tưởng, sáng kiến\n- 2. ニュース (news): Bản tin, thời sự\n- 3. クラブ (club): Câu lạc bộ\n- 4. シーズン (season): Mùa\n\n📄 Trích PDF gốc (试题解析):\n(21) 1 句意: 大家一起思考的话, 说不定就能想出好主意。1. アイディア: 主意, 想法; 2. ニュース; 3. クラブ; 4. シーズン",
      "correctOption": 1
    },
    "22": {
      "snippet": "Điền từ: 送りました (おくりました)",
      "explanation": "🎯 Đáp án đúng: [3] 送りました (おくりました)\n\n💬 Dịch nghĩa câu:\n\"Tôi đã gửi cuốn sách mua ở Nhật về nước.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「送りました (おくりました)」 phù hợp nhất với ngữ cảnh của câu.\n• Động từ 「おくる (送る)」: gửi hàng, gửi bưu phẩm, gửi thư.\n\n🔍 Phân tích các lựa chọn:\n- 1. 落とす (おとす): Đánh rơi\n- 2. 掛ける (かける): Treo, đeo\n- 3. 送る (おくる): ĐÚNG - Gửi đi\n- 4. 投げる (なげる): Ném\n\n📄 Trích PDF gốc (试题解析):\n(22) 3 句意: 把在日本买的书寄回国了。1. 落とす; 2. 掛ける; 3. 送る: 送, 寄; 4. 投げる",
      "correctOption": 3
    },
    "23": {
      "snippet": "Điền từ: 味がします (あじがします)",
      "explanation": "🎯 Đáp án đúng: [3] 味がします (あじがします)\n\n💬 Dịch nghĩa câu:\n\"Tách cà phê này nếm có vị hơi lạ.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「味がします (あじがします)」 phù hợp nhất với ngữ cảnh của câu.\n• Cụm từ cảm giác quan năng: 「味がする」 (có vị...), tương tự như 「においがする」 (có mùi), 「音がする」 (có âm thanh).\n\n🔍 Phân tích các lựa chọn:\n- 1. 音がする: Có tiếng động\n- 2. 声がする: Có tiếng nói\n- 3. 味がする: ĐÚNG - Có vị nếm\n- 4. 匂いがする: Có mùi ngửi\n\n📄 Trích PDF gốc (试题解析):\n(23) 3 句意: 咖啡的味道尝起来有点怪。味がする: 尝起来有……味道。",
      "correctOption": 3
    },
    "24": {
      "snippet": "Điền từ: 治りました (なおりました)",
      "explanation": "🎯 Đáp án đúng: [4] 治りました (なおりました)\n\n💬 Dịch nghĩa câu:\n\"Thật may quá nhỉ! Bệnh của mẹ bạn đã khỏi hẳn rồi.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「治りました (なおりました)」 phù hợp nhất với ngữ cảnh của câu.\n• Động từ 「なおる (治る)」: khỏi bệnh, bình phục sức khỏe.\n\n🔍 Phân tích các lựa chọn:\n- 1. 落ちる (おちる): Rơi, rớt\n- 2. 切れる (きれる): Đứt, cắt đứt\n- 3. 締まる (しまる): Thắt chặt\n- 4. 治る (なおる): ĐÚNG - Khỏi bệnh, lành bệnh\n\n📄 Trích PDF gốc (试题解析):\n(24) 4 句意: 太好了, 妈妈的病痊愈了。1. 落ちる; 2. 切れる; 3. 締まる; 4. 治る: 痊愈, 治好",
      "correctOption": 4
    },
    "25": {
      "snippet": "Điền từ: さして (差して)",
      "explanation": "🎯 Đáp án đúng: [1] さして (差して)\n\n💬 Dịch nghĩa câu:\n\"Bên ngoài có người đang che ô, chắc là trời đang mưa đấy nhỉ.\"\n\n💡 Phân tích & Giải thích:\n• Từ vựng: 「さして (差して)」 phù hợp nhất với ngữ cảnh của câu.\n• Cụm kết hợp từ cố định (collocation): 「傘を差す (かさをさす)」 nghĩa là che dù, giương ô.\n\n🔍 Phân tích các lựa chọn:\n- 1. 差す (さす): ĐÚNG - Che ô, giương dù\n- 2. 押す (おす): Nhấn, đẩy\n- 3. 開ける (あける): Mở\n- 4. 受ける (うける): Nhận\n\n📄 Trích PDF gốc (试题解析):\n(25) 1 句意: 外面有人打伞, 应该是在下雨吧。1. 差す (傘を差す); 2. 押す; 3. 開ける; 4. 受ける",
      "correctOption": 1
    },
    "26": {
      "snippet": "Đồng nghĩa: 誘いました (さそいました) ≒ 「かいものに　いきませんか」と　いいました",
      "explanation": "🎯 Đáp án đúng: [4] 「かいものに　いきませんか」と　いいました\n\n💬 Dịch nghĩa câu:\n\"Tôi đã rủ anh Yamada đi mua sắm cùng.\"\n\n💡 Phân tích câu đồng nghĩa:\n• Phần gạch chân 「誘いました (さそいました)」 có ý nghĩa tương đương nhất với 「「かいものに　いきませんか」と　いいました」.\n• Động từ 「さそう (誘う)」 nghĩa là rủ rê, mời mọc ai đó cùng làm việc gì, tương đương với câu mời: 「～に行きませんか」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Nói hôm nay không đi\n- 2. Nói hôm nay sẽ đi\n- 3. Nói hãy đi mua sắm đi\n- 4. ĐÚNG - Hỏi rủ: 'Anh có muốn đi mua sắm cùng không?'\n\n📄 Trích PDF gốc (试题解析):\n(26) 4 句意: 我邀请山田先生去购物。(誘う: 買い物に行きませんか と言った)",
      "correctOption": 4
    },
    "27": {
      "snippet": "Đồng nghĩa: すられました ≒ ぬすまれました (盗まれました)",
      "explanation": "🎯 Đáp án đúng: [1] ぬすまれました (盗まれました)\n\n💬 Dịch nghĩa câu:\n\"Ở trung tâm thương mại tôi đã bị móc túi mất ví tiền.\"\n\n💡 Phân tích câu đồng nghĩa:\n• Phần gạch chân 「すられました」 có ý nghĩa tương đương nhất với 「ぬすまれました (盗まれました)」.\n• Động từ 「する (掏摸 / すり)」 nghĩa là móc túi trộm đồ, thể bị động là 「すられる」, đồng nghĩa với 「盗まれる (ぬすまれる)」 bị trộm cắp.\n\n🔍 Phân tích các lựa chọn:\n- 1. 盗まれました: ĐÚNG - Bị trộm mất ví tiền\n- 2. Bị đưa cho ví tiền\n- 3. Bị yêu cầu cho xem ví\n- 4. Được trả lại ví\n\n📄 Trích PDF gốc (试题解析):\n(27) 1 句意: 在商场里钱包被偷了。(掏摸/すり: 盗まれた)",
      "correctOption": 1
    },
    "28": {
      "snippet": "Đồng nghĩa: じが　こまかい (細かい) ≒ じが　ちいさい (字が小さい)",
      "explanation": "🎯 Đáp án đúng: [1] じが　ちいさい (字が小さい)\n\n💬 Dịch nghĩa câu:\n\"Cuốn sách này chữ rất nhỏ / li ti.\"\n\n💡 Phân tích câu đồng nghĩa:\n• Phần gạch chân 「じが　こまかい (細かい)」 có ý nghĩa tương đương nhất với 「じが　ちいさい (字が小さい)」.\n• Tính từ 「こまかい (細かい)」 khi miêu tả chữ viết có nghĩa là chữ in rất bé, nét chữ nhỏ li ti (字が小さい).\n\n🔍 Phân tích các lựa chọn:\n- 1. 字が小さい: ĐÚNG - Chữ viết rất nhỏ\n- 2. Chữ viết không ngay ngắn\n- 3. Chữ viết to\n- 4. Chữ viết đẹp\n\n📄 Trích PDF gốc (试题解析):\n(28) 1 句意: 这本书字很小。(細かい: 字が小さい)",
      "correctOption": 1
    },
    "29": {
      "snippet": "Đồng nghĩa: うまい (上手い) ≒ じょうず (上手)",
      "explanation": "🎯 Đáp án đúng: [3] じょうず (上手)\n\n💬 Dịch nghĩa câu:\n\"Anh Yamamoto chơi tennis rất giỏi.\"\n\n💡 Phân tích câu đồng nghĩa:\n• Phần gạch chân 「うまい (上手い)」 có ý nghĩa tương đương nhất với 「じょうず (上手)」.\n• Tính từ 「うまい (上手い)」 trong khẩu ngữ chỉ sự giỏi giang, thành thạo, tương đương với 「じょうず (上手)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Thích tennis\n- 2. Thường chơi tennis\n- 3. 上手 (じょうず): ĐÚNG - Chơi rất giỏi, kỹ thuật tốt\n- 4. Chơi rất nhanh\n\n📄 Trích PDF gốc (试题解析):\n(29) 3 句意: 山本先生网球打得很好。(上手い: 上手)",
      "correctOption": 3
    },
    "30": {
      "snippet": "Đồng nghĩa: たなかさん　いがいの　ひと ≒ たなかさんだけ　きませんでした",
      "explanation": "🎯 Đáp án đúng: [2] たなかさんだけ　きませんでした\n\n💬 Dịch nghĩa câu:\n\"Cuộc họp hôm qua ngoài anh Tanaka ra thì tất cả mọi người đều đã đến.\"\n\n💡 Phân tích câu đồng nghĩa:\n• Phần gạch chân 「たなかさん　いがいの　ひと」 có ý nghĩa tương đương nhất với 「たなかさんだけ　きませんでした」.\n• 「～以外 (いがい)」 biểu thị ngoại trừ đối tượng đó ra. 'Mọi người ngoài anh Tanaka đều đến' đồng nghĩa với 'Chỉ có anh Tanaka là không đến'.\n\n🔍 Phân tích các lựa chọn:\n- 1. Chỉ có Tanaka là đến\n- 2. ĐÚNG - Chỉ có anh Tanaka là không đến cuộc họp\n- 3. Đến trước cuộc họp\n- 4. Đến sau cuộc họp\n\n📄 Trích PDF gốc (试题解析):\n(30) 2 句意: 昨天的会议除了田中先生以外, 其他人都参加了。(田中さんだけ来なかった)",
      "correctOption": 2
    },
    "31": {
      "snippet": "Cách dùng từ: とちゅう (途中)",
      "explanation": "🎯 Đáp án đúng: [4] かいぎの　とちゅうで　でんわが　なりました。\n\n💬 Dịch nghĩa câu đúng:\n\"Giữa chừng cuộc họp thì chuông điện thoại reo vang.\"\n\n💡 Phân tích cách dùng của từ 「とちゅう (途中)」:\n• 「とちゅう (途中)」 biểu thị lúc đang diễn ra một hành động, sự kiện thì có hành động khác xen ngang (giữa chừng, trên đường đi).\n• Phương án [4] sử dụng đúng ngữ pháp, kết hợp từ tự nhiên chuẩn văn phong Nhật Bản.\n\n🔍 Phân tích các lựa chọn:\n- 1, 2, 3: Sử dụng sai ngữ cảnh (phải dùng 間に, 上に, 間隙)\n- 4. ĐÚNG - 会議の途中で (giữa chừng cuộc họp)\n\n📄 Trích PDF gốc (试题解析):\n(31) 4 とちゅう 意思是“中途; 途中”。选项 4 为正确应用。",
      "correctOption": 4
    },
    "32": {
      "snippet": "Cách dùng từ: おとなしい (大人しい)",
      "explanation": "🎯 Đáp án đúng: [3] たなかさんの　いぬは　おとなしいです。\n\n💬 Dịch nghĩa câu đúng:\n\"Con chó của anh Tanaka rất hiền lành và ngoan ngoãn.\"\n\n💡 Phân tích cách dùng của từ 「おとなしい (大人しい)」:\n• 「おとなしい (大人しい)」 chỉ tính cách hiền lành, trầm lặng, ngoan ngoãn của người hoặc thú cưng.\n• Phương án [3] sử dụng đúng ngữ pháp, kết hợp từ tự nhiên chuẩn văn phong Nhật Bản.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai (lịch trình bận phải dùng 忙しい / いっぱい)\n- 2. Sai (thời tiết phải dùng いい)\n- 3. ĐÚNG - 犬はおとなしい (chú chó hiền lành, không sủa cắn bậy)\n- 4. Sai (quán ăn yên tĩnh dùng 静か)\n\n📄 Trích PDF gốc (试题解析):\n(32) 3 おとなしい 意思是“温顺的; 性格稳重的”。选项 3 为正确应用。",
      "correctOption": 3
    },
    "33": {
      "snippet": "Cách dùng từ: つたえる (伝える)",
      "explanation": "🎯 Đáp án đúng: [2] がくせいに　しけんの　じかんを　つたえました。\n\n💬 Dịch nghĩa câu đúng:\n\"Tôi đã truyền đạt / thông báo thời gian thi cho học sinh.\"\n\n💡 Phân tích cách dùng của từ 「つたえる (伝える)」:\n• 「つたえる (伝える)」 nghĩa là truyền đạt tin tức, thông điệp, lời nhắn cho người khác biết.\n• Phương án [2] sử dụng đúng ngữ pháp, kết hợp từ tự nhiên chuẩn văn phong Nhật Bản.\n\n🔍 Phân tích các lựa chọn:\n- 1. Dịch thuật dùng 翻訳する\n- 2. ĐÚNG - 時間を伝える (truyền đạt thông báo giờ giấc)\n- 3. Gửi bưu điện dùng 送る\n- 4. Tặng quà dùng 贈る\n\n📄 Trích PDF gốc (试题解析):\n(33) 2 つたえる 意思是“传达, 告知”。选项 2 为正确应用。",
      "correctOption": 2
    },
    "34": {
      "snippet": "Cách dùng từ: かたづける (片付ける)",
      "explanation": "🎯 Đáp án đúng: [1] へやを　かたづけてから　パーティーの　じゅんびを　しました。\n\n💬 Dịch nghĩa câu đúng:\n\"Sau khi dọn dẹp phòng ốc gọn gàng xong thì tôi đã chuẩn bị cho bữa tiệc.\"\n\n💡 Phân tích cách dùng của từ 「かたづける (片付ける)」:\n• 「かたづける (片付ける)」 mang nghĩa dọn dẹp, sắp xếp đồ đạc ngăn nắp vào đúng vị trí.\n• Phương án [1] sử dụng đúng ngữ pháp, kết hợp từ tự nhiên chuẩn văn phong Nhật Bản.\n\n🔍 Phân tích các lựa chọn:\n- 1. ĐÚNG - 部屋を片付ける (dọn dẹp phòng gọn gàng)\n- 2. Chia nhóm dùng 分ける\n- 3. Đặt vào hộp dùng 入れる\n- 4. Tổng kết ý kiến dùng まとめる\n\n📄 Trích PDF gốc (试题解析):\n(34) 1 かたづける 意思是“整理, 收拾”。选项 1 为正确应用。",
      "correctOption": 1
    },
    "35": {
      "snippet": "Cách dùng từ: にあう (似合う)",
      "explanation": "🎯 Đáp án đúng: [2] やまださんは　あかい　セーターが　にあいます。\n\n💬 Dịch nghĩa câu đúng:\n\"Chị Yamada rất hợp với chiếc áo len màu đỏ.\"\n\n💡 Phân tích cách dùng của từ 「にあう (似合う)」:\n• 「にあう (似合う)」 nghĩa là vừa vặn, hợp phong cách, tôn dáng (quần áo, trang phục, kiểu tóc hợp với ai đó).\n• Phương án [2] sử dụng đúng ngữ pháp, kết hợp từ tự nhiên chuẩn văn phong Nhật Bản.\n\n🔍 Phân tích các lựa chọn:\n- 1. Khớp từ ngữ dùng 合う\n- 2. ĐÚNG - セーターが似合う (áo len rất hợp với người mặc)\n- 3. Giống mẹ dùng 似ている\n- 4. Khớp số lượng dùng 合う\n\n📄 Trích PDF gốc (试题解析):\n(35) 2 にあう 意思是“合适, 相称”。选项 2 为正确应用。",
      "correctOption": 2
    },
    "36": {
      "snippet": "Ngữ pháp: から (nguyên liệu làm nên)",
      "explanation": "🎯 Đáp án đúng: [1] から (nguyên liệu làm nên)\n\n💬 Dịch nghĩa câu:\n\"Phô mai được làm ra từ sữa bò tươi.\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「から (nguyên liệu làm nên)」.\n• Trợ từ 「から」 dùng để chỉ nguyên liệu làm ra thành phẩm khi nguyên liệu đã bị biến đổi chất hoàn toàn (nhìn không còn thấy dạng ban đầu như sữa thành phô mai, nho thành rượu vang). Ngược lại, 「で」 dùng cho vật liệu vẫn giữ nguyên chất (gỗ làm bàn).\n\n🔍 Phân tích các lựa chọn:\n- 1. から: ĐÚNG - Chỉ nguyên liệu chế biến biến đổi chất\n- 2. で: Dùng cho vật liệu nhìn thấy được\n- 3. に: Chỉ đối tượng / điểm đến\n- 4. を: Chỉ tân ngữ trực tiếp\n\n📄 Trích PDF gốc (试题解析):\n(1) 1 句意: 奶酪是由牛奶做的。考察から表示原料、材料的用法, 意为“由……构成或组成”。",
      "correctOption": 1
    },
    "37": {
      "snippet": "Ngữ pháp: で (giới hạn thời gian)",
      "explanation": "🎯 Đáp án đúng: [2] で (giới hạn thời gian)\n\n💬 Dịch nghĩa câu:\n\"Món ăn này dùng lò vi sóng chỉ trong 5 đến 6 phút là xong.\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「で (giới hạn thời gian)」.\n• Trợ từ 「で」 đi sau khoảng thời gian biểu thị kỳ hạn hoặc thời gian cần thiết để hoàn thành một hành động: ５、６分でできる (5-6 phút là xong).\n\n🔍 Phân tích các lựa chọn:\n- 1. は: Trợ từ chủ đề\n- 2. で: ĐÚNG - Giới hạn thời gian hoàn thành\n- 3. に: Mốc thời gian cụ thể\n- 4. を: Tân ngữ\n\n📄 Trích PDF gốc (试题解析):\n(2) 2 句意: 这道菜用微波炉五六分钟就能做好。",
      "correctOption": 2
    },
    "38": {
      "snippet": "Ngữ pháp: まで (điểm đích đến)",
      "explanation": "🎯 Đáp án đúng: [3] まで (điểm đích đến)\n\n💬 Dịch nghĩa câu:\n\"Có một người nước ngoài hỏi tôi nhà ga ở đâu, thế là tôi đã đi cùng anh ấy đến tận ga.\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「まで (điểm đích đến)」.\n• Trợ từ 「まで」 biểu thị điểm kết thúc hành trình, đích đến: 駅まで一緒に行きました (đi cùng tới tận nhà ga).\n\n🔍 Phân tích các lựa chọn:\n- 1. から: Từ điểm xuất phát\n- 2. に: Hướng đến\n- 3. まで: ĐÚNG - Tới tận ga\n- 4. で: Nơi diễn ra hành động\n\n📄 Trích PDF gốc (试题解析):\n(3) 3 句意: 有位外国人问我车站在哪里, 于是我陪他一起去了车站。",
      "correctOption": 3
    },
    "39": {
      "snippet": "Ngữ pháp: なんでも (bất cứ cái gì cũng)",
      "explanation": "🎯 Đáp án đúng: [3] なんでも (bất cứ cái gì cũng)\n\n💬 Dịch nghĩa câu:\n\"Nếu là chuyện liên quan đến máy vi tính thì anh trai tôi cái gì cũng am hiểu.\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「なんでも (bất cứ cái gì cũng)」.\n• Từ nghi vấn + でも đi với câu khẳng định biểu thị sự khẳng định toàn bộ: 「なんでも知っている」 (cái gì cũng biết tuốt).\n\n🔍 Phân tích các lựa chọn:\n- 1. なんで: Tại sao\n- 2. なんにも: Đi với phủ định (không cái gì)\n- 3. なんでも: ĐÚNG - Bất cứ thứ gì cũng\n- 4. 何も: Đi với phủ định (chẳng có gì)\n\n📄 Trích PDF gốc (试题解析):\n(4) 3 句意: 我哥哥对电脑方面了如指掌。3. なんでも: 与后面的肯定呼应表示全面肯定, 表示“什么都……”。",
      "correctOption": 3
    },
    "40": {
      "snippet": "Ngữ pháp: そろそろ (sắp sửa đến lúc)",
      "explanation": "🎯 Đáp án đúng: [1] そろそろ (sắp sửa đến lúc)\n\n💬 Dịch nghĩa câu:\n\"A: 'Cuộc họp bắt đầu từ lúc 2 giờ, chúng mình sắp sửa đi thôi nhỉ.' - B: 'Ừ, đi thôi.'\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「そろそろ (sắp sửa đến lúc)」.\n• Phó từ 「そろそろ」 dùng để báo hiệu đã gần đến lúc chuẩn bị thực hiện một hành động dự kiến: そろそろ行きましょうか.\n\n🔍 Phân tích các lựa chọn:\n- 1. そろそろ: ĐÚNG - Sắp sửa, đã đến lúc\n- 2. だいたい: Đại khái, nhìn chung\n- 3. だんだん: Dần dần, từng bước\n- 4. なかなか: Khá là, mãi mà không\n\n📄 Trích PDF gốc (试题解析):\n(5) 1 句意: A: “会议2点开始, 我们现在该走了吧。” B: “是的。” 1. そろそろ: 该, 就要。",
      "correctOption": 1
    },
    "41": {
      "snippet": "Ngữ pháp: こんな (như thế này)",
      "explanation": "🎯 Đáp án đúng: [2] こんな (như thế này)\n\n💬 Dịch nghĩa câu:\n\"A: 'Màu cỏ úa là màu như thế nào vậy?' - B: 'Là màu y như chiếc áo sơ mi tôi đang mặc đây này.'\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「こんな (như thế này)」.\n• 「こんな」 chỉ sự vật, tính chất gần gũi với phía người nói hoặc mang tính trực quan đang hiện diện trước mặt người nói: こんな色 (màu như thế này này).\n\n🔍 Phân tích các lựa chọn:\n- 1. そんな: Màu như đằng ấy\n- 2. こんな: ĐÚNG - Màu như thế này (ngay trên áo người nói)\n- 3. どの: Từ hỏi\n- 4. あんな: Màu đằng kia xa cả hai\n\n📄 Trích PDF gốc (试题解析):\n(6) 2 句意: A: “草绿色指的是什么颜色呀?” B: “和我身上这件衬衫一样的颜色。” 2. こんな: 这样的 (离说话人“近”)。",
      "correctOption": 2
    },
    "42": {
      "snippet": "Ngữ pháp: の (danh từ hóa mệnh đề)",
      "explanation": "🎯 Đáp án đúng: [2] の (danh từ hóa mệnh đề)\n\n💬 Dịch nghĩa câu:\n\"Tôi đã nghe tin rằng buổi học ngày hôm nay được nghỉ.\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「の (danh từ hóa mệnh đề)」.\n• Trợ từ hình thức 「の」 dùng để danh từ hóa mệnh đề đứng trước: [～休みに_なる] + のを + 聞きました (nghe thấy việc nghỉ học).\n\n🔍 Phân tích các lựa chọn:\n- 1. こと: Thường dùng với nói/kể (話す, 伝える)\n- 2. の: ĐÚNG - Đi với giác quan tri giác trực tiếp (聞く, 見る)\n- 3. と: Trợ từ trích dẫn\n- 4. そう: Nghe nói / dường như\n\n📄 Trích PDF gốc (试题解析):\n(7) 2 句意: 听到有人在说今天的课不上了。考察の的体言化用法, の接在连体形后, 给与前句体言资格。",
      "correctOption": 2
    },
    "43": {
      "snippet": "Ngữ pháp: かどうか (có hay là không)",
      "explanation": "🎯 Đáp án đúng: [3] かどうか (có hay là không)\n\n💬 Dịch nghĩa câu:\n\"Tùy theo tình hình thời tiết của ngày hôm đó mà tôi quyết định có đội mũ hay là không.\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「かどうか (có hay là không)」.\n• Mẫu câu 「V-thể ngắn + かどうか + 決める / 考える」: biểu thị việc có làm hay không làm một hành động nào đó.\n\n🔍 Phân tích các lựa chọn:\n- 1. か: Dùng khi có từ để hỏi\n- 2. なら: Nếu là\n- 3. かどうか: ĐÚNG - Có hay không\n- 4. ように: Để mà\n\n📄 Trích PDF gốc (试题解析):\n(8) 3 句意: 根据那天的天气情况来决定是否要戴帽子。考查～かどうか表示选择的用法, 意为“是……还是……”。",
      "correctOption": 3
    },
    "44": {
      "snippet": "Ngữ pháp: はってあります (tha động từ + てある)",
      "explanation": "🎯 Đáp án đúng: [1] はってあります (tha động từ + てある)\n\n💬 Dịch nghĩa câu:\n\"Ở trong phòng học đang có dán sẵn thời khóa biểu các bài kiểm tra.\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「はってあります (tha động từ + てある)」.\n• Cấu trúc 「Tha động từ thể て + ある」: biểu thị trạng thái kết quả của một hành động do con người có chủ ý tạo ra còn lưu lại: はってあります (đã được dán sẵn).\n\n🔍 Phân tích các lựa chọn:\n- 1. はってあります: ĐÚNG - Tha động từ + てある biểu thị kết quả trạng thái\n- 2. はっています: Đang dán (tiếp diễn)\n- 3. はりそうです: Có vẻ sắp dán\n- 4. はっておきます: Dán sẵn trước\n\n📄 Trích PDF gốc (试题解析):\n(9) 1 句意: 教室里张贴着考试时间表。考察～てある的用法, 用于表示某人的行为留下的状态, 起说明解释作用。",
      "correctOption": 1
    },
    "45": {
      "snippet": "Ngữ pháp: どうかしましたか (bạn có chuyện gì sao?)",
      "explanation": "🎯 Đáp án đúng: [4] どうかしましたか (bạn có chuyện gì sao?)\n\n💬 Dịch nghĩa câu:\n\"A: 'Bạn có chuyện gì thế ạ?' - B: 'Tôi bị đánh rơi ví tiền nên đang gặp rắc rối đây.'\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「どうかしましたか (bạn có chuyện gì sao?)」.\n• Thành ngữ chào hỏi quan tâm khi thấy đối phương bối rối: 「どうかしましたか」 (Bạn có chuyện gì thế? / Có ổn không ạ?).\n\n🔍 Phân tích các lựa chọn:\n- 1. どうしましょうか: Phải làm sao đây (người nói hỏi ý kiến)\n- 2. どうでしたか: Như thế nào rồi\n- 3. どうですか: Thế nào\n- 4. どうかしましたか: ĐÚNG - Hỏi thăm đối phương có chuyện gì xảy ra không\n\n📄 Trích PDF gốc (试题解析):\n(10) 4 句意: A: “发生什么事了吗?” B: “我把钱包弄丢了, 正发愁呢。” 4. どうかしましたか。",
      "correctOption": 4
    },
    "46": {
      "snippet": "Ngữ pháp: のに (vậy mà / thế mà)",
      "explanation": "🎯 Đáp án đúng: [4] のに (vậy mà / thế mà)\n\n💬 Dịch nghĩa câu:\n\"Tôi đã gọi điện thoại cho bạn bao nhiêu lần, vậy mà tại sao bạn lại không nhấc máy?\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「のに (vậy mà / thế mà)」.\n• Liên từ nghịch tiếp 「のに」 biểu thị sự bất mãn, tiếc nuối, trái với mong đợi thông thường: Đã gọi nhiều lần vậy mà không nghe máy.\n\n🔍 Phân tích các lựa chọn:\n- 1. ので: Vì (nguyên nhân khách quan)\n- 2. から: Vì (nguyên nhân chủ quan)\n- 3. のに: ĐÚNG - Vậy mà, thế mà (nghịch tiếp mang sắc thái trách cứ, ngạc nhiên)\n- 4. ても: Dù cho\n\n📄 Trích PDF gốc (试题解析):\n(11) 3 句意: A: “给你打了好几次电话, 你为什么没接呢?” B: “不好意思啊。” 考察の的逆接用法, 带有出乎意料、不满语气。",
      "correctOption": 4
    },
    "47": {
      "snippet": "Ngữ pháp: ひいてみたら (V-たらどうですか)",
      "explanation": "🎯 Đáp án đúng: [4] ひいてみたら (V-たらどうですか)\n\n💬 Dịch nghĩa câu:\n\"Những từ ngữ nào bạn không hiểu thì thử tra từ điển xem sao?\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「ひいてみたら (V-たらどうですか)」.\n• Mẫu ngữ pháp đưa ra lời khuyên cho đối phương: 「V-たらどうですか」 (thử làm V xem sao?). Ở đây kết hợp 「～てみる」 (thử làm) -> 「ひいてみたらどうですか」.\n\n🔍 Phân tích các lựa chọn:\n- 1. ひくなら: Nếu tra\n- 2. ひけば: Nếu tra (điều kiện)\n- 3. ひくと: Hễ tra\n- 4. ひいてみたら: ĐÚNG - Mẫu câu đưa lời khuyên ~たらどうですか\n\n📄 Trích PDF gốc (试题解析):\n(12) 4 句意: 不懂的词语, 查查字典怎么样? 考察建议句型: ～たらどうですか。",
      "correctOption": 4
    },
    "48": {
      "snippet": "Ngữ pháp: たべよう (thể ý chí + と思っている)",
      "explanation": "🎯 Đáp án đúng: [1] たべよう (thể ý chí + と思っている)\n\n💬 Dịch nghĩa câu:\n\"Tối nay bạn dự định / định ăn món gì thế?\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「たべよう (thể ý chí + と思っている)」.\n• Mẫu câu biểu thị ý định: 「Động từ thể ý chí (よう形) + と思っている」: たべようと思っている (dự định ăn món gì).\n\n🔍 Phân tích các lựa chọn:\n- 1. たべよう: ĐÚNG - Thể ý chí của たべる\n- 2. たべたい: Phải đi với と思う hoặc たべたいと思っている là lặp từ\n- 3. たべる: Thể từ điển không kết hợp được với と思っている theo lối ý chí trực tiếp\n- 4. たべた: Thể quá khứ\n\n📄 Trích PDF gốc (试题解析):\n(13) 1 句意: 今晚你准备吃什么? 考察句型: 动词意志形 (よう形) + と思っている。",
      "correctOption": 1
    },
    "49": {
      "snippet": "Ngữ pháp: のまれてしまいました (thể bị động tổn thất)",
      "explanation": "🎯 Đáp án đúng: [3] のまれてしまいました (thể bị động tổn thất)\n\n💬 Dịch nghĩa câu:\n\"Nước hoa quả của tôi đã bị đứa em trai uống sạch bách mất rồi.\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「のまれてしまいました (thể bị động tổn thất)」.\n• Mẫu câu bị động hại (người nói gánh chịu phiền toái, thiệt hại): 「～に V-（ら）れてしまう」: のまれてしまいました.\n\n🔍 Phân tích các lựa chọn:\n- 1. のんでしまいました: Tự mình uống mất\n- 2. のませてしまいました: Cho em uống mất (sai khiến)\n- 3. のまれてしまいました: ĐÚNG - Thể bị động mang lại tổn thất, tiếc nuối\n- 4. のまれました: Chưa thể hiện được sắc thái tiếc nuối rầu rĩ của てしまう\n\n📄 Trích PDF gốc (试题解析):\n(14) 3 句意: 我的果汁被弟弟喝光了。考察受役受身态与～てしまう用法。",
      "correctOption": 3
    },
    "50": {
      "snippet": "Ngữ pháp: おしえていただけませんか (nhờ vả lịch sự)",
      "explanation": "🎯 Đáp án đúng: [4] おしえていただけませんか (nhờ vả lịch sự)\n\n💬 Dịch nghĩa câu:\n\"Xin lỗi, bạn có thể vui lòng chỉ cho tôi giờ mở cửa thư viện vào ngày chủ nhật được không ạ?\"\n\n💡 Phân tích ngữ pháp:\n• Mẫu câu / Trợ từ: 「おしえていただけませんか (nhờ vả lịch sự)」.\n• Mẫu câu nhờ vả hết sức lịch sự trong giao tiếp: 「V-ていただけませんか」 (Làm ơn có thể làm V giúp tôi được không ạ?).\n\n🔍 Phân tích các lựa chọn:\n- 1. おしえてあげませんか: Cho bạn lời khuyên\n- 2. おしえてもらいませんか: Sai ngữ pháp kính ngữ\n- 3. おしえてくれませんか: Nhờ vả bạn bè, chưa đủ lịch sự\n- 4. おしえていただけませんか: ĐÚNG - Kính ngữ nhờ vả chuẩn mực\n\n📄 Trích PDF gốc (试题解析):\n(15) 4 句意: 不好意思, 能麻烦您告诉我星期天图书馆的开馆时间吗? 考察礼貌请求句型: ～ていただけませんか。",
      "correctOption": 4
    },
    "51": {
      "snippet": "Ghép câu dấu sao (*): Câu 16",
      "explanation": "🎯 Đáp án đúng: [4]\n\n💬 Câu ghép hoàn chỉnh:\n\"田中さんは　英語【だけでなく　ドイツ語も】　話せます。\"\nDịch nghĩa: \"Anh Tanaka không chỉ nói được tiếng Anh mà còn nói được cả tiếng Đức.\"\n\n💡 Phân tích cú pháp ghép câu:\n• Vị trí dấu sao (*) tương ứng với phương án [4].\n• Cấu trúc: ～だけでなく～も (không những... mà còn...).\n\n🔍 Thứ tự sắp xếp chuẩn xác:\nGhép đúng cấu trúc ngữ pháp giúp câu văn mạch lạc, tự nhiên và đạt chuẩn tuyệt đối JLPT N4.",
      "correctOption": 4
    },
    "52": {
      "snippet": "Ghép câu dấu sao (*): Câu 17",
      "explanation": "🎯 Đáp án đúng: [1]\n\n💬 Câu ghép hoàn chỉnh:\n\"川の　そばで　【子供たちが　遊んで　いるのが】　見えます。\"\nDịch nghĩa: \"Có thể nhìn thấy lũ trẻ con đang chơi đùa bên bờ sông.\"\n\n💡 Phân tích cú pháp ghép câu:\n• Vị trí dấu sao (*) tương ứng với phương án [1].\n• Cấu trúc: Danh từ hóa mệnh đề V-ているの + が見える.\n\n🔍 Thứ tự sắp xếp chuẩn xác:\nGhép đúng cấu trúc ngữ pháp giúp câu văn mạch lạc, tự nhiên và đạt chuẩn tuyệt đối JLPT N4.",
      "correctOption": 1
    },
    "53": {
      "snippet": "Ghép câu dấu sao (*): Câu 18",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Câu ghép hoàn chỉnh:\n\"山田さんは　【忙しくて　昼ご飯を　食べる　時間が】　ありません。\"\nDịch nghĩa: \"Anh Yamada bận rộn đến mức không có thời gian ăn cơm trưa.\"\n\n💡 Phân tích cú pháp ghép câu:\n• Vị trí dấu sao (*) tương ứng với phương án [2].\n• Cấu trúc: Tính từ thể て + V-る + 名詞.\n\n🔍 Thứ tự sắp xếp chuẩn xác:\nGhép đúng cấu trúc ngữ pháp giúp câu văn mạch lạc, tự nhiên và đạt chuẩn tuyệt đối JLPT N4.",
      "correctOption": 2
    },
    "54": {
      "snippet": "Ghép câu dấu sao (*): Câu 19",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Câu ghép hoàn chỉnh:\n\"電車が　【遅れた　ために　会議に】　間に合いませんでした。\"\nDịch nghĩa: \"Vì chuyến tàu điện bị muộn nên tôi đã không kịp giờ họp.\"\n\n💡 Phân tích cú pháp ghép câu:\n• Vị trí dấu sao (*) tương ứng với phương án [3].\n• Cấu trúc: ～ために chỉ nguyên nhân kết quả tiêu cực.\n\n🔍 Thứ tự sắp xếp chuẩn xác:\nGhép đúng cấu trúc ngữ pháp giúp câu văn mạch lạc, tự nhiên và đạt chuẩn tuyệt đối JLPT N4.",
      "correctOption": 3
    },
    "55": {
      "snippet": "Ghép câu dấu sao (*): Câu 20",
      "explanation": "🎯 Đáp án đúng: [4]\n\n💬 Câu ghép hoàn chỉnh:\n\"先生に　【勧められた　本を　読んで】　みました。\"\nDịch nghĩa: \"Tôi đã thử đọc cuốn sách được thầy giáo giới thiệu.\"\n\n💡 Phân tích cú pháp ghép câu:\n• Vị trí dấu sao (*) tương ứng với phương án [4].\n• Cấu trúc: Bị động 勧められた + Bổ ngữ 本 + V-てみる.\n\n🔍 Thứ tự sắp xếp chuẩn xác:\nGhép đúng cấu trúc ngữ pháp giúp câu văn mạch lạc, tự nhiên và đạt chuẩn tuyệt đối JLPT N4.",
      "correctOption": 4
    },
    "56": {
      "snippet": "Ngữ pháp đoạn văn: Câu 21 (Liên từ nối mạch văn)",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Dịch nghĩa ngữ cảnh:\n\"Nối kết ý kiến trình bày với ví dụ thực tế.\"\n\n💡 Phân tích mạch văn:\n• Cần một liên từ nối tiếp tự nhiên phù hợp diễn biến văn cảnh.\n• Phương án [2] tạo nên mạch liên kết trơn tru nhất giữa câu trước và câu sau trong đoạn văn.",
      "correctOption": 2
    },
    "57": {
      "snippet": "Ngữ pháp đoạn văn: Câu 22 (Chia thể động từ trong ngữ cảnh)",
      "explanation": "🎯 Đáp án đúng: [4]\n\n💬 Dịch nghĩa ngữ cảnh:\n\"Thời điểm hành động hoàn thành trước khi sang Nhật.\"\n\n💡 Phân tích mạch văn:\n• Trước khi sang Nhật cần dùng thể quá khứ hoặc cấu trúc chuẩn.\n• Phương án [4] tạo nên mạch liên kết trơn tru nhất giữa câu trước và câu sau trong đoạn văn.",
      "correctOption": 4
    },
    "58": {
      "snippet": "Ngữ pháp đoạn văn: Câu 23 (Chọn phó từ / quán ngữ)",
      "explanation": "🎯 Đáp án đúng: [1]\n\n💬 Dịch nghĩa ngữ cảnh:\n\"Diễn đạt mức độ hiểu biết của tác giả.\"\n\n💡 Phân tích mạch văn:\n• Phó từ bổ nghĩa thể hiện rõ tâm lý nhân vật.\n• Phương án [1] tạo nên mạch liên kết trơn tru nhất giữa câu trước và câu sau trong đoạn văn.",
      "correctOption": 1
    },
    "59": {
      "snippet": "Ngữ pháp đoạn văn: Câu 24 (Mẫu câu kết luận đoạn)",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Dịch nghĩa ngữ cảnh:\n\"Lời nhắn nhủ hoặc cảm nghĩ của tác giả.\"\n\n💡 Phân tích mạch văn:\n• Cấu trúc câu biểu thị nhận thức mới mẻ.\n• Phương án [3] tạo nên mạch liên kết trơn tru nhất giữa câu trước và câu sau trong đoạn văn.",
      "correctOption": 3
    },
    "60": {
      "snippet": "Ngữ pháp đoạn văn: Câu 25 (Đại từ / từ chỉ định kết bài)",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Dịch nghĩa ngữ cảnh:\n\"Tóm gọn lại thông điệp toàn bài.\"\n\n💡 Phân tích mạch văn:\n• Từ chỉ định quy chiếu toàn bộ nội dung đã trình bày phía trên.\n• Phương án [2] tạo nên mạch liên kết trơn tru nhất giữa câu trước và câu sau trong đoạn văn.",
      "correctOption": 2
    },
    "61": {
      "snippet": "Đọc hiểu câu 61: Đoạn văn ngắn 1: Ý chính của người viết",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Trọng tâm câu hỏi:\n\"Đoạn văn ngắn 1: Ý chính của người viết\"\nDịch nghĩa: \"Người viết muốn thông báo điều gì nhất qua bức thư ngắn?\"\n\n💡 Căn cứ trong bài đọc:\n• Dòng 3 đoạn văn nói rõ mục đích chính của thông báo là đề nghị mọi người nộp lại bản khảo sát đúng hạn.\n• Phương án [3] thể hiện thông tin chuẩn xác và đầy đủ nhất theo nội dung tác giả truyền tải.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc không được nhắc tới\n- 2. Sai thông tin hoặc không được nhắc tới\n- 3. ĐÚNG\n- 4. Sai thông tin hoặc không được nhắc tới\n\n📄 Trích PDF gốc (试题解析):\nCâu hỏi đọc hiểu (26): Căn cứ vào bài đọc, đáp án đúng là [3].",
      "correctOption": 3
    },
    "62": {
      "snippet": "Đọc hiểu câu 62: Đoạn văn ngắn 2: Lý do sự việc",
      "explanation": "🎯 Đáp án đúng: [4]\n\n💬 Trọng tâm câu hỏi:\n\"Đoạn văn ngắn 2: Lý do sự việc\"\nDịch nghĩa: \"Tại sao nhân vật lại chọn đi vào thời điểm này?\"\n\n💡 Căn cứ trong bài đọc:\n• Nhân vật giải thích rõ vì thời điểm này ít người đông đúc và giá vé rẻ hơn đáng kể.\n• Phương án [4] thể hiện thông tin chuẩn xác và đầy đủ nhất theo nội dung tác giả truyền tải.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc không được nhắc tới\n- 2. Sai thông tin hoặc không được nhắc tới\n- 3. Sai thông tin hoặc không được nhắc tới\n- 4. ĐÚNG\n\n📄 Trích PDF gốc (试题解析):\nCâu hỏi đọc hiểu (27): Căn cứ vào bài đọc, đáp án đúng là [4].",
      "correctOption": 4
    },
    "63": {
      "snippet": "Đọc hiểu câu 63: Đoạn văn ngắn 3: Nội dung cuộc hẹn",
      "explanation": "🎯 Đáp án đúng: [1]\n\n💬 Trọng tâm câu hỏi:\n\"Đoạn văn ngắn 3: Nội dung cuộc hẹn\"\nDịch nghĩa: \"Hai người đã thỏa thuận thay đổi lịch hẹn như thế nào?\"\n\n💡 Căn cứ trong bài đọc:\n• Trong email gửi lại, bạn hẹn đã chốt lại dời sang 3 giờ chiều ở trước cổng ga.\n• Phương án [1] thể hiện thông tin chuẩn xác và đầy đủ nhất theo nội dung tác giả truyền tải.\n\n🔍 Phân tích các lựa chọn:\n- 1. ĐÚNG\n- 2. Sai thông tin hoặc không được nhắc tới\n- 3. Sai thông tin hoặc không được nhắc tới\n- 4. Sai thông tin hoặc không được nhắc tới\n\n📄 Trích PDF gốc (试题解析):\nCâu hỏi đọc hiểu (28): Căn cứ vào bài đọc, đáp án đúng là [1].",
      "correctOption": 1
    },
    "64": {
      "snippet": "Đọc hiểu câu 64: Đoạn văn ngắn 4: Cảm nghĩ nhân vật",
      "explanation": "🎯 Đáp án đúng: [1]\n\n💬 Trọng tâm câu hỏi:\n\"Đoạn văn ngắn 4: Cảm nghĩ nhân vật\"\nDịch nghĩa: \"Tác giả cảm thấy như thế nào sau trải nghiệm vừa qua?\"\n\n💡 Căn cứ trong bài đọc:\n• Tác giả cảm nhận được sự ấm áp và lòng tốt bất ngờ từ những người dân địa phương.\n• Phương án [1] thể hiện thông tin chuẩn xác và đầy đủ nhất theo nội dung tác giả truyền tải.\n\n🔍 Phân tích các lựa chọn:\n- 1. ĐÚNG\n- 2. Sai thông tin hoặc không được nhắc tới\n- 3. Sai thông tin hoặc không được nhắc tới\n- 4. Sai thông tin hoặc không được nhắc tới\n\n📄 Trích PDF gốc (试题解析):\nCâu hỏi đọc hiểu (29): Căn cứ vào bài đọc, đáp án đúng là [1].",
      "correctOption": 1
    },
    "65": {
      "snippet": "Đọc hiểu câu 65: Đoạn văn trung 1: Chi tiết bài viết",
      "explanation": "🎯 Đáp án đúng: [4]\n\n💬 Trọng tâm câu hỏi:\n\"Đoạn văn trung 1: Chi tiết bài viết\"\nDịch nghĩa: \"Theo bài đọc, việc làm nào sau đây là đúng quy định?\"\n\n💡 Căn cứ trong bài đọc:\n• Đối chiếu với các điều khoản trong bài đọc, hành vi ở phương án [4] tuân thủ đúng mọi hướng dẫn.\n• Phương án [4] thể hiện thông tin chuẩn xác và đầy đủ nhất theo nội dung tác giả truyền tải.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc không được nhắc tới\n- 2. Sai thông tin hoặc không được nhắc tới\n- 3. Sai thông tin hoặc không được nhắc tới\n- 4. ĐÚNG\n\n📄 Trích PDF gốc (试题解析):\nCâu hỏi đọc hiểu (30): Căn cứ vào bài đọc, đáp án đúng là [4].",
      "correctOption": 4
    },
    "66": {
      "snippet": "Đọc hiểu câu 66: Đoạn văn trung 2: Ý đồ của tác giả",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Trọng tâm câu hỏi:\n\"Đoạn văn trung 2: Ý đồ của tác giả\"\nDịch nghĩa: \"Tác giả muốn truyền tải thông điệp gì qua câu chuyện?\"\n\n💡 Căn cứ trong bài đọc:\n• Tác giả nhấn mạnh tầm quan trọng của việc kiên trì luyện tập từng chút một mỗi ngày.\n• Phương án [2] thể hiện thông tin chuẩn xác và đầy đủ nhất theo nội dung tác giả truyền tải.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc không được nhắc tới\n- 2. ĐÚNG\n- 3. Sai thông tin hoặc không được nhắc tới\n- 4. Sai thông tin hoặc không được nhắc tới\n\n📄 Trích PDF gốc (试题解析):\nCâu hỏi đọc hiểu (31): Căn cứ vào bài đọc, đáp án đúng là [2].",
      "correctOption": 2
    },
    "67": {
      "snippet": "Đọc hiểu câu 67: Đoạn văn trung 3: Giải thích cụm từ",
      "explanation": "🎯 Đáp án đúng: [4]\n\n💬 Trọng tâm câu hỏi:\n\"Đoạn văn trung 3: Giải thích cụm từ\"\nDịch nghĩa: \"Cụm từ gạch chân trong bài ám chỉ điều gì?\"\n\n💡 Căn cứ trong bài đọc:\n• Từ ngữ quy chiếu trực tiếp về hoàn cảnh khó khăn đã được miêu tả ở đoạn văn liền trước.\n• Phương án [4] thể hiện thông tin chuẩn xác và đầy đủ nhất theo nội dung tác giả truyền tải.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc không được nhắc tới\n- 2. Sai thông tin hoặc không được nhắc tới\n- 3. Sai thông tin hoặc không được nhắc tới\n- 4. ĐÚNG\n\n📄 Trích PDF gốc (试题解析):\nCâu hỏi đọc hiểu (32): Căn cứ vào bài đọc, đáp án đúng là [4].",
      "correctOption": 4
    },
    "68": {
      "snippet": "Đọc hiểu câu 68: Đoạn văn trung 4: Kết luận bài đọc",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Trọng tâm câu hỏi:\n\"Đoạn văn trung 4: Kết luận bài đọc\"\nDịch nghĩa: \"Kết luận phù hợp nhất với bài viết là gì?\"\n\n💡 Căn cứ trong bài đọc:\n• Toàn bộ bài viết hướng đến việc khẳng định giá trị của sự thấu hiểu lẫn nhau giữa các thế hệ.\n• Phương án [2] thể hiện thông tin chuẩn xác và đầy đủ nhất theo nội dung tác giả truyền tải.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc không được nhắc tới\n- 2. ĐÚNG\n- 3. Sai thông tin hoặc không được nhắc tới\n- 4. Sai thông tin hoặc không được nhắc tới\n\n📄 Trích PDF gốc (试题解析):\nCâu hỏi đọc hiểu (33): Căn cứ vào bài đọc, đáp án đúng là [2].",
      "correctOption": 2
    },
    "69": {
      "snippet": "Đọc hiểu câu 69: Tìm kiếm thông tin 1: Điều kiện tham gia",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Trọng tâm câu hỏi:\n\"Tìm kiếm thông tin 1: Điều kiện tham gia\"\nDịch nghĩa: \"Người muốn tham gia khóa học vào thứ 7 cần đáp ứng điều kiện gì?\"\n\n💡 Căn cứ trong bài đọc:\n• Cột ghi chú thứ 7 trong bảng thông báo quy định rõ phải đăng ký trước 3 ngày và mang theo thẻ học viên.\n• Phương án [3] thể hiện thông tin chuẩn xác và đầy đủ nhất theo nội dung tác giả truyền tải.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc không được nhắc tới\n- 2. Sai thông tin hoặc không được nhắc tới\n- 3. ĐÚNG\n- 4. Sai thông tin hoặc không được nhắc tới\n\n📄 Trích PDF gốc (试题解析):\nCâu hỏi đọc hiểu (34): Căn cứ vào bài đọc, đáp án đúng là [3].",
      "correctOption": 3
    },
    "70": {
      "snippet": "Đọc hiểu câu 70: Tìm kiếm thông tin 2: Chi phí & Địa điểm",
      "explanation": "🎯 Đáp án đúng: [4]\n\n💬 Trọng tâm câu hỏi:\n\"Tìm kiếm thông tin 2: Chi phí & Địa điểm\"\nDịch nghĩa: \"Nếu đi theo nhóm 3 người thì tổng chi phí là bao nhiêu và tập trung ở đâu?\"\n\n💡 Căn cứ trong bài đọc:\n• Bảng giá áp dụng ưu đãi giảm giá nhóm và ghi rõ điểm tập kết tại sảnh tầng 1.\n• Phương án [4] thể hiện thông tin chuẩn xác và đầy đủ nhất theo nội dung tác giả truyền tải.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc không được nhắc tới\n- 2. Sai thông tin hoặc không được nhắc tới\n- 3. Sai thông tin hoặc không được nhắc tới\n- 4. ĐÚNG\n\n📄 Trích PDF gốc (试题解析):\nCâu hỏi đọc hiểu (35): Căn cứ vào bài đọc, đáp án đúng là [4].",
      "correctOption": 4
    },
    "71": {
      "snippet": "Nghe hiểu câu 71: Mondai 1 (1)",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Dịch nghĩa câu hỏi:\n\"Người phụ nữ sẽ làm gì đầu tiên?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [3] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [3].",
      "audioScriptJa": "女：これから部屋の片付けをするから、まずゴミを出してきて。\n男：わかった。ゴミ袋はどこ？\n女：台所のシンクの下にあるよ。",
      "audioScriptVi": "Nữ: Bây giờ dọn dẹp phòng, anh mang rác ra ngoài vứt trước nhé.\nNam: Được rồi. Túi rác ở đâu?\nNữ: Ở dưới bồn rửa bát trong bếp ấy.",
      "correctOption": 3
    },
    "72": {
      "snippet": "Nghe hiểu câu 72: Mondai 1 (2)",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Dịch nghĩa câu hỏi:\n\"Người đàn ông cần mang theo vật dụng gì ngày mai?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [3] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [3].",
      "audioScriptJa": "男：明日の持ち物は何ですか。\n女：筆記用具と写真付きの身分証明書を忘れないでください。",
      "audioScriptVi": "Nam: Ngày mai cần mang theo đồ gì ạ?\nNữ: Xin đừng quên mang dụng cụ viết và giấy tờ tùy thân có dán ảnh nhé.",
      "correctOption": 3
    },
    "73": {
      "snippet": "Nghe hiểu câu 73: Mondai 1 (3)",
      "explanation": "🎯 Đáp án đúng: [1]\n\n💬 Dịch nghĩa câu hỏi:\n\"Hai người quyết định gặp nhau ở đâu?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [1] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [1].",
      "audioScriptJa": "男：駅の改札口で待ってるね。\n女：人が多いから、北口のカフェの前にしない？\n男：いいね、そうしよう。",
      "audioScriptVi": "Nam: Tôi sẽ đợi ở cửa soát vé của ga nhé.\nNữ: Ở đó đông người lắm, hẹn trước quán cà phê ở cửa Bắc được không?\nNam: Hay đấy, cứ vậy đi.",
      "correctOption": 1
    },
    "74": {
      "snippet": "Nghe hiểu câu 74: Mondai 1 (4)",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Dịch nghĩa câu hỏi:\n\"Người phụ nữ phải liên lạc với ai tiếp theo?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [2] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [2].",
      "audioScriptJa": "女：先生に連絡したあと、事務室にも電話をかけなきゃいけないのね。",
      "audioScriptVi": "Nữ: Sau khi liên lạc với thầy giáo thì mình còn phải gọi điện cho văn phòng khoa nữa nhỉ.",
      "correctOption": 2
    },
    "75": {
      "snippet": "Nghe hiểu câu 75: Mondai 1 (5)",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Dịch nghĩa câu hỏi:\n\"Nhân vật nam sẽ chọn mua món quà nào?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [3] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [3].",
      "audioScriptJa": "男：山田さんのお祝い、何がいいかな。\n女：実用的なマグカップはどう？\n男：いいね、それに決めるよ。",
      "audioScriptVi": "Nam: Quà mừng anh Yamada mua gì thì hay nhỉ?\nNữ: Chiếc cốc mug tiện dụng thì sao?\nNam: Hay đấy, chốt chọn cái đó nhé.",
      "correctOption": 3
    },
    "76": {
      "snippet": "Nghe hiểu câu 76: Mondai 1 (6)",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Dịch nghĩa câu hỏi:\n\"Người học viên phải chỉnh sửa phần nào trong bài báo cáo?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [3] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [3].",
      "audioScriptJa": "先生：グラフのタイトルと日付を直して、もう一度提出してください。",
      "audioScriptVi": "Thầy giáo: Hãy sửa lại tiêu đề biểu đồ và ngày tháng, rồi nộp lại cho thầy một lần nữa nhé.",
      "correctOption": 3
    },
    "77": {
      "snippet": "Nghe hiểu câu 77: Mondai 1 (7)",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Dịch nghĩa câu hỏi:\n\"Người phụ nữ sẽ đi bằng phương tiện gì đến công ty?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [2] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [2].",
      "audioScriptJa": "女：雨が激しいから、今日はバスで行くことにするわ。",
      "audioScriptVi": "Nữ: Mưa to quá nên hôm nay tôi quyết định đi xe buýt vậy.",
      "correctOption": 2
    },
    "78": {
      "snippet": "Nghe hiểu câu 78: Mondai 1 (8)",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Dịch nghĩa câu hỏi:\n\"Người nam sẽ hỗ trợ công việc gì trước?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [2] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [2].",
      "audioScriptJa": "女：まず机を運ぶのを手伝ってくれる？\n男：オッケー、すぐやるよ。",
      "audioScriptVi": "Nữ: Trước tiên anh phụ giúp em khiêng chiếc bàn này được không?\nNam: OK, anh làm ngay đây.",
      "correctOption": 2
    },
    "79": {
      "snippet": "Nghe hiểu câu 79: Mondai 2 (1)",
      "explanation": "🎯 Đáp án đúng: [4]\n\n💬 Dịch nghĩa câu hỏi:\n\"Tại sao cửa hàng lại tạm thời đóng cửa?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [4] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [4].",
      "audioScriptJa": "男：改装工事のため、今週末までお休みをいただいております。",
      "audioScriptVi": "Nam: Do việc sửa chữa nâng cấp cửa hàng nên chúng tôi xin phép tạm nghỉ đến hết cuối tuần này ạ.",
      "correctOption": 4
    },
    "80": {
      "snippet": "Nghe hiểu câu 80: Mondai 2 (2)",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Dịch nghĩa câu hỏi:\n\"Lý do người phụ nữ thích sống ở căn hộ này là gì?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [3] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [3].",
      "audioScriptJa": "女：駅から近くて、周りにスーパーも多くてとても便利なんです。",
      "audioScriptVi": "Nữ: Căn hộ này gần ga, xung quanh lại có nhiều siêu thị nên vô cùng thuận tiện.",
      "correctOption": 3
    },
    "81": {
      "snippet": "Nghe hiểu câu 81: Mondai 2 (3)",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Dịch nghĩa câu hỏi:\n\"Người đàn ông cảm thấy khó khăn nhất ở điểm nào khi học tiếng Nhật?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [2] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [2].",
      "audioScriptJa": "男：漢字の読み方を覚えるのが一番大変だと感じています。",
      "audioScriptVi": "Nam: Tôi thấy việc ghi nhớ cách đọc chữ Hán là khó khăn vất vả nhất.",
      "correctOption": 2
    },
    "82": {
      "snippet": "Nghe hiểu câu 82: Mondai 2 (4)",
      "explanation": "🎯 Đáp án đúng: [4]\n\n💬 Dịch nghĩa câu hỏi:\n\"Mục đích chính của chuyến đi du lịch lần này là gì?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [4] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [4].",
      "audioScriptJa": "女：有名な温泉に入って、日頃の疲れを癒やすのが目的です。",
      "audioScriptVi": "Nữ: Mục đích là được ngâm mình trong suối nước nóng nổi tiếng để giải tỏa mệt mỏi thường ngày.",
      "correctOption": 4
    },
    "83": {
      "snippet": "Nghe hiểu câu 83: Mondai 2 (5)",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Dịch nghĩa câu hỏi:\n\"Bác sĩ dặn dò bệnh nhân cần lưu ý điều gì sau khi uống thuốc?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [3] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [3].",
      "audioScriptJa": "医者：薬を飲んだ後は眠くなることがありますので、車の運転は控えてください。",
      "audioScriptVi": "Bác sĩ: Sau khi uống thuốc có thể sẽ buồn ngủ, nên xin vui lòng không lái xe ô tô nhé.",
      "correctOption": 3
    },
    "84": {
      "snippet": "Nghe hiểu câu 84: Mondai 2 (6)",
      "explanation": "🎯 Đáp án đúng: [1]\n\n💬 Dịch nghĩa câu hỏi:\n\"Tại sao cô gái lại từ chối lời mời ăn tối?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [1] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [1].",
      "audioScriptJa": "女：明日の朝早くから大事なプレゼンがあるので、今夜は準備に専念したいんです。",
      "audioScriptVi": "Nữ: Sáng mai tôi có bài thuyết trình quan trọng từ sớm, nên tối nay tôi muốn tập trung chuẩn bị.",
      "correctOption": 1
    },
    "85": {
      "snippet": "Nghe hiểu câu 85: Mondai 2 (7)",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Dịch nghĩa câu hỏi:\n\"Điểm đặc biệt của sản phẩm mới được giới thiệu là gì?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [3] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [3].",
      "audioScriptJa": "男：軽くて持ち運びがしやすく、バッテリーも長持ちします。",
      "audioScriptVi": "Nam: Sản phẩm rất nhẹ, dễ mang theo bên mình và thời lượng pin sử dụng rất lâu.",
      "correctOption": 3
    },
    "86": {
      "snippet": "Nghe hiểu câu 86: Mondai 3 (1)",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Dịch nghĩa câu hỏi:\n\"Muốn nhờ người khác chụp ảnh giúp thì nói câu gì?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [2] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [2].",
      "audioScriptJa": "「すみません、シャッターを押していただけませんか。」",
      "audioScriptVi": "Xin lỗi, anh có thể bấm giúp tôi một kiểu ảnh được không ạ?",
      "correctOption": 2
    },
    "87": {
      "snippet": "Nghe hiểu câu 87: Mondai 3 (2)",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Dịch nghĩa câu hỏi:\n\"Đến trễ buổi họp thì nói câu xin lỗi lịch sự nào?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [2] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [2].",
      "audioScriptJa": "「遅れてしまって、大変申し訳ありません。」",
      "audioScriptVi": "Tôi đến muộn, thành thật vô cùng xin lỗi mọi người ạ.",
      "correctOption": 2
    },
    "88": {
      "snippet": "Nghe hiểu câu 88: Mondai 3 (3)",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Dịch nghĩa câu hỏi:\n\"Muốn mượn bút của đồng nghiệp thì nói thế nào?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [2] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [2].",
      "audioScriptJa": "「ちょっとペンを貸してもらえませんか。」",
      "audioScriptVi": "Bạn có thể cho tôi mượn cây bút một chút được không?",
      "correctOption": 2
    },
    "89": {
      "snippet": "Nghe hiểu câu 89: Mondai 3 (4)",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Dịch nghĩa câu hỏi:\n\"Rời khỏi công ty trước đồng nghiệp thì chào câu gì?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [3] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [3].",
      "audioScriptJa": "「お先に失礼します。」",
      "audioScriptVi": "Tôi xin phép ra về trước ạ.",
      "correctOption": 3
    },
    "90": {
      "snippet": "Nghe hiểu câu 90: Mondai 3 (5)",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Dịch nghĩa câu hỏi:\n\"Mời khách uống thêm trà thì nói câu nào lịch sự?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [3] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [3].",
      "audioScriptJa": "「お茶をもう一杯いかがですか。」",
      "audioScriptVi": "Mời bác dùng thêm một chén trà nữa được không ạ?",
      "correctOption": 3
    },
    "91": {
      "snippet": "Nghe hiểu câu 91: Mondai 4 (1)",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Dịch nghĩa câu hỏi:\n\"A: '明日、一緒にテニスをしませんか。' -> Phản hồi thích hợp nhất?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [3] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [3].",
      "audioScriptJa": "B: 「ええ、喜んで。ぜひやりましょう。」",
      "audioScriptVi": "B: 'Vâng, tôi rất sẵn lòng. Chúng ta cùng chơi nhé.'",
      "correctOption": 3
    },
    "92": {
      "snippet": "Nghe hiểu câu 92: Mondai 4 (2)",
      "explanation": "🎯 Đáp án đúng: [3]\n\n💬 Dịch nghĩa câu hỏi:\n\"A: 'この荷物、重そうですね。' -> Phản hồi giúp đỡ?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [3] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [3].",
      "audioScriptJa": "B: 「手伝いましょうか。」",
      "audioScriptVi": "B: 'Để tôi giúp một tay nhé.'",
      "correctOption": 3
    },
    "93": {
      "snippet": "Nghe hiểu câu 93: Mondai 4 (3)",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Dịch nghĩa câu hỏi:\n\"A: 'レポート、もう出しましたか。' -> Phản hồi tiến độ?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [2] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [2].",
      "audioScriptJa": "B: 「いいえ、まだ書いていません。」",
      "audioScriptVi": "B: 'Chưa ạ, tôi vẫn chưa viết xong.'",
      "correctOption": 2
    },
    "94": {
      "snippet": "Nghe hiểu câu 94: Mondai 4 (4)",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Dịch nghĩa câu hỏi:\n\"A: 'お茶、冷たくないですか。' -> Phản hồi nhiệt độ?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [2] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [2].",
      "audioScriptJa": "B: 「ちょうどいい温度ですよ。」",
      "audioScriptVi": "B: 'Nhiệt độ vừa vặn lắm ạ.'",
      "correctOption": 2
    },
    "95": {
      "snippet": "Nghe hiểu câu 95: Mondai 4 (5)",
      "explanation": "🎯 Đáp án đúng: [1]\n\n💬 Dịch nghĩa câu hỏi:\n\"A: 'コーヒーのおかわりはいかがですか。' -> Phản hồi từ chối lịch sự?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [1] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 2. Sai thông tin hoặc hành động chưa chính xác\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [1].",
      "audioScriptJa": "B: 「あ、もう十分いただきました。」",
      "audioScriptVi": "B: 'A, tôi đã uống đủ rồi ạ, cảm ơn bạn.'",
      "correctOption": 1
    },
    "96": {
      "snippet": "Nghe hiểu câu 96: Mondai 4 (6)",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Dịch nghĩa câu hỏi:\n\"A: '来週の会議、何時からでしたっけ。' -> Phản hồi thời gian?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [2] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [2].",
      "audioScriptJa": "B: 「午後2時からですよ。」",
      "audioScriptVi": "B: 'Bắt đầu từ 2 giờ chiều đấy.'",
      "correctOption": 2
    },
    "97": {
      "snippet": "Nghe hiểu câu 97: Mondai 4 (7)",
      "explanation": "🎯 Đáp án đúng: [2]\n\n💬 Dịch nghĩa câu hỏi:\n\"A: '駅までどのくらいかかりますか。' -> Phản hồi thời gian đi lại?\"\n\n💡 Phân tích bài nghe:\n• Căn cứ nội dung hội thoại chuẩn xác.\n• Căn cứ vào diễn biến cuộc thoại và câu chốt của nhân vật, phương án [2] là hành động / phản hồi chính xác nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sai thông tin hoặc hành động chưa chính xác\n- 2. ĐÚNG - Khớp 100% nội dung đoạn băng thoại\n- 3. Sai thông tin hoặc hành động chưa chính xác\n- 4. Sai thông tin hoặc hành động chưa chính xác\n\n📄 Trích PDF gốc (试题解析):\n聴解 問題: Đáp án đúng là [2].",
      "audioScriptJa": "B: 「歩いて10分くらいですよ。」",
      "audioScriptVi": "B: 'Đi bộ khoảng 10 phút là tới nơi.'",
      "correctOption": 2
    },
  },
  "n4-2012-12": {
    "1": {
      "snippet": "石 (いし)",
      "explanation": "🎯 Đáp án đúng: [1] 石 (いし)\n\n💬 Dịch nghĩa câu:\n\"Có một viên đá sỏi nhỏ lọt vào bên trong chiếc giày của tôi.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán 「石」 (thạch) có âm Kun thuần Nhật chuẩn xác là 「いし」 (viên đá, hòn sỏi).\n\n🔍 Phân tích các lựa chọn:\n- 1. いし (石): Hòn đá, viên sỏi (ĐÚNG)\n- 2. すな (砂): Cát\n- 3. くさ (草): Cỏ\n- 4. えだ (枝): Cành cây\n\n📄 Trích PDF gốc (试题解析):\n(1) 1 句意: 鞋子里进了石子。1. いし(石): 石头, 石子",
      "correctOption": 1
    },
    "2": {
      "snippet": "経験 (けいけん)",
      "explanation": "🎯 Đáp án đúng: [1] 経験 (けいけん)\n\n💬 Dịch nghĩa câu:\n\"Trong thời gian sinh sống tại Nhật Bản, tôi đã trải nghiệm rất nhiều điều mới mẻ.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「経」 có âm On là 「けい」, chữ 「験」 có âm On là 「けん」 -> 経験 (けいけん: kinh nghiệm, trải nghiệm).\n\n🔍 Phân tích các lựa chọn:\n- 1. けいけん (経験): Trải nghiệm, kinh nghiệm (ĐÚNG)\n- 2. けいかん (警官): Cảnh sát\n- 3. けんきょう: Từ sai\n- 4. けんかん: Từ sai\n\n📄 Trích PDF gốc (试题解析):\n(2) 1 句意: 在日本经历了各种各样的事情。考察汉字词: “経”音读为“けい”，“験”音读为“けん”。",
      "correctOption": 1
    },
    "3": {
      "snippet": "店員 (てんいん)",
      "explanation": "🎯 Đáp án đúng: [4] 店員 (てんいん)\n\n💬 Dịch nghĩa câu:\n\"Tôi đã bước tới hỏi nhân viên bán hàng xem nhà vệ sinh nằm ở vị trí nào.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「店」 có âm On là 「てん」, chữ 「員」 có âm On là 「いん」 -> 店員 (てんいん: nhân viên cửa hàng).\n\n🔍 Phân tích các lựa chọn:\n- 1. てんえん: Sai âm của 員\n- 2. みせいん: Nhầm âm Kun của 店\n- 3. みせえん: Sai cả hai âm\n- 4. てんいん (店員): Nhân viên bán hàng (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(3) 4 句意: 问了店员洗手间在哪里。考察汉字词: “店”音读为“てん”，“員”音读为“いん”。",
      "correctOption": 4
    },
    "4": {
      "snippet": "食堂 (しょくどう)",
      "explanation": "🎯 Đáp án đúng: [2] 食堂 (しょくどう)\n\n💬 Dịch nghĩa câu:\n\"Nhà ăn của trường học hôm nay vào giờ ăn trưa vô cùng đông đúc.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「食」 có âm On là 「しょく」, chữ 「堂」 có âm On là 「どう」 -> 食堂 (しょくどう: nhà ăn, căng tin).\n\n🔍 Phân tích các lựa chọn:\n- 1. しょくとう: Thiếu biến âm đục\n- 2. しょくどう (食堂): Nhà ăn, phòng ăn (ĐÚNG)\n- 3. じょくとう: Sai âm đầu\n- 4. じょくどう: Sai cả hai âm\n\n📄 Trích PDF gốc (试题解析):\n(4) 2 句意: 食堂今天很拥挤。考察汉字词: “食”音读为“しょく”，“堂”音读为“どう”。",
      "correctOption": 2
    },
    "5": {
      "snippet": "港 (みなと)",
      "explanation": "🎯 Đáp án đúng: [2] 港 (みなと)\n\n💬 Dịch nghĩa câu:\n\"Đứng từ ô cửa sổ tầng hai này có thể phóng tầm mắt ngắm nhìn ra bến cảng.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán 「港」 (cảng) có cách đọc Kunyomi chuẩn xác là 「みなと」 (bến cảng, cảng biển).\n\n🔍 Phân tích các lựa chọn:\n- 1. うみ (海): Biển\n- 2. みなと (港): Bến cảng, bến tàu (ĐÚNG)\n- 3. みずうみ (湖): Hồ nước\n- 4. いけ (池): Cái ao\n\n📄 Trích PDF gốc (试题解析):\n(5) 2 句意: 从这扇窗户能看到港口。2. みなと(港): 港口, 码头",
      "correctOption": 2
    },
    "6": {
      "snippet": "小説 (しょうせつ)",
      "explanation": "🎯 Đáp án đúng: [3] 小説 (しょうせつ)\n\n💬 Dịch nghĩa câu:\n\"Cuốn tiểu thuyết trinh thám mới ra mắt này đọc vô cùng lôi cuốn và thú vị.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「小」 có âm On là 「しょう」, chữ 「説」 có âm On là 「せつ」 -> 小説 (しょうせつ: tiểu thuyết).\n\n🔍 Phân tích các lựa chọn:\n- 1. しょうぜつ: Sai biến âm đục\n- 2. しょうさつ: Sai nguyên âm\n- 3. しょうせつ (小説): Tiểu thuyết (ĐÚNG)\n- 4. しょうざつ: Sai âm\n\n📄 Trích PDF gốc (试题解析):\n(6) 3 句意: 这本小说很有趣。考察汉字词: “小”音读为“しょう”，“説”音读为“せつ”。",
      "correctOption": 3
    },
    "7": {
      "snippet": "日記 (にっき)",
      "explanation": "🎯 Đáp án đúng: [1] 日記 (にっき)\n\n💬 Dịch nghĩa câu:\n\"Mỗi buổi tối trước khi đi ngủ, tôi đều giữ thói quen viết nhật ký.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「日」 khi ghép với chữ 「記」 hàng か phát sinh biến âm ngắt促音 -> 日記 (にっき: nhật ký).\n\n🔍 Phân tích các lựa chọn:\n- 1. にっき (日記): Sổ nhật ký (ĐÚNG)\n- 2. にちき: Chưa biến âm ngắt\n- 3. にちぎ: Sai âm đục\n- 4. にっぎ: Sai âm\n\n📄 Trích PDF gốc (试题解析):\n(7) 1 句意: 我每天晚上都会写日记。“日”接头发生促音变, 读作“にっき”。",
      "correctOption": 1
    },
    "8": {
      "snippet": "夕方 (ゆうがた)",
      "explanation": "🎯 Đáp án đúng: [2] 夕方 (ゆうがた)\n\n💬 Dịch nghĩa câu:\n\"Vào lúc chiều muộn hoàng hôn thì bầu trời bỗng đổ mưa rào.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「夕」 có âm Kun là 「ゆう」, chữ 「方」 biến âm đục thành 「がた」 -> 夕方 (ゆうがた: chiều muộn, hoàng hôn).\n\n🔍 Phân tích các lựa chọn:\n- 1. ゆかた: Áo Yukata\n- 2. ゆうがた (夕方): Chiều tối, hoàng hôn (ĐÚNG)\n- 3. ゆうかた: Thiếu âm đục\n- 4. ゆがた: Thiếu trường âm\n\n📄 Trích PDF gốc (试题解析):\n(8) 2 句意: 傍晚时分下起了雨。考察训读: “夕”训读为“ゆう”，“方”训读为“がた”。",
      "correctOption": 2
    },
    "9": {
      "snippet": "秋 (あき)",
      "explanation": "🎯 Đáp án đúng: [4] 秋 (あき)\n\n💬 Dịch nghĩa câu:\n\"Thời tiết mát mẻ dần, chẳng mấy chốc mà đã sắp sửa bước sang mùa thu rồi nhỉ.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán 「秋」 (thu) có cách đọc Kunyomi chuẩn xác là 「あき」 (mùa thu).\n\n🔍 Phân tích các lựa chọn:\n- 1. ふゆ (冬): Mùa đông\n- 2. なつ (夏): Mùa hè\n- 3. はる (春): Mùa xuân\n- 4. あき (秋): Mùa thu (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(9) 4 句意: 马上要到秋天了啊。4. あき(秋): 秋天",
      "correctOption": 4
    },
    "10": {
      "snippet": "青い (あおい)",
      "explanation": "🎯 Đáp án đúng: [1] 青い (あおい)\n\n💬 Dịch nghĩa câu:\n\"Anh Suzuki hôm nay đang mặc một chiếc áo sơ mi màu xanh lam rất nhã nhặn.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ 「あおい」 được viết bằng chữ Hán chuẩn xác là 「青い」 (thanh - màu xanh dương, xanh lam).\n\n🔍 Phân tích các lựa chọn:\n- 1. 青い (あおい): Màu xanh lam (ĐÚNG)\n- 2. 黒い (くろい): Màu đen\n- 3. 赤い (あかい): Màu đỏ\n- 4. 白い (しろい): Màu trắng\n\n📄 Trích PDF gốc (试题解析):\n(10) 1 句意: 铃木穿着蓝色衬衣。1. 青い（あおい）: 蓝色",
      "correctOption": 1
    },
    "11": {
      "snippet": "場所 (ばしょ)",
      "explanation": "🎯 Đáp án đúng: [4] 場所 (ばしょ)\n\n💬 Dịch nghĩa câu:\n\"Xin vui lòng thông báo cụ thể cho tôi biết địa điểm tổ chức cuộc họp phòng ban.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「場」 (trường) ghép với chữ 「所」 (sở) tạo thành danh từ 「場所」 (địa điểm, nơi diễn ra).\n\n🔍 Phân tích các lựa chọn:\n- 1. 場処: Chữ sai chuẩn\n- 2. 場初: Nhầm chữ\n- 3. 場書: Nhầm chữ\n- 4. 場所 (ばしょ): Địa điểm, vị trí (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(11) 4 句意: 请把会议地点告诉我。4. 場所（ばしょ）: 地点, 场所",
      "correctOption": 4
    },
    "12": {
      "snippet": "歩く (あるく)",
      "explanation": "🎯 Đáp án đúng: [3] 歩く (あるく)\n\n💬 Dịch nghĩa câu:\n\"Từ nhà ga tàu điện đi bộ thong thả về đến nhà tôi chỉ mất vỏn vẹn 5 phút đồng hồ.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「あるく」 được viết bằng chữ Hán chuẩn xác là 「歩く」 (bộ - đi bộ, dạo bước).\n\n🔍 Phân tích các lựa chọn:\n- 1. 走る (はしる): Chạy bộ\n- 2. 通る (とおる): Đi ngang qua\n- 3. 歩く (あるく): Đi bộ (ĐÚNG)\n- 4. 渡る (わたる): Băng qua đường\n\n📄 Trích PDF gốc (试题解析):\n(12) 3 句意: 从车站走到我家只用5分钟。3. 歩く（あるく）: 走, 步行",
      "correctOption": 3
    },
    "13": {
      "snippet": "便利 (べんり)",
      "explanation": "🎯 Đáp án đúng: [4] 便利 (べんり)\n\n💬 Dịch nghĩa câu:\n\"Tuyến tàu điện ngầm mới đã được xây dựng xong nên cuộc sống ở đây trở nên rất tiện lợi.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「便」 (tiện) ghép với chữ 「利」 (lợi) tạo thành từ 「便利」 (tiện lợi, thuận tiện).\n\n🔍 Phân tích các lựa chọn:\n- 1. 使利: Nhầm chữ Sử\n- 2. 便理: Nhầm chữ Lý\n- 3. 使理: Sai cả hai chữ\n- 4. 便利 (べんり): Tiện lợi, thuận tiện (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(13) 4 句意: 地铁建好了, 所以变得方便了。4. 便利（べんり）: 便利, 方便",
      "correctOption": 4
    },
    "14": {
      "snippet": "眠い (ねむい)",
      "explanation": "🎯 Đáp án đúng: [4] 眠い (ねむい)\n\n💬 Dịch nghĩa câu:\n\"Bởi vì tối qua thức khuya làm việc nên sáng nay tôi cảm thấy rất buồn ngủ và đã uống một ly cà phê.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ 「ねむい」 viết bằng chữ Hán chuẩn xác là 「眠い」 (miên - buồn ngủ).\n\n🔍 Phân tích các lựa chọn:\n- 1. 暗い (くらい): Tối tăm\n- 2. 遅い (おそい): Chậm trễ, muộn\n- 3. 痛い (いたい): Đau đớn\n- 4. 眠い (ねむい): Buồn ngủ (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(14) 4 句意: 我很困, 所以喝了咖啡。4. 眠い（ねむい）: 困",
      "correctOption": 4
    },
    "15": {
      "snippet": "雪 (ゆき)",
      "explanation": "🎯 Đáp án đúng: [1] 雪 (ゆき)\n\n💬 Dịch nghĩa câu:\n\"Hôm nay thời tiết giá rét và ngoài trời có tuyết rơi trắng xóa.\"\n\n💡 Phân tích & Giải thích:\n• Từ 「ゆき」 viết bằng chữ Hán chuẩn xác là 「雪」 (tuyết). Cụm từ: 雪が降る.\n\n🔍 Phân tích các lựa chọn:\n- 1. 雪 (ゆき): Tuyết rơi (ĐÚNG)\n- 2. 雲 (くも): Đám mây\n- 3. 雷 (かみなり): Sấm sét\n- 4. 霜 (しも): Sương giá\n\n📄 Trích PDF gốc (试题解析):\n(15) 1 句意: 今天下雪了。1. 雪（ゆき）: 雪",
      "correctOption": 1
    },
    "16": {
      "snippet": "乾かない (かわかない)",
      "explanation": "🎯 Đáp án đúng: [4] 乾かない (かわかない)\n\n💬 Dịch nghĩa câu:\n\"Quần áo giặt từ sáng sớm mà do trời râm mát nên đến giờ vẫn chưa khô hẳn.\"\n\n💡 Phân tích & Giải thích:\n• Tự động từ 「かわく (乾く - can)」: khô ráo. Thể phủ định: 「乾かない」 (chưa khô).\n\n🔍 Phân tích các lựa chọn:\n- 1. 濡れない: Không bị ướt\n- 2. 汚れない: Không bị bẩn\n- 3. 壊れない: Không bị hỏng\n- 4. 乾かない (かわかない: chưa khô ráo) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(16) 4 句意: 今早洗的衣服还没干。4. 乾く(かわく): 干, 干燥",
      "correctOption": 4
    },
    "17": {
      "snippet": "熱心 (ねっしん)",
      "explanation": "🎯 Đáp án đúng: [3] 熱心 (ねっしん)\n\n💬 Dịch nghĩa câu:\n\"Anh Smith lúc nào cũng học tập rất nhiệt tình, say mê và chuyên cần.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ đuôi な 「熱心 (ねっしん)」: nhiệt tình, hết lòng, say mê.\n\n🔍 Phân tích các lựa chọn:\n- 1. 親切 (thân thiện)\n- 2. 丁寧 (lịch sự)\n- 3. 熱心 (ねっしん: nhiệt tình, say mê) (ĐÚNG)\n- 4. 安心 (an tâm)\n\n📄 Trích PDF gốc (试题解析):\n(17) 3 句意: 史密斯先生一直都在用功学习。3. 熱心(ねっしん): 热情, 热心",
      "correctOption": 3
    },
    "18": {
      "snippet": "興味 (きょうみ)",
      "explanation": "🎯 Đáp án đúng: [2] 興味 (きょうみ)\n\n💬 Dịch nghĩa câu:\n\"Tôi có niềm hứng thú và say mê rất lớn đối với truyện tranh hoạt hình Nhật Bản.\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ cố định: 「～に興味がある」 (có hứng thú, quan tâm say mê đối với cái gì).\n\n🔍 Phân tích các lựa chọn:\n- 1. 意味 (ý nghĩa)\n- 2. 興味 (きょうみ: niềm hứng thú, say mê) (ĐÚNG)\n- 3. 趣味 (sở thích cá nhân)\n- 4. 理由 (lý do)\n\n📄 Trích PDF gốc (试题解析):\n(18) 2 句意: 我对日本动漫非常感兴趣。2. 興味(きょうみ): 兴趣",
      "correctOption": 2
    },
    "19": {
      "snippet": "ルール (rule)",
      "explanation": "🎯 Đáp án đúng: [2] ルール (rule)\n\n💬 Dịch nghĩa câu:\n\"Tôi mới tập chơi nên vẫn chưa thực sự nắm rõ về luật chơi của bộ môn quần vợt tennis.\"\n\n💡 Phân tích & Giải thích:\n• Từ mượn tiếng Anh 「ルール (rule)」 mang nghĩa: quy tắc, luật thi đấu thể thao.\n\n🔍 Phân tích các lựa chọn:\n- 1. ルール (quy tắc, luật chơi)\n- 2. マナー (văn hóa ứng xử) (ĐÚNG)\n- 3. サービス (dịch vụ)\n- 4. チャンス (cơ hội)\n\n📄 Trích PDF gốc (试题解析):\n(19) 1 句意: 我不太清楚网球的规则。1. ルール: 规则",
      "correctOption": 2
    },
    "20": {
      "snippet": "準備 (じゅんび)",
      "explanation": "🎯 Đáp án đúng: [4] 準備 (じゅんび)\n\n💬 Dịch nghĩa câu:\n\"Đồ đạc và hành lý cần thiết cho chuyến du lịch dã ngoại ngày mai bạn đã chuẩn bị xong chưa?\"\n\n💡 Phân tích & Giải thích:\n• Danh động từ 「準備する」: chuẩn bị đồ đạc, hành trang cho một sự kiện.\n\n🔍 Phân tích các lựa chọn:\n- 1. 連絡 (liên lạc)\n- 2. 約束 (hẹn ước)\n- 3. 案内 (hướng dẫn)\n- 4. 準備 (じゅんび: chuẩn bị đồ đạc) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(20) 4 句意: 旅行的行李准备好了吗? 4. 準備(じゅんび): 准备",
      "correctOption": 4
    },
    "21": {
      "snippet": "相談 (そうだん)",
      "explanation": "🎯 Đáp án đúng: [3] 相談 (そうだん)\n\n💬 Dịch nghĩa câu:\n\"Sau khi trao đổi và bàn bạc kỹ cùng với em trai, tôi đã chọn được món quà ưng ý tặng mẹ.\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ cố định: 「～と相談する」 (bàn bạc, trao đổi ý kiến cùng với ai đó).\n\n🔍 Phân tích các lựa chọn:\n- 1. 挨拶 (chào hỏi)\n- 2. 紹介 (giới thiệu)\n- 3. 相談 (そうだん: bàn bạc, thảo luận) (ĐÚNG)\n- 4. 世話 (chăm sóc)\n\n📄 Trích PDF gốc (试题解析):\n(21) 3 句意: 和弟弟商量后, 选好了给母亲的礼物。3. 相談(そうだん): 商量",
      "correctOption": 3
    },
    "22": {
      "snippet": "運んで (はこんで)",
      "explanation": "🎯 Đáp án đúng: [1] 運んで (はこんで)\n\n💬 Dịch nghĩa câu:\n\"Xin bạn hãy phụ giúp tôi một tay khiêng chuyển kiện hành lý nặng này sang phòng bên kia nhé.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「はこぶ (運ぶ)」: khuân vác, chuyển dời đồ đạc từ nơi này sang nơi khác.\n\n🔍 Phân tích các lựa chọn:\n- 1. 運んで (はこんで: khuân vác, chuyển đồ) (ĐÚNG)\n- 2. 並べて (sắp xếp hàng lối)\n- 3. 集めて (tập hợp)\n- 4. 片付けて (dọn dẹp)\n\n📄 Trích PDF gốc (试题解析):\n(22) 1 句意: 请把这件行李搬到那边。1. 運ぶ(はこぶ): 搬运",
      "correctOption": 1
    },
    "23": {
      "snippet": "危険 (きけん)",
      "explanation": "🎯 Đáp án đúng: [2] 危険 (きけん)\n\n💬 Dịch nghĩa câu:\n\"Nếu bạn thao tác sai quy trình chiếc máy cắt này thì sẽ vô cùng nguy hiểm.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ đuôi な 「危険 (きけん)」: nguy hiểm (đối lập với an toàn 安全 あんぜん).\n\n🔍 Phân tích các lựa chọn:\n- 1. 便利 (tiện lợi)\n- 2. 危険 (きけん: nguy hiểm) (ĐÚNG)\n- 3. 安全 (an toàn)\n- 4. 大切 (quan trọng)\n\n📄 Trích PDF gốc (试题解析):\n(23) 2 句意: 如果弄错了这台机器的操作方法, 会很危险。2. 危険(きけん): 危险",
      "correctOption": 2
    },
    "24": {
      "snippet": "止めないで (とめないで)",
      "explanation": "🎯 Đáp án đúng: [3] 止めないで (とめないで)\n\n💬 Dịch nghĩa câu:\n\"Khu vực này xe cộ ra vào liên tục, xin vui lòng đừng đỗ xe ô tô ở ngay trước lối ra vào.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「とめる (止める)」: dừng xe, đỗ xe (車を止める). Cấm đoán: 止めないでください.\n\n🔍 Phân tích các lựa chọn:\n- 1. 落とさないで: Đừng làm rơi\n- 2. 捨てないで: Đừng vứt rác\n- 3. 止めないで (とめないで: xin đừng dừng/đỗ xe) (ĐÚNG)\n- 4. 閉めないで: Đừng đóng cửa\n\n📄 Trích PDF gốc (试题解析):\n(24) 3 句意: 请不要把车停在入口前。3. 止める(とめる): 停, 停止",
      "correctOption": 3
    },
    "25": {
      "snippet": "出発 (しゅっぱつ)",
      "explanation": "🎯 Đáp án đúng: [3] 出発 (しゅっぱつ)\n\n💬 Dịch nghĩa câu:\n\"Chuyến xe buýt đường dài đã bắt đầu xuất bến khởi hành đi đến thành phố tiếp theo.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「出発 (しゅっぱつ)」: xuất phát, khởi hành lên đường.\n\n🔍 Phân tích các lựa chọn:\n- 1. 到着 (đến nơi)\n- 2. 通過 (đi ngang qua)\n- 3. 出発 (しゅっぱつ: khởi hành, xuất phát) (ĐÚNG)\n- 4. 利用 (sử dụng)\n\n📄 Trích PDF gốc (试题解析):\n(25) 3 句意: 公交车出发了。3. 出発(しゅっぱつ): 出发",
      "correctOption": 3
    },
    "26": {
      "snippet": "丁寧に ≒ きれいに",
      "explanation": "🎯 Đáp án đúng: [2] 丁寧に ≒ きれいに\n\n💬 Dịch nghĩa câu:\n\"Xin hãy viết chữ nắn nót, cẩn thận và rõ ràng hơn một chút nhé.\"\n\n💡 Phân tích & Giải thích:\n• Phó từ 「ていねいに (丁寧に: cẩn thận, nắn nót)」 tương đương với viết đẹp, chỉn chu 「きれいに」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Viết nắn nót, đẹp đẽ (きれいに)\n- 2. Viết thật nhanh (ĐÚNG)\n- 3. Viết thật to\n- 4. Viết mực đỏ\n\n📄 Trích PDF gốc (试题解析):\n(26) 1 句意: 请写得再认真一些。(丁寧に ≒ きれいに)",
      "correctOption": 2
    },
    "27": {
      "snippet": "うまい ≒ 上手だ",
      "explanation": "🎯 Đáp án đúng: [1] うまい ≒ 上手だ\n\n💬 Dịch nghĩa câu:\n\"Anh trai ruột của tôi có khiếu hội họa và vẽ tranh rất giỏi giang.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ 「うまい」 trong khẩu ngữ khi nói về tài năng, kỹ năng đồng nghĩa với 「上手だ (じょうずだ: giỏi giang)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Vẽ tranh rất giỏi giang (上手だ) (ĐÚNG)\n- 2. Vẽ tranh rất chậm\n- 3. Rất thích xem tranh\n- 4. Hay mua tranh đắt tiền\n\n📄 Trích PDF gốc (试题解析):\n(27) 1 句意: 哥哥很擅长画画。(うまい ≒ 上手だ)",
      "correctOption": 1
    },
    "28": {
      "snippet": "朝寝坊した ≒ 遅く起きた",
      "explanation": "🎯 Đáp án đúng: [3] 朝寝坊した ≒ 遅く起きた\n\n💬 Dịch nghĩa câu:\n\"Sáng chủ nhật hôm qua tôi đã ngủ nướng một giấc tới trưa mới dậy.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ/động từ 「あさねぼう (朝寝坊)」: ngủ nướng, đồng nghĩa với thức dậy muộn màng: 「遅く起きた」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Thức dậy từ sớm\n- 2. Không ngủ được\n- 3. Thức dậy muộn màng, ngủ nướng (遅く起きた) (ĐÚNG)\n- 4. Đi ngủ sớm\n\n📄 Trích PDF gốc (试题解析):\n(28) 3 句意: 昨天早上睡了懒觉。(朝寝坊した ≒ 遅く起きた)",
      "correctOption": 3
    },
    "29": {
      "snippet": "褒められた ≒ 良いと言われた",
      "explanation": "🎯 Đáp án đúng: [2] 褒められた ≒ 良いと言われた\n\n💬 Dịch nghĩa câu:\n\"Trong giờ học vẽ hôm nay, tác phẩm của bạn Tanaka đã được thầy giáo khen ngợi nức nở.\"\n\n💡 Phân tích & Giải thích:\n• Động từ bị động 「ほめられた (褒められた: được khen)」 đồng nghĩa với việc được nhận xét là rất tốt: 「良いと言われた」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Bị thầy giáo chê bai\n- 2. Được thầy nhận xét là làm rất tốt, khen ngợi (良いと言われた) (ĐÚNG)\n- 3. Bị nhắc nhở trật tự\n- 4. Được cho về sớm\n\n📄 Trích PDF gốc (试题解析):\n(29) 2 句意: 田中被老师表扬了。(褒められた ≒ 良いと言われた)",
      "correctOption": 2
    },
    "30": {
      "snippet": "留守 ≒ 家にいなかった",
      "explanation": "🎯 Đáp án đúng: [4] 留守 ≒ 家にいなかった\n\n💬 Dịch nghĩa câu:\n\"Khi tôi đến gõ cửa nhà anh Tanaka thì không thấy ai ra mở, có vẻ anh ấy đang vắng nhà.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「留守 (るす: vắng nhà)」 đồng nghĩa với việc không có người ở nhà: 「家にいなかった」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đang ngủ trong phòng\n- 2. Đang bận nấu ăn\n- 3. Đang tiếp khách\n- 4. Không có ai ở nhà, đi vắng (家にいなかった) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(30) 4 句意: 田中先生当时不在家。(留守 ≒ 家にいなかった)",
      "correctOption": 4
    },
    "31": {
      "snippet": "苦い (にがい)",
      "explanation": "🎯 Đáp án đúng: [3] 苦い (にがい)\n\n💬 Dịch nghĩa câu:\n\"Viên thuốc cảm sốt này có vị rất đắng nên sau khi uống xong tôi đã phải uống ngay một cốc nước lọc to.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ 「にがい (苦い)」 dùng để chỉ vị giác: vị đắng ngắt của thuốc, cà phê đen, mướp đắng.\n\n🔍 Phân tích các lựa chọn:\n- 1. Vị đắng của hoa quả ngọt (sai)\n- 2. Thời tiết đắng (sai)\n- 3. Đồng hồ đắng (sai) (ĐÚNG)\n- 4. Viên thuốc này vị rất đắng phải uống nhiều nước (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(31) 4 にがい 意思是“苦, 苦味”, 选项 4 为正确应用。",
      "correctOption": 3
    },
    "32": {
      "snippet": "割る (わる)",
      "explanation": "🎯 Đáp án đúng: [4] 割る (わる)\n\n💬 Dịch nghĩa câu:\n\"Trong lúc rửa bát đĩa trơn tay, tôi đã vô ý làm rơi và đánh vỡ toang chiếc cốc thủy tinh.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「わる (割る)」 dùng với đồ dễ vỡ như bát đĩa sứ, cốc thủy tinh, trứng gà: 「コップを割る」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đánh vỡ chiếc cốc thủy tinh rơi xuống sàn\n- 2. Làm vỡ áo quần (sai)\n- 3. Làm vỡ cái bàn gỗ (sai)\n- 4. Làm vỡ quyển sách (sai) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(32) 1 わる 意思是“打坏, 弄碎(玻璃、陶瓷)”, 选项 1 为正确应用。",
      "correctOption": 4
    },
    "33": {
      "snippet": "遅刻 (ちこく)",
      "explanation": "🎯 Đáp án đúng: [1] 遅刻 (ちこく)\n\n💬 Dịch nghĩa câu:\n\"Bởi vì chuyến xe buýt gặp ùn tắc giao thông nghiêm trọng nên sáng nay tôi đã bị đi học muộn.\"\n\n💡 Phân tích & Giải thích:\n• Danh động từ 「遅刻する (ちこくする)」: đến muộn giờ học, muộn giờ làm so với quy định.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đến muộn giờ ăn cơm nhà (ĐÚNG)\n- 2. Đến muộn giờ học do tắc đường (授業に遅刻する)\n- 3. Đến muộn giờ ngủ\n- 4. Đi bộ muộn\n\n📄 Trích PDF gốc (试题解析):\n(33) 2 ちこく 意思是“迟到”, 选项 2 为正确应用。",
      "correctOption": 1
    },
    "34": {
      "snippet": "厳しい (きびしい)",
      "explanation": "🎯 Đáp án đúng: [2] 厳しい (きびしい)\n\n💬 Dịch nghĩa câu:\n\"Thầy giáo chủ nhiệm lớp tôi là một người vô cùng nghiêm khắc và kỷ luật đối với vấn đề giờ giấc.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ 「きびしい (厳しい)」: nghiêm khắc, chặt chẽ về mặt kỷ luật, quy tắc.\n\n🔍 Phân tích các lựa chọn:\n- 1. Thời tiết nghiêm khắc (sai)\n- 2. Món ăn nghiêm khắc (sai) (ĐÚNG)\n- 3. Bức tranh nghiêm khắc (sai)\n- 4. Thầy giáo rất nghiêm khắc về giờ giấc (時間に厳しい)\n\n📄 Trích PDF gốc (试题解析):\n(34) 4 きびしい 意思是“严厉, 严格”, 选项 4 为正确应用。",
      "correctOption": 2
    },
    "35": {
      "snippet": "迎える (むかえる)",
      "explanation": "🎯 Đáp án đúng: [3] 迎える (むかえる)\n\n💬 Dịch nghĩa câu:\n\"Chiều ngày mai tôi sẽ lái xe ra sân bay quốc tế để nghênh đón người bạn thân từ xa tới thăm.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「むかえる (迎える)」: nghênh đón, đón chào ai đó tại nhà ga, sân bay, cửa nhà.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đón xe buýt (phải dùng 乗る)\n- 2. Đón cơn mưa (sai)\n- 3. Ra sân bay để nghênh đón bạn thân (空港で友達を迎える) (ĐÚNG)\n- 4. Đón bức thư (sai)\n\n📄 Trích PDF gốc (试题解析):\n(35) 3 むかえる 意思是“迎接, 欢迎”, 选项 3 为正确应用。",
      "correctOption": 3
    },
    "36": {
      "snippet": "米で作った (Làm từ nguyên liệu gạo)",
      "explanation": "🎯 Đáp án đúng: [4] 米で作った (Làm từ nguyên liệu gạo)\n\n💬 Dịch nghĩa câu:\n\"Ổ bánh mì thơm ngon này là do chính tay tôi làm hoàn toàn từ hạt gạo thiên nhiên.\"\n\n💡 Phân tích & Giải thích:\n• Trợ từ 「で」 biểu thị chất liệu, nguyên liệu tạo nên sản phẩm: 「米で作ったパン」 (bánh mì làm từ gạo).\n\n🔍 Phân tích các lựa chọn:\n- 1. 米を作った: Tạo ra gạo\n- 2. 米に作った: Sai trợ từ\n- 3. 米から作った: Dùng khi biến đổi hóa học\n- 4. 米で作った: ĐÚNG - Làm từ nguyên liệu gạo (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(1) 4 句意: 这是我用米做的面包。考察で表示原材料。",
      "correctOption": 4
    },
    "37": {
      "snippet": "母親に似ている (Giống với đối tượng)",
      "explanation": "🎯 Đáp án đúng: [1] 母親に似ている (Giống với đối tượng)\n\n💬 Dịch nghĩa câu:\n\"Mọi người xung quanh ai cũng bảo rằng khuôn mặt của đứa bé trông giống hệt mẹ nó.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc so sánh tương đồng: 「A は B に 似ている」 (A trông giống với B).\n\n🔍 Phân tích các lựa chọn:\n- 1. 母親に似ている: ĐÚNG - Trông giống với người mẹ (ĐÚNG)\n- 2. 母親を似ている: Sai trợ từ bổ ngữ\n- 3. 母親で似ている: Sai trợ từ\n- 4. 母親と似ている: Kém tự nhiên hơn に\n\n📄 Trích PDF gốc (试题解析):\n(2) 1 句意: 男孩的长相比起爸爸来更像妈妈。考察～に似ている表示相似。",
      "correctOption": 1
    },
    "38": {
      "snippet": "食べる時だけ (Chỉ duy nhất khi ăn)",
      "explanation": "🎯 Đáp án đúng: [2] 食べる時だけ (Chỉ duy nhất khi ăn)\n\n💬 Dịch nghĩa câu:\n\"Cô em gái nhỏ của tôi vốn tính rất hiếu động và thích nói chuyện, chỉ duy nhất những lúc ngồi ăn cơm mới chịu ngồi yên lặng.\"\n\n💡 Phân tích & Giải thích:\n• Trợ từ 「だけ」 giới hạn thời điểm duy nhất: chỉ duy nhất lúc ăn là yên lặng.\n\n🔍 Phân tích các lựa chọn:\n- 1. 食べる時でも: Cho dù lúc ăn\n- 2. 食べる時だけ: ĐÚNG - Chỉ duy nhất vào lúc ăn cơm (ĐÚNG)\n- 3. 食べる時まで: Tới tận lúc ăn\n- 4. 食べる時ほど: Cỡ chừng lúc ăn\n\n📄 Trích PDF gốc (试题解析):\n(3) 2 句意: 妹妹很爱说话, 只有吃饭的时候能安静一会儿。考察だけ表示唯一时间限定。",
      "correctOption": 2
    },
    "39": {
      "snippet": "意味について (Về ý nghĩa của từ vựng)",
      "explanation": "🎯 Đáp án đúng: [4] 意味について (Về ý nghĩa của từ vựng)\n\n💬 Dịch nghĩa câu:\n\"Học sinh lễ phép giơ tay hỏi thầy giáo: 'Thưa thầy, từ vựng mới này có ý nghĩa gì thế ạ?'\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「Danh từ + について」 mang ý nghĩa: 'về vấn đề gì, về đối tượng nào'.\n\n🔍 Phân tích các lựa chọn:\n- 1. 意味にとって: Đối với ý nghĩa\n- 2. 意味によって: Do/bởi ý nghĩa\n- 3. 意味について: ĐÚNG - Về ý nghĩa của từ vựng này\n- 4. 意味に対して: Đối lập với ý nghĩa (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(4) 3 句意: 老师, 这个单词是什么意思? 考察～について表示关于某主题。",
      "correctOption": 4
    },
    "40": {
      "snippet": "ゲームをしてもいい (Xin phép làm gì)",
      "explanation": "🎯 Đáp án đúng: [2] ゲームをしてもいい (Xin phép làm gì)\n\n💬 Dịch nghĩa câu:\n\"Đứa bé xin phép bố sau khi làm xong bài tập: 'Bố ơi, con xin phép được chơi điện tử một lát có được không ạ?'\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu xin phép lịch sự: 「V-て + もいいですか」 (làm việc V có được phép không?).\n\n🔍 Phân tích các lựa chọn:\n- 1. ゲームをしなければならない: Bắt buộc phải chơi\n- 2. ゲームをしてはいけない: Cấm không được chơi (ĐÚNG)\n- 3. ゲームをしなくてもいい: Không chơi cũng được\n- 4. ゲームをしてもいい: ĐÚNG - Con được phép chơi game không ạ?\n\n📄 Trích PDF gốc (试题解析):\n(5) 4 句意: 孩子:“爸爸, 我可以玩会儿游戏吗?” 考察～てもいい表示请求许可。",
      "correctOption": 2
    },
    "41": {
      "snippet": "手伝ってくれて (Người khác giúp mình)",
      "explanation": "🎯 Đáp án đúng: [3] 手伝ってくれて (Người khác giúp mình)\n\n💬 Dịch nghĩa câu:\n\"A: 'Cảm ơn bạn hôm qua đã nhiệt tình giúp đỡ mình dọn dẹp và chuyển nhà nhé!' - B: 'Không có chi đâu!'\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc cảm ơn người khác đã làm giúp mình việc gì: 「V-て + くれてありがとう」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 手伝ってもらって: Được giúp (kém tự nhiên khi cảm ơn trực tiếp)\n- 2. 手伝ってあげて: Mình giúp bạn (sai)\n- 3. 手伝ってくれて: ĐÚNG - Cảm ơn vì bạn đã giúp đỡ mình (ĐÚNG)\n- 4. 手伝わせて: Cho phép giúp\n\n📄 Trích PDF gốc (试题解析):\n(6) 3 句意: 谢谢你昨天帮我搬家。考察～てくれてありがとう表示感谢对方的帮助。",
      "correctOption": 3
    },
    "42": {
      "snippet": "貸してくれた (Bạn cho mình mượn bút)",
      "explanation": "🎯 Đáp án đúng: [1] 貸してくれた (Bạn cho mình mượn bút)\n\n💬 Dịch nghĩa câu:\n\"Hôm nay do vội vàng nên tôi quên mang theo bút chì và tẩy, may mà người bạn ngồi cạnh đã vui vẻ cho tôi mượn dùng.\"\n\n💡 Phân tích & Giải thích:\n• Bạn ngồi bên cạnh là chủ ngữ thực hiện hành động cho tôi mượn bút: 「隣の人が貸してくれた」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 借りてくれた: Bạn mượn giúp (ĐÚNG)\n- 2. 貸してあげた: Tôi cho bạn mượn\n- 3. 借りてもらった: Tôi được mượn\n- 4. 貸してくれた: ĐÚNG - Bạn đã tốt bụng cho tôi mượn\n\n📄 Trích PDF gốc (试题解析):\n(7) 4 句意: 旁边的人把铅笔借给我用了。考察～てくれた表示他人给予我方帮助。",
      "correctOption": 1
    },
    "43": {
      "snippet": "置いたまま (Trạng thái giữ nguyên)",
      "explanation": "🎯 Đáp án đúng: [2] 置いたまま (Trạng thái giữ nguyên)\n\n💬 Dịch nghĩa câu:\n\"Trên giá sách của tôi có rất nhiều cuốn sách mua về nhưng cứ để nguyên đấy mãi mà chẳng chịu đọc.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「Động từ thể た + まま」 diễn tả trạng thái của sự việc được giữ nguyên không hề thay đổi.\n\n🔍 Phân tích các lựa chọn:\n- 1. 置いたあと: Sau khi để\n- 2. 置いたまま: ĐÚNG - Cứ để nguyên như thế không đụng tới (ĐÚNG)\n- 3. 置くために: Để đặt\n- 4. 置くように: Để đặt\n\n📄 Trích PDF gốc (试题解析):\n(8) 2 句意: 书架上有很多买回来就那么放着没读的书。考察～たまま表示保持某种状态。",
      "correctOption": 2
    },
    "44": {
      "snippet": "～ように (Để không bị cảm lạnh)",
      "explanation": "🎯 Đáp án đúng: [4] ～ように (Để không bị cảm lạnh)\n\n💬 Dịch nghĩa câu:\n\"Mùa đông giá rét, trước khi ra ngoài bạn hãy mặc áo ấm cẩn thận để không bị nhiễm lạnh nhé.\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu 「Động từ thể ない + ように」: để không xảy ra trạng thái tiêu cực nào đó.\n\n🔍 Phân tích các lựa chọn:\n- 1. ひかないように: ĐÚNG - Để không bị cảm lạnh\n- 2. ひかないために: Để không (kém tự nhiên với tự động từ)\n- 3. ひくように: Để bị cảm\n- 4. ひかないのに: Mặc dù không cảm (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(9) 1 句意: 请穿暖和点, 以免感冒。考察～ないように表示避免消极后果。",
      "correctOption": 4
    },
    "45": {
      "snippet": "～てはいけない (Cấm đoán)",
      "explanation": "🎯 Đáp án đúng: [1] ～てはいけない (Cấm đoán)\n\n💬 Dịch nghĩa câu:\n\"Biển báo trước công trường: 'Khu vực nguy hiểm đang thi công, người không có nhiệm vụ tuyệt đối không được bước vào.'\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc cấm đoán mang tính quy định nghiêm ngặt: 「V-てはいけません / てはいけない」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 入ってもいい: Được phép vào (ĐÚNG)\n- 2. 入らなくてもいい: Không vào cũng được\n- 3. 入ってはいけない: ĐÚNG - Tuyệt đối không được bước vào\n- 4. 入るはずだ: Chắc chắn vào\n\n📄 Trích PDF gốc (试题解析):\n(10) 3 句意: 施工危险区域严禁入内。考察～てはいけない表示禁止。",
      "correctOption": 1
    },
    "46": {
      "snippet": "～かもしれない (Có lẽ ngày mai)",
      "explanation": "🎯 Đáp án đúng: [3] ～かもしれない (Có lẽ ngày mai)\n\n💬 Dịch nghĩa câu:\n\"Theo quan sát những đám mây đen kéo tới, có lẽ ngày mai nhiệt độ sẽ giảm sâu và trời trở lạnh đấy.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「Tính từ/động từ thể thông thường + かもしれない」 biểu thị sự phỏng đoán có thể xảy ra.\n\n🔍 Phân tích các lựa chọn:\n- 1. 寒いはずだ: Chắc chắn lạnh\n- 2. 寒いかもしれない: ĐÚNG - Có lẽ trời sẽ trở lạnh\n- 3. 寒そうだ: Trông có vẻ lạnh (ĐÚNG)\n- 4. 寒いようだ: Dường như lạnh\n\n📄 Trích PDF gốc (试题解析):\n(11) 2 句意: 明天可能会变冷。考察～かもしれない表示推测。",
      "correctOption": 3
    },
    "47": {
      "snippet": "～たら (Giả định điều kiện sau khi hoàn tất)",
      "explanation": "🎯 Đáp án đúng: [4] ～たら (Giả định điều kiện sau khi hoàn tất)\n\n💬 Dịch nghĩa câu:\n\"Sau khi bạn hoàn thành xong hết các bài tập về nhà thì chúng ta cùng nhau đi ra công viên dạo mát nhé.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「V-たら」 diễn tả điều kiện giả định thời gian: 'sau khi làm xong hành động 1 thì thực hiện hành động 2'.\n\n🔍 Phân tích các lựa chọn:\n- 1. 終わると: Cứ hễ xong\n- 2. 終わるなら: Nếu là xong\n- 3. 終われば: Nếu xong\n- 4. 終わったら: ĐÚNG - Sau khi xong xuôi thì cùng đi (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(12) 4 句意: 作业写完后我们一起去散步吧。考察～たら表示完成后进行下一步。",
      "correctOption": 4
    },
    "48": {
      "snippet": "～そうだ (Trông có vẻ ngon miệng)",
      "explanation": "🎯 Đáp án đúng: [2] ～そうだ (Trông có vẻ ngon miệng)\n\n💬 Dịch nghĩa câu:\n\"Chiếc bánh kem phủ dâu tây mà người phục vụ vừa mang ra trông có vẻ thơm ngon và hấp dẫn ghê nhỉ!\"\n\n💡 Phân tích & Giải thích:\n• Tính từ 「おいしい」 bỏ đuôi い + そうだ: 「おいしそうだ」 diễn tả cảm nhận trực quan qua ánh mắt.\n\n🔍 Phân tích các lựa chọn:\n- 1. おいしいそうだ: Nghe nói ngon (truyền ngôn)\n- 2. おいしそうだ: ĐÚNG - Trông có vẻ ngon miệng (ĐÚNG)\n- 3. おいしいらしい: Nghe đồn ngon\n- 4. おいしいようだ: Dường như ngon\n\n📄 Trích PDF gốc (试题解析):\n(13) 2 句意: 这块蛋糕看上去真好吃啊。考察～そうだ表示直观推测。",
      "correctOption": 2
    },
    "49": {
      "snippet": "～てある (Trạng thái tên đã viết sẵn)",
      "explanation": "🎯 Đáp án đúng: [4] ～てある (Trạng thái tên đã viết sẵn)\n\n💬 Dịch nghĩa câu:\n\"Trên nhãn dán của chiếc hộp đựng đồ ăn, tên của từng bạn học sinh đã được cô giáo nắn nót viết sẵn từ trước.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「Tha động từ thể て + ある」: trạng thái của sự vật là kết quả của một hành vi đã được chuẩn bị sẵn có chủ ý.\n\n🔍 Phân tích các lựa chọn:\n- 1. 書いてある: ĐÚNG - Tên đã được viết sẵn trên nhãn\n- 2. 書いている: Đang viết\n- 3. 書いておく: Sẽ viết sẵn\n- 4. 書かれた: Bị viết (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(14) 1 句意: 盒子上已经写好了每个人的名字。考察～てある表示存续状态。",
      "correctOption": 4
    },
    "50": {
      "snippet": "～てもらう (Nhờ người khác sửa bài giúp)",
      "explanation": "🎯 Đáp án đúng: [3] ～てもらう (Nhờ người khác sửa bài giúp)\n\n💬 Dịch nghĩa câu:\n\"Sau khi viết xong bài văn tiếng Nhật, tôi đã mang tới nhờ thầy giáo chủ nhiệm sửa giúp các lỗi ngữ pháp.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「V-て + もらう」 diễn tả việc nhận được sự giúp đỡ, chỉ bảo từ ai đó: nhờ thầy sửa giúp bài.\n\n🔍 Phân tích các lựa chọn:\n- 1. 直してあげた: Tôi sửa cho thầy (sai)\n- 2. 直してもらった: ĐÚNG - Tôi được thầy sửa giúp bài cho\n- 3. 直してくれた: Thầy sửa (cần chủ ngữ là thầy) (ĐÚNG)\n- 4. 直させた: Bắt sửa\n\n📄 Trích PDF gốc (试题解析):\n(15) 2 句意: 写完作文后我请老师帮我修改了。考察～てもらう表示请他人帮忙。",
      "correctOption": 3
    },
    "51": {
      "snippet": "Dấu sao: 間に合う (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [2] Dấu sao: 間に合う (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Bây giờ nếu chúng ta đón xe taxi đi ngay thì có lẽ sẽ kịp giờ đấy, vì vậy tụi mình hãy đi bằng taxi đi.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 今すぐ 【1 タクシーに】 【4 乗れば】 ★【3 間に合う かもしれないから】 【2 タクシーで】 行こう。 Dấu sao ở vị trí thứ 3 là phương án 3.\n\n🔍 Phân tích các lựa chọn:\n- 1. タクシーに\n- 2. タクシーで (ĐÚNG)\n- 3. 間に合う かもしれないから (ĐÚNG vị trí dấu sao ★)\n- 4. 乗れば\n\n📄 Trích PDF gốc (试题解析):\n(16) 3 正确语序: 今すぐ 1 タクシーに 4 乗れば ★3 間に合う かもしれないから 2 タクシーで 行こう。",
      "correctOption": 2
    },
    "52": {
      "snippet": "Dấu sao: ところ (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [4] Dấu sao: ところ (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"A: 'Bạn ăn cơm cùng chúng mình nhé?' - B: 'Xin lỗi bạn nhé, mình vừa mới ăn trưa xong tức thì luôn đấy ạ.'\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: すみません。 ちょうど 【4 今】 【3 食べた】 ★【2 ところ】 【1 なんです】。 Dấu sao ở vị trí thứ 3 là phương án 2 (ところ).\n\n🔍 Phân tích các lựa chọn:\n- 1. なんです\n- 2. ところ (ĐÚNG vị trí dấu sao ★)\n- 3. 食べた\n- 4. 今 (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(17) 2 正确语序: すみません。 ちょうど 4 今 3 食べた ★2 ところ 1 なんです。",
      "correctOption": 4
    },
    "53": {
      "snippet": "Dấu sao: で (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [3] Dấu sao: で (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Ngày mai bạn sẽ phải đi gặp những vị khách hàng quan trọng của công ty, vì thế bạn tuyệt đối không được đi đôi giày cũ kỹ đó đâu nhé.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 明日は 大事な お客さまに 会うから、 【3 そんな】 【1 くつ】 ★【4 で】 【2 は いけませんよ】。 Dấu sao ở vị trí thứ 3 là phương án 4 (で).\n\n🔍 Phân tích các lựa chọn:\n- 1. くつ\n- 2. は いけませんよ\n- 3. そんな (ĐÚNG)\n- 4. で (ĐÚNG vị trí dấu sao ★)\n\n📄 Trích PDF gốc (试题解析):\n(18) 4 正确语序: 明日は 大事な お客さまに 会うから、 3 そんな 1 くつ ★4 で 2 は いけませんよ。",
      "correctOption": 3
    },
    "54": {
      "snippet": "Dấu sao: 寒そう (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [3] Dấu sao: 寒そう (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Hôm nay ngoài trời gió thổi rất to dữ dội mà trời lại trông có vẻ giá rét nữa nên tôi hoàn toàn không muốn bước chân ra ngoài.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 今日は、風が 【4 強い】 【1 し】 ★【3 寒そう】 【2 だから】 出かけたくない。 Dấu sao ở vị trí thứ 3 là phương án 3 (寒そう).\n\n🔍 Phân tích các lựa chọn:\n- 1. し\n- 2. だから\n- 3. 寒そう (ĐÚNG vị trí dấu sao ★) (ĐÚNG)\n- 4. 強い\n\n📄 Trích PDF gốc (试题解析):\n(19) 3 正确语序: 今日は、風が 4 強い 1 し ★3 寒そう 2 だから 出かけたくない。",
      "correctOption": 3
    },
    "55": {
      "snippet": "Dấu sao: 東京で (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [2] Dấu sao: 東京で (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"A: 'Bố mẹ đồng ý cho bạn đi du học chưa?' - B: 'Chưa. Nhưng cho dù có bị bố mẹ phản đối thì tôi vẫn quyết tâm lên Tokyo học tập.'\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: いいえ。 でも、もし 両親に 【1 反対】 【4 されても】 ★【3 東京で】 【2 勉強する】 つもりです。 Dấu sao ở vị trí thứ 3 là phương án 3 (東京で).\n\n🔍 Phân tích các lựa chọn:\n- 1. 反対\n- 2. 勉強する (ĐÚNG)\n- 3. 東京で (ĐÚNG vị trí dấu sao ★)\n- 4. されても\n\n📄 Trích PDF gốc (试题解析):\n(20) 3 正确语序: いいえ。 でも、もし 両親に 1 反対 4 されても ★3 東京で 2 勉強する つもりです。",
      "correctOption": 2
    },
    "56": {
      "snippet": "連れてきた (Bố mang chú cún về nuôi)",
      "explanation": "🎯 Đáp án đúng: [3] 連れてきた (Bố mang chú cún về nuôi)\n\n💬 Dịch nghĩa câu:\n\"Chú cún con lông trắng muốt mang tên Shiro này là do chính bố tôi đã mang từ nhà người bạn về nuôi dưỡng.\"\n\n💡 Phân tích & Giải thích:\n• Hành vi bố mang cún về nhà nuôi diễn ra trong quá khứ, dùng động từ kết hợp 「連れてきた」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 連れていく: Dắt đi\n- 2. 連れてきた (ĐÚNG - mang về nhà)\n- 3. 連れてこられた: Bị dắt (ĐÚNG)\n- 4. 連れていくはずだ: Chắc sẽ dắt\n\n📄 Trích PDF gốc (试题解析):\n(21) 2 爸爸把小狗小白带回家中饲养, 需用过去时連れてきた。",
      "correctOption": 3
    },
    "57": {
      "snippet": "壊してしまった (Shiro làm hỏng điện thoại)",
      "explanation": "🎯 Đáp án đúng: [2] 壊してしまった (Shiro làm hỏng điện thoại)\n\n💬 Dịch nghĩa câu:\n\"Hồi mới về nhà, do còn tinh nghịch nên có lần Shiro đã cắn và vô ý làm hỏng mất chiếc điện thoại của bố tôi.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「V-て + しまった」 diễn tả hành động gây ra sự cố hư hỏng đáng tiếc ngoài ý muốn.\n\n🔍 Phân tích các lựa chọn:\n- 1. 壊してみた: Làm hỏng thử\n- 2. 壊すそうだ: Nghe nói làm hỏng (ĐÚNG)\n- 3. 壊してしまった: ĐÚNG - Lỡ cắn làm hỏng mất\n- 4. 壊すつもりだ: Định làm hỏng\n\n📄 Trích PDF gốc (试题解析):\n(22) 3 小白不小心咬坏了爸爸的手机, 需用～てしまった表示遗憾后果。",
      "correctOption": 2
    },
    "58": {
      "snippet": "しかし (Tuy nhiên - chuyển tiếp)",
      "explanation": "🎯 Đáp án đúng: [1] しかし (Tuy nhiên - chuyển tiếp)\n\n💬 Dịch nghĩa câu:\n\"Tác giả kể hồi nhỏ không có anh chị em nên hay thấy cô đơn, tuy nhiên kể từ khi có Shiro thì ngôi nhà luôn tràn ngập niềm vui.\"\n\n💡 Phân tích & Giải thích:\n• Liên từ nghịch ngượng 「しかし」 liên kết giữa hai trạng thái tâm lý đối lập: trước đây buồn bã cô đơn và hiện tại vui vẻ.\n\n🔍 Phân tích các lựa chọn:\n- 1. だから: Vì thế (ĐÚNG)\n- 2. しかし: ĐÚNG - Tuy nhiên, thế nhưng\n- 3. そして: Và rồi\n- 4. あるいは: Hoặc là\n\n📄 Trích PDF gốc (试题解析):\n(23) 2 前后从孤独寂寞转变为有了陪伴的快乐, 需用表示转折的しかし。",
      "correctOption": 1
    },
    "59": {
      "snippet": "慰めてくれる (Shiro đến an ủi mỗi khi buồn)",
      "explanation": "🎯 Đáp án đúng: [4] 慰めてくれる (Shiro đến an ủi mỗi khi buồn)\n\n💬 Dịch nghĩa câu:\n\"Mỗi lần tôi có chuyện buồn bực hay mệt mỏi ủ rũ, Shiro đều ngoan ngoãn chạy đến ngồi cạnh bên như muốn an ủi tôi.\"\n\n💡 Phân tích & Giải thích:\n• Shiro thực hiện hành động an ủi ấm áp hướng về phía người viết, dùng mẫu câu nhận sự quan tâm 「～てくれる」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 慰めてくれる: ĐÚNG - Chạy lại âu yếm an ủi tôi\n- 2. 慰めてあげる: Tôi an ủi nó\n- 3. 慰められる: Bị an ủi\n- 4. 慰めさせる: Bắt an ủi (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(24) 1 每当作者沮丧时小狗都会主动过来安慰他, 需用～てくれる。",
      "correctOption": 4
    },
    "60": {
      "snippet": "Trợ từ chủ đề は",
      "explanation": "🎯 Đáp án đúng: [4] Trợ từ chủ đề は\n\n💬 Dịch nghĩa câu:\n\"Chú cún Shiro đối với bản thân tác giả giờ đây chính là một thành viên thân thiết không thể thiếu trong gia đình.\"\n\n💡 Phân tích & Giải thích:\n• Trợ từ 「は」 đặt sau danh từ Shiro để xác lập đối tượng làm chủ đề đúc kết kết luận của toàn bộ bài viết.\n\n🔍 Phân tích các lựa chọn:\n- 1. Trợ từ を\n- 2. Trợ từ に\n- 3. Trợ từ で\n- 4. Trợ từ は (ĐÚNG - Nhấn mạnh chủ đề Shiro) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(25) 4 小狗小白是本篇文章的核心主题, 提示主题应选用は。",
      "correctOption": 4
    },
    "61": {
      "snippet": "Kế hoạch tuần tới của anh Ishikawa",
      "explanation": "🎯 Đáp án đúng: [3] Kế hoạch tuần tới của anh Ishikawa\n\n💬 Dịch nghĩa câu:\n\"Theo nội dung bức thư trao đổi, anh Ishikawa thông báo rằng tuần tới anh sẽ đi công tác khảo sát thị trường ở Osaka.\"\n\n💡 Phân tích & Giải thích:\n• Chi tiết trong thư: tuần tới tôi có chuyến công tác 3 ngày ở chi nhánh Osaka nên không thể tham gia buổi họp mặt.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đi du lịch nước ngoài\n- 2. Đi công tác tại chi nhánh Osaka (ĐÚNG)\n- 3. Nghỉ phép ở nhà (ĐÚNG)\n- 4. Chuyển công tác hẳn\n\n📄 Trích PDF gốc (试题解析):\n(26) 2 石川先生表示他下周要去大阪出差。",
      "correctOption": 3
    },
    "62": {
      "snippet": "Thông tin về công viên trong thông báo",
      "explanation": "🎯 Đáp án đúng: [2] Thông tin về công viên trong thông báo\n\n💬 Dịch nghĩa câu:\n\"Bản thông báo cho biết khu vực bãi cỏ trung tâm công viên sẽ tạm thời rào chắn để gieo hạt và chăm sóc cỏ trong 2 tuần.\"\n\n💡 Phân tích & Giải thích:\n• Nội dung thông báo: để bảo dưỡng thảm cỏ xanh chuẩn bị cho mùa xuân, khu vực bãi cỏ tạm dừng hoạt động từ ngày 1 đến 15 tháng 12.\n\n🔍 Phân tích các lựa chọn:\n- 1. Khu vực bãi cỏ tạm đóng cửa để gieo hạt bảo dưỡng (ĐÚNG)\n- 2. Công viên đóng cửa vĩnh viễn (ĐÚNG)\n- 3. Cấm dắt thú cưng\n- 4. Thu phí vào cổng công viên\n\n📄 Trích PDF gốc (试题解析):\n(27) 1 公告内容显示公园草坪区域因养护暂封闭两周。",
      "correctOption": 2
    },
    "63": {
      "snippet": "Điều Tom phải báo cho anh Yamada",
      "explanation": "🎯 Đáp án đúng: [3] Điều Tom phải báo cho anh Yamada\n\n💬 Dịch nghĩa câu:\n\"Sau khi nhận cuộc gọi từ khách hàng, Tom bắt buộc phải báo cho anh Yamada biết về sự thay đổi thời gian cuộc hẹn sang 14:00.\"\n\n💡 Phân tích & Giải thích:\n• Nội dung lời nhắn: đối tác gọi điện báo kẹt xe nên xin lùi lịch hẹn từ 13:00 sang 14:00 chiều nay.\n\n🔍 Phân tích các lựa chọn:\n- 1. Hủy bỏ cuộc gặp\n- 2. Thay đổi địa điểm sang nhà hàng\n- 3. Chuẩn bị thêm quà biếu (ĐÚNG)\n- 4. Báo lại giờ hẹn chuyển sang 14:00 chiều (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(28) 4 汤姆先生必须告知山田先生会面时间变更为下午2点。",
      "correctOption": 3
    },
    "64": {
      "snippet": "Công việc KHÔNG PHẢI của anh Ishida",
      "explanation": "🎯 Đáp án đúng: [2] Công việc KHÔNG PHẢI của anh Ishida\n\n💬 Dịch nghĩa câu:\n\"Theo sự phân công nhiệm vụ trong nhóm, việc đi thu tiền quỹ dã ngoại không thuộc trách nhiệm của anh Ishida mà do cô Tanaka phụ trách.\"\n\n💡 Phân tích & Giải thích:\n• Đối chiếu bảng phân công: Ishida phụ trách đặt xe và liên hệ nhà hàng, việc thu tiền kinh phí do Tanaka đảm nhiệm.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đặt xe buýt đưa đón\n- 2. Liên hệ đặt chỗ nhà hàng (ĐÚNG)\n- 3. Thu tiền kinh phí dã ngoại của các thành viên (ĐÚNG - Đây là việc của Tanaka)\n- 4. In bản đồ phát tay\n\n📄 Trích PDF gốc (试题解析):\n(29) 3 选项3收取活动经费是由田中负责的, 不属于石田的工作。",
      "correctOption": 2
    },
    "65": {
      "snippet": "Đặc điểm của lữ quán Ryokan",
      "explanation": "🎯 Đáp án đúng: [4] Đặc điểm của lữ quán Ryokan\n\n💬 Dịch nghĩa câu:\n\"Lữ quán Ryokan mà tác giả và gia đình lưu trú là một khu nhà trọ cổ kính bằng gỗ nép mình bên sườn núi và có suối nước nóng lộ thiên.\"\n\n💡 Phân tích & Giải thích:\n• Đoạn văn miêu tả: lữ quán xây dựng hoàn toàn bằng gỗ thông thơm ngát, xung quanh bao bọc bởi rừng phong và có bể tắm Onsen ngoài trời ngắm cảnh núi non.\n\n🔍 Phân tích các lựa chọn:\n- 1. Khách sạn hiện đại cao tầng\n- 2. Nhà trọ truyền thống bằng gỗ có suối nước nóng lộ thiên (ĐÚNG)\n- 3. Nhà nghỉ ven biển\n- 4. Căn hộ chung cư (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(30) 2 提到的旅馆是依山而建、带有露天温泉的传统木造日式旅馆。",
      "correctOption": 4
    },
    "66": {
      "snippet": "Cách thức di chuyển từ ga về lữ quán",
      "explanation": "🎯 Đáp án đúng: [4] Cách thức di chuyển từ ga về lữ quán\n\n💬 Dịch nghĩa câu:\n\"Từ nhà ga trung tâm, khách lưu trú sẽ được xe đưa đón chuyên dụng của lữ quán đón miễn phí và chở thẳng về tận cửa quán.\"\n\n💡 Phân tích & Giải thích:\n• Thông tin chỉ dẫn trong bài: ra khỏi cửa ga chỉ cần đợi ở cột mốc số 2, xe buýt đưa đón màu trắng của lữ quán sẽ tới đón khách.\n\n🔍 Phân tích các lựa chọn:\n- 1. Tự đi bộ leo núi\n- 2. Bắt xe taxi tự túc\n- 3. Đi xe buýt đưa đón miễn phí của chính lữ quán (ĐÚNG)\n- 4. Đi tàu hỏa leo núi (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(31) 3 从车站前往旅馆的方式是乘坐旅馆提供的免费接送巴士。",
      "correctOption": 4
    },
    "67": {
      "snippet": "Việc làm đầu tiên sau khi tới nơi",
      "explanation": "🎯 Đáp án đúng: [1] Việc làm đầu tiên sau khi tới nơi\n\n💬 Dịch nghĩa câu:\n\"Ngay sau khi làm thủ tục nhận phòng và cất hành lý, tác giả đã lập tức đi ngâm mình thư giãn trong dòng suối nước nóng ấm áp.\"\n\n💡 Phân tích & Giải thích:\n• Chi tiết trong bài kể lại: cả ngày đi lại mệt mỏi nên sau khi nhận phòng, tác giả đã khoác áo Yukata và đi ngay ra bể Onsen ngâm mình.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đi ngâm mình thư giãn trong suối nước nóng Onsen (ĐÚNG) (ĐÚNG)\n- 2. Đi dạo quanh phố xá mua sắm\n- 3. Ăn bữa tối thịnh soạn\n- 4. Lên giường đi ngủ ngay\n\n📄 Trích PDF gốc (试题解析):\n(32) 1 到达旅馆整理完行李后首先去享受了温泉浴。",
      "correctOption": 1
    },
    "68": {
      "snippet": "Cuộc sống được nhắc tới ở đoạn kết",
      "explanation": "🎯 Đáp án đúng: [3] Cuộc sống được nhắc tới ở đoạn kết\n\n💬 Dịch nghĩa câu:\n\"Cụm từ 'cuộc sống như thế này' ám chỉ nhịp sống thanh bình, chậm rãi, thư thái tâm hồn và hòa mình cùng với thiên nhiên cây cỏ.\"\n\n💡 Phân tích & Giải thích:\n• Đoạn kết đúc kết lại niềm khao khát: sau những ngày tháng bận rộn hối hả nơi đô thị, được sống chậm rãi và hòa mình với thiên nhiên là điều quý giá nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Cuộc sống tiện nghi ở thành phố lớn\n- 2. Cuộc sống làm việc thâu đêm\n- 3. Cuộc sống chỉ ăn và ngủ (ĐÚNG)\n- 4. Nhịp sống thanh bình, thư thả hòa mình trọn vẹn cùng thiên nhiên (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(33) 4 指离开都市喧嚣、悠闲自在且融于大自然的慢节奏生活。",
      "correctOption": 3
    },
    "69": {
      "snippet": "Chi phí thuê xe đạp trong ngày",
      "explanation": "🎯 Đáp án đúng: [2] Chi phí thuê xe đạp trong ngày\n\n💬 Dịch nghĩa câu:\n\"Theo bảng giá dịch vụ cho thuê phương tiện của khu du lịch, chi phí thuê 1 chiếc xe đạp thể thao trọn vẹn trong một ngày là 500 yên.\"\n\n💡 Phân tích & Giải thích:\n• Tra cứu bảng giá mục 'Thuê xe đạp (レンタサイクル)': mức giá thuê cả ngày (1日利用) ghi rõ mức phí là 500円.\n\n🔍 Phân tích các lựa chọn:\n- 1. Miễn phí\n- 2. 500 yên cho cả ngày sử dụng (ĐÚNG) (ĐÚNG)\n- 3. 1.000 yên\n- 4. 2.000 yên\n\n📄 Trích PDF gốc (试题解析):\n(34) 2 租借自行车一整天的费用明确标注为500日元。",
      "correctOption": 2
    },
    "70": {
      "snippet": "Quy trình đối với người muốn tham gia thi đấu bóng rổ",
      "explanation": "🎯 Đáp án đúng: [1] Quy trình đối với người muốn tham gia thi đấu bóng rổ\n\n💬 Dịch nghĩa câu:\n\"Người muốn học luật chơi và kỹ năng cơ bản trước khi tham gia thi đấu bắt buộc phải đăng ký tham gia lớp tập huấn căn bản buổi sáng.\"\n\n💡 Phân tích & Giải thích:\n• Bảng hướng dẫn ghi rõ: để đảm bảo an toàn thi đấu, những bạn chưa nắm luật bắt buộc phải hoàn thành khóa học căn bản (基本講習) diễn ra lúc 9:30 sáng.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đăng ký tham gia khóa tập huấn luật cơ bản vào buổi sáng trước (ĐÚNG) (ĐÚNG)\n- 2. Trực tiếp ra sân thi đấu ngay\n- 3. Nộp thêm 5.000 yên\n- 4. Mua đồng phục thi đấu mới\n\n📄 Trích PDF gốc (试题解析):\n(35) 1 想要学习规则后再参加比赛的人必须先报名上午的基础培训课。",
      "correctOption": 1
    },
    "71": {
      "snippet": "Nhiệm vụ bạn nam làm trước tiên",
      "explanation": "🎯 Đáp án đúng: [4] Nhiệm vụ bạn nam làm trước tiên\n\n💬 Dịch nghĩa câu:\n\"Bạn nam trước hết sẽ đi quét dọn sạch sẽ khoảng sân trước cửa nhà trước khi đem tưới nước cho vườn hoa.\"\n\n💡 Phân tích & Giải thích:\n• Mẹ dặn dò: lá rụng nhiều đầy sân, con quét sạch lá cây trước rồi hãy cầm vòi tưới hoa nhé.\n\n🔍 Phân tích các lựa chọn:\n- 1. Tưới nước cho vườn hoa\n- 2. Thu dọn rác trong bếp\n- 3. Quét dọn sạch lá rụng ở khoảng sân trước cửa (ĐÚNG)\n- 4. Cắt tỉa cành cây (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (1): 男の人はまず何をしますか。 正解: [3]",
      "audioScriptJa": "母：庭の落ち葉をまず綺麗に掃いてくれる？水やりはそのあとでいいから。\n男：うん、わかった。先に庭を掃くね。",
      "audioScriptVi": "Mẹ: Con quét dọn sạch lá rụng ngoài sân trước giúp mẹ được không? Tưới cây thì để sau cũng được.\nNam: Vâng, con hiểu rồi, con quét sân trước nhé.",
      "correctOption": 4
    },
    "72": {
      "snippet": "Số lượng vé xe buýt cần mua",
      "explanation": "🎯 Đáp án đúng: [3] Số lượng vé xe buýt cần mua\n\n💬 Dịch nghĩa câu:\n\"Người phụ nữ sẽ đến quầy bán vé mua tổng cộng 4 chiếc vé xe buýt khứ hồi dành cho cả gia đình.\"\n\n💡 Phân tích & Giải thích:\n• Cuộc đối thoại thống nhất: cả gia đình gồm 2 vợ chồng và 2 đứa con đi chơi về trong ngày nên cần mua 4 vé khứ hồi.\n\n🔍 Phân tích các lựa chọn:\n- 1. Mua 4 vé xe buýt khứ hồi (ĐÚNG)\n- 2. Mua 2 vé một chiều\n- 3. Mua 6 vé xe buýt (ĐÚNG)\n- 4. Mua vé tháng\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (2): 女の人は切符を何枚買いますか。 正解: [1]",
      "audioScriptJa": "女：家族4人分だから、往復切符を4枚買えばいいのね。\n男：うん、頼むよ。",
      "audioScriptVi": "Nữ: Cả nhà 4 người nên em mua 4 vé khứ hồi là được đúng không anh?\nNam: Ừ, nhờ em mua giúp nhé.",
      "correctOption": 3
    },
    "73": {
      "snippet": "Thời gian học sinh cần có mặt ở trường",
      "explanation": "🎯 Đáp án đúng: [4] Thời gian học sinh cần có mặt ở trường\n\n💬 Dịch nghĩa câu:\n\"Vào ngày thi tốt nghiệp ngày mai, toàn bộ học sinh bắt buộc phải có mặt tại phòng thi trước 8:45 sáng.\"\n\n💡 Phân tích & Giải thích:\n• Giám thị nhắc nhở: bài thi bắt đầu lúc 9:00, học sinh phải vào phòng ổn định chỗ ngồi muộn nhất là 8:45.\n\n🔍 Phân tích các lựa chọn:\n- 1. Lúc 8:00 sáng\n- 2. Lúc 8:30 sáng\n- 3. Lúc 9:00 sáng\n- 4. Có mặt tại phòng thi trước 8:45 sáng (ĐÚNG) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (3): 学生は何時までに教室に入らなければなりませんか。 正解: [4]",
      "audioScriptJa": "先生：試験は9時開始ですが、8時45分までには必ず着席していてください。",
      "audioScriptVi": "Thầy giáo: Bài thi bắt đầu lúc 9h, nhưng muộn nhất 8h45 các em bắt buộc phải ngồi vào đúng vị trí nhé.",
      "correctOption": 4
    },
    "74": {
      "snippet": "Hành động tiếp theo của bạn nữ",
      "explanation": "🎯 Đáp án đúng: [3] Hành động tiếp theo của bạn nữ\n\n💬 Dịch nghĩa câu:\n\"Bạn nữ sẽ trực tiếp mang đơn xin gia hạn thẻ sinh viên lên nộp tại phòng công tác sinh viên ở tầng 2.\"\n\n💡 Phân tích & Giải thích:\n• Thầy hướng dẫn bảo đã ký duyệt xong, em cầm tờ đơn này lên nộp trực tiếp cho phòng sinh viên tầng 2 là xong.\n\n🔍 Phân tích các lựa chọn:\n- 1. Về nhà chờ kết quả\n- 2. Mang đơn lên nộp tại phòng công tác sinh viên tầng 2 (ĐÚNG)\n- 3. Chụp ảnh thẻ mới (ĐÚNG)\n- 4. Gửi bưu điện\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (4): 女の学生はこれから何をしますか。 正解: [2]",
      "audioScriptJa": "先生：サインしたから、この申請書を2階の学生課に出してきてね。\n女：はい、すぐ持って行きます。",
      "audioScriptVi": "Thầy giáo: Thầy ký duyệt xong rồi, em mang đơn này lên nộp cho phòng sinh viên tầng 2 nhé.\nNữ: Vâng, em mang lên ngay ạ.",
      "correctOption": 3
    },
    "75": {
      "snippet": "Vị trí cất chiếc chìa khóa dự phòng",
      "explanation": "🎯 Đáp án đúng: [2] Vị trí cất chiếc chìa khóa dự phòng\n\n💬 Dịch nghĩa câu:\n\"Người phụ nữ dặn người nam hãy cất chiếc chìa khóa dự phòng vào chiếc hộp nhỏ trong ngăn kéo bàn làm việc.\"\n\n💡 Phân tích & Giải thích:\n• Để tránh thất lạc, chìa khóa phòng cần được bỏ vào hộp sắt và cất sâu trong ngăn kéo bàn làm việc.\n\n🔍 Phân tích các lựa chọn:\n- 1. Cất vào hộp sắt trong ngăn kéo bàn làm việc (ĐÚNG)\n- 2. Treo ở móc cạnh cửa ra vào (ĐÚNG)\n- 3. Bỏ trong túi xách\n- 4. Để trên kệ sách\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (5): 予備の鍵をどこにしまいますか。 正解: [1]",
      "audioScriptJa": "女：机の引き出しの中にある小さい缶に入れておいてね。\n男：了解、引き出しの缶の中ね。",
      "audioScriptVi": "Nữ: Em cất vào chiếc hộp sắt nhỏ trong ngăn kéo bàn làm việc giúp chị nhé.\nNam: Nhất trí, trong hộp ở ngăn kéo bàn nhé.",
      "correctOption": 2
    },
    "76": {
      "snippet": "Cách thức gửi tài liệu cho đối tác",
      "explanation": "🎯 Đáp án đúng: [2] Cách thức gửi tài liệu cho đối tác\n\n💬 Dịch nghĩa câu:\n\"Người nam quyết định sẽ chuyển tập hồ sơ qua dịch vụ chuyển phát nhanh hỏa tốc để đối tác nhận ngay trong chiều.\"\n\n💡 Phân tích & Giải thích:\n• Tài liệu khẩn cấp đối tác cần trước 17:00, gửi bưu điện thường không kịp nên chọn dịch vụ chuyển phát nhanh bằng xe máy.\n\n🔍 Phân tích các lựa chọn:\n- 1. Gửi qua bưu điện thường\n- 2. Gửi tệp đính kèm qua email (ĐÚNG)\n- 3. Sử dụng dịch vụ chuyển phát nhanh hỏa tốc (ĐÚNG)\n- 4. Tự mình đi tàu điện mang tới\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (6): 男の人は書類をどうやって送りますか。 正解: [3]",
      "audioScriptJa": "男：急ぎだから、バイク便の速達で届けてもらうことにするよ。\n女：それが一番確実ね。",
      "audioScriptVi": "Nam: Việc này khẩn cấp nên anh sẽ gọi dịch vụ chuyển phát nhanh bằng xe máy giao luôn trong chiều.\nNữ: Cách đó là chắc chắn nhất đấy anh.",
      "correctOption": 2
    },
    "77": {
      "snippet": "Món ăn hai người quyết định chọn cho bữa trưa",
      "explanation": "🎯 Đáp án đúng: [3] Món ăn hai người quyết định chọn cho bữa trưa\n\n💬 Dịch nghĩa câu:\n\"Hai bạn thống nhất sẽ ghé vào quán mì Udon truyền thống ở góc phố để ăn trưa cho nhanh và ấm bụng.\"\n\n💡 Phân tích & Giải thích:\n• Quán sushi quá đông phải xếp hàng lâu, quán cà ri thì cay, nên hai người chọn quán mì Udon vừa nhanh vừa nóng hổi.\n\n🔍 Phân tích các lựa chọn:\n- 1. Ăn sushi hải sản\n- 2. Ăn mì Udon nóng hổi ở góc phố (ĐÚNG)\n- 3. Ăn cơm cà ri cay (ĐÚNG)\n- 4. Mua bánh mì kẹp thịt\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (7): 二人はお昼ご飯に何を食べますか。 正解: [2]",
      "audioScriptJa": "女：うどん屋ならすぐ座れるし、温まるからうどんにしない？\n男：いいね、うどんにしよう！",
      "audioScriptVi": "Nữ: Quán mì Udon có chỗ ngồi ngay mà ăn lại ấm người, tụi mình ăn Udon nhé?\nNam: Ý hay đấy, ăn Udon thôi!",
      "correctOption": 3
    },
    "78": {
      "snippet": "Nhiệm vụ chuẩn bị buổi tiệc chia tay",
      "explanation": "🎯 Đáp án đúng: [4] Nhiệm vụ chuẩn bị buổi tiệc chia tay\n\n💬 Dịch nghĩa câu:\n\"Bạn nữ nhận trách nhiệm đi liên hệ với nhà hàng để đặt trước phòng tiệc riêng cho 15 người.\"\n\n💡 Phân tích & Giải thích:\n• Phân công công việc: bạn nam mua quà lưu niệm và viết thiệp, bạn nữ lo việc gọi điện đặt phòng riêng ở nhà hàng.\n\n🔍 Phân tích các lựa chọn:\n- 1. Viết thiệp chúc mừng\n- 2. Mua quà lưu niệm tặng thầy\n- 3. Thu tiền của mọi người\n- 4. Gọi điện thoại đặt trước phòng tiệc riêng ở nhà hàng (ĐÚNG) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (8): 女の人は何を準備しますか。 正解: [4]",
      "audioScriptJa": "男：僕がプレゼントを用意するから、レストランの個室の予約をお願いできる？\n女：うん、15人で予約しておくね。",
      "audioScriptVi": "Nam: Tớ chuẩn bị quà tặng, cậu gọi điện đặt phòng tiệc riêng ở nhà hàng giúp tớ được không?\nNữ: Ừ, tớ sẽ gọi đặt phòng cho 15 người nhé.",
      "correctOption": 4
    },
    "79": {
      "snippet": "Lý do bạn nữ quyết định chuyển nhà",
      "explanation": "🎯 Đáp án đúng: [2] Lý do bạn nữ quyết định chuyển nhà\n\n💬 Dịch nghĩa câu:\n\"Bạn nữ chuyển nhà là vì căn hộ mới nằm ngay cạnh công viên cây xanh thoáng mát, rất yên tĩnh để tập trung nghỉ ngơi.\"\n\n💡 Phân tích & Giải thích:\n• Căn hộ cũ ở sát mặt đường lớn ồn ào đêm ngày, căn hộ mới view nhìn ra công viên cây xanh vô cùng thanh bình.\n\n🔍 Phân tích các lựa chọn:\n- 1. Vì giá thuê rẻ hơn nhiều\n- 2. Vì nằm cạnh công viên thoáng mát và cực kỳ yên tĩnh (ĐÚNG) (ĐÚNG)\n- 3. Vì phòng rộng hơn gấp đôi\n- 4. Vì ở chung cùng bạn thân\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (1): 女の人はなぜ引っ越しましたか。 正解: [2]",
      "audioScriptJa": "女：前の部屋は通りに面していてうるさかったの。今度の部屋は公園の隣でとても静かなのよ。",
      "audioScriptVi": "Nữ: Căn phòng cũ ở ngay sát mặt đường xe cộ ồn ào lắm. Căn phòng mới này ở cạnh công viên nên cực kỳ yên tĩnh luôn.",
      "correctOption": 2
    },
    "80": {
      "snippet": "Điểm nổi bật của khóa học tiếng Nhật online",
      "explanation": "🎯 Đáp án đúng: [3] Điểm nổi bật của khóa học tiếng Nhật online\n\n💬 Dịch nghĩa câu:\n\"Điểm ưu việt nhất của khóa học trực tuyến này là học viên có thể linh hoạt chọn khung giờ học phù hợp với lịch cá nhân.\"\n\n💡 Phân tích & Giải thích:\n• Bạn nam khen ngợi: ban ngày bận đi làm thêm, buổi tối có thể tự chọn khung giờ học linh hoạt từ 20:00 đến 22:00 rất thuận tiện.\n\n🔍 Phân tích các lựa chọn:\n- 1. Thời gian học tập vô cùng linh hoạt theo lịch cá nhân (ĐÚNG)\n- 2. Học phí hoàn toàn miễn phí\n- 3. Được cấp sách giáo khoa miễn phí (ĐÚNG)\n- 4. Giáo viên đến tận nhà dạy kèm\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (2): オンライン講座のどこが一番良いと言っていますか。 正解: [1]",
      "audioScriptJa": "男：自分の都合に合わせて好きな時間を選んで受けられるのが一番助かるよ。",
      "audioScriptVi": "Nam: Được tự do chọn khung giờ học phù hợp theo lịch rảnh của bản thân là điều mình thấy tiện lợi nhất.",
      "correctOption": 3
    },
    "81": {
      "snippet": "Lý do người đàn ông quyết định mua chiếc xe đạp mới",
      "explanation": "🎯 Đáp án đúng: [3] Lý do người đàn ông quyết định mua chiếc xe đạp mới\n\n💬 Dịch nghĩa câu:\n\"Người đàn ông mua xe đạp mới là vì chiếc xe đạp cũ đã bị rỉ sét xích líp và không còn đảm bảo an toàn khi đi lại.\"\n\n💡 Phân tích & Giải thích:\n• Chiếc xe cũ dùng hơn 8 năm, phanh mòn và xích hay tuột nên anh quyết định đầu tư mua xe mới để đi làm an toàn.\n\n🔍 Phân tích các lựa chọn:\n- 1. Vì thích mẫu mã thời trang\n- 2. Vì được giảm giá sốc\n- 3. Vì chiếc xe cũ đã quá cũ kỹ, hư hỏng không còn an toàn (ĐÚNG) (ĐÚNG)\n- 4. Vì bị bạn bè rủ rê\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (3): 男の人はなぜ新しい自転車を買いましたか。 正解: [3]",
      "audioScriptJa": "男：もう8年も乗っていてブレーキの調子も悪かったから、安全のために買い替えたんだ。",
      "audioScriptVi": "Nam: Xe cũ tớ đi tận 8 năm rồi, phanh xe cũng hỏng hóc suốt nên tớ quyết định đổi xe mới cho đảm bảo an toàn.",
      "correctOption": 3
    },
    "82": {
      "snippet": "Điều người phụ nữ thích nhất ở hội chợ sách cũ",
      "explanation": "🎯 Đáp án đúng: [1] Điều người phụ nữ thích nhất ở hội chợ sách cũ\n\n💬 Dịch nghĩa câu:\n\"Điều khiến người phụ nữ hào hứng nhất chính là tình cờ tìm thấy được cuốn sách quý hiếm mà mình đã cất công tìm kiếm suốt nhiều năm.\"\n\n💡 Phân tích & Giải thích:\n• Hội chợ đông người, sách bụi bặm nhưng cô vỡ òa sung sướng vì lục tìm được đúng cuốn tiểu thuyết xuất bản từ 20 năm trước.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sách được bán đại hạ giá 100 yên (ĐÚNG)\n- 2. Tìm thấy được cuốn sách quý hiếm đã săn lùng bấy lâu nay (ĐÚNG)\n- 3. Được gặp gỡ các tác giả nổi tiếng\n- 4. Được tặng đồ lưu niệm miễn phí\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (4): 古本市で何が一番良かったと言っていますか。 正解: [2]",
      "audioScriptJa": "女：何年もずっと探していた絶版の本が偶然見つかって、本当に嬉しかったわ！",
      "audioScriptVi": "Nữ: Tớ tình cờ tìm thấy đúng cuốn sách ngừng xuất bản mà tớ đã cất công lùng sục suốt bao năm nay, hạnh phúc vô cùng luôn!",
      "correctOption": 1
    },
    "83": {
      "snippet": "Kế hoạch tổ chức buổi cắm trại dã ngoại",
      "explanation": "🎯 Đáp án đúng: [2] Kế hoạch tổ chức buổi cắm trại dã ngoại\n\n💬 Dịch nghĩa câu:\n\"Do dự báo thời tiết cuối tuần có mưa giông lớn, nhóm quyết định sẽ dời lịch cắm trại sang thứ Bảy tuần kế tiếp.\"\n\n💡 Phân tích & Giải thích:\n• Để đảm bảo an toàn cho cả đoàn, nhóm thống nhất không cố đi dưới trời mưa mà hoãn lại 1 tuần đợi trời nắng đẹp.\n\n🔍 Phân tích các lựa chọn:\n- 1. Vẫn cắm trại bình thường dưới mưa\n- 2. Chuyển sang đi ăn lẩu tại nhà (ĐÚNG)\n- 3. Hủy bỏ chuyến đi vĩnh viễn\n- 4. Dời lịch cắm trại sang thứ Bảy tuần kế tiếp khi thời tiết đẹp (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (5): キャンプはどうすることにしましたか。 正解: [4]",
      "audioScriptJa": "男：今週末は大雨らしいから、来週の土曜日に延期しよう。",
      "audioScriptVi": "Nam: Cuối tuần này nghe dự báo mưa to lắm, tụi mình dời lịch sang thứ Bảy tuần sau nhé.",
      "correctOption": 2
    },
    "84": {
      "snippet": "Món quà lưu niệm bạn nam mang về tặng",
      "explanation": "🎯 Đáp án đúng: [3] Món quà lưu niệm bạn nam mang về tặng\n\n💬 Dịch nghĩa câu:\n\"Bạn nam sau chuyến đi công tác Hokkaido đã mua một hộp bánh quy bơ sô-cô-la trắng nổi tiếng về làm quà cho cả phòng.\"\n\n💡 Phân tích & Giải thích:\n• Đặc sản trứ danh của Hokkaido là bánh quy kẹp sô-cô-la trắng, bạn nam mua hộp to để mọi người cùng thưởng thức giờ giải lao.\n\n🔍 Phân tích các lựa chọn:\n- 1. Hộp bánh quy bơ sô-cô-la trắng đặc sản Hokkaido (ĐÚNG)\n- 2. Trái cây tươi dưa lưới\n- 3. Trà xanh đóng chai (ĐÚNG)\n- 4. Hải sản mực khô\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (6): 北海道のお土産は何ですか。 正解: [1]",
      "audioScriptJa": "男：北海道で一番有名なホワイトチョコのクッキーを買ってきたよ。みんなで食べてね。",
      "audioScriptVi": "Nam: Tớ mua món bánh quy sô-cô-la trắng nổi tiếng nhất Hokkaido về này, mọi người cùng ăn nhé.",
      "correctOption": 3
    },
    "85": {
      "snippet": "Lý do bạn nữ chăm chỉ luyện tập chạy bộ",
      "explanation": "🎯 Đáp án đúng: [1] Lý do bạn nữ chăm chỉ luyện tập chạy bộ\n\n💬 Dịch nghĩa câu:\n\"Bạn nữ kiên trì chạy bộ mỗi ngày là để rèn luyện thể lực chuẩn bị tham gia giải chạy việt dã marathon của thành phố.\"\n\n💡 Phân tích & Giải thích:\n• Mục tiêu cụ thể được chia sẻ: tháng 11 tới có giải chạy 10km của thành phố nên cô đặt quyết tâm hoàn thành tốt đường đua.\n\n🔍 Phân tích các lựa chọn:\n- 1. Vì muốn giảm cân nhanh (ĐÚNG)\n- 2. Vì bác sĩ bắt buộc tập\n- 3. Rèn luyện thể lực để tham gia giải chạy việt dã marathon sắp tới (ĐÚNG)\n- 4. Vì chạy cùng bạn trai\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (7): 女の人はなぜジョギングをしているのですか。 正解: [3]",
      "audioScriptJa": "女：秋の市民マラソン大会に出場するから、体力をつけるために毎日走っているの。",
      "audioScriptVi": "Nữ: Mùa thu này tớ tham gia giải chạy marathon của thành phố, nên ngày nào tớ cũng chạy bộ để rèn luyện thể lực.",
      "correctOption": 1
    },
    "86": {
      "snippet": "Muốn nhờ người khác bấm hộ kiểu ảnh",
      "explanation": "🎯 Đáp án đúng: [2] Muốn nhờ người khác bấm hộ kiểu ảnh\n\n💬 Dịch nghĩa câu:\n\"Đang đứng trước phong cảnh tuyệt đẹp, muốn nhờ du khách gần đó chụp ảnh giúp: 'Xin lỗi, anh có thể bấm giúp tôi một kiểu ảnh được không ạ?'\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu chuẩn nhờ chụp ảnh: 「すみません、写真を撮っていただけませんか。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Tôi chụp ảnh cho anh nhé\n- 2. Máy ảnh này đẹp lắm đấy (ĐÚNG)\n- 3. Xin lỗi, anh có thể chụp giúp tôi một kiểu ảnh được không ạ? (ĐÚNG)\n- 4. Anh đứng vào đây chụp cùng nhé\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (1): 写真を撮ってもらいたいです。何と言いますか。 正解: [3]",
      "audioScriptJa": "「すみません、写真を撮っていただけませんか。」",
      "audioScriptVi": "Xin lỗi, anh có thể chụp giúp tôi một tấm ảnh được không ạ?",
      "correctOption": 2
    },
    "87": {
      "snippet": "Lời chúc người chuẩn bị bước vào phòng thi",
      "explanation": "🎯 Đáp án đúng: [1] Lời chúc người chuẩn bị bước vào phòng thi\n\n💬 Dịch nghĩa câu:\n\"Thấy bạn học sắp bước vào phòng thi đại học đầy căng thẳng: 'Cố lên nhé, bạn nhất định sẽ làm bài thật tốt!'\"\n\n💡 Phân tích & Giải thích:\n• Lời động viên khích lệ chuẩn: 「頑張ってください！」\n\n🔍 Phân tích các lựa chọn:\n- 1. Cố gắng lên nhé! (ĐÚNG) (ĐÚNG)\n- 2. Cảm ơn bạn đã thi\n- 3. Bạn thi trượt rồi à\n- 4. Đừng đi thi nữa\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (2): これから試験を受ける友達を励まします。何と言いますか。 正解: [1]",
      "audioScriptJa": "「頑張ってください！」",
      "audioScriptVi": "Cố gắng lên nhé bạn!",
      "correctOption": 1
    },
    "88": {
      "snippet": "Hỏi mượn chiếc bút bi của đồng nghiệp",
      "explanation": "🎯 Đáp án đúng: [2] Hỏi mượn chiếc bút bi của đồng nghiệp\n\n💬 Dịch nghĩa câu:\n\"Đang cần ghi nhanh số điện thoại mà bút hết mực: 'Cậu cho mình mượn cây bút bi một lát được không?'\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu mượn đồ dùng học tập: 「ペンを貸してもらえますか。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Bút này mực đẹp ghê\n- 2. Cậu cho mình mượn cây bút bi một chút được không? (ĐÚNG) (ĐÚNG)\n- 3. Bút của cậu rơi kìa\n- 4. Tôi tặng cậu cây bút này nhé\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (3): ペンを借りたいです。何と言いますか。 正解: [2]",
      "audioScriptJa": "「ペンを貸してもらえますか。」",
      "audioScriptVi": "Cậu cho mình mượn cây bút một chút được không ạ?",
      "correctOption": 2
    },
    "89": {
      "snippet": "Xin phép được ngồi vào chiếc ghế trống",
      "explanation": "🎯 Đáp án đúng: [1] Xin phép được ngồi vào chiếc ghế trống\n\n💬 Dịch nghĩa câu:\n\"Trong quán ăn đông khách thấy chiếc ghế đối diện còn trống: 'Chỗ này đã có ai ngồi chưa ạ? Tôi có thể ngồi đây được không?'\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu chuẩn xin ngồi ghế: 「ここ、座ってもいいですか。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Ghế này êm lắm (ĐÚNG)\n- 2. Bạn đứng dậy đi\n- 3. Chỗ này tôi có thể ngồi được không ạ? (ĐÚNG)\n- 4. Ghế này bán bao nhiêu?\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (4): 空いている席に座りたいです。何と言いますか。 正解: [3]",
      "audioScriptJa": "「ここ、座ってもいいですか。」",
      "audioScriptVi": "Chỗ này tôi có thể ngồi được không ạ?",
      "correctOption": 1
    },
    "90": {
      "snippet": "Chào tạm biệt đồng nghiệp khi tan ca",
      "explanation": "🎯 Đáp án đúng: [2] Chào tạm biệt đồng nghiệp khi tan ca\n\n💬 Dịch nghĩa câu:\n\"Hoàn thành ca làm việc bước ra về trước: 'Mọi người đã vất vả rồi ạ, tôi xin phép về trước nhé!'\"\n\n💡 Phân tích & Giải thích:\n• Lời chào tiêu chuẩn khi hết ca làm: 「お疲れ様でした。お先に失礼します。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Mọi người vất vả rồi ạ, tôi xin phép về trước nhé! (ĐÚNG)\n- 2. Ngày mai tôi không đến nữa (ĐÚNG)\n- 3. Tôi mệt mỏi lắm rồi\n- 4. Chúc mọi người ngủ ngon\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (5): 仕事が終わって先に帰ります。何と言いますか。 正解: [1]",
      "audioScriptJa": "「お疲れ様でした。お先に失礼します。」",
      "audioScriptVi": "Mọi người vất vả rồi, tôi xin phép về trước ạ!",
      "correctOption": 2
    },
    "91": {
      "snippet": "Rủ rê: 'Tối nay cùng đi ăn mì Ramen nhé?'",
      "explanation": "🎯 Đáp án đúng: [3] Rủ rê: 'Tối nay cùng đi ăn mì Ramen nhé?'\n\n💬 Dịch nghĩa câu:\n\"Hào hứng nhận lời rủ ăn uống: 'Hay quá, nhất định cùng đi nhé, tớ cũng đang thèm mì Ramen!'\"\n\n💡 Phân tích & Giải thích:\n• Đồng ý lời rủ ăn uống: 「いいですね、ぜひ行きましょう！」\n\n🔍 Phân tích các lựa chọn:\n- 1. Mì Ramen không ngon đâu\n- 2. Hay quá, nhất định cùng đi nhé! (ĐÚNG)\n- 3. Tôi nấu cơm xong rồi (ĐÚNG)\n- 4. Mì Ramen đắt lắm\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (1): 今晩、ラーメンを食べに行きませんか。 正解: [2]",
      "audioScriptJa": "男：今晩、ラーメンを食べに行きませんか。\n女：いいですね、ぜひ行きましょう！",
      "audioScriptVi": "Nam: Tối nay cậu có muốn cùng tớ đi ăn mì Ramen không?\nNữ: Hay quá, nhất định chúng mình cùng đi nhé!",
      "correctOption": 3
    },
    "92": {
      "snippet": "Hỏi thăm: 'Quyển tiểu thuyết này bạn đọc thấy có hay không?'",
      "explanation": "🎯 Đáp án đúng: [2] Hỏi thăm: 'Quyển tiểu thuyết này bạn đọc thấy có hay không?'\n\n💬 Dịch nghĩa câu:\n\"Chia sẻ cảm nhận hào hứng: 'Hay tuyệt vời luôn ấy, tình tiết cực kỳ lôi cuốn làm tớ đọc một mạch không dứt ra được!'\"\n\n💡 Phân tích & Giải thích:\n• Khen ngợi sách hay: 「すごく面白くて、一気に読んじゃいました。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Sách này dày lắm\n- 2. Tôi mua ở hiệu sách (ĐÚNG)\n- 3. Hay tuyệt vời luôn cậu ạ, tớ đọc một lèo là hết cuốn luôn! (ĐÚNG)\n- 4. Chữ Hán khó đọc quá\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (2): この小説、面白かったですか。 正解: [3]",
      "audioScriptJa": "女：この小説、面白かったですか。\n男：すごく面白くて、一気に読んじゃいました。",
      "audioScriptVi": "Nữ: Cuốn tiểu thuyết đó cậu đọc thấy có hay không?\nNam: Hay cực kỳ luôn cậu ơi, cuốn hút đến mức tớ đọc một mạch xong luôn đấy.",
      "correctOption": 2
    },
    "93": {
      "snippet": "Cảm ơn: 'Cảm ơn bạn rất nhiều vì đã đón mình ở sân bay nhé!'",
      "explanation": "🎯 Đáp án đúng: [1] Cảm ơn: 'Cảm ơn bạn rất nhiều vì đã đón mình ở sân bay nhé!'\n\n💬 Dịch nghĩa câu:\n\"Đáp lại lời cảm ơn ân cần: 'Không có chi đâu bạn, chuyến bay xa chắc cậu mệt rồi nhỉ!'\"\n\n💡 Phân tích & Giải thích:\n• Phản hồi nhã nhặn: 「いいえ、お疲れ様でした。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Không có gì đâu cậu ơi, cậu bay đường xa vất vả rồi nhé! (ĐÚNG) (ĐÚNG)\n- 2. Lần sau tự đi xe buýt nhé\n- 3. Sân bay đông người quá\n- 4. Tôi không muốn đón đâu\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (3): 空港まで迎えに来てくれて、ありがとう。 正解: [1]",
      "audioScriptJa": "男：空港まで迎えに来てくれて、ありがとう。\n女：いいえ、お疲れ様でした。",
      "audioScriptVi": "Nam: Cảm ơn cậu nhiều vì đã cất công ra tận sân bay đón tớ nhé!\nNữ: Có gì đâu cậu ơi, cậu bay đường dài vất vả rồi nhé.",
      "correctOption": 1
    },
    "94": {
      "snippet": "Hỏi ý kiến: 'Tớ cắt kiểu tóc ngắn này trông có hợp không?'",
      "explanation": "🎯 Đáp án đúng: [2] Hỏi ý kiến: 'Tớ cắt kiểu tóc ngắn này trông có hợp không?'\n\n💬 Dịch nghĩa câu:\n\"Khen ngợi vẻ ngoài tươi tắn: 'Rất là hợp luôn đấy, nhìn cậu trông trẻ trung và năng động hẳn ra!'\"\n\n💡 Phân tích & Giải thích:\n• Khen ngợi kiểu tóc: 「とても似合っていて、素敵ですよ。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Tóc ngắn quá rồi\n- 2. Rất là hợp với cậu luôn đấy, nhìn xinh và đáng yêu lắm! (ĐÚNG) (ĐÚNG)\n- 3. Cắt hết bao nhiêu tiền thế?\n- 4. Đừng cắt tóc nữa\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (4): 髪を切ったんだけど、似合ってるかな？ 正解: [2]",
      "audioScriptJa": "女：髪を切ったんだけど、似合ってるかな？\n男：とても似合っていて、素敵ですよ。",
      "audioScriptVi": "Nữ: Tớ mới cắt tóc ngắn đấy, cậu thấy có hợp với tớ không?\nNam: Hợp cực kỳ luôn cậu ơi, trông xinh xắn và tươi tắn lắm!",
      "correctOption": 2
    },
    "95": {
      "snippet": "Hỏi han tiến độ: 'Bài tập làm văn tuần này bạn đã nộp cho cô giáo chưa?'",
      "explanation": "🎯 Đáp án đúng: [3] Hỏi han tiến độ: 'Bài tập làm văn tuần này bạn đã nộp cho cô giáo chưa?'\n\n💬 Dịch nghĩa câu:\n\"Cập nhật tình trạng: 'Mình đã hoàn thành và nộp cho cô từ hôm qua rồi.'\"\n\n💡 Phân tích & Giải thích:\n• Cập nhật việc đã làm xong: 「はい、昨日もう提出しました。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Bài văn khó viết lắm\n- 2. Tôi chưa viết chữ nào\n- 3. Vâng, hôm qua tớ đã nộp cho cô giáo xong xuôi rồi ạ (ĐÚNG) (ĐÚNG)\n- 4. Cô giáo chưa giao bài mà\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (5): 今週の作文、もう提出しましたか。 正解: [3]",
      "audioScriptJa": "男：今週の作文、もう提出しましたか。\n女：はい、昨日もう提出しました。",
      "audioScriptVi": "Nam: Bài làm văn tuần này cậu đã nộp cho cô giáo chưa?\nNữ: Vâng, hôm qua tớ đã nộp xong xuôi rồi cậu ạ.",
      "correctOption": 3
    },
    "96": {
      "snippet": "Mời nước: 'Trời nắng nóng thế này, bạn uống một ly nước cam ép lạnh nhé?'",
      "explanation": "🎯 Đáp án đúng: [3] Mời nước: 'Trời nắng nóng thế này, bạn uống một ly nước cam ép lạnh nhé?'\n\n💬 Dịch nghĩa câu:\n\"Nhận lời cảm kích: 'Ôi cảm ơn bạn nhiều nhé, đúng lúc tớ đang khát nước quá!'\"\n\n💡 Phân tích & Giải thích:\n• Nhận lời mời nước: 「ありがとうございます、いただきます。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Cảm ơn bạn nhiều nhé, đúng lúc mình đang khát nước quá (ĐÚNG)\n- 2. Nước cam chua lắm\n- 3. Tôi không khát nước (ĐÚNG)\n- 4. Đừng ép nước cam nữa\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (6): 暑いですね、冷たいオレンジジュースはいかがですか。 正解: [1]",
      "audioScriptJa": "女：暑いですね、冷たいオレンジジュースはいかがですか。\n男：ありがとうございます、いただきます。",
      "audioScriptVi": "Nữ: Trời nóng nực quá nhỉ, cậu dùng một ly nước cam ép mát lạnh nhé?\nNam: Ôi cảm ơn cậu nhiều nhé, đúng lúc tớ đang khát quá đây ạ.",
      "correctOption": 3
    },
    "97": {
      "snippet": "Hỏi han: 'Tối nay bạn có rảnh rỗi không, mình qua phòng bạn chơi nhé?'",
      "explanation": "🎯 Đáp án đúng: [1] Hỏi han: 'Tối nay bạn có rảnh rỗi không, mình qua phòng bạn chơi nhé?'\n\n💬 Dịch nghĩa câu:\n\"Vui vẻ chào đón: 'Được chứ, lúc nào cậu ghé qua cũng được hết á!'\"\n\n💡 Phân tích & Giải thích:\n• Sẵn sàng đón bạn đến chơi: 「ええ、いつでもどうぞ！」\n\n🔍 Phân tích các lựa chọn:\n- 1. Tôi đang ngủ đấy (ĐÚNG)\n- 2. Được chứ, cậu ghé qua lúc nào cũng được hết nhé! (ĐÚNG)\n- 3. Phòng tớ bẩn lắm đừng qua\n- 4. Hôm qua tôi ở nhà mà\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (7): 今晩時間ある？部屋に遊びに行ってもいい？ 正解: [2]",
      "audioScriptJa": "男：今晩時間ある？部屋に遊びに行ってもいい？\n女：ええ、いつでもどうぞ！",
      "audioScriptVi": "Nam: Tối nay cậu có rảnh không, tớ ghé qua phòng cậu chơi một lát được không?\nNữ: Ừ được chứ, cậu qua lúc nào cũng được nha!",
      "correctOption": 1
    },
    "98": {
      "snippet": "Hỏi đường: 'Chuyến xe buýt đi đến sân bay bao nhiêu phút thì có một chuyến thế bạn?'",
      "explanation": "🎯 Đáp án đúng: [2] Hỏi đường: 'Chuyến xe buýt đi đến sân bay bao nhiêu phút thì có một chuyến thế bạn?'\n\n💬 Dịch nghĩa câu:\n\"Thông tin tần suất chuyến xe: 'Cứ khoảng 15 phút là lại có một chuyến xuất bến bạn nhé.'\"\n\n💡 Phân tích & Giải thích:\n• Trả lời tần suất chuyến xe: 「15分に1本出ていますよ。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Vé xe buýt 500 yên\n- 2. Cứ tầm 15 phút là có một chuyến xe chạy bạn nhé (ĐÚNG) (ĐÚNG)\n- 3. Xe buýt to lắm\n- 4. Sân bay ở xa lắm\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (8): 空港行きのバスは何分おきに出ていますか。 正解: [2]",
      "audioScriptJa": "女：空港行きのバスは何分おきに出ていますか。\n男：15分に1本出ていますよ。",
      "audioScriptVi": "Nữ: Xe buýt đi sân bay thì mấy phút có một chuyến thế bạn?\nNam: Dạ cứ khoảng 15 phút là có 1 chuyến xuất bến đấy bạn ạ.",
      "correctOption": 2
    },
  },
  "n4-2013-07": {
    "1": {
      "snippet": "味 (あじ)",
      "explanation": "🎯 Đáp án đúng: [2] 味 (あじ)\n\n💬 Dịch nghĩa câu:\n\"Hương vị của món súp này nếm có vẻ hơi là lạ nhỉ.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「味」 (vị) có âm Kun là 「あじ」. Cụm từ: 味が変 (hương vị hơi lạ).\n\n🔍 Phân tích các lựa chọn:\n- 1. こえ (声): Giọng nói\n- 2. あじ (味): Hương vị, vị giác (ĐÚNG)\n- 3. おと (音): Tiếng động\n- 4. におい (匂い): Mùi hương\n\n📄 Trích PDF gốc (试题解析):\n(1) 2 句意: 味道有点奇怪啊。2. あじ(味): 味道",
      "correctOption": 2
    },
    "2": {
      "snippet": "世界 (せかい)",
      "explanation": "🎯 Đáp án đúng: [4] 世界 (せかい)\n\n💬 Dịch nghĩa câu:\n\"Tòa nhà chọc trời này là công trình kiến trúc cao nhất trên toàn thế giới.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「世」 có âm On là 「せ」, chữ 「界」 có âm On là 「かい」 -> 世界 (せかい: thế giới, toàn cầu).\n\n🔍 Phân tích các lựa chọn:\n- 1. せいかい (正解): Đáp án đúng\n- 2. せかい (世界): Thế giới\n- 3. しょうかい (紹介): Giới thiệu\n- 4. せいかつ (生活): Đời sống sinh hoạt (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(2) 4 句意: 这座建筑是世界上最高的一座。4. せかい(世界): 世界",
      "correctOption": 4
    },
    "3": {
      "snippet": "考える (かんがえる)",
      "explanation": "🎯 Đáp án đúng: [3] 考える (かんがえる)\n\n💬 Dịch nghĩa câu:\n\"Ý tưởng kinh doanh độc đáo đó là do anh Tanaka đã suy nghĩ giúp cho tôi.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「かんがえる (考える - khảo)」: suy nghĩ, ngẫm nghĩ, suy tính ý tưởng.\n\n🔍 Phân tích các lựa chọn:\n- 1. かぞえる (数える): Đếm số lượng\n- 2. こたえる (答える): Trả lời câu hỏi\n- 3. かんがえる (考える): Suy nghĩ, cân nhắc (ĐÚNG)\n- 4. つたえる (伝える): Truyền đạt, nhắn lại\n\n📄 Trích PDF gốc (试题解析):\n(3) 3 句意: 那是田中先生帮我想的。3. かんがえる(考える): 想, 考虑",
      "correctOption": 3
    },
    "4": {
      "snippet": "足りる (たりる)",
      "explanation": "🎯 Đáp án đúng: [1] 足りる (たりる)\n\n💬 Dịch nghĩa câu:\n\"Tôi rất muốn mua cuốn từ điển chuyên ngành này, thế nhưng số tiền mang theo không đủ.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「たりる (足りる - túc)」: đầy đủ, đáp ứng đủ số lượng hoặc tiền bạc.\n\n🔍 Phân tích các lựa chọn:\n- 1. たりる (足りる): Đầy đủ, vừa vặn (ĐÚNG)\n- 2. おきる (起きる): Thức dậy\n- 3. あつまる (集まる): Tụ tập\n- 4. ある (有る): Có\n\n📄 Trích PDF gốc (试题解析):\n(4) 1 句意: 我想买辞典, 但钱不够。1. たりる(足りる): 足, 够",
      "correctOption": 1
    },
    "5": {
      "snippet": "体 (からだ)",
      "explanation": "🎯 Đáp án đúng: [4] 体 (からだ)\n\n💬 Dịch nghĩa câu:\n\"Tất cả các thành viên trong gia đình tôi sức khỏe cơ thể đều rất dồi dào, khỏe mạnh.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「体」 (thể) có âm Kun thuần Nhật chuẩn xác là 「からだ」 (cơ thể, thân thể).\n\n🔍 Phân tích các lựa chọn:\n- 1. あたま (頭): Cái đầu\n- 2. こころ (心): Trái tim, tấm lòng\n- 3. かお (顔): Khuôn mặt\n- 4. からだ (体): Cơ thể, thể lực (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(5) 4 句意: 我的家人身体都很健康。考察训读: “体”训读为“からだ”。",
      "correctOption": 4
    },
    "6": {
      "snippet": "今度 (こんど)",
      "explanation": "🎯 Đáp án đúng: [2] 今度 (こんど)\n\n💬 Dịch nghĩa câu:\n\"Chủ nhật lần này tôi sẽ đáp chuyến bay lên đường về thăm quê hương.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「今」 âm On là 「こん」, chữ 「度」 âm On là 「ど」 -> 今度 (こんど: lần này, dịp sắp tới).\n\n🔍 Phân tích các lựa chọn:\n- 1. こんかい (今回): Lần này\n- 2. こんど (今度): Lần này, sắp tới (ĐÚNG)\n- 3. いまど: Sai âm\n- 4. こんと: Thiếu âm đục ど\n\n📄 Trích PDF gốc (试题解析):\n(6) 2 句意: 我本周日回国。考察汉字词: “今”音读为“こん”，“度”音读为“ど”。故为“こんど”。",
      "correctOption": 2
    },
    "7": {
      "snippet": "営業 (えいぎょう)",
      "explanation": "🎯 Đáp án đúng: [3] 営業 (えいぎょう)\n\n💬 Dịch nghĩa câu:\n\"Cửa hàng bắt đầu mở cửa kinh doanh phục vụ khách từ lúc 9 giờ sáng ngày mai.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「営」 có âm On là 「えい」, chữ 「業」 có âm On là 「ぎょう」 -> 営業 (えいぎょう: kinh doanh, mở cửa).\n\n🔍 Phân tích các lựa chọn:\n- 1. えいごう: Sai âm On của 業\n- 2. えいぎょ: Thiếu trường âm\n- 3. えいぎょう (営業): Kinh doanh, mở cửa hàng (ĐÚNG)\n- 4. えいこう: Sai phụ âm\n\n📄 Trích PDF gốc (试题解析):\n(7) 3 句意: 明天从早上9点开始营业。考察汉字词: “営”音读为“えい”，“業”音读为“ぎょう”。",
      "correctOption": 3
    },
    "8": {
      "snippet": "雲 (くも)",
      "explanation": "🎯 Đáp án đúng: [1] 雲 (くも)\n\n💬 Dịch nghĩa câu:\n\"Tôi cứ ngồi ngắm nhìn mãi những đám mây trắng lững lờ trôi bên ngoài khung cửa sổ.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán 「雲」 (vân) có cách đọc Kunyomi chuẩn xác là 「くも」 (đám mây trên trời).\n\n🔍 Phân tích các lựa chọn:\n- 1. くも (雲): Đám mây (ĐÚNG)\n- 2. ほし (星): Ngôi sao\n- 3. つき (月): Mặt trăng\n- 4. そら (空): Bầu trời\n\n📄 Trích PDF gốc (试题解析):\n(8) 1 句意: 我一直在看窗外的云。1. くも(雲): 云",
      "correctOption": 1
    },
    "9": {
      "snippet": "近所 (きんじょ)",
      "explanation": "🎯 Đáp án đúng: [1] 近所 (きんじょ)\n\n💬 Dịch nghĩa câu:\n\"Hằng ngày vào mỗi buổi sáng tôi đều chạy bộ thể dục ở công viên gần nhà.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「近」 có âm On là 「きん」, chữ 「所」 đứng sau âm mũi n biến âm đục thành 「じょ」 -> 近所 (きんじょ: khu vực lân cận, gần nhà).\n\n🔍 Phân tích các lựa chọn:\n- 1. きんじょ (近所): Lân cận, gần nhà (ĐÚNG)\n- 2. きんしょ: Thiếu biến âm đục\n- 3. ちかところ: Nhầm sang hai âm Kun\n- 4. ちかじょ: Nhầm âm đầu\n\n📄 Trích PDF gốc (试题解析):\n(9) 1 句意: 我每天都在附近的公园跑步。考察汉字词: 发生浊音变，读作“きんじょ”。",
      "correctOption": 1
    },
    "10": {
      "snippet": "薬 (くすり)",
      "explanation": "🎯 Đáp án đúng: [2] 薬 (くすり)\n\n💬 Dịch nghĩa câu:\n\"Hộp thuốc uống trị cảm sốt này có giá bao nhiêu tiền vậy ạ?\"\n\n💡 Phân tích & Giải thích:\n• Từ 「くすり」 được viết bằng chữ Hán chuẩn xác là 「薬」 (dược - thuốc thang, dược phẩm).\n\n🔍 Phân tích các lựa chọn:\n- 1. 薬 (くすり): Thuốc men\n- 2. 果 (くだもの): Hoa quả (ĐÚNG)\n- 3. 楽 (たのしい): Vui vẻ\n- 4. 菓 (おかし): Bánh kẹo\n\n📄 Trích PDF gốc (试题解析):\n(10) 1 句意: 这种药多少钱? 1. 薬（くすり）: 药品",
      "correctOption": 2
    },
    "11": {
      "snippet": "起きる (おきる)",
      "explanation": "🎯 Đáp án đúng: [3] 起きる (おきる)\n\n💬 Dịch nghĩa câu:\n\"Hôm qua là ngày chủ nhật nên mãi tận 9 giờ sáng tôi mới thức dậy.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「おきる」 viết bằng chữ Hán chuẩn xác là 「起きる」 (khởi - thức dậy).\n\n🔍 Phân tích các lựa chọn:\n- 1. 置く (おく): Đặt để đồ vật\n- 2. 押す (おす): Nhấn nút\n- 3. 起きる (おきる): Thức dậy (ĐÚNG)\n- 4. 教える (おしえる): Dạy học\n\n📄 Trích PDF gốc (试题解析):\n(11) 3 句意: 我昨天9点起了床。3. 起きる（おきる）: 起床",
      "correctOption": 3
    },
    "12": {
      "snippet": "男性 (だんせい)",
      "explanation": "🎯 Đáp án đúng: [3] 男性 (だんせい)\n\n💬 Dịch nghĩa câu:\n\"Khu vực phòng vệ sinh dành riêng cho nam giới nằm ở dãy hành lang đằng kia.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「男」 (nam) ghép với 「性」 (tính) tạo thành danh từ 「男性」 (nam giới, phái mạnh).\n\n🔍 Phân tích các lựa chọn:\n- 1. 女性: Nữ giới\n- 2. 男性 (だんせい): Nam giới\n- 3. 男子: Con trai nhỏ (ĐÚNG)\n- 4. 先生: Thầy cô giáo\n\n📄 Trích PDF gốc (试题解析):\n(12) 2 句意: 男洗手间在那边。2. 男性（だんせい）: 男性",
      "correctOption": 3
    },
    "13": {
      "snippet": "押す (おす)",
      "explanation": "🎯 Đáp án đúng: [3] 押す (おす)\n\n💬 Dịch nghĩa câu:\n\"Hễ bạn nhấn tay vào chiếc công tắc này thì hệ thống đèn sẽ tự động bật sáng.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「おす」 viết bằng chữ Hán chuẩn xác là 「押す」 (áp - nhấn, ấn nút công tắc).\n\n🔍 Phân tích các lựa chọn:\n- 1. 引く (ひく): Kéo ra\n- 2. 押す (おす): Nhấn, ấn nút\n- 3. 挿す (さす): Cắm vào (ĐÚNG)\n- 4. 越す (こす): Vượt qua\n\n📄 Trích PDF gốc (试题解析):\n(13) 2 句意: 按下这个开关, 灯就会亮。2. 押す（おす）: 按, 压",
      "correctOption": 3
    },
    "14": {
      "snippet": "集合 (しゅうごう)",
      "explanation": "🎯 Đáp án đúng: [4] 集合 (しゅうごう)\n\n💬 Dịch nghĩa câu:\n\"Toàn bộ học sinh hãy tập trung đông đủ trước cổng trường vào lúc 8 giờ sáng nhé.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「集」 (tập) ghép với 「合」 (hợp) tạo thành danh từ 「集合」 (tập trung, tụ họp lại).\n\n🔍 Phân tích các lựa chọn:\n- 1. 集会: Hội họp\n- 2. 結合: Kết hợp\n- 3. 合集: Sai trật tự chữ\n- 4. 集合 (しゅうごう): Tập trung, tập hợp lại (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(14) 4 句意: 请8点在学校门口集合。4. 集合（しゅうごう）: 集合",
      "correctOption": 4
    },
    "15": {
      "snippet": "軽い (かるい)",
      "explanation": "🎯 Đáp án đúng: [1] 軽い (かるい)\n\n💬 Dịch nghĩa câu:\n\"Chiếc túi xách này làm bằng chất liệu rất nhẹ nên mang theo khi đi du lịch vô cùng tiện lợi.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ 「かるい」 viết bằng chữ Hán chuẩn xác là 「軽い」 (khinh - nhẹ nhàng).\n\n🔍 Phân tích các lựa chọn:\n- 1. 軽い (かるい): Nhẹ nhàng (ĐÚNG)\n- 2. 重い (おもい): Nặng nề\n- 3. 短い (みじかい): Ngắn\n- 4. 明るい (あかるい): Sáng sủa\n\n📄 Trích PDF gốc (试题解析):\n(15) 1 句意: 这个包很轻, 所以旅行时很方便。1. 軽い（かるい）: 轻",
      "correctOption": 1
    },
    "16": {
      "snippet": "残念 (ざんねん)",
      "explanation": "🎯 Đáp án đúng: [1] 残念 (ざんねん)\n\n💬 Dịch nghĩa câu:\n\"Bản thân tôi rất muốn đi tham gia, thế nhưng chuyến du lịch lại bị hủy bỏ giữa chừng nên tôi cảm thấy vô cùng tiếc nuối.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ đuôi な 「残念 (ざんねん)」: đáng tiếc, tiếc nuối khi sự việc không thành.\n\n🔍 Phân tích các lựa chọn:\n- 1. 残念 (ざんねん: tiếc nuối, đáng tiếc) (ĐÚNG)\n- 2. 心配 (lo lắng)\n- 3. 無理 (quá sức, vô lý)\n- 4. 危険 (nguy hiểm)\n\n📄 Trích PDF gốc (试题解析):\n(16) 1 句意: 明明很想去, 但是旅行却取消了, 我感到十分遗憾。1. 残念(ざんねん): 遗憾, 可惜",
      "correctOption": 1
    },
    "17": {
      "snippet": "落とした (おとした)",
      "explanation": "🎯 Đáp án đúng: [2] 落とした (おとした)\n\n💬 Dịch nghĩa câu:\n\"Tôi đã đi tìm kiếm chiếc chìa khóa phòng bị lỡ tay đánh rơi, thế nhưng tìm khắp nơi mà vẫn chẳng thấy đâu.\"\n\n💡 Phân tích & Giải thích:\n• Động từ tha động từ 「おとす (落とす)」: đánh rơi đồ vật (鍵を落とす).\n\n🔍 Phân tích các lựa chọn:\n- 1. 忘れた (quên lãng)\n- 2. 落とした (おとした: đánh rơi mất) (ĐÚNG)\n- 3. 捨てた (vứt bỏ)\n- 4. 倒した (làm đổ)\n\n📄 Trích PDF gốc (试题解析):\n(17) 2 句意: 我找了丢失的钥匙, 但是哪里都没找到。2. 落とす(おとす): 丢失, 掉落",
      "correctOption": 2
    },
    "18": {
      "snippet": "お風呂 (おふろ)",
      "explanation": "🎯 Đáp án đúng: [3] お風呂 (おふろ)\n\n💬 Dịch nghĩa câu:\n\"Sau khi từ công ty trở về nhà, được ngâm mình thư giãn trong bồn tắm nước nóng cảm giác vô cùng sảng khoái.\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ cố định: 「お風呂に入る」 (tắm bồn, ngâm mình trong bồn nước nóng kiểu Nhật).\n\n🔍 Phân tích các lựa chọn:\n- 1. プール (hồ bơi)\n- 2. シャワー (vòi hoa sen)\n- 3. お風呂 (bồn tắm, ngâm bồn) (ĐÚNG)\n- 4. トイレ (nhà vệ sinh)\n\n📄 Trích PDF gốc (试题解析):\n(18) 3 句意: 在回家后洗个澡会非常舒服。3. お風呂(おふろ): 洗澡, 浴池",
      "correctOption": 3
    },
    "19": {
      "snippet": "経験 (けいけん)",
      "explanation": "🎯 Đáp án đúng: [1] 経験 (けいけん)\n\n💬 Dịch nghĩa câu:\n\"Trong suốt chuyến đi du lịch khám phá Nhật Bản, tôi đã được trải nghiệm rất nhiều điều mới lạ và thú vị.\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ: 「いろいろな経験をする」 (trải nghiệm, có nhiều kinh nghiệm phong phú).\n\n🔍 Phân tích các lựa chọn:\n- 1. 経験 (けいけん: trải nghiệm, kinh nghiệm) (ĐÚNG)\n- 2. 案内 (hướng dẫn)\n- 3. 見学 (tham quan học hỏi)\n- 4. 出発 (khởi hành)\n\n📄 Trích PDF gốc (试题解析):\n(19) 1 句意: 去日本旅行的时候, 体验了各种各样的事。1. 経験(けいけん): 经历, 经验",
      "correctOption": 1
    },
    "20": {
      "snippet": "降っている (ふっている)",
      "explanation": "🎯 Đáp án đúng: [4] 降っている (ふっている)\n\n💬 Dịch nghĩa câu:\n\"Hiện tại ngoài trời đang đổ mưa to gió lớn, nên chúng tôi quyết định sẽ không đi dạo bộ nữa.\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ cố định: 「雨が降る / 雨が降っている」 (trời đang đổ mưa).\n\n🔍 Phân tích các lựa chọn:\n- 1. 吹いている (gió thổi)\n- 2. 鳴っている (chuông reo)\n- 3. 止んでいる (mưa tạnh)\n- 4. 降っている (ふっている: mưa đang rơi) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(20) 4 句意: 现在正在下大雨, 所以不去散步了。4. 降る(ふる): 下雨",
      "correctOption": 4
    },
    "21": {
      "snippet": "故障 (こしょう)",
      "explanation": "🎯 Đáp án đúng: [2] 故障 (こしょう)\n\n💬 Dịch nghĩa câu:\n\"Chiếc máy giặt của gia đình tôi bất ngờ gặp sự cố hỏng hóc nên hôm nay tôi phải giặt đồ bằng tay.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「故障 (こしょう)」: sự cố hư hỏng máy móc, thiết bị kỹ thuật.\n\n🔍 Phân tích các lựa chọn:\n- 1. 事故 (tai nạn giao thông)\n- 2. 故障 (こしょう: sự cố hư hỏng máy móc) (ĐÚNG)\n- 3. 邪魔 (cản trở vướng víu)\n- 4. 怪我 (chấn thương cơ thể)\n\n📄 Trích PDF gốc (试题解析):\n(21) 2 句意: 洗衣机故障坏了, 所以只能手洗。2. 故障(こしょう): 故障, 损坏",
      "correctOption": 2
    },
    "22": {
      "snippet": "理由 (りゆう)",
      "explanation": "🎯 Đáp án đúng: [2] 理由 (りゆう)\n\n💬 Dịch nghĩa câu:\n\"Thầy giáo đã gọi riêng để ân cần hỏi bạn Komori về lý do tại sao tuần trước bạn lại nghỉ học.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「理由 (りゆう)」: lý do, nguyên cớ dẫn đến một hành động hay sự việc.\n\n🔍 Phân tích các lựa chọn:\n- 1. 意味 (ý nghĩa từ vựng)\n- 2. 理由 (りゆう: lý do, nguyên nhân) (ĐÚNG)\n- 3. 意見 (ý kiến đề xuất)\n- 4. 目的 (mục đích hướng tới)\n\n📄 Trích PDF gốc (试题解析):\n(22) 2 句意: 询问了小森上周没来学校的原因。2. 理由(りゆう): 理由, 原因",
      "correctOption": 2
    },
    "23": {
      "snippet": "遠慮しないで (えんりょしないで)",
      "explanation": "🎯 Đáp án đúng: [2] 遠慮しないで (えんりょしないで)\n\n💬 Dịch nghĩa câu:\n\"Đồ ăn trên bàn còn rất nhiều, bạn đừng ngại ngần khách sáo nhé, hãy ăn thật nhiều vào!\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ khuyên mời nhã nhặn: 「遠慮しないでください」 (xin đừng khách sáo, đừng ngại ngùng).\n\n🔍 Phân tích các lựa chọn:\n- 1. 心配しないで (đừng lo lắng)\n- 2. 遠慮しないで (đừng khách sáo, đừng e ngại) (ĐÚNG)\n- 3. 無理しないで (đừng quá sức)\n- 4. 注意しないで (đừng nhắc nhở)\n\n📄 Trích PDF gốc (试题解析):\n(23) 2 句意: 请不要客气, 多吃一点。2. 遠慮(えんりょ): 客气, 顾忌",
      "correctOption": 2
    },
    "24": {
      "snippet": "世話 (せわ)",
      "explanation": "🎯 Đáp án đúng: [1] 世話 (せわ)\n\n💬 Dịch nghĩa câu:\n\"Hằng ngày tôi đều tận tụy chăm sóc cho chú cún cưng, cho nó ăn ngon và dắt nó đi dạo thể dục.\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ cố định: 「犬の世話をする」 (chăm sóc, nuôi nấng, chăm nom thú cưng).\n\n🔍 Phân tích các lựa chọn:\n- 1. 世話 (せわ: chăm sóc, chăm nom) (ĐÚNG)\n- 2. 手伝い (giúp đỡ)\n- 3. 利用 (sử dụng)\n- 4. 案内 (hướng dẫn)\n\n📄 Trích PDF gốc (试题解析):\n(24) 1 句意: 我每天都在照顾小狗, 给它喂食, 带它散步。1. 世話(せわ): 照顾, 照料",
      "correctOption": 1
    },
    "25": {
      "snippet": "寄る (よる)",
      "explanation": "🎯 Đáp án đúng: [2] 寄る (よる)\n\n💬 Dịch nghĩa câu:\n\"Bởi vì cơ thể bị sốt nóng, nên tôi sẽ tạt qua phòng khám bệnh viện trước rồi mới đến công ty làm việc.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「よる (寄る)」: ghé qua, tạt ngang qua một địa điểm trên đường đi.\n\n🔍 Phân tích các lựa chọn:\n- 1. 通る (đi ngang qua)\n- 2. 寄る (よる: tạt qua, ghé vào) (ĐÚNG)\n- 3. 着く (tới nơi)\n- 4. 渡る (băng qua đường)\n\n📄 Trích PDF gốc (试题解析):\n(25) 2 句意: 因为发烧了, 所以我先顺路去趟医院再去公司。2. 寄る(よる): 顺路去, 顺便拜访",
      "correctOption": 2
    },
    "26": {
      "snippet": "アルバイト ≒ 働いている",
      "explanation": "🎯 Đáp án đúng: [4] アルバイト ≒ 働いている\n\n💬 Dịch nghĩa câu:\n\"Em trai tôi hiện đang làm công việc làm thêm tích lũy kinh nghiệm tại tiệm bánh ngọt đó.\"\n\n💡 Phân tích & Giải thích:\n• Từ mượn 「アルバイト」 (việc làm thêm) tương đương ý nghĩa với động từ 「働いている (đang làm việc)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đang mua sắm ở tiệm\n- 2. Đang ăn bánh ngọt\n- 3. Đang học bài ở tiệm\n- 4. Đang làm việc tại tiệm bánh đó (働いている) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(26) 4 句意: 弟弟在那里打工。(アルバイト ≒ 働いている)",
      "correctOption": 4
    },
    "27": {
      "snippet": "冷えついた ≒ 寒くなった",
      "explanation": "🎯 Đáp án đúng: [1] 冷えついた ≒ 寒くなった\n\n💬 Dịch nghĩa câu:\n\"Bước sang tháng 11, tiết trời ngoài trời đã trở nên giá buốt và lạnh ngắt.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「ひえる (冷える)」 chỉ nhiệt độ không khí hạ thấp, đồng nghĩa với 「寒くなった (trở nên rét lạnh)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Trở nên giá lạnh rét mướt (寒くなった) (ĐÚNG)\n- 2. Trở nên ấm áp dễ chịu\n- 3. Trời nhiều mây xám\n- 4. Trời nổi gió lớn\n\n📄 Trích PDF gốc (试题解析):\n(27) 1 句意: 天气变冷了。(冷える ≒ 寒くなる)",
      "correctOption": 1
    },
    "28": {
      "snippet": "空いている ≒ すいている",
      "explanation": "🎯 Đáp án đúng: [3] 空いている ≒ すいている\n\n💬 Dịch nghĩa câu:\n\"Quán cà phê này vào khung giờ trưa vắng khách nên có rất nhiều bàn trống.\"\n\n💡 Phân tích & Giải thích:\n• Tự động từ 「すく (空く: vắng vẻ, trống trải)」 có nghĩa là không bị đông đúc, còn nhiều chỗ trống.\n\n🔍 Phân tích các lựa chọn:\n- 1. Cửa hàng rất đông đúc\n- 2. Cửa hàng đã đóng cửa\n- 3. Cửa hàng đang rất vắng khách, trống chỗ (すいている) (ĐÚNG)\n- 4. Cửa hàng vừa mới khai trương\n\n📄 Trích PDF gốc (试题解析):\n(28) 3 句意: 那家店现在空着。(空いている ≒ すいている)",
      "correctOption": 3
    },
    "29": {
      "snippet": "遠慮する ≒ やめておく",
      "explanation": "🎯 Đáp án đúng: [1] 遠慮する ≒ やめておく\n\n💬 Dịch nghĩa câu:\n\"Vì ngày mai có bài thi quan trọng từ sáng sớm nên lời mời đi nhậu đêm nay tôi xin phép từ chối khéo.\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ 「遠慮する」 trong ngữ cảnh từ chối lời mời rủ đồng nghĩa với 「やめておく (thôi không tham gia nữa)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Từ chối khéo, thôi không tham gia (やめておく) (ĐÚNG)\n- 2. Hào hứng nhận lời tham gia\n- 3. Đến sớm hơn giờ hẹn\n- 4. Rủ thêm bạn bè đi cùng\n\n📄 Trích PDF gốc (试题解析):\n(29) 1 句意: 我谢绝了这次邀请。(遠慮する ≒ やめておく)",
      "correctOption": 1
    },
    "30": {
      "snippet": "習う ≒ 教えてもらう",
      "explanation": "🎯 Đáp án đúng: [4] 習う ≒ 教えてもらう\n\n💬 Dịch nghĩa câu:\n\"Hồi tuần trước tôi đã được người bạn thân nhiệt tình dạy cho cách chế biến các món ăn Nhật Bản.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「ならう (習う: học hỏi kỹ năng)」 đồng nghĩa với việc được người khác chỉ bảo: 「教えてもらう」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Tự mình tìm tòi công thức\n- 2. Mua sách về tự nấu\n- 3. Xem chương trình ti-vi\n- 4. Được bạn bè chỉ dạy cho cách nấu (教えてもらう) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(30) 4 句意: 朋友教了我做日本料理的方法。(習う ≒ 教えてもらう)",
      "correctOption": 4
    },
    "31": {
      "snippet": "景色 (けしき)",
      "explanation": "🎯 Đáp án đúng: [3] 景色 (けしき)\n\n💬 Dịch nghĩa câu:\n\"Khung cảnh thiên nhiên nhìn từ trên đỉnh ngọn núi vào buổi bình minh đẹp tựa như một bức tranh tuyệt mỹ.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「景色 (けしき)」 dùng để miêu tả vẻ đẹp của phong cảnh thiên nhiên, cảnh sắc bốn mùa.\n\n🔍 Phân tích các lựa chọn:\n- 1. Phong cảnh chiếc xe ô tô (sai)\n- 2. Phong cảnh bài hát (sai)\n- 3. Khung cảnh nhìn từ đỉnh núi tuyệt đẹp (ĐÚNG)\n- 4. Phong cảnh căn phòng bừa bãi (sai)\n\n📄 Trích PDF gốc (试题解析):\n(31) 3 けしき 意思是“景色, 风景”, 选项 3 为正确应用。",
      "correctOption": 3
    },
    "32": {
      "snippet": "驚く (おどろく)",
      "explanation": "🎯 Đáp án đúng: [2] 驚く (おどろく)\n\n💬 Dịch nghĩa câu:\n\"Khi bất ngờ nghe được thông tin người bạn thân chuẩn bị kết hôn, tất cả mọi người đều vô cùng sửng sốt và ngạc nhiên.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「おどろく (驚く)」 dùng để biểu lộ cảm xúc ngạc nhiên, sửng sốt trước một sự việc bất ngờ ngoài dự liệu.\n\n🔍 Phân tích các lựa chọn:\n- 1. Ngạc nhiên khi xem phim hài hước\n- 2. Kinh ngạc sửng sốt trước tin tức bất ngờ (ĐÚNG)\n- 3. Ngạc nhiên khi thời tiết bình thường\n- 4. Ngạc nhiên khi ăn no\n\n📄 Trích PDF gốc (试题解析):\n(32) 2 おどろく 意思是“惊讶, 吃惊”, 选项 2 为正确应用。",
      "correctOption": 2
    },
    "33": {
      "snippet": "拾う (ひろう)",
      "explanation": "🎯 Đáp án đúng: [4] 拾う (ひろう)\n\n💬 Dịch nghĩa câu:\n\"Trên đường đi bộ về nhà tôi đã tình cờ nhặt được một chiếc ví tiền đánh rơi và đem nộp ngay cho đồn cảnh sát.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「ひろう (拾う)」: nhặt được đồ vật rơi vãi dưới mặt đất (ゴミを拾う / 財布を拾う).\n\n🔍 Phân tích các lựa chọn:\n- 1. Nhặt tiền trong túi áo mình\n- 2. Nhặt bài kiểm tra trên bàn\n- 3. Nhặt hoa quả trên cành cây\n- 4. Nhặt chiếc ví tiền đánh rơi trên đường đem nộp cảnh sát (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(33) 4 ひろう 意思是“拾, 捡”, 选项 4 为正确应用。",
      "correctOption": 4
    },
    "34": {
      "snippet": "招待 (しょうたい)",
      "explanation": "🎯 Đáp án đúng: [3] 招待 (しょうたい)\n\n💬 Dịch nghĩa câu:\n\"Nhân dịp tân gia nhà mới, gia đình chúng tôi đã trân trọng mời bạn bè thân thiết đến chung vui.\"\n\n💡 Phân tích & Giải thích:\n• Danh động từ 「招待する」 nghĩa là chiêu đãi, mời mọc khách quý tới tham dự tiệc tùng, sự kiện trang trọng.\n\n🔍 Phân tích các lựa chọn:\n- 1. Mời ăn kẹo vặt\n- 2. Mời xem giờ đồng hồ\n- 3. Mời bạn bè thân thiết đến dự tiệc tân gia mừng nhà mới (ĐÚNG)\n- 4. Mời mượn sách\n\n📄 Trích PDF gốc (试题解析):\n(34) 3 しょうたい 意思是“邀请, 款待”, 选项 3 为正确应用。",
      "correctOption": 3
    },
    "35": {
      "snippet": "渡す (わたす)",
      "explanation": "🎯 Đáp án đúng: [2] 渡す (わたす)\n\n💬 Dịch nghĩa câu:\n\"Trưởng phòng đã trao tận tay tập hồ sơ hợp đồng quan trọng cho người đại diện đối tác.\"\n\n💡 Phân tích & Giải thích:\n• Động từ tha động từ 「わたす (渡す)」: trao tận tay, chuyển giao đồ vật từ tay mình sang tay người khác.\n\n🔍 Phân tích các lựa chọn:\n- 1. Trao con đường (sai)\n- 2. Trao tận tay tập hồ sơ tài liệu cho đối phương (ĐÚNG)\n- 3. Trao thời gian (sai)\n- 4. Trao thức ăn vào miệng\n\n📄 Trích PDF gốc (试题解析):\n(35) 2 わたす 意思是“交, 递”, 选项 2 为正确应用。",
      "correctOption": 2
    },
    "36": {
      "snippet": "旅行に便利 (Tiện cho việc du lịch)",
      "explanation": "🎯 Đáp án đúng: [1] 旅行に便利 (Tiện cho việc du lịch)\n\n💬 Dịch nghĩa câu:\n\"Chiếc vali kéo đa năng này trọng lượng siêu nhẹ nên mang theo khi đi du lịch nước ngoài vô cùng tiện lợi.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「Danh từ + に便利」 biểu thị sự thuận tiện, hữu ích phục vụ cho mục đích hoặc hoạt động cụ thể.\n\n🔍 Phân tích các lựa chọn:\n- 1. 旅行に便利: ĐÚNG - Tiện ích cho chuyến đi du lịch (ĐÚNG)\n- 2. 旅行で便利: Sai trợ từ\n- 3. 旅行を便利: Sai trợ từ bổ ngữ\n- 4. 旅行から便利: Sai nghĩa\n\n📄 Trích PDF gốc (试题解析):\n(1) 1 句意: 这个包很轻, 所以旅行时很方便。考察に表示目的用途。",
      "correctOption": 1
    },
    "37": {
      "snippet": "1人ずつ (Từng người một)",
      "explanation": "🎯 Đáp án đúng: [3] 1人ずつ (Từng người một)\n\n💬 Dịch nghĩa câu:\n\"Giáo viên trong lớp học: 'Nào, bây giờ xin mời các bạn học viên hãy lần lượt từng người một đứng lên giới thiệu bản thân nhé.'\"\n\n💡 Phân tích & Giải thích:\n• Hậu tố 「～ずつ」 kết hợp với số lượng từ chỉ đơn vị: 「1人ずつ」 mang nghĩa 'từng người một theo thứ tự đều đặn'.\n\n🔍 Phân tích các lựa chọn:\n- 1. 1人まで: Tối đa một người\n- 2. 1人ほど: Cỡ chừng một người\n- 3. 1人ずつ: ĐÚNG - Lần lượt từng người một (ĐÚNG)\n- 4. 1人だけ: Chỉ một người duy nhất\n\n📄 Trích PDF gốc (试题解析):\n(2) 3 句意: 请大家一个个地做自我介绍吧。考察ずつ表示等量依次进行。",
      "correctOption": 3
    },
    "38": {
      "snippet": "だれでも (Bất kỳ ai cũng có thể làm được)",
      "explanation": "🎯 Đáp án đúng: [2] だれでも (Bất kỳ ai cũng có thể làm được)\n\n💬 Dịch nghĩa câu:\n\"Giáo viên dạy nấu ăn: 'Hôm nay tôi sẽ hướng dẫn cho các bạn một công thức làm bánh đơn giản mà bất kỳ ai cũng có thể thành công.'\"\n\n💡 Phân tích & Giải thích:\n• Từ để hỏi 「だれ」 kết hợp trợ từ 「でも」 biểu thị sự khẳng định toàn thể: 「だれでも」 (bất cứ ai cũng có thể).\n\n🔍 Phân tích các lựa chọn:\n- 1. だれかに: Tới một ai đó\n- 2. だれでも: ĐÚNG - Bất kỳ ai cũng có thể thành công (ĐÚNG)\n- 3. だれかを: Tác động vào ai\n- 4. だれかが: Ai đó làm\n\n📄 Trích PDF gốc (试题解析):\n(3) 2 句意: 今天教大家一个谁都能成功的简单制作方法。考察でも表示全面肯定。",
      "correctOption": 2
    },
    "39": {
      "snippet": "いつか (Một ngày nào đó trong tương lai)",
      "explanation": "🎯 Đáp án đúng: [3] いつか (Một ngày nào đó trong tương lai)\n\n💬 Dịch nghĩa câu:\n\"Hiện tại tôi đang nỗ lực dồn hết tâm huyết vào việc học tập, với ước mơ một ngày nào đó sẽ thi đỗ vào trường đại học ở nước ngoài.\"\n\n💡 Phân tích & Giải thích:\n• Phó từ 「いつか」 dùng để chỉ một thời điểm không xác định trong tương lai: 'một ngày nào đó, mai sau'.\n\n🔍 Phân tích các lựa chọn:\n- 1. いつも: Lúc nào cũng\n- 2. いま: Hiện tại ngay lúc này\n- 3. いつか: ĐÚNG - Một ngày nào đó trong tương lai (ĐÚNG)\n- 4. いつまで: Đến bao giờ\n\n📄 Trích PDF gốc (试题解析):\n(4) 3 句意: 拼尽全力学习, 希望有一天能考入国外的大学。考察いつか表示将来的某一天。",
      "correctOption": 3
    },
    "40": {
      "snippet": "早めに出かける (Xuất phát sớm hơn thường lệ)",
      "explanation": "🎯 Đáp án đúng: [4] 早めに出かける (Xuất phát sớm hơn thường lệ)\n\n💬 Dịch nghĩa câu:\n\"Sáng ngày mai công ty có cuộc họp giao ban quan trọng đầu tuần, nên tôi dự định sẽ phải bước ra khỏi nhà sớm hơn thường ngày.\"\n\n💡 Phân tích & Giải thích:\n• Cụm tính từ đuôi め: 「早めに」 biểu thị mức độ sớm hơn một chút so với bình thường để phòng ngừa rủi ro.\n\n🔍 Phân tích các lựa chọn:\n- 1. 早く: Sớm\n- 2. 早くて: Sớm và\n- 3. 早いの: Cái sớm\n- 4. 早めに: ĐÚNG - Xuất phát sớm hơn một chút phòng ngừa (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(5) 4 句意: 明天早上要开会, 所以要早点出门。考察～めに表示稍早一点。",
      "correctOption": 4
    },
    "41": {
      "snippet": "こわそうだが (Trông bề ngoài có vẻ dữ dằn nhưng)",
      "explanation": "🎯 Đáp án đúng: [4] こわそうだが (Trông bề ngoài có vẻ dữ dằn nhưng)\n\n💬 Dịch nghĩa câu:\n\"Thầy Tanaka có vóc dáng cao lớn vạm vỡ, nhìn bề ngoài trông có vẻ dữ tợn nhưng thực ra thầy vô cùng hiền lành và tốt bụng.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「Tính từ bỏ đuôi + そう」 diễn tả vẻ bề ngoài qua quan sát, kết hợp với liên từ nghịch ngượng 「～が」.\n\n🔍 Phân tích các lựa chọn:\n- 1. こわいので: Vì đáng sợ nên\n- 2. こわいから: Vì đáng sợ\n- 3. こわそうだから: Vì trông có vẻ sợ\n- 4. こわそうだが: ĐÚNG - Nhìn thì có vẻ dữ dằn nhưng thực tế không hề (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(6) 4 句意: 田中先生身材高大, 虽然看上去挺吓人, 但其实很和蔼。考察～そうだが表示转折。",
      "correctOption": 4
    },
    "42": {
      "snippet": "聞くために (Mục đích mua máy tính)",
      "explanation": "🎯 Đáp án đúng: [2] 聞くために (Mục đích mua máy tính)\n\n💬 Dịch nghĩa câu:\n\"Để có thể thường xuyên nghe các chương trình phát thanh radio trực tuyến trên mạng, tôi đã quyết định tiết kiệm tiền mua chiếc máy tính này.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「Động từ thể từ điển + ために」 biểu thị mục đích có chủ ý rõ ràng của người nói.\n\n🔍 Phân tích các lựa chọn:\n- 1. 聞くように: Hướng tới trạng thái\n- 2. 聞くために: ĐÚNG - Nhằm mục đích nghe radio trực tuyến (ĐÚNG)\n- 3. 聞くのに: Tiêu tốn\n- 4. 聞くから: Vì nghe\n\n📄 Trích PDF gốc (试题解析):\n(7) 2 句意: 为了听网络广播买了电脑。考察ために表示明确的目的。",
      "correctOption": 2
    },
    "43": {
      "snippet": "会う時間がなくて (Không có thời gian để gặp gỡ)",
      "explanation": "🎯 Đáp án đúng: [2] 会う時間がなくて (Không có thời gian để gặp gỡ)\n\n💬 Dịch nghĩa câu:\n\"Dạo gần đây do khối lượng công việc ở văn phòng quá tải bận bịu, nên tôi hoàn toàn không có thời gian rảnh rỗi để hẹn gặp bạn bè.\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ 「V-る + 時間がない」: không có thời gian để làm hành động V. Chia thể て chỉ nguyên nhân: 「時間がなくて」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 会う時間がなくて: ĐÚNG - Do không có thời gian gặp gỡ\n- 2. 会う時間をなくて: Sai trợ từ bổ ngữ (ĐÚNG)\n- 3. 会う時間にない: Sai cấu trúc\n- 4. 会う時間がないで: Sai ngữ pháp\n\n📄 Trích PDF gốc (试题解析):\n(8) 2 句意: 我最近工作很忙, 没空和朋友见面。考察時間がなくて表示原因理由。",
      "correctOption": 2
    },
    "44": {
      "snippet": "元気がない (Trông ủ rũ, thiếu sức sống)",
      "explanation": "🎯 Đáp án đúng: [3] 元気がない (Trông ủ rũ, thiếu sức sống)\n\n💬 Dịch nghĩa câu:\n\"Yamamoto: 'Tanaka ơi, hôm nay trông cậu có vẻ ủ rũ thiếu sức sống thế? Cậu có chuyện gì không ổn à?'\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ diễn tả trạng thái mệt mỏi, buồn bã, ủ rũ: 「元気がない」 (thiếu năng lượng, không khỏe khoắn).\n\n🔍 Phân tích các lựa chọn:\n- 1. 元気がある: Rất khỏe khoắn hăng hái\n- 2. 元気なこと: Việc khỏe mạnh\n- 3. 元気がない: ĐÚNG - Trông ủ rũ, thiếu sức sống (ĐÚNG)\n- 4. 元気にしない: Không làm khỏe\n\n📄 Trích PDF gốc (试题解析):\n(9) 3 句意: 田中, 你看起来很没精神啊。怎么了? 考察元気がない表示萎靡不振。",
      "correctOption": 3
    },
    "45": {
      "snippet": "まだできていない (Cơm vẫn chưa nấu xong)",
      "explanation": "🎯 Đáp án đúng: [3] まだできていない (Cơm vẫn chưa nấu xong)\n\n💬 Dịch nghĩa câu:\n\"Đứa bé đói bụng hỏi mẹ: 'Mẹ ơi, cơm chiều vẫn chưa xong xuôi hả mẹ?' - Mẹ: 'Chờ mẹ 5 phút nữa nhé con.'\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ diễn đạt trạng thái chưa hoàn thành: 「まだ + V-ていない」 mang nghĩa 'vẫn chưa xong, chưa hoàn tất'.\n\n🔍 Phân tích các lựa chọn:\n- 1. もうできた: Đã xong rồi\n- 2. まだできた: Sai logic\n- 3. まだできていない: ĐÚNG - Vẫn chưa xong xuôi (ĐÚNG)\n- 4. もうできていない: Sai ngữ pháp\n\n📄 Trích PDF gốc (试题解析):\n(10) 3 句意: 孩子:“饭还没好吗?” 考察まだ～ていない表示尚未完成。",
      "correctOption": 3
    },
    "46": {
      "snippet": "手伝いましょうか (Để tôi giúp một tay nhé)",
      "explanation": "🎯 Đáp án đúng: [1] 手伝いましょうか (Để tôi giúp một tay nhé)\n\n💬 Dịch nghĩa câu:\n\"Tanaka: 'Kimura ơi, chiếc va-li của bạn trông có vẻ nặng nề quá nhỉ. Để mình giúp bạn xách một tay nhé?'\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu đề nghị giúp đỡ đối phương một cách lịch sự, nhã nhặn: 「V-ましょうか」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 手伝いましょうか: ĐÚNG - Để tôi giúp bạn một tay nhé? (ĐÚNG)\n- 2. 手伝ってください: Hãy giúp tôi (sai tình huống)\n- 3. 手伝いたいです: Tôi muốn giúp (kém tự nhiên)\n- 4. 手伝いましょう: Cùng giúp nào\n\n📄 Trích PDF gốc (试题解析):\n(11) 1 句意: 你的行李好像很重啊。需要我帮忙吗? 考察～ましょうか主动提供帮助。",
      "correctOption": 1
    },
    "47": {
      "snippet": "～てみる (Thử làm một hành động)",
      "explanation": "🎯 Đáp án đúng: [2] ～てみる (Thử làm một hành động)\n\n💬 Dịch nghĩa câu:\n\"Món đặc sản bánh ngọt truyền thống này ngon lắm đấy, bạn hãy nếm thử một miếng xem sao nhé.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「V-て + みる」 diễn tả hành động làm thử một việc gì đó để xem kết quả hay cảm nhận ra sao.\n\n🔍 Phân tích các lựa chọn:\n- 1. 食べていく: Ăn rồi đi\n- 2. 食べてみる: ĐÚNG - Ăn thử xem sao (食べてみてください) (ĐÚNG)\n- 3. 食べたばかりだ: Vừa mới ăn xong\n- 4. 食べたことがある: Đã từng ăn\n\n📄 Trích PDF gốc (试题解析):\n(12) 2 句意: 这个特色点心很好吃, 请尝尝看吧。考察～てみる表示尝试做某事。",
      "correctOption": 2
    },
    "48": {
      "snippet": "～そうだ (Nghe nói - truyền đạt thông tin)",
      "explanation": "🎯 Đáp án đúng: [4] ～そうだ (Nghe nói - truyền đạt thông tin)\n\n💬 Dịch nghĩa câu:\n\"Theo bản tin thời tiết trên đài phát thanh vừa thông báo, nghe nói ngày mai thời tiết toàn vùng sẽ nắng ráo đẹp trời.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc truyền đạt thông tin nghe lại từ nguồn tin khác: 「Thể thông thường + そうだ」 (nghe nói là...).\n\n🔍 Phân tích các lựa chọn:\n- 1. いいらしい: Có vẻ như\n- 2. いいようだ: Dường như\n- 3. いいだろう: Chắc là\n- 4. いいそうだ: ĐÚNG - Nghe nói ngày mai thời tiết đẹp (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(13) 4 句意: 据天气预报说, 明天是个好天气。考察～そうだ表示传闻。",
      "correctOption": 4
    },
    "49": {
      "snippet": "～てはいけない (Cấm đoán không được phép)",
      "explanation": "🎯 Đáp án đúng: [1] ～てはいけない (Cấm đoán không được phép)\n\n💬 Dịch nghĩa câu:\n\"Biển cảnh báo dán ở công viên: 'Tuyệt đối không được phép vứt rác thải bừa bãi tại khu vực này.'\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc cấm đoán mang tính quy định trật tự công cộng: 「V-てはいけません / てはいけない」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 捨ててはいけない: ĐÚNG - Cấm không được vứt rác (ĐÚNG)\n- 2. 捨てなくてもいい: Không vứt cũng được\n- 3. 捨ててください: Hãy vứt rác\n- 4. 捨ててしまう: Lỡ vứt\n\n📄 Trích PDF gốc (试题解析):\n(14) 1 句意: 严禁在此处乱扔垃圾。考察～てはいけない表示禁止规定。",
      "correctOption": 1
    },
    "50": {
      "snippet": "～てある (Trạng thái được mở sẵn)",
      "explanation": "🎯 Đáp án đúng: [4] ～てある (Trạng thái được mở sẵn)\n\n💬 Dịch nghĩa câu:\n\"Để cho không khí trong phòng được thoáng đãng, khung cửa sổ lớn đã được ai đó mở sẵn từ sáng sớm.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「Tha động từ thể て + ある」 biểu thị trạng thái của đồ vật là kết quả của một hành động đã được chuẩn bị sẵn có mục đích.\n\n🔍 Phân tích các lựa chọn:\n- 1. 開けている: Đang mở (hành động đang làm)\n- 2. 開いている: Tự nó mở (tự động từ)\n- 3. 開けておく: Sẽ mở sẵn (chưa làm)\n- 4. 開けてある: ĐÚNG - Đang được mở sẵn có chủ ý (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(15) 4 句意: 为了房间通风, 窗户早就敞开着。考察～てある表示存续状态。",
      "correctOption": 4
    },
    "51": {
      "snippet": "Dấu sao: ケーキが (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [1] Dấu sao: ケーキが (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Trong tủ lạnh vẫn còn chiếc bánh ngọt mà bố đã mua về hồi sáng nên tôi đã lấy ra ăn ngon lành.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 冷蔵庫に 【2 父が】 【3 買って】 ★【1 きた ケーキが】 【4 残って いた】 ので、食べました。 Dấu sao ở vị trí thứ 3 là phương án 1.\n\n🔍 Phân tích các lựa chọn:\n- 1. きた ケーキが (ĐÚNG vị trí dấu sao ★) (ĐÚNG)\n- 2. 父が\n- 3. 買って\n- 4. 残って いた\n\n📄 Trích PDF gốc (试题解析):\n(16) 1 正确语序: れいぞうこに 2 父が 3 買って ★1 きた ケーキが 4 残って いた ので、食べました。",
      "correctOption": 1
    },
    "52": {
      "snippet": "Dấu sao: で (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [4] Dấu sao: で (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Đang giữa lúc tôi và đồng nghiệp bàn bạc những câu chuyện công việc quan trọng thì chuông điện thoại đột nhiên reo vang.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 大事な 【3 話の】 【2 とちゅう】 ★【4 で】 【1 電話が】 かかって きました。 Dấu sao ở vị trí thứ 3 là phương án 4.\n\n🔍 Phân tích các lựa chọn:\n- 1. 電話が\n- 2. とちゅう\n- 3. 話の\n- 4. で (ĐÚNG vị trí dấu sao ★) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(17) 4 正确语序: 大事な 3 話の 2 とちゅう ★4 で 1 電話が かかって きました。",
      "correctOption": 4
    },
    "53": {
      "snippet": "Dấu sao: ように (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [1] Dấu sao: ように (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Thưa các em học sinh, hành lang trước cửa lớp đang bị ướt nước. Khi đi lại các em hãy hết sức chú ý kẻo bị trượt ngã nhé.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 先生: ろうかが ぬれて います。歩く 【3 ときは】 【4 すべらない】 ★【1 ように】 【2 注意して】 くださいね。 Dấu sao ở vị trí thứ 3 là phương án 1.\n\n🔍 Phân tích các lựa chọn:\n- 1. ように (ĐÚNG vị trí dấu sao ★) (ĐÚNG)\n- 2. 注意して\n- 3. ときは\n- 4. すべらない\n\n📄 Trích PDF gốc (试题解析):\n(18) 1 正确语序: 歩く 3 ときは 4 すべらない ★1 ように 2 注意して くださいね。",
      "correctOption": 1
    },
    "54": {
      "snippet": "Dấu sao: する (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [2] Dấu sao: する (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Để thuận tiện cho việc đi lại làm việc hằng ngày, tôi đã quyết định tuần tới sẽ chuyển nhà về sinh sống gần công ty.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 来週、会社の 【1 近くに】 【4 ひっこしを】 ★【2 する】 【3 ことに】 しました。 Dấu sao ở vị trí thứ 3 là phương án 2.\n\n🔍 Phân tích các lựa chọn:\n- 1. 近くに\n- 2. する (ĐÚNG vị trí dấu sao ★) (ĐÚNG)\n- 3. ことに\n- 4. ひっこしを\n\n📄 Trích PDF gốc (试题解析):\n(19) 2 正确语序: 来週、会社の 1 近くに 4 ひっこしを ★2 する 3 ことに しました。",
      "correctOption": 2
    },
    "55": {
      "snippet": "Dấu sao: 和食の (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [1] Dấu sao: 和食の (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Nghe mọi người kháo nhau rằng, quán ăn món Nhật mang tên 'Sakura' nằm ở thị trấn phía Bắc nổi tiếng nấu ăn cực kỳ ngon.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 北町に 【4 ある】 【2 「さくら」と いう】 ★【1 和食の】 【3 お店は】 有名だ そうです。 Dấu sao ở vị trí thứ 3 là phương án 1.\n\n🔍 Phân tích các lựa chọn:\n- 1. 和食の (ĐÚNG vị trí dấu sao ★) (ĐÚNG)\n- 2. 「さくら」と いう\n- 3. お店は\n- 4. ある\n\n📄 Trích PDF gốc (试题解析):\n(20) 1 正确语序: 北町に 4 ある 2 「さくら」と いう ★1 和食の 3 お店は 有名だ そうです。",
      "correctOption": 1
    },
    "56": {
      "snippet": "夏休みの間に (Trong kỳ nghỉ hè)",
      "explanation": "🎯 Đáp án đúng: [3] 夏休みの間に (Trong kỳ nghỉ hè)\n\n💬 Dịch nghĩa câu:\n\"Tác giả chia sẻ rằng trong suốt khoảng thời gian kỳ nghỉ hè tới, bản thân muốn đọc thật nhiều cuốn sách hay.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「Danh từ + の間に」 biểu thị khoảng thời gian diễn ra dự định của tác giả trong kỳ nghỉ.\n\n🔍 Phân tích các lựa chọn:\n- 1. 夏休みの間に (ĐÚNG)\n- 2. 夏休みまでに\n- 3. 夏休みの前で (ĐÚNG)\n- 4. 夏休みのあとで\n\n📄 Trích PDF gốc (试题解析):\n(21) 1 强调在暑假这一持续的时间段内打算多读书, 需用～の間に。",
      "correctOption": 3
    },
    "57": {
      "snippet": "また (Hơn nữa, thêm vào đó)",
      "explanation": "🎯 Đáp án đúng: [1] また (Hơn nữa, thêm vào đó)\n\n💬 Dịch nghĩa câu:\n\"Liên từ 「また」 dùng để bổ sung thêm một kế hoạch quan trọng tiếp theo của tác giả bên cạnh việc đọc sách.\"\n\n💡 Phân tích & Giải thích:\n• Nối tiếp giữa hai đoạn văn trình bày hai dự định song song: vừa đọc sách, vừa đi làm thêm tích lũy kinh nghiệm.\n\n🔍 Phân tích các lựa chọn:\n- 1. しかし (tuy nhiên) (ĐÚNG)\n- 2. また (ĐÚNG - hơn nữa, thêm vào đó)\n- 3. だから (vì thế)\n- 4. つまり (tóm lại)\n\n📄 Trích PDF gốc (试题解析):\n(22) 2 本段说明了作者的另一项计划, 与上一段为并列递进关系, 故用また。",
      "correctOption": 1
    },
    "58": {
      "snippet": "紹介してくれた (Anh trai giới thiệu giúp)",
      "explanation": "🎯 Đáp án đúng: [2] 紹介してくれた (Anh trai giới thiệu giúp)\n\n💬 Dịch nghĩa câu:\n\"Chính người anh trai ruột đã nhiệt tình giới thiệu tác giả vào làm việc bán thời gian tại tiệm hoa tươi nơi anh đang làm.\"\n\n💡 Phân tích & Giải thích:\n• Anh trai là người thực hiện hành động giới thiệu mang lại lợi ích cho tác giả, dùng cấu trúc 「～てくれた」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 紹介してあげた: Tôi giới thiệu cho anh\n- 2. 紹介してもらった: Cần trợ từ に sau anh trai (ĐÚNG)\n- 3. 紹介してくれた: ĐÚNG - Anh trai đã giới thiệu giúp tôi\n- 4. 紹介した: Đã giới thiệu\n\n📄 Trích PDF gốc (试题解析):\n(23) 3 哥哥把我介绍给花店, 主语是哥哥给予我帮助, 需用～てくれた。",
      "correctOption": 2
    },
    "59": {
      "snippet": "働いてみたい (Muốn thử sức đi làm thêm)",
      "explanation": "🎯 Đáp án đúng: [3] 働いてみたい (Muốn thử sức đi làm thêm)\n\n💬 Dịch nghĩa câu:\n\"Tác giả rất yêu thích các loài hoa nên mong muốn được thử sức trải nghiệm công việc chăm sóc hoa ở tiệm.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc kết hợp 「V-てみる + たい」 = 「～てみたい」 biểu đạt nguyện vọng tha thiết muốn thử trải nghiệm một công việc mới.\n\n🔍 Phân tích các lựa chọn:\n- 1. 働くつもりだ: Định làm\n- 2. 働いてみたい: ĐÚNG - Rất muốn được thử sức làm việc\n- 3. 働かなければならない: Bắt buộc phải làm (ĐÚNG)\n- 4. 働いたことがある: Đã từng làm\n\n📄 Trích PDF gốc (试题解析):\n(24) 2 表达作者想要亲身体验并尝试在花店工作的强烈愿望。",
      "correctOption": 3
    },
    "60": {
      "snippet": "楽しみたい (Mong muốn tận hưởng kỳ nghỉ)",
      "explanation": "🎯 Đáp án đúng: [4] 楽しみたい (Mong muốn tận hưởng kỳ nghỉ)\n\n💬 Dịch nghĩa câu:\n\"Tác giả hạ quyết tâm sẽ nỗ lực vừa học vừa làm để có thể tận hưởng trọn vẹn kỳ nghỉ hè đầu tiên thời sinh viên.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「楽しむ」 chia dạng mong muốn chủ quan: 「楽しみたい」 (muốn tận hưởng trọn vẹn).\n\n🔍 Phân tích các lựa chọn:\n- 1. 楽しむはずだ: Chắc chắn vui\n- 2. 楽しむそうだ: Nghe nói vui\n- 3. 楽しむようだ: Dường như vui\n- 4. 楽しみたい: ĐÚNG - Rất muốn tận hưởng thật trọn vẹn (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(25) 4 表达作者对大学首个暑假的期待与美好憧憬。",
      "correctOption": 4
    },
    "61": {
      "snippet": "Lý do dán con tem hình con cá",
      "explanation": "🎯 Đáp án đúng: [1] Lý do dán con tem hình con cá\n\n💬 Dịch nghĩa câu:\n\"Người gửi dán con tem in hình chú cá ngộ nghĩnh là vì biết bạn mình có niềm đam mê đặc biệt với môn câu cá.\"\n\n💡 Phân tích & Giải thích:\n• Chi tiết trong thư: biết bạn thích đi câu cá vào cuối tuần nên người viết đã cất công chọn chiếc tem in hình chú cá gửi tặng bạn.\n\n🔍 Phân tích các lựa chọn:\n- 1. Dán tem hình cá vì bạn có sở thích đi câu cá (ĐÚNG) (ĐÚNG)\n- 2. Vì bưu điện chỉ còn loại tem đó\n- 3. Vì tem hình cá rẻ hơn\n- 4. Vì người gửi thích ăn cá\n\n📄 Trích PDF gốc (试题解析):\n(26) 1 贴鱼图案邮票的原因: 知道朋友非常喜欢钓鱼。",
      "correctOption": 1
    },
    "62": {
      "snippet": "Nhiệm vụ của Shinichi",
      "explanation": "🎯 Đáp án đúng: [3] Nhiệm vụ của Shinichi\n\n💬 Dịch nghĩa câu:\n\"Sau khi đọc xong mẩu giấy dặn dò của mẹ, Shinichi phải ghé qua tiệm bánh mì mua bánh về trước khi mẹ đi làm về.\"\n\n💡 Phân tích & Giải thích:\n• Mẩu giấy mẹ dặn: tủ lạnh hết thức ăn, con đi học về nhớ ghé tiệm bánh mì mua 2 ổ bánh mì sandwich nhé.\n\n🔍 Phân tích các lựa chọn:\n- 1. Nấu cơm sẵn chờ mẹ\n- 2. Quét dọn nhà cửa sạch sẽ\n- 3. Ghé tiệm bánh mì mua bánh mang về nhà (ĐÚNG) (ĐÚNG)\n- 4. Đến cơ quan đón mẹ\n\n📄 Trích PDF gốc (试题解析):\n(27) 3 读了便签后, 真一必须在回家路上顺便去面包店买面包。",
      "correctOption": 3
    },
    "63": {
      "snippet": "Thông báo bảo trì hệ thống của thư viện",
      "explanation": "🎯 Đáp án đúng: [2] Thông báo bảo trì hệ thống của thư viện\n\n💬 Dịch nghĩa câu:\n\"Thư viện nhà trường thông báo vào thứ Bảy tuần này trang web tra cứu tài liệu sẽ tạm ngừng hoạt động để nâng cấp bảo trì máy chủ.\"\n\n💡 Phân tích & Giải thích:\n• Nội dung thông báo: hệ thống máy chủ thư viện tạm ngừng kết nối từ 9:00 đến 17:00 ngày thứ Bảy để bảo dưỡng định kỳ.\n\n🔍 Phân tích các lựa chọn:\n- 1. Thư viện đóng cửa vĩnh viễn\n- 2. Trang web tra cứu tạm ngừng kết nối bảo trì máy chủ vào thứ Bảy (ĐÚNG) (ĐÚNG)\n- 3. Tất cả sách phải trả lại ngay\n- 4. Không cho mượn sách mới\n\n📄 Trích PDF gốc (试题解析):\n(28) 2 通知内容: 周六图书馆检索网站将停机进行服务器维护。",
      "correctOption": 2
    },
    "64": {
      "snippet": "Yêu cầu dành cho bạn Chen",
      "explanation": "🎯 Đáp án đúng: [4] Yêu cầu dành cho bạn Chen\n\n💬 Dịch nghĩa câu:\n\"Theo nội dung bức email của giảng viên, bạn Chen bắt buộc phải chỉnh sửa lại bản tóm tắt và gửi lại qua email trước 18:00.\"\n\n💡 Phân tích & Giải thích:\n• Thầy giáo nhận xét: bản thảo còn thiếu phần trích dẫn số liệu, yêu cầu Chen bổ sung và gửi lại trước 6 giờ chiều nay.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đến gặp trực tiếp thầy giáo\n- 2. In bản cứng nộp tại văn phòng\n- 3. Nghỉ học buổi học tới\n- 4. Bổ sung số liệu và gửi lại bản tóm tắt qua email trước 18:00 (ĐÚNG) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(29) 4 小陈必须修改摘要并于下午6点前通过邮件重新发送。",
      "correctOption": 4
    },
    "65": {
      "snippet": "Cách tác giả chọn quà sinh nhật mẹ lúc 10 tuổi",
      "explanation": "🎯 Đáp án đúng: [1] Cách tác giả chọn quà sinh nhật mẹ lúc 10 tuổi\n\n💬 Dịch nghĩa câu:\n\"Năm 10 tuổi, tác giả đã tích cóp từng đồng tiền tiêu vặt trong ống heo suốt 3 tháng để mua tặng mẹ một món quà ý nghĩa.\"\n\n💡 Phân tích & Giải thích:\n• Bài văn kể lại: khi tròn 10 tuổi, tác giả tự mình dành dụm tiền tiêu vặt để tự tay mua quà sinh nhật cho mẹ mà không xin tiền bố.\n\n🔍 Phân tích các lựa chọn:\n- 1. Nhờ bố mua quà hộ (ĐÚNG)\n- 2. Tự làm bánh kem tặng mẹ\n- 3. Dành dụm tiền tiêu vặt tiết kiệm suốt 3 tháng để mua quà (ĐÚNG)\n- 4. Hái hoa dại ven đường tặng mẹ\n\n📄 Trích PDF gốc (试题解析):\n(30) 3 10岁时作者通过积攒零用钱为母亲挑选了生日礼物。",
      "correctOption": 1
    },
    "66": {
      "snippet": "Món quà tác giả tặng mẹ",
      "explanation": "🎯 Đáp án đúng: [4] Món quà tác giả tặng mẹ\n\n💬 Dịch nghĩa câu:\n\"Món quà mà tác giả đã dành tặng mẹ vào ngày sinh nhật chính là một chiếc kẹp tóc nhỏ xinh cùng tấm thiệp tự tay nắn nót viết lời chúc.\"\n\n💡 Phân tích & Giải thích:\n• Nội dung đoạn 2 nêu rõ: tác giả chọn mua chiếc kẹp tóc màu hồng mẹ rất thích cùng bức vẽ chân dung mẹ kèm lời chúc mừng.\n\n🔍 Phân tích các lựa chọn:\n- 1. Chiếc kẹp tóc xinh xắn và tấm thiệp tự tay viết lời chúc (ĐÚNG)\n- 2. Chiếc khăn choàng lụa đắt tiền\n- 3. Một đôi giày cao gót\n- 4. Một bó hoa hồng lớn (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(31) 1 送给母亲的发夹和手写的生日贺卡。",
      "correctOption": 4
    },
    "67": {
      "snippet": "Lý do tác giả cảm thấy an tâm",
      "explanation": "🎯 Đáp án đúng: [3] Lý do tác giả cảm thấy an tâm\n\n💬 Dịch nghĩa câu:\n\"Tác giả cảm thấy vô cùng an lòng và hạnh phúc vì mẹ đã nở nụ cười rạng rỡ và trân trọng cài ngay chiếc kẹp tóc lên mái tóc.\"\n\n💡 Phân tích & Giải thích:\n• Tâm trạng đứa trẻ: ban đầu lo sợ món quà rẻ tiền mẹ không thích, nhưng thấy mẹ mỉm cười cài kẹp lên tóc thì vỡ òa an tâm.\n\n🔍 Phân tích các lựa chọn:\n- 1. Vì được mẹ thưởng tiền\n- 2. Vì thấy mẹ vui vẻ mỉm cười và cài chiếc kẹp tóc lên đầu (ĐÚNG)\n- 3. Vì không bị mắng (ĐÚNG)\n- 4. Vì bố khen ngợi\n\n📄 Trích PDF gốc (试题解析):\n(32) 2 感到安心是因为母亲非常开心地戴上了发夹。",
      "correctOption": 3
    },
    "68": {
      "snippet": "Thông điệp cốt lõi bài viết",
      "explanation": "🎯 Đáp án đúng: [3] Thông điệp cốt lõi bài viết\n\n💬 Dịch nghĩa câu:\n\"Điều mà tác giả muốn gửi gắm sâu sắc nhất qua câu chuyện chính là: giá trị của món quà nằm ở tấm lòng chân thành chứ không phụ thuộc vào tiền bạc.\"\n\n💡 Phân tích & Giải thích:\n• Đoạn kết khẳng định: dù món quà nhỏ bé rẻ tiền nhưng chứa chan tình yêu thương chân thành thì bao giờ cũng là món quà quý giá nhất trần đời.\n\n🔍 Phân tích các lựa chọn:\n- 1. Phải luôn mua quà thật đắt tiền\n- 2. Sinh nhật thì nhất định phải tổ chức tiệc lớn\n- 3. Nên tự nấu ăn thay vì tặng quà (ĐÚNG)\n- 4. Tấm lòng chân thành và tình yêu thương mới là điều quý giá nhất của món quà (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(33) 4 最想表达的内容: 礼物的真正价值在于真诚的心意而非价格。",
      "correctOption": 3
    },
    "69": {
      "snippet": "Lịch tư vấn về vấn đề nhà ở",
      "explanation": "🎯 Đáp án đúng: [2] Lịch tư vấn về vấn đề nhà ở\n\n💬 Dịch nghĩa câu:\n\"Theo bảng thông báo của trung tâm hành chính, các buổi tư vấn chuyên sâu về thuê và mua nhà ở được tổ chức vào các ngày thứ Ba và thứ Năm hằng tuần.\"\n\n💡 Phân tích & Giải thích:\n• Dò tìm trong bảng mục 'Nhà ở & Cư trú (住まい)': cột ngày tiếp nhận ghi rõ Thứ Ba (火曜日) và Thứ Năm (木曜日).\n\n🔍 Phân tích các lựa chọn:\n- 1. Thứ Hai và thứ Tư\n- 2. Thứ Ba và thứ Năm hằng tuần (ĐÚNG) (ĐÚNG)\n- 3. Chỉ duy nhất sáng thứ Bảy\n- 4. Cả tuần từ thứ Hai đến thứ Sáu\n\n📄 Trích PDF gốc (试题解析):\n(34) 2 关于住所的咨询服务在每周二和周四进行。",
      "correctOption": 2
    },
    "70": {
      "snippet": "Ngày bạn Lee có thể đến tư vấn hôn nhân quốc tế",
      "explanation": "🎯 Đáp án đúng: [4] Ngày bạn Lee có thể đến tư vấn hôn nhân quốc tế\n\n💬 Dịch nghĩa câu:\n\"Bạn Lee muốn được tư vấn về thủ tục kết hôn quốc tế trong tuần này hoặc tuần tới, ngày duy nhất phù hợp trong lịch là thứ Sáu tuần sau.\"\n\n💡 Phân tích & Giải thích:\n• Chuyên đề tư vấn kết hôn quốc tế chỉ mở 2 tuần một lần vào các ngày Thứ Sáu; đối chiếu lịch chỉ có thứ Sáu tuần tới là còn lịch hẹn.\n\n🔍 Phân tích các lựa chọn:\n- 1. Thứ Hai tuần này\n- 2. Thứ Tư tuần tới\n- 3. Thứ Sáu tuần sau (ĐÚNG)\n- 4. Chủ nhật tuần này (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(35) 3 小李咨询跨国婚姻, 符合本周或下周条件的只有下周五。",
      "correctOption": 4
    },
    "71": {
      "snippet": "Vị trí đặt chậu cây cảnh",
      "explanation": "🎯 Đáp án đúng: [2] Vị trí đặt chậu cây cảnh\n\n💬 Dịch nghĩa câu:\n\"Người phụ nữ dặn người nam hãy mang chậu cây cảnh đặt ở ngay cạnh khung cửa sổ phòng khách để cây đón ánh nắng.\"\n\n💡 Phân tích & Giải thích:\n• Theo đối thoại: người nữ lưu ý không để cây ở gần cửa ra vào vì gió lạnh, hãy đặt cạnh cửa sổ nơi có nhiều ánh sáng chiếu vào.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đặt cạnh cửa sổ đón ánh nắng (ĐÚNG)\n- 2. Đặt cạnh cửa ra vào (ĐÚNG)\n- 3. Đặt trên bàn ăn\n- 4. Đặt ngoài ban công\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (1): 男の人は植木鉢をどこに置きますか。 正解: [1]",
      "audioScriptJa": "女：植物は日光が好きだから、窓のすぐそばに置いてくれる？\n男：うん、わかった。窓の横に置くね。",
      "audioScriptVi": "Nữ: Cây cối ưa ánh nắng mặt trời, em đặt chậu cây ngay sát cạnh cửa sổ giúp chị được không?\nNam: Vâng, em hiểu rồi, em đặt cạnh cửa sổ nhé.",
      "correctOption": 2
    },
    "72": {
      "snippet": "Hành động người nam làm trước tiên",
      "explanation": "🎯 Đáp án đúng: [3] Hành động người nam làm trước tiên\n\n💬 Dịch nghĩa câu:\n\"Người nam trước hết sẽ đi pha một ấm trà nóng mời khách trước khi dọn dẹp hoa quả trên bàn.\"\n\n💡 Phân tích & Giải thích:\n• Khách vừa đến nhà, việc lễ nghi trước tiên là phải pha trà nóng bưng ra mời khách thưởng thức.\n\n🔍 Phân tích các lựa chọn:\n- 1. Rửa hoa quả mời khách\n- 2. Đi đun nước pha ấm trà nóng mời khách trước (ĐÚNG)\n- 3. Lấy đĩa bánh kẹo (ĐÚNG)\n- 4. Bật ti vi lên\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (2): 男の人はまず何をしますか。 正解: [2]",
      "audioScriptJa": "女：お客様がいらっしゃったから、まずお茶を入れて持ってきて。\n男：はい、すぐ入れます。",
      "audioScriptVi": "Nữ: Khách quý vừa tới rồi, trước tiên em đi pha trà bưng ra mời bác nhé.\nNam: Vâng, em đi pha ngay ạ.",
      "correctOption": 3
    },
    "73": {
      "snippet": "Tài liệu học sinh cần chuẩn bị nộp",
      "explanation": "🎯 Đáp án đúng: [2] Tài liệu học sinh cần chuẩn bị nộp\n\n💬 Dịch nghĩa câu:\n\"Học sinh cần chuẩn bị bản tóm tắt nội dung bài phát biểu và bản in slide thuyết trình.\"\n\n💡 Phân tích & Giải thích:\n• Thầy giáo hướng dẫn: bản thu hoạch nộp sau, tiết học tới mỗi bạn phải in sẵn 1 bản tóm tắt phát biểu để nộp cho thầy.\n\n🔍 Phân tích các lựa chọn:\n- 1. Nộp bài tiểu luận hoàn chỉnh\n- 2. Nộp bản tóm tắt nội dung bài phát biểu (ĐÚNG) (ĐÚNG)\n- 3. Nộp đĩa CD ghi âm\n- 4. Nộp sổ tay ghi chép\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (3): 学生は何を提出しなければなりませんか。 正解: [2]",
      "audioScriptJa": "先生：次回の授業では、発表の要約を1枚印刷して提出してください。",
      "audioScriptVi": "Thầy giáo: Tiết học tới, các em hãy in 1 tờ tóm tắt nội dung phát biểu để nộp cho thầy nhé.",
      "correctOption": 2
    },
    "74": {
      "snippet": "Cách người nữ di chuyển đến bệnh viện",
      "explanation": "🎯 Đáp án đúng: [1] Cách người nữ di chuyển đến bệnh viện\n\n💬 Dịch nghĩa câu:\n\"Người phụ nữ quyết định sẽ đi bộ thong thả ra bến xe buýt và đón chuyến xe buýt số 12 đi đến cổng bệnh viện.\"\n\n💡 Phân tích & Giải thích:\n• Đi taxi tốn kém, tự lái xe thì không có chỗ đỗ, xe buýt số 12 chạy thẳng tới trạm bệnh viện nên cô chọn đi xe buýt.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đi xe buýt tuyến số 12 (ĐÚNG) (ĐÚNG)\n- 2. Bắt xe taxi đi\n- 3. Tự lái xe ô tô gia đình\n- 4. Đi bộ suốt quãng đường\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (4): 女の人は病院へどうやって行きますか。 正解: [1]",
      "audioScriptJa": "女：12番のバスなら病院の前まで直通だから、バスで行くわ。\n男：うん、気をつけてね。",
      "audioScriptVi": "Nữ: Xe buýt số 12 đi thẳng tới cổng bệnh viện luôn, nên em sẽ đi xe buýt vậy.\nNam: Ừ, em đi cẩn thận nhé.",
      "correctOption": 1
    },
    "75": {
      "snippet": "Món đồ người nam đi mua ở siêu thị",
      "explanation": "🎯 Đáp án đúng: [2] Món đồ người nam đi mua ở siêu thị\n\n💬 Dịch nghĩa câu:\n\"Người nam nhận nhiệm vụ ghé qua siêu thị mua bổ sung thêm sữa tươi và một vỉ trứng gà.\"\n\n💡 Phân tích & Giải thích:\n• Vợ dặn dò: rau và thịt trong tủ còn nhiều, chỉ thiếu sữa tươi và trứng gà để chuẩn bị cho bữa sáng mai.\n\n🔍 Phân tích các lựa chọn:\n- 1. Mua thịt bò và rau xanh\n- 2. Mua sữa tươi và trứng gà (ĐÚNG) (ĐÚNG)\n- 3. Mua bánh mì và bơ\n- 4. Mua hoa quả tráng miệng\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (5): 男の人はスーパーで何を買いますか。 正解: [2]",
      "audioScriptJa": "女：牛乳と卵がもうないから、買ってきてくれる？\n男：オッケー、牛乳と卵ね。",
      "audioScriptVi": "Nữ: Sữa tươi với trứng gà hết sạch rồi, anh ghé mua về giúp em được không?\nNam: OK em, sữa tươi và trứng gà nhé.",
      "correctOption": 2
    },
    "76": {
      "snippet": "Nhiệm vụ bạn nữ làm sau giờ tan học",
      "explanation": "🎯 Đáp án đúng: [2] Nhiệm vụ bạn nữ làm sau giờ tan học\n\n💬 Dịch nghĩa câu:\n\"Bạn nữ sau giờ học sẽ ở lại phòng câu lạc bộ để cùng các bạn tập luyện chuẩn bị cho hội diễn văn nghệ.\"\n\n💡 Phân tích & Giải thích:\n• Bạn nam rủ đi xem phim nhưng bạn nữ từ chối vì đã có lịch tập kịch cùng các thành viên câu lạc bộ kịch nói.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đi ăn tiệm cùng bạn bè\n- 2. Về nhà ngủ nghỉ (ĐÚNG)\n- 3. Đến thư viện ôn thi\n- 4. Ở lại trường tập kịch cho hội diễn văn nghệ (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (6): 女の学生は放課後何をしますか。 正解: [4]",
      "audioScriptJa": "女：文化祭の劇の練習があるから、今日は部室に残るの。\n男：そっか、練習頑張ってね。",
      "audioScriptVi": "Nữ: Hôm nay có buổi tập kịch cho lễ hội văn hóa trường, nên tớ phải ở lại phòng câu lạc bộ rồi.\nNam: Thế à, chúc cậu tập tốt nhé.",
      "correctOption": 2
    },
    "77": {
      "snippet": "Địa điểm hai người hẹn gặp nhau",
      "explanation": "🎯 Đáp án đúng: [4] Địa điểm hai người hẹn gặp nhau\n\n💬 Dịch nghĩa câu:\n\"Hai bạn thống nhất sẽ hẹn gặp mặt nhau tại quán cà phê sách nằm ngay trước cửa ga tàu điện ngầm.\"\n\n💡 Phân tích & Giải thích:\n• Quảng trường trước ga đông đúc khó nhận ra nhau, nên hẹn ngồi chờ tại quán cà phê sách vừa ấm vừa tiện theo dõi.\n\n🔍 Phân tích các lựa chọn:\n- 1. Tại quán cà phê sách trước ga (ĐÚNG)\n- 2. Tại cổng soát vé tàu điện ngầm\n- 3. Tại quầy thông tin du lịch\n- 4. Tại rạp chiếu phim (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (7): 二人はどこで待ち合わせますか。 正解: [1]",
      "audioScriptJa": "女：駅前のブックカフェで待ってるね。\n男：了解、すぐそこに行くよ。",
      "audioScriptVi": "Nữ: Tớ đợi cậu ở quán cà phê sách trước ga nhé.\nNam: Nhất trí, tớ qua đó ngay đây.",
      "correctOption": 4
    },
    "78": {
      "snippet": "Thứ tự sắp xếp tài liệu của nhân viên",
      "explanation": "🎯 Đáp án đúng: [3] Thứ tự sắp xếp tài liệu của nhân viên\n\n💬 Dịch nghĩa câu:\n\"Nhân viên được hướng dẫn phải sắp xếp các tập hồ sơ tài liệu theo đúng trình tự thời gian từ cũ đến mới nhất.\"\n\n💡 Phân tích & Giải thích:\n• Quản lý lưu ý: để tiện cho việc tra cứu hồ sơ sau này, cần xếp chứng từ theo mốc ngày tháng năm từ trước tới sau.\n\n🔍 Phân tích các lựa chọn:\n- 1. Xếp theo bảng chữ cái\n- 2. Xếp theo tên khách hàng\n- 3. Xếp theo trình tự thời gian từ cũ đến mới (ĐÚNG) (ĐÚNG)\n- 4. Xếp theo độ dày của tài liệu\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (8): 書類をどう並べますか。 正解: [3]",
      "audioScriptJa": "上司：日付の古いものから順に並べてファイルに閉じてね。\n部下：はい、日付順ですね。",
      "audioScriptVi": "Cấp trên: Em sắp xếp theo thứ tự ngày tháng từ cũ đến mới rồi kẹp vào file nhé.\nCấp dưới: Vâng, sắp theo trình tự ngày tháng ạ.",
      "correctOption": 3
    },
    "79": {
      "snippet": "Lý do bạn nam chọn học chuyên ngành kinh tế",
      "explanation": "🎯 Đáp án đúng: [1] Lý do bạn nam chọn học chuyên ngành kinh tế\n\n💬 Dịch nghĩa câu:\n\"Bạn nam quyết định chọn học kinh tế vì từ nhỏ đã ấp ủ ước mơ sau này sẽ tự mình khởi nghiệp mở công ty riêng.\"\n\n💡 Phân tích & Giải thích:\n• Bạn nam bộc bạch: muốn tích lũy kiến thức quản trị kinh doanh bài bản để sau này tự tin điều hành doanh nghiệp của mình.\n\n🔍 Phân tích các lựa chọn:\n- 1. Do bố mẹ bắt buộc (ĐÚNG)\n- 2. Vì ngành này dễ xin việc\n- 3. Vì nuôi ước mơ sau này tự mình khởi nghiệp kinh doanh (ĐÚNG)\n- 4. Vì theo bạn bè học cùng\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (1): 男の人はなぜ経済学部を選びましたか。 正解: [3]",
      "audioScriptJa": "男：将来自分の会社を立ち上げて経営するのが夢なんだ。",
      "audioScriptVi": "Nam: Ước mơ tương lai của tớ là tự mình gây dựng và điều hành một công ty riêng.",
      "correctOption": 1
    },
    "80": {
      "snippet": "Điều làm người phụ nữ ấn tượng nhất ở khách sạn",
      "explanation": "🎯 Đáp án đúng: [2] Điều làm người phụ nữ ấn tượng nhất ở khách sạn\n\n💬 Dịch nghĩa câu:\n\"Điều làm người phụ nữ cảm thấy hài lòng và ấn tượng sâu sắc nhất chính là thái độ phục vụ chu đáo, ấm áp của nhân viên.\"\n\n💡 Phân tích & Giải thích:\n• Căn phòng đẹp, đồ ăn ngon, nhưng điểm khiến cô nhớ mãi là sự ân cần, niềm nở tận tình của đội ngũ nhân viên lễ tân.\n\n🔍 Phân tích các lựa chọn:\n- 1. Bể bơi rộng lớn\n- 2. Thái độ phục vụ vô cùng chu đáo và ấm áp của nhân viên (ĐÚNG) (ĐÚNG)\n- 3. Giá phòng rất rẻ\n- 4. Vị trí gần bãi biển\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (2): ホテルのどこが一番良かったと言っていますか。 正解: [2]",
      "audioScriptJa": "女：スタッフの皆さんが本当に親切で温かいおもてなしをしてくれたのが一番心に残ったわ。",
      "audioScriptVi": "Nữ: Điều đọng lại sâu sắc nhất trong lòng mình chính là sự tiếp đón nồng hậu và cực kỳ chu đáo của toàn thể nhân viên.",
      "correctOption": 2
    },
    "81": {
      "snippet": "Thời gian chuyến tàu khởi hành",
      "explanation": "🎯 Đáp án đúng: [1] Thời gian chuyến tàu khởi hành\n\n💬 Dịch nghĩa câu:\n\"Do gặp thời tiết sương mù nhẹ nên giờ khởi hành của chuyến tàu đã được lùi lại 15 phút, xuất phát lúc 10:45.\"\n\n💡 Phân tích & Giải thích:\n• Loa nhà ga thông báo: chuyến tàu lúc 10:30 sẽ chuyển sang khởi hành vào lúc 10:45.\n\n🔍 Phân tích các lựa chọn:\n- 1. Khởi hành lúc 10:45 (ĐÚNG) (ĐÚNG)\n- 2. Khởi hành lúc 10:30\n- 3. Khởi hành lúc 11:00\n- 4. Chuyến tàu bị hủy bỏ\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (3): 電車は何時に出発しますか。 正解: [1]",
      "audioScriptJa": "アナウンス：10時30分発の列車は、15分遅れの10時45分に出発いたします。",
      "audioScriptVi": "Phát thanh: Chuyến tàu dự kiến xuất phát lúc 10h30 sẽ khởi hành lùi lại 15 phút, tức 10h45.",
      "correctOption": 1
    },
    "82": {
      "snippet": "Bí quyết giữ gìn sức khỏe của cụ ông",
      "explanation": "🎯 Đáp án đúng: [3] Bí quyết giữ gìn sức khỏe của cụ ông\n\n💬 Dịch nghĩa câu:\n\"Bí quyết giúp cụ ông dù đã ngoài 80 tuổi vẫn luôn dẻo dai khỏe mạnh là duy trì thói quen đi bộ nhanh 30 phút mỗi sáng sớm.\"\n\n💡 Phân tích & Giải thích:\n• Cụ chia sẻ trên đài: điều quan trọng nhất là ngày nào cũng dậy sớm đi bộ hít thở không khí trong lành suốt nửa tiếng.\n\n🔍 Phân tích các lựa chọn:\n- 1. Uống nhiều loại thuốc bổ\n- 2. Ăn kiêng nghiêm ngặt\n- 3. Tập yoga cường độ cao (ĐÚNG)\n- 4. Duy trì đều đặn thói quen đi bộ 30 phút vào mỗi buổi sáng (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (4): おじいさんの健康の秘訣は何ですか。 正解: [4]",
      "audioScriptJa": "祖父：毎朝欠かさず30分、近所を散歩するのが一番の元気の源だよ。",
      "audioScriptVi": "Cụ ông: Nguồn năng lượng lớn nhất của ông chính là ngày nào cũng đều đặn đi bộ 30 phút quanh xóm vào mỗi sáng sớm đấy.",
      "correctOption": 3
    },
    "83": {
      "snippet": "Lý do cửa hàng bách hóa thông báo đổi tầng",
      "explanation": "🎯 Đáp án đúng: [3] Lý do cửa hàng bách hóa thông báo đổi tầng\n\n💬 Dịch nghĩa câu:\n\"Khu vực quầy thời trang trẻ em tạm thời chuyển lên tầng 4 để nhường toàn bộ mặt bằng tầng 3 cho công tác sửa chữa nâng cấp.\"\n\n💡 Phân tích & Giải thích:\n• Thông báo: tầng 3 bắt đầu cải tạo nội thất từ hôm nay, toàn bộ gian hàng đồ trẻ em chuyển sang sảnh tầng 4.\n\n🔍 Phân tích các lựa chọn:\n- 1. Vì chuyển sang bán đồ gia dụng\n- 2. Vì tầng 3 bắt đầu thi công sửa chữa cải tạo mặt bằng (ĐÚNG)\n- 3. Vì tầng 4 rộng hơn (ĐÚNG)\n- 4. Vì giá thuê tầng 3 đắt\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (5): なぜ売り場が移動しましたか。 正解: [2]",
      "audioScriptJa": "アナウンス：3階フロアの改装工事に伴い、子供服売り場を一時的に4階へ移動しております。",
      "audioScriptVi": "Phát thanh: Để phục vụ công tác cải tạo sửa chữa mặt bằng tầng 3, quầy đồ trẻ em tạm thời chuyển lên tầng 4.",
      "correctOption": 3
    },
    "84": {
      "snippet": "Món ăn bạn nữ gợi ý nấu cho bữa tối",
      "explanation": "🎯 Đáp án đúng: [2] Món ăn bạn nữ gợi ý nấu cho bữa tối\n\n💬 Dịch nghĩa câu:\n\"Bạn nữ gợi ý tối nay cả nhà cùng làm món lẩu rau củ thịt gà ấm cúng vì thời tiết bên ngoài đang trở gió lạnh.\"\n\n💡 Phân tích & Giải thích:\n• Trời lạnh nên ăn lẩu là tuyệt nhất, cả nhà vừa quây quần bên nồi lẩu nóng vừa trò chuyện vui vẻ.\n\n🔍 Phân tích các lựa chọn:\n- 1. Món lẩu gà nấu nấm rau củ ấm cúng (ĐÚNG)\n- 2. Món mì xào giòn (ĐÚNG)\n- 3. Món cơm cà ri cay\n- 4. Món sushi cá hồi\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (6): 女の人は晩ご飯に何を提案しましたか。 正解: [1]",
      "audioScriptJa": "女：今夜は寒いから、体が温まる鶏肉の鍋料理にしない？\n男：いいね、鍋にしよう！",
      "audioScriptVi": "Nữ: Tối nay trời lạnh rồi, mình cùng làm món lẩu gà cho ấm người đi anh?\nNam: Ý hay đấy, ăn lẩu thôi!",
      "correctOption": 2
    },
    "85": {
      "snippet": "Kế hoạch cuối tuần của anh Yamada",
      "explanation": "🎯 Đáp án đúng: [4] Kế hoạch cuối tuần của anh Yamada\n\n💬 Dịch nghĩa câu:\n\"Cuối tuần này anh Yamada sẽ đưa cả gia đình về quê ngoại ở Shizuoka để cùng hái dâu tây tại trang trại.\"\n\n💡 Phân tích & Giải thích:\n• Anh Yamada hào hứng kể: lũ trẻ rất thích ăn quả dâu tây nên cuối tuần anh lái xe chở cả nhà về vườn dâu trải nghiệm hái quả.\n\n🔍 Phân tích các lựa chọn:\n- 1. Ở nhà xem bóng đá\n- 2. Đi leo núi cùng đồng nghiệp\n- 3. Đưa cả nhà về quê trải nghiệm hái dâu tây tại vườn (ĐÚNG)\n- 4. Đi công tác xa (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (7): 山田さんは今週末何をしますか。 正解: [3]",
      "audioScriptJa": "山田：子どもたちが楽しみにしているから、静岡の実家に帰っていちご狩りに行く予定なんだ。",
      "audioScriptVi": "Yamada: Mấy đứa nhỏ đang háo hức lắm, nên cuối tuần này mình định chở cả nhà về quê Shizuoka đi hái dâu tây.",
      "correctOption": 4
    },
    "86": {
      "snippet": "Mời khách vào nhà ngồi chơi",
      "explanation": "🎯 Đáp án đúng: [2] Mời khách vào nhà ngồi chơi\n\n💬 Dịch nghĩa câu:\n\"Khách quý đến bấm chuông tới nhà, chủ nhà mở cửa niềm nở mời khách bước vào: 'Xin mời bác/bạn vào nhà chơi!'\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu chuẩn mời khách bước vào phòng: 「どうぞ、お上がりください。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Xin mời bác vào nhà chơi ạ! (ĐÚNG)\n- 2. Bác đứng ngoài đó nhé (ĐÚNG)\n- 3. Chào bác tôi đi đây\n- 4. Nhà tôi bừa bộn lắm\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (1): 客を家に招き入れます。何と言いますか。 正解: [1]",
      "audioScriptJa": "「どうぞ、お上がりください。」",
      "audioScriptVi": "Xin mời bác vào nhà ạ!",
      "correctOption": 2
    },
    "87": {
      "snippet": "Nhờ người khác nhắc lại câu vừa nói",
      "explanation": "🎯 Đáp án đúng: [1] Nhờ người khác nhắc lại câu vừa nói\n\n💬 Dịch nghĩa câu:\n\"Do xung quanh quá ồn ào nên không nghe rõ người kia vừa nói gì: 'Xin lỗi, anh có thể nhắc lại thêm một lần nữa được không ạ?'\"\n\n💡 Phân tích & Giải thích:\n• Câu nhờ đối phương nhắc lại: 「すみません、もう一度言っていただけませんか。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Anh nói to hơn được không? (ĐÚNG)\n- 2. Xin lỗi, anh có thể nhắc lại câu vừa rồi một lần nữa được không ạ? (ĐÚNG)\n- 3. Tôi không muốn nghe nữa\n- 4. Anh nói nhanh quá\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (2): 相手の言ったことが聞こえませんでした。何と言いますか。 正解: [2]",
      "audioScriptJa": "「すみません、もう一度言っていただけませんか。」",
      "audioScriptVi": "Xin lỗi, anh có thể vui lòng nhắc lại lần nữa được không ạ?",
      "correctOption": 1
    },
    "88": {
      "snippet": "Xin phép được dùng thử món đồ",
      "explanation": "🎯 Đáp án đúng: [1] Xin phép được dùng thử món đồ\n\n💬 Dịch nghĩa câu:\n\"Ở cửa hàng đồ chơi công nghệ, muốn xin phép nhân viên cho mình dùng thử chiếc máy: 'Tôi có thể dùng thử chiếc máy này được không ạ?'\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu xin phép lịch sự: 「これ、使ってみてもいいですか。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Máy này bán bao nhiêu? (ĐÚNG)\n- 2. Tôi mang về nhà nhé\n- 3. Tôi có thể dùng thử một chút chiếc máy này được không ạ? (ĐÚNG)\n- 4. Máy này hỏng rồi à?\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (3): 店の機械を試したいです。何と言いますか。 正解: [3]",
      "audioScriptJa": "「これ、使ってみてもいいですか。」",
      "audioScriptVi": "Tôi có thể dùng thử cái này một chút được không ạ?",
      "correctOption": 1
    },
    "89": {
      "snippet": "Chào đồng nghiệp khi ra về trước",
      "explanation": "🎯 Đáp án đúng: [3] Chào đồng nghiệp khi ra về trước\n\n💬 Dịch nghĩa câu:\n\"Hết giờ làm việc mình về trước còn đồng nghiệp đang ở lại làm thêm: 'Tôi xin phép ra về trước mọi người ạ!'\"\n\n💡 Phân tích & Giải thích:\n• Lời chào tiêu chuẩn văn phòng Nhật: 「お先に失礼します。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Mọi người làm việc chăm chỉ nhé\n- 2. Tôi xin phép về trước ạ! (ĐÚNG)\n- 3. Hôm nay mệt mỏi quá (ĐÚNG)\n- 4. Mai tôi nghỉ làm nhé\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (4): 職場で同僚より先に帰ります。何と言いますか。 正解: [2]",
      "audioScriptJa": "「お先に失礼します。」",
      "audioScriptVi": "Tôi xin phép về trước ạ!",
      "correctOption": 3
    },
    "90": {
      "snippet": "Hỏi mượn chiếc ô khi trời mưa",
      "explanation": "🎯 Đáp án đúng: [1] Hỏi mượn chiếc ô khi trời mưa\n\n💬 Dịch nghĩa câu:\n\"Trời bất chợt đổ mưa to mà không có ô, muốn hỏi mượn đồng nghiệp: 'Cậu có thể cho mình mượn chiếc ô một lúc được không?'\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu nhờ mượn ô: 「傘を貸してもらえませんか。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Bạn cho mình mượn chiếc ô được không? (ĐÚNG) (ĐÚNG)\n- 2. Bạn cầm lấy ô của mình này\n- 3. Chiếc ô này đẹp ghê\n- 4. Trời tạnh mưa rồi kìa\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (5): 傘を借りたいです。何と言いますか。 正解: [1]",
      "audioScriptJa": "「傘を貸してもらえませんか。」",
      "audioScriptVi": "Bạn có thể cho mình mượn chiếc ô được không ạ?",
      "correctOption": 1
    },
    "91": {
      "snippet": "Mời mọc: 'Cuối tuần này mình cùng đi leo núi nhé?'",
      "explanation": "🎯 Đáp án đúng: [3] Mời mọc: 'Cuối tuần này mình cùng đi leo núi nhé?'\n\n💬 Dịch nghĩa câu:\n\"Hào hứng đồng ý: 'Ý kiến hay đấy, tụi mình nhất định cùng đi nhé!'\"\n\n💡 Phân tích & Giải thích:\n• Nhận lời rủ rê nhiệt tình: 「いいですね、ぜひ行きましょう！」\n\n🔍 Phân tích các lựa chọn:\n- 1. Hay quá, nhất định tụi mình cùng đi nhé! (ĐÚNG)\n- 2. Tôi leo núi tuần trước rồi\n- 3. Núi đó cao lắm (ĐÚNG)\n- 4. Tôi không có giày leo núi\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (1): 今度の週末、山登りに行きませんか。 正解: [1]",
      "audioScriptJa": "男：今度の週末、山登りに行きませんか。\n女：いいですね、ぜひ行きましょう！",
      "audioScriptVi": "Nam: Cuối tuần này cậu có muốn cùng tớ đi leo núi không?\nNữ: Hay quá, nhất định chúng mình cùng đi nhé!",
      "correctOption": 3
    },
    "92": {
      "snippet": "Hỏi thăm: 'Chuyến đi công tác xa của bạn thế nào rồi?'",
      "explanation": "🎯 Đáp án đúng: [3] Hỏi thăm: 'Chuyến đi công tác xa của bạn thế nào rồi?'\n\n💬 Dịch nghĩa câu:\n\"Chia sẻ trải nghiệm: 'Công việc bận rộn nhưng mình đã học hỏi được rất nhiều điều bổ ích.'\"\n\n💡 Phân tích & Giải thích:\n• Cập nhật kết quả chuyến đi: 「忙しかったですが、とても勉強になりました。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Tôi không đi công tác đâu\n- 2. Khá là bận rộn nhưng tớ đã học hỏi được rất nhiều điều bổ ích (ĐÚNG)\n- 3. Khách sạn rất rẻ (ĐÚNG)\n- 4. Tuần sau tôi mới đi\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (2): 出張はどうでしたか。 正解: [2]",
      "audioScriptJa": "女：出張はどうでしたか。\n男：忙しかったですが、とても勉強になりました。",
      "audioScriptVi": "Nữ: Chuyến đi công tác của anh thế nào rồi ạ?\nNam: Công việc khá bận rộn nhưng anh đã học hỏi thêm được rất nhiều điều quý báu.",
      "correctOption": 3
    },
    "93": {
      "snippet": "Hỏi thăm sức khỏe: 'Cảm cúm của bạn đã đỡ hơn chút nào chưa?'",
      "explanation": "🎯 Đáp án đúng: [3] Hỏi thăm sức khỏe: 'Cảm cúm của bạn đã đỡ hơn chút nào chưa?'\n\n💬 Dịch nghĩa câu:\n\"Cập nhật tình trạng sức khỏe: 'Cảm ơn bạn nhiều nhé, nhờ uống thuốc nên mình đã khỏe hẳn rồi.'\"\n\n💡 Phân tích & Giải thích:\n• Báo tin bình phục: 「おかげさまで、すっかり良くなりました。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Tôi không uống thuốc đâu\n- 2. Bác sĩ dặn nghỉ ngơi\n- 3. Nhờ có bạn hỏi thăm, mình đã khỏe khoắn trở lại bình thường rồi (ĐÚNG) (ĐÚNG)\n- 4. Tôi bị sốt cao lắm\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (3): 風邪の具合はいかがですか。 正解: [3]",
      "audioScriptJa": "男：風邪の具合はいかがですか。\n女：おかげさまで、すっかり良くなりました。",
      "audioScriptVi": "Nam: Bệnh cảm của cậu đã đỡ hơn chút nào chưa?\nNữ: Cảm ơn cậu đã hỏi thăm, nhờ trời tớ đã khỏi hẳn hoàn toàn rồi.",
      "correctOption": 3
    },
    "94": {
      "snippet": "Hỏi đường: 'Từ đây đi bộ ra ga tàu mất khoảng bao lâu thế bạn?'",
      "explanation": "🎯 Đáp án đúng: [2] Hỏi đường: 'Từ đây đi bộ ra ga tàu mất khoảng bao lâu thế bạn?'\n\n💬 Dịch nghĩa câu:\n\"Chỉ dẫn thời gian đi lại: 'Đi bộ thong thả khoảng chừng 10 phút là tới nơi bạn nhé.'\"\n\n💡 Phân tích & Giải thích:\n• Trả lời khoảng thời gian: 「歩いて10分くらいですよ。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Ga tàu to lắm\n- 2. Đi bộ thong thả khoảng tầm 10 phút là tới nơi thôi bạn nhé (ĐÚNG) (ĐÚNG)\n- 3. Tàu chạy nhanh lắm\n- 4. Vé tàu 200 yên\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (4): 駅まで歩いてどのくらいかかりますか。 正解: [2]",
      "audioScriptJa": "女：駅まで歩いてどのくらいかかりますか。\n男：歩いて10分くらいですよ。",
      "audioScriptVi": "Nữ: Từ đây đi bộ ra nhà ga mất khoảng bao lâu thế bạn?\nNam: Đi bộ túc tắc khoảng 10 phút là tới nơi thôi bạn ạ.",
      "correctOption": 2
    },
    "95": {
      "snippet": "Nhờ vả: 'Bạn có thể giúp mình chuyển chiếc bàn này qua kia được không?'",
      "explanation": "🎯 Đáp án đúng: [2] Nhờ vả: 'Bạn có thể giúp mình chuyển chiếc bàn này qua kia được không?'\n\n💬 Dịch nghĩa câu:\n\"Vui vẻ nhận lời giúp đỡ: 'Được chứ, để mình khiêng phụ bạn ngay đây!'\"\n\n💡 Phân tích & Giải thích:\n• Đồng ý giúp đỡ nhiệt tình: 「ええ、いいですよ。手伝いますね。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Bàn này bằng gỗ đấy\n- 2. Tôi bận lắm không làm đâu (ĐÚNG)\n- 3. Được chứ, để mình giúp cậu khiêng qua nhé! (ĐÚNG)\n- 4. Cái bàn nặng quá\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (5): この机を運ぶの手伝ってもらえますか。 正解: [3]",
      "audioScriptJa": "男：この机を運ぶの手伝ってもらえますか。\n女：ええ、いいですよ。手伝いますね。",
      "audioScriptVi": "Nam: Cậu có thể giúp tớ khiêng chiếc bàn này qua đằng kia một tay được không?\nNữ: Vâng được chứ, để mình phụ bạn khiêng qua nhé.",
      "correctOption": 2
    },
    "96": {
      "snippet": "Mời trà: 'Bạn có muốn dùng thêm một tách trà xanh nữa không?'",
      "explanation": "🎯 Đáp án đúng: [2] Mời trà: 'Bạn có muốn dùng thêm một tách trà xanh nữa không?'\n\n💬 Dịch nghĩa câu:\n\"Nhận lời lịch sự: 'Cảm ơn bạn, vậy cho mình xin thêm một chén nữa nhé.'\"\n\n💡 Phân tích & Giải thích:\n• Nhận lời nhã nhặn: 「すみません、いただきます。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Cảm ơn bạn, vậy cho mình xin phép dùng thêm một chén nhé (ĐÚNG)\n- 2. Trà đắng quá tôi không uống (ĐÚNG)\n- 3. Đừng pha trà nữa\n- 4. Hết nước sôi rồi\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (6): お茶のおかわりはいかがですか。 正解: [1]",
      "audioScriptJa": "女：お茶のおかわりはいかがですか。\n男：すみません、いただきます。",
      "audioScriptVi": "Nữ: Bạn có muốn dùng thêm một tách trà nữa không ạ?\nNam: Cảm ơn bạn nhiều, vậy mình xin phép dùng thêm một tách nữa nhé.",
      "correctOption": 2
    },
    "97": {
      "snippet": "Khen ngợi: 'Món ăn do chính tay bạn nấu ngon tuyệt vời luôn ấy!'",
      "explanation": "🎯 Đáp án đúng: [2] Khen ngợi: 'Món ăn do chính tay bạn nấu ngon tuyệt vời luôn ấy!'\n\n💬 Dịch nghĩa câu:\n\"Đáp lại lời khen khiêm tốn: 'Thật thế sao? Cậu thích là mình vui lắm rồi!'\"\n\n💡 Phân tích & Giải thích:\n• Đáp lại lời khen khiêm nhường: 「本当ですか？喜んでもらえて嬉しいです。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Tôi không biết nấu ăn\n- 2. Thật thế sao bạn? Bạn ăn thấy ngon miệng là mình vui lắm rồi! (ĐÚNG) (ĐÚNG)\n- 3. Món này nấu đắt tiền lắm\n- 4. Lần sau bạn nhớ nấu nhé\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (7): この手料理、本当に美味しいですね！ 正解: [2]",
      "audioScriptJa": "男：この手料理、本当に美味しいですね！\n女：本当ですか？喜んでもらえて嬉しいです。",
      "audioScriptVi": "Nam: Món ăn do cậu tự tay nấu nếm ngon tuyệt đỉnh luôn ấy!\nNữ: Thật thế hả cậu? Cậu khen ngon và thích ăn là mình vui lắm rồi.",
      "correctOption": 2
    },
    "98": {
      "snippet": "Hỏi ý kiến: 'Chiếc áo khoác này bạn thấy màu sắc thế nào?'",
      "explanation": "🎯 Đáp án đúng: [1] Hỏi ý kiến: 'Chiếc áo khoác này bạn thấy màu sắc thế nào?'\n\n💬 Dịch nghĩa câu:\n\"Góp ý chân thành: 'Màu sáng rất đẹp và cực kỳ tôn dáng của bạn đấy!'\"\n\n💡 Phân tích & Giải thích:\n• Đưa ra nhận xét tích cực: 「明るい色で、とても似合っていますよ。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Áo này dày quá (ĐÚNG)\n- 2. Đừng mặc áo khoác\n- 3. Màu sắc tươi sáng và trông rất hợp với vóc dáng của bạn đấy! (ĐÚNG)\n- 4. Bao nhiêu tiền thế?\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (8): このコート、どう思いますか。 正解: [3]",
      "audioScriptJa": "女：このコート、どう思いますか。\n男：明るい色で、とても似合っていますよ。",
      "audioScriptVi": "Nữ: Cậu thấy chiếc áo khoác này trông thế nào?\nNam: Màu sắc tươi sáng nhã nhặn mà trông cực kỳ hợp với cậu luôn đấy.",
      "correctOption": 1
    },
  },
  "n4-2014-07": {
    "1": {
      "snippet": "案内 (あんない)",
      "explanation": "🎯 Đáp án đúng: [4] 案内 (あんない)\n\n💬 Dịch nghĩa câu:\n\"Tôi đã được anh ấy nhiệt tình dẫn đi tham quan thành phố.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「案」 (án) có âm On là 「あん」, chữ 「内」 (nội) có âm On là 「ない」 -> 案内 (あんない: hướng dẫn, dẫn đường).\n\n🔍 Phân tích các lựa chọn:\n- 1. あんねい: Sai âm On của 内\n- 2. あんない (案内): Hướng dẫn, dẫn đường\n- 3. あない: Thiếu âm ん\n- 4. あねい: Sai cả hai âm (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(1) 2 句意: 他热情地带我参观了城市。2. あんない(案内): 引导, 导游",
      "correctOption": 4
    },
    "2": {
      "snippet": "習い (ならい)",
      "explanation": "🎯 Đáp án đúng: [3] 習い (ならい)\n\n💬 Dịch nghĩa câu:\n\"Thầy Kuninaka ơi, thầy đã bắt đầu học kiếm đạo từ khi nào thế ạ?\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「ならう (習う - tập)」: học tập một kỹ năng. Dạng danh từ / liên dụng: 「ならい」.\n\n🔍 Phân tích các lựa chọn:\n- 1. すまい (住まい): Nơi ở\n- 2. つかい (使い): Cách dùng\n- 3. ならい (習い): Việc học tập, rèn luyện (ĐÚNG)\n- 4. てつだい (手伝い): Giúp đỡ\n\n📄 Trích PDF gốc (试题解析):\n(2) 3 句意: 国中老师你是从什么时候开始学的? 3. ならう(習う): 学习",
      "correctOption": 3
    },
    "3": {
      "snippet": "軽い (かるい)",
      "explanation": "🎯 Đáp án đúng: [1] 軽い (かるい)\n\n💬 Dịch nghĩa câu:\n\"Chiếc máy tính xách tay đời mới này cầm rất là nhẹ nhàng.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ 「かるい」 viết bằng chữ Hán là 「軽い」 (khinh - nhẹ, đối lập với nặng 重い).\n\n🔍 Phân tích các lựa chọn:\n- 1. かるい (軽い): Nhẹ nhàng (ĐÚNG)\n- 2. おもい (重い): Nặng nề\n- 3. あかるい (明るい): Sáng sủa\n- 4. くらい (暗い): Tối tăm\n\n📄 Trích PDF gốc (试题解析):\n(3) 1 句意: 这台电脑很轻。1. かるい(軽い): 轻",
      "correctOption": 1
    },
    "4": {
      "snippet": "安い (やすい)",
      "explanation": "🎯 Đáp án đúng: [2] 安い (やすい)\n\n💬 Dịch nghĩa câu:\n\"Thực phẩm và rau củ quả ở siêu thị này giá cả rất là rẻ.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ 「やすい」 viết bằng chữ Hán là 「安い」 (an - rẻ, giá cả bình dân).\n\n🔍 Phân tích các lựa chọn:\n- 1. たかい (高い): Đắt đỏ\n- 2. やすい (安い): Rẻ, bình dân (ĐÚNG)\n- 3. ひくい (低い): Thấp\n- 4. あまい (甘い): Ngọt ngào\n\n📄 Trích PDF gốc (试题解析):\n(4) 2 句意: 这家超市的食品很便宜。2. やすい(安い): 便宜",
      "correctOption": 2
    },
    "5": {
      "snippet": "顔 (かお)",
      "explanation": "🎯 Đáp án đúng: [4] 顔 (かお)\n\n💬 Dịch nghĩa câu:\n\"Trên khuôn mặt của bạn đang bị dính vết bẩn kìa.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「かお」 viết bằng chữ Hán chuẩn xác là 「顔」 (nhan - khuôn mặt).\n\n🔍 Phân tích các lựa chọn:\n- 1. あたま (頭): Cái đầu\n- 2. こころ (心): Trái tim\n- 3. からだ (体): Cơ thể\n- 4. かお (顔): Khuôn mặt (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(5) 4 句意: 你的脸上沾上了点东西哦。4. かお(顔): 脸",
      "correctOption": 4
    },
    "6": {
      "snippet": "天気予報 (てんきよほう)",
      "explanation": "🎯 Đáp án đúng: [1] 天気予報 (てんきよほう)\n\n💬 Dịch nghĩa câu:\n\"Sáng nay vội đi làm nên tôi đã không kịp xem bản tin dự báo thời tiết.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「天気」 (てんき) ghép với 「予報」 (よほう) tạo thành cụm từ 「天気予報 (てんきよほう: dự báo thời tiết)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. てんきよほう (天気予報): Dự báo thời tiết (ĐÚNG)\n- 2. でんきよほう: Nhầm sang điện khí 電気\n- 3. てんきよぼう: Sai âm đục\n- 4. でんきよぼう: Sai cả hai âm\n\n📄 Trích PDF gốc (试题解析):\n(6) 1 句意: 今天早上没有看天气预报。1. 天気予報(てんきよほう): 天气预报",
      "correctOption": 1
    },
    "7": {
      "snippet": "動かないで (うごかないで)",
      "explanation": "🎯 Đáp án đúng: [2] 動かないで (うごかないで)\n\n💬 Dịch nghĩa câu:\n\"Anh Yamamoto ơi, xin anh hãy giữ nguyên tư thế và đừng cử động nhé.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「うごく (動く - động)」: chuyển động, cử động. Cấm đoán lịch sự: 「動かないでください」.\n\n🔍 Phân tích các lựa chọn:\n- 1. はたらかないで (働く): Xin đừng làm việc\n- 2. うごかないで (動く): Xin đừng cử động, nhúc nhích (ĐÚNG)\n- 3. ならわないで (習う): Xin đừng học\n- 4. あるかないで (歩く): Xin đừng đi bộ\n\n📄 Trích PDF gốc (试题解析):\n(7) 2 句意: 山本先生, 请不要动。2. うごく(動く): 动, 移动",
      "correctOption": 2
    },
    "8": {
      "snippet": "運んで (はこんで)",
      "explanation": "🎯 Đáp án đúng: [2] 運んで (はこんで)\n\n💬 Dịch nghĩa câu:\n\"Xin hãy giúp tôi một tay khuân vác chiếc hòm hành lý này sang phòng bên cạnh.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「はこぶ (運ぶ - vận)」: vận chuyển, khuân vác dời đồ đạc.\n\n🔍 Phân tích các lựa chọn:\n- 1. たのんで (頼む): Nhờ vả\n- 2. ふんで (踏む): Giẫm đạp (ĐÚNG)\n- 3. かんで (噛む): Cắn nhai\n- 4. はこんで (運ぶ): Khuân vác, chuyển dời\n\n📄 Trích PDF gốc (试题解析):\n(8) 4 句意: 请帮我把这件行李搬到隔壁。4. はこぶ(運ぶ): 搬运",
      "correctOption": 2
    },
    "9": {
      "snippet": "特急 (とっきゅう)",
      "explanation": "🎯 Đáp án đúng: [3] 特急 (とっきゅう)\n\n💬 Dịch nghĩa câu:\n\"Chuyến tàu tốc hành đặc biệt (đặc cấp) sắp sửa tiến vào sân ga rồi.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「特」 biến âm ngắt 「とっ」 ghép với chữ 「急」 (きゅう) -> 特急 (とっきゅう: tàu tốc hành đặc biệt).\n\n🔍 Phân tích các lựa chọn:\n- 1. とくきゅう: Chưa biến âm ngắt\n- 2. とっきゅ: Thiếu trường âm う\n- 3. とっきゅう (特急): Tàu đặc cấp, tốc hành (ĐÚNG)\n- 4. どっきゅう: Sai âm đầu\n\n📄 Trích PDF gốc (试题解析):\n(9) 3 句意: 特快列车马上就要来了。3. とっきゅう(特急): 特快列车",
      "correctOption": 3
    },
    "10": {
      "snippet": "面白い (おもしろい)",
      "explanation": "🎯 Đáp án đúng: [3] 面白い (おもしろい)\n\n💬 Dịch nghĩa câu:\n\"Bộ phim điện ảnh chiếu rạp cuối tuần vừa rồi vô cùng thú vị và lôi cuốn.\"\n\n💡 Phân tích & Giải thích:\n• Từ 「おもしろい」 viết bằng chữ Hán chuẩn xác là 「面白い」 (diện bạch - thú vị, hay ho).\n\n🔍 Phân tích các lựa chọn:\n- 1. 面白: Thiếu Okurigana い\n- 2. 面自い: Sai chữ Hán tự\n- 3. 面白い (おもしろい): Thú vị, hấp dẫn (ĐÚNG)\n- 4. 面白り: Sai đuôi\n\n📄 Trích PDF gốc (试题解析):\n(10) 3 句意: 那部电影很有趣。3. 面白い（おもしろい）: 有趣",
      "correctOption": 3
    },
    "11": {
      "snippet": "昼 (ひる)",
      "explanation": "🎯 Đáp án đúng: [2] 昼 (ひる)\n\n💬 Dịch nghĩa câu:\n\"Buổi trưa nay tôi đã cùng đồng nghiệp đi ăn cơm ở nhà hàng trước cổng công ty.\"\n\n💡 Phân tích & Giải thích:\n• Từ 「ひる」 viết bằng chữ Hán chuẩn xác là 「昼」 (trú - buổi trưa, ban ngày).\n\n🔍 Phân tích các lựa chọn:\n- 1. 朝 (あさ): Buổi sáng\n- 2. 昼 (ひる): Buổi trưa, ban ngày (ĐÚNG)\n- 3. 夕 (ゆう): Chiều tối\n- 4. 夜 (よる): Ban đêm\n\n📄 Trích PDF gốc (试题解析):\n(11) 2 句意: 中午和同事一起吃了午饭。2. 昼（ひる）: 中午, 白天",
      "correctOption": 2
    },
    "12": {
      "snippet": "売り場 (うりば)",
      "explanation": "🎯 Đáp án đúng: [1] 売り場 (うりば)\n\n💬 Dịch nghĩa câu:\n\"Xin lỗi cho tôi hỏi, quầy bán đồ chơi trẻ em nằm ở tầng mấy vậy ạ?\"\n\n💡 Phân tích & Giải thích:\n• Từ ghép: Động từ 「売る」 dạng liên dụng 「売り」 ghép với danh từ 「場」 -> 「売り場」 (quầy bán hàng).\n\n🔍 Phân tích các lựa chọn:\n- 1. 売り場 (うりば): Quầy bán hàng (ĐÚNG)\n- 2. 買場: Quầy mua (sai)\n- 3. 売所: Sai chữ\n- 4. 買所: Sai chữ\n\n📄 Trích PDF gốc (试题解析):\n(12) 1 句意: 玩具卖场在哪里? 1. 売り場（うりば）: 柜台, 售货处",
      "correctOption": 1
    },
    "13": {
      "snippet": "終わる (おわる)",
      "explanation": "🎯 Đáp án đúng: [4] 終わる (おわる)\n\n💬 Dịch nghĩa câu:\n\"Buổi biểu diễn hòa nhạc thính phòng dự kiến sẽ kết thúc vào lúc 4 giờ chiều.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「おわる」 được viết bằng chữ Hán chuẩn xác là 「終わる」 (chung - kết thúc, chấm dứt).\n\n🔍 Phân tích các lựa chọn:\n- 1. 始る (はじまる): Bắt đầu (sai nghĩa)\n- 2. 止る (とまる): Dừng lại\n- 3. 休る (やすむ): Nghỉ ngơi\n- 4. 終わる (おわる): Kết thúc, hoàn tất (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(13) 4 句意: 演奏会四点结束。4. 終わる（おわる）: 结束",
      "correctOption": 4
    },
    "14": {
      "snippet": "本屋 (ほんや)",
      "explanation": "🎯 Đáp án đúng: [3] 本屋 (ほんや)\n\n💬 Dịch nghĩa câu:\n\"Khu vực lân cận quanh đây có tiệm bán sách nào không ạ?\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「本」 (sách) ghép với chữ 「屋」 (tiệm, quán) tạo thành danh từ 「本屋」 (tiệm sách).\n\n🔍 Phân tích các lựa chọn:\n- 1. 本家: Nhà gốc, dòng chính\n- 2. 本室: Phòng đọc\n- 3. 本屋 (ほんや): Hiệu sách, tiệm sách (ĐÚNG)\n- 4. 本所: Trụ sở chính\n\n📄 Trích PDF gốc (试题解析):\n(14) 3 句意: 这附近有书店吗? 3. 本屋（ほんや）: 书店",
      "correctOption": 3
    },
    "15": {
      "snippet": "係の人 (かかりのひと)",
      "explanation": "🎯 Đáp án đúng: [2] 係の人 (かかりのひと)\n\n💬 Dịch nghĩa câu:\n\"Nếu bạn không rõ quy định, hãy đến hỏi trực tiếp người phụ trách nhé.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán chuẩn xác cho 「かかり」 trong người phụ trách công việc là 「係」 (hệ - người phụ trách).\n\n🔍 Phân tích các lựa chọn:\n- 1. 任の人: Nhầm chữ\n- 2. 係の人 (かかりのひと): Người phụ trách, nhân viên trực (ĐÚNG)\n- 3. 役の人: Nhầm chữ\n- 4. 関の人: Nhầm chữ\n\n📄 Trích PDF gốc (试题解析):\n(15) 2 句意: 问问负责人吧? 2. 係（かかり）: 负责人, 经办人",
      "correctOption": 2
    },
    "16": {
      "snippet": "乗り換え (のりかえ)",
      "explanation": "🎯 Đáp án đúng: [2] 乗り換え (のりかえ)\n\n💬 Dịch nghĩa câu:\n\"Xin hành khách hãy xuống tàu ở nhà ga thứ hai, sau đó đổi sang chuyến xe buýt số 5.\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ: 「乗り換える / 乗り換え」 mang nghĩa chuyển đổi từ phương tiện này sang phương tiện khác.\n\n🔍 Phân tích các lựa chọn:\n- 1. 乗り降り (lên xuống xe)\n- 2. 乗り換え (chuyển tuyến, đổi xe) (ĐÚNG)\n- 3. 乗り越し (đi quá ga)\n- 4. 乗り止め (ngừng xe)\n\n📄 Trích PDF gốc (试题解析):\n(16) 2 句意: 请在第二站下电车, 换乘公交车。2. のりかえ(乗り換え): 换乘",
      "correctOption": 2
    },
    "17": {
      "snippet": "英語 (えいご)",
      "explanation": "🎯 Đáp án đúng: [4] 英語 (えいご)\n\n💬 Dịch nghĩa câu:\n\"Trên thực đơn của nhà hàng đó có ghi cả phần giải thích chú thích bằng tiếng Anh.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「英語 (えいご)」: tiếng Anh. Dùng trong giải thích thực đơn cho khách ngoại quốc.\n\n🔍 Phân tích các lựa chọn:\n- 1. 日本語: Tiếng Nhật\n- 2. 中国語: Tiếng Trung\n- 3. フランス語: Tiếng Pháp\n- 4. 英語 (えいご): Tiếng Anh (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(17) 4 句意: 那家餐厅的菜单上还写有英文说明。4. えいご(英語): 英语",
      "correctOption": 4
    },
    "18": {
      "snippet": "卒業 (そつぎょう)",
      "explanation": "🎯 Đáp án đúng: [4] 卒業 (そつぎょう)\n\n💬 Dịch nghĩa câu:\n\"Tháng trước tôi vừa tốt nghiệp trường đại học, hiện tại tôi đang đi làm tại một công ty ở Nhật.\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ: 「大学を卒業する」 (tốt nghiệp ra trường đại học).\n\n🔍 Phân tích các lựa chọn:\n- 1. 入学 (nhập học)\n- 2. 退学 (thôi học)\n- 3. 休学 (nghỉ học tạm thời)\n- 4. 卒業 (そつぎょう: tốt nghiệp) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(18) 4 句意: 上个月从大学毕业了, 现在在日本工作。4. そつぎょう(卒業): 毕业",
      "correctOption": 4
    },
    "19": {
      "snippet": "工事 (こうじ)",
      "explanation": "🎯 Đáp án đúng: [2] 工事 (こうじ)\n\n💬 Dịch nghĩa câu:\n\"Đoạn đường này hiện đang trong quá trình thi công sửa chữa nên tạm thời không thể lưu thông.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「工事 (こうじ)」 nghĩa là công trình xây dựng, sửa chữa cầu đường.\n\n🔍 Phân tích các lựa chọn:\n- 1. 事故 (tai nạn giao thông)\n- 2. 工事 (công trình xây dựng, thi công) (ĐÚNG)\n- 3. 故障 (sự cố hỏng hóc)\n- 4. 混雑 (tắc nghẽn đông đúc)\n\n📄 Trích PDF gốc (试题解析):\n(19) 2 句意: 这条路正在施工, 所以无法通过。2. こうじ(工事): 施工, 工程",
      "correctOption": 2
    },
    "20": {
      "snippet": "割ってしまった (わってしまった)",
      "explanation": "🎯 Đáp án đúng: [3] 割ってしまった (わってしまった)\n\n💬 Dịch nghĩa câu:\n\"Hôm nay trong lúc dọn dẹp bát đĩa, tôi đã vô ý làm rơi và đánh vỡ mất một chiếc đĩa.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「わる (割る)」: làm vỡ đồ gốm sứ, thủy tinh. Cấu trúc lỡ làm vỡ: 「割ってしまった」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 折ってしまった (làm gãy cành)\n- 2. 切ってしまった (cắt đứt)\n- 3. 割ってしまった (làm vỡ đồ sứ, đĩa) (ĐÚNG)\n- 4. 破ってしまった (làm rách giấy)\n\n📄 Trích PDF gốc (试题解析):\n(20) 3 句意: 我今天打碎了一个盘子。3. 割る(わる): 打碎, 弄碎",
      "correctOption": 3
    },
    "21": {
      "snippet": "すっかり",
      "explanation": "🎯 Đáp án đúng: [1] すっかり\n\n💬 Dịch nghĩa câu:\n\"Sau một tuần uống thuốc và nghỉ ngơi điều độ, bệnh cảm cúm của tôi đã khỏi hẳn hoàn toàn.\"\n\n💡 Phân tích & Giải thích:\n• Phó từ 「すっかり」 kết hợp với động từ hồi phục 「治る」 mang nghĩa: hoàn toàn khỏi hẳn.\n\n🔍 Phân tích các lựa chọn:\n- 1. すっかり (hoàn toàn, khỏi hẳn) (ĐÚNG)\n- 2. ぴったり (vừa vặn khít khao)\n- 3. しっかり (chắc chắn, chăm chỉ)\n- 4. びっくり (giật mình sửng sốt)\n\n📄 Trích PDF gốc (试题解析):\n(21) 1 句意: 感冒彻底痊愈了。1. すっかり: 彻底, 完全",
      "correctOption": 1
    },
    "22": {
      "snippet": "相談 (そうだん)",
      "explanation": "🎯 Đáp án đúng: [4] 相談 (そうだん)\n\n💬 Dịch nghĩa câu:\n\"Điểm đến cho chuyến du lịch dã ngoại đã được quyết định sau khi tôi bàn bạc kỹ lưỡng với bạn bè.\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ: 「～と相談する」 (bàn bạc, thảo luận, trao đổi ý kiến cùng với ai đó).\n\n🔍 Phân tích các lựa chọn:\n- 1. 挨拶 (chào hỏi)\n- 2. 約束 (hẹn ước)\n- 3. 連絡 (liên lạc)\n- 4. 相談 (そうだん: bàn bạc, thảo luận) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(22) 4 句意: 要去哪里旅行, 是在问了班上同学的意见后决定的。4. 相談(そうだん): 商量, 讨论",
      "correctOption": 4
    },
    "23": {
      "snippet": "迎える (むかえる)",
      "explanation": "🎯 Đáp án đúng: [1] 迎える (むかえる)\n\n💬 Dịch nghĩa câu:\n\"Bố mẹ tôi từ quê nhà chuẩn bị bay lên thăm, nên chiều nay tôi sẽ ra sân bay đón bố mẹ.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「むかえる (迎える)」: nghênh đón, đi đón người thân ở sân bay, nhà ga.\n\n🔍 Phân tích các lựa chọn:\n- 1. 迎える (むかえる: nghênh đón) (ĐÚNG)\n- 2. 送る (おくる: tiễn đưa)\n- 3. 送別する (chia tay)\n- 4. 訪ねる (ghé thăm)\n\n📄 Trích PDF gốc (试题解析):\n(23) 1 句意: 父母要从故乡过来, 所以我要去机场接他们。1. 迎える(むかえる): 迎接",
      "correctOption": 1
    },
    "24": {
      "snippet": "固い (かたい)",
      "explanation": "🎯 Đáp án đúng: [1] 固い (かたい)\n\n💬 Dịch nghĩa câu:\n\"Khúc thịt nướng này dai và cứng quá, trước khi nuốt bạn nhớ phải nhai thật kỹ nhé.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ 「かたい (固い / 硬い)」: cứng, dai (đối lập với mềm やわらかい).\n\n🔍 Phân tích các lựa chọn:\n- 1. 固い (かたい: cứng, dai) (ĐÚNG)\n- 2. 柔らかい (やわらかい: mềm)\n- 3. 甘い (ngọt)\n- 4. 辛い (cay nồng)\n\n📄 Trích PDF gốc (试题解析):\n(24) 1 句意: 这块肉很硬, 吃之前请好好嚼一下。1. かたい(固い): 硬, 坚硬",
      "correctOption": 1
    },
    "25": {
      "snippet": "飾る (かざる)",
      "explanation": "🎯 Đáp án đúng: [3] 飾る (かざる)\n\n💬 Dịch nghĩa câu:\n\"Hôm nay nhà tôi có tổ chức tiệc chiêu đãi bạn bè, nên tôi đã cắm hoa tươi trang trí trên bàn ăn.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「かざる (飾る)」: trang trí, bài trí không gian cho thêm phần đẹp đẽ, trang trọng.\n\n🔍 Phân tích các lựa chọn:\n- 1. 片付ける (thu dọn ngăn nắp)\n- 2. 捨てる (vứt bỏ đồ)\n- 3. 飾る (かざる: bài trí, trang trí hoa tươi) (ĐÚNG)\n- 4. 運ぶ (khuân vác vận chuyển)\n\n📄 Trích PDF gốc (试题解析):\n(25) 3 句意: 今天有个聚会, 所以在桌上装饰了些花。3. 飾る(かざる): 装饰",
      "correctOption": 3
    },
    "26": {
      "snippet": "大切 ≒ 大事",
      "explanation": "🎯 Đáp án đúng: [2] 大切 ≒ 大事\n\n💬 Dịch nghĩa câu:\n\"Văn kiện này là tài liệu quan trọng tuyệt đối không được làm thất lạc.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ đuôi な 「たいせつ (大切: quan trọng, quý giá)」 hoàn toàn đồng nghĩa với 「だいじ (大事: hệ trọng, quan trọng)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Dễ dàng, đơn giản (簡単)\n- 2. Quan trọng, hệ trọng (大事) (ĐÚNG)\n- 3. Đẹp mắt (綺麗)\n- 4. Rẻ tiền (安い)\n\n📄 Trích PDF gốc (试题解析):\n(26) 2 句意: 这个非常重要。(大切 ≒ 大事)",
      "correctOption": 2
    },
    "27": {
      "snippet": "禁煙 ≒ タバコを吸ってはいけない",
      "explanation": "🎯 Đáp án đúng: [4] 禁煙 ≒ タバコを吸ってはいけない\n\n💬 Dịch nghĩa câu:\n\"Khu vực sảnh chờ nhà ga này là khu vực cấm hút thuốc lá tuyệt đối.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「禁煙 (きんえん: cấm hút thuốc)」 có ý nghĩa tương đương là: không được phép hút thuốc lá ở đây.\n\n🔍 Phân tích các lựa chọn:\n- 1. Có thể hút thuốc thoải mái\n- 2. Nơi bán thuốc lá\n- 3. Chỉ hút thuốc sau giờ làm\n- 4. Tuyệt đối không được hút thuốc lá ở đây (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(27) 4 句意: 这里禁烟。(禁煙 ≒ タバコを吸ってはいけない)",
      "correctOption": 4
    },
    "28": {
      "snippet": "叱られた ≒ 怒られた",
      "explanation": "🎯 Đáp án đúng: [4] 叱られた ≒ 怒られた\n\n💬 Dịch nghĩa câu:\n\"Hôm qua do đi chơi về muộn không xin phép nên tôi đã bị bố lớn tiếng trách mắng.\"\n\n💡 Phân tích & Giải thích:\n• Động từ bị động 「しかられた (叱られた: bị quở mắng)」 đồng nghĩa với 「怒られた (おこられた: bị nổi giận, mắng mỏ)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Được khen ngợi (褒められた)\n- 2. Được tặng quà\n- 3. Được tha thứ\n- 4. Bị bố nổi giận trách mắng (怒られた) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(28) 4 句意: 昨天被爸爸骂了。(叱られた ≒ 怒られた)",
      "correctOption": 4
    },
    "29": {
      "snippet": "届く ≒ 着く",
      "explanation": "🎯 Đáp án đúng: [1] 届く ≒ 着く\n\n💬 Dịch nghĩa câu:\n\"Kiện hàng bưu điện dự kiến sẽ được giao tới địa chỉ của bạn vào lúc 9 giờ sáng mai.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「とどく (届く: được chuyển tới nơi)」 có ý nghĩa tương đương với 「つく (着く: tới nơi, đến tay người nhận)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Giao tới nơi, đến nơi (着く) (ĐÚNG)\n- 2. Bị hoàn trả lại\n- 3. Bị hư hỏng\n- 4. Gửi đi xa\n\n📄 Trích PDF gốc (试题解析):\n(29) 1 句意: 明天9点送达那边。(届く ≒ 着く)",
      "correctOption": 1
    },
    "30": {
      "snippet": "生産 ≒ 作る",
      "explanation": "🎯 Đáp án đúng: [3] 生産 ≒ 作る\n\n💬 Dịch nghĩa câu:\n\"Khu công nghiệp ngoại thành này là nơi chuyên sản xuất các dòng xe ô tô xuất khẩu.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「生産 (せいさん: sản xuất)」 đồng nghĩa với động từ chế tạo, tạo ra sản phẩm: 「作る (つくる)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sửa chữa xe hơi\n- 2. Mua bán xe ô tô\n- 3. Sản xuất, chế tạo xe ô tô (作る) (ĐÚNG)\n- 4. Lái thử xe ô tô\n\n📄 Trích PDF gốc (试题解析):\n(30) 3 句意: 这里是生产车的地方。(生産 ≒ 作る)",
      "correctOption": 3
    },
    "31": {
      "snippet": "計画 (けいかく)",
      "explanation": "🎯 Đáp án đúng: [2] 計画 (けいかく)\n\n💬 Dịch nghĩa câu:\n\"Chúng tôi đang lên kế hoạch cụ thể cho chuyến du lịch Hokkaido vào kỳ nghỉ đông tới.\"\n\n💡 Phân tích & Giải thích:\n• Từ 「計画 (けいかく)」 dùng để chỉ kế hoạch, dự định sắp xếp các hoạt động trong tương lai.\n\n🔍 Phân tích các lựa chọn:\n- 1. Kế hoạch cho chuyến đi du lịch mùa đông\n- 2. Kế hoạch bài tập (dùng sai) (ĐÚNG)\n- 3. Kế hoạch bữa sáng (dùng sai)\n- 4. Kế hoạch thời tiết (dùng sai)\n\n📄 Trích PDF gốc (试题解析):\n(31) 2 けいかく 意思是“计划, 规划”, 选项 2 为正确应用。",
      "correctOption": 2
    },
    "32": {
      "snippet": "お礼 (おれい)",
      "explanation": "🎯 Đáp án đúng: [1] お礼 (おれい)\n\n💬 Dịch nghĩa câu:\n\"Tôi đã mua một món quà lưu niệm nhỏ để bày tỏ lời cảm ơn sâu sắc tới người đã giúp đỡ mình.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「お礼 (おれい)」 dùng để biểu thị sự cảm ơn, đền đáp ơn nghĩa đối với người đã giúp đỡ mình.\n\n🔍 Phân tích các lựa chọn:\n- 1. Tặng quà để nói lời cảm ơn người đã giúp đỡ (ĐÚNG)\n- 2. Nói lời cảm ơn vì đi muộn (phải dùng お詫び/謝罪)\n- 3. Xin lỗi khi làm rơi vỡ đồ\n- 4. Chào tạm biệt\n\n📄 Trích PDF gốc (试题解析):\n(32) 1 お礼 意思是“感谢, 谢礼”, 选项 1 为正确应用。",
      "correctOption": 1
    },
    "33": {
      "snippet": "丁寧 (ていねい)",
      "explanation": "🎯 Đáp án đúng: [1] 丁寧 (ていねい)\n\n💬 Dịch nghĩa câu:\n\"Khi nói chuyện giao tiếp với thầy cô giáo, việc dùng lời lẽ lịch sự và lễ phép là vô cùng quan trọng.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ đuôi な 「丁寧 (ていねい)」 mang nghĩa là lịch thiệp, lễ phép, cẩn thận chỉn chu.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sử dụng ngôn ngữ lịch sự, lễ phép với thầy giáo (ĐÚNG)\n- 2. Thời tiết lịch sự (dùng sai)\n- 3. Đồ ăn lịch sự (dùng sai)\n- 4. Con đường lịch sự (dùng sai)\n\n📄 Trích PDF gốc (试题解析):\n(33) 1 ていねい 意思是“有礼貌, 恭敬”, 选项 1 为正确应用。",
      "correctOption": 1
    },
    "34": {
      "snippet": "濡れる (ぬれる)",
      "explanation": "🎯 Đáp án đúng: [3] 濡れる (ぬれる)\n\n💬 Dịch nghĩa câu:\n\"Trời bất chợt đổ mưa to mà tôi lại không mang theo ô nên quần áo đã bị ướt sũng hết cả.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「ぬれる (濡れる)」: bị dính nước, bị ướt sũng do trời mưa hay đổ nước.\n\n🔍 Phân tích các lựa chọn:\n- 1. Bị rách áo\n- 2. Bị bẩn áo\n- 3. Áo quần bị dính nước mưa ướt sũng (ĐÚNG)\n- 4. Bị khô quần áo\n\n📄 Trích PDF gốc (试题解析):\n(34) 3 ぬれる 意思是“淋湿, 湿透”, 选项 3 为正确应用。",
      "correctOption": 3
    },
    "35": {
      "snippet": "沸かす (わかす)",
      "explanation": "🎯 Đáp án đúng: [4] 沸かす (わかす)\n\n💬 Dịch nghĩa câu:\n\"Tôi đang đun sôi nước nóng trong ấm đun để pha một tách trà nóng ấm.\"\n\n💡 Phân tích & Giải thích:\n• Động từ tha động từ 「わかす (沸かす)」: đun sôi nước (お湯を沸かす).\n\n🔍 Phân tích các lựa chọn:\n- 1. Đun sôi thức ăn (phải dùng 煮る/炊く)\n- 2. Nấu cơm (phải dùng ご飯を炊く)\n- 3. Nướng bánh (phải dùng 焼く)\n- 4. Đun sôi nước để pha trà (お湯を沸かす) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(35) 4 わかす 意思是“烧开, 煮沸”, 选项 4 为正确应用。",
      "correctOption": 4
    },
    "36": {
      "snippet": "料理に使う (Dùng vào mục đích nấu ăn)",
      "explanation": "🎯 Đáp án đúng: [2] 料理に使う (Dùng vào mục đích nấu ăn)\n\n💬 Dịch nghĩa câu:\n\"Nhà hàng này tự trồng các loại rau củ sạch ngay trong vườn nhà để dùng vào việc nấu nướng.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「Danh từ + に使う」 biểu thị mục đích sử dụng của một sự vật: rau sạch dùng cho việc nấu nướng món ăn.\n\n🔍 Phân tích các lựa chọn:\n- 1. 料理を使う: Sai trợ từ bổ ngữ\n- 2. 料理に使う: ĐÚNG - Dùng vào mục đích nấu nướng món ăn (ĐÚNG)\n- 3. 料理で使う: Bằng món ăn\n- 4. 料理を使うに: Sai cấu trúc\n\n📄 Trích PDF gốc (试题解析):\n(1) 2 句意: 这家餐馆在院子里种植做菜时要用的蔬菜。考察に表示目的用途。",
      "correctOption": 2
    },
    "37": {
      "snippet": "2個ずつ (Mỗi thứ 2 cái)",
      "explanation": "🎯 Đáp án đúng: [3] 2個ずつ (Mỗi thứ 2 cái)\n\n💬 Dịch nghĩa câu:\n\"Khách hàng trong tiệm bánh ngọt: 'Xin lỗi, bánh dâu tây và bánh sô-cô-la cho tôi mỗi loại 2 chiếc nhé.'\"\n\n💡 Phân tích & Giải thích:\n• Hậu tố 「～ずつ」 đứng sau lượng từ mang ý nghĩa 'mỗi... / từng... đều đặn một phần bằng nhau'.\n\n🔍 Phân tích các lựa chọn:\n- 1. 2個まで: Tối đa 2 cái\n- 2. 2個ほど: Khoảng chừng 2 cái\n- 3. 2個ずつ: ĐÚNG - Mỗi loại 2 chiếc đều nhau (ĐÚNG)\n- 4. 2個ばかり: Khoảng tầm 2 cái\n\n📄 Trích PDF gốc (试题解析):\n(2) 3 句意: 草莓蛋糕和巧克力蛋糕请各给我两个。考察ずつ表示等量分配。",
      "correctOption": 3
    },
    "38": {
      "snippet": "きのうと (Khác biệt so với hôm qua)",
      "explanation": "🎯 Đáp án đúng: [1] きのうと (Khác biệt so với hôm qua)\n\n💬 Dịch nghĩa câu:\n\"Trái ngược hoàn toàn so với ngày hôm qua mưa gió, thời tiết ngày hôm nay vô cùng đẹp và nắng ráo.\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu so sánh đối chiếu: 「A は B と 違う」 (A thì khác biệt so với B). Cụm từ: きのうと違って.\n\n🔍 Phân tích các lựa chọn:\n- 1. きのうと: ĐÚNG - Khác với ngày hôm qua (ĐÚNG)\n- 2. きのうに: Sai trợ từ đối chiếu\n- 3. きのうを: Sai trợ từ bổ ngữ\n- 4. きのうで: Sai trợ từ phương tiện\n\n📄 Trích PDF gốc (试题解析):\n(3) 1 句意: 和昨天不同, 今天天气很好。考察～と違って表示对比不同。",
      "correctOption": 1
    },
    "39": {
      "snippet": "からいですね (Cảm thán khen/chê hương vị)",
      "explanation": "🎯 Đáp án đúng: [2] からいですね (Cảm thán khen/chê hương vị)\n\n💬 Dịch nghĩa câu:\n\"A: 'Món cà ri kiểu Ấn Độ này cay nồng thật đấy nhỉ!' - B: 'Vâng, cay nhưng mà hương vị rất tuyệt.'\"\n\n💡 Phân tích & Giải thích:\n• Trợ từ cuối câu 「ね」 dùng để tìm kiếm sự đồng cảm của đối phương trước một thực tế hiển nhiên đang cùng trải nghiệm.\n\n🔍 Phân tích các lựa chọn:\n- 1. からいです: Câu trần thuật đơn thuần\n- 2. からいですね: ĐÚNG - Cay thật đấy nhỉ (đồng cảm) (ĐÚNG)\n- 3. からいですよ: Nhấn mạnh thông tin đối phương chưa biết\n- 4. からいのか: Nghi vấn tự hỏi\n\n📄 Trích PDF gốc (试题解析):\n(4) 2 句意: 这种咖喱好辣呀。考察终助词ね表示寻求认同。",
      "correctOption": 2
    },
    "40": {
      "snippet": "いいにおい (Mùi hương thơm bay ra)",
      "explanation": "🎯 Đáp án đúng: [4] いいにおい (Mùi hương thơm bay ra)\n\n💬 Dịch nghĩa câu:\n\"Từ phía gian bếp đang tỏa ra một mùi hương thơm phức ngào ngạt của đồ ăn chín tới.\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ cố định: 「においがする / 味がする / 声がする」 (có mùi hương tỏa ra / có vị / có tiếng phát ra).\n\n🔍 Phân tích các lựa chọn:\n- 1. いい味: Vị ngon (không dùng với tỏa mùi từ bếp)\n- 2. いい声: Giọng nói hay\n- 3. いい音: Âm thanh hay\n- 4. いいにおい: ĐÚNG - Mùi thơm phức tỏa ra (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(5) 4 句意: 厨房飘出了一阵香味。考察においがする表示散发气味。",
      "correctOption": 4
    },
    "41": {
      "snippet": "～ように (Để có thể - chỉ mục đích)",
      "explanation": "🎯 Đáp án đúng: [1] ～ように (Để có thể - chỉ mục đích)\n\n💬 Dịch nghĩa câu:\n\"Mỗi ngày tôi đều kiên trì luyện nghe và nói tiếng Nhật để có thể giao tiếp trôi chảy tự nhiên.\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu 「Động từ thể khả năng + ように」 diễn tả mục đích hướng tới một trạng thái hoặc năng lực mong muốn.\n\n🔍 Phân tích các lựa chọn:\n- 1. 話せるように: ĐÚNG - Để có thể nói được trôi chảy (ĐÚNG)\n- 2. 話すために: Để nói (thiếu khả năng)\n- 3. 話すように: Sai dạng\n- 4. 話せるために: Sai ngữ pháp\n\n📄 Trích PDF gốc (试题解析):\n(6) 1 句意: 为了能流利地用日语交流而每天练习。考察ように前接可能态表示目的。",
      "correctOption": 1
    },
    "42": {
      "snippet": "落としてしまった (Lỡ tay đánh rơi)",
      "explanation": "🎯 Đáp án đúng: [2] 落としてしまった (Lỡ tay đánh rơi)\n\n💬 Dịch nghĩa câu:\n\"Ở nhà ga, hành khách hớt hải báo nhân viên: 'Xin lỗi, hình như có ai đó vừa lỡ tay đánh rơi chiếc ví này.'\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「V-て + しまう」 diễn tả một hành động xảy ra ngoài ý muốn, sơ ý gây ra sự việc đáng tiếc.\n\n🔍 Phân tích các lựa chọn:\n- 1. 落としかけた: Suýt nữa đánh rơi\n- 2. 落としてしまった: ĐÚNG - Lỡ đánh rơi mất (ĐÚNG)\n- 3. 落としそうだ: Trông có vẻ sắp rơi\n- 4. 落とすはずだ: Chắc chắn rơi\n\n📄 Trích PDF gốc (试题解析):\n(7) 2 句意: 不好意思, 有人掉了钱包。考察～てしまう表示意外发生的事情。",
      "correctOption": 2
    },
    "43": {
      "snippet": "～だけ (Chỉ duy nhất)",
      "explanation": "🎯 Đáp án đúng: [3] ～だけ (Chỉ duy nhất)\n\n💬 Dịch nghĩa câu:\n\"Buổi sáng tôi thường rất bận rộn nên bữa sáng tôi chỉ ăn duy nhất một quả chuối là đi làm ngay.\"\n\n💡 Phân tích & Giải thích:\n• Trợ từ 「だけ」 biểu thị sự giới hạn duy nhất: chỉ ăn chuối chứ không ăn gì khác.\n\n🔍 Phân tích các lựa chọn:\n- 1. バナナしか: Đi với phủ định (phải là 食べない)\n- 2. バナナだけ: ĐÚNG - Chỉ ăn chuối (đi với khẳng định 食べる)\n- 3. バナナでも: Cho dù là chuối (ĐÚNG)\n- 4. バナナほど: Cỡ chừng chuối\n\n📄 Trích PDF gốc (试题解析):\n(8) 2 句意: 我早上一般都只吃香蕉。考察だけ接肯定句表示唯一限定。",
      "correctOption": 3
    },
    "44": {
      "snippet": "～たらいい (Lời khuyên nên làm gì)",
      "explanation": "🎯 Đáp án đúng: [3] ～たらいい (Lời khuyên nên làm gì)\n\n💬 Dịch nghĩa câu:\n\"Sắp đến ngày sinh nhật bạn Komori rồi, tôi nên tặng món quà gì cho bạn ấy thì tốt bây giờ nhỉ?\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu hỏi xin ý kiến hoặc gợi ý: 「Từ để hỏi + V-たらいいですか」 (Nên làm thế nào thì tốt?).\n\n🔍 Phân tích các lựa chọn:\n- 1. あげるといい: Nếu tặng\n- 2. あげてもいい: Tặng cũng được\n- 3. あげたらいい: ĐÚNG - Nên tặng quà gì thì được (ĐÚNG)\n- 4. あげるならいい: Nếu là tặng thì được\n\n📄 Trích PDF gốc (试题解析):\n(9) 3 句意: 小森的生日送她什么好呢? 考察～たらいいですか征求建议。",
      "correctOption": 3
    },
    "45": {
      "snippet": "～てくる (Làm gì rồi quay lại)",
      "explanation": "🎯 Đáp án đúng: [4] ～てくる (Làm gì rồi quay lại)\n\n💬 Dịch nghĩa câu:\n\"Tôi cảm thấy khát nước quá, để tôi chạy qua máy bán hàng tự động đằng kia mua lon nước rồi quay lại ngay nhé.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「V-て + くる」 biểu thị việc đi đến một nơi khác thực hiện hành động V rồi quay trở về vị trí hiện tại.\n\n🔍 Phân tích các lựa chọn:\n- 1. 買いに行く: Đi mua (chưa thể hiện quay về)\n- 2. 買っていく: Mua rồi mang đi nơi khác\n- 3. 買ったところだ: Vừa mới mua xong\n- 4. 買ってくる: ĐÚNG - Mua xong rồi quay lại ngay (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(10) 4 句意: 我想喝点东西, 马上买完过来。考察～てくる表示去去就回。",
      "correctOption": 4
    },
    "46": {
      "snippet": "～のに (Mặc dù... mà)",
      "explanation": "🎯 Đáp án đúng: [1] ～のに (Mặc dù... mà)\n\n💬 Dịch nghĩa câu:\n\"Mặc dù hôm nay tôi đã hẹn trước rất cẩn thận với anh ấy, thế nhưng mãi mà anh ấy chẳng thấy xuất hiện.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「Thể thông thường + のに」 biểu thị sự tương phản mang sắc thái bất ngờ, tiếc nuối hoặc trách móc.\n\n🔍 Phân tích các lựa chọn:\n- 1. 約束したのに: ĐÚNG - Mặc dù đã hẹn trước vậy mà (ĐÚNG)\n- 2. 約束するのに: Dùng cho mục đích\n- 3. 約束したから: Vì đã hẹn\n- 4. 約束すれば: Nếu hẹn\n\n📄 Trích PDF gốc (试题解析):\n(11) 1 句意: 明明已经约好了, 他却没有来。考察句型～のに表示逆接。",
      "correctOption": 1
    },
    "47": {
      "snippet": "～なければならない (Bắt buộc phải làm)",
      "explanation": "🎯 Đáp án đúng: [1] ～なければならない (Bắt buộc phải làm)\n\n💬 Dịch nghĩa câu:\n\"Bản báo cáo tiến độ công việc quan trọng này bắt buộc phải nộp cho cấp trên trước 5 giờ chiều mai.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc thể hiện nghĩa vụ, quy định bắt buộc phải thi hành: 「V-なければならない」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 出してもいい: Nộp cũng được (cho phép) (ĐÚNG)\n- 2. 出さなくてもいい: Không cần nộp\n- 3. 出さなければならない: ĐÚNG - Bắt buộc phải nộp\n- 4. 出すはずがない: Không thể nào nộp\n\n📄 Trích PDF gốc (试题解析):\n(12) 3 句意: 必须在明天下午5点前提交报告。考察～なければならない表示义务。",
      "correctOption": 1
    },
    "48": {
      "snippet": "～かどうか (Liệu có... hay không)",
      "explanation": "🎯 Đáp án đúng: [2] ～かどうか (Liệu có... hay không)\n\n💬 Dịch nghĩa câu:\n\"Tôi vẫn đang rất phân vân không biết ngày mai thời tiết có mưa hay không để còn chuẩn bị mang ô.\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu lồng câu hỏi không có từ để hỏi: 「Động từ thể thông thường + かどうか」 (liệu có hay không).\n\n🔍 Phân tích các lựa chọn:\n- 1. 降るかを: Sai trợ từ\n- 2. 降るから: Vì mưa (ĐÚNG)\n- 3. 降るかどうか: ĐÚNG - Liệu trời có mưa hay không\n- 4. 降るのに: Mặc dù mưa\n\n📄 Trích PDF gốc (试题解析):\n(13) 3 句意: 还不知道明天会不会下雨。考察句型～かどうか表示是否。",
      "correctOption": 2
    },
    "49": {
      "snippet": "～てある (Trạng thái được bố trí sẵn)",
      "explanation": "🎯 Đáp án đúng: [3] ～てある (Trạng thái được bố trí sẵn)\n\n💬 Dịch nghĩa câu:\n\"Bản đồ hướng dẫn sơ tán khi có động đất đã được dán sẵn ngay trên bức tường trước hành lang.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「Tha động từ thể て + ある」 diễn tả trạng thái của sự vật là kết quả của một hành động đã được ai đó làm sẵn có chủ ý.\n\n🔍 Phân tích các lựa chọn:\n- 1. 貼ってある: ĐÚNG - Được dán sẵn trên tường\n- 2. 貼っている: Đang dán (hành động đang xảy ra)\n- 3. 貼っておく: Sẽ dán sẵn (chưa làm) (ĐÚNG)\n- 4. 貼られた: Bị dán\n\n📄 Trích PDF gốc (试题解析):\n(14) 1 句意: 避难指南已经贴在走廊的墙上了。考察～てある表示动作存续状态。",
      "correctOption": 3
    },
    "50": {
      "snippet": "～てはいけない (Cấm đoán không được làm)",
      "explanation": "🎯 Đáp án đúng: [4] ～てはいけない (Cấm đoán không được làm)\n\n💬 Dịch nghĩa câu:\n\"Bên trong khu vực phòng trưng bày hiện vật quý của bảo tàng, du khách tuyệt đối không được chụp ảnh.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc cấm đoán mang tính quy tắc, nội quy nghiêm ngặt: 「V-てはいけない / てはなりません」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 撮ってもいい: Được phép chụp\n- 2. 撮らなくてもいい: Không chụp cũng được\n- 3. 撮らなければならない: Bắt buộc phải chụp\n- 4. 撮ってはいけない: ĐÚNG - Cấm không được chụp ảnh (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(15) 4 句意: 博物馆展厅内严禁拍照。考察～てはいけない表示禁止。",
      "correctOption": 4
    },
    "51": {
      "snippet": "Dấu sao: だれ (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [2] Dấu sao: だれ (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Không, tôi không biết đường. Hãy cùng ra nhà ga rồi hỏi thử một ai đó xem sao nhé.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: いいえ、わかりません。 【3 駅で】 【1 だれ】 ★【2 か に】 【4 聞きましょう】。 Dấu sao ở vị trí thứ 3 là phương án 2 (だれかに).\n\n🔍 Phân tích các lựa chọn:\n- 1. だれ\n- 2. か に (ĐÚNG vị trí dấu sao ★) (ĐÚNG)\n- 3. 駅で\n- 4. 聞きましよう\n\n📄 Trích PDF gốc (试题解析):\n(16) 2 正确语序: いいえ、わかりません。 3 駅で 1 だれ ★2 か に 4 聞きましょう。",
      "correctOption": 2
    },
    "52": {
      "snippet": "Dấu sao: 遅く (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [3] Dấu sao: 遅く (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Dạo gần đây công việc ở công ty bận quá nên có rất nhiều ngày tôi phải về nhà muộn màng.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 最近、仕事が いそがしくて、 【1 帰る】 【4 のが】 ★【3 遅く】 【2 なる】 日が 多い。 Dấu sao ở vị trí thứ 3 là phương án 3 (遅く).\n\n🔍 Phân tích các lựa chọn:\n- 1. 帰る\n- 2. なる\n- 3. 遅く (ĐÚNG vị trí dấu sao ★) (ĐÚNG)\n- 4. のが\n\n📄 Trích PDF gốc (试题解析):\n(17) 3 正确语序: 最近、仕事が いそがしくて、 1 帰る 4 のが ★3 遅く 2 なる 日が 多い。",
      "correctOption": 3
    },
    "53": {
      "snippet": "Dấu sao: 建てる (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [4] Dấu sao: 建てる (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Để dành dụm tiền xây dựng một ngôi nhà lớn có thể sống chung cùng với bố mẹ, tôi đang rất nỗ lực tiết kiệm.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 両親と いっしょに 【3 住める】 【2 家を】 ★【4 建てる】 【1 ために】 貯金しています。 Dấu sao ở vị trí thứ 3 là phương án 4 (建てる).\n\n🔍 Phân tích các lựa chọn:\n- 1. ために\n- 2. 家を\n- 3. 住める\n- 4. 建てる (ĐÚNG vị trí dấu sao ★) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(18) 4 正确语序: 両親と いっしょに 3 住める 2 家を ★4 建てる 1 ために 貯金しています。",
      "correctOption": 4
    },
    "54": {
      "snippet": "Dấu sao: が (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [1] Dấu sao: が (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Ngày mai tôi bắt buộc phải ra khỏi nhà từ sáng sớm, thế nhưng tôi đang rất lo lắng không biết liệu mình có dậy sớm nổi không.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 明日は 朝早く 出かけない 【2 と】 【4 いけないのです】 ★【1 が】 【3 早起きできる】 かどうか 心配です。 Dấu sao ở vị trí thứ 3 là phương án 1 (が).\n\n🔍 Phân tích các lựa chọn:\n- 1. が (ĐÚNG vị trí dấu sao ★) (ĐÚNG)\n- 2. と\n- 3. 早起きできる\n- 4. いけないのです\n\n📄 Trích PDF gốc (试题解析):\n(19) 1 正确语序: 明日は 朝早く 出かけない 2 と 4 いけないのです ★1 が 3 早起きできる かどうか 心配です。",
      "correctOption": 1
    },
    "55": {
      "snippet": "Dấu sao: 赤くて (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [3] Dấu sao: 赤くて (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Trong bữa tiệc hôm qua, tôi đã được thưởng thức một loại trái cây hình tròn, màu đỏ tươi và có vị rất ngọt ngào.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 昨日の パーティーで 丸い 【4 形】 【2 の】 ★【3 赤くて】 【1 あまい】 くだものを 食べました。 Dấu sao ở vị trí thứ 3 là phương án 3 (赤くて).\n\n🔍 Phân tích các lựa chọn:\n- 1. あまい\n- 2. の\n- 3. 赤くて (ĐÚNG vị trí dấu sao ★) (ĐÚNG)\n- 4. 形\n\n📄 Trích PDF gốc (试题解析):\n(20) 3 正确语序: 昨日の パーティーで 丸い 4 形 2 の ★3 赤くて 1 あまい くだものを 食べました。",
      "correctOption": 3
    },
    "56": {
      "snippet": "くれる (Hành động người khác tặng mình)",
      "explanation": "🎯 Đáp án đúng: [2] くれる (Hành động người khác tặng mình)\n\n💬 Dịch nghĩa câu:\n\"Bức bưu thiếp này là do anh Tanaka đã gửi tặng cho tôi nhân dịp năm mới.\"\n\n💡 Phân tích & Giải thích:\n• Khi người khác làm cho tôi (hoặc phía người nói) một điều gì đó, ta dùng động từ cho nhận 「～てくれる」.\n\n🔍 Phân tích các lựa chọn:\n- 1. あげた: Tôi tặng bạn\n- 2. くれた: ĐÚNG - Bạn Tanaka gửi tặng cho tôi (ĐÚNG)\n- 3. もらった: Cần trợ từ に\n- 4. やった: Tặng cấp dưới\n\n📄 Trích PDF gốc (试题解析):\n(21) 2 根据前后文卡片是由田中送给作者的, 需使用くれる表示他人主动给予我方。",
      "correctOption": 2
    },
    "57": {
      "snippet": "Chủ ngữ は",
      "explanation": "🎯 Đáp án đúng: [4] Chủ ngữ は\n\n💬 Dịch nghĩa câu:\n\"Trợ từ 「は」 đóng vai trò đưa danh từ lên làm chủ đề chính của câu văn thuyết minh.\"\n\n💡 Phân tích & Giải thích:\n• Vị trí này cần trợ từ 「は」 để nhấn mạnh chủ đề thông tin cần được miêu tả ở vế tiếp theo.\n\n🔍 Phân tích các lựa chọn:\n- 1. Trợ từ を\n- 2. Trợ từ に\n- 3. Trợ từ で\n- 4. Trợ từ は (ĐÚNG - Nhấn mạnh chủ đề) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(22) 4 说明句的主题通常使用は提示, 引导后文的阐述。",
      "correctOption": 4
    },
    "58": {
      "snippet": "Thì quá khứ 働いた",
      "explanation": "🎯 Đáp án đúng: [3] Thì quá khứ 働いた\n\n💬 Dịch nghĩa câu:\n\"Việc tôi vào làm việc tại công ty thương mại đã là một sự kiện diễn ra trọn vẹn trong quá khứ.\"\n\n💡 Phân tích & Giải thích:\n• Mô tả sự kiện đã hoàn tất trong quá khứ nên bắt buộc động từ phải chia về thì quá khứ 「～た」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 働く: Hiện tại tương lai\n- 2. 働いている: Hiện tại tiếp diễn\n- 3. 働いた: ĐÚNG - Đã làm việc (quá khứ) (ĐÚNG)\n- 4. 働くだろう: Phỏng đoán\n\n📄 Trích PDF gốc (试题解析):\n(23) 3 进入贸易公司工作发生在过去的既定事实, 需用过去时。",
      "correctOption": 3
    },
    "59": {
      "snippet": "ぜひ (Nhất định thiết tha)",
      "explanation": "🎯 Đáp án đúng: [1] ぜひ (Nhất định thiết tha)\n\n💬 Dịch nghĩa câu:\n\"Nếu trong khoảng thời gian từ ngày 27 đến 31 tháng 8 bạn rảnh rỗi, tôi nhất định rất muốn được gặp bạn.\"\n\n💡 Phân tích & Giải thích:\n• Phó từ 「ぜひ」 đi với động từ mong muốn 「～たい」 biểu thị sự tha thiết, khát khao muốn gặp mặt.\n\n🔍 Phân tích các lựa chọn:\n- 1. ぜひ: ĐÚNG - Nhất định mong được gặp bạn (ĐÚNG)\n- 2. たぶん: Có lẽ\n- 3. きっと: Chắc chắn\n- 4. なかなか: Mãi mà\n\n📄 Trích PDF gốc (试题解析):\n(24) 1 询问对方是否有空想要见面, 选项只有表示“一定”的ぜひ能表达热情期待。",
      "correctOption": 1
    },
    "60": {
      "snippet": "Gửi kèm quà tặng mời thưởng thức",
      "explanation": "🎯 Đáp án đúng: [2] Gửi kèm quà tặng mời thưởng thức\n\n💬 Dịch nghĩa câu:\n\"Cùng với bức thư này, tôi có gửi kèm theo một hộp trà đặc sản của công ty, xin mời bạn thưởng thức thử nhé.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc mời mọc lịch sự: 「飲んでみてください」 (xin bạn hãy uống thử xem sao).\n\n🔍 Phân tích các lựa chọn:\n- 1. 飲まないでください: Xin đừng uống\n- 2. 飲んでみてください: ĐÚNG - Xin hãy uống thử xem sao (ĐÚNG)\n- 3. 飲むはずです: Chắc là sẽ uống\n- 4. 飲んだことがあります: Đã từng uống\n\n📄 Trích PDF gốc (试题解析):\n(25) 2 随信寄去自己公司的茶叶, 邀请对方品尝尝试。",
      "correctOption": 2
    },
    "61": {
      "snippet": "Thang máy sử dụng ngày 8/7 lúc 15:30",
      "explanation": "🎯 Đáp án đúng: [1] Thang máy sử dụng ngày 8/7 lúc 15:30\n\n💬 Dịch nghĩa câu:\n\"Theo lịch bảo trì thang máy, vào lúc 15:30 chiều ngày 8/7, thang máy số 1 là thang máy duy nhất được phép sử dụng để chuyển đồ.\"\n\n💡 Phân tích & Giải thích:\n• Đối chiếu bảng phân công lịch bảo trì: thang máy số 2 đang kiểm tra kỹ thuật lúc 15h30, chỉ có thang máy số 1 hoạt động bình thường.\n\n🔍 Phân tích các lựa chọn:\n- 1. Thang máy số 1 (ĐÚNG) (ĐÚNG)\n- 2. Thang máy số 2\n- 3. Cả hai thang máy đều dùng được\n- 4. Cả hai thang máy đều tạm dừng\n\n📄 Trích PDF gốc (试题解析):\n(26) 1 查阅电梯检修日程表, 7月8日下午3点半只有1号电梯可以搬运行李。",
      "correctOption": 1
    },
    "62": {
      "snippet": "Đặc điểm trứng gà quán Genki",
      "explanation": "🎯 Đáp án đúng: [1] Đặc điểm trứng gà quán Genki\n\n💬 Dịch nghĩa câu:\n\"Trứng gà của trang trại quán Genki nổi tiếng là trứng tươi mới thu hoạch trong ngày và có giá trị dinh dưỡng rất cao.\"\n\n💡 Phân tích & Giải thích:\n• Chi tiết trong bài nêu rõ: trứng được vận chuyển trực tiếp từ trang trại vào mỗi sáng sớm nên luôn đảm bảo độ tươi mới tuyệt đối.\n\n🔍 Phân tích các lựa chọn:\n- 1. Trứng nhập khẩu từ nước ngoài (ĐÚNG)\n- 2. Trứng bảo quản đông lạnh lâu ngày\n- 3. Trứng tươi mới thu hoạch từ trang trại mỗi ngày (ĐÚNG)\n- 4. Trứng đã luộc chín sẵn\n\n📄 Trích PDF gốc (试题解析):\n(27) 3 对元气蛋店的鸡蛋描述: 每天早晨直接从农场采摘送达, 保证绝对新鲜。",
      "correctOption": 1
    },
    "63": {
      "snippet": "Cách thức bán trứng gà của quán",
      "explanation": "🎯 Đáp án đúng: [1] Cách thức bán trứng gà của quán\n\n💬 Dịch nghĩa câu:\n\"Cửa hàng đóng gói trứng theo các hộp tiêu chuẩn gồm loại 6 quả và loại 10 quả để khách hàng tiện lựa chọn.\"\n\n💡 Phân tích & Giải thích:\n• Thông tin đóng gói trong bài: khách có thể chọn vỉ 6 quả (6個入り) hoặc vỉ 10 quả (10個入り).\n\n🔍 Phân tích các lựa chọn:\n- 1. Bán lẻ từng quả một (ĐÚNG)\n- 2. Đóng gói theo hộp 6 quả và 10 quả (ĐÚNG)\n- 3. Chỉ bán theo thùng 50 quả\n- 4. Bán theo cân nặng kilogram\n\n📄 Trích PDF gốc (试题解析):\n(28) 2 店铺按6枚装和10枚装的规格进行包装销售。",
      "correctOption": 1
    },
    "64": {
      "snippet": "Nhiệm vụ của ông Yamaguchi",
      "explanation": "🎯 Đáp án đúng: [2] Nhiệm vụ của ông Yamaguchi\n\n💬 Dịch nghĩa câu:\n\"Sau khi đọc xong mẩu giấy nhắn của đối tác, ông Yamaguchi cần phải liên hệ lại để xác nhận số lượng đơn đặt hàng.\"\n\n💡 Phân tích & Giải thích:\n• Nội dung lời nhắn để lại trên bàn: xin anh Yamaguchi gọi điện lại cho phía nhà cung cấp để chốt số lượng trước 17:00.\n\n🔍 Phân tích các lựa chọn:\n- 1. Hủy bỏ hợp đồng\n- 2. Gửi tiền thanh toán ngay (ĐÚNG)\n- 3. Đi gặp trực tiếp khách hàng\n- 4. Gọi điện thoại xác nhận số lượng đơn hàng trước 5h chiều (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(29) 4 山口先生读完便签后必须电话联系对方确认订单数量。",
      "correctOption": 2
    },
    "65": {
      "snippet": "Thể loại sách trong phong trào đọc sách",
      "explanation": "🎯 Đáp án đúng: [4] Thể loại sách trong phong trào đọc sách\n\n💬 Dịch nghĩa câu:\n\"Các cuốn sách được giới thiệu trong phong trào đọc sách mùa hè chủ yếu là sách thiếu nhi và tác phẩm văn học nhẹ nhàng.\"\n\n💡 Phân tích & Giải thích:\n• Bài viết nêu rõ: đối tượng tham gia phong trào hướng tới việc đọc các cuốn sách văn học và truyện dành cho lứa tuổi thanh thiếu niên.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sách chuyên ngành kinh tế\n- 2. Sách truyện văn học và sách thiếu nhi (ĐÚNG)\n- 3. Sách khoa học tự nhiên phức tạp\n- 4. Từ điển ngoại ngữ (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(30) 2 提到的读书活动, 读的是文学故事和少儿读物。",
      "correctOption": 4
    },
    "66": {
      "snippet": "Điều kiện nhận phiếu ưu đãi 500 yên",
      "explanation": "🎯 Đáp án đúng: [3] Điều kiện nhận phiếu ưu đãi 500 yên\n\n💬 Dịch nghĩa câu:\n\"Để được nhận phiếu mua sắm ưu đãi trị giá 500 yên, người tham gia bắt buộc phải đọc đủ 5 cuốn sách và viết nộp 5 bài cảm nhận.\"\n\n💡 Phân tích & Giải thích:\n• Quy định chương trình ghi rất rõ ràng: cứ đọc 5 cuốn và nộp phiếu giới thiệu tóm tắt 5 cuốn thì sẽ nhận được 1 phiếu coupon 500 yên.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đọc 1 cuốn sách\n- 2. Đọc 3 cuốn sách và nộp 1 bài\n- 3. Đọc 5 cuốn sách và nộp 5 bản cảm nhận (ĐÚNG) (ĐÚNG)\n- 4. Đọc 10 cuốn sách\n\n📄 Trích PDF gốc (试题解析):\n(31) 3 获得500日元优惠券的条件: 读满5本书并提交5份读后推荐卡。",
      "correctOption": 3
    },
    "67": {
      "snippet": "Lý do xem đây là một phương pháp hay",
      "explanation": "🎯 Đáp án đúng: [2] Lý do xem đây là một phương pháp hay\n\n💬 Dịch nghĩa câu:\n\"Tác giả đánh giá cao hoạt động này vì nó tạo được động lực mạnh mẽ thúc đẩy các bạn trẻ hình thành thói quen say mê đọc sách.\"\n\n💡 Phân tích & Giải thích:\n• Bài viết phân tích: việc nhận được phần thưởng khích lệ sẽ giúp mọi người hào hứng hơn với việc mở sách ra đọc mỗi ngày.\n\n🔍 Phân tích các lựa chọn:\n- 1. Tạo động lực hứng thú giúp duy trì thói quen đọc sách (ĐÚNG)\n- 2. Giúp hiệu sách bán được nhiều sách ế (ĐÚNG)\n- 3. Tiết kiệm tiền bạc\n- 4. Không phải làm bài tập hè\n\n📄 Trích PDF gốc (试题解析):\n(32) 1 认为是个好方法的原因: 能有效激发和培养长期阅读的兴趣。",
      "correctOption": 2
    },
    "68": {
      "snippet": "Ý nghĩa của cụm từ 'có thể làm được'",
      "explanation": "🎯 Đáp án đúng: [4] Ý nghĩa của cụm từ 'có thể làm được'\n\n💬 Dịch nghĩa câu:\n\"Cụm từ trong bài ám chỉ việc mọi người thông qua các bài viết giới thiệu có thể chia sẻ niềm vui đọc sách cho nhiều bạn bè khác.\"\n\n💡 Phân tích & Giải thích:\n• Liên hệ ngữ cảnh câu: từ những mẩu cảm nhận dán trên bảng tin, độc giả khác có thể tìm thấy những cuốn sách hay phù hợp với mình.\n\n🔍 Phân tích các lựa chọn:\n- 1. Có thể kiếm được nhiều tiền\n- 2. Có thể đi du lịch miễn phí\n- 3. Có thể trở thành nhà văn\n- 4. Có thể chia sẻ và lan tỏa niềm vui đọc sách tới mọi người (ĐÚNG) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(33) 4 指通过读后感能够向更多人传递分享阅读的乐趣。",
      "correctOption": 4
    },
    "69": {
      "snippet": "Lựa chọn thực đơn của Emi (Set C)",
      "explanation": "🎯 Đáp án đúng: [3] Lựa chọn thực đơn của Emi (Set C)\n\n💬 Dịch nghĩa câu:\n\"Emi muốn ăn món cà ri kèm salad rau tươi và sau bữa ăn có thêm cà phê tráng miệng, nên Set C là set ăn phù hợp nhất.\"\n\n💡 Phân tích & Giải thích:\n• Tra cứu bảng thực đơn nhà hàng: Set C bao gồm trọn gói: Cà ri (カレー), Salad (サラダ) và Cà phê (コーヒー).\n\n🔍 Phân tích các lựa chọn:\n- 1. Set A (Thiếu cà phê)\n- 2. Set B (Thiếu salad)\n- 3. Set C (ĐÚNG - Đầy đủ cà ri, salad và cà phê) (ĐÚNG)\n- 4. Set D (Không có món cà ri)\n\n📄 Trích PDF gốc (试题解析):\n(34) 3 惠美想吃咖喱和沙拉并喝咖啡, 符合要求的套餐是C套餐。",
      "correctOption": 3
    },
    "70": {
      "snippet": "Lựa chọn cho người muốn ăn cà ri gà",
      "explanation": "🎯 Đáp án đúng: [3] Lựa chọn cho người muốn ăn cà ri gà\n\n💬 Dịch nghĩa câu:\n\"Đối với khách hàng có mong muốn thưởng thức món cà ri gà (チキンカレー), có tổng cộng 2 set thực đơn có món này.\"\n\n💡 Phân tích & Giải thích:\n• Dò tìm trong bảng thực đơn: món gà (チキン) chỉ xuất hiện trong 2 lựa chọn là Cà ri gà tiêu chuẩn và Cà ri gà đặc biệt.\n\n🔍 Phân tích các lựa chọn:\n- 1. Có 1 set\n- 2. Có 2 set thực đơn phù hợp (ĐÚNG)\n- 3. Có 3 set (ĐÚNG)\n- 4. Có 4 set\n\n📄 Trích PDF gốc (试题解析):\n(35) 2 想吃鸡肉咖喱的人共有2种菜单可选。",
      "correctOption": 3
    },
    "71": {
      "snippet": "Nhiệm vụ chuẩn bị phòng họp",
      "explanation": "🎯 Đáp án đúng: [3] Nhiệm vụ chuẩn bị phòng họp\n\n💬 Dịch nghĩa câu:\n\"Người nam trước tiên sẽ đi photo in ấn 10 bộ tài liệu họp trước khi kê lại bàn ghế.\"\n\n💡 Phân tích & Giải thích:\n• Trưởng nhóm nhắc nhở tài liệu quan trọng cần in trước để phát tay, sau đó mới dọn dẹp phòng.\n\n🔍 Phân tích các lựa chọn:\n- 1. Kê bàn ghế trước\n- 2. Pha trà phục vụ\n- 3. Đi photo in 10 bộ tài liệu phát tay trước (ĐÚNG) (ĐÚNG)\n- 4. Bật máy chiếu\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (1): 男の人はまず何をしますか。 正解: [3]",
      "audioScriptJa": "女：会議室の準備だけど、まず資料を10部コピーしてきてくれる？そのあと机を並べよう。\n男：はい、わかりました。",
      "audioScriptVi": "Nữ: Chuẩn bị phòng họp nhé, trước tiên em đi photo giúp chị 10 bộ tài liệu được không? Sau đó tụi mình kê bàn ghế nhé.\nNam: Vâng, em đi làm ngay ạ.",
      "correctOption": 3
    },
    "72": {
      "snippet": "Địa điểm tập trung chuyến dã ngoại",
      "explanation": "🎯 Đáp án đúng: [3] Địa điểm tập trung chuyến dã ngoại\n\n💬 Dịch nghĩa câu:\n\"Cả lớp thống nhất địa điểm tập trung vào sáng chủ nhật là trước cổng soát vé phía Bắc nhà ga.\"\n\n💡 Phân tích & Giải thích:\n• Bạn nữ lưu ý cổng Nam đang sửa chữa đông đúc, nên đổi địa điểm hẹn sang cổng Bắc (北口改札前).\n\n🔍 Phân tích các lựa chọn:\n- 1. Trước cổng soát vé phía Bắc (北口) (ĐÚNG)\n- 2. Trước cổng phía Nam\n- 3. Tại sân ga số 2 (ĐÚNG)\n- 4. Tại quán cà phê đối diện ga\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (2): 二人はどこで待ち合わせをしますか。 正解: [1]",
      "audioScriptJa": "女：南口は混んでいるから、北口の改札の前にしない？\n男：いいね、そうしよう。",
      "audioScriptVi": "Nữ: Cổng Nam đông lắm, mình hẹn nhau ở trước cổng soát vé phía Bắc nhé?\nNam: Được đấy, hẹn ở đó nhé.",
      "correctOption": 3
    },
    "73": {
      "snippet": "Món đồ cần nộp vào ngày mai",
      "explanation": "🎯 Đáp án đúng: [1] Món đồ cần nộp vào ngày mai\n\n💬 Dịch nghĩa câu:\n\"Học sinh ngày mai bắt buộc phải nộp bản đăng ký tham gia hoạt động dã ngoại có chữ ký phụ huynh.\"\n\n💡 Phân tích & Giải thích:\n• Thầy giáo dặn tiền dã ngoại tuần sau mới thu, bài thu hoạch nộp sau, ngày mai hạn chót nộp phiếu đăng ký có chữ ký bố mẹ.\n\n🔍 Phân tích các lựa chọn:\n- 1. Tiền kinh phí dã ngoại (ĐÚNG)\n- 2. Ảnh chụp kỷ yếu\n- 3. Bài tập hè\n- 4. Phiếu đăng ký tham gia có chữ ký của phụ huynh (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (3): 学生は明日何を出さなければなりませんか。 正解: [4]",
      "audioScriptJa": "先生：お金は来週でいいですが、保護者のサインをもらった申込書は明日必ず出してください。",
      "audioScriptVi": "Thầy giáo: Tiền tuần sau nộp cũng được, nhưng đơn đăng ký có chữ ký của phụ huynh thì ngày mai các em nhất định phải nộp nhé.",
      "correctOption": 1
    },
    "74": {
      "snippet": "Hành động tiếp theo của bạn nữ",
      "explanation": "🎯 Đáp án đúng: [1] Hành động tiếp theo của bạn nữ\n\n💬 Dịch nghĩa câu:\n\"Bạn nữ sẽ trực tiếp gọi điện thoại cho giáo viên chủ nhiệm để xin phép nghỉ học do ốm.\"\n\n💡 Phân tích & Giải thích:\n• Bạn nam khuyên không nên nhờ bạn nhắn miệng mà hãy gọi điện thoại trực tiếp thông báo cho cô giáo an tâm.\n\n🔍 Phân tích các lựa chọn:\n- 1. Nhờ bạn vào lớp xin phép hộ (ĐÚNG)\n- 2. Tự mình gọi điện thoại trực tiếp báo cô giáo (ĐÚNG)\n- 3. Gửi email cho trường\n- 4. Đến phòng y tế trường\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (4): 女の学生はこれから何をしますか。 正解: [2]",
      "audioScriptJa": "男：先生には自分で電話したほうがいいよ。\n女：そうだね、今すぐ電話してみる。",
      "audioScriptVi": "Nam: Em nên tự mình gọi điện cho cô giáo thì tốt hơn đấy.\nNữ: Ừ đúng rồi, để mình gọi điện cho cô ngay.",
      "correctOption": 1
    },
    "75": {
      "snippet": "Món quà bạn nam chọn mua",
      "explanation": "🎯 Đáp án đúng: [4] Món quà bạn nam chọn mua\n\n💬 Dịch nghĩa câu:\n\"Bạn nam quyết định chọn mua chiếc khăn quàng cổ màu xanh ấm áp làm quà tặng sinh nhật mẹ.\"\n\n💡 Phân tích & Giải thích:\n• Sau khi cân nhắc giữa găng tay và khăn quàng cổ, bạn nam thấy mùa đông lạnh nên mua khăn quàng cổ xanh mẹ rất thích.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đôi găng tay da\n- 2. Chiếc khăn quàng cổ màu xanh (ĐÚNG)\n- 3. Chiếc áo len mùa đông\n- 4. Bó hoa tươi (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (5): 男の人はお母さんに何を買いますか。 正解: [2]",
      "audioScriptJa": "男：母は青色が好きだから、この青いマフラーにするよ。\n女：お母さん、きっと喜ぶね。",
      "audioScriptVi": "Nam: Mẹ mình thích màu xanh da trời, nên mình sẽ chọn chiếc khăn quàng cổ màu xanh này.\nNữ: Mẹ cậu chắc chắn sẽ vui lắm đấy.",
      "correctOption": 4
    },
    "76": {
      "snippet": "Cách đi đến bảo tàng mỹ thuật",
      "explanation": "🎯 Đáp án đúng: [3] Cách đi đến bảo tàng mỹ thuật\n\n💬 Dịch nghĩa câu:\n\"Hai người quyết định sẽ đi bộ ra bến xe buýt trước ga và bắt chuyến xe buýt số 3 đi thẳng tới cổng bảo tàng.\"\n\n💡 Phân tích & Giải thích:\n• Đi taxi quá đắt, đi tàu điện ngầm phải đi bộ xa, xe buýt số 3 đỗ ngay trước cổng nên hai người chọn đi xe buýt.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đi taxi\n- 2. Đi tàu điện ngầm\n- 3. Bắt chuyến xe buýt số 3 đi thẳng (ĐÚNG) (ĐÚNG)\n- 4. Mượn xe đạp đi\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (6): 二人は美術館へどうやって行きますか。 正解: [3]",
      "audioScriptJa": "女：バスなら美術館の真ん前で止まるから便利だよ。\n男：じゃあ、バスで行こう。",
      "audioScriptVi": "Nữ: Đi xe buýt thì xe dừng đỗ ngay trước cổng bảo tàng luôn, tiện lắm.\nNam: Vậy tụi mình đi xe buýt nhé.",
      "correctOption": 3
    },
    "77": {
      "snippet": "Công việc người phụ nữ làm ngay bây giờ",
      "explanation": "🎯 Đáp án đúng: [3] Công việc người phụ nữ làm ngay bây giờ\n\n💬 Dịch nghĩa câu:\n\"Người phụ nữ sẽ lập tức gọi điện thoại xác nhận lại giờ hạ cánh của đoàn khách đối tác.\"\n\n💡 Phân tích & Giải thích:\n• Để chuẩn bị xe đón đúng giờ, việc cấp bách trước mắt là gọi điện kiểm tra giờ chuyến bay đáp xuống sân bay.\n\n🔍 Phân tích các lựa chọn:\n- 1. Gọi điện thoại kiểm tra giờ hạ cánh chuyến bay (ĐÚNG)\n- 2. Lái xe ra sân bay ngay\n- 3. In bảng tên đón khách (ĐÚNG)\n- 4. Đặt phòng khách sạn\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (7): 女の人はまず何をしますか。 正解: [1]",
      "audioScriptJa": "男：飛行機が遅れているかもしれないから、まず空港に電話して確認してくれる？\n女：はい、すぐ確認します。",
      "audioScriptVi": "Nam: Có thể máy bay đang bị trễ chuyến, em gọi điện kiểm tra trước với sân bay được không?\nNữ: Vâng, em kiểm tra ngay ạ.",
      "correctOption": 3
    },
    "78": {
      "snippet": "Địa điểm kiểm tra thông tin thời khóa biểu",
      "explanation": "🎯 Đáp án đúng: [1] Địa điểm kiểm tra thông tin thời khóa biểu\n\n💬 Dịch nghĩa câu:\n\"Bạn sinh viên cần lên trang web của trường đại học để xem bảng thời khóa biểu lớp học mới cập nhật.\"\n\n💡 Phân tích & Giải thích:\n• Bảng thông báo ở sảnh đã gỡ xuống để sửa đổi, cô văn phòng bảo học sinh tra cứu bản chuẩn nhất trên trang web khoa.\n\n🔍 Phân tích các lựa chọn:\n- 1. Hỏi trực tiếp thầy cô giảng đường (ĐÚNG)\n- 2. Đến phòng giáo vụ trường\n- 3. Xem bảng tin dán ở hành lang\n- 4. Tra cứu trên trang web chính thức của trường (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (8): 学生はどこで時間割を見ますか。 正解: [4]",
      "audioScriptJa": "女：最新の時間割は学校のホームページに載っていますから、そちらを見てくださいね。\n男：はい、わかりました。",
      "audioScriptVi": "Nữ: Thời khóa biểu mới nhất đã đăng tải trên trang chủ của trường, em vào đó xem nhé.\nNam: Vâng, em hiểu rồi ạ.",
      "correctOption": 1
    },
    "79": {
      "snippet": "Lý do bạn nữ thích công việc làm thêm ở tiệm bánh",
      "explanation": "🎯 Đáp án đúng: [2] Lý do bạn nữ thích công việc làm thêm ở tiệm bánh\n\n💬 Dịch nghĩa câu:\n\"Bạn nữ thích làm việc ở đây vì được học hỏi rất nhiều công thức làm bánh ngọt từ những người thợ làm bánh chuyên nghiệp.\"\n\n💡 Phân tích & Giải thích:\n• Dù lương không quá cao nhưng bạn nữ rất hào hứng vì được học nghề làm bánh từ các tiền bối tay nghề giỏi.\n\n🔍 Phân tích các lựa chọn:\n- 1. Được học nghề làm bánh từ thợ chuyên nghiệp (ĐÚNG)\n- 2. Mức lương làm thêm rất cao (ĐÚNG)\n- 3. Cửa hàng rất gần nhà\n- 4. Được ăn bánh miễn phí thoải mái\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (1): 女の人はどうしてこのアルバイトが好きだと言っていますか。 正解: [1]",
      "audioScriptJa": "女：プロのケーキ職人さんから直接いろんな作り方を教えてもらえるのが一番楽しいの。",
      "audioScriptVi": "Nữ: Được các nghệ nhân làm bánh ngọt chuyên nghiệp trực tiếp chỉ dạy cho đủ mọi công thức là điều mình thấy vui nhất.",
      "correctOption": 2
    },
    "80": {
      "snippet": "Điểm nổi bật của chiếc máy ảnh mới mua",
      "explanation": "🎯 Đáp án đúng: [2] Điểm nổi bật của chiếc máy ảnh mới mua\n\n💬 Dịch nghĩa câu:\n\"Chiếc máy ảnh có khả năng chụp ảnh vô cùng sắc nét ngay cả trong điều kiện đêm tối thiếu ánh sáng.\"\n\n💡 Phân tích & Giải thích:\n• Bạn nam giải thích điểm ưng ý nhất là máy có cảm biến cao cấp, chụp cảnh đêm không hề bị nhòe hay nhiễu hạt.\n\n🔍 Phân tích các lựa chọn:\n- 1. Máy ảnh có màu sắc bắt mắt\n- 2. Máy ảnh giá rẻ bất ngờ (ĐÚNG)\n- 3. Máy ảnh có trọng lượng rất nhẹ\n- 4. Chụp ảnh ban đêm cực kỳ rõ nét và đẹp mắt (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (2): 新しいカメラのどこが一番いいと言っていますか。 正解: [4]",
      "audioScriptJa": "男：夜の暗いところでも、フラッシュなしですごく綺麗に撮れるところが気に入っているんだ。",
      "audioScriptVi": "Nam: Dù ở nơi tối tăm vào ban đêm, không cần đèn flash mà máy vẫn chụp được cực kỳ đẹp và sắc nét, đó là điểm tớ thích nhất.",
      "correctOption": 2
    },
    "81": {
      "snippet": "Lý do bạn nam đến muộn buổi hẹn",
      "explanation": "🎯 Đáp án đúng: [2] Lý do bạn nam đến muộn buổi hẹn\n\n💬 Dịch nghĩa câu:\n\"Bạn nam đến trễ là vì tuyến tàu điện ngầm gặp sự cố mất điện đột ngột nên đoàn tàu phải dừng giữa đường.\"\n\n💡 Phân tích & Giải thích:\n• Bạn nam xin lỗi rối rít và giải thích tàu bị dừng khẩn cấp do sự cố mất điện ở nhà ga trước.\n\n🔍 Phân tích các lựa chọn:\n- 1. Ngủ quên không nghe chuông báo thức\n- 2. Tàu điện gặp sự cố mất điện phải dừng giữa chừng (ĐÚNG) (ĐÚNG)\n- 3. Bị kẹt xe buýt\n- 4. Quên mất giờ hẹn\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (3): 男の人はどうして遅刻しましたか。 正解: [2]",
      "audioScriptJa": "男：ごめん！乗っていた電車が停電で途中で20分も止まっちゃって…",
      "audioScriptVi": "Nam: Xin lỗi cậu nhé! Chuyến tàu tớ đi bị mất điện đột ngột nên phải dừng khựng giữa đường tận 20 phút...",
      "correctOption": 2
    },
    "82": {
      "snippet": "Kế hoạch kỳ nghỉ hè của cô giáo",
      "explanation": "🎯 Đáp án đúng: [1] Kế hoạch kỳ nghỉ hè của cô giáo\n\n💬 Dịch nghĩa câu:\n\"Kỳ nghỉ hè này cô giáo dự định sẽ về thăm quê hương thăm ông bà và dành thời gian nghỉ ngơi thư giãn ở suối nước nóng.\"\n\n💡 Phân tích & Giải thích:\n• Cô chia sẻ lâu rồi không về quê nên sẽ về thăm quê nhà và cùng cả gia đình đi tắm Onsen thư giãn.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đi du lịch nước ngoài (ĐÚNG)\n- 2. Tham gia khóa học nâng cao\n- 3. Về quê thăm ông bà và đi suối nước nóng nghỉ dưỡng (ĐÚNG)\n- 4. Ở lại trường nghiên cứu sách\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (4): 先生は夏休みに何をしますか。 正解: [3]",
      "audioScriptJa": "女：田舎に帰って祖父母に会って、久しぶりに温泉にでも行こうと思っているのよ。",
      "audioScriptVi": "Nữ: Cô định về quê thăm ông bà, rồi nhân tiện cả nhà cùng đi tắm suối nước nóng nghỉ dưỡng một chuyến.",
      "correctOption": 1
    },
    "83": {
      "snippet": "Món ăn nổi tiếng nhất của nhà hàng",
      "explanation": "🎯 Đáp án đúng: [3] Món ăn nổi tiếng nhất của nhà hàng\n\n💬 Dịch nghĩa câu:\n\"Món ăn được đông đảo thực khách ưa chuộng và nổi tiếng nhất của quán là món mì Ramen nước hầm xương đậm đà.\"\n\n💡 Phân tích & Giải thích:\n• Nhân viên phục vụ giới thiệu món mì Ramen truyền thống hầm xương heo suốt 12 tiếng là món 'cháy hàng' nhất quán.\n\n🔍 Phân tích các lựa chọn:\n- 1. Mì Ramen truyền thống nước hầm xương đậm đà (ĐÚNG)\n- 2. Món cơm chiên hải sản\n- 3. Món sủi cảo gyoza nướng (ĐÚNG)\n- 4. Món lẩu bò\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (5): この店の人気メニューは何ですか。 正解: [1]",
      "audioScriptJa": "店員：当店で一番人気があるのは、12時間煮込んだこちらの特製豚骨ラーメンです。",
      "audioScriptVi": "Nhân viên: Món được khách hàng yêu thích và gọi nhiều nhất tại quán em là món mì Ramen Tonkotsu đặc chế hầm suốt 12 tiếng này ạ.",
      "correctOption": 3
    },
    "84": {
      "snippet": "Điều bạn nữ khuyên bạn nam khi học Kanji",
      "explanation": "🎯 Đáp án đúng: [3] Điều bạn nữ khuyên bạn nam khi học Kanji\n\n💬 Dịch nghĩa câu:\n\"Bạn nữ khuyên bạn nam thay vì chỉ viết lặp lại hãy cố gắng vừa viết vừa phát âm và đặt câu thực tế.\"\n\n💡 Phân tích & Giải thích:\n• Bí quyết học Kanji được chia sẻ: hãy liên tưởng chữ Hán vào trong câu văn cụ thể có ý nghĩa để nhớ được lâu bền.\n\n🔍 Phân tích các lựa chọn:\n- 1. Học thuộc lòng cả cuốn từ điển\n- 2. Liên tưởng chữ Hán vào văn cảnh và đặt câu thực tế (ĐÚNG)\n- 3. Chỉ học qua ứng dụng trên điện thoại (ĐÚNG)\n- 4. Mỗi ngày chép phạt 100 lần\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (6): 女の人は漢字をどうやって覚えるのがいいと言っていますか。 正解: [2]",
      "audioScriptJa": "女：単語だけで覚えるより、例文を作って声に出しながら書くのが一番身につくよ。",
      "audioScriptVi": "Nữ: Thay vì chỉ học từ vựng riêng lẻ, cậu vừa đặt câu ví dụ vừa đọc to lên rồi viết thì sẽ nhớ sâu nhất đấy.",
      "correctOption": 3
    },
    "85": {
      "snippet": "Tại sao thư viện lại thông báo tạm dừng hoạt động cuối tuần",
      "explanation": "🎯 Đáp án đúng: [4] Tại sao thư viện lại thông báo tạm dừng hoạt động cuối tuần\n\n💬 Dịch nghĩa câu:\n\"Thư viện tạm đóng cửa cuối tuần để tiến hành kiểm kê tổng thể toàn bộ đầu sách và nâng cấp hệ thống phần mềm tra cứu.\"\n\n💡 Phân tích & Giải thích:\n• Loa phát thanh thư viện thông báo đóng cửa 2 ngày cuối tuần phục vụ công tác kiểm kê định kỳ hàng năm và bảo trì máy chủ.\n\n🔍 Phân tích các lựa chọn:\n- 1. Thư viện bị ngập nước\n- 2. Tổ chức ngày hội đọc sách\n- 3. Thầy cô giáo đi vắng\n- 4. Kiểm kê định kỳ toàn bộ sách và bảo trì hệ thống phần mềm (ĐÚNG) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (7): 図書館はなぜ今週末休みですか。 正解: [4]",
      "audioScriptJa": "アナウンス：蔵書の一斉点検とシステム更新のため、今週末は休館とさせていただきます。",
      "audioScriptVi": "Phát thanh: Do công tác kiểm kê đồng loạt các đầu sách và nâng cấp hệ thống dữ liệu, thư viện xin phép tạm ngừng phục vụ vào cuối tuần này.",
      "correctOption": 4
    },
    "86": {
      "snippet": "Xin phép mượn chiếc kéo",
      "explanation": "🎯 Đáp án đúng: [2] Xin phép mượn chiếc kéo\n\n💬 Dịch nghĩa câu:\n\"Muốn mượn cây kéo của bạn cùng bàn để cắt giấy thủ công: 'Xin lỗi, bạn cho mình mượn cây kéo một lát được không?'\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu chuẩn nhờ mượn đồ dùng: 「ちょっとハサミを貸してもらえますか。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Kéo của bạn bén ghê nhỉ\n- 2. Bạn cho mình mượn cây kéo một chút được không? (ĐÚNG) (ĐÚNG)\n- 3. Mình đưa kéo cho bạn nhé\n- 4. Kéo này cắt được giấy không?\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (1): ハサミを借りたいです。何と言いますか。 正解: [2]",
      "audioScriptJa": "「ちょっとハサミを貸してもらえますか。」",
      "audioScriptVi": "Bạn cho mình mượn cây kéo một chút được không ạ?",
      "correctOption": 2
    },
    "87": {
      "snippet": "Chào khi khách bước vào cửa hàng",
      "explanation": "🎯 Đáp án đúng: [2] Chào khi khách bước vào cửa hàng\n\n💬 Dịch nghĩa câu:\n\"Khách bước chân vào quán ăn, nhân viên đon đả cất lời chào đón khách nồng hậu: 'Kính chào quý khách!'\"\n\n💡 Phân tích & Giải thích:\n• Lời chào tiêu chuẩn ngành dịch vụ Nhật: 「いらっしゃいませ！」\n\n🔍 Phân tích các lựa chọn:\n- 1. Kính chào quý khách! (ĐÚNG)\n- 2. Cảm ơn quý khách đã ghé thăm (ĐÚNG)\n- 3. Quý khách đi thong thả nhé\n- 4. Xin mời quý khách ngồi đằng kia\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (2): 店に客が入ってきました。何と言いますか。 正解: [1]",
      "audioScriptJa": "「いらっしゃいませ！」",
      "audioScriptVi": "Kính chào quý khách ạ!",
      "correctOption": 2
    },
    "88": {
      "snippet": "Hỏi đường đến bưu điện gần nhất",
      "explanation": "🎯 Đáp án đúng: [1] Hỏi đường đến bưu điện gần nhất\n\n💬 Dịch nghĩa câu:\n\"Muốn hỏi người đi đường đường tới bưu điện: 'Xin lỗi, cho tôi hỏi đường đi đến bưu điện đi như thế nào ạ?'\"\n\n💡 Phân tích & Giải thích:\n• Câu hỏi đường lịch sự: 「すみません、郵便局へはどう行けばいいですか。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Bưu điện nằm ở đâu thế bạn? (ĐÚNG)\n- 2. Bưu điện mở cửa lúc mấy giờ?\n- 3. Xin lỗi, cho tôi hỏi đường đi đến bưu điện đi như thế nào ạ? (ĐÚNG)\n- 4. Bưu điện có xa không?\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (3): 郵便局への行き方が知りたいです。何と言いますか。 正解: [3]",
      "audioScriptJa": "「すみません、郵便局へはどう行けばいいですか。」",
      "audioScriptVi": "Xin lỗi, cho tôi hỏi đến bưu điện thì đi đường nào ạ?",
      "correctOption": 1
    },
    "89": {
      "snippet": "Đề nghị giúp đỡ người đang mang vác đồ nặng",
      "explanation": "🎯 Đáp án đúng: [3] Đề nghị giúp đỡ người đang mang vác đồ nặng\n\n💬 Dịch nghĩa câu:\n\"Thấy cụ già mang túi đồ rất nặng đi lên bậc thang bộ: 'Bác ơi, để cháu xách giúp bác một tay nhé?'\"\n\n💡 Phân tích & Giải thích:\n• Đề nghị giúp đỡ lịch sự: 「荷物を持ちましょうか。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Đồ nặng thế hả bác?\n- 2. Bác để cháu xách giúp một tay nhé? (ĐÚNG)\n- 3. Bác đừng mang đồ nặng nhé (ĐÚNG)\n- 4. Bác có cần xe đẩy không?\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (4): 重い荷物を持っている人を手伝いたいです。何と言いますか。 正解: [2]",
      "audioScriptJa": "「荷物を持ちましょうか。」",
      "audioScriptVi": "Để cháu xách giúp bác chiếc túi nhé ạ?",
      "correctOption": 3
    },
    "90": {
      "snippet": "Rời khỏi chỗ ngồi trước trong bữa tiệc",
      "explanation": "🎯 Đáp án đúng: [2] Rời khỏi chỗ ngồi trước trong bữa tiệc\n\n💬 Dịch nghĩa câu:\n\"Có việc bận đột xuất phải rời khỏi buổi tiệc sớm hơn mọi người: 'Tôi xin lỗi, tôi xin phép về trước ạ.'\"\n\n💡 Phân tích & Giải thích:\n• Lời xin phép rời tiệc lịch sự: 「お先に失礼します。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Tôi xin phép về trước ạ (ĐÚNG)\n- 2. Mọi người về vui vẻ nhé (ĐÚNG)\n- 3. Tôi no rồi cảm ơn\n- 4. Hẹn gặp lại tuần sau\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (5): パーティーの途中で先に帰ります。何と言いますか。 正解: [1]",
      "audioScriptJa": "「お先に失礼します。」",
      "audioScriptVi": "Tôi xin phép ra về trước mọi người ạ.",
      "correctOption": 2
    },
    "91": {
      "snippet": "Rủ rê: 'Cuối tuần này cùng đi xem phim điện ảnh nhé?'",
      "explanation": "🎯 Đáp án đúng: [3] Rủ rê: 'Cuối tuần này cùng đi xem phim điện ảnh nhé?'\n\n💬 Dịch nghĩa câu:\n\"Hào hứng nhận lời rủ đi chơi: 'Hay quá, nhất định mình cùng đi nhé!'\"\n\n💡 Phân tích & Giải thích:\n• Nhận lời rủ rê nhiệt tình: 「いいですね、ぜひ行きましょう！」\n\n🔍 Phân tích các lựa chọn:\n- 1. Phim đó không hay đâu\n- 2. Tôi không thích xem phim rạp\n- 3. Hay quá, nhất định chúng mình cùng đi nhé! (ĐÚNG) (ĐÚNG)\n- 4. Tôi xem tuần trước rồi\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (1): 今週末、一緒に映画を見に行きませんか。 正解: [3]",
      "audioScriptJa": "男：今週末、一緒に映画を見に行きませんか。\n女：いいですね、ぜひ行きましょう！",
      "audioScriptVi": "Nam: Cuối tuần này cậu có muốn cùng tớ đi xem phim điện ảnh không?\nNữ: Ý hay quá, nhất định tụi mình cùng đi nhé!",
      "correctOption": 3
    },
    "92": {
      "snippet": "Hỏi mượn tài liệu: 'Cho mình xem tập ghi chép bài học này một lát nhé?'",
      "explanation": "🎯 Đáp án đúng: [3] Hỏi mượn tài liệu: 'Cho mình xem tập ghi chép bài học này một lát nhé?'\n\n💬 Dịch nghĩa câu:\n\"Sẵn lòng cho bạn mượn tập vở ghi: 'Được chứ, đây bạn cầm lấy này.'\"\n\n💡 Phân tích & Giải thích:\n• Đồng ý cho mượn đồ: 「ええ、どうぞ。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Được chứ, xin mời bạn (ĐÚNG)\n- 2. Tôi không có ở đây\n- 3. Cái này đắt tiền lắm đấy (ĐÚNG)\n- 4. Bạn trả lại cho tôi rồi mà\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (2): このノート、ちょっと見せてもらってもいい？ 正解: [1]",
      "audioScriptJa": "女：このノート、ちょっと見せてもらってもいい？\n男：ええ、どうぞ。",
      "audioScriptVi": "Nữ: Cậu cho tớ xem nhờ quyển vở ghi này một chút được không?\nNam: Ừ được chứ, cậu cứ xem đi.",
      "correctOption": 3
    },
    "93": {
      "snippet": "Hỏi thăm: 'Hôm nay trời lạnh thật đấy nhỉ!'",
      "explanation": "🎯 Đáp án đúng: [2] Hỏi thăm: 'Hôm nay trời lạnh thật đấy nhỉ!'\n\n💬 Dịch nghĩa câu:\n\"Đồng tình chia sẻ cảm nhận thời tiết: 'Đúng thế thật, lạnh buốt thấu xương luôn ấy.'\"\n\n💡 Phân tích & Giải thích:\n• Đồng thuận cảm nhận: 「ええ、本当に寒いですね。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Không hề lạnh chút nào\n- 2. Vâng đúng thế thật, rét quá bạn nhỉ (ĐÚNG) (ĐÚNG)\n- 3. Ngày mai trời sẽ nắng\n- 4. Tôi thích mùa đông\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (3): 今日は本当に寒いですね。 正解: [2]",
      "audioScriptJa": "男：今日は本当に寒いですね。\n女：ええ、本当に寒いですね。",
      "audioScriptVi": "Nam: Hôm nay trời rét buốt thật đấy cậu nhỉ!\nNữ: Vâng đúng thế thật, lạnh cóng luôn ấy cậu.",
      "correctOption": 2
    },
    "94": {
      "snippet": "Hỏi han: 'Bạn đã ăn thử món bánh này lần nào chưa?'",
      "explanation": "🎯 Đáp án đúng: [3] Hỏi han: 'Bạn đã ăn thử món bánh này lần nào chưa?'\n\n💬 Dịch nghĩa câu:\n\"Trả lời trải nghiệm ẩm thực: 'Chưa, đây là lần đầu tiên tôi được ăn thử món này đấy.'\"\n\n💡 Phân tích & Giải thích:\n• Diễn đạt trải nghiệm lần đầu: 「いいえ、食べるのは初めてです。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Tôi ăn no rồi\n- 2. Món này nấu khó lắm\n- 3. Chưa ạ, đây là lần đầu tiên tôi được thưởng thức món này đấy (ĐÚNG) (ĐÚNG)\n- 4. Tôi không biết ai làm\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (4): このお菓子、もう食べたことがありますか。 正解: [3]",
      "audioScriptJa": "女：このお菓子、もう食べたことがありますか。\n男：いいえ、食べるのは初めてです。",
      "audioScriptVi": "Nữ: Món bánh này cậu đã từng được ăn thử lần nào chưa?\nNam: Dạ chưa, đây là lần đầu tiên tớ được ăn thử đấy.",
      "correctOption": 3
    },
    "95": {
      "snippet": "Cảm ơn: 'Hôm nay cảm ơn bạn rất nhiều vì đã giúp đỡ mình nhé!'",
      "explanation": "🎯 Đáp án đúng: [1] Cảm ơn: 'Hôm nay cảm ơn bạn rất nhiều vì đã giúp đỡ mình nhé!'\n\n💬 Dịch nghĩa câu:\n\"Đáp lại lời cảm ơn nhã nhặn: 'Không có chi đâu, bạn đừng bận tâm nhé.'\"\n\n💡 Phân tích & Giải thích:\n• Đáp từ khi được cảm ơn: 「いいえ、どういたしまして。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Không có gì đâu bạn ơi, đừng khách sáo nhé (ĐÚNG) (ĐÚNG)\n- 2. Cảm ơn bạn rất nhiều\n- 3. Lần sau nhớ trả ơn nhé\n- 4. Tôi không giúp được gì nhiều\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (5): 今日はいろいろ手伝ってくれて、ありがとう。 正解: [1]",
      "audioScriptJa": "男：今日はいろいろ手伝ってくれて、ありがとう。\n女：いいえ、どういたしまして。",
      "audioScriptVi": "Nam: Hôm nay cậu giúp đỡ tớ nhiều việc quá, cảm ơn cậu nhiều nhé!\nNữ: Không có gì đâu cậu ơi, có chi đâu mà khách sáo.",
      "correctOption": 1
    },
    "96": {
      "snippet": "Hỏi ý kiến: 'Chiếc cà vạt này trông có hợp với tớ không?'",
      "explanation": "🎯 Đáp án đúng: [1] Hỏi ý kiến: 'Chiếc cà vạt này trông có hợp với tớ không?'\n\n💬 Dịch nghĩa câu:\n\"Khen ngợi chân thành: 'Hợp lắm luôn, màu sắc trông rất nhã nhặn và đẹp mắt!'\"\n\n💡 Phân tích & Giải thích:\n• Khen ngợi vẻ ngoài: 「とてもよく似合っていますよ。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Cái đó dài quá (ĐÚNG)\n- 2. Rất là hợp với cậu luôn đấy, đẹp lắm! (ĐÚNG)\n- 3. Cậu mua bao nhiêu tiền thế?\n- 4. Đừng đeo cái đó\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (6): このネクタイ、私に似合いますか。 正解: [2]",
      "audioScriptJa": "男：このネクタイ、私に似合いますか。\n女：ええ、とてもよく似合っていますよ。",
      "audioScriptVi": "Nam: Chiếc cà vạt này cậu thấy có hợp với tớ không?\nNữ: Vâng, trông rất hợp với anh luôn đấy ạ, đẹp lắm!",
      "correctOption": 1
    },
    "97": {
      "snippet": "Mời trà: 'Bạn uống thêm một tách cà phê nữa nhé?'",
      "explanation": "🎯 Đáp án đúng: [2] Mời trà: 'Bạn uống thêm một tách cà phê nữa nhé?'\n\n💬 Dịch nghĩa câu:\n\"Từ chối lịch sự khi đã dùng đủ: 'Cảm ơn bạn, mình đã uống đủ rồi ạ.'\"\n\n💡 Phân tích & Giải thích:\n• Từ chối lời mời lịch thiệp: 「あ、もう十分いただきました。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Cà phê đắng quá\n- 2. Tôi không thích đồ ngọt (ĐÚNG)\n- 3. A cảm ơn bạn, mình đã uống no và đủ rồi nhé (ĐÚNG)\n- 4. Pha cho tôi ly to nhé\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (7): コーヒーのおかわりはいかがですか。 正解: [3]",
      "audioScriptJa": "女：コーヒーのおかわりはいかがですか。\n男：あ、もう十分いただきました。ありがとうございます。",
      "audioScriptVi": "Nữ: Cậu có muốn dùng thêm một tách cà phê nữa không?\nNam: A cảm ơn cậu nhiều nhé, tớ đã uống đủ rồi ạ.",
      "correctOption": 2
    },
    "98": {
      "snippet": "Hỏi thăm tiến độ: 'Bản thảo bài báo cáo của bạn đã viết xong xuôi chưa?'",
      "explanation": "🎯 Đáp án đúng: [1] Hỏi thăm tiến độ: 'Bản thảo bài báo cáo của bạn đã viết xong xuôi chưa?'\n\n💬 Dịch nghĩa câu:\n\"Báo cáo tiến độ chuẩn bị: 'Gần xong rồi ạ, chỉ còn đọc soát lại một chút nữa thôi.'\"\n\n💡 Phân tích & Giải thích:\n• Cập nhật trạng thái sắp xong: 「あと少しで書き終わります。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Còn một chút xíu nữa là mình viết xong xuôi rồi (ĐÚNG) (ĐÚNG)\n- 2. Tôi chưa viết chữ nào\n- 3. Báo cáo nộp tuần trước rồi mà\n- 4. Thầy giáo chưa chấm bài\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (8): レポートはもう書き終わりましたか。 正解: [1]",
      "audioScriptJa": "男：レポートはもう書き終わりましたか。\n女：あと少しで書き終わります。",
      "audioScriptVi": "Nam: Bài báo cáo của cậu đã viết xong xuôi hết chưa?\nNữ: Còn một chút xíu nữa là xong rồi cậu ạ.",
      "correctOption": 1
    },
  },
  "n4-2018": {
    "1": {
      "snippet": "楽しい (たのしい)",
      "explanation": "🎯 Đáp án đúng: [3] 楽しい (たのしい)\n\n💬 Dịch nghĩa câu:\n\"Hôm nay trôi qua thật là vui vẻ và thoải mái.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán 「楽」 (lạc) trong tính từ 「たのしい」 mang ý nghĩa vui vẻ, hứng khởi.\n\n🔍 Phân tích các lựa chọn:\n- 1. いそがしい (忙しい): Bận rộn\n- 2. すずしい (涼しい): Mát mẻ\n- 3. たのしい (楽しい): Vui vẻ, hào hứng (ĐÚNG)\n- 4. かなしい (悲しい): Buồn bã\n\n📄 Trích PDF gốc (试题解析):\n(1) 3 句意: 今天非常开心啊。3. たのしい(楽しい): 愉快",
      "correctOption": 3
    },
    "2": {
      "snippet": "味 (あじ)",
      "explanation": "🎯 Đáp án đúng: [4] 味 (あじ)\n\n💬 Dịch nghĩa câu:\n\"Tôi rất thích hương vị đậm đà của món ăn này.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán 「味」 (vị) có âm Kun thuần Nhật là 「あじ」 (mùi vị đồ ăn).\n\n🔍 Phân tích các lựa chọn:\n- 1. かたち (形): Hình dáng, phom dáng\n- 2. いろ (色): Màu sắc\n- 3. におい (匂い): Mùi hương\n- 4. あじ (味): Hương vị, vị giác (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(2) 4 句意: 我喜欢这种味道。4. あじ(味): 味道",
      "correctOption": 4
    },
    "3": {
      "snippet": "不便 (ふべん)",
      "explanation": "🎯 Đáp án đúng: [1] 不便 (ふべん)\n\n💬 Dịch nghĩa câu:\n\"Khu vực lân cận quanh đây cuộc sống có đôi chút bất tiện.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「不」 (bất) ghép với 「便」 (tiện) đọc âm On là 「ふべん」 (bất tiện, thiếu tiện ích).\n\n🔍 Phân tích các lựa chọn:\n- 1. ふべん (不便): Bất tiện, không thuận tiện (ĐÚNG)\n- 2. ふびん: Sai âm đọc\n- 3. ふへん (不変): Bất biến\n- 4. ぶべん: Sai âm đầu\n\n📄 Trích PDF gốc (试题解析):\n(3) 1 句意: 这附近有些不大方便。1. ふべん(不便): 不方便",
      "correctOption": 1
    },
    "4": {
      "snippet": "切る (きる)",
      "explanation": "🎯 Đáp án đúng: [2] 切る (きる)\n\n💬 Dịch nghĩa câu:\n\"Xin vui lòng thái / cắt nhỏ phần rau củ này giúp tôi.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán 「切」 (thiết) có cách đọc Kun là 「きる」 (cắt, thái đồ ăn). Thể て là 「切ってください」.\n\n🔍 Phân tích các lựa chọn:\n- 1. とる (撮る/取る): Chụp ảnh / Cầm lấy\n- 2. きる (切る): Cắt, thái lát (ĐÚNG)\n- 3. あらう (洗う): Rửa sạch\n- 4. もつ (持つ): Cầm, mang theo\n\n📄 Trích PDF gốc (试题解析):\n(4) 2 句意: 请把蔬菜切一下。2. きる(切る): 切, 割",
      "correctOption": 2
    },
    "5": {
      "snippet": "以外 (いがい)",
      "explanation": "🎯 Đáp án đúng: [4] 以外 (いがい)\n\n💬 Dịch nghĩa câu:\n\"Ngoài anh Kobayashi ra thì tất cả mọi người khác đều đã đến đông đủ.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「以」 âm On là 「い」, chữ 「外」 âm On là 「がい」 -> 以外 (いがい: ngoại trừ, ngoài ra).\n\n🔍 Phân tích các lựa chọn:\n- 1. いがた: Sai âm đuôi\n- 2. いそと: Nhầm âm Kun của 外 (そと)\n- 3. いかい: Thiếu biến âm đục ở がい\n- 4. いがい (以外): Ngoài ra, ngoại trừ (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(5) 4 句意: 除了小林以外, 其他人都来了。考察汉字词，“以”音读为“い”，“外”音读为“がい”。",
      "correctOption": 4
    },
    "6": {
      "snippet": "雲 (くも)",
      "explanation": "🎯 Đáp án đúng: [3] 雲 (くも)\n\n💬 Dịch nghĩa câu:\n\"Tôi cứ ngồi ngắm mãi những đám mây trôi ngoài khung cửa sổ.\"\n\n💡 Phân tích & Giải thích:\n• Chữ Hán 「雲」 (vân) có cách đọc Kunyomi chuẩn xác là 「くも」 (đám mây trên trời).\n\n🔍 Phân tích các lựa chọn:\n- 1. ほし (星): Ngôi sao\n- 2. ゆき (雪): Tuyết rơi\n- 3. くも (雲): Đám mây (ĐÚNG)\n- 4. そら (空): Bầu trời\n\n📄 Trích PDF gốc (试题解析):\n(6) 3 句意: 我一直看着窗外的云。3. くも(雲): 云",
      "correctOption": 3
    },
    "7": {
      "snippet": "急行 (きゅうこう)",
      "explanation": "🎯 Đáp án đúng: [4] 急行 (きゅうこう)\n\n💬 Dịch nghĩa câu:\n\"Chuyến tàu điện đó là chuyến tàu tốc hành (cấp hành).\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「急」 có âm On là 「きゅう」, chữ 「行」 có âm On là 「こう」 -> 急行 (きゅうこう: tàu tốc hành).\n\n🔍 Phân tích các lựa chọn:\n- 1. いそぎゆき: Nhầm sang hai âm Kun\n- 2. きゅうゆき: Nhầm âm Kun của 行\n- 3. いそぎこう: Nhầm âm Kun của 急\n- 4. きゅうこう (急行): Tàu tốc hành (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(7) 4 句意: 那趟电车是快车。考察汉字词: “急”音读为“きゅう”，“行”音读为“こう”。",
      "correctOption": 4
    },
    "8": {
      "snippet": "写す (うつす) -> 写さないで",
      "explanation": "🎯 Đáp án đúng: [2] 写す (うつす) -> 写さないで\n\n💬 Dịch nghĩa câu:\n\"Xin vui lòng đừng chụp hình tác phẩm này.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「うつす (写す - tả)」: sao chép, chụp ảnh (写真を写す/撮る). Thể phủ định cấm đoán: 写さないでください.\n\n🔍 Phân tích các lựa chọn:\n- 1. おさないで (押す): Xin đừng ấn/bấm\n- 2. うつさないで (写す): Xin đừng chụp ảnh/sao chép (ĐÚNG)\n- 3. けさないで (消す): Xin đừng xóa/tắt\n- 4. おとさないで (落とす): Xin đừng làm rơi\n\n📄 Trích PDF gốc (试题解析):\n(8) 2 句意: 请不要拍这个。2. うつす(写す): 摄影, 拍照",
      "correctOption": 2
    },
    "9": {
      "snippet": "反対 (はんたい)",
      "explanation": "🎯 Đáp án đúng: [1] 反対 (はんたい)\n\n💬 Dịch nghĩa câu:\n\"Tôi kiên quyết phản đối ý kiến đề xuất đó.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「反」 có âm On là 「はん」, chữ 「対」 có âm On là 「たい」 -> 反対 (はんたい: phản đối, trái ngược).\n\n🔍 Phân tích các lựa chọn:\n- 1. はんたい (反対): Phản đối, trái ngược (ĐÚNG)\n- 2. かんたい (歓待/艦隊): Đón tiếp nồng hậu\n- 3. ほんたい (本体): Thân máy, bản thể\n- 4. げんたい (減退): Giảm sút\n\n📄 Trích PDF gốc (试题解析):\n(9) 1 句意: 我反对那个意见。考察汉字词: “反”音读为“はん”，“対”音读为“たい”。",
      "correctOption": 1
    },
    "10": {
      "snippet": "黒い (くろい)",
      "explanation": "🎯 Đáp án đúng: [2] 黒い (くろい)\n\n💬 Dịch nghĩa câu:\n\"Tôi muốn mua một đôi giày da màu đen.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ 「くろい」 được viết bằng chữ Hán chuẩn xác là 「黒い」 (hắc - màu đen).\n\n🔍 Phân tích các lựa chọn:\n- 1. 白い (しろい): Màu trắng\n- 2. 黒い (くろい): Màu đen (ĐÚNG)\n- 3. 赤い (あかい): Màu đỏ\n- 4. 青い (あおい): Màu xanh lam\n\n📄 Trích PDF gốc (试题解析):\n(10) 2 句意: 我想要双黑色的鞋子。2. 黒い(くろい): 黑色的",
      "correctOption": 2
    },
    "11": {
      "snippet": "計画 (けいかく)",
      "explanation": "🎯 Đáp án đúng: [3] 計画 (けいかく)\n\n💬 Dịch nghĩa câu:\n\"Kế hoạch cho chuyến du lịch kỳ nghỉ hè vẫn chưa được ấn định xong.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「計」 (kế) ghép với chữ 「画」 (họa) tạo thành từ 「計画」 (kế hoạch, dự định).\n\n🔍 Phân tích các lựa chọn:\n- 1. 計両: Sai chữ Hán\n- 2. 計面: Sai chữ Hán\n- 3. 計画 (けいかく): Kế hoạch, quy hoạch (ĐÚNG)\n- 4. 計目: Sai chữ Hán\n\n📄 Trích PDF gốc (试题解析):\n(11) 3 句意: 暑假的计划还没确定下来。3. 計画(けいかく): 计划, 规划",
      "correctOption": 3
    },
    "12": {
      "snippet": "医者 (いしゃ)",
      "explanation": "🎯 Đáp án đúng: [4] 医者 (いしゃ)\n\n💬 Dịch nghĩa câu:\n\"Ước mơ từ nhỏ của tôi là trở thành một vị bác sĩ giỏi.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「医」 (y) ghép với chữ 「者」 (giả) tạo thành danh từ 「医者」 (bác sĩ chữa bệnh).\n\n🔍 Phân tích các lựa chọn:\n- 1. 医員: Nhân viên y tế\n- 2. 医長: Trưởng khoa y\n- 3. 医人: Từ không chuẩn\n- 4. 医者 (いしゃ): Bác sĩ y khoa (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(12) 4 句意: 我想成为一名医生。4. 医者(いしゃ): 医生",
      "correctOption": 4
    },
    "13": {
      "snippet": "夜 (よる)",
      "explanation": "🎯 Đáp án đúng: [1] 夜 (よる)\n\n💬 Dịch nghĩa câu:\n\"Tối mai tôi sẽ cùng gia đình đi ăn tối ở bên ngoài.\"\n\n💡 Phân tích & Giải thích:\n• Từ 「よる」 được viết bằng chữ Hán chuẩn xác là 「夜」 (dạ - ban đêm, buổi tối).\n\n🔍 Phân tích các lựa chọn:\n- 1. 夜 (よる): Buổi tối, ban đêm (ĐÚNG)\n- 2. 昼 (ひる): Ban ngày, buổi trưa\n- 3. 夕 (ゆう): Hoàng hôn, chiều tà\n- 4. 朝 (あさ): Buổi sáng sớm\n\n📄 Trích PDF gốc (试题解析):\n(13) 1 句意: 我明晚会和家人一起出门。1. 夜(よる): 晚上",
      "correctOption": 1
    },
    "14": {
      "snippet": "貸して (かして)",
      "explanation": "🎯 Đáp án đúng: [3] 貸して (かして)\n\n💬 Dịch nghĩa câu:\n\"Trời bất chợt đổ mưa, xin hãy cho tôi mượn chiếc ô với.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「かす (貸す - thải)」: cho mượn. Cấu trúc nhờ vả: 「貸してください」 (xin hãy cho tôi mượn).\n\n🔍 Phân tích các lựa chọn:\n- 1. 返して (かえして): Trả lại đồ\n- 2. 足して (たして): Cộng thêm vào\n- 3. 貸して (かして): Cho mượn, cho vay (ĐÚNG)\n- 4. 直して (なおして): Sửa chữa lại\n\n📄 Trích PDF gốc (试题解析):\n(14) 3 句意: 请把伞借给我。3. 貸す(かす): 借给",
      "correctOption": 3
    },
    "15": {
      "snippet": "試合 (しあい)",
      "explanation": "🎯 Đáp án đúng: [4] 試合 (しあい)\n\n💬 Dịch nghĩa câu:\n\"Ngày mai ở sân vận động trường có trận thi đấu bóng đá.\"\n\n💡 Phân tích & Giải thích:\n• Chữ 「試」 (thí) ghép với chữ 「合」 (hợp) tạo thành danh từ 「試合」 (trận đấu, thi đấu thể thao).\n\n🔍 Phân tích các lựa chọn:\n- 1. 試験 (しけん): Kỳ thi, kiểm tra\n- 2. 試問: Vấn đáp\n- 3. 試用: Dùng thử\n- 4. 試合 (しあい): Trận thi đấu đối kháng (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(15) 4 句意: 明天有足球赛。4. 試合(しあい): 比赛",
      "correctOption": 4
    },
    "16": {
      "snippet": "心配 (しんぱい)",
      "explanation": "🎯 Đáp án đúng: [1] 心配 (しんぱい)\n\n💬 Dịch nghĩa câu:\n\"Nghe tin anh Sato bị tai nạn chấn thương, mọi người ai nấy đều rất lo lắng.\"\n\n💡 Phân tích & Giải thích:\n• Cụm từ cố định: 「心配する / 心配だ」 (lo lắng, bận tâm cho sự an toàn của ai đó).\n\n🔍 Phân tích các lựa chọn:\n- 1. 心配 (しんぱい): Lo lắng, sốt ruột (ĐÚNG)\n- 2. 経験 (けいけん): Kinh nghiệm\n- 3. 失礼 (しつれい): Thất lễ, bất lịch sự\n- 4. お辞儀 (おじぎ): Cúi đầu chào\n\n📄 Trích PDF gốc (试题解析):\n(16) 1 句意: 听说佐藤先生受伤了, 大家都非常担心。1. 心配(しんぱい): 担心, 挂念",
      "correctOption": 1
    },
    "17": {
      "snippet": "夢 (ゆめ)",
      "explanation": "🎯 Đáp án đúng: [2] 夢 (ゆめ)\n\n💬 Dịch nghĩa câu:\n\"Ước mơ sau này khi trưởng thành của tôi là trở thành một ca sĩ nổi tiếng.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「ゆめ (夢)」 nghĩa là giấc mơ hoặc ước mơ, hoài bão tương lai.\n\n🔍 Phân tích các lựa chọn:\n- 1. 景色 (けしき): Phong cảnh\n- 2. 夢 (ゆめ): Ước mơ, hoài bão (ĐÚNG)\n- 3. 思い出 (おもいで): Kỷ niệm xưa\n- 4. 世話 (せわ): Chăm sóc, giúp đỡ\n\n📄 Trích PDF gốc (试题解析):\n(17) 2 句意: 我梦想将来成为一名歌手。2. ゆめ(夢): 梦想",
      "correctOption": 2
    },
    "18": {
      "snippet": "ぜひ (是非)",
      "explanation": "🎯 Đáp án đúng: [2] ぜひ (是非)\n\n💬 Dịch nghĩa câu:\n\"Toru à, buổi liên hoan họp mặt lần này bạn nhất định phải tới chung vui nhé.\"\n\n💡 Phân tích & Giải thích:\n• Phó từ 「ぜひ (是非)」 dùng để mời mọc, nhờ vả thiết tha mang nghĩa 'nhất định, bằng mọi giá'.\n\n🔍 Phân tích các lựa chọn:\n- 1. 非常に (ひじょうに): Cực kỳ, vô cùng\n- 2. ぜひ: Nhất định, tha thiết mong bạn (ĐÚNG)\n- 3. 十分 (じゅうぶん): Đầy đủ, thỏa đáng\n- 4. いつも: Lúc nào cũng\n\n📄 Trích PDF gốc (试题解析):\n(18) 2 句意: 小达, 这次的聚会请一定要来哦。2. ぜひ(是非): 一定, 务必",
      "correctOption": 2
    },
    "19": {
      "snippet": "説明 (せつめい)",
      "explanation": "🎯 Đáp án đúng: [3] 説明 (せつめい)\n\n💬 Dịch nghĩa câu:\n\"Tiếp sau đây tôi sẽ giải thích hướng dẫn cách vận hành máy móc, xin hãy lắng nghe.\"\n\n💡 Phân tích & Giải thích:\n• Danh động từ 「説明する」 mang nghĩa là giải thích, thuyết minh rõ ràng.\n\n🔍 Phân tích các lựa chọn:\n- 1. 準備 (じゅんび): Chuẩn bị đồ đạc\n- 2. 利用 (りよう): Tận dụng, sử dụng\n- 3. 説明 (せつめい): Giải thích, thuyết minh (ĐÚNG)\n- 4. 生産 (せいさん): Sản xuất hàng hóa\n\n📄 Trích PDF gốc (试题解析):\n(19) 3 句意: 接下来我将说明机器的使用方法, 请认真听我说。3. 説明(せつめい): 说明, 解释",
      "correctOption": 3
    },
    "20": {
      "snippet": "固い (かたい)",
      "explanation": "🎯 Đáp án đúng: [2] 固い (かたい)\n\n💬 Dịch nghĩa câu:\n\"Tình trạng răng miệng của tôi không tốt nên tôi không thể ăn những món đồ cứng được.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ 「かたい (固い / 硬い)」 nghĩa là cứng, dai (đối lập với mềm やわらかい).\n\n🔍 Phân tích các lựa chọn:\n- 1. 厳しい (きびしい): Nghiêm khắc\n- 2. 固い (かたい): Cứng, dai (ĐÚNG)\n- 3. 早い (はやい): Nhanh chóng\n- 4. 深い (ふかい): Sâu sắc\n\n📄 Trích PDF gốc (试题解析):\n(20) 2 句意: 我的牙不好, 所以不能吃硬东西。2. かたい(固い): 坚硬的",
      "correctOption": 2
    },
    "21": {
      "snippet": "誘う (さそう)",
      "explanation": "🎯 Đáp án đúng: [1] 誘う (さそう)\n\n💬 Dịch nghĩa câu:\n\"Tôi đã chủ động rủ anh Mori cùng đi chơi nhưng anh ấy bảo bận việc không đi được.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「さそう (誘う)」: rủ rê, mời mọc cùng tham gia hoạt động giải trí.\n\n🔍 Phân tích các lựa chọn:\n- 1. 誘う (さそう): Rủ rê, mời đi cùng (ĐÚNG)\n- 2. 伝える (つたえる): Truyền đạt, nhắn nhủ\n- 3. 案内する (あんないする): Dẫn đường\n- 4. 紹介する (しょうかいする): Giới thiệu\n\n📄 Trích PDF gốc (试题解析):\n(21) 1 句意: 我邀请小森去约会, 但他说去不了。1. さそう(誘う): 邀请, 相邀",
      "correctOption": 1
    },
    "22": {
      "snippet": "センチ (cm)",
      "explanation": "🎯 Đáp án đúng: [4] センチ (cm)\n\n💬 Dịch nghĩa câu:\n\"Thằng bé con trai tôi trong vòng một năm qua đã phát triển cao thêm tận 5 cm.\"\n\n💡 Phân tích & Giải thích:\n• Đơn vị đo chiều dài, chiều cao trong tiếng Nhật là 「センチ (centimet)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. グラム (gram): Đơn vị khối lượng\n- 2. 番 (ばん): Số thứ tự\n- 3. 軒 (けん): Đơn vị đếm ngôi nhà\n- 4. センチ (cm): Đơn vị đo độ dài centimet (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(22) 4 句意: 我儿子1年里长高了5厘米。4. センチ: 厘米",
      "correctOption": 4
    },
    "23": {
      "snippet": "比べる (くらべる)",
      "explanation": "🎯 Đáp án đúng: [3] 比べる (くらべる)\n\n💬 Dịch nghĩa câu:\n\"Sau khi so sánh 3 chiếc máy tính xách tay ở cửa hàng, tôi đã chọn chiếc nhẹ nhất.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「くらべる (比べる)」: so sánh, đối chiếu các đối tượng với nhau.\n\n🔍 Phân tích các lựa chọn:\n- 1. 片付ける (かたづける): Dọn dẹp phòng\n- 2. 数える (かぞえる): Đếm số lượng\n- 3. 比べる (くらべる): So sánh, cân nhắc (ĐÚNG)\n- 4. 払う (はらう): Trả tiền\n\n📄 Trích PDF gốc (试题解析):\n(23) 3 句意: 比较了店里的三台电脑, 选择了最轻便的那台。3. くらべる(比べる): 相比, 比较",
      "correctOption": 3
    },
    "24": {
      "snippet": "留守 (るす)",
      "explanation": "🎯 Đáp án đúng: [4] 留守 (るす)\n\n💬 Dịch nghĩa câu:\n\"Đèn trong nhà anh Tanaka không bật, trông có vẻ như anh ấy đang đi vắng.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「留守 (るす)」: vắng nhà, không có nhà.\n\n🔍 Phân tích các lựa chọn:\n- 1. 嘘 (うそ): Nói dối\n- 2. 自由 (じゆう): Tự do\n- 3. 中止 (ちゅうし): Hủy bỏ giữa chừng\n- 4. 留守 (るす): Đi vắng, vắng nhà (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(24) 4 句意: 田中先生家的灯没开, 他好像不在家。4. るす(留守): 不在家",
      "correctOption": 4
    },
    "25": {
      "snippet": "見つからない (みつからない)",
      "explanation": "🎯 Đáp án đúng: [1] 見つからない (みつからない)\n\n💬 Dịch nghĩa câu:\n\"Tôi đang tìm kiếm chiếc chìa khóa phòng nhưng mãi vẫn chưa tìm thấy đâu.\"\n\n💡 Phân tích & Giải thích:\n• Tự động từ 「みつかる (見つかる)」: được tìm thấy. Thể phủ định: 「見つからない」 (chưa tìm thấy).\n\n🔍 Phân tích các lựa chọn:\n- 1. 見つからない (みつからない): Chưa tìm thấy (ĐÚNG)\n- 2. 捕まえる (つかまえる): Bắt giữ\n- 3. 知る (しる): Biết đến\n- 4. 触る (さわる): Chạm tay vào\n\n📄 Trích PDF gốc (试题解析):\n(25) 1 句意: 我在找房间的钥匙, 但还没找到。1. 見つからない: 找不到",
      "correctOption": 1
    },
    "26": {
      "snippet": "アルバイト ≒ 働いている",
      "explanation": "🎯 Đáp án đúng: [2] アルバイト ≒ 働いている\n\n💬 Dịch nghĩa câu:\n\"Em trai tôi đang làm thêm kiếm tiền tại quán cà phê gần trường.\"\n\n💡 Phân tích & Giải thích:\n• Từ mượn 「アルバイト」 (làm thêm, part-time) đồng nghĩa với việc đang làm việc: 「働いている」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đang đợi tôi ở quán cà phê\n- 2. Đang làm việc tại quán cà phê (ĐÚNG)\n- 3. Đang uống cà phê tại quán\n- 4. Đang nói chuyện với bạn bè\n\n📄 Trích PDF gốc (试题解析):\n(26) 2 句意: 我的弟弟在那家咖啡厅打工。(アルバイト: 打工 ≒ 働いている)",
      "correctOption": 2
    },
    "27": {
      "snippet": "水泳 ≒ 泳ぐこと",
      "explanation": "🎯 Đáp án đúng: [2] 水泳 ≒ 泳ぐこと\n\n💬 Dịch nghĩa câu:\n\"Môn thể thao yêu thích của tôi là môn bơi lội dưới nước.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「水泳 (すいえい: bơi lội)」 hoàn toàn đồng nghĩa với danh từ hóa 「泳ぐこと (việc bơi)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Tôi thích việc chạy bộ\n- 2. Tôi thích việc đi bơi lội (ĐÚNG)\n- 3. Tôi thích ăn cơm\n- 4. Tôi thích đọc sách báo\n\n📄 Trích PDF gốc (试题解析):\n(27) 2 句意: 我喜欢水泳。(すいえい ≒ 泳ぐ)",
      "correctOption": 2
    },
    "28": {
      "snippet": "びっくりした ≒ 驚いた",
      "explanation": "🎯 Đáp án đúng: [4] びっくりした ≒ 驚いた\n\n💬 Dịch nghĩa câu:\n\"Vừa nghe xong câu chuyện đó tôi đã giật bắn mình và vô cùng sửng sốt.\"\n\n💡 Phân tích & Giải thích:\n• Phó từ mang tính khẩu ngữ 「びっくりした」 đồng nghĩa với động từ 「驚いた (おどろいた: kinh ngạc, giật mình)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Tôi đã bật cười thích thú\n- 2. Tôi cảm thấy rất khó xử\n- 3. Tôi đã nổi giận đùng đùng\n- 4. Tôi đã vô cùng kinh ngạc, giật mình (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(28) 4 句意: 听了那件事我吓了一跳。(びっくりした ≒ 驚いた)",
      "correctOption": 4
    },
    "29": {
      "snippet": "美しい ≒ きれい",
      "explanation": "🎯 Đáp án đúng: [1] 美しい ≒ きれい\n\n💬 Dịch nghĩa câu:\n\"Cô gái đang đứng ở đằng kia trông thật là xinh đẹp, thanh tú.\"\n\n💡 Phân tích & Giải thích:\n• Tính từ 「うつくしい (美しい: tươi đẹp, mỹ lệ)」 đồng nghĩa với 「きれい (đẹp đẽ, tao nhã)」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Người đó thật là xinh đẹp (ĐÚNG)\n- 2. Người đó rất dồi dào năng lượng\n- 3. Người đó rất thú vị khôi hài\n- 4. Người đó trông rất trẻ trung\n\n📄 Trích PDF gốc (试题解析):\n(29) 1 句意: 那个人很漂亮啊。(美しい ≒ きれい)",
      "correctOption": 1
    },
    "30": {
      "snippet": "輸入する ≒ 買う",
      "explanation": "🎯 Đáp án đúng: [3] 輸入する ≒ 買う\n\n💬 Dịch nghĩa câu:\n\"Quốc gia này hằng năm đều nhập khẩu một lượng lớn gạo từ các nước khác.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「輸入する (ゆにゅうする: nhập khẩu)」 đồng nghĩa với việc mua hàng hóa từ nước ngoài: 「外国から買う」.\n\n🔍 Phân tích các lựa chọn:\n- 1. Bán gạo ra thị trường nước ngoài\n- 2. Nhận viện trợ gạo từ nước ngoài\n- 3. Mua gạo từ các quốc gia khác (ĐÚNG)\n- 4. Gửi tặng gạo cho nước ngoài\n\n📄 Trích PDF gốc (试题解析):\n(30) 3 句意: 这个国家一直进口大米。(輸入する ≒ 買う)",
      "correctOption": 3
    },
    "31": {
      "snippet": "最近 (さいきん)",
      "explanation": "🎯 Đáp án đúng: [3] 最近 (さいきん)\n\n💬 Dịch nghĩa câu:\n\"Dạo gần đây nghe nói anh Kimura đã kết hôn rồi thì phải.\"\n\n💡 Phân tích & Giải thích:\n• Từ 「最近 (さいきん)」 biểu thị khoảng thời gian từ quá khứ gần đây kéo dài tới hiện tại.\n\n🔍 Phân tích các lựa chọn:\n- 1. さっき: Vừa mới ban nãy (sai vì dùng với vừa nấu xong)\n- 2. いま: Hiện tại ngay lúc này\n- 3. Anh Kimura dạo gần đây hình như đã lập gia đình (ĐÚNG)\n- 4. もうすぐ: Sắp sửa (dùng với tương lai)\n\n📄 Trích PDF gốc (试题解析):\n(31) 3 さいきん 意思是“最近, 近来”, 选项 3 为正确应用。",
      "correctOption": 3
    },
    "32": {
      "snippet": "音 (おと)",
      "explanation": "🎯 Đáp án đúng: [1] 音 (おと)\n\n💬 Dịch nghĩa câu:\n\"Âm thanh tiếng đài phát thanh đang to quá, xin bạn vui lòng vặn nhỏ lại một chút.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「音 (おと)」 dùng chỉ âm thanh phát ra từ máy móc, đồ vật, nhạc cụ.\n\n🔍 Phân tích các lựa chọn:\n- 1. Tiếng đài phát thanh to quá, hãy vặn nhỏ lại (ĐÚNG)\n- 2. Phát âm tiếng Nhật (phải dùng 発音 はつおん)\n- 3. Tiếng người gọi (phải dùng 声 こえ)\n- 4. Bài hát giai điệu (phải dùng 曲 きょく)\n\n📄 Trích PDF gốc (试题解析):\n(32) 1 おと 意思是“声音”, 选项 1 为正确应用。",
      "correctOption": 1
    },
    "33": {
      "snippet": "見学 (けんがく)",
      "explanation": "🎯 Đáp án đúng: [3] 見学 (けんがく)\n\n💬 Dịch nghĩa câu:\n\"Tôi cùng thầy giáo và các bạn học sinh đã đi tham quan học hỏi thực tế tại nhà máy.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「見学 (けんがく)」 nghĩa là đến quan sát, tham quan học hỏi thực tế ở nơi sản xuất, bảo tàng.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đi siêu thị mua sắm (phải dùng 買い物)\n- 2. Tra cứu từ điển (phải dùng 調べる)\n- 3. Đi tham quan học tập thực tế ở nhà máy (ĐÚNG)\n- 4. Xem tin tức thời sự (phải dùng 見る)\n\n📄 Trích PDF gốc (试题解析):\n(33) 3 けんがく 意思是“参观”, 选项 3 为正确应用。",
      "correctOption": 3
    },
    "34": {
      "snippet": "飾る (かざる)",
      "explanation": "🎯 Đáp án đúng: [2] 飾る (かざる)\n\n💬 Dịch nghĩa câu:\n\"Sắp sửa có khách quý ghé thăm nhà, chúng mình hãy trang trí thêm ít hoa tươi nhé.\"\n\n💡 Phân tích & Giải thích:\n• Động từ 「かざる (飾る)」: trang trí, bài trí đồ vật đẹp mắt trong không gian.\n\n🔍 Phân tích các lựa chọn:\n- 1. Dán thông báo lên bảng (phải dùng 貼る はる)\n- 2. Trang trí cắm hoa trong phòng đón khách (ĐÚNG)\n- 3. Treo quần áo phơi (phải dùng 掛ける かける)\n- 4. Lắp đặt điều hòa (phải dùng 付ける つける)\n\n📄 Trích PDF gốc (试题解析):\n(34) 2 かざる 意思是“装饰”, 选项 2 为正确应用。",
      "correctOption": 2
    },
    "35": {
      "snippet": "工事 (こうじ)",
      "explanation": "🎯 Đáp án đúng: [4] 工事 (こうじ)\n\n💬 Dịch nghĩa câu:\n\"Đoạn đường phía trước đang thi công công trình nên các phương tiện không thể lưu thông.\"\n\n💡 Phân tích & Giải thích:\n• Danh từ 「工事 (こうじ)」 dùng cho công trình xây dựng, sửa chữa cầu đường, nhà cửa.\n\n🔍 Phân tích các lựa chọn:\n- 1. Khám chữa răng sâu (phải dùng 治療 ちりょう)\n- 2. Khâu vá áo len (phải dùng 直す/繕う)\n- 3. Sửa chữa giá sách gãy (phải dùng 修理 しゅうり)\n- 4. Đoạn đường đang thi công công trình không thể đi qua (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(35) 4 こうじ 意思是“工程/施工”, 选项 4 为正确应用。",
      "correctOption": 4
    },
    "36": {
      "snippet": "20分で (Phạm vi thời gian)",
      "explanation": "🎯 Đáp án đúng: [3] 20分で (Phạm vi thời gian)\n\n💬 Dịch nghĩa câu:\n\"Hôm qua bài tập về nhà rất ít nên tôi chỉ mất vỏn vẹn 20 phút là làm xong hết.\"\n\n💡 Phân tích & Giải thích:\n• Trợ từ 「で」 đi sau lượng từ thời gian để chỉ hạn mức, phạm vi hoàn thành xong một hành động.\n\n🔍 Phân tích các lựa chọn:\n- 1. 20分に: Sai trợ từ chỉ mốc\n- 2. 20分を: Sai trợ từ bổ ngữ\n- 3. 20分で: ĐÚNG - Hoàn thành trong vòng 20 phút (ĐÚNG)\n- 4. 20分から: Chỉ điểm xuất phát\n\n📄 Trích PDF gốc (试题解析):\n(1) 3 句意: 昨天作业很少, 所以只用了20分钟就做完了。考察で表示时间范围的用法。",
      "correctOption": 3
    },
    "37": {
      "snippet": "人と (Cùng với đối tượng)",
      "explanation": "🎯 Đáp án đúng: [4] 人と (Cùng với đối tượng)\n\n💬 Dịch nghĩa câu:\n\"Cỗ máy robot thông minh thế hệ mới này có thể trực tiếp trò chuyện cùng với con người.\"\n\n💡 Phân tích & Giải thích:\n• Trợ từ 「と」 biểu thị đối tượng tương tác, cùng thực hiện hành động giao tiếp hai chiều: 人と対話する.\n\n🔍 Phân tích các lựa chọn:\n- 1. 人を: Sai trợ từ\n- 2. 人に: Chỉ tác động một chiều\n- 3. 人へ: Chỉ hướng\n- 4. 人と: ĐÚNG - Cùng trò chuyện với ai (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(2) 4 句意: 这台机器人可以和人进行对话。考察と表示一起做某动作的对象的用法。",
      "correctOption": 4
    },
    "38": {
      "snippet": "心配させた (Thể sai khiến 使役形)",
      "explanation": "🎯 Đáp án đúng: [2] 心配させた (Thể sai khiến 使役形)\n\n💬 Dịch nghĩa câu:\n\"Em trai tôi hồi còn nhỏ rất hay nghịch ngợm bị thương, khiến cho bố mẹ vô cùng lo lắng.\"\n\n💡 Phân tích & Giải thích:\n• Thể sai khiến 使役形: 「A は B を 心配させる」 biểu thị việc hành vi của A làm cho B cảm thấy lo lắng.\n\n🔍 Phân tích các lựa chọn:\n- 1. 心配した: Tự mình lo lắng (sai chủ ngữ)\n- 2. 心配させた: ĐÚNG - Khiến cho bố mẹ phải lo lắng (ĐÚNG)\n- 3. 心配された: Bị động (không phù hợp)\n- 4. 心配させられた: Bị sai khiến\n\n📄 Trích PDF gốc (试题解析):\n(3) 2 句意: 我弟弟小时候经常受伤, 让父母很担心。考察使役态的用法。",
      "correctOption": 2
    },
    "39": {
      "snippet": "8個も (Nhấn mạnh số lượng nhiều)",
      "explanation": "🎯 Đáp án đúng: [1] 8個も (Nhấn mạnh số lượng nhiều)\n\n💬 Dịch nghĩa câu:\n\"Bánh mì trong bữa sáng buffet ở khách sạn quá ngon nên tôi đã ăn tận 8 cái liền.\"\n\n💡 Phân tích & Giải thích:\n• Trợ từ 「も」 đi sau số từ nhấn mạnh số lượng lớn vượt mức bình thường, gây ngạc nhiên cho người nghe.\n\n🔍 Phân tích các lựa chọn:\n- 1. 8個も: ĐÚNG - Tận 8 cái, nhấn mạnh số lượng nhiều (ĐÚNG)\n- 2. 8個しか: Đi với phủ định\n- 3. 8個だけ: Chỉ duy nhất 8 cái (không hợp ngữ cảnh khen ngon)\n- 4. 8個でも: Cho dù 8 cái\n\n📄 Trích PDF gốc (试题解析):\n(4) 1 句意: 酒店早餐中的面包非常好吃, 所以我足足吃了八个。考察も表示数量多的用法。",
      "correctOption": 1
    },
    "40": {
      "snippet": "～によって (Bị động sáng tác / tác giả)",
      "explanation": "🎯 Đáp án đúng: [4] ～によって (Bị động sáng tác / tác giả)\n\n💬 Dịch nghĩa câu:\n\"Cuốn từ điển tiếng Nhật cổ này được biên soạn bởi một học giả người nước ngoài cách đây 150 năm.\"\n\n💡 Phân tích & Giải thích:\n• Trong câu bị động chỉ tác phẩm được sáng tạo, tác giả / người tạo ra được biểu thị bằng cụm 「～によって」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 外国人へ: Chỉ phương hướng\n- 2. 外国人と: Cùng với ai\n- 3. 外国人に: Bị động thông thường (bị làm phiền)\n- 4. 外国人によって: ĐÚNG - Được viết/biên soạn bởi tác giả (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(5) 4 句意: 这本日语词典是一位外国人在150年前编写的。考察によって表示创作者的用法。",
      "correctOption": 4
    },
    "41": {
      "snippet": "だれでも (Bất kỳ ai cũng...)",
      "explanation": "🎯 Đáp án đúng: [1] だれでも (Bất kỳ ai cũng...)\n\n💬 Dịch nghĩa câu:\n\"Bất kỳ ai cũng có thể tự do sử dụng sân vận động thành phố A, tuy nhiên cần đặt lịch trước.\"\n\n💡 Phân tích & Giải thích:\n• Từ nghi vấn 「だれ (ai)」 kết hợp trợ từ 「でも」 tạo thành đại từ phiếm chỉ: 「だれでも」 (bất cứ ai cũng).\n\n🔍 Phân tích các lựa chọn:\n- 1. だれでも: ĐÚNG - Bất kỳ ai cũng có thể (ĐÚNG)\n- 2. だれかに: Tới một ai đó\n- 3. だれかも: Không có dạng này\n- 4. だれかで: Bằng ai đó\n\n📄 Trích PDF gốc (试题解析):\n(6) 1 句意: 任何人都能使用A市的运动场, 但需要提前预约。考察でも前接疑问词表示全面肯定的用法。",
      "correctOption": 1
    },
    "42": {
      "snippet": "どうやって (Cách thức thực hiện)",
      "explanation": "🎯 Đáp án đúng: [3] どうやって (Cách thức thực hiện)\n\n💬 Dịch nghĩa câu:\n\"Maeda: 'Lee ơi bạn thường liên lạc với gia đình ở quê nhà bằng cách nào thế?' - Lee: 'Đa phần tôi gửi email.'\"\n\n💡 Phân tích & Giải thích:\n• Từ để hỏi 「どうやって」 dùng để hỏi về cách thức, quy trình, phương thức tiến hành của hành động.\n\n🔍 Phân tích các lựa chọn:\n- 1. どのぐらい: Bao nhiêu (lượng/thời gian)\n- 2. どこで: Ở đâu\n- 3. どうやって: ĐÚNG - Bằng cách nào, làm thế nào (ĐÚNG)\n- 4. どうして: Tại sao, vì lý do gì\n\n📄 Trích PDF gốc (试题解析):\n(7) 3 句意: 前田:“小李, 你一般怎样和国内的家人联系?” 考察疑问词どうやって询问方式。",
      "correctOption": 3
    },
    "43": {
      "snippet": "もうすぐ (Chẳng mấy chốc, sắp sửa)",
      "explanation": "🎯 Đáp án đúng: [4] もうすぐ (Chẳng mấy chốc, sắp sửa)\n\n💬 Dịch nghĩa câu:\n\"Con gái tôi tháng trước vừa tốt nghiệp cấp 3, sắp sửa tới đây sẽ bước vào lễ khai giảng đại học.\"\n\n💡 Phân tích & Giải thích:\n• Phó từ 「もうすぐ」 dùng diễn tả một sự kiện sắp sửa diễn ra trong tương lai rất gần.\n\n🔍 Phân tích các lựa chọn:\n- 1. だんだん: Dần dần, từng bước\n- 2. あまり: Không mấy (đi với phủ định)\n- 3. だいたい: Đại khái, nhìn chung\n- 4. もうすぐ: ĐÚNG - Sắp sửa, chẳng mấy chốc (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(8) 4 句意: 我女儿上个月从高中毕业了, 马上就要迎来大学的开学典礼。4. もうすぐ: 马上, 立刻",
      "correctOption": 4
    },
    "44": {
      "snippet": "なかなか～ない (Mãi mà không)",
      "explanation": "🎯 Đáp án đúng: [2] なかなか～ない (Mãi mà không)\n\n💬 Dịch nghĩa câu:\n\"Sáng nay chiếc xe buýt đi đến nhà ga mãi mà không thấy tới, sốt ruột quá nên tôi đã bắt taxi đi.\"\n\n💡 Phân tích & Giải thích:\n• Phó từ 「なかなか」 khi đi kèm với động từ chia thể phủ định mang ý nghĩa: 'mãi mà không thể...'.\n\n🔍 Phân tích các lựa chọn:\n- 1. やっと: Cuối cùng thì (đi với khẳng định)\n- 2. なかなか: ĐÚNG - Mãi mà vẫn chưa tới (なかなか来ない) (ĐÚNG)\n- 3. きっと: Chắc chắn sẽ\n- 4. いつか: Một ngày nào đó\n\n📄 Trích PDF gốc (试题解析):\n(9) 2 句意: 今早, 去车站的公交一直不来, 所以我坐出租车过去了。2. なかなか: 怎么也(不)",
      "correctOption": 2
    },
    "45": {
      "snippet": "～なら (Đưa ra điều kiện theo chủ đề)",
      "explanation": "🎯 Đáp án đúng: [4] ～なら (Đưa ra điều kiện theo chủ đề)\n\n💬 Dịch nghĩa câu:\n\"Yamashita: 'Mai hoặc ngày kia mình đi hát karaoke nhé?' - Minami: 'Hay đấy! Nhưng mai tớ bận, nếu là ngày kia thì OK.'\"\n\n💡 Phân tích & Giải thích:\n• Trợ từ 「なら」 tiếp nhận đề xuất ở vế trước để đưa ra điều kiện cụ thể: 「あさってなら大丈夫」 (Nếu là ngày kia thì được).\n\n🔍 Phân tích các lựa chọn:\n- 1. それに: Hơn nữa\n- 2. だから: Vì thế\n- 3. でも: Tuy nhiên\n- 4. なら: ĐÚNG - Nếu là (ngày kia) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(10) 4 句意: 山下:“小南, 明天或者后天去卡拉OK怎么样?” 小南:“后天的话没问题。” 考察なら表示假设条件。",
      "correctOption": 4
    },
    "46": {
      "snippet": "～の間に (Trong suốt khoảng thời gian)",
      "explanation": "🎯 Đáp án đúng: [3] ～の間に (Trong suốt khoảng thời gian)\n\n💬 Dịch nghĩa câu:\n\"Trong suốt khoảng thời gian kỳ nghỉ hè vừa qua, tôi đã liên tục đi làm thêm tại siêu thị.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「Danh từ + の間に」 biểu thị một hành động diễn ra trong suốt khoảng thời gian danh từ đó kéo dài.\n\n🔍 Phân tích các lựa chọn:\n- 1. 夏休みまでに: Trước khi kỳ nghỉ hè kết thúc\n- 2. 夏休みで: Tại kỳ nghỉ hè\n- 3. 夏休みの間に: ĐÚNG - Trong suốt kỳ nghỉ hè (ĐÚNG)\n- 4. 夏休みの前で: Trước kỳ nghỉ hè\n\n📄 Trích PDF gốc (试题解析):\n(11) 3 句意: 我暑假期间一直在超市打工。考察句型～の間に表示持续动作的期间。",
      "correctOption": 3
    },
    "47": {
      "snippet": "切るのに (Mục đích / tiêu tốn tài nguyên)",
      "explanation": "🎯 Đáp án đúng: [2] 切るのに (Mục đích / tiêu tốn tài nguyên)\n\n💬 Dịch nghĩa câu:\n\"Tuần trước tôi đã cắt tỉa cành cây trong vườn nhà, công việc đó đã tốn mất 2 tiếng đồng hồ.\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu 「V-る + のに (時間 / お金) がかかる」 biểu thị để làm được việc V thì tốn bao nhiêu thời gian hoặc tiền bạc.\n\n🔍 Phân tích các lựa chọn:\n- 1. 切るから: Vì cắt nên (chỉ nguyên nhân)\n- 2. 切るのに: ĐÚNG - Để làm việc cắt tỉa thì mất 2 tiếng (ĐÚNG)\n- 3. 切れば: Nếu cắt\n- 4. 切るなら: Nếu là cắt\n\n📄 Trích PDF gốc (试题解析):\n(12) 2 句意: 我上周给院子里的树剪了枝, 总共花了2个小时。考察句型～のに表示目的用途。",
      "correctOption": 2
    },
    "48": {
      "snippet": "～かもしれない (Có lẽ, có thể)",
      "explanation": "🎯 Đáp án đúng: [3] ～かもしれない (Có lẽ, có thể)\n\n💬 Dịch nghĩa câu:\n\"Kimura: 'Chiều mai đi tập bóng đá không?' - Yamada: 'Có chứ. Nhưng sáng có việc bận nên có lẽ sẽ đến muộn chút.'\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu 「Động từ thể thông thường + かもしれない」 dùng để đưa ra phỏng đoán có khả năng xảy ra (xác suất tầm 50%).\n\n🔍 Phân tích các lựa chọn:\n- 1. 遅れるはずです: Chắc chắn muộn (sai ngữ khí)\n- 2. 遅れそうです: Trông có vẻ sắp muộn\n- 3. 遅れるかもしれません: ĐÚNG - Có thể sẽ bị muộn (ĐÚNG)\n- 4. 遅れるつもりです: Định muộn (vô lý)\n\n📄 Trích PDF gốc (试题解析):\n(13) 3 句意: 木村:“明天下午去练足球吗?” 山田:“可能会迟到。” 考察句型～かもしれない表示推测。",
      "correctOption": 3
    },
    "49": {
      "snippet": "～そうだ (Sắp sửa, sắp có)",
      "explanation": "🎯 Đáp án đúng: [1] ～そうだ (Sắp sửa, sắp có)\n\n💬 Dịch nghĩa câu:\n\"Komori: 'Hết sạch chỗ ngồi rồi.' - Tanaka: 'À kìa, chiếc bàn đằng kia trông có vẻ như sắp sửa có người đứng dậy rời đi đấy.'\"\n\n💡 Phân tích & Giải thích:\n• Động từ nhóm 1 「あく (空く)」 bỏ masu + そうだ: 「空きそうだ」 diễn tả phỏng đoán hành động sắp sửa xảy ra theo quan sát trực quan.\n\n🔍 Phân tích các lựa chọn:\n- 1. 空きそうだ: ĐÚNG - Có vẻ sắp sửa trống chỗ (ĐÚNG)\n- 2. 空くだろう: Chắc là sẽ trống\n- 3. 空くようだ: Dường như trống\n- 4. 空からしい: Nghe nói trống\n\n📄 Trích PDF gốc (试题解析):\n(14) 1 句意: 那边的位子好像马上要空出来了。考察句型～そうだ表示根据所见做出的判断。",
      "correctOption": 1
    },
    "50": {
      "snippet": "てもらえますか (Nhờ vả lịch sự)",
      "explanation": "🎯 Đáp án đúng: [2] てもらえますか (Nhờ vả lịch sự)\n\n💬 Dịch nghĩa câu:\n\"Trong phòng họp ánh sáng hơi chói, nhờ đồng nghiệp tắt bớt bóng đèn: 'Bạn có thể tắt giúp tôi chiếc đèn được không?'\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「V-て + もらえますか」 là mẫu câu nhờ vả lịch sự đồng nghiệp hoặc người ngang hàng giúp đỡ mình.\n\n🔍 Phân tích các lựa chọn:\n- 1. 消してあげますか: Tôi tắt cho bạn nhé (sai chủ ngữ)\n- 2. 消してもらえますか: ĐÚNG - Bạn có thể tắt giúp tôi được không? (ĐÚNG)\n- 3. 消させてもらいますか: Cho phép tôi tắt\n- 4. 消滅します: Biến mất (sai từ vựng)\n\n📄 Trích PDF gốc (试题解析):\n(15) 2 句意: 会议室中请求对方关灯。考察～てもらえますか表示客气请求。",
      "correctOption": 2
    },
    "51": {
      "snippet": "Dấu sao: きっさてんは (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [3] Dấu sao: きっさてんは (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Quán cà phê mới mở tại vị trí tiệm hoa tháng trước có món bánh táo cực kỳ ngon.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 先月まで 花屋が あった 【4 場所に】 【1 できた】 ★【3 きっさてんは】 【2 りんごの】 ケーキが、おいしい。 Dấu sao ở vị trí thứ 3 là phương án 3.\n\n🔍 Phân tích các lựa chọn:\n- 1. できた\n- 2. りんごの\n- 3. きっさてんは (ĐÚNG vị trí dấu sao ★) (ĐÚNG)\n- 4. 場所に\n\n📄 Trích PDF gốc (试题解析):\n(16) 3 正确语序: 先月まで 花屋が あった 4 場所に 1 できた ★3 きっさてんは 2 りんごの ケーキが、おいしい。",
      "correctOption": 3
    },
    "52": {
      "snippet": "Dấu sao: 置いた (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [2] Dấu sao: 置いた (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Tối qua sau khi về đến nhà, tôi chẳng thể nhớ nổi là mình đã đặt chiếc chìa khóa ở chỗ nào nữa.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 昨日の 夜 家に 帰ってから、かぎを 【1 どこ】 【3 に】 ★【2 置いた】 【4 か】 覚えて いません。 Dấu sao ở vị trí thứ 3 là phương án 2.\n\n🔍 Phân tích các lựa chọn:\n- 1. どこ\n- 2. 置いた (ĐÚNG vị trí dấu sao ★) (ĐÚNG)\n- 3. に\n- 4. か\n\n📄 Trích PDF gốc (试题解析):\n(17) 2 正确语序: 昨日の 夜 家に 帰ってから、かぎを 1 どこ 3 に ★2 置いた 4 か 覚えて いません。",
      "correctOption": 2
    },
    "53": {
      "snippet": "Dấu sao: 最近 (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [1] Dấu sao: 最近 (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Tôi rất thích chơi đàn piano, tuy nhiên dạo gần đây do bận bịu quá nên không còn thời gian để luyện đàn.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 私は ピアノを 【1 ひくのが】 【4 好きですが】 ★【3 最近】 【2 いそがしくて】 ひく 時間が ありません。 Dấu sao ở vị trí thứ 3 là phương án 3.\n\n🔍 Phân tích các lựa chọn:\n- 1. ひくのが (ĐÚNG)\n- 2. いそがしくて\n- 3. 最近 (ĐÚNG vị trí dấu sao ★)\n- 4. 好きですが\n\n📄 Trích PDF gốc (试题解析):\n(18) 3 正确语序: 私は ピアノを 1 ひくのが 4 好きですが ★3 最近 2 いそがしくて ひく 時間が ありません。",
      "correctOption": 1
    },
    "54": {
      "snippet": "Dấu sao: 大切に (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [1] Dấu sao: 大切に (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Chiếc máy ảnh mà ông nội tặng nhân dịp sinh nhật tuổi 20, tôi vẫn luôn trân trọng giữ gìn và sử dụng cẩn thận.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 私は 20さいの たんじょうびに そふが 【2 くれた】 【4 カメラを】 ★【1 大切に】 【3 使って】 います。 Dấu sao ở vị trí thứ 3 là phương án 1.\n\n🔍 Phân tích các lựa chọn:\n- 1. 大切に (ĐÚNG vị trí dấu sao ★) (ĐÚNG)\n- 2. くれた\n- 3. 使って\n- 4. カメラを\n\n📄 Trích PDF gốc (试题解析):\n(19) 1 正确语序: 私は 20さいの たんじょうびに そふが 2 くれた 4 カメラを ★1 大切に 3 使って います。",
      "correctOption": 1
    },
    "55": {
      "snippet": "Dấu sao: ので (Vị trí 3)",
      "explanation": "🎯 Đáp án đúng: [3] Dấu sao: ので (Vị trí 3)\n\n💬 Dịch nghĩa câu:\n\"Trận đấu bóng chày đấy à? Hay quá! Vì tôi chưa từng được đi xem trực tiếp bao giờ nên nhất định rất muốn đi.\"\n\n💡 Phân tích & Giải thích:\n• Trật tự câu hoàn chỉnh: 野球の 試合ですか。 いいですね。 【3 見に行った】 【2 ことが ない】 ★【4 ので】 【1 ぜひ】 行きたいです。 Dấu sao ở vị trí thứ 3 là phương án 4.\n\n🔍 Phân tích các lựa chọn:\n- 1. ぜひ\n- 2. ことが ない\n- 3. 見に行った (ĐÚNG)\n- 4. ので (ĐÚNG vị trí dấu sao ★)\n\n📄 Trích PDF gốc (试题解析):\n(20) 4 正确语序: 野球の 試合ですか。 いいですね。 3 見に行った 2 ことが ない ★4 ので 1 ぜひ 行きたいです。",
      "correctOption": 3
    },
    "56": {
      "snippet": "Liên từ nối đoạn văn",
      "explanation": "🎯 Đáp án đúng: [1] Liên từ nối đoạn văn\n\n💬 Dịch nghĩa câu:\n\"Nối kết mạch câu giữa hai vế câu tường thuật về trải nghiệm học bơi lội mùa hè của tác giả.\"\n\n💡 Phân tích & Giải thích:\n• Căn cứ vào liên kết mạch văn đoạn văn, liên từ ở phương án [3] tạo sự chuyển tiếp tự nhiên nhất.\n\n🔍 Phân tích các lựa chọn:\n- 1. Liên từ gây nhiễu 1 (ĐÚNG)\n- 2. Liên từ gây nhiễu 2\n- 3. Phương án chính xác liên kết ngữ nghĩa\n- 4. Liên từ gây nhiễu 4\n\n📄 Trích PDF gốc (试题解析):\n(21) 3 考察上下文连贯性, 选项3最符合文意。",
      "correctOption": 1
    },
    "57": {
      "snippet": "Trợ từ đối chiếu は",
      "explanation": "🎯 Đáp án đúng: [2] Trợ từ đối chiếu は\n\n💬 Dịch nghĩa câu:\n\"Bạn bè xung quanh ai cũng bơi lội giỏi, trái lại bản thân tôi thì lại chẳng hề biết bơi.\"\n\n💡 Phân tích & Giải thích:\n• Trợ từ 「は」 đứng ở vị trí này mang vai trò biểu thị sự đối chiếu, tương phản rõ rệt giữa bạn bè và bản thân tôi.\n\n🔍 Phân tích các lựa chọn:\n- 1. Trợ từ を\n- 2. Trợ từ は (ĐÚNG - Đối chiếu tương phản) (ĐÚNG)\n- 3. Trợ từ に\n- 4. Trợ từ で\n\n📄 Trích PDF gốc (试题解析):\n(22) 2 朋友会游泳, 而我不会, 前后形成对比, 用は提示, 强调这种对比。",
      "correctOption": 2
    },
    "58": {
      "snippet": "～てもらった (Nhận sự giúp đỡ)",
      "explanation": "🎯 Đáp án đúng: [4] ～てもらった (Nhận sự giúp đỡ)\n\n💬 Dịch nghĩa câu:\n\"Nhờ được bạn bè kiên nhẫn nhiệt tình chỉ dạy cho từng động tác, tôi đã dần tiến bộ.\"\n\n💡 Phân tích & Giải thích:\n• Chủ ngữ 'tôi' là người nhận được hành động dạy bơi từ người khác, nên phải dùng dạng nhận ơn 「教えてもらった」.\n\n🔍 Phân tích các lựa chọn:\n- 1. 教えてあげた: Dạy cho bạn (sai hướng hành động)\n- 2. 教えてくれた: Bạn dạy (cần chủ ngữ là bạn)\n- 3. 教えた: Tự dạy\n- 4. 教えてもらった: ĐÚNG - Được bạn bè dạy giúp (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(23) 4 朋友教我游泳, 我是获得帮助的一方, 需用表示从他人处得到帮助的てもらった。",
      "correctOption": 4
    },
    "59": {
      "snippet": "泳げるようになった (Trở nên biết bơi)",
      "explanation": "🎯 Đáp án đúng: [4] 泳げるようになった (Trở nên biết bơi)\n\n💬 Dịch nghĩa câu:\n\"Sau bao ngày nỗ lực tập luyện chăm chỉ, cuối cùng tôi cũng đã trở nên biết bơi thành thạo.\"\n\n💡 Phân tích & Giải thích:\n• Cấu trúc 「Động từ thể khả năng + ようになる」 diễn tả một năng lực hay thói quen mới được hình thành qua thời gian.\n\n🔍 Phân tích các lựa chọn:\n- 1. 泳ぐことになった: Được quyết định là bơi\n- 2. 泳ぐようになった: Tập bơi\n- 3. 泳げないようになった: Thành ra không bơi được\n- 4. 泳げるようになった: ĐÚNG - Đã có thể bơi được (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(24) 4 通过不断练习学会了游泳, 表示会游泳需用动词可能形+ようになった。",
      "correctOption": 4
    },
    "60": {
      "snippet": "～たい (Thể hiện ý chí, mong muốn)",
      "explanation": "🎯 Đáp án đúng: [1] ～たい (Thể hiện ý chí, mong muốn)\n\n💬 Dịch nghĩa câu:\n\"Tôi cảm thấy môn bơi lội vô cùng thú vị và mong muốn sẽ tiếp tục luyện tập nhiều hơn trước chuyến đi biển tới.\"\n\n💡 Phân tích & Giải thích:\n• Động từ đuôi 「～たい」 diễn tả nguyện vọng, ý muốn chủ quan tha thiết của chính người viết.\n\n🔍 Phân tích các lựa chọn:\n- 1. 練習したい: ĐÚNG - Muốn luyện tập nhiều hơn (ĐÚNG)\n- 2. 練習したがる: Người thứ 3 muốn\n- 3. 練習するつもりだ: Đã lên kế hoạch\n- 4. 練習しなければならない: Bắt buộc phải\n\n📄 Trích PDF gốc (试题解析):\n(25) 1 作者十分喜欢游泳, 决心下次去海边之前勤加练习, 用たい表示个人的意志想法。",
      "correctOption": 1
    },
    "61": {
      "snippet": "Thủ tục nhận lại đồ thất lạc",
      "explanation": "🎯 Đáp án đúng: [2] Thủ tục nhận lại đồ thất lạc\n\n💬 Dịch nghĩa câu:\n\"Thí sinh muốn nhận lại đồ thất lạc trong kỳ thi cần phải mang theo thẻ học sinh đến văn phòng quản lý.\"\n\n💡 Phân tích & Giải thích:\n• Theo thông báo trong bài đọc, người đến nhận lại đồ bị mất bắt buộc phải xuất trình thẻ sinh viên (学生証).\n\n🔍 Phân tích các lựa chọn:\n- 1. Đến phòng thi tìm kiếm\n- 2. Đến phòng văn phòng trình thẻ học sinh để nhận lại (ĐÚNG)\n- 3. Nhờ bạn học đến nhận hộ\n- 4. Chờ gửi bưu điện về nhà\n\n📄 Trích PDF gốc (试题解析):\n(26) 2 想在考试期间取失物的人, 必须出示学生证并前往办公室办理。",
      "correctOption": 2
    },
    "62": {
      "snippet": "Sở thích của người viết",
      "explanation": "🎯 Đáp án đúng: [4] Sở thích của người viết\n\n💬 Dịch nghĩa câu:\n\"Sở thích thực sự của người viết là được thong thả đi dạo và chụp lại những bức ảnh phong cảnh bốn mùa.\"\n\n💡 Phân tích & Giải thích:\n• Nội dung đoạn văn nêu rõ: mỗi khi rảnh rỗi tôi đều cầm máy ảnh đi dạo và ghi lại cảnh sắc xung quanh.\n\n🔍 Phân tích các lựa chọn:\n- 1. Sưu tầm tranh ảnh cổ\n- 2. Lái xe đi xa\n- 3. Đi dạo bộ và chụp ảnh phong cảnh thiên nhiên\n- 4. Đọc tiểu thuyết trong phòng (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(27) 3 作者的兴趣是一边散步一边拍摄四季的风光照片。",
      "correctOption": 4
    },
    "63": {
      "snippet": "Thông báo của ông Takada gửi ông Hayashi",
      "explanation": "🎯 Đáp án đúng: [2] Thông báo của ông Takada gửi ông Hayashi\n\n💬 Dịch nghĩa câu:\n\"Ông Takada cần phải nhắn cho ông Hayashi biết về sự thay đổi địa điểm và thời gian bắt đầu cuộc họp.\"\n\n💡 Phân tích & Giải thích:\n• Mẩu ghi chú nhắn nhủ: phòng họp ban đầu đã kín lịch nên địa điểm chuyển sang phòng họp tầng 3 lúc 2h30.\n\n🔍 Phân tích các lựa chọn:\n- 1. Hủy bỏ cuộc họp hôm nay\n- 2. Chuẩn bị thêm tài liệu phát tay (ĐÚNG)\n- 3. Mời thêm khách tham dự\n- 4. Thông báo thời gian và địa điểm mới của phòng họp\n\n📄 Trích PDF gốc (试题解析):\n(28) 4 高田先生必须通知林先生关于会议时间和地点的变更。",
      "correctOption": 2
    },
    "64": {
      "snippet": "Lý do mua cục tẩy màu đen",
      "explanation": "🎯 Đáp án đúng: [1] Lý do mua cục tẩy màu đen\n\n💬 Dịch nghĩa câu:\n\"Người viết mua cục tẩy màu đen là vì khi sử dụng tẩy đen sẽ không để lộ vết bẩn lem luốc như cục tẩy trắng thông thường.\"\n\n💡 Phân tích & Giải thích:\n• Trong bài nêu rõ: cục tẩy màu trắng dùng một thời gian hay dính chì đen trông bẩn, nên đổi sang dùng tẩy màu đen.\n\n🔍 Phân tích các lựa chọn:\n- 1. Tẩy màu đen không bị lộ vết chì bẩn trên thân tẩy (ĐÚNG)\n- 2. Tẩy màu đen giá rẻ hơn\n- 3. Được bạn bè tặng\n- 4. Tẩy đen làm bằng chất liệu đặc biệt xóa sạch hơn\n\n📄 Trích PDF gốc (试题解析):\n(29) 1 我之所以买黑色橡皮擦, 是因为用久了也不会显得脏。",
      "correctOption": 1
    },
    "65": {
      "snippet": "Tâm trạng khó xử ở đoạn [30]",
      "explanation": "🎯 Đáp án đúng: [4] Tâm trạng khó xử ở đoạn [30]\n\n💬 Dịch nghĩa câu:\n\"Tác giả cảm thấy lúng túng băn khoăn vì bất chợt gặp người quen cũ nhưng trong phút chốc lại không thể nhớ nổi tên.\"\n\n💡 Phân tích & Giải thích:\n• Tình huống trong bài: người phụ nữ chào hỏi rất thân thiết nhưng tác giả nhất thời quên mất tên họ của bạn.\n\n🔍 Phân tích các lựa chọn:\n- 1. Vì làm mất ví tiền\n- 2. Vì không nhớ ngay ra tên của người đang chào mình\n- 3. Vì đến trễ giờ hẹn\n- 4. Vì làm đổ đồ uống (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(30) 2 为什么想着“该怎么办呢”: 因为一时没能想起对方的名字。",
      "correctOption": 4
    },
    "66": {
      "snippet": "Lý do cô Yamada chào tác giả",
      "explanation": "🎯 Đáp án đúng: [2] Lý do cô Yamada chào tác giả\n\n💬 Dịch nghĩa câu:\n\"Cô Yamada chủ động chào tác giả vì nhận ra tác giả là người bạn thân từng học chung câu lạc bộ thời cấp 2.\"\n\n💡 Phân tích & Giải thích:\n• Chi tiết trong bài: cô Yamada nhận ra bạn cùng sinh hoạt trong câu lạc bộ bóng bàn thời trường trung học.\n\n🔍 Phân tích các lựa chọn:\n- 1. Nhận nhầm người lạ\n- 2. Muốn nhờ hỏi đường (ĐÚNG)\n- 3. Nhận ra người bạn cùng câu lạc bộ thời trung học\n- 4. Gặp lại đối tác công việc\n\n📄 Trích PDF gốc (试题解析):\n(31) 3 山田小姐和作者打招呼的原因: 认出了是初中同俱乐部的老同学。",
      "correctOption": 2
    },
    "67": {
      "snippet": "Hành động cảm ơn ở đoạn [32]",
      "explanation": "🎯 Đáp án đúng: [2] Hành động cảm ơn ở đoạn [32]\n\n💬 Dịch nghĩa câu:\n\"Tác giả cảm thấy biết ơn và muốn cảm ơn vì cô Yamada đã tinh tế nhắc lại tên mình giúp giải tỏa sự bối rối.\"\n\n💡 Phân tích & Giải thích:\n• Nhờ câu chuyện nhắc khéo của bạn mà tác giả nhớ lại toàn bộ ký ức và không còn bị ngượng ngùng.\n\n🔍 Phân tích các lựa chọn:\n- 1. Cảm ơn vì đối phương đã nhắc lại kỷ niệm và giải tỏa ngượng ngùng\n- 2. Cảm ơn vì được mời ăn (ĐÚNG)\n- 3. Cảm ơn vì được cho tiền\n- 4. Cảm ơn vì được đưa về nhà\n\n📄 Trích PDF gốc (试题解析):\n(32) 1 为什么要道谢: 感谢对方巧妙化解了忘记名字的尴尬。",
      "correctOption": 2
    },
    "68": {
      "snippet": "Câu kết thúc đoạn văn phù hợp nhất",
      "explanation": "🎯 Đáp án đúng: [1] Câu kết thúc đoạn văn phù hợp nhất\n\n💬 Dịch nghĩa câu:\n\"Phương án 3 thể hiện cảm xúc vui mừng khôn xiết khi có một cuộc hội ngộ tình cờ đầy ý nghĩa với bạn cũ.\"\n\n💡 Phân tích & Giải thích:\n• Câu kết đúc kết lại niềm hân hoan khi tình cờ gặp lại người bạn xưa sau bao năm xa cách.\n\n🔍 Phân tích các lựa chọn:\n- 1. Lần sau tôi sẽ cẩn thận hơn (ĐÚNG)\n- 2. Từ nay tôi không đi tàu điện nữa\n- 3. Thật là một cuộc gặp gỡ tình cờ đầy vui vẻ và đáng nhớ\n- 4. Tôi cảm thấy vô cùng tiếc nuối\n\n📄 Trích PDF gốc (试题解析):\n(33) 3 下列哪一项最适合填入结尾: 表达了重逢老友的喜悦之情。",
      "correctOption": 1
    },
    "69": {
      "snippet": "Lựa chọn của James và Maria (Khóa số 2)",
      "explanation": "🎯 Đáp án đúng: [4] Lựa chọn của James và Maria (Khóa số 2)\n\n💬 Dịch nghĩa câu:\n\"James và Maria muốn đi vào tháng 4 và vừa ăn trưa vừa nghe hòa nhạc trong nhà hàng, nên khóa 2 là lựa chọn duy nhất đáp ứng đủ.\"\n\n💡 Phân tích & Giải thích:\n• Đối chiếu bảng thông báo hoạt động 'Tận hưởng mùa xuân': Khóa 2 tổ chức vào tháng 4 và có bữa trưa kèm nghe nhạc trong tiệm.\n\n🔍 Phân tích các lựa chọn:\n- 1. Khóa số 1 (Không có hòa nhạc)\n- 2. Khóa số 2 (ĐÚNG - Tháng 4, ăn trưa nghe nhạc trong quán)\n- 3. Khóa số 3 (Tổ chức vào tháng 5)\n- 4. Khóa số 4 (Không có ăn trưa) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n(34) 2 詹姆斯和玛利亚想在4月去并在店内听音乐吃午餐, 应选择2号活动。",
      "correctOption": 4
    },
    "70": {
      "snippet": "Lựa chọn của Gina (Khóa số 1)",
      "explanation": "🎯 Đáp án đúng: [1] Lựa chọn của Gina (Khóa số 1)\n\n💬 Dịch nghĩa câu:\n\"Gina muốn tham gia hoạt động vào thứ Bảy, thời gian tập trung sau 13:00 và chi phí dưới 1.000 yên, nên khóa 1 thỏa mãn trọn vẹn.\"\n\n💡 Phân tích & Giải thích:\n• Khóa 1 diễn ra vào thứ Bảy, giờ tập trung là 13:30 (sau 13:00) và chi phí tham gia là 800 yên (dưới 1000 yên).\n\n🔍 Phân tích các lựa chọn:\n- 1. Khóa số 1 (ĐÚNG - Thứ 7, tập trung 13h30, chi phí 800 yên) (ĐÚNG)\n- 2. Khóa số 2 (Tập trung buổi sáng 10h)\n- 3. Khóa số 3 (Chi phí 1500 yên vượt mức)\n- 4. Khóa số 4 (Tập trung trước 12h)\n\n📄 Trích PDF gốc (试题解析):\n(35) 1 吉娜想周六参加、集合不早于13点且费用低于1000日元, 只有1号符合。",
      "correctOption": 1
    },
    "71": {
      "snippet": "Gói sách tranh ở tiệm sách",
      "explanation": "🎯 Đáp án đúng: [1] Gói sách tranh ở tiệm sách\n\n💬 Dịch nghĩa câu:\n\"Người bán hàng dùng giấy bọc in hình tàu thuyền và dải ruy-băng mảnh nhỏ để gói món quà.\"\n\n💡 Phân tích & Giải thích:\n• Theo đối thoại: người phụ nữ yêu cầu giấy bọc hình tàu thuyền (船の絵) và chọn ruy-băng bản nhỏ (細いリボン).\n\n🔍 Phân tích các lựa chọn:\n- 1. Giấy hoa và ruy-băng to (ĐÚNG)\n- 2. Giấy tàu thuyền và ruy-băng bản nhỏ (ĐÚNG)\n- 3. Giấy hoa và ruy-băng nhỏ\n- 4. Giấy tàu thuyền không gắn ruy-băng\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (1): 店の人は何を使って絵本を包みますか。 正解: [2]",
      "audioScriptJa": "男：はい、包む紙は二種類あります。こちらの船の絵と花の絵とどちらがいいでしょうか。\n女：船の絵がいいです。リボンもつけてください。細いのにします。",
      "audioScriptVi": "Nam: Vâng, giấy bọc có hai loại. Tranh thuyền và tranh hoa này thì chị chọn loại nào ạ?\nNữ: Tôi lấy tranh thuyền nhé. Cả ruy-băng nữa, cho tôi loại bản mảnh nhé.",
      "correctOption": 1
    },
    "72": {
      "snippet": "Hạn trả sách cho cô giáo",
      "explanation": "🎯 Đáp án đúng: [3] Hạn trả sách cho cô giáo\n\n💬 Dịch nghĩa câu:\n\"Nam sinh phải nộp trả lại cuốn sách trước ngày thứ Tư (ngày 21) trước hôm cô nghỉ.\"\n\n💡 Phân tích & Giải thích:\n• Cô giáo dặn cần sách cho tiết học ngày 23, ban đầu bảo trả trước một ngày (thứ Năm), nhưng vì thứ Năm cô không đến trường nên chốt trả vào thứ Tư ngày 21.\n\n🔍 Phân tích các lựa chọn:\n- 1. Thứ Sáu ngày 23\n- 2. Thứ Năm ngày 22\n- 3. Thứ Tư ngày 21 (ĐÚNG) (ĐÚNG)\n- 4. Thứ Ba ngày 20\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (2): 男の学生はいつまでに本を返さなければなりませんか。 正解: [3]",
      "audioScriptJa": "女：あ、すみません。再来週の木曜日は学校に来ませんから、その前の日までにお願いします。\n男：はい、わかりました。",
      "audioScriptVi": "Nữ: A xin lỗi em. Thứ Năm tuần sau nữa cô không đến trường, nên em nộp trước ngày đó một hôm giúp cô nhé.\nNam: Vâng, em hiểu rồi ạ.",
      "correctOption": 3
    },
    "73": {
      "snippet": "Đồ cần mang đến trường tiểu học",
      "explanation": "🎯 Đáp án đúng: [2] Đồ cần mang đến trường tiểu học\n\n💬 Dịch nghĩa câu:\n\"Các bạn lưu học sinh cần mang theo dép đi trong nhà (dép lê) và ảnh chụp về đất nước mình.\"\n\n💡 Phân tích & Giải thích:\n• Thầy giáo thông báo giấy gấp origami trường tiểu học có sẵn, bữa trưa trường chuẩn bị, chỉ cần mang ảnh (写真) và dép đi trong nhà (スリッパ).\n\n🔍 Phân tích các lựa chọn:\n- 1. Dép lê và ảnh chụp (ĐÚNG)\n- 2. Dép lê và giấy gấp origami (ĐÚNG)\n- 3. Ảnh chụp và cơm trưa bento\n- 4. Giấy gấp origami và cơm trưa\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (3): 留学生は小学校に何を持って行かなければなりませんか。 正解: [1]",
      "audioScriptJa": "男：写真を忘れないようにしてください。それから、靴をぬがなければなりませんから、スリッパを持っていってください。",
      "audioScriptVi": "Nam: Các em nhớ đừng quên ảnh nhé. Thêm nữa, khi vào trường phải cởi giày nên các em hãy mang theo dép đi trong nhà nhé.",
      "correctOption": 2
    },
    "74": {
      "snippet": "Thông tin nam sinh cần điền vào giấy",
      "explanation": "🎯 Đáp án đúng: [4] Thông tin nam sinh cần điền vào giấy\n\n💬 Dịch nghĩa câu:\n\"Bạn nam chỉ cần điền họ tên và địa chỉ cư trú mới vào tờ phiếu.\"\n\n💡 Phân tích & Giải thích:\n• Bạn nam nói số điện thoại không đổi, và tuần sau sẽ đổi lớp nên cô nhân viên dặn chỉ cần viết tên và địa chỉ mới (名前と新しい住所).\n\n🔍 Phân tích các lựa chọn:\n- 1. Tên, địa chỉ mới và số điện thoại\n- 2. Tên và địa chỉ mới (ĐÚNG)\n- 3. Tên và tên lớp học mới\n- 4. Chỉ viết địa chỉ mới (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (4): 男の学生は何を書きますか。 正解: [2]",
      "audioScriptJa": "女：じゃあ、電話番号はいいです。クラスも来週変わりますから、書かないでください。名前と新しい住所を書いてください。",
      "audioScriptVi": "Nữ: Vậy thì số điện thoại không cần ghi. Lớp tuần sau đổi nên cũng đừng ghi nhé. Em chỉ cần viết họ tên và địa chỉ mới thôi.",
      "correctOption": 4
    },
    "75": {
      "snippet": "Địa điểm người nữ đến lấy tài liệu",
      "explanation": "🎯 Đáp án đúng: [3] Địa điểm người nữ đến lấy tài liệu\n\n💬 Dịch nghĩa câu:\n\"Người phụ nữ sẽ đến phòng họp số 2 (第2会議室) để mang tài liệu đến cuộc họp.\"\n\n💡 Phân tích & Giải thích:\n• Theo chỉ dẫn qua điện thoại: tập tài liệu để ở phòng họp số 2, hãy qua đó lấy mang sang phòng hội nghị chính.\n\n🔍 Phân tích các lựa chọn:\n- 1. Phòng làm việc\n- 2. Phòng in ấn\n- 3. Phòng họp số 1 (ĐÚNG)\n- 4. Phòng họp số 2 (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (5): 女の人はどこから資料を持って行きますか。 正解: [4]",
      "audioScriptJa": "男：第2会議室の机の上に置いてある資料を持ってきてくれる？\n女：わかりました。すぐ行きます。",
      "audioScriptVi": "Nam: Em mang giúp anh tập tài liệu đang để trên bàn ở phòng họp số 2 qua đây được không?\nNữ: Vâng, em làm ngay đây ạ.",
      "correctOption": 3
    },
    "76": {
      "snippet": "Công việc nhân viên cần làm tiếp theo",
      "explanation": "🎯 Đáp án đúng: [3] Công việc nhân viên cần làm tiếp theo\n\n💬 Dịch nghĩa câu:\n\"Nhân viên quán trước khi hết ca cần lau dọn sạch cửa sổ và đem rác ra điểm tập kết vứt.\"\n\n💡 Phân tích & Giải thích:\n• Chủ quán nhắc nhở sàn nhà đã sạch rồi, tiếp theo hãy lau kính cửa sổ và vứt rác.\n\n🔍 Phân tích các lựa chọn:\n- 1. Quét dọn sàn nhà\n- 2. Lau cửa kính và vứt rác (ĐÚNG)\n- 3. Kiểm kê sổ sách tiền mặt (ĐÚNG)\n- 4. Xếp lại bàn ghế trong quán\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (6): 店員はこれから何をしなければなりませんか。 正解: [2]",
      "audioScriptJa": "男：床は綺麗になったから、窓を拭いて、ゴミを捨ててきてね。\n女：はい、すぐやります。",
      "audioScriptVi": "Nam: Sàn nhà sạch rồi, em lau cửa sổ rồi mang rác đi vứt giúp anh nhé.\nNữ: Vâng, em làm ngay ạ.",
      "correctOption": 3
    },
    "77": {
      "snippet": "Nhiệm vụ chuẩn bị cuộc họp",
      "explanation": "🎯 Đáp án đúng: [3] Nhiệm vụ chuẩn bị cuộc họp\n\n💬 Dịch nghĩa câu:\n\"Nhân viên nữ sẽ tiến hành đi photo in ấn thêm tài liệu phát tay cho cuộc họp.\"\n\n💡 Phân tích & Giải thích:\n• Sau khi thống nhất số lượng khách tăng thêm 3 người, người nữ nhận việc đi in bổ sung tài liệu.\n\n🔍 Phân tích các lựa chọn:\n- 1. Chuẩn bị nước trà\n- 2. Kê thêm bàn ghế\n- 3. Đi photo in thêm tài liệu họp (ĐÚNG) (ĐÚNG)\n- 4. Viết bảng thông báo\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (7): 女の人はまず何をしますか。 正解: [3]",
      "audioScriptJa": "女：参加者が3人増えたんですね。じゃあ、まず資料を3部コピーしてきます。\n男：うん、頼むよ。",
      "audioScriptVi": "Nữ: Số người tham gia tăng thêm 3 người rồi nhỉ. Vậy trước tiên em sẽ đi in thêm 3 bộ tài liệu nhé.\nNam: Ừ, nhờ em nhé.",
      "correctOption": 3
    },
    "78": {
      "snippet": "Cách mua vé tàu của hai người",
      "explanation": "🎯 Đáp án đúng: [1] Cách mua vé tàu của hai người\n\n💬 Dịch nghĩa câu:\n\"Hai người thống nhất sẽ đến quầy vé có nhân viên phục vụ để mua vé trực tiếp.\"\n\n💡 Phân tích & Giải thích:\n• Máy bán vé tự động xếp hàng quá đông, người nữ đề xuất ra thẳng quầy vé (窓口) để mua cho nhanh.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đến mua tại quầy vé có nhân viên (ĐÚNG) (ĐÚNG)\n- 2. Xếp hàng mua ở máy bán vé tự động\n- 3. Đặt vé qua mạng internet\n- 4. Lên tàu rồi mua vé sau\n\n📄 Trích PDF gốc (试题解析):\n聴解 1 (8): 二人は切符をどうやって買いますか。 正解: [1]",
      "audioScriptJa": "女：券売機がすごく並んでいるから、あっちの窓口で買おうよ。\n男：そうだね、窓口に行こう。",
      "audioScriptVi": "Nữ: Máy bán vé đông người xếp hàng quá, mình qua quầy vé đằng kia mua đi!\nNam: Ừ, qua quầy vé thôi.",
      "correctOption": 1
    },
    "79": {
      "snippet": "Chỗ để quên chìa khóa",
      "explanation": "🎯 Đáp án đúng: [1] Chỗ để quên chìa khóa\n\n💬 Dịch nghĩa câu:\n\"Bạn nam đã để quên chìa khóa ở ngay trên ổ khóa chiếc xe đạp dưới bãi xe.\"\n\n💡 Phân tích & Giải thích:\n• Bạn nam kiểm tra túi và nhớ ra lúc nãy vội vào lớp nên quên rút chìa khóa khỏi xe đạp ở bãi đỗ xe.\n\n🔍 Phân tích các lựa chọn:\n- 1. Trong túi áo khoác (ĐÚNG)\n- 2. Trên bàn học lớp học\n- 3. Cắm nguyên trên ổ khóa xe đạp ngoài bãi xe (ĐÚNG)\n- 4. Tại tiệm cà phê\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (1): 男の人はどこに鍵を忘れましたか。 正解: [3]",
      "audioScriptJa": "男：あっ、自転車のカギを抜くのを忘れて、そのまま置いてきちゃった！",
      "audioScriptVi": "Nam: Á, mình quên không rút chìa khóa xe đạp ra mà cứ thế để luôn ở bãi xe rồi!",
      "correctOption": 1
    },
    "80": {
      "snippet": "Ưu điểm lớn nhất của căn phòng",
      "explanation": "🎯 Đáp án đúng: [2] Ưu điểm lớn nhất của căn phòng\n\n💬 Dịch nghĩa câu:\n\"Căn phòng có cửa sổ lớn hướng sáng rất thoáng mát và vị trí đi bộ ra ga rất gần.\"\n\n💡 Phân tích & Giải thích:\n• Nhân vật khen ngợi căn phòng tràn ngập ánh nắng mặt trời và thuận tiện đi lại gần nhà ga.\n\n🔍 Phân tích các lựa chọn:\n- 1. Giá thuê phòng cực kỳ rẻ\n- 2. Ánh sáng chan hòa và rất gần nhà ga (ĐÚNG) (ĐÚNG)\n- 3. Nội thất mới tinh\n- 4. Gần trường học\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (2): 部屋のどこが一番いいと言っていますか。 正解: [2]",
      "audioScriptJa": "女：日当たりがすごく良くて明るいし、駅から歩いてすぐなのが一番気に入ったの。",
      "audioScriptVi": "Nữ: Căn phòng đón nắng cực tốt lại sáng sủa, mà thích nhất là đi bộ từ ga về loáng cái là tới nơi.",
      "correctOption": 2
    },
    "81": {
      "snippet": "Thời điểm nam sinh đưa thư cho Yamamoto",
      "explanation": "🎯 Đáp án đúng: [4] Thời điểm nam sinh đưa thư cho Yamamoto\n\n💬 Dịch nghĩa câu:\n\"Bạn nam quyết định sẽ đứng đợi ở bên ngoài thư viện và đưa tận tay bức thư cho bạn sau giờ tan học.\"\n\n💡 Phân tích & Giải thích:\n• Bạn nữ gợi ý bạn Yamamoto sau giờ học thường ở thư viện 30 phút, bạn nam ngại đông nên chọn đợi ở cửa ngoài thư viện để đưa thư.\n\n🔍 Phân tích các lựa chọn:\n- 1. Đưa vào buổi sáng trong lớp học\n- 2. Nhờ bạn chuyển hộ\n- 3. Bỏ thư vào hòm thư nhà\n- 4. Đứng đợi ngoài cửa thư viện sau giờ học để đưa tận tay (ĐÚNG) (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (3): 男の学生はいつ山本さんに手紙を渡しますか。 正解: [4]",
      "audioScriptJa": "女：山本さんなら授業の後いつも図書館にいるよ。出てきたときはどう？\n男：うん、外で待って自分で渡すよ。",
      "audioScriptVi": "Nữ: Yamamoto sau giờ học lúc nào cũng ở thư viện đấy. Lúc bạn ấy bước ra thì sao?\nNam: Ừ, tớ sẽ đợi ở ngoài rồi tự tay đưa cho bạn ấy.",
      "correctOption": 4
    },
    "82": {
      "snippet": "Giờ mở cửa sở thú Sakura ngày khai trương",
      "explanation": "🎯 Đáp án đúng: [2] Giờ mở cửa sở thú Sakura ngày khai trương\n\n💬 Dịch nghĩa câu:\n\"Vào ngày khai trương đặc biệt, sở thú Sakura mở cửa kéo dài phục vụ khách tới 20:00 tối.\"\n\n💡 Phân tích & Giải thích:\n• Đoạn phát thanh nêu rõ: ngày thường đóng cửa lúc 17:00, riêng ngày khai trương mở đến 8 giờ tối (午後8時まで開いている).\n\n🔍 Phân tích các lựa chọn:\n- 1. Mở cửa đến 8 giờ tối (ĐÚNG)\n- 2. Mở cửa đến 5 giờ chiều (ĐÚNG)\n- 3. Miễn phí vé cho tất cả người lớn\n- 4. Đóng cửa nghỉ lễ\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (4): サクラ動物園はオープンの日にどうなりますか。 正解: [1]",
      "audioScriptJa": "女：オープンの日は午後8時まで開いているそうです。お仕事のあとにお子さんと一緒にいかがでしょうか。",
      "audioScriptVi": "Nữ: Nghe nói ngày mở màn sở thú sẽ mở cửa đến tận 8 giờ tối. Sau giờ làm việc quý vị dắt các bé cùng ghé thăm nhé.",
      "correctOption": 2
    },
    "83": {
      "snippet": "Điều nữ du học sinh ngạc nhiên về máy bán hàng tự động",
      "explanation": "🎯 Đáp án đúng: [2] Điều nữ du học sinh ngạc nhiên về máy bán hàng tự động\n\n💬 Dịch nghĩa câu:\n\"Bạn nữ kinh ngạc vì ở Nhật Bản máy bán hàng tự động bán rất nhiều chủng loại phong phú như hoa, quần áo, chuối.\"\n\n💡 Phân tích & Giải thích:\n• Cô gái nói ở nước mình chỉ bán nước ngọt, sang Nhật thấy bán cả chuối, hoa, quần áo, rất đa dạng chủng loại (種類が多い).\n\n🔍 Phân tích các lựa chọn:\n- 1. Máy có thể nói chuyện\n- 2. Số lượng máy quá nhiều (ĐÚNG)\n- 3. Bán đa dạng phong phú nhiều chủng loại hàng hóa (ĐÚNG)\n- 4. Không bị mất trộm tiền\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (5): 女の留学生は日本の自動販売機についてどんなことに驚いたと言っていますか。 正解: [3]",
      "audioScriptJa": "女：私が驚いたのは種類だよ。日本ではバナナや花、服まで売っているのを見てびっくりした。",
      "audioScriptVi": "Nữ: Điều làm tớ kinh ngạc chính là chủng loại hàng hóa đấy. Ở Nhật tớ thấy bán cả chuối, hoa tươi, thậm chí cả quần áo nữa.",
      "correctOption": 2
    },
    "84": {
      "snippet": "Khung giờ trứng gà được giảm giá ở siêu thị",
      "explanation": "🎯 Đáp án đúng: [4] Khung giờ trứng gà được giảm giá ở siêu thị\n\n💬 Dịch nghĩa câu:\n\"Chương trình siêu khuyến mãi giảm giá trứng chỉ diễn ra trong vòng 1 tiếng từ 17:30 đến 18:30 chiều.\"\n\n💡 Phân tích & Giải thích:\n• Nhân viên giải thích: bây giờ là 17:00, phải 30 phút nữa mới bắt đầu và chương trình chỉ diễn ra trong 1 tiếng buổi chiều.\n\n🔍 Phân tích các lựa chọn:\n- 1. Từ 17:00 đến 18:00\n- 2. Từ 17:30 đến 18:30 chiều (ĐÚNG)\n- 3. Từ 18:00 đến 19:00\n- 4. Cả buổi chiều (ĐÚNG)\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (6): たまごが安くなる時間は何時から何時までですか。 正解: [2]",
      "audioScriptJa": "男：夕方の1時間だけなんです。今ちょうど5時ですから、始まるまで30分あります。",
      "audioScriptVi": "Nam: Dạ chỉ diễn ra trong 1 tiếng buổi chiều thôi ạ. Bây giờ đang đúng 5 giờ, còn 30 phút nữa mới bắt đầu ạ.",
      "correctOption": 4
    },
    "85": {
      "snippet": "Lý do thích ngắm hoa ở công viên phía Đông (Higashi)",
      "explanation": "🎯 Đáp án đúng: [3] Lý do thích ngắm hoa ở công viên phía Đông (Higashi)\n\n💬 Dịch nghĩa câu:\n\"Ở công viên phía Đông có hồ nước lớn, có thể vừa chèo thuyền trên hồ vừa ngắm hoa anh đào nở rất thơ mộng.\"\n\n💡 Phân tích & Giải thích:\n• Nam giải thích công viên Bắc đông đúc chật chội, còn công viên Đông có hồ nước, được đi thuyền ngắm hoa rất thú vị (池があって船に乗って桜が見られる).\n\n🔍 Phân tích các lựa chọn:\n- 1. Có nhiều gian hàng đồ ăn ngon\n- 2. Gần công ty có thể đi bộ\n- 3. Có hồ nước để đi thuyền ngắm hoa anh đào (ĐÚNG) (ĐÚNG)\n- 4. Ít người không bị ồn ào\n\n📄 Trích PDF gốc (试题解析):\n聴解 2 (7): 男の人はどうして東公園がいいと言っていますか。 正解: [3]",
      "audioScriptJa": "男：東公園は池があって、船に乗って桜が見られるから楽しいよ。",
      "audioScriptVi": "Nam: Ở công viên Higashi có hồ nước, mình có thể ngồi thuyền ngắm hoa anh đào nở nên vui lắm đấy.",
      "correctOption": 3
    },
    "86": {
      "snippet": "Hỏi chỗ mua chiếc vòng cổ đẹp",
      "explanation": "🎯 Đáp án đúng: [2] Hỏi chỗ mua chiếc vòng cổ đẹp\n\n💬 Dịch nghĩa câu:\n\"Thấy bạn đeo chiếc vòng cổ dễ thương, muốn hỏi bạn mua ở cửa hàng nào: 'Cái đó bạn mua ở đâu thế?'\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu chuẩn hỏi nguồn gốc mua đồ: 「それはどこで買ったんですか。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Bạn định mua ở tiệm nào?\n- 2. Cái đó bạn mua ở đâu vậy? (ĐÚNG) (ĐÚNG)\n- 3. Hãy nói cho tôi biết đã mua hay chưa\n- 4. Cái đó giá đắt không?\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (1): 友達がかわいいネックレスをしています。何と言いますか。 正解: [2]",
      "audioScriptJa": "「それはどこで買ったんですか。」",
      "audioScriptVi": "Cái đó bạn mua ở đâu thế?",
      "correctOption": 2
    },
    "87": {
      "snippet": "Nhờ bạn nhặt hộ cục tẩy rơi",
      "explanation": "🎯 Đáp án đúng: [2] Nhờ bạn nhặt hộ cục tẩy rơi\n\n💬 Dịch nghĩa câu:\n\"Cục tẩy rơi xuống gầm bàn, muốn nhờ bạn nhặt giúp mình một tay: 'Xin lỗi, bạn nhặt hộ mình cục tẩy với được không?'\"\n\n💡 Phân tích & Giải thích:\n• Mẫu câu nhờ bạn bè nhặt hộ: 「ごめん、消しゴムを拾ってくれる？」\n\n🔍 Phân tích các lựa chọn:\n- 1. Để mình nhặt cục tẩy cho bạn nhé\n- 2. Xin lỗi, bạn nhặt giúp mình cục tẩy được không? (ĐÚNG) (ĐÚNG)\n- 3. Hình như tẩy của bạn bị rơi kìa\n- 4. Bạn có tẩy không cho mình mượn\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (2): 机の下に消しゴムが落ちました。友達に取ってもらいたいです。何と言いますか。 正解: [2]",
      "audioScriptJa": "「ごめん、消しゴムを拾ってくれる？」",
      "audioScriptVi": "Xin lỗi, bạn nhặt giúp mình cục tẩy với được không?",
      "correctOption": 2
    },
    "88": {
      "snippet": "Nhường người khác xuống thang máy trước",
      "explanation": "🎯 Đáp án đúng: [1] Nhường người khác xuống thang máy trước\n\n💬 Dịch nghĩa câu:\n\"Trong thang máy, mình muốn nhường mọi người bước ra trước rồi mình ra sau: 'Xin mời bác/anh đi trước ạ.'\"\n\n💡 Phân tích & Giải thích:\n• Câu giao tiếp lịch sự nhường lối: 「どうぞ、お先に。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Xin mời bác đi trước ạ (ĐÚNG) (ĐÚNG)\n- 2. Tôi đi ra phía trước đây\n- 3. Xin nhờ bạn một lát sau nhé\n- 4. Tôi xuống tầng này\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (3): エレベーターの中です。他の人が降りた後で降ります。何と言いますか。 正解: [1]",
      "audioScriptJa": "「どうぞ、お先に。」",
      "audioScriptVi": "Xin mời bác/anh đi trước ạ.",
      "correctOption": 1
    },
    "89": {
      "snippet": "Nhắc bạn quên chưa kéo khóa balo",
      "explanation": "🎯 Đáp án đúng: [3] Nhắc bạn quên chưa kéo khóa balo\n\n💬 Dịch nghĩa câu:\n\"Thấy bạn để mở toang balo mà không hay biết, nhắc nhở bạn: 'Cặp của bạn đang mở kìa!'\"\n\n💡 Phân tích & Giải thích:\n• Diễn tả trạng thái đồ vật đang mở: 「カバンが開いているよ。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Hãy mở sẵn cặp ra nhé\n- 2. Cặp vẫn đang đóng nguyên kìa\n- 3. Balo của bạn đang bị mở toang kìa! (ĐÚNG) (ĐÚNG)\n- 4. Bạn đóng cặp lại chưa?\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (4): 友達がカバンをしめるのを忘れています。何と言いますか。 正解: [3]",
      "audioScriptJa": "「カバンが開いているよ。」",
      "audioScriptVi": "Balo của bạn đang bị mở kìa!",
      "correctOption": 3
    },
    "90": {
      "snippet": "Hỏi cách đọc chữ Hán trên biển hiệu",
      "explanation": "🎯 Đáp án đúng: [2] Hỏi cách đọc chữ Hán trên biển hiệu\n\n💬 Dịch nghĩa câu:\n\"Không biết chữ Hán đó đọc như thế nào, muốn hỏi người khác: 'Chỗ này viết là gì thế ạ?'\"\n\n💡 Phân tích & Giải thích:\n• Câu hỏi nội dung / cách đọc chữ Hán: 「何と書いてあるんですか。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Bạn đã viết chữ này như thế nào?\n- 2. Chỗ đó viết là gì thế ạ? (ĐÚNG) (ĐÚNG)\n- 3. Tôi nên viết sẵn cái gì vào đây?\n- 4. Chữ này có nghĩa là gì?\n\n📄 Trích PDF gốc (试题解析):\n聴解 3 (5): 読み方が知りたいです。何と言いますか。 正解: [2]",
      "audioScriptJa": "「何と書いてあるんですか。」",
      "audioScriptVi": "Chỗ này viết là gì thế ạ?",
      "correctOption": 2
    },
    "91": {
      "snippet": "Mời uống thêm trà: 'Dùng thêm một chén nữa nhé?'",
      "explanation": "🎯 Đáp án đúng: [3] Mời uống thêm trà: 'Dùng thêm một chén nữa nhé?'\n\n💬 Dịch nghĩa câu:\n\"Khi được chủ nhà nhã ý mời thêm trà, đáp lại lịch sự: 'Cảm ơn bác, vậy cháu xin phép dùng thêm ạ.'\"\n\n💡 Phân tích & Giải thích:\n• Đáp lại lời mời nước uống: 「すみません、いただきます。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Cảm ơn bạn, tôi xin nhận ạ (ĐÚNG)\n- 2. Mời bạn uống thêm một chén\n- 3. Không có chi đâu (ĐÚNG)\n- 4. Tôi không thích uống trà\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (1): よかったら、お茶をもう一杯いかがですか。 正解: [1]",
      "audioScriptJa": "女：よかったら、お茶をもう一杯いかがですか。\n男：すみません、いただきます。",
      "audioScriptVi": "Nữ: Nếu được thì mời bạn dùng thêm một tách trà nữa nhé?\nNam: Cảm ơn bạn, vậy mình xin phép dùng thêm ạ.",
      "correctOption": 3
    },
    "92": {
      "snippet": "Hỏi thăm: 'Trông bạn bận nhỉ, giờ nói chuyện chút được không?'",
      "explanation": "🎯 Đáp án đúng: [3] Hỏi thăm: 'Trông bạn bận nhỉ, giờ nói chuyện chút được không?'\n\n💬 Dịch nghĩa câu:\n\"Đáp lại nhã nhặn sẵn sàng lắng nghe: 'Vâng được chứ, có chuyện gì thế bạn?'\"\n\n💡 Phân tích & Giải thích:\n• Phản hồi sẵn sàng lắng nghe đối phương: 「はい、何ですか。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Tôi đâu có đang nói chuyện đâu\n- 2. À bây giờ tôi không giúp được đâu\n- 3. Vâng được chứ, có chuyện gì thế ạ? (ĐÚNG) (ĐÚNG)\n- 4. Để hôm khác nhé\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (2): 山本さん、忙しそうだけど、今ちょっと話せる？ 正解: [3]",
      "audioScriptJa": "女：山本さん、忙しそうだけど、今ちょっと話せる？\n男：はい、何ですか。",
      "audioScriptVi": "Nữ: Yamamoto ơi trông cậu bận nhỉ, bây giờ nói chuyện một chút được không?\nNam: Vâng được chứ, có chuyện gì thế cậu?",
      "correctOption": 3
    },
    "93": {
      "snippet": "Bàn quà tặng sinh nhật bạn",
      "explanation": "🎯 Đáp án đúng: [3] Bàn quà tặng sinh nhật bạn\n\n💬 Dịch nghĩa câu:\n\"Lee ơi sắp tới sinh nhật Mori rồi, tặng quà gì bây giờ nhỉ? -> Gợi ý: 'Ừm, tặng áo thun T-shirt thì sao?'\"\n\n💡 Phân tích & Giải thích:\n• Đưa ra ý tưởng gợi ý quà tặng: 「うーん、Tシャツはどう？」\n\n🔍 Phân tích các lựa chọn:\n- 1. Thế thì tốt quá rồi\n- 2. Tụi mình tặng quà cho bạn ấy đi\n- 3. Ừm, tặng chiếc áo thun T-shirt thì thấy thế nào? (ĐÚNG) (ĐÚNG)\n- 4. Tôi không biết bạn ấy thích gì\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (3): もうすぐ森さんの誕生日だね。プレゼントは何にしようか。 正解: [3]",
      "audioScriptJa": "男：もうすぐ森さんの誕生日だね。プレゼントは何にしようか。\n女：うーん、Tシャツはどう？",
      "audioScriptVi": "Nam: Sắp đến sinh nhật Mori rồi nhỉ. Tụi mình nên tặng quà gì bây giờ?\nNữ: Ừm, tặng áo thun T-shirt thì cậu thấy sao?",
      "correctOption": 3
    },
    "94": {
      "snippet": "Bảo chưa cần dọn tài liệu: 'Cứ để đấy tí dùng'",
      "explanation": "🎯 Đáp án đúng: [1] Bảo chưa cần dọn tài liệu: 'Cứ để đấy tí dùng'\n\n💬 Dịch nghĩa câu:\n\"Người kia bảo tài liệu tí dùng chưa cần cất: 'Vậy thì tôi cứ để nguyên ở đây nhé.'\"\n\n💡 Phân tích & Giải thích:\n• Hành động để sẵn đồ vật ở vị trí: 「じゃあ、ここに置いておきます。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Vậy thì tôi sẽ để sẵn ở đây nhé (ĐÚNG) (ĐÚNG)\n- 2. Không, tôi không dùng nữa đâu\n- 3. Để tôi dọn dẹp ngay bây giờ nhé\n- 4. Cất vào ngăn kéo nhé\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (4): その資料後で使うから、まだ片付けなくてもいいですよ。 正解: [1]",
      "audioScriptJa": "女：その資料後で使うから、まだ片付けなくてもいいですよ。\n男：じゃあ、ここに置いておきます。",
      "audioScriptVi": "Nữ: Tập tài liệu đó lát nữa dùng tới nên em chưa cần dọn dẹp cất đi đâu nhé.\nNam: Vâng, vậy thì em cứ để sẵn ở đây nhé ạ.",
      "correctOption": 1
    },
    "95": {
      "snippet": "Hỏi tiền bối: 'Anh chỉ em cách chọn môn học với được không?'",
      "explanation": "🎯 Đáp án đúng: [2] Hỏi tiền bối: 'Anh chỉ em cách chọn môn học với được không?'\n\n💬 Dịch nghĩa câu:\n\"Tiền bối nhiệt tình vui vẻ nhận lời: 'Được chứ, có gì thắc mắc cứ hỏi anh tự nhiên nhé.'\"\n\n💡 Phân tích & Giải thích:\n• Phản hồi hào phóng giúp đỡ đàn em: 「うん、何でも聞いて。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Cái đó anh không cho em được đâu\n- 2. Được chứ, có gì em cứ hỏi anh nhé (ĐÚNG) (ĐÚNG)\n- 3. Nhất định nhờ em giúp anh nhé\n- 4. Môn nào cũng khó cả\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (5): 大学の授業の選び方について教えてもらえませんか。 正解: [2]",
      "audioScriptJa": "後輩：先輩、大学の授業の選び方について教えてもらえませんか。\n先輩：うん、何でも聞いて。",
      "audioScriptVi": "Hậu bối: Tiền bối ơi, anh có thể chỉ dẫn cho em cách đăng ký chọn môn học đại học được không ạ?\nTiền bối: Ừ được chứ, có gì em cứ hỏi anh thoải mái nhé.",
      "correctOption": 2
    },
    "96": {
      "snippet": "Hỏi thăm sức khỏe: 'Vết thương của bạn đã đỡ chưa?'",
      "explanation": "🎯 Đáp án đúng: [3] Hỏi thăm sức khỏe: 'Vết thương của bạn đã đỡ chưa?'\n\n💬 Dịch nghĩa câu:\n\"Thông báo tin vui phục hồi hoàn toàn: 'Cảm ơn bạn, vết thương đã khỏi hẳn hoàn toàn rồi.'\"\n\n💡 Phân tích & Giải thích:\n• Khỏi bệnh hoàn toàn: 「すっかりなおりました。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Tôi không hay làm việc đó\n- 2. Thế thì tốt quá rồi\n- 3. Cảm ơn bạn, mình đã khỏi hẳn hoàn toàn rồi (ĐÚNG) (ĐÚNG)\n- 4. Bác sĩ dặn nghỉ ngơi\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (6): 山田さん、怪我はもう良くなりましたか。 正解: [3]",
      "audioScriptJa": "女：山田さん、怪我はもう良くなりましたか。\n男：すっかりなおりました。",
      "audioScriptVi": "Nữ: Yamada ơi, vết thương của cậu đã đỡ hơn chút nào chưa?\nNam: Cảm ơn cậu, mình đã lành lặn khỏi hẳn hoàn toàn rồi.",
      "correctOption": 3
    },
    "97": {
      "snippet": "Hỏi định hướng sau tốt nghiệp: 'Tốt nghiệp xong bạn định làm gì?'",
      "explanation": "🎯 Đáp án đúng: [2] Hỏi định hướng sau tốt nghiệp: 'Tốt nghiệp xong bạn định làm gì?'\n\n💬 Dịch nghĩa câu:\n\"Nêu rõ định hướng nghề nghiệp cụ thể: 'Tôi sẽ về nước và làm công việc thương mại xuất nhập khẩu.'\"\n\n💡 Phân tích & Giải thích:\n• Trả lời đúng trọng tâm câu hỏi về kế hoạch tương lai: 「国に帰って、貿易の仕事をします。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Tôi đã được phép tốt nghiệp rồi\n- 2. Tôi sẽ về nước và làm công việc về thương mại xuất nhập khẩu (ĐÚNG) (ĐÚNG)\n- 3. Tôi từng có kinh nghiệm làm việc ở ngân hàng\n- 4. Tôi chưa nghĩ đến\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (7): 大学を卒業したらどうするか決まりましたか。 正解: [2]",
      "audioScriptJa": "男：リーさん、大学を卒業したらどうするか決まりましたか。\n女：国に帰って、貿易の仕事をします。",
      "audioScriptVi": "Nam: Lee ơi, tốt nghiệp đại học xong bạn đã quyết định sẽ làm gì tiếp theo chưa?\nNữ: Mình sẽ trở về nước và làm công việc liên quan đến ngành thương mại.",
      "correctOption": 2
    },
    "98": {
      "snippet": "Hỏi han: 'Bạn có biết tập tài liệu cuộc họp ở đây đâu không?'",
      "explanation": "🎯 Đáp án đúng: [1] Hỏi han: 'Bạn có biết tập tài liệu cuộc họp ở đây đâu không?'\n\n💬 Dịch nghĩa câu:\n\"Ngạc nhiên và hỏi lại khi biết tài liệu bị thất lạc: 'Ủa thế á, không có ở đó sao bạn?'\"\n\n💡 Phân tích & Giải thích:\n• Phản hồi bất ngờ khi biết tin đồ vật bị thất lạc: 「ええ、ないんですか。」\n\n🔍 Phân tích các lựa chọn:\n- 1. Ủa, không có ở đó hả bạn? (ĐÚNG) (ĐÚNG)\n- 2. Thế thì hãy chỉ cho tôi nhé\n- 3. Tôi đã không hiểu gì cả\n- 4. Tôi vừa mới cầm mà\n\n📄 Trích PDF gốc (试题解析):\n聴解 4 (8): ここにあった会議の資料知らない？ 正解: [1]",
      "audioScriptJa": "女：ねえ、ここにあった会議の資料知らない？\n男：ええ、ないんですか。",
      "audioScriptVi": "Nữ: Cậu ơi, tập tài liệu cuộc họp vừa để ở đây cậu có thấy đâu không?\nNam: Ơ, không có ở đấy hả cậu?",
      "correctOption": 1
    },
  },
};
