package com.anhsensei.curriculum.service;

import com.anhsensei.common.exception.ResourceNotFoundException;
import com.anhsensei.curriculum.domain.Kanji;
import com.anhsensei.curriculum.domain.KanjiExercise;
import com.anhsensei.curriculum.domain.KanjiTopic;
import com.anhsensei.curriculum.domain.KanjiTopicItem;
import com.anhsensei.curriculum.domain.KanjiTopicItemId;
import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.repository.KanjiExerciseRepository;
import com.anhsensei.curriculum.repository.KanjiRepository;
import com.anhsensei.curriculum.repository.KanjiTopicItemRepository;
import com.anhsensei.curriculum.repository.KanjiTopicRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class KanjiTopicService {

    private final KanjiTopicRepository kanjiTopicRepository;
    private final KanjiTopicItemRepository kanjiTopicItemRepository;
    private final KanjiExerciseRepository kanjiExerciseRepository;
    private final KanjiRepository kanjiRepository;

    public KanjiTopicService(
            KanjiTopicRepository kanjiTopicRepository,
            KanjiTopicItemRepository kanjiTopicItemRepository,
            KanjiExerciseRepository kanjiExerciseRepository,
            KanjiRepository kanjiRepository
    ) {
        this.kanjiTopicRepository = kanjiTopicRepository;
        this.kanjiTopicItemRepository = kanjiTopicItemRepository;
        this.kanjiExerciseRepository = kanjiExerciseRepository;
        this.kanjiRepository = kanjiRepository;
    }

    public List<KanjiTopicDto> getTopicsByLevel(String jlptLevel) {
        return kanjiTopicRepository.findByJlptLevelOrderByTopicOrderAsc(jlptLevel)
                .stream()
                .map(KanjiTopicDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public KanjiTopicDetailDto getTopicDetail(Long topicId) {
        KanjiTopic topic = kanjiTopicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("KanjiTopic", "id", topicId));

        List<KanjiTopicItem> rawItems = kanjiTopicItemRepository.findByTopicIdWithKanji(topicId);

        // Fail-safe / Self-healing: If topic items are missing, auto-populate from topic description list!
        if (rawItems.isEmpty()) {
            rawItems = autoPopulateItemsFromDescription(topic);
        }

        List<KanjiTopicItemDto> items = rawItems.stream()
                .map(KanjiTopicItemDto::new)
                .collect(Collectors.toList());

        List<KanjiExercise> exercises = kanjiExerciseRepository.findByTopic_TopicIdOrderByDisplayOrderAsc(topicId);

        List<KanjiExerciseDto> readingExercises = exercises.stream()
                .filter(e -> "READING_SENTENCE".equalsIgnoreCase(e.getExerciseType()))
                .map(KanjiExerciseDto::new)
                .collect(Collectors.toList());

        List<KanjiExerciseDto> quizTests = exercises.stream()
                .filter(e -> "QUIZ_TEST".equalsIgnoreCase(e.getExerciseType()))
                .map(KanjiExerciseDto::new)
                .collect(Collectors.toList());

        return new KanjiTopicDetailDto(new KanjiTopicDto(topic), items, readingExercises, quizTests);
    }

    @Transactional
    public List<KanjiTopicItem> autoPopulateItemsFromDescription(KanjiTopic topic) {
        List<KanjiTopicItem> createdItems = new ArrayList<>();
        if (topic == null || topic.getDescription() == null) return createdItems;

        // Match characters inside parentheses e.g. (意, 億, 憶, 皮...)
        Pattern pattern = Pattern.compile("\\(([^)]+)\\)");
        Matcher matcher = pattern.matcher(topic.getDescription());
        if (matcher.find()) {
            String charListStr = matcher.group(1);
            String[] characters = charListStr.split("[,\\s]+");

            int order = 1;
            for (String chStr : characters) {
                String ch = chStr.trim();
                if (ch.isEmpty()) continue;

                Optional<Kanji> kanjiOpt = kanjiRepository.findByCharacter(ch);
                if (kanjiOpt.isPresent()) {
                    Kanji kanji = kanjiOpt.get();
                    KanjiTopicItemId itemId = new KanjiTopicItemId(topic.getTopicId(), kanji.getKanjiId());

                    if (!kanjiTopicItemRepository.existsById(itemId)) {
                        KanjiTopicItem item = new KanjiTopicItem();
                        item.setTopic(topic);
                        item.setKanji(kanji);
                        item.setDisplayOrder(order++);
                        item.setKunExamples(kanji.getKunyomi());
                        item.setOnExamples(kanji.getOnyomi());
                        item.setAcceptedRomaji(kanji.getMeaningVi() != null ? kanji.getMeaningVi().toLowerCase() : "kanji");

                        kanjiTopicItemRepository.save(item);
                        createdItems.add(item);
                    }
                }
            }
        }
        return createdItems;
    }

    public KanjiTypingVerifyResponse verifyTyping(Long topicId, Long kanjiId, String inputRomaji) {
        KanjiTopicItemId id = new KanjiTopicItemId(topicId, kanjiId);
        KanjiTopicItem item = kanjiTopicItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("KanjiTopicItem", "id", topicId + "-" + kanjiId));

        if (inputRomaji == null || inputRomaji.trim().isEmpty()) {
            return new KanjiTypingVerifyResponse(false, "", null, "Vui lòng nhập từ Romaji");
        }

        String cleanedInput = inputRomaji.trim().toLowerCase();
        String accepted = item.getAcceptedRomaji();

        if (accepted == null || accepted.trim().isEmpty()) {
            return new KanjiTypingVerifyResponse(true, cleanedInput, cleanedInput, "Chính xác!");
        }

        List<String> acceptedList = Arrays.stream(accepted.split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .collect(Collectors.toList());

        boolean isMatch = acceptedList.contains(cleanedInput);
        if (isMatch) {
            return new KanjiTypingVerifyResponse(true, cleanedInput, cleanedInput, "Chính xác!");
        } else {
            return new KanjiTypingVerifyResponse(false, cleanedInput, null, "Chưa chính xác, thử lại nhé!");
        }
    }
}
