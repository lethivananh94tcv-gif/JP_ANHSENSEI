"use client";

import React from "react";
import { Volume2, CheckCircle2, BookOpen, Sparkles } from "lucide-react";
import { playJapaneseTTS } from "@/lib/utils/japaneseAudioTTS";
import JapaneseFuriganaText from "../JapaneseFuriganaText";

export interface GrammarExampleDto {
  exampleId: number;
  japaneseText: string;
  reading?: string;
  meaningVi: string;
}

export interface GrammarPointDto {
  grammarId: number;
  pattern: string;
  meaning: string;
  explanation: string;
  structure?: string;
  jlptLevel: string;
  examples: GrammarExampleDto[];
}

interface GrammarLearningItemProps {
  item: GrammarPointDto;
  isLearned: boolean;
  onToggleLearned: (id: number) => void;
}

export default function GrammarLearningItem({
  item,
  isLearned,
  onToggleLearned,
}: GrammarLearningItemProps) {
  // Format formula structures like "N1 + は + N2 + です" into ribbon blocks
  const renderStructureRibbon = (structure?: string) => {
    if (!structure) return null;

    const parts = structure.split("+").map((p) => p.trim());

    return (
      <div className="flex flex-wrap items-center gap-1.5 py-1">
        {parts.map((part, idx) => {
          const isParticle = ["は", "が", "を", "に", "で", "へ", "と", "の", "から", "まで", "も", "か"].includes(part);
          return (
            <React.Fragment key={idx}>
              <span
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-transform hover:scale-105 shadow-2xs ${
                  isParticle
                    ? "bg-[#C65D4B] text-white border border-[#A84A3B]"
                    : "bg-[#F5EFE6] text-[#231917] border border-[#DED3C8]"
                }`}
              >
                {part}
              </span>
              {idx < parts.length - 1 && <span className="text-[#8B6F5A] text-xs font-bold font-serif">+</span>}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={`relative bg-[#FFFDF9] border-2 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 space-y-5 overflow-hidden ${
        isLearned
          ? "border-[#6F8A72]/60 bg-[#6F8A72]/5"
          : "border-[#DED3C8] hover:border-[#C65D4B]/60"
      }`}
    >
      {/* Background Watermark Pattern */}
      <div className="absolute top-2 right-4 text-7xl font-serif font-black text-[#231917]/[0.03] select-none pointer-events-none">
        文法
      </div>

      {/* Header: Pattern & Hanko Seal */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 border-b border-[#DED3C8]/60 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-white bg-gradient-to-r from-[#C65D4B] to-[#D98373] px-3.5 py-1.5 rounded-xl shadow-xs tracking-wider">
            {item.jlptLevel || "N5"}
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#231917] tracking-tight">
            <JapaneseFuriganaText text={item.pattern} />
          </h3>
        </div>

        {/* Hanko Stamp / Toggle Button */}
        <button
          type="button"
          onClick={() => onToggleLearned(item.grammarId)}
          className={`py-2 px-4 rounded-2xl text-xs font-bold transition-all min-h-[44px] flex items-center gap-2 border-2 ${
            isLearned
              ? "bg-[#6F8A72] text-white border-[#537056] shadow-sm scale-102"
              : "bg-[#FAF6EE] hover:bg-[#8B6F5A] text-[#8B6F5A] hover:text-white border-[#DED3C8] hover:border-[#8B6F5A]"
          }`}
        >
          {isLearned ? (
            <>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-serif text-[10px] font-black border border-white/40">
                済
              </span>
              <span>✓ Đã thuộc mẫu câu</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Đánh dấu đã thuộc</span>
            </>
          )}
        </button>
      </div>

      {/* Meaning Banner */}
      <div className="bg-[#FAF3EB] p-4 rounded-2xl border border-[#DED3C8]/70 flex items-start gap-3 shadow-2xs">
        <div className="p-2 rounded-xl bg-[#C65D4B]/10 text-[#C65D4B] mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <p className="text-[11px] font-extrabold text-[#8B6F5A] uppercase tracking-wider">Ý nghĩa ngữ pháp</p>
          <p className="text-base font-bold text-[#231917]">{item.meaning}</p>
        </div>
      </div>

      {/* Structure Ribbon Visualizer */}
      {item.structure && (
        <div className="bg-white p-4 rounded-2xl border border-[#DED3C8]/50 space-y-1.5 shadow-2xs">
          <p className="text-[11px] font-extrabold text-[#76685F] uppercase tracking-wider">Cấu trúc kết hợp:</p>
          {renderStructureRibbon(item.structure)}
        </div>
      )}

      {/* Detailed Explanation */}
      <div className="space-y-1.5 px-1">
        <div className="flex items-center gap-2 text-[#76685F]">
          <BookOpen className="w-3.5 h-3.5 text-[#C65D4B]" />
          <h4 className="text-xs font-bold uppercase tracking-wider">Giải thích chi tiết:</h4>
        </div>
        <p className="text-sm text-[#231917] leading-relaxed whitespace-pre-line font-medium pl-5 border-l-2 border-[#C65D4B]/30">
          {item.explanation}
        </p>
      </div>

      {/* Examples List with Japanese Furigana & Audio Player */}
      {item.examples && item.examples.length > 0 && (
        <div className="pt-4 border-t border-[#DED3C8]/60 space-y-3">
          <h4 className="text-xs font-bold text-[#76685F] uppercase tracking-wider flex items-center justify-between">
            <span>Ví dụ minh họa ({item.examples.length})</span>
            <span className="text-[11px] font-normal text-[#8B6F5A] lowercase">chạm 🔊 để nghe phát âm</span>
          </h4>
          <div className="space-y-2.5">
            {item.examples.map((ex) => (
              <div
                key={ex.exampleId}
                className="p-4 bg-[#FAF6EE] hover:bg-white rounded-2xl border border-[#DED3C8]/60 hover:border-[#C65D4B]/40 transition-all flex items-start justify-between gap-4 shadow-2xs group"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="text-base sm:text-lg font-bold text-[#231917]">
                    <JapaneseFuriganaText text={ex.japaneseText} />
                  </div>
                  <p className="text-xs font-semibold text-[#C65D4B] flex items-center gap-1.5">
                    <span>➔</span>
                    <span>{ex.meaningVi}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => playJapaneseTTS(ex.japaneseText.replace(/[（\(][^）\)]+[）\)]/g, ""))}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#C65D4B] text-[#C65D4B] hover:text-white border border-[#DED3C8] hover:border-[#C65D4B] shadow-2xs transition-all flex-shrink-0 group-hover:scale-105"
                  title="Nghe phát âm tiếng Nhật chuẩn Tokyo"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
