"use client";

import { useState, useEffect } from "react";

interface LevelDto {
  levelId: number;
  code: string;
  name: string;
}

interface LessonDto {
  lessonId: number;
  title: string;
}

interface ImportJob {
  importJobId: number;
  fileName: string;
  fileType: string;
  status: string;
  totalRows: number;
  validRows: number;
  invalidRows: number;
  skippedRows: number;
  targetLevelId: number;
  targetLessonId: number;
}

interface ImportError {
  importErrorId: number;
  rowNumber: number;
  sheetName: string;
  columnName: string;
  fieldName?: string;
  reasonCode: string;
  message: string;
}

export default function AdminImportPage() {
  const [levels, setLevels] = useState<LevelDto[]>([]);
  const [lessons, setLessons] = useState<LessonDto[]>([]);
  const [selectedLevelId, setSelectedLevelId] = useState<string>("");
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");
  const [fileType, setFileType] = useState<string>("VOCABULARY");
  const [duplicateMode, setDuplicateMode] = useState<string>("SKIP");

  const [file, setFile] = useState<File | null>(null);
  const [job, setJob] = useState<ImportJob | null>(null);
  const [errors, setErrors] = useState<ImportError[]>([]);
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const getHeaders = () => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token") || "";
    return {
      Authorization: `Bearer ${token}`
    };
  };

  useEffect(() => {
    fetch("/api/v1/curriculum/levels", { headers: getHeaders() })
      .then((res) => res.json())
      .then((data) => setLevels(Array.isArray(data) ? data : []))
      .catch(() => setLevels([]));
  }, []);

  useEffect(() => {
    if (!selectedLevelId) {
      setLessons([]);
      setSelectedLessonId("");
      return;
    }
    fetch(`/api/v1/curriculum/levels/${selectedLevelId}/lessons`, { headers: getHeaders() })
      .then((res) => res.json())
      .then((data) => setLessons(Array.isArray(data) ? data : []))
      .catch(() => setLessons([]));
  }, [selectedLevelId]);

  const handleDownloadTemplate = async () => {
    try {
      const res = await fetch(`/api/v1/admin/import-templates/${fileType}`, {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Không thể tải file mẫu.");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mau_import_${fileType.toLowerCase()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err: unknown) {
      setMsg("❌ " + (err instanceof Error ? err.message : "Đã xảy ra lỗi"));
    }
  };

  const handleUpload = async () => {
    if (!file || !selectedLevelId || !selectedLessonId) return;
    setLoading(true);
    setMsg("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", fileType);
      formData.append("targetLevelId", selectedLevelId);
      formData.append("targetLessonId", selectedLessonId);
      formData.append("duplicateMode", duplicateMode);

      const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token") || "";
      const res = await fetch("/api/v1/admin/import-jobs", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Tải tệp lên thất bại.");
      }

      const createdJob = await res.json();
      setJob(createdJob);
      setStep(2);
      setMsg("✅ Tải tệp thành công! Vui lòng bấm Kiểm tra dữ liệu.");
    } catch (err: unknown) {
      setMsg("❌ " + (err instanceof Error ? err.message : "Đã xảy ra lỗi"));
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async () => {
    if (!job) return;
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch(`/api/v1/admin/import-jobs/${job.importJobId}/validate`, {
        method: "POST",
        headers: getHeaders()
      });

      if (!res.ok) throw new Error("Kiểm tra validation thất bại.");
      const validatedJob = await res.json();
      setJob(validatedJob);

      if (validatedJob.invalidRows > 0) {
        const errRes = await fetch(`/api/v1/admin/import-jobs/${job.importJobId}/errors?page=0&size=50`, {
          headers: getHeaders()
        });
        const errData = await errRes.json();
        setErrors(errData.content || []);
      } else {
        setErrors([]);
      }
      setStep(3);
    } catch (err: unknown) {
      setMsg("❌ " + (err instanceof Error ? err.message : "Đã xảy ra lỗi"));
    } finally {
      setLoading(false);
    }
  };

  const handleCommit = async () => {
    if (!job) return;
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch(`/api/v1/admin/import-jobs/${job.importJobId}/commit`, {
        method: "POST",
        headers: getHeaders()
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Commit dữ liệu thất bại.");
      }

      const committedJob = await res.json();
      setJob(committedJob);
      setStep(4);
      setMsg("🎉 Nhập dữ liệu thành công theo quy tắc Strict All-or-Nothing!");
    } catch (err: unknown) {
      setMsg("❌ " + (err instanceof Error ? err.message : "Đã xảy ra lỗi"));
    } finally {
      setLoading(false);
    }
  };

  const stepsList = [
    { num: 1, title: "Chọn Mục Tiêu & Tệp" },
    { num: 2, title: "Validation 2 Tầng" },
    { num: 3, title: "Xác Nhận Commit" },
    { num: 4, title: "Hoàn Tất Import" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-8">
      {/* Executive Hero Banner */}
      <div className="bg-gradient-to-r from-[#2C2421] via-[#3D332D] to-[#4A3B34] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-[#3D332D]">
        <div className="space-y-2 z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#C65D4B]/20 border border-[#C65D4B]/40 px-3.5 py-1 rounded-full text-[11px] font-bold text-[#FFD0C7]">
            <span className="w-2 h-2 rounded-full bg-[#C65D4B] animate-pulse" />
            STRICT EXCEL IMPORT ENGINE • CHUẨN BR-IMP-01 ~ BR-IMP-08
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <span>📥</span> Nạp Học Liệu Bằng Tệp Excel
          </h1>
          <p className="text-xs sm:text-sm text-[#D9CEB2] font-medium leading-relaxed">
            Hệ thống kiểm định 2 tầng tự động (Tầng 1: Cấu trúc &amp; Metadata | Tầng 2: Chi tiết dòng &amp; Logic toàn vẹn) đảm bảo dữ liệu chuẩn xác tuyệt đối trước khi nạp vào CSDL.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 bg-[#332A24]/70 border border-[#4A3B34] p-4 rounded-2xl backdrop-blur-sm shadow-inner">
          <div className="w-12 h-12 rounded-xl bg-[#C65D4B] text-white flex items-center justify-center text-2xl font-black shadow-md">
            📊
          </div>
          <div className="text-left space-y-0.5">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Strict All-or-Nothing</p>
            <p className="text-[11px] text-[#D9CEB2]">100% An Toàn Dữ Liệu</p>
          </div>
        </div>
      </div>

      {/* System Notification Toast */}
      {msg && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-3 shadow-sm ${msg.startsWith("✅") || msg.startsWith("🎉") ? "bg-emerald-50 text-emerald-900 border border-emerald-200" : "bg-rose-50 text-rose-900 border border-rose-200"}`}>
          <span className="text-base">{msg.startsWith("✅") || msg.startsWith("🎉") ? "✨" : "⚠️"}</span>
          <span>{msg}</span>
        </div>
      )}

      {/* Interactive Process Stepper */}
      <div className="bg-[#FFFCF7] p-4 rounded-2xl border border-[#E4D9CD] shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {stepsList.map((st) => {
            const isActive = step === st.num;
            const isDone = step > st.num;
            return (
              <div
                key={st.num}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                  isActive
                    ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-md scale-[1.02]"
                    : isDone
                    ? "bg-[#FAF3EB] text-[#8B6F5A] border-[#E4D9CD] font-bold"
                    : "bg-white text-[#76685F] border-[#E4D9CD]"
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg text-xs font-extrabold flex items-center justify-center ${
                    isActive
                      ? "bg-white text-[#C65D4B]"
                      : isDone
                      ? "bg-[#8B6F5A] text-white"
                      : "bg-[#FAF3EB] text-[#76685F]"
                  }`}
                >
                  {isDone ? "✓" : st.num}
                </span>
                <span className="text-xs font-bold truncate">{st.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: TARGET CONFIGURATION & UPLOAD */}
      {step === 1 && (
        <div className="bg-[#FFFCF7] p-8 rounded-3xl border border-[#E4D9CD] space-y-8 shadow-sm">
          {/* Section A: Selection Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4D9CD] pb-3">
              <h2 className="text-sm font-extrabold text-[#332A24] uppercase tracking-wider flex items-center gap-2">
                <span>🎯</span> 1. Thiết Lập Bài Học &amp; Loại Học Liệu Mục Tiêu
              </h2>
              <button
                onClick={handleDownloadTemplate}
                className="px-4 py-2 text-xs font-bold text-[#8B6F5A] bg-[#FAF3EB] hover:bg-[#E4D9CD] border border-[#E4D9CD] rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                <span>📄</span> Tải Tệp Excel Mẫu (.xlsx)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-[#76685F] mb-1.5">
                  Trình Độ (Level) *
                </label>
                <select
                  value={selectedLevelId}
                  onChange={(e) => setSelectedLevelId(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] font-semibold focus:outline-none focus:border-[#8B6F5A] shadow-xs"
                >
                  <option value="">-- Chọn Trình độ (N5 - N1) --</option>
                  {levels.map((lvl) => (
                    <option key={lvl.levelId} value={lvl.levelId}>
                      {lvl.code} - {lvl.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-[#76685F] mb-1.5">
                  Bài Học (Lesson) *
                </label>
                <select
                  value={selectedLessonId}
                  onChange={(e) => setSelectedLessonId(e.target.value)}
                  disabled={!selectedLevelId}
                  className="w-full px-4 py-3 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] font-semibold focus:outline-none focus:border-[#8B6F5A] disabled:opacity-50 shadow-xs"
                >
                  <option value="">-- Chọn Bài học --</option>
                  {lessons.map((les) => (
                    <option key={les.lessonId} value={les.lessonId}>
                      {les.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-[#76685F] mb-1.5">
                  Loại Học Liệu *
                </label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] font-semibold focus:outline-none focus:border-[#8B6F5A] shadow-xs"
                >
                  <option value="VOCABULARY">Từ vựng (Vocabulary)</option>
                  <option value="KANJI">Hán tự (Kanji)</option>
                  <option value="GRAMMAR">Ngữ pháp (Grammar Points)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-[#76685F] mb-1.5">
                  Xử Lý Trùng Lặp (Duplicate Mode) *
                </label>
                <select
                  value={duplicateMode}
                  onChange={(e) => setDuplicateMode(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#E4D9CD] rounded-xl text-xs text-[#332A24] font-semibold focus:outline-none focus:border-[#8B6F5A] shadow-xs"
                >
                  <option value="SKIP">Bỏ qua bản ghi trùng (SKIP - Khuyên dùng)</option>
                  <option value="UPDATE">Cập nhật thông tin bản ghi (UPDATE)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section B: File Dropzone */}
          <div className="space-y-4">
            <div className="border-b border-[#E4D9CD] pb-2">
              <h2 className="text-sm font-extrabold text-[#332A24] uppercase tracking-wider flex items-center gap-2">
                <span>📂</span> 2. Tải Tệp Excel Lên Hệ Thống
              </h2>
            </div>

            <div className="border-2 border-dashed border-[#E4D9CD] bg-[#FAF3EB]/50 hover:bg-[#FAF3EB] rounded-3xl p-10 text-center space-y-4 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-white border border-[#E4D9CD] text-[#C65D4B] text-3xl font-bold flex items-center justify-center mx-auto shadow-sm">
                📁
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#332A24]">
                  {file ? `📎 Tệp đã chọn: ${file.name}` : "Kéo & thả tệp Excel vào đây, hoặc bấm để chọn tệp"}
                </p>
                <p className="text-xs text-[#76685F]">
                  Chấp nhận định dạng <strong>.xlsx</strong> (Dung lượng tối đa 10 MB, tối đa 1.000 dòng dữ liệu).
                </p>
              </div>

              <input
                type="file"
                accept=".xlsx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="excel-file-input"
              />
              <label
                htmlFor="excel-file-input"
                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-white text-[#332A24] border border-[#E4D9CD] font-bold text-xs rounded-xl hover:bg-[#FAF3EB] shadow-sm transition-all"
              >
                <span>🔍 Duyệt Tệp Trên Máy</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={loading || !file || !selectedLevelId || !selectedLessonId}
            className="w-full py-4 bg-[#C65D4B] hover:bg-[#b04f3f] text-white font-extrabold text-xs rounded-2xl disabled:opacity-50 transition-all shadow-md tracking-wider uppercase"
          >
            {loading ? "⌛ Đang Tải Tệp Lên & Khởi Tạo Job..." : "🚀 Tải Tệp Lên & Bắt Đầu Validation 2 Tầng"}
          </button>
        </div>
      )}

      {/* STEP 2: VALIDATION CONFIRMATION */}
      {step === 2 && job && (
        <div className="bg-[#FFFCF7] p-8 rounded-3xl border border-[#E4D9CD] space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-[#332A24] flex items-center gap-2">
            <span>✨</span> Tệp Excel Đã Upload Thành Công
          </h2>
          <div className="text-xs text-[#76685F] space-y-2 bg-[#FAF3EB] p-5 rounded-2xl border border-[#E4D9CD]">
            <p><strong>Mã Job Import:</strong> #{job.importJobId}</p>
            <p><strong>Tên Tệp:</strong> {job.fileName}</p>
            <p><strong>Loại Học Liệu:</strong> {job.fileType}</p>
            <p><strong>Trạng Thái Job:</strong> <span className="font-mono font-bold text-[#C65D4B]">{job.status}</span></p>
          </div>
          <button
            onClick={handleValidate}
            disabled={loading}
            className="w-full py-4 bg-[#8B6F5A] hover:bg-[#775e4c] text-white font-extrabold text-xs rounded-2xl transition-all shadow-md tracking-wider uppercase"
          >
            {loading ? "⌛ Đang Kiểm Tra Validation 2 Tầng..." : "🔍 Chạy Validation Tầng 1 & Tầng 2 Ngay"}
          </button>
        </div>
      )}

      {/* STEP 3: PREVIEW METRICS & COMMIT */}
      {step === 3 && job && (
        <div className="bg-[#FFFCF7] p-8 rounded-3xl border border-[#E4D9CD] space-y-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-[#FAF3EB] p-5 rounded-2xl border border-[#E4D9CD]">
              <div className="text-[10px] uppercase text-[#76685F] font-extrabold tracking-wider">Tổng Dòng Dữ Liệu</div>
              <div className="text-3xl font-black text-[#332A24] mt-1">{job.totalRows}</div>
            </div>
            <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
              <div className="text-[10px] uppercase text-emerald-800 font-extrabold tracking-wider">Dòng Hợp Lệ</div>
              <div className="text-3xl font-black text-emerald-700 mt-1">{job.validRows}</div>
            </div>
            <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
              <div className="text-[10px] uppercase text-amber-800 font-extrabold tracking-wider">Bỏ Qua (Duplicate)</div>
              <div className="text-3xl font-black text-amber-700 mt-1">{job.skippedRows}</div>
            </div>
            <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200">
              <div className="text-[10px] uppercase text-rose-800 font-extrabold tracking-wider">Dòng Vi Phạm Lỗi</div>
              <div className="text-3xl font-black text-rose-700 mt-1">{job.invalidRows}</div>
            </div>
          </div>

          {job.invalidRows > 0 ? (
            <div className="space-y-6">
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl text-xs font-semibold">
                ⚠️ Tệp Excel chứa {job.invalidRows} dòng vi phạm quy tắc validation. Theo quy định <strong>Strict All-or-Nothing (BR-IMP-06)</strong>, bạn không thể Commit tệp khi còn lỗi. Vui lòng sửa lại tệp Excel và tải lên lại.
              </div>

              <div className="overflow-x-auto border border-[#E4D9CD] rounded-2xl shadow-xs">
                <table className="w-full text-xs text-left text-[#332A24]">
                  <thead className="bg-[#FAF3EB] text-[#76685F] uppercase text-[10px] font-extrabold border-b border-[#E4D9CD]">
                    <tr>
                      <th className="p-3.5">Dòng</th>
                      <th className="p-3.5">Sheet</th>
                      <th className="p-3.5">Cột</th>
                      <th className="p-3.5">Trường Field</th>
                      <th className="p-3.5">Mã Lỗi Reason</th>
                      <th className="p-3.5">Chi Tiết Lỗi Validation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {errors.map((err) => (
                      <tr key={err.importErrorId} className="border-t border-[#E4D9CD]/50 hover:bg-[#FAF3EB]/50">
                        <td className="p-3.5 font-bold text-rose-600">Dòng #{err.rowNumber}</td>
                        <td className="p-3.5">{err.sheetName}</td>
                        <td className="p-3.5">{err.columnName || "-"}</td>
                        <td className="p-3.5 font-mono">{err.fieldName || "-"}</td>
                        <td className="p-3.5 font-mono text-[10px] bg-rose-50 text-rose-700 px-2.5 py-1 rounded-lg border border-rose-200 font-bold">{err.reasonCode}</td>
                        <td className="p-3.5">{err.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => setStep(1)}
                className="w-full py-4 bg-[#8B6F5A] text-white font-extrabold text-xs rounded-2xl hover:bg-[#775e4c] transition-all shadow-md uppercase tracking-wider"
              >
                ↩️ Chọn Tệp Khác Đã Sửa Lỗi
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-5 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-2xl text-xs font-semibold leading-relaxed">
                ✨ Tệp Excel đã vượt qua tất cả các tầng kiểm tra Validation! Sẵn sàng Commit {job.validRows} dòng học liệu hợp lệ vào CSDL ở trạng thái DRAFT.
              </div>

              <button
                onClick={handleCommit}
                disabled={loading}
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-2xl transition-all shadow-lg uppercase tracking-wider"
              >
                {loading ? "⌛ Đang Ghi Dữ Liệu Vào CSDL..." : "🚀 Thực Hiện Commit All-or-Nothing Ngay"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: SUCCESS SUMMARY */}
      {step === 4 && job && (
        <div className="bg-[#FFFCF7] p-10 rounded-3xl border border-emerald-200 text-center space-y-6 shadow-md">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-4xl font-black shadow-inner">
            ✓
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-[#332A24]">Nạp Học Liệu Thành Công!</h2>
            <p className="text-xs text-[#76685F] max-w-md mx-auto">
              Toàn bộ học liệu đã được lưu vào Bài học ở trạng thái <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">DRAFT</span> sẵn sàng cho biên tập và xuất bản.
            </p>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={() => { setStep(1); setFile(null); setJob(null); setMsg(""); }}
              className="px-6 py-3 bg-[#FAF3EB] border border-[#E4D9CD] text-[#332A24] font-bold text-xs rounded-2xl hover:bg-[#E4D9CD] shadow-xs"
            >
              📥 Import Thêm Tệp Khác
            </button>
            <a
              href={`/admin/curriculum/lessons/${selectedLessonId}/content`}
              className="px-6 py-3 bg-[#C65D4B] text-white font-bold text-xs rounded-2xl hover:bg-[#b04f3f] shadow-md"
            >
              📖 Xem Chi Tiết Học Liệu Bài Học
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
