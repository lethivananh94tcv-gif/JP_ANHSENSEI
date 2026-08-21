package com.anhsensei.curriculum.controller.public_api;

import com.anhsensei.curriculum.dto.LevelDto;
import com.anhsensei.curriculum.repository.LevelRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/public/levels")
public class PublicLevelController {

    private final LevelRepository levelRepository;

    public PublicLevelController(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    @GetMapping
    public ResponseEntity<List<LevelDto>> getPublicLevels() {
        List<LevelDto> list = levelRepository.findByStatusOrderBySortOrderAsc("PUBLISHED").stream()
                .map(LevelDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }
}
