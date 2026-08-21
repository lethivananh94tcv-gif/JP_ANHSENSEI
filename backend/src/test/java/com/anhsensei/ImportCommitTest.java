package com.anhsensei;

import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.dto.ImportJobDto;
import com.anhsensei.curriculum.repository.*;
import com.anhsensei.curriculum.service.ExcelCommitService;
import com.anhsensei.operations.service.AuditLogService;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ImportCommitTest {

    @Mock private ImportJobRepository importJobRepository;
    @Mock private LevelRepository levelRepository;
    @Mock private LessonRepository lessonRepository;
    @Mock private VocabularyRepository vocabularyRepository;
    @Mock private KanjiRepository kanjiRepository;
    @Mock private LessonKanjiRepository lessonKanjiRepository;
    @Mock private GrammarPointRepository grammarPointRepository;
    @Mock private GrammarExampleRepository grammarExampleRepository;
    @Mock private AuditLogService auditLogService;

    private ExcelCommitService excelCommitService;
    private ImportJob readyJob;
    private Level sampleLevel;
    private Lesson sampleLesson;
    private File tempExcelFile;

    @BeforeEach
    void setUp() throws Exception {
        excelCommitService = new ExcelCommitService(
                importJobRepository,
                levelRepository,
                lessonRepository,
                vocabularyRepository,
                kanjiRepository,
                lessonKanjiRepository,
                grammarPointRepository,
                grammarExampleRepository,
                auditLogService
        );

        tempExcelFile = File.createTempFile("test_commit_", ".xlsx");
        tempExcelFile.deleteOnExit();

        sampleLevel = new Level();
        sampleLevel.setLevelId(1L);
        sampleLevel.setCode("N5");
        sampleLevel.setName("JLPT N5");

        sampleLesson = new Lesson();
        sampleLesson.setLessonId(10L);
        sampleLesson.setLevel(sampleLevel);
        sampleLesson.setTitle("Bài 1");

        readyJob = new ImportJob();
        readyJob.setImportJobId(102L);
        readyJob.setAdminId(3L);
        readyJob.setFileName("ready.xlsx");
        readyJob.setFilePath(tempExcelFile.getAbsolutePath());
        readyJob.setFileType(ImportType.VOCABULARY);
        readyJob.setTargetLevelId(1L);
        readyJob.setTargetLessonId(10L);
        readyJob.setDuplicateMode(DuplicateMode.SKIP);
        readyJob.setStatus(ImportJobStatus.READY_TO_COMMIT);
        readyJob.setTotalRows(1);
        readyJob.setValidRows(1);
        readyJob.setInvalidRows(0);
        readyJob.setSkippedRows(0);
    }

    private void writeVocabSheet(String[][] rows) throws Exception {
        try (XSSFWorkbook wb = new XSSFWorkbook(); FileOutputStream fos = new FileOutputStream(tempExcelFile)) {
            Sheet sheet = wb.createSheet("Vocabularies");
            Row noteRow = sheet.createRow(0);
            noteRow.createCell(0).setCellValue("Note");
            Row headerRow = sheet.createRow(1);
            String[] headers = {"Word (*)", "Kana (*)", "KanjiForm", "MeaningVi (*)", "PartOfSpeech", "Notes", "SortOrder"};
            for (int i = 0; i < headers.length; i++) headerRow.createCell(i).setCellValue(headers[i]);

            for (int r = 0; r < rows.length; r++) {
                Row row = sheet.createRow(r + 2);
                for (int c = 0; c < rows[r].length; c++) row.createCell(c).setCellValue(rows[r][c]);
            }
            wb.write(fos);
        }
    }

    @Test
    @DisplayName("Test 22: Reject commit if InvalidRows > 0 (Strict All-or-Nothing)")
    void test22_rejectCommitIfInvalidRowsExist() {
        readyJob.setInvalidRows(2);
        when(importJobRepository.findById(102L)).thenReturn(Optional.of(readyJob));

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () ->
                excelCommitService.commitImportJob(3L, 102L, "127.0.0.1")
        );
        assertTrue(ex.getMessage().contains("All-or-Nothing"));
    }

    @Test
    @DisplayName("Test 23: Commit Vocabulary successfully and create DRAFT status record")
    void test23_commitVocabularySuccess() throws Exception {
        writeVocabSheet(new String[][]{
                {"私", "わたし", "私", "Tôi", "Danh từ", "Note", "1"}
        });

        when(importJobRepository.findById(102L)).thenReturn(Optional.of(readyJob));
        when(levelRepository.findById(1L)).thenReturn(Optional.of(sampleLevel));
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(10L, "PUBLISHED")).thenReturn(Collections.emptyList());
        when(importJobRepository.save(any(ImportJob.class))).thenAnswer(i -> i.getArgument(0));

        ImportJobDto dto = excelCommitService.commitImportJob(3L, 102L, "127.0.0.1");

        assertNotNull(dto);
        assertEquals("COMPLETED", dto.getStatus());

        ArgumentCaptor<Vocabulary> captor = ArgumentCaptor.forClass(Vocabulary.class);
        verify(vocabularyRepository, times(1)).save(captor.capture());

        Vocabulary saved = captor.getValue();
        assertEquals("私", saved.getWord());
        assertEquals("わたし", saved.getKana());
        assertEquals("DRAFT", saved.getStatus()); // BR-IMP-06: New entries always DRAFT

        verify(auditLogService, times(1)).logAction(
                eq(3L),
                eq("IMPORT_JOB_COMMITTED"),
                eq("ImportJob"),
                eq("102"),
                eq("READY_TO_COMMIT"),
                contains("Committed job ID 102"),
                eq("127.0.0.1")
        );
    }

    @Test
    @DisplayName("Test 24: Cancel ImportJob transitions status to CANCELLED")
    void test24_cancelImportJobSuccess() {
        when(importJobRepository.findById(102L)).thenReturn(Optional.of(readyJob));
        when(importJobRepository.save(any(ImportJob.class))).thenAnswer(i -> i.getArgument(0));

        ImportJobDto dto = excelCommitService.cancelImportJob(3L, 102L, "127.0.0.1");

        assertNotNull(dto);
        assertEquals("CANCELLED", dto.getStatus());

        verify(auditLogService, times(1)).logAction(
                eq(3L),
                eq("IMPORT_JOB_CANCELLED"),
                eq("ImportJob"),
                eq("102"),
                eq("READY_TO_COMMIT"),
                eq("CANCELLED"),
                eq("127.0.0.1")
        );
    }
}
