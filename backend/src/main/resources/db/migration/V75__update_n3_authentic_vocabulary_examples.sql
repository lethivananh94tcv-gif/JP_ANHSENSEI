-- ============================================================
-- ANH SENSEI - FLYWAY MIGRATION V75
-- Safe Authentic Vocabulary Example Sentences Update for JLPT N3
-- Strictly scoped to N3 level (level_id = 3)
-- ============================================================

UPDATE vocabulary
SET example_jp = '父親は 毎朝 7時に 会社へ 出勤します。',
    example_reading = 'ちちおやは まいあさ しちじに かいしゃへ しゅっきんします。',
    example_vi = 'Bố tôi mỗi sáng đi làm lúc 7 giờ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191681
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '母親が 作って くれた お弁当は とても 美味しいです。',
    example_reading = 'ははおやが つくって くれた おべんとうは とても おいしいです。',
    example_vi = 'Cơm hộp mẹ làm cho tôi rất ngon.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191682
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '長女は 料理が 得意で よく 夕飯を 手伝います。',
    example_reading = 'ちょうじょは りょうりが とくいで よく ゆうはんを てつだいます。',
    example_vi = 'Con gái lớn nấu ăn giỏi và thường giúp nấu cơm tối.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191683
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '長男は 来年 小学校に 入学します。',
    example_reading = 'ちょうなんは らいねん しょうがっこうに にゅうがくします。',
    example_vi = 'Con trai lớn năm sau sẽ vào học tiểu học.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191684
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '次女は ピアノを 習うのが 大好きです。',
    example_reading = 'じじょは ぴあのを ならうのが だいすきです。',
    example_vi = 'Con gái thứ hai rất thích học piano.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191685
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '次男は サッカー部に 所属して います。',
    example_reading = 'じなんは さっかーぶに しょぞくして います。',
    example_vi = 'Con trai thứ hai thuộc câu lạc bộ bóng đá.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191686
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '三女は 家族の みんなから 可愛がられて います。',
    example_reading = 'さんじょは かぞくの みんなから かわいがられて います。',
    example_vi = 'Con gái thứ ba được mọi người trong gia đình yêu thương.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191687
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '三男は 元気いっぱいに 公園で 遊んでいます。',
    example_reading = 'さんなんは げんきいっぱいに こうえんで あそんでいます。',
    example_vi = 'Con trai thứ ba tràn đầy năng lượng đang chơi ở công viên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191688
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '末っ子の 弟は 甘えん坊で いつも 一緒に います。',
    example_reading = 'すえっこの おとうとは あまえんぼうで いつも いっしょに います。',
    example_vi = 'Cậu em con út nũng nịu nên lúc nào cũng ở bên tôi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191689
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '彼は 一人っ子なので 兄弟が いません。',
    example_reading = 'かれは ひとりっこなので きょうだいが いません。',
    example_vi = 'Anh ấy là con một nên không có anh chị em.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191690
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '私には 3人 姉妹の 一番 上の 姉が います。',
    example_reading = 'わたしには さんにん しまいの いちばん うえの あねが います。',
    example_vi = 'Tôi có một người chị cả trong gia đình 3 chị em gái.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191691
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '彼女は 一人娘として 大切に 育てられました。',
    example_reading = 'かのじょは ひとりむすめとして たいせつに そだてられました。',
    example_vi = 'Cô ấy được nuôi dạy yêu thương với tư cách là con gái một.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191692
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'あの 親子は 顔が とても よく 似ています。',
    example_reading = 'あの おやこは かおが とても よく にています。',
    example_vi = 'Khuôn mặt của hai mẹ con/cha con nhà đó rất giống nhau.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191693
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'あの 二人は いつも 仲良く 散歩する 素敵な 夫婦です。',
    example_reading = 'あの ふたりは いつも なかよく さんぽする すてきな ふうふです。',
    example_vi = 'Hai người đó là cặp vợ chồng tuyệt vời lúc nào cũng vui vẻ đi dạo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191694
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '山田ご夫妻が パーティーに 出席されました。',
    example_reading = 'やまだごふさいが ぱーてぃーに しゅっせきされました。',
    example_vi = 'Vợ chồng ông bà Yamada đã đến tham dự buổi tiệc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191695
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、親類が 重要です。',
    example_reading = 'せんもんかの いけんによると、しんるいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, họ hàng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191696
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'お盆に 先祖の お墓参りを します。',
    example_reading = 'おぼんに せんぞの おはかまいりを します。',
    example_vi = 'Vào dịp lễ obon, tôi đi tảo mộ tổ tiên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191697
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、尊敬（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、そんけい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, kính trọng, tôn kính là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191698
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、連れるが 重要です。',
    example_reading = 'せんもんかの いけんによると、つれるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dẫn đi, dắt đi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191699
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、似るが 重要です。',
    example_reading = 'せんもんかの いけんによると、にるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, giống, giống nhau là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191700
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '彼女とは 小学校からの 気の置けない 親友です。',
    example_reading = 'かのじょとは しょうがっこうからの きのおけない しんゆうです。',
    example_vi = 'Tôi và cô ấy là bạn thân thấu hiểu nhau từ thời tiểu học.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191701
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'プロジェクトを 成功させるため 信頼できる 仲間と 協力します。',
    example_reading = 'ぷろじぇくとを せいこうさせるため しんらいできる なかまと きょうりょくします。',
    example_vi = 'Để dự án thành công tôi hợp tác với những người bạn đồng hành tin cậy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191702
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、仲良しが 重要です。',
    example_reading = 'せんもんかの いけんによると、なかよしが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thân, thân thiết, quan hệ tốt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191703
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 幼なじみ 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても おさななじみ ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất bạn thuở bé.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191704
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、友情が 重要です。',
    example_reading = 'せんもんかの いけんによると、ゆうじょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tình bạn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191705
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、親しいが 重要です。',
    example_reading = 'せんもんかの いけんによると、したしいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thân thiết, thân mật là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191706
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'パーティーで 古い 知人に 偶然 会いました。',
    example_reading = 'ぱーてぃーで ふるい ちじんに ぐうぜん あいました。',
    example_vi = 'Tôi tình cờ gặp lại một người quen cũ tại bữa tiệc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191707
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、当時が 重要です。',
    example_reading = 'せんもんかの いけんによると、とうじが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lúc đó, thời đó là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191708
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、祝うが 重要です。',
    example_reading = 'せんもんかの いけんによると、いわうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mừng, chúc mừng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191709
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、遠慮（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、えんりょ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự làm khách, e ngại, giữ kẽ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191710
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では別々（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは べつべつ（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự khác nhau, riêng biệt thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191711
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、彼女が 重要です。',
    example_reading = 'せんもんかの いけんによると、かのじょが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cô ấy, bạn gái là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191712
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、彼が 重要です。',
    example_reading = 'せんもんかの いけんによると、かれが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, anh ấy, bạn trai là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191713
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、愛情が 重要です。',
    example_reading = 'せんもんかの いけんによると、あいじょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tình yêu, tình cảm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191714
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、出会いが 重要です。',
    example_reading = 'せんもんかの いけんによると、であいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cuộc gặp gỡ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191715
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、出会うが 重要です。',
    example_reading = 'せんもんかの いけんによると、であうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, gặp, gặp gỡ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191716
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、付き合うが 重要です。',
    example_reading = 'せんもんかの いけんによると、つきあうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hẹn hò, giao lưu, đi cùng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191717
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では交際（する）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは こうさい（する）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự giao thiệp, mối quan hệ, hẹn hò thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191718
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、記念（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、きねん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự kỷ niệm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191719
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、記念日が 重要です。',
    example_reading = 'せんもんかの いけんによると、きねんびが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày kỷ niệm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191720
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、言い返すが 重要です。',
    example_reading = 'せんもんかの いけんによると、いいかえすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nói lại, bắt bẻ, bốp chát là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191721
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、謝るが 重要です。',
    example_reading = 'せんもんかの いけんによると、あやまるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, xin lỗi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191722
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では仲直り（する）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは なかなおり（する）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự làm lành thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191723
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、連れて行くが 重要です。',
    example_reading = 'せんもんかの いけんによると、つれていくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dẫn đi, dắt đi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191724
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、連れて来るが 重要です。',
    example_reading = 'せんもんかの いけんによると、つれてくるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dẫn đến, dẫn về là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191725
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、秘密が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひみつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bí mật là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191726
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 話は 二人だけの 内緒に してください。',
    example_reading = 'この はなしは ふたりだけの ないしょに してください。',
    example_vi = 'Chuyện này xin hãy giữ bí mật chỉ hai người biết.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191727
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、好かれるが 重要です。',
    example_reading = 'せんもんかの いけんによると、すかれるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, được thích, được yêu mến là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191728
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、（人を）ふるが 重要です。',
    example_reading = 'せんもんかの いけんによると、（ひとを）ふるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bỏ, từ chối là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191729
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面ではぉ見合い（する）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは ぉみあい（する）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ xem mặt, mai mối thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191730
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、恋愛（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、れんあい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chuyện yêu đương, tình yêu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191731
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、存在（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、そんざい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự tồn tại, người, thứ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191732
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、相手が 重要です。',
    example_reading = 'せんもんかの いけんによると、あいてが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đối phương, đối tác, người đối diện là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191733
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、助けるが 重要です。',
    example_reading = 'せんもんかの いけんによると、たすけるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, giúp đỡ, cứu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191734
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、助かるが 重要です。',
    example_reading = 'せんもんかの いけんによると、たすかるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, được cứu, được giúp đỡ, nhờ có... mà đỡ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191735
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、支えるが 重要です。',
    example_reading = 'せんもんかの いけんによると、ささえるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hỗ trợ, nâng đỡ, làm chỗ dựa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191736
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、誘うが 重要です。',
    example_reading = 'せんもんかの いけんによると、さそうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, rủ, mời là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191737
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、待ち合わせるが 重要です。',
    example_reading = 'せんもんかの いけんによると、まちあわせるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hẹn gặp nhau là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191738
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、交換（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうかん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự trao đổi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191739
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、交流（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうりゅう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự giao lưu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191740
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、断るが 重要です。',
    example_reading = 'せんもんかの いけんによると、ことわるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, từ chối là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191741
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、預けるが 重要です。',
    example_reading = 'せんもんかの いけんによると、あずけるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, gửi, giao cho ai trông hộ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191742
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、預かるが 重要です。',
    example_reading = 'せんもんかの いけんによると、あずかるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trông hộ, giữ hộ, được giao phó là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191743
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、甘やかすが 重要です。',
    example_reading = 'せんもんかの いけんによると、あまやかすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chiều, chiều chuộng, nuông chiều là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191744
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、ついて来るが 重要です。',
    example_reading = 'せんもんかの いけんによると、ついてくるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đi theo, bám theo là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191745
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、抱くが 重要です。',
    example_reading = 'せんもんかの いけんによると、だくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ôm, bế là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191746
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、話しかけるが 重要です。',
    example_reading = 'せんもんかの いけんによると、はなしかけるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bắt chuyện, lên tiếng nói với là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191747
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、無視（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、むし（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự phớt lờ, làm ngơ, bỏ qua là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191748
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、振り向くが 重要です。',
    example_reading = 'せんもんかの いけんによると、ふりむくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, quay đầu lại, ngoảnh lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191749
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、差し上げるが 重要です。',
    example_reading = 'せんもんかの いけんによると、さしあげるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tặng, biếu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191750
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、与えるが 重要です。',
    example_reading = 'せんもんかの いけんによると、あたえるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cho, ban cho, mang lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191751
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、味方（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、みかた（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đồng minh, người cùng phe, đứng về phía là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191752
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、悪口が 重要です。',
    example_reading = 'せんもんかの いけんによると、わるぐちが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nói xấu, lời nói xấu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191753
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、我々が 重要です。',
    example_reading = 'せんもんかの いけんによると、われわれが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chúng tôi, chúng ta là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191754
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、名字が 重要です。',
    example_reading = 'せんもんかの いけんによると、みょうじが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, họ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191755
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、性別が 重要です。',
    example_reading = 'せんもんかの いけんによると、せいべつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, giới tính là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191756
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、年齢が 重要です。',
    example_reading = 'せんもんかの いけんによると、ねんれいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tuổi, tuổi tác là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191757
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、高齢が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうれいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cao tuổi, nhiều tuổi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191758
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、老人が 重要です。',
    example_reading = 'せんもんかの いけんによると、ろうじんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, người già là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191759
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、幼児が 重要です。',
    example_reading = 'せんもんかの いけんによると、ようじが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trẻ ấu nhi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191760
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、出身が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゅっしんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, xuất thân, quê quán là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191761
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、生まれが 重要です。',
    example_reading = 'せんもんかの いけんによると、うまれが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sinh ra, nơi sinh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191762
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、育ちが 重要です。',
    example_reading = 'せんもんかの いけんによると、そだちが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lớn lên, trưởng thành là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191763
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、行儀が 重要です。',
    example_reading = 'せんもんかの いけんによると、ぎょうぎが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cách cư xử, phép tắc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191764
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、個人が 重要です。',
    example_reading = 'せんもんかの いけんによると、こじんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cá nhân là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191765
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、本人が 重要です。',
    example_reading = 'せんもんかの いけんによると、ほんにんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bản thân, đương sự là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191766
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、独身が 重要です。',
    example_reading = 'せんもんかの いけんによると、どくしんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, độc thân là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191767
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、主婦が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゅふが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nội trợ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191768
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、無職が 重要です。',
    example_reading = 'せんもんかの いけんによると、むしょくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thất nghiệp, không có việc làm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191769
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '本日の 営業時間は 午後8時までと なっております。',
    example_reading = 'ほんじつの えいぎょうじかんは ごごはちじまでと なっております。',
    example_vi = 'Giờ mở cửa của ngày hôm nay là đến 8 giờ tối.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191770
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '明日の 朝 9時に 駅前で 待ち合わせましょう。',
    example_reading = 'あすの あさ くじに えきまえで まちあわせましょう。',
    example_vi = 'Sáng mai lúc 9 giờ hãy hẹn gặp nhau ở trước ga nhé.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191771
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '試験の 前日は 早めに 寝て 体調を 整えます。',
    example_reading = 'しけんの ぜんじつは はやめに ねて たいちょうを ととのえます。',
    example_vi = 'Ngày hôm trước kỳ thi tôi đi ngủ sớm để chuẩn bị sức khỏe tốt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191772
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'パーティーの 翌日は 朝から 部屋の 掃除を しました。',
    example_reading = 'ぱーてぃーの よくじつは あさから へやの そうじを しました。',
    example_vi = 'Ngày hôm sau bữa tiệc tôi dọn dẹp phòng từ buổi sáng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191773
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、先おとといが 重要です。',
    example_reading = 'せんもんかの いけんによると、さきおとといが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hôm kìa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191774
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、昨日が 重要です。',
    example_reading = 'せんもんかの いけんによると、さくじつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hôm qua là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191775
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、昨年が 重要です。',
    example_reading = 'せんもんかの いけんによると、さくねんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, năm ngoái là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191776
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、先日が 重要です。',
    example_reading = 'せんもんかの いけんによると、せんじつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hôm nọ, hôm trước là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191777
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、再来週が 重要です。',
    example_reading = 'せんもんかの いけんによると、さらいしゅうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tuần tới nữa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191778
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、先々週が 重要です。',
    example_reading = 'せんもんかの いけんによると、せんせんしゅうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tuần trước nữa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191779
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、上旬が 重要です。',
    example_reading = 'せんもんかの いけんによると、じょうじゅんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thượng tuần, đầu tháng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191780
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、中旬が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちゅうじゅんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trung tuần, giữa tháng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191781
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、下旬が 重要です。',
    example_reading = 'せんもんかの いけんによると、げじゅんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hạ tuần, cuối tháng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191782
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、深夜が 重要です。',
    example_reading = 'せんもんかの いけんによると、しんやが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đêm khuya là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191783
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、未来が 重要です。',
    example_reading = 'せんもんかの いけんによると、みらいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tương lai là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191784
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、数日が 重要です。',
    example_reading = 'せんもんかの いけんによると、すうじつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vài ngày, mấy ngày là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191785
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、以降が 重要です。',
    example_reading = 'せんもんかの いけんによると、いこうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, từ sau, kể từ sau là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191786
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、朝食が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちょうしょくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bữa sáng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191787
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、昼食が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちゅうしょくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bữa trưa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191788
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、夕食が 重要です。',
    example_reading = 'せんもんかの いけんによると、ゆうしょくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bữa tối là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191789
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面ではお弁当という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは おべんとうという ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ cơm hộp thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191790
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、自炊（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、じすい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, việc tự nấu ăn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191791
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、外食（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、がいしょく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, việc ăn ngoài là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191792
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、食欲が 重要です。',
    example_reading = 'せんもんかの いけんによると、しょくよくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thèm ăn, hứng ăn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191793
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、注文（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちゅうもん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự đặt hàng, gọi món là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191794
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、乾杯（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かんぱい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự cạn chén, nâng cốc, cụng ly là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191795
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、味わうが 重要です。',
    example_reading = 'せんもんかの いけんによると、あじわうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thưởng thức, nếm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191796
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、お代わり（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、おかわり（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự ăn thêm, uống thêm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191797
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、残すが 重要です。',
    example_reading = 'せんもんかの いけんによると、のこすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, để thừa, để lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191798
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、残り物が 重要です。',
    example_reading = 'せんもんかの いけんによると、のこりものが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đồ thừa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191799
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 済ませるを 行いました。',
    example_reading = 'みんなで きょうりょくして すませるを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện làm xong, dùng ... cho đơn giản.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191800
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、済むが 重要です。',
    example_reading = 'せんもんかの いけんによると、すむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, xong, xong xuôi; giải quyết xong là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191801
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、量が 重要です。',
    example_reading = 'せんもんかの いけんによると、りょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lượng, số lượng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191802
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、包丁が 重要です。',
    example_reading = 'せんもんかの いけんによると、ほうちょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dao nhà bếp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191803
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても まな板 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても まないた ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất thớt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191804
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、大さじが 重要です。',
    example_reading = 'せんもんかの いけんによると、おおさじが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thìa to, muỗng to là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191805
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、炊飯器が 重要です。',
    example_reading = 'せんもんかの いけんによると、すいはんきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nồi cơm điện là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191806
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、流し台が 重要です。',
    example_reading = 'せんもんかの いけんによると、ながしだいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bồn rửa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191807
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、電子レンジが 重要です。',
    example_reading = 'せんもんかの いけんによると、でんしレンジが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lò vi sóng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191808
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、調味料が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちょうみりょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, gia vị là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191809
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、サラダ油が 重要です。',
    example_reading = 'せんもんかの いけんによると、サラダあぶらが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dầu ăn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191810
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、食品が 重要です。',
    example_reading = 'せんもんかの いけんによると、しょくひんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thực phẩm, đồ ăn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191811
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、切らすが 重要です。',
    example_reading = 'せんもんかの いけんによると、きらすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dùng hết, để hết là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191812
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、刻むが 重要です。',
    example_reading = 'せんもんかの いけんによると、きざむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, băm nhỏ, thái nhỏ; khắc, chạm trổ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191813
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、（卵を）割るが 重要です。',
    example_reading = 'せんもんかの いけんによると、（たまごを）わるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đập, làm bể là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191814
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、加えるが 重要です。',
    example_reading = 'せんもんかの いけんによると、くわえるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thêm vào là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191815
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、少々が 重要です。',
    example_reading = 'せんもんかの いけんによると、しょうしょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, một chút, một ít là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191816
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、揚げるが 重要です。',
    example_reading = 'せんもんかの いけんによると、あげるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, rán, chiên là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191817
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、煮るが 重要です。',
    example_reading = 'せんもんかの いけんによると、にるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nấu, ninh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191818
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、蒸すが 重要です。',
    example_reading = 'せんもんかの いけんによると、むすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hấp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191819
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 熱するを 行いました。',
    example_reading = 'みんなで きょうりょくして ねっするを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện làm nóng, đun nóng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191820
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、取り出すが 重要です。',
    example_reading = 'せんもんかの いけんによると、とりだすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lấy ra là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191821
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、塗るが 重要です。',
    example_reading = 'せんもんかの いけんによると、ぬるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phết, bôi, sơn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191822
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 温めるを 行いました。',
    example_reading = 'みんなで きょうりょくして あたためるを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện làm nóng, hâm nóng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191823
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 冷やすを 行いました。',
    example_reading = 'みんなで きょうりょくして ひやすを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện làm lạnh, ướp lạnh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191824
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、水分が 重要です。',
    example_reading = 'せんもんかの いけんによると、すいぶんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thành phần nước, độ ẩm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191825
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、沸かすが 重要です。',
    example_reading = 'せんもんかの いけんによると、わかすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đun sôi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191826
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、注ぐが 重要です。',
    example_reading = 'せんもんかの いけんによると、そそぐが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, rót, đổ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191827
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、味見（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、あじみ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nếm thử là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191828
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、手間が 重要です。',
    example_reading = 'せんもんかの いけんによると、てまが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thời gian và công sức là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191829
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 手軽な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても てがるな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất dễ dàng, đơn giản.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191830
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '計画に 基づいて でき上がりを 進めて います。',
    example_reading = 'けいかくに もとづいて できあがりを すすめて います。',
    example_vi = 'Dựa trên kế hoạch, chúng tôi đang tiến hành hoàn thành, thành phẩm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191831
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、分けるが 重要です。',
    example_reading = 'せんもんかの いけんによると、わけるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chia, phân chia là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191832
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、塩辛いが 重要です。',
    example_reading = 'せんもんかの いけんによると、しおからいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mặn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191833
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、冷凍（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、れいとう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đông lạnh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191834
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、片付けるが 重要です。',
    example_reading = 'せんもんかの いけんによると、かたづけるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dọn, dọn dẹp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191835
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 清潔な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても せいけつな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất sạch sẽ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191836
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、掃くが 重要です。',
    example_reading = 'せんもんかの いけんによると、はくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, quét, quét dọn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191837
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、掃除機が 重要です。',
    example_reading = 'せんもんかの いけんによると、そうじきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, máy hút bụi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191838
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、洗剤が 重要です。',
    example_reading = 'せんもんかの いけんによると、せんざいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bột giặt, nước rửa, chất tẩy rửa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191839
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、臭うが 重要です。',
    example_reading = 'せんもんかの いけんによると、におうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bốc mùi, có mùi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191840
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、洗濯物が 重要です。',
    example_reading = 'せんもんかの いけんによると、せんたくものが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đồ giặt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191841
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、汚れが 重要です。',
    example_reading = 'せんもんかの いけんによると、よごれが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bẩn, vết bẩn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191842
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、干すが 重要です。',
    example_reading = 'せんもんかの いけんによると、ほすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phơi, hong là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191843
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、乾燥（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かんそう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự sấy khô là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191844
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、敷くが 重要です。',
    example_reading = 'せんもんかの いけんによると、しくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trải là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191845
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、育児が 重要です。',
    example_reading = 'せんもんかの いけんによると、いくじが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nuôi con là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191846
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、（人を）起こすが 重要です。',
    example_reading = 'せんもんかの いけんによると、（ひとを）おこすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đánh thức là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191847
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、糸が 重要です。',
    example_reading = 'せんもんかの いけんによると、いとが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sợi chỉ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191848
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、針が 重要です。',
    example_reading = 'せんもんかの いけんによると、はりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, kim là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191849
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、生ごみが 重要です。',
    example_reading = 'せんもんかの いけんによると、なまごみが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, rác hữu cơ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191850
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、空き缶が 重要です。',
    example_reading = 'せんもんかの いけんによると、あきかんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vỏ lon là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191851
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、（ごみを）出すが 重要です。',
    example_reading = 'せんもんかの いけんによると、（ごみを）だすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vứt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191852
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '大学の 近くで 静かな 住まいを 探して います。',
    example_reading = 'だいがくの ちかくで しずかな すまいを さがして います。',
    example_vi = 'Tôi đang tìm chỗ ở yên tĩnh gần trường đại học.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191853
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '家族みんなで 居間の ソファーに 座って テレビを 見ます。',
    example_reading = 'かぞくみんなで いまの そふぁーに すわって てれびを みます。',
    example_vi = 'Cả gia đình cùng ngồi trên ghế sofa ở phòng khách xem tivi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191854
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '電気屋で 省エネの 家電製品を 買い揃えました。',
    example_reading = 'でんきやで しょうえねの かでんせいひんを かいそろえました。',
    example_vi = 'Tại cửa hàng điện máy tôi đã mua đầy đủ đồ điện gia dụng tiết kiệm điện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191855
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 暖めるを 行いました。',
    example_reading = 'みんなで きょうりょくして あたためるを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện làm ấm, sưởi ấm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191856
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、天井が 重要です。',
    example_reading = 'せんもんかの いけんによると、てんじょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trần nhà là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191857
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、床が 重要です。',
    example_reading = 'せんもんかの いけんによると、ゆかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sàn nhà là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191858
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、蛇口が 重要です。',
    example_reading = 'せんもんかの いけんによると、じゃぐちが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vòi nước là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191859
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、実家が 重要です。',
    example_reading = 'せんもんかの いけんによると、じっかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nhà bố mẹ đẻ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191860
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、家賃が 重要です。',
    example_reading = 'せんもんかの いけんによると、やちんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tiền thuê nhà là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191861
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、物置が 重要です。',
    example_reading = 'せんもんかの いけんによると、ものおきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nhà kho, nơi để đồ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191862
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、日当たりが 重要です。',
    example_reading = 'せんもんかの いけんによると、ひあたりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ánh nắng, hướng nắng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191863
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、内側が 重要です。',
    example_reading = 'せんもんかの いけんによると、うちがわが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bên trong, mặt trong là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191864
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面ではお札という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは おさつという ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ tiền giấy thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191865
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、小銭が 重要です。',
    example_reading = 'せんもんかの いけんによると、こぜにが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tiền lẻ, xu lẻ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191866
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、生活費が 重要です。',
    example_reading = 'せんもんかの いけんによると、せいかつひが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chi phí sinh hoạt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191867
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、食費が 重要です。',
    example_reading = 'せんもんかの いけんによると、しょくひが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chi phí ăn uống, tiền ăn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191868
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、光熱費が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうねつひが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chi phí điện nước ga là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191869
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、交際費が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうさいひが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chi phí giao tiếp, tiền tiếp khách là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191870
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、公共料金が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうきょうりょうきんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phí dịch vụ công cộng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191871
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、節約（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、せつやく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự tiết kiệm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191872
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、割り勘が 重要です。',
    example_reading = 'せんもんかの いけんによると、わりかんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chia nhau trả tiền là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191873
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、支払うが 重要です。',
    example_reading = 'せんもんかの いけんによると、しはらうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trả tiền, thanh toán là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191874
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、支払いが 重要です。',
    example_reading = 'せんもんかの いけんによると、しはらいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự chi trả, thanh toán là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191875
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、勘定（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かんじょう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự tính tiền, thanh toán là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191876
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '新しい 口座は とても きれいで 広いです。',
    example_reading = 'あたらしい こうざは とても きれいで ひろいです。',
    example_vi = 'Tài khoản ngân hàng mới rất đẹp và rộng rãi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191877
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、暗証番号が 重要です。',
    example_reading = 'せんもんかの いけんによると、あんしょうばんごうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mã PIN, mã số cá nhân là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191878
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '新しい 預金（する）は とても きれいで 広いです。',
    example_reading = 'あたらしい よきん（する）は とても きれいで ひろいです。',
    example_vi = 'Tiền gửi ngân hàng, sự gửi tiền mới rất đẹp và rộng rãi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191879
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、引き出すが 重要です。',
    example_reading = 'せんもんかの いけんによると、ひきだすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, rút là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191880
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、振り込むが 重要です。',
    example_reading = 'せんもんかの いけんによると、ふりこむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chuyển khoản là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191881
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、送金（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、そうきん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự gửi tiền, chuyển tiền là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191882
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '新しい 通帳記入は とても きれいで 広いです。',
    example_reading = 'あたらしい つうちょうきにゅうは とても きれいで ひろいです。',
    example_vi = 'Cập nhật sổ ngân hàng mới rất đẹp và rộng rãi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191883
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、品物が 重要です。',
    example_reading = 'せんもんかの いけんによると、しなものが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hàng, hàng hóa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191884
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、現金が 重要です。',
    example_reading = 'せんもんかの いけんによると、げんきんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tiền mặt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191885
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、一回払いが 重要です。',
    example_reading = 'せんもんかの いけんによると、いっかいばらいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thanh toán một lần là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191886
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、合計（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ごうけい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tổng cộng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191887
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、代金が 重要です。',
    example_reading = 'せんもんかの いけんによると、だいきんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tiền mua hàng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191888
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、税込が 重要です。',
    example_reading = 'せんもんかの いけんによると、ぜいこみが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bao gồm thuế là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191889
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、請求書が 重要です。',
    example_reading = 'せんもんかの いけんによると、せいきゅうしょが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phiếu yêu cầu thanh toán là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191890
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、領収書が 重要です。',
    example_reading = 'せんもんかの いけんによると、りょうしゅうしょが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, biên lai, hóa đơn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191891
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、売り切れが 重要です。',
    example_reading = 'せんもんかの いけんによると、うりきれが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự bán hết là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191892
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、品切れが 重要です。',
    example_reading = 'せんもんかの いけんによると、しなぎれが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự hết hàng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191893
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '計画に 基づいて 日替わりを 進めて います。',
    example_reading = 'けいかくに もとづいて ひがわりを すすめて います。',
    example_vi = 'Dựa trên kế hoạch, chúng tôi đang tiến hành thay đổi theo ngày.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191894
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '計画に 基づいて 割引を 進めて います。',
    example_reading = 'けいかくに もとづいて わりびきを すすめて います。',
    example_vi = 'Dựa trên kế hoạch, chúng tôi đang tiến hành giảm giá.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191895
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、半額が 重要です。',
    example_reading = 'せんもんかの いけんによると、はんがくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nửa giá tiền là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191896
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、特売日が 重要です。',
    example_reading = 'せんもんかの いけんによると、とくばいびが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày hạ giá đặc biệt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191897
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では得（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは とく（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ món hời (hời, lời) thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191898
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では損（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは そん（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ tổn thất, thiệt (bị thiệt) thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191899
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、寄るが 重要です。',
    example_reading = 'せんもんかの いけんによると、よるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, rẽ qua, ghé qua là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191900
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、レジ袋が 重要です。',
    example_reading = 'せんもんかの いけんによると、レジぶくろが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, túi ni lông, túi bóng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191901
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、定休日が 重要です。',
    example_reading = 'せんもんかの いけんによると、ていきゅうびが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày nghỉ quy định là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191902
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、覚ますが 重要です。',
    example_reading = 'せんもんかの いけんによると、さますが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tỉnh dậy, thức dậy là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191903
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、覚めるが 重要です。',
    example_reading = 'せんもんかの いけんによると、さめるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tỉnh giấc, thức dậy là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191904
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、（夜が）明けるが 重要です。',
    example_reading = 'せんもんかの いけんによると、（よが）あけるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trời sáng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191905
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '計画に 基づいて 支度（する）を 進めて います。',
    example_reading = 'けいかくに もとづいて したく（する）を すすめて います。',
    example_vi = 'Dựa trên kế hoạch, chúng tôi đang tiến hành sự chuẩn bị, sửa soạn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191906
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、合わせるが 重要です。',
    example_reading = 'せんもんかの いけんによると、あわせるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ghép lại, chắp lại, kết hợp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191907
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、（髪を）とかすが 重要です。',
    example_reading = 'せんもんかの いけんによると、（かみを）とかすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chải là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191908
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、昼寝（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひるね（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, việc ngủ trưa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191909
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、腰かけるが 重要です。',
    example_reading = 'せんもんかの いけんによると、こしかけるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngồi xuống là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191910
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、暮れるが 重要です。',
    example_reading = 'せんもんかの いけんによると、くれるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tối dần, lặn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191911
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、ふだん着が 重要です。',
    example_reading = 'せんもんかの いけんによると、ふだんぎが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, quần áo thường ngày, quần áo ở nhà là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191912
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、相変わらずが 重要です。',
    example_reading = 'せんもんかの いけんによると、あいかわらずが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vẫn như cũ, vẫn như thường là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191913
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、夜ふかし（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、よふかし（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự thức khuya là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191914
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、電源が 重要です。',
    example_reading = 'せんもんかの いけんによると、でんげんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nguồn điện, ổ cắm điện là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191915
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、充電（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、じゅうでん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, việc sạc pin, nạp điện là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191916
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、運が 重要です。',
    example_reading = 'せんもんかの いけんによると、うんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vận, vận may là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191917
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、日常が 重要です。',
    example_reading = 'せんもんかの いけんによると、にちじょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thường nhật, hằng ngày là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191918
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、常にが 重要です。',
    example_reading = 'せんもんかの いけんによると、つねにが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, luôn luôn, lúc nào cũng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191919
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、出迎えが 重要です。',
    example_reading = 'せんもんかの いけんによると、でむかえが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đón tiếp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191920
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、出迎えるが 重要です。',
    example_reading = 'せんもんかの いけんによると、でむかえるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đón, đón tiếp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191921
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、見送りが 重要です。',
    example_reading = 'せんもんかの いけんによると、みおくりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tiễn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191922
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、見送るが 重要です。',
    example_reading = 'せんもんかの いけんによると、みおくるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tiễn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191923
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、郵送（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ゆうそう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, gửi qua bưu điện là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191924
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、小包が 重要です。',
    example_reading = 'せんもんかの いけんによると、こづつみが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, gói hàng, bưu kiện là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191925
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、送料が 重要です。',
    example_reading = 'せんもんかの いけんによると、そうりょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phí gửi hàng, cước vận chuyển là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191926
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、あて先が 重要です。',
    example_reading = 'せんもんかの いけんによると、あてさきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, địa chỉ người nhận là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191927
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、あて名が 重要です。',
    example_reading = 'せんもんかの いけんによると、あてなが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tên người nhận là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191928
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、差出人が 重要です。',
    example_reading = 'せんもんかの いけんによると、さしだしにんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, người gửi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191929
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、出前が 重要です。',
    example_reading = 'せんもんかの いけんによると、でまえが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, giao đồ ăn tận nhà là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191930
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、留守番電話が 重要です。',
    example_reading = 'せんもんかの いけんによると、るすばんでんわが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, máy trả lời tự động, hộp thư thoại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191931
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では早め（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは はやめ（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sớm, sớm hơn bình thường thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191932
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '休日に 活気のある 商店街で 買い物を 楽しみました。',
    example_reading = 'きゅうじつに かっきのある しょうてんがいで かいものを たのしみました。',
    example_vi = 'Vào ngày nghỉ tôi tận hưởng việc mua sắm ở khu phố thương mại sầm uất.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191933
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '東京駅の 周辺には 高層ビルが 立ち並んで います。',
    example_reading = 'とうきょうえきの しゅうへんには こうそうびるが たちならんで います。',
    example_vi = 'Xung quanh ga Tokyo các tòa nhà cao tầng mọc lên sát nhau.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191934
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、建つが 重要です。',
    example_reading = 'せんもんかの いけんによると、たつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, việc xây dựng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191935
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '週末に 家族と 水族館へ 行きました。',
    example_reading = 'しゅうまつに かぞくと すいぞくかんへ いきました。',
    example_vi = 'Cuối tuần tôi đã đi thủy cung cùng gia đình.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191936
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '博物館で 昔の 道具を 見ました。',
    example_reading = 'はくぶつかんで むかしの どうぐを みました。',
    example_vi = 'Tôi đã xem những dụng cụ ngày xưa ở bảo tàng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191937
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、出入り口（出入口）が 重要です。',
    example_reading = 'せんもんかの いけんによると、でいりぐち（でいりぐち）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lối / cửa ra vào là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191938
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、自動ドアが 重要です。',
    example_reading = 'せんもんかの いけんによると、じどうドアが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cửa tự động là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191939
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、入館料が 重要です。',
    example_reading = 'せんもんかの いけんによると、にゅうかんりょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phí vào cửa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191940
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、混雑（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、こんざつ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự đông đúc, đông nghịt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191941
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、行列が 重要です。',
    example_reading = 'せんもんかの いけんによると、ぎょうれつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hàng người là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191942
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、休館日が 重要です。',
    example_reading = 'せんもんかの いけんによると、きゅうかんびが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày đóng cửa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191943
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、使用料が 重要です。',
    example_reading = 'せんもんかの いけんによると、しようりょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phí sử dụng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191944
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、無料が 重要です。',
    example_reading = 'せんもんかの いけんによると、むりょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, miễn phí là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191945
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、老人ホームが 重要です。',
    example_reading = 'せんもんかの いけんによると、ろうじんホームが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nhà dưỡng lão là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191946
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、目印が 重要です。',
    example_reading = 'せんもんかの いけんによると、めじるしが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dấu hiệu nhận biết là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191947
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、歩道橋が 重要です。',
    example_reading = 'せんもんかの いけんによると、ほどうきょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cầu vượt đi bộ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191948
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、居酒屋が 重要です。',
    example_reading = 'せんもんかの いけんによると、いざかやが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, quán nhậu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191949
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '新しい 八百屋は とても きれいで 広いです。',
    example_reading = 'あたらしい やおやは とても きれいで ひろいです。',
    example_vi = 'Cửa hàng rau quả mới rất đẹp và rộng rãi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191950
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、正面が 重要です。',
    example_reading = 'せんもんかの いけんによると、しょうめんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chính diện, mặt trước là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191951
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、地方が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちほうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, địa phương là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191952
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、地域が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちいきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khu vực là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191953
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、郊外が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうがいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngoại ô là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191954
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、中心が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちゅうしんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, Trung tâm, giữa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191955
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、移転（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、いてん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự di dời, di chuyển là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191956
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、工事（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうじ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thi công, công trình xây dựng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191957
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、空き地が 重要です。',
    example_reading = 'せんもんかの いけんによると、あきちが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khu đất trống là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191958
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、人ごみが 重要です。',
    example_reading = 'せんもんかの いけんによると、ひとごみが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đám đông là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191959
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、都会が 重要です。',
    example_reading = 'せんもんかの いけんによると、とかいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đô thị là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191960
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、通りかかるが 重要です。',
    example_reading = 'せんもんかの いけんによると、とおりかかるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tình cờ đi ngang qua là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191961
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、通り過ぎるが 重要です。',
    example_reading = 'せんもんかの いけんによると、とおりすぎるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đi quá, đi lướt qua là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191962
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、徒歩が 重要です。',
    example_reading = 'せんもんかの いけんによると、とほが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đi bộ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191963
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、方向が 重要です。',
    example_reading = 'せんもんかの いけんによると、ほうこうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hướng, phương hướng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191964
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、遠回り（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、とおまわり（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự đi vòng, đường vòng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191965
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、近道（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちかみち（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự đi tắt, đường tắt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191966
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、距離が 重要です。',
    example_reading = 'せんもんかの いけんによると、きょりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cự ly, khoảng cách là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191967
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、追いかけるが 重要です。',
    example_reading = 'せんもんかの いけんによると、おいかけるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đuổi theo là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191968
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、追いつくが 重要です。',
    example_reading = 'せんもんかの いけんによると、おいつくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đuổi kịp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191969
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、追い越すが 重要です。',
    example_reading = 'せんもんかの いけんによると、おいこすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vượt, vượt qua là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191970
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、突き当たりが 重要です。',
    example_reading = 'せんもんかの いけんによると、つきあたりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cuối đường, ngõ cụt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191971
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、立ち止まるが 重要です。',
    example_reading = 'せんもんかの いけんによると、たちどまるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dừng lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191972
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、横切るが 重要です。',
    example_reading = 'せんもんかの いけんによると、よこぎるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, băng qua là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191973
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、見かけるが 重要です。',
    example_reading = 'せんもんかの いけんによると、みかけるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trông thấy, bắt gặp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191974
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、行き先が 重要です。',
    example_reading = 'せんもんかの いけんによると、いきさき / ゆきさきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nơi đến, điểm đến là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191975
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、往復（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、おうふく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự đi và về, khứ hồi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191976
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、片道が 重要です。',
    example_reading = 'せんもんかの いけんによると、かたみちが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, một chiều là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191977
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、各駅停車が 重要です。',
    example_reading = 'せんもんかの いけんによると、かくえきていしゃが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tàu chậm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191978
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、急行が 重要です。',
    example_reading = 'せんもんかの いけんによると、きゅうこうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tàu tốc hành là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191979
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、始発が 重要です。',
    example_reading = 'せんもんかの いけんによると、しはつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chuyến đầu tiên, ga đầu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191980
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、終電が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゅうでんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chuyến tàu cuối cùng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191981
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、終点が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゅうてんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ga cuối, trạm cuối là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191982
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、上りが 重要です。',
    example_reading = 'せんもんかの いけんによると、のぼりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lên thành phố, tàu đi về hướng trung tâm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191983
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、下りが 重要です。',
    example_reading = 'せんもんかの いけんによると、くだりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đi về địa phương, tàu đi ra ngoại thành là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191984
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、ＪＲが 重要です。',
    example_reading = 'せんもんかの いけんによると、ジェイアールが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, JR là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191985
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、私鉄が 重要です。',
    example_reading = 'せんもんかの いけんによると、してつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tuyến đường sắt tư nhân là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191986
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、経由（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、けいゆ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự đi qua, quá cảnh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191987
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、定期券が 重要です。',
    example_reading = 'せんもんかの いけんによると、ていきけんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vé tháng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191988
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、有効期限が 重要です。',
    example_reading = 'せんもんかの いけんによると、ゆうこうきげんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thời hạn có hiệu lực, hạn sử dụng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191989
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、窓口が 重要です。',
    example_reading = 'せんもんかの いけんによると、まどぐちが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, quầy giao dịch là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191990
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、販売（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、はんばい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự bán, việc bán hàng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191991
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、通路側が 重要です。',
    example_reading = 'せんもんかの いけんによると、つうろがわが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phía lối đi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191992
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、改札が 重要です。',
    example_reading = 'せんもんかの いけんによると、かいさつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cửa soát vé là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191993
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、指定席が 重要です。',
    example_reading = 'せんもんかの いけんによると、していせきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ghế chỉ định là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191994
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、車内アナウンスが 重要です。',
    example_reading = 'せんもんかの いけんによると、しゃないアナウンスが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phát thanh trên tàu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191995
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、車掌が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゃしょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, người soát vé, nhân viên phụ trách trên tàu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191996
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、線路が 重要です。',
    example_reading = 'せんもんかの いけんによると、せんろが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đường ray, đường tàu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191997
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、踏切が 重要です。',
    example_reading = 'せんもんかの いけんによると、ふみきりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đường ngang là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191998
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、乗り遅れるが 重要です。',
    example_reading = 'せんもんかの いけんによると、のりおくれるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trễ tàu xe, lỡ tàu xe là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 191999
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、乗り換えるが 重要です。',
    example_reading = 'せんもんかの いけんによると、のりかえるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chuyển tàu xe, đổi tàu xe là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192000
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、乗り越すが 重要です。',
    example_reading = 'せんもんかの いけんによると、のりこすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đi quá là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192001
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、乗り過ごすが 重要です。',
    example_reading = 'せんもんかの いけんによると、のりすごすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đi quá trạm, lỡ trạm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192002
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、踏むが 重要です。',
    example_reading = 'せんもんかの いけんによると、ふむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, giẫm, dẫm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192003
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、バス停が 重要です。',
    example_reading = 'せんもんかの いけんによると、バスていが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bến đỗ xe buýt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192004
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、乗車口が 重要です。',
    example_reading = 'せんもんかの いけんによると、じょうしゃぐちが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cửa lên xe là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192005
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、乗客が 重要です。',
    example_reading = 'せんもんかの いけんによると、じょうきゃくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hành khách là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192006
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、乗車（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、じょうしゃ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đi tàu, đi xe là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192007
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、発車（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、はっしゃ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự xuất phát là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192008
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、通過（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、つうか（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự đi qua là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192009
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、停車（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ていしゃ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự dừng xe là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192010
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、下車（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、げしゃ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự xuống xe là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192011
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、交通費が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうつうひが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tiền đi lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192012
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、バス代が 重要です。',
    example_reading = 'せんもんかの いけんによると、バスだいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tiền xe buýt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192013
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、払い戻すが 重要です。',
    example_reading = 'せんもんかの いけんによると、はらいもどすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hoàn trả, lấy lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192014
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、定員が 重要です。',
    example_reading = 'せんもんかの いけんによると、ていいんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, số người chở tối đa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192015
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、満員が 重要です。',
    example_reading = 'せんもんかの いけんによると、まんいんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đầy chỗ, hết chỗ, chật là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192016
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、時刻が 重要です。',
    example_reading = 'せんもんかの いけんによると、じこくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, giờ giấc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192017
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、優先席が 重要です。',
    example_reading = 'せんもんかの いけんによると、ゆうせんせきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ghế ưu tiên là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192018
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、立ち上がるが 重要です。',
    example_reading = 'せんもんかの いけんによると、たちあがるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đứng dậy là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192019
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、乗せるが 重要です。',
    example_reading = 'せんもんかの いけんによると、のせるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chở, cho lên xe là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192020
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、助手席が 重要です。',
    example_reading = 'せんもんかの いけんによると、じょしゅせきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ghế phụ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192021
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、道路が 重要です。',
    example_reading = 'せんもんかの いけんによると、どうろが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đường, đường bộ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192022
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、渋滞（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、じゅうたい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự kẹt xe, tắc đường là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192023
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、速度が 重要です。',
    example_reading = 'せんもんかの いけんによると、そくどが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tốc độ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192024
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、高速道路が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうそくどうろが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đường cao tốc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192025
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では安全（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは あんぜん（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự an toàn (an toàn) thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192026
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、列が 重要です。',
    example_reading = 'せんもんかの いけんによると、れつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hàng, dãy là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192027
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、割り込むが 重要です。',
    example_reading = 'せんもんかの いけんによると、わりこむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chen ngang, chen vào là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192028
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、駐車違反が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちゅうしゃいはんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vi phạm quy định đỗ xe là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192029
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、スピード違反が 重要です。',
    example_reading = 'せんもんかの いけんによると、スピードいはんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vi phạm tốc độ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192030
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、飲酒運転が 重要です。',
    example_reading = 'せんもんかの いけんによると、いんしゅうんてんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lái xe khi đã uống rượu bia là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192031
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、一方通行が 重要です。',
    example_reading = 'せんもんかの いけんによると、いっぽうつうこうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đường một chiều là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192032
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、通行止めが 重要です。',
    example_reading = 'せんもんかの いけんによると、つうこうどめが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cấm lưu thông, đường bị chặn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192033
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、運転免許証が 重要です。',
    example_reading = 'せんもんかの いけんによると、うんてんめんきょしょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bằng lái xe là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192034
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、中古車が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちゅうこしゃが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, xe ô tô cũ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192035
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '桜の 花が 咲く 中で 入学式が 行われました。',
    example_reading = 'さくらの はなが さく なかで にゅうがくしきが おこなわれました。',
    example_vi = 'Lễ nhập học đã được tổ chức giữa lúc hoa anh đào nở.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192036
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '卒業式で お世話になった 先生方に 感謝を 伝えました。',
    example_reading = 'そつぎょうしきで おせわになった せんせいがたに かんしゃを つたえました。',
    example_vi = 'Tại lễ tốt nghiệp tôi đã gửi lời cảm ơn tới các thầy cô giáo đã giúp đỡ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192037
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では通学（する）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは つうがく（する）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự đi học thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192038
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、学年が 重要です。',
    example_reading = 'せんもんかの いけんによると、がくねんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, năm học, khối lớp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192039
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、学期が 重要です。',
    example_reading = 'せんもんかの いけんによると、がっきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, học kỳ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192040
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、欠席（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、けっせき（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vắng mặt, nghỉ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192041
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、遅れるが 重要です。',
    example_reading = 'せんもんかの いけんによると、おくれるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đến trễ, đến muộn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192042
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、遅刻（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちこく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự đi trễ, đi muộn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192043
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、集中（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゅうちゅう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự tập trung là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192044
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、居眠り（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、いねむり（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự ngủ gật là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192045
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では寝不足（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは ねぶそく（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự thiếu ngủ (thiếu ngủ) thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192046
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、期間が 重要です。',
    example_reading = 'せんもんかの いけんによると、きかんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thời gian, thời kỳ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192047
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、期限が 重要です。',
    example_reading = 'せんもんかの いけんによると、きげんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thời hạn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192048
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、時間割が 重要です。',
    example_reading = 'せんもんかの いけんによると、じかんわりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thời khóa biểu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192049
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、項目が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうもくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mục, khoản là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192050
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、座席が 重要です。',
    example_reading = 'せんもんかの いけんによると、ざせきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chỗ ngồi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192051
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、締め切りが 重要です。',
    example_reading = 'せんもんかの いけんによると、しめきりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hạn chót là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192052
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、開くが 重要です。',
    example_reading = 'せんもんかの いけんによると、ひらくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mở là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192053
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、一応が 重要です。',
    example_reading = 'せんもんかの いけんによると、いちおうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tạm thời, cứ thử, cho chắc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192054
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、貸し出しが 重要です。',
    example_reading = 'せんもんかの いけんによると、かしだしが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cho mượn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192055
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、返却（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、へんきゃく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự trả lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192056
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、名札が 重要です。',
    example_reading = 'せんもんかの いけんによると、なふだが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thẻ tên, bảng tên là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192057
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '新しい 給食は とても きれいで 広いです。',
    example_reading = 'あたらしい きゅうしょくは とても きれいで ひろいです。',
    example_vi = 'Bữa ăn trưa ở trường mới rất đẹp và rộng rãi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192058
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、体育が 重要です。',
    example_reading = 'せんもんかの いけんによると、たいいくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, môn thể dục là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192059
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、単語が 重要です。',
    example_reading = 'せんもんかの いけんによると、たんごが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, từ vựng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192060
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、暗記（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、あんき（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, học thuộc lòng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192061
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、記憶（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、きおく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trí nhớ, ghi nhớ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192062
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、くり返すが 重要です。',
    example_reading = 'せんもんかの いけんによると、くりかえすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lặp lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192063
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、聞き取るが 重要です。',
    example_reading = 'せんもんかの いけんによると、ききとるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nghe hiểu, nghe lấy là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192064
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、聞き返すが 重要です。',
    example_reading = 'せんもんかの いけんによると、ききかえすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hỏi lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192065
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、聞き直すが 重要です。',
    example_reading = 'せんもんかの いけんによると、ききなおすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nghe lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192066
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、言い直すが 重要です。',
    example_reading = 'せんもんかの いけんによると、いいなおすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nói lại, sửa lại lời nói là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192067
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、英会話が 重要です。',
    example_reading = 'せんもんかの いけんによると、えいかいわが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hội thoại tiếng Anh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192068
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、入門が 重要です。',
    example_reading = 'せんもんかの いけんによると、にゅうもんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nhập môn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192069
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、下書き（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、したがき（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, Bản nháp, viết nháp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192070
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、清書（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、せいしょ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, viết chính thức, viết sạch là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192071
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、表れるが 重要です。',
    example_reading = 'せんもんかの いけんによると、あらわれるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thể hiện, biểu hiện là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192072
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、物語が 重要です。',
    example_reading = 'せんもんかの いけんによると、ものがたりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, câu chuyện, truyện kể là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192073
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、教科が 重要です。',
    example_reading = 'せんもんかの いけんによると、きょうかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, môn học là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192074
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、科目が 重要です。',
    example_reading = 'せんもんかの いけんによると、かもくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, môn học là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192075
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、足し算が 重要です。',
    example_reading = 'せんもんかの いけんによると、たしざんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phép cộng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192076
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、三角形が 重要です。',
    example_reading = 'せんもんかの いけんによると、さんかっけいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hình tam giác là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192077
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、定規が 重要です。',
    example_reading = 'せんもんかの いけんによると、じょうぎが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thước kẻ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192078
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、自習（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、じしゅう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tự học là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192079
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、ローマ字が 重要です。',
    example_reading = 'せんもんかの いけんによると、ローマじが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chữ cái la-tinh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192080
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、補講（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ほこう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, học bù, giờ học bổ sung là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192081
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、学部が 重要です。',
    example_reading = 'せんもんかの いけんによると、がくぶが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khoa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192082
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、文系が 重要です。',
    example_reading = 'せんもんかの いけんによると、ぶんけいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khối ngành xã hội là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192083
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、理系が 重要です。',
    example_reading = 'せんもんかの いけんによると、りけいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khối ngành tự nhiên là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192084
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、学科が 重要です。',
    example_reading = 'せんもんかの いけんによると、がっかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bộ môn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192085
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、専攻（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、せんこう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chuyên môn, chuyên ngành là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192086
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、前期が 重要です。',
    example_reading = 'せんもんかの いけんによると、ぜんきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, học kỳ đầu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192087
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、学費が 重要です。',
    example_reading = 'せんもんかの いけんによると、がくひが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, học phí là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192088
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、奨学金が 重要です。',
    example_reading = 'せんもんかの いけんによると、しょうがくきんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, học bổng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192089
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、公立が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうりつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, công lập là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192090
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、私立が 重要です。',
    example_reading = 'せんもんかの いけんによると、しりつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tư lập là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192091
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、教授が 重要です。',
    example_reading = 'せんもんかの いけんによると、きょうじゅが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, giáo sư là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192092
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、講義（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうぎ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bài giảng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192093
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、手続き（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、てつづき（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thủ tục là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192094
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、日付が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひづけが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày tháng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192095
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、筆者が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひっしゃが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tác giả là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192096
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、内容が 重要です。',
    example_reading = 'せんもんかの いけんによると、ないようが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nội dung là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192097
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '計画に 基づいて 仕上げるを 進めて います。',
    example_reading = 'けいかくに もとづいて しあげるを すすめて います。',
    example_vi = 'Dựa trên kế hoạch, chúng tôi đang tiến hành làm xong, hoàn thành.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192098
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、提出（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ていしゅつ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự nộp, xuất trình là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192099
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、進路が 重要です。',
    example_reading = 'せんもんかの いけんによると、しんろが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lựa chọn trong tương lai là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192100
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、大学院が 重要です。',
    example_reading = 'せんもんかの いけんによると、だいがくいんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cao học là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192101
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、進学（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しんがく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự học lên là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192102
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、一人暮らしが 重要です。',
    example_reading = 'せんもんかの いけんによると、ひとりぐらしが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sống một mình là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192103
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、時給が 重要です。',
    example_reading = 'せんもんかの いけんによると、じきゅうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lương theo giờ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192104
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、寮が 重要です。',
    example_reading = 'せんもんかの いけんによると、りょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ký túc xá là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192105
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、休学（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、きゅうがく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự nghỉ học là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192106
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、退学（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、たいがく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự thôi học, bỏ học là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192107
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、受験（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、じゅけん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự dự thi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192108
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、受験生が 重要です。',
    example_reading = 'せんもんかの いけんによると、じゅけんせいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thí sinh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192109
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、合格（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ごうかく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự thi đỗ, thi đậu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192110
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、配るが 重要です。',
    example_reading = 'せんもんかの いけんによると、くばるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phát là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192111
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、氏名が 重要です。',
    example_reading = 'せんもんかの いけんによると、しめいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, họ tên là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192112
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、裏返すが 重要です。',
    example_reading = 'せんもんかの いけんによると、うらがえすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lật, úp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192113
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、問いが 重要です。',
    example_reading = 'せんもんかの いけんによると、といが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, câu hỏi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192114
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、解くが 重要です。',
    example_reading = 'せんもんかの いけんによると、とくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, giải là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192115
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、正解（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、せいかい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, câu trả lời đúng, sự trả lời đúng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192116
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では正確（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは せいかく（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự chính xác (chính xác) thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192117
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、余るが 重要です。',
    example_reading = 'せんもんかの いけんによると、あまるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thừa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192118
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 適当な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても てきとうな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất phù hợp, đại khái.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192119
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、間違いが 重要です。',
    example_reading = 'せんもんかの いけんによると、まちがいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chỗ nhầm, chỗ sai là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192120
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、優れるが 重要です。',
    example_reading = 'せんもんかの いけんによると、すぐれるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, giỏi, xuất sắc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192121
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、実力が 重要です。',
    example_reading = 'せんもんかの いけんによると、じつりょくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thực lực là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192122
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、結果が 重要です。',
    example_reading = 'せんもんかの いけんによると、けっかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, kết quả là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192123
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、少数が 重要です。',
    example_reading = 'せんもんかの いけんによると、しょうすうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, số ít là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192124
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、可能性が 重要です。',
    example_reading = 'せんもんかの いけんによると、かのうせいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khả năng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192125
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、掲示板が 重要です。',
    example_reading = 'せんもんかの いけんによると、けいじばんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bảng thông báo là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192126
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、知識が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちしきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, kiến thức là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192127
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、理解（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、りかい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự lý giải, hiểu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192128
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、目指すが 重要です。',
    example_reading = 'せんもんかの いけんによると、めざすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nhắm tới, lấy mục tiêu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192129
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、試すが 重要です。',
    example_reading = 'せんもんかの いけんによると、ためすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thử là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192130
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、自信が 重要です。',
    example_reading = 'せんもんかの いけんによると、じしんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tự tin là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192131
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、やる気が 重要です。',
    example_reading = 'せんもんかの いけんによると、やるきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, động lực, sự hăng hái là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192132
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では利口（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは りこう（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ khôn ngoan, lanh lợi thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192133
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では相当（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは そうとう（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ khá, rất, tương đương thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192134
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、努力（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、どりょく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự nỗ lực, cố gắng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192135
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 得意な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても とくいな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất giỏi, sở trường.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192136
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 苦手な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても にがてな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất yếu, không giỏi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192137
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、問い合わせるが 重要です。',
    example_reading = 'せんもんかの いけんによると、といあわせるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hỏi, liên hệ hỏi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192138
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'グローバルに 活躍する 有名な 企業に 就職したいです。',
    example_reading = 'ぐろーばるに かつやくする ゆうめいな きぎょうに しゅうしょくしたいです。',
    example_vi = 'Tôi muốn vào làm việc ở một doanh nghiệp nổi tiếng hoạt động toàn cầu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192139
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '給料や 勤務時間などの 労働条件を 確認します。',
    example_reading = 'きゅうりょうや きんむじかんなどの ろうどうじょうけんを かくにんします。',
    example_vi = 'Tôi kiểm tra các điều kiện lao động như lương và thời gian làm việc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192140
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では募集（する）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは ぼしゅう（する）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự tuyển mộ, chiêu mộ thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192141
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、応募（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、おうぼ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự ứng tuyển là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192142
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、登録（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、とうろく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự đăng ký là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192143
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、面接（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、めんせつ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự phỏng vấn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192144
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'アルバイトの 面接の 前に 履歴書を 丁寧に 書き込みます。',
    example_reading = 'あるばいとの めんせつの まえに りれきしょを ていねいに かきこみます。',
    example_vi = 'Trước buổi phỏng vấn việc làm thêm tôi viết sơ yếu lý lịch một cách cẩn thận.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192145
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では記入（する）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは きにゅう（する）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ việc ghi, điền vào thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192146
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'IT企業への 就職に 役立つ 資格を 取得したいです。',
    example_reading = 'あいてぃーきぎょうへの しゅうしょくに やくだつ しかくを しゅとくしたいです。',
    example_vi = 'Tôi muốn lấy chứng chỉ có ích cho việc xin việc vào công ty IT.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192147
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '面接の ときは 清潔感の ある 服装を 心がけましょう。',
    example_reading = 'めんせつの ときは せいけつかんの ある ふくそうを こころがけましょう。',
    example_vi = 'Khi đi phỏng vấn hãy chú ý mặc trang phục tạo cảm giác sạch sẽ, chỉn chu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192148
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '面接官に 自分の 長所を 分かりやすく アピールしました。',
    example_reading = 'めんせつかんに じぶんの ちょうしょを わかりやすく あぴーるしました。',
    example_vi = 'Tôi đã thể hiện rõ điểm mạnh của bản thân cho người phỏng vấn thấy.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192149
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '自分の 短所を 正直に 認めて 改善する 努力を します。',
    example_reading = 'じぶんの たんしょを しょうじきに みとめて かいぜんする どりょくを します。',
    example_vi = 'Tôi trung thực thừa nhận điểm yếu của bản thân và nỗ力 cải thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192150
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、全てが 重要です。',
    example_reading = 'せんもんかの いけんによると、すべてが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tất cả là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192151
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、採用（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、さいよう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự tuyển dụng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192152
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、受け取るが 重要です。',
    example_reading = 'せんもんかの いけんによると、うけとるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nhận là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192153
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、正社員が 重要です。',
    example_reading = 'せんもんかの いけんによると、せいしゃいんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nhân viên chính thức là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192154
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、研修（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、けんしゅう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự đào tạo, tập huấn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192155
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、実習（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、じっしゅう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự thực tập, tập sự là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192156
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、職場が 重要です。',
    example_reading = 'せんもんかの いけんによると、しょくばが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nơi làm việc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192157
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、得るが 重要です。',
    example_reading = 'せんもんかの いけんによると、えるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đạt được, có được là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192158
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、受付が 重要です。',
    example_reading = 'せんもんかの いけんによると、うけつけが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, quầy lễ tân là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192159
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、話し合うが 重要です。',
    example_reading = 'せんもんかの いけんによると、はなしあうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thảo luận, bàn bạc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192160
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、調整（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちょうせい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự điều chỉnh, điều phối, sắp xếp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192161
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、能力が 重要です。',
    example_reading = 'せんもんかの いけんによると、のうりょくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, năng lực là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192162
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、役割が 重要です。',
    example_reading = 'せんもんかの いけんによると、やくわりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vai trò là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192163
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、通勤（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、つうきん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự đi làm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192164
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、早退（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、そうたい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự về sớm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192165
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、無断が 重要です。',
    example_reading = 'せんもんかの いけんによると、むだんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, không xin phép là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192166
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、社会人が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゃかいじんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, người đi làm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192167
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、一人ひとりが 重要です。',
    example_reading = 'せんもんかの いけんによると、ひとりひとりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, từng người từng người là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192168
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、印鑑が 重要です。',
    example_reading = 'せんもんかの いけんによると、いんかんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, con dấu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192169
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、回答（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かいとう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự trả lời, hồi đáp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192170
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、月末が 重要です。',
    example_reading = 'せんもんかの いけんによると、げつまつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cuối tháng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192171
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、確かめるが 重要です。',
    example_reading = 'せんもんかの いけんによると、たしかめるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, kiểm tra lại, xác nhận là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192172
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、確かにが 重要です。',
    example_reading = 'せんもんかの いけんによると、たしかにが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, quả thật, đúng là, chắc chắn là là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192173
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、失業（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しつぎょう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự thất nghiệp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192174
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、上司が 重要です。',
    example_reading = 'せんもんかの いけんによると、じょうしが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cấp trên, sếp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192175
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、部下が 重要です。',
    example_reading = 'せんもんかの いけんによると、ぶかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cấp dưới, nhân viên dưới quyền là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192176
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、先輩が 重要です。',
    example_reading = 'せんもんかの いけんによると、せんぱいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bậc đàn anh, người đi trước là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192177
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、肩書きが 重要です。',
    example_reading = 'せんもんかの いけんによると、かたがきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chức danh, chức vụ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192178
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、同僚が 重要です。',
    example_reading = 'せんもんかの いけんによると、どうりょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đồng nghiệp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192179
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、同期が 重要です。',
    example_reading = 'せんもんかの いけんによると、どうきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cùng đợt, cùng khóa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192180
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、休暇が 重要です。',
    example_reading = 'せんもんかの いけんによると、きゅうかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nghỉ phép, kỳ nghỉ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192181
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、責任が 重要です。',
    example_reading = 'せんもんかの いけんによると、せきにんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trách nhiệm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192182
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では不満（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは ふまん（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ bất mãn, không hài lòng thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192183
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、命令（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、めいれい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lệnh, mệnh lệnh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192184
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、指示（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しじ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chỉ thị, chỉ dẫn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192185
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、苦労（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、くろう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự vất vả, gian khổ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192186
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、報告（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ほうこく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, báo cáo là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192187
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、飲み会が 重要です。',
    example_reading = 'せんもんかの いけんによると、のみかいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, buổi nhậu, tiệc rượu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192188
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、歓迎会が 重要です。',
    example_reading = 'せんもんかの いけんによると、かんげいかいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tiệc chào mừng, tiệc đón chào là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192189
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、飲み放題が 重要です。',
    example_reading = 'せんもんかの いけんによると、のみほうだいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, uống không giới hạn, uống thoải mái là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192190
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、勤務（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、きんむ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự làm việc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192191
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、事務が 重要です。',
    example_reading = 'せんもんかの いけんによると、じむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, việc văn phòng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192192
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、担当（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、たんとう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự phụ trách là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192193
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、営業（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、えいぎょう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, kinh doanh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192194
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、経営（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、けいえい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự quản lý, điều hành là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192195
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、広告（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうこく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, việc quảng cáo là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192196
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、出版（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゅっぱん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự xuất bản là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192197
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、制作（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、せいさく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, việc sản xuất, làm, chế tác là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192198
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、通訳（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、つうやく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự phiên dịch, thông dịch là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192199
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、精算（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、せいさん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự quyết toán, thanh toán là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192200
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、（予定を）立てるが 重要です。',
    example_reading = 'せんもんかの いけんによると、（よていを）たてるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lên, lập là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192201
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '新しい 長期は とても きれいで 広いです。',
    example_reading = 'あたらしい ちょうきは とても きれいで ひろいです。',
    example_vi = 'Trường kỳ, dài hạn mới rất đẹp và rộng rãi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192202
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、日程が 重要です。',
    example_reading = 'せんもんかの いけんによると、にっていが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lịch trình là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192203
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、延期（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、えんき（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự hoãn, hoãn lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192204
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、携帯（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、けいたい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự mang theo, cầm theo là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192205
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、協力（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、きょうりょく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự hợp tác là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192206
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、省略（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しょうりゃく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự lược bỏ, bỏ qua là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192207
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、積むが 重要です。',
    example_reading = 'せんもんかの いけんによると、つむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tích lũy, chồng chất là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192208
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、成長（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、せいちょう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự trưởng thành là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192209
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、画面が 重要です。',
    example_reading = 'せんもんかの いけんによると、がめんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, màn hình là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192210
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、件名が 重要です。',
    example_reading = 'せんもんかの いけんによると、けんめいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tiêu đề là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192211
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、受信（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、じゅしん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, việc nhận là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192212
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、送信（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、そうしん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, việc gửi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192213
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、返信（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、へんしん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, việc trả lời là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192214
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、やり取り（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、やりとり（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự trao đổi qua lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192215
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、入力（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、にゅうりょく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự đánh máy, gõ, nhập là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192216
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、変換（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、へんかん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự chuyển đổi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192217
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、改行（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かいぎょう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự xuống dòng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192218
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、見直すが 重要です。',
    example_reading = 'せんもんかの いけんによると、みなおすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, xem lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192219
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '計画に 基づいて 変更（する）を 進めて います。',
    example_reading = 'けいかくに もとづいて へんこう（する）を すすめて います。',
    example_vi = 'Dựa trên kế hoạch, chúng tôi đang tiến hành sự thay đổi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192220
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、画像が 重要です。',
    example_reading = 'せんもんかの いけんによると、がぞうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hình ảnh, ảnh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192221
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、挿入（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、そうにゅう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự chèn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192222
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、添付（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、てんぷ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự đính kèm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192223
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、削除（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、さくじょ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự xóa bỏ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192224
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、保存（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ほぞん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự lưu trữ, lưu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192225
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、新規作成（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しんきさくせい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự tạo mới là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192226
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '計画に 基づいて 完了（する）を 進めて います。',
    example_reading = 'けいかくに もとづいて かんりょう（する）を すすめて います。',
    example_vi = 'Dựa trên kế hoạch, chúng tôi đang tiến hành sự hoàn thành, hoàn tất.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192227
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '旅行の 日にちを 友達と 相談して 決めます。',
    example_reading = 'りょこうの ひにちを ともだちと そうだんして きめます。',
    example_vi = 'Tôi bàn bạc với bạn bè để quyết định ngày đi du lịch.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192228
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '今週末は 日帰りで 箱根温泉へ 行きます。',
    example_reading = 'こんしゅうまつは ひがえりで はこねおんせんへ いきます。',
    example_vi = 'Cuối tuần này tôi đi suối nước nóng hakone về trong ngày.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192229
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '京都へ 二泊三日の 泊まりで 出かけます。',
    example_reading = 'きょうとへ にはくみっかの とまりで でかけます。',
    example_vi = 'Tôi đi du lịch Kyoto ở lại 3 ngày 2 đêm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192230
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、宿泊（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゅくはく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự lưu trú, nghỉ trọ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192231
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、滞在（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、たいざい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ở, lưu trú là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192232
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、団体が 重要です。',
    example_reading = 'せんもんかの いけんによると、だんたいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đoàn, đoàn thể là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192233
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、観光（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かんこう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự du lịch, tham quan là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192234
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、費用が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひようが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phí, chi phí là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192235
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、予算が 重要です。',
    example_reading = 'せんもんかの いけんによると、よさんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, kinh phí, ngân sách là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192236
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、集合（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゅうごう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự tập trung, tập hợp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192237
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、解散（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かいさん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự giải tán là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192238
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、旅館が 重要です。',
    example_reading = 'せんもんかの いけんによると、りょかんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lữ quán là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192239
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、五つ星ホテルが 重要です。',
    example_reading = 'せんもんかの いけんによると、いつつぼしホテルが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khách sạn 5 sao là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192240
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、満室が 重要です。',
    example_reading = 'せんもんかの いけんによると、まんしつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hết phòng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192241
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、近づくが 重要です。',
    example_reading = 'せんもんかの いけんによると、ちかづくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đến gần là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192242
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、取り消すが 重要です。',
    example_reading = 'せんもんかの いけんによると、とりけすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hủy, hủy bỏ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192243
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、追加（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ついか（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự bổ sung, thêm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192244
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、持ち物が 重要です。',
    example_reading = 'せんもんかの いけんによると、もちものが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đồ mang đi, đồ đạc cá nhân là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192245
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、足りるが 重要です。',
    example_reading = 'せんもんかの いけんによると、たりるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đủ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192246
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、使用（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しよう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, việc sử dụng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192247
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、船旅が 重要です。',
    example_reading = 'せんもんかの いけんによると、ふなたびが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, du lịch tàu thủy là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192248
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、時差が 重要です。',
    example_reading = 'せんもんかの いけんによると、じさが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chênh lệch múi giờ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192249
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、両替（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、りょうがえ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự đổi tiền là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192250
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、来日（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、らいにち（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đến Nhật Bản là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192251
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、競争（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、きょうそう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự cạnh tranh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192252
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、活躍（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かつやく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hoạt động tích cực là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192253
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、打つが 重要です。',
    example_reading = 'せんもんかの いけんによると、うつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đánh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192254
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、前半が 重要です。',
    example_reading = 'せんもんかの いけんによると、ぜんはんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hiệp đầu, nửa đầu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192255
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、引き分けが 重要です。',
    example_reading = 'せんもんかの いけんによると、ひきわけが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hòa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192256
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、運動会が 重要です。',
    example_reading = 'せんもんかの いけんによると、うんどうかいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày hội thể thao là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192257
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、大声が 重要です。',
    example_reading = 'せんもんかの いけんによると、おおごえが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tiếng to, hô to, hò hét là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192258
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、思い切りが 重要です。',
    example_reading = 'せんもんかの いけんによると、おもいきりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hết sức, hết mình là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192259
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、拍手（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、はくしゅ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vỗ tay là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192260
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、握手（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、あくしゅ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bắt tay là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192261
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、惜しいが 重要です。',
    example_reading = 'せんもんかの いけんによると、おしいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tiếc, đáng tiếc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192262
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、体操（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、たいそう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thể dục là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192263
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、日課が 重要です。',
    example_reading = 'せんもんかの いけんによると、にっかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, việc thường làm hàng ngày là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192264
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、引退（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、いんたい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự giải nghệ, rút lui là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192265
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、水着が 重要です。',
    example_reading = 'せんもんかの いけんによると、みずぎが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, quần áo tắm, quần áo bơi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192266
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、好むが 重要です。',
    example_reading = 'せんもんかの いけんによると、このむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thích, chuộng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192267
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、好みが 重要です。',
    example_reading = 'せんもんかの いけんによると、このみが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sở thích, gu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192268
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、流行（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、りゅうこう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự thịnh hành, lưu hành, mốt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192269
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、探すが 重要です。',
    example_reading = 'せんもんかの いけんによると、さがすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tìm, tìm kiếm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192270
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、似合うが 重要です。',
    example_reading = 'せんもんかの いけんによると、にあうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hợp, phù hợp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192271
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では高級（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは こうきゅう（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự cao cấp (cao cấp) thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192272
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、本物が 重要です。',
    example_reading = 'せんもんかの いけんによると、ほんものが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đồ thật, hàng thật là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192273
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、にせ物が 重要です。',
    example_reading = 'せんもんかの いけんによると、にせものが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hàng giả là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192274
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、保証（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ほしょう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự bảo đảm, bảo hành là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192275
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、取り替えるが 重要です。',
    example_reading = 'せんもんかの いけんによると、とりかえるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thay, đổi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192276
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、外すが 重要です。',
    example_reading = 'せんもんかの いけんによると、はずすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tháo, rời là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192277
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、染めるが 重要です。',
    example_reading = 'せんもんかの いけんによると、そめるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nhuộm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192278
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、夏物が 重要です。',
    example_reading = 'せんもんかの いけんによると、なつものが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đồ mùa hè là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192279
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、冬物が 重要です。',
    example_reading = 'せんもんかの いけんによると、ふゆものが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đồ mùa đông là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192280
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、上着が 重要です。',
    example_reading = 'せんもんかの いけんによると、うわぎが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, áo khoác là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192281
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、婦人服が 重要です。',
    example_reading = 'せんもんかの いけんによると、ふじんふくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, quần áo nữ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192282
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、紳士服が 重要です。',
    example_reading = 'せんもんかの いけんによると、しんしふくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, quần áo nam là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192283
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、宝石が 重要です。',
    example_reading = 'せんもんかの いけんによると、ほうせきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đá quý là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192284
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、手袋が 重要です。',
    example_reading = 'せんもんかの いけんによると、てぶくろが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, găng tay là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192285
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面ではお化粧（する）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは おけしょう（する）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ trang điểm thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192286
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、口紅が 重要です。',
    example_reading = 'せんもんかの いけんによると、くちべにが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, son môi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192287
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、まつ毛が 重要です。',
    example_reading = 'せんもんかの いけんによると、まつげが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lông mi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192288
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、香水が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうすいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nước hoa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192289
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、古着が 重要です。',
    example_reading = 'せんもんかの いけんによると、ふるぎが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, quần áo cũ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192290
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、革が 重要です。',
    example_reading = 'せんもんかの いけんによると、かわが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, da là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192291
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、気に入るが 重要です。',
    example_reading = 'せんもんかの いけんによると、きにいるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thích, ưa thích là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192292
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、お気に入りが 重要です。',
    example_reading = 'せんもんかの いけんによると、おきにいりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đồ yêu thích, người yêu thích là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192293
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、芸術が 重要です。',
    example_reading = 'せんもんかの いけんによると、げいじゅつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nghệ thuật là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192294
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、絵画が 重要です。',
    example_reading = 'せんもんかの いけんによると、かいがが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hội họa, tranh vẽ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192295
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、才能が 重要です。',
    example_reading = 'せんもんかの いけんによると、さいのうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tài năng, năng khiếu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192296
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、読書（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、どくしょ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, việc đọc sách là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192297
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、名作が 重要です。',
    example_reading = 'せんもんかの いけんによると、めいさくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tác phẩm nổi tiếng, kiệt tác là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192298
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、登場（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、とうじょう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự xuất hiện, sự ra mắt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192299
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、好奇心が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうきしんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự tò mò, lòng hiếu kỳ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192300
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、出品（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゅっぴん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đưa tác phẩm đi dự thi, trưng bày là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192301
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、演奏（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、えんそう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự biểu diễn âm nhạc, sự trình tấu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192302
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、講演会が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうえんかいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, buổi diễn thuyết, buổi thuyết trình là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192303
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '健康診断で 身長と 体重を 測定しました。',
    example_reading = 'けんこうしんだんで しんちょうと たいじゅうを そくていしました。',
    example_vi = 'Tại buổi khám sức khỏe tôi đã đo chiều cao và cân nặng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192304
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '一年間で 子どもの 身長が ぐんぐん 伸びました。',
    example_reading = 'いちねんかんで こどもの しんちょうが ぐんぐん のびました。',
    example_vi = 'Trong một năm chiều cao của em bé đã tăng lên nhanh chóng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192305
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '体調が 悪いので 体温計で 体温を 測ります。',
    example_reading = 'たいちょうが わるいので たいおんけいで たいおんを はかります。',
    example_vi = 'Vì trong người mệt nên tôi dùng nhiệt kế đo thân nhiệt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192306
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、体重が 重要です。',
    example_reading = 'せんもんかの いけんによると、たいじゅうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cân nặng, thể trọng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192307
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'お風呂上がりに 体重計に 乗って 体重を 測ります。',
    example_reading = 'おふろあがりに たいじゅうけいに のって たいじゅうを はかります。',
    example_vi = 'Sau khi tắm xong, tôi leo lên cân để đo cân nặng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192308
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、体温が 重要です。',
    example_reading = 'せんもんかの いけんによると、たいおんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thân nhiệt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192309
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、額が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひたいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trán là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192310
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、血液が 重要です。',
    example_reading = 'せんもんかの いけんによると、けつえきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, máu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192311
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、血液型が 重要です。',
    example_reading = 'せんもんかの いけんによると、けつえきがたが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nhóm máu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192312
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、心臓が 重要です。',
    example_reading = 'せんもんかの いけんによると、しんぞうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tim là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192313
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、汗が 重要です。',
    example_reading = 'せんもんかの いけんによると、あせが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mồ hôi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192314
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、息が 重要です。',
    example_reading = 'せんもんかの いけんによると、いきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hơi thở là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192315
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、ため息が 重要です。',
    example_reading = 'せんもんかの いけんによると、ためいきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thở dài là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192316
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、皮ふが 重要です。',
    example_reading = 'せんもんかの いけんによると、ひふが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, da là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192317
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、顔色が 重要です。',
    example_reading = 'せんもんかの いけんによると、かおいろが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sắc mặt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192318
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、睡眠が 重要です。',
    example_reading = 'せんもんかの いけんによると、すいみんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, giấc ngủ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192319
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 丈夫な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても じょうぶな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất khỏe mạnh, bền chắc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192320
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、歯科医が 重要です。',
    example_reading = 'せんもんかの いけんによると、しかいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nha sĩ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192321
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、虫歯が 重要です。',
    example_reading = 'せんもんかの いけんによると、むしばが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, răng sâu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192322
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、裸が 重要です。',
    example_reading = 'せんもんかの いけんによると、はだかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trần truồng, khỏa thân là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192323
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、裸足が 重要です。',
    example_reading = 'せんもんかの いけんによると、はだしが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chân trần, chân đất là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192324
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、調子が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちょうしが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tình trạng, cảm giác là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192325
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 気になる 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても きになる ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất bận tâm.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192326
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、気にするが 重要です。',
    example_reading = 'せんもんかの いけんによると、きにするが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bận tâm, lo lắng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192327
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、白髪が 重要です。',
    example_reading = 'せんもんかの いけんによると、しらがが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tóc bạc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192328
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、抜くが 重要です。',
    example_reading = 'せんもんかの いけんによると、ぬくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nhổ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192329
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、生えるが 重要です。',
    example_reading = 'せんもんかの いけんによると、はえるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mọc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192330
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、日焼け（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひやけ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cháy nắng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192331
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、傷が 重要です。',
    example_reading = 'せんもんかの いけんによると、きずが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vết thương là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192332
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、酔っぱらうが 重要です。',
    example_reading = 'せんもんかの いけんによると、よっぱらうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, say, say rượu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192333
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、酔っぱらいが 重要です。',
    example_reading = 'せんもんかの いけんによると、よっぱらいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, kẻ say rượu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192334
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、控えるが 重要です。',
    example_reading = 'せんもんかの いけんによると、ひかえるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hạn chế, kiêng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192335
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、花粉症が 重要です。',
    example_reading = 'せんもんかの いけんによると、かふんしょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dị ứng phấn hoa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192336
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、手洗いが 重要です。',
    example_reading = 'せんもんかの いけんによると、てあらいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, rửa tay là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192337
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、鼻水が 重要です。',
    example_reading = 'せんもんかの いけんによると、はなみずが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nước mũi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192338
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '日常生活の中で（肩が）こる習慣を身につけています。',
    example_reading = 'にちじょうせいかつの なかで （かたが）こる しゅうかんを みにつけています。',
    example_vi = 'Trong cuộc sống hàng ngày, tôi rèn luyện thói quen (vai) đau mỏi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192339
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '水泳を 始めてから 肩こりが 治りました。',
    example_reading = 'すいえいを はじめてから かたこりが なおりました。',
    example_vi = 'Từ khi bắt đầu bơi lội, chứng mỏi vai của tôi đã khỏi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192340
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '薬を 飲んだら、虫歯の 痛みが 和らぎました。',
    example_reading = 'くすりを のんだら、むしばの いたみが やわらぎました。',
    example_vi = 'Uống thuốc xong, cơn đau răng sâu đã dịu đi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192341
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ひどい 頭痛が するので、少し 休ませて ください。',
    example_reading = 'ひどい ずつうが するので、すこし やすませて ください。',
    example_vi = 'Tôi bị đau đầu dữ dội nên xin phép nghỉ ngơi một chút.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192342
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '冷たい 物を 飲みすぎて 腹痛を 起こしました。',
    example_reading = 'つめたい ものを のみすぎて ふくつうを おこしました。',
    example_vi = 'Uống quá nhiều đồ lạnh nên tôi bị đau bụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192343
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では異常（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは いじょう（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự bất thường (bất thường) thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192344
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、吐くが 重要です。',
    example_reading = 'せんもんかの いけんによると、はくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nôn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192345
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'バスに 酔って 吐き気が します。',
    example_reading = 'ばすに よって はきけが します。',
    example_vi = 'Tôi bị say xe bus nên thấy buồn nôn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192346
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、（痛みが）とれるが 重要です。',
    example_reading = 'せんもんかの いけんによると、（いたみが）とれるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hết là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192347
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、苦しむが 重要です。',
    example_reading = 'せんもんかの いけんによると、くるしむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khổ sở, chịu đựng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192348
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、部分が 重要です。',
    example_reading = 'せんもんかの いけんによると、ぶぶんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bộ phận, phần là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192349
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、骨折（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、こっせつ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, gãy xương là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192350
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '医師は 患者の 質問に 丁寧に 答えました。',
    example_reading = 'いしは かんじゃの しつもんに ていねいに こたえました。',
    example_vi = 'Bác sĩ đã trả lời lịch sự các câu hỏi của bệnh nhân.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192351
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、診察（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しんさつ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khám là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192352
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、検査（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、けんさ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, xét nghiệm, kiểm tra là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192353
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、治療（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちりょう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, điều trị, chữa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192354
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '年に 1回 会社で 健康診断を 受けて います。',
    example_reading = 'ねんに いっかい かいしゃで けんこうしんだんを うけて います。',
    example_vi = 'Mỗi năm một lần tôi đều khám sức khỏe định kỳ ở công ty.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192355
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、内科が 重要です。',
    example_reading = 'せんもんかの いけんによると、ないかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khoa nội, nội khoa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192356
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、外科が 重要です。',
    example_reading = 'せんもんかの いけんによると、げかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khoa ngoại, ngoại khoa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192357
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、小児科が 重要です。',
    example_reading = 'せんもんかの いけんによると、しょうにかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khoa nhi, nhi khoa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192358
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、保険が 重要です。',
    example_reading = 'せんもんかの いけんによると、ほけんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bảo hiểm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192359
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、保険証が 重要です。',
    example_reading = 'せんもんかの いけんによると、ほけんしょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thẻ bảo hiểm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192360
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、効くが 重要です。',
    example_reading = 'せんもんかの いけんによると、きくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, có tác dụng, có hiệu quả là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192361
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、注射（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちゅうしゃ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tiêm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192362
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、栄養が 重要です。',
    example_reading = 'せんもんかの いけんによると、えいようが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dinh dưỡng, bổ dưỡng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192363
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、回復（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かいふく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hồi phục là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192364
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、証明（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しょうめい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự chứng minh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192365
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、手術（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゅじゅつ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phẫu thuật, mổ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192366
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、包帯が 重要です。',
    example_reading = 'せんもんかの いけんによると、ほうたいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, băng bó là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192367
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、巻くが 重要です。',
    example_reading = 'せんもんかの いけんによると、まくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, quấn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192368
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、長生き（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ながいき（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự sống lâu là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192369
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では豊かなという言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは ゆたかなという ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ phong phú, giàu có thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192370
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '地球の 限られた 資源を 大切に 使わなければ なりません。',
    example_reading = 'ちきゅうの かぎられた しげんを たいせつに つかわなければ なりません。',
    example_vi = 'Chúng ta phải sử dụng tiết kiệm nguồn tài nguyên có hạn của trái đất.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192371
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'スーパーには 様々な 種類の 果物が 並んで います。',
    example_reading = 'すーぱーには さまざまな しゅるいの くだものが ならんで います。',
    example_vi = 'Ở siêu thị trưng bày nhiều loại hoa quả đa dạng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192372
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、枯れるが 重要です。',
    example_reading = 'せんもんかの いけんによると、かれるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, héo, tàn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192373
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、散るが 重要です。',
    example_reading = 'せんもんかの いけんによると、ちるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, rơi, rụng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192374
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、草が 重要です。',
    example_reading = 'せんもんかの いけんによると、くさが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cỏ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192375
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、種が 重要です。',
    example_reading = 'せんもんかの いけんによると、たねが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hạt, hạt giống là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192376
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、浮かぶが 重要です。',
    example_reading = 'せんもんかの いけんによると、うかぶが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nổi, trôi; nảy ra là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192377
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、太陽が 重要です。',
    example_reading = 'せんもんかの いけんによると、たいようが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mặt trời là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192378
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、現れるが 重要です。',
    example_reading = 'せんもんかの いけんによると、あらわれるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, xuất hiện là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192379
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、沈むが 重要です。',
    example_reading = 'せんもんかの いけんによると、しずむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chìm, lặn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192380
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、薄暗いが 重要です。',
    example_reading = 'せんもんかの いけんによると、うすぐらいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tối mờ, nhập nhoạng tối là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192381
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、穴が 重要です。',
    example_reading = 'せんもんかの いけんによると、あなが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lỗ, hang, hố là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192382
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、土が 重要です。',
    example_reading = 'せんもんかの いけんによると、つちが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đất là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192383
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、岩が 重要です。',
    example_reading = 'せんもんかの いけんによると、いわが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tảng đá, đá là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192384
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、丘が 重要です。',
    example_reading = 'せんもんかの いけんによると、おかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đồi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192385
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、火山が 重要です。',
    example_reading = 'せんもんかの いけんによると、かざんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, núi lửa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192386
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、想像（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、そうぞう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự tưởng tượng, tưởng tượng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192387
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、見上げるが 重要です。',
    example_reading = 'せんもんかの いけんによると、みあげるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngước nhìn lên là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192388
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、見下ろすが 重要です。',
    example_reading = 'せんもんかの いけんによると、みおろすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nhìn xuống là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192389
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、予想（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、よそう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dự đoán là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192390
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、予報（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、よほう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dự báo là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192391
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、湿度が 重要です。',
    example_reading = 'せんもんかの いけんによると、しつどが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, độ ẩm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192392
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、湿気が 重要です。',
    example_reading = 'せんもんかの いけんによると、しっけが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hơi ẩm, độ ẩm, ẩm ướt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192393
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、嵐が 重要です。',
    example_reading = 'せんもんかの いけんによると、あらしが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bão, giông tố là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192394
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、強風が 重要です。',
    example_reading = 'せんもんかの いけんによると、きょうふうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, gió to, gió mạnh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192395
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、大雨が 重要です。',
    example_reading = 'せんもんかの いけんによると、おおあめが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mưa to là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192396
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、折りたたみ傘が 重要です。',
    example_reading = 'せんもんかの いけんによると、おりたたみがさが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, O gấp, dù xếp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192397
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、（傘を）さすが 重要です。',
    example_reading = 'せんもんかの いけんによると、（かさを）さすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, che, giương là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192398
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、にわか雨が 重要です。',
    example_reading = 'せんもんかの いけんによると、にわかあめが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mưa rào là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192399
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、突然が 重要です。',
    example_reading = 'せんもんかの いけんによると、とつぜんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bỗng nhiên, đột nhiên là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192400
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、あっという間が 重要です。',
    example_reading = 'せんもんかの いけんによると、あっというまが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chẳng mấy chốc, loáng một cái là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192401
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、止むが 重要です。',
    example_reading = 'せんもんかの いけんによると、やむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tạnh, ngớt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192402
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、積もるが 重要です。',
    example_reading = 'せんもんかの いけんによると、つもるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tích tụ, chất đống, phủ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192403
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、快晴が 重要です。',
    example_reading = 'せんもんかの いけんによると、かいせいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trời trong xanh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192404
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、当たるが 重要です。',
    example_reading = 'せんもんかの いけんによると、あたるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trúng, đúng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192405
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、蒸し暑いが 重要です。',
    example_reading = 'せんもんかの いけんによると、むしあついが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nóng ẩm, oi bức là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192406
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、温度計が 重要です。',
    example_reading = 'せんもんかの いけんによると、おんどけいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nhiệt kế là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192407
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、凍るが 重要です。',
    example_reading = 'せんもんかの いけんによると、こおるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đóng băng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192408
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、氷が 重要です。',
    example_reading = 'せんもんかの いけんによると、こおりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, băng, đá là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192409
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、冷えるが 重要です。',
    example_reading = 'せんもんかの いけんによると、ひえるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lạnh, cóng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192410
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 非常な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても ひじょうな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất phi thường, rất, cực kỳ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192411
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、夏日が 重要です。',
    example_reading = 'せんもんかの いけんによると、なつびが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày hè nhiệt độ trên 25 độ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192412
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、真夏日が 重要です。',
    example_reading = 'せんもんかの いけんによると、まなつびが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày hè nóng trên 30 độ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192413
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、猛暑日が 重要です。',
    example_reading = 'せんもんかの いけんによると、もうしょびが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày hè cực nóng trên 35 độ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192414
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、冬日が 重要です。',
    example_reading = 'せんもんかの いけんによると、ふゆびが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày đông nhiệt độ thấp nhất dưới 0 độ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192415
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、真冬日が 重要です。',
    example_reading = 'せんもんかの いけんによると、まふゆびが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày đông hàn nhiệt độ cao nhất dưới 0 độ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192416
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、暖冬が 重要です。',
    example_reading = 'せんもんかの いけんによると、だんとうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mùa đông ấm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192417
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、冷夏が 重要です。',
    example_reading = 'せんもんかの いけんによると、れいかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mùa hè mát là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192418
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、状態が 重要です。',
    example_reading = 'せんもんかの いけんによると、じょうたいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trạng thái, tình trạng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192419
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '計画に 基づいて 変化（する）を 進めて います。',
    example_reading = 'けいかくに もとづいて へんか（する）を すすめて います。',
    example_vi = 'Dựa trên kế hoạch, chúng tôi đang tiến hành sự thay đổi, sự biến đổi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192420
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、一定（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、いってい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cố định, nhất định, ổn định là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192421
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、観察（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かんさつ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự quan sát là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192422
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、次第にが 重要です。',
    example_reading = 'せんもんかの いけんによると、しだいにが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dần dần là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192423
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、一気にが 重要です。',
    example_reading = 'せんもんかの いけんによると、いっきにが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, một mạch, một lèo là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192424
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、一度にが 重要です。',
    example_reading = 'せんもんかの いけんによると、いちどにが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cùng một lúc, đồng loạt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192425
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、いつの間にかが 重要です。',
    example_reading = 'せんもんかの いけんによると、いつのまにかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lúc nào không hay là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192426
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、温暖化が 重要です。',
    example_reading = 'せんもんかの いけんによると、おんだんかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự nóng lên toàn cầu, hiện tượng ấm dần là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192427
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 変な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても へんな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất lạ, kỳ lạ, bất thường.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192428
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、祝日が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゅくじつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày nghỉ lễ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192429
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、年末年始が 重要です。',
    example_reading = 'せんもんかの いけんによると、ねんまつねんしが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cuối năm đầu năm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192430
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、元日が 重要です。',
    example_reading = 'せんもんかの いけんによると、がんじつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày mùng một tết là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192431
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、迎えるが 重要です。',
    example_reading = 'せんもんかの いけんによると、むかえるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đón, chào đón là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192432
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、年賀状が 重要です。',
    example_reading = 'せんもんかの いけんによると、ねんがじょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thiếp chúc mừng năm mới là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192433
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、お年玉が 重要です。',
    example_reading = 'せんもんかの いけんによると、おとしだまが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tiền mừng tuổi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192434
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、成人の日が 重要です。',
    example_reading = 'せんもんかの いけんによると、せいじんのひが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày lễ thành nhân là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192435
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても ひな祭り 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても ひなまつり ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất lễ hội búp bê hina.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192436
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、子どもの日が 重要です。',
    example_reading = 'せんもんかの いけんによると、こどものひが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày trẻ em là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192437
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、母の日が 重要です。',
    example_reading = 'せんもんかの いけんによると、ははのひが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày của mẹ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192438
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、父の日が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちちのひが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày của bố là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192439
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、海の日が 重要です。',
    example_reading = 'せんもんかの いけんによると、うみのひが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày của biển là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192440
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、敬老の日が 重要です。',
    example_reading = 'せんもんかの いけんによると、けいろうのひが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày kính lão là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192441
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、体育の日が 重要です。',
    example_reading = 'せんもんかの いけんによると、たいいくのひが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngày thể dục thể thao là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192442
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、七五三が 重要です。',
    example_reading = 'せんもんかの いけんによると、しちごさんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lễ thất ngũ tam là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192443
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、大みそかが 重要です。',
    example_reading = 'せんもんかの いけんによると、おおみそかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đêm giao thừa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192444
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '彼の 熱意が 相手に しっかり 伝わりました。',
    example_reading = 'かれの ねついがあ あいてに しっかり つたわりました。',
    example_vi = 'Sự nhiệt huyết của anh ấy đã truyền tới đối phương một cách rõ ràng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192445
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '新聞で 新しい エネルギー技術に関する 記事を 読みました。',
    example_reading = 'しんぶんで あたらしい えねるぎーぎじゅつにかんする きじを よみました。',
    example_vi = 'Tôi đã đọc một bài báo liên quan đến công nghệ năng lượng mới trên tờ báo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192446
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '電車の 中で 周囲の 人が 週刊誌を 読んで いました。',
    example_reading = 'でんしゃの なかで しゅういの ひとが しゅうかんしを よんで いました。',
    example_vi = 'Trên tàu điện những người xung quanh đang đọc tuần báo.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192447
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、政治家が 重要です。',
    example_reading = 'せんもんかの いけんによると、せいじかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chính trị gia là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192448
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、政府が 重要です。',
    example_reading = 'せんもんかの いけんによると、せいふが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chính phủ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192449
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、市民が 重要です。',
    example_reading = 'せんもんかの いけんによると、しみんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, người dân, công dân là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192450
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '新しい 立場は とても きれいで 広いです。',
    example_reading = 'あたらしい たちばは とても きれいで ひろいです。',
    example_vi = 'Lập trường, vị trí mới rất đẹp và rộng rãi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192451
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、世の中が 重要です。',
    example_reading = 'せんもんかの いけんによると、よのなかが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thế gian, xã hội là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192452
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 重大な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても じゅうだいな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất rất quan trọng, trọng đại.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192453
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 重要な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても じゅうような ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192454
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、大してが 重要です。',
    example_reading = 'せんもんかの いけんによると、たいしてが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, không ... lắm, không ... mấy là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192455
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、司会者が 重要です。',
    example_reading = 'せんもんかの いけんによると、しかいしゃが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, người dẫn chương trình, MC là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192456
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、生放送が 重要です。',
    example_reading = 'せんもんかの いけんによると、なまほうそうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, truyền hình trực tiếp, phát sóng trực tiếp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192457
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、商品が 重要です。',
    example_reading = 'せんもんかの いけんによると、しょうひんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sản phẩm, hàng hóa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192458
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '計画に 基づいて 発売（する）を 進めて います。',
    example_reading = 'けいかくに もとづいて はつばい（する）を すすめて います。',
    example_vi = 'Dựa trên kế hoạch, chúng tôi đang tiến hành bán ra, bắt đầu bán, phát hành.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192459
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、評判が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひょうばんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, danh tiếng, tiếng tăm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192460
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、注目（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ちゅうもく（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chú ý, dồn sự chú ý là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192461
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、結局が 重要です。',
    example_reading = 'せんもんかの いけんによると、けっきょくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, kết cục, cuối cùng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192462
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、怪しいが 重要です。',
    example_reading = 'せんもんかの いけんによると、あやしいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khả nghi, đáng ngờ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192463
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、恐ろしいが 重要です。',
    example_reading = 'せんもんかの いけんによると、おそろしいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đáng sợ, khủng khiếp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192464
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、暴れるが 重要です。',
    example_reading = 'せんもんかの いけんによると、あばれるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đập phá, quậy phá là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192465
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、争うが 重要です。',
    example_reading = 'せんもんかの いけんによると、あらそうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tranh cãi, đấu tranh, tranh giành là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192466
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、犯罪が 重要です。',
    example_reading = 'せんもんかの いけんによると、はんざいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tội phạm, tội ác là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192467
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、発見者が 重要です。',
    example_reading = 'せんもんかの いけんによると、はっけんしゃが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, người phát hiện là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192468
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、疑うが 重要です。',
    example_reading = 'せんもんかの いけんによると、うたがうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nghi ngờ, hoài nghi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192469
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、犯人が 重要です。',
    example_reading = 'せんもんかの いけんによると、はんにんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phạm nhân, thủ phạm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192470
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、盗むが 重要です。',
    example_reading = 'せんもんかの いけんによると、ぬすむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ăn trộm, ăn cắp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192471
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、捜すが 重要です。',
    example_reading = 'せんもんかの いけんによると、さがすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tìm kiếm, lùng tìm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192472
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、追うが 重要です。',
    example_reading = 'せんもんかの いけんによると、おうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đuổi theo, truy đuổi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192473
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、捕まえるが 重要です。',
    example_reading = 'せんもんかの いけんによると、つかまえるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bắt, tóm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192474
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、捕まるが 重要です。',
    example_reading = 'せんもんかの いけんによると、つかまるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bị bắt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192475
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、逮捕（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、たいほ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bắt giữ, bắt giam là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192476
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、気味が悪いが 重要です。',
    example_reading = 'せんもんかの いけんによると、きみがわるいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, rùng rợn, cảm thấy ghê ghê là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192477
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、（事故に）あうが 重要です。',
    example_reading = 'せんもんかの いけんによると、（じこに）あうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, gặp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192478
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、発生（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、はっせい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phát sinh, xảy ra là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192479
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、命が 重要です。',
    example_reading = 'せんもんかの いけんによると、いのちが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mạng sống, tính mạng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192480
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、救うが 重要です。',
    example_reading = 'せんもんかの いけんによると、すくうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cứu, cứu giúp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192481
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '新しい 現場は とても きれいで 広いです。',
    example_reading = 'あたらしい げんばは とても きれいで ひろいです。',
    example_vi = 'Hiện trường, công trường mới rất đẹp và rộng rãi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192482
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、混乱（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、こんらん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự hỗn loạn, náo loạn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192483
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では無事（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは ぶじ（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự an toàn, bình an vô sự (an toàn, bình an) thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192484
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、防ぐが 重要です。',
    example_reading = 'せんもんかの いけんによると、ふせぐが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngăn chặn, phòng ngừa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192485
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、再びが 重要です。',
    example_reading = 'せんもんかの いけんによると、ふたたびが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lại, một lần nữa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192486
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、被害者が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひがいしゃが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nạn nhân, người bị hại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192487
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面ではお互いにという言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは おたがいにという ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ lẫn nhau, với nhau thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192488
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、疑問が 重要です。',
    example_reading = 'せんもんかの いけんによると、ぎもんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nghi vấn, thắc mắc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192489
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、飛び込むが 重要です。',
    example_reading = 'せんもんかの いけんによると、とびこむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nhảy vào, lao vào là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192490
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、飛び出すが 重要です。',
    example_reading = 'せんもんかの いけんによると、とびだすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lao ra, nhảy ra là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192491
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、行方不明が 重要です。',
    example_reading = 'せんもんかの いけんによると、ゆくえふめいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mất tích là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192492
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 亡くなる 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても なくなる ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất qua đời, mất.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192493
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、偶然が 重要です。',
    example_reading = 'せんもんかの いけんによると、ぐうぜんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngẫu nhiên, tình cờ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192494
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、苦情が 重要です。',
    example_reading = 'せんもんかの いけんによると、くじょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, kêu ca, phàn nàn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192495
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、迷子が 重要です。',
    example_reading = 'せんもんかの いけんによると、まいごが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trẻ lạc, sự đi lạc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192496
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '新しい 場合は とても きれいで 広いです。',
    example_reading = 'あたらしい ばあいは とても きれいで ひろいです。',
    example_vi = 'Trường hợp mới rất đẹp và rộng rãi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192497
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、落とすが 重要です。',
    example_reading = 'せんもんかの いけんによると、おとすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đánh rơi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192498
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、借金（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゃっきん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự vay tiền, tiền nợ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192499
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '日常生活の中で倒れる習慣を身につけています。',
    example_reading = 'にちじょうせいかつの なかで たおれる しゅうかんを みにつけています。',
    example_vi = 'Trong cuộc sống hàng ngày, tôi rèn luyện thói quen đổ, ngã quỵ, đổ bệnh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192500
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、転ぶが 重要です。',
    example_reading = 'せんもんかの いけんによると、ころぶが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bị ngã, vấp ngã là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192501
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、（会社が）つぶれるが 重要です。',
    example_reading = 'せんもんかの いけんによると、（かいしゃが）つぶれるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bị dập nát; bị phá sản là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192502
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では次々とという言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは つぎつぎ とという ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ liên tiếp, lần lượt thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192503
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、停電（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ていでん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự mất điện, cúp điện là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192504
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、断水（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、だんすい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự mất nước, cúp nước là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192505
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、非常口が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひじょうぐちが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lối thoát hiểm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192506
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '計画に 基づいて 増加（する）を 進めて います。',
    example_reading = 'けいかくに もとづいて ぞうか（する）を すすめて います。',
    example_vi = 'Dựa trên kế hoạch, chúng tôi đang tiến hành sự gia tăng, tăng lên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192507
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '計画に 基づいて 減少（する）を 進めて います。',
    example_reading = 'けいかくに もとづいて げんしょう（する）を すすめて います。',
    example_vi = 'Dựa trên kế hoạch, chúng tôi đang tiến hành sự giảm sút, giảm đi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192508
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、超えるが 重要です。',
    example_reading = 'せんもんかの いけんによると、こえるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vượt qua, vượt quá là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192509
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、越えるが 重要です。',
    example_reading = 'せんもんかの いけんによると、こえるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vượt qua, đi qua là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192510
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、全体が 重要です。',
    example_reading = 'せんもんかの いけんによると、ぜんたいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, toàn bộ, toàn thể là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192511
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、信用（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しんよう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự tin tưởng, tin dùng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192512
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、失うが 重要です。',
    example_reading = 'せんもんかの いけんによると、うしなうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đánh mất, mất đi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192513
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では正常（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは せいじょう（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ bình thường, chính thường thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192514
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では不景気（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは ふけいき（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ tình trạng kinh tế suy thoái, ế ẩm thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192515
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '計画に 基づいて 円高を 進めて います。',
    example_reading = 'けいかくに もとづいて えんだかを すすめて います。',
    example_vi = 'Dựa trên kế hoạch, chúng tôi đang tiến hành đồng yên tăng giá.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192516
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、平均（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、へいきん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, Trung bình, bình quân là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192517
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、最もが 重要です。',
    example_reading = 'せんもんかの いけんによると、もっともが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nhất, nhiều nhất là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192518
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、個性が 重要です。',
    example_reading = 'せんもんかの いけんによると、こせいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cá tính là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192519
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、働き者が 重要です。',
    example_reading = 'せんもんかの いけんによると、はたらきものが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, người chăm làm, người hay lam hay làm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192520
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では正直（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは しょうじき（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ thật thà, trung thực thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192521
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 素直な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても すなおな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất ngoan ngoãn, dễ bảo, thật thà.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192522
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 積極的な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても せっきょくてきな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất tích cực, chủ động.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192523
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 消極的な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても しょうきょくてきな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất thụ động, tiêu cực.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192524
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 人なつこい 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても ひとなつこい ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất dễ làm thân, dễ mến, thân thiện.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192525
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても のん気な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても のんきな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất ung dung, vô tư, đủng đỉnh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192526
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では意地悪（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは いじわる（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ ác ý, xấu tính, ý địa xấu thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192527
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では勝手（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは かって（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ tự tiện, tùy tiện thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192528
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、図々しいが 重要です。',
    example_reading = 'せんもんかの いけんによると、ずうずうしいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trơ trẽn, dày mặt, trâng tráo là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192529
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では生意気（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは なまいき（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ xấc láo, hỗn láo, hỗn xược thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192530
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、鋭いが 重要です。',
    example_reading = 'せんもんかの いけんによると、するどいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sắc, nhạy bén, tinh tường là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192531
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、鈍いが 重要です。',
    example_reading = 'せんもんかの いけんによると、にぶいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cùn, chậm chạp, đần độn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192532
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では単純（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは たんじゅん（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ đơn giản, chất phác thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192533
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、欠点が 重要です。',
    example_reading = 'せんもんかの いけんによると、けってんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khuyết điểm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192534
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 器用な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても きような ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất khéo léo, khéo tay.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192535
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、感情が 重要です。',
    example_reading = 'せんもんかの いけんによると、かんじょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cảm xúc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192536
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、落ち着くが 重要です。',
    example_reading = 'せんもんかの いけんによると、おちつくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bình tĩnh, bình yên là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192537
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、感激（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かんげき（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự cảm kích, xúc động sâu sắc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192538
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、感動（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かんどう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự cảm động là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192539
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、感心（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かんしん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự cảm phục, khâm phục là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192540
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 気軽な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても きがるな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất thoải mái, không dè dặt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192541
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 気楽な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても きらくな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất thoải mái, thanh thản.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192542
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では幸せ（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは しあわせ（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ hạnh phúc thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192543
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、冗談が 重要です。',
    example_reading = 'せんもんかの いけんによると、じょうだんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đùa, nói đùa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192544
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、愛するが 重要です。',
    example_reading = 'せんもんかの いけんによると、あいするが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, yêu, yêu thương là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192545
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 真剣な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても しんけんな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất nghiêm túc, chân thành.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192546
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では夢中（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは むちゅう（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ say mê, say sưa, mải mê thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192547
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、勇気が 重要です。',
    example_reading = 'せんもんかの いけんによると、ゆうきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lòng dũng cảm, can đảm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192548
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、嫌がるが 重要です。',
    example_reading = 'せんもんかの いけんによると、いやがるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tỏ ra ghét, miễn cưỡng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192549
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、落ち込むが 重要です。',
    example_reading = 'せんもんかの いけんによると、おちこむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, buồn, thất vọng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192550
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '日常生活の中で悲しむ習慣を身につけています。',
    example_reading = 'にちじょうせいかつの なかで かなしむ しゅうかんを みにつけています。',
    example_vi = 'Trong cuộc sống hàng ngày, tôi rèn luyện thói quen đau buồn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192551
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 気の毒な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても きのどくな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất tội nghiệp, đáng thương.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192552
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、恐怖が 重要です。',
    example_reading = 'せんもんかの いけんによると、きょうふが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nỗi sợ hãi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192553
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、後悔（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうかい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự hối hận, ân hận là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192554
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、悩むが 重要です。',
    example_reading = 'せんもんかの いけんによると、なやむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trăn trở, phiền muộn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192555
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、悩みが 重要です。',
    example_reading = 'せんもんかの いけんによると、なやみが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, điều trăn trở, nỗi lo là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192556
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では不安（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは ふあん（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự bất an (bất an, lo lắng) thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192557
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、迷惑（な/する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、めいわく（な/する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự phiền phức, phiền toái là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192558
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では面倒（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは めんどう（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự chăm sóc, trông nom, sự phiền phức, khó khăn (phiền) thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192559
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、面倒くさいが 重要です。',
    example_reading = 'せんもんかの いけんによると、めんどうくさいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phiền phức, ngại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192560
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、心からが 重要です。',
    example_reading = 'せんもんかの いけんによると、こころからが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tự đáy lòng, chân thành là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192561
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、祈るが 重要です。',
    example_reading = 'せんもんかの いけんによると、いのるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cầu nguyện, cầu mong là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192562
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、希望（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、きぼう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hy vọng, mong muốn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192563
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、願うが 重要です。',
    example_reading = 'せんもんかの いけんによると、ねがうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cầu mong, cầu nguyện là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192564
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、願いが 重要です。',
    example_reading = 'せんもんかの いけんによると、ねがいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lời cầu nguyện, điều ước là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192565
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、感じるが 重要です。',
    example_reading = 'せんもんかの いけんによると、かんじるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cảm nhận, cảm thấy là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192566
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、案外が 重要です。',
    example_reading = 'せんもんかの いけんによると、あんがいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, không ngờ, ngoài dự đoán là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192567
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、表現（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひょうげん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự diễn đạt, thể hiện, cách nói; diễn đạt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192568
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では表現（する）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは ひょうげん（する）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự diễn đạt, thể hiện, cách nói; diễn đạt thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192569
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、我慢（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、がまん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự chịu đựng, kiên nhẫn; chịu đựng, nhẫn nhịn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192570
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、自慢（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、じまん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự tự hào, hãnh diện; khoe khoang là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192571
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、関心が 重要です。',
    example_reading = 'せんもんかの いけんによると、かんしんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự quan tâm, mối quan tâm là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192572
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、機嫌が 重要です。',
    example_reading = 'せんもんかの いけんによると、きげんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tâm trạng, tính khí là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192573
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では平気（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは へいき（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ bình thản, không sao, không ngại thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192574
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では本気（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは ほんき（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự nghiêm túc, thật lòng; nghiêm túc, thật sự thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192575
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、迷うが 重要です。',
    example_reading = 'せんもんかの いけんによると、まようが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lạc; phân vân, do dự, lưỡng lự là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192576
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、迷いが 重要です。',
    example_reading = 'せんもんかの いけんによると、まよいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự phân vân, do dự, lưỡng lự là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192577
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 微妙な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても びみょうな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất tế nhị, khó nói, mơ hồ, khó tả.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192578
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、魅力が 重要です。',
    example_reading = 'せんもんかの いけんによると、みりょくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sức hấp dẫn, sức quyến rũ, vẻ thu hút là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192579
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、本音が 重要です。',
    example_reading = 'せんもんかの いけんによると、ほんねが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, suy nghĩ thực, lòng thật, tâm tư thật là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192580
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、涙が 重要です。',
    example_reading = 'せんもんかの いけんによると、なみだが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nước mắt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192581
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、憎むが 重要です。',
    example_reading = 'せんもんかの いけんによると、にくむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hận, căm ghét, thù ghét là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192582
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、模様が 重要です。',
    example_reading = 'せんもんかの いけんによると、もようが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hoa văn, họa tiết là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192583
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、特徴が 重要です。',
    example_reading = 'せんもんかの いけんによると、とくちょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đặc điểm, đặc trưng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192584
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、特色が 重要です。',
    example_reading = 'せんもんかの いけんによると、とくしょくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, điểm đặc sắc, nét riêng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192585
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、柄が 重要です。',
    example_reading = 'せんもんかの いけんによると、がらが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hoa văn, họa tiết là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192586
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、花柄が 重要です。',
    example_reading = 'せんもんかの いけんによると、はながらが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, họa tiết hoa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192587
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、水玉が 重要です。',
    example_reading = 'せんもんかの いけんによると、みずたまが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chấm bi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192588
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、横が 重要です。',
    example_reading = 'せんもんかの いけんによると、よこが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chiều ngang, bên cạnh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192589
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、幅が 重要です。',
    example_reading = 'せんもんかの いけんによると、はばが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bề ngang, chiều rộng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192590
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、無地が 重要です。',
    example_reading = 'せんもんかの いけんによると、むじが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trơn, không có họa tiết là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192591
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 真っ赤な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても まっかな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất đỏ rực, đỏ chót.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192592
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 素敵な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても すてきな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất tuyệt vời, đẹp, tuyệt.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192593
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、印象が 重要です。',
    example_reading = 'せんもんかの いけんによると、いんしょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ấn tượng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192594
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、外見が 重要です。',
    example_reading = 'せんもんかの いけんによると、がいけんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngoại hình, vẻ bề ngoài là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192595
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、様子が 重要です。',
    example_reading = 'せんもんかの いけんによると、ようすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tình hình, dáng vẻ, bộ dạng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192596
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、表情が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひょうじょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, biểu cảm, nét mặt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192597
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、姿が 重要です。',
    example_reading = 'せんもんかの いけんによると、すがたが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, dáng, bóng dáng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192598
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、雰囲気が 重要です。',
    example_reading = 'せんもんかの いけんによると、ふんいきが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bầu không khí, phong thái là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192599
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、幼いが 重要です。',
    example_reading = 'せんもんかの いけんによると、おさないが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thơ ấu, ngây thơ, trẻ con là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192600
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、言葉づかいが 重要です。',
    example_reading = 'せんもんかの いけんによると、ことばづかいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cách ăn nói, cách dùng từ ngữ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192601
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 上品な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても じょうひんな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất thanh lịch, nhã nhặn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192602
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 下品な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても げひんな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất thô tục, hạ lưu.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192603
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 地味な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても じみな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất giản dị, mộc mạc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192604
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 派手な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても はでな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất lòe loẹt, sặc sỡ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192605
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、美人が 重要です。',
    example_reading = 'せんもんかの いけんによると、びじんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, người đẹp, mỹ nhân là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192606
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では不思議（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは ふしぎ（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ kỳ lạ, huyền bí thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192607
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では普通（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは ふつう（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ bình thường, phổ thông thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192608
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、表面が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひょうめんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bề mặt, bề ngoài là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192609
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 立派な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても りっぱな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất hoành tráng, xuất sắc.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192610
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、目立つが 重要です。',
    example_reading = 'せんもんかの いけんによると、めだつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nổi bật là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192611
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 異なる 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても ことなる ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất khác, khác nhau.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192612
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、大型が 重要です。',
    example_reading = 'せんもんかの いけんによると、おおがたが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, cỡ lớn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192613
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では多め（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは おおめ（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ hơi nhiều (một chút) thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192614
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では大きめ（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは おおきめ（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ hơi to, hơi lớn (một chút) thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192615
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では太め（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは ふとめ（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ hơi dày, hơi rộng (một chút) thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192616
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では完ぺき（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは かんぺき（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ hoàn hảo, không thể chê vào đâu được thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192617
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、多少が 重要です。',
    example_reading = 'せんもんかの いけんによると、たしょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ít nhiều, đôi chút là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192618
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、縮むが 重要です。',
    example_reading = 'せんもんかの いけんによると、ちぢむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, bị co rút, co lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192619
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、現代が 重要です。',
    example_reading = 'せんもんかの いけんによると、げんだいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hiện đại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192620
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、現実が 重要です。',
    example_reading = 'せんもんかの いけんによると、げんじつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hiện thực là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192621
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、理想が 重要です。',
    example_reading = 'せんもんかの いけんによると、りそうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lý tưởng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192622
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 偉大な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても いだいな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất vĩ đại.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192623
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では当然（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは とうぜん（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ đương nhiên thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192624
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面では当たり前（な）という言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは あたりまえ（な）という ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ sự đương nhiên (đương nhiên) thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192625
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'ビジネスの場面ではお金持ちという言葉がよく使われます。',
    example_reading = 'ビジネスの ばめんでは おかねもちという ことばが よく つかわれます。',
    example_vi = 'Trong bối cảnh kinh doanh, từ ngữ người giàu, giàu thường được sử dụng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192626
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、貧しいが 重要です。',
    example_reading = 'せんもんかの いけんによると、まずしいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nghèo là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192627
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、貧乏（な/する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、びんぼう（な/する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự nghèo khổ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192628
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、発展（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、はってん（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự phát triển là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192629
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、進歩（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、しんぽ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự tiến bộ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192630
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 強力な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても きょうりょくな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất mạnh mẽ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192631
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、経つが 重要です。',
    example_reading = 'せんもんかの いけんによると、たつが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trôi qua là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192632
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、前後が 重要です。',
    example_reading = 'せんもんかの いけんによると、ぜんごが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, trước sau, khoảng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192633
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 盛んな 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても さかんな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất rầm rộ, thịnh vượng, phát triển.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192634
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、産業が 重要です。',
    example_reading = 'せんもんかの いけんによると、さんぎょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, ngành sản xuất, công nghiệp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192635
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、工業が 重要です。',
    example_reading = 'せんもんかの いけんによると、こうぎょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, công nghiệp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192636
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、商業が 重要です。',
    example_reading = 'せんもんかの いけんによると、しょうぎょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thương nghiệp, thương mại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192637
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、農業が 重要です。',
    example_reading = 'せんもんかの いけんによると、のうぎょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, nông nghiệp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192638
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、語るが 重要です。',
    example_reading = 'せんもんかの いけんによると、かたるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, kể, thuật lại là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192639
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、解消（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かいしょう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự giải quyết, giải tỏa là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192640
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、片方が 重要です。',
    example_reading = 'せんもんかの いけんによると、かたほうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, một bên, một phía là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192641
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、囲むが 重要です。',
    example_reading = 'せんもんかの いけんによると、かこむが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vây quanh, bao bọc là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192642
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、代わりが 重要です。',
    example_reading = 'せんもんかの いけんによると、かわりが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thay cho, thay thế là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192643
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、友好が 重要です。',
    example_reading = 'せんもんかの いけんによると、ゆうこうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tình hữu nghị là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192644
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、期待（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、きたい（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, kỳ vọng, mong đợi là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192645
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、区別（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、くべつ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự phân biệt, tách biệt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192646
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、差別（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、さべつ（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, sự phân biệt đối xử là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192647
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、限界が 重要です。',
    example_reading = 'せんもんかの いけんによると、げんかいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, giới hạn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192648
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、通じるが 重要です。',
    example_reading = 'せんもんかの いけんによると、つうじるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thông hiểu, giao tiếp được là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192649
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、首都が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゅとが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thủ đô là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192650
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても 順調な 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても じゅんちょうな ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất thuận lợi, suôn sẻ.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192651
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、対象が 重要です。',
    example_reading = 'せんもんかの いけんによると、たいしょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, đối tượng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192652
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、通知（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、つうち（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thông báo là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192653
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、態度が 重要です。',
    example_reading = 'せんもんかの いけんによると、たいどが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thái độ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192654
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、求めるが 重要です。',
    example_reading = 'せんもんかの いけんによると、もとめるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, yêu cầu, đòi hỏi, mong muốn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192655
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、結論が 重要です。',
    example_reading = 'せんもんかの いけんによると、けつろんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, kết luận là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192656
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、ひっくり返すが 重要です。',
    example_reading = 'せんもんかの いけんによると、ひっくりかえすが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lật ngược, đảo ngược là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192657
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、広がるが 重要です。',
    example_reading = 'せんもんかの いけんによると、ひろがるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lan rộng, mở rộng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192658
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、広げるが 重要です。',
    example_reading = 'せんもんかの いけんによると、ひろげるが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mở rộng, mở mang là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192659
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、活動（する）が 重要です。',
    example_reading = 'せんもんかの いけんによると、かつどう（する）が じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hoạt động là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 192660
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、会話が 重要です。',
    example_reading = 'せんもんかの いけんによると、かいわが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, hội thoại, trò chuyện là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194671
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'テニスの 試合で 強い 相手と 対戦しました。',
    example_reading = 'てにすの しあいで つよい あいてと たいせんしました。',
    example_vi = 'Trong trận thi đấu tennis, tôi đã đối đầu với đối thủ mạnh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194672
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、噂が 重要です。',
    example_reading = 'せんもんかの いけんによると、うわさが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tin đồn, lời đồn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194673
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、一言が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひとことが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, vài lời, một lời là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194674
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、話題が 重要です。',
    example_reading = 'せんもんかの いけんによると、わだいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chủ đề nói chuyện là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194675
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '親しい 友達にだけ 本音を 明かしました。',
    example_reading = 'したしい ともだちにだけ ほんねを あかしました。',
    example_vi = 'Tôi chỉ bộc lộ thâm tâm/thật lòng với bạn thân.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194676
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、建前が 重要です。',
    example_reading = 'せんもんかの いけんによると、たてまえが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lời nói xã giao, ngoài mặt là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194677
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 頷くを 行いました。',
    example_reading = 'みんなで きょうりょくして うなずくを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện gật đầu đồng ý.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194678
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 言い返すを 行いました。',
    example_reading = 'みんなで きょうりょくして いいかえすを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện nói đáp trả, cãi lại.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194679
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 黙るを 行いました。',
    example_reading = 'みんなで きょうりょくして だまるを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện im lặng, nín thinh.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194680
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、敬語が 重要です。',
    example_reading = 'せんもんかの いけんによると、けいごが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, kính ngữ là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194681
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、尊敬が 重要です。',
    example_reading = 'せんもんかの いけんによると、そんけいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tôn kính, kính trọng là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194682
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、謙譲が 重要です。',
    example_reading = 'せんもんかの いけんによると、けんじょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, khiêm nhường là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194683
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、丁寧が 重要です。',
    example_reading = 'せんもんかの いけんによると、ていねいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, lịch sự, cẩn thận là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194684
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 拝見するを 行いました。',
    example_reading = 'みんなで きょうりょくして はいけんするを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện xem, nhìn.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194685
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 伺うを 行いました。',
    example_reading = 'みんなで きょうりょくして うかがうを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện đến thăm, hỏi.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194686
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して 参るを 行いました。',
    example_reading = 'みんなで きょうりょくして まいるを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện đi, đến.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194687
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'みんなで 協力して おっしゃるを 行いました。',
    example_reading = 'みんなで きょうりょくして おっしゃるを おこないました。',
    example_vi = 'Mọi người đã hợp tác cùng nhau thực hiện nói.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194688
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても ご覧になる 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても ごらんになる ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất xem, nhìn (tôn kính).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194689
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = 'この 場所は とても なさる 雰囲気に 包まれて います。',
    example_reading = 'この ばしょは とても なさる ふんいきに つつまれて います。',
    example_vi = 'Nơi này bao trùm một bầu không khí rất làm (tôn kính).',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194690
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、総合が 重要です。',
    example_reading = 'せんもんかの いけんによると、そうごうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tổng hợp là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194691
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、要約が 重要です。',
    example_reading = 'せんもんかの いけんによると、ようやくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tóm tắt, tóm lược là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194692
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、判断が 重要です。',
    example_reading = 'せんもんかの いけんによると、はんだんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, phán đoán, đánh giá là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194693
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、証明が 重要です。',
    example_reading = 'せんもんかの いけんによると、しょうめいが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chứng minh là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194694
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、主張が 重要です。',
    example_reading = 'せんもんかの いけんによると、しゅちょうが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, chủ trương, ý kiến là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194695
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、矛盾が 重要です。',
    example_reading = 'せんもんかの いけんによると、むじゅんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, mâu thuẫn là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194696
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、必然が 重要です。',
    example_reading = 'せんもんかの いけんによると、ひつぜんが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, tất nhiên, dĩ nhiên là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194697
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '先生の 説明に 疑問を 抱きました。',
    example_reading = 'せんせいの せつめいに ぎもんを いだきました。',
    example_vi = 'Tôi nảy sinh nghi vấn đối với lời giải thích của giáo viên.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194698
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '専門家の 意見によると、納得が 重要です。',
    example_reading = 'せんもんかの いけんによると、なっとくが じゅうようです。',
    example_vi = 'Theo ý kiến của chuyên gia, thấu hiểu, chấp nhận là rất quan trọng.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194699
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);

UPDATE vocabulary
SET example_jp = '会議で 議論を 重ねて 結論を 出しました。',
    example_reading = 'かいぎで ぎろんを かさねて けつろんを だしました。',
    example_vi = 'Tại cuộc họp, qua nhiều đợt thảo luận chúng tôi đã đưa ra kết luận.',
    updated_at = CURRENT_TIMESTAMP
WHERE vocabulary_id = 194700
  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);
