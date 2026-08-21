package com.anhsensei.curriculum.service;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Component
public class FileSecurityValidator {

    private static final long MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
    private static final String ALLOWED_EXTENSION = ".xlsx";

    public void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File upload không được để trống.");
        }

        // 1. File Size check
        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new IllegalArgumentException("Dung lượng file vượt quá giới hạn tối đa 10 MB.");
        }

        // 2. Filename and Extension check
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.toLowerCase().endsWith(ALLOWED_EXTENSION)) {
            throw new IllegalArgumentException("Chỉ chấp nhận file định dạng Excel .xlsx. Không chấp nhận file .xls, .docx hoặc .csv.");
        }

        // 3. File Signature Check (ZIP PK\x03\x04 for .xlsx)
        try (InputStream is = file.getInputStream()) {
            byte[] header = new byte[4];
            int read = is.read(header, 0, 4);
            if (read < 4 || header[0] != 0x50 || header[1] != 0x4B || header[2] != 0x03 || header[3] != 0x04) {
                throw new IllegalArgumentException("Nội dung file không hợp lệ hoặc bị giả mạo extension. Phải là file .xlsx hợp lệ.");
            }
        } catch (Exception e) {
            if (e instanceof IllegalArgumentException) throw (IllegalArgumentException) e;
            throw new IllegalArgumentException("Không thể đọc nội dung file upload.");
        }
    }

    public String sanitizeFilename(String filename) {
        if (filename == null) return "import_file.xlsx";
        // Strip directory path
        String baseName = new java.io.File(filename).getName();
        // Remove null bytes and path traversal ..
        baseName = baseName.replace("..", "_");
        String cleanName = baseName.replaceAll("[^a-zA-Z0-9._-]", "_");
        if (!cleanName.toLowerCase().endsWith(ALLOWED_EXTENSION)) {
            cleanName += ALLOWED_EXTENSION;
        }
        return cleanName;
    }
}
