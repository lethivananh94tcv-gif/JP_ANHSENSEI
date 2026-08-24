package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.Lesson;
import com.anhsensei.curriculum.domain.QuestionBank;
import com.anhsensei.curriculum.domain.QuestionBankOption;
import com.anhsensei.curriculum.domain.Quiz;
import com.anhsensei.curriculum.domain.Vocabulary;
import com.anhsensei.curriculum.repository.LessonRepository;
import com.anhsensei.curriculum.repository.QuestionBankRepository;
import com.anhsensei.curriculum.repository.QuizRepository;
import com.anhsensei.curriculum.repository.VocabularyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminQuestionBankService {

    private final QuestionBankRepository questionBankRepository;
    private final LessonRepository lessonRepository;
    private final QuizRepository quizRepository;
    private final VocabularyRepository vocabularyRepository;

    public AdminQuestionBankService(
            QuestionBankRepository questionBankRepository,
            LessonRepository lessonRepository,
            QuizRepository quizRepository,
            VocabularyRepository vocabularyRepository) {
        this.questionBankRepository = questionBankRepository;
        this.lessonRepository = lessonRepository;
        this.quizRepository = quizRepository;
        this.vocabularyRepository = vocabularyRepository;
    }

    private Lesson resolveLesson(Long lessonId) {
        if (lessonId == null) throw new IllegalArgumentException("Lesson ID không được để trống");
        return lessonRepository.findById(lessonId).orElseGet(() -> {
            if (lessonId > 25 && lessonId <= 50) {
                // Canonical N4 lesson number -> maps to sortOrder (lessonId - 25)
                int sortOrder = (int) (lessonId - 25);
                return lessonRepository.findFirstByLevel_CodeIgnoreCaseAndSortOrderAndStatusAndDeletedAtIsNull("N4", sortOrder, "PUBLISHED")
                        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài học N4 Bài #" + sortOrder));
            }
            throw new IllegalArgumentException("Không tìm thấy bài học ID = " + lessonId);
        });
    }

    @Transactional
    public List<QuestionBank> getQuestionsByLessonId(Long lessonId) {
        Lesson lesson = resolveLesson(lessonId);
        List<QuestionBank> list = questionBankRepository.findQuestionsWithOptionsByLessonId(lesson.getLessonId());

        if (list == null || list.isEmpty()) {
            return generate30JLPTQuestionsForLesson(lessonId, 1L, true);
        }

        list.forEach(q -> {
            if (q.getOptions() != null) {
                q.getOptions().size();
            }
        });
        return list;
    }

    @Transactional
    public QuestionBank createQuestion(QuestionBank question, Long lessonId, Long adminUserId) {
        Lesson lesson = resolveLesson(lessonId);
        
        question.setQuestionId(null);
        question.setLesson(lesson);
        question.setCreatedBy(adminUserId);
        question.setUpdatedBy(adminUserId);
        question.setCreatedAt(OffsetDateTime.now());
        question.setUpdatedAt(OffsetDateTime.now());
        if (question.getCategory() == null) {
            question.setCategory("VOCAB");
        }
        if (question.getStatus() == null) {
            question.setStatus("ACTIVE");
        }
        if (question.getWeight() == null) {
            question.setWeight(new BigDecimal("1.00"));
        }

        if (question.getValidAnswers() != null && !question.getValidAnswers().isBlank()) {
            String va = question.getValidAnswers().trim();
            if (!va.startsWith("[") && !va.startsWith("{")) {
                question.setValidAnswers("[\"" + va.replace("\"", "\\\"") + "\"]");
            }
        } else {
            question.setValidAnswers("[\"わたし\"]");
        }

        if (question.getOptions() != null) {
            question.getOptions().forEach(opt -> {
                opt.setOptionId(null);
                opt.setQuestionBank(question);
            });
        }

        return questionBankRepository.save(question);
    }

    @Transactional
    public QuestionBank updateQuestion(Long questionId, QuestionBank updateData, Long adminUserId) {
        QuestionBank existing = questionBankRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy câu hỏi kho đề ID = " + questionId));

        existing.setCategory(updateData.getCategory());
        existing.setQuestionType(updateData.getQuestionType());
        existing.setDifficulty(updateData.getDifficulty());
        existing.setPrompt(updateData.getPrompt());
        existing.setJapaneseText(updateData.getJapaneseText());
        if (updateData.getValidAnswers() != null && !updateData.getValidAnswers().isBlank()) {
            String va = updateData.getValidAnswers().trim();
            if (!va.startsWith("[") && !va.startsWith("{")) {
                existing.setValidAnswers("[\"" + va.replace("\"", "\\\"") + "\"]");
            } else {
                existing.setValidAnswers(va);
            }
        }
        existing.setExplanation(updateData.getExplanation());
        existing.setStatus(updateData.getStatus());
        existing.setUpdatedBy(adminUserId);

        if (updateData.getOptions() != null) {
            existing.setOptions(updateData.getOptions());
        }

        return questionBankRepository.save(existing);
    }

    @Transactional
    public void softDeleteQuestion(Long questionId) {
        QuestionBank question = questionBankRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy câu hỏi ID = " + questionId));
        question.setDeletedAt(OffsetDateTime.now());
        question.setStatus("INACTIVE");
        questionBankRepository.save(question);
    }

    @Transactional
    public int approveAllDraftQuestionsForLesson(Long lessonId) {
        Lesson lesson = resolveLesson(lessonId);
        List<QuestionBank> drafts = questionBankRepository.findQuestionsWithOptionsByLessonId(lesson.getLessonId());
        int approvedCount = 0;
        for (QuestionBank q : drafts) {
            if ("DRAFT".equals(q.getStatus())) {
                q.setStatus("ACTIVE");
                approvedCount++;
            }
        }
        questionBankRepository.saveAll(drafts);
        return approvedCount;
    }

    /**
     * Rule 5 & JLPT Alignment: Generate exactly 30 JLPT-aligned vocabulary questions.
     * Covers 5 JLPT N5/N4 formats: Kanji reading, Contextual sentence, Meaning/synonym, Audio listening, Typing.
     */
    public List<QuestionBank> autoGenerateQuestionsForLesson(Long lessonId, Long adminUserId) {
        return generate30JLPTQuestionsForLesson(lessonId, adminUserId, false);
    }

    public List<QuestionBank> generateAll4CategoriesForLesson(Long lessonId, Long adminUserId) {
        Lesson lesson = resolveLesson(lessonId);
        List<QuestionBank> oldQuestions = questionBankRepository.findQuestionsWithOptionsByLessonId(lesson.getLessonId());
        if (!oldQuestions.isEmpty()) {
            questionBankRepository.deleteAll(oldQuestions);
        }
        List<QuestionBank> list = new ArrayList<>();
        list.addAll(generateQuestionsForLessonByMode(lessonId, "VOCAB", adminUserId, true));
        list.addAll(generateQuestionsForLessonByMode(lessonId, "KANJI", adminUserId, true));
        list.addAll(generateQuestionsForLessonByMode(lessonId, "GRAMMAR", adminUserId, true));
        list.addAll(generate30JLPTQuestionsForLesson(lessonId, adminUserId, true));
        return list;
    }

    public List<QuestionBank> generateQuestionsForLessonByMode(Long lessonId, String mode, Long adminUserId, boolean setAsActive) {
        String targetCategory = mode != null ? mode.toUpperCase() : "FULL";
        Lesson lesson = resolveLesson(lessonId);

        // Delete existing questions of the requested category or all if FULL
        List<QuestionBank> oldQuestions = questionBankRepository.findQuestionsWithOptionsByLessonId(lesson.getLessonId());
        if (!oldQuestions.isEmpty()) {
            if ("FULL".equals(targetCategory)) {
                questionBankRepository.deleteAll(oldQuestions);
            } else {
                List<QuestionBank> filteredOld = oldQuestions.stream()
                        .filter(q -> targetCategory.equalsIgnoreCase(q.getCategory()))
                        .collect(Collectors.toList());
                if (!filteredOld.isEmpty()) {
                    questionBankRepository.deleteAll(filteredOld);
                }
            }
        }

        if ("FULL".equals(targetCategory)) {
            return generate30JLPTQuestionsForLesson(lessonId, adminUserId, setAsActive);
        }

        List<Vocabulary> vocabList = vocabularyRepository.findByLesson_LessonIdOrderBySortOrderAsc(lesson.getLessonId());
        if (vocabList.isEmpty()) {
            vocabList = vocabularyRepository.findAll().stream().limit(50).collect(Collectors.toList());
        }
        Collections.shuffle(vocabList);

        List<QuestionBank> generatedQuestions = new ArrayList<>();
        String statusToSet = setAsActive ? "ACTIVE" : "DRAFT";
        int targetCount = 30;

        for (int i = 0; i < targetCount; i++) {
            Vocabulary item = vocabList.get(i % vocabList.size());
            List<Vocabulary> catDistractors = getQualityDistractors(item, vocabList);

            QuestionBank q = new QuestionBank();
            q.setLesson(lesson);
            q.setCategory(targetCategory);
            q.setCreatedBy(adminUserId);
            q.setUpdatedBy(adminUserId);
            q.setStatus(statusToSet);
            q.setDifficulty((i % 2 == 0) ? "MEDIUM" : "EASY");

            String mainWord = item.getWord() != null ? item.getWord() : item.getKana();
            String kanjiForm = item.getKanjiForm() != null ? item.getKanjiForm() : mainWord;
            String kanaWord = item.getKana() != null ? item.getKana() : mainWord;

            if ("VOCAB".equals(targetCategory)) {
                if (i % 3 == 0) {
                    q.setQuestionType("MULTIPLE_CHOICE");
                    q.setPrompt("📖 [TỪ VỰNG] Chọn nghĩa tiếng Việt đúng của từ 「 " + mainWord + " 」");
                    q.setJapaneseText("「 " + mainWord + " 」");
                    q.setExplanation("Nghĩa tiếng Việt chuẩn xác của " + mainWord + " là: " + item.getMeaningVi());

                    List<QuestionBankOption> options = new ArrayList<>();
                    options.add(new QuestionBankOption(item.getMeaningVi(), true, 1));
                    for (Vocabulary d : catDistractors) {
                        options.add(new QuestionBankOption(d.getMeaningVi(), false, options.size() + 1));
                    }
                    Collections.shuffle(options);
                    for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                    q.setOptions(options);
                } else if (i % 3 == 1) {
                    q.setQuestionType("LISTENING");
                    q.setPrompt("🔊 [LUYỆN NGHE] Nghe âm thanh phát âm và chọn nghĩa tiếng Việt đúng");
                    q.setJapaneseText("🔊 「 " + kanaWord + " 」");
                    q.setAudioText(kanaWord);
                    q.setTranscript(mainWord + " (" + kanaWord + ") : " + item.getMeaningVi());
                    q.setExplanation("Âm thanh phát âm: " + kanaWord + " ➔ Nghĩa tiếng Việt: " + item.getMeaningVi());

                    List<QuestionBankOption> options = new ArrayList<>();
                    String optText = mainWord + " (" + item.getMeaningVi() + ")";
                    options.add(new QuestionBankOption(optText, true, 1));
                    for (Vocabulary d : catDistractors) {
                        String dWord = d.getWord() != null ? d.getWord() : d.getKana();
                        options.add(new QuestionBankOption(dWord + " (" + d.getMeaningVi() + ")", false, options.size() + 1));
                    }
                    Collections.shuffle(options);
                    for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                    q.setOptions(options);
                } else {
                    q.setQuestionType("TYPING");
                    q.setPrompt("⌨️ [LUYỆN GÕ] Gõ từ tiếng Nhật tương ứng với nghĩa dưới đây");
                    q.setJapaneseText("「 " + item.getMeaningVi() + " 」");
                    q.setValidAnswers("[\"" + kanaWord + "\", \"" + mainWord + "\"]");
                    List<QuestionBankOption> options = new ArrayList<>();
                    options.add(new QuestionBankOption(kanaWord, true, 1));
                    for (Vocabulary d : catDistractors) {
                        String dKana = d.getKana() != null ? d.getKana() : (d.getWord() != null ? d.getWord() : "ほん");
                        options.add(new QuestionBankOption(dKana, false, options.size() + 1));
                    }
                    Collections.shuffle(options);
                    for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                    q.setOptions(options);
                }
            } else if ("KANJI".equals(targetCategory)) {
                q.setQuestionType("KANJI_READING");
                q.setPrompt("✍️ [HÁN TỰ KANJI] Chọn âm đọc Hiragana chuẩn xác cho chữ Hán 「 " + kanjiForm + " 」");
                q.setJapaneseText("「 " + kanjiForm + " 」");
                q.setExplanation("Cách đọc chuẩn xác của " + kanjiForm + " là: " + kanaWord + " (Âm Hán: " + item.getMeaningVi() + ")");

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption(kanaWord, true, 1));
                for (Vocabulary d : catDistractors) {
                    String dKana = d.getKana() != null ? d.getKana() : "ほん";
                    options.add(new QuestionBankOption(dKana, false, options.size() + 1));
                }
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);
            } else {
                // GRAMMAR
                if (i % 2 == 0) {
                    q.setQuestionType("FILL_BLANK");
                    q.setPrompt("_____ [NGỮ PHÁP] Chọn trợ từ thích hợp điền vào chỗ khuyết");
                    q.setJapaneseText("わたし _____ たなかです。");
                    q.setExplanation("Trợ từ chỉ chủ đề là は (wa)");

                    List<QuestionBankOption> options = new ArrayList<>();
                    options.add(new QuestionBankOption("は (wa)", true, 1));
                    options.add(new QuestionBankOption("が (ga)", false, 2));
                    options.add(new QuestionBankOption("に (ni)", false, 3));
                    options.add(new QuestionBankOption("で (de)", false, 4));
                    Collections.shuffle(options);
                    for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                    q.setOptions(options);
                } else {
                    q.setQuestionType("STAR_ORDER");
                    q.setPrompt("★ [SẮP XẾP JLPT] Chọn từ đúng tại vị trí dấu ngôi sao ★ trong câu");
                    q.setJapaneseText("わたし は ＿＿＿ ★ ＿＿＿ です。");
                    q.setExplanation("Vị trí dấu ngôi sao ★ là: の");

                    List<QuestionBankOption> options = new ArrayList<>();
                    options.add(new QuestionBankOption("の", true, 1));
                    options.add(new QuestionBankOption("ベトナムじん", false, 2));
                    options.add(new QuestionBankOption("がくせい", false, 3));
                    options.add(new QuestionBankOption("は", false, 4));
                    Collections.shuffle(options);
                    for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                    q.setOptions(options);
                }
            }

            generatedQuestions.add(questionBankRepository.save(q));
        }

        ensureQuizPublishedForLesson(lesson, adminUserId);
        return generatedQuestions;
    }

    @Transactional
    public List<QuestionBank> generate30JLPTQuestionsForLesson(Long lessonId, Long adminUserId, boolean setAsActive) {
        Lesson lesson = resolveLesson(lessonId);

        // Delete previous question bank rows natively to ensure clean slate
        try {
            questionBankRepository.deleteOptionsByLessonIdNative(lesson.getLessonId());
            questionBankRepository.deleteQuestionsByLessonIdNative(lesson.getLessonId());
        } catch (Exception ignored) {}

        List<Vocabulary> vocabList = vocabularyRepository.findByLesson_LessonIdOrderBySortOrderAsc(lesson.getLessonId());
        if (vocabList.isEmpty()) {
            // Fallback try all vocabularies from DB if lesson vocab is empty
            vocabList = vocabularyRepository.findAll().stream().limit(50).collect(Collectors.toList());
        }
        if (vocabList.isEmpty()) {
            throw new IllegalStateException("Hệ thống chưa có dữ liệu từ vựng thực tế trong DB để sinh đề!");
        }

        // Shuffle vocabulary list to generate a fresh new randomized question set every time!
        Collections.shuffle(vocabList);

        List<QuestionBank> generatedQuestions = new ArrayList<>();
        String statusToSet = setAsActive ? "ACTIVE" : "DRAFT";

        int targetCount = 30;
        for (int i = 0; i < targetCount; i++) {
            Vocabulary item = vocabList.get(i % vocabList.size());
            List<Vocabulary> catDistractors = getQualityDistractors(item, vocabList);

            // 0..7 (8 câu): MULTIPLE_CHOICE (Vocab: Nhật ➔ Việt & Việt ➔ Nhật)
            // 8..13 (6 câu): KANJI_READING (Kanji: Âm Hán Việt & Hiragana)
            // 14..18 (5 câu): LISTENING (Luyện Nghe TTS thuần âm thanh, KHÔNG HIỂN THỊ CHỮ)
            // 19..23 (5 câu): TYPING (Luyện Gõ / Tự Nhập với validAnswers & options)
            // 24..26 (3 câu): FILL_BLANK (Ngữ Pháp: Điền trợ từ vào chỗ khuyết _____ )
            // 27..29 (3 câu): STAR_ORDER (Ngữ Pháp: Sắp xếp vị trí dấu ngôi sao ★ JLPT)
            String qType;
            if (i <= 7) qType = "MULTIPLE_CHOICE";
            else if (i <= 13) qType = "KANJI_READING";
            else if (i <= 18) qType = "LISTENING";
            else if (i <= 23) qType = "TYPING";
            else if (i <= 26) qType = "FILL_BLANK";
            else qType = "STAR_ORDER";

            QuestionBank q = new QuestionBank();
            q.setLesson(lesson);
            q.setCreatedBy(adminUserId);
            q.setUpdatedBy(adminUserId);
            q.setStatus(statusToSet);
            q.setDifficulty((i % 3 == 0) ? "HARD" : (i % 2 == 0 ? "EASY" : "MEDIUM"));

            String mainWord = item.getWord() != null ? item.getWord() : item.getKana();
            String kanjiForm = item.getKanjiForm() != null ? item.getKanjiForm() : mainWord;
            String kanaWord = item.getKana() != null ? item.getKana() : mainWord;

            if ("MULTIPLE_CHOICE".equals(qType)) {
                // Dạng 1: Trắc Nghiệm Từ Vựng (6 câu)
                q.setCategory("VOCAB");
                q.setQuestionType("MULTIPLE_CHOICE");
                if (i % 2 == 0) {
                    q.setPrompt("📖 [TỪ VỰNG] Chọn nghĩa tiếng Việt đúng của từ 「 " + mainWord + " 」");
                    q.setJapaneseText("「 " + mainWord + " 」");
                    q.setExplanation("Nghĩa tiếng Việt chuẩn xác của " + mainWord + " (" + kanaWord + ") là: " + item.getMeaningVi());

                    List<QuestionBankOption> options = new ArrayList<>();
                    options.add(new QuestionBankOption(item.getMeaningVi(), true, 1));
                    for (Vocabulary d : catDistractors) {
                        options.add(new QuestionBankOption(d.getMeaningVi(), false, options.size() + 1));
                    }
                    Collections.shuffle(options);
                    for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                    q.setOptions(options);
                } else {
                    q.setPrompt("📖 [TỪ VỰNG] Chọn từ tiếng Nhật tương ứng với nghĩa 「 " + item.getMeaningVi() + " 」");
                    q.setJapaneseText("「 " + item.getMeaningVi() + " 」");
                    q.setExplanation("Từ tiếng Nhật mang nghĩa \"" + item.getMeaningVi() + "\" là: " + mainWord + " (" + kanaWord + ")");

                    List<QuestionBankOption> options = new ArrayList<>();
                    options.add(new QuestionBankOption(mainWord, true, 1));
                    for (Vocabulary d : catDistractors) {
                        String dWord = d.getWord() != null ? d.getWord() : d.getKana();
                        options.add(new QuestionBankOption(dWord, false, options.size() + 1));
                    }
                    Collections.shuffle(options);
                    for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                    q.setOptions(options);
                }

            } else if ("KANJI_READING".equals(qType)) {
                // Dạng 2: Hán Tự & Âm Đọc Kanji (5 câu)
                q.setCategory("KANJI");
                q.setQuestionType("KANJI_READING");
                q.setPrompt("✍️ [HÁN TỰ] Chọn cách đọc Hiragana / Kana đúng của chữ 「 " + kanjiForm + " 」");
                q.setJapaneseText("「 " + kanjiForm + " 」");
                q.setExplanation("Cách đọc Kana chuẩn xác của Hán tự " + kanjiForm + " là: " + kanaWord + " (Nghĩa: " + item.getMeaningVi() + ")");

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption(kanaWord, true, 1));
                for (Vocabulary d : catDistractors) {
                    String dKana = d.getKana() != null ? d.getKana() : (d.getWord() != null ? d.getWord() : "ほん");
                    options.add(new QuestionBankOption(dKana, false, options.size() + 1));
                }
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);

            } else if ("LISTENING".equals(qType)) {
                // Dạng 3: Luyện Nghe phát âm TTS (5 câu)
                q.setCategory("VOCAB");
                q.setQuestionType("LISTENING");
                q.setPrompt("🔊 [LUYỆN NGHE] Nghe âm thanh phát âm và chọn nghĩa tiếng Việt đúng");
                q.setJapaneseText("🔊 「 " + kanaWord + " 」");
                q.setAudioText(kanaWord);
                q.setTranscript(mainWord + " (" + kanaWord + ") : " + item.getMeaningVi());
                q.setExplanation("Âm thanh phát âm: " + kanaWord + " ➔ Nghĩa tiếng Việt: " + item.getMeaningVi());

                List<QuestionBankOption> options = new ArrayList<>();
                String optText = mainWord + " (" + item.getMeaningVi() + ")";
                options.add(new QuestionBankOption(optText, true, 1));
                for (Vocabulary d : catDistractors) {
                    String dWord = d.getWord() != null ? d.getWord() : d.getKana();
                    options.add(new QuestionBankOption(dWord + " (" + d.getMeaningVi() + ")", false, options.size() + 1));
                }
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);

            } else if ("TYPING".equals(qType)) {
                // Dạng 4: Luyện Gõ / Tự Nhập (5 câu) - DÙNG validAnswers
                q.setCategory("VOCAB");
                q.setQuestionType("TYPING");
                q.setPrompt("⌨️ [LUYỆN GÕ] Gõ từ tiếng Nhật tương ứng với nghĩa dưới đây");
                q.setJapaneseText("「 " + item.getMeaningVi() + " 」");
                q.setValidAnswers("[\"" + kanaWord + "\", \"" + mainWord + "\"]");
                q.setExplanation("Đáp án gõ chính xác: " + kanaWord + " hoặc " + mainWord);

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption(kanaWord, true, 1));
                for (Vocabulary d : catDistractors) {
                    String dKana = d.getKana() != null ? d.getKana() : (d.getWord() != null ? d.getWord() : "ほん");
                    options.add(new QuestionBankOption(dKana, false, options.size() + 1));
                }
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);

            } else if ("FILL_BLANK".equals(qType)) {
                // Dạng 5: Điền Trợ Từ Ngữ Pháp (4 câu)
                q.setCategory("GRAMMAR");
                q.setQuestionType("FILL_BLANK");
                q.setPrompt("_____ [NGỮ PHÁP] Chọn trợ từ thích hợp điền vào câu dưới đây");
                q.setJapaneseText("わたし _____ たなかです。");
                q.setExplanation("Trợ từ chỉ chủ đề câu là 「 は (wa) 」: わたしはたなかです。");

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption("は (wa)", true, 1));
                options.add(new QuestionBankOption("が (ga)", false, 2));
                options.add(new QuestionBankOption("に (ni)", false, 3));
                options.add(new QuestionBankOption("で (de)", false, 4));
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);

            } else if ("STAR_ORDER".equals(qType)) {
                // Dạng 6: Sắp Xếp Câu JLPT ★ (3 câu)
                q.setCategory("GRAMMAR");
                q.setQuestionType("STAR_ORDER");
                q.setPrompt("★ [SẮP XẾP JLPT] Chọn từ đúng điền vào vị trí ngôi sao ★ trong câu");
                q.setJapaneseText("わたし は ＿＿＿ ★ ＿＿＿ です。");
                q.setExplanation("Cấu trúc câu hoàn chỉnh: わたし は [ベトナムじん] ★[の] [がくせい] です。 (Ngôi sao ở vị trí thứ 3: の)");

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption("の", true, 1));
                options.add(new QuestionBankOption("ベトナムじん", false, 2));
                options.add(new QuestionBankOption("がくせい", false, 3));
                options.add(new QuestionBankOption("は", false, 4));
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);

            }

            generatedQuestions.add(questionBankRepository.save(q));
        }

        // Auto ensure Quiz row exists and has questionsPerAttempt = 30
        ensureQuizPublishedForLesson(lesson, adminUserId);

        return generatedQuestions;
    }

    private boolean isDemonstrative(Vocabulary v) {
        if (v == null) return false;
        String w = v.getWord() != null ? v.getWord().toLowerCase() : "";
        String k = v.getKana() != null ? v.getKana().toLowerCase() : "";
        String m = v.getMeaningVi() != null ? v.getMeaningVi().toLowerCase() : "";

        return w.contains("これ") || w.contains("それ") || w.contains("あれ") || w.contains("どれ") ||
               w.contains("この") || w.contains("その") || w.contains("あの") ||
               k.contains("これ") || k.contains("それ") || k.contains("あれ") || k.contains("どれ") ||
               m.contains("cái này") || m.contains("cái đó") || m.contains("cái kia") || m.contains("cái nào") ||
               m.contains("cái") || m.startsWith("~ này") || m.startsWith("~ đó") || m.startsWith("~ kia");
    }

    private List<Vocabulary> getQualityDistractors(Vocabulary item, List<Vocabulary> vocabList) {
        boolean itemIsDemonstrative = isDemonstrative(item);

        List<Vocabulary> candidates = vocabList.stream()
                .filter(v -> !v.getVocabularyId().equals(item.getVocabularyId()))
                .filter(v -> {
                    boolean vIsDemonstrative = isDemonstrative(v);
                    if (itemIsDemonstrative) {
                        return vIsDemonstrative; // Demonstrative questions ONLY get demonstrative distractors
                    } else {
                        return !vIsDemonstrative; // Noun questions NEVER get demonstrative distractors
                    }
                })
                .collect(Collectors.toList());

        Collections.shuffle(candidates);

        if (candidates.size() < 3) {
            List<Vocabulary> fallback = vocabList.stream()
                    .filter(v -> !v.getVocabularyId().equals(item.getVocabularyId()))
                    .filter(v -> !candidates.contains(v))
                    .collect(Collectors.toList());
            Collections.shuffle(fallback);
            for (Vocabulary f : fallback) {
                candidates.add(f);
                if (candidates.size() >= 3) break;
            }
        }

        return candidates.stream().limit(3).collect(Collectors.toList());
    }

    private List<String> getPhoneticDistractors(Vocabulary item) {
        String kana = item.getKana() != null ? item.getKana() : (item.getWord() != null ? item.getWord() : "ほん");
        List<String> list = new ArrayList<>();
        if (kana.endsWith("つ")) {
            list.add(kana.substring(0, kana.length() - 1) + "ひつ");
            list.add(kana.substring(0, kana.length() - 1) + "びつ");
            list.add(kana.substring(0, kana.length() - 1) + "いつ");
        } else if (kana.contains("ぴ")) {
            list.add(kana.replace("ぴ", "ひ"));
            list.add(kana.replace("ぴ", "び"));
            list.add(kana.replace("ぴ", "い"));
        } else if (kana.contains("じ")) {
            list.add(kana.replace("じ", "し"));
            list.add(kana.replace("じ", "ち"));
            list.add(kana.replace("じ", "ざ"));
        } else if (kana.contains("ん")) {
            list.add(kana.replace("ん", "む"));
            list.add(kana.replace("ん", "な"));
            list.add(kana.replace("ん", "う"));
        } else {
            list.add(kana + "う");
            list.add(kana + "ん");
            list.add(kana + "い");
        }
        return list.stream().limit(3).collect(Collectors.toList());
    }

    private List<String> getKanjiDistractors(Vocabulary item) {
        String kanji = item.getKanjiForm() != null ? item.getKanjiForm() : (item.getWord() != null ? item.getWord() : "本");
        List<String> list = new ArrayList<>();
        if ("本".equals(kanji)) {
            list.add("木"); list.add("休"); list.add("中");
        } else if ("辞書".equals(kanji)) {
            list.add("字書"); list.add("辞者"); list.add("自書");
        } else if ("新聞".equals(kanji)) {
            list.add("新文"); list.add("親聞"); list.add("新問");
        } else if ("鉛筆".equals(kanji)) {
            list.add("円筆"); list.add("鉛文"); list.add("円文");
        } else if ("時計".equals(kanji)) {
            list.add("時形"); list.add("土計"); list.add("時計");
        } else {
            list.add(kanji + "文");
            list.add("円" + kanji);
            list.add(kanji + "字");
        }
        return list.stream().limit(3).collect(Collectors.toList());
    }

    /**
     * Automatic On-demand Initializer: Ensures lesson has at least 30 ACTIVE questions.
     * Triggered automatically when learner opens a quiz.
     */
    public void ensureQuestionBankExistsForLesson(Long lessonId) {
        Lesson lesson = resolveLesson(lessonId);
        List<QuestionBank> existing = questionBankRepository.findByLesson_LessonIdAndDeletedAtIsNullOrderByQuestionIdDesc(lesson.getLessonId());

        boolean hasStaleDistractors = existing.isEmpty() || existing.stream().anyMatch(q -> {
            String txt = q.getJapaneseText() != null ? q.getJapaneseText().toLowerCase() : "";
            boolean isNonDemonstrative = !txt.contains("これ") && !txt.contains("それ") && !txt.contains("あれ") && !txt.contains("どれ");
            if (isNonDemonstrative && q.getOptions() != null) {
                return q.getOptions().stream().anyMatch(opt -> {
                    String optTxt = opt.getOptionText() != null ? opt.getOptionText().toLowerCase() : "";
                    return optTxt.contains("cái này") || optTxt.contains("cái đó") || optTxt.contains("cái kia") || optTxt.contains("cái nào");
                });
            }
            return false;
        });

        if (hasStaleDistractors || existing.size() < 30) {
            generate30JLPTQuestionsForLesson(lessonId, 1L, true);
        } else {
            ensureQuizPublishedForLesson(lesson, 1L);
        }
    }

    private Quiz ensureQuizPublishedForLesson(Lesson lesson, Long adminUserId) {
        Quiz quiz = quizRepository.findByLesson_LessonId(lesson.getLessonId())
                .orElseGet(() -> {
                    Quiz q = new Quiz();
                    q.setLesson(lesson);
                    q.setTitle("Quiz Kiểm Tra: " + lesson.getTitle());
                    q.setDescription("Bộ Quiz 30 câu kiểm tra từ vựng Minna no Nihongo bài " + lesson.getSortOrder());
                    q.setPassScore(new java.math.BigDecimal("70.00"));
                    q.setTimeLimitMinutes(10);
                    q.setQuestionsPerAttempt(30); // 30 câu hỏi theo form mẫu
                    return q;
                });

        quiz.setQuestionsPerAttempt(30);
        quiz.setStatus("PUBLISHED");
        quiz.setPublishedAt(OffsetDateTime.now());
        quiz.setUpdatedBy(adminUserId);

        return quizRepository.save(quiz);
    }

    public Quiz publishQuizForLesson(Long lessonId, Long adminUserId) {
        Lesson lesson = resolveLesson(lessonId);
        return ensureQuizPublishedForLesson(lesson, adminUserId);
    }

    public Quiz unpublishQuizForLesson(Long lessonId, Long adminUserId) {
        Lesson lesson = resolveLesson(lessonId);
        Quiz quiz = quizRepository.findByLesson_LessonId(lesson.getLessonId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài Quiz cho bài học #" + lessonId));
        quiz.setStatus("DRAFT");
        quiz.setUpdatedBy(adminUserId);
        return quizRepository.save(quiz);
    }

    public Quiz getQuizInfoByLessonId(Long lessonId) {
        Lesson lesson = resolveLesson(lessonId);
        return quizRepository.findByLesson_LessonId(lesson.getLessonId())
                .orElseGet(() -> {
                    Quiz q = new Quiz();
                    q.setLesson(lesson);
                    q.setTitle("Quiz Kiểm Tra: " + lesson.getTitle());
                    q.setStatus("DRAFT");
                    return q;
                });
    }
}
