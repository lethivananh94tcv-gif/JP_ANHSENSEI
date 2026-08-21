package com.anhsensei.curriculum.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.SQLRestriction;
import java.time.OffsetDateTime;

@Entity
@Table(name = "examples")
@SQLRestriction("content_type = 'GRAMMAR'")
public class GrammarExample {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "example_id")
    private Long exampleId;

    @Column(name = "content_type", nullable = false, length = 30)
    private String contentType = "GRAMMAR";

    @Column(name = "content_id", nullable = false)
    private Long grammarId;

    @Column(name = "japanese_text", nullable = false, columnDefinition = "TEXT")
    private String japaneseText;

    @Column(name = "furigana", columnDefinition = "TEXT")
    private String reading;

    @Column(name = "translation_vi", nullable = false, columnDefinition = "TEXT")
    private String meaningVi;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder = 1;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private OffsetDateTime updatedAt;

    public GrammarExample() {}

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
