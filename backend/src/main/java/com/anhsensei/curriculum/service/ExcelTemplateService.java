package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.ImportType;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class ExcelTemplateService {

    public byte[] generateTemplate(ImportType type) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet;
            CellStyle headerStyle = createHeaderStyle(workbook);
            CellStyle noteStyle = createNoteStyle(workbook);

            if (type == ImportType.VOCABULARY) {
                sheet = workbook.createSheet("Vocabularies");
                Row noteRow = sheet.createRow(0);
                Cell noteCell = noteRow.createCell(0);
                noteCell.setCellValue("MẪU IMPORT TỪ VỰNG (BR-IMP-02) - Phiên bản v1.0. Các cột có dấu (*) là bắt buộc.");
                noteCell.setCellStyle(noteStyle);

                Row headerRow = sheet.createRow(1);
                String[] headers = {"Word (*)", "Kana (*)", "KanjiForm", "MeaningVi (*)", "PartOfSpeech", "Notes", "SortOrder"};
                for (int i = 0; i < headers.length; i++) {
                    Cell cell = headerRow.createCell(i);
                    cell.setCellValue(headers[i]);
                    cell.setCellStyle(headerStyle);
                    sheet.setColumnWidth(i, 20 * 256);
                }

                // Sample row
                Row sample = sheet.createRow(2);
                sample.createCell(0).setCellValue("私");
                sample.createCell(1).setCellValue("わたし");
                sample.createCell(2).setCellValue("私");
                sample.createCell(3).setCellValue("Tôi");
                sample.createCell(4).setCellValue("Danh từ");
                sample.createCell(5).setCellValue("Ví dụ mẫu");
                sample.createCell(6).setCellValue(1);
            } else if (type == ImportType.KANJI) {
                sheet = workbook.createSheet("Kanjis");
                Row noteRow = sheet.createRow(0);
                Cell noteCell = noteRow.createCell(0);
                noteCell.setCellValue("MẪU IMPORT HÁN TỰ (BR-IMP-02) - Phiên bản v1.0. Ký tự Kanji phải là duy nhất.");
                noteCell.setCellStyle(noteStyle);

                Row headerRow = sheet.createRow(1);
                String[] headers = {"Character (*)", "Onyomi", "Kunyomi", "MeaningVi (*)", "StrokeCount", "Radical", "Notes", "SortOrder"};
                for (int i = 0; i < headers.length; i++) {
                    Cell cell = headerRow.createCell(i);
                    cell.setCellValue(headers[i]);
                    cell.setCellStyle(headerStyle);
                    sheet.setColumnWidth(i, 20 * 256);
                }

                Row sample = sheet.createRow(2);
                sample.createCell(0).setCellValue("日");
                sample.createCell(1).setCellValue("ニチ, ジツ");
                sample.createCell(2).setCellValue("hi, ka");
                sample.createCell(3).setCellValue("Mặt trời, ngày");
                sample.createCell(4).setCellValue(4);
                sample.createCell(5).setCellValue("日");
                sample.createCell(6).setCellValue("Hán tự cơ bản");
                sample.createCell(7).setCellValue(1);
            } else {
                sheet = workbook.createSheet("GrammarPoints");
                Row noteRow = sheet.createRow(0);
                Cell noteCell = noteRow.createCell(0);
                noteCell.setCellValue("MẪU IMPORT NGỮ PHÁP (BR-IMP-02) - Phiên bản v1.0.");
                noteCell.setCellStyle(noteStyle);

                Row headerRow = sheet.createRow(1);
                String[] headers = {"Pattern (*)", "Meaning (*)", "Explanation (*)", "Structure", "ExampleJapanese", "ExampleReading", "ExampleMeaningVi", "SortOrder"};
                for (int i = 0; i < headers.length; i++) {
                    Cell cell = headerRow.createCell(i);
                    cell.setCellValue(headers[i]);
                    cell.setCellStyle(headerStyle);
                    sheet.setColumnWidth(i, 22 * 256);
                }

                Row sample = sheet.createRow(2);
                sample.createCell(0).setCellValue("～は～です");
                sample.createCell(1).setCellValue("N1 là N2");
                sample.createCell(2).setCellValue("Mẫu câu khẳng định cơ bản trong tiếng Nhật.");
                sample.createCell(3).setCellValue("N1 は N2 です");
                sample.createCell(4).setCellValue("わたしはたなかです。");
                sample.createCell(5).setCellValue("Watashi wa Tanaka desu.");
                sample.createCell(6).setCellValue("Tôi là Tanaka.");
                sample.createCell(7).setCellValue(1);
            }

            workbook.write(out);
            return out.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi sinh template Excel", e);
        }
    }

    private CellStyle createHeaderStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.WHITE.getIndex());
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.DARK_TEAL.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(HorizontalAlignment.CENTER);
        return style;
    }

    private CellStyle createNoteStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setItalic(true);
        font.setColor(IndexedColors.DARK_BLUE.getIndex());
        style.setFont(font);
        return style;
    }
}
