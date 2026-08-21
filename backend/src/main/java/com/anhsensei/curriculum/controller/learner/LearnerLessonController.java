package com.anhsensei.curriculum.controller.learner;

import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/curriculum")
@PreAuthorize("hasAnyRole('LEARNER', 'ADMIN')")
@org.springframework.transaction.annotation.Transactional(readOnly = true)
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

    @GetMapping("/levels/{levelId}/lessons")
    public ResponseEntity<List<LessonDto>> getPublishedLessonsByLevel(@PathVariable("levelId") Long levelId) {
        List<LessonDto> list = lessonRepository.findByLevel_LevelIdAndStatusOrderBySortOrderAsc(levelId, "PUBLISHED").stream()
                .map(LessonDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/lessons/{id}")
    public ResponseEntity<LessonDto> getPublishedLessonById(@PathVariable("id") Long id) {
        LessonDto dto = lessonRepository.findById(id)
                .filter(lesson -> "PUBLISHED".equalsIgnoreCase(lesson.getStatus()) && "PUBLISHED".equalsIgnoreCase(lesson.getLevel().getStatus()))
                .map(LessonDto::new)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Bài học (Lesson) đã xuất bản có ID: " + id));
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/lessons/{id}/vocabularies")
    public ResponseEntity<List<VocabularyDto>> getPublishedVocabularies(@PathVariable("id") Long lessonId) {
        List<VocabularyDto> list = vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(lessonId, "PUBLISHED").stream()
                .map(VocabularyDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/lessons/{id}/kanji")
    public ResponseEntity<List<LessonKanjiDto>> getPublishedKanji(@PathVariable("id") Long lessonId) {
        List<LessonKanjiDto> list = lessonKanjiRepository.findByLesson_LessonIdOrderBySortOrderAsc(lessonId).stream()
                .filter(lk -> lk.getKanji() != null && "PUBLISHED".equalsIgnoreCase(lk.getKanji().getStatus()))
                .map(LessonKanjiDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/lessons/{id}/grammar")
    public ResponseEntity<List<GrammarPointDto>> getPublishedGrammar(@PathVariable("id") Long lessonId) {
        List<GrammarPointDto> list = grammarPointRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(lessonId, "PUBLISHED").stream()
                .map(grammar -> {
                    List<GrammarExampleDto> examples = grammarExampleRepository.findByGrammarIdOrderBySortOrderAsc(grammar.getGrammarId()).stream()
                            .map(GrammarExampleDto::new)
                            .collect(Collectors.toList());
                    return new GrammarPointDto(grammar, examples);
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }
}
