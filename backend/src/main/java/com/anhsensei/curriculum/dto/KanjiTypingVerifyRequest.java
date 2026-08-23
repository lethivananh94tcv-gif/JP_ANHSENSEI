package com.anhsensei.curriculum.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class KanjiTypingVerifyRequest {

    @NotNull(message = "kanjiId là bắt buộc")
    private Long kanjiId;

    @NotBlank(message = "inputRomaji không được để trống")
    private String inputRomaji;

    public KanjiTypingVerifyRequest() {}

    public Long getKanjiId() { return kanjiId; }
    public void setKanjiId(Long kanjiId) { this.kanjiId = kanjiId; }

    public String getInputRomaji() { return inputRomaji; }
    public void setInputRomaji(String inputRomaji) { this.inputRomaji = inputRomaji; }
}
