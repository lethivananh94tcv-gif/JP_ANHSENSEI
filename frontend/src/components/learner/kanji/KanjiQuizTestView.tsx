"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Trophy, RefreshCw, HelpCircle } from "lucide-react";
import { KanjiExerciseDto } from "./KanjiLessonDetailView";

interface KanjiQuizTestViewProps {
  topicTitle: string;
  tests: KanjiExerciseDto[];
}

export default function KanjiQuizTestView({ topicTitle, tests }: KanjiQuizTestViewProps) {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!tests || tests.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center text-[#76685F] border border-[#DED3C8]">
        Bài học này chưa có câu hỏi Test trắc nghiệm (テスト).
      </div>
    );
  }

  const handleSelectOption = (exerciseId: number, optionIdx: number) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [exerciseId]: optionIdx }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    tests.forEach((t) => {
      if (userAnswers[t.exerciseId] === t.correctOption) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header Info */}
      <div className="bg-white border-2 border-[#DED3C8] rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="inline-block bg-[#FAF3EB] text-[#C65D4B] px-3 py-1 rounded-full text-xs font-bold border border-[#DED3C8] mb-1">
            📝 BÀI KIỂM TRA TRẮC NGHIỆM
          </span>
          <h3 className="text-xl font-black text-[#231917]">テスト (Test Trắc Nghiệm — {topicTitle})</h3>
          <p className="text-xs text-[#76685F]">
            Chọn cách đọc Furigana/Hiragana chính xác nhất cho chữ Hán trong câu
          </p>
        </div>

        {submitted && (
          <div className="bg-[#FAF3EB] border border-[#C65D4B] px-4 py-2 rounded-2xl text-center">
            <span className="text-[10px] font-bold text-[#8B6F5A]">KẾT QUẢ TEST</span>
            <div className="text-xl font-black text-[#C65D4B]">
              {score} / {tests.length} Đúng
            </div>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {tests.map((t, qIdx) => {
          let parsedOptions: string[] = [];
          try {
            if (t.optionsJson) {
              parsedOptions = JSON.parse(t.optionsJson);
            }
          } catch (e) {
            console.error("Lỗi parse JSON options:", e);
          }

          const selected = userAnswers[t.exerciseId];
          const isCorrect = selected === t.correctOption;

          return (
            <div
              key={t.exerciseId || qIdx}
              className="bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FAF3EB] border border-[#DED3C8] text-[#C65D4B] font-extrabold text-xs flex items-center justify-center shrink-0">
                  #{qIdx + 1}
                </span>
                <div className="text-base font-black text-[#231917]">{t.sentenceJp}</div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {parsedOptions.map((optStr, oIdx) => {
                  const optionNum = oIdx + 1;
                  const isThisSelected = selected === optionNum;
                  const isThisCorrectOption = t.correctOption === optionNum;

                  let optionStyle = "bg-white border-[#DED3C8] text-[#231917] hover:border-[#C65D4B]";
                  if (submitted) {
                    if (isThisCorrectOption) {
                      optionStyle = "bg-green-50 border-green-500 text-green-900 font-bold";
                    } else if (isThisSelected && !isCorrect) {
                      optionStyle = "bg-red-50 border-red-500 text-red-900 line-through";
                    }
                  } else if (isThisSelected) {
                    optionStyle = "bg-[#FAF3EB] border-[#C65D4B] text-[#C65D4B] font-bold shadow-2xs";
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(t.exerciseId, optionNum)}
                      disabled={submitted}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left text-xs transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <span>{optStr}</span>
                      {submitted && isThisCorrectOption && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                      {submitted && isThisSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit / Retry Actions */}
      <div className="pt-4 flex justify-center">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(userAnswers).length === 0}
            className="px-8 py-3.5 bg-[#C65D4B] hover:bg-[#b04f3f] disabled:opacity-50 text-white font-extrabold text-xs rounded-2xl shadow-lg transition-all"
          >
            Nộp bài & Chấm điểm ➔
          </button>
        ) : (
          <button
            onClick={handleRetry}
            className="px-8 py-3.5 bg-[#FAF3EB] hover:bg-[#C65D4B] hover:text-white border border-[#DED3C8] text-[#8B6F5A] font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Làm lại bài test
          </button>
        )}
      </div>
    </div>
  );
}
