-- Flyway Migration V64: Add example sentence, translation, reading, and usage note columns to vocabulary table
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS example_jp TEXT;
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS example_vi TEXT;
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS example_reading TEXT;
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS usage_note TEXT;
