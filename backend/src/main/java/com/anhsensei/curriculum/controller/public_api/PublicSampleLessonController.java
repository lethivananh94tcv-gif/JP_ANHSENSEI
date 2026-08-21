package com.anhsensei.curriculum.controller.public_api;

import com.anhsensei.curriculum.dto.LessonDto;
import com.anhsensei.curriculum.repository.LessonRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/public/sample-lessons")
public class PublicSampleLessonController {

    private final LessonRepository lessonRepository;

    public PublicSampleLessonController(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    @GetMapping
    public ResponseEntity<List<LessonDto>> getPublicSampleLessons() {
        List<LessonDto> list = lessonRepository.findByIsSampleTrueAndStatusOrderBySortOrderAsc("PUBLISHED").stream()
                .map(LessonDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }
}
