package com.anhsensei.learning.service;

import com.anhsensei.common.exception.ResourceNotFoundException;
import com.anhsensei.curriculum.domain.GrammarPoint;
import com.anhsensei.curriculum.domain.Kanji;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.*;

@Service
public class FlashcardService {

    private final UserRepository userRepository;
    private final FlashcardProgressRepository flashcardProgressRepository;
    private final FlashcardReviewLogRepository flashcardReviewLogRepository;
    private final LearningActivityRepository learningActivityRepository;
    private final VocabularyRepository vocabularyRepository;
    private final KanjiRepository kanjiRepository;
    private final GrammarPointRepository grammarPointRepository;

    public FlashcardService(
            UserRepository userRepository,
            FlashcardProgressRepository flashcardProgressRepository,
            FlashcardReviewLogRepository flashcardReviewLogRepository,
            LearningActivityRepository learningActivityRepository,
            VocabularyRepository vocabularyRepository,
            KanjiRepository kanjiRepository,
            GrammarPointRepository grammarPointRepository
    ) {
        this.userRepository = userRepository;
        this.flashcardProgressRepository = flashcardProgressRepository;
        this.flashcardReviewLogRepository = flashcardReviewLogRepository;
        this.learningActivityRepository = learningActivityRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.kanjiRepository = kanjiRepository;
        this.grammarPointRepository = grammarPointRepository;
    }

    @Transactional(readOnly = true)
    public List<LearnerFlashcardDto> getDueFlashcards(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        OffsetDateTime now = OffsetDateTime.now();
        List<FlashcardProgress> progressList = flashcardProgressRepository.findDueFlashcards(userId, now);

        List<LearnerFlashcardDto> result = new ArrayList<>();
        Set<String> trackedKeys = new HashSet<>();

        for (FlashcardProgress fp : progressList) {
            LearnerFlashcardDto dto = buildFlashcardDto(fp);
            if (dto != null) {
                result.add(dto);
                trackedKeys.add(fp.getContentType() + "_" + fp.getContentId());
            }
        }

        // Also append untracked published Vocabularies as NEW flashcards if due list is small
        if (result.size() < 20) {
            List<Vocabulary> vocabList = vocabularyRepository.findAll();
            for (Vocabulary v : vocabList) {
                if ("PUBLISHED".equals(v.getStatus()) && v.getDeletedAt() == null) {
                    String key = "VOCABULARY_" + v.getVocabularyId();
                    if (!trackedKeys.contains(key)) {
                        LearnerFlashcardDto dto = new LearnerFlashcardDto();
                        dto.setContentType("VOCABULARY");
                        dto.setContentId(v.getVocabularyId());
                        dto.setFront(v.getWord());
                        dto.setReading(v.getKana());
                        dto.setMeaning(v.getMeaningVi());
                        dto.setExample(v.getNotes());
                        dto.setAudioUrl(v.getAudioUrl());
                        dto.setState("NEW");
                        dto.setEaseFactor(new BigDecimal("2.50"));
                        dto.setIntervalDays(0);
                        dto.setNextReviewAt(now);
                        dto.setReviewCount(0);
                        result.add(dto);
                        trackedKeys.add(key);
                        if (result.size() >= 30) break;
                    }
                }
            }
        }

        return result;
    }

    @Transactional(readOnly = true)
    public long getDueCount(Long userId) {
        return flashcardProgressRepository.countDueFlashcardsByUserId(userId, OffsetDateTime.now());
    }

    @Transactional
    public LearnerFlashcardDto reviewFlashcard(Long userId, ReviewFlashcardRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        String contentType = request.getContentType() != null ? request.getContentType().toUpperCase() : "";
        Long contentId = request.getContentId();
        String ratingStr = request.getRating() != null ? request.getRating().toUpperCase() : "GOOD";

        if (!Set.of("VOCABULARY", "KANJI", "GRAMMAR").contains(contentType)) {
            throw new IllegalArgumentException("Invalid content type for flashcard: " + contentType);
        }
        if (!Set.of("AGAIN", "HARD", "GOOD", "EASY").contains(ratingStr)) {
            throw new IllegalArgumentException("Invalid rating for flashcard: " + ratingStr);
        }

        FlashcardProgress fp = flashcardProgressRepository.findByUser_UserIdAndContentTypeAndContentId(userId, contentType, contentId)
                .orElseGet(() -> {
                    FlashcardProgress newFp = new FlashcardProgress(user, contentType, contentId);
                    return flashcardProgressRepository.save(newFp);
                });

        int prevInterval = fp.getIntervalDays();
        BigDecimal prevEaseFactor = fp.getEaseFactor();

        int newInterval;
        BigDecimal newEaseFactor;
        String newState;

        if ("AGAIN".equals(ratingStr)) {
            fp.setLapseCount(fp.getLapseCount() + 1);
            newInterval = 1;
            newState = "RELEARNING";
            newEaseFactor = prevEaseFactor.subtract(new BigDecimal("0.20")).max(new BigDecimal("1.30"));
        } else if ("HARD".equals(ratingStr)) {
            fp.setLapseCount(fp.getLapseCount() + 1);
            newInterval = 1;
            newState = "RELEARNING";
            newEaseFactor = prevEaseFactor.subtract(new BigDecimal("0.15")).max(new BigDecimal("1.30"));
        } else if ("EASY".equals(ratingStr)) {
            fp.setReviewCount(fp.getReviewCount() + 1);
            newState = "REVIEW";
            if (fp.getReviewCount() == 1) {
                newInterval = 2;
            } else if (fp.getReviewCount() == 2) {
                newInterval = 6;
            } else {
                double calc = Math.ceil(prevInterval * prevEaseFactor.doubleValue() * 1.3);
                newInterval = Math.max(prevInterval + 1, (int) calc);
            }
            newEaseFactor = prevEaseFactor.add(new BigDecimal("0.15"));
        } else { // GOOD
            fp.setReviewCount(fp.getReviewCount() + 1);
            newState = "REVIEW";
            if (fp.getReviewCount() == 1) {
                newInterval = 1;
            } else if (fp.getReviewCount() == 2) {
                newInterval = 6;
            } else {
                double calc = Math.ceil(prevInterval * prevEaseFactor.doubleValue());
                newInterval = Math.max(prevInterval + 1, (int) calc);
            }
            newEaseFactor = prevEaseFactor;
        }

        fp.setIntervalDays(newInterval);
        fp.setEaseFactor(newEaseFactor.setScale(2, RoundingMode.HALF_UP));
        fp.setState(newState);
        fp.setNextReviewAt(OffsetDateTime.now().plusDays(newInterval));

        FlashcardProgress savedProgress = flashcardProgressRepository.save(fp);

        // Audit review log
        FlashcardReviewLog reviewLog = new FlashcardReviewLog(
                savedProgress,
                user,
                contentType,
                contentId,
                ratingStr,
                prevInterval,
                newInterval,
                prevEaseFactor,
                newEaseFactor,
                "SM2_V1"
        );
        flashcardReviewLogRepository.save(reviewLog);

        // Record learning activity
        LearningActivity activity = new LearningActivity(
                user,
                "FLASHCARD_REVIEWED",
                contentType,
                contentId,
                request.getDurationSeconds(),
                LocalDate.now(),
                user.getTimezone()
        );
        learningActivityRepository.save(activity);

        return buildFlashcardDto(savedProgress);
    }

    @Transactional
    public void resetUserFlashcards(Long userId) {
        flashcardReviewLogRepository.deleteByUser_UserId(userId);
        flashcardProgressRepository.deleteByUser_UserId(userId);
    }

    private LearnerFlashcardDto buildFlashcardDto(FlashcardProgress fp) {
        LearnerFlashcardDto dto = new LearnerFlashcardDto();
        dto.setProgressId(fp.getProgressId());
        dto.setContentType(fp.getContentType());
        dto.setContentId(fp.getContentId());
        dto.setState(fp.getState());
        dto.setEaseFactor(fp.getEaseFactor());
        dto.setIntervalDays(fp.getIntervalDays());
        dto.setNextReviewAt(fp.getNextReviewAt());
        dto.setReviewCount(fp.getReviewCount());

        if ("VOCABULARY".equals(fp.getContentType())) {
            Vocabulary v = vocabularyRepository.findById(fp.getContentId()).orElse(null);
            if (v == null || !"PUBLISHED".equals(v.getStatus()) || v.getDeletedAt() != null) return null;
            dto.setFront(v.getWord());
            dto.setReading(v.getKana());
            dto.setMeaning(v.getMeaningVi());
            dto.setExample(v.getNotes());
            dto.setAudioUrl(v.getAudioUrl());
        } else if ("KANJI".equals(fp.getContentType())) {
            Kanji k = kanjiRepository.findById(fp.getContentId()).orElse(null);
            if (k == null || !"PUBLISHED".equals(k.getStatus()) || k.getDeletedAt() != null) return null;
            dto.setFront(k.getCharacter());
            dto.setReading(k.getOnyomi() + " / " + k.getKunyomi());
            dto.setMeaning(k.getMeaningVi());
            dto.setExample(k.getStrokeCount() != null ? "Nét: " + k.getStrokeCount() : null);
        } else if ("GRAMMAR".equals(fp.getContentType())) {
            GrammarPoint g = grammarPointRepository.findById(fp.getContentId()).orElse(null);
            if (g == null || !"PUBLISHED".equals(g.getStatus()) || g.getDeletedAt() != null) return null;
            dto.setFront(g.getPattern());
            dto.setReading(g.getStructure());
            dto.setMeaning(g.getMeaning());
            dto.setExample(g.getExplanation());
        }

        return dto;
    }
}
