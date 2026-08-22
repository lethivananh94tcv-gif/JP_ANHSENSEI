package com.anhsensei.curriculum.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "question_options", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"question_id", "sort_order"})
})
public class QuestionOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_id")
    private Long optionId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(name = "option_text", nullable = false, columnDefinition = "text")
    private String optionText;

    @Column(name = "is_correct", nullable = false)
    private Boolean isCorrect = false;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    public QuestionOption() {}

    public QuestionOption(Question question, String optionText, Boolean isCorrect, Integer sortOrder) {
        this.question = question;
        this.optionText = optionText;
        this.isCorrect = isCorrect;
        this.sortOrder = sortOrder;
    }

    public Long getOptionId() { return optionId; }
    public void setOptionId(Long optionId) { this.optionId = optionId; }

    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }

    public String getOptionText() { return optionText; }
    public void setOptionText(String optionText) { this.optionText = optionText; }

    public Boolean getIsCorrect() { return isCorrect; }
    public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
