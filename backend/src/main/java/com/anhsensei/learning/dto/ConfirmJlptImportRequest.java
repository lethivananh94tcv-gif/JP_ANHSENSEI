package com.anhsensei.learning.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class ConfirmJlptImportRequest {

    @NotBlank(message = "Mã cấp độ không được để trống (N5, N4, N3...)")
    private String levelCode;

    @NotBlank(message = "Tên đợt thi không được để trống (VD: Đề Thi Thật N4 12/2021)")
    private String yearSession;

    @NotBlank(message = "Mã đề thi không được để trống")
    private String examCode;

    private String pdfUrl;
    private String audioUrl;
    private Integer durationMinutes = 105;

    @NotNull(message = "Danh sách câu hỏi không được để trống")
    private List<ParsedQuestionItem> questions;

    public static class ParsedQuestionItem {
        private Integer globalIndex;
        private String sectionType; // VOCAB, GRAMMAR, LISTENING
        private Integer localPdfNumber;
        private String snippet;
        private Integer correctOption; // 1..4 or null if NEEDS_REVIEW
        private String explanation; // null if NEEDS_REVIEW
        private String audioScriptJa;
        private String audioScriptVi;
        private String status; // VALID or NEEDS_REVIEW

        // Getters and Setters
        public Integer getGlobalIndex() { return globalIndex; }
        public void setGlobalIndex(Integer globalIndex) { this.globalIndex = globalIndex; }

        public String getSectionType() { return sectionType; }
        public void setSectionType(String sectionType) { this.sectionType = sectionType; }

        public Integer getLocalPdfNumber() { return localPdfNumber; }
        public void setLocalPdfNumber(Integer localPdfNumber) { this.localPdfNumber = localPdfNumber; }

        public String getSnippet() { return snippet; }
        public void setSnippet(String snippet) { this.snippet = snippet; }

        public Integer getCorrectOption() { return correctOption; }
        public void setCorrectOption(Integer correctOption) { this.correctOption = correctOption; }

        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }

        public String getAudioScriptJa() { return audioScriptJa; }
        public void setAudioScriptJa(String audioScriptJa) { this.audioScriptJa = audioScriptJa; }

        public String getAudioScriptVi() { return audioScriptVi; }
        public void setAudioScriptVi(String audioScriptVi) { this.audioScriptVi = audioScriptVi; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

    // Getters and Setters
    public String getLevelCode() { return levelCode; }
    public void setLevelCode(String levelCode) { this.levelCode = levelCode; }

    public String getYearSession() { return yearSession; }
    public void setYearSession(String yearSession) { this.yearSession = yearSession; }

    public String getExamCode() { return examCode; }
    public void setExamCode(String examCode) { this.examCode = examCode; }

    public String getPdfUrl() { return pdfUrl; }
    public void setPdfUrl(String pdfUrl) { this.pdfUrl = pdfUrl; }

    public String getAudioUrl() { return audioUrl; }
    public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public List<ParsedQuestionItem> getQuestions() { return questions; }
    public void setQuestions(List<ParsedQuestionItem> questions) { this.questions = questions; }
}
