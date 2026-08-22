package com.anhsensei.curriculum.service;

import com.anhsensei.common.exception.ResourceNotFoundException;
import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LearnerCurriculumService {

    private final LevelRepository levelRepository;
    private final LessonRepository lessonRepository;
    private final VocabularyRepository vocabularyRepository;
    private final KanjiRepository kanjiRepository;
    private final LessonKanjiRepository lessonKanjiRepository;
    private final GrammarPointRepository grammarPointRepository;
    private final GrammarExampleRepository grammarExampleRepository;

    public LearnerCurriculumService(
            LevelRepository levelRepository,
            LessonRepository lessonRepository,
            VocabularyRepository vocabularyRepository,
            KanjiRepository kanjiRepository,
            LessonKanjiRepository lessonKanjiRepository,
            GrammarPointRepository grammarPointRepository,
            GrammarExampleRepository grammarExampleRepository
    ) {
        this.levelRepository = levelRepository;
        this.lessonRepository = lessonRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.kanjiRepository = kanjiRepository;
        this.lessonKanjiRepository = lessonKanjiRepository;
        this.grammarPointRepository = grammarPointRepository;
        this.grammarExampleRepository = grammarExampleRepository;
    }

    private Lesson resolveLesson(Long lessonId) {
        Optional<Lesson> lessonOpt = lessonRepository.findById(lessonId);
        if (lessonOpt.isEmpty() || vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(lessonId, "PUBLISHED").isEmpty()) {
            // Fallback by sortOrder in N5 level (Level ID 1) if user passes 1..5 instead of lesson_id (77, 78, 79, 80)
            Optional<Lesson> bySort = lessonRepository.findByLevel_LevelIdAndSortOrder(1L, lessonId.intValue());
            if (bySort.isPresent()) {
                lessonOpt = bySort;
            }
        }
        return lessonOpt.orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));
    }

    @Transactional(readOnly = true)
    public List<LearnerLevelDto> getPublishedLevels() {
        return levelRepository.findByStatusOrderBySortOrderAsc("PUBLISHED")
                .stream()
                .filter(l -> l.getDeletedAt() == null)
                .map(LearnerLevelDto::fromLevel)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<LearnerLessonSummaryDto> getPublishedLessonsByLevel(Long levelId) {
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new ResourceNotFoundException("Level", "id", levelId));

        if (!"PUBLISHED".equals(level.getStatus()) || level.getDeletedAt() != null) {
            throw new ResourceNotFoundException("Level", "id", levelId);
        }

        return lessonRepository.findByLevel_LevelIdAndStatusOrderBySortOrderAsc(levelId, "PUBLISHED")
                .stream()
                .filter(l -> l.getDeletedAt() == null)
                .map(LearnerLessonSummaryDto::fromLesson)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LearnerLessonSummaryDto getLessonSummary(Long lessonId) {
        Lesson lesson = resolveLesson(lessonId);

        if (!"PUBLISHED".equals(lesson.getStatus()) || lesson.getDeletedAt() != null) {
            throw new ResourceNotFoundException("Lesson", "id", lessonId);
        }

        return LearnerLessonSummaryDto.fromLesson(lesson);
    }

    @Transactional(readOnly = true)
    public LearnerLessonContentDto getLessonContent(Long lessonId) {
        Lesson lesson = resolveLesson(lessonId);

        if (!"PUBLISHED".equals(lesson.getStatus()) || lesson.getDeletedAt() != null) {
            throw new ResourceNotFoundException("Lesson", "id", lessonId);
        }

        Long actualLessonId = lesson.getLessonId();

        LearnerLessonContentDto dto = new LearnerLessonContentDto();
        dto.setLessonId(actualLessonId);
        dto.setLevelId(lesson.getLevel() != null ? lesson.getLevel().getLevelId() : null);
        dto.setLevelCode(lesson.getLevel() != null ? lesson.getLevel().getCode() : null);
        dto.setTitle(lesson.getTitle());
        dto.setDescription(lesson.getDescription());
        dto.setSortOrder(lesson.getSortOrder());
        dto.setIsSample(lesson.getIsSample());
        dto.setEstimatedMinutes(lesson.getEstimatedMinutes());

        // Vocabularies
        List<Vocabulary> vocabList = vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(actualLessonId, "PUBLISHED");
        List<VocabularyDto> vocabDtos = vocabList.stream()
                .filter(v -> v.getDeletedAt() == null)
                .map(VocabularyDto::new)
                .collect(Collectors.toList());
        dto.setVocabularies(vocabDtos);

        // Grammars + Examples
        List<GrammarPoint> grammarList = grammarPointRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(actualLessonId, "PUBLISHED");
        List<GrammarPointDto> grammarDtos = grammarList.stream()
                .filter(g -> g.getDeletedAt() == null)
                .map(g -> {
                    List<GrammarExample> examples = grammarExampleRepository.findByGrammarIdOrderBySortOrderAsc(g.getGrammarId());
                    List<GrammarExampleDto> exampleDtos = examples.stream().map(GrammarExampleDto::new).collect(Collectors.toList());
                    return new GrammarPointDto(g, exampleDtos);
                })
                .collect(Collectors.toList());
        dto.setGrammars(grammarDtos);

        // Kanjis
        List<LessonKanji> lkList = lessonKanjiRepository.findByLesson_LessonIdAndKanji_StatusAndKanji_DeletedAtIsNullOrderBySortOrderAsc(actualLessonId, "PUBLISHED");
        List<KanjiDto> kanjiDtos = lkList.stream()
                .map(lk -> new KanjiDto(lk.getKanji()))
                .collect(Collectors.toList());
        dto.setKanjis(kanjiDtos);

        return dto;
    }

    @Transactional(readOnly = true)
    public LearnerLessonSummaryDto getContinueLearningLesson(Long userId) {
        // Fallback to first published lesson if no tracking data
        List<Lesson> publishedLessons = lessonRepository.findByLevel_LevelIdAndStatusOrderBySortOrderAsc(1L, "PUBLISHED");
        if (publishedLessons.isEmpty()) {
            return null;
        }
        return LearnerLessonSummaryDto.fromLesson(publishedLessons.get(0));
    }
}
