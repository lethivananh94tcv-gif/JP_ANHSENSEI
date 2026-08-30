"use client";

import { useState, useEffect, useMemo } from "react";
import { X, Sparkles, RefreshCw, CheckCircle, BookOpen, Volume2 } from "lucide-react";
import GrammarLearningItem, { GrammarPointDto } from "@/components/learner/lesson/GrammarLearningItem";
import JapaneseFuriganaText from "@/components/learner/JapaneseFuriganaText";
import { apiClient } from "@/lib/api/client";

interface GrammarStudyModalProps {
  isOpen: boolean;
  lessonNum: number;
  levelCode: string;
  lessonTitle: string;
  onClose: () => void;
}

export default function GrammarStudyModal({
  isOpen,
  lessonNum,
  levelCode,
  lessonTitle,
  onClose,
}: GrammarStudyModalProps) {
  const [grammars, setGrammars] = useState<GrammarPointDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [learnedKeys, setLearnedKeys] = useState<Set<string>>(new Set());

  // Ema Sentence Builder Game State
  const defaultBlocks = useMemo(() => ["私（わたし）は", "たなか", "です。"], []);
  const defaultMeaning = "Tôi là Tanaka.";

  const [targetBlocks, setTargetBlocks] = useState<string[]>(defaultBlocks);
  const [targetMeaning, setTargetMeaning] = useState<string>(defaultMeaning);
  const [builderWordBlocks, setBuilderWordBlocks] = useState<string[]>([]);
  const [userOrderedBlocks, setUserOrderedBlocks] = useState<string[]>([]);
  const [builderStatus, setBuilderStatus] = useState<"IDLE" | "CORRECT" | "WRONG">("IDLE");

  useEffect(() => {
    if (isOpen && lessonNum) {
      const fetchGrammar = async () => {
        try {
          setLoading(true);
          const res = await apiClient<any>(`/curriculum/lessons/${lessonNum}/grammar`);
          const list = Array.isArray(res) ? res : (res.data || []);
          setGrammars(list);

          let blocks = defaultBlocks;
          let meaning = defaultMeaning;

          if (list.length > 0 && list[0].examples && list[0].examples.length > 0) {
            const ex = list[0].examples[0];
            const tokens = ex.japaneseText.split(/\s+/).filter(Boolean);
            if (tokens.length >= 2) {
              blocks = tokens;
              meaning = ex.meaningVi;
            }
          }

          setTargetBlocks(blocks);
          setBuilderWordBlocks([...blocks].sort(() => Math.random() - 0.5));
          setTargetMeaning(meaning);
          setUserOrderedBlocks([]);
          setBuilderStatus("IDLE");
        } catch (e) {
          console.error("Lỗi tải dữ liệu bài học:", e);
        } finally {
          setLoading(false);
        }
      };

      fetchGrammar();
    }
  }, [isOpen, lessonNum, defaultBlocks]);

  if (!isOpen) return null;

  const handleSelectBlock = (block: string, idx: number) => {
    setUserOrderedBlocks((prev) => [...prev, block]);
    setBuilderWordBlocks((prev) => prev.filter((_, i) => i !== idx));
    setBuilderStatus("IDLE");
  };

  const handleRemoveBlock = (block: string, idx: number) => {
    setBuilderWordBlocks((prev) => [...prev, block]);
    setUserOrderedBlocks((prev) => prev.filter((_, i) => i !== idx));
    setBuilderStatus("IDLE");
  };

  const handleCheckBuilder = () => {
    const isCorrect = userOrderedBlocks.join("") === targetBlocks.join("");
    setBuilderStatus(isCorrect ? "CORRECT" : "WRONG");
  };

  const resetGame = () => {
    setBuilderWordBlocks([...targetBlocks].sort(() => Math.random() - 0.5));
    setUserOrderedBlocks([]);
    setBuilderStatus("IDLE");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2B211D]/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-[#F7F1E8] border-2 border-[#E7D9CC] w-full max-w-4xl rounded-[24px] shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-[#FFFDF9] border-b border-[#E7D9CC] p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-[#D85C4C] text-white font-serif font-black text-sm flex items-center justify-center shadow-xs">
              {lessonNum}
            </span>
            <div>
              <span className="text-[10px] font-extrabold text-[#D85C4C] uppercase tracking-wider">
                Bài #{lessonNum} ({levelCode})
              </span>
              <h2 className="text-base sm:text-xl font-serif font-black text-[#2B211D]">
                {lessonTitle}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#F8EEE5] hover:bg-[#D85C4C] text-[#766A61] hover:text-white border border-[#E7D9CC] transition-all flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Ema Wooden Tablet Game */}
          <div className="relative bg-[#FFFDF9] border-2 border-[#D85C4C]/40 rounded-[20px] p-5 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7D9CC] pb-3 gap-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#D85C4C] text-white text-xs font-black px-3 py-1 rounded-xl shadow-xs tracking-wider uppercase">
                  絵馬 🎮 Game Luyện Ghép Câu Ema
                </span>
              </div>
              <button
                type="button"
                onClick={resetGame}
                className="text-xs text-[#766A61] hover:text-[#D85C4C] flex items-center gap-1 font-bold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Xếp lại</span>
              </button>
            </div>

            {/* Target Meaning */}
            <div className="bg-[#F8EEE5] p-3 rounded-xl border border-[#E7D9CC] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D85C4C]" />
              <p className="text-xs sm:text-sm font-bold text-[#2B211D]">
                Nhiệm vụ xếp câu có nghĩa: <span className="text-[#D85C4C]">"{targetMeaning}"</span>
              </p>
            </div>

            {/* Answer Slot Box */}
            <div className="min-h-[64px] bg-[#F8EEE5] border-2 border-dashed border-[#D85C4C]/40 rounded-xl p-3 flex flex-wrap items-center gap-2.5">
              {userOrderedBlocks.length === 0 ? (
                <span className="text-xs text-[#766A61] italic">Chạm các thẻ từ gỗ Ema bên dưới để xếp câu...</span>
              ) : (
                userOrderedBlocks.map((block, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRemoveBlock(block, idx)}
                    className="bg-[#D85C4C] hover:bg-[#C94F40] text-white text-xs font-serif font-black px-3.5 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <JapaneseFuriganaText text={block} />
                    <span className="ml-1.5 text-[10px] opacity-80">✕</span>
                  </button>
                ))
              )}
            </div>

            {/* Pool Word Blocks */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {builderWordBlocks.map((block, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectBlock(block, idx)}
                  className="bg-[#FFFDF9] hover:bg-[#F8EEE5] border border-[#E7D9CC] hover:border-[#D85C4C] text-[#2B211D] font-serif font-bold text-xs px-3.5 py-2 rounded-xl shadow-2xs transition-all cursor-pointer"
                >
                  + <JapaneseFuriganaText text={block} />
                </button>
              ))}
            </div>

            {/* Game Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E7D9CC]/60">
              {builderStatus === "CORRECT" && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>🎉 Chính xác! Đáp án: {targetBlocks.join(" ")}</span>
                </span>
              )}
              {builderStatus === "WRONG" && (
                <span className="text-xs font-bold text-red-800 bg-red-100 px-3.5 py-1.5 rounded-xl border border-red-300">
                  ⚠️ Chưa chính xác! Gợi ý: {targetBlocks.join(" + ")}
                </span>
              )}
              {builderStatus === "IDLE" && <div />}

              <button
                type="button"
                onClick={handleCheckBuilder}
                disabled={userOrderedBlocks.length === 0}
                className="px-5 py-2 bg-[#D85C4C] hover:bg-[#C94F40] text-white font-bold text-xs rounded-xl shadow-xs disabled:opacity-50 transition-all cursor-pointer"
              >
                Kiểm Tra Đáp Án
              </button>
            </div>
          </div>

          {/* Grammar Points Cards List */}
          <div className="space-y-4">
            <h3 className="text-sm font-serif font-black text-[#2B211D] flex items-center gap-2 border-l-4 border-[#D85C4C] pl-2.5">
              <BookOpen className="w-4 h-4 text-[#D85C4C]" />
              <span>Danh Sách Mẫu Ngữ Pháp Bài #{lessonNum} ({grammars.length} mẫu câu)</span>
            </h3>

            {loading ? (
              <div className="text-center py-12 text-[#766A61] font-serif font-bold animate-pulse">
                ⛩️ Đang nạp cấu trúc ngữ pháp Bài #{lessonNum}...
              </div>
            ) : grammars.length === 0 ? (
              <div className="bg-[#FFFDF9] rounded-2xl p-8 text-center text-[#766A61] border border-[#E7D9CC]">
                <p className="text-sm font-serif font-bold text-[#2B211D]">Chưa có dữ liệu bài học.</p>
              </div>
            ) : (
              <div className="space-y-5">
                {grammars.map((g) => (
                  <GrammarLearningItem
                    key={g.grammarId}
                    item={g}
                    isLearned={learnedKeys.has(`g_${g.grammarId}`)}
                    onToggleLearned={() => {
                      setLearnedKeys((prev) => {
                        const u = new Set(prev);
                        if (u.has(`g_${g.grammarId}`)) u.delete(`g_${g.grammarId}`);
                        else u.add(`g_${g.grammarId}`);
                        return u;
                      });
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
