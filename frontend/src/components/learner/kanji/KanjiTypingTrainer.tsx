import { useState, useEffect, useRef } from "react";
import { CheckCircle2, XCircle, RefreshCw, Trophy, Sparkles, Keyboard } from "lucide-react";
import { KanjiTopicItemDto } from "./KanjiLessonDetailView";
import { apiClient } from "@/lib/api/client";

interface KanjiTypingTrainerProps {
  topicId: number;
  topicTitle: string;
  items: KanjiTopicItemDto[];
  onFinish?: () => void;
}

export default function KanjiTypingTrainer({ topicId, topicTitle, items, onFinish }: KanjiTypingTrainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentItem = items[currentIndex];

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentIndex, isCompleted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || !currentItem) return;

    try {
      const res = await apiClient<any>(`/learning/kanji/topics/${topicId}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kanjiId: currentItem.kanjiId,
          inputRomaji: inputVal,
        }),
      });

      const payload = res?.data || res;
      if (payload && payload.correct) {
        setStatus("SUCCESS");
        setMessage("🎉 Đúng rồi! " + (payload.matchedReading ? `(Romaji: ${payload.matchedReading})` : ""));
          setScore((prev) => prev + 1);

          setTimeout(() => {
            if (currentIndex + 1 < items.length) {
              setCurrentIndex((prev) => prev + 1);
              setInputVal("");
              setStatus("IDLE");
              setMessage("");
            } else {
              setIsCompleted(true);
            }
          }, 1200);
        } else {
          setStatus("ERROR");
          setMessage("❌ Chưa chính xác, hãy thử lại nhé!");
        }
    } catch (err) {
      console.error("Lỗi xác minh gõ Romaji:", err);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setInputVal("");
    setStatus("IDLE");
    setScore(0);
    setMessage("");
    setIsCompleted(false);
  };

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center text-[#76685F] border border-[#DED3C8]">
        Bài học này chưa có dữ liệu Kanji để luyện gõ.
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="bg-[#FFFDF9] border-2 border-[#C65D4B] rounded-3xl p-8 max-w-lg mx-auto text-center space-y-6 shadow-xl animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-[#FAF3EB] text-[#C65D4B] border-2 border-[#C65D4B] mx-auto flex items-center justify-center">
          <Trophy className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-[#231917]">Hoàn Thành Luyện Gõ!</h3>
          <p className="text-xs text-[#76685F]">
            Bạn đã hoàn thành gõ nhận diện mặt chữ Kanji bài <strong className="text-[#C65D4B]">{topicTitle}</strong>.
          </p>
        </div>

        <div className="bg-[#FAF3EB] border border-[#DED3C8] p-4 rounded-2xl flex justify-around items-center">
          <div>
            <div className="text-2xl font-black text-[#C65D4B]">{score}/{items.length}</div>
            <div className="text-[10px] font-bold text-[#8B6F5A]">Điểm số</div>
          </div>
          <div>
            <div className="text-2xl font-black text-[#C65D4B]">100%</div>
            <div className="text-[10px] font-bold text-[#8B6F5A]">Độ hoàn thành</div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3 bg-[#C65D4B] hover:bg-[#b04f3f] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Luyện tập lại từ đầu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex justify-between items-center bg-white border border-[#DED3C8] px-5 py-3 rounded-2xl shadow-2xs text-xs font-bold">
        <span className="text-[#8B6F5A] flex items-center gap-1.5">
          <Keyboard className="w-4 h-4 text-[#C65D4B]" /> LUYỆN GÕ ROMAJI — {topicTitle}
        </span>
        <span className="bg-[#FAF3EB] text-[#C65D4B] px-3 py-1 rounded-full border border-[#DED3C8]">
          Câu {currentIndex + 1} / {items.length}
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-8 text-center space-y-6 shadow-md relative overflow-hidden">
        <div className="space-y-2">
          <span className="bg-[#FAF3EB] text-[#8B6F5A] border border-[#DED3C8] text-[10px] font-bold px-3 py-1 rounded-full">
            ✏️ HÁN TỰ KANJI #{currentIndex + 1}
          </span>
          <h2 className="text-7xl font-sans font-black text-[#C65D4B] py-2">
            {currentItem.character}
          </h2>
          <p className="text-sm font-black text-[#231917]">
            Âm Hán Việt: <span className="text-[#C65D4B]">{currentItem.meaningVi}</span>
          </p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (status !== "IDLE") setStatus("IDLE");
              }}
              placeholder="Gõ Romaji (ví dụ: hitori, ichi)..."
              className={`w-full text-center py-3.5 px-4 text-base font-black rounded-2xl border-2 outline-none transition-all ${
                status === "SUCCESS"
                  ? "bg-green-50 border-green-500 text-green-800"
                  : status === "ERROR"
                  ? "bg-red-50 border-red-500 text-red-800 animate-shake"
                  : "bg-white border-[#DED3C8] focus:border-[#C65D4B] text-[#231917]"
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#C65D4B] hover:bg-[#b04f3f] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            Kiểm tra đáp án ➔
          </button>
        </form>

        {/* Feedback Message */}
        {message && (
          <div
            className={`p-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 border ${
              status === "SUCCESS"
                ? "bg-green-100 border-green-300 text-green-900"
                : "bg-red-100 border-red-300 text-red-900"
            }`}
          >
            {status === "SUCCESS" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            {message}
          </div>
        )}

        {/* Example Hint */}
        <div className="bg-[#FAF3EB] border border-[#DED3C8] rounded-xl p-3 text-left text-[11px] text-[#76685F] space-y-1">
          <p><strong className="text-[#8B6F5A]">Âm Kun:</strong> {currentItem.kunyomi || "—"} ({currentItem.kunExamples || "—"})</p>
          <p><strong className="text-[#8B6F5A]">Âm On:</strong> {currentItem.onyomi || "—"} ({currentItem.onExamples || "—"})</p>
        </div>
      </div>
    </div>
  );
}
