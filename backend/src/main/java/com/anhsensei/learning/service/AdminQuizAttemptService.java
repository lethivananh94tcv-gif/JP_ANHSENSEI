package com.anhsensei.learning.service;

import com.anhsensei.curriculum.domain.Quiz;
import com.anhsensei.identity.domain.User;
import com.anhsensei.learning.domain.QuizAttempt;
import com.anhsensei.learning.domain.QuizAttemptAnswer;
import com.anhsensei.learning.dto.AdminQuizAttemptDetailDto;
import com.anhsensei.learning.dto.AdminQuizAttemptDto;
import com.anhsensei.learning.repository.QuizAttemptAnswerRepository;
import com.anhsensei.learning.repository.QuizAttemptRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class AdminQuizAttemptService {

    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizAttemptAnswerRepository quizAttemptAnswerRepository;

    public AdminQuizAttemptService(
            QuizAttemptRepository quizAttemptRepository,
            QuizAttemptAnswerRepository quizAttemptAnswerRepository) {
        this.quizAttemptRepository = quizAttemptRepository;
        this.quizAttemptAnswerRepository = quizAttemptAnswerRepository;
    }

    public List<AdminQuizAttemptDto> getAllQuizAttempts(String search, String level, Boolean passed) {
        List<QuizAttempt> attempts = quizAttemptRepository.findAllByOrderByStartedAtDesc();

        return attempts.stream()
                .map(this::mapToDto)
                .filter(dto -> {
                    if (search != null && !search.trim().isEmpty()) {
                        String q = search.trim().toLowerCase();
                        boolean matchName = dto.getFullName() != null && dto.getFullName().toLowerCase().contains(q);
                        boolean matchEmail = dto.getEmail() != null && dto.getEmail().toLowerCase().contains(q);
                        boolean matchQuiz = dto.getQuizTitle() != null && dto.getQuizTitle().toLowerCase().contains(q);
                        if (!matchName && !matchEmail && !matchQuiz) return false;
                    }
                    if (level != null && !level.trim().isEmpty() && !"ALL".equalsIgnoreCase(level)) {
                        if (!level.equalsIgnoreCase(dto.getLevelCode())) return false;
                    }
                    if (passed != null) {
                        if (!passed.equals(dto.getPassed())) return false;
                    }
                    return true;
                })
                .collect(Collectors.toList());
    }

    public AdminQuizAttemptDetailDto getQuizAttemptDetail(Long attemptId) {
        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lượt làm bài ID = " + attemptId));

        AdminQuizAttemptDto attemptDto = mapToDto(attempt);
        List<QuizAttemptAnswer> answers = quizAttemptAnswerRepository.findByAttempt_AttemptId(attemptId);

        List<AdminQuizAttemptDetailDto.AnswerSnapshotDto> answerDtos = answers.stream().map(a -> {
            String uAns = cleanSnapshotString(a.getUserAnswerSnapshot(), a.getTextAnswer());
            String cAns = cleanSnapshotString(a.getCorrectAnswerSnapshot(), null);
            return new AdminQuizAttemptDetailDto.AnswerSnapshotDto(
                    a.getAttemptAnswerId(),
                    a.getQuestion() != null ? a.getQuestion().getQuestionId() : null,
                    a.getQuestionPromptSnapshot() != null ? a.getQuestionPromptSnapshot() : "N/A",
                    uAns,
                    cAns,
                    a.getExplanationSnapshot(),
                    a.getIsCorrect() != null ? a.getIsCorrect() : false
            );
        }).collect(Collectors.toList());

        return new AdminQuizAttemptDetailDto(attemptDto, answerDtos);
    }

    public Map<String, Object> getQuizStatsOverview() {
        List<QuizAttempt> attempts = quizAttemptRepository.findAllByOrderByStartedAtDesc();
        long totalAttempts = attempts.size();
        long passedCount = attempts.stream().filter(a -> {
            BigDecimal sc = a.getScore() != null ? a.getScore() : BigDecimal.ZERO;
            BigDecimal passScore = (a.getQuiz() != null && a.getQuiz().getPassScore() != null) ? a.getQuiz().getPassScore() : new BigDecimal("70.00");
            return sc.compareTo(passScore) >= 0;
        }).count();

        double passRate = totalAttempts > 0 ? (double) passedCount / totalAttempts * 100 : 0.0;
        double avgScore = attempts.stream()
                .mapToDouble(a -> a.getScore() != null ? a.getScore().doubleValue() : 0.0)
                .average()
                .orElse(0.0);

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalAttempts", totalAttempts);
        stats.put("passedCount", passedCount);
        stats.put("failedCount", totalAttempts - passedCount);
        stats.put("passRate", Math.round(passRate * 10.0) / 10.0);
        stats.put("avgScore", Math.round(avgScore * 10.0) / 10.0);
        return stats;
    }

    private AdminQuizAttemptDto mapToDto(QuizAttempt attempt) {
        AdminQuizAttemptDto dto = new AdminQuizAttemptDto();
        dto.setAttemptId(attempt.getAttemptId());

        User u = attempt.getUser();
        if (u != null) {
            dto.setUserId(u.getUserId());
            dto.setFullName(u.getFullName() != null ? u.getFullName() : u.getEmail());
            dto.setEmail(u.getEmail());
        }

        Quiz q = attempt.getQuiz();
        if (q != null) {
            dto.setQuizId(q.getQuizId());
            dto.setQuizTitle(q.getTitle());
            if (q.getLesson() != null) {
                dto.setLessonId(q.getLesson().getLessonId());
                dto.setLessonTitle(q.getLesson().getTitle());
                if (q.getLesson().getLevel() != null) {
                    dto.setLevelCode(q.getLesson().getLevel().getCode());
                }
            }
        }

        dto.setAttemptNumber(attempt.getAttemptNumber());
        dto.setScore(attempt.getScore() != null ? attempt.getScore() : BigDecimal.ZERO);
        dto.setCorrectCount(attempt.getCorrectCount() != null ? attempt.getCorrectCount() : 0);
        dto.setTotalCount(attempt.getTotalCount() != null ? attempt.getTotalCount() : 30);
        dto.setStartedAt(attempt.getStartedAt());
        dto.setSubmittedAt(attempt.getSubmittedAt());
        dto.setStatus(attempt.getStatus());

        BigDecimal passScore = (q != null && q.getPassScore() != null) ? q.getPassScore() : new BigDecimal("70.00");
        dto.setPassed(dto.getScore().compareTo(passScore) >= 0);

        if (attempt.getStartedAt() != null && attempt.getSubmittedAt() != null) {
            long seconds = Duration.between(attempt.getStartedAt(), attempt.getSubmittedAt()).getSeconds();
            dto.setDurationSeconds(Math.max(1L, seconds));
        } else {
            dto.setDurationSeconds(0L);
        }

        return dto;
    }

    private String cleanSnapshotString(String jsonSnapshot, String fallbackText) {
        if (fallbackText != null && !fallbackText.trim().isEmpty()) {
            return fallbackText;
        }
        if (jsonSnapshot == null || jsonSnapshot.trim().isEmpty() || "{}".equals(jsonSnapshot)) {
            return "Chưa trả lời";
        }
        String clean = jsonSnapshot.trim();
        if (clean.startsWith("{") && clean.contains("text\":")) {
            int start = clean.indexOf("text\":") + 6;
            int end = clean.indexOf("\"", start + 1);
            if (start > 5 && end > start) {
                return clean.substring(start + 1, end).replace("\\\"", "\"");
            }
        }
        return clean.replaceAll("[{}\"\\[\\]]", "").trim();
    }
}
