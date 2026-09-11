package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.ConjugationForm;
import com.anhsensei.curriculum.domain.VerbGroup;
import com.anhsensei.curriculum.domain.Vocabulary;
import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.repository.VocabularyRepository;
import com.anhsensei.curriculum.util.ConjugationRuleEngine;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class VerbConjugationService {

    private final VocabularyRepository vocabularyRepository;

    public VerbConjugationService(VocabularyRepository vocabularyRepository) {
        this.vocabularyRepository = vocabularyRepository;
    }

    public List<VerbPracticeQuestionDto> getPracticeSet(String jlptLevel, List<VerbGroup> groups, List<ConjugationForm> forms, int limit) {
        List<Vocabulary> allVocabs = vocabularyRepository.findAll();

        // Filter verbs only
        List<Vocabulary> verbsOnly = allVocabs.stream()
                .filter(v -> (v.getPartOfSpeech() != null && v.getPartOfSpeech().toLowerCase().contains("動詞")) || v.getVerbType() != null)
                .collect(Collectors.toList());

        // Filter by JLPT level if provided
        if (jlptLevel != null && !jlptLevel.isBlank() && !"ALL".equalsIgnoreCase(jlptLevel)) {
            verbsOnly = verbsOnly.stream()
                    .filter(v -> v.getLesson() != null && v.getLesson().getLevel() != null && jlptLevel.equalsIgnoreCase(v.getLesson().getLevel().getCode()))
                    .collect(Collectors.toList());
        }

        // Shuffle & limit
        Collections.shuffle(verbsOnly);
        int maxItems = Math.min(limit > 0 ? limit : 20, verbsOnly.size());
        List<Vocabulary> selectedVerbs = verbsOnly.stream().limit(maxItems).collect(Collectors.toList());

        List<ConjugationForm> targetForms = (forms != null && !forms.isEmpty()) ? forms : Arrays.asList(ConjugationForm.TE, ConjugationForm.NAI, ConjugationForm.TA, ConjugationForm.DICT);

        Random random = new Random();
        List<VerbPracticeQuestionDto> questions = new ArrayList<>();

        for (Vocabulary v : selectedVerbs) {
            VerbGroup group = ConjugationRuleEngine.detectGroup(v.getWord(), v.getKanjiForm());
            if (groups != null && !groups.isEmpty() && !groups.contains(group)) {
                continue; // Skip if group filtered
            }

            String levelCode = (v.getLesson() != null && v.getLesson().getLevel() != null) ? v.getLesson().getLevel().getCode() : "N5";
            JapaneseVerbDto verbDto = new JapaneseVerbDto(
                    v.getVocabularyId(),
                    ConjugationRuleEngine.conjugate(v.getWord(), group, ConjugationForm.DICT),
                    v.getWord(),
                    v.getKana(),
                    v.getMeaningVi(),
                    group,
                    levelCode
            );
            verbDto.setVerbType(v.getVerbType());
            verbDto.setVerbTypeJa(v.getVerbTypeJa());
            verbDto.setVerbNote(v.getVerbNote());
            verbDto.setPairedVerbId(v.getPairedVerb() != null ? v.getPairedVerb().getVocabularyId() : null);

            ConjugationForm targetForm = targetForms.get(random.nextInt(targetForms.size()));
            String formName = getFormDisplayName(targetForm);
            String prompt = String.format("Chia động từ 「 %s 」 (%s) sang %s", v.getWord(), v.getMeaningVi(), formName);

            questions.add(new VerbPracticeQuestionDto(v.getVocabularyId(), verbDto, targetForm, formName, prompt));
        }

        return questions;
    }

    public VerbVerifyResponse verifyAnswer(VerbVerifyRequest request) {
        Vocabulary v = vocabularyRepository.findById(request.getVocabularyId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy động từ ID: " + request.getVocabularyId()));

        VerbGroup group = ConjugationRuleEngine.detectGroup(v.getWord(), v.getKanjiForm());
        
        // Conjugate for Kana (word/kana) and Kanji
        String expectedKana = ConjugationRuleEngine.conjugate(v.getKana(), group, request.getTargetForm());
        String expectedKanji = ConjugationRuleEngine.conjugate(v.getWord(), group, request.getTargetForm());

        String userAns = request.getUserAnswer() != null ? request.getUserAnswer().trim().toLowerCase() : "";

        boolean isCorrect = userAns.equalsIgnoreCase(expectedKana) || userAns.equalsIgnoreCase(expectedKanji);

        String explanation = buildExplanation(v.getWord(), group, request.getTargetForm(), expectedKana);

        return new VerbVerifyResponse(isCorrect, userAns, expectedKana, expectedKanji, explanation);
    }

    public Map<String, Object> getRules() {
        Map<String, Object> rules = new HashMap<>();
        rules.put("forms", Arrays.stream(ConjugationForm.values()).map(f -> Map.of(
                "form", f.name(),
                "name", getFormDisplayName(f)
        )).collect(Collectors.toList()));

        rules.put("groups", Map.of(
                "GROUP_1", "Nhóm I (Godan 五段)",
                "GROUP_2", "Nhóm II (Ichidan 一段)",
                "GROUP_3", "Nhóm III (Bất quy tắc 不規則)"
        ));

        return rules;
    }

    private String getFormDisplayName(ConjugationForm form) {
        switch (form) {
            case MASU: return "Thể Masu (ます形)";
            case DICT: return "Thể Từ điển (辞書形)";
            case TE: return "Thể Te (て形)";
            case NAI: return "Thể Phủ định (ない形)";
            case TA: return "Thể Quá khứ (た形)";
            case POTENTIAL: return "Thể Khả năng (可能形)";
            case VOLITIONAL: return "Thể Ý định (意向形)";
            case IMPERATIVE: return "Thể Mệnh lệnh (命令形)";
            case CONDITIONAL_BA: return "Thể Điều kiện (仮定形 - ば)";
            case PASSIVE: return "Thể Bị động (受身形)";
            case CAUSATIVE: return "Thể Sai khiến (使役形)";
            default: return form.name();
        }
    }

    private String buildExplanation(String verbWord, VerbGroup group, ConjugationForm form, String expectedKana) {
        String groupName = group == VerbGroup.GROUP_1 ? "Nhóm 1 (Godan)" : (group == VerbGroup.GROUP_2 ? "Nhóm 2 (Ichidan)" : "Nhóm 3 (Bất quy tắc)");
        return String.format("Động từ 「 %s 」 thuộc %s. Đáp án đúng ở %s là: %s", verbWord, groupName, getFormDisplayName(form), expectedKana);
    }
}
