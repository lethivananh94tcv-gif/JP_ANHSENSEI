package com.anhsensei.curriculum.controller.learner;

import com.anhsensei.common.response.ApiResponse;
import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.service.LearnerCurriculumService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/learner")
public class LearnerCurriculumController {

    private final LearnerCurriculumService learnerCurriculumService;

    public LearnerCurriculumController(LearnerCurriculumService learnerCurriculumService) {
        this.learnerCurriculumService = learnerCurriculumService;
    }

    @GetMapping("/levels")
    public ResponseEntity<ApiResponse<List<LearnerLevelDto>>> getPublishedLevels() {
        List<LearnerLevelDto> levels = learnerCurriculumService.getPublishedLevels();
        return ResponseEntity.ok(ApiResponse.success(levels));
    }

    @GetMapping("/levels/{levelId}/lessons")
    public ResponseEntity<ApiResponse<List<LearnerLessonSummaryDto>>> getPublishedLessonsByLevel(@PathVariable Long levelId) {
        List<LearnerLessonSummaryDto> lessons = learnerCurriculumService.getPublishedLessonsByLevel(levelId);
        return ResponseEntity.ok(ApiResponse.success(lessons));
    }

    @GetMapping("/lessons/{lessonId}")
    public ResponseEntity<ApiResponse<LearnerLessonSummaryDto>> getLessonSummary(@PathVariable Long lessonId) {
        LearnerLessonSummaryDto lesson = learnerCurriculumService.getLessonSummary(lessonId);
        return ResponseEntity.ok(ApiResponse.success(lesson));
    }

    @GetMapping("/lessons/{lessonId}/content")
    public ResponseEntity<ApiResponse<LearnerLessonContentDto>> getLessonContent(@PathVariable Long lessonId) {
        LearnerLessonContentDto content = learnerCurriculumService.getLessonContent(lessonId);
        return ResponseEntity.ok(ApiResponse.success(content));
    }

    @GetMapping("/continue-learning")
    public ResponseEntity<ApiResponse<LearnerLessonSummaryDto>> continueLearning(@AuthenticationPrincipal UserPrincipal principal) {
        Long userId = principal != null ? principal.getUserId() : null;
        LearnerLessonSummaryDto lesson = learnerCurriculumService.getContinueLearningLesson(userId);
        String msg = lesson != null ? "Continue learning lesson found" : "No published lesson available";
        return ResponseEntity.ok(ApiResponse.success(msg, lesson));
    }
}
