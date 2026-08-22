package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.dto.ImportJobDto;
import com.anhsensei.curriculum.repository.ImportErrorRepository;
import com.anhsensei.curriculum.repository.ImportJobRepository;
import com.anhsensei.curriculum.repository.KanjiRepository;
import com.anhsensei.curriculum.repository.VocabularyRepository;
import com.anhsensei.curriculum.repository.GrammarPointRepository;
import com.anhsensei.operations.service.AuditLogService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

        job.setStatus(ImportJobStatus.VALIDATING);
        importJobRepository.save(job);

        // Clear previous errors
        importErrorRepository.deleteByImportJob_ImportJobId(importJobId);

        List<ImportError> errorList = new ArrayList<>();
        int totalRows = 0;
        int validRows = 0;
        int invalidRows = 0;
        int skippedRows = 0;

        File excelFile = new File(job.getFilePath());
        if (!excelFile.exists()) {
            job.setStatus(ImportJobStatus.FAILED_TECHNICAL);
            importJobRepository.save(job);
            throw new IllegalArgumentException("File upload không còn tồn tại trên hệ thống.");
        }

        try (FileInputStream fis = new FileInputStream(excelFile); Workbook workbook = new XSSFWorkbook(fis)) {
            // Layer 1: Sheet & Header Validation
            String expectedSheet = getExpectedSheetName(job.getFileType());
            Sheet sheet = workbook.getSheet(expectedSheet);

            if (sheet == null) {
                // Fallback to first sheet
                sheet = workbook.getSheetAt(0);
                if (sheet == null) {
                    throw new IllegalArgumentException("Workbook không chứa sheet dữ liệu nào.");
                }
            }

            // Robust Header Row Locator: requires at least 2 column header matches and skips top note
            Row headerRow = null;
            for (int r = 0; r <= Math.min(5, sheet.getLastRowNum()); r++) {
                Row rCandidate = sheet.getRow(r);
                if (rCandidate != null) {
                    int headerMatches = 0;
                    for (int c = rCandidate.getFirstCellNum(); c < rCandidate.getLastCellNum(); c++) {
                        Cell cell = rCandidate.getCell(c);
                        if (cell != null) {
                            String val = getCellValue(cell).toLowerCase().trim();
                            if ((val.contains("word") || val.contains("kana") || val.contains("meaning") || val.contains("lessonnumber") || val.contains("character") || val.contains("pattern")) && !val.contains("mẫu import") && !val.contains("hướng dẫn")) {
                                headerMatches++;
                            }
                        }
                    }
                    if (headerMatches >= 2) {
                        headerRow = rCandidate;
                        break;
                    }
                }
            }

            if (headerRow == null) {
                headerRow = sheet.getRow(1);
                if (headerRow == null) headerRow = sheet.getRow(0);
            }

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
                int startRowIndex = (headerRow != null) ? headerRow.getRowNum() + 1 : 1;
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

                    boolean rowHasError = validateRowContent(job, sheet.getSheetName(), row, r + 1, errorList, inFileDuplicates, headerRow);
                    if (rowHasError) {
                        invalidRows++;
                    } else {
                        boolean dbDuplicate = checkDbDuplicate(job, row, headerRow);
                        if (dbDuplicate) {
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
        boolean hasWord = false;
        boolean hasKana = false;
        boolean hasMeaning = false;

        for (int c = headerRow.getFirstCellNum(); c < headerRow.getLastCellNum(); c++) {
            Cell cell = headerRow.getCell(c);
            if (cell != null) {
                String h = getCellValue(cell).toLowerCase();
                if (h.contains("word") || h.contains("từ vựng")) hasWord = true;
                if (h.contains("kana") || h.contains("phiên âm")) hasKana = true;
                if (h.contains("meaning") || h.contains("nghĩa") || h.contains("character") || h.contains("pattern")) hasMeaning = true;
            }
        }

        if (!hasWord && job.getFileType() == ImportType.VOCABULARY) {
            errors.add(new ImportError(job, headerRow.getRowNum() + 1, sheetName, "Word", "Header", "INVALID_HEADER", "Sheet thiếu cột Từ vựng (Word)."));
        }
        if (!hasMeaning) {
            errors.add(new ImportError(job, headerRow.getRowNum() + 1, sheetName, "Meaning", "Header", "INVALID_HEADER", "Sheet thiếu cột Nghĩa Tiếng Việt (Meaning)."));
        }
    }

    private boolean validateRowContent(ImportJob job, String sheetName, Row row, int rowNum, List<ImportError> errors, Set<String> inFileDuplicates, Row headerRow) {
        boolean hasError = false;

        if (job.getFileType() == ImportType.VOCABULARY) {
            int wordIdx = 0;
            int kanaIdx = 1;
            int meaningIdx = 3;

            if (headerRow != null) {
                for (int c = headerRow.getFirstCellNum(); c < headerRow.getLastCellNum(); c++) {
                    Cell cell = headerRow.getCell(c);
                    if (cell != null) {
                        String h = getCellValue(cell).toLowerCase();
                        if (h.contains("word") || h.contains("từ vựng")) wordIdx = c;
                        else if (h.contains("kana") || h.contains("phiên âm")) kanaIdx = c;
                        else if (h.contains("meaning") || h.contains("nghĩa")) meaningIdx = c;
                    }
                }
            }

            String word = getCellValue(row.getCell(wordIdx));
            String kana = getCellValue(row.getCell(kanaIdx));
            String meaningVi = getCellValue(row.getCell(meaningIdx));

            if (word.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "Word (*)", "word", "REQUIRED_FIELD_MISSING", "Từ vựng gốc (Word) là trường bắt buộc."));
                hasError = true;
            }
            if (meaningVi.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "MeaningVi (*)", "meaningVi", "REQUIRED_FIELD_MISSING", "Nghĩa tiếng Việt (MeaningVi) là trường bắt buộc."));
                hasError = true;
            }

            String inFileKey = word.toLowerCase() + "||" + kana.toLowerCase();
            if (inFileDuplicates.contains(inFileKey) && !word.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "Word/Kana", "word", "DUPLICATE_IN_FILE", "Từ vựng '" + word + "' (" + kana + ") bị trùng lặp trong cùng tệp."));
                hasError = true;
            } else {
                inFileDuplicates.add(inFileKey);
            }
        } else if (job.getFileType() == ImportType.KANJI) {
            int charIdx = 0;
            int meaningIdx = 3;
            if (headerRow != null) {
                for (int c = headerRow.getFirstCellNum(); c < headerRow.getLastCellNum(); c++) {
                    Cell cell = headerRow.getCell(c);
                    if (cell != null) {
                        String h = getCellValue(cell).toLowerCase();
                        if (h.contains("character") || h.contains("hán tự") || h.contains("ký tự")) charIdx = c;
                        else if (h.contains("meaning") || h.contains("nghĩa")) meaningIdx = c;
                    }
                }
            }

            String character = getCellValue(row.getCell(charIdx));
            String meaningVi = getCellValue(row.getCell(meaningIdx));

            if (character.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "Character (*)", "character", "REQUIRED_FIELD_MISSING", "Ký tự Hán tự (Character) là trường bắt buộc."));
                hasError = true;
            }
            if (meaningVi.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "MeaningVi (*)", "meaningVi", "REQUIRED_FIELD_MISSING", "Nghĩa tiếng Việt (MeaningVi) là trường bắt buộc."));
                hasError = true;
            }

            String inFileKey = character.toLowerCase();
            if (inFileDuplicates.contains(inFileKey) && !character.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "Character", "character", "DUPLICATE_IN_FILE", "Ký tự Hán tự '" + character + "' bị trùng lặp trong cùng tệp."));
                hasError = true;
            } else {
                inFileDuplicates.add(inFileKey);
            }
        } else {
            int patternIdx = 0;
            int meaningIdx = 1;
            int explanationIdx = 2;
            if (headerRow != null) {
                for (int c = headerRow.getFirstCellNum(); c < headerRow.getLastCellNum(); c++) {
                    Cell cell = headerRow.getCell(c);
                    if (cell != null) {
                        String h = getCellValue(cell).toLowerCase();
                        if (h.contains("pattern") || h.contains("mẫu")) patternIdx = c;
                        else if (h.contains("meaning") || h.contains("nghĩa") || h.contains("ý nghĩa")) meaningIdx = c;
                        else if (h.contains("explanation") || h.contains("giải thích")) explanationIdx = c;
                    }
                }
            }

            String pattern = getCellValue(row.getCell(patternIdx));
            String meaning = getCellValue(row.getCell(meaningIdx));
            String explanation = getCellValue(row.getCell(explanationIdx));

            if (pattern.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "Pattern (*)", "pattern", "REQUIRED_FIELD_MISSING", "Mẫu ngữ pháp (Pattern) là trường bắt buộc."));
                hasError = true;
            }
            if (meaning.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "Meaning (*)", "meaning", "REQUIRED_FIELD_MISSING", "Nghĩa mẫu ngữ pháp (Meaning) là trường bắt buộc."));
                hasError = true;
            }
            if (explanation.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "Explanation (*)", "explanation", "REQUIRED_FIELD_MISSING", "Giải thích ngữ pháp (Explanation) là trường bắt buộc."));
                hasError = true;
            }

            String inFileKey = pattern.toLowerCase();
            if (inFileDuplicates.contains(inFileKey) && !pattern.isEmpty()) {
                errors.add(new ImportError(job, rowNum, sheetName, "Pattern", "pattern", "DUPLICATE_IN_FILE", "Mẫu ngữ pháp '" + pattern + "' bị trùng lặp trong cùng tệp."));
                hasError = true;
            } else {
                inFileDuplicates.add(inFileKey);
            }
        }

        return hasError;
    }

    private boolean checkDbDuplicate(ImportJob job, Row row, Row headerRow) {
        if (job.getTargetLessonId() == null || job.getTargetLessonId() <= 0) {
            return false;
        }

        int wordIdx = 0;
        int kanaIdx = 1;

        if (headerRow != null) {
            for (int c = headerRow.getFirstCellNum(); c < headerRow.getLastCellNum(); c++) {
                Cell cell = headerRow.getCell(c);
                if (cell != null) {
                    String h = getCellValue(cell).toLowerCase();
                    if (h.contains("word") || h.contains("từ vựng")) wordIdx = c;
                    else if (h.contains("kana") || h.contains("phiên âm")) kanaIdx = c;
                }
            }
        }

        if (job.getFileType() == ImportType.VOCABULARY) {
            String word = getCellValue(row.getCell(wordIdx));
            String kana = getCellValue(row.getCell(kanaIdx));
            return vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(job.getTargetLessonId(), "PUBLISHED").stream()
                    .anyMatch(v -> word.equalsIgnoreCase(v.getWord()) && kana.equalsIgnoreCase(v.getKana()));
        } else if (job.getFileType() == ImportType.KANJI) {
            int charIdx = 0;
            if (headerRow != null) {
                for (int c = headerRow.getFirstCellNum(); c < headerRow.getLastCellNum(); c++) {
                    Cell cell = headerRow.getCell(c);
                    if (cell != null) {
                        String h = getCellValue(cell).toLowerCase();
                        if (h.contains("character") || h.contains("hán tự") || h.contains("ký tự")) charIdx = c;
                    }
                }
            }
            String character = getCellValue(row.getCell(charIdx));
            return kanjiRepository.findByCharacter(character).isPresent();
        } else {
            int patternIdx = 0;
            if (headerRow != null) {
                for (int c = headerRow.getFirstCellNum(); c < headerRow.getLastCellNum(); c++) {
                    Cell cell = headerRow.getCell(c);
                    if (cell != null) {
                        String h = getCellValue(cell).toLowerCase();
                        if (h.contains("pattern") || h.contains("mẫu")) patternIdx = c;
                    }
                }
            }
            String pattern = getCellValue(row.getCell(patternIdx));
            return grammarPointRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(job.getTargetLessonId(), "PUBLISHED").stream()
                    .anyMatch(g -> pattern.equalsIgnoreCase(g.getPattern()));
        }
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return "";
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue().trim();
            case NUMERIC -> {
                if (DateUtil.isCellDateFormatted(cell)) {
                    yield cell.getDateCellValue().toString();
                }
                double num = cell.getNumericCellValue();
                if (num == Math.floor(num)) {
                    yield String.valueOf((long) num);
                }
                yield String.valueOf(num);
            }
            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
            case FORMULA -> {
                try {
                    yield cell.getStringCellValue().trim();
                } catch (Exception e) {
                    yield String.valueOf((long) cell.getNumericCellValue());
                }
            }
            default -> "";
        };
    }

    private boolean isRowEmpty(Row row) {
        for (int c = row.getFirstCellNum(); c < row.getLastCellNum(); c++) {
            Cell cell = row.getCell(c);
            if (cell != null && cell.getCellType() != CellType.BLANK && !getCellValue(cell).isEmpty()) {
                return false;
            }
        }
        return true;
    }
}
