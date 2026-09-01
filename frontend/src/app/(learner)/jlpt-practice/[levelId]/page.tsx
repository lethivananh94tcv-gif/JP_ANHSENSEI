"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, Clock, FileText, Play, Calendar, Sparkles, Trophy, Volume2, FileSpreadsheet
} from "lucide-react";
import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";

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
      durationMinutes: 105,
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
      durationMinutes: 105,
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
      durationMinutes: 105,
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
      durationMinutes: 105,
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
      durationMinutes: 105,
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
      durationMinutes: 105,
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
      durationMinutes: 105,
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
  ],

  n5: [
    {
      examId: "n5-2023-07",
      yearGroup: "2023",
      yearSession: "Kỳ Tháng 07/2023",
      title: "Đề Thi Thật JLPT N5 - Kỳ Tháng 07/2023",
      durationMinutes: 90,
      totalQuestions: 98,
      sections: [
        { name: "Từ vựng & Kanji", count: 35 },
        { name: "Ngữ pháp & Đọc hiểu", count: 35 },
        { name: "Nghe hiểu", count: 28 },
      ],
      difficulty: "Trung bình",
    },
  ],

  n3: [
    {
      examId: "n3-2023-07",
      yearGroup: "2023",
      yearSession: "Kỳ Tháng 07/2023",
      title: "Đề Thi Thật JLPT N3 - Kỳ Tháng 07/2023",
      durationMinutes: 140,
      totalQuestions: 98,
      sections: [
        { name: "Từ vựng & Kanji", count: 35 },
        { name: "Ngữ pháp & Đọc hiểu", count: 35 },
        { name: "Nghe hiểu", count: 28 },
      ],
      difficulty: "Khó",
    },
  ],
};

const YEAR_OPTIONS = [
  { id: "ALL", label: "Tất Cả 7 Bộ Đề N4" },
  { id: "2010-2011", label: "2010 - 2011" },
  { id: "2012-12", label: "Tháng 12/2012" },
  { id: "2013-07", label: "Tháng 07/2013" },
  { id: "2014-07", label: "Tháng 07/2014" },
  { id: "2017-07", label: "Tháng 07/2017 (99 câu)" },
  { id: "2018", label: "Bộ Đề 2018" },
  { id: "2021-12", label: "Tháng 12/2021" },
];

export default function JlptLevelExamsPage() {
  const urlParams = useParams();
  const rawLevel = ((urlParams?.levelId as string) || "n4").toLowerCase();
  
  let cleanLevel = "n4";
  if (rawLevel.includes("n3")) cleanLevel = "n3";
  else if (rawLevel.includes("n5")) cleanLevel = "n5";
  else cleanLevel = "n4";

  const levelCode = cleanLevel.toUpperCase();
  const levelId = cleanLevel;
  const [selectedYear, setSelectedYear] = useState<string>("ALL");

  const exams = MOCK_LEVEL_EXAMS[cleanLevel] || MOCK_LEVEL_EXAMS.n4 || [];
  const filteredExams = (exams || []).filter((e) => {
    if (selectedYear !== "ALL" && e.yearGroup !== selectedYear) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF4EB] text-[#1F1714] font-sans flex flex-col justify-between selection:bg-[#C65D4B] selection:text-white">
      <LearnerHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-10 space-y-8">
        {/* Header & Back Navigation Banner */}
        <div className="bg-gradient-to-r from-[#2C2421] via-[#3E322D] to-[#1F1714] border-2 border-[#4E3F39] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <Link
              href="/jlpt-practice"
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all cursor-pointer backdrop-blur-md hover:scale-105 shrink-0"
              title="Quay lại chọn trình độ"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 font-black text-xs border border-white/15">
                <Sparkles className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>KHO 7 BỘ ĐỀ THI CHÍNH THỨC JLPT {levelCode}</span>
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Tuyển Tập 7 Bộ Đề Thi JLPT {levelCode} (Đánh Số Câu Động)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/15 text-xs text-amber-200">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Hiển thị {filteredExams.length} / 7 bộ đề thi thật {levelCode}</span>
          </div>
        </div>

        {/* Year Timeline Filter Bar */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#1F1714]">
            <Calendar className="w-4 h-4 text-[#C65D4B]" />
            <span>Chọn Mốc Thời Gian Các Bộ Đề N4:</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {YEAR_OPTIONS.map((opt) => (
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
                    {levelCode} • {exam.yearSession}
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
      </main>

      <LearnerFooter />
    </div>
  );
}
