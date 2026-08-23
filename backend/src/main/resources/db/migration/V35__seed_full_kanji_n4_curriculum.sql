-- V35: Seed Full Kanji N4 Textbook Curriculum (Dung Mori N4 Summary Kanji - 第21課 đến 第35課)

-- 1. Seed Kanji N4 Topics (第21課 đến 第35課)
INSERT INTO kanji_topics (topic_id, title, jlpt_level, topic_order, description) VALUES
(21, '第21課', 'N4', 21, 'Chữ Hán N4 #1: Hành động & Xã hội (会, 動, 歩, 急, 切, 送, 習, 歌)'),
(22, '第22課', 'N4', 22, 'Chữ Hán N4 #2: Y tế & Giáo dục (終, 社, 銀, 医, 病, 院, 国, 世, 界, 教, 研, 究)'),
(23, '第23課', 'N4', 23, 'Chữ Hán N4 #3: Công việc & Địa điểm (売, 働, 勉, 強, 泳, 部, 屋, 室, 場, 所, 図, 館, 家)'),
(24, '第24課', 'N4', 24, 'Chữ Hán N4 #4: Thời gian & Giải trí (族, 毎, 朝, 昼, 晩, 夜, 午, 後, 前, 週, 試, 験, 映, 画, 宿)'),
(25, '第25課', 'N4', 25, 'Chữ Hán N4 #5: Đời sống & Ngôn ngữ (題, 紙, 英, 語, 待, 開, 閉, 持, 使, 止, 住, 降, 私, 夫, 主)'),
(26, '第26課', 'N4', 26, 'Chữ Hán N4 #6: Gia đình & Bốn mùa (奥, 妻, 兄, 弟, 姉, 妹, 春, 夏, 秋, 冬, 雪, 海, 天, 空, 暑, 寒)'),
(27, '第27課', 'N4', 27, 'Chữ Hán N4 #7: Tính chất & Động thái (早, 速, 遅, 重, 軽, 近, 遠, 質, 問, 答, 作, 思, 始, 着, 集, 練, 晴)'),
(28, '第28課', 'N4', 28, 'Chữ Hán N4 #8: Tự nhiên & Tiện ích (星, 風, 然, 油, 原, 皿, 発, 便, 利, 不, 静, 同, 有, 親, 細, 駅, 店)'),
(29, '第29課', 'N4', 29, 'Chữ Hán N4 #9: Sinh hoạt & Phương hướng (池, 公, 園, 洋, 辺, 交, 漢, 数, 旅, 薬, 台, 里, 才, 去, 若, 短, 弱)'),
(30, '第30課', 'N4', 30, 'Chữ Hán N4 #10: Trạng thái & Văn hóa (正, 広, 低, 楽, 太, 運, 合, 当, 考, 走, 治, 通, 知, 文, 化)'),
(31, '第31課', 'N4', 31, 'Chữ Hán N4 #11: Kinh tế & Thực phẩm (経, 済, 政, 歴, 史, 育, 料, 理, 味, 飯, 野, 酒, 品, 麦, 船, 地)'),
(32, '第32課', 'N4', 32, 'Chữ Hán N4 #12: Vật dụng & Số hiệu (鉄, 特, 客, 様, 荷, 馬, 番, 号, 写, 真, 計, 宅, 玉, 工, 白)'),
(33, '第33課', 'N4', 33, 'Chữ Hán N4 #13: Màu sắc & Con người (黒, 赤, 青, 緑, 黄, 色, 丸, 心, 自, 声, 服, 毛, 糸, 科, 鳴)'),
(34, '第34課', 'N4', 34, 'Chữ Hán N4 #14: Địa lý & Hành chính (道, 村, 区, 市, 都, 県, 府, 京, 衣, 光, 雲, 王, 草, 湖, 谷, 虫, 羽)'),
(35, '第35課', 'N4', 35, 'Bài Kiểm Tra Trắc Nghiệm Tổng Hợp Kanji N4 (テスト)')
ON CONFLICT (topic_id) DO UPDATE SET 
    title = EXCLUDED.title, 
    jlpt_level = EXCLUDED.jlpt_level, 
    topic_order = EXCLUDED.topic_order, 
    description = EXCLUDED.description;

SELECT setval('kanji_topics_topic_id_seq', (SELECT MAX(topic_id) FROM kanji_topics));

-- 2. Seed Kanji Entries into 'kanji' Table for N4
INSERT INTO kanji (character, onyomi, kunyomi, meaning_vi, stroke_count, radical, jlpt_level, status) VALUES
-- Topic 21
('会', 'カイ、エ', 'あ', 'HỘI', 6, '人', 'N4', 'PUBLISHED'),
('動', 'ドウ', 'うご', 'ĐỘNG', 11, '力', 'N4', 'PUBLISHED'),
('歩', 'ホ、ブ、フ', 'ある、あゆ', 'BỘ', 8, '止', 'N4', 'PUBLISHED'),
('急', 'キュウ', 'いそ', 'CẤP', 9, '心', 'N4', 'PUBLISHED'),
('切', 'セツ', 'き', 'THIẾT', 4, '刀', 'N4', 'PUBLISHED'),
('送', 'ソウ', 'おく', 'TỐNG', 9, '辵', 'N4', 'PUBLISHED'),
('習', 'シュウ', 'なら', 'TẬP', 11, '羽', 'N4', 'PUBLISHED'),
('歌', 'カ', 'うた', 'CA', 14, '欠', 'N4', 'PUBLISHED'),

-- Topic 22
('終', 'シュウ', 'お', 'CHUNG', 11, '糸', 'N4', 'PUBLISHED'),
('社', 'シャ、ジャ', 'やしろ', 'XÃ', 7, '示', 'N4', 'PUBLISHED'),
('銀', 'ギン', '—', 'NGÂN', 14, '金', 'N4', 'PUBLISHED'),
('医', 'イ', '—', 'Y', 7, '匚', 'N4', 'PUBLISHED'),
('病', 'ビョウ', '—', 'BỆNH', 10, '疒', 'N4', 'PUBLISHED'),
('院', 'イン', '—', 'VIỆN', 10, '阜', 'N4', 'PUBLISHED'),
('国', 'コク', 'くに', 'QUỐC', 8, '囗', 'N4', 'PUBLISHED'),
('世', 'セ、セイ', 'よ', 'THẾ', 5, '一', 'N4', 'PUBLISHED'),
('界', 'カイ', '—', 'GIỚI', 9, '田', 'N4', 'PUBLISHED'),
('教', 'キョウ', 'おし、おそ', 'GIÁO', 11, '攴', 'N4', 'PUBLISHED'),
('研', 'ケン', '—', 'NGHIÊN', 9, '石', 'N4', 'PUBLISHED'),
('究', 'キュウ', '—', 'CỨU', 7, '穴', 'N4', 'PUBLISHED'),

-- Topic 23
('売', 'バイ', 'う', 'MẠI', 7, '士', 'N4', 'PUBLISHED'),
('働', 'ドウ', 'はたら', 'ĐỘNG', 13, '人', 'N4', 'PUBLISHED'),
('勉', 'ベン', '—', 'MIỄN', 10, '力', 'N4', 'PUBLISHED'),
('強', 'キョウ、ゴウ', 'つよ、し', 'CƯỜNG', 11, '弓', 'N4', 'PUBLISHED'),
('泳', 'エイ', 'およ', 'VỊNH', 8, '水', 'N4', 'PUBLISHED'),
('部', 'ブ', '—', 'BỘ', 11, '邑', 'N4', 'PUBLISHED'),
('屋', 'オク', 'や', 'ỐC', 9, '尸', 'N4', 'PUBLISHED'),
('室', 'シツ', 'むろ', 'THẤT', 9, '宀', 'N4', 'PUBLISHED'),
('場', 'ジョウ', 'ば', 'TRƯỜNG', 12, '土', 'N4', 'PUBLISHED'),
('所', 'ショ', 'ところ', 'SỞ', 8, '斤', 'N4', 'PUBLISHED'),
('図', 'ト、ズ', '—', 'ĐỒ', 7, '囗', 'N4', 'PUBLISHED'),
('館', 'カン', '—', 'QUÁN', 16, '食', 'N4', 'PUBLISHED'),
('家', 'カ', 'いえ、や', 'GIA', 10, '宀', 'N4', 'PUBLISHED'),

-- Topic 24
('族', 'ゾク', '—', 'TỘC', 11, '方', 'N4', 'PUBLISHED'),
('毎', 'マイ', '—', 'MỖI', 6, '毋', 'N4', 'PUBLISHED'),
('朝', 'チョウ', 'あさ', 'TRIỀU', 12, '月', 'N4', 'PUBLISHED'),
('昼', 'チュウ', 'ひる', 'TRÚ', 9, '日', 'N4', 'PUBLISHED'),
('晩', 'バン', '—', 'VÃN', 12, '日', 'N4', 'PUBLISHED'),
('夜', 'ヤ', 'よ、よる', 'DẠ', 8, '夕', 'N4', 'PUBLISHED'),
('午', 'ゴ', '—', 'NGỌ', 4, '十', 'N4', 'PUBLISHED'),
('後', 'ゴ、コウ', 'あと、うしろ', 'HẬU', 9, '彳', 'N4', 'PUBLISHED'),
('前', 'ゼン', 'まえ', 'TIỀN', 9, '刀', 'N4', 'PUBLISHED'),
('週', 'シュウ', '—', 'CHU', 11, '辵', 'N4', 'PUBLISHED'),
('試', 'シ', 'こころ、ため', 'THÍ', 13, '言', 'N4', 'PUBLISHED'),
('験', 'ケン、ゲン', '—', 'NGHIỆM', 18, '馬', 'N4', 'PUBLISHED'),
('映', 'エイ', 'うつ', 'ÁNH', 9, '日', 'N4', 'PUBLISHED'),
('画', 'ガ、カク', '—', 'HỌA', 8, '田', 'N4', 'PUBLISHED'),
('宿', 'シュク', 'やど', 'TÚC', 11, '宀', 'N4', 'PUBLISHED')
ON CONFLICT (character) DO UPDATE SET 
    onyomi = EXCLUDED.onyomi, 
    kunyomi = EXCLUDED.kunyomi, 
    meaning_vi = EXCLUDED.meaning_vi, 
    stroke_count = EXCLUDED.stroke_count,
    status = 'PUBLISHED';

-- 3. Seed Topic Items for N4 (Topic 21 đến Topic 24)
-- Topic 21 (会, 動, 歩, 急, 切, 送, 習, 歌)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 21, k.kanji_id, 
  CASE k.character WHEN '会' THEN 1 WHEN '動' THEN 2 WHEN '歩' THEN 3 WHEN '急' THEN 4 WHEN '切' THEN 5 WHEN '送' THEN 6 WHEN '習' THEN 7 WHEN '歌' THEN 8 END,
  CASE k.character 
    WHEN '会' THEN '会う(あう)'
    WHEN '動' THEN '動く(うごく), 動かす(うごかす)'
    WHEN '歩' THEN '歩く(あるく), 散歩する(さんぽする)'
    WHEN '急' THEN '急ぐ(いそぐ)'
    WHEN '切' THEN '切る(きる), 切れる(きれる)'
    WHEN '送' THEN '送る(おくる)'
    WHEN '習' THEN '習う(ならう)'
    WHEN '歌' THEN '歌(うた), 歌う(うたう)'
  END,
  CASE k.character 
    WHEN '会' THEN '会社(かいしゃ), 会議(かいぎ), 会場(かいじょう)'
    WHEN '動' THEN '自動車(じどうしゃ), 動物(どうぶつ), 運動する(うんどうする)'
    WHEN '歩' THEN '散歩(さんぽ)'
    WHEN '急' THEN '急行(きゅうこう), 特急(とっきゅう), 救急車(きゅうきゅうしゃ)'
    WHEN '切' THEN '切符(きっぷ), 切手(きって), 親切(しんせつ)'
    WHEN '送' THEN '送料(そうりょう)'
    WHEN '習' THEN '練習(れんしゅう), 復習(ふくしゅう), 習慣(しゅうかん)'
    WHEN '歌' THEN '歌手(かしゅ)'
  END,
  CASE k.character 
    WHEN '会' THEN 'au, kaisha, kaigi, kaijou'
    WHEN '動' THEN 'ugoku, ugokasu, jidousha, doubutsu, undousuru'
    WHEN '歩' THEN 'aruku, sanposuru, sanpo'
    WHEN '急' THEN 'isogu, kyuukou, tokkyuu, kyuukyuusha'
    WHEN '切' THEN 'kiru, kireru, kippu, kitte, shinsetsu'
    WHEN '送' THEN 'okuru, souryou'
    WHEN '習' THEN 'narau, renshuu, fukushuu, shuukan'
    WHEN '歌' THEN 'uta, utau, kashu'
  END
FROM kanji k WHERE k.character IN ('会', '動', '歩', '急', '切', '送', '習', '歌')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- Topic 22 (終, 社, 銀, 医, 病, 院, 国, 世, 界, 教, 研, 究)
INSERT INTO kanji_topic_items (topic_id, kanji_id, display_order, kun_examples, on_examples, accepted_romaji)
SELECT 22, k.kanji_id, 
  CASE k.character 
    WHEN '終' THEN 1 WHEN '社' THEN 2 WHEN '銀' THEN 3 WHEN '医' THEN 4 
    WHEN '病' THEN 5 WHEN '院' THEN 6 WHEN '国' THEN 7 WHEN '世' THEN 8 
    WHEN '界' THEN 9 WHEN '教' THEN 10 WHEN '研' THEN 11 WHEN '究' THEN 12 
  END,
  CASE k.character 
    WHEN '終' THEN '終わる(おわる), 終わり(おわり)'
    WHEN '社' THEN '神社(じんじゃ)'
    WHEN '国' THEN 'お国(おくに)'
    WHEN '教' THEN '教える(おしえる)'
    ELSE '—'
  END,
  CASE k.character 
    WHEN '終' THEN '終点(しゅうてん)'
    WHEN '社' THEN '本社(ほんしゃ), 会社(かいしゃ)'
    WHEN '銀' THEN '銀行(ぎんこう), 銀行員(ぎんこういん)'
    WHEN '医' THEN '医者(いしゃ), 医学(いがく)'
    WHEN '病' THEN '病院(びょういん), 病気(びょうき)'
    WHEN '院' THEN '入院(にゅういん), 退院(たいいん)'
    WHEN '国' THEN '外国(がいこく), 国際(こくさい)'
    WHEN '世' THEN '世界(せかい), 世紀(せいき)'
    WHEN '界' THEN '世界(せかい)'
    WHEN '教' THEN '教師(きょうし), 教室(きょうしつ)'
    WHEN '研' THEN '研究(けんきゅう), 研究者(けんきゅうしゃ)'
    WHEN '究' THEN '研究(けんきゅう)'
    ELSE '—'
  END,
  CASE k.character 
    WHEN '終' THEN 'owaru, owari, shuuten'
    WHEN '社' THEN 'jinja, honsha, kaisha'
    WHEN '銀' THEN 'ginkou, ginkouin'
    WHEN '医' THEN 'isha, igaku'
    WHEN '病' THEN 'byouin, byouki'
    WHEN '院' THEN 'nyuuin, taiin'
    WHEN '国' THEN 'okuni, gaikoku, kokusai'
    WHEN '世' THEN 'sekai, seiki'
    WHEN '界' THEN 'sekai'
    WHEN '教' THEN 'oshieru, kyoushi, kyoushitsu'
    WHEN '研' THEN 'kenkyuu, kenkyuusha'
    WHEN '究' THEN 'kenkyuu'
    ELSE '—'
  END
FROM kanji k WHERE k.character IN ('終', '社', '銀', '医', '病', '院', '国', '世', '界', '教', '研', '究')
ON CONFLICT (topic_id, kanji_id) DO NOTHING;

-- 4. Seed Reading Sentences for Topic 21 & 22
INSERT INTO kanji_exercises (topic_id, exercise_type, sentence_jp, target_kanji, reading_hiragana, display_order) VALUES
(21, 'READING_SENTENCE', '① 会社(かいしゃ)の 会議(かいぎ)に 遅(おく)れました。', '会社', 'かいしゃ', 1),
(21, 'READING_SENTENCE', '② 散歩(さんぽ)して 公園(こうえん)を 歩(ある)きます。', '歩く', 'あるく', 2),
(21, 'READING_SENTENCE', '③ 救急車(きゅうきゅうしゃ)が 急(いそ)いで 行(い)きます。', '急いで', 'いそいで', 3),
(21, 'READING_SENTENCE', '④ 手紙(てがみ)を 送(おく)ります。', '送る', 'おくる', 4),

(22, 'READING_SENTENCE', '① 医者(いしゃ)に 相談(そうだん)して 病院(びょういん)へ 行(い)きます。', '医者', 'いしゃ', 1),
(22, 'READING_SENTENCE', '② 世界(せかい)の 国際(こくさい) ニュースを 見(み)ます。', '世界', 'せかい', 2),
(22, 'READING_SENTENCE', '③ 教室(きょうしつ)で 先生(せんせい)が 教(おし)えます。', '教室', 'きょうしつ', 3);

-- 5. Seed Quiz Tests for Topic 21 & 22
INSERT INTO kanji_exercises (topic_id, exercise_type, sentence_jp, target_kanji, reading_hiragana, options_json, correct_option, display_order) VALUES
(21, 'QUIZ_TEST', '会社 へ 行きます。', '会社', 'かいしゃ', '["1. かいしゃ", "2. かいぎ", "3. しゃかい", "4. あう"]', 1, 1),
(21, 'QUIZ_TEST', '公園を 歩きます。', '歩きます', 'あるきます', '["1. いそぎます", "2. あるきます", "3. はしります", "4. おくります"]', 2, 2),
(22, 'QUIZ_TEST', '病院 へ 入院します。', '病院', 'びょういん', '["1. びょういん", "2. びょうき", "3. いしゃ", "4. だいがく"]', 1, 1);
