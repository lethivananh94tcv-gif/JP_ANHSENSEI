-- Flyway Migration V51: Full Synthesis Lesson 20 N5 Grammar Points (Thể thông thường 普通形)

DO $$
DECLARE
    lvl_n5_id BIGINT;
    les_20_id BIGINT;
    g_id BIGINT;
BEGIN
    SELECT level_id INTO lvl_n5_id FROM levels WHERE code = 'N5' LIMIT 1;
    SELECT lesson_id INTO les_20_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 20 LIMIT 1;

    IF les_20_id IS NOT NULL THEN
        -- Delete old sparse grammar points for lesson 20 to avoid duplication
        DELETE FROM examples WHERE content_type = 'GRAMMAR' AND content_id IN (SELECT grammar_id FROM grammar_points WHERE lesson_id = les_20_id);
        DELETE FROM grammar_points WHERE lesson_id = les_20_id;

        -- 1. ĐỘNG TỪ Thể thông thường (Verb Plain Form)
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_20_id, '普通形 [動詞] - Thể thông thường của ĐỘNG TỪ', 'Bảng biến đổi 4 thì thể ngắn của Động từ trong văn thoại thân mật', 'Trong hội thoại thân mật với bạn bè, gia đình, động từ được chia ở thể ngắn (普通形) thay vì thể lịch sự (丁寧形: です/ます). Bảng 4 thì: Khẳng định hiện tại (V-る/辞書形), Phủ định hiện tại (V-ない), Khẳng định quá khứ (V-た), Phủ định quá khứ (V-なかった).', 'V-ます -> V-る | V-ません -> V-ない | V-ました -> V-た | V-ませんでした -> V-なかった', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '明日 東京へ 行く。', 'あした とうきょうへ いく。', 'Ngày mai tớ sẽ đi Tokyo.', 1),
        ('GRAMMAR', g_id, '昨日 どこも 行かなかった。', 'きのう どこも いかなかった。', 'Hôm qua tớ đã không đi đâu cả.', 2);

        -- 2. TÍNH TỪ ĐUÔI い Thể thông thường (Adj-い Plain Form)
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_20_id, '普通形 [い形容詞] - Thể thông thường của TÍNH TỪ ĐUÔI い', 'Thể ngắn của Tính từ đuôi い (Lược bỏ です ở cuối câu)', 'Tính từ đuôi い ở thể thông thường chỉ cần lược bỏ です ở cuối câu. Bảng 4 thì: Khẳng định hiện tại (〜い), Phủ định hiện tại (〜くない), Khẳng định quá khứ (〜かった), Phủ định quá khứ (〜くなかった).', '〜いです -> 〜い | 〜くないです -> 〜くない | 〜かったです -> 〜かった | 〜くなかったです -> 〜くなかった', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'この ラーメン、すごく おいしいよ。', 'この ラーメン、すごく おいしいよ。', 'Món mì ramen này ngon lắm đấy.', 1),
        ('GRAMMAR', g_id, '昨日の テスト、難しかった。', 'きのうの テスト、むずかしかった。', 'Bài kiểm tra hôm qua đã rất khó.', 2);

        -- 3. TÍNH TỪ ĐUÔI な Thể thông thường (Adj-な Plain Form)
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_20_id, '普通形 [な形容詞] - Thể thông thường của TÍNH TỪ ĐUÔI な', 'Thể ngắn của Tính từ đuôi な (だ / じゃない / だった / じゃなかった)', 'Tính từ đuôi な biến đổi です thành だ / じゃない / だった / じゃなかった. Lưu ý đặc biệt: Khi đặt câu hỏi nghi vấn trong thể thông thường, bắt buộc LƯỢC BỎ だ ở cuối câu và lên giọng (Vd: 今日 暇？).', '〜です -> 〜だ | 〜じゃありません -> 〜じゃない | 〜でした -> 〜だった | 〜じゃありませんでした -> 〜じゃなかった', 'N5', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '今日 暇？ ... うん、暇だよ。', 'きょう ひま？ ... うん、ひまだよ。', 'Hôm nay rảnh không? ... Ừ, rảnh chứ.', 1),
        ('GRAMMAR', g_id, 'あの 町は 静かじゃなかった。', 'あの まちは しずかじゃなかった。', 'Thành phố đó đã không yên tĩnh chút nào.', 2);

        -- 4. DANH TỪ Thể thông thường (Noun Plain Form)
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_20_id, '普通形 [名詞] - Thể thông thường của DANH TỪ', 'Thể ngắn của Danh từ (だ / じゃない / だった / じゃなかった)', 'Danh từ biến đổi 4 thì thể thông thường tương tự tính từ đuôi な. Lược bỏ だ khi hỏi nghi vấn.', 'N + です -> だ | N + じゃありません -> じゃない | N + でした -> だった | N + じゃありませんでした -> じゃなかった', 'N5', 4, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '昨日 雨だった？ ... ううん、雨じゃなかった。', 'きのう あめだった？ ... ううん、あめじゃなかった。', 'Hôm qua trời mưa à? ... Không, đã không mưa.', 1),
        ('GRAMMAR', g_id, 'あしたは 休みだ。', 'あしたは やすみだ。', 'Ngày mai là ngày nghỉ.', 2);

        -- 5. QUY TẮC GIAO TIẾP THÂN MẬT (会話のルール)
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_20_id, '会話のルール - Quy tắc văn thoại thân mật (Giản lược & Nuốt âm)', 'Tổng hợp các quy tắc rút gọn, nuốt âm và trợ từ trong hội thoại hàng ngày', 'Trong văn thoại thực tế: (1) Lược bỏ các trợ từ は, を, へ. (2) Rút gọn Vています thành Vてる (Vd: 何してるの？, 知ってる). (3) Dùng うん (đồng ý) và ううん (phủ định). (4) Đuôi câu cảm xúc: 〜よ (mách nhỏ/nhấn mạnh), 〜ね (xác nhận/đồng cảm), 〜の (hỏi nhẹ nhàng).', 'Lược bỏ Trợ từ は/を/へ | Vています -> Vてる | うん/ううん | Từ cuối câu 〜よ/〜ね/〜の', 'N5', 5, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '今 何 してるの？ ... テレビ 見てる。', 'いま なに してるの？ ... テレビ みてる。', 'Bây giờ đang làm gì đấy? ... Tớ đang xem tivi.', 1),
        ('GRAMMAR', g_id, 'これ 食べる？ ... うん、食べる！', 'これ たべる？ ... うん、たべる！', 'Ăn cái này không? ... Ừ, ăn chứ!', 2);

    END IF;
END $$;
