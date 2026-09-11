"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Volume2,
  Mic,
  Square,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle2,
  Info,
  Radio,
  Sliders,
  Award
} from "lucide-react";
import {
  playJapaneseTTS,
  stopJapaneseTTS,
  getGlobalTTSRate,
  setGlobalTTSRate,
} from "@/lib/utils/japaneseAudioTTS";
import PitchAccentBadge from "./PitchAccentBadge";

interface ShadowingItem {
  id: string;
  japanese: string;
  reading: string;
  meaning: string;
  pitchPattern: "atamadaka" | "nakadaka" | "odaka" | "heiban";
  moraBreakdown: string;
  note: string;
}

const SAMPLE_SHADOWING_ITEMS: ShadowingItem[] = [
  {
    id: "1",
    japanese: "雨",
    reading: "あめ (A-me)",
    meaning: "Cơn mưa (Mưa rơi)",
    pitchPattern: "atamadaka",
    moraBreakdown: "A (Cao) ➔ me (Thấp)",
    note: "🔴 Đầu cao (Atamadaka): Đọc A cao vút rồi hạ me xuống thấp.",
  },
  {
    id: "2",
    japanese: "飴",
    reading: "あめ (a-ME)",
    meaning: "Kẹo ngọt",
    pitchPattern: "heiban",
    moraBreakdown: "a (Thấp) ➔ ME (Cao)",
    note: "⚪ Bằng phẳng (Heiban): Đọc a thấp rồi lên ME cao kéo dài.",
  },
  {
    id: "3",
    japanese: "卵",
    reading: "たまご (ta-MA-go)",
    meaning: "Quả trứng",
    pitchPattern: "nakadaka",
    moraBreakdown: "ta (Thấp) ➔ MA (Cao) ➔ go (Thấp)",
    note: "🟢 Giữa cao (Nakadaka): Nhấn cao ở âm MA ở giữa.",
  },
  {
    id: "4",
    japanese: "山",
    reading: "やま (ya-MA)",
    meaning: "Ngọn núi",
    pitchPattern: "odaka",
    moraBreakdown: "ya (Thấp) ➔ MA (Cao) ➔ [ga (Thấp)]",
    note: "🔵 Cuối cao (Odaka): Nhấn cao ở MA, nhưng hạ thấp khi ghép trợ từ.",
  },
  {
    id: "5",
    japanese: "初めまして、どうぞよろしく。",
    reading: "はじめまして、どうぞよろしく。",
    meaning: "Rất hân hạnh được làm quen với bạn.",
    pitchPattern: "heiban",
    moraBreakdown: "Ha-ji-me-mashi-te (Hơi nhịp nhàng) ➔ desu/masu nuốt âm.",
    note: "✨ Câu giao tiếp mẫu: Chú ý nuốt âm nhẹ ở して (sh-te) và く (k).",
  },
  {
    id: "6",
    japanese: "日本語を楽しく勉強しています。",
    reading: "にほんごを たのしく べんきょうしています。",
    meaning: "Tôi đang học tiếng Nhật một cách vui vẻ.",
    pitchPattern: "nakadaka",
    moraBreakdown: "Ni-hon-go (4 moras) ➔ ta-no-shi-ku ➔ ben-kyou.",
    note: "✨ Luyện nhịp Mora: Giữ mỗi âm tiết (ん, きょう) có độ dài tròn 1 nhịp.",
  },
];

const KANA_SHADOWING_ITEMS: ShadowingItem[] = [
  {
    id: "k1",
    japanese: "あ・い・う・え・お",
    reading: "A - I - U - E - O",
    meaning: "Bảng 5 nguyên âm cơ bản (Gojuon)",
    pitchPattern: "heiban",
    moraBreakdown: "Mở rộng khẩu hình miệng tròn, phát âm từng nguyên âm 1 nhịp.",
    note: "🌸 Chuẩn khẩu hình: Mở miệng tròn trịa, phát âm rõ ràng nguyên âm.",
  },
  {
    id: "k2",
    japanese: "が・ぎ・ぐ・げ・ご",
    reading: "GA - GI - GU - GE - GO",
    meaning: "Âm đục (Dakuon ゛ - Hàng G)",
    pitchPattern: "atamadaka",
    moraBreakdown: "GA ➔ GI ➔ GU ➔ GE ➔ GO (Rung cuống họng)",
    note: "⚡ Âm đục: Rung dây thanh đới trong cổ họng khi phát âm.",
  },
  {
    id: "k3",
    japanese: "ぱ・ぴ・ぷ・ぺ・ぽ",
    reading: "PA - PI - PU - PE - PO",
    meaning: "Âm bán đục (Handakuon ゜ - Hàng P)",
    pitchPattern: "nakadaka",
    moraBreakdown: "Mút 2 môi lại rồi bật hơi nhẹ ra ngoài.",
    note: "✨ Âm bán đục: Bật nổ nhẹ bờ môi, phát âm bổng và trong.",
  },
  {
    id: "k4",
    japanese: "きゃ・きゅ・きょ",
    reading: "KYA - KYU - KYO",
    meaning: "Âm ghép (Yoon ゃゅょ - Hàng K)",
    pitchPattern: "heiban",
    moraBreakdown: "Đọc ghép 2 chữ thành duy nhất 1 nhịp (1 Mora).",
    note: "🌸 Âm ghép: Đọc lướt nhanh 1 nhịp, không tách 2 âm rời.",
  },
  {
    id: "k5",
    japanese: "おばあさん",
    reading: "おばあさん (Obāsan)",
    meaning: "Người bà (Trường âm)",
    pitchPattern: "heiban",
    moraBreakdown: "O - BA - A - SA - N (Tròn 5 Moras nhịp đều)",
    note: "⏳ Trường âm: Kéo dài âm ば thành 2 nhịp (ばあ).",
  },
  {
    id: "k6",
    japanese: "きって",
    reading: "きって (Kitte)",
    meaning: "Tem thư (Âm ngắt っ)",
    pitchPattern: "odaka",
    moraBreakdown: "KI - [っ (ngắt 1 nhịp)] - TE (3 Moras)",
    note: "⏹️ Âm ngắt っ: Dừng hơi tròn 1 nhịp nghỉ ở chữ っ nhỏ.",
  },
];

interface ShadowingPronunciationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "KANA" | "VOCAB";
  customItems?: ShadowingItem[];
  singleWord?: {
    word: string;
    kana?: string;
    meaning?: string;
    pitchPattern?: "atamadaka" | "nakadaka" | "odaka" | "heiban";
  };
}

export default function ShadowingPronunciationModal({
  isOpen,
  onClose,
  mode = "VOCAB",
  customItems,
  singleWord,
}: ShadowingPronunciationModalProps) {
  const [selectedSpeed, setSelectedSpeed] = useState<number>(0.92);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isPlayingNative, setIsPlayingNative] = useState(false);

  // Audio Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const userAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Determine active items list
  let itemsToDisplay: ShadowingItem[] = SAMPLE_SHADOWING_ITEMS;
  if (singleWord) {
    itemsToDisplay = [
      {
        id: "single-1",
        japanese: singleWord.word,
        reading: singleWord.kana || singleWord.word,
        meaning: singleWord.meaning || "Từ vựng bài học",
        pitchPattern: singleWord.pitchPattern || "heiban",
        moraBreakdown: `${singleWord.kana || singleWord.word} (Độ dài nhịp mora đồng đều)`,
        note: "✨ Hãy bật micro thu âm và đối chiếu ngữ điệu từ vựng này!",
      },
    ];
  } else if (customItems && customItems.length > 0) {
    itemsToDisplay = customItems;
  } else if (mode === "KANA") {
    itemsToDisplay = KANA_SHADOWING_ITEMS;
  }

  const currentItem = itemsToDisplay[activeItemIndex] || itemsToDisplay[0];

  // Play Native TTS audio
  const handlePlayNative = () => {
    setIsPlayingNative(true);
    playJapaneseTTS({
      text: currentItem.japanese,
      rate: selectedSpeed,
      onStart: () => setIsPlayingNative(true),
      onEnd: () => setIsPlayingNative(false),
      onError: () => setIsPlayingNative(false),
    });
  };

  // Start Mic Recording
  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      setAudioBlobUrl(null);
      setRecordingSeconds(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioBlobUrl(url);

        // Stop all audio tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      alert("Không thể truy cập Microphone trên trình duyệt. Vui lòng cho phép quyền micro!");
    }
  };

  // Stop Mic Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Play Recorded User Audio
  const playUserRecording = () => {
    if (!audioBlobUrl) return;
    stopJapaneseTTS();

    const audio = new Audio(audioBlobUrl);
    userAudioRef.current = audio;

    audio.onplay = () => setIsPlayingUserAudio(true);
    audio.onended = () => setIsPlayingUserAudio(false);
    audio.onerror = () => setIsPlayingUserAudio(false);

    audio.play();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-4xl bg-[#FFFDF9] border-2 border-[#8B6F5A]/25 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#FFF5EE] border-b border-[#F2DDD4] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C65D4B] text-white flex items-center justify-center font-black text-xl shadow-md">
                🎙️
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#2C201D]">
                  Luyện Ngữ Điệu &amp; Đọc Đuổi (Pitch Accent &amp; Shadowing)
                </h2>
                <p className="text-xs font-bold text-[#8B6F5A]">
                  Luyện tập phát âm chuẩn giọng Tokyo kèm công cụ Thu âm đối chiếu
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#F5EFE6] text-[#8B6F5A] hover:bg-[#C65D4B] hover:text-white transition flex items-center justify-center cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-[#2C201D]">
            
            {/* Speed Control Toolbar & Pitch Guide Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#FFF8F5] to-[#FFF1EC] p-4 rounded-2xl border border-[#F5DDD4] shadow-2xs">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#C65D4B]" />
                <span className="text-xs font-black text-[#8B6F5A]">Tốc độ đọc giọng mẫu:</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedSpeed(0.75)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedSpeed === 0.75
                      ? "bg-[#C65D4B] text-white shadow-sm"
                      : "bg-white text-[#76685F] border border-[#F5DDD4] hover:text-[#C65D4B]"
                  }`}
                >
                  <span>🐢 Chậm (0.75x - Shadowing)</span>
                </button>
                <button
                  onClick={() => setSelectedSpeed(0.92)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedSpeed === 0.92
                      ? "bg-[#C65D4B] text-white shadow-sm"
                      : "bg-white text-[#76685F] border border-[#F5DDD4] hover:text-[#C65D4B]"
                  }`}
                >
                  <span>🚀 Chuẩn (1.0x - Tự nhiên)</span>
                </button>
              </div>
            </div>

            {/* Main Interactive Studio Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Sample Items List (5 cols) */}
              <div className="lg:col-span-5 space-y-2.5">
                <h3 className="text-xs font-black text-[#8B6F5A] uppercase tracking-wider px-1">
                  Chọn mẫu từ / câu luyện tập:
                </h3>
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {itemsToDisplay.map((item, index) => {
                    const isSelected = index === activeItemIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setActiveItemIndex(index);
                          setAudioBlobUrl(null);
                        }}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left space-y-1 ${
                          isSelected
                            ? "bg-white border-[#C65D4B] shadow-md ring-2 ring-[#C65D4B]/20"
                            : "bg-[#FFFDF9] border-[#F2DDD4] hover:border-[#C65D4B]/50 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-black font-jp text-[#2C201D]">
                            {item.japanese}
                          </span>
                          <PitchAccentBadge pattern={item.pitchPattern} size="sm" showCurve={false} />
                        </div>
                        <p className="text-xs font-bold text-[#8B6F5A]">{item.reading}</p>
                        <p className="text-[11px] font-bold text-[#76685F]">{item.meaning}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Interactive Practice & Recording Studio (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-[#F2DDD4] shadow-sm space-y-6">
                
                {/* Active Card Big Header */}
                <div className="text-center space-y-3 pb-4 border-b border-[#F5EFE6]">
                  <div className="inline-block">
                    <PitchAccentBadge pattern={currentItem.pitchPattern} size="md" showCurve={true} />
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black font-jp text-[#2C201D]">
                    {currentItem.japanese}
                  </h3>
                  <p className="text-sm font-black text-[#C65D4B]">{currentItem.reading}</p>
                  <p className="text-xs font-bold text-[#76685F]">{currentItem.meaning}</p>
                </div>

                {/* Mora & Pitch Accent Explanation Box */}
                <div className="bg-[#FFF8F5] p-4 rounded-2xl border border-[#F5DDD4] space-y-2 text-xs text-left">
                  <div className="flex items-center gap-2 text-[#C65D4B] font-black">
                    <Zap className="w-4 h-4 fill-[#C65D4B]" />
                    <span>Hướng dẫn phân tách âm (Mora Breakdown):</span>
                  </div>
                  <p className="font-bold text-[#2C201D] bg-white p-2 rounded-xl border border-[#F5DDD4]">
                    {currentItem.moraBreakdown}
                  </p>
                  <p className="text-[11px] font-bold text-[#76685F]">{currentItem.note}</p>
                </div>

                {/* Dual Audio Player & Mic Recorder Studio */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-black text-[#2C201D] uppercase tracking-wider text-center">
                    🎧 Studio Luyện Đọc Đuổi &amp; Thu Âm Đối Chiếu
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Step 1: Play Tokyo Native Audio */}
                    <button
                      onClick={handlePlayNative}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer shadow-xs ${
                        isPlayingNative
                          ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-md ring-4 ring-[#C65D4B]/20"
                          : "bg-[#FFF8F5] border-[#F2DDD4] text-[#C65D4B] hover:bg-[#C65D4B] hover:text-white"
                      }`}
                    >
                      <Volume2 className="w-6 h-6" />
                      <span className="text-xs font-black">
                        {isPlayingNative ? "Đang phát mẫu Tokyo..." : `1. Nghe giọng mẫu (${selectedSpeed}x)`}
                      </span>
                    </button>

                    {/* Step 2: Mic Recording Control */}
                    {!isRecording ? (
                      <button
                        onClick={startRecording}
                        className="p-4 rounded-2xl border-2 border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Mic className="w-6 h-6" />
                        <span className="text-xs font-black">2. Bấm để Thu Âm Giọng Bạn</span>
                      </button>
                    ) : (
                      <button
                        onClick={stopRecording}
                        className="p-4 rounded-2xl border-2 border-rose-600 bg-rose-600 text-white animate-pulse transition-all flex flex-col items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <Square className="w-6 h-6 fill-white" />
                        <span className="text-xs font-black">
                          ⏹️ Dừng Thu ({recordingSeconds}s)
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Play Recorded Voice Comparison Box */}
                  {audioBlobUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl space-y-3 text-center"
                    >
                      <div className="flex items-center justify-center gap-2 text-emerald-800 font-black text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Đã thu âm xong! Nghe lại để so sánh ngữ điệu:</span>
                      </div>

                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={playUserRecording}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition shadow-sm flex items-center gap-2 cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-white" />
                          <span>{isPlayingUserAudio ? "Đang phát giọng bạn..." : "▶️ Nghe Giọng Thu Âm Của Bạn"}</span>
                        </button>

                        <button
                          onClick={handlePlayNative}
                          className="px-4 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-black text-xs hover:bg-emerald-100 transition shadow-2xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4 text-emerald-700" />
                          <span>🔊 Nghe Lại Mẫu Chuẩn</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                </div>

              </div>

            </div>

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-[#FFF5EE] border-t border-[#F2DDD4] flex items-center justify-between text-xs font-bold text-[#8B6F5A] shrink-0">
            <span>💡 Áp dụng kỹ thuật Shadowing luyện nói mỗi ngày 5 phút để tạo phản xạ ngữ điệu tự nhiên.</span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#C65D4B] text-white font-bold shadow-md hover:bg-[#B04F3F] transition cursor-pointer"
            >
              Hoàn thành
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
