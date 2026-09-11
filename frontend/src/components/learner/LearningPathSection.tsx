"use client";

import { useState } from "react";
import Link from "next/link";
import { LevelSummary } from "@/types/learner";
import { Lock, Check, X, ArrowRight, Languages, BookMarked, PenTool, Flame, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import N3NoticeModal from "@/components/shared/N3NoticeModal";

interface LearningPathSectionProps {
  levels: LevelSummary[];
}

interface LevelConfig {
  code: string;
  name: string;
  desc: string;
  defaultId: number;
  isLocked: boolean;
  isCurrent: boolean;
  color: string;
  accentBg: string;
  themeColor: string;
  vocabDesc: string;
  grammarDesc: string;
  kanjiDesc: string;
}

export default function LearningPathSection({ levels }: LearningPathSectionProps) {
  const [showN3Notice, setShowN3Notice] = useState(false);
  const [selectedLevelModal, setSelectedLevelModal] = useState<LevelConfig | null>(null);

  const defaultLevelsConfig: LevelConfig[] = [
    {
      code: "N5",
      name: "JLPT N5",
      desc: "Chứng Nhập Môn",
      defaultId: 1,
      isLocked: false,
      isCurrent: true,
      color: "bg-[#C65D4B] text-white",
      accentBg: "bg-[#FFF5F2]",
      themeColor: "#C65D4B",
      vocabDesc: "25 bài học sơ cấp Minna I, Flashcard 3D & Luyện gõ phản xạ",
      grammarDesc: "Đầy đủ các mẫu câu, trợ từ và thể khẳng định/phủ định căn bản",
      kanjiDesc: "100+ chữ Hán nhập môn, 214 bộ thủ và thứ tự nét vẽ chuẩn xác",
    },
    {
      code: "N4",
      name: "JLPT N4",
      desc: "Chứng Sơ Cấp",
      defaultId: 2,
      isLocked: false,
      isCurrent: false,
      color: "bg-[#3D2C26] text-white",
      accentBg: "bg-[#FAF4ED]",
      themeColor: "#8C653C",
      vocabDesc: "25 bài học trung cấp Minna II (Bài 26 - 50), câu mẫu & audio",
      grammarDesc: "Thể bị động, sai khiến, điều kiện Ba, kính ngữ và khiêm nhường ngữ",
      kanjiDesc: "200+ chữ Hán sơ cấp, âm On-Kun, quy tắc ghép từ thông dụng",
    },
    {
      code: "N3",
      name: "JLPT N3",
      desc: "Chứng Trung Cấp",
      defaultId: 3,
      isLocked: false,
      isCurrent: false,
      color: "bg-[#698B6E] text-white",
      accentBg: "bg-[#F3F7F4]",
      themeColor: "#4E7754",
      vocabDesc: "15 bài chuyên đề từ vựng trọng tâm hay xuất hiện trong kỳ thi JLPT N3",
      grammarDesc: "Tổng hợp ngữ pháp trung cấp, câu điều kiện phức hợp & thành ngữ",
      kanjiDesc: "Hán tự trung cấp N3, phân biệt các chữ Hán có nét tương đồng",
    },
    {
      code: "N2",
      name: "JLPT N2",
      desc: "Chờ cập nhật",
      defaultId: 4,
      isLocked: true,
      isCurrent: false,
      color: "bg-gray-200 text-gray-400",
      accentBg: "bg-gray-50",
      themeColor: "#9CA3AF",
      vocabDesc: "",
      grammarDesc: "",
      kanjiDesc: "",
    },
    {
      code: "N1",
      name: "JLPT N1",
      desc: "Chờ cập nhật",
      defaultId: 5,
      isLocked: true,
      isCurrent: false,
      color: "bg-gray-200 text-gray-400",
      accentBg: "bg-gray-50",
      themeColor: "#9CA3AF",
      vocabDesc: "",
      grammarDesc: "",
      kanjiDesc: "",
    },
  ];

  const handleCardClick = (lvl: LevelConfig) => {
    if (lvl.isLocked) {
      setShowN3Notice(true);
      return;
    }
    setSelectedLevelModal(lvl);
  };

  return (
    <section className="space-y-4 bg-white border-2 border-[#F2DDD4] rounded-3xl p-6 sm:p-7 shadow-sm">
      <N3NoticeModal
        isOpen={showN3Notice}
        onClose={() => setShowN3Notice(false)}
        contentType="chương trình"
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">⛩️</span>
          <h2 className="text-xl sm:text-2xl font-black text-[#2C201D]">
            Con đường chinh phục JLPT
          </h2>
        </div>
        <span className="text-xs font-bold text-[#8C653C] bg-[#FAF4EB] px-3 py-1 rounded-full border border-[#EAD0C7]">
          Nhấn vào cấp độ để chọn kỹ năng học
        </span>
      </div>

      {/* Level Cards Track (Interactive Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
        {defaultLevelsConfig.map((lvl) => {
          if (lvl.isLocked) {
            return (
              <div
                key={lvl.code}
                onClick={() => handleCardClick(lvl)}
                className="bg-[#FAF3EB]/50 border-2 border-[#EAD0C7]/40 rounded-2xl p-4 flex flex-col justify-between space-y-3 relative opacity-80 select-none cursor-pointer hover:border-[#C65D4B]/50 transition-all hover:scale-102"
              >
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-gray-200 text-gray-500 font-black text-sm flex items-center justify-center">
                    {lvl.code}
                  </span>
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-500">{lvl.name}</h3>
                  <p className="text-xs text-[#C65D4B] font-extrabold">{lvl.desc}</p>
                </div>
              </div>
            );
          }

          return (
            <div
              key={lvl.code}
              onClick={() => handleCardClick(lvl)}
              className={`rounded-2xl p-4 flex flex-col justify-between space-y-3 relative border-2 shadow-sm select-none cursor-pointer hover:scale-103 transition-all group ${
                lvl.isCurrent
                  ? "bg-[#FFF5F2] border-[#C65D4B] ring-2 ring-[#C65D4B]/20"
                  : "bg-white border-[#EAD0C7] hover:border-[#C65D4B]/60 hover:bg-[#FFFDF9]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center transition-transform group-hover:scale-105 ${lvl.color}`}>
                  {lvl.code}
                </span>

                {lvl.isCurrent ? (
                  <div className="w-6 h-6 rounded-full bg-[#C65D4B] text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                ) : (
                  <span className="text-[11px] font-extrabold text-[#8C653C] opacity-0 group-hover:opacity-100 transition-opacity">
                    Học ngay ➔
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-black text-[#2C201D] group-hover:text-[#C65D4B] transition-colors">{lvl.name}</h3>
                <p className="text-xs text-[#76685F] font-semibold">{lvl.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* SKILL NAVIGATION MODAL / BẢNG ĐIỀU HƯỚNG KỸ NĂNG */}
      <AnimatePresence>
        {selectedLevelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLevelModal(null)}
              className="fixed inset-0 bg-[#1F1714]/60 backdrop-blur-xs transition-opacity"
            />

            {/* Modal Card Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-[#FFFDF9] border-2 border-[#EAD0C7] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Top Row: Badge + Title + Close Button */}
              <div className="flex items-start justify-between gap-4 border-b border-[#EFE5DA] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-xl text-xs font-black tracking-wide ${selectedLevelModal.color}`}>
                      {selectedLevelModal.code}
                    </span>
                    <span className="text-xs font-bold text-[#8C653C] bg-[#FAF4EB] px-2.5 py-0.5 rounded-full border border-[#EAD0C7]">
                      {selectedLevelModal.desc}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#2C201D] pt-1">
                    Chương trình học {selectedLevelModal.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#76685F] font-medium">
                    Chọn một kỹ năng bên dưới để bắt đầu học ngay theo trình độ {selectedLevelModal.code}:
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedLevelModal(null)}
                  className="w-9 h-9 rounded-full bg-[#FAF3EB] hover:bg-[#F2DDD4] text-[#8C653C] hover:text-[#C65D4B] flex items-center justify-center transition-colors cursor-pointer shrink-0 border border-[#EAD0C7]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 3 Main Skill Cards Grid (Từ Vựng, Ngữ Pháp, Kanji) */}
              <div className="grid grid-cols-1 gap-3.5">
                {/* 1. TỪ VỰNG */}
                <Link
                  href={`/vocabularies?level=${selectedLevelModal.code}`}
                  onClick={() => setSelectedLevelModal(null)}
                  className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white to-[#FFF7F4] border-2 border-[#F9DCD5] hover:border-[#C65D4B] hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#C65D4B]/10 text-[#C65D4B] flex items-center justify-center shrink-0 border border-[#C65D4B]/20 group-hover:scale-105 transition-transform">
                      <Languages className="w-6 h-6" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-[#2C201D] group-hover:text-[#C65D4B] transition-colors">
                          Từ Vựng {selectedLevelModal.code}
                        </h4>
                        <span className="text-[10px] font-extrabold text-[#C65D4B] bg-[#C65D4B]/10 px-2 py-0.5 rounded-md">
                          Flashcard 3D • Luyện gõ
                        </span>
                      </div>
                      <p className="text-xs text-[#76685F] font-medium leading-relaxed">
                        {selectedLevelModal.vocabDesc}
                      </p>
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-[#FAF3EB] group-hover:bg-[#C65D4B] text-[#8C653C] group-hover:text-white flex items-center justify-center transition-all shrink-0 shadow-2xs group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>

                {/* 2. NGỮ PHÁP */}
                <Link
                  href={`/grammar?level=${selectedLevelModal.code}`}
                  onClick={() => setSelectedLevelModal(null)}
                  className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white to-[#F6F9FD] border-2 border-[#DCE7F7] hover:border-[#3B66F5] hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#3B66F5]/10 text-[#3B66F5] flex items-center justify-center shrink-0 border border-[#3B66F5]/20 group-hover:scale-105 transition-transform">
                      <BookMarked className="w-6 h-6" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-[#2C201D] group-hover:text-[#3B66F5] transition-colors">
                          Ngữ Pháp {selectedLevelModal.code}
                        </h4>
                        <span className="text-[10px] font-extrabold text-[#3B66F5] bg-[#3B66F5]/10 px-2 py-0.5 rounded-md">
                          Cấu trúc & Mẫu câu
                        </span>
                      </div>
                      <p className="text-xs text-[#76685F] font-medium leading-relaxed">
                        {selectedLevelModal.grammarDesc}
                      </p>
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-[#FAF3EB] group-hover:bg-[#3B66F5] text-[#8C653C] group-hover:text-white flex items-center justify-center transition-all shrink-0 shadow-2xs group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>

                {/* 3. HÁN TỰ (KANJI) */}
                <Link
                  href={`/kanji?level=${selectedLevelModal.code}`}
                  onClick={() => setSelectedLevelModal(null)}
                  className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white to-[#F4F9F5] border-2 border-[#D6EADB] hover:border-[#2E7D32] hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center shrink-0 border border-[#2E7D32]/20 group-hover:scale-105 transition-transform">
                      <PenTool className="w-6 h-6" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-[#2C201D] group-hover:text-[#2E7D32] transition-colors">
                          Hán Tự (Kanji) {selectedLevelModal.code}
                        </h4>
                        <span className="text-[10px] font-extrabold text-[#2E7D32] bg-[#2E7D32]/10 px-2 py-0.5 rounded-md">
                          Bộ thủ & Nét vẽ
                        </span>
                      </div>
                      <p className="text-xs text-[#76685F] font-medium leading-relaxed">
                        {selectedLevelModal.kanjiDesc}
                      </p>
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-[#FAF3EB] group-hover:bg-[#2E7D32] text-[#8C653C] group-hover:text-white flex items-center justify-center transition-all shrink-0 shadow-2xs group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>

              {/* Bottom Row: Luyện Đề Thi Thử JLPT Feature */}
              <div className="pt-2 border-t border-[#EFE5DA]">
                <Link
                  href={`/jlpt-practice?level=${selectedLevelModal.code}`}
                  onClick={() => setSelectedLevelModal(null)}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FAF4ED] to-[#FFF5F2] hover:from-[#FFF5F2] hover:to-[#FAF4ED] border border-[#EAD0C7] hover:border-[#C65D4B] transition-all flex items-center justify-between gap-3 text-xs font-bold text-[#8C653C] group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#C65D4B] text-white text-[10px] font-black uppercase flex items-center gap-1">
                      <Flame className="w-3 h-3" /> HOT
                    </span>
                    <span className="text-[#2C201D] group-hover:text-[#C65D4B] transition-colors font-extrabold">
                      Thi Thử Đề Chuẩn JLPT {selectedLevelModal.code}
                    </span>
                    <span className="text-[#76685F] hidden sm:inline">• Mô phỏng đúng format kỳ thi JLPT thật</span>
                  </div>
                  <span className="text-[#C65D4B] font-black group-hover:translate-x-1 transition-transform">
                    Vào luyện đề →
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

