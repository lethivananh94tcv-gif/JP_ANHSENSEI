"use client";

import { useState } from "react";
import { X, Sparkles, Volume2 } from "lucide-react";
import { getKanjiDetails, KanjiDetailData } from "@/lib/utils/kanjiDetailData";
import { playJapaneseTTS } from "@/lib/utils/japaneseAudioTTS";

export interface QuickKanjiInfo {
  character: string;
  displayOrder?: number | string;
  sinoVi?: string;
  kunyomi?: string;
  onyomi?: string;
  strokeCount?: number;
  radical?: string;
  meaningVi?: string;
  kunExamples?: string;
  onExamples?: string;
}

interface KanjiQuickModalProps {
  kanji: QuickKanjiInfo | null;
  onClose: () => void;
}

export default function KanjiQuickModal({ kanji, onClose }: KanjiQuickModalProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  if (!kanji) return null;

  const detail: KanjiDetailData = getKanjiDetails(kanji);

  const handlePlayKanjiSound = () => {
    setIsPlayingAudio(true);
    playJapaneseTTS({
      text: detail.character,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  const handlePlayVocabSound = (word: string, reading: string) => {
    setPlayingWord(word);
    playJapaneseTTS({
      text: `${word} (${reading})`,
      onEnd: () => setPlayingWord(null),
      onError: () => setPlayingWord(null),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 z-50 animate-fadeIn overflow-y-auto">
      <div className="bg-[#FFFDF9] border-2 border-[#E5D7C5] text-[#1F1714] rounded-3xl max-w-xl w-full p-5 sm:p-7 space-y-5 shadow-2xl relative overflow-hidden my-auto max-h-[92vh] flex flex-col justify-between">
        
        {/* Background Decorative Kanji Watermark */}
        <div className="absolute -right-4 -bottom-6 text-9xl font-jp font-black text-[#C65D4B]/5 select-none pointer-events-none">
          {detail.character}
        </div>

        {/* Modal Header Bar & Close Button */}
        <div className="flex justify-between items-start border-b border-[#E5D7C7] pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#FAF4EB] text-[#C65D4B] px-3.5 py-1 rounded-full text-xs font-black border border-[#E5D7C7]">
              <Sparkles className="w-3.5 h-3.5" /> CHI TIẾT HÁN TỰ KANJI
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8B786D] hover:text-[#C65D4B] hover:bg-[#FAF4EB] border border-transparent hover:border-[#E5D7C7] transition-all cursor-pointer font-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="space-y-4 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#E5D7C7]">
          
          {/* Main Title Badge Banner */}
          <div className="bg-[#FAF4EB] border-2 border-[#E5D7C7] p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-4 text-center sm:text-left">
              {/* Giant Character Box */}
              <div className="relative group">
                <div className="w-20 h-20 sm:w-22 sm:h-22 bg-white border-2 border-[#C65D4B] rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <span className="text-5xl sm:text-6xl font-jp font-black text-[#C65D4B]">
                    {detail.character}
                  </span>
                </div>
                {/* Audio Button Overlay */}
                <button
                  onClick={handlePlayKanjiSound}
                  className="absolute -bottom-2 -right-2 bg-[#C65D4B] hover:bg-[#B44C3B] text-white p-2 rounded-full shadow-md transition-all cursor-pointer hover:scale-110"
                  title="Phát âm Hán tự"
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "animate-bounce text-amber-300" : ""}`} />
                </button>
              </div>

              {/* Title Header text */}
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-black text-[#1F1714] flex items-center gap-2 flex-wrap">
                  <span className="text-[#C65D4B]">{detail.displayOrder}.</span>
                  <span className="font-jp font-black">{detail.character}</span>
                  <span className="text-[#8B786D]">—</span>
                  <span className="text-[#C65D4B] font-extrabold">{detail.sinoVi}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-bold text-[#6E5D55]">
                  <span className="bg-white border border-[#E5D7C7] px-2.5 py-0.5 rounded-full">
                    ✏️ {detail.strokeCount} Nét vẽ
                  </span>
                  {detail.radical && detail.radical !== "—" && (
                    <span className="bg-white border border-[#E5D7C7] px-2.5 py-0.5 rounded-full">
                      ⛩️ Bộ: {detail.radical}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 animate-fade-in">
            {/* SECTION 1: Nghĩa (Meaning) */}
            <div className="bg-white border-2 border-[#E5D7C7] p-4 rounded-2xl space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#C65D4B]">
                <span>📖</span> Ý NGHĨA TỔNG QUÁT (TIẾNG VIỆT):
              </div>
              <p className="text-base font-black text-[#231917] pl-3 border-l-4 border-[#C65D4B] leading-relaxed">
                {detail.meaningVi}
              </p>
            </div>

            {/* SECTION 2 & 3: Âm Kun & Âm On */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Kunyomi Box */}
              <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-3.5 rounded-2xl space-y-1.5">
                <div className="text-xs font-black text-[#C65D4B] flex items-center gap-1">
                  <span>🔹</span> Âm Kun (Kunyomi):
                </div>
                <div className="text-xs font-bold text-[#1F1714] leading-relaxed font-jp">
                  {detail.kunyomiFormatted || detail.kunyomi}
                </div>
              </div>

              {/* Onyomi Box */}
              <div className="bg-[#FAF4EB] border border-[#E5D7C7] p-3.5 rounded-2xl space-y-1.5">
                <div className="text-xs font-black text-[#C65D4B] flex items-center gap-1">
                  <span>🔸</span> Âm On (Onyomi):
                </div>
                <div className="text-xs font-bold text-[#1F1714] leading-relaxed font-jp">
                  {detail.onyomiFormatted || detail.onyomi}
                </div>
              </div>
            </div>

            {/* SECTION 4: Từ Quan Trọng (Important Vocabulary List) */}
            {detail.importantVocab.length > 0 && (
              <div className="bg-white border-2 border-[#E5D7C7] p-4 rounded-2xl space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-[#E5D7C7] pb-2">
                  <span className="text-xs font-black text-[#1F1714] flex items-center gap-1.5">
                    <span>🎒</span> TỪ QUAN TRỌNG VÀ VÍ DỤ:
                  </span>
                  <span className="text-[10px] font-bold text-[#8B786D] bg-[#FAF4EB] px-2 py-0.5 rounded-md border border-[#E5D7C7]">
                    {detail.importantVocab.length} từ tiêu biểu
                  </span>
                </div>

                <div className="space-y-2">
                  {detail.importantVocab.map((vItem, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-[#FAF4EB]/60 hover:bg-[#FAF4EB] border border-[#E5D7C7]/70 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white text-[#C65D4B] border border-[#E5D7C7] text-[11px] font-black flex items-center justify-center shrink-0 shadow-2xs">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-jp font-black text-[#1F1714] group-hover:text-[#C65D4B] transition-colors">
                              {vItem.word}
                            </span>
                            <span className="text-xs font-jp font-extrabold text-[#6E5D55]">
                              （{vItem.reading}）
                            </span>
                          </div>
                          <div className="text-xs font-extrabold text-[#C65D4B] mt-0.5">
                            → {vItem.meaning || "Từ ghép ví dụ"}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handlePlayVocabSound(vItem.word, vItem.reading)}
                        className="p-2 rounded-xl bg-white hover:bg-[#C65D4B] text-[#C65D4B] hover:text-white border border-[#E5D7C7] transition-all cursor-pointer shadow-2xs"
                        title="Phát âm từ vựng"
                      >
                        <Volume2
                          className={`w-3.5 h-3.5 ${
                            playingWord === vItem.word ? "animate-bounce text-amber-300" : ""
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Action Button */}
        <div className="pt-3 border-t border-[#E5D7C7] flex gap-3 shrink-0">
          <button
            onClick={handlePlayKanjiSound}
            className="px-4 py-3 bg-[#FAF4EB] hover:bg-[#FAF0E3] text-[#C65D4B] font-black rounded-2xl text-xs border border-[#E5D7C7] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Volume2 className="w-4 h-4" /> Phát âm
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-[#C65D4B] hover:bg-[#B44C3B] text-white font-black rounded-2xl text-xs shadow-md transition-all cursor-pointer text-center"
          >
            Đóng Cửa Sổ
          </button>
        </div>
      </div>
    </div>
  );
}
