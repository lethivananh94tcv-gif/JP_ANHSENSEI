package com.anhsensei;

import com.anhsensei.curriculum.domain.Lesson;
import com.anhsensei.curriculum.domain.Level;
import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.repository.LessonRepository;
import com.anhsensei.curriculum.repository.LevelRepository;
import com.anhsensei.curriculum.service.LessonService;
import com.anhsensei.curriculum.service.LevelService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LevelAndLessonUnitTest {

    @Mock
    private LevelRepository levelRepository;

    @Mock
    private LessonRepository lessonRepository;

    @InjectMocks
    private LevelService levelService;

    @InjectMocks
    private LessonService lessonService;

    private Level sampleLevel;
    private Lesson sampleLesson;

    @BeforeEach
    void setUp() {
        sampleLevel = new Level(1L, "N5", "Trình độ N5 Sơ cấp", "Mô tả N5", 1, "DRAFT");
        sampleLevel.setVersion(0L);

        sampleLesson = new Lesson(10L, sampleLevel, "Bài 1: Chào hỏi", "Mô tả bài 1", 1, false, 30, "DRAFT");
        sampleLesson.setVersion(0L);
    }

    @Test
    void testCreateLevel_Success() {
        CreateLevelRequest req = new CreateLevelRequest("n5", "Trình độ N5 Sơ cấp", "Mô tả", 1);
        when(levelRepository.existsByCode("N5")).thenReturn(false);
        when(levelRepository.existsBySortOrderAndStatusNot(1, "ARCHIVED")).thenReturn(false);
        when(levelRepository.save(any(Level.class))).thenAnswer(invocation -> {
            Level saved = invocation.getArgument(0);
            saved.setLevelId(1L);
            return saved;
        });

        LevelDto dto = levelService.createLevel(req, 99L);

        assertNotNull(dto);
        assertEquals("N5", dto.getCode());
        assertEquals("DRAFT", dto.getStatus());
        verify(levelRepository).save(any(Level.class));
    }

    @Test
    void testCreateLevel_DuplicateCode_ThrowsException() {
        CreateLevelRequest req = new CreateLevelRequest("N5", "Trình độ N5 Sơ cấp", "Mô tả", 1);
        when(levelRepository.existsByCode("N5")).thenReturn(true);

        assertThrows(IllegalStateException.class, () -> levelService.createLevel(req, 99L));
    }

    @Test
    void testCreateLevel_DuplicateSortOrder_ThrowsException() {
        CreateLevelRequest req = new CreateLevelRequest("N4", "Trình độ N4", "Mô tả", 1);
        when(levelRepository.existsByCode("N4")).thenReturn(false);
        when(levelRepository.existsBySortOrderAndStatusNot(1, "ARCHIVED")).thenReturn(true);

        assertThrows(IllegalStateException.class, () -> levelService.createLevel(req, 99L));
    }

    @Test
    void testUpdateLevel_OptimisticLockingConflict_ThrowsException() {
        UpdateLevelRequest req = new UpdateLevelRequest("N5 Sửa", "Mô tả mới", 1, 99L); // Wrong version
        when(levelRepository.findById(1L)).thenReturn(Optional.of(sampleLevel));

        assertThrows(IllegalStateException.class, () -> levelService.updateLevel(1L, req, 99L));
    }

    @Test
    void testCreateLesson_Success() {
        CreateLessonRequest req = new CreateLessonRequest("Bài 1: Chào hỏi", "Mô tả", 1, false, 30);
        when(levelRepository.findById(1L)).thenReturn(Optional.of(sampleLevel));
        when(lessonRepository.existsByLevelIdAndSortOrderAndStatusNot(1L, 1, "ARCHIVED")).thenReturn(false);
        when(lessonRepository.save(any(Lesson.class))).thenAnswer(invocation -> {
            Lesson saved = invocation.getArgument(0);
            saved.setLessonId(10L);
            return saved;
        });

        LessonDto dto = lessonService.createLesson(1L, req, 99L);

        assertNotNull(dto);
        assertEquals("Bài 1: Chào hỏi", dto.getTitle());
        assertEquals("DRAFT", dto.getStatus());
    }

    @Test
    void testCreateLesson_InArchivedLevel_ThrowsException() {
        Level archivedLevel = new Level(2L, "N4", "N4", "Desc", 2, "ARCHIVED");
        CreateLessonRequest req = new CreateLessonRequest("Bài 1", "Mô tả", 1, false, 30);
        when(levelRepository.findById(2L)).thenReturn(Optional.of(archivedLevel));

        assertThrows(IllegalStateException.class, () -> lessonService.createLesson(2L, req, 99L));
    }

    @Test
    void testCreateLesson_DuplicateSortOrderInSameLevel_ThrowsException() {
        CreateLessonRequest req = new CreateLessonRequest("Bài 2", "Mô tả", 1, false, 30);
        when(levelRepository.findById(1L)).thenReturn(Optional.of(sampleLevel));
        when(lessonRepository.existsByLevelIdAndSortOrderAndStatusNot(1L, 1, "ARCHIVED")).thenReturn(true);

        assertThrows(IllegalStateException.class, () -> lessonService.createLesson(1L, req, 99L));
    }
}
