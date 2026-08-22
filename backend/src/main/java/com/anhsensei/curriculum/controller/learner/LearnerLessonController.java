package com.anhsensei.curriculum.controller.learner;

import com.anhsensei.curriculum.domain.Lesson;
import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/curriculum")
public class LearnerLessonController {

    private final LessonRepository lessonRepository;
    private final VocabularyRepository vocabularyRepository;
    private final LessonKanjiRepository lessonKanjiRepository;
    private final GrammarPointRepository grammarPointRepository;
    private final GrammarExampleRepository grammarExampleRepository;

    public LearnerLessonController(
            LessonRepository lessonRepository,
            VocabularyRepository vocabularyRepository,
            LessonKanjiRepository lessonKanjiRepository,
            GrammarPointRepository grammarPointRepository,
            GrammarExampleRepository grammarExampleRepository
    ) {
        this.lessonRepository = lessonRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.lessonKanjiRepository = lessonKanjiRepository;
        this.grammarPointRepository = grammarPointRepository;
        this.grammarExampleRepository = grammarExampleRepository;
    }

    private Long resolveLessonId(Long inputId) {
        if (inputId == null) return null;
        Optional<Lesson> lessonOpt = lessonRepository.findById(inputId);
        if (lessonOpt.isPresent()) {
            return inputId;
        }
        return inputId;
    }

    @GetMapping("/levels/{levelId}/lessons")
    public ResponseEntity<List<LessonDto>> getPublishedLessonsByLevel(@PathVariable("levelId") Long levelId) {
        List<LessonDto> list = lessonRepository.findByLevel_LevelIdAndStatusOrderBySortOrderAsc(levelId, "PUBLISHED").stream()
                .map(LessonDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/lessons/{id}")
    public ResponseEntity<LessonDto> getPublishedLessonById(@PathVariable("id") Long id) {
        Long actualId = resolveLessonId(id);
        LessonDto dto = lessonRepository.findById(actualId)
                .filter(lesson -> "PUBLISHED".equalsIgnoreCase(lesson.getStatus()) && "PUBLISHED".equalsIgnoreCase(lesson.getLevel().getStatus()))
                .map(LessonDto::new)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Bài học (Lesson) đã xuất bản có ID: " + id));
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/lessons/{id}/vocabularies")
    public ResponseEntity<List<VocabularyDto>> getPublishedVocabularies(@PathVariable("id") Long lessonId) {
        Long actualId = resolveLessonId(lessonId);
        List<VocabularyDto> list = vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(actualId, "PUBLISHED").stream()
                .map(VocabularyDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/lessons/{id}/kanji")
    public ResponseEntity<List<LessonKanjiDto>> getPublishedKanji(@PathVariable("id") Long lessonId) {
        Long actualId = resolveLessonId(lessonId);
        List<LessonKanjiDto> list = lessonKanjiRepository.findByLesson_LessonIdOrderBySortOrderAsc(actualId).stream()
                .filter(lk -> lk.getKanji() != null && "PUBLISHED".equalsIgnoreCase(lk.getKanji().getStatus()))
                .map(LessonKanjiDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/lessons/{id}/grammar")
    public ResponseEntity<List<GrammarPointDto>> getPublishedGrammar(@PathVariable("id") Long lessonId) {
        Long actualId = resolveLessonId(lessonId);
        List<GrammarPointDto> list = grammarPointRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(actualId, "PUBLISHED").stream()
                .map(g -> {
                    List<GrammarExampleDto> exampleDtos = grammarExampleRepository.findByGrammarIdOrderBySortOrderAsc(g.getGrammarId()).stream()
                            .map(GrammarExampleDto::new)
                            .collect(Collectors.toList());
                    return new GrammarPointDto(g, exampleDtos);
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }
}
