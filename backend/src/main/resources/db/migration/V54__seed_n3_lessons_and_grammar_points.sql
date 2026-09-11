-- Flyway Migration V54: Seed Complete 100% N3 Lessons (51-65) & Grammar Points & Examples

DO $$
DECLARE
    lvl_n3_id BIGINT;
    les_id BIGINT;
    g_id BIGINT;
BEGIN
    SELECT level_id INTO lvl_n3_id FROM levels WHERE code = 'N3';

    -- Seed 15 N3 Lessons if not exist
    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 51: Trạng thái & Xu hướng (～に違いない / ～がち)', 'Phỏng đoán chắc chắn và diễn tả khuynh hướng dễ xảy ra', 1, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 1);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 52: Giới hạn & Phạm vi (～について / ～に関して)', 'Liên quan đến chủ đề và phạm vi kéo dài không gian thời gian', 2, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 2);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 53: Nhấn mạnh & Đối lập (～にもかかわらず / ～わりに)', 'Nhượng bộ mặc dù... nhưng và đối lập trái với suy đoán', 3, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 3);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 54: So sánh & Tỷ lệ (～にくらべて / ～にしたがって)', 'So sánh 2 đối tượng và biến đổi đồng thời kéo theo tỷ lệ', 4, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 4);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 55: Nguyên nhân N3 (～おかげで / ～せいで / ～によって)', 'Nhờ có (tích cực), tại vì (tiêu cực) và phương thức nguyên nhân', 5, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 5);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 56: Mục đích & Kỳ vọng (～ように / ～ために)', 'Phân biệt mục đích ように và ために, bày tỏ nguyện vọng', 6, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 6);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 57: Giả định & Điều kiện N3 (～さえ～ば / ～ない限り)', 'Chỉ cần... thì... và chừng nào còn chưa... thì...', 7, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 7);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 58: Bắt buộc & Cấm đoán N3 (～ざるを得ない / ～わけにはいかない)', 'Đành phải làm (dù không muốn) và không thể làm vì lý do đạo đức', 8, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 8);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 59: Cảm xúc & Tâm trạng (～てたまらない / ～てしようがない)', 'Bày tỏ cảm xúc vô cùng, không thể chịu nổi', 9, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 9);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 60: Ý kiến & Đánh giá (～にすぎない / ～というものだ)', 'Chỉ là... & Bản chất chính là...', 10, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 10);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 61: Phương thức & Căn cứ (～をもとに / ～に基づいて)', 'Dựa trên cơ sở, căn cứ và tuân theo nguyên tắc', 11, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 11);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 62: Thời điểm & Tiến trình (～際 / ～にあたって / ～最中に)', 'Khi nhân dịp, nhân cơ hội và đúng lúc đang giữa chừng', 12, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 12);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 63: Rút gọn & Văn thoại N3 (～っけ / ～っこない)', 'Xác nhận ký ức và tuyệt đối không thể nào xảy ra', 13, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 13);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 64: Kính ngữ N3 nâng cao (～ていただく / ～においでになる)', 'Kính ngữ trang trọng trong công sở và giao tiếp đối tác', 14, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 14);

    INSERT INTO lessons (level_id, title, description, sort_order, is_sample, estimated_minutes, status, version)
    SELECT lvl_n3_id, 'Bài 65: Phủ định kép & Tổng hợp N3 (～わけがない / ～かねる)', 'Tuyệt đối không có chuyện... & Khó mà / Không thể làm được', 15, FALSE, 60, 'PUBLISHED', 0
    WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 15);

    -- ==========================================
    -- Bài 51: Bài 51: Trạng thái & Xu hướng (～に違いない / ～がち)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 1;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜に違いない', 'Chắc chắn là... (Phỏng đoán dựa trên căn cứ trực tiếp)', 'Dùng khi người nói phỏng đoán với độ tin tưởng rất cao (gần như 100%) dựa trên thông tin hoặc chứng cứ quan sát được.', '普通形 + に違いない (N/Adj-な bỏ だ)', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '犯人（はんにん）は あの 男（おとこ）に 違（ちが）いない。', 'はんにんは あの おとこに ちがいない。', 'Hung thủ chắc chắn là người đàn ông đó.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜がち / 〜っぽい', 'Thường hay / Có xu hướng (xấu) & Có vẻ như / Mang tính chất', '〜がち chỉ thói quen/xu hướng dễ mắc phải lỗi (Vd: hay quên, hay ốm). 〜っぽい chỉ đặc tính giống như (Vd: như trẻ con, như màu trắng).', 'V-ます(bỏ) / N + がち | N / Adj / V-ます(bỏ) + っぽい', 'N3', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '最近（さいきん） 寒（さむ）いので、風邪（かぜ）を ひきがちです。', 'さいきん さむいので、かぜを ひきがちです。', 'Dạo này vì lạnh nên tớ rất hay bị cảm.', 1),
        ('GRAMMAR', g_id, 'あの 人（ひと）は 子供（こども）っぽい 性格（せいかく）です。', 'あの ひとはおとなっぽい せいかくです。', 'Người đó có tính cách rất trẻ con.', 2);

    END IF;

    -- ==========================================
    -- Bài 52: Bài 52: Giới hạn & Phạm vi (～について / ～に関して)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 2;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜について / 〜に関して', 'Về... / Liên quan đến...', 'Dùng khi nói về nội dung, chủ đề của một cuộc hội thoại, nghiên cứu hoặc bài phát biểu. 〜に関して trang trọng hơn 〜について.', 'N + について / に関して', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '日本（にほん）の 文化（ぶんか）について 調（しら）べます。', 'にほんの ぶんかについて しらべます。', 'Tôi nghiên cứu về văn hóa Nhật Bản.', 1),
        ('GRAMMAR', g_id, 'この 問題（もんだい）に関して 何（なに）か 質問（しつもん）は ありますか。', 'この もんだいにかんして なにか しつもんは ありますか。', 'Liên quan đến vấn đề này có câu hỏi nào không ạ?', 2);

    END IF;

    -- ==========================================
    -- Bài 53: Bài 53: Nhấn mạnh & Đối lập (～にもかかわらず / ～わりに)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 3;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜にもかかわらず / 〜わりに', 'Mặc dù... nhưng / Tuy... nhưng lại...', '〜にもかかわらず diễn tả sự việc xảy ra bất chấp hoàn cảnh. 〜わりに diễn tả kết quả không tương xứng với mức độ chuẩn mực chung.', '普通形 + にもかかわらず | Nの / Adj / V + わりに', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '雨（あめ）にもかかわらず、多（おお）くの 人（ひと）が 集（あつ）まりました。', 'あめにもかかわらず、おおくの ひとが あつまりました。', 'Bất chấp trời mưa, rất nhiều người đã tập hợp lại.', 1),
        ('GRAMMAR', g_id, 'この 店（みせ）の 料理（りょうり）は 値段（ねだん）の わりに おいしいです。', 'この みせの りょうりは ねだんの わりに おいしいです。', 'Món ăn cửa hàng này ngon so với giá tiền.', 2);

    END IF;

    -- ==========================================
    -- Bài 54: Bài 54: So sánh & Tỷ lệ (～にくらべて / ～にしたがって)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 4;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜にくらべて / 〜にしたがって / 〜につれて', 'So với... / Càng... kéo theo càng...', '〜にくらべて dùng so sánh 2 đối tượng. 〜にしたがって / 〜につれて diễn tả sự thay đổi ở vế A kéo theo sự thay đổi tỷ lệ ở vế B.', 'N + にくらべて | V-る / N + にしたがって / につれて', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '今年（ことし）は 去年（きょねん）に くらべて 寒（さむ）いです。', 'ことしは きょねんに くらべて さむいです。', 'Năm nay lạnh hơn so với năm ngoái.', 1),
        ('GRAMMAR', g_id, '台風（たいふう）が 近（ちか）づくにしたがって、風（かぜ）が 答（つよ）くなってきた。', 'たいふうが ちかづくにしたがって、かぜが つよく me になってきた。', 'Càng tiến gần bão thì gió càng mạnh lên.', 2);

    END IF;

    -- ==========================================
    -- Bài 55: Bài 55: Nguyên nhân N3 (～おかげで / ～せいで / ～によって)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 5;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜おかげで / 〜せいで', 'Nhờ có... (kết quả tốt) / Tại vì... (kết quả xấu)', '〜おかげで dùng bày tỏ sự cảm ơn khi có kết quả tốt. 〜せいで dùng đổ lỗi/trách móc khi có kết quả xấu.', '普通形 + おかげで / せいで', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '先生（せんせい）の おかげで、 me 合格（ごうかく）できました。', 'せんせいの おかげで、 ごうかくできました。', 'Nhờ có thầy giáo mà em đã đỗ kỳ thi.', 1),
        ('GRAMMAR', g_id, '事故（じこ）の せいで、電車（でんしゃ）が 遅（おく）れました。', 'じこの せいで、でんしゃが おくれました。', 'Tại vì tai nạn nên tàu điện đã bị trễ.', 2);

    END IF;

    -- ==========================================
    -- Bài 56: Bài 56: Mục đích & Kỳ vọng (～ように / ～ために)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 6;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜ように (Mục đích)', 'Để... (Mục đích không mang ý chí tác động trực tiếp)', 'Đi với động từ thể khả năng hoặc động từ không mang ý chí (V-ない / V-可能形) để diễn tả trạng thái mong muốn đạt được.', 'V-可能形 / V-ない + ように', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '忘（わす）れないように、ノートに メモします。', 'わすれないように、ノートに メモします。', 'Tớ ghi chép vào sổ để không bị quên.', 1);

    END IF;

    -- ==========================================
    -- Bài 57: Bài 57: Giả định & Điều kiện N3 (～さえ～ば / ～ない限り)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 7;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜さえ〜ば & 〜ない限り', 'Chỉ cần... thì... & Chừng nào chưa... thì...', '〜さえ〜ば chỉ cần duy nhất 1 điều kiện đó thỏa mãn là đủ. 〜ない限り chỉ khi điều kiện vế A chưa thay đổi thì vế B vẫn duy trì.', 'N + さえ + V-ば | V-ない + 限り', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '体（からだ）さえ 健康（けんこう）なら、何（なに）でも できます。', 'からださえ けんこうなら、なんでも できます。', 'Chỉ cần cơ thể khỏe mạnh thì làm gì cũng được.', 1);

    END IF;

    -- ==========================================
    -- Bài 58: Bài 58: Bắt buộc & Cấm đoán N3 (～ざるを得ない / ～わけにはいかない)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 8;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜ざるを得ない & 〜わけにはいかない', 'Đành phải... (không muốn cũng phải làm) & Không thể... (vì lý do đạo đức/xã hội)', '〜ざるを得ない thể hiện tâm lý không muốn nhưng tình thế bắt buộc. 〜わけにはいかない diễn tả việc muốn làm nhưng lương tâm/quy tắc không cho phép.', 'V-ない(bỏ) + ざるを得ない (する->せざるを得ない) | V-る + わけにはいかない', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '社長（しゃちょう）の 命令（めいれい）だから、行（い）かざるを得ない。', 'しゃちょうの めいれいだから、いかざるをえない。', 'Vì là lệnh của giám đốc nên tớ đành phải đi.', 1);

    END IF;

    -- ==========================================
    -- Bài 59: Bài 59: Cảm xúc & Tâm trạng (～てたまらない / ～てしようがない)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 9;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜てたまらない / 〜てしようがない', 'Rất... / Khôn xiết / Không thể chịu nổi', 'Đi với các tính từ/động từ chỉ cảm xúc, bản năng (thèm, lo lắng, nhớ...) để nhấn mạnh mức độ cực kỳ cao.', 'V-て / Adj-くて / Adj-で + たまらない / しようがない', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '合格（ごうかく）して、嬉（うれ）しくてたまらない。', 'ごうかくして、うれしくてたまらない。', 'Thi đỗ rồi, tớ vui mừng không xiết.', 1);

    END IF;

    -- ==========================================
    -- Bài 60: Bài 60: Ý kiến & Đánh giá (～にすぎない / ～というものだ)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 10;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜にすぎない', 'Chỉ là... / Chẳng qua chỉ là...', 'Đánh giá sự việc ở mức độ thấp, không có gì đặc biệt hoặc khiêm tốn.', '普通形 + にすぎない', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私（わたし）は ただ 自分の 義務（ぎむ）を 果（は）たしたにすぎません。', 'わたしは ただ じぶんの ぎむを はたしたにすぎません。', 'Tôi chẳng qua chỉ hoàn thành nghĩa vụ của bản thân thôi.', 1);

    END IF;

    -- ==========================================
    -- Bài 61: Bài 61: Phương thức & Căn cứ (～をもとに / ～に基づいて)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 11;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜をもとに / 〜に基づいて', 'Dựa trên... / Dựa vào căn cứ...', '〜をもとに chỉ nguyên liệu, đề tài sáng tác. 〜に基づいて chỉ căn cứ pháp lý, dữ liệu thực tế.', 'N + をもとに / に基づいて', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'この 小説（しょうせつ）は 事実（じじつ）をもとに 書（か）かれました。', 'この しょうせつは じじつをもとに かかれました。', 'Cuốn tiểu thuyết này được viết dựa trên sự thật.', 1);

    END IF;

    -- ==========================================
    -- Bài 62: Bài 62: Thời điểm & Tiến trình (～際 / ～にあたって / ～最中に)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 12;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜際 / 〜最中に', 'Khi... (Trang trọng) & Đúng lúc đang...', '〜際 là dạng lịch sự của とき. 〜最中に chỉ sự việc bất ngờ chen ngang đúng lúc đang tập trung làm gì.', 'V-る/V-た/Nの + 際 | V-ている/Nの + 最中に', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '会議（かいぎ）の 最中に、電話（でんわ）が 鳴（な）った。', 'かいぎの さいちゅうに、でんわが なった。', 'Đúng lúc đang họp thì điện thoại reo.', 1);

    END IF;

    -- ==========================================
    -- Bài 63: Bài 63: Rút gọn & Văn thoại N3 (～っけ / ～っこない)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 13;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜っけ / 〜っこない', 'Có phải là... nhỉ? & Tuyệt đối không thể nào...', '〜っけ dùng khi cố nhớ lại thông tin đã quên. 〜っこない dùng phủ định mạnh mẽ sự khả thi của sự việc.', '普通形 + っけ | V-ます(bỏ) + っこない', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '彼（かれ）の 名前（なまえ）は 何（なん）だっけ。', 'かれの なまえは なんだっけ。', 'Tên anh ấy là gì ấy nhỉ?', 1),
        ('GRAMMAR', g_id, 'こんな 難（むずか）しい 問題（もんだい）、解（と）けっこないよ。', 'こんな むずかしい もんだい、とけっこないよ。', 'Bài tập khó thế này tuyệt đối không giải được đâu.', 2);

    END IF;

    -- ==========================================
    -- Bài 64: Bài 64: Kính ngữ N3 nâng cao (～ていただく / ～においでになる)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 14;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜においでになる / 〜と申される', 'Đến/Ở/Đi (Kính ngữ) & Nói (Kính ngữ)', 'Các dạng kính ngữ cao cấp dùng trong môi trường kinh doanh và giao tiếp đối tác tác phong chuyên nghiệp.', 'N + においでになる | 〜と + 申される', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '社長（しゃちょう）は どちらに においでになりますか。', 'しゃちょうは どちらに においでになりますか。', 'Giám đốc đang ở đâu ạ?', 1);

    END IF;

    -- ==========================================
    -- Bài 65: Bài 65: Phủ định kép & Tổng hợp N3 (～わけがない / ～かねる)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order = 15;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜わけがない / 〜かねる', 'Không thể nào có chuyện... & Khó mà... / Không thể...', '〜わけがない phủ định với căn cứ lý logic chắc chắn. 〜かねる từ chối lịch sự trong kinh doanh (khó mà đáp ứng/làm được).', '普通形 + わけがない | V-ます(bỏ) + かねる', 'N3', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '彼（かれ）が 嘘（うそ）をつくわけがない。', 'かれが うそをつくわけがない。', 'Anh ấy tuyệt đối không thể nào nói dối được.', 1),
        ('GRAMMAR', g_id, 'その ご要請（ようせい）には 応（こた）えかねます。', 'その ごようせいには こたえかねます。', 'Yêu cầu đó chúng tôi e rằng khó mà đáp ứng được ạ.', 2);

    END IF;

END $$;