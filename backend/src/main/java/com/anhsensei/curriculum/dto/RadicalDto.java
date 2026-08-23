package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.Radical;

public class RadicalDto {
    private Long radicalId;
    private Integer radicalNumber;
    private String character;
    private String nameVi;
    private Integer strokeCount;
    private String meaningVi;
    private String examples;

    public RadicalDto() {}

    public RadicalDto(Radical radical) {
        this.radicalId = radical.getRadicalId();
        this.radicalNumber = radical.getRadicalNumber();
        this.character = radical.getCharacter();
        this.nameVi = radical.getNameVi();
        this.strokeCount = radical.getStrokeCount();
        this.meaningVi = radical.getMeaningVi();
        this.examples = radical.getExamples();
    }

    public Long getRadicalId() { return radicalId; }
    public void setRadicalId(Long radicalId) { this.radicalId = radicalId; }

    public Integer getRadicalNumber() { return radicalNumber; }
    public void setRadicalNumber(Integer radicalNumber) { this.radicalNumber = radicalNumber; }

    public String getCharacter() { return character; }
    public void setCharacter(String character) { this.character = character; }

    public String getNameVi() { return nameVi; }
    public void setNameVi(String nameVi) { this.nameVi = nameVi; }

    public Integer getStrokeCount() { return strokeCount; }
    public void setStrokeCount(Integer strokeCount) { this.strokeCount = strokeCount; }

    public String getMeaningVi() { return meaningVi; }
    public void setMeaningVi(String meaningVi) { this.meaningVi = meaningVi; }

    public String getExamples() { return examples; }
    public void setExamples(String examples) { this.examples = examples; }
}
