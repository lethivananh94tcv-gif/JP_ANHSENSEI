-- ====================================================================
-- V47: Supplement All Missing N5 Grammar Points (Bài 1 to Bài 25)
-- ====================================================================

DO $$
DECLARE
    lvl_n5_id BIGINT;
    les_id BIGINT;
    g_id BIGINT;
BEGIN
    SELECT level_id INTO lvl_n5_id FROM levels WHERE code = 'N5';

    -- ==========================================
    -- BÀI 1: bổ sung ～さん, hỏi nghề nghiệp, quốc tịch
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 1;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Xưng hô 〜さん & Hỏi nghề nghiệp, quốc tịch', 'Anh/Chị/Ông/Bà 〜 & Cách hỏi nghề nghiệp/quốc tịch', 'Thêm 〜さん sau tên người khác để thể hiện sự lịch sự. Không dùng さん cho bản thân. Hỏi nghề nghiệp dùng お仕事は何ですか. Hỏi quốc tịch dùng どちらから来ましたか / 〜人ですか.', 'Tên + さん | お仕事 は 何ですか | どちらから 来ましたか', 'N5', 7, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '田中さん は 会社員 です。', 'たなかさん は かいしゃいん です。', 'Anh Tanaka là nhân viên công ty.', 1),
        ('GRAMMAR', g_id, 'お仕事 は 何 ですか。... 銀行員 です。', 'おしごと は なん ですか。... ぎんこういん です。', 'Công việc của bạn là gì? ... Tôi là nhân viên ngân hàng.', 2),
        ('GRAMMAR', g_id, 'どちら から 来ましたか。... ベトナム から 来ました。', 'どちら から きましたか。... ベトナム から きました。', 'Bạn đến từ đâu? ... Tôi đến từ Việt Nam.', 3);
    END IF;

    -- ==========================================
    -- BÀI 2: bổ sung どれ / どの N, いいえ、そうじゃありません / 違います
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 2;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'どれ / どの N & Phủ định trực tiếp (違います)', 'Cái nào / N nào & Không phải, sai rồi', 'どれ dùng để hỏi cái nào trong 3 đối tượng trở lên. どの + N đứng trước danh từ để hỏi danh từ nào. Trả lời phủ định có thể dùng いいえ、そうじゃありません hoặc 違います (ちがいます).', 'どれ が N ですか | どの + N + は ... | いいえ、違います', 'N5', 6, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'あなた の 傘 は どれ ですか。', 'あなた の かさ は どれ ですか。', 'Cây dù của bạn là cái nào?', 1),
        ('GRAMMAR', g_id, 'どの 鍵 が あなた の ですか。', 'どの かぎ が あなた の ですか。', 'Chiếc chìa khóa nào là của bạn?', 2),
        ('GRAMMAR', g_id, 'それ は 辞書 ですか。 ... いいえ、違います。', 'それ は じしょ ですか。 ... いいえ、ちがいます。', 'Đó là từ điển à? ... Không, sai rồi.', 3);
    END IF;

    -- ==========================================
    -- BÀI 3: bổ sung こちら/そちら/あちら, N は Place です, いくらですか
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 3;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'こちら / そちら / あちら & N は Địa điểm です & いくらですか', 'Hướng này/đó/kia & N ở địa điểm & Giá bao nhiêu', 'こちら / そちら / あちら chỉ phương hướng hoặc thay thế cho ここ/そこ/あそこ với sắc thái lịch sự. Mẫu N は Địa điểm です dùng chỉ vị trí danh từ. Hỏi giá tiền dùng 〜は いくらですか.', 'こちら / そちら / あちら | N + は + Địa điểm + です | N + は + いくらですか', 'N5', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '受付 は こちら です。', 'うけつけ は こちら です。', 'Quầy lễ tân ở hướng này ạ.', 1),
        ('GRAMMAR', g_id, 'マイクさん は 事務所 です。', 'マイクさん は じむしょ です。', 'Anh Mike ở văn phòng.', 2),
        ('GRAMMAR', g_id, 'この シャツ は いくら ですか。... 3,000円 です。', 'この シャツ は いくら ですか。... さんせんえん です。', 'Cái áo sơ mi này giá bao nhiêu? ... Giá 3.000 Yên.', 3);
    END IF;

    -- ==========================================
    -- BÀI 4: bổ sung 〜ごろ, いつ, 何時・何分, Trợ từ に với mốc thời gian
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 4;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜ごろ & いつ & 何時・何分 & Trợ từ に', 'Khoảng chừng & Khi nào & Mấy giờ mấy phút', '〜ごろ đặt sau mốc thời gian chỉ khoảng chừng. いつ dùng hỏi khi nào. 何時 (なんじ) và 何分 (なんぷん) hỏi giờ/phút. Trợ từ に chỉ dùng với mốc thời gian có con số cụ thể (7時, 10日), không dùng với mốc thời gian tương đối (きょう, あした, まいにち).', 'Thời gian + ごろ | いつ + V-ますか | 何時 何分 | Con số + に', 'N5', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '毎夜 10時ごろ 寝ます。', 'まいばん じゅうじごろ ねます。', 'Mỗi tối tôi ngủ khoảng chừng 10 giờ.', 1),
        ('GRAMMAR', g_id, '試験 は いつ ですか。', 'しけん は いつ ですか。', 'Kỳ thi là khi nào?', 2),
        ('GRAMMAR', g_id, '今 何時 何分 ですか。... 9時 15分 です。', 'いま なんじ なんぷん ですか。... くじ じゅうごふん です。', 'Bây giờ là mấy giờ mấy phút? ... 9 giờ 15 phút.', 3);
    END IF;

    -- ==========================================
    -- BÀI 5: bổ sung 来ます/帰ります, いつ, どこへも〜ません, Nから
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 5;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '来ます / 帰ります & どこ [へ] も 〜ません & N (địa điểm) から', 'Đến / Về & Không đi đâu cả & Từ địa điểm N', 'Phân biệt: 行きます (đi xa người nói), 来ます (đến phía người nói), 帰ります (về nhà/quốc gia). どこへも + Phủ định biểu thị không đi đâu cả. N から chỉ điểm xuất phát.', 'Địa điểm + へ + 来ます / 帰ります | どこ [へ] も + V-ません | N (Địa điểm) + から', 'N5', 4, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '友達 が うち へ 来ました。', 'ともだち が うち へ きました。', 'Bạn tôi đã đến nhà tôi.', 1),
        ('GRAMMAR', g_id, '日曜日 どこ へ も 行きませんでした。', 'にちようび どこ へ も いきませんでした。', 'Chủ nhật tôi đã không đi đâu cả.', 2),
        ('GRAMMAR', g_id, 'ベトナム から 来ました。', 'ベトナム から きました。', 'Tôi đến từ Việt Nam.', 3);
    END IF;

    -- ==========================================
    -- BÀI 6: bổ sung いっしょに, 何をしますか, Trợ từ で nơi diễn ra hành động
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 6;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'いっしょに + V-ませんか & 何 を しますか & Trợ từ で', 'Cùng làm V nhé? & Làm cái gì? & Tại địa điểm N', 'いっしょに dùng cùng với V-ませんか để rủ rê cùng làm gì. 何をしますか dùng hỏi hành động làm gì. Trợ từ で đứng sau danh từ chỉ nơi chốn xảy ra hành động (phân biệt với に trong câu tồn tại).', 'いっしょに + V-ませんか | 何 を しますか | N (Nơi chốn) + で + V', 'N5', 4, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'いっしょに 昼ごはん を 食べませんか。', 'いっしょに ひるごはん を たべませんか。', 'Cùng ăn cơm trưa với tôi nhé?', 1),
        ('GRAMMAR', g_id, '日曜日 何 を しますか。... 図書館 で 勉強します。', 'にちようび なん を しますか。... としょかん で べんきょうします。', 'Chủ nhật bạn làm gì? ... Tôi học ở thư viện.', 2);
    END IF;

    -- ==========================================
    -- BÀI 7: bổ sung かします/かります, おしえます/ならいます, Nをください, もう〜ました/まだです
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 7;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'かします / かります & おしえます / ならいます & N を ください & もう 〜ました / まだです', 'Cho mượn / Mượn & Dạy / Học & Cho tôi N & Đã làm V rồi / Chưa', 'かします (cho mượn), かります (mượn từ N に/から). おしえます (dạy cho N に), ならいます (học từ N に/から). N を ください dùng khi gọi món/xin đồ. もう V-ました (đã làm rồi), trả lời chưa làm là いいえ、まだです.', 'N1 に N2 を かします / かります | N を ください | もう + V-ました | いいえ、まだです', 'N5', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '山田さん に 本 を 貸しました。', 'やまださん に ほん を かしました。', 'Tôi đã cho anh Yamada mượn sách.', 1),
        ('GRAMMAR', g_id, 'これ を ください。', 'これ を ください。', 'Xin cho tôi cái này.', 2),
        ('GRAMMAR', g_id, 'もう 昼ごはん を 食べましたか。... いいえ、まだです。', 'もう ひるごはん を たべましたか。... いいえ、まだです。', 'Bạn đã ăn cơm trưa chưa? ... Chưa, tôi chưa ăn.', 3);
    END IF;

    -- ==========================================
    -- BÀI 8: bổ sung とても / あまり〜ません, Nはどうですか, どんな N, Nối tính từ
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 8;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'とても / あまり 〜ません & N は どうですか & どんな N & Adj + N', 'Rất / Không... lắm & N thì thế nào? & N như thế nào? & Nối tính từ danh từ', 'とても (rất) đi với thể khẳng định. あまり (không... lắm) đi với thể phủ định. N は どうですか dùng hỏi cảm tưởng. どんな N dùng hỏi tính chất danh từ. Khi bổ nghĩa danh từ: Adj-い + N (giữ い), Adj-な + N (thêm な).', 'とても + Adj-Khẳng định | あまり + Adj-Phủ định | N は どうですか | どんな + N | Adj-い N / Adj-な N', 'N5', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '日本 の 𝕃料理 は とても おいしいです が、高いです。', 'にほん の りょうり は とても おいしいです が、たかいです。', 'Món ăn Nhật Bản rất ngon nhưng đắt.', 1),
        ('GRAMMAR', g_id, 'この 部屋 は あまり 廣くないです。', 'この へや は あまり ひろくないです。', 'Căn phòng này không rộng lắm.', 2),
        ('GRAMMAR', g_id, '日本 は どんな 国 ですか。... 賑やかな 国 です。', 'にほん は どんな くに ですか。... にぎやかな くに です。', 'Nhật Bản là một đất nước như thế nào? ... Là một đất nước nhộn nhịp.', 3);
    END IF;

    -- ==========================================
    -- BÀI 9: bổ sung 嫌いです/上手です/下手です, Phó từ mức độ, どうして, Nがあります (Sở hữu/Sự kiện)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 9;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '嫌いです / 上手です / 下手です & Phó từ mức độ & どうして & N が あります (Sở hữu/Sự kiện)', 'Ghét / Giỏi / Dở & Mức độ (よく/少し...) & Tại sao & Có N (thời gian/cuộc hẹn)', 'N が 嫌いです (ghét), 上手です (giỏi), 下手です (dở). Phó từ mức độ: よく (rất rõ), だいたい (đại khái), たくさん (nhiều), 少し (một chút), 全然〜ない (hoàn toàn không). どうして hỏi lý do, trả lời kết thúc bằng 〜から. N が あります biểu thị sở hữu, có thời gian hoặc có việc bận/sự kiện.', 'N が 嫌いです / 上手です / 下手です | どうして ... か。〜から | N が あります', 'N5', 3, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'ミラーさん は 𝕃料理 が 上手です。', 'ミラーさん は りょうり が じょうずです。', 'Anh Miller nấu ăn giỏi.', 1),
        ('GRAMMAR', g_id, 'どうして 昨夜 勉強しませんでしたか。... 約束 が ありました から。', 'どうして ゆうべ べんきょうしませんでしたか。... やくそく が ありました から。', 'Tại sao tối qua bạn không học? ... Vì tôi có cuộc hẹn.', 2),
        ('GRAMMAR', g_id, '今日 は 用事 が あります。', 'きょう は ようじ が あります。', 'Hôm nay tôi có việc bận.', 3);
    END IF;

    -- ==========================================
    -- BÀI 10: bổ sung N は Place にあります/います, Nの位置, ～や～など
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 10;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'N は Địa điểm に あります / います & Vị trí không gian & N1 や N2 [など]', 'N ở tại địa điểm & Vị trí (trên/dưới/trước/sau...) & N1 và N2 (vân vân)', 'Trật tự N は Địa điểm に あります/います dùng khi chủ đề N đã biết. Vị trí: 上 (trên), 下 (dưới), 前 (trước), 後ろ (sau), 中 (trong), 隣 (bên cạnh), 近く (gần). Trợ từ や dùng liệt kê không hoàn toàn, cuối danh từ có thể thêm など.', 'N は 地点 に あります / います | N1 の Vị trí | N1 や N2 [など]', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '本 は 机 の 上 に あります。', 'ほん は つくえ の うえ に あります。', 'Quyển sách ở trên cái bàn.', 1),
        ('GRAMMAR', g_id, '箱 の 中 に 手紙 や 写真 など が あります。', 'はこ の なか に てがみ や しゃしん など が あります chính.', 'Trong hộp có thư, ảnh (vân vân).', 2);
    END IF;

    -- ==========================================
    -- BÀI 11: bổ sung ～ぐらい / くらい, どのくらい, số lần ～回, 期間に～回, だけ
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 11;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜ぐらい / くらい & どのくらい & Số lần 〜回 & Tần suất (Khoảng thời gian に 〜回) & だけ', 'Khoảng chừng & Bao lâu & Số lần & Tần suất thực hiện & Chỉ duy nhất', '〜ぐらい đặt sau lượng từ chỉ khoảng chừng. どのくらい hỏi khoảng bao lâu/bao nhiêu. 〜回 đếm số lần. Tần suất: Khoảng thời gian + に + 〜回 (vd: 1週間に2回 = 1 tuần 2 lần). だけ đặt sau lượng từ/danh từ biểu thị chỉ duy nhất.', 'Lượng từ + ぐらい | どのくらい | Khoảng thời gian + に + Số lần + 回 | Lượng từ + だけ', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '日本 に 2年 ぐらい います。', 'にほん に にねん ぐらい います。', 'Tôi ở Nhật khoảng 2 năm.', 1),
        ('GRAMMAR', g_id, '1か月 に 2回 映画 を 見ます。', 'いっかげつ に にかい えいが を みます。', 'Một tháng tôi xem phim 2 lần.', 2),
        ('GRAMMAR', g_id, '休み は 日曜日 だけ です。', 'やすみ は にちようび だけ です。', 'Ngày nghỉ chỉ có duy nhất chủ nhật.', 3);
    END IF;

    -- ==========================================
    -- BÀI 12: bổ sung chia quá khứ của tính từ/noun, Nのほうが, どちらのほうが, 一番
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 12;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Quá khứ tính từ & N1 の ほうが Adj & N1 と N2 と どちらが Adj か & Phạm vi で N が 一番 Adj', 'Chia quá khứ Tính từ/Danh từ & N1 thì hơn & Giữa N1 và N2 cái nào hơn & Nhất trong phạm vi', 'Chia quá khứ: Adj-い -> 〜かったです / 〜くなかったです. Adj-な & N -> 〜でした / 〜じゃありませんでした. N1 の ほうが Adj (N1 hơn). N1 と N2 と どちらが Adj ですか (cái nào hơn?). Phạm vi + で + N + が + 一番 + Adj + です (nhất trong phạm vi).', 'Adj-い Quá khứ | Adj-な/N Quá khứ | N1 の ほうが Adj | N1 と N2 と どちらが Adj ですか | Phạm vi で N が 一番 Adj', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '昨日 は 雨 でした。旅行 は たのしかった です。', 'きのう は あめ でした。りょこう は たのしかった です。', 'Hôm qua trời đã mưa. Chuyến du lịch đã rất vui.', 1),
        ('GRAMMAR', g_id, 'サッカー と 野球 と どちら が おもしろい ですか。... サッカー の ほう が おもしろい です。', 'サッカー と やきゅう と どちら が おもしろい ですか。... サッカー の ほう が おもしろい です。', 'Bóng đá và bóng chày cái nào thú vị hơn? ... Bóng đá thú vị hơn.', 2),
        ('GRAMMAR', g_id, '1年 で 12月 が 一番 寒い です。', 'いちねん で じゅうにがつ が いちばん さむい です。', 'Trong một năm tháng 12 là lạnh nhất.', 3);
    END IF;

    -- ==========================================
    -- BÀI 13: bổ sung 何か / 何も, どこか / どこも, cách hỏi 何がほしいですか / 何をしたいですか
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 13;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '何か / 何も & どこか / どこも & Cách hỏi 何がほしいですか / 何をしたいですか', 'Cái gì đó / Không cái gì cả & Đâu đó / Không đâu cả & Hỏi nhu cầu mong muốn', '何か (cái gì đó), 何も + Phủ định (không cái gì cả). どこか (nơi nào đó), どこも + Phủ định (không nơi nào cả). Trợ từ を/が có thể được giản lược sau 何か/どこか. Hỏi mong muốn dùng 何が ほしいですか hoặc 何 を したいですか.', '何か / 何も + Phủ định | どこか / どこも + Phủ định | 何が ほしいですか | 何 を したいですか', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '喉 が 渇きました から、何か 飲みたい です。', 'のど が かわきました から、なに か のみたい です。', 'Vì khát nước nên tôi muốn uống cái gì đó.', 1),
        ('GRAMMAR', g_id, '今 何 が 一番 ほしい ですか。... 広い 家 が ほしい です。', 'いま なに が いちばん ほしい ですか。... ひろい いえ が ほしい です。', 'Bây giờ bạn muốn có cái gì nhất? ... Tôi muốn có ngôi nhà rộng.', 2);
    END IF;

    -- ==========================================
    -- BÀI 14: bổ sung Quy tắc chia 3 nhóm động từ sang thể て & V-ましょうか
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 14;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Quy tắc chia 3 Nhóm động từ sang Thể て & V-ましょうか', 'Quy tắc chia thể て & Để tôi làm V giúp bạn nhé?', 'Chia thể て: Nhóm 1 (い/ち/り -> った, き -> いて, ぎ -> いで, み/び/に -> んだ, し -> して; 行きます -> いって). Nhóm 2 (ます -> て). Nhóm 3 (します -> して, 来ます -> きた/きて). V-ましょうか dùng khi đề nghị trực tiếp làm giúp ai việc gì.', 'Nhóm 1, 2, 3 -> Thể て | V-ます + ましょうか', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '傘 を 貸しましょうか。... ええ、すみません。おねがいします。', 'かさ を かしましょうか。... ええ、すみません。おねがいします。', 'Tôi cho bạn mượn dù nhé? ... Vâng, cảm ơn bạn nhiều.', 1),
        ('GRAMMAR', g_id, '荷物 を 持ちましょうか。', 'にもつ を もちましょうか。', 'Để tôi hành lý giúp bạn nhé?', 2);
    END IF;

    -- ==========================================
    -- BÀI 15: bổ sung Phân biệt 2 ý nghĩa V-ています & V-てもいいです / V-てはいけません
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 15;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-ています (2 Ý nghĩa) & V-てもいいです & V-てはいけません', 'Đang làm V / Trạng thái kết quả & Được phép làm V & Không được làm V (Cấm)', 'V-ています có 2 ý nghĩa cốt lõi: (1) Hành động đang diễn ra tại thời điểm nói (今 食べています), (2) Trạng thái kết quả kéo dài từ quá khứ (結婚しています, 知っています, 住んでいます). V-てもいいです (được phép làm V). V-てはいけません (cấm đoán không được làm V).', 'V-て + います | V-て + もいいです | V-て + はいけません', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '今 雨 が 降っています。私 は ハノイ に 住んでいます。', 'いま あめ が ふっています。わたし は ハノイ に すんでいます。', 'Bây giờ trời đang mưa. Tôi đang sống ở Hà Nội.', 1),
        ('GRAMMAR', g_id, '写真 を 撮っても いいですか。... いいえ、撮って は いけません。', 'しゃしん を とっても いいですか。... いいえ、とって は いけません。', 'Tôi chụp ảnh có được không? ... Không, không được chụp ảnh ở đây.', 2);
    END IF;

    -- ==========================================
    -- BÀI 16: bổ sung Nối tính từ / danh từ (〜くて / 〜で) & V1-てから V2
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 16;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Nối Tính từ / Danh từ (〜くて / 〜で) & V1-てから、V2', 'Vừa... vừa... (Nối tính từ) & Sau khi làm V1 thì làm V2', 'Nối tính từ/danh từ: Adj-い bỏ い -> 〜くて (安くて おいしい). Adj-な & Danh từ -> 〜で (親切で きれい). V1-てから V2 biểu thị hành động V2 xảy ra ngay sau khi hành động V1 hoàn thành.', 'Adj-い -> 〜くて | Adj-な/N -> 〜で | V1-て + から、V2', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '東京 は 賑やかで、おもしろい 街 です。', 'とうきょう は にぎやかで、おもしろい まち です。', 'Tokyo là một thành phố nhộn nhịp và thú vị.', 1),
        ('GRAMMAR', g_id, '仕事 が 終わってから、泳ぎ に 行きます。', 'しごと が おわってから、およぎ に いきます。', 'Sau khi xong việc tôi sẽ đi bơi.', 2);
    END IF;

    -- ==========================================
    -- BÀI 17: bổ sung V-なくてもいいです, Trợ từ までに (Thời hạn), Quy tắc chia thể ない
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 17;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'V-なくてもいいです & Trợ từ Thời hạn + までに & Quy tắc chia Thể ない', 'Không cần làm V cũng được & Trước thời hạn N & Quy tắc chia thể ない', 'V-なくてもいいです biểu thị không cần thiết phải làm hành động. Trợ từ までに chỉ mốc thời hạn cuối cùng mà hành động phải hoàn tất (khác với まで là liên tục). Quy tắc thể ない: Nhóm 1 (hàng い -> hàng あ + ない, い -> わない). Nhóm 2 (ます -> ない). Nhóm 3 (します -> しない, 来ます -> こない).', 'V-ない -> 〜なくてもいいです | Mốc thời gian + までに + V | Thể ない', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '明日 来なくても いいです。', 'あした こなくても いいです。', 'Ngày mai bạn không cần đến cũng được.', 1),
        ('GRAMMAR', g_id, '土曜日 までに 本 を 返さなければなりません。', 'どようび までに ほん を かえさなければなりません。', 'Tôi phải trả sách trước thứ bảy.', 2);
    END IF;

    -- ==========================================
    -- BÀI 18: bổ sung Vる 前に / N の 前に & Quy tắc chia Thể từ điển (辞書形)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 18;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Vる 前に / N の 前に & Quy tắc chia Thể từ điển (辞書形)', 'Trước khi làm V / Trước N & Quy tắc chia thể từ điển', 'V-辞書形 + 前に hoặc N + の + 前に biểu thị hành động xảy ra trước một mốc hành động hay thời gian khác. Quy tắc thể 辞書形: Nhóm 1 (hàng い -> hàng う). Nhóm 2 (ます -> る). Nhóm 3 (します -> する, 来ます -> くる).', 'V-辞書形 + 前に | N + の + 前に | Quy tắc 辞書形', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '寝る 前に、日記 を 書きます。', 'ねる まえに、にっき を かきます。', 'Trước khi đi ngủ tôi viết nhật ký.', 1),
        ('GRAMMAR', g_id, '食事 の 前に、手 を 洗います。', 'しょくじ の まえに、て を あらいます。', 'Trước bữa ăn tôi rửa tay.', 2);
    END IF;

    -- ==========================================
    -- BÀI 19: bổ sung Quy tắc chia Thể た & V1-たり V2-たり & Biến đổi 〜になります
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 19;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Quy tắc chia Thể た & V1-たり、V2-たり します & Biến đổi 〜になります', 'Chia thể た & Khi thì làm V1, khi thì V2 & Trở nên / Trở thành', 'Chia thể た tương tự thể て (thay て/で bằng た/だ). V1-たり V2-たり します dùng liệt kê một vài hành động đại diện. Biến đổi trạng thái: Adj-い bỏ い -> 〜くなります. Adj-な & N -> 〜になります.', 'Quy tắc Thể た | V1-た り、V2-た り します | Adj-い -> 〜くなります | Adj-な/N -> 〜になります', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '日曜日 は 買い物したり、映画 を 見たり します。', 'にちようび は かいものしたり、えいが を みたり します。', 'Chủ nhật tôi khi thì đi shopping, khi thì xem phim.', 1),
        ('GRAMMAR', g_id, '寒く なりました。 16歳 に なります。', 'さむく なりました。 じゅうろくさい に なります。', 'Trời đã trở nên lạnh. Tôi sắp sửa bước sang tuổi 16.', 2);
    END IF;

    -- ==========================================
    -- BÀI 20: bổ sung Thể thông thường trong văn thoại thân mật (だ / じゃない / だった / じゃなかった)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 20;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Thể thông thường (普通形) trong văn thoại thân mật & Chia 4 dạng N / Adj-な', 'Hội thoại thân mật bạn bè/gia đình & 4 dạng だ / じゃない / だった / じゃなかった', 'Trong văn thoại thân mật với bạn bè, gia đình, dùng thể thông thường thay cho です/ます. Bảng chia N & Adj-な: Khẳng định hiện tại (だ - lưu ý bỏ だ khi hỏi), Phủ định hiện tại (じゃない), Khẳng định quá khứ (だった), Phủ định quá khứ (じゃなかった).', 'N / Adj-な + だ / じゃない / だった / じゃなかった', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '今日 暇？ ... うん、暇だよ。 / うーん、暇じゃない。', 'きょう ひま？ ... うん、ひまだよ。 / うーん、ひまじゃない。', 'Hôm nay rảnh không? ... Ừ, rảnh chứ. / Thôi, không rảnh đâu.', 1),
        ('GRAMMAR', g_id, '昨日 雨 だった？ ... ううん、雨 じゃなかった。', 'きのう あめ だった？ ... ううん、あめ じゃなかった。', 'Hôm qua trời mưa à? ... Không, đã không mưa.', 2);
    END IF;

    -- ==========================================
    -- BÀI 21: bổ sung 〜と 言いました & たぶん & 〜でしょう？
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 21;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, '〜と 言いました & Phó từ たぶん & Câu hỏi dự đoán 〜でしょう？', '(Ai đó) đã nói rằng... & Có lẽ & Phải không / Đúng không?', 'Mẫu 〜と 言いました dùng trích dẫn câu nói của ai đó (trước と là thể thông thường hoặc nguyên văn câu nói). Phó từ たぶん (có lẽ) thường đi cùng với 〜と 思います / 〜でしょう. Mẫu 〜でしょう？ (lên giọng ở cuối) dùng xác nhận sự đồng cảm hoặc phỏng đoán.', 'Thể thông thường + と 言いました | たぶん + Thể thông thường + と思います | Thể thông thường + でしょう？', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '寝る 前に「おやすみなさい」と 言います。', 'ねる まえに「おやすみなさい」と いいます。', 'Trước khi đi ngủ ta nói "Chúc ngủ ngon".', 1),
        ('GRAMMAR', g_id, 'ミラーさん は たぶん 来る と 思います。', 'ミラーさん は たぶん くる と おもいます。', 'Tôi nghĩ anh Miller có lẽ sẽ đến.', 2),
        ('GRAMMAR', g_id, '明日 は 北海道 は 寒い でしょう？', 'あした は ほっかいどう は さむい でしょう？', 'Ngày mai ở Hokkaido chắc là lạnh lắm đúng không?', 3);
    END IF;

    -- ==========================================
    -- BÀI 22: bổ sung Mệnh đề bổ nghĩa danh từ (V-普通形 + N), Trợ từ が trong mệnh đề & Động từ trang phục
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 22;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Mệnh đề bổ nghĩa danh từ (V-普通形 + N) & Trợ từ が trong mệnh đề & Động từ trang phục', 'Bổ nghĩa cho danh từ & Trợ từ が làm chủ ngữ mệnh đề phụ & Động từ mặc/đội/đeo', 'Mệnh đề động từ thể thông thường đứng trước N để bổ nghĩa cho N. Cực kỳ quan trọng: Chủ ngữ trong mệnh đề bổ nghĩa bắt buộc dùng trợ từ が (không dùng は). Động từ trang phục: 着ています (mặc áo từ eo trở lên), はいています (mặc quần/giày từ eo trở xuống), かぶっています (đội mũ), かけています (đeo kính).', 'Mệnh đề (S が V-普通形) + N | 着ています / はいています / かぶっています / かけています', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '私 が 昨日 買った 本 は これ です。', 'わたし が きのう かった ほん は これ です。', 'Quyển sách tôi đã mua hôm qua là quyển này.', 1),
        ('GRAMMAR', g_id, '眼鏡 を かけている 人 は 田中さん です。', 'めがね を かけている ひと は たなかさん です。', 'Người đang đeo kính là anh Tanaka.', 2);
    END IF;

    -- ==========================================
    -- BÀI 23: bổ sung Cách nối とき (Nの / Adj-な / Adj-い / Vる / Vた) & Vる と (Kết quả tự nhiên)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 23;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Cách nối chi tiết với とき (Nの/Adjな/Adjい/Vる/Vた) & Vる と、〜 (Kết quả tự nhiên)', 'Khi ... (thời điểm) & Hễ / Mỗi khi ... thì (kết quả tất yếu)', 'Nối với とき: N の とき, Adj-な な とき, Adj-い とき, Vる とき (chưa làm xong) vs Vた とき (đã làm xong). Mẫu Vる と、〜 biểu thị hễ làm V thì kết quả tất yếu tự nhiên sẽ xảy ra (dùng chỉ đường, vận hành máy móc). Không dùng với ý chí, rủ rê hay mệnh lệnh.', 'N の / Adj-な な / Adj-い / Vる / Vた + とき | V-辞書形 + と、〜', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '暇な とき、テレビ を 見ます。 国 へ 帰った とき、鞄 を 買いました。', 'ひまな とき、テレビ を みます。 くに へ かえった とき、かばん を かいました。', 'Khi rảnh tôi xem tivi. Khi đã về nước tôi đã mua một cái cặp.', 1),
        ('GRAMMAR', g_id, 'この ボタン を 押す と、お釣り が 出ます。', 'この ボタン を おす と、おつり が でます。', 'Hễ nhấn nút này thì tiền thừa sẽ ra.', 2);
    END IF;

    -- ==========================================
    -- BÀI 24: bổ sung Phân biệt Cho/Nhận hành động (V-て くれます / あげます / もらいます)
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 24;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Phân biệt V-て あげます / もらいます / くれます', 'Làm cho ai / Được làm cho / Ai đó làm giúp cho mình', 'Phân biệt rõ: (1) V-て くれます: Ai đó làm việc gì giúp cho mình/người thân mình (Chủ ngữ đi với が). (2) V-て あげます: Mình làm giúp cho người khác. (3) V-て もらいます: Mình nhận được hành động giúp đỡ từ ai (Đối tượng thực hiện đi với に).', 'N1 (Người khác) が 私 に V-て くれます | 私 は N1 に V-て あげます | 私 は N1 に V-て もらいます', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, '母 が 私 に 部屋 を 掃除して くれました。', 'はは が わたし に へや を そうじして くれました。', 'Mẹ đã dọn phòng giúp cho tôi.', 1),
        ('GRAMMAR', g_id, '私 は 鈴木さん に 日本語 を 教えて もらいました。', 'わたし は すずきさん に にほんご を おしえて もらいました。', 'Tôi đã được cô Suzuki dạy tiếng Nhật cho.', 2);
    END IF;

    -- ==========================================
    -- BÀI 25: bổ sung Chia たら (V/Adj/N), Phó từ もし / いくら & 2 ý nghĩa của たら
    -- ==========================================
    SELECT lesson_id INTO les_id FROM lessons WHERE level_id = lvl_n5_id AND sort_order = 25;
    IF les_id IS NOT NULL THEN
        INSERT INTO grammar_points (lesson_id, pattern, meaning, explanation, structure, jlpt_level, sort_order, status)
        VALUES (les_id, 'Cách chia たら (V/Adj/N) & Phó từ もし / いくら & 2 Ý nghĩa của 〜たら', 'Cách chia たら & Nếu / Cho dù & 2 nghĩa: Giả định "Nếu..." / Trình tự "Sau khi..."', 'Cách chia たら: Động từ (V-た + ら), Adj-い (bỏ い + かったら), Adj-な & N (+ だったら). Phó từ: もし đi cùng với 〜たら (Giả sử nếu...), いくら đi cùng với 〜ても (Dù có... thế nào đi nữa). 2 ý nghĩa của 〜たら: (1) Giả định điều kiện "Nếu...", (2) Trình tự thời gian "Sau khi.../ Khi..." (hành động V2 thực hiện sau khi V1 hoàn tất).', 'V-たら / Adj-かったら / Adj-な・N だったら | もし 〜たら | いくら 〜ても', 'N5', 2, 'PUBLISHED')
        RETURNING grammar_id INTO g_id;
        INSERT INTO examples (content_type, content_id, japanese_text, furigana, translation_vi, sort_order)
        VALUES 
        ('GRAMMAR', g_id, 'もし 1億円 あったら、いろいろな 国 を 旅行したい です。', 'もし いちおくえん あったら、いろいろな くに を りょこうしたい です。', 'Giả sử nếu có 100 triệu Yên tôi muốn đi du lịch nhiều nước.', 1),
        ('GRAMMAR', g_id, 'いくら 考えても、わかりません。 駅 に 着いたら、電話してください。', 'いくら かんがえても、わかりません。 えき に ついたら、でんわしてください。', 'Dù có suy nghĩ thế nào cũng không hiểu. Khi đến ga xin hãy gọi điện cho tôi.', 2);
    END IF;

END $$;
