package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.Kanji;
import java.time.OffsetDateTime;

public class KanjiDto {
    private Long kanjiId;
    private String character;
    private String onyomi;
    private String kunyomi;
    private String meaningVi;
    private Integer strokeCount;
    private String radical;
    private String imageUrl;
    private String jlptLevel;
    private String status;
    private Long version;
    private OffsetDateTime publishedAt;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public KanjiDto() {}

    public KanjiDto(Kanji kanji) {
        this.kanjiId = kanji.getKanjiId();
        this.character = kanji.getCharacter();
        this.onyomi = kanji.getOnyomi();
        this.kunyomi = kanji.getKunyomi();
        this.meaningVi = kanji.getMeaningVi();
        this.strokeCount = kanji.getStrokeCount();
        this.radical = kanji.getRadical();
        this.imageUrl = kanji.getImageUrl();
        this.jlptLevel = kanji.getJlptLevel();
        this.status = kanji.getStatus();
        this.version = kanji.getVersion();
        this.publishedAt = kanji.getPublishedAt();
        this.createdAt = kanji.getCreatedAt();
        this.updatedAt = kanji.getUpdatedAt();
    }

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

    public String getJlptLevel() { return jlptLevel; }
    public void setJlptLevel(String jlptLevel) { this.jlptLevel = jlptLevel; }

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
