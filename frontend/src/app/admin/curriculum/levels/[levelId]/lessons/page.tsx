"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface LessonDto {
  lessonId: number;
  levelId: number;
  levelCode: string;
  title: string;
  description: string;
  sortOrder: number;
  isSample: boolean;
  estimatedMinutes: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  version: number;
}

export default function AdminLessonsPage() {
  const router = useRouter();
  const params = useParams();
  const levelId = params.levelId as string;

  const [lessons, setLessons] = useState<LessonDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<LessonDto | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formSortOrder, setFormSortOrder] = useState<number>(1);
  const [formIsSample, setFormIsSample] = useState(false);
  const [formEstimatedMinutes, setFormEstimatedMinutes] = useState<number>(30);
  const [submitting, setSubmitting] = useState(false);

  const fetchLessons = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
      const res = await fetch(`/api/v1/curriculum/levels/${levelId}/lessons`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        router.replace("/login");
        return;
      }
      if (!res.ok) throw new Error("Không thể tải danh sách bài học.");
      const data = await res.json();
      setLessons(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  }, [levelId]);

  useEffect(() => {
    if (levelId) fetchLessons();
  }, [levelId, fetchLessons]);

  const openCreateModal = () => {
    setEditingLesson(null);
    setFormTitle("");
    setFormDescription("");
    setFormSortOrder(lessons.length + 1);
    setFormIsSample(false);
    setFormEstimatedMinutes(30);
    setShowModal(true);
  };

  const openEditModal = (lsn: LessonDto) => {
    setEditingLesson(lsn);
    setFormTitle(lsn.title);
    setFormDescription(lsn.description || "");
    setFormSortOrder(lsn.sortOrder);
    setFormIsSample(lsn.isSample);
    setFormEstimatedMinutes(lsn.estimatedMinutes || 30);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");

    try {
      if (editingLesson) {
        // Update Lesson
        const res = await fetch(`http://localhost:8080/api/v1/admin/lessons/${editingLesson.lessonId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formTitle,
            description: formDescription,
            sortOrder: formSortOrder,
            isSample: formIsSample,
            estimatedMinutes: formEstimatedMinutes,
            version: editingLesson.version,
          }),
        });
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.message || "Lỗi khi cập nhật Lesson.");
        }
      } else {
        // Create Lesson
        const res = await fetch(`http://localhost:8080/api/v1/admin/levels/${levelId}/lessons`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formTitle,
            description: formDescription,
            sortOrder: formSortOrder,
            isSample: formIsSample,
            estimatedMinutes: formEstimatedMinutes,
          }),
        });
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.message || "Lỗi khi tạo Lesson.");
        }
      }

      setShowModal(false);
      fetchLessons();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Lỗi khi lưu Lesson");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePublishToggle = async (lsn: LessonDto) => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
    const endpoint = lsn.status === "PUBLISHED" ? "unpublish" : "publish";
    try {
      setError("");
      const res = await fetch(`http://localhost:8080/api/v1/admin/lessons/${lsn.lessonId}/${endpoint}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || `Lỗi khi ${endpoint} Lesson.`);
      }
      fetchLessons();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Lỗi khi thay đổi trạng thái Lesson");
    }
  };

  const handleArchive = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn Lưu trữ (Archive) Bài học này không?")) return;
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
    try {
      setError("");
      const res = await fetch(`http://localhost:8080/api/v1/admin/lessons/${id}/archive`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Lỗi khi Archive Lesson.");
      fetchLessons();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Lỗi khi Archive Lesson");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-8 text-[#2C2421]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6E5E52]">
          <Link href="/admin/curriculum" className="hover:text-[#C65D4B] transition-colors">
            ← Danh Sách Trình Độ
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#2C2421]">Bài Học Trình Độ #{levelId}</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-[#EFE9E1]">
          <div>
            <h1 className="text-3xl font-extrabold text-[#C65D4B]">Quản Lý Bài Học (Lessons)</h1>
            <p className="text-sm text-[#6E5E52] mt-1">Danh sách bài học thuộc Trình độ ID #{levelId}</p>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-[#C65D4B] hover:bg-[#b04f3f] text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>+ Tạo Bài Học Mới</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Lessons List */}
        {loading ? (
          <div className="text-center py-12 text-[#6E5E52]">Đang tải danh sách bài học...</div>
        ) : lessons.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-[#6E5E52] border border-[#EFE9E1]">
            Chưa có bài học nào trong Level này. Bấm &quot;+ Tạo Bài Học Mới&quot; để tạo bài đầu tiên.
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#EFE9E1] overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF3EB] text-[#6E5E52] font-semibold border-b border-[#EFE9E1]">
                <tr>
                  <th className="p-4 text-center w-16">Sort</th>
                  <th className="p-4">Tiêu Đề Bài Học</th>
                  <th className="p-4 text-center">Thời Lượng</th>
                  <th className="p-4 text-center">Sample</th>
                  <th className="p-4 text-center">Trạng Thái</th>
                  <th className="p-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5EFE9]">
                {lessons.map((lsn) => (
                  <tr key={lsn.lessonId} className="hover:bg-[#FCFA9]">
                    <td className="p-4 text-center font-bold text-[#C65D4B]">#{lsn.sortOrder}</td>
                    <td className="p-4">
                      <div className="font-bold text-[#2C2421]">{lsn.title}</div>
                      <div className="text-xs text-[#8C7B70] line-clamp-1">{lsn.description || "Chưa có mô tả."}</div>
                    </td>
                    <td className="p-4 text-center text-[#6E5E52] font-medium">{lsn.estimatedMinutes || 30} phút</td>
                    <td className="p-4 text-center">
                      {lsn.isSample ? (
                        <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                          ⭐ Sample
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          lsn.status === "PUBLISHED"
                            ? "bg-green-100 text-green-800"
                            : lsn.status === "DRAFT"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {lsn.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/admin/curriculum/lessons/${lsn.lessonId}/content`}
                        className="inline-block bg-[#FAF3EB] hover:bg-[#F3E7DB] text-[#C65D4B] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#F2E3D5] transition-colors"
                      >
                        📝 Nội Dung (Vocab/Kanji/Grammar)
                      </Link>

                      <button
                        onClick={() => handlePublishToggle(lsn)}
                        disabled={lsn.status === "ARCHIVED"}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                          lsn.status === "PUBLISHED"
                            ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                            : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                        }`}
                      >
                        {lsn.status === "PUBLISHED" ? "Hủy Publish" : "Publish"}
                      </button>

                      <button
                        onClick={() => openEditModal(lsn)}
                        disabled={lsn.status === "ARCHIVED"}
                        className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-xs font-semibold"
                      >
                        Sửa
                      </button>

                      {lsn.status !== "ARCHIVED" && (
                        <button
                          onClick={() => handleArchive(lsn.lessonId)}
                          className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-semibold"
                        >
                          Archive
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#EFE9E1]">
              <h2 className="text-xl font-bold text-[#C65D4B] mb-4">
                {editingLesson ? "Chỉnh Sửa Bài Học" : "Tạo Bài Học Mới"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#6E5E52] mb-1">Tiêu Đề Bài Học (Title)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Bài 1: Giới thiệu bản thân & Chào hỏi"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full p-2.5 border border-[#D9CEB2] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#C65D4B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6E5E52] mb-1">Mô Tả (Description)</label>
                  <textarea
                    rows={3}
                    placeholder="Tóm tắt mục tiêu bài học..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full p-2.5 border border-[#D9CEB2] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#C65D4B] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#6E5E52] mb-1">Thứ Tự (Sort Order)</label>
                    <input
                      type="number"
                      min={1}
                      required
                      value={formSortOrder}
                      onChange={(e) => setFormSortOrder(parseInt(e.target.value) || 1)}
                      className="w-full p-2.5 border border-[#D9CEB2] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#C65D4B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#6E5E52] mb-1">Thời Lượng (Phút)</label>
                    <input
                      type="number"
                      min={1}
                      value={formEstimatedMinutes}
                      onChange={(e) => setFormEstimatedMinutes(parseInt(e.target.value) || 30)}
                      className="w-full p-2.5 border border-[#D9CEB2] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#C65D4B] outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isSample"
                    checked={formIsSample}
                    onChange={(e) => setFormIsSample(e.target.checked)}
                    className="w-4 h-4 text-[#C65D4B] rounded border-[#D9CEB2] focus:ring-[#C65D4B]"
                  />
                  <label htmlFor="isSample" className="text-xs font-bold text-[#6E5E52] cursor-pointer">
                    Đặt làm Bài học mẫu (Cho phép Guest học thử công khai)
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-[#F5EFE9]">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2.5 bg-[#C65D4B] hover:bg-[#b04f3f] text-white rounded-xl text-sm font-semibold shadow-md transition-colors"
                  >
                    {submitting ? "Đang lưu..." : editingLesson ? "Cập Nhật" : "Tạo Mới"}
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
