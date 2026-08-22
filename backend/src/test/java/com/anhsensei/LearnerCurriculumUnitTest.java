package com.anhsensei;

import com.anhsensei.common.exception.ResourceNotFoundException;
import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.repository.*;
import com.anhsensei.curriculum.service.LearnerCurriculumService;
import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LearnerCurriculumUnitTest {

    @Mock private LevelRepository levelRepository;
    @Mock private LessonRepository lessonRepository;
    @Mock private VocabularyRepository vocabularyRepository;
    @Mock private GrammarPointRepository grammarPointRepository;
    @Mock private LessonKanjiRepository lessonKanjiRepository;
    @Mock private GrammarExampleRepository grammarExampleRepository;
    @Mock private QuizRepository quizRepository;
    @Mock private UserRepository userRepository;

    @InjectMocks
    private LearnerCurriculumService learnerCurriculumService;

    private Level publishedLevelN5;
    private Lesson publishedLesson1;

    @BeforeEach
    void setUp() {
        publishedLevelN5 = new Level(1L, "N5", "Sơ Cấp 1", "Mô tả N5", 1, "PUBLISHED");
        publishedLesson1 = new Lesson();
        publishedLesson1.setLessonId(10L);
        publishedLesson1.setLevel(publishedLevelN5);
        publishedLesson1.setTitle("Bài 1: Bảng chữ cái");
        publishedLesson1.setSortOrder(1);
        publishedLesson1.setStatus("PUBLISHED");
        publishedLesson1.setIsSample(true);
    }

    @Test
    @DisplayName("getPublishedLevels returns only published levels sorted by sortOrder")
    void testGetPublishedLevels() {
        when(levelRepository.findByStatusOrderBySortOrderAsc("PUBLISHED")).thenReturn(List.of(publishedLevelN5));

        List<LearnerLevelDto> result = learnerCurriculumService.getPublishedLevels();

        assertEquals(1, result.size());
        assertEquals("N5", result.get(0).getCode());
        assertEquals("PUBLISHED", result.get(0).getStatus());
    }

    @Test
    @DisplayName("getPublishedLessonsByLevel throws ResourceNotFoundException if level is not published")
    void testGetPublishedLessonsUnpublishedLevel() {
        Level draftLevel = new Level(2L, "N4", "Sơ Cấp 2", "Mô tả N4", 2, "DRAFT");
        when(levelRepository.findById(2L)).thenReturn(Optional.of(draftLevel));

        assertThrows(ResourceNotFoundException.class, () -> learnerCurriculumService.getPublishedLessonsByLevel(2L));
    }

    @Test
    @DisplayName("getLessonContent returns published content items and hides quiz answer details")
    void testGetLessonContentHidesQuizAnswers() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(publishedLesson1));
        when(vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(10L, "PUBLISHED")).thenReturn(Collections.emptyList());
        when(grammarPointRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(10L, "PUBLISHED")).thenReturn(Collections.emptyList());
        when(lessonKanjiRepository.findByLesson_LessonIdAndKanji_StatusAndKanji_DeletedAtIsNullOrderBySortOrderAsc(10L, "PUBLISHED")).thenReturn(Collections.emptyList());

        Quiz quiz = new Quiz();
        quiz.setQuizId(50L);
        quiz.setLesson(publishedLesson1);
        quiz.setTitle("Quiz Bài 1");
        quiz.setStatus("PUBLISHED");
        quiz.setIsRequired(true);

        when(quizRepository.findByLesson_LessonIdAndStatusAndDeletedAtIsNull(10L, "PUBLISHED")).thenReturn(List.of(quiz));

        LearnerLessonContentDto content = learnerCurriculumService.getLessonContent(10L);

        assertNotNull(content);
        assertEquals(10L, content.getLessonId());
        assertEquals(1, content.getQuizzes().size());
        assertEquals(50L, content.getQuizzes().get(0).getQuizId());
        assertEquals("Quiz Bài 1", content.getQuizzes().get(0).getTitle());
    }

    @Test
    @DisplayName("getContinueLearningLesson returns first published lesson of targetLevel")
    void testGetContinueLearningLessonWithTargetLevel() {
        User user = User.builder().userId(1L).targetLevel("N5").build();
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(levelRepository.findByCode("N5")).thenReturn(Optional.of(publishedLevelN5));
        when(lessonRepository.findByLevel_LevelIdAndStatusOrderBySortOrderAsc(1L, "PUBLISHED")).thenReturn(List.of(publishedLesson1));

        LearnerLessonSummaryDto result = learnerCurriculumService.getContinueLearningLesson(1L);

        assertNotNull(result);
        assertEquals(10L, result.getLessonId());
        assertEquals("N5", result.getLevelCode());
    }

    @Test
    @DisplayName("getContinueLearningLesson fallback to N5 if user has no targetLevel")
    void testGetContinueLearningLessonFallbackToN5() {
        User user = User.builder().userId(2L).targetLevel(null).build();
        when(userRepository.findById(2L)).thenReturn(Optional.of(user));
        when(levelRepository.findByCode("N5")).thenReturn(Optional.of(publishedLevelN5));
        when(lessonRepository.findByLevel_LevelIdAndStatusOrderBySortOrderAsc(1L, "PUBLISHED")).thenReturn(List.of(publishedLesson1));

        LearnerLessonSummaryDto result = learnerCurriculumService.getContinueLearningLesson(2L);

        assertNotNull(result);
        assertEquals(10L, result.getLessonId());
    }
}
