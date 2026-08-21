package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.dto.LessonDto;
import com.anhsensei.curriculum.dto.LevelDto;
import com.anhsensei.curriculum.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class LessonPublishService {

    private final LevelRepository levelRepository;
    private final LessonRepository lessonRepository;
    private final VocabularyRepository vocabularyRepository;
    private final LessonKanjiRepository lessonKanjiRepository;
    private final GrammarPointRepository grammarPointRepository;
    private final KanjiRepository kanjiRepository;

    public LessonPublishService(
            LevelRepository levelRepository,
            LessonRepository lessonRepository,
            VocabularyRepository vocabularyRepository,
            LessonKanjiRepository lessonKanjiRepository,
            GrammarPointRepository grammarPointRepository,
            KanjiRepository kanjiRepository
    ) {
        this.levelRepository = levelRepository;
        this.lessonRepository = lessonRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.lessonKanjiRepository = lessonKanjiRepository;
        this.grammarPointRepository = grammarPointRepository;
        this.kanjiRepository = kanjiRepository;
    }

    @Transactional
    public LessonDto publishLesson(Long lessonId, Long adminId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Bài học (Lesson) có ID: " + lessonId));

        if ("ARCHIVED".equalsIgnoreCase(lesson.getStatus())) {
            throw new IllegalStateException("Không thể xuất bản Bài học đã ở trạng thái ARCHIVED");
        }

        Level level = lesson.getLevel();
        if (level == null || "ARCHIVED".equalsIgnoreCase(level.getStatus())) {
            throw new IllegalStateException("Không thể xuất bản Bài học thuộc Trình độ không tồn tại hoặc đã bị ARCHIVED");
        }

        // BR-CONT-02 Validation: Must have at least 1 published content item (Vocabulary, Kanji, or Grammar)
        boolean hasPublishedVocab = vocabularyRepository.existsPublishedByLessonId(lessonId);
        boolean hasPublishedKanji = lessonKanjiRepository.existsPublishedKanjiByLessonId(lessonId);
        boolean hasPublishedGrammar = grammarPointRepository.existsPublishedByLessonId(lessonId);

        if (!hasPublishedVocab && !hasPublishedKanji && !hasPublishedGrammar) {
            throw new IllegalStateException("Không thể xuất bản Bài học (BR-CONT-02): Bài học phải chứa ít nhất 1 mục nội dung (Từ vựng, Hán tự, Ngữ pháp) ở trạng thái PUBLISHED.");
        }

        lesson.setStatus("PUBLISHED");
        lesson.setPublishedAt(OffsetDateTime.now());
        lesson.setUpdatedBy(adminId);

        Lesson saved = lessonRepository.save(lesson);
        return new LessonDto(saved);
    }

    @Transactional
    public LessonDto unpublishLesson(Long lessonId, Long adminId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Bài học (Lesson) có ID: " + lessonId));

        if ("ARCHIVED".equalsIgnoreCase(lesson.getStatus())) {
            throw new IllegalStateException("Không thể thay đổi trạng thái Bài học đã ở trạng thái ARCHIVED");
        }

        lesson.setStatus("DRAFT");
        lesson.setUpdatedBy(adminId);

        Lesson saved = lessonRepository.save(lesson);
        return new LessonDto(saved);
    }

    @Transactional
    public LevelDto publishLevel(Long levelId, Long adminId) {
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Trình độ (Level) có ID: " + levelId));

        if ("ARCHIVED".equalsIgnoreCase(level.getStatus())) {
            throw new IllegalStateException("Không thể xuất bản Trình độ đã ở trạng thái ARCHIVED");
        }

        // Must have at least 1 published lesson in this level
        List<Lesson> publishedLessons = lessonRepository.findByLevel_LevelIdAndStatusOrderBySortOrderAsc(levelId, "PUBLISHED");
        if (publishedLessons.isEmpty()) {
            throw new IllegalStateException("Không thể xuất bản Trình độ (Level): Trình độ phải chứa ít nhất 1 Bài học ở trạng thái PUBLISHED.");
        }

        level.setStatus("PUBLISHED");
        level.setPublishedAt(OffsetDateTime.now());
        level.setUpdatedBy(adminId);

        Level saved = levelRepository.save(level);
        return new LevelDto(saved);
    }

    @Transactional
    public LevelDto unpublishLevel(Long levelId, Long adminId) {
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Trình độ (Level) có ID: " + levelId));

        if ("ARCHIVED".equalsIgnoreCase(level.getStatus())) {
            throw new IllegalStateException("Không thể thay đổi trạng thái Trình độ đã ở trạng thái ARCHIVED");
        }

        level.setStatus("DRAFT");
        level.setUpdatedBy(adminId);

        Level saved = levelRepository.save(level);
        return new LevelDto(saved);
    }

    @Transactional
    public void publishVocabulary(Long vocabularyId, Long adminId) {
        Vocabulary vocab = vocabularyRepository.findById(vocabularyId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Từ vựng có ID: " + vocabularyId));
        vocab.setStatus("PUBLISHED");
        vocab.setPublishedAt(OffsetDateTime.now());
        vocab.setUpdatedBy(adminId);
        vocabularyRepository.save(vocab);
    }

    @Transactional
    public void publishKanji(Long kanjiId, Long adminId) {
        Kanji kanji = kanjiRepository.findById(kanjiId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Hán tự có ID: " + kanjiId));
        kanji.setStatus("PUBLISHED");
        kanji.setPublishedAt(OffsetDateTime.now());
        kanji.setUpdatedBy(adminId);
        kanjiRepository.save(kanji);
    }

    @Transactional
    public void publishGrammar(Long grammarId, Long adminId) {
        GrammarPoint grammar = grammarPointRepository.findById(grammarId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Ngữ pháp có ID: " + grammarId));
        grammar.setStatus("PUBLISHED");
        grammar.setPublishedAt(OffsetDateTime.now());
        grammar.setUpdatedBy(adminId);
        grammarPointRepository.save(grammar);
    }
}
