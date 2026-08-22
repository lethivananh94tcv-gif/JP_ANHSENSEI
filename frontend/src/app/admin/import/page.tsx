"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
  const [selectedLevelId, setSelectedLevelId] = useState<string>("1");
  const [selectedLessonId, setSelectedLessonId] = useState<string>("ALL");
  const [fileType, setFileType] = useState<string>("VOCABULARY");
  const [duplicateMode, setDuplicateMode] = useState<string>("OVERWRITE");

  const [file, setFile] = useState<File | null>(null);
  const [job, setJob] = useState<ImportJob | null>(null);
  const [errors, setErrors] = useState<ImportError[]>([]);
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const getHeaders = () => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token") || "";
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/curriculum/levels", { headers: getHeaders() })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLevels(data);
          setSelectedLevelId(String(data[0].levelId || "1"));
        }
      })
      .catch(() => setLevels([]));
  }, []);

  useEffect(() => {
    if (!selectedLevelId) {
      setLessons([]);
      return;
    }
    fetch(`http://localhost:8080/api/v1/curriculum/levels/${selectedLevelId}/lessons`, { headers: getHeaders() })
      .then((res) => res.json())
      .then((data) => setLessons(Array.isArray(data) ? data : []))
      .catch(() => setLessons([]));
  }, [selectedLevelId]);

  // GENERATE EXACT ORIGINAL EXCEL TEMPLATE DESIGN (#002060 NAVY HEADER, ROW 0 ITALIC NOTE)
  const handleDownloadTemplate = () => {
    const excelXml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="NoteStyle">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#1F497D" ss:Italic="1"/>
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
  </Style>
  <Style ss:ID="OriginalNavyHeader">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#FFFFFF" ss:Bold="1"/>
   <Interior ss:Color="#002060" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#001040"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF"/>
   </Borders>
  </Style>
  <Style ss:ID="DataStyle">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#000000"/>
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D9D9D9"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D9D9D9"/>
   </Borders>
  </Style>
 </Styles>
 <Worksheet ss:Name="Vocabularies">
  <Table ss:DefaultRowHeight="20">
   <Column ss:Width="110"/>
   <Column ss:Width="120"/>
   <Column ss:Width="140"/>
   <Column ss:Width="120"/>
   <Column ss:Width="180"/>
   <Column ss:Width="120"/>
   <Column ss:Width="160"/>
   <Column ss:Width="90"/>
   <Row ss:Height="22">
    <Cell ss:StyleID="NoteStyle"><Data ss:Type="String">MẪU IMPORT TỪ VỰNG (BR-IMP-02) - Phiên bản v1.0. Các cột có dấu (*) là bắt buộc.</Data></Cell>
   </Row>
   <Row ss:Height="26">
    <Cell ss:StyleID="OriginalNavyHeader"><Data ss:Type="String">LessonNumber</Data></Cell>
    <Cell ss:StyleID="OriginalNavyHeader"><Data ss:Type="String">Word (*)</Data></Cell>
    <Cell ss:StyleID="OriginalNavyHeader"><Data ss:Type="String">Kana (*)</Data></Cell>
    <Cell ss:StyleID="OriginalNavyHeader"><Data ss:Type="String">KanjiForm</Data></Cell>
    <Cell ss:StyleID="OriginalNavyHeader"><Data ss:Type="String">MeaningVi (*)</Data></Cell>
    <Cell ss:StyleID="OriginalNavyHeader"><Data ss:Type="String">PartOfSpeech</Data></Cell>
    <Cell ss:StyleID="OriginalNavyHeader"><Data ss:Type="String">Notes</Data></Cell>
    <Cell ss:StyleID="OriginalNavyHeader"><Data ss:Type="String">SortOrder</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="Number">1</Data></Cell>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="String">私</Data></Cell>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="String">わたし</Data></Cell>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="String">私</Data></Cell>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="String">Tôi</Data></Cell>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="String">Danh từ</Data></Cell>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="String">Ví dụ mẫu</Data></Cell>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="Number">1</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="Number">2</Data></Cell>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="String">これ</Data></Cell>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="String">これ</Data></Cell>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="String">-</Data></Cell>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="String">Cái này</Data></Cell>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="String">Chỉ định từ</Data></Cell>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="String"></Data></Cell>
    <Cell ss:StyleID="DataStyle"><Data ss:Type="Number">1</Data></Cell>
   </Row>
  </Table>
 </Worksheet>
</Workbook>`;

    const blob = new Blob([excelXml], { type: "application/vnd.ms-excel;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `mau_import_vocabulary_n5_n4.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = async () => {
    if (!file) {
      setMsg("❌ Vui lòng chọn tệp Excel trước khi Upload!");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("targetLevelId", selectedLevelId || "1");
      formData.append("targetLessonId", selectedLessonId === "ALL" ? "0" : (selectedLessonId || "0"));
      formData.append("fileType", fileType);
      formData.append("duplicateMode", duplicateMode);

      // Try Backend Spring Boot ImportJob Endpoints
      const endpoints = [
        "http://localhost:8080/admin/import-jobs",
        "http://localhost:8080/api/v1/admin/import-jobs",
        "/api/v1/admin/import-jobs"
      ];

      let createdJob = null;
      let lastErrText = "";

      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: getHeaders(),
            body: formData
          });

          if (res.ok) {
            createdJob = await res.json();
            const jobId = createdJob.importJobId || createdJob.id;
            
            // Validate Endpoint
            const valRes = await fetch(`${endpoint}/${jobId}/validate`, {
              method: "POST",
              headers: getHeaders()
            });

            if (valRes.ok) {
              const validatedJob = await valRes.json();
              setJob(validatedJob);
              setStep(2);
              setMsg(`✓ Đã phân tích thành công! Đã phát hiện ${validatedJob.totalRows || validatedJob.validRows} từ vựng từ tệp Excel.`);
              return;
            } else {
              lastErrText = await valRes.text();
            }
          } else {
            lastErrText = await res.text();
          }
        } catch (ignored) {}
      }

      if (lastErrText) {
        throw new Error(lastErrText);
      } else {
        throw new Error("Không thể kết nối tới Backend Máy chủ (http://localhost:8080). Vui lòng đảm bảo máy chủ Backend đang hoạt động.");
      }
    } catch (err: unknown) {
      setMsg("❌ Lỗi xử lý tệp: " + (err instanceof Error ? err.message : "Vui lòng thử lại"));
    } finally {
      setLoading(false);
    }
  };

  const handleCommit = async () => {
    try {
      setLoading(true);
      setMsg("");
      
      if (!job?.importJobId) {
        throw new Error("Không tìm thấy mã ImportJob hợp lệ.");
      }

      const commitEndpoints = [
        `http://localhost:8080/admin/import-jobs/${job.importJobId}/commit`,
        `http://localhost:8080/api/v1/admin/import-jobs/${job.importJobId}/commit`,
        `/api/v1/admin/import-jobs/${job.importJobId}/commit`
      ];

      let success = false;
      let errDetail = "";

      for (const ep of commitEndpoints) {
        try {
          const res = await fetch(ep, {
            method: "POST",
            headers: getHeaders(),
          });
          if (res.ok) {
            const committedJob = await res.json();
            setJob(committedJob);
            success = true;
            break;
          } else {
            errDetail = await res.text();
          }
        } catch (e) {}
      }

      if (success) {
        setStep(4);
        setMsg("🎉 Đã nạp thành công toàn bộ từ vựng vào cơ sở dữ liệu!");
      } else {
        throw new Error(errDetail || "Không thể thực hiện Commit dữ liệu tới máy chủ Backend.");
      }
    } catch (err: unknown) {
      setMsg("❌ Lỗi Nạp DB: " + (err instanceof Error ? err.message : "Vui lòng thử lại"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 sm:p-10 text-[#2C2421]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex justify-between items-center bg-[#FAF3EB] border border-[#DED3C8] px-6 py-4 rounded-2xl">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#C65D4B]">ADMIN PORTAL</span>
            <h1 className="text-2xl font-extrabold text-[#231917]">Strict Excel Import &amp; Auto Parser</h1>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-white hover:bg-[#C65D4B] border border-[#DED3C8] hover:border-[#C65D4B] text-[#56423E] hover:text-white font-extrabold text-xs rounded-xl transition-all shadow-2xs"
          >
            Quay lại Admin Portal
          </Link>
        </div>

        {/* 4 Steps Indicator */}
        <div className="grid grid-cols-4 gap-3 bg-white border border-[#DED3C8] p-4 rounded-2xl shadow-2xs">
          {[
            { n: 1, title: "1. Thiết Lập & Chọn Tệp" },
            { n: 2, title: "2. Validation Phân Tích" },
            { n: 3, title: "3. Xác Nhận Commit" },
            { n: 4, title: "4. Hoàn Tất Import" },
          ].map((st) => (
            <div
              key={st.n}
              className={`p-3 rounded-xl border text-center transition-all ${
                step === st.n
                  ? "bg-[#C65D4B] text-white border-[#C65D4B] font-extrabold shadow-xs"
                  : step > st.n
                  ? "bg-emerald-100 border-emerald-300 text-emerald-900 font-bold"
                  : "bg-[#FAF3EB] border-[#DED3C8] text-[#8B6F5A] font-medium"
              }`}
            >
              <span className="text-xs">{st.title}</span>
            </div>
          ))}
        </div>

        {/* Message Banner */}
        {msg && (
          <div className="p-4 bg-[#FAF3EB] border-l-4 border-[#C65D4B] text-[#C65D4B] rounded-2xl text-xs font-bold shadow-2xs">
            {msg}
          </div>
        )}

        {/* STEP 1: CONFIGURATION & FILE UPLOAD */}
        {step === 1 && (
          <div className="bg-white border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
            {/* 1. Target Configuration */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#DED3C8] pb-3">
                <h3 className="text-base font-extrabold text-[#C65D4B]">
                  🎯 1. THIẾT LẬP BÀI HỌC &amp; LOẠI HỌC LIỆU MỤC TIÊU
                </h3>
                <button
                  onClick={handleDownloadTemplate}
                  className="px-4 py-2 bg-[#002060] hover:bg-[#001040] text-white text-xs font-extrabold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  📊 Tải Tệp Excel Mẫu (.xlsx)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#56423E] mb-1">TRÌNH ĐỘ (LEVEL) *</label>
                  <select
                    value={selectedLevelId}
                    onChange={(e) => setSelectedLevelId(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#DED3C8] px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#231917]"
                  >
                    <option value="1">N5 - JLPT N5</option>
                    <option value="2">N4 - JLPT N4</option>
                    {levels.map((lvl) => (
                      <option key={lvl.levelId} value={lvl.levelId}>
                        {lvl.code} - {lvl.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#56423E] mb-1">BÀI HỌC (LESSON) *</label>
                  <select
                    value={selectedLessonId}
                    onChange={(e) => setSelectedLessonId(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#DED3C8] px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-[#C65D4B]"
                  >
                    <option value="ALL">✨ -- Tất cả bài học (Tự động đọc bài số từ File Excel) --</option>
                    {lessons.map((lsn) => (
                      <option key={lsn.lessonId} value={lsn.lessonId}>
                        {lsn.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#56423E] mb-1">LOẠI HỌC LIỆU *</label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#DED3C8] px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#231917]"
                  >
                    <option value="VOCABULARY">Từ vựng (Vocabulary)</option>
                    <option value="KANJI">Hán tự (Kanji)</option>
                    <option value="GRAMMAR">Ngữ pháp (Grammar)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#56423E] mb-1">XỬ LÝ TRÙNG LẶP (DUPLICATE MODE) *</label>
                  <select
                    value={duplicateMode}
                    onChange={(e) => setDuplicateMode(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#DED3C8] px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#231917]"
                  >
                    <option value="OVERWRITE">Ghi đè bản ghi cũ (OVERWRITE - Khuyên dùng)</option>
                    <option value="SKIP">Bỏ qua bản ghi trùng (SKIP)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. File Upload Dropzone */}
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-[#C65D4B] border-b border-[#DED3C8] pb-3">
                📂 2. TẢI TỆP EXCEL LÊN HỆ THỐNG
              </h3>

              <div className="border-2 border-dashed border-[#DED3C8] rounded-3xl p-10 text-center bg-[#FAF3EB]/50 hover:bg-[#FAF3EB] transition-all space-y-4">
                <span className="text-5xl">📁</span>
                <div>
                  <p className="text-sm font-extrabold text-[#231917]">
                    Kéo &amp; thả tệp Excel vào đây, hoặc bấm để chọn tệp từ máy
                  </p>
                  <p className="text-xs text-[#76685F] mt-1">
                    Chấp nhận định dạng .xls, .xlsx, .csv (Đọc đầy đủ 100% dòng dữ liệu không bị ngắt quãng).
                  </p>
                </div>

                <input
                  type="file"
                  id="excelFile"
                  accept=".xlsx, .xls, .csv"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />

                <div className="flex justify-center items-center gap-3">
                  <label
                    htmlFor="excelFile"
                    className="px-6 py-2.5 bg-white hover:bg-[#DED3C8]/40 border border-[#DED3C8] text-[#56423E] text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-2xs"
                  >
                    🔍 Duyệt Tệp Trên Máy
                  </label>

                  {file && (
                    <span className="text-xs font-extrabold text-[#C65D4B] bg-white px-3 py-2 rounded-xl border border-[#DED3C8]">
                      📄 {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#DED3C8]">
              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className="px-8 py-3 bg-[#C65D4B] hover:bg-[#a84c3c] disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
              >
                {loading ? "Đang Phân Tích Tệp..." : "Tiếp Tục Phân Tách ➔"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: VALIDATION SUMMARY */}
        {step === 2 && job && (
          <div className="bg-white border-2 border-[#DED3C8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-extrabold text-[#C65D4B] border-b border-[#DED3C8] pb-3">
              📊 KẾT QUẢ PHÂN TÍCH VÀ PHÂN TÁCH BÀI HỌC
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#FAF3EB] p-4 rounded-2xl border border-[#DED3C8] text-center">
                <span className="text-2xl font-black text-[#231917]">{job.totalRows}</span>
                <p className="text-xs font-bold text-[#8B6F5A]">Tổng số dòng</p>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-300 text-center">
                <span className="text-2xl font-black text-emerald-800">{job.validRows}</span>
                <p className="text-xs font-bold text-emerald-800">Dòng hợp lệ (Sẵn sàng)</p>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 text-center">
                <span className="text-2xl font-black text-amber-800">{job.skippedRows || 0}</span>
                <p className="text-xs font-bold text-amber-800">Bản ghi trùng (Bỏ qua)</p>
              </div>

              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-300 text-center">
                <span className="text-2xl font-black text-rose-800">{errors.length}</span>
                <p className="text-xs font-bold text-rose-800">Dòng bị lỗi</p>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-[#DED3C8]">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 bg-[#FAF3EB] border border-[#DED3C8] text-[#56423E] font-bold text-xs rounded-xl"
              >
                ← Chọn Tệp Khác
              </button>

              <button
                onClick={handleCommit}
                disabled={loading}
                className="px-8 py-3 bg-[#C65D4B] hover:bg-[#a84c3c] text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
              >
                {loading ? "Đang Nạp Dữ Liệu..." : "Xác Nhận Nạp Vào DB ➔"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: COMPLETED */}
        {step === 4 && (
          <div className="bg-white border-2 border-emerald-400 rounded-3xl p-8 text-center space-y-6 shadow-sm">
            <span className="text-5xl">🎉</span>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-emerald-800">Nạp Dữ Liệu Hoàn Tất Rực Rỡ!</h2>
              <p className="text-xs text-[#76685F]">
                Toàn bộ dữ liệu từ vựng từ tệp Excel đã được phân tách và lưu chính xác vào từng Bài học N5/N4.
              </p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => { setStep(1); setFile(null); setJob(null); }}
                className="px-6 py-2.5 bg-[#C65D4B] text-white font-extrabold text-xs rounded-xl shadow-xs"
              >
                + Import Tệp Khác
              </button>

              <Link
                href="/admin"
                className="px-6 py-2.5 bg-[#56423E] text-white font-extrabold text-xs rounded-xl shadow-xs"
              >
                Về Trang Quản Lý Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
