package com.anhsensei.curriculum.controller.learner;

import com.anhsensei.curriculum.dto.LevelDto;
import com.anhsensei.curriculum.repository.LevelRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/curriculum/levels")
@PreAuthorize("hasAnyRole('LEARNER', 'ADMIN')")
public class LearnerLevelController {

    private final LevelRepository levelRepository;

    public LearnerLevelController(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    @GetMapping
    public ResponseEntity<List<LevelDto>> getPublishedLevels() {
        List<LevelDto> list = levelRepository.findByStatusOrderBySortOrderAsc("PUBLISHED").stream()
                .map(LevelDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LevelDto> getPublishedLevelById(@PathVariable("id") Long id) {
        LevelDto dto = levelRepository.findById(id)
                .filter(level -> "PUBLISHED".equalsIgnoreCase(level.getStatus()))
                .map(LevelDto::new)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Trình độ (Level) đã xuất bản có ID: " + id));
        return ResponseEntity.ok(dto);
    }
}
