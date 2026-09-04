-- V58: Add official_answer_key_json to jlpt_exam_versions and reset old mock answer data

ALTER TABLE jlpt_exam_versions ADD COLUMN IF NOT EXISTS official_answer_key_json TEXT;

-- Reset old mock attempt answers so grading starts 100% fresh with official scanned keys
TRUNCATE TABLE jlpt_exam_attempts CASCADE;
