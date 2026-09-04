package com.anhsensei.learning.domain;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "jlpt_exams")
public class JlptExam {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(name = "level_code", nullable = false, length = 10)
    private String levelCode;

    @Column(name = "year_session", nullable = false, length = 100)
    private String yearSession;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(name = "current_published_version_id")
    private UUID currentPublishedVersionId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    public JlptExam() {}

    public JlptExam(String code, String levelCode, String yearSession, String title) {
        this.code = code;
        this.levelCode = levelCode;
        this.yearSession = yearSession;
        this.title = title;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getLevelCode() { return levelCode; }
    public void setLevelCode(String levelCode) { this.levelCode = levelCode; }

    public String getYearSession() { return yearSession; }
    public void setYearSession(String yearSession) { this.yearSession = yearSession; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public UUID getCurrentPublishedVersionId() { return currentPublishedVersionId; }
    public void setCurrentPublishedVersionId(UUID currentPublishedVersionId) { this.currentPublishedVersionId = currentPublishedVersionId; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
