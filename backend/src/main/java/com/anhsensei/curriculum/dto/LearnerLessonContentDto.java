package com.anhsensei.curriculum.dto;

import java.util.List;

public class LearnerLessonContentDto {

    private Long lessonId;
    private Long levelId;
    private String levelCode;
    private String title;
    private String description;
    private Integer sortOrder;
    private Boolean isSample;
    private Integer estimatedMinutes;

    private List<VocabularyDto> vocabularies;
    private List<GrammarPointDto> grammars;
    private List<KanjiDto> kanjis;
    private List<LearnerQuizSummaryDto> quizzes;

    private Integer completionPercent;
    private String status; // NOT_STARTED, IN_PROGRESS, COMPLETED

    public LearnerLessonContentDto() {}

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

    public List<VocabularyDto> getVocabularies() { return vocabularies; }
    public void setVocabularies(List<VocabularyDto> vocabularies) { this.vocabularies = vocabularies; }

    public List<GrammarPointDto> getGrammars() { return grammars; }
    public void setGrammars(List<GrammarPointDto> grammars) { this.grammars = grammars; }

    public List<KanjiDto> getKanjis() { return kanjis; }
    public void setKanjis(List<KanjiDto> kanjis) { this.kanjis = kanjis; }

    public List<LearnerQuizSummaryDto> getQuizzes() { return quizzes; }
    public void setQuizzes(List<LearnerQuizSummaryDto> quizzes) { this.quizzes = quizzes; }

    public Integer getCompletionPercent() { return completionPercent; }
    public void setCompletionPercent(Integer completionPercent) { this.completionPercent = completionPercent; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
