package com.anhsensei.curriculum.controller.admin;

import com.anhsensei.curriculum.dto.KanjiTopicDetailDto;
import com.anhsensei.curriculum.dto.KanjiTopicDto;
import com.anhsensei.curriculum.dto.RadicalDto;
import com.anhsensei.curriculum.service.KanjiTopicService;
import com.anhsensei.curriculum.service.RadicalService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminKanjiTopicController {

    private final KanjiTopicService kanjiTopicService;
    private final RadicalService radicalService;

    public AdminKanjiTopicController(KanjiTopicService kanjiTopicService, RadicalService radicalService) {
        this.kanjiTopicService = kanjiTopicService;
        this.radicalService = radicalService;
    }

    @GetMapping("/radicals")
    public ResponseEntity<List<RadicalDto>> getAllRadicals() {
        return ResponseEntity.ok(radicalService.getAllRadicals());
    }

    @GetMapping("/kanji-topics")
    public ResponseEntity<List<KanjiTopicDto>> getTopicsByLevel(
            @RequestParam(name = "level", defaultValue = "N5") String level
    ) {
        return ResponseEntity.ok(kanjiTopicService.getTopicsByLevel(level));
    }

    @GetMapping("/kanji-topics/{topicId}")
    public ResponseEntity<KanjiTopicDetailDto> getTopicDetail(@PathVariable("topicId") Long topicId) {
        return ResponseEntity.ok(kanjiTopicService.getTopicDetail(topicId));
    }

    @PostMapping("/kanji-topics/{topicId}/auto-populate")
    public ResponseEntity<KanjiTopicDetailDto> autoPopulateTopicItems(@PathVariable("topicId") Long topicId) {
        kanjiTopicService.getTopicDetail(topicId); // Triggers fail-safe auto-population
        return ResponseEntity.ok(kanjiTopicService.getTopicDetail(topicId));
    }
}
