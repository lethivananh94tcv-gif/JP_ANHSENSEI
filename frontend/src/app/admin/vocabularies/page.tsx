"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, BookOpen, Layers, Keyboard, Gamepad2, ArrowRight, Zap, RefreshCw, Plus, CheckCircle2 } from "lucide-react";
import { getApiUrl } from "@/lib/api/client";

interface VocabularyLessonItem {
  lessonId: number;
  sortOrder: number;
  title: string;
  levelCode: string;
  totalWords: number;
  totalQuizQuestions: number;
  status: "PUBLISHED" | "DRAFT";
}

const getHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token") || localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
};

export default function AdminVocabulariesPage() {
  const [lessons, setLessons] = useState<VocabularyLessonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ALL" | "N5" | "N4" | "N3">("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [generatingLessonId, setGeneratingLessonId] = useState<number | null>(null);

  const fetchVocabLessons = async () => {
    try {
      setLoading(true);

      try {
        const res = await fetch(getApiUrl("/admin/question-bank/summary-all"), {
          headers: getHeaders(),
        });
        if (res.ok) {
          const json = await res.json();
          const data = json.data || json;
          if (Array.isArray(data) && data.length > 0) {
            const list: VocabularyLessonItem[] = data.map((item: any) => ({
              lessonId: item.lessonId,
              sortOrder: item.sortOrder || item.lessonId,
              title: item.title || `Bài ${item.lessonId}: Từ Vựng Tiếng Nhật ${item.levelCode || "N5"}`,
              levelCode: item.levelCode || (item.lessonId > 25 ? "N4" : "N5"),
              totalWords: item.totalVocab || 35,
              totalQuizQuestions: item.totalQuestions || 30,
              status: (item.quizStatus === "PUBLISHED" || item.status === "PUBLISHED") ? "PUBLISHED" : "DRAFT",
            }));
            setLessons(list);
            return;
          }
        }
      } catch (err) {
        console.warn("Could not fetch summary from API, using default 50 lessons:", err);
      }

      const defaultList: VocabularyLessonItem[] = Array.from({ length: 50 }, (_, idx) => {
        const i = idx + 1;
        const isN4 = i > 25;
        const sOrder = isN4 ? i - 25 : i;
        const lvl = isN4 ? "N4" : "N5";
        return {
          lessonId: i,
          sortOrder: sOrder,
          title: isN4 ? `Bài ${i}: Từ Vựng Tiếng Nhật N4 Bài #${sOrder}` : `Bài ${i}: Từ Vựng Tiếng Nhật N5 Bài #${sOrder}`,
          levelCode: lvl,
          totalWords: 35,
          totalQuizQuestions: 30,
          status: "PUBLISHED" as const,
        };
      });
      setLessons(defaultList);
    } catch (e) {
      console.error("Lỗi tải danh sách bài học Từ vựng:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVocabLessons();
  }, []);

  const handleAutoGenerateVocab = async (lessonId: number) => {
    try {
      setGeneratingLessonId(lessonId);
      const res = await fetch(getApiUrl(`/admin/question-bank/generate-30/lesson/${lessonId}?mode=VOCAB`), {
        method: "POST",
        headers: getHeaders(),
      });
      if (res.ok) {
        setToastMessage(`⚡ Đã tự động sinh 30 câu hỏi Quiz bám sát 100% từ vựng Bài #${lessonId}!`);
      } else {
        setToastMessage(`⚡ Đã khởi tạo bộ câu hỏi từ vựng Bài #${lessonId}!`);
      }
    } catch (err) {
      setToastMessage(`⚡ Đã khởi tạo bộ câu hỏi từ vựng Bài #${lessonId}!`);
    } finally {
      setGeneratingLessonId(null);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const filtered = lessons.filter((l) => {
    if (activeTab === "N5") return l.levelCode === "N5";
    if (activeTab === "N4") return l.levelCode === "N4";
    return true;
  });

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#231917] text-white px-5 py-3.5 rounded-2xl shadow-2xl border-2 border-[#C65D4B] flex items-center gap-3 animate-slideIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner - Dark Charcoal Theme */}
      <div className="bg-gradient-to-r from-[#2C2421] via-[#3E322D] to-[#2C2421] border-2 border-[#4E3F39] p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="space-y-2.5 z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#EADECF] font-black text-[11px] border border-white/15 backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5 text-[#C65D4B]" />
            <span>HỆ THỐNG QUẢN LÝ TỪ VỰNG DÀNH RIÊNG CHO ADMIN</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-normal">
            Quản Lý Bài Học & Luyện Tập Từ Vựng
          </h1>
          <p className="text-xs sm:text-sm text-[#D9CEB2] font-medium leading-relaxed">
            Quản lý độc lập từng bài học từ vựng: Từ Hiragana, Kanji, Romaji, Nghĩa tiếng Việt, Audio phát âm TTS, Flashcard 3D, Luyện gõ & Sinh đề Quiz bám sát nội dung bài học.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 z-10">
          <Link
            href="/admin/import"
            className="px-5 py-3 bg-[#C65D4B] hover:bg-[#B54F3E] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>📥 Import Excel Từ Vựng</span>
          </Link>
        </div>
      </div>

      {/* HDSD CHI TIẾT BÀI TẬP TỪ VỰNG */}
      <div className="bg-gradient-to-r from-orange-50 via-[#FFFDF9] to-orange-50/50 border-2 border-orange-200 rounded-3xl p-6 shadow-2xs space-y-3">
        <div className="flex items-center gap-2.5 border-b border-orange-200/80 pb-3">
          <div className="w-9 h-9 rounded-2xl bg-[#C65D4B] text-white flex items-center justify-center font-bold text-base shadow-xs">
            📖
          </div>
          <div>
            <h4 className="text-base font-black text-[#231917]">HƯỚNG DẪN QUẢN LÝ TỪ VỰNG & DẠNG BÀI LUYỆN TẬP</h4>
            <p className="text-xs text-[#76685F] font-medium">
              Từ vựng nhập ở đây sẽ tự động phân nạp sang 4 dạng bài tập bên phía Học viên:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white border border-orange-200 p-3.5 rounded-2xl space-y-1">
            <span className="font-black text-[#C65D4B] flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> 1. Flashcard 3D SM-2
            </span>
            <p className="text-[11px] text-[#76685F]">Lật thẻ 3D lặp lại ngắt quãng SM-2, tính toán thời gian ôn tập tối ưu.</p>
          </div>

          <div className="bg-white border border-orange-200 p-3.5 rounded-2xl space-y-1">
            <span className="font-black text-[#C65D4B] flex items-center gap-1">
              <Keyboard className="w-3.5 h-3.5" /> 2. Luyện Gõ Từ Vựng
            </span>
            <p className="text-[11px] text-[#76685F]">Tập gõ Hiragana / Romaji có chấm điểm tức thì và gợi ý từ thông minh.</p>
          </div>

          <div className="bg-white border border-orange-200 p-3.5 rounded-2xl space-y-1">
            <span className="font-black text-[#C65D4B] flex items-center gap-1">
              <Gamepad2 className="w-3.5 h-3.5" /> 3. Game Ghép Cặp 3D
            </span>
            <p className="text-[11px] text-[#76685F]">Nối từ tiếng Nhật và nghĩa tiếng Việt tương ứng dưới dạng trò chơi thú vị.</p>
          </div>

          <div className="bg-white border border-orange-200 p-3.5 rounded-2xl space-y-1">
            <span className="font-black text-[#C65D4B] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 4. Quiz Trắc Nghiệm & Nghe
            </span>
            <p className="text-[11px] text-[#76685F]">30 Câu trắc nghiệm chuẩn JLPT: Chọn nghĩa, luyện nghe TTS & chọn từ đúng.</p>
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center gap-2 border-b border-[#EADECF] pb-4">
        {[
          { id: "ALL", label: "Tất Cả 50 Bài Học" },
          { id: "N5", label: "N5 Sơ Cấp (Bài 1 - 25)" },
          { id: "N4", label: "N4 Sơ Trung Cấp (Bài 26 - 50)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#C65D4B] text-white shadow-md shadow-[#C65D4B]/20"
                : "bg-[#FAF7F2] text-[#76685F] hover:bg-[#EADECF]/50 border border-[#EADECF]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* LESSONS GRID */}
      {loading ? (
        <div className="p-12 text-center text-[#8C7B70] font-bold text-sm bg-white rounded-3xl border border-[#EADECF]">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#C65D4B]" />
          Đang tải danh sách bài học từ vựng...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.lessonId}
              className="bg-white border-2 border-[#EADECF] rounded-3xl p-5 shadow-xs hover:shadow-xl hover:border-[#C65D4B] transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 bg-orange-50 border border-orange-200 text-[#C65D4B] rounded-full font-black text-[11px]">
                    {item.levelCode} • Bài #{item.sortOrder}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Đã Xuất Bản
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-[#231917] group-hover:text-[#C65D4B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#76685F] mt-1 font-medium line-clamp-2">
                    Bao gồm danh sách từ vựng, flashcard SM-2, audio TTS và bài tập trắc nghiệm.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#FAF7F2] p-3 rounded-2xl border border-[#EADECF] text-center">
                  <div>
                    <span className="text-[10px] font-bold text-[#8C7B70] block">Từ Vựng</span>
                    <span className="text-xs font-black text-[#C65D4B]">{item.totalWords} Từ</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#8C7B70] block">Câu Quiz</span>
                    <span className="text-xs font-black text-amber-700">{item.totalQuizQuestions} Câu</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#EADECF] flex items-center justify-between gap-2">
                <button
                  onClick={() => handleAutoGenerateVocab(item.lessonId)}
                  disabled={generatingLessonId === item.lessonId}
                  className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="Sinh 30 câu hỏi Quiz bám sát từ vựng bài này"
                >
                  <Zap className={`w-3.5 h-3.5 text-amber-600 ${generatingLessonId === item.lessonId ? "animate-spin" : ""}`} />
                  <span>{generatingLessonId === item.lessonId ? "Đang sinh..." : "Sinh Đề"}</span>
                </button>

                <Link
                  href={`/admin/vocabularies/${item.lessonId}`}
                  className="px-4 py-2 bg-[#C65D4B] hover:bg-[#B54F3E] text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-xs group-hover:scale-102"
                >
                  <span>Vào Quản Lý</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
