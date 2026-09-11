# Rules for JP_ANHSENSEI Project Development & Quality Assurance

## 1. Curriculum & Example Sentence Integrity
- **Zero Fallback Generators**: NEVER use generic string concatenation or template fillers (e.g. `仕事で ...を 大切に使います`, `...を活用しています`, `毎日 [Động từ].`, `「...」は とても 大切な 言葉です`).
- **Authentic Japanese Standard**: Every single example sentence must be a 100% natural, grammatically correct, context-appropriate Japanese sentence with accurate furigana/readings and precise Vietnamese translations.
- **Database Precision**: When seeding or fixing vocabulary data, update rows by primary key (`vocabulary_id`) or exact `(level_code, lesson_sort_order, vocab_sort_order)` tuples. Preserve all high-quality seed data (such as the 1,450 authentic entries in `V66`) while systematically removing low-quality filler entries.

## 2. Verb Conjugation Engine & Dataset Rules
- **No Naive Concatenation**: NEVER perform blind string suffixing (such as `verb + "ます"`). All verb inflections MUST pass through the full `detectGroup` logic (Group 1 Godan, Group 2 Ichidan, Group 3 Suru/Kuru).
- **Format Normalization**: Handle both MASU-form stored verbs and Dictionary-form stored verbs gracefully in `verbConjugator.ts` so that no invalid forms (e.g., `愛するます`) can ever be generated.
- **Multi-Input Support**: Always support Hiragana, Kanji, and Romaji input (including Hepburn, Kunrei-shiki, and long-vowel variations like `ou`/`o`/`oo`) across all learner typing practice modes.

## 3. Cache Purge & Verification Workflow
- After database or dataset updates, purge frontend build cache (`frontend/.next`) and verify endpoints via API tests to ensure no stale data is served to the user.
