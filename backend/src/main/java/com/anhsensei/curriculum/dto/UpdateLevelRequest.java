package com.anhsensei.curriculum.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UpdateLevelRequest {

    @NotBlank(message = "Tên trình độ (name) không được để trống")
    private String name;

    private String description;

    @NotNull(message = "Thứ tự sắp xếp (sortOrder) không được để trống")
    @Min(value = 1, message = "Thứ tự sắp xếp phải là số nguyên dương >= 1")
    private Integer sortOrder;

    @NotNull(message = "Trường version để kiểm tra Optimistic Locking không được để trống")
    private Long version;

    public UpdateLevelRequest() {}

    public UpdateLevelRequest(String name, String description, Integer sortOrder, Long version) {
        this.name = name;
        this.description = description;
        this.sortOrder = sortOrder;
        this.version = version;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }
}
