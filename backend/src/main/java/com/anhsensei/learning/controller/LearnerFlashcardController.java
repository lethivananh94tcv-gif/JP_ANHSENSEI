package com.anhsensei.learning.controller;

import com.anhsensei.common.response.ApiResponse;
import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.learning.dto.LearnerFlashcardDto;
import com.anhsensei.learning.dto.ReviewFlashcardRequest;
import com.anhsensei.learning.service.FlashcardService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/learner/flashcards")
@PreAuthorize("hasAnyRole('LEARNER', 'ADMIN')")
public class LearnerFlashcardController {

    private final FlashcardService flashcardService;

    public LearnerFlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
    }

    @GetMapping("/due")
    public ResponseEntity<ApiResponse<List<LearnerFlashcardDto>>> getDueFlashcards(@AuthenticationPrincipal UserPrincipal principal) {
        List<LearnerFlashcardDto> dueList = flashcardService.getDueFlashcards(principal.getUserId());
        return ResponseEntity.ok(ApiResponse.success(dueList));
    }

    @GetMapping("/due-count")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getDueCount(@AuthenticationPrincipal UserPrincipal principal) {
        long count = flashcardService.getDueCount(principal.getUserId());
        return ResponseEntity.ok(ApiResponse.success(Map.of("dueCount", count)));
    }

    @PostMapping("/review")
    public ResponseEntity<ApiResponse<LearnerFlashcardDto>> reviewFlashcard(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody ReviewFlashcardRequest request
    ) {
        LearnerFlashcardDto updated = flashcardService.reviewFlashcard(principal.getUserId(), request);
        return ResponseEntity.ok(ApiResponse.success("Flashcard reviewed successfully", updated));
    }

    @PostMapping("/reset")
    public ResponseEntity<ApiResponse<Void>> resetFlashcards(@AuthenticationPrincipal UserPrincipal principal) {
        flashcardService.resetUserFlashcards(principal.getUserId());
        return ResponseEntity.ok(ApiResponse.success("Flashcard progress reset successfully", null));
    }
}
