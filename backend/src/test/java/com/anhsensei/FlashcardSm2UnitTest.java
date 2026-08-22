package com.anhsensei;

import com.anhsensei.curriculum.domain.Vocabulary;
import com.anhsensei.curriculum.repository.GrammarPointRepository;
import com.anhsensei.curriculum.repository.KanjiRepository;
import com.anhsensei.curriculum.repository.VocabularyRepository;
import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.UserRepository;
import com.anhsensei.learning.domain.FlashcardProgress;
import com.anhsensei.learning.domain.FlashcardReviewLog;
import com.anhsensei.learning.domain.LearningActivity;
import com.anhsensei.learning.dto.LearnerFlashcardDto;
import com.anhsensei.learning.dto.ReviewFlashcardRequest;
import com.anhsensei.learning.repository.FlashcardProgressRepository;
import com.anhsensei.learning.repository.FlashcardReviewLogRepository;
import com.anhsensei.learning.repository.LearningActivityRepository;
import com.anhsensei.learning.service.FlashcardService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FlashcardSm2UnitTest {

    @Mock private UserRepository userRepository;
    @Mock private FlashcardProgressRepository flashcardProgressRepository;
    @Mock private FlashcardReviewLogRepository flashcardReviewLogRepository;
    @Mock private LearningActivityRepository learningActivityRepository;
    @Mock private VocabularyRepository vocabularyRepository;
    @Mock private KanjiRepository kanjiRepository;
    @Mock private GrammarPointRepository grammarPointRepository;

    @InjectMocks
    private FlashcardService flashcardService;

    private User mockUser;
    private Vocabulary mockVocab;

    @BeforeEach
    void setUp() {
        mockUser = User.builder().userId(1L).email("learner@anhsensei.com").build();
        mockVocab = new Vocabulary();
        mockVocab.setVocabularyId(100L);
        mockVocab.setWord("水");
        mockVocab.setKana("みず");
        mockVocab.setMeaningVi("Nước");
        mockVocab.setStatus("PUBLISHED");
    }

    @Test
    @DisplayName("SM-2 review with GOOD rating increases reviewCount and sets state REVIEW")
    void testReviewGoodRating() {
        ReviewFlashcardRequest request = new ReviewFlashcardRequest("VOCABULARY", 100L, "GOOD", 10);

        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(vocabularyRepository.findById(100L)).thenReturn(Optional.of(mockVocab));
        when(flashcardProgressRepository.findByUser_UserIdAndContentTypeAndContentId(1L, "VOCABULARY", 100L))
                .thenReturn(Optional.empty());
        when(flashcardProgressRepository.save(any(FlashcardProgress.class))).thenAnswer(inv -> inv.getArgument(0));

        LearnerFlashcardDto result = flashcardService.reviewFlashcard(1L, request);

        assertNotNull(result);
        assertEquals("VOCABULARY", result.getContentType());
        assertEquals(100L, result.getContentId());
        assertEquals("REVIEW", result.getState());
        assertEquals(1, result.getIntervalDays());
        assertEquals(1, result.getReviewCount());

        verify(flashcardReviewLogRepository, times(1)).save(any(FlashcardReviewLog.class));
        verify(learningActivityRepository, times(1)).save(any(LearningActivity.class));
    }

    @Test
    @DisplayName("SM-2 review with AGAIN rating resets interval to 1 and sets state RELEARNING")
    void testReviewAgainRating() {
        ReviewFlashcardRequest request = new ReviewFlashcardRequest("VOCABULARY", 100L, "AGAIN", 5);

        FlashcardProgress existingFp = new FlashcardProgress(mockUser, "VOCABULARY", 100L);
        existingFp.setReviewCount(3);
        existingFp.setIntervalDays(6);
        existingFp.setEaseFactor(new BigDecimal("2.50"));

        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(vocabularyRepository.findById(100L)).thenReturn(Optional.of(mockVocab));
        when(flashcardProgressRepository.findByUser_UserIdAndContentTypeAndContentId(1L, "VOCABULARY", 100L))
                .thenReturn(Optional.of(existingFp));
        when(flashcardProgressRepository.save(any(FlashcardProgress.class))).thenAnswer(inv -> inv.getArgument(0));

        LearnerFlashcardDto result = flashcardService.reviewFlashcard(1L, request);

        assertNotNull(result);
        assertEquals("RELEARNING", result.getState());
        assertEquals(1, result.getIntervalDays());
        assertEquals(new BigDecimal("2.30"), result.getEaseFactor());
    }

    @Test
    @DisplayName("SM-2 review with EASY rating increases easeFactor by 0.15 and sets interval")
    void testReviewEasyRating() {
        ReviewFlashcardRequest request = new ReviewFlashcardRequest("VOCABULARY", 100L, "EASY", 12);

        FlashcardProgress existingFp = new FlashcardProgress(mockUser, "VOCABULARY", 100L);
        existingFp.setReviewCount(1);
        existingFp.setIntervalDays(1);
        existingFp.setEaseFactor(new BigDecimal("2.50"));

        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(vocabularyRepository.findById(100L)).thenReturn(Optional.of(mockVocab));
        when(flashcardProgressRepository.findByUser_UserIdAndContentTypeAndContentId(1L, "VOCABULARY", 100L))
                .thenReturn(Optional.of(existingFp));
        when(flashcardProgressRepository.save(any(FlashcardProgress.class))).thenAnswer(inv -> inv.getArgument(0));

        LearnerFlashcardDto result = flashcardService.reviewFlashcard(1L, request);

        assertNotNull(result);
        assertEquals("REVIEW", result.getState());
        assertEquals(6, result.getIntervalDays());
        assertEquals(new BigDecimal("2.65"), result.getEaseFactor());
    }

    @Test
    @DisplayName("resetUserFlashcards deletes review logs and progress records")
    void testResetUserFlashcards() {
        flashcardService.resetUserFlashcards(1L);

        verify(flashcardReviewLogRepository, times(1)).deleteByUser_UserId(1L);
        verify(flashcardProgressRepository, times(1)).deleteByUser_UserId(1L);
    }
}
