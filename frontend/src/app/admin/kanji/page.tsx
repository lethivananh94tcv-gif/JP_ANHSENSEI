"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, PenTool, Layers, Keyboard, Gamepad2, ArrowRight, Zap, RefreshCw, BookOpen, CheckCircle2 } from "lucide-react";

interface KanjiLessonItem {
  lessonId: number;
  sortOrder: number;
  title: string;
  levelCode: string;
  totalKanji: number;
  totalReadingSentences: number;
  totalQuizQuestions: number;
  status: "PUBLISHED" | "DRAFT";
}

export default function AdminKanjiPage() {
  const [lessons, setLessons] = useState<KanjiLessonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ALL" | "N5" | "N4">("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchKanjiLessons = async () => {
    try {
      setLoading(true);
      const list: KanjiLessonItem[] = Array.from({ length: 50 }, (_, idx) => {
        const i = idx + 1;
        const isN4 = i > 25;
        const sOrder = isN4 ? i - 25 : i;
        const lvl = isN4 ? "N4" : "N5";
        return {
          lessonId: i,
          sortOrder: sOrder,
          title: isN4 ? `Bài ${i}: Chuyên đề Hán Tự N4 Bài #${sOrder}` : `Bài ${i}: Chuyên đề Hán Tự N5 Bài #${sOrder}`,
          levelCode: lvl,
          totalKanji: 20,
          totalReadingSentences: 15,
          totalQuizQuestions: 30,
          status: "PUBLISHED" as const,
        };
      });
      setLessons(list);
    } catch (e) {
      console.error("Lỗi tải danh sách bài học Kanji:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKanjiLessons();
  }, []);

  const handleAutoGenerateKanji = (lessonId: number) => {
    setToastMessage(`⚡ Đã tự động sinh 20 Chữ Kanji, Bài tập Đọc câu & Quiz Hán Tự cho Bài #${lessonId}!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filtered = lessons.filter((l) => {
    if (activeTab === "N5") return l.levelCode === "N5";
    if (activeTab === "N4") return l.levelCode === "N4";
    return true;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner - Dark Charcoal Theme */}
      <div className="bg-gradient-to-r from-[#2C2421] via-[#3E322D] to-[#2C2421] border-2 border-[#4E3F39] p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="space-y-2.5 z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#EADECF] font-black text-[11px] border border-white/15 backdrop-blur-md">
            <PenTool className="w-3.5 h-3.5 text-amber-400" />
            <span>✍️ HỆ THỐNG QUẢN LÝ HÁN TỰ KANJI DÀNH RIÊNG CHO ADMIN</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-normal">
            Quản Lý Chuyên Đề & Luyện Tập Hán Tự
          </h1>
          <p className="text-xs sm:text-sm text-[#D9CEB2] font-medium leading-relaxed">
            Quản lý độc lập từng chuyên đề Kanji: Chữ Hán, Âm Onyomi, Kunyomi, Âm Hán Việt, Canvas vẽ nét 3D, Gõ Hiragana, Luyện đọc câu ngữ cảnh & Arcade Game 3D Kanji.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 z-10">
          <Link
            href="/admin/import"
            className="px-5 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>📥 Import Excel Hán Tự</span>
          </Link>
        </div>
      </div>

      {/* ✍️ HDSD CHI TIẾT BÀI TẬP HÁN TỰ */}
      <div className="bg-gradient-to-r from-amber-50 via-[#FFFDF9] to-amber-50/50 border-2 border-amber-200 rounded-3xl p-6 shadow-2xs space-y-3">
        <div className="flex items-center gap-2.5 border-b border-amber-200/80 pb-3">
          <div className="w-9 h-9 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
            ✍️
          </div>
          <div>
            <h4 className="text-base font-black text-[#231917]">HƯỚNG DẪN QUẢN LÝ HÁN TỰ KANJI & DẠNG BÀI LUYỆN TẬP</h4>
            <p className="text-xs text-[#76685F] font-medium">
              Chữ Kanji nhập ở đây sẽ tự động phân nạp sang 5 dạng luyện tập tương ứng bên phía Học viên:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="bg-white border border-amber-200 p-3.5 rounded-2xl space-y-1">
            <span className="font-black text-amber-800 flex items-center gap-1">
              <PenTool className="w-3.5 h-3.5" /> 1. Canvas Vẽ Nét 3D
            </span>
            <p className="text-[11px] text-[#76685F]">Luyện vẽ Hán tự trên Canvas interactive, kiểm tra đúng thứ tự nét & `strokeCount`.</p>
          </div>

          <div className="bg-white border border-amber-200 p-3.5 rounded-2xl space-y-1">
            <span className="font-black text-amber-800 flex items-center gap-1">
              <Keyboard className="w-3.5 h-3.5" /> 2. Gõ Hiragana Kanji
            </span>
            <p className="text-[11px] text-[#76685F]">Nhập âm Hiragana / Romaji phản xạ. Hệ thống tự động chấm theo `validAnswers`.</p>
          </div>

          <div className="bg-white border border-amber-200 p-3.5 rounded-2xl space-y-1">
            <span className="font-black text-amber-800 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> 3. Luyện Đọc Câu
            </span>
            <p className="text-[11px] text-[#76685F]">Đọc chữ Kanji ghép trong câu thực tế (Reading exercises). Chọn cách đọc đúng.</p>
          </div>

          <div className="bg-white border border-amber-200 p-3.5 rounded-2xl space-y-1">
            <span className="font-black text-amber-800 flex items-center gap-1">
              <Gamepad2 className="w-3.5 h-3.5" /> 4. Arcade Game 3D
            </span>
            <p className="text-[11px] text-[#76685F]">Game ghép thẻ Hán tự với Âm Hán Việt trong Chế độ Đêm Toàn Màn Hình.</p>
          </div>

          <div className="bg-white border border-amber-200 p-3.5 rounded-2xl space-y-1">
            <span className="font-black text-amber-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 5. Quiz Hán Tự
            </span>
            <p className="text-[11px] text-[#76685F]">Trắc nghiệm Âm Hán Việt, Onyomi, Kunyomi chuẩn đề JLPT.</p>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
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
          {["ALL", "N5", "N4"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-[#76685F] hover:text-[#231917] hover:bg-[#FAF5F0]"
              }`}
            >
              {tab === "ALL" ? `Tất cả 50 Bài (${lessons.length})` : tab === "N5" ? "Trình độ N5 (Bài 1 ➔ 25)" : "Trình độ N4 (Bài 26 ➔ 50)"}
            </button>
          ))}
        </div>

        <span className="text-xs font-bold text-[#8C7B70] px-3">
          Đang hiển thị {filtered.length} chuyên đề Hán tự
        </span>
      </div>

      {/* Lesson Cards Grid */}
      {loading ? (
        <div className="text-center py-20 text-[#76685F] font-bold">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-amber-600" />
          Đang tải danh sách Chuyên đề Hán Tự...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.lessonId}
              className="bg-white border-2 border-[#EADECF] hover:border-amber-600 rounded-3xl p-6 shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="bg-amber-50 text-amber-800 font-black text-xs px-3.5 py-1 rounded-full border border-amber-200">
                    {item.levelCode} • Chuyên đề Kanji #{item.lessonId}
                  </span>
                  <span className="text-[10px] font-black bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full">
                    🟢 ĐÃ XUẤT BẢN
                  </span>
                </div>

                <h3 className="text-base font-sans font-black text-[#231917] leading-snug group-hover:text-amber-700 transition-colors">
                  {item.title}
                </h3>

                <div className="grid grid-cols-3 gap-2 bg-[#FAF7F2] border border-[#EADECF] p-3 rounded-2xl text-center text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-[#8C7B70] block uppercase">Chữ Hán</span>
                    <strong className="text-base font-black text-amber-700">{item.totalKanji} Kanji</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#8C7B70] block uppercase">Đọc Câu</span>
                    <strong className="text-base font-black text-[#231917]">{item.totalReadingSentences} Câu</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 block uppercase">Quiz Kanji</span>
                    <strong className="text-base font-black text-emerald-800">{item.totalQuizQuestions} Câu</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#EADECF]/60">
                <Link
                  href={`/admin/kanji/${item.lessonId}`}
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 text-white font-black text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                >
                  <span>Biên Tập Kanji Bài #{item.lessonId}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleAutoGenerateKanji(item.lessonId)}
                  className="w-full py-2.5 px-4 bg-[#FAF5F0] hover:bg-[#FAF3EB] border border-[#EADECF] text-[#76685F] hover:text-amber-700 font-extrabold text-xs rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>⚡ Tự Động Sinh 20 Kanji & Quiz</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
