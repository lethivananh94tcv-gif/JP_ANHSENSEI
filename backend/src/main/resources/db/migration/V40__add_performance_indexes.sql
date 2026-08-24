-- V40: Add Performance Composite Indexes for Fast Page Loading & Queries

-- 1. Kanji Topics & Items Indexes
CREATE INDEX IF NOT EXISTS idx_kanji_topics_level_order ON kanji_topics(jlpt_level, topic_order);
CREATE INDEX IF NOT EXISTS idx_kanji_topic_items_topic_order ON kanji_topic_items(topic_id, display_order);
CREATE INDEX IF NOT EXISTS idx_kanji_exercises_topic_type_order ON kanji_exercises(topic_id, exercise_type, display_order);
CREATE INDEX IF NOT EXISTS idx_radicals_number_stroke ON radicals(radical_number, stroke_count);
CREATE INDEX IF NOT EXISTS idx_kanji_char ON kanji(character);

-- 2. Curriculum Core Indexes (Lessons, Vocabulary, Grammar)
CREATE INDEX IF NOT EXISTS idx_lessons_level_status_order ON lessons(level_id, status, sort_order);
CREATE INDEX IF NOT EXISTS idx_vocabulary_lesson_order ON vocabulary(lesson_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_grammar_points_lesson_order ON grammar_points(lesson_id, sort_order);

-- 3. Quizzes & Assessment Indexes
CREATE INDEX IF NOT EXISTS idx_quizzes_lesson_status ON quizzes(lesson_id, status);
CREATE INDEX IF NOT EXISTS idx_questions_quiz_order ON questions(quiz_id, sort_order);

-- 4. Learning & Flashcard Progress Indexes
CREATE INDEX IF NOT EXISTS idx_learning_progress_user_lesson ON learning_progress(user_id, lesson_id);
CREATE INDEX IF NOT EXISTS idx_flashcard_progress_user_next ON flashcard_progress(user_id, next_review_at);
