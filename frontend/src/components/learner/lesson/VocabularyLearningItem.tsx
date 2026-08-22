"use client";

import { Volume2, CheckCircle2, Bookmark, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { getSinoVietnameseReading } from "@/lib/utils/kanjiSinoVietnamese";

export interface VocabularyDto {
  vocabularyId: number;
  id?: number;
  word: string;
  kana: string;
  kanjiForm?: string;
  romaji?: string;
  meaningVi: string;
  exampleJp?: string;
  exampleVi?: string;
  partOfSpeech?: string;
  audioUrl?: string;
  notes?: string;
}

interface VocabularyLearningItemProps {
  item: VocabularyDto;
  isLearned: boolean;
  onToggleLearned: (id: number) => void;
}

export default function VocabularyLearningItem({
  item,
  isLearned,
  onToggleLearned,
}: VocabularyLearningItemProps) {

  // Native Web Audio API Speech Synthesis for authentic Japanese Pronunciation 🔊
  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.word || item.kana);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const sinoReading = getSinoVietnameseReading(item.word || item.kanjiForm);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 rounded-3xl p-5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 h-full relative overflow-hidden group cursor-pointer ${
        isLearned
          ? "border-emerald-500/60 bg-emerald-500/5 ring-1 ring-emerald-500/30"
          : "border-[#DED3C8] hover:border-[#C65D4B]/70"
      }`}
    >
      <div className="space-y-2.5 z-10">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black text-[#C65D4B] group-hover:text-[#B04F3F] transition-colors tracking-tight truncate">
                {item.word}
              </h3>

              {/* Text-to-Speech Audio Button 🔊 */}
              <button
                type="button"
                onClick={playAudio}
                title="Nghe phát âm chuẩn giọng Nhật Bản"
                className="p-1.5 rounded-xl bg-[#C65D4B]/10 hover:bg-[#C65D4B] text-[#C65D4B] hover:text-white border border-[#C65D4B]/30 transition-all shadow-2xs cursor-pointer hover:scale-110 active:scale-95 shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#76685F] font-bold">{item.kana}</p>
            
            {/* Sino-Vietnamese (Âm Hán Việt) Badge */}
            {sinoReading && (
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-[#C65D4B] bg-[#C65D4B]/10 px-2.5 py-0.5 rounded-md border border-[#C65D4B]/20">
                <Sparkles className="w-3 h-3 text-[#C65D4B]" />
                <span>Hán Việt: {sinoReading}</span>
              </span>
            )}
          </div>

          {item.partOfSpeech && (
            <span className="text-[10px] bg-white text-[#C65D4B] font-black px-2.5 py-1 rounded-xl border border-[#DED3C8] shadow-2xs shrink-0 group-hover:border-[#C65D4B]/40 transition-colors">
              {item.partOfSpeech}
            </span>
          )}
        </div>

        <p className="text-sm font-extrabold text-[#231917] pt-2 border-t border-[#DED3C8]/70 leading-snug">
          {(item.meaningVi || "").normalize("NFC")}
        </p>

        {item.exampleJp && (
          <div className="bg-white/80 border border-[#DED3C8]/80 p-2.5 rounded-xl space-y-0.5 text-xs font-semibold text-[#56423E] group-hover:border-[#C65D4B]/30 transition-colors">
            <p className="font-jp font-bold text-[#C65D4B]">{item.exampleJp}</p>
            {item.exampleVi && <p className="text-[11px] text-[#76685F]">{item.exampleVi}</p>}
          </div>
        )}

        {item.notes && (
          <p className="text-xs text-[#76685F] italic bg-white/60 p-2 rounded-xl border border-[#DED3C8]/60">
            💡 {(item.notes || "").normalize("NFC")}
          </p>
        )}
      </div>

      <div className="pt-3 border-t border-[#DED3C8]/60 flex justify-between items-center z-10">
        <button
          type="button"
          onClick={() => onToggleLearned(item.vocabularyId)}
          className={`w-full py-2.5 px-4 rounded-2xl text-xs font-black transition-all duration-200 min-h-[44px] flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:shadow-md ${
            isLearned
              ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-emerald-500/20"
              : "bg-white hover:bg-gradient-to-r hover:from-[#C65D4B] hover:to-[#B04F3F] text-[#8B6F5A] hover:text-white border border-[#DED3C8] hover:border-transparent"
          }`}
        >
          {isLearned ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>✓ Đã thuộc từ này</span>
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-4" />
              <span>Đánh dấu đã học</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
