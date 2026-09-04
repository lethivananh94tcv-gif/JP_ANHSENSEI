package com.anhsensei.learning.domain;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "jlpt_exam_questions")
public class JlptExamQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "exam_version_id", nullable = false)
    private UUID examVersionId;

    @Column(name = "global_index", nullable = false)
    private int globalIndex;

    @Column(name = "local_pdf_number", nullable = false)
    private int localPdfNumber;

    @Column(name = "section_type", nullable = false, length = 30)
    private String sectionType; // VOCAB, GRAMMAR, LISTENING

    @Column(name = "question_snippet", columnDefinition = "TEXT")
    private String questionSnippet;

    @Column(name = "correct_option", nullable = false)
    private int correctOption; // 1, 2, 3, 4

    @Column(name = "option_text", columnDefinition = "TEXT")
    private String optionText;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @Column(name = "audio_script", columnDefinition = "TEXT")
    private String audioScript;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public JlptExamQuestion() {}

    public JlptExamQuestion(UUID examVersionId, int globalIndex, int localPdfNumber, String sectionType, String questionSnippet, int correctOption, String optionText, String explanation) {
        this.examVersionId = examVersionId;
        this.globalIndex = globalIndex;
        this.localPdfNumber = localPdfNumber;
        this.sectionType = sectionType;
        this.questionSnippet = questionSnippet;
        this.correctOption = correctOption;
        this.optionText = optionText;
        this.explanation = explanation;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getExamVersionId() { return examVersionId; }
    public void setExamVersionId(UUID examVersionId) { this.examVersionId = examVersionId; }

    public int getGlobalIndex() { return globalIndex; }
    public void setGlobalIndex(int globalIndex) { this.globalIndex = globalIndex; }

    public int getLocalPdfNumber() { return localPdfNumber; }
    public void setLocalPdfNumber(int localPdfNumber) { this.localPdfNumber = localPdfNumber; }

    public String getSectionType() { return sectionType; }
    public void setSectionType(String sectionType) { this.sectionType = sectionType; }

    public String getQuestionSnippet() { return questionSnippet; }
    public void setQuestionSnippet(String questionSnippet) { this.questionSnippet = questionSnippet; }

    public int getCorrectOption() { return correctOption; }
    public void setCorrectOption(int correctOption) { this.correctOption = correctOption; }

    public String getOptionText() { return optionText; }
    public void setOptionText(String optionText) { this.optionText = optionText; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getAudioScript() { return audioScript; }
    public void setAudioScript(String audioScript) { this.audioScript = audioScript; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
