package com.anhsensei.curriculum.controller.admin;

import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.service.GrammarService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/admin", "/api/v1/admin"})
@PreAuthorize("hasRole('ADMIN')")
public class AdminGrammarController {

    private final GrammarService grammarService;

    public AdminGrammarController(GrammarService grammarService) {
        this.grammarService = grammarService;
    }

    @GetMapping("/lessons/{lessonId}/grammar")
    public ResponseEntity<List<GrammarPointDto>> getGrammarByLesson(@PathVariable("lessonId") Long lessonId) {
        List<GrammarPointDto> list = grammarService.getGrammarByLesson(lessonId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/grammar/{id}")
    public ResponseEntity<GrammarPointDto> getGrammarById(@PathVariable("id") Long id) {
        GrammarPointDto dto = grammarService.getGrammarById(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/lessons/{lessonId}/grammar")
    public ResponseEntity<GrammarPointDto> createGrammar(
            @PathVariable("lessonId") Long lessonId,
            @Valid @RequestBody CreateGrammarRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        GrammarPointDto created = grammarService.createGrammar(lessonId, request, adminId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/grammar/{id}")
    public ResponseEntity<GrammarPointDto> updateGrammar(
            @PathVariable("id") Long id,
            @Valid @RequestBody UpdateGrammarRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        GrammarPointDto updated = grammarService.updateGrammar(id, request, adminId);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/grammar/{id}/archive")
    public ResponseEntity<GrammarPointDto> archiveGrammar(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        GrammarPointDto archived = grammarService.archiveGrammar(id, adminId);
        return ResponseEntity.ok(archived);
    }

    @PostMapping("/grammar/{grammarId}/examples")
    public ResponseEntity<GrammarExampleDto> addExampleToGrammar(
            @PathVariable("grammarId") Long grammarId,
            @Valid @RequestBody CreateGrammarExampleRequest request
    ) {
        GrammarExampleDto created = grammarService.addExampleToGrammar(grammarId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/grammar/examples/{exampleId}")
    public ResponseEntity<Void> deleteExample(@PathVariable("exampleId") Long exampleId) {
        grammarService.deleteExample(exampleId);
        return ResponseEntity.noContent().build();
    }
}
