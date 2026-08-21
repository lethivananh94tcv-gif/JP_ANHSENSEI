package com.anhsensei.curriculum.controller.admin;

import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.curriculum.dto.CreateLessonRequest;
import com.anhsensei.curriculum.dto.LessonDto;
import com.anhsensei.curriculum.dto.UpdateLessonRequest;
import com.anhsensei.curriculum.service.LessonService;
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
public class AdminLessonController {

    private final LessonService lessonService;

    public AdminLessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/levels/{levelId}/lessons")
    public ResponseEntity<List<LessonDto>> getLessonsByLevel(@PathVariable("levelId") Long levelId) {
        List<LessonDto> lessons = lessonService.getLessonsByLevelForAdmin(levelId);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/lessons/{id}")
    public ResponseEntity<LessonDto> getLessonById(@PathVariable("id") Long id) {
        LessonDto lesson = lessonService.getLessonById(id);
        return ResponseEntity.ok(lesson);
    }

    @PostMapping("/levels/{levelId}/lessons")
    public ResponseEntity<LessonDto> createLesson(
            @PathVariable("levelId") Long levelId,
            @Valid @RequestBody CreateLessonRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        LessonDto created = lessonService.createLesson(levelId, request, adminId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/lessons/{id}")
    public ResponseEntity<LessonDto> updateLesson(
            @PathVariable("id") Long id,
            @Valid @RequestBody UpdateLessonRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        LessonDto updated = lessonService.updateLesson(id, request, adminId);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/lessons/{id}/archive")
    public ResponseEntity<LessonDto> archiveLessonPatch(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        LessonDto archived = lessonService.archiveLesson(id, adminId);
        return ResponseEntity.ok(archived);
    }

    @DeleteMapping("/lessons/{id}")
    public ResponseEntity<LessonDto> archiveLessonDelete(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        LessonDto archived = lessonService.archiveLesson(id, adminId);
        return ResponseEntity.ok(archived);
    }
}
