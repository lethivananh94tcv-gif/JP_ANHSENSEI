package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.Lesson;
import com.anhsensei.curriculum.domain.Vocabulary;
import com.anhsensei.curriculum.dto.CreateVocabularyRequest;
import com.anhsensei.curriculum.dto.UpdateVocabularyRequest;
import com.anhsensei.curriculum.dto.VocabularyDto;
import com.anhsensei.curriculum.repository.LessonRepository;
import com.anhsensei.curriculum.repository.VocabularyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VocabularyService {

    private final VocabularyRepository vocabularyRepository;
    private final LessonRepository lessonRepository;

    public VocabularyService(VocabularyRepository vocabularyRepository, LessonRepository lessonRepository) {
        this.vocabularyRepository = vocabularyRepository;
        this.lessonRepository = lessonRepository;
    }

    @Transactional
    public VocabularyDto createVocabulary(Long lessonId, CreateVocabularyRequest request, Long adminId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Bài học (Lesson) có ID: " + lessonId));

        if ("ARCHIVED".equalsIgnoreCase(lesson.getStatus())) {
            throw new IllegalStateException("Không thể thêm Từ vựng vào Lesson đã ở trạng thái ARCHIVED");
        }

        Vocabulary vocab = new Vocabulary();
        vocab.setLesson(lesson);
        vocab.setWord(request.getWord().trim());
        vocab.setKana(request.getKana().trim());
        vocab.setKanjiForm(request.getKanjiForm() != null ? request.getKanjiForm().trim() : null);
        vocab.setMeaningVi(request.getMeaningVi().trim());
        vocab.setPartOfSpeech(request.getPartOfSpeech() != null ? request.getPartOfSpeech().trim() : null);
        vocab.setAudioUrl(request.getAudioUrl() != null ? request.getAudioUrl().trim() : null);
        vocab.setNotes(request.getNotes() != null ? request.getNotes().trim() : null);
        vocab.setSortOrder(request.getSortOrder());
        vocab.setIsRequired(request.getIsRequired() != null ? request.getIsRequired() : true);
        vocab.setStatus("DRAFT");
        vocab.setCreatedBy(adminId);
        vocab.setUpdatedBy(adminId);

        Vocabulary saved = vocabularyRepository.save(vocab);
        return new VocabularyDto(saved);
    }

    @Transactional
    public VocabularyDto updateVocabulary(Long vocabularyId, UpdateVocabularyRequest request, Long adminId) {
        Vocabulary vocab = vocabularyRepository.findById(vocabularyId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Từ vựng (Vocabulary) có ID: " + vocabularyId));

        if ("ARCHIVED".equalsIgnoreCase(vocab.getStatus())) {
            throw new IllegalStateException("Không thể chỉnh sửa Từ vựng đã ở trạng thái ARCHIVED");
        }

        // Optimistic locking check
        if (request.getVersion() != null && !request.getVersion().equals(vocab.getVersion())) {
            throw new IllegalStateException("Dữ liệu Từ vựng đã bị chỉnh sửa bởi một phiên giao dịch khác. Vui lòng tải lại trang.");
        }

        vocab.setWord(request.getWord().trim());
        vocab.setKana(request.getKana().trim());
        vocab.setKanjiForm(request.getKanjiForm() != null ? request.getKanjiForm().trim() : null);
        vocab.setMeaningVi(request.getMeaningVi().trim());
        vocab.setPartOfSpeech(request.getPartOfSpeech() != null ? request.getPartOfSpeech().trim() : null);
        vocab.setAudioUrl(request.getAudioUrl() != null ? request.getAudioUrl().trim() : null);
        vocab.setNotes(request.getNotes() != null ? request.getNotes().trim() : null);
        vocab.setSortOrder(request.getSortOrder());
        if (request.getIsRequired() != null) {
            vocab.setIsRequired(request.getIsRequired());
        }
        vocab.setUpdatedBy(adminId);

        Vocabulary saved = vocabularyRepository.save(vocab);
        return new VocabularyDto(saved);
    }

    @Transactional(readOnly = true)
    public VocabularyDto getVocabularyById(Long vocabularyId) {
        Vocabulary vocab = vocabularyRepository.findById(vocabularyId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Từ vựng (Vocabulary) có ID: " + vocabularyId));
        return new VocabularyDto(vocab);
    }

    @Transactional(readOnly = true)
    public List<VocabularyDto> getVocabulariesByLesson(Long lessonId) {
        return vocabularyRepository.findByLesson_LessonIdOrderBySortOrderAsc(lessonId).stream()
                .map(VocabularyDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public VocabularyDto archiveVocabulary(Long vocabularyId, Long adminId) {
        Vocabulary vocab = vocabularyRepository.findById(vocabularyId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Từ vựng (Vocabulary) có ID: " + vocabularyId));

        vocab.setStatus("ARCHIVED");
        vocab.setDeletedAt(OffsetDateTime.now());
        vocab.setUpdatedBy(adminId);

        Vocabulary saved = vocabularyRepository.save(vocab);
        return new VocabularyDto(saved);
    }
}
