-- V34: Seed Complete Kanji Topic Items & Exercises for All 20 Lessons (第1課 - 第20課)

-- Ensure all Kanji entries exist
INSERT INTO kanji (character, onyomi, kunyomi, meaning_vi, stroke_count, radical, jlpt_level, status) VALUES
('一', 'イチ', 'ひと', 'NHẤT', 1, '一', 'N5', 'PUBLISHED'),
('二', 'ニ', 'ふた', 'NHỊ', 2, '二', 'N5', 'PUBLISHED'),
('三', 'サン', 'みっ', 'TAM', 3, '一', 'N5', 'PUBLISHED'),
('四', 'シ', 'よん、よっ、よ', 'TỨ', 5, '囗', 'N5', 'PUBLISHED'),
('五', 'ゴ', 'いつ', 'NGŨ', 4, '二', 'N5', 'PUBLISHED'),
('六', 'ロク', 'むい、むっ', 'LỤC', 4, '八', 'N5', 'PUBLISHED'),
('七', 'シチ', 'なの、なな', 'THẤT', 2, '一', 'N5', 'PUBLISHED'),
('八', 'ハチ', 'やっ、よう', 'BÁT', 2, '八', 'N5', 'PUBLISHED'),
('九', 'キュウ、ク', 'ここの', 'CỬU', 2, '乙', 'N5', 'PUBLISHED'),
('十', 'ジュウ、ジッ', 'とお', 'THẬP', 2, '十', 'N5', 'PUBLISHED'),
('百', 'ヒャク', '—', 'BÁCH', 6, '白', 'N5', 'PUBLISHED'),
('千', 'セン', '—', 'THIÊN', 3, '十', 'N5', 'PUBLISHED'),
('万', 'マン、バン', '—', 'VẠN', 3, '一', 'N5', 'PUBLISHED'),
('円', 'エン', '—', 'VIÊN', 4, '囗', 'N5', 'PUBLISHED'),
('日', 'ニチ、ジツ', 'ひ、び、か', 'NHẬT', 4, '日', 'N5', 'PUBLISHED'),
('月', 'ゲツ、ガツ', 'つき', 'NGUYỆT', 4, '月', 'N5', 'PUBLISHED'),
('火', 'カ', 'ひ', 'HỎA', 4, '火', 'N5', 'PUBLISHED'),
('水', 'スイ', 'みず', 'THỦY', 4, '水', 'N5', 'PUBLISHED'),
('木', 'ボク、モク', 'き', 'MỘC', 4, '木', 'N5', 'PUBLISHED'),
('金', 'キン', 'かね', 'KIM', 8, '金', 'N5', 'PUBLISHED'),
('土', 'ド', 'つち', 'THỔ', 3, '土', 'N5', 'PUBLISHED'),
('人', 'ジン、ニン', 'ひと', 'NHÂN', 2, '人', 'N5', 'PUBLISHED'),
('先', 'セン', 'さき', 'TIÊN', 6, '儿', 'N5', 'PUBLISHED'),
('生', 'セイ、ショウ', 'い、う', 'SINH', 5, '生', 'N5', 'PUBLISHED'),
('学', 'ガク', 'まな', 'HỌC', 8, '子', 'N5', 'PUBLISHED'),
('方', 'ホウ', 'かた', 'PHƯƠNG', 4, '方', 'N5', 'PUBLISHED'),
('何', 'カ', 'なに、なん', 'HÀ', 7, '人', 'N5', 'PUBLISHED'),
('今', 'コン', 'いま', 'KIM', 4, '人', 'N5', 'PUBLISHED'),
('分', 'フン、ブン、プン', 'わ', 'PHÂN', 4, '刀', 'N5', 'PUBLISHED'),
('半', 'ハン', '—', 'BÁN', 5, '十', 'N5', 'PUBLISHED'),
('時', 'ジ', 'とき', 'THỜI', 10, '日', 'N5', 'PUBLISHED'),
('年', 'ネン', 'とし', 'NIÊN', 6, '干', 'N5', 'PUBLISHED'),
('本', 'ホン', 'もと', 'BẢN', 5, '木', 'N5', 'PUBLISHED'),
('休', 'キュウ', 'やす', 'HƯU', 6, '人', 'N5', 'PUBLISHED'),
('帰', 'キ', 'かえ', 'QUY', 10, '巾', 'N5', 'PUBLISHED'),
('行', 'コウ、ギョウ', 'い、おこな', 'HÀNH', 6, '行', 'N5', 'PUBLISHED'),
('来', 'ライ', 'き、く', 'LAI', 7, '木', 'N5', 'PUBLISHED'),
('校', 'コウ', '—', 'HIỆU', 10, '木', 'N5', 'PUBLISHED'),
('車', 'シャ', 'くるま', 'XA', 7, '車', 'N5', 'PUBLISHED'),
('書', 'ショ', 'か', 'THƯ', 10, '曰', 'N5', 'PUBLISHED'),
('食', 'ショク', 'た', 'THỰC', 9, '食', 'N5', 'PUBLISHED'),
('飲', 'イン', 'の', 'ẨM', 12, '食', 'N5', 'PUBLISHED'),
('見', 'ケン', 'み', 'KIẾN', 7, '見', 'N5', 'PUBLISHED'),
('聞', 'ブン', 'き', 'VĂN', 14, '耳', 'N5', 'PUBLISHED'),
('新', 'シン', 'あたら', 'TÂN', 13, '斤', 'N5', 'PUBLISHED'),
('肉', 'ニク', '—', 'NHỤC', 6, '肉', 'N5', 'PUBLISHED'),
('魚', 'ギョ', 'うお、さかな', 'NGƯ', 11, '魚', 'N5', 'PUBLISHED'),
('物', 'ブツ、モツ', 'もの', 'VẬT', 8, '牛', 'N5', 'PUBLISHED'),
('茶', 'チャ、サ', '—', 'TRÀ', 9, '艸', 'N5', 'PUBLISHED'),
('牛', 'ギュウ', 'うし', 'NGƯU', 4, '牛', 'N5', 'PUBLISHED'),
('花', 'カ', 'はな', 'HOA', 7, '艸', 'N5', 'PUBLISHED'),
('買', 'バイ', 'か', 'MẠI', 12, '貝', 'N5', 'PUBLISHED'),
('読', 'ドク', 'よ', 'ĐỘC', 14, '言', 'N5', 'PUBLISHED'),
('手', 'シュ、ズ', 'て、た', 'THỦ', 4, '手', 'N5', 'PUBLISHED'),
('少', 'ショウ', 'すく、すこ', 'THIỂU', 4, '小', 'N5', 'PUBLISHED'),
('間', 'カン', 'あいだ、ま', 'GIAN', 12, '門', 'N5', 'PUBLISHED'),
('内', 'ナイ', 'うち', 'NỘI', 4, '冂', 'N5', 'PUBLISHED'),
('田', 'デン', 'た', 'ĐIỀN', 5, '田', 'N5', 'PUBLISHED'),
('町', 'チョウ', 'まち', 'ĐINH', 7, '田', 'N5', 'PUBLISHED'),
('電', 'デン', '—', 'ĐIỆN', 13, '雨', 'N5', 'PUBLISHED'),
('気', 'キ', '—', 'KHÍ', 6, '气', 'N5', 'PUBLISHED'),
('山', 'サン', 'やま', 'SƠN', 3, '山', 'N5', 'PUBLISHED'),
('川', 'セン', 'かわ', 'XUYÊN', 3, '川', 'N5', 'PUBLISHED'),
('中', 'チュウ、ジュウ', 'なか', 'TRUNG', 4, '丨', 'N5', 'PUBLISHED'),
('外', 'ガイ', 'そと、はず', 'NGOẠI', 5, '夕', 'N5', 'PUBLISHED'),
('下', 'カ、ゲ', 'した、さ、お', 'HẠ', 3, '一', 'N5', 'PUBLISHED'),
('上', 'ジョウ', 'うえ、あ、のぼ', 'THƯỢNG', 3, '一', 'N5', 'PUBLISHED'),
('左', 'サ', 'ひだり', 'TẢ', 5, '工', 'N5', 'PUBLISHED'),
('右', 'ウ', 'みぎ', 'HỮU', 5, '口', 'N5', 'PUBLISHED'),
('大', 'ダイ、タイ', 'おお', 'ĐẠI', 3, '大', 'N5', 'PUBLISHED'),
('小', 'ショウ', 'ちい、こ', 'TIỂU', 3, '小', 'N5', 'PUBLISHED'),
('古', 'コ', 'ふる', 'CỔ', 5, '口', 'N5', 'PUBLISHED'),
('高', 'コウ', 'たか', 'CAO', 10, '高', 'N5', 'PUBLISHED'),
('安', 'アン', 'やす', 'AN', 6, '宀', 'N5', 'PUBLISHED'),
('多', 'タ', 'おお', 'ĐA', 6, '夕', 'N5', 'PUBLISHED'),
('男', 'ダン', 'おとこ', 'NAM', 7, '田', 'N5', 'PUBLISHED'),
('女', 'ジョ', 'おんな', 'NỮ', 3, '女', 'N5', 'PUBLISHED'),
('子', 'シ、ス', 'こ、ご', 'TỬ', 3, '子', 'N5', 'PUBLISHED'),
('父', 'フ', 'ちち', 'PHỤ', 4, '父', 'N5', 'PUBLISHED'),
('母', 'ボ', 'はは', 'MẪU', 5, '母', 'N5', 'PUBLISHED'),
('友', 'ユウ', 'とも', 'HỮU', 4, '又', 'N5', 'PUBLISHED'),
('名', 'メイ、ミョウ', 'な', 'DANH', 6, '口', 'N5', 'PUBLISHED'),
('音', 'オン', 'おと、ね', 'ÂM', 9, '音', 'N5', 'PUBLISHED'),
('字', 'ジ', '—', 'TỰ', 6, '子', 'N5', 'PUBLISHED'),
('雨', 'ウ', 'あめ', 'VŨ', 8, '雨', 'N5', 'PUBLISHED'),
('寺', 'ジ', 'てら', 'TỰ', 6, '寸', 'N5', 'PUBLISHED'),
('米', 'マイ', 'こめ', 'MỄ', 6, '米', 'N5', 'PUBLISHED'),
('出', 'シュツ', 'で、だ', 'XUẤT', 5, '凵', 'N5', 'PUBLISHED'),
('入', 'ニュウ', 'はい、い', 'NHẬP', 2, '入', 'N5', 'PUBLISHED'),
('立', 'リツ', 'た', 'LẬP', 5, '立', 'N5', 'PUBLISHED'),
('言', 'ゲン、ゴン', 'い、こと', 'NGÔN', 7, '言', 'N5', 'PUBLISHED'),
('話', 'ワ', 'はな、はなし', 'THOẠI', 13, '言', 'N5', 'PUBLISHED'),
('力', 'リョク', 'ちから', 'LỰC', 2, '力', 'N5', 'PUBLISHED'),
('長', 'チョウ', 'なが', 'TRƯỜNG', 8, '長', 'N5', 'PUBLISHED'),
('明', 'メイ', 'あか、あ', 'MINH', 8, '日', 'N5', 'PUBLISHED'),
('暗', 'アン', 'くら', 'ÁM', 13, '日', 'N5', 'PUBLISHED'),
('元', 'ゲン、ガン', 'もと', 'NGUYÊN', 4, '儿', 'N5', 'PUBLISHED'),
('好', 'コウ', 'す', 'HẢO', 6, '女', 'N5', 'PUBLISHED'),
('足', 'ソク', 'あし、た', 'TÚC', 7, '足', 'N5', 'PUBLISHED'),
('東', 'トウ', 'ひがし', 'ĐÔNG', 8, '木', 'N5', 'PUBLISHED'),
('西', 'セイ', 'にし', 'TÂY', 6, '襾', 'N5', 'PUBLISHED'),
('南', 'ナン', 'みなみ', 'NAM', 9, '十', 'N5', 'PUBLISHED'),
('北', 'ホク', 'きた', 'BẮC', 5, '匕', 'N5', 'PUBLISHED'),
('夕', 'ユウ', '—', 'TỊCH', 3, '夕', 'N5', 'PUBLISHED'),
('石', 'セキ', 'いし', 'THẠCH', 5, '石', 'N5', 'PUBLISHED'),
('体', 'タイ', 'からだ', 'THỂ', 7, '人', 'N5', 'PUBLISHED'),
('目', 'モク', 'め', 'MỤC', 5, '目', 'N5', 'PUBLISHED'),
('耳', 'ジ', 'みみ', 'NHĨ', 6, '耳', 'N5', 'PUBLISHED'),
('口', 'コウ', 'くち', 'KHẨU', 3, '口', 'N5', 'PUBLISHED'),
('鳥', 'チョウ', 'とり', 'ĐIỂU', 11, '鳥', 'N5', 'PUBLISHED'),
('犬', 'ケン', 'いぬ', 'KHUYỂN', 4, '犬', 'N5', 'PUBLISHED'),
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

-- Seed Topic Items for ALL Lessons (1 to 20)
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
    WHEN '人' THEN '日本人(にほんじん), ご主人(ごしゅじん)'
    WHEN '先' THEN '先生(せんせい), 先週(せんしゅう)'
    WHEN '生' THEN '学生(がくせい), 先生(せんせい)'
    WHEN '学' THEN '学生(がくせい), 大学(だいがく)'
    WHEN '方' THEN '一方(いっぽう), 方法(ほうほう)'
    WHEN '何' THEN '何歳(なんさい), 何時(なんじ)'
  END,
  CASE k.character 
    WHEN '人' THEN 'anohito, hitori, nihonjin, goshujin'
    WHEN '先' THEN 'osakini, sensei, senshuu'
    WHEN '生' THEN 'ikeru, umareru, gakusei, sensei'
    WHEN '学' THEN 'gakusei, daigaku'
    WHEN '方' THEN 'anokata, yomikata, ippou'
    WHEN '何' THEN 'nani, nan, nansai, nanji'
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
    WHEN '今' THEN '今晩(こんばん), 今週(こんしゅう)'
    WHEN '分' THEN '何分(なんぷん), 自分(じぶん)'
    WHEN '半' THEN '半分(はんぶん), 半年(はんとし)'
    WHEN '時' THEN '時計(とけい), 時間(じかん)'
    WHEN '年' THEN '来年(らいねん), 去年(きょねん)'
    WHEN '本' THEN '日本(にほん), 本(ほん)'
  END,
  CASE k.character 
    WHEN '今' THEN 'ima, konban, konshuu'
    WHEN '分' THEN 'wakeru, wakaru, nanpun, jibun'
    WHEN '半' THEN 'hanbun, hantoshi'
    WHEN '時' THEN 'toki, tokei, jikan'
    WHEN '年' THEN 'toshi, rainen, kyonen'
    WHEN '本' THEN 'moto, nihon, hon'
  END
FROM kanji k WHERE k.character IN ('今', '分', '半', '時', '年', '本')
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
    WHEN '少' THEN 'sukoshi, sukunai'
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
    WHEN '電' THEN '電気(でんき), 電話(でんわ)'
    WHEN '気' THEN '天気(てんき), 元気(げんき)'
    WHEN '山' THEN '富士山(ふじさん)'
    WHEN '川' THEN '—'
  END,
  CASE k.character 
    WHEN '田' THEN 'tanbo, suiden'
    WHEN '町' THEN 'machi'
    WHEN '電' THEN 'denki, denwa'
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
    WHEN '中' THEN 'naka, chuugoku'
    WHEN '外' THEN 'soto, gaikoku'
    WHEN '下' THEN 'shita, sagaru, heta'
    WHEN '上' THEN 'ue, agaru, jouzu'
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
    WHEN '大' THEN 'ookii, daigaku'
    WHEN '小' THEN 'chiisai'
    WHEN '古' THEN 'furui'
    WHEN '高' THEN 'takai, koukou'
    WHEN '安' THEN 'yasui, anshin'
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
    WHEN '女' THEN 'onna, onnanoko, josei'
    WHEN '子' THEN 'ko, kodomo'
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
    WHEN '名' THEN 'namae, yuumei'
    WHEN '音' THEN 'oto, ongaku'
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
    WHEN '話' THEN '話します(はなします)'
    WHEN '力' THEN '力(ちから)'
  END,
  CASE k.character 
    WHEN '出' THEN '出口(でぐち)'
    WHEN '入' THEN '入口(いりぐち)'
    WHEN '立' THEN '—'
    WHEN '言' THEN '—'
    WHEN '話' THEN '電話(でんわ)'
    WHEN '力' THEN '—'
  END,
  CASE k.character 
    WHEN '出' THEN 'demasu, deguchi'
    WHEN '入' THEN 'hairimasu, iriguchi'
    WHEN '立' THEN 'tachimasu'
    WHEN '言' THEN 'iimasu'
    WHEN '話' THEN 'hanashimasu, denwa'
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
    WHEN '足' THEN '足(あし)'
  END,
  CASE k.character 
    WHEN '長' THEN '社長(しゃちょう)'
    WHEN '明' THEN '説明(せつめい)'
    WHEN '暗' THEN '—'
    WHEN '元' THEN '元気(げんき)'
    WHEN '好' THEN '—'
    WHEN '足' THEN '—'
  END,
  CASE k.character 
    WHEN '長' THEN 'nagai, shachou'
    WHEN '明' THEN 'akarui, setsumei'
    WHEN '暗' THEN 'kurai'
    WHEN '元' THEN 'moto, genki'
    WHEN '好' THEN 'suki'
    WHEN '足' THEN 'ashi'
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
    WHEN '西' THEN 'nishi'
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
    WHEN '体' THEN 'karada'
    WHEN '目' THEN 'me'
    WHEN '耳' THEN 'mimi'
    WHEN '口' THEN 'kuchi'
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
    WHEN '門' THEN '専門(せんもん)'
    WHEN '岩' THEN '—'
  END,
  CASE k.character 
    WHEN '竹' THEN 'take'
    WHEN '貝' THEN 'kai'
    WHEN '林' THEN 'hayashi'
    WHEN '森' THEN 'mori'
    WHEN '畑' THEN 'hatake'
    WHEN '門' THEN 'senmon'
    WHEN '岩' THEN 'iwa'
  END
FROM kanji k WHERE k.character IN ('竹', '貝', '林', '森', '畑', '門', '岩')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;
