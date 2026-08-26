"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Layers, Keyboard, FileText, CheckSquare, Sparkles } from "lucide-react";
import Interactive3DFlashcard from "@/components/ui/Interactive3DFlashcard";
import KanjiTypingTrainer from "./KanjiTypingTrainer";
import KanjiReadingSentencesView from "./KanjiReadingSentencesView";
import KanjiQuizTestView from "./KanjiQuizTestView";
import InteractiveStrokeCanvas from "./InteractiveStrokeCanvas";

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
  const [activeTab, setActiveTab] = useState<"CARD" | "STROKE" | "TYPING" | "READING" | "TEST">("CARD");
  const [selectedQuickKanji, setSelectedQuickKanji] = useState<any | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/curriculum/kanji-topics/${topicId}`);
        if (res.ok) {
          const result = await res.json();
          setData(result);
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
      <div className="bg-white rounded-3xl p-8 text-center text-[#76685F] border-2 border-[#E5D7C5]">
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
    <div className="space-y-6 animate-fadeIn">
      {/* Navigation Top Bar & Back Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border-2 border-[#E5D7C5] p-5 rounded-2xl shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#FAF3EB] text-[#C65D4B] px-3.5 py-1 rounded-full text-xs font-black border border-[#DED3C8] shadow-2xs">
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
          className="px-4 py-2.5 bg-[#FAF3EB] hover:bg-[#C65D4B] hover:text-white border-2 border-[#DED3C8] hover:border-[#C65D4B] text-[#8B6F5A] text-xs font-black rounded-xl transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách bài
        </button>
      </div>

      {/* Sub-tabs Navigation inside single lesson */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none bg-[#FAF3EB] border-2 border-[#E5D7C5] p-2.5 rounded-2xl shadow-2xs">
        {[
          { id: "CARD", label: "🎴 Thẻ 3D & Từ Ghép" },
          { id: "STROKE", label: "✏️ Nét Vẽ & Luyện Viết" },
          { id: "TYPING", label: "⌨️ Luyện Gõ Romaji" },
          { id: "READING", label: "📖 Luyện Đọc Câu" },
          { id: "TEST", label: "📝 Bài Test Trắc Nghiệm" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap border cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-md scale-102"
                : "bg-white text-[#8B6F5A] border-[#DED3C8] hover:border-[#C65D4B]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: 🎴 THẺ 3D & CHI TIẾT HÁN TỰ */}
      {activeTab === "CARD" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.items.map((item) => (
              <div
                key={item.kanjiId}
                onClick={() => setSelectedQuickKanji(item)}
                className="bg-white border-2 border-[#DED3C8] hover:border-[#C65D4B] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all space-y-4 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
              >
                <div className="flex justify-between items-start z-10">
                  <span className="bg-[#FAF3EB] text-[#C65D4B] border border-[#DED3C8] text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-2xs">
                    Kanji #{item.displayOrder}
                  </span>
                  <span className="text-xs font-bold text-[#8B6F5A] bg-[#FAF3EB] border border-[#DED3C8] px-2.5 py-1 rounded-full">
                    ✏️ {item.strokeCount} Nét
                  </span>
                </div>

                <div className="text-center py-2 space-y-1 z-10">
                  <h3 className="text-6xl font-sans font-black text-[#C65D4B] group-hover:scale-110 transition-transform inline-block">
                    {item.character}
                  </h3>
                  <p className="text-sm font-black text-[#231917]">
                    Âm Hán Việt: <span className="text-[#C65D4B]">{item.meaningVi}</span>
                  </p>
                </div>

                <div className="space-y-2 text-xs bg-[#FAF7F2] border border-[#DED3C8] p-3.5 rounded-2xl z-10">
                  <div>
                    <strong className="text-[#C65D4B] font-black">Âm Kun (Kunyomi):</strong>{" "}
                    <span className="font-bold text-[#231917]">{item.kunyomi || "—"}</span>
                    {item.kunExamples && <p className="text-[11px] text-[#76685F] mt-0.5 font-medium">🔹 Ví dụ: {item.kunExamples}</p>}
                  </div>

                  <div className="pt-2 border-t border-[#DED3C8]/60">
                    <strong className="text-[#C65D4B] font-black">Âm On (Onyomi):</strong>{" "}
                    <span className="font-bold text-[#231917]">{item.onyomi || "—"}</span>
                    {item.onExamples && <p className="text-[11px] text-[#76685F] mt-0.5 font-medium">🔸 Ví dụ: {item.onExamples}</p>}
                  </div>
                </div>

                <div className="text-center text-[11px] font-extrabold text-[#C65D4B] pt-1 z-10">
                  Bấm để xem phóng to 🔍
                </div>
              </div>
            ))}
          </div>
        </div>
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
        <KanjiReadingSentencesView topicTitle={data.topic.title} exercises={data.readingExercises} />
      )}

      {/* TAB 5: 📝 BÀI TEST TRẮC NGHIỆM (テスト) */}
      {activeTab === "TEST" && (
        <KanjiQuizTestView topicTitle={data.topic.title} tests={data.quizTests} />
      )}
    </div>
  );
}
