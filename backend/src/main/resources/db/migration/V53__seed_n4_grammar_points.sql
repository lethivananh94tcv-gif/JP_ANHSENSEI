-- Flyway Migration V53: Seed Complete 100% N4 Grammar Points & Examples (Bài 26 -> Bài 50)

DO $$
DECLARE
    lvl_n4_id BIGINT;
    les_id BIGINT;
    g_id BIGINT;
BEGIN
    SELECT level_id INTO lvl_n4_id FROM levels WHERE code = 'N4';

    -- ==========================================
    -- Bài 26: Giải thích lý do & Nhấn mạnh (～んです)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 1;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜んです / 〜んですか', 'Giải thích hoàn cảnh, nguyên do hoặc hỏi nguyên do với sắc thái quan tâm', 'Dùng trong giao tiếp khi cần giải thích lý do thực tế của bản thân hoặc hỏi về nguyên nhân một hiện tượng quan sát được.', 'V-普通形 + んです | Adj-い + んです | Adj-な/N + な + んです', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'どうしたんですか。... 頭（あたま）が 痛（いた）いんです。', 'どうしたんですか。... あたまが いたいんです。', 'Có chuyện gì thế? ... Tớ bị đau đầu.', 1),
        ('GRAMMAR', g_id, 'チケットが あるんですが、一緒（いっしょ）に 行（い）きませんか。', 'チケットが あるんですが、いっしょに いきませんか。', 'Tớ có vé này, cậu đi cùng tớ không?', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜ていただけませんか / 〜たらいいですか', 'Nhờ vả lịch sự & Xin lời khuyên', '〜ていただけませんか dùng khi nhờ ai làm giúp việc gì một cách rất lịch sự. 〜たらいいですか dùng hỏi ý kiến lời khuyên nên làm gì.', 'V-て + いただけませんか | V-たら + いいですか', 'N4', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '日本語（にほんご）で 手紙（てがみ）を 書（か）いたんですが、直（なお）していただけませんか。', 'にほんごで てがみを かいたんですが、なおしていただけませんか。', 'Tớ viết thư bằng tiếng Nhật rồi, nhờ cậu sửa giúp tớ được không?', 1),
        ('GRAMMAR', g_id, 'どこで カメラを 買（か）ったら いいですか。', 'どこで カメラを かったら いいですか。', 'Tớ nên mua máy ảnh ở đâu thì tốt nhỉ?', 2);

    END IF;

    -- ==========================================
    -- Bài 27: Động từ Khả năng (可能形)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 2;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '動詞の可能形 (V-可能形) - Thể khả năng', 'Có thể thực hiện hành động gì', 'Nhóm 1 đổi âm i sang e + ます (買います->買えます). Nhóm 2 bỏ ます thêm られます. Nhóm 3: きます->こられます, します->できます. Trợ từ を chuyển thành が.', 'N が + V-可能形', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私（わたし）は 漢字（かんじ）が 読（よ）めます。', 'わたしは かんじが よめます。', 'Tôi có thể đọc được chữ Hán.', 1),
        ('GRAMMAR', g_id, '一人（ひとり）で 病院（びょういん）へ 行（い）けますか。', 'ひとりびょういんへ いけますか。', 'Cậu có thể tự mình đi đến bệnh viện không?', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜しか〜ない & が見えます / が聞こえます', 'Chỉ có ... (phủ định) & Thấy được / Nghe thấy tự nhiên', '〜しか đi với phủ định mang nghĩa chỉ có (nhấn mạnh ít). 見えます và 聞こえます chỉ khả năng thị giác/thính giác tự nhiên không cần cố gắng.', 'N + しか + V-ない | N が + 見えます/聞こえます', 'N4', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'ひらがなしか 書（か）けません。', 'ひらがなしか かけません。', 'Tớ chỉ có thể viết được chữ Hiragana thôi.', 1),
        ('GRAMMAR', g_id, '部屋（へや）から 海（うみ）が 見（み）えます。', 'へやから うみが みえます。', 'Từ trong phòng có thể nhìn thấy biển.', 2);

    END IF;

    -- ==========================================
    -- Bài 28: Vừa làm vừa & Thói quen (～ながら / ～し)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 3;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V1-ながら V2 & V-ています (Thói quen)', 'Vừa làm V1 vừa làm V2 & Thói quen kéo dài', 'V1-ながら diễn tả 2 hành động diễn ra cùng lúc (hành động V2 là chính). V-ています ở bài này diễn tả thói quen lặp đi lặp lại trong thời gian dài.', 'V1-ます(bỏ) + ながら + V2 | V-ています', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '音楽（おんがく）を 聴（き）きながら 勉強（べんきょう）します。', 'おんがくを ききながら べんきょうします。', 'Tớ vừa nghe nhạc vừa học bài.', 1),
        ('GRAMMAR', g_id, '毎朝（まいあさ） ジョギングを しています。', 'まいあさ ジョギングを しています。', 'Mỗi sáng tớ đều chạy bộ.', 2);

        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜し、〜し (Liệt kê lý do/đặc điểm)', 'Vừa... lại vừa... / Vì... và vì...', 'Nối các mệnh đề thể thông thường để liệt kê nhiều nguyên nhân, lý do dẫn đến một kết luận.', 'Mệnh đề (普通形) + し、Mệnh đề (普通形) + し、〜', 'N4', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '駅（えき）から 近（ちか）いし、車（くるま）で 来（こ）られるし、この 店（みせ）は 便利（べんり）です。', 'えきから ちかいし、くるまで こられるし、この みせは べんりです。', 'Vừa gần ga lại vừa có thể đi ô tô đến, cửa hàng này thật tiện lợi.', 1);

    END IF;

    -- ==========================================
    -- Bài 29: Trạng thái kết quả & Hoàn thành (～ています / ～てしまいました)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 4;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V(tự động từ)-ています (Trạng thái phát sinh)', 'Diễn tả trạng thái của người/vật sau khi một tự động từ xảy ra', 'Trợ từ đi với tự động từ là が. Mẫu V-ています diễn tả trạng thái kết quả còn lưu lại (Vd: Cửa đang mở, Đèn đang bật).', 'N が + V(tự động từ)-ています', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '窓（まど）が 閉（し）まっています。', 'まどが しまっています。', 'Cửa sổ đang được đóng.', 1),
        ('GRAMMAR', g_id, '電車（でんしゃ）に 傘（かさ）を 忘（わす）れて しまいました。', 'でんしゃに かさを わすれて しまいました。', 'Tớ lỡ quên mất cây dù trên tàu điện mất rồi.', 2);

    END IF;

    -- ==========================================
    -- Bài 30: Chuẩn bị & Sắp đặt sẵn (～てあります / ～ておきます)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 5;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V(tha động từ)-てあります & V-ておきます', 'Trạng thái tha động từ có mục đích & Chuẩn bị sẵn', 'V-てあります chỉ trạng thái đồ vật được ai đó làm có mục đích (Nが V-てあります). V-ておきます chỉ hành động làm trước để chuẩn bị cho lần sau.', 'N が + V(tha động từ)-てあります | V-ておきます', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '壁（かべ）に カレンダーが 掛（か）けてあります。', 'かべに カレンダーが かけてあります。', 'Tờ lịch được treo sẵn trên tường.', 1),
        ('GRAMMAR', g_id, '旅行（りょこう）の 前（まえ）に 切符（きっぷ）を 買（か）っておきます。', 'りょこうの まえに きっぷを かっておきます。', 'Tớ mua sẵn vé trước chuyến du lịch.', 2);

    END IF;

    -- ==========================================
    -- Bài 31: Ý định Volitional (意向形 / ～つもりです)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 6;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-意向形 & Vる/Vない つもりです', 'Thể ý định & Dự định làm / Không làm gì', 'Thể Ý định (V-おう/よう) là dạng thân mật của V-ましょう. Mẫu つもりです diễn tả dự định cá nhân quyết tâm thực hiện.', 'V-意向形 + と思っています | V-る/V-ない + つもりです', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '週末（しゅうまつ）は 海（うみ）へ 行（い）こうと 思（お）っています。', 'しゅうまつは うみへ いこうと おもっています。', 'Cuối tuần tớ đang định đi biển.', 1),
        ('GRAMMAR', g_id, '明日（あした）から 煙草（たばこ）を 吸（す）わない つもりです。', 'あしたから たばこを すわない つもりです。', 'Từ ngày mai tớ định sẽ không hút thuốc nữa.', 2);

    END IF;

    -- ==========================================
    -- Bài 32: Khuyên bảo & Suy đoán (～ほうがいいです / ～でしょう)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 7;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Vた/Vない ほうがいいです & 〜でしょう / 〜かもしれません', 'Nên / Không nên... & Có lẽ... / Có thể...', 'Vた/Vない ほうがいいです dùng đưa ra lời khuyên cụ thể cho người nghe. 〜でしょう phỏng đoán với độ chắc chắn cao. 〜かもしれません phỏng đoán có thể xảy ra (khoảng 50%).', 'V-た / V-ない + ほうがいいです | 普通形 + でしょう / かもしれません', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '毎日（まいにち） 運動（うんどう）した ほうがいいです。', 'まいにち うんどうした ほうがいいです。', 'Cậu nên vận động hàng ngày thì tốt hơn.', 1),
        ('GRAMMAR', g_id, '午後（ごご）から 雨（あめ）が 降（ふ）るかもしれません。', 'ごごから あめが ふるかもしれません。', 'Từ chiều có thể trời sẽ mưa đấy.', 2);

    END IF;

    -- ==========================================
    -- Bài 33: Mệnh lệnh & Cấm đoán (命令形 / 禁止形)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 8;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-命令形 / V-禁止形 & 〜という意味です', 'Thể mệnh lệnh / Cấm đoán & Có nghĩa là...', 'Thể Mệnh lệnh (いけ, しろ) và Cấm đoán (いくな, するな) mang sắc thái rất mạnh, dùng trong khẩn cấp, cổ vũ thể thao hoặc báo hiệu biển báo.', 'V-命令形 | V-る + な (Cấm đoán) | Mệnh đề + という意味です', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '早く 走れ！（はやく はしれ！）', 'はやく はしれ！', 'Chạy nhanh lên!', 1),
        ('GRAMMAR', g_id, 'ここに 入るな！（ここに はいるな！）', 'ここに はいるな！', 'Không được vào đây!', 2);

    END IF;

    -- ==========================================
    -- Bài 34: Theo như & Sau khi (～とおりに / ～あとで)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 9;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V1-とおりに V2 & V1-あとで V2 & V1-ないで V2', 'Làm V2 theo đúng V1 & Sau khi làm V1 thì làm V2 & Làm V2 mà không V1', 'とおりに chỉ sự làm theo đúng hướng dẫn. あとで chỉ trình tự sau khi hoàn thành. V1-ないで V2 chỉ việc thực hiện V2 trong trạng thái không làm V1.', 'V1-る/V1-た/Nの + とおりに | V1-た/Nの + あとで | V1-ないで + V2', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '説明書（せつめいしょ）の とおりに 組み立てます。', 'せつめいしょの とおりに くみたてます。', 'Lắp ráp theo đúng sách hướng dẫn.', 1),
        ('GRAMMAR', g_id, '仕事（しごと）が 終（お）わった あとで、飲みに行きます。', 'しごとが おわった あとで、のみにいきます。', 'Sau khi công việc kết thúc, tớ sẽ đi uống.', 2);

    END IF;

    -- ==========================================
    -- Bài 35: Thể Điều kiện Ba (条件形 - ば)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 10;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '条件形 (V-えば / Adj-ければ / N-なら) & V-ば V-るほど', 'Nếu... thì... & Càng... thì càng...', 'Thể điều kiện Ba diễn tả giả định nếu điều kiện ở vế 1 xảy ra thì vế 2 sẽ diễn ra tất yếu.', 'V1-えば V2 | V1-ば V1-るほど V2', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '春（はる）に なれば、桜（さくら）が 咲（さ）きます。', 'はるに なれば、さくらが さきます。', 'Nếu sang xuân thì hoa anh đào sẽ nở.', 1),
        ('GRAMMAR', g_id, '日本語（にほんご）は 勉強（べんきょう）すれば するほど 面白（おもしろ）くなります。', 'にほんごは べんきょうすれば するほど おもしろくなります。', 'Tiếng Nhật càng học thì càng thấy thú vị.', 2);

    END IF;

    -- ==========================================
    -- Bài 36: Cố gắng & Thay đổi trạng thái (～ようにします / ～ようになります)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 11;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Vる/Vない ようにします & Vる/Vない ようになります', 'Cố gắng tạo thói quen & Thay đổi khả năng/trạng thái', 'ようにします chỉ nỗ lực bản thân tạo thói quen tốt. ようになります chỉ sự chuyển biến khả năng từ không thể thành có thể.', 'V-る / V-ない + ようにします | V-る / V-ない + ようになります', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '毎日（まいにち） 野菜（やさい）を 食（た）べるように しています。', 'まいにち やさいを たべるように しています。', 'Tớ đang cố gắng ăn rau hàng ngày.', 1),
        ('GRAMMAR', g_id, '日本語（にほんご）で 電話（でんわ）が かけられるようになりました。', 'にほんごで でんわが かけられるようになりました。', 'Tớ đã có thể gọi điện thoại bằng tiếng Nhật rồi.', 2);

    END IF;

    -- ==========================================
    -- Bài 37: Thể Bị động Passive (受身形)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 12;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '受身形 (V-られる/れる) - Thể bị động', 'Bị / Được ai đó làm hành động gì', 'Nhóm 1: âm i -> a + れる. Nhóm 2: bỏ ます + られる. Nhóm 3: きます->こられる, します->される. Người thực hiện tác động đi với trợ từ に.', 'N1 は N2 に + V-受身形 | N1 は N2 に N3 を + V-受身形', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私（わたし）は 先生（せんせい）に 褒（ほ）められました。', 'わたしは せんせいに ほめられました。', 'Tôi đã được giáo viên khen ngợi.', 1),
        ('GRAMMAR', g_id, '弟（おとうと）に パソコンを 壊（こわ）されました。', 'おとうとに パソコンを こわされました。', 'Tớ bị em trai làm hỏng máy tính.', 2);

    END IF;

    -- ==========================================
    -- Bài 38: Danh từ hóa mệnh đề (～のは / ～のが)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 13;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-る のは Adj です & V-る のが 好きです', 'Việc làm V thì... & Thích / Giỏi việc làm V', 'Thêm trợ từ の sau động từ thể từ điển (V-る) để biến cả mệnh đề thành danh từ làm chủ ngữ hoặc tân ngữ.', 'V-る + のは + Adj です | V-る + のが + 好き/上手です', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '一人（ひとり）で 生活（せいかつ）するのは 大変（たいへん）です。', 'ひとりで せいかつするのは たいへんです。', 'Việc sống một mình thật là vất vả.', 1),
        ('GRAMMAR', g_id, '絵（え）を 描（えが）くのが 好きです。', 'えを かくのが すきです。', 'Tớ thích việc vẽ tranh.', 2);

    END IF;

    -- ==========================================
    -- Bài 39: Nguyên nhân & Lý do khách quan (～て/で / ～ので)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 14;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-て / Adj-くて / N-で & 〜ので', 'Vì... nên... (chỉ nguyên nhân tự nhiên, lý do khách quan)', 'V-て/で chỉ nguyên nhân kết quả tự nhiên ngoài ý muốn (tai nạn, thiên tai, tin tức). 〜ので dùng giải thích lý do một cách lịch sự, nhẹ nhàng.', 'V-て / N で | Mệnh đề (普通形) + ので', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'ニュースを 聞（き）いて、びっくりしました。', 'ニュースを きいて、びっくりしました。', 'Vì nghe tin tức nên tớ đã rất giật mình.', 1),
        ('GRAMMAR', g_id, '気分（きぶん）が 悪（わる）いので、早（はや）く 帰（かえ）ってもいいですか。', 'きぶんが わるいので、はやく かえってもいいですか。', 'Vì trong người thấy không khỏe, tớ xin phép về sớm được không ạ?', 2);

    END IF;

    -- ==========================================
    -- Bài 40: Dạng nghi vấn phụ & Thử làm (～かどうか / ～てみます)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 15;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜かどうか & V-てみます', 'Có... hay không & Thử làm V', '〜かどうか lồng một câu hỏi không có nghi vấn từ vào câu chính. V-てみます diễn tả hành động làm thử xem kết quả ra sao.', '普通形 + かどうか | V-て + みます', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '間（ま）に 合（あ）うかどうか、わかりません。', 'まに あうかどうか、わかりません。', 'Tớ không biết liệu có kịp giờ hay không.', 1),
        ('GRAMMAR', g_id, 'この 着物（きもの）を 着（き）てみます。', 'この きものを きてみます。', 'Tớ sẽ mặc thử bộ kimono này.', 2);

    END IF;

    -- ==========================================
    -- Bài 41: Cho nhận kính ngữ (～ていただきます / ～てくださいます)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 16;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-て いただきます & V-て くださいます', 'Được người trên làm cho V & Người trên làm cho mình V (Lịch sự)', 'Dạng kính ngữ của V-てもらいます và V-てくれます khi đối tượng thực hiện là cấp trên, thầy cô hoặc người lớn tuổi.', 'N(người trên) に + V-て いただきます | N(người trên) が + V-て くださいます', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私（わたし）は 社長（しゃちょう）に お土産（みやげ）を いただきました。', 'わたしは しゃちょうに おみやげを いただきました。', 'Tôi đã nhận được quà từ giám đốc.', 1),
        ('GRAMMAR', g_id, '部長（ぶちょう）の 奥様（おくさま）が お茶（ちゃ）を 淹（い）れて くださいました。', 'ぶちょうの おくさまが おちゃを いれて くださいました。', 'Phu nhân của trưởng phòng đã pha trà cho chúng tôi.', 2);

    END IF;

    -- ==========================================
    -- Bài 42: Mục đích để làm gì (～ために / ～のに)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 17;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Vる/Nの ために & Vる/Nの に (Công dụng/Tiêu tốn)', 'Để... (Mục đích) & Dùng vào việc... / Tốn... để làm...', '〜ために diễn tả mục đích ý chí của bản thân. 〜のに đi với các động từ chỉ công dụng (使います) hoặc thời gian/tiền bạc (かかります).', 'V-る / N の + ために | V-る / N の + に (使います/かかります)', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '家（いえ）を 買（か）うために、貯金（ちょきん）しています。', 'いえを かうために、ちょきんしています。', 'Tớ đang tiết kiệm tiền để mua nhà.', 1),
        ('GRAMMAR', g_id, 'この ハサミは 紙（かみ）を 切（き）るのに 使（つか）います。', 'この ハサミは かみを きるのに つかいます。', 'Cây kéo này được dùng vào việc cắt giấy.', 2);

    END IF;

    -- ==========================================
    -- Bài 43: Sắp sửa & Trông có vẻ (～そうです / ～てきます)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 18;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Vます/Adj そうです & V-て きます', 'Trông có vẻ sắp... / Trông có vẻ... & Đi làm V rồi về', '〜そうです chỉ dự đoán trực quan dựa trên quan sát mắt thấy. V-て きます chỉ hành động đi ra ngoài làm gì đó rồi quay lại vị trí ban đầu.', 'V-ます(bỏ) / Adj-い(bỏ い) / Adj-な + そうです | V-て + きます', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '今（いま）にも 雨（あめ）が 降（ふ）りそうです。', 'いまにも あめが ふりそうです。', 'Trời trông có vẻ sắp mưa đến nơi rồi.', 1),
        ('GRAMMAR', g_id, 'ちょっと タバコを 買（か）って きます。', 'ちょっと タバコを かって きます。', 'Tớ đi mua bao thuốc một chút rồi về nhé.', 2);

    END IF;

    -- ==========================================
    -- Bài 44: Quá mức & Dễ/Khó làm (～すぎます / ～やすい・にくい)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 19;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Vます/Adj すぎます & Vます やすいです / にくいです', 'Quá... & Dễ làm... / Khó làm...', 'すぎます chỉ mức độ vượt quá giới hạn cho phép. やすいです/にくいです diễn tả tính chất của vật khiến hành động trở nên dễ dàng hoặc khó khăn.', 'V-ます(bỏ) / Adj + すぎます | V-ます(bỏ) + やすいです / にくいです', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '昨晩（さくばん） お酒（さけ）を 飲（の）みすぎました。', 'さくばん おさけを のみすぎました。', 'Tối qua tớ đã uống quá nhiều rượu.', 1),
        ('GRAMMAR', g_id, 'この 辞書（じしょ）は 字（じ）が 大（おお）きくて 見（み）やすいです。', 'この じしょは じが おおきくて みやすいです。', 'Cuốn từ điển này chữ to nên rất dễ nhìn.', 2);

    END IF;

    -- ==========================================
    -- Bài 45: Trong trường hợp & Mặc dù (～ばあいは / ～のに)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 20;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜場合は & 〜のに', 'Trong trường hợp... & Mặc dù... nhưng...', '〜場合は chỉ giả định tình huống giả thiết. 〜のに diễn tả sự nhượng bộ bất ngờ, trái với dự đoán hoặc thể hiện bất mãn nhẹ nhàng.', 'V/Adj/N + 場合は | Mệnh đề (普通形) + のに', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '火事（かじ）の 場合は、119番（ばん）を かけます。', 'かじの ばあいは、119ばんを かけます。', 'Trong trường hợp hỏa hoạn thì gọi số 119.', 1),
        ('GRAMMAR', g_id, '約束（やくそく）をしたのに、彼女（かのじょ）は 来（こ）なかった。', 'やくそくをしたのに、かのじょは こなかった。', 'Mặc dù đã hẹn trước nhưng cô ấy đã không đến.', 2);

    END IF;

    -- ==========================================
    -- Bài 46: Vừa mới làm xong (～ところです / ～ばかりです)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 21;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Vる/Vている/Vた ところです & Vた ばかりです', 'Sắp sửa / Đang / Vừa mới... & Vừa mới làm xong (cảm giác thời gian ngắn)', 'ところです diễn tả giai đoạn chính xác của hành động. ばかりです diễn tả việc vừa mới làm xong theo cảm nhận tâm lý của người nói.', 'V-る / V-ている / V-た + ところです | V-た + ばかりです', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '今（いま）から 電車（でんしゃ）に 乗（の）るところです。', 'いまから でんしゃに のるところです。', 'Tớ chuẩn bị lên tàu điện ngay bây giờ đây.', 1),
        ('GRAMMAR', g_id, '先月（せんげつ） 日本（にほん）へ 来（き）たばかりです。', 'せんげつ にほんへ きたばかりです。', 'Tớ mới đến Nhật Bản tháng trước thôi.', 2);

    END IF;

    -- ==========================================
    -- Bài 47: Nghe nói & Hình như (～そうです / ～ようです)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 22;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-普通形 そうです & V-普通形 ようです', 'Nghe nói là... & Hình như là...', '〜そうです truyền đạt thông tin đồn/nghe từ nguồn khác (không bỏ い/な). 〜ようです phỏng đoán dựa trên cảm giác trực giác hoặc giác quan.', '普通形 + そうです (Nghe nói) | 普通形 + ようです (Hình như)', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '天気予報（てんきよほう）によると、明日（あした）は 晴（は）れるそうです。', 'てんきよほうによると、あしたは はれるそうです。', 'Theo dự báo thời tiết thì nghe nói ngày mai trời sẽ nắng.', 1),
        ('GRAMMAR', g_id, '外（そと）が 賑（にぎ）やかですね。祭り（まつり）の ようです。', 'そとが にぎやかですね。まつりの ようです。', 'Bên ngoài ồn ào nhỉ. Hình như là có lễ hội.', 2);

    END IF;

    -- ==========================================
    -- Bài 48: Thể Sai khiến Causative (使役形 - させる)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 23;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '使役形 (V-させる/せます) & V-使役形 ていただきます', 'Cho phép / Bắt ai đó làm & Xin phép được làm gì', 'Nhóm 1: âm i -> a + せる. Nhóm 2: bỏ ます + させる. Nhóm 3: きます->こさせる, します->させる. Mẫu 使役形 + ていただきます dùng xin phép người trên rất lịch sự.', 'N1 は N2 に + V-使役形 | V-使役形 + ていただきます', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '先生（せんせい）は 生徒（せいと）に 宿題（しゅくだい）を させます。', 'せんせいは せいとに しゅくだいを させます。', 'Giáo viên bắt học sinh làm bài tập.', 1),
        ('GRAMMAR', g_id, '気分（きぶん）が 悪（わる）いので、早（はや）く 帰（かえ）らせて いただけますか。', 'きぶんが わるいので、はやく かえらせて いただけますか。', 'Vì trong người thấy không khỏe, nhờ thầy/cô cho phép em về sớm được không ạ?', 2);

    END IF;

    -- ==========================================
    -- Bài 49: Tôn kính ngữ (尊敬語 - Keigo)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 24;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '尊敬語 (お Vます になります / Kính ngữ đặc biệt)', 'Tôn kính ngữ dùng thể hiện sự kính trọng với hành động của đối phương / người trên', '3 cách dùng: (1) Động từ kính ngữ đặc biệt (いらっしゃいます, おっしゃいます...). (2) Cấu trúc お V-ます になります. (3) Dùng dạng bị động V-られる.', 'お + V-ます(bỏ) + になります | 尊敬語 特殊形', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '社長（しゃちょう）は もう 帰（かえ）られましたか。', 'しゃちょうは もう かえられましたか。', 'Giám đốc đã về chưa ạ?', 1),
        ('GRAMMAR', g_id, '何（なに）を 召（め）し上（あ）がりますか。', 'なにを めしあがりますか。', 'Thầy/Cô/Quý khách dùng món gì ạ?', 2);

    END IF;

    -- ==========================================
    -- Bài 50: Khiêm nhường ngữ (謙譲語 - Kenjougo)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n4_id AND sort_order = 25;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '謙譲語 (お Vます します / Khiêm nhường đặc biệt)', 'Khiêm nhường ngữ hạ thấp hành động bản thân để tôn vinh người nghe', 'Dùng khi nói về hành động của chính mình hoặc người thuộc nhóm mình (công ty mình) làm cho đối phương. Cách dùng: お V-ます します hoặc động từ khiêm nhường đặc biệt (参ります, 申します, いたします...).', 'お + V-ます(bỏ) + します | 謙譲語 特殊形', 'N4', 1, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;

        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私（わたし）が 重（おも）い 荷物（にもつ）を お持（も）ちします。', 'わたしが おもい にもつを おもちします。', 'Để em mang giúp hành lý nặng này cho ạ.', 1),
        ('GRAMMAR', g_id, '明日（あした） 10時（じゅうじ）に 参（まい）ります。', 'あした じゅうじに まいります。', 'Ngày mai vào lúc 10 giờ tôi sẽ đến ạ.', 2);

    END IF;

END $$;