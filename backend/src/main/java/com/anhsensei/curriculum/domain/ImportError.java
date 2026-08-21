package com.anhsensei.curriculum.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "import_errors")
public class ImportError {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "import_error_id")
    private Long importErrorId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "import_job_id", nullable = false)
    private ImportJob importJob;

    @Column(name = "row_number", nullable = false)
    private Integer rowNumber;

    @Column(name = "sheet_name", nullable = false)
    private String sheetName = "Sheet1";

    @Column(name = "column_name")
    private String columnName;

    @Column(name = "field_name")
    private String fieldName;

    @Column(name = "reason_code", nullable = false)
    private String reasonCode;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    public ImportError() {}

    public ImportError(ImportJob importJob, Integer rowNumber, String sheetName, String columnName, String fieldName, String reasonCode, String message) {
        this.importJob = importJob;
        this.rowNumber = rowNumber;
        this.sheetName = sheetName != null ? sheetName : "Sheet1";
        this.columnName = columnName;
        this.fieldName = fieldName;
        this.reasonCode = reasonCode;
        this.message = message;
    }

    public Long getImportErrorId() { return importErrorId; }
    public void setImportErrorId(Long importErrorId) { this.importErrorId = importErrorId; }

    public ImportJob getImportJob() { return importJob; }
    public void setImportJob(ImportJob importJob) { this.importJob = importJob; }

    public Integer getRowNumber() { return rowNumber; }
    public void setRowNumber(Integer rowNumber) { this.rowNumber = rowNumber; }

    public String getSheetName() { return sheetName; }
    public void setSheetName(String sheetName) { this.sheetName = sheetName; }

    public String getColumnName() { return columnName; }
    public void setColumnName(String columnName) { this.columnName = columnName; }

    public String getFieldName() { return fieldName; }
    public void setFieldName(String fieldName) { this.fieldName = fieldName; }

    public String getReasonCode() { return reasonCode; }
    public void setReasonCode(String reasonCode) { this.reasonCode = reasonCode; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
