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

        // 2. Target Level & Target Lesson Validation (BR-IMP-04)
        Level level = levelRepository.findById(targetLevelId)
                .orElseThrow(() -> new IllegalArgumentException("Trình độ (Level) ID không tồn tại: " + targetLevelId));
        if ("ARCHIVED".equalsIgnoreCase(level.getStatus())) {
            throw new IllegalArgumentException("Trình độ đã bị lưu trữ (ARCHIVED), không thể import.");
        }

        Lesson lesson = lessonRepository.findById(targetLessonId)
                .orElseThrow(() -> new IllegalArgumentException("Bài học (Lesson) ID không tồn tại: " + targetLessonId));
        if ("ARCHIVED".equalsIgnoreCase(lesson.getStatus())) {
            throw new IllegalArgumentException("Bài học đã bị lưu trữ (ARCHIVED), không thể import.");
        }

        if (lesson.getLevel() == null || !targetLevelId.equals(lesson.getLevel().getLevelId())) {
            throw new IllegalArgumentException("Bài học ID " + targetLessonId + " không thuộc Trình độ ID " + targetLevelId);
        }

        // 3. Save file securely
        String cleanFileName = fileSecurityValidator.sanitizeFilename(file.getOriginalFilename());
        String savedFilePath;
        try {
            Path uploadDir = Path.of("scratch", "uploads");
            Files.createDirectories(uploadDir);
            Path destPath = uploadDir.resolve(System.currentTimeMillis() + "_" + cleanFileName);
            file.transferTo(destPath.toFile());
            savedFilePath = destPath.toAbsolutePath().toString();
        } catch (IOException e) {
            throw new RuntimeException("Lỗi lưu trữ file upload", e);
        }

        // 4. Create & Save ImportJob
        ImportJob job = new ImportJob();
        job.setAdminId(adminId);
        job.setFileName(cleanFileName);
        job.setFilePath(savedFilePath);
        job.setFileType(fileType);
        job.setTemplateVersion("v1.0");
        job.setTargetLevelId(targetLevelId);
        job.setTargetLessonId(targetLessonId);
        job.setDuplicateMode(duplicateMode != null ? duplicateMode : DuplicateMode.SKIP);
        job.setStatus(ImportJobStatus.UPLOADED);

        ImportJob saved = importJobRepository.save(job);

        // 5. Audit Log (BR-IMP-08)
        auditLogService.logAction(
                adminId,
                "IMPORT_JOB_UPLOADED",
                "ImportJob",
                saved.getImportJobId().toString(),
                null,
                "Uploaded file: " + cleanFileName + " (Type: " + fileType + ", TargetLesson: " + targetLessonId + ")",
                ipAddress
        );

        return new ImportJobDto(saved);
    }

    @Transactional(readOnly = true)
    public ImportJobDto getImportJobById(Long id) {
        ImportJob job = importJobRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy ImportJob có ID: " + id));
        return new ImportJobDto(job);
    }
}
