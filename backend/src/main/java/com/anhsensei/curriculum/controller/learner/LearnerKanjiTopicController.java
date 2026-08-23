package com.anhsensei.curriculum.controller.learner;

import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.service.KanjiTopicService;
import com.anhsensei.curriculum.service.RadicalService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class LearnerKanjiTopicController {

    private final KanjiTopicService kanjiTopicService;
    private final RadicalService radicalService;

    public LearnerKanjiTopicController(KanjiTopicService kanjiTopicService, RadicalService radicalService) {
        this.kanjiTopicService = kanjiTopicService;
        this.radicalService = radicalService;
    }

    @GetMapping("/curriculum/radicals")
    public ResponseEntity<List<RadicalDto>> getAllRadicals() {
        return ResponseEntity.ok(radicalService.getAllRadicals());
    }

    @GetMapping("/curriculum/kanji-topics")
    public ResponseEntity<List<KanjiTopicDto>> getTopicsByLevel(
            @RequestParam(name = "level", defaultValue = "N5") String level
    ) {
        return ResponseEntity.ok(kanjiTopicService.getTopicsByLevel(level));
    }

    @GetMapping("/curriculum/kanji-topics/{topicId}")
    public ResponseEntity<KanjiTopicDetailDto> getTopicDetail(@PathVariable("topicId") Long topicId) {
        return ResponseEntity.ok(kanjiTopicService.getTopicDetail(topicId));
    }

    @PostMapping("/learning/kanji/topics/{topicId}/verify")
    public ResponseEntity<KanjiTypingVerifyResponse> verifyTyping(
            @PathVariable("topicId") Long topicId,
            @Valid @RequestBody KanjiTypingVerifyRequest request
    ) {
        KanjiTypingVerifyResponse response = kanjiTopicService.verifyTyping(topicId, request.getKanjiId(), request.getInputRomaji());
        return ResponseEntity.ok(response);
    }
}
