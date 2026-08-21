package com.anhsensei.curriculum.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateGrammarExampleRequest {

    @NotBlank(message = "Câu tiếng Nhật (japaneseText) không được để trống")
    private String japaneseText;

    private String reading;

    @NotBlank(message = "Bản dịch tiếng Việt (meaningVi) không được để trống")
    private String meaningVi;

    private String notes;

    @NotNull(message = "Thứ tự sắp xếp (sortOrder) không được để trống")
    @Min(value = 1, message = "Thứ tự sắp xếp phải >= 1")
    private Integer sortOrder = 1;

    public CreateGrammarExampleRequest() {}

    public CreateGrammarExampleRequest(String japaneseText, String reading, String meaningVi, String notes, Integer sortOrder) {
        this.japaneseText = japaneseText;
        this.reading = reading;
        this.meaningVi = meaningVi;
        this.notes = notes;
        this.sortOrder = sortOrder != null ? sortOrder : 1;
    }

    public String getJapaneseText() { return japaneseText; }
    public void setJapaneseText(String japaneseText) { this.japaneseText = japaneseText; }

    public String getReading() { return reading; }
    public void setReading(String reading) { this.reading = reading; }

    public String getMeaningVi() { return meaningVi; }
    public void setMeaningVi(String meaningVi) { this.meaningVi = meaningVi; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
