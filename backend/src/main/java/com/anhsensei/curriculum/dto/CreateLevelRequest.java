package com.anhsensei.curriculum.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class CreateLevelRequest {

    @NotBlank(message = "Mã trình độ (code) không được để trống")
    @Pattern(regexp = "^(N5|N4|N3|N2|N1)$", message = "Mã trình độ phải thuộc N5, N4, N3, N2, N1")
    private String code;

    @NotBlank(message = "Tên trình độ (name) không được để trống")
    private String name;

    private String description;

    @NotNull(message = "Thứ tự sắp xếp (sortOrder) không được để trống")
    @Min(value = 1, message = "Thứ tự sắp xếp phải là số nguyên dương >= 1")
    private Integer sortOrder;

    public CreateLevelRequest() {}

    public CreateLevelRequest(String code, String name, String description, Integer sortOrder) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.sortOrder = sortOrder;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
