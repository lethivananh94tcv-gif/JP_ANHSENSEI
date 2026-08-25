"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Calendar, Plus, BookOpen, Layers, Users, FileSpreadsheet, 
  ArrowRight, Sparkles, Clock, UserCheck, ShieldCheck, ChevronDown
} from "lucide-react";

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

  const publishedCount = levels.filter((l) => l.status === "PUBLISHED").length || 3;
  const draftCount = levels.filter((l) => l.status === "DRAFT").length || 2;
  const totalLevels = levels.length || 5;

  // Format current date for selector display
  const currentDateStr = "Tháng 10, 2023";

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Top Section: Header Title + Date Selector Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-black text-[#8C7B70] uppercase tracking-widest block">
            HỆ THỐNG QUẢN TRỊ
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2C2421] font-sans tracking-tight">
            Tổng Quan
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6A60] font-medium">
            Theo dõi nhanh hoạt động và tình trạng hệ thống ANH SENSEI.
          </p>
        </div>

        {/* Date Selector Dropdown (Matching Mockup) */}
        <div className="bg-white border border-[#EFE9E1] rounded-2xl px-4 py-2.5 text-xs font-bold text-[#2C2421] shadow-2xs flex items-center gap-2.5 cursor-pointer hover:border-[#C65D4B] transition-colors shrink-0">
          <Calendar className="w-4 h-4 text-[#8C7B70]" />
          <span>Tháng này: {currentDateStr}</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#8C7B70]" />
        </div>
      </div>

      {/* 2. Overview 4 KPI Metric Cards (Matching Exact Mockup Styling) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: TỔNG TRÌNH ĐỘ */}
        <div className="bg-white rounded-3xl p-6 border border-[#EFE9E1] shadow-2xs relative overflow-hidden space-y-4">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FAF3EB] rounded-full pointer-events-none" />
          <span className="text-[11px] font-black text-[#8C7B70] uppercase tracking-wider block relative z-10">
            TỔNG TRÌNH ĐỘ
          </span>
          <div className="text-4xl font-black text-[#2C2421] tracking-tight relative z-10 font-sans">
            {loading ? "..." : totalLevels}
          </div>
          <div className="inline-block bg-[#FAF5F0] border border-[#EADECF] px-3 py-1 rounded-full text-[11px] font-extrabold text-[#76685F] relative z-10">
            N5 • N4 • N3 • N2 • N1
          </div>
        </div>

        {/* Card 2: ĐÃ PUBLISH */}
        <div className="bg-white rounded-3xl p-6 border border-[#EFE9E1] shadow-2xs relative overflow-hidden space-y-4">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FAF3EB] rounded-full pointer-events-none" />
          <span className="text-[11px] font-black text-[#8C7B70] uppercase tracking-wider block relative z-10">
            ĐÃ PUBLISH
          </span>
          <div className="text-4xl font-black text-[#C65D4B] tracking-tight relative z-10 font-sans">
            {loading ? "..." : publishedCount}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#C65D4B] relative z-10">
            <span className="w-2 h-2 rounded-full bg-[#C65D4B] inline-block" />
            <span>Đang hiển thị cho học viên</span>
          </div>
        </div>

        {/* Card 3: BẢN NHÁP */}
        <div className="bg-white rounded-3xl p-6 border border-[#EFE9E1] shadow-2xs relative overflow-hidden space-y-4">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FAF3EB] rounded-full pointer-events-none" />
          <span className="text-[11px] font-black text-[#8C7B70] uppercase tracking-wider block relative z-10">
            BẢN NHÁP
          </span>
          <div className="text-4xl font-black text-[#2C2421] tracking-tight relative z-10 font-sans">
            {loading ? "..." : draftCount}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#8C7B70] relative z-10">
            <span className="w-2 h-2 rounded-full bg-[#8C7B70] inline-block" />
            <span>Cần hoàn thiện</span>
          </div>
        </div>

        {/* Card 4: HỌC LIỆU */}
        <div className="bg-white rounded-3xl p-6 border border-[#EFE9E1] shadow-2xs relative overflow-hidden space-y-4">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FAF3EB] rounded-full pointer-events-none" />
          <span className="text-[11px] font-black text-[#8C7B70] uppercase tracking-wider block relative z-10">
            HỌC LIỆU
          </span>
          <div className="text-4xl font-black text-[#2C2421] tracking-tight relative z-10 font-sans">
            1,248
          </div>
          <div className="text-[11px] font-extrabold text-[#8C7B70] relative z-10">
            Vocabulary &amp; Kanji
          </div>
        </div>
      </div>

      {/* 3. Bottom Grid: Recent Activity Table + Quick Actions (Matching Mockup 2-Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2): Hoạt động gần đây */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#EFE9E1] p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#2C2421] font-sans">
              Hoạt động gần đây
            </h3>
            <Link href="/admin/audit-logs" className="text-xs font-bold text-[#8C7B70] hover:text-[#C65D4B] transition-colors">
              Xem tất cả
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F5EFEA] text-[10px] font-black text-[#8C7B70] uppercase tracking-wider">
                  <th className="pb-3 pr-4">HOẠT ĐỘNG</th>
                  <th className="pb-3 px-4">NỘI DUNG</th>
                  <th className="pb-3 px-4">TÁC GIẢ</th>
                  <th className="pb-3 pl-4 text-right">THỜI GIAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF5F0] text-xs font-bold text-[#2C2421]">
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="py-4 pr-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center text-sm shrink-0">
                      🎯
                    </span>
                    <span className="font-extrabold">Tạo bài học mới</span>
                  </td>
                  <td className="py-4 px-4 text-[#7A6A60] font-semibold">Ngữ pháp N3 - Bài 12</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#FAF3EB] text-[#C65D4B] font-black text-[10px] flex items-center justify-center border border-[#EADECF]">
                        S
                      </span>
                      <span>Sensei A</span>
                    </div>
                  </td>
                  <td className="py-4 pl-4 text-right text-[#8C7B70] font-medium text-[11px]">10 phút trước</td>
                </tr>

                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="py-4 pr-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center text-sm shrink-0">
                      📖
                    </span>
                    <span className="font-extrabold">Cập nhật Quiz</span>
                  </td>
                  <td className="py-4 px-4 text-[#7A6A60] font-semibold">Từ vựng N4 - Bài 5 (Test 2)</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#FAF3EB] text-[#C65D4B] font-black text-[10px] flex items-center justify-center border border-[#EADECF]">
                        A
                      </span>
                      <span>Admin B</span>
                    </div>
                  </td>
                  <td className="py-4 pl-4 text-right text-[#8C7B70] font-medium text-[11px]">1 giờ trước</td>
                </tr>

                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="py-4 pr-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-sm shrink-0">
                      🟢
                    </span>
                    <span className="font-extrabold">Publish bài học</span>
                  </td>
                  <td className="py-4 px-4 text-[#7A6A60] font-semibold">Kanji N5 - Trọn bộ 100 chữ</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#FAF3EB] text-[#7A6A60] font-black text-[10px] flex items-center justify-center border border-[#EADECF]">
                        ⚙️
                      </span>
                      <span>System</span>
                    </div>
                  </td>
                  <td className="py-4 pl-4 text-right text-[#8C7B70] font-medium text-[11px]">Hôm qua</td>
                </tr>

                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="py-4 pr-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center text-sm shrink-0">
                      📥
                    </span>
                    <span className="font-extrabold">Import học liệu</span>
                  </td>
                  <td className="py-4 px-4 text-[#7A6A60] font-semibold">Minna no Nihongo N5 - Bài 1 ➔ 25</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#FAF3EB] text-[#C65D4B] font-black text-[10px] flex items-center justify-center border border-[#EADECF]">
                        A
                      </span>
                      <span>Admin A</span>
                    </div>
                  </td>
                  <td className="py-4 pl-4 text-right text-[#8C7B70] font-medium text-[11px]">2 ngày trước</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (Span 1): ⚡ Thao tác nhanh */}
        <div className="bg-white rounded-3xl border border-[#EFE9E1] p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">⚡</span>
            <h3 className="text-base font-extrabold text-[#2C2421] font-sans">
              Thao tác nhanh
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Tạo Level mới",
                icon: Plus,
                href: "/admin/curriculum",
              },
              {
                title: "Thêm bài học",
                icon: BookOpen,
                href: "/admin/curriculum",
              },
              {
                title: "Tạo Quiz",
                icon: Layers,
                href: "/admin/quizzes",
              },
              {
                title: "Import học liệu",
                icon: FileSpreadsheet,
                href: "/admin/import",
              },
              {
                title: "Quản lý người dùng",
                icon: Users,
                href: "/admin/users",
              },
            ].map((action, idx) => {
              const ActionIcon = action.icon;
              return (
                <Link
                  key={idx}
                  href={action.href}
                  className="flex items-center justify-between p-3.5 bg-white border border-[#EFE9E1] hover:border-[#C65D4B] rounded-2xl transition-all cursor-pointer group shadow-2xs hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF5F0] border border-[#EADECF] flex items-center justify-center text-[#C65D4B] shrink-0">
                      <ActionIcon className="w-4 h-4 text-[#8C7B70] group-hover:text-[#C65D4B] transition-colors" />
                    </div>
                    <span className="text-xs font-black text-[#2C2421] group-hover:text-[#C65D4B] transition-colors">
                      {action.title}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8C7B70] group-hover:text-[#C65D4B] group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
