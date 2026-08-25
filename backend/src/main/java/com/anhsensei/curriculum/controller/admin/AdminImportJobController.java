package com.anhsensei.curriculum.controller.admin;

import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.curriculum.domain.DuplicateMode;
import com.anhsensei.curriculum.domain.ImportType;
import com.anhsensei.curriculum.dto.ImportErrorDto;
import com.anhsensei.curriculum.dto.ImportJobDto;
import com.anhsensei.curriculum.repository.ImportErrorRepository;
import com.anhsensei.curriculum.service.ExcelCommitService;
import com.anhsensei.curriculum.service.ExcelValidationService;
import com.anhsensei.curriculum.service.ImportJobService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping({"/admin/import-jobs", "/api/v1/admin/import-jobs"})
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "*")
public class AdminImportJobController {

    private final ImportJobService importJobService;
    private final ExcelValidationService excelValidationService;
    private final ExcelCommitService excelCommitService;
    private final ImportErrorRepository importErrorRepository;

    public AdminImportJobController(
            ImportJobService importJobService,
            ExcelValidationService excelValidationService,
            ExcelCommitService excelCommitService,
            ImportErrorRepository importErrorRepository
    ) {
        this.importJobService = importJobService;
        this.excelValidationService = excelValidationService;
        this.excelCommitService = excelCommitService;
        this.importErrorRepository = importErrorRepository;
    }

    private Long requireAdminId(UserPrincipal userPrincipal) {
        if (userPrincipal == null || userPrincipal.getUserId() == null) {
            throw new org.springframework.security.access.AccessDeniedException("Yêu cầu xác thực tài khoản Admin.");
        }
        return userPrincipal.getUserId();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ImportJobDto> createImportJob(
            @RequestParam("file") MultipartFile file,
            @RequestParam("fileType") String fileTypeStr,
            @RequestParam("targetLevelId") Long targetLevelId,
            @RequestParam("targetLessonId") Long targetLessonId,
            @RequestParam(value = "duplicateMode", defaultValue = "SKIP") String duplicateModeStr,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            HttpServletRequest httpRequest
    ) {
        Long adminId = requireAdminId(userPrincipal);

        ImportType fileType;
        try {
            fileType = ImportType.valueOf(fileTypeStr.toUpperCase());
        } catch (Exception e) {
            throw new IllegalArgumentException("Loại fileType không hợp lệ: " + fileTypeStr);
        }

        DuplicateMode duplicateMode;
        try {
            if ("OVERWRITE".equalsIgnoreCase(duplicateModeStr)) {
                duplicateMode = DuplicateMode.UPDATE;
            } else {
                duplicateMode = DuplicateMode.valueOf(duplicateModeStr.toUpperCase());
            }
        } catch (Exception e) {
            duplicateMode = DuplicateMode.UPDATE;
        }

        ImportJobDto created = importJobService.createImportJob(
                adminId,
                file,
                fileType,
                targetLevelId,
                targetLessonId,
                duplicateMode,
                httpRequest.getRemoteAddr()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImportJobDto> getImportJobById(@PathVariable("id") Long id) {
        ImportJobDto dto = importJobService.getImportJobById(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/{id}/validate")
    public ResponseEntity<ImportJobDto> validateImportJob(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            HttpServletRequest httpRequest
    ) {
        Long adminId = requireAdminId(userPrincipal);
        ImportJobDto validated = excelValidationService.validateImportJob(adminId, id, httpRequest.getRemoteAddr());
        return ResponseEntity.ok(validated);
    }

    @GetMapping("/{id}/errors")
    public ResponseEntity<Page<ImportErrorDto>> getImportErrors(
            @PathVariable("id") Long id,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "20") int size
    ) {
        Page<ImportErrorDto> dtoPage = importErrorRepository.findByImportJob_ImportJobIdOrderByRowNumberAsc(id, PageRequest.of(page, size))
                .map(ImportErrorDto::new);
        return ResponseEntity.ok(dtoPage);
    }

    @PostMapping("/{id}/commit")
    public ResponseEntity<ImportJobDto> commitImportJob(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            HttpServletRequest httpRequest
    ) {
        Long adminId = requireAdminId(userPrincipal);
        ImportJobDto committed = excelCommitService.commitImportJob(adminId, id, httpRequest.getRemoteAddr());
        return ResponseEntity.ok(committed);
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<ImportJobDto> cancelImportJob(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            HttpServletRequest httpRequest
    ) {
        Long adminId = requireAdminId(userPrincipal);
        ImportJobDto cancelled = excelCommitService.cancelImportJob(adminId, id, httpRequest.getRemoteAddr());
        return ResponseEntity.ok(cancelled);
    }
}
