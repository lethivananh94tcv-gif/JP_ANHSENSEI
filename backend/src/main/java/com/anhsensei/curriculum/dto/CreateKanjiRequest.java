package com.anhsensei.curriculum.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class CreateKanjiRequest {

    @NotBlank(message = "Ký tự Hán tự (character) không được để trống")
    private String character;

    private String onyomi;
    private String kunyomi;

    @NotBlank(message = "Nghĩa tiếng Việt (meaningVi) không được để trống")
    private String meaningVi;

    @Min(value = 1, message = "Số nét vẽ (strokeCount) phải > 0")
    private Integer strokeCount;

    private String radical;
    private String imageUrl;
    private String jlptLevel;

    public CreateKanjiRequest() {}

    public CreateKanjiRequest(String character, String onyomi, String kunyomi, String meaningVi, Integer strokeCount, String radical, String imageUrl, String jlptLevel) {
        this.character = character;
        this.onyomi = onyomi;
        this.kunyomi = kunyomi;
        this.meaningVi = meaningVi;
        this.strokeCount = strokeCount;
        this.radical = radical;
        this.imageUrl = imageUrl;
        this.jlptLevel = jlptLevel;
    }

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
}
