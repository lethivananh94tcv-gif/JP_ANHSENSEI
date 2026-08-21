package com.anhsensei;

import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.repository.*;
import com.anhsensei.curriculum.service.GrammarService;
import com.anhsensei.curriculum.service.KanjiService;
import com.anhsensei.curriculum.service.VocabularyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LearningContentUnitTest {

    @Mock private VocabularyRepository vocabularyRepository;
    @Mock private KanjiRepository kanjiRepository;
    @Mock private LessonKanjiRepository lessonKanjiRepository;
    @Mock private GrammarPointRepository grammarPointRepository;
    @Mock private GrammarExampleRepository grammarExampleRepository;
    @Mock private LessonRepository lessonRepository;

    @InjectMocks private VocabularyService vocabularyService;
    @InjectMocks private KanjiService kanjiService;
    @InjectMocks private GrammarService grammarService;

    private Lesson sampleLesson;

    @BeforeEach
    void setUp() {
        Level level = new Level(1L, "N5", "N5 Level", "Desc", 1, "DRAFT");
        sampleLesson = new Lesson(10L, level, "Bài 1", "Mô tả", 1, false, 30, "DRAFT");
    }

    @Test
    void testCreateVocabulary_Success() {
        CreateVocabularyRequest req = new CreateVocabularyRequest("私", "わたし", "私", "Tôi", "Danh từ", null, null, 1, true);
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(vocabularyRepository.save(any(Vocabulary.class))).thenAnswer(inv -> {
            Vocabulary v = inv.getArgument(0);
            v.setVocabularyId(100L);
            return v;
        });

        VocabularyDto dto = vocabularyService.createVocabulary(10L, req, 99L);

        assertNotNull(dto);
        assertEquals("私", dto.getWord());
        assertEquals("わたし", dto.getKana());
        assertEquals("DRAFT", dto.getStatus());
    }

    @Test
    void testCreateKanji_DuplicateCharacter_ThrowsException() {
        CreateKanjiRequest req = new CreateKanjiRequest("日", "ニチ, JITSU", "hi, ka", "Mặt trời, ngày", 4, "日", null, "N5");
        when(kanjiRepository.existsByCharacter("日")).thenReturn(true);

        assertThrows(IllegalStateException.class, () -> kanjiService.createKanji(req, 99L));
    }

    @Test
    void testRemoveKanjiFromLesson_DoesNotDeleteKanjiMaster() {
        LessonKanjiId id = new LessonKanjiId(10L, 50L);
        when(lessonKanjiRepository.existsById(id)).thenReturn(true);

        kanjiService.removeKanjiFromLesson(10L, 50L);

        verify(lessonKanjiRepository).deleteById(id);
        verify(kanjiRepository, never()).deleteById(anyLong());
    }

    @Test
    void testCreateGrammar_WithExamples_Success() {
        CreateGrammarRequest req = new CreateGrammarRequest();
        req.setPattern("～は～です");
        req.setMeaning("N1 là N2");
        req.setExplanation("Cấu trúc khẳng định thì hiện tại");
        req.setJlptLevel("N5");
        req.setSortOrder(1);
        req.setExamples(List.of(new CreateGrammarExampleRequest("わたしはたなかです。", "わたしはたなかです。", "Tôi là Tanaka.", null, 1)));

        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(grammarPointRepository.save(any(GrammarPoint.class))).thenAnswer(inv -> {
            GrammarPoint g = inv.getArgument(0);
            g.setGrammarId(200L);
            return g;
        });
        when(grammarPointRepository.findById(200L)).thenAnswer(inv -> {
            GrammarPoint g = new GrammarPoint();
            g.setGrammarId(200L);
            g.setLesson(sampleLesson);
            g.setPattern("～は～です");
            g.setMeaning("N1 là N2");
            g.setExplanation("Cấu trúc khẳng định thì hiện tại");
            g.setJlptLevel("N5");
            g.setSortOrder(1);
            g.setStatus("DRAFT");
            return Optional.of(g);
        });

        GrammarPointDto dto = grammarService.createGrammar(10L, req, 99L);

        assertNotNull(dto);
        assertEquals("～は～です", dto.getPattern());
        verify(grammarExampleRepository).save(any(GrammarExample.class));
    }
}
