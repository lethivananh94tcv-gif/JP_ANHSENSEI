-- Flyway Migration V49: Reseed Enterprise 10-Question Bank per Lesson for N5 Grammar Lessons (Bài 1 -> Bài 20)

-- Clean legacy entries
TRUNCATE TABLE question_bank_options, question_bank CASCADE;

-- =================================================================
-- BÀI 1: N1 は N2 です / ではありません / ですか / も / の
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 1), 'FILL_BLANK', 'EASY', 'Bài 1: Điền trợ từ chủ đề WA', '私（わたし） [ ? ] 学生（がくせい）です。', '["は"]'::jsonb, 'Trợ từ 「は」 đánh dấu chủ đề.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 1), 'FILL_BLANK', 'EASY', 'Bài 1: Điền trợ từ phủ định lịch sự', '田中（たなか）さんは 先生（せんせい） [ ? ]。', '["ではありません"]'::jsonb, 'Phủ định lịch sự của 「～です」 là 「～ではありません」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 1), 'FILL_BLANK', 'EASY', 'Bài 1: Điền trợ từ nghi vấn KA', 'ミラーさんは 会社員（かいしゃいん） [ ? ]。', '["ですか"]'::jsonb, 'Thêm 「か」 ở cuối câu để tạo câu hỏi.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 1), 'FILL_BLANK', 'MEDIUM', 'Bài 1: Điền trợ từ đồng tán MO', '私（わたし）は ベトナム人（じん）です。ナムさん [ ? ] ベトナム人（じん）です。', '["も"]'::jsonb, 'Trợ từ 「も」 (cũng) dùng khi thuộc tính trùng khớp.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 1), 'FILL_BLANK', 'MEDIUM', 'Bài 1: Điền trợ từ sở hữu NO', '私（わたし） [ ? ] 傘（かさ）です。', '["の"]'::jsonb, 'Trợ từ 「の」 nối biểu thị quyền sở hữu.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 1), 'FILL_BLANK', 'MEDIUM', 'Bài 1: Điền trợ từ trực thuộc tổ chức', 'IMC [ ? ] 社員（しゃいん）です。', '["の"]'::jsonb, 'Trợ từ 「の」 biểu thị trực thuộc công ty/tổ chức.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 1), 'FILL_BLANK', 'EASY', 'Bài 1: Điền dạng phủ định thân mật', 'サントスさんは 学生（がくせい） [ ? ]。', '["じゃありません"]'::jsonb, 'Trang phục văn nói thân mật dùng 「じゃありません」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 1), 'FILL_BLANK', 'MEDIUM', 'Bài 1: Điền nghi vấn câu trả lời phủ định', 'ワンさんは 医者（いしゃ） [ ? ]。... いいえ、医者ではありません。', '["ですか"]'::jsonb, 'Câu hỏi xác nhận danh tính.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 1), 'FILL_BLANK', 'EASY', 'Bài 1: Điền trợ từ chủ đề tên người', 'あの 人（ひと） [ ? ] 木村（きむら）さんです。', '["は"]'::jsonb, 'Trợ từ 「は」 đánh dấu chủ đề.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 1), 'FILL_BLANK', 'EASY', 'Bài 1: Điền trợ từ chủ đề quốc tịch', 'マイクさん [ ? ] アメリカ人（じん）です。', '["は"]'::jsonb, 'Trợ từ 「は」 đánh dấu chủ đề.', 1.00, 'ACTIVE');

-- =================================================================
-- BÀI 2: これ / それ / あれ / この N / その N / あの N / N の N
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 2), 'FILL_BLANK', 'EASY', 'Bài 2: Vật gần người nói (Kore)', '[ ? ] は 本（ほん）です。', '["これ"]'::jsonb, 'Dùng 「これ」 chỉ vật ở gần người nói.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 2), 'FILL_BLANK', 'EASY', 'Bài 2: Bổ nghĩa danh từ gần người nghe (Sono)', '[ ? ] 傘（かさ）は 私（わたし）の です。', '["その"]'::jsonb, 'Dùng 「その + Danh từ」 chỉ vật gần người nghe.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 2), 'FILL_BLANK', 'MEDIUM', 'Bài 2: Câu hỏi lựa chọn (Ka... ka)', 'これ は 本（ほん）ですか、辞書（じしょ） [ ? ]。', '["ですか"]'::jsonb, 'Dạng câu hỏi lựa chọn 「N1 か N2 か」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 2), 'FILL_BLANK', 'MEDIUM', 'Bài 2: Vật xa cả 2 người (Are)', '[ ? ] は 誰（だれ）の 自動車（じどうしゃ）ですか。', '["あれ"]'::jsonb, 'Dùng 「あれ」 chỉ vật xa cả 2 người.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 2), 'FILL_BLANK', 'EASY', 'Bài 2: Hỏi đồ vật (Nan)', 'これ は 何（なん） [ ? ]。', '["ですか"]'::jsonb, 'Nghi vấn từ 何 đi với ですか.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 2), 'FILL_BLANK', 'MEDIUM', 'Bài 2: Trợ từ sở hữu vật (No)', 'それ は 私（わたし） [ ? ] 鍵（かぎ）です。', '["の"]'::jsonb, 'Trợ từ 「の」 biểu thị chủ sở hữu.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 2), 'FILL_BLANK', 'MEDIUM', 'Bài 2: Trợ từ chỉ người sở hữu (No)', 'あれ は 田中（たなか）さん [ ? ] 傘（かさ）です。', '["の"]'::jsonb, 'Trợ từ 「の」 chỉ chủ sở hữu.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 2), 'FILL_BLANK', 'MEDIUM', 'Bài 2: Hỏi người sở hữu (Dare)', 'この 手帳（てちょう）は [ ? ] の ですか。', '["誰（だれ）"]'::jsonb, 'Dùng nghi vấn từ 「誰（だれ）」 hỏi chủ sở hữu.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 2), 'FILL_BLANK', 'EASY', 'Bài 2: Trả lời đúng thế (Sou)', 'それ は 辞書（じしょ）ですか。... はい、[ ? ] です。', '["そう"]'::jsonb, 'Trả lời khẳng định 「はい、そうです」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 2), 'FILL_BLANK', 'EASY', 'Bài 2: Trả lời không phải thế', 'これ は シャープペンシルですか。... いいえ、[ ? ]。', '["そうではありません"]'::jsonb, 'Trả lời phủ định 「いいえ、そうではありません」.', 1.00, 'ACTIVE');

-- =================================================================
-- BÀI 3: ここ / そこ / あそこ / どこ / こちら / そちら / あちら / どちら
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 3), 'FILL_BLANK', 'EASY', 'Bài 3: Hỏi vị trí địa điểm (Doko)', 'お手洗（てあら）いは [ ? ] ですか。', '["どこ"]'::jsonb, 'Nghi vấn từ 「どこ」 hỏi vị trí địa điểm.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 3), 'FILL_BLANK', 'EASY', 'Bài 3: Nơi người nói đứng (Koko)', '[ ? ] は 教室（きょうしつ）です。', '["ここ"]'::jsonb, '「ここ」 chỉ nơi người nói đang đứng.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 3), 'FILL_BLANK', 'MEDIUM', 'Bài 3: Hỏi vị trí lịch sự (Dochira)', '事務所（じむしょ）は [ ? ] ですか。', '["どちら"]'::jsonb, '「どちら」 là dạng lịch sự của どこ.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 3), 'FILL_BLANK', 'EASY', 'Bài 3: Vị trí xa cả 2 người (Asoko)', 'エレベーターは [ ? ] です。', '["あそこ"]'::jsonb, 'Dùng 「あそこ」 chỉ địa điểm xa cả 2 người.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 3), 'FILL_BLANK', 'EASY', 'Bài 3: Hỏi vị trí lễ tân (Doko)', '受付（うけつけ）は [ ? ] ですか。', '["どこ"]'::jsonb, 'Nghi vấn từ hỏi vị trí 「どこ」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 3), 'FILL_BLANK', 'MEDIUM', 'Bài 3: Hỏi quốc gia lịch sự (Dochira)', '国（くに）は [ ? ] ですか。', '["どちら"]'::jsonb, 'Hỏi quốc gia dùng 「どちら」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 3), 'FILL_BLANK', 'MEDIUM', 'Bài 3: Hỏi công ty lịch sự (Dochira)', '会社（かいしゃ）は [ ? ] ですか。', '["どちら"]'::jsonb, 'Hỏi tên công ty dùng 「どちら」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 3), 'FILL_BLANK', 'MEDIUM', 'Bài 3: Hỏi xuất xứ sản phẩm (Doko no)', 'これ は [ ? ] の 靴（くつ）ですか。', '["どこ"]'::jsonb, '「どこ の N」 hỏi xuất xứ nhà sản xuất.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 3), 'FILL_BLANK', 'EASY', 'Bài 3: Hỏi giá tiền (Ikura)', 'この 時計（とけい）は [ ? ] ですか。', '["いくら"]'::jsonb, 'Nghi vấn từ 「いくら」 hỏi giá tiền.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 3), 'FILL_BLANK', 'EASY', 'Bài 3: Hỏi tầng nhà (Nan)', '部屋（へや）は [ ? ] 階（かい）ですか。', '["何（なん）"]'::jsonb, 'Hỏi số tầng dùng 「何階（なんがい）」.', 1.00, 'ACTIVE');

-- =================================================================
-- BÀI 4: 今 〜時 〜分 / Vます / Vました / Vませんでした / に / から...まで
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'EASY', 'Bài 4: Trợ từ thời gian cụ thể (Ni)', '毎朝（まいあさ） 7時（しちじ） [ ? ] 起（お）きます。', '["に"]'::jsonb, 'Trợ từ 「に」 đi sau con số thời gian.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'MEDIUM', 'Bài 4: Động từ quá khứ khẳng định (Mashita)', '昨日（きのう） 勉強（べんきょう） [ ? ]。', '["しました"]'::jsonb, 'Quá khứ khẳng định chia về 「〜ました」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'MEDIUM', 'Bài 4: Trợ từ điểm bắt đầu (Kara)', '9時（くじ） [ ? ] 5時（ごじ）まで 働（はたら）きます。', '["から"]'::jsonb, 'Trợ từ 「から」 biểu thị điểm bắt đầu.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'MEDIUM', 'Bài 4: Trợ từ điểm kết thúc (Made)', '9時（くじ）から 5時（ごじ） [ ? ] 働（はたら）きます。', '["まで"]'::jsonb, 'Trợ từ 「まで」 biểu thị điểm kết thúc.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'EASY', 'Bài 4: Hỏi giờ hiện tại (Nanji)', '今（いま） [ ? ] 時（じ）ですか。', '["何（なん）"]'::jsonb, 'Hỏi mấy giờ dùng 「何時（なんじ）」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'MEDIUM', 'Bài 4: Động từ phủ định hiện tại (Masen)', '明日（あした） 働（はたら）き [ ? ]。', '["ません"]'::jsonb, 'Phủ định tương lai dùng 「〜ません」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'MEDIUM', 'Bài 4: Động từ phủ định quá khứ (Masen deshita)', '昨日（きのう） 働（はたら）き [ ? ]。', '["ませんでした"]'::jsonb, 'Phủ định quá khứ dùng 「〜ませんでした」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'EASY', 'Bài 4: Hỏi thứ trong tuần (Nanyoubi)', '今日（きょう）は [ ? ] 曜日（ようび）ですか。', '["何（なん）"]'::jsonb, 'Hỏi thứ dùng 「何曜日」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'EASY', 'Bài 4: Trợ từ giờ kết thúc công việc (Ni)', '銀行（ぎんこう）は 3時（さんじ） [ ? ] 終（お）わります。', '["に"]'::jsonb, 'Trợ từ 「に」 đi sau con số giờ.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'MEDIUM', 'Bài 4: Trợ từ từ mấy giờ (Kara)', '昼（ひる）休（やす）みは 12時（じゅうにじ） [ ? ] 1時（いちじ）までです。', '["から"]'::jsonb, 'Trợ từ 「から」 chỉ thời điểm bắt đầu.', 1.00, 'ACTIVE');

-- =================================================================
-- BÀI 5: N(địa điểm) へ 行きます / で 行きます / と 行きます / どこ[へ] も
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 5), 'FILL_BLANK', 'EASY', 'Bài 5: Trợ từ hướng di chuyển (E)', '東京（とうきょう） [ ? ] 行（い）きます。', '["へ"]'::jsonb, 'Trợ từ 「へ」 đánh dấu hướng di chuyển.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 5), 'FILL_BLANK', 'MEDIUM', 'Bài 5: Trợ từ phương tiện (De)', '電車（でんしゃ） [ ? ] 行（い）きます。', '["で"]'::jsonb, 'Trợ từ 「で」 chỉ phương tiện di chuyển.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 5), 'FILL_BLANK', 'MEDIUM', 'Bài 5: Trợ từ đi cùng ai (To)', '友達（ともだち） [ ? ] 行（い）きます。', '["と"]'::jsonb, 'Trợ từ 「と」 chỉ đối tượng cùng đi.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 5), 'FILL_BLANK', 'MEDIUM', 'Bài 5: Phủ định hoàn toàn di chuyển (Dokomo)', 'どこ[へ] も 行（い）き [ ? ]。', '["ません"]'::jsonb, 'Mẫu 「どこへも + Phủ định」 nghĩa là không đi đâu cả.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 5), 'FILL_BLANK', 'EASY', 'Bài 5: Đi bộ không dùng で', '歩（ある）いて 行（い）き [ ? ]。', '["ます"]'::jsonb, '「歩いて」 không dùng trợ từ で.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 5), 'FILL_BLANK', 'MEDIUM', 'Bài 5: Nghi vấn từ hỏi khi nào (Itsu)', '[ ? ] 日本（にほん）へ 来（き）ましたか。', '["いつ"]'::jsonb, 'Nghi vấn từ 「いつ」 hỏi khi nào.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 5), 'FILL_BLANK', 'EASY', 'Bài 5: Trợ từ về nhà (E)', '家（うち） [ ? ] 帰（かえ）ります。', '["へ"]'::jsonb, 'Trợ từ 「へ」 đi với 帰ります.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 5), 'FILL_BLANK', 'MEDIUM', 'Bài 5: Hỏi phương tiện di chuyển (Nande)', '[ ? ] で 行（い）きますか。... タクシーで 行きます。', '["何（なん）"]'::jsonb, 'Hỏi phương tiện dùng 「何で」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 5), 'FILL_BLANK', 'MEDIUM', 'Bài 5: Hỏi người đi cùng (Dare to)', '[ ? ] と 行（い）きますか。... 家族（かぞく）と 行きます。', '["誰（だれ）"]'::jsonb, 'Hỏi người đi cùng dùng 「誰と」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 5), 'FILL_BLANK', 'EASY', 'Bài 5: Cụm từ đi một mình (Hitori de)', '一人（ひとり） [ ? ] 行（い）きます。', '["で"]'::jsonb, 'Đi một mình dùng 「一人で」.', 1.00, 'ACTIVE');

-- =================================================================
-- BÀI 6: N を Vます / 何を しますか / N(địa điểm) で V / Vませんか / Vましょう
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6), 'FILL_BLANK', 'EASY', 'Bài 6: Trợ từ đối tượng tác động (O)', 'お茶（ちゃ） [ ? ] 飲（の）みます。', '["を"]'::jsonb, 'Trợ từ 「を」 chỉ đối tượng tác động trực tiếp.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6), 'FILL_BLANK', 'MEDIUM', 'Bài 6: Trợ từ địa điểm hành động (De)', 'レストラン [ ? ] 食事（しょくじ）を します。', '["で"]'::jsonb, 'Trợ từ 「で」 chỉ địa điểm hành động.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6), 'FILL_BLANK', 'MEDIUM', 'Bài 6: Đuôi rủ rê lịch sự (Masenka)', '一緒（いっしょ）に お茶（ちゃ）を 飲（の）み [ ? ]。', '["ませんか"]'::jsonb, 'Mẫu 「Vませんか」 dùng để rủ rê lịch sự.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6), 'FILL_BLANK', 'EASY', 'Bài 6: Đuôi đồng ý rủ rê (Mashou)', 'ええ、飲（の）み [ ? ]。', '["ましょう"]'::jsonb, 'Nhận lời rủ rê bằng 「〜ましょう」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6), 'FILL_BLANK', 'MEDIUM', 'Bài 6: Hỏi làm cái gì (Nani o)', '[ ? ] を 買（か）いましたか。', '["何（なに）"]'::jsonb, 'Hỏi làm cái gì dùng 「何を」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6), 'FILL_BLANK', 'EASY', 'Bài 6: Trợ từ đọc sách (O)', '本（ほん） [ ? ] 読（よ）みます。', '["を"]'::jsonb, 'Trợ từ 「を」 chỉ đối tượng đọc sách.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6), 'FILL_BLANK', 'EASY', 'Bài 6: Trợ từ chụp ảnh (O)', '写真（しゃしん） [ ? ] 撮（と）ります。', '["を"]'::jsonb, 'Trợ từ 「を」 chỉ đối tượng chụp ảnh.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6), 'FILL_BLANK', 'MEDIUM', 'Bài 6: Trợ từ địa điểm gặp bạn (De)', '駅（えき） [ ? ] 友達（ともだち）に 会（あ）います。', '["で"]'::jsonb, 'Trợ từ 「で」 chỉ địa điểm gặp mặt.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6), 'FILL_BLANK', 'EASY', 'Bài 6: Trợ từ gặp ai (Ni)', '友達（ともだち） [ ? ] 会（あ）います。', '["に"]'::jsonb, 'Động từ 会います đi với trợ từ 「に」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6), 'FILL_BLANK', 'MEDIUM', 'Bài 6: Hỏi rủ rê đi đâu làm gì', '一緒（いっしょ）に 行（い）き [ ? ]。', '["ませんか"]'::jsonb, 'Rủ rê làm gì cùng nhau dùng 「〜ませんか」.', 1.00, 'ACTIVE');

-- =================================================================
-- BÀI 7: N(công cụ) で V / N に N2 を あげます / もらいます / もう Vました
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 7), 'FILL_BLANK', 'EASY', 'Bài 7: Trợ từ công cụ (De)', '箸（はし） [ ? ] 食（た）べます。', '["で"]'::jsonb, 'Trợ từ 「で」 chỉ công cụ thực hiện.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 7), 'FILL_BLANK', 'MEDIUM', 'Bài 7: Trợ từ đối tượng nhận (Ni)', '山田（やまだ）さん [ ? ] 花（はな）を あげました。', '["に"]'::jsonb, 'Trợ từ 「に」 đi sau người nhận.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 7), 'FILL_BLANK', 'MEDIUM', 'Bài 7: Từ trả lời chưa làm (Mada)', 'もう 昼ご飯を 食べましたか。... いいえ、[ ? ] です。', '["まだ"]'::jsonb, 'Trả lời chưa làm bằng 「いいえ、まだです」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 7), 'FILL_BLANK', 'EASY', 'Bài 7: Trợ từ ngôn ngữ viết (De)', '日本語（にほんご） [ ? ] レポートを 書（か）きます。', '["で"]'::jsonb, 'Trợ từ 「で」 chỉ ngôn ngữ thực hiện.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 7), 'FILL_BLANK', 'MEDIUM', 'Bài 7: Hỏi từ này tiếng Nhật là gì', '「Thank you」は 日本語（にほんご）で [ ? ] ですか。... 「ありがとう」です。', '["何（なん）"]'::jsonb, 'Hỏi nghĩa từ dùng 「何ですか」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 7), 'FILL_BLANK', 'MEDIUM', 'Bài 7: Trợ từ nhận từ ai (Ni/Kara)', '木村（きむら）さん [ ? ] 本（ほん）を もらいました。', '["に"]'::jsonb, 'Nhận từ ai dùng trợ từ 「に」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 7), 'FILL_BLANK', 'EASY', 'Bài 7: Cho mượn (Agemasu/Kashimasu)', '友達（ともだち）に 辞書（じしょ）を [ ? ]。', '["貸（か）しました"]'::jsonb, 'Cho mượn dùng động từ 「貸します」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 7), 'FILL_BLANK', 'EASY', 'Bài 7: Mượn từ ai (Karimasu)', '銀行（ぎんこう）から お金を [ ? ]。', '["借（か）りました"]'::jsonb, 'Mượn từ ai dùng 「借りれました」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 7), 'FILL_BLANK', 'MEDIUM', 'Bài 7: Đã làm xong rồi (Mou)', '[ ? ] 荷物（にもつ）を 送（おく）りましたか。', '["もう"]'::jsonb, 'Phó từ 「もう」 đứng trước động từ quá khứ chỉ sự hoàn thành.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 7), 'FILL_BLANK', 'EASY', 'Bài 7: Trợ từ tặng quà cho mẹ (Ni)', '母（はは） [ ? ] プレゼントを あげます。', '["に"]'::jsonb, 'Tặng cho ai đi với trợ từ 「に」.', 1.00, 'ACTIVE');

-- =================================================================
-- BÀI 8: Tính từ い / Tính từ な / Tính từ な N / とても / あまり
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 8), 'FILL_BLANK', 'EASY', 'Bài 8: Tính từ i bổ nghĩa danh từ', '富士山（ふじさん）は 高（たか）い [ ? ] です。', '["山（やま）"]'::jsonb, 'Tính từ đuôi い đi trực tiếp với danh từ.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 8), 'FILL_BLANK', 'MEDIUM', 'Bài 8: Phó từ đi với phủ định (Amari)', '日本（にほん）の 料理（りょうり）は [ ? ] 美味（おい）しくないです。', '["あまり"]'::jsonb, 'Phó từ 「あまり」 đi với phủ định.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 8), 'FILL_BLANK', 'MEDIUM', 'Bài 8: Phủ định tính từ na (Dewa arimasen)', '親切（しんせつ） [ ? ]。', '["ではありません"]'::jsonb, 'Phủ định tính từ đuôi な dạng lịch sự.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 8), 'FILL_BLANK', 'EASY', 'Bài 8: Tính từ na bổ nghĩa danh từ (Na)', '奈良（なら）は 静（しず）か [ ? ] 町（まち）です。', '["な"]'::jsonb, 'Tính từ đuôi な phải thêm 「な」 khi đi với danh từ.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 8), 'FILL_BLANK', 'EASY', 'Bài 8: Phó từ chỉ mức độ rất (Totemo)', '桜（さくら）は [ ? ] 綺麗（きれい）です。', '["とても"]'::jsonb, 'Phó từ 「とても」 nghĩa là rất.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 8), 'FILL_BLANK', 'MEDIUM', 'Bài 8: Phủ định tính từ i (Kunai)', 'この 本（ほん）は おもしろ [ ? ] です。', '["くない"]'::jsonb, 'Phủ định tính từ đuôi い bỏ い thêm 「くない」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 8), 'FILL_BLANK', 'MEDIUM', 'Bài 8: Liên từ nối trái ngược (Ga)', '日本（にほん）の 料理（りょうり）は 美味（おい）しいです [ ? ]、高（たか）いです。', '["が"]'::jsonb, 'Liên từ 「が」 dùng nối 2 vế tính từ trái ngược.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 8), 'FILL_BLANK', 'EASY', 'Bài 8: Hỏi cảm tưởng về N (Dou)', '日本（にほん）の 生活（せいかつ）は [ ? ] ですか。', '["どう"]'::jsonb, 'Nghi vấn từ 「どう」 dùng hỏi cảm tưởng.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 8), 'FILL_BLANK', 'MEDIUM', 'Bài 8: Hỏi tính chất của N (Don na)', '[ ? ] 町（まち）ですか。... 静（しず）かな 町です。', '["どんな"]'::jsonb, 'Nghi vấn từ 「どんな + N」 dùng hỏi tính chất.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 8), 'FILL_BLANK', 'EASY', 'Bài 8: Phủ định tính từ いい (Yokunai)', '天気（てんき）が あまり [ ? ] です。', '["よくない"]'::jsonb, 'Phủ định của いい là 「よくない」.', 1.00, 'ACTIVE');

-- =================================================================
-- BÀI 9: N が あります / わかります / 好きです / 嫌いです / 上手です / から
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 9), 'FILL_BLANK', 'EASY', 'Bài 9: Trợ từ sở thích Suki (Ga)', '私（わたし）は スポーツ [ ? ] 幸（す）きです。', '["が"]'::jsonb, 'Tính từ 好き đi với trợ từ 「が」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 9), 'FILL_BLANK', 'MEDIUM', 'Bài 9: Liên từ nguyên nhân Kara', '時間（じかん）が ありません [ ? ]、タクシーで 行（い）きます。', '["から"]'::jsonb, 'Liên từ 「から」 biểu thị nguyên nhân.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 9), 'FILL_BLANK', 'MEDIUM', 'Bài 9: Hỏi thể loại Don na', '[ ? ] 料理（りょうり）が 好きですか。', '["どんな"]'::jsonb, 'Dùng 「どんな + Danh từ」 hỏi thể loại.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 9), 'FILL_BLANK', 'EASY', 'Bài 9: Trợ từ năng lực Wakarimasu (Ga)', '日本語（にほんご） [ ? ] わかります。', '["が"]'::jsonb, 'Động từ わかります đi với trợ từ 「が」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 9), 'FILL_BLANK', 'EASY', 'Bài 9: Trợ từ sở hữu Arimasu (Ga)', '車（くるま） [ ? ] あります。', '["が"]'::jsonb, 'Động từ あります chỉ sở hữu đi với trợ từ 「が」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 9), 'FILL_BLANK', 'MEDIUM', 'Bài 9: Trợ từ giỏi môn gì Joutzu (Ga)', 'ダンス [ ? ] 上手（じょうず）です。', '["が"]'::jsonb, 'Tính từ 上手 đi với trợ từ 「が」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 9), 'FILL_BLANK', 'EASY', 'Bài 9: Phó từ hoàn toàn không (Zenzen)', '英語（えいご）が [ ? ] わかりません。', '["全然（ぜんぜん）"]'::jsonb, 'Phó từ 「全然」 đi với phủ định.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 9), 'FILL_BLANK', 'MEDIUM', 'Bài 9: Phó từ đại khái (Daitai)', '日本語（にほんご）が [ ? ] わかります。', '["だいたい"]'::jsonb, 'Phó từ 「だいたい」 nghĩa là đại khái.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 9), 'FILL_BLANK', 'EASY', 'Bài 9: Hỏi lý do tại sao (Doushite)', '[ ? ] 昨日（きのう） 会社（かいしゃ）を 休（やす）みましたか。', '["どうして"]'::jsonb, 'Nghi vấn từ 「どうして」 hỏi lý do.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 9), 'FILL_BLANK', 'MEDIUM', 'Bài 9: Trả lời vì lý do gì (Kara)', '用事（ようじ）が ありました [ ? ] です。', '["から"]'::jsonb, 'Trả lời lý do bằng 「〜からです」.', 1.00, 'ACTIVE');

-- =================================================================
-- BÀI 10: N が あります / います / N1 に N2 が あります / N1 の N2
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 10), 'FILL_BLANK', 'EASY', 'Bài 10: Tồn tại sinh vật sống (Imasu)', '部屋（へや）に 猫（ねこ）が [ ? ]。', '["います"]'::jsonb, 'Động vật/con người dùng 「います」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 10), 'FILL_BLANK', 'EASY', 'Bài 10: Tồn tại đồ vật vô giác (Arimasu)', '机（つくえ）の 上（うえ）に 本（ほん）が [ ? ]。', '["あります"]'::jsonb, 'Vật vô giác dùng 「あります」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 10), 'FILL_BLANK', 'MEDIUM', 'Bài 10: Danh từ vị trí phía trên (Ue)', '机（つくえ）の [ ? ] に 辞書（じしょ）が あります。', '["上（うえ）"]'::jsonb, 'Danh từ vị trí 上（うえ） nghĩa là phía trên.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 10), 'FILL_BLANK', 'MEDIUM', 'Bài 10: Danh từ vị trí phía trong (Naka)', '箱（はこ）の [ ? ] に 手紙（てがみ）が あります。', '["中（なか）"]'::jsonb, 'Danh từ vị trí 中（なか） nghĩa là bên trong.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 10), 'FILL_BLANK', 'EASY', 'Bài 10: Trợ từ địa điểm tồn tại (Ni)', '公園（こうえん） [ ? ] 子供（こども）が います。', '["に"]'::jsonb, 'Trợ từ 「に」 đi sau địa điểm tồn tại.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 10), 'FILL_BLANK', 'MEDIUM', 'Bài 10: Danh từ vị trí bên cạnh (Tonari)', '銀行（ぎんこう）の [ ? ] に 郵便局（ゆうびんきょく）が あります。', '["隣（となり）"]'::jsonb, 'Danh từ vị trí 隣（となり） nghĩa là bên cạnh.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 10), 'FILL_BLANK', 'EASY', 'Bài 10: Nghi vấn từ hỏi ai ở đó (Dare)', 'あそこに [ ? ] が いますか。... 佐藤さんが います。', '["誰（だれ）"]'::jsonb, 'Hỏi người tồn tại dùng 「誰」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 10), 'FILL_BLANK', 'EASY', 'Bài 10: Nghi vấn từ hỏi cái gì ở đó (Nani)', '部屋（へや）に [ ? ] が ありますか。... 机があります。', '["何（なに）"]'::jsonb, 'Hỏi vật tồn tại dùng 「何」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 10), 'FILL_BLANK', 'MEDIUM', 'Bài 10: Nối danh từ vị trí và danh từ (No)', '本屋（ほんや）と 銀行（ぎんこう） [ ? ] 間（あいだ）に あります。', '["の"]'::jsonb, 'Trợ từ 「の」 nối giữa các vị trí.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 10), 'FILL_BLANK', 'MEDIUM', 'Bài 10: Danh từ vị trí phía sau (Ushiro)', '車（くるま）の [ ? ] に 男（おとこ）の 人（ひと）が います。', '["後（うし）ろ"]'::jsonb, 'Danh từ vị trí 後ろ nghĩa là phía sau.', 1.00, 'ACTIVE');
