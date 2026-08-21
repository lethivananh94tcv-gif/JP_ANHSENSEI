package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.GrammarExample;
import com.anhsensei.curriculum.domain.GrammarPoint;
import com.anhsensei.curriculum.domain.Lesson;
import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.repository.GrammarExampleRepository;
import com.anhsensei.curriculum.repository.GrammarPointRepository;
import com.anhsensei.curriculum.repository.LessonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GrammarService {

    private final GrammarPointRepository grammarPointRepository;
    private final GrammarExampleRepository grammarExampleRepository;
    private final LessonRepository lessonRepository;

    public GrammarService(GrammarPointRepository grammarPointRepository, GrammarExampleRepository grammarExampleRepository, LessonRepository lessonRepository) {
        this.grammarPointRepository = grammarPointRepository;
        this.grammarExampleRepository = grammarExampleRepository;
        this.lessonRepository = lessonRepository;
    }

    @Transactional
    public GrammarPointDto createGrammar(Long lessonId, CreateGrammarRequest request, Long adminId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Bài học (Lesson) có ID: " + lessonId));

        if ("ARCHIVED".equalsIgnoreCase(lesson.getStatus())) {
            throw new IllegalStateException("Không thể thêm Ngữ pháp vào Lesson đã ở trạng thái ARCHIVED");
        }

        GrammarPoint grammar = new GrammarPoint();
        grammar.setLesson(lesson);
        grammar.setPattern(request.getPattern().trim());
        grammar.setMeaning(request.getMeaning().trim());
        grammar.setExplanation(request.getExplanation().trim());
        grammar.setStructure(request.getStructure() != null ? request.getStructure().trim() : null);
        grammar.setJlptLevel(request.getJlptLevel().trim().toUpperCase());
        grammar.setSortOrder(request.getSortOrder());
        grammar.setIsRequired(request.getIsRequired() != null ? request.getIsRequired() : true);
        grammar.setStatus("DRAFT");
        grammar.setCreatedBy(adminId);
        grammar.setUpdatedBy(adminId);

        GrammarPoint savedGrammar = grammarPointRepository.save(grammar);

        // Process initial examples if provided
        if (request.getExamples() != null && !request.getExamples().isEmpty()) {
            for (CreateGrammarExampleRequest exReq : request.getExamples()) {
                GrammarExample example = new GrammarExample();
                example.setContentType("GRAMMAR");
                example.setGrammarId(savedGrammar.getGrammarId());
                example.setJapaneseText(exReq.getJapaneseText().trim());
                example.setReading(exReq.getReading() != null ? exReq.getReading().trim() : null);
                example.setMeaningVi(exReq.getMeaningVi().trim());
                example.setNotes(exReq.getNotes() != null ? exReq.getNotes().trim() : null);
                example.setSortOrder(exReq.getSortOrder());
                grammarExampleRepository.save(example);
            }
        }

        return getGrammarById(savedGrammar.getGrammarId());
    }

    @Transactional
    public GrammarPointDto updateGrammar(Long grammarId, UpdateGrammarRequest request, Long adminId) {
        GrammarPoint grammar = grammarPointRepository.findById(grammarId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Ngữ pháp (GrammarPoint) có ID: " + grammarId));

        if ("ARCHIVED".equalsIgnoreCase(grammar.getStatus())) {
            throw new IllegalStateException("Không thể chỉnh sửa Ngữ pháp đã ở trạng thái ARCHIVED");
        }

        // Optimistic locking check
        if (request.getVersion() != null && !request.getVersion().equals(grammar.getVersion())) {
            throw new IllegalStateException("Dữ liệu Ngữ pháp đã bị chỉnh sửa bởi một phiên giao dịch khác. Vui lòng tải lại trang.");
        }

        grammar.setPattern(request.getPattern().trim());
        grammar.setMeaning(request.getMeaning().trim());
        grammar.setExplanation(request.getExplanation().trim());
        grammar.setStructure(request.getStructure() != null ? request.getStructure().trim() : null);
        grammar.setJlptLevel(request.getJlptLevel().trim().toUpperCase());
        grammar.setSortOrder(request.getSortOrder());
        if (request.getIsRequired() != null) {
            grammar.setIsRequired(request.getIsRequired());
        }
        grammar.setUpdatedBy(adminId);

        grammarPointRepository.save(grammar);
        return getGrammarById(grammarId);
    }

    @Transactional(readOnly = true)
    public GrammarPointDto getGrammarById(Long grammarId) {
        GrammarPoint grammar = grammarPointRepository.findById(grammarId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Ngữ pháp (GrammarPoint) có ID: " + grammarId));
        List<GrammarExampleDto> examples = grammarExampleRepository.findByGrammarIdOrderBySortOrderAsc(grammarId).stream()
                .map(GrammarExampleDto::new)
                .collect(Collectors.toList());
        return new GrammarPointDto(grammar, examples);
    }

    @Transactional(readOnly = true)
    public List<GrammarPointDto> getGrammarByLesson(Long lessonId) {
        return grammarPointRepository.findByLesson_LessonIdOrderBySortOrderAsc(lessonId).stream()
                .map(grammar -> {
                    List<GrammarExampleDto> examples = grammarExampleRepository.findByGrammarIdOrderBySortOrderAsc(grammar.getGrammarId()).stream()
                            .map(GrammarExampleDto::new)
                            .collect(Collectors.toList());
                    return new GrammarPointDto(grammar, examples);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public GrammarPointDto archiveGrammar(Long grammarId, Long adminId) {
        GrammarPoint grammar = grammarPointRepository.findById(grammarId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Ngữ pháp (GrammarPoint) có ID: " + grammarId));

        grammar.setStatus("ARCHIVED");
        grammar.setDeletedAt(OffsetDateTime.now());
        grammar.setUpdatedBy(adminId);

        grammarPointRepository.save(grammar);
        return getGrammarById(grammarId);
    }

    @Transactional
    public GrammarExampleDto addExampleToGrammar(Long grammarId, CreateGrammarExampleRequest request) {
        if (!grammarPointRepository.existsById(grammarId)) {
            throw new IllegalArgumentException("Không tìm thấy Ngữ pháp (GrammarPoint) có ID: " + grammarId);
        }

        GrammarExample example = new GrammarExample();
        example.setContentType("GRAMMAR");
        example.setGrammarId(grammarId);
        example.setJapaneseText(request.getJapaneseText().trim());
        example.setReading(request.getReading() != null ? request.getReading().trim() : null);
        example.setMeaningVi(request.getMeaningVi().trim());
        example.setNotes(request.getNotes() != null ? request.getNotes().trim() : null);
        example.setSortOrder(request.getSortOrder());

        GrammarExample saved = grammarExampleRepository.save(example);
        return new GrammarExampleDto(saved);
    }

    @Transactional
    public void deleteExample(Long exampleId) {
        if (grammarExampleRepository.existsById(exampleId)) {
            grammarExampleRepository.deleteById(exampleId);
        }
    }
}
