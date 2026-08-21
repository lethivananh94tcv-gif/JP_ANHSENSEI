package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.Lesson;
import java.time.OffsetDateTime;

public class LessonDto {
    private Long lessonId;
    private Long levelId;
    private String levelCode;
    private String title;
    private String description;
    private Integer sortOrder;
    private Boolean isSample;
    private Integer estimatedMinutes;
    private String status;
    private Long version;
    private OffsetDateTime publishedAt;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public LessonDto() {}

    public LessonDto(Lesson lesson) {
        this.lessonId = lesson.getLessonId();
        if (lesson.getLevel() != null && org.hibernate.Hibernate.isInitialized(lesson.getLevel())) {
            this.levelId = lesson.getLevel().getLevelId();
            this.levelCode = lesson.getLevel().getCode();
        }
        this.title = lesson.getTitle();
        this.description = lesson.getDescription();
        this.sortOrder = lesson.getSortOrder();
        this.isSample = lesson.getIsSample();
        this.estimatedMinutes = lesson.getEstimatedMinutes();
        this.status = lesson.getStatus();
        this.version = lesson.getVersion();
        this.publishedAt = lesson.getPublishedAt();
        this.createdAt = lesson.getCreatedAt();
        this.updatedAt = lesson.getUpdatedAt();
    }

    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }

    public Long getLevelId() { return levelId; }
    public void setLevelId(Long levelId) { this.levelId = levelId; }

    public String getLevelCode() { return levelCode; }
    public void setLevelCode(String levelCode) { this.levelCode = levelCode; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public Boolean getIsSample() { return isSample; }
    public void setIsSample(Boolean isSample) { this.isSample = isSample; }

    public Integer getEstimatedMinutes() { return estimatedMinutes; }
    public void setEstimatedMinutes(Integer estimatedMinutes) { this.estimatedMinutes = estimatedMinutes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }

    public OffsetDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(OffsetDateTime publishedAt) { this.publishedAt = publishedAt; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
