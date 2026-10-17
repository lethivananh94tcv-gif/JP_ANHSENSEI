# -*- coding: utf-8 -*-
import json
import os

N5_2010_DATA = {
    # ==================== MÔN 1: TỪ VỰNG & KANJI (1..33) ====================
    # 問題 1: Đọc Kanji (1..10)
    1: {
        "mondai": 1,
        "section": "VOCAB",
        "localNum": 1,
        "opt": 2,
        "snippet": "先週 (せんしゅう)",
        "meaning": "Tuần trước tôi đã đi siêu thị mua sắm đồ.",
        "analysis": "• Chữ Hán: 「先週」 có cách đọc chuẩn xác là 「せんしゅう」.\n• Chữ 「先」 (tiên) có âm On là 「せん」, chữ 「週」 (chu) có âm On là 「しゅう」. Kết hợp thành 先週 (せんしゅう: tuần trước).",
        "options": [
            "- 1. ぜんしゅう: Sai âm đục ở chữ 先",
            "- 2. せんしゅう: (ĐÚNG) - Âm đọc chuẩn xác của 先週",
            "- 3. ぜんしゅ: Sai âm đục và thiếu trường âm",
            "- 4. せんしゅ: Thiếu trường âm của chữ 週"
        ],
        "pdfPage": 14,
        "rawExcerpt": "(1) 2 句意: 我上周去超市买了东西。考察汉字词，“先”音读为“せん”，“週”音读为“しゅう”。"
    },
    2: {
        "mondai": 1,
        "section": "VOCAB",
        "localNum": 2,
        "opt": 4,
        "snippet": "後 (あと)",
        "meaning": "Sau khi ăn cơm xong thì đi dạo bộ thư giãn.",
        "analysis": "• Chữ Hán: 「後」 trong cấu trúc「～た後 (あと)」 biểu thị 'sau khi làm hành động gì'.\n• Chữ 「後」 có cách đọc Kun thuần Nhật ở đây là 「あと」.",
        "options": [
            "- 1. つぎ (次): Phía sau, tiếp theo (không ghép sau V-た)",
            "- 2. うしろ (後ろ): Phía sau về mặt vị trí không gian",
            "- 3. まえ (前): Trước khi (phải đi với V-る 前に)",
            "- 4. あと (後): (ĐÚNG) - Sau khi làm gì (V-た 後で)"
        ],
        "pdfPage": 14,
        "rawExcerpt": "(2) 4 句意: 吃完饭后散步。1. つぎ: 下面接着; 2. うしろ: 后面; 3. まえ: 之前; 4. あと: 后面，之后。"
    },
    3: {
        "mondai": 1,
        "section": "VOCAB",
        "localNum": 3,
        "opt": 1,
        "snippet": "言って (いって)",
        "meaning": "Xin vui lòng nói lại một lần nữa ạ.",
        "analysis": "• Chữ Hán: 「言って」 là thể て của động từ 「言う (いう: nói)」.\n• Động từ nhóm 1 tận cùng là 「う」 khi chuyển sang thể て sẽ biến thành 「～って」: いう -> いって.",
        "options": [
            "- 1. いって (言って): (ĐÚNG) - Thể て của động từ 言う (nói)",
            "- 2. きって (切って): Cắt, gọt (từ động từ 切る)",
            "- 3. まって (待って): Chờ đợi (từ động từ 待つ)",
            "- 4. たって (立って): Đứng dậy (từ động từ 立つ)"
        ],
        "pdfPage": 14,
        "rawExcerpt": "(3) 1 句意: 请再说一次。1. いう(言う): 说; 2. きる(切る): 切，割; 3. まつ(待つ): 等待; 4. たつ(立つ): 站立。"
    },
    4: {
        "mondai": 1,
        "section": "VOCAB",
        "localNum": 4,
        "opt": 2,
        "snippet": "山 (やま)",
        "meaning": "Ở khu vực gần đây có ngọn núi.",
        "analysis": "• Chữ Hán: 「山」 (Sơn) đọc âm Kun thuần Nhật chuẩn xác là 「やま」 mang nghĩa ngọn núi.\n• Tránh nhầm lẫn với 川 (かわ: dòng sông) hay 池 (いけ: cái ao).",
        "options": [
            "- 1. かわ (川): Con sông, dòng sông",
            "- 2. やま (山): (ĐÚNG) - Ngọn núi",
            "- 3. いけ (池): Cái ao, đầm nước",
            "- 4. うみ (海): Biển, đại dương"
        ],
        "pdfPage": 14,
        "rawExcerpt": "(4) 2 句意: 这附近有山。1. かわ(川): 河，河流; 2. やま(山): 山; 3. いけ(池): 水池; 4. うみ(海): 海洋。"
    },
    5: {
        "mondai": 1,
        "section": "VOCAB",
        "localNum": 5,
        "opt": 2,
        "snippet": "多い (おおい)",
        "meaning": "Khách sạn / quán trọ kiểu Nhật này có rất nhiều phòng.",
        "analysis": "• Chữ Hán: 「多」 (Đa) đọc âm Kun là 「おおい」 biểu thị số lượng nhiều, phong phú.\n• Cấu trúc: 名詞 + が多い (có nhiều cái gì đó).",
        "options": [
            "- 1. すくない (少ない): Ít, hiếm",
            "- 2. おおい (多い): (ĐÚNG) - Nhiều phòng",
            "- 3. せまい (狭い): Hẹp, chật chội",
            "- 4. ひろい (広い): Rộng rãi"
        ],
        "pdfPage": 14,
        "rawExcerpt": "(5) 2 句意: 这家旅馆有很多房间。1. すくない(少ない): 少; 2. おおい(多い): 多; 3. せまい(狭い): 狭窄; 4. ひろい(広い): 宽阔。"
    },
    6: {
        "mondai": 1,
        "section": "VOCAB",
        "localNum": 6,
        "opt": 3,
        "snippet": "学校 (がっこう)",
        "meaning": "Tôi cùng với bạn bè đi đến trường học.",
        "analysis": "• Chữ Hán: 「学校」 kết hợp từ 「学 (がく)」 và 「校 (こう)」.\n• Khi âm tận cùng là 「く」 gặp âm đầu hàng 「か」 sẽ phát sinh hiện tượng biến âm ngắt (促音便): がく + こう -> がっこう.",
        "options": [
            "- 1. がくこう: Chưa biến âm ngắt",
            "- 2. がっごう: Sai âm đục ở chữ 校",
            "- 3. がっこう: (ĐÚNG) - Âm đọc chuẩn xác của 学校",
            "- 4. がくごう: Sai cả âm ngắt lẫn âm đục"
        ],
        "pdfPage": 14,
        "rawExcerpt": "(6) 3 句意: 我和朋友一起去学校。前面汉字读音最后是“く”，后面汉字第一个假名为か行清音假名时发生促音变。故为“がっこう”。"
    },
    7: {
        "mondai": 1,
        "section": "VOCAB",
        "localNum": 7,
        "opt": 4,
        "snippet": "六本 (ろっぽん)",
        "meaning": "Có sáu chiếc bút chì.",
        "analysis": "• Chữ Hán: 「六本」 dùng đơn vị đếm vật thon dài 「本 (ほん)」.\n• Số đếm 6 (ろく) kết hợp với trợ từ đếm 「本」 sẽ biến âm thành âm ngắt và âm bán đục: ろく + ほん -> ろっぽん.",
        "options": [
            "- 1. ろくほん: Chưa biến âm ngắt",
            "- 2. ろっぽん (phương án khác): Sai dạng viết",
            "- 3. ろくぼん: Sai biến âm đục",
            "- 4. ろっぽん: (ĐÚNG) - Đọc chuẩn xác sáu chiếc bút chì"
        ],
        "pdfPage": 14,
        "rawExcerpt": "(7) 4 句意: 有六支铅笔。考察汉字词，“六”与“本”结合时发生促音变与半浊音变，读作“ろっぽん”。"
    },
    8: {
        "mondai": 1,
        "section": "VOCAB",
        "localNum": 8,
        "opt": 2,
        "snippet": "新聞 (しんぶん)",
        "meaning": "Tờ báo này có giá bao nhiêu tiền vậy ạ?",
        "analysis": "• Chữ Hán: 「新聞」 ghép bởi chữ 「新 (Tân)」 đọc âm On là 「しん」 và chữ 「聞 (Văn)」 đọc âm On biến âm là 「ぶん」.\n• Ghép lại thành 新聞 (しんぶん: tờ báo tin tức).",
        "options": [
            "- 1. じんぶん: Sai âm đầu của chữ 新",
            "- 2. しんぶん: (ĐÚNG) - Âm đọc chuẩn xác của 新聞",
            "- 3. しんもん: Sai âm đọc của chữ 聞",
            "- 4. じんもん: Sai cả hai âm"
        ],
        "pdfPage": 14,
        "rawExcerpt": "(8) 2 句意: 这份报纸多少钱? 考察汉字词，“新”音读为“しん”，“聞”音读为“ぶん”。"
    },
    9: {
        "mondai": 1,
        "section": "VOCAB",
        "localNum": 9,
        "opt": 2,
        "snippet": "安い (やすい)",
        "meaning": "Chiếc máy ảnh này giá rất rẻ.",
        "analysis": "• Chữ Hán: 「安」 (An) đọc âm Kun là 「やすい」 mang ý nghĩa giá cả rẻ, bình dân.\n• Trái nghĩa với 「高い (たかい: đắt đỏ, cao)」.",
        "options": [
            "- 1. たかい (高い): Cao, đắt tiền",
            "- 2. やすい (安い): (ĐÚNG) - Giá rẻ",
            "- 3. おもい (重い): Nặng nề",
            "- 4. かるい (軽い): Nhẹ nhàng"
        ],
        "pdfPage": 14,
        "rawExcerpt": "(9) 2 句意: 这台相机很便宜。1. たかい(高い): 贵; 2. やすい(安い): 便宜; 3. おもい(重い): 重; 4. かるい(軽い): 轻。"
    },
    10: {
        "mondai": 1,
        "section": "VOCAB",
        "localNum": 10,
        "opt": 3,
        "snippet": "外 (そと)",
        "meaning": "Chú mèo đang ở bên ngoài nhà.",
        "analysis": "• Chữ Hán: 「外」 (Ngoại) có âm Kun là 「そと」 mang ý nghĩa bên ngoài, ngoài trời.\n• Trái nghĩa với 「中 (なか: bên trong)」.",
        "options": [
            "- 1. いえ (家): Ngôi nhà",
            "- 2. なか (中): Bên trong",
            "- 3. そと (外): (ĐÚNG) - Ở bên ngoài",
            "- 4. にわ (庭): Sân vườn"
        ],
        "pdfPage": 14,
        "rawExcerpt": "(10) 3 句意: 猫在外面。1. いえ(家): 房屋; 2. なか(中): 内部; 3. そと(外): 外面; 4. にわ(庭): 庭院。"
    },

    # 問題 2: Viết Kanji & Katakana (11..18)
    11: {
        "mondai": 2,
        "section": "VOCAB",
        "localNum": 11,
        "opt": 1,
        "snippet": "シャワー (Shower)",
        "meaning": "Sáng nay tôi đã tắm vòi sen.",
        "analysis": "• Katakana: Từ vựng mượn tiếng Anh 'Shower' (vòi hoa sen) được viết chuẩn Katakana là 「シャワー」.\n• Chú ý phân biệt chữ 「シ (shi)」 với chữ 「ツ (tsu)」 và trường âm 「ー」.",
        "options": [
            "- 1. シャワー: (ĐÚNG) - Viết đúng Katakana từ vòi sen Shower",
            "- 2. シゃワ: Thiếu trường âm",
            "- 3. ツャワー: Nhầm lẫn giữa chữ ツ và シ",
            "- 4. ツャワ: Sai ký tự và thiếu trường âm"
        ],
        "pdfPage": 14,
        "rawExcerpt": "(11) 1 句意: 我今天早上冲了个淋浴。考察片假名，シ对应的片假名以及長音符号，正确为“シャワー”。"
    },
    12: {
        "mondai": 2,
        "section": "VOCAB",
        "localNum": 12,
        "opt": 2,
        "snippet": "飲んで (のんで)",
        "meaning": "Tôi đã uống một ly cà phê.",
        "analysis": "• Chữ Hán: Từ Hiragana 「のんで」 xuất phát từ động từ 「飲む (のむ: uống)」, chữ Hán tương ứng là 「飲」.\n• Tránh nhầm với động từ ăn 「食べる (たべる)」.",
        "options": [
            "- 1. 吸んで: Hút, hít vào",
            "- 2. 飲んで: (ĐÚNG) - Thể て của động từ 飲む (uống)",
            "- 3. 噛んで: Nhai, cắn",
            "- 4. 食べて: Ăn (từ 食べる)"
        ],
        "pdfPage": 14,
        "rawExcerpt": "(12) 2 句意: 我喝了咖啡。2. 飲む(のむ): 喝，饮; 4. 食べる(たべる): 吃。"
    },
    13: {
        "mondai": 2,
        "section": "VOCAB",
        "localNum": 13,
        "opt": 3,
        "snippet": "車 (くるま)",
        "meaning": "Tôi vừa mới mua một chiếc xe ô tô mới.",
        "analysis": "• Chữ Hán: Từ thuần Nhật 「くるま」 có nghĩa là xe hơi, ô tô, chữ Hán chuẩn xác là 「車」 (Xa).\n• Các chữ Hán khác chứa bộ Xa nhưng mang nghĩa khác.",
        "options": [
            "- 1. 庫: Kho, nhà kho",
            "- 2. 陣: Trận địa",
            "- 3. 車: (ĐÚNG) - Chữ Hán chuẩn của くるま (ô tô)",
            "- 4. 連: Kết nối, liên kết"
        ],
        "pdfPage": 15,
        "rawExcerpt": "(13) 3 句意: 我买了台新车。くるま对应的汉字为“車”。"
    },
    14: {
        "mondai": 2,
        "section": "VOCAB",
        "localNum": 14,
        "opt": 4,
        "snippet": "千円 (せんえん)",
        "meaning": "Chiếc mũ này có giá 1.000 Yên.",
        "analysis": "• Chữ Hán: Đơn vị tiền tệ Nhật Bản là 「円 (えん: Yên)」, kết hợp với 1000 là 「千 (せん)」 tạo thành 「千円」.\n• Chú ý phân biệt chữ 「円」 với chữ 「内 (nội)」 và 「冊 (sách: quyển)」.",
        "options": [
            "- 1. 千内: Sai chữ 円 thành chữ 内",
            "- 2. 千冊: Đơn vị đếm quyển sách",
            "- 3. 千用: Sai chữ 円 thành chữ 用",
            "- 4. 千円: (ĐÚNG) - 1.000 Yên Nhật"
        ],
        "pdfPage": 15,
        "rawExcerpt": "(14) 4 句意: 这顶帽子1000日元。円(えん): 日元; 冊(さつ): 册，本; 内(ない): 内。"
    },
    15: {
        "mondai": 2,
        "section": "VOCAB",
        "localNum": 15,
        "opt": 4,
        "snippet": "半分 (はんぶん)",
        "meaning": "Tôi đã làm xong một nửa bài tập về nhà rồi.",
        "analysis": "• Chữ Hán: 「はんぶん」 (một nửa) được cấu tạo từ chữ 「半 (Bán: nửa)」 và 「分 (Phần)」 tạo thành 「半分」.\n• Tránh nhầm với chữ 伴, 判.",
        "options": [
            "- 1. 伴分: Sai chữ 半 thành 伴",
            "- 2. 判分: Sai chữ 半 thành 判",
            "- 3. 畔分: Chữ Hán sai bộ thủ",
            "- 4. 半分: (ĐÚNG) - Một nửa, phân nửa"
        ],
        "pdfPage": 15,
        "rawExcerpt": "(15) 4 句意: 做完了一半作业。4. 半分(はんぶん): 一半，二分之一。"
    },
    16: {
        "mondai": 2,
        "section": "VOCAB",
        "localNum": 16,
        "opt": 1,
        "snippet": "来ませんか (きませんか)",
        "meaning": "Bạn có muốn ghé qua nhà tôi chơi không?",
        "analysis": "• Chữ Hán: Động từ đến 「来る (くる)」 khi chia thể phủ định rủ rê lịch sự là 「来ませんか (きませんか)」.\n• Chữ Hán biểu thị sự di chuyển tới là 「来」.",
        "options": [
            "- 1. 来ませんか: (ĐÚNG) - Rủ rê ghé đến chơi (động từ 来る)",
            "- 2. 去ませんか: Chữ Khứ mang nghĩa rời đi",
            "- 3. 行きませんか: Đi đến nơi khác (không phải tới nhà người nói)",
            "- 4. 帰ませんか: Trở về"
        ],
        "pdfPage": 15,
        "rawExcerpt": "(16) 1 句意: 要来我家(玩)吗? 1. 来る(くる): 来，来到。"
    },
    17: {
        "mondai": 2,
        "section": "VOCAB",
        "localNum": 17,
        "opt": 3,
        "snippet": "会いました (あいました)",
        "meaning": "Hôm qua tôi đã tình cờ gặp anh Tanaka.",
        "analysis": "• Chữ Hán: Động từ gặp gỡ 「会う (あう)」 trong quá khứ lịch sự là 「会いました」.\n• Tránh nhầm với động từ nhìn 「見ました」 hay động từ nói 「話しました」.",
        "options": [
            "- 1. 見ました: Đã nhìn thấy (từ 見る)",
            "- 2. 話しました: Đã nói chuyện (từ 話す)",
            "- 3. 会いました: (ĐÚNG) - Đã gặp mặt (từ 会う)",
            "- 4. 聞きました: Đã nghe / hỏi (từ 聞く)"
        ],
        "pdfPage": 15,
        "rawExcerpt": "(17) 3 句意: 我昨天遇到了田中先生。1. 見る(みる): 看; 3. 会う(あう): 遇见，碰见。"
    },
    18: {
        "mondai": 2,
        "section": "VOCAB",
        "localNum": 18,
        "opt": 1,
        "snippet": "同じ (おなじ)",
        "meaning": "Tôi đã mua bộ quần áo giống hệt như của em gái.",
        "analysis": "• Chữ Hán: Tính từ 「おなじ」 (giống nhau, tương đồng) có chữ Hán chuẩn xác là 「同じ」 (Đồng).\n• Mẫu câu: A と同じ B (cái B giống hệt như A).",
        "options": [
            "- 1. 同じ: (ĐÚNG) - Chữ Hán chuẩn xác của おなじ",
            "- 2. 同じく: Dạng phó từ",
            "- 3. 洞じ: Chữ Động (hang động)",
            "- 4. 桐じ: Chữ Đồng (cây ngô đồng)"
        ],
        "pdfPage": 15,
        "rawExcerpt": "(18) 1 句意: 买了和妹妹一样的衣服。1. 同じ(おなじ): 相同，一样。"
    },

    # 問題 3: Điền từ vào câu (19..28)
    19: {
        "mondai": 3,
        "section": "VOCAB",
        "localNum": 19,
        "opt": 4,
        "snippet": "アパート (Căn hộ chung cư)",
        "meaning": "Nhà của tôi nằm ở tầng hai của tòa chung cư mini này.",
        "analysis": "• Từ Katakana: 「アパート」 mượn từ Apartment trong tiếng Anh, chỉ khu nhà tập thể, chung cư cho thuê.\n• Phù hợp nhất với ngữ cảnh 'tầng 2 của tòa nhà (2階)' nơi người ở.",
        "options": [
            "- 1. エレベーター: Thang máy",
            "- 2. プール: Bể bơi",
            "- 3. エアコン: Máy điều hòa không khí",
            "- 4. アパート: (ĐÚNG) - Khu chung cư, căn hộ mini"
        ],
        "pdfPage": 15,
        "rawExcerpt": "(19) 4 句意: 我家在这栋公寓的二楼。1. エレベーター: 电梯; 3. エアコン: 空调; 4. アパート: 公寓。"
    },
    20: {
        "mondai": 3,
        "section": "VOCAB",
        "localNum": 20,
        "opt": 3,
        "snippet": "弾く (ひく - gảy/chơi đàn)",
        "meaning": "Anh Sato chơi đàn guitar rất là hay.",
        "analysis": "• Collocation (Kết hợp từ): Đối với nhạc cụ có dây hoặc phím như guitar (ギター) hay piano (ピアノ), tiếng Nhật sử dụng động từ 「弾く (ひく)」.\n• Đối với nhạc cụ hơi dùng 吹く (ふく), với hát dùng 歌う (うたう).",
        "options": [
            "- 1. 歌う (うたう): Ca hát",
            "- 2. 吹く (ふく): Thổi (sáo, kèn)",
            "- 3. 弾く (ひく): (ĐÚNG) - Chơi nhạc cụ dây (guitar, piano)",
            "- 4. 叩く (たたく): Đánh trống, gõ"
        ],
        "pdfPage": 15,
        "rawExcerpt": "(20) 3 句意: 佐藤先生吉他弹得非常好。1. 歌う: 唱歌; 3. 弾く: 弹奏(吉他、钢琴)。"
    },
    21: {
        "mondai": 3,
        "section": "VOCAB",
        "localNum": 21,
        "opt": 1,
        "snippet": "並べる (ならべる - bày biện bát đũa)",
        "meaning": "Xin vui lòng bày bát đĩa đũa lên trên bàn ăn.",
        "analysis": "• Từ vựng: Tha động từ 「並べる (ならべる)」 có nghĩa là sắp đặt, xếp ngay ngắn thành hàng các vật dụng lên bàn ăn.\n• Bát đũa (お皿とお箸) cần được xếp ngay ngắn trước bữa ăn.",
        "options": [
            "- 1. 並べる (ならべる): (ĐÚNG) - Sắp xếp, bày biện ra bàn",
            "- 2. 食べる (たべる): Ăn",
            "- 3. 洗う (あらう): Rửa",
            "- 4. 捨てる (すてる): Vứt bỏ"
        ],
        "pdfPage": 15,
        "rawExcerpt": "(21) 1 句意: 请在桌上摆好碗筷。1. ならべる(並べる): 摆，排列; 3. たべる(食べる): 吃。"
    },
    22: {
        "mondai": 3,
        "section": "VOCAB",
        "localNum": 22,
        "opt": 1,
        "snippet": "きれい (Sạch sẽ, ngăn nắp)",
        "meaning": "Hôm nay đã dọn dẹp rồi nên trong phòng rất sạch sẽ.",
        "analysis": "• Tính từ đuôi な: 「きれい」 mang ý nghĩa sạch sẽ, gọn gàng, đẹp đẽ.\n• Sau khi làm vệ sinh dọn dẹp phòng ốc (そうじをしたから), kết quả là phòng trở nên sạch sẽ.",
        "options": [
            "- 1. きれい: (ĐÚNG) - Sạch sẽ, ngăn nắp",
            "- 2. きたない (汚い): Bẩn thỉu",
            "- 3. あかるい (明るい): Sáng sủa",
            "- 4. くらい (暗い): Tối tăm"
        ],
        "pdfPage": 15,
        "rawExcerpt": "(22) 1 句意: 今天打扫过了，所以房间里很干净。1. きれい: 整齐，干净; 2. きたない(汚い): 脏; 3. あかるい(明るい): 明亮; 4. くらい(暗い): 黑暗。"
    },
    23: {
        "mondai": 3,
        "section": "VOCAB",
        "localNum": 23,
        "opt": 3,
        "snippet": "メートル (Mét - cự ly)",
        "meaning": "Hôm nay tôi đã bơi được cự ly 500 mét.",
        "analysis": "• Đơn vị đo lường: Đối với hoạt động bơi lội (およぐ), cự ly đo bằng mét 「メートル」.\n• 500メートル = 500 mét.",
        "options": [
            "- 1. 度 (ど): Độ (nhiệt độ, lần số)",
            "- 2. 番 (ばん): Số thứ tự",
            "- 3. メートル: (ĐÚNG) - Đơn vị đo khoảng cách (mét)",
            "- 4. グラム: Gam (khối lượng)"
        ],
        "pdfPage": 15,
        "rawExcerpt": "(23) 3 句意: 我今天游了500米。1. ど(度): 度数; 2. ばん(番): 号，次序; 3. メートル: 米; 4. グラム: 克。"
    },
    24: {
        "mondai": 3,
        "section": "VOCAB",
        "localNum": 24,
        "opt": 2,
        "snippet": "地図 (ちず - bản đồ chỉ đường)",
        "meaning": "Xin hãy vẽ giúp tôi bản đồ từ nhà ga đến đại sứ quán với ạ.",
        "analysis": "• Collocation: Đi cùng động từ 「書く / 描く (vẽ, phác họa)」 và chỉ phương hướng lộ trình từ ga đến đại sứ quán (駅から大使館まで) chỉ có thể là bản đồ 「地図 (ちず)」.",
        "options": [
            "- 1. 写真 (しゃしん): Bức ảnh chụp",
            "- 2. 地図 (ちず): (ĐÚNG) - Bản đồ chỉ dẫn đường đi",
            "- 3. 手紙 (てがみ): Bức thư tay",
            "- 4. 切符 (きっぷ): Vé tàu, vé xe"
        ],
        "pdfPage": 15,
        "rawExcerpt": "(24) 2 句意: 请帮我画一下从车站到大使馆的地图。1. しゃしん(写真): 相片; 2. ちず(地図): 地图; 3. てがみ(手紙): 信件; 4. きっぷ(切符): 票。"
    },
    25: {
        "mondai": 3,
        "section": "VOCAB",
        "localNum": 25,
        "opt": 1,
        "snippet": "消す (けす - tắt tivi/thiết bị điện)",
        "meaning": "Ồn ào quá, hãy tắt chiếc ti vi đi nào.",
        "analysis": "• Động từ: Tắt các thiết bị điện như tivi, đèn điện sử dụng động từ 「消す (けす)」.\n• Trái nghĩa là bật điện 「点ける (つける)」.",
        "options": [
            "- 1. 消す (けす): (ĐÚNG) - Tắt tivi",
            "- 2. 付ける (つける): Bật, gắn vào",
            "- 3. 閉める (しめる): Đóng cửa sổ, đóng nắp",
            "- 4. 開ける (あける): Mở ra"
        ],
        "pdfPage": 15,
        "rawExcerpt": "(25) 1 句意: 太吵了，把电视关掉吧。1. けす(消す): 关闭(电器); 2. つける(付ける): 开启; 3. しめる(閉める): 关闭(门窗); 4. あける(開ける): 打开。"
    },
    26: {
        "mondai": 3,
        "section": "VOCAB",
        "localNum": 26,
        "opt": 4,
        "snippet": "雪 (ゆき - tuyết rơi)",
        "meaning": "Hôm nay trời có tuyết rơi rồi.",
        "analysis": "• Hiện tượng thời tiết: Kết hợp với động từ rơi 「降る (ふる)」 chỉ có thể là mưa 「雨 (あめ)」 hoặc tuyết 「雪 (ゆき)」.\n• Phương án 4 là 雪 (tuyết rơi).",
        "options": [
            "- 1. 曇り (くもり): Trời nhiều mây, âm u",
            "- 2. 晴れ (はれ): Trời nắng đẹp, quang đãng",
            "- 3. 風 (かぜ): Gió thổi",
            "- 4. 雪 (ゆき): (ĐÚNG) - Tuyết rơi (雪が降る)"
        ],
        "pdfPage": 16,
        "rawExcerpt": "(26) 4 句意: 今天下雪了。1. くもり(曇り): 阴天; 2. はれ(晴れ): 晴天; 3. かぜ(風): 风; 4. ゆき(雪): 雪。"
    },
    27: {
        "mondai": 3,
        "section": "VOCAB",
        "localNum": 27,
        "opt": 2,
        "snippet": "五つ (いつつ - năm quả)",
        "meaning": "Ở trong chiếc hộp có năm quả táo.",
        "analysis": "• Cách đếm đồ vật thuần Nhật: 1つ (ひとつ), 2つ (ふたつ), 3つ (みっつ), 4つ (よっつ), 5つ (いつつ).\n• Số 5 quả táo là 「五つ (いつつ)」.",
        "options": [
            "- 1. 四つ (よっつ): 4 quả, 4 cái",
            "- 2. 五つ (いつつ): (ĐÚNG) - 5 quả táo",
            "- 3. 六つ (むっつ): 6 quả, 6 cái",
            "- 4. 七つ (ななつ): 7 quả, 7 cái"
        ],
        "pdfPage": 16,
        "rawExcerpt": "(27) 2 句意: 盒子里有五个苹果。1. よっつ(四つ): 四个; 2. いつつ(五つ): 五个; 3. むっつ(六つ): 六个; 4. ななつ(七つ): 七个。"
    },
    28: {
        "mondai": 3,
        "section": "VOCAB",
        "localNum": 28,
        "opt": 4,
        "snippet": "上 (うえ - bên trên mặt bàn)",
        "meaning": "Chiếc kính mắt đang để ở trên mặt bàn.",
        "analysis": "• Vị trí không gian: Đồ vật đặt trên bề mặt bàn (机の～にあります) là ở phía bên trên 「上 (うえ)」.\n• Tránh nhầm với dưới 「下 (した)」 hay bên cạnh 「横 (よこ)」.",
        "options": [
            "- 1. そば: Bên cạnh, gần kề",
            "- 2. 横 (よこ): Chiều ngang, bên sườn",
            "- 3. 下 (した): Phía bên dưới gầm",
            "- 4. 上 (うえ): (ĐÚNG) - Phía trên mặt bàn"
        ],
        "pdfPage": 16,
        "rawExcerpt": "(28) 4 句意: 眼镜在桌上。1. そば: 旁边; 2. よこ(横): 侧边; 3. した(下): 下面; 4. うえ(上): 上面。"
    },

    # 問題 4: Tìm câu đồng nghĩa (29..33)
    29: {
        "mondai": 4,
        "section": "VOCAB",
        "localNum": 29,
        "opt": 3,
        "snippet": "毎晩 (まいばん) = 晩はいつも",
        "meaning": "Mỗi buổi tối tôi đều gọi điện thoại về cho gia đình ở quê nhà.",
        "analysis": "• Từ đồng nghĩa: 「毎晩 (まいばん: mỗi buổi tối)」 mang ý nghĩa tương đương với 「晩はいつも (buổi tối lúc nào cũng làm việc đó)」.\n• Phương án 3 diễn giải hoàn toàn trùng khớp.",
        "options": [
            "- 1. Buổi tối thỉnh thoảng gọi điện",
            "- 2. Buổi sáng thỉnh thoảng gọi điện",
            "- 3. Buổi tối lúc nào cũng gọi điện (晩はいつも): (ĐÚNG) - Đồng nghĩa với 毎晩",
            "- 4. Buổi sáng lúc nào cũng gọi điện"
        ],
        "pdfPage": 16,
        "rawExcerpt": "(29) 3 句意: 每天晚上都会给在故乡的家人打电话。(毎晩: 每天晚上 = 晚上总会)"
    },
    30: {
        "mondai": 4,
        "section": "VOCAB",
        "localNum": 30,
        "opt": 1,
        "snippet": "建物 (たてもの) = ビル (tòa nhà)",
        "meaning": "Trên con phố này có một tòa nhà kiến trúc rất nổi tiếng.",
        "analysis": "• Từ đồng nghĩa: 「建物 (たてもの: công trình xây dựng, tòa nhà)」 đồng nghĩa với từ mượn Katakana 「ビル (Building - tòa nhà, cao ốc)」.\n• Phương án 1 chính xác 100%.",
        "options": [
            "- 1. Trên phố có tòa nhà (ビル) nổi tiếng: (ĐÚNG) - ビル đồng nghĩa với 建物",
            "- 2. Trên phố có quán trà nổi tiếng",
            "- 3. Trên phố có bánh kem nổi tiếng",
            "- 4. Trên phố có công viên nổi tiếng"
        ],
        "pdfPage": 16,
        "rawExcerpt": "(30) 1 句意: 这条街上有很有名的建筑。(たてもの: 楼房，建筑物 = ビル)"
    },
    31: {
        "mondai": 4,
        "section": "VOCAB",
        "localNum": 31,
        "opt": 2,
        "snippet": "おもしろくない = つまらない (nhàm chán)",
        "meaning": "Bộ phim này xem không thú vị lắm.",
        "analysis": "• Diễn đạt tương đương: 「おもしろくない (không hay, không hấp dẫn)」 tương đương với tính từ 「つまらない (nhàm chán, buồn tẻ)」.\n• Phương án 2 phản ánh đúng ngữ nghĩa.",
        "options": [
            "- 1. Phim này xem rất vui vẻ",
            "- 2. Phim này rất buồn tẻ / nhàm chán (つまらない): (ĐÚNG) - Đồng nghĩa với おもしろくない",
            "- 3. Phim này thời lượng rất ngắn",
            "- 4. Phim này thời lượng rất dài"
        ],
        "pdfPage": 16,
        "rawExcerpt": "(31) 2 句意: 这部电影不太有趣。(おもしろくない: 不太有趣 = つまらない)"
    },
    32: {
        "mondai": 4,
        "section": "VOCAB",
        "localNum": 32,
        "opt": 3,
        "snippet": "誕生日 (たんじょうび) = 生まれました (sinh ra đời)",
        "meaning": "Ngày sinh nhật của tôi là ngày 15 tháng 6.",
        "analysis": "• Diễn đạt tương đương: 「誕生日 (sinh nhật)」 là ngày một người cất tiếng khóc chào đời, tương đương với hành động 「生まれました (đã được sinh ra)」.\n• Phương án 3 chính xác.",
        "options": [
            "- 1. Đã kết hôn vào ngày 15 tháng 6",
            "- 2. Đã tham gia kỳ thi vào ngày 15 tháng 6",
            "- 3. Đã chào đời vào ngày 15 tháng 6 (生まれました): (ĐÚNG) - Tương đương với 誕生日",
            "- 4. Đã về nước vào ngày 15 tháng 6"
        ],
        "pdfPage": 16,
        "rawExcerpt": "(32) 3 句意: 我的生日是6月15日。(たんじょうび: 生日 = 6月15日に生まれました)"
    },
    33: {
        "mondai": 4,
        "section": "VOCAB",
        "localNum": 33,
        "opt": 4,
        "snippet": "二年前 (にねんまえ) = おととし (năm kia)",
        "meaning": "Tôi đã đi du lịch Kyoto vào hai năm trước.",
        "analysis": "• Từ đồng nghĩa chỉ thời gian: 「二年前 (hai năm về trước)」 chính là năm kia trong tiếng Nhật 「おととし (一昨年)」.\n• Tránh nhầm với năm ngoái 「きょねん (去年)」.",
        "options": [
            "- 1. Tôi đã đi Kyoto vào hôm qua",
            "- 2. Tôi đã đi Kyoto vào hôm kia",
            "- 3. Tôi đã đi Kyoto vào năm ngoái (きょねん)",
            "- 4. Tôi đã đi Kyoto vào năm kia (おととし): (ĐÚNG) - Đồng nghĩa với 二年前"
        ],
        "pdfPage": 16,
        "rawExcerpt": "(33) 4 句意: 我在两年前去了京都。(にねんまえ: 两年前 = おととし)"
    },

    # ==================== MÔN 2: NGỮ PHÁP & ĐỌC HIỂU (34..65) ====================
    # 問題 1: Ngữ pháp điền câu (34..49 / Local 1..16)
    34: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 1,
        "opt": 2,
        "snippet": "Trợ từ 「の」: 日本のラーメン",
        "meaning": "Món mì Ramen của đất nước Nhật Bản ăn rất là ngon miệng.",
        "analysis": "• Trợ từ: Trợ từ 「の」 biểu thị mối quan hệ xuất xứ, thuộc về giữa hai danh từ (N1 の N2).\n• 「日本のラーメン」: Mì ramen của Nhật Bản.",
        "options": [
            "- 1. に: Chỉ nơi chốn hoặc mục đích",
            "- 2. の: (ĐÚNG) - Nối 2 danh từ biểu thị xuất xứ/thuộc về",
            "- 3. で: Chỉ phương tiện hoặc nơi diễn ra hành động",
            "- 4. を: Chỉ đối tượng tác động của ngoại động từ"
        ],
        "pdfPage": 16,
        "rawExcerpt": "(1) 2 句意: 日本的拉面很好吃。考察“の”表示所属、来源的用法。"
    },
    35: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 2,
        "opt": 3,
        "snippet": "Trợ từ 「と」: 弟と妹",
        "meaning": "Tôi có hai người em, gồm một em trai và một em gái.",
        "analysis": "• Trợ từ: Trợ từ 「と」 dùng để liệt kê toàn bộ danh từ cùng loại một cách trọn vẹn (liệt kê hoàn chỉnh A và B).\n• 「弟と妹」: Em trai và em gái.",
        "options": [
            "- 1. も: Biểu thị ý nghĩa cũng",
            "- 2. や: Liệt kê không đầy đủ (và những người khác)",
            "- 3. と: (ĐÚNG) - Liệt kê trọn vẹn hai đối tượng",
            "- 4. か: Lựa chọn hoặc là A hoặc là B"
        ],
        "pdfPage": 16,
        "rawExcerpt": "(2) 3 句意: 我有两个兄弟姐妹，我弟弟和我妹妹。考察“と”表示完全列举的用法。"
    },
    36: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 3,
        "opt": 2,
        "snippet": "Trợ từ 「は」: どこへも行きませんでした",
        "meaning": "Tanaka ơi, hôm qua bạn có đi ra ngoài đâu chơi không? - Không, tôi ở nhà cả ngày.",
        "analysis": "• Trợ từ: Trợ từ 「は」 đóng vai trò nêu bật chủ ngữ/chủ đề chính được hỏi trong câu (田中さんは).\n• Dùng để nhấn mạnh đối tượng tiếp nhận câu hỏi.",
        "options": [
            "- 1. が: Chỉ chủ ngữ ngữ pháp hạn chế",
            "- 2. は: (ĐÚNG) - Nêu bật chủ đề cuộc đối thoại (田中さんは)",
            "- 3. を: Trợ từ tân ngữ",
            "- 4. に: Trợ từ chỉ đích đến"
        ],
        "pdfPage": 16,
        "rawExcerpt": "(3) 2 句意: 田中你昨天出门去哪里了吗? 考察“は”提示主题的用法。"
    },
    37: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 4,
        "opt": 4,
        "snippet": "Trợ từ 「に」: 右に曲がってください",
        "meaning": "Xin vui lòng rẽ phải ở góc cua tiếp theo ạ.",
        "analysis": "• Trợ từ: Đi kèm với động từ chuyển hướng 「曲がる (まがる: rẽ)」 là trợ từ 「に」 biểu thị phương hướng, đích đến của hành vi.\n• Cụm cố định: 右に曲がる (rẽ phải), 左に曲がる (rẽ trái).",
        "options": [
            "- 1. を: Chỉ nơi đi qua (dùng với góc đường, đường đi)",
            "- 2. で: Phương tiện, địa điểm hành động",
            "- 3. は: Chủ đề",
            "- 4. に: (ĐÚNG) - Chỉ hướng rẽ của chuyển động (右に曲がる)"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(4) 4 句意: 请在下一个转角右转。考察“に”强调动作去向、归着点的用法。"
    },
    38: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 5,
        "opt": 3,
        "snippet": "Trợ từ 「で」: 一人で",
        "meaning": "Hôm qua tôi đã đi xem phim chiếu rạp một mình.",
        "analysis": "• Trợ từ: Trợ từ 「で」 đi sau số lượng người để biểu thị trạng thái, phương thức thực hiện hành động.\n• Cụm từ quen thuộc: 「一人で (một mình làm việc gì)」.",
        "options": [
            "- 1. に: Chỉ thời gian, địa điểm quy tụ",
            "- 2. を: Chỉ tân ngữ",
            "- 3. で: (ĐÚNG) - Chỉ trạng thái đơn độc (一人で: một mình)",
            "- 4. と: Đi cùng với ai (phải là 友達と)"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(5) 3 句意: 我昨天一个人去看了电影。考察“で”表示动作进行时的状态(一人で)。"
    },
    39: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 6,
        "opt": 2,
        "snippet": "Trợ từ 「も」: 田中さんも",
        "meaning": "Hôm nay có buổi hòa nhạc đấy, Tanaka bạn cũng cùng đi nhé!",
        "analysis": "• Trợ từ: Trợ từ 「も」 mang nghĩa 'cũng', dùng khi bổ sung một người khác tham gia cùng hành động tương tự (cùng đi nghe nhạc).",
        "options": [
            "- 1. が: Trợ từ chủ ngữ",
            "- 2. も: (ĐÚNG) - Diễn đạt ý nghĩa bạn cũng tham gia nhé (田中さんも)",
            "- 3. で: Phương tiện, địa điểm",
            "- 4. を: Tân ngữ trực tiếp"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(6) 2 句意: 今天有音乐会，田中你也一起来吧。考察“も”表示同类事物的追加。"
    },
    40: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 7,
        "opt": 3,
        "snippet": "Trợ từ 「の」: 山田さんのですか",
        "meaning": "Chiếc mũ này có phải là đồ của bạn Yamada không?",
        "analysis": "• Trợ từ thay thế danh từ: Cụm 「山田さんの (của Yamada)」 là cách nói rút gọn thay thế cho 「山田さんの帽子 (chiếc mũ của Yamada)」 để tránh lặp lại từ đã đề cập phía trước.",
        "options": [
            "- 1. を: Trợ từ tân ngữ",
            "- 2. に: Trợ từ mục đích",
            "- 3. の: (ĐÚNG) - Sở hữu cách rút gọn thay thế danh từ",
            "- 4. で: Trợ từ phương tiện"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(7) 3 句意: 这顶帽子是山田你的吗? 考察“の”表示所有、所属的用法，省略了前文提及的名词。"
    },
    41: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 8,
        "opt": 1,
        "snippet": "Trợ từ 「ぐらい」: 1000円ぐらい",
        "meaning": "Đi xe taxi đến nhà ga mất khoảng chừng 1.000 Yên.",
        "analysis": "• Trợ từ chỉ lượng ước lượng: 「ぐらい / くらい」 đi sau số từ để biểu thị số lượng xấp xỉ, phỏng chừng khoảng 1.000 Yên.",
        "options": [
            "- 1. ぐらい: (ĐÚNG) - Biểu thị số lượng ước lượng xấp xỉ",
            "- 2. ごろ: Biểu thị mốc thời điểm (3時ごろ)",
            "- 3. まで: Đến tận khi nào",
            "- 4. も: Nhấn mạnh số lượng nhiều"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(8) 1 句意: 坐出租车去车站大约要1000日元。左右、大约表示大致数量用“ぐらい”。"
    },
    42: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 9,
        "opt": 3,
        "snippet": "Từ vựng thời gian: 来週 (tuần sau)",
        "meaning": "Tạm biệt nhé, hẹn gặp lại bạn vào tuần sau!",
        "analysis": "• Ngữ cảnh giao tiếp hẹn gặp: Câu nói chia tay tạm biệt (じゃ、また～) hướng về thời điểm trong tương lai. 「来週 (tuần sau)」 là phương án duy nhất biểu thị thời điểm tương lai thích hợp.",
        "options": [
            "- 1. おととい: Hôm kia (quá khứ)",
            "- 2. 今日: Hôm nay (sắp chia tay nên không hẹn hôm nay)",
            "- 3. 来週: (ĐÚNG) - Hẹn gặp lại vào tuần sau",
            "- 4. 今月: Tháng này"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(9) 3 句意: 再见，我们下周见。根据对话内容可知，约定的是未来某时间再见，选“来週”。"
    },
    43: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 10,
        "opt": 3,
        "snippet": "So sánh hơn kém: 5才若いです",
        "meaning": "Mẹ tôi 50 tuổi, bố tôi 55 tuổi, mẹ kém bố 5 tuổi.",
        "analysis": "• Cấu trúc so sánh: Trong cấu trúc so sánh hơn kém, đối tượng làm tiêu chuẩn so sánh đi với trợ từ 「より」: A は B より [độ chênh lệch] + Tính từ.\n• Mẹ trẻ hơn bố: 「母は 父より 5才 若いです」.",
        "options": [
            "- 1. から: Từ điểm khởi đầu",
            "- 2. まで: Cho đến tận",
            "- 3. より: (ĐÚNG) - Tiêu chuẩn so sánh (hơn so với bố)",
            "- 4. のほうが: Phải đi với vế được chọn hơn"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(10) 3 句意: 我的母亲50岁，父亲55岁，母亲比父亲小5岁。考察比较句型“より”。"
    },
    44: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 11,
        "opt": 1,
        "snippet": "Cấu trúc 「まえに」: 食べる まえに",
        "meaning": "Trước khi ăn cơm thì hãy đi rửa sạch tay trước đã nhé.",
        "analysis": "• Mẫu ngữ pháp N5: 「V-る + まえに (Trước khi làm hành động V)」.\n• Động từ đứng trước まえに luôn phải chia ở thể từ điển (V-ru). Ở đây là 「食べるまえに」.",
        "options": [
            "- 1. まえに: (ĐÚNG) - Trước khi ăn cơm (V-る まえに)",
            "- 2. あとに: Phải đi với V-た あとで (sau khi)",
            "- 3. ときに: Khi đang làm",
            "- 4. ながら: Vừa làm cái này vừa làm cái kia"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(11) 1 句意: 吃之前先去洗手吧。“まえに”意为在……之前，前接动词基本形。"
    },
    45: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 12,
        "opt": 1,
        "snippet": "Phó từ 「あまり」 đi với phủ định",
        "meaning": "Tuy Tokyo có tuyết nhưng năm ngoái trời chẳng rơi mấy hạt tuyết nào.",
        "analysis": "• Phó từ đi kèm phủ định: Cấu trúc 「あまり～ない」 có nghĩa là không... lắm, chẳng... mấy.\n• Câu đi với đuôi phủ định 「降りませんでした」 nên phó từ tương thích tuyệt đối là 「あまり」.",
        "options": [
            "- 1. あまり: (ĐÚNG) - Không rơi mấy (kết hợp với thể phủ định)",
            "- 2. たくさん: Rất nhiều (phải đi với khẳng định)",
            "- 3. とても: Rất (đi với khẳng định)",
            "- 4. ぜんぜん: Hoàn toàn không (ngữ cảnh có rơi ít tuyết)"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(12) 1 句意: 虽然东京会下雪，但去年没怎么下雪。考察句型“あまり～ない”表示没怎么、不太。"
    },
    46: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 13,
        "opt": 4,
        "snippet": "Thể tiếp diễn 「V-て います」: 泳いで います",
        "meaning": "Dưới dòng sông có rất nhiều chú cá nhỏ đang bơi lội tung tăng.",
        "analysis": "• Thể tiếp diễn: Để miêu tả động tác đang trực tiếp diễn ra trước mắt người nói, ta chia động từ ở thể tiếp diễn 「V-て います」.\n• Cá đang bơi: 「小さな魚がたくさん泳いでいます」.",
        "options": [
            "- 1. 泳ぎます: Sẽ bơi (thói quen, tương lai)",
            "- 2. 泳ぎません: Không bơi",
            "- 3. 泳ぎました: Đã bơi xong trong quá khứ",
            "- 4. 泳いで います: (ĐÚNG) - Đang diễn ra trước mắt"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(13) 4 句意: 河里有很多小鱼正游来游去。此处表示鱼正在水里游动，应使用“て います”强调动作正在进行。"
    },
    47: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 14,
        "opt": 2,
        "snippet": "Động từ nhận 「もらう」: 兄に もらいました",
        "meaning": "Chiếc máy ảnh này là do anh trai tặng cho tôi đấy.",
        "analysis": "• Mẫu câu cho nhận N5: 「[Người tặng] に + [Vật] を + もらいました (Nhận được từ ai thứ gì)」.\n• Người nói là người tiếp nhận từ anh trai (兄に), do đó phải dùng động từ 「もらいました」.",
        "options": [
            "- 1. あげました: Cho, tặng người khác",
            "- 2. もらいました: (ĐÚNG) - Nhận được từ anh trai (兄にもらいました)",
            "- 3. うりました: Đã bán đi",
            "- 4. かいました: Mua (phải đi với cửa hàng)"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(14) 2 句意: 是我哥哥送给我的。前接授予者“兄に”，可知需用表示我从他人处得到的“もらう”。"
    },
    48: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 15,
        "opt": 4,
        "snippet": "Đại từ bất định 「何かで」: 何かで 読みました",
        "meaning": "Tôi đã đọc được cách chế biến món trứng rất ngon ở trên tài liệu / sách báo nào đó rồi.",
        "analysis": "• Đại từ bất định: 「何かで」 chỉ một phương tiện hoặc nguồn thông tin không xác định cụ thể (ở một tờ báo, cuốn sách hay trang web nào đó).\n• Đọc được bằng phương tiện gì đi với trợ từ で: 何かで読みました.",
        "options": [
            "- 1. 何に: Vào cái gì",
            "- 2. 何も: Bất cứ cái gì (đi với phủ định)",
            "- 3. 何かへ: Tới cái gì",
            "- 4. 何かで: (ĐÚNG) - Ở trên tài liệu/phương tiện nào đó"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(15) 4 句意: 在什么地方读到了做蛋类料理的好方法。“何かで”表示通过某种不确定的媒介手段。"
    },
    49: {
        "mondai": 1,
        "section": "GRAMMAR",
        "localNum": 16,
        "opt": 1,
        "snippet": "Điện thoại lịch sự: ひろこさんを お願いします",
        "meaning": "A lô, tôi là Kitayama đây ạ. Xin phiền bác cho tôi gặp bạn Hiroko được không ạ?",
        "analysis": "• Giao tiếp điện thoại chuẩn N5: Khi gọi điện đến và muốn nhờ chuyển máy cho ai, mẫu câu lịch sự chuẩn mực là: 「[Tên người] を お願いします」.",
        "options": [
            "- 1. ひろこさんを おねがいします: (ĐÚNG) - Xin vui lòng cho tôi gặp bạn Hiroko",
            "- 2. ひろこさんを ください: Cho tôi Hiroko (sai nghiêm trọng)",
            "- 3. ひろこさんと 話しますか: Bạn có nói chuyện với Hiroko không (hỏi ngược)",
            "- 4. ひろこさんと 話しませんか: Rủ rê nói chuyện"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(16) 1 句意: (电话中) 请帮我找一下弘子。电话礼貌用语为“～をお願いします”。"
    },

    # 問題 2: Sắp xếp từ tạo câu * (50..54 / Local 17..21)
    50: {
        "mondai": 2,
        "section": "GRAMMAR",
        "localNum": 17,
        "opt": 4,
        "snippet": "Sắp xếp câu: くだものは どこ【に】ありますか",
        "meaning": "Xin hỏi hoa quả trái cây thì đang để ở vị trí nào vậy ạ?",
        "analysis": "• Thứ tự sắp xếp câu: 「くだものは (3. は) -> どこ (1. どこ) -> 【4. に★】 -> ありますか (2. あります)」.\n• Trật tự đầy đủ: 3 - 1 - 4★ - 2. Vị trí ngôi sao (*) rơi vào phương án 4 (に).",
        "options": [
            "- 1. どこ: Vị trí 2",
            "- 2. あります: Vị trí 4",
            "- 3. は: Vị trí 1",
            "- 4. に: (ĐÚNG) - Vị trí ngôi sao (*)"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(17) 4 句意: 水果在哪里呢? 排序为：くだものは どこ に ありますか (3-1-4-2)。"
    },
    51: {
        "mondai": 2,
        "section": "GRAMMAR",
        "localNum": 18,
        "opt": 1,
        "snippet": "Sắp xếp câu: ギターの 【れんしゅう】を しています",
        "meaning": "Bạn Yamashita đang ở phòng bên cạnh tập luyện đàn guitar.",
        "analysis": "• Thứ tự sắp xếp câu: 「ギター (3. ギター) -> の (2. の) -> 【1. れんしゅう★】 -> を (4. を) しています」.\n• Trật tự đầy đủ: 3 - 2 - 1★ - 4. Vị trí ngôi sao (*) rơi vào phương án 1 (れんしゅう).",
        "options": [
            "- 1. れんしゅう: (ĐÚNG) - Vị trí ngôi sao (*)",
            "- 2. の: Vị trí 2",
            "- 3. ギター: Vị trí 1",
            "- 4. を: Vị trí 4"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(18) 1 句意: 在隔壁房间练习吉他。排序为：ギターの れんしゅう を しています (3-2-1-4)。"
    },
    52: {
        "mondai": 2,
        "section": "GRAMMAR",
        "localNum": 19,
        "opt": 4,
        "snippet": "Sắp xếp câu: 会社へ 【何で】 行って いますか",
        "meaning": "Hằng ngày bạn đi làm đến công ty bằng phương tiện gì vậy? - Tôi đi bộ đi làm.",
        "analysis": "• Thứ tự sắp xếp câu: 「会社 (3. 会社) -> へ (2. へ) -> 【4. 何で★】 -> 行って (1. 行って) いますか」.\n• Trật tự đầy đủ: 3 - 2 - 4★ - 1. Vị trí ngôi sao (*) rơi vào phương án 4 (何で).",
        "options": [
            "- 1. 行って: Vị trí 4",
            "- 2. へ: Vị trí 2",
            "- 3. 会社: Vị trí 1",
            "- 4. 何で: (ĐÚNG) - Vị trí ngôi sao (*)"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(19) 4 句意: 每天怎么去公司? 排序为：会社へ 何で 行って いますか (3-2-4-1)。"
    },
    53: {
        "mondai": 2,
        "section": "GRAMMAR",
        "localNum": 20,
        "opt": 2,
        "snippet": "Sắp xếp câu: 部屋を 【きれいに】 しました",
        "meaning": "Trước khi bạn bè ghé chơi, tôi đã dọn dẹp căn phòng thật sạch sẽ.",
        "analysis": "• Cấu trúc: 「Tính từ đuôi な + に + します (Làm cho cái gì trở nên như thế nào)」.\n• Trật tự ghép: 部屋を -> きれいに★ -> しました. Vị trí ngôi sao là phương án 2.",
        "options": [
            "- 1. 部屋を: Vị trí 1",
            "- 2. きれいに: (ĐÚNG) - Vị trí ngôi sao (*)",
            "- 3. そうじ: Vị trí phụ",
            "- 4. しました: Vị trí 3"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(20) 2 句意: 把房间打扫干净了。排序为：部屋を きれいに しました。"
    },
    54: {
        "mondai": 2,
        "section": "GRAMMAR",
        "localNum": 21,
        "opt": 2,
        "snippet": "Sắp xếp câu: 昨日のテストは 【難しく】 なかったです",
        "meaning": "Bài kiểm tra ngày hôm qua không khó chút nào cả.",
        "analysis": "• Phủ định quá khứ tính từ đuôi い: 「Tính từ bỏ い + く + なかったです」.\n• Trật tự ghép: 昨日のテストは -> あまり -> 難しく★ -> なかったです. Vị trí ngôi sao là phương án 2.",
        "options": [
            "- 1. テストは: Vị trí 1",
            "- 2. 難しく: (ĐÚNG) - Vị trí ngôi sao (*)",
            "- 3. あまり: Vị trí 2",
            "- 4. なかったです: Vị trí 4"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(21) 2 句意: 昨天的考试不太难。排序为：テストは あまり 難しく なかったです。"
    },

    # 問題 3: Ngữ pháp đoạn văn (55..59 / Local 22..26)
    55: {
        "mondai": 3,
        "section": "GRAMMAR",
        "localNum": 22,
        "opt": 4,
        "snippet": "Điền đoạn văn: 日本に 【来てから】",
        "meaning": "Sau khi đến Nhật Bản, tôi đã được đi ăn ở rất nhiều quán ăn khác nhau.",
        "analysis": "• Cấu trúc: 「V-て + から (Sau khi làm hành động gì...)」 biểu thị mốc thời gian sau khi sang Nhật.\n• Phương án 4 「来てから」 chuẩn xác ngữ pháp và ngữ cảnh của bài viết.",
        "options": [
            "- 1. 行くから: Vì sẽ đi",
            "- 2. 行ってから: Sau khi đi đến đó",
            "- 3. 来るから: Vì sẽ đến",
            "- 4. 来てから: (ĐÚNG) - Kể từ sau khi đến Nhật Bản (V-て から)"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(22) 4 句意: 来到日本之后，去了很多店吃寿司。考察“てから”表示……之后。"
    },
    56: {
        "mondai": 3,
        "section": "GRAMMAR",
        "localNum": 23,
        "opt": 2,
        "snippet": "Điền đoạn văn: いっしょに 【行きませんか】",
        "meaning": "Những ai thích món sushi, hãy cùng tôi đi ăn nhé!",
        "analysis": "• Lời rủ rê mời mọc: Cấu trúc 「V-ます bỏ ます + ませんか (Cùng làm việc gì với tôi nhé?)」 đi kèm phó từ 「いっしょに (cùng nhau)」 tạo thành câu rủ rê bạn bè chuẩn xác.",
        "options": [
            "- 1. 行きましたか: Bạn đã đi chưa? (câu hỏi quá khứ)",
            "- 2. 行きませんか: (ĐÚNG) - Lời rủ rê cùng nhau đi nhé (いっしょに行きませんか)",
            "- 3. 行っていましたか: Bạn đã từng đi chưa?",
            "- 4. 行っていませんか: Không đi à?"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(23) 2 句意: 喜欢寿司的人，大家一起去吧! 考察动词否定疑问句表示委婉邀请。"
    },
    57: {
        "mondai": 3,
        "section": "GRAMMAR",
        "localNum": 24,
        "opt": 4,
        "snippet": "Điền đoạn văn: 本屋 【は】",
        "meaning": "Hiệu sách ở gần nhà ga là một cửa hàng rất lớn.",
        "analysis": "• Trợ từ chủ đề: Cụm từ 「えきの ちかくの 本屋 (hiệu sách ở gần ga)」 được đưa lên làm chủ đề chính của câu miêu tả nên cần đi với trợ từ 「は」.",
        "options": [
            "- 1. か: Câu hỏi hoặc nghi vấn",
            "- 2. を: Tân ngữ",
            "- 3. の: Sở hữu",
            "- 4. は: (ĐÚNG) - Trợ từ nêu chủ đề (hiệu sách ở gần ga thì...)"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(24) 4 句意: 车站附近的书店是一家很大的店铺。考察“は”作为主题提示助词。"
    },
    58: {
        "mondai": 3,
        "section": "GRAMMAR",
        "localNum": 25,
        "opt": 3,
        "snippet": "Điền đoạn văn: 私の国の本も 【あります】",
        "meaning": "Ở hiệu sách đó cũng có bán cả sách của đất nước tôi nữa.",
        "analysis": "• Tồn tại từ vật: Danh từ là sách 「本 (sách)」 là vật vô tri vô giác, do đó động từ chỉ sự tồn tại phải là 「あります」 (không dùng います dành cho người/động vật).",
        "options": [
            "- 1. います: Dùng cho người hoặc sinh vật sống",
            "- 2. 読みます: Đọc sách",
            "- 3. あります: (ĐÚNG) - Động từ tồn tại đồ vật (sách có ở đó)",
            "- 4. します: Làm"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(25) 3 句意: 我国家的书也有。无生命物体存在使用“あります”。"
    },
    59: {
        "mondai": 3,
        "section": "GRAMMAR",
        "localNum": 26,
        "opt": 1,
        "snippet": "Điền đoạn văn: 【だから】",
        "meaning": "Vì thế cho nên, tôi lúc nào cũng mua sách ở hiệu sách gần nhà ga này.",
        "analysis": "• Liên từ nguyên nhân kết quả: Do các ưu điểm đã nêu ở câu trước (sách lớn, có sách nước mình, nhiều sách nấu ăn), dẫn đến kết quả luôn mua sách ở đây. Liên từ kết nối thích hợp là 「だから (vì thế, do đó)」.",
        "options": [
            "- 1. だから: (ĐÚNG) - Vì thế, do đó (kết nối nguyên nhân kết quả)",
            "- 2. では: Vậy thì",
            "- 3. それから: Sau đó, tiếp theo",
            "- 4. でも: Nhưng mà (chỉ sự đối lập)"
        ],
        "pdfPage": 17,
        "rawExcerpt": "(26) 1 句意: 因此我总是在车站附近的书店买书。考察顺接因果连词“だから”。"
    },

    # 問題 4: Đọc hiểu ngắn (60..62 / Local 27..29)
    60: {
        "mondai": 4,
        "section": "READING",
        "localNum": 27,
        "opt": 2,
        "snippet": "Đọc hiểu ngắn: Hôm nay tác giả đã làm gì?",
        "meaning": "Nhân vật 'Tôi' hôm nay đã làm việc gì cùng với bạn?",
        "analysis": "• Căn cứ thông tin: Hai câu đầu của đoạn văn viết rõ: tác giả cùng bạn bè đi mua sắm và đã mua đĩa DVD của bộ phim mình từng xem 3 tháng trước.\n• Phương án 2 phản ánh chính xác 100% nội dung bài đọc.",
        "options": [
            "- 1. Đi xem phim chiếu rạp cùng bạn",
            "- 2. Đi mua sắm và mua đĩa DVD bộ phim yêu thích: (ĐÚNG)",
            "- 3. Ở nhà xem tivi",
            "- 4. Đi mượn sách ở thư viện"
        ],
        "pdfPage": 18,
        "rawExcerpt": "(27) 2 关键内容在文章的前两句。作者今天和朋友去购物，买了自己3个月前看过的电影的DVD碟片。"
    },
    61: {
        "mondai": 4,
        "section": "READING",
        "localNum": 28,
        "opt": 3,
        "snippet": "Đọc hiểu ngắn: Căn phòng hiện tại là phòng nào?",
        "meaning": "Căn phòng hiện tại của tác giả có những đồ vật gì?",
        "analysis": "• Căn cứ thông tin: Đọc toàn bài, căn phòng của tác giả có một chiếc bàn, hai chiếc ghế và một giá sách chứa rất nhiều sách.\n• Đối chiếu với các hình minh họa/miêu tả, phương án 3 là phương án thỏa mãn đầy đủ các chi tiết trên.",
        "options": [
            "- 1. Phòng có 2 bàn và không có giá sách",
            "- 2. Phòng có 1 bàn, 1 ghế và tủ quần áo",
            "- 3. Phòng có 1 bàn, 2 ghế và 1 giá sách: (ĐÚNG)",
            "- 4. Phòng không có đồ đạc gì"
        ],
        "pdfPage": 18,
        "rawExcerpt": "(28) 3 通读全文可知，作者的房间里有1张桌子、两把椅子和一个书架，书架里有很多书。正确选项为3。"
    },
    62: {
        "mondai": 4,
        "section": "READING",
        "localNum": 29,
        "opt": 4,
        "snippet": "Đọc hiểu ngắn: Anh Mori xử lý sách thế nào sau khi photo?",
        "meaning": "Anh Mori sau khi photo 25 bản tài liệu xong thì phải để cuốn sách ở đâu?",
        "analysis": "• Căn cứ mẩu giấy nhắn: Thầy Yamaguchi dặn: 'Bản photo hãy đưa cho bạn Minami. Còn cuốn sách thì mai thầy sẽ trả lại, nên hãy để trên bàn làm việc của thầy (わたしの机の上に置いてください)'.\n• Do đó, sách phải để trên bàn làm việc của thầy Yamaguchi (phương án 4).",
        "options": [
            "- 1. Mang lên lớp học để dùng",
            "- 2. Đưa cho bạn Minami",
            "- 3. Tự mình đem trả lại cho thầy Nakagawa",
            "- 4. Đặt lên trên mặt bàn làm việc của thầy Yamaguchi: (ĐÚNG)"
        ],
        "pdfPage": 18,
        "rawExcerpt": "(29) 4 关键内容在文章最后一句。山口老师让森先生在复印完后，把书放在他的桌上。"
    },

    # 問題 5: Đọc hiểu trung bình (63..64 / Local 30..31)
    63: {
        "mondai": 5,
        "section": "READING",
        "localNum": 30,
        "opt": 4,
        "snippet": "Đọc hiểu trung: Tại sao tác giả lại gặp khó khăn?",
        "meaning": "Tại sao khi bước xuống tàu điện tác giả lại cảm thấy bối rối, lo lắng?",
        "analysis": "• Căn cứ câu then chốt: Đoạn 2 viết: 'Tôi xuống tàu ở ga gần nhà. Bên ngoài trời đổ mưa, nhưng tôi lại không mang theo ô nên cảm thấy rất khó khăn (外は雨でしたが、わたしはかさがありませんでした。とてもこまりました)'.\n• Lý do là tác giả không có ô khi trời mưa (phương án 4).",
        "options": [
            "- 1. Vì về đến ga vào giờ quá muộn",
            "- 2. Vì công việc quá nhiều áp lực",
            "- 3. Vì quá mệt mỏi sau ngày dài",
            "- 4. Vì trời mưa mà bản thân không mang theo ô (かさがなかったから): (ĐÚNG)"
        ],
        "pdfPage": 18,
        "rawExcerpt": "(30) 4 关键句是第二段前两句。作者下车后发现下雨了，但是他没有带伞，因此感到很困扰。"
    },
    64: {
        "mondai": 5,
        "section": "READING",
        "localNum": 31,
        "opt": 3,
        "snippet": "Đọc hiểu trung: Ngày mai tác giả phải làm gì?",
        "meaning": "Ngày mai nhân vật 'Tôi' cần phải làm hành động gì với chiếc ô mượn ở nhà ga?",
        "analysis": "• Căn cứ lời dặn của nhân viên nhà ga: 'Đây là ô chung cho mọi người mượn, không mất tiền. Ngày mai bạn hãy trả lại vào chiếc hộp đó nhé (あした、あのはこにかえしてください)'.\n• Do đó, tác giả ngày mai chỉ cần đem chiếc ô trả lại vào trong chiếc hộp ở nhà ga (phương án 3).",
        "options": [
            "- 1. Bỏ tiền vào trong hộp",
            "- 2. Đem tiền trả cho nhân viên nhà ga",
            "- 3. Đem chiếc ô trả lại vào trong chiếc hộp ở ga: (ĐÚNG)",
            "- 4. Đưa trả chiếc ô trực tiếp cho nhân viên"
        ],
        "pdfPage": 18,
        "rawExcerpt": "(31) 3 关键句是文章倒数第二段中的“あした、あのはこにかえしてください”。作者明天只需将伞放回原来的盒子里即可。"
    },

    # 問題 6: Tìm kiếm thông tin (65 / Local 32)
    65: {
        "mondai": 6,
        "section": "READING",
        "localNum": 32,
        "opt": 2,
        "snippet": "Tìm kiếm thông tin: Mua giấy vệ sinh, thịt và rau cùng ngày giá rẻ",
        "meaning": "Muốn mua cả 3 mặt hàng gồm giấy vệ sinh, thịt và rau vào cùng một ngày giảm giá thì đi vào ngày nào?",
        "analysis": "• Tra cứu thông tin trên tờ rơi siêu thị Arakiya:\n  - Giấy vệ sinh giảm giá từ 11/6 (Thứ 2) đến 14/6 (Thứ 5).\n  - Thịt và rau củ giảm giá vào Thứ 4 và Thứ 5 hàng tuần.\n• Giao của 2 khoảng thời gian này là Thứ 4 (ngày 13/6) và Thứ 5 (ngày 14/6).\n• Do đó, ngày 13 và 14 tháng 6 là phương án chuẩn xác duy nhất (phương án 2).",
        "options": [
            "- 1. Ngày 17/6 (Chủ nhật) và 18/6 (Thứ 2)",
            "- 2. Ngày 13/6 (Thứ Tư) và 14/6 (Thứ Năm): (ĐÚNG) - Cả 3 mặt hàng cùng giảm giá",
            "- 3. Ngày 15/6 (Thứ Sáu) và 16/6 (Thứ Bảy)",
            "- 4. Ngày 11/6 (Thứ Hai) và 12/6 (Thứ Ba)"
        ],
        "pdfPage": 18,
        "rawExcerpt": "(32) 2 根据题干提取关键信息。厕纸在11至14日做活动，肉和蔬菜在周三、周四做活动。交集为13日(周三)和14日(周四)。"
    },

    # ==================== MÔN 3: NGHE HIỂU (CHOUKAI 66..89) ====================
    # もんだい 1: Nghe hiểu sự việc (66..72 / Local 1..7)
    66: {
        "mondai": 1,
        "section": "LISTENING",
        "localNum": 1,
        "opt": 2,
        "snippet": "Choukai M1-1: 女の人は、どの靴下を買いますか",
        "meaning": "Người phụ nữ quyết định mua đôi tất / vớ nào?",
        "analysis": "• Căn cứ đoạn thoại bài nghe: Người phụ nữ ban đầu phân vân giữa các mẫu tất, nhưng người bán hàng giới thiệu mẫu họa tiết động vật đáng yêu. Người phụ nữ đồng ý: 'そうですね。動物のをください (Thế thì cho tôi lấy đôi có hình động vật nhé)'.\n• Phương án 2 là phương án chính xác.",
        "options": [
            "- 1. Đôi tất trơn màu",
            "- 2. Đôi tất có hình động vật (動物の靴下): (ĐÚNG)",
            "- 3. Đôi tất kẻ sọc",
            "- 4. Đôi tất chấm bi"
        ],
        "audioJa": "【音声テキスト】\n女の人が店員と話しています。どの靴下を買いますか。\n男：いらっしゃいませ。こちらの靴下はいかがですか。動物の絵がついていて人気ですよ。\n女：そうですね。じゃあ、動物のをください。\n男：ありがとうございます。",
        "audioVi": "【Bản dịch Script】\nNgười phụ nữ đang nói chuyện với nhân viên bán hàng:\nNam: Kính chào quý khách. Đôi tất này thì sao ạ? Có hình động vật rất được ưa chuộng đấy ạ.\nNữ: Được đấy nhỉ. Vậy cho tôi lấy đôi hình động vật nhé.\nNam: Xin cảm ơn quý khách.",
        "pdfPage": 19
    },
    67: {
        "mondai": 1,
        "section": "LISTENING",
        "localNum": 2,
        "opt": 2,
        "snippet": "Choukai M1-2: 女の人は、一日に何回くすりを飲みますか",
        "meaning": "Người phụ nữ mỗi ngày phải uống thuốc mấy lần?",
        "analysis": "• Căn cứ lời dặn của bác sĩ: 'Thuốc này hãy uống sau bữa ăn sáng và tối (朝と夜、ご飯を食べたあとで)'. Người nữ hỏi buổi trưa thì bác sĩ dặn: 'Buổi trưa không được uống nhé (昼は飲まないでください)'.\n• Vậy mỗi ngày chỉ uống 2 lần (sáng và tối) -> Phương án 2.",
        "options": [
            "- 1. Uống 1 lần mỗi ngày",
            "- 2. Uống 2 lần mỗi ngày (sáng và tối): (ĐÚNG)",
            "- 3. Uống 3 lần mỗi ngày",
            "- 4. Uống 4 lần mỗi ngày"
        ],
        "audioJa": "【音声テキスト】\n病院で、医者と女の人が話しています。\n男：このくすりは、朝と夜、ご飯を食べたあとで飲んでください。\n女：昼ご飯のあとは？\n男：昼は飲まないでください。\n女：はい。\n男：4日間飲んでくださいね。\n女：わかりました。\n質問：女の人は、一日に何回くすりを飲みますか。",
        "audioVi": "【Bản dịch Script】\nBác sĩ và người phụ nữ đang nói chuyện tại bệnh viện:\nBác sĩ: Thuốc này hãy uống sau bữa ăn sáng và bữa ăn tối nhé.\nNữ: Sau bữa trưa thì sao ạ?\nBác sĩ: Buổi trưa thì đừng uống nhé.\nNữ: Vâng ạ.\nBác sĩ: Hãy uống liên tục trong 4 ngày nhé.\nNữ: Vâng, tôi hiểu rồi ạ.\nCâu hỏi: Người phụ nữ một ngày uống thuốc mấy lần?",
        "pdfPage": 19
    },
    68: {
        "mondai": 1,
        "section": "LISTENING",
        "localNum": 3,
        "opt": 3,
        "snippet": "Choukai M1-3: 店の人はどのかばんを取りますか",
        "meaning": "Người nhân viên bán hàng sẽ lấy chiếc túi xách nào đưa cho khách?",
        "analysis": "• Căn cứ cuộc đối thoại: Khách hàng yêu cầu: 'Xin lấy giúp tôi chiếc túi màu đen ở phía trên kia'. Người bán hàng hỏi lại: 'Có phải chiếc nhỏ này không?'. Khách nói: 'Không, chiếc to cơ (いいえ。大きいのです)'.\n• Nhân viên lấy chiếc túi to màu đen ở hàng trên -> Phương án 3.",
        "options": [
            "- 1. Chiếc túi nhỏ màu đen ở dưới",
            "- 2. Chiếc túi to màu trắng ở trên",
            "- 3. Chiếc túi to màu đen ở phía trên (上の黒い大きいかばん): (ĐÚNG)",
            "- 4. Chiếc túi nhỏ màu đen ở trên"
        ],
        "audioJa": "【音声テキスト】\nデパートで、女の人と店の人が話しています。\n女：すみません。その上の黒いかばんを取ってください。\n男：どちらですか。この小さいのですか。\n女：いいえ。大きいのです。\n男：はい。\n質問：店の人はどのかばんを取りますか。",
        "audioVi": "【Bản dịch Script】\nTại trung tâm thương mại, khách nữ và nhân viên bán hàng nói chuyện:\nNữ: Xin lỗi, xin hãy lấy giúp tôi chiếc túi xách màu đen ở phía trên kia với ạ.\nNam: Chiếc nào ạ? Có phải chiếc nhỏ này không ạ?\nNữ: Không phải. Là chiếc to ấy ạ.\nNam: Vâng, có ngay đây ạ.\nCâu hỏi: Người nhân viên bán hàng sẽ lấy chiếc túi nào?",
        "pdfPage": 19
    },
    69: {
        "mondai": 1,
        "section": "LISTENING",
        "localNum": 4,
        "opt": 1,
        "snippet": "Choukai M1-4: 学生は机の上に何を置きますか",
        "meaning": "Các bạn học sinh phải để những đồ vật gì lên trên bàn học?",
        "analysis": "• Căn cứ lời thầy giáo phổ biến bài thi: Thầy dặn lấy từ điển ra để lên bàn vì có phần dùng từ điển (辞書を出してください), lấy bút chì và tẩy ra (鉛筆と消しゴムも出してください). Còn đồng hồ và vở thì cất vào trong cặp.\n• Vậy trên bàn có: Từ điển, bút chì và tẩy -> Phương án 1.",
        "options": [
            "- 1. Từ điển, bút chì và cục tẩy (辞書・鉛筆・消しゴム): (ĐÚNG)",
            "- 2. Vở ghi, bút chì và thước kẻ",
            "- 3. Đồng hồ, bút bi và từ điển",
            "- 4. Sách giáo khoa và đồng hồ"
        ],
        "audioJa": "【音声テキスト】\n先生が学生に話しています。\n男：今からテストをします。このテストでは辞書を使う問題がありますから、机の上に辞書を出してください。鉛筆と消しゴムも出してください。時計はカバンの中に入れてください。\n女：先生、ノートはどうしますか。\n男：ノートもカバンの中に入れてください。\n質問：学生は机の上に何を置きますか。",
        "audioVi": "【Bản dịch Script】\nThầy giáo phổ biến quy chế thi:\nThầy giáo: Bây giờ chúng ta sẽ làm bài thi. Bài thi này có phần tra cứu nên các em hãy để từ điển lên trên mặt bàn nhé. Bút chì và tẩy cũng để lên bàn luôn. Đồng hồ thì hãy cất vào trong cặp.\nHọc sinh: Thưa thầy, còn vở ghi thì sao ạ?\nThầy giáo: Vở ghi cũng cất vào trong cặp nhé.\nCâu hỏi: Học sinh sẽ để những đồ vật gì lên bàn?",
        "pdfPage": 19
    },
    70: {
        "mondai": 1,
        "section": "LISTENING",
        "localNum": 5,
        "opt": 1,
        "snippet": "Choukai M1-5: 学生は、始めになにをしますか",
        "meaning": "Các bạn học sinh sẽ làm hành động gì trước tiên?",
        "analysis": "• Căn cứ hướng dẫn viên du lịch nói trên xe bus: 'Đoàn đã đến khách sạn. Bây giờ chúng ta sẽ ăn tối tại nhà hàng tầng 1. Bữa tối bắt đầu từ 7 giờ, bây giờ là 6 giờ 50 rồi nên hãy đi ngay nhé. Hành lý thì nhân viên khách sạn sẽ tự mang lên phòng'.\n• Hành động làm trước tiên là đi đến nhà hàng tầng 1 ăn tối -> Phương án 1.",
        "options": [
            "- 1. Đến nhà hàng tầng 1 ăn tối trước tiên (晩ご飯を食べる): (ĐÚNG)",
            "- 2. Mang hành lý lên phòng ngủ",
            "- 3. Đi mua sắm đồ lưu niệm",
            "- 4. Xem tivi ở phòng nghỉ"
        ],
        "audioJa": "【音声テキスト】\nバスの中で旅行会社の人が話しています。\n女：皆さん、ホテルに着きました。今から1階のレストランで晩ご飯を食べます。晩ご飯は7時からです。今6時50分ですから、すぐに行ってください。皆さんの荷物は、ホテルの人が部屋に持って行きます。\n質問：学生は、始めになにをしますか。",
        "audioVi": "【Bản dịch Script】\nHướng dẫn viên du lịch nói trên xe bus:\nNữ: Thưa các bạn, chúng ta đã đến khách sạn rồi. Bây giờ chúng ta sẽ ăn bữa tối tại nhà hàng ở tầng 1. Bữa ăn bắt đầu từ 7 giờ, hiện tại là 6 giờ 50 phút rồi nên xin mời các bạn đi ngay nhé. Hành lý của mọi người sẽ có nhân viên khách sạn mang lên phòng giúp.\nCâu hỏi: Học sinh sẽ làm gì đầu tiên?",
        "pdfPage": 19
    },
    71: {
        "mondai": 1,
        "section": "LISTENING",
        "localNum": 6,
        "opt": 2,
        "snippet": "Choukai M1-6: 男の人は何を持っていきますか",
        "meaning": "Người đàn ông sẽ chuẩn bị và mang theo thứ gì đi biển?",
        "analysis": "• Căn cứ phân công chuẩn bị đi biển: Người nữ nói: 'Tôi sẽ mang cơm nắm onigiri'. Người nữ ban đầu bảo bạn nam mang đồ uống và bánh kẹo. Nhưng sau đó bạn nữ đổi ý: 'À, đồ uống nặng lắm, đến biển rồi mình hãy mua nhé'. Bạn nam đồng ý.\n• Vậy bạn nam chỉ cần mang theo bánh kẹo (お菓子) -> Phương án 2.",
        "options": [
            "- 1. Cơm nắm và nước ngọt",
            "- 2. Bánh kẹo ăn vặt (お菓子): (ĐÚNG)",
            "- 3. Đồ uống và hoa quả",
            "- 4. Cơm nắm và bánh ngọt"
        ],
        "audioJa": "【音声テキスト】\n男の人と女の人が話しています。\n男：来週の日曜日、海へ行きますね。何を持っていきましょうか。\n女：わたしはおにぎりを持っていきます。\n男：じゃあ、僕は……\n女：飲み物とお菓子をお願いします。\n男：はい。飲み物とお菓子ですね。\n女：あ、飲み物は重いですね。海に着いてから買いましょう。\n男：そうですね。\n質問：男の人は何を持っていきますか。",
        "audioVi": "【Bản dịch Script】\nHai bạn trẻ bàn việc đi biển:\nNam: Chủ nhật tuần sau chúng mình đi biển nhỉ. Mình nên mang theo gì đây?\nNữ: Tôi sẽ mang theo cơm nắm onigiri nhé.\nNam: Vậy còn tôi...\nNữ: Bạn mang giúp tôi đồ uống và bánh kẹo nhé.\nNam: Được, đồ uống và bánh kẹo nhé.\nNữ: À thôi, đồ uống xách nặng lắm. Đến biển rồi chúng mình hãy mua nhé.\nNam: Ừ, thế cũng hay đấy.\nCâu hỏi: Người đàn ông sẽ mang theo gì?",
        "pdfPage": 19
    },
    72: {
        "mondai": 1,
        "section": "LISTENING",
        "localNum": 7,
        "opt": 3,
        "snippet": "Choukai M1-7: 女の人は、何番のバスに乗りますか",
        "meaning": "Người phụ nữ sẽ lên xe buýt số mấy để đi đến ga Midori?",
        "analysis": "• Căn cứ hội thoại tại bến xe bus: Đến ga Midori có xe số 3, số 5 và số 7. Nhưng hôm nay là Chủ nhật nên xe số 5 không chạy. Xe số 3 chỉ chạy vào buổi sáng sớm và chiều tối. Thời điểm hiện tại phải đi xe số 7 (今の時間は7番ですね).\n• Vậy người nữ phải lên xe buýt số 7 -> Phương án 3.",
        "options": [
            "- 1. Xe buýt số 1",
            "- 2. Xe buýt số 3",
            "- 3. Xe buýt số 7 (7番のバス): (ĐÚNG)",
            "- 4. Xe buýt số 5"
        ],
        "audioJa": "【音声テキスト】\nバス停で、女の人とバス会社の人が話しています。\n女：すみません、1番のバスが緑駅に行きますか。\n男：いいえ、緑駅に行くバスは3番と5番と7番ですよ。\n女：そうですか。\n男：あ、でも今日は日曜日ですから、5番のバスはありません。\n男：それから、3番は朝と夕方のバスですから、今の時間は7番ですね。\n女：わかりました。ありがとうございます。\n質問：女の人は、何番のバスに乗りますか。",
        "audioVi": "【Bản dịch Script】\nTại trạm dừng xe buýt:\nNữ: Xin lỗi, xe buýt số 1 có đi đến nhà ga Midori không ạ?\nNhân viên: Không, xe đi ga Midori có tuyến số 3, số 5 và số 7 cơ ạ.\nNữ: Ra là vậy à.\nNhân viên: À nhưng hôm nay là Chủ Nhật nên tuyến số 5 không chạy đâu nhé.\nNhân viên: Thêm nữa, tuyến số 3 chỉ chạy vào buổi sáng và chiều tối thôi, thời điểm này thì đi tuyến số 7 nhé.\nNữ: Tôi hiểu rồi, xin cảm ơn bác ạ.\nCâu hỏi: Người phụ nữ sẽ đi xe buýt số mấy?",
        "pdfPage": 20
    },

    # もんだい 2: Nghe hiểu điểm chính (73..78 / Local 8..13)
    73: {
        "mondai": 2,
        "section": "LISTENING",
        "localNum": 8,
        "opt": 4,
        "snippet": "Choukai M2-1: 女の学生はきょう何時間勉強しますか",
        "meaning": "Bạn nữ sinh hôm nay dự định học bài trong bao nhiêu tiếng?",
        "analysis": "• Căn cứ bài nghe: Bình thường bạn nữ học khoảng 3 tiếng mỗi ngày. Nhưng bạn nói thêm: 'あ、でも明日はテストがありますから、今日は4時間勉強します (Nhưng vì ngày mai có bài thi nên hôm nay tôi sẽ học 4 tiếng)'.\n• Do đó, hôm nay bạn nữ học 4 tiếng -> Phương án 4.",
        "options": [
            "- 1. Học 1 tiếng",
            "- 2. Học 2 tiếng",
            "- 3. Học 3 tiếng (thường ngày)",
            "- 4. Học 4 tiếng (vì mai thi): (ĐÚNG)"
        ],
        "audioJa": "【音声テキスト】\n大学で、男の学生と女の学生が話しています。\n男：山田さんは、いつも何時間ぐらい勉強しますか。\n女：ううん、毎日3時間ぐらいです。\n男：えっ、私は毎日1時間です。\n女：あ、でも明日はテストがありますから、今日は4時間勉強します。\n男：そうですか。\n質問：女の学生はきょう何時間勉強しますか。",
        "audioVi": "【Bản dịch Script】\nHai sinh viên nói chuyện tại trường đại học:\nNam: Bạn Yamada bình thường mỗi ngày học khoảng mấy tiếng vậy?\nNữ: Ừm, ngày nào tôi cũng học tầm 3 tiếng.\nNam: Ồ, tôi thì chỉ học 1 tiếng mỗi ngày thôi.\nNữ: À, nhưng mà vì ngày mai có bài thi nên hôm nay tôi sẽ học 4 tiếng đấy.\nNam: Ra là vậy à.\nCâu hỏi: Bạn nữ sinh hôm nay sẽ học trong bao nhiêu tiếng?",
        "pdfPage": 20
    },
    74: {
        "mondai": 2,
        "section": "LISTENING",
        "localNum": 9,
        "opt": 3,
        "snippet": "Choukai M2-2: 女の人の電話番号は何番ですか",
        "meaning": "Số điện thoại chính xác của người phụ nữ là số nào?",
        "analysis": "• Căn cứ chi tiết đính chính: Bạn nam hỏi: 'Số của bạn là 512-7734 đúng không?'. Bạn nữ đính chính ngay: 'いいえ、7734じゃなくて、7743です (Không phải 7734 mà là 7743 nhé)'.\n• Vậy số điện thoại đúng là 512-7743 -> Phương án 3.",
        "options": [
            "- 1. Số 512-7734",
            "- 2. Số 512-7344",
            "- 3. Số 512-7743: (ĐÚNG)",
            "- 4. Số 512-7443"
        ],
        "audioJa": "【音声テキスト】\n男の人と女の人が話しています。\n男：あのう、山田さんの電話番号は512-7734ですね。\n女：いいえ、7734じゃなくて、7743です。\n男：えっ、ちょっと待ってください。メモします。512の……\n女：7743です。\n男：はい、ありがとうございました。\n質問：女の人の電話番号は何番ですか。",
        "audioVi": "【Bản dịch Script】\nTrao đổi số điện thoại:\nNam: Xin lỗi, số điện thoại của bạn Yamada là 512-7734 có đúng không nhỉ?\nNữ: Không phải đâu, không phải 7734 mà là 7743 cơ.\nNam: Ơ, đợi tôi một chút để ghi lại nhé. 512 rồi đến...\nNữ: Là 7743 nhé.\nNam: Vâng, cảm ơn bạn rất nhiều nhé.\nCâu hỏi: Số điện thoại của người phụ nữ là số mấy?",
        "pdfPage": 20
    },
    75: {
        "mondai": 2,
        "section": "LISTENING",
        "localNum": 10,
        "opt": 4,
        "snippet": "Choukai M2-3: 男の学生はだれと住んでいますか",
        "meaning": "Bạn nam sinh hiện tại đang sống cùng với ai?",
        "analysis": "• Căn cứ câu hỏi và trả lời: Bạn nữ hỏi có sống cùng bố mẹ không, bạn nam bảo bố mẹ ở xa. Sau đó bạn nam nói rõ: 'いま、姉と一緒に住んでいます (Hiện tại tôi đang sống cùng chị gái)'. Bạn nam có một em trai nhưng em trai sống cùng bố mẹ.\n• Vậy bạn nam hiện đang sống cùng chị gái (姉) -> Phương án 4.",
        "options": [
            "- 1. Sống một mình",
            "- 2. Sống cùng bố mẹ",
            "- 3. Sống cùng em trai",
            "- 4. Sống cùng chị gái (姉と住んでいる): (ĐÚNG)"
        ],
        "audioJa": "【音声テキスト】\n女の学生と男の学生が話しています。\n女：山田さんはお父さんとお母さんと一緒に住んでいますか。\n男：いいえ、両親は遠くに住んでいます。\n女：そうですか。\n男：いま、姉と一緒に住んでいます。\n女：兄弟はひとりですか。\n男：あっ、弟もいますよ。弟は両親と一緒です。\n質問：男の学生はだれと住んでいますか。",
        "audioVi": "【Bản dịch Script】\nTrao đổi về hoàn cảnh gia đình:\nNữ: Bạn Yamada đang sống cùng với bố mẹ à?\nNam: Không, bố mẹ tôi ở tận quê xa cơ.\nNữ: Thế à.\nNam: Hiện giờ tôi đang sống cùng với chị gái.\nNữ: Bạn chỉ có một chị em thôi à?\nNam: À, tôi còn một em trai nữa, em trai thì ở cùng bố mẹ.\nCâu hỏi: Bạn nam sinh đang sống cùng với ai?",
        "pdfPage": 20
    },
    76: {
        "mondai": 2,
        "section": "LISTENING",
        "localNum": 11,
        "opt": 1,
        "snippet": "Choukai M2-4: 二人はどこで昼ご飯を食べますか",
        "meaning": "Hai bạn sinh viên sẽ ăn cơm trưa ở địa điểm nào?",
        "analysis": "• Căn cứ cuộc thảo luận: Hôm nay là thứ Bảy nên căng tin và quán giải khát của trường đều đóng cửa nghỉ. Bạn nam đề xuất: 'じゃあ、パン屋でパンを買って、教室で食べましょうか (Vậy thì chúng mình ra tiệm bánh mua bánh mì rồi đem về phòng học ăn nhé)'. Bạn nữ đồng ý.\n• Địa điểm ăn là tại phòng học (教室) -> Phương án 1.",
        "options": [
            "- 1. Ăn tại phòng học (教室で食べる): (ĐÚNG)",
            "- 2. Ăn ở căng tin nhà ăn của trường",
            "- 3. Ăn ở tiệm bánh mì",
            "- 4. Ăn ở quán giải khát"
        ],
        "audioJa": "【音声テキスト】\n学校で、男の学生と女の学生が話しています。\n男：もう1時ですね。何か食べませんか。\n女：そうですね。でも、今日は土曜日だから、学校の食堂や喫茶店は休みですよ。\n男：じゃあ、パン屋でパンを買って、教室で食べましょうか。\n女：そうですね。\n質問：二人はどこで昼ご飯を食べますか。",
        "audioVi": "【Bản dịch Script】\nTại trường học vào giờ trưa:\nNam: Đã 1 giờ rồi nhỉ. Chúng mình kiếm gì ăn không?\nNữ: Ừ nhỉ. Nhưng mà hôm nay là thứ Bảy nên nhà ăn với quán nước trong trường nghỉ rồi.\nNam: Thế thì ra tiệm bánh mua bánh mì rồi mang vào phòng học ăn nhé?\nNữ: Ừ, làm thế đi.\nCâu hỏi: Hai người sẽ ăn cơm trưa ở đâu?",
        "pdfPage": 20
    },
    77: {
        "mondai": 2,
        "section": "LISTENING",
        "localNum": 12,
        "opt": 3,
        "snippet": "Choukai M2-5: 学生は何で名前を書きますか",
        "meaning": "Học sinh phải dùng loại bút màu gì để viết tên đăng ký?",
        "analysis": "• Căn cứ lời cô giáo: 'Ai muốn tham gia chuyến dã ngoại thì hãy viết tên vào tờ giấy này bằng bút bi nhé. Không dùng bút chì, phải dùng bút bi. Hãy viết bằng mực đen nhé, đừng viết bằng mực đỏ (鉛筆じゃなくて、ボールペンですよ。黒で書いてください。赤で書かないでくださいね)'.\n• Phải viết bằng bút bi mực màu đen -> Phương án 3.",
        "options": [
            "- 1. Bút chì đen",
            "- 2. Bút bi mực đỏ",
            "- 3. Bút bi mực đen (黒のボールペン): (ĐÚNG)",
            "- 4. Bút lông"
        ],
        "audioJa": "【音声テキスト】\n教室で、先生が学生に話しています。\n女：はい。じゃあ、ちょっと聞いてください。ええ、来月のバス旅行に行きたい人は、この紙にボールペンで名前を書いてください。鉛筆じゃなくて、ボールペンですよ。黒で書いてください。赤で書かないでくださいね。\n質問：学生は何で名前を書きますか。",
        "audioVi": "【Bản dịch Script】\nCô giáo dặn dò học sinh trong lớp học:\nCô giáo: Nào, các em hãy chú ý lắng nghe nhé. Những ai muốn tham gia chuyến du lịch bằng xe buýt vào tháng sau thì hãy viết tên vào tờ giấy này bằng bút bi nhé. Không dùng bút chì đâu, phải dùng bút bi đấy. Nhớ viết bằng mực màu đen nhé, đừng dùng mực đỏ đấy nhé.\nCâu hỏi: Học sinh viết tên bằng thứ gì?",
        "pdfPage": 20
    },
    78: {
        "mondai": 2,
        "section": "LISTENING",
        "localNum": 13,
        "opt": 2,
        "snippet": "Choukai M2-6: 二人は明日どこで会いますか",
        "meaning": "Hai bạn ngày mai hẹn gặp nhau tại địa điểm nào?",
        "analysis": "• Căn cứ cuộc hẹn: Ban đầu bạn nữ hẹn 5h ở ga, nhưng bạn nam bảo ở ga đông người lắm. Bạn nữ đề xuất tiếp: 'じゃあ、駅の前の喫茶店はどうですか (Vậy thì gặp ở quán cà phê trước nhà ga thì thế nào?)'. Bạn nam đồng ý: 'はい、そうしましょう'.\n• Địa điểm hẹn gặp là quán cà phê trước nhà ga -> Phương án 2.",
        "options": [
            "- 1. Tại sân vận động bóng đá",
            "- 2. Tại quán cà phê trước nhà ga (駅の前の喫茶店): (ĐÚNG)",
            "- 3. Bên trong nhà ga xe điện",
            "- 4. Tại nhà hàng ăn tối"
        ],
        "audioJa": "【音声テキスト】\n女の学生と男の学生が話しています。\n女：あしたの夜、一緒にサッカーを見に行きませんか。\n男：いいですね。どこで会いましょうか。\n女：5時に駅で会いませんか。\n男：駅は人が多いですよ。\n女：そうですね。じゃあ、駅の前の喫茶店はどうですか。\n男：はい、そうしましょう。あっ、サッカーを見てから、近くのレストランで晩ご飯を食べませんか。\n女：ええ、じゃ、明日5時に会いましょう。\n質問：二人は明日どこで会いますか。",
        "audioVi": "【Bản dịch Script】\nHẹn xem bóng đá:\nNữ: Tối mai cùng đi xem bóng đá với tôi không?\nNam: Hay quá. Gặp nhau ở đâu được nhỉ?\nNữ: 5 giờ gặp ở nhà ga được không?\nNam: Ở nhà ga đông người lắm đấy.\nNữ: Ừ nhỉ. Vậy ở quán cà phê trước nhà ga thì sao?\nNam: Ừ, thế cũng được. Xem bóng đá xong chúng mình đi ăn tối ở nhà hàng gần đó nhé?\nNữ: Vâng, vậy mai 5 giờ gặp nhau nhé.\nCâu hỏi: Hai người ngày mai gặp nhau ở đâu?",
        "pdfPage": 21
    },

    # もんだい 3: Nghe diễn đạt tình huống (79..83 / Local 14..18)
    79: {
        "mondai": 3,
        "section": "LISTENING",
        "localNum": 14,
        "opt": 1,
        "snippet": "Choukai M3-1: ご飯を食べました。なんと言いますか",
        "meaning": "Sau khi ăn cơm xong, bạn sẽ nói câu chào giao tiếp nào?",
        "analysis": "• Văn hóa ứng xử Nhật Bản: Sau khi ăn bữa ăn xong, câu nói cảm ơn chuẩn mực là 「ごちそうさまでした」. Trước khi ăn thì nói 「いただきます」.\n• Phương án 1 chính xác tuyệt đối.",
        "options": [
            "- 1. ごちそうさまでした: (ĐÚNG) - Cảm ơn vì bữa ăn ngon",
            "- 2. いただきます: Nói trước khi bắt đầu ăn",
            "- 3. わかりました: Tôi hiểu rồi"
        ],
        "audioJa": "【音声テキスト】\nご飯を食べました。なんと言いますか。\n1. ごちそうさまでした。\n2. いただきます。\n3. わかりました。",
        "audioVi": "【Bản dịch Script】\nĂn cơm xong rồi thì sẽ nói câu gì?\n1. Cảm ơn vì bữa ăn ngon (ごちそうさまでした).\n2. Xin mời / Tôi xin phép ăn (いただきます).\n3. Tôi hiểu rồi.",
        "pdfPage": 21
    },
    80: {
        "mondai": 3,
        "section": "LISTENING",
        "localNum": 15,
        "opt": 3,
        "snippet": "Choukai M3-2: 電車の中です。女の人が来ました。なんと言いますか",
        "meaning": "Đang ở trên tàu điện thì có người phụ nữ bước đến, bạn muốn nhường chỗ thì nói câu nào?",
        "analysis": "• Tình huống nhường chỗ: Khi muốn nhường ghế cho người khác ngồi, câu nói lịch sự và tự nhiên nhất là: 「ここ、どうぞ (Xin mời ngồi chỗ này ạ)」.\n• Phương án 3 chuẩn xác.",
        "options": [
            "- 1. どうもありがとう: Cảm ơn bạn rất nhiều",
            "- 2. はじめまして: Rất vui được gặp bạn lần đầu",
            "- 3. ここ、どうぞ: (ĐÚNG) - Xin mời ngồi ở đây ạ"
        ],
        "audioJa": "【音声テキスト】\n電車の中です。女の人が来ました。なんと言いますか。\n1. どうもありがとう。\n2. はじめまして。\n3. ここ、どうぞ。",
        "audioVi": "【Bản dịch Script】\nỞ trên tàu điện. Có một phụ nữ đến. Bạn sẽ nói câu gì để nhường ghế?\n1. Cảm ơn bạn rất nhiều.\n2. Rất vui được làm quen.\n3. Xin mời ngồi ở chỗ này ạ (ここ、どうぞ).",
        "pdfPage": 21
    },
    81: {
        "mondai": 3,
        "section": "LISTENING",
        "localNum": 16,
        "opt": 2,
        "snippet": "Choukai M3-3: うちへ帰ります。友達になんと言いますか",
        "meaning": "Bạn chuẩn bị đi về nhà, bạn sẽ nói câu chào tạm biệt nào với bạn bè?",
        "analysis": "• Chào tạm biệt bạn bè: Khi chia tay bạn bè cùng trang lứa để đi về, câu nói thân mật tự nhiên là 「じゃ、また (Hẹn gặp lại sau nhé)」.\n• Phương án 2 chính xác.",
        "options": [
            "- 1. 行ってきます: Tôi đi đây (nói với người trong nhà khi ra ngoài)",
            "- 2. じゃ、また: (ĐÚNG) - Tạm biệt, hẹn gặp lại bạn sau nhé",
            "- 3. ただいま: Tôi đã về rồi đây (nói khi bước chân về đến nhà)"
        ],
        "audioJa": "【音声テキスト】\nうちへ帰ります。友達になんと言いますか。\n1. 行ってきます。\n2. じゃ、また。\n3. ただいま。",
        "audioVi": "【Bản dịch Script】\nBạn chuẩn bị đi về nhà. Bạn sẽ nói gì với bạn bè?\n1. Con đi đây nhé (nói khi rời nhà).\n2. Chào nhé, hẹn gặp lại sau (じゃ、また).\n3. Tôi đã về rồi đây (nói khi về tới nhà).",
        "pdfPage": 21
    },
    82: {
        "mondai": 3,
        "section": "LISTENING",
        "localNum": 17,
        "opt": 3,
        "snippet": "Choukai M3-4: 郵便局で切手を買います。なんと言いますか",
        "meaning": "Bạn đến bưu điện muốn mua tem thì sẽ nói với nhân viên thế nào?",
        "analysis": "• Yêu cầu mua hàng lịch sự: Khi muốn mua đồ tại quầy bưu điện, mẫu câu chuẩn mực là 「[Tên món hàng] を ください (Xin vui lòng bán cho tôi cái này)」.\n• Mua tem: 「切手をください」 -> Phương án 3.",
        "options": [
            "- 1. 切手をかいませんか: Bạn có mua tem không (rủ nhân viên mua)",
            "- 2. 切手をどうぞ: Xin mời bạn lấy tem (mình đưa cho nhân viên)",
            "- 3. 切手をください: (ĐÚNG) - Xin bán cho tôi con tem ạ"
        ],
        "audioJa": "【音声テキスト】\n郵便局で切手を買います。なんと言いますか。\n1. 切手をかいませんか。\n2. 切手をどうぞ。\n3. 切手をください。",
        "audioVi": "【Bản dịch Script】\nMua tem ở bưu điện. Bạn sẽ nói câu gì với nhân viên?\n1. Bạn có mua tem không?\n2. Xin mời bạn lấy tem.\n3. Xin bán cho tôi con tem với ạ (切手をください).",
        "pdfPage": 21
    },
    83: {
        "mondai": 3,
        "section": "LISTENING",
        "localNum": 18,
        "opt": 2,
        "snippet": "Choukai M3-5: 友達は鉛筆がありません。友達になんと言いますか",
        "meaning": "Bạn của bạn không có bút chì, bạn muốn cho mượn thì sẽ nói câu gì?",
        "analysis": "• Đề nghị cho mượn lịch thiệp: Khi thấy bạn thiếu bút, ta đưa bút chì của mình và hỏi lịch sự: 「えんぴつ、使いますか (Bạn có dùng bút chì không? / Dùng bút chì của tôi nhé?)」.\n• Phương án 2 chuẩn xác.",
        "options": [
            "- 1. えんぴつ、借りましょうか: Để tôi đi mượn hộ bút nhé",
            "- 2. えんぴつ、使いますか: (ĐÚNG) - Bạn có dùng bút chì này không?",
            "- 3. えんぴつ、かしてください: Cho tôi mượn bút chì (mình đi xin bạn)"
        ],
        "audioJa": "【音声テキスト】\n友達は鉛筆がありません。友達になんと言いますか。\n1. えんぴつ、借りましょうか。\n2. えんぴつ、使いますか。\n3. えんぴつ、かしてください。",
        "audioVi": "【Bản dịch Script】\nBạn của bạn không có bút chì. Bạn sẽ nói gì với bạn ấy?\n1. Tôi mượn giúp bạn nhé?\n2. Bạn có dùng chiếc bút chì này không? (えんぴつ、使いますか).\n3. Hãy cho tôi mượn chiếc bút chì.",
        "pdfPage": 21
    },

    # もんだい 4: Nghe phản xạ nhanh (84..89 / Local 19..24)
    84: {
        "mondai": 4,
        "section": "LISTENING",
        "localNum": 19,
        "opt": 1,
        "snippet": "Choukai M4-1: 今日は何日ですか",
        "meaning": "Hôm nay là ngày mùng mấy trong tháng?",
        "analysis": "• Hỏi ngày trong tháng 「何日 (なんにち)」: Câu trả lời chuẩn xác chỉ ngày trong tháng là ngày mùng 3 「三日 (みっか) です」.\n• Phương án 1 chính xác.",
        "options": [
            "- 1. 三日です (Hôm nay là ngày mùng 3): (ĐÚNG)",
            "- 2. 三週間です: Ba tuần lễ (khoảng thời gian)",
            "- 3. 3時です: 3 giờ đúng (chỉ giờ giấc)"
        ],
        "audioJa": "【音声テキスト】\n今日は何日ですか。\n1. 三日です。\n2. 三週間です。\n3. 3時です。",
        "audioVi": "【Bản dịch Script】\nHôm nay là ngày mùng mấy?\n1. Là ngày mùng 3 ạ (三日です).\n2. Là 3 tuần lễ.\n3. Là 3 giờ.",
        "pdfPage": 21
    },
    85: {
        "mondai": 4,
        "section": "LISTENING",
        "localNum": 20,
        "opt": 1,
        "snippet": "Choukai M4-2: すみません。図書館はどこですか",
        "meaning": "Xin lỗi cho hỏi thư viện nằm ở đâu vậy ạ?",
        "analysis": "• Hỏi vị trí địa điểm 「どこですか」: Câu phản hồi tự nhiên chỉ vị trí phương hướng là 「あそこです (Ở đằng kia kìa ạ)」.\n• Phương án 1 chính xác.",
        "options": [
            "- 1. あそこです (Ở đằng kia ạ): (ĐÚNG)",
            "- 2. 6時までです: Mở cửa đến 6 giờ",
            "- 3. 本を借ります: Đi mượn sách"
        ],
        "audioJa": "【音声テキスト】\nすみません。図書館はどこですか。\n1. あそこです。\n2. 6時までです。\n3. 本を借ります。",
        "audioVi": "【Bản dịch Script】\nXin lỗi, cho tôi hỏi thư viện ở đâu vậy ạ?\n1. Ở đằng kia ạ (あそこです).\n2. Mở cửa đến 6 giờ.\n3. Mượn sách.",
        "pdfPage": 21
    },
    86: {
        "mondai": 4,
        "section": "LISTENING",
        "localNum": 21,
        "opt": 2,
        "snippet": "Choukai M4-3: 明日、何時に学校にきますか",
        "meaning": "Ngày mai mấy giờ bạn sẽ đến trường học?",
        "analysis": "• Hỏi mốc thời gian 「何時に (mấy giờ)」: Câu trả lời tương thích phải chỉ giờ giấc xác định: 「9時半です (Lúc 9 giờ rưỡi)」.\n• Phương án 2 chuẩn xác.",
        "options": [
            "- 1. バスできます: Đến bằng xe buýt (phương tiện)",
            "- 2. 9時半です (Lúc 9 giờ rưỡi): (ĐÚNG) - Trả lời cho 何時に",
            "- 3. 六人です: 6 người (số lượng người)"
        ],
        "audioJa": "【音声テキスト】\n明日、何時に学校にきますか。\n1. バスできます。\n2. 9時半です。\n3. 六人です。",
        "audioVi": "【Bản dịch Script】\nNgày mai mấy giờ bạn đến trường?\n1. Đến bằng xe buýt.\n2. Lúc 9 giờ rưỡi ạ (9時半です).\n3. Là 6 người.",
        "pdfPage": 21
    },
    87: {
        "mondai": 4,
        "section": "LISTENING",
        "localNum": 22,
        "opt": 3,
        "snippet": "Choukai M4-4: 田中さん、その荷物を持ちましょうか",
        "meaning": "Tanaka ơi, để tôi xách giúp bạn chiếc hành lý đó nhé?",
        "analysis": "• Đáp lại lời đề nghị giúp đỡ: Khi đối phương có nhã ý xách đồ giúp mình (～ましょうか), câu đáp lại sự biết ơn chuẩn mực là 「ありがとうございます (Cảm ơn bạn nhiều nhé)」.\n• Phương án 3 chuẩn xác.",
        "options": [
            "- 1. どういたしまして: Không có gì (đáp lại khi người khác cảm ơn mình)",
            "- 2. 持ちしませんでした: Ngữ pháp sai",
            "- 3. ありがとうございます (Cảm ơn bạn nhiều nhé): (ĐÚNG) - Nhận lời giúp đỡ"
        ],
        "audioJa": "【音声テキスト】\n田中さん、その荷物を持ちましょうか。\n1. どういたしまして。\n2. 持ちしませんでした。\n3. ありがとうございます。",
        "audioVi": "【Bản dịch Script】\nTanaka ơi, để tôi xách giúp bạn đống hành lý đó nhé?\n1. Không có gì đâu.\n2. Đã không cầm (sai ngữ pháp).\n3. Cảm ơn bạn nhiều nhé (ありがとうございます).",
        "pdfPage": 21
    },
    88: {
        "mondai": 4,
        "section": "LISTENING",
        "localNum": 23,
        "opt": 3,
        "snippet": "Choukai M4-5: ちょっと休みませんか",
        "meaning": "Chúng mình nghỉ giải lao một lát đi nhé?",
        "analysis": "• Đáp lại lời rủ rê 「～ませんか」: Khi đồng ý với lời rủ cùng nghỉ ngơi của bạn, câu đối đáp tự nhiên là 「そうしましょう (Ừ, chúng ta làm thế đi!)」.\n• Phương án 3 chuẩn xác.",
        "options": [
            "- 1. 日曜日です: Hôm nay là Chủ nhật",
            "- 2. お元気ですか: Bạn có khỏe không?",
            "- 3. そうしましょう (Ừ, chúng ta cùng nghỉ nhé): (ĐÚNG) - Đồng ý lời rủ rê"
        ],
        "audioJa": "【音声テキスト】\nちょっと休みませんか。\n1. 日曜日です。\n2. お元気ですか。\n3. そうしましょう。",
        "audioVi": "【Bản dịch Script】\nChúng mình nghỉ ngơi một lát đi không?\n1. Là ngày Chủ nhật.\n2. Bạn có khỏe không?\n3. Ừ, chúng mình làm thế đi nhé (そうしましょう).",
        "pdfPage": 21
    },
    89: {
        "mondai": 4,
        "section": "LISTENING",
        "localNum": 24,
        "opt": 1,
        "snippet": "Choukai M4-6: それはなんの本ですか",
        "meaning": "Đó là cuốn sách về chủ đề gì vậy bạn?",
        "analysis": "• Hỏi về nội dung/thể loại sách 「なんの本ですか」: Câu trả lời tương thích phải nêu chủ đề cuốn sách: 「料理の本です (Đó là cuốn sách dạy nấu ăn)」.\n• Phương án 1 chuẩn xác.",
        "options": [
            "- 1. 料理の本です (Đó là cuốn sách dạy nấu ăn): (ĐÚNG)",
            "- 2. 私の本です: Đó là sách của tôi (trả lời cho だれの本)",
            "- 3. はい、そうです: Vâng, đúng rồi (lệch câu hỏi)"
        ],
        "audioJa": "【音声テキスト】\nそれはなんの本ですか。\n1. 料理の本です。\n2. 私の本です。\n3. はい、そうです。",
        "audioVi": "【Bản dịch Script】\nĐó là cuốn sách gì vậy?\n1. Là cuốn sách dạy nấu ăn (料理の本です).\n2. Là sách của tôi.\n3. Vâng, đúng vậy.",
        "pdfPage": 21
    }
}

def format_gold_standard_expl(item):
    opt = item["opt"]
    meaning = item.get("meaning", "")
    analysis = item.get("analysis", "")
    options = "\n".join(item.get("options", []))
    page = item.get("pdfPage", 14)
    raw = item.get("rawExcerpt", "")
    audio_ja = item.get("audioJa")
    audio_vi = item.get("audioVi")

    if audio_ja:
        expl = f"""🎯 Đáp án đúng: [{opt}]

💬 Dịch nghĩa câu hỏi:
"{meaning}"

💡 Phân tích chi tiết:
{analysis}

{audio_ja}

{audio_vi}

🔍 Phân tích các lựa chọn:
{options}

📄 Trích PDF gốc (聴解原文 & 参考答案 - Trang {page}):
Câu ({item['localNum']}) -> Đáp án [{opt}]"""
    else:
        expl = f"""🎯 Đáp án đúng: [{opt}]

💬 Dịch nghĩa câu:
"{meaning}"

💡 Phân tích & Giải thích chi tiết:
{analysis}

🔍 Phân tích các lựa chọn:
{options}

📄 Trích PDF gốc (试题解析 - Trang {page}):
{raw}"""
    return expl.strip()

if __name__ == "__main__":
    print(f"Total N5 questions compiled: {len(N5_2010_DATA)}")
    print("Q1:", N5_2010_DATA[1]["snippet"], "Ans:", N5_2010_DATA[1]["opt"])
    print("Q34:", N5_2010_DATA[34]["snippet"], "Ans:", N5_2010_DATA[34]["opt"])
    print("Q66:", N5_2010_DATA[66]["snippet"], "Ans:", N5_2010_DATA[66]["opt"])
