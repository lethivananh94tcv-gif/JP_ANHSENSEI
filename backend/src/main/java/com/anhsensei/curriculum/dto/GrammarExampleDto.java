package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.GrammarExample;
import java.time.OffsetDateTime;

public class GrammarExampleDto {
    private Long exampleId;
    private String contentType;
    private Long grammarId;
    private String japaneseText;
    private String reading;
    private String meaningVi;
    private String notes;
    private Integer sortOrder;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public GrammarExampleDto() {}

    public GrammarExampleDto(Long exampleId, String contentType, Long grammarId, String japaneseText, String notes, String reading, String meaningVi, Integer sortOrder) {
        this.exampleId = exampleId;
        this.contentType = contentType;
        this.grammarId = grammarId;
        this.japaneseText = japaneseText;
        this.notes = notes;
        this.reading = reading;
        this.meaningVi = meaningVi;
        this.sortOrder = sortOrder;
    }

    public GrammarExampleDto(GrammarExample example) {
        this.exampleId = example.getExampleId();
        this.contentType = example.getContentType();
        this.grammarId = example.getGrammarId();
        this.japaneseText = example.getJapaneseText();
        this.reading = example.getReading();
        this.meaningVi = example.getMeaningVi();
        this.notes = example.getNotes();
        this.sortOrder = example.getSortOrder();
        this.createdAt = example.getCreatedAt();
        this.updatedAt = example.getUpdatedAt();
    }

    public Long getExampleId() { return exampleId; }
    public void setExampleId(Long exampleId) { this.exampleId = exampleId; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public Long getGrammarId() { return grammarId; }
    public void setGrammarId(Long grammarId) { this.grammarId = grammarId; }

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

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
