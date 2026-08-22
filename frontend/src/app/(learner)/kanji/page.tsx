"use client";

import { useState, useEffect } from "react";
import KanjiLearningItem, { LessonKanjiDto } from "@/components/learner/lesson/KanjiLearningItem";

export default function LearnerKanjiPage() {
  const [step, setStep] = useState<"level" | "lesson" | "study">("level");
  const [selectedLevel, setSelectedLevel] = useState("N5");
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [kanjis, setKanjis] = useState<LessonKanjiDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [learnedKeys, setLearnedKeys] = useState<Set<string>>(new Set());

  // Interactive 3D Kanji Card State
  const [isKanjiCardFlipped, setIsKanjiCardFlipped] = useState(false);

  const getLessonRange = (level: string) => {
    if (level === "N5") return Array.from({ length: 25 }, (_, i) => ({ id: i + 1, num: i + 1, topic: `Bài Hán Tự #${i + 1}` }));
    if (level === "N4") return Array.from({ length: 25 }, (_, i) => ({ id: i + 26, num: i + 26, topic: `Bài Hán Tự #${i + 26}` }));
    return Array.from({ length: 15 }, (_, i) => ({ id: i + 1, num: i + 1, topic: `Bài Hán Tự #${i + 1}` }));
  };

  const lessonList = getLessonRange(selectedLevel);

  useEffect(() => {
    if (step === "study" && selectedLesson) {
      const fetchKanji = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/v1/curriculum/lessons/${selectedLesson}/kanji`);
          if (res.ok) {
            const data = await res.json();
            setKanjis(data);
          }
        } catch (e) {
          console.error("Lỗi tải Hán tự Kanji:", e);
        } finally {
          setLoading(false);
        }
      };
      fetchKanji();
    }
  }, [step, selectedLesson]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 sm:p-10 text-[#2C2421]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-[#C65D4B] to-[#D98373] rounded-3xl p-8 text-white shadow-xl flex justify-between items-center relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
              ✍️ KHO HỌC LIỆU HÁN TỰ KANJI
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Hán Tự &amp; Quy Tắc Nét Vẽ</h1>
            <p className="text-white/90 text-sm max-w-xl">
              Học Kanji bài bản qua Thẻ 3D Flashcard, Âm On/Kun, Số nét và Mẹo nhớ tượng hình.
            </p>
          </div>
          <div className="hidden md:block text-8xl font-black opacity-20 select-none">
            漢字
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
                  Bài Hán Tự ({selectedLevel})
                </button>
              </>
            )}
            {step === "study" && (
              <>
                <span>/</span>
                <span className="text-[#C65D4B] font-extrabold">Hán Tự Bài #{selectedLesson}</span>
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
              Bước 1: Chọn Trình Độ Tiếng Nhật (Kanji)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { level: "N5", title: "Hán Tự Sơ Cấp N5", desc: "100 Kanji cơ bản (Số đếm, Ngày tháng, Bản thân)", count: "25 bài" },
                { level: "N4", title: "Hán Tự Sơ Cấp N4", desc: "300 Kanji thông dụng (Động từ, Tính từ, Đời sống)", count: "25 bài" },
                { level: "N3", title: "Hán Tự Trung Cấp N3", desc: "650 Kanji trung cấp & ghép từ phức tạp", count: "Chờ cập nhật" },
                { level: "N2", title: "Hán Tự Cao Cấp N2", desc: "1000 Kanji doanh nghiệp & đọc hiểu bài báo", count: "Chờ cập nhật" },
                { level: "N1", title: "Hán Tự Thượng Cấp N1", desc: "2000 Kanji chuyên sâu & tác phẩm văn học", count: "Chờ cập nhật" },
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
                    <span>Học Kanji {item.level} ➔</span>
                    <span className="w-8 h-8 rounded-full bg-[#FAF3EB] group-hover:bg-[#C65D4B] group-hover:text-white flex items-center justify-center transition-all">
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: SELECT LESSON GRID FOR KANJI */}
        {step === "lesson" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#231917] border-l-4 border-[#C65D4B] pl-3">
                Bước 2: Chọn Bài Học Kanji ({selectedLevel})
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
                    <span>Học Hán tự</span>
                    <span>➔</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: STUDY VIEW WITH 3D KANJI FLASHCARD & MNEMONICS */}
        {step === "study" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#DED3C8] p-5 rounded-2xl shadow-2xs">
              <div>
                <h2 className="text-xl font-extrabold text-[#231917]">
                  Hán Tự Kanji Bài #{selectedLesson} ({selectedLevel})
                </h2>
                <p className="text-xs text-[#76685F]">Tra cứu Hán tự, âm On/Kun, số nét vẽ và mẹo nhớ tượng hình</p>
              </div>

              <button
                onClick={() => setStep("lesson")}
                className="px-4 py-2 bg-[#FAF3EB] border border-[#DED3C8] hover:border-[#C65D4B] text-[#56423E] hover:text-[#C65D4B] text-xs font-bold rounded-xl transition-all"
              >
                ← Đổi Bài Học
              </button>
            </div>

            {/* INNOVATION: 3D KANJI FLASHCARD & MNEMONICS */}
            <div className="max-w-md mx-auto">
              <div className="text-center mb-3 text-xs font-bold text-[#8B6F5A]">
                🎴 THẺ NHỚ KANJI TƯỢNG HÌNH (Nhấp thẻ để lật)
              </div>
              <div
                onClick={() => setIsKanjiCardFlipped(!isKanjiCardFlipped)}
                className="w-full h-80 cursor-pointer select-none [perspective:1000px]"
              >
                <div
                  className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
                  style={{
                    transform: isKanjiCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front Side: Kanji Character & Stroke Count */}
                  <div className="absolute inset-0 w-full h-full bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-6 flex flex-col justify-between items-center text-center shadow-md [backface-visibility:hidden]">
                    <span className="bg-[#FAF3EB] text-[#C65D4B] border border-[#DED3C8] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      Kanji N5
                    </span>
                    <div className="space-y-1">
                      <h2 className="text-7xl font-sans font-black text-[#C65D4B]">
                        日
                      </h2>
                      <p className="text-xs font-bold text-[#76685F]">Âm Hán Việt: <span className="text-[#C65D4B]">NHẬT</span></p>
                    </div>
                    <span className="text-[11px] text-[#8B6F5A] font-semibold">
                      ✏️ 4 Nét vẽ • Bấm thẻ để xem âm On/Kun &amp; Mẹo nhớ
                    </span>
                  </div>

                  {/* Back Side: Onyomi, Kunyomi, Mnemonics Story */}
                  <div
                    className="absolute inset-0 w-full h-full bg-[#FAF3EB] border-2 border-[#C65D4B] rounded-3xl p-6 flex flex-col justify-between items-center text-center shadow-lg [backface-visibility:hidden]"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <span className="bg-[#C65D4B]/10 text-[#C65D4B] text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-[#C65D4B]/30">
                      Âm Đọc &amp; Mẹo Nhớ Tượng Hình
                    </span>

                    <div className="space-y-2 text-xs">
                      <div className="bg-white p-2.5 rounded-xl border border-[#DED3C8] space-y-1">
                        <p><strong className="text-[#C65D4B]">Âm On (Onyomi):</strong> ニチ, ジツ</p>
                        <p><strong className="text-[#C65D4B]">Âm Kun (Kunyomi):</strong> ひ, -か</p>
                      </div>

                      <div className="bg-amber-50 text-amber-900 p-2.5 rounded-xl border border-amber-200 text-left text-[11px]">
                        💡 <strong>Mẹo nhớ:</strong> Hình vuông có gạch ngang ở giữa tượng trưng cho ☀️ <strong>Mặt Trời</strong> chiếu sáng ban ngày.
                      </div>
                    </div>

                    <span className="text-[11px] text-[#8B6F5A] font-semibold">
                      Ví dụ ghép: 日本 (Nhật Bản), 毎日 (Mỗi ngày)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Display Grid */}
            {loading ? (
              <div className="text-center py-16 text-[#76685F]">Đang tải Hán tự Kanji Bài #{selectedLesson}...</div>
            ) : kanjis.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-[#76685F] border border-[#DED3C8]">
                Chưa có dữ liệu Hán tự Kanji cho Bài #{selectedLesson}.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {kanjis.map((k) => (
                  <KanjiLearningItem
                    key={k.kanjiId}
                    item={k}
                    isLearned={learnedKeys.has(`k_${k.kanjiId}`)}
                    onToggleLearned={() => {
                      setLearnedKeys((prev) => {
                        const u = new Set(prev);
                        if (u.has(`k_${k.kanjiId}`)) u.delete(`k_${k.kanjiId}`);
                        else u.add(`k_${k.kanjiId}`);
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
