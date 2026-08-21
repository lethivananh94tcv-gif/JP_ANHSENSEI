package com.anhsensei.curriculum.controller.admin;

import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.service.KanjiService;
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
public class AdminKanjiController {

    private final KanjiService kanjiService;

    public AdminKanjiController(KanjiService kanjiService) {
        this.kanjiService = kanjiService;
    }

    @GetMapping("/kanji")
    public ResponseEntity<List<KanjiDto>> getAllKanji() {
        List<KanjiDto> list = kanjiService.getAllKanji();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/kanji/{id}")
    public ResponseEntity<KanjiDto> getKanjiById(@PathVariable("id") Long id) {
        KanjiDto dto = kanjiService.getKanjiById(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/kanji")
    public ResponseEntity<KanjiDto> createKanji(
            @Valid @RequestBody CreateKanjiRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        KanjiDto created = kanjiService.createKanji(request, adminId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/kanji/{id}")
    public ResponseEntity<KanjiDto> updateKanji(
            @PathVariable("id") Long id,
            @Valid @RequestBody UpdateKanjiRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        KanjiDto updated = kanjiService.updateKanji(id, request, adminId);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/kanji/{id}/archive")
    public ResponseEntity<KanjiDto> archiveKanji(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        KanjiDto archived = kanjiService.archiveKanji(id, adminId);
        return ResponseEntity.ok(archived);
    }

    @GetMapping("/lessons/{lessonId}/kanji")
    public ResponseEntity<List<LessonKanjiDto>> getKanjiByLesson(@PathVariable("lessonId") Long lessonId) {
        List<LessonKanjiDto> list = kanjiService.getKanjiByLesson(lessonId);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/lessons/{lessonId}/kanji")
    public ResponseEntity<LessonKanjiDto> addKanjiToLesson(
            @PathVariable("lessonId") Long lessonId,
            @Valid @RequestBody LessonKanjiRequest request
    ) {
        LessonKanjiDto dto = kanjiService.addKanjiToLesson(lessonId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @DeleteMapping("/lessons/{lessonId}/kanji/{kanjiId}")
    public ResponseEntity<Void> removeKanjiFromLesson(
            @PathVariable("lessonId") Long lessonId,
            @PathVariable("kanjiId") Long kanjiId
    ) {
        kanjiService.removeKanjiFromLesson(lessonId, kanjiId);
        return ResponseEntity.noContent().build();
    }
}
