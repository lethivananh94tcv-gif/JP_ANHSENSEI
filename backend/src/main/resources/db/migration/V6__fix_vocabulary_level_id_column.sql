-- Flyway Migration V6: Drop NOT NULL constraint on level_id in vocabulary table if present

DO $$ 
BEGIN 
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'vocabulary' AND column_name = 'level_id'
    ) THEN
        ALTER TABLE vocabulary ALTER COLUMN level_id DROP NOT NULL;
    END IF;
END $$;
