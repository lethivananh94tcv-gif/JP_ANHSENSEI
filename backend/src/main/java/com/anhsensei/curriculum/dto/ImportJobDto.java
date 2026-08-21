package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.ImportJob;
import java.time.OffsetDateTime;

public class ImportJobDto {
    private Long importJobId;
    private Long adminId;
    private String fileName;
    private String fileType;
    private String templateVersion;
    private Long targetLevelId;
    private Long targetLessonId;
    private String duplicateMode;
    private String status;
    private Integer totalRows;
    private Integer validRows;
    private Integer invalidRows;
    private Integer skippedRows;
    private Long version;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public ImportJobDto() {}

    public ImportJobDto(ImportJob job) {
        this.importJobId = job.getImportJobId();
        this.adminId = job.getAdminId();
        this.fileName = job.getFileName();
        this.fileType = job.getFileType() != null ? job.getFileType().name() : null;
        this.templateVersion = job.getTemplateVersion();
        this.targetLevelId = job.getTargetLevelId();
        this.targetLessonId = job.getTargetLessonId();
        this.duplicateMode = job.getDuplicateMode() != null ? job.getDuplicateMode().name() : null;
        this.status = job.getStatus() != null ? job.getStatus().name() : null;
        this.totalRows = job.getTotalRows();
        this.validRows = job.getValidRows();
        this.invalidRows = job.getInvalidRows();
        this.skippedRows = job.getSkippedRows();
        this.version = job.getVersion();
        this.createdAt = job.getCreatedAt();
        this.updatedAt = job.getUpdatedAt();
    }

    public Long getImportJobId() { return importJobId; }
    public void setImportJobId(Long importJobId) { this.importJobId = importJobId; }

    public Long getAdminId() { return adminId; }
    public void setAdminId(Long adminId) { this.adminId = adminId; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }

    public String getTemplateVersion() { return templateVersion; }
    public void setTemplateVersion(String templateVersion) { this.templateVersion = templateVersion; }

    public Long getTargetLevelId() { return targetLevelId; }
    public void setTargetLevelId(Long targetLevelId) { this.targetLevelId = targetLevelId; }

    public Long getTargetLessonId() { return targetLessonId; }
    public void setTargetLessonId(Long targetLessonId) { this.targetLessonId = targetLessonId; }

    public String getDuplicateMode() { return duplicateMode; }
    public void setDuplicateMode(String duplicateMode) { this.duplicateMode = duplicateMode; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

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
