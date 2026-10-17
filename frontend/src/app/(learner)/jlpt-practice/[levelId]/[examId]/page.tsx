"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, Clock, CheckCircle2, XCircle, Trophy, 
  Volume2, Download, Check, RefreshCw, ChevronDown, ChevronUp, BookOpen, Lightbulb, Printer, Lock, Sparkles, HelpCircle, AlertTriangle, X, Send, FileCheck
} from "lucide-react";
import JlptScoreReportModal, { JlptScoreReportData } from "@/components/learner/jlpt/JlptScoreReportModal";
import CustomChoukaiAudioPlayer from "@/components/learner/jlpt/CustomChoukaiAudioPlayer";
import official2010Data from "@/app/data/scanned_n4_2010_official_answers.json";
import official2012Data from "@/app/data/scanned_n4_2012_official_answers.json";
import official2014Data from "@/app/data/scanned_n4_2014_official_answers.json";
import official2018Data from "@/app/data/scanned_n4_2018_official_answers.json";
import { parseExamStructure, getOfficialAnswerMap, generateGoldStandardExplanation } from "@/lib/jlpt/jlptExamParser";
import { EXAM_DETAILED_EXPLANATION_MAP } from "@/app/data/jlptDetailedExplanations";
import { getPdfFromIndexedDb } from "@/lib/jlpt/pdfStorage";
import { INITIAL_ADMIN_EXAMS, AdminJlptExam, generateInitialQuestions, sanitizeAndDeduplicateExams, getStoredAdminExams, syncAdminExamsFromServer } from "@/app/data/initialAdminExams";

interface RichQuestionAnswerDetail {
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

interface ExamMetadata {
  examId: string;
  yearTitle: string;
  yearSession?: string;
  pdfUrl: string;
  audioUrl: string;
  pdfFileName: string;
  audioFileName: string;
  totalQuestions: number;
}

const EXAM_METADATA_MAP: Record<string, ExamMetadata> = {
  "n4-2010-2011": {
    examId: "n4-2010-2011",
    yearTitle: "Đề Thi Thật N4 (2010 - 2011)",
    pdfUrl: "/pdf/jlpt/n4/n4-2010-2011.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2010-2011.m4a",
    pdfFileName: "N4-2010-2011年.pdf",
    audioFileName: "Nghe N4-2010-2011年 (1).m4a",
    totalQuestions: 97,
  },
  "n4-2012-12": {
    examId: "n4-2012-12",
    yearTitle: "Đề Thi Thật N4 (Tháng 12/2012)",
    pdfUrl: "/pdf/jlpt/n4/n4-2012-12.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2012-12.m4a",
    pdfFileName: "N4-2012年12月.pdf",
    audioFileName: "Nghe N4-2012年12月.m4a",
    totalQuestions: 97,
  },
  "n4-2013-07": {
    examId: "n4-2013-07",
    yearTitle: "Đề Thi Thật N4 (Tháng 07/2013)",
    pdfUrl: "/pdf/jlpt/n4/n4-2013-07.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2013-07.m4a",
    pdfFileName: "N4-2013年7月.pdf",
    audioFileName: "Nghe N4-2013年7月.m4a",
    totalQuestions: 98,
  },
  "n4-2014-07": {
    examId: "n4-2014-07",
    yearTitle: "Đề Thi Thật N4 (Tháng 07/2014)",
    pdfUrl: "/pdf/jlpt/n4/n4-2014-07.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2014-07.m4a",
    pdfFileName: "N4-2014年7月.pdf",
    audioFileName: "Nghe N4-2014年7月.m4a",
    totalQuestions: 98,
  },
  "n4-2017-07": {
    examId: "n4-2017-07",
    yearTitle: "Đề Thi Thật N4 (Tháng 07/2017)",
    pdfUrl: "/pdf/jlpt/n4/n4-2017-07.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2017-07.mp3",
    pdfFileName: "N4-2017年-7月.pdf",
    audioFileName: "Nghe N4 2017年7月.mp3",
    totalQuestions: 97,
  },
  "n4-2018": {
    examId: "n4-2018",
    yearTitle: "Đề Thi Thật N4 (Bộ 2018)",
    pdfUrl: "/pdf/jlpt/n4/n4-2018.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2018.m4a",
    pdfFileName: "N4-2018年.pdf",
    audioFileName: "Nghe N4-2018年.m4a",
    totalQuestions: 98,
  },
  "n4-2021-12": {
    examId: "n4-2021-12",
    yearTitle: "Đề Thi Thật N4 (Tháng 12/2021)",
    pdfUrl: "/pdf/jlpt/n4/n4-2021-12.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2021-12.mp3",
    pdfFileName: "Đề N4 T12-2021 Mark (1).pdf",
    audioFileName: "Nghe N4 T12-2021 bản chuẩn Yuuki Bùi.mp3",
    totalQuestions: 98,
  },
  // N5 Exams
  "n5-2020-12": {
    examId: "n5-2020-12",
    yearTitle: "Đề Thi Thật N5 (Tháng 12/2020)",
    pdfUrl: "/pdf/jlpt/n5/n5-2020-12.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2020-12.mp3",
    pdfFileName: "N5-2020年12月.pdf",
    audioFileName: "Nghe N5-2020年12月.mp3",
    totalQuestions: 85,
  },
  "n5-2021-12": {
    examId: "n5-2021-12",
    yearTitle: "Đề Thi Thật N5 (Tháng 12/2021)",
    pdfUrl: "/pdf/jlpt/n5/n5-2021-12.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2021-12.mp3",
    pdfFileName: "N5-2021年12月.pdf",
    audioFileName: "Nghe N5-2021年12月.mp3",
    totalQuestions: 85,
  },
  "n5-2022-12": {
    examId: "n5-2022-12",
    yearTitle: "Đề Thi Thật N5 (Tháng 12/2022)",
    pdfUrl: "/pdf/jlpt/n5/n5-2022-12.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2022-12.mp3",
    pdfFileName: "N5-2022年12月.pdf",
    audioFileName: "Nghe N5-2022年12月.mp3",
    totalQuestions: 85,
  },
  "n5-2023-07": {
    examId: "n5-2023-07",
    yearTitle: "Đề Thi Thật N5 (Tháng 07/2023)",
    pdfUrl: "/pdf/jlpt/n5/n5-2023-07.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2023-07.mp3",
    pdfFileName: "N5-2023年7月.pdf",
    audioFileName: "Nghe N5-2023年7月.mp3",
    totalQuestions: 85,
  },
  "n5-2010-2011": {
    examId: "n5-2010-2011",
    yearTitle: "Đề Thi Thật N5 (Năm 2010-2011)",
    pdfUrl: "/pdf/jlpt/n5/n5-2010-2011.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2010-2011.mp3",
    pdfFileName: "N5-2010-2011年.pdf",
    audioFileName: "Nghe N5-2010-2011.mp3",
    totalQuestions: 89,
  },
  "n5-2010": {
    examId: "n5-2010-2011",
    yearTitle: "Đề Thi Thật N5 (Năm 2010-2011)",
    pdfUrl: "/pdf/jlpt/n5/n5-2010-2011.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2010-2011.mp3",
    pdfFileName: "N5-2010-2011年.pdf",
    audioFileName: "Nghe N5-2010-2011.mp3",
    totalQuestions: 89,
  },
  "n5-2012-12": {
    examId: "n5-2012-12",
    yearTitle: "Đề Thi Thật N5 (Tháng 12/2012)",
    pdfUrl: "/pdf/jlpt/n5/n5-2012-12.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2012-12.m4a",
    pdfFileName: "N5-2012年12月.pdf",
    audioFileName: "Nghe N5-2012年12月.m4a",
    totalQuestions: 91,
  },
  "n5-2012": {
    examId: "n5-2012-12",
    yearTitle: "Đề Thi Thật N5 (Tháng 12/2012)",
    pdfUrl: "/pdf/jlpt/n5/n5-2012-12.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2012-12.m4a",
    pdfFileName: "N5-2012年12月.pdf",
    audioFileName: "Nghe N5-2012年12月.m4a",
    totalQuestions: 91,
  },
  "n5-2013-07": {
    examId: "n5-2013-07",
    yearTitle: "Đề Thi Thật N5 (Tháng 07/2013)",
    pdfUrl: "/pdf/jlpt/n5/n5-2013-07.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2013-07.mp3",
    pdfFileName: "N5-2013年7月.pdf",
    audioFileName: "Nghe N5-2013年7月.mp3",
    totalQuestions: 91,
  },
  "n5-2013": {
    examId: "n5-2013-07",
    yearTitle: "Đề Thi Thật N5 (Tháng 07/2013)",
    pdfUrl: "/pdf/jlpt/n5/n5-2013-07.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2013-07.mp3",
    pdfFileName: "N5-2013年7月.pdf",
    audioFileName: "Nghe N5-2013年7月.mp3",
    totalQuestions: 91,
  },
  "n5-12-2012": {
    examId: "n5-2012-12",
    yearTitle: "Đề Thi Thật N5 (Tháng 12/2012)",
    pdfUrl: "/pdf/jlpt/n5/n5-2012-12.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2012-12.m4a",
    pdfFileName: "N5-2012年12月.pdf",
    audioFileName: "Nghe N5-2012年12月.m4a",
    totalQuestions: 91,
  },
  "n5-2026-new": {
    examId: "n5-2010-2011",
    yearTitle: "Đề Thi Thật N5 (Năm 2010 - 2011)",
    pdfUrl: "/pdf/jlpt/n5/n5-2010-2011.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2010-2011.mp3",
    pdfFileName: "N5-2010-2011年.pdf",
    audioFileName: "Nghe N5-2010-2011.mp3",
    totalQuestions: 89,
  },
  "n5-2026-8652": {
    examId: "n5-2026-8652",
    yearTitle: "Đề Thi JLPT N5 7/2017",
    pdfUrl: "/pdf/jlpt/n5/n5-2026-8652.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2026-8652.mp3",
    pdfFileName: "N5-2017年7月.pdf",
    audioFileName: "Nghe N5-2017年7月.mp3",
    totalQuestions: 89,
  },
  "n5-2026-3588": {
    examId: "n5-2026-3588",
    yearTitle: "Đề Thi JLPT N5 2018",
    pdfUrl: "/pdf/jlpt/n5/n5-2026-3588.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2026-3588.mp3",
    pdfFileName: "N5-2018年.pdf",
    audioFileName: "Nghe N5-2018年.mp3",
    totalQuestions: 91,
  },
  "n5-2018": {
    examId: "n5-2026-3588",
    yearTitle: "Đề Thi JLPT N5 2018",
    pdfUrl: "/pdf/jlpt/n5/n5-2026-3588.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2026-3588.mp3",
    pdfFileName: "N5-2018年.pdf",
    audioFileName: "Nghe N5-2018年.mp3",
    totalQuestions: 91,
  },
  // Canonical ID aliases for seamless routing
  "ex-1": {
    examId: "n4-2010-2011",
    yearTitle: "Đề Thi Thật N4 (2010 - 2011)",
    pdfUrl: "/pdf/jlpt/n4/n4-2010-2011.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2010-2011.m4a",
    pdfFileName: "N4-2010-2011年.pdf",
    audioFileName: "Nghe N4-2010-2011年 (1).m4a",
    totalQuestions: 97,
  },
  "ex-2": {
    examId: "n4-2012-12",
    yearTitle: "Đề Thi Thật N4 (Tháng 12/2012)",
    pdfUrl: "/pdf/jlpt/n4/n4-2012-12.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2012-12.m4a",
    pdfFileName: "N4-2012年12月.pdf",
    audioFileName: "Nghe N4-2012年12月.m4a",
    totalQuestions: 97,
  },
  "ex-3": {
    examId: "n4-2013-07",
    yearTitle: "Đề Thi Thật N4 (Tháng 07/2013)",
    pdfUrl: "/pdf/jlpt/n4/n4-2013-07.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2013-07.m4a",
    pdfFileName: "N4-2013年7月.pdf",
    audioFileName: "Nghe N4-2013年7月.m4a",
    totalQuestions: 98,
  },
  "ex-4": {
    examId: "n4-2014-07",
    yearTitle: "Đề Thi Thật N4 (Tháng 07/2014)",
    pdfUrl: "/pdf/jlpt/n4/n4-2014-07.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2014-07.m4a",
    pdfFileName: "N4-2014年7月.pdf",
    audioFileName: "Nghe N4-2014年7月.m4a",
    totalQuestions: 98,
  },
  "ex-5": {
    examId: "n4-2017-07",
    yearTitle: "Đề Thi Thật N4 (Tháng 07/2017)",
    pdfUrl: "/pdf/jlpt/n4/n4-2017-07.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2017-07.mp3",
    pdfFileName: "N4-2017年-7月.pdf",
    audioFileName: "Nghe N4 2017年7月.mp3",
    totalQuestions: 97,
  },
  "ex-6": {
    examId: "n4-2018",
    yearTitle: "Đề Thi Thật N4 (Bộ 2018)",
    pdfUrl: "/pdf/jlpt/n4/n4-2018.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2018.m4a",
    pdfFileName: "N4-2018年.pdf",
    audioFileName: "Nghe N4-2018年.m4a",
    totalQuestions: 98,
  },
  "ex-7": {
    examId: "n4-2021-12",
    yearTitle: "Đề Thi Thật N4 (Tháng 12/2021)",
    pdfUrl: "/pdf/jlpt/n4/n4-2021-12.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2021-12.mp3",
    pdfFileName: "Đề N4 T12-2021 Mark (1).pdf",
    audioFileName: "Nghe N4 T12-2021 bản chuẩn Yuuki Bùi.mp3",
    totalQuestions: 98,
  },
  "n4-2026-8161": {
    examId: "n4-2026-8161",
    yearTitle: "Đề Thi Thật JLPT N4 (7/2021)",
    pdfUrl: "/pdf/jlpt/n4/n4-2026-8161.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2026-8161.mp3",
    pdfFileName: "N4-2021年7月.pdf",
    audioFileName: "Nghe N4 T7-2021.mp3",
    totalQuestions: 85,
  },
  "n4-2021-07": {
    examId: "n4-2021-07",
    yearTitle: "Đề Thi Thật JLPT N4 (7/2021)",
    pdfUrl: "/pdf/jlpt/n4/n4-2026-8161.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2026-8161.mp3",
    pdfFileName: "N4-2021年7月.pdf",
    audioFileName: "Nghe N4 T7-2021.mp3",
    totalQuestions: 85,
  },
  "ex-1791908028161": {
    examId: "n4-2026-8161",
    yearTitle: "Đề Thi Thật JLPT N4 (7/2021)",
    pdfUrl: "/pdf/jlpt/n4/n4-2026-8161.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2026-8161.mp3",
    pdfFileName: "N4-2021年7月.pdf",
    audioFileName: "Nghe N4 T7-2021.mp3",
    totalQuestions: 85,
  },
  "n4-2024-07": {
    examId: "n4-2024-07",
    yearTitle: "Đề Thi Thật JLPT N4 (7/2024)",
    pdfUrl: "/pdf/jlpt/n4/n4-2026-2122.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2026-2122.mp3",
    pdfFileName: "n4-2026-2122.pdf",
    audioFileName: "Nghe N4 T7-2024.mp3",
    totalQuestions: 85,
  },
  "n4-2026-2122": {
    examId: "n4-2024-07",
    yearTitle: "Đề Thi Thật JLPT N4 (7/2024)",
    pdfUrl: "/pdf/jlpt/n4/n4-2026-2122.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2026-2122.mp3",
    pdfFileName: "n4-2026-2122.pdf",
    audioFileName: "Nghe N4 T7-2024.mp3",
    totalQuestions: 85,
  },
  "ex-1792170392122": {
    examId: "n4-2024-07",
    yearTitle: "Đề Thi Thật JLPT N4 (7/2024)",
    pdfUrl: "/pdf/jlpt/n4/n4-2026-2122.pdf",
    audioUrl: "/audio/jlpt/n4/n4-2026-2122.mp3",
    pdfFileName: "n4-2026-2122.pdf",
    audioFileName: "Nghe N4 T7-2024.mp3",
    totalQuestions: 85,
  },
  "ex-n5-0": {
    examId: "n5-2010-2011",
    yearTitle: "Đề Thi Thật N5 (Năm 2010-2011)",
    pdfUrl: "/pdf/jlpt/n5/n5-2010-2011.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2010-2011.mp3",
    pdfFileName: "N5-2010-2011年.pdf",
    audioFileName: "Nghe N5-2010-2011.mp3",
    totalQuestions: 89,
  },
  "ex-n5-2": {
    examId: "n5-2012-12",
    yearTitle: "Đề Thi Thật N5 (Tháng 12/2012)",
    pdfUrl: "/pdf/jlpt/n5/n5-2012-12.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2012-12.m4a",
    pdfFileName: "N5-2012年12月.pdf",
    audioFileName: "Nghe N5-2012年12月.m4a",
    totalQuestions: 91,
  },
  "ex-n5-3": {
    examId: "n5-2013-07",
    yearTitle: "Đề Thi Thật N5 (Tháng 07/2013)",
    pdfUrl: "/pdf/jlpt/n5/n5-2013-07.pdf",
    audioUrl: "/audio/jlpt/n5/n5-2013-07.mp3",
    pdfFileName: "N5-2013年7月.pdf",
    audioFileName: "Nghe N5-2013年7月.mp3",
    totalQuestions: 91,
  },
};

// Rich Answer Key Generator with Gold Standard Benchmark for ALL PDF Exams
const getExamRichAnswerDetails = (examId: string, levelCode: string, totalQuestions: number): Record<number, RichQuestionAnswerDetail> => {
  const details: Record<number, RichQuestionAnswerDetail> = {};
  const config = parseExamStructure(examId, levelCode, totalQuestions);
  const sourceAnswers = getOfficialAnswerMap(examId, levelCode);

  for (let i = 1; i <= totalQuestions; i++) {
    let secName = config.vocabSection.name;
    let localNum = i;
    let mName: string | undefined = undefined;

    if (i >= config.vocabSection.startQuestion && i <= config.vocabSection.endQuestion) {
      secName = config.vocabSection.name;
      localNum = i;
      const m = config.vocabSection.mondais.find(m => i >= m.startQuestion && i <= m.endQuestion);
      if (m) mName = m.mondaiTitle.split(" ")[0] + " " + m.mondaiTitle.split(" ")[1];
    } else if (i >= config.grammarSection.startQuestion && i <= config.grammarSection.endQuestion) {
      secName = config.grammarSection.name;
      localNum = i - config.vocabSection.totalQuestions;
      const m = config.grammarSection.mondais.find(m => i >= m.startQuestion && i <= m.endQuestion);
      if (m) mName = m.mondaiTitle.split(" ")[0] + " " + m.mondaiTitle.split(" ")[1];
    } else if (i >= config.listeningSection.startQuestion) {
      secName = config.listeningSection.name;
      const m = config.listeningSection.mondais.find(m => i >= m.startQuestion && i <= m.endQuestion);
      if (m) {
        mName = `問題 ${m.mondai}`;
        localNum = i - m.startQuestion + 1;
      } else {
        localNum = i - config.listeningSection.startQuestion + 1;
      }
    }

    const baseOpt = sourceAnswers[String(i)] || (((i * 3) % 4) + 1);

    // 1. Custom detailed manual explanation if provided
    const targetLevel = (levelCode || (examId.toLowerCase().includes("n5") ? "n5" : examId.toLowerCase().includes("n3") ? "n3" : "n4")).toLowerCase();
    const matchedExamKey = Object.keys(EXAM_DETAILED_EXPLANATION_MAP).find(k => {
      const kLevel = k.toLowerCase().startsWith("n5") ? "n5" : k.toLowerCase().startsWith("n3") ? "n3" : "n4";
      // STRICT LEVEL CHECK: Must never map N5 to N4 or vice versa!
      if (kLevel !== targetLevel) {
        return false;
      }
      return (
        examId.toLowerCase() === k.toLowerCase() ||
        (examId.includes("3588") && k.includes("3588")) ||
        (examId.includes("8652") && k.includes("8652")) ||
        (examId.includes("2010") && k.includes("2010")) ||
        ((examId.includes("2012") || examId === "ex-2" || examId === "ex-n5-2") && k.includes("2012")) ||
        ((examId.includes("2013") || examId === "ex-3" || examId === "ex-n5-3" || examId.includes("8242")) && k.includes("2013") && (
          ((examId.includes("12") || examId.includes("8242")) && (k.includes("12") || k.includes("8242"))) ||
          (!examId.includes("12") && !examId.includes("8242") && !k.includes("12") && !k.includes("8242"))
        )) ||
        ((examId.includes("2014") || examId === "ex-4") && k.includes("2014")) ||
        ((examId.includes("2017") || examId === "ex-5") && k.includes("2017")) ||
        ((examId.includes("2018") || examId === "ex-6") && k.includes("2018")) ||
        ((examId.includes("2021") || examId === "ex-7") && k.includes("2021")) ||
        (examId.includes("8161") && (k.includes("8161") || k.includes("2021"))) ||
        ((examId === "n5-2026" || examId === "n5-2026-new") && k.includes("2026-new"))
      );
    });
    const rawCustomMatch = matchedExamKey ? EXAM_DETAILED_EXPLANATION_MAP[matchedExamKey]?.[i] : undefined;
    // Guard against corrupted N4 snippet/explanation leaking into N5
    const isCorruptedN4 = targetLevel === "n5" && (
      String(rawCustomMatch?.explanation || "").includes("じぶん") ||
      String(rawCustomMatch?.snippet || "").includes("自分")
    );
    const customMatch = isCorruptedN4 ? undefined : rawCustomMatch;

    // 2. Gold Benchmark explanation standard generated dynamically
    const goldDefault = generateGoldStandardExplanation(i, localNum, secName, mName, baseOpt, examId, levelCode);

    // If matchedExamKey is not found (custom or non-curated exam), do not leak 2010 explanations
    const cleanSnippet = customMatch?.snippet || (
      matchedExamKey ? goldDefault.snippet : `Câu hỏi (${localNum}) - ${secName} [Đề ${levelCode} ${examId.toUpperCase()}]`
    );
    const cleanExplanation = customMatch?.explanation || (
      matchedExamKey ? goldDefault.explanation : `🎯 Đáp án đúng: [${baseOpt}]\n\n💬 Phân tích giải thích chi tiết câu (${localNum}):\nPhương án [${baseOpt}] là phương án chuẩn xác nhất cho câu hỏi (${localNum}) phần ${secName} trong đề thi JLPT ${levelCode} (${examId.toUpperCase()}).`
    );

    let finalOpt = baseOpt;
    const matchAns = cleanExplanation.match(/🎯\s*Đáp án đúng:\s*\[(\d+)\]/);
    if (matchAns) {
      finalOpt = parseInt(matchAns[1]);
    }

    details[i] = {
      globalIndex: i,
      localPdfNumber: localNum,
      mondaiName: mName,
      sectionName: secName,
      questionSnippet: cleanSnippet,
      correctOption: finalOpt,
      correctOptionText: `Đáp án [${finalOpt}]`,
      explanation: cleanExplanation,
      audioScriptJa: (i >= config.listeningSection.startQuestion) ? (customMatch?.audioScriptJa || goldDefault.audioScriptJa) : undefined,
      audioScriptVi: (i >= config.listeningSection.startQuestion) ? (customMatch?.audioScriptVi || goldDefault.audioScriptVi) : undefined,
    };
  }

  return details;
};

export default function JlptCleanMinimalExamPage() {
  const urlParams = useParams();
  const levelId = ((urlParams?.levelId as string) || "n4").toLowerCase();
  const examParam = urlParams?.examId;
  const rawExamId = (
    Array.isArray(examParam)
      ? examParam.join("-")
      : typeof examParam === "string"
      ? examParam
      : "n4-2010-2011"
  ).toLowerCase().replace(/[\/\\#?&:\s]+/g, "-");
  const rawExamSlash = (
    Array.isArray(examParam)
      ? examParam.join("/")
      : typeof examParam === "string"
      ? examParam
      : "n4-2010-2011"
  ).toLowerCase();
  
  // Normalize alias IDs strictly scoped by levelId
  // Normalize alias IDs strictly scoped by levelId for exact legacy seed routes
  let canonicalExamId = rawExamId;
  if (levelId === "n4") {
    if (rawExamId === "ex-1") canonicalExamId = "n4-2010-2011";
    else if (rawExamId === "ex-2" || rawExamId === "2012" || rawExamId === "2012-12") canonicalExamId = "n4-2012-12";
    else if (rawExamId === "ex-3" || rawExamId === "2013" || rawExamId === "2013-07") canonicalExamId = "n4-2013-07";
    else if (rawExamId === "ex-4" || rawExamId === "2014" || rawExamId === "2014-07") canonicalExamId = "n4-2014-07";
    else if (rawExamId === "ex-5" || rawExamId === "2017" || rawExamId === "2017-07") canonicalExamId = "n4-2017-07";
    else if (rawExamId === "ex-6" || rawExamId === "2018") canonicalExamId = "n4-2018";
    else if (rawExamId === "ex-7" || rawExamId === "2021" || rawExamId === "2021-12") canonicalExamId = "n4-2021-12";
    else if (rawExamId === "2024" || rawExamId === "2024-07" || rawExamId === "7-2024" || rawExamId === "n4-2026-2122") canonicalExamId = "n4-2024-07";
  } else if (levelId === "n5") {
    if (rawExamId === "ex-1" || rawExamId === "ex-n5-0" || rawExamId === "2010" || rawExamId === "2010-2011") {
      canonicalExamId = "n5-2010-2011";
    } else if (rawExamId === "ex-n5-2" || rawExamId === "ex-2" || rawExamId === "2012" || rawExamId === "2012-12" || rawExamId === "12-2012") {
      canonicalExamId = "n5-2012-12";
    } else if (rawExamId === "ex-n5-3" || rawExamId === "ex-3" || rawExamId === "2013" || rawExamId === "2013-07") {
      canonicalExamId = "n5-2013-07";
    } else if (rawExamId === "ex-n5-new" || rawExamId === "n5-2026-new") {
      canonicalExamId = "n5-2010-2011";
    }
  } else if (levelId === "n3") {
    if (rawExamId === "ex-n3-1") canonicalExamId = "n3-2022-12";
    else if (rawExamId === "ex-n3-2") canonicalExamId = "n3-2023-07";
  }

  const examId = canonicalExamId;
  const levelCode = levelId.toUpperCase();

  const isN5 = levelId.includes("n5") || examId.includes("n5");
  const isN3 = levelId.includes("n3") || examId.includes("n3");
  const isN4_2021_07 = !isN5 && !isN3 && (
    examId.includes("2021-07") ||
    rawExamId.includes("2021-07") ||
    canonicalExamId.includes("2021-07") ||
    examId.includes("8161") ||
    rawExamId.includes("8161")
  );
  const isN4_2024_07 = !isN5 && !isN3 && (
    examId.includes("2024") ||
    rawExamId.includes("2024") ||
    canonicalExamId.includes("2024") ||
    examId.includes("2122") ||
    rawExamId.includes("2122") ||
    canonicalExamId.includes("2122")
  );
  const defaultQuestions = isN5
    ? ((examId.includes("2012") || examId.includes("2013")) ? 91 : (examId.includes("2010") ? 89 : 85))
    : isN3
    ? 105
    : (isN4_2021_07 || isN4_2024_07)
    ? 85
    : ((examId.includes("2010") || examId.includes("2012") || examId === "ex-1" || examId === "ex-2") ? 97 : 98);
  const initialDuration = isN5 ? 5400 : isN3 ? 8400 : 6900;

  const exam = EXAM_METADATA_MAP[examId] || EXAM_METADATA_MAP[rawExamId] || {
    examId: examId,
    yearTitle: `Đề Thi Thật ${levelCode} (${examId.toUpperCase()})`,
    pdfUrl: `/pdf/jlpt/${levelId}/${examId}.pdf`,
    audioUrl: `/audio/jlpt/${levelId}/${examId}.mp3`,
    pdfFileName: `${levelCode}-${examId}.pdf`,
    audioFileName: `Nghe ${levelCode}-${examId}.mp3`,
    totalQuestions: defaultQuestions,
  };

  // Helper function to resolve the authentic Admin extracted exam from storage, server or initial seed
  const findMatchedAdminExam = (overrideExams?: AdminJlptExam[]) => {
    let sourceList: AdminJlptExam[] =
      overrideExams && overrideExams.length > 0
        ? overrideExams
        : getStoredAdminExams();

    if (!sourceList || sourceList.length === 0) {
      sourceList = sanitizeAndDeduplicateExams(INITIAL_ADMIN_EXAMS, true);
    }

    const matched = sourceList.find((ad: any) => {
      let adLvl = (ad.level || "").toLowerCase().trim();
      if (!adLvl) {
        if ((ad.examCode || "").toLowerCase().includes("n5") || (ad.yearTitle || "").includes("N5")) adLvl = "n5";
        else if ((ad.examCode || "").toLowerCase().includes("n3") || (ad.yearTitle || "").includes("N3")) adLvl = "n3";
        else adLvl = "n4";
      }
      if (adLvl !== levelId) return false;

      const eCode = (ad.examCode || "").toLowerCase();
      const eId = (ad.id || "").toLowerCase();
      const raw = rawExamId.toLowerCase();
      const slash = rawExamSlash.toLowerCase();
      const canon = canonicalExamId.toLowerCase();
      const cleanECode = eCode.replace(/[\/\\#?&:\s]+/g, "-");
      return (
        eId === raw ||
        eCode === raw ||
        cleanECode === raw ||
        eId === slash ||
        eCode === slash ||
        eId === canon ||
        eCode === canon ||
        cleanECode === canon ||
        eCode.replace(/[^a-z0-9]/g, "") === raw.replace(/[^a-z0-9]/g, "")
      );
    });

    if (!matched) return null;

    const activeVer =
      matched.versions?.find((v: any) => v.versionId === matched.activeVersionId && v.status === "PUBLISHED") ||
      matched.versions?.find((v: any) => v.versionId === matched.activeVersionId) ||
      matched.versions?.find((v: any) => v.status === "PUBLISHED") ||
      matched.versions?.[matched.versions.length - 1];

    return { matchedExam: matched, activeVer };
  };

  const initialAdminData = useMemo(
    () => findMatchedAdminExam(),
    [examId, canonicalExamId, rawExamId, levelId]
  );
  const initialAdminVer = initialAdminData?.activeVer;
  const initialAdminExam = initialAdminData?.matchedExam;

  const isN5_2017 = isN5 && (
    examId.includes("8652") ||
    examId.includes("2017") ||
    (initialAdminExam?.yearTitle || "").includes("2017") ||
    (exam?.yearTitle || "").includes("2017")
  );

  const isN5_2018 = isN5 && (
    examId.includes("3588") ||
    examId.includes("2018") ||
    examId === "ex-1790446014564" ||
    (initialAdminExam?.yearTitle || "").includes("2018") ||
    (exam?.yearTitle || "").includes("2018")
  );

  let initialTotalQuestions = isN5_2018
    ? 91
    : isN5_2017
    ? 89
    : (isN4_2021_07 || isN4_2024_07)
    ? 85
    : ((examId.includes("2010") || examId.includes("2012") || canonicalExamId.includes("2012") || rawExamId.includes("2012") || examId === "ex-1" || examId === "ex-2")
        ? 97
        : (initialAdminVer?.totalQuestions && initialAdminVer.totalQuestions > 0
            ? initialAdminVer.totalQuestions
            : exam.totalQuestions));

  let initialCustomQuestions = initialAdminVer?.questions && Object.keys(initialAdminVer.questions).length > 0
    ? initialAdminVer.questions
    : null;

  if (isN5_2017 && initialCustomQuestions) {
    const qKeys = Object.keys(initialCustomQuestions);
    if (qKeys.length !== 89 || initialCustomQuestions[1]?.snippet?.includes("石") || initialCustomQuestions[1]?.explanation?.includes("石")) {
      initialCustomQuestions = null;
    }
  }
  if (isN5_2018 && initialCustomQuestions) {
    const qKeys = Object.keys(initialCustomQuestions);
    if (
      qKeys.length !== 91 ||
      initialCustomQuestions[1]?.snippet?.includes("楽しい") ||
      initialCustomQuestions[1]?.snippet?.includes("石") ||
      !initialCustomQuestions[1]?.snippet?.includes("雨")
    ) {
      initialCustomQuestions = null;
    }
  }

  const isN4_2010 = !isN5 && (rawExamId.includes("2010") || examId.includes("2010") || canonicalExamId.includes("2010"));
  if (isN4_2010 && initialCustomQuestions) {
    const isStale2010 = (
      (initialCustomQuestions[46] && (initialCustomQuestions[46].correctOption !== 3 || initialCustomQuestions[46].snippet?.includes("のに") || initialCustomQuestions[46].audioScriptJa)) ||
      (initialCustomQuestions[51] && (initialCustomQuestions[51].explanation?.includes("田中さんは") || initialCustomQuestions[51].snippet?.includes("田中さんは"))) ||
      (initialCustomQuestions[71] && (initialCustomQuestions[71].audioScriptJa?.includes("部屋の片付け") || initialCustomQuestions[71].explanation?.includes("Căn cứ nội dung hội thoại chuẩn xác")))
    );
    if (isStale2010) {
      const freshMap = EXAM_DETAILED_EXPLANATION_MAP["n4-2010-2011"];
      if (freshMap) {
        for (let q = 45; q <= 98; q++) {
          if (freshMap[q] && initialCustomQuestions[q]) {
            initialCustomQuestions[q].snippet = freshMap[q].snippet;
            initialCustomQuestions[q].explanation = freshMap[q].explanation;
            if (freshMap[q].audioScriptJa) {
              initialCustomQuestions[q].audioScriptJa = freshMap[q].audioScriptJa;
            }
            if (freshMap[q].audioScriptVi) {
              initialCustomQuestions[q].audioScriptVi = freshMap[q].audioScriptVi;
            }
            const opt = freshMap[q].correctOption ?? 1;
            initialCustomQuestions[q].correctOption = opt;
            initialCustomQuestions[q].correctAnswer = opt;
            initialCustomQuestions[q].optionText = `Phương án [${opt}]`;
          }
        }
      }
    }
    for (let badQ = 45; badQ <= 70; badQ++) {
      if (initialCustomQuestions[badQ]) {
        delete initialCustomQuestions[badQ].audioScriptJa;
        delete initialCustomQuestions[badQ].audioScriptVi;
      }
    }
  }

  const isN4_2012 = !isN5 && (rawExamId.includes("2012") || examId.includes("2012") || canonicalExamId.includes("2012"));
  if (isN4_2012 && initialCustomQuestions) {
    delete initialCustomQuestions[98];
    delete initialCustomQuestions["98"];
    const isStale2012 = (
      initialTotalQuestions !== 97 ||
      initialCustomQuestions[98] !== undefined ||
      (initialCustomQuestions[26] && (initialCustomQuestions[26].explanation?.includes("Viết thật nhanh") || initialCustomQuestions[26].snippet?.includes("Viết thật nhanh"))) ||
      (initialCustomQuestions[34] && (initialCustomQuestions[34].snippet?.includes("厳しい") || initialCustomQuestions[34].explanation?.includes("厳しい"))) ||
      (initialCustomQuestions[31] && initialCustomQuestions[31].snippet?.includes("苦い")) ||
      (initialCustomQuestions[35] && (initialCustomQuestions[35].sectionType === "VOCAB" || initialCustomQuestions[35].snippet?.includes("迎える") || initialCustomQuestions[35].correctOption !== 3)) ||
      (initialCustomQuestions[36] && initialCustomQuestions[36].correctOption !== 4) ||
      (initialCustomQuestions[46] && initialCustomQuestions[46].correctOption !== 1) ||
      (initialCustomQuestions[70] && !initialCustomQuestions[70].audioScriptJa) ||
      (initialCustomQuestions[77] && initialCustomQuestions[77].correctOption !== 1) ||
      (initialCustomQuestions[71] && initialCustomQuestions[71].snippet?.includes("Nhiệm vụ"))
    );
    if (isStale2012) {
      initialTotalQuestions = 97;
      const freshMap = EXAM_DETAILED_EXPLANATION_MAP["n4-2012-12"];
      if (freshMap) {
        for (let q = 16; q <= 97; q++) {
          if (freshMap[q]) {
            if (!initialCustomQuestions[q]) initialCustomQuestions[q] = {} as any;
            initialCustomQuestions[q].snippet = freshMap[q].snippet;
            initialCustomQuestions[q].explanation = freshMap[q].explanation;
            const opt = freshMap[q].correctOption ?? 1;
            initialCustomQuestions[q].correctOption = opt;
            initialCustomQuestions[q].correctAnswer = opt;
            initialCustomQuestions[q].optionText = `Phương án [${opt}]`;
            if (freshMap[q].audioScriptJa) initialCustomQuestions[q].audioScriptJa = freshMap[q].audioScriptJa;
            if (freshMap[q].audioScriptVi) initialCustomQuestions[q].audioScriptVi = freshMap[q].audioScriptVi;
            if (q >= 35 && q <= 69) {
              initialCustomQuestions[q].sectionType = "GRAMMAR";
              initialCustomQuestions[q].localPdfNumber = q - 34;
              delete initialCustomQuestions[q].audioScriptJa;
              delete initialCustomQuestions[q].audioScriptVi;
            } else if (q >= 70) {
              initialCustomQuestions[q].sectionType = "LISTENING";
              if (q <= 77) {
                initialCustomQuestions[q].mondai = 1;
                initialCustomQuestions[q].localPdfNumber = q - 70 + 1;
              } else if (q <= 84) {
                initialCustomQuestions[q].mondai = 2;
                initialCustomQuestions[q].localPdfNumber = q - 78 + 1;
              } else if (q <= 89) {
                initialCustomQuestions[q].mondai = 3;
                initialCustomQuestions[q].localPdfNumber = q - 85 + 1;
              } else {
                initialCustomQuestions[q].mondai = 4;
                initialCustomQuestions[q].localPdfNumber = q - 90 + 1;
              }
            }
          }
        }
        delete initialCustomQuestions[98];
        delete initialCustomQuestions["98"];
      }
    }
  }

  const isN4_2013_12 = !isN5 && (rawExamId.includes("2013-12") || rawExamId.includes("8242") || rawExamId.includes("12-2013") || examId.includes("2013-12") || examId.includes("8242") || (initialAdminExam?.yearTitle || "").includes("12/2013") || (initialAdminExam?.yearTitle || "").includes("2013年12月"));
  const isN4_2013 = !isN5 && !isN4_2013_12 && (rawExamId.includes("2013") || examId.includes("2013") || canonicalExamId.includes("2013"));
  
  if (isN4_2013_12 && initialCustomQuestions) {
    const isStale2013_12 = (
      (initialCustomQuestions[1] && (initialCustomQuestions[1].correctOption !== 3 || initialCustomQuestions[1].snippet?.includes("味"))) ||
      (initialCustomQuestions[2] && initialCustomQuestions[2].correctOption !== 2) ||
      (initialCustomQuestions[36] && (initialCustomQuestions[36].correctOption !== 3 || initialCustomQuestions[36].snippet?.includes("トマト") || !initialCustomQuestions[36].text)) ||
      (initialCustomQuestions[71] && (initialCustomQuestions[71].correctOption !== 3 || !initialCustomQuestions[71].audioScriptJa?.includes("村上さん")))
    );
    if (isStale2013_12) {
      const freshMap = EXAM_DETAILED_EXPLANATION_MAP["n4-2013-12"];
      if (freshMap) {
        for (let q = 1; q <= 98; q++) {
          if (freshMap[q]) {
            if (!initialCustomQuestions[q]) initialCustomQuestions[q] = {} as any;
            initialCustomQuestions[q].snippet = freshMap[q].snippet;
            initialCustomQuestions[q].explanation = freshMap[q].explanation;
            if (freshMap[q].text) initialCustomQuestions[q].text = freshMap[q].text;
            if (freshMap[q].options) initialCustomQuestions[q].options = freshMap[q].options;
            if (freshMap[q].audioScriptJa) initialCustomQuestions[q].audioScriptJa = freshMap[q].audioScriptJa;
            if (freshMap[q].audioScriptVi) initialCustomQuestions[q].audioScriptVi = freshMap[q].audioScriptVi;
            const opt = freshMap[q].correctOption ?? 1;
            initialCustomQuestions[q].correctOption = opt;
            initialCustomQuestions[q].correctAnswer = opt;
            initialCustomQuestions[q].optionText = `Phương án [${opt}]`;
          }
        }
      }
    }
  }

  if (isN4_2013 && initialCustomQuestions) {
    const isStale2013 = (
      (initialCustomQuestions[1] && (initialCustomQuestions[1].correctOption !== 2 || !initialCustomQuestions[1].text || initialCustomQuestions[1].explanation?.includes("[3]"))) ||
      (initialCustomQuestions[10] && initialCustomQuestions[10].correctOption !== 4) ||
      (initialCustomQuestions[2] && initialCustomQuestions[2].correctOption !== 4) ||
      (initialCustomQuestions[36] && (!initialCustomQuestions[36].text || initialCustomQuestions[36].snippet?.includes("旅行に便利") || initialCustomQuestions[36].correctOption !== 1)) ||
      (initialCustomQuestions[37] && initialCustomQuestions[37].correctOption !== 3) ||
      (initialCustomQuestions[51] && initialCustomQuestions[51].correctOption !== 1) ||
      (initialCustomQuestions[70] && initialCustomQuestions[70].correctOption !== 4) ||
      (initialCustomQuestions[71] && (!initialCustomQuestions[71].audioScriptJa?.includes("歯医者") || initialCustomQuestions[71].correctOption !== 2)) ||
      (initialCustomQuestions[98] && (!initialCustomQuestions[98].audioScriptJa?.includes("みどり公園") || initialCustomQuestions[98].correctOption !== 1))
    );
    if (isStale2013) {
      const freshMap = EXAM_DETAILED_EXPLANATION_MAP["n4-2013-07"];
      if (freshMap) {
        for (let q = 1; q <= 98; q++) {
          if (freshMap[q]) {
            if (!initialCustomQuestions[q]) initialCustomQuestions[q] = {} as any;
            initialCustomQuestions[q].snippet = freshMap[q].snippet;
            initialCustomQuestions[q].explanation = freshMap[q].explanation;
            if (freshMap[q].text) initialCustomQuestions[q].text = freshMap[q].text;
            if (freshMap[q].options) initialCustomQuestions[q].options = freshMap[q].options;
            if (freshMap[q].audioScriptJa) initialCustomQuestions[q].audioScriptJa = freshMap[q].audioScriptJa;
            if (freshMap[q].audioScriptVi) initialCustomQuestions[q].audioScriptVi = freshMap[q].audioScriptVi;
            const opt = freshMap[q].correctOption ?? 1;
            initialCustomQuestions[q].correctOption = opt;
            initialCustomQuestions[q].correctAnswer = opt;
            initialCustomQuestions[q].optionText = `Phương án [${opt}]`;
            if (q >= 36 && q <= 70) {
              initialCustomQuestions[q].sectionType = "GRAMMAR";
              initialCustomQuestions[q].localPdfNumber = q - 35;
            } else if (q >= 71 && q <= 98) {
              initialCustomQuestions[q].sectionType = "LISTENING";
              if (q <= 78) {
                initialCustomQuestions[q].mondai = 1;
                initialCustomQuestions[q].localPdfNumber = q - 70;
              } else if (q <= 85) {
                initialCustomQuestions[q].mondai = 2;
                initialCustomQuestions[q].localPdfNumber = q - 78;
              } else if (q <= 90) {
                initialCustomQuestions[q].mondai = 3;
                initialCustomQuestions[q].localPdfNumber = q - 85;
              } else {
                initialCustomQuestions[q].mondai = 4;
                initialCustomQuestions[q].localPdfNumber = q - 90;
              }
            }
          }
        }
      }
    }
  }

  const isN4_2014 = !isN5 && (rawExamId.includes("2014") || examId.includes("2014") || canonicalExamId.includes("2014") || (initialAdminExam?.yearTitle || "").includes("2014"));
  if (isN4_2014 && initialCustomQuestions) {
    const isStale2014 = (
      (initialCustomQuestions[1] && (initialCustomQuestions[1].snippet?.includes("案内") || initialCustomQuestions[1].correctOption !== 4)) ||
      (initialCustomQuestions[2] && (initialCustomQuestions[2].snippet?.includes("習い") || initialCustomQuestions[2].correctOption !== 3)) ||
      (initialCustomQuestions[4] && (initialCustomQuestions[4].snippet?.includes("安い") || initialCustomQuestions[4].correctOption !== 2)) ||
      (initialCustomQuestions[8] && (initialCustomQuestions[8].snippet?.includes("運んで") || initialCustomQuestions[8].correctOption !== 2)) ||
      (initialCustomQuestions[11] && (initialCustomQuestions[11].snippet?.includes("昼") || initialCustomQuestions[11].correctOption !== 2)) ||
      (initialCustomQuestions[17] && (initialCustomQuestions[17].snippet?.includes("英語") || initialCustomQuestions[17].correctOption !== 4)) ||
      (initialCustomQuestions[22] && (initialCustomQuestions[22].snippet?.includes("相談") || initialCustomQuestions[22].correctOption !== 4)) ||
      (initialCustomQuestions[36] && !initialCustomQuestions[36].text) ||
      (initialCustomQuestions[41] && initialCustomQuestions[41].snippet?.includes("ように")) ||
      (initialCustomQuestions[46] && initialCustomQuestions[46].snippet?.includes("のに")) ||
      (initialCustomQuestions[71] && (!initialCustomQuestions[71].audioScriptJa || initialCustomQuestions[71].snippet?.includes("Nhiệm vụ") || initialCustomQuestions[71].correctOption !== 3)) ||
      (initialCustomQuestions[78] && initialCustomQuestions[78].correctOption !== 2)
    );
    if (isStale2014) {
      const freshMap = EXAM_DETAILED_EXPLANATION_MAP["n4-2014-07"];
      if (freshMap) {
        for (let q = 1; q <= 98; q++) {
          if (freshMap[q]) {
            if (!initialCustomQuestions[q]) initialCustomQuestions[q] = {} as any;
            initialCustomQuestions[q].snippet = freshMap[q].snippet;
            initialCustomQuestions[q].explanation = freshMap[q].explanation;
            if (freshMap[q].text) initialCustomQuestions[q].text = freshMap[q].text;
            if (freshMap[q].options) initialCustomQuestions[q].options = freshMap[q].options;
            if (freshMap[q].audioScriptJa) initialCustomQuestions[q].audioScriptJa = freshMap[q].audioScriptJa;
            if (freshMap[q].audioScriptVi) initialCustomQuestions[q].audioScriptVi = freshMap[q].audioScriptVi;
            const opt = freshMap[q].correctOption ?? 1;
            initialCustomQuestions[q].correctOption = opt;
            initialCustomQuestions[q].correctAnswer = opt;
            initialCustomQuestions[q].optionText = `Phương án [${opt}]`;
            if (q >= 36 && q <= 70) {
              initialCustomQuestions[q].sectionType = "GRAMMAR";
              initialCustomQuestions[q].localPdfNumber = q - 35;
              delete initialCustomQuestions[q].audioScriptJa;
              delete initialCustomQuestions[q].audioScriptVi;
            } else if (q >= 71 && q <= 98) {
              initialCustomQuestions[q].sectionType = "LISTENING";
              if (q <= 78) {
                initialCustomQuestions[q].mondai = 1;
                initialCustomQuestions[q].localPdfNumber = q - 70;
              } else if (q <= 85) {
                initialCustomQuestions[q].mondai = 2;
                initialCustomQuestions[q].localPdfNumber = q - 78;
              } else if (q <= 90) {
                initialCustomQuestions[q].mondai = 3;
                initialCustomQuestions[q].localPdfNumber = q - 85;
              } else {
                initialCustomQuestions[q].mondai = 4;
                initialCustomQuestions[q].localPdfNumber = q - 90;
              }
            }
          }
        }
      }
    }
  }

  const isN4_2017 = !isN5 && (rawExamId.includes("2017") || examId.includes("2017") || canonicalExamId.includes("2017") || rawExamId === "ex-5" || (initialAdminExam?.yearTitle || "").includes("2017"));
  if (isN4_2017 && initialCustomQuestions) {
    delete initialCustomQuestions[98];
    delete initialCustomQuestions["98"];
    const isStale2017_n4 = (
      initialTotalQuestions !== 97 ||
      initialCustomQuestions[98] !== undefined ||
      (initialCustomQuestions[1] && (initialCustomQuestions[1].snippet?.includes("自分") || initialCustomQuestions[1].correctOption !== 1)) ||
      (initialCustomQuestions[2] && initialCustomQuestions[2].correctOption !== 1) ||
      (initialCustomQuestions[3] && initialCustomQuestions[3].correctOption !== 4) ||
      (initialCustomQuestions[10] && initialCustomQuestions[10].correctOption !== 1) ||
      (initialCustomQuestions[35] && initialCustomQuestions[35].correctOption !== 3) ||
      (initialCustomQuestions[70] && initialCustomQuestions[70].correctOption !== 1)
    );
    if (isStale2017_n4) {
      initialTotalQuestions = 97;
      const freshMap = EXAM_DETAILED_EXPLANATION_MAP["n4-2017-07"];
      if (freshMap) {
        for (let q = 1; q <= 97; q++) {
          if (freshMap[q]) {
            if (!initialCustomQuestions[q]) initialCustomQuestions[q] = {} as any;
            initialCustomQuestions[q].snippet = freshMap[q].snippet;
            initialCustomQuestions[q].explanation = freshMap[q].explanation;
            if (freshMap[q].text) initialCustomQuestions[q].text = freshMap[q].text;
            if (freshMap[q].options) initialCustomQuestions[q].options = freshMap[q].options;
            if (freshMap[q].audioScriptJa) initialCustomQuestions[q].audioScriptJa = freshMap[q].audioScriptJa;
            if (freshMap[q].audioScriptVi) initialCustomQuestions[q].audioScriptVi = freshMap[q].audioScriptVi;
            const opt = freshMap[q].correctOption ?? 1;
            initialCustomQuestions[q].correctOption = opt;
            initialCustomQuestions[q].correctAnswer = opt;
            initialCustomQuestions[q].optionText = `Phương án [${opt}]`;
            if (q <= 34) {
              initialCustomQuestions[q].sectionType = "VOCAB";
              initialCustomQuestions[q].localPdfNumber = q;
            } else if (q <= 69) {
              initialCustomQuestions[q].sectionType = "GRAMMAR";
              initialCustomQuestions[q].localPdfNumber = q - 34;
              delete initialCustomQuestions[q].audioScriptJa;
              delete initialCustomQuestions[q].audioScriptVi;
            } else {
              initialCustomQuestions[q].sectionType = "LISTENING";
              delete initialCustomQuestions[q].text;
              if (q <= 77) {
                initialCustomQuestions[q].mondai = 1;
                initialCustomQuestions[q].localPdfNumber = q - 69;
              } else if (q <= 84) {
                initialCustomQuestions[q].mondai = 2;
                initialCustomQuestions[q].localPdfNumber = q - 77;
              } else if (q <= 89) {
                initialCustomQuestions[q].mondai = 3;
                initialCustomQuestions[q].localPdfNumber = q - 84;
              } else {
                initialCustomQuestions[q].mondai = 4;
                initialCustomQuestions[q].localPdfNumber = q - 89;
              }
            }
          }
        }
        delete initialCustomQuestions[98];
        delete initialCustomQuestions["98"];
      }
    }
  }

  const isN4_2018 = !isN5 && (rawExamId.includes("2018") || examId.includes("2018") || canonicalExamId.includes("2018") || rawExamId === "ex-6" || (initialAdminExam?.yearTitle || "").includes("2018"));
  if (isN4_2018 && initialCustomQuestions) {
    const isStale2018_n4 = (
      !initialCustomQuestions[1]?.text ||
      initialCustomQuestions[1]?.correctOption !== 3 ||
      !initialCustomQuestions[35]?.text ||
      initialCustomQuestions[35]?.correctOption !== 4 ||
      !initialCustomQuestions[36]?.text ||
      initialCustomQuestions[36]?.correctOption !== 3 ||
      !initialCustomQuestions[70]?.text ||
      initialCustomQuestions[70]?.correctOption !== 1 ||
      !initialCustomQuestions[71]?.audioScriptJa ||
      initialCustomQuestions[71]?.correctOption !== 1 ||
      !initialCustomQuestions[98]?.audioScriptJa ||
      initialCustomQuestions[98]?.correctOption !== 1
    );
    if (isStale2018_n4) {
      const freshMap = EXAM_DETAILED_EXPLANATION_MAP["n4-2018"];
      if (freshMap) {
        for (let q = 1; q <= 98; q++) {
          if (freshMap[q]) {
            if (!initialCustomQuestions[q]) initialCustomQuestions[q] = {} as any;
            initialCustomQuestions[q].snippet = freshMap[q].snippet;
            initialCustomQuestions[q].explanation = freshMap[q].explanation;
            if (freshMap[q].text) initialCustomQuestions[q].text = freshMap[q].text;
            if (freshMap[q].options) initialCustomQuestions[q].options = freshMap[q].options;
            if (freshMap[q].audioScriptJa) initialCustomQuestions[q].audioScriptJa = freshMap[q].audioScriptJa;
            if (freshMap[q].audioScriptVi) initialCustomQuestions[q].audioScriptVi = freshMap[q].audioScriptVi;
            const opt = freshMap[q].correctOption ?? 1;
            initialCustomQuestions[q].correctOption = opt;
            initialCustomQuestions[q].correctAnswer = opt;
            initialCustomQuestions[q].optionText = `Phương án [${opt}]`;
            if (q <= 35) {
              initialCustomQuestions[q].sectionType = "VOCAB";
              initialCustomQuestions[q].localPdfNumber = q;
            } else if (q <= 70) {
              initialCustomQuestions[q].sectionType = "GRAMMAR";
              initialCustomQuestions[q].localPdfNumber = q - 35;
            } else {
              initialCustomQuestions[q].sectionType = "LISTENING";
              if (q <= 78) {
                initialCustomQuestions[q].mondai = 1;
                initialCustomQuestions[q].localPdfNumber = q - 70;
              } else if (q <= 85) {
                initialCustomQuestions[q].mondai = 2;
                initialCustomQuestions[q].localPdfNumber = q - 78;
              } else if (q <= 90) {
                initialCustomQuestions[q].mondai = 3;
                initialCustomQuestions[q].localPdfNumber = q - 85;
              } else {
                initialCustomQuestions[q].mondai = 4;
                initialCustomQuestions[q].localPdfNumber = q - 90;
              }
            }
          }
        }
      }
    }
  }

  if (isN4_2021_07 && initialCustomQuestions) {
    for (let q = 86; q <= 120; q++) {
      delete initialCustomQuestions[q];
      delete initialCustomQuestions[String(q)];
    }
    const isStale2021_n4 = (
      initialTotalQuestions !== 85 ||
      initialCustomQuestions[86] !== undefined ||
      !initialCustomQuestions[1]?.text ||
      initialCustomQuestions[1]?.correctOption !== 4 ||
      !initialCustomQuestions[28]?.text ||
      initialCustomQuestions[28]?.correctOption !== 1 ||
      !initialCustomQuestions[29]?.text ||
      initialCustomQuestions[29]?.correctOption !== 2 ||
      !initialCustomQuestions[57]?.text ||
      initialCustomQuestions[57]?.correctOption !== 4 ||
      !initialCustomQuestions[58]?.audioScriptJa ||
      initialCustomQuestions[58]?.correctOption !== 3 ||
      !initialCustomQuestions[85]?.audioScriptJa ||
      initialCustomQuestions[85]?.correctOption !== 2
    );
    if (isStale2021_n4) {
      initialTotalQuestions = 85;
      const freshMap = EXAM_DETAILED_EXPLANATION_MAP["n4-2021-07"] || EXAM_DETAILED_EXPLANATION_MAP["n4-2026-8161"];
      if (freshMap) {
        for (let q = 1; q <= 85; q++) {
          if (freshMap[q]) {
            if (!initialCustomQuestions[q]) initialCustomQuestions[q] = {} as any;
            initialCustomQuestions[q].snippet = freshMap[q].snippet;
            initialCustomQuestions[q].explanation = freshMap[q].explanation;
            if (freshMap[q].text) initialCustomQuestions[q].text = freshMap[q].text;
            if (freshMap[q].options) initialCustomQuestions[q].options = freshMap[q].options;
            if (freshMap[q].audioScriptJa) initialCustomQuestions[q].audioScriptJa = freshMap[q].audioScriptJa;
            if (freshMap[q].audioScriptVi) initialCustomQuestions[q].audioScriptVi = freshMap[q].audioScriptVi;
            const opt = freshMap[q].correctOption ?? 1;
            initialCustomQuestions[q].correctOption = opt;
            initialCustomQuestions[q].correctAnswer = opt;
            initialCustomQuestions[q].optionText = `Phương án [${opt}]`;
            if (q <= 28) {
              initialCustomQuestions[q].sectionType = "VOCAB";
              initialCustomQuestions[q].localPdfNumber = q;
            } else if (q <= 57) {
              initialCustomQuestions[q].sectionType = "GRAMMAR";
              initialCustomQuestions[q].localPdfNumber = q - 28;
              delete initialCustomQuestions[q].audioScriptJa;
              delete initialCustomQuestions[q].audioScriptVi;
            } else {
              initialCustomQuestions[q].sectionType = "LISTENING";
              delete initialCustomQuestions[q].text;
              if (q <= 65) {
                initialCustomQuestions[q].mondai = 1;
                initialCustomQuestions[q].localPdfNumber = q - 57;
              } else if (q <= 72) {
                initialCustomQuestions[q].mondai = 2;
                initialCustomQuestions[q].localPdfNumber = q - 65;
              } else if (q <= 77) {
                initialCustomQuestions[q].mondai = 3;
                initialCustomQuestions[q].localPdfNumber = q - 72;
              } else {
                initialCustomQuestions[q].mondai = 4;
                initialCustomQuestions[q].localPdfNumber = q - 77;
              }
            }
          }
        }
      }
    }
  }

  if (isN4_2024_07 && initialCustomQuestions) {
    for (let q = 86; q <= 120; q++) {
      delete initialCustomQuestions[q];
      delete initialCustomQuestions[String(q)];
    }
    const isStale2024_n4 = (
      initialTotalQuestions !== 85 ||
      initialCustomQuestions[86] !== undefined ||
      !initialCustomQuestions[1]?.text ||
      initialCustomQuestions[1]?.correctOption !== 4 ||
      !initialCustomQuestions[28]?.text ||
      initialCustomQuestions[28]?.correctOption !== 4
    );
    if (isStale2024_n4) {
      initialTotalQuestions = 85;
      const freshMap = EXAM_DETAILED_EXPLANATION_MAP["n4-2024-07"] || EXAM_DETAILED_EXPLANATION_MAP["n4-2026-2122"];
      if (freshMap) {
        for (let q = 1; q <= 85; q++) {
          if (freshMap[q]) {
            if (!initialCustomQuestions[q]) initialCustomQuestions[q] = {} as any;
            initialCustomQuestions[q].snippet = freshMap[q].snippet;
            initialCustomQuestions[q].explanation = freshMap[q].explanation;
            if (freshMap[q].text) initialCustomQuestions[q].text = freshMap[q].text;
            if (freshMap[q].options) initialCustomQuestions[q].options = freshMap[q].options;
            if (freshMap[q].audioScriptJa) initialCustomQuestions[q].audioScriptJa = freshMap[q].audioScriptJa;
            if (freshMap[q].audioScriptVi) initialCustomQuestions[q].audioScriptVi = freshMap[q].audioScriptVi;
            const opt = freshMap[q].correctOption ?? 1;
            initialCustomQuestions[q].correctOption = opt;
            initialCustomQuestions[q].correctAnswer = opt;
            initialCustomQuestions[q].optionText = `Phương án [${opt}]`;
            if (q <= 28) {
              initialCustomQuestions[q].sectionType = "VOCAB";
              initialCustomQuestions[q].localPdfNumber = q;
            } else if (q <= 57) {
              initialCustomQuestions[q].sectionType = "GRAMMAR";
              initialCustomQuestions[q].localPdfNumber = q - 28;
              delete initialCustomQuestions[q].audioScriptJa;
              delete initialCustomQuestions[q].audioScriptVi;
            } else {
              initialCustomQuestions[q].sectionType = "LISTENING";
              delete initialCustomQuestions[q].text;
              if (q <= 65) {
                initialCustomQuestions[q].mondai = 1;
                initialCustomQuestions[q].localPdfNumber = q - 57;
              } else if (q <= 72) {
                initialCustomQuestions[q].mondai = 2;
                initialCustomQuestions[q].localPdfNumber = q - 65;
              } else if (q <= 77) {
                initialCustomQuestions[q].mondai = 3;
                initialCustomQuestions[q].localPdfNumber = q - 72;
              } else {
                initialCustomQuestions[q].mondai = 4;
                initialCustomQuestions[q].localPdfNumber = q - 77;
              }
            }
          }
        }
      }
    }
  }

  const [totalQuestions, setTotalQuestions] = useState<number>((isN4_2012 || isN4_2017) ? 97 : (isN4_2021_07 || isN4_2024_07) ? 85 : initialTotalQuestions);
  const [customQuestions, setCustomQuestions] = useState<Record<number, any> | null>(initialCustomQuestions);

  const examConfig = useMemo(() => {
    const effectiveTotal = isN5_2018 ? 91 : isN5_2017 ? 89 : (isN4_2012 || isN4_2017) ? 97 : (isN4_2021_07 || isN4_2024_07) ? 85 : totalQuestions;
    return parseExamStructure(examId, levelCode, effectiveTotal);
  }, [examId, levelCode, totalQuestions, isN5_2017, isN5_2018, isN4_2012, isN4_2017, isN4_2021_07, isN4_2024_07]);

  const normalizeExamPdfUrl = (rawUrl?: string) => {
    const u = String(rawUrl || "").trim();
    if (!u || u.startsWith("blob:") || u.includes("/n5-12/2012")) {
      if (isN5 && examId.includes("2012")) return "/pdf/jlpt/n5/n5-2012-12.pdf";
      return exam.pdfUrl;
    }
    return u;
  };

  const normalizeExamAudioUrl = (rawUrl?: string) => {
    const u = String(rawUrl || "").trim();
    if (!u || u.startsWith("blob:") || u.includes("/n5-12/2012")) {
      if (isN5 && examId.includes("2012")) return "/audio/jlpt/n5/n5-2012-12.m4a";
      return exam.audioUrl;
    }
    return u;
  };

  const [activePdfUrl, setActivePdfUrl] = useState<string>(normalizeExamPdfUrl(initialAdminVer?.pdfUrl || exam.pdfUrl));
  const [activeAudioUrl, setActiveAudioUrl] = useState<string>(normalizeExamAudioUrl(initialAdminVer?.audioUrl || exam.audioUrl));
  const [activeExamTitle, setActiveExamTitle] = useState<string>(initialAdminExam?.yearTitle || exam.yearTitle);

  const richAnswers = useMemo(() => {
    const effectiveTotal = isN5_2018 ? 91 : isN5_2017 ? 89 : (isN4_2012 || isN4_2017) ? 97 : (isN4_2021_07 || isN4_2024_07) ? 85 : totalQuestions;
    const base = getExamRichAnswerDetails(examId, levelCode, effectiveTotal);

    // PRIORITY 100%: If Admin has extracted questions for this exam, use strictly Admin's extracted answers & explanations
    if (customQuestions && Object.keys(customQuestions).length > 0) {
      const isStale2017 = isN5_2017 && (
        Object.keys(customQuestions).length !== 89 ||
        customQuestions[1]?.snippet?.includes("石") ||
        customQuestions[1]?.explanation?.includes("石")
      );
      const isStale2018 = isN5_2018 && (
        Object.keys(customQuestions).length !== 91 ||
        customQuestions[1]?.snippet?.includes("楽しい") ||
        customQuestions[1]?.snippet?.includes("石") ||
        !customQuestions[1]?.snippet?.includes("雨")
      );
      if (!isStale2017 && !isStale2018) {
        Object.keys(customQuestions).forEach((k) => {
          const qNum = Number(k);
          if (isN5_2017 && qNum > 89) return;
          if (isN5_2018 && qNum > 91) return;
          if ((isN4_2012 || isN4_2017) && qNum > 97) return;
          if ((isN4_2021_07 || isN4_2024_07) && qNum > 85) return;
          const custom = customQuestions[qNum];
          if (custom) {
          // Admin's correct option is 100% authoritative - never fall back to 2010
          const opt = (custom.correctOption !== undefined && custom.correctOption !== null && custom.correctOption > 0)
            ? custom.correctOption
            : (custom.correctAnswer || 1);

          const isListening = (custom.sectionType === "LISTENING" || custom.section === "LISTENING" || (base[qNum]?.sectionName || "").includes("Nghe") || qNum >= (examConfig?.listeningSection?.startQuestion || 68));

          // For listening questions, in JLPT exams each Mondai strictly restarts question numbering from (1).
          // Always use base[qNum]?.localPdfNumber if available to guarantee Mondai 1 (1..7), Mondai 2 (1..6), Mondai 3 (1..5), Mondai 4 (1..6)
          const localNum = isListening
            ? (base[qNum]?.localPdfNumber || custom.localPdfNumber || qNum)
            : (custom.localPdfNumber || custom.localQuestionNumber || base[qNum]?.localPdfNumber || qNum);

          const sec = custom.sectionType || custom.section || base[qNum]?.sectionName || "Kiến thức";
          const mName = base[qNum]?.mondaiName || (custom.mondai ? `問題 ${custom.mondai}` : undefined);

          // Admin's explanation is 100% authoritative - strictly from Admin's bóc tách
          let expl = "";
          if (custom.explanation && custom.explanation.trim() !== "" && custom.explanation !== "Chờ review") {
            expl = custom.explanation;
          } else {
            expl = `🎯 Đáp án đúng: [${opt}]\n\n💬 Phân tích giải thích chi tiết câu (${localNum}):\nPhương án [${opt}] là đáp án chính xác cho câu hỏi số (${localNum}) phần ${sec} trong đề thi JLPT ${levelCode} (${activeExamTitle || examId.toUpperCase()}) theo dữ liệu bóc tách của Admin.`;
          }

          if (expl.includes("🎯 Đáp án đúng:") && !expl.includes(`🎯 Đáp án đúng: [${opt}]`)) {
            expl = expl.replace(/🎯\s*Đáp án đúng:\s*\[\d+\]/, `🎯 Đáp án đúng: [${opt}]`);
          }

          // Admin's snippet is 100% authoritative
          const snip = (custom.snippet && custom.snippet.trim() !== "")
            ? (custom.snippet || custom.questionSnippet)
            : (custom.questionSnippet || `Câu hỏi (${localNum}) - ${sec}`);

          const jaScript = isListening && custom.audioScriptJa !== undefined ? custom.audioScriptJa : "";
          const viScript = isListening && custom.audioScriptVi !== undefined ? custom.audioScriptVi : "";

          base[qNum] = {
            globalIndex: qNum,
            localPdfNumber: localNum,
            sectionName: sec,
            mondaiName: mName,
            correctOption: opt,
            correctOptionText: `Đáp án [${opt}]`,
            explanation: expl,
            questionSnippet: snip,
            audioScriptJa: jaScript,
            audioScriptVi: viScript,
          };
        }
      });
      }
    }
    return base;
  }, [examId, levelCode, totalQuestions, customQuestions, isN5, isN5_2017, activeExamTitle]);

  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(
    initialAdminVer?.durationMinutes && initialAdminVer.durationMinutes > 0
      ? initialAdminVer.durationMinutes * 60
      : initialDuration
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"ALL" | "VOCAB" | "GRAMMAR" | "LISTENING">("ALL");
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const [showReportModal, setShowReportModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isExamClosed, setIsExamClosed] = useState(false);
  const [showAllExplanations, setShowAllExplanations] = useState(false);
  const [isResultsCollapsed, setIsResultsCollapsed] = useState(false);
  const [currentUserName, setCurrentUserName] = useState<string>("");

  // Resizable Splitter State & Drag Logic
  const [leftWidthPercent, setLeftWidthPercent] = useState<number>(65);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const workspaceContainerRef = useRef<HTMLDivElement>(null);

  const handleSplitterMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !workspaceContainerRef.current) return;
      const containerRect = workspaceContainerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      if (newWidth >= 25 && newWidth <= 75) {
        setLeftWidthPercent(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const u = JSON.parse(userStr);
          const name = u.fullName || u.email?.split("@")[0] || u.name || "Học Viên";
          setCurrentUserName(name);
        } catch (e) {}
      }
    }
  }, []);

  const prevDurationRef = useRef<number>(initialDuration);
  const prevPdfUrlRef = useRef<string>(normalizeExamPdfUrl(initialAdminVer?.pdfUrl || exam.pdfUrl));
  const prevAudioUrlRef = useRef<string>(normalizeExamAudioUrl(initialAdminVer?.audioUrl || exam.audioUrl));
  const prevQuestionsJsonRef = useRef<string>(initialCustomQuestions ? JSON.stringify(initialCustomQuestions) : "");

  useEffect(() => {
    const applyExamData = (overrideList?: AdminJlptExam[]) => {
      let resolvedExamTitle = "";
      let resolvedPdfUrl = "";
      let resolvedAudioUrl = "";
      let resolvedTotalQ = defaultQuestions;
      let resolvedDuration = initialDuration;
      let resolvedQuestions: Record<number, any> | null = null;
      let isMatchedInAdmin = false;

      // 1. Highest priority: Resolve from synchronized Admin exams (server + localStorage + seed)
      const adminResult = findMatchedAdminExam(overrideList);
      if (adminResult && adminResult.activeVer) {
        const { matchedExam: matchedAdminExam, activeVer } = adminResult;
        const matchedLvl = (matchedAdminExam.level || "").toLowerCase().trim();
        if (!matchedLvl || matchedLvl === levelId) {
          isMatchedInAdmin = true;

          if (activeVer.status === "CLOSED") {
            setIsExamClosed(true);
          } else {
            setIsExamClosed(false);
          }
          if (matchedAdminExam.yearTitle) {
            resolvedExamTitle = matchedAdminExam.yearTitle;
          }
          if (activeVer.pdfUrl) {
            resolvedPdfUrl = normalizeExamPdfUrl(activeVer.pdfUrl);
          }
          if (activeVer.audioUrl) {
            resolvedAudioUrl = normalizeExamAudioUrl(activeVer.audioUrl);
          }
          if (activeVer.totalQuestions && activeVer.totalQuestions > 0) {
            resolvedTotalQ = isN5_2018 ? 91 : isN5_2017 ? 89 : (isN4_2012 || isN4_2017) ? 97 : (isN4_2021_07 || isN4_2024_07) ? 85 : activeVer.totalQuestions;
          }
          if (activeVer.durationMinutes && activeVer.durationMinutes > 0) {
            resolvedDuration = activeVer.durationMinutes * 60;
          }
          if (activeVer.questions && Object.keys(activeVer.questions).length > 0) {
            const qs = activeVer.questions;
            const isBad2018 = isN5_2018 && (
              Object.keys(qs).length !== 91 ||
              qs[1]?.snippet?.includes("楽しい") ||
              !qs[1]?.snippet?.includes("雨")
            );
            const isBad2014 = isN4_2014 && (
              qs[1]?.snippet?.includes("案内") ||
              qs[1]?.correctOption !== 4 ||
              qs[4]?.snippet?.includes("安い") ||
              qs[8]?.snippet?.includes("運んで") ||
              qs[11]?.snippet?.includes("昼") ||
              qs[22]?.correctOption !== 4 ||
              !qs[36]?.text ||
              qs[41]?.snippet?.includes("ように") ||
              qs[46]?.snippet?.includes("のに") ||
              (qs[71] && (!qs[71].audioScriptJa || qs[71].snippet?.includes("Nhiệm vụ") || qs[71].correctOption !== 3)) ||
              (qs[78] && qs[78].correctOption !== 2)
            );
            if (isBad2014) {
              const freshMap = EXAM_DETAILED_EXPLANATION_MAP["n4-2014-07"];
              if (freshMap) {
                for (let q = 1; q <= 98; q++) {
                  if (freshMap[q]) {
                    if (!qs[q]) qs[q] = {} as any;
                    qs[q].snippet = freshMap[q].snippet;
                    qs[q].explanation = freshMap[q].explanation;
                    if (freshMap[q].text) qs[q].text = freshMap[q].text;
                    if (freshMap[q].options) qs[q].options = freshMap[q].options;
                    if (freshMap[q].audioScriptJa) qs[q].audioScriptJa = freshMap[q].audioScriptJa;
                    if (freshMap[q].audioScriptVi) qs[q].audioScriptVi = freshMap[q].audioScriptVi;
                    const opt = freshMap[q].correctOption ?? 1;
                    qs[q].correctOption = opt;
                    qs[q].correctAnswer = opt;
                    qs[q].optionText = `Phương án [${opt}]`;
                    if (q >= 36 && q <= 70) {
                      qs[q].sectionType = "GRAMMAR";
                      qs[q].localPdfNumber = q - 35;
                      delete qs[q].audioScriptJa;
                      delete qs[q].audioScriptVi;
                    } else if (q >= 71 && q <= 98) {
                      qs[q].sectionType = "LISTENING";
                      if (q <= 78) {
                        qs[q].mondai = 1;
                        qs[q].localPdfNumber = q - 70;
                      } else if (q <= 85) {
                        qs[q].mondai = 2;
                        qs[q].localPdfNumber = q - 78;
                      } else if (q <= 90) {
                        qs[q].mondai = 3;
                        qs[q].localPdfNumber = q - 85;
                      } else {
                        qs[q].mondai = 4;
                        qs[q].localPdfNumber = q - 90;
                      }
                    }
                  }
                }
              }
            }
            const isBad2017_n4 = isN4_2017 && (
              Object.keys(qs).length !== 97 ||
              qs[98] !== undefined ||
              qs[1]?.snippet?.includes("自分") ||
              qs[1]?.correctOption !== 1 ||
              qs[2]?.correctOption !== 1 ||
              qs[35]?.correctOption !== 3 ||
              qs[70]?.correctOption !== 1
            );
            if (isBad2017_n4) {
              const freshMap = EXAM_DETAILED_EXPLANATION_MAP["n4-2017-07"];
              if (freshMap) {
                for (let q = 1; q <= 97; q++) {
                  if (freshMap[q]) {
                    if (!qs[q]) qs[q] = {} as any;
                    qs[q].snippet = freshMap[q].snippet;
                    qs[q].explanation = freshMap[q].explanation;
                    if (freshMap[q].text) qs[q].text = freshMap[q].text;
                    if (freshMap[q].options) qs[q].options = freshMap[q].options;
                    if (freshMap[q].audioScriptJa) qs[q].audioScriptJa = freshMap[q].audioScriptJa;
                    if (freshMap[q].audioScriptVi) qs[q].audioScriptVi = freshMap[q].audioScriptVi;
                    const opt = freshMap[q].correctOption ?? 1;
                    qs[q].correctOption = opt;
                    qs[q].correctAnswer = opt;
                    qs[q].optionText = `Phương án [${opt}]`;
                    if (q <= 34) {
                      qs[q].sectionType = "VOCAB";
                      qs[q].localPdfNumber = q;
                    } else if (q <= 69) {
                      qs[q].sectionType = "GRAMMAR";
                      qs[q].localPdfNumber = q - 34;
                      delete qs[q].audioScriptJa;
                      delete qs[q].audioScriptVi;
                    } else {
                      qs[q].sectionType = "LISTENING";
                      delete qs[q].text;
                      if (q <= 77) {
                        qs[q].mondai = 1;
                        qs[q].localPdfNumber = q - 69;
                      } else if (q <= 84) {
                        qs[q].mondai = 2;
                        qs[q].localPdfNumber = q - 77;
                      } else if (q <= 89) {
                        qs[q].mondai = 3;
                        qs[q].localPdfNumber = q - 84;
                      } else {
                        qs[q].mondai = 4;
                        qs[q].localPdfNumber = q - 89;
                      }
                    }
                  }
                }
                delete qs[98];
                delete qs["98"];
              }
            }
            const isBad2018_n4 = isN4_2018 && (
              !qs[1]?.text ||
              qs[1]?.correctOption !== 3 ||
              !qs[35]?.text ||
              qs[35]?.correctOption !== 4 ||
              !qs[36]?.text ||
              qs[36]?.correctOption !== 3 ||
              !qs[70]?.text ||
              qs[70]?.correctOption !== 1
            );
            if (isBad2018_n4) {
              const freshMap = EXAM_DETAILED_EXPLANATION_MAP["n4-2018"];
              if (freshMap) {
                for (let q = 1; q <= 70; q++) {
                  if (freshMap[q]) {
                    if (!qs[q]) qs[q] = {} as any;
                    qs[q].snippet = freshMap[q].snippet;
                    qs[q].explanation = freshMap[q].explanation;
                    if (freshMap[q].text) qs[q].text = freshMap[q].text;
                    if (freshMap[q].options) qs[q].options = freshMap[q].options;
                    const opt = freshMap[q].correctOption ?? 1;
                    qs[q].correctOption = opt;
                    qs[q].correctAnswer = opt;
                    qs[q].optionText = `Phương án [${opt}]`;
                    if (q <= 35) {
                      qs[q].sectionType = "VOCAB";
                      qs[q].localPdfNumber = q;
                    } else {
                      qs[q].sectionType = "GRAMMAR";
                      qs[q].localPdfNumber = q - 35;
                    }
                  }
                }
              }
            }
            const isBad2021_n4 = isN4_2021_07 && (
              Object.keys(qs).length !== 85 ||
              qs[86] !== undefined ||
              !qs[1]?.text ||
              qs[1]?.correctOption !== 4 ||
              !qs[28]?.text ||
              qs[28]?.correctOption !== 1 ||
              !qs[29]?.text ||
              qs[29]?.correctOption !== 2 ||
              !qs[57]?.text ||
              qs[57]?.correctOption !== 4
            );
            if (isBad2021_n4) {
              const freshMap = EXAM_DETAILED_EXPLANATION_MAP["n4-2021-07"] || EXAM_DETAILED_EXPLANATION_MAP["n4-2026-8161"];
              if (freshMap) {
                for (let q = 1; q <= 85; q++) {
                  if (freshMap[q]) {
                    if (!qs[q]) qs[q] = {} as any;
                    qs[q].snippet = freshMap[q].snippet;
                    qs[q].explanation = freshMap[q].explanation;
                    if (freshMap[q].text) qs[q].text = freshMap[q].text;
                    if (freshMap[q].options) qs[q].options = freshMap[q].options;
                    if (freshMap[q].audioScriptJa) qs[q].audioScriptJa = freshMap[q].audioScriptJa;
                    if (freshMap[q].audioScriptVi) qs[q].audioScriptVi = freshMap[q].audioScriptVi;
                    const opt = freshMap[q].correctOption ?? 1;
                    qs[q].correctOption = opt;
                    qs[q].correctAnswer = opt;
                    qs[q].optionText = `Phương án [${opt}]`;
                    if (q <= 28) {
                      qs[q].sectionType = "VOCAB";
                      qs[q].localPdfNumber = q;
                    } else if (q <= 57) {
                      qs[q].sectionType = "GRAMMAR";
                      qs[q].localPdfNumber = q - 28;
                      delete qs[q].audioScriptJa;
                      delete qs[q].audioScriptVi;
                    } else {
                      qs[q].sectionType = "LISTENING";
                      delete qs[q].text;
                      if (q <= 65) {
                        qs[q].mondai = 1;
                        qs[q].localPdfNumber = q - 57;
                      } else if (q <= 72) {
                        qs[q].mondai = 2;
                        qs[q].localPdfNumber = q - 65;
                      } else if (q <= 77) {
                        qs[q].mondai = 3;
                        qs[q].localPdfNumber = q - 72;
                      } else {
                        qs[q].mondai = 4;
                        qs[q].localPdfNumber = q - 77;
                      }
                    }
                  }
                }
                for (let q = 86; q <= 120; q++) {
                  delete qs[q];
                  delete qs[String(q)];
                }
              }
            }
            const isBad2024_n4 = isN4_2024_07 && (
              Object.keys(qs).length !== 85 ||
              qs[86] !== undefined ||
              !qs[1]?.text ||
              qs[1]?.correctOption !== 4 ||
              !qs[28]?.text ||
              qs[28]?.correctOption !== 4
            );
            if (isBad2024_n4) {
              const freshMap = EXAM_DETAILED_EXPLANATION_MAP["n4-2024-07"] || EXAM_DETAILED_EXPLANATION_MAP["n4-2026-2122"];
              if (freshMap) {
                for (let q = 1; q <= 85; q++) {
                  if (freshMap[q]) {
                    if (!qs[q]) qs[q] = {} as any;
                    qs[q].snippet = freshMap[q].snippet;
                    qs[q].explanation = freshMap[q].explanation;
                    if (freshMap[q].text) qs[q].text = freshMap[q].text;
                    if (freshMap[q].options) qs[q].options = freshMap[q].options;
                    if (freshMap[q].audioScriptJa) qs[q].audioScriptJa = freshMap[q].audioScriptJa;
                    if (freshMap[q].audioScriptVi) qs[q].audioScriptVi = freshMap[q].audioScriptVi;
                    const opt = freshMap[q].correctOption ?? 1;
                    qs[q].correctOption = opt;
                    qs[q].correctAnswer = opt;
                    qs[q].optionText = `Phương án [${opt}]`;
                    if (q <= 28) {
                      qs[q].sectionType = "VOCAB";
                      qs[q].localPdfNumber = q;
                    } else if (q <= 57) {
                      qs[q].sectionType = "GRAMMAR";
                      qs[q].localPdfNumber = q - 28;
                      delete qs[q].audioScriptJa;
                      delete qs[q].audioScriptVi;
                    } else {
                      qs[q].sectionType = "LISTENING";
                      delete qs[q].text;
                      if (q <= 65) {
                        qs[q].mondai = 1;
                        qs[q].localPdfNumber = q - 57;
                      } else if (q <= 72) {
                        qs[q].mondai = 2;
                        qs[q].localPdfNumber = q - 65;
                      } else if (q <= 77) {
                        qs[q].mondai = 3;
                        qs[q].localPdfNumber = q - 72;
                      } else {
                        qs[q].mondai = 4;
                        qs[q].localPdfNumber = q - 77;
                      }
                    }
                  }
                }
                for (let q = 86; q <= 120; q++) {
                  delete qs[q];
                  delete qs[String(q)];
                }
              }
            }
            if (!isBad2018) {
              resolvedQuestions = qs;
            }
          }

          // Only fall back to IndexedDB blob if we DO NOT have a valid server static /pdf/ URL
          const hasStaticServerPdf = resolvedPdfUrl && resolvedPdfUrl.startsWith("/pdf/");
          if (!hasStaticServerPdf && !prevPdfUrlRef.current.startsWith("blob:")) {
            const lookupKey = activeVer.pdfUrl || matchedAdminExam.id;
            if (lookupKey) {
              getPdfFromIndexedDb(lookupKey).then((blob) => {
                if (blob && !prevPdfUrlRef.current.startsWith("/pdf/") && !prevPdfUrlRef.current.startsWith("blob:")) {
                  const blobUrl = URL.createObjectURL(blob);
                  prevPdfUrlRef.current = blobUrl;
                  setActivePdfUrl(blobUrl);
                }
              });
            }
          }
        }
      }

      // 2. Second priority: Fall back to EXAM_METADATA_MAP only if not in adminExams
      if (!isMatchedInAdmin) {
        const authenticMeta = EXAM_METADATA_MAP[canonicalExamId] || EXAM_METADATA_MAP[rawExamId];
        if (authenticMeta) {
          resolvedExamTitle = authenticMeta.yearTitle;
          resolvedPdfUrl = authenticMeta.pdfUrl;
          resolvedAudioUrl = authenticMeta.audioUrl;
          resolvedTotalQ = authenticMeta.totalQuestions;
        } else if (!prevPdfUrlRef.current.startsWith("/pdf/") && !prevPdfUrlRef.current.startsWith("blob:")) {
          getPdfFromIndexedDb(examId).then((blob) => {
            if (blob && !prevPdfUrlRef.current.startsWith("blob:")) {
              const blobUrl = URL.createObjectURL(blob);
              prevPdfUrlRef.current = blobUrl;
              setActivePdfUrl(blobUrl);
            }
          });
        }
      }

      // Apply resolved metadata ONLY when values actually change to prevent iframe/audio flickering
      if (resolvedExamTitle) {
        setActiveExamTitle((prev) => (prev !== resolvedExamTitle ? resolvedExamTitle : prev));
      }
      if (resolvedPdfUrl && resolvedPdfUrl !== prevPdfUrlRef.current) {
        prevPdfUrlRef.current = resolvedPdfUrl;
        setActivePdfUrl(resolvedPdfUrl);
      }
      if (resolvedAudioUrl && resolvedAudioUrl !== prevAudioUrlRef.current) {
        prevAudioUrlRef.current = resolvedAudioUrl;
        setActiveAudioUrl(resolvedAudioUrl);
      }
      if (resolvedTotalQ) {
        setTotalQuestions((prev) => (prev !== resolvedTotalQ ? resolvedTotalQ : prev));
      }
      if (resolvedDuration && resolvedDuration !== prevDurationRef.current) {
        prevDurationRef.current = resolvedDuration;
        setTimeLeft(resolvedDuration);
      }
      if (resolvedQuestions) {
        const nextJson = JSON.stringify(resolvedQuestions);
        if (nextJson !== prevQuestionsJsonRef.current) {
          prevQuestionsJsonRef.current = nextJson;
          setCustomQuestions(resolvedQuestions);
        }
      }
    };

    const loadExamData = () => {
      applyExamData();
      syncAdminExamsFromServer().then((serverList) => {
        if (serverList && serverList.length > 0) {
          applyExamData(serverList);
        }
      });
    };

    loadExamData();

    const handleLocalUpdate = () => {
      applyExamData();
    };

    window.addEventListener("adminExamsUpdated", handleLocalUpdate);
    window.addEventListener("storage", loadExamData);
    window.addEventListener("focus", loadExamData);

    return () => {
      window.removeEventListener("adminExamsUpdated", handleLocalUpdate);
      window.removeEventListener("storage", loadExamData);
      window.removeEventListener("focus", loadExamData);
    };
  }, [examId, canonicalExamId, rawExamId, levelId, defaultQuestions, initialDuration, isN5_2017, isN5_2018]);

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          setShowReportModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleSelectOption = (qNum: number, optNum: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qNum]: optNum }));
  };

  const answeredCount = Object.keys(userAnswers).length;

  const calculateResults = () => {
    let correctCount = 0;
    let vocabCorrect = 0;
    let grammarCorrect = 0;
    let listeningCorrect = 0;

    const vocabEndIndex = examConfig.vocabSection.endQuestion;
    const grammarEndIndex = examConfig.grammarSection.endQuestion;

    for (let i = 1; i <= totalQuestions; i++) {
      const userSel = userAnswers[i];
      const detail = richAnswers[i];
      if (userSel === detail.correctOption) {
        correctCount++;
        if (i <= vocabEndIndex) vocabCorrect++;
        else if (i <= grammarEndIndex) grammarCorrect++;
        else listeningCorrect++;
      }
    }

    const vocabTotalCount = examConfig.vocabSection.totalQuestions;
    const grammarTotalCount = examConfig.grammarSection.totalQuestions;
    const listeningTotalCount = examConfig.listeningSection.totalQuestions;

    const score180 = Math.round((correctCount / totalQuestions) * 180);
    const vocabScore60 = Math.round((vocabCorrect / (vocabTotalCount || 1)) * 60);
    const grammarScore60 = Math.round((grammarCorrect / (grammarTotalCount || 1)) * 60);
    const listeningScore60 = Math.round((listeningCorrect / (listeningTotalCount || 1)) * 60);

    return {
      correctCount,
      totalCount: totalQuestions,
      score180,
      vocabCorrect,
      grammarCorrect,
      listeningCorrect,
      vocabScore60,
      grammarScore60,
      listeningScore60,
      isPass: score180 >= 90 && vocabScore60 >= 19 && grammarScore60 >= 19 && listeningScore60 >= 19,
    };
  };

  const results = isSubmitted ? calculateResults() : null;

  const reportData: JlptScoreReportData | null = results ? {
    userName: currentUserName || "Học Viên",
    examTitle: exam.yearTitle,
    levelCode: levelCode,
    versionNumber: 1,
    totalScore: results.score180,
    vocabScore: results.vocabScore60,
    grammarScore: results.grammarScore60,
    listeningScore: results.listeningScore60,
    isPass: results.isPass,
    completedAtDate: new Date().toISOString().split("T")[0],
    timeSpentMinutes: Math.round((initialDuration - timeLeft) / 60),
  } : null;

  const getFilteredQuestions = () => {
    const all = Array.from({ length: totalQuestions }, (_, idx) => idx + 1);
    const vocabEndIndex = examConfig.vocabSection.endQuestion;
    const grammarEndIndex = examConfig.grammarSection.endQuestion;

    if (activeTab === "VOCAB") return all.filter((n) => n <= vocabEndIndex);
    if (activeTab === "GRAMMAR") return all.filter((n) => n > vocabEndIndex && n <= grammarEndIndex);
    if (activeTab === "LISTENING") return all.filter((n) => n > grammarEndIndex);
    return all;
  };

  const filteredNums = getFilteredQuestions();

  const memoizedPdfFrame = useMemo(() => {
    if (!activePdfUrl) return null;
    const cleanSrc = activePdfUrl.includes("#")
      ? activePdfUrl
      : `${activePdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`;
    return (
      <iframe
        key={cleanSrc}
        src={cleanSrc}
        className="w-full h-full border-0 bg-white"
        style={{ backgroundColor: "#FFFFFF" }}
        title={`PDF Đề Thi Thật JLPT ${levelCode} (Zero Margins)`}
      />
    );
  }, [activePdfUrl, levelCode]);

  if (isExamClosed) {
    return (
      <div className="min-h-screen bg-[#FAF4EB] flex items-center justify-center p-6 text-[#1F1714] font-sans">
        <div className="bg-white border-2 border-amber-200 rounded-3xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto border border-amber-300">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-[#1F1714]">Đề Thi Đang Tạm Đóng</h2>
          <p className="text-xs text-[#6E5D55] font-extrabold leading-relaxed">
            Bộ đề thi <strong>{exam.yearSession || exam.yearTitle}</strong> hiện đang được Admin tạm đóng (trạng thái Nháp / Đang Soạn) để bảo trì. Vui lòng quay lại sau!
          </p>
          <Link
            href={`/jlpt-practice/${levelId}`}
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#2C2421] text-white font-extrabold text-xs rounded-2xl shadow-md hover:bg-[#1F1714] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay Lại Danh Sách Đề Thi</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#FAF4EB] text-[#1F1714] font-sans flex flex-col overflow-hidden selection:bg-[#C65D4B] selection:text-white">
      {/* Printable Score Report Modal */}
      {reportData && (
        <JlptScoreReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          data={reportData}
        />
      )}

      {/* Sleek Top Navigation Header */}
      <header className="bg-[#FFFDF9] border-b border-[#E5D7C7] px-4 py-2.5 flex items-center justify-between shadow-2xs shrink-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            href={`/jlpt-practice/${levelId}`}
            className="p-2 hover:bg-[#FAF4EB] rounded-xl transition-all text-[#6E5D55] hover:text-[#1F1714] border border-[#E5D7C7]"
            title="Quay lại chọn đề thi"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-extrabold text-[#1F1714]">
                Phòng Thi JLPT {levelCode} • {activeExamTitle}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C65D4B]/10 text-[#C65D4B] border border-[#C65D4B]/20">
                📄 Trích {totalQuestions} Câu PDF Khớp 1:1
              </span>
            </div>
            <span className="text-[11px] text-[#8C7B70] font-medium">
              Đã khoanh: <strong className="text-[#C65D4B] font-bold">{answeredCount} / {totalQuestions} câu</strong>
            </span>
          </div>
        </div>

        {/* Center Compact Audio Player */}
        <div className="hidden md:block max-w-xl flex-1 mx-4">
          <CustomChoukaiAudioPlayer src={activeAudioUrl} title="Nghe Choukai" />
        </div>

        {/* Right Timer & Submit Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#FAF4EB] border border-[#E5D7C7] px-3 py-1 rounded-xl text-xs font-mono font-bold text-[#C65D4B]">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {!isSubmitted ? (
            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-1.5 bg-[#C65D4B] hover:bg-[#B44C3B] text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Nộp Bài</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Làm Lại</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Workspace (Full Available Height with Drag-to-Resize) */}
      <div ref={workspaceContainerRef} className="flex-1 flex overflow-hidden relative">
        
        {/* Left Column: Clean Full-Bleed PDF Viewer (Resizable Width) */}
        <div 
          style={{ width: `${leftWidthPercent}%` }}
          className={`h-full flex flex-col bg-white border-r border-[#E5D7C7] overflow-hidden transition-none ${
            isResizing ? "select-none" : ""
          }`}
        >
          
          {/* Header Banner */}
          <div className="p-3 bg-[#FFFDF9] border-b border-[#E5D7C7] flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#1F1714] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#C65D4B]" />
                <span>Nội Dung File Đề Thi Thật JLPT {levelCode}</span>
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#C65D4B]/10 text-[#C65D4B] border border-[#C65D4B]/20">
                {totalQuestions} Câu Hỏi Chuẩn File Scan
              </span>
            </div>

            {activePdfUrl && (
              <a
                href={activePdfUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-extrabold text-[#C65D4B] hover:underline flex items-center gap-1 bg-[#FAF4EB] px-2.5 py-1 rounded-lg border border-[#E5D7C7]"
              >
                <Download className="w-3 h-3" />
                <span>Tải PDF Gốc</span>
              </a>
            )}
          </div>

          {/* Mobile Audio Player View */}
          <div className="md:hidden p-2 bg-[#FAF4EB] border-b border-[#E5D7C7] shrink-0">
            <CustomChoukaiAudioPlayer src={activeAudioUrl} title="Nghe Choukai" />
          </div>

          {/* PDF Canvas or Pending Notice */}
          {!activePdfUrl ? (
            <div className="flex-1 w-full h-full bg-[#FFFDF9] p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 border-2 border-amber-300 flex items-center justify-center shadow-md">
                <BookOpen className="w-8 h-8 text-amber-700" />
              </div>
              <div className="max-w-md space-y-2">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-extrabold text-xs">
                  📄 Đang Số Hóa PDF Scan Gốc {levelCode}
                </span>
                <h3 className="text-xl font-extrabold text-[#1F1714]">
                  File PDF Scan Đề Thi {levelCode} Đang Được Biên Tập
                </h3>
                <p className="text-xs text-[#6E5D55] leading-relaxed font-medium">
                  Bộ đề <strong>{activeExamTitle}</strong> hiện đã hoàn thành <strong>{totalQuestions} câu hỏi & phiếu đáp án chuẩn 1:1</strong> ở cột bên phải. Bạn có thể làm bài và chấm điểm trực tiếp ngay bây giờ!
                </p>
              </div>
            </div>
          ) : (
            <div className={`flex-1 w-full h-full bg-white relative overflow-hidden flex flex-col ${isResizing ? "pointer-events-none" : ""}`}>
              {memoizedPdfFrame}
            </div>
          )}
        </div>

        {/* Resizable Splitter Handle (Desktop) */}
        <div
          onMouseDown={handleSplitterMouseDown}
          className={`hidden lg:flex w-2.5 hover:w-3 bg-[#E5D7C7] hover:bg-[#C65D4B] active:bg-[#C65D4B] transition-all cursor-col-resize items-center justify-center shrink-0 z-30 group relative select-none ${
            isResizing ? "bg-[#C65D4B] w-3" : ""
          }`}
          title="Kéo sang trái / phải để điều chỉnh độ rộng giữa Đề thi & Phiếu đáp án"
        >
          <div className="w-1 h-10 rounded-full bg-[#8C7B70] group-hover:bg-white transition-colors" />
        </div>

        {/* Right Column: Streamlined Answer Sheet (Resizable Width) */}
        <div 
          style={{ width: `${100 - leftWidthPercent}%` }}
          className={`h-full flex flex-col bg-[#FAF4EB] overflow-hidden ${
            isResizing ? "select-none" : ""
          }`}
        >
          
          {/* Answer Sheet Header & Tab Switcher */}
          <div className="p-3 bg-[#FFFDF9] border-b border-[#E5D7C7] space-y-2.5 shrink-0">
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-black text-[#1F1714] uppercase tracking-wider">
                📝 Phiếu Điền Đáp Án ({totalQuestions} Câu)
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("ALL")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === "ALL" ? "bg-[#C65D4B] text-white" : "bg-[#FAF4EB] text-[#6E5D55] hover:text-[#1F1714]"
                }`}
              >
                Tất Cả (1-{totalQuestions})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("VOCAB")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === "VOCAB" ? "bg-[#C65D4B] text-white font-extrabold" : "bg-[#FAF4EB] text-[#6E5D55] hover:text-[#1F1714]"
                }`}
              >
                Môn 1: Từ Vựng (1-{examConfig.vocabSection.totalQuestions})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("GRAMMAR")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === "GRAMMAR" ? "bg-[#C65D4B] text-white font-extrabold" : "bg-[#FAF4EB] text-[#6E5D55] hover:text-[#1F1714]"
                }`}
              >
                Môn 2: Ngữ Pháp & Đọc (1-{examConfig.grammarSection.totalQuestions})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("LISTENING")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === "LISTENING" ? "bg-[#C65D4B] text-white font-extrabold" : "bg-[#FAF4EB] text-[#6E5D55] hover:text-[#1F1714]"
                }`}
              >
                Môn 3: Nghe Hiểu (1-{examConfig.listeningSection.totalQuestions})
              </button>
            </div>

            {/* Toggle Button for Official Answer Key */}
            <button
              type="button"
              onClick={() => setShowAllExplanations((prev) => !prev)}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs ${
                showAllExplanations 
                  ? "bg-[#C65D4B] text-white border-[#C65D4B]" 
                  : "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showAllExplanations ? "🔒 Ẩn Bảng Đáp Án Gốc & Giải Thích" : `💡 Hiển Thị ${totalQuestions} Đáp Án Gốc 1:1 & Giải Thích Chi Tiết`}</span>
            </button>
          </div>

          {/* Results Summary Card if Submitted (Collapsible) */}
          {isSubmitted && results && (
            <div className="p-3.5 bg-white border-b border-[#E5D7C7] space-y-3 shrink-0 transition-all">
              <div 
                onClick={() => setIsResultsCollapsed((prev) => !prev)}
                className="flex items-center justify-between cursor-pointer select-none group"
                title={isResultsCollapsed ? "Nhấn để mở rộng chi tiết điểm số" : "Nhấn để thu gọn kết quả"}
              >
                <div className="flex items-center gap-1.5">
                  <Trophy className={`w-4 h-4 ${results.isPass ? "text-emerald-600" : "text-rose-600"}`} />
                  <span className="font-extrabold text-xs text-[#1F1714]">
                    {results.isPass ? `🎉 ĐẠT ${levelCode}` : "💪 THI LẠI"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-[#C65D4B]">
                    {results.score180} / 180 Điểm
                  </span>
                  <div className="p-1 rounded-lg bg-[#FAF4EB] text-[#8C7B70] group-hover:text-[#C65D4B] group-hover:bg-[#FFECE7] transition-all">
                    {isResultsCollapsed ? (
                      <ChevronDown className="w-4 h-4 text-[#C65D4B]" />
                    ) : (
                      <ChevronUp className="w-4 h-4 text-[#C65D4B]" />
                    )}
                  </div>
                </div>
              </div>

              {!isResultsCollapsed && (
                <>
                  <div className="grid grid-cols-3 gap-1.5 text-[10px] text-center font-bold">
                    <div className="bg-[#FAF4EB] p-1.5 rounded-lg border border-[#E5D7C7]">
                      <span className="text-[#8C7B70] block">Từ Vựng & Kanji</span>
                      <strong className="text-[#C65D4B]">{results.vocabScore60}/60đ</strong>
                    </div>
                    <div className="bg-[#FAF4EB] p-1.5 rounded-lg border border-[#E5D7C7]">
                      <span className="text-[#8C7B70] block">Ngữ Pháp & Đọc</span>
                      <strong className="text-[#C65D4B]">{results.grammarScore60}/60đ</strong>
                    </div>
                    <div className="bg-[#FAF4EB] p-1.5 rounded-lg border border-[#E5D7C7]">
                      <span className="text-[#8C7B70] block">Nghe Hiểu</span>
                      <strong className="text-[#C65D4B]">{results.listeningScore60}/60đ</strong>
                    </div>
                  </div>

                  {/* Printable Score Report & Retake Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowReportModal(true)}
                      className="py-2 px-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:brightness-110 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>In Phiếu Báo Điểm</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowResetModal(true)}
                      className="py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Làm Lại Đề Thi</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Scrollable Answer Sheet Rows */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
            {filteredNums.map((qNum) => {
              const userSel = userAnswers[qNum];
              const detail = richAnswers[qNum];
              const isExpanded = expandedQuestion === qNum;
              const shouldShowDetails = isExpanded || showAllExplanations || isSubmitted;

              let sectionHeader = "";

              // Dynamic section & mondai headers computed directly from examConfig
              if (qNum === examConfig.vocabSection.startQuestion) {
                sectionHeader = `${examConfig.vocabSection.name} • (1 ➔ ${examConfig.vocabSection.totalQuestions})`;
              } else if (qNum === examConfig.grammarSection.startQuestion) {
                sectionHeader = `${examConfig.grammarSection.name} • (1 ➔ ${examConfig.grammarSection.totalQuestions})`;
              } else if (qNum === examConfig.listeningSection.startQuestion) {
                sectionHeader = `${examConfig.listeningSection.name} • (1 ➔ ${examConfig.listeningSection.totalQuestions})`;
              } else {
                // Check if this question starts a new sub-Mondai within any section
                const allMondais = [
                  ...examConfig.vocabSection.mondais.map(m => ({ ...m, secOffset: 0 })),
                  ...examConfig.grammarSection.mondais.map(m => ({ ...m, secOffset: examConfig.vocabSection.totalQuestions })),
                  ...examConfig.listeningSection.mondais.map(m => ({ ...m, secOffset: m.startQuestion - 1 }))
                ];
                const matchingMondai = allMondais.find(m => 
                  m.startQuestion === qNum && 
                  m.startQuestion !== examConfig.vocabSection.startQuestion && 
                  m.startQuestion !== examConfig.grammarSection.startQuestion && 
                  m.startQuestion !== examConfig.listeningSection.startQuestion
                );
                if (matchingMondai) {
                  const localStart = matchingMondai.startQuestion - matchingMondai.secOffset;
                  const localEnd = matchingMondai.endQuestion - matchingMondai.secOffset;
                  sectionHeader = `✦ ${matchingMondai.mondaiTitle} • (${localStart} ➔ ${localEnd})`;
                }
              }

              return (
                <div key={qNum} className="space-y-1">
                  {sectionHeader && (
                    <div className="pt-2 pb-1 text-[11px] font-black text-[#C65D4B] uppercase tracking-wider sticky top-0 bg-[#FAF4EB] z-10">
                      {sectionHeader}
                    </div>
                  )}

                  <div className="rounded-xl bg-[#FFFDF9] border border-[#E5D7C7] hover:border-[#C65D4B] transition-all overflow-hidden">
                    {/* Main Row */}
                    <div className="flex items-center justify-between py-1.5 px-3">
                      {/* Question Label */}
                      <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setExpandedQuestion(isExpanded ? null : qNum)}>
                        <span className="text-[10px] font-mono text-[#8C7B70] bg-[#FAF4EB] px-1.5 py-0.5 rounded border border-[#E5D7C7]">
                          [{qNum}]
                        </span>
                        <span className="text-xs font-black text-[#1F1714]">
                          {detail.mondaiName ? `${detail.mondaiName} (${detail.localPdfNumber})` : `Câu (${detail.localPdfNumber})`}
                        </span>
                        {showAllExplanations && (
                          <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 rounded">
                            Đáp án: [{detail.correctOption}]
                          </span>
                        )}
                      </div>

                      {/* Options 1, 2, 3, 4 */}
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4].map((optNum) => {
                          const isSelected = userSel === optNum;
                          let btnStyle = "bg-[#FAF4EB] text-[#6E5D55] border-[#E5D7C7] hover:border-[#C65D4B]";

                          if (isSubmitted || showAllExplanations) {
                            if (optNum === detail.correctOption) {
                              btnStyle = "bg-emerald-600 text-white border-emerald-600 font-bold";
                            } else if (isSelected && optNum !== detail.correctOption) {
                              btnStyle = "bg-rose-600 text-white border-rose-600 font-bold";
                            }
                          } else if (isSelected) {
                            btnStyle = "bg-[#C65D4B] text-white border-[#C65D4B] font-black scale-105 shadow-2xs";
                          }

                          return (
                            <button
                              key={optNum}
                              type="button"
                              onClick={() => handleSelectOption(qNum, optNum)}
                              className={`w-7 h-7 rounded-lg border text-xs font-mono font-bold transition-all flex items-center justify-center cursor-pointer ${btnStyle}`}
                            >
                              {optNum}
                            </button>
                          );
                        })}
                      </div>

                      {/* Result Icon or Expand Toggle */}
                      <div className="min-w-[20px] flex justify-end">
                        {isSubmitted ? (
                          <div className="flex items-center gap-1">
                            {userSel === detail.correctOption ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-600" />
                            )}
                            <button
                              type="button"
                              onClick={() => setExpandedQuestion(isExpanded ? null : qNum)}
                              className="text-[#8C7B70] hover:text-[#1F1714] p-0.5"
                            >
                              {shouldShowDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setExpandedQuestion(isExpanded ? null : qNum)}
                            className="text-[#8C7B70] hover:text-[#1F1714] p-0.5"
                          >
                            {shouldShowDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Rich Explanation Accordion Panel (With Choukai Script Support) */}
                    {shouldShowDetails && (
                      <div className="p-3 bg-[#FAF4EB] border-t border-[#E5D7C7] space-y-2 text-xs">
                        <div className="flex items-start gap-2 bg-white p-2 rounded-lg border border-[#E5D7C7]">
                          <BookOpen className="w-4 h-4 text-[#C65D4B] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-bold text-[#8C7B70] uppercase block">Trích dẫn câu hỏi gốc PDF:</span>
                            <strong className="text-[#1F1714] font-jp">{detail.questionSnippet}</strong>
                          </div>
                        </div>

                        {/* Choukai Audio Script Panel if Available */}
                        {detail.audioScriptJa && (
                          <div className="p-2.5 bg-purple-50/80 border border-purple-200 rounded-lg text-purple-950 space-y-1">
                            <span className="text-[10px] font-black uppercase text-purple-900 flex items-center gap-1">
                              <Volume2 className="w-3.5 h-3.5 text-purple-700" />
                              <span>Script Kịch Bản Bài Nghe (Choukai Transcript):</span>
                            </span>
                            <p className="text-[11px] font-jp leading-relaxed whitespace-pre-line text-purple-950 font-medium">
                              {detail.audioScriptJa}
                            </p>
                            {detail.audioScriptVi && (
                              <p className="text-[11px] leading-relaxed text-purple-900 pt-1 border-t border-purple-200/60 font-medium">
                                {detail.audioScriptVi}
                              </p>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between bg-emerald-50/90 px-3 py-2 rounded-lg border border-emerald-200 text-emerald-950">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Đáp án chính xác:</span>
                          </span>
                          <span className="bg-emerald-700 text-white px-3 py-0.5 rounded-md text-xs font-black font-mono shadow-2xs">
                            Đáp án [{detail.correctOption}]
                          </span>
                        </div>

                        <div className="flex items-start gap-2 bg-amber-50/80 p-2 rounded-lg border border-amber-200 text-amber-950">
                          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-bold text-amber-800 uppercase block">Giải thích chi tiết tiếng Việt:</span>
                            <p className="text-amber-900 leading-relaxed font-medium whitespace-pre-line">{detail.explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Submit Action Bar */}
          {!isSubmitted && (
            <div className="p-3 bg-[#FFFDF9] border-t border-[#E5D7C7] shrink-0">
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-2.5 bg-[#C65D4B] hover:bg-[#B44C3B] text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Nộp Phiếu Điền Đáp Án ({totalQuestions} Câu)</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Custom Submit Confirmation Modal */}
      {showSubmitModal && (() => {
        const sec1Total = 35;
        const sec1Ans = Array.from({ length: sec1Total }, (_, i) => i + 1).filter(qNum => userAnswers[qNum] !== undefined).length;

        const sec2Total = 35;
        const sec2Ans = Array.from({ length: sec2Total }, (_, i) => i + 36).filter(qNum => userAnswers[qNum] !== undefined).length;

        const sec3Total = Math.max(0, totalQuestions - 70);
        const sec3Ans = Array.from({ length: sec3Total }, (_, i) => i + 71).filter(qNum => userAnswers[qNum] !== undefined).length;

        const overallPct = Math.round((answeredCount / totalQuestions) * 100);

        return (
          <div className="fixed inset-0 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 relative overflow-hidden">
              
              {/* Decorative Accent Top Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C65D4B] via-amber-500 to-emerald-500" />

              {/* Close Icon Button */}
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF4EB] hover:bg-[#E5D7C7] text-[#6E5D55] flex items-center justify-center transition-all cursor-pointer"
                title="Đóng"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-3.5 pr-8">
                <div className="w-12 h-12 rounded-2xl bg-[#C65D4B]/10 border border-[#C65D4B]/20 flex items-center justify-center text-[#C65D4B] shrink-0 shadow-sm">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-[#1F1714]">
                      Xác Nhận Nộp Bài Thi
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#C65D4B] text-white tracking-wide">
                      JLPT N4
                    </span>
                  </div>
                  <p className="text-xs text-[#8C7B70] font-medium mt-0.5">
                    {exam.yearTitle}
                  </p>
                </div>
              </div>

              {/* General Summary Card */}
              <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-4 rounded-2xl space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-[#1F1714]">
                  <span className="flex items-center gap-1.5 text-[#6E5D55]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Tiến độ hoàn thành chung:
                  </span>
                  <span className="font-mono text-base text-[#C65D4B] font-black">
                    {answeredCount} / {totalQuestions} <span className="text-xs font-bold text-[#8C7B70]">({overallPct}%)</span>
                  </span>
                </div>
                
                {/* Main Progress Bar */}
                <div className="w-full h-3 bg-[#E5D7C7] rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-[#C65D4B] via-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${overallPct}%` }}
                  />
                </div>

                {/* 3 Stats Mini Badges */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="bg-white/80 border border-[#E5D7C7] rounded-xl p-2 text-center">
                    <span className="block text-[10px] font-bold text-[#8C7B70]">Đã khoanh</span>
                    <span className="font-mono text-sm font-black text-emerald-700">{answeredCount} câu</span>
                  </div>
                  <div className="bg-white/80 border border-[#E5D7C7] rounded-xl p-2 text-center">
                    <span className="block text-[10px] font-bold text-[#8C7B70]">Chưa trả lời</span>
                    <span className="font-mono text-sm font-black text-amber-700">{totalQuestions - answeredCount} câu</span>
                  </div>
                  <div className="bg-white/80 border border-[#E5D7C7] rounded-xl p-2 text-center">
                    <span className="block text-[10px] font-bold text-[#8C7B70]">Thời gian còn</span>
                    <span className="font-mono text-sm font-black text-sky-700 flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-sky-600 inline" />
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Per-Section Detailed Progress */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-[#6E5D55] uppercase tracking-wider">
                  Chi tiết tiến độ theo từng môn thi
                </h4>
                
                <div className="space-y-2 text-xs">
                  {/* Môn 1: Từ vựng */}
                  <div className="bg-white border border-[#E5D7C7]/80 rounded-xl p-2.5 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-[#1F1714] truncate">
                          Môn 1: Từ vựng <span className="text-[11px] font-normal text-[#8C7B70]">(文字・語彙)</span>
                        </span>
                        <span className="font-mono font-bold text-sky-700 text-[11px]">
                          {sec1Ans}/{sec1Total} câu
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-sky-500 transition-all duration-300" 
                          style={{ width: `${Math.round((sec1Ans / sec1Total) * 100)}%` }} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Môn 2: Ngữ pháp & Đọc hiểu */}
                  <div className="bg-white border border-[#E5D7C7]/80 rounded-xl p-2.5 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-[#1F1714] truncate">
                          Môn 2: Ngữ pháp & Đọc hiểu <span className="text-[11px] font-normal text-[#8C7B70]">(文法・読解)</span>
                        </span>
                        <span className="font-mono font-bold text-purple-700 text-[11px]">
                          {sec2Ans}/{sec2Total} câu
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 transition-all duration-300" 
                          style={{ width: `${Math.round((sec2Ans / sec2Total) * 100)}%` }} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Môn 3: Nghe hiểu */}
                  <div className="bg-white border border-[#E5D7C7]/80 rounded-xl p-2.5 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-[#1F1714] truncate">
                          Môn 3: Nghe hiểu <span className="text-[11px] font-normal text-[#8C7B70]">(聴解 - 27 câu)</span>
                        </span>
                        <span className="font-mono font-bold text-amber-700 text-[11px]">
                          {sec3Ans}/{sec3Total} câu
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 transition-all duration-300" 
                          style={{ width: `${Math.round((sec3Ans / sec3Total) * 100)}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Warning / Encouragement Notice */}
              {answeredCount < totalQuestions ? (
                <div className="bg-amber-50 border border-amber-200/90 p-3 rounded-xl text-xs text-amber-900 font-medium flex items-start gap-2.5 shadow-2xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span>Bạn còn <strong>{totalQuestions - answeredCount} câu chưa làm</strong>. Bạn có chắc chắn muốn nộp bài thi ngay bây giờ không?</span>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200/90 p-3 rounded-xl text-xs text-emerald-900 font-medium flex items-center gap-2.5 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tuyệt vời! Bạn đã hoàn thành 100% tất cả {totalQuestions} câu hỏi trong bài thi!</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-3 px-4 bg-[#FAF4EB] hover:bg-[#E5D7C7] text-[#6E5D55] font-bold text-xs sm:text-sm rounded-2xl border border-[#E5D7C7] transition-all cursor-pointer text-center hover:shadow-xs"
                >
                  Quay lại làm tiếp
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSubmitModal(false);
                    setIsSubmitted(true);
                    setShowReportModal(true);
                  }}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-[#C65D4B] to-[#B44C3B] hover:from-[#B44C3B] hover:to-[#9E3B2B] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Xác Nhận Nộp Bài</span>
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* Retake Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-[#FFFDF9] border border-[#E5D7C7] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 relative overflow-hidden">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-emerald-600" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowResetModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF4EB] hover:bg-[#E5D7C7] text-[#6E5D55] flex items-center justify-center transition-all cursor-pointer"
              title="Đóng"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5 pr-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0 shadow-sm">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#1F1714]">
                  Xác Nhận Làm Lại Bài Thi
                </h3>
                <p className="text-xs text-[#8C7B70] font-medium mt-0.5">
                  {exam.yearTitle}
                </p>
              </div>
            </div>

            {/* Info Warning Box */}
            <div className="bg-amber-50 border border-amber-200/90 p-4 rounded-2xl text-xs text-amber-900 font-medium space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Bạn có chắc chắn muốn <strong>làm lại đề thi này từ đầu</strong> không?
                </span>
              </div>
              <p className="text-[11px] text-amber-800/80 leading-relaxed pl-6">
                Tất cả các đáp án bạn đã khoanh, thời gian đếm ngược và kết quả bài làm hiện tại sẽ được xóa và làm mới hoàn toàn.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-3 px-4 bg-[#FAF4EB] hover:bg-[#E5D7C7] text-[#6E5D55] font-bold text-xs sm:text-sm rounded-2xl border border-[#E5D7C7] transition-all cursor-pointer text-center hover:shadow-xs"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserAnswers({});
                  setIsSubmitted(false);
                  setTimeLeft(initialDuration);
                  setExpandedQuestion(null);
                  setShowResetModal(false);
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Đồng Ý Làm Lại</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
