-- ============================================================
-- V45: Seed Complete Grammar Points & Examples for Lessons 5 to 25
-- ============================================================

DO $$
DECLARE
    lvl_n5_id BIGINT;
    les_id BIGINT;
    g_id BIGINT;
BEGIN
    SELECT level_id INTO lvl_n5_id FROM levels WHERE code = 'N5';

    -- LESSON 5
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 5;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Địa điểm + へ + 行きます / 来ます / 帰ります', 'Đi / Đến / Về địa điểm nào đó', 'Trợ từ へ (đọc là e) chỉ hướng di chuyển của động từ 行きます (đi), 来ます (đến), 帰ります (về).', 'Địa điểm + へ + 行きます / 来ます / 帰ります', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 は 京都 へ 行きます。', 'わたし は きょうと へ いきます。', 'Tôi đi Kyoto.', 1),
        ('GRAMMAR', g_id, '明日 どこ へ 行きますか。', 'あした どこ へ いきますか。', 'Ngày mai bạn đi đâu?', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N [phương tiện] + で + V', 'Đi bằng phương tiện N', 'Trợ từ で chỉ phương tiện di chuyển (tàu, xe, taxi...). Riêng đi bộ dùng 歩いて (bỏ で).', 'Phương tiện + で + 行きます', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '電車 で 行きます。', 'でんしゃ で いきます。', 'Tôi đi bằng tàu điện.', 1),
        ('GRAMMAR', g_id, '駅 から 歩いて 行きます。', 'えき から あるいて いきます。', 'Tôi đi bộ từ ga đến đó.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N [người] + と + V', 'Làm V cùng với N', 'Trợ từ と chỉ người cùng thực hiện hành động. Nếu đi một mình dùng 1人で.', 'Người + と + 行きます', 'N5', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '家族 と 日本 へ 来ました。', 'かぞく と にほん へ きました。', 'Tôi đã đến Nhật cùng với gia đình.', 1);
    END IF;

    -- LESSON 6
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 6;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N + を + V', 'Tác động lên đối tượng N', 'Trợ từ を (o) đứng sau danh từ tân ngữ chịu tác động của ngoại động từ.', 'N + を + V-ます', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'ジュース を 飲みます。', 'ジュース を のみます。', 'Tôi uống nước trái cây.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Địa điểm + で + V', 'Thực hiện hành động V tại địa điểm', 'Trợ từ で chỉ vị trí diễn ra hành động.', 'Địa điểm + で + V', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'レストラン で ごはん を 食べます。', 'レストラン で ごはん を たべます。', 'Tôi ăn cơm ở nhà hàng.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜ませんか / 〜ましょう', 'Cùng làm V với tôi nhé?', 'Lời mời rủ rê lịch sự (〜ませんか) và hưởng ứng lời mời (〜ましょう).', 'V-ます + ませんか / ましょう', 'N5', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'いっしょに お茶 を 飲みませんか。', 'いっしょに おちゃ を のみませんか。', 'Cùng uống trà với tôi không?', 1);
    END IF;

    -- LESSON 7
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 7;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Công cụ / Dụng cụ + で + V', 'Thực hiện V bằng công cụ/dụng cụ', 'Trợ từ で chỉ công cụ, dụng cụ hoặc ngôn ngữ thực hiện hành động.', 'Công cụ + で + V', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'はし で 食べます。', 'はし で たべます。', 'Tôi ăn bằng đũa.', 1),
        ('GRAMMAR', g_id, '日本語 で レポート を 書きます。', 'にほんご で レポート を かきます。', 'Tôi viết báo cáo bằng tiếng Nhật.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜てあげます / もらいます', 'Cho / Nhận đồ vật', 'あげます (tặng/cho ai cái gì), もらいます (nhận cái gì từ ai).', 'N1 は N2 に N3 を あげます / もらいます', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 は 山田さん に 花 を あげました。', 'わたし は やまださん に はな を あげました。', 'Tôi đã tặng hoa cho anh Yamada.', 1);
    END IF;

    -- LESSON 8
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 8;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Tính từ い / Tính từ な + です', 'Khẳng định tính chất của danh từ', 'Tính từ い giữ nguyên い + です. Tính từ な bỏ な + です.', 'N + は + Adj + です', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '富士山 は 高い です。', 'ふじさん は たかい です。', 'Núi Phú Sĩ thì cao.', 1),
        ('GRAMMAR', g_id, 'ワットさん は 親切 です。', 'ワットさん は しんせつ です。', 'Thầy Watt rất thân thiện.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Tính từ phủ định (〜くないです / 〜じゃありません)', 'Phủ định tính chất', 'Tính từ い đổi い thành くないです. Tính từ な + じゃありません.', 'Adj-い -> くないです | Adj-な -> じゃありません', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'この 本 は おもしろくない です。', 'この ほん は おもしろくない です。', 'Quyển sách này không thú vị.', 1);
    END IF;

    -- LESSON 9
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 9;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N が 好きです / わかります / あります', 'Thích / Hiểu / Có N', 'Trợ từ が đứng trước các động từ/tính từ chỉ cảm xúc, sở thích, năng lực và sở hữu.', 'N + が + 好きです / わかります / あります', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 は 日本料理 が 好きです。', 'わたし は にほんりょうり が すきです。', 'Tôi thích món ăn Nhật Bản.', 1),
        ('GRAMMAR', g_id, '日本語 が 少し わかります。', 'にほんご が すこし わかります。', 'Tôi hiểu một chút tiếng Nhật.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜から、〜', 'Vì... nên...', 'Từ から đặt ở cuối mệnh đề chỉ lý do, nguyên nhân dẫn đến mệnh đề đằng sau.', 'Mệnh đề 1 + から、Mệnh đề 2', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '時間 が ありません から、新聞 を 読みません。', 'じかん が ありません から、しんぶん を よみません。', 'Vì không có thời gian nên tôi không đọc báo.', 1);
    END IF;

    -- LESSON 10
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 10;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Địa điểm に N が あります / います', 'Ở địa điểm có N (vật / người, động vật)', 'あります dùng cho đồ vật, cây cỏ. います dùng cho người và động vật di chuyển được.', 'Địa điểm + に + N + が + あります / います', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '部屋 に 机 が あります。', 'へや に つくえ が あります。', 'Trong phòng có cái bàn.', 1),
        ('GRAMMAR', g_id, '庭 に 犬 が います。', 'にわ に いぬ が います。', 'Ở ngoài sân có con chó.', 2);
    END IF;

    -- LESSON 11
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 11;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Khoảng thời gian + V', 'Làm V trong khoảng thời gian', 'Lượng từ chỉ khoảng thời gian đứng ngay trước động từ, không cần trợ từ に.', 'Thời gian (khoảng) + V', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '会社 を 5日間 休みました。', 'かいしゃ を ごにちかん やすみました。', 'Tôi đã nghỉ làm ở công ty 5 ngày.', 1);
    END IF;

    -- LESSON 12
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 12;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N1 は N2 より Adj です', 'N1 so với N2 thì Adj hơn', 'Cấu trúc so sánh hơn giữa 2 đối tượng N1 và N2.', 'N1 + は + N2 + より + Adj + です', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'この 車 は あの 車 より 速い です。', 'この くるま は あの くるま より はやい です。', 'Chiếc xe này nhanh hơn chiếc xe kia.', 1);
    END IF;

    -- LESSON 13
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 13;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-たいです / N が ほしいです', 'Muốn làm V / Muốn có N', 'Bày tỏ nguyện vọng cá nhân người nói. Có thể dùng trợ từ が hoặc を.', 'V-bỏます + たいです | N + が + ほしいです', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '水 が 飲みたい です。', 'みず が のみたい です。', 'Tôi muốn uống nước.', 1),
        ('GRAMMAR', g_id, '新しい パソコン が ほしい です。', 'あたらしい パソコン が ほしい です。', 'Tôi muốn có một chiếc máy tính mới.', 2);
    END IF;

    -- LESSON 14
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 14;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-てください', 'Xin hãy làm V (Yêu cầu lịch sự)', 'Động từ thể て + ください dùng để nhờ vả, yêu cầu ai đó làm gì.', 'V-て + ください', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'ちょっと 待ってください。', 'ちょっと まってください。', 'Xin hãy đợi một chút.', 1);
    END IF;

    -- LESSON 15
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 15;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-ています (Trạng thái)', 'Đang trong trạng thái V', 'Chỉ trạng thái kết quả của hành động vẫn đang tiếp diễn (kết hôn, sống, biết...).', 'V-て + います', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 は 結婚しています。', 'わたし は けっこんしています。', 'Tôi đã kết hôn (đang lập gia đình).', 1);
    END IF;

    -- LESSON 16
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 16;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V1-て、V2-て、V3', 'Làm V1, rồi V2, rồi V3', 'Dùng thể て để liên kết chuỗi các hành động diễn ra theo thứ tự thời gian.', 'V1-て + V2-て + V3', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '朝 起きて、顔 を 洗って、ごはん を 食べます。', 'あさ おきて、かお を あらって、ごはん を たべます。', 'Buổi sáng tôi thức dậy, rửa mặt rồi ăn sáng.', 1);
    END IF;

    -- LESSON 17
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 17;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-ないでください / V-なければなりません', 'Xin đừng V / Bắt buộc phải V', 'V-ないでください (khuyên cấm đoán), V-なければなりません (bắt buộc phải làm).', 'V-ない + でください | V-なければなりません', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '写真 を 撮らないでください。', 'しゃしん を とらないでください。', 'Xin đừng chụp ảnh ở đây.', 1),
        ('GRAMMAR', g_id, '薬 を 飲まなければなりません。', 'くすり を のまなければなりません。', 'Tôi phải uống thuốc.', 2);
    END IF;

    -- LESSON 18
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 18;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '趣味 は V-辞書形 ことです', 'Sở thích của tôi là làm V', 'Danh từ hóa động từ bằng こと để diễn tả sở thích.', '趣味 は + V-辞書形 + ことです', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 の 趣味 は 音楽 を 聞く ことです。', 'わたし の しゅみ は おんがく を きく ことです。', 'Sở thích của tôi là nghe nhạc.', 1);
    END IF;

    -- LESSON 19
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 19;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-た ことがあります', 'Đã từng làm V (Trải nghiệm)', 'Động từ thể た + ことがあります diễn tả kinh nghiệm, trải nghiệm trong quá khứ.', 'V-た + ことがあります', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '馬 に 乗った ことがあります。', 'うま に のった ことがあります。', 'Tôi đã từng cưỡi ngựa.', 1);
    END IF;

    -- LESSON 21
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 21;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜と 思います', 'Tôi nghĩ rằng...', 'Bày tỏ suy nghĩ, ý kiến cá nhân. Đứng trước と là thể thông thường.', 'Thể thông thường + と 思います', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '明日 は 雨 が 降る と 思います。', 'あした は あめ が ふる と おもいます。', 'Tôi nghĩ ngày mai trời sẽ mưa.', 1);
    END IF;

    -- LESSON 22
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 22;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Mệnh đề động từ + N', 'Danh từ được bổ nghĩa bởi mệnh đề', 'Động từ thể thông thường đứng trước danh từ để bổ nghĩa trực tiếp cho danh từ đó.', 'V-普通形 + N', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'これ は 母 が 作った ケーキ です。', 'これ は はは が つくった ケーキ です。', 'Đây là chiếc bánh mẹ tôi đã làm.', 1);
    END IF;

    -- LESSON 23
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 23;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Vる とき / Vた とき', 'Khi làm V (Đang làm vs Đã làm)', 'Vる とき chỉ hành động chưa hoàn thành (trên đường đi). Vた とき chỉ hành động đã xong.', 'Vる / Vた + とき', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '図書館 で 本 を 借りる とき、カード が 要ります。', 'としょかん で ほん を かりる とき、カード が いります。', 'Khi mượn sách ở thư viện thì cần thẻ.', 1);
    END IF;

    -- LESSON 24
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 24;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-てあげます / もらいます / くれます', 'Làm giúp V cho ai / Được ai làm giúp V', 'Diễn tả sự giúp đỡ hành động. くれます dùng khi ai đó làm giúp cho người nói.', 'V-て + あげます / もらいます / くれます', 'N5', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '佐藤さん は 私 に 傘 を 貸して くれました。', 'さとうさん は わたし に かさ を かして くれました。', 'Chị Sato đã cho tôi mượn cây dù.', 1);
    END IF;

    -- LESSON 25
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
