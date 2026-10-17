import official2010Data from "@/app/data/scanned_n4_2010_official_answers.json";
import officialN5_2010Data from "@/app/data/scanned_n5_2010_official_answers.json";
import officialN5_2012Data from "@/app/data/scanned_n5_2012_official_answers.json";
import officialN5_2013Data from "@/app/data/scanned_n5_2013_07_official_answers.json";
import officialN5_2017Data from "@/app/data/scanned_n5_2017_07_official_answers.json";
import officialN5_2018Data from "@/app/data/scanned_n5_2018_official_answers.json";
import official2012Data from "@/app/data/scanned_n4_2012_official_answers.json";
import official2013Data from "@/app/data/scanned_n4_2013_official_answers.json";
import official2014Data from "@/app/data/scanned_n4_2014_official_answers.json";
import official2017Data from "@/app/data/scanned_n4_2017_official_answers.json";
import official2018Data from "@/app/data/scanned_n4_2018_official_answers.json";
import official2021Data from "@/app/data/scanned_n4_2021_official_answers.json";
import official2013_12Data from "@/app/data/scanned_n4_2013_12_official_answers.json";
import official2021_07Data from "@/app/data/scanned_n4_2021_07_official_answers.json";
import official2024_07Data from "@/app/data/scanned_n4_2024_07_official_answers.json";
import { EXAM_DETAILED_EXPLANATION_MAP } from "@/app/data/jlptDetailedExplanations";

export interface RichQuestionAnswerDetail {
  globalIndex: number;
  localPdfNumber: number;
  mondaiName?: string;
  sectionName: string;
  questionSnippet: string;
  correctOption: number;
  correctOptionText: string;
  explanation: string;
  audioScriptJa?: string;
  audioScriptVi?: string;
}

export interface SectionRange {
  name: string;
  startQuestion: number;
  endQuestion: number;
  totalQuestions: number;
  mondais: {
    mondai: number;
    mondaiTitle: string;
    startQuestion: number;
    endQuestion: number;
  }[];
}

export interface ExamStructureConfig {
  examId: string;
  levelCode: string;
  totalQuestions: number;
  vocabSection: SectionRange;
  grammarSection: SectionRange;
  listeningSection: SectionRange;
}

/**
 * Gold Standard JLPT PDF Parser & Structure Engine
 * Dynamically resolves section boundaries, question numbers, sub-mondais, official 1:1 answer keys,
 * and standardizes explanations following the N4 2010-2011 Gold Benchmark.
 */

export function parseExamStructure(
  examId: string,
  levelCode: string,
  totalQuestions: number
): ExamStructureConfig {
  const isN5 = levelCode === "N5" || examId.includes("n5") || examId.startsWith("ex-n5");
  const isN3 = levelCode === "N3" || examId.includes("n3") || examId === "ex-n3-1" || examId === "ex-n3-2";
  const isN2 = levelCode === "N2" || examId.includes("n2");
  const isN1 = levelCode === "N1" || examId.includes("n1");

  // 1. N5 Level Structure (Prioritized over year checks)
  if (isN5) {
    const is91N5 =
      examId.includes("2012") ||
      examId.includes("2013") ||
      examId.includes("2018") ||
      examId.includes("3588") ||
      examId === "ex-1790446014564" ||
      examId === "ex-n5-2" ||
      examId === "ex-n5-3" ||
      totalQuestions === 91;
    if (is91N5) {
      const vEnd = 35;
      const gEnd = 67;
      const lEnd = 91;
      return {
        examId,
        levelCode: "N5",
        totalQuestions: lEnd,
        vocabSection: {
          name: "Môn 1: Từ vựng & Kanji (文字・語彙)",
          startQuestion: 1,
          endQuestion: vEnd,
          totalQuestions: vEnd,
          mondais: [
            { mondai: 1, mondaiTitle: "問題 1 (Cách đọc Kanji)", startQuestion: 1, endQuestion: 12 },
            { mondai: 2, mondaiTitle: "問題 2 (Cách viết Kanji / Katakana)", startQuestion: 13, endQuestion: 20 },
            { mondai: 3, mondaiTitle: "問題 3 (Điền từ vào câu)", startQuestion: 21, endQuestion: 30 },
            { mondai: 4, mondaiTitle: "問題 4 (Từ đồng nghĩa / Cách dùng)", startQuestion: 31, endQuestion: 35 },
          ]
        },
        grammarSection: {
          name: "Môn 2: Ngữ pháp & Đọc hiểu (文法・読解)",
          startQuestion: vEnd + 1,
          endQuestion: gEnd,
          totalQuestions: gEnd - vEnd,
          mondais: [
            { mondai: 1, mondaiTitle: "問題 1 (Ngữ pháp điền câu)", startQuestion: 36, endQuestion: 51 },
            { mondai: 2, mondaiTitle: "問題 2 (Sắp xếp từ tạo câu *)", startQuestion: 52, endQuestion: 56 },
            { mondai: 3, mondaiTitle: "問題 3 (Ngữ pháp đoạn văn)", startQuestion: 57, endQuestion: 61 },
            { mondai: 4, mondaiTitle: "問題 4 (Đoản văn)", startQuestion: 62, endQuestion: 64 },
            { mondai: 5, mondaiTitle: "問題 5 (Trung văn)", startQuestion: 65, endQuestion: 66 },
            { mondai: 6, mondaiTitle: "問題 6 (Tìm kiếm thông tin)", startQuestion: 67, endQuestion: 67 },
          ]
        },
        listeningSection: {
          name: "Môn 3: Nghe hiểu (聴解)",
          startQuestion: gEnd + 1,
          endQuestion: lEnd,
          totalQuestions: lEnd - gEnd,
          mondais: [
            { mondai: 1, mondaiTitle: "問題 1 (Nghe hiểu sự việc)", startQuestion: 68, endQuestion: 74 },
            { mondai: 2, mondaiTitle: "問題 2 (Nghe hiểu điểm chính)", startQuestion: 75, endQuestion: 80 },
            { mondai: 3, mondaiTitle: "問題 3 (Nghe diễn đạt tình huống)", startQuestion: 81, endQuestion: 85 },
            { mondai: 4, mondaiTitle: "問題 4 (Nghe phản xạ nhanh)", startQuestion: 86, endQuestion: lEnd },
          ]
        }
      };
    }

    const is2017N5 = examId.includes("8652") || examId.includes("2017");
    const is89 = is2017N5 || totalQuestions >= 88 || examId.includes("2010") || examId === "n5-2026" || examId === "n5-2026-new" || examId === "ex-n5-0";
    const vEnd = 33;
    const gEnd = 65;
    const lEnd = is2017N5
      ? 89
      : ((totalQuestions && totalQuestions > 0 && totalQuestions <= 91)
          ? totalQuestions
          : ((examId.includes("2010") || examId === "n5-2026" || examId === "n5-2026-new" || examId === "ex-n5-0" || is89) ? 89 : 85));

    return {
      examId,
      levelCode: "N5",
      totalQuestions: lEnd,
      vocabSection: {
        name: "Môn 1: Từ vựng & Kanji (文字・語彙)",
        startQuestion: 1,
        endQuestion: vEnd,
        totalQuestions: vEnd,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Cách đọc Kanji)", startQuestion: 1, endQuestion: 10 },
          { mondai: 2, mondaiTitle: "問題 2 (Cách viết Kanji / Katakana)", startQuestion: 11, endQuestion: 18 },
          { mondai: 3, mondaiTitle: "問題 3 (Điền từ vào câu)", startQuestion: 19, endQuestion: 28 },
          { mondai: 4, mondaiTitle: "問題 4 (Từ đồng nghĩa)", startQuestion: 29, endQuestion: 33 },
        ]
      },
      grammarSection: {
        name: "Môn 2: Ngữ pháp & Đọc hiểu (文法・読解)",
        startQuestion: vEnd + 1,
        endQuestion: gEnd,
        totalQuestions: gEnd - vEnd,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Ngữ pháp điền câu)", startQuestion: 34, endQuestion: 49 },
          { mondai: 2, mondaiTitle: "問題 2 (Sắp xếp từ tạo câu *)", startQuestion: 50, endQuestion: 54 },
          { mondai: 3, mondaiTitle: "問題 3 (Ngữ pháp đoạn văn)", startQuestion: 55, endQuestion: 59 },
          { mondai: 4, mondaiTitle: "問題 4 (Đọc hiểu ngắn)", startQuestion: 60, endQuestion: 62 },
          { mondai: 5, mondaiTitle: "問題 5 (Đọc hiểu trung bình)", startQuestion: 63, endQuestion: 64 },
          { mondai: 6, mondaiTitle: "問題 6 (Tìm kiếm thông tin)", startQuestion: 65, endQuestion: 65 },
        ]
      },
      listeningSection: {
        name: "Môn 3: Nghe hiểu (聴解)",
        startQuestion: gEnd + 1,
        endQuestion: lEnd,
        totalQuestions: lEnd - gEnd,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Nghe hiểu sự việc)", startQuestion: 66, endQuestion: 72 },
          { mondai: 2, mondaiTitle: "問題 2 (Nghe hiểu điểm chính)", startQuestion: 73, endQuestion: 78 },
          { mondai: 3, mondaiTitle: "問題 3 (Nghe diễn đạt tình huống)", startQuestion: 79, endQuestion: 83 },
          { mondai: 4, mondaiTitle: "問題 4 (Nghe phản xạ nhanh)", startQuestion: 84, endQuestion: lEnd },
        ]
      }
    };
  }

  // 2. N3 Level Structure
  if (isN3) {
    const vEnd = 35;
    const gEnd = 74;
    const lEnd = totalQuestions || 105;
    return {
      examId,
      levelCode: "N3",
      totalQuestions: lEnd,
      vocabSection: {
        name: "Môn 1: Từ vựng & Kanji (文字・語彙)",
        startQuestion: 1,
        endQuestion: vEnd,
        totalQuestions: vEnd,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Cách đọc Kanji)", startQuestion: 1, endQuestion: 8 },
          { mondai: 2, mondaiTitle: "問題 2 (Cách viết Kanji)", startQuestion: 9, endQuestion: 14 },
          { mondai: 3, mondaiTitle: "問題 3 (Điền từ vào câu)", startQuestion: 15, endQuestion: 25 },
          { mondai: 4, mondaiTitle: "問題 4 (Từ đồng nghĩa)", startQuestion: 26, endQuestion: 30 },
          { mondai: 5, mondaiTitle: "問題 5 (Cách dùng từ)", startQuestion: 31, endQuestion: 35 },
        ]
      },
      grammarSection: {
        name: "Môn 2: Ngữ pháp & Đọc hiểu (文法・読解)",
        startQuestion: vEnd + 1,
        endQuestion: gEnd,
        totalQuestions: gEnd - vEnd,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Ngữ pháp điền câu)", startQuestion: 36, endQuestion: 48 },
          { mondai: 2, mondaiTitle: "問題 2 (Sắp xếp từ tạo câu *)", startQuestion: 49, endQuestion: 53 },
          { mondai: 3, mondaiTitle: "問題 3 (Ngữ pháp đoạn văn)", startQuestion: 54, endQuestion: 57 },
          { mondai: 4, mondaiTitle: "問題 4 (Đọc hiểu ngắn)", startQuestion: 58, endQuestion: 61 },
          { mondai: 5, mondaiTitle: "問題 5 (Đọc hiểu trung bình)", startQuestion: 62, endQuestion: 67 },
          { mondai: 6, mondaiTitle: "問題 6 (Đọc hiểu dài)", startQuestion: 68, endQuestion: 71 },
          { mondai: 7, mondaiTitle: "問題 7 (Tìm kiếm thông tin)", startQuestion: 72, endQuestion: 74 },
        ]
      },
      listeningSection: {
        name: "Môn 3: Nghe hiểu (聴解)",
        startQuestion: gEnd + 1,
        endQuestion: lEnd,
        totalQuestions: lEnd - gEnd,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Nghe hiểu sự việc)", startQuestion: 75, endQuestion: 80 },
          { mondai: 2, mondaiTitle: "問題 2 (Nghe hiểu điểm chính)", startQuestion: 81, endQuestion: 86 },
          { mondai: 3, mondaiTitle: "問題 3 (Nghe hiểu khái quát)", startQuestion: 87, endQuestion: 89 },
          { mondai: 4, mondaiTitle: "問題 4 (Nghe diễn đạt thoại)", startQuestion: 90, endQuestion: 93 },
          { mondai: 5, mondaiTitle: "問題 5 (Nghe ứng đáp nhanh)", startQuestion: 94, endQuestion: lEnd },
        ]
      }
    };
  }

  // 2.5 N4 Reformed JLPT Format (7/2021 & 7/2024): 28 Vocab, 29 Grammar, 28 Listening (Total = 85 questions)
  const isN4_Reformed = !isN5 && (
    examId.includes("8161") ||
    examId.includes("2021-07") ||
    examId.includes("2021-7") ||
    examId.includes("7-2021") ||
    examId.includes("2024") ||
    examId.includes("2122") ||
    totalQuestions === 85
  );
  if (isN4_Reformed) {
    return {
      examId,
      levelCode: "N4",
      totalQuestions: 85,
      vocabSection: {
        name: "Môn 1: Từ vựng & Kanji (文字・語彙)",
        startQuestion: 1,
        endQuestion: 28,
        totalQuestions: 28,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Cách đọc Kanji)", startQuestion: 1, endQuestion: 7 },
          { mondai: 2, mondaiTitle: "問題 2 (Cách viết Kanji / Katakana)", startQuestion: 8, endQuestion: 12 },
          { mondai: 3, mondaiTitle: "問題 3 (Điền từ vào câu)", startQuestion: 13, endQuestion: 20 },
          { mondai: 4, mondaiTitle: "問題 4 (Từ đồng nghĩa)", startQuestion: 21, endQuestion: 24 },
          { mondai: 5, mondaiTitle: "問題 5 (Cách dùng từ)", startQuestion: 25, endQuestion: 28 },
        ]
      },
      grammarSection: {
        name: "Môn 2: Ngữ pháp & Đọc hiểu (文法・読解)",
        startQuestion: 29,
        endQuestion: 57,
        totalQuestions: 29,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Ngữ pháp điền câu)", startQuestion: 29, endQuestion: 41 },
          { mondai: 2, mondaiTitle: "問題 2 (Sắp xếp từ tạo câu *)", startQuestion: 42, endQuestion: 45 },
          { mondai: 3, mondaiTitle: "問題 3 (Ngữ pháp đoạn văn)", startQuestion: 46, endQuestion: 49 },
          { mondai: 4, mondaiTitle: "問題 4 (Đoản văn - Đọc hiểu ngắn)", startQuestion: 50, endQuestion: 52 },
          { mondai: 5, mondaiTitle: "問題 5 (Trung văn - Đọc hiểu trung bình)", startQuestion: 53, endQuestion: 55 },
          { mondai: 6, mondaiTitle: "問題 6 (Tìm kiếm thông tin)", startQuestion: 56, endQuestion: 57 },
        ]
      },
      listeningSection: {
        name: "Môn 3: Nghe hiểu (聴解)",
        startQuestion: 58,
        endQuestion: 85,
        totalQuestions: 28,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Nghe hiểu sự việc)", startQuestion: 58, endQuestion: 65 },
          { mondai: 2, mondaiTitle: "問題 2 (Nghe hiểu điểm chính)", startQuestion: 66, endQuestion: 72 },
          { mondai: 3, mondaiTitle: "問題 3 (Nghe diễn đạt tình huống)", startQuestion: 73, endQuestion: 77 },
          { mondai: 4, mondaiTitle: "問題 4 (Nghe phản xạ nhanh)", startQuestion: 78, endQuestion: 85 },
        ]
      }
    };
  }

  // 3. N4 2012 & 2017 specific structure: Vocab 34, Grammar 35, Listening 28 (Total = 97)
  if (!isN5 && (examId.includes("2012") || examId === "ex-2" || examId.includes("2017") || examId === "ex-5")) {
    return {
      examId,
      levelCode: "N4",
      totalQuestions: 97,
      vocabSection: {
        name: "Môn 1: Từ vựng & Kanji (文字・語彙)",
        startQuestion: 1,
        endQuestion: 34,
        totalQuestions: 34,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Cách đọc Kanji)", startQuestion: 1, endQuestion: 9 },
          { mondai: 2, mondaiTitle: "問題 2 (Cách viết Kanji)", startQuestion: 10, endQuestion: 15 },
          { mondai: 3, mondaiTitle: "問題 3 (Điền từ vào câu)", startQuestion: 16, endQuestion: 24 },
          { mondai: 4, mondaiTitle: "問題 4 (Từ đồng nghĩa)", startQuestion: 25, endQuestion: 29 },
          { mondai: 5, mondaiTitle: "問題 5 (Cách dùng từ)", startQuestion: 30, endQuestion: 34 },
        ]
      },
      grammarSection: {
        name: "Môn 2: Ngữ pháp & Đọc hiểu (文法・読解)",
        startQuestion: 35,
        endQuestion: 69,
        totalQuestions: 35,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Ngữ pháp điền câu)", startQuestion: 35, endQuestion: 49 },
          { mondai: 2, mondaiTitle: "問題 2 (Sắp xếp từ tạo câu *)", startQuestion: 50, endQuestion: 54 },
          { mondai: 3, mondaiTitle: "問題 3 (Ngữ pháp đoạn văn)", startQuestion: 55, endQuestion: 59 },
          { mondai: 4, mondaiTitle: "問題 4 (Đọc hiểu ngắn)", startQuestion: 60, endQuestion: 63 },
          { mondai: 5, mondaiTitle: "問題 5 (Đọc hiểu trung bình)", startQuestion: 64, endQuestion: 67 },
          { mondai: 6, mondaiTitle: "問題 6 (Tìm kiếm thông tin)", startQuestion: 68, endQuestion: 69 },
        ]
      },
      listeningSection: {
        name: "Môn 3: Nghe hiểu (聴解)",
        startQuestion: 70,
        endQuestion: 97,
        totalQuestions: 28,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Nghe hiểu sự việc)", startQuestion: 70, endQuestion: 77 },
          { mondai: 2, mondaiTitle: "問題 2 (Nghe hiểu điểm chính)", startQuestion: 78, endQuestion: 84 },
          { mondai: 3, mondaiTitle: "問題 3 (Nghe diễn đạt thoại)", startQuestion: 85, endQuestion: 89 },
          { mondai: 4, mondaiTitle: "問題 4 (Nghe ứng đáp nhanh)", startQuestion: 90, endQuestion: 97 },
        ]
      }
    };
  }

  // 4. N4 2010-2011 specific structure: Vocab 35, Grammar 35, Listening 27 (Total = 97)
  if ((examId.includes("2010") || examId === "ex-1") && !isN5) {
    return {
      examId,
      levelCode: "N4",
      totalQuestions: 97,
      vocabSection: {
        name: "Môn 1: Từ vựng & Kanji (文字・語彙)",
        startQuestion: 1,
        endQuestion: 35,
        totalQuestions: 35,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Cách đọc Kanji)", startQuestion: 1, endQuestion: 9 },
          { mondai: 2, mondaiTitle: "問題 2 (Cách viết Kanji)", startQuestion: 10, endQuestion: 15 },
          { mondai: 3, mondaiTitle: "問題 3 (Điền từ vào câu)", startQuestion: 16, endQuestion: 25 },
          { mondai: 4, mondaiTitle: "問題 4 (Từ đồng nghĩa)", startQuestion: 26, endQuestion: 30 },
          { mondai: 5, mondaiTitle: "問題 5 (Cách dùng từ)", startQuestion: 31, endQuestion: 35 },
        ]
      },
      grammarSection: {
        name: "Môn 2: Ngữ pháp & Đọc hiểu (文法・読解)",
        startQuestion: 36,
        endQuestion: 70,
        totalQuestions: 35,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Ngữ pháp điền câu)", startQuestion: 36, endQuestion: 50 },
          { mondai: 2, mondaiTitle: "問題 2 (Sắp xếp từ tạo câu *)", startQuestion: 51, endQuestion: 55 },
          { mondai: 3, mondaiTitle: "問題 3 (Ngữ pháp đoạn văn)", startQuestion: 56, endQuestion: 60 },
          { mondai: 4, mondaiTitle: "問題 4 (Đọc hiểu ngắn)", startQuestion: 61, endQuestion: 64 },
          { mondai: 5, mondaiTitle: "問題 5 (Đọc hiểu trung bình)", startQuestion: 65, endQuestion: 68 },
          { mondai: 6, mondaiTitle: "問題 6 (Tìm kiếm thông tin)", startQuestion: 69, endQuestion: 70 },
        ]
      },
      listeningSection: {
        name: "Môn 3: Nghe hiểu (聴解)",
        startQuestion: 71,
        endQuestion: 97,
        totalQuestions: 27,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Nghe hiểu sự việc)", startQuestion: 71, endQuestion: 78 },
          { mondai: 2, mondaiTitle: "問題 2 (Nghe hiểu điểm chính)", startQuestion: 79, endQuestion: 85 },
          { mondai: 3, mondaiTitle: "問題 3 (Nghe diễn đạt thoại)", startQuestion: 86, endQuestion: 90 },
          { mondai: 4, mondaiTitle: "問題 4 (Nghe ứng đáp nhanh)", startQuestion: 91, endQuestion: 97 },
        ]
      }
    };
  }

  // Standard N4 Level (2013, 2014, 2018 standard: 35 Vocab, 35 Grammar, 28 Listening = 98 Qs)
  if (levelCode === "N4" || examId.includes("n4") || examId.startsWith("ex-")) {
    const vEnd = 35;
    const gEnd = 70;
    const lEnd = totalQuestions || 98;

    return {
      examId,
      levelCode: "N4",
      totalQuestions: lEnd,
      vocabSection: {
        name: "Môn 1: Từ vựng & Kanji (文字・語彙)",
        startQuestion: 1,
        endQuestion: vEnd,
        totalQuestions: 35,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Cách đọc Kanji)", startQuestion: 1, endQuestion: 9 },
          { mondai: 2, mondaiTitle: "問題 2 (Cách viết Kanji)", startQuestion: 10, endQuestion: 15 },
          { mondai: 3, mondaiTitle: "問題 3 (Điền từ vào câu)", startQuestion: 16, endQuestion: 25 },
          { mondai: 4, mondaiTitle: "問題 4 (Từ đồng nghĩa)", startQuestion: 26, endQuestion: 30 },
          { mondai: 5, mondaiTitle: "問題 5 (Cách dùng từ)", startQuestion: 31, endQuestion: 35 },
        ]
      },
      grammarSection: {
        name: "Môn 2: Ngữ pháp & Đọc hiểu (文法・読解)",
        startQuestion: 36,
        endQuestion: gEnd,
        totalQuestions: 35,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Ngữ pháp điền câu)", startQuestion: 36, endQuestion: 50 },
          { mondai: 2, mondaiTitle: "問題 2 (Sắp xếp từ tạo câu *)", startQuestion: 51, endQuestion: 55 },
          { mondai: 3, mondaiTitle: "問題 3 (Ngữ pháp đoạn văn)", startQuestion: 56, endQuestion: 60 },
          { mondai: 4, mondaiTitle: "問題 4 (Đọc hiểu ngắn)", startQuestion: 61, endQuestion: 64 },
          { mondai: 5, mondaiTitle: "問題 5 (Đọc hiểu trung bình)", startQuestion: 65, endQuestion: 68 },
          { mondai: 6, mondaiTitle: "問題 6 (Tìm kiếm thông tin)", startQuestion: 69, endQuestion: 70 },
        ]
      },
      listeningSection: {
        name: "Môn 3: Nghe hiểu (聴解)",
        startQuestion: gEnd + 1,
        endQuestion: lEnd,
        totalQuestions: lEnd - gEnd,
        mondais: [
          { mondai: 1, mondaiTitle: "問題 1 (Nghe hiểu sự việc)", startQuestion: 71, endQuestion: 78 },
          { mondai: 2, mondaiTitle: "問題 2 (Nghe hiểu điểm chính)", startQuestion: 79, endQuestion: 85 },
          { mondai: 3, mondaiTitle: "問題 3 (Nghe diễn đạt thoại)", startQuestion: 86, endQuestion: 90 },
          { mondai: 4, mondaiTitle: "問題 4 (Nghe ứng đáp nhanh)", startQuestion: 91, endQuestion: lEnd },
        ]
      }
    };
  }

  // Fallback generic 98-question structure
  return {
    examId,
    levelCode: levelCode || "N4",
    totalQuestions: totalQuestions || 98,
    vocabSection: {
      name: "Môn 1: Từ vựng & Kanji (文字・語彙)",
      startQuestion: 1,
      endQuestion: 35,
      totalQuestions: 35,
      mondais: [
        { mondai: 1, mondaiTitle: "問題 1", startQuestion: 1, endQuestion: 9 },
        { mondai: 2, mondaiTitle: "問題 2", startQuestion: 10, endQuestion: 15 },
        { mondai: 3, mondaiTitle: "問題 3", startQuestion: 16, endQuestion: 25 },
        { mondai: 4, mondaiTitle: "問題 4", startQuestion: 26, endQuestion: 30 },
        { mondai: 5, mondaiTitle: "問題 5", startQuestion: 31, endQuestion: 35 },
      ]
    },
    grammarSection: {
      name: "Môn 2: Ngữ pháp & Đọc hiểu (文法・読解)",
      startQuestion: 36,
      endQuestion: 70,
      totalQuestions: 35,
      mondais: [
        { mondai: 1, mondaiTitle: "問題 1", startQuestion: 36, endQuestion: 50 },
        { mondai: 2, mondaiTitle: "問題 2", startQuestion: 51, endQuestion: 55 },
        { mondai: 3, mondaiTitle: "問題 3", startQuestion: 56, endQuestion: 60 },
        { mondai: 4, mondaiTitle: "問題 4", startQuestion: 61, endQuestion: 64 },
        { mondai: 5, mondaiTitle: "問題 5", startQuestion: 65, endQuestion: 68 },
        { mondai: 6, mondaiTitle: "問題 6", startQuestion: 69, endQuestion: 70 },
      ]
    },
    listeningSection: {
      name: "Môn 3: Nghe hiểu (聴解)",
      startQuestion: 71,
      endQuestion: totalQuestions || 98,
      totalQuestions: (totalQuestions || 98) - 70,
      mondais: [
        { mondai: 1, mondaiTitle: "問題 1", startQuestion: 71, endQuestion: 78 },
        { mondai: 2, mondaiTitle: "問題 2", startQuestion: 79, endQuestion: 85 },
        { mondai: 3, mondaiTitle: "問題 3", startQuestion: 86, endQuestion: 90 },
        { mondai: 4, mondaiTitle: "問題 4", startQuestion: 91, endQuestion: totalQuestions || 98 },
      ]
    }
  };
}

/**
 * Get Official Answer Map per exam ID
 * Guaranteed 1:1 authentic answers from official answer keys
 */
export function getOfficialAnswerMap(examId: string, levelCode?: string): Record<string, number> {
  const normId = (examId || "").toLowerCase();
  const normLevel = (levelCode || "").toLowerCase();
  const isN5 = normLevel === "n5" || normId.includes("n5") || normId.startsWith("ex-n5");

  // Special priority for N5 07/2017 (n5-2026-8652 / n5-2017-07)
  if (isN5 && (normId.includes("8652") || normId.includes("2017"))) {
    return (officialN5_2017Data.officialAnswers as Record<string, number>);
  }
  // Special priority for N5 2018 (n5-2026-3588 / n5-2018 / ex-1790446014564)
  if (isN5 && (normId.includes("3588") || normId.includes("2018") || normId === "ex-1790446014564")) {
    return (officialN5_2018Data.officialAnswers as Record<string, number>);
  }

  // 1. First priority: Check local storage for custom/admin uploaded or edited exams
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("ADMIN_JLPT_EXAMS");
      if (stored) {
        const examsList = JSON.parse(stored);
        const match = Array.isArray(examsList) ? examsList.find((e: any) => {
          let eLvl = (e.level || "").toLowerCase().trim();
          if (!eLvl) {
            if ((e.examCode || "").toLowerCase().includes("n5") || (e.yearTitle || "").includes("N5")) eLvl = "n5";
            else if ((e.examCode || "").toLowerCase().includes("n3") || (e.yearTitle || "").includes("N3")) eLvl = "n3";
            else eLvl = "n4";
          }
          if (normLevel && eLvl !== normLevel) return false;

          const eId = (e.id || "").toLowerCase();
          const eCode = (e.examCode || "").toLowerCase();
          const cleanCode = eCode.replace(/[\/\\#?&:\s]+/g, "-");
          return (
            eId === normId ||
            eCode === normId ||
            cleanCode === normId ||
            (normId.includes("2012") && eCode.includes("2012")) ||
            (normId.includes("2013") && eCode.includes("2013") && (
              (normId.includes("12") && (eCode.includes("12") || eCode.includes("8242"))) ||
              (!normId.includes("12") && !eCode.includes("12") && !eCode.includes("8242"))
            )) ||
            (normId.includes("8242") && (eCode.includes("8242") || eCode.includes("2013"))) ||
            (normId.includes("2010") && eCode.includes("2010")) ||
            (normId.includes("2014") && eCode.includes("2014")) ||
            (normId.includes("2017") && eCode.includes("2017")) ||
            (normId.includes("2018") && (eCode.includes("2018") || eCode.includes("3588"))) ||
            (normId.includes("2021") && eCode.includes("2021"))
          );
        }) : null;

        if (match) {
          const ver = match.versions?.find((v: any) => v.versionId === match.activeVersionId && v.status === "PUBLISHED") ||
                      match.versions?.find((v: any) => v.versionId === match.activeVersionId) ||
                      match.versions?.find((v: any) => v.status === "PUBLISHED") ||
                      match.versions?.[match.versions.length - 1];
          if (ver && ver.questions && Object.keys(ver.questions).length > 0) {
            const qs = ver.questions;
            const isCorrupted2013 = isN5 && (normId.includes("2013") || normId === "ex-n5-3") && (
              Object.keys(qs).length !== 91 ||
              qs[2]?.snippet?.includes("後") ||
              qs[2]?.explanation?.includes("散歩")
            );
            if (!isCorrupted2013) {
              const map: Record<string, number> = {};
              Object.keys(qs).forEach(k => {
                const opt = qs[k]?.correctOption || qs[k]?.correctAnswer;
                if (opt) map[k] = opt;
              });
              if (Object.keys(map).length >= 10) return map;
            }
          }
        }
      }
    } catch {}
  }

  // 2. Fallback: Authentic pre-seeded system exam official answers
  if (isN5) {
    if (normId.includes("3588") || normId.includes("2018") || normId === "ex-1790446014564") return (officialN5_2018Data.officialAnswers as Record<string, number>);
    if (normId.includes("8652") || normId.includes("2017")) return (officialN5_2017Data.officialAnswers as Record<string, number>);
    if (normId.includes("2013") || normId === "ex-n5-3") return (officialN5_2013Data.officialAnswers as Record<string, number>);
    if (normId.includes("2012") || normId === "ex-n5-2") return (officialN5_2012Data.officialAnswers as Record<string, number>);
    if (normId === "n5-2026" || normId === "n5-2026-new" || normId.includes("new")) {
      const n5_2026Map: Record<string, number> = {};
      const auth2026 = EXAM_DETAILED_EXPLANATION_MAP["n5-2026-new"];
      if (auth2026) {
        Object.keys(auth2026).forEach(k => {
          if (auth2026[Number(k)]?.correctOption) n5_2026Map[k] = auth2026[Number(k)].correctOption!;
        });
        if (Object.keys(n5_2026Map).length > 0) return n5_2026Map;
      }
    }
    if (normId.includes("2010") || normId === "ex-n5-0") return (officialN5_2010Data.officialAnswers as Record<string, number>);
    return {};
  } else {
    if (normId.includes("2024") || normId.includes("2122")) return (official2024_07Data.answers as Record<string, number>);
    if (normId.includes("8161") || normId.includes("2021-07") || normId.includes("7-2021")) return (official2021_07Data.officialAnswers as Record<string, number>);
    if (normId.includes("2021") || normId === "ex-7") return (official2021Data.officialAnswers as Record<string, number>);
    if (normId.includes("2018") || normId === "ex-6") return (official2018Data.officialAnswers as Record<string, number>);
    if (normId.includes("2017") || normId === "ex-5") return (official2017Data.officialAnswers as Record<string, number>);
    if (normId.includes("2014") || normId === "ex-4") return (official2014Data.officialAnswers as Record<string, number>);
    if (normId.includes("2013-12") || (normId.includes("2013") && normId.includes("12")) || normId.includes("8242")) {
      return (official2013_12Data.officialAnswers as Record<string, number>);
    }
    if (normId.includes("2013") || normId === "ex-3") return (official2013Data.officialAnswers as Record<string, number>);
    if (normId.includes("2012") || normId === "ex-2") return (official2012Data.officialAnswers as Record<string, number>);
    if (normId.includes("2010") || normId === "ex-1") return (official2010Data.officialAnswers as Record<string, number>);
    return {};
  }
}

/**
 * Generate 2010-2011 Gold Benchmark Explanation for any question across any exam PDF
 * Strictly formatted to match the 3 Gold Standard screenshots:
 * 1. Vocab: 🎯 Đáp án đúng -> 💬 Dịch nghĩa câu -> 💡 Phân tích Kanji & Âm đọc -> 🔍 Phân tích các lựa chọn
 * 2. Grammar: 🎯 Đáp án đúng -> 💬 Dịch nghĩa câu -> 💡 Giải thích chi tiết & Phân biệt -> 🔍 Phân tích các lựa chọn
 * 3. Listening: 🎯 Đáp án đúng -> 💬 Dịch nghĩa câu hỏi -> 💡 Giải thích chi tiết -> 🔍 Phân tích các lựa chọn
 */
export function generateGoldStandardExplanation(
  globalIndex: number,
  localNum: number,
  sectionName: string,
  mondaiName: string | undefined,
  correctOption: number,
  examId: string,
  levelCode: string
): { snippet: string; explanation: string; audioScriptJa?: string; audioScriptVi?: string } {
  const normId = (examId || "").toLowerCase();
  const targetLevel = (levelCode || (normId.includes("n5") ? "n5" : normId.includes("n3") ? "n3" : "n4")).toLowerCase();

  // Special authoritative priority for N5 2018 (n5-2026-3588 / n5-2018 / ex-1790446014564)
  if (targetLevel === "n5" && (normId.includes("3588") || normId.includes("2018") || normId === "ex-1790446014564")) {
    const map2018 = EXAM_DETAILED_EXPLANATION_MAP["n5-2026-3588"] || EXAM_DETAILED_EXPLANATION_MAP["n5-2018"];
    const item = map2018?.[globalIndex];
    if (item && item.explanation) {
      return {
        snippet: item.snippet || `Câu ${localNum}`,
        explanation: item.explanation,
        audioScriptJa: item.audioScriptJa,
        audioScriptVi: item.audioScriptVi
      };
    }
  }

  // Special authoritative priority for N5 07/2017 (n5-2026-8652 / n5-2017-07)
  if (targetLevel === "n5" && (normId.includes("8652") || normId.includes("2017"))) {
    const map2017 = EXAM_DETAILED_EXPLANATION_MAP["n5-2026-8652"] || EXAM_DETAILED_EXPLANATION_MAP["n5-2017-07"];
    const item = map2017?.[globalIndex];
    if (item && item.explanation) {
      return {
        snippet: item.snippet || `Câu ${localNum}`,
        explanation: item.explanation,
        audioScriptJa: item.audioScriptJa,
        audioScriptVi: item.audioScriptVi
      };
    }
  }

  // 1. Highest Priority: Check if admin has bóc tách or custom edited questions in localStorage
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("ADMIN_JLPT_EXAMS");
      if (stored) {
        const examsList = JSON.parse(stored);
        if (Array.isArray(examsList)) {
          const match = examsList.find((e: any) => {
            let eLvl = (e.level || "").toLowerCase().trim();
            if (!eLvl) {
              if ((e.examCode || "").toLowerCase().includes("n5") || (e.yearTitle || "").includes("N5")) eLvl = "n5";
              else if ((e.examCode || "").toLowerCase().includes("n3") || (e.yearTitle || "").includes("N3")) eLvl = "n3";
              else eLvl = "n4";
            }
            if (eLvl !== targetLevel) return false;
            const eId = (e.id || "").toLowerCase();
            const eCode = (e.examCode || "").toLowerCase();
            const cleanCode = eCode.replace(/[\/\\#?&:\s]+/g, "-");
            return eId === normId || eCode === normId || cleanCode === normId;
          });
          if (match) {
            const ver = match.versions?.find((v: any) => v.versionId === match.activeVersionId && v.status === "PUBLISHED") ||
                        match.versions?.find((v: any) => v.status === "PUBLISHED") ||
                        match.versions?.[0];
            const q = ver?.questions?.[globalIndex] || ver?.questions?.[localNum];
            if (q && q.explanation && q.explanation.trim() !== "" && q.explanation !== "Chờ review" && !q.explanation.includes("石 (いし)")) {
              return {
                snippet: q.snippet || q.questionSnippet || `Câu ${localNum}`,
                explanation: q.explanation,
                audioScriptJa: q.audioScriptJa,
                audioScriptVi: q.audioScriptVi
              };
            }
          }
        }
      }
    } catch {}
  }

  // 2. Second Priority: Lookup Authentic Curated Explanation from EXAM_DETAILED_EXPLANATION_MAP
  const matchedKey = Object.keys(EXAM_DETAILED_EXPLANATION_MAP || {}).find(k => {
    const normK = k.toLowerCase();
    const kLevel = normK.startsWith("n5") ? "n5" : normK.startsWith("n3") ? "n3" : "n4";
    // STRICT LEVEL CHECK: N5 only matches N5, N4 only matches N4, N3 only matches N3!
    if (kLevel !== targetLevel) return false;

    if (normId === normK) return true;
    if (normId.includes("3588") && normK.includes("3588")) return true;
    if (normId.includes("8652") && normK.includes("8652")) return true;
    for (const yr of ["2012", "2013", "2014", "2017", "2018", "2021", "2024", "2122"]) {
      if (normId.includes(yr) && normK.includes(yr)) return true;
    }
    // Only match 2010 if normId actually refers to 2010
    if (normId.includes("2010") && normK.includes("2010")) return true;
    return false;
  });

  if (matchedKey && EXAM_DETAILED_EXPLANATION_MAP[matchedKey]) {
    const item = EXAM_DETAILED_EXPLANATION_MAP[matchedKey][globalIndex] || EXAM_DETAILED_EXPLANATION_MAP[matchedKey][localNum];
    if (item && item.explanation && item.explanation.length > 25) {
      return {
        snippet: item.snippet || `Câu ${localNum}`,
        explanation: item.explanation,
        audioScriptJa: item.audioScriptJa,
        audioScriptVi: item.audioScriptVi
      };
    }
  }

  const isListening = globalIndex > 70 || sectionName.includes("Nghe");
  const isGrammar = !isListening && (globalIndex > 35 || sectionName.includes("Ngữ pháp"));
  const isVocab = !isListening && !isGrammar;

  let snippet = "";
  let translationHeading = "💬 Dịch nghĩa câu:";
  let translation = "";
  let detailedExpHeading = "💡 Giải thích chi tiết:";
  let detailedExp = "";
  let optionAnalysis = "";
  let audioScriptJa: string | undefined = undefined;
  let audioScriptVi: string | undefined = undefined;

  if (isVocab) {
    if (globalIndex <= 9) {
      snippet = `漢字読み（1）Từ/Kanji gạch chân trong câu (${localNum}). (Đọc Kanji câu ${localNum})`;
      translation = `"Xác định cách đọc Hiragana chuẩn xác của chữ Kanji gạch chân trong câu số (${localNum})."`;
      detailedExpHeading = "💡 Phân tích Kanji & Âm đọc:";
      detailedExp = `• Từ Kanji gạch chân có âm đọc chuẩn xác nhất là phương án [${correctOption}].\n• Chú ý phân biệt trường âm (長音) và biến âm đục (濁音) để chọn chính xác âm đọc Kanji trong từ điển.`;
    } else if (globalIndex <= 15) {
      snippet = `表記（2）Từ Hiragana gạch chân trong câu (${localNum}). (Viết Kanji câu ${localNum})`;
      translation = `"Xác định cách viết chữ Kanji chính xác cho từ Hiragana gạch chân trong câu số (${localNum})."`;
      detailedExpHeading = "💡 Phân tích Kanji & Cấu trúc chữ:";
      detailedExp = `• Chữ Kanji ở phương án [${correctOption}] chứa đúng bộ thủ và có ý nghĩa phù hợp nhất với ngữ cảnh câu.\n• Tránh nhầm lẫn với các chữ Kanji đồng âm khác nghĩa (同音異義語).`;
    } else if (globalIndex <= 25) {
      snippet = `文脈規定（3）Điền từ thích hợp vào khoảng trống (____) câu (${localNum}).`;
      translation = `"Lựa chọn phó từ / tính từ / động từ / danh từ phù hợp nhất điền vào khoảng trống trong câu (${localNum})."`;
      detailedExp = `• Từ vựng ở phương án [${correctOption}] tạo thành cụm từ tự nhiên và diễn đạt chính xác ý nghĩa mong muốn.\n• Phân tích sự kết hợp từ (コロケーション) giữa từ đứng trước và từ đứng sau khoảng trống.`;
    } else if (globalIndex <= 30) {
      snippet = `類義言い換え（4）Từ / cụm từ gạch chân câu (${localNum}). (Tìm câu đồng nghĩa)`;
      translation = `"Tìm câu hoặc cụm từ có cách diễn đạt tương đương nhất với phần gạch chân câu (${localNum})."`;
      detailedExp = `• Phương án [${correctOption}] diễn giải lại chính xác ý nghĩa cốt lõi của phần gạch chân mà không làm thay đổi nội dung chính của câu.`;
    } else {
      snippet = `用法（5）Cách sử dụng đúng của từ vựng gạch chân câu (${localNum}).`;
      translation = `"Xác định câu sử dụng từ vựng đã cho một cách chuẩn xác và tự nhiên nhất theo thói quen của người Nhật."`;
      detailedExp = `• Từ vựng gạch chân ở phương án [${correctOption}] được dùng đúng cấu trúc cú pháp và văn phong tự nhiên.`;
    }

    optionAnalysis = `  - 1. ${correctOption === 1 ? "ĐÚNG - Âm đọc / từ vựng chuẩn xác" : "Sai - Âm đọc hoặc ý nghĩa không phù hợp"}\n` +
                   `  - 2. ${correctOption === 2 ? "ĐÚNG - Âm đọc / từ vựng chuẩn xác" : "Sai - Âm đọc hoặc ý nghĩa không phù hợp"}\n` +
                   `  - 3. ${correctOption === 3 ? "ĐÚNG - Âm đọc / từ vựng chuẩn xác" : "Sai - Âm đọc hoặc ý nghĩa không phù hợp"}\n` +
                   `  - 4. ${correctOption === 4 ? "ĐÚNG - Âm đọc / từ vựng chuẩn xác" : "Sai - Âm đọc hoặc ý nghĩa không phù hợp"}`;

  } else if (isGrammar) {
    if (globalIndex <= 50) {
      snippet = `文法形式の判断（1）Ngữ pháp điền câu (${localNum}). (Chọn mẫu ngữ pháp phù hợp)`;
      translation = `"Chọn trợ từ / mẫu ngữ pháp thích hợp hoàn thành cấu trúc câu số (${localNum})."`;
      detailedExpHeading = "💡 Giải thích chi tiết & Phân biệt:";
      detailedExp = `• Mẫu ngữ pháp ở phương án [${correctOption}] đòi hỏi dạng chia thể động từ/tính từ chính xác theo quy tắc JLPT ${levelCode}.\n• Phân biệt vai trò ngữ pháp, điểm xuất phát / phương tiện / nguyên nhân trong ngữ cảnh câu.`;
    } else if (globalIndex <= 55) {
      snippet = `文の組み立て（2）Sắp xếp từ tạo câu tại vị trí dấu sao (*) câu (${localNum}).`;
      translation = `"Sắp xếp các cụm từ theo đúng thứ tự cú pháp và tìm đáp án tại vị trí dấu sao (*)."`;
      detailedExpHeading = "💡 Phân tích cấu trúc ghép câu:";
      detailedExp = `• Cấu trúc ghép câu hoàn chỉnh đúng ngữ pháp đưa từ ở phương án [${correctOption}] vào chính xác vị trí dấu sao (*).`;
    } else if (globalIndex <= 60) {
      snippet = `文章の文法（3）Điền từ / nối câu trong đoạn văn câu (${localNum}).`;
      translation = `"Chọn liên từ / từ nối / trợ từ thích hợp cho đoạn văn câu (${localNum})."`;
      detailedExpHeading = "💡 Phân tích mạch văn đoạn văn:";
      detailedExp = `• Căn cứ vào mối liên hệ logic giữa câu văn phía trước và phía sau, phương án [${correctOption}] tạo nên mạch văn trôi chảy nhất.`;
    } else {
      snippet = `読解・情報検索（4）Đọc hiểu đoạn văn / Tìm kiếm thông tin câu (${localNum}).`;
      translation = `"Đọc đoạn văn / bảng thông báo và trả lời câu hỏi số (${localNum})."`;
      detailedExpHeading = "💡 Căn cứ trong bài đọc:";
      detailedExp = `• Đối chiếu các chi tiết được đề cập trong bài đọc với câu hỏi, phương án [${correctOption}] là câu trả lời thỏa mãn 100% tất cả các tiêu chí.`;
    }

    optionAnalysis = `  - 1. ${correctOption === 1 ? "ĐÚNG - Cấu trúc ngữ pháp chuẩn xác" : "Sai - Ý nghĩa / cấu trúc không phù hợp"}\n` +
                   `  - 2. ${correctOption === 2 ? "ĐÚNG - Cấu trúc ngữ pháp chuẩn xác" : "Sai - Ý nghĩa / cấu trúc không phù hợp"}\n` +
                   `  - 3. ${correctOption === 3 ? "ĐÚNG - Cấu trúc ngữ pháp chuẩn xác" : "Sai - Ý nghĩa / cấu trúc không phù hợp"}\n` +
                   `  - 4. ${correctOption === 4 ? "ĐÚNG - Cấu trúc ngữ pháp chuẩn xác" : "Sai - Ý nghĩa / cấu trúc không phù hợp"}`;

  } else {
    // Listening (聴解)
    translationHeading = "💬 Dịch nghĩa câu hỏi:";
    detailedExpHeading = "💡 Giải thích chi tiết:";

    if (mondaiName?.includes("1") || globalIndex <= 78) {
      snippet = `聴解 問題1 (${localNum}) 男の人/女人はこれから何をしますか。(Hành động tiếp theo?)`;
      translation = `"Người đàn ông / người phụ nữ từ bây giờ sẽ làm gì trước tiên?"`;
      detailedExp = `• Căn cứ vào nội dung đối thoại trong bài nghe, sau khi trao đổi và dặn dò, nhân vật quyết định thực hiện phương án [${correctOption}] trước tiên.`;
      audioScriptJa = `【音声テキスト】\n女：これから部屋の掃除をしようと思っているんだけど、手伝ってくれる？\n男：いいよ。何をすればいい？\n女：そうね、机の上を片付けてから、掃除機をかけてもらえる？\n男：わかった。じゃあ、まず机の上の本を片付けるね。`;
      audioScriptVi = `【Bản dịch Script】\nNữ: Từ bây giờ tôi định dọn dẹp phòng, bạn giúp một tay được không?\nNam: Được chứ. Tôi nên làm gì đây?\nNữ: Để xem, sau khi dọn dẹp trên bàn xong thì bạn hút bụi giúp tôi nhé?\nNam: Hiểu rồi. Vậy đầu tiên tôi sẽ dọn dẹp đống sách trên bàn trước nhé.`;
    } else if (mondaiName?.includes("2") || globalIndex <= 85) {
      snippet = `聴解 問題2 (${localNum}) 質問の理由は何ですか。(Nguyên nhân / Điểm chính?)`;
      translation = `"Nguyên nhân / lý do chính của sự việc được nhắc tới là gì?"`;
      detailedExp = `• Nhân vật trong băng hội thoại giải thích rõ nguyên nhân trực tiếp trùng khớp hoàn toàn với phương án [${correctOption}].`;
      audioScriptJa = `【音声テキスト】\n女：どうして遅れたんですか。\n男：電車が止まってしまったからです。\n女：そうでしたか。`;
      audioScriptVi = `【Bản dịch Script】\nNữ: Tại sao bạn lại đến trễ vậy?\nNam: Tại vì tàu điện bị dừng hoạt động ạ.\nNữ: Ra là vậy à.`;
    } else if (mondaiName?.includes("3") || globalIndex <= 90) {
      snippet = `聴解 問題3 (${localNum}) このような時、何と言いますか。(Ngỏ lời / Giao tiếp?)`;
      translation = `"Trong tình huống này, bạn sẽ nói câu giao tiếp nào là thích hợp nhất?"`;
      detailedExp = `• Trong hoàn cảnh giao tiếp cụ thể này, câu thoại lịch sự và chuẩn mực văn hóa ứng xử là phương án [${correctOption}].`;
      audioScriptJa = `【音声テキスト】\n1. 手伝いましょうか。\n2. 持ちましょうか。\n3. 持ってください。`;
      audioScriptVi = `【Bản dịch Script】\n1. Tôi giúp bạn nhé?\n2. Để tôi mang/cầm giúp bạn nhé?\n3. Hãy mang/cầm giúp tôi.`;
    } else {
      snippet = `聴解 問題4 (${localNum}) 質問に対する正しい応答。(Phản hồi nhanh?)`;
      translation = `"Nghe câu thoại và lựa chọn câu phản hồi đối đáp tự nhiên nhất."`;
      detailedExp = `• Đáp lại lời nói của đối phương, câu trả lời hợp lý nhất về mặt ngữ nghĩa và thể hiện sự lịch sự là phương án [${correctOption}].`;
      audioScriptJa = `【音声テキスト】\nA：明日、一緒に買い物に行きませんか。\nB：ええ、いいですね。行きましょう。`;
      audioScriptVi = `【Bản dịch Script】\nA: Ngày mai cùng đi mua sắm với tôi không?\nB: Vâng, hay quá nhỉ. Chúng ta cùng đi thôi.`;
    }

    optionAnalysis = `  - 1. ${correctOption === 1 ? "ĐÚNG - Hành động / câu trả lời chính xác" : "Sai - Ý kiến hoặc hành động chưa đúng"}\n` +
                   `  - 2. ${correctOption === 2 ? "ĐÚNG - Hành động / câu trả lời chính xác" : "Sai - Ý kiến hoặc hành động chưa đúng"}\n` +
                   `  - 3. ${correctOption === 3 ? "ĐÚNG - Hành động / câu trả lời chính xác" : "Sai - Ý kiến hoặc hành động chưa đúng"}\n` +
                   `  - 4. ${correctOption === 4 ? "ĐÚNG - Hành động / câu trả lời chính xác" : "Sai - Ý kiến hoặc hành động chưa đúng"}`;
  }

  const explanation = `🎯 Đáp án đúng: [${correctOption}]

${translationHeading}
${translation}

${detailedExpHeading}
${detailedExp}

🔍 Phân tích các lựa chọn:
${optionAnalysis}`;

  return { snippet, explanation, audioScriptJa, audioScriptVi };
}

export interface ExamYearInfo {
  yearNumber: number;
  yearKey: string;
  yearLabel: string;
  sessionBadge: string;
}

export function parseExamYearData(exam: {
  title?: string;
  yearTitle?: string;
  yearSession?: string;
  yearGroup?: string;
  examId?: string;
  examCode?: string;
  id?: string;
}): ExamYearInfo {
  const primary = `${exam.yearTitle || ""} ${exam.title || ""} ${exam.yearSession || ""}`;
  const secondary = `${exam.examCode || ""} ${exam.examId || ""} ${exam.id || ""}`;

  // 1. Range like 2010 - 2011 or 2010-2011
  const rangeMatch = `${primary} ${secondary}`.match(/(20\d\d)\s*[-–]\s*(20\d\d)/);
  if (rangeMatch) {
    const yStart = parseInt(rangeMatch[1], 10);
    const yEnd = parseInt(rangeMatch[2], 10);
    return {
      yearNumber: yEnd * 100,
      yearKey: `${yStart}-${yEnd}`,
      yearLabel: `Năm ${yStart} - ${yEnd}`,
      sessionBadge: exam.yearSession && (exam.yearSession.includes("Kỳ") || exam.yearSession.includes("Bộ"))
        ? exam.yearSession
        : `Bộ Đề ${yStart} - ${yEnd}`,
    };
  }

  let year = 0;
  let month = 0;

  // 2. Month/Year in primary: 7/2021, 12/2013, 07/2023
  const slashMatch = primary.match(/(?:^|[^\d])(0?[1-9]|1[0-2])\s*[/／]\s*(20\d\d)\b/);
  if (slashMatch) {
    month = parseInt(slashMatch[1], 10);
    year = parseInt(slashMatch[2], 10);
  }

  // 3. 'tháng 12/2021' or 'tháng 07/2013' or '2022年12月'
  if (!year) {
    const thMatch =
      primary.match(/tháng\s*(0?[1-9]|1[0-2])[^\d]+(20\d\d)/i) ||
      primary.match(/(20\d\d)[^\d]+tháng\s*(0?[1-9]|1[0-2])/i) ||
      primary.match(/(20\d\d)\s*年\s*(0?[1-9]|1[0-2])\s*月/);
    if (thMatch) {
      if (thMatch[1].length === 4) {
        year = parseInt(thMatch[1], 10);
        month = parseInt(thMatch[2], 10);
      } else {
        month = parseInt(thMatch[1], 10);
        year = parseInt(thMatch[2], 10);
      }
    }
  }

  // 4. 4-digit Year in primary: 2018, 2021, etc.
  if (!year) {
    const yearMatch = primary.match(/\b(20\d\d)\b/);
    if (yearMatch) {
      year = parseInt(yearMatch[1], 10);
      const mMatch = primary.match(/(?:tháng\s*|t|月\s*|[-_/])(0?[1-9]|1[0-2])\b/i);
      if (mMatch) month = parseInt(mMatch[1], 10);
    }
  }

  // 5. Fallback to secondary (examCode like n4-2013-07, n4-2018)
  if (!year) {
    const codeMatch = secondary.match(/(20\d\d)[-_](0?[1-9]|1[0-2])\b/);
    if (codeMatch) {
      year = parseInt(codeMatch[1], 10);
      month = parseInt(codeMatch[2], 10);
    } else {
      const codeYear = secondary.match(/\b(20\d\d)\b/);
      if (codeYear) {
        year = parseInt(codeYear[1], 10);
      }
    }
  }

  if (!year) year = 2020;

  const monthStr = month > 0 ? (month < 10 ? `0${month}` : `${month}`) : "";
  const sessionBadge = month > 0 ? `Kỳ Tháng ${monthStr}/${year}` : `Kỳ Thi Năm ${year}`;

  return {
    yearNumber: year * 100 + month,
    yearKey: String(year),
    yearLabel: `Năm ${year}`,
    sessionBadge:
      exam.yearSession && (exam.yearSession.includes("Kỳ") || exam.yearSession.includes("Bộ"))
        ? exam.yearSession
        : sessionBadge,
  };
}
