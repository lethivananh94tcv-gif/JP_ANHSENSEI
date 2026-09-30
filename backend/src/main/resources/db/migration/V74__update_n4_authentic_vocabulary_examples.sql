-- ============================================================
-- ANH SENSEI - FLYWAY MIGRATION V74
-- Safe Authentic Vocabulary Example Sentences Update for JLPT N4
-- Strictly scoped to N4 level (level_id = 2)
-- ============================================================

UPDATE vocabulary
SET example_jp = '熱があるので、病院で医師に診てもらいました。',
    example_reading = 'ねつが あるので、びょういんで いしに みて もらいました。',
    example_vi = 'Vì bị sốt nên tôi đã nhờ bác sĩ tại bệnh viện khám cho.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222123
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '失くした鍵を部屋の中で探しています。',
    example_reading = 'なくした かぎを へやの なかで さがして います。',
    example_vi = 'Tôi đang tìm chiếc chìa khóa bị mất ở trong phòng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222124
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '電車が遅れたので、約束の時間に遅れました。',
    example_reading = 'でんしゃが おくれたので、やくそくの じかんに おくれました。',
    example_vi = 'Vì tàu bị trễ nên tôi đã đến muộn so với giờ hẹn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222125
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '走ったので、新幹線の出発時間に間に合いました。',
    example_reading = 'しんかんせんの しゅっぱつじかんに まにあいました。',
    example_vi = 'Vì đã chạy nhanh nên tôi đã kịp giờ tàu Shinkansen khởi hành.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222126
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '宿題を全部やってから、友達とサッカーをします。',
    example_reading = 'しゅくだいを ぜんぶ やってから、ともだちと サッカーを します。',
    example_vi = 'Sau khi làm xong bài tập, tôi sẽ đá bóng với bạn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222127
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '公園の道で落ちていた黒い財布を拾いました。',
    example_reading = 'こうえんの みちで おちていた くろい さいふを ひろいました。',
    example_vi = 'Tôi đã nhặt được chiếc ví màu đen rơi trên đường công viên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222128
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '駅に到着したら、すぐに先生に連絡します。',
    example_reading = 'えきに とうちゃくしたら、すぐに せんせいに れんらくします。',
    example_vi = 'Khi đến ga, tôi sẽ liên lạc ngay cho thầy giáo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222129
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '朝の公園を散歩すると、とても気分が良いです。',
    example_reading = 'あさの こうえんを さんぽすると、とても きぶんが いいです。',
    example_vi = 'Đi dạo công viên vào buổi sáng cảm thấy tinh thần rất thoải mái.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222130
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'バスに酔ってしまって、少し気分が悪いです。',
    example_reading = 'バスに よってしまって、すこし きぶんが わるいです。',
    example_vi = 'Tôi bị say xe bus nên cảm thấy hơi khó chịu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222131
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '来週の日曜日に学校で運動会が行われます。',
    example_reading = 'らいしゅうの にちようびに がっこうで うんどうかいが おこなわれます。',
    example_vi = 'Vào Chủ nhật tuần tới, hội thao sẽ diễn ra tại trường.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222132
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '夏休みに 地域で 盆踊りの 祭りが行われます。',
    example_reading = 'なつやすみに ちいきで ぼんどおりの まつりが おこなわれます。',
    example_vi = 'Vào kỳ nghỉ hè, lễ hội múa Bon được tổ chức tại địa phương.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222133
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でフリーマーケットという表現をよく使います。',
    example_reading = 'にほんごの かいわで フリーマーケットという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt chợ đồ cũ, chợ trời.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222134
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '明日のパーティーの開催場所を教えてください。',
    example_reading = 'あしたの パーティーの かいさいばしょを おしえてください。',
    example_vi = 'Hãy cho tôi biết địa điểm tổ chức bữa tiệc ngày mai.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222135
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でボランティアという表現をよく使います。',
    example_reading = 'にほんごの かいわで ボランティアという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt tình nguyện viên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222136
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で財布という表現をよく使います。',
    example_reading = 'にほんごの かいわで さいふという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt ví tiền.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222137
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でごみという表現をよく使います。',
    example_reading = 'にほんごの かいわで ごみという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt rác.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222138
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '東京の 観光で 国会議事堂を 見学しました。',
    example_reading = 'とうきょうの かんこうで こっかいぎじどうを けんがくしました。',
    example_vi = 'Trong chuyến tham quan Tokyo tôi đã đến thăm Tòa nhà Quốc hội.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222139
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で平日という表現をよく使います。',
    example_reading = 'にほんごの かいわで へいじつという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt ngày thường (thứ 2 - thứ 6).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222140
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「～弁」は とても 大切な 言葉です。',
    example_reading = '「～べん」は とても たいせつな ことばです。',
    example_vi = '「～弁」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222141
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '今度 一緒に 美味しい ラーメンを 食べに行きませんか。',
    example_reading = 'こんど いっしょに おいしい らーめんを たべにいきませんか。',
    example_vi = 'Lần tới cùng đi ăn ramen ngon với tôi không?',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222142
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「ずいぶん」は とても 大切な 言葉です。',
    example_reading = '「ずいぶん」は とても たいせつな ことばです。',
    example_vi = '「ずいぶん」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222143
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「直接」は とても 大切な 言葉です。',
    example_reading = '「ちょくせつ」は とても たいせつな ことばです。',
    example_vi = '「直接」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222144
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '質問が あれば、いつでも 遠慮なく 聞いてください。',
    example_reading = 'しつもんが あれば、いつでも えんりょなく きいてください。',
    example_vi = 'Nếu có câu hỏi, xin hãy cứ hỏi bất cứ lúc nào.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222145
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'スマホが あれば、どこでも 勉強できます。',
    example_reading = 'すまほが あれば、どこでも べんきょうできます。',
    example_vi = 'Có điện thoại thông minh thì bất cứ nơi đâu cũng học được.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222146
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「だれでも」は とても 大切な 言葉です。',
    example_reading = '「だれでも」は とても たいせつな ことばです。',
    example_vi = '「だれでも」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222147
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「何でも」は とても 大切な 言葉です。',
    example_reading = '「なんでも」は とても たいせつな ことばです。',
    example_vi = '「何でも」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222148
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「こんな～」は とても 大切な 言葉です。',
    example_reading = '「こんな～」は とても たいせつな ことばです。',
    example_vi = '「こんな～」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222149
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「そんな～」は とても 大切な 言葉です。',
    example_reading = '「そんな～」は とても たいせつな ことばです。',
    example_vi = '「そんな～」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222150
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「あんな～」は とても 大切な 言葉です。',
    example_reading = '「あんな～」は とても たいせつな ことばです。',
    example_vi = '「あんな～」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222151
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で片付きます機会が増えました。',
    example_reading = 'まいにちの せいかつで かたづきます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội được dọn dẹp gọn gàng đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222152
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で出します機会が増えました。',
    example_reading = 'まいにちの せいかつで だします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội đổ (rác) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222153
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で燃えるごみという表現をよく使います。',
    example_reading = 'にほんごの かいわで もえるごみという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt rác cháy được.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222154
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '駅の 近くに 新しい 置き場が あります。',
    example_reading = 'えきの ちかくに あたらしい おきばが あります。',
    example_vi = 'Ở gần nhà ga có Nơi để, bãi để mới.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222155
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で横という表現をよく使います。',
    example_reading = 'にほんごの かいわで よこという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt bên cạnh, chiều ngang.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222156
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で瓶という表現をよく使います。',
    example_reading = 'にほんごの かいわで びんという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt chai lọ thủy tinh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222157
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で缶という表現をよく使います。',
    example_reading = 'にほんごの かいわで かんという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt vỏ lon.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222158
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でガスという表現をよく使います。',
    example_reading = 'にほんごの かいわで ガスという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt khí ga.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222159
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '将来 宇宙旅行を してみたいです。',
    example_reading = 'しょうらい うちゅうりょこうを してみたいです。',
    example_vi = 'Tương lai tôi muốn thử đi du lịch vũ trụ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222160
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で飼います機会が増えました。',
    example_reading = 'まいにちの せいかつで かいます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội nuôi (động vật) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222161
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で走ります機会が増えました。',
    example_reading = 'まいにちの せいかつで はしります きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội chạy (trên đường) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222162
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'テレビで ニュースを 見えます。',
    example_reading = 'てれびで にゅーすを みえます。',
    example_vi = 'Tôi Nhìn thấy tin tức trên tivi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222163
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で聞こえます機会が増えました。',
    example_reading = 'まいにちの せいかつで きこえます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội nghe thấy (âm thanh tự lọt vào tai) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222164
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活でできます機会が増えました。',
    example_reading = 'まいにちの せいかつで できます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội được xây dựng xong, hoàn thành đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222165
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '来月から駅の前で新しい日本語のクラスを開きます。',
    example_reading = 'らいげつから えきの まえで あたらしい にほんごの クラスを ひらきます。',
    example_vi = 'Từ tháng sau, chúng tôi sẽ mở một lớp học tiếng Nhật mới trước ga.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222166
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でペットという表現をよく使います。',
    example_reading = 'にほんごの かいわで ペットという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt thú cưng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222167
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '空を たくさんの 鳥が 飛んで います。',
    example_reading = 'そらを たくさんの とりが とんで います。',
    example_vi = 'Rất nhiều chim đang bay trên bầu trời.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222168
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '田中さんは 声が 大きくて 元気です。',
    example_reading = 'たなかさんは こえが おおきくて げんきです。',
    example_vi = 'Anh Tanaka giọng nói toi và rất khỏe khoắn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222169
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '静かな 海で 波の 音を 聴きます。',
    example_reading = 'しずかな うみで なみの おとを ききます。',
    example_vi = 'Tôi lắng nghe tiếng sóng biển trên bờ biển yên bình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222170
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で花火という表現をよく使います。',
    example_reading = 'にほんごの かいわで はなびという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt pháo hoa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222171
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で道具という表現をよく使います。',
    example_reading = 'にほんごの かいわで どうぐという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt dụng cụ, công cụ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222172
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でクリーニングという表現をよく使います。',
    example_reading = 'にほんごの かいわで クリーニングという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt giặt khô, tiệm giặt ủi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222173
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '駅の 近くに 新しい 家が あります。',
    example_reading = 'えきの ちかくに あたらしい いえが あります。',
    example_vi = 'Ở gần nhà ga có Ngôi nhà mới.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222174
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でマンションという表現をよく使います。',
    example_reading = 'にほんごの かいわで マンションという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt chung cư cao cấp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222175
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '駅の 近くに 新しい キッチンが あります。',
    example_reading = 'えきの ちかくに あたらしい キッチンが あります。',
    example_vi = 'Ở gần nhà ga có Nhà bếp mới.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222176
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でパーティールームという表現をよく使います。',
    example_reading = 'にほんごの かいわで パーティールームという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt phòng tổ chức tiệc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222177
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'あちらの 方は 新しい 先生です。',
    example_reading = 'あちらの かたは あたらしい せんせいです。',
    example_vi = 'Vị ở đằng kia là giáo viên mới.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222178
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「～後」は とても 大切な 言葉です。',
    example_reading = '「～ご」は とても たいせつな ことばです。',
    example_vi = '「～後」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222179
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「～しか」は とても 大切な 言葉です。',
    example_reading = '「～しか」は とても たいせつな ことばです。',
    example_vi = '「～しか」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222180
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'ほかの デザインも 見てみたいです。',
    example_reading = 'ほかの でざいんも みてみたいです。',
    example_vi = 'Tôi muốn xem thêm các thiết kế khác nữa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222181
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「はっきり」は とても 大切な 言葉です。',
    example_reading = '「はっきり」は とても たいせつな ことばです。',
    example_vi = '「はっきり」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222182
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '新しい 部屋に おしゃれな 家具を 買いました。',
    example_reading = 'あたらしい へやに おしゃれな かぐを かいました。',
    example_vi = 'Tôi đã mua đồ nội thất thời trang cho căn phòng mới.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222183
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で本棚という表現をよく使います。',
    example_reading = 'にほんごの かいわで ほんだなという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt giá sách.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222184
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'いつか 日本へ 旅行に 行きたいです。',
    example_reading = 'いつか にほんへ りょこうに いきたいです。',
    example_vi = 'Một ngày nào đó tôi muốn đi du lịch Nhật Bản.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222185
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で建てます機会が増えました。',
    example_reading = 'まいにちの せいかつで たてます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội xây dựng (nhà) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222186
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 町は とても 静かで 素晴らしいです。',
    example_reading = 'この まちは とても しずかで すばらしいです。',
    example_vi = 'Thành phố này rất yên tĩnh và Tuyệt vời.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222187
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '公園で 子どもたちが 楽しそうに 遊んで います。',
    example_reading = 'こうえんで こどもたちが たのしそうに あそんで います。',
    example_vi = 'Bọn trẻ đang chơi đùa vui vẻ trong công viên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222188
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 町は とても 静かで 大好きなです。',
    example_reading = 'この まちは とても しずかで だいすきなです。',
    example_vi = 'Thành phố này rất yên tĩnh và Rất thích.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222189
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で主人公という表現をよく使います。',
    example_reading = 'にほんごの かいわで しゅじんこうという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt nhân vật chính.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222190
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で形という表現をよく使います。',
    example_reading = 'にほんごの かいわで かたちという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt hình dạng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222191
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 町は とても 静かで 不思議なです。',
    example_reading = 'この まちは とても しずかで ふしぎなです。',
    example_vi = 'Thành phố này rất yên tĩnh và Kỳ lạ, kỳ diệu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222192
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '上着のポケットにスマートフォンの鍵を入れた。',
    example_reading = 'うわぎの ポケットに スマートフォンの かぎを いれた。',
    example_vi = 'Tôi đã để chìa khóa và điện thoại vào túi áo khoác.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222193
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「例えば」は とても 大切な 言葉です。',
    example_reading = '「たとえば」は とても たいせつな ことばです。',
    example_vi = '「例えば」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222194
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '鞄に きれいな キーホルダーを 付けます。',
    example_reading = 'かばんに きれいな きーほるだーを つけます。',
    example_vi = 'Tôi gắn một chiếc móc khóa đẹp vào cặp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222195
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「自由に」は とても 大切な 言葉です。',
    example_reading = '「じゆうに」は とても たいせつな ことばです。',
    example_vi = '「自由に」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222196
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で売れます機会が増えました。',
    example_reading = 'まいにちの せいかつで うれます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội bán chạy đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222197
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で踊ります機会が増えました。',
    example_reading = 'まいにちの せいかつで おどります きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội nhảy múa đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222198
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'ご飯を食べるときは、よく噛んで食べましょう。',
    example_reading = 'ごはんを たべるときは、よく かんで たべましょう。',
    example_vi = 'Khi ăn cơm, chúng ta hãy nhai kỹ rồi mới nuốt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222199
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で選びます機会が増えました。',
    example_reading = 'まいにちの せいかつで えらびます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội lựa chọn đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222200
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎朝 8時に 会社へ 通います。',
    example_reading = 'まいあさ 8じに かいしゃへ か通います。',
    example_vi = 'Mỗi sáng 8 giờ tôi Đi lại thường xuyên công ty.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222201
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活でメモします機会が増えました。',
    example_reading = 'まいにちの せいかつで メモします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội ghi chép nhanh, nốt lại đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222202
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 町は とても 静かで 真面目なです。',
    example_reading = 'この まちは とても しずかで まじめなです。',
    example_vi = 'Thành phố này rất yên tĩnh và Nghiêm túc, ngoan ngoãn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222203
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても 熱心な 性格の 人です。',
    example_reading = 'かれは とても ねっしんな せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất nhiệt tình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222204
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 町は とても 静かで 偉いです。',
    example_reading = 'この まちは とても しずかで えらいです。',
    example_vi = 'Thành phố này rất yên tĩnh và Vĩ đại, giỏi giang.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222205
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 町は とても 静かで ちょうどいいです。',
    example_reading = 'この まちは とても しずかで ちょうどいいです。',
    example_vi = 'Thành phố này rất yên tĩnh và Vừa vặn, vừa đúng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222206
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で景色という表現をよく使います。',
    example_reading = 'にほんごの かいわで けしきという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt phong cảnh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222207
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で美容院という表現をよく使います。',
    example_reading = 'にほんごの かいわで びよういんという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt thẩm mỹ viện, tiệm làm tóc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222208
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で台所という表現をよく使います。',
    example_reading = 'にほんごの かいわで だいどころという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt căn bếp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222209
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で経験という表現をよく使います。',
    example_reading = 'にほんごの かいわで けいけんという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt kinh nghiệm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222210
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で力という表現をよく使います。',
    example_reading = 'にほんごの かいわで ちからという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt sức mạnh, năng lực.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222211
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で人気という表現をよく使います。',
    example_reading = 'にほんごの かいわで にんきという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt hấp dẫn, sự hâm mộ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222212
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で色という表現をよく使います。',
    example_reading = 'にほんごの かいわで いろという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt màu sắc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222213
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で味という表現をよく使います。',
    example_reading = 'にほんごの かいわで あじという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt hương vị.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222214
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でガムという表現をよく使います。',
    example_reading = 'にほんごの かいわで ガムという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt kẹo cao su.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222215
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で品物という表現をよく使います。',
    example_reading = 'にほんごの かいわで しなものという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt hàng hóa, vật phẩm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222216
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で値段という表現をよく使います。',
    example_reading = 'にほんごの かいわで ねだんという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt giá cả.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222217
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で給料という表現をよく使います。',
    example_reading = 'にほんごの かいわで きゅうりょうという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt tiền lương.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222218
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でボーナスという表現をよく使います。',
    example_reading = 'にほんごの かいわで ボーナスという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt tiền thưởng bonus.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222219
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で番組という表現をよく使います。',
    example_reading = 'にほんごの かいわで ばんぐみという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt chương trình truyền hình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222220
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でドラマという表現をよく使います。',
    example_reading = 'にほんごの かいわで ドラマという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt phim truyền hình dài tập.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222221
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で歌手という表現をよく使います。',
    example_reading = 'にほんごの かいわで かしゅという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt ca sĩ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222222
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で小説という表現をよく使います。',
    example_reading = 'にほんごの かいわで しょうせつという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt tiểu thuyết.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222223
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '駅の 近くに 新しい 小説家が あります。',
    example_reading = 'えきの ちかくに あたらしい しょうせつかが あります。',
    example_vi = 'Ở gần nhà ga có Nhà văn tiểu thuyết mới.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222224
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「～家」は とても 大切な 言葉です。',
    example_reading = '「～か」は とても たいせつな ことばです。',
    example_vi = '「～家」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222225
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '文法の 使い方として ～機を 勉強しました。',
    example_reading = 'ぶんぽうの つかいかたとして ～きを べんきょうしました。',
    example_vi = 'Tôi đã học cách sử dụng máy ~ như một mẫu ngữ pháp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222226
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で息子という表現をよく使います。',
    example_reading = 'にほんごの かいわで むすこという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt con trai (tôi).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222227
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で息子さんという表現をよく使います。',
    example_reading = 'にほんごの かいわで むすこさんという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt con trai (người khác).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222228
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で娘という表現をよく使います。',
    example_reading = 'にほんごの かいわで むすめという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt con gái (tôi).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222229
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で娘さんという表現をよく使います。',
    example_reading = 'にほんごの かいわで むすめさんという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt con gái (người khác).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222230
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で自分という表現をよく使います。',
    example_reading = 'にほんごの かいわで じぶんという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt bản thân.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222231
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 将来を よく 使います。',
    example_reading = 'にちじょうの せいかつで しょうらいを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tương lai.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222232
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'しばらくは 家族と 過ごします。',
    example_reading = 'しばらくは かぞくと すごします。',
    example_vi = 'Chốc lát, một thời gian tôi dành thời gian bên gia đình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222233
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 町は とても 静かで たいていです。',
    example_reading = 'この まちは とても しずかで たいていです。',
    example_vi = 'Thành phố này rất yên tĩnh và Thường thường, hầu như.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222234
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '人が近づくと、自動ドアが静かに開きます。',
    example_reading = 'ひとが ちかづくと、じどうドアが しずかに あきます。',
    example_vi = 'Khi có người đến gần, cửa tự động sẽ mở ra một cách êm áい.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222235
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で閉まります機会が増えました。',
    example_reading = 'まいにちの せいかつで しまります きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội đóng (cửa tự đóng) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222236
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で点きます機会が増えました。',
    example_reading = 'まいにちの せいかつで つきます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội sáng (điện tự bật sáng) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222237
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で消えます機会が増えました。',
    example_reading = 'まいにちの せいかつで きえます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội tắt (điện tự tắt) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222238
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で壊れます機会が増えました。',
    example_reading = 'まいにちの せいかつで こわれます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội hỏng (máy móc hỏng) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222239
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で割れます機会が増えました。',
    example_reading = 'まいにちの せいかつで われました きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội vỡ (cốc, đĩa vỡ) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222240
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で折れます機会が増えました。',
    example_reading = 'まいにちの せいかつで おれます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội gãy (cây, cành gãy) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222241
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で破れます機会が増えました。',
    example_reading = 'まいにちの せいかつで やぶれます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội rách (tờ giấy, túi rách) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222242
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で汚れます機会が増えました。',
    example_reading = 'まいにちの せいかつで よごれます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội bẩn (quần áo bị bẩn) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222243
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で付きます機会が増えました。',
    example_reading = 'まいにちの せいかつで つきます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội dính, có (túi có túi nhỏ) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222244
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で外れます機会が増えました。',
    example_reading = 'まいにちの せいかつで はずれます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội tuột, sút (cúc áo tuột) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222245
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で止まります機会が増えました。',
    example_reading = 'まいにちの せいかつで とまります きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội dừng (xe dừng) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222246
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活でまちがえます機会が増えました。',
    example_reading = 'まいにちの せいかつで まちがえます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội nhầm lẫn, sai lầm đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222247
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で落とします機会が増えました。',
    example_reading = 'まいにちの せいかつで おとします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội làm rơi, đánh rơi đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222248
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本で 生活する ために、掛かりますの 意味を 確認しました。',
    example_reading = 'にほん で せいかつする ために、かかりますの いみを かくにんしました。',
    example_vi = 'Để sống ở Nhật, tôi đã xác nhận ý nghĩa của khóa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222249
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活でふきます機会が増えました。',
    example_reading = 'まいにちの せいかつで ふきます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội lau chùi đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222250
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で取り替えます機会が増えました。',
    example_reading = 'まいにちの せいかつで とりかえます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội thay thế, đổi mới đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222251
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'パーティーが終わったら、みんなで部屋を片付けます。',
    example_reading = 'パーティーが おわったら、みんなで へやを かたづけます。',
    example_vi = 'Sau khi bữa tiệc kết thúc, mọi người cùng dọn dẹp phòng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222252
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でお皿という表現をよく使います。',
    example_reading = 'にほんごの かいわで おさらという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt cái đĩa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222253
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でお茶碗という表現をよく使います。',
    example_reading = 'にほんごの かいわで おちゃわんという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt cái bát ăn cơm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222254
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でコップという表現をよく使います。',
    example_reading = 'にほんごの かいわで コップという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt cái cốc glass.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222255
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でガラスという表現をよく使います。',
    example_reading = 'にほんごの かいわで ガラスという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt thủy tinh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222256
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で袋という表現をよく使います。',
    example_reading = 'にほんごの かいわで ふくろという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt cái túi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222257
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 書類を よく 使います。',
    example_reading = 'にちじょうの せいかつで しょるいを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng giấy tờ, tài liệu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222258
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で枝という表現をよく使います。',
    example_reading = 'にほんごの かいわで えだという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt cành cây.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222259
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '駅の 近くに 新しい 駅員が あります。',
    example_reading = 'えきの ちかくに あたらしい えきいんが あります。',
    example_vi = 'Ở gần nhà ga có Nhân viên nhà ga mới.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222260
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 交番を よく 使います。',
    example_reading = 'にちじょうの せいかつで こうばんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đồn cảnh sát nhỏ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222261
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でスピーチという表現をよく使います。',
    example_reading = 'にほんごの かいわで スピーチという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt bài phát biểu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222262
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 返事を よく 使います。',
    example_reading = 'にちじょうの せいかつで へんじを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng câu trả lời, hồi đáp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222263
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「お先にどうぞ」は とても 大切な 言葉です。',
    example_reading = '「おさきにどうぞ」は とても たいせつな ことばです。',
    example_vi = '「お先にどうぞ」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222264
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で忘れ物という表現をよく使います。',
    example_reading = 'にほんごの かいわで わすれものという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt đồ để quên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222265
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 町は とても 静かで このくらいです。',
    example_reading = 'この まちは とても しずかで このくらいです。',
    example_vi = 'Thành phố này rất yên tĩnh và Khoảng chừng này.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222266
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「～側」は とても 大切な 言葉です。',
    example_reading = '「～がわ」は とても たいせつな ことばです。',
    example_vi = '「～側」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222267
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'ズボンのポケットに財布を入れて出かけます。',
    example_reading = 'ズボンの ポケットに さいふを いれて でかけます。',
    example_vi = 'Tôi cho ví vào túi quần rồi đi ra ngoài.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222268
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 覚えていませんを よく 使います。',
    example_reading = 'にちじょうの せいかつで おぼえていませんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tôi không nhớ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222269
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で網棚という表現をよく使います。',
    example_reading = 'にほんごの かいわで あみだなという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt giá để hành lý trên tàu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222270
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 確かを よく 使います。',
    example_reading = 'にちじょうの せいかつで たしかを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng chắc là, hình như.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222271
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「ああ、よかった」は とても 大切な 言葉です。',
    example_reading = '「ああ、よかった」は とても たいせつな ことばです。',
    example_vi = '「ああ、よかった」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222272
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で貼ります機会が増えました。',
    example_reading = 'まいにちの せいかつで はります きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội dán (dán tem, tờ rơi) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222273
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 掛けますを 行いました。',
    example_reading = 'みんなで きょうりょくして かけますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện treo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222274
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で飾ります機会が増えました。',
    example_reading = 'まいにちの せいかつで かざります きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội trang trí đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222275
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で並べます機会が増えました。',
    example_reading = 'まいにちの せいかつで ならべます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội xếp thành hàng đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222276
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で植えます機会が増えました。',
    example_reading = 'まいにちの せいかつで うえます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội trồng (cây) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222277
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で戻します機会が増えました。',
    example_reading = 'まいにちの せいかつで もどします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội trả lại vị trí cũ đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222278
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活でまとめます機会が増えました。',
    example_reading = 'まいにちの せいかつで まとめます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội gom lại, tóm tắt đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222279
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '使った道具は綺麗に洗ってから片付けます。',
    example_reading = 'つかった どうぐは きれいに あらってから かたづけます。',
    example_vi = 'Dụng cụ đã dùng xong sẽ được rửa sạch rồi mới dọn dẹp cất đi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222280
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活でしまいます機会が増えました。',
    example_reading = 'まいにちの せいかつで しまいます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội cất vào đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222281
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で決めます機会が増えました。',
    example_reading = 'まいにちの せいかつで きめます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội quyết định đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222282
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 知らせますを 行いました。',
    example_reading = 'みんなで きょうりょくして しらせますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện thông báo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222283
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で相談します機会が増えました。',
    example_reading = 'まいにちの せいかつで そうだんします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội thảo luận, bàn bạc đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222284
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で予習します機会が増えました。',
    example_reading = 'まいにちの せいかつで よしゅうします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội chuẩn bị bài trước đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222285
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で復習します機会が増えました。',
    example_reading = 'まいにちの せいかつで ふくしゅうします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội ôn tập bài cũ đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222286
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活でそのままにします機会が増えました。',
    example_reading = 'まいにちの せいかつで そのままにします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội để nguyên như thế đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222287
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'お子さんは 親切で 優しい人です。',
    example_reading = 'おこさんは しんせつで やさしいひとです。',
    example_vi = 'Con (người khác) là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222288
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で授業という表現をよく使います。',
    example_reading = 'にほんごの かいわで じゅぎょうという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt giờ học, buổi học.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222289
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で講義という表現をよく使います。',
    example_reading = 'にほんごの かいわで こうぎという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt bài giảng đại học.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222290
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ミーティングを よく 使います。',
    example_reading = 'にちじょうの せいかつで ミーティングを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cuộc họp meeting.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222291
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で予定という表現をよく使います。',
    example_reading = 'にほんごの かいわで よていという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt dự định, kế hoạch.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222292
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で お知らせを よく 使います。',
    example_reading = 'にちじょうの せいかつで おしらせを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bảng thông báo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222293
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 案内書を よく 使います。',
    example_reading = 'にちじょうの せいかつで あんないしょを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng sách hướng dẫn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222294
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で カレンダーを よく 使います。',
    example_reading = 'にちじょうの せいかつで カレンダーを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tờ lịch.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222295
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ポスターを よく 使います。',
    example_reading = 'にちじょうの せいかつで ポスターを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tờ áp phích poster.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222296
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ごみ箱を よく 使います。',
    example_reading = 'にちじょうの せいかつで ごみばこを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng thùng rác.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222297
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 人形を よく 使います。',
    example_reading = 'にちじょうの せいかつで にんぎょうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng búp bê.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222298
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 花瓶を よく 使います。',
    example_reading = 'にちじょうの せいかつで かびんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bình hoa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222299
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 鏡を よく 使います。',
    example_reading = 'にちじょうの せいかつで かがみを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng gương soi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222300
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 引き出しを よく 使います。',
    example_reading = 'にちじょうの せいかつで ひきだしを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng năn kéo tủ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222301
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '休日に 玄関へ 行きました。',
    example_reading = 'きゅうじつに げんかんへ いきました。',
    example_vi = 'Vào ngày nghỉ tôi đã đến lối vào nhà, thềm cửa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222302
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 廊下を よく 使います。',
    example_reading = 'にちじょうの せいかつで ろうかを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng hành lang.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222303
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 壁を よく 使います。',
    example_reading = 'にちじょうの せいかつで かべを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bức tường.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222304
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 池を よく 使います。',
    example_reading = 'にちじょうの せいかつで いけを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cái ao.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222305
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '【N4】日常の 生活で 交番を よく 使います。',
    example_reading = 'にちじょうの せいかつで こうばんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đồn cảnh sát.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222306
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'ハサミを使ったら、必ず元の場所に戻してください。',
    example_reading = 'ハサミを つかったら、かならず もとの ばしょに もどしてください。',
    example_vi = 'Dùng kéo xong hãy nhớ để lại đúng vị trí ban đầu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222307
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '周りは 親切で 優しい人です。',
    example_reading = 'まわりは しんせつで やさしいひとです。',
    example_vi = 'Xung quanh là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222308
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 真ん中を よく 使います。',
    example_reading = 'にちじょうの せいかつで まんなかを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng chính giữa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222309
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 隅を よく 使います。',
    example_reading = 'にちじょうの せいかつで すみを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng góc (trong phòng).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222310
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で始まります機会が増えました。',
    example_reading = 'まいにちの せいかつで はじまります きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội bắt đầu (buổi lễ bắt đầu) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222311
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 続けますを 行いました。',
    example_reading = 'みんなで きょうりょくして つづけますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện tiếp tục.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222312
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '図書館で 探していた 本を 見つけました。',
    example_reading = 'としょかんで さがしていた ほんを みつけました。',
    example_vi = 'Tôi đã tìm thấy quyển sách đang tìm ở thư viện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222313
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 受けるを 行いました。',
    example_reading = 'みんなで きょうりょくして うけますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện dự thi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222314
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で入学します機会が増えました。',
    example_reading = 'まいにちの せいかつで にゅうがくします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội nhập học đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222315
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で卒業します機会が増えました。',
    example_reading = 'まいにちの せいかつで そつぎょうします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội tốt nghiệp đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222316
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で出席します機会が増えました。',
    example_reading = 'まいにちの せいかつで しゅっせきします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội tham dự (cuộc họp) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222317
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 休憩しますを 行いました。',
    example_reading = 'みんなで きょうりょくして きゅうけいしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện nghỉ giải lao.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222318
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '連休は 家族と 過ごします。',
    example_reading = 'れんきゅうは かぞくと すごします。',
    example_vi = 'Kỳ nghỉ dài ngày liên tiếp tôi dành thời gian bên gia đình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222319
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 作文を よく 使います。',
    example_reading = 'にちじょうの せいかつで さくぶんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bài tập làm văn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222320
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 展覧会を よく 使います。',
    example_reading = 'にちじょうの せいかつで てんらんかいを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cuộc triển lãm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222321
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 結婚式を よく 使います。',
    example_reading = 'にちじょうの せいかつで けっこんしきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng lễ kết hôn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222322
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で お葬式を よく 使います。',
    example_reading = 'にちじょうの せいかつで おそうしきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng lễ tang.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222323
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 式を よく 使います。',
    example_reading = 'にちじょうの せいかつで しきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng buổi lễ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222324
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 本社を よく 使います。',
    example_reading = 'にちじょうの せいかつで ほんしゃを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng trụ sở chính.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222325
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 支店を よく 使います。',
    example_reading = 'にちじょうの せいかつで してんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng chi nhánh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222326
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '休日に 教会へ 行きました。',
    example_reading = 'きゅうじつに きょうかいへ いきました。',
    example_vi = 'Vào ngày nghỉ tôi đã đến nhà giáo hội, nhà thờ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222327
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 大学院を よく 使います。',
    example_reading = 'にちじょうの せいかつで だいがくいんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng trường cao học.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222328
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 動物園を よく 使います。',
    example_reading = 'にちじょうの せいかつで どうぶつえんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng vườn thú.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222329
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 温泉を よく 使います。',
    example_reading = 'にちじょうの せいかつで おんせんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng suối nước nóng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222330
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 帰りを よく 使います。',
    example_reading = 'にちじょうの せいかつで かえりを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng chiều về.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222331
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '【N4】お子さんは 親切で 優しい人です。',
    example_reading = 'おこさんは しんせつで やさしいひとです。',
    example_vi = 'Con cái (người khác) là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222332
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日 ～号を 利用します。',
    example_reading = 'まいにち ～ごうを りようします。',
    example_vi = 'Mỗi ngày tôi đều sử dụng số ~ (số tàu, số phòng).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222333
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に ～の方を 準備して おきます。',
    example_reading = 'りょこうの まえに ～ほうを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn phía ~, hướng ~.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222334
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ずっとを よく 使います。',
    example_reading = 'にちじょうの せいかつで ずっとを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng suốt, liền mạch.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222335
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 残りますを 行いました。',
    example_reading = 'みんなで きょうりょくして のこりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện còn lại, ở lại.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222336
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '月には 家族と 過ごします。',
    example_reading = 'つきには かぞくと すごします。',
    example_vi = 'Mỗi tháng tôi dành thời gian bên gia đình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222337
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 普通にを よく 使います。',
    example_reading = 'にちじょうの せいかつで ふつうにを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng thông thường.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222338
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で インターネットを よく 使います。',
    example_reading = 'にちじょうの せいかつで インターネットを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng mạng internet.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222339
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 村を よく 使います。',
    example_reading = 'にちじょうの せいかつで むらを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng ngôi làng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222340
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 映画館を よく 使います。',
    example_reading = 'にちじょうの せいかつで えいがかんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng rạp chiếu phim.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222341
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても 嫌な 性格の 人です。',
    example_reading = 'かれは とても いやな せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất ghét, khó chịu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222342
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 空き地を よく 使います。',
    example_reading = 'にちじょうの せいかつで あきちを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng khu đất trống.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222343
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 閉じますを 行いました。',
    example_reading = 'みんなで きょうりょくして とじますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện nhắm, đóng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222344
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 都会を よく 使います。',
    example_reading = 'にちじょうの せいかつで とかいを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng thành thị.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222345
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 運動しますを 行いました。',
    example_reading = 'みんなで きょうりょくして うんどうしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện vận động, tập thể thao.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222346
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 成功しますを 行いました。',
    example_reading = 'みんなで きょうりょくして せいこうしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện thành công.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222347
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 失敗しますを 行いました。',
    example_reading = 'みんなで きょうりょくして しっぱいしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện thất bại.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222348
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 合格しますを 行いました。',
    example_reading = 'みんなで きょうりょくして ごうかくしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện thi đỗ, đậu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222349
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '夕方になって、ようやく強い雨が止みました。',
    example_reading = 'ゆうがたに なって、ようやく つよい あめが やみました。',
    example_vi = 'Đến chiều tối, cơn mưa lớn cuối cùng cũng đã tạnh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222350
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 晴れますを 行いました。',
    example_reading = 'みんなで きょうりょくして はれますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện nắng đẹp, trời quang.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222351
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 曇りますを 行いました。',
    example_reading = 'みんなで きょうりょくして くもりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện nhiều mây, âm u.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222352
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎朝 8時に 冷えます。',
    example_reading = 'まいあさ はちじに ひえます。',
    example_vi = 'Mỗi sáng tôi lạnh đi, nguội đi lúc 8 giờ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222353
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '朝の通勤時間は電車がとても込みます。',
    example_reading = 'あさの つうきんじかんは でんしゃが とても こみます。',
    example_vi = 'Giờ cao điểm buổi sáng tàu điện rất đông đúc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222354
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活ですきます機会が増えました。',
    example_reading = 'まいにちの せいかつで すきます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội vắng vẻ (đường vắng) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222355
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 無理をしますを 行いました。',
    example_reading = 'みんなで きょうりょくして むりをしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện làm quá sức.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222356
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても 十分な 性格の 人です。',
    example_reading = 'かれは とても じゅうぶんな せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất đầy đủ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222357
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても おかしいです。',
    example_reading = 'この りょうりは とても おかしいです。',
    example_vi = 'Món ăn này rất kỳ lạ, buồn cười.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222358
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても うるさいです。',
    example_reading = 'この りょうりは とても うるさいです。',
    example_vi = 'Món ăn này rất ồn ào, phiền phức.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222359
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 火傷を よく 使います。',
    example_reading = 'にちじょうの せいかつで やけどを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bị bỏng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222360
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 怪我を よく 使います。',
    example_reading = 'にちじょうの せいかつで けがを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng vết thương.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222361
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 咳を よく 使います。',
    example_reading = 'にちじょうの せいかつで せきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cơn ho.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222362
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で インフルエンザを よく 使います。',
    example_reading = 'にちじょうの せいかつで インフルエンザを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bệnh cúm mùa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222363
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 空を よく 使います。',
    example_reading = 'にちじょうの せいかつで そらを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bầu trời.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222364
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 太陽を よく 使います。',
    example_reading = 'にちじょうの せいかつで たいようを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng mặt trời.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222365
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 星を よく 使います。',
    example_reading = 'にちじょうの せいかつで ほしを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng ngôi sao.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222366
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 月を よく 使います。',
    example_reading = 'にちじょうの せいかつで つきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng mặt trăng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222367
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 風を よく 使います。',
    example_reading = 'にちじょうの せいかつで かぜを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cơn gió.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222368
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 国際～を よく 使います。',
    example_reading = 'にちじょうの せいかつで こくさい～を よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng Quốc tế ~.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222369
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日 水道を 利用します。',
    example_reading = 'まいにち すいどうを りようします。',
    example_vi = 'Mỗi ngày tôi đều sử dụng nước máy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222370
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で エンジンを よく 使います。',
    example_reading = 'にちじょうの せいかつで エンジンを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng động cơ engine.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222371
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で チームを よく 使います。',
    example_reading = 'にちじょうの せいかつで チームを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đội bóng, team.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222372
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 今夜を よく 使います。',
    example_reading = 'にちじょうの せいかつで こんやを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tối nay.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222373
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 夕方を よく 使います。',
    example_reading = 'にちじょうの せいかつで ゆうがたを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng chiều tối.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222374
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で まえを よく 使います。',
    example_reading = 'にちじょうの せいかつで まえを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng trước đây.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222375
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 遅くを よく 使います。',
    example_reading = 'にちじょうの せいかつで おそくを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng muộn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222376
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても こんなに 性格の 人です。',
    example_reading = 'かれは とても こんなに せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất đến mức như thế này.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222377
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても そんなに 性格の 人です。',
    example_reading = 'かれは とても そんなに せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất đến mức như thế đó.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222378
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても あんなに 性格の 人です。',
    example_reading = 'かれは とても あんなに せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất đến mức như thế kia.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222379
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で もしかしたらを よく 使います。',
    example_reading = 'にちじょうの せいかつで もしかしたらを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng có thể là, biết đâu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222380
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 逃げますを 行いました。',
    example_reading = 'みんなで きょうりょくして にげますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện bỏ chạy, trốn chạy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222381
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 騒ぎますを 行いました。',
    example_reading = 'みんなで きょうりょくして さわぎますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện làm ồn, gây huyên náo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222382
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して あきらめますを 行いました。',
    example_reading = 'みんなで きょうりょくして あきらめますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện từ bỏ, từ bỏ hy vọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222383
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 投げますを 行いました。',
    example_reading = 'みんなで きょうりょくして なげますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện ném.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222384
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 守りますを 行いました。',
    example_reading = 'みんなで きょうりょくして まもりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện bảo vệ, tuân thủ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222385
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '誕生日に 友達に プレゼントを 上げました。',
    example_reading = 'たんじょうびに ともだちに ぷれぜんとを あげました。',
    example_vi = 'Tôi đã tặng quà cho bạn vào ngày sinh nhật.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222386
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '朝ご飯を 楽しく 下げます。',
    example_reading = 'あさごはんを たのしく さげます。',
    example_vi = 'Tôi hạ xuống, giảm giá bữa sáng thật vui vẻ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222387
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 伝えますを 行いました。',
    example_reading = 'みんなで きょうりょくして つたえますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện truyền đạt lại, nhắn lại.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222388
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 注意しますを 行いました。',
    example_reading = 'みんなで きょうりょくして ちゅういしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện chú ý, cẩn thận.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222389
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '先生に 丁寧な 言葉で 外します。',
    example_reading = 'せんせいに ていねいな ことばで はずします。',
    example_vi = 'Tôi rời khỏi (chỗ ngồi) với thầy giáo bằng lời lẽ lịch sự.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222390
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても 駄目な 性格の 人です。',
    example_reading = 'かれは とても だめな せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất không được, vô ích.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222391
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 席を よく 使います。',
    example_reading = 'にちじょうの せいかつで せきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng chỗ ngồi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222392
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ファイトを よく 使います。',
    example_reading = 'にちじょうの せいかつで ファイトを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng quyết tâm! cố lên!.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222393
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で マークを よく 使います。',
    example_reading = 'にちじょうの せいかつで マークを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng ký hiệu, mác.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222394
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ボールを よく 使います。',
    example_reading = 'にちじょうの せいかつで ボールを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng quả bóng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222395
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 洗濯機を よく 使います。',
    example_reading = 'にちじょうの せいかつで せんたくきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng máy giặt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222396
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に ～機を 準備して おきます。',
    example_reading = 'りょこうの まえに ～きを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn máy ~.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222397
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 規則を よく 使います。',
    example_reading = 'にちじょうの せいかつで きそくを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng quy tắc, nội quy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222398
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 使用禁止を よく 使います。',
    example_reading = 'にちじょうの せいかつで しようきんしを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cấm sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222399
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 立ち入り禁止を よく 使います。',
    example_reading = 'にちじょうの せいかつで たちいりきんしを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cấm vào.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222400
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 入口を よく 使います。',
    example_reading = 'にちじょうの せいかつで いりぐちを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cửa vào.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222401
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 出口を よく 使います。',
    example_reading = 'にちじょうの せいかつで でぐちを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cửa ra.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222402
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 非常口を よく 使います。',
    example_reading = 'にちじょうの せいかつで ひじょうぐちを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cửa thoát hiểm khẩn cấp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222403
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 無料を よく 使います。',
    example_reading = 'にちじょうの せいかつで むりょうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng miễn phí 0 đồng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222404
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '本日は休業は 親切で 優しい人です。',
    example_reading = 'ほんじつはきゅうぎょうは しんせつで やさしいひとです。',
    example_vi = 'Hôm nay nghỉ kinh doanh là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222405
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 営業中を よく 使います。',
    example_reading = 'にちじょうの せいかつで えいぎょうちゅうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đang mở cửa bán hàng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222406
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 使用中を よく 使います。',
    example_reading = 'にちじょうの せいかつで しようちゅうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đang sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222407
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に ～中を 準備して おきます。',
    example_reading = 'りょこうの まえに ～ちゅうを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn đang trong quá trình ~.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222408
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で どういう～を よく 使います。',
    example_reading = 'にちじょうの せいかつで どういう～を よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng ~ như thế nào.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222409
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で もうを よく 使います。',
    example_reading = 'にちじょうの せいかつで もうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng không ~ nữa (đi với phủ định).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222410
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で あと～を よく 使います。',
    example_reading = 'にちじょうの せいかつで あと～を よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng còn ~ nữa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222411
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 警察を よく 使います。',
    example_reading = 'にちじょうの せいかつで けいさつを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cảnh sát.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222412
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 締め切りを よく 使います。',
    example_reading = 'にちじょうの せいかつで しめきりを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng hạn chót deadline.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222413
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で締め切ります機会が増えました。',
    example_reading = 'まいにちの せいかつで しめきります きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội hết hạn, đóng hạn đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222414
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '朝ご飯を 楽しく 磨きます。',
    example_reading = 'あさごはんを たのしく みがきます。',
    example_vi = 'Tôi đánh (răng), mài bóng bữa sáng thật vui vẻ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222415
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 組み立てますを 行いました。',
    example_reading = 'みんなで きょうりょくして くみたてますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện lắp ráp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222416
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 折りますを 行いました。',
    example_reading = 'みんなで きょうりょくして おりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện gập, bẻ gãy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222417
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 気がつきますを 行いました。',
    example_reading = 'みんなで きょうりょくして きがつきますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện nhận ra, phát hiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222418
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して つけますを 行いました。',
    example_reading = 'みんなで きょうりょくして つけますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện chấm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222419
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で見つかります機会が増えました。',
    example_reading = 'まいにちの せいかつで みつかります きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội được tìm thấy đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222420
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '先生に 丁寧な 言葉で 質問します。',
    example_reading = 'せんせいに ていねいな ことばで しつもんします。',
    example_vi = 'Tôi đặt câu hỏi với thầy giáo bằng lời lẽ lịch sự.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222421
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '雨が降り始めたので、傘をさして歩きます。',
    example_reading = 'あめが ふりはじめたので、かさを さして あるきます。',
    example_vi = 'Vì trời bắt đầu mưa nên tôi giương ô vừa đi dạo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222422
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で スポーツクラブを よく 使います。',
    example_reading = 'にちじょうの せいかつで スポーツクラブを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng câu lạc bộ thể thao.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222423
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 城を よく 使います。',
    example_reading = 'にちじょうの せいかつで しろを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng lâu đài, thành quách.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222424
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 説明書を よく 使います。',
    example_reading = 'にちじょうの せいかつで せつめいしょを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bảng hướng dẫn sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222425
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で図という表現をよく使います。',
    example_reading = 'にほんごの かいわで ずという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt sơ đồ, bản vẽ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222426
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 線を よく 使います。',
    example_reading = 'にちじょうの せいかつで せんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đường kẻ, vạch.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222427
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 矢印を よく 使います。',
    example_reading = 'にちじょうの せいかつで やじるしを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng mũi tên chỉ hướng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222428
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 黒を よく 使います。',
    example_reading = 'にちじょうの せいかつで くろを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng màu đen.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222429
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 白を よく 使います。',
    example_reading = 'にちじょうの せいかつで しろを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng màu trắng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222430
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 赤を よく 使います。',
    example_reading = 'にちじょうの せいかつで あかを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng màu đỏ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222431
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '青は 親切で 優しい人です。',
    example_reading = 'あおは しんせつで やさしいひとです。',
    example_vi = 'Màu xanh dương là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222432
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '紺は 親切で 優しい人です。',
    example_reading = 'こんは しんせつで やさしいひとです。',
    example_vi = 'Màu xanh lam đậm là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222433
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 黄色を よく 使います。',
    example_reading = 'にちじょうの せいかつで きいろを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng màu vàng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222434
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 茶色を よく 使います。',
    example_reading = 'にちじょうの せいかつで ちゃいろを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng màu nâu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222435
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 醤油を よく 使います。',
    example_reading = 'にちじょうの せいかつで しょうゆを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nước tương shoyu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222436
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ソースを よく 使います。',
    example_reading = 'にちじょうの せいかつで ソースを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nước sốt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222437
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で お客さんを よく 使います。',
    example_reading = 'にちじょうの せいかつで おきゃくさんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng khách hàng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222438
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に ～か～を 準備して おきます。',
    example_reading = 'りょこうの まえに ～か～を じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn ~ hoặc ~.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222439
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '【N4】日常の 生活で 夕方を よく 使います。',
    example_reading = 'にちじょうの せいかつで ゆうがたを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng chiều tối.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222440
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で さっきを よく 使います。',
    example_reading = 'にちじょうの せいかつで さっきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng vừa nãy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222441
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 茶碗を よく 使います。',
    example_reading = 'にちじょうの せいかつで ちゃわんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bát ăn cơm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222442
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても 細いです。',
    example_reading = 'この りょうりは とても ほそいです。',
    example_vi = 'Món ăn này rất mảnh, gầy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222443
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても 太いです。',
    example_reading = 'この りょうりは とても ふといです。',
    example_vi = 'Món ăn này rất béo, to tròn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222444
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 盆踊りを よく 使います。',
    example_reading = 'にちじょうの せいかつで ぼんどおりを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng múa bon.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222445
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 家具を よく 使います。',
    example_reading = 'にちじょうの せいかつで かぐを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đồ gỗ gia dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222446
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 組み立てるを 行いました。',
    example_reading = 'みんなで きょうりょくして くみたてるを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện lắp ráp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222447
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 勝つを よく 使います。',
    example_reading = 'にちじょうの せいかつで かつを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng chiến thắng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222448
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 負けるを 行いました。',
    example_reading = 'みんなで きょうりょくして まけるを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện thất bại.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222449
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 咲きますを 行いました。',
    example_reading = 'みんなで きょうりょくして さきますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện nở.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222450
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '計画に 基づいて 変わりますを 進めて います。',
    example_reading = 'けいかくに もとづいて かわりますを すすめて います。',
    example_vi = 'Dựa trên kế hoạch, chúng tôi đang tiến hành thay đổi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222451
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '朝ご飯を 楽しく 困ります。',
    example_reading = 'あさごはんを たのしく こまります。',
    example_vi = 'Tôi rắc rối, khó khăn bữa sáng thật vui vẻ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222452
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 付けますを 行いました。',
    example_reading = 'みんなで きょうりょくして つけますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện vẽ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222453
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '道の端に落とした鍵を丁寧に拾い上げました。',
    example_reading = 'みちの はしに おとした かぎを ていねいに ひろいあげました。',
    example_vi = 'Tôi đã cẩn thận nhặt chiếc chìa khóa bị rơi ở mép đường.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222454
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して かかりますを 行いました。',
    example_reading = 'みんなで きょうりょくして かかりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện tốn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222455
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても 楽な 性格の 人です。',
    example_reading = 'かれは とても らくな せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất thoải mái, nhàn nhã.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222456
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 町は とても 静かで 正しいです。',
    example_reading = 'この まちは とても しずかで ただしいです。',
    example_vi = 'Thành phố này rất yên tĩnh và Đúng đắn, chính xác.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222457
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても 珍しいです。',
    example_reading = 'この りょうりは とても めずらしいです。',
    example_vi = 'Món ăn này rất hiếm có, lạ mắt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222458
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 方を よく 使います。',
    example_reading = 'にちじょうの せいかつで かたを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng người (ngài).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222459
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 向こうを よく 使います。',
    example_reading = 'にちじょうの せいかつで むこうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng phía bên kia.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222460
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 島を よく 使います。',
    example_reading = 'にちじょうの せいかつで しまを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng hòn đảo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222461
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 港を よく 使います。',
    example_reading = 'にちじょうの せいかつで みなとを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cảng biển.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222462
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '近所は 親切で 優しい人です。',
    example_reading = 'きんじょは しんせつで やさしいひとです。',
    example_vi = 'Hàng xóm xung quanh là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222463
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 屋上を よく 使います。',
    example_reading = 'にちじょうの せいかつで おくじょうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng sân thượng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222464
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 海外を よく 使います。',
    example_reading = 'にちじょうの せいかつで かいがいを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng hải ngoại, nước ngoài.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222465
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 山登りを よく 使います。',
    example_reading = 'にちじょうの せいかつで やまのぼりを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng leo núi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222466
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ハイキングを よく 使います。',
    example_reading = 'にちじょうの せいかつで ハイキングを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đi dã ngoại hiking.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222467
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 機会を よく 使います。',
    example_reading = 'にちじょうの せいかつで きかいを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cơ hội.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222468
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 許可を よく 使います。',
    example_reading = 'にちじょうの せいかつで きょかを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng giấy phép.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222469
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 丸を よく 使います。',
    example_reading = 'にちじょうの せいかつで まるを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng vòng tròn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222470
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 操作を よく 使います。',
    example_reading = 'にちじょうの せいかつで そうさを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng thao tác điều khiển.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222471
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 方法を よく 使います。',
    example_reading = 'にちじょうの せいかつで ほうほうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng phương pháp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222472
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 設備を よく 使います。',
    example_reading = 'にちじょうの せいかつで せつびを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng thiết bị.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222473
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で カーテンを よく 使います。',
    example_reading = 'にちじょうの せいかつで カーテンを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng rèm cửa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222474
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 紐を よく 使います。',
    example_reading = 'にちじょうの せいかつで ひもを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng sợi dây.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222475
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ふたを よく 使います。',
    example_reading = 'にちじょうの せいかつで ふたを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cái nắp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222476
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 葉を よく 使います。',
    example_reading = 'にちじょうの せいかつで はを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng lá cây.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222477
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 曲を よく 使います。',
    example_reading = 'にちじょうの せいかつで きょくを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng ca khúc, bản nhạc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222478
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 楽しみを よく 使います。',
    example_reading = 'にちじょうの せいかつで たのしみを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng niềm vui.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222479
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても それなら 性格の 人です。',
    example_reading = 'かれは とても それなら せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất nếu thế thì.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222480
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 夜行バスを よく 使います。',
    example_reading = 'にちじょうの せいかつで やこうばすを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng xe bus chạy đêm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222481
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 旅行社を よく 使います。',
    example_reading = 'にちじょうの せいかつで りょこうしゃを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng công ty du lịch.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222482
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても 詳しいです。',
    example_reading = 'この りょうりは とても くわしいです。',
    example_vi = 'Món ăn này rất chi tiết, tường tận.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222483
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で スキー場を よく 使います。',
    example_reading = 'にちじょうの せいかつで すきーじょうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng khu trượt tuyết.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222484
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 遭いますを 行いました。',
    example_reading = 'みんなで きょうりょくして あいますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện gặp phải.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222485
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 貯金しますを 行いました。',
    example_reading = 'みんなで きょうりょくして ちょきんしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện tiết kiệm tiền.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222486
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 過ぎますを 行いました。',
    example_reading = 'みんなで きょうりょくして すぎますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện quá.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222487
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 慣れますを 行いました。',
    example_reading = 'みんなで きょうりょくして なれますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện quen với.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222488
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 腐りますを 行いました。',
    example_reading = 'みんなで きょうりょくして くさりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện bị ôi thiu, mục nát.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222489
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ラッシュを よく 使います。',
    example_reading = 'にちじょうの せいかつで ラッシュを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng giờ cao điểm rush hour.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222490
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 宇宙を よく 使います。',
    example_reading = 'にちじょうの せいかつで うちゅうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng vũ trụ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222491
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '【N4】日常の 生活で 曲を よく 使います。',
    example_reading = 'にちじょうの せいかつで きょくを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng Bản nhạc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222492
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎月は 家族と 過ごします。',
    example_reading = 'まいつきは かぞくと すごします。',
    example_vi = 'Hàng tháng tôi dành thời gian bên gia đình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222493
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'まいとしは 家族と 過ごします。',
    example_reading = 'まいとしは かぞくと すごします。',
    example_vi = 'Hàng năm tôi dành thời gian bên gia đình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222494
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても かなり 性格の 人です。',
    example_reading = 'かれは とても かなり せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất khá là.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222495
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 絶対にを よく 使います。',
    example_reading = 'にちじょうの せいかつで ぜったいにを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tuyệt đối (không).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222496
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 上手にお使いですねを よく 使います。',
    example_reading = 'にちじょうの せいかつで じょうずにおつかいですねを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng dùng thành thạo nhỉ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222497
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '【N4】彼は とても かなり 性格の 人です。',
    example_reading = 'かれは とても かなり せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất rất, khá.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222498
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 自慢しますを 行いました。',
    example_reading = 'みんなで きょうりょくして じまんしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện tự hào, khoe khoang.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222499
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 挑戦しますを 行いました。',
    example_reading = 'みんなで きょうりょくして ちょうせんしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện thử thách.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222500
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 気持ちを よく 使います。',
    example_reading = 'にちじょうの せいかつで きもちを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tâm trạng, cảm giác.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222501
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 乗り物を よく 使います。',
    example_reading = 'にちじょうの せいかつで のりものを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng phương tiện giao thông.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222502
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 歴史を よく 使います。',
    example_reading = 'にちじょうの せいかつで れきしを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng lịch sử.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222503
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で世紀という表現をよく使います。',
    example_reading = 'にほんごの かいわで せいきという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt thế kỷ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222504
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 遠くを よく 使います。',
    example_reading = 'にちじょうの せいかつで とおくを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nơi xa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222505
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 汽車を よく 使います。',
    example_reading = 'にちじょうの せいかつで きしゃを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tàu hỏa chạy bằng hơi nước.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222506
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 汽船を よく 使います。',
    example_reading = 'にちじょうの せいかつで きせんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tàu thủy hơi nước.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222507
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '大勢の～は 親切で 優しい人です。',
    example_reading = 'おおぜいの～は しんせつで やさしいひとです。',
    example_vi = 'Nhiều (người) là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222508
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 運びますを 行いました。',
    example_reading = 'みんなで きょうりょくして はこびますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện vận chuyển, mang vác.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222509
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 飛ぶを よく 使います。',
    example_reading = 'にちじょうの せいかつで とぶを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bay.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222510
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても 安全な 性格の 人です。',
    example_reading = 'かれは とても あんぜんな せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất an toàn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222511
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 宇宙飛行士を よく 使います。',
    example_reading = 'にちじょうの せいかつで うちゅうひこうしを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng phi hành gia vũ trụ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222512
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して ほめますを 行いました。',
    example_reading = 'みんなで きょうりょくして ほめますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện khen.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222513
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して しかりますを 行いました。',
    example_reading = 'みんなで きょうりょくして しかりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện mắng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222514
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して さそいますを 行いました。',
    example_reading = 'みんなで きょうりょくして さそいますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện mời, rủ rê.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222515
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して おこしますを 行いました。',
    example_reading = 'みんなで きょうりょくして おこしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện đánh thức.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222516
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して しょうたいしますを 行いました。',
    example_reading = 'みんなで きょうりょくして しょうたいしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện mời.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222517
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '困ったときは、遠慮なく友達に頼みます。',
    example_reading = 'こまった ときは、えんりょなく ともだちに たのみます。',
    example_vi = 'Khi gặp khó khăn, tôi không ngần ngại nhờ cậy bạn bè.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222518
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して ちゅういしますを 行いました。',
    example_reading = 'みんなで きょうりょくして ちゅういしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện chú ý, nhắc nhở.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222519
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '朝ご飯を 楽しく とります。',
    example_reading = 'あさごはんを たのしく とります。',
    example_vi = 'Tôi ăn trộm , lấy cắp bữa sáng thật vui vẻ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222520
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '満員電車の中で、うっかり人の足を踏んでしまった。',
    example_reading = 'まんいんでんしゃの なかで、うっかり ひとの あしを ふんでしまった。',
    example_vi = 'Trên tàu điện đông người, tôi vô tình giẫm phải chân người khác.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222521
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して こわしますを 行いました。',
    example_reading = 'みんなで きょうりょくして こわしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện phá, làm hỏng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222522
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して よごしますを 行いました。',
    example_reading = 'みんなで きょうりょくして よごしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện làm bẩn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222523
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して おこないますを 行いました。',
    example_reading = 'みんなで きょうりょくして おこないますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện thực hiện, tiến hành.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222524
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して ゆしゅつしますを 行いました。',
    example_reading = 'みんなで きょうりょくして ゆしゅつしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện xuất khẩu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222525
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して ゆにゅうしますを 行いました。',
    example_reading = 'みんなで きょうりょくして ゆにゅうしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện nhập khẩu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222526
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して ほんやくしますを 行いました。',
    example_reading = 'みんなで きょうりょくして ほんやくしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện dịch.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222527
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で発明します機会が増えました。',
    example_reading = 'まいにちの せいかつで はつめいします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội phát minh đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222528
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で発見します機会が増えました。',
    example_reading = 'まいにちの せいかつで はっけんします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội phát kiến, tìm ra đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222529
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して せっけいしますを 行いました。',
    example_reading = 'みんなで きょうりょくして せっけいしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện thiết kế.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222530
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で こめを よく 使います。',
    example_reading = 'にちじょうの せいかつで こめを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng gạo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222531
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で むぎを よく 使います。',
    example_reading = 'にちじょうの せいかつで むぎを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng lúa mạch.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222532
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で せきゆを よく 使います。',
    example_reading = 'にちじょうの せいかつで せきゆを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng dầu mỏ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222533
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で げんりょうを よく 使います。',
    example_reading = 'にちじょうの せいかつで げんりょうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nguyên liệu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222534
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で デートを よく 使います。',
    example_reading = 'にちじょうの せいかつで デートを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cuộc hẹn hò.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222535
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で どろぼうを よく 使います。',
    example_reading = 'にちじょうの せいかつで どろぼうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng kẻ trộm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222536
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で けいかんを よく 使います。',
    example_reading = 'にちじょうの せいかつで けいかんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cảnh sát.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222537
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で けんちくかを よく 使います。',
    example_reading = 'にちじょうの せいかつで けんちくかを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng kiến trúc sư.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222538
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '休日に かがくしゃへ 行きました。',
    example_reading = 'きゅうじつに かがくしゃへ いきました。',
    example_vi = 'Vào ngày nghỉ tôi đã đến nhà khoa học.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222539
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'まんがは 親切で 優しい人です。',
    example_reading = 'まんがは しんせつで やさしいひとです。',
    example_vi = 'truyện tranh là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222540
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で せかいじゅうを よく 使います。',
    example_reading = 'にちじょうの せいかつで せかいじゅうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng khắp thế giới, toàn thế giới.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222541
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ―じゅうを よく 使います。',
    example_reading = 'にちじょうの せいかつで ―じゅうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng khắp–.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222542
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ―によってを よく 使います。',
    example_reading = 'にちじょうの せいかつで ―によってを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng do–.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222543
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で よかったですねを よく 使います。',
    example_reading = 'にちじょうの せいかつで よかったですねを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng may nhỉ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222544
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して うめたてますを 行いました。',
    example_reading = 'みんなで きょうりょくして うめたてますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện lấp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222545
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ぎじゅつを よく 使います。',
    example_reading = 'にちじょうの せいかつで ぎじゅつを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng kỹ thuật.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222546
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で とちを よく 使います。',
    example_reading = 'にちじょうの せいかつで とちを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đất, diện tích đất.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222547
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で そうおんを よく 使います。',
    example_reading = 'にちじょうの せいかつで そうおんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tiếng ồn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222548
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して りようしますを 行いました。',
    example_reading = 'みんなで きょうりょくして りようしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222549
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で アクセスを よく 使います。',
    example_reading = 'にちじょうの せいかつで アクセスを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nối, giao thông đi đến.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222550
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ドミニカを よく 使います。',
    example_reading = 'にちじょうの せいかつで ドミニカを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng dominica(tên một quốc gia ở Trung Mỹ).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222551
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ーせいきを よく 使います。',
    example_reading = 'にちじょうの せいかつで ーせいきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng thế kỷ-.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222552
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても ごうか（な） 性格の 人です。',
    example_reading = 'かれは とても ごうか（な） せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất hào hoa,sang trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222553
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ちょうこくを よく 使います。',
    example_reading = 'にちじょうの せいかつで ちょうこくを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng điêu khắc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222554
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して ねむりますを 行いました。',
    example_reading = 'みんなで きょうりょくして ねむりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện ngủ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222555
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して ほりますを 行いました。',
    example_reading = 'みんなで きょうりょくして ほりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện khắc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222556
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'なかまは 親切で 優しい人です。',
    example_reading = 'なかまは しんせつで やさしいひとです。',
    example_vi = 'bạn bè,đồng nghiệp là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222557
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で そのあとを よく 使います。',
    example_reading = 'にちじょうの せいかつで そのあとを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng sau đó.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222558
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても いっしょうけんめいです。',
    example_reading = 'この りょうりは とても いっしょうけんめいです。',
    example_vi = 'Món ăn này rất cố gắng hết sức.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222559
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ねずみを よく 使います。',
    example_reading = 'にちじょうの せいかつで ねずみを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng chuột.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222560
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で いっぴきもいませんを よく 使います。',
    example_reading = 'にちじょうの せいかつで いっぴきもいませんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng không có con nào cả.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222561
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して そだてますを 行いました。',
    example_reading = 'みんなで きょうりょくして そだてますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện nuôi,trồng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222562
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して はこびますを 行いました。',
    example_reading = 'みんなで きょうりょくして はこびますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện chở, vận chuyển.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222563
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して なくなりますを 行いました。',
    example_reading = 'みんなで きょうりょくして なくなりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện mất, qua đời.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222564
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して にゅういんしますを 行いました。',
    example_reading = 'みんなで きょうりょくして にゅういんしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện nhập viện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222565
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して たいいんしますを 行いました。',
    example_reading = 'みんなで きょうりょくして たいいんしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện xuất viện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222566
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して いれますを 行いました。',
    example_reading = 'みんなで きょうりょくして いれますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện bật.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222567
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して きりますを 行いました。',
    example_reading = 'みんなで きょうりょくして きりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện tắt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222568
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して かけますを 行いました。',
    example_reading = 'みんなで きょうりょくして かけますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện khóa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222569
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても きもちがいいです。',
    example_reading = 'この りょうりは とても きもちがいいです。',
    example_vi = 'Món ăn này rất dễ chịu, thư giản.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222570
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても きもちがわるいです。',
    example_reading = 'この りょうりは とても きもちがわるいです。',
    example_vi = 'Món ăn này rất khó chịu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222571
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても おおきなー 性格の 人です。',
    example_reading = 'かれは とても おおきなー せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất –to, –lớn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222572
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても ちいさなー 性格の 人です。',
    example_reading = 'かれは とても ちいさなー せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất –nhỏ, –bé.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222573
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で あかちゃんを よく 使います。',
    example_reading = 'にちじょうの せいかつで あかちゃんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng em bé.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222574
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '休日に しょうがっこうへ 行きました。',
    example_reading = 'きゅうじつに しょうがっこうへ いきました。',
    example_vi = 'Vào ngày nghỉ tôi đã đến trường tiểu học.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222575
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '休日に ちゅうがっこうへ 行きました。',
    example_reading = 'きゅうじつに ちゅうがっこうへ いきました。',
    example_vi = 'Vào ngày nghỉ tôi đã đến trường trung học cơ sở.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222576
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '休日に えきまえへ 行きました。',
    example_reading = 'きゅうじつに えきまえへ いきました。',
    example_vi = 'Vào ngày nghỉ tôi đã đến khu vực trước nha ga.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222577
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で かいがんを よく 使います。',
    example_reading = 'にちじょうの せいかつで かいがんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bờ biển.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222578
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で うそを よく 使います。',
    example_reading = 'にちじょうの せいかつで うそを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nói dối, lời nói dối.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222579
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても しょるいです。',
    example_reading = 'この りょうりは とても しょるいです。',
    example_vi = 'Món ăn này rất giấy tờ,tài liệu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222580
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で でんげんを よく 使います。',
    example_reading = 'にちじょうの せいかつで でんげんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nguồn điện , công tắc điện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222581
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても ―せいです。',
    example_reading = 'この りょうりは とても ―せいです。',
    example_vi = 'Món ăn này rất sản xuất tai–.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222582
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても あ、いけないです。',
    example_reading = 'この りょうりは とても あ、いけないです。',
    example_vi = 'Món ăn này rất ôi, hỏng mất rồi./ôi, trời ơi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222583
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で おさきにを よく 使います。',
    example_reading = 'にちじょうの せいかつで おさきにを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tôi xin phép về trước.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222584
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で かいらんを よく 使います。',
    example_reading = 'にちじょうの せいかつで かいらんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tập thông báo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222585
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で けんきゅうしつを よく 使います。',
    example_reading = 'にちじょうの せいかつで けんきゅうしつを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng phòng nghiên cứu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222586
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で きちんとを よく 使います。',
    example_reading = 'にちじょうの せいかつで きちんとを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nhiêm chỉnh, hẳn hoi, đứng đắn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222587
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して せいりしますを 行いました。',
    example_reading = 'みんなで きょうりょくして せいりしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện sắp xếp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222588
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で はんこを よく 使います。',
    example_reading = 'にちじょうの せいかつで はんこを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng con dấu, dấu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222589
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して おしますを 行いました。',
    example_reading = 'みんなで きょうりょくして おしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện đóng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222590
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ふたごを よく 使います。',
    example_reading = 'にちじょうの せいかつで ふたごを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cặp sinh đôi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222591
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても しまいです。',
    example_reading = 'この りょうりは とても しまいです。',
    example_vi = 'Món ăn này rất chị em.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222592
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても ５ねんせいです。',
    example_reading = 'この りょうりは とても ５ねんせいです。',
    example_vi = 'Món ăn này rất học sinh năm thứ 5.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222593
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して にていますを 行いました。',
    example_reading = 'みんなで きょうりょくして にていますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện giống.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222594
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で せいかくを よく 使います。',
    example_reading = 'にちじょうの せいかつで せいかくを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tính cách.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222595
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても おとなしいです。',
    example_reading = 'この りょうりは とても おとなしいです。',
    example_vi = 'Món ăn này rất hiền lành, trầm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222596
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して せわをしますを 行いました。',
    example_reading = 'みんなで きょうりょくして せわをしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện chăm sóc , giúp đỡ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222597
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎朝 8時に じかんがたちます。',
    example_reading = 'まいあさ はちじに じかんがたちます。',
    example_vi = 'Mỗi sáng tôi thời gian trôi đi lúc 8 giờ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222598
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で だいすきを よく 使います。',
    example_reading = 'にちじょうの せいかつで だいすきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng rất thích.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222599
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で クラスを よく 使います。',
    example_reading = 'にちじょうの せいかつで クラスを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng lớp học, lớp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222600
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して けんかしますを 行いました。',
    example_reading = 'みんなで きょうりょくして けんかしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện cãi nhau.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222601
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても ふしぎ（な） 性格の 人です。',
    example_reading = 'かれは とても ふしぎ（な） せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất bí ẩn , kỳ thú, khó hiểu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222602
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で答えます機会が増えました。',
    example_reading = 'まいにちの せいかつで こたえます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội trả lời (câu hỏi) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222603
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 倒れますを 行いました。',
    example_reading = 'みんなで きょうりょくして たおれますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện đổ, sụp đổ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222604
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 通りますを 行いました。',
    example_reading = 'みんなで きょうりょくして とおりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện đi qua.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222605
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 死にますを 行いました。',
    example_reading = 'みんなで きょうりょくして しにますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện qua đời, chết.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222606
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して びっくりしますを 行いました。',
    example_reading = 'みんなで きょうりょくして びっくりしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện giật mình, ngạc nhiên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222607
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して がっかりしますを 行いました。',
    example_reading = 'みんなで きょうりょくして がっかりしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện thất vọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222608
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 安心しますを 行いました。',
    example_reading = 'みんなで きょうりょくして あんしんしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện yên tâm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222609
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 喧嘩しますを 行いました。',
    example_reading = 'みんなで きょうりょくして けんかしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện cãi nhau, đánh nhau.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222610
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 離婚しますを 行いました。',
    example_reading = 'みんなで きょうりょくして りこんしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện ly hôn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222611
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '朝ご飯を 楽しく 太ります。',
    example_reading = 'あさごはんを たのしく ふとります。',
    example_vi = 'Tôi béo lên, tăng cân bữa sáng thật vui vẻ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222612
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎朝 8時に 痩せます。',
    example_reading = 'まいあさ はちじに やせます。',
    example_vi = 'Mỗi sáng tôi gầy đi, giảm cân lúc 8 giờ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222613
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても 複雑な 性格の 人です。',
    example_reading = 'かれは とても ふくざつな せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất phức tạp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222614
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても 邪魔な 性格の 人です。',
    example_reading = 'かれは とても じゃまな せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất cản trở, phiền hà.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222615
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても 硬いです。',
    example_reading = 'この りょうりは とても かたいです。',
    example_vi = 'Món ăn này rất cứng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222616
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても 軟らかいです。',
    example_reading = 'この りょうりは とても やわらかいです。',
    example_vi = 'Món ăn này rất mềm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222617
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても 汚いです。',
    example_reading = 'この りょうりは とても きたないです。',
    example_vi = 'Món ăn này rất bẩn thiểu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222618
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 嬉しさを よく 使います。',
    example_reading = 'にちじょうの せいかつで うれしさを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nỗi niềm vui mừng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222619
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 悲しみを よく 使います。',
    example_reading = 'にちじょうの せいかつで かなしみを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nỗi buồn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222620
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても 恥ずかしいです。',
    example_reading = 'この りょうりは とても はずかしいです。',
    example_vi = 'Món ăn này rất xấu hổ, ngượng ngùng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222621
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 地震を よく 使います。',
    example_reading = 'にちじょうの せいかつで じしんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng trận động đất.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222622
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 津波を よく 使います。',
    example_reading = 'にちじょうの せいかつで つなみを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng sóng thần.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222623
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 台風を よく 使います。',
    example_reading = 'にちじょうの せいかつで たいふうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cơn bão.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222624
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 雷を よく 使います。',
    example_reading = 'にちじょうの せいかつで かみなりを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng sấm sét.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222625
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '休日に 火事へ 行きました。',
    example_reading = 'きゅうじつに かじへ いきました。',
    example_vi = 'Vào ngày nghỉ tôi đã đến hỏa hoạn, cháy nhà.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222626
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 事故を よく 使います。',
    example_reading = 'にちじょうの せいかつで じこを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tai nạn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222627
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '【N4】日常の 生活で ハイキングを よく 使います。',
    example_reading = 'にちじょうの せいかつで ハイキングを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng dã ngoại hiking.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222628
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても お見合いです。',
    example_reading = 'この りょうりは とても おみあいです。',
    example_vi = 'Món ăn này rất xem mắt hôn nhân.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222629
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日 操作を 利用します。',
    example_reading = 'まいにち そうさを りようします。',
    example_vi = 'Mỗi ngày tôi đều sử dụng thao tác máy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222630
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '休日に 会場へ 行きました。',
    example_reading = 'きゅうじつに かいじょうへ いきました。',
    example_vi = 'Vào ngày nghỉ tôi đã đến hội trường.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222631
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に ～代を 準備して おきます。',
    example_reading = 'りょこうの まえに ～だいを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn phí ~, tiền ~.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222632
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で フロントを よく 使います。',
    example_reading = 'にちじょうの せいかつで フロントを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng quầy lễ tân.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222633
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に ～号室を 準備して おきます。',
    example_reading = 'りょこうの まえに ～ごうしつを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn phòng số ~.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222634
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で タオルを よく 使います。',
    example_reading = 'にちじょうの せいかつで タオルを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng khăn tắm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222635
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 石鹸を よく 使います。',
    example_reading = 'にちじょうの せいかつで せっけんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bánh xà phòng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222636
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '大勢は 親切で 優しい人です。',
    example_reading = 'おおぜいは しんせつで やさしいひとです。',
    example_vi = 'Đông người là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222637
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して かぞえますを 行いました。',
    example_reading = 'みんなで きょうりょくして かぞえますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện đếm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222638
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して はかりますを 行いました。',
    example_reading = 'みんなで きょうりょくして はかりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện đo, cân.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222639
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して たしかめますを 行いました。',
    example_reading = 'みんなで きょうりょくして たしかめますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện xác nhận.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222640
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して あいますを 行いました。',
    example_reading = 'みんなで きょうりょくして あいますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện vừa , hợp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222641
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して しゅっぱつしますを 行いました。',
    example_reading = 'みんなで きょうりょくして しゅっぱつしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện xuất phát, khởi hành.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222642
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎朝 8時に とうちゃくします。',
    example_reading = 'まいあさ はちじに とうちゃくします。',
    example_vi = 'Mỗi sáng tôi đến , đến nơi lúc 8 giờ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222643
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して よいますを 行いました。',
    example_reading = 'みんなで きょうりょくして よいますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện say.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222644
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても きけん（な） 性格の 人です。',
    example_reading = 'かれは とても きけん（な） せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất nguy hiểm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222645
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても ひつよう（な） 性格の 人です。',
    example_reading = 'かれは とても ひつよう（な） せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất cần thiết.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222646
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で うちゅうを よく 使います。',
    example_reading = 'にちじょうの せいかつで うちゅうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng vũ trụ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222647
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ちきゅうを よく 使います。',
    example_reading = 'にちじょうの せいかつで ちきゅうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng trái đất.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222648
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても ぼうねんかいです。',
    example_reading = 'この りょうりは とても ぼうねんかいです。',
    example_vi = 'Món ăn này rất tiệc tất niên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222649
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても しんねんかいです。',
    example_reading = 'この りょうりは とても しんねんかいです。',
    example_vi = 'Món ăn này rất tiệc tân niên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222650
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても にじかいです。',
    example_reading = 'この りょうりは とても にじかいです。',
    example_vi = 'Món ăn này rất bữa tiệc thứ hai, tăng hai.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222651
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても たいかいです。',
    example_reading = 'この りょうりは とても たいかいです。',
    example_vi = 'Món ăn này rất đại hội , cuộc thi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222652
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で マラソンを よく 使います。',
    example_reading = 'にちじょうの せいかつで マラソンを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng ma-ra-tong.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222653
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で コンテストを よく 使います。',
    example_reading = 'にちじょうの せいかつで コンテストを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cuộc thi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222654
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で おもてを よく 使います。',
    example_reading = 'にちじょうの せいかつで おもてを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng phía trước , mặt trước.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222655
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で うらを よく 使います。',
    example_reading = 'にちじょうの せいかつで うらを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng phía sau , mặt sau.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222656
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で へんじを よく 使います。',
    example_reading = 'にちじょうの せいかつで へんじを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng hồi âm , trả lời.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222657
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で もうしこみを よく 使います。',
    example_reading = 'にちじょうの せいかつで もうしこみを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đăng ký.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222658
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ほんとうを よく 使います。',
    example_reading = 'にちじょうの せいかつで ほんとうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng thật.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222659
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても まちがいです。',
    example_reading = 'この りょうりは とても まちがいです。',
    example_vi = 'Món ăn này rất sai , lỗi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222660
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で きずを よく 使います。',
    example_reading = 'にちじょうの せいかつで きずを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng viết thương.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222661
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ズボンを よく 使います。',
    example_reading = 'にちじょうの せいかつで ズボンを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cái quần.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222662
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても ながさ 性格の 人です。',
    example_reading = 'かれは とても ながさ せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất chiều dài.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222663
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で おもさを よく 使います。',
    example_reading = 'にちじょうの せいかつで おもさを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cân nặng, trọng lượng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222664
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で たかさを よく 使います。',
    example_reading = 'にちじょうの せいかつで たかさを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng chiều cao.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222665
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で おおきさを よく 使います。',
    example_reading = 'にちじょうの せいかつで おおきさを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cỡ , kích thước.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222666
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ―びんを よく 使います。',
    example_reading = 'にちじょうの せいかつで ―びんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng chuyến bay–.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222667
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ―ごうを よく 使います。',
    example_reading = 'にちじょうの せいかつで ―ごうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng số–.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222668
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ―こを よく 使います。',
    example_reading = 'にちじょうの せいかつで ―こを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cái, cục , viên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222669
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でー本という表現をよく使います。',
    example_reading = 'にほんごの かいわで ―ほんという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt cái(đơn vị đếm vật dài).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222670
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても ―はいです。',
    example_reading = 'この りょうりは とても ―はいです。',
    example_vi = 'Món ăn này rất –chén, –cốc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222671
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ―キロを よく 使います。',
    example_reading = 'にちじょうの せいかつで ―キロを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng –ki-lo, –cân.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222672
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '休日に ―グラムへ 行きました。',
    example_reading = 'きゅうじつに ―グラムへ いきました。',
    example_vi = 'Vào ngày nghỉ tôi đã đến –gam.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222673
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ーセンチを よく 使います。',
    example_reading = 'にちじょうの せいかつで ーセンチを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng –xăng-ti-mét.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222674
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ーミリを よく 使います。',
    example_reading = 'にちじょうの せいかつで ーミリを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng –mi-li-mét.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222675
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ―いじょうを よく 使います。',
    example_reading = 'にちじょうの せいかつで ―いじょうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng trở lên, trên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222676
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ―いかを よく 使います。',
    example_reading = 'にちじょうの せいかつで ―いかを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng trở xuống, dưới.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222677
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で さあを よく 使います。',
    example_reading = 'にちじょうの せいかつで さあを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng à.., ồ..,(dùng khi không rõ về điều gì đó).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222678
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '新しい 計画について、どうでしょうか。',
    example_reading = 'あたらしい けいかくについて、どうでしょうか。',
    example_vi = 'Ý kiến của bạn thế nào về kế hoạch mới?',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222679
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '【N4】日常の 生活で クラスを よく 使います。',
    example_reading = 'にちじょうの せいかつで クラスを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng lớp học.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222680
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で テストを よく 使います。',
    example_reading = 'にちじょうの せいかつで テストを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bài kiểm tra.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222681
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で せいせきを よく 使います。',
    example_reading = 'にちじょうの せいかつで せいせきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng kết quả, thành tích.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222682
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ところでを よく 使います。',
    example_reading = 'にちじょうの せいかつで ところでを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nhân tiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222683
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎朝 8時に いらっしゃいます。',
    example_reading = 'まいあさ はちじに いらっしゃいます。',
    example_vi = 'Mỗi sáng tôi đến(kính ngữ của きます） lúc 8 giờ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222684
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ようすを よく 使います。',
    example_reading = 'にちじょうの せいかつで ようすを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng vẻ, tình hình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222685
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で じけんを よく 使います。',
    example_reading = 'にちじょうの せいかつで じけんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng vụ án.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222686
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日 バイクを 利用します。',
    example_reading = 'まいにち バイクを りようします。',
    example_vi = 'Mỗi ngày tôi đều sử dụng xe máy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222687
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ばくだんを よく 使います。',
    example_reading = 'にちじょうの せいかつで ばくだんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bom.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222688
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'トラックの荷台に大きな荷物をたくさん積みます。',
    example_reading = 'トラックの にだいに おおきな にもつを たくさん つみます。',
    example_vi = 'Chất nhiều hàng hóa lớn lên thùng xe tải.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222689
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日 うんてんしゅを 利用します。',
    example_reading = 'まいにち うんてんしゅを りようします。',
    example_vi = 'Mỗi ngày tôi đều sử dụng lái xe.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222690
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても はなれた 性格の 人です。',
    example_reading = 'かれは とても はなれた せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất xa cách, xa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222691
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で がを よく 使います。',
    example_reading = 'にちじょうの せいかつで がを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nhưng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222692
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で きゅうにを よく 使います。',
    example_reading = 'にちじょうの せいかつで きゅうにを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng gấp, đột nhiên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222693
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して うごかしますを 行いました。',
    example_reading = 'みんなで きょうりょくして うごかしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện khởi động, chạy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222694
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても いっしょけんめいです。',
    example_reading = 'この りょうりは とても いっしょけんめいです。',
    example_vi = 'Món ăn này rất hết sức, chăm chỉ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222695
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 頂きますを 行いました。',
    example_reading = 'みんなで きょうりょくして いただきますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện nhận.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222696
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して くださいますを 行いました。',
    example_reading = 'みんなで きょうりょくして くださいますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện cho, tặng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222697
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎朝、庭で飼っている犬にエサをやります。',
    example_reading = 'まいあさ、にわで かっている いぬに エサを やります。',
    example_vi = 'Mỗi sáng tôi cho chú chó nuôi ngoài sân ăn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222698
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '先生に 宿題を 上げました。',
    example_reading = 'せんせいに しゅくだいを あげました。',
    example_vi = 'Tôi đã nộp/đưa bài tập về nhà cho giáo viên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222699
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎朝 8時に 下げます。',
    example_reading = 'まいあさ はちじに さげます。',
    example_vi = 'Mỗi sáng tôi hạ xuống, giảm đi lúc 8 giờ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222700
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で親切にします機会が増えました。',
    example_reading = 'まいにちの せいかつで しんせつにします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội đối xử tử tế với đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222701
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても かわいいです。',
    example_reading = 'この りょうりは とても かわいいです。',
    example_vi = 'Món ăn này rất dễ thương, đáng yêu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222702
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '【N4】この 料理は とても 珍しいです。',
    example_reading = 'この りょうりは とても めずらしいです。',
    example_vi = 'Món ăn này rất quý hiếm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222703
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても お祝いです。',
    example_reading = 'この りょうりは とても おいわいです。',
    example_vi = 'Món ăn này rất quà mừng, lễ mừng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222704
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'お年玉は 家族と 過ごします。',
    example_reading = 'おとしだまは かぞくと すごします。',
    example_vi = 'Tiền lì xì đầu năm tôi dành thời gian bên gia đình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222705
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても お見舞いです。',
    example_reading = 'この りょうりは とても おみまいです。',
    example_vi = 'Món ăn này rất thăm bệnh, quà thăm bệnh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222706
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 興味を よく 使います。',
    example_reading = 'にちじょうの せいかつで きょうみを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng hứng thú, quan tâm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222707
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 情報を よく 使います。',
    example_reading = 'にちじょうの せいかつで じょうほうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng thông tin.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222708
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 文法を よく 使います。',
    example_reading = 'にちじょうの せいかつで ぶんぽうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng ngữ pháp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222709
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 発音を よく 使います。',
    example_reading = 'にちじょうの せいかつで はつおんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng phát âm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222710
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 猿を よく 使います。',
    example_reading = 'にちじょうの せいかつで さるを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng con khỉ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222711
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で エサを よく 使います。',
    example_reading = 'にちじょうの せいかつで エサを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng thức ăn cho động vật.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222712
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で おもちゃを よく 使います。',
    example_reading = 'にちじょうの せいかつで おもちゃを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đồ chơi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222713
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '絵本は 親切で 優しい人です。',
    example_reading = 'えほんは しんせつで やさしいひとです。',
    example_vi = 'Sách tranh thiếu nhi là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222714
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 絵はがきを よく 使います。',
    example_reading = 'にちじょうの せいかつで えはがきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bưu thiếp ảnh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222715
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ドライバーを よく 使います。',
    example_reading = 'にちじょうの せいかつで ドライバーを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tua vít driver.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222716
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ハンカチを よく 使います。',
    example_reading = 'にちじょうの せいかつで ハンカチを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng khăn tay.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222717
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 靴下を よく 使います。',
    example_reading = 'にちじょうの せいかつで くつしたを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đôi tất, vớ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222718
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 手袋を よく 使います。',
    example_reading = 'にちじょうの せいかつで てぶくろを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng găng tay.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222719
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 幼稚園を よく 使います。',
    example_reading = 'にちじょうの せいかつで ようちえんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng trường mầm non.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222720
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日 暖房を 利用します。',
    example_reading = 'まいにち だんぼうを りようします。',
    example_vi = 'Mỗi ngày tôi đều sử dụng lò sưởi, máy sưởi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222721
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 冷房を よく 使います。',
    example_reading = 'にちじょうの せいかつで れいぼうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng máy lạnh, điều hòa mát.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222722
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 温度を よく 使います。',
    example_reading = 'にちじょうの せいかつで おんどを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nhiệt độ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222723
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 祖父を よく 使います。',
    example_reading = 'にちじょうの せいかつで そふを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng ông (tôi).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222724
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 祖母を よく 使います。',
    example_reading = 'にちじょうの せいかつで そぼを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bà (tôi).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222725
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 孫を よく 使います。',
    example_reading = 'にちじょうの せいかつで まごを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cháu nội/ngoại.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222726
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で おじを よく 使います。',
    example_reading = 'にちじょうの せいかつで おじを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng chú, bác, cậu (tôi).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222727
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'おじさんは 親切で 優しい人です。',
    example_reading = 'おじさんは しんせつで やさしいひとです。',
    example_vi = 'Chú, bác (người khác) là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222728
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で おばを よく 使います。',
    example_reading = 'にちじょうの せいかつで おばを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cô, dì, bác gái (tôi).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222729
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'おばさんは 親切で 優しい人です。',
    example_reading = 'おばさんは しんせつで やさしいひとです。',
    example_vi = 'Cô, dì (người khác) là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222730
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '誕生日プレゼントをきれいな紙で包みました。',
    example_reading = 'たんじょうび プレゼントを きれいな かみで つつみます。',
    example_vi = 'Tôi đã gói quà sinh nhật bằng một tờ giấy rất đẹp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222731
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 沸かしますを 行いました。',
    example_reading = 'みんなで きょうりょくして わかしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện đun sôi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222732
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 混ぜますを 行いました。',
    example_reading = 'みんなで きょうりょくして まぜますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện trộn, khuấy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222733
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で計算します機会が増えました。',
    example_reading = 'まいにちの せいかつで けいさんします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội tính toán đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222734
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 並びますを 行いました。',
    example_reading = 'みんなで きょうりょくして ならびますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện xếp hàng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222735
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても 丈夫な 性格の 人です。',
    example_reading = 'かれは とても じょうぶな せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất bền bỉ, chắc chắn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222736
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 弁護士を よく 使います。',
    example_reading = 'にちじょうの せいかつで べんごしを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng luật sư.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222737
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 音楽家を よく 使います。',
    example_reading = 'にちじょうの せいかつで おんがくかを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nhạc sĩ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222738
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 子どもたちを よく 使います。',
    example_reading = 'にちじょうの せいかつで こどもたちを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng trẻ em.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222739
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 自然を よく 使います。',
    example_reading = 'にちじょうの せいかつで しぜんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tự nhiên, thiên nhiên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222740
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 教育を よく 使います。',
    example_reading = 'にちじょうの せいかつで きょういくを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng giáo dục.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222741
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 文化を よく 使います。',
    example_reading = 'にちじょうの せいかつで ぶんかを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng văn hóa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222742
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 社会を よく 使います。',
    example_reading = 'にちじょうの せいかつで しゃかいを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng xã hội.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222743
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 政治を よく 使います。',
    example_reading = 'にちじょうの せいかつで せいじを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng chính trị.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222744
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 法律を よく 使います。',
    example_reading = 'にちじょうの せいかつで ほうりつを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng Pháp luật.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222745
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '戦争は 親切で 優しい人です。',
    example_reading = 'せんそうは しんせつで やさしいひとです。',
    example_vi = 'Chiến tranh là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222746
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 平和を よく 使います。',
    example_reading = 'にちじょうの せいかつで へいわを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng hòa bình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222747
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 目的を よく 使います。',
    example_reading = 'にちじょうの せいかつで もくてきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng mục đích.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222748
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 論文を よく 使います。',
    example_reading = 'にちじょうの せいかつで ろんぶんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng luận văn, luận án.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222749
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '【N4】日常の 生活で 楽しみを よく 使います。',
    example_reading = 'にちじょうの せいかつで たのしみを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng kỳ vọng, niềm vui.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222750
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ミキサーを よく 使います。',
    example_reading = 'にちじょうの せいかつで ミキサーを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng máy xay sinh tố.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222751
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で やかんを よく 使います。',
    example_reading = 'にちじょうの せいかつで やかんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng ấm đun nước.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222752
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '【N4】日常の 生活で ふたを よく 使います。',
    example_reading = 'にちじょうの せいかつで ふたを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nắp nồi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222753
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 栓抜きを よく 使います。',
    example_reading = 'にちじょうの せいかつで せんぬきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cái mở nút chai.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222754
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 缶切りを よく 使います。',
    example_reading = 'にちじょうの せいかつで かんきりを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng dụng cụ mở đồ hộp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222755
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 缶詰を よく 使います。',
    example_reading = 'にちじょうの せいかつで かんづめを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đồ hộp đóng sẵn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222756
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で のし袋を よく 使います。',
    example_reading = 'にちじょうの せいかつで のしぶくろを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng phong bì mừng cưới/tiền.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222757
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 風呂敷を よく 使います。',
    example_reading = 'にちじょうの せいかつで ふろしきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng khăn gói đồ kiểu Nhật.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222758
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で そろばんを よく 使います。',
    example_reading = 'にちじょうの せいかつで そろばんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bàn tính gảy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222759
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 体温計を よく 使います。',
    example_reading = 'にちじょうの せいかつで たいおんけいを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nhiệt kế đo thân nhiệt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222760
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 材料を よく 使います。',
    example_reading = 'にちじょうの せいかつで ざいりょうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng vật liệu, thành phần.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222761
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ある～を よく 使います。',
    example_reading = 'にちじょうの せいかつで ある～を よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng một ~ nào đó.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222762
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 一生懸命を よく 使います。',
    example_reading = 'にちじょうの せいかつで いっしょうけんめいを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cố gắng hết mình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222763
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても なぜ 性格の 人です。',
    example_reading = 'かれは とても なぜ せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất tại sao (bằng なんで).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222764
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 国連を よく 使います。',
    example_reading = 'にちじょうの せいかつで こくれんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng liên hợp Quốc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222765
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '朝ご飯を 楽しく 増えます。',
    example_reading = 'あさごはんを たのしく ふえます。',
    example_vi = 'Tôi tăng lên (xuất khẩu) bữa sáng thật vui vẻ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222766
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎朝 8時に 減ります。',
    example_reading = 'まいあさ はちじに へります。',
    example_vi = 'Mỗi sáng tôi giảm đi (xuất khẩu) lúc 8 giờ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222767
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で上がります機会が増えました。',
    example_reading = 'まいにちの せいかつで あがります きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội tăng cao (giá cả) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222768
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '朝ご飯を 楽しく 下がります。',
    example_reading = 'あさごはんを たのしく さがります。',
    example_vi = 'Tôi giảm xuống (giá cả) bữa sáng thật vui vẻ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222769
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 切れますを 行いました。',
    example_reading = 'みんなで きょうりょくして きれますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện bị đứt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222770
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して とれますを 行いました。',
    example_reading = 'みんなで きょうりょくして とれますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện bị tuột, rơi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222771
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 落ちますを 行いました。',
    example_reading = 'みんなで きょうりょくして おちますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện bị rơi, rớt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222772
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '朝ご飯を 楽しく なくなります。',
    example_reading = 'あさごはんを たのしく なくなります。',
    example_vi = 'Tôi hết, mất (xăng) bữa sáng thật vui vẻ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222773
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても 変な 性格の 人です。',
    example_reading = 'かれは とても へんな せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất kỳ lạ, kỳ quặc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222774
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても 幸せな 性格の 人です。',
    example_reading = 'かれは とても しあわせな せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất hạnh phúc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222775
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても うまいです。',
    example_reading = 'この りょうりは とても うまいです。',
    example_vi = 'Món ăn này rất ngon, giỏi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222776
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても まずいです。',
    example_reading = 'この りょうりは とても まずいです。',
    example_vi = 'Món ăn này rất dở, dở tệ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222777
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても つまらないです。',
    example_reading = 'この りょうりは とても つまらないです。',
    example_vi = 'Món ăn này rất chán ngắt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222778
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ガソリンを よく 使います。',
    example_reading = 'にちじょうの せいかつで ガソリンを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng xăng dầu gas.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222779
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 火を よく 使います。',
    example_reading = 'にちじょうの せいかつで ひを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng ngọn lửa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222780
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 暖房を よく 使います。',
    example_reading = 'にちじょうの せいかつで だんぼうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng hệ thống sưởi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222781
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '【N4】日常の 生活で 冷房を よく 使います。',
    example_reading = 'にちじょうの せいかつで れいぼうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng hệ thống làm mát.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222782
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で センスを よく 使います。',
    example_reading = 'にちじょうの せいかつで センスを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng gu thẩm mỹ sense.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222783
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 今にもを よく 使います。',
    example_reading = 'にちじょうの せいかつで いまにもを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bất cứ lúc nào, sắp sửa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222784
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で わあを よく 使います。',
    example_reading = 'にちじょうの せいかつで わあを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng oa! (ngạc nhiên).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222785
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 会員を よく 使います。',
    example_reading = 'にちじょうの せいかつで かいいんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng hội viên, thành viên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222786
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても 適当な 性格の 人です。',
    example_reading = 'かれは とても てきとうな せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất thích hợp, vừa phải.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222787
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 年齢を よく 使います。',
    example_reading = 'にちじょうの せいかつで ねんれいを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tuổi tác.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222788
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 収入を よく 使います。',
    example_reading = 'にちじょうの せいかつで しゅうにゅうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng thu nhập.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222789
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ぴったりを よく 使います。',
    example_reading = 'にちじょうの せいかつで ぴったりを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng vừa khít, hợp rơ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222790
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で そのうえを よく 使います。',
    example_reading = 'にちじょうの せいかつで そのうえを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng hơn thế nữa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222791
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に ～と申しますを 準備して おきます。',
    example_reading = 'りょこうの まえに ～ともしますを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn tên tôi là ~.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222792
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 薔薇を よく 使います。',
    example_reading = 'にちじょうの せいかつで ばらを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng hoa hồng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222793
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日 ドライブを 利用します。',
    example_reading = 'まいにち ドライブを りようします。',
    example_vi = 'Mỗi ngày tôi đều sử dụng lái xe hóng gió drive.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222794
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 泣きますを 行いました。',
    example_reading = 'みんなで きょうりょくして なきますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện khóc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222795
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 笑いますを 行いました。',
    example_reading = 'みんなで きょうりょくして わらいますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện cười.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222796
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 乾きますを 行いました。',
    example_reading = 'みんなで きょうりょくして かわきますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện khô.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222797
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 濡れますを 行いました。',
    example_reading = 'みんなで きょうりょくして ぬれますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện ướt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222798
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 滑りますを 行いました。',
    example_reading = 'みんなで きょうりょくして すべりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện trơn trượt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222799
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 起きますを 行いました。',
    example_reading = 'みんなで きょうりょくして おきますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện xảy ra.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222800
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 調節しますを 行いました。',
    example_reading = 'みんなで きょうりょくして ちょうせつしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện điều chỉnh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222801
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '【N4】彼は とても 安全な 性格の 人です。',
    example_reading = 'かれは とても あんぜんな せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất an toàn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222802
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は とても 丁寧な 性格の 人です。',
    example_reading = 'かれは とても ていねいな せいかくの ひとです。',
    example_vi = 'Anh ấy là người có tính cách rất lịch sự, cẩn thận.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222803
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても 細かいです。',
    example_reading = 'この りょうりは とても こまかいです。',
    example_vi = 'Món ăn này rất chi tiết, nhỏ lẻ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222804
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても 濃いです。',
    example_reading = 'この りょうりは とても こいです。',
    example_vi = 'Món ăn này rất đậm đà (vị/màu).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222805
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても 薄いです。',
    example_reading = 'この りょうりは とても うすいです。',
    example_vi = 'Món ăn này rất nhạt nhẽo (vị/màu).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222806
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 空気を よく 使います。',
    example_reading = 'にちじょうの せいかつで くうきを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng không khí.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222807
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 涙を よく 使います。',
    example_reading = 'にちじょうの せいかつで なみだを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nước mắt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222808
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 和食を よく 使います。',
    example_reading = 'にちじょうの せいかつで わしょくを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng món ăn kiểu Nhật.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222809
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 洋食を よく 使います。',
    example_reading = 'にちじょうの せいかつで ようしょくを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng món ăn kiểu tây.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222810
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で おかずを よく 使います。',
    example_reading = 'にちじょうの せいかつで おかずを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng thức ăn ăn kèm cơm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222811
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 量を よく 使います。',
    example_reading = 'にちじょうの せいかつで りょうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng số lượng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222812
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に ～倍を 準備して おきます。',
    example_reading = 'りょこうの まえに ～ばいを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn gấp ~ lần.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222813
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 半分を よく 使います。',
    example_reading = 'にちじょうの せいかつで はんぶんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng một nửa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222814
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で シングルを よく 使います。',
    example_reading = 'にちじょうの せいかつで シングルを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng phòng đơn single.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222815
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ツインを よく 使います。',
    example_reading = 'にちじょうの せいかつで ツインを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng phòng đôi twin.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222816
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 洗濯物を よく 使います。',
    example_reading = 'にちじょうの せいかつで せんたくものを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng quần áo cần giặt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222817
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 理由を よく 使います。',
    example_reading = 'にちじょうの せいかつで りゆうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng lý do.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222818
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'どうなさいますかは 親切で 優しい人です。',
    example_reading = 'どうなさいますかは しんせつで やさしいひとです。',
    example_vi = 'Anh/chị muốn làm thế nào ạ? là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222819
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で カットを よく 使います。',
    example_reading = 'にちじょうの せいかつで カットを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cắt tóc cut.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222820
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で シャンプーを よく 使います。',
    example_reading = 'にちじょうの せいかつで シャンプーを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng gội đầu shampoo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222821
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で どういうふうにを よく 使います。',
    example_reading = 'にちじょうの せいかつで どういうふうにを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng như thế nào.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222822
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ショートを よく 使います。',
    example_reading = 'にちじょうの せいかつで ショートを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tóc ngắn short.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222823
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても みたいにしてくださいです。',
    example_reading = 'この りょうりは とても みたいにしてくださいです。',
    example_vi = 'Món ăn này rất hãy làm giống như ~.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222824
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても これでお確かめくださいです。',
    example_reading = 'この りょうりは とても これでおたしかめくださいです。',
    example_vi = 'Món ăn này rất xin kiểm tra lại giúp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222825
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'どうもお疲れ様でしたは 親切で 優しい人です。',
    example_reading = 'どうもおつかれさまでしたは しんせつで やさしいひとです。',
    example_vi = 'Cảm ơn anh/chị đã vất vả là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222826
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 信じますを 行いました。',
    example_reading = 'みんなで きょうりょくして しんじますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện tin tưởng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222827
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して キャンセルしますを 行いました。',
    example_reading = 'みんなで きょうりょくして キャンセルしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện hủy bỏ cancel.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222828
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'メールで 会議の 日時を 知らせました。',
    example_reading = 'めーるで かいぎの にちじを しらせました。',
    example_vi = 'Tôi đã thông báo ngày giờ họp qua email.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222829
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 保証書を よく 使います。',
    example_reading = 'にちじょうの せいかつで ほしょうしょを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng giấy bảo hành.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222830
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 領収書を よく 使います。',
    example_reading = 'にちじょうの せいかつで りょうしゅうしょを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng biên nhận, hóa đơn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222831
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 贈り物を よく 使います。',
    example_reading = 'にちじょうの せいかつで おくりものを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng quà tặng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222832
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 間違い電話を よく 使います。',
    example_reading = 'にちじょうの せいかつで まちがいでんわを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng điện thoại nhầm số.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222833
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で キャンプを よく 使います。',
    example_reading = 'にちじょうの せいかつで キャンプを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cắm trại camp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222834
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 係を よく 使います。',
    example_reading = 'にちじょうの せいかつで かかりを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng người phụ trách.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222835
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 中止を よく 使います。',
    example_reading = 'にちじょうの せいかつで ちゅうしを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tạm dừng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222836
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 点を よく 使います。',
    example_reading = 'にちじょうの せいかつで てんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng điểm số.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222837
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で レバーを よく 使います。',
    example_reading = 'にちじょうの せいかつで レバーを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cần gạt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222838
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に ～札を 準備して おきます。',
    example_reading = 'りょこうの まえに ～さつを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn tờ tiền.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222839
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 急にを よく 使います。',
    example_reading = 'にちじょうの せいかつで きゅうにを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đột ngột.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222840
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に 楽しみにしていますを 準備して おきます。',
    example_reading = 'りょこうの まえに たのしみにしていますを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn đang rất mong đợi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222841
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 以上ですを よく 使います。',
    example_reading = 'にちじょうの せいかつで いじょうですを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng xin hết.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222842
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 係員を よく 使います。',
    example_reading = 'にちじょうの せいかつで かかりいんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nhân viên nhiệm vụ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222843
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で コースを よく 使います。',
    example_reading = 'にちじょうの せいかつで コースを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng lộ trình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222844
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で スタートを よく 使います。',
    example_reading = 'にちじょうの せいかつで スタートを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bắt đầu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222845
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に ～位を 準備して おきます。',
    example_reading = 'りょこうの まえに ～いを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn hạng thứ ~.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222846
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 優勝しますを 行いました。',
    example_reading = 'みんなで きょうりょくして ゆうしょうしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện vô địch.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222847
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 悩みを よく 使います。',
    example_reading = 'にちじょうの せいかつで なやみを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nỗi trăn trở.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222848
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 目覚まし時計を よく 使います。',
    example_reading = 'にちじょうの せいかつで めざましとけいを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đồng hồ báo thức.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222849
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 目が覚めますを 行いました。',
    example_reading = 'みんなで きょうりょくして めがさめますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện tỉnh giấc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222850
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 大学生を よく 使います。',
    example_reading = 'にちじょうの せいかつで だいがくせいを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng sinh viên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222851
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 回答を よく 使います。',
    example_reading = 'にちじょうの せいかつで かいとうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng đáp án.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222852
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 鳴りますを 行いました。',
    example_reading = 'みんなで きょうりょくして なりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện reo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222853
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して セットしますを 行いました。',
    example_reading = 'みんなで きょうりょくして セットしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện cài đặt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222854
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で渡します機会が増えました。',
    example_reading = 'まいにちの せいかつで わたします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội trao, giao (tận tay) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222855
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎朝 8時に 帰って来ます。',
    example_reading = 'まいあさ はちじに かえってきます。',
    example_vi = 'Mỗi sáng tôi trở về lại lúc 8 giờ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222856
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で出ます機会が増えました。',
    example_reading = 'まいにちの せいかつで でます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội xuất phát đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222857
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 宅配便を よく 使います。',
    example_reading = 'にちじょうの せいかつで たくはいびんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng dịch vụ giao hàng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222858
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 原因を よく 使います。',
    example_reading = 'にちじょうの せいかつで げんいんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng nguyên nhân.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222859
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 注射を よく 使います。',
    example_reading = 'にちじょうの せいかつで ちゅうしゃを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tiêm thuốc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222860
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 食欲を よく 使います。',
    example_reading = 'にちじょうの せいかつで しょくよくを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng cảm giác thèm ăn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222861
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で パンフレットを よく 使います。',
    example_reading = 'にちじょうの せいかつで パンフレットを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tờ rơi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222862
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'ステレオは 親切で 優しい人です。',
    example_reading = 'ステレオは しんせつで やさしいひとです。',
    example_vi = 'Dàn âm thanh là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222863
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で こちらを よく 使います。',
    example_reading = 'にちじょうの せいかつで こちらを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng bên chúng tôi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222864
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に ～のところを 準備して おきます。',
    example_reading = 'りょこうの まえに ～のところを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn chỗ của ~.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222865
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ちょうどを よく 使います。',
    example_reading = 'にちじょうの せいかつで ちょうどを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng vừa đúng lúc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222866
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で たった今を よく 使います。',
    example_reading = 'にちじょうの せいかつで たったいまを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng vừa mới ban nãy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222867
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '今いいですかは 家族と 過ごします。',
    example_reading = 'いまいいですかは かぞくと すごします。',
    example_vi = 'Bây giờ rảnh không ạ? tôi dành thời gian bên gia đình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222868
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '休日に ガスサービスセンターへ 行きました。',
    example_reading = 'きゅうじつに ガスサービスセンターへ いきました。',
    example_vi = 'Vào ngày nghỉ tôi đã đến trung tâm ga.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222869
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '休日に ガスレンジへ 行きました。',
    example_reading = 'きゅうじつに ガスレンジへ いきました。',
    example_vi = 'Vào ngày nghỉ tôi đã đến bếp ga.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222870
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 具合を よく 使います。',
    example_reading = 'にちじょうの せいかつで ぐあいを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tình trạng sức khỏe.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222871
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 申し訳ありませんを よく 使います。',
    example_reading = 'にちじょうの せいかつで もうしわけありませんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng tôi xin lỗi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222872
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で どちら様でしょうかを よく 使います。',
    example_reading = 'にちじょうの せいかつで どちらさまでしょうかを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng xin hỏi ai ở đầu dây ạ?.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222873
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で お待たせしましたを よく 使います。',
    example_reading = 'にちじょうの せいかつで おまたせしましたを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng xin lỗi đã để chờ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222874
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎朝 8時に 向かいます。',
    example_reading = 'まいあさ はちじに むかいます。',
    example_vi = 'Mỗi sáng tôi hướng về phía lúc 8 giờ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222875
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して ついていますを 行いました。',
    example_reading = 'みんなで きょうりょくして ついていますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện may mắn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222876
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '休日に 床へ 行きました。',
    example_reading = 'きゅうじつに ゆかへ いきました。',
    example_vi = 'Vào ngày nghỉ tôi đã đến sàn nhà.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222877
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 転びますを 行いました。',
    example_reading = 'みんなで きょうりょくして ころびますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện ngã, té.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222878
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で ベルを よく 使います。',
    example_reading = 'にちじょうの せいかつで ベルを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng chuông cửa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222879
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '授業の 始まりの ベルが 鳴りました。',
    example_reading = 'じゅぎょうの はじまりの べるが なりはした。',
    example_vi = 'Chuông bắt đầu giờ học đã reo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222880
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 慌ててを よく 使います。',
    example_reading = 'にちじょうの せいかつで あわててを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng vội vã.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222881
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 順番にを よく 使います。',
    example_reading = 'にちじょうの せいかつで じゅんばんにを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng theo thứ tự.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222882
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 出来事を よく 使います。',
    example_reading = 'にちじょうの せいかつで できごとを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng sự việc xảy ra.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222883
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 集まりますを 行いました。',
    example_reading = 'みんなで きょうりょくして あつまりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện tập hợp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222884
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 別れますを 行いました。',
    example_reading = 'みんなで きょうりょくして わかれますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện chia tay.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222885
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 長生きしますを 行いました。',
    example_reading = 'みんなで きょうりょくして ながいきしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện sống thọ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222886
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に 音がしますを 準備して おきます。',
    example_reading = 'りょこうの まえに おとがしますを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn có âm thanh phát ra.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222887
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '先生に 丁寧な 言葉で 声がします。',
    example_reading = 'せんせいに ていねいな ことばで こえがします。',
    example_vi = 'Tôi có tiếng nói với thầy giáo bằng lời lẽ lịch sự.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222888
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に 味がしますを 準備して おきます。',
    example_reading = 'りょこうの まえに あじがしますを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn có hương vị.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222889
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に 匂いがしますを 準備して おきます。',
    example_reading = 'りょこうの まえに においがしますを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn có mùi hương.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222890
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '強い日差しをよけるために、日傘をさします。',
    example_reading = 'つよい ひざしを よけるために、ひがさを さします。',
    example_vi = 'Để tránh ánh nắng gắt, tôi che chiếc ô che nắng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222891
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても ひどいです。',
    example_reading = 'この りょうりは とても ひどいです。',
    example_vi = 'Món ăn này rất kinh khủng, tồi tệ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222892
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても 怖いです。',
    example_reading = 'この りょうりは とても こわいです。',
    example_vi = 'Món ăn này rất đáng sợ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222893
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 天気予報を よく 使います。',
    example_reading = 'にちじょうの せいかつで てんきよほうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng dự báo thời tiết.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222894
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 発表を よく 使います。',
    example_reading = 'にちじょうの せいかつで はっぴょうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng báo cáo, công bố.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222895
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 実験を よく 使います。',
    example_reading = 'にちじょうの せいかつで じっけんを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng thí nghiệm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222896
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 人口を よく 使います。',
    example_reading = 'にちじょうの せいかつで じんこうを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng dân số.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222897
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 料理は とても 匂いです。',
    example_reading = 'この りょうりは とても においです。',
    example_vi = 'Món ăn này rất mùi hương.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222898
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日常の 生活で 科学を よく 使います。',
    example_reading = 'にちじょうの せいかつで かがくを よく つかいます。',
    example_vi = 'Trong cuộc sống hàng ngày tôi thường sử dụng khoa học.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222899
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '最新の 医学の おかげで 多くの 病気が 治ります。',
    example_reading = 'さいしんの いがくの おかげで おおくの びょうきが なおります。',
    example_vi = 'Nhờ y học hiện đại mà nhiều bệnh tật được chữa khỏi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222900
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '大学で 日本の 文学を 専攻しています。',
    example_reading = 'だいがくで にほんの ぶんがくを せんこうしています。',
    example_vi = 'Tôi đang học chuyên ngành văn học Nhật Bản ở đại học.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222901
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'パトカーが サイレンを 鳴らして 走っていきました。',
    example_reading = 'パトカーが さいれんを ならして はしっていきました。',
    example_vi = 'Xe cảnh sát vừa hú còi vừa chạy qua.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222902
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '怪我人が いるので すぐに 救急車を 呼びました。',
    example_reading = 'けがにんが いるので すぐに きゅうきゅうしゃを よびました。',
    example_vi = 'Vì có người bị thương nên tôi đã gọi xe cấp cứu ngay lập tức.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222903
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼の 提案に 全員が 賛成しました。',
    example_reading = 'かれの ていあんに ぜんいんが さんせいしました。',
    example_vi = 'Tất cả mọi người đều tán thành đề xuất của anh ấy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222904
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '計画の 変更に 反対する 人が 多いです。',
    example_reading = 'けいかくの へんこうに はんたいする ひとが おおいです。',
    example_vi = 'Có nhiều người phản đối việc thay đổi kế hoạch.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222905
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '親切な 男性が 荷物を 運んで くれました。',
    example_reading = 'しんせつな だんせいが にもつを はこんで くれました。',
    example_vi = 'Một người nam giới tốt bụng đã bê giúp tôi hành lý.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222906
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '受付の 女性に 部屋の 鍵を 渡しました。',
    example_reading = 'うけつけの じょせいに へやの かぎを わたしました。',
    example_vi = 'Tôi đã đưa chìa khóa phòng cho người phụ nữ ở bàn lễ tân.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222907
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'どうも 風邪を 引いて しまったようです。',
    example_reading = 'どうも かぜを ひいて しまったようです。',
    example_vi = 'Hình như là tôi đã bị cảm lạnh mất rồi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222908
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '天気予報によると 明日は 雨が 降るそうです。',
    example_reading = 'てんきよほうによると あしたは あめが ふるそうです。',
    example_vi = 'Theo như dự báo thời tiết thì nghe nói ngày mai trời sẽ mưa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222909
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '週末に 恋人と 一緒に 映画を 見に 行きます。',
    example_reading = 'しゅうまつに こいびとと いっしょに えいがを みに いきます。',
    example_vi = 'Cuối tuần tôi đi xem phim cùng với người yêu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222910
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で婚約します機会が増えました。',
    example_reading = 'まいにちの せいかつで こんやくします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội đính hôn đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222911
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '囲碁は 相手と 交互に 石を 置きます。',
    example_reading = 'いごは あいてと こうごに いしを おきます。',
    example_vi = 'Cờ vây thì người chơi luân phiên đặt quân cờ với đối phương.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222912
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 知り合いますを 行いました。',
    example_reading = 'みんなで きょうりょくして しりあいますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện quen biết nhau.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222913
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '喫茶店で 温かい コーヒーを 降ろします。',
    example_reading = 'きっさてんで あたたかい こーひーを おろします。',
    example_vi = 'Tôi Cho xuống cà phê nóng ở quán giải khát.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222914
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎朝 8時に 届けます。',
    example_reading = 'まいあさ はちじに とどけます。',
    example_vi = 'Mỗi sáng tôi chuyển đến lúc 8 giờ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222915
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 世話をしますを 行いました。',
    example_reading = 'みんなで きょうりょくして せわをしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện chăm sóc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222916
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で録音します機会が増えました。',
    example_reading = 'まいにちの せいかつで ろくおんします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội ghi âm đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222917
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話で嫌なという表現をよく使います。',
    example_reading = 'にほんごの かいわで いやなという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt ghét.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222918
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '受験のために 毎日 塾に 通っています。',
    example_reading = 'じゅけんのために まいにち じゅくに かよっています。',
    example_vi = 'Để chuẩn bị cho kỳ thi, hàng ngày tôi đều đi học ở trường học thêm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222919
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '先生は 生徒たちに 親切に 教えます。',
    example_reading = 'せんせいは せいとたちに しんせつに おしえます。',
    example_vi = 'Thầy giáo giảng dạy tận tình cho các học sinh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222920
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '重要な 資料を パソコンの ファイルに 保存しました。',
    example_reading = 'じゅうような しりょうを ぱそこの ふぁいるに ほぞんしました。',
    example_vi = 'Tôi đã lưu tài liệu quan trọng vào tệp tin trên máy tính.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222921
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に 自由にするを 準備して おきます。',
    example_reading = 'りょこうの まえに じゆうにするを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn tự do làm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222922
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '～間は 家族と 過ごします。',
    example_reading = '～かんは かぞくと すごします。',
    example_vi = 'Khoảng thời gian ~ tôi dành thời gian bên gia đình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222923
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'テストに 合格したんですね。いいことですね。',
    example_reading = 'てすとにかんかくしたんですね。いいことですね。',
    example_vi = 'Bạn đã đỗ kỳ thi rồi à. điều đó tốt đấy!',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222924
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'お忙しいですかは 親切で 優しい人です。',
    example_reading = 'おいそがしいですかは しんせつで やさしいひとです。',
    example_vi = 'Anh/chị có bận không? là người tốt bụng và thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222925
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '来週から 新しい 顧客への 営業を はじめます。',
    example_reading = 'らいしゅうから あたらしい こきゃくへの えいぎょうを はじめます。',
    example_vi = 'Từ tuần sau tôi sẽ bắt đầu việc kinh doanh/tiếp thị tới các khách hàng mới.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222926
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でそれまでにという表現をよく使います。',
    example_reading = 'にほんごの かいわで それまでにという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt trước thời điểm đó.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222927
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '遅れても かまいませんよ。ゆっくり 来てください。',
    example_reading = 'おくれても かまいませんよ。ゆっくり きてください。',
    example_vi = 'Dù có đến muộn cũng không sao đâu. cứ từ từ đến nhé.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222928
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '週末は家族と一緒に旅行を楽しんでいます。',
    example_reading = 'しゅうまつは かぞくと いっしょに りょこうを たのしんでいます。',
    example_vi = 'Cuối tuần tôi tận hưởng chuyến du lịch vui vẻ cùng gia đình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222929
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '休日に 公園で 仲良く 遊ぶ 親子を 見かけました。',
    example_reading = 'きゅうじつに こうえんで なかよく あそぶ おやこを みかけました。',
    example_vi = 'Vào ngày nghỉ tôi bắt gặp hai cha con/mẹ con vui vẻ chơi đùa trong công viên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222930
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '小学校の ときに 習字を 習っていました。',
    example_reading = 'しょうがっこうの ときに しゅうじを ならっていました。',
    example_vi = 'Hồi học tiểu học tôi đã từng học luyện viết chữ đẹp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222931
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この 電車は 普通電車なので 各駅に 止まります。',
    example_reading = 'この でんしゃは ふつうでんしゃなので かくえきに とまります。',
    example_vi = 'Tàu này là tàu bình thường nên sẽ dừng ở từng ga một.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222932
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 勤めますを 行いました。',
    example_reading = 'みんなで きょうりょくして つとめますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện làm việc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222933
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で休んでいらっしゃいます機会が増えました。',
    example_reading = 'まいにちの せいかつで やすんでいらっしゃいます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội nghỉ ngơi (tôn kính ngữ) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222934
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '朝ご飯を 楽しく 召し上がります。',
    example_reading = 'あさごはんを たのしく めしあがります。',
    example_vi = 'Tôi ăn, uống (tôn kính của 食べる/飲む) bữa sáng thật vui vẻ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222935
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して おっしゃいますを 行いました。',
    example_reading = 'みんなで きょうりょくして おっしゃいますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện nói.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222936
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活でなさいます機会が増えました。',
    example_reading = 'まいにちの せいかつで なさいます きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội làm (tôn kính của する) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222937
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して ご覧になりますを 行いました。',
    example_reading = 'みんなで きょうりょくして ごらんになりますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện xem.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222938
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でご存知ですという表現をよく使います。',
    example_reading = 'にほんごの かいわで ごぞんじですという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt biết (tôn kính của 知っている).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222939
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎朝 近所の 人と 笑顔で 挨拶を します。',
    example_reading = 'まいあさ きんじょの ひとと えがおで あいさつを します。',
    example_vi = 'Mỗi sáng tôi đều chào hỏi người hàng xóm với nụ cười rạng rỡ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222940
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '京都の 伝統的な 旅館に 宿泊しました。',
    example_reading = 'きょうとの でんとうてきな りょかんに しゅくはくしました。',
    example_vi = 'Tôi đã nghỉ lại tại một khách sạn kiểu Nhật (Ryokan) truyền thống ở Kyoto.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222941
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日 バス停を 利用します。',
    example_reading = 'まいにち ばすていを りようします。',
    example_vi = 'Mỗi ngày tôi đều sử dụng trạm xe bus.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222942
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '田中先生の 奥様は とても 上品な 方です。',
    example_reading = 'たなかせんせいの おくさまは とても じょうひんな かたです。',
    example_vi = 'Vợ ngài thầy giáo Tanaka là một người rất tao nhã.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222943
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '山田様、お電話で ございます。',
    example_reading = 'やまださま、おでんわで ございます。',
    example_vi = 'Thưa ngài Yamada, có điện thoại ạ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222944
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'たまに 家族と 一緒に 外食を します。',
    example_reading = 'たまに かぞくと いっしょに がいしょくを します。',
    example_vi = 'Thỉnh thoại tôi cùng gia đình đi ăn ở ngoài.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222945
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'この イベントは どなたでも 参加できます。',
    example_reading = 'この いべんとは どなたでも さんかでんきます。',
    example_vi = 'Sự kiện này bất kỳ ngài/ai cũng có thể tham gia.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222946
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '旅行の 前に ～といいますを 準備して おきます。',
    example_reading = 'りょこうの まえに ～といいますを じゅんびして おきます。',
    example_vi = 'Trước chuyến du lịch, tôi chuẩn bị sẵn tên là ~.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222947
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '面接で 自分の 経歴を 詳しく 説明しました。',
    example_reading = 'めんせつで じぶんの けいれきを くわしく せつめいしました。',
    example_vi = 'Trong buổi phỏng vấn tôi đã giải thích chi tiết lý lịch của bản thân.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222948
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '彼は 医者に なるために 医学部に 進学しました。',
    example_reading = 'かれは いしゃに なるために いがくぶに しんがくしました。',
    example_vi = 'Anh ấy đã học lên khoa Y để trở thành bác sĩ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222949
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 目指しますを 行いました。',
    example_reading = 'みんなで きょうりょくして めざしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện hướng tới.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222950
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '高校を卒業したら、日本の大学に進みたいです。',
    example_reading = 'こうこうを そつぎょうしたら、にほんの だいがくに すすみたいです。',
    example_vi = 'Sau khi tốt nghiệp cấp 3, tôi muốn học lên đại học ở Nhật Bản.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222951
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 受章しますを 行いました。',
    example_reading = 'みんなで きょうりょくして じゅしょうしますを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện nhận huân chương.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222952
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '有名作家の 講演会を 聞きに 行きました。',
    example_reading = 'ゆうめいさっかの こうえんかいを ききに いきました。',
    example_vi = 'Tôi đã đi nghe buổi diễn thuyết của một nhà văn nổi tiếng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222953
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'ただいま 社長の 田中が 参ります。',
    example_reading = 'ただいま しゃちょうの たなかが まいります。',
    example_vi = 'Giám đốc Tanaka của chúng tôi sẽ đến ngay ạ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222954
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '私は 事務所に おります。',
    example_reading = 'わたしは じむしょに おります。',
    example_vi = 'Tôi đang ở văn phòng ạ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222955
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '美味しい お菓子を いただきます。',
    example_reading = 'おいしい おかしを いただきます。',
    example_vi = 'Tôi xin phép được thưởng thức món bánh ngon này ạ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222956
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'ベトナムから 来ました キムと 申します。',
    example_reading = 'べとなむから きました きむと もうします。',
    example_vi = 'Tôi đến từ Việt Nam, tên tôi là Kim ạ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222957
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活でいたします機会が増えました。',
    example_reading = 'まいにちの せいかつで いたします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội làm (khiêm nhường của する) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222958
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '送って いただいた 資料を 拝見します。',
    example_reading = 'おくって いただいた しりょうを はいけんします。',
    example_vi = 'Tôi xin phép được xem qua tài liệu anh/chị đã gửi ạ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222959
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で存知ております機会が増えました。',
    example_reading = 'まいにちの せいかつで ぞんじております きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội biết (khiêm nhường của 知っている) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222960
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎朝 8時に 会社へ 伺います。',
    example_reading = 'まいあさ 8じに かいしゃへ うかがいます。',
    example_vi = 'Mỗi sáng 8 giờ tôi Hỏi, đến thăm công ty.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222961
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活でお目にかかります機会が増えました。',
    example_reading = 'まいにちの せいかつで おめにかかります きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội gặp mặt (khiêm nhường của 会う) đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222962
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'お客様に 温かい コーヒーを 淹れます。',
    example_reading = 'おきゃくさまに あたたかい こーひーを いれます。',
    example_vi = 'Tôi pha cà phê nóng cho khách.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222963
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '毎日の生活で用意します機会が増えました。',
    example_reading = 'まいにちの せいかつで よういします きかいが ふえました。',
    example_vi = 'Trong cuộc sống hàng ngày, cơ hội sửa soạn, chuẩn bị đã tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222964
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '私、本日の 司会を 務めます 山田です。',
    example_reading = 'わたくし、ほんじつの しかいを つとめます やまだです。',
    example_vi = 'Tôi là Yamada, xin phép đảm nhận vị trí MC hôm nay.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222965
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'ガイドさんに 東京の 街を 案内して もらいました。',
    example_reading = 'がいどさんに とうきょうの まちを あんないして もらいました。',
    example_vi = 'Tôi được anh/chị hướng dẫn viên dẫn đi tham quan đường phố Tokyo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222966
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'ここに あなたの メールアドレスを 書いて ください。',
    example_reading = 'ここに あなたの めーるあどれすを かいて ください。',
    example_vi = 'Xin hãy viết địa chỉ email của bạn vào đây.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222967
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '今週の スケジュールを 手帳で 確認します。',
    example_reading = 'こんしゅうの すけじゅーるを てちょうで かくにんします。',
    example_vi = 'Tôi kiểm tra lịch trình tuần này trong sổ tay.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222968
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '再来週の 月曜日に テストが あります。',
    example_reading = 'さらいしゅうの げつようびに てすとが あります。',
    example_vi = 'Vào thứ hai tuần sau nữa sẽ có bài kiểm tra.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222969
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '再来月に 日本へ 旅行する 予定です。',
    example_reading = 'さらいげつに にほんへ りょこうする よていです。',
    example_vi = 'Tôi dự định sẽ đi du lịch Nhật Bản vào tháng sau nữa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222970
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '再来年 大学を 卒業する 予定です。',
    example_reading = 'さらいねん だいがくを そつぎょうする よていです。',
    example_vi = 'Tôi dự định sẽ tốt nghiệp đại học vào năm sau nữa.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222971
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '初めに、自己紹介を して ください。',
    example_reading = 'はじめに、じこしょうかいを して ください。',
    example_vi = 'Trước tiên, xin mời bạn tự giới thiệu bản thân.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222972
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'みんなの 前で スピーチを する時、緊張します。',
    example_reading = 'みんなの まえで すぴーちを するとき、きんちょうします。',
    example_vi = 'Khi phát biểu trước mọi người tôi rất hồi hộp.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222973
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'スピーチコンテストで 優勝して 賞金を もらいました。',
    example_reading = 'すぴーちこんてすとで ゆうしょうして しょうきんを もらいました。',
    example_vi = 'Tôi đoạt giải nhất cuộc thi hùng biện và nhận tiền thưởng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222974
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '動物園で 首の 長い きりんを 見ました。',
    example_reading = 'どうぶつえんで くびの ながい きりんを みました。',
    example_vi = 'Tôi đã nhìn thấy con hươu cao cổ cổ dài ở sở thú.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222975
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '子どもの ころ、よく この 公園で 遊んで いました。',
    example_reading = 'こどもの ころ、よく この こうえんで あそんで いました。',
    example_vi = 'Hồi còn nhỏ, tôi thường chơi ở công viên này.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222976
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '一生懸命 努力して、夢が 叶いました。',
    example_reading = 'いっしょうけんめい どりょくして、ゆめが かないました。',
    example_vi = 'Cố gắng hết sức mình nên giấc mơ đã trở thành hiện thực.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222977
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'サッカーの 試合で 大好きな チームを 応援します。',
    example_reading = 'さっかーの しあいで だいすきな ちーむを おうえんします。',
    example_vi = 'Trong trận bóng đá tôi cổ vũ hết mình cho đội bóng yêu thích.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222978
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '「心から」は とても 大切な 言葉です。',
    example_reading = '「こころから」は とても たいせつな ことばです。',
    example_vi = '「心から」là từ ngữ rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222979
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'いつも 助けて くれる 友達に 感謝します。',
    example_reading = 'いつも たすけて くれる ともだちに かんしゃします。',
    example_vi = 'Tôi cảm ơn người bạn luôn giúp đỡ mình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222980
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = 'お世話に なった 先生に お礼を 贈ります。',
    example_reading = 'おせわに なった せんせいに おれいを おくります。',
    example_vi = 'Tôi gửi quà cảm ơn đến người thầy đã giúp đỡ mình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222981
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);

UPDATE vocabulary
SET example_jp = '日本語の会話でお元気でいらっしゃいますかという表現をよく使います。',
    example_reading = 'にほんごの かいわで おげんきでいらっしゃいますかという ひょうげんを よく つかいます。',
    example_vi = 'Trong hội thoại tiếng Nhật, tôi thường dùng biểu đạt kính chúc ngài luôn khỏe mạnh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 222982
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);
