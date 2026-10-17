"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Trophy, BookOpen, Sparkles, ArrowRight, Award, CheckCircle2,
  Clock, FileText, Search, Play, Volume2, ShieldCheck, Flame
} from "lucide-react";
import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";
import JlptNoticeModal from "@/components/shared/JlptNoticeModal";
import { INITIAL_ADMIN_EXAMS, sanitizeAndDeduplicateExams, getStoredAdminExams, syncAdminExamsFromServer, AdminJlptExam } from "@/app/data/initialAdminExams";
import { parseExamStructure, parseExamYearData } from "@/lib/jlpt/jlptExamParser";

interface JlptDisplayExam {
  level: "n5" | "n4" | "n3";
  levelBadge: "N5" | "N4" | "N3";
  examId: string;
  yearSession: string;
  title: string;
  durationMinutes: number;
  totalQuestions: number;
  sections: { name: string; count: number }[];
  pdfFileName?: string;
  audioFileName?: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
}

const LEVEL_CARDS_BASE = [
  {
    id: "n5" as const,
    levelCode: "N5" as const,
    title: "Trình Độ JLPT N5",
    subTitle: "Tiếng Nhật Sơ Cấp (Cơ Bản)",
    description: "Tuyển tập các bộ đề thi thật JLPT N5 chính thức. Đầy đủ các phần Từ vựng, Ngữ pháp, Đọc hiểu và Nghe hiểu Choukai.",
    durationMinutes: 90,
    questionCountLabel: "89 - 91 câu",
    color: "from-amber-600 via-orange-600 to-[#C65D4B]",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-700",
    badge: "Sơ Cấp N5",
  },
  {
    id: "n4" as const,
    levelCode: "N4" as const,
    title: "Trình Độ JLPT N4",
    subTitle: "Tiếng Nhật Sơ Trung Cấp",
    description: "Bộ sưu tập đề thi thật N4 đầy đủ các năm từ 2010 đến nay. Mô phỏng phòng thi chuẩn 1:1 có đồng hồ bấm giờ và chấm điểm tự động.",
    durationMinutes: 115,
    questionCountLabel: "98 - 99 câu",
    color: "from-[#C65D4B] via-[#D94129] to-[#FF5733]",
    bgColor: "bg-[#C65D4B]/10",
    borderColor: "border-[#C65D4B]/30",
    textColor: "text-[#C65D4B]",
    badge: "Sơ Trung Cấp N4",
  },
  {
    id: "n3" as const,
    levelCode: "N3" as const,
    title: "Trình Độ JLPT N3",
    subTitle: "Tiếng Nhật Trung Cấp",
    description: "Bộ đề luyện thi thật N3 chuyên sâu. Nâng cao kỹ năng đọc hiểu đoạn văn dài và phản xạ nghe thoại tốc độ chuẩn JLPT.",
    durationMinutes: 140,
    questionCountLabel: "105 câu",
    color: "from-indigo-600 via-purple-600 to-[#7C3AED]",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-700",
    badge: "Trung Cấp N3",
  },
];

function JlptPracticeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showNotice, setShowNotice] = useState(false);
  const [adminExams, setAdminExams] = useState<AdminJlptExam[]>([]);
  const [activeLevelTab, setActiveLevelTab] = useState<"ALL" | "N5" | "N4" | "N3">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Handle URL query parameter ?level=N5 or ?level=n5
  useEffect(() => {
    const lvlParam = searchParams.get("level");
    if (lvlParam) {
      const upper = lvlParam.toUpperCase();
      if (upper === "N5" || upper === "N4" || upper === "N3") {
        setActiveLevelTab(upper as any);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const areExamListsEqual = (a: any[], b: any[]) => {
      if (a === b) return true;
      if (!a || !b || a.length !== b.length) return false;
      const keyA = a.map(e => `${e.id}_${e.examCode || ''}_${e.activeVersionId || ''}_${e.versions?.length || 0}`).join('|');
      const keyB = b.map(e => `${e.id}_${e.examCode || ''}_${e.activeVersionId || ''}_${e.versions?.length || 0}`).join('|');
      return keyA === keyB;
    };

    const loadAdminState = () => {
      const exams = getStoredAdminExams();
      setAdminExams((prev) => areExamListsEqual(prev, exams) ? prev : exams);
      syncAdminExamsFromServer().then((serverExams) => {
        if (serverExams && serverExams.length > 0) {
          setAdminExams((prev) => areExamListsEqual(prev, serverExams) ? prev : serverExams);
        }
      });
    };

    loadAdminState();

    const handleLocalUpdate = () => {
      const stored = getStoredAdminExams();
      setAdminExams((prev) => areExamListsEqual(prev, stored) ? prev : stored);
    };

    window.addEventListener("adminExamsUpdated", handleLocalUpdate);
    window.addEventListener("storage", loadAdminState);
    window.addEventListener("focus", loadAdminState);

    return () => {
      window.removeEventListener("adminExamsUpdated", handleLocalUpdate);
      window.removeEventListener("storage", loadAdminState);
      window.removeEventListener("focus", loadAdminState);
    };
  }, []);

  // Compute all authentic published exams strictly from Admin state
  const publishedExams = useMemo(() => {
    const effectiveList = sanitizeAndDeduplicateExams(
      adminExams && adminExams.length > 0 ? adminExams : INITIAL_ADMIN_EXAMS
    );

    const list: JlptDisplayExam[] = [];
    const seenCodes = new Set<string>();

    effectiveList.forEach((ad: any) => {
      let adLevel = (ad.level || "").toLowerCase().trim();
      if (!adLevel) {
        if ((ad.examCode || "").toLowerCase().includes("n5") || (ad.yearTitle || "").includes("N5")) adLevel = "n5";
        else if ((ad.examCode || "").toLowerCase().includes("n3") || (ad.yearTitle || "").includes("N3")) adLevel = "n3";
        else adLevel = "n4";
      }

      const publishedVer =
        ad.versions?.find((v: any) => v.versionId === ad.activeVersionId && v.status === "PUBLISHED") ||
        ad.versions?.find((v: any) => v.versionId === ad.activeVersionId) ||
        ad.versions?.find((v: any) => v.status === "PUBLISHED") ||
        ad.versions?.[ad.versions.length - 1];

      if (publishedVer) {
        const cleanCode = (ad.examCode || ad.id || "").replace(/[\/\\#?&:\s]+/g, "-").replace(/-+/g, "-");
        if (seenCodes.has(cleanCode)) return;
        seenCodes.add(cleanCode);

        const lvlUpper = adLevel.toUpperCase() as "N5" | "N4" | "N3";
        const totalQ =
          publishedVer.totalQuestions ||
          (adLevel === "n5" ? (cleanCode.includes("2012") || cleanCode.includes("2013") ? 91 : 89) : adLevel === "n3" ? 105 : 98);

        const structure = parseExamStructure(cleanCode, lvlUpper, totalQ);
        const vocabQ = structure.vocabSection.totalQuestions;
        const grammarQ = structure.grammarSection.totalQuestions;
        const listeningQ = structure.listeningSection.totalQuestions;

        const examYearInfo = parseExamYearData({
          title: ad.yearTitle || `Đề Thi Thật JLPT ${lvlUpper}`,
          yearTitle: ad.yearTitle,
          yearSession: ad.yearTitle,
          examId: cleanCode,
          examCode: ad.examCode,
          id: ad.id,
        });

        list.push({
          level: adLevel as "n5" | "n4" | "n3",
          levelBadge: lvlUpper,
          examId: cleanCode,
          yearSession: ad.yearTitle || examYearInfo.sessionBadge,
          title: ad.yearTitle || `Đề Thi Thật JLPT ${lvlUpper}`,
          durationMinutes:
            publishedVer.durationMinutes ||
            (adLevel === "n5" ? 90 : adLevel === "n3" ? 140 : 115),
          totalQuestions: totalQ,
          sections: [
            { name: "Từ vựng & Kanji", count: vocabQ },
            { name: "Ngữ pháp & Đọc hiểu", count: grammarQ },
            { name: "Nghe hiểu", count: listeningQ },
          ],
          difficulty: "Trung bình",
          pdfFileName: publishedVer.pdfFileName,
          audioFileName: publishedVer.audioFileName,
        });
      }
    });

    return list;
  }, [adminExams]);

  // Compute published exam counts per level
  const dynamicLevelCounts = useMemo(() => {
    const counts = { n5: 0, n4: 0, n3: 0 };
    publishedExams.forEach((e) => {
      if (counts[e.level] !== undefined) {
        counts[e.level]++;
      }
    });
    return counts;
  }, [publishedExams]);

  const totalPublishedCount = publishedExams.length;

  // Filter exams by active level tab and search query, then sort strictly by Year & Month descending
  const filteredExams = useMemo(() => {
    let list = publishedExams;
    if (activeLevelTab !== "ALL") {
      const target = activeLevelTab.toLowerCase();
      list = list.filter((e) => e.level === target);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.yearSession.toLowerCase().includes(q) ||
          e.examId.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => {
      const infoA = parseExamYearData(a);
      const infoB = parseExamYearData(b);
      return infoB.yearNumber - infoA.yearNumber;
    });
  }, [publishedExams, activeLevelTab, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF4EB] text-[#1F1714] font-sans flex flex-col justify-between selection:bg-[#C65D4B] selection:text-white">
      <JlptNoticeModal isOpen={showNotice} onClose={() => setShowNotice(false)} />
      <LearnerHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-10 space-y-12">
        {/* Banner Hero */}
        <div className="relative bg-gradient-to-r from-[#2C2421] via-[#3E322D] to-[#1F1714] border-2 border-[#4E3F39] rounded-3xl p-6 sm:p-10 text-white overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 font-black text-xs border border-white/15 backdrop-blur-md">
              <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>PHÒNG LUYỆN THI CHÍNH THỨC JLPT N5 - N3</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Kho {totalPublishedCount} Bộ Đề Thi Thật JLPT Chuẩn 1:1
            </h1>

            <p className="text-xs sm:text-sm text-[#D9CEB2] leading-relaxed font-medium">
              Chào mừng bạn đến với hệ thống luyện đề thi thật JLPT qua các năm. Dữ liệu chuẩn xác 100%, đồng bộ trực tiếp với hệ thống quản lý đề thi của giáo viên.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/15 text-xs text-amber-200">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Tổng cộng {totalPublishedCount} bộ đề thi chính thức</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/15 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Chấm điểm tự động & Giải thích 1:1</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/15 text-xs text-blue-200">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Đồng bộ thời gian thực với Admin</span>
              </div>
            </div>
          </div>

          <div className="absolute right-[-20px] bottom-[-20px] opacity-15 pointer-events-none hidden md:block">
            <Award className="w-80 h-80 text-amber-400" />
          </div>
        </div>

        {/* Level Cards Selector Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#1F1714] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C65D4B]" />
              <span>Phân Loại Theo Trình Độ JLPT</span>
            </h2>
            <span className="text-xs font-bold text-[#8C7B70]">
              Nhấn vào từng trình độ để vào trang tuyển tập bộ đề
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEVEL_CARDS_BASE.map((card) => {
              const count = dynamicLevelCounts[card.id] ?? 0;
              return (
                <Link
                  key={card.id}
                  href={`/jlpt-practice/${card.id}`}
                  className="bg-[#FFFDF9] border-2 border-[#E5D7C7] hover:border-[#C65D4B] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group relative overflow-hidden cursor-pointer"
                >
                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center">
                      <span className={`px-3.5 py-1 font-black text-xs rounded-full border ${card.bgColor} ${card.textColor} ${card.borderColor}`}>
                        {card.badge}
                      </span>
                      <span className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${card.color} text-white font-black text-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        {card.levelCode}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-[#1F1714] group-hover:text-[#C65D4B] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs font-bold text-[#8C7B70] mt-0.5">
                        {card.subTitle}
                      </p>
                    </div>

                    <p className="text-xs text-[#52443C] leading-relaxed font-medium">
                      {card.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 bg-[#FAF4EB] p-3 rounded-2xl border border-[#E5D7C7] text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-[#8C7B70] block uppercase">Kho Đề Thi</span>
                        <strong className="font-extrabold text-[#1F1714]">{count} Bộ đề thật</strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#8C7B70] block uppercase">Thời gian thi</span>
                        <strong className="font-extrabold text-[#1F1714]">{card.durationMinutes} Phút</strong>
                      </div>
                    </div>
                  </div>

                  <div className="w-full py-3.5 bg-gradient-to-r from-[#C65D4B] via-[#D94129] to-[#B04F3F] text-white font-black text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:scale-102">
                    <span>Xem Toàn Bộ Đề Thi {card.levelCode} ({count} Đề)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 📚 LIVE EXAM CATALOG SECTION (Synced directly with Admin) */}
        <section className="space-y-6 pt-4 border-t border-[#E5D7C7]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#C65D4B]" />
                <h2 className="text-xl sm:text-2xl font-black text-[#1F1714]">
                  Danh Sách Toàn Bộ Đề Thi Thật (Đồng Bộ Trực Tiếp)
                </h2>
              </div>
              <p className="text-xs text-[#76685F] font-semibold mt-1">
                Lọc nhanh và chọn đề thi để làm bài ngay trên giao diện học viên chuẩn format.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7B70]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm đề theo năm, mã đề..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-[#E5D7C7] text-xs font-bold text-[#1F1714] focus:outline-hidden focus:border-[#C65D4B] transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveLevelTab("ALL")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                activeLevelTab === "ALL"
                  ? "bg-[#C65D4B] text-white shadow-md scale-102"
                  : "bg-white text-[#6E5D55] hover:text-[#1F1714] border border-[#E5D7C7] hover:border-[#C65D4B]"
              }`}
            >
              Tất Cả ({totalPublishedCount} Đề)
            </button>
            <button
              type="button"
              onClick={() => setActiveLevelTab("N5")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                activeLevelTab === "N5"
                  ? "bg-amber-600 text-white shadow-md scale-102"
                  : "bg-white text-[#6E5D55] hover:text-[#1F1714] border border-[#E5D7C7] hover:border-amber-600"
              }`}
            >
              JLPT N5 ({dynamicLevelCounts.n5} Đề)
            </button>
            <button
              type="button"
              onClick={() => setActiveLevelTab("N4")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                activeLevelTab === "N4"
                  ? "bg-[#C65D4B] text-white shadow-md scale-102"
                  : "bg-white text-[#6E5D55] hover:text-[#1F1714] border border-[#E5D7C7] hover:border-[#C65D4B]"
              }`}
            >
              JLPT N4 ({dynamicLevelCounts.n4} Đề)
            </button>
            <button
              type="button"
              onClick={() => setActiveLevelTab("N3")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                activeLevelTab === "N3"
                  ? "bg-purple-600 text-white shadow-md scale-102"
                  : "bg-white text-[#6E5D55] hover:text-[#1F1714] border border-[#E5D7C7] hover:border-purple-600"
              }`}
            >
              JLPT N3 ({dynamicLevelCounts.n3} Đề)
            </button>
          </div>

          {/* Exam Cards Grid */}
          {filteredExams.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-[#E5D7C7] space-y-3">
              <span className="text-4xl">📂</span>
              <h3 className="text-base font-extrabold text-[#1F1714]">
                Không tìm thấy bộ đề phù hợp
              </h3>
              <p className="text-xs text-[#76685F]">
                Vui lòng thử tìm kiếm với từ khóa khác hoặc chọn trình độ khác.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredExams.map((exam) => {
                const isN5 = exam.level === "n5";
                const isN3 = exam.level === "n3";
                const badgeColor = isN5
                  ? "bg-amber-100 text-amber-800 border-amber-300"
                  : isN3
                  ? "bg-purple-100 text-purple-800 border-purple-300"
                  : "bg-rose-100 text-[#C65D4B] border-rose-300";

                return (
                  <div
                    key={`${exam.level}-${exam.examId}`}
                    className="bg-white border-2 border-[#E5D7C7] hover:border-[#C65D4B] rounded-3xl p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${badgeColor}`}>
                          JLPT {exam.levelBadge}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-[#76685F] font-bold">
                          <Clock className="w-3.5 h-3.5 text-[#8C7B70]" />
                          <span>{exam.durationMinutes} phút</span>
                          <span>•</span>
                          <FileText className="w-3.5 h-3.5 text-[#8C7B70]" />
                          <span>{exam.totalQuestions} câu</span>
                        </div>
                      </div>

                      {/* Title & Year */}
                      <div>
                        <h3 className="text-base font-extrabold text-[#1F1714] group-hover:text-[#C65D4B] transition-colors line-clamp-2">
                          {exam.title}
                        </h3>
                        <p className="text-[11px] font-bold text-[#8C7B70] mt-0.5">
                          Mã đề: {exam.examId}
                        </p>
                      </div>

                      {/* Section Badges Breakdown */}
                      <div className="grid grid-cols-3 gap-1.5 bg-[#FAF4EB] p-2.5 rounded-2xl border border-[#E5D7C7] text-center">
                        {exam.sections.map((sec, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <span className="text-[9px] font-bold text-[#8C7B70] block truncate">
                              {idx === 0 ? "Từ vựng" : idx === 1 ? "Ngữ pháp" : "Nghe hiểu"}
                            </span>
                            <span className="text-[11px] font-black text-[#1F1714]">
                              {sec.count} câu
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-2 border-t border-[#F2DDD4]">
                      <Link
                        href={`/jlpt-practice/${exam.level}/${exam.examId}`}
                        className="w-full py-2.5 bg-gradient-to-r from-[#C65D4B] to-[#D94129] hover:from-[#B04F3F] hover:to-[#C65D4B] text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Bắt Đầu Luyện Đề</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/jlpt-practice/${exam.level}`}
                        className="w-full py-2 rounded-xl text-[11px] font-bold text-[#76685F] hover:text-[#C65D4B] hover:bg-[#FAF4EB] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Xem toàn bộ đề {exam.levelBadge}</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <LearnerFooter />
    </div>
  );
}

export default function JlptPracticeLevelSelectionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF4EB] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#C65D4B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-[#76685F]">Đang tải phòng luyện thi JLPT...</p>
        </div>
      </div>
    }>
      <JlptPracticeContent />
    </Suspense>
  );
}
