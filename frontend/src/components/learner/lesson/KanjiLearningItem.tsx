"use client";

export interface LessonKanjiDto {
  kanjiId: number;
  character: string;
  onyomi?: string;
  kunyomi?: string;
  meaningVi: string;
  strokeCount?: number;
  radical?: string;
}

interface KanjiLearningItemProps {
  item: LessonKanjiDto;
  isLearned: boolean;
  onToggleLearned: (id: number) => void;
}

export default function KanjiLearningItem({
  item,
  isLearned,
  onToggleLearned,
}: KanjiLearningItemProps) {
  return (
    <div
      className={`bg-[#FFFDF9] border rounded-2xl p-5 shadow-2xs transition-all flex flex-col justify-between space-y-4 ${
        isLearned ? "border-[#6F8A72]/50 bg-[#6F8A72]/5" : "border-[#DED3C8] hover:border-[#8B6F5A]/50"
      }`}
    >
      <div className="flex gap-4 items-start">
        {/* Large Kanji Character Box */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F5EFE6] border border-[#DED3C8] rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-serif font-black text-[#C65D4B] shadow-inner flex-shrink-0">
          {item.character}
        </div>

        <div className="space-y-1 text-xs">
          <h4 className="font-serif font-extrabold text-base sm:text-lg text-[#231917]">
            {item.meaningVi}
          </h4>
          <p className="text-[#76685F]">
            Âm On: <strong className="text-[#231917]">{item.onyomi || "—"}</strong>
          </p>
          <p className="text-[#76685F]">
            Âm Kun: <strong className="text-[#231917]">{item.kunyomi || "—"}</strong>
          </p>
          {item.strokeCount && (
            <p className="text-[#76685F]">
              Số nét: <strong className="text-[#8B6F5A]">{item.strokeCount} nét</strong>
            </p>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-[#DED3C8]/40">
        <button
          onClick={() => onToggleLearned(item.kanjiId)}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all min-h-[44px] flex items-center justify-center gap-2 ${
            isLearned
              ? "bg-[#6F8A72] text-white shadow-2xs"
              : "bg-[#F5EFE6] hover:bg-[#8B6F5A] text-[#8B6F5A] hover:text-white border border-[#DED3C8]"
          }`}
        >
          {isLearned ? (
            <>
              <span>✓ Đã nhớ Hán tự</span>
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
