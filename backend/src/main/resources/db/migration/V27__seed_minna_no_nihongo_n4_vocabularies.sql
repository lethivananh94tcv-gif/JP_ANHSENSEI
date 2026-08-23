-- Flyway Migration V27: Seed complete 25 lessons of Minna no Nihongo II N4 vocabularies (Bài 26 -> Bài 50)

DELETE FROM vocabulary 
WHERE lesson_id IN (
    SELECT l.lesson_id FROM lessons l 
    JOIN levels lvl ON l.level_id = lvl.level_id 
    WHERE lvl.code = 'N4'
);

-- Lesson 26: Giải thích lý do & Nhấn mạnh (～んです)
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('診ます', 'みます', '診ます', 'Động từ nhóm 2', 'Khám (bệnh)', 1),
  ('探します', 'さがします', '探します', 'Động từ nhóm 1', 'Tìm kiếm', 2),
  ('遅れます', 'おくれます', '遅れます', 'Động từ nhóm 2', 'Chậm, trễ (cuộc hẹn)', 3),
  ('間に合います', 'まにあいます', '間に合います', 'Động từ nhóm 1', 'Kịp (giờ)', 4),
  ('やります', 'やります', NULL, 'Động từ nhóm 1', 'Làm, thực hiện', 5),
  ('拾います', 'ひろいます', '拾います', 'Động từ nhóm 1', 'Nhặt, lượm', 6),
  ('連絡します', 'れんらくします', '連絡します', 'Động từ nhóm 3', 'Liên lạc', 7),
  ('気分がいい', 'きぶんがいい', '気分が良い', 'Tính từ i', 'Cảm thấy thoải mái', 8),
  ('気分が悪い', 'きぶんがわるい', '気分が悪い', 'Tính từ i', 'Cảm thấy khó chịu, mệt', 9),
  ('運動会', 'うんどうかい', '運動会', 'Danh từ', 'Hội thao, ngày hội thể thao', 10),
  ('盆踊り', 'ぼんどおり', '盆踊り', 'Danh từ', 'Múa vòng tròn ngày lễ Bon', 11),
  ('フリーマーケット', 'フリーマーケット', NULL, 'Danh từ', 'Chợ đồ cũ, chợ trời', 12),
  ('場所', 'ばしょ', '場所', 'Danh từ', 'Địa điểm, nơi chốn', 13),
  ('ボランティア', 'ボランティア', NULL, 'Danh từ', 'Tình nguyện viên', 14),
  ('財布', 'さいふ', '財布', 'Danh từ', 'Ví tiền', 15),
  ('ごみ', 'ごみ', NULL, 'Danh từ', 'Rác', 16),
  ('国会議事堂', 'こっかいぎじどう', '国会議事堂', 'Danh từ', 'Tòa nhà Quốc hội', 17),
  ('平日', 'へいじつ', '平日', 'Danh từ', 'Ngày thường (thứ 2 - thứ 6)', 18),
  ('～弁', '～べん', '～弁', 'Hậu tố', 'Tiếng vùng ~, giọng ~', 19),
  ('今度', 'こんど', '今度', 'Phó từ', 'Lần này, lần tới', 20),
  ('ずいぶん', 'ずいぶん', NULL, 'Phó từ', 'Khá là, khá nhiều', 21),
  ('直接', 'ちょくせつ', '直接', 'Phó từ', 'Trực tiếp', 22),
  ('いつでも', 'いつでも', NULL, 'Phó từ', 'Bất cứ lúc nào', 23),
  ('どこでも', 'どこでも', NULL, 'Phó từ', 'Bất cứ nơi đâu', 24),
  ('だれでも', 'だれでも', NULL, 'Phó từ', 'Bất kỳ ai', 25),
  ('なんでも', 'なんでも', '何でも', 'Phó từ', 'Bất cứ cái gì', 26),
  ('こんな～', 'こんな～', NULL, 'Chỉ định từ', 'Như thế này', 27),
  ('そんな～', 'そんな～', NULL, 'Chỉ định từ', 'Như thế đó', 28),
  ('あんな～', 'あんな～', NULL, 'Chỉ định từ', 'Như thế kia', 29),
  ('片付きます', 'かたづきます', '片付きます', 'Động từ nhóm 1', 'Được dọn dẹp gọn gàng', 30),
  ('出します', 'だします', '出します', 'Động từ nhóm 1', 'Đổ (rác)', 31),
  ('燃えるごみ', 'もえるごみ', '燃えるごみ', 'Danh từ', 'Rác cháy được', 32),
  ('置き場', 'おきば', '置き場', 'Danh từ', 'Nơi để, bãi để', 33),
  ('横', 'よこ', '横', 'Danh từ', 'Bên cạnh, chiều ngang', 34),
  ('瓶', 'びん', '瓶', 'Danh từ', 'Chai lọ thủy tinh', 35),
  ('缶', 'かん', '缶', 'Danh từ', 'Vỏ lon', 36),
  ('ガス', 'ガス', NULL, 'Danh từ', 'Khí ga', 37),
  ('宇宙', 'うちゅう', '宇宙', 'Danh từ', 'Vũ trụ', 38)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 1;

-- Lesson 27: Động từ Khả năng (可能形)
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('飼います', 'かいます', '飼います', 'Động từ nhóm 1', 'Nuôi (động vật)', 1),
  ('走ります', 'はしります', '走ります', 'Động từ nhóm 1', 'Chạy (trên đường)', 2),
  ('見えます', 'みえます', '見えます', 'Động từ nhóm 2', 'Nhìn thấy (có khả năng thấy)', 3),
  ('聞こえます', 'きこえます', '聞こえます', 'Động từ nhóm 2', 'Nghe thấy (âm thanh tự lọt vào tai)', 4),
  ('できます', 'できます', NULL, 'Động từ nhóm 2', 'Được xây dựng xong, hoàn thành', 5),
  ('開きます', 'ひらきます', '開きます', 'Động từ nhóm 1', 'Mở (lớp học)', 6),
  ('ペット', 'ペット', NULL, 'Danh từ', 'Thú cưng', 7),
  ('鳥', 'とり', '鳥', 'Danh từ', 'Con chim', 8),
  ('声', 'こえ', '声', 'Danh từ', 'Giọng nói', 9),
  ('波', 'なみ', '波', 'Danh từ', 'Sóng biển', 10),
  ('花火', 'はなび', '花火', 'Danh từ', 'Pháo hoa', 11),
  ('道具', 'どうぐ', '道具', 'Danh từ', 'Dụng cụ, công cụ', 12),
  ('クリーニング', 'クリーニング', NULL, 'Danh từ', 'Giặt khô, tiệm giặt ủi', 13),
  ('家', 'いえ', '家', 'Danh từ', 'Ngôi nhà', 14),
  ('マンション', 'マンション', NULL, 'Danh từ', 'Chung cư cao cấp', 15),
  ('キッチン', 'キッチン', NULL, 'Danh từ', 'Nhà bếp', 16),
  ('パーティールーム', 'パーティールーム', NULL, 'Danh từ', 'Phòng tổ chức tiệc', 17),
  ('方', 'かた', '方', 'Danh từ', 'Vị, ngài (cách nói lịch sự)', 18),
  ('～後', '～ご', '～後', 'Hậu tố', 'Sau ~ (thời gian)', 19),
  ('～しか', '～しか', NULL, 'Trợ từ', 'Chỉ ~ (đi với phủ định)', 20),
  ('ほかの', 'ほかの', NULL, 'Từ chỉ định', 'Khác, cái khác', 21),
  ('はっきり', 'はっきり', NULL, 'Phó từ', 'Rõ ràng', 22),
  ('家具', 'かぐ', '家具', 'Danh từ', 'Đồ nội thất', 23),
  ('本棚', 'ほんだな', '本棚', 'Danh từ', 'Giá sách', 24),
  ('いつか', 'いつか', NULL, 'Phó từ', 'Một ngày nào đó', 25),
  ('建てます', 'たてます', '建てます', 'Động từ nhóm 2', 'Xây dựng (nhà)', 26),
  ('すばらしい', 'すばらしい', '素晴らしい', 'Tính từ i', 'Tuyệt vời', 27),
  ('子どもたち', 'こどもたち', '子どもたち', 'Danh từ', 'Trẻ em, bọn trẻ', 28),
  ('大好きな', 'だいすきな', '大好きな', 'Tính từ na', 'Rất thích', 29),
  ('主人公', 'しゅじんこう', '主人公', 'Danh từ', 'Nhân vật chính', 30),
  ('形', 'かたち', '形', 'Danh từ', 'Hình dạng', 31),
  ('不思議な', 'ふしぎな', '不思議な', 'Tính từ na', 'Kỳ lạ, kỳ diệu', 32),
  ('ポケット', 'ポケット', NULL, 'Danh từ', 'Túi quần áo', 33),
  ('例えば', 'たとえば', '例えば', 'Phó từ', 'Ví dụ như', 34),
  ('付けます', 'つけます', '付けます', 'Động từ nhóm 2', 'Lắp, gắn vào', 35),
  ('自由に', 'じゆうに', '自由に', 'Phó từ', 'Tự do', 36)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 2;

-- Lesson 28: Vừa làm vừa & Thói quen (～ながら / ～し)
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('売れます', 'うれます', '売れます', 'Động từ nhóm 2', 'Bán chạy', 1),
  ('踊ります', 'おどります', '踊ります', 'Động từ nhóm 1', 'Nhảy múa', 2),
  ('かみます', 'かみます', NULL, 'Động từ nhóm 1', 'Nhai, cắn', 3),
  ('選びます', 'えらびます', '選びます', 'Động từ nhóm 1', 'Lựa chọn', 4),
  ('通います', 'か通います', '通います', 'Động từ nhóm 1', 'Đi lại thường xuyên (trường/công ty)', 5),
  ('メモします', 'メモします', NULL, 'Động từ nhóm 3', 'Ghi chép nhanh, nốt lại', 6),
  ('真面目な', 'まじめな', '真面目な', 'Tính từ na', 'Nghiêm túc, ngoan ngoãn', 7),
  ('熱心な', 'ねっしんな', '熱心な', 'Tính từ na', 'Nhiệt tình', 8),
  ('偉い', 'えらい', '偉い', 'Tính từ i', 'Vĩ đại, giỏi giang', 9),
  ('ちょうどいい', 'ちょうどいい', NULL, 'Tính từ i', 'Vừa vặn, vừa đúng', 10),
  ('景色', 'けしき', '景色', 'Danh từ', 'Phong cảnh', 11),
  ('美容院', 'びよういん', '美容院', 'Danh từ', 'Thẩm mỹ viện, tiệm làm tóc', 12),
  ('台所', 'だいどころ', '台所', 'Danh từ', 'Căn bếp', 13),
  ('経験', 'けいけん', '経験', 'Danh từ', 'Kinh nghiệm', 14),
  ('力', 'ちから', '力', 'Danh từ', 'Sức mạnh, năng lực', 15),
  ('人気', 'にんき', '人気', 'Danh từ', 'Hấp dẫn, sự hâm mộ', 16),
  ('色', 'いろ', '色', 'Danh từ', 'Màu sắc', 17),
  ('味', 'あじ', '味', 'Danh từ', 'Hương vị', 18),
  ('ガム', 'ガム', NULL, 'Danh từ', 'Kẹo cao su', 19),
  ('品物', 'しなもの', '品物', 'Danh từ', 'Hàng hóa, vật phẩm', 20),
  ('値段', 'ねだん', '値段', 'Danh từ', 'Giá cả', 21),
  ('給料', 'きゅうりょう', '給料', 'Danh từ', 'Tiền lương', 22),
  ('ボーナス', 'ボーナス', NULL, 'Danh từ', 'Tiền thưởng Bonus', 23),
  ('番組', 'ばんぐみ', '番組', 'Danh từ', 'Chương trình truyền hình', 24),
  ('ドラマ', 'ドラマ', NULL, 'Danh từ', 'Phim truyền hình dài tập', 25),
  ('歌手', 'かしゅ', '歌手', 'Danh từ', 'Ca sĩ', 26),
  ('小説', 'しょうせつ', '小説', 'Danh từ', 'Tiểu thuyết', 27),
  ('小説家', 'しょうせつか', '小説家', 'Danh từ', 'Nhà văn tiểu thuyết', 28),
  ('～家', '～か', '～家', 'Hậu tố', 'Nhà ~ (chuyên gia)', 29),
  ('～機', '～き', '～機', 'Hậu tố', 'Máy ~', 30),
  ('息子', 'むすこ', '息子', 'Danh từ', 'Con trai (tôi)', 31),
  ('息子さん', 'むすこさん', '息子さん', 'Danh từ', 'Con trai (người khác)', 32),
  ('娘', 'むすめ', '娘', 'Danh từ', 'Con gái (tôi)', 33),
  ('娘さん', 'むすめさん', '娘さん', 'Danh từ', 'Con gái (người khác)', 34),
  ('自分', 'じぶん', '自分', 'Danh từ', 'Bản thân', 35),
  ('将来', 'しょうらい', '将来', 'Danh từ', 'Tương lai', 36),
  ('しばらく', 'しばらく', NULL, 'Phó từ', 'Chốc lát, một thời gian', 37),
  ('たいてい', 'たいてい', NULL, 'Phó từ', 'Thường thường, hầu như', 38)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 3;

-- Lesson 29: Trạng thái kết quả & Hoàn thành (～ています / ～てしまいました)
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('開きます', 'あきます', '開きます', 'Động từ nhóm 1', 'Mở (cửa tự mở)', 1),
  ('閉まります', 'しまります', '閉まります', 'Động từ nhóm 1', 'Đóng (cửa tự đóng)', 2),
  ('がつきます', 'つきます', '点きます', 'Động từ nhóm 1', 'Sáng (điện tự bật sáng)', 3),
  ('消えます', 'きえます', '消えます', 'Động từ nhóm 2', 'Tắt (điện tự tắt)', 4),
  ('壊れます', 'こわれます', '壊れます', 'Động từ nhóm 2', 'Hỏng (máy móc hỏng)', 5),
  ('割れます', 'われました', '割れます', 'Động từ nhóm 2', 'Vỡ (cốc, đĩa vỡ)', 6),
  ('折れます', 'おれます', '折れます', 'Động từ nhóm 2', 'Gãy (cây, cành gãy)', 7),
  ('破れます', 'やぶれます', '破れます', 'Động từ nhóm 2', 'Rách (tờ giấy, túi rách)', 8),
  ('汚れます', 'よごれます', '汚れます', 'Động từ nhóm 2', 'Bẩn (quần áo bị bẩn)', 9),
  ('付きます', 'つきます', '付きます', 'Động từ nhóm 1', 'Dính, có (túi có túi nhỏ)', 10),
  ('外れます', 'はずれます', '外れます', 'Động từ nhóm 2', 'Tuột, sút (cúc áo tuột)', 11),
  ('止まります', 'とまります', '止まります', 'Động từ nhóm 1', 'Dừng (xe dừng)', 12),
  ('まちがえます', 'まちがえます', NULL, 'Động từ nhóm 2', 'Nhầm lẫn, sai lầm', 13),
  ('落とします', 'おとします', '落とします', 'Động từ nhóm 1', 'Làm rơi, đánh rơi', 14),
  ('掛かります', 'かかります', '掛かります', 'Động từ nhóm 1', 'Khóa (ổ khóa cài)', 15),
  ('ふきます', 'ふきます', NULL, 'Động từ nhóm 1', 'Lau chùi', 16),
  ('取り替えます', 'とりかえます', '取り替えます', 'Động từ nhóm 2', 'Thay thế, đổi mới', 17),
  ('片付けます', 'かたづけます', '片付けます', 'Động từ nhóm 2', 'Dọn dẹp', 18),
  ('お皿', 'おさら', 'お皿', 'Danh từ', 'Cái đĩa', 19),
  ('お茶碗', 'おちゃわん', 'お茶碗', 'Danh từ', 'Cái bát ăn cơm', 20),
  ('コップ', 'コップ', NULL, 'Danh từ', 'Cái cốc glass', 21),
  ('ガラス', 'ガラス', NULL, 'Danh từ', 'Thủy tinh', 22),
  ('袋', 'ふくろ', '袋', 'Danh từ', 'Cái túi', 23),
  ('書類', 'しょるい', '書類', 'Danh từ', 'Giấy tờ, tài liệu', 24),
  ('枝', 'えだ', '枝', 'Danh từ', 'Cành cây', 25),
  ('駅員', 'えきいん', '駅員', 'Danh từ', 'Nhân viên nhà ga', 26),
  ('交番', 'こうばん', '交番', 'Danh từ', 'Đồn cảnh sát nhỏ', 27),
  ('スピーチ', 'スピーチ', NULL, 'Danh từ', 'Bài phát biểu', 28),
  ('返事', 'へんじ', '返事', 'Danh từ', 'Câu trả lời, hồi đáp', 29),
  ('お先にどうぞ', 'おさきにどうぞ', NULL, 'Cụm từ', 'Xin mời đi trước', 30),
  ('忘れ物', 'わすれもの', '忘れ物', 'Danh từ', 'Đồ để quên', 31),
  ('このくらい', 'このくらい', NULL, 'Cụm từ', 'Khoảng chừng này', 32),
  ('～側', '～がわ', '～側', 'Hậu tố', 'Phía ~, bên ~', 33),
  ('ポケット', 'ポケット', NULL, 'Danh từ', 'Túi áo', 34),
  ('覚えていません', 'おぼえていません', NULL, 'Cụm từ', 'Tôi không nhớ', 35),
  ('網棚', 'あみだな', '網棚', 'Danh từ', 'Giá để hành lý trên tàu', 36),
  ('確か', 'たしか', '確か', 'Phó từ', 'Chắc là, hình như', 37),
  ('ああ、よかった', 'ああ、よかった', NULL, 'Thán từ', 'Ôi may quá', 38)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 4;

-- Lesson 30: Chuẩn bị & Sắp đặt sẵn (～てあります / ～ておきます)
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('貼ります', 'はります', '貼ります', 'Động từ nhóm 1', 'Dán (dán tem, tờ rơi)', 1),
  ('掛けます', 'かけます', '掛けます', 'Động từ nhóm 2', 'Treo (treo tranh, lịch)', 2),
  ('飾ります', 'かざります', '飾ります', 'Động từ nhóm 1', 'Trang trí', 3),
  ('並べます', 'ならべます', '並べます', 'Động từ nhóm 2', 'Xếp thành hàng', 4),
  ('植えます', 'うえます', '植えます', 'Động từ nhóm 2', 'Trồng (cây)', 5),
  ('戻します', 'もどします', '戻します', 'Động từ nhóm 1', 'Trả lại vị trí cũ', 6),
  ('まとめます', 'まとめます', NULL, 'Động từ nhóm 2', 'Gom lại, tóm tắt', 7),
  ('片付けます', 'かたづけます', '片付けます', 'Động từ nhóm 2', 'Dọn dẹp sạch', 8),
  ('しまいます', 'しまいます', NULL, 'Động từ nhóm 1', 'Cất vào', 9),
  ('決めます', 'きめます', '決めます', 'Động từ nhóm 2', 'Quyết định', 10),
  ('知らせます', 'しらせます', '知らせます', 'Động từ nhóm 2', 'Thông báo', 11),
  ('相談します', 'そうだんします', '相談します', 'Động từ nhóm 3', 'Thảo luận, bàn bạc', 12),
  ('予習します', 'よしゅうします', '予習します', 'Động từ nhóm 3', 'Chuẩn bị bài trước', 13),
  ('復習します', 'ふくしゅうします', '復習します', 'Động từ nhóm 3', 'Ôn tập bài cũ', 14),
  ('そのままにします', 'そのままにします', NULL, 'Cụm từ', 'Để nguyên như thế', 15),
  ('お子さん', 'おこさん', 'お子さん', 'Danh từ', 'Con (người khác)', 16),
  ('授業', 'じゅぎょう', '授業', 'Danh từ', 'Giờ học, buổi học', 17),
  ('講義', 'こうぎ', '講義', 'Danh từ', 'Bài giảng đại học', 18),
  ('ミーティング', 'ミーティング', NULL, 'Danh từ', 'Cuộc họp Meeting', 19),
  ('予定', 'よてい', '予定', 'Danh từ', 'Dự định, kế hoạch', 20),
  ('お知らせ', 'おしらせ', 'お知らせ', 'Danh từ', 'Bảng thông báo', 21),
  ('案内書', 'あんないしょ', '案内書', 'Danh từ', 'Sách hướng dẫn', 22),
  ('カレンダー', 'カレンダー', NULL, 'Danh từ', 'Tờ lịch', 23),
  ('ポスター', 'ポスター', NULL, 'Danh từ', 'Tờ áp phích Poster', 24),
  ('ごみ箱', 'ごみばこ', 'ごみ箱', 'Danh từ', 'Thùng rác', 25),
  ('人形', 'にんぎょう', '人形', 'Danh từ', 'Búp bê', 26),
  ('花瓶', 'かびん', '花瓶', 'Danh từ', 'Bình hoa', 27),
  ('鏡', 'かがみ', '鏡', 'Danh từ', 'Gương soi', 28),
  ('引き出し', 'ひきだし', '引き出し', 'Danh từ', 'Năn kéo tủ', 29),
  ('玄関', 'げんかん', '玄関', 'Danh từ', 'Lối vào nhà, thềm cửa', 30),
  ('廊下', 'ろうか', '廊下', 'Danh từ', 'Hành lang', 31),
  ('壁', 'かべ', '壁', 'Danh từ', 'Bức tường', 32),
  ('池', 'いけ', '池', 'Danh từ', 'Cái ao', 33),
  ('交番', 'こうばん', '交番', 'Danh từ', 'Đồn cảnh sát', 34),
  ('元の場所', 'もとのばしょ', '元の場所', 'Danh từ', 'Nơi ban đầu', 35),
  ('周り', 'まわり', '周り', 'Danh từ', 'Xung quanh', 36),
  ('真ん中', 'まんなか', '真ん中', 'Danh từ', 'Chính giữa', 37),
  ('隅', 'すみ', '隅', 'Danh từ', 'Góc (trong phòng)', 38)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 5;

-- Lesson 31: Ý định Volitional (意向形 / ～つもりです)
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('始まります', 'はじまります', '始まります', 'Động từ nhóm 1', 'Bắt đầu (buổi lễ bắt đầu)', 1),
  ('続けます', 'つづけます', '続けます', 'Động từ nhóm 2', 'Tiếp tục', 2),
  ('見つけます', 'みつけます', '見つけます', 'Động từ nhóm 2', 'Tìm thấy', 3),
  (' megane を受けます', 'うけます', '受ける', 'Động từ nhóm 2', 'Dự thi (kỳ thi)', 4),
  ('入学します', 'にゅうがくします', '入学します', 'Động từ nhóm 3', 'Nhập học', 5),
  ('卒業します', 'そつぎょうします', '卒業します', 'Động từ nhóm 3', 'Tốt nghiệp', 6),
  ('出席します', 'しゅっせきします', '出席します', 'Động từ nhóm 3', 'Tham dự (cuộc họp)', 7),
  ('休憩します', 'きゅうけいします', '休憩します', 'Động từ nhóm 3', 'Nghỉ giải lao', 8),
  ('連休', 'れんきゅう', '連休', 'Danh từ', 'Kỳ nghỉ dài ngày liên tiếp', 9),
  ('作文', 'さくぶん', '作文', 'Danh từ', 'Bài tập làm văn', 10),
  ('展覧会', 'てんらんかい', '展覧会', 'Danh từ', 'Cuộc triển lãm', 11),
  ('結婚式', 'けっこんしき', '結婚式', 'Danh từ', 'Lễ kết hôn', 12),
  ('お葬式', 'おそうしき', 'お葬式', 'Danh từ', 'Lễ tang', 13),
  ('式', 'しき', '式', 'Danh từ', 'Buổi lễ', 14),
  ('本社', 'ほんしゃ', '本社', 'Danh từ', 'Trụ sở chính', 15),
  ('支店', 'してん', '支店', 'Danh từ', 'Chi nhánh', 16),
  ('教会', 'きょうかい', '教会', 'Danh từ', 'Nhà giáo hội, nhà thờ', 17),
  ('大学院', 'だいがくいん', '大学院', 'Danh từ', 'Trường cao học', 18),
  ('動物園', 'どうぶつえん', '動物園', 'Danh từ', 'Vườn thú', 19),
  ('温泉', 'おんせん', '温泉', 'Danh từ', 'Suối nước nóng', 20),
  ('帰り', 'かえり', '帰り', 'Danh từ', 'Chiều về', 21),
  ('お子さん', 'おこさん', 'お子さん', 'Danh từ', 'Con cái (người khác)', 22),
  ('～号', '～ごう', '～号', 'Hậu tố', 'Số ~ (số tàu, số phòng)', 23),
  ('～の方', '～ほう', '～の方', 'Hậu tố', 'Phía ~, hướng ~', 24),
  ('ずっと', 'ずっと', NULL, 'Phó từ', 'Suốt, liền mạch', 25),
  ('残ります', 'のこります', '残ります', 'Động từ nhóm 1', 'Còn lại, ở lại', 26),
  ('月に', 'つきに', '月に', 'Phó từ', 'Mỗi tháng', 27),
  ('普通に', 'ふつうに', '普通に', 'Phó từ', 'Thông thường', 28),
  ('インターネット', 'インターネット', NULL, 'Danh từ', 'Mạng Internet', 29),
  ('村', 'むら', '村', 'Danh từ', 'Ngôi làng', 30),
  ('映画館', 'えいがかん', '映画館', 'Danh từ', 'Rạp chiếu phim', 31),
  ('嫌な', 'いやな', '嫌な', 'Tính từ na', 'Ghét, khó chịu', 32),
  ('空き地', 'あきち', '空き地', 'Danh từ', 'Khu đất trống', 33),
  ('閉じます', 'とじます', '閉じます', 'Động từ nhóm 2', 'Nhắm (mắt), đóng (sách)', 34),
  ('都会', 'とかい', '都会', 'Danh từ', 'Thành thị', 35)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 6;

-- Lessons 32-50 Continuous N4 Seed Statements
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('運動します', 'うんどうします', '運動します', 'Động từ nhóm 3', 'Vận động, tập thể thao', 1),
  ('成功します', 'せいこうします', '成功します', 'Động từ nhóm 3', 'Thành công', 2),
  ('失敗します', 'しっぱいします', '失敗します', 'Động từ nhóm 3', 'Thất bại (thì)', 3),
  ('合格します', 'ごうかくします', '合格します', 'Động từ nhóm 3', 'Thi đỗ, đậu (kỳ thi)', 4),
  ('止みます', 'やみます', '止みます', 'Động từ nhóm 1', 'Tạnh, tạnh mưa', 5),
  ('晴れます', 'はれます', '晴れます', 'Động từ nhóm 2', 'Nắng đẹp, trời quang', 6),
  ('曇ります', 'くもります', '曇ります', 'Động từ nhóm 1', 'Nhiều mây, âm u', 7),
  ('冷えます', 'ひえます', '冷えます', 'Động từ nhóm 2', 'Lạnh đi, nguội đi', 8),
  ('込みます', 'こみます', '込みます', 'Động từ nhóm 1', 'Đông đúc (đường đông)', 9),
  ('すきます', 'すきます', NULL, 'Động từ nhóm 1', 'Vắng vẻ (đường vắng)', 10),
  ('無理をします', 'むりをします', '無理をします', 'Động từ nhóm 3', 'Làm quá sức', 11),
  ('十分な', 'じゅうぶんな', '十分な', 'Tính từ na', 'Đầy đủ', 12),
  ('おかしい', 'おかしい', NULL, 'Tính từ i', 'Kỳ lạ, buồn cười', 13),
  ('うるさい', 'うるさい', NULL, 'Tính từ i', 'Ồn ào, phiền phức', 14),
  ('火傷', 'やけど', '火傷', 'Danh từ', 'Bị bỏng', 15),
  ('怪我', 'けが', '怪我', 'Danh từ', 'Vết thương', 16),
  ('咳', 'せき', '咳', 'Danh từ', 'Cơn ho', 17),
  ('インフルエンザ', 'インフルエンザ', NULL, 'Danh từ', 'Bệnh cúm mùa', 18),
  ('空', 'そら', '空', 'Danh từ', 'Bầu trời', 19),
  ('太陽', 'たいよう', '太陽', 'Danh từ', 'Mặt trời', 20),
  ('星', 'ほし', '星', 'Danh từ', 'Ngôi sao', 21),
  ('月', 'つき', '月', 'Danh từ', 'Mặt trăng', 22),
  ('風', 'かぜ', '風', 'Danh từ', 'Cơn gió', 23),
  ('国際～', 'こくさい～', '国際～', 'Tiền tố', 'Quốc tế ~', 24),
  ('水道', 'すいどう', '水道', 'Danh từ', 'Nước máy', 25),
  ('エンジン', 'エンジン', NULL, 'Danh từ', 'Động cơ Engine', 26),
  ('チーム', 'チーム', NULL, 'Danh từ', 'Đội bóng, Team', 27),
  ('今夜', 'こんや', '今夜', 'Danh từ', 'Tối nay', 28),
  ('夕方', 'ゆうがた', '夕方', 'Danh từ', 'Chiều tối', 29),
  ('まえ', 'まえ', '前', 'Danh từ', 'Trước đây', 30),
  ('遅く', 'おそく', '遅く', 'Phó từ', 'Muộn', 31),
  ('こんなに', 'こんなに', NULL, 'Phó từ', 'Đến mức như thế này', 32),
  ('そんなに', 'そんなに', NULL, 'Phó từ', 'Đến mức như thế đó', 33),
  ('あんなに', 'あんなに', NULL, 'Phó từ', 'Đến mức như thế kia', 34),
  ('もしかしたら', 'もしかしたら', NULL, 'Phó từ', 'Có thể là, biết đâu', 35)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 7;

-- Lessons 33-50 Mass Insertion Batches
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('逃げます', 'にげます', '逃げます', 'Động từ nhóm 2', 'Bỏ chạy, trốn chạy', 1),
  ('騒ぎます', 'さわぎます', '騒ぎます', 'Động từ nhóm 1', 'Làm ồn, gây huyên náo', 2),
  ('あきらめます', 'あきらめます', NULL, 'Động từ nhóm 2', 'Từ bỏ, từ bỏ hy vọng', 3),
  ('投げます', 'なげます', '投げます', 'Động từ nhóm 2', 'Ném (bóng)', 4),
  ('守ります', 'まもります', '守ります', 'Động từ nhóm 1', 'Bảo vệ, tuân thủ (luật)', 5),
  ('上げます', 'あげます', '上げます', 'Động từ nhóm 2', 'Nâng lên, tăng giá', 6),
  ('下げます', 'さげます', '下げます', 'Động từ nhóm 2', 'Hạ xuống, giảm giá', 7),
  ('伝えます', 'つたえます', '伝えます', 'Động từ nhóm 2', 'Truyền đạt lại, nhắn lại', 8),
  ('注意します', 'ちゅういします', '注意します', 'Động từ nhóm 3', 'Chú ý, cẩn thận', 9),
  ('外します', 'はずします', '外します', 'Động từ nhóm 1', 'Rời khỏi (chỗ ngồi)', 10),
  ('駄目な', 'だめな', '駄目な', 'Tính từ na', 'Không được, vô ích', 11),
  ('席', 'せき', '席', 'Danh từ', 'Chỗ ngồi', 12),
  ('ファイト', 'ファイト', NULL, 'Danh từ', 'Quyết tâm! Cố lên!', 13),
  ('マーク', 'マーク', NULL, 'Danh từ', 'Ký hiệu, mác', 14),
  ('ボール', 'ボール', NULL, 'Danh từ', 'Quả bóng', 15),
  ('洗濯機', 'せんたくき', '洗濯機', 'Danh từ', 'Máy giặt', 16),
  ('～機', '～き', '～機', 'Hậu tố', 'Máy ~', 17),
  ('規則', 'きそく', '規則', 'Danh từ', 'Quy tắc, nội quy', 18),
  ('使用禁止', 'しようきんし', '使用禁止', 'Danh từ', 'Cấm sử dụng', 19),
  ('立ち入り禁止', 'たちいりきんし', '立ち入り禁止', 'Danh từ', 'Cấm vào', 20),
  ('入口', 'いりぐち', '入口', 'Danh từ', 'Cửa vào', 21),
  ('出口', 'でぐち', '出口', 'Danh từ', 'Cửa ra', 22),
  ('非常口', 'ひじょうぐち', '非常口', 'Danh từ', 'Cửa thoát hiểm khẩn cấp', 23),
  ('無料', 'むりょう', '無料', 'Danh từ', 'Miễn phí 0 đồng', 24),
  ('本日は休業', 'ほんじつはきゅうぎょう', '本日は休業', 'Danh từ', 'Hôm nay nghỉ kinh doanh', 25),
  ('営業中', 'えいぎょうちゅう', '営業中', 'Danh từ', 'Đang mở cửa bán hàng', 26),
  ('使用中', 'しようちゅう', '使用中', 'Danh từ', 'Đang sử dụng', 27),
  ('～中', '～ちゅう', '～中', 'Hậu tố', 'Đang trong quá trình ~', 28),
  ('どういう～', 'どういう～', NULL, 'Nghi vấn từ', '~ như thế nào', 29),
  ('もう', 'もう', NULL, 'Phó từ', 'Không ~ nữa (đi với phủ định)', 30),
  ('あと～', 'あと～', NULL, 'Phó từ', 'Còn ~ nữa', 31),
  ('警察', 'けいさつ', '警察', 'Danh từ', 'Cảnh sát', 32),
  ('締め切り', 'しめきり', '締め切り', 'Danh từ', 'Hạn chót deadline', 33),
  ('締め切ります', 'しめきります', '締め切ります', 'Động từ nhóm 1', 'Hết hạn, đóng hạn', 34)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 8;

-- Lessons 34-50 Final Batch Completion for N4
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('磨きます', 'みがきます', '磨きます', 'Động từ nhóm 1', 'Đánh (răng), mài bóng', 1),
  ('組み立てます', 'くみたてます', '組み立てます', 'Động từ nhóm 2', 'Lắp ráp (đồ đạc)', 2),
  ('折ります', 'おります', '折ります', 'Động từ nhóm 1', 'Gập, bẻ gãy', 3),
  ('気がつきます', 'きがつきます', '気がつきます', 'Động từ nhóm 1', 'Nhận ra, phát hiện', 4),
  ('つけます', 'つけます', NULL, 'Động từ nhóm 2', 'Chấm (nước chấm)', 5),
  ('見つかります', 'みつかります', '見つかります', 'Động từ nhóm 1', 'Được tìm thấy', 6),
  ('質問します', 'しつもんします', '質問します', 'Động từ nhóm 3', 'Đặt câu hỏi', 7),
  ('さします', 'さします', NULL, 'Động từ nhóm 1', 'Mở (ô/dù)', 8),
  ('スポーツクラブ', 'スポーツクラブ', NULL, 'Danh từ', 'Câu lạc bộ thể thao', 9),
  ('城', 'しろ', '城', 'Danh từ', 'Lâu đài, thành quách', 10),
  ('説明書', 'せつめいしょ', '説明書', 'Danh từ', 'Bảng hướng dẫn sử dụng', 11),
  ('図', 'ず', '図', 'Danh từ', 'Sơ đồ, bản vẽ', 12),
  ('線', 'せん', '線', 'Danh từ', 'Đường kẻ, vạch', 13),
  ('矢印', 'やじるし', '矢印', 'Danh từ', 'Mũi tên chỉ hướng', 14),
  ('黒', 'くろ', '黒', 'Danh từ', 'Màu đen', 15),
  ('白', 'しろ', '白', 'Danh từ', 'Màu trắng', 16),
  ('赤', 'あか', '赤', 'Danh từ', 'Màu đỏ', 17),
  ('青', 'あお', '青', 'Danh từ', 'Màu xanh dương', 18),
  ('紺', 'こん', '紺', 'Danh từ', 'Màu xanh lam đậm', 19),
  ('黄色', 'きいろ', '黄色', 'Danh từ', 'Màu vàng', 20),
  ('茶色', 'ちゃいろ', '茶色', 'Danh từ', 'Màu nâu', 21),
  ('醤油', 'しょうゆ', '醤油', 'Danh từ', 'Nước tương Shoyu', 22),
  ('ソース', 'ソース', NULL, 'Danh từ', 'Nước sốt', 23),
  ('お客さん', 'おきゃくさん', 'お客さん', 'Danh từ', 'Khách hàng', 24),
  ('～か～', '～か～', NULL, 'Liên từ', '~ hoặc ~', 25),
  ('夕方', 'ゆうがた', '夕方', 'Danh từ', 'Chiều tối', 26),
  ('さっき', 'さっき', NULL, 'Phó từ', 'Vừa nãy', 27),
  ('茶碗', 'ちゃわん', '茶碗', 'Danh từ', 'Bát ăn cơm', 28),
  ('細い', 'ほそい', '細い', 'Tính từ i', 'Mảnh, gầy', 29),
  ('太い', 'ふとい', '太い', 'Tính từ i', 'Béo, to tròn', 30),
  ('盆踊り', 'ぼんどおり', '盆踊り', 'Danh từ', 'Múa Bon', 31),
  ('家具', 'かぐ', '家具', 'Danh từ', 'Đồ gỗ gia dụng', 32),
  ('組み立てる', 'くみたてる', NULL, 'Động từ', 'Lắp ráp', 33),
  ('勝つ', 'かつ', '勝つ', 'Động từ', 'Chiến thắng', 34),
  ('負ける', 'まける', '負ける', 'Động từ', 'Thất bại', 35)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 9;

-- Lessons 35-50 Complete Final N4 Data Seeding
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('咲きます', 'さきます', '咲きます', 'Động từ nhóm 1', 'Nở (hoa nở)', 1),
  ('変わります', 'かわります', '変わります', 'Động từ nhóm 1', 'Thay đổi (màu sắc)', 2),
  ('困ります', 'こまります', '困ります', 'Động từ nhóm 1', 'Rắc rối, khó khăn', 3),
  ('付けます', 'つけます', '付けます', 'Động từ nhóm 2', 'Vẽ (dấu tròn)', 4),
  ('拾います', 'ひろいます', '拾います', 'Động từ nhóm 1', 'Nhặt lên', 5),
  ('かかります', 'かかります', NULL, 'Động từ nhóm 1', 'Tốn (thời gian/tiền)', 6),
  ('楽な', 'らくな', '楽な', 'Tính từ na', 'Thoải mái, nhàn nhã', 7),
  ('正しい', 'ただしい', '正しい', 'Tính từ i', 'Đúng đắn, chính xác', 8),
  ('珍しい', 'めずらしい', '珍しい', 'Tính từ i', 'Hiếm có, lạ mắt', 9),
  ('方', 'かた', '方', 'Danh từ', 'Người (ngài)', 10),
  ('向こう', 'むこう', '向こう', 'Danh từ', 'Phía bên kia', 11),
  ('島', 'しま', '島', 'Danh từ', 'Hòn đảo', 12),
  ('港', 'みなと', '港', 'Danh từ', 'Cảng biển', 13),
  ('近所', 'きんじょ', '近所', 'Danh từ', 'Hàng xóm xung quanh', 14),
  ('屋上', 'おくじょう', '屋上', 'Danh từ', 'Sân thượng', 15),
  ('海外', 'かいがい', '海外', 'Danh từ', 'Hải ngoại, nước ngoài', 16),
  ('山登り', 'やまのぼり', '山登り', 'Danh từ', 'Leo núi', 17),
  ('ハイキング', 'ハイキング', NULL, 'Danh từ', 'Đi dã ngoại Hiking', 18),
  ('機会', 'きかい', '機会', 'Danh từ', 'Cơ hội', 19),
  ('許可', 'きょか', '許可', 'Danh từ', 'Giấy phép', 20),
  ('丸', 'まる', '丸', 'Danh từ', 'Vòng tròn', 21),
  ('操作', 'そうさ', '操作', 'Danh từ', 'Thao tác điều khiển', 22),
  ('方法', 'ほうほう', '方法', 'Danh từ', 'Phương pháp', 23),
  ('設備', 'せつび', '設備', 'Danh từ', 'Thiết bị', 24),
  ('カーテン', 'カーテン', NULL, 'Danh từ', 'Rèm cửa', 25),
  ('紐', 'ひも', '紐', 'Danh từ', 'Sợi dây', 26),
  ('ふた', 'ふた', NULL, 'Danh từ', 'Cái nắp', 27),
  ('葉', 'は', '葉', 'Danh từ', 'Lá cây', 28),
  ('曲', 'きょく', '曲', 'Danh từ', 'Ca khúc, bản nhạc', 29),
  ('楽しみ', 'たのしみ', '楽しみ', 'Danh từ', 'Niềm vui', 30),
  ('それなら', 'それなら', NULL, 'Phó từ', 'Nếu thế thì', 31),
  ('夜行バス', 'やこうばす', '夜行バス', 'Danh từ', 'Xe bus chạy đêm', 32),
  ('旅行社', 'りょこうしゃ', '旅行社', 'Danh từ', 'Công ty du lịch', 33),
  ('詳しい', 'くわしい', '詳しい', 'Tính từ i', 'Chi tiết, tường tận', 34),
  ('スキー場', 'すきーじょう', 'スキー場', 'Danh từ', 'Khu trượt tuyết', 35)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 10;

-- Lessons 36-50 Complete Final N4 Data Seeding
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('遭います', 'あいます', '遭います', 'Động từ nhóm 1', 'Gặp phải (tai nạn)', 1),
  ('貯金します', 'ちょきんします', '貯金します', 'Động từ nhóm 3', 'Tiết kiệm tiền', 2),
  ('過ぎます', 'すぎます', '過ぎます', 'Động từ nhóm 2', 'Quá (7 giờ)', 3),
  ('慣れます', 'なれます', '慣れます', 'Động từ nhóm 2', 'Quen với (công việc)', 4),
  ('腐ります', 'くさります', '腐ります', 'Động từ nhóm 1', 'Bị ôi thiu, mục nát', 5),
  ('ラッシュ', 'ラッシュ', NULL, 'Danh từ', 'Giờ cao điểm Rush hour', 6),
  ('宇宙', 'うちゅう', '宇宙', 'Danh từ', 'Vũ trụ', 7),
  ('曲', 'きょく', '曲', 'Danh từ', 'Bản nhạc', 8),
  ('毎月', 'まいつき', '毎月', 'Danh từ', 'Hàng tháng', 9),
  ('まいとし', 'まいとし', '毎年', 'Danh từ', 'Hàng năm', 10),
  ('かなり', 'かなり', NULL, 'Phó từ', 'Khá là', 11),
  ('絶対に', 'ぜったいに', '絶対に', 'Phó từ', 'Tuyệt đối (không)', 12),
  ('上手にお使いですね', 'じょうずにおつかいですね', NULL, 'Cụm từ', 'Dùng thành thạo nhỉ', 13),
  ('かなり', 'かなり', NULL, 'Phó từ', 'Rất, khá', 14),
  ('自慢します', 'じまんします', '自慢します', 'Động từ nhóm 3', 'Tự hào, khoe khoang', 15),
  ('挑戦します', 'ちょうせんします', '挑戦します', 'Động từ nhóm 3', 'Thử thách', 16),
  ('気持ち', 'きもち', '気持ち', 'Danh từ', 'Tâm trạng, cảm giác', 17),
  ('乗り物', 'のりもの', '乗り物', 'Danh từ', 'Phương tiện giao thông', 18),
  ('歴史', 'れきし', '歴史', 'Danh từ', 'Lịch sử', 19),
  ('世紀', 'せいき', '世紀', 'Danh từ', 'Thế kỷ', 20),
  ('遠く', 'とおく', '遠く', 'Danh từ', 'Nơi xa', 21),
  ('汽車', 'きしゃ', '汽車', 'Danh từ', 'Tàu hỏa chạy bằng hơi nước', 22),
  ('汽船', 'きせん', '汽船', 'Danh từ', 'Tàu thủy hơi nước', 23),
  ('大勢の～', 'おおぜいの～', '大勢の～', 'Danh từ', 'Nhiều (người)', 24),
  ('運びます', 'はこびます', '運びます', 'Động từ nhóm 1', 'Vận chuyển, mang vác', 25),
  ('飛ぶ', 'とぶ', '飛ぶ', 'Động từ nhóm 1', 'Bay', 26),
  ('安全な', 'あんぜんな', '安全な', 'Tính từ na', 'An toàn', 27),
  ('宇宙飛行士', 'うちゅうひこうし', '宇宙飛行士', 'Danh từ', 'Phi hành gia vũ trụ', 28)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 11;

-- Lesson 37: Bị động (49 từ chuẩn 100% người dùng cung cấp)
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('ほめます', 'ほめます', '褒めます', 'Động từ nhóm 2', 'khen', 1),
  ('しかります', 'しかります', NULL, 'Động từ nhóm 1', 'mắng', 2),
  ('さそいます', 'さそいます', '誘います', 'Động từ nhóm 1', 'mời, rủ rê', 3),
  ('おこします', 'おこします', '起こします', 'Động từ nhóm 1', 'đánh thức', 4),
  ('しょうたいします', 'しょうたいします', '招待します', 'Động từ nhóm 3', 'mời', 5),
  ('たのみます', 'たのんみます', '頼みます', 'Động từ nhóm 1', 'nhờ', 6),
  ('ちゅういします', 'ちゅういします', '注意します', 'Động từ nhóm 3', 'chú ý, nhắc nhở', 7),
  ('とります', 'とります', NULL, 'Động từ nhóm 1', 'ăn trộm , lấy cắp', 8),
  ('ふみます', 'ふみます', '踏みます', 'Động từ nhóm 1', 'giẫm , giẫm lên', 9),
  ('こわします', 'こわします', '壊します', 'Động từ nhóm 1', 'phá, làm hỏng', 10),
  ('よごします', 'よごします', '汚します', 'Động từ nhóm 1', 'làm bẩn', 11),
  ('おこないます', 'おこないます', '行います', 'Động từ nhóm 1', 'thực hiện, tiến hành', 12),
  ('ゆしゅつします', 'ゆしゅつします', '輸出します', 'Động từ nhóm 3', 'xuất khẩu', 13),
  ('ゆにゅうします', 'ゆにゅうします', '輸入します', 'Động từ nhóm 3', 'nhập khẩu', 14),
  ('ほんやくします', 'ほんやくします', '翻訳します', 'Động từ nhóm 3', 'dịch (sách, tài liệu)', 15),
  ('はつめいします', 'はつめいします', '発明します', 'Động từ nhóm 3', 'phát minh', 16),
  ('はっけんします', 'はっけんします', '発見します', 'Động từ nhóm 3', 'phát kiến, tìm ra', 17),
  ('せっけいします', 'せっけいします', '設計します', 'Động từ nhóm 3', 'thiết kế', 18),
  ('こめ', 'こめ', '米', 'Danh từ', 'gạo', 19),
  ('むぎ', 'むぎ', '麦', 'Danh từ', 'lúa mạch', 20),
  ('せきゆ', 'せきゆ', '石油', 'Danh từ', 'dầu mỏ', 21),
  ('げんりょう', 'げんりょう', '原料', 'Danh từ', 'nguyên liệu', 22),
  ('デート', 'デート', NULL, 'Danh từ', 'cuộc hẹn hò', 23),
  ('どろぼう', 'どろぼう', '泥棒', 'Danh từ', 'kẻ trộm', 24),
  ('けいかん', 'けいかん', '警官', 'Danh từ', 'cảnh sát', 25),
  ('けんちくか', 'けんちくか', '建築家', 'Danh từ', 'kiến trúc sư', 26),
  ('かがくしゃ', 'かがくしゃ', '科学者', 'Danh từ', 'nhà khoa học', 27),
  ('まんが', 'まんが', '漫画', 'Danh từ', 'truyện tranh', 28),
  ('せかいじゅう', 'せかいじゅう', '世界中', 'Danh từ', 'khắp thế giới, toàn thế giới', 29),
  ('―じゅう', '―じゅう', 'ー中', 'Hậu tố', 'khắp–', 30),
  ('―によって', '―によって', NULL, 'Cụm từ', 'do–', 31),
  ('よかったですね', 'よかったですね', NULL, 'Cụm từ', 'may nhỉ', 32),
  ('うめたてます', 'うめたてます', '埋め立てます', 'Động từ nhóm 2', 'lấp', 33),
  ('ぎじゅつ', 'ぎじゅつ', '技術', 'Danh từ', 'kỹ thuật', 34),
  ('とち', 'とち', '土地', 'Danh từ', 'đất, diện tích đất', 35),
  ('そうおん', 'そうおん', '騒音', 'Danh từ', 'tiếng ồn', 36),
  ('りようします', 'りようします', '利用します', 'Động từ nhóm 3', 'sử dụng', 37),
  ('アクセス', 'アクセス', NULL, 'Danh từ', 'nối, giao thông đi đến', 38),
  ('ドミニカ', 'ドミニカ', NULL, 'Danh từ', 'Dominica(tên một quốc gia ở Trung Mỹ)', 39),
  ('ーせいき', 'ーせいき', 'ー世紀', 'Hậu tố', 'thế kỷ-', 40),
  ('ごうか（な）', 'ごうか（な）', '豪華（な）', 'Tính từ na', 'hào hoa,sang trọng', 41),
  ('ちょうこく', 'ちょうこく', '彫刻', 'Danh từ', 'điêu khắc', 42),
  ('ねむります', 'ねむります', '眠ります', 'Động từ nhóm 1', 'ngủ', 43),
  ('ほります', 'ほります', '彫ります', 'Động từ nhóm 1', 'khắc', 44),
  ('なかま', 'なかま', '仲間', 'Danh từ', 'bạn bè,đồng nghiệp', 45),
  ('そのあと', 'そのあと', NULL, 'Phó từ', 'sau đó', 46),
  ('いっしょうけんめい', 'いっしょうけんめい', '一生懸命', 'Phó từ', 'cố gắng hết sức', 47),
  ('ねずみ', 'ねずみ', NULL, 'Danh từ', 'chuột', 48),
  ('いっぴきもいません', 'いっぴきもいません', '一匹もいません', 'Cụm từ', 'không có con nào cả', 49)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 12;

-- Lesson 38: Danh từ hóa (41 từ chuẩn 100% người dùng cung cấp)
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('そだてます', 'そだてます', '育てます', 'Động từ nhóm 2', 'nuôi,trồng', 1),
  ('はこびます', 'はこびます', '運びます', 'Động từ nhóm 1', 'chở, vận chuyển', 2),
  ('なくなります', 'なくなります', '亡くなります', 'Động từ nhóm 1', 'mất, qua đời', 3),
  ('にゅういんします', 'にゅういんします', '入院します', 'Động từ nhóm 3', 'nhập viện', 4),
  ('たいいんします', 'たいいんします', '退院します', 'Động từ nhóm 3', 'xuất viện', 5),
  ('いれます', 'いれます', '入れます', 'Động từ nhóm 2', 'bật', 6),
  ('きります', 'きります', '切ります', 'Động từ nhóm 1', 'tắt', 7),
  ('かけます', 'かけます', '掛けます', 'Động từ nhóm 2', 'khóa', 8),
  ('きもちがいい', 'きもちがいい', '気持ちがいい', 'Tính từ i', 'dễ chịu, thư giản', 9),
  ('きもちがわるい', 'きもちがわるい', '気持ちが悪い', 'Tính từ i', 'khó chịu', 10),
  ('おおきなー', 'おおきなー', '大きなー', 'Từ chỉ định', '–to, –lớn', 11),
  ('ちいさなー', 'ちいさなー', '小さなー', 'Từ chỉ định', '–nhỏ, –bé', 12),
  ('あかちゃん', 'あかちゃん', '赤ちゃん', 'Danh từ', 'em bé', 13),
  ('しょうがっこう', 'しょうがっこう', '小学校', 'Danh từ', 'trường tiểu học', 14),
  ('ちゅうがっこう', 'ちゅうがっこう', '中学校', 'Danh từ', 'trường trung học cơ sở', 15),
  ('えきまえ', 'えきまえ', '駅前', 'Danh từ', 'khu vực trước nha ga', 16),
  ('かいがん', 'かいがん', '海岸', 'Danh từ', 'bờ biển', 17),
  ('うそ', 'うそ', NULL, 'Danh từ', 'nói dối, lời nói dối', 18),
  ('しょるい', 'しょるい', '書類', 'Danh từ', 'giấy tờ,tài liệu', 19),
  ('でんげん', 'でんげん', '電源', 'Danh từ', 'nguồn điện , công tắc điện', 20),
  ('―せい', '―せい', NULL, 'Hậu tố', 'sản xuất tai–', 21),
  ('あ、いけない', 'あ、いけない', NULL, 'Thán từ', 'Ôi, hỏng mất rồi./Ôi, trời ơi', 22),
  ('おさきに', 'おさきに', 'お先に', 'Cụm từ', 'Tôi xin phép về trước', 23),
  ('かいらん', 'かいらん', '回覧', 'Danh từ', 'Tập thông báo', 24),
  ('けんきゅうしつ', 'けんきゅうしつ', '研究者室', 'Danh từ', 'Phòng nghiên cứu', 25),
  ('きちんと', 'きちんと', NULL, 'Phó từ', 'Nhiêm chỉnh, hẳn hoi, đứng đắn', 26),
  ('せいりします', 'せいりします', '整理します', 'Động từ nhóm 3', 'sắp xếp', 27),
  ('はんこ', 'はんこ', NULL, 'Danh từ', 'con dấu, dấu', 28),
  ('おします', 'おします', '押します', 'Động từ nhóm 1', 'đóng(dấu)', 29),
  ('ふたご', 'ふたご', '双子', 'Danh từ', 'cặp sinh đôi', 30),
  ('しまい', 'しまい', '姉妹', 'Danh từ', 'chị em', 31),
  ('５ねんせい', '５ねんせい', '5年生', 'Danh từ', 'học sinh năm thứ 5', 32),
  ('にています', 'にています', '似ています', 'Động từ nhóm 2', 'giống', 33),
  ('せいかく', 'せいかく', '性格', 'Danh từ', 'tính cách', 34),
  ('おとなしい', 'おとなしい', NULL, 'Tính từ i', 'hiền lành, trầm', 35),
  ('せわをします', 'せわをします', '世話をします', 'Động từ nhóm 3', 'chăm sóc , giúp đỡ', 36),
  ('じかんがたちます', 'じかんがたちます', '時間がたちます', 'Cụm từ', 'thời gian trôi đi', 37),
  ('だいすき', 'だいすき', 'だいすき', 'Tính từ na', 'rất thích', 38),
  ('クラス', 'クラス', NULL, 'Danh từ', 'lớp học, lớp', 39),
  ('けんかします', 'けんかします', NULL, 'Động từ nhóm 3', 'cãi nhau', 40),
  ('ふしぎ（な）', 'ふしぎ（な）', '不思議（な）', 'Tính từ na', 'bí ẩn , kỳ thú, khó hiểu', 41)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 13;

-- Lesson 39-50 Mass Seeding Batches for N4
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('答えます', 'こたえます', '答えます', 'Động từ nhóm 2', 'Trả lời (câu hỏi)', 1),
  ('倒れます', 'たおれます', '倒れます', 'Động từ nhóm 2', 'Đổ, sụp đổ (tòa nhà)', 2),
  ('通ります', 'とおります', '通ります', 'Động từ nhóm 1', 'Đi qua (con đường)', 3),
  ('死にます', 'しにます', '死にます', 'Động từ nhóm 1', 'Qua đời, chết', 4),
  ('びっくりします', 'びっくりします', NULL, 'Động từ nhóm 3', 'Giật mình, ngạc nhiên', 5),
  ('がっかりします', 'がっかりします', NULL, 'Động từ nhóm 3', 'Thất vọng', 6),
  ('安心します', 'あんしんします', '安心します', 'Động từ nhóm 3', 'Yên tâm', 7),
  ('喧嘩します', 'けんかします', '喧嘩します', 'Động từ nhóm 3', 'Cãi nhau, đánh nhau', 8),
  ('離婚します', 'りこんします', '離婚します', 'Động từ nhóm 3', 'Ly hôn', 9),
  ('太ります', 'ふとります', '太ります', 'Động từ nhóm 1', 'Béo lên, tăng cân', 10),
  ('痩せます', 'やせます', '痩せます', 'Động từ nhóm 2', 'Gầy đi, giảm cân', 11),
  ('複雑な', 'ふくざつな', '複雑な', 'Tính từ na', 'Phức tạp', 12),
  ('邪魔な', 'じゃまな', '邪魔な', 'Tính từ na', 'Cản trở, phiền hà', 13),
  ('硬い', 'かたい', '硬い', 'Tính từ i', 'Cứng', 14),
  ('軟らかい', 'やわらかい', '軟らかい', 'Tính từ i', 'Mềm', 15),
  ('汚い', 'きたない', '汚い', 'Tính từ i', 'Bẩn thiểu', 16),
  ('嬉しさ', 'うれしさ', '嬉しさ', 'Danh từ', 'Nỗi niềm vui mừng', 17),
  ('悲しみ', 'かなしみ', '悲しみ', 'Danh từ', 'Nỗi buồn', 18),
  ('恥ずかしい', 'はずかしい', '恥ずかしい', 'Tính từ i', 'Xấu hổ, ngượng ngùng', 19),
  ('地震', 'じしん', '地震', 'Danh từ', 'Trận động đất', 20),
  ('津波', 'つなみ', '津波', 'Danh từ', 'Sóng thần', 21),
  ('台風', 'たいふう', '台風', 'Danh từ', 'Cơn bão', 22),
  ('雷', 'かみなり', '雷', 'Danh từ', 'Sấm sét', 23),
  ('火事', 'かじ', '火事', 'Danh từ', 'Hỏa hoạn, cháy nhà', 24),
  ('事故', 'じこ', '事故', 'Danh từ', 'Tai nạn', 25),
  ('ハイキング', 'ハイキング', NULL, 'Danh từ', 'Dã ngoại Hiking', 26),
  ('お見合い', 'おみあい', 'お見合い', 'Danh từ', 'Xem mắt hôn nhân', 27),
  ('操作', 'そうさ', '操作', 'Danh từ', 'Thao tác máy', 28),
  ('会場', 'かいじょう', '会場', 'Danh từ', 'Hội trường', 29),
  ('～代', '～だい', '～代', 'Hậu tố', 'Phí ~, tiền ~', 30),
  ('フロント', 'フロント', NULL, 'Danh từ', 'Quầy lễ tân', 31),
  ('～号室', '～ごうしつ', '～号室', 'Hậu tố', 'Phòng số ~', 32),
  ('タオル', 'タオル', NULL, 'Danh từ', 'Khăn tắm', 33),
  ('石鹸', 'せっけん', '石鹸', 'Danh từ', 'Bánh xà phòng', 34),
  ('大勢', 'おおぜい', '大勢', 'Danh từ', 'Đông người', 35)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 14;

-- Lesson 40: Câu hỏi gián tiếp (58 từ chuẩn 100% người dùng cung cấp)
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('かぞえます', 'かぞえます', '数えます', 'Động từ nhóm 2', 'đếm', 1),
  ('はかります', 'はかります', '測ります/量ります', 'Động từ nhóm 1', 'đo, cân', 2),
  ('たしかめます', 'たしかめます', '確かめます', 'Động từ nhóm 2', 'xác nhận', 3),
  ('あいます', 'あいます', '合います', 'Động từ nhóm 1', 'vừa , hợp', 4),
  ('しゅっぱつします', 'しゅっぱつします', '出発します', 'Động từ nhóm 3', 'xuất phát, khởi hành', 5),
  ('とうちゃくします', 'とうちゃくします', '到着します', 'Động từ nhóm 3', 'đến , đến nơi', 6),
  ('よいます', 'よいます', '酔います', 'Động từ nhóm 1', 'say', 7),
  ('きけん（な）', 'きけん（な）', '危険（な）', 'Tính từ na', 'nguy hiểm', 8),
  ('ひつよう（な）', 'ひつよう（な）', '必要（な）', 'Tính từ na', 'cần thiết', 9),
  ('うちゅう', 'うちゅう', '宇宙', 'Danh từ', 'vũ trụ', 10),
  ('ちきゅう', 'ちきゅう', '地球', 'Danh từ', 'trái đất', 11),
  ('ぼうねんかい', 'ぼうねんかい', '忘年会', 'Danh từ', 'tiệc tất niên', 12),
  ('しんねんかい', 'しんねんかい', '新年会', 'Danh từ', 'tiệc tân niên', 13),
  ('にじかい', 'にじかい', '二次会', 'Danh từ', 'bữa tiệc thứ hai, tăng hai', 14),
  ('たいかい', 'たいかい', '大会', 'Danh từ', 'đại hội , cuộc thi', 15),
  ('マラソン', 'マラソン', NULL, 'Danh từ', 'ma-ra-tong', 16),
  ('コンテスト', 'コンテスト', NULL, 'Danh từ', 'cuộc thi', 17),
  ('おもて', 'おもて', '表', 'Danh từ', 'phía trước , mặt trước', 18),
  ('うら', 'うら', '裏', 'Danh từ', 'phía sau , mặt sau', 19),
  ('へんじ', 'へんじ', '返事', 'Danh từ', 'hồi âm , trả lời', 20),
  ('もうしこみ', 'もうしこみ', '申し込み', 'Danh từ', 'đăng ký', 21),
  ('ほんとう', 'ほんとう', '本当', 'Danh từ', 'thật', 22),
  ('まちがい', 'まちがい', NULL, 'Danh từ', 'sai , lỗi', 23),
  ('きず', 'きず', '傷', 'Danh từ', 'viết thương', 24),
  ('ズボン', 'ズボン', NULL, 'Danh từ', 'cái quần', 25),
  ('ながさ', 'ながさ', '長さ', 'Danh từ', 'chiều dài', 26),
  ('おもさ', 'おもさ', '重さ', 'Danh từ', 'cân nặng, trọng lượng', 27),
  ('たかさ', 'たかさ', '高さ', 'Danh từ', 'chiều cao', 28),
  ('おおきさ', 'おおきさ', '大きさ', 'Danh từ', 'cỡ , kích thước', 29),
  ('―びん', '―びん', 'ー便', 'Hậu tố', 'chuyến bay–', 30),
  ('―ごう', '―ごう', 'ー号', 'Hậu tố', 'số–', 31),
  ('―こ', '―こ', NULL, 'Hậu tố', 'cái, cục , viên', 32),
  ('―ほん', '―ほん', 'ー本', 'Hậu tố', 'cái(đơn vị đếm vật dài)', 33),
  ('―はい', '―はい', NULL, 'Hậu tố', '–chén, –cốc', 34),
  ('―キロ', '―キロ', NULL, 'Hậu tố', '–ki-lo, –cân', 35),
  ('―グラム', '―グラム', NULL, 'Hậu tố', '–gam', 36),
  ('ーセンチ', 'ーセンチ', NULL, 'Hậu tố', '–xăng-ti-mét', 37),
  ('ーミリ', 'ーミリ', NULL, 'Hậu tố', '–mi-li-mét', 38),
  ('―いじょう', '―いじょう', 'ー以上', 'Danh từ', 'trở lên, trên', 39),
  ('―いか', '―いか', 'ー以下', 'Danh từ', 'trở xuống, dưới', 40),
  ('さあ', 'さあ', NULL, 'Thán từ', 'à.., ồ..,(dùng khi không rõ về điều gì đó)', 41),
  ('どうでしょうか', 'どうでしょうか', NULL, 'Cụm từ', 'thế nào?(cách nói lịch sự của どうですか）', 42),
  ('クラス', 'クラス', NULL, 'Danh từ', 'lớp học', 43),
  ('テスト', 'テスト', NULL, 'Danh từ', 'bài kiểm tra', 44),
  ('せいせき', 'せいせき', '成績', 'Danh từ', 'kết quả, thành tích', 45),
  ('ところで', 'ところで', NULL, 'Liên từ', 'nhân tiện', 46),
  ('いらっしゃいます', 'いらっしゃいます', NULL, 'Động từ nhóm 1', 'đến(kính ngữ của きます）', 47),
  ('ようす', 'ようす', '様子', 'Danh từ', 'vẻ, tình hình', 48),
  ('じけん', 'じけん', '事件', 'Danh từ', 'vụ án', 49),
  ('バイク', 'バイク', NULL, 'Danh từ', 'xe máy', 50),
  ('ばくだん', 'ばくだん', '爆弾', 'Danh từ', 'bom', 51),
  ('つみます', 'つみます', '積みます', 'Động từ nhóm 1', 'chuyển lên, xếp hàng lên', 52),
  ('うんてんしゅ', 'うんてんしゅ', '運転手', 'Danh từ', 'lái xe', 53),
  ('はなれた', 'はなれた', '離れた', 'Tính từ', 'xa cách, xa', 54),
  ('が', 'が', NULL, 'Trợ từ', 'nhưng', 55),
  ('きゅうに', 'きゅうに', '急に', 'Phó từ', 'gấp, đột nhiên', 56),
  ('うごかします', 'うごかします', '動かします', 'Động từ nhóm 1', 'khởi động, chạy', 57),
  ('いっしょけんめい', 'いっしょけんめい', '一所懸命', 'Phó từ', 'hết sức, chăm chỉ', 58)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 15;

-- Lessons 41-50 Complete Final N4 Data Seeding
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('頂きます', 'いただきます', '頂きます', 'Động từ nhóm 1', 'Nhận (khiêm nhường của もらいます)', 1),
  ('くださいます', 'くださいます', NULL, 'Động từ nhóm 1', 'Cho, tặng (kính ngữ của くれます)', 2),
  ('やります', 'やります', NULL, 'Động từ nhóm 1', 'Cho (ăn/uống đối với thú cưng/cây)', 3),
  ('上げます', 'あげます', '上げます', 'Động từ nhóm 2', 'Nâng lên, tăng lên', 4),
  ('下げます', 'さげます', '下げます', 'Động từ nhóm 2', 'Hạ xuống, giảm đi', 5),
  ('親切にします', 'しんせつにします', '親切にします', 'Động từ nhóm 3', 'Đối xử tử tế với', 6),
  ('かわいい', 'かわいい', NULL, 'Tính từ i', 'Dễ thương, đáng yêu', 7),
  ('珍しい', 'めずらしい', '珍しい', 'Tính từ i', 'Quý hiếm', 8),
  ('お祝い', 'おいわい', 'お祝い', 'Danh từ', 'Quà mừng, lễ mừng', 9),
  ('お年玉', 'おとしだま', 'お年玉', 'Danh từ', 'Tiền lì xì đầu năm', 10),
  ('お見舞い', 'おみまい', 'お見舞い', 'Danh từ', 'Thăm bệnh, quà thăm bệnh', 11),
  ('興味', 'きょうみ', '興味', 'Danh từ', 'Hứng thú, quan tâm', 12),
  ('情報', 'じょうほう', '情報', 'Danh từ', 'Thông tin', 13),
  ('文法', 'ぶんぽう', '文法', 'Danh từ', 'Ngữ pháp', 14),
  ('発音', 'はつおん', '発音', 'Danh từ', 'Phát âm', 15),
  ('猿', 'さる', '猿', 'Danh từ', 'Con khỉ', 16),
  ('エサ', 'エサ', NULL, 'Danh từ', 'Thức ăn cho động vật', 17),
  ('おもちゃ', 'おもちゃ', NULL, 'Danh từ', 'Đồ chơi', 18),
  ('絵本', 'えほん', '絵本', 'Danh từ', 'Sách tranh thiếu nhi', 19),
  ('絵はがき', 'えはがき', '絵はがき', 'Danh từ', 'Bưu thiếp ảnh', 20),
  ('ドライバー', 'ドライバー', NULL, 'Danh từ', 'Tua vít Driver', 21),
  ('ハンカチ', 'ハンカチ', NULL, 'Danh từ', 'Khăn tay', 22),
  ('靴下', 'くつした', '靴下', 'Danh từ', 'Đôi tất, vớ', 23),
  ('手袋', 'てぶくろ', '手袋', 'Danh từ', 'Găng tay', 24),
  ('幼稚園', 'ようちえん', '幼稚園', 'Danh từ', 'Trường mầm non', 25),
  ('暖房', 'だんぼう', '暖房', 'Danh từ', 'Lò sưởi, máy sưởi', 26),
  ('冷房', 'れいぼう', '冷房', 'Danh từ', 'Máy lạnh, điều hòa mát', 27),
  ('温度', 'おんど', '温度', 'Danh từ', 'Nhiệt độ', 28),
  ('祖父', 'そふ', '祖父', 'Danh từ', 'Ông (tôi)', 29),
  ('祖母', 'そぼ', '祖母', 'Danh từ', 'Bà (tôi)', 30),
  ('孫', 'まご', '孫', 'Danh từ', 'Cháu nội/ngoại', 31),
  ('おじ', 'おじ', NULL, 'Danh từ', 'Chú, bác, cậu (tôi)', 32),
  ('おじさん', 'おじさん', NULL, 'Danh từ', 'Chú, bác (người khác)', 33),
  ('おば', 'おば', NULL, 'Danh từ', 'Cô, dì, bác gái (tôi)', 34),
  ('おばさん', 'おばさん', NULL, 'Danh từ', 'Cô, dì (người khác)', 35)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 16;

-- Lessons 42-50 Mass Insertion Batches
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('包みます', 'つつみます', '包みます', 'Động từ nhóm 1', 'Gói, bọc (quà)', 1),
  ('沸かします', 'わかします', '沸かします', 'Động từ nhóm 1', 'Đun sôi (nước)', 2),
  ('混ぜます', 'まぜます', '混ぜます', 'Động từ nhóm 2', 'Trộn, khuấy', 3),
  ('計算します', 'けいさんします', '計算します', 'Động từ nhóm 3', 'Tính toán', 4),
  ('並びます', 'ならびます', '並びます', 'Động từ nhóm 1', 'Xếp hàng', 5),
  ('丈夫な', 'じょうぶな', '丈夫な', 'Tính từ na', 'Bền bỉ, chắc chắn', 6),
  ('弁護士', 'べんごし', '弁護士', 'Danh từ', 'Luật sư', 7),
  ('音楽家', 'おんがくか', '音楽家', 'Danh từ', 'Nhạc sĩ', 8),
  ('子どもたち', 'こどもたち', '子どもたち', 'Danh từ', 'Trẻ em', 9),
  ('自然', 'しぜん', '自然', 'Danh từ', 'Tự nhiên, thiên nhiên', 10),
  ('教育', 'きょういく', '教育', 'Danh từ', 'Giáo dục', 11),
  ('文化', 'ぶんか', '文化', 'Danh từ', 'Văn hóa', 12),
  ('社会', 'しゃかい', '社会', 'Danh từ', 'Xã hội', 13),
  ('政治', 'せいじ', '政治', 'Danh từ', 'Chính trị', 14),
  ('法律', 'ほうりつ', '法律', 'Danh từ', 'Pháp luật', 15),
  ('戦争', 'せんそう', '戦争', 'Danh từ', 'Chiến tranh', 16),
  ('平和', 'へいわ', '平和', 'Danh từ', 'Hòa bình', 17),
  ('目的', 'もくてき', '目的', 'Danh từ', 'Mục đích', 18),
  ('論文', 'ろんぶん', '論文', 'Danh từ', 'Luận văn, luận án', 19),
  ('楽しみ', 'たのしみ', '楽しみ', 'Danh từ', 'Kỳ vọng, niềm vui', 20),
  ('ミキサー', 'ミキサー', NULL, 'Danh từ', 'Máy xay sinh tố', 21),
  ('やかん', 'やかん', NULL, 'Danh từ', 'Ấm đun nước', 22),
  ('ふた', 'ふた', NULL, 'Danh từ', 'Nắp nồi', 23),
  ('栓抜き', 'せんぬき', '栓抜き', 'Danh từ', 'Cái mở nút chai', 24),
  ('缶切り', 'かんきり', '缶切り', 'Danh từ', 'Dụng cụ mở đồ hộp', 25),
  ('缶詰', 'かんづめ', '缶詰', 'Danh từ', 'Đồ hộp đóng sẵn', 26),
  ('のし袋', 'のしぶくろ', 'のし袋', 'Danh từ', 'Phong bì mừng cưới/tiền', 27),
  ('風呂敷', 'ふろしき', '風呂敷', 'Danh từ', 'Khăn gói đồ kiểu Nhật', 28),
  ('そろばん', 'そろばん', NULL, 'Danh từ', 'Bàn tính gảy', 29),
  ('体温計', 'たいおんけい', '体温計', 'Danh từ', 'Nhiệt kế đo thân nhiệt', 30),
  ('材料', 'ざいりょう', '材料', 'Danh từ', 'Vật liệu, thành phần', 31),
  ('ある～', 'ある～', NULL, 'Từ chỉ định', 'Một ~ nào đó', 32),
  ('一生懸命', 'いっしょうけんめい', '一生懸命', 'Phó từ', 'Cố gắng hết mình', 33),
  ('なぜ', 'なぜ', NULL, 'Nghi vấn từ', 'Tại sao (bằng なんで)', 34),
  ('国連', 'こくれん', '国連', 'Danh từ', 'Liên Hợp Quốc', 35)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 17;

-- Lessons 43-50 Mass Insertion Batches
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('増えます', 'ふえます', '増えます', 'Động từ nhóm 2', 'Tăng lên (xuất khẩu)', 1),
  ('減ります', 'へります', '減ります', 'Động từ nhóm 1', 'Giảm đi (xuất khẩu)', 2),
  ('上がります', 'あがります', '上がります', 'Động từ nhóm 1', 'Tăng cao (giá cả)', 3),
  ('下がります', 'さがります', '下がります', 'Động từ nhóm 1', 'Giảm xuống (giá cả)', 4),
  ('切れます', 'きれます', '切れます', 'Động từ nhóm 2', 'Bị đứt (dây)', 5),
  ('とれます', 'とれます', NULL, 'Động từ nhóm 2', 'Bị tuột, rơi (cúc áo)', 6),
  ('落ちます', 'おちます', '落ちます', 'Động từ nhóm 2', 'Bị rơi, rớt (hành lý)', 7),
  ('なくなります', 'なくなります', NULL, 'Động từ nhóm 1', 'Hết, mất (xăng)', 8),
  ('変な', 'へんな', '変な', 'Tính từ na', 'Kỳ lạ, kỳ quặc', 9),
  ('幸せな', 'しあわせな', '幸せな', 'Tính từ na', 'Hạnh phúc', 10),
  ('うまい', 'うまい', NULL, 'Tính từ i', 'Ngon, giỏi', 11),
  ('まずい', 'まずい', NULL, 'Tính từ i', 'Dở, dở tệ', 12),
  ('つまらない', 'つまらない', NULL, 'Tính từ i', 'Chán ngắt', 13),
  ('ガソリン', 'ガソリン', NULL, 'Danh từ', 'Xăng dầu Gas', 14),
  ('火', 'ひ', '火', 'Danh từ', 'Ngọn lửa', 15),
  ('暖房', 'だんぼう', '暖房', 'Danh từ', 'Hệ thống sưởi', 16),
  ('冷房', 'れいぼう', '冷房', 'Danh từ', 'Hệ thống làm mát', 17),
  ('センス', 'センス', NULL, 'Danh từ', 'Gu thẩm mỹ Sense', 18),
  ('今にも', 'いまにも', '今にも', 'Phó từ', 'Bất cứ lúc nào, sắp sửa', 19),
  ('わあ', 'わあ', NULL, 'Thán từ', 'Oa! (ngạc nhiên)', 20),
  ('会員', 'かいいん', '会員', 'Danh từ', 'Hội viên, thành viên', 21),
  ('適当な', 'てきとうな', '適当な', 'Tính từ na', 'Thích hợp, vừa phải', 22),
  ('年齢', 'ねんれい', '年齢', 'Danh từ', 'Tuổi tác', 23),
  ('収入', 'しゅうにゅう', '収入', 'Danh từ', 'Thu nhập', 24),
  ('ぴったり', 'ぴったり', NULL, 'Phó từ', 'Vừa khít, hợp rơ', 25),
  ('そのうえ', 'そのうえ', NULL, 'Phó từ', 'Hơn thế nữa', 26),
  ('～と申します', '～ともします', '～と申します', 'Cụm từ', 'Tên tôi là ~ (khiêm nhường)', 27),
  ('薔薇', 'ばら', '薔薇', 'Danh từ', 'Hoa hồng', 28),
  ('ドライブ', 'ドライブ', NULL, 'Danh từ', 'Lái xe hóng gió Drive', 29)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 18;

-- Lessons 44-50 Mass Insertion Batches
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('泣きます', 'なきます', '泣きます', 'Động từ nhóm 1', 'Khóc', 1),
  ('笑います', 'わらいます', '笑います', 'Động từ nhóm 1', 'Cười', 2),
  ('乾きます', 'かわきます', '乾きます', 'Động từ nhóm 1', 'Khô (quần áo khô)', 3),
  ('濡れます', 'ぬれます', '濡れます', 'Động từ nhóm 2', 'Ướt (quần áo ướt)', 4),
  ('滑ります', 'すべります', '滑ります', 'Động từ nhóm 1', 'Trơn trượt', 5),
  ('起きます', 'おきます', '起きます', 'Động từ nhóm 2', 'Xảy ra (tai nạn)', 6),
  ('調節します', 'ちょうせつします', '調節します', 'Động từ nhóm 3', 'Điều chỉnh', 7),
  ('安全な', 'あんぜんな', '安全な', 'Tính từ na', 'An toàn', 8),
  ('丁寧な', 'ていねいな', '丁寧な', 'Tính từ na', 'Lịch sự, cẩn thận', 9),
  ('細かい', 'こまかい', '細かい', 'Tính từ i', 'Chi tiết, nhỏ lẻ', 10),
  ('濃い', 'こい', '濃い', 'Tính từ i', 'Đậm đà (vị/màu)', 11),
  ('薄い', 'うすい', '薄い', 'Tính từ i', 'Nhạt nhẽo (vị/màu)', 12),
  ('空気', 'くうき', '空気', 'Danh từ', 'Không khí', 13),
  ('涙', 'なみだ', '涙', 'Danh từ', 'Nước mắt', 14),
  ('和食', 'わしょく', '和食', 'Danh từ', 'Món ăn kiểu Nhật', 15),
  ('洋食', 'ようしょく', '洋食', 'Danh từ', 'Món ăn kiểu Tây', 16),
  ('おかず', 'おかず', NULL, 'Danh từ', 'Thức ăn ăn kèm cơm', 17),
  ('量', 'りょう', '量', 'Danh từ', 'Số lượng', 18),
  ('～倍', '～ばい', '～倍', 'Hậu tố', 'Gấp ~ lần', 19),
  ('半分', 'はんぶん', '半分', 'Danh từ', 'Một nửa', 20),
  ('シングル', 'シングル', NULL, 'Danh từ', 'Phòng đơn Single', 21),
  ('ツイン', 'ツイン', NULL, 'Danh từ', 'Phòng đôi Twin', 22),
  ('洗濯物', 'せんたくもの', '洗濯物', 'Danh từ', 'Quần áo cần giặt', 23),
  ('理由', 'りゆう', '理由', 'Danh từ', 'Lý do', 24),
  ('どうなさいますか', 'どうなさいますか', NULL, 'Cụm từ', 'Anh/chị muốn làm thế nào ạ?', 25),
  ('カット', 'カット', NULL, 'Danh từ', 'Cắt tóc Cut', 26),
  ('シャンプー', 'シャンプー', NULL, 'Danh từ', 'Gội đầu Shampoo', 27),
  ('どういうふうに', 'どういうふうに', NULL, 'Phó từ', 'Như thế nào', 28),
  ('ショート', 'ショート', NULL, 'Danh từ', 'Tóc ngắn Short', 29),
  ('みたいにしてください', 'みたいにしてください', NULL, 'Cụm từ', 'Hãy làm giống như ~', 30),
  ('これでお確かめください', 'これでおたしかめください', NULL, 'Cụm từ', 'Xin kiểm tra lại giúp', 31),
  ('どうもお疲れ様でした', 'どうもおつかれさまでした', NULL, 'Cụm từ', 'Cảm ơn anh/chị đã vất vả', 32)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 19;

-- Lessons 45-50 Mass Insertion Batches
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('信じます', 'しんじます', '信じます', 'Động từ nhóm 2', 'Tin tưởng', 1),
  ('キャンセルします', 'キャンセルします', NULL, 'Động từ nhóm 3', 'Hủy bỏ Cancel', 2),
  ('知らせます', 'しらせます', '知らせます', 'Động từ nhóm 2', 'Thông báo', 3),
  ('保証書', 'ほしょうしょ', '保証書', 'Danh từ', 'Giấy bảo hành', 4),
  ('領収書', 'りょうしゅうしょ', '領収書', 'Danh từ', 'Biên nhận, hóa đơn', 5),
  ('贈り物', 'おくりもの', '贈り物', 'Danh từ', 'Quà tặng', 6),
  ('間違い電話', 'まちがいでんわ', '間違い電話', 'Danh từ', 'Điện thoại nhầm số', 7),
  ('キャンプ', 'キャンプ', NULL, 'Danh từ', 'Cắm trại Camp', 8),
  ('係', 'かかり', '係', 'Danh từ', 'Người phụ trách', 9),
  ('中止', 'ちゅうし', '中止', 'Danh từ', 'Tạm dừng', 10),
  ('点', 'てん', '点', 'Danh từ', 'Điểm số', 11),
  ('レバー', 'レバー', NULL, 'Danh từ', 'Cần gạt', 12),
  ('～札', '～さつ', '～札', 'Hậu tố', 'Tờ tiền', 13),
  ('急に', 'きゅうに', '急に', 'Phó từ', 'Đột ngột', 14),
  ('楽しみにしています', 'たのしみにしています', NULL, 'Cụm từ', 'Đang rất mong đợi', 15),
  ('以上です', 'いじょうです', '以上です', 'Cụm từ', 'Xin hết', 16),
  ('係員', 'かかりいん', '係員', 'Danh từ', 'Nhân viên nhiệm vụ', 17),
  ('コース', 'コース', NULL, 'Danh từ', 'Lộ trình', 18),
  ('スタート', 'スタート', NULL, 'Danh từ', 'Bắt đầu', 19),
  ('～位', '～い', '～位', 'Hậu tố', 'Hạng thứ ~', 20),
  ('優勝します', 'ゆうしょうします', '優勝します', 'Động từ nhóm 3', 'Vô địch', 21),
  ('悩み', 'なやみ', '悩み', 'Danh từ', 'Nỗi trăn trở', 22),
  ('目覚まし時計', 'めざましとけい', '目覚まし時計', 'Danh từ', 'Đồng hồ báo thức', 23),
  ('目が覚めます', 'めがさめます', '目が覚めます', 'Động từ nhóm 2', 'Tỉnh giấc', 24),
  ('大学生', 'だいがくせい', '大学生', 'Danh từ', 'Sinh viên', 25),
  ('回答', 'かいとう', '回答', 'Danh từ', 'Đáp án', 26),
  ('鳴ります', 'なります', '鳴ります', 'Động từ nhóm 1', 'Reo (chuông)', 27),
  ('セットします', 'セットします', NULL, 'Động từ nhóm 3', 'Cài đặt', 28)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 20;

-- Lessons 46-50 Mass Insertion Batches
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('渡します', 'わたします', '渡します', 'Động từ nhóm 1', 'Trao, giao (tận tay)', 1),
  ('帰って来ます', 'かえってきます', '帰って来ます', 'Động từ nhóm 3', 'Trở về lại', 2),
  ('出ます', 'でます', '出ます', 'Động từ nhóm 2', 'Xuất phát', 3),
  ('宅配便', 'たくはいびん', '宅配便', 'Danh từ', 'Dịch vụ giao hàng', 4),
  ('原因', 'げんいん', '原因', 'Danh từ', 'Nguyên nhân', 5),
  ('注射', 'ちゅうしゃ', '注射', 'Danh từ', 'Tiêm thuốc', 6),
  ('食欲', 'しょくよく', '食欲', 'Danh từ', 'Cảm giác thèm ăn', 7),
  ('パンフレット', 'パンフレット', NULL, 'Danh từ', 'Tờ rơi', 8),
  ('ステレオ', 'ステレオ', NULL, 'Danh từ', 'Dàn âm thanh', 9),
  ('こちら', 'こちら', NULL, 'Danh từ', 'Bên chúng tôi', 10),
  ('～のところ', '～のところ', NULL, 'Danh từ', 'Chỗ của ~', 11),
  ('ちょうど', 'ちょうど', NULL, 'Phó từ', 'Vừa đúng lúc', 12),
  ('たった今', 'たったいま', 'たった今', 'Phó từ', 'Vừa mới ban nãy', 13),
  ('今いいですか', 'いまいいですか', NULL, 'Cụm từ', 'Bây giờ rảnh không ạ?', 14),
  ('ガスサービスセンター', 'ガスサービスセンター', NULL, 'Danh từ', 'Trung tâm ga', 15),
  ('ガスレンジ', 'ガスレンジ', NULL, 'Danh từ', 'Bếp ga', 16),
  ('具合', 'ぐあい', '具合', 'Danh từ', 'Tình trạng sức khỏe', 17),
  ('申し訳ありません', 'もうしわけありません', NULL, 'Cụm từ', 'Tôi xin lỗi', 18),
  ('どちら様でしょうか', 'どちらさまでしょうか', NULL, 'Cụm từ', 'Xin hỏi ai ở đầu dây ạ?', 19),
  ('お待たせしました', 'おまたせしました', NULL, 'Cụm từ', 'Xin lỗi đã để chờ', 20),
  ('向かいます', 'むかいます', '向かいます', 'Động từ nhóm 1', 'Hướng về phía', 21),
  ('ついています', 'ついています', NULL, 'Động từ nhóm 1', 'May mắn', 22),
  ('床', 'ゆか', '床', 'Danh từ', 'Sàn nhà', 23),
  ('転びます', 'ころびます', '転びます', 'Động từ nhóm 1', 'Ngã, té', 24),
  ('ベル', 'ベル', NULL, 'Danh từ', 'Chuông cửa', 25),
  ('鳴ります', 'なります', '鳴ります', 'Động từ nhóm 1', 'Reo (chuông)', 26),
  ('慌てて', 'あわてて', '慌てて', 'Phó từ', 'Vội vã', 27),
  ('順番に', 'じゅんばんに', '順番に', 'Phó từ', 'Theo thứ tự', 28),
  ('出来事', 'できごと', '出来事', 'Danh từ', 'Sự việc xảy ra', 29)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 21;

-- Lessons 47-50 Mass Insertion Batches
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('集まります', 'あつまります', '集まります', 'Động từ nhóm 1', 'Tập hợp', 1),
  ('別れます', 'わかれます', '別れます', 'Động từ nhóm 2', 'Chia tay', 2),
  ('長生きします', 'ながいきします', '長生きします', 'Động từ nhóm 3', 'Sống thọ', 3),
  ('音がします', 'おとがします', '音がします', 'Cụm từ', 'Có âm thanh phát ra', 4),
  ('声がします', 'こえがします', '声がします', 'Cụm từ', 'Có tiếng nói', 5),
  ('味がします', 'あじがします', '味がします', 'Cụm từ', 'Có hương vị', 6),
  ('匂いがします', 'においがします', '匂いがします', 'Cụm từ', 'Có mùi hương', 7),
  ('さします', 'さします', NULL, 'Động từ nhóm 1', 'Gương (dù)', 8),
  ('ひどい', 'ひどい', NULL, 'Tính từ i', 'Kinh khủng, tồi tệ', 9),
  ('怖い', 'こわい', '怖い', 'Tính từ i', 'Đáng sợ', 10),
  ('天気予報', 'てんきよほう', '天気予報', 'Danh từ', 'Dự báo thời tiết', 11),
  ('発表', 'はっぴょう', '発表', 'Danh từ', 'Báo cáo, công bố', 12),
  ('実験', 'じっけん', '実験', 'Danh từ', 'Thí nghiệm', 13),
  ('人口', 'じんこう', '人口', 'Danh từ', 'Dân số', 14),
  ('匂い', 'におい', '匂い', 'Danh từ', 'Mùi hương', 15),
  ('科学', 'かがく', '科学', 'Danh từ', 'Khoa học', 16),
  ('医学', 'いがく', '医学', 'Danh từ', 'Y học', 17),
  ('文学', 'ぶんがく', '文学', 'Danh từ', 'Văn học', 18),
  ('パトカー', 'パトカー', NULL, 'Danh từ', 'Xe cảnh sát', 19),
  ('救急車', 'きゅうきゅうしゃ', '救急車', 'Danh từ', 'Xe cấp cứu', 20),
  ('賛成', 'さんせい', '賛成', 'Danh từ', 'Tán thành', 21),
  ('反対', 'はんたい', '反対', 'Danh từ', 'Phản đối', 22),
  ('男性', 'だんせい', '男性', 'Danh từ', 'Nam giới', 23),
  ('女性', 'じょせい', '女性', 'Danh từ', 'Nữ giới', 24),
  ('どうも', 'どうも', NULL, 'Phó từ', 'Hình như là', 25),
  ('～によると', '～によると', NULL, 'Cụm từ', 'Theo như ~', 26),
  ('恋人', 'こいびと', '恋人', 'Danh từ', 'Người yêu', 27),
  ('婚約します', 'こんやくします', '婚約します', 'Động từ nhóm 3', 'Đính hôn', 28),
  ('相手', 'あいて', '相手', 'Danh từ', 'Đối phương', 29),
  ('知り合います', 'しりあいます', '知り合います', 'Động từ nhóm 1', 'Quen biết nhau', 30)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 22;

-- Lessons 48-50 Mass Insertion Batches
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('降ろします', 'おろします', '降ろします', 'Động từ nhóm 1', 'Cho xuống (xe)', 1),
  ('届けます', 'とどけます', '届けます', 'Động từ nhóm 2', 'Chuyển đến', 2),
  ('世話をします', 'せわをします', '世話をします', 'Động từ nhóm 3', 'Chăm sóc', 3),
  ('録音します', 'ろくおんします', '録音します', 'Động từ nhóm 3', 'Ghi âm', 4),
  ('嫌な', 'いやな', '嫌な', 'Tính từ na', 'Ghét', 5),
  ('塾', 'じゅく', '塾', 'Danh từ', 'Trường học thêm', 6),
  ('生徒', 'せいと', '生徒', 'Danh từ', 'Học sinh', 7),
  ('ファイル', 'ファイル', NULL, 'Danh từ', 'Tệp tin', 8),
  ('自由にする', 'じゆうにする', NULL, 'Cụm từ', 'Tự do làm', 9),
  ('～間', '～かん', '～間', 'Hậu tố', 'Khoảng thời gian ~', 10),
  ('いいことですね', 'いいことですね', NULL, 'Cụm từ', 'Điều đó tốt đấy', 11),
  ('お忙しいですか', 'おいそがしいですか', NULL, 'Cụm từ', 'Anh/chị có bận không?', 12),
  ('営業', 'えいぎょう', '営業', 'Danh từ', 'Kinh doanh', 13),
  ('それまでに', 'それまでに', NULL, 'Phó từ', 'Trước thời điểm đó', 14),
  ('かまいません', 'かまいません', NULL, 'Cụm từ', 'Không sao cả', 15),
  ('楽し見ます', 'たのしみます', '楽しむ', 'Động từ nhóm 1', 'Tận hưởng niềm vui', 16),
  ('親子', 'おやこ', '親子', 'Danh từ', 'Cha con / mẹ con', 17),
  ('習字', 'しゅうじ', '習字', 'Danh từ', 'Luyện viết chữ đẹp', 18),
  ('普通', 'ふつう', '普通', 'Danh từ', 'Bình thường', 19)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 23;

-- Lesson 49: Tôn kính ngữ (尊敬語)
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('勤めます', 'つとめます', '勤めます', 'Động từ nhóm 2', 'Làm việc (tại công ty)', 1),
  ('休んでいらっしゃいます', 'やすんでいらっしゃいます', NULL, 'Động từ nhóm 1', 'Nghỉ ngơi (tôn kính ngữ)', 2),
  ('召し上がります', 'めしあがります', '召し上がります', 'Động từ nhóm 1', 'Ăn, uống (tôn kính của 食べる/飲む)', 3),
  ('おっしゃいます', 'おっしゃいます', NULL, 'Động từ nhóm 1', 'Nói (tôn kính của 言う)', 4),
  ('なさいます', 'なさいます', NULL, 'Động từ nhóm 1', 'Làm (tôn kính của する)', 5),
  ('ご覧になります', 'ごらんになります', 'ご覧になります', 'Động từ nhóm 1', 'Xem (tôn kính của 見る)', 6),
  ('ご存じです', 'ごぞんじです', 'ご存知です', 'Cụm từ', 'Biết (tôn kính của 知っている)', 7),
  ('挨拶', 'あいさつ', '挨拶', 'Danh từ', 'Chào hỏi, phát biểu', 8),
  ('旅館', 'りょかん', '旅館', 'Danh từ', 'Khách sạn kiểu Nhật Ryokan', 9),
  ('バス停', 'ばすてい', 'バス停', 'Danh từ', 'Trạm xe bus', 10),
  ('奥様', 'おくさま', '奥様', 'Danh từ', 'Vợ ngài (tôn kính)', 11),
  ('～様', '～さま', '～様', 'Hậu tố', 'Ngài ~', 12),
  ('たまに', 'たまに', NULL, 'Phó từ', 'Thỉnh thoảng', 13),
  ('どなたでも', 'どなたでも', NULL, 'Phó từ', 'Bất kỳ ngài nào', 14),
  ('～といいます', '～といいます', NULL, 'Cụm từ', 'Tên là ~', 15),
  ('経歴', 'けいれき', '経歴', 'Danh từ', 'Lý lịch', 16),
  ('医学部', 'いがくぶ', '医学部', 'Danh từ', 'Khoa Y', 17),
  ('目指します', 'めざします', '目指します', 'Động từ nhóm 1', 'Hướng tới', 18),
  ('進みます', 'すすみます', '進みます', 'Động từ nhóm 1', 'Học lên cao', 19),
  ('受章します', 'じゅしょうします', '受章します', 'Động từ nhóm 3', 'Nhận huân chương', 20),
  ('講演会', 'こうえんかい', '講演会', 'Danh từ', 'Buổi diễn thuyết', 21)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 24;

-- Lesson 50: Khiêm nhường ngữ (謙譲語)
INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
SELECT l.lesson_id, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech, v.sort_order, 'PUBLISHED'
FROM lessons l JOIN levels lvl ON l.level_id = lvl.level_id CROSS JOIN (VALUES
  ('参ります', 'まいります', '参ります', 'Động từ nhóm 1', 'Đi, đến (khiêm nhường của 行く/来る)', 1),
  ('おります', 'おります', NULL, 'Động từ nhóm 1', 'Ở (khiêm nhường của いる)', 2),
  ('頂きます', 'いただきます', '頂きます', 'Động từ nhóm 1', 'Ăn, uống, nhận (khiêm nhường của 食べる/飲む/もらう)', 3),
  ('申します', 'もうします', '申します', 'Động từ nhóm 1', 'Nói (khiêm nhường của 言う)', 4),
  ('いたします', 'いたします', NULL, 'Động từ nhóm 1', 'Làm (khiêm nhường của する)', 5),
  ('拝見します', 'はいけんします', '拝見します', 'Động từ nhóm 3', 'Xem (khiêm nhường của 見る)', 6),
  ('存じております', 'ぞんじております', '存知ております', 'Cụm từ', 'Biết (khiêm nhường của 知っている)', 7),
  ('伺います', 'うかがいます', '伺います', 'Động từ nhóm 1', 'Hỏi, đến thăm (khiêm nhường của 聞く/行く)', 8),
  ('お目にかかります', 'おめにかかります', 'お目にかかります', 'Cụm từ', 'Gặp mặt (khiêm nhường của 会う)', 9),
  ('淹れます', 'いれます', '淹れます', 'Động từ nhóm 2', 'Pha (cà phê, trà)', 10),
  ('用意します', 'よういします', '用意します', 'Động từ nhóm 3', 'Sửa soạn, chuẩn bị', 11),
  ('私', 'わたくし', '私', 'Đại từ', 'Tôi (khiêm nhường của わたし)', 12),
  ('ガイド', 'ガイド', NULL, 'Danh từ', 'Hướng dẫn viên', 13),
  ('メールアドレス', 'メールアドレス', NULL, 'Danh từ', 'Địa chỉ Email', 14),
  ('スケジュール', 'スケジュール', NULL, 'Danh từ', 'Lịch trình', 15),
  ('再来週', 'さらいしゅう', '再来週', 'Danh từ', 'Tuần sau nữa', 16),
  ('再来月', 'さらいげつ', '再来月', 'Danh từ', 'Tháng sau nữa', 17),
  ('再来年', 'さらいねん', '再来年', 'Danh từ', 'Năm sau nữa', 18),
  ('初めに', 'はじめに', '初めに', 'Phó từ', 'Đầu tiên, trước hết', 19),
  ('緊張します', 'きんちょうします', '緊張します', 'Động từ nhóm 3', 'Hồi hộp, căng thẳng', 20),
  ('賞金', 'しょうきん', '賞金', 'Danh từ', 'Tiền thưởng giải đấu', 21),
  ('きりん', 'きりん', NULL, 'Danh từ', 'Hươu cao cổ', 22),
  ('ころ', 'ころ', NULL, 'Hậu tố', 'Hồi, dạo, lúc', 23),
  ('叶います', 'かないます', '叶います', 'Động từ nhóm 1', 'Trở thành hiện thực', 24),
  ('応援します', 'おうえんします', '応援します', 'Động từ nhóm 3', 'Cổ vũ, ủng hộ', 25),
  ('心から', 'こころから', '心から', 'Phó từ', 'Từ đáy lòng', 26),
  ('感謝します', 'かんしゃします', '感謝します', 'Động từ nhóm 3', 'Cảm ơn, tri ân', 27),
  ('お礼', 'おれい', 'お礼', 'Danh từ', 'Quà cảm ơn', 28),
  ('お元気でいらっしゃいますか', 'おげんきでいらっしゃいますか', NULL, 'Cụm từ', 'Kính chúc ngài luôn khỏe mạnh', 29)
) AS v(word, kana, kanji_form, part_of_speech, meaning_vi, sort_order)
WHERE lvl.code = 'N4' AND l.sort_order = 25;
