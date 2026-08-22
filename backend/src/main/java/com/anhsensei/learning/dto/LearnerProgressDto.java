package com.anhsensei.learning.dto;

import com.anhsensei.learning.domain.LearningProgress;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public class LearnerProgressDto {

    private Long learningProgressId;
    private Long userId;
    private Long lessonId;
    private String lessonTitle;
    private String levelCode;
    private BigDecimal completionPercent;
    private String status;
    private OffsetDateTime completedAt;
    private OffsetDateTime lastAccessedAt;

    public LearnerProgressDto() {}

    public static LearnerProgressDto fromEntity(LearningProgress lp) {
        if (lp == null) return null;
        LearnerProgressDto dto = new LearnerProgressDto();
        dto.setLearningProgressId(lp.getLearningProgressId());
        dto.setUserId(lp.getUser() != null ? lp.getUser().getUserId() : null);
        if (lp.getLesson() != null) {
            dto.setLessonId(lp.getLesson().getLessonId());
            dto.setLessonTitle(lp.getLesson().getTitle());
            if (lp.getLesson().getLevel() != null) {
                dto.setLevelCode(lp.getLesson().getLevel().getCode());
            }
        }
        dto.setCompletionPercent(lp.getCompletionPercent());
        dto.setStatus(lp.getStatus());
        dto.setCompletedAt(lp.getCompletedAt());
        dto.setLastAccessedAt(lp.getLastAccessedAt());
        return dto;
    }

    public Long getLearningProgressId() { return learningProgressId; }
    public void setLearningProgressId(Long learningProgressId) { this.learningProgressId = learningProgressId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }

    public String getLessonTitle() { return lessonTitle; }
    public void setLessonTitle(String lessonTitle) { this.lessonTitle = lessonTitle; }

    public String getLevelCode() { return levelCode; }
    public void setLevelCode(String levelCode) { this.levelCode = levelCode; }

    public BigDecimal getCompletionPercent() { return completionPercent; }
    public void setCompletionPercent(BigDecimal completionPercent) { this.completionPercent = completionPercent; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public OffsetDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(OffsetDateTime completedAt) { this.completedAt = completedAt; }

    public OffsetDateTime getLastAccessedAt() { return lastAccessedAt; }
    public void setLastAccessedAt(OffsetDateTime lastAccessedAt) { this.lastAccessedAt = lastAccessedAt; }
}
