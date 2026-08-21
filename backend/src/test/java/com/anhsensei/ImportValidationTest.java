package com.anhsensei;

import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.dto.ImportJobDto;
import com.anhsensei.curriculum.repository.*;
import com.anhsensei.curriculum.service.ExcelValidationService;
import com.anhsensei.operations.service.AuditLogService;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.File;
import java.io.FileOutputStream;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ImportValidationTest {

    @Mock private ImportJobRepository importJobRepository;
    @Mock private ImportErrorRepository importErrorRepository;
    @Mock private VocabularyRepository vocabularyRepository;
    @Mock private KanjiRepository kanjiRepository;
    @Mock private GrammarPointRepository grammarPointRepository;
    @Mock private AuditLogService auditLogService;

    private ExcelValidationService excelValidationService;
    private ImportJob sampleJob;
    private File tempExcelFile;

    @BeforeEach
    void setUp() throws Exception {
        excelValidationService = new ExcelValidationService(
                importJobRepository,
                importErrorRepository,
                vocabularyRepository,
                kanjiRepository,
                grammarPointRepository,
                auditLogService
        );

        tempExcelFile = File.createTempFile("test_import_", ".xlsx");
        tempExcelFile.deleteOnExit();

        sampleJob = new ImportJob();
        sampleJob.setImportJobId(101L);
        sampleJob.setAdminId(3L);
        sampleJob.setFileName("test.xlsx");
        sampleJob.setFilePath(tempExcelFile.getAbsolutePath());
        sampleJob.setFileType(ImportType.VOCABULARY);
        sampleJob.setTargetLevelId(1L);
        sampleJob.setTargetLessonId(10L);
        sampleJob.setDuplicateMode(DuplicateMode.SKIP);
        sampleJob.setStatus(ImportJobStatus.UPLOADED);
    }

    private void writeVocabSheet(String[][] rows) throws Exception {
        try (XSSFWorkbook wb = new XSSFWorkbook(); FileOutputStream fos = new FileOutputStream(tempExcelFile)) {
            Sheet sheet = wb.createSheet("Vocabularies");
            Row noteRow = sheet.createRow(0);
            noteRow.createCell(0).setCellValue("Mẫu Hướng Dẫn");

            Row headerRow = sheet.createRow(1);
            String[] headers = {"Word (*)", "Kana (*)", "KanjiForm", "MeaningVi (*)", "PartOfSpeech", "Notes", "SortOrder"};
            for (int i = 0; i < headers.length; i++) {
                headerRow.createCell(i).setCellValue(headers[i]);
            }

            for (int r = 0; r < rows.length; r++) {
                Row row = sheet.createRow(r + 2);
                for (int c = 0; c < rows[r].length; c++) {
                    row.createCell(c).setCellValue(rows[r][c]);
                }
            }

            wb.write(fos);
        }
    }

    @Test
    @DisplayName("Test 11: Validation fails when required field MeaningVi is missing")
    void test11_validationFailsOnMissingRequiredField() throws Exception {
        writeVocabSheet(new String[][]{
                {"猫", "ねこ", "猫", "", "Danh từ", "", "1"}
        });

        when(importJobRepository.findById(101L)).thenReturn(Optional.of(sampleJob));
        when(importJobRepository.save(any(ImportJob.class))).thenAnswer(i -> i.getArgument(0));

        ImportJobDto dto = excelValidationService.validateImportJob(3L, 101L, "127.0.0.1");

        assertNotNull(dto);
        assertEquals("VALIDATION_FAILED", dto.getStatus());
        assertEquals(1, dto.getInvalidRows());

        verify(importErrorRepository, times(1)).saveAll(anyList());
    }

    @Test
    @DisplayName("Test 12: In-file duplicate detection (Same word & kana twice)")
    void test12_inFileDuplicateDetection() throws Exception {
        writeVocabSheet(new String[][]{
                {"犬", "いぬ", "犬", "Con chó", "Danh từ", "", "1"},
                {"犬", "いぬ", "犬", "Con chó thứ 2", "Danh từ", "", "2"}
        });

        when(importJobRepository.findById(101L)).thenReturn(Optional.of(sampleJob));
        when(vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(10L, "PUBLISHED")).thenReturn(Collections.emptyList());
        when(importJobRepository.save(any(ImportJob.class))).thenAnswer(i -> i.getArgument(0));

        ImportJobDto dto = excelValidationService.validateImportJob(3L, 101L, "127.0.0.1");

        assertNotNull(dto);
        assertEquals("VALIDATION_FAILED", dto.getStatus());
        assertEquals(1, dto.getInvalidRows());

        verify(importErrorRepository, times(1)).saveAll(anyList());
    }

    @Test
    @DisplayName("Test 13: DB Duplicate Handling with DuplicateMode.SKIP")
    void test13_dbDuplicateHandlingSkipMode() throws Exception {
        writeVocabSheet(new String[][]{
                {"本", "ほん", "本", "Sách", "Danh từ", "", "1"}
        });

        Vocabulary existing = new Vocabulary();
        existing.setWord("本");
        existing.setKana("ほん");

        when(importJobRepository.findById(101L)).thenReturn(Optional.of(sampleJob));
        when(vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(10L, "PUBLISHED")).thenReturn(List.of(existing));
        when(importJobRepository.save(any(ImportJob.class))).thenAnswer(i -> i.getArgument(0));

        ImportJobDto dto = excelValidationService.validateImportJob(3L, 101L, "127.0.0.1");

        assertNotNull(dto);
        assertEquals("READY_TO_COMMIT", dto.getStatus());
        assertEquals(0, dto.getInvalidRows());
        assertEquals(1, dto.getSkippedRows());
        assertEquals(0, dto.getValidRows());
    }

    @Test
    @DisplayName("Test 14: Valid file with 0 errors transitions to READY_TO_COMMIT")
    void test14_validFileTransitionsToReadyToCommit() throws Exception {
        writeVocabSheet(new String[][]{
                {"水", "みず", "水", "Nước", "Danh từ", "", "1"}
        });

        when(importJobRepository.findById(101L)).thenReturn(Optional.of(sampleJob));
        when(vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(10L, "PUBLISHED")).thenReturn(Collections.emptyList());
        when(importJobRepository.save(any(ImportJob.class))).thenAnswer(i -> i.getArgument(0));

        ImportJobDto dto = excelValidationService.validateImportJob(3L, 101L, "127.0.0.1");

        assertNotNull(dto);
        assertEquals("READY_TO_COMMIT", dto.getStatus());
        assertEquals(1, dto.getValidRows());
        assertEquals(0, dto.getInvalidRows());
        assertEquals(0, dto.getSkippedRows());
    }
}
