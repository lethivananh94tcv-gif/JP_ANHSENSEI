"use client";

import { useState } from "react";
import { BookOpen, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { KanjiExerciseDto } from "./KanjiLessonDetailView";

interface KanjiReadingSentencesViewProps {
  topicTitle: string;
  exercises: KanjiExerciseDto[];
}

export default function KanjiReadingSentencesView({ topicTitle, exercises }: KanjiReadingSentencesViewProps) {
  const [showReading, setShowReading] = useState<{ [key: number]: boolean }>({});

  const toggleShow = (id: number) => {
    setShowReading((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!exercises || exercises.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center text-[#76685F] border border-[#DED3C8]">
        Bài học này chưa có câu luyện đọc Kanji (漢字を読みましょう!).
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header Info */}
      <div className="bg-white border-2 border-[#DED3C8] rounded-3xl p-6 shadow-sm space-y-2">
        <span className="inline-block bg-[#FAF3EB] text-[#C65D4B] px-3 py-1 rounded-full text-xs font-bold border border-[#DED3C8]">
          📖 LUYỆN ĐỌC CÂU ỨNG DỤNG — {topicTitle}
        </span>
        <h3 className="text-xl font-black text-[#231917]">漢字を読みましょう! (Hãy đọc chữ Hán!)</h3>
        <p className="text-xs text-[#76685F]">
          Đọc các câu ứng dụng chứa Hán tự trong bài học. Nhấp nút xem để hiện cách đọc Furigana/Hiragana.
        </p>
      </div>

      {/* Sentences List */}
      <div className="space-y-4">
        {exercises.map((ex, idx) => (
          <div
            key={ex.exerciseId || idx}
            className="bg-[#FFFDF9] border-2 border-[#DED3C8] hover:border-[#C65D4B] rounded-2xl p-5 space-y-3 shadow-2xs transition-all"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="text-base sm:text-lg font-black text-[#231917] leading-relaxed">
                {ex.sentenceJp}
              </div>

              <button
                onClick={() => toggleShow(ex.exerciseId)}
                className="px-3 py-1.5 bg-[#FAF3EB] hover:bg-[#C65D4B] hover:text-white border border-[#DED3C8] text-[#8B6F5A] text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
              >
                {showReading[ex.exerciseId] ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> Ẩn Furigana
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Hiện Furigana
                  </>
                )}
              </button>
            </div>

            {showReading[ex.exerciseId] && (
              <div className="bg-[#FAF3EB] border border-[#DED3C8] rounded-xl p-3 text-xs font-extrabold text-[#C65D4B] flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  Chữ Hán: <strong className="text-[#231917]">{ex.targetKanji}</strong> ➔ Cách đọc Hiragana:{" "}
                  <strong className="underline">{ex.readingHiragana}</strong>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
