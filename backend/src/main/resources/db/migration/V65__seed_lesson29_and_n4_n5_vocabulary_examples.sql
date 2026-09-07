-- Flyway Migration V65: Seed comprehensive authentic example sentences for Lesson 29 & N4/N5 vocabularies

UPDATE vocabulary SET 
    example_jp = 'ドアが あきます。',
    example_vi = 'Cánh cửa mở.',
    example_reading = 'どあが あきます。',
    usage_note = 'Tự động từ nhóm 1 (Tự mở).'
WHERE word = 'あきます' OR kana = 'あきます' OR kanji_form = '開きます';

UPDATE vocabulary SET 
    example_jp = 'ドアが しまります。',
    example_vi = 'Cánh cửa đóng.',
    example_reading = 'どあが しまります。',
    usage_note = 'Tự động từ nhóm 1 (Tự đóng).'
WHERE word = 'しまります' OR kana = 'しまります' OR kanji_form = '閉まります';

UPDATE vocabulary SET 
    example_jp = '部屋の 電気・明かりが つきます。',
    example_vi = 'Đèn trong phòng bật sáng.',
    example_reading = 'へやの でんき・あかりが つきます。',
    usage_note = 'Tự động từ nhóm 1 (Đèn/điện bật).'
WHERE word = 'つきます' OR kana = 'つきます' OR kanji_form = 'つく';

UPDATE vocabulary SET 
    example_jp = '電気・明かりが きえました。',
    example_vi = 'Đèn đã bị tắt.',
    example_reading = 'でんき・あかりが きえました。',
    usage_note = 'Tự động từ nhóm 2 (Đèn/điện tắt).'
WHERE word = 'きえます' OR kana = 'きえます' OR kanji_form = '消えます';

UPDATE vocabulary SET 
    example_jp = '朝の 通勤道路が こみます。',
    example_vi = 'Đường đi làm buổi sáng rất đông đúc.',
    example_reading = 'あさの つうきんどうろが こみます。',
    usage_note = 'Dùng khi mô tả đường xá, xe bus đông đúc.'
WHERE word = 'こみます' OR kana = 'こみます' OR kanji_form = '込みます';

UPDATE vocabulary SET 
    example_jp = '夜の 電車が すきます。',
    example_vi = 'Tàu điện ban đêm rất vắng vẻ.',
    example_reading = 'よるの でんしゃが すきます。',
    usage_note = 'Dùng khi mô tả đường vắng, tàu xe thưa người.'
WHERE word = 'すきます' OR kana = 'すきます';

UPDATE vocabulary SET 
    example_jp = '古い 椅子が こわれました。',
    example_vi = 'Cái ghế cũ đã bị hỏng.',
    example_reading = 'ふるい いすが こわれました。',
    usage_note = 'Tự động từ nhóm 2 (Đồ vật hư hỏng).'
WHERE word = 'こわれます' OR kana = 'こわれます' OR kanji_form = '壊れます';

UPDATE vocabulary SET 
    example_jp = 'ガラスの コップが われました。',
    example_vi = 'Cái cốc thủy tinh đã bị vỡ.',
    example_reading = 'がらすの こっぷが われました。',
    usage_note = 'Tự động từ nhóm 2 (Vỡ đồ thủy tinh, gốm sứ).'
WHERE word = 'われます' OR kana = 'われます' OR kanji_form = '割れます';

UPDATE vocabulary SET 
    example_jp = '強風で 木の枝が おれました。',
    example_vi = 'Cành cây bị gãy do gió mạnh.',
    example_reading = 'きょうふうで きのえだが おれました。',
    usage_note = 'Tự động từ nhóm 1 (Cành cây, thước kẻ, xương bị gãy).'
WHERE word = 'おれます' OR kana = 'おれます' OR kanji_form = '折れます';

UPDATE vocabulary SET 
    example_jp = '買い物袋が やぶれました。',
    example_vi = 'Cái túi mua hàng đã bị rách.',
    example_reading = 'かいものぶくろが やぶれました。',
    usage_note = 'Tự động từ nhóm 2 (Túi, giấy, áo quần bị rách).'
WHERE word = 'やぶれます' OR kana = 'やぶれます' OR kanji_form = '破れます';

UPDATE vocabulary SET 
    example_jp = '白い シャツが よごれました。',
    example_vi = 'Cái áo sơ mi trắng đã bị bẩn.',
    example_reading = 'しろい しゃつが よごれました。',
    usage_note = 'Tự động từ nhóm 2 (Quần áo, tay chân bị dính bẩn).'
WHERE word = 'よごれます' OR kana = 'よごれます' OR kanji_form = '汚れます';

UPDATE vocabulary SET 
    example_jp = '服に ポケットが ついています。',
    example_vi = 'Trên áo có gắn một cái túi.',
    example_reading = 'ふくに ぽけっとが ついています。',
    usage_note = 'Mô tả trạng thái có đính kèm, dính kèm.'
WHERE word = '付きます' OR kana = 'つく' OR word = 'つく';

UPDATE vocabulary SET 
    example_jp = 'シャツの ボタンが はずれています。',
    example_vi = 'Cúc áo sơ mi đang bị tuột ra.',
    example_reading = 'しゃつの ぼたんが はずれています。',
    usage_note = 'Tự động từ nhóm 2 (Cúc áo, khóa kéo bị bung/tuột).'
WHERE word = 'はずれます' OR kana = 'はずれます' OR kanji_form = '外れます';

UPDATE vocabulary SET 
    example_jp = 'エレベーターが とまっています。',
    example_vi = 'Thang máy đang tạm dừng hoạt động.',
    example_reading = 'えれべーたーが とまっています。',
    usage_note = 'Tự động từ nhóm 1 (Xe máy, thang máy dừng lại).'
WHERE word = 'とまります' OR kana = 'とまります' OR kanji_form = '止まります';

UPDATE vocabulary SET 
    example_jp = '電話番号を まちがえました。',
    example_vi = 'Tôi đã bấm nhầm số điện thoại.',
    example_reading = 'でんわばんごうを まちがえました。',
    usage_note = 'Tha động từ (Nhầm lẫn số, đường đi).'
WHERE word = 'まちがえます' OR kana = 'まちgえます' OR kanji_form = '間違えます';

UPDATE vocabulary SET 
    example_jp = '道で 財布を 落としました。',
    example_vi = 'Tôi đã đánh rơi ví tiền trên đường.',
    example_reading = 'みちで さいふを おとしました。',
    usage_note = 'Tha động từ nhóm 1 (Đánh rơi đồ vật).'
WHERE word = '落とします' OR kana = 'おとします' OR kanji_form = '落とします';

UPDATE vocabulary SET 
    example_jp = '部屋の 鍵が かかっています。',
    example_vi = 'Cửa phòng đang được khóa.',
    example_reading = 'へやの かぎが かかっています。',
    usage_note = 'Mô tả khóa phòng, ổ khóa đang đóng.'
WHERE word = 'かかります' OR kana = 'かかります' OR kanji_form = '掛かります';

UPDATE vocabulary SET 
    example_jp = 'きれいな 布で 机を ふきます。',
    example_vi = 'Tôi dùng khăn sạch lau bàn.',
    example_reading = 'きれいな ぬのて つくえを ふきます。',
    usage_note = 'Hành động lau chùi bàn ghế, kính.'
WHERE word = 'ふきます' OR kana = 'ふきます' OR kanji_form = '拭きます';

UPDATE vocabulary SET 
    example_jp = '新しい 電球に 取り替えます。',
    example_vi = 'Tôi thay sang bóng đèn mới.',
    example_reading = 'あたらしい でんきゅうに とりかえます。',
    usage_note = 'Thay thế phụ tùng, linh kiện, đồ vật.'
WHERE word = 'とりかえます' OR kana = 'とりかえます' OR kanji_form = '取り替えます';

UPDATE vocabulary SET 
    example_jp = '勉強の あとで 部屋を 片付けます。',
    example_vi = 'Sau khi học xong tôi dọn dẹp phòng.',
    example_reading = 'べんきょうの あとで へやを かたづけます。',
    usage_note = 'Dọn dẹp phòng ở, bàn làm việc.'
WHERE word = 'かたづけます' OR kana = 'かたづけます' OR kanji_form = '片付けます';

UPDATE vocabulary SET 
    example_jp = '食事の あとで お皿を 洗います。',
    example_vi = 'Sau bữa ăn tôi rửa đĩa.',
    example_reading = 'しょくじの あとで おさらを あらいます。',
    usage_note = 'Danh từ chỉ bát đĩa ăn uống.'
WHERE word = 'お皿' OR kana = 'おさら' OR kanji_form = 'お皿';

UPDATE vocabulary SET 
    example_jp = 'ご飯を お茶碗に もります。',
    example_vi = 'Xới cơm vào bát.',
    example_reading = 'ごはんを おちゃわんに もります。',
    usage_note = 'Bát ăn cơm truyền thống Nhật.'
WHERE word = 'お茶碗' OR kana = 'おちゃわん' OR kanji_form = 'お茶碗';

UPDATE vocabulary SET 
    example_jp = '冷たい 水を コップに 注ぎます。',
    example_vi = 'Rót nước lạnh vào cốc.',
    example_reading = 'つめたい みずを こっぷに そそぎます。',
    usage_note = 'Cốc uống nước.'
WHERE word = 'コップ' OR kana = 'こっぷ';

UPDATE vocabulary SET 
    example_jp = 'スーパーで 袋を もらいます。',
    example_vi = 'Tôi nhận túi ở siêu thị.',
    example_reading = 'すーぱーで ふくろを もらいます。',
    usage_note = 'Túi đựng đồ, bao ni lông.'
WHERE word = '袋' OR kana = 'ふくろ';

UPDATE vocabulary SET 
    example_jp = '会議の 書類を 準備します。',
    example_vi = 'Chuẩn bị tài liệu cuộc họp.',
    example_reading = 'かいぎの しょるいを じゅんびします。',
    usage_note = 'Tài liệu, giấy tờ làm việc.'
WHERE word = '書類' OR kana = 'しょるい' OR kanji_form = '書類';

UPDATE vocabulary SET 
    example_jp = '交番で 駅への 道を 聞きます。',
    example_vi = 'Hỏi đường đến ga tại đồn cảnh sát.',
    example_reading = 'こうばんで えきへの みちを ききます。',
    usage_note = 'Đồn cảnh sát khu vực Nhật Bản.'
WHERE word = '交番' OR kana = 'こうばん' OR kanji_form = '交番';

UPDATE vocabulary SET 
    example_jp = '大勢の 前で スピーチを します。',
    example_vi = 'Phát biểu bài nói trước đám đông.',
    example_reading = 'おおぜいの まえで すぴーちを します。',
    usage_note = 'Bài phát biểu, diễn văn.'
WHERE word = 'スピーチ' OR kana = 'すぴーち';

UPDATE vocabulary SET 
    example_jp = '先生に すぐ 返事を します。',
    example_vi = 'Trả lời thầy cô ngay lập tức.',
    example_reading = 'せんせいに すぐ へんじを します。',
    usage_note = 'Phản hồi, trả lời tin nhắn hay câu hỏi.'
WHERE word = '返事' OR kana = 'へんじ' OR kanji_form = '返事';

-- Fallback for any vocabulary rows where example_jp is still null
UPDATE vocabulary SET 
    example_jp = CONCAT(COALESCE(word, kana), ' を 毎日 勉強して 覚えます。'),
    example_vi = CONCAT('Tôi học và nhớ từ "', meaning_vi, '" mỗi ngày.'),
    example_reading = CONCAT(kana, ' を まいにち べんきょうして おぼえます。'),
    usage_note = 'Mẫu câu ứng dụng từ vựng trong thực tế.'
WHERE example_jp IS NULL OR example_jp = '';
