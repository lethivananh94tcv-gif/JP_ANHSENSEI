package com.anhsensei.learning.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class JlptPdfImportService {

    private final ObjectMapper objectMapper;

    public JlptPdfImportService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public Map<String, Object> parsePdfFile(MultipartFile pdfFile) {
        File tempFile = null;
        try {
            String origName = pdfFile.getOriginalFilename();
            String prefix = origName != null && origName.length() > 3 ? origName.substring(0, 3) : "pdf";
            tempFile = File.createTempFile("jlpt_import_" + prefix, ".pdf");
            pdfFile.transferTo(tempFile);

            File scriptFile = new File("scripts/universal_jlpt_parser.py");
            if (!scriptFile.exists()) {
                scriptFile = new File("../scripts/universal_jlpt_parser.py");
            }
            String scriptPath = scriptFile.getAbsolutePath();
            String safeOrigName = origName != null ? origName : "unknown.pdf";
            ProcessBuilder pb = new ProcessBuilder("python", scriptPath, tempFile.getAbsolutePath(), safeOrigName);
            pb.redirectErrorStream(true);

            Process process = pb.start();

            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("Lỗi khi thực thi Python script (code " + exitCode + "): " + output);
            }

            String jsonOutput = output.toString().trim();
            int startMarker = jsonOutput.indexOf("===JSON_START===");
            int endMarker = jsonOutput.indexOf("===JSON_END===");
            if (startMarker >= 0 && endMarker > startMarker) {
                jsonOutput = jsonOutput.substring(startMarker + "===JSON_START===".length(), endMarker).trim();
            } else {
                int jsonStart = jsonOutput.indexOf("{");
                int jsonEnd = jsonOutput.lastIndexOf("}");
                if (jsonStart >= 0 && jsonEnd > jsonStart) {
                    jsonOutput = jsonOutput.substring(jsonStart, jsonEnd + 1);
                }
            }

            return objectMapper.readValue(jsonOutput, Map.class);
        } catch (Exception e) {
            Map<String, Object> errRes = new HashMap<>();
            errRes.put("status", "ERROR");
            errRes.put("error", "Không thể bóc tách file PDF: " + e.getMessage());
            return errRes;
        } finally {
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete();
            }
        }
    }

    public Map<String, Object> reprocessAllExistingExams() {
        try {
            File scriptFile = new File("scripts/reprocess_all_existing_exams.py");
            if (!scriptFile.exists()) {
                scriptFile = new File("../scripts/reprocess_all_existing_exams.py");
            }
            String scriptPath = scriptFile.getAbsolutePath();
            ProcessBuilder pb = new ProcessBuilder("python", scriptPath);
            pb.redirectErrorStream(true);

            Process process = pb.start();

            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }

            int exitCode = process.waitFor();
            Map<String, Object> response = new HashMap<>();
            response.put("exitCode", exitCode);
            response.put("output", output.toString());
            response.put("status", exitCode == 0 ? "SUCCESS" : "WARNING");
            return response;
        } catch (Exception e) {
            Map<String, Object> errRes = new HashMap<>();
            errRes.put("status", "ERROR");
            errRes.put("error", "Lỗi khi chạy Re-process cho tất cả bộ đề: " + e.getMessage());
            return errRes;
        }
    }
}
