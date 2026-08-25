package com.anhsensei.learning.controller;

import com.anhsensei.common.response.ApiResponse;
import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.learning.dto.*;
import com.anhsensei.learning.service.LearnerQuizService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/learner/quizzes", "/api/v1/learner/quizzes", "/learning/quizzes", "/api/v1/learning/quizzes"})
@PreAuthorize("permitAll()")
public class LearnerQuizController {

    private final LearnerQuizService learnerQuizService;
    private final com.anhsensei.learning.service.QuizScoringService quizScoringService;

    public LearnerQuizController(LearnerQuizService learnerQuizService, com.anhsensei.learning.service.QuizScoringService quizScoringService) {
        this.learnerQuizService = learnerQuizService;
        this.quizScoringService = quizScoringService;
    }

    @PostMapping("/{quizId}/start")
    public ResponseEntity<ApiResponse<Object>> startQuiz(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long quizId
    ) {
        Long userId = principal != null ? principal.getUserId() : 1L;
        try {
            Object quizData = quizScoringService.startQuizAttempt(userId, quizId);
            return ResponseEntity.ok(ApiResponse.success("Bắt đầu lượt làm bài Quiz thành công", quizData));
        } catch (Exception e) {
            StartQuizResponse response = learnerQuizService.startQuiz(userId, quizId);
            return ResponseEntity.ok(ApiResponse.success(response.getIsResumed() ? "Resumed active quiz attempt" : "Quiz attempt started", response));
        }
    }

    @PutMapping("/attempts/{attemptId}/answers")
    public ResponseEntity<ApiResponse<Void>> autosaveAnswers(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long attemptId,
            @RequestBody AutosaveAnswersRequest request
    ) {
        learnerQuizService.autosaveAnswers(principal.getUserId(), attemptId, request);
        return ResponseEntity.ok(ApiResponse.success("Draft answers saved", null));
    }

    @PostMapping("/attempts/{attemptId}/submit")
    public ResponseEntity<ApiResponse<Object>> submitAttempt(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long attemptId,
            @RequestBody(required = false) Object bodyPayload
    ) {
        Long userId = principal != null ? principal.getUserId() : 1L;
        try {
            java.util.Map<Long, String> userAnswers = new java.util.HashMap<>();
            if (bodyPayload instanceof java.util.Map<?, ?> map) {
                map.forEach((k, v) -> {
                    try {
                        Long key = Long.parseLong(String.valueOf(k));
                        userAnswers.put(key, String.valueOf(v));
                    } catch (Exception ignored) {}
                });
            }
            com.anhsensei.learning.domain.QuizAttempt attempt = quizScoringService.submitAttempt(userId, attemptId, userAnswers);
            return ResponseEntity.ok(ApiResponse.success("Quiz attempt submitted successfully", attempt));
        } catch (Exception e) {
            SubmitAttemptRequest req = new SubmitAttemptRequest();
            QuizResultDto result = learnerQuizService.submitAttempt(userId, attemptId, req);
            return ResponseEntity.ok(ApiResponse.success("Quiz attempt submitted successfully", result));
        }
    }

    @GetMapping("/{quizId}/attempts")
    public ResponseEntity<ApiResponse<List<QuizResultDto>>> getQuizAttemptHistory(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long quizId
    ) {
        List<QuizResultDto> history = learnerQuizService.getQuizAttemptHistory(principal.getUserId(), quizId);
        return ResponseEntity.ok(ApiResponse.success(history));
    }

    @GetMapping("/attempts/{attemptId}")
    public ResponseEntity<ApiResponse<QuizResultDto>> getAttemptResult(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long attemptId
    ) {
        QuizResultDto result = learnerQuizService.getAttemptResult(principal.getUserId(), attemptId);
        return ResponseEntity.ok(ApiResponse.success(result));
    }
}
