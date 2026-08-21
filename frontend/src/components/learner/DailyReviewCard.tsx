"use client";

import Link from "next/link";
import { DailyReviewViewModel } from "@/types/learner";

interface DailyReviewCardProps {
  reviewData?: DailyReviewViewModel;
}

export default function DailyReviewCard({ reviewData }: DailyReviewCardProps) {
  const isDataAvailable = reviewData && reviewData.isAvailable;

  return (
    <div className="bg-[#FAF3EB] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm relative overflow-hidden">
      {/* Decorative Paw / Stamp icon background */}
      <div className="absolute right-4 top-4 text-5xl text-[#C65D4B]/15 select-none pointer-events-none">
        🐾
      </div>

      <div className="space-y-3 z-10">
        <h3 className="text-xl font-serif font-extrabold text-[#231917] flex items-center gap-2">
          <span>Ôn tập hôm nay</span>
        </h3>

        {isDataAvailable ? (
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-3 text-xs text-[#56423E] font-medium bg-[#FFFDF9] p-2.5 rounded-xl border border-[#DED3C8]/60">
              <span className="w-6 h-6 rounded-lg bg-[#F5EFE6] text-[#C65D4B] font-bold flex items-center justify-center text-[10px]">
                A
              </span>
              <span><strong>{reviewData.dueVocabCount}</strong> từ sắp quên</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#56423E] font-medium bg-[#FFFDF9] p-2.5 rounded-xl border border-[#DED3C8]/60">
              <span className="w-6 h-6 rounded-lg bg-[#F5EFE6] text-[#8B6F5A] font-bold flex items-center justify-center text-[10px]">
                📖
              </span>
              <span><strong>{reviewData.dueGrammarCount}</strong> mẫu ngữ pháp</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#56423E] font-medium bg-[#FFFDF9] p-2.5 rounded-xl border border-[#DED3C8]/60">
              <span className="w-6 h-6 rounded-lg bg-[#F5EFE6] text-[#C65D4B] font-bold flex items-center justify-center text-[10px]">
                漢
              </span>
              <span><strong>{reviewData.dueKanjiCount}</strong> Kanji</span>
            </div>
          </div>
        ) : (
          <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#DED3C8]/70 text-xs text-[#76685F] space-y-1">
            <p className="font-bold text-[#231917]">Thẻ ghi nhớ Flashcard SRS</p>
            <p className="leading-relaxed">
              Tính năng thuật toán ôn tập lặp lại ngắt quãng (Spaced Repetition) đang được hoàn thiện.
            </p>
          </div>
        )}
      </div>

      <div className="z-10 pt-2">
        {isDataAvailable ? (
          <button className="w-full py-3 bg-[#FFFDF9] hover:bg-white text-[#C65D4B] border border-[#C65D4B]/40 font-bold text-xs rounded-xl shadow-2xs transition-all">
            Ôn ngay trong 10 phút ➔
          </button>
        ) : (
          <Link
            href="/levels"
            className="w-full block text-center py-3 bg-[#FFFDF9] hover:bg-white text-[#8B6F5A] border border-[#DED3C8] font-bold text-xs rounded-xl transition-all"
          >
            Vào thư viện bài học ➔
          </Link>
        )}
      </div>
    </div>
  );
}
