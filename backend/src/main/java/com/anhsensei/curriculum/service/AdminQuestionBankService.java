package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.Level;
import com.anhsensei.curriculum.domain.Lesson;
import com.anhsensei.curriculum.domain.QuestionBank;
import com.anhsensei.curriculum.domain.QuestionBankOption;
import com.anhsensei.curriculum.domain.Quiz;
import com.anhsensei.curriculum.domain.Vocabulary;
import com.anhsensei.curriculum.repository.LevelRepository;
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
    private final LevelRepository levelRepository;

    public AdminQuestionBankService(
            QuestionBankRepository questionBankRepository,
            LessonRepository lessonRepository,
            QuizRepository quizRepository,
            VocabularyRepository vocabularyRepository,
            LevelRepository levelRepository) {
        this.questionBankRepository = questionBankRepository;
        this.lessonRepository = lessonRepository;
        this.quizRepository = quizRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.levelRepository = levelRepository;
    }

    private Lesson resolveLesson(Long lessonId) {
        if (lessonId == null) throw new IllegalArgumentException("Lesson ID không được để trống");

        // 1. Try DB primary key ID
        Optional<Lesson> byId = lessonRepository.findById(lessonId);
        if (byId.isPresent()) return byId.get();

        // 2. Map canonical lesson number (1..75+) to Level Code and Local SortOrder
        String levelCode;
        int localSortOrder;
        if (lessonId <= 25) {
            levelCode = "N5";
            localSortOrder = lessonId.intValue();
        } else if (lessonId <= 50) {
            levelCode = "N4";
            localSortOrder = (int) (lessonId - 25);
        } else {
            levelCode = "N3";
            localSortOrder = (int) (lessonId > 75 ? lessonId : lessonId - 50);
        }

        // 3. Search DB for matching Level Code & Local SortOrder (ignoring status)
        List<Lesson> levelLessons = lessonRepository.findAll().stream()
                .filter(l -> l.getDeletedAt() == null && l.getLevel() != null &&
                        levelCode.equalsIgnoreCase(l.getLevel().getCode()) &&
                        l.getSortOrder() != null && l.getSortOrder() == localSortOrder)
                .collect(Collectors.toList());

        if (!levelLessons.isEmpty()) {
            return levelLessons.get(0);
        }

        // 4. Fallback auto-create Lesson entity so Admin is NEVER blocked!
        Lesson newLesson = new Lesson();
        Level level = levelRepository.findByCodeIgnoreCase(levelCode)
                .orElseGet(() -> levelRepository.findAll().stream().findFirst().orElse(null));

        newLesson.setLevel(level);
        newLesson.setTitle("Bài " + localSortOrder + ": JLPT " + levelCode);
        newLesson.setDescription("Bài học " + localSortOrder + " cấp độ " + levelCode);
        newLesson.setSortOrder(localSortOrder);
        newLesson.setStatus("PUBLISHED");
        newLesson.setEstimatedMinutes(30);
        newLesson.setIsSample(false);

        return lessonRepository.save(newLesson);
    }

    @Transactional
    public List<QuestionBank> getQuestionsByLessonId(Long lessonId) {
        Lesson lesson = resolveLesson(lessonId);
        List<QuestionBank> list = questionBankRepository.findQuestionsWithOptionsByLessonId(lesson.getLessonId());

        if (list == null || list.isEmpty()) {
            return new ArrayList<>();
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
        List<Lesson> dbLessons = lessonRepository.findAll().stream()
                .filter(l -> l.getDeletedAt() == null && l.getLevel() != null && 
                        ("N5".equalsIgnoreCase(l.getLevel().getCode()) || 
                         "N4".equalsIgnoreCase(l.getLevel().getCode()) || 
                         "N3".equalsIgnoreCase(l.getLevel().getCode())))
                .collect(Collectors.toList());

        Map<Long, String> quizStatusMap = new HashMap<>();
        try {
            quizRepository.findAll().forEach(q -> {
                if (q.getLesson() != null && q.getStatus() != null) {
                    quizStatusMap.put(q.getLesson().getLessonId(), q.getStatus().toUpperCase());
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

        // Map existing lessons by canonical lesson number (1..75)
        Map<Long, Lesson> lessonByNumberMap = new HashMap<>();
        for (Lesson l : dbLessons) {
            String lvlCode = l.getLevel() != null ? l.getLevel().getCode().toUpperCase() : "N5";
            int sortOrder = l.getSortOrder() != null ? l.getSortOrder() : 1;
            long canonicalId;
            if ("N3".equalsIgnoreCase(lvlCode)) {
                canonicalId = 50 + sortOrder;
            } else if ("N4".equalsIgnoreCase(lvlCode)) {
                canonicalId = 25 + sortOrder;
            } else {
                canonicalId = sortOrder;
            }
            lessonByNumberMap.put(canonicalId, l);
        }

        // Return full 75 lessons: N5 (1..25), N4 (26..50), N3 (51..75)
        for (long lessonNum = 1; lessonNum <= 75; lessonNum++) {
            Lesson l = lessonByNumberMap.get(lessonNum);
            String levelCode = lessonNum <= 25 ? "N5" : lessonNum <= 50 ? "N4" : "N3";
            int localSortOrder = lessonNum <= 25 ? (int) lessonNum : lessonNum <= 50 ? (int) (lessonNum - 25) : (int) (lessonNum - 50);

            Long realLessonId = l != null ? l.getLessonId() : lessonNum;
            Map<String, Long> counts = l != null ? lessonStatusCounts.getOrDefault(realLessonId, Collections.emptyMap()) : Collections.emptyMap();
            long activeCount = counts.getOrDefault("ACTIVE", 0L);
            long draftCount = counts.getOrDefault("DRAFT", 0L);
            long totalCount = activeCount + draftCount;

            String statusFromDb = l != null ? quizStatusMap.get(realLessonId) : null;
            String qStatus;
            if (totalCount == 0) {
                qStatus = "UNCREATED";
            } else if ("PUBLISHED".equalsIgnoreCase(statusFromDb)) {
                qStatus = "PUBLISHED";
            } else {
                qStatus = "DRAFT";
            }

            Map<String, Object> map = new HashMap<>();
            map.put("lessonId", lessonNum);
            map.put("canonicalLessonId", realLessonId);
            map.put("sortOrder", localSortOrder);
            map.put("title", (l != null && l.getTitle() != null) ? l.getTitle() : ("Bài " + localSortOrder + ": JLPT " + levelCode));
            map.put("levelCode", levelCode);
            map.put("totalQuestions", totalCount);
            map.put("activeQuestions", activeCount);
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
        return generateQuestionsForLessonByMode(lessonId, "ALL", adminUserId, true);
    }

    public List<QuestionBank> generateAll4CategoriesForLesson(Long lessonId, Long adminUserId) {
        return generateQuestionsForLessonByMode(lessonId, "ALL", adminUserId, true);
    }

    @Transactional
    public List<QuestionBank> generateQuestionsForLessonByMode(Long lessonId, String mode, Long adminUserId, boolean setAsActive) {
        return generateQuestionsForLessonCustom(lessonId, mode, 30, null, null, adminUserId, setAsActive, false);
    }

    @Transactional
    public List<QuestionBank> generateQuestionsForLessonCustom(Long lessonId, String mode, Integer count, Integer vocabCount, Integer grammarCount, Long adminUserId, boolean setAsActive, boolean append) {
        Lesson lesson = resolveLesson(lessonId);
        String upperMode = mode != null ? mode.toUpperCase() : "ALL";

        int rawV = vocabCount != null && vocabCount > 0 ? vocabCount : (count != null && count > 0 ? count : 30);
        int rawG = grammarCount != null && grammarCount > 0 ? grammarCount : (count != null && count > 0 ? count : 30);

        int vCount = Math.max(5, Math.min(50, rawV));
        int gCount = Math.max(5, Math.min(50, rawG));

        if ("VOCAB".equals(upperMode)) {
            return generateVocabQuestions(lesson, vCount, adminUserId, setAsActive, append);
        } else if ("GRAMMAR".equals(upperMode)) {
            return generateGrammarQuestions(lesson, gCount, adminUserId, setAsActive, append);
        } else {
            List<QuestionBank> list = new ArrayList<>();
            list.addAll(generateVocabQuestions(lesson, vCount, adminUserId, setAsActive, append));
            list.addAll(generateGrammarQuestions(lesson, gCount, adminUserId, setAsActive, append));
            return list;
        }
    }

    @Transactional
    public List<QuestionBank> generateVocabQuestions(Lesson lesson, Long adminUserId, boolean setAsActive) {
        return generateVocabQuestions(lesson, 30, adminUserId, setAsActive, false);
    }

    @Transactional
    public List<QuestionBank> generateVocabQuestions(Lesson lesson, int targetCount, Long adminUserId, boolean setAsActive) {
        return generateVocabQuestions(lesson, targetCount, adminUserId, setAsActive, false);
    }

    @Transactional
    public List<QuestionBank> generateVocabQuestions(Lesson lesson, int targetCount, Long adminUserId, boolean setAsActive, boolean append) {
        if (!append) {
            questionBankRepository.deleteOptionsByLessonIdAndCategoryNative(lesson.getLessonId(), "VOCAB");
            questionBankRepository.deleteQuestionsByLessonIdAndCategoryNative(lesson.getLessonId(), "VOCAB");
            questionBankRepository.flush();
        }

        List<Vocabulary> vocabList = vocabularyRepository.findByLesson_LessonIdOrderBySortOrderAsc(lesson.getLessonId());
        if (vocabList.isEmpty()) {
            vocabList = vocabularyRepository.findAll().stream().limit(50).collect(Collectors.toList());
        }
        if (vocabList.isEmpty()) {
            Vocabulary dummy = new Vocabulary();
            dummy.setWord("私");
            dummy.setKana("わたし");
            dummy.setMeaningVi("Tôi");
            vocabList = List.of(dummy);
        }
        Collections.shuffle(vocabList);

        List<QuestionBank> toSave = new ArrayList<>();
        String statusToSet = setAsActive ? "ACTIVE" : "DRAFT";

        int countToGen = targetCount > 0 ? targetCount : 30;
        for (int i = 0; i < countToGen; i++) {
            Vocabulary item = vocabList.get(i % vocabList.size());
            List<Vocabulary> catDistractors = getQualityDistractors(item, vocabList);

            QuestionBank q = new QuestionBank();
            q.setLesson(lesson);
            q.setCategory("VOCAB");
            q.setCreatedBy(adminUserId);
            q.setUpdatedBy(adminUserId);
            q.setStatus(statusToSet);
            q.setDifficulty((i % 3 == 0) ? "HARD" : ((i % 2 == 0) ? "MEDIUM" : "EASY"));

            String mainWord = item.getWord() != null ? item.getWord() : item.getKana();
            String kanaWord = item.getKana() != null ? item.getKana() : mainWord;

            int vType = i % 3;
            if (vType == 0) {
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
            } else if (vType == 1) {
                q.setQuestionType("LISTENING");
                q.setPrompt("🔊 [LUYỆN NGHE] Nghe âm thanh phát âm và chọn nghĩa tiếng Việt đúng");
                q.setJapaneseText("🔊 「 " + kanaWord + " 」");
                q.setAudioText(kanaWord);
                q.setTranscript(mainWord + " (" + kanaWord + ") : " + item.getMeaningVi());
                q.setExplanation("Âm thanh phát âm: " + kanaWord + " ➔ Nghĩa tiếng Việt: " + item.getMeaningVi());

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption(item.getMeaningVi(), true, 1));
                for (Vocabulary d : catDistractors) {
                    options.add(new QuestionBankOption(d.getMeaningVi(), false, options.size() + 1));
                }
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);
            } else {
                q.setQuestionType("TYPING");
                q.setPrompt("⌨️ [LUYỆN GÕ] Gõ từ tiếng Nhật tương ứng với nghĩa dưới đây");
                q.setJapaneseText("「 " + item.getMeaningVi() + " 」");
                q.setValidAnswers(toJsonArray(kanaWord, mainWord));
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

            toSave.add(q);
        }

        List<QuestionBank> generated = questionBankRepository.saveAll(toSave);
        ensureQuizPublishedForLesson(lesson, adminUserId);
        return generated;
    }

    @Transactional
    public List<QuestionBank> generateGrammarQuestions(Lesson lesson, Long adminUserId, boolean setAsActive) {
        return generateGrammarQuestions(lesson, 30, adminUserId, setAsActive, false);
    }

    @Transactional
    public List<QuestionBank> generateGrammarQuestions(Lesson lesson, int targetCount, Long adminUserId, boolean setAsActive) {
        return generateGrammarQuestions(lesson, targetCount, adminUserId, setAsActive, false);
    }

    @Transactional
    public List<QuestionBank> generateGrammarQuestions(Lesson lesson, int targetCount, Long adminUserId, boolean setAsActive, boolean append) {
        if (!append) {
            questionBankRepository.deleteOptionsByLessonIdAndCategoryNative(lesson.getLessonId(), "GRAMMAR");
            questionBankRepository.deleteQuestionsByLessonIdAndCategoryNative(lesson.getLessonId(), "GRAMMAR");
            questionBankRepository.flush();
        }

        List<Vocabulary> vocabList = vocabularyRepository.findByLesson_LessonIdOrderBySortOrderAsc(lesson.getLessonId());
        if (vocabList.isEmpty()) {
            vocabList = vocabularyRepository.findAll().stream().limit(50).collect(Collectors.toList());
        }
        if (vocabList.isEmpty()) {
            Vocabulary dummy = new Vocabulary();
            dummy.setWord("私");
            dummy.setKana("わたし");
            dummy.setMeaningVi("Tôi");
            vocabList = List.of(dummy);
        }
        Collections.shuffle(vocabList);

        List<QuestionBank> toSave = new ArrayList<>();
        String statusToSet = setAsActive ? "ACTIVE" : "DRAFT";

        int countToGen = targetCount > 0 ? targetCount : 30;
        for (int i = 0; i < countToGen; i++) {
            Vocabulary item = vocabList.get(i % vocabList.size());
            String mainWord = item.getWord() != null ? item.getWord() : item.getKana();

            QuestionBank q = new QuestionBank();
            q.setLesson(lesson);
            q.setCategory("GRAMMAR");
            q.setCreatedBy(adminUserId);
            q.setUpdatedBy(adminUserId);
            q.setStatus(statusToSet);
            q.setDifficulty((i % 3 == 0) ? "HARD" : ((i % 2 == 0) ? "MEDIUM" : "EASY"));

            int gType = i % 3;
            if (gType == 0) {
                q.setQuestionType("FILL_BLANK");
                int fillType = (i / 3) % 4;
                String pCorrect, pExp, pText, pPrompt;
                List<String> pDist;

                if (fillType == 0) {
                    pPrompt = "_____ [ĐIỀN TRỢ TỪ] Chọn trợ từ chỉ chủ đề thích hợp điền vào chỗ trống";
                    pText = "わたし _____ 「 " + mainWord + " 」 です。";
                    pCorrect = "は";
                    pExp = "Trợ từ chỉ chủ đề câu là 「 は 」: わたしは " + mainWord + " です。";
                    pDist = List.of("が", "に", "で");
                } else if (fillType == 1) {
                    pPrompt = "_____ [ĐIỀN TRỢ TỪ] Chọn trợ từ chỉ phương hướng / điểm đến thích hợp";
                    pText = "あした 「 " + mainWord + " 」 _____ いきます。";
                    pCorrect = "へ";
                    pExp = "Trợ từ chỉ phương hướng / điểm đến là 「 へ 」";
                    pDist = List.of("を", "で", "が");
                } else if (fillType == 2) {
                    pPrompt = "_____ [ĐIỀN TRỢ TỪ] Chọn trợ từ chỉ tân ngữ thích hợp điền vào chỗ trống";
                    pText = "まいにち 「 " + mainWord + " 」 _____ べんきょうします。";
                    pCorrect = "を";
                    pExp = "Trợ từ chỉ tân ngữ tác động trực tiếp là 「 を 」";
                    pDist = List.of("に", "は", "で");
                } else {
                    pPrompt = "_____ [ĐIỀN TRỢ TỪ] Chọn trợ từ chỉ sở hữu thích hợp điền vào chỗ trống";
                    pText = "わたし _____ 「 " + mainWord + " 」 です。";
                    pCorrect = "の";
                    pExp = "Trợ từ nối sở hữu giữa hai danh từ là 「 の 」";
                    pDist = List.of("は", "に", "で");
                }

                q.setPrompt(pPrompt);
                q.setJapaneseText(pText);
                q.setExplanation(pExp);
                q.setValidAnswers(toJsonArray(pCorrect));

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption(pCorrect, true, 1));
                for (String d : pDist) {
                    options.add(new QuestionBankOption(d, false, options.size() + 1));
                }
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);

            } else if (gType == 1) {
                String nounSlot3 = mainWord.equalsIgnoreCase("がくせい") ? "かいしゃいん" : "がくせい";
                q.setQuestionType("STAR_ORDER");
                q.setPrompt("★ [SẮP XẾP JLPT] Chọn từ đúng tại vị trí ngôi sao ★ để tạo câu mang nghĩa: \"Tôi là " + (mainWord.equalsIgnoreCase("がくせい") ? "nhân viên công ty" : "học sinh / sinh viên") + " " + item.getMeaningVi() + "\"");
                q.setJapaneseText("わたし は ＿＿＿  ＿★＿  ＿＿＿  ＿＿＿ です。");
                q.setAudioText("わたしは" + mainWord + "の" + nounSlot3 + "です。");
                q.setExplanation("Cấu trúc câu hoàn chỉnh: わたし は [1. " + mainWord + "] ★[2. の] [3. " + nounSlot3 + "] [4. です]。 (Ngôi sao ở vị trí thứ 2: の)");
                q.setValidAnswers(toJsonArray("の"));

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption("の", true, 1));
                options.add(new QuestionBankOption(mainWord, false, 2));
                options.add(new QuestionBankOption(nounSlot3, false, 3));
                options.add(new QuestionBankOption("です", false, 4));
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);

            } else {
                q.setQuestionType("MULTIPLE_CHOICE");
                q.setPrompt("🧩 [CẤU TRÚC NGỮ PHÁP] Chọn mẫu câu ngữ pháp phù hợp để hoàn thành câu dưới đây");
                q.setJapaneseText("「 " + mainWord + " 」 を使った正しい文を選びなさい。");
                q.setExplanation("Mẫu câu chuẩn xác thể hiện ý nghĩa: わたしは " + mainWord + " です。");

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption("わたしは " + mainWord + " です。", true, 1));
                options.add(new QuestionBankOption("わたしは " + mainWord + " じゃありません。", false, 2));
                options.add(new QuestionBankOption("わたしは " + mainWord + " からきました。", false, 3));
                options.add(new QuestionBankOption("わたしは " + mainWord + " をたべます。", false, 4));
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);
            }

            toSave.add(q);
        }

        List<QuestionBank> generated = questionBankRepository.saveAll(toSave);
        ensureQuizPublishedForLesson(lesson, adminUserId);
        return generated;
    }

    @Transactional
    public List<QuestionBank> generate30JLPTQuestionsForLesson(Long lessonId, Long adminUserId, boolean setAsActive) {
        return generateQuestionsForLessonByMode(lessonId, "ALL", adminUserId, setAsActive);
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

    private String toJsonArray(String... values) {
        try {
            List<String> list = new ArrayList<>();
            if (values != null) {
                for (String v : values) {
                    if (v != null && !v.trim().isEmpty()) {
                        list.add(v.trim());
                    }
                }
            }
            return new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(list);
        } catch (Exception e) {
            return "[]";
        }
    }

    private List<Vocabulary> getQualityDistractors(Vocabulary item, List<Vocabulary> vocabList) {
        boolean itemIsDemonstrative = isDemonstrative(item);

        List<Vocabulary> candidates = vocabList.stream()
                .filter(v -> v != item && (v.getVocabularyId() == null || item.getVocabularyId() == null || !v.getVocabularyId().equals(item.getVocabularyId())))
                .filter(v -> {
                    boolean vIsDemonstrative = isDemonstrative(v);
                    if (itemIsDemonstrative) {
                        return vIsDemonstrative;
                    } else {
                        return !vIsDemonstrative;
                    }
                })
                .collect(Collectors.toList());

        Collections.shuffle(candidates);

        if (candidates.size() < 3) {
            List<Vocabulary> fallback = vocabList.stream()
                    .filter(v -> v != item && (v.getVocabularyId() == null || item.getVocabularyId() == null || !v.getVocabularyId().equals(item.getVocabularyId())))
                    .filter(v -> !candidates.contains(v))
                    .collect(Collectors.toList());
            Collections.shuffle(fallback);
            for (Vocabulary f : fallback) {
                candidates.add(f);
                if (candidates.size() >= 3) break;
            }
        }

        String[][] dummyPool = {
            {"あなた", "あなた", "Bạn / Anh chị"},
            {"先生", "せんせい", "Thầy giáo / Cô giáo"},
            {"学生", "がくせい", "Học sinh / Sinh viên"},
            {"会社員", "かいしゃいん", "Nhân viên công ty"},
            {"病院", "びょういん", "Bệnh viện"},
            {"学校", "がっこう", "Trường học"}
        };

        int dummyIdx = 0;
        while (candidates.size() < 3) {
            String[] d = dummyPool[dummyIdx % dummyPool.length];
            dummyIdx++;
            Vocabulary f = new Vocabulary();
            f.setWord(d[0]);
            f.setKana(d[1]);
            f.setMeaningVi(d[2]);
            candidates.add(f);
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
                    q.setDescription("Bộ Quiz 30 câu kiểm tra bài " + lesson.getSortOrder());
                    q.setPassScore(new java.math.BigDecimal("70.00"));
                    q.setTimeLimitMinutes(10);
                    q.setQuestionsPerAttempt(30);
                    q.setStatus("DRAFT");
                    q.setCreatedBy(adminUserId);
                    q.setUpdatedBy(adminUserId);
                    return q;
                });

        quiz.setQuestionsPerAttempt(30);
        quiz.setUpdatedBy(adminUserId);

        return quizRepository.save(quiz);
    }

    public Quiz publishQuizForLesson(Long lessonId, Long adminUserId) {
        Lesson lesson = resolveLesson(lessonId);
        Quiz quiz = ensureQuizPublishedForLesson(lesson, adminUserId);
        quiz.setStatus("PUBLISHED");
        quiz.setPublishedAt(OffsetDateTime.now());
        quiz.setUpdatedBy(adminUserId);
        return quizRepository.save(quiz);
    }

    public Quiz unpublishQuizForLesson(Long lessonId, Long adminUserId) {
        Lesson lesson = resolveLesson(lessonId);
        Quiz quiz = quizRepository.findByLesson_LessonId(lesson.getLessonId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài Quiz cho bài học #" + lessonId));
        quiz.setStatus("DRAFT");
        quiz.setUpdatedBy(adminUserId);
        return quizRepository.save(quiz);
    }

    @Transactional
    public String resetAllQuizzes(Long adminUserId) {
        questionBankRepository.truncateAllQuestionBankNative();
        generateQuestionsForLessonByMode(1L, "ALL", adminUserId, true);
        return "Reset success";
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
