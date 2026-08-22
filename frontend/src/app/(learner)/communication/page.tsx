"use client";

import { useState } from "react";

interface KaiwaScenario {
  id: number;
  title: string;
  topic: string;
  level: string;
  roles: string[];
  lines: { speaker: string; japanese: string; romaji: string; meaningVi: string }[];
}

const SAMPLE_SCENARIOS: KaiwaScenario[] = [
  {
    id: 1,
    title: "Chào hỏi & Giới thiệu bản thân",
    topic: "Giao tiếp cơ bản hàng ngày",
    level: "N5",
    roles: ["A: Tanaka", "B: Linh"],
    lines: [
      { speaker: "A", japanese: "初めまして。田中です。よろしくお願いします。", romaji: "Hajimemashite. Tanaka desu. Yoroshiku onegaishimasu.", meaningVi: "Rất vui được gặp bạn. Tôi là Tanaka. Rất mong được sự giúp đỡ của bạn." },
      { speaker: "B", japanese: "初めまして。リンです。ベトナムから来ました。こちらこそよろしくお願いします。", romaji: "Hajimemashite. Rin desu. Betonamu kara kimashita. Kochirakoso yoroshiku onegaishimasu.", meaningVi: "Rất vui được gặp bạn. Tôi là Linh, đến từ Việt Nam. Tôi cũng rất mong được bạn giúp đỡ." },
    ],
  },
  {
    id: 2,
    title: "Gọi món tại Nhà hàng Nhật",
    topic: "Ăn uống & Nhà hàng",
    level: "N5",
    roles: ["Khách: Linh", "Nhân viên: Tenin"],
    lines: [
      { speaker: "Nhân viên", japanese: "いらっしゃいませ！何にしますか？", romaji: "Irasshaimase! Nani ni shimasu ka?", meaningVi: "Xin kính chào quý khách! Quý khách dùng gì ạ?" },
      { speaker: "Khách", japanese: "ラーメンを一つと、お茶をお願いします。", romaji: "Raamen wo hitotsu to, ocha wo onegaishimasu.", meaningVi: "Cho tôi một tô Ramen và một ly trà xanh nhé." },
      { speaker: "Nhân viên", japanese: "かしこまりました。少々お待ちください。", romaji: "Kashikomaritha. Shou-shou omachi kudatai.", meaningVi: "Tôi đã rõ. Xin quý khách vui lòng đợi trong giây lát." },
    ],
  },
  {
    id: 3,
    title: "Hỏi đường & Di chuyển",
    topic: "Du lịch & Đi lại",
    level: "N5",
    roles: ["A: Linh", "B: Người qua đường"],
    lines: [
      { speaker: "A", japanese: "すみません、駅はどこですか？", romaji: "Sumimasen, eki wa doko desu ka?", meaningVi: "Xin lỗi, ga tàu ở đâu vậy ạ?" },
      { speaker: "B", japanese: "あそこを右に曲がると、すぐ見えますよ。", romaji: "Asoko wo migi ni magaru to, sugu miemasu yo.", meaningVi: "Rẽ phải ở đằng kia là thấy ngay nhé." },
    ],
  },
];

export default function LearnerCommunicationPage() {
  const [selectedScenario, setSelectedScenario] = useState<KaiwaScenario>(SAMPLE_SCENARIOS[0]);
  const [activeRole, setActiveRole] = useState<string>("Tất cả");

  const handleSpeech = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 sm:p-10 text-[#2C2421]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#C65D4B] to-[#D98373] rounded-3xl p-8 text-white shadow-xl flex justify-between items-center relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
              🗣️ KHO HỌC LIỆU GIAO TIẾP TIẾNG NHẬT (KAIWA)
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Hội Thoại &amp; Luyện Nói Tiếng Nhật</h1>
            <p className="text-white/90 text-sm max-w-xl">
              Luyện nghe phát âm giọng Nhật tự nhiên và nhập vai thực hành tình huống giao tiếp đời sống.
            </p>
          </div>
          <div className="hidden md:block text-8xl font-black opacity-20 select-none">
            会話
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Scenarios List */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#231917] border-l-4 border-[#C65D4B] pl-3">
              Chủ Đề Hội Thoại Kaiwa
            </h2>

            <div className="space-y-3">
              {SAMPLE_SCENARIOS.map((sc) => (
                <div
                  key={sc.id}
                  onClick={() => setSelectedScenario(sc)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col space-y-2 ${
                    selectedScenario.id === sc.id
                      ? "bg-[#FAF3EB] border-[#C65D4B] shadow-sm"
                      : "bg-white border-[#DED3C8] hover:border-[#C65D4B]/60"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-[#C65D4B] bg-white px-2.5 py-0.5 rounded-md border border-[#DED3C8]">
                      {sc.level}
                    </span>
                    <span className="text-[10px] text-[#8B6F5A] font-bold">Tình huống #{sc.id}</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-[#231917]">{sc.title}</h3>
                  <p className="text-xs text-[#76685F]">{sc.topic}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Active Roleplay Conversation Viewer */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#DED3C8] pb-4 gap-2">
                <div>
                  <h2 className="text-xl font-extrabold text-[#C65D4B]">{selectedScenario.title}</h2>
                  <p className="text-xs text-[#76685F]">{selectedScenario.topic}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#8B6F5A]">Nhập vai:</span>
                  <select
                    value={activeRole}
                    onChange={(e) => setActiveRole(e.target.value)}
                    className="bg-[#FAF3EB] border border-[#DED3C8] px-3 py-1 rounded-xl text-xs font-bold text-[#231917]"
                  >
                    <option value="Tất cả">Tất cả nhân vật</option>
                    {selectedScenario.roles.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Chat-style Kaiwa Lines */}
              <div className="space-y-4">
                {selectedScenario.lines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-2 transition-all ${
                      idx % 2 === 0
                        ? "bg-[#FFFDF9] border-[#DED3C8]"
                        : "bg-[#FAF3EB]/60 border-[#DED3C8]/80"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-[#C65D4B] uppercase tracking-wider">
                        🗣️ {line.speaker}
                      </span>
                      <button
                        onClick={() => handleSpeech(line.japanese)}
                        className="w-8 h-8 rounded-full bg-[#FAF3EB] hover:bg-[#C65D4B] text-[#56423E] hover:text-white flex items-center justify-center text-xs transition-all shadow-2xs"
                        title="Nghe phát âm"
                      >
                        🔊
                      </button>
                    </div>

                    <h4 className="text-base sm:text-lg font-sans font-bold text-[#231917]">
                      {line.japanese}
                    </h4>

                    <p className="text-xs text-[#8B6F5A] font-jp">{line.romaji}</p>

                    <p className="text-xs font-bold text-[#C65D4B] pt-1 border-t border-[#DED3C8]/40">
                      💡 {line.meaningVi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
