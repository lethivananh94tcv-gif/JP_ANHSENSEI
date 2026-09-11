"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Trophy, BookOpen, Sparkles, ArrowRight, Award, CheckCircle2
} from "lucide-react";
import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";
import JlptNoticeModal from "@/components/shared/JlptNoticeModal";

interface JlptExamItem {
  level: string;
  levelBadge: string;
  examId: string;
  yearSession: string;
  title: string;
  durationMinutes: number;
  totalQuestions: number;
  pdfFileName: string;
  audioFileName: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
}

const ALL_JLPT_EXAMS: JlptExamItem[] = [
  // N4 Exams (7)
  {
    level: "n4",
    levelBadge: "N4",
    examId: "n4-2010-2011",
    yearSession: "2010 - 2011",
    title: "Đề Thi Thật JLPT N4 - Kỳ Thi 2010 - 2011",
    durationMinutes: 105,
    totalQuestions: 98,
    pdfFileName: "N4-2010-2011年.pdf",
    audioFileName: "Nghe N4-2010-2011年 (1).m4a",
    difficulty: "Trung bình",
  },
  {
    level: "n4",
    levelBadge: "N4",
    examId: "n4-2012-12",
    yearSession: "Tháng 12/2012",
    title: "Đề Thi Thật JLPT N4 - Kỳ Tháng 12/2012",
    durationMinutes: 105,
    totalQuestions: 98,
    pdfFileName: "N4-2012年12月.pdf",
    audioFileName: "Nghe N4-2012年12月.m4a",
    difficulty: "Khó",
  },
  {
    level: "n4",
    levelBadge: "N4",
    examId: "n4-2013-07",
    yearSession: "Tháng 07/2013",
    title: "Đề Thi Thật JLPT N4 - Kỳ Tháng 07/2013",
    durationMinutes: 105,
    totalQuestions: 98,
    pdfFileName: "N4-2013年7月.pdf",
    audioFileName: "Nghe N4-2013年7月.m4a",
    difficulty: "Trung bình",
  },
  {
    level: "n4",
    levelBadge: "N4",
    examId: "n4-2014-07",
    yearSession: "Tháng 07/2014",
    title: "Đề Thi Thật JLPT N4 - Kỳ Tháng 07/2014",
    durationMinutes: 105,
    totalQuestions: 98,
    pdfFileName: "N4-2014年7月.pdf",
    audioFileName: "Nghe N4-2014年7月.m4a",
    difficulty: "Trung bình",
  },
  {
    level: "n4",
    levelBadge: "N4",
    examId: "n4-2017-07",
    yearSession: "Tháng 07/2017",
    title: "Đề Thi Thật JLPT N4 - Kỳ Tháng 07/2017",
    durationMinutes: 105,
    totalQuestions: 99,
    pdfFileName: "N4-2017年-7月.pdf",
    audioFileName: "Nghe N4 2017年7月.mp3",
    difficulty: "Khó",
  },
  {
    level: "n4",
    levelBadge: "N4",
    examId: "n4-2018",
    yearSession: "Bộ Đề 2018",
    title: "Đề Thi Thật JLPT N4 - Bộ Đề Năm 2018",
    durationMinutes: 105,
    totalQuestions: 98,
    pdfFileName: "N4-2018年.pdf",
    audioFileName: "Nghe N4-2018年.m4a",
    difficulty: "Trung bình",
  },
  {
    level: "n4",
    levelBadge: "N4",
    examId: "n4-2021-12",
    yearSession: "Tháng 12/2021",
    title: "Đề Thi Thật JLPT N4 - Kỳ Tháng 12/2021 (Yuuki Bùi)",
    durationMinutes: 105,
    totalQuestions: 98,
    pdfFileName: "Đề N4 T12-2021 Mark (1).pdf",
    audioFileName: "Nghe N4 T12-2021 bản chuẩn Yuuki Bùi.mp3",
    difficulty: "Khó",
  },
  // N5 Exams (4)
  {
    level: "n5",
    levelBadge: "N5",
    examId: "n5-2020-12",
    yearSession: "Tháng 12/2020",
    title: "Đề Thi Thật JLPT N5 - Kỳ Tháng 12/2020",
    durationMinutes: 90,
    totalQuestions: 85,
    pdfFileName: "N5-2020年12月.pdf",
    audioFileName: "Nghe N5-2020年12月.mp3",
    difficulty: "Trung bình",
  },
  {
    level: "n5",
    levelBadge: "N5",
    examId: "n5-2021-12",
    yearSession: "Tháng 12/2021",
    title: "Đề Thi Thật JLPT N5 - Kỳ Tháng 12/2021",
    durationMinutes: 90,
    totalQuestions: 85,
    pdfFileName: "N5-2021年12月.pdf",
    audioFileName: "Nghe N5-2021年12月.mp3",
    difficulty: "Trung bình",
  },
  {
    level: "n5",
    levelBadge: "N5",
    examId: "n5-2022-12",
    yearSession: "Tháng 12/2022",
    title: "Đề Thi Thật JLPT N5 - Kỳ Tháng 12/2022",
    durationMinutes: 90,
    totalQuestions: 85,
    pdfFileName: "N5-2022年12月.pdf",
    audioFileName: "Nghe N5-2022年12月.mp3",
    difficulty: "Trung bình",
  },
  {
    level: "n5",
    levelBadge: "N5",
    examId: "n5-2023-07",
    yearSession: "Tháng 07/2023",
    title: "Đề Thi Thật JLPT N5 - Kỳ Tháng 07/2023",
    durationMinutes: 90,
    totalQuestions: 85,
    pdfFileName: "N5-2023年7月.pdf",
    audioFileName: "Nghe N5-2023年7月.mp3",
    difficulty: "Dễ",
  },
  // N3 Exams (2)
  {
    level: "n3",
    levelBadge: "N3",
    examId: "n3-2022-12",
    yearSession: "Tháng 12/2022",
    title: "Đề Thi Thật JLPT N3 - Kỳ Tháng 12/2022",
    durationMinutes: 140,
    totalQuestions: 105,
    pdfFileName: "N3-2022年12月.pdf",
    audioFileName: "Nghe N3-2022年12月.mp3",
    difficulty: "Khó",
  },
  {
    level: "n3",
    levelBadge: "N3",
    examId: "n3-2023-07",
    yearSession: "Tháng 07/2023",
    title: "Đề Thi Thật JLPT N3 - Kỳ Tháng 07/2023",
    durationMinutes: 140,
    totalQuestions: 105,
    pdfFileName: "N3-2023年7月.pdf",
    audioFileName: "Nghe N3-2023年7月.mp3",
    difficulty: "Khó",
  },
];

const LEVEL_CARDS = [
  {
    id: "n5",
    levelCode: "N5",
    title: "Trình Độ JLPT N5",
    subTitle: "Tiếng Nhật Sơ Cấp (Cơ Bản)",
    description: "Bộ đề thi thật JLPT N5 qua các năm. Phù hợp cho người mới bắt đầu hoàn thành 25 bài Minna no Nihongo.",
    examCount: 4,
    durationMinutes: 90,
    questionCount: 85,
    color: "from-amber-600 via-orange-600 to-[#C65D4B]",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-700",
    badge: "Sơ Cấp N5",
  },
  {
    id: "n4",
    levelCode: "N4",
    title: "Trình Độ JLPT N4",
    subTitle: "Tiếng Nhật Sơ Trung Cấp",
    description: "Tuyển tập đề thi thật N4 đầy đủ các năm (2010 - 2021). Dành cho người học đã nắm vững 50 bài Minna no Nihongo.",
    examCount: 7,
    durationMinutes: 105,
    questionCount: 98,
    color: "from-[#C65D4B] via-[#D94129] to-[#FF5733]",
    bgColor: "bg-[#C65D4B]/10",
    borderColor: "border-[#C65D4B]/30",
    textColor: "text-[#C65D4B]",
    badge: "Sơ Trung Cấp N4",
  },
  {
    id: "n3",
    levelCode: "N3",
    title: "Trình Độ JLPT N3",
    subTitle: "Tiếng Nhật Trung Cấp",
    description: "Bộ đề luyện thi thật N3 chuyên sâu. Nâng cao kỹ năng đọc hiểu đoạn văn dài và phản xạ nghe thoại JLPT.",
    examCount: 2,
    durationMinutes: 140,
    questionCount: 105,
    color: "from-indigo-600 via-purple-600 to-[#7C3AED]",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-700",
    badge: "Trung Cấp N3",
  },
];

export default function JlptPracticeLevelSelectionPage() {
  const router = useRouter();
  const [showNotice, setShowNotice] = useState(false);

  const handleClose = () => {
    setShowNotice(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF4EB] text-[#1F1714] font-sans flex flex-col justify-between selection:bg-[#C65D4B] selection:text-white">
      <JlptNoticeModal isOpen={showNotice} onClose={handleClose} />
      <LearnerHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-10 space-y-12">
        {/* Banner Hero */}
        <div className="relative bg-gradient-to-r from-[#2C2421] via-[#3E322D] to-[#1F1714] border-2 border-[#4E3F39] rounded-3xl p-6 sm:p-10 text-white overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 font-black text-xs border border-white/15 backdrop-blur-md">
              <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>PHÒNG LUYỆN THI CHÍNH THỨC JLPT N5 - N3</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Kho {ALL_JLPT_EXAMS.length} Bộ Đề Thi Thật JLPT Chuẩn 1:1
            </h1>

            <p className="text-xs sm:text-sm text-[#D9CEB2] leading-relaxed font-medium">
              Chào mừng bạn đến với hệ thống luyện đề thi thật JLPT qua các năm. Chọn trình độ JLPT bên dưới để bắt đầu luyện đề.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/15 text-xs text-amber-200">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Tổng cộng {ALL_JLPT_EXAMS.length} bộ đề thi chính thức</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/15 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Chấm điểm tự động & Giải thích 1:1</span>
              </div>
            </div>
          </div>

          <div className="absolute right-[-20px] bottom-[-20px] opacity-15 pointer-events-none hidden md:block">
            <Award className="w-80 h-80 text-amber-400" />
          </div>
        </div>

        {/* Level Cards Selector Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#1F1714] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C65D4B]" />
              <span>Phân Loại Theo Trình Độ JLPT</span>
            </h2>
            <span className="text-xs font-bold text-[#8C7B70]">
              Nhấn vào từng trình độ để lọc bài thi
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEVEL_CARDS.map((card) => (
              <Link
                key={card.id}
                href={`/jlpt-practice/${card.id}`}
                className="bg-[#FFFDF9] border-2 border-[#E5D7C7] hover:border-[#C65D4B] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group relative overflow-hidden cursor-pointer"
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className={`px-3.5 py-1 font-black text-xs rounded-full border ${card.bgColor} ${card.textColor} ${card.borderColor}`}>
                      {card.badge}
                    </span>
                    <span className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${card.color} text-white font-black text-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      {card.levelCode}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-[#1F1714] group-hover:text-[#C65D4B] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs font-bold text-[#8C7B70] mt-0.5">
                      {card.subTitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#52443C] leading-relaxed font-medium">
                    {card.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 bg-[#FAF4EB] p-3 rounded-2xl border border-[#E5D7C7] text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-[#8C7B70] block uppercase">Kho Đề Thi</span>
                      <strong className="font-extrabold text-[#1F1714]">{card.examCount} Bộ đề thật</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#8C7B70] block uppercase">Thời gian thi</span>
                      <strong className="font-extrabold text-[#1F1714]">{card.durationMinutes} Phút</strong>
                    </div>
                  </div>
                </div>

                <div className="w-full py-3.5 bg-gradient-to-r from-[#C65D4B] via-[#D94129] to-[#B04F3F] text-white font-black text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:scale-102">
                  <span>Vào Luyện Đề Thi {card.levelCode}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <LearnerFooter />
    </div>
  );
}
