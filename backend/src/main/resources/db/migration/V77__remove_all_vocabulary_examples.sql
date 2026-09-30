-- Flyway Migration V77: Remove all vocabulary example sentences from database to clean up memory/storage

-- 1. Clear example columns in vocabulary table
UPDATE vocabulary 
SET example_jp = NULL, 
    example_vi = NULL, 
    example_reading = NULL, 
    usage_note = NULL;

-- 2. Delete all vocabulary example records from the polymorphic examples table
DELETE FROM examples 
WHERE content_type = 'VOCABULARY';
