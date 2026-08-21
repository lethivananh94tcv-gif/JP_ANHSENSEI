package com.anhsensei;

import com.anhsensei.curriculum.domain.Lesson;
import com.anhsensei.curriculum.domain.Level;
import com.anhsensei.curriculum.dto.LessonDto;
import com.anhsensei.curriculum.dto.LevelDto;
import com.anhsensei.curriculum.repository.*;
import com.anhsensei.curriculum.service.LessonPublishService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PublishAndLearnerAccessTest {

    @Mock private LevelRepository levelRepository;
    @Mock private LessonRepository lessonRepository;
    @Mock private VocabularyRepository vocabularyRepository;
    @Mock private LessonKanjiRepository lessonKanjiRepository;
    @Mock private GrammarPointRepository grammarPointRepository;
    @Mock private KanjiRepository kanjiRepository;

    @InjectMocks private LessonPublishService publishService;

    private Level sampleLevel;
    private Lesson sampleLesson;

    @BeforeEach
    void setUp() {
        sampleLevel = new Level(1L, "N5", "Trình độ N5", "Desc", 1, "DRAFT");
        sampleLesson = new Lesson(10L, sampleLevel, "Bài 1", "Mô tả", 1, false, 30, "DRAFT");
    }

    @Test
    void testPublishLesson_EmptyContent_ThrowsException() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(vocabularyRepository.existsPublishedByLessonId(10L)).thenReturn(false);
        when(lessonKanjiRepository.existsPublishedKanjiByLessonId(10L)).thenReturn(false);
        when(grammarPointRepository.existsPublishedByLessonId(10L)).thenReturn(false);

        assertThrows(IllegalStateException.class, () -> publishService.publishLesson(10L, 99L));
    }

    @Test
    void testPublishLesson_WithPublishedVocab_Success() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(vocabularyRepository.existsPublishedByLessonId(10L)).thenReturn(true);
        when(lessonRepository.save(any(Lesson.class))).thenAnswer(inv -> inv.getArgument(0));

        LessonDto dto = publishService.publishLesson(10L, 99L);

        assertNotNull(dto);
        assertEquals("PUBLISHED", dto.getStatus());
        assertNotNull(dto.getPublishedAt());
    }

    @Test
    void testPublishLevel_WithoutPublishedLessons_ThrowsException() {
        when(levelRepository.findById(1L)).thenReturn(Optional.of(sampleLevel));
        when(lessonRepository.findByLevel_LevelIdAndStatusOrderBySortOrderAsc(1L, "PUBLISHED")).thenReturn(Collections.emptyList());

        assertThrows(IllegalStateException.class, () -> publishService.publishLevel(1L, 99L));
    }

    @Test
    void testPublishLevel_WithPublishedLessons_Success() {
        sampleLesson.setStatus("PUBLISHED");
        when(levelRepository.findById(1L)).thenReturn(Optional.of(sampleLevel));
        when(lessonRepository.findByLevel_LevelIdAndStatusOrderBySortOrderAsc(1L, "PUBLISHED")).thenReturn(List.of(sampleLesson));
        when(levelRepository.save(any(Level.class))).thenAnswer(inv -> inv.getArgument(0));

        LevelDto dto = publishService.publishLevel(1L, 99L);

        assertNotNull(dto);
        assertEquals("PUBLISHED", dto.getStatus());
        assertNotNull(dto.getPublishedAt());
    }
}
