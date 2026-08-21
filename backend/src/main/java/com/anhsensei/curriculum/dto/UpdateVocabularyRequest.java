package com.anhsensei.curriculum.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UpdateVocabularyRequest {

    @NotBlank(message = "Từ vựng (word) không được để trống")
    private String word;

    @NotBlank(message = "Cách đọc Kana (kana) không được để trống")
    private String kana;

    private String kanjiForm;

    @NotBlank(message = "Nghĩa tiếng Việt (meaningVi) không được để trống")
    private String meaningVi;

    private String partOfSpeech;
    private String audioUrl;
    private String notes;

    @NotNull(message = "Thứ tự sắp xếp (sortOrder) không được để trống")
    @Min(value = 1, message = "Thứ tự sắp xếp phải >= 1")
    private Integer sortOrder;

    private Boolean isRequired;

    @NotNull(message = "Trường version để kiểm tra Optimistic Locking không được để trống")
    private Long version;

    public UpdateVocabularyRequest() {}

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

    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }
}
