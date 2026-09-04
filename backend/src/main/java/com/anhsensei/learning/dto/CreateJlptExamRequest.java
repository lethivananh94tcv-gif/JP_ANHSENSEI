package com.anhsensei.learning.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class CreateJlptExamRequest {

    @NotBlank(message = "levelCode không được để trống")
    private String levelCode; // N5, N4, N3

    @NotBlank(message = "yearSession không được để trống")
    private String yearSession;

    @NotBlank(message = "Tên đề thi không được để trống")
    private String title;

    @Min(value = 1, message = "Thời gian thi phải lớn hơn 0")
    private int durationMinutes = 105;

    @NotBlank(message = "pdfUrl không được để trống")
    private String pdfUrl;

    private String audioUrl;

    public CreateJlptExamRequest() {}

    public CreateJlptExamRequest(String levelCode, String yearSession, String title, int durationMinutes, String pdfUrl, String audioUrl) {
        this.levelCode = levelCode;
        this.yearSession = yearSession;
        this.title = title;
        this.durationMinutes = durationMinutes;
        this.pdfUrl = pdfUrl;
        this.audioUrl = audioUrl;
    }

    public String getLevelCode() { return levelCode; }
    public void setLevelCode(String levelCode) { this.levelCode = levelCode; }

    public String getYearSession() { return yearSession; }
    public void setYearSession(String yearSession) { this.yearSession = yearSession; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(int durationMinutes) { this.durationMinutes = durationMinutes; }

    public String getPdfUrl() { return pdfUrl; }
    public void setPdfUrl(String pdfUrl) { this.pdfUrl = pdfUrl; }

    public String getAudioUrl() { return audioUrl; }
    public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }
}
