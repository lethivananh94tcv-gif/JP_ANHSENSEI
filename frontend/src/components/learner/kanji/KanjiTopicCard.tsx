"use client";

import { ArrowRight, BookOpen, Layers, CheckCircle2 } from "lucide-react";

export interface KanjiTopicCardData {
  topicId: number;
  title: string;
  jlptLevel: string;
  topicOrder: number;
  description: string;
}

interface KanjiTopicCardProps {
  topic: KanjiTopicCardData;
  onClick: (topicId: number) => void;
}

export function parseTopicCardInfo(title: string, description: string) {
  let cleanTitle = description || title;
  let characters: string[] = [];

  // Match Kanji inside parentheses e.g. (会, 動, 歩, 急...)
  const match = cleanTitle.match(/\(([^)]+)\)/);
  if (match) {
    const rawChars = match[1];
    characters = rawChars.split(/[,、\s]+/).filter(Boolean);
    cleanTitle = cleanTitle.replace(/\([^)]+\)/, "").trim();
  }

  // Strip prefixes like "Chữ Hán N4 #1: " or "Chữ Hán N3 #5: "
  cleanTitle = cleanTitle.replace(/^Chữ Hán N\d\s*#\d+:\s*/i, "").trim();

  if (!cleanTitle || cleanTitle === "") {
    cleanTitle = title;
  }

  return { cleanTitle, characters };
}

export default function KanjiTopicCard({ topic, onClick }: KanjiTopicCardProps) {
  const { cleanTitle, characters } = parseTopicCardInfo(topic.title, topic.description);
  const displayChars = characters.slice(0, 8);
  const remainingCount = characters.length > 8 ? characters.length - 8 : 0;

  return (
    <div
      onClick={() => onClick(topic.topicId)}
      className="bg-white border-2 border-[#DED3C8] hover:border-[#C65D4B] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group space-y-4 relative overflow-hidden"
    >
      {/* Background Watermark for main character */}
      {characters.length > 0 && (
        <span className="absolute -right-3 -bottom-5 text-7xl font-serif font-black text-[#8B6F5A]/5 group-hover:text-[#C65D4B]/10 select-none pointer-events-none transition-colors">
          {characters[0]}
        </span>
      )}

      <div className="space-y-3.5 z-10">
        {/* Header Badges */}
        <div className="flex justify-between items-center">
          <span className="text-xs font-black text-[#C65D4B] bg-[#FAF3EB] px-3.5 py-1 rounded-full border border-[#DED3C8] shadow-2xs">
            JLPT {topic.jlptLevel} • Bài #{topic.topicOrder || topic.topicId}
          </span>
          <span className="text-[10px] font-extrabold bg-[#FAF3EB] text-[#8B6F5A] px-2.5 py-1 rounded-full border border-[#DED3C8]">
            {characters.length > 0 ? `${characters.length} Chữ Hán` : `Bài học ${topic.jlptLevel}`}
          </span>
        </div>

        {/* Clean Title */}
        <div>
          <h3 className="text-base font-sans font-black text-[#231917] group-hover:text-[#C65D4B] transition-colors leading-snug">
            {cleanTitle}
          </h3>
        </div>

        {/* Kanji Characters Preview Grid */}
        {characters.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {displayChars.map((ch, idx) => (
              <span
                key={idx}
                className="w-7 h-7 flex items-center justify-center bg-[#FAF3EB] group-hover:bg-[#C65D4B] text-[#C65D4B] group-hover:text-white border border-[#DED3C8] rounded-lg text-xs font-black transition-all shadow-2xs group-hover:scale-105"
              >
                {ch}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="px-2 h-7 flex items-center justify-center bg-[#FAF3EB] text-[#8B6F5A] border border-[#DED3C8] rounded-lg text-[10px] font-extrabold">
                +{remainingCount} nữa
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Link */}
      <div className="pt-3 border-t border-[#DED3C8]/60 flex justify-between items-center text-xs font-black text-[#C65D4B] z-10">
        <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
          Bắt đầu luyện tập <ArrowRight className="w-3.5 h-3.5" />
        </span>
        <span className="w-7 h-7 rounded-full bg-[#FAF3EB] group-hover:bg-[#C65D4B] group-hover:text-white flex items-center justify-center transition-all shadow-2xs">
          ➔
        </span>
      </div>
    </div>
  );
}
