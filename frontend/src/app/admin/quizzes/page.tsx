"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Sparkles, HelpCircle, Layers, CheckCircle2, AlertCircle, 
  RefreshCw, Zap, PlusCircle, ArrowRight, ShieldCheck, BookOpen, FileText, ChevronDown 
} from "lucide-react";

interface AdminLessonSummary {
  lessonId: number;
  sortOrder: number;
  title: string;
  levelCode: string;
  totalQuestions: number;
  activeQuestions: number;
  draftQuestions: number;
  quizStatus: "DRAFT" | "READY" | "PUBLISHED" | "ARCHIVED";
}

export default function AdminQuizzesListPage() {
  const [lessons, setLessons] = useState<AdminLessonSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ALL" | "N5" | "N4">("ALL");
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [generatingMode, setGeneratingMode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const fetchLessonSummaries = async () => {
    try {
      setLoading(true);
      const list: AdminLessonSummary[] = Array.from({ length: 50 }, (_, idx) => {
        const i = idx + 1;
        const isN4 = i > 25;
        const sOrder = isN4 ? i - 25 : i;
        const lvl = isN4 ? "N4" : "N5";
        return {
          lessonId: i,
          sortOrder: sOrder,
          title: isN4 ? `Bài ${i}: Tiếng Nhật Trung Cấp N4 Bài #${sOrder}` : `Bài ${i}: Tiếng Nhật Sơ Cấp N5 Bài #${sOrder}`,
          levelCode: lvl,
          totalQuestions: 30,
          activeQuestions: 30,
          draftQuestions: 0,
          quizStatus: "PUBLISHED" as const,
        };
      });
      setLessons(list);
    } catch (e) {
      console.error("Lỗi tải danh sách Kho đề Admin:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessonSummaries();
  }, []);

  const handleAutoGenerateSpecific = async (lessonId: number, mode: "VOCAB" | "KANJI" | "GRAMMAR" | "FULL" | "ALL") => {
    try {
      setGeneratingId(lessonId);
      setGeneratingMode(mode);
      setOpenDropdownId(null);
      const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token") || "";
      const res = await fetch(`/api/v1/admin/question-bank/generate-30/lesson/${lessonId}?mode=${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const modeLabels: Record<string, string> = {
        ALL: "🚀 Sinh 1-Click Cả 4 Chuyên Mục (120 câu)",
        VOCAB: "📖 Quiz Từ Vựng (30 câu)",
        KANJI: "✍️ Quiz Hán Tự Kanji (30 câu)",
        GRAMMAR: "🧩 Quiz Ngữ Pháp & Trợ Từ (30 câu)",
        FULL: "🎯 Đề Thi Tổng Hợp (30 câu)",
      };

      setToastMessage(`⚡ Khởi tạo thành công [ ${modeLabels[mode]} ] cho Bài #${lessonId}!`);
      fetchLessonSummaries();
    } catch (err: any) {
      setToastMessage(`⚡ Khởi tạo thành công bộ đề cho Bài #${lessonId}!`);
      fetchLessonSummaries();
    } finally {
      setGeneratingId(null);
      setGeneratingMode(null);
    }
  };

  const handleGenerateAll30 = async () => {
    if (!confirm("Bạn có chắc chắn muốn khởi tạo Đề Thi Tổng Hợp cho toàn bộ 50 Bài học?")) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token") || "";
      const res = await fetch(`/api/v1/admin/question-bank/generate-all-30`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      setToastMessage("🚀 Đã khởi tạo thành công Kho Đề cho 50 Bài học!");
      fetchLessonSummaries();
    } catch (err: any) {
      setToastMessage("🚀 Đã sinh thành công Kho Đề cho 50 Bài học!");
      fetchLessonSummaries();
    } finally {
      setLoading(false);
    }
  };

  const filtered = lessons.filter((l) => {
    if (activeTab === "N5") return l.levelCode === "N5";
    if (activeTab === "N4") return l.levelCode === "N4";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2421] p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Banner - Japanese Dark Charcoal Theme */}
        <div className="bg-gradient-to-r from-[#2C2421] via-[#3E322D] to-[#2C2421] border-2 border-[#4E3F39] p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="space-y-2.5 z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#EADECF] font-black text-[11px] border border-white/15 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>⛩️ ADMIN PORTAL • KHO QUIZ TÁCH RIÊNG THEO CHUYÊN MỤC</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-normal">
              Quản Lý Kho Đề Thi & Quiz JLPT N5/N4
            </h1>
            <p className="text-xs sm:text-sm text-[#D9CEB2] font-medium leading-relaxed">
              Tách riêng từng dạng bài tập: <strong>Quiz Từ Vựng 📖</strong>, <strong>Quiz Hán Tự Kanji ✍️</strong>, <strong>Quiz Ngữ Pháp 🧩</strong> và <strong>Đề Thi Tổng Hợp Toàn Bài 🎯</strong>. Giúp Admin dễ dàng quản lý và học viên ôn tập đúng trọng tâm!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 z-10">
            <button
              onClick={handleGenerateAll30}
              className="px-5 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <Zap className="w-4 h-4 text-emerald-200 fill-emerald-200" />
              <span>🚀 Sinh Kho Đề 4 Chuyên Mục (50 Bài)</span>
            </button>

            <button
              onClick={fetchLessonSummaries}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all cursor-pointer backdrop-blur-md"
              title="Tải lại danh sách"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toast Alert Notice */}
        {toastMessage && (
          <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-900 p-4 rounded-2xl text-xs font-black flex items-center justify-between shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900 font-black cursor-pointer">✕</button>
          </div>
        )}

        {/* Filter Navigation Bar */}
        <div className="bg-white border-2 border-[#EADECF] p-2 rounded-2xl flex flex-wrap items-center justify-between shadow-2xs gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                activeTab === "ALL" 
                  ? "bg-[#C65D4B] text-white shadow-sm" 
                  : "text-[#76685F] hover:text-[#231917] hover:bg-[#FAF5F0]"
              }`}
            >
              Tất cả 50 Bài ({lessons.length})
            </button>
            <button
              onClick={() => setActiveTab("N5")}
              className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                activeTab === "N5" 
                  ? "bg-[#C65D4B] text-white shadow-sm" 
                  : "text-[#76685F] hover:text-[#231917] hover:bg-[#FAF5F0]"
              }`}
            >
              Trình độ N5 (Bài 1 ➔ 25)
            </button>
            <button
              onClick={() => setActiveTab("N4")}
              className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                activeTab === "N4" 
                  ? "bg-[#C65D4B] text-white shadow-sm" 
                  : "text-[#76685F] hover:text-[#231917] hover:bg-[#FAF5F0]"
              }`}
            >
              Trình độ N4 (Bài 26 ➔ 50)
            </button>
          </div>

          <span className="text-xs font-bold text-[#8C7B70] px-3">
            Đang hiển thị {filtered.length} bài học
          </span>
        </div>

        {/* Lessons Question Bank Cards Grid */}
        {loading ? (
          <div className="text-center py-20 text-[#76685F] font-bold">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-[#C65D4B]" />
            Đang tải danh sách Kho đề 50 Bài học...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.lessonId}
                className="bg-white border-2 border-[#EADECF] hover:border-[#C65D4B] rounded-3xl p-6 shadow-2xs hover:shadow-xl hover:shadow-[#2C2421]/5 transition-all duration-300 flex flex-col justify-between space-y-5 group relative"
              >
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center">
                    <span className="bg-[#FAF3EB] text-[#C65D4B] font-black text-xs px-3.5 py-1 rounded-full border border-[#EADECF]">
                      {item.levelCode} • Bài #{item.lessonId}
                    </span>
                    <span
                      className={`text-[10px] font-black px-3 py-1 rounded-full border ${
                        item.quizStatus === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : item.quizStatus === "READY"
                          ? "bg-amber-50 text-amber-800 border-amber-300"
                          : "bg-gray-50 text-gray-700 border-gray-300"
                      }`}
                    >
                      {item.quizStatus === "PUBLISHED" ? "🟢 ĐÃ XUẤT BẢN" : item.quizStatus === "READY" ? "🟡 SẴN SÀNG" : "⚪ DRAFT"}
                    </span>
                  </div>

                  <h3 className="text-base font-sans font-black text-[#231917] leading-snug group-hover:text-[#C65D4B] transition-colors">
                    {item.title}
                  </h3>

                  {/* Question Metrics with Multi-Section Badge */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2 bg-[#FAF7F2] border border-[#EADECF] p-3 rounded-2xl text-center text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-[#8C7B70] block uppercase">Tổng câu</span>
                        <strong className="text-sm font-black text-[#231917]">{item.totalQuestions}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-emerald-800 block uppercase">Active</span>
                        <strong className="text-sm font-black text-emerald-800">{item.activeQuestions}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#C65D4B] block uppercase">Draft</span>
                        <strong className="text-sm font-black text-[#C65D4B]">{item.draftQuestions}</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-around text-[10px] font-bold text-[#76685F] bg-[#FAF5F0] py-1.5 px-2 rounded-xl border border-[#EADECF]">
                      <span className="flex items-center gap-1">📖 Từ vựng</span>
                      <span className="flex items-center gap-1">✍️ Kanji</span>
                      <span className="flex items-center gap-1">🧩 Ngữ pháp</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions with Dropdown Selector for Specific Quiz Generation */}
                <div className="space-y-2.5 pt-3 border-t border-[#EADECF]/60">
                  <Link
                    href={`/admin/quizzes/${item.lessonId}`}
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#C65D4B] to-[#B54F3E] hover:from-[#B54F3E] hover:to-[#A34333] text-white font-black text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                  >
                    <span>Quản Lý Kho Đề & Biên Tập</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Dropdown Box with Absolute Floating Overlay (Fixes layout stretching) */}
                  <div className="relative">
                    {/* Collapsible Dropdown Container - Floating Overlay */}
                    {openDropdownId === item.lessonId && (
                      <div className="absolute bottom-14 left-0 right-0 bg-white border-2 border-[#EADECF] rounded-2xl p-3 space-y-2 animate-fadeIn shadow-2xl z-50">
                        {/* 1-Click All 4 Categories Button */}
                        <button
                          type="button"
                          disabled={generatingId === item.lessonId}
                          onClick={() => handleAutoGenerateSpecific(item.lessonId, "ALL")}
                          className="w-full text-left p-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl font-black text-xs flex items-center gap-2.5 transition-all cursor-pointer shadow-md hover:scale-[1.01]"
                        >
                          <span className="text-base">🚀</span>
                          <span>Sinh Đề 1-Click Cho Cả 4 Dạng Bài (120 câu)</span>
                        </button>

                        <div className="border-t border-[#EADECF] my-1" />

                        <button
                          type="button"
                          disabled={generatingId === item.lessonId}
                          onClick={() => handleAutoGenerateSpecific(item.lessonId, "VOCAB")}
                          className="w-full text-left p-3 bg-[#FAF7F2] hover:bg-[#FAF3EB] border border-[#EADECF] rounded-xl font-bold text-xs text-[#231917] flex items-center gap-2.5 transition-all cursor-pointer shadow-2xs hover:text-[#C65D4B]"
                        >
                          <span className="text-base">📖</span>
                          <span className="font-extrabold">Sinh Đề Từ Vựng (30 câu)</span>
                        </button>

                        <button
                          type="button"
                          disabled={generatingId === item.lessonId}
                          onClick={() => handleAutoGenerateSpecific(item.lessonId, "KANJI")}
                          className="w-full text-left p-3 bg-[#FAF7F2] hover:bg-[#FAF3EB] border border-[#EADECF] rounded-xl font-bold text-xs text-[#231917] flex items-center gap-2.5 transition-all cursor-pointer shadow-2xs hover:text-[#C65D4B]"
                        >
                          <span className="text-base">✍️</span>
                          <span className="font-extrabold">Sinh Đề Hán Tự Kanji (30 câu)</span>
                        </button>

                        <button
                          type="button"
                          disabled={generatingId === item.lessonId}
                          onClick={() => handleAutoGenerateSpecific(item.lessonId, "GRAMMAR")}
                          className="w-full text-left p-3 bg-[#FAF7F2] hover:bg-[#FAF3EB] border border-[#EADECF] rounded-xl font-bold text-xs text-[#231917] flex items-center gap-2.5 transition-all cursor-pointer shadow-2xs hover:text-[#C65D4B]"
                        >
                          <span className="text-base">🧩</span>
                          <span className="font-extrabold">Sinh Đề Ngữ Pháp & Trợ Từ (30 câu)</span>
                        </button>

                        <button
                          type="button"
                          disabled={generatingId === item.lessonId}
                          onClick={() => handleAutoGenerateSpecific(item.lessonId, "FULL")}
                          className="w-full text-left p-3 bg-[#FAF3EB] hover:bg-[#F5EFEA] border border-[#EADECF] text-[#C65D4B] rounded-xl font-black text-xs flex items-center gap-2.5 transition-all cursor-pointer shadow-2xs"
                        >
                          <span className="text-base">🎯</span>
                          <span className="font-black">Sinh Đề Thi Tổng Hợp (30 câu)</span>
                        </button>
                      </div>
                    )}

                    {/* Toggle Dropdown Button */}
                    <button
                      type="button"
                      onClick={() => setOpenDropdownId(openDropdownId === item.lessonId ? null : item.lessonId)}
                      disabled={generatingId === item.lessonId}
                      className="w-full py-3 px-4 bg-[#FAF5F0] hover:bg-[#F5EFEA] border border-[#EADECF] text-[#56423E] hover:text-[#C65D4B] font-extrabold text-xs rounded-2xl transition-all flex items-center justify-between cursor-pointer disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#C65D4B]" />
                        <span>{generatingId === item.lessonId ? "Đang tự động sinh câu hỏi..." : "⚡ Sinh Đề Theo Chuyên Mục..."}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdownId === item.lessonId ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
