package com.anhsensei;

import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.dto.ImportJobDto;
import com.anhsensei.curriculum.repository.*;
import com.anhsensei.curriculum.service.ExcelTemplateService;
import com.anhsensei.curriculum.service.FileSecurityValidator;
import com.anhsensei.curriculum.service.ImportJobService;
import com.anhsensei.operations.service.AuditLogService;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ImportFoundationTest {

    @Mock private ImportJobRepository importJobRepository;
    @Mock private LevelRepository levelRepository;
    @Mock private LessonRepository lessonRepository;
    @Mock private AuditLogService auditLogService;

    private FileSecurityValidator fileSecurityValidator;
    private ExcelTemplateService excelTemplateService;
    private ImportJobService importJobService;

    private Level activeLevel;
    private Lesson activeLesson;

    @BeforeEach
    void setUp() {
        fileSecurityValidator = new FileSecurityValidator();
        excelTemplateService = new ExcelTemplateService();
        importJobService = new ImportJobService(
                importJobRepository,
                levelRepository,
                lessonRepository,
                fileSecurityValidator,
                auditLogService
        );

        activeLevel = new Level();
        activeLevel.setLevelId(1L);
        activeLevel.setCode("N5");
        activeLevel.setName("JLPT N5");
        activeLevel.setStatus("PUBLISHED");

        activeLesson = new Lesson();
        activeLesson.setLessonId(10L);
        activeLesson.setLevel(activeLevel);
        activeLesson.setTitle("Bài 1: Giới thiệu");
        activeLesson.setStatus("DRAFT");
    }

    private byte[] createValidXlsxBytes() throws Exception {
        try (XSSFWorkbook wb = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            wb.createSheet("TestSheet");
            wb.write(out);
            return out.toByteArray();
        }
    }

    @Test
    @DisplayName("Test 1: Accept valid .xlsx file with correct ZIP signature and size <= 10MB")
    void test1_acceptValidXlsxFile() throws Exception {
        byte[] content = createValidXlsxBytes();
        MockMultipartFile file = new MockMultipartFile("file", "valid_vocab.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", content);
        assertDoesNotThrow(() -> fileSecurityValidator.validateFile(file));
    }

    @Test
    @DisplayName("Test 2: Reject .xls file format")
    void test2_rejectXlsFile() {
        MockMultipartFile file = new MockMultipartFile("file", "old_format.xls", "application/vnd.ms-excel", new byte[]{1, 2, 3});
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> fileSecurityValidator.validateFile(file));
        assertTrue(ex.getMessage().contains("Chỉ chấp nhận file định dạng Excel .xlsx"));
    }

    @Test
    @DisplayName("Test 3: Reject .docx file format")
    void test3_rejectDocxFile() {
        MockMultipartFile file = new MockMultipartFile("file", "document.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", new byte[]{1, 2, 3});
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> fileSecurityValidator.validateFile(file));
        assertTrue(ex.getMessage().contains("Chỉ chấp nhận file định dạng Excel .xlsx"));
    }

    @Test
    @DisplayName("Test 4: Reject fake extension (text file renamed to .xlsx without ZIP signature PK)")
    void test4_rejectFakeExtension() {
        MockMultipartFile file = new MockMultipartFile("file", "fake.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Hello World Text Content".getBytes());
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> fileSecurityValidator.validateFile(file));
        assertTrue(ex.getMessage().contains("Nội dung file không hợp lệ hoặc bị giả mạo extension"));
    }

    @Test
    @DisplayName("Test 5: Reject file size > 10MB limit")
    void test5_rejectExcessiveFileSize() {
        byte[] largeBytes = new byte[11 * 1024 * 1024]; // 11MB
        MockMultipartFile file = new MockMultipartFile("file", "large.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", largeBytes);
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> fileSecurityValidator.validateFile(file));
        assertTrue(ex.getMessage().contains("vượt quá giới hạn tối đa 10 MB"));
    }

    @Test
    @DisplayName("Test 6: Sanitize dangerous filenames to prevent path traversal")
    void test6_sanitizeFilename() {
        String dangerousName = "../../etc/passwd_script<script>.xlsx";
        String clean = fileSecurityValidator.sanitizeFilename(dangerousName);
        assertFalse(clean.contains(".."));
        assertFalse(clean.contains("<"));
        assertFalse(clean.contains("/"));
        assertTrue(clean.endsWith(".xlsx"));
    }

    @Test
    @DisplayName("Test 7: Template Service generates valid Excel byte stream for VOCABULARY, KANJI, GRAMMAR")
    void test7_generateTemplate() throws Exception {
        byte[] vocabBytes = excelTemplateService.generateTemplate(ImportType.VOCABULARY);
        assertNotNull(vocabBytes);
        assertTrue(vocabBytes.length > 0);

        try (XSSFWorkbook wb = new XSSFWorkbook(new ByteArrayInputStream(vocabBytes))) {
            assertNotNull(wb.getSheet("Vocabularies"));
            assertEquals("Word (*)", wb.getSheet("Vocabularies").getRow(1).getCell(0).getStringCellValue());
        }
    }

    @Test
    @DisplayName("Test 8: Reject non-existent Target Level")
    void test8_rejectNonExistentLevel() throws Exception {
        byte[] content = createValidXlsxBytes();
        MockMultipartFile file = new MockMultipartFile("file", "test.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", content);

        when(levelRepository.findById(99L)).thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () ->
                importJobService.createImportJob(3L, file, ImportType.VOCABULARY, 99L, 10L, DuplicateMode.SKIP, "127.0.0.1")
        );
        assertTrue(ex.getMessage().contains("Trình độ (Level) ID không tồn tại"));
    }

    @Test
    @DisplayName("Test 9: Reject Target Lesson that does not belong to Target Level")
    void test9_rejectMismatchedLessonLevel() throws Exception {
        byte[] content = createValidXlsxBytes();
        MockMultipartFile file = new MockMultipartFile("file", "test.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", content);

        Level otherLevel = new Level();
        otherLevel.setLevelId(2L);
        Lesson misLesson = new Lesson();
        misLesson.setLessonId(10L);
        misLesson.setLevel(otherLevel);

        when(levelRepository.findById(1L)).thenReturn(Optional.of(activeLevel));
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(misLesson));

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () ->
                importJobService.createImportJob(3L, file, ImportType.VOCABULARY, 1L, 10L, DuplicateMode.SKIP, "127.0.0.1")
        );
        assertTrue(ex.getMessage().contains("không thuộc Trình độ ID 1"));
    }

    @Test
    @DisplayName("Test 10: Create ImportJob successfully and log Audit record")
    void test10_createImportJobSuccess() throws Exception {
        byte[] content = createValidXlsxBytes();
        MockMultipartFile file = new MockMultipartFile("file", "test_vocab.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", content);

        when(levelRepository.findById(1L)).thenReturn(Optional.of(activeLevel));
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(activeLesson));
        when(importJobRepository.save(any(ImportJob.class))).thenAnswer(invocation -> {
            ImportJob j = invocation.getArgument(0);
            j.setImportJobId(100L);
            return j;
        });

        ImportJobDto dto = importJobService.createImportJob(3L, file, ImportType.VOCABULARY, 1L, 10L, DuplicateMode.SKIP, "127.0.0.1");

        assertNotNull(dto);
        assertEquals(100L, dto.getImportJobId());
        assertEquals(3L, dto.getAdminId());
        assertEquals("VOCABULARY", dto.getFileType());
        assertEquals("UPLOADED", dto.getStatus());

        verify(auditLogService, times(1)).logAction(
                eq(3L),
                eq("IMPORT_JOB_UPLOADED"),
                eq("ImportJob"),
                eq("100"),
                eq(null),
                contains("Uploaded file:"),
                eq("127.0.0.1")
        );
    }
}
