-- Flyway Migration V13: Make log_id nullable or auto-default if existing in Supabase database
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'audit_logs' AND column_name = 'log_id'
    ) THEN
        ALTER TABLE audit_logs ALTER COLUMN log_id DROP NOT NULL;
    END IF;
END $$;
