package com.anhsensei.learning.controller;

import com.anhsensei.common.response.ApiResponse;
import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.learning.dto.*;
import com.anhsensei.learning.service.LearnerProgressService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/learner")
@PreAuthorize("hasAnyRole('LEARNER', 'ADMIN')")
public class LearnerProgressController {

    private final LearnerProgressService learnerProgressService;

    public LearnerProgressController(LearnerProgressService learnerProgressService) {
        this.learnerProgressService = learnerProgressService;
    }

    @PostMapping("/activities")
    public ResponseEntity<ApiResponse<LearnerProgressDto>> recordActivity(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateActivityRequest request
    ) {
        LearnerProgressDto progress = learnerProgressService.recordActivity(principal.getUserId(), request);
        return ResponseEntity.ok(ApiResponse.success("Learning activity recorded successfully", progress));
    }

    @GetMapping("/progress")
    public ResponseEntity<ApiResponse<List<LearnerProgressDto>>> getAllProgress(@AuthenticationPrincipal UserPrincipal principal) {
        List<LearnerProgressDto> progressList = learnerProgressService.getAllUserProgress(principal.getUserId());
        return ResponseEntity.ok(ApiResponse.success(progressList));
    }

    @GetMapping("/progress/summary")
    public ResponseEntity<ApiResponse<LearnerProgressSummaryDto>> getProgressSummary(@AuthenticationPrincipal UserPrincipal principal) {
        LearnerProgressSummaryDto summary = learnerProgressService.getProgressSummary(principal.getUserId());
        return ResponseEntity.ok(ApiResponse.success(summary));
    }

    @GetMapping("/progress/lessons/{lessonId}")
    public ResponseEntity<ApiResponse<LearnerProgressDto>> getLessonProgress(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long lessonId
    ) {
        LearnerProgressDto progress = learnerProgressService.getLessonProgress(principal.getUserId(), lessonId);
        return ResponseEntity.ok(ApiResponse.success(progress));
    }
}
