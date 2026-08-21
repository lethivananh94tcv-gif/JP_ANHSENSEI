package com.anhsensei.curriculum.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.ArrayList;
import java.util.List;

public class CreateGrammarRequest {

    @NotBlank(message = "Mẫu ngữ pháp (pattern) không được để trống")
    private String pattern;

    @NotBlank(message = "Ý nghĩa (meaning) không được để trống")
    private String meaning;

    @NotBlank(message = "Giải thích (explanation) không được để trống")
    private String explanation;

    private String structure;

    @NotBlank(message = "Trình độ JLPT (jlptLevel) không được để trống")
    @Pattern(regexp = "^(N5|N4|N3|N2|N1)$", message = "Trình độ JLPT phải thuộc N5, N4, N3, N2, N1")
    private String jlptLevel;

    @NotNull(message = "Thứ tự sắp xếp (sortOrder) không được để trống")
    @Min(value = 1, message = "Thứ tự sắp xếp phải >= 1")
    private Integer sortOrder = 1;

    private Boolean isRequired = true;

    private List<CreateGrammarExampleRequest> examples = new ArrayList<>();

    public CreateGrammarRequest() {}

    public String getPattern() { return pattern; }
    public void setPattern(String pattern) { this.pattern = pattern; }

    public String getMeaning() { return meaning; }
    public void setMeaning(String meaning) { this.meaning = meaning; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getStructure() { return structure; }
    public void setStructure(String structure) { this.structure = structure; }

    public String getJlptLevel() { return jlptLevel; }
    public void setJlptLevel(String jlptLevel) { this.jlptLevel = jlptLevel; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public Boolean getIsRequired() { return isRequired; }
    public void setIsRequired(Boolean isRequired) { this.isRequired = isRequired; }

    public List<CreateGrammarExampleRequest> getExamples() { return examples; }
    public void setExamples(List<CreateGrammarExampleRequest> examples) { this.examples = examples; }
}
