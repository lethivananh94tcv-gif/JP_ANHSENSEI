package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.LessonKanji;

public class LessonKanjiDto {
    private Long lessonId;
    private Long kanjiId;
    private String character;
    private String onyomi;
    private String kunyomi;
    private String meaningVi;
    private Integer strokeCount;
    private String radical;
    private String imageUrl;
    private Integer sortOrder;
    private String notes;
    private Boolean isRequired;

    public LessonKanjiDto() {}

    public LessonKanjiDto(LessonKanji lessonKanji) {
        if (lessonKanji.getLesson() != null) {
            this.lessonId = lessonKanji.getLesson().getLessonId();
        }
        if (lessonKanji.getKanji() != null) {
            this.kanjiId = lessonKanji.getKanji().getKanjiId();
            this.character = lessonKanji.getKanji().getCharacter();
            this.onyomi = lessonKanji.getKanji().getOnyomi();
            this.kunyomi = lessonKanji.getKanji().getKunyomi();
            this.meaningVi = lessonKanji.getKanji().getMeaningVi();
            this.strokeCount = lessonKanji.getKanji().getStrokeCount();
            this.radical = lessonKanji.getKanji().getRadical();
            this.imageUrl = lessonKanji.getKanji().getImageUrl();
        }
        this.sortOrder = lessonKanji.getSortOrder();
        this.notes = lessonKanji.getNotes();
        this.isRequired = lessonKanji.getIsRequired();
    }

    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }

    public Long getKanjiId() { return kanjiId; }
    public void setKanjiId(Long kanjiId) { this.kanjiId = kanjiId; }

    public String getCharacter() { return character; }
    public void setCharacter(String character) { this.character = character; }

    public String getOnyomi() { return onyomi; }
    public void setOnyomi(String onyomi) { this.onyomi = onyomi; }

    public String getKunyomi() { return kunyomi; }
    public void setKunyomi(String kunyomi) { this.kunyomi = kunyomi; }

    public String getMeaningVi() { return meaningVi; }
    public void setMeaningVi(String meaningVi) { this.meaningVi = meaningVi; }

    public Integer getStrokeCount() { return strokeCount; }
    public void setStrokeCount(Integer strokeCount) { this.strokeCount = strokeCount; }

    public String getRadical() { return radical; }
    public void setRadical(String radical) { this.radical = radical; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Boolean getIsRequired() { return isRequired; }
    public void setIsRequired(Boolean isRequired) { this.isRequired = isRequired; }
}
