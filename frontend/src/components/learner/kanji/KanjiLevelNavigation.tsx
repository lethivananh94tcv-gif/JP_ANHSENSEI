"use client";

export type KanjiTabType = "RADICALS" | "N5" | "N4" | "N3" | "N2" | "N1";

interface KanjiLevelNavigationProps {
  activeTab: KanjiTabType;
  onTabChange: (tab: KanjiTabType) => void;
  topicCounts?: Record<string, number>;
}

export default function KanjiLevelNavigation({
  activeTab,
  onTabChange,
  topicCounts = {},
}: KanjiLevelNavigationProps) {
  const tabs: { id: KanjiTabType; label: string; badge: string; color: string }[] = [
    { id: "RADICALS", label: "⛩️ 214 Bộ Thủ", badge: "214 bộ", color: "bg-[#8B261D]" },
    { id: "N5", label: "🔴 Kanji N5", badge: `${topicCounts["N5"] || 25} bài`, color: "bg-rose-600" },
    { id: "N4", label: "🟠 Kanji N4", badge: `${topicCounts["N4"] || 25} bài`, color: "bg-amber-600" },
    { id: "N3", label: "🟡 Kanji N3", badge: `${topicCounts["N3"] || 25} bài`, color: "bg-yellow-600" },
    { id: "N2", label: "🟢 Kanji N2", badge: `${topicCounts["N2"] || 20} bài`, color: "bg-emerald-600" },
    { id: "N1", label: "🔵 Kanji N1", badge: `${topicCounts["N1"] || 20} bài`, color: "bg-sky-600" },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none bg-[#FAF3EB] border-2 border-[#E5D7C5] p-2.5 rounded-2xl shadow-2xs">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap border flex items-center gap-2 cursor-pointer ${
              isActive
                ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-md scale-102"
                : "bg-white text-[#8B6F5A] border-[#DED3C8] hover:border-[#C65D4B] hover:text-[#C65D4B]"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                isActive ? "bg-white/20 text-white" : "bg-[#FAF3EB] text-[#8B6F5A]"
              }`}
            >
              {tab.badge}
            </span>
          </button>
        );
      })}
    </div>
  );
}
