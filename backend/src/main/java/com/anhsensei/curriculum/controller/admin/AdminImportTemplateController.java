package com.anhsensei.curriculum.controller.admin;

import com.anhsensei.curriculum.domain.ImportType;
import com.anhsensei.curriculum.service.ExcelTemplateService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/import-templates")
@PreAuthorize("hasRole('ADMIN')")
public class AdminImportTemplateController {

    private final ExcelTemplateService excelTemplateService;

    public AdminImportTemplateController(ExcelTemplateService excelTemplateService) {
        this.excelTemplateService = excelTemplateService;
    }

    @GetMapping("/{type}")
    public ResponseEntity<byte[]> downloadTemplate(@PathVariable("type") String typeStr) {
        ImportType type;
        try {
            type = ImportType.valueOf(typeStr.toUpperCase());
        } catch (Exception e) {
            throw new IllegalArgumentException("Loại ImportType không hợp lệ: " + typeStr + ". Phải là VOCABULARY, KANJI, hoặc GRAMMAR.");
        }

        byte[] excelBytes = excelTemplateService.generateTemplate(type);
        String filename = "template_" + type.name().toLowerCase() + ".xlsx";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelBytes);
    }
}
