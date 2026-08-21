package com.anhsensei.curriculum.controller.admin;

import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.curriculum.dto.CreateLevelRequest;
import com.anhsensei.curriculum.dto.LevelDto;
import com.anhsensei.curriculum.dto.UpdateLevelRequest;
import com.anhsensei.curriculum.service.LevelService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/levels")
@PreAuthorize("hasRole('ADMIN')")
public class AdminLevelController {

    private final LevelService levelService;

    public AdminLevelController(LevelService levelService) {
        this.levelService = levelService;
    }

    @GetMapping
    public ResponseEntity<List<LevelDto>> getAllLevels() {
        List<LevelDto> levels = levelService.getAllLevelsForAdmin();
        return ResponseEntity.ok(levels);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LevelDto> getLevelById(@PathVariable("id") Long id) {
        LevelDto level = levelService.getLevelById(id);
        return ResponseEntity.ok(level);
    }

    @PostMapping
    public ResponseEntity<LevelDto> createLevel(
            @Valid @RequestBody CreateLevelRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        LevelDto created = levelService.createLevel(request, adminId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LevelDto> updateLevel(
            @PathVariable("id") Long id,
            @Valid @RequestBody UpdateLevelRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        LevelDto updated = levelService.updateLevel(id, request, adminId);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<LevelDto> archiveLevelPatch(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        LevelDto archived = levelService.archiveLevel(id, adminId);
        return ResponseEntity.ok(archived);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<LevelDto> archiveLevelDelete(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long adminId = userPrincipal != null ? userPrincipal.getUserId() : null;
        LevelDto archived = levelService.archiveLevel(id, adminId);
        return ResponseEntity.ok(archived);
    }
}
