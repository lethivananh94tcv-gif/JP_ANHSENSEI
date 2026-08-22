"use client";

interface VocabularyModeSelectorProps {
  onSelectMode: (mode: "list" | "cards" | "typing") => void;
  disabled?: boolean;
}

export default function VocabularyModeSelector({
  onSelectMode,
  disabled = false,
}: VocabularyModeSelectorProps) {
  const modes = [
    {
      key: "list" as const,
      title: "Xem từ",
      subtext: "Tra cứu nhanh",
      bgColor: "bg-[#F3D99B]",
      borderColor: "border-[#E5C77F]",
      textColor: "text-[#302A26]",
      icon: (
        <svg className="w-6 h-6 text-[#8B6F5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      key: "cards" as const,
      title: "Lật thẻ",
      subtext: "Nhớ bằng thẻ",
      bgColor: "bg-[#BFD6B8]",
      borderColor: "border-[#A7C2A0]",
      textColor: "text-[#233520]",
      icon: (
        <svg className="w-6 h-6 text-[#4F6A4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      key: "typing" as const,
      title: "Luyện gõ",
      subtext: "Romaji hoặc Kana",
      bgColor: "bg-[#BFD9E8]",
      borderColor: "border-[#A4C7DB]",
      textColor: "text-[#1C3240]",
      icon: (
        <svg className="w-6 h-6 text-[#38596E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section aria-label="Lựa chọn chế độ học" className="space-y-4">
      <h3 className="text-lg font-serif font-black text-[#302A26]">
        Hôm nay học kiểu gì?
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {modes.map((m) => (
          <button
            key={m.key}
            type="button"
            disabled={disabled}
            onClick={() => onSelectMode(m.key)}
            className={`group p-5 rounded-3xl border ${m.bgColor} ${m.borderColor} shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between min-h-[110px] ${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-white/60 rounded-2xl border border-white/80 shadow-2xs group-hover:scale-105 transition-transform">
                {m.icon}
              </div>
              <span className="text-xs font-black text-[#8B6F5A] opacity-0 group-hover:opacity-100 transition-opacity">
                Mở ➔
              </span>
            </div>

            <div className="pt-2">
              <h4 className={`text-base font-extrabold ${m.textColor}`}>
                {m.title}
              </h4>
              <p className="text-xs font-semibold text-[#756A62]">
                {m.subtext}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
