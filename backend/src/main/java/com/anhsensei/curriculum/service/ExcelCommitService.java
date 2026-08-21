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
import java.util.Optional;

@Service
public class ExcelCommitService {

    private final ImportJobRepository importJobRepository;
    private final LevelRepository levelRepository;
    private final LessonRepository lessonRepository;
    private final VocabularyRepository vocabularyRepository;
    private final KanjiRepository kanjiRepository;
    private final LessonKanjiRepository lessonKanjiRepository;
    private final GrammarPointRepository grammarPointRepository;
    private final GrammarExampleRepository grammarExampleRepository;
    private final AuditLogService auditLogService;

    public ExcelCommitService(
            ImportJobRepository importJobRepository,
            LevelRepository levelRepository,
            LessonRepository lessonRepository,
            VocabularyRepository vocabularyRepository,
            KanjiRepository kanjiRepository,
            LessonKanjiRepository lessonKanjiRepository,
            GrammarPointRepository grammarPointRepository,
            GrammarExampleRepository grammarExampleRepository,
            AuditLogService auditLogService
    ) {
        this.importJobRepository = importJobRepository;
        this.levelRepository = levelRepository;
        this.lessonRepository = lessonRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.kanjiRepository = kanjiRepository;
        this.lessonKanjiRepository = lessonKanjiRepository;
        this.grammarPointRepository = grammarPointRepository;
        this.grammarExampleRepository = grammarExampleRepository;
        this.auditLogService = auditLogService;
    }

    @Transactional
    public ImportJobDto commitImportJob(Long adminId, Long importJobId, String ipAddress) {
        ImportJob job = importJobRepository.findById(importJobId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy ImportJob có ID: " + importJobId));

        if (!adminId.equals(job.getAdminId())) {
            throw new IllegalArgumentException("Admin không có quyền thao tác trên ImportJob này.");
        }

        // BR-IMP-06: Strict All-Or-Nothing Rule
        if (job.getStatus() != ImportJobStatus.READY_TO_COMMIT) {
            throw new IllegalArgumentException("Chỉ có thể Commit ImportJob ở trạng thái READY_TO_COMMIT. Trạng thái hiện tại: " + job.getStatus());
        }

        if (job.getInvalidRows() > 0) {
            throw new IllegalArgumentException("Không thể Commit file Excel còn chứa " + job.getInvalidRows() + " dòng lỗi. Quy tắc BR-IMP-06 yêu cầu All-or-Nothing (InvalidRows = 0).");
        }

        job.setStatus(ImportJobStatus.COMMITTING);
        importJobRepository.save(job);

        Level targetLevel = levelRepository.findById(job.getTargetLevelId())
                .orElseThrow(() -> new IllegalArgumentException("Level ID không tồn tại: " + job.getTargetLevelId()));

        Lesson targetLesson = lessonRepository.findById(job.getTargetLessonId())
                .orElseThrow(() -> new IllegalArgumentException("Lesson ID không tồn tại: " + job.getTargetLessonId()));

        File excelFile = new File(job.getFilePath());
        if (!excelFile.exists()) {
            job.setStatus(ImportJobStatus.FAILED_TECHNICAL);
            importJobRepository.save(job);
            throw new IllegalArgumentException("File upload không còn tồn tại.");
        }

        try (FileInputStream fis = new FileInputStream(excelFile); Workbook workbook = new XSSFWorkbook(fis)) {
            Sheet sheet = workbook.getSheetAt(0);
            Row headerRow = sheet.getRow(1);
            int startRowIndex = (headerRow != null && headerRow.getRowNum() == 0) ? 1 : 2;
            int lastRow = sheet.getLastRowNum();

            for (int r = startRowIndex; r <= lastRow; r++) {
                Row row = sheet.getRow(r);
                if (row == null || isRowEmpty(row)) continue;

                if (job.getFileType() == ImportType.VOCABULARY) {
                    commitVocabularyRow(job, targetLesson, row);
                } else if (job.getFileType() == ImportType.KANJI) {
                    commitKanjiRow(job, targetLevel, targetLesson, row);
                } else {
                    commitGrammarRow(job, targetLesson, row);
                }
            }

            job.setStatus(ImportJobStatus.COMPLETED);
            ImportJob completedJob = importJobRepository.save(job);

            auditLogService.logAction(
                    adminId,
                    "IMPORT_JOB_COMMITTED",
                    "ImportJob",
                    importJobId.toString(),
                    "READY_TO_COMMIT",
                    "Committed job ID " + importJobId + ": Type=" + job.getFileType() + ", ValidRows=" + job.getValidRows() + ", SkippedRows=" + job.getSkippedRows(),
                    ipAddress
            );

            return new ImportJobDto(completedJob);
        } catch (Exception e) {
            job.setStatus(ImportJobStatus.FAILED_TECHNICAL);
            importJobRepository.save(job);
            if (e instanceof IllegalArgumentException) throw (IllegalArgumentException) e;
            throw new RuntimeException("Lỗi trong quá trình commit dữ liệu: " + e.getMessage(), e);
        }
    }

    @Transactional
    public ImportJobDto cancelImportJob(Long adminId, Long importJobId, String ipAddress) {
        ImportJob job = importJobRepository.findById(importJobId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy ImportJob có ID: " + importJobId));

        if (!adminId.equals(job.getAdminId())) {
            throw new IllegalArgumentException("Admin không có quyền thao tác trên ImportJob này.");
        }

        if (job.getStatus() == ImportJobStatus.COMMITTING || job.getStatus() == ImportJobStatus.COMPLETED) {
            throw new IllegalArgumentException("Không thể hủy ImportJob đã hoặc đang Commit.");
        }

        String oldStatus = job.getStatus().name();
        job.setStatus(ImportJobStatus.CANCELLED);
        ImportJob cancelled = importJobRepository.save(job);

        auditLogService.logAction(
                adminId,
                "IMPORT_JOB_CANCELLED",
                "ImportJob",
                importJobId.toString(),
                oldStatus,
                "CANCELLED",
                ipAddress
        );

        return new ImportJobDto(cancelled);
    }

    private void commitVocabularyRow(ImportJob job, Lesson targetLesson, Row row) {
        String word = getCellValue(row.getCell(0));
        String kana = getCellValue(row.getCell(1));
        String kanjiForm = getCellValue(row.getCell(2));
        String meaningVi = getCellValue(row.getCell(3));
        String partOfSpeech = getCellValue(row.getCell(4));
        String notes = getCellValue(row.getCell(5));
        Integer sortOrder = parseInteger(getCellValue(row.getCell(6)), 1);

        Optional<Vocabulary> existingOpt = vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(targetLesson.getLessonId(), "PUBLISHED").stream()
                .filter(v -> word.equalsIgnoreCase(v.getWord()) && kana.equalsIgnoreCase(v.getKana()))
                .findFirst();

        if (existingOpt.isPresent()) {
            if (job.getDuplicateMode() == DuplicateMode.UPDATE) {
                Vocabulary existing = existingOpt.get();
                if (!kanjiForm.isEmpty()) existing.setKanjiForm(kanjiForm);
                if (!meaningVi.isEmpty()) existing.setMeaningVi(meaningVi);
                if (!partOfSpeech.isEmpty()) existing.setPartOfSpeech(partOfSpeech);
                if (!notes.isEmpty()) existing.setNotes(notes);
                existing.setSortOrder(sortOrder);
                vocabularyRepository.save(existing);
            }
            // SKIP mode ignores existing record
        } else {
            Vocabulary vocab = new Vocabulary();
            vocab.setLesson(targetLesson);
            vocab.setWord(word);
            vocab.setKana(kana);
            vocab.setKanjiForm(kanjiForm.isEmpty() ? word : kanjiForm);
            vocab.setMeaningVi(meaningVi);
            vocab.setPartOfSpeech(partOfSpeech.isEmpty() ? "Danh từ" : partOfSpeech);
            vocab.setNotes(notes);
            vocab.setSortOrder(sortOrder);
            vocab.setStatus("DRAFT"); // BR-IMP-06: New entries always DRAFT
            vocab.setCreatedBy(job.getAdminId());
            vocab.setUpdatedBy(job.getAdminId());
            vocabularyRepository.save(vocab);
        }
    }

    private void commitKanjiRow(ImportJob job, Level targetLevel, Lesson targetLesson, Row row) {
        String character = getCellValue(row.getCell(0));
        String onyomi = getCellValue(row.getCell(1));
        String kunyomi = getCellValue(row.getCell(2));
        String meaningVi = getCellValue(row.getCell(3));
        Integer strokeCount = parseInteger(getCellValue(row.getCell(4)), 0);
        String radical = getCellValue(row.getCell(5));
        String notes = getCellValue(row.getCell(6));
        Integer sortOrder = parseInteger(getCellValue(row.getCell(7)), 1);

        Optional<Kanji> existingOpt = kanjiRepository.findByCharacter(character);
        Kanji kanji;

        if (existingOpt.isPresent()) {
            kanji = existingOpt.get();
            if (job.getDuplicateMode() == DuplicateMode.UPDATE) {
                if (!onyomi.isEmpty()) kanji.setOnyomi(onyomi);
                if (!kunyomi.isEmpty()) kanji.setKunyomi(kunyomi);
                if (!meaningVi.isEmpty()) kanji.setMeaningVi(meaningVi);
                if (strokeCount > 0) kanji.setStrokeCount(strokeCount);
                if (!radical.isEmpty()) kanji.setRadical(radical);
                kanjiRepository.save(kanji);
            }
        } else {
            kanji = new Kanji();
            kanji.setCharacter(character);
            kanji.setOnyomi(onyomi);
            kanji.setKunyomi(kunyomi);
            kanji.setMeaningVi(meaningVi);
            kanji.setStrokeCount(strokeCount);
            kanji.setRadical(radical);
            kanji.setJlptLevel(targetLevel.getCode());
            kanji.setStatus("DRAFT"); // BR-IMP-06: Always DRAFT
            kanji.setCreatedBy(job.getAdminId());
            kanji.setUpdatedBy(job.getAdminId());
            kanji = kanjiRepository.save(kanji);
        }

        // Link Kanji to Lesson via lesson_kanji table
        LessonKanjiId lessonKanjiId = new LessonKanjiId(targetLesson.getLessonId(), kanji.getKanjiId());
        if (!lessonKanjiRepository.existsById(lessonKanjiId)) {
            LessonKanji lessonKanji = new LessonKanji();
            lessonKanji.setId(lessonKanjiId);
            lessonKanji.setLesson(targetLesson);
            lessonKanji.setKanji(kanji);
            lessonKanji.setSortOrder(sortOrder);
            lessonKanji.setNotes(notes);
            lessonKanjiRepository.save(lessonKanji);
        }
    }

    private void commitGrammarRow(ImportJob job, Lesson targetLesson, Row row) {
        String pattern = getCellValue(row.getCell(0));
        String meaning = getCellValue(row.getCell(1));
        String explanation = getCellValue(row.getCell(2));
        String structure = getCellValue(row.getCell(3));
        String exJp = getCellValue(row.getCell(4));
        String exFurigana = getCellValue(row.getCell(5));
        String exMeaningVi = getCellValue(row.getCell(6));
        Integer sortOrder = parseInteger(getCellValue(row.getCell(7)), 1);

        Optional<GrammarPoint> existingOpt = grammarPointRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(targetLesson.getLessonId(), "PUBLISHED").stream()
                .filter(g -> pattern.equalsIgnoreCase(g.getPattern()))
                .findFirst();

        GrammarPoint grammarPoint;
        if (existingOpt.isPresent()) {
            grammarPoint = existingOpt.get();
            if (job.getDuplicateMode() == DuplicateMode.UPDATE) {
                if (!meaning.isEmpty()) grammarPoint.setMeaning(meaning);
                if (!explanation.isEmpty()) grammarPoint.setExplanation(explanation);
                if (!structure.isEmpty()) grammarPoint.setStructure(structure);
                grammarPoint.setSortOrder(sortOrder);
                grammarPointRepository.save(grammarPoint);
            }
        } else {
            grammarPoint = new GrammarPoint();
            grammarPoint.setLesson(targetLesson);
            grammarPoint.setPattern(pattern);
            grammarPoint.setMeaning(meaning);
            grammarPoint.setExplanation(explanation);
            grammarPoint.setStructure(structure);
            grammarPoint.setJlptLevel(targetLesson.getLevel() != null ? targetLesson.getLevel().getCode() : "N5");
            grammarPoint.setSortOrder(sortOrder);
            grammarPoint.setStatus("DRAFT"); // Always DRAFT
            grammarPoint.setCreatedBy(job.getAdminId());
            grammarPoint.setUpdatedBy(job.getAdminId());
            grammarPoint = grammarPointRepository.save(grammarPoint);
        }

        // Polymorphic example sentence linking to GrammarPoint
        if (!exJp.isEmpty()) {
            GrammarExample example = new GrammarExample();
            example.setContentType("GRAMMAR");
            example.setGrammarId(grammarPoint.getGrammarId());
            example.setJapaneseText(exJp);
            example.setReading(exFurigana);
            example.setMeaningVi(exMeaningVi);
            example.setSortOrder(1);
            grammarExampleRepository.save(example);
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

    private Integer parseInteger(String val, int defaultVal) {
        try {
            return Integer.parseInt(val);
        } catch (Exception e) {
            return defaultVal;
        }
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
