package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.Lesson;

public class LearnerLessonSummaryDto {

    private Long lessonId;
    private Long levelId;
    private String levelCode;
    private String title;
    private String description;
    private Integer sortOrder;
    private Boolean isSample;
    private Integer estimatedMinutes;
    private String status;

    public LearnerLessonSummaryDto() {}

    public LearnerLessonSummaryDto(Long lessonId, Long levelId, String levelCode, String title, String description, Integer sortOrder, Boolean isSample, Integer estimatedMinutes, String status) {
        this.lessonId = lessonId;
        this.levelId = levelId;
        this.levelCode = levelCode;
        this.title = title;
        this.description = description;
        this.sortOrder = sortOrder;
        this.isSample = isSample;
        this.estimatedMinutes = estimatedMinutes;
        this.status = status;
    }

    public static LearnerLessonSummaryDto fromLesson(Lesson lesson) {
        if (lesson == null) return null;
        return new LearnerLessonSummaryDto(
                lesson.getLessonId(),
                lesson.getLevel() != null ? lesson.getLevel().getLevelId() : null,
                lesson.getLevel() != null ? lesson.getLevel().getCode() : null,
                lesson.getTitle(),
                lesson.getDescription(),
                lesson.getSortOrder(),
                lesson.getIsSample(),
                lesson.getEstimatedMinutes(),
                lesson.getStatus()
        );
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
}
