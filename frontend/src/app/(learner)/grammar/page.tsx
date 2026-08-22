"use client";

import { useState, useEffect } from "react";
import GrammarLearningItem, { GrammarPointDto } from "@/components/learner/lesson/GrammarLearningItem";

export default function LearnerGrammarPage() {
  const [step, setStep] = useState<"level" | "lesson" | "study">("level");
  const [selectedLevel, setSelectedLevel] = useState("N5");
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [grammars, setGrammars] = useState<GrammarPointDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [learnedKeys, setLearnedKeys] = useState<Set<string>>(new Set());

  // Interactive Sentence Builder Game State
  const [builderWordBlocks, setBuilderWordBlocks] = useState<string[]>([]);
  const [userOrderedBlocks, setUserOrderedBlocks] = useState<string[]>([]);
  const [builderStatus, setBuilderStatus] = useState<"IDLE" | "CORRECT" | "WRONG">("IDLE");

  const targetSentenceBlocks = ["わたしは", "たなか", "です。"];

  const getLessonRange = (level: string) => {
    if (level === "N5") return Array.from({ length: 25 }, (_, i) => ({ id: i + 1, num: i + 1, topic: `Chuyên Đề Ngữ Pháp #${i + 1}` }));
    if (level === "N4") return Array.from({ length: 25 }, (_, i) => ({ id: i + 26, num: i + 26, topic: `Chuyên Đề Ngữ Pháp #${i + 26}` }));
    return Array.from({ length: 15 }, (_, i) => ({ id: i + 1, num: i + 1, topic: `Chuyên Đề Ngữ Pháp #${i + 1}` }));
  };

  const lessonList = getLessonRange(selectedLevel);

  useEffect(() => {
    setBuilderWordBlocks([...targetSentenceBlocks].sort(() => Math.random() - 0.5));
    setUserOrderedBlocks([]);
    setBuilderStatus("IDLE");
  }, [selectedLesson]);

  useEffect(() => {
    if (step === "study" && selectedLesson) {
      const fetchGrammar = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/v1/curriculum/lessons/${selectedLesson}/grammar`);
          if (res.ok) {
            const data = await res.json();
            setGrammars(data);
          }
        } catch (e) {
          console.error("Lỗi tải ngữ pháp:", e);
        } finally {
          setLoading(false);
        }
      };
      fetchGrammar();
    }
  }, [step, selectedLesson]);

  const handleSelectBlock = (block: string, idx: number) => {
    setUserOrderedBlocks((prev) => [...prev, block]);
    setBuilderWordBlocks((prev) => prev.filter((_, i) => i !== idx));
    setBuilderStatus("IDLE");
  };

  const handleRemoveBlock = (block: string, idx: number) => {
    setBuilderWordBlocks((prev) => [...prev, block]);
    setUserOrderedBlocks((prev) => prev.filter((_, i) => i !== idx));
    setBuilderStatus("IDLE");
  };

  const handleCheckBuilder = () => {
    const isCorrect = userOrderedBlocks.join("") === targetSentenceBlocks.join("");
    setBuilderStatus(isCorrect ? "CORRECT" : "WRONG");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 sm:p-10 text-[#2C2421]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-[#C65D4B] to-[#D98373] rounded-3xl p-8 text-white shadow-xl flex justify-between items-center relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
              🧩 KHO HỌC LIỆU NGỮ PHÁP TIẾNG NHẬT
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Cấu Trúc &amp; Mẫu Câu Ngữ Pháp</h1>
            <p className="text-white/90 text-sm max-w-xl">
              Hệ thống mẫu ngữ pháp phân tích trực quan dạng khối màu, ví dụ audio và Game lắp ghép câu.
            </p>
          </div>
          <div className="hidden md:block text-8xl font-black opacity-20 select-none">
            文法
          </div>
        </div>

        {/* Breadcrumb & Top Right Back Button Bar */}
        <div className="flex items-center justify-between bg-[#FAF3EB] border border-[#DED3C8] px-5 py-3 rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B6F5A]">
            <button onClick={() => setStep("level")} className="hover:text-[#C65D4B] transition-colors">
              Trình Độ ({selectedLevel})
            </button>
            {step !== "level" && (
              <>
                <span>/</span>
                <button onClick={() => setStep("lesson")} className="hover:text-[#C65D4B] transition-colors">
                  Bài Ngữ Pháp ({selectedLevel})
                </button>
              </>
            )}
            {step === "study" && (
              <>
                <span>/</span>
                <span className="text-[#C65D4B] font-extrabold">Ngữ Pháp Bài #{selectedLesson}</span>
              </>
            )}
          </div>

          <button
            onClick={() => {
              if (step === "study") setStep("lesson");
              else if (step === "lesson") setStep("level");
              else window.location.href = "/dashboard";
            }}
            className="px-4 py-2 bg-[#FFFDF9] hover:bg-[#C65D4B] border border-[#DED3C8] hover:border-[#C65D4B] text-[#56423E] hover:text-white font-extrabold text-xs rounded-xl transition-all shadow-2xs"
          >
            Quay lại
          </button>
        </div>

        {/* STEP 1: SELECT LEVEL */}
        {step === "level" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-[#231917] border-l-4 border-[#C65D4B] pl-3">
              Bước 1: Chọn Trình Độ Tiếng Nhật (Ngữ Pháp)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { level: "N5", title: "Ngữ Pháp Sơ Cấp N5", desc: "Các mẫu câu khẳng định, nghi vấn, trợ từ は, の, に, で", count: "25 bài" },
                { level: "N4", title: "Ngữ Pháp Sơ Cấp N4", desc: "Thể て, Thể ý định, Thể bị động, Thể sai khiến", count: "25 bài" },
                { level: "N3", title: "Ngữ Pháp Trung Cấp N3", desc: "Cấu trúc so sánh, điều kiện và sắc thái biểu cảm", count: "Chờ cập nhật" },
                { level: "N2", title: "Ngữ Pháp Cao Cấp N2", desc: "Văn phong doanh nghiệp & diễn đạt tinh tế", count: "Chờ cập nhật" },
                { level: "N1", title: "Ngữ Pháp Thượng Cấp N1", desc: "Văn phong báo chí & chính luận Nhật Bản", count: "Chờ cập nhật" },
              ].map((item) => (
                <div
                  key={item.level}
                  onClick={() => {
                    setSelectedLevel(item.level);
                    if (item.level === "N5") setSelectedLesson(1);
                    else if (item.level === "N4") setSelectedLesson(26);
                    else setSelectedLesson(1);
                    setStep("lesson");
                  }}
                  className="group bg-white rounded-3xl border-2 border-[#DED3C8] p-6 shadow-sm hover:border-[#C65D4B] hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-black text-[#C65D4B] bg-[#FAF3EB] px-4 py-1.5 rounded-2xl border border-[#DED3C8]">
                        {item.level}
                      </span>
                      <span className="text-xs font-bold bg-[#FAF3EB] text-[#8B6F5A] px-3 py-1 rounded-full border border-[#DED3C8]">
                        {item.count}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#231917] group-hover:text-[#C65D4B] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#76685F] mt-1">{item.desc}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#DED3C8]/60 flex justify-between items-center text-xs font-bold text-[#C65D4B]">
                    <span>Chọn Ngữ Pháp {item.level} ➔</span>
                    <span className="w-8 h-8 rounded-full bg-[#FAF3EB] group-hover:bg-[#C65D4B] group-hover:text-white flex items-center justify-center transition-all">
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: SELECT LESSON GRID FOR GRAMMAR */}
        {step === "lesson" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#231917] border-l-4 border-[#C65D4B] pl-3">
                Bước 2: Chọn Bài Học Ngữ Pháp ({selectedLevel})
              </h2>
              <button
                onClick={() => setStep("level")}
                className="text-xs font-bold text-[#C65D4B] hover:underline"
              >
                ← Đổi trình độ khác
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {lessonList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedLesson(item.id);
                    setStep("study");
                  }}
                  className="bg-white hover:bg-[#FAF3EB] border-2 border-[#DED3C8] hover:border-[#C65D4B] rounded-2xl p-5 text-center cursor-pointer shadow-2xs hover:shadow-md transition-all flex flex-col justify-between items-center space-y-3 group min-h-[150px]"
                >
                  <span className="inline-block text-xs font-black text-[#C65D4B] bg-[#FAF3EB] group-hover:bg-white px-3 py-1 rounded-full border border-[#DED3C8]">
                    Bài #{item.num}
                  </span>

                  <h4 className="text-xs font-extrabold text-[#231917] group-hover:text-[#C65D4B] leading-snug">
                    {item.topic}
                  </h4>

                  <div className="pt-2 border-t border-[#DED3C8]/40 w-full text-[11px] font-bold text-[#8B6F5A] group-hover:text-[#C65D4B] flex items-center justify-center gap-1">
                    <span>Học ngữ pháp</span>
                    <span>➔</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: STUDY VIEW WITH INNOVATIVE FEATURES */}
        {step === "study" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#DED3C8] p-5 rounded-2xl shadow-2xs">
              <div>
                <h2 className="text-xl font-extrabold text-[#231917]">
                  Ngữ Pháp Bài #{selectedLesson} ({selectedLevel})
                </h2>
                <p className="text-xs text-[#76685F]">Giải thích cấu trúc ngữ pháp &amp; ví dụ audio minh họa</p>
              </div>

              <button
                onClick={() => setStep("lesson")}
                className="px-4 py-2 bg-[#FAF3EB] border border-[#DED3C8] hover:border-[#C65D4B] text-[#56423E] hover:text-[#C65D4B] text-xs font-bold rounded-xl transition-all"
              >
                ← Đổi Bài Học
              </button>
            </div>

            {/* INNOVATION 1: INTERACTIVE SENTENCE BUILDER GAME */}
            <div className="bg-[#FFFDF9] border-2 border-[#C65D4B]/40 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-[#DED3C8] pb-3">
                <span className="bg-[#C65D4B]/10 text-[#C65D4B] text-xs font-bold px-3 py-1 rounded-full uppercase border border-[#C65D4B]/30">
                  🎮 Game Luyện Tương Tác: Lắp Ghép Câu Ngữ Pháp
                </span>
                <span className="text-xs text-[#8B6F5A] font-semibold">Tự hoàn thành câu: "Tôi là Tanaka."</span>
              </div>

              {/* Answer Slot Box */}
              <div className="min-h-[60px] bg-[#FAF3EB] border-2 border-dashed border-[#DED3C8] rounded-2xl p-3 flex flex-wrap items-center gap-2">
                {userOrderedBlocks.length === 0 ? (
                  <span className="text-xs text-[#8B6F5A] italic">Nhấp các khối từ bên dưới để xếp câu chuẩn...</span>
                ) : (
                  userOrderedBlocks.map((block, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRemoveBlock(block, idx)}
                      className="bg-[#C65D4B] text-white text-xs font-jp font-bold px-3 py-2 rounded-xl shadow-xs hover:bg-rose-700 transition-all"
                    >
                      {block} ✕
                    </button>
                  ))
                )}
              </div>

              {/* Pool Word Blocks */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                {builderWordBlocks.map((block, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectBlock(block, idx)}
                    className="bg-white border-2 border-[#DED3C8] hover:border-[#C65D4B] text-[#231917] font-jp text-xs font-bold px-4 py-2 rounded-xl shadow-2xs hover:shadow-xs transition-all"
                  >
                    + {block}
                  </button>
                ))}
              </div>

              {/* Game Controls & Feedback */}
              <div className="flex items-center justify-between pt-2">
                {builderStatus === "CORRECT" && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300">
                    🎉 Chuẩn xác! わたしはたなかです。(Tôi là Tanaka)
                  </span>
                )}
                {builderStatus === "WRONG" && (
                  <span className="text-xs font-bold text-red-800 bg-red-100 px-3 py-1.5 rounded-xl border border-red-300">
                    ⚠️ Thử lại nhé! Đáp án đúng: わたしは + たなか + です。
                  </span>
                )}
                {builderStatus === "IDLE" && <div />}

                <button
                  onClick={handleCheckBuilder}
                  disabled={userOrderedBlocks.length === 0}
                  className="px-5 py-2 bg-[#C65D4B] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#a84c3c] disabled:opacity-50 transition-all"
                >
                  Kiểm Tra Câu
                </button>
              </div>
            </div>

            {/* Content Display */}
            {loading ? (
              <div className="text-center py-16 text-[#76685F]">Đang tải cấu trúc ngữ pháp Bài #{selectedLesson}...</div>
            ) : grammars.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-[#76685F] border border-[#DED3C8]">
                Chưa có dữ liệu cấu trúc ngữ pháp cho Bài #{selectedLesson}.
              </div>
            ) : (
              <div className="space-y-6">
                {grammars.map((g) => (
                  <GrammarLearningItem
                    key={g.grammarId}
                    item={g}
                    isLearned={learnedKeys.has(`g_${g.grammarId}`)}
                    onToggleLearned={() => {
                      setLearnedKeys((prev) => {
                        const u = new Set(prev);
                        if (u.has(`g_${g.grammarId}`)) u.delete(`g_${g.grammarId}`);
                        else u.add(`g_${g.grammarId}`);
                        return u;
                      });
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
