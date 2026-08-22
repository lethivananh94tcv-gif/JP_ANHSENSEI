-- Migration V24: Allow NULL target_lesson_id in import_jobs for multi-lesson auto parsing
ALTER TABLE import_jobs ALTER COLUMN target_lesson_id DROP NOT NULL;
ALTER TABLE import_jobs DROP CONSTRAINT IF EXISTS import_jobs_target_lesson_id_fkey;
ALTER TABLE import_jobs ADD CONSTRAINT import_jobs_target_lesson_id_fkey FOREIGN KEY (target_lesson_id) REFERENCES lessons(lesson_id) ON DELETE SET NULL;
