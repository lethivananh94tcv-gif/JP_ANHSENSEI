-- V68: Fix and update authentic example sentences for Minna no Nihongo Lesson 26 (N4 Lesson 1)
-- Replace template text with 100% natural, contextual Japanese sentences and accurate Vietnamese translations

UPDATE vocabulary SET example_jp = '熱が あるので、病院で 医者に 診て もらいます。', example_vi = 'Vì bị sốt nên tôi đến bệnh viện nhờ bác sĩ khám.', example_reading = 'ねつが あるので、びょういんで いしゃに みて もらいます。', usage_note = 'Động từ 診ます chỉ việc bác sĩ khám bệnh.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 1;

UPDATE vocabulary SET example_jp = '昨日 落とした 鍵を 探して います。', example_vi = 'Tôi đang tìm chiếc chìa khóa bị rơi ngày hôm qua.', example_reading = 'きのう おとした かぎを さがして います。', usage_note = 'Động từ 探します chỉ hành động tìm kiếm.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 2;

UPDATE vocabulary SET example_jp = '電車が 遅れて、約束の 時間に 遅れました。', example_vi = 'Xe điện bị trễ nên tôi đã đến muộn giờ hẹn.', example_reading = 'でんしゃが おくれて、やくそくの じかんに おくれました。', usage_note = 'Động từ 遅れます chỉ việc bị trễ, muộn.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 3;

UPDATE vocabulary SET example_jp = '走ったので、新幹線の 出発時間に 間に合いました。', example_vi = 'Vì chạy nhanh nên tôi đã kịp giờ tàu Shinkansen xuất phát.', example_reading = 'はしったので、しんかんせんの しゅっぱつじかんに まにあいました。', usage_note = 'Động từ 間に合います chỉ việc kịp giờ.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 4;

UPDATE vocabulary SET example_jp = '毎朝 花壇の 花に 水を やります。', example_vi = 'Mỗi sáng tôi tưới nước cho hoa ở bồn hoa.', example_reading = 'まいあさ かだんの はなに みずを やります。', usage_note = 'Động từ やります làm/tưới/cho ăn.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 5;

UPDATE vocabulary SET example_jp = '公園の 道で 落とした 財布を 拾いました。', example_vi = 'Tôi đã nhặt được chiếc ví bị rơi trên đường ở công viên.', example_reading = 'こうえんの みちで おとした さいふを ひろいました。', usage_note = 'Động từ 拾います chỉ việc nhặt lên.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 6;

UPDATE vocabulary SET example_jp = '遅れる 場合は、事前に 先生に 連絡して ください。', example_vi = 'Trong trường hợp đến muộn, xin hãy liên lạc trước với thầy/cô.', example_reading = 'おくれる ばあいは、じぜんに せんせいに れんらくして ください。', usage_note = 'Động từ 連絡します chỉ việc liên lạc.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 7;

UPDATE vocabulary SET example_jp = '朝 散歩すると、とても 気分がいいです。', example_vi = 'Đi dạo vào buổi sáng làm tôi cảm thấy rất thoải mái.', example_reading = 'あさ さんぽすると、とても きぶんがいいです。', usage_note = 'Tính từ 気分がいい biểu thị tâm trạng/sức khỏe tốt.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 8;

UPDATE vocabulary SET example_jp = '熱が あって、少し 気分が 悪いです。', example_vi = 'Tôi bị sốt nên cảm thấy hơi mệt mỏi trong người.', example_reading = 'ねつが あって、すこし きぶんが わるいです。', usage_note = 'Tính từ 気分が悪い biểu thị cảm giác khó chịu/mệt.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 9;

UPDATE vocabulary SET example_jp = '来週の 日曜日に 学校で 運動会が あります。', example_vi = 'Chủ nhật tuần tới ở trường sẽ có ngày hội thể thao.', example_reading = 'らいしゅうの にちようびに がっこうで うんどうかいが あります。', usage_note = 'Danh từ 運動会 chỉ ngày hội thể thao.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 10;

UPDATE vocabulary SET example_jp = '夏休みに 地域で 盆踊りの 祭りが行われます。', example_vi = 'Vào kỳ nghỉ hè, lễ hội múa Bon được tổ chức tại địa phương.', example_reading = 'なつやすみに ちいきで ぼんどおりの まつりが おこなわれます。', usage_note = 'Danh từ 盆踊り điệu múa truyền thống Bon.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 11;

UPDATE vocabulary SET example_jp = '公園の フリーマーケットで 古い 本を 買いました。', example_vi = 'Tôi đã mua sách cũ ở chợ trời trong công viên.', example_reading = 'こうえんの ふりーまーけっとで ふるい ほんを かいました。', usage_note = 'Danh từ フリーマーケット chỉ chợ đồ cũ.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 12;

UPDATE vocabulary SET example_jp = '明日の 会議の 場所を 確認してください。', example_vi = 'Xin hãy xác nhận địa điểm cuộc họp ngày mai.', example_reading = 'あしたの かいぎの ばしょを かくにんしてください。', usage_note = 'Danh từ 場所 chỉ vị trí, địa điểm.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 13;

UPDATE vocabulary SET example_jp = '週末に 地域で ボランティア活動に 参加します。', example_vi = 'Cuối tuần tôi tham gia hoạt động tình nguyện tại địa phương.', example_reading = 'しゅうまつに ちいきで ぼらんてぃあかつどうに さんかします。', usage_note = 'Danh từ ボランティア chỉ tình nguyện viên.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 14;

UPDATE vocabulary SET example_jp = '新しい 革の 財布を 買いました。', example_vi = 'Tôi đã mua một chiếc ví da mới.', example_reading = 'あたらしい かわの さいふを かいました。', usage_note = 'Danh từ 財布 chỉ ví đựng tiền.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 15;

UPDATE vocabulary SET example_jp = '指定された 場所に ごみを 捨てます。', example_vi = 'Tôi vứt rác ở nơi được quy định.', example_reading = 'していされた ばしょに ごみを すてます。', usage_note = 'Danh từ ごみ chỉ rác thải.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 16;

UPDATE vocabulary SET example_jp = '東京の 観光で 国会議事堂を 見学しました。', example_vi = 'Trong chuyến tham quan Tokyo tôi đã đến thăm Tòa nhà Quốc hội.', example_reading = 'とうきょうの かんこうで こっかいぎじどうを けんがくしました。', usage_note = 'Danh từ 国会議事堂 Tòa nhà Quốc hội.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 17;

UPDATE vocabulary SET example_jp = '平日、父は 朝から 晩まで 働いています。', example_vi = 'Vào ngày thường, bố tôi làm việc từ sáng đến tối.', example_reading = 'へいじつ、ちちは あさから ばんまで はたらいています。', usage_note = 'Danh từ 平日 chỉ ngày từ thứ 2 đến thứ 6.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 18;

UPDATE vocabulary SET example_jp = '彼は 関西弁を とても 上手に 話します。', example_vi = 'Anh ấy nói tiếng vùng Kansai rất giỏi.', example_reading = 'かれは かんさいべんを とても じょうずに はなします。', usage_note = 'Hậu tố ～弁 chỉ tiếng địa phương.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 19;

UPDATE vocabulary SET example_jp = '今度 一緒に 美味しい ラーメンを 食べに行きませんか。', example_vi = 'Lần tới cùng đi ăn ramen ngon với tôi không?', example_reading = 'こんど いっしょに おいしい らーめんを たべにいきませんか。', usage_note = 'Phó từ 今度 chỉ lần tới/lần này.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 20;

UPDATE vocabulary SET example_jp = '日本語が ずいぶん 上手に なりましたね。', example_vi = 'Tiếng Nhật của bạn đã giỏi lên khá nhiều rồi đấy!', example_reading = 'にほんごが ずいぶん じょうずに なりましたね。', usage_note = 'Phó từ ずいぶん biểu thị mức độ khá nhiều.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 21;

UPDATE vocabulary SET example_jp = '大切な 用事なので、直接 会って 話します。', example_vi = 'Vì là việc quan trọng nên tôi sẽ gặp mặt trực tiếp để nói chuyện.', example_reading = 'たいせつな ようじなので、ちょくせつ あって はなします。', usage_note = 'Phó từ 直接 chỉ sự trực tiếp.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 22;

UPDATE vocabulary SET example_jp = '質問が あれば、いつでも 遠慮なく 聞いてください。', example_vi = 'Nếu có câu hỏi, xin hãy cứ hỏi bất cứ lúc nào.', example_reading = 'しつもんが あれば、いつでも えんりょなく きいてください。', usage_note = 'Phó từ いつでも bất kỳ lúc nào.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 23;

UPDATE vocabulary SET example_jp = 'スマホが あれば、どこでも 勉強できます。', example_vi = 'Có điện thoại thông minh thì bất cứ nơi đâu cũng học được.', example_reading = 'すまほが あれば、どこでも べんきょうできます。', usage_note = 'Phó từ どこでも bất cứ nơi nào.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 24;

UPDATE vocabulary SET example_jp = 'この パソコンは 簡単なので、だれでも 使えます。', example_vi = 'Chiếc máy tính này đơn giản nên bất kỳ ai cũng dùng được.', example_reading = 'この ぱそんこんは かんたんなので、だれでも つかえます。', usage_note = 'Phó từ だれでも bất kỳ ai.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 25;

UPDATE vocabulary SET example_jp = '日本料理なら 何でも 好きです。', example_vi = 'Món ăn Nhật Bản thì bất cứ món gì tôi cũng thích.', example_reading = 'にほんりょうりなら なんでも すきです。', usage_note = 'Phó từ 何でも bất kỳ cái gì.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 26;

UPDATE vocabulary SET example_jp = 'こんな 素晴らしい 景色は 初めて 見ました。', example_vi = 'Phong cảnh tuyệt vời thế này là lần đầu tiên tôi được thấy.', example_reading = 'こんな すばらしい けしきは はじめて みました。', usage_note = 'Chỉ định từ こんな～ như thế này.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 27;

UPDATE vocabulary SET example_jp = 'そんな 高い 服は 買えません。', example_vi = 'Bộ quần áo đắt như thế đó thì tôi không mua nổi.', example_reading = 'そんな たかい ふくは かえません。', usage_note = 'Chỉ định từ そんな～ như thế đó.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 28;

UPDATE vocabulary SET example_jp = 'あんな 親切な 人に 出会えて 嬉しいです。', example_vi = 'Gặp được người tốt bụng như thế kia tôi rất vui.', example_reading = 'あんな しんせつな ひとに であえて うれしいです。', usage_note = 'Chỉ định từ あんな～ như thế kia.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 29;

UPDATE vocabulary SET example_jp = '大掃除で 部屋が すっかり 片付きました。', example_vi = 'Nhờ tổng vệ sinh mà phòng học đã được dọn dẹp sạch sẽ.', example_reading = 'おおそうじで へやが すっかり かたづきました。', usage_note = 'Động từ 片付きます chỉ việc được gọn gàng.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 30;

UPDATE vocabulary SET example_jp = '毎朝 8時までに ごみを 出します。', example_vi = 'Mỗi sáng tôi mang rác đi đổ trước 8 giờ.', example_reading = 'まいあさ 8じまでに ごみを だします。', usage_note = 'Động từ 出します chỉ việc mang rác đi đổ.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 31;

UPDATE vocabulary SET example_jp = '火曜日は 燃えるごみの 日です。', example_vi = 'Thứ ba là ngày gom rác cháy được.', example_reading = 'かようびは もえるごみの ひです。', usage_note = 'Danh từ 燃えるごみ rác cháy được.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 32;

UPDATE vocabulary SET example_jp = '自転車は 指定の 置き場に 止めてください。', example_vi = 'Xin hãy đỗ xe đạp vào nơi quy định.', example_reading = 'じてんしゃは していの おきばに とめてください。', usage_note = 'Danh từ 置き場 chỗ/nơi để đồ.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 33;

UPDATE vocabulary SET example_jp = '机の 横に 本棚が あります。', example_vi = 'Bên cạnh bàn làm việc có một giá sách.', example_reading = 'つくえの よこに ほんだなが あります。', usage_note = 'Danh từ 横 bên cạnh.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 34;

UPDATE vocabulary SET example_jp = '空いた 瓶は リサイクル箱に 入れます。', example_vi = 'Chai thủy tinh rỗng thì bỏ vào thùng tái chế.', example_reading = 'あいた びんは りさいくるばこに いれます。', usage_note = 'Danh từ 瓶 chai lọ thủy tinh.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 35;

UPDATE vocabulary SET example_jp = 'ジュースの 缶を ごみ箱に 捨てました。', example_vi = 'Tôi đã vứt vỏ lon nước ngọt vào thùng rác.', example_reading = 'じゅーすの かんを ごみばこに すてました。', usage_note = 'Danh từ 缶 vỏ lon nhôm/sắt.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 36;

UPDATE vocabulary SET example_jp = '料理の 後、ガスの 元栓を 閉めました。', example_vi = 'Sau khi nấu ăn xong, tôi đã khóa van ga lại.', example_reading = 'りょうりの あと、がすの もとせんを しめました。', usage_note = 'Danh từ ガス khí ga.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 37;

UPDATE vocabulary SET example_jp = '将来 宇宙旅行を してみたいです。', example_vi = 'Tương lai tôi muốn thử đi du lịch vũ trụ.', example_reading = 'しょうらい うちゅうりょこうを してみたいです。', usage_note = 'Danh từ 宇宙 vũ trụ.' WHERE lesson_id = (SELECT l.lesson_id FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id WHERE lvl.code = 'N4' AND l.sort_order = 1) AND sort_order = 38;
