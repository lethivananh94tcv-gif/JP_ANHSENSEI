-- Flyway Migration V42: Update question_bank check constraint for all 13 format types
ALTER TABLE question_bank DROP CONSTRAINT IF EXISTS ck_qb_type;

ALTER TABLE question_bank ADD CONSTRAINT ck_qb_type CHECK (
    question_type IN (
        'JAPANESE_TO_MEANING',
        'MEANING_TO_JAPANESE',
        'KANJI_TO_READING',
        'HIRAGANA_TO_KANJI',
        'CONTEXTUAL_VOCABULARY',
        'LISTENING_TO_WORD',
        'MULTIPLE_CHOICE',
        'KANJI_READING',
        'KANJI_HAN_VIET',
        'LISTENING',
        'TYPING',
        'FILL_BLANK',
        'STAR_ORDER',
        'MATCHING'
    )
);
