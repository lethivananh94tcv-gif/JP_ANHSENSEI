-- V79: Supplement missing Minna no Nihongo N4 vocabulary items with authentic example sentences for Lessons 30, 31, 32
BEGIN;

-- Lesson 30 (N4 Lesson 30, l.sort_order = 5): Items 39 to 53
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('まだ', 'まだ', NULL, 'Phó từ', 'Chưa', 39, 'まだ宿題が終わっていません。', 'まだしゅくだいがおわっていません。', 'Tôi vẫn chưa làm xong bài tập về nhà.'),
  ('―ほど', '―ほど', NULL, 'Hậu tố', 'Chừng—', 40, 'ここから駅まで10分ほどかかります。', 'ここからえきまでじっぷんほどかかります。', 'Từ đây đến nhà ga mất khoảng 10 phút.'),
  ('予定表', 'よていひょう', '予定表', 'Danh từ', 'Thời khóa biểu', 41, '壁に今月の予定表が貼ってあります。', 'かべにこんげつのよていひょうがはってあります。', 'Trên tường có dán lịch trình của tháng này.'),
  ('ごくろうさま', 'ごくろうさま', NULL, 'Cụm từ', 'Anh, chị đã làm việc vất vả/cảm ơn anh, chị', 42, '今日もお仕事ごくろうさまでした。', 'きょうもおしごとごくろうさまでした。', 'Hôm nay anh/chị cũng đã làm việc vất vả rồi.'),
  ('希望', 'きぼう', '希望', 'Danh từ', 'Hi vọng, nguyện vọng', 43, '将来は日本で働くのが希望です。', 'しょうらいはにほんではたらくのがきぼうです。', 'Nguyện vọng của tôi trong tương lai là được làm việc tại Nhật Bản.'),
  ('何かご希望がありますか', 'なにかごきぼうがありますか', '何かご希望がありますか', 'Cụm từ', 'Anh/chị có nguyện vọng gì không?', 44, 'ホテルの部屋について、何かご希望がありますか。', 'ホテルのへやについて、なにかごきぼうがありますか。', 'Về phòng khách sạn, anh/chị có nguyện vọng gì đặc biệt không ạ?'),
  ('ミュージカル', 'ミュージカル', NULL, 'Danh từ', 'Ca kịch', 45, '来週の週末、友達とミュージカルを見に行きます。', 'らいしゅうのしゅうまつ、ともだちとミュージカルをみにいきます。', 'Cuối tuần sau tôi sẽ đi xem ca kịch với bạn.'),
  ('それはいいですな', 'それはいいですな', NULL, 'Cụm từ', 'Hay quá nhỉ', 46, 'みんなで温泉へ行くんですか。それはいいですな。', 'みんなでおんせんへいくんですか。それはいいですな。', 'Mọi người cùng đi suối nước nóng à? Thế thì hay quá nhỉ.'),
  ('丸い', 'まるい', '丸い', 'Tính từ i', 'Tròn', 47, 'この部屋には丸いテーブルが置いてあります。', 'このへやにはまるいテーブルがおいてあります。', 'Trong phòng này có đặt một chiếc bàn tròn.'),
  ('月', 'つき', '月', 'Danh từ', 'Mặt trăng', 48, '今夜は月がとても綺麗に見えます。', 'こんやはつきがとてもきれいにみえます。', 'Tối nay mặt trăng trông rất đẹp.'),
  ('地球', 'ちきゅう', '地球', 'Danh từ', 'Trái đất', 49, '地球環境を守るために、ゴミを減らしましょう。', 'ちきゅうかんきょうをまもるために、ゴミをへらしましょう。', 'Để bảo vệ môi trường Trái Đất, chúng ta hãy giảm thiểu rác thải.'),
  ('うれしい', 'うれしい', NULL, 'Tính từ i', 'Vui', 50, '試験に合格して、とてもうれしいです。', 'しけんにごうかくして、とてもうれしいです。', 'Đỗ kỳ thi nên tôi rất vui.'),
  ('嫌（な）', 'いや（な）', '嫌（な）', 'Tính từ na', 'Chán, ghét, không chấp nhận được', 51, '嫌なことがあっても、笑顔でがんばります。', 'いやなことがあっても、えがおでがんばります。', 'Dù có chuyện không thích/khó chịu thì tôi vẫn mỉm cười cố gắng.'),
  ('すると', 'すると', NULL, 'Liên từ', 'Sau đó, tiếp đó', 52, 'ボタンを押しました。すると、電気がつきました。', 'ボタンをおしました。すると、でんきがつきました。', 'Tôi bấm nút. Ngay sau đó, đèn sáng lên.'),
  ('目が覚めます', 'めがさめます', '目が覚めます', 'Động từ nhóm 2', 'Tỉnh giấc, mở mắt', 53, '今朝は目覚まし時計の音で目が覚めました。', 'けさはめざましどけいのおとでめがさめました。', 'Sáng nay tôi tỉnh giấc nhờ tiếng chuông đồng hồ báo thức.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 5
  AND NOT EXISTS (
    SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word
  );

-- Update example sentences for existing items in Lesson 30
UPDATE vocabulary v
SET example_jp = sub.example_jp, example_reading = sub.example_reading, example_vi = sub.example_vi
FROM (VALUES
  ('まだ', 'まだ宿題が終わっていません。', 'まだしゅくだいがおわっていません。', 'Tôi vẫn chưa làm xong bài tập về nhà.'),
  ('―ほど', 'ここから駅まで10分ほどかかります。', 'ここからえきまでじっぷんほどかかります。', 'Từ đây đến nhà ga mất khoảng 10 phút.'),
  ('予定表', '壁に今月の予定表が貼ってあります。', 'かべにこんげつのよていひょうがはってあります。', 'Trên tường có dán lịch trình của tháng này.'),
  ('ごくろうさま', '今日もお仕事ごくろうさまでした。', 'きょうもおしごとごくろうさまでした。', 'Hôm nay anh/chị cũng đã làm việc vất vả rồi.'),
  ('希望', '将来は日本で働くのが希望です。', 'しょうらいはにほんではたらくのがきぼうです。', 'Nguyện vọng của tôi trong tương lai là được làm việc tại Nhật Bản.'),
  ('何かご希望がありますか', 'ホテルの部屋について、何かご希望がありますか。', 'ホテルのへやについて、なにかごきぼうがありますか。', 'Về phòng khách sạn, anh/chị có nguyện vọng gì đặc biệt không ạ?'),
  ('ミュージカル', '来週の週末、友達とミュージカルを見に行きます。', 'らいしゅうのしゅうまつ、ともだちとミュージカルをみにいきます。', 'Cuối tuần sau tôi sẽ đi xem ca kịch với bạn.'),
  ('それはいいですな', 'みんなで温泉へ行くんですか。それはいいですな。', 'みんなでおんせんへいくんですか。それはいいですな。', 'Mọi người cùng đi suối nước nóng à? Thế thì hay quá nhỉ.'),
  ('丸い', 'この部屋には丸いテーブルが置いてあります。', 'このへやにはまるいテーブルがおいてあります。', 'Trong phòng này có đặt một chiếc bàn tròn.'),
  ('月', '今夜は月がとても綺麗に見えます。', 'こんやはつきがとてもきれいにみえます。', 'Tối nay mặt trăng trông rất đẹp.'),
  ('地球', '地球環境を守るために、ゴミを減らしましょう。', 'ちきゅうかんきょうをまもるために、ゴミをへらしましょう。', 'Để bảo vệ môi trường Trái Đất, chúng ta hãy giảm thiểu rác thải.'),
  ('うれしい', '試験に合格して、とてもうれしいです。', 'しけんにごうかくして、とてもうれしいです。', 'Đỗ kỳ thi nên tôi rất vui.'),
  ('嫌（な）', '嫌なことがあっても、笑顔でがんばります。', 'いやなことがあっても、えがおでがんばります。', 'Dù có chuyện không thích/khó chịu thì tôi vẫn mỉm cười cố gắng.'),
  ('すると', 'ボタンを押しました。すると、電気がつきました。', 'ボタンをおしました。すると、でんきがつきました。', 'Tôi bấm nút. Ngay sau đó, đèn sáng lên.'),
  ('目が覚めます', '今朝は目覚まし時計の音で目が覚めました。', 'けさはめざましどけいのおとでめがさめました。', 'Sáng nay tôi tỉnh giấc nhờ tiếng chuông đồng hồ báo thức.')
) AS sub(word, example_jp, example_reading, example_vi)
JOIN lessons l ON l.sort_order = 5 JOIN levels lvl ON l.level_id = lvl.level_id AND lvl.code = 'N4'
WHERE v.lesson_id = l.lesson_id AND v.word = sub.word;


-- Lesson 31 (N4 Lesson 31, l.sort_order = 6): Items 36 to 41
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('世界中', 'せかいじゅう', '世界中', 'Danh từ', 'Khắp thế giới', 36, '世界中の人と友達になりたいです。', 'せかいじゅうのひととともだちになりたいです。', 'Tôi muốn kết bạn với mọi người trên khắp thế giới.'),
  ('集まります', 'あつまります', '集まります', 'Động từ nhóm 1', 'Tập hợp', 37, '公園にたくさんの子供たちが集まっています。', 'こうえんにたくさんのこどもたちがあつまっています。', 'Rất nhiều trẻ em đang tập trung ở công viên.'),
  ('美しい', 'うつくしい', '美しい', 'Tính từ i', 'Đẹp', 38, '日本の富士山はとても美しい山です。', 'にほんのふじさんはとてもうつくしいやまです。', 'Núi Phú Sĩ của Nhật Bản là một ngọn núi rất đẹp.'),
  ('自然', 'しぜん', '自然', 'Danh từ', 'Thiên nhiên, tự nhiên', 39, '週末は豊かな自然の中でキャンプをします。', 'しゅうまつはゆたかなしぜんのなかでキャンプをします。', 'Cuối tuần tôi đi cắm trại giữa thiên nhiên phong phú.'),
  ('すばらしさ', 'すばらしさ', NULL, 'Danh từ', 'Tuyệt vời', 40, 'この映画を見て、家族の愛のすばらしさを知りました。', 'このえいがをみて、かぞくのあいのすばらしさをしりました。', 'Xem bộ phim này, tôi nhận ra sự tuyệt vời của tình yêu thương gia đình.'),
  ('気が付きます', 'きがつきます', '気が付きます', 'Động từ nhóm 1', 'Để ý, nhận ra', 41, '電車を降りてから、カバンを忘れたことに気が付きました。', 'でんしゃをおりてから、カバンをわすれたことにきがつきました。', 'Sau khi xuống tàu điện, tôi mới nhận ra mình đã quên cặp.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 6
  AND NOT EXISTS (
    SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word
  );

-- Update example sentences for existing items in Lesson 31
UPDATE vocabulary v
SET example_jp = sub.example_jp, example_reading = sub.example_reading, example_vi = sub.example_vi
FROM (VALUES
  ('世界中', '世界中の人と友達になりたいです。', 'せかいじゅうのひととともだちになりたいです。', 'Tôi muốn kết bạn với mọi người trên khắp thế giới.'),
  ('集まります', '公園にたくさんの子供たちが集まっています。', 'こうえんにたくさんのこどもたちがあつまっています。', 'Rất nhiều trẻ em đang tập trung ở công viên.'),
  ('美しい', '日本の富士山はとても美しい山です。', 'にほんのふじさんはとてもうつくしいやまです。', 'Núi Phú Sĩ của Nhật Bản là một ngọn núi rất đẹp.'),
  ('自然', '週末は豊かな自然の中でキャンプをします。', 'しゅうまつはゆたかなしぜんのなかでキャンプをします。', 'Cuối tuần tôi đi cắm trại giữa thiên nhiên phong phú.'),
  ('すばらしさ', 'この映画を見て、家族の愛のすばらしさを知りました。', 'このえいがをみて、かぞくのあいのすばらしさをしりました。', 'Xem bộ phim này, tôi nhận ra sự tuyệt vời của tình yêu thương gia đình.'),
  ('気が付きます', '電車を降りてから、カバンを忘れたことに気が付きました。', 'でんしゃをおりてから、カバンをわすれたことにきがつきました。', 'Sau khi xuống tàu điện, tôi mới nhận ra mình đã quên cặp.')
) AS sub(word, example_jp, example_reading, example_vi)
JOIN lessons l ON l.sort_order = 6 JOIN levels lvl ON l.level_id = lvl.level_id AND lvl.code = 'N4'
WHERE v.lesson_id = l.lesson_id AND v.word = sub.word;


-- Lesson 32 (N4 Lesson 32, l.sort_order = 7): Items 36 to 52
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('それはいけませんね', 'それはいけませんね', NULL, 'Cụm từ', 'Thế thì thật không tốt.', 36, '熱があるんですか。それはいけませんね。早く休んでください。', 'ねつがあるんですか。それはいけませんね。はやくやすんでください。', 'Bạn bị sốt à? Thế thì thật không tốt. Hãy nghỉ ngơi sớm đi nhé.'),
  ('オリンピック', 'オリンピック', NULL, 'Danh từ', 'Olympic', 37, '4年に一度、オリンピックが開催されます。', 'よねんにいちど、オリンピックがかいさいされます。', '4 năm một lần, Thế vận hội Olympic được tổ chức.'),
  ('元気', 'げんき', '元気', 'Tính từ na', 'Khỏe mạnh', 38, '毎日スポーツをして、元気に過ごしています。', 'まいにちスポーツをして、げんきにすごしています。', 'Hàng ngày tôi tập thể thao và sống rất khỏe mạnh.'),
  ('胃', 'い', '胃', 'Danh từ', 'Dạ dày', 39, '食べすぎて、胃が痛くなりました。', 'たべすぎて、いがいたくなりました。', 'Ăn quá nhiều nên tôi bị đau dạ dày.'),
  ('働きすぎ', 'はたらきすぎ', '働きすぎ', 'Danh từ', 'Làm việc quá sức', 40, '働きすぎは体に良くありませんから、休んでください。', 'はたらきすぎはからだによくありませんから、やすんでください。', 'Làm việc quá sức không tốt cho cơ体 đâu, hãy nghỉ ngơi đi.'),
  ('ストレス', 'ストレス', NULL, 'Danh từ', 'Stress, căng thẳng tâm lý', 41, '運動をすると、ストレスを解消することができます。', 'うんどうをすると、ストレスをかいしょうすることができます。', 'Tập thể dục giúp xua tan căng thẳng stress.'),
  ('無理をします', 'むりをします', '無理をします', 'Động từ nhóm 3', 'Làm quá sức', 42, '無理をしないで、自分のペースで勉強してください。', 'むりをしないで、じぶんのペースでべんきょうしてください。', 'Đừng làm quá sức, hãy học theo nhịp độ của riêng mình.'),
  ('ゆっくりします', 'ゆっくりします', NULL, 'Động từ nhóm 3', 'Nghỉ ngơi, thư thái, dưỡng sức', 43, '今週末は家でゆっくりするつもりです。', 'こんしゅうまつはいえでゆっくりするつもりです。', 'Cuối tuần này tôi định ở nhà nghỉ ngơi thư thái.'),
  ('星占い', 'ほしうらない', '星占い', 'Danh từ', 'Bói sao', 44, '毎朝、テレビで今日の星占いを見ます。', 'まいあさ、テレビできょうのほしうらないをみます。', 'Mỗi sáng tôi đều xem bói sao hôm nay trên tivi.'),
  ('牡牛座', 'おうしざ', '牡牛座', 'Danh từ', 'Chòm sao Kim Ngưu', 45, '私の誕生日は5月なので、牡牛座です。', 'わたしのたんじょうびはごがつなので、おうしざです。', 'Sinh nhật tôi vào tháng 5 nên thuộc cung Kim Ngưu.'),
  ('困ります', 'こまります', '困ります', 'Động từ nhóm 1', 'Rắc rối, khó xử, vấn đề', 46, '財布を落としてしまって、とても困りました。', 'さいふをおとしてしまって、とてもこまりました。', 'Đánh rơi ví tiền nên tôi gặp rất nhiều khó khăn/khó xử.'),
  ('宝くじ', 'たからくじ', '宝くじ', 'Danh từ', 'Xổ số', 47, '年末に宝くじを買って楽しみにしています。', 'ねんまつにたからくじをかってたのしみにしています。', 'Cuối năm tôi mua vé số và rất háo hức chờ đợi.'),
  ('当たります（宝くじが～）', 'あたります（たからくじが～）', '当たります（宝くじが～）', 'Động từ nhóm 1', 'Trúng (số)', 48, '宝くじが当たったら、世界旅行に行きたいです。', 'たからくじがあたったら、せかいりょこうにいきたいです。', 'Nếu trúng vé số, tôi muốn đi du lịch vòng quanh thế giới.'),
  ('健康', 'けんこう', '健康', 'Danh từ', 'Sức khỏe', 49, '健康のために、毎日野菜をたくさん食べています。', 'けんこうのために、まいにちやさいをたくさんたべています。', 'Vì sức khỏe, mỗi ngày tôi đều ăn nhiều rau.'),
  ('恋愛', 'れんあい', '恋愛', 'Danh từ', 'Tình yêu', 50, '恋愛についての小説を読むのが好きです。', 'れんあいについてのしょうせつをよむのがすきです。', 'Tôi thích đọc tiểu thuyết về tình yêu.'),
  ('恋人', 'こいびと', '恋人', 'Danh từ', 'Người yêu', 51, 'クリスマスは恋人と一緒に過ごしたいです。', 'クリスマスはこいびとといっしょにすごしたいです。', 'Giáng sinh tôi muốn đón cùng người yêu.'),
  ('（お）金持ち', '（お）かねもち', '（お）金持ち', 'Danh từ', 'Người giàu có', 52, 'お金持ちになっても、質素な生活を続けたいです。', 'おかねもちになっても、しっそなせいかつをつづけたいです。', 'Cho dù trở thành người giàu có thì tôi vẫn muốn tiếp tục cuộc sống giản dị.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 7
  AND NOT EXISTS (
    SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word
  );

-- Update example sentences for existing items in Lesson 32
UPDATE vocabulary v
SET example_jp = sub.example_jp, example_reading = sub.example_reading, example_vi = sub.example_vi
FROM (VALUES
  ('それはいけませんね', '熱があるんですか。それはいけませんね。早く休んでください。', 'ねつがあるんですか。それはいけませんね。はやくやすんでください。', 'Bạn bị sốt à? Thế thì thật không tốt. Hãy nghỉ ngơi sớm đi nhé.'),
  ('オリンピック', '4年に一度、オリンピックが開催されます。', 'よねんにいちど、オリンピックがかいさいされます。', '4 năm một lần, Thế vận hội Olympic được tổ chức.'),
  ('元気', '毎日スポーツをして、元気に過ごしています。', 'まいにちスポーツをして、げんきにすごしています。', 'Hàng ngày tôi tập thể thao và sống rất khỏe mạnh.'),
  ('胃', '食べすぎて、胃が痛くなりました。', 'たべすぎて、いがいたくなりました。', 'Ăn quá nhiều nên tôi bị đau dạ dày.'),
  ('働きすぎ', '働きすぎは体に良くありませんから、休んでください。', 'はたらきすぎはからだによくありませんから、やすんでください。', 'Làm việc quá sức không tốt cho cơ thể đâu, hãy nghỉ ngơi đi.'),
  ('ストレス', '運動をすると、ストレスを解消することができます。', 'うんどうをすると、ストレスをかいしょうすることができます。', 'Tập thể dục giúp xua tan căng thẳng stress.'),
  ('無理をします', '無理をしないで、自分のペースで勉強してください。', 'むりをしないで、じぶんのペースでべんきょうしてください。', 'Đừng làm quá sức, hãy học theo nhịp độ của riêng mình.'),
  ('ゆっくりします', '今週末は家でゆっくりするつもりです。', 'こんしゅうまつはいえでゆっくりするつもりです。', 'Cuối tuần này tôi định ở nhà nghỉ ngơi thư thái.'),
  ('星占い', '毎朝、テレビで今日の星占いを見ます。', 'まいあさ、テレビできょうのほしうらないをみます。', 'Mỗi sáng tôi đều xem bói sao hôm nay trên tivi.'),
  ('牡牛座', '私の誕生日は5月なので、牡牛座です。', 'わたしのたんじょうびはごがつなので、おうしざです。', 'Sinh nhật tôi vào tháng 5 nên thuộc cung Kim Ngưu.'),
  ('困ります', '財布を落としてしまって、とても困りました。', 'さいふをおとしてしまって、とてもこまりました。', 'Đánh rơi ví tiền nên tôi gặp rất nhiều khó khăn/khó xử.'),
  ('宝くじ', '年末に宝くじを買って楽しみにしています。', 'ねんまつにたからくじをかってたのしみにしています。', 'Cuối năm tôi mua vé số và rất háo hức chờ đợi.'),
  ('当たります（宝くじが～）', '宝くじが当たったら、世界旅行に行きたいです。', 'たからくじがあたったら、せかいりょこうにいきたいです。', 'Nếu trúng vé số, tôi muốn đi du lịch vòng quanh thế giới.'),
  ('健康', '健康のために、毎日野菜をたくさん食べています。', 'けんこうのために、まいにちやさいをたくさんたべています。', 'Vì sức khỏe, mỗi ngày tôi đều ăn nhiều rau.'),
  ('恋愛', '恋愛についての小説を読むのが好きです。', 'れんあいについてのしょうせつをよむのがすきです。', 'Tôi thích đọc tiểu thuyết về tình yêu.'),
  ('恋人', 'クリスマスは恋人と一緒に過ごしたいです。', 'クリスマスはこいびとといっしょにすごしたいです。', 'Giáng sinh tôi muốn đón cùng người yêu.'),
  ('（お）金持ち', 'お金持ちになっても、質素な生活を続けたいです。', 'おかねもちになっても、しっそなせいかつをつづけたいです。', 'Cho dù trở thành người giàu có thì tôi vẫn muốn tiếp tục cuộc sống giản dị.')
) AS sub(word, example_jp, example_reading, example_vi)
JOIN lessons l ON l.sort_order = 7 JOIN levels lvl ON l.level_id = lvl.level_id AND lvl.code = 'N4'
WHERE v.lesson_id = l.lesson_id AND v.word = sub.word;

COMMIT;
