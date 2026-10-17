package com.anhsensei.learning.dto;

import jakarta.validation.constraints.Min;

public class UpdateJlptExamRequest {

    private String levelCode; // N5, N4, N3
    private String examCode;
    private String title;
    private String yearSession;

    @Min(value = 1, message = "Thời gian thi phải lớn hơn 0")
    private Integer durationMinutes;

    public UpdateJlptExamRequest() {}

    public UpdateJlptExamRequest(String levelCode, String examCode, String title, String yearSession, Integer durationMinutes) {
        this.levelCode = levelCode;
        this.examCode = examCode;
        this.title = title;
        this.yearSession = yearSession;
        this.durationMinutes = durationMinutes;
    }

    public String getLevelCode() { return levelCode; }
    public void setLevelCode(String levelCode) { this.levelCode = levelCode; }

    public String getExamCode() { return examCode; }
    public void setExamCode(String examCode) { this.examCode = examCode; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getYearSession() { return yearSession; }
    public void setYearSession(String yearSession) { this.yearSession = yearSession; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
}
