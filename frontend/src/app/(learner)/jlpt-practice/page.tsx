"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Trophy, BookOpen, Sparkles, ArrowRight, Award, Layers, ShieldCheck, CheckCircle2
} from "lucide-react";
import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";
import JlptNoticeModal from "@/components/shared/JlptNoticeModal";

const LEVEL_CARDS = [
  {
    id: "n5",
    levelCode: "N5",
    title: "Trình Độ JLPT N5",
    subTitle: "Tiếng Nhật Sơ Cấp (Cơ Bản)",
    description: "Bộ đề thi thật JLPT N5 qua các năm. Phù hợp cho người mới bắt đầu hoàn thành 25 bài Minna no Nihongo.",
    examCount: 6,
    durationMinutes: 90,
    questionCount: 60,
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
    description: "Tuyển tập đề thi thật N4 đầy đủ các năm (2010 - 2024). Dành cho người học đã nắm vững 50 bài Minna no Nihongo.",
    examCount: 8,
    durationMinutes: 105,
    questionCount: 65,
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
    examCount: 5,
    durationMinutes: 140,
    questionCount: 70,
    color: "from-indigo-600 via-purple-600 to-[#7C3AED]",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-700",
    badge: "Trung Cấp N3",
  },
];

export default function JlptPracticeLevelSelectionPage() {
  const router = useRouter();
  const [showNotice, setShowNotice] = useState(true);

  const handleClose = () => {
    setShowNotice(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FAF4EB] text-[#1F1714] font-sans flex flex-col justify-between selection:bg-[#C65D4B] selection:text-white">
      <JlptNoticeModal isOpen={showNotice} onClose={handleClose} />
      <LearnerHeader />


      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-10 space-y-10">
        {/* Banner Hero */}
        <div className="relative bg-gradient-to-r from-[#2C2421] via-[#3E322D] to-[#1F1714] border-2 border-[#4E3F39] rounded-3xl p-6 sm:p-10 text-white overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 font-black text-xs border border-white/15 backdrop-blur-md">
              <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>PHÒNG LUYỆN THI CHÍNH THỨC JLPT N5 - N3</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Chọn Cấp Độ Đề Thi Bạn Muốn Luyện Tập
            </h1>

            <p className="text-xs sm:text-sm text-[#D9CEB2] leading-relaxed font-medium">
              Chào mừng bạn đến với hệ thống luyện đề thi thật JLPT qua các năm. Vui lòng chọn cấp độ bên dưới để xem bộ sưu tập đề thi theo các mốc thời gian.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/15 text-xs text-amber-200">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Tuyển tập đề thi chính thức qua các năm</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/15 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Chấm điểm tự động & Lời giải chi tiết</span>
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
              <span>Danh Sách 3 Cấp Độ Thi JLPT</span>
            </h2>
            <span className="text-xs font-bold text-[#8C7B70]">
              Nhấn vào trình độ để mở danh sách đề thi theo năm
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEVEL_CARDS.map((card) => (
              <div
                key={card.id}
                onClick={() => setShowNotice(true)}
                className="bg-[#FFFDF9] border-2 border-[#E5D7C7] hover:border-[#C65D4B] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group relative overflow-hidden cursor-pointer"
              >
                <div className="space-y-4 relative z-10">
                  {/* Badge & Number Icon */}
                  <div className="flex justify-between items-center">
                    <span className={`px-3.5 py-1 font-black text-xs rounded-full border ${card.bgColor} ${card.textColor} ${card.borderColor}`}>
                      {card.badge}
                    </span>
                    <span className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${card.color} text-white font-black text-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      {card.levelCode}
                    </span>
                  </div>

                  {/* Title & Description */}
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

                  {/* Metrics */}
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

                {/* Direct Action Button */}
                <div className="w-full py-3.5 bg-gradient-to-r from-[#C65D4B] via-[#D94129] to-[#B04F3F] text-white font-black text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:scale-102">
                  <span>Vào Trang Đề Thi {card.levelCode} (Đang Hoàn Thiện)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <LearnerFooter />
    </div>
  );
}
