-- ====================================================================
-- V46: Seed Authentic Minna no Nihongo N5 Grammar (From PDF Ngữ pháp N5)
-- ====================================================================

DO $$
DECLARE
    lvl_n5_id BIGINT;
    les_id BIGINT;
    g_id BIGINT;
BEGIN
    SELECT level_id INTO lvl_n5_id FROM levels WHERE code = 'N5';

    -- Delete old grammar points for N5 to re-seed clean authentic PDF textbook data
    DELETE FROM examples WHERE content_type = 'GRAMMAR' AND content_id IN (
        SELECT grammar_id FROM grammar_points gp JOIN lessons l ON l.lesson_id = gp.lesson_id WHERE l.level_id = lvl_n5_id
    );
    DELETE FROM grammar_points WHERE lesson_id IN (
        SELECT lesson_id FROM lessons WHERE level_id = lvl_n5_id
    );

    -- ==========================================
    -- BÀI 1: N1 は N2 です / ではありません / ですか / N も / N の N
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 1;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N1 は N2 です', 'N1 là N2', 'Danh từ đứng trước trợ từ は (wa) là chủ đề câu, sau は là những thông tin cần thiết. です thể hiện sự lịch sự ở cuối câu.', 'N1 + は + N2 + です', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 は 学生 です。', 'わたし は がくせい です。', 'Chúng tôi là sinh viên.', 1),
        ('GRAMMAR', g_id, '田中さん は 会社員 です。', 'たなかさん は かいしゃいん です。', 'Anh Tanaka là nhân viên công ty.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N1 は N2 ではありません / じゃありません', 'N1 không phải là N2', 'じゃありません là thể phủ định của です dùng trong giao tiếp hàng ngày. ではありません dùng trong văn viết hoặc phát biểu trang trọng.', 'N1 + は + N2 + ではありません / じゃありません', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 は 学生 じゃありません。', 'わたし は がくせい じゃありません。', 'Tôi không phải là sinh viên.', 1),
        ('GRAMMAR', g_id, '先生 は ベトナム人 ではありません。', 'せんせい は ベトナムじん ではありません。', 'Giáo viên không phải là người Việt Nam.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N1 は N2 ですか', 'N1 có phải là N2 không?', 'Câu nghi vấn loại này dùng để xác nhận nội dung đúng hay sai. Đúng trả lời はい, sai trả lời いいえ rồi thêm thông tin.', 'N1 + は + N2 + ですか', 'N5', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'ミラーさん は アメリカ人 ですか。', 'ミラーさん は アメリカじん ですか。', 'Anh Miller có phải là người Mỹ không?', 1),
        ('GRAMMAR', g_id, 'はい、アメリカ人 です。', 'はい、アメリカじん です。', 'Phải, anh ấy là người Mỹ.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'A も B です', 'A cũng là B', 'Trợ từ も thay thế cho は khi thông tin về chủ đề giống như thông tin câu trước đó. Trật tự câu không đổi.', 'A + も + B + です', 'N5', 4, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 は ベトナム人 です。先生 も ベトナム人 です。', 'わたし は ベトナムじん です。せんせい も ベトナムじん です。', 'Tôi là người Việt Nam. Cô giáo cũng là người Việt Nam.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Mẫu câu hỏi có từ nghi vấn (なん / だれ / いつ / どこ)', 'Cái gì / Ai / Khi nào / Ở đâu', 'Câu hỏi có từ nghi vấn. Từ nghi vấn giữ nguyên vị trí trong câu, cuối câu thêm か.', 'N + は + Từ nghi vấn + ですか', 'N5', 5, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'これ は 何 ですか。', 'これ は なん ですか。', 'Đây là cái gì?', 1),
        ('GRAMMAR', g_id, 'あの 人 は 誰 ですか。', 'あの ひと は だれ ですか。', 'Người kia là ai?', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N1 の N2', 'N2 của N1 / N2 thuộc N1', 'Trợ từ の nối 2 danh từ với nhau, N1 bổ nghĩa cho N2. Biểu thị quan hệ sở hữu hoặc tổ chức thuộc về.', 'N1 + の + N2', 'N5', 6, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '東京大学 の 学生 です。', 'とうきょうだいがく の がくせい です。', 'Tôi là sinh viên trường Đại học Tokyo.', 1),
        ('GRAMMAR', g_id, '山田さん は IMC の 会社員 です。', 'やまださん は IMC の かいしゃいん です。', 'Anh Yamada là nhân viên công ty IMC.', 2);
    END IF;

    -- ==========================================
    -- BÀI 2: これ/それ/あれ, この/その/あの, そうです, Câu1か Câu2か, N1のN2
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 2;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'これ / それ / あれ は N です', 'Cái này / Cái đó / Cái kia là N', 'Đại từ chỉ thị vật thể. これ (gần người nói), それ (gần người nghe), あれ (xa cả hai).', 'これ / それ / あれ + は + N + です', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'これ は 本 です。', 'これ は ほん です。', 'Đây là quyển sách.', 1),
        ('GRAMMAR', g_id, 'あれ は ボールペン ですか。', 'あれ は ボールペン ですか。', 'Kia là cái bút bi phải không?', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'この / その / あの + N', 'N này / N đó / N kia', 'Từ chỉ định đứng ngay trước danh từ để bổ nghĩa trực tiếp cho danh từ đó.', 'この / その / あの + N + は + ...', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'この 辞書 は 私 の です。', 'この じしょ は わたし の です。', 'Quyển từ điển này là của tôi.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'そう です / そう じゃありません', 'Đúng vậy / Không phải vậy', 'Dùng trả lời nhanh cho câu hỏi nghi vấn danh từ xác nhận thông tin.', 'はい、そうです / いいえ、そうじゃありません', 'N5', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'それ は テレホンカード ですか。はい、そうです。', 'それ は テレホンカード ですか。はい、そうです。', 'Đó là thẻ điện thoại à? Vâng, đúng vậy.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Câu 1 か、Câu 2 か', 'N1 hay là N2?', 'Câu hỏi lựa chọn giữa 2 đối tượng. Người nghe trả lời tên đối tượng được chọn.', 'Câu 1 + か、Câu 2 + か', 'N5', 4, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'これ は ノート ですか、本 ですか。... ノート です。', 'これ は ノート ですか、ほん ですか。... ノート です。', 'Đây là quyển sổ hay quyển sách? ... Là quyển sổ.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N1 の N2 (Nội dung / Sở hữu)', 'N2 về N1 / N2 của N1', 'N1 giải thích cho N2 nói về lĩnh vực gì hoặc thuộc sở hữu của ai. N2 có thể được lược bỏ nếu đã rõ.', 'N1 + の + N2', 'N5', 5, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'これ は コンピューター の 本 です。', 'これ は コンピューター の ほん です。', 'Đây là quyển sách về máy tính.', 1);
    END IF;

    -- ==========================================
    -- BÀI 3: ここ/そこ/あそこ, どこ/どちら, N1のN2 (Xuất xứ)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 3;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N は ここ / そこ / あそこ です', 'N ở chỗ này / chỗ đó / chỗ kia', 'Chỉ vị trí địa điểm của danh từ. ここ (gần người nói), そこ (gần người nghe), あそこ (xa cả hai).', 'N + は + ここ / そこ / あそこ + です', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'お手洗い は あそこ です。', 'おてあらい は あそこ です。', 'Nhà vệ sinh ở đằng kia.', 1),
        ('GRAMMAR', g_id, '電話 は 2階 です。', 'でんわ は にかい です。', 'Điện thoại ở tầng 2.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N は どこ / どちら ですか', 'N ở đâu / hướng nào?', 'どこ hỏi địa điểm. どちら hỏi phương hướng hoặc dùng thay cho どこ với sắc thái lịch sự.', 'N + は + どこ / どちら + ですか', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'エレベーター は どちら ですか。あちら です。', 'エレベーター は どちら ですか。あちら です。', 'Thang máy ở hướng nào ạ? Ở hướng đằng kia ạ.', 1);
    END IF;

    -- ==========================================
    -- BÀI 4: 時間, Vます/ません/ました, に, から/まで
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 4;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜時〜分 に V', 'Làm V vào lúc mấy giờ', 'Trợ từ に đặt sau mốc thời gian con số cụ thể để chỉ thời điểm hành động xảy ra.', 'Thời gian (con số) + に + Động từ', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '毎朝 7時半 に 起きます。', 'まいあさ しちじはん に おきます。', 'Mỗi sáng tôi thức dậy lúc 7 giờ rưỡi.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜から 〜まで', 'Từ... đến...', 'から chỉ điểm bắt đầu thời gian/địa điểm, まで chỉ điểm kết thúc.', 'N1 + から + N2 + まで', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '銀行 は 9時 から 3時 まで です。', 'ぎんこう は くじ から さんじ まで です。', 'Ngân hàng làm việc từ 9 giờ đến 3 giờ.', 1);
    END IF;

    -- ==========================================
    -- BÀI 5: 行きます/来ます/帰ります, へ, で, と
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 5;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Địa điểm + へ + 行きます / 来ます / 帰ります', 'Đi / Đến / Về địa điểm N', 'Trợ từ へ (đọc là e) chỉ hướng di chuyển của động từ 行きます (đi), 来ます (đến), 帰ります (về).', 'Địa điểm + へ + 行きます / 来ます / 帰ります', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 は 京都 へ 行きます。', 'わたし は きょうと へ いきます。', 'Tôi đi Kyoto.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Phương tiện + で + 行きます', 'Đi bằng phương tiện N', 'Trợ từ で chỉ phương tiện di chuyển. Riêng đi bộ dùng 歩いて (không dùng で).', 'Phương tiện + で + 行きます', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '電車 で 行きます。', 'でんしゃ で いきます。', 'Tôi đi bằng tàu điện.', 1),
        ('GRAMMAR', g_id, '駅 から 歩いて 行きます。', 'えき から あるいて いきます。', 'Tôi đi bộ từ ga đến.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Người + と + 行きます', 'Đi cùng với ai', 'Trợ từ と chỉ đối tượng người/động vật cùng thực hiện hành động. Đi một mình dùng 1人で.', 'Người + と + 行きます', 'N5', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '家族 と 日本 へ 来ました。', 'かぞく と にほん へ きました。', 'Tôi đã đến Nhật cùng với gia đình.', 1);
    END IF;

    -- ==========================================
    -- BÀI 6: N を V, 地点 で V, ませんか / ましょう
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 6;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N + を + V', 'Tác động lên đối tượng N', 'Trợ từ を (o) đứng sau danh từ tân ngữ chịu tác động của ngoại động từ.', 'N + を + V-ます', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'ジュース を 飲みます。', 'ジュース を のみます。', 'Tôi uống nước trái cây.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Địa điểm + で + V', 'Làm V tại địa điểm', 'Trợ từ で chỉ địa điểm xảy ra hành động.', 'Địa điểm + で + V', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'レストラン で ごはん を 食べます。', 'レストラン で ごはん を たべます。', 'Tôi ăn cơm ở nhà hàng.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-ませんか / ましょう', 'Cùng làm V với tôi không?', 'Lời mời rủ rê lịch sự (〜ませんか) và hưởng ứng đồng ý (〜ましょう).', 'V-ます + ませんか / ましょう', 'N5', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'いっしょに お茶 を 飲みませんか。', 'いっしょに おちゃ を のみませんか。', 'Cùng uống trà với tôi không?', 1);
    END IF;

    -- ==========================================
    -- BÀI 7: Công cụ で, あげます / もらいます
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 7;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Công cụ / Ngôn ngữ + で + V', 'Thực hiện V bằng công cụ / ngôn ngữ', 'Trợ từ で chỉ phương tiện, công cụ hoặc ngôn ngữ dùng để làm hành động.', 'Công cụ + で + V', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'はし で 食べます。', 'はし で たべます。', 'Tôi ăn bằng đũa.', 1),
        ('GRAMMAR', g_id, '日本語 で レポート を 書きます。', 'にほんご で レポート を かきます。', 'Tôi viết báo cáo bằng tiếng Nhật.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N1 に N2 を あげます / もらいます', 'Tặng N2 cho N1 / Nhận N2 từ N1', 'あげます (tặng/cho ai), もらいます (nhận từ ai).', 'N1 に N2 を あげます / もらいます', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 は 山田さん に 花 を あげました。', 'わたし は やまださん に はな を あげました。', 'Tôi đã tặng hoa cho anh Yamada.', 1);
    END IF;

    -- ==========================================
    -- BÀI 8: Tính từ い & Tính từ な
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 8;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N は Adj-い / Adj-な です', 'N thì Adj', 'Tính từ い giữ nguyên い + です. Tính từ な bỏ な + です.', 'N + は + Adj + です', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '富士山 は 高い です。', 'ふじさん は たかい です。', 'Núi Phú Sĩ thì cao.', 1),
        ('GRAMMAR', g_id, 'ワットさん は 親切 です。', 'ワットさん は しんせつ です。', 'Thầy Watt rất thân thiện.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Phủ định tính từ (〜くないです / 〜じゃありません)', 'Phủ định tính chất', 'Tính từ い bỏ い -> くないです. Tính từ な + じゃありません.', 'Adj-い -> くないです | Adj-な -> じゃありません', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'この 本 は おもしろくない です。', 'この ほん は おもしろくない です。', 'Quyển sách này không thú vị.', 1);
    END IF;

    -- ==========================================
    -- BÀI 9: 好き / わかります / から
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 9;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N が 好きです / わかります / あります', 'Thích / Hiểu / Có N', 'Trợ từ が đứng trước tính từ/động từ cảm xúc, sở thích, năng lực và sở hữu.', 'N + が + 好きです / わかります / あります', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 は 日本料理 が 好きです。', 'わたし は にほんりょうり が すきです。', 'Tôi thích món ăn Nhật Bản.', 1),
        ('GRAMMAR', g_id, '日本語 が 少し わかります。', 'にほんご が すこし わかります。', 'Tôi hiểu một chút tiếng Nhật.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Mệnh đề 1 + から、Mệnh đề 2', 'Vì Mệnh đề 1 nên Mệnh đề 2', 'Trợ từ から ở cuối mệnh đề 1 chỉ lý do, nguyên nhân dẫn đến mệnh đề 2.', 'Mệnh đề 1 + から、Mệnh đề 2', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '時間 が ありません から、新聞 を 読みません。', 'じかん が ありません から、しんぶん を よみません。', 'Vì không có thời gian nên tôi không đọc báo.', 1);
    END IF;

    -- ==========================================
    -- BÀI 10: あります / います
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 10;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Địa điểm に N が あります / います', 'Ở địa điểm có N (vật / người, động vật)', 'あります cho đồ vật, cây cối. います cho người và động vật di chuyển được.', 'Địa điểm + に + N + が + あります / います', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '部屋 に 机 が あります。', 'へや に つくえ が あります。', 'Trong phòng có cái bàn.', 1),
        ('GRAMMAR', g_id, '庭 に 犬 が います。', 'にわ に いぬ が います。', 'Ở ngoài sân có con chó.', 2);
    END IF;

    -- ==========================================
    -- BÀI 11: Lượng từ & Thời gian
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 11;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Lượng từ (khoảng thời gian) + V', 'Làm V trong khoảng thời gian', 'Lượng từ chỉ khoảng thời gian đứng trực tiếp trước động từ, không dùng trợ từ に.', 'Thời gian (khoảng) + V', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '会社 を 5日間 休みました。', 'かいしゃ を ごにちかん やすみました。', 'Tôi đã nghỉ làm 5 ngày.', 1);
    END IF;

    -- ==========================================
    -- BÀI 12: So sánh N1 は N2 より Adj
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 12;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N1 は N2 より Adj です', 'N1 so với N2 thì Adj hơn', 'Mẫu câu so sánh hơn giữa 2 đối tượng N1 và N2.', 'N1 + は + N2 + より + Adj + です', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'この 車 は あの 車 より 速い です。', 'この くるま は あの くるま より はやい です。', 'Chiếc xe này nhanh hơn chiếc xe kia.', 1);
    END IF;

    -- ==========================================
    -- BÀI 13: V-たいです / N が ほしいです
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 13;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-たいです / N が ほしいです', 'Muốn làm V / Muốn có N', 'Diễn tả nguyện vọng của người nói. V-たいです bỏ ます thêm たいです.', 'V-bỏます + たいです | N + が + ほしいです', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '水 が 飲みたい です。', 'みず が のみたい です。', 'Tôi muốn uống nước.', 1),
        ('GRAMMAR', g_id, '新しい パソコン が ほしい です。', 'あたらしい パソコン が ほしい です。', 'Tôi muốn có máy tính mới.', 2);
    END IF;

    -- ==========================================
    -- BÀI 14: V-てください
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 14;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-てください', 'Xin hãy làm V (Yêu cầu lịch sự)', 'Động từ thể て + ください dùng để nhờ vả hay yêu cầu ai đó làm gì.', 'V-て + ください', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'ちょっと 待ってください。', 'ちょっと まってください。', 'Xin hãy đợi một chút.', 1);
    END IF;

    -- ==========================================
    -- BÀI 15: V-ています (Trạng thái)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 15;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-ています (Trạng thái)', 'Đang trong trạng thái V', 'Chỉ trạng thái kết quả của hành động vẫn đang tiếp diễn (kết hôn, sống, biết...).', 'V-て + います', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 は 結婚しています。', 'わたし は けっこんしています。', 'Tôi đã lập gia đình.', 1);
    END IF;

    -- ==========================================
    -- BÀI 16: V1-て、V2-て、V3
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 16;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V1-て、V2-て、V3', 'Làm V1, rồi V2, rồi V3', 'Nối chuỗi các hành động liên tiếp diễn ra theo thứ tự thời gian.', 'V1-て + V2-て + V3', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '朝 起きて、顔 を 洗って、ごはん を 食べます。', 'あさ おきて、かお を あらって、ごはん を たべます。', 'Buổi sáng tôi thức dậy, rửa mặt rồi ăn sáng.', 1);
    END IF;

    -- ==========================================
    -- BÀI 17: V-ないでください / V-なければなりません
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 17;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-ないでください / V-なければなりません', 'Xin đừng làm V / Bắt buộc phải làm V', 'V-ないでください (khuyên cấm đoán), V-なければなりません (bắt buộc).', 'V-ない + でください | V-なければなりません', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '写真 を 撮らないでください。', 'しゃしん を とらないでください。', 'Xin đừng chụp ảnh.', 1),
        ('GRAMMAR', g_id, '薬 を 飲まなければなりません。', 'くすり を のまなければなりません。', 'Tôi phải uống thuốc.', 2);
    END IF;

    -- ==========================================
    -- BÀI 18: 趣味は V-辞書形 ことです
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 18;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '趣味 は V-辞書形 ことです', 'Sở thích của tôi là làm V', 'Danh từ hóa động từ thể từ điển bằng こと để diễn tả sở thích.', '趣味 は + V-辞書形 + ことです', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 の 趣味 は 音楽 を 聞く ことです。', 'わたし の しゅみ は おんがく を きく ことです。', 'Sở thích của tôi là nghe nhạc.', 1);
    END IF;

    -- ==========================================
    -- BÀI 19: V-た ことがあります
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 19;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-た ことがあります', 'Đã từng làm V (Trải nghiệm)', 'Động từ thể た + ことがあります chỉ trải nghiệm trong quá khứ.', 'V-た + ことがあります', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '馬 に 乗った ことがあります。', 'うま に のった ことがあります。', 'Tôi đã từng cưỡi ngựa.', 1);
    END IF;

    -- ==========================================
    -- BÀI 20: 普通形 (Thể thông thường / Thể ngắn) 4 Dạng Bắt Buộc
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 20;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '普通形 (Thể thông thường / Thể ngắn)', 'Trọn bộ 4 dạng thể ngắn trong văn thoại thân mật', 'Bắt buộc 4 dạng (+ hiện tại, - hiện tại, + quá khứ, - quá khứ) cho Động từ, Tính từ い, Tính từ な và Danh từ.', '丁寧形 (です/ます) -> 普通形', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '行きます -> 行く | 行きません -> 行かない | 行きました -> 行った | 行きませんでした -> 行かなかった', 'いきます -> いく | いかない | いった | いかなかった', 'Bảng chia 4 dạng động từ đi (khẳng định/phủ định/quá khứ/phủ định quá khứ).', 1),
        ('GRAMMAR', g_id, '明日 東京へ 行く。', 'あした とうきょうへ いく。', 'Ngày mai tớ đi Tokyo.', 2);
    END IF;

    -- ==========================================
    -- BÀI 21: 〜と 思います
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 21;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜と 思います', 'Tôi nghĩ rằng...', 'Bày tỏ suy nghĩ, ý kiến cá nhân. Đứng trước と là thể thông thường.', 'Thể thông thường + と 思います', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '明日 は 雨 が 降る と 思います。', 'あした は あめ が ふる と おもいます。', 'Tôi nghĩ ngày mai trời sẽ mưa.', 1);
    END IF;

    -- ==========================================
    -- BÀI 22: Mệnh đề bổ nghĩa danh từ (名詞修飾)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 22;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Mệnh đề động từ + N', 'Danh từ được bổ nghĩa bởi mệnh đề', 'Động từ thể thông thường đứng trước danh từ để bổ nghĩa trực tiếp cho danh từ đó.', 'V-普通形 + N', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'これ は 母 が 作った ケーキ です。', 'これ は はは が つくった ケーキ です。', 'Đây là chiếc bánh mẹ tôi đã làm.', 1);
    END IF;

    -- ==========================================
    -- BÀI 23: Vる とき / Vた とき & Vる と
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 23;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Vる とき / Vた とき', 'Khi làm V (chưa xong vs đã xong)', 'Vる とき chỉ hành động chưa hoàn thành. Vた とき chỉ hành động đã xong.', 'Vる / Vた + とき', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '図書館 で 本 を 借りる とき、カード が 要ります。', 'としょかん で ほん を かりる とき、カード が いります。', 'Khi mượn sách ở thư viện cần có thẻ.', 1);
    END IF;

    -- ==========================================
    -- BÀI 24: V-て あげます / もらいます / くれます
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 24;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-て あげます / もらいます / くれます', 'Cho / Nhận hành động giúp đỡ', 'くれます dùng khi người khác thực hiện hành động giúp cho người nói.', 'V-て + あげます / もらいます / くれます', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '佐藤さん は 私 に 傘 を 貸して くれました。', 'さとうさん は わたし に かさ を かして くれました。', 'Chị Sato đã cho tôi mượn cây dù.', 1);
    END IF;

    -- ==========================================
    -- BÀI 25: V-たら、〜 & V-ても、〜
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 25;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-たら、〜', 'Nếu... thì...', 'Điều kiện giả định trong tương lai. Thể quá khứ た + ら.', 'V-た + ら、〜', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'お金 が たくさん あったら、旅行します。', 'おかね が たくさん あったら、りょこうします。', 'Nếu có nhiều tiền thì tôi sẽ đi du lịch.', 1);
    END IF;

END $$;
