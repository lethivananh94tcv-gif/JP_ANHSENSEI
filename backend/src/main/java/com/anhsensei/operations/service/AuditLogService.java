package com.anhsensei.operations.service;

import com.anhsensei.common.util.CorrelationIdFilter;
import com.anhsensei.operations.domain.AuditLog;
import com.anhsensei.operations.repository.AuditLogRepository;
import org.slf4j.MDC;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional
    public void logAction(Long actorUserId, String action, String entityType, String entityId, String oldValue, String newValue, String ipAddress) {
        String correlationIdStr = MDC.get(CorrelationIdFilter.CORRELATION_ID_KEY);
        UUID correlationId;
        try {
            correlationId = correlationIdStr != null ? UUID.fromString(correlationIdStr) : UUID.randomUUID();
        } catch (IllegalArgumentException e) {
            correlationId = UUID.randomUUID();
        }

        AuditLog auditLog = new AuditLog();
        auditLog.setActorUserId(actorUserId);
        auditLog.setAction(action);
        auditLog.setEntityType(entityType);
        auditLog.setEntityId(entityId);
        auditLog.setOldValue(toJson(oldValue));
        auditLog.setNewValue(toJson(newValue));
        auditLog.setIpAddress(ipAddress);
        auditLog.setCorrelationId(correlationId);

        auditLogRepository.save(auditLog);
    }

    private static final com.fasterxml.jackson.databind.ObjectMapper MAPPER = new com.fasterxml.jackson.databind.ObjectMapper();

    private String toJson(String val) {
        if (val == null) return null;
        String trimmed = val.trim();
        if ((trimmed.startsWith("{") && trimmed.endsWith("}")) || (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
            return trimmed;
        }
        try {
            return MAPPER.writeValueAsString(val);
        } catch (Exception e) {
            return "{\"value\":\"" + val + "\"}";
        }
    }
}
