package com.anhsensei.learning.dto;

import com.anhsensei.curriculum.dto.LearnerLessonSummaryDto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class LearnerProgressSummaryDto {

    private String targetLevel;
    private LearnerLessonSummaryDto continueLesson;
    private BigDecimal completionPercent = BigDecimal.ZERO;
    private long completedLessonsCount = 0;
    private long dueFlashcardsCount = 0;
    private long totalValidActivities = 0;
    private long learnedVocabCount = 0;
    private long learnedGrammarCount = 0;
    private long learnedKanjiCount = 0;
    private long completedQuizCount = 0;
    private BigDecimal accuracyPercent = BigDecimal.ZERO;
    private int streakDays = 0;
    private List<DailyActivityDto> weeklyActivities;
    private List<RecentLessonDto> recentLessons;

    public LearnerProgressSummaryDto() {}

    public static class DailyActivityDto {
        private LocalDate date;
        private long count;

        public DailyActivityDto() {}

        public DailyActivityDto(LocalDate date, long count) {
            this.date = date;
            this.count = count;
        }

        public LocalDate getDate() { return date; }
        public void setDate(LocalDate date) { this.date = date; }

        public long getCount() { return count; }
        public void setCount(long count) { this.count = count; }
    }

    public static class RecentLessonDto {
        private Long lessonId;
        private String title;
        private String levelCode;
        private BigDecimal completionPercent;
        private String status;

        public RecentLessonDto() {}

        public RecentLessonDto(Long lessonId, String title, String levelCode, BigDecimal completionPercent, String status) {
            this.lessonId = lessonId;
            this.title = title;
            this.levelCode = levelCode;
            this.completionPercent = completionPercent;
            this.status = status;
        }

        public Long getLessonId() { return lessonId; }
        public void setLessonId(Long lessonId) { this.lessonId = lessonId; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getLevelCode() { return levelCode; }
        public void setLevelCode(String levelCode) { this.levelCode = levelCode; }

        public BigDecimal getCompletionPercent() { return completionPercent; }
        public void setCompletionPercent(BigDecimal completionPercent) { this.completionPercent = completionPercent; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

    public String getTargetLevel() { return targetLevel; }
    public void setTargetLevel(String targetLevel) { this.targetLevel = targetLevel; }

    public LearnerLessonSummaryDto getContinueLesson() { return continueLesson; }
    public void setContinueLesson(LearnerLessonSummaryDto continueLesson) { this.continueLesson = continueLesson; }

    public BigDecimal getCompletionPercent() { return completionPercent; }
    public void setCompletionPercent(BigDecimal completionPercent) { this.completionPercent = completionPercent; }

    public long getCompletedLessonsCount() { return completedLessonsCount; }
    public void setCompletedLessonsCount(long completedLessonsCount) { this.completedLessonsCount = completedLessonsCount; }

    public long getDueFlashcardsCount() { return dueFlashcardsCount; }
    public void setDueFlashcardsCount(long dueFlashcardsCount) { this.dueFlashcardsCount = dueFlashcardsCount; }

    public long getTotalValidActivities() { return totalValidActivities; }
    public void setTotalValidActivities(long totalValidActivities) { this.totalValidActivities = totalValidActivities; }

    public long getLearnedVocabCount() { return learnedVocabCount; }
    public void setLearnedVocabCount(long learnedVocabCount) { this.learnedVocabCount = learnedVocabCount; }

    public long getLearnedGrammarCount() { return learnedGrammarCount; }
    public void setLearnedGrammarCount(long learnedGrammarCount) { this.learnedGrammarCount = learnedGrammarCount; }

    public long getLearnedKanjiCount() { return learnedKanjiCount; }
    public void setLearnedKanjiCount(long learnedKanjiCount) { this.learnedKanjiCount = learnedKanjiCount; }

    public long getCompletedQuizCount() { return completedQuizCount; }
    public void setCompletedQuizCount(long completedQuizCount) { this.completedQuizCount = completedQuizCount; }

    public BigDecimal getAccuracyPercent() { return accuracyPercent; }
    public void setAccuracyPercent(BigDecimal accuracyPercent) { this.accuracyPercent = accuracyPercent; }

    public int getStreakDays() { return streakDays; }
    public void setStreakDays(int streakDays) { this.streakDays = streakDays; }

    public List<DailyActivityDto> getWeeklyActivities() { return weeklyActivities; }
    public void setWeeklyActivities(List<DailyActivityDto> weeklyActivities) { this.weeklyActivities = weeklyActivities; }

    public List<RecentLessonDto> getRecentLessons() { return recentLessons; }
    public void setRecentLessons(List<RecentLessonDto> recentLessons) { this.recentLessons = recentLessons; }
}
