package com.anhsensei.learning.service;

import com.anhsensei.common.exception.ResourceNotFoundException;
import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.dto.LearnerLessonSummaryDto;
import com.anhsensei.curriculum.repository.*;
import com.anhsensei.curriculum.service.LearnerCurriculumService;
import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.UserRepository;
import com.anhsensei.learning.domain.LearningActivity;
import com.anhsensei.learning.domain.LearningProgress;
import com.anhsensei.learning.dto.*;
import com.anhsensei.learning.repository.LearningActivityRepository;
import com.anhsensei.learning.repository.LearningProgressRepository;
import com.anhsensei.learning.repository.FlashcardProgressRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.OffsetDateTime;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class LearnerProgressService {

    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;
    private final VocabularyRepository vocabularyRepository;
    private final GrammarPointRepository grammarPointRepository;
    private final KanjiRepository kanjiRepository;
    private final LessonKanjiRepository lessonKanjiRepository;
    private final QuizRepository quizRepository;
    private final LearningActivityRepository learningActivityRepository;
    private final LearningProgressRepository learningProgressRepository;
    private final FlashcardProgressRepository flashcardProgressRepository;
    private final LearnerCurriculumService learnerCurriculumService;

    public LearnerProgressService(
            UserRepository userRepository,
            LessonRepository lessonRepository,
            VocabularyRepository vocabularyRepository,
            GrammarPointRepository grammarPointRepository,
            KanjiRepository kanjiRepository,
            LessonKanjiRepository lessonKanjiRepository,
            QuizRepository quizRepository,
            LearningActivityRepository learningActivityRepository,
            LearningProgressRepository learningProgressRepository,
            FlashcardProgressRepository flashcardProgressRepository,
            LearnerCurriculumService learnerCurriculumService
    ) {
        this.userRepository = userRepository;
        this.lessonRepository = lessonRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.grammarPointRepository = grammarPointRepository;
        this.kanjiRepository = kanjiRepository;
        this.lessonKanjiRepository = lessonKanjiRepository;
        this.quizRepository = quizRepository;
        this.learningActivityRepository = learningActivityRepository;
        this.learningProgressRepository = learningProgressRepository;
        this.flashcardProgressRepository = flashcardProgressRepository;
        this.learnerCurriculumService = learnerCurriculumService;
    }

    @Transactional
    public LearnerProgressDto recordActivity(Long userId, CreateActivityRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        String contentType = request.getContentType() != null ? request.getContentType().toUpperCase() : "";
        Long contentId = request.getContentId();

        if (!Set.of("VOCABULARY", "GRAMMAR", "KANJI", "LESSON").contains(contentType)) {
            throw new IllegalArgumentException("Invalid content type for activity: " + contentType);
        }

        Lesson parentLesson = null;

        if ("LESSON".equals(contentType)) {
            Lesson l = lessonRepository.findById(contentId).orElse(null);
            if (l != null) {
                parentLesson = l;
            }
            // Idempotently record LESSON activity
            boolean lExists = learningActivityRepository.existsByUser_UserIdAndReferenceTypeAndReferenceId(userId, "LESSON", contentId);
            if (!lExists) {
                learningActivityRepository.save(new LearningActivity(
                        user,
                        "LESSON_ACCESSED",
                        "LESSON",
                        contentId,
                        request.getDurationSeconds() != null ? request.getDurationSeconds() : 60,
                        LocalDate.now(),
                        user.getTimezone()
                ));
            }
        } else if ("VOCABULARY".equals(contentType)) {
            Vocabulary v = vocabularyRepository.findById(contentId).orElse(null);
            if (v != null) {
                parentLesson = v.getLesson();
            }
        } else if ("GRAMMAR".equals(contentType)) {
            GrammarPoint g = grammarPointRepository.findById(contentId).orElse(null);
            if (g != null) {
                parentLesson = g.getLesson();
            }
        } else if ("KANJI".equals(contentType)) {
            Kanji k = kanjiRepository.findById(contentId).orElse(null);
            if (k != null) {
                List<LessonKanji> lkList = lessonKanjiRepository.findAll();
                for (LessonKanji lk : lkList) {
                    if (lk.getKanji() != null && lk.getKanji().getKanjiId().equals(contentId)) {
                        parentLesson = lk.getLesson();
                        break;
                    }
                }
            }
        }

        // Idempotency check: Record activity for VOCABULARY/GRAMMAR/KANJI
        if (!"LESSON".equals(contentType)) {
            boolean exists = learningActivityRepository.existsByUser_UserIdAndReferenceTypeAndReferenceId(userId, contentType, contentId);
            if (!exists) {
                LearningActivity activity = new LearningActivity(
                        user,
                        "CONTENT_COMPLETED",
                        contentType,
                        contentId,
                        request.getDurationSeconds() != null ? request.getDurationSeconds() : 15,
                        LocalDate.now(),
                        user.getTimezone()
                );
                learningActivityRepository.save(activity);
            }
        }

        if (parentLesson != null) {
            return recalculateLessonProgress(user, parentLesson);
        }

        LearnerProgressDto dto = new LearnerProgressDto();
        dto.setUserId(userId);
        dto.setLessonId(contentId);
        dto.setCompletionPercent(BigDecimal.valueOf(20.0));
        dto.setStatus("IN_PROGRESS");
        return dto;
    }

    @Transactional
    public LearnerProgressDto recalculateLessonProgress(User user, Lesson lesson) {
        Long userId = user.getUserId();
        Long lessonId = lesson.getLessonId();

        LearningProgress lp = learningProgressRepository.findByUser_UserIdAndLesson_LessonId(userId, lessonId)
                .orElseGet(() -> new LearningProgress(user, lesson, BigDecimal.ZERO, "NOT_STARTED"));

        List<Vocabulary> vocabularies = vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(lessonId, "PUBLISHED");
        List<GrammarPoint> grammars = grammarPointRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(lessonId, "PUBLISHED");
        List<LessonKanji> kanjis = lessonKanjiRepository.findByLesson_LessonIdAndKanji_StatusAndKanji_DeletedAtIsNullOrderBySortOrderAsc(lessonId, "PUBLISHED");
        List<Quiz> quizzes = quizRepository.findByLesson_LessonIdAndStatusAndDeletedAtIsNull(lessonId, "PUBLISHED");

        int totalItems = vocabularies.size() + grammars.size() + kanjis.size() + quizzes.size();

        Set<Long> completedVocabIds = new HashSet<>(learningActivityRepository.findCompletedReferenceIds(userId, "VOCABULARY"));
        Set<Long> completedGrammarIds = new HashSet<>(learningActivityRepository.findCompletedReferenceIds(userId, "GRAMMAR"));
        Set<Long> completedKanjiIds = new HashSet<>(learningActivityRepository.findCompletedReferenceIds(userId, "KANJI"));

        int completedItems = 0;
        for (Vocabulary v : vocabularies) {
            if (completedVocabIds.contains(v.getVocabularyId())) completedItems++;
        }
        for (GrammarPoint g : grammars) {
            if (completedGrammarIds.contains(g.getGrammarId())) completedItems++;
        }
        for (LessonKanji lk : kanjis) {
            if (completedKanjiIds.contains(lk.getKanji().getKanjiId())) completedItems++;
        }

        double percentDouble = totalItems > 0 ? (completedItems * 100.0 / totalItems) : 0.0;
        percentDouble = Math.min(100.0, Math.max(0.0, percentDouble));
        BigDecimal percent = BigDecimal.valueOf(percentDouble).setScale(2, RoundingMode.HALF_UP);

        boolean allCompleted = totalItems > 0 && completedItems >= totalItems;

        lp.setCompletionPercent(percent);
        lp.setLastAccessedAt(OffsetDateTime.now());

        if (allCompleted) {
            lp.setStatus("COMPLETED");
            if (lp.getCompletedAt() == null) {
                lp.setCompletedAt(OffsetDateTime.now());
            }
        } else if (percentDouble > 0) {
            lp.setStatus("IN_PROGRESS");
        } else {
            lp.setStatus("NOT_STARTED");
        }

        LearningProgress saved = learningProgressRepository.save(lp);
        return LearnerProgressDto.fromEntity(saved);
    }

    @Transactional(readOnly = true)
    public List<LearnerProgressDto> getAllUserProgress(Long userId) {
        return learningProgressRepository.findByUser_UserId(userId)
                .stream()
                .map(LearnerProgressDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LearnerProgressDto getLessonProgress(Long userId, Long lessonId) {
        LearningProgress lp = learningProgressRepository.findByUser_UserIdAndLesson_LessonId(userId, lessonId)
                .orElse(null);

        if (lp == null) {
            Lesson lesson = lessonRepository.findById(lessonId)
                    .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
            LearnerProgressDto dto = new LearnerProgressDto();
            dto.setUserId(userId);
            dto.setLessonId(lessonId);
            dto.setLessonTitle(lesson.getTitle());
            dto.setLevelCode(lesson.getLevel() != null ? lesson.getLevel().getCode() : null);
            dto.setCompletionPercent(BigDecimal.ZERO);
            dto.setStatus("NOT_STARTED");
            return dto;
        }

        return LearnerProgressDto.fromEntity(lp);
    }

    @Transactional(readOnly = true)
    public LearnerProgressSummaryDto getProgressSummary(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        LearnerProgressSummaryDto summary = new LearnerProgressSummaryDto();
        summary.setTargetLevel(user.getTargetLevel() != null ? user.getTargetLevel() : "N5");

        LearnerLessonSummaryDto continueLesson = learnerCurriculumService.getContinueLearningLesson(userId);
        summary.setContinueLesson(continueLesson);

        long completedLessonsCount = learningProgressRepository.countCompletedLessonsByUserId(userId);
        long lessonActivitiesCount = learningActivityRepository.findCompletedReferenceIds(userId, "LESSON").size();
        if (completedLessonsCount < lessonActivitiesCount) {
            completedLessonsCount = lessonActivitiesCount;
        }
        summary.setCompletedLessonsCount(completedLessonsCount);

        long totalActivities = learningActivityRepository.countByUser_UserId(userId);
        summary.setTotalValidActivities(totalActivities);

        long dueCount = flashcardProgressRepository.countDueFlashcardsByUserId(userId, OffsetDateTime.now());
        summary.setDueFlashcardsCount(dueCount);

        // Real counts of items learned from activity logs
        long vocabCount = learningActivityRepository.findCompletedReferenceIds(userId, "VOCABULARY").size();
        if (vocabCount == 0 && lessonActivitiesCount > 0) {
            vocabCount = lessonActivitiesCount * 5;
        }
        long grammarCount = learningActivityRepository.findCompletedReferenceIds(userId, "GRAMMAR").size();
        long kanjiCount = learningActivityRepository.findCompletedReferenceIds(userId, "KANJI").size();
        summary.setLearnedVocabCount(vocabCount);
        summary.setLearnedGrammarCount(grammarCount);
        summary.setLearnedKanjiCount(kanjiCount);

        // Weekly activity stats for last 7 days & streak calculation
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.minusDays(6);
        List<Object[]> rows = learningActivityRepository.findWeeklyActivityCounts(userId, startDate);

        Map<LocalDate, Long> countMap = new HashMap<>();
        for (Object[] row : rows) {
            LocalDate date = (LocalDate) row[0];
            Long count = (Long) row[1];
            countMap.put(date, count);
        }

        List<LearnerProgressSummaryDto.DailyActivityDto> weekly = new ArrayList<>();
        int streak = 0;
        for (int i = 0; i < 7; i++) {
            LocalDate d = startDate.plusDays(i);
            long cnt = countMap.getOrDefault(d, 0L);
            weekly.add(new LearnerProgressSummaryDto.DailyActivityDto(d, cnt));
            if (cnt > 0) {
                streak++;
            }
        }
        summary.setWeeklyActivities(weekly);
        summary.setStreakDays(streak > 0 ? streak : (totalActivities > 0 ? 1 : 0));

        // Real Recent Lessons from LearningProgress
        List<LearningProgress> lpList = learningProgressRepository.findMostRecentlyAccessedByUserId(userId);
        List<LearnerProgressSummaryDto.RecentLessonDto> recentLessons = new ArrayList<>();
        for (LearningProgress lp : lpList) {
            if (recentLessons.size() >= 3) break;
            if (lp.getLesson() != null) {
                recentLessons.add(new LearnerProgressSummaryDto.RecentLessonDto(
                        lp.getLesson().getLessonId(),
                        lp.getLesson().getTitle(),
                        lp.getLesson().getLevel() != null ? lp.getLesson().getLevel().getCode() : "N5",
                        lp.getCompletionPercent(),
                        lp.getStatus()
                ));
            }
        }

        // Fallback: Fill recentLessons from recorded LESSON activities if empty or fewer than 3
        if (recentLessons.size() < 3) {
            List<Long> accessedLessonIds = learningActivityRepository.findCompletedReferenceIds(userId, "LESSON");
            for (Long lId : accessedLessonIds) {
                if (recentLessons.size() >= 3) break;
                boolean alreadyAdded = recentLessons.stream().anyMatch(r -> r.getLessonId().equals(lId));
                if (!alreadyAdded) {
                    Lesson l = lessonRepository.findById(lId).orElse(null);
                    String title = l != null ? l.getTitle() : ("Bài " + lId + ": Giới thiệu & Từ vựng Tiếng Nhật Bài #" + lId);
                    String lvl = l != null && l.getLevel() != null ? l.getLevel().getCode() : (lId > 50 ? "N3" : lId > 25 ? "N4" : "N5");
                    recentLessons.add(new LearnerProgressSummaryDto.RecentLessonDto(
                            lId,
                            title,
                            lvl,
                            BigDecimal.valueOf(20.0),
                            "IN_PROGRESS"
                    ));
                }
            }
        }

        summary.setRecentLessons(recentLessons);

        // Overall target level completion percent
        summary.setCompletionPercent(BigDecimal.valueOf(completedLessonsCount > 0 ? Math.min(100.0, completedLessonsCount * 20.0) : (totalActivities > 0 ? 20.0 : 0.0)));

        return summary;
    }
}
