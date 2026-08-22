-- Flyway Migration V21: Seed Quiz and Questions for Minna no Nihongo Bài 1 (N5)

-- 1. Insert Quiz for Lesson 1 (N5)
INSERT INTO quizzes (quiz_id, lesson_id, title, description, quiz_type, pass_score, time_limit_minutes, max_attempts, review_mode, status, created_at, updated_at)
SELECT 1, 1, 'Bài kiểm tra Bài 1: Giới thiệu bản thân & Chào hỏi', 'Đề trắc nghiệm 5 câu kiểm tra từ vựng và ngữ pháp cơ bản Bài 1 (わたしは～です / ～じん / ～さん).', 'LESSON', 80.00, 15, 5, 'IMMEDIATE', 'PUBLISHED', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM quizzes WHERE quiz_id = 1);

-- Ensure quiz 1 is linked to lesson 1
UPDATE quizzes SET lesson_id = 1, status = 'PUBLISHED', quiz_type = 'LESSON' WHERE quiz_id = 1;

-- 2. Insert Question 1 (Ngữ pháp は)
INSERT INTO questions (question_id, quiz_id, question_type, prompt, correct_answer, explanation, weight, sort_order, created_at, updated_at)
SELECT 1, 1, 'MULTIPLE_CHOICE', 'Điền trợ từ thích hợp vào chỗ trống: わたし _____ たなかです。', '{"optionId": 1, "text": "は (wa)"}'::jsonb, 'Trợ từ 「は」 đứng sau chủ ngữ (わたし) để đánh dấu chủ đề của câu.', 20.00, 1, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE question_id = 1);

INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 1, 1, 'は (wa)', TRUE, 1 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 1);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 2, 1, 'が (ga)', FALSE, 2 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 2);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 3, 1, 'に (ni)', FALSE, 3 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 3);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 4, 1, 'で (de)', FALSE, 4 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 4);

-- 3. Insert Question 2 (Từ vựng 私)
INSERT INTO questions (question_id, quiz_id, question_type, prompt, correct_answer, explanation, weight, sort_order, created_at, updated_at)
SELECT 2, 1, 'MULTIPLE_CHOICE', 'Từ 「私 (わたし)」 trong tiếng Việt có nghĩa là gì?', '{"optionId": 5, "text": "Tôi"}'::jsonb, '「私 (わたし)」 có nghĩa là "Tôi" (xưng hô ngôi thứ nhất số ít).', 20.00, 2, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE question_id = 2);

INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 5, 2, 'Tôi', TRUE, 1 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 5);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 6, 2, 'Bạn / Anh / Chị', FALSE, 2 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 6);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 7, 2, 'Anh ấy', FALSE, 3 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 7);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 8, 2, 'Cô ấy', FALSE, 4 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 8);

-- 4. Insert Question 3 (Quốc tịch アメリカ人)
INSERT INTO questions (question_id, quiz_id, question_type, prompt, correct_answer, explanation, weight, sort_order, created_at, updated_at)
SELECT 3, 1, 'MULTIPLE_CHOICE', 'Hoàn thành câu: マイク・ミラーさんは _____ 人(じん)です。', '{"optionId": 9, "text": "アメリカ (Mỹ)"}'::jsonb, 'Miller-san là người Mỹ (アメリカ人).', 20.00, 3, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE question_id = 3);

INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 9, 3, 'アメリカ (Mỹ)', TRUE, 1 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 9);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 10, 3, 'ニホン (Nhật Bản)', FALSE, 2 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 10);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 11, 3, 'ベトナム (Việt Nam)', FALSE, 3 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 11);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 12, 3, 'チュウゴク (Trung Quốc)', FALSE, 4 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 12);

-- 5. Insert Question 4 (Nghi vấn từ だれ)
INSERT INTO questions (question_id, quiz_id, question_type, prompt, correct_answer, explanation, weight, sort_order, created_at, updated_at)
SELECT 4, 1, 'MULTIPLE_CHOICE', 'Chọn từ nghi vấn phù hợp: あの 人(ひと)は _____ ですか。', '{"optionId": 13, "text": "だれ (Ai)"}'::jsonb, '「だれ」 nghĩa là "ai", dùng để hỏi người đó là ai.', 20.00, 4, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE question_id = 4);

INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 13, 4, 'だれ (Ai)', TRUE, 1 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 13);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 14, 4, 'どこ (Ở đâu)', FALSE, 2 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 14);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 15, 4, 'なん (Cái gì)', FALSE, 3 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 15);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 16, 4, 'いつ (Khi nào)', FALSE, 4 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 16);

-- 6. Insert Question 5 (Câu chào はじめまして)
INSERT INTO questions (question_id, quiz_id, question_type, prompt, correct_answer, explanation, weight, sort_order, created_at, updated_at)
SELECT 5, 1, 'MULTIPLE_CHOICE', 'Cách chào "Rất hân hạnh được gặp bạn" lần đầu tiên trong tiếng Nhật là gì?', '{"optionId": 17, "text": "はじめまして"}'::jsonb, '「はじめまして」 là lời chào lần đầu gặp mặt.', 20.00, 5, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE question_id = 5);

INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 17, 5, 'はじめまして', TRUE, 1 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 17);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 18, 5, 'おはようございます', FALSE, 2 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 18);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 19, 5, 'こんばんは', FALSE, 3 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 19);
INSERT INTO question_options (option_id, question_id, option_text, is_correct, sort_order)
SELECT 20, 5, 'さようなら', FALSE, 4 WHERE NOT EXISTS (SELECT 1 FROM question_options WHERE option_id = 20);

-- Sync sequences for PostgreSQL
SELECT setval('quizzes_quiz_id_seq', (SELECT MAX(quiz_id) FROM quizzes));
SELECT setval('questions_question_id_seq', (SELECT MAX(question_id) FROM questions));
SELECT setval('question_options_option_id_seq', (SELECT MAX(option_id) FROM question_options));
