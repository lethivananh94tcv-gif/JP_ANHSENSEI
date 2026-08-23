-- V33: Seed Complete 20 Kanji N5 Textbook Lessons (第1課 - 第20課) with Full Topic Items & Exercises

-- 1. Seed All 20 Kanji N5 Topics (第1課 đến 第20課)
INSERT INTO kanji_topics (topic_id, title, jlpt_level, topic_order, description) VALUES
(1, '第１課', 'N5', 1, 'Chữ Hán chỉ Số đếm (1 đến 7) - NHẤT, NHỊ, TAM, TỨ, NGŨ, LỤC, THẤT'),
(2, '第２課', 'N5', 2, 'Chữ Hán chỉ Số đếm & Tiền tệ - BÁT, CỬU, THẬP, BÁCH, THIÊN, VẠN, VIÊN'),
(3, '第３課', 'N5', 3, 'Chữ Hán chỉ Thứ & Tự nhiên - NHẬT, NGUYỆT, HỎA, THỦY, MỘC, KIM, THỔ'),
(4, '第４課', 'N5', 4, 'Chữ Hán chỉ Con người & Học tập - NHÂN, TIÊN, SINH, HỌC, PHƯƠNG, HÀ'),
(5, '第５課', 'N5', 5, 'Chữ Hán chỉ Thời gian & Đơn vị - KIM, PHÂN, BÁN, THỜI, NIÊN, BẢN'),
(6, '第６課', 'N5', 6, 'Chữ Hán chỉ Hành động & Di chuyển - HƯU, QUY, HÀNH, LAI, HIỆU, XA'),
(7, '第７課', 'N5', 7, 'Chữ Hán chỉ Đọc, Viết, Ăn, Uống - THƯ, THỰC, ẨM, KIẾN, VĂN, TÂN'),
(8, '第８課', 'N5', 8, 'Chữ Hán chỉ Thực phẩm & Động thực vật - NHỤC, NGƯ, VẬT, TRÀ, NGƯU, HOA'),
(9, '第９課', 'N5', 9, 'Chữ Hán chỉ Mua, Đọc, Tay, Thời gian - MẠI, ĐỘC, THỦ, THIỂU, GIAN, NỘI'),
(10, '第10課', 'N5', 10, 'Chữ Hán chỉ Địa hình & Điện khí - ĐIỀN, ĐINH, ĐIỆN, KHÍ, SƠN, XUYÊN'),
(11, '第11課', 'N5', 11, 'Bài Kiểm Tra Tổng Hợp テスト (Bài 1 - Bài 10)'),
(12, '第12課', 'N5', 12, 'Chữ Hán chỉ Vị trí & Phương hướng - TRUNG, NGOẠI, HẠ, THƯỢNG, TẢ, HỮU'),
(13, '第13課', 'N5', 13, 'Chữ Hán chỉ Tính chất & Kích thước - ĐẠI, TIỂU, CỔ, CAO, AN, ĐA'),
(14, '第14課', 'N5', 14, 'Chữ Hán chỉ Gia đình & Mối quan hệ - NAM, NỮ, TỬ, PHỤ, MẪU, HỮU'),
(15, '第15課', 'N5', 15, 'Chữ Hán chỉ Tên, Âm thanh, Chữ viết - DANH, ÂM, TỰ, VŨ, TỰ, MỄ'),
(16, '第16課', 'N5', 16, 'Chữ Hán chỉ Ra, Vào, Đứng, Nói - XUẤT, NHẬP, LẬP, NGÔN, THOẠI, LỰC'),
(17, '第17課', 'N5', 17, 'Chữ Hán chỉ Tính cách & Trạng thái - TRƯỜNG, MINH, ÁM, NGUYÊN, HẢO, TÚC'),
(18, '第18課', 'N5', 18, 'Chữ Hán chỉ Phương hướng & Tự nhiên - ĐÔNG, TÂY, NAM, BẮC, TỊCH, THẠCH'),
(19, '第19課', 'N5', 19, 'Chữ Hán chỉ Bộ phận cơ thể & Động vật - THỂ, MỤC, NHĨ, KHẨU, ĐIỂU, KHUYỂN'),
(20, '第20課', 'N5', 20, 'Chữ Hán chỉ Cây cối, Thiên nhiên & Nhà cửa - TRÚC, BỐI, LÂM, SÂM, HÀN, MÔN, NHAM')
ON CONFLICT (topic_id) DO UPDATE SET 
    title = EXCLUDED.title, 
    jlpt_level = EXCLUDED.jlpt_level, 
    topic_order = EXCLUDED.topic_order, 
    description = EXCLUDED.description;

SELECT setval('kanji_topics_topic_id_seq', (SELECT MAX(topic_id) FROM kanji_topics));

-- 2. Seed All Kanji Entries into 'kanji' Table
INSERT INTO kanji (character, onyomi, kunyomi, meaning_vi, stroke_count, radical, jlpt_level, status) VALUES
-- Bài 1
('一', 'イチ', 'ひと', 'NHẤT', 1, '一', 'N5', 'PUBLISHED'),
('二', 'ニ', 'ふた', 'NHỊ', 2, '二', 'N5', 'PUBLISHED'),
('三', 'サン', 'みっ', 'TAM', 3, '一', 'N5', 'PUBLISHED'),
('四', 'シ', 'よん、よっ、よ', 'TỨ', 5, '囗', 'N5', 'PUBLISHED'),
('五', 'ゴ', 'いつ', 'NGŨ', 4, '二', 'N5', 'PUBLISHED'),
('六', 'ロク', 'むい、むっ', 'LỤC', 4, '八', 'N5', 'PUBLISHED'),
('七', 'シチ', 'なの、なな', 'THẤT', 2, '一', 'N5', 'PUBLISHED'),

-- Bài 2
('八', 'ハチ', 'やっ、よう', 'BÁT', 2, '八', 'N5', 'PUBLISHED'),
('九', 'キュウ、ク', 'ここの', 'CỬU', 2, '乙', 'N5', 'PUBLISHED'),
('十', 'ジュウ、ジッ', 'とお', 'THẬP', 2, '十', 'N5', 'PUBLISHED'),
('百', 'ヒャク', '—', 'BÁCH', 6, '白', 'N5', 'PUBLISHED'),
('千', 'セン', '—', 'THIÊN', 3, '十', 'N5', 'PUBLISHED'),
('万', 'マン、バン', '—', 'VẠN', 3, '一', 'N5', 'PUBLISHED'),
('円', 'エン', '—', 'VIÊN', 4, '囗', 'N5', 'PUBLISHED'),

-- Bài 3
('日', 'ニチ、ジツ', 'ひ、び、か', 'NHẬT', 4, '日', 'N5', 'PUBLISHED'),
('月', 'ゲツ、ガツ', 'つき', 'NGUYỆT', 4, '月', 'N5', 'PUBLISHED'),
('火', 'カ', 'ひ', 'HỎA', 4, '火', 'N5', 'PUBLISHED'),
('水', 'スイ', 'みず', 'THỦY', 4, '水', 'N5', 'PUBLISHED'),
('木', 'ボク、モク', 'き', 'MỘC', 4, '木', 'N5', 'PUBLISHED'),
('金', 'キン', 'かね', 'KIM', 8, '金', 'N5', 'PUBLISHED'),
('土', 'ド', 'つち', 'THỔ', 3, '土', 'N5', 'PUBLISHED'),

-- Bài 4
('人', 'ジン、ニン', 'ひと', 'NHÂN', 2, '人', 'N5', 'PUBLISHED'),
('先', 'セン', 'さき', 'TIÊN', 6, '儿', 'N5', 'PUBLISHED'),
('生', 'セイ、ショウ', 'い、う', 'SINH', 5, '生', 'N5', 'PUBLISHED'),
('学', 'ガク', 'まな', 'HỌC', 8, '子', 'N5', 'PUBLISHED'),
('方', 'ホウ', 'かた', 'PHƯƠNG', 4, '方', 'N5', 'PUBLISHED'),
('何', 'カ', 'なに、なん', 'HÀ', 7, '人', 'N5', 'PUBLISHED'),

-- Bài 5
('今', 'コン', 'いま', 'KIM', 4, '人', 'N5', 'PUBLISHED'),
('分', 'フン、ブン、プン', 'わ', 'PHÂN', 4, '刀', 'N5', 'PUBLISHED'),
('半', 'ハン', '—', 'BÁN', 5, '十', 'N5', 'PUBLISHED'),
('時', 'ジ', 'とき', 'THỜI', 10, '日', 'N5', 'PUBLISHED'),
('年', 'ネン', 'とし', 'NIÊN', 6, '干', 'N5', 'PUBLISHED'),
('本', 'ホン', 'もと', 'BẢN', 5, '木', 'N5', 'PUBLISHED'),

-- Bài 6
('休', 'キュウ', 'やす', 'HƯU', 6, '人', 'N5', 'PUBLISHED'),
('帰', 'キ', 'かえ', 'QUY', 10, '巾', 'N5', 'PUBLISHED'),
('行', 'コウ、ギョウ', 'い、おこな', 'HÀNH', 6, '行', 'N5', 'PUBLISHED'),
('来', 'ライ', 'き、く', 'LAI', 7, '木', 'N5', 'PUBLISHED'),
('校', 'コウ', '—', 'HIỆU', 10, '木', 'N5', 'PUBLISHED'),
('車', 'シャ', 'くるま', 'XA', 7, '車', 'N5', 'PUBLISHED'),

-- Bài 7
('書', 'ショ', 'か', 'THƯ', 10, '曰', 'N5', 'PUBLISHED'),
('食', 'ショク', 'た', 'THỰC', 9, '食', 'N5', 'PUBLISHED'),
('飲', 'イン', 'の', 'ẨM', 12, '食', 'N5', 'PUBLISHED'),
('見', 'ケン', 'み', 'KIẾN', 7, '見', 'N5', 'PUBLISHED'),
('聞', 'ブン', 'き', 'VĂN', 14, '耳', 'N5', 'PUBLISHED'),
('新', 'シン', 'あたら', 'TÂN', 13, '斤', 'N5', 'PUBLISHED'),

-- Bài 8
('肉', 'ニク', '—', 'NHỤC', 6, '肉', 'N5', 'PUBLISHED'),
('魚', 'ギョ', 'うお、さかな', 'NGƯ', 11, '魚', 'N5', 'PUBLISHED'),
('物', 'ブツ、モツ', 'もの', 'VẬT', 8, '牛', 'N5', 'PUBLISHED'),
('茶', 'チャ、サ', '—', 'TRÀ', 9, '艸', 'N5', 'PUBLISHED'),
('牛', 'ギュウ', 'うし', 'NGƯU', 4, '牛', 'N5', 'PUBLISHED'),
('花', 'カ', 'はな', 'HOA', 7, '艸', 'N5', 'PUBLISHED'),

-- Bài 9
('買', 'バイ', 'か', 'MẠI', 12, '貝', 'N5', 'PUBLISHED'),
('読', 'ドク', 'よ', 'ĐỘC', 14, '言', 'N5', 'PUBLISHED'),
('手', 'シュ、ズ', 'て、た', 'THỦ', 4, '手', 'N5', 'PUBLISHED'),
('少', 'ショウ', 'すく、すこ', 'THIỂU', 4, '小', 'N5', 'PUBLISHED'),
('間', 'カン', 'あいだ、ま', 'GIAN', 12, '門', 'N5', 'PUBLISHED'),
('内', 'ナイ', 'うち', 'NỘI', 4, '冂', 'N5', 'PUBLISHED'),

-- Bài 10
('田', 'デン', 'た', 'ĐIỀN', 5, '田', 'N5', 'PUBLISHED'),
('町', 'チョウ', 'まち', 'ĐINH', 7, '田', 'N5', 'PUBLISHED'),
('電', 'デン', '—', 'ĐIỆN', 13, '雨', 'N5', 'PUBLISHED'),
('気', 'キ', '—', 'KHÍ', 6, '气', 'N5', 'PUBLISHED'),
('山', 'サン', 'やま', 'SƠN', 3, '山', 'N5', 'PUBLISHED'),
('川', 'セン', 'かわ', 'XUYÊN', 3, '川', 'N5', 'PUBLISHED'),

-- Bài 12
('中', 'チュウ、ジュウ', 'なか', 'TRUNG', 4, '丨', 'N5', 'PUBLISHED'),
('外', 'ガイ', 'そと、はず', 'NGOẠI', 5, '夕', 'N5', 'PUBLISHED'),
('下', 'カ、ゲ', 'した、さ、お', 'HẠ', 3, '一', 'N5', 'PUBLISHED'),
('上', 'ジョウ', 'うえ、あ、のぼ', 'THƯỢNG', 3, '一', 'N5', 'PUBLISHED'),
('左', 'サ', 'ひだり', 'TẢ', 5, '工', 'N5', 'PUBLISHED'),
('右', 'ウ', 'みぎ', 'HỮU', 5, '口', 'N5', 'PUBLISHED'),

-- Bài 13
('大', 'ダイ、タイ', 'おお', 'ĐẠI', 3, '大', 'N5', 'PUBLISHED'),
('小', 'ショウ', 'ちい、こ', 'TIỂU', 3, '小', 'N5', 'PUBLISHED'),
('古', 'コ', 'ふる', 'CỔ', 5, '口', 'N5', 'PUBLISHED'),
('高', 'コウ', 'たか', 'CAO', 10, '高', 'N5', 'PUBLISHED'),
('安', 'アン', 'やす', 'AN', 6, '宀', 'N5', 'PUBLISHED'),
('多', 'タ', 'おお', 'ĐA', 6, '夕', 'N5', 'PUBLISHED'),

-- Bài 14
('男', 'ダン', 'おとこ', 'NAM', 7, '田', 'N5', 'PUBLISHED'),
('女', 'ジョ', 'おんな', 'NỮ', 3, '女', 'N5', 'PUBLISHED'),
('子', 'シ、ス', 'こ、ご', 'TỬ', 3, '子', 'N5', 'PUBLISHED'),
('父', 'フ', 'ちち', 'PHỤ', 4, '父', 'N5', 'PUBLISHED'),
('母', 'ボ', 'はは', 'MẪU', 5, '母', 'N5', 'PUBLISHED'),
('友', 'ユウ', 'とも', 'HỮU', 4, '又', 'N5', 'PUBLISHED'),

-- Bài 15
('名', 'メイ、ミョウ', 'な', 'DANH', 6, '口', 'N5', 'PUBLISHED'),
('音', 'オン', 'おと、ね', 'ÂM', 9, '音', 'N5', 'PUBLISHED'),
('字', 'ジ', '—', 'TỰ', 6, '子', 'N5', 'PUBLISHED'),
('雨', 'ウ', 'あめ', 'VŨ', 8, '雨', 'N5', 'PUBLISHED'),
('寺', 'ジ', 'てら', 'TỰ', 6, '寸', 'N5', 'PUBLISHED'),
('米', 'マイ', 'こめ', 'MỄ', 6, '米', 'N5', 'PUBLISHED'),

-- Bài 16
('出', 'シュツ', 'で、だ', 'XUẤT', 5, '凵', 'N5', 'PUBLISHED'),
('入', 'ニュウ', 'はい、い', 'NHẬP', 2, '入', 'N5', 'PUBLISHED'),
('立', 'リツ', 'た', 'LẬP', 5, '立', 'N5', 'PUBLISHED'),
('言', 'ゲン、ゴン', 'い、こと', 'NGÔN', 7, '言', 'N5', 'PUBLISHED'),
('話', 'ワ', 'はな、はなし', 'THOẠI', 13, '言', 'N5', 'PUBLISHED'),
('力', 'リョク', 'ちから', 'LỰC', 2, '力', 'N5', 'PUBLISHED'),

-- Bài 17
('長', 'チョウ', 'なが', 'TRƯỜNG', 8, '長', 'N5', 'PUBLISHED'),
('明', 'メイ', 'あか、あ', 'MINH', 8, '日', 'N5', 'PUBLISHED'),
('暗', 'アン', 'くら', 'ÁM', 13, '日', 'N5', 'PUBLISHED'),
('元', 'ゲン、ガン', 'もと', 'NGUYÊN', 4, '儿', 'N5', 'PUBLISHED'),
('好', 'コウ', 'す', 'HẢO', 6, '女', 'N5', 'PUBLISHED'),
('足', 'ソク', 'あし、た', 'TÚC', 7, '足', 'N5', 'PUBLISHED'),

-- Bài 18
('東', 'トウ', 'ひがし', 'ĐÔNG', 8, '木', 'N5', 'PUBLISHED'),
('西', 'セイ', 'にし', 'TÂY', 6, '襾', 'N5', 'PUBLISHED'),
('南', 'ナン', 'みなみ', 'NAM', 9, '十', 'N5', 'PUBLISHED'),
('北', 'ホク', 'きた', 'BẮC', 5, '匕', 'N5', 'PUBLISHED'),
('夕', 'ユウ', '—', 'TỊCH', 3, '夕', 'N5', 'PUBLISHED'),
('石', 'セキ', 'いし', 'THẠCH', 5, '石', 'N5', 'PUBLISHED'),

-- Bài 19
('体', 'タイ', 'からだ', 'THỂ', 7, '人', 'N5', 'PUBLISHED'),
('目', 'モク', 'め', 'MỤC', 5, '目', 'N5', 'PUBLISHED'),
('耳', 'ジ', 'みみ', 'NHĨ', 6, '耳', 'N5', 'PUBLISHED'),
('口', 'コウ', 'くち', 'KHẨU', 3, '口', 'N5', 'PUBLISHED'),
('鳥', 'チョウ', 'とり', 'ĐIỂU', 11, '鳥', 'N5', 'PUBLISHED'),
('犬', 'ケン', 'いぬ', 'KHUYỂN', 4, '犬', 'N5', 'PUBLISHED'),

-- Bài 20
('竹', 'チク', 'たけ', 'TRÚC', 6, '竹', 'N5', 'PUBLISHED'),
('貝', 'バイ', 'かい', 'BỐI', 7, '貝', 'N5', 'PUBLISHED'),
('林', 'リン', 'はやし', 'LÂM', 6, '木', 'N5', 'PUBLISHED'),
('森', 'シン', 'もり', 'SÂM', 12, '木', 'N5', 'PUBLISHED'),
('畑', '—', 'はたけ', 'HÀN', 9, '田', 'N5', 'PUBLISHED'),
('門', 'モン', '—', 'MÔN', 8, '門', 'N5', 'PUBLISHED'),
('岩', 'ガン', 'いわ', 'NHAM', 8, '山', 'N5', 'PUBLISHED')
ON CONFLICT (character) DO UPDATE SET 
    onyomi = EXCLUDED.onyomi, 
    kunyomi = EXCLUDED.kunyomi, 
    meaning_vi = EXCLUDED.meaning_vi, 
    stroke_count = EXCLUDED.stroke_count,
    status = 'PUBLISHED';

-- 3. Seed Topic Items for ALL Lessons (1 to 20)
-- Bài 1 (一, 二, 三, 四, 五, 六, 七)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 1, k.kanji_id, 
  CASE k.character WHEN '一' THEN 1 WHEN '二' THEN 2 WHEN '三' THEN 3 WHEN '四' THEN 4 WHEN '五' THEN 5 WHEN '六' THEN 6 WHEN '七' THEN 7 END,
  CASE k.character 
    WHEN '一' THEN '一人(ひとり), 一つ(ひとつ), ※一日(ついたち)'
    WHEN '二' THEN '二つ(ふたつ), 二人(ふたり), ※二日(ふつか)'
    WHEN '三' THEN '三日(みっか), 三つ(みっつ)'
    WHEN '四' THEN '四(よん), 四日(よっか), 四つ(よっつ)'
    WHEN '五' THEN '五つ(いつつ), 五日(いつか)'
    WHEN '六' THEN '六日(むいか), 六つ(むっつ)'
    WHEN '七' THEN '七日(なのか), 七つ(ななつ)'
  END,
  CASE k.character 
    WHEN '一' THEN '一(いち), 一生懸命(いっしょうけんめい)'
    WHEN '二' THEN '二(に), 二次会(にじかい)'
    WHEN '三' THEN '三(さん), 三月(さんがつ)'
    WHEN '四' THEN '四月(しがつ)'
    WHEN '五' THEN '五(ご)'
    WHEN '六' THEN '六(ろく)'
    WHEN '七' THEN '七月(しちがつ)'
  END,
  CASE k.character 
    WHEN '一' THEN 'hitori, hitotsu, tsuitachi, ichi, isshoukenmei'
    WHEN '二' THEN 'futatsu, futari, futsuka, ni, nijikai'
    WHEN '三' THEN 'mikka, mittsu, san, sangatsu'
    WHEN '四' THEN 'yon, yokka, yottsu, shigatsu, shi'
    WHEN '五' THEN 'itsutsu, itsuka, go'
    WHEN '六' THEN 'muika, muttsu, roku'
    WHEN '七' THEN 'nanoka, nanatsu, shichigatsu, shichi, nana'
  END
FROM kanji k WHERE k.character IN ('一', '二', '三', '四', '五', '六', '七')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 2 (八, 九, 十, 百, 千, 万, 円)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 2, k.kanji_id, 
  CASE k.character WHEN '八' THEN 1 WHEN '九' THEN 2 WHEN '十' THEN 3 WHEN '百' THEN 4 WHEN '千' THEN 5 WHEN '万' THEN 6 WHEN '円' THEN 7 END,
  CASE k.character 
    WHEN '八' THEN '八日(ようか), 八つ(やっつ)'
    WHEN '九' THEN '九日(ここのか), 九つ(ここのつ)'
    WHEN '十' THEN '十日(とおか), 十(とお)'
    WHEN '百' THEN '—'
    WHEN '千' THEN '—'
    WHEN '万' THEN '—'
    WHEN '円' THEN '—'
  END,
  CASE k.character 
    WHEN '八' THEN '八(はち)'
    WHEN '九' THEN '九月(くがつ), 九(きゅう)'
    WHEN '十' THEN '十(じゅう), 十分(じゅうぶん)'
    WHEN '百' THEN '百(ひゃく), 二百(にひゃく), 三百(さんびゃく)'
    WHEN '千' THEN '千(せん), 二千(にせん), 三千(さんぜん)'
    WHEN '万' THEN '万(まん), 千万(せんまん)'
    WHEN '円' THEN '円(えん), 五円(ごえん)'
  END,
  CASE k.character 
    WHEN '八' THEN 'youka, yattsu, hachi'
    WHEN '九' THEN 'kokonoka, kokonotsu, kugatsu, kyuu'
    WHEN '十' THEN 'tooka, too, juuu, juubun'
    WHEN '百' THEN 'hyaku, nihyaku, sanbyaku'
    WHEN '千' THEN 'sen, nisen, sanzen'
    WHEN '万' THEN 'man, senman'
    WHEN '円' THEN 'en, goen'
  END
FROM kanji k WHERE k.character IN ('八', '九', '十', '百', '千', '万', '円')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 3 (日, 月, 火, 水, 木, 金, 土)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 3, k.kanji_id, 
  CASE k.character WHEN '日' THEN 1 WHEN '月' THEN 2 WHEN '火' THEN 3 WHEN '水' THEN 4 WHEN '木' THEN 5 WHEN '金' THEN 6 WHEN '土' THEN 7 END,
  CASE k.character 
    WHEN '日' THEN '日(ひ), 母の日(ははのひ)'
    WHEN '月' THEN '月(つき)'
    WHEN '火' THEN '火(ひ), 花火(はなび)'
    WHEN '水' THEN '水(みず)'
    WHEN '木' THEN '木(き)'
    WHEN '金' THEN 'お金(おかね)'
    WHEN '土' THEN '土(つち)'
  END,
  CASE k.character 
    WHEN '日' THEN '月曜日(げつようび), 日本(にほん), 毎日(まいにち)'
    WHEN '月' THEN '月曜日(げつようび), 今月(こんげつ), 来月(らいげつ)'
    WHEN '火' THEN '火曜日(かようび), 火事(かじ)'
    WHEN '水' THEN '水曜日(すいようび), 水道(すいどう)'
    WHEN '木' THEN '木曜日(もくようび)'
    WHEN '金' THEN '金曜日(きんようび), 現金(げんきん)'
    WHEN '土' THEN '土曜日(どようび), お土産(おみやげ)'
  END,
  CASE k.character 
    WHEN '日' THEN 'hi, hahanohi, nihon, mainichi, getsuyoubi'
    WHEN '月' THEN 'tsuki, getsuyoubi, kongetsu, raigetsu'
    WHEN '火' THEN 'hi, hanabi, kayoubi, kaji'
    WHEN '水' THEN 'mizu, suiyoubi, suidou'
    WHEN '木' THEN 'ki, mokuyoubi'
    WHEN '金' THEN 'okane, kinyoubi, genkin'
    WHEN '土' THEN 'tsuchi, doyoudi, omiyage'
  END
FROM kanji k WHERE k.character IN ('日', '月', '火', '水', '木', '金', '土')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 4 (人, 先, 生, 学, 方, 何)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 4, k.kanji_id, 
  CASE k.character WHEN '人' THEN 1 WHEN '先' THEN 2 WHEN '生' THEN 3 WHEN '学' THEN 4 WHEN '方' THEN 5 WHEN '何' THEN 6 END,
  CASE k.character 
    WHEN '人' THEN 'あの人(あのひと), 一人(ひとり)'
    WHEN '先' THEN 'お先に(おさきに)'
    WHEN '生' THEN '生ける(いける), 生まれる(うまれる)'
    WHEN '学' THEN '—'
    WHEN '方' THEN 'あの方(あのかた), 読み方(よみかた)'
    WHEN '何' THEN '何(なに), 何(なん)'
  END,
  CASE k.character 
    WHEN '人' THEN '日本人(にほんじん), ご主人(ごしゅじん), 人口(じんこう)'
    WHEN '先' THEN '先生(せんせい), 先週(せんしゅう), 先月(せんげつ)'
    WHEN '生' THEN '学生(がくせい), 先生(せんせい), 誕生日(たんじょうび)'
    WHEN '学' THEN '学生(がくせい), 大学(だいがく), 学校(がっこう)'
    WHEN '方' THEN '一方(いっぽう), 方法(ほうほう)'
    WHEN '何' THEN '何歳(なんさい), 何時(なんじ), 何分(なんぷん)'
  END,
  CASE k.character 
    WHEN '人' THEN 'anohito, hitori, nihonjin, goshujin, jinkou'
    WHEN '先' THEN 'osakini, sensei, senshuu, sengetsu'
    WHEN '生' THEN 'ikeru, umareru, gakusei, sensei, tanjoubi'
    WHEN '学' THEN 'gakusei, daigaku, gakkou'
    WHEN '方' THEN 'anokata, yomikata, ippou, houhou'
    WHEN '何' THEN 'nani, nan, nansai, nanji, nanpun'
  END
FROM kanji k WHERE k.character IN ('人', '先', '生', '学', '方', '何')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 5 (今, 分, 半, 時, 年, 本)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 5, k.kanji_id, 
  CASE k.character WHEN '今' THEN 1 WHEN '分' THEN 2 WHEN '半' THEN 3 WHEN '時' THEN 4 WHEN '年' THEN 5 WHEN '本' THEN 6 END,
  CASE k.character 
    WHEN '今' THEN '今(いま), たった今(たったいま)'
    WHEN '分' THEN '分ける(わける), 分かる(わかる)'
    WHEN '半' THEN '—'
    WHEN '時' THEN 'とき(とき)'
    WHEN '年' THEN 'とし(とし)'
    WHEN '本' THEN 'もと(もと)'
  END,
  CASE k.character 
    WHEN '今' THEN '今晩(こんばん), 今週(こんしゅう), 今月(こんげつ)'
    WHEN '分' THEN '何分(なんぷん), 自分(じぶん), 十分(じゅっぷん)'
    WHEN '半' THEN '半分(はんぶん), 半年(はんとし), 三時半(さんじはん)'
    WHEN '時' THEN '時計(とけい), 時間(じかん), 何時(なんじ)'
    WHEN '年' THEN '来年(らいねん), 去年(きょねん), 一年(いちねん)'
    WHEN '本' THEN '日本(にほん), 本(ほん), 日本語(にほんご)'
  END,
  CASE k.character 
    WHEN '今' THEN 'ima, konban, konshuu, kongetsu'
    WHEN '分' THEN 'wakeru, wakaru, nanpun, jibun, juuppun'
    WHEN '半' THEN 'hanbun, hantoshi, sanjihan'
    WHEN '時' THEN 'toki, tokei, jikan, nanji'
    WHEN '年' THEN 'toshi, rainen, kyonen, ichinen'
    WHEN '本' THEN 'moto, nihon, hon, nihongo'
  END
FROM kanji k WHERE k.character IN ('今', '分', '半', '時', '年', '本')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 6 (休, 帰, 行, 来, 校, 車)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 6, k.kanji_id, 
  CASE k.character WHEN '休' THEN 1 WHEN '帰' THEN 2 WHEN '行' THEN 3 WHEN '来' THEN 4 WHEN '校' THEN 5 WHEN '車' THEN 6 END,
  CASE k.character 
    WHEN '休' THEN '休み(やすみ), 昼休み(ひるやすみ)'
    WHEN '帰' THEN '帰ります(かえります)'
    WHEN '行' THEN '行きます(いきます)'
    WHEN '来' THEN '来ます(きます)'
    WHEN '校' THEN '—'
    WHEN '車' THEN '車(くるま)'
  END,
  CASE k.character 
    WHEN '休' THEN '休憩(きゅうけい), 連休(れんきゅう)'
    WHEN '帰' THEN '帰国(きこく)'
    WHEN '行' THEN '銀行(ぎんこう), 飛行機(ひこうき)'
    WHEN '来' THEN '来週(らいしゅう), 来年(らいねん)'
    WHEN '校' THEN '学校(がっこう), 高校(こうこう)'
    WHEN '車' THEN '電車(でんしゃ), 自転車(じてんしゃ)'
  END,
  CASE k.character 
    WHEN '休' THEN 'yasumi, hiruyasumi, kyuukei'
    WHEN '帰' THEN 'kaerimasu, kikoku'
    WHEN '行' THEN 'ikimasu, ginkou, hikouki'
    WHEN '来' THEN 'kimasu, raishuu, rainen'
    WHEN '校' THEN 'gakkou, koukou'
    WHEN '車' THEN 'kuruma, densha, jitensha'
  END
FROM kanji k WHERE k.character IN ('休', '帰', '行', '来', '校', '車')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 7 (書, 食, 飲, 見, 聞, 新)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 7, k.kanji_id, 
  CASE k.character WHEN '書' THEN 1 WHEN '食' THEN 2 WHEN '飲' THEN 3 WHEN '見' THEN 4 WHEN '聞' THEN 5 WHEN '新' THEN 6 END,
  CASE k.character 
    WHEN '書' THEN '書きます(かきます)'
    WHEN '食' THEN '食べます(たべます), 食べ物(たべもの)'
    WHEN '飲' THEN '飲みます(のみます), 飲み物(のみもの)'
    WHEN '見' THEN '見ます(みます), お花見(おはなみ)'
    WHEN '聞' THEN '聞きます(ききます)'
    WHEN '新' THEN '新しい(あたらしい)'
  END,
  CASE k.character 
    WHEN '書' THEN '辞書(じしょ), 図書館(としょかん)'
    WHEN '食' THEN '食堂(しょくどう), 食事(しょくじ)'
    WHEN '飲' THEN '飲食店(いんしょくてん)'
    WHEN '見' THEN '見学(けんがく), 意見(いけん)'
    WHEN '聞' THEN '新聞(しんぶん)'
    WHEN '新' THEN '新幹線(しんかんせん)'
  END,
  CASE k.character 
    WHEN '書' THEN 'kakimasu, jisho, toshokan'
    WHEN '食' THEN 'tabemasu, tabemono, shokudou'
    WHEN '飲' THEN 'nomimasu, nomimono'
    WHEN '見' THEN 'mimasu, ohanami, kengaku'
    WHEN '聞' THEN 'kikimasu, shinbun'
    WHEN '新' THEN 'atarashii, shinkansen'
  END
FROM kanji k WHERE k.character IN ('書', '食', '飲', '見', '聞', '新')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 8 (肉, 魚, 物, 茶, 牛, 花)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 8, k.kanji_id, 
  CASE k.character WHEN '肉' THEN 1 WHEN '魚' THEN 2 WHEN '物' THEN 3 WHEN '茶' THEN 4 WHEN '牛' THEN 5 WHEN '花' THEN 6 END,
  CASE k.character 
    WHEN '肉' THEN '—'
    WHEN '魚' THEN '魚(さかな)'
    WHEN '物' THEN '物(もの), 買い物(かいもの)'
    WHEN '茶' THEN '—'
    WHEN '牛' THEN '牛(うし)'
    WHEN '花' THEN '花(はな), 花火(はなび)'
  END,
  CASE k.character 
    WHEN '肉' THEN '肉(にく), 牛肉(ぎゅうにく)'
    WHEN '魚' THEN '—'
    WHEN '物' THEN '荷物(にもつ), 動物(どうぶつ)'
    WHEN '茶' THEN 'お茶(おちゃ), 紅茶(こうちゃ)'
    WHEN '牛' THEN '牛乳(ぎゅうにゅう)'
    WHEN '花' THEN '—'
  END,
  CASE k.character 
    WHEN '肉' THEN 'niku, gyuuniku'
    WHEN '魚' THEN 'sakana'
    WHEN '物' THEN 'mono, kaimono, nimotsu'
    WHEN '茶' THEN 'ocha, koucha'
    WHEN '牛' THEN 'ushi, gyuunyuu'
    WHEN '花' THEN 'hana, hanabi'
  END
FROM kanji k WHERE k.character IN ('肉', '魚', '物', '茶', '牛', '花')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 9 (買, 読, 手, 少, 間, 内)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 9, k.kanji_id, 
  CASE k.character WHEN '買' THEN 1 WHEN '読' THEN 2 WHEN '手' THEN 3 WHEN '少' THEN 4 WHEN '間' THEN 5 WHEN '内' THEN 6 END,
  CASE k.character 
    WHEN '買' THEN '買います(かいます)'
    WHEN '読' THEN '読みます(よみます)'
    WHEN '手' THEN '手(て), 切手(きって)'
    WHEN '少' THEN '少し(すこし), 少ない(すくない)'
    WHEN '間' THEN '間(あいだ)'
    WHEN '内' THEN 'うち(うち)'
  END,
  CASE k.character 
    WHEN '買' THEN '—'
    WHEN '読' THEN '読書(どくしょ)'
    WHEN '手' THEN '上手(じょうず), 下手(へた)'
    WHEN '少' THEN '少女(しょうじょ)'
    WHEN '間' THEN '時間(じかん), 仲間(なかま)'
    WHEN '内' THEN '案内(あんない), 家内(かない)'
  END,
  CASE k.character 
    WHEN '買' THEN 'kaimasu'
    WHEN '読' THEN 'yomimasu, dokusho'
    WHEN '手' THEN 'te, kitte, jouzu, heta'
    WHEN '少' THEN 'sukoshi, sukunai, shoujo'
    WHEN '間' THEN 'aida, jikan, nakama'
    WHEN '内' THEN 'uchi, annai, kanai'
  END
FROM kanji k WHERE k.character IN ('買', '読', '手', '少', '間', '内')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 10 (田, 町, 電, 気, 山, 川)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 10, k.kanji_id, 
  CASE k.character WHEN '田' THEN 1 WHEN '町' THEN 2 WHEN '電' THEN 3 WHEN '気' THEN 4 WHEN '山' THEN 5 WHEN '川' THEN 6 END,
  CASE k.character 
    WHEN '田' THEN '田んぼ(たんぼ)'
    WHEN '町' THEN '町(まち)'
    WHEN '電' THEN '—'
    WHEN '気' THEN '—'
    WHEN '山' THEN '山(やま)'
    WHEN '川' THEN '川(かわ)'
  END,
  CASE k.character 
    WHEN '田' THEN '水田(すいでん)'
    WHEN '町' THEN '—'
    WHEN '電' THEN '電気(でんき), 電話(でんわ), 電車(でんしゃ)'
    WHEN '気' THEN '天気(てんき), 元気(げんき)'
    WHEN '山' THEN '富士山(ふじさん)'
    WHEN '川' THEN '—'
  END,
  CASE k.character 
    WHEN '田' THEN 'tanbo, suiden'
    WHEN '町' THEN 'machi'
    WHEN '電' THEN 'denki, denwa, densha'
    WHEN '気' THEN 'tenki, genki'
    WHEN '山' THEN 'yama, fujisan'
    WHEN '川' THEN 'kawa'
  END
FROM kanji k WHERE k.character IN ('田', '町', '電', '気', '山', '川')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 12 (中, 外, 下, 上, 左, 右)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 12, k.kanji_id, 
  CASE k.character WHEN '中' THEN 1 WHEN '外' THEN 2 WHEN '下' THEN 3 WHEN '上' THEN 4 WHEN '左' THEN 5 WHEN '右' THEN 6 END,
  CASE k.character 
    WHEN '中' THEN '中(なか)'
    WHEN '外' THEN '外(そと)'
    WHEN '下' THEN '下(した), 下がる(さがる)'
    WHEN '上' THEN '上(うえ), 上がる(あがる)'
    WHEN '左' THEN '左(ひだり)'
    WHEN '右' THEN '右(みぎ)'
  END,
  CASE k.character 
    WHEN '中' THEN '中国(ちゅうごく), 中学校(ちゅうがっこう)'
    WHEN '外' THEN '外国(がいこく), 海外(かいがい)'
    WHEN '下' THEN '地下鉄(ちかてつ), 下手(へた)'
    WHEN '上' THEN '上手(じょうず), 屋上(おくじょう)'
    WHEN '左' THEN '—'
    WHEN '右' THEN '—'
  END,
  CASE k.character 
    WHEN '中' THEN 'naka, chuugoku, chuugakkou'
    WHEN '外' THEN 'soto, gaikoku, kaigai'
    WHEN '下' THEN 'shita, sagaru, chikasetsu, heta'
    WHEN '上' THEN 'ue, agaru, jouzu, okujou'
    WHEN '左' THEN 'hidari'
    WHEN '右' THEN 'migi'
  END
FROM kanji k WHERE k.character IN ('中', '外', '下', '上', '左', '右')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 13 (大, 小, 古, 高, 安, 多)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 13, k.kanji_id, 
  CASE k.character WHEN '大' THEN 1 WHEN '小' THEN 2 WHEN '古' THEN 3 WHEN '高' THEN 4 WHEN '安' THEN 5 WHEN '多' THEN 6 END,
  CASE k.character 
    WHEN '大' THEN '大きい(おおきい)'
    WHEN '小' THEN '小さい(ちいさい)'
    WHEN '古' THEN '古い(ふるい)'
    WHEN '高' THEN '高い(たかい)'
    WHEN '安' THEN '安い(やすい)'
    WHEN '多' THEN '多い(おおい)'
  END,
  CASE k.character 
    WHEN '大' THEN '大学(だいがく), 大変(たいへん)'
    WHEN '小' THEN '小学校(しょうがっこう)'
    WHEN '古' THEN '—'
    WHEN '高' THEN '高校(こうこう)'
    WHEN '安' THEN '安心(あんしん), 安全(あんぜん)'
    WHEN '多' THEN '—'
  END,
  CASE k.character 
    WHEN '大' THEN 'ookii, daigaku, taihen'
    WHEN '小' THEN 'chiisai, shougakkou'
    WHEN '古' THEN 'furui'
    WHEN '高' THEN 'takai, koukou'
    WHEN '安' THEN 'yasui, anshin, anzen'
    WHEN '多' THEN 'ooi'
  END
FROM kanji k WHERE k.character IN ('大', '小', '古', '高', '安', '多')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 14 (男, 女, 子, 父, 母, 友)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 14, k.kanji_id, 
  CASE k.character WHEN '男' THEN 1 WHEN '女' THEN 2 WHEN '子' THEN 3 WHEN '父' THEN 4 WHEN '母' THEN 5 WHEN '友' THEN 6 END,
  CASE k.character 
    WHEN '男' THEN '男(おとこ), 男の子(おとこのこ)'
    WHEN '女' THEN '女(おんな), 女の子(おんなのこ)'
    WHEN '子' THEN '子(こ), 子供(こども)'
    WHEN '父' THEN '父(ちち)'
    WHEN '母' THEN '母(はは)'
    WHEN '友' THEN '友達(ともだち)'
  END,
  CASE k.character 
    WHEN '男' THEN '男性(だんせい)'
    WHEN '女' THEN '女性(じょせい), 彼女(かのじょ)'
    WHEN '子' THEN '電子辞書(でんしじしょ)'
    WHEN '父' THEN '祖父(そふ)'
    WHEN '母' THEN '祖母(そぼ)'
    WHEN '友' THEN '—'
  END,
  CASE k.character 
    WHEN '男' THEN 'otoko, otokonoko, dansei'
    WHEN '女' THEN 'onna, onnanoko, josei, kanojyo'
    WHEN '子' THEN 'ko, kodomo, denshijisho'
    WHEN '父' THEN 'chichi, sofu'
    WHEN '母' THEN 'haha, sobo'
    WHEN '友' THEN 'tomodachi'
  END
FROM kanji k WHERE k.character IN ('男', '女', '子', '父', '母', '友')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 15 (名, 音, 字, 雨, 寺, 米)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 15, k.kanji_id, 
  CASE k.character WHEN '名' THEN 1 WHEN '音' THEN 2 WHEN '字' THEN 3 WHEN '雨' THEN 4 WHEN '寺' THEN 5 WHEN '米' THEN 6 END,
  CASE k.character 
    WHEN '名' THEN '名前(なまえ)'
    WHEN '音' THEN '音(おと)'
    WHEN '字' THEN '—'
    WHEN '雨' THEN '雨(あめ)'
    WHEN '寺' THEN 'お寺(おてら)'
    WHEN '米' THEN '米(こめ)'
  END,
  CASE k.character 
    WHEN '名' THEN '有名(ゆうめい), 名刺(めいし)'
    WHEN '音' THEN '音楽(おんがく), 発音(はつおん)'
    WHEN '字' THEN '漢字(かんじ), 文字(もじ)'
    WHEN '雨' THEN '—'
    WHEN '寺' THEN '—'
    WHEN '米' THEN '—'
  END,
  CASE k.character 
    WHEN '名' THEN 'namae, yuumei, meishi'
    WHEN '音' THEN 'oto, ongaku, hatsuon'
    WHEN '字' THEN 'kanji, moji'
    WHEN '雨' THEN 'ame'
    WHEN '寺' THEN 'otera'
    WHEN '米' THEN 'kome'
  END
FROM kanji k WHERE k.character IN ('名', '音', '字', '雨', '寺', '米')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 16 (出, 入, 立, 言, 話, 力)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 16, k.kanji_id, 
  CASE k.character WHEN '出' THEN 1 WHEN '入' THEN 2 WHEN '立' THEN 3 WHEN '言' THEN 4 WHEN '話' THEN 5 WHEN '力' THEN 6 END,
  CASE k.character 
    WHEN '出' THEN '出ます(でます), 出します(だします)'
    WHEN '入' THEN '入ります(はいります), 入れます(いれます)'
    WHEN '立' THEN '立ちます(たちます)'
    WHEN '言' THEN '言います(いいます)'
    WHEN '話' THEN '話します(はなします), 話(はなし)'
    WHEN '力' THEN '力(ちから)'
  END,
  CASE k.character 
    WHEN '出' THEN '出口(でぐち), 出席(しゅっせき)'
    WHEN '入' THEN '入口(いりぐち), 入学(にゅうがく)'
    WHEN '立' THEN '—'
    WHEN '言' THEN '—'
    WHEN '話' THEN '電話(でんわ), 会話(かいわ)'
    WHEN '力' THEN '—'
  END,
  CASE k.character 
    WHEN '出' THEN 'demasu, dashimasu, deguchi, shusseki'
    WHEN '入' THEN 'hairimasu, iremasu, iriguchi, nyuugaku'
    WHEN '立' THEN 'tachimasu'
    WHEN '言' THEN 'iimasu'
    WHEN '話' THEN 'hanashimasu, hanashi, denwa, kaiwa'
    WHEN '力' THEN 'chikara'
  END
FROM kanji k WHERE k.character IN ('出', '入', '立', '言', '話', '力')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 17 (長, 明, 暗, 元, 好, 足)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 17, k.kanji_id, 
  CASE k.character WHEN '長' THEN 1 WHEN '明' THEN 2 WHEN '暗' THEN 3 WHEN '元' THEN 4 WHEN '好' THEN 5 WHEN '足' THEN 6 END,
  CASE k.character 
    WHEN '長' THEN '長い(ながい)'
    WHEN '明' THEN '明るい(あかるい)'
    WHEN '暗' THEN '暗い(くらい)'
    WHEN '元' THEN '元(もと)'
    WHEN '好' THEN '好き(すき)'
    WHEN '足' THEN '足(あし), 足りる(たりる)'
  END,
  CASE k.character 
    WHEN '長' THEN '社長(しゃちょう), 部長(ぶちょう)'
    WHEN '明' THEN '説明(せつめい)'
    WHEN '暗' THEN '暗証番号(あんしょうばんごう)'
    WHEN '元' THEN '元気(げんき)'
    WHEN '好' THEN '—'
    WHEN '足' THEN '—'
  END,
  CASE k.character 
    WHEN '長' THEN 'nagai, shachou, buchou'
    WHEN '明' THEN 'akarui, setsumei'
    WHEN '暗' THEN 'kurai, anshoubangou'
    WHEN '元' THEN 'moto, genki'
    WHEN '好' THEN 'suki'
    WHEN '足' THEN 'ashi, tariru'
  END
FROM kanji k WHERE k.character IN ('長', '明', '暗', '元', '好', '足')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 18 (東, 西, 南, 北, 夕, 石)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 18, k.kanji_id, 
  CASE k.character WHEN '東' THEN 1 WHEN '西' THEN 2 WHEN '南' THEN 3 WHEN '北' THEN 4 WHEN '夕' THEN 5 WHEN '石' THEN 6 END,
  CASE k.character 
    WHEN '東' THEN '東(ひがし)'
    WHEN '西' THEN '西(にし)'
    WHEN '南' THEN '南(みなみ)'
    WHEN '北' THEN '北(きた)'
    WHEN '夕' THEN '夕方(ゆうがた)'
    WHEN '石' THEN '石(いし)'
  END,
  CASE k.character 
    WHEN '東' THEN '東京(とうきょう)'
    WHEN '西' THEN '西洋(せいよう)'
    WHEN '南' THEN '—'
    WHEN '北' THEN '—'
    WHEN '夕' THEN '—'
    WHEN '石' THEN '石油(せきゆ)'
  END,
  CASE k.character 
    WHEN '東' THEN 'higashi, toukyou'
    WHEN '西' THEN 'nishi, seiyou'
    WHEN '南' THEN 'minami'
    WHEN '北' THEN 'kita'
    WHEN '夕' THEN 'yuugata'
    WHEN '石' THEN 'ishi, sekiyu'
  END
FROM kanji k WHERE k.character IN ('東', '西', '南', '北', '夕', '石')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 19 (体, 目, 耳, 口, 鳥, 犬)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 19, k.kanji_id, 
  CASE k.character WHEN '体' THEN 1 WHEN '目' THEN 2 WHEN '耳' THEN 3 WHEN '口' THEN 4 WHEN '鳥' THEN 5 WHEN '犬' THEN 6 END,
  CASE k.character 
    WHEN '体' THEN '体(からだ)'
    WHEN '目' THEN '目(め)'
    WHEN '耳' THEN '耳(みみ)'
    WHEN '口' THEN '口(くち)'
    WHEN '鳥' THEN '鳥(とり)'
    WHEN '犬' THEN '犬(いぬ)'
  END,
  CASE k.character 
    WHEN '体' THEN '体育館(たいいくかん)'
    WHEN '目' THEN '目的(もくてき)'
    WHEN '耳' THEN '—'
    WHEN '口' THEN '人口(じんこう)'
    WHEN '鳥' THEN '—'
    WHEN '犬' THEN '—'
  END,
  CASE k.character 
    WHEN '体' THEN 'karada, taiikukan'
    WHEN '目' THEN 'me, mokuteki'
    WHEN '耳' THEN 'mimi'
    WHEN '口' THEN 'kuchi, jinkou'
    WHEN '鳥' THEN 'tori'
    WHEN '犬' THEN 'inu'
  END
FROM kanji k WHERE k.character IN ('体', '目', '耳', '口', '鳥', '犬')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Bài 20 (竹, 貝, 林, 森, 畑, 門, 岩)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 20, k.kanji_id, 
  CASE k.character WHEN '竹' THEN 1 WHEN '貝' THEN 2 WHEN '林' THEN 3 WHEN '森' THEN 4 WHEN '畑' THEN 5 WHEN '門' THEN 6 WHEN '岩' THEN 7 END,
  CASE k.character 
    WHEN '竹' THEN '竹(たけ)'
    WHEN '貝' THEN '貝(かい)'
    WHEN '林' THEN '林(はやし)'
    WHEN '森' THEN '森(もり)'
    WHEN '畑' THEN '畑(はたけ)'
    WHEN '門' THEN '—'
    WHEN '岩' THEN '岩(いわ)'
  END,
  CASE k.character 
    WHEN '竹' THEN '竹林(ちくりん)'
    WHEN '貝' THEN '—'
    WHEN '林' THEN '森林(しんりん)'
    WHEN '森' THEN '—'
    WHEN '畑' THEN '—'
    WHEN '門' THEN '専門(せんもん), 入門(にゅうもん)'
    WHEN '岩' THEN '—'
  END,
  CASE k.character 
    WHEN '竹' THEN 'take, chikurin'
    WHEN '貝' THEN 'kai'
    WHEN '林' THEN 'hayashi, shinrin'
    WHEN '森' THEN 'mori'
    WHEN '畑' THEN 'hatake'
    WHEN '門' THEN 'senmon, nyuumon'
    WHEN '岩' THEN 'iwa'
  END
FROM kanji k WHERE k.character IN ('竹', '貝', '林', '森', '畑', '門', '岩')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- 4. Seed Reading Sentences for Lesson 2 (第２課)
INSERT INTO kanji_exercises (topic_id, exercise_type, sentence_jp, target_kanji, reading_hiragana, display_order) VALUES
(2, 'READING_SENTENCE', '① 八日(ようか)に 行(い)きます。', '八日', 'ようか', 1),
(2, 'READING_SENTENCE', '② 九日(ここのか)に 行(い)きます。', '九日', 'ここのか', 2),
(2, 'READING_SENTENCE', '③ 去年(きょねん)の 八月(はちがつ)に 日本(にほん)へ 来(き)ました。', '八月', 'はちがつ', 3),
(2, 'READING_SENTENCE', '④ 来年(らいねん)の 九月(くがつ)に 行(い)きます。', '九月', 'くがつ', 4),
(2, 'READING_SENTENCE', '⑤ 昨日(きのう)、十時(じゅうじ)に 寝(ね)ました。', '十時', 'じゅうじ', 5),
(2, 'READING_SENTENCE', '⑥ この チョコレートは 三百円(さんびゃくえん)です。', '三百円', 'さんびゃくえん', 6),
(2, 'READING_SENTENCE', '⑦ この かばんは 二千円(にせんえん)です。', '二千円', 'にせんえん', 7),
(2, 'READING_SENTENCE', '⑧ この パソコンは 九万三千六百円(きゅうまんさんぜんろっぴゃくえん)です。', '九万三千六百円', 'きゅうまんさんぜんろっぴゃくえん', 8);

-- 5. Seed Quiz Tests for Lesson 2 (第２課)
INSERT INTO kanji_exercises (topic_id, exercise_type, sentence_jp, target_kanji, reading_hiragana, options_json, correct_option, display_order) VALUES
(2, 'QUIZ_TEST', '八日 に 行きます。', '八日', 'ようか', '["1. はちじ", "2. ようか", "3. やっつ", "4. はちがつ"]', 2, 1),
(2, 'QUIZ_TEST', '九月 に 日本へ 来ました。', '九月', 'くがつ', '["1. くがつ", "2. きゅうがつ", "3. ここのか", "4. ここのつ"]', 1, 2),
(2, 'QUIZ_TEST', 'この かばんは 二千円 です。', '二千円', 'にせんえん', '["1. にひゃくえん", "2. にせんえん", "3. にまんえん", "4. にせんまんえん"]', 2, 3);
