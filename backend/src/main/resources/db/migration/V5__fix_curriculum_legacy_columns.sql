-- Flyway Migration V5: Fix legacy schema column constraints for vocabulary, kanji, and grammar_points

-- 1. vocabulary table: allow vocab_id to be nullable if present from legacy schema
DO $$ 
BEGIN 
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'vocabulary' AND column_name = 'vocab_id'
    ) THEN
        ALTER TABLE vocabulary ALTER COLUMN vocab_id DROP NOT NULL;
    END IF;
END $$;

-- 2. kanji table: allow level_id to be nullable if present from legacy schema
DO $$ 
BEGIN 
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'kanji' AND column_name = 'level_id'
    ) THEN
        ALTER TABLE kanji ALTER COLUMN level_id DROP NOT NULL;
    END IF;
END $$;

-- 3. grammar_points table: allow level_id to be nullable if present from legacy schema
DO $$ 
BEGIN 
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'grammar_points' AND column_name = 'level_id'
    ) THEN
        ALTER TABLE grammar_points ALTER COLUMN level_id DROP NOT NULL;
    END IF;
END $$;
