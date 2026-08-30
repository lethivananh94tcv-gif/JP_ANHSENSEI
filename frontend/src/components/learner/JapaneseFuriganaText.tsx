"use client";

import React from "react";

interface JapaneseFuriganaTextProps {
  text: string;
  className?: string;
  rubyClassName?: string;
}

/**
 * Context-aware Japanese Furigana Dictionary for automatic Kanji reading injection.
 * Supports N5, N4, and N3 grammar terminology, verbs, nouns, and compound expressions.
 */
const JAPANESE_FURIGANA_DICTIONARY: [RegExp, string][] = [
  // Grammar terminology
  [/動詞/g, "動詞（どうし）"],
  [/可能形/g, "可能形（かのうけい）"],
  [/受身形/g, "受身形（うけみけい）"],
  [/使役形/g, "使役形（しえきけい）"],
  [/意向形/g, "意向形（いこうけい）"],
  [/命令形/g, "命令形（めいれいけい）"],
  [/禁止形/g, "禁止形（きんしけい）"],
  [/条件形/g, "条件形（じょうけんけい）"],
  [/辞書形/g, "辞書形（じしょけい）"],
  [/普通形/g, "普通形（ふつうけい）"],
  [/丁寧形/g, "丁寧形（ていねいけい）"],
  [/形容詞/g, "形容詞（けいようし）"],
  [/名詞/g, "名詞（めいし）"],
  [/副詞/g, "副詞（ふくし）"],
  [/助詞/g, "助詞（じょし）"],
  [/尊敬語/g, "尊敬語（そんけいご）"],
  [/謙譲語/g, "謙譲語（けんじょうご）"],
  [/会話/g, "会話（かいわ）"],
  [/習慣/g, "習慣（しゅうかん）"],
  [/目的/g, "目的（もくてき）"],
  [/理由/g, "理由（りゆう）"],
  [/結果/g, "結果（けっか）"],
  [/状態/g, "状態（じょうたい）"],
  [/準備/g, "準備（じゅんび）"],
  [/経験/g, "経験（けいけん）"],
  [/比較/g, "比較（ひかく）"],
  [/感情/g, "感情（かんじょう）"],
  [/許可/g, "許可（きょか）"],
  [/禁止/g, "禁止（きんし）"],
  [/義務/g, "義務（ぎむ）"],
  [/推量/g, "推量（すいりょう）"],
  [/違います/g, "違（ちが）います"],
  [/違いない/g, "違（ちが）いない"],

  // Compound phrases & People
  [/アメリカ人/g, "アメリカ人（じん）"],
  [/ベトナム人/g, "ベトナム人（じん）"],
  [/日本人/g, "日本人（じん）"],
  [/中国語/g, "中国語（ちゅうごくご）"],
  [/日本語/g, "日本語（にほんご）"],
  [/あの\s*人/g, "あの 人（ひと）"],
  [/この\s*人/g, "この 人（ひと）"],
  [/その\s*人/g, "その 人（ひと）"],
  [/どの\s*人/g, "どの 人（ひと）"],
  [/一人/g, "一人（ひとり）"],
  [/二人/g, "二人（ふたり）"],
  [/三人/g, "三人（さんにん）"],
  [/四人/g, "四人（よんにん）"],
  [/五人/g, "五人（ごにん）"],
  [/何人/g, "何人（なにじん）"],
  [/私/g, "私（わたし）"],
  [/学生/g, "学生（がくせい）"],
  [/先生/g, "先生（せんせい）"],
  [/田中/g, "田中（たなか）"],
  [/山田/g, "山田（やまだ）"],
  [/佐藤/g, "佐藤（さとう）"],
  [/鈴木/g, "鈴木（すずき）"],
  [/木村/g, "木村（きむら）"],
  [/会社員/g, "会社員（かいしゃいん）"],
  [/社員/g, "社員（しゃいん）"],
  [/銀行員/g, "銀行員（ぎんこういん）"],
  [/医者/g, "医者（いしゃ）"],
  [/研究者/g, "研究者（けんきゅうしゃ）"],
  [/大学/g, "大学（だいがく）"],
  [/病院/g, "病院（びょういん）"],
  [/誰/g, "誰（だれ）"],
  [/方/g, "方（かた）"],
  [/本/g, "本（ほん）"],
  [/辞書/g, "辞書（じしょ）"],
  [/雑誌/g, "雑誌（ざっし）"],
  [/新聞/g, "新聞（しんぶん）"],
  [/手帳/g, "手帳（てちょう）"],
  [/名刺/g, "名刺（めいし）"],
  [/時計/g, "時計（とけい）"],
  [/傘/g, "傘（かさ）"],
  [/自動車/g, "自動車（じどうしゃ）"],
  [/部屋/g, "部屋（へや）"],
  [/教室/g, "教室（きょうしつ）"],
  [/食堂/g, "食堂（しょくどう）"],
  [/事務所/g, "事務所（じむしょ）"],
  [/受付/g, "受付（うけつけ）"],
  [/階段/g, "階段（かいだん）"],
  [/国/g, "国（くに）"],
  [/会社/g, "会社（かいしゃ）"],
  [/靴/g, "靴（くつ）"],
  [/売り場/g, "売り場（うりば）"],
  [/日本/g, "日本（にほん）"],
  [/今日/g, "今日（きょう）"],
  [/明日/g, "明日（あした）"],
  [/昨日/g, "昨日（きのう）"],
  [/毎日/g, "毎日（まいにち）"],
  [/朝/g, "朝（あさ）"],
  [/昼/g, "昼（ひる）"],
  [/晩/g, "晩（ばん）"],
  [/夜/g, "夜（よる）"],
  [/今/g, "今（いま）"],
  [/行きます/g, "行（い）きます"],
  [/来ます/g, "来（き）ます"],
  [/帰ります/g, "帰（かえ）ります"],
  [/食べます/g, "食（た）べます"],
  [/飲みます/g, "飲（の）みます"],
  [/買います/g, "買（か）います"],
  [/見ます/g, "見（み）ます"],
  [/聞きます/g, "聞（き）ます"],
  [/書きます/g, "書（か）きます"],
  [/勉強/g, "勉強（べんきょう）"],
];

function autoInjectFurigana(raw: string): string {
  if (!raw) return "";
  let formatted = raw;
  for (const [regex, replacement] of JAPANESE_FURIGANA_DICTIONARY) {
    formatted = formatted.replace(regex, (match) => {
      // Don't double inject if already formatted with parentheses right after
      if (match.includes("（") || match.includes("(")) return match;
      return replacement;
    });
  }
  return formatted;
}

/**
 * Parses Japanese text with Furigana notation like "動詞（どうし）" or "漢字(かんじ)"
 * and renders clean, accessible <ruby><rt>...</rt></ruby> elements with furigana above Kanji.
 */
export default function JapaneseFuriganaText({
  text,
  className = "",
  rubyClassName = "text-[11px] font-bold text-[#B94A3E] select-none leading-none",
}: JapaneseFuriganaTextProps) {
  if (!text) return null;

  const formattedText = autoInjectFurigana(text);

  // Regex to match "Kanji（furigana）" or "Kanji(furigana)"
  const rubyRegex = /([一-龯ヶ]+)[（\(]([ぁ-んァ-ヶ]+)[）\)]/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = rubyRegex.exec(formattedText)) !== null) {
    if (match.index > lastIndex) {
      parts.push(formattedText.substring(lastIndex, match.index));
    }

    const kanji = match[1];
    const furigana = match[2];

    parts.push(
      <ruby key={match.index} className="font-jp font-bold text-[#1F1714]">
        {kanji}
        <rt className={rubyClassName}>{furigana}</rt>
      </ruby>
    );

    lastIndex = rubyRegex.lastIndex;
  }

  if (lastIndex < formattedText.length) {
    parts.push(formattedText.substring(lastIndex));
  }

  return <span className={`font-jp leading-loose ${className}`}>{parts}</span>;
}

