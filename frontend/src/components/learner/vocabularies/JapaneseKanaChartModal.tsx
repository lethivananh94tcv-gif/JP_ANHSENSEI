"use client";

import { useState } from "react";
import { X, Volume2, Search, Sparkles, BookOpen, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playKanaAlphabetTTS } from "@/lib/utils/japaneseAudioTTS";

interface KanaItem {
  hiragana: string;
  katakana: string;
  romaji: string;
  type: "goin" | "dakuon" | "handakuon";
}

const KANA_DATA: KanaItem[] = [
  // Basic Vowels
  { hiragana: "あ", katakana: "ア", romaji: "a", type: "goin" },
  { hiragana: "い", katakana: "イ", romaji: "i", type: "goin" },
  { hiragana: "う", katakana: "ウ", romaji: "u", type: "goin" },
  { hiragana: "え", katakana: "エ", romaji: "e", type: "goin" },
  { hiragana: "お", katakana: "オ", romaji: "o", type: "goin" },
  // K-row
  { hiragana: "か", katakana: "カ", romaji: "ka", type: "goin" },
  { hiragana: "き", katakana: "キ", romaji: "ki", type: "goin" },
  { hiragana: "く", katakana: "ク", romaji: "ku", type: "goin" },
  { hiragana: "け", katakana: "ケ", romaji: "ke", type: "goin" },
  { hiragana: "こ", katakana: "コ", romaji: "ko", type: "goin" },
  // S-row
  { hiragana: "さ", katakana: "サ", romaji: "sa", type: "goin" },
  { hiragana: "し", katakana: "シ", romaji: "shi", type: "goin" },
  { hiragana: "す", katakana: "ス", romaji: "su", type: "goin" },
  { hiragana: "せ", katakana: "セ", romaji: "se", type: "goin" },
  { hiragana: "そ", katakana: "ソ", romaji: "so", type: "goin" },
  // T-row
  { hiragana: "た", katakana: "タ", romaji: "ta", type: "goin" },
  { hiragana: "ち", katakana: "チ", romaji: "chi", type: "goin" },
  { hiragana: "つ", katakana: "ツ", romaji: "tsu", type: "goin" },
  { hiragana: "て", katakana: "テ", romaji: "te", type: "goin" },
  { hiragana: "と", katakana: "ト", romaji: "to", type: "goin" },
  // N-row
  { hiragana: "な", katakana: "ナ", romaji: "na", type: "goin" },
  { hiragana: "に", katakana: "ニ", romaji: "ni", type: "goin" },
  { hiragana: "ぬ", katakana: "ヌ", romaji: "nu", type: "goin" },
  { hiragana: "ね", katakana: "ネ", romaji: "ne", type: "goin" },
  { hiragana: "の", katakana: "ノ", romaji: "no", type: "goin" },
  // H-row
  { hiragana: "は", katakana: "ハ", romaji: "ha", type: "goin" },
  { hiragana: "ひ", katakana: "ヒ", romaji: "hi", type: "goin" },
  { hiragana: "ふ", katakana: "フ", romaji: "fu", type: "goin" },
  { hiragana: "へ", katakana: "ヘ", romaji: "he", type: "goin" },
  { hiragana: "ほ", katakana: "ホ", romaji: "ho", type: "goin" },
  // M-row
  { hiragana: "ま", katakana: "マ", romaji: "ma", type: "goin" },
  { hiragana: "み", katakana: "ミ", romaji: "mi", type: "goin" },
  { hiragana: "む", katakana: "ム", romaji: "mu", type: "goin" },
  { hiragana: "め", katakana: "メ", romaji: "me", type: "goin" },
  { hiragana: "も", katakana: "モ", romaji: "mo", type: "goin" },
  // Y-row
  { hiragana: "や", katakana: "ヤ", romaji: "ya", type: "goin" },
  { hiragana: "ゆ", katakana: "ユ", romaji: "yu", type: "goin" },
  { hiragana: "よ", katakana: "ヨ", romaji: "yo", type: "goin" },
  // R-row
  { hiragana: "ら", katakana: "ラ", romaji: "ra", type: "goin" },
  { hiragana: "り", katakana: "リ", romaji: "ri", type: "goin" },
  { hiragana: "る", katakana: "ル", romaji: "ru", type: "goin" },
  { hiragana: "れ", katakana: "レ", romaji: "re", type: "goin" },
  { hiragana: "ろ", katakana: "ロ", romaji: "ro", type: "goin" },
  // W-row & N
  { hiragana: "わ", katakana: "ワ", romaji: "wa", type: "goin" },
  { hiragana: "を", katakana: "ヲ", romaji: "wo", type: "goin" },
  { hiragana: "ん", katakana: "ン", romaji: "n", type: "goin" },
  // Dakuon (G-row, Z-row, D-row, B-row)
  { hiragana: "が", katakana: "ガ", romaji: "ga", type: "dakuon" },
  { hiragana: "ぎ", katakana: "ギ", romaji: "gi", type: "dakuon" },
  { hiragana: "ぐ", katakana: "グ", romaji: "gu", type: "dakuon" },
  { hiragana: "げ", katakana: "ゲ", romaji: "ge", type: "dakuon" },
  { hiragana: "ご", katakana: "ゴ", romaji: "go", type: "dakuon" },

  { hiragana: "ざ", katakana: "ザ", romaji: "za", type: "dakuon" },
  { hiragana: "じ", katakana: "ジ", romaji: "ji", type: "dakuon" },
  { hiragana: "ず", katakana: "ズ", romaji: "zu", type: "dakuon" },
  { hiragana: "ぜ", katakana: "ゼ", romaji: "ze", type: "dakuon" },
  { hiragana: "ぞ", katakana: "ゾ", romaji: "zo", type: "dakuon" },

  { hiragana: "だ", katakana: "ダ", romaji: "da", type: "dakuon" },
  { hiragana: "ぢ", katakana: "ヂ", romaji: "ji", type: "dakuon" },
  { hiragana: "づ", katakana: "ヅ", romaji: "zu", type: "dakuon" },
  { hiragana: "で", katakana: "デ", romaji: "de", type: "dakuon" },
  { hiragana: "ど", katakana: "ド", romaji: "do", type: "dakuon" },

  { hiragana: "ば", katakana: "バ", romaji: "ba", type: "dakuon" },
  { hiragana: "び", katakana: "ビ", romaji: "bi", type: "dakuon" },
  { hiragana: "ぶ", katakana: "ブ", romaji: "bu", type: "dakuon" },
  { hiragana: "べ", katakana: "ベ", romaji: "be", type: "dakuon" },
  { hiragana: "ぼ", katakana: "ボ", romaji: "bo", type: "dakuon" },

  // Handakuon (P-row)
  { hiragana: "ぱ", katakana: "パ", romaji: "pa", type: "handakuon" },
  { hiragana: "ぴ", katakana: "ピ", romaji: "pi", type: "handakuon" },
  { hiragana: "ぷ", katakana: "プ", romaji: "pu", type: "handakuon" },
  { hiragana: "ぺ", katakana: "ペ", romaji: "pe", type: "handakuon" },
  { hiragana: "ぽ", katakana: "ポ", romaji: "po", type: "handakuon" },
];

interface JapaneseKanaChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JapaneseKanaChartModal({ isOpen, onClose }: JapaneseKanaChartModalProps) {
  const [kanaType, setKanaType] = useState<"hiragana" | "katakana">("hiragana");
  const [filterGroup, setFilterGroup] = useState<"all" | "goin" | "dakuon" | "handakuon">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [playingRomaji, setPlayingRomaji] = useState<string | null>(null);

  if (!isOpen) return null;

  const playAudio = (text: string, romaji: string) => {
    setPlayingRomaji(romaji);
    playKanaAlphabetTTS(text, {
      onStart: () => setPlayingRomaji(romaji),
      onEnd: () => setPlayingRomaji(null),
      onError: () => setPlayingRomaji(null),
    });
  };

  const filteredKana = KANA_DATA.filter((k) => {
    if (filterGroup !== "all" && k.type !== filterGroup) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        k.hiragana.includes(q) ||
        k.katakana.includes(q) ||
        k.romaji.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-4xl max-h-[90vh] bg-[#FFFDF9] rounded-3xl border-2 border-[#DED3C8] shadow-2xl flex flex-col overflow-hidden text-left"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#DED3C8] bg-gradient-to-r from-[#FAF3EB] via-[#FFFDF9] to-[#F5EFE6] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B6F5A] via-[#C65D4B] to-[#FF8C78] text-white font-jp font-black text-2xl flex items-center justify-center shadow-md">
                {kanaType === "hiragana" ? "あ" : "ア"}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#231917] flex items-center gap-2">
                  <span>Bảng Chữ Cái Tiếng Nhật Kana</span>
                  <Sparkles className="w-4 h-4 text-[#C65D4B]" />
                </h3>
                <p className="text-xs text-[#76685F] font-medium">
                  Tra cứu phát âm chuẩn 46 ký tự Hiragana & Katakana (kèm âm đục Dakuon & âm bán đục)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white hover:bg-rose-50 text-[#8B6F5A] hover:text-rose-600 border border-[#DED3C8] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Controls Bar: Hiragana vs Katakana Toggle & Filters */}
          <div className="p-4 sm:p-5 border-b border-[#DED3C8] bg-[#FFFDF9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Hiragana vs Katakana Main Tabs */}
            <div className="flex items-center gap-2 bg-[#F5EFE6] p-1.5 rounded-2xl border border-[#DED3C8]">
              <button
                type="button"
                onClick={() => setKanaType("hiragana")}
                className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  kanaType === "hiragana"
                    ? "bg-[#C65D4B] text-white shadow-md"
                    : "text-[#56423E] hover:bg-white"
                }`}
              >
                <span className="font-jp font-black text-sm">あ</span>
                <span>Hiragana (Chữ mềm)</span>
              </button>
              <button
                type="button"
                onClick={() => setKanaType("katakana")}
                className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  kanaType === "katakana"
                    ? "bg-[#C65D4B] text-white shadow-md"
                    : "text-[#56423E] hover:bg-white"
                }`}
              >
                <span className="font-jp font-black text-sm">ア</span>
                <span>Katakana (Chữ cứng)</span>
              </button>
            </div>

            {/* Sub Filters & Search Input */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 text-[#8B6F5A] absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm romaji (a, ka...)..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#DED3C8] rounded-xl text-xs font-bold text-[#231917] outline-hidden focus:border-[#C65D4B]"
                />
              </div>

              <select
                value={filterGroup}
                onChange={(e) => setFilterGroup(e.target.value as any)}
                className="px-3 py-1.5 bg-white border border-[#DED3C8] rounded-xl text-xs font-bold text-[#56423E] outline-hidden cursor-pointer"
              >
                <option value="all">Tất cả ({KANA_DATA.length})</option>
                <option value="goin">Âm trong (46 chữ)</option>
                <option value="dakuon">Âm đục (20 chữ)</option>
                <option value="handakuon">Âm bán đục (5 chữ)</option>
              </select>
            </div>
          </div>

          {/* Grid Display of Kana Cards */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF3EB]/30">
            {filteredKana.length === 0 ? (
              <div className="p-12 text-center text-xs font-bold text-[#76685F] bg-white rounded-3xl border-2 border-dashed border-[#DED3C8]">
                Không tìm thấy chữ cái nào phù hợp với "{searchQuery}".
              </div>
            ) : (
              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
                {filteredKana.map((k) => {
                  const char = kanaType === "hiragana" ? k.hiragana : k.katakana;
                  const isPlaying = playingRomaji === k.romaji;

                  return (
                    <button
                      key={`${kanaType}-${k.romaji}-${char}`}
                      type="button"
                      onClick={() => playAudio(char, k.romaji)}
                      className={`relative group p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer shadow-xs hover:scale-105 ${
                        isPlaying
                          ? "bg-gradient-to-b from-[#C65D4B] to-[#B04F3F] text-white border-[#C65D4B] shadow-lg ring-2 ring-[#C65D4B]/30"
                          : "bg-white hover:bg-[#FAF3EB] border-[#DED3C8] hover:border-[#C65D4B] text-[#231917]"
                      }`}
                      title={`Bấm để nghe phát âm: ${char} (${k.romaji})`}
                    >
                      <span
                        className={`font-jp font-black text-2xl sm:text-3xl leading-none transition-colors ${
                          isPlaying ? "text-white" : "text-[#231917] group-hover:text-[#C65D4B]"
                        }`}
                      >
                        {char}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider ${
                          isPlaying ? "text-amber-200" : "text-[#8B6F5A]"
                        }`}
                      >
                        {k.romaji}
                      </span>
                      <Volume2
                        className={`w-3 h-3 transition-opacity ${
                          isPlaying
                            ? "text-white opacity-100 animate-pulse"
                            : "text-[#C65D4B] opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Banner */}
          <div className="p-4 border-t border-[#DED3C8] bg-white flex items-center justify-between text-xs text-[#76685F] font-bold">
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C65D4B]" />
              <span>Mẹo: Nhấp vào từng ký tự để nghe âm thanh phát âm giọng bản xứ 🔊</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-[#F5EFE6] hover:bg-[#C65D4B] text-[#8B6F5A] hover:text-white font-extrabold rounded-xl transition-all border border-[#DED3C8]"
            >
              Đóng
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
