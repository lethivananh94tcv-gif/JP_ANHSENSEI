-- V80: Supplement full vocabulary items with authentic example sentences for Minna no Nihongo N4 Lessons 33 to 50
BEGIN;

-- Lesson 33 (N4 Lesson 33, l.sort_order = 8): Items 35 to 56 (Cập nhật chuẩn 100% người dùng cung cấp)
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('そりゃあ', 'そりゃあ', NULL, 'Thán từ', 'Thế thì, ồ', 35, 'あしたは休みですか。そりゃあいいですね。', 'あしたはやすみですか。そりゃあいいですね。', 'Ngày mai được nghỉ à? Thế thì tốt quá nhỉ.'),
  ('～以内', '～いない', '～以内', 'Hậu tố', '~trong khoảng, ~trong vòng', 36, '3日以内に返事をください。', 'みっかいないにへんじをください。', 'Xin hãy trả lời trong vòng 3 ngày.'),
  ('警察', 'けいさつ', '警察', 'Danh từ', 'Cảnh sát', 37, '事故が起きたので警察を呼びました。', 'じこがおきたのでけいさつをよびました。', 'Xảy ra tai nạn nên tôi đã gọi cảnh sát.'),
  ('罰金', 'ばっきん', '罰金', 'Danh từ', 'Tiền phạt', 38, 'スピード違反で罰金を払いました。', 'スピードいはんでばっきんをはらいました。', 'Tôi đã nộp tiền phạt vì vi phạm tốc độ.'),
  ('電報', 'でんぽう', '電報', 'Danh từ', 'Điện báo', 39, '結婚式のお祝いに電報を送ります。', 'けっこんしきのおいわいにでんぽうをおくります。', 'Gửi điện báo chúc mừng đám cưới.'),
  ('人々', 'ひとびと', '人々', 'Danh từ', 'Nhiều người, mọi người', 40, '街には多くの人々が行き交っています。', 'まちにはおおくのひとびとがいきかっています。', 'Trên phố có rất nhiều người qua lại.'),
  ('急用', 'きゅうよう', '急用', 'Danh từ', 'Việc gấp', 41, '急用ができたので、お先に失礼します。', 'きゅうようができたので、おさきにしつれいします。', 'Vì có việc gấp nên tôi xin phép về trước.'),
  ('打ちます（電報を～）', 'うちます（でんぽうを～）', '打ちます（電報を～）', 'Động từ nhóm 1', 'Gửi (điện báo)', 42, '国にいる家族に電報を打ちます。', 'くににいるかぞくにでんぽうをうちます。', 'Gửi điện báo cho gia đình ở quê nhà.'),
  ('電報代', 'でんぽうだい', '電報代', 'Danh từ', 'Phí điện báo', 43, '電報代はいくらかかりますか。', 'でんぽうだいはいくらかかりますか。', 'Phí điện báo tốn bao nhiêu tiền?'),
  ('できるだけ', 'できるだけ', NULL, 'Phó từ', 'Cố gắng, trong khả năng có thể', 44, 'できるだけ早く返信してください。', 'できるだけはやくへんしんしてください。', 'Hãy phản hồi càng sớm càng tốt.'),
  ('短く', 'みじかく', '短く', 'Phó từ', 'Ngắn gọn', 45, '文章を短くまとめてください。', 'ぶんしょうをみじかくまとめてください。', 'Hãy tóm tắt đoạn văn thật ngắn gọn.'),
  ('また', 'また', NULL, 'Phó từ', 'Thêm nữa, lại', 46, 'また明日お会いしましょう。', 'またあしたおあいしましょう。', 'Hẹn gặp lại bạn vào ngày mai.'),
  ('例えば', 'たとえば', '例えば', 'Phó từ', 'Ví dụ', 47, '例えば、リンゴやバナナなどの果物が好きです。', 'たとえば、リンゴやバナナなどのくだものがすきです。', 'Ví dụ, tôi thích các loại quả như táo và chuối.'),
  ('危篤', 'きとく', '危篤', 'Danh từ', 'Tình trạng hiểm nghèo', 48, '祖父が危篤だと連絡がありました。', 'そふがきとくだとれんらくがありました。', 'Có liên lạc báo rằng ông nội đang trong tình trạng hiểm nghèo.'),
  ('重い病気', 'おもいびょうき', '重い病気', 'Danh từ', 'Bệnh nặng', 49, '重い病気にかからないように気をつけます。', 'おもいびょうきにかからないようにきをつけます。', 'Chú ý để không bị mắc bệnh nặng.'),
  ('明日', 'あす', '明日', 'Danh từ', 'Ngày mai', 50, '明日の午前9時に集合してください。', 'あすのごぜんくじにしゅうごうしてください。', 'Hãy tập trung vào lúc 9 giờ sáng ngày mai.'),
  ('留守', 'るす', '留守', 'Danh từ', 'Vắng nhà', 51, '旅行中で家を留守にしています。', 'りょこうちゅうでいえをるすにしています。', 'Đang đi du lịch nên nhà tôi vắng người.'),
  ('留守番', 'るすばん', '留守番', 'Danh từ', 'Trông nhà, giữ nhà', 52, '子供に留守番を頼みました。', 'こどもにるすばんをたのみました。', 'Tôi nhờ con ở nhà trông nhà.'),
  ('（お）祝い', 'おいわい', 'お祝い', 'Danh từ', 'Việc mừng, quà mừng', 53, '合格のお祝いに時計をあげました。', 'ごうかくのおいわいにとけいをあげました。', 'Tôi đã tặng đồng hồ làm quà mừng đỗ kỳ thi.'),
  ('亡くなります', 'なくなります', '亡くなります', 'Động từ nhóm 1', 'Mất, qua đời', 54, '祖母は昨年90歳で亡くなりました。', 'そぼはさくねんきゅうじゅっさいでなくなりました。', 'Bà tôi qua đời năm ngoái thọ 90 tuổi.'),
  ('悲しい', 'かなしい', '悲しい', 'Tính từ i', 'Buồn, đau buồn', 55, 'ペットが死んでとても悲しいです。', 'ペットがしんでとてもかなしいです。', 'Thú cưng bị chết nên tôi rất buồn.'),
  ('利用します', 'りようします', '利用します', 'Động từ nhóm 3', 'Sử dụng, tận dụng', 56, '図書館をよく利用しています。', 'としょかんをよくりようしています。', 'Tôi thường xuyên sử dụng thư viện.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 8
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

-- Lesson 34 (N4 Lesson 34, l.sort_order = 9): Items 36 to 46
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('煮ます', 'にます', '煮ます', 'Động từ nhóm 2', 'Ninh, nấu, kho', 36, '野菜を醤油で煮ます。', 'やさいをしょうゆでにます。', 'Ninh rau củ với nước tương.'),
  ('炊きます', 'たきます', '炊きます', 'Động từ nhóm 1', 'Nấu (cơm)', 37, '毎朝ご飯を炊きます。', 'まいあさごはんをたきます。', 'Mỗi sáng tôi đều nấu cơm.'),
  ('炒めます', 'いためます', '炒めます', 'Động từ nhóm 2', 'Xào', 38, 'フライパンで肉と野菜を炒めます。', 'フライパンでにくとやさいをいためます。', 'Xào thịt và rau củ bằng chảo.'),
  ('揚げます', 'あげます', '揚げます', 'Động từ nhóm 2', 'Rán, chiên', 39, '油で天ぷらを揚げます。', 'あぶらでてんぷらをあげます。', 'Rán tempura bằng dầu.'),
  ('混ぜます', 'まぜます', '混ぜます', 'Động từ nhóm 2', 'Trộn, khuấy', 40, '卵と砂糖をよく混ぜます。', 'たまごとさとうをよくまぜます。', 'Trộn đều trứng và đường.'),
  ('載せます', 'のせます', '載せます', 'Động từ nhóm 2', 'Đặt lên, chất lên', 41, 'ご飯の上に魚を載せます。', 'ごはんのうえにさかなをのせます。', 'Đặt cá lên trên cơm.'),
  ('蓋', 'ふた', '蓋', 'Danh từ', 'Nắp (nồi, hộp)', 42, '鍋の蓋を閉めます。', 'なべのふたをしめます。', 'Đậy nắp nồi lại.'),
  ('包丁', 'ほうちょう', '包丁', 'Danh từ', 'Dao bếp', 43, '包丁で野菜を切ります。', 'ほうちょうでやさいをきります。', 'Cắt rau củ bằng dao bếp.'),
  ('まな板', 'まないた', 'まな板', 'Danh từ', 'Thớt', 44, 'まな板の上に肉を置きます。', 'まないたのうえににくをおきます。', 'Đặt thịt lên trên thớt.'),
  ('調味料', 'ちょうみりょう', '調味料', 'Danh từ', 'Gia vị', 45, '調味料を入れて味を調えます。', 'ちょうみりょうをいれてあじをととのえます。', 'Cho gia vị vào để nêm nếm vị.'),
  ('順番', 'じゅんばん', '順番', 'Danh từ', 'Thứ tự, thứ bậc', 46, '順番を守って並んでください。', 'じゅんばんをまもってならんでください。', 'Hãy xếp hàng tuân thủ thứ tự.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 9
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

-- Lesson 35 (N4 Lesson 35, l.sort_order = 10): Items 36 to 45
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('畳みます', 'たたみます', '畳みます', 'Động từ nhóm 1', 'Gấp, xếp (quần áo)', 36, '洗濯物を綺麗に畳みます。', 'せんたくものをきれいにてたたみます。', 'Gấp quần áo đã giặt thật đẹp.'),
  ('連れて行きます', 'つれていきます', '連れて行きます', 'Động từ nhóm 1', 'Dẫn đi', 37, '子供を公園へ連れて行きます。', 'こどもをこうえんへつれていきます。', 'Dẫn con đến công viên.'),
  ('連れて来ます', 'つれてきます', '連れて来ます', 'Động từ nhóm 3', 'Dẫn đến', 38, '友達を家に連れて来ました。', 'ともだちをいえにつれてきました。', 'Tôi dẫn bạn về nhà.'),
  ('送ります', 'おくります', '送ります', 'Động từ nhóm 1', 'Tiễn (người)', 39, '駅まで友達を送ります。', 'えきまでともだちをおくります。', 'Tiễn bạn ra đến tận nhà ga.'),
  ('紹介します', 'しょうかいします', '紹介します', 'Động từ nhóm 3', 'Giới thiệu', 40, '新しい友達を家族に紹介します。', 'あたらしいともだちをかぞくにしょうかいします。', 'Giới thiệu bạn mới với gia đình.'),
  ('案内します', 'あんないします', '案内します', 'Động từ nhóm 3', 'Hướng dẫn, dẫn đường', 41, '東京の街をご案内します。', 'とうきょうのまちをごあんないします。', 'Tôi sẽ dẫn đường tham quan phố phường Tokyo.'),
  ('説明します', 'せつめいします', '説明します', 'Động từ nhóm 3', 'Giải thích', 42, '使い方を分かりやすく説明します。', 'つかいかたをわかりやすくせつめいします。', 'Giải thích cách sử dụng một cách dễ hiểu.'),
  ('おじいさん', 'おじいさん', NULL, 'Danh từ', 'Ông (người khác), cụ ông', 43, 'おじいさんが元気に散歩しています。', 'おじいさんがげんきにさんぽしています。', 'Cụ ông đang đi dạo khỏe mạnh.'),
  ('おばあさん', 'おばあさん', NULL, 'Danh từ', 'Bà (người khác), cụ bà', 44, 'おばあさんに親切にしました。', 'おばあさんにしんせつにしました。', 'Tôi đối xử tử tế với cụ bà.'),
  ('準備', 'じゅんび', '準備', 'Danh từ', 'Chuẩn bị', 45, '旅行の準備を始めましょう。', 'りょこうのじゅんびをはじめましょう。', 'Hãy bắt đầu chuẩn bị chuyến du lịch.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 10
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

-- Lesson 36 (N4 Lesson 36, l.sort_order = 11): Items 29 to 40
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('跳びます', 'とびます', '跳びます', 'Động từ nhóm 1', 'Nhảy (lên)', 29, '子供たちが元気に跳びはねています。', 'こどもたちがげんきにとびはねています。', 'Bọn trẻ đang nhảy nhót vui vẻ.'),
  ('踏みます', 'ふみます', '踏みます', 'Động từ nhóm 1', 'Giẫm lên', 30, '電車で足を踏まれました。', 'でんしゃであしをふまれました。', 'Tôi bị ai đó giẫm lên chân trên tàu điện.'),
  ('足します', 'たします', '足します', 'Động từ nhóm 1', 'Thêm vào, cộng vào', 31, '塩を少し足してください。', 'しおをすこしたしてください。', 'Hãy nêm thêm một chút muối.'),
  ('引き算', 'ひきざん', '引き算', 'Danh từ', 'Phép trừ', 32, '小学生が引き算を勉強しています。', 'しょうがくせいがひきざんをべんきょうしています。', 'Học sinh tiểu học đang học phép trừ.'),
  ('足し算', 'たしざん', '足し算', 'Danh từ', 'Phép cộng', 33, '簡単な足し算ができます。', 'かんたんなたしざんができます。', 'Có thể làm phép cộng đơn giản.'),
  ('掛け算', 'かけざん', '掛け算', 'Danh từ', 'Phép nhân', 34, '九九の掛け算を覚えます。', 'くくのかけざんをおぼえます。', 'Học thuộc bảng cửu chương phép nhân.'),
  ('割り算', 'わりざん', '割り算', 'Danh từ', 'Phép chia', 35, '電卓で割り算を計算します。', 'でんたくでわりざんをけいさんします。', 'Tính phép chia bằng máy tính bỏ túi.'),
  ('会話', 'かいわ', '会話', 'Danh từ', 'Hội thoại', 36, '日本語の会話の練習をします。', 'にほんごのかいわのれんしゅうをします。', 'Luyện tập hội thoại tiếng Nhật.'),
  ('チャレンジ', 'チャレンジ', NULL, 'Danh từ', 'Thử thách Challenge', 37, '新しいスポーツにチャレンジします。', 'あたらしいスポーツにチャレンジします。', 'Thử thách bản thân với môn thể thao mới.'),
  ('飛ぶ', 'とぶ', '飛ぶ', 'Động từ nhóm 1', 'Bay', 38, '空を鳥が飛んでいます。', 'そらをとりがとんでいます。', 'Chim đang bay trên bầu trời.'),
  ('世界初', 'せかいはつ', '世界初', 'Danh từ', 'Đầu tiên trên thế giới', 39, 'これは世界初の技術です。', 'これはせかいはつのぎじゅつです。', 'Đây là công nghệ đầu tiên trên thế giới.'),
  ('宇宙船', 'うちゅうせん', '宇宙船', 'Danh từ', 'Tàu vũ trụ', 40, '宇宙船が月に向かって出発しました。', 'うちゅうせんがつきにむかってしゅっぱつしました。', 'Tàu vũ trụ đã xuất phát hướng về mặt trăng.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 11
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

-- Lesson 39 (N4 Lesson 39, l.sort_order = 14): Items 36 to 45
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('火傷', 'やけど', '火傷', 'Danh từ', 'Bị bỏng', 36, '熱湯で火傷をしてしまいました。', 'ねっとうでやけどをしてしまいました。', 'Tôi bị bỏng do nước sôi.'),
  ('怪我', 'けが', '怪我', 'Danh từ', 'Vết thương', 37, 'サッカーで足に怪我をしました。', 'サッカーであしにけがをしました。', 'Tôi bị thương ở chân khi đá bóng.'),
  ('咳', 'せき', '咳', 'Danh từ', 'Cơn ho', 38, '風邪をひいて咳が出ます。', 'かぜをひいてせきがでます。', 'Tôi bị cảm nên bị ho.'),
  ('インフルエンザ', 'インフルエンザ', NULL, 'Danh từ', 'Cúm mùa', 39, 'インフルエンザの予防接種を受けます。', 'インフルエンザのよぼうせっしゅをうけます。', 'Tiêm vắc-xin phòng cúm mùa.'),
  ('お見舞い', 'おみまい', 'お見舞い', 'Danh từ', 'Thăm bệnh', 40, '入院している友達のお見舞いに行きます。', 'にゅういんしているともだちのおみまいにいきます。', 'Đi thăm người bạn đang nhập viện.'),
  ('不安な', 'ふあんな', '不安な', 'Tính từ na', 'Lo lắng, bất an', 41, '一人暮らしは少し不安です。', 'ひとりぐらしはすこしふあんです。', 'Sống một mình thì hơi lo lắng.'),
  ('がっかり', 'がっかり', NULL, 'Phó từ', 'Thất vọng', 42, '不合格でがっかりしました。', 'ふごうかくでがっかりしました。', 'Thi trượt nên tôi rất thất vọng.'),
  ('ほっと', 'ほっと', NULL, 'Phó từ', 'Thở phào nhẹ nhõm', 43, '無事に着いてほっとしました。', 'ぶじについてほっとしました。', 'Đến nơi an toàn nên tôi thở phào nhẹ nhõm.'),
  ('うっかり', 'うっかり', NULL, 'Phó từ', 'Vô ý, lỡ tay', 44, 'うっかり宿題を忘れてしまいました。', 'うっかりしゅくだいをわすれてしまいました。', 'Tôi vô ý quên mất bài tập.'),
  ('がっちり', 'がっちり', NULL, 'Phó từ', 'Vững chắc, rắn chắc', 45, '体格ががっちりした人です。', 'たいかくががっちりしたひとです。', 'Người có vóc dáng rắn chắc.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 14
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

-- Lesson 41 (N4 Lesson 41, l.sort_order = 16): Items 36 to 45
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('お礼', 'おれい', 'お礼', 'Danh từ', 'Lời cảm ơn, quà cảm ơn', 36, 'お世話になった先生にお礼を言います。', 'おせわになったせんせいにおれいをいいま。', 'Nói lời cảm ơn thầy giáo đã giúp đỡ.'),
  ('お祝い', 'おいわい', 'お祝い', 'Danh từ', 'Quà chúc mừng', 37, '友達の結婚のお祝いを買いました。', 'ともだちのけっこんのおいわいをかいま。', 'Mua quà chúc mừng đám cưới bạn.'),
  ('お年玉', 'おとしだま', 'お年玉', 'Danh từ', 'Tiền lì xì', 38, '正月に子供にお年玉をあげます。', 'しょうがつにこどもにおとしだまをあげます。', 'Lì xì cho trẻ em vào ngày Tết.'),
  ('お見舞い', 'おみまい', 'お見舞い', 'Danh từ', 'Quà thăm bệnh', 39, 'お見舞いに綺麗な花を持っていきます。', 'おみまいにきれいなはなをもっていきます。', 'Mang hoa đẹp đi làm quà thăm bệnh.'),
  ('手袋', 'てぶくろ', '手袋', 'Danh từ', 'Găng tay', 40, '寒いので暖かい手袋をはめます。', 'さむいのであたたかいてぶくろをはめます。', 'Vì lạnh nên đeo găng tay ấm.'),
  ('靴下', 'くつした', '靴下', 'Danh từ', 'Tất, vớ', 41, '新しい靴下を履きます。', 'あたらしいくつしたをはきます。', 'Đi đôi tất mới.'),
  ('暖房', 'だんぼう', '暖房', 'Danh từ', 'Máy sưởi', 42, '部屋の暖房をつけます。', 'へやのだんぼうをつけます。', 'Bật máy sưởi trong phòng.'),
  ('冷房', 'れいぼう', '冷房', 'Danh từ', 'Máy lạnh', 43, '夏は冷房を強くします。', 'なつはれいぼうをつよくします。', 'Mùa hè bật máy lạnh mạnh lên.'),
  ('温度', 'おんど', '温度', 'Danh từ', 'Nhiệt độ', 44, 'エアコンの温度を調整します。', 'エアコンのおんどをちょうせいします。', 'Điều chỉnh nhiệt độ điều hòa.'),
  ('孫', 'まご', '孫', 'Danh từ', 'Cháu nội/ngoại', 45, '祖父母は孫をとても可愛がっています。', 'そふぼはまごをとてもかわいがっています。', 'Ông bà rất chiều chuộng cháu.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 16
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

-- Lesson 42 (N4 Lesson 42, l.sort_order = 17): Items 36 to 45
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('ローソク', 'ローソク', NULL, 'Danh từ', 'Cây nến', 36, 'ケーキにローソクを立てます。', 'ケーキにローソクをたてます。', 'Cắm nến lên bánh sinh nhật.'),
  ('ひも', 'ひも', '紐', 'Danh từ', 'Sợi dây', 37, '荷物をひもでしっかり縛ります。', 'にもつをひもでしっかりしばります。', 'Buộc chặt hành lý bằng dây.'),
  ('袋', 'ふくろ', '袋', 'Danh từ', 'Túi, bao', 38, '買い物袋を家に持って帰ります。', 'かいものぶくろをいえにもっていかえります。', 'Xách túi mua sắm về nhà.'),
  ('書類', 'しょるい', '書類', 'Danh từ', 'Giấy tờ, tài liệu', 39, '大切な書類をファイルに整理します。', 'たいせつなしょるいをファイルにせいりします。', 'Sắp xếp tài liệu quan trọng vào tệp.'),
  ('クリップ', 'クリップ', NULL, 'Danh từ', 'Kẹp giấy', 40, '紙をクリップで留めます。', 'かみをクリップでとめます。', 'Kẹp giấy lại bằng kẹp.'),
  ('ホッチキス', 'ホッチキス', NULL, 'Danh từ', 'Dập ghim Stapler', 41, '書類をホッチキスで留めます。', 'しょるいをホッチキスでとめます。', 'Dập ghim tài liệu lại.'),
  ('ハサミ', 'ハサミ', NULL, 'Danh từ', 'Cái kéo', 42, 'ハサミで紙を切り抜きます。', 'ハサミでかみをきりぬきます。', 'Cắt giấy bằng kéo.'),
  ('セロテープ', 'セロテープ', NULL, 'Danh từ', 'Băng dính trong', 43, 'ポスターをセロテープで貼ります。', 'ポスターをセロテープではります。', 'Dán áp phích bằng băng dính trong.'),
  ('消しゴム', 'けしごむ', '消しゴム', 'Danh từ', 'Cục tẩy', 44, '間違えた字を消しゴムで消します。', 'まちがえたじをけしごむできします。', 'Tẩy chữ viết sai bằng cục tẩy.'),
  ('定規', 'じょうぎ', '定規', 'Danh từ', 'Thước kẻ', 45, '定規でまっすぐな線を引きます。', 'じょうぎでまっすぐなせんをひきます。', 'Kẻ một đường thẳng bằng thước kẻ.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 17
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

-- Lesson 43 (N4 Lesson 43, l.sort_order = 18): Items 30 to 40
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('ガソリンスタンド', 'ガソリンスタンド', NULL, 'Danh từ', 'Trạm xăng', 30, 'ガソリンスタンドで満タンにします。', 'ガソリンスタンドでまんたんにします。', 'Đổ đầy bình tại trạm xăng.'),
  ('理由', 'りゆう', '理由', 'Danh từ', 'Lý do', 31, '遅刻した理由を説明します。', 'ちこくしたりゆうをせつめいします。', 'Giải thích lý do đến muộn.'),
  ('招待状', 'しょうたいじょう', '招待状', 'Danh từ', 'Thư mời', 32, '結婚式の招待状が届きました。', 'けっこんしきのしょうたいじょうがとどきました。', 'Thư mời đám cưới đã gửi đến.'),
  ('返事', 'へんじ', '返事', 'Danh từ', 'Hồi âm, trả lời', 33, 'メールの返事をすぐに書きます。', 'メールのへんじをすぐにかきます。', 'Viết thư hồi âm ngay lập tức.'),
  ('催促', 'さいそく', '催促', 'Danh từ', 'Hối thúc', 34, '注文した商品の催促をします。', 'ちゅうもんしたしょうひんのさいそくをします。', 'Hối thúc sản phẩm đã đặt hàng.'),
  ('お礼状', 'おれいじょう', 'お礼状', 'Danh từ', 'Thư cảm ơn', 35, 'お世話になった方にお礼状を送ります。', 'おせわになったかたにおれいじょうをおくります。', 'Gửi thư cảm ơn đến người đã giúp đỡ.'),
  ('見舞い品', 'みまいひん', '見舞い品', 'Danh từ', 'Quà thăm bệnh', 36, '見舞い品に果物を持っていきます。', 'みまいひんにくだものをもちにいきます。', 'Mang hoa quả làm quà thăm bệnh.'),
  ('景品', 'けいひん', '景品', 'Danh từ', 'Quà phần thưởng', 37, 'ゲームの景品をもらいました。', 'ゲームのけいひんをもらいました。', 'Nhận phần thưởng trò chơi.'),
  ('記念品', 'きねんひん', '記念品', 'Danh từ', 'Quà kỷ niệm', 38, '卒業の記念品を受け取ります。', 'そつぎょうのきねんひんをうけとります。', 'Nhận quà kỷ niệm tốt nghiệp.'),
  ('特産品', 'とくさんひん', '特産品', 'Danh từ', 'Đặc sản địa phương', 39, '旅先で有名な特産品を買います。', 'たびさきでゆうめいなとくさんひんをかいま。', 'Mua đặc sản nổi tiếng tại điểm du lịch.'),
  ('土産', 'みやげ', '土産', 'Danh từ', 'Quà lưu niệm', 40, '家族にお土産をたくさん買いました。', 'かぞくにおみやげをたくさんかいま。', 'Mua nhiều quà lưu niệm cho gia đình.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 18
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

-- Lesson 44 (N4 Lesson 44, l.sort_order = 19): Items 33 to 42
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('セット', 'セット', NULL, 'Danh từ', 'Bộ, set', 33, 'ランチセットを注文します。', 'ランチセットをちゅうもんします。', 'Gọi một set ăn trưa.'),
  ('スタイル', 'スタイル', NULL, 'Danh từ', 'Kiểu dáng', 34, '彼女はスタイルがとても良いです。', 'かのじょはスタイルがとてもよいです。', 'Dáng của cô ấy rất đẹp.'),
  ('パーマ', 'パーマ', NULL, 'Danh từ', 'Uốn tóc Perma', 35, '美容院でパーマをかけます。', 'びよういんでパーマをかけます。', 'Uốn tóc tại tiệm làm đẹp.'),
  ('カラー', 'カラー', NULL, 'Danh từ', 'Nhuộm tóc / Màu sắc', 36, '髪の毛を明るいカラーにします。', 'かみのけをあかるいカラーにします。', 'Nhuộm tóc màu sáng.'),
  ('トリートメント', 'トリートメント', NULL, 'Danh từ', 'Dưỡng tóc', 37, '髪のトリートメントをしてもらいます。', 'かみのトリートメントをしてもらいます。', 'Dưỡng tóc tại tiệm.'),
  ('美容院', 'びよういん', '美容院', 'Danh từ', 'Tiệm làm đẹp', 38, '月に一度、美容院に行きます。', 'つきにいちど、びよういんにいきます。', 'Mỗi tháng đi tiệm làm đẹp một lần.'),
  ('理髪店', 'りはつてん', '理髪店', 'Danh từ', 'Tiệm cắt tóc nam', 39, '父は昔から同じ理髪店に通っています。', 'ちちはむかしからおなじりはつてんにかよっています。', 'Bố tôi từ xưa đến nay toàn cắt ở tiệm nam quen.'),
  ('鏡', 'かがみ', '鏡', 'Danh từ', 'Gương', 40, '鏡を見て髪型を整えます。', 'かがみをみてかみがたをととのえます。', 'Soi gương chỉnh lại kiểu tóc.'),
  ('くし', 'くし', NULL, 'Danh từ', 'Cái lược', 41, 'くしで髪をとかします。', 'くしでかみをとかします。', 'Chải tóc bằng lược.'),
  ('ドライヤー', 'ドライヤー', NULL, 'Danh từ', 'Máy sấy tóc', 42, 'ドライヤーで濡れた髪を乾かします。', 'ドライヤーでぬれたかみをかわかします。', 'Sấy khô tóc ướt bằng máy sấy.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 19
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

-- Lesson 45 (N4 Lesson 45, l.sort_order = 20): Items 29 to 38
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('通知', 'つうち', '通知', 'Danh từ', 'Thông báo', 29, '合格の通知が届きました。', 'ごうかくのつうちがとどきました。', 'Thông báo trúng tuyển đã gửi đến.'),
  ('連絡', 'れんらく', '連絡', 'Danh từ', 'Liên lạc', 30, '遅れる時は必ず連絡してください。', 'おくれるときはかならずれんらくしてください。', 'Khi đến muộn nhất định hãy liên lạc.'),
  ('報告', 'ほうこく', '報告', 'Danh từ', 'Báo cáo', 31, '仕事の進み具合を上司に報告します。', 'しごとのすすみぐあいをじょうしにほうこくします。', 'Báo cáo tiến độ công việc với cấp trên.'),
  ('相談', 'そうだん', '相談', 'Danh từ', 'Thảo luận', 32, '進路について先生に相談します。', 'しんろについてせんせいにそうだんします。', 'Trao đổi với thầy giáo về định hướng học tập.'),
  ('打ち合わせ', 'うちあわせ', '打ち合わせ', 'Danh từ', 'Cuộc họp trao đổi', 33, '会議の前に打ち合わせをします。', 'かいぎのまえにうちあわせをします。', 'Họp trao đổi sơ bộ trước cuộc họp chính.'),
  ('予約', 'よやく', '予約', 'Danh từ', 'Đặt chỗ', 34, 'レストランの予約を済ませました。', 'レストランのよやくをすませました。', 'Đã đặt chỗ trước ở nhà hàng.'),
  ('変更', 'へんこう', '変更', 'Danh từ', 'Thay đổi', 35, '予定の変更をお願いします。', 'よていのへんこうをおねがいします。', 'Xin vui lòng cho thay đổi lịch trình.'),
  ('確認', 'かくにん', '確認', 'Danh từ', 'Xác nhận', 36, '飛行機の時間をもう一度確認します。', 'ひこうきのじかんをもうちどかくにんします。', 'Xác nhận lại giờ bay một lần nữa.'),
  ('問い合わせ', 'といあわせ', '問い合わせ', 'Danh từ', 'Hỏi đáp', 37, '商品の在庫について問い合わせます。', 'しょうひんのざいこについてといあわせます。', 'Hỏi đáp về tồn kho sản phẩm.'),
  ('受付', 'うけつけ', '受付', 'Danh từ', 'Quầy tiếp tân', 38, '受付で名前と住所を書きます。', 'うけつけであまえとじゅうしょをかきます。', 'Viết tên và địa chỉ tại quầy tiếp tân.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 20
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

-- Lesson 46 (N4 Lesson 46, l.sort_order = 21): Items 30 to 39
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('事件', 'じけん', '事件', 'Danh từ', 'Vụ án, sự cố', 30, '警察が事件の調査をしています。', 'けいさつがじけんのちょうさをしています。', 'Cảnh sát đang điều tra vụ án.'),
  ('事故', 'じこ', '事故', 'Danh từ', 'Tai nạn', 31, '交差点で交通事故が起きました。', 'こうさてんでこうつうじこがおきました。', 'Xảy ra tai nạn giao thông tại ngã tư.'),
  ('故障', 'こしょう', '故障', 'Danh từ', 'Hỏng hóc', 32, 'エレベーターが故障しています。', 'エレベーターがこしょうしています。', 'Thang máy đang bị hỏng.'),
  ('停電', 'ていでん', '停電', 'Danh từ', 'Mất điện', 33, '台風で街全体が停電になりました。', 'たいふうでまちぜんたいがていでんになりました。', 'Do bão nên toàn thành phố bị mất điện.'),
  ('断水', 'だんすい', '断水', 'Danh từ', 'Mất nước', 34, '工事のため明日は断水します。', 'こうじのためあしたはだんすいします。', 'Do thi công nên ngày mai sẽ mất nước.'),
  ('地震', 'じしん', '地震', 'Danh từ', 'Động đất', 35, '大きな地震が起きて驚きました。', 'おおきなじしんがおきておどろきました。', 'Xảy ra động đất lớn khiến ai cũng kinh ngạc.'),
  ('火事', 'かじ', '火事', 'Danh từ', 'Hỏa hoạn', 36, '近所で火事が発生しました。', 'きんじょがかじがはっせいしました。', 'Xảy ra hỏa hoạn ở khu hàng xóm.'),
  ('救急車', 'きゅうきゅうしゃ', '救急車', 'Danh từ', 'Xe cấp cứu', 37, '怪我人を救急車で運びます。', 'けがにんをきゅうきゅうしゃではこびます。', 'Chở người bị thương bằng xe cấp cứu.'),
  ('消防車', 'しょうぼうしゃ', '消防車', 'Danh từ', 'Xe chữa cháy', 38, '消防車が火事の現場へ急ぎます。', 'しょうぼうしゃがかじのげんばへいそぎます。', 'Xe chữa cháy gấp rút đến hiện trường hỏa hoạn.'),
  ('パトカー', 'パトカー', NULL, 'Danh từ', 'Xe cảnh sát', 39, 'パトカーがサイレンを鳴らして走ります。', 'パトカーがサイレンをならしてはしります。', 'Xe cảnh sát hú còi chạy trên đường.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 21
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

-- Lesson 47 (N4 Lesson 47, l.sort_order = 22): Items 31 to 40
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('婚約', 'こんやく', '婚約', 'Danh từ', 'Đính hôn', 31, '二人は来月婚約する予定です。', 'ふたりはらいげつこんやくするよていです。', 'Hai người định đính hôn vào tháng sau.'),
  ('結婚', 'けっこん', '結婚', 'Danh từ', 'Kết hôn', 32, '友達の結婚式に出席します。', 'ともだちのけっこんしきにしゅっせきします。', 'Tham dự lễ kết hôn của bạn.'),
  ('離婚', 'りこん', '離婚', 'Danh từ', 'Ly hôn', 33, '離婚の噂を聞いて驚きました。', 'りこんのうわさをきいておどろきました。', 'Nghe tin đồn ly hôn tôi rất kinh ngạc.'),
  ('知り合い', 'しりあい', '知り合い', 'Danh từ', 'Người quen', 34, '旅先で偶然知り合いに会いました。', 'たびさきでぐうぜんしりあいにあいました。', 'Tình cờ gặp người quen tại điểm du lịch.'),
  ('仲間', 'なかま', '仲間', 'Danh từ', 'Nhóm bạn, bạn đồng hành', 35, 'サークルの仲間と一緒に旅行します。', 'サークルのなかまといっしょにりょこうします。', 'Đi du lịch cùng bạn bè trong câu lạc bộ.'),
  ('相手', 'あいて', '相手', 'Danh từ', 'Đối phương', 36, 'テニスの試合で強い相手と戦います。', 'テニスのしあいでつよいあいてとたたかいます。', 'Thi đấu với đối thủ mạnh trong trận tennis.'),
  ('恋人', 'こいびと', '恋人', 'Danh từ', 'Người yêu', 37, '休日は恋人とデートします。', 'きゅうじつはこいびととデートします。', 'Ngày nghỉ tôi đi hẹn hò với người yêu.'),
  ('夫婦', 'ふうふ', '夫婦', 'Danh từ', 'Vợ chồng', 38, '仲が良い夫婦で羨ましいです。', 'なかによいふうふでうらやましいです。', 'Vợ chồng hòa thuận thật đáng ngưỡng mộ.'),
  ('親子', 'おやこ', '親子', 'Danh từ', 'Cha con / Mẹ con', 39, '親子で楽しく公園で遊んでいます。', 'おやこでたのしくこうえんであそんでいます。', 'Cha con chơi đùa vui vẻ ở công viên.'),
  ('家族', 'かぞく', '家族', 'Danh từ', 'Gia đình', 40, '週末は家族と一緒に食事をします。', 'しゅうまつはかぞくといっしょにしょくじをします。', 'Cuối tuần tôi ăn cơm cùng gia đình.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 22
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

-- Lesson 48 (N4 Lesson 48, l.sort_order = 23): Items 20 to 30
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('両親', 'りょうしん', '両親', 'Danh từ', 'Cha mẹ', 20, '国にいる両親に手紙を書きます。', 'くににいるりょうしんにてがみをかきます。', 'Viết thư cho cha mẹ ở quê nhà.'),
  ('親', 'おや', '親', 'Danh từ', 'Phụ huynh', 21, '親の恩に感謝します。', 'おやのおんにかんしゃします。', 'Cảm ơn công ơn của cha mẹ.'),
  ('子供', 'こども', '子供', 'Danh từ', 'Con cái, trẻ em', 22, '子供たちの成長を楽しみにしています。', 'こどもたちのせいちょうをたのしみにしています。', 'Tôi rất háo hức chờ đợi sự trưởng thành của con cái.'),
  ('教育', 'きょういく', '教育', 'Danh từ', 'Giáo dục', 23, '子供の教育について真剣に考えます。', 'こどものきょういくについてしんけんにかんがえます。', 'Suy nghĩ nghiêm túc về giáo dục con cái.'),
  ('しつけ', 'しつけ', NULL, 'Danh từ', 'Nếp sống, sự dạy dỗ', 24, '家庭でのしつけが大切です。', 'かていでのしつけがたいせつです。', 'Sự dạy dỗ nếp sống trong gia đình rất quan trọng.'),
  ('放任', 'ほうにん', '放任', 'Danh từ', 'Buông thả', 25, '子供を放任しすぎるのはよくありません。', 'こどもをほうにんしすぎるのはよくありません。', 'Buông thả con cái quá mức là không tốt.'),
  ('小遣い', 'こづかい', '小遣い', 'Danh từ', 'Tiền tiêu vặt', 26, '毎月お小遣いを定額でもらいます。', 'まいつきおこづかいをていがくでもらいます。', 'Mỗi tháng nhận tiền tiêu vặt cố định.'),
  ('アルバイト', 'アルバイト', NULL, 'Danh từ', 'Việc làm thêm Part-time', 27, '放課後に居酒屋でアルバイトをします。', 'ほうかごにいざかやでアルバイトをします。', 'Làm thêm tại quán nhậu sau giờ học.'),
  ('お小遣い帳', 'おこづかいちょう', 'お小遣い帳', 'Danh từ', 'Sổ ghi chép chi tiêu', 28, 'お小遣い帳をつけて無駄遣いを防ぎます。', 'おこづかいちょうをつけてむだづかいをふせぎます。', 'Ghi sổ chi tiêu để tránh lãng phí.'),
  ('自立', 'じりつ', '自立', 'Danh từ', 'Tự lập', 29, '大学を卒業したら自立したいです。', 'だいがくをそつぎょうしたらじりつしたいです。', 'Tốt nghiệp đại học xong tôi muốn tự lập.'),
  ('一人暮らし', 'ひとりぐらし', '一人暮らし', 'Danh từ', 'Sống một mình', 30, '来月から東京で一人暮らしを始めます。', 'らいげつからとうきょうでひとりぐらしをはじめます。', 'Từ tháng sau tôi bắt đầu sống một mình tại Tokyo.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 23
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

-- Lesson 49 (N4 Lesson 49, l.sort_order = 24): Items 22 to 32
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('社長', 'しゃちょう', '社長', 'Danh từ', 'Giám đốc', 22, '社長が社員の前でスピーチをなさいます。', 'しゃちょうがしゃいんのまえでスピーチをなさいます。', 'Giám đốc phát biểu trước toàn thể nhân viên.'),
  ('部長', 'ぶちょう', '部長', 'Danh từ', 'Trưởng phòng', 23, '部長が新しいプロジェクトをご説明になります。', 'ぶちょうがあたらしいプロジェクトをごせつめいになります。', 'Trưởng phòng giải thích về dự án mới.'),
  ('課長', 'かちょう', '課長', 'Danh từ', 'Tổ trưởng', 24, '課長にお電話をお繋ぎします。', 'かちょうにおでんわをおつなぎします。', 'Chuyển máy điện thoại cho tổ trưởng.'),
  ('お客様', 'おきゃくさま', 'お客様', 'Danh từ', 'Quý khách hàng', 25, 'お客様が応接室でお待ちです。', 'おきゃくさまがおうせつしつでおまちです。', 'Quý khách đang chờ ở phòng tiếp khách.'),
  ('先生', 'せんせい', '先生', 'Danh từ', 'Thầy/Cô giáo, Bác sĩ', 26, '先生が論文をご覧になりました。', 'せんせいがろんぶんをごらんになりました。', 'Thầy giáo đã xem qua luận văn.'),
  ('敬語', 'けいご', '敬語', 'Danh từ', 'Kính ngữ', 27, 'ビジネスでは正しい敬語を使います。', 'ビジネスではただしいけいごをつかいます。', 'Trong kinh doanh cần dùng kính ngữ chuẩn xác.'),
  ('尊敬語', 'そんけいご', '尊敬語', 'Danh từ', 'Tôn kính ngữ', 28, '目上の人に対して尊敬語を使います。', 'めうえのひとにたいしてそんけいごをつかいます。', 'Dùng tôn kính ngữ đối với người bề trên.'),
  ('謙譲語', 'けんじょうご', '謙譲語', 'Danh từ', 'Khiêm nhường ngữ', 29, '自分の動作には謙譲語を使います。', 'じぶんのどうさにはけんじょうごをつかいます。', 'Dùng khiêm nhường ngữ cho hành động của bản thân.'),
  ('丁寧語', 'ていねいご', '丁寧語', 'Danh từ', 'Lịch sự ngữ', 30, '丁寧語で話すと印象が良くなります。', 'ていねいごではなすといんしょうがよくなります。', 'Nói bằng ngữ lịch sự sẽ cho ấn tượng tốt.'),
  ('マナー', 'マナー', NULL, 'Danh từ', 'Manner, quy tắc ứng xử', 31, '食事のマナーをしっかり身につけます。', 'しょくじのマナーをしっかりみにつけます。', 'Rèn luyện quy tắc ứng xử khi ăn uống.'),
  ('礼儀', 'れいぎ', '礼儀', 'Danh từ', 'Lễ nghi, phép lịch sự', 32, '礼儀正しい態度はとても大切です。', 'れいぎただしいたたいどはとてもたいせつです。', 'Thái độ đúng lễ nghi rất quan trọng.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 24
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

-- Lesson 50 (N4 Lesson 50, l.sort_order = 25): Items 30 to 40
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status, example_jp, example_reading, example_vi)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED', v.example_jp, v.example_reading, v.example_vi
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('私ども', 'わたくしども', '私ども', 'Đại từ', 'Chúng tôi', 30, '私どもが責任を持って対応いたします。', 'わたくしどもがせきにんをもってたいおういたします。', 'Phía chúng tôi xin chịu trách nhiệm xử lý.'),
  ('弊社', 'へいしゃ', '弊社', 'Danh từ', 'Công ty chúng tôi', 31, '弊社の新サービスをご案内いたします。', 'へいしゃのしんサービスをごあんないいたします。', 'Xin giới thiệu dịch vụ mới của công ty chúng tôi.'),
  ('御社', 'おんしゃ', '御社', 'Danh từ', 'Quý công ty', 32, '御社の発展を心よりお祈り申し上げます。', 'おんしゃのはってんをこころよりおいのりもうしあげます。', 'Kính chúc quý công ty ngày càng phát triển.'),
  ('貴社', 'きしゃ', '貴社', 'Danh từ', 'Quý công ty (văn viết)', 33, '貴社の求人に応募いたします。', 'きしゃのきゅうじんにおうぼいたします。', 'Tôi xin ứng tuyển vào vị trí tuyển dụng của quý công ty.'),
  ('存じ上げます', 'ぞんじあげます', '存じ上げます', 'Cụm từ', 'Biết, quen biết', 34, '社長のお名前はよく存じ上げております。', 'しゃちょうのおなまえはよくぞんじあげております。', 'Tên của ngài chủ tịch tôi biết rất rõ.'),
  ('申し伝えます', 'もうしいつたえます', '申し伝えます', 'Động từ nhóm 2', 'Truyền đạt lại', 35, '担当者にその旨を申し伝えます。', 'たんとうしゃにそのむねをもうしいつたえます。', 'Tôi xin truyền đạt lại nội dung đó cho người phụ trách.'),
  ('承知します', 'しょうちします', '承知します', 'Động từ nhóm 3', 'Hiểu rõ, chấp thuận', 36, 'ご連絡の件、承知いたしました。', 'ごれんらくのけん、しょうちいたしました。', 'Về việc liên lạc, tôi đã hiểu rõ rồi ạ.'),
  ('かしこまりました', 'かしこまりました', NULL, 'Cụm từ', 'Tôi đã hiểu rồi ạ', 37, 'ご注文、かしこまりました。', 'ごちゅうもん、かしこまりました。', 'Yêu cầu gọi món của quý khách, tôi đã hiểu rồi ạ.'),
  ('失礼いたします', 'しつれいいたします', NULL, 'Cụm từ', 'Xin phép', 38, 'それでは、これで失礼いたします。', 'それては、これでしつれいいたします。', 'Vậy thì tôi xin phép dừng ở đây ạ.'),
  ('お邪魔いたします', 'おじゃまいたします', NULL, 'Cụm từ', 'Xin phép làm phiền', 39, 'これからお宅へお邪魔いたします。', 'これからおたくへおじゃまいたします。', 'Bây giờ tôi xin phép qua làm phiền quý gia đình.'),
  ('よろしくお伝えください', 'よろしくおつたえください', NULL, 'Cụm từ', 'Xin gửi lời hỏi thăm giúp', 40, '奥様によろしくお伝えください。', 'おくさまによろしくおつたえください。', 'Cho tôi gửi lời hỏi thăm đến phu nhân nhé.')
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order, example_jp, example_reading, example_vi)
WHERE lvl.code = 'N4' AND l.sort_order = 25
  AND NOT EXISTS (SELECT 1 FROM vocabulary v_exist WHERE v_exist.lesson_id = l.lesson_id AND v_exist.kana = v.kana AND v_exist.word = v.word);

COMMIT;
