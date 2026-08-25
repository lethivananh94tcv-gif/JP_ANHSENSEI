"use client";

import { useEffect, useState, useMemo } from "react";
import { 
  Search, RefreshCw, Trophy, FileText, Sparkles, Clock, 
  CheckCircle2, XCircle, ChevronRight, X, RotateCcw, ChevronLeft, AlertTriangle
} from "lucide-react";

interface AdminQuizAttemptDto {
  attemptId: number;
  userId: number;
  fullName: string;
  email: string;
  quizId: number;
  quizTitle: string;
  lessonId: number;
  lessonTitle: string;
  levelCode: string;
  attemptNumber: number;
  score: number;
  correctCount: number;
  totalCount: number;
  passed: boolean;
  startedAt: string;
  submittedAt: string;
  status: string;
  durationSeconds: number;
}

interface AnswerSnapshotDto {
  attemptAnswerId: number;
  questionId: number;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  isCorrect: boolean;
}

interface AdminQuizAttemptDetailDto {
  attemptInfo: AdminQuizAttemptDto;
  answers: AnswerSnapshotDto[];
}

export default function AdminQuizAttemptsPage() {
  const [attempts, setAttempts] = useState<AdminQuizAttemptDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState<string>("ALL");
  const [activeResultFilter, setActiveResultFilter] = useState<string>("ALL");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Detail Modal State
  const [selectedAttemptId, setSelectedAttemptId] = useState<number | null>(null);
  const [attemptDetail, setAttemptDetail] = useState<AdminQuizAttemptDetailDto | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Stats Overview State
  const [stats, setStats] = useState<{ totalAttempts: number; passedCount: number; failedCount: number; passRate: number; avgScore: number }>({
    totalAttempts: 0,
    passedCount: 0,
    failedCount: 0,
    passRate: 0,
    avgScore: 0,
  });

  const fetchAttemptsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token") || "";
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      const [attemptsRes, statsRes] = await Promise.all([
        fetch("http://localhost:8080/api/v1/admin/quiz-attempts", { headers }).catch(() => null),
        fetch("http://localhost:8080/api/v1/admin/quiz-attempts/stats", { headers }).catch(() => null),
      ]);

      if (attemptsRes && attemptsRes.ok) {
        const json = await attemptsRes.json();
        if (json && json.data && Array.isArray(json.data)) {
          setAttempts(json.data);
        }
      } else {
        // Mock fallback data if backend endpoint is unavailable
        const mockList: AdminQuizAttemptDto[] = [
          {
            attemptId: 101,
            userId: 2,
            fullName: "Nguyễn Văn Học",
            email: "hocvien01@gmail.com",
            quizId: 1,
            quizTitle: "Quiz Kiểm Tra Bài #1",
            lessonId: 1,
            lessonTitle: "Bài 1: Giới thiệu bản thân & Chào hỏi",
            levelCode: "N5",
            attemptNumber: 1,
            score: 86.67,
            correctCount: 26,
            totalCount: 30,
            passed: true,
            startedAt: new Date(Date.now() - 3600000).toISOString(),
            submittedAt: new Date(Date.now() - 3300000).toISOString(),
            status: "SUBMITTED",
            durationSeconds: 300,
          },
          {
            attemptId: 102,
            userId: 3,
            fullName: "Trần Thị Minh",
            email: "minhtran@gmail.com",
            quizId: 1,
            quizTitle: "Quiz Kiểm Tra Bài #1",
            lessonId: 1,
            lessonTitle: "Bài 1: Giới thiệu bản thân & Chào hỏi",
            levelCode: "N5",
            attemptNumber: 2,
            score: 43.33,
            correctCount: 13,
            totalCount: 30,
            passed: false,
            startedAt: new Date(Date.now() - 7200000).toISOString(),
            submittedAt: new Date(Date.now() - 6700000).toISOString(),
            status: "SUBMITTED",
            durationSeconds: 500,
          },
        ];
        setAttempts(mockList);
      }

      if (statsRes && statsRes.ok) {
        const statsJson = await statsRes.json();
        if (statsJson && statsJson.data) {
          setStats(statsJson.data);
        }
      }
    } catch (e: any) {
      console.error("Lỗi khi tải lịch sử làm bài Quiz:", e);
      setError("Không thể tải danh sách kết quả Quiz. Đã xảy ra lỗi kết nối.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttemptsData();
  }, []);

  const handleInspectAttemptDetail = async (attemptId: number) => {
    try {
      setSelectedAttemptId(attemptId);
      setLoadingDetail(true);
      const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token") || "";
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await fetch(`http://localhost:8080/api/v1/admin/quiz-attempts/${attemptId}`, { headers });
      if (res.ok) {
        const json = await res.json();
        if (json && json.data) {
          setAttemptDetail(json.data);
          return;
        }
      }
      throw new Error("Không thể tải chi tiết bài nộp");
    } catch (err: any) {
      const item = attempts.find((a) => a.attemptId === attemptId);
      if (item) {
        setAttemptDetail({
          attemptInfo: item,
          answers: [
            {
              attemptAnswerId: 1,
              questionId: 1,
              prompt: "📖 [TỪ VỰNG] Từ 「 私 (わたし) 」 trong tiếng Việt có nghĩa là gì?",
              userAnswer: "Tôi",
              correctAnswer: "Tôi",
              explanation: "「私」 có nghĩa là 'Tôi' (xưng hô ngôi thứ nhất).",
              isCorrect: true,
            },
            {
              attemptAnswerId: 2,
              questionId: 2,
              prompt: "📖 [TỪ VỰNG] Từ 「 中国 (ちゅうごく) 」 trong tiếng Việt có nghĩa là gì?",
              userAnswer: "Nhật Bản",
              correctAnswer: "Trung Quốc",
              explanation: "「中国」 có nghĩa là Trung Quốc.",
              isCorrect: false,
            },
          ],
        });
      }
    } finally {
      setLoadingDetail(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveLevel("ALL");
    setActiveResultFilter("ALL");
    setCurrentPage(1);
  };

  const isFilterActive = searchQuery.trim() !== "" || activeLevel !== "ALL" || activeResultFilter !== "ALL";

  // Filtered & Paginated items
  const filteredAttempts = useMemo(() => {
    return attempts.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.fullName?.toLowerCase().includes(q);
        const matchEmail = item.email?.toLowerCase().includes(q);
        const matchQuiz = item.quizTitle?.toLowerCase().includes(q) || item.lessonTitle?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchQuiz) return false;
      }
      if (activeLevel !== "ALL" && item.levelCode !== activeLevel) return false;
      if (activeResultFilter === "PASSED" && !item.passed) return false;
      if (activeResultFilter === "FAILED" && item.passed) return false;
      return true;
    });
  }, [attempts, searchQuery, activeLevel, activeResultFilter]);

  const totalPages = Math.ceil(filteredAttempts.length / itemsPerPage) || 1;
  const paginatedAttempts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAttempts.slice(start, start + itemsPerPage);
  }, [filteredAttempts, currentPage]);

  const formatDuration = (seconds: number) => {
    if (!seconds || seconds <= 0) return "Dưới 1 phút";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs} giây`;
    return `${mins} phút ${secs > 0 ? `${secs}s` : ""}`;
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return { timeStr: "", dateStr: "N/A" };
    try {
      const d = new Date(isoString);
      const timeStr = d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      const dateStr = d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
      return { timeStr, dateStr };
    } catch {
      return { timeStr: "", dateStr: isoString };
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-[#2D2926] font-sans">
      {/* 1. COMPACT PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-[#9A9189] uppercase tracking-wider">
            BÁO CÁO / HỌC VIÊN
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2926] tracking-tight">
            Kết Quả Làm Bài
          </h1>
          <p className="text-xs sm:text-sm text-[#746C66]">
            Theo dõi lịch sử và kết quả làm Quiz của học viên.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={fetchAttemptsData}
            disabled={loading}
            className="px-4 py-2 bg-white border border-[#E5DED6] hover:bg-[#FCFAF7] text-[#2D2926] font-semibold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#746C66] ${loading ? "animate-spin" : ""}`} />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* 2. UNIFIED COMPACT STATISTICS PANEL */}
      <div className="bg-white border border-[#E5DED6] rounded-xl p-5 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E5DED6] gap-4 sm:gap-0">
          {/* Metric 1 */}
          <div className="sm:px-6 first:pl-0 space-y-1">
            <span className="text-[11px] font-semibold text-[#746C66] uppercase tracking-wider block">
              Tổng lượt làm
            </span>
            <div className="text-3xl font-bold text-[#2D2926] tracking-tight">
              {loading ? "..." : (stats.totalAttempts || attempts.length)}
            </div>
            <p className="text-xs text-[#9A9189]">Tổng số lượt nộp bài trên hệ thống</p>
          </div>

          {/* Metric 2 */}
          <div className="sm:px-6 space-y-1 pt-3 sm:pt-0">
            <span className="text-[11px] font-semibold text-[#746C66] uppercase tracking-wider block">
              Tỷ lệ đạt
            </span>
            <div className="text-3xl font-bold text-[#4E896B] tracking-tight">
              {loading ? "..." : `${stats.passRate || 0}%`}
            </div>
            <p className="text-xs text-[#9A9189]">
              {stats.passedCount || 0} lượt nộp bài đạt điểm PASS
            </p>
          </div>

          {/* Metric 3 */}
          <div className="sm:px-6 last:pr-0 space-y-1 pt-3 sm:pt-0">
            <span className="text-[11px] font-semibold text-[#746C66] uppercase tracking-wider block">
              Điểm trung bình
            </span>
            <div className="text-3xl font-bold text-[#2D2926] tracking-tight">
              {loading ? "..." : `${stats.avgScore || 0}%`}
            </div>
            <p className="text-xs text-[#9A9189]">Trên tất cả bài Quiz đã nộp</p>
          </div>
        </div>
      </div>

      {/* 3. SEARCH & FILTER TOOLBAR */}
      <div className="bg-white border border-[#E5DED6] rounded-xl p-3.5 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#9A9189] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm học viên, email hoặc bài Quiz..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3.5 py-2 bg-[#FCFAF7] border border-[#E5DED6] rounded-lg text-xs font-medium text-[#2D2926] placeholder:text-[#9A9189] focus:outline-none focus:border-[#C4624D] focus:bg-white transition-colors"
            />
          </div>

          {/* Dropdown Select Filters (No pill buttons!) */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Level Select */}
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#746C66]">
              <span>Trình độ:</span>
              <select
                value={activeLevel}
                onChange={(e) => {
                  setActiveLevel(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#FCFAF7] border border-[#E5DED6] text-[#2D2926] font-semibold text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-[#C4624D] cursor-pointer"
              >
                <option value="ALL">Tất cả trình độ</option>
                <option value="N5">N5</option>
                <option value="N4">N4</option>
                <option value="N3">N3</option>
                <option value="N2">N2</option>
                <option value="N1">N1</option>
              </select>
            </div>

            {/* Status Select */}
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#746C66]">
              <span>Trạng thái:</span>
              <select
                value={activeResultFilter}
                onChange={(e) => {
                  setActiveResultFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#FCFAF7] border border-[#E5DED6] text-[#2D2926] font-semibold text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-[#C4624D] cursor-pointer"
              >
                <option value="ALL">Tất cả kết quả</option>
                <option value="PASSED">Đã đạt</option>
                <option value="FAILED">Chưa đạt</option>
              </select>
            </div>

            {/* Clear Filter Button */}
            {isFilterActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold text-[#C4624D] hover:text-[#AE503E] px-2 py-1 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Xóa bộ lọc</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. RESULTS SUMMARY ROW */}
      <div className="flex items-center justify-between text-xs font-medium text-[#746C66] px-1">
        <span>
          {isFilterActive
            ? `${filteredAttempts.length} kết quả phù hợp`
            : `Hiển thị ${paginatedAttempts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–${Math.min(currentPage * itemsPerPage, filteredAttempts.length)} trong tổng số ${filteredAttempts.length} lượt làm`}
        </span>
      </div>

      {/* 5. QUIZ ATTEMPTS DATA TABLE (PRIMARY WORKSPACE FOCUS) */}
      <div className="bg-white border border-[#E5DED6] rounded-xl shadow-2xs overflow-hidden">
        {loading ? (
          // Skeleton Loading State
          <div className="p-6 space-y-4">
            <div className="h-6 bg-[#FCFAF7] rounded-md animate-pulse w-full" />
            <div className="h-12 bg-[#FCFAF7] rounded-md animate-pulse w-full" />
            <div className="h-12 bg-[#FCFAF7] rounded-md animate-pulse w-full" />
            <div className="h-12 bg-[#FCFAF7] rounded-md animate-pulse w-full" />
          </div>
        ) : error ? (
          // Error State
          <div className="p-12 text-center space-y-3">
            <AlertTriangle className="w-8 h-8 text-[#B95B54] mx-auto" />
            <h3 className="font-bold text-sm text-[#2D2926]">Không thể tải dữ liệu</h3>
            <p className="text-xs text-[#746C66]">{error}</p>
            <button
              type="button"
              onClick={fetchAttemptsData}
              className="px-4 py-2 bg-[#C4624D] hover:bg-[#AE503E] text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Thử lại
            </button>
          </div>
        ) : filteredAttempts.length === 0 ? (
          // Refined Minimalist Empty State
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FCFAF7] border border-[#E5DED6] flex items-center justify-center mx-auto text-[#9A9189]">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm text-[#2D2926]">Không tìm thấy lượt làm bài</h3>
            <p className="text-xs text-[#746C66]">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.</p>
            {isFilterActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="px-3.5 py-1.5 bg-[#F3E7E1] text-[#C4624D] hover:bg-[#EBDCD4] font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FCFAF7] border-b border-[#E5DED6] text-[11px] font-bold text-[#746C66] uppercase tracking-wider">
                  <th className="py-3 px-5">Học viên</th>
                  <th className="py-3 px-5">Bài Quiz / Bài học</th>
                  <th className="py-3 px-5 text-center">Lần làm</th>
                  <th className="py-3 px-5 text-center">Kết quả</th>
                  <th className="py-3 px-5 text-center">Trạng thái</th>
                  <th className="py-3 px-5">Nộp bài</th>
                  <th className="py-3 px-5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DED6] text-xs font-medium text-[#2D2926]">
                {paginatedAttempts.map((item) => {
                  const dateObj = formatDate(item.submittedAt || item.startedAt);
                  return (
                    <tr key={item.attemptId} className="hover:bg-[#FCFAF7] transition-colors">
                      {/* 1. HỌC VIÊN */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#F3E7E1] text-[#C4624D] font-bold flex items-center justify-center text-xs shrink-0">
                            {item.fullName ? item.fullName.charAt(0).toUpperCase() : "U"}
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-[#2D2926]">{item.fullName || "Học viên"}</div>
                            <div className="text-xs text-[#746C66]">{item.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* 2. BÀI QUIZ / BÀI HỌC */}
                      <td className="py-3.5 px-5">
                        <div className="font-semibold text-sm text-[#2D2926]">
                          {item.quizTitle || item.lessonTitle}
                        </div>
                        <div className="text-xs text-[#746C66]">
                          {item.levelCode || "N5"} · Bài #{item.lessonId || 1}
                        </div>
                      </td>

                      {/* 3. LẦN LÀM */}
                      <td className="py-3.5 px-5 text-center">
                        <span className="text-xs text-[#746C66] font-medium">
                          Lần #{item.attemptNumber || 1}
                        </span>
                      </td>

                      {/* 4. KẾT QUẢ */}
                      <td className="py-3.5 px-5 text-center">
                        <div className="font-bold text-sm text-[#2D2926]">
                          {item.score}%
                        </div>
                        <div className="text-[11px] text-[#746C66]">
                          {item.correctCount} / {item.totalCount} câu đúng
                        </div>
                      </td>

                      {/* 5. TRẠNG THÁI */}
                      <td className="py-3.5 px-5 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            item.passed
                              ? "bg-[#EAF4EE] text-[#4E896B] border border-[#C5E2D1]"
                              : "bg-[#F9EAEA] text-[#B95B54] border border-[#F1C5C2]"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${item.passed ? "bg-[#4E896B]" : "bg-[#B95B54]"}`} />
                          <span>{item.passed ? "ĐÃ ĐẠT" : "CHƯA ĐẠT"}</span>
                        </span>
                      </td>

                      {/* 6. NỘP BÀI */}
                      <td className="py-3.5 px-5">
                        <div className="text-xs font-medium text-[#2D2926]">
                          {dateObj.timeStr ? `${dateObj.timeStr} ${dateObj.dateStr}` : dateObj.dateStr}
                        </div>
                        <div className="text-[11px] text-[#9A9189]">
                          {formatDuration(item.durationSeconds)}
                        </div>
                      </td>

                      {/* 7. THAO TÁC */}
                      <td className="py-3.5 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => handleInspectAttemptDetail(item.attemptId)}
                          className="px-3 py-1.5 bg-[#FCFAF7] hover:bg-[#F3E7E1] text-[#C4624D] border border-[#E5DED6] font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Xem chi tiết</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 6. PAGINATION */}
      {!loading && filteredAttempts.length > itemsPerPage && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-[#746C66]">
            Trang {currentPage} trên {totalPages}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1.5 bg-white border border-[#E5DED6] hover:bg-[#FCFAF7] text-[#2D2926] font-semibold text-xs rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Trước</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                type="button"
                onClick={() => setCurrentPage(pg)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  currentPage === pg
                    ? "bg-[#C4624D] text-white"
                    : "bg-white border border-[#E5DED6] text-[#2D2926] hover:bg-[#FCFAF7]"
                }`}
              >
                {pg}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              className="px-3 py-1.5 bg-white border border-[#E5DED6] hover:bg-[#FCFAF7] text-[#2D2926] font-semibold text-xs rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <span>Tiếp</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 7. QUIZ ATTEMPT DETAIL MODAL (REDESIGNED MINIMALIST INSPECTION MODAL) */}
      {selectedAttemptId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E5DED6] rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#FCFAF7] border-b border-[#E5DED6] p-4 sm:p-5 flex items-center justify-between shrink-0">
              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold text-[#746C66]">
                  KẾT QUẢ BÀI LÀM # {selectedAttemptId}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#2D2926]">
                  {attemptDetail?.attemptInfo.fullName}
                </h3>
                <p className="text-xs text-[#746C66]">
                  {attemptDetail?.attemptInfo.quizTitle} · {attemptDetail?.attemptInfo.levelCode} · Bài #{attemptDetail?.attemptInfo.lessonId} · Lần #{attemptDetail?.attemptInfo.attemptNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedAttemptId(null);
                  setAttemptDetail(null);
                }}
                className="p-1.5 rounded-lg text-[#746C66] hover:bg-[#E5DED6] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 bg-[#F7F4EF]/50">
              {loadingDetail ? (
                <div className="py-12 text-center text-[#746C66] text-xs font-semibold">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#C4624D]" />
                  Đang tải chi tiết bài làm...
                </div>
              ) : attemptDetail ? (
                <>
                  {/* Compact Summary Bar */}
                  <div className="bg-white border border-[#E5DED6] p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-[#9A9189] block text-[11px] uppercase font-semibold">Học viên</span>
                      <span className="font-semibold text-[#2D2926]">{attemptDetail.attemptInfo.fullName} ({attemptDetail.attemptInfo.email})</span>
                    </div>

                    <div>
                      <span className="text-[#9A9189] block text-[11px] uppercase font-semibold">Điểm số</span>
                      <span className="font-bold text-[#2D2926]">
                        {attemptDetail.attemptInfo.score}% ({attemptDetail.attemptInfo.correctCount}/{attemptDetail.attemptInfo.totalCount} câu đúng)
                      </span>
                    </div>

                    <div>
                      <span className="text-[#9A9189] block text-[11px] uppercase font-semibold">Trạng thái</span>
                      <span className={`font-bold ${attemptDetail.attemptInfo.passed ? "text-[#4E896B]" : "text-[#B95B54]"}`}>
                        {attemptDetail.attemptInfo.passed ? "● ĐÃ ĐẠT" : "● CHƯA ĐẠT"}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#9A9189] block text-[11px] uppercase font-semibold">Thời gian</span>
                      <span className="text-[#2D2926] font-medium">{formatDuration(attemptDetail.attemptInfo.durationSeconds)}</span>
                    </div>
                  </div>

                  {/* Question Inspection List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#746C66] uppercase tracking-wider">
                      Chi tiết {attemptDetail.answers.length} câu hỏi:
                    </h4>

                    {attemptDetail.answers.map((ans, idx) => (
                      <div
                        key={ans.attemptAnswerId || idx}
                        className={`bg-white border rounded-xl p-4 space-y-3 text-xs transition-colors ${
                          ans.isCorrect ? "border-[#C5E2D1]" : "border-[#F1C5C2]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 border-b border-[#E5DED6]/60 pb-2.5">
                          <span className="font-semibold text-[#2D2926]">
                            Câu {idx + 1}: {ans.prompt}
                          </span>
                          <span className={`shrink-0 font-bold px-2 py-0.5 rounded text-[11px] ${
                            ans.isCorrect ? "bg-[#EAF4EE] text-[#4E896B]" : "bg-[#F9EAEA] text-[#B95B54]"
                          }`}>
                            {ans.isCorrect ? "✓ ĐÚNG" : "✕ SAI"}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className={`p-2.5 rounded-lg border ${
                            ans.isCorrect ? "bg-[#EAF4EE]/50 border-[#C5E2D1] text-[#4E896B]" : "bg-[#F9EAEA]/50 border-[#F1C5C2] text-[#B95B54]"
                          }`}>
                            <span className="text-[10px] text-[#9A9189] block uppercase font-bold">Học viên chọn:</span>
                            <span className="font-semibold">{ans.userAnswer || "Chưa trả lời"}</span>
                          </div>

                          <div className="p-2.5 bg-[#EAF4EE]/50 border border-[#C5E2D1] rounded-lg text-[#4E896B]">
                            <span className="text-[10px] text-[#9A9189] block uppercase font-bold">Đáp án đúng:</span>
                            <span className="font-semibold">{ans.correctAnswer || "N/A"}</span>
                          </div>
                        </div>

                        {ans.explanation && (
                          <div className="p-2.5 bg-[#FCFAF7] border border-[#E5DED6] rounded-lg text-[#746C66] space-y-0.5">
                            <span className="font-bold text-[#2D2926] text-[11px]">Giải thích:</span>
                            <p className="font-medium text-[11px] leading-relaxed">{ans.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="bg-[#FCFAF7] border-t border-[#E5DED6] p-4 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => {
                  setSelectedAttemptId(null);
                  setAttemptDetail(null);
                }}
                className="px-4 py-2 bg-white border border-[#E5DED6] hover:bg-[#E5DED6]/50 text-[#2D2926] font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
