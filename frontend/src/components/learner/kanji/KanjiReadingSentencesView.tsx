"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Volume2, Eye, EyeOff, Sparkles, CheckCircle2, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { KanjiExerciseDto, KanjiTopicItemDto } from "./KanjiLessonDetailView";

interface KanjiReadingSentencesViewProps {
  topicTitle: string;
  exercises: KanjiExerciseDto[];
  items?: KanjiTopicItemDto[];
}

interface ReadingSentenceItem {
  id: number;
  kanjiWord: string;
  readingHiragana: string;
  sentenceJp: string;
  meaningVi: string;
}

// Helper to convert non-target Kanji words to Hiragana for beginner learners
function focusTargetKanjiOnly(sentence: string, targetKanji: string): string {
  if (!sentence) return "";
  
  // Common Kanji to Hiragana dictionary for reading sentences
  const kanjiToHiraMap: { [key: string]: string } = {
    "友達": "ともだち",
    "会う": "あう",
    "会います": "あいます",
    "約束": "やくそく",
    "荷物": "にもつ",
    "届きます": "とどきます",
    "買いました": "かいました",
    "買い物": "かいもの",
    "旅行": "りょこう",
    "帰ります": "かえります",
    "家族": "かぞく",
    "起きます": "おきます",
    "朝ご飯": "あさごはん",
    "食べます": "たべます",
    "食べました": "たべました",
    "寝ます": "ねます",
    "休み": "やすみ",
    "時計": "とけい",
    "払います": "はらいます",
    "公園": "こうえん",
    "大きな": "おおきな",
    "注意": "ちゅうい",
    "冷たい": "つめたい",
    "飲みます": "のみます",
    "映画": "えいが",
    "見ます": "みます",
    "泳ぎます": "およぎます",
    "行きます": "いきます",
    "富士山": "ふじ山",
    "田んぼ": "田んぼ",
    "今月": "こん月",
    "今日": "きょう",
    "高い": "たかい",
    "試験": "しけん",
  };

  let result = sentence;
  Object.keys(kanjiToHiraMap).forEach((k) => {
    if (!targetKanji.includes(k) && k !== targetKanji) {
      result = result.replace(new RegExp(k, "g"), kanjiToHiraMap[k]);
    }
  });

  return result;
}

// Rich contextual dictionary map for natural Japanese sentences (keeping only target Kanji)
const MEANINGFUL_SENTENCE_MAP: { [key: string]: { sentenceJp: string; meaningVi: string; readingHiragana: string } } = {
  "一": { sentenceJp: "りんごを 一つ ください。", meaningVi: "Cho tôi xin một quả táo.", readingHiragana: "りんごを ひとつ ください。" },
  "二": { sentenceJp: "二人の ともだちと あいます。", meaningVi: "Tôi gặp hai người bạn.", readingHiragana: "ふたりの ともだちと あいます。" },
  "三": { sentenceJp: "三日に りょこうします。", meaningVi: "Tôi đi du lịch vào ngày mùng 3.", readingHiragana: "みっかに りょこうします。" },
  "四": { sentenceJp: "四時に かえります。", meaningVi: "Tôi về nhà lúc 4 giờ.", readingHiragana: "よじに かえります。" },
  "五": { sentenceJp: "五人の かぞくです。", meaningVi: "Gia đình tôi có 5 người.", readingHiragana: "ごにんの かぞくです。" },
  "六": { sentenceJp: "六時に おきます。", meaningVi: "Tôi thức dậy lúc 6 giờ.", readingHiragana: "ろくじに おきます。" },
  "七": { sentenceJp: "七時に あさごはんを たべます。", meaningVi: "Tôi ăn sáng lúc 7 giờ.", readingHiragana: "しちじに あさごはんを たべます。" },
  "八": { sentenceJp: "八日に ともだちが きます。", meaningVi: "Bạn tôi sẽ đến vào ngày mùng 8.", readingHiragana: "ようかに ともだちが きます。" },
  "八日": { sentenceJp: "八日に ともだちと あう やくそくが あります。", meaningVi: "Vào ngày mùng 8 tôi có hẹn gặp bạn.", readingHiragana: "ようかに ともだちと あう やくそくが あります。" },
  "八つ": { sentenceJp: "りんごを 八つ かいました。", meaningVi: "Tôi đã mua 8 quả táo.", readingHiragana: "りんごを やつ かいました。" },
  "九": { sentenceJp: "九月は すずしいです。", meaningVi: "Tháng 9 thời tiết rất mát mẻ.", readingHiragana: "くがつは すずしいです。" },
  "九日": { sentenceJp: "九日に にもつが とどきます。", meaningVi: "Hàng sẽ đến vào ngày mùng 9.", readingHiragana: "ここのかに にもつが とどきます。" },
  "九つ": { sentenceJp: "みかんを 九つ たべました。", meaningVi: "Tôi đã ăn 9 quả quýt.", readingHiragana: "みかんを ここのつ たべました。" },
  "十": { sentenceJp: "十時に ねます。", meaningVi: "Tôi đi ngủ lúc 10 giờ.", readingHiragana: "じゅうじに ねます。" },
  "十日": { sentenceJp: "十日に やすみを とります。", meaningVi: "Tôi nghỉ phép vào ngày mùng 10.", readingHiragana: "とおかに やすみを とります。" },
  "百": { sentenceJp: "この ぺんは 百円です。", meaningVi: "Cây bút này giá 100 yên.", readingHiragana: "この ぺんは ひゃくえんです。" },
  "千": { sentenceJp: "千円さつを だします。", meaningVi: "Tôi đưa tờ 1000 yên.", readingHiragana: "せんえんさつを だします。" },
  "万": { sentenceJp: "一万円の とけいです。", meaningVi: "Đây là chiếc đồng hồ giá 1 vạn yên.", readingHiragana: "いちまんえんの とけいです。" },
  "円": { sentenceJp: "にほん円で はらいます。", meaningVi: "Tôi thanh toán bằng tiền Yên Nhật.", readingHiragana: "にほんえんで はらいます。" },
  "日": { sentenceJp: "きょうは いい 日ですね。", meaningVi: "Hôm nay là một ngày đẹp trời.", readingHiragana: "きょうは いい ひですね。" },
  "月": { sentenceJp: "こん月は とても いそがしいです。", meaningVi: "Tháng này tôi rất bận.", readingHiragana: "こんげつは とても いそがしいです。" },
  "火": { sentenceJp: "火に ちゅういして ください。", meaningVi: "Hãy chú ý an toàn với lửa.", readingHiragana: "ひに ちゅういして ください。" },
  "水": { sentenceJp: "つめたい 水を のみます。", meaningVi: "Tôi uống nước lạnh.", readingHiragana: "つめたい みずを のみます。" },
  "木": { sentenceJp: "こうえんに おおきな 木が あります。", meaningVi: "Trong công viên có một cái cây lớn.", readingHiragana: "こうえんに おおきな きが あります。" },
  "金": { sentenceJp: "金ようびに えいがを みます。", meaningVi: "Tôi xem phim vào Thứ Sáu.", readingHiragana: "きんようびに えいがを みます。" },
  "土": { sentenceJp: "土ようびは やすみです。", meaningVi: "Thứ Bảy là ngày nghỉ.", readingHiragana: "どようびは やすみです。" },
  "山": { sentenceJp: "ふじ山は きれいな 山です。", meaningVi: "Núi Phú Sĩ là ngọn núi rất đẹp.", readingHiragana: "ふじさんは きれいな やまです。" },
  "川": { sentenceJp: "きれいな 川で およぎます。", meaningVi: "Tôi bơi ở một dòng sông sạch.", readingHiragana: "きれいな かわで およぎます。" },
  "田": { sentenceJp: "田んぼに こめが あります。", meaningVi: "Trong cánh ruộng có lúa.", readingHiragana: "たんぼに こめが あります。" },
  "人": { sentenceJp: "あの 人は にほん人です。", meaningVi: "Người đó là người Nhật Bản.", readingHiragana: "あの ひと は にほんじん です。" },
  "日本": { sentenceJp: "わたしは 日本へ いきます。", meaningVi: "Tôi sẽ đi Nhật Bản.", readingHiragana: "わたしは にほんへ いきます。" },
  "日曜日": { sentenceJp: "日曜日 に ともだちと あいます。", meaningVi: "Tôi gặp bạn vào Chủ Nhật.", readingHiragana: "にちようびに ともだちと あいます。" },
};

export default function KanjiReadingSentencesView({ topicTitle, exercises, items }: KanjiReadingSentencesViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFurigana, setShowFurigana] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Build clean & meaningful sentences dataset
  const sentenceList = useMemo<ReadingSentenceItem[]>(() => {
    const list: ReadingSentenceItem[] = [];
    let idCounter = 1;

    // 1. If custom exercises exist in DB
    if (exercises && exercises.length > 0) {
      exercises.forEach((ex) => {
        const target = ex.targetKanji || "";
        const mapped = MEANINGFUL_SENTENCE_MAP[target];
        
        // Extract clean sentence and full Hiragana reading from DB sentence
        let cleanJp = ex.sentenceJp.replace(/([一-龯ヶ𠮟]+)[\(（]([^\)）]+)[\)）]/g, "$1").replace(/[\(（][^\)）]*[\)）]/g, "").trim();
        let hiraReading = ex.sentenceJp.replace(/([一-龯ヶ𠮟]+)[\(（]([^\)）]+)[\)）]/g, "$2").replace(/[\(（][^\)）]*[\)）]/g, "").trim();
        let meaning = ex.meaningVi || mapped?.meaningVi || "";

        // Special handling & clean fallback translations for DB seed sentences
        if (cleanJp.includes("何時ですか")) {
          hiraReading = "A: いま、なんじですか？ B: いま、いちじさんぷんです。";
          meaning = "A: Bây giờ là mấy giờ? B: Bây giờ là 1 giờ 3 phút.";
        } else if (cleanJp.includes("二月四日")) {
          hiraReading = "きょうは にがつよっかです。";
          meaning = "Hôm nay là ngày 4 tháng 2.";
        } else if (cleanJp.includes("七時です") || cleanJp.includes("七時に")) {
          hiraReading = "いま、しちじです。";
          meaning = "Bây giờ là 7 giờ (hoặc Tôi ăn cơm lúc 7 giờ).";
        } else if (cleanJp.includes("五月五日")) {
          hiraReading = "ごがついつかは やすみです。";
          meaning = "Tôi sẽ đi Tokyo vào ngày 5 tháng 5.";
        } else if (cleanJp.includes("六月七日")) {
          hiraReading = "ろくがつなのかに しけんが あります。";
          meaning = "Sinh nhật của anh Santos là ngày 7 tháng 6.";
        } else if (cleanJp.includes("八日") && cleanJp.includes("行")) {
          meaning = "Tôi sẽ đi vào ngày mùng 8.";
        } else if (cleanJp.includes("九日") && cleanJp.includes("行")) {
          meaning = "Tôi sẽ đi vào ngày mùng 9.";
        } else if (cleanJp.includes("去年") && cleanJp.includes("八月")) {
          meaning = "Tôi đã đến Nhật Bản vào tháng 8 năm ngoái.";
        } else if (cleanJp.includes("来年") && cleanJp.includes("九月")) {
          meaning = "Tôi sẽ đi vào tháng 9 năm sau.";
        } else if (cleanJp.includes("十時") && cleanJp.includes("寝")) {
          meaning = "Hôm qua tôi đi ngủ lúc 10 giờ.";
        } else if (cleanJp.includes("三百円")) {
          meaning = "Thỏi socola này giá 300 yên.";
        } else if (cleanJp.includes("二千円")) {
          meaning = "Chiếc cặp này giá 2.000 yên.";
        } else if (cleanJp.includes("九万三千六百円")) {
          meaning = "Chiếc máy tính này giá 93.600 yên.";
        } else if (cleanJp.includes("会議") && cleanJp.includes("遅")) {
          meaning = "Tôi đã bị trễ cuộc họp của công ty.";
        } else if (cleanJp.includes("散歩") && cleanJp.includes("公園")) {
          meaning = "Tôi đi dạo và đi bộ trong công viên.";
        } else if (cleanJp.includes("救急車")) {
          meaning = "Xe cứu thương đang vội vã chạy đi.";
        } else if (cleanJp.includes("手紙") && cleanJp.includes("送")) {
          meaning = "Tôi gửi bức thư.";
        } else if (cleanJp.includes("医者") && cleanJp.includes("相談")) {
          meaning = "Tôi thảo luận với bác sĩ rồi đến bệnh viện.";
        } else if (cleanJp.includes("世界") && cleanJp.includes("国際")) {
          meaning = "Tôi xem tin tức quốc tế của thế giới.";
        } else if (cleanJp.includes("教室") && cleanJp.includes("先生")) {
          meaning = "Thầy giáo giảng dạy ở trong phòng học.";
        } else if (cleanJp.includes("意見") && cleanJp.includes("聴")) {
          meaning = "Tôi lắng nghe ý kiến của thầy cô giáo.";
        } else if (cleanJp.includes("彼") && cleanJp.includes("野球")) {
          meaning = "Anh ấy rất giỏi môn bóng chày.";
        } else if (cleanJp.includes("予約") && cleanJp.includes("予定")) {
          meaning = "Tôi xác nhận lại lịch trình đã đặt trước.";
        } else if (cleanJp.includes("太陽") && cleanJp.includes("光")) {
          meaning = "Ánh nắng mặt trời thật ấm áp.";
        } else if (mapped) {
          cleanJp = mapped.sentenceJp;
          hiraReading = mapped.readingHiragana;
          meaning = mapped.meaningVi;
        }

        if (!meaning) {
          meaning = `Câu ứng dụng với Hán tự 「${target || "chữ Hán"}」.`;
        }

        // Apply focusTargetKanjiOnly to keep only the target Kanji (and elementary numbers)
        cleanJp = focusTargetKanjiOnly(cleanJp, target);

        list.push({
          id: ex.exerciseId || idCounter++,
          kanjiWord: target || "漢字",
          readingHiragana: hiraReading,
          sentenceJp: cleanJp,
          meaningVi: meaning,
        });
      });
      return list;
    }

    // 2. Dynamic Generator from items using rich sentence mapping
    if (items && items.length > 0) {
      items.forEach((item) => {
        // Parse examples if available
        const exSource = item.kunExamples || item.onExamples || "";
        if (exSource) {
          const parts = exSource.split(/[,;\n]+/);
          parts.forEach((p) => {
            const m = p.match(/^([^\(（]+)[\(（]([^\)）]+)[\)）]:?\s*(.*)$/);
            if (m) {
              const word = m[1].trim();
              const reading = m[2].trim();
              const meaning = m[3].trim();

              const mapped = MEANINGFUL_SENTENCE_MAP[word];
              if (mapped) {
                list.push({
                  id: idCounter++,
                  kanjiWord: word,
                  readingHiragana: mapped.readingHiragana,
                  sentenceJp: focusTargetKanjiOnly(mapped.sentenceJp, word),
                  meaningVi: mapped.meaningVi,
                });
              } else {
                list.push({
                  id: idCounter++,
                  kanjiWord: word,
                  readingHiragana: `${word} (${reading})`,
                  sentenceJp: `${word}を つかった 例文です。`,
                  meaningVi: meaning ? `Nghĩa: ${meaning}` : `Từ Hán tự trong bài`,
                });
              }
            }
          });
        }

        // Single character fallback with rich sentence map
        const mappedChar = MEANINGFUL_SENTENCE_MAP[item.character];
        if (mappedChar) {
          list.push({
            id: idCounter++,
            kanjiWord: item.character,
            readingHiragana: mappedChar.readingHiragana,
            sentenceJp: focusTargetKanjiOnly(mappedChar.sentenceJp, item.character),
            meaningVi: mappedChar.meaningVi,
          });
        } else {
          list.push({
            id: idCounter++,
            kanjiWord: item.character,
            readingHiragana: item.kunyomi || item.onyomi || "—",
            sentenceJp: `【${item.character}】の 漢字です。`,
            meaningVi: `Âm Hán Việt: ${item.meaningVi}`,
          });
        }
      });
    }

    // Deduplicate by kanjiWord + sentenceJp
    const uniqueList: ReadingSentenceItem[] = [];
    const seen = new Set<string>();
    list.forEach((item) => {
      const key = `${item.kanjiWord}_${item.sentenceJp}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueList.push(item);
      }
    });

    return uniqueList;
  }, [exercises, items]);

  const currentItem = sentenceList[currentIndex];

  // Auto reset furigana state on card index change
  useEffect(() => {
    setShowFurigana(false);
  }, [currentIndex]);

  // Keyboard navigation listener (← Previous / Next →)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === " ") {
        e.preventDefault();
        setShowFurigana((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, sentenceList.length]);

  const handleNext = () => {
    if (currentIndex < sentenceList.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Text-To-Speech (Native Japanese Pronunciation)
  const handleSpeak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const cleanText = text.replace(/[\(（][^\)）]+[\)）]/g, ""); // Clean text for smooth TTS
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!sentenceList || sentenceList.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center text-[#76685F] border border-[#DED3C8]">
        Bài học này chưa có câu luyện đọc Kanji.
      </div>
    );
  }

  // Ensure clean Japanese sentence text without inline parenthesis
  const displaySentence = currentItem.sentenceJp.replace(/[\(（][^\)）]+[\)）]/g, "").trim();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Sleek Gradient Header Bar */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#FFF4F0] via-[#FDF2E9] to-[#F8EBE2] border-2 border-[#F3D7CE] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF0ED] border border-[#F9CDC5] text-[#D04A46] text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D04A46]" />
            <span>🌸 Luyện Đọc Câu Hán Tự Ứng Dụng</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#2B211D]">
            漢字を読みましょう! <span className="text-xs font-bold text-[#76685F]">({topicTitle})</span>
          </h3>
        </div>

        {/* Counter Badge */}
        <div className="bg-white/95 backdrop-blur-xs border border-[#F8D4D0] px-4 py-2 rounded-2xl text-center shrink-0 shadow-2xs">
          <span className="text-[10px] font-extrabold text-[#76685F] uppercase tracking-wider block">Tiến trình</span>
          <div className="text-base font-black text-[#D04A46]">
            Thẻ {currentIndex + 1} / {sentenceList.length}
          </div>
        </div>
      </div>

      {/* Main Interactive Swiper Card */}
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentItem.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 40 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between min-h-[320px] space-y-6 relative overflow-hidden"
          >
            {/* Ambient Top Background Pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl select-none font-sans font-black text-[#C65D4B]">
              {currentItem.kanjiWord}
            </div>

            {/* Kanji Focus Header */}
            <div className="flex justify-between items-center z-10">
              <span className="bg-[#C65D4B] text-white px-3.5 py-1 rounded-xl text-xs font-black shadow-xs tracking-wider">
                Trọng tâm: {currentItem.kanjiWord}
              </span>
              
              <button
                onClick={() => handleSpeak(displaySentence)}
                className="w-10 h-10 rounded-2xl bg-white border border-[#DED3C8] hover:border-[#C65D4B] text-[#C65D4B] flex items-center justify-center shadow-xs transition-all hover:scale-105 active:scale-95"
                title="Phát âm tiếng Nhật chuẩn"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Main Pure Japanese Sentence Display (Clean Kanji, NO inline parentheses!) */}
            <div className="text-center py-6 space-y-5 z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#231917] leading-relaxed tracking-wide">
                {displaySentence}
              </h2>

              {/* Revealable Furigana & Meaning Box */}
              {showFurigana ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border-2 border-[#C65D4B]/40 rounded-2xl p-4 sm:p-5 space-y-2 shadow-sm max-w-lg mx-auto text-left"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-[#C65D4B] font-bold text-xs shrink-0 pt-0.5">🔹 Cách đọc:</span>
                    <p className="text-base font-bold text-[#C65D4B] leading-relaxed">
                      {currentItem.readingHiragana}
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2 pt-1 border-t border-[#DED3C8]/60">
                    <span className="text-[#8B6F5A] font-bold text-xs shrink-0 pt-0.5">💡 Dịch nghĩa:</span>
                    <p className="text-sm font-black text-[#231917] leading-relaxed">
                      {currentItem.meaningVi}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <button
                  onClick={() => setShowFurigana(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#C65D4B] hover:text-white border-2 border-[#DED3C8] text-[#8B6F5A] text-xs font-extrabold rounded-2xl shadow-xs transition-all hover:scale-105 cursor-pointer"
                >
                  <Eye className="w-4 h-4" /> Bấm để xem Cách Đọc Hiragana & Dịch Nghĩa
                </button>
              )}
            </div>

            {/* Bottom Controls inside Card */}
            <div className="flex justify-between items-center z-10 pt-3 border-t border-[#DED3C8]/60">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 bg-white hover:bg-[#FAF3EB] disabled:opacity-30 border border-[#DED3C8] text-[#8B6F5A] font-extrabold text-xs rounded-xl shadow-2xs transition-all flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Câu trước
              </button>

              {showFurigana && (
                <button
                  onClick={() => setShowFurigana(false)}
                  className="text-xs font-bold text-[#76685F] hover:text-[#C65D4B] flex items-center gap-1"
                >
                  <EyeOff className="w-3.5 h-3.5" /> Ẩn đáp án
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={currentIndex === sentenceList.length - 1}
                className="px-5 py-2 bg-[#C65D4B] hover:bg-[#b04f3f] disabled:opacity-30 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1"
              >
                Câu tiếp <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Outer Navigation Buttons & Keyboard hint */}
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-5 py-2.5 bg-white hover:bg-[#C65D4B] hover:text-white border-2 border-[#DED3C8] disabled:opacity-30 text-[#8B6F5A] font-black text-xs rounded-2xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" /> Thẻ Trước (←)
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {sentenceList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? "w-6 bg-[#C65D4B]" : "bg-[#DED3C8] hover:bg-[#8B6F5A]"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === sentenceList.length - 1}
            className="px-5 py-2.5 bg-[#C65D4B] hover:bg-[#b04f3f] border-2 border-[#C65D4B] disabled:opacity-30 text-white font-black text-xs rounded-2xl shadow-md transition-all flex items-center gap-1.5"
          >
            Thẻ Tiếp theo (→) <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
