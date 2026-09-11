package com.anhsensei.learning.controller;

import com.anhsensei.common.response.ApiResponse;
import com.anhsensei.learning.service.GrammarPracticeService;
import com.anhsensei.learning.service.GrammarPracticeService.PracticeQuestionDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/learner/grammar")
public class LearnerGrammarPracticeController {

    private final GrammarPracticeService grammarPracticeService;

    public LearnerGrammarPracticeController(GrammarPracticeService grammarPracticeService) {
        this.grammarPracticeService = grammarPracticeService;
    }

    @GetMapping("/lessons/{lessonId}/practice-session")
    public ResponseEntity<ApiResponse<List<PracticeQuestionDto>>> getPracticeSession(
            @PathVariable Long lessonId,
            @RequestParam(defaultValue = "10") int limit) {
        
        List<PracticeQuestionDto> questions = grammarPracticeService.generatePracticeSession(lessonId, limit);
        return ResponseEntity.ok(ApiResponse.success("Tải phiên luyện tập 10 câu hỏi ngữ pháp thành công", questions));
    }
}
