-- Flyway Migration V55: Split All Combined Grammar Points distinctly into Individual Cards

DO $$
DECLARE
    lvl_n4_id BIGINT;
    lvl_n3_id BIGINT;
    les_id BIGINT;
    g_id BIGINT;
BEGIN
    SELECT level_id INTO lvl_n4_id FROM levels WHERE code = 'N4';
    SELECT level_id INTO lvl_n3_id FROM levels WHERE code = 'N3';

    -- ==========================================
    -- N4 Bài 26: Bài 26: Giải thích lý do & Nhấn mạnh (～んです)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 1;
    IF les_id IS NOT NULL THEN
        -- Clear old combined points for this lesson to prevent duplicates
        DELETE FROM grammar_points WHERE lesson_id = les_id;

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜んです / 〜んですか', 'Giải thích hoàn cảnh, lý do hoặc hỏi nguyên do với sắc thái quan tâm', 'Dùng trong giao tiếp khi cần giải thích lý do thực tế của bản thân hoặc hỏi về nguyên nhân một hiện tượng quan sát được.', 'V-普通形 + んです | Adj-い + んです | Adj-な/N + な + んです', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'どうしたんですか。... 頭（あたま）が 痛（いた）いんです。', 'どうしたんですか。... あたまが いたいんです。', 'Có chuyện gì thế? ... Tôi bị đau đầu.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜んですが、〜', 'Mở đầu câu nhờ vả, xin lời khuyên hoặc rủ rê', 'Dùng ở đầu câu để đặt vấn đề, tạo tiền đề nhẹ nhàng trước khi đưa ra lời yêu cầu hay rủ rê.', 'Mệnh đề + んですが、〜', 'N4', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'チケットが あるんですが、一緒（いっしょ）に 行（い）きませんか。', 'チケットが あるんですが、いっしょに いきませんか。', 'Tôi có vé này, cậu đi cùng tôi không?', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜ていただけませんか', 'Nhờ người khác làm giúp việc gì một cách rất lịch sự', 'Dạng kính ngữ nhờ vả lịch sự hơn nhiều so với 〜てください.', 'V-て + いただけませんか', 'N4', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '日本語（にほんご）で 手紙（てがみ）を 書（か）いたんですが、直（なお）していただけませんか。', 'にほんごで てがみを かいたんですが、なおしていただけませんか。', 'Tôi viết thư bằng tiếng Nhật rồi, nhờ cậu sửa giúp tôi được không?', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜たらいいですか', 'Xin lời khuyên nên làm gì trong tình huống cụ thể', 'Dùng khi người nói lúng túng không biết giải quyết ra sao và muốn xin ý kiến chỉ dẫn.', 'Từ hỏi + V-たら + いいですか', 'N4', 4, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'どこで カメラを 買（か）ったら いいですか。', 'どこで カメラを かったら いいですか。', 'Tôi nên mua máy ảnh ở đâu thì tốt nhỉ?', 1);

    END IF;

    -- ==========================================
    -- N4 Bài 27: Bài 27: Động từ Khả năng (可能形)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 2;
    IF les_id IS NOT NULL THEN
        -- Clear old combined points for this lesson to prevent duplicates
        DELETE FROM grammar_points WHERE lesson_id = les_id;

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '動詞の可能形 (V-可能形)', 'Có thể thực hiện hành động gì (Diễn tả khả năng)', 'Nhóm 1 đổi âm i sang e + ます. Nhóm 2 bỏ ます thêm られます. Nhóm 3: きます->こられます, します->できます. Trợ từ を chuyển thành が.', 'N が + V-可能形', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私（わたし）は 漢字（かんじ）が 読（よ）めます。', 'わたしは かんじが よめます。', 'Tôi có thể đọc được chữ Hán.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜しか〜ない', 'Chỉ có... (Phủ định sự ít ỏi)', 'Đi với trợ từ しか và động từ chia ở dạng phủ định (ない/ません) mang ý nghĩa nhấn mạnh sự ít ỏi, giới hạn.', 'N + しか + V-ない', 'N4', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'ひらがなしか 書（か）けません。', 'ひらがなしか かけません。', 'Tôi chỉ có thể viết được chữ Hiragana thôi.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'が見えます / が聞こえます', 'Thấy được / Nghe thấy được (Khả năng tự nhiên)', '見えます và 聞こえます chỉ khả năng thị giác và thính giác tự nhiên đập vào mắt/tai không cần cố gắng.', 'N が + 見えます / 聞こえます', 'N4', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '部屋（へや）から 海（うみ）が 見（み）えます。', 'へやから うみが みえます。', 'Từ trong phòng có thể nhìn thấy biển.', 1),
        ('GRAMMAR', g_id, 'ラジオの 音（おと）が 聞（き）こえます。', 'ラジオの おとが きこえます。', 'Có thể nghe thấy tiếng đài radio.', 2);

    END IF;

    -- ==========================================
    -- N4 Bài 28: Bài 28: Vừa làm vừa & Thói quen (～ながら / ～し)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 3;
    IF les_id IS NOT NULL THEN
        -- Clear old combined points for this lesson to prevent duplicates
        DELETE FROM grammar_points WHERE lesson_id = les_id;

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V1-ながら V2', 'Vừa làm V1 vừa làm V2 (Hành động V2 là hành động chính)', 'Thực hiện 2 hành động song song cùng một lúc. Động từ V2 đứng sau là hành động chính.', 'V1-ます(bỏ ます) + ながら + V2', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '音楽（おんがく）を 聴（き）きながら 勉強（べんきょう）します。', 'おんがくを ききながら べんきょうします。', 'Tớ vừa nghe nhạc vừa học bài.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-ています (Thói quen)', 'Thói quen lặp đi lặp lại trong thời gian dài', 'Diễn tả hành động được thực hiện lặp đi lặp lại như một thói quen thường nhật trong thời gian dài.', 'V-ています', 'N4', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '毎朝（まいあさ） ジョギングを しています。', 'まいあさ ジョギングを しています。', 'Mỗi sáng tớ đều chạy bộ.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜し、〜し', 'Vừa... lại vừa... (Liệt kê nhiều lý do, nguyên nhân)', 'Nối các mệnh đề ở thể thông thường để liệt kê nhiều nguyên nhân, lý do cùng dẫn đến một kết luận.', 'Mệnh đề (普通形) + し、Mệnh đề (普通形) + し', 'N4', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '駅（えき）から 近（ちか）いし、車（くるま）で 来（こ）られるし、この 店（みせ）は 便利（べんり）です。', 'えきから ちかいし、くるまで こられるし、この みせは べんりです。', 'Vừa gần ga lại vừa đến được bằng ô tô nên cửa hàng này tiện lắm.', 1);

    END IF;

    -- ==========================================
    -- N4 Bài 29: Bài 29: Trạng thái kết quả & Hoàn thành (～ています / ～てしまいました)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 4;
    IF les_id IS NOT NULL THEN
        -- Clear old combined points for this lesson to prevent duplicates
        DELETE FROM grammar_points WHERE lesson_id = les_id;

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V(tự動詞)-ています', 'Trạng thái kết quả phát sinh của tự động từ', 'Diễn tả trạng thái hiện tại của đồ vật sau khi tự động từ xảy ra (Vd: Cửa đang đóng, Đèn đang bật).', 'N が + V(tự động từ)-ています', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '窓（まど）が 閉（し）まっています。', 'まどが しまっています。', 'Cửa sổ đang được đóng.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-てしまいました (Nuối tiếc)', 'Lỡ làm... (Diễn tả sự nuối tiếc, hối hận)', 'Dùng khi người nói lỡ làm mất đồ, làm hỏng đồ hoặc vi phạm điều gì ngoài ý muốn.', 'V-て + しまいました', 'N4', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '電車（でんしゃ）に 傘（かさ）を 忘（わす）れて しまいました。', 'でんしゃに かさを わすれて しまいました。', 'Tớ lỡ quên mất cây dù trên tàu điện mất rồi.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-てしまいました (Hoàn thành)', 'Đã hoàn thành toàn bộ hành động', 'Diễn tả một hành động đã được giải quyết hoặc thực hiện xong hoàn toàn.', 'V-て + しまいました', 'N4', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '宿題（しゅくだい）を 全部（ぜんぶ） やってしまいました。', 'しゅくだいを ぜんぶ やってしまいました。', 'Tớ đã làm xong hết toàn bộ bài tập rồi.', 1);

    END IF;

    -- ==========================================
    -- N4 Bài 30: Bài 30: Chuẩn bị & Sắp đặt sẵn (～てあります / ～ておきます)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 5;
    IF les_id IS NOT NULL THEN
        -- Clear old combined points for this lesson to prevent duplicates
        DELETE FROM grammar_points WHERE lesson_id = les_id;

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V(他動詞)-てあります', 'Trạng thái kết quả tha động từ do ai đó làm có mục đích', 'Chỉ trạng thái của đồ vật sau khi được ai đó cố ý thực hiện hành động nhằm mục đích nhất định.', 'N が + V(tha động từ)-てあります', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '壁（かべ）に カレンダーが 掛（か）けてあります。', 'かべに カレンダーが かけてあります。', 'Tờ lịch được treo sẵn trên tường.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-ておきます (Chuẩn bị)', 'Làm sẵn trước để chuẩn bị cho lần sau', 'Thực hiện hành động trước một thời điểm để sẵn sàng cho công việc tiếp theo.', 'V-て + おきます', 'N4', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '旅行（りょこう）の 前（まえ）に 切符（きっぷ）を 買（か）っておきます。', 'りょこうの まえに きっぷを かっておきます。', 'Tôi mua sẵn vé trước chuyến du lịch.', 1);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-ておきます (Giữ nguyên)', 'Giữ nguyên trạng thái hiện tại', 'Duy trì hoặc để nguyên không can thiệp hay thay đổi trạng thái của đồ vật.', 'V-て + おきます', 'N4', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'まだ 使（つか）っていますから、そのままに しておいて ください。', 'まだ つかっていますから、そのままに しておいて ください。', 'Vì tớ vẫn đang dùng nên hãy cứ để nguyên như thế nhé.', 1);

    END IF;

END $$;