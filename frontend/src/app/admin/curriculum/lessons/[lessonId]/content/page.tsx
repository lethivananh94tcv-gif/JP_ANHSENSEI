"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

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

export default function AdminLessonContentPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;

  const [activeTab, setActiveTab] = useState<"vocab" | "kanji" | "grammar">("vocab");
  const [error, setError] = useState("");
  const [seeding, setSeeding] = useState(false);

  // Data states
  const [vocabularies, setVocabularies] = useState<VocabularyDto[]>([]);
  const [kanjis, setKanjis] = useState<LessonKanjiDto[]>([]);
  const [grammars, setGrammars] = useState<GrammarPointDto[]>([]);

  // Modals
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
  const [gJlpt] = useState("N5");

  const [exJp, setExJp] = useState("");
  const [exFuri, setExFuri] = useState("");
  const [exVi, setExVi] = useState("");

  const fetchContent = useCallback(async () => {
    try {
      setError("");
      const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");

      const [vRes, kRes, gRes] = await Promise.all([
        fetch(`http://localhost:8080/api/v1/admin/lessons/${lessonId}/vocabularies`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`http://localhost:8080/api/v1/admin/lessons/${lessonId}/kanji`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`http://localhost:8080/api/v1/admin/lessons/${lessonId}/grammar`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (vRes.ok) setVocabularies(await vRes.json());
      if (kRes.ok) setKanjis(await kRes.json());
      if (gRes.ok) setGrammars(await gRes.json());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải nội dung bài học.");
    }
  }, [lessonId]);

  useEffect(() => {
    if (lessonId) fetchContent();
  }, [lessonId, fetchContent]);

  // Seed Sample Demo Content
  const handleSeedSampleContent = async () => {
    setSeeding(true);
    setError("");
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
    const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

    try {
      // 1. Add Sample Vocabularies
      const sampleVocabs = [
        { word: "私", kana: "わたし", kanjiForm: "私", meaningVi: "Tôi", partOfSpeech: "Danh từ", sortOrder: 1 },
        { word: "先生", kana: "せんせい", kanjiForm: "先生", meaningVi: "Thầy/Cô giáo", partOfSpeech: "Danh từ", sortOrder: 2 },
        { word: "学生", kana: "がくせい", kanjiForm: "学生", meaningVi: "Học sinh, sinh viên", partOfSpeech: "Danh từ", sortOrder: 3 },
      ];

      for (const v of sampleVocabs) {
        await fetch(`http://localhost:8080/api/v1/admin/lessons/${lessonId}/vocabularies`, {
          method: "POST",
          headers,
          body: JSON.stringify(v),
        });
      }

      // 2. Add Sample Kanji
      const sampleKanjis = [
        { character: "日", onyomi: "ニチ, ジツ", kunyomi: "hi, ka", meaningVi: "Mặt trời, ngày", strokeCount: 4 },
        { character: "本", onyomi: "ホン", kunyomi: "moto", meaningVi: "Gốc, sách, Nhật Bản", strokeCount: 5 },
      ];

      for (const k of sampleKanjis) {
        const kRes = await fetch("http://localhost:8080/api/v1/admin/kanji", {
          method: "POST",
          headers,
          body: JSON.stringify({ ...k, jlptLevel: "N5" }),
        });
        if (kRes.ok) {
          const created = await kRes.json();
          await fetch(`http://localhost:8080/api/v1/admin/lessons/${lessonId}/kanji`, {
            method: "POST",
            headers,
            body: JSON.stringify({ kanjiId: created.kanjiId, sortOrder: 1 }),
          });
        }
      }

      // 3. Add Sample Grammar
      await fetch(`http://localhost:8080/api/v1/admin/lessons/${lessonId}/grammar`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          pattern: "～は～です",
          meaning: "N1 là N2",
          explanation: "Mẫu câu khẳng định cơ bản trong tiếng Nhật dùng để giới thiệu tên, nghề nghiệp hoặc quốc tịch.",
          jlptLevel: "N5",
          sortOrder: 1,
          examples: [
            { japaneseText: "わたしはたなかです。", reading: "Watashi wa Tanaka desu.", meaningVi: "Tôi là Tanaka.", sortOrder: 1 },
          ],
        }),
      });

      fetchContent();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Lỗi nạp dữ liệu mẫu.");
    } finally {
      setSeeding(false);
    }
  };

  // Handle Add Vocabulary
  const handleAddVocab = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
    try {
      const res = await fetch(`http://localhost:8080/api/v1/admin/lessons/${lessonId}/vocabularies`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          word: vWord,
          kana: vKana,
          kanjiForm: vKanjiForm,
          meaningVi: vMeaning,
          partOfSpeech: vPartOfSpeech,
          sortOrder: vocabularies.length + 1,
        }),
      });
      if (!res.ok) throw new Error("Lỗi khi thêm từ vựng.");
      setShowVocabModal(false);
      setVWord(""); setVKana(""); setVKanjiForm(""); setVMeaning("");
      fetchContent();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Lỗi thêm từ vựng");
    }
  };

  // Handle Create Kanji & Link to Lesson
  const handleAddKanji = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
    try {
      const kRes = await fetch("http://localhost:8080/api/v1/admin/kanji", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          character: kChar,
          onyomi: kOnyomi,
          kunyomi: kKunyomi,
          meaningVi: kMeaning,
          strokeCount: kStrokes,
          jlptLevel: "N5",
        }),
      });
      if (!kRes.ok) {
        const body = await kRes.json().catch(() => ({}));
        throw new Error(body.message || "Lỗi khi tạo Kanji master.");
      }
      const createdKanji = await kRes.json();

      await fetch(`http://localhost:8080/api/v1/admin/lessons/${lessonId}/kanji`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          kanjiId: createdKanji.kanjiId,
          sortOrder: kanjis.length + 1,
        }),
      });

      setShowKanjiModal(false);
      setKChar(""); setKOnyomi(""); setKKunyomi(""); setKMeaning("");
      fetchContent();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Lỗi tạo Kanji");
    }
  };

  // Handle Add Grammar Point
  const handleAddGrammar = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
    try {
      const res = await fetch(`http://localhost:8080/api/v1/admin/lessons/${lessonId}/grammar`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          pattern: gPattern,
          meaning: gMeaning,
          explanation: gExplanation,
          jlptLevel: gJlpt,
          sortOrder: grammars.length + 1,
          examples: exJp ? [{ japaneseText: exJp, reading: exFuri, meaningVi: exVi, sortOrder: 1 }] : [],
        }),
      });
      if (!res.ok) throw new Error("Lỗi khi thêm ngữ pháp.");
      setShowGrammarModal(false);
      setGPattern(""); setGMeaning(""); setGExplanation(""); setExJp(""); setExFuri(""); setExVi("");
      fetchContent();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Lỗi thêm ngữ pháp");
    }
  };

  // Publish Item Helper
  const handlePublishItem = async (type: "vocabularies" | "kanji" | "grammar", id: number) => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
    try {
      const res = await fetch(`http://localhost:8080/api/v1/admin/${type}/${id}/publish`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Lỗi khi xuất bản mục này.");
      fetchContent();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Lỗi xuất bản");
    }
  };

  return (
    <div className="p-8 text-[#2C2421]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6E5E52]">
          <Link href="/admin/curriculum" className="hover:text-[#C65D4B] transition-colors">
            ← Trình Độ
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#2C2421]">Quản Lý Nội Dung Bài Học #{lessonId}</span>
        </div>

        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EFE9E1] flex flex-wrap gap-4 justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-[#C65D4B]">Quản Lý Học Liệu Chi Tiết</h1>
            <p className="text-sm text-[#6E5E52] mt-1">Thêm Vocabulary, Kanji &amp; GrammarPoint cho Bài học ID #{lessonId}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSeedSampleContent}
              disabled={seeding}
              className="bg-[#2C2421] hover:bg-[#3D332D] text-white font-bold px-4 py-2 rounded-xl text-sm shadow-md transition-colors flex items-center gap-1.5"
            >
              <span>{seeding ? "Đang nạp..." : "⚡ Nạp Học Liệu Mẫu (Demo)"}</span>
            </button>
            {activeTab === "vocab" && (
              <button onClick={() => setShowVocabModal(true)} className="bg-[#C65D4B] hover:bg-[#b04f3f] text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-md">
                + Thêm Từ Vựng
              </button>
            )}
            {activeTab === "kanji" && (
              <button onClick={() => setShowKanjiModal(true)} className="bg-[#C65D4B] hover:bg-[#b04f3f] text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-md">
                + Tạo &amp; Thêm Kanji
              </button>
            )}
            {activeTab === "grammar" && (
              <button onClick={() => setShowGrammarModal(true)} className="bg-[#C65D4B] hover:bg-[#b04f3f] text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-md">
                + Thêm Ngữ Pháp
              </button>
            )}
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#EFE9E1] space-x-4">
          <button
            onClick={() => setActiveTab("vocab")}
            className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all ${
              activeTab === "vocab" ? "border-[#C65D4B] text-[#C65D4B]" : "border-transparent text-[#6E5E52]"
            }`}
          >
            📖 Từ Vựng ({vocabularies.length})
          </button>
          <button
            onClick={() => setActiveTab("kanji")}
            className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all ${
              activeTab === "kanji" ? "border-[#C65D4B] text-[#C65D4B]" : "border-transparent text-[#6E5E52]"
            }`}
          >
            漢 Hán Tự ({kanjis.length})
          </button>
          <button
            onClick={() => setActiveTab("grammar")}
            className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all ${
              activeTab === "grammar" ? "border-[#C65D4B] text-[#C65D4B]" : "border-transparent text-[#6E5E52]"
            }`}
          >
            ⛩️ Ngữ Pháp ({grammars.length})
          </button>
        </div>

        {/* Tab 1: Vocabulary */}
        {activeTab === "vocab" && (
          <div className="bg-white rounded-2xl border border-[#EFE9E1] overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF3EB] text-[#6E5E52] font-semibold border-b border-[#EFE9E1]">
                <tr>
                  <th className="p-4">Từ vựng (Word)</th>
                  <th className="p-4">Kana</th>
                  <th className="p-4">Nghĩa tiếng Việt</th>
                  <th className="p-4">Loại từ</th>
                  <th className="p-4 text-center">Trạng Thái</th>
                  <th className="p-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5EFE9]">
                {vocabularies.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-[#6E5E52]">Chưa có từ vựng nào. Bấm &quot;⚡ Nạp Học Liệu Mẫu (Demo)&quot; để nạp nhanh!</td></tr>
                ) : (
                  vocabularies.map((v) => (
                    <tr key={v.vocabularyId} className="hover:bg-[#FCFA9]">
                      <td className="p-4 font-bold text-lg text-[#C65D4B]">{v.word}</td>
                      <td className="p-4 font-medium text-[#2C2421]">{v.kana}</td>
                      <td className="p-4 font-medium">{v.meaningVi}</td>
                      <td className="p-4 text-xs text-[#8C7B70]">{v.partOfSpeech || "-"}</td>
                      <td className="p-4 text-center">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${v.status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {v.status !== "PUBLISHED" && (
                          <button onClick={() => handlePublishItem("vocabularies", v.vocabularyId)} className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-lg border border-green-200 hover:bg-green-100 font-semibold">
                            Publish
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Kanji */}
        {activeTab === "kanji" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kanjis.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl p-12 text-center text-[#6E5E52] border border-[#EFE9E1]">
                Chưa có Hán tự nào. Bấm &quot;⚡ Nạp Học Liệu Mẫu (Demo)&quot; để nạp nhanh!
              </div>
            ) : (
              kanjis.map((k) => (
                <div key={k.kanjiId} className="bg-white rounded-2xl border border-[#EFE9E1] p-6 shadow-sm flex gap-4">
                  <div className="w-16 h-16 bg-[#FAF3EB] border border-[#F2E3D5] rounded-2xl flex items-center justify-center text-3xl font-extrabold text-[#C65D4B]">
                    {k.character}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-[#2C2421]">{k.meaningVi}</h4>
                    <p className="text-xs text-[#6E5E52]">Onyomi: {k.onyomi || "-"}</p>
                    <p className="text-xs text-[#6E5E52]">Kunyomi: {k.kunyomi || "-"}</p>
                    <p className="text-xs text-[#8C7B70]">Số nét: {k.strokeCount || "-"}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Grammar */}
        {activeTab === "grammar" && (
          <div className="space-y-4">
            {grammars.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-[#6E5E52] border border-[#EFE9E1]">
                Chưa có ngữ pháp nào. Bấm &quot;⚡ Nạp Học Liệu Mẫu (Demo)&quot; để nạp nhanh!
              </div>
            ) : (
              grammars.map((g) => (
                <div key={g.grammarId} className="bg-white rounded-2xl border border-[#EFE9E1] p-6 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-[#C65D4B] bg-[#FAF3EB] px-2.5 py-1 rounded-md border border-[#F2E3D5] mr-2">
                        {g.jlptLevel}
                      </span>
                      <span className="text-xl font-bold text-[#2C2421]">{g.pattern}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${g.status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                        {g.status}
                      </span>
                      {g.status !== "PUBLISHED" && (
                        <button onClick={() => handlePublishItem("grammar", g.grammarId)} className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-lg border border-green-200 hover:bg-green-100 font-semibold">
                          Publish
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-[#6E5E52]">Ý nghĩa: {g.meaning}</p>
                  <p className="text-xs text-[#8C7B70] bg-gray-50 p-3 rounded-xl border border-gray-100">{g.explanation}</p>

                  {/* Examples */}
                  <div className="mt-3 pt-3 border-t border-[#F5EFE9]">
                    <h5 className="text-xs font-bold text-[#6E5E52] mb-2">Ví Dụ Minh Họa:</h5>
                    {g.examples && g.examples.length > 0 ? (
                      <div className="space-y-2">
                        {g.examples.map((ex) => (
                          <div key={ex.exampleId} className="text-xs bg-[#FAF3EB]/50 p-2.5 rounded-lg border border-[#F2E3D5]">
                            <p className="font-bold text-[#2C2421]">{ex.japaneseText}</p>
                            <p className="text-gray-500 italic">{ex.reading}</p>
                            <p className="text-[#C65D4B] font-medium mt-0.5">➔ {ex.meaningVi}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">Chưa có câu ví dụ.</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal Add Vocab */}
        {showVocabModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <form onSubmit={handleAddVocab} className="bg-[#FFFCF7] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-3 border border-[#E4D9CD]">
              <h3 className="text-lg font-bold text-[#C65D4B]">Thêm Từ Vựng Mới</h3>
              <input required placeholder="Từ vựng (Ví dụ: 私)" value={vWord} onChange={(e) => setVWord(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] focus:outline-none focus:border-[#8B6F5A]" />
              <input required placeholder="Cách đọc Kana (Ví dụ: わたし)" value={vKana} onChange={(e) => setVKana(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] focus:outline-none focus:border-[#8B6F5A]" />
              <input placeholder="Hán tự gốc (Ví dụ: 私)" value={vKanjiForm} onChange={(e) => setVKanjiForm(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] focus:outline-none focus:border-[#8B6F5A]" />
              <input required placeholder="Nghĩa tiếng Việt (Ví dụ: Tôi)" value={vMeaning} onChange={(e) => setVMeaning(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] focus:outline-none focus:border-[#8B6F5A]" />
              <input placeholder="Loại từ (Ví dụ: Danh từ)" value={vPartOfSpeech} onChange={(e) => setVPartOfSpeech(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] focus:outline-none focus:border-[#8B6F5A]" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowVocabModal(false)} className="flex-1 py-2.5 bg-[#FAF3EB] border border-[#E4D9CD] rounded-xl text-xs font-bold text-[#76685F] hover:bg-[#E4D9CD]">Hủy</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#C65D4B] hover:bg-[#b04f3f] text-white rounded-xl text-xs font-bold shadow-sm">Lưu Từ Vựng</button>
              </div>
            </form>
          </div>
        )}

        {/* Modal Add Kanji */}
        {showKanjiModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <form onSubmit={handleAddKanji} className="bg-[#FFFCF7] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-3 border border-[#E4D9CD]">
              <h3 className="text-lg font-bold text-[#C65D4B]">Tạo &amp; Thêm Kanji Vào Bài Học</h3>
              <input required placeholder="Ký tự Kanji (Ví dụ: 日)" value={kChar} onChange={(e) => setKChar(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] focus:outline-none focus:border-[#8B6F5A]" />
              <input placeholder="Onyomi (Ví dụ: ニチ, JITSU)" value={kOnyomi} onChange={(e) => setKOnyomi(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] focus:outline-none focus:border-[#8B6F5A]" />
              <input placeholder="Kunyomi (Ví dụ: hi, ka)" value={kKunyomi} onChange={(e) => setKKunyomi(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] focus:outline-none focus:border-[#8B6F5A]" />
              <input required placeholder="Nghĩa tiếng Việt (Ví dụ: Mặt trời, ngày)" value={kMeaning} onChange={(e) => setKMeaning(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] focus:outline-none focus:border-[#8B6F5A]" />
              <input type="number" min={1} placeholder="Số nét vẽ" value={kStrokes} onChange={(e) => setKStrokes(parseInt(e.target.value) || 4)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] focus:outline-none focus:border-[#8B6F5A]" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowKanjiModal(false)} className="flex-1 py-2.5 bg-[#FAF3EB] border border-[#E4D9CD] rounded-xl text-xs font-bold text-[#76685F] hover:bg-[#E4D9CD]">Hủy</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#C65D4B] hover:bg-[#b04f3f] text-white rounded-xl text-xs font-bold shadow-sm">Lưu Kanji</button>
              </div>
            </form>
          </div>
        )}

        {/* Modal Add Grammar */}
        {showGrammarModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <form onSubmit={handleAddGrammar} className="bg-[#FFFCF7] rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-3 border border-[#E4D9CD]">
              <h3 className="text-lg font-bold text-[#C65D4B]">Thêm Mẫu Ngữ Pháp Mới</h3>
              <input required placeholder="Mẫu ngữ pháp (Ví dụ: ～は～です)" value={gPattern} onChange={(e) => setGPattern(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] focus:outline-none focus:border-[#8B6F5A]" />
              <input required placeholder="Ý nghĩa (Ví dụ: N1 là N2)" value={gMeaning} onChange={(e) => setGMeaning(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] focus:outline-none focus:border-[#8B6F5A]" />
              <textarea required rows={2} placeholder="Giải thích chi tiết cách dùng..." value={gExplanation} onChange={(e) => setGExplanation(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] focus:outline-none focus:border-[#8B6F5A]" />
              
              <div className="border-t border-[#E4D9CD] pt-2">
                <p className="text-xs font-bold text-[#76685F] mb-1">Ví Dụ Đi Kèm (Tùy Chọn):</p>
                <input placeholder="Câu tiếng Nhật (Ví dụ: わたしはたなかです。)" value={exJp} onChange={(e) => setExJp(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] mb-1.5 focus:outline-none focus:border-[#8B6F5A]" />
                <input placeholder="Furigana/Phát âm" value={exFuri} onChange={(e) => setExFuri(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] mb-1.5 focus:outline-none focus:border-[#8B6F5A]" />
                <input placeholder="Nghĩa tiếng Việt (Ví dụ: Tôi là Tanaka.)" value={exVi} onChange={(e) => setExVi(e.target.value)} className="w-full p-2.5 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] mb-1.5 focus:outline-none focus:border-[#8B6F5A]" />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowGrammarModal(false)} className="flex-1 py-2.5 bg-[#FAF3EB] border border-[#E4D9CD] rounded-xl text-xs font-bold text-[#76685F] hover:bg-[#E4D9CD]">Hủy</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#C65D4B] hover:bg-[#b04f3f] text-white rounded-xl text-xs font-bold shadow-sm">Lưu Ngữ Pháp</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
