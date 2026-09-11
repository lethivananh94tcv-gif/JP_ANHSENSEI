-- Flyway Migration V48: Enterprise Seed Question Bank & Options for N5 Grammar Lessons 1 -> 10 (3+ Questions per Lesson)

-- =================================================================
-- BÀI 1: N1 は N2 です / ではありません / ですか / も / の
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 1), 'FILL_BLANK', 'EASY', 'Điền trợ từ phù hợp vào ô trống:', '私（わたし） [ ? ] 学生（がくせい）です。', '["は"]'::jsonb, 'Trợ từ 「は」 đánh dấu chủ đề của câu.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 1), 'MULTIPLE_CHOICE', 'MEDIUM', 'Chuyển câu sau sang dạng PHỦ ĐỊNH lịch sự:', '田中（たなか）さんは 先生（せんせい）です。', '["田中（たなか）さんは 先生（せんせい）ではありません。"]'::jsonb, 'Phủ định của 「～です」 là 「～ではありません」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 1), 'FILL_BLANK', 'MEDIUM', 'Điền trợ từ biểu thị sự đồng tán (Cũng):', '私（わたし）は ベトナム人（じん）です。ナムさん [ ? ] ベトナム人（じん）です。', '["も"]'::jsonb, 'Trợ từ 「も」 (cũng) dùng khi thuộc tính trùng khớp.', 1.00, 'ACTIVE');

INSERT INTO question_bank_options (question_id, option_text, is_correct, sort_order)
SELECT q.question_id, o.opt_text, o.is_corr, o.sort_ord
FROM question_bank q
CROSS JOIN (
  VALUES 
  ('田中（たなか）さんは 先生（せんせい）ではありません。', TRUE, 1),
  ('田中（たなか）さんは 先生（せんせい）ですか。', FALSE, 2),
  ('田中（たなか）さん も 先生（せんせい）です。', FALSE, 3),
  ('田中（たなか）さんの 先生（せんせい）です。', FALSE, 4)
) AS o(opt_text, is_corr, sort_ord)
WHERE q.lesson_id = (SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 1) AND q.question_type = 'MULTIPLE_CHOICE' AND q.deleted_at IS NULL;

-- =================================================================
-- BÀI 2: これ / それ / あれ / この N / その N / あの N / N の N
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 2), 'FILL_BLANK', 'EASY', 'Điền đại từ chỉ định vật ở GẦN NGƯỜI NÓI:', '[ ? ] は 本（ほん）です。', '["これ"]'::jsonb, 'Dùng 「これ」 để chỉ vật ở gần người nói.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 2), 'FILL_BLANK', 'EASY', 'Điền đại từ bổ nghĩa cho danh từ ở GẦN NGƯỜI NGHE:', '[ ? ] 傘（かさ）は 私（わたし）の です。', '["その"]'::jsonb, 'Dùng 「その + Danh từ」 để chỉ vật ở gần người nghe.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 2), 'MULTIPLE_CHOICE', 'MEDIUM', 'Chuyển câu sau sang dạng CÂU HỎI LỰA CHỌN (N1 か N2 か):', 'これは 本（ほん）です。辞書（じしょ）です。', '["これ は 本（ほん）ですか、辞書（じしょ）ですか。"]'::jsonb, 'Dạng câu hỏi lựa chọn dùng cấu trúc 「N1 か N2 か」.', 1.00, 'ACTIVE');

INSERT INTO question_bank_options (question_id, option_text, is_correct, sort_order)
SELECT q.question_id, o.opt_text, o.is_corr, o.sort_ord
FROM question_bank q
CROSS JOIN (
  VALUES 
  ('これ は 本（ほん）ですか、辞書（じしょ）ですか。', TRUE, 1),
  ('これ は 本（ほん）と 辞書（じしょ）です。', FALSE, 2),
  ('これ は 本（ほん）の 辞書（じしょ）ですか。', FALSE, 3),
  ('これ も 本（ほん）ですか。', FALSE, 4)
) AS o(opt_text, is_corr, sort_ord)
WHERE q.lesson_id = (SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 2) AND q.question_type = 'MULTIPLE_CHOICE' AND q.deleted_at IS NULL;

-- =================================================================
-- BÀI 3: ここ / そこ / あそこ / どこ / こちら / そちら / あちら / どちら
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 3), 'FILL_BLANK', 'EASY', 'Điền nghi vấn từ hỏi ĐỊA ĐIỂM (Ở đâu):', 'お手洗（てあら）いは [ ? ] ですか。', '["どこ"]'::jsonb, 'Dùng nghi vấn từ 「どこ」 để hỏi vị trí/địa điểm.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 3), 'FILL_BLANK', 'EASY', 'Điền đại từ chỉ địa điểm Ở ĐÂY (gần người nói):', '[ ? ] は 教室（きょうしつ）です。', '["ここ"]'::jsonb, '「ここ」 dùng để chỉ địa điểm nơi người nói đang ở.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 3), 'MULTIPLE_CHOICE', 'MEDIUM', 'Hỏi vị trí phòng làm việc một cách LỊCH SỰ:', '事務所（じむしょ）は どこですか。', '["事務所（じむしょ）は どちら ですか。"]'::jsonb, '「どちら」 là dạng lịch sự của 「どこ」.', 1.00, 'ACTIVE');

INSERT INTO question_bank_options (question_id, option_text, is_correct, sort_order)
SELECT q.question_id, o.opt_text, o.is_corr, o.sort_ord
FROM question_bank q
CROSS JOIN (
  VALUES 
  ('事務所（じむしょ）は どちら ですか。', TRUE, 1),
  ('事務所（じむしょ）は ここ ですか。', FALSE, 2),
  ('事務所（じむしょ）は なん ですか。', FALSE, 3),
  ('事務所（じむしょ）は だれ ですか。', FALSE, 4)
) AS o(opt_text, is_corr, sort_ord)
WHERE q.lesson_id = (SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 3) AND q.question_type = 'MULTIPLE_CHOICE' AND q.deleted_at IS NULL;

-- =================================================================
-- BÀI 4: 今 〜時 〜分 / Vます / Vました / Vませんでした / N(thời gian) に V
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'EASY', 'Điền trợ từ chỉ THỜI GIAN CỤ THỂ:', '毎朝（まいあさ） 7時（しちじ） [ ? ] 起（お）きます。', '["に"]'::jsonb, 'Trợ từ 「に」 đi sau danh từ chỉ thời gian có con số cụ thể.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'MULTIPLE_CHOICE', 'MEDIUM', 'Chuyển động từ sang thể QUÁ KHỨ KHẲNG ĐỊNH (Vました):', '昨日（きのう） 勉強（べんきょう）します。', '["昨日（きのう） 勉強（べんきょう）しました。"]'::jsonb, 'Hành động trong quá khứ phải chia về thể 「〜ました」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'MEDIUM', 'Điền trợ từ biểu thị ĐIỂM BẮT ĐẦU (Từ...):', '9時（くじ） [ ? ] 5時（ごじ）まで 働（はたら）きます。', '["から"]'::jsonb, 'Trợ từ 「から」 biểu thị điểm bắt đầu thời gian.', 1.00, 'ACTIVE');

INSERT INTO question_bank_options (question_id, option_text, is_correct, sort_order)
SELECT q.question_id, o.opt_text, o.is_corr, o.sort_ord
FROM question_bank q
CROSS JOIN (
  VALUES 
  ('昨日（きのう） 勉強（べんきょう）しました。', TRUE, 1),
  ('昨日（きのう） 勉強（べんきょう）しません。', FALSE, 2),
  ('昨日（きのう） 勉強（べんきょう）しませんでした。', FALSE, 3),
  ('昨日（きのう） 勉強（べんきょう）します。', FALSE, 4)
) AS o(opt_text, is_corr, sort_ord)
WHERE q.lesson_id = (SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4) AND q.question_type = 'MULTIPLE_CHOICE' AND q.deleted_at IS NULL;

-- =================================================================
-- BÀI 5: N(địa điểm) へ 行きます / N(phương tiện) で 行きます / N(người) と V
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 5), 'FILL_BLANK', 'EASY', 'Điền trợ từ HƯỚNG DI CHUYỂN (Đi đến đâu):', '東京（とうきょう） [ ? ] 行（い）きます。', '["へ"]'::jsonb, 'Trợ từ 「へ」 chỉ hướng di chuyển.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 5), 'FILL_BLANK', 'MEDIUM', 'Điền trợ từ PHƯƠNG TIỆN DI CHUYỂN:', '電車（でんしゃ） [ ? ] 行（い）きます。', '["で"]'::jsonb, 'Trợ từ 「で」 chỉ phương tiện di chuyển.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 5), 'FILL_BLANK', 'MEDIUM', 'Điền trợ từ CÙNG VỚI AI:', '友達（ともだち） [ ? ] 行（い）きます。', '["と"]'::jsonb, 'Trợ từ 「と」 biểu thị đối tượng cùng thực hiện hành động.', 1.00, 'ACTIVE');

-- =================================================================
-- BÀI 6: N を Vます / 何を しますか / N(địa điểm) で V / Vませんか / Vましょう
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6), 'FILL_BLANK', 'EASY', 'Điền trợ từ ĐỐI TƯỢNG TÁC ĐỘNG:', 'お茶（ちゃ） [ ? ] 飲（の）みます。', '["を"]'::jsonb, 'Trợ từ 「を」 chỉ đối tượng trực tiếp tác động.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6), 'FILL_BLANK', 'MEDIUM', 'Điền trợ từ ĐỊA ĐIỂM HÀNH ĐỘNG:', 'レストラン [ ? ] 食事（しょくじ）を します。', '["で"]'::jsonb, 'Trợ từ 「で」 chỉ địa điểm diễn ra hành động.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6), 'MULTIPLE_CHOICE', 'MEDIUM', 'Chuyển câu sang lời RỦ RÊ LỊCH SỰ (Vませんか):', '一緒（いっしょ）に お茶（ちゃ）を 飲みます。', '["一緒（いっしょ）に お茶（ちゃ）を 飲（の）みませんか。"]'::jsonb, 'Mẫu 「Vませんか」 dùng rủ rê một cách lịch sự.', 1.00, 'ACTIVE');

INSERT INTO question_bank_options (question_id, option_text, is_correct, sort_order)
SELECT q.question_id, o.opt_text, o.is_corr, o.sort_ord
FROM question_bank q
CROSS JOIN (
  VALUES 
  ('一緒（いっしょ）に お茶（ちゃ）を 飲（の）みませんか。', TRUE, 1),
  ('一緒（いっしょ）に お茶（ちゃ）を 飲（の）みましょう。', FALSE, 2),
  ('一緒（いっしょ）に お茶（ちゃ）を 飲（の）みます。', FALSE, 3),
  ('一緒（いっしょ）に お茶（ちゃ）を 飲（の）みませんでした。', FALSE, 4)
) AS o(opt_text, is_corr, sort_ord)
WHERE q.lesson_id = (SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 6) AND q.question_type = 'MULTIPLE_CHOICE' AND q.deleted_at IS NULL;

-- =================================================================
-- BÀI 7: N で V / N に N2 を あげます / もらいます / もう Vました
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 7), 'FILL_BLANK', 'EASY', 'Điền trợ từ DỤNG CỤ THỰC HIỆN:', '箸（はし） [ ? ] 食（た）べます。', '["で"]'::jsonb, 'Trợ từ 「で」 chỉ công cụ/dụng cụ.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 7), 'FILL_BLANK', 'MEDIUM', 'Điền trợ từ ĐỐI TƯỢNG NHẬN:', '山田（やまだ）さん [ ? ] 花（はな）を あげました。', '["に"]'::jsonb, 'Trợ từ 「に」 đi sau đối tượng nhận hành động.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 7), 'FILL_BLANK', 'MEDIUM', 'Trả lời câu hỏi HOÀN THÀNH (chưa làm):', 'もう 昼ご飯を 食べましたか。... いいえ、[ ? ] です。', '["まだ"]'::jsonb, 'Trả lời chưa làm bằng 「いいえ、まだです」.', 1.00, 'ACTIVE');

-- =================================================================
-- BÀI 8: Tính từ い / Tính từ な / Tính từ な N / とても / あまり
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 8), 'FILL_BLANK', 'EASY', 'Tính từ đuôi い đi trực tiếp với Danh từ:', '富士山（ふじさん）は 高（たか）い [ ? ] です。', '["山（やま）"]'::jsonb, 'Tính từ đuôi い bổ nghĩa trực tiếp cho danh từ.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 8), 'FILL_BLANK', 'MEDIUM', 'Điền phó từ PHỦ ĐỊNH MỨC ĐỘ (Không... lắm):', '日本（にほん）の 料理（りょうり）は [ ? ] 美味（おい）しくないです。', '["あまり"]'::jsonb, 'Phó từ 「あまり」 đi với phủ định.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 8), 'MULTIPLE_CHOICE', 'MEDIUM', 'Chuyển tính từ đuôi な sang dạng PHỦ ĐỊNH LỊCH SỰ:', '親切（しんせつ）です。', '["親切（しんせつ）ではありません。"]'::jsonb, 'Phủ định tính từ な là 「〜ではありません」.', 1.00, 'ACTIVE');

INSERT INTO question_bank_options (question_id, option_text, is_correct, sort_order)
SELECT q.question_id, o.opt_text, o.is_corr, o.sort_ord
FROM question_bank q
CROSS JOIN (
  VALUES 
  ('親切（しんせつ）ではありません。', TRUE, 1),
  ('親切（しんせつ）くないです。', FALSE, 2),
  ('親切（しんせつ）なです。', FALSE, 3),
  ('親切（しんせつ）いではありません。', FALSE, 4)
) AS o(opt_text, is_corr, sort_ord)
WHERE q.lesson_id = (SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 8) AND q.question_type = 'MULTIPLE_CHOICE' AND q.deleted_at IS NULL;

-- =================================================================
-- BÀI 9: N が あります / わかります / 好きです / S1 から S2
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 9), 'FILL_BLANK', 'EASY', 'Điền trợ từ CHỦ THỂ SỞ THÍCH:', '私（わたし）は スポーツ [ ? ] 幸（す）きです。', '["が"]'::jsonb, 'Tính từ 好き đi với trợ từ 「が」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 9), 'FILL_BLANK', 'MEDIUM', 'Điền liên từ BỞI VÌ (Nguyên nhân):', '時間（じかん）が ありません [ ? ]、タクシーで 行（い）きます。', '["から"]'::jsonb, 'Liên từ 「から」 biểu thị nguyên nhân.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 9), 'FILL_BLANK', 'MEDIUM', 'Hỏi về THỂ LOẠI / TÍNH CHẤT:', '[ ? ] 料理（りょうり）が 好きですか。', '["どんな"]'::jsonb, 'Dùng nghi vấn từ 「どんな + Danh từ」.', 1.00, 'ACTIVE');

-- =================================================================
-- BÀI 10: N が あります / います / N1 に N2 が あります / N1 の N2
-- =================================================================
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 10), 'FILL_BLANK', 'EASY', 'Động từ TỒN TẠI SINH VẬT SỐNG:', '部屋（へや）に 猫（ねこ）が [ ? ]。', '["います"]'::jsonb, 'Con người/động vật dùng 「います」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 10), 'FILL_BLANK', 'EASY', 'Động từ TỒN TẠI ĐỒ VẬT VÔ GIÁC:', '机（つくえ）の 上（うえ）に 本（ほん）が [ ? ]。', '["あります"]'::jsonb, 'Vật vô giác dùng 「あります」.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 10), 'FILL_BLANK', 'MEDIUM', 'Điền danh từ VỊ TRÍ PHÍA TRÊN:', '机（つくえ）の [ ? ] に 辞書（じしょ）が あります。', '["上（うえ）"]'::jsonb, 'Danh từ vị trí 上（うえ） nghĩa là phía trên.', 1.00, 'ACTIVE');
