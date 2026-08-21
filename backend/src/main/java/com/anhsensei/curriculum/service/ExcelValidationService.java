package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.dto.ImportJobDto;
import com.anhsensei.curriculum.repository.*;
import com.anhsensei.operations.service.AuditLogService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileInputStream;

import java.util.*;

@Service
public class ExcelValidationService {

    private final ImportJobRepository importJobRepository;
    private final ImportErrorRepository importErrorRepository;
    private final VocabularyRepository vocabularyRepository;
    private final KanjiRepository kanjiRepository;
    private final GrammarPointRepository grammarPointRepository;
    private final AuditLogService auditLogService;

    public ExcelValidationService(
            ImportJobRepository importJobRepository,
            ImportErrorRepository importErrorRepository,
            VocabularyRepository vocabularyRepository,
            KanjiRepository kanjiRepository,
            GrammarPointRepository grammarPointRepository,
            AuditLogService auditLogService
    ) {
        this.importJobRepository = importJobRepository;
        this.importErrorRepository = importErrorRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.kanjiRepository = kanjiRepository;
        this.grammarPointRepository = grammarPointRepository;
        this.auditLogService = auditLogService;
    }

    @Transactional
    public ImportJobDto validateImportJob(Long adminId, Long importJobId, String ipAddress) {
        ImportJob job = importJobRepository.findById(importJobId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy ImportJob có ID: " + importJobId));

        if (!adminId.equals(job.getAdminId())) {
            throw new IllegalArgumentException("Admin không có quyền thao tác trên ImportJob này.");
        }

        if (job.getStatus() != ImportJobStatus.UPLOADED && job.getStatus() != ImportJobStatus.VALIDATION_FAILED && job.getStatus() != ImportJobStatus.FAILED_TECHNICAL) {
            throw new IllegalArgumentException("Không thể thực hiện Validate từ trạng thái: " + job.getStatus());
        }

        job.setStatus(ImportJobStatus.VALIDATING);
        importJobRepository.save(job);

        // Clear existing errors
        importErrorRepository.deleteByImportJob_ImportJobId(importJobId);

        int totalRows = 0;
        int validRows = 0;
        int invalidRows = 0;
        int skippedRows = 0;

        List<ImportError> errorList = new ArrayList<>();
        File excelFile = new File(job.getFilePath());

        if (!excelFile.exists()) {
            job.setStatus(ImportJobStatus.FAILED_TECHNICAL);
            importJobRepository.save(job);
            throw new IllegalArgumentException("File upload không còn tồn tại trên server.");
        }

        try (FileInputStream fis = new FileInputStream(excelFile); Workbook workbook = new XSSFWorkbook(fis)) {
            Sheet sheet;
            String expectedSheetName = getExpectedSheetName(job.getFileType());
            sheet = workbook.getSheet(expectedSheetName);

            if (sheet == null) {
                // Fallback to first sheet
                sheet = workbook.getSheetAt(0);
                if (sheet == null) {
                    throw new IllegalArgumentException("Workbook không chứa sheet dữ liệu nào.");
                }
            }

            // Layer 1: Header Validation
            Row headerRow = sheet.getRow(1); // Row 0 is instruction note
            if (headerRow == null) headerRow = sheet.getRow(0);

            if (headerRow == null) {
                errorList.add(new ImportError(job, 1, sheet.getSheetName(), null, "Header", "MISSING_HEADER", "Sheet không chứa dòng Tiêu đề (Header)."));
                invalidRows++;
            } else {
                validateHeaders(job, sheet.getSheetName(), headerRow, errorList);
                if (!errorList.isEmpty()) {
                    invalidRows++;
                }
            }

            // Layer 2: Row Validation & Duplicate Check
            if (errorList.isEmpty()) {
                int startRowIndex = (headerRow != null && headerRow.getRowNum() == 0) ? 1 : 2;
                int lastRow = sheet.getLastRowNum();

                Set<String> inFileDuplicates = new HashSet<>();

                for (int r = startRowIndex; r <= lastRow; r++) {
                    Row row = sheet.getRow(r);
                    if (row == null || isRowEmpty(row)) continue;

                    totalRows++;
                    if (totalRows > 1000) {
                        errorList.add(new ImportError(job, r + 1, sheet.getSheetName(), null, "TotalRows", "MAX_ROWS_EXCEEDED", "File vượt quá giới hạn tối đa 1.000 dòng dữ liệu theo quy định BR-IMP-01."));
                        invalidRows++;
                        break;
                    }

                    int rowNum = r + 1;
                    boolean rowHasError = validateRowContent(job, sheet.getSheetName(), row, rowNum, errorList, inFileDuplicates);

                    if (rowHasError) {
                        invalidRows++;
                    } else {
                        boolean isDuplicate = checkDbDuplicate(job, row);
                        if (isDuplicate) {
                            if (job.getDuplicateMode() == DuplicateMode.SKIP) {
                                skippedRows++;
                            } else {
                                validRows++; // UPDATE mode count as valid row to update
                            }
                        } else {
                            validRows++;
                        }
                    }
                }
            }

            // Save Errors
            if (!errorList.isEmpty()) {
                importErrorRepository.saveAll(errorList);
            }

            // Update Job Status
            job.setTotalRows(totalRows);
            job.setValidRows(validRows);
            job.setInvalidRows(invalidRows);
            job.setSkippedRows(skippedRows);

            if (invalidRows > 0) {
                job.setStatus(ImportJobStatus.VALIDATION_FAILED);
            } else {
                job.setStatus(ImportJobStatus.READY_TO_COMMIT);
            }

            ImportJob updatedJob = importJobRepository.save(job);

            auditLogService.logAction(
                    adminId,
                    "IMPORT_JOB_VALIDATED",
                    "ImportJob",
                    importJobId.toString(),
                    "VALIDATING",
                    "Validated job ID " + importJobId + ": Status=" + updatedJob.getStatus() + ", Total=" + totalRows + ", Valid=" + validRows + ", Invalid=" + invalidRows + ", Skipped=" + skippedRows,
                    ipAddress
            );

            return new ImportJobDto(updatedJob);
        } catch (Exception e) {
            job.setStatus(ImportJobStatus.FAILED_TECHNICAL);
            importJobRepository.save(job);
            if (e instanceof IllegalArgumentException) throw (IllegalArgumentException) e;
            throw new RuntimeException("Lỗi kỹ thuật khi đọc & validate file Excel: " + e.getMessage(), e);
        }
    }

    private String getExpectedSheetName(ImportType type) {
        return switch (type) {
            case VOCABULARY -> "Vocabularies";
            case KANJI -> "Kanjis";
            case GRAMMAR, GRAMMAR_EXAMPLE -> "GrammarPoints";
        };
    }

    private void validateHeaders(ImportJob job, String sheetName, Row headerRow, List<ImportError> errors) {
        List<String> expectedHeaders = switch (job.getFileType()) {
            case VOCABULARY -> List.of("Word (*)", "Kana (*)", "KanjiForm", "MeaningVi (*)", "PartOfSpeech", "Notes", "SortOrder");
            case KANJI -> List.of("Character (*)", "Onyomi", "Kunyomi", "MeaningVi (*)", "StrokeCount", "Radical", "Notes", "SortOrder");
            case GRAMMAR, GRAMMAR_EXAMPLE -> List.of("Pattern (*)", "Meaning (*)", "Explanation (*)", "Structure", "ExampleJapanese", "ExampleReading", "ExampleMeaningVi", "SortOrder");
        };

        for (int i = 0; i < expectedHeaders.size(); i++) {
            Cell cell = headerRow.getCell(i);
            String actualHeader = cell != null ? cell.getStringCellValue().trim() : "";
            String expected = expectedHeaders.get(i);
            if (!actualHeader.equalsIgnoreCase(expected) && !actualHeader.replaceAll("\\s*\\(\\*\\)", "").equalsIgnoreCase(expected.replaceAll("\\s*\\(\\*\\)", ""))) {
                errors.add(new ImportError(job, headerRow.getRowNum() + 1, sheetName, "Col " + (i + 1), "Header", "INVALID_HEADER", "Tiêu đề cột không hợp lệ: Thấy '" + actualHeader + "', Kỳ vọng '" + expected + "'."));
            }
        }
    }

    private boolean validateRowContent(ImportJob job, String sheetName, Row row, int rowNum, List<ImportError> errors, Set<String> inFileDuplicates) {
        boolean hasError = false;

        if (job.getFileType() == ImportType.VOCABULARY) {
            String word = getCellValue(row.getCell(0));
            String kana = getCellValue(row.getCell(1));
            String meaningVi = getCellValue(row.getCell(3));

            if (word.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "Word (*)", "word", "REQUIRED_FIELD_MISSING", "Từ vựng (Word) là trường bắt buộc."));
                hasError = true;
            }
            if (kana.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "Kana (*)", "kana", "REQUIRED_FIELD_MISSING", "Phiên âm Kana là trường bắt buộc."));
                hasError = true;
            }
            if (meaningVi.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "MeaningVi (*)", "meaningVi", "REQUIRED_FIELD_MISSING", "Nghĩa tiếng Việt là trường bắt buộc."));
                hasError = true;
            }

            String inFileKey = (word + "|" + kana).toLowerCase();
            if (inFileDuplicates.contains(inFileKey)) {
                errors.add(new ImportError(job, rowNum, sheetName, "Word/Kana", "word", "IN_FILE_DUPLICATE", "Từ vựng '" + word + "' (" + kana + ") bị trùng lặp nhiều lần ngay trong file Excel."));
                hasError = true;
            } else {
                inFileDuplicates.add(inFileKey);
            }
        } else if (job.getFileType() == ImportType.KANJI) {
            String character = getCellValue(row.getCell(0));
            String meaningVi = getCellValue(row.getCell(3));

            if (character.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "Character (*)", "character", "REQUIRED_FIELD_MISSING", "Ký tự Hán tự (Character) là trường bắt buộc."));
                hasError = true;
            } else if (character.length() > 5) {
                errors.add(new ImportError(job, rowNum, sheetName, "Character (*)", "character", "INVALID_LENGTH", "Ký tự Kanji chỉ được chứa tối đa 5 ký tự."));
                hasError = true;
            }

            if (meaningVi.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "MeaningVi (*)", "meaningVi", "REQUIRED_FIELD_MISSING", "Nghĩa tiếng Việt là trường bắt buộc."));
                hasError = true;
            }

            String inFileKey = character.trim();
            if (inFileDuplicates.contains(inFileKey)) {
                errors.add(new ImportError(job, rowNum, sheetName, "Character (*)", "character", "IN_FILE_DUPLICATE", "Hán tự '" + character + "' bị trùng lặp nhiều lần ngay trong file Excel."));
                hasError = true;
            } else {
                inFileDuplicates.add(inFileKey);
            }
        } else {
            String pattern = getCellValue(row.getCell(0));
            String meaning = getCellValue(row.getCell(1));
            String explanation = getCellValue(row.getCell(2));

            if (pattern.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "Pattern (*)", "pattern", "REQUIRED_FIELD_MISSING", "Mẫu ngữ pháp (Pattern) là trường bắt buộc."));
                hasError = true;
            }
            if (meaning.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "Meaning (*)", "meaning", "REQUIRED_FIELD_MISSING", "Ý nghĩa ngữ pháp là trường bắt buộc."));
                hasError = true;
            }
            if (explanation.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "Explanation (*)", "explanation", "REQUIRED_FIELD_MISSING", "Giải thích ngữ pháp là trường bắt buộc."));
                hasError = true;
            }

            String inFileKey = pattern.trim().toLowerCase();
            if (inFileDuplicates.contains(inFileKey)) {
                errors.add(new ImportError(job, rowNum, sheetName, "Pattern (*)", "pattern", "IN_FILE_DUPLICATE", "Mẫu ngữ pháp '" + pattern + "' bị trùng lặp nhiều lần ngay trong file Excel."));
                hasError = true;
            } else {
                inFileDuplicates.add(inFileKey);
            }
        }

        return hasError;
    }

    private boolean checkDbDuplicate(ImportJob job, Row row) {
        if (job.getFileType() == ImportType.VOCABULARY) {
            String word = getCellValue(row.getCell(0));
            String kana = getCellValue(row.getCell(1));
            return vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(job.getTargetLessonId(), "PUBLISHED").stream()
                    .anyMatch(v -> word.equalsIgnoreCase(v.getWord()) && kana.equalsIgnoreCase(v.getKana()));
        } else if (job.getFileType() == ImportType.KANJI) {
            String character = getCellValue(row.getCell(0));
            return kanjiRepository.findByCharacter(character).isPresent();
        } else {
            String pattern = getCellValue(row.getCell(0));
            return grammarPointRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(job.getTargetLessonId(), "PUBLISHED").stream()
                    .anyMatch(g -> pattern.equalsIgnoreCase(g.getPattern()));
        }
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return "";
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue().trim();
            case NUMERIC -> String.valueOf((long) cell.getNumericCellValue());
            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
            default -> "";
        };
    }

    private boolean isRowEmpty(Row row) {
        if (row == null) return true;
        for (int c = row.getFirstCellNum(); c < row.getLastCellNum(); c++) {
            Cell cell = row.getCell(c);
            if (cell != null && cell.getCellType() != CellType.BLANK && !getCellValue(cell).isEmpty()) {
                return false;
            }
        }
        return true;
    }
}
