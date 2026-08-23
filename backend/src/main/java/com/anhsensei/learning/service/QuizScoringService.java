package com.anhsensei.learning.service;

import com.anhsensei.curriculum.domain.QuestionBank;
import com.anhsensei.curriculum.domain.QuestionBankOption;
import com.anhsensei.curriculum.domain.Quiz;
import com.anhsensei.curriculum.repository.QuestionBankRepository;
import com.anhsensei.curriculum.repository.QuizRepository;
import com.anhsensei.curriculum.service.AdminQuestionBankService;
import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.UserRepository;
import com.anhsensei.learning.domain.LearningProgress;
import com.anhsensei.learning.domain.QuizAttempt;
import com.anhsensei.learning.domain.QuizAttemptAnswer;
import com.anhsensei.learning.repository.LearningProgressRepository;
import com.anhsensei.learning.repository.QuizAttemptAnswerRepository;
import com.anhsensei.learning.repository.QuizAttemptRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.OffsetDateTime;
import java.util.*;

@Service
@Transactional
public class QuizScoringService {

    private final QuizRepository quizRepository;
    private final QuestionBankRepository questionBankRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizAttemptAnswerRepository quizAttemptAnswerRepository;
    private final UserRepository userRepository;
    private final LearningProgressRepository learningProgressRepository;
    private final AdminQuestionBankService adminQuestionBankService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public QuizScoringService(
            QuizRepository quizRepository,
            QuestionBankRepository questionBankRepository,
            QuizAttemptRepository quizAttemptRepository,
            QuizAttemptAnswerRepository quizAttemptAnswerRepository,
            UserRepository userRepository,
            LearningProgressRepository learningProgressRepository,
            AdminQuestionBankService adminQuestionBankService) {
        this.quizRepository = quizRepository;
        this.questionBankRepository = questionBankRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.quizAttemptAnswerRepository = quizAttemptAnswerRepository;
        this.userRepository = userRepository;
        this.learningProgressRepository = learningProgressRepository;
        this.adminQuestionBankService = adminQuestionBankService;
    }

    /**
     * Start a Quiz Attempt:
     * Auto-ensures Question Bank has 30 JLPT questions and samples exactly 15 random questions per attempt.
     * Returns full StartQuizData structure with questions and options.
     */
    public Map<String, Object> startQuizAttempt(Long userId, Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseGet(() -> quizRepository.findByLesson_LessonId(quizId).orElse(null));

        Long lessonId = quizId;
        if (quiz != null && quiz.getLesson() != null) {
            lessonId = quiz.getLesson().getLessonId();
        }

        // Auto-ensure 30 ACTIVE questions exist in QuestionBank for this lesson
        try {
            adminQuestionBankService.ensureQuestionBankExistsForLesson(lessonId);
        } catch (Exception e) {
            // Ignore if lesson has no vocabs yet
        }

        quiz = quizRepository.findById(quizId)
                .orElseGet(() -> quizRepository.findByLesson_LessonId(quizId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài Quiz cho bài học ID = " + quizId)));

        adminQuestionBankService.ensureQuestionBankExistsForLesson(quiz.getLesson() != null ? quiz.getLesson().getLessonId() : quizId);

        if (!"PUBLISHED".equalsIgnoreCase(quiz.getStatus())) {
            throw new IllegalStateException("Bài Quiz này chưa được Xuất bản (PUBLISHED). Học viên chưa thể làm bài!");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng ID = " + userId));

        // Mark any old IN_PROGRESS attempt as ABANDONED so learner always gets a fresh quality attempt
        Optional<QuizAttempt> inProgressOpt = quizAttemptRepository.findFirstByUser_UserIdAndQuiz_QuizIdAndStatusOrderByStartedAtDesc(userId, quizId, "IN_PROGRESS");
        if (inProgressOpt.isPresent()) {
            QuizAttempt old = inProgressOpt.get();
            old.setStatus("ABANDONED");
            quizAttemptRepository.save(old);
        }

        long previousAttemptsCount = quizAttemptRepository.countByUser_UserIdAndQuiz_QuizId(userId, quizId);
        int attemptNum = (int) previousAttemptsCount + 1;

        QuizAttempt attempt = new QuizAttempt(user, quiz, attemptNum);
        attempt.setStatus("IN_PROGRESS");
        attempt.setStartedAt(OffsetDateTime.now());
        attempt = quizAttemptRepository.save(attempt);

        // Fetch ACTIVE Question Bank questions for this lesson
        List<QuestionBank> activeQuestions = questionBankRepository.findByLesson_LessonIdAndStatusAndDeletedAtIsNull(lessonId, "ACTIVE");
        if (activeQuestions.isEmpty()) {
            activeQuestions = questionBankRepository.findByLesson_LessonIdAndDeletedAtIsNullOrderByQuestionIdDesc(lessonId);
        }

        // Shuffle all 30 questions randomly & cap at target questions count (default 30)
        Collections.shuffle(activeQuestions);
        int targetCount = (quiz.getQuestionsPerAttempt() != null && quiz.getQuestionsPerAttempt() > 0)
                ? quiz.getQuestionsPerAttempt() : 30;
        List<QuestionBank> selected = activeQuestions.subList(0, Math.min(targetCount, activeQuestions.size()));

        List<Map<String, Object>> questionDtos = new ArrayList<>();

        // Create fixed Snapshot QuizAttemptAnswer rows & build Question DTOs
        for (QuestionBank q : selected) {
            QuizAttemptAnswer answerRow = new QuizAttemptAnswer();
            answerRow.setAttempt(attempt);
            answerRow.setQuestionPromptSnapshot(q.getPrompt());
            answerRow.setUserAnswerSnapshot("{}");
            answerRow.setCorrectAnswerSnapshot(buildCorrectAnswerSnapshot(q));
            answerRow.setExplanationSnapshot(q.getExplanation());
            answerRow.setEarnedScore(BigDecimal.ZERO);
            answerRow.setIsCorrect(false);
            answerRow = quizAttemptAnswerRepository.save(answerRow);

            Map<String, Object> qDto = new HashMap<>();
            qDto.put("questionId", q.getQuestionId());
            qDto.put("attemptAnswerId", answerRow.getAttemptAnswerId());
            qDto.put("questionType", q.getQuestionType());
            qDto.put("prompt", q.getPrompt());
            qDto.put("japaneseText", q.getJapaneseText());
            qDto.put("audioText", q.getAudioText());
            qDto.put("transcript", q.getTranscript());
            qDto.put("explanation", q.getExplanation());

            List<Map<String, Object>> optDtos = new ArrayList<>();
            if (q.getOptions() != null && !q.getOptions().isEmpty()) {
                for (QuestionBankOption opt : q.getOptions()) {
                    Map<String, Object> oMap = new HashMap<>();
                    oMap.put("optionId", opt.getOptionId());
                    oMap.put("optionText", opt.getOptionText());
                    optDtos.add(oMap);
                }
                Collections.shuffle(optDtos); // Randomly shuffle options A, B, C, D
            }
            qDto.put("options", optDtos);
            questionDtos.add(qDto);
        }

        attempt.setTotalCount(selected.size());
        quizAttemptRepository.save(attempt);

        Map<String, Object> response = new HashMap<>();
        response.put("attemptId", attempt.getAttemptId());
        response.put("quizId", quiz.getQuizId());
        response.put("title", quiz.getTitle());
        response.put("description", quiz.getDescription());
        response.put("passScore", quiz.getPassScore());
        response.put("timeLimitMinutes", quiz.getTimeLimitMinutes() != null ? quiz.getTimeLimitMinutes() : 10);
        response.put("questions", questionDtos);

        return response;
    }

    /**
     * Submit Attempt and Grade Server-Side:
     * MANDATORY RULE #1: Immutable logs.
     * MANDATORY RULE #3: Prevent Re-submission.
     * MANDATORY RULE #4: Score & Reward calculated at Backend ONLY.
     */
    public QuizAttempt submitAttempt(Long userId, Long attemptId, Map<Long, String> userAnswers) {
        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lượt làm bài ID = " + attemptId));

        // MANDATORY RULE #3: Attempt already SUBMITTED cannot be submitted again!
        if ("SUBMITTED".equalsIgnoreCase(attempt.getStatus())) {
            throw new IllegalStateException("Lượt làm bài này đã được Nộp trước đó. Không thể nộp lại!");
        }

        List<QuizAttemptAnswer> answerRows = quizAttemptAnswerRepository.findByAttempt_AttemptId(attemptId);
        int correctCount = 0;
        int totalCount = answerRows.size();

        for (QuizAttemptAnswer row : answerRows) {
            String userAnswerStr = userAnswers.get(row.getAttemptAnswerId());
            if (userAnswerStr != null) {
                row.setUserAnswerSnapshot(userAnswerStr);
                
                boolean isCorrect = evaluateAnswerServerSide(row, userAnswerStr);
                row.setIsCorrect(isCorrect);
                if (isCorrect) {
                    correctCount++;
                    row.setEarnedScore(BigDecimal.ONE);
                } else {
                    row.setEarnedScore(BigDecimal.ZERO);
                }
            }
            quizAttemptAnswerRepository.save(row);
        }

        BigDecimal score = totalCount > 0
                ? new BigDecimal(correctCount).multiply(new BigDecimal("100")).divide(new BigDecimal(totalCount), 2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        attempt.setScore(score);
        attempt.setCorrectCount(correctCount);
        attempt.setTotalCount(totalCount);
        attempt.setStatus("SUBMITTED");
        attempt.setSubmittedAt(OffsetDateTime.now());

        QuizAttempt savedAttempt = quizAttemptRepository.save(attempt);

        // If score >= passScore (70%), sync 100% progress and award Water Drops
        BigDecimal passScore = attempt.getQuiz() != null && attempt.getQuiz().getPassScore() != null
                ? attempt.getQuiz().getPassScore() : new BigDecimal("70.00");

        if (score.compareTo(passScore) >= 0) {
            Long lessonId = attempt.getQuiz().getLesson() != null ? attempt.getQuiz().getLesson().getLessonId() : null;
            if (lessonId != null) {
                LearningProgress progress = learningProgressRepository.findByUser_UserIdAndLesson_LessonId(userId, lessonId)
                        .orElseGet(() -> {
                            LearningProgress lp = new LearningProgress();
                            lp.setUser(userRepository.getReferenceById(userId));
                            lp.setLesson(attempt.getQuiz().getLesson());
                            return lp;
                        });
                progress.setStatus("COMPLETED");
                progress.setCompletionPercent(new BigDecimal("100.00"));
                progress.setCompletedAt(OffsetDateTime.now());
                progress.setLastAccessedAt(OffsetDateTime.now());
                learningProgressRepository.save(progress);
            }
        }

        return savedAttempt;
    }

    private boolean evaluateAnswerServerSide(QuizAttemptAnswer row, String userAnswerRaw) {
        if (userAnswerRaw == null || userAnswerRaw.isBlank()) return false;

        try {
            Map<String, Object> correctMap = objectMapper.readValue(row.getCorrectAnswerSnapshot(), new TypeReference<>() {});
            String qType = (String) correctMap.get("type");

            if ("TYPING".equalsIgnoreCase(qType)) {
                List<String> validList = (List<String>) correctMap.get("validAnswers");
                if (validList == null) return false;
                
                String normalizedUser = normalizeTypingInput(userAnswerRaw);
                for (String valid : validList) {
                    if (normalizeTypingInput(valid).equalsIgnoreCase(normalizedUser)) {
                        return true;
                    }
                }
                return false;
            } else {
                String correctText = (String) correctMap.get("correctOptionText");
                return correctText != null && correctText.trim().equalsIgnoreCase(userAnswerRaw.trim());
            }
        } catch (Exception e) {
            return false;
        }
    }

    private String normalizeTypingInput(String str) {
        if (str == null) return "";
        String s = str.trim().toLowerCase();
        
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (c >= 65281 && c <= 65374) {
                sb.append((char) (c - 65248));
            } else if (c == 12288) {
                sb.append(' ');
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    private String buildCorrectAnswerSnapshot(QuestionBank q) {
        Map<String, Object> map = new HashMap<>();
        map.put("type", q.getQuestionType());
        map.put("prompt", q.getPrompt());
        
        if ("TYPING".equalsIgnoreCase(q.getQuestionType())) {
            try {
                List<String> list = objectMapper.readValue(q.getValidAnswers() != null ? q.getValidAnswers() : "[]", new TypeReference<>() {});
                map.put("validAnswers", list);
            } catch (Exception e) {
                map.put("validAnswers", List.of());
            }
        } else {
            String correctOpt = q.getOptions().stream()
                    .filter(QuestionBankOption::getIsCorrect)
                    .map(QuestionBankOption::getOptionText)
                    .findFirst().orElse("");
            map.put("correctOptionText", correctOpt);
        }

        try {
            return objectMapper.writeValueAsString(map);
        } catch (Exception e) {
            return "{}";
        }
    }
}
