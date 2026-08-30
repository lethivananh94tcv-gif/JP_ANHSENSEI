"use client";

import { X, Sparkles, BookOpen, Volume2, PenTool } from "lucide-react";
import { getSinoVietnamese } from "@/lib/utils/kanjiSinoVietnamese";

export interface QuickKanjiInfo {
  character: string;
  sinoVi?: string;
  kunyomi?: string;
  onyomi?: string;
  strokeCount?: number;
  meaningVi?: string;
  kunExamples?: string;
  onExamples?: string;
}

interface KanjiQuickModalProps {
  kanji: QuickKanjiInfo | null;
  onClose: () => void;
}

export default function KanjiQuickModal({ kanji, onClose }: KanjiQuickModalProps) {
  if (!kanji) return null;

  const sinoReading = kanji.sinoVi || getSinoVietnamese(kanji.character) || kanji.meaningVi || "—";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-[#FAF7F2] border-2 border-[#4E3F39] text-[#2C2421] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Decorative Background Watermark */}
        <div className="absolute -right-4 -bottom-6 text-9xl font-serif font-black text-[#8B6F5A]/10 select-none pointer-events-none">
          {kanji.character}
        </div>

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#8C7B70] hover:text-[#231917] hover:bg-[#EADECF] transition-all cursor-pointer font-black"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 bg-[#FAF3EB] text-[#C65D4B] px-3.5 py-1 rounded-full text-xs font-black border border-[#DED3C8] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" /> CHI TIẾT HÁN TỰ KANJI
          </span>
          <h2 className="text-7xl font-sans font-black text-[#C65D4B] pt-2 drop-shadow-xs">
            {kanji.character}
          </h2>
          <h3 className="text-xl font-sans font-black text-[#231917]">
            Âm Hán Việt: <span className="text-[#C65D4B]">{sinoReading}</span>
          </h3>
          {kanji.strokeCount && (
            <p className="text-xs font-bold text-[#76685F]">
              ✏️ Số nét vẽ: <strong>{kanji.strokeCount} nét</strong>
            </p>
          )}
        </div>

        {/* Readings Card */}
        <div className="space-y-3 bg-white border-2 border-[#EADECF] p-4 rounded-2xl text-xs">
          {kanji.kunyomi && (
            <div>
              <strong className="text-[#C65D4B] font-black">Âm Kun (Kunyomi):</strong>{" "}
              <span className="font-bold text-[#231917]">{kanji.kunyomi}</span>
              {kanji.kunExamples && <p className="text-[11px] text-[#76685F] mt-0.5">🔹 Ví dụ: {kanji.kunExamples}</p>}
            </div>
          )}

          {kanji.onyomi && (
            <div className={kanji.kunyomi ? "pt-2 border-t border-[#EADECF]" : ""}>
              <strong className="text-[#C65D4B] font-black">Âm On (Onyomi):</strong>{" "}
              <span className="font-bold text-[#231917]">{kanji.onyomi}</span>
              {kanji.onExamples && <p className="text-[11px] text-[#76685F] mt-0.5">🔸 Ví dụ: {kanji.onExamples}</p>}
            </div>
          )}

          {kanji.meaningVi && (
            <div className="pt-2 border-t border-[#EADECF]">
              <strong className="text-[#8B6F5A] font-black">Ý nghĩa tiếng Việt:</strong>{" "}
              <span className="font-bold text-[#231917]">{kanji.meaningVi}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#C65D4B] hover:bg-[#B54F3E] text-white font-black rounded-2xl text-xs shadow-md transition-all cursor-pointer"
        >
          Đóng Cửa Sổ
        </button>
      </div>
    </div>
  );
}
