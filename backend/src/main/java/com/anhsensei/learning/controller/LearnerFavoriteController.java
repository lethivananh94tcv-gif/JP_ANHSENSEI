package com.anhsensei.learning.controller;

import com.anhsensei.common.response.ApiResponse;
import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.curriculum.dto.VocabularyDto;
import com.anhsensei.learning.dto.FavoriteStatusResponse;
import com.anhsensei.learning.dto.FavoriteToggleRequest;
import com.anhsensei.learning.service.FavoriteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/learner/favorites")
@PreAuthorize("hasAnyRole('LEARNER', 'ADMIN')")
public class LearnerFavoriteController {

    private final FavoriteService favoriteService;

    public LearnerFavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/toggle")
    public ResponseEntity<ApiResponse<FavoriteStatusResponse>> toggleFavorite(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody FavoriteToggleRequest request
    ) {
        FavoriteStatusResponse response = favoriteService.toggleFavorite(
                principal.getUserId(),
                request.getContentType(),
                request.getContentId()
        );
        String message = response.isFavorited() ? "Đã thêm vào danh sách yêu thích" : "Đã xóa khỏi danh sách yêu thích";
        return ResponseEntity.ok(ApiResponse.success(message, response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Long>>> getFavoriteIds(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "VOCABULARY") String contentType
    ) {
        List<Long> favoriteIds = favoriteService.getFavoriteIds(principal.getUserId(), contentType);
        return ResponseEntity.ok(ApiResponse.success(favoriteIds));
    }

    @GetMapping("/vocabularies")
    public ResponseEntity<ApiResponse<List<VocabularyDto>>> getFavoriteVocabularies(
            @AuthenticationPrincipal UserPrincipal principal
    ) {
        List<VocabularyDto> vocabs = favoriteService.getFavoriteVocabularies(principal.getUserId());
        return ResponseEntity.ok(ApiResponse.success(vocabs));
    }
}
