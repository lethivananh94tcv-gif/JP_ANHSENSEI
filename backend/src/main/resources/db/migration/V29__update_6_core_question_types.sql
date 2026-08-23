-- Flyway Migration V29: Update Question Bank Check Constraints for 6 Core Question Types

ALTER TABLE question_bank DROP CONSTRAINT IF EXISTS ck_qb_type;

ALTER TABLE question_bank ADD CONSTRAINT ck_qb_type CHECK (
    question_type IN (
        'JAPANESE_TO_MEANING',
        'MEANING_TO_JAPANESE',
        'KANJI_TO_READING',
        'HIRAGANA_TO_KANJI',
        'CONTEXTUAL_VOCABULARY',
        'LISTENING_TO_WORD',
        'MULTIPLE_CHOICE',
        'LISTENING',
        'TYPING'
    )
);

-- Update default questions_per_attempt to 20 and time_limit_minutes to 10 for quizzes
ALTER TABLE quizzes ALTER COLUMN questions_per_attempt SET DEFAULT 20;
ALTER TABLE quizzes ALTER COLUMN time_limit_minutes SET DEFAULT 10;
