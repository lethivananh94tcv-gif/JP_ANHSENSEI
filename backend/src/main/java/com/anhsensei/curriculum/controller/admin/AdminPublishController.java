package com.anhsensei.curriculum.controller.admin;

import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.curriculum.dto.LessonDto;
import com.anhsensei.curriculum.dto.LevelDto;
import com.anhsensei.curriculum.service.LessonPublishService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminPublishController {

    private final LessonPublishService publishService;

    public AdminPublishController(LessonPublishService publishService) {
        this.publishService = publishService;
    }

    @PostMapping("/lessons/{id}/publish")
    public ResponseEntity<LessonDto> publishLesson(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        LessonDto published = publishService.publishLesson(id, adminId);
        return ResponseEntity.ok(published);
    }

    @PostMapping("/lessons/{id}/unpublish")
    public ResponseEntity<LessonDto> unpublishLesson(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        LessonDto unpublished = publishService.unpublishLesson(id, adminId);
        return ResponseEntity.ok(unpublished);
    }

    @PostMapping("/levels/{id}/publish")
    public ResponseEntity<LevelDto> publishLevel(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        LevelDto published = publishService.publishLevel(id, adminId);
        return ResponseEntity.ok(published);
    }

    @PostMapping("/levels/{id}/unpublish")
    public ResponseEntity<LevelDto> unpublishLevel(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        LevelDto unpublished = publishService.unpublishLevel(id, adminId);
        return ResponseEntity.ok(unpublished);
    }

    @PostMapping("/vocabularies/{id}/publish")
    public ResponseEntity<Void> publishVocabulary(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        publishService.publishVocabulary(id, adminId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/kanji/{id}/publish")
    public ResponseEntity<Void> publishKanji(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        publishService.publishKanji(id, adminId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/grammar/{id}/publish")
    public ResponseEntity<Void> publishGrammar(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        publishService.publishGrammar(id, adminId);
        return ResponseEntity.ok().build();
    }
}
