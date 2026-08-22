package com.anhsensei;

import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.repository.*;
import com.anhsensei.curriculum.service.LearnerCurriculumService;
import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.UserRepository;
import com.anhsensei.learning.domain.LearningActivity;
import com.anhsensei.learning.domain.LearningProgress;
import com.anhsensei.learning.dto.*;
import com.anhsensei.learning.repository.FlashcardProgressRepository;
import com.anhsensei.learning.repository.LearningActivityRepository;
import com.anhsensei.learning.repository.LearningProgressRepository;
import com.anhsensei.learning.service.LearnerProgressService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LearningProgressUnitTest {

    @Mock private UserRepository userRepository;
    @Mock private LessonRepository lessonRepository;
    @Mock private VocabularyRepository vocabularyRepository;
    @Mock private GrammarPointRepository grammarPointRepository;
    @Mock private KanjiRepository kanjiRepository;
    @Mock private LessonKanjiRepository lessonKanjiRepository;
    @Mock private QuizRepository quizRepository;
    @Mock private LearningActivityRepository learningActivityRepository;
    @Mock private LearningProgressRepository learningProgressRepository;
    @Mock private FlashcardProgressRepository flashcardProgressRepository;
    @Mock private LearnerCurriculumService learnerCurriculumService;

    @InjectMocks
    private LearnerProgressService learnerProgressService;

    private User mockUser;
    private Lesson mockLesson;
    private Vocabulary mockVocab;

    @BeforeEach
    void setUp() {
        mockUser = User.builder().userId(1L).email("learner@anhsensei.com").targetLevel("N5").build();
        mockLesson = new Lesson();
        mockLesson.setLessonId(10L);
        mockLesson.setTitle("Lesson 1");

        mockVocab = new Vocabulary();
        mockVocab.setVocabularyId(100L);
        mockVocab.setWord("水");
        mockVocab.setStatus("PUBLISHED");
        mockVocab.setLesson(mockLesson);
    }

    @Test
    @DisplayName("recordActivity creates activity and updates lesson progress")
    void testRecordActivitySuccess() {
        CreateActivityRequest request = new CreateActivityRequest("VOCABULARY", 100L, 30);

        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(vocabularyRepository.findById(100L)).thenReturn(Optional.of(mockVocab));
        when(learningActivityRepository.existsByUser_UserIdAndReferenceTypeAndReferenceId(1L, "VOCABULARY", 100L)).thenReturn(false);

        when(vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(10L, "PUBLISHED")).thenReturn(List.of(mockVocab));
        when(grammarPointRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(10L, "PUBLISHED")).thenReturn(Collections.emptyList());
        when(lessonKanjiRepository.findByLesson_LessonIdAndKanji_StatusAndKanji_DeletedAtIsNullOrderBySortOrderAsc(10L, "PUBLISHED")).thenReturn(Collections.emptyList());
        when(quizRepository.findByLesson_LessonIdAndStatusAndDeletedAtIsNull(10L, "PUBLISHED")).thenReturn(Collections.emptyList());
        when(learningActivityRepository.findCompletedReferenceIds(1L, "VOCABULARY")).thenReturn(List.of(100L));

        when(learningProgressRepository.findByUser_UserIdAndLesson_LessonId(1L, 10L)).thenReturn(Optional.empty());
        when(learningProgressRepository.save(any(LearningProgress.class))).thenAnswer(inv -> inv.getArgument(0));

        LearnerProgressDto result = learnerProgressService.recordActivity(1L, request);

        assertNotNull(result);
        assertEquals(new BigDecimal("100.00"), result.getCompletionPercent());
        assertEquals("COMPLETED", result.getStatus());
        verify(learningActivityRepository, times(1)).save(any(LearningActivity.class));
    }

    @Test
    @DisplayName("recordActivity is idempotent: repeated request does not duplicate activity")
    void testRecordActivityIdempotent() {
        CreateActivityRequest request = new CreateActivityRequest("VOCABULARY", 100L, 30);

        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(vocabularyRepository.findById(100L)).thenReturn(Optional.of(mockVocab));
        // Already exists in activity log
        when(learningActivityRepository.existsByUser_UserIdAndReferenceTypeAndReferenceId(1L, "VOCABULARY", 100L)).thenReturn(true);

        when(vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(10L, "PUBLISHED")).thenReturn(List.of(mockVocab));
        when(grammarPointRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(10L, "PUBLISHED")).thenReturn(Collections.emptyList());
        when(lessonKanjiRepository.findByLesson_LessonIdAndKanji_StatusAndKanji_DeletedAtIsNullOrderBySortOrderAsc(10L, "PUBLISHED")).thenReturn(Collections.emptyList());
        when(quizRepository.findByLesson_LessonIdAndStatusAndDeletedAtIsNull(10L, "PUBLISHED")).thenReturn(Collections.emptyList());
        when(learningActivityRepository.findCompletedReferenceIds(1L, "VOCABULARY")).thenReturn(List.of(100L));

        when(learningProgressRepository.findByUser_UserIdAndLesson_LessonId(1L, 10L)).thenReturn(Optional.empty());
        when(learningProgressRepository.save(any(LearningProgress.class))).thenAnswer(inv -> inv.getArgument(0));

        LearnerProgressDto result = learnerProgressService.recordActivity(1L, request);

        assertNotNull(result);
        // Verify save was NOT called for activity
        verify(learningActivityRepository, never()).save(any(LearningActivity.class));
    }

    @Test
    @DisplayName("getProgressSummary calculates summary metrics correctly")
    void testGetProgressSummary() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(learningProgressRepository.countCompletedLessonsByUserId(1L)).thenReturn(3L);
        when(learningActivityRepository.countByUser_UserId(1L)).thenReturn(15L);

        LearnerProgressSummaryDto summary = learnerProgressService.getProgressSummary(1L);

        assertNotNull(summary);
        assertEquals("N5", summary.getTargetLevel());
        assertEquals(3L, summary.getCompletedLessonsCount());
        assertEquals(15L, summary.getTotalValidActivities());
        assertEquals(7, summary.getWeeklyActivities().size());
    }
}
