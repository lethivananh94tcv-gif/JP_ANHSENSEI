"use client";

import Link from "next/link";
import { Target, Sparkles, Clock, Award, ShieldCheck, ArrowLeft, BookOpen, PenTool, Puzzle } from "lucide-react";

export default function AdminJlptTestsPage() {
  return (
    <div className="space-y-8 font-sans max-w-5xl mx-auto">
      {/* Header Banner - Dark Charcoal Theme */}
      <div className="bg-gradient-to-r from-[#2C2421] via-[#3E322D] to-[#2C2421] border-2 border-[#4E3F39] p-8 sm:p-10 rounded-3xl shadow-xl text-white space-y-4 relative overflow-hidden text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 font-black text-xs border border-white/15 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>🚀 TÍNH NĂNG ĐANG PHÁT TRIỂN (COMING SOON IN PHASE 2)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-normal">
          Quản Lý Bộ Đề Thi Thử JLPT (N5 ➔ N3)
        </h1>
        <p className="text-xs sm:text-sm text-[#D9CEB2] font-medium leading-relaxed max-w-2xl">
          Hệ thống quản lý Bộ Đề Thi Thử JLPT mô phỏng cấu trúc thi thực tế (Kiến thức ngôn ngữ, Đọc hiểu, Nghe hiểu). Tính năng đang trong quá trình hoàn thiện mô hình đề thi chuẩn 100%.
        </p>

        <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-white">
            ⏱️ Đếm ngược thời gian thi thực tế
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-white">
            📊 Tự động quy đổi điểm JLPT
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-white">
            📜 Đánh giá năng lực đỗ/trượt
          </span>
        </div>
      </div>

      {/* Quick Navigation to Active Modules */}
      <div className="bg-white border-2 border-[#EADECF] p-8 rounded-3xl space-y-6 shadow-2xs text-center">
        <div className="space-y-2 max-w-md mx-auto">
          <h3 className="text-xl font-black text-[#231917]">Trong thời gian chờ bộ đề JLPT...</h3>
          <p className="text-xs text-[#76685F]">
            Bạn có thể quản lý độc lập từng chuyên mục bài học & bài tập theo 3 phân hệ đã hoàn thiện bên dưới:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <Link
            href="/admin/vocabularies"
            className="p-5 rounded-2xl border-2 border-orange-200 bg-orange-50/50 hover:bg-orange-100/60 transition-all space-y-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#C65D4B] text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
              📖
            </div>
            <h4 className="font-black text-[#231917] text-sm group-hover:text-[#C65D4B] transition-colors">
              Quản Lý Từ Vựng
            </h4>
            <p className="text-xs text-[#76685F]">
              Bài học, Flashcard 3D, Luyện gõ Romaji, Game 3D & Quiz Từ Vựng.
            </p>
          </Link>

          <Link
            href="/admin/kanji"
            className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/50 hover:bg-amber-100/60 transition-all space-y-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
              ✍️
            </div>
            <h4 className="font-black text-[#231917] text-sm group-hover:text-amber-700 transition-colors">
              Quản Lý Hán Tự
            </h4>
            <p className="text-xs text-[#76685F]">
              Canvas vẽ nét 3D, Gõ Hiragana, Đọc câu, Game 3D Kanji & Quiz Hán tự.
            </p>
          </Link>

          <Link
            href="/admin/grammar"
            className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 transition-all space-y-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
              🧩
            </div>
            <h4 className="font-black text-[#231917] text-sm group-hover:text-emerald-700 transition-colors">
              Quản Lý Ngữ Pháp
            </h4>
            <p className="text-xs text-[#76685F]">
              Mẫu câu, Cloze transform, Phản xạ hội thoại, Ema game & Quiz ★ JLPT.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
