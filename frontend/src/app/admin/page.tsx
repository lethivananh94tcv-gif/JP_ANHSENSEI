"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LevelDto {
  levelId: number;
  code: string;
  name: string;
  status: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [levels, setLevels] = useState<LevelDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Level Stats
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
        const res = await fetch("http://localhost:8080/api/v1/admin/levels", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user");
          router.replace("/login");
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setLevels(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  const publishedCount = levels.filter((l) => l.status === "PUBLISHED").length;
  const draftCount = levels.filter((l) => l.status === "DRAFT").length;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-[#2C2421] to-[#4A3B34] text-white rounded-3xl p-8 shadow-xl flex justify-between items-center relative overflow-hidden">
        <div className="space-y-2 z-10 max-w-2xl">
          <span className="bg-[#C65D4B] px-3 py-1 rounded-full text-xs font-bold tracking-wide">
            ⚡ HỆ THỐNG QUẢN TRỊ TRUNG TÂM
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Tổng Quan Chương Trình Học
          </h1>
          <p className="text-white/80 text-sm leading-relaxed">
            Quản lý toàn bộ chương trình học tiếng Nhật JLPT (N5 - N1), các bài học, học liệu từ vựng - ngữ pháp - hán tự và xuất bản cho học viên.
          </p>
        </div>
        <div className="hidden lg:flex text-9xl font-black text-white/10 select-none">
          ⛩️
        </div>
      </div>

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#EFE9E1] shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#6E5E52] uppercase">Tổng Trình Độ (Levels)</span>
            <span className="text-2xl">🎯</span>
          </div>
          <p className="text-3xl font-black text-[#C65D4B]">{loading ? "..." : levels.length}</p>
          <p className="text-xs text-[#8C7B70]">N5, N4, N3, N2, N1</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#EFE9E1] shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#6E5E52] uppercase">Trình Độ Đã Publish</span>
            <span className="text-2xl">✓</span>
          </div>
          <p className="text-3xl font-black text-green-600">{loading ? "..." : publishedCount}</p>
          <p className="text-xs text-green-700 font-semibold">Đã công khai cho Học viên</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#EFE9E1] shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#6E5E52] uppercase">Trình Độ Nháp (Draft)</span>
            <span className="text-2xl">📝</span>
          </div>
          <p className="text-3xl font-black text-amber-600">{loading ? "..." : draftCount}</p>
          <p className="text-xs text-amber-700 font-semibold">Đang trong quá trình biên soạn</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#EFE9E1] shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#6E5E52] uppercase">Học Liệu &amp; Bài Học</span>
            <span className="text-2xl">📚</span>
          </div>
          <p className="text-3xl font-black text-[#2C2421]">Vocab/Kanji</p>
          <p className="text-xs text-[#8C7B70]">Tự động đồng bộ hóa DB</p>
        </div>
      </div>

      {/* Feature Management Modules */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-[#2C2421]">Danh Mục Quản Trị Hệ Thống</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Module 1: Curriculum Management */}
          <div className="bg-[#FFFCF7] rounded-2xl border-2 border-[#C65D4B]/30 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="w-12 h-12 rounded-2xl bg-[#FAF3EB] border border-[#E4D9CD] text-2xl flex items-center justify-center text-[#C65D4B] font-bold">
                  📖
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  Hoạt động
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#332A24] group-hover:text-[#C65D4B] transition-colors">
                Quản Lý Curriculum
              </h3>
              <p className="text-xs text-[#76685F] leading-relaxed">
                Tạo Level (N5-N3), tạo Lesson, thêm Vocabulary, Kanji, Ngữ pháp &amp; Publish.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E4D9CD]/50">
              <Link
                href="/admin/curriculum"
                className="w-full block text-center bg-[#C65D4B] hover:bg-[#b04f3f] text-white font-bold text-xs py-2.5 rounded-xl shadow transition-colors"
              >
                Quản Lý Curriculum ➔
              </Link>
            </div>
          </div>

          {/* Module 2: Strict Excel Import */}
          <div className="bg-[#FFFCF7] rounded-2xl border-2 border-[#8B6F5A]/30 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="w-12 h-12 rounded-2xl bg-[#FAF3EB] border border-[#E4D9CD] text-2xl flex items-center justify-center text-[#8B6F5A] font-bold">
                  📥
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  Strict Import
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#332A24] group-hover:text-[#8B6F5A] transition-colors">
                Nạp Excel Học Liệu
              </h3>
              <p className="text-xs text-[#76685F] leading-relaxed">
                Import hàng loạt từ vựng, hán tự, ngữ pháp bằng tệp .xlsx chuẩn BR-IMP.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E4D9CD]/50">
              <Link
                href="/admin/import"
                className="w-full block text-center bg-[#8B6F5A] hover:bg-[#775e4c] text-white font-bold text-xs py-2.5 rounded-xl shadow transition-colors"
              >
                Import Excel Wizard ➔
              </Link>
            </div>
          </div>

          {/* Module 3: User Management */}
          <div className="bg-[#FFFCF7] rounded-2xl border border-[#E4D9CD] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="w-12 h-12 rounded-2xl bg-[#FAF3EB] border border-[#E4D9CD] text-2xl flex items-center justify-center text-[#8B6F5A]">
                  👥
                </span>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  Phân Quyền
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#332A24] group-hover:text-[#8B6F5A] transition-colors">
                Quản Lý Người Dùng
              </h3>
              <p className="text-xs text-[#76685F] leading-relaxed">
                Danh sách tài khoản, Khóa (Revoke refresh tokens) &amp; Mở khóa an toàn.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E4D9CD]/50">
              <Link
                href="/admin/users"
                className="w-full block text-center bg-[#FAF3EB] hover:bg-[#F3E7DB] text-[#8B6F5A] font-bold text-xs py-2.5 rounded-xl border border-[#E4D9CD] transition-colors"
              >
                Quản Lý User ➔
              </Link>
            </div>
          </div>

          {/* Module 4: Audit Logs */}
          <div className="bg-[#FFFCF7] rounded-2xl border border-[#E4D9CD] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="w-12 h-12 rounded-2xl bg-[#FAF3EB] border border-[#E4D9CD] text-2xl flex items-center justify-center text-[#8B6F5A]">
                  📋
                </span>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  Audit Log
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#332A24] group-hover:text-[#8B6F5A] transition-colors">
                Nhật Ký Hoạt Động
              </h3>
              <p className="text-xs text-[#76685F] leading-relaxed">
                Tra cứu mọi thao tác CSDL, thay đổi trạng thái, import tệp &amp; lịch sử log.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E4D9CD]/50">
              <Link
                href="/admin/audit-logs"
                className="w-full block text-center bg-[#FAF3EB] hover:bg-[#F3E7DB] text-[#8B6F5A] font-bold text-xs py-2.5 rounded-xl border border-[#E4D9CD] transition-colors"
              >
                Xem Audit Logs ➔
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Levels Status Table */}
      <div className="bg-white rounded-2xl border border-[#EFE9E1] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-[#2C2421]">Danh Sách Trình Độ Trực Quan</h3>
          <Link href="/admin/curriculum" className="text-xs font-bold text-[#C65D4B] hover:underline">
            Quản lý chi tiết ➔
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {levels.map((lvl) => (
            <div key={lvl.levelId} className="bg-[#FAF3EB]/50 p-4 rounded-xl border border-[#F2E3D5] space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-black text-[#C65D4B]">{lvl.code}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  lvl.status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                }`}>
                  {lvl.status}
                </span>
              </div>
              <p className="text-xs font-bold text-[#2C2421] truncate">{lvl.name}</p>
              <Link
                href={`/admin/curriculum/levels/${lvl.levelId}/lessons`}
                className="block text-center text-[11px] font-bold text-[#C65D4B] bg-white py-1 rounded-lg border border-[#F2E3D5] hover:bg-[#C65D4B] hover:text-white transition-colors"
              >
                Xem bài học
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
