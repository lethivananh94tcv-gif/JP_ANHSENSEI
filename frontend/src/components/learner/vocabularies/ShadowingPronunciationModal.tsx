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
  Award,
  Layers,
  BookOpen
} from "lucide-react";
import {
  playJapaneseTTS,
  stopJapaneseTTS,
  getGlobalTTSRate,
  setGlobalTTSRate,
} from "@/lib/utils/japaneseAudioTTS";
import PitchAccentBadge from "./PitchAccentBadge";

export interface ShadowingItem {
  id: string;
  japanese: string;
  reading: string;
  meaning: string;
  pitchPattern: "atamadaka" | "nakadaka" | "odaka" | "heiban";
  moraBreakdown: string;
  note: string;
}

// 1. High-frequency Pitch Accent Sample Words
const SAMPLE_SHADOWING_ITEMS: ShadowingItem[] = [
  {
    id: "s1",
    japanese: "雨",
    reading: "あめ (A-me)",
    meaning: "Cơn mưa (Mưa rơi)",
    pitchPattern: "atamadaka",
    moraBreakdown: "A (Cao) ➔ me (Thấp)",
    note: "🔴 Đầu cao (Atamadaka): Đọc A cao vút rồi hạ me xuống thấp.",
  },
  {
    id: "s2",
    japanese: "飴",
    reading: "あめ (a-ME)",
    meaning: "Kẹo ngọt",
    pitchPattern: "heiban",
    moraBreakdown: "a (Thấp) ➔ ME (Cao)",
    note: "⚪ Bằng phẳng (Heiban): Đọc a thấp rồi lên ME cao kéo dài.",
  },
  {
    id: "s3",
    japanese: "卵",
    reading: "たまご (ta-MA-go)",
    meaning: "Quả trứng",
    pitchPattern: "nakadaka",
    moraBreakdown: "ta (Thấp) ➔ MA (Cao) ➔ go (Thấp)",
    note: "🟢 Giữa cao (Nakadaka): Nhấn cao ở âm MA ở giữa.",
  },
  {
    id: "s4",
    japanese: "山",
    reading: "やま (ya-MA)",
    meaning: "Ngọn núi",
    pitchPattern: "odaka",
    moraBreakdown: "ya (Thấp) ➔ MA (Cao) ➔ [ga (Thấp)]",
    note: "🔵 Cuối cao (Odaka): Nhấn cao ở MA, nhưng hạ thấp khi ghép trợ từ.",
  },
  {
    id: "s5",
    japanese: "初めまして、どうぞよろしく。",
    reading: "はじめまして、どうぞよろしく。",
    meaning: "Rất hân hạnh được làm quen với bạn.",
    pitchPattern: "heiban",
    moraBreakdown: "Ha-ji-me-mashi-te (Hơi nhịp nhàng) ➔ desu/masu nuốt âm.",
    note: "✨ Câu giao tiếp mẫu: Chú ý nuốt âm nhẹ ở して (sh-te) và く (k).",
  },
  {
    id: "s6",
    japanese: "日本語を楽しく勉強しています。",
    reading: "にほんごを たのしく べんきょうしています。",
    meaning: "Tôi đang học tiếng Nhật một cách vui vẻ.",
    pitchPattern: "nakadaka",
    moraBreakdown: "Ni-hon-go (4 moras) ➔ ta-no-shi-ku ➔ ben-kyou.",
    note: "✨ Luyện nhịp Mora: Giữ mỗi âm tiết (ん, きょう) có độ dài tròn 1 nhịp.",
  },
];

// 2. Full Kana Alphabet Dataset (20 Groups)
const FULL_KANA_ITEMS: ShadowingItem[] = [
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
    japanese: "か・き・く・け・こ",
    reading: "KA - KI - KU - KE - KO",
    meaning: "Hàng KA (Âm bật cổ họng)",
    pitchPattern: "heiban",
    moraBreakdown: "KA ➔ KI ➔ KU ➔ KE ➔ KO",
    note: "⚡ Nhấn nhịp đều 1 mora từng chữ.",
  },
  {
    id: "k3",
    japanese: "さ・し・す・せ・そ",
    reading: "SA - SHI - SU - SE - SO",
    meaning: "Hàng SA (Âm ma sát răng)",
    pitchPattern: "heiban",
    moraBreakdown: "SA ➔ SHI ➔ SU ➔ SE ➔ SO",
    note: "⚡ Giữ âm SHI (し) phát âm qua kẽ răng nhẹ nhàng.",
  },
  {
    id: "k4",
    japanese: "た・ち・つ・て・と",
    reading: "TA - CHI - TSU - TE - TO",
    meaning: "Hàng TA (Âm đầu lưỡi)",
    pitchPattern: "heiban",
    moraBreakdown: "TA ➔ CHI ➔ TSU ➔ TE ➔ TO",
    note: "⚡ Âm TSU (つ) đẩy hơi qua đầu lưỡi chạm nướu răng.",
  },
  {
    id: "k5",
    japanese: "な・に・ぬ・ね・の",
    reading: "NA - NI - NU - NE - NO",
    meaning: "Hàng NA (Âm mũi)",
    pitchPattern: "heiban",
    moraBreakdown: "NA ➔ NI ➔ NU ➔ NE ➔ NO",
    note: "🌸 Âm mũi mềm mại, thoát hơi qua mũi.",
  },
  {
    id: "k6",
    japanese: "は・ひ・ふ・へ・ほ",
    reading: "HA - HI - FU - HE - HO",
    meaning: "Hàng HA (Âm môi họng)",
    pitchPattern: "heiban",
    moraBreakdown: "HA ➔ HI ➔ FU ➔ HE ➔ HO",
    note: "🌸 FU (ふ) chúm môi thổi hơi nhẹ nhàng.",
  },
  {
    id: "k7",
    japanese: "ま・み・む・め・も",
    reading: "MA - MI - MU - ME - MO",
    meaning: "Hàng MA (Âm khép môi)",
    pitchPattern: "heiban",
    moraBreakdown: "MA ➔ MI ➔ MU ➔ ME ➔ MO",
    note: "⚡ Khép nhẹ 2 môi trước khi phát âm.",
  },
  {
    id: "k8",
    japanese: "や・ゆ・よ",
    reading: "YA - YU - YO",
    meaning: "Hàng YA (Bán nguyên âm)",
    pitchPattern: "heiban",
    moraBreakdown: "YA ➔ YU ➔ YO",
    note: "🌸 Âm lướt nguyên âm mềm mại.",
  },
  {
    id: "k9",
    japanese: "ら・り・る・れ・ろ",
    reading: "RA - RI - RU - RE - RO",
    meaning: "Hàng RA (Âm uốn lưỡi nhẹ)",
    pitchPattern: "heiban",
    moraBreakdown: "RA ➔ RI ➔ RU ➔ RE ➔ RO",
    note: "⚡ Đầu lưỡi chạm nhẹ vòm họng trên.",
  },
  {
    id: "k10",
    japanese: "わ・を・ん",
    reading: "WA - WO - N",
    meaning: "Hàng WA & Âm mũi N",
    pitchPattern: "heiban",
    moraBreakdown: "WA ➔ WO ➔ N (ん)",
    note: "⚡ ん (N) kéo dài tròn 1 nhịp mora riêng biệt.",
  },
  {
    id: "k11",
    japanese: "が・ぎ・ぐ・げ・ご",
    reading: "GA - GI - GU - GE - GO",
    meaning: "Âm đục (Dakuon ゛ - Hàng G)",
    pitchPattern: "atamadaka",
    moraBreakdown: "GA ➔ GI ➔ GU ➔ GE ➔ GO (Rung cuống họng)",
    note: "⚡ Âm đục: Rung dây thanh đới trong cổ họng khi phát âm.",
  },
  {
    id: "k12",
    japanese: "ざ・じ・ず・ぜ・ぞ",
    reading: "ZA - JI - ZU - ZE - ZO",
    meaning: "Âm đục (Dakuon ゛ - Hàng Z)",
    pitchPattern: "atamadaka",
    moraBreakdown: "ZA ➔ JI ➔ ZU ➔ ZE ➔ ZO",
    note: "⚡ Rung thanh quản rõ rệt.",
  },
  {
    id: "k13",
    japanese: "だ・ぢ・づ・で・ど",
    reading: "DA - JI - ZU - DE - DO",
    meaning: "Âm đục (Dakuon ゛ - Hàng D)",
    pitchPattern: "atamadaka",
    moraBreakdown: "DA ➔ JI ➔ ZU ➔ DE ➔ DO",
    note: "⚡ Âm bật đục có độ nảy mạnh.",
  },
  {
    id: "k14",
    japanese: "ば・び・ぶ・べ・ぼ",
    reading: "BA - BI - BU - BE - BO",
    meaning: "Âm đục (Dakuon ゛ - Hàng B)",
    pitchPattern: "atamadaka",
    moraBreakdown: "BA ➔ BI ➔ BU ➔ BE ➔ BO",
    note: "⚡ Đậm đà, khép môi bật rung.",
  },
  {
    id: "k15",
    japanese: "ぱ・ぴ・ぷ・ぺ・ぽ",
    reading: "PA - PI - PU - PE - PO",
    meaning: "Âm bán đục (Handakuon ゜ - Hàng P)",
    pitchPattern: "nakadaka",
    moraBreakdown: "Mút 2 môi lại rồi bật hơi nhẹ ra ngoài.",
    note: "✨ Âm bán đục: Bật nổ nhẹ bờ môi, phát âm bổng và trong.",
  },
  {
    id: "k16",
    japanese: "きゃ・きゅ・きょ",
    reading: "KYA - KYU - KYO",
    meaning: "Âm ghép (Yoon ゃゅょ - Hàng K)",
    pitchPattern: "heiban",
    moraBreakdown: "Đọc ghép 2 chữ thành duy nhất 1 nhịp (1 Mora).",
    note: "🌸 Âm ghép: Đọc lướt nhanh 1 nhịp, không tách 2 âm rời.",
  },
  {
    id: "k17",
    japanese: "しゃ・しゅ・しょ",
    reading: "SHA - SHU - SHO",
    meaning: "Âm ghép (Yoon ゃゅょ - Hàng S)",
    pitchPattern: "heiban",
    moraBreakdown: "SHA ➔ SHU ➔ SHO",
    note: "🌸 Âm ghép uốn lưỡi nhẹ.",
  },
  {
    id: "k18",
    japanese: "ちゃ・ちゅ・ちょ",
    reading: "CHA - CHU - CHO",
    meaning: "Âm ghép (Yoon ゃゅょ - Hàng C)",
    pitchPattern: "heiban",
    moraBreakdown: "CHA ➔ CHU ➔ CHO",
    note: "🌸 Âm ghép bật hơi gọn.",
  },
  {
    id: "k19",
    japanese: "おばあさん",
    reading: "おばあさん (Obāsan)",
    meaning: "Người bà (Trường âm)",
    pitchPattern: "heiban",
    moraBreakdown: "O - BA - A - SA - N (Tròn 5 Moras nhịp đều)",
    note: "⏳ Trường âm: Kéo dài âm ば thành 2 nhịp (ばあ).",
  },
  {
    id: "k20",
    japanese: "きって",
    reading: "きって (Kitte)",
    meaning: "Tem thư (Âm ngắt っ)",
    pitchPattern: "odaka",
    moraBreakdown: "KI - [っ (ngắt 1 nhịp)] - TE (3 Moras)",
    note: "⏹️ Âm ngắt っ: Dừng hơi tròn 1 nhịp nghỉ ở chữ っ nhỏ.",
  },
];

// 3. N5 Vocabulary Shadowing Full List
const N5_VOCAB_ITEMS: ShadowingItem[] = [
  { id: "n5-1", japanese: "私", reading: "わたし (wa-TA-shi)", meaning: "Tôi", pitchPattern: "heiban", moraBreakdown: "wa (Thấp) ➔ TA ➔ SHI (Cao)", note: "⚪ Heiban: Đọc nâng dần nhịp âm." },
  { id: "n5-2", japanese: "学生", reading: "がくせい (ga-KU-SE-I)", meaning: "Học sinh, sinh viên", pitchPattern: "heiban", moraBreakdown: "ga (Thấp) ➔ KU ➔ SE ➔ I (Cao)", note: "⚪ Heiban: Đọc bằng phẳng tự nhiên." },
  { id: "n5-3", japanese: "会社員", reading: "かいしゃいん (ka-I-SHA-I-N)", meaning: "Nhân viên công ty", pitchPattern: "nakadaka", moraBreakdown: "ka ➔ I ➔ SHA (Cao) ➔ i ➔ n (Thấp)", note: "🟢 Nakadaka: Nhấn cao ở âm giữa." },
  { id: "n5-4", japanese: "本", reading: "ほん (HO-N)", meaning: "Sách", pitchPattern: "atamadaka", moraBreakdown: "HO (Cao) ➔ n (Thấp)", note: "🔴 Atamadaka: Đọc HO cao vút rồi hạ n." },
  { id: "n5-5", japanese: "自動車", reading: "じどうしゃ (ji-DO-U-sha)", meaning: "Xe ô tô", pitchPattern: "nakadaka", moraBreakdown: "ji ➔ DO ➔ U (Cao) ➔ sha (Thấp)", note: "🟢 Nakadaka: Nhấn ở DO-U." },
  { id: "n5-6", japanese: "食べる", reading: "たべる (ta-BE-ru)", meaning: "Ăn", pitchPattern: "nakadaka", moraBreakdown: "ta (Thấp) ➔ BE (Cao) ➔ ru (Thấp)", note: "🟢 Động từ nhóm 2: Nhấn ở âm BE." },
  { id: "n5-7", japanese: "飲む", reading: "のむ (NO-mu)", meaning: "Uống", pitchPattern: "atamadaka", moraBreakdown: "NO (Cao) ➔ mu (Thấp)", note: "🔴 Động từ nhóm 1: Nhấn ở NO." },
  { id: "n5-8", japanese: "行く", reading: "いく (i-KU)", meaning: "Đi", pitchPattern: "heiban", moraBreakdown: "i (Thấp) ➔ KU (Cao)", note: "⚪ Heiban: Lên cao ở KU." },
  { id: "n5-9", japanese: "大きい", reading: "おおきい (o-O-KI-i)", meaning: "To lớn", pitchPattern: "nakadaka", moraBreakdown: "o ➔ O ➔ KI (Cao) ➔ i (Thấp)", note: "🟢 Tính từ i: Nhấn cao trước chữ i." },
  { id: "n5-10", japanese: "静か（な）", reading: "しずか (SHI-zu-ka)", meaning: "Yên tĩnh", pitchPattern: "atamadaka", moraBreakdown: "SHI (Cao) ➔ zu ➔ ka (Thấp)", note: "🔴 Tính từ na: Nhấn ở âm đầu SHI." },
];

// 4. N4 Vocabulary Shadowing Full List
const N4_VOCAB_ITEMS: ShadowingItem[] = [
  { id: "n4-1", japanese: "予約（する）", reading: "よやく (yo-YA-KU)", meaning: "Đặt trước", pitchPattern: "heiban", moraBreakdown: "yo (Thấp) ➔ YA ➔ KU (Cao)", note: "⚪ Heiban: Đọc bằng phẳng." },
  { id: "n4-2", japanese: "経験（する）", reading: "けいけん (ke-I-KE-N)", meaning: "Kinh nghiệm", pitchPattern: "heiban", moraBreakdown: "ke ➔ I ➔ KE ➔ N (Cao)", note: "⚪ Tròn 4 moras nhịp đều." },
  { id: "n4-3", japanese: "相談（する）", reading: "そうだん (so-U-da-n)", meaning: "Thảo luận, trao đổi", pitchPattern: "atamadaka", moraBreakdown: "SO (Cao) ➔ u ➔ da ➔ n (Thấp)", note: "🔴 Atamadaka: Nhấn cao ở SO." },
  { id: "n4-4", japanese: "運転（する）", reading: "うんてん (u-N-TE-N)", meaning: "Lái xe", pitchPattern: "heiban", moraBreakdown: "u ➔ N ➔ TE ➔ N (Cao)", note: "⚪ Âm ngắt & âm mũi chuẩn mora." },
  { id: "n4-5", japanese: "注意（する）", reading: "ちゅうい (CHU-u-i)", meaning: "Chú ý", pitchPattern: "atamadaka", moraBreakdown: "CHU (Cao) ➔ u ➔ i (Thấp)", note: "🔴 Nhấn ở CHU." },
  { id: "n4-6", japanese: "複雑（な）", reading: "ふくざつ (fu-KU-ZA-tsu)", meaning: "Phức tạp", pitchPattern: "heiban", moraBreakdown: "fu ➔ KU ➔ ZA ➔ tsu (Cao)", note: "⚪ Tính từ na heiban." },
  { id: "n4-7", japanese: "親切（な）", reading: "しんせつ (SHI-n-se-tsu)", meaning: "Tốt bụng, thân thiện", pitchPattern: "atamadaka", moraBreakdown: "SHI (Cao) ➔ n ➔ se ➔ tsu (Thấp)", note: "🔴 Nhấn cao ở SHI." },
  { id: "n4-8", japanese: "熱心（な）", reading: "ねっしん (NE-s-shi-n)", meaning: "Nhiệt tình", pitchPattern: "atamadaka", moraBreakdown: "NE (Cao) ➔ っ ➔ shi ➔ n (Thấp)", note: "🔴 Có âm ngắt っ." },
];

// 5. N3 Vocabulary Shadowing Full List
const N3_VOCAB_ITEMS: ShadowingItem[] = [
  { id: "n3-1", japanese: "履歴書", reading: "りれきしょ (ri-RE-KI-sho)", meaning: "Sơ yếu lý lịch", pitchPattern: "heiban", moraBreakdown: "ri (Thấp) ➔ RE ➔ KI ➔ sho (Cao)", note: "⚪ Heiban: Đọc phẳng âm tự nhiên." },
  { id: "n3-2", japanese: "観光（する）", reading: "かんこう (ka-N-KO-U)", meaning: "Tham quan du lịch", pitchPattern: "heiban", moraBreakdown: "ka ➔ N ➔ KO ➔ U (Cao)", note: "⚪ Đọc kéo dài trường âm こう." },
  { id: "n3-3", japanese: "宿泊（する）", reading: "しゅくはく (shu-KU-HA-ku)", meaning: "Trọ lại, lưu trú", pitchPattern: "heiban", moraBreakdown: "shu ➔ KU ➔ HA ➔ ku (Cao)", note: "⚪ Giữ âm ghép しゅ gọn 1 mora." },
  { id: "n3-4", japanese: "集合（する）", reading: "しゅうごう (shu-U-GO-U)", meaning: "Tập trung, tập hợp", pitchPattern: "heiban", moraBreakdown: "shu ➔ U ➔ GO ➔ U (Cao)", note: "⚪ Hai trường âm う." },
  { id: "n3-5", japanese: "提案（する）", reading: "ていあん (te-I-A-N)", meaning: "Đề xuất, kiến nghị", pitchPattern: "heiban", moraBreakdown: "te ➔ I ➔ A ➔ N (Cao)", note: "⚪ 4 moras đều đặn." },
  { id: "n3-6", japanese: "満室", reading: "まんしつ (MA-n-shi-tsu)", meaning: "Hết phòng", pitchPattern: "atamadaka", moraBreakdown: "MA (Cao) ➔ n ➔ shi ➔ tsu (Thấp)", note: "🔴 Atamadaka: Nhấn cao ở MA." },
  { id: "n3-7", japanese: "建つ", reading: "たつ (ta-TSU)", meaning: "Được xây dựng", pitchPattern: "odaka", moraBreakdown: "ta (Thấp) ➔ TSU (Cao)", note: "🔵 Tự động từ nhóm 1." },
  { id: "n3-8", japanese: "水族館", reading: "すいぞくかん (su-I-ZO-KU-ka-n)", meaning: "Thủy cung", pitchPattern: "nakadaka", moraBreakdown: "su ➔ I ➔ ZO ➔ KU (Cao) ➔ ka ➔ n (Thấp)", note: "🟢 Nhấn ở ZO-KU." },
];

// Helper function to split Japanese Kana/Romaji into Moras
function splitIntoMoras(text: string): string[] {
  const clean = text.split("(")[0].trim().replace(/[\s\-\.\,\!\?]/g, "");
  const moras: string[] = [];
  let i = 0;
  while (i < clean.length) {
    const char = clean[i];
    const nextChar = clean[i + 1];
    if (nextChar && /[ゃゅょャュョ]/.test(nextChar)) {
      moras.push(char + nextChar);
      i += 2;
    } else {
      moras.push(char);
      i++;
    }
  }
  return moras.length > 0 ? moras : [text];
}

// Generate explicit High/Low pitch breakdown for any word based on Tokyo pitch pattern
function generateMoraBreakdown(reading: string, pitchPattern: string = "heiban"): { moraBreakdown: string; note: string } {
  const cleanReading = reading.split("(")[0].trim();
  const moras = splitIntoMoras(cleanReading);
  const n = moras.length;

  if (n <= 1) {
    return {
      moraBreakdown: `${cleanReading} (1 Mora - Âm đơn)`,
      note: "✨ Âm đơn: Giữ tròn 1 nhịp thở phát âm bổng tự nhiên.",
    };
  }

  let formatted = "";
  let note = "";

  if (pitchPattern === "atamadaka") {
    const highMora = moras[0];
    const lowMoras = moras.slice(1).join(" ➔ ");
    formatted = `${highMora} (Cao) ➔ ${lowMoras} (Thấp)`;
    note = `🔴 Đầu cao (Atamadaka): Nhấn cao giọng ở âm đầu [${highMora}], sau đó hạ thấp giọng ở các âm tiếp theo [${moras.slice(1).join(", ")}].`;
  } else if (pitchPattern === "nakadaka") {
    const midCut = Math.max(1, Math.min(n - 1, Math.floor(n / 2)));
    const lowStart = moras[0];
    const highPart = moras.slice(1, midCut + 1).join(" ➔ ");
    const lowEnd = moras.slice(midCut + 1).join(" ➔ ");
    
    if (lowEnd) {
      formatted = `${lowStart} (Thấp) ➔ ${highPart} (Cao) ➔ ${lowEnd} (Thấp)`;
    } else {
      formatted = `${lowStart} (Thấp) ➔ ${highPart} (Cao)`;
    }
    note = `🟢 Giữa cao (Nakadaka): Âm đầu [${lowStart}] đọc thấp, lên cao ở âm giữa [${moras.slice(1, midCut + 1).join(", ")}], rồi hạ thấp ở các âm còn lại.`;
  } else if (pitchPattern === "odaka") {
    const lowStart = moras[0];
    const highPart = moras.slice(1).join(" ➔ ");
    formatted = `${lowStart} (Thấp) ➔ ${highPart} (Cao) [Trợ từ hạ Thấp]`;
    note = `🔵 Cuối cao (Odaka): Đọc âm đầu [${lowStart}] thấp, giữ cao lên các âm cuối [${moras.slice(1).join(", ")}], hạ thấp khi nối trợ từ (が/を/に).`;
  } else {
    // Default: Heiban
    const lowStart = moras[0];
    const highPart = moras.slice(1).join(" ➔ ");
    formatted = `${lowStart} (Thấp) ➔ ${highPart} (Cao)`;
    note = `⚪ Bằng phẳng (Heiban): Âm đầu [${lowStart}] đọc thấp nhẹ, các âm tiếp theo [${moras.slice(1).join(", ")}] lên cao và kéo ngang bằng phẳng tự nhiên.`;
  }

  return { moraBreakdown: formatted, note };
}

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
  const [selectedCategory, setSelectedCategory] = useState<"SAMPLE" | "KANA" | "N5" | "N4" | "N3">("SAMPLE");

  // Audio Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const userAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to pick mobile-supported MIME types (iOS Safari, Android Chrome, Desktop)
  const getSupportedMimeType = (): string => {
    if (typeof window === "undefined" || !window.MediaRecorder) return "";
    const types = [
      "audio/mp4",
      "audio/aac",
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/wav",
    ];
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return "";
  };

  useEffect(() => {
    if (isOpen) {
      setActiveItemIndex(0);
      setAudioBlobUrl(null);
      setIsRecording(false);
      stopJapaneseTTS();
      if (mode === "KANA") {
        setSelectedCategory("KANA");
      } else {
        setSelectedCategory("SAMPLE");
      }
    }
  }, [isOpen, singleWord, customItems, mode]);

  // Determine active items list based on Category selector or passed props
  let itemsToDisplay: ShadowingItem[] = SAMPLE_SHADOWING_ITEMS;

  if (singleWord) {
    const generated = generateMoraBreakdown(
      singleWord.kana || singleWord.word,
      singleWord.pitchPattern || "heiban"
    );
    itemsToDisplay = [
      {
        id: "single-1",
        japanese: singleWord.word,
        reading: singleWord.kana || singleWord.word,
        meaning: singleWord.meaning || "Từ vựng bài học",
        pitchPattern: singleWord.pitchPattern || "heiban",
        moraBreakdown: generated.moraBreakdown,
        note: generated.note,
      },
    ];
  } else if (customItems && customItems.length > 0) {
    itemsToDisplay = customItems;
  } else {
    if (selectedCategory === "KANA") {
      itemsToDisplay = FULL_KANA_ITEMS;
    } else if (selectedCategory === "N5") {
      itemsToDisplay = N5_VOCAB_ITEMS;
    } else if (selectedCategory === "N4") {
      itemsToDisplay = N4_VOCAB_ITEMS;
    } else if (selectedCategory === "N3") {
      itemsToDisplay = N3_VOCAB_ITEMS;
    } else {
      itemsToDisplay = SAMPLE_SHADOWING_ITEMS;
    }
  }

  const currentItem = itemsToDisplay[activeItemIndex] || itemsToDisplay[0];

  // Dynamic breakdown & note calculation
  const computedBreakdown = generateMoraBreakdown(
    currentItem?.reading || currentItem?.japanese || "",
    currentItem?.pitchPattern || "heiban"
  );

  const activeBreakdown =
    currentItem?.moraBreakdown && !currentItem.moraBreakdown.includes("đồng đều")
      ? currentItem.moraBreakdown
      : computedBreakdown.moraBreakdown;

  const activeNote =
    currentItem?.note && !currentItem.note.includes("đối chiếu ngữ điệu")
      ? currentItem.note
      : computedBreakdown.note;

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
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert(
          "Trình duyệt hoặc môi trường của bạn chưa mở quyền Microphone. Khi deploy, trang web bắt buộc truy cập qua HTTPS (https://...) để sử dụng được micro trên điện thoại!"
        );
        return;
      }

      audioChunksRef.current = [];
      setAudioBlobUrl(null);
      setRecordingSeconds(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = getSupportedMimeType();
      const options = mimeType ? { mimeType } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const actualType = mediaRecorder.mimeType || mimeType || "audio/mp4";
        const blob = new Blob(audioChunksRef.current, { type: actualType });
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
      console.error("Microphone access error:", err);
      alert("Không thể truy cập Microphone. Vui lòng kiểm tra quyền cho phép Micro trên thiết bị!");
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

  // Play Recorded User Audio (programmatic with mobile error catch)
  const playUserRecording = () => {
    if (!audioBlobUrl) return;
    stopJapaneseTTS();

    if (userAudioRef.current) {
      userAudioRef.current.pause();
      userAudioRef.current = null;
    }

    const audio = new Audio(audioBlobUrl);
    userAudioRef.current = audio;

    audio.onplay = () => setIsPlayingUserAudio(true);
    audio.onended = () => setIsPlayingUserAudio(false);
    audio.onerror = (e) => {
      console.error("User audio playback error:", e);
      setIsPlayingUserAudio(false);
    };

    audio.play().catch((err) => {
      console.warn("Mobile autoplay restriction:", err);
      setIsPlayingUserAudio(false);
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-5xl bg-[#FFFDF9] border-2 border-[#8B6F5A]/25 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[96vh] sm:max-h-[92vh] flex flex-col"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#FFF5EE] border-b border-[#F2DDD4] shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#C65D4B] text-white flex items-center justify-center font-black text-lg sm:text-xl shadow-md shrink-0">
                🎙️
              </div>
              <div>
                <h2 className="text-base sm:text-xl font-black text-[#2C201D] leading-tight">
                  Luyện Ngữ Điệu &amp; Thu Âm (Pitch Accent)
                </h2>
                <p className="text-[11px] sm:text-xs font-bold text-[#8B6F5A] hidden sm:block">
                  Phát âm chuẩn Tokyo kèm công cụ Thu âm đối chiếu trực tiếp
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F5EFE6] text-[#8B6F5A] hover:bg-[#C65D4B] hover:text-white transition flex items-center justify-center cursor-pointer shrink-0"
              aria-label="Đóng modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="p-3 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 flex-1 text-[#2C201D]">
            
            {/* Speed Control Toolbar & Category Filter Tabs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-gradient-to-r from-[#FFF8F5] via-[#FFF6F2] to-[#FFF1EC] p-2.5 sm:p-3.5 rounded-2xl border border-[#F5DDD4] shadow-xs">
              
              {/* Category Filter Tabs (Scrollable on mobile) */}
              {!singleWord && (!customItems || customItems.length === 0) && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none min-w-0 flex-1">
                  <span className="text-[11px] sm:text-xs font-black text-[#8B6F5A] flex items-center gap-1 shrink-0 bg-white/80 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-[#F5DDD4] shadow-2xs whitespace-nowrap">
                    <Layers className="w-3.5 h-3.5 text-[#C65D4B]" />
                    <span className="hidden sm:inline">Bộ luyện:</span>
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {[
                      { id: "SAMPLE", label: "🌟 Mẫu Ngữ Điệu" },
                      { id: "KANA", label: "🌸 Bảng Kana" },
                      { id: "N5", label: "📕 Từ Vựng N5" },
                      { id: "N4", label: "📗 Từ Vựng N4" },
                      { id: "N3", label: "📘 Từ Vựng N3" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setSelectedCategory(tab.id as any);
                          setActiveItemIndex(0);
                          setAudioBlobUrl(null);
                        }}
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                          selectedCategory === tab.id
                            ? "bg-[#C65D4B] text-white shadow-sm ring-2 ring-[#C65D4B]/20"
                            : "bg-white text-[#76685F] border border-[#F5DDD4] hover:text-[#C65D4B] hover:border-[#C65D4B]/50 hover:bg-[#FFF9F6]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Speed Controller */}
              <div className="flex items-center justify-between sm:justify-start gap-2 shrink-0 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#F5DDD4] shadow-2xs self-stretch sm:self-auto">
                <div className="flex items-center gap-1.5 shrink-0">
                  <Sliders className="w-3.5 h-3.5 text-[#C65D4B]" />
                  <span className="text-xs font-black text-[#8B6F5A] whitespace-nowrap">Tốc độ:</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setSelectedSpeed(0.75)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                      selectedSpeed === 0.75
                        ? "bg-[#C65D4B] text-white shadow-2xs"
                        : "bg-white text-[#76685F] border border-[#F5DDD4] hover:text-[#C65D4B]"
                    }`}
                  >
                    <span>🐢 0.75x</span>
                  </button>
                  <button
                    onClick={() => setSelectedSpeed(0.92)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                      selectedSpeed === 0.92
                        ? "bg-[#C65D4B] text-white shadow-2xs"
                        : "bg-white text-[#76685F] border border-[#F5DDD4] hover:text-[#C65D4B]"
                    }`}
                  >
                    <span>🚀 1.0x</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Studio Layout Grid (On Mobile: Studio is FIRST, List is SECOND) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
              
              {/* Active Studio Card & Recording (ORDER 1 on Mobile, ORDER 2 on Desktop) */}
              <div className="order-1 lg:order-2 lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-[#F2DDD4] shadow-sm space-y-4 sm:space-y-6">
                
                {/* Active Card Big Header */}
                <div className="text-center space-y-2 pb-3 border-b border-[#F5EFE6]">
                  <div className="inline-block">
                    <PitchAccentBadge pattern={currentItem.pitchPattern} size="md" showCurve={true} />
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black font-jp text-[#2C201D] tracking-tight">
                    {currentItem.japanese}
                  </h3>
                  <p className="text-xs sm:text-sm font-black text-[#C65D4B]">{currentItem.reading}</p>
                  <p className="text-xs font-bold text-[#76685F]">{currentItem.meaning}</p>
                </div>

                {/* Mora & Pitch Accent Detailed Guidance Card */}
                <div className="bg-gradient-to-br from-[#FFF9F6] via-[#FFF5F0] to-[#FFF0EA] p-3.5 sm:p-5 rounded-2xl border-2 border-[#F5DDD4] space-y-3 text-xs text-left shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#F5DDD4] pb-2">
                    <div className="flex items-center gap-1.5 text-[#C65D4B] font-black text-xs sm:text-sm">
                      <Zap className="w-4 h-4 fill-[#C65D4B] shrink-0" />
                      <span>Hướng Dẫn Phát Âm (Mora Breakdown)</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#C65D4B]/10 text-[#C65D4B] px-2 py-0.5 rounded-full border border-[#C65D4B]/20">
                      Chuẩn Tokyo
                    </span>
                  </div>

                  {/* Mora Sequence Breakdown Box */}
                  <div className="space-y-1">
                    <p className="text-[10px] sm:text-[11px] font-black text-[#8B6F5A] uppercase tracking-wider">
                      📌 Quy tắc cao độ từng âm tiết:
                    </p>
                    <div className="font-bold text-[#2C201D] bg-white p-2.5 sm:p-3 rounded-xl border border-[#F5DDD4] shadow-2xs font-jp text-xs sm:text-base flex items-center justify-between">
                      <span className="text-[#C65D4B] font-black">{activeBreakdown}</span>
                    </div>
                  </div>

                  {/* Sensei Tip */}
                  <div className="flex items-start gap-2 bg-[#FFF0EA] p-2.5 rounded-xl border border-[#F5DDD4]">
                    <Sparkles className="w-4 h-4 text-[#C65D4B] shrink-0 mt-0.5" />
                    <p className="text-[11px] font-bold text-[#76685F] leading-snug">
                      <strong className="text-[#C65D4B]">Sensei dặn:</strong> {activeNote}
                    </p>
                  </div>
                </div>

                {/* Dual Audio Player & Mic Recorder Studio */}
                <div className="space-y-3.5 pt-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-[#2C201D] uppercase tracking-wider flex items-center gap-1.5">
                      <Mic className="w-4 h-4 text-[#C65D4B]" />
                      <span>STUDIO THU ÂM &amp; ĐỐI CHIẾU GIỌNG</span>
                    </h4>
                    <span className="text-[10px] font-bold text-[#8B6F5A]">Tốc độ mẫu: {selectedSpeed}x</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Step 1: Play Tokyo Native Audio */}
                    <button
                      onClick={handlePlayNative}
                      className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer shadow-xs min-h-[72px] ${
                        isPlayingNative
                          ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-md ring-4 ring-[#C65D4B]/20"
                          : "bg-[#FFF8F5] border-[#F2DDD4] text-[#C65D4B] hover:bg-[#C65D4B] hover:text-white"
                      }`}
                    >
                      <Volume2 className="w-6 h-6 animate-bounce-short" />
                      <span className="text-xs font-black text-center">
                        {isPlayingNative ? "🔊 Đang phát mẫu Tokyo..." : `1. Nghe Mẫu Tokyo (${selectedSpeed}x)`}
                      </span>
                    </button>

                    {/* Step 2: Mic Recording Control */}
                    {!isRecording ? (
                      <button
                        onClick={startRecording}
                        className="p-3.5 sm:p-4 rounded-2xl border-2 border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer shadow-xs min-h-[72px] group"
                      >
                        <Mic className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-black text-center">2. Bấm Để Thu Âm Giọng Bạn</span>
                      </button>
                    ) : (
                      <button
                        onClick={stopRecording}
                        className="p-3.5 sm:p-4 rounded-2xl border-2 border-rose-600 bg-rose-600 text-white animate-pulse transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer shadow-md min-h-[72px]"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                          <Square className="w-4 h-4 fill-white" />
                        </div>
                        <span className="text-xs font-black text-center">
                          ⏹️ Dừng Thu Âm ({recordingSeconds}s)
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Play Recorded Voice Comparison Box */}
                  {audioBlobUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-50 border-2 border-emerald-300 p-3.5 sm:p-4 rounded-2xl space-y-3 text-center shadow-xs"
                    >
                      <div className="flex items-center justify-center gap-2 text-emerald-800 font-black text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>🎉 Đã thu âm xong! Nghe lại giọng bạn dưới đây:</span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2">
                        <button
                          onClick={playUserRecording}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-white" />
                          <span>{isPlayingUserAudio ? "Đang phát giọng bạn..." : "▶️ Bấm Nghe Giọng Bạn"}</span>
                        </button>

                        <button
                          onClick={handlePlayNative}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-black text-xs hover:bg-emerald-100 transition shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4 text-emerald-700" />
                          <span>🔊 Nghe Lại Mẫu Tokyo</span>
                        </button>
                      </div>

                      {/* Native HTML5 Audio Player Fallback for Mobile (iOS Safari / Mobile Chrome) */}
                      <div className="pt-2 border-t border-emerald-200/70 text-left">
                        <p className="text-[10px] font-bold text-emerald-800 mb-1">
                          Trình phát gốc thiết bị (dành cho điện thoại iOS/Android):
                        </p>
                        <audio
                          controls
                          src={audioBlobUrl}
                          className="w-full h-9 rounded-lg bg-white/80 border border-emerald-300 shadow-2xs"
                        />
                      </div>
                    </motion.div>
                  )}

                </div>

              </div>

              {/* Sample Items List (ORDER 2 on Mobile, ORDER 1 on Desktop) */}
              <div className="order-2 lg:order-1 lg:col-span-5 space-y-2 sm:space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-black text-[#8B6F5A] uppercase tracking-wider">
                    Danh sách bài luyện ({itemsToDisplay.length}):
                  </h3>
                </div>

                <div className="space-y-2 max-h-52 sm:max-h-[420px] overflow-y-auto pr-1">
                  {itemsToDisplay.map((item, index) => {
                    const isSelected = index === activeItemIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setActiveItemIndex(index);
                          setAudioBlobUrl(null);
                        }}
                        className={`p-3 rounded-xl sm:rounded-2xl border transition-all cursor-pointer text-left space-y-1 ${
                          isSelected
                            ? "bg-white border-[#C65D4B] shadow-md ring-2 ring-[#C65D4B]/20"
                            : "bg-[#FFFDF9] border-[#F2DDD4] hover:border-[#C65D4B]/50 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base sm:text-lg font-black font-jp text-[#2C201D]">
                            {item.japanese}
                          </span>
                          <PitchAccentBadge pattern={item.pitchPattern} size="sm" showCurve={false} />
                        </div>
                        <p className="text-xs font-bold text-[#8B6F5A]">{item.reading}</p>
                        <p className="text-[11px] font-bold text-[#76685F] line-clamp-1">{item.meaning}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* Modal Footer */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#FFF5EE] border-t border-[#F2DDD4] flex items-center justify-between text-xs font-bold text-[#8B6F5A] shrink-0">
            <span className="hidden sm:inline">💡 Luyện tập Shadowing mỗi ngày 5 phút để làm chủ ngữ điệu tự nhiên.</span>
            <span className="sm:hidden text-[11px]">💡 Luyện ngữ điệu tiếng Nhật 5 phút mỗi ngày</span>
            <button
              onClick={onClose}
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-[#C65D4B] text-white font-bold shadow-md hover:bg-[#B04F3F] transition cursor-pointer"
            >
              Hoàn thành
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
