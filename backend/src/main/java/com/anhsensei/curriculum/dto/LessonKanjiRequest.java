package com.anhsensei.curriculum.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class LessonKanjiRequest {

    @NotNull(message = "kanjiId không được để trống")
    private Long kanjiId;

    @NotNull(message = "Thứ tự sắp xếp (sortOrder) không được để trống")
    @Min(value = 1, message = "Thứ tự sắp xếp phải >= 1")
    private Integer sortOrder = 1;

    private String notes;
    private Boolean isRequired = true;

    public LessonKanjiRequest() {}

    public LessonKanjiRequest(Long kanjiId, Integer sortOrder, String notes, Boolean isRequired) {
        this.kanjiId = kanjiId;
        this.sortOrder = sortOrder != null ? sortOrder : 1;
        this.notes = notes;
        this.isRequired = isRequired != null ? isRequired : true;
    }

    public Long getKanjiId() { return kanjiId; }
    public void setKanjiId(Long kanjiId) { this.kanjiId = kanjiId; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Boolean getIsRequired() { return isRequired; }
    public void setIsRequired(Boolean isRequired) { this.isRequired = isRequired; }
}
