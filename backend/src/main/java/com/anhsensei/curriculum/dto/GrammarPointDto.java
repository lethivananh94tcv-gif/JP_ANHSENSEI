package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.GrammarPoint;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

public class GrammarPointDto {
    private Long grammarId;
    private Long lessonId;
    private String pattern;
    private String meaning;
    private String explanation;
    private String structure;
    private String jlptLevel;
    private Integer sortOrder;
    private Boolean isRequired;
    private String status;
    private Long version;
    private List<GrammarExampleDto> examples = new ArrayList<>();
    private OffsetDateTime publishedAt;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public GrammarPointDto() {}

    public GrammarPointDto(GrammarPoint grammar) {
        this.grammarId = grammar.getGrammarId();
        if (grammar.getLesson() != null) {
            this.lessonId = grammar.getLesson().getLessonId();
        }
        this.pattern = grammar.getPattern();
        this.meaning = grammar.getMeaning();
        this.explanation = grammar.getExplanation();
        this.structure = grammar.getStructure();
        this.jlptLevel = grammar.getJlptLevel();
        this.sortOrder = grammar.getSortOrder();
        this.isRequired = grammar.getIsRequired();
        this.status = grammar.getStatus();
        this.version = grammar.getVersion();
        this.publishedAt = grammar.getPublishedAt();
        this.createdAt = grammar.getCreatedAt();
        this.updatedAt = grammar.getUpdatedAt();
    }

    public GrammarPointDto(GrammarPoint grammar, List<GrammarExampleDto> examples) {
        this(grammar);
        if (examples != null) {
            this.examples = examples;
        }
    }

    public Long getGrammarId() { return grammarId; }
    public void setGrammarId(Long grammarId) { this.grammarId = grammarId; }

    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }

    public String getPattern() { return pattern; }
    public void setPattern(String pattern) { this.pattern = pattern; }

    public String getMeaning() { return meaning; }
    public void setMeaning(String meaning) { this.meaning = meaning; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getStructure() { return structure; }
    public void setStructure(String structure) { this.structure = structure; }

    public String getJlptLevel() { return jlptLevel; }
    public void setJlptLevel(String jlptLevel) { this.jlptLevel = jlptLevel; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public Boolean getIsRequired() { return isRequired; }
    public void setIsRequired(Boolean isRequired) { this.isRequired = isRequired; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }

    public List<GrammarExampleDto> getExamples() { return examples; }
    public void setExamples(List<GrammarExampleDto> examples) { this.examples = examples; }

    public OffsetDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(OffsetDateTime publishedAt) { this.publishedAt = publishedAt; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
