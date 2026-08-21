package com.anhsensei.curriculum.controller.admin;

import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.curriculum.dto.CreateVocabularyRequest;
import com.anhsensei.curriculum.dto.UpdateVocabularyRequest;
import com.anhsensei.curriculum.dto.VocabularyDto;
import com.anhsensei.curriculum.service.VocabularyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminVocabularyController {

    private final VocabularyService vocabularyService;

    public AdminVocabularyController(VocabularyService vocabularyService) {
        this.vocabularyService = vocabularyService;
    }

    @GetMapping("/lessons/{lessonId}/vocabularies")
    public ResponseEntity<List<VocabularyDto>> getVocabulariesByLesson(@PathVariable("lessonId") Long lessonId) {
        List<VocabularyDto> list = vocabularyService.getVocabulariesByLesson(lessonId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/vocabularies/{id}")
    public ResponseEntity<VocabularyDto> getVocabularyById(@PathVariable("id") Long id) {
        VocabularyDto dto = vocabularyService.getVocabularyById(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/lessons/{lessonId}/vocabularies")
    public ResponseEntity<VocabularyDto> createVocabulary(
            @PathVariable("lessonId") Long lessonId,
            @Valid @RequestBody CreateVocabularyRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        VocabularyDto created = vocabularyService.createVocabulary(lessonId, request, adminId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/vocabularies/{id}")
    public ResponseEntity<VocabularyDto> updateVocabulary(
            @PathVariable("id") Long id,
            @Valid @RequestBody UpdateVocabularyRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        VocabularyDto updated = vocabularyService.updateVocabulary(id, request, adminId);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/vocabularies/{id}/archive")
    public ResponseEntity<VocabularyDto> archiveVocabularyPatch(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        VocabularyDto archived = vocabularyService.archiveVocabulary(id, adminId);
        return ResponseEntity.ok(archived);
    }

    @DeleteMapping("/vocabularies/{id}")
    public ResponseEntity<VocabularyDto> archiveVocabularyDelete(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        VocabularyDto archived = vocabularyService.archiveVocabulary(id, adminId);
        return ResponseEntity.ok(archived);
    }
}
