package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.ImportError;

public class ImportErrorDto {
    private Long importErrorId;
    private Long importJobId;
    private Integer rowNumber;
    private String sheetName;
    private String columnName;
    private String fieldName;
    private String reasonCode;
    private String message;

    public ImportErrorDto() {}

    public ImportErrorDto(ImportError error) {
        this.importErrorId = error.getImportErrorId();
        if (error.getImportJob() != null) {
            this.importJobId = error.getImportJob().getImportJobId();
        }
        this.rowNumber = error.getRowNumber();
        this.sheetName = error.getSheetName();
        this.columnName = error.getColumnName();
        this.fieldName = error.getFieldName();
        this.reasonCode = error.getReasonCode();
        this.message = error.getMessage();
    }

    public Long getImportErrorId() { return importErrorId; }
    public void setImportErrorId(Long importErrorId) { this.importErrorId = importErrorId; }

    public Long getImportJobId() { return importJobId; }
    public void setImportJobId(Long importJobId) { this.importJobId = importJobId; }

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
}
