"use client";

import { useState } from "react";
import { Volume2, Sparkles, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { getSinoVietnameseReading, getVocabularyKanjiAnalysis } from "@/lib/utils/kanjiSinoVietnamese";
import { playJapaneseTTS } from "@/lib/utils/japaneseAudioTTS";
import ShadowingPronunciationModal from "@/components/learner/vocabularies/ShadowingPronunciationModal";

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
  const [showShadowingModal, setShowShadowingModal] = useState(false);

  // Enhanced Audio TTS Playback for authentic Japanese Pronunciation 🔊
  const playAudio = (e: React.MouseEvent, textToSpeak?: string) => {
    e.stopPropagation();
    playJapaneseTTS({
      text: textToSpeak || item.word || item.kana,
      audioUrl: textToSpeak ? undefined : item.audioUrl,
    });
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4, scale: 1.008 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className={`bg-white border-2 rounded-3xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 h-full relative overflow-hidden group cursor-pointer ${
          isLearned
            ? "border-emerald-500/60 bg-emerald-500/5 ring-1 ring-emerald-500/20"
            : "border-[#F2DDD4] hover:border-[#C65D4B]/70"
        }`}
      >
        <div className="space-y-3 z-10">
          {/* Header Row: Word Title + Action Audio Group (Left) & Badges (Right) */}
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#F5EFE6] pb-3">
            
            {/* Left: Word + Audio + Mic Thu Âm */}
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-2xl sm:text-3xl font-black font-jp text-[#C65D4B] group-hover:text-[#B04F3F] transition-colors tracking-tight">
                {item.word}
              </h3>

              {/* TTS Audio Button 🔊 */}
              <button
                type="button"
                onClick={(e) => playAudio(e)}
                title="Nghe phát âm chuẩn giọng Nhật Bản"
                className="p-1.5 rounded-xl bg-[#FFEFEA] hover:bg-[#C65D4B] text-[#C65D4B] hover:text-white border border-[#FFD8CD] transition-all shadow-2xs cursor-pointer hover:scale-110 active:scale-95 shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              {/* Mic Record Shadowing Button 🎙️ */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowShadowingModal(true);
                }}
                title="Luyện ngữ điệu Pitch Accent & Thu âm từ vựng này"
                className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 transition-all shadow-2xs cursor-pointer hover:scale-105 active:scale-95 shrink-0 flex items-center gap-1 text-xs font-black"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Thu âm</span>
              </button>
            </div>

            {/* Right: Badges */}
            <div className="flex items-center gap-1.5 flex-wrap justify-end shrink-0">
              {item.verbTypeJa && (
                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-xl border shadow-2xs transition-colors ${
                    item.verbType === "transitive" || item.verbTypeJa === "他動詞"
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : "bg-teal-50 text-teal-700 border-teal-200"
                  }`}
                >
                  {item.verbTypeJa}
                </span>
              )}
              {item.partOfSpeech && (
                <span className="text-[10px] bg-[#FFF8F5] text-[#8B6F5A] font-black px-2.5 py-1 rounded-xl border border-[#F2DDD4] shadow-2xs">
                  {item.partOfSpeech}
                </span>
              )}
            </div>
          </div>

          {/* Reading (Kana) */}
          <div className="flex items-center justify-between gap-2 flex-wrap pt-0.5">
            <p className="text-sm font-bold text-[#8B6F5A] font-jp">{item.kana}</p>
          </div>

          {/* Sino-Vietnamese (Hán Việt) & Kanji Breakdown */}
          {(() => {
            const kanjiAnalysis = getVocabularyKanjiAnalysis(item.word || item.kanjiForm);
            if (!kanjiAnalysis) return null;

            return (
              <div className="pt-1 space-y-1.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-[#C65D4B] bg-[#FFEFEA] px-2.5 py-0.5 rounded-lg border border-[#FFD8CD]">
                  <Sparkles className="w-3 h-3 text-[#C65D4B]" />
                  <span>Hán Việt: {kanjiAnalysis.fullHanViet}</span>
                </span>

                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {kanjiAnalysis.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] bg-[#FFF8F5] border border-[#F2DDD4] px-2 py-0.5 rounded-lg shadow-2xs"
                    >
                      <span className="font-extrabold text-[#C65D4B] text-xs font-jp">{detail.char}</span>
                      <span className="font-black text-[#2C201D] uppercase">{detail.hanViet}</span>
                      {detail.meaningVi && (
                        <span className="text-[#76685F] italic border-l border-[#F2DDD4] pl-1 ml-0.5">
                          {detail.meaningVi.split(",")[0]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Primary Meaning */}
          <div className="pt-1">
            <h4 className="text-base font-black text-[#2C201D] leading-snug">
              {(item.meaningVi || "").normalize("NFC")}
            </h4>
          </div>

          {/* Verb Helper Note & Paired Verb Widget */}
          {(item.verbNote || item.verbTypeJa) && (
            <div className="bg-[#FFF8F5] border border-[#F2DDD4] rounded-2xl p-3 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#2C201D]">
                <span className="text-[10px] font-black text-[#C65D4B] bg-[#FFEFEA] px-2 py-0.5 rounded-md border border-[#FFD8CD]">
                  {item.verbTypeJa || (item.verbType === "transitive" ? "他動詞" : "自動詞")}
                </span>
                <span className="text-[11px] leading-tight text-[#76685F]">
                  {item.verbNote ||
                    (item.verbType === "transitive" || item.verbTypeJa === "他動詞"
                      ? "人がものに動作をする (Cần có tác động trực tiếp vào đối tượng)"
                      : "動作・変化が自然に起こる (Hành động/sự thay đổi diễn ra tự nhiên)")}
                </span>
              </div>

              {item.pairedVerbWord && (
                <div className="pt-1.5 border-t border-[#F2DDD4] flex items-center justify-between text-[11px] font-bold text-[#2C201D]">
                  <span className="text-[#8B6F5A]">Cặp tự/tha đối ứng:</span>
                  <span className="text-[#C65D4B] font-black bg-white px-2 py-0.5 rounded-lg border border-[#F2DDD4]">
                    {item.pairedVerbWord} ({item.pairedVerbKana})
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Authentic Example Sentence Card */}
          {item.exampleJp && (
            <div
              onClick={(e) => playAudio(e, item.exampleJp)}
              title="Nhấp để nghe phát âm câu ví dụ"
              className="bg-[#FFF8F5] border border-[#F2DDD4] hover:border-[#C65D4B] p-3 rounded-2xl space-y-1 text-xs transition-all cursor-pointer group/ex shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-jp font-bold text-[#C65D4B] group-hover/ex:text-[#B04F3F] transition-colors leading-relaxed text-sm">
                  {item.exampleJp}
                </p>
                <Volume2 className="w-4 h-4 text-[#C65D4B] shrink-0" />
              </div>
              {item.exampleVi && <p className="text-xs text-[#76685F] font-bold">{item.exampleVi}</p>}
            </div>
          )}

          {item.notes && (
            <p className="text-xs text-[#76685F] italic bg-[#FFF8F5] p-2.5 rounded-xl border border-[#F2DDD4]">
              💡 {(item.notes || "").normalize("NFC")}
            </p>
          )}
        </div>
      </motion.div>

      <ShadowingPronunciationModal
        isOpen={showShadowingModal}
        onClose={() => setShowShadowingModal(false)}
        singleWord={{
          word: item.word,
          kana: item.kana,
          meaning: item.meaningVi,
        }}
      />
    </>
  );
}
