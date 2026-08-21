package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.Vocabulary;
import java.time.OffsetDateTime;

public class VocabularyDto {
    private Long vocabularyId;
    private Long lessonId;
    private String word;
    private String kana;
    private String kanjiForm;
    private String meaningVi;
    private String partOfSpeech;
    private String audioUrl;
    private String notes;
    private Integer sortOrder;
    private Boolean isRequired;
    private String status;
    private Long version;
    private OffsetDateTime publishedAt;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public VocabularyDto() {}

    public VocabularyDto(Vocabulary vocabulary) {
        this.vocabularyId = vocabulary.getVocabularyId();
        if (vocabulary.getLesson() != null) {
            this.lessonId = vocabulary.getLesson().getLessonId();
        }
        this.word = vocabulary.getWord();
        this.kana = vocabulary.getKana();
        this.kanjiForm = vocabulary.getKanjiForm();
        this.meaningVi = vocabulary.getMeaningVi();
        this.partOfSpeech = vocabulary.getPartOfSpeech();
        this.audioUrl = vocabulary.getAudioUrl();
        this.notes = vocabulary.getNotes();
        this.sortOrder = vocabulary.getSortOrder();
        this.isRequired = vocabulary.getIsRequired();
        this.status = vocabulary.getStatus();
        this.version = vocabulary.getVersion();
        this.publishedAt = vocabulary.getPublishedAt();
        this.createdAt = vocabulary.getCreatedAt();
        this.updatedAt = vocabulary.getUpdatedAt();
    }

    public Long getVocabularyId() { return vocabularyId; }
    public void setVocabularyId(Long vocabularyId) { this.vocabularyId = vocabularyId; }

    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }

    public String getWord() { return word; }
    public void setWord(String word) { this.word = word; }

    public String getKana() { return kana; }
    public void setKana(String kana) { this.kana = kana; }

    public String getKanjiForm() { return kanjiForm; }
    public void setKanjiForm(String kanjiForm) { this.kanjiForm = kanjiForm; }

    public String getMeaningVi() { return meaningVi; }
    public void setMeaningVi(String meaningVi) { this.meaningVi = meaningVi; }

    public String getPartOfSpeech() { return partOfSpeech; }
    public void setPartOfSpeech(String partOfSpeech) { this.partOfSpeech = partOfSpeech; }

    public String getAudioUrl() { return audioUrl; }
    public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public Boolean getIsRequired() { return isRequired; }
    public void setIsRequired(Boolean isRequired) { this.isRequired = isRequired; }

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
