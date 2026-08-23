package com.anhsensei.curriculum.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "radicals")
public class Radical {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "radical_id")
    private Long radicalId;

    @Column(name = "radical_number", nullable = false, unique = true)
    private Integer radicalNumber;

    @Column(name = "character", nullable = false, length = 10)
    private String character;

    @Column(name = "name_vi", nullable = false, length = 100)
    private String nameVi;

    @Column(name = "stroke_count", nullable = false)
    private Integer strokeCount = 1;

    @Column(name = "meaning_vi", columnDefinition = "TEXT")
    private String meaningVi;

    @Column(name = "examples", columnDefinition = "TEXT")
    private String examples;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    public Radical() {}

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

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
