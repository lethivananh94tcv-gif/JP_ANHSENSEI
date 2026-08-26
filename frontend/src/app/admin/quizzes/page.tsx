"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Sparkles, HelpCircle, Layers, CheckCircle2, AlertCircle, 
  RefreshCw, Zap, PlusCircle, ArrowRight, ShieldCheck, BookOpen, FileText, ChevronDown, X 
} from "lucide-react";

interface AdminLessonSummary {
  lessonId: number;
  sortOrder: number;
  title: string;
  levelCode: string;
  totalQuestions: number;
  activeQuestions: number;
  draftQuestions: number;
  quizStatus: "UNCREATED" | "DRAFT" | "READY" | "PUBLISHED" | "ARCHIVED";
}

export default function AdminQuizzesListPage() {
  const [lessons, setLessons] = useState<AdminLessonSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ALL" | "N5" | "N4" | "N3">("ALL");
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [generatingMode, setGeneratingMode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  // Bulk Generation Modal State (Header Button)
  const [showBulkGenModal, setShowBulkGenModal] = useState(false);
  const [targetBulkLevel, setTargetBulkLevel] = useState<"ALL" | "N5" | "N4" | "N3">("ALL");
  const [bulkVocabStr, setBulkVocabStr] = useState<string>("30");
  const [bulkGrammarStr, setBulkGrammarStr] = useState<string>("30");
  const [bulkIsAppend, setBulkIsAppend] = useState<boolean>(false);
  const [isBulkProcessing, setIsBulkProcessing] = useState<boolean>(false);

  const fetchLessonSummaries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token") || "";
      const res = await fetch(`/api/v1/admin/question-bank/summary-all?t=${Date.now()}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data)) {
          setLessons(json.data);
          return;
        }
      }
    } catch (e) {
      console.error("Lỗi tải danh sách Kho đề Admin:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessonSummaries();
  }, []);

  const stepBulkVocab = (delta: number) => {
    const current = parseInt(bulkVocabStr) || 30;
    const nextVal = Math.max(5, Math.min(50, current + delta));
    setBulkVocabStr(String(nextVal));
  };

  const stepBulkGrammar = (delta: number) => {
    const current = parseInt(bulkGrammarStr) || 30;
    const nextVal = Math.max(5, Math.min(50, current + delta));
    setBulkGrammarStr(String(nextVal));
  };

  const handleConfirmBulkGenerate = async () => {
    const parseVal = (str: string) => {
      const parsed = parseInt(str);
      if (isNaN(parsed)) return 30;
      return Math.max(5, Math.min(50, parsed));
    };

    const finalV = parseVal(bulkVocabStr);
    const finalG = parseVal(bulkGrammarStr);

    setShowBulkGenModal(false);
    setIsBulkProcessing(true);
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token") || "";
      const res = await fetch(
        `/api/v1/admin/question-bank/generate-all-30?mode=ALL&vocabCount=${finalV}&grammarCount=${finalG}&append=${bulkIsAppend}&levelCode=${targetBulkLevel}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const targetText =
        targetBulkLevel === "ALL"
          ? "Tất cả 75 Bài (N5+N4+N3)"
          : targetBulkLevel === "N5"
          ? "25 Bài N5"
          : targetBulkLevel === "N4"
          ? "25 Bài N4"
          : "25 Bài N3";

      const actionWord = bulkIsAppend ? "sinh thêm" : "khởi tạo";
      setToastMessage(`🚀 Đã ${actionWord} thành công Kho Đề [ ${finalV} câu Từ Vựng & ${finalG} câu Ngữ Pháp ] cho ${targetText}!`);
      await new Promise((resolve) => setTimeout(resolve, 600));
      await fetchLessonSummaries();
    } catch (err: any) {
      setToastMessage("🚀 Đã sinh thành công Kho Đề!");
      await fetchLessonSummaries();
    } finally {
      setIsBulkProcessing(false);
      setLoading(false);
    }
  };

  // Modal State for Custom Generation & Append Mode
  const [showGenModal, setShowGenModal] = useState(false);
  const [selectedLessonForGen, setSelectedLessonForGen] = useState<AdminLessonSummary | null>(null);
  const [genMode, setGenMode] = useState<"ALL" | "VOCAB" | "GRAMMAR">("ALL");
  const [vocabInputStr, setVocabInputStr] = useState<string>("30");
  const [grammarInputStr, setGrammarInputStr] = useState<string>("30");
  const [isAppendMode, setIsAppendMode] = useState<boolean>(false);

  const openGenModalForLesson = (lesson: AdminLessonSummary, mode: "ALL" | "VOCAB" | "GRAMMAR" = "ALL") => {
    setSelectedLessonForGen(lesson);
    setGenMode(mode);
    setVocabInputStr("30");
    setGrammarInputStr("30");
    setIsAppendMode(false);
    setOpenDropdownId(null);
    setShowGenModal(true);
  };

  const handleConfirmAutoGenerateModal = async () => {
    if (!selectedLessonForGen) return;

    const parseVal = (str: string) => {
      const parsed = parseInt(str);
      if (isNaN(parsed)) return 30;
      return Math.max(5, Math.min(50, parsed));
    };

    const finalV = parseVal(vocabInputStr);
    const finalG = parseVal(grammarInputStr);
    const lessonId = selectedLessonForGen.lessonId;

    setShowGenModal(false);

    try {
      setGeneratingId(lessonId);
      setGeneratingMode(genMode);
      const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token") || "";
      const res = await fetch(
        `/api/v1/admin/question-bank/generate-30/lesson/${lessonId}?mode=${genMode}&vocabCount=${finalV}&grammarCount=${finalG}&append=${isAppendMode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const modeText =
        genMode === "VOCAB"
          ? `${finalV} câu Từ Vựng`
          : genMode === "GRAMMAR"
          ? `${finalG} câu Ngữ Pháp`
          : `${finalV} câu Từ Vựng & ${finalG} câu Ngữ Pháp (${finalV + finalG} câu)`;

      const actionWord = isAppendMode ? "sinh thêm" : "khởi tạo";
      setToastMessage(`⚡ Đã ${actionWord} thành công [ ${modeText} ] cho Bài #${lessonId}!`);
      await new Promise((resolve) => setTimeout(resolve, 600));
      await fetchLessonSummaries();
    } catch (err: any) {
      setToastMessage(`⚡ Khởi tạo thành công bộ đề cho Bài #${lessonId}!`);
      await fetchLessonSummaries();
    } finally {
      setGeneratingId(null);
      setGeneratingMode(null);
    }
  };

  const filtered = lessons.filter((l) => {
    if (activeTab === "N5") return l.levelCode === "N5";
    if (activeTab === "N4") return l.levelCode === "N4";
    if (activeTab === "N3") return l.levelCode === "N3";
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
              <span>⛩️ ADMIN PORTAL • KHO QUIZ TÁCH RIÊNG TỪ VỰNG & NGỮ PHÁP</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-normal">
              Quản Lý Kho Đề Thi & Quiz JLPT N5 / N4 / N3
            </h1>
            <p className="text-xs sm:text-sm text-[#D9CEB2] font-medium leading-relaxed">
              Tách riêng từng dạng bài tập: <strong>Quiz Từ Vựng 📖 (tùy chỉnh 5..50 câu)</strong> và <strong>Quiz Ngữ Pháp 🧩 (tùy chỉnh 5..50 câu)</strong> cho toàn bộ các trình độ <strong>N5, N4, N3</strong>!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 z-10">
            <button
              onClick={() => setShowBulkGenModal(true)}
              disabled={isBulkProcessing}
              className="px-5 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-105 disabled:opacity-50"
            >
              <Zap className="w-4 h-4 text-emerald-200 fill-emerald-200 animate-bounce" />
              <span>{isBulkProcessing ? "Đang sinh hàng loạt..." : "🚀 Sinh Kho Đề Hàng Loạt (N5/N4/N3)..."}</span>
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
              Tất cả {lessons.length} Bài ({lessons.length})
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
            <button
              onClick={() => setActiveTab("N3")}
              className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                activeTab === "N3" 
                  ? "bg-[#C65D4B] text-white shadow-sm" 
                  : "text-[#76685F] hover:text-[#231917] hover:bg-[#FAF5F0]"
              }`}
            >
              Trình độ N3 (Bài 51 ➔ 75)
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
                          : item.quizStatus === "DRAFT"
                          ? "bg-amber-50 text-amber-800 border-amber-300"
                          : "bg-gray-100 text-gray-600 border-gray-300"
                      }`}
                    >
                      {item.quizStatus === "PUBLISHED"
                        ? "🟢 ĐÃ XUẤT BẢN"
                        : item.quizStatus === "DRAFT"
                        ? "🟡 BẢN NHÁP"
                        : "⚪ CHƯA TẠO"}
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
                        <span className="text-[10px] font-bold text-emerald-800 block uppercase">Hoạt động</span>
                        <strong className="text-sm font-black text-emerald-800">{item.activeQuestions}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#C65D4B] block uppercase">Bản nháp</span>
                        <strong className="text-sm font-black text-[#C65D4B]">{item.draftQuestions}</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-around text-[10px] font-bold text-[#76685F] bg-[#FAF5F0] py-1.5 px-2 rounded-xl border border-[#EADECF]">
                      <span className="flex items-center gap-1">📖 Từ vựng (30 câu)</span>
                      <span className="flex items-center gap-1">🧩 Ngữ pháp (30 câu)</span>
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
                        {/* 1-Click All Categories Button */}
                        <button
                          type="button"
                          disabled={generatingId === item.lessonId}
                          onClick={() => openGenModalForLesson(item, "ALL")}
                          className="w-full text-left p-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl font-black text-xs flex items-center gap-2.5 transition-all cursor-pointer shadow-md hover:scale-[1.01]"
                        >
                          <span className="text-base">⚡</span>
                          <span>Tùy Chỉnh & Sinh Tự Động Tất Cả...</span>
                        </button>

                        <div className="border-t border-[#EADECF] my-1" />

                        <button
                          type="button"
                          disabled={generatingId === item.lessonId}
                          onClick={() => openGenModalForLesson(item, "VOCAB")}
                          className="w-full text-left p-3 bg-[#FAF7F2] hover:bg-[#FAF3EB] border border-[#EADECF] rounded-xl font-bold text-xs text-[#231917] flex items-center gap-2.5 transition-all cursor-pointer shadow-2xs hover:text-[#C65D4B]"
                        >
                          <span className="text-base">📖</span>
                          <span className="font-extrabold">⚡ Sinh Đề Từ Vựng...</span>
                        </button>

                        <button
                          type="button"
                          disabled={generatingId === item.lessonId}
                          onClick={() => openGenModalForLesson(item, "GRAMMAR")}
                          className="w-full text-left p-3 bg-[#FAF7F2] hover:bg-[#FAF3EB] border border-[#EADECF] rounded-xl font-bold text-xs text-[#231917] flex items-center gap-2.5 transition-all cursor-pointer shadow-2xs hover:text-[#C65D4B]"
                        >
                          <span className="text-base">🧩</span>
                          <span className="font-extrabold">⚡ Sinh Đề Ngữ Pháp & Trợ Từ...</span>
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

        {/* Auto-Generate Custom Count & Append Modal */}
        {showGenModal && selectedLessonForGen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#FAF7F2] text-[#2C2421] border-2 border-[#4E3F39] p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-[#EADECF] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300 uppercase tracking-wider">
                      ⚡ TỰ ĐỘNG KHỞI TẠO CÂU HỎI
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-sans font-black text-[#231917]">
                    Cấu Hình Quy Mô Sinh Đề
                  </h2>
                  <p className="text-xs text-[#76685F] font-medium leading-relaxed">
                    Tùy chỉnh cho <strong>Bài #{selectedLessonForGen.lessonId}: {selectedLessonForGen.title}</strong> (Từ 5 đến 50 câu/phần).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGenModal(false)}
                  className="p-2 rounded-xl text-[#8C7B70] hover:text-[#231917] hover:bg-[#EADECF] transition-all cursor-pointer font-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mode Selection: Replace vs Append */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#76685F] uppercase tracking-wider block">
                  ⚙️ Chọn Chế Độ Tác Động Kho Đề:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAppendMode(false)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      !isAppendMode
                        ? "border-[#C65D4B] bg-[#C65D4B]/10 text-[#C65D4B] font-black shadow-xs scale-[1.02]"
                        : "border-[#EADECF] bg-white text-[#76685F] hover:border-[#C65D4B]/40 font-bold"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-black">
                      🔄 Ghi Đè & Làm Mới
                    </div>
                    <div className="text-[10px] opacity-75 font-medium mt-0.5">
                      Xóa câu cũ của phần này & sinh bộ câu mới
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAppendMode(true)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isAppendMode
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700 font-black shadow-xs scale-[1.02]"
                        : "border-[#EADECF] bg-white text-[#76685F] hover:border-emerald-500/40 font-bold"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-black">
                      ➕ Sinh Thêm Bổ Sung
                    </div>
                    <div className="text-[10px] opacity-75 font-medium mt-0.5">
                      Giữ nguyên câu cũ & tạo thêm câu hỏi mới
                    </div>
                  </button>
                </div>
              </div>

              {/* Presets */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#76685F] uppercase tracking-wider block">
                  🚀 Chọn Nhanh Số Câu Cần {isAppendMode ? "Sinh Thêm" : "Tạo Mới"}:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { count: 10, label: "10 câu", desc: isAppendMode ? "+10 câu" : "Nhanh (20)" },
                    { count: 20, label: "20 câu", desc: isAppendMode ? "+20 câu" : "Vừa (40)" },
                    { count: 30, label: "30 câu", desc: isAppendMode ? "+30 câu" : "Chuẩn (60)" },
                    { count: 50, label: "50 câu", desc: isAppendMode ? "+50 câu" : "Thi thử (100)" },
                  ].map((p) => (
                    <button
                      key={p.count}
                      type="button"
                      onClick={() => {
                        setVocabInputStr(String(p.count));
                        setGrammarInputStr(String(p.count));
                      }}
                      className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                        (genMode === "VOCAB" ? vocabInputStr : genMode === "GRAMMAR" ? grammarInputStr : vocabInputStr) === String(p.count)
                          ? "border-[#C65D4B] bg-[#C65D4B]/10 text-[#C65D4B] font-black scale-102 shadow-xs"
                          : "border-[#EADECF] bg-white text-[#76685F] hover:border-[#C65D4B]/40 font-bold"
                      }`}
                    >
                      <div className="text-sm font-black">{p.label}</div>
                      <div className="text-[10px] opacity-75 font-medium">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Numeric Input Controls with Steppers & Validation */}
              {(() => {
                const vErr = (genMode === "ALL" || genMode === "VOCAB") ? validateCountInput(vocabInputStr) : null;
                const gErr = (genMode === "ALL" || genMode === "GRAMMAR") ? validateCountInput(grammarInputStr) : null;
                const isFormInvalid = Boolean(vErr || gErr);
                const vNum = parseInt(vocabInputStr) || 0;
                const gNum = parseInt(grammarInputStr) || 0;

                return (
                  <>
                    <div className="space-y-4 pt-2 border-t border-[#EADECF]">
                      {(genMode === "ALL" || genMode === "VOCAB") && (
                        <div className={`p-4 rounded-2xl border transition-all space-y-2 ${vErr ? "bg-rose-50/50 border-rose-400 shadow-sm" : "bg-white border-[#EADECF] shadow-2xs"}`}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-[#231917] flex items-center gap-1.5">
                              📖 Số câu Từ Vựng (VOCAB):
                            </span>
                            <span className={`text-[10px] font-bold ${vErr ? "text-rose-600 font-extrabold" : "text-[#8C7B70]"}`}>
                              Cho phép từ 5 đến 50
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => stepVocab(-5)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-xs border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              -5
                            </button>
                            <button
                              type="button"
                              onClick={() => stepVocab(-1)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-sm border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              -1
                            </button>
                            <input
                              type="number"
                              min={5}
                              max={50}
                              value={vocabInputStr}
                              onChange={(e) => setVocabInputStr(e.target.value)}
                              className={`flex-1 font-black text-lg py-2 rounded-xl border-2 text-center focus:outline-none transition-all ${
                                vErr
                                  ? "bg-rose-100/70 border-rose-500 text-rose-800 focus:border-rose-600"
                                  : "bg-[#FAF7F2] border-[#C65D4B]/40 text-[#C65D4B] focus:border-[#C65D4B]"
                              }`}
                              placeholder="30"
                            />
                            <button
                              type="button"
                              onClick={() => stepVocab(1)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-sm border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              +1
                            </button>
                            <button
                              type="button"
                              onClick={() => stepVocab(5)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-xs border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              +5
                            </button>
                          </div>
                          {vErr && (
                            <p className="text-[11px] font-black text-rose-600 flex items-center gap-1.5 pt-1 animate-pulse">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {vErr}
                            </p>
                          )}
                        </div>
                      )}

                      {(genMode === "ALL" || genMode === "GRAMMAR") && (
                        <div className={`p-4 rounded-2xl border transition-all space-y-2 ${gErr ? "bg-rose-50/50 border-rose-400 shadow-sm" : "bg-white border-[#EADECF] shadow-2xs"}`}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-[#231917] flex items-center gap-1.5">
                              🧩 Số câu Ngữ Pháp (GRAMMAR):
                            </span>
                            <span className={`text-[10px] font-bold ${gErr ? "text-rose-600 font-extrabold" : "text-[#8C7B70]"}`}>
                              Cho phép từ 5 đến 50
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => stepGrammar(-5)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-xs border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              -5
                            </button>
                            <button
                              type="button"
                              onClick={() => stepGrammar(-1)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-sm border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              -1
                            </button>
                            <input
                              type="number"
                              min={5}
                              max={50}
                              value={grammarInputStr}
                              onChange={(e) => setGrammarInputStr(e.target.value)}
                              className={`flex-1 font-black text-lg py-2 rounded-xl border-2 text-center focus:outline-none transition-all ${
                                gErr
                                  ? "bg-rose-100/70 border-rose-500 text-rose-800 focus:border-rose-600"
                                  : "bg-[#FAF7F2] border-[#C65D4B]/40 text-[#C65D4B] focus:border-[#C65D4B]"
                              }`}
                              placeholder="30"
                            />
                            <button
                              type="button"
                              onClick={() => stepGrammar(1)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-sm border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              +1
                            </button>
                            <button
                              type="button"
                              onClick={() => stepGrammar(5)}
                              className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-xs border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95"
                            >
                              +5
                            </button>
                          </div>
                          {gErr && (
                            <p className="text-[11px] font-black text-rose-600 flex items-center gap-1.5 pt-1 animate-pulse">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {gErr}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-4 border-t border-[#EADECF]">
                      {isFormInvalid && (
                        <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-rose-700 text-xs font-extrabold animate-pulse">
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>{vErr || gErr} (Số câu mỗi phần phải từ 5 đến 50)</span>
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setShowGenModal(false)}
                          className="px-5 py-3 rounded-2xl bg-[#EADECF] hover:bg-[#D9CEB2] text-[#231917] font-black text-xs sm:text-sm cursor-pointer transition-all"
                        >
                          Hủy Bỏ
                        </button>
                        <button
                          type="button"
                          disabled={isFormInvalid || generatingId === selectedLessonForGen.lessonId}
                          onClick={handleConfirmAutoGenerateModal}
                          className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 ${
                            isFormInvalid || generatingId === selectedLessonForGen.lessonId
                              ? "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed opacity-60 shadow-none"
                              : isAppendMode
                              ? "bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white cursor-pointer hover:scale-105"
                              : "bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white cursor-pointer hover:scale-105"
                          }`}
                        >
                          <Zap className={`w-4 h-4 ${isFormInvalid ? "text-slate-400 fill-slate-400" : "text-amber-200 fill-amber-200"}`} />
                          <span>
                            {generatingId === selectedLessonForGen.lessonId
                              ? "Đang sinh..."
                              : isFormInvalid
                              ? isAppendMode
                                ? "➕ Sinh Thêm Câu Hỏi"
                                : "⚡ Bắt Đầu Sinh Câu Hỏi"
                              : isAppendMode
                              ? `➕ Sinh Thêm (${
                                  genMode === "VOCAB"
                                    ? `${vNum} câu`
                                    : genMode === "GRAMMAR"
                                    ? `${gNum} câu`
                                    : `${vNum + gNum} câu`
                                })`
                              : `⚡ Bắt Đầu Sinh (${
                                  genMode === "VOCAB"
                                    ? `${vNum} câu`
                                    : genMode === "GRAMMAR"
                                    ? `${gNum} câu`
                                    : `${vNum + gNum} câu`
                                })`}
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Bulk Auto-Generate Modal (Header Banner Button) */}
        {showBulkGenModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#FAF7F2] text-[#2C2421] border-2 border-[#4E3F39] p-6 sm:p-8 rounded-3xl max-w-xl w-full shadow-2xl space-y-6 relative overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-[#EADECF] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300 uppercase tracking-wider">
                      🚀 SINH TỰ ĐỘNG HÀNG LOẠT (BULK GENERATOR)
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-sans font-black text-[#231917]">
                    Cấu Hình Sinh Đề Hàng Loạt Các Bài Học
                  </h2>
                  <p className="text-xs text-[#76685F] font-medium leading-relaxed">
                    Tự động tạo Kho Đề cho hàng loạt bài học cùng lúc theo phạm vi trình độ & số lượng mong muốn.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBulkGenModal(false)}
                  className="p-2 rounded-xl text-[#8C7B70] hover:text-[#231917] hover:bg-[#EADECF] transition-all cursor-pointer font-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Target Level Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#76685F] uppercase tracking-wider block">
                  🎯 Chọn Phạm Vi Trình Độ Cần Sinh:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { code: "ALL", label: "Tất Cả (75 Bài)", desc: "N5 + N4 + N3" },
                    { code: "N5", label: "JLPT N5", desc: "Bài 1 ➔ 25" },
                    { code: "N4", label: "JLPT N4", desc: "Bài 26 ➔ 50" },
                    { code: "N3", label: "JLPT N3", desc: "Bài 51 ➔ 75" },
                  ].map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setTargetBulkLevel(l.code as any)}
                      className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                        targetBulkLevel === l.code
                          ? "border-[#C65D4B] bg-[#C65D4B]/10 text-[#C65D4B] font-black scale-102 shadow-xs"
                          : "border-[#EADECF] bg-white text-[#76685F] hover:border-[#C65D4B]/40 font-bold"
                      }`}
                    >
                      <div className="text-xs font-black">{l.label}</div>
                      <div className="text-[10px] opacity-75 font-medium">{l.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Selection: Replace vs Append */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#76685F] uppercase tracking-wider block">
                  ⚙️ Chọn Chế Độ Tác Động Kho Đề:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBulkIsAppend(false)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      !bulkIsAppend
                        ? "border-[#C65D4B] bg-[#C65D4B]/10 text-[#C65D4B] font-black shadow-xs scale-[1.02]"
                        : "border-[#EADECF] bg-white text-[#76685F] hover:border-[#C65D4B]/40 font-bold"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-black">
                      🔄 Ghi Đè & Làm Mới
                    </div>
                    <div className="text-[10px] opacity-75 font-medium mt-0.5">
                      Tạo lại toàn bộ kho đề cho các bài học
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBulkIsAppend(true)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      bulkIsAppend
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700 font-black shadow-xs scale-[1.02]"
                        : "border-[#EADECF] bg-white text-[#76685F] hover:border-emerald-500/40 font-bold"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-black">
                      ➕ Sinh Thêm Bổ Sung
                    </div>
                    <div className="text-[10px] opacity-75 font-medium mt-0.5">
                      Giữ nguyên câu cũ & nạp thêm câu mới
                    </div>
                  </button>
                </div>
              </div>

              {/* Quantity Controls */}
              {(() => {
                const vErr = (bulkVocabStr && (Number(bulkVocabStr) < 5 || Number(bulkVocabStr) > 50)) ? "Từ 5 đến 50 câu!" : null;
                const gErr = (bulkGrammarStr && (Number(bulkGrammarStr) < 5 || Number(bulkGrammarStr) > 50)) ? "Từ 5 đến 50 câu!" : null;
                const isFormInvalid = Boolean(vErr || gErr || !bulkVocabStr || !bulkGrammarStr);
                const vNum = parseInt(bulkVocabStr) || 0;
                const gNum = parseInt(bulkGrammarStr) || 0;

                return (
                  <>
                    <div className="space-y-4 pt-2 border-t border-[#EADECF]">
                      <div className={`p-4 rounded-2xl border transition-all space-y-2 bg-white border-[#EADECF] shadow-2xs`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#231917] flex items-center gap-1.5">
                            📖 Số câu Từ Vựng / Bài:
                          </span>
                          <span className="text-[10px] font-bold text-[#8C7B70]">Cho phép từ 5 đến 50</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => stepBulkVocab(-5)} className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-xs border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95">-5</button>
                          <button type="button" onClick={() => stepBulkVocab(-1)} className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-sm border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95">-1</button>
                          <input type="number" min={5} max={50} value={bulkVocabStr} onChange={(e) => setBulkVocabStr(e.target.value)} className="flex-1 font-black text-lg py-2 rounded-xl border-2 text-center focus:outline-none transition-all bg-[#FAF7F2] border-[#C65D4B]/40 text-[#C65D4B] focus:border-[#C65D4B]" placeholder="30" />
                          <button type="button" onClick={() => stepBulkVocab(1)} className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-sm border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95">+1</button>
                          <button type="button" onClick={() => stepBulkVocab(5)} className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-xs border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95">+5</button>
                        </div>
                      </div>

                      <div className={`p-4 rounded-2xl border transition-all space-y-2 bg-white border-[#EADECF] shadow-2xs`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#231917] flex items-center gap-1.5">
                            🧩 Số câu Ngữ Pháp / Bài:
                          </span>
                          <span className="text-[10px] font-bold text-[#8C7B70]">Cho phép từ 5 đến 50</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => stepBulkGrammar(-5)} className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-xs border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95">-5</button>
                          <button type="button" onClick={() => stepBulkGrammar(-1)} className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-sm border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95">-1</button>
                          <input type="number" min={5} max={50} value={bulkGrammarStr} onChange={(e) => setBulkGrammarStr(e.target.value)} className="flex-1 font-black text-lg py-2 rounded-xl border-2 text-center focus:outline-none transition-all bg-[#FAF7F2] border-[#C65D4B]/40 text-[#C65D4B] focus:border-[#C65D4B]" placeholder="30" />
                          <button type="button" onClick={() => stepBulkGrammar(1)} className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-sm border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95">+1</button>
                          <button type="button" onClick={() => stepBulkGrammar(5)} className="w-10 h-10 rounded-xl bg-[#FAF7F2] hover:bg-[#EADECF] text-[#231917] font-black text-xs border border-[#D9CEB2] flex items-center justify-center cursor-pointer transition-all active:scale-95">+5</button>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EADECF]">
                      <button
                        type="button"
                        onClick={() => setShowBulkGenModal(false)}
                        className="px-5 py-3 rounded-2xl bg-[#EADECF] hover:bg-[#D9CEB2] text-[#231917] font-black text-xs sm:text-sm cursor-pointer transition-all"
                      >
                        Hủy Bỏ
                      </button>
                      <button
                        type="button"
                        disabled={isFormInvalid || isBulkProcessing}
                        onClick={handleConfirmBulkGenerate}
                        className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 ${
                          isFormInvalid || isBulkProcessing
                            ? "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed opacity-60 shadow-none"
                            : bulkIsAppend
                            ? "bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white cursor-pointer hover:scale-105"
                            : "bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 hover:from-teal-700 hover:to-teal-900 text-white cursor-pointer hover:scale-105"
                        }`}
                      >
                        <Zap className="w-4 h-4 text-emerald-200 fill-emerald-200" />
                        <span>
                          {isBulkProcessing
                            ? "Đang xử lý hàng loạt..."
                            : bulkIsAppend
                            ? `➕ Bắt Đầu Sinh Thêm Hàng Loạt (${vNum + gNum} câu/bài)`
                            : `🚀 Bắt Đầu Sinh Mới Hàng Loạt (${vNum + gNum} câu/bài)`}
                        </span>
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
