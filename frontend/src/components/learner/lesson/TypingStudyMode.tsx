"use client";

import { useState, useEffect, useRef } from "react";
import { VocabularyDto } from "./VocabularyLearningItem";

interface TypingStudyModeProps {
  vocabularies: VocabularyDto[];
}

// Basic Kana to Romaji converter for instant validation
function convertKanaToRomajiVariants(kanaStr: string): string[] {
  if (!kanaStr) return [];
  
  // Direct common mappings
  const map: Record<string, string[]> = {
    わたし: ["watashi", "watasi"],
    わたしたち: ["watashitachi", "watasitachi"],
    あなた: ["anata"],
    あのひと: ["anohito"],
    あのかた: ["anokata"],
    みなさん: ["minasan", "minnasan"],
    せんせい: ["sensei"],
    きょうし: ["kyoushi", "kyoshi"],
    gakusei: ["gakusei"],
    かいしゃいん: ["kaishain"],
    しゃいん: ["shain"],
    ぎんこういん: ["ginkoin", "ginkouin"],
    いしゃ: ["isha"],
    けんきゅうしゃ: ["kenkyuusha", "kenkyusha"],
    エンジニア: ["enjinia"],
    だいがく: ["daigaku"],
    びょういん: ["byouin", "byoin"],
    でんき: ["denki"],
    だれ: ["dare"],
    どなた: ["donata"],
    さい: ["sai"],
    なんさい: ["nansai"],
    おいくつ: ["oikutsu"],
    はい: ["hai"],
    いいえ: ["iie"],
    はじめまして: ["hajimemashite", "hazimemasite"],
    どうぞよろしく: ["douzoyoroshiku", "dozoyoroshiku"],
  };

  const normKana = kanaStr.trim().toLowerCase();
  if (map[normKana]) return map[normKana];

  // Character-by-character conversion fallback
  const charMap: Record<string, string> = {
    あ: "a", い: "i", う: "u", え: "e", お: "o",
    か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
    さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
    た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
    な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
    は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
    ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
    や: "ya", ゆ: "yu", よ: "yo",
    ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
    わ: "wa", を: "wo", ん: "n",
    が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go",
    ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
    だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do",
    ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
    ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po",
  };

  let romaji = "";
  for (const ch of normKana) {
    romaji += charMap[ch] || ch;
  }
  return [romaji];
}

export default function TypingStudyMode({ vocabularies }: TypingStudyModeProps) {
  const [cards, setCards] = useState<VocabularyDto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState<"IDLE" | "CORRECT" | "WRONG">("IDLE");
  const [score, setScore] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCards(vocabularies);
    setCurrentIndex(0);
    setUserInput("");
    setStatus("IDLE");
    setScore(0);
  }, [vocabularies]);

  const currentCard = cards[currentIndex];

  const normalize = (str: string) => {
    if (!str) return "";
    return str.trim().toLowerCase().normalize("NFC");
  };

  const handleCheck = () => {
    if (!currentCard || !userInput.trim()) return;

    const normInput = normalize(userInput);
    const validTargets = new Set<string>();

    if (currentCard.word) validTargets.add(normalize(currentCard.word));
    if (currentCard.kana) validTargets.add(normalize(currentCard.kana));
    if (currentCard.kanjiForm) validTargets.add(normalize(currentCard.kanjiForm));

    // Add Romaji variants for Kana
    if (currentCard.kana) {
      const romajiVariants = convertKanaToRomajiVariants(currentCard.kana);
      romajiVariants.forEach((variant) => validTargets.add(normalize(variant)));
    }
    if (currentCard.word) {
      const romajiVariants = convertKanaToRomajiVariants(currentCard.word);
      romajiVariants.forEach((variant) => validTargets.add(normalize(variant)));
    }

    // STRICT MATCH CHECK: Input must be in validTargets set!
    const isMatched = validTargets.has(normInput);

    if (isMatched) {
      setStatus("CORRECT");
      setScore((prev) => prev + 1);
    } else {
      setStatus("WRONG");
    }
  };

  const handleNext = () => {
    if (cards.length === 0) return;
    setUserInput("");
    setStatus("IDLE");
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleRetrySameWord = () => {
    setUserInput("");
    setStatus("IDLE");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (status === "IDLE") {
        handleCheck();
      } else {
        handleNext();
      }
    }
  };

  if (!cards || cards.length === 0) {
    return (
      <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-8 text-center text-[#76685F]">
        Không có từ vựng nào để luyện gõ.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#FAF3EB] border border-[#DED3C8] px-5 py-3 rounded-2xl">
        <span className="text-xs font-extrabold text-[#56423E]">
          Từ thứ <span className="text-[#C65D4B]">{currentIndex + 1}</span> / {cards.length}
        </span>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          🎯 Điểm: {score}
        </span>
      </div>

      {/* Main Prompt Card */}
      <div className="bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-8 text-center space-y-6 shadow-sm">
        <span className="bg-[#FAF3EB] text-[#8B6F5A] border border-[#DED3C8] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
          Nhập từ Tiếng Nhật tương ứng (Romaji / Kana / Kanji)
        </span>

        <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#C65D4B]">
          {(currentCard.meaningVi || "").normalize("NFC")}
        </h2>

        {/* Input Field */}
        <div className="space-y-3">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              if (status !== "IDLE") setStatus("IDLE");
            }}
            onKeyDown={handleKeyDown}
            placeholder="Gõ Romaji (ví dụ: watashi) hoặc わたし / 私..."
            className={`w-full px-5 py-3.5 text-center text-lg font-jp font-semibold rounded-2xl border-2 outline-hidden transition-all ${
              status === "CORRECT"
                ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                : status === "WRONG"
                ? "border-red-500 bg-red-50 text-red-900"
                : "border-[#DED3C8] focus:border-[#C65D4B] bg-white text-[#231917]"
            }`}
            autoFocus
          />

          {/* Feedback Section */}
          {status === "CORRECT" && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl animate-fade-in flex items-center justify-center gap-2">
              <span>🎉 Chính xác!</span>
              <span className="font-jp text-sm">
                ({currentCard.word} {currentCard.kana && currentCard.kana !== currentCard.word ? `/ ${currentCard.kana}` : ""})
              </span>
            </div>
          )}

          {status === "WRONG" && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-800 text-xs font-bold rounded-xl animate-fade-in space-y-1">
              <p>⚠️ Chưa chính xác!</p>
              <p className="font-jp text-sm">
                Đáp án chuẩn: <span className="font-bold underline">{currentCard.word}</span>{" "}
                {currentCard.kana && currentCard.kana !== currentCard.word ? `(${currentCard.kana})` : ""}
              </p>
            </div>
          )}
        </div>

        {/* Action Button Section */}
        <div className="flex flex-wrap justify-center gap-3">
          {status === "IDLE" ? (
            <button
              onClick={handleCheck}
              disabled={!userInput.trim()}
              className="px-8 py-3 bg-[#C65D4B] hover:bg-[#a84c3c] disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
            >
              Kiểm tra (Enter)
            </button>
          ) : status === "WRONG" ? (
            <>
              <button
                onClick={handleRetrySameWord}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
              >
                🔄 Gõ lại từ này
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[#56423E] hover:bg-[#3d2f2c] text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
              >
                Từ tiếp theo ►
              </button>
            </>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-[#56423E] hover:bg-[#3d2f2c] text-white font-bold text-xs rounded-xl shadow-sm"
            >
              Từ tiếp theo ►
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
