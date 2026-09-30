import { useState, useEffect, useRef, useMemo } from "react";
import { CheckCircle2, XCircle, RefreshCw, Trophy, Sparkles, Keyboard, HelpCircle, ArrowRight, Volume2 } from "lucide-react";
import { KanjiTopicItemDto } from "./KanjiLessonDetailView";
import { getKanjiDetails, KanjiVocabItem } from "@/lib/utils/kanjiDetailData";
import { playJapaneseTTS } from "@/lib/utils/japaneseAudioTTS";
import { apiClient } from "@/lib/api/client";

interface KanjiTypingTrainerProps {
  topicId: number;
  topicTitle: string;
  items: KanjiTopicItemDto[];
  onFinish?: () => void;
}

interface SubChallenge {
  type: "KUN_READING" | "COMPOUND_WORD";
  kanjiChar: string;
  sinoVi: string;
  title: string;
  promptText: string;
  displayWord: string;
  displayReadingHint: string;
  meaning: string;
  acceptedAnswers: string[];
}

/**
 * Robust converter from Hiragana/Katakana to Romaji variants
 */
function toRomajiVariants(str: string): string[] {
  if (!str) return [];
  // Clean dots, dashes, brackets e.g. "うご.く" -> "うごく", "あ（う）" -> "あう"
  const cleanStr = str.replace(/[.・-（）\(\)\s]/g, "");

  const map: Record<string, string> = {
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
    ア: "a", イ: "i", ウ: "u", エ: "e", オ: "o",
    カ: "ka", キ: "ki", ク: "ku", ケ: "ke", コ: "ko",
    サ: "sa", シ: "shi", ス: "su", セ: "se", ソ: "so",
    タ: "ta", チ: "chi", ツ: "tsu", テ: "te", ト: "to",
    ナ: "na", ニ: "ni", ヌ: "nu", ネ: "ne", ノ: "no",
    ハ: "ha", ヒ: "hi", フ: "fu", ヘ: "he", ホ: "ho",
    マ: "ma", ミ: "mi", ム: "mu", メ: "me", モ: "mo",
    ヤ: "ya", ユ: "yu", ヨ: "yo",
    ラ: "ra", リ: "ri", ル: "ru", レ: "re", ロ: "ro",
    ワ: "wa", ヲ: "wo", ン: "n",
    ガ: "ga", ギ: "gi", グ: "gu", ゲ: "ge", ゴ: "go",
    ザ: "za", ジ: "ji", ズ: "zu", ゼ: "ze", ゾ: "zo",
    ダ: "da", ヂ: "ji", ヅ: "zu", デ: "de", ド: "do",
    バ: "ba", ビ: "bi", ブ: "bu", ベ: "be", ボ: "bo",
    パ: "pa", ピ: "pi", プ: "pu", ペ: "pe", ポ: "po",
  };

  const comboMap: Record<string, string> = {
    きゃ: "kya", きゅ: "kyu", きょ: "kyo",
    しゃ: "sha", しゅ: "shu", しょ: "sho",
    ちゃ: "cha", ちゅ: "chu", ちょ: "cho",
    にゃ: "nya", にゅ: "nyu", にょ: "nyo",
    ひゃ: "hya", ひゅ: "hyu", ひょ: "hyo",
    みゃ: "mya", みゅ: "myu", みょ: "myo",
    りゃ: "rya", りゅ: "ryu", りょ: "ryo",
    ぎゃ: "gya", ぎゅ: "gyu", ぎょ: "gyo",
    じゃ: "ja", じゅ: "ju", じょ: "jo",
    びゃ: "bya", びゅ: "byu", びょ: "byo",
    ぴゃ: "pya", ぴゅ: "pyu", ぴょ: "pyo",
    キャ: "kya", キュ: "kyu", キョ: "kyo",
    シャ: "sha", シュ: "shu", ショ: "sho",
    チャ: "cha", チュ: "chu", チョ: "cho",
    ニャ: "nya", ニュ: "nyu", ニョ: "nyo",
    ヒャ: "hya", ヒュ: "hyu", ヒョ: "hyo",
    ミャ: "mya", ミュ: "myu", ミョ: "myo",
    リャ: "rya", リュ: "ryu", リョ: "ryo",
    ギャ: "gya", ギュ: "gyu", ギョ: "gyo",
    ジャ: "ja", ジュ: "ju", ジョ: "jo",
    ビャ: "bya", ビュ: "byu", ビョ: "byo",
    ピャ: "pya", ピュ: "pyu", ピョ: "pyo",
  };

  let res = "";
  let i = 0;
  while (i < cleanStr.length) {
    if (i + 1 < cleanStr.length) {
      const pair = cleanStr.substring(i, i + 2);
      if (comboMap[pair]) {
        res += comboMap[pair];
        i += 2;
        continue;
      }
    }

    const ch = cleanStr[i];
    if (ch === "っ" || ch === "ッ") {
      if (i + 1 < cleanStr.length) {
        const nextPair = i + 2 < cleanStr.length ? cleanStr.substring(i + 1, i + 3) : "";
        const nextSingle = cleanStr[i + 1];
        const nextRomaji = comboMap[nextPair] || map[nextSingle] || "";
        if (nextRomaji) {
          res += nextRomaji[0];
        }
      }
      i++;
      continue;
    }

    if (map[ch]) {
      res += map[ch];
    } else {
      res += ch.toLowerCase();
    }
    i++;
  }

  const variants = new Set<string>();
  if (res) variants.add(res);

  // Common long vowel conversions (ou -> o, uu -> u, ei -> e)
  if (res.includes("ou")) variants.add(res.replace(/ou/g, "o"));
  if (res.includes("uu")) variants.add(res.replace(/uu/g, "u"));
  if (res.includes("ei")) variants.add(res.replace(/ei/g, "e"));

  return Array.from(variants);
}

export default function KanjiTypingTrainer({ topicId, topicTitle, items, onFinish }: KanjiTypingTrainerProps) {
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
  const [subStepIndex, setSubStepIndex] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentItem = items[currentKanjiIndex];

  // Generate structured multi-step challenges for current Kanji
  const currentChallenges: SubChallenge[] = useMemo(() => {
    if (!currentItem) return [];

    const details = getKanjiDetails({
      character: currentItem.character,
      displayOrder: currentItem.displayOrder,
      sinoVi: currentItem.meaningVi,
      meaningVi: currentItem.meaningVi,
      kunyomi: currentItem.kunyomi,
      onyomi: currentItem.onyomi,
      strokeCount: currentItem.strokeCount,
      radical: currentItem.radical,
      kunExamples: currentItem.kunExamples,
      onExamples: currentItem.onExamples,
    });

    const challenges: SubChallenge[] = [];

    // --- STEP 1: Âm Kun / Âm đọc chính của đơn chữ Kanji ---
    const primaryKun = details.kunyomi && details.kunyomi !== "—" ? details.kunyomi : details.onyomi;
    const kunAcceptedSet = new Set<string>();

    if (currentItem.acceptedRomaji) {
      currentItem.acceptedRomaji.split(/[,;]+/).forEach((r) => kunAcceptedSet.add(r.trim().toLowerCase()));
    }
    toRomajiVariants(primaryKun).forEach((r) => kunAcceptedSet.add(r));
    if (currentItem.kunyomi) {
      toRomajiVariants(currentItem.kunyomi).forEach((r) => kunAcceptedSet.add(r));
    }
    if (currentItem.onyomi) {
      toRomajiVariants(currentItem.onyomi).forEach((r) => kunAcceptedSet.add(r));
    }

    challenges.push({
      type: "KUN_READING",
      kanjiChar: currentItem.character,
      sinoVi: details.sinoVi,
      title: `Giai đoạn 1: Âm Kun & Âm Đọc Đơn Chữ`,
      promptText: `Gõ Romaji âm Kun / âm đọc chính của Hán tự: ${currentItem.character}`,
      displayWord: currentItem.character,
      displayReadingHint: primaryKun,
      meaning: `Âm Hán Việt: ${details.sinoVi} (${details.meaningVi})`,
      acceptedAnswers: Array.from(kunAcceptedSet).filter(Boolean),
    });

    // --- STEP 2..N: Các Từ Ghép Kanji đi kèm (Compound Kanji Words) ---
    const vocabList: KanjiVocabItem[] = details.importantVocab.length > 0
      ? details.importantVocab
      : [...details.kunExamples, ...details.onExamples];

    // Deduplicate and filter valid compound words
    const uniqueWords = new Map<string, KanjiVocabItem>();
    vocabList.forEach((v) => {
      if (v.word && !uniqueWords.has(v.word)) {
        uniqueWords.set(v.word, v);
      }
    });

    const compoundItems = Array.from(uniqueWords.values()).slice(0, 4); // Top 3-4 compound words

    compoundItems.forEach((vocab, idx) => {
      const vocabAcceptedSet = new Set<string>();
      toRomajiVariants(vocab.reading).forEach((r) => vocabAcceptedSet.add(r));
      toRomajiVariants(vocab.word).forEach((r) => vocabAcceptedSet.add(r));

      // Extra common verb endings flexibilities (e.g. aimasu vs au, ugoku vs ugokasu)
      if (vocab.reading.includes("ます")) {
        const baseReading = vocab.reading.replace("ます", "う");
        toRomajiVariants(baseReading).forEach((r) => vocabAcceptedSet.add(r));
      }

      challenges.push({
        type: "COMPOUND_WORD",
        kanjiChar: currentItem.character,
        sinoVi: details.sinoVi,
        title: `Giai đoạn ${idx + 2}: Gõ Từ Ghép (${vocab.word})`,
        promptText: `Gõ Romaji của từ ghép: ${vocab.word}`,
        displayWord: vocab.word,
        displayReadingHint: vocab.reading,
        meaning: vocab.meaning,
        acceptedAnswers: Array.from(vocabAcceptedSet).filter(Boolean),
      });
    });

    return challenges;
  }, [currentItem]);

  const activeChallenge = currentChallenges[subStepIndex];

  useEffect(() => {
    inputRef.current?.focus();
    setShowHint(false);
  }, [currentKanjiIndex, subStepIndex, isCompleted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || !activeChallenge) return;

    const cleanedInput = inputVal.trim().toLowerCase();
    const isMatchedLocal = activeChallenge.acceptedAnswers.some((acc) => typeof acc === "string" && acc.toLowerCase() === cleanedInput);

    let isCorrect = isMatchedLocal;

    // Fallback verify with backend if local doesn't match on step 1
    if (!isCorrect && activeChallenge.type === "KUN_READING" && currentItem) {
      try {
        const res = await apiClient<any>(`/learning/kanji/topics/${topicId}/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kanjiId: currentItem.kanjiId,
            inputRomaji: cleanedInput,
          }),
        });
        const payload = res?.data || res;
        if (payload && payload.correct) {
          isCorrect = true;
        }
      } catch (err) {
        console.error("Backend verify fallback error:", err);
      }
    }

    if (isCorrect) {
      setStatus("SUCCESS");
      setMessage(`🎉 Chính xác! (${activeChallenge.displayWord} = ${activeChallenge.displayReadingHint})`);
      setScore((prev) => prev + 1);

      // Play audio TTS for Japanese reading
      playJapaneseTTS(activeChallenge.displayWord);

      setTimeout(() => {
        if (subStepIndex + 1 < currentChallenges.length) {
          // Advance to next compound word sub-step
          setSubStepIndex((prev) => prev + 1);
          setInputVal("");
          setStatus("IDLE");
          setMessage("");
        } else if (currentKanjiIndex + 1 < items.length) {
          // Advance to next Kanji character
          setCurrentKanjiIndex((prev) => prev + 1);
          setSubStepIndex(0);
          setInputVal("");
          setStatus("IDLE");
          setMessage("");
        } else {
          setIsCompleted(true);
        }
      }, 1100);
    } else {
      setStatus("ERROR");
      setMessage(`❌ Chưa đúng, thử lại nhé! (Gợi ý Kana: ${activeChallenge.displayReadingHint})`);
    }
  };

  const handleRestart = () => {
    setCurrentKanjiIndex(0);
    setSubStepIndex(0);
    setInputVal("");
    setStatus("IDLE");
    setScore(0);
    setMessage("");
    setShowHint(false);
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
        <div className="w-20 h-20 rounded-full bg-[#FAF3EB] text-[#C65D4B] border-2 border-[#C65D4B] mx-auto flex items-center justify-center shadow-inner">
          <Trophy className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-[#231917]">Hoàn Thành Tất Cả Từ Ghép!</h3>
          <p className="text-xs text-[#76685F] font-bold">
            Xuất sắc! Bạn đã luyện gõ thành công Âm Kun và toàn bộ Từ Ghép Kanji bài <strong className="text-[#C65D4B]">{topicTitle}</strong>.
          </p>
        </div>

        <div className="bg-[#FAF3EB] border border-[#DED3C8] p-5 rounded-2xl flex justify-around items-center">
          <div>
            <div className="text-3xl font-black text-[#C65D4B]">{score}</div>
            <div className="text-[10px] font-bold text-[#8B6F5A] uppercase tracking-wider">Lượt gõ chính xác</div>
          </div>
          <div className="h-8 w-px bg-[#DED3C8]" />
          <div>
            <div className="text-3xl font-black text-[#C65D4B]">100%</div>
            <div className="text-[10px] font-bold text-[#8B6F5A] uppercase tracking-wider">Thành thạo</div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3.5 bg-[#C65D4B] hover:bg-[#b04f3f] text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> Luyện tập lại từ đầu
        </button>
      </div>
    );
  }

  if (!activeChallenge) return null;

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Top Header Bar */}
      <div className="flex justify-between items-center bg-white border border-[#DED3C8] px-5 py-3 rounded-2xl shadow-2xs text-xs font-extrabold">
        <span className="text-[#8B6F5A] flex items-center gap-1.5">
          <Keyboard className="w-4 h-4 text-[#C65D4B]" /> LUYỆN GÕ — {topicTitle}
        </span>
        <div className="flex items-center gap-2">
          <span className="bg-[#C65D4B] text-white px-3 py-1 rounded-full text-[11px] shadow-2xs">
            Hán tự {currentKanjiIndex + 1} / {items.length}
          </span>
        </div>
      </div>

      {/* Main Interactive Typing Card */}
      <div className="bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-md relative overflow-hidden">
        {/* Subtle Decorative Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#C65D4B_1px,transparent_1px)] [background-size:12px_12px] opacity-10 pointer-events-none" />

        {/* Challenge Target Display */}
        <div className="space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 bg-[#FAF3EB] border border-[#DED3C8] px-3.5 py-1 rounded-full text-xs font-extrabold text-[#C65D4B]">
            <span>⛩️ HÁN TỰ #{currentKanjiIndex + 1}: {activeChallenge.kanjiChar} ({activeChallenge.sinoVi})</span>
            <span className="bg-white/80 px-2 py-0.5 rounded-full text-[10px] text-[#8B786D] border border-[#E5D7C7]">
              Thử thách {subStepIndex + 1}/{currentChallenges.length}
            </span>
          </div>

          {activeChallenge.type === "KUN_READING" ? (
            <div className="py-2">
              <h2 className="text-7xl font-jp font-black text-[#C65D4B] tracking-tight drop-shadow-2xs">
                {activeChallenge.displayWord}
              </h2>
              <p className="text-xs font-extrabold text-[#8B6F5A] mt-2">
                {activeChallenge.meaning}
              </p>
            </div>
          ) : (
            <div className="py-2 space-y-1">
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-5xl font-jp font-black text-[#C65D4B] tracking-tight drop-shadow-2xs">
                  {activeChallenge.displayWord}
                </h2>
                <button
                  type="button"
                  onClick={() => playJapaneseTTS(activeChallenge.displayWord)}
                  className="w-9 h-9 rounded-full bg-[#FAF3EB] hover:bg-[#C65D4B] text-[#C65D4B] hover:text-white border border-[#DED3C8] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  title="Phát âm từ ghép"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs sm:text-sm font-extrabold text-[#231917]">
                Ý nghĩa từ ghép: <span className="text-[#C65D4B]">{activeChallenge.meaning}</span>
              </p>
            </div>
          )}
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-[#52443C] text-left">
              ✍️ {activeChallenge.promptText}
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  if (status !== "IDLE") setStatus("IDLE");
                }}
                placeholder={
                  activeChallenge.type === "KUN_READING"
                    ? "Gõ Romaji âm Kun (ví dụ: au, ugoku)..."
                    : `Gõ Romaji từ ghép "${activeChallenge.displayWord}"...`
                }
                className={`w-full text-center py-3.5 px-4 text-base font-extrabold rounded-2xl border-2 outline-none transition-all ${
                  status === "SUCCESS"
                    ? "bg-green-50 border-green-500 text-green-900"
                    : status === "ERROR"
                    ? "bg-red-50 border-red-500 text-red-900 animate-shake"
                    : "bg-white border-[#DED3C8] focus:border-[#C65D4B] text-[#231917] shadow-inner"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 py-3.5 bg-[#C65D4B] hover:bg-[#b04f3f] text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Kiểm tra đáp án</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="px-3.5 py-3.5 bg-[#FAF4EB] hover:bg-[#E5D7C7] text-[#8B786D] border border-[#E5D7C7] rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
              title="Hiện gợi ý cách đọc Kana"
            >
              <HelpCircle className="w-4 h-4 text-[#C65D4B]" />
              <span className="hidden sm:inline">Gợi ý</span>
            </button>
          </div>
        </form>

        {/* Optional Kana Hint Box */}
        {showHint && (
          <div className="bg-[#FAF3EB] border border-[#C65D4B]/40 rounded-2xl p-3 text-xs font-extrabold text-[#C65D4B] max-w-md mx-auto animate-fade-in flex items-center justify-between">
            <span>💡 Gợi ý đọc Kana: <strong>{activeChallenge.displayReadingHint}</strong></span>
            <span className="text-[10px] text-[#8B786D] font-medium">
              Romaji mẫu: {activeChallenge.acceptedAnswers[0]}
            </span>
          </div>
        )}

        {/* Feedback Message */}
        {message && (
          <div
            className={`p-3.5 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 border shadow-2xs max-w-md mx-auto ${
              status === "SUCCESS"
                ? "bg-green-100 border-green-300 text-green-900"
                : "bg-red-100 border-red-300 text-red-900"
            }`}
          >
            {status === "SUCCESS" ? <CheckCircle2 className="w-4 h-4 shrink-0 text-green-700" /> : <XCircle className="w-4 h-4 shrink-0 text-red-700" />}
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

