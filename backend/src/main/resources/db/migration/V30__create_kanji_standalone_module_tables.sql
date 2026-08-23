-- V30: Create Standalone Kanji Module Tables (Kanji Topics, 214 Radicals, Topic Items, Kanji Exercises)

-- 1. Standalone Kanji Topics / Lessons Table
CREATE TABLE IF NOT EXISTS kanji_topics (
    topic_id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,              -- e.g. "第１課", "第２課"
    jlpt_level VARCHAR(10) NOT NULL DEFAULT 'N5', -- N5, N4, N3, N2, N1
    topic_order INT NOT NULL DEFAULT 1,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. 214 Radicals Table
CREATE TABLE IF NOT EXISTS radicals (
    radical_id BIGSERIAL PRIMARY KEY,
    radical_number INT NOT NULL UNIQUE,       -- 1..214
    character VARCHAR(10) NOT NULL,           -- e.g. "一", "丨", "丶"
    name_vi VARCHAR(100) NOT NULL,            -- e.g. "Nhất", "Cổn", "Phẩy"
    stroke_count INT NOT NULL DEFAULT 1,
    meaning_vi TEXT,
    examples TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Standalone Kanji Topic Items (Kanji assigned to Kanji Topics)
CREATE TABLE IF NOT EXISTS kanji_topic_items (
    topic_id BIGINT NOT NULL REFERENCES kanji_topics(topic_id) ON DELETE CASCADE,
    kanji_id BIGINT NOT NULL REFERENCES kanji(kanji_id) ON DELETE CASCADE,
    display_order INT NOT NULL DEFAULT 1,
    kun_examples TEXT,                        -- e.g. "一人(ひとり), 一つ(ひとつ), ※一日(ついたち)"
    on_examples TEXT,                         -- e.g. "一(いち), 一生懸命(いっしょうけんめい)"
    accepted_romaji TEXT,                     -- e.g. "hitori, hitotsu, tsuitachi, ichi, isshoukenmei"
    PRIMARY KEY (topic_id, kanji_id)
);

-- 4. Kanji Exercises (Reading sentences & Test questions for each Kanji topic)
CREATE TABLE IF NOT EXISTS kanji_exercises (
    exercise_id BIGSERIAL PRIMARY KEY,
    topic_id BIGINT NOT NULL REFERENCES kanji_topics(topic_id) ON DELETE CASCADE,
    exercise_type VARCHAR(50) NOT NULL,       -- 'READING_SENTENCE' (漢字を読みましょう), 'QUIZ_TEST' (テスト)
    sentence_jp TEXT NOT NULL,
    target_kanji VARCHAR(100),
    reading_hiragana VARCHAR(200),
    options_json TEXT,                        -- JSON array for options e.g. ["1. さんがつ", "2. さんげつ", "3. ごにち", "4. いつか"]
    correct_option INT,                       -- 1..4
    display_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_kanji_topics_level ON kanji_topics(jlpt_level, topic_order);
CREATE INDEX IF NOT EXISTS idx_radicals_number ON radicals(radical_number);
CREATE INDEX IF NOT EXISTS idx_kanji_exercises_topic ON kanji_exercises(topic_id, exercise_type);
