"use client";

export interface VocabularyDto {
  vocabularyId: number;
  word: string;
  kana: string;
  kanjiForm?: string;
  meaningVi: string;
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
  return (
    <div
      className={`bg-[#FFFDF9] border rounded-2xl p-5 shadow-2xs transition-all flex flex-col justify-between space-y-4 ${
        isLearned ? "border-[#6F8A72]/50 bg-[#6F8A72]/5" : "border-[#DED3C8] hover:border-[#8B6F5A]/50"
      }`}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-serif font-black text-[#C65D4B]">{item.word}</h3>
            <p className="text-xs text-[#76685F] font-semibold">{item.kana}</p>
            {item.kanjiForm && (
              <p className="text-[11px] text-[#8B6F5A]">Hán tự: {item.kanjiForm}</p>
            )}
          </div>
          {item.partOfSpeech && (
            <span className="text-[10px] bg-[#F5EFE6] text-[#8B6F5A] font-bold px-2.5 py-1 rounded-lg border border-[#DED3C8]/60">
              {item.partOfSpeech}
            </span>
          )}
        </div>

        <p className="text-sm font-sans font-bold text-[#231917] pt-2 border-t border-[#DED3C8]/50">
          {(item.meaningVi || "").normalize("NFC")}
        </p>

        {item.notes && (
          <p className="text-xs font-sans text-[#76685F] italic bg-[#F5EFE6]/50 p-2 rounded-xl">
            💡 {(item.notes || "").normalize("NFC")}
          </p>
        )}
      </div>

      <div className="pt-3 border-t border-[#DED3C8]/40 flex justify-between items-center">
        <button
          onClick={() => onToggleLearned(item.vocabularyId)}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all min-h-[44px] flex items-center justify-center gap-2 ${
            isLearned
              ? "bg-[#6F8A72] text-white shadow-2xs"
              : "bg-[#F5EFE6] hover:bg-[#8B6F5A] text-[#8B6F5A] hover:text-white border border-[#DED3C8]"
          }`}
        >
          {isLearned ? (
            <>
              <span>✓ Đã thuộc</span>
            </>
          ) : (
            <>
              <span>Đánh dấu đã học</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
