-- ============================================================
-- V44: Seed Full Minna no Nihongo N5 Grammar Points & Examples
-- ============================================================

DO $$
DECLARE
    lvl_n5_id BIGINT;
    les_id BIGINT;
    g_id BIGINT;
BEGIN
    SELECT level_id INTO lvl_n5_id FROM levels WHERE code = 'N5';

    -- LESSON 1
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 1;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜は〜です', 'N1 là N2', 'Dùng để khẳng định danh từ N1 là N2. Trợ từ は (wa) chỉ chủ đề câu. です thể hiện sự lịch sự.', 'N1 + は + N2 + です', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 は たなか です。', 'わたし は たなか です。', 'Tôi là Tanaka.', 1),
        ('GRAMMAR', g_id, 'マイク・ミラーさん は アメリカ人 です。', 'マイク・ミラーさん は アメリカじん です。', 'Anh Mike Miller là người Mỹ.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜は〜ではありません / じゃありません', 'N1 không phải là N2', 'Phủ định của N1 là N2. ではありません dùng trong văn viết/trang trọng, じゃありません dùng trong văn nói.', 'N1 + は + N2 + ではありません / じゃありません', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 は 先生 ではありません。', 'わたし は せんせい ではありません。', 'Tôi không phải là giáo viên.', 1),
        ('GRAMMAR', g_id, 'サントスさん は 学生 じゃありません。', 'サントスさん は がくせい じゃありません。', 'Anh Santos không phải là học sinh.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜は〜ですか', 'N1 có phải là N2 không?', 'Câu hỏi nghi vấn danh từ. Trợ từ か đặt ở cuối câu để tạo câu hỏi.', 'N1 + は + N2 + ですか', 'N5', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'あなた は 会社員 ですか。', 'あなた は かいしゃいん ですか。', 'Bạn có phải là nhân viên công ty không?', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜の〜', 'N2 của/thuộc N1', 'Trợ từ の dùng để nối 2 danh từ, biểu thị sở hữu hoặc thuộc về.', 'N1 + の + N2', 'N5', 4, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 は IMC の 社員 です。', 'わたし は IMC の しゃいん です。', 'Tôi là nhân viên của công ty IMC.', 1);
    END IF;

    -- LESSON 2
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 2;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'これ / それ / あれ', 'Cái này / Cái đó / Cái kia', 'Chỉ định từ đóng vai trò danh từ chỉ vật thể. これ (gần người nói), それ (gần người nghe), あれ (xa cả 2).', 'これ / それ / あれ + は + N + です', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'これ は 本 です。', 'これ は ほん です。', 'Cái này là quyển sách.', 1),
        ('GRAMMAR', g_id, 'それ は 辞書 ですか。', 'それ は じしょ ですか。', 'Cái đó có phải là từ điển không?', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'この / その / あの + N', 'N này / N đó / N kia', 'Chỉ định từ định ngữ đứng trực tiếp trước danh từ.', 'この / その / あの + N + は + ...', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'この 傘 は 私 の です。', 'この かさ は わたし の です。', 'Cây dù này là của tôi.', 1);
    END IF;

    -- LESSON 3
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 3;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N は ここ / そこ / あそこ です', 'N ở chỗ này / chỗ đó / chỗ kia', 'Chỉ vị trí địa điểm của danh từ. ここ (gần người nói), そこ (gần người nghe), あそこ (xa cả 2).', 'N + は + ここ / そこ / あそこ + です', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'トイレ は あそこ です。', 'トイレ は あそこ です。', 'Nhà vệ sinh ở đằng kia.', 1),
        ('GRAMMAR', g_id, 'お手洗い は どこ ですか。', 'おてあらい は どこ ですか。', 'Nhà vệ sinh ở đâu vậy?', 2);
    END IF;

    -- LESSON 4
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 4;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜時〜分 に V', 'Làm V vào lúc mấy giờ', 'Trợ từ に đặt sau mốc thời gian con số cụ thể để chỉ thời điểm hành động xảy ra.', 'Thời gian (con số) + に + Động từ', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '毎朝 7時半 に 起きます。', 'まいあさ しちじはん に おきます。', 'Mỗi sáng tôi thức dậy lúc 7 giờ rưỡi.', 1);
    END IF;

    -- LESSON 20
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 20;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '普通形 (Thể thông thường / Thể ngắn)', 'Thể ngắn trong văn thoại thân mật', 'Chuyển đổi 4 dạng (+ hiện tại, - hiện tại, + quá khứ, - quá khứ) cho Động từ, Tính từ い, Tính từ な và Danh từ. Dùng trong gia đình, bạn bè.', '丁寧形 (です/ます) -> 普通形', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '明日 東京へ 行く。', 'あした とうきょうへ いく。', 'Ngày mai tớ đi Tokyo.', 1),
        ('GRAMMAR', g_id, '昨日 は 暇だった。', 'きのう は ひまだ体。', 'Hôm qua rảnh rỗi.', 2);
    END IF;

END $$;
