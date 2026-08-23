"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { 
  ArrowLeft, PlusCircle, Sparkles, CheckCircle2, AlertCircle, Trash2, Edit3, Eye, 
  Volume2, Keyboard, Check, ShieldCheck, Zap, RefreshCw, Filter, Play 
} from "lucide-react";

interface OptionItem {
  optionId?: number;
  optionText: string;
  isCorrect: boolean;
  sortOrder: number;
}

interface QuestionBankItem {
  questionId?: number;
  questionType: "MULTIPLE_CHOICE" | "LISTENING" | "TYPING";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  prompt: string;
  japaneseText?: string;
  audioUrl?: string;
  audioText?: string;
  transcript?: string;
  validAnswers?: string;
  explanation?: string;
  status: "DRAFT" | "ACTIVE" | "INACTIVE";
  options: OptionItem[];
}

export default function AdminQuizEditorPage({ params }: { params: Promise<{ quizId: string }> }) {
  const resolvedParams = use(params);
  const quizId = resolvedParams.quizId;

  const [questions, setQuestions] = useState<QuestionBankItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [toast, setToast] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);

  // Modal State for Adding/Editing Question
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuestionBankItem | null>(null);

  // Form State
  const [formType, setFormType] = useState<"MULTIPLE_CHOICE" | "LISTENING" | "TYPING">("MULTIPLE_CHOICE");
  const [formDifficulty, setFormDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">("MEDIUM");
  const [formPrompt, setFormPrompt] = useState("");
  const [formAudioText, setFormAudioText] = useState("");
  const [formTranscript, setFormTranscript] = useState("");
  const [formValidAnswers, setFormValidAnswers] = useState("");
  const [formExplanation, setFormExplanation] = useState("");
  const [formStatus, setFormStatus] = useState<"DRAFT" | "ACTIVE" | "INACTIVE">("ACTIVE");
  const [formOptions, setFormOptions] = useState<OptionItem[]>([
    { optionText: "", isCorrect: true, sortOrder: 1 },
    { optionText: "", isCorrect: false, sortOrder: 2 },
    { optionText: "", isCorrect: false, sortOrder: 3 },
    { optionText: "", isCorrect: false, sortOrder: 4 },
  ]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/api/v1/admin/question-bank/lesson/${quizId}`);
      if (res.ok) {
        const data = await res.json();
        setQuestions(data.data || []);
      }
    } catch (e) {
      console.error("Lỗi tải danh sách Kho đề:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const openCreateModal = () => {
    setEditingQuestion(null);
    setFormType("MULTIPLE_CHOICE");
    setFormDifficulty("MEDIUM");
    setFormPrompt("");
    setFormAudioText("");
    setFormTranscript("");
    setFormValidAnswers("");
    setFormExplanation("");
    setFormStatus("ACTIVE");
    setFormOptions([
      { optionText: "", isCorrect: true, sortOrder: 1 },
      { optionText: "", isCorrect: false, sortOrder: 2 },
      { optionText: "", isCorrect: false, sortOrder: 3 },
      { optionText: "", isCorrect: false, sortOrder: 4 },
    ]);
    setShowModal(true);
  };

  const openEditModal = (q: QuestionBankItem) => {
    setEditingQuestion(q);
    setFormType(q.questionType);
    setFormDifficulty(q.difficulty);
    setFormPrompt(q.prompt || "");
    setFormAudioText(q.audioText || "");
    setFormTranscript(q.transcript || "");
    setFormValidAnswers(q.validAnswers || "");
    setFormExplanation(q.explanation || "");
    setFormStatus(q.status);
    setFormOptions(
      q.options && q.options.length > 0
        ? q.options
        : [
            { optionText: "", isCorrect: true, sortOrder: 1 },
            { optionText: "", isCorrect: false, sortOrder: 2 },
            { optionText: "", isCorrect: false, sortOrder: 3 },
            { optionText: "", isCorrect: false, sortOrder: 4 },
          ]
    );
    setShowModal(true);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        questionType: formType,
        difficulty: formDifficulty,
        prompt: formPrompt,
        audioText: formAudioText,
        transcript: formTranscript,
        validAnswers: formValidAnswers,
        explanation: formExplanation,
        status: formStatus,
        options: formType !== "TYPING" ? formOptions : [],
      };

      let url = `http://localhost:8080/api/v1/admin/question-bank/lesson/${quizId}`;
      let method = "POST";

      if (editingQuestion && editingQuestion.questionId) {
        url = `http://localhost:8080/api/v1/admin/question-bank/${editingQuestion.questionId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setToast(editingQuestion ? "Đã cập nhật câu hỏi Kho đề!" : "Đã thêm câu hỏi mới vào Kho đề!");
        setShowModal(false);
        fetchQuestions();
      } else {
        const errData = await res.json();
        alert(errData.message || "Lỗi khi lưu câu hỏi Kho đề.");
      }
    } catch (err: any) {
      alert("Lỗi kết nối: " + err.message);
    }
  };

  const handleDelete = async (questionId: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa mềm câu hỏi này khỏi Kho đề?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/v1/admin/question-bank/${questionId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setToast("Đã xóa câu hỏi khỏi Kho đề.");
        fetchQuestions();
      }
    } catch (err: any) {
      alert("Lỗi khi xóa câu hỏi: " + err.message);
    }
  };

  const handleApproveDraft = async (q: QuestionBankItem) => {
    try {
      const updated = { ...q, status: "ACTIVE" };
      const res = await fetch(`http://localhost:8080/api/v1/admin/question-bank/${q.questionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setToast("🟢 Đã duyệt câu hỏi sang trạng thái ACTIVE!");
        fetchQuestions();
      }
    } catch (err: any) {
      alert("Lỗi khi duyệt câu hỏi: " + err.message);
    }
  };

  const handlePublishQuiz = async () => {
    try {
      setPublishing(true);
      const res = await fetch(`http://localhost:8080/api/v1/admin/question-bank/publish/lesson/${quizId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        alert("🟢 CHÚC MỪNG! Đã xuất bản (PUBLISHED) bài Quiz này thành công cho Học viên!");
        fetchQuestions();
      } else {
        alert(data.message || "Không thể xuất bản Quiz. Vui lòng kiểm tra lại số câu hỏi ACTIVE.");
      }
    } catch (err: any) {
      alert("Lỗi xuất bản Quiz: " + err.message);
    } finally {
      setPublishing(false);
    }
  };

  const filteredQuestions = questions.filter((q) => {
    if (filterType !== "ALL" && q.questionType !== filterType) return false;
    if (filterStatus !== "ALL" && q.status !== filterStatus) return false;
    return true;
  });

  const activeCount = questions.filter((q) => q.status === "ACTIVE").length;
  const draftCount = questions.filter((q) => q.status === "DRAFT").length;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2421] p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border-2 border-[#DED3C8] p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/quizzes"
              className="p-3 bg-[#FAF3EB] hover:bg-[#C65D4B] hover:text-white text-[#76685F] rounded-2xl border border-[#DED3C8] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-xs font-black text-[#C65D4B] bg-[#FAF3EB] px-3 py-1 rounded-full border border-[#DED3C8]">
                Kho đề Bài #{quizId}
              </span>
              <h1 className="text-2xl font-serif font-black text-[#231917] mt-1">
                Biên Tập Ngân Hàng Câu Hỏi & Xuất Bản Quiz
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openCreateModal}
              className="px-5 py-3 bg-[#C65D4B] hover:bg-[#b54f3e] text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Thêm câu hỏi mới</span>
            </button>

            <button
              onClick={handlePublishQuiz}
              disabled={publishing}
              className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{publishing ? "Đang xuất bản..." : "🟢 Xuất bản (Publish Quiz)"}</span>
            </button>
          </div>
        </div>

        {/* Toast alert */}
        {toast && (
          <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex justify-between items-center">
            <span>{toast}</span>
            <button onClick={() => setToast(null)} className="font-black text-emerald-600 cursor-pointer">✕</button>
          </div>
        )}

        {/* Stat Summary Header */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border-2 border-[#DED3C8] p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#8C7B70] uppercase block">Tổng câu trong kho</span>
              <strong className="text-2xl font-extrabold text-[#231917]">{questions.length}</strong>
            </div>
            <Sparkles className="w-8 h-8 text-[#C65D4B]/40" />
          </div>

          <div className="bg-white border-2 border-emerald-200 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase block">Đã duyệt (Active)</span>
              <strong className="text-2xl font-extrabold text-emerald-700">{activeCount}</strong>
            </div>
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>

          <div className="bg-white border-2 border-amber-200 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase block">Chờ duyệt (Draft)</span>
              <strong className="text-2xl font-extrabold text-amber-700">{draftCount}</strong>
            </div>
            <AlertCircle className="w-8 h-8 text-amber-400" />
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-[#DED3C8] p-4 rounded-2xl flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-4 h-4 text-[#76685F]" />
            <span className="text-xs font-bold text-[#76685F]">Dạng câu hỏi:</span>
            {["ALL", "MULTIPLE_CHOICE", "LISTENING", "TYPING"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                  filterType === t ? "bg-[#C65D4B] text-white" : "bg-[#FAF3EB] text-[#76685F] border border-[#DED3C8]"
                }`}
              >
                {t === "ALL" ? "Tất cả" : t === "MULTIPLE_CHOICE" ? "Trắc nghiệm" : t === "LISTENING" ? "Luyện Nghe" : "Luyện Gõ"}
              </button>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-xs font-bold text-[#76685F]">Trạng thái:</span>
            {["ALL", "ACTIVE", "DRAFT"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                  filterStatus === s ? "bg-[#231917] text-white" : "bg-[#FAF3EB] text-[#76685F] border border-[#DED3C8]"
                }`}
              >
                {s === "ALL" ? "Tất cả" : s}
              </button>
            ))}
          </div>
        </div>

        {/* Question List */}
        {loading ? (
          <div className="text-center py-20 text-[#76685F] font-bold">Đang tải ngân hàng câu hỏi...</div>
        ) : filteredQuestions.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-[#DED3C8] p-12 text-center rounded-3xl text-[#76685F] font-bold space-y-3">
            <p>Chưa có câu hỏi nào phù hợp trong Kho đề bài học này.</p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-[#C65D4B] text-white text-xs font-bold rounded-xl"
            >
              + Thêm câu hỏi thủ công ngay
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => (
              <div
                key={q.questionId || idx}
                className="bg-white border-2 border-[#DED3C8] rounded-2xl p-6 shadow-2xs hover:shadow-sm transition-all space-y-4"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-[#C65D4B] bg-[#FAF3EB] px-3 py-1 rounded-full border border-[#DED3C8]">
                      Câu #{idx + 1}
                    </span>

                    <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-lg border border-blue-200">
                      {q.questionType === "MULTIPLE_CHOICE" ? "Trắc nghiệm" : q.questionType === "LISTENING" ? "Luyện Nghe 🔊" : "Luyện Gõ ⌨️"}
                    </span>

                    <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-lg border border-purple-200">
                      Độ khó: {q.difficulty}
                    </span>

                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-lg border ${
                        q.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : "bg-amber-50 text-amber-700 border-amber-300"
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {q.status === "DRAFT" && (
                      <button
                        onClick={() => handleApproveDraft(q)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Duyệt ACTIVE</span>
                      </button>
                    )}

                    <button
                      onClick={() => openEditModal(q)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => q.questionId && handleDelete(q.questionId)}
                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Prompt */}
                <h3 className="text-base font-extrabold text-[#231917]">{q.prompt}</h3>

                {/* Question Details */}
                {q.questionType === "TYPING" ? (
                  <div className="bg-[#FAF3EB] p-3 rounded-xl text-xs space-y-1">
                    <strong className="text-[#8C7B70]">Đáp án hợp lệ gõ Romaji/Kana:</strong>
                    <p className="font-mono text-emerald-700 font-bold">{q.validAnswers}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options?.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-3 rounded-xl border font-medium flex items-center justify-between ${
                          opt.isCorrect
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold"
                            : "bg-gray-50 border-gray-200 text-gray-700"
                        }`}
                      >
                        <span>{opt.optionText}</span>
                        {opt.isCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal CRUD Form */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
              <div className="flex justify-between items-center border-b border-[#DED3C8] pb-4">
                <h2 className="text-xl font-serif font-black text-[#231917]">
                  {editingQuestion ? "Chỉnh Sửa Câu Hỏi Kho Đề" : "Thêm Câu Hỏi Mới Vào Kho Đề"}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 font-black">✕</button>
              </div>

              <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs font-semibold">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#8C7B70] font-bold mb-1">Loại câu hỏi</label>
                    <select
                      value={formType}
                      onChange={(e: any) => setFormType(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-[#DED3C8] rounded-xl font-bold"
                    >
                      <option value="MULTIPLE_CHOICE">Trắc nghiệm</option>
                      <option value="LISTENING">Luyện Nghe 🔊</option>
                      <option value="TYPING">Luyện Gõ ⌨️</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8C7B70] font-bold mb-1">Độ khó</label>
                    <select
                      value={formDifficulty}
                      onChange={(e: any) => setFormDifficulty(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-[#DED3C8] rounded-xl font-bold"
                    >
                      <option value="EASY">EASY (Dễ)</option>
                      <option value="MEDIUM">MEDIUM (Vừa)</option>
                      <option value="HARD">HARD (Khó)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8C7B70] font-bold mb-1">Trạng thái</label>
                    <select
                      value={formStatus}
                      onChange={(e: any) => setFormStatus(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-[#DED3C8] rounded-xl font-bold text-emerald-700"
                    >
                      <option value="ACTIVE">ACTIVE (Đã duyệt)</option>
                      <option value="DRAFT">DRAFT (Chờ duyệt)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#8C7B70] font-bold mb-1">Nội dung câu hỏi (Prompt)</label>
                  <textarea
                    rows={2}
                    value={formPrompt}
                    onChange={(e) => setFormPrompt(e.target.value)}
                    required
                    className="w-full p-3 bg-gray-50 border border-[#DED3C8] rounded-xl font-bold"
                    placeholder="Nhập nội dung câu hỏi..."
                  />
                </div>

                {formType === "LISTENING" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#8C7B70] font-bold mb-1">Phát âm Tiếng Nhật (Audio Text)</label>
                      <input
                        type="text"
                        value={formAudioText}
                        onChange={(e) => setFormAudioText(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-[#DED3C8] rounded-xl"
                        placeholder="VD: わたし"
                      />
                    </div>
                    <div>
                      <label className="block text-[#8C7B70] font-bold mb-1">Transcript (Hiển thị xem lại)</label>
                      <input
                        type="text"
                        value={formTranscript}
                        onChange={(e) => setFormTranscript(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-[#DED3C8] rounded-xl"
                        placeholder="VD: 私 (わたし) : Tôi"
                      />
                    </div>
                  </div>
                )}

                {formType === "TYPING" ? (
                  <div>
                    <label className="block text-[#8C7B70] font-bold mb-1">Danh sách đáp án gõ hợp lệ (JSON Array)</label>
                    <input
                      type="text"
                      value={formValidAnswers}
                      onChange={(e) => setFormValidAnswers(e.target.value)}
                      required
                      className="w-full p-3 bg-gray-50 border border-[#DED3C8] rounded-xl font-mono text-emerald-700"
                      placeholder='VD: ["こんにちは", "コンニチハ", "konnichiwa"]'
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="block text-[#8C7B70] font-bold">Lựa chọn đáp án (Đánh dấu 1 đáp án đúng)</label>
                    {formOptions.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correctOptionRadio"
                          checked={opt.isCorrect}
                          onChange={() => {
                            const newOpts = formOptions.map((o, i) => ({ ...o, isCorrect: i === oIdx }));
                            setFormOptions(newOpts);
                          }}
                          className="w-4 h-4 accent-[#C65D4B] cursor-pointer"
                        />
                        <input
                          type="text"
                          value={opt.optionText}
                          onChange={(e) => {
                            const newOpts = [...formOptions];
                            newOpts[oIdx].optionText = e.target.value;
                            setFormOptions(newOpts);
                          }}
                          required
                          className="flex-1 p-2.5 bg-gray-50 border border-[#DED3C8] rounded-xl"
                          placeholder={`Đáp án ${oIdx + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="block text-[#8C7B70] font-bold mb-1">Lời giải thích chi tiết</label>
                  <input
                    type="text"
                    value={formExplanation}
                    onChange={(e) => setFormExplanation(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-[#DED3C8] rounded-xl"
                    placeholder="VD: Từ vựng này có nghĩa là..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#DED3C8]">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#C65D4B] hover:bg-[#b54f3e] text-white rounded-xl font-extrabold cursor-pointer"
                  >
                    Lưu câu hỏi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
