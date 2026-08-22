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
    private List<DailyActivityDto> weeklyActivities;

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

    public List<DailyActivityDto> getWeeklyActivities() { return weeklyActivities; }
    public void setWeeklyActivities(List<DailyActivityDto> weeklyActivities) { this.weeklyActivities = weeklyActivities; }
}
