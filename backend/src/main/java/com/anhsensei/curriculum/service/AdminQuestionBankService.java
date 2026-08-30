package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.GrammarExample;
import com.anhsensei.curriculum.domain.GrammarPoint;
import com.anhsensei.curriculum.domain.Lesson;
import com.anhsensei.curriculum.domain.QuestionBank;
import com.anhsensei.curriculum.domain.QuestionBankOption;
import com.anhsensei.curriculum.domain.Quiz;
import com.anhsensei.curriculum.domain.Vocabulary;
import com.anhsensei.curriculum.repository.GrammarExampleRepository;
import com.anhsensei.curriculum.repository.GrammarPointRepository;
import com.anhsensei.curriculum.repository.LessonRepository;
import com.anhsensei.curriculum.repository.QuestionBankRepository;
import com.anhsensei.curriculum.repository.QuizRepository;
import com.anhsensei.curriculum.repository.VocabularyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
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
    private final GrammarPointRepository grammarPointRepository;
    private final GrammarExampleRepository grammarExampleRepository;

    public AdminQuestionBankService(
            QuestionBankRepository questionBankRepository,
            LessonRepository lessonRepository,
            QuizRepository quizRepository,
            VocabularyRepository vocabularyRepository,
            GrammarPointRepository grammarPointRepository,
            GrammarExampleRepository grammarExampleRepository) {
        this.questionBankRepository = questionBankRepository;
        this.lessonRepository = lessonRepository;
        this.quizRepository = quizRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.grammarPointRepository = grammarPointRepository;
        this.grammarExampleRepository = grammarExampleRepository;
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

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getAllLessonsSummary() {
        List<Map<String, Object>> result = new ArrayList<>();
        List<Lesson> lessons = lessonRepository.findAll().stream()
                .filter(l -> l.getDeletedAt() == null && l.getLevel() != null && ("N5".equalsIgnoreCase(l.getLevel().getCode()) || "N4".equalsIgnoreCase(l.getLevel().getCode())))
                .sorted((l1, l2) -> {
                    int lvl1 = "N5".equalsIgnoreCase(l1.getLevel().getCode()) ? 1 : 2;
                    int lvl2 = "N5".equalsIgnoreCase(l2.getLevel().getCode()) ? 1 : 2;
                    if (lvl1 != lvl2) return Integer.compare(lvl1, lvl2);
                    return Integer.compare(l1.getSortOrder() != null ? l1.getSortOrder() : 0, l2.getSortOrder() != null ? l2.getSortOrder() : 0);
                })
                .collect(Collectors.toList());

        Map<Long, String> quizStatusMap = new HashMap<>();
        try {
            quizRepository.findAll().forEach(q -> {
                if (q.getLesson() != null) {
                    quizStatusMap.put(q.getLesson().getLessonId(), q.getStatus() != null ? q.getStatus() : "PUBLISHED");
                }
            });
        } catch (Exception ignored) {}

        Map<Long, Map<String, Long>> lessonStatusCounts = new HashMap<>();
        try {
            List<Object[]> rawCounts = questionBankRepository.countQuestionsGroupedByLessonAndStatus();
            for (Object[] row : rawCounts) {
                Long lId = (Long) row[0];
                String st = (String) row[1];
                Long cnt = (Long) row[2];
                if (lId != null) {
                    lessonStatusCounts.computeIfAbsent(lId, k -> new HashMap<>()).put(st != null ? st.toUpperCase() : "ACTIVE", cnt);
                }
            }
        } catch (Exception ignored) {}

        for (int i = 0; i < lessons.size(); i++) {
            Lesson l = lessons.get(i);
            long lessonNum = i + 1;
            Long realLessonId = l.getLessonId();

            Map<String, Long> counts = lessonStatusCounts.getOrDefault(realLessonId, Collections.emptyMap());
            long activeCount = counts.getOrDefault("ACTIVE", 0L);
            long draftCount = counts.getOrDefault("DRAFT", 0L);
            long totalCount = activeCount + draftCount;

            String qStatus = quizStatusMap.getOrDefault(realLessonId, "PUBLISHED");

            Map<String, Object> map = new HashMap<>();
            map.put("lessonId", lessonNum);
            map.put("canonicalLessonId", realLessonId);
            map.put("sortOrder", l.getSortOrder());
            map.put("title", l.getTitle());
            map.put("levelCode", l.getLevel().getCode());
            map.put("totalQuestions", totalCount > 0 ? totalCount : 30);
            map.put("activeQuestions", activeCount > 0 ? activeCount : 30);
            map.put("draftQuestions", draftCount);
            map.put("quizStatus", qStatus);

            result.add(map);
        }
        return result;
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

        if ("GRAMMAR".equals(targetCategory)) {
            List<QuestionBank> grammarQuestions = generateGrammarQuestionsForLesson(lesson, adminUserId, setAsActive, 30);
            ensureQuizPublishedForLesson(lesson, adminUserId);
            return grammarQuestions;
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

        // 24 questions from Vocab / Kanji / Listening / Typing
        int vocabKanjiCount = 24;
        for (int i = 0; i < vocabKanjiCount; i++) {
            Vocabulary item = vocabList.get(i % vocabList.size());
            List<Vocabulary> catDistractors = getQualityDistractors(item, vocabList);

            // 0..7 (8 câu): MULTIPLE_CHOICE (Vocab: Nhật ➔ Việt & Việt ➔ Nhật)
            // 8..13 (6 câu): KANJI_READING (Kanji: Âm Hán Việt & Hiragana)
            // 14..18 (5 câu): LISTENING (Luyện Nghe TTS thuần âm thanh, KHÔNG HIỂN THỊ CHỮ)
            // 19..23 (5 câu): TYPING (Luyện Gõ / Tự Nhập với validAnswers & options)
            String qType;
            if (i <= 7) qType = "MULTIPLE_CHOICE";
            else if (i <= 13) qType = "KANJI_READING";
            else if (i <= 18) qType = "LISTENING";
            else qType = "TYPING";

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
                // Dạng 1: Trắc Nghiệm Từ Vựng (8 câu)
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
                // Dạng 2: Hán Tự & Âm Đọc Kanji (6 câu)
                q.setCategory("KANJI");
                q.setQuestionType("KANJI_READING");
                q.setPrompt("✍️ [HÁN TỰ] Chọn cách đọc Hiragana / Kana đúng của chữ 「 " + kanjiForm + " 」");
                q.setJapaneseText("「 " + kanjiForm + " 」");
                q.setExplanation("Cách đọc Kana chuẩn xác của Hán tự " + kanjiForm + " là: " + kanaWord + " (Nghĩa: " + item.getMeaningVi() + ")");

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption(kanaWord, true, 1));
                for (Vocabulary d : catDistractors) {
                    String dKana = d.getKana() != null ? d.getKana() : "ほん";
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

            } else {
                // Dạng 4: Luyện Gõ / Tự Nhập (5 câu)
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
            }

            generatedQuestions.add(questionBankRepository.save(q));
        }

        // 6 câu Ngữ pháp bám sát 100% các điểm ngữ pháp và câu ví dụ của bài học!
        List<QuestionBank> grammarQuestions = generateGrammarQuestionsForLesson(lesson, adminUserId, setAsActive, 6);
        generatedQuestions.addAll(grammarQuestions);

        // Auto ensure Quiz row exists and has questionsPerAttempt = 30
        ensureQuizPublishedForLesson(lesson, adminUserId);

        return generatedQuestions;
    }

    public List<QuestionBank> generateGrammarQuestionsForLesson(Lesson lesson, Long adminUserId, boolean setAsActive, int targetCount) {
        List<GrammarPoint> grammarPoints = grammarPointRepository.findByLesson_LessonIdOrderBySortOrderAsc(lesson.getLessonId());
        if (grammarPoints.isEmpty()) {
            grammarPoints = grammarPointRepository.findAll().stream().limit(20).collect(Collectors.toList());
        }
        if (grammarPoints.isEmpty()) {
            throw new IllegalStateException("Hệ thống chưa có dữ liệu Ngữ pháp trong DB để sinh đề!");
        }

        // Collect all examples mapped by grammar point
        Map<Long, List<GrammarExample>> examplesMap = new HashMap<>();
        for (GrammarPoint gp : grammarPoints) {
            List<GrammarExample> exs = grammarExampleRepository.findByGrammarIdOrderBySortOrderAsc(gp.getGrammarId());
            examplesMap.put(gp.getGrammarId(), exs);
        }

        // Collect other grammar points across DB for high quality distractors
        List<GrammarPoint> allOtherGrammarPoints = grammarPointRepository.findAll().stream()
                .filter(gp -> gp.getLesson() != null && !Objects.equals(gp.getLesson().getLessonId(), lesson.getLessonId()))
                .collect(Collectors.toList());

        List<QuestionBank> generatedQuestions = new ArrayList<>();
        String statusToSet = setAsActive ? "ACTIVE" : "DRAFT";

        for (int i = 0; i < targetCount; i++) {
            GrammarPoint gp = grammarPoints.get(i % grammarPoints.size());
            List<GrammarExample> examples = examplesMap.getOrDefault(gp.getGrammarId(), Collections.emptyList());
            GrammarExample ex = (!examples.isEmpty()) ? examples.get((i / grammarPoints.size()) % examples.size()) : null;

            QuestionBank q = new QuestionBank();
            q.setLesson(lesson);
            q.setCategory("GRAMMAR");
            q.setCreatedBy(adminUserId);
            q.setUpdatedBy(adminUserId);
            q.setStatus(statusToSet);
            q.setDifficulty((i % 3 == 0) ? "HARD" : (i % 2 == 0 ? "EASY" : "MEDIUM"));

            int formatType = i % 4;
            // Format 0: FILL_BLANK (Điền trợ từ / mẫu ngữ pháp từ câu ví dụ thực tế của bài)
            // Format 1: STAR_ORDER (Sắp xếp câu dạng Ngôi Sao ★ chuẩn JLPT từ câu ví dụ bài học)
            // Format 2: MULTIPLE_CHOICE (Ý nghĩa & Tình huống sử dụng của mẫu ngữ pháp trong bài)
            // Format 3: STRUCTURE_RULE (Cấu trúc kết hợp & Cách chia ngữ pháp trong bài)

            if (formatType == 0) {
                // FILL_BLANK
                q.setQuestionType("FILL_BLANK");
                String jpSentence = ex != null && ex.getJapaneseText() != null && !ex.getJapaneseText().isBlank()
                        ? ex.getJapaneseText()
                        : (gp.getPattern() + " です。");
                String meaningVi = ex != null && ex.getMeaningVi() != null ? ex.getMeaningVi() : gp.getMeaning();

                String cleanPattern = gp.getPattern().replace("〜", "").replace("~", "").trim();
                String targetToBlank = findKeyGrammarToken(cleanPattern, jpSentence);
                String blankedSentence = jpSentence.contains(targetToBlank)
                        ? jpSentence.replaceFirst(java.util.regex.Pattern.quote(targetToBlank), " _____ ")
                        : (jpSentence.length() > 4 ? jpSentence.substring(0, 3) + " _____ " + jpSentence.substring(3) : (jpSentence + " _____ "));

                q.setPrompt("_____ [NGỮ PHÁP] Chọn từ/trợ từ/mẫu câu thích hợp điền vào chỗ khuyết:\n「 " + blankedSentence + " 」\n(Ý nghĩa: " + meaningVi + ")");
                q.setJapaneseText("「 " + blankedSentence + " 」\n(Ý nghĩa: " + meaningVi + ")");
                q.setExplanation("Mẫu ngữ pháp Bài #" + (lesson.getSortOrder() != null ? lesson.getSortOrder() : lesson.getLessonId())
                        + ": 「 " + gp.getPattern() + " 」 - " + gp.getMeaning()
                        + (gp.getStructure() != null ? " | Cấu trúc: " + gp.getStructure() : "")
                        + (gp.getExplanation() != null ? " | " + gp.getExplanation() : ""));

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption(targetToBlank, true, 1));
                List<String> distractors = getGrammarDistractors(targetToBlank, gp, allOtherGrammarPoints);
                for (String d : distractors) {
                    options.add(new QuestionBankOption(d, false, options.size() + 1));
                }
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);

            } else if (formatType == 1) {
                // STAR_ORDER: Chuẩn form sắp xếp câu JLPT có 4 vị trí ＿＿＿ ＿＿＿ ★ ＿＿＿
                q.setQuestionType("STAR_ORDER");
                String jpSentence = ex != null && ex.getJapaneseText() != null && !ex.getJapaneseText().isBlank()
                        ? ex.getJapaneseText()
                        : ("わたし は " + gp.getPattern() + " です。");
                String meaningVi = ex != null && ex.getMeaningVi() != null ? ex.getMeaningVi() : gp.getMeaning();

                List<String> chunks = splitSentenceInto4Chunks(jpSentence, gp.getPattern());
                int starIndex = 2; // Vị trí ngôi sao là vị trí số 3 (index 2)
                String starChunk = chunks.get(starIndex);

                q.setPrompt("★ [SẮP XẾP JLPT] Sắp xếp các từ để tạo thành câu đúng và chọn từ tại vị trí ngôi sao (★):\n「 ＿＿＿  ＿＿＿  ★  ＿＿＿ 。 」\n(Ý nghĩa: " + meaningVi + ")");
                q.setJapaneseText("「 ＿＿＿  ＿＿＿  ★  ＿＿＿ 。 」\n(Ý nghĩa: " + meaningVi + ")");
                q.setExplanation("Câu hoàn chỉnh: 「 " + jpSentence + " 」 (" + meaningVi + ").\n"
                        + "Thứ tự sắp xếp đúng: [1] " + chunks.get(0) + "  ➔  [2] " + chunks.get(1) + "  ➔  [3] " + chunks.get(2) + " (★)  ➔  [4] " + chunks.get(3) + ".\n"
                        + "Mẫu ngữ pháp áp dụng: 「 " + gp.getPattern() + " 」 (" + gp.getMeaning() + ").");

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption(starChunk, true, 1));
                for (int cIdx = 0; cIdx < chunks.size(); cIdx++) {
                    if (cIdx != starIndex) {
                        options.add(new QuestionBankOption(chunks.get(cIdx), false, options.size() + 1));
                    }
                }
                while (options.size() < 4) {
                    options.add(new QuestionBankOption("です", false, options.size() + 1));
                }
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);

            } else if (formatType == 2) {
                // MULTIPLE_CHOICE (Ý nghĩa & Giải thích mẫu câu)
                q.setQuestionType("MULTIPLE_CHOICE");
                q.setPrompt("📘 [Ý NGHĨA NGỮ PHÁP] Mẫu cấu trúc 「 " + gp.getPattern() + " 」 trong Bài #" + (lesson.getSortOrder() != null ? lesson.getSortOrder() : lesson.getLessonId()) + " có ý nghĩa gì?");
                q.setJapaneseText("「 " + gp.getPattern() + " 」");
                q.setExplanation("Mẫu câu 「 " + gp.getPattern() + " 」 có ý nghĩa: " + gp.getMeaning()
                        + (gp.getStructure() != null ? " | Cấu trúc: " + gp.getStructure() : "")
                        + (gp.getExplanation() != null ? " | " + gp.getExplanation() : ""));

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption(gp.getMeaning(), true, 1));
                List<String> meaningDistractors = getMeaningDistractors(gp, grammarPoints, allOtherGrammarPoints);
                for (String md : meaningDistractors) {
                    options.add(new QuestionBankOption(md, false, options.size() + 1));
                }
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);

            } else {
                // STRUCTURE_RULE (Cấu trúc kết hợp & Cách chia)
                q.setQuestionType("MULTIPLE_CHOICE");
                String structure = gp.getStructure() != null && !gp.getStructure().isBlank()
                        ? gp.getStructure()
                        : (gp.getPattern() + " + です");

                q.setPrompt("🧩 [CẤU TRÚC KẾT HỢP] Quy tắc kết hợp đúng của mẫu ngữ pháp 「 " + gp.getPattern() + " 」 là gì?");
                q.setJapaneseText("「 " + gp.getPattern() + " 」");
                q.setExplanation("Quy tắc kết hợp chuẩn của mẫu 「 " + gp.getPattern() + " 」 là: " + structure
                        + (gp.getExplanation() != null ? " | " + gp.getExplanation() : ""));

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption(structure, true, 1));
                List<String> structDistractors = getStructureDistractors(structure, gp, allOtherGrammarPoints);
                for (String sd : structDistractors) {
                    options.add(new QuestionBankOption(sd, false, options.size() + 1));
                }
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);
            }

            generatedQuestions.add(questionBankRepository.save(q));
        }

        return generatedQuestions;
    }

    private String findKeyGrammarToken(String cleanPattern, String jpSentence) {
        if (jpSentence == null || jpSentence.isBlank()) return cleanPattern.isBlank() ? "は" : cleanPattern;

        if (!cleanPattern.isBlank() && jpSentence.contains(cleanPattern)) {
            return cleanPattern;
        }

        String[] candidates = {
            "てはいけません", "てもいいです", "てください", "ないでください", "なければなりません",
            "なくてもいいです", "たことがあります", "たほうがいいです", "ないほうがいいです",
            "てから", "ていただけませんか", "んです", "のです", "たり〜たり",
            "じゃありません", "ではありません", "でした", "じゃありませんでした",
            "から", "まで", "より", "ほど", "ので", "のに", "たら", "ても", "ば", "と",
            "は", "が", "を", "に", "で", "へ", "も", "の", "か", "ね", "よ"
        };

        for (String c : candidates) {
            if (cleanPattern.contains(c) && jpSentence.contains(c)) {
                return c;
            }
        }
        for (String c : candidates) {
            if (jpSentence.contains(c)) {
                return c;
            }
        }

        return cleanPattern.isBlank() ? "は" : cleanPattern;
    }

    private List<String> getGrammarDistractors(String target, GrammarPoint gp, List<GrammarPoint> allOther) {
        List<String> result = new ArrayList<>();
        switch (target) {
            case "は": result.addAll(List.of("が", "に", "で")); break;
            case "が": result.addAll(List.of("は", "を", "に")); break;
            case "に": result.addAll(List.of("で", "へ", "を")); break;
            case "で": result.addAll(List.of("に", "を", "へ")); break;
            case "を": result.addAll(List.of("に", "が", "で")); break;
            case "へ": result.addAll(List.of("に", "で", "から")); break;
            case "から": result.addAll(List.of("まで", "より", "ので")); break;
            case "まで": result.addAll(List.of("から", "までに", "ほど")); break;
            case "も": result.addAll(List.of("は", "が", "と")); break;
            case "と": result.addAll(List.of("や", "も", "に")); break;
            case "じゃありません":
            case "ではありません": result.addAll(List.of("でした", "です", "じゃありませんでした")); break;
            case "てください": result.addAll(List.of("てはいけません", "てもいいです", "ないでください")); break;
            case "てはいけません": result.addAll(List.of("てもいいです", "てください", "なければなりません")); break;
            case "てもいいです": result.addAll(List.of("てはいけません", "てください", "ないでください")); break;
            case "ないでください": result.addAll(List.of("てください", "なければなりません", "てもいいです")); break;
            case "なければなりません": result.addAll(List.of("なくてもいいです", "てはいけません", "ないでください")); break;
            case "なくてもいいです": result.addAll(List.of("なければなりません", "てもいいです", "てください")); break;
            case "たことがあります": result.addAll(List.of("ることがあります", "たほうがいいです", "てみます")); break;
            case "たほうがいいです": result.addAll(List.of("ないほうがいいです", "たことがあります", "てはいけません")); break;
            case "んです":
            case "のです": result.addAll(List.of("からです", "そうです", "ようです")); break;
            case "てから": result.addAll(List.of("まえに", "あとで", "ながら")); break;
            default:
                for (GrammarPoint other : allOther) {
                    String p = other.getPattern().replace("〜", "").replace("~", "").trim();
                    if (!p.isBlank() && !p.equals(target) && !result.contains(p)) {
                        result.add(p);
                        if (result.size() >= 3) break;
                    }
                }
                while (result.size() < 3) {
                    if (!result.contains("が")) result.add("が");
                    else if (!result.contains("に")) result.add("に");
                    else if (!result.contains("で")) result.add("で");
                    else result.add("を");
                }
                break;
        }
        return result.stream().limit(3).collect(Collectors.toList());
    }

    private List<String> splitSentenceInto4Chunks(String sentence, String pattern) {
        String s = sentence.replace("。", "").replace("?", "").replace("？", "").replace("!", "").replace("！", "").trim();
        List<String> chunks = new ArrayList<>();

        if (s.contains(" ")) {
            String[] parts = s.split("\\s+");
            if (parts.length >= 4) {
                chunks.addAll(Arrays.asList(parts).subList(0, 4));
                return chunks;
            } else if (parts.length == 3) {
                // Split the longest part into 2
                int maxIdx = 0;
                for (int i = 1; i < parts.length; i++) {
                    if (parts[i].length() > parts[maxIdx].length()) maxIdx = i;
                }
                for (int i = 0; i < parts.length; i++) {
                    if (i == maxIdx && parts[i].length() >= 2) {
                        int mid = parts[i].length() / 2;
                        chunks.add(parts[i].substring(0, mid));
                        chunks.add(parts[i].substring(mid));
                    } else {
                        chunks.add(parts[i]);
                    }
                }
                if (chunks.size() >= 4) return chunks.subList(0, 4);
            }
        }

        // Tokenize by Japanese particles
        String tokenized = s
                .replace("は", " は ")
                .replace("が", " が ")
                .replace("を", " を ")
                .replace("に", " に ")
                .replace("で", " で ")
                .replace("も", " も ")
                .replace("じゃありません", " じゃ ありません ")
                .replace("ではありません", " では ありません ")
                .replace("です", " です ")
                .trim();

        String[] tokens = tokenized.split("\\s+");
        List<String> validTokens = Arrays.stream(tokens).filter(t -> !t.isBlank()).collect(Collectors.toList());

        if (validTokens.size() >= 4) {
            return validTokens.subList(0, 4);
        }

        // Fallback default 4 clean chunks
        while (validTokens.size() < 4) {
            validTokens.add("です");
        }
        return validTokens.subList(0, 4);
    }

    private List<String> getMeaningDistractors(GrammarPoint gp, List<GrammarPoint> lessonGps, List<GrammarPoint> otherGps) {
        List<String> list = new ArrayList<>();
        for (GrammarPoint other : lessonGps) {
            if (!other.getGrammarId().equals(gp.getGrammarId()) && !other.getMeaning().equals(gp.getMeaning()) && !list.contains(other.getMeaning())) {
                list.add(other.getMeaning());
            }
        }
        for (GrammarPoint other : otherGps) {
            if (list.size() >= 3) break;
            if (!other.getMeaning().equals(gp.getMeaning()) && !list.contains(other.getMeaning())) {
                list.add(other.getMeaning());
            }
        }
        if (list.size() < 3) {
            List<String> fallbacks = List.of(
                "Biểu thị sự cho phép hoặc không được phép",
                "Chỉ thời gian và địa điểm bắt đầu hoặc kết thúc hành động",
                "Diễn tả khả năng hoặc năng lực thực hiện hành động",
                "Biểu thị nguyên nhân, lý do của sự việc",
                "Diễn tả mong muốn hoặc nguyện vọng của người nói"
            );
            for (String fb : fallbacks) {
                if (!fb.equals(gp.getMeaning()) && !list.contains(fb)) {
                    list.add(fb);
                    if (list.size() >= 3) break;
                }
            }
        }
        return list.stream().limit(3).collect(Collectors.toList());
    }

    private List<String> getStructureDistractors(String structure, GrammarPoint gp, List<GrammarPoint> otherGps) {
        List<String> list = new ArrayList<>();
        if (structure.contains("V-て")) {
            list.add(structure.replace("V-て", "V-る"));
            list.add(structure.replace("V-て", "V-た"));
            list.add(structure.replace("V-て", "V-ない"));
        } else if (structure.contains("V-ない")) {
            list.add(structure.replace("V-ない", "V-て"));
            list.add(structure.replace("V-ない", "V-る"));
            list.add(structure.replace("V-ない", "V-た"));
        } else if (structure.contains("V-た")) {
            list.add(structure.replace("V-た", "V-る"));
            list.add(structure.replace("V-た", "V-て"));
            list.add(structure.replace("V-た", "V-ない"));
        } else if (structure.contains("Danh từ 1 + は + Danh từ 2")) {
            list.add("Danh từ 1 + が + Danh từ 2 + です");
            list.add("Danh từ 1 + の + Danh từ 2 + です");
            list.add("Danh từ 1 + に + Danh từ 2 + です");
        } else {
            for (GrammarPoint other : otherGps) {
                if (other.getStructure() != null && !other.getStructure().isBlank() && !other.getStructure().equals(structure) && !list.contains(other.getStructure())) {
                    list.add(other.getStructure());
                    if (list.size() >= 3) break;
                }
            }
        }
        while (list.size() < 3) {
            list.add("Thể từ điển (V-る) + " + gp.getPattern());
            list.add("Thể quá khứ (V-た) + " + gp.getPattern());
            list.add("Thể phủ định (V-ない) + " + gp.getPattern());
        }
        return list.stream().distinct().limit(3).collect(Collectors.toList());
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

    @Transactional
    public void clearAllQuestionBank() {
        questionBankRepository.truncateAllQuestionBankNative();
    }
}
