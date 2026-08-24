-- V41: Add category column to question_bank table
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS category VARCHAR(30) DEFAULT 'VOCAB';

CREATE INDEX IF NOT EXISTS idx_question_bank_lesson_category ON question_bank(lesson_id, category, status);
