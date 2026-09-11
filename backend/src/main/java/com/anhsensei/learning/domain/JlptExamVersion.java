package com.anhsensei.learning.domain;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "jlpt_exam_versions")
public class JlptExamVersion {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "exam_id", nullable = false)
    private UUID examId;

    @Column(name = "version_number", nullable = false)
    private int versionNumber = 1;

    @Column(nullable = false, length = 30)
    private String status = "DRAFT"; // DRAFT, AI_GENERATED, ADMIN_REVIEW, APPROVED, PUBLISHED

    @Column(name = "pdf_url", nullable = false, columnDefinition = "TEXT")
    private String pdfUrl;

    @Column(name = "audio_url", columnDefinition = "TEXT")
    private String audioUrl;

    @Column(name = "duration_minutes", nullable = false)
    private int durationMinutes = 105;

    @Column(name = "change_log", columnDefinition = "TEXT")
    private String changeLog;

    @Column(name = "official_answer_key_json", columnDefinition = "TEXT")
    private String officialAnswerKeyJson;

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "approved_by")
    private Long approvedBy;

    @Column(name = "published_at")
    private Instant publishedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public JlptExamVersion() {}

    public JlptExamVersion(UUID examId, int versionNumber, String pdfUrl, String audioUrl, int durationMinutes) {
        this.examId = examId;
        this.versionNumber = versionNumber;
        this.pdfUrl = pdfUrl;
        this.audioUrl = audioUrl;
        this.durationMinutes = durationMinutes;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getExamId() { return examId; }
    public void setExamId(UUID examId) { this.examId = examId; }

    public int getVersionNumber() { return versionNumber; }
    public void setVersionNumber(int versionNumber) { this.versionNumber = versionNumber; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPdfUrl() { return pdfUrl; }
    public void setPdfUrl(String pdfUrl) { this.pdfUrl = pdfUrl; }

    public String getAudioUrl() { return audioUrl; }
    public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }

    public int getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(int durationMinutes) { this.durationMinutes = durationMinutes; }

    public String getChangeLog() { return changeLog; }
    public void setChangeLog(String changeLog) { this.changeLog = changeLog; }

    public String getOfficialAnswerKeyJson() { return officialAnswerKeyJson; }
    public void setOfficialAnswerKeyJson(String officialAnswerKeyJson) { this.officialAnswerKeyJson = officialAnswerKeyJson; }

    public Long getCreatedBy() { return createdBy; }
    public void setCreatedBy(Long createdBy) { this.createdBy = createdBy; }

    public Long getApprovedBy() { return approvedBy; }
    public void setApprovedBy(Long approvedBy) { this.approvedBy = approvedBy; }

    public Instant getPublishedAt() { return publishedAt; }
    public void setPublishedAt(Instant publishedAt) { this.publishedAt = publishedAt; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
