-- V31: Seed Initial Data for 214 Radicals and Textbook Kanji Topics (Lesson 1 to 5)

-- 1. Seed Sample Radicals (214 Radicals Sample)
INSERT INTO radicals (radical_number, character, name_vi, stroke_count, meaning_vi, examples) VALUES
(1, '一', 'Nhất', 1, 'Số một, nét ngang', '一, 七, 三, 上, 下'),
(2, '丨', 'Cổn', 1, 'Nét sổ thẳng', '中, 串'),
(3, '丶', 'Phẩy', 1, 'Nét chấm', '丸, 丹'),
(4, '丿', 'Phiệt', 1, 'Nét phẩy xiên trái', '乃, 久'),
(5, '乙', 'Ất', 1, 'Vị trí thứ hai trong Thiên Can', '九, 乞'),
(6, '亅', 'Quyết', 1, 'Nét móc lên', '了, 予'),
(7, '二', 'Nhị', 2, 'Số hai', '二, 五, 井, 仁'),
(8, '亠', 'Đầu', 2, 'Mái nhà phía trên', '亡, 交, 京'),
(9, '人', 'Nhân', 2, 'Con người', '人, 今, 休, 会, 傘'),
(10, '儿', 'Nhân đi', 2, 'Chân người', '元, 兄, 光, 先')
ON CONFLICT (radical_number) DO NOTHING;

-- 2. Seed Kanji Topics (第１課 - 第5課)
INSERT INTO kanji_topics (topic_id, title, jlpt_level, topic_order, description) VALUES
(1, '第１課', 'N5', 1, 'Chữ Hán chỉ Số đếm (1 đến 7) - NHẤT, NHỊ, TAM, TỨ, NGŨ, LỤC, THẤT'),
(2, '第２課', 'N5', 2, 'Chữ Hán chỉ Số đếm & Tiền tệ - BÁT, CỬU, THẬP, BÁCH, THIÊN, VẠN, VIÊN'),
(3, '第３課', 'N5', 3, 'Chữ Hán chỉ Thứ & Tự nhiên - NHẬT, NGUYỆT, HỎA, THỦY, MỘC, KIM, THỔ'),
(4, '第４課', 'N5', 4, 'Chữ Hán chỉ Con người & Học tập - NHÂN, TIÊN, SINH, HỌC, PHƯƠNG, HÀ'),
(5, '第５課', 'N5', 5, 'Chữ Hán chỉ Thời gian & Đơn vị - KIM, PHÂN, BÁN, THỜI, NIÊN, BẢN')
ON CONFLICT (topic_id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

-- Reset sequence for kanji_topics
SELECT setval('kanji_topics_topic_id_seq', (SELECT MAX(topic_id) FROM kanji_topics));

-- 3. Seed Kanji Entries into 'kanji' Table
INSERT INTO kanji (character, onyomi, kunyomi, meaning_vi, stroke_count, radical, jlpt_level, status) VALUES
('一', 'イチ', 'ひと', 'NHẤT', 1, '一', 'N5', 'PUBLISHED'),
('二', 'ニ', 'ふた', 'NHỊ', 2, '二', 'N5', 'PUBLISHED'),
('三', 'サン', 'みっ', 'TAM', 3, '一', 'N5', 'PUBLISHED'),
('四', 'シ', 'よん、よっ、よ', 'TỨ', 5, '囗', 'N5', 'PUBLISHED'),
('五', 'ゴ', 'いつ', 'NGŨ', 4, '二', 'N5', 'PUBLISHED'),
('六', 'ロク', 'むい、むっ', 'LỤC', 4, '八', 'N5', 'PUBLISHED'),
('七', 'シチ', 'なの、なな', 'THẤT', 2, '一', 'N5', 'PUBLISHED')
ON CONFLICT (character) DO UPDATE SET 
    onyomi = EXCLUDED.onyomi, 
    kunyomi = EXCLUDED.kunyomi, 
    meaning_vi = EXCLUDED.meaning_vi, 
    stroke_count = EXCLUDED.stroke_count,
    status = 'PUBLISHED';

-- 4. Seed Kanji Topic Items (Lesson 1 Kanji Items & Accepted Romaji)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 
    1, 
    k.kanji_id, 
    CASE k.character 
        WHEN '一' THEN 1 WHEN '二' THEN 2 WHEN '三' THEN 3 WHEN '四' THEN 4 
        WHEN '五' THEN 5 WHEN '六' THEN 6 WHEN '七' THEN 7 
    END,
    CASE k.character 
        WHEN '一' THEN '一人(ひとり), 一つ(ひとつ), ※一日(ついたち)'
        WHEN '二' THEN '二つ(ふたつ), 二人(ふたり), ※二日(ふつか)'
        WHEN '三' THEN '三日(みっか), 三つ(みっつ)'
        WHEN '四' THEN '四(よん), 四日(よっか), 四つ(よっつ)'
        WHEN '五' THEN '五つ(いつつ), 五日(いつか)'
        WHEN '六' THEN '六日(むいか), 六つ(むっつ)'
        WHEN '七' THEN '七日(なのか), 七つ(ななつ)'
    END,
    CASE k.character 
        WHEN '一' THEN '一(いち), 一生懸命(いっしょうけんめい)'
        WHEN '二' THEN '二(に), 二次会(にじかい)'
        WHEN '三' THEN '三(さん), 三月(さんがつ)'
        WHEN '四' THEN '四月(しがつ)'
        WHEN '五' THEN '五(ご)'
        WHEN '六' THEN '六(ろく)'
        WHEN '七' THEN '七月(しちがつ)'
    END,
    CASE k.character 
        WHEN '一' THEN 'hitori, hitotsu, tsuitachi, ichi, isshoukenmei, hitotatsu'
        WHEN '二' THEN 'futatsu, futari, futsuka, ni, nijikai'
        WHEN '三' THEN 'mikka, mittsu, san, sangatsu'
        WHEN '四' THEN 'yon, yokka, yottsu, shigatsu, shi'
        WHEN '五' THEN 'itsutsu, itsuka, go'
        WHEN '六' THEN 'muika, muttsu, roku'
        WHEN '七' THEN 'nanoka, nanatsu, shichigatsu, shichi, nana'
    END
FROM kanji k WHERE k.character IN ('一', '二', '三', '四', '五', '六', '七')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- 5. Seed Reading Sentence Exercises (漢字を読みましょう!) for Lesson 1
INSERT INTO kanji_exercises (topic_id, exercise_type, sentence_jp, target_kanji, reading_hiragana, display_order) VALUES
(1, 'READING_SENTENCE', '① Ａ: いま、何時(なんじ)ですか？ Ｂ: いま、一時三分(いちじさんぷん)です。', '一時三分', 'いちじさんぷん', 1),
(1, 'READING_SENTENCE', '② 私(わたし)の誕生日(たんじょうび)は 二月四日(にがつよっか)です。', '二月四日', 'にがつよっか', 2),
(1, 'READING_SENTENCE', '③ Ａ: 何時(なんじ)に ごはんを たべますか。 Ｂ: 七時(しちじ)に ごはんを たべます。', '七時', 'しちじ', 3),
(1, 'READING_SENTENCE', '④ Ａ: いつ 東京(とうきょう)へ 行(い)きますか。 Ｂ: 五月五日(ごがついつか)に 行(い)きます。', '五月五日', 'ごがついつか', 4),
(1, 'READING_SENTENCE', '⑤ Ａ: サントスさんの 誕生日(たんじょうび)は いつですか。 Ｂ: 六月七日(ろくがつなのか)です。', '六月七日', 'ろくがつなのか', 5);

-- 6. Seed Quiz Test Questions (テスト) for Lesson 1
INSERT INTO kanji_exercises (topic_id, exercise_type, sentence_jp, target_kanji, reading_hiragana, options_json, correct_option, display_order) VALUES
(1, 'QUIZ_TEST', 'たんじょうびは 三月五日 です。', '三月五日', 'さんがついつか', '["1. さんがつ／いつか", "2. さんげつ／ごにち", "3. さんがつ／ごじつ", "4. さんげつ／いつつ"]', 1, 1),
(1, 'QUIZ_TEST', 'いま 七時四分 です。', '七時四分', 'しちじよんぷん', '["1. しち／よんふん", "2. なな／よんぶん", "3. しち／よんぷん", "4. なの／よんふん"]', 3, 2);
