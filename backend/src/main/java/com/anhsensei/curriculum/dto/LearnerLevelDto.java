package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.Level;

public class LearnerLevelDto {

    private Long levelId;
    private String code;
    private String name;
    private String description;
    private Integer sortOrder;
    private String status;

    public LearnerLevelDto() {}

    public LearnerLevelDto(Long levelId, String code, String name, String description, Integer sortOrder, String status) {
        this.levelId = levelId;
        this.code = code;
        this.name = name;
        this.description = description;
        this.sortOrder = sortOrder;
        this.status = status;
    }

    public static LearnerLevelDto fromLevel(Level level) {
        if (level == null) return null;
        return new LearnerLevelDto(
                level.getLevelId(),
                level.getCode(),
                level.getName(),
                level.getDescription(),
                level.getSortOrder(),
                level.getStatus()
        );
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
}
