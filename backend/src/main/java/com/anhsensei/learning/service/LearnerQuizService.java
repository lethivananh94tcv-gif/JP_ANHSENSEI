package com.anhsensei.learning.service;

import com.anhsensei.common.exception.ResourceNotFoundException;
import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.repository.*;
import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.UserRepository;
import com.anhsensei.learning.domain.LearningActivity;
import com.anhsensei.learning.domain.QuizAttempt;
import com.anhsensei.learning.domain.QuizAttemptAnswer;
import com.anhsensei.learning.dto.*;
import com.anhsensei.learning.repository.LearningActivityRepository;
import com.anhsensei.learning.repository.QuizAttemptAnswerRepository;
import com.anhsensei.learning.repository.QuizAttemptRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.*;

@Service
public class LearnerQuizService {

    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final QuestionOptionRepository questionOptionRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizAttemptAnswerRepository quizAttemptAnswerRepository;
    private final LearningActivityRepository learningActivityRepository;
    private final LearnerProgressService learnerProgressService;

    public LearnerQuizService(
            UserRepository userRepository,
            QuizRepository quizRepository,
            QuestionRepository questionRepository,
            QuestionOptionRepository questionOptionRepository,
            QuizAttemptRepository quizAttemptRepository,
            QuizAttemptAnswerRepository quizAttemptAnswerRepository,
            LearningActivityRepository learningActivityRepository,
            LearnerProgressService learnerProgressService
    ) {
        this.userRepository = userRepository;
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.questionOptionRepository = questionOptionRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.quizAttemptAnswerRepository = quizAttemptAnswerRepository;
        this.learningActivityRepository = learningActivityRepository;
        this.learnerProgressService = learnerProgressService;
    }

    @Transactional
    public StartQuizResponse startQuiz(Long userId, Long quizId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz", "id", quizId));

        if (!"PUBLISHED".equals(quiz.getStatus()) || quiz.getDeletedAt() != null) {
            throw new IllegalArgumentException("Bài quiz chưa được phát hành hoặc đã bị xóa.");
        }

        OffsetDateTime now = OffsetDateTime.now();

        // 1. Check if there is an active IN_PROGRESS attempt that has not expired (Resume Attempt)
        Optional<QuizAttempt> existingAttemptOpt = quizAttemptRepository
                .findFirstByUser_UserIdAndQuiz_QuizIdAndStatusOrderByStartedAtDesc(userId, quizId, "IN_PROGRESS");

        if (existingAttemptOpt.isPresent()) {
            QuizAttempt existingAttempt = existingAttemptOpt.get();
            boolean isExpired = false;

            if (quiz.getTimeLimitMinutes() != null && quiz.getTimeLimitMinutes() > 0) {
                if (now.isAfter(existingAttempt.getStartedAt().plusMinutes(quiz.getTimeLimitMinutes()))) {
                    existingAttempt.setStatus("EXPIRED");
                    quizAttemptRepository.save(existingAttempt);
                    isExpired = true;
                }
            }

            if (!isExpired) {
                return buildStartQuizResponse(existingAttempt, quiz, true);
            }
        }

        // 2. Check max attempts constraint
        long completedAttemptsCount = quizAttemptRepository.countByUser_UserIdAndQuiz_QuizId(userId, quizId);
        if (quiz.getMaxAttempts() != null && quiz.getMaxAttempts() > 0 && completedAttemptsCount >= quiz.getMaxAttempts()) {
            throw new IllegalArgumentException("Bạn đã dùng hết số lần làm bài quiz này (Tối đa " + quiz.getMaxAttempts() + " lần).");
        }

        // 3. Create a new attempt
        int attemptNumber = (int) completedAttemptsCount + 1;
        QuizAttempt newAttempt = new QuizAttempt(user, quiz, attemptNumber);
        QuizAttempt savedAttempt = quizAttemptRepository.save(newAttempt);

        // 4. Snapshot questions and options at start (Question Bank Sampling & Shuffling)
        List<Question> allQuestions = questionRepository.findByQuiz_QuizIdOrderBySortOrderAsc(quizId);
        List<Question> questionsToUse = new ArrayList<>(allQuestions);
        if (Boolean.TRUE.equals(quiz.getShuffleQuestions())) {
            Collections.shuffle(questionsToUse);
        }
        int sampleCount = (quiz.getQuestionsPerAttempt() != null && quiz.getQuestionsPerAttempt() > 0)
                ? Math.min(questionsToUse.size(), quiz.getQuestionsPerAttempt())
                : questionsToUse.size();

        List<Question> selectedQuestions = questionsToUse.subList(0, sampleCount);
        for (Question q : selectedQuestions) {
            String explanationSnap = q.getExplanation();
            QuizAttemptAnswer qaa = new QuizAttemptAnswer(
                    savedAttempt,
                    q,
                    q.getPrompt(),
                    "{}",
                    "{}",
                    explanationSnap
            );
            quizAttemptAnswerRepository.save(qaa);
        }

        return buildStartQuizResponse(savedAttempt, quiz, false);
    }

    @Transactional
    public void autosaveAnswers(Long userId, Long attemptId, AutosaveAnswersRequest request) {
        QuizAttempt attempt = quizAttemptRepository.findByAttemptIdAndUser_UserId(attemptId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("QuizAttempt", "id", attemptId));

        if (!"IN_PROGRESS".equals(attempt.getStatus())) {
            throw new IllegalArgumentException("Lần thi này đã kết thúc hoặc quá hạn, không thể lưu nháp.");
        }

        Quiz quiz = attempt.getQuiz();
        if (quiz.getTimeLimitMinutes() != null && quiz.getTimeLimitMinutes() > 0) {
            if (OffsetDateTime.now().isAfter(attempt.getStartedAt().plusMinutes(quiz.getTimeLimitMinutes()))) {
                attempt.setStatus("EXPIRED");
                quizAttemptRepository.save(attempt);
                throw new IllegalArgumentException("Đã hết thời gian làm bài thi.");
            }
        }

        if (request.getAnswers() != null) {
            for (AutosaveAnswersRequest.QuestionAnswerInput input : request.getAnswers()) {
                if (input.getQuestionId() == null) continue;
                QuizAttemptAnswer qaa = quizAttemptAnswerRepository
                        .findByAttempt_AttemptIdAndQuestion_QuestionId(attemptId, input.getQuestionId())
                        .orElse(null);

                if (qaa != null) {
                    if (input.getSelectedOptionId() != null) {
                        QuestionOption opt = questionOptionRepository.findById(input.getSelectedOptionId()).orElse(null);
                        qaa.setSelectedOption(opt);
                    } else {
                        qaa.setSelectedOption(null);
                    }
                    qaa.setTextAnswer(input.getTextAnswer());
                    qaa.setAnsweredAt(OffsetDateTime.now());
                    quizAttemptAnswerRepository.save(qaa);
                }
            }
        }
    }

    @Transactional
    public QuizResultDto submitAttempt(Long userId, Long attemptId, SubmitAttemptRequest request) {
        QuizAttempt attempt = quizAttemptRepository.findByAttemptIdAndUser_UserId(attemptId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("QuizAttempt", "id", attemptId));

        // Idempotency: If already submitted, return the result snapshot directly
        if ("SUBMITTED".equals(attempt.getStatus())) {
            return getAttemptResult(userId, attemptId);
        }

        if (!"IN_PROGRESS".equals(attempt.getStatus())) {
            throw new IllegalArgumentException("Lần thi này không ở trạng thái có thể nộp bài (Trạng thái: " + attempt.getStatus() + ").");
        }

        Quiz quiz = attempt.getQuiz();
        OffsetDateTime now = OffsetDateTime.now();

        // 1. TimeLimit check
        boolean isExpired = false;
        if (quiz.getTimeLimitMinutes() != null && quiz.getTimeLimitMinutes() > 0) {
            if (now.isAfter(attempt.getStartedAt().plusMinutes(quiz.getTimeLimitMinutes()).plusSeconds(15))) { // 15s grace period
                isExpired = true;
            }
        }

        // Save any submitted answers in request before grading
        if (request != null && request.getAnswers() != null) {
            for (AutosaveAnswersRequest.QuestionAnswerInput input : request.getAnswers()) {
                if (input.getQuestionId() == null) continue;
                QuizAttemptAnswer qaa = quizAttemptAnswerRepository
                        .findByAttempt_AttemptIdAndQuestion_QuestionId(attemptId, input.getQuestionId())
                        .orElse(null);

                if (qaa != null) {
                    if (input.getSelectedOptionId() != null) {
                        QuestionOption opt = questionOptionRepository.findById(input.getSelectedOptionId()).orElse(null);
                        qaa.setSelectedOption(opt);
                    }
                    if (input.getTextAnswer() != null) {
                        qaa.setTextAnswer(input.getTextAnswer());
                    }
                    qaa.setAnsweredAt(now);
                    quizAttemptAnswerRepository.save(qaa);
                }
            }
        }

        List<QuizAttemptAnswer> answers = quizAttemptAnswerRepository.findByAttempt_AttemptId(attemptId);
        int correctCount = 0;
        int totalCount = answers.size();
        int answeredCount = 0;
        BigDecimal totalEarnedWeight = BigDecimal.ZERO;
        BigDecimal totalPossibleWeight = BigDecimal.ZERO;

        for (QuizAttemptAnswer qaa : answers) {
            Question q = qaa.getQuestion();
            BigDecimal weight = q.getWeight() != null ? q.getWeight() : BigDecimal.ONE;
            totalPossibleWeight = totalPossibleWeight.add(weight);

            String qType = q.getQuestionType() != null ? q.getQuestionType().toUpperCase() : "SINGLE_CHOICE";
            boolean isCorrect = false;

            if (qaa.getSelectedOption() != null || (qaa.getTextAnswer() != null && !qaa.getTextAnswer().trim().isEmpty())) {
                answeredCount++;
            }

            // Auto-grade supported objective question types
            if (Set.of("SINGLE_CHOICE", "MULTIPLE_CHOICE", "TRUE_FALSE").contains(qType)) {
                if (qaa.getSelectedOption() != null && Boolean.TRUE.equals(qaa.getSelectedOption().getIsCorrect())) {
                    isCorrect = true;
                }
            } else if ("FILL_BLANK".equals(qType)) {
                if (qaa.getTextAnswer() != null && q.getCorrectAnswer() != null) {
                    if (qaa.getTextAnswer().trim().equalsIgnoreCase(q.getCorrectAnswer().trim())) {
                        isCorrect = true;
                    }
                }
            } else {
                // Unsupported / Manual Essay type: earned_score = 0
                isCorrect = false;
            }

            qaa.setIsCorrect(isCorrect);
            if (isCorrect) {
                correctCount++;
                qaa.setEarnedScore(weight);
                totalEarnedWeight = totalEarnedWeight.add(weight);
            } else {
                qaa.setEarnedScore(BigDecimal.ZERO);
            }

            // Create JSON snapshots of user answer & correct answer
            String userAnsSnap = String.format("{\"selectedOptionId\":%s,\"textAnswer\":\"%s\"}",
                    qaa.getSelectedOption() != null ? qaa.getSelectedOption().getOptionId() : "null",
                    qaa.getTextAnswer() != null ? qaa.getTextAnswer().replace("\"", "\\\"") : "");

            List<QuestionOption> options = questionOptionRepository.findByQuestion_QuestionIdOrderBySortOrderAsc(q.getQuestionId());
            Long correctOptId = options.stream().filter(o -> Boolean.TRUE.equals(o.getIsCorrect())).map(QuestionOption::getOptionId).findFirst().orElse(null);
            String correctAnsSnap = String.format("{\"correctOptionId\":%s,\"correctAnswer\":\"%s\"}",
                    correctOptId != null ? correctOptId : "null",
                    q.getCorrectAnswer() != null ? q.getCorrectAnswer().replace("\"", "\\\"") : "");

            qaa.setUserAnswerSnapshot(userAnsSnap);
            qaa.setCorrectAnswerSnapshot(correctAnsSnap);
            qaa.setExplanationSnapshot(q.getExplanation());
            quizAttemptAnswerRepository.save(qaa);
        }
        quizAttemptAnswerRepository.flush();

        BigDecimal scorePercent = BigDecimal.ZERO;
        if (totalPossibleWeight.compareTo(BigDecimal.ZERO) > 0) {
            scorePercent = totalEarnedWeight.divide(totalPossibleWeight, 4, RoundingMode.HALF_UP).multiply(new BigDecimal("100")).setScale(2, RoundingMode.HALF_UP);
        }

        BigDecimal passScoreThreshold = quiz.getPassScore() != null ? quiz.getPassScore() : new BigDecimal("60.00");
        boolean passed = scorePercent.compareTo(passScoreThreshold) >= 0;

        attempt.setScore(scorePercent);
        attempt.setCorrectCount(correctCount);
        attempt.setTotalCount(totalCount);
        attempt.setSubmittedAt(now);
        attempt.setStatus(isExpired ? "EXPIRED" : "SUBMITTED");
        QuizAttempt savedAttempt = quizAttemptRepository.saveAndFlush(attempt);

        // 5. Create LearningActivity if answered >= 1 question
        if (answeredCount > 0) {
            int durationSeconds = (int) (now.toEpochSecond() - attempt.getStartedAt().toEpochSecond());
            LearningActivity activity = new LearningActivity(
                    attempt.getUser(),
                    "QUIZ_SUBMITTED",
                    "QUIZ",
                    quiz.getQuizId(),
                    Math.max(durationSeconds, 10),
                    LocalDate.now(),
                    attempt.getUser().getTimezone()
            );
            learningActivityRepository.save(activity);
        }

        // 6. Recalculate lesson progress if passed & tied to a lesson
        if (passed && quiz.getLesson() != null) {
            learnerProgressService.recalculateLessonProgress(attempt.getUser(), quiz.getLesson());
        }

        return getAttemptResult(userId, attemptId);
    }

    @Transactional(readOnly = true)
    public List<QuizResultDto> getQuizAttemptHistory(Long userId, Long quizId) {
        List<QuizAttempt> attempts = quizAttemptRepository.findByUser_UserIdAndQuiz_QuizIdOrderByAttemptNumberDesc(userId, quizId);
        List<QuizResultDto> list = new ArrayList<>();
        for (QuizAttempt qa : attempts) {
            list.add(buildQuizResultDto(qa, false));
        }
        return list;
    }

    @Transactional(readOnly = true)
    public QuizResultDto getAttemptResult(Long userId, Long attemptId) {
        QuizAttempt attempt = quizAttemptRepository.findByAttemptIdAndUser_UserId(attemptId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("QuizAttempt", "id", attemptId));

        return buildQuizResultDto(attempt, true);
    }

    private StartQuizResponse buildStartQuizResponse(QuizAttempt attempt, Quiz quiz, boolean isResumed) {
        StartQuizResponse dto = new StartQuizResponse();
        dto.setAttemptId(attempt.getAttemptId());
        dto.setQuizId(quiz.getQuizId());
        dto.setTitle(quiz.getTitle());
        dto.setDescription(quiz.getDescription());
        dto.setTimeLimitMinutes(quiz.getTimeLimitMinutes());
        dto.setPassScore(quiz.getPassScore());
        dto.setAttemptNumber(attempt.getAttemptNumber());
        dto.setIsResumed(isResumed);

        List<QuizAttemptAnswer> answers = quizAttemptAnswerRepository.findByAttempt_AttemptId(attempt.getAttemptId());
        List<StartQuizResponse.QuizQuestionDto> questionDtos = new ArrayList<>();

        for (QuizAttemptAnswer qaa : answers) {
            Question q = qaa.getQuestion();
            StartQuizResponse.QuizQuestionDto qDto = new StartQuizResponse.QuizQuestionDto();
            qDto.setQuestionId(q.getQuestionId());
            qDto.setQuestionType(q.getQuestionType());
            qDto.setPrompt(q.getPrompt());
            qDto.setWeight(q.getWeight());
            qDto.setAudioUrl(q.getAudioUrl());
            qDto.setSortOrder(q.getSortOrder());
            qDto.setCurrentSavedOptionId(qaa.getSelectedOption() != null ? qaa.getSelectedOption().getOptionId() : null);
            qDto.setCurrentSavedTextAnswer(qaa.getTextAnswer());

            List<QuestionOption> options = questionOptionRepository.findByQuestion_QuestionIdOrderBySortOrderAsc(q.getQuestionId());
            List<StartQuizResponse.QuizOptionDto> optDtos = new ArrayList<>();
            for (QuestionOption opt : options) {
                // Strictly hide correct answer flag in start/resume question list
                optDtos.add(new StartQuizResponse.QuizOptionDto(opt.getOptionId(), opt.getOptionText(), opt.getSortOrder()));
            }
            if (Boolean.TRUE.equals(quiz.getShuffleOptions())) {
                Collections.shuffle(optDtos);
            }
            qDto.setOptions(optDtos);
            questionDtos.add(qDto);
        }

        dto.setQuestions(questionDtos);
        return dto;
    }

    private QuizResultDto buildQuizResultDto(QuizAttempt attempt, boolean includeAnswers) {
        Quiz quiz = attempt.getQuiz();
        BigDecimal passThreshold = quiz.getPassScore() != null ? quiz.getPassScore() : new BigDecimal("60.00");
        boolean passed = attempt.getScore() != null && attempt.getScore().compareTo(passThreshold) >= 0;

        QuizResultDto dto = new QuizResultDto();
        dto.setAttemptId(attempt.getAttemptId());
        dto.setQuizId(quiz.getQuizId());
        dto.setQuizTitle(quiz.getTitle());
        dto.setAttemptNumber(attempt.getAttemptNumber());
        dto.setScore(attempt.getScore());
        dto.setPassScore(passThreshold);
        dto.setPassed(passed);
        dto.setStatus(attempt.getStatus());
        dto.setCorrectCount(attempt.getCorrectCount());
        dto.setTotalCount(attempt.getTotalCount());
        dto.setStartedAt(attempt.getStartedAt());
        dto.setSubmittedAt(attempt.getSubmittedAt());

        if (includeAnswers) {
            // Check ReviewMode disclosure policy
            String reviewMode = quiz.getReviewMode() != null ? quiz.getReviewMode().toUpperCase() : "IMMEDIATE";
            boolean canDisclose = "IMMEDIATE".equals(reviewMode) || "AFTER_ATTEMPT".equals(reviewMode) || "ALWAYS".equals(reviewMode);
            if ("AFTER_DEADLINE".equals(reviewMode) && quiz.getReviewAt() != null && OffsetDateTime.now().isAfter(quiz.getReviewAt())) {
                canDisclose = true;
            }
            if ("AFTER_MAX_ATTEMPTS".equals(reviewMode) && quiz.getMaxAttempts() != null) {
                long attemptsCount = quizAttemptRepository.countByUser_UserIdAndQuiz_QuizId(attempt.getUser().getUserId(), quiz.getQuizId());
                if (attemptsCount >= quiz.getMaxAttempts()) {
                    canDisclose = true;
                }
            }

            List<QuizAttemptAnswer> qaaList = quizAttemptAnswerRepository.findByAttempt_AttemptId(attempt.getAttemptId());
            List<QuizResultDto.AttemptAnswerDetailDto> ansDtos = new ArrayList<>();

            for (QuizAttemptAnswer qaa : qaaList) {
                Question q = qaa.getQuestion();
                QuizResultDto.AttemptAnswerDetailDto ansDto = new QuizResultDto.AttemptAnswerDetailDto();
                ansDto.setQuestionId(q.getQuestionId());
                ansDto.setPrompt(qaa.getQuestionPromptSnapshot());
                ansDto.setSelectedOptionId(qaa.getSelectedOption() != null ? qaa.getSelectedOption().getOptionId() : null);
                ansDto.setTextAnswer(qaa.getTextAnswer());
                ansDto.setIsCorrect(canDisclose ? qaa.getIsCorrect() : null);
                ansDto.setEarnedScore(qaa.getEarnedScore());
                ansDto.setExplanation(canDisclose ? qaa.getExplanationSnapshot() : null);
                ansDto.setCorrectAnswer(canDisclose ? q.getCorrectAnswer() : null);

                List<QuestionOption> options = questionOptionRepository.findByQuestion_QuestionIdOrderBySortOrderAsc(q.getQuestionId());
                List<QuizResultDto.OptionDetailDto> optDtos = new ArrayList<>();
                for (QuestionOption opt : options) {
                    optDtos.add(new QuizResultDto.OptionDetailDto(
                            opt.getOptionId(),
                            opt.getOptionText(),
                            canDisclose ? opt.getIsCorrect() : null
                    ));
                }
                ansDto.setOptions(optDtos);
                ansDtos.add(ansDto);
            }
            dto.setAnswers(ansDtos);
        }

        return dto;
    }
}
