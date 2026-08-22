-- Migration V25: Update ck_import_job_mode check constraint to allow OVERWRITE
ALTER TABLE import_jobs DROP CONSTRAINT IF EXISTS ck_import_job_mode;
ALTER TABLE import_jobs ADD CONSTRAINT ck_import_job_mode CHECK (duplicate_mode IN ('SKIP', 'UPDATE', 'OVERWRITE'));
