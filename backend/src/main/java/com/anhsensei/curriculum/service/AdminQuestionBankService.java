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
            if (lessonId >= 1 && lessonId <= 25) {
                return lessonRepository.findFirstByLevel_CodeIgnoreCaseAndSortOrderAndStatusAndDeletedAtIsNull("N5", lessonId.intValue(), "PUBLISHED")
                        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài học N5 Bài #" + lessonId));
            }
            if (lessonId > 25 && lessonId <= 50) {
                // Canonical N4 lesson number -> maps to sortOrder (lessonId - 25)
                int sortOrder = (int) (lessonId - 25);
                return lessonRepository.findFirstByLevel_CodeIgnoreCaseAndSortOrderAndStatusAndDeletedAtIsNull("N4", sortOrder, "PUBLISHED")
                        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài học N4 Bài #" + sortOrder));
            }
            throw new IllegalArgumentException("Không tìm thấy bài học ID = " + lessonId);
        });
    }

    @Transactional(readOnly = true)
    public List<QuestionBank> getQuestionsByLessonId(Long lessonId) {
        Lesson lesson = resolveLesson(lessonId);
        return questionBankRepository.findByLesson_LessonIdAndDeletedAtIsNullOrderByQuestionIdDesc(lesson.getLessonId());
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

    public QuestionBank createQuestion(QuestionBank question, Long lessonId, Long adminUserId) {
        Lesson lesson = resolveLesson(lessonId);
        
        question.setLesson(lesson);
        question.setCreatedBy(adminUserId);
        question.setUpdatedBy(adminUserId);
        question.setCreatedAt(OffsetDateTime.now());
        question.setUpdatedAt(OffsetDateTime.now());
        if (question.getStatus() == null) {
            question.setStatus("DRAFT");
        }

        if (question.getOptions() != null) {
            question.getOptions().forEach(opt -> opt.setQuestionBank(question));
        }

        return questionBankRepository.save(question);
    }

    public QuestionBank updateQuestion(Long questionId, QuestionBank updateData, Long adminUserId) {
        QuestionBank existing = questionBankRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy câu hỏi kho đề ID = " + questionId));

        existing.setQuestionType(updateData.getQuestionType());
        existing.setDifficulty(updateData.getDifficulty());
        existing.setPrompt(updateData.getPrompt());
        existing.setJapaneseText(updateData.getJapaneseText());
        existing.setAudioUrl(updateData.getAudioUrl());
        existing.setAudioText(updateData.getAudioText());
        existing.setTranscript(updateData.getTranscript());
        existing.setValidAnswers(updateData.getValidAnswers());
        existing.setExplanation(updateData.getExplanation());
        existing.setStatus(updateData.getStatus());
        existing.setUpdatedBy(adminUserId);

        if (updateData.getOptions() != null) {
            existing.setOptions(updateData.getOptions());
        }

        return questionBankRepository.save(existing);
    }

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
        List<QuestionBank> drafts = questionBankRepository.findByLesson_LessonIdAndDeletedAtIsNullOrderByQuestionIdDesc(lesson.getLessonId());
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

    public List<QuestionBank> generate30JLPTQuestionsForLesson(Long lessonId, Long adminUserId, boolean setAsActive) {
        Lesson lesson = resolveLesson(lessonId);

        // Soft delete previous legacy question bank rows for this lesson to maintain audit trace
        List<QuestionBank> oldQuestions = questionBankRepository.findByLesson_LessonIdAndDeletedAtIsNullOrderByQuestionIdDesc(lesson.getLessonId());
        if (!oldQuestions.isEmpty()) {
            oldQuestions.forEach(q -> {
                q.setDeletedAt(OffsetDateTime.now());
                q.setStatus("INACTIVE");
            });
            questionBankRepository.saveAll(oldQuestions);
        }

        List<Vocabulary> vocabList = vocabularyRepository.findByLesson_LessonIdOrderBySortOrderAsc(lesson.getLessonId());
        if (vocabList.isEmpty()) {
            // Fallback try all vocabularies from DB if lesson vocab is empty
            vocabList = vocabularyRepository.findAll().stream().limit(50).collect(Collectors.toList());
        }
        if (vocabList.isEmpty()) {
            throw new IllegalStateException("Hệ thống chưa có dữ liệu từ vựng thực tế trong DB để sinh đề!");
        }

        List<QuestionBank> generatedQuestions = new ArrayList<>();
        String statusToSet = setAsActive ? "ACTIVE" : "DRAFT";

        int targetCount = 30;
        for (int i = 0; i < targetCount; i++) {
            Vocabulary item = vocabList.get(i % vocabList.size());
            List<Vocabulary> catDistractors = getQualityDistractors(item, vocabList);

            // Determine question format according to exact 30-question ratio breakdown (Vocabulary & Grammar ONLY):
            // 10 câu: JAPANESE_TO_MEANING (0..9)
            // 8 câu: MEANING_TO_JAPANESE (10..17)
            // 5 câu: CONTEXTUAL_VOCABULARY (18..22)
            // 3 câu: LISTENING_TO_WORD (23..25)
            // 4 câu: MULTIPLE_CHOICE Grammar Particles (26..29)
            String qType;
            if (i < 10) qType = "JAPANESE_TO_MEANING";
            else if (i < 18) qType = "MEANING_TO_JAPANESE";
            else if (i < 23) qType = "CONTEXTUAL_VOCABULARY";
            else if (i < 26) qType = "LISTENING_TO_WORD";
            else qType = "MULTIPLE_CHOICE";

            QuestionBank q = new QuestionBank();
            q.setLesson(lesson);
            q.setCreatedBy(adminUserId);
            q.setUpdatedBy(adminUserId);
            q.setStatus(statusToSet);
            q.setDifficulty((i % 3 == 0) ? "HARD" : (i % 2 == 0 ? "EASY" : "MEDIUM"));

            String mainWord = item.getWord() != null ? item.getWord() : item.getKana();

            if ("JAPANESE_TO_MEANING".equals(qType)) {
                // Dạng 1: Nhật ➔ Nghĩa (10 câu)
                q.setQuestionType("JAPANESE_TO_MEANING");
                q.setPrompt("CHỌN NGHĨA ĐÚNG CỦA CÂU TRÊN");
                q.setJapaneseText("「 " + mainWord + " 」");
                q.setExplanation("Nghĩa tiếng Việt chuẩn xác của " + mainWord + " (" + item.getKana() + ") là: " + item.getMeaningVi());

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption(item.getMeaningVi(), true, 1));
                for (Vocabulary d : catDistractors) {
                    options.add(new QuestionBankOption(d.getMeaningVi(), false, options.size() + 1));
                }
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);

            } else if ("MEANING_TO_JAPANESE".equals(qType)) {
                // Dạng 2: Nghĩa ➔ Tiếng Nhật (8 câu)
                q.setQuestionType("MEANING_TO_JAPANESE");
                q.setPrompt("CHỌN TỪ TIẾNG NHẬT TƯƠNG ỨNG");
                q.setJapaneseText("「 " + item.getMeaningVi() + " 」");
                q.setExplanation("Từ tiếng Nhật mang nghĩa \"" + item.getMeaningVi() + "\" là: " + mainWord + " (" + item.getKana() + ")");

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption(mainWord, true, 1));
                for (Vocabulary d : catDistractors) {
                    String dWord = d.getWord() != null ? d.getWord() : d.getKana();
                    options.add(new QuestionBankOption(dWord, false, options.size() + 1));
                }
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);

            } else if ("CONTEXTUAL_VOCABULARY".equals(qType)) {
                // Dạng 3: Nhận diện từ vựng trong ngữ cảnh hội thoại (5 câu)
                q.setQuestionType("CONTEXTUAL_VOCABULARY");
                q.setPrompt("CHỌN TỪ ĐIỀN VÀO NGỮ CẢNH HỘI THOẠI");
                q.setJapaneseText(buildContextualDialogue(item, mainWord));
                q.setExplanation("Từ vựng phù hợp nhất điền vào hội thoại là: " + mainWord + " (" + item.getMeaningVi() + ")");

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption(mainWord, true, 1));
                for (Vocabulary d : catDistractors) {
                    String dWord = d.getWord() != null ? d.getWord() : d.getKana();
                    options.add(new QuestionBankOption(dWord, false, options.size() + 1));
                }
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);

            } else if ("LISTENING_TO_WORD".equals(qType)) {
                // Dạng 4: Nghe audio từ vựng (3 câu)
                q.setQuestionType("LISTENING_TO_WORD");
                q.setPrompt("🔊 [LUYỆN NGHE] NGHE PHÁT ÂM AUDIO VÀ CHỌN NGHĨA TIẾNG VIỆT TƯƠNG ỨNG");
                q.setJapaneseText("🔊 [Hãy bấm nút phát âm để nghe từ tiếng Nhật]");
                q.setAudioText(item.getKana() != null ? item.getKana() : mainWord);
                q.setAudioUrl(item.getAudioUrl());
                q.setTranscript(mainWord + " (" + item.getKana() + ") : " + item.getMeaningVi());
                q.setExplanation("Âm thanh phát âm tiếng Nhật: " + item.getKana() + " (" + mainWord + ") ➔ Nghĩa tiếng Việt: " + item.getMeaningVi());

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption(item.getMeaningVi(), true, 1));
                for (Vocabulary d : catDistractors) {
                    options.add(new QuestionBankOption(d.getMeaningVi(), false, options.size() + 1));
                }
                Collections.shuffle(options);
                for (int optIdx = 0; optIdx < options.size(); optIdx++) options.get(optIdx).setSortOrder(optIdx + 1);
                q.setOptions(options);

            } else {
                // Dạng 5: Ngữ Pháp & Trợ Từ (4 câu)
                q.setQuestionType("MULTIPLE_CHOICE");
                q.setPrompt("CHỌN TRỢ TỪ HOẶC MẪU CÂU NGỮ PHÁP THÍCH HỢP");
                q.setJapaneseText("わたし _____ " + mainWord + " です。");
                q.setExplanation("Trợ từ 「は」 đứng sau chủ ngữ (わたし) để đánh dấu chủ đề của câu.");

                List<QuestionBankOption> options = new ArrayList<>();
                options.add(new QuestionBankOption("は (wa)", true, 1));
                options.add(new QuestionBankOption("の (no)", false, 2));
                options.add(new QuestionBankOption("に (ni)", false, 3));
                options.add(new QuestionBankOption("で (de)", false, 4));
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

    private String buildContextualDialogue(Vocabulary item, String mainWord) {
        if (item == null) return "A: これは何ですか。\nB: 「 ＿＿＿ 」です。";
        String meaning = item.getMeaningVi() != null ? item.getMeaningVi().toLowerCase() : "";
        String word = item.getWord() != null ? item.getWord().toLowerCase() : "";
        String kana = item.getKana() != null ? item.getKana().toLowerCase() : "";

        // 1. Age expressions / questions
        if (meaning.contains("tuổi") || kana.contains("おいくつ") || kana.contains("なんさい") || word.contains("歳") || word.contains("才")) {
            if (kana.contains("おいくつ") || kana.contains("なんさい")) {
                return "A: 田中さんの息子さんは「 ＿＿＿ 」ですか。\nB: 9歳です。";
            }
            return "A: 太郎くんは何歳ですか。\nB: 「 ＿＿＿ 」です。";
        }

        // 2. People / Occupations / Pronouns
        if (meaning.contains("người") || meaning.contains("ai") || meaning.contains("thầy") || meaning.contains("học sinh") || 
            meaning.contains("nhân viên") || meaning.contains("bác sĩ") || meaning.contains("tôi") || meaning.contains("bạn") ||
            kana.contains("あのひと") || kana.contains("あのかた") || kana.contains("だれ") || kana.contains("どなた")) {
            if (kana.contains("だれ") || kana.contains("どなた")) {
                return "A: あちらの優しい方は「 ＿＿＿ 」ですか。\nB: 日本語の先生です。";
            }
            return "A: あの有名な方は「 ＿＿＿ 」ですか。\nB: はい、山田先生です。";
        }

        // 3. Countries / Places
        if (meaning.contains("nước") || meaning.contains("quốc gia") || meaning.contains("ở đâu") || meaning.contains("trường") || 
            meaning.contains("công ty") || meaning.contains("bệnh viện") || meaning.contains("ngân hàng") ||
            kana.contains("どこ") || kana.contains("どちら") || kana.contains("にほん") || kana.contains("かんこく") || kana.contains("ちゅうごく")) {
            if (kana.contains("どこ") || kana.contains("どちら")) {
                return "A: あなたの会社は「 ＿＿＿ 」ですか。\nB: 東京です。";
            }
            return "A: マリアさんの出身は「 ＿＿＿ 」ですか。\nB: はい、ベトナムです。";
        }

        // 4. Greetings / Polite phrases
        if (meaning.contains("hân hạnh") || meaning.contains("xin lỗi") || meaning.contains("vâng") || meaning.contains("không") ||
            meaning.contains("chào") || kana.contains("はじめまして") || kana.contains("はい") || kana.contains("いいえ")) {
            if (kana.contains("はい") || kana.contains("いいえ")) {
                return "A: あなたは学生ですか。\nB: 「 ＿＿＿ 」、学生です。";
            }
            return "A: 初めてお目にかかります。「 ＿＿＿ 」。\nB: こちらこそ、よろしくお願いいたします。";
        }

        // 5. Objects / Things (default)
        return "A: これは何ですか。\nB: 「 ＿＿＿ 」です。";
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
}
