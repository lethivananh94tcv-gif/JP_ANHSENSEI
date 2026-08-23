"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, HelpCircle, Layers, CheckCircle2, AlertCircle, RefreshCw, Zap, PlusCircle, ArrowRight } from "lucide-react";

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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchLessonSummaries = async () => {
    try {
      setLoading(true);
      const list: AdminLessonSummary[] = [];
      for (let i = 1; i <= 50; i++) {
        const isN4 = i > 25;
        const sOrder = isN4 ? i - 25 : i;
        const lvl = isN4 ? "N4" : "N5";
        
        let activeCount = 0;
        let draftCount = 0;
        let status: "DRAFT" | "READY" | "PUBLISHED" | "ARCHIVED" = "DRAFT";

        try {
          const qRes = await fetch(`http://localhost:8080/api/v1/admin/question-bank/lesson/${i}`);
          if (qRes.ok) {
            const data = await qRes.json();
            const questions = data.data || [];
            activeCount = questions.filter((q: any) => q.status === "ACTIVE").length;
            draftCount = questions.filter((q: any) => q.status === "DRAFT").length;
            if (activeCount >= 5) status = "PUBLISHED";
            else if (questions.length > 0) status = "READY";
          }
        } catch {}

        list.push({
          lessonId: i,
          sortOrder: sOrder,
          title: isN4 ? `Bài ${i}: Tiếng Nhật Trung Cấp N4 Bài #${sOrder}` : `Bài ${i}: Tiếng Nhật Sơ Cấp N5 Bài #${sOrder}`,
          levelCode: lvl,
          totalQuestions: activeCount + draftCount,
          activeQuestions: activeCount,
          draftQuestions: draftCount,
          quizStatus: status,
        });
      }
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

  const handleAutoGenerate = async (lessonId: number) => {
    try {
      setGeneratingId(lessonId);
      const res = await fetch(`http://localhost:8080/api/v1/admin/question-bank/generate-30/lesson/${lessonId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setToastMessage(`⚡ Sinh chuẩn 30 câu hỏi JLPT Từ vựng cho Bài #${lessonId} thành công!`);
        fetchLessonSummaries();
      } else {
        alert(data.message || "Lỗi khi sinh đề tự động.");
      }
    } catch (err: any) {
      alert("Lỗi kết nối server: " + err.message);
    } finally {
      setGeneratingId(null);
    }
  };

  const handleGenerateAll30 = async () => {
    if (!confirm("Bạn có chắc chắn muốn khởi tạo chuẩn Kho 30 câu từ vựng JLPT cho toàn bộ 50 Bài học?")) return;
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/api/v1/admin/question-bank/generate-all-30`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setToastMessage(`🚀 ${data.message || "Đã sinh thành công kho 30 câu JLPT cho 50 Bài học!"}`);
        fetchLessonSummaries();
      } else {
        alert(data.message || "Lỗi khi sinh hàng loạt.");
      }
    } catch (err: any) {
      alert("Lỗi kết nối server: " + err.message);
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2421] p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] p-6 sm:p-8 rounded-3xl shadow-lg">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C65D4B]/10 text-[#C65D4B] font-black text-xs border border-[#C65D4B]/20">
              <Sparkles className="w-3.5 h-3.5" />
              ADMIN DASHBOARD • KHO ĐỀ & QUIZ 30 CÂU JLPT
            </span>
            <h1 className="text-3xl font-serif font-black text-[#231917]">
              Quản Lý Kho Đề Question Bank (Bài 1 ➔ Bài 50)
            </h1>
            <p className="text-xs text-[#76685F] font-semibold max-w-2xl">
              Hệ thống tự động khởi tạo ngầm **30 câu hỏi Từ vựng chuẩn JLPT N5/N4** (đọc Kanji, ngữ cảnh câu, nghĩa từ vựng, audio phát âm 🔊, gõ Romaji ⌨️). Khi Học viên làm bài, hệ thống **xáo ngẫu nhiên chọn 15 câu** cho mỗi lượt thi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleGenerateAll30}
              className="px-4 py-2.5 bg-[#C65D4B] hover:bg-[#b54f3e] text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>🚀 Khởi tạo 30 câu cho cả 50 Bài</span>
            </button>

            <button
              onClick={fetchLessonSummaries}
              className="px-4 py-2.5 bg-white border border-[#DED3C8] hover:border-[#C65D4B] text-[#56423E] hover:text-[#C65D4B] font-extrabold text-xs rounded-2xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Làm mới dữ liệu</span>
            </button>
          </div>
        </div>

        {/* Toast Alert Notice */}
        {toastMessage && (
          <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center justify-between shadow-sm animate-fade-in">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-emerald-600 font-black cursor-pointer">✕</button>
          </div>
        )}

        {/* Tab Filters */}
        <div className="flex gap-3 border-b border-[#DED3C8] pb-3">
          <button
            onClick={() => setActiveTab("ALL")}
            className={`px-5 py-2 rounded-2xl font-black text-xs transition-all cursor-pointer ${
              activeTab === "ALL" ? "bg-[#C65D4B] text-white shadow-sm" : "bg-white text-[#76685F] border border-[#DED3C8] hover:bg-[#FAF3EB]"
            }`}
          >
            Tất cả 50 Bài ({lessons.length})
          </button>
          <button
            onClick={() => setActiveTab("N5")}
            className={`px-5 py-2 rounded-2xl font-black text-xs transition-all cursor-pointer ${
              activeTab === "N5" ? "bg-[#C65D4B] text-white shadow-sm" : "bg-white text-[#76685F] border border-[#DED3C8] hover:bg-[#FAF3EB]"
            }`}
          >
            Trình độ N5 (Bài 1 ➔ 25)
          </button>
          <button
            onClick={() => setActiveTab("N4")}
            className={`px-5 py-2 rounded-2xl font-black text-xs transition-all cursor-pointer ${
              activeTab === "N4" ? "bg-[#C65D4B] text-white shadow-sm" : "bg-white text-[#76685F] border border-[#DED3C8] hover:bg-[#FAF3EB]"
            }`}
          >
            Trình độ N4 (Bài 26 ➔ 50)
          </button>
        </div>

        {/* Lessons Question Bank Cards Grid */}
        {loading ? (
          <div className="text-center py-20 text-[#76685F] font-bold">Đang tải danh sách Kho đề 50 Bài học...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.lessonId}
                className="bg-white border-2 border-[#DED3C8] hover:border-[#C65D4B] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="bg-[#FAF3EB] text-[#C65D4B] font-black text-xs px-3 py-1 rounded-full border border-[#DED3C8]">
                      {item.levelCode} • Bài #{item.lessonId}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-lg border ${
                        item.quizStatus === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : item.quizStatus === "READY"
                          ? "bg-amber-50 text-amber-700 border-amber-300"
                          : "bg-gray-50 text-gray-600 border-gray-300"
                      }`}
                    >
                      {item.quizStatus === "PUBLISHED" ? "🟢 ĐÃ XUẤT BẢN" : item.quizStatus === "READY" ? "🟡 SẴN SÀNG" : "⚪ DRAFT"}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#231917] leading-snug group-hover:text-[#C65D4B] transition-colors">
                    {item.title}
                  </h3>

                  {/* Question Metrics */}
                  <div className="grid grid-cols-3 gap-2 bg-[#FAF3EB]/70 border border-[#DED3C8] p-3 rounded-2xl text-center text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-[#8C7B70] block uppercase">Tổng câu</span>
                      <strong className="text-sm font-extrabold text-[#231917]">{item.totalQuestions}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 block uppercase">Active</span>
                      <strong className="text-sm font-extrabold text-emerald-700">{item.activeQuestions}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 block uppercase">Draft</span>
                      <strong className="text-sm font-extrabold text-amber-700">{item.draftQuestions}</strong>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2 pt-2 border-t border-[#DED3C8]/50">
                  <button
                    type="button"
                    onClick={() => handleAutoGenerate(item.lessonId)}
                    disabled={generatingId === item.lessonId}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{generatingId === item.lessonId ? "Đang sinh câu hỏi..." : "⚡ Sinh đề tự động 1-Click (DRAFT)"}</span>
                  </button>

                  <Link
                    href={`/admin/quizzes/${item.lessonId}`}
                    className="w-full block text-center py-2.5 px-4 bg-[#C65D4B] hover:bg-[#b54f3e] text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Quản lý Kho đề & Biên tập</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
