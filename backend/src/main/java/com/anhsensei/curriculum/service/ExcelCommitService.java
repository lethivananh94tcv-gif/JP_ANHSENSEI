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
import java.util.List;
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

    @Transactional(rollbackFor = Exception.class)
    public ImportJobDto commitImportJob(Long adminId, Long importJobId, String ipAddress) {
        ImportJob job = importJobRepository.findById(importJobId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy ImportJob có ID: " + importJobId));

        if (adminId != null && !adminId.equals(1L) && !adminId.equals(job.getAdminId())) {
            throw new IllegalArgumentException("Admin không có quyền thao tác trên ImportJob này.");
        }

        // BR-IMP-06: Strict All-Or-Nothing Rule
        if (job.getStatus() != ImportJobStatus.READY_TO_COMMIT && job.getStatus() != ImportJobStatus.UPLOADED) {
            throw new IllegalArgumentException("Chỉ có thể Commit ImportJob ở trạng thái READY_TO_COMMIT / UPLOADED. Trạng thái hiện tại: " + job.getStatus());
        }

        job.setStatus(ImportJobStatus.COMMITTING);
        importJobRepository.save(job);

        Level targetLevel = levelRepository.findById(job.getTargetLevelId())
                .orElse(null);

        Lesson targetLesson = (job.getTargetLessonId() != null && job.getTargetLessonId() > 0)
                ? lessonRepository.findById(job.getTargetLessonId()).orElse(null)
                : null;

        File excelFile = new File(job.getFilePath());
        if (!excelFile.exists()) {
            job.setStatus(ImportJobStatus.FAILED_TECHNICAL);
            importJobRepository.save(job);
            throw new IllegalArgumentException("File upload không còn tồn tại.");
        }

        try (FileInputStream fis = new FileInputStream(excelFile); Workbook workbook = new XSSFWorkbook(fis)) {
            Sheet sheet = workbook.getSheetAt(0);

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

            // Dynamic Header Name Column Mapping
            int lessonColIdx = -1;
            int wordColIdx = 0;
            int kanaColIdx = 1;
            int kanjiColIdx = 2;
            int meaningColIdx = 3;
            int posColIdx = 4;
            int notesColIdx = 5;
            int sortColIdx = 6;

            if (headerRow != null) {
                for (int c = headerRow.getFirstCellNum(); c < headerRow.getLastCellNum(); c++) {
                    Cell cell = headerRow.getCell(c);
                    if (cell != null) {
                        String hText = getCellValue(cell).toLowerCase();
                        if (hText.contains("lesson") || hText.contains("bài") || hText.contains("baiso")) {
                            lessonColIdx = c;
                        } else if (hText.contains("word") || hText.contains("từ vựng")) {
                            wordColIdx = c;
                        } else if (hText.contains("kana") || hText.contains("phiên âm")) {
                            kanaColIdx = c;
                        } else if (hText.contains("kanji")) {
                            kanjiColIdx = c;
                        } else if (hText.contains("meaning") || hText.contains("nghĩa")) {
                            meaningColIdx = c;
                        } else if (hText.contains("partofspeech") || hText.contains("loại từ")) {
                            posColIdx = c;
                        } else if (hText.contains("note") || hText.contains("ghi chú")) {
                            notesColIdx = c;
                        } else if (hText.contains("sort") || hText.contains("thứ tự")) {
                            sortColIdx = c;
                        }
                    }
                }
            }

            int startRowIndex = (headerRow != null) ? headerRow.getRowNum() + 1 : 1;
            int lastRow = sheet.getLastRowNum();

            for (int r = startRowIndex; r <= lastRow; r++) {
                Row row = sheet.getRow(r);
                if (row == null || isRowEmpty(row)) continue;

                if (job.getFileType() == ImportType.VOCABULARY) {
                    commitVocabularyRow(job, targetLesson, row, lessonColIdx, wordColIdx, kanaColIdx, kanjiColIdx, meaningColIdx, posColIdx, notesColIdx, sortColIdx, headerRow);
                } else if (job.getFileType() == ImportType.KANJI) {
                    commitKanjiRow(job, targetLevel, targetLesson, row, headerRow);
                } else {
                    commitGrammarRow(job, targetLesson, row, headerRow);
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

        if (adminId != null && !adminId.equals(1L) && !adminId.equals(job.getAdminId())) {
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

    private int parseLessonNumber(String val) {
        if (val == null || val.isBlank()) return 0;
        try {
            return (int) Math.round(Double.parseDouble(val.trim()));
        } catch (Exception e) {
            String cleaned = val.replaceAll("[^0-9.]", "").trim();
            if (cleaned.contains(".")) {
                try {
                    return (int) Math.round(Double.parseDouble(cleaned));
                } catch (Exception ignored) {}
            }
            String digits = val.replaceAll("[^0-9]", "");
            return digits.isEmpty() ? 0 : Integer.parseInt(digits);
        }
    }

    private Lesson resolveActualLesson(ImportJob job, Lesson defaultLesson, Row row, Row headerRow) {
        if (headerRow != null && row != null) {
            int lessonColIdx = -1;
            for (int c = headerRow.getFirstCellNum(); c < headerRow.getLastCellNum(); c++) {
                Cell cell = headerRow.getCell(c);
                if (cell != null) {
                    String hText = getCellValue(cell).toLowerCase();
                    if (hText.contains("lesson") || hText.contains("bài") || hText.contains("baiso")) {
                        lessonColIdx = c;
                        break;
                    }
                }
            }
            if (lessonColIdx >= 0) {
                String lessonVal = getCellValue(row.getCell(lessonColIdx));
                if (!lessonVal.isEmpty()) {
                    try {
                        int lessonNum = parseLessonNumber(lessonVal);
                        if (lessonNum > 0) {
                            Optional<Lesson> matchedLesson = Optional.empty();
                            if (job.getTargetLevelId() != null && job.getTargetLevelId() > 0) {
                                List<Lesson> levelLessons = lessonRepository.findByLevel_LevelIdOrderBySortOrderAsc(job.getTargetLevelId());
                                matchedLesson = levelLessons.stream()
                                        .filter(l -> l.getTitle() != null && (
                                                l.getTitle().startsWith("Bài " + lessonNum + ":") ||
                                                l.getTitle().startsWith("Bài " + lessonNum + " ") ||
                                                l.getTitle().equals("Bài " + lessonNum)
                                        ))
                                        .findFirst();

                                if (matchedLesson.isEmpty()) {
                                    matchedLesson = levelLessons.stream()
                                            .filter(l -> l.getSortOrder() == lessonNum)
                                            .findFirst();
                                }

                                if (matchedLesson.isEmpty()) {
                                    Level targetLevel = levelRepository.findById(job.getTargetLevelId()).orElse(null);
                                    if (targetLevel != null) {
                                        Lesson newLesson = new Lesson();
                                        newLesson.setLevel(targetLevel);
                                        newLesson.setTitle("Bài " + lessonNum);
                                        newLesson.setSortOrder(lessonNum);
                                        newLesson.setStatus("PUBLISHED");
                                        newLesson.setPublishedAt(java.time.OffsetDateTime.now());
                                        newLesson.setCreatedBy(job.getAdminId());
                                        newLesson.setUpdatedBy(job.getAdminId());
                                        matchedLesson = Optional.of(lessonRepository.save(newLesson));
                                    }
                                }
                            }
                            if (matchedLesson.isPresent()) {
                                Lesson l = matchedLesson.get();
                                if (!"PUBLISHED".equalsIgnoreCase(l.getStatus())) {
                                    l.setStatus("PUBLISHED");
                                    lessonRepository.save(l);
                                }
                                return l;
                            }
                        }
                    } catch (Exception ignored) {}
                }
            }
        }

        if (defaultLesson != null) {
            if (!"PUBLISHED".equalsIgnoreCase(defaultLesson.getStatus())) {
                defaultLesson.setStatus("PUBLISHED");
                lessonRepository.save(defaultLesson);
            }
            return defaultLesson;
        }

        return null;
    }

    private void commitVocabularyRow(
            ImportJob job,
            Lesson defaultLesson,
            Row row,
            int lessonColIdx,
            int wordColIdx,
            int kanaColIdx,
            int kanjiColIdx,
            int meaningColIdx,
            int posColIdx,
            int notesColIdx,
            int sortColIdx,
            Row headerRow
    ) {
        String word = getCellValue(row.getCell(wordColIdx));
        String kana = getCellValue(row.getCell(kanaColIdx));
        String kanjiForm = getCellValue(row.getCell(kanjiColIdx));
        String meaningVi = getCellValue(row.getCell(meaningColIdx));
        String partOfSpeech = getCellValue(row.getCell(posColIdx));
        String notes = getCellValue(row.getCell(notesColIdx));
        Integer sortOrder = parseInteger(getCellValue(row.getCell(sortColIdx)), 1);

        if (word.isEmpty() && meaningVi.isEmpty()) return;

        Lesson actualLesson = resolveActualLesson(job, defaultLesson, row, headerRow);
        final Lesson targetLesson = actualLesson;
        Optional<Vocabulary> existingOpt = Optional.empty();

        if (targetLesson != null) {
            existingOpt = vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(targetLesson.getLessonId(), "PUBLISHED").stream()
                    .filter(v -> word.equalsIgnoreCase(v.getWord()) && kana.equalsIgnoreCase(v.getKana()))
                    .findFirst();
        }

        if (existingOpt.isPresent()) {
            if (job.getDuplicateMode() == DuplicateMode.UPDATE) {
                Vocabulary existing = existingOpt.get();
                if (!kanjiForm.isEmpty()) existing.setKanjiForm(kanjiForm);
                if (!meaningVi.isEmpty()) existing.setMeaningVi(meaningVi);
                if (!partOfSpeech.isEmpty()) existing.setPartOfSpeech(partOfSpeech);
                if (!notes.isEmpty()) existing.setNotes(notes);
                existing.setSortOrder(sortOrder);
                existing.setStatus("PUBLISHED");
                existing.setPublishedAt(java.time.OffsetDateTime.now());
                vocabularyRepository.save(existing);
            }
        } else {
            Vocabulary vocab = new Vocabulary();
            vocab.setLesson(targetLesson);
            vocab.setWord(word);
            vocab.setKana(kana.isEmpty() ? word : kana);
            vocab.setKanjiForm(kanjiForm.isEmpty() ? word : kanjiForm);
            vocab.setMeaningVi(meaningVi);
            vocab.setPartOfSpeech(partOfSpeech.isEmpty() ? "Danh từ" : partOfSpeech);
            vocab.setNotes(notes);
            vocab.setStatus("PUBLISHED");
            vocab.setPublishedAt(java.time.OffsetDateTime.now());
            vocab.setCreatedBy(job.getAdminId());
            vocab.setUpdatedBy(job.getAdminId());
            vocabularyRepository.save(vocab);
        }
    }

    private void commitKanjiRow(ImportJob job, Level targetLevel, Lesson targetLesson, Row row, Row headerRow) {
        int charIdx = 0;
        int onyomiIdx = 1;
        int kunyomiIdx = 2;
        int meaningIdx = 3;
        int strokeIdx = 4;
        int radicalIdx = 5;
        int notesIdx = 6;
        int sortIdx = 7;

        if (headerRow != null) {
            for (int c = headerRow.getFirstCellNum(); c < headerRow.getLastCellNum(); c++) {
                Cell cell = headerRow.getCell(c);
                if (cell != null) {
                    String h = getCellValue(cell).toLowerCase();
                    if (h.contains("character") || h.contains("hán tự") || h.contains("ký tự")) charIdx = c;
                    else if (h.contains("onyomi") || h.contains("âm ôn")) onyomiIdx = c;
                    else if (h.contains("kunyomi") || h.contains("âm khôn")) kunyomiIdx = c;
                    else if (h.contains("meaning") || h.contains("nghĩa")) meaningIdx = c;
                    else if (h.contains("stroke") || h.contains("nét")) strokeIdx = c;
                    else if (h.contains("radical") || h.contains("bộ thủ")) radicalIdx = c;
                    else if (h.contains("note") || h.contains("ghi chú")) notesIdx = c;
                    else if (h.contains("sort") || h.contains("thứ tự")) sortIdx = c;
                }
            }
        }

        String character = getCellValue(row.getCell(charIdx));
        String onyomi = getCellValue(row.getCell(onyomiIdx));
        String kunyomi = getCellValue(row.getCell(kunyomiIdx));
        String meaningVi = getCellValue(row.getCell(meaningIdx));
        Integer strokeCount = parseInteger(getCellValue(row.getCell(strokeIdx)), 4);
        String radical = getCellValue(row.getCell(radicalIdx));
        String notes = getCellValue(row.getCell(notesIdx));
        Integer sortOrder = parseInteger(getCellValue(row.getCell(sortIdx)), 1);

        Lesson actualLesson = resolveActualLesson(job, targetLesson, row, headerRow);

        Kanji kanji = kanjiRepository.findByCharacter(character)
                .orElseGet(() -> {
                    Kanji k = new Kanji();
                    k.setCharacter(character);
                    k.setOnyomi(onyomi);
                    k.setKunyomi(kunyomi);
                    k.setMeaningVi(meaningVi);
                    k.setStrokeCount(strokeCount);
                    k.setRadical(radical);
                    k.setStatus("PUBLISHED");
                    k.setPublishedAt(java.time.OffsetDateTime.now());
                    k.setCreatedBy(job.getAdminId());
                    k.setUpdatedBy(job.getAdminId());
                    return kanjiRepository.save(k);
                });

        if (actualLesson != null) {
            boolean alreadyMapped = lessonKanjiRepository.existsByLesson_LessonIdAndKanji_KanjiId(actualLesson.getLessonId(), kanji.getKanjiId());
            if (!alreadyMapped) {
                LessonKanji lk = new LessonKanji(actualLesson, kanji, sortOrder, notes);
                lessonKanjiRepository.save(lk);
            }
        }
    }

    private void commitGrammarRow(ImportJob job, Lesson targetLesson, Row row, Row headerRow) {
        int patternIdx = 0;
        int meaningIdx = 1;
        int explanationIdx = 2;
        int structureIdx = 3;
        int exJpIdx = 4;
        int exReadingIdx = 5;
        int exViIdx = 6;
        int sortIdx = 7;

        if (headerRow != null) {
            for (int c = headerRow.getFirstCellNum(); c < headerRow.getLastCellNum(); c++) {
                Cell cell = headerRow.getCell(c);
                if (cell != null) {
                    String h = getCellValue(cell).toLowerCase();
                    if (h.contains("pattern") || h.contains("mẫu")) patternIdx = c;
                    else if (h.contains("meaning") || h.contains("ý nghĩa") || h.contains("nghĩa")) meaningIdx = c;
                    else if (h.contains("explanation") || h.contains("giải thích")) explanationIdx = c;
                    else if (h.contains("structure") || h.contains("cấu trúc")) structureIdx = c;
                    else if (h.contains("examplejapanese") || h.contains("ví dụ tiếng nhật")) exJpIdx = c;
                    else if (h.contains("examplereading") || h.contains("phiên âm ví dụ")) exReadingIdx = c;
                    else if (h.contains("examplemeaningvi") || h.contains("nghĩa ví dụ")) exViIdx = c;
                    else if (h.contains("sort") || h.contains("thứ tự")) sortIdx = c;
                }
            }
        }

        String pattern = getCellValue(row.getCell(patternIdx));
        String meaning = getCellValue(row.getCell(meaningIdx));
        String explanation = getCellValue(row.getCell(explanationIdx));
        String structure = getCellValue(row.getCell(structureIdx));
        String exJp = getCellValue(row.getCell(exJpIdx));
        String exReading = getCellValue(row.getCell(exReadingIdx));
        String exVi = getCellValue(row.getCell(exViIdx));
        Integer sortOrder = parseInteger(getCellValue(row.getCell(sortIdx)), 1);

        Lesson actualLesson = resolveActualLesson(job, targetLesson, row, headerRow);

        GrammarPoint grammar = new GrammarPoint();
        grammar.setLesson(actualLesson);
        grammar.setPattern(pattern);
        grammar.setMeaning(meaning);
        grammar.setExplanation(explanation);
        grammar.setStructure(structure);
        grammar.setJlptLevel(actualLesson != null && actualLesson.getLevel() != null ? actualLesson.getLevel().getCode() : "N5");
        grammar.setSortOrder(sortOrder);
        grammar.setStatus("PUBLISHED");
        grammar.setPublishedAt(java.time.OffsetDateTime.now());
        grammar.setCreatedBy(job.getAdminId());
        grammar.setUpdatedBy(job.getAdminId());

        GrammarPoint savedGrammar = grammarPointRepository.save(grammar);

        if (!exJp.isEmpty()) {
            GrammarExample example = new GrammarExample();
            example.setGrammarId(savedGrammar.getGrammarId());
            example.setJapaneseText(exJp);
            example.setReading(exReading);
            example.setMeaningVi(exVi);
            example.setSortOrder(1);
            grammarExampleRepository.save(example);
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

    private Integer parseInteger(String val, int defaultVal) {
        if (val == null || val.isBlank()) return defaultVal;
        try {
            return (int) Math.round(Double.parseDouble(val.trim()));
        } catch (Exception e) {
            try {
                String digits = val.replaceAll("[^0-9]", "");
                return digits.isEmpty() ? defaultVal : Integer.parseInt(digits);
            } catch (Exception ignored) {
                return defaultVal;
            }
        }
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
