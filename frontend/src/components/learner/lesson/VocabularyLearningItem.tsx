"use client";

import { Volume2, CheckCircle2, Bookmark, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { getSinoVietnameseReading } from "@/lib/utils/kanjiSinoVietnamese";
import { playJapaneseTTS } from "@/lib/utils/japaneseAudioTTS";

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
  exampleReading?: string;
  usageNote?: string;
  partOfSpeech?: string;
  audioUrl?: string;
  notes?: string;
  verbType?: "transitive" | "intransitive" | string;
  verbTypeJa?: "他動詞" | "自動詞" | string;
  verbNote?: string;
  pairedVerbId?: number;
  pairedVerbWord?: string;
  pairedVerbKana?: string;
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

  // Enhanced Audio TTS Playback for authentic Japanese Pronunciation 🔊
  const playAudio = (e: React.MouseEvent, textToSpeak?: string) => {
    e.stopPropagation();
    playJapaneseTTS({
      text: textToSpeak || item.word || item.kana,
      audioUrl: textToSpeak ? undefined : item.audioUrl,
    });
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
                onClick={(e) => playAudio(e)}
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

          <div className="flex items-center gap-1.5 flex-wrap justify-end shrink-0">
            {item.verbTypeJa && (
              <span
                className={`text-[10px] font-black px-2.5 py-1 rounded-xl border shadow-2xs transition-colors ${
                  item.verbType === "transitive" || item.verbTypeJa === "他動詞"
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-teal-50 text-teal-700 border-teal-200"
                }`}
                title={
                  item.verbType === "transitive" || item.verbTypeJa === "他動詞"
                    ? "Tha động từ (他動詞): 人がものに動作をする"
                    : "Tự động từ (自動詞): 動作・変化が自然に起こる"
                }
              >
                {item.verbTypeJa}
              </span>
            )}
            {item.partOfSpeech && (
              <span className="text-[10px] bg-white text-[#C65D4B] font-black px-2.5 py-1 rounded-xl border border-[#DED3C8] shadow-2xs group-hover:border-[#C65D4B]/40 transition-colors">
                {item.partOfSpeech}
              </span>
            )}

            {/* Bookmark / Learned Toggle Button - Compact Top Right */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleLearned(item.vocabularyId);
              }}
              title={isLearned ? "Đã thuộc từ này (Nhấp để bỏ đánh dấu)" : "Đánh dấu đã học"}
              className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition-all duration-200 cursor-pointer border shadow-2xs hover:scale-105 active:scale-95 ${
                isLearned
                  ? "bg-emerald-600 text-white border-emerald-700 shadow-emerald-500/20"
                  : "bg-white hover:bg-[#C65D4B] text-[#76685F] hover:text-white border-[#DED3C8] hover:border-[#C65D4B]"
              }`}
            >
              {isLearned ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Đã thuộc</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Đã học</span>
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-sm font-extrabold text-[#231917] pt-2 border-t border-[#DED3C8]/70 leading-snug">
          {(item.meaningVi || "").normalize("NFC")}
        </p>

        {/* Verb Helper Note & Paired Verb Widget */}
        {(item.verbNote || item.verbTypeJa) && (
          <div className="bg-[#FFFDF9] border border-[#EBE1D7] rounded-xl p-2.5 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#56423E]">
              <span className="text-[10px] font-black text-[#C65D4B] bg-[#C65D4B]/10 px-1.5 py-0.5 rounded">
                {item.verbTypeJa || (item.verbType === "transitive" ? "他動詞" : "自動詞")}
              </span>
              <span className="text-[11px] leading-tight text-[#6E5D57]">
                {item.verbNote ||
                  (item.verbType === "transitive" || item.verbTypeJa === "他動詞"
                    ? "人がものに動作をする (Tác động trực tiếp lên đối tượng)"
                    : "動作・変化が自然に起こる (Tự xảy ra/diễn ra tự nhiên)")}
              </span>
            </div>

            {item.pairedVerbWord && (
              <div className="pt-1.5 border-t border-[#EBE1D7] flex items-center justify-between text-[11px] font-bold text-[#56423E]">
                <span className="text-[#8B6F5A]">自動詞 ↕ 他動詞 (Cặp đối ứng):</span>
                <span className="text-[#C65D4B] font-extrabold bg-[#C65D4B]/10 px-2 py-0.5 rounded-md border border-[#C65D4B]/20">
                  {item.pairedVerbWord} ({item.pairedVerbKana})
                </span>
              </div>
            )}
          </div>
        )}

        {item.exampleJp && (
          <div 
            onClick={(e) => playAudio(e, item.exampleJp)}
            title="Nhấp để nghe đọc câu ví dụ"
            className="bg-white/80 border border-[#DED3C8]/80 hover:border-[#C65D4B]/40 p-2.5 rounded-xl space-y-0.5 text-xs font-semibold text-[#56423E] transition-all cursor-pointer group/ex"
          >
            <div className="flex items-center justify-between gap-1">
              <p className="font-jp font-bold text-[#C65D4B] group-hover/ex:text-[#B04F3F] transition-colors">{item.exampleJp}</p>
              <Volume2 className="w-3.5 h-3.5 text-[#C65D4B]/70 group-hover/ex:text-[#C65D4B] shrink-0" />
            </div>
            {item.exampleVi && <p className="text-[11px] text-[#76685F]">{item.exampleVi}</p>}
          </div>
        )}

        {item.notes && (
          <p className="text-xs text-[#76685F] italic bg-white/60 p-2 rounded-xl border border-[#DED3C8]/60">
            💡 {(item.notes || "").normalize("NFC")}
          </p>
        )}
      </div>
    </motion.div>
  );
}
