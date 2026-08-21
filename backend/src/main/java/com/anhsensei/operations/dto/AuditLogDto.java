package com.anhsensei.operations.dto;

import com.anhsensei.operations.domain.AuditLog;
import java.time.OffsetDateTime;
import java.util.UUID;

public class AuditLogDto {
    private Long auditLogId;
    private Long actorUserId;
    private String action;
    private String entityType;
    private String entityId;
    private String oldValue;
    private String newValue;
    private String ipAddress;
    private UUID correlationId;
    private OffsetDateTime createdAt;

    public AuditLogDto() {}

    public AuditLogDto(AuditLog log) {
        this.auditLogId = log.getAuditLogId();
        this.actorUserId = log.getActorUserId();
        this.action = log.getAction();
        this.entityType = log.getEntityType();
        this.entityId = log.getEntityId();
        this.oldValue = log.getOldValue();
        this.newValue = log.getNewValue();
        this.ipAddress = log.getIpAddress();
        this.correlationId = log.getCorrelationId();
        this.createdAt = log.getCreatedAt();
    }

    public Long getAuditLogId() { return auditLogId; }
    public void setAuditLogId(Long auditLogId) { this.auditLogId = auditLogId; }

    public Long getActorUserId() { return actorUserId; }
    public void setActorUserId(Long actorUserId) { this.actorUserId = actorUserId; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getEntityType() { return entityType; }
    public void setEntityType(String entityType) { this.entityType = entityType; }

    public String getEntityId() { return entityId; }
    public void setEntityId(String entityId) { this.entityId = entityId; }

    public String getOldValue() { return oldValue; }
    public void setOldValue(String oldValue) { this.oldValue = oldValue; }

    public String getNewValue() { return newValue; }
    public void setNewValue(String newValue) { this.newValue = newValue; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    public UUID getCorrelationId() { return correlationId; }
    public void setCorrelationId(UUID correlationId) { this.correlationId = correlationId; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
