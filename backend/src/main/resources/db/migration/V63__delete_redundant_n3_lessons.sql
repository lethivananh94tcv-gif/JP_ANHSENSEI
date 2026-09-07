-- Flyway Migration V63: Clean up redundant lessons (sort_order > 15) for level N3

DO $$
DECLARE
    lvl_n3_id BIGINT;
BEGIN
    SELECT level_id INTO lvl_n3_id FROM levels WHERE code = 'N3';

    IF lvl_n3_id IS NOT NULL THEN
        -- Delete vocabulary attached to extra N3 lessons (sort_order > 15)
        DELETE FROM vocabulary WHERE lesson_id IN (
            SELECT lesson_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order > 15
        );

        -- Delete grammar points attached to extra N3 lessons (sort_order > 15)
        DELETE FROM grammar_points WHERE lesson_id IN (
            SELECT lesson_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order > 15
        );

        -- Delete progress records attached to extra N3 lessons (sort_order > 15)
        DELETE FROM learning_progress WHERE lesson_id IN (
            SELECT lesson_id FROM lessons WHERE level_id = lvl_n3_id AND sort_order > 15
        );

        -- Delete redundant lessons for N3 (sort_order > 15)
        DELETE FROM lessons WHERE level_id = lvl_n3_id AND sort_order > 15;
    END IF;
END $$;
