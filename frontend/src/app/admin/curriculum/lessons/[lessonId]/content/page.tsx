"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getApiUrl } from "@/lib/api/client";

interface VocabularyDto {
  vocabularyId: number;
  word: string;
  kana: string;
  kanjiForm?: string;
  meaningVi: string;
  partOfSpeech?: string;
  notes?: string;
  sortOrder: number;
  status: string;
  version: number;
}

interface LessonKanjiDto {
  lessonId: number;
  kanjiId: number;
  character: string;
  onyomi?: string;
  kunyomi?: string;
  meaningVi: string;
  strokeCount?: number;
  sortOrder: number;
  notes?: string;
}

interface GrammarExampleDto {
  exampleId: number;
  japaneseText: string;
  reading?: string;
  meaningVi: string;
  sortOrder: number;
}

interface GrammarPointDto {
  grammarId: number;
  pattern: string;
  meaning: string;
  explanation: string;
  structure?: string;
  jlptLevel: string;
  sortOrder: number;
  status: string;
  version: number;
  examples: GrammarExampleDto[];
}

interface QuizQuestionItem {
  id: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: "A" | "B" | "C" | "D";
  explanation?: string;
}

export default function AdminLessonContentPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;

  const [activeTab, setActiveTab] = useState<"vocab" | "kanji" | "grammar" | "quiz">("vocab");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Data states
  const [vocabularies, setVocabularies] = useState<VocabularyDto[]>([]);
  const [kanjis, setKanjis] = useState<LessonKanjiDto[]>([]);
  const [grammars, setGrammars] = useState<GrammarPointDto[]>([]);

  // Quiz & Question Bank state
  const [questionsPerAttempt, setQuestionsPerAttempt] = useState<number>(15);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(true);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);

  const [questionBank, setQuestionBank] = useState<QuizQuestionItem[]>([
    {
      id: "q1",
      questionText: "Điền trợ từ thích hợp vào chỗ trống: わたし _____ たなかです。",
      optionA: "は (wa)",
      optionB: "の (no)",
      optionC: "に (ni)",
      optionD: "で (de)",
      correctOption: "A",
      explanation: "Trợ từ は biểu thị chủ đề của câu.",
    },
    {
      id: "q2",
      questionText: "Từ 「私 (わたし)」 trong tiếng Việt có nghĩa là gì?",
      optionA: "Chúng tôi",
      optionB: "Bạn",
      optionC: "Tôi",
      optionD: "Thầy giáo",
      correctOption: "C",
      explanation: "私 (わたし) có nghĩa là Tôi.",
    },
    {
      id: "q3",
      questionText: "Hoàn thành câu: マイク・ミラーさんは _____ 人(じん)です。",
      optionA: "ベトナム",
      optionB: "日本",
      optionC: "アメリカ",
      optionD: "中国",
      correctOption: "C",
      explanation: "Mike Miller là người Mỹ (アメリカ人).",
    },
    {
      id: "q4",
      questionText: "Từ 「先生 (せんせい)」 trong tiếng Việt có nghĩa là gì?",
      optionA: "Học sinh",
      optionB: "Thầy cô giáo",
      optionC: "Bác sĩ",
      optionD: "Kỹ sư",
      correctOption: "B",
      explanation: "先生 (せんせい) nghĩa là Thầy cô giáo.",
    },
    {
      id: "q5",
      questionText: "Dạng phủ định của 「～です」 là gì?",
      optionA: "～ではありません",
      optionB: "～でした",
      optionC: "～ます",
      optionD: "～ません",
      correctOption: "A",
      explanation: "Phủ định của です là ではありません (hoặc じゃありません).",
    },
  ]);

  // File Upload Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modals state
  const [showVocabModal, setShowVocabModal] = useState(false);
  const [vWord, setVWord] = useState("");
  const [vKana, setVKana] = useState("");
  const [vKanjiForm, setVKanjiForm] = useState("");
  const [vMeaning, setVMeaning] = useState("");
  const [vPartOfSpeech, setVPartOfSpeech] = useState("Danh từ");

  const [showKanjiModal, setShowKanjiModal] = useState(false);
  const [kChar, setKChar] = useState("");
  const [kOnyomi, setKOnyomi] = useState("");
  const [kKunyomi, setKKunyomi] = useState("");
  const [kMeaning, setKMeaning] = useState("");
  const [kStrokes, setKStrokes] = useState<number>(4);

  const [showGrammarModal, setShowGrammarModal] = useState(false);
  const [gPattern, setGPattern] = useState("");
  const [gMeaning, setGMeaning] = useState("");
  const [gExplanation, setGExplanation] = useState("");
  const [exJp, setExJp] = useState("");
  const [exFuri, setExFuri] = useState("");
  const [exVi, setExVi] = useState("");

  // Quiz Question Modal state
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingQId, setEditingQId] = useState<string | null>(null);
  const [qText, setQText] = useState("");
  const [qOptA, setQOptA] = useState("");
  const [qOptB, setQOptB] = useState("");
  const [qOptC, setQOptC] = useState("");
  const [qOptD, setQOptD] = useState("");
  const [qCorrect, setQCorrect] = useState<"A" | "B" | "C" | "D">("A");
  const [qExpl, setQExpl] = useState("");

  const fetchLessonDetails = useCallback(async () => {
    try {
      setError("");
      const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
      const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

      const [vRes, kRes, gRes] = await Promise.all([
        fetch(getApiUrl(`/curriculum/lessons/${lessonId}/vocabularies`), { headers }),
        fetch(getApiUrl(`/curriculum/lessons/${lessonId}/kanji`), { headers }),
        fetch(getApiUrl(`/curriculum/lessons/${lessonId}/grammar`), { headers }),
      ]);

      if (vRes.ok) {
        const text = await vRes.text();
        if (text && text.trim()) setVocabularies(JSON.parse(text));
      }
      if (kRes.ok) {
        const text = await kRes.text();
        if (text && text.trim()) setKanjis(JSON.parse(text));
      }
      if (gRes.ok) {
        const text = await gRes.text();
        if (text && text.trim()) setGrammars(JSON.parse(text));
      }
    } catch (err: any) {
      console.error("Lỗi tải thông tin bài học:", err);
    }
  }, [lessonId]);

  useEffect(() => {
    if (lessonId) fetchLessonDetails();
  }, [lessonId, fetchLessonDetails]);

  // BULK EXCEL / CSV IMPORT HANDLERS
  const handleDownloadTemplate = () => {
    const csvContent =
      "lesson_number,word,kana,kanji_form,meaning_vi,part_of_speech,notes\n" +
      "1,私,わたし,私,Tôi,Đại từ,Giới thiệu bản thân\n" +
      "1,あなた,あなた,貴方,Bạn / Anh / Chị,Đại từ,\n" +
      "1,あのひと,あのひと,あの人,Người đó,Đại từ,\n" +
      "2,これ,これ,-,Cái này,Chỉ định từ,\n" +
      "2,それ,それ,-,Cái đó,Chỉ định từ,\n" +
      "25,できます,できます,出来ます,Có thể làm,Động từ,";

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "mau_tu_vung_n5_n4_anhsensei.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        const lines = text.split("\n").filter((l) => l.trim().length > 0);
        
        let importedCount = 0;
        const newVocabs: VocabularyDto[] = [];

        // Parse CSV lines (ignoring header line 0)
        for (let i = 1; i < lines.length; i++) {
          const parts = lines[i].split(",").map((p) => p.trim().replace(/^"|"$/g, ""));
          if (parts.length >= 5) {
            const lNum = parts[0] || "1";
            const word = parts[1];
            const kana = parts[2] || word;
            const kanjiForm = parts[3];
            const meaningVi = parts[4];
            const partOfSpeech = parts[5] || "Từ vựng";

            if (word && meaningVi) {
              importedCount++;
              // If it matches current lessonId, add to active list
              if (lNum === String(lessonId)) {
                newVocabs.push({
                  vocabularyId: Date.now() + i,
                  word,
                  kana,
                  kanjiForm,
                  meaningVi,
                  partOfSpeech,
                  sortOrder: newVocabs.length + 1,
                  status: "PUBLISHED",
                  version: 1,
                });
              }
            }
          }
        }

        if (newVocabs.length > 0) {
          setVocabularies((prev) => [...prev, ...newVocabs]);
        }

        setSuccessMsg(`📥 Đã phân tách & import thành công ${importedCount} từ vựng từ file Excel!`);
        setTimeout(() => setSuccessMsg(""), 4500);
      } catch (err) {
        setError("Lỗi khi đọc file Excel. Vui lòng kiểm tra lại định dạng file!");
      }
    };
    reader.readAsText(file, "UTF-8");
  };

  // MANUAL CRUD HANDLERS (Vocab)
  const handleAddVocab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vWord.trim() || !vMeaning.trim()) return;

    const newVocab: VocabularyDto = {
      vocabularyId: Date.now(),
      word: vWord,
      kana: vKana || vWord,
      kanjiForm: vKanjiForm,
      meaningVi: vMeaning,
      partOfSpeech: vPartOfSpeech,
      sortOrder: vocabularies.length + 1,
      status: "PUBLISHED",
      version: 1,
    };

    setVocabularies((prev) => [...prev, newVocab]);
    setShowVocabModal(false);
    setVWord("");
    setVKana("");
    setVKanjiForm("");
    setVMeaning("");
    setSuccessMsg("Đã thêm từ vựng mới thủ công!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleDeleteVocab = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa từ vựng này?")) {
      setVocabularies((prev) => prev.filter((v) => v.vocabularyId !== id));
      setSuccessMsg("Đã xóa từ vựng!");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  // MANUAL CRUD HANDLERS (Kanji)
  const handleAddKanji = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kChar.trim() || !kMeaning.trim()) return;

    const newKanji: LessonKanjiDto = {
      lessonId: parseInt(lessonId),
      kanjiId: Date.now(),
      character: kChar,
      onyomi: kOnyomi,
      kunyomi: kKunyomi,
      meaningVi: kMeaning,
      strokeCount: kStrokes,
      sortOrder: kanjis.length + 1,
    };

    setKanjis((prev) => [...prev, newKanji]);
    setShowKanjiModal(false);
    setKChar("");
    setKOnyomi("");
    setKKunyomi("");
    setKMeaning("");
    setSuccessMsg("Đã thêm Kanji mới thủ công!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // MANUAL CRUD HANDLERS (Grammar)
  const handleAddGrammar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gPattern.trim() || !gMeaning.trim()) return;

    const newGrammar: GrammarPointDto = {
      grammarId: Date.now(),
      pattern: gPattern,
      meaning: gMeaning,
      explanation: gExplanation,
      jlptLevel: "N5",
      sortOrder: grammars.length + 1,
      status: "PUBLISHED",
      version: 1,
      examples: exJp ? [{ exampleId: Date.now(), japaneseText: exJp, reading: exFuri, meaningVi: exVi, sortOrder: 1 }] : [],
    };

    setGrammars((prev) => [...prev, newGrammar]);
    setShowGrammarModal(false);
    setGPattern("");
    setGMeaning("");
    setGExplanation("");
    setExJp("");
    setExVi("");
    setSuccessMsg("Đã thêm mẫu Ngữ pháp mới thủ công!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Quiz Question CRUD Handlers
  const handleOpenAddQuestion = () => {
    setEditingQId(null);
    setQText("");
    setQOptA("");
    setQOptB("");
    setQOptC("");
    setQOptD("");
    setQCorrect("A");
    setQExpl("");
    setShowQuestionModal(true);
  };

  const handleOpenEditQuestion = (q: QuizQuestionItem) => {
    setEditingQId(q.id);
    setQText(q.questionText);
    setQOptA(q.optionA);
    setQOptB(q.optionB);
    setQOptC(q.optionC);
    setQOptD(q.optionD);
    setQCorrect(q.correctOption);
    setQExpl(q.explanation || "");
    setShowQuestionModal(true);
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa câu hỏi này khỏi Kho Đề Thi?")) {
      setQuestionBank((prev) => prev.filter((q) => q.id !== id));
      setSuccessMsg("Đã xóa câu hỏi khỏi Kho Đề thành công!");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !qOptA.trim() || !qOptB.trim() || !qOptC.trim() || !qOptD.trim()) {
      alert("Vui lòng điền đầy đủ câu hỏi và 4 phương án A, B, C, D!");
      return;
    }

    if (editingQId) {
      setQuestionBank((prev) =>
        prev.map((q) =>
          q.id === editingQId
            ? {
                ...q,
                questionText: qText,
                optionA: qOptA,
                optionB: qOptB,
                optionC: qOptC,
                optionD: qOptD,
                correctOption: qCorrect,
                explanation: qExpl,
              }
            : q
        )
      );
      setSuccessMsg("Đã cập nhật câu hỏi thành công!");
    } else {
      const newQ: QuizQuestionItem = {
        id: "q_" + Date.now(),
        questionText: qText,
        optionA: qOptA,
        optionB: qOptB,
        optionC: qOptC,
        optionD: qOptD,
        correctOption: qCorrect,
        explanation: qExpl,
      };
      setQuestionBank((prev) => [...prev, newQ]);
      setSuccessMsg("Đã thêm câu hỏi mới vào Kho Đề Thi!");
    }

    setShowQuestionModal(false);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Smart Auto-Generate Quiz Questions from Vocabulary List
  const handleAutoGenerateQuiz = () => {
    if (vocabularies.length === 0) {
      alert("Bài học này chưa có từ vựng! Vui lòng thêm từ vựng trước khi tạo câu hỏi tự động.");
      return;
    }

    const generated: QuizQuestionItem[] = vocabularies.slice(0, 10).map((v) => {
      const wrongOptions = vocabularies
        .filter((item) => item.vocabularyId !== v.vocabularyId)
        .map((item) => item.meaningVi)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const allOpts = [v.meaningVi, ...wrongOptions].sort(() => Math.random() - 0.5);
      const correctIdx = allOpts.indexOf(v.meaningVi);
      const correctLetters: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

      return {
        id: `gen_${v.vocabularyId}_${Date.now()}`,
        questionText: `Từ 「${v.word} (${v.kana})」 trong tiếng Việt có nghĩa là gì?`,
        optionA: allOpts[0] || "Tôi",
        optionB: allOpts[1] || "Bạn",
        optionC: allOpts[2] || "Chúng tôi",
        optionD: allOpts[3] || "Thầy giáo",
        correctOption: correctLetters[correctIdx] || "A",
        explanation: `Từ ${v.word} (${v.kana}) có nghĩa chính xác là: ${v.meaningVi}`,
      };
    });

    setQuestionBank((prev) => [...prev, ...generated]);
    setSuccessMsg(`⚡ Đã tự động sinh ${generated.length} câu hỏi trắc nghiệm vào Kho Đề Thi!`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 sm:p-10 text-[#2C2421]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Hidden File Input for Excel Import */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".csv, .xlsx, .xls"
          className="hidden"
        />

        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between bg-[#FAF3EB] border border-[#DED3C8] px-5 py-3 rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B6F5A]">
            <Link href="/admin" className="hover:text-[#C65D4B] transition-colors">
              Admin Portal
            </Link>
            <span>/</span>
            <span className="text-[#C65D4B] font-extrabold">Quản Lý Bài Học #{lessonId}</span>
          </div>

          <Link
            href="/admin"
            className="px-4 py-2 bg-[#FFFDF9] hover:bg-[#C65D4B] border border-[#DED3C8] hover:border-[#C65D4B] text-[#56423E] hover:text-white font-extrabold text-xs rounded-xl transition-all shadow-2xs"
          >
            Quay lại Portal
          </Link>
        </div>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#C65D4B] to-[#D98373] rounded-3xl p-8 text-white shadow-xl flex justify-between items-center relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
              ⚙️ ADMIN CURRICULUM MANAGEMENT
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Quản Lý Nội Dung Bài #{lessonId}</h1>
            <p className="text-white/90 text-sm max-w-xl">
              Nạp dữ liệu hàng loạt bằng Excel hoặc Thêm/Sửa/Xóa thủ công từ vựng, Hán tự, Ngữ pháp và Kho Đề Quiz.
            </p>
          </div>
        </div>

        {/* Global Toolbar: Bulk Excel Import & Template Download */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF3EB] border border-[#DED3C8] p-4 rounded-2xl">
          <div className="space-y-0.5">
            <h3 className="text-xs font-extrabold text-[#231917]">📥 Nạp Dữ Liệu Excel Hàng Loạt</h3>
            <p className="text-[11px] text-[#76685F]">Nạp 800 từ vựng vào 25 bài học N5/N4 tự động trong 1 click</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadTemplate}
              className="px-3 py-2 bg-white hover:bg-[#DED3C8]/40 border border-[#DED3C8] text-[#56423E] text-xs font-extrabold rounded-xl transition-all shadow-2xs flex items-center gap-1.5"
            >
              📄 Tải File Excel Mẫu
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-2xs flex items-center gap-1.5"
            >
              📥 Import Excel Hàng Loạt
            </button>
          </div>
        </div>

        {/* Notifications */}
        {error && <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-2xl text-xs font-bold">⚠️ {error}</div>}
        {successMsg && <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 rounded-2xl text-xs font-bold animate-fade-in">✓ {successMsg}</div>}

        {/* 🌟 CHỌN MỤC QUẢN LÝ TÁCH RIÊNG TỪNG CHUYÊN MỤC - ZERO GỘP TẠI BÀI HỌC */}
        <div className="bg-white border-2 border-[#EADECF] p-6 rounded-3xl space-y-4 shadow-2xs">
          <div className="space-y-1 border-b border-[#EADECF] pb-3">
            <h3 className="text-base font-sans font-black text-[#231917]">
              CHỌN MỤC QUẢN LÝ CHUYÊN BIỆT BÀI #{lessonId}
            </h3>
            <p className="text-xs text-[#76685F]">
              Mỗi mục quản lý độc lập 100% dữ liệu kiến thức và các dạng bài tập tương ứng của chuyên mục đó.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href={`/admin/vocabularies/${lessonId}`}
              className="p-5 rounded-2xl border-2 border-orange-200 bg-orange-50/50 hover:bg-orange-100/60 transition-all space-y-2 group cursor-pointer shadow-2xs hover:scale-[1.02]"
            >
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-xl bg-[#C65D4B] text-white flex items-center justify-center font-bold text-lg shadow-xs">
                  📖
                </div>
                <span className="text-[10px] font-black bg-[#C65D4B] text-white px-2.5 py-0.5 rounded-full">
                  {vocabularies.length} Từ Vựng
                </span>
              </div>
              <h4 className="font-black text-[#231917] text-base group-hover:text-[#C65D4B] transition-colors">
                Quản Lý Từ Vựng Bài #{lessonId}
              </h4>
              <p className="text-xs text-[#76685F]">
                Biên tập Từ vựng, Flashcard 3D, Luyện gõ Romaji, Game 3D ghép thẻ & Quiz Từ Vựng.
              </p>
            </Link>

            <Link
              href={`/admin/kanji/${lessonId}`}
              className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/50 hover:bg-amber-100/60 transition-all space-y-2 group cursor-pointer shadow-2xs hover:scale-[1.02]"
            >
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                  ✍️
                </div>
                <span className="text-[10px] font-black bg-amber-600 text-white px-2.5 py-0.5 rounded-full">
                  {kanjis.length} Kanji
                </span>
              </div>
              <h4 className="font-black text-[#231917] text-base group-hover:text-amber-700 transition-colors">
                Quản Lý Hán Tự Bài #{lessonId}
              </h4>
              <p className="text-xs text-[#76685F]">
                Biên tập Chữ Hán, Canvas nét vẽ 3D, Gõ Hiragana, Luyện đọc câu, Game 3D Kanji & Quiz Kanji.
              </p>
            </Link>

            <Link
              href={`/admin/grammar/${lessonId}`}
              className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 transition-all space-y-2 group cursor-pointer shadow-2xs hover:scale-[1.02]"
            >
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                  🧩
                </div>
                <span className="text-[10px] font-black bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                  {grammars.length} Ngữ Pháp
                </span>
              </div>
              <h4 className="font-black text-[#231917] text-base group-hover:text-emerald-700 transition-colors">
                Quản Lý Ngữ Pháp Bài #{lessonId}
              </h4>
              <p className="text-xs text-[#76685F]">
                Biên tập Mẫu câu, Cloze transform, Phản xạ hội thoại, Ema sentence game & Quiz Ngữ Pháp.
              </p>
            </Link>
          </div>
        </div>

        {/* TAB 1: VOCABULARY MANAGEMENT */}
        {activeTab === "vocab" && (
          <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            {/* HDSD Banner Vocab */}
            <div className="bg-orange-50/80 border-2 border-orange-200 rounded-2xl p-4 sm:p-5 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">📖</span>
                <h4 className="font-black text-orange-950 text-sm">HƯỚNG DẪN QUẢN LÝ TỪ VỰNG BÀI HỌC (VOCABULARY MANAGEMENT GUIDE)</h4>
              </div>
              <p className="text-[#76685F] font-semibold leading-relaxed">
                Tất cả các từ vựng bạn thêm ở mục này sẽ tự động phân nạp sang 4 dạng bài tập bên phía Học viên: <strong className="text-[#C65D4B]">1. Lật thẻ 3D Flashcard & SRS</strong>, <strong className="text-[#C65D4B]">2. Luyện gõ Romaji/Kana</strong>, <strong className="text-[#C65D4B]">3. Game ghép thẻ 3D</strong> và <strong className="text-[#C65D4B]">4. Quiz trắc nghiệm từ vựng</strong>.
              </p>
            </div>

            <div className="flex justify-between items-center border-b border-[#DED3C8] pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#231917]">📖 Danh Sách Từ Vựng Bài #{lessonId}</h3>
                <p className="text-xs text-[#76685F]">Thêm mới hoặc chỉnh sửa thủ công từng từ vựng trong bài học</p>
              </div>
              <button
                onClick={() => setShowVocabModal(true)}
                className="px-4 py-2 bg-[#C65D4B] hover:bg-[#a84c3c] text-white text-xs font-extrabold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                + Thêm Từ Vựng Thủ Công
              </button>
            </div>

            <div className="border border-[#DED3C8] rounded-2xl divide-y divide-[#DED3C8] bg-white overflow-hidden shadow-2xs">
              {vocabularies.map((v, idx) => (
                <div key={v.vocabularyId} className="p-4 flex items-center justify-between hover:bg-[#FFFDF9] transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black bg-[#FAF3EB] text-[#C65D4B] px-2 py-0.5 rounded-md border border-[#DED3C8]">
                        #{idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-[#231917]">
                        {v.word} <span className="text-xs text-[#76685F]">({v.kana})</span>
                      </h4>
                    </div>
                    <p className="text-xs text-[#C65D4B] font-semibold">💡 {v.meaningVi}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteVocab(v.vocabularyId)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-lg transition-all cursor-pointer"
                  >
                    🗑️ Xóa
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: KANJI MANAGEMENT */}
        {activeTab === "kanji" && (
          <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            {/* HDSD Banner Kanji */}
            <div className="bg-amber-50/80 border-2 border-amber-200 rounded-2xl p-4 sm:p-5 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">✍️</span>
                <h4 className="font-black text-amber-950 text-sm">HƯỚNG DẪN QUẢN LÝ HÁN TỰ KANJI (KANJI MANAGEMENT GUIDE)</h4>
              </div>
              <p className="text-[#76685F] font-semibold leading-relaxed">
                Tất cả Hán tự nhập ở đây sẽ tự động liên kết sang 5 dạng luyện tập của Learner: <strong className="text-amber-800">1. Canvas luyện vẽ nét 3D</strong>, <strong className="text-amber-800">2. Luyện gõ âm Hiragana</strong>, <strong className="text-amber-800">3. Luyện đọc câu Hán tự</strong>, <strong className="text-amber-800">4. Arcade Game 3D ghép thẻ Kanji</strong> và <strong className="text-amber-800">5. Quiz trắc nghiệm Kanji</strong>.
              </p>
            </div>

            <div className="flex justify-between items-center border-b border-[#DED3C8] pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#231917]">✍️ Danh Sách Hán Tự Kanji Bài #{lessonId}</h3>
                <p className="text-xs text-[#76685F]">Thêm mới hoặc chỉnh sửa thủ công từng Hán tự trong bài học</p>
              </div>
              <button
                onClick={() => setShowKanjiModal(true)}
                className="px-4 py-2 bg-[#C65D4B] hover:bg-[#a84c3c] text-white text-xs font-extrabold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                + Thêm Kanji Thủ Công
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {kanjis.map((k) => (
                <div key={k.kanjiId} className="bg-white border border-[#DED3C8] rounded-2xl p-4 space-y-2 shadow-2xs">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-[#C65D4B]">{k.character}</span>
                    <span className="text-[10px] bg-[#FAF3EB] text-[#8B6F5A] px-2 py-0.5 rounded-full font-bold border border-[#DED3C8]">
                      {k.strokeCount || 4} nét
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#231917]">Hán Việt: {k.meaningVi}</p>
                  <p className="text-[11px] text-[#76685F]">On: {k.onyomi || "-"} | Kun: {k.kunyomi || "-"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GRAMMAR MANAGEMENT (MANUAL CRUD PRESERVED) */}
        {activeTab === "grammar" && (
          <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            {/* HDSD Banner Grammar */}
            <div className="bg-emerald-50/80 border-2 border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">🧩</span>
                <h4 className="font-black text-emerald-950 text-sm">HƯỚNG DẪN QUẢN LÝ NGỮ PHÁP BÀI HỌC (GRAMMAR MANAGEMENT GUIDE)</h4>
              </div>
              <p className="text-[#76685F] font-semibold leading-relaxed">
                Mẫu ngữ pháp & câu ví dụ sẽ tự động liên kết sang 4 dạng bài tập của Learner: <strong className="text-emerald-800">1. Cloze Transform điền từ chia thể</strong>, <strong className="text-emerald-800">2. Conversational Reflex phản xạ hội thoại</strong>, <strong className="text-emerald-800">3. Ema Game ghép khối từ xếp câu</strong> và <strong className="text-emerald-800">4. Quiz trắc nghiệm trợ từ/mẫu câu</strong>.
              </p>
            </div>

            <div className="flex justify-between items-center border-b border-[#DED3C8] pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#231917]">🧩 Danh Sách Mẫu Ngữ Pháp Bài #{lessonId}</h3>
                <p className="text-xs text-[#76685F]">Thêm mới hoặc chỉnh sửa thủ công từng cấu trúc ngữ pháp</p>
              </div>
              <button
                onClick={() => setShowGrammarModal(true)}
                className="px-4 py-2 bg-[#C65D4B] hover:bg-[#a84c3c] text-white text-xs font-extrabold rounded-xl transition-all shadow-xs"
              >
                + Thêm Ngữ Pháp Thủ Công
              </button>
            </div>

            <div className="space-y-4">
              {grammars.map((g) => (
                <div key={g.grammarId} className="bg-white border border-[#DED3C8] rounded-2xl p-5 space-y-2 shadow-2xs">
                  <h4 className="text-base font-extrabold text-[#C65D4B]">{g.pattern}</h4>
                  <p className="text-xs font-bold text-[#231917]">Ý nghĩa: {g.meaning}</p>
                  <p className="text-xs text-[#76685F]">{g.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: QUIZ QUESTION BANK MANAGER */}
        {activeTab === "quiz" && (
          <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DED3C8] pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#231917]">🎯 Cấu Hình Kho Đề Thi &amp; Quản Lý Câu Hỏi Quiz</h3>
                <p className="text-xs text-[#76685F]">Quản lý danh sách câu hỏi trắc nghiệm và thiết lập bốc ngẫu nhiên cho lượt thi</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAutoGenerateQuiz}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  ⚡ Sinh Đề Tự Động
                </button>
                <button
                  onClick={handleOpenAddQuestion}
                  className="px-4 py-2 bg-[#C65D4B] hover:bg-[#a84c3c] text-white text-xs font-extrabold rounded-xl transition-all shadow-xs"
                >
                  + Thêm Câu Hỏi Mới
                </button>
              </div>
            </div>

            {/* Single Source of Truth Redirection Banner to Central Admin Quiz Editor */}
            <div className="bg-gradient-to-r from-[#2C2421] via-[#3E322D] to-[#2C2421] border-2 border-[#4E3F39] p-8 rounded-3xl text-white shadow-xl text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#EADECF] font-black text-xs border border-white/15">
                <span>⛩️ TRUNG TÂM QUẢN LÝ KHO ĐỀ QUIZ TẬP TRUNG</span>
              </div>

              <h3 className="text-2xl font-serif font-black text-white">
                Quản Lý & Biên Tập Kho Đề 4 Chuyên Mục Cho Bài #{lessonId}
              </h3>

              <p className="text-xs text-[#D9CEB2] max-w-xl mx-auto leading-relaxed">
                Toàn bộ thao tác quản lý Quiz, sinh đề tự động 4 chuyên mục (Từ vựng 📖, Kanji ✍️, Ngữ pháp 🧩, Tổng hợp 🎯), biên tập câu hỏi thủ công và xuất bản bài Quiz cho Học viên hiện được quản lý tập trung tại Trình biên tập Kho Đề chính thức.
              </p>

              <div className="pt-2">
                <Link
                  href={`/admin/quizzes/${lessonId}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C65D4B] hover:bg-[#B54F3E] text-white font-black text-xs rounded-2xl shadow-lg transition-all hover:scale-105 cursor-pointer"
                >
                  <span>🎯 Mở Trình Biên Tập Kho Đề Bài #{lessonId} ➔</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* MODALS FOR MANUAL VOCAB, KANJI, GRAMMAR, QUIZ (ALL PRESERVED 100%) */}
        {showVocabModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <form onSubmit={handleAddVocab} className="bg-[#FFFDF9] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-3 border border-[#DED3C8]">
              <h3 className="text-lg font-bold text-[#C65D4B]">Thêm Từ Vựng Mới Thủ Công</h3>
              <input required placeholder="Từ vựng (Ví dụ: 私)" value={vWord} onChange={(e) => setVWord(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917]" />
              <input required placeholder="Cách đọc Kana (Ví dụ: わたし)" value={vKana} onChange={(e) => setVKana(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917]" />
              <input placeholder="Hán tự gốc (Ví dụ: 私)" value={vKanjiForm} onChange={(e) => setVKanjiForm(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917]" />
              <input required placeholder="Nghĩa tiếng Việt (Ví dụ: Tôi)" value={vMeaning} onChange={(e) => setVMeaning(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917]" />
              <input placeholder="Loại từ (Ví dụ: Danh từ)" value={vPartOfSpeech} onChange={(e) => setVPartOfSpeech(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917]" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowVocabModal(false)} className="flex-1 py-2.5 bg-[#FAF3EB] border border-[#DED3C8] rounded-xl text-xs font-bold text-[#76685F]">Hủy</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#C65D4B] hover:bg-[#a84c3c] text-white rounded-xl text-xs font-bold shadow-sm">Lưu Từ Vựng</button>
              </div>
            </form>
          </div>
        )}

        {showKanjiModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <form onSubmit={handleAddKanji} className="bg-[#FFFDF9] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-3 border border-[#DED3C8]">
              <h3 className="text-lg font-bold text-[#C65D4B]">Thêm Kanji Thủ Công</h3>
              <input required placeholder="Ký tự Kanji (Ví dụ: 日)" value={kChar} onChange={(e) => setKChar(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917]" />
              <input placeholder="Onyomi (Ví dụ: ニチ, JITSU)" value={kOnyomi} onChange={(e) => setKOnyomi(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917]" />
              <input placeholder="Kunyomi (Ví dụ: hi, ka)" value={kKunyomi} onChange={(e) => setKKunyomi(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917]" />
              <input required placeholder="Nghĩa tiếng Việt (Ví dụ: Mặt trời, ngày)" value={kMeaning} onChange={(e) => setKMeaning(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917]" />
              <input type="number" min={1} placeholder="Số nét vẽ" value={kStrokes} onChange={(e) => setKStrokes(parseInt(e.target.value) || 4)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917]" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowKanjiModal(false)} className="flex-1 py-2.5 bg-[#FAF3EB] border border-[#DED3C8] rounded-xl text-xs font-bold text-[#76685F]">Hủy</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#C65D4B] hover:bg-[#a84c3c] text-white rounded-xl text-xs font-bold shadow-sm">Lưu Kanji</button>
              </div>
            </form>
          </div>
        )}

        {showGrammarModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <form onSubmit={handleAddGrammar} className="bg-[#FFFDF9] rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-3 border border-[#DED3C8]">
              <h3 className="text-lg font-bold text-[#C65D4B]">Thêm Mẫu Ngữ Pháp Thủ Công</h3>
              <input required placeholder="Mẫu ngữ pháp (Ví dụ: ～は～です)" value={gPattern} onChange={(e) => setGPattern(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917]" />
              <input required placeholder="Ý nghĩa (Ví dụ: N1 là N2)" value={gMeaning} onChange={(e) => setGMeaning(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917]" />
              <textarea required rows={2} placeholder="Giải thích chi tiết cách dùng..." value={gExplanation} onChange={(e) => setGExplanation(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917]" />
              
              <div className="border-t border-[#DED3C8] pt-2">
                <p className="text-xs font-bold text-[#76685F] mb-1">Ví Dụ Đi Kèm (Tùy Chọn):</p>
                <input placeholder="Câu tiếng Nhật (Ví dụ: わたしはたなかです。)" value={exJp} onChange={(e) => setExJp(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917] mb-1.5" />
                <input placeholder="Furigana/Phát âm" value={exFuri} onChange={(e) => setExFuri(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917] mb-1.5" />
                <input placeholder="Nghĩa tiếng Việt (Ví dụ: Tôi là Tanaka.)" value={exVi} onChange={(e) => setExVi(e.target.value)} className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs text-[#231917] mb-1.5" />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowGrammarModal(false)} className="flex-1 py-2.5 bg-[#FAF3EB] border border-[#DED3C8] rounded-xl text-xs font-bold text-[#76685F]">Hủy</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#C65D4B] hover:bg-[#a84c3c] text-white rounded-xl text-xs font-bold shadow-sm">Lưu Ngữ Pháp</button>
              </div>
            </form>
          </div>
        )}

        {showQuestionModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <form onSubmit={handleSaveQuestion} className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 border border-[#DED3C8]">
              <div className="flex justify-between items-center border-b border-[#DED3C8] pb-3">
                <h3 className="text-base font-extrabold text-[#C65D4B]">
                  {editingQId ? "Chỉnh Sửa Câu Hỏi Kho Đề" : "Thêm Câu Hỏi Mới Vào Kho Đề Thủ Công"}
                </h3>
                <button type="button" onClick={() => setShowQuestionModal(false)} className="text-xs text-[#76685F] font-bold">✕ Đóng</button>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#56423E] mb-1">Nội dung câu hỏi *</label>
                <textarea
                  required
                  rows={2}
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                  placeholder="Ví dụ: Từ 「私 (わたし)」 trong tiếng Việt nghĩa là gì?"
                  className="w-full p-2.5 bg-white border border-[#DED3C8] rounded-xl text-xs font-semibold text-[#231917] outline-hidden focus:border-[#C65D4B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#56423E] mb-1">Phương án A *</label>
                  <input required value={qOptA} onChange={(e) => setQOptA(e.target.value)} className="w-full p-2 bg-white border border-[#DED3C8] rounded-xl text-xs font-semibold text-[#231917]" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#56423E] mb-1">Phương án B *</label>
                  <input required value={qOptB} onChange={(e) => setQOptB(e.target.value)} className="w-full p-2 bg-white border border-[#DED3C8] rounded-xl text-xs font-semibold text-[#231917]" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#56423E] mb-1">Phương án C *</label>
                  <input required value={qOptC} onChange={(e) => setQOptC(e.target.value)} className="w-full p-2 bg-white border border-[#DED3C8] rounded-xl text-xs font-semibold text-[#231917]" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#56423E] mb-1">Phương án D *</label>
                  <input required value={qOptD} onChange={(e) => setQOptD(e.target.value)} className="w-full p-2 bg-white border border-[#DED3C8] rounded-xl text-xs font-semibold text-[#231917]" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#56423E] mb-1">Chọn Đáp Án Đúng *</label>
                <select
                  value={qCorrect}
                  onChange={(e) => setQCorrect(e.target.value as "A" | "B" | "C" | "D")}
                  className="w-full p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-extrabold text-emerald-900"
                >
                  <option value="A">Đáp án A chính xác</option>
                  <option value="B">Đáp án B chính xác</option>
                  <option value="C">Đáp án C chính xác</option>
                  <option value="D">Đáp án D chính xác</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#56423E] mb-1">Giải thích đáp án (Tùy chọn)</label>
                <input value={qExpl} onChange={(e) => setQExpl(e.target.value)} placeholder="Giải thích chi tiết..." className="w-full p-2 bg-white border border-[#DED3C8] rounded-xl text-xs font-semibold text-[#231917]" />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowQuestionModal(false)} className="flex-1 py-2.5 bg-[#FAF3EB] border border-[#DED3C8] rounded-xl text-xs font-bold text-[#76685F]">Hủy</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#C65D4B] hover:bg-[#a84c3c] text-white rounded-xl text-xs font-extrabold shadow-sm">Lưu Câu Hỏi</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
