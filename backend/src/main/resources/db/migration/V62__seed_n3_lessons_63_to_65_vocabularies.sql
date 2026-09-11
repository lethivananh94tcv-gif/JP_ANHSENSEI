-- Flyway Migration V62: Seed N3 Lessons 63, 64, 65 Vocabularies & Ensure 15 Complete N3 Lessons (Bài 51 -> Bài 65)

DO $$
DECLARE
    lvl_n3_id BIGINT;
    les_id_63 BIGINT;
    les_id_64 BIGINT;
    les_id_65 BIGINT;
BEGIN
    SELECT level_id INTO lvl_n3_id FROM levels WHERE code = 'N3';

    -- Ensure Lessons 63, 64, 65 exist in lessons table
    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 63: Văn thoại & Giao tiếp tự nhiên (会話・表現)', 'Từ vựng văn thoại, rủ rê, xác nhận và giao tiếp đời sống', 13, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 13);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 64: Kính ngữ & Văn hóa công sở (敬語・ビジネス)', 'Từ vựng kính ngữ, khiêm nhường ngữ và văn hóa giao tiếp công sở', 14, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 14);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 65: Phủ định kép & Ôn tập tổng hợp N3 (総合・まとめ)', 'Từ vựng ôn tập tổng hợp N3, cụm từ diễn đạt chuyên sâu', 15, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 15);

    -- Get Lesson IDs
    SELECT lesson_id INTO les_id_63 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 13;
    SELECT lesson_id INTO les_id_64 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 14;
    SELECT lesson_id INTO les_id_65 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 15;

    -- Delete existing entries if any for lessons 13, 14, 15
    DELETE FROM vocabulary WHERE lesson_id IN (les_id_63, les_id_64, les_id_65);

    -- Seed Vocabularies for Bài 63 (Văn thoại & Giao tiếp tự nhiên N3)
    IF les_id_63 IS NOT NULL THEN
        INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
        VALUES
        (les_id_63, '会話', 'かいわ', '会話', 'hội thoại, trò chuyện', 'Danh từ', 1, 'PUBLISHED'),
        (les_id_63, '相手', 'あいて', '相手', 'đối phương, đối tác', 'Danh từ', 2, 'PUBLISHED'),
        (les_id_63, '噂', 'うわさ', '噂', 'tin đồn, lời đồn', 'Danh từ', 3, 'PUBLISHED'),
        (les_id_63, '一言', 'ひとこと', '一言', 'vài lời, một lời', 'Danh từ', 4, 'PUBLISHED'),
        (les_id_63, '話題', 'わだい', '話題', 'chủ đề nói chuyện', 'Danh từ', 5, 'PUBLISHED'),
        (les_id_63, '本音', 'ほんね', '本音', 'ý định thực sự, lòng thật', 'Danh từ', 6, 'PUBLISHED'),
        (les_id_63, '建前', 'たてまえ', '建前', 'lời nói xã giao, ngoài mặt', 'Danh từ', 7, 'PUBLISHED'),
        (les_id_63, '頷く', 'うなずく', '頷く', 'gật đầu đồng ý', 'Động từ', 8, 'PUBLISHED'),
        (les_id_63, '言い返す', 'いいかえす', '言い返す', 'nói đáp trả, cãi lại', 'Động từ', 9, 'PUBLISHED'),
        (les_id_63, '黙る', 'だまる', '黙る', 'im lặng, nín thinh', 'Động từ', 10, 'PUBLISHED');
    END IF;

    -- Seed Vocabularies for Bài 64 (Kính ngữ & Văn hóa công sở N3)
    IF les_id_64 IS NOT NULL THEN
        INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
        VALUES
        (les_id_64, '敬語', 'けいご', '敬語', 'kính ngữ', 'Danh từ', 1, 'PUBLISHED'),
        (les_id_64, '尊敬', 'そんけい', '尊敬', 'tôn kính, kính trọng', 'Danh từ', 2, 'PUBLISHED'),
        (les_id_64, '謙譲', 'けんじょう', '謙譲', 'khiêm nhường', 'Danh từ', 3, 'PUBLISHED'),
        (les_id_64, '丁寧', 'ていねい', '丁寧', 'lịch sự, cẩn thận', 'Tính từ', 4, 'PUBLISHED'),
        (les_id_64, '拝見する', 'はいけんする', '拝見する', 'xem, nhìn (khiêm nhường)', 'Động từ', 5, 'PUBLISHED'),
        (les_id_64, '伺う', 'うかがう', '伺う', 'đến thăm, hỏi (khiêm nhường)', 'Động từ', 6, 'PUBLISHED'),
        (les_id_64, '参る', 'まいる', '参る', 'đi, đến (khiêm nhường)', 'Động từ', 7, 'PUBLISHED'),
        (les_id_64, 'おっしゃる', 'おっしゃる', NULL, 'nói (tôn kính)', 'Động từ', 8, 'PUBLISHED'),
        (les_id_64, 'ご覧になる', 'ごらんになる', 'ご覧になる', 'xem, nhìn (tôn kính)', 'Động từ', 9, 'PUBLISHED'),
        (les_id_64, 'なさる', 'なさる', NULL, 'làm (tôn kính)', 'Động từ', 10, 'PUBLISHED');
    END IF;

    -- Seed Vocabularies for Bài 65 (Phủ định kép & Ôn tập tổng hợp N3)
    IF les_id_65 IS NOT NULL THEN
        INSERT INTO vocabulary (lesson_id, word, kana, kanji_form, meaning_vi, part_of_speech, sort_order, status)
        VALUES
        (les_id_65, '総合', 'そうごう', '総合', 'tổng hợp', 'Danh từ', 1, 'PUBLISHED'),
        (les_id_65, '要約', 'ようやく', '要約', 'tóm tắt, tóm lược', 'Danh từ', 2, 'PUBLISHED'),
        (les_id_65, '判断', 'はんだん', '判断', 'phán đoán, đánh giá', 'Danh từ', 3, 'PUBLISHED'),
        (les_id_65, '証明', 'しょうめい', '証明', 'chứng minh', 'Danh từ', 4, 'PUBLISHED'),
        (les_id_65, '主張', 'しゅちょう', '主張', 'chủ trương, ý kiến', 'Danh từ', 5, 'PUBLISHED'),
        (les_id_65, '矛盾', 'むじゅん', '矛盾', 'mâu thuẫn', 'Danh từ', 6, 'PUBLISHED'),
        (les_id_65, '必然', 'ひつぜん', '必然', 'tất nhiên, dĩ nhiên', 'Danh từ', 7, 'PUBLISHED'),
        (les_id_65, '疑問', 'ぎもん', '疑問', 'nghi vấn, thắc mắc', 'Danh từ', 8, 'PUBLISHED'),
        (les_id_65, '納得', 'なっとく', '納得', 'thấu hiểu, chấp nhận', 'Danh từ', 9, 'PUBLISHED'),
        (les_id_65, '結論', 'けつろん', '結論', 'kết luận', 'Danh từ', 10, 'PUBLISHED');
    END IF;

END $$;
