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
@RequestMapping("/learner/quizzes")
@PreAuthorize("hasAnyRole('LEARNER', 'ADMIN')")
public class LearnerQuizController {

    private final LearnerQuizService learnerQuizService;

    public LearnerQuizController(LearnerQuizService learnerQuizService) {
        this.learnerQuizService = learnerQuizService;
    }

    @PostMapping("/{quizId}/start")
    public ResponseEntity<ApiResponse<StartQuizResponse>> startQuiz(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long quizId
    ) {
        StartQuizResponse response = learnerQuizService.startQuiz(principal.getUserId(), quizId);
        return ResponseEntity.ok(ApiResponse.success(response.getIsResumed() ? "Resumed active quiz attempt" : "Quiz attempt started", response));
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
    public ResponseEntity<ApiResponse<QuizResultDto>> submitAttempt(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long attemptId,
            @RequestBody SubmitAttemptRequest request
    ) {
        QuizResultDto result = learnerQuizService.submitAttempt(principal.getUserId(), attemptId, request);
        return ResponseEntity.ok(ApiResponse.success("Quiz attempt submitted successfully", result));
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
