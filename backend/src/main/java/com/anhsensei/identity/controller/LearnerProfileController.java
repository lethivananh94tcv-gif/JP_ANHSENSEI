package com.anhsensei.identity.controller;

import com.anhsensei.common.response.ApiResponse;
import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.identity.dto.LearnerProfileDto;
import com.anhsensei.identity.dto.UpdateLearnerProfileRequest;
import com.anhsensei.identity.service.LearnerProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/learner/profile")
@PreAuthorize("hasRole('LEARNER')")
public class LearnerProfileController {

    private final LearnerProfileService learnerProfileService;

    public LearnerProfileController(LearnerProfileService learnerProfileService) {
        this.learnerProfileService = learnerProfileService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<LearnerProfileDto>> getProfile(@AuthenticationPrincipal UserPrincipal principal) {
        LearnerProfileDto profile = learnerProfileService.getProfile(principal.getUserId());
        return ResponseEntity.ok(ApiResponse.success(profile));
    }

    @PatchMapping
    public ResponseEntity<ApiResponse<LearnerProfileDto>> updateProfile(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody UpdateLearnerProfileRequest request
    ) {
        LearnerProfileDto updated = learnerProfileService.updateProfile(principal.getUserId(), request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updated));
    }
}
