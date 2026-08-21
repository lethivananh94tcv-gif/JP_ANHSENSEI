package com.anhsensei.curriculum.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UpdateLessonRequest {

    @NotBlank(message = "Tiêu đề bài học (title) không được để trống")
    private String title;

    private String description;

    @NotNull(message = "Thứ tự sắp xếp (sortOrder) không được để trống")
    @Min(value = 1, message = "Thứ tự sắp xếp phải là số nguyên dương >= 1")
    private Integer sortOrder;

    private Boolean isSample;

    @Min(value = 1, message = "Thời lượng ước tính (nếu có) phải > 0")
    private Integer estimatedMinutes;

    @NotNull(message = "Trường version để kiểm tra Optimistic Locking không được để trống")
    private Long version;

    public UpdateLessonRequest() {}

    public UpdateLessonRequest(String title, String description, Integer sortOrder, Boolean isSample, Integer estimatedMinutes, Long version) {
        this.title = title;
        this.description = description;
        this.sortOrder = sortOrder;
        this.isSample = isSample;
        this.estimatedMinutes = estimatedMinutes;
        this.version = version;
    }

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

    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }
}
