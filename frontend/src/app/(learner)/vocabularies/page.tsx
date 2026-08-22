"use client";

import { useState, useEffect, useMemo } from "react";
import VocabularyLearningItem, { VocabularyDto } from "@/components/learner/lesson/VocabularyLearningItem";
import FlashcardStudyMode from "@/components/learner/lesson/FlashcardStudyMode";
import TypingStudyMode from "@/components/learner/lesson/TypingStudyMode";

const LESSON_TITLES_MAP: Record<number, { full: string; topic: string }> = {
  1: { full: "Bài 1: Giới thiệu bản thân & Chào hỏi", topic: "Giới thiệu bản thân & Chào hỏi" },
  2: { full: "Bài 2: Đồ vật & Chỉ định từ (これ・それ)", topic: "Đồ vật & Chỉ định từ" },
  3: { full: "Bài 3: Nơi chốn & Phương hướng (ここ・そこ)", topic: "Nơi chốn & Phương hướng" },
  4: { full: "Bài 4: Thời gian & Giờ giấc (今～時です)", topic: "Thời gian & Giờ giấc" },
  5: { full: "Bài 5: Đi lại & Phương tiện (～へ行きます)", topic: "Đi lại & Phương tiện" },
  6: { full: "Bài 6: Hành động & Ngoại động từ (～をします)", topic: "Hành động & Ngoại động từ" },
  7: { full: "Bài 7: Công cụ & Cho nhận quà (あげます)", topic: "Công cụ & Cho nhận quà" },
  8: { full: "Bài 8: Tính từ & Miêu tả (い・な形容詞)", topic: "Tính từ & Miêu tả đặc điểm" },
  9: { full: "Bài 9: Sở thích & Năng lực (～が好きです)", topic: "Sở thích & Năng lực" },
  10: { full: "Bài 10: Tồn tại & Vị trí (～があります/います)", topic: "Tồn tại & Vị trí không gian" },
  11: { full: "Bài 11: Số lượng & Cách đếm đồ vật", topic: "Số lượng & Cách đếm đồ vật" },
  12: { full: "Bài 12: Quá khứ & So sánh (～より～)", topic: "Quá khứ & So sánh hơn/nhất" },
  13: { full: "Bài 13: Mong muốn & Muốn làm (～たいです)", topic: "Mong muốn & Muốn làm" },
  14: { full: "Bài 14: Thể Te & Nhờ vả (～てください)", topic: "Thể Te & Nhờ vả lịch sự" },
  15: { full: "Bài 15: Cho phép & Cấm đoán (～てもいい)", topic: "Cho phép & Cấm đoán" },
  16: { full: "Bài 16: Trình tự hành động (～てから)", topic: "Trình tự hành động nối tiếp" },
  17: { full: "Bài 17: Thể Nai & Bắt buộc (～なければ)", topic: "Thể Nai & Nghĩa vụ bắt buộc" },
  18: { full: "Bài 18: Thể Nguyên dạng & Khả năng", topic: "Thể Nguyên dạng & Khả năng" },
  19: { full: "Bài 19: Thể Ta & Kinh nghiệm", topic: "Thể Ta & Kinh nghiệm đã từng" },
  20: { full: "Bài 20: Thể Thông thường (普通形)", topic: "Thể Thông thường (Futsuu)" },
  21: { full: "Bài 21: Ý kiến & Trích dẫn (～と思います)", topic: "Ý kiến & Trích dẫn suy nghĩ" },
  22: { full: "Bài 22: Mệnh đề bổ nghĩa danh từ", topic: "Mệnh đề bổ nghĩa danh từ" },
  23: { full: "Bài 23: Khi nào & Điều kiện tự nhiên", topic: "Thời điểm Khi nào & Tự nhiên" },
  24: { full: "Bài 24: Cho nhận hành động (～てあげます)", topic: "Cho & Nhận hành động giúp đỡ" },
  25: { full: "Bài 25: Điều kiện Tara & Mặc dù", topic: "Giả định Điều kiện Tara" },
  26: { full: "Bài 26: Giải thích lý do (～んです)", topic: "Giải thích lý do & Nhấn mạnh" },
  27: { full: "Bài 27: Động từ Khả năng (可能形)", topic: "Động từ Thể Khả năng" },
  28: { full: "Bài 28: Vừa làm vừa & Thói quen", topic: "Vừa làm vừa & Thói quen" },
  29: { full: "Bài 29: Trạng thái kết quả (～てしまいました)", topic: "Trạng thái kết quả & Nuối tiếc" },
  30: { full: "Bài 30: Chuẩn bị & Sắp đặt (～ておきます)", topic: "Chuẩn bị & Sắp đặt sẵn" },
  31: { full: "Bài 31: Thể Ý định Volitional (意向形)", topic: "Thể Ý định & Dự định" },
  32: { full: "Bài 32: Khuyên bảo & Phỏng đoán", topic: "Lời Khuyên nên/không nên" },
  33: { full: "Bài 33: Mệnh lệnh & Cấm đoán", topic: "Thể Mệnh lệnh & Cấm đoán" },
  34: { full: "Bài 34: Theo như & Sau khi làm", topic: "Làm Theo như & Sau khi" },
  35: { full: "Bài 35: Thể Điều kiện Ba (条件形)", topic: "Thể Điều kiện Ba (Ba-kei)" },
  36: { full: "Bài 36: Cố gắng & Thay đổi trạng thái", topic: "Cố gắng tạo thói quen" },
  37: { full: "Bài 37: Thể Bị động (受身形)", topic: "Thể Bị động (Ukemi)" },
  38: { full: "Bài 38: Danh từ hóa động từ (～のは)", topic: "Danh từ hóa động từ" },
  39: { full: "Bài 39: Nguyên nhân & Lý do (～て/ので)", topic: "Nguyên nhân & Lý do" },
  40: { full: "Bài 40: Nghi vấn từ trong câu", topic: "Nghi vấn từ lồng vào câu" },
  41: { full: "Bài 41: Cho và Nhận Kính ngữ", topic: "Cho & Nhận Kính ngữ" },
  42: { full: "Bài 42: Mục đích (～ために)", topic: "Mục đích thực hiện" },
  43: { full: "Bài 43: Dự đoán & Trông có vẻ", topic: "Dự đoán & Trông có vẻ" },
  44: { full: "Bài 44: Quá mức & Dễ/Khó làm", topic: "Quá mức & Dễ/Khó làm" },
  45: { full: "Bài 45: Trường hợp (～ばあいは)", topic: "Trường hợp giả định" },
  46: { full: "Bài 46: Vừa mới làm xong (～ところ)", topic: "Vừa mới thực hiện xong" },
  47: { full: "Bài 47: Nghe nói & Hình như", topic: "Nghe nói lại & Hình như" },
  48: { full: "Bài 48: Thể Sai khiến (使役形)", topic: "Thể Sai khiến (Shiyeki)" },
  49: { full: "Bài 49: Tôn kính ngữ (尊敬語)", topic: "Tôn kính ngữ (Sonkeigo)" },
  50: { full: "Bài 50: Khiêm nhường ngữ (謙譲語)", topic: "Khiêm nhường ngữ (Kenjougo)" },
};

export default function LearnerVocabulariesPage() {
  const [step, setStep] = useState<"level" | "lesson" | "study">("level");
  const [selectedLevel, setSelectedLevel] = useState("N5");
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [studyMode, setStudyMode] = useState<"list" | "flashcard" | "typing">("list");
  const [vocabularies, setVocabularies] = useState<VocabularyDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [learnedKeys, setLearnedKeys] = useState<Set<string>>(new Set());

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterState, setFilterState] = useState<"all" | "unlearned" | "learned">("all");

  const getLessonRange = (level: string) => {
    if (level === "N5") return Array.from({ length: 25 }, (_, i) => ({ id: i + 1, num: i + 1, info: LESSON_TITLES_MAP[i + 1] || { full: `Bài #${i + 1}`, topic: `Bài #${i + 1}` } }));
    if (level === "N4") return Array.from({ length: 25 }, (_, i) => ({ id: i + 26, num: i + 26, info: LESSON_TITLES_MAP[i + 26] || { full: `Bài #${i + 26}`, topic: `Bài #${i + 26}` } }));
    return Array.from({ length: 15 }, (_, i) => ({ id: i + 1, num: i + 1, info: { full: `Bài #${i + 1}`, topic: `Bài #${i + 1}` } }));
  };

  const lessonList = getLessonRange(selectedLevel);

  useEffect(() => {
    if (step === "study" && selectedLesson) {
      const fetchVocab = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/v1/curriculum/lessons/${selectedLesson}/vocabularies`);
          if (res.ok) {
            const data = await res.json();
            setVocabularies(data);
          }
        } catch (e) {
          console.error("Lỗi tải từ vựng:", e);
        } finally {
          setLoading(false);
        }
      };
      fetchVocab();
    }
  }, [step, selectedLesson]);

  // Filtered & Searched Vocabularies
  const filteredVocabularies = useMemo(() => {
    return vocabularies.filter((v) => {
      const isLearned = learnedKeys.has(`v_${v.vocabularyId}`);
      if (filterState === "learned" && !isLearned) return false;
      if (filterState === "unlearned" && isLearned) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        (v.word && v.word.toLowerCase().includes(q)) ||
        (v.kana && v.kana.toLowerCase().includes(q)) ||
        (v.meaningVi && v.meaningVi.toLowerCase().includes(q)) ||
        (v.kanjiForm && v.kanjiForm.toLowerCase().includes(q))
      );
    });
  }, [vocabularies, learnedKeys, filterState, searchQuery]);

  const learnedCount = useMemo(() => {
    return vocabularies.filter((v) => learnedKeys.has(`v_${v.vocabularyId}`)).length;
  }, [vocabularies, learnedKeys]);

  const progressPercent = useMemo(() => {
    if (vocabularies.length === 0) return 0;
    return Math.round((learnedCount / vocabularies.length) * 100);
  }, [learnedCount, vocabularies.length]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 sm:p-10 text-[#2C2421]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-[#C65D4B] to-[#D98373] rounded-3xl p-8 text-white shadow-xl flex justify-between items-center relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
              📚 KHO HỌC LIỆU TỪ VỰNG TIẾNG NHẬT
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Tra Cứu &amp; Luyện Tập Từ Vựng</h1>
            <p className="text-white/90 text-sm max-w-xl">
              Học từ vựng bài bản theo lộ trình 3 bước với Thẻ ghi nhớ 3D Quizlet và Chế độ Luyện gõ.
            </p>
          </div>
          <div className="hidden md:block text-8xl font-black opacity-20 select-none">
            単語
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
                  Bài Học ({selectedLevel})
                </button>
              </>
            )}
            {step === "study" && (
              <>
                <span>/</span>
                <span className="text-[#C65D4B] font-extrabold">{LESSON_TITLES_MAP[selectedLesson]?.full || `Bài #${selectedLesson}`}</span>
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
              Bước 1: Chọn Trình Độ Tiếng Nhật
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { level: "N5", title: "Trình Độ Sơ Cấp N5", desc: "25 Bài học Minna no Nihongo sơ cấp 1", count: "45 từ/bài" },
                { level: "N4", title: "Trình Độ Sơ Cấp N4", desc: "25 Bài học Minna no Nihongo sơ cấp 2", count: "40 từ/bài" },
                { level: "N3", title: "Trình Độ Trung Cấp N3", desc: "Từ vựng trung cấp giao tiếp tự nhiên", count: "Chờ cập nhật" },
                { level: "N2", title: "Trình Độ Cao Cấp N2", desc: "Từ vựng làm việc tại doanh nghiệp Nhật", count: "Chờ cập nhật" },
                { level: "N1", title: "Trình Độ Thượng Cấp N1", desc: "Từ vựng chuyên sâu & báo chí Nhật", count: "Chờ cập nhật" },
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
                    <span>Chọn Trình Độ {item.level} ➔</span>
                    <span className="w-8 h-8 rounded-full bg-[#FAF3EB] group-hover:bg-[#C65D4B] group-hover:text-white flex items-center justify-center transition-all">
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: SELECT LESSON GRID (5 COLUMNS CENTERED CARDS) */}
        {step === "lesson" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#231917] border-l-4 border-[#C65D4B] pl-3">
                Bước 2: Chọn Bài Học ({selectedLevel})
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
                  className="bg-white hover:bg-[#FAF3EB] border-2 border-[#DED3C8] hover:border-[#C65D4B] rounded-2xl p-5 text-center cursor-pointer shadow-2xs hover:shadow-md transition-all flex flex-col justify-between items-center space-y-3 group min-h-[160px]"
                >
                  <span className="inline-block text-xs font-black text-[#C65D4B] bg-[#FAF3EB] group-hover:bg-white px-3 py-1 rounded-full border border-[#DED3C8]">
                    Bài #{item.num}
                  </span>

                  <h4 className="text-xs font-extrabold text-[#231917] group-hover:text-[#C65D4B] leading-snug line-clamp-2 px-1">
                    {item.info.topic}
                  </h4>

                  <div className="pt-2 border-t border-[#DED3C8]/40 w-full text-[11px] font-bold text-[#8B6F5A] group-hover:text-[#C65D4B] flex items-center justify-center gap-1">
                    <span>Vào học từ vựng</span>
                    <span>➔</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: STUDY VIEW WITH SEARCH, FILTER & PROGRESS */}
        {step === "study" && (
          <div className="space-y-6 animate-fade-in">
            {/* Header & Progress Card */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white border-2 border-[#DED3C8] p-6 rounded-3xl shadow-2xs">
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-[#231917]">
                  {LESSON_TITLES_MAP[selectedLesson]?.full || `Bài #${selectedLesson}`} ({selectedLevel})
                </h2>
                <p className="text-xs text-[#76685F]">
                  Đã thuộc <strong className="text-[#C65D4B]">{learnedCount}</strong> / {vocabularies.length} từ vựng
                </p>
              </div>

              {/* Progress Bar & Quick Action */}
              <div className="w-full md:w-72 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[#8B6F5A]">Tiến độ bài học</span>
                  <span className="text-[#C65D4B]">{progressPercent}%</span>
                </div>
                <div className="w-full h-3 bg-[#FAF3EB] rounded-full overflow-hidden border border-[#DED3C8]">
                  <div
                    className="h-full bg-[#C65D4B] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Smart Search & 3-State Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF3EB] border border-[#DED3C8] p-4 rounded-2xl">
              {/* Search Input */}
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Tìm từ vựng (Tiếng Nhật / Việt)..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#DED3C8] focus:border-[#C65D4B] rounded-xl text-xs font-semibold outline-hidden text-[#231917]"
                />
                <span className="absolute left-3 top-2.5 text-xs text-[#8B6F5A]">🔍</span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                <button
                  onClick={() => setFilterState("all")}
                  className={`px-3.5 py-1.5 text-xs font-extrabold rounded-xl transition-all border ${
                    filterState === "all"
                      ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-2xs"
                      : "bg-white text-[#76685F] border-[#DED3C8] hover:border-[#C65D4B]"
                  }`}
                >
                  🌐 Tất cả ({vocabularies.length})
                </button>
                <button
                  onClick={() => setFilterState("unlearned")}
                  className={`px-3.5 py-1.5 text-xs font-extrabold rounded-xl transition-all border ${
                    filterState === "unlearned"
                      ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                      : "bg-white text-[#76685F] border-[#DED3C8] hover:border-amber-500"
                  }`}
                >
                  ⏳ Chưa thuộc ({vocabularies.length - learnedCount})
                </button>
                <button
                  onClick={() => setFilterState("learned")}
                  className={`px-3.5 py-1.5 text-xs font-extrabold rounded-xl transition-all border ${
                    filterState === "learned"
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                      : "bg-white text-[#76685F] border-[#DED3C8] hover:border-emerald-500"
                  }`}
                >
                  ✓ Đã thuộc ({learnedCount})
                </button>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center justify-between bg-[#FAF3EB] border border-[#DED3C8] p-1.5 rounded-2xl">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setStudyMode("list")}
                  className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all ${
                    studyMode === "list"
                      ? "bg-[#C65D4B] text-white shadow-xs"
                      : "text-[#76685F] hover:text-[#231917]"
                  }`}
                >
                  📋 Xem Danh sách ({filteredVocabularies.length})
                </button>
                <button
                  onClick={() => setStudyMode("flashcard")}
                  className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all ${
                    studyMode === "flashcard"
                      ? "bg-[#C65D4B] text-white shadow-xs"
                      : "text-[#76685F] hover:text-[#231917]"
                  }`}
                >
                  🎴 Flashcard Quizlet
                </button>
                <button
                  onClick={() => setStudyMode("typing")}
                  className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all ${
                    studyMode === "typing"
                      ? "bg-[#C65D4B] text-white shadow-xs"
                      : "text-[#76685F] hover:text-[#231917]"
                  }`}
                >
                  ⌨️ Luyện gõ Tiếng Nhật
                </button>
              </div>
            </div>

            {/* Content Display */}
            {loading ? (
              <div className="text-center py-16 text-[#76685F]">Đang tải từ vựng...</div>
            ) : filteredVocabularies.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-[#76685F] border border-[#DED3C8]">
                Không tìm thấy từ vựng nào khớp với bộ lọc/tìm kiếm.
              </div>
            ) : studyMode === "list" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredVocabularies.map((v) => (
                  <VocabularyLearningItem
                    key={v.vocabularyId}
                    item={v}
                    isLearned={learnedKeys.has(`v_${v.vocabularyId}`)}
                    onToggleLearned={() => {
                      setLearnedKeys((prev) => {
                        const u = new Set(prev);
                        if (u.has(`v_${v.vocabularyId}`)) u.delete(`v_${v.vocabularyId}`);
                        else u.add(`v_${v.vocabularyId}`);
                        return u;
                      });
                    }}
                  />
                ))}
              </div>
            ) : studyMode === "flashcard" ? (
              <FlashcardStudyMode vocabularies={filteredVocabularies} />
            ) : (
              <TypingStudyMode vocabularies={filteredVocabularies} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
