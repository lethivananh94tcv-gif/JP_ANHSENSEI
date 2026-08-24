package com.anhsensei.curriculum.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "question_bank_options")
public class QuestionBankOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_id")
    private Long optionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    @JsonIgnore
    private QuestionBank questionBank;

    @Column(name = "option_text", nullable = false, columnDefinition = "TEXT")
    private String optionText;

    @Column(name = "is_correct", nullable = false)
    @com.fasterxml.jackson.annotation.JsonProperty("isCorrect")
    private Boolean isCorrect = false;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder = 1;

    public QuestionBankOption() {}

    public QuestionBankOption(String optionText, Boolean isCorrect, Integer sortOrder) {
        this.optionText = optionText;
        this.isCorrect = isCorrect != null ? isCorrect : false;
        this.sortOrder = sortOrder != null ? sortOrder : 1;
    }

    public Long getOptionId() { return optionId; }
    public void setOptionId(Long optionId) { this.optionId = optionId; }

    public QuestionBank getQuestionBank() { return questionBank; }
    public void setQuestionBank(QuestionBank questionBank) { this.questionBank = questionBank; }

    public String getOptionText() { return optionText; }
    public void setOptionText(String optionText) { this.optionText = optionText; }

    @com.fasterxml.jackson.annotation.JsonProperty("isCorrect")
    public Boolean getIsCorrect() { return isCorrect != null ? isCorrect : false; }

    @com.fasterxml.jackson.annotation.JsonProperty("isCorrect")
    public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect != null ? isCorrect : false; }

    @com.fasterxml.jackson.annotation.JsonProperty("correct")
    public void setCorrect(Boolean correct) { this.isCorrect = correct != null ? correct : false; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder != null ? sortOrder : 1; }
}
