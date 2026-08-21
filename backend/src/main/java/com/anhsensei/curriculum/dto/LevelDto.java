package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.Level;
import java.time.OffsetDateTime;

public class LevelDto {
    private Long levelId;
    private String code;
    private String name;
    private String description;
    private Integer sortOrder;
    private String status;
    private Long version;
    private OffsetDateTime publishedAt;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public LevelDto() {}

    public LevelDto(Level level) {
        this.levelId = level.getLevelId();
        this.code = level.getCode();
        this.name = level.getName();
        this.description = level.getDescription();
        this.sortOrder = level.getSortOrder();
        this.status = level.getStatus();
        this.version = level.getVersion();
        this.publishedAt = level.getPublishedAt();
        this.createdAt = level.getCreatedAt();
        this.updatedAt = level.getUpdatedAt();
    }

    public Long getLevelId() { return levelId; }
    public void setLevelId(Long levelId) { this.levelId = levelId; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }

    public OffsetDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(OffsetDateTime publishedAt) { this.publishedAt = publishedAt; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
