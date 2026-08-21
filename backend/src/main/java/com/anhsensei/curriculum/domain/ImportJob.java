package com.anhsensei.curriculum.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "import_jobs")
public class ImportJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "import_job_id")
    private Long importJobId;

    @Column(name = "admin_id", nullable = false)
    private Long adminId;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "file_path", nullable = false)
    private String filePath;

    @Enumerated(EnumType.STRING)
    @Column(name = "file_type", nullable = false)
    private ImportType fileType;

    @Column(name = "template_version", nullable = false)
    private String templateVersion = "v1.0";

    @Column(name = "target_level_id", nullable = false)
    private Long targetLevelId;

    @Column(name = "target_lesson_id", nullable = false)
    private Long targetLessonId;

    @Enumerated(EnumType.STRING)
    @Column(name = "duplicate_mode", nullable = false)
    private DuplicateMode duplicateMode = DuplicateMode.SKIP;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ImportJobStatus status = ImportJobStatus.UPLOADED;

    @Column(name = "total_rows", nullable = false)
    private Integer totalRows = 0;

    @Column(name = "valid_rows", nullable = false)
    private Integer validRows = 0;

    @Column(name = "invalid_rows", nullable = false)
    private Integer invalidRows = 0;

    @Column(name = "skipped_rows", nullable = false)
    private Integer skippedRows = 0;

    @Version
    @Column(name = "version", nullable = false)
    private Long version = 0L;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private OffsetDateTime updatedAt;

    public ImportJob() {}

    public Long getImportJobId() { return importJobId; }
    public void setImportJobId(Long importJobId) { this.importJobId = importJobId; }

    public Long getAdminId() { return adminId; }
    public void setAdminId(Long adminId) { this.adminId = adminId; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public ImportType getFileType() { return fileType; }
    public void setFileType(ImportType fileType) { this.fileType = fileType; }

    public String getTemplateVersion() { return templateVersion; }
    public void setTemplateVersion(String templateVersion) { this.templateVersion = templateVersion; }

    public Long getTargetLevelId() { return targetLevelId; }
    public void setTargetLevelId(Long targetLevelId) { this.targetLevelId = targetLevelId; }

    public Long getTargetLessonId() { return targetLessonId; }
    public void setTargetLessonId(Long targetLessonId) { this.targetLessonId = targetLessonId; }

    public DuplicateMode getDuplicateMode() { return duplicateMode; }
    public void setDuplicateMode(DuplicateMode duplicateMode) { this.duplicateMode = duplicateMode; }

    public ImportJobStatus getStatus() { return status; }
    public void setStatus(ImportJobStatus status) { this.status = status; }

    public Integer getTotalRows() { return totalRows; }
    public void setTotalRows(Integer totalRows) { this.totalRows = totalRows; }

    public Integer getValidRows() { return validRows; }
    public void setValidRows(Integer validRows) { this.validRows = validRows; }

    public Integer getInvalidRows() { return invalidRows; }
    public void setInvalidRows(Integer invalidRows) { this.invalidRows = invalidRows; }

    public Integer getSkippedRows() { return skippedRows; }
    public void setSkippedRows(Integer skippedRows) { this.skippedRows = skippedRows; }

    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
