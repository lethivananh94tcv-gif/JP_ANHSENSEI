"use client";

interface LessonContentTabsProps {
  activeTab: "vocab" | "kanji" | "grammar";
  vocabCount: number;
  kanjiCount: number;
  grammarCount: number;
  onTabChange: (tab: "vocab" | "kanji" | "grammar") => void;
}

export default function LessonContentTabs({
  activeTab,
  vocabCount,
  kanjiCount,
  grammarCount,
  onTabChange,
}: LessonContentTabsProps) {
  const tabs = [
    { id: "vocab" as const, label: "Từ vựng", icon: "🎴", count: vocabCount },
    { id: "kanji" as const, label: "Hán tự (Kanji)", icon: "✍️", count: kanjiCount },
    { id: "grammar" as const, label: "Ngữ pháp", icon: "📖", count: grammarCount },
  ];

  return (
    <div className="flex items-center gap-2 bg-[#FFFDF9] border border-[#DED3C8] p-1.5 rounded-2xl shadow-2xs overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap min-h-[44px] ${
              isActive
                ? "bg-[#8B6F5A] text-white shadow-sm"
                : "text-[#56423E] hover:bg-[#F5EFE6] hover:text-[#231917]"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                isActive ? "bg-white/20 text-white" : "bg-[#F5EFE6] text-[#8B6F5A]"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
