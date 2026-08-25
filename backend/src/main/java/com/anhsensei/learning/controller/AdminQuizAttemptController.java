package com.anhsensei.learning.controller;

import com.anhsensei.common.response.ApiResponse;
import com.anhsensei.learning.dto.AdminQuizAttemptDetailDto;
import com.anhsensei.learning.dto.AdminQuizAttemptDto;
import com.anhsensei.learning.service.AdminQuizAttemptService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/admin/quiz-attempts", "/api/v1/admin/quiz-attempts"})
public class AdminQuizAttemptController {

    private final AdminQuizAttemptService adminQuizAttemptService;

    public AdminQuizAttemptController(AdminQuizAttemptService adminQuizAttemptService) {
        this.adminQuizAttemptService = adminQuizAttemptService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AdminQuizAttemptDto>>> getAllQuizAttempts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String level,
            @RequestParam(required = false) Boolean passed) {
        List<AdminQuizAttemptDto> list = adminQuizAttemptService.getAllQuizAttempts(search, level, passed);
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/{attemptId}")
    public ResponseEntity<ApiResponse<AdminQuizAttemptDetailDto>> getQuizAttemptDetail(@PathVariable Long attemptId) {
        AdminQuizAttemptDetailDto detail = adminQuizAttemptService.getQuizAttemptDetail(attemptId);
        return ResponseEntity.ok(ApiResponse.success(detail));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getQuizStatsOverview() {
        Map<String, Object> stats = adminQuizAttemptService.getQuizStatsOverview();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
