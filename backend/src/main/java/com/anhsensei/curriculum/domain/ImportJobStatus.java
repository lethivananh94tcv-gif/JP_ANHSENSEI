package com.anhsensei.curriculum.domain;

public enum ImportJobStatus {
    UPLOADED,
    VALIDATING,
    VALIDATION_FAILED,
    READY_TO_COMMIT,
    COMMITTING,
    COMPLETED,
    FAILED_TECHNICAL,
    CANCELLED
}
