package com.anhsensei.learning.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class SubmitAnswerRequest {

    @NotNull(message = "globalIndex không được null")
    private Integer globalIndex;

    @NotNull(message = "selectedOption không được null")
    @Min(value = 1, message = "Đáp án phải nằm trong khoảng 1 đến 4")
    @Max(value = 4, message = "Đáp án phải nằm trong khoảng 1 đến 4")
    private Integer selectedOption;

    public SubmitAnswerRequest() {}

    public SubmitAnswerRequest(Integer globalIndex, Integer selectedOption) {
        this.globalIndex = globalIndex;
        this.selectedOption = selectedOption;
    }

    public Integer getGlobalIndex() { return globalIndex; }
    public void setGlobalIndex(Integer globalIndex) { this.globalIndex = globalIndex; }

    public Integer getSelectedOption() { return selectedOption; }
    public void setSelectedOption(Integer selectedOption) { this.selectedOption = selectedOption; }
}
