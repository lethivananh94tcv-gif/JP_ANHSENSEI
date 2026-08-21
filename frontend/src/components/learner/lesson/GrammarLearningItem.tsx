"use client";

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
  return (
    <div
      className={`bg-[#FFFDF9] border rounded-3xl p-6 shadow-2xs transition-all space-y-4 ${
        isLearned ? "border-[#6F8A72]/50 bg-[#6F8A72]/5" : "border-[#DED3C8] hover:border-[#8B6F5A]/50"
      }`}
    >
      {/* Pattern Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-white bg-[#C65D4B] px-3 py-1 rounded-lg">
            {item.jlptLevel || "N5"}
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-black text-[#231917]">
            {item.pattern}
          </h3>
        </div>

        <button
          onClick={() => onToggleLearned(item.grammarId)}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all min-h-[44px] flex items-center justify-center gap-2 ${
            isLearned
              ? "bg-[#6F8A72] text-white shadow-2xs"
              : "bg-[#F5EFE6] hover:bg-[#8B6F5A] text-[#8B6F5A] hover:text-white border border-[#DED3C8]"
          }`}
        >
          {isLearned ? "✓ Đã hiểu mẫu câu" : "Đánh dấu đã học"}
        </button>
      </div>

      {/* Meaning */}
      <div className="bg-[#F5EFE6] p-4 rounded-2xl border border-[#DED3C8]/60 space-y-1">
        <p className="text-xs font-bold text-[#8B6F5A] uppercase tracking-wider">💡 Ý nghĩa</p>
        <p className="text-sm font-bold text-[#231917]">{item.meaning}</p>
      </div>

      {/* Structure if present */}
      {item.structure && (
        <div className="bg-[#FFFDF9] p-3 rounded-xl border border-[#DED3C8]/40">
          <p className="text-[11px] font-bold text-[#76685F] uppercase">Cấu trúc kết hợp:</p>
          <p className="text-xs font-mono font-semibold text-[#C65D4B]">{item.structure}</p>
        </div>
      )}

      {/* Explanation */}
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-[#76685F] uppercase">Giải thích chi tiết:</h4>
        <p className="text-xs text-[#231917] leading-relaxed whitespace-pre-line">
          {item.explanation}
        </p>
      </div>

      {/* Examples */}
      {item.examples && item.examples.length > 0 && (
        <div className="pt-3 border-t border-[#DED3C8]/50 space-y-2">
          <h4 className="text-xs font-bold text-[#76685F] uppercase">Ví dụ minh họa ({item.examples.length}):</h4>
          <div className="space-y-2">
            {item.examples.map((ex) => (
              <div
                key={ex.exampleId}
                className="p-3 bg-[#F5EFE6]/50 rounded-2xl border border-[#DED3C8]/40 space-y-1"
              >
                <p className="text-sm sm:text-base font-bold text-[#231917]">{ex.japaneseText}</p>
                {ex.reading && <p className="text-xs text-[#76685F] italic">{ex.reading}</p>}
                <p className="text-xs font-semibold text-[#C65D4B]">➔ {ex.meaningVi}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
