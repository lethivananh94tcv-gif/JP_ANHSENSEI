"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Layers, Keyboard, FileText, CheckSquare, Sparkles, Gamepad2, PenTool, Flame, Trophy } from "lucide-react";
import Interactive3DFlashcard from "@/components/ui/Interactive3DFlashcard";
import KanjiTypingTrainer from "./KanjiTypingTrainer";
import KanjiReadingSentencesView from "./KanjiReadingSentencesView";
import KanjiQuizTestView from "./KanjiQuizTestView";
import InteractiveStrokeCanvas from "./InteractiveStrokeCanvas";
import KanjiMatchGame3D from "./KanjiMatchGame3D";
import KanjiQuickModal, { QuickKanjiInfo } from "./KanjiQuickModal";
import { getKanjiDetails } from "@/lib/utils/kanjiDetailData";
import { playJapaneseTTS } from "@/lib/utils/japaneseAudioTTS";
import { Volume2, Eye } from "lucide-react";

import { apiClient } from "@/lib/api/client";

export interface KanjiTopicItemDto {
  kanjiId: number;
  character: string;
  onyomi: string;
  kunyomi: string;
  meaningVi: string;
  strokeCount: number;
  radical: string;
  displayOrder: number;
  kunExamples: string;
  onExamples: string;
  acceptedRomaji: string;
}

export interface KanjiExerciseDto {
  exerciseId: number;
  topicId: number;
  exerciseType: string;
  sentenceJp: string;
  targetKanji: string;
  readingHiragana: string;
  meaningVi?: string;
  optionsJson: string;
  correctOption: number;
  displayOrder: number;
}

export interface KanjiTopicDetailDto {
  topic: {
    topicId: number;
    title: string;
    jlptLevel: string;
    topicOrder: number;
    description: string;
  };
  items: KanjiTopicItemDto[];
  readingExercises: KanjiExerciseDto[];
  quizTests: KanjiExerciseDto[];
}

interface KanjiLessonDetailViewProps {
  topicId: number;
  onBack: () => void;
}

export default function KanjiLessonDetailView({ topicId, onBack }: KanjiLessonDetailViewProps) {
  const [data, setData] = useState<KanjiTopicDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"CARD" | "STROKE" | "TYPING" | "READING" | "TEST" | "GAME">("CARD");
  const [selectedKanjiModal, setSelectedKanjiModal] = useState<QuickKanjiInfo | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await apiClient<KanjiTopicDetailDto>(`/curriculum/kanji-topics/${topicId}`);
        if (res && res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Lỗi tải chi tiết bài Kanji:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [topicId]);

  if (loading) {
    return <div className="text-center py-20 text-[#76685F] font-bold">Đang tải chi tiết bài Hán tự...</div>;
  }

  if (!data) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center text-[#76685F] border border-[#DED3C8]">
        Không tìm thấy thông tin bài học này.
      </div>
    );
  }

  let cleanDetailTitle = data.topic.description || data.topic.title;
  const match = cleanDetailTitle.match(/\(([^)]+)\)/);
  let detailChars: string[] = [];
  if (match) {
    detailChars = match[1].split(/[,、\s]+/).filter(Boolean);
    cleanDetailTitle = cleanDetailTitle.replace(/\([^)]+\)/, "").trim();
  }
  cleanDetailTitle = cleanDetailTitle.replace(/^Chữ Hán N\d\s*#\d+:\s*/i, "").trim();
  if (!cleanDetailTitle) cleanDetailTitle = data.topic.title;

  return (
    <div className="space-y-6">
      {/* Navigation Top Bar & Back Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#DED3C8] p-5 rounded-2xl shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#FAF3EB] text-[#C65D4B] px-3 py-1 rounded-full text-xs font-black border border-[#DED3C8]">
              TRÌNH ĐỘ {data.topic.jlptLevel} • {data.topic.title}
            </span>
            {data.items.length > 0 && (
              <span className="bg-[#FAF3EB] text-[#8B6F5A] px-3 py-1 rounded-full text-xs font-bold border border-[#DED3C8]">
                {data.items.length} Chữ Hán
              </span>
            )}
          </div>
          <h2 className="text-2xl font-black text-[#231917] mt-2">{cleanDetailTitle}</h2>
        </div>

        <button
          onClick={onBack}
          className="px-4 py-2.5 bg-[#FAF3EB] hover:bg-[#C65D4B] hover:text-white border border-[#DED3C8] text-[#8B6F5A] text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách bài
        </button>
      </div>

      {/* 🌟 PROMINENT KANJI PRACTICE MODES CONTAINER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#FAF4ED] to-[#F5EFE6] border-2 border-[#E5D7C7] rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(74,52,38,0.08)] space-y-4">
        {/* Subtle decorative background pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-[radial-gradient(#C65D4B_1.2px,transparent_1.2px)] [background-size:14px_14px] opacity-10 pointer-events-none rounded-r-3xl" />

        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5D7C7]/70 pb-3.5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#C65D4B] to-[#E06A57] text-white shadow-md flex items-center justify-center border border-white/40 shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-[#231917] tracking-tight">
                  CHẾ ĐỘ LUYỆN TẬP & THỰC HÀNH KANJI
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-black text-[#C65D4B] bg-[#C65D4B]/10 px-2.5 py-0.5 rounded-full border border-[#C65D4B]/20">
                  <Flame className="w-3.5 h-3.5 text-[#C65D4B]" /> 6 Chế độ tương tác
                </span>
              </div>
              <p className="text-xs text-[#76685F] font-semibold mt-0.5">
                Chọn một phương pháp bên dưới để bắt đầu luyện viết nét, gõ Romaji, đọc câu, kiểm tra trắc nghiệm hoặc chơi Game 3D!
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#8B6F5A] bg-[#FFFDF9] border border-[#E5D7C7] px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-500" /> Hoàn thành bài tập nhận +50 XP
            </span>
          </div>
        </div>

        {/* Sub-tabs Grid Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 relative z-10">
          {[
            {
              id: "CARD",
              label: "Thẻ 3D & Từ Ghép",
              badge: "Lật thẻ",
              icon: Layers,
              emoji: "🎴",
              desc: "Tra cứu & 3D Flashcard",
            },
            {
              id: "STROKE",
              label: "Nét Vẽ & Luyện Viết",
              badge: "Viết Hán tự",
              icon: PenTool,
              emoji: "✏️",
              desc: "Luyện vẽ đúng thứ tự nét",
            },
            {
              id: "TYPING",
              label: "Luyện Gõ Romaji",
              badge: "Phản xạ",
              icon: Keyboard,
              emoji: "⌨️",
              desc: "Gõ Romaji / Kana nhanh",
            },
            {
              id: "READING",
              label: "Luyện Đọc Câu",
              badge: "Đọc hiểu",
              icon: BookOpen,
              emoji: "📖",
              desc: "Đọc Kanji trong ngữ cảnh",
            },
            {
              id: "TEST",
              label: "Bài Test Trắc Nghiệm",
              badge: "Kiểm tra",
              icon: CheckSquare,
              emoji: "📝",
              desc: "Chấm điểm & Đáp án",
            },
            {
              id: "GAME",
              label: "Game Ghép Thẻ 3D",
              badge: "HOT +50XP",
              icon: Gamepad2,
              emoji: "🎮",
              desc: "Ghép cặp thẻ Hán tự 3D",
              isHot: true,
            },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`group relative flex flex-col items-center justify-between p-3 rounded-2xl transition-all duration-200 cursor-pointer text-center border min-h-[92px] ${
                  isActive
                    ? "bg-gradient-to-b from-[#C65D4B] to-[#B04C3B] text-white border-[#C65D4B] shadow-lg shadow-[#C65D4B]/25 scale-[1.02] ring-2 ring-[#C65D4B]/30"
                    : "bg-[#FFFDF9] hover:bg-white text-[#231917] border-[#E5D7C7] hover:border-[#C65D4B]/60 hover:shadow-md"
                }`}
              >
                {/* Hot Badge */}
                {tab.isHot && !isActive && (
                  <span className="absolute -top-2 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs animate-bounce">
                    HOT
                  </span>
                )}

                <div className="flex items-center gap-1.5 w-full justify-center">
                  <span className="text-base">{tab.emoji}</span>
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#FAF3EB] text-[#C65D4B] group-hover:bg-[#C65D4B]/10"
                    }`}
                  >
                    {tab.badge}
                  </span>
                </div>

                <div className="my-1">
                  <span
                    className={`text-xs font-black leading-tight block ${
                      isActive ? "text-white" : "text-[#231917] group-hover:text-[#C65D4B]"
                    }`}
                  >
                    {tab.label}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-medium truncate max-w-full block ${
                    isActive ? "text-white/80" : "text-[#76685F]"
                  }`}
                >
                  {tab.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: 🎴 THẺ 3D & CHI TIẾT HÁN TỰ */}
      {activeTab === "CARD" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.items.map((item) => {
              const details = getKanjiDetails({
                character: item.character,
                displayOrder: item.displayOrder,
                sinoVi: item.meaningVi,
                meaningVi: item.meaningVi,
                kunyomi: item.kunyomi,
                onyomi: item.onyomi,
                strokeCount: item.strokeCount,
                radical: item.radical,
                kunExamples: item.kunExamples,
                onExamples: item.onExamples,
              });

              const quickInfo: QuickKanjiInfo = {
                character: item.character,
                displayOrder: item.displayOrder,
                sinoVi: details.sinoVi,
                kunyomi: item.kunyomi,
                onyomi: item.onyomi,
                strokeCount: item.strokeCount,
                radical: item.radical,
                meaningVi: details.meaningVi,
                kunExamples: item.kunExamples,
                onExamples: item.onExamples,
              };

              return (
                <div
                  key={item.kanjiId}
                  onClick={() => setSelectedKanjiModal(quickInfo)}
                  className="bg-[#FFFDF9] border border-[#DED3C8] hover:border-[#C65D4B] rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <span className="bg-[#FAF3EB] text-[#C65D4B] border border-[#DED3C8] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      KANJI #{item.displayOrder || item.kanjiId}
                    </span>
                    <span className="text-xs font-bold text-[#8B6F5A]">✏️ {item.strokeCount} Nét</span>
                  </div>

                  <div className="text-center py-2 space-y-1">
                    <h3 className="text-6xl font-jp font-black text-[#C65D4B] group-hover:scale-105 transition-transform">
                      {item.character}
                    </h3>
                    <p className="text-sm font-black text-[#231917]">
                      Âm Hán Việt: <span className="text-[#C65D4B]">{item.meaningVi}</span>
                    </p>
                  </div>

                  <div className="space-y-2 text-xs bg-[#FAF3EB] border border-[#DED3C8] p-3 rounded-2xl">
                    <div>
                      <strong className="text-[#C65D4B]">Âm Kun (Kunyomi):</strong> {item.kunyomi || "—"}
                      {item.kunExamples && (
                        <p className="text-[11px] text-[#76685F] mt-0.5">🔹 Ví dụ: {item.kunExamples}</p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#DED3C8]/60">
                      <strong className="text-[#C65D4B]">Âm On (Onyomi):</strong> {item.onyomi || "—"}
                      {item.onExamples && (
                        <p className="text-[11px] text-[#76685F] mt-0.5">🔸 Ví dụ: {item.onExamples}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* QUICK KANJI MODAL OVERLAY */}
      {selectedKanjiModal && (
        <KanjiQuickModal
          kanji={selectedKanjiModal}
          onClose={() => setSelectedKanjiModal(null)}
        />
      )}

      {/* TAB 2: ✏️ STROKE ORDER & LUYỆN VIẾT */}
      {activeTab === "STROKE" && (
        <InteractiveStrokeCanvas items={data.items} />
      )}

      {/* TAB 3: ⌨️ LUYỆN GÕ ROMAJI */}
      {activeTab === "TYPING" && (
        <KanjiTypingTrainer topicId={data.topic.topicId} topicTitle={data.topic.title} items={data.items} />
      )}

      {/* TAB 4: 📖 LUYỆN ĐỌC CÂU (漢字を読みましょう!) */}
      {activeTab === "READING" && (
        <KanjiReadingSentencesView topicTitle={data.topic.title} exercises={data.readingExercises} items={data.items} />
      )}

      {/* TAB 5: 📝 BÀI TEST TRẮC NGHIỆM (テスト) */}
      {activeTab === "TEST" && (
        <KanjiQuizTestView topicTitle={data.topic.title} tests={data.quizTests} items={data.items} />
      )}

      {/* TAB 6: 🎮 GAME GHÉP THẺ 3D KANJI */}
      {activeTab === "GAME" && (
        <KanjiMatchGame3D items={data.items} />
      )}
    </div>
  );
}
