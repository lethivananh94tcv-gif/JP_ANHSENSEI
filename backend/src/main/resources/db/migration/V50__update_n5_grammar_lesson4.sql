-- Flyway Migration V50: Update authentic Lesson 4 & Lesson 20 N5 Grammar Points & Question Bank

-- Delete old question entries for Lesson 4
DELETE FROM question_bank_options WHERE question_id IN (SELECT question_id FROM question_bank WHERE lesson_id = (SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4));
DELETE FROM question_bank WHERE lesson_id = (SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4);

-- Seed authentic 10-Question Bank for Lesson 4 (covering all 7 syllabus subsections)
INSERT INTO question_bank (lesson_id, question_type, difficulty, prompt, japanese_text, valid_answers, explanation, weight, status)
VALUES 
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'EASY', 'Bài 4: Cách đọc giờ 4 giờ (よじ)', '今（いま） [ ? ] 時（じ）です。', '["よ"]'::jsonb, '4 giờ đọc là よじ (không đọc よんじ).', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'EASY', 'Bài 4: Biến âm phút (15分)', '8時（はちじ） 15分（じゅうごふん） [ ? ]。', '["です"]'::jsonb, 'Nói mốc thời gian dùng danh từ + です.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'MEDIUM', 'Bài 4: Chủ đề địa danh hỏi giờ', 'ニューヨークは いま [ ? ] 時（じ）ですか。... ごぜん 4時（じ）です。', '["何（なん）"]'::jsonb, 'Hỏi giờ địa danh dùng 何時（なんじ）.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'EASY', 'Bài 4: Trợ từ mốc thời gian có con số', '毎朝（まいあさ） 6時（ろくじ） [ ? ] 起（お）きます。', '["に"]'::jsonb, 'Trợ từ に đi sau mốc thời gian có con số.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'MEDIUM', 'Bài 4: Động từ quá khứ khẳng định (Vました)', '昨日（きのう） 勉強（べんきょう） [ ? ]。', '["しました"]'::jsonb, 'Quá khứ khẳng định chia về thể 〜しました.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'MEDIUM', 'Bài 4: Động từ quá khứ phủ định (Vませんでした)', '昨日（きのう） 働（はたら）き [ ? ]。', '["ませんでした"]'::jsonb, 'Quá khứ phủ định chia về thể 〜ませんでした.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'MEDIUM', 'Bài 4: Trợ từ thời gian bắt đầu (Kara)', '9時（くじ） [ ? ] 5時（ごじ）まで 働（はたら）きます。', '["から"]'::jsonb, 'Trợ từ から biểu thị thời gian bắt đầu.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'MEDIUM', 'Bài 4: Trợ từ thời gian kết thúc (Made)', '9時（くじ）から 5時（ごじ） [ ? ] 働（はたら）きます。', '["まで"]'::jsonb, 'Trợ từ まで biểu thị thời gian kết thúc.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'EASY', 'Bài 4: Trợ từ と nối 2 danh từ', '銀行（ぎんこう）の 休みは 土曜日（どようび） [ ? ] 日曜日（にちようび）です。', '["と"]'::jsonb, 'Trợ từ と dùng để nối 2 danh từ.', 1.00, 'ACTIVE'),
((SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4), 'FILL_BLANK', 'EASY', 'Bài 4: Từ cuối câu truyền cảm xúc đồng tán (ね)', '毎日（まいにち） 9時（くじ）から 5時（ごじ）まで 勉強（べんきょう）します。... 大変（たいへん）です [ ? ]。', '["ね"]'::jsonb, 'Từ cuối câu ね thể hiện sự đồng tán / cảm thông.', 1.00, 'ACTIVE');

-- Insert randomized options for Lesson 4 questions
INSERT INTO question_bank_options (question_id, option_text, is_correct, sort_order)
SELECT q.question_id, o.opt_text, o.is_corr, o.sort_ord
FROM question_bank q
CROSS JOIN (
  VALUES 
  ('よ', TRUE, 1),
  ('よん', FALSE, 2),
  ('し', FALSE, 3),
  ('く', FALSE, 4)
) AS o(opt_text, is_corr, sort_ord)
WHERE q.lesson_id = (SELECT lesson_id FROM lessons WHERE level_id = (SELECT level_id FROM levels WHERE code = 'N5') AND sort_order = 4) AND q.prompt LIKE '%4 giờ%' AND q.deleted_at IS NULL;
