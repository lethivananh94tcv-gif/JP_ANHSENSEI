"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LevelDto {
  levelId: number;
  code: string;
  name: string;
  description: string;
  sortOrder: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  version: number;
}

export default function AdminCurriculumPage() {
  const router = useRouter();
  const [levels, setLevels] = useState<LevelDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingLevel, setEditingLevel] = useState<LevelDto | null>(null);
  const [formCode, setFormCode] = useState("N5");
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formSortOrder, setFormSortOrder] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);

  const fetchLevels = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
      const res = await fetch("/api/v1/curriculum/levels", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        router.replace("/login");
        return;
      }
      if (!res.ok) throw new Error("Không thể tải danh sách trình độ.");
      const data = await res.json();
      setLevels(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  const openCreateModal = () => {
    setEditingLevel(null);
    setFormCode("N5");
    setFormName("");
    setFormDescription("");
    setFormSortOrder(levels.length + 1);
    setShowModal(true);
  };

  const openEditModal = (lvl: LevelDto) => {
    setEditingLevel(lvl);
    setFormCode(lvl.code);
    setFormName(lvl.name);
    setFormDescription(lvl.description || "");
    setFormSortOrder(lvl.sortOrder);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");

    try {
      if (editingLevel) {
        // Update Level
        const res = await fetch(`http://localhost:8080/api/v1/admin/levels/${editingLevel.levelId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formName,
            description: formDescription,
            sortOrder: formSortOrder,
            version: editingLevel.version,
          }),
        });
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.message || "Lỗi khi cập nhật Level.");
        }
      } else {
        // Create Level
        const res = await fetch("http://localhost:8080/api/v1/admin/levels", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            code: formCode,
            name: formName,
            description: formDescription,
            sortOrder: formSortOrder,
          }),
        });
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.message || "Lỗi khi tạo Level.");
        }
      }

      setShowModal(false);
      fetchLevels();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Lỗi khi lưu Level");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePublishToggle = async (lvl: LevelDto) => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
    const endpoint = lvl.status === "PUBLISHED" ? "unpublish" : "publish";
    try {
      setError("");
      const res = await fetch(`http://localhost:8080/api/v1/admin/levels/${lvl.levelId}/${endpoint}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || `Lỗi khi ${endpoint} Level.`);
      }
      fetchLevels();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Lỗi khi thay đổi trạng thái Level");
    }
  };

  const handleArchive = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn Lưu trữ (Archive) Level này không?")) return;
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
    try {
      setError("");
      const res = await fetch(`http://localhost:8080/api/v1/admin/levels/${id}/archive`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Lỗi khi Archive Level.");
      fetchLevels();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Lỗi khi Archive Level");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-8 text-[#2C2421]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-[#EFE9E1]">
          <div>
            <h1 className="text-3xl font-extrabold text-[#C65D4B]">Quản Lý Trình Độ (Levels)</h1>
            <p className="text-sm text-[#6E5E52] mt-1">Danh sách trình độ JLPT (N5 - N1) &amp; quản lý bài học</p>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-[#C65D4B] hover:bg-[#b04f3f] text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>+ Tạo Trình Độ Mới</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Levels Grid / Table */}
        {loading ? (
          <div className="text-center py-12 text-[#6E5E52]">Đang tải danh sách Trình độ...</div>
        ) : levels.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-[#6E5E52] border border-[#EFE9E1]">
            Chưa có trình độ nào được khởi tạo. Bấm &quot;+ Tạo Trình Độ Mới&quot; để bắt đầu.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((lvl) => (
              <div
                key={lvl.levelId}
                className="bg-white rounded-2xl border border-[#EFE9E1] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-[#FAF3EB] text-[#C65D4B] text-xl font-bold px-3 py-1 rounded-lg border border-[#F2E3D5]">
                      {lvl.code}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        lvl.status === "PUBLISHED"
                          ? "bg-green-100 text-green-800"
                          : lvl.status === "DRAFT"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {lvl.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#2C2421] mb-1">{lvl.name}</h3>
                  <p className="text-xs text-[#6E5E52] line-clamp-2 mb-4">
                    {lvl.description || "Chưa có mô tả cho trình độ này."}
                  </p>
                  <div className="text-xs text-[#8C7B70] mb-4">
                    <span>Sort order: #{lvl.sortOrder}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#F5EFE9]">
                  <Link
                    href={`/admin/curriculum/levels/${lvl.levelId}/lessons`}
                    className="w-full block text-center bg-[#FAF3EB] hover:bg-[#F3E7DB] text-[#C65D4B] font-semibold text-sm py-2 rounded-xl border border-[#F2E3D5] transition-colors"
                  >
                    📚 Quản Lý Bài Học
                  </Link>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePublishToggle(lvl)}
                      disabled={lvl.status === "ARCHIVED"}
                      className={`flex-1 text-xs font-semibold py-1.5 rounded-lg border transition-colors ${
                        lvl.status === "PUBLISHED"
                          ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                          : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                      }`}
                    >
                      {lvl.status === "PUBLISHED" ? "Hủy Publish" : "Publish"}
                    </button>

                    <button
                      onClick={() => openEditModal(lvl)}
                      disabled={lvl.status === "ARCHIVED"}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-xs font-semibold"
                    >
                      Sửa
                    </button>

                    {lvl.status !== "ARCHIVED" && (
                      <button
                        onClick={() => handleArchive(lvl.levelId)}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-semibold"
                      >
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#EFE9E1]">
              <h2 className="text-xl font-bold text-[#C65D4B] mb-4">
                {editingLevel ? `Chỉnh Sửa Level (${editingLevel.code})` : "Tạo Trình Độ Mới"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!editingLevel && (
                  <div>
                    <label className="block text-xs font-bold text-[#6E5E52] mb-1">Mã Trình Độ (Code)</label>
                    <select
                      value={formCode}
                      onChange={(e) => setFormCode(e.target.value)}
                      className="w-full p-2.5 border border-[#D9CEB2] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#C65D4B] outline-none"
                    >
                      <option value="N5">N5 (Sơ cấp 1)</option>
                      <option value="N4">N4 (Sơ cấp 2)</option>
                      <option value="N3">N3 (Trung cấp)</option>
                      <option value="N2">N2 (Thượng cấp 1)</option>
                      <option value="N1">N1 (Thượng cấp 2)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#6E5E52] mb-1">Tên Trình Độ (Name)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Trình độ N5 Sơ Cấp"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full p-2.5 border border-[#D9CEB2] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#C65D4B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6E5E52] mb-1">Mô Tả (Description)</label>
                  <textarea
                    rows={3}
                    placeholder="Mô tả tóm tắt nội dung trình độ..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full p-2.5 border border-[#D9CEB2] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#C65D4B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6E5E52] mb-1">Thứ Tự Sắp Xếp (Sort Order)</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={formSortOrder}
                    onChange={(e) => setFormSortOrder(parseInt(e.target.value) || 1)}
                    className="w-full p-2.5 border border-[#D9CEB2] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#C65D4B] outline-none"
                  />
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
                    {submitting ? "Đang lưu..." : editingLevel ? "Cập Nhật" : "Tạo Mới"}
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
