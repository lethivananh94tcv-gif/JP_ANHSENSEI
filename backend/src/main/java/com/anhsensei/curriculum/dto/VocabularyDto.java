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
    private String exampleJp;
    private String exampleVi;
    private String exampleReading;
    private String usageNote;
    private String verbType;
    private String verbTypeJa;
    private String verbNote;
    private Long pairedVerbId;
    private String pairedVerbWord;
    private String pairedVerbKana;
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
        this.exampleJp = (vocabulary.getExampleJp() != null && !vocabulary.getExampleJp().trim().isEmpty())
                ? vocabulary.getExampleJp()
                : (vocabulary.getWord() != null ? vocabulary.getWord() : vocabulary.getKana()) + " を 毎日 勉強します。";
        this.exampleVi = (vocabulary.getExampleVi() != null && !vocabulary.getExampleVi().trim().isEmpty())
                ? vocabulary.getExampleVi()
                : "Tôi học từ \"" + vocabulary.getMeaningVi() + "\" mỗi ngày.";
        this.exampleReading = (vocabulary.getExampleReading() != null && !vocabulary.getExampleReading().trim().isEmpty())
                ? vocabulary.getExampleReading()
                : (vocabulary.getKana() != null ? vocabulary.getKana() : vocabulary.getWord()) + " を まいにち べんきょうします。";
        this.usageNote = (vocabulary.getUsageNote() != null && !vocabulary.getUsageNote().trim().isEmpty())
                ? vocabulary.getUsageNote()
                : "Mẫu câu ví dụ ứng dụng từ vựng vào đời sống hàng ngày.";
        this.verbType = vocabulary.getVerbType();
        this.verbTypeJa = vocabulary.getVerbTypeJa();
        this.verbNote = vocabulary.getVerbNote();
        if (vocabulary.getPairedVerb() != null) {
            this.pairedVerbId = vocabulary.getPairedVerb().getVocabularyId();
            this.pairedVerbWord = vocabulary.getPairedVerb().getWord();
            this.pairedVerbKana = vocabulary.getPairedVerb().getKana();
        }
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

    public String getExampleJp() { return exampleJp; }
    public void setExampleJp(String exampleJp) { this.exampleJp = exampleJp; }

    public String getExampleVi() { return exampleVi; }
    public void setExampleVi(String exampleVi) { this.exampleVi = exampleVi; }

    public String getExampleReading() { return exampleReading; }
    public void setExampleReading(String exampleReading) { this.exampleReading = exampleReading; }

    public String getUsageNote() { return usageNote; }
    public void setUsageNote(String usageNote) { this.usageNote = usageNote; }

    public String getVerbType() { return verbType; }
    public void setVerbType(String verbType) { this.verbType = verbType; }

    public String getVerbTypeJa() { return verbTypeJa; }
    public void setVerbTypeJa(String verbTypeJa) { this.verbTypeJa = verbTypeJa; }

    public String getVerbNote() { return verbNote; }
    public void setVerbNote(String verbNote) { this.verbNote = verbNote; }

    public Long getPairedVerbId() { return pairedVerbId; }
    public void setPairedVerbId(Long pairedVerbId) { this.pairedVerbId = pairedVerbId; }

    public String getPairedVerbWord() { return pairedVerbWord; }
    public void setPairedVerbWord(String pairedVerbWord) { this.pairedVerbWord = pairedVerbWord; }

    public String getPairedVerbKana() { return pairedVerbKana; }
    public void setPairedVerbKana(String pairedVerbKana) { this.pairedVerbKana = pairedVerbKana; }

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
