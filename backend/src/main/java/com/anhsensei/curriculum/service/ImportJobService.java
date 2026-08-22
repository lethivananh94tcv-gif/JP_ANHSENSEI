package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.dto.ImportJobDto;
import com.anhsensei.curriculum.repository.ImportJobRepository;
import com.anhsensei.curriculum.repository.LessonRepository;
import com.anhsensei.curriculum.repository.LevelRepository;
import com.anhsensei.operations.service.AuditLogService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class ImportJobService {

    private final ImportJobRepository importJobRepository;
    private final LevelRepository levelRepository;
    private final LessonRepository lessonRepository;
    private final FileSecurityValidator fileSecurityValidator;
    private final AuditLogService auditLogService;

    public ImportJobService(
            ImportJobRepository importJobRepository,
            LevelRepository levelRepository,
            LessonRepository lessonRepository,
            FileSecurityValidator fileSecurityValidator,
            AuditLogService auditLogService
    ) {
        this.importJobRepository = importJobRepository;
        this.levelRepository = levelRepository;
        this.lessonRepository = lessonRepository;
        this.fileSecurityValidator = fileSecurityValidator;
        this.auditLogService = auditLogService;
    }

    @Transactional
    public ImportJobDto createImportJob(
            Long adminId,
            MultipartFile file,
            ImportType fileType,
            Long targetLevelId,
            Long targetLessonId,
            DuplicateMode duplicateMode,
            String ipAddress
    ) {
        // 1. Security & File Validation (BR-IMP-01)
        fileSecurityValidator.validateFile(file);

        // 2. Target Level Validation (BR-IMP-04)
        Level level = levelRepository.findById(targetLevelId)
                .orElseThrow(() -> new IllegalArgumentException("Trình độ (Level) ID không tồn tại: " + targetLevelId));
        if ("ARCHIVED".equalsIgnoreCase(level.getStatus())) {
            throw new IllegalArgumentException("Trình độ đã bị lưu trữ (ARCHIVED), không thể import.");
        }

        // Allow targetLessonId = 0 / null for Multi-Lesson Import (Automatic lesson number reading from Excel)
        if (targetLessonId != null && targetLessonId > 0) {
            Lesson lesson = lessonRepository.findById(targetLessonId).orElse(null);
            if (lesson != null) {
                if ("ARCHIVED".equalsIgnoreCase(lesson.getStatus())) {
                    throw new IllegalArgumentException("Bài học đã bị lưu trữ (ARCHIVED), không thể import.");
                }
                if (lesson.getLevel() == null || !targetLevelId.equals(lesson.getLevel().getLevelId())) {
                    throw new IllegalArgumentException("Bài học ID " + targetLessonId + " không thuộc Trình độ ID " + targetLevelId);
                }
            }
        }

        // 3. Save file securely
        String cleanFileName = fileSecurityValidator.sanitizeFilename(file.getOriginalFilename());
        String savedFilePath;
        try {
            Path uploadDir = Path.of("scratch", "uploads").toAbsolutePath();
            Files.createDirectories(uploadDir);
            Path destPath = uploadDir.resolve(System.currentTimeMillis() + "_" + cleanFileName);
            Files.copy(file.getInputStream(), destPath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
            savedFilePath = destPath.toString();
        } catch (IOException e) {
            throw new RuntimeException("Lỗi lưu trữ file upload: " + e.getMessage(), e);
        }

        // 4. Create & Save ImportJob
        ImportJob job = new ImportJob();
        job.setAdminId(adminId);
        job.setFileName(cleanFileName);
        job.setFilePath(savedFilePath);
        job.setFileType(fileType);
        job.setTemplateVersion("v1.0");
        job.setTargetLevelId(targetLevelId);
        Long safeLessonId = (targetLessonId != null && targetLessonId > 0) ? targetLessonId : 1L;
        job.setTargetLessonId(safeLessonId);
        job.setDuplicateMode(duplicateMode);
        job.setStatus(ImportJobStatus.UPLOADED);
        job.setTotalRows(0);
        job.setValidRows(0);
        job.setInvalidRows(0);
        job.setSkippedRows(0);

        ImportJob saved = importJobRepository.save(job);

        auditLogService.logAction(
                adminId,
                "IMPORT_JOB_CREATED",
                "ImportJob",
                saved.getImportJobId().toString(),
                null,
                "UPLOADED",
                ipAddress
        );

        return new ImportJobDto(saved);
    }

    public ImportJobDto getImportJobById(Long id) {
        ImportJob job = importJobRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy ImportJob có ID: " + id));
        return new ImportJobDto(job);
    }
}
