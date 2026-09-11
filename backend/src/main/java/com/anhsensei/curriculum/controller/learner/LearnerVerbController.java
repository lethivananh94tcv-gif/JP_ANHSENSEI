package com.anhsensei.curriculum.controller.learner;

import com.anhsensei.curriculum.domain.ConjugationForm;
import com.anhsensei.curriculum.domain.VerbGroup;
import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.service.VerbConjugationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/verbs", "/api/v1/verbs"})
public class LearnerVerbController {

    private final VerbConjugationService verbConjugationService;

    public LearnerVerbController(VerbConjugationService verbConjugationService) {
        this.verbConjugationService = verbConjugationService;
    }

    @GetMapping("/practice-set")
    public ResponseEntity<List<VerbPracticeQuestionDto>> getPracticeSet(
            @RequestParam(value = "jlptLevel", required = false) String jlptLevel,
            @RequestParam(value = "groups", required = false) List<VerbGroup> groups,
            @RequestParam(value = "forms", required = false) List<ConjugationForm> forms,
            @RequestParam(value = "limit", required = false, defaultValue = "20") int limit
    ) {
        List<VerbPracticeQuestionDto> questions = verbConjugationService.getPracticeSet(jlptLevel, groups, forms, limit);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/verify")
    public ResponseEntity<VerbVerifyResponse> verifyAnswer(@Valid @RequestBody VerbVerifyRequest request) {
        VerbVerifyResponse response = verbConjugationService.verifyAnswer(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/rules")
    public ResponseEntity<Map<String, Object>> getRules() {
        Map<String, Object> rules = verbConjugationService.getRules();
        return ResponseEntity.ok(rules);
    }
}
