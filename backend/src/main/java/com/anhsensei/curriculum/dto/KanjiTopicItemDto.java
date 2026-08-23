package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.KanjiTopicItem;

public class KanjiTopicItemDto {
    private Long kanjiId;
    private String character;
    private String onyomi;
    private String kunyomi;
    private String meaningVi;
    private Integer strokeCount;
    private String radical;
    private Integer displayOrder;
    private String kunExamples;
    private String onExamples;
    private String acceptedRomaji;

    public KanjiTopicItemDto() {}

    public KanjiTopicItemDto(KanjiTopicItem item) {
        if (item.getKanji() != null) {
            this.kanjiId = item.getKanji().getKanjiId();
            this.character = item.getKanji().getCharacter();
            this.onyomi = item.getKanji().getOnyomi();
            this.kunyomi = item.getKanji().getKunyomi();
            this.meaningVi = item.getKanji().getMeaningVi();
            this.strokeCount = item.getKanji().getStrokeCount();
            this.radical = item.getKanji().getRadical();
        }
        this.displayOrder = item.getDisplayOrder();
        this.kunExamples = item.getKunExamples();
        this.onExamples = item.getOnExamples();
        this.acceptedRomaji = item.getAcceptedRomaji();
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

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public String getKunExamples() { return kunExamples; }
    public void setKunExamples(String kunExamples) { this.kunExamples = kunExamples; }

    public String getOnExamples() { return onExamples; }
    public void setOnExamples(String onExamples) { this.onExamples = onExamples; }

    public String getAcceptedRomaji() { return acceptedRomaji; }
    public void setAcceptedRomaji(String acceptedRomaji) { this.acceptedRomaji = acceptedRomaji; }
}
