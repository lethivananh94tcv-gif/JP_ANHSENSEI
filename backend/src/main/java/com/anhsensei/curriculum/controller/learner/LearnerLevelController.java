package com.anhsensei.curriculum.controller.learner;

import com.anhsensei.curriculum.dto.LevelDto;
import com.anhsensei.curriculum.repository.LevelRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping({"/curriculum/levels", "/learner/levels"})
public class LearnerLevelController {

    private final LevelRepository levelRepository;

    public LearnerLevelController(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    @GetMapping
    public ResponseEntity<List<LevelDto>> getPublishedLevels() {
        List<com.anhsensei.curriculum.domain.Level> rawList = levelRepository.findByStatusOrderBySortOrderAsc("PUBLISHED");
        java.util.Map<String, LevelDto> uniqueMap = new java.util.LinkedHashMap<>();
        for (com.anhsensei.curriculum.domain.Level l : rawList) {
            if (l.getDeletedAt() == null && !uniqueMap.containsKey(l.getCode())) {
                uniqueMap.put(l.getCode(), new LevelDto(l));
            }
        }
        return ResponseEntity.ok(new java.util.ArrayList<>(uniqueMap.values()));
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
