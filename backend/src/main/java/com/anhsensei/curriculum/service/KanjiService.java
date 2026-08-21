package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.Kanji;
import com.anhsensei.curriculum.domain.Lesson;
import com.anhsensei.curriculum.domain.LessonKanji;
import com.anhsensei.curriculum.domain.LessonKanjiId;
import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.repository.KanjiRepository;
import com.anhsensei.curriculum.repository.LessonKanjiRepository;
import com.anhsensei.curriculum.repository.LessonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class KanjiService {

    private final KanjiRepository kanjiRepository;
    private final LessonRepository lessonRepository;
    private final LessonKanjiRepository lessonKanjiRepository;

    public KanjiService(KanjiRepository kanjiRepository, LessonRepository lessonRepository, LessonKanjiRepository lessonKanjiRepository) {
        this.kanjiRepository = kanjiRepository;
        this.lessonRepository = lessonRepository;
        this.lessonKanjiRepository = lessonKanjiRepository;
    }

    @Transactional
    public KanjiDto createKanji(CreateKanjiRequest request, Long adminId) {
        String character = request.getCharacter().trim();
        if (kanjiRepository.existsByCharacter(character)) {
            throw new IllegalStateException("Ký tự Hán tự (character) '" + character + "' đã tồn tại trong hệ thống");
        }

        Kanji kanji = new Kanji();
        kanji.setCharacter(character);
        kanji.setOnyomi(request.getOnyomi() != null ? request.getOnyomi().trim() : null);
        kanji.setKunyomi(request.getKunyomi() != null ? request.getKunyomi().trim() : null);
        kanji.setMeaningVi(request.getMeaningVi().trim());
        kanji.setStrokeCount(request.getStrokeCount());
        kanji.setRadical(request.getRadical() != null ? request.getRadical().trim() : null);
        kanji.setImageUrl(request.getImageUrl() != null ? request.getImageUrl().trim() : null);
        kanji.setJlptLevel(request.getJlptLevel() != null ? request.getJlptLevel().trim().toUpperCase() : null);
        kanji.setStatus("DRAFT");
        kanji.setCreatedBy(adminId);
        kanji.setUpdatedBy(adminId);

        Kanji saved = kanjiRepository.save(kanji);
        return new KanjiDto(saved);
    }

    @Transactional
    public KanjiDto updateKanji(Long kanjiId, UpdateKanjiRequest request, Long adminId) {
        Kanji kanji = kanjiRepository.findById(kanjiId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Hán tự (Kanji) có ID: " + kanjiId));

        if ("ARCHIVED".equalsIgnoreCase(kanji.getStatus())) {
            throw new IllegalStateException("Không thể chỉnh sửa Hán tự đã ở trạng thái ARCHIVED");
        }

        // Optimistic locking check
        if (request.getVersion() != null && !request.getVersion().equals(kanji.getVersion())) {
            throw new IllegalStateException("Dữ liệu Hán tự đã bị chỉnh sửa bởi một phiên giao dịch khác. Vui lòng tải lại trang.");
        }

        String character = request.getCharacter().trim();
        if (!character.equals(kanji.getCharacter()) && kanjiRepository.existsByCharacter(character)) {
            throw new IllegalStateException("Ký tự Hán tự (character) '" + character + "' đã tồn tại trong hệ thống");
        }

        kanji.setCharacter(character);
        kanji.setOnyomi(request.getOnyomi() != null ? request.getOnyomi().trim() : null);
        kanji.setKunyomi(request.getKunyomi() != null ? request.getKunyomi().trim() : null);
        kanji.setMeaningVi(request.getMeaningVi().trim());
        kanji.setStrokeCount(request.getStrokeCount());
        kanji.setRadical(request.getRadical() != null ? request.getRadical().trim() : null);
        kanji.setImageUrl(request.getImageUrl() != null ? request.getImageUrl().trim() : null);
        kanji.setJlptLevel(request.getJlptLevel() != null ? request.getJlptLevel().trim().toUpperCase() : null);
        kanji.setUpdatedBy(adminId);

        Kanji saved = kanjiRepository.save(kanji);
        return new KanjiDto(saved);
    }

    @Transactional(readOnly = true)
    public KanjiDto getKanjiById(Long kanjiId) {
        Kanji kanji = kanjiRepository.findById(kanjiId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Hán tự (Kanji) có ID: " + kanjiId));
        return new KanjiDto(kanji);
    }

    @Transactional(readOnly = true)
    public List<KanjiDto> getAllKanji() {
        return kanjiRepository.findAll().stream().map(KanjiDto::new).collect(Collectors.toList());
    }

    @Transactional
    public LessonKanjiDto addKanjiToLesson(Long lessonId, LessonKanjiRequest request) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Bài học (Lesson) có ID: " + lessonId));
        Kanji kanji = kanjiRepository.findById(request.getKanjiId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Hán tự (Kanji) có ID: " + request.getKanjiId()));

        LessonKanji lessonKanji = new LessonKanji(
                lesson,
                kanji,
                request.getSortOrder(),
                request.getNotes() != null ? request.getNotes().trim() : null,
                request.getIsRequired() != null ? request.getIsRequired() : true
        );

        LessonKanji saved = lessonKanjiRepository.save(lessonKanji);
        return new LessonKanjiDto(saved);
    }

    @Transactional(readOnly = true)
    public List<LessonKanjiDto> getKanjiByLesson(Long lessonId) {
        return lessonKanjiRepository.findByLesson_LessonIdOrderBySortOrderAsc(lessonId).stream()
                .map(LessonKanjiDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void removeKanjiFromLesson(Long lessonId, Long kanjiId) {
        LessonKanjiId id = new LessonKanjiId(lessonId, kanjiId);
        if (lessonKanjiRepository.existsById(id)) {
            lessonKanjiRepository.deleteById(id);
        }
    }

    @Transactional
    public KanjiDto archiveKanji(Long kanjiId, Long adminId) {
        Kanji kanji = kanjiRepository.findById(kanjiId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Hán tự (Kanji) có ID: " + kanjiId));

        kanji.setStatus("ARCHIVED");
        kanji.setDeletedAt(OffsetDateTime.now());
        kanji.setUpdatedBy(adminId);

        Kanji saved = kanjiRepository.save(kanji);
        return new KanjiDto(saved);
    }
}
