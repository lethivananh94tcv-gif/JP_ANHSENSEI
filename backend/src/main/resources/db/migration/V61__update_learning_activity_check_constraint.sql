-- Flyway Migration V61: Update ck_learning_activity_type check constraint to allow LESSON_ACCESSED

ALTER TABLE learning_activities DROP CONSTRAINT IF EXISTS ck_learning_activity_type;

ALTER TABLE learning_activities ADD CONSTRAINT ck_learning_activity_type 
CHECK (activity_type IN ('CONTENT_COMPLETED', 'LESSON_ACCESSED', 'QUIZ_SUBMITTED', 'FLASHCARD_REVIEWED'));
