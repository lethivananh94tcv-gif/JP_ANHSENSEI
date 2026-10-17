"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Clock, FileText, Play, Calendar, Sparkles, Trophy, Volume2, FileSpreadsheet
} from "lucide-react";
import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";
import { INITIAL_ADMIN_EXAMS, sanitizeAndDeduplicateExams, getStoredAdminExams, syncAdminExamsFromServer } from "@/app/data/initialAdminExams";
import { parseExamStructure, parseExamYearData, ExamYearInfo } from "@/lib/jlpt/jlptExamParser";

interface JlptExamItem {
  examId: string;
  yearGroup: string;
  yearSession: string;
  title: string;
  durationMinutes: number;
  totalQuestions: number;
  sections: { name: string; count: number }[];
  difficulty: "Dễ" | "Trung bình" | "Khó";
  pdfFileName?: string;
  audioFileName?: string;
}

const MOCK_LEVEL_EXAMS: Record<string, JlptExamItem[]> = {
  n4: [
    {
      examId: "n4-2010-2011",
      yearGroup: "2010-2011",
      yearSession: "Bộ Đề Thi Thật 2010 - 2011",
      title: "Đề Thi Thật JLPT N4 - Kỳ Thi 2010 - 2011",
      durationMinutes: 115,
      totalQuestions: 98,
      sections: [
        { name: "Từ vựng & Kanji (Moji/Vocab)", count: 35 },
        { name: "Ngữ pháp & Đọc hiểu (Grammar/Reading)", count: 35 },
        { name: "Nghe hiểu (Audio M4A Choukai)", count: 28 },
      ],
      difficulty: "Trung bình",
      pdfFileName: "N4-2010-2011年.pdf",
      audioFileName: "Nghe N4-2010-2011年 (1).m4a",
    },
    {
      examId: "n4-2012-12",
      yearGroup: "2012-12",
      yearSession: "Kỳ Tháng 12/2012",
      title: "Đề Thi Thật JLPT N4 - Kỳ Tháng 12/2012",
      durationMinutes: 115,
      totalQuestions: 98,
      sections: [
        { name: "Từ vựng & Kanji (Moji/Vocab)", count: 35 },
        { name: "Ngữ pháp & Đọc hiểu (Grammar/Reading)", count: 35 },
        { name: "Nghe hiểu (Audio M4A Choukai)", count: 28 },
      ],
      difficulty: "Khó",
      pdfFileName: "N4-2012年12月.pdf",
      audioFileName: "Nghe N4-2012年12月.m4a",
    },
    {
      examId: "n4-2013-07",
      yearGroup: "2013-07",
      yearSession: "Kỳ Tháng 07/2013",
      title: "Đề Thi Thật JLPT N4 - Kỳ Tháng 07/2013",
      durationMinutes: 115,
      totalQuestions: 98,
      sections: [
        { name: "Từ vựng & Kanji (Moji/Vocab)", count: 35 },
        { name: "Ngữ pháp & Đọc hiểu (Grammar/Reading)", count: 35 },
        { name: "Nghe hiểu (Audio M4A Choukai)", count: 28 },
      ],
      difficulty: "Trung bình",
      pdfFileName: "N4-2013年7月.pdf",
      audioFileName: "Nghe N4-2013年7月.m4a",
    },
    {
      examId: "n4-2014-07",
      yearGroup: "2014-07",
      yearSession: "Kỳ Tháng 07/2014",
      title: "Đề Thi Thật JLPT N4 - Kỳ Tháng 07/2014",
      durationMinutes: 115,
      totalQuestions: 98,
      sections: [
        { name: "Từ vựng & Kanji", count: 35 },
        { name: "Ngữ pháp & Đọc hiểu", count: 35 },
        { name: "Nghe hiểu (Audio M4A)", count: 28 },
      ],
      difficulty: "Trung bình",
      pdfFileName: "N4-2014年7月.pdf",
      audioFileName: "Nghe N4-2014年7月.m4a",
    },
    {
      examId: "n4-2017-07",
      yearGroup: "2017-07",
      yearSession: "Kỳ Tháng 07/2017",
      title: "Đề Thi Thật JLPT N4 - Kỳ Tháng 07/2017",
      durationMinutes: 115,
      totalQuestions: 99, // Dynamic total questions: 99 questions
      sections: [
        { name: "Từ vựng & Kanji", count: 35 },
        { name: "Ngữ pháp & Đọc hiểu", count: 36 },
        { name: "Nghe hiểu (Audio MP3)", count: 28 },
      ],
      difficulty: "Khó",
      pdfFileName: "N4-2017年-7月.pdf",
      audioFileName: "Nghe N4 2017年7月.mp3",
    },
    {
      examId: "n4-2018",
      yearGroup: "2018",
      yearSession: "Bộ Đề Thi Thật 2018",
      title: "Đề Thi Thật JLPT N4 - Bộ Đề Năm 2018",
      durationMinutes: 115,
      totalQuestions: 98,
      sections: [
        { name: "Từ vựng & Kanji", count: 35 },
        { name: "Ngữ pháp & Đọc hiểu", count: 35 },
        { name: "Nghe hiểu (Audio M4A)", count: 28 },
      ],
      difficulty: "Trung bình",
      pdfFileName: "N4-2018年.pdf",
      audioFileName: "Nghe N4-2018年.m4a",
    },
    {
      examId: "n4-2021-12",
      yearGroup: "2021-12",
      yearSession: "Kỳ Tháng 12/2021",
      title: "Đề Thi Thật JLPT N4 - Kỳ Tháng 12/2021 (Yuuki Bùi)",
      durationMinutes: 115,
      totalQuestions: 98,
      sections: [
        { name: "Từ vựng & Kanji", count: 35 },
        { name: "Ngữ pháp & Đọc hiểu", count: 35 },
        { name: "Nghe hiểu (Audio MP3)", count: 28 },
      ],
      difficulty: "Khó",
      pdfFileName: "Đề N4 T12-2021 Mark (1).pdf",
      audioFileName: "Nghe N4 T12-2021 bản chuẩn Yuuki Bùi.mp3",
    },
    {
      examId: "n4-2024-07",
      yearGroup: "2024-07",
      yearSession: "Kỳ Tháng 07/2024",
      title: "Đề Thi Thật JLPT N4 - Kỳ Tháng 07/2024 (Yuuki Bùi)",
      durationMinutes: 115,
      totalQuestions: 85,
      sections: [
        { name: "Từ vựng & Kanji", count: 28 },
        { name: "Ngữ pháp & Đọc hiểu", count: 29 },
        { name: "Nghe hiểu", count: 28 },
      ],
      difficulty: "Trung bình",
      pdfFileName: "n4-2026-2122.pdf",
      audioFileName: "Nghe N4 T7-2024.mp3",
    },
  ],

  n5: [
    {
      examId: "n5-2013-07",
      yearGroup: "2013-07",
      yearSession: "Kỳ Tháng 07/2013",
      title: "Đề Thi Thật JLPT N5 - Kỳ Tháng 07/2013",
      durationMinutes: 90,
      totalQuestions: 91,
      sections: [
        { name: "Môn 1: Từ vựng & Kanji", count: 35 },
        { name: "Môn 2: Ngữ pháp & Đọc hiểu", count: 32 },
        { name: "Môn 3: Nghe hiểu (Choukai)", count: 24 },
      ],
      difficulty: "Trung bình",
      pdfFileName: "N5-2013年7月.pdf",
      audioFileName: "Nghe N5-2013年7月.mp3",
    },
    {
      examId: "n5-2012-12",
      yearGroup: "2012-12",
      yearSession: "Kỳ Tháng 12/2012",
      title: "Đề Thi Thật JLPT N5 - Kỳ Tháng 12/2012",
      durationMinutes: 90,
      totalQuestions: 91,
      sections: [
        { name: "Từ vựng & Kanji", count: 35 },
        { name: "Ngữ pháp & Đọc hiểu", count: 32 },
        { name: "Nghe hiểu (Choukai)", count: 24 },
      ],
      difficulty: "Trung bình",
      pdfFileName: "N5-2012年12月.pdf",
      audioFileName: "Nghe N5-2012年12月.m4a",
    },
    {
      examId: "n5-2010-2011",
      yearGroup: "2010-2011",
      yearSession: "Kỳ Thi 2010 - 2011",
      title: "Đề Thi Thật JLPT N5 - Kỳ Thi 2010 - 2011",
      durationMinutes: 90,
      totalQuestions: 89,
      sections: [
        { name: "Từ vựng & Kanji", count: 33 },
        { name: "Ngữ pháp & Đọc hiểu", count: 32 },
        { name: "Nghe hiểu (Choukai)", count: 24 },
      ],
      difficulty: "Trung bình",
      pdfFileName: "N5-2010-2011年.pdf",
      audioFileName: "Nghe N5-2010-2011.mp3",
    },
  ],


  n3: [
    {
      examId: "n3-2022-12",
      yearGroup: "2022",
      yearSession: "Kỳ Tháng 12/2022",
      title: "Đề Thi Thật JLPT N3 - Kỳ Tháng 12/2022",
      durationMinutes: 140,
      totalQuestions: 105,
      sections: [
        { name: "Từ vựng & Kanji", count: 35 },
        { name: "Ngữ pháp & Đọc hiểu", count: 39 },
        { name: "Nghe hiểu (Choukai)", count: 31 },
      ],
      difficulty: "Khó",
      pdfFileName: "N3-2022年12月.pdf",
      audioFileName: "Nghe N3-2022年12月.mp3",
    },
    {
      examId: "n3-2023-07",
      yearGroup: "2023",
      yearSession: "Kỳ Tháng 07/2023",
      title: "Đề Thi Thật JLPT N3 - Kỳ Tháng 07/2023",
      durationMinutes: 140,
      totalQuestions: 105,
      sections: [
        { name: "Từ vựng & Kanji", count: 35 },
        { name: "Ngữ pháp & Đọc hiểu", count: 39 },
        { name: "Nghe hiểu (Choukai)", count: 31 },
      ],
      difficulty: "Khó",
      pdfFileName: "N3-2023年7月.pdf",
      audioFileName: "Nghe N3-2023年7月.mp3",
    },
  ],
};


import JlptNoticeModal from "@/components/shared/JlptNoticeModal";

export default function JlptLevelExamsPage() {
  const urlParams = useParams();
  const router = useRouter();
  const [showNotice, setShowNotice] = useState(false);
  const rawLevel = ((urlParams?.levelId as string) || "n4").toLowerCase();
  
  let cleanLevel = "n4";
  if (rawLevel.includes("n3")) cleanLevel = "n3";
  else if (rawLevel.includes("n5")) cleanLevel = "n5";
  else cleanLevel = "n4";

  const levelCode = cleanLevel.toUpperCase();
  const levelId = cleanLevel;
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [adminExams, setAdminExams] = useState<any[]>([]);

  const handleCloseNotice = () => {
    setShowNotice(false);
  };

  useEffect(() => {
    const areExamListsEqual = (a: any[], b: any[]) => {
      if (a === b) return true;
      if (!a || !b || a.length !== b.length) return false;
      const keyA = a.map(e => `${e.id}_${e.examCode || ''}_${e.activeVersionId || ''}_${e.versions?.length || 0}`).join('|');
      const keyB = b.map(e => `${e.id}_${e.examCode || ''}_${e.activeVersionId || ''}_${e.versions?.length || 0}`).join('|');
      return keyA === keyB;
    };

    const loadAdminState = () => {
      const currentList = getStoredAdminExams();
      setAdminExams((prev) => areExamListsEqual(prev, currentList) ? prev : currentList);
      syncAdminExamsFromServer().then((serverList) => {
        if (serverList && serverList.length > 0) {
          setAdminExams((prev) => areExamListsEqual(prev, serverList) ? prev : serverList);
        }
      });
    };

    loadAdminState();

    const handleLocalUpdate = () => {
      const stored = getStoredAdminExams();
      setAdminExams((prev) => areExamListsEqual(prev, stored) ? prev : stored);
    };

    window.addEventListener("adminExamsUpdated", handleLocalUpdate);
    window.addEventListener("storage", loadAdminState);
    window.addEventListener("focus", loadAdminState);

    return () => {
      window.removeEventListener("adminExamsUpdated", handleLocalUpdate);
      window.removeEventListener("storage", loadAdminState);
      window.removeEventListener("focus", loadAdminState);
    };
  }, []);

  // Display strictly the exams uploaded and published by the Admin (deduplicated & synchronized)
  const allPublishedExams: JlptExamItem[] = useMemo(() => {
    const effectiveAdminExams = sanitizeAndDeduplicateExams(
      (adminExams && adminExams.length > 0) ? adminExams : INITIAL_ADMIN_EXAMS
    );

    const list: JlptExamItem[] = [];
    const seenExamIds = new Set<string>();

    effectiveAdminExams.forEach((ad: any) => {
      let adLevel = (ad.level || "").toLowerCase().trim();
      if (!adLevel) {
        if ((ad.examCode || "").toLowerCase().includes("n5") || (ad.yearTitle || "").includes("N5")) adLevel = "n5";
        else if ((ad.examCode || "").toLowerCase().includes("n3") || (ad.yearTitle || "").includes("N3")) adLevel = "n3";
        else adLevel = "n4";
      }
      if (adLevel !== cleanLevel) return;

      const publishedVer =
        ad.versions?.find((v: any) => v.versionId === ad.activeVersionId && v.status === "PUBLISHED") ||
        ad.versions?.find((v: any) => v.versionId === ad.activeVersionId) ||
        ad.versions?.find((v: any) => v.status === "PUBLISHED") ||
        ad.versions?.[ad.versions.length - 1];

      if (publishedVer) {
        const cleanCode = (ad.examCode || ad.id || "").replace(/[\/\\#?&:\s]+/g, "-").replace(/-+/g, "-");
        if (seenExamIds.has(cleanCode)) return;
        seenExamIds.add(cleanCode);

        const totalQ =
          publishedVer.totalQuestions ||
          (cleanLevel === "n5" ? (cleanCode.includes("2012") || cleanCode.includes("2013") ? 91 : 89) : cleanLevel === "n3" ? 105 : 98);

        // Authentic section counts from standard parser
        const structure = parseExamStructure(cleanCode, cleanLevel.toUpperCase(), totalQ);
        const vocabQ = structure.vocabSection.totalQuestions;
        const grammarQ = structure.grammarSection.totalQuestions;
        const listeningQ = structure.listeningSection.totalQuestions;

        const examYearInfo = parseExamYearData({
          title: ad.yearTitle || `Đề Thi Thật JLPT ${levelCode}`,
          yearTitle: ad.yearTitle,
          yearSession: ad.yearTitle,
          examId: cleanCode,
          examCode: ad.examCode,
          id: ad.id,
        });

        list.push({
          examId: cleanCode,
          yearGroup: examYearInfo.yearKey,
          yearSession: ad.yearTitle || examYearInfo.sessionBadge,
          title: ad.yearTitle || `Đề Thi Thật JLPT ${levelCode}`,
          durationMinutes:
            publishedVer.durationMinutes ||
            (cleanLevel === "n5" ? 90 : cleanLevel === "n3" ? 140 : 115),
          totalQuestions: totalQ,
          sections: [
            { name: "Từ vựng & Kanji", count: vocabQ },
            { name: "Ngữ pháp & Đọc hiểu", count: grammarQ },
            { name: "Nghe hiểu", count: listeningQ },
          ],
          difficulty: "Trung bình",
          pdfFileName: publishedVer.pdfFileName,
          audioFileName: publishedVer.audioFileName,
        });
      }
    });

    return list;
  }, [cleanLevel, levelCode, adminExams]);

  // Dynamically compute year filters to group cleanly by Year and sort newest first
  const yearOptions = useMemo(() => {
    const yearCounts: Record<string, { yearNumber: number; yearKey: string; yearLabel: string; count: number }> = {};

    allPublishedExams.forEach((exam) => {
      const yearInfo = parseExamYearData(exam);
      if (!yearCounts[yearInfo.yearKey]) {
        yearCounts[yearInfo.yearKey] = {
          yearNumber: yearInfo.yearNumber,
          yearKey: yearInfo.yearKey,
          yearLabel: yearInfo.yearLabel,
          count: 0,
        };
      }
      yearCounts[yearInfo.yearKey].count++;
    });

    // Sort newest year to oldest year
    const sortedYears = Object.values(yearCounts).sort((a, b) => b.yearNumber - a.yearNumber);

    return [
      {
        id: "ALL",
        label: `Tất Cả Bộ Đề ${levelCode}`,
        count: allPublishedExams.length,
      },
      ...sortedYears.map((y) => ({
        id: y.yearKey,
        label: y.yearLabel,
        count: y.count,
      })),
    ];
  }, [cleanLevel, levelCode, allPublishedExams]);

  const filteredExams = useMemo(() => {
    let list = allPublishedExams;
    if (selectedYear !== "ALL") {
      list = list.filter((exam) => {
        const info = parseExamYearData(exam);
        return info.yearKey === selectedYear || exam.yearGroup === selectedYear;
      });
    }

    // Sort strictly by Year & Month descending (newest exam to oldest exam)
    return [...list].sort((a, b) => {
      const infoA = parseExamYearData(a);
      const infoB = parseExamYearData(b);
      return infoB.yearNumber - infoA.yearNumber;
    });
  }, [allPublishedExams, selectedYear]);

  return (
    <div className="min-h-screen bg-[#FAF4EB] text-[#1F1714] font-sans flex flex-col justify-between selection:bg-[#C65D4B] selection:text-white">
      <JlptNoticeModal isOpen={showNotice} onClose={handleCloseNotice} />
      <LearnerHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-10 space-y-5">
        {/* Top Prominent Back Button */}
        <div>
          <Link
            href="/jlpt-practice"
            className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#FFFDF9] hover:bg-[#C65D4B] text-[#C65D4B] hover:text-white font-extrabold text-xs sm:text-sm rounded-2xl border-2 border-[#E5D7C7] hover:border-[#C65D4B] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#C65D4B] group-hover:text-white group-hover:-translate-x-1 transition-transform" />
            <span>Quay lại Chọn Trình Độ JLPT</span>
          </Link>
        </div>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#2C2421] via-[#3E322D] to-[#1F1714] border-2 border-[#4E3F39] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 font-black text-xs border border-white/15 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>KHO {allPublishedExams.length} BỘ ĐỀ THI CHÍNH THỨC JLPT {levelCode}</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tuyển Tập {allPublishedExams.length} Bộ Đề Thi Thật JLPT {levelCode} Chuẩn Format 1:1
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/15 text-xs text-amber-200">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Hiển thị {filteredExams.length} / {allPublishedExams.length} bộ đề thi thật {levelCode}</span>
          </div>
        </div>

        {/* Year Timeline Filter Bar */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#1F1714]">
            <Calendar className="w-4 h-4 text-[#C65D4B]" />
            <span>Chọn Mốc Thời Gian Các Bộ Đề {levelCode}:</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {yearOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedYear(opt.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                  selectedYear === opt.id
                    ? "bg-[#C65D4B] text-white shadow-md scale-102"
                    : "bg-white text-[#6E5D55] hover:text-[#1F1714] border border-[#E5D7C7] hover:border-[#C65D4B]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Exams List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.examId}
              className="bg-[#FFFDF9] border-2 border-[#E5D7C7] hover:border-[#C65D4B] rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                {/* Badge */}
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#FAF4EB] text-[#C65D4B] font-black text-xs rounded-full border border-[#E5D7C7]">
                    {levelCode} • {parseExamYearData(exam).sessionBadge}
                  </span>
                  {exam.pdfFileName && (
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300">
                      📄 Đủ {exam.totalQuestions} Câu PDF
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-extrabold text-[#1F1714] leading-snug group-hover:text-[#C65D4B] transition-colors">
                  {exam.title}
                </h3>

                {/* PDF & Audio Source Tags */}
                {exam.pdfFileName && (
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-[11px] font-bold text-emerald-950 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-emerald-900 font-extrabold">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Nguồn PDF:</span>
                      <strong className="underline text-emerald-900">{exam.pdfFileName}</strong>
                    </div>
                    {exam.audioFileName && (
                      <div className="flex items-center gap-1.5 text-amber-900 font-extrabold pt-0.5">
                        <Volume2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>File nghe Audio:</span>
                        <strong className="underline text-amber-900">{exam.audioFileName}</strong>
                      </div>
                    )}
                  </div>
                )}

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2.5 bg-[#FAF4EB] p-3 rounded-2xl border border-[#E5D7C7] text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C65D4B]" />
                    <div>
                      <span className="text-[10px] font-bold text-[#8C7B70] block uppercase">Thời gian</span>
                      <strong className="font-extrabold text-[#1F1714]">{exam.durationMinutes} Phút</strong>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65D4B]" />
                    <div>
                      <span className="text-[10px] font-bold text-[#8C7B70] block uppercase">Số câu hỏi</span>
                      <strong className="font-extrabold text-[#C65D4B]">{exam.totalQuestions} Câu Hỏi</strong>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-1.5 pt-1">
                  {exam.sections.map((sec, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-semibold bg-white px-3 py-1.5 rounded-xl border border-[#E5D7C7]">
                      <span className="text-[#1F1714]">{sec.name}</span>
                      <span className="text-[#C65D4B] font-bold">{sec.count} câu</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <Link
                href={`/jlpt-practice/${levelId}/${exam.examId}`}
                className="w-full py-3.5 bg-gradient-to-r from-[#C65D4B] to-[#B04F3F] hover:brightness-110 text-white font-black text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:scale-102"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Bắt Đầu Làm {exam.totalQuestions} Câu</span>
              </Link>
            </div>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <div className="bg-white border-2 border-dashed border-[#E5D7C7] rounded-3xl p-12 text-center space-y-3">
            <FileText className="w-10 h-10 text-[#8C7B70] mx-auto" />
            <h3 className="text-base font-bold text-[#1F1714]">Chưa có đề thi nào được xuất bản trong mục này</h3>
            <p className="text-xs text-[#8C7B70]">Hãy quay lại sau hoặc chọn mốc thời gian khác.</p>
          </div>
        )}
      </main>

      <LearnerFooter />
    </div>
  );
}
