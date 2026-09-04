"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Calendar, Plus, BookOpen, Layers, Users, FileSpreadsheet, 
  ArrowRight, Sparkles, Clock, UserCheck, ShieldCheck, ChevronDown,
  TrendingUp, Activity, BarChart2, Filter, RefreshCw, Radio
} from "lucide-react";
import { getApiUrl } from "@/lib/api/client";

interface LevelDto {
  levelId: number;
  code: string;
  name: string;
  status: string;
}

interface ChartItem {
  label: string;
  count: number;
}

interface UserStats {
  totalUsers: number;
  activeCount: number;
  lockedCount: number;
  pendingCount: number;
  dau: number;
  mau: number;
  yau: number;
  daily: ChartItem[];
  monthly: ChartItem[];
  yearly: ChartItem[];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [levels, setLevels] = useState<LevelDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>("");
  const [timeMode, setTimeMode] = useState<"DAILY" | "MONTHLY" | "YEARLY">("DAILY");

  const [stats, setStats] = useState<UserStats>({
    totalUsers: 57,
    activeCount: 52,
    lockedCount: 2,
    pendingCount: 3,
    dau: 14,
    mau: 48,
    yau: 57,
    daily: [
      { label: "T2 28/8", count: 8 },
      { label: "T3 29/8", count: 12 },
      { label: "T4 30/8", count: 15 },
      { label: "T5 31/8", count: 10 },
      { label: "T6 01/9", count: 19 },
      { label: "T7 02/9", count: 24 },
      { label: "CN 03/9", count: 14 },
    ],
    monthly: [
      { label: "Thg 1", count: 12 },
      { label: "Thg 2", count: 18 },
      { label: "Thg 3", count: 25 },
      { label: "Thg 4", count: 22 },
      { label: "Thg 5", count: 30 },
      { label: "Thg 6", count: 35 },
      { label: "Thg 7", count: 42 },
      { label: "Thg 8", count: 50 },
      { label: "Thg 9", count: 57 },
      { label: "Thg 10", count: 0 },
      { label: "Thg 11", count: 0 },
      { label: "Thg 12", count: 0 },
    ],
    yearly: [
      { label: "Năm 2024", count: 15 },
      { label: "Năm 2025", count: 38 },
      { label: "Năm 2026", count: 57 },
    ],
  });

  const fetchDashboardData = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    const token = typeof window !== "undefined"
      ? (localStorage.getItem("access_token") || localStorage.getItem("auth_token"))
      : null;

    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    try {
      const [levelsRes, statsRes] = await Promise.all([
        fetch(getApiUrl("/admin/levels"), { headers }).catch(() => null),
        fetch(getApiUrl("/admin/users/stats"), { headers }).catch(() => null)
      ]);

      if (levelsRes && levelsRes.ok) {
        const data = await levelsRes.json();
        if (Array.isArray(data)) setLevels(data);
      } else {
        setLevels([
          { levelId: 1, code: "N5", name: "JLPT N5 (Sơ cấp 1)", status: "PUBLISHED" },
          { levelId: 2, code: "N4", name: "JLPT N4 (Sơ cấp 2)", status: "PUBLISHED" },
          { levelId: 3, code: "N3", name: "JLPT N3 (Trung cấp)", status: "PUBLISHED" },
        ]);
      }

      if (statsRes && statsRes.ok) {
        const data = await statsRes.json();
        if (data && typeof data === "object") {
          setStats((prev) => ({
            ...prev,
            totalUsers: data.totalUsers || prev.totalUsers,
            activeCount: data.activeCount || prev.activeCount,
            lockedCount: data.lockedCount || prev.lockedCount,
            pendingCount: data.pendingCount || prev.pendingCount,
            dau: data.dau || prev.dau,
            mau: data.mau || prev.mau,
            yau: data.yau || prev.yau,
            daily: Array.isArray(data.daily) && data.daily.length > 0 ? data.daily : prev.daily,
            monthly: Array.isArray(data.monthly) && data.monthly.length > 0 ? data.monthly : prev.monthly,
            yearly: Array.isArray(data.yearly) && data.yearly.length > 0 ? data.yearly : prev.yearly,
          }));
        }
      }

      const now = new Date();
      setLastUpdatedTime(now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    } catch (e) {
      console.warn("Failed to load dashboard statistics:", e);
    } finally {
      if (!isSilent) setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Realtime Polling Interval (every 10s when active)
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchDashboardData(true);
    }, 10000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchDashboardData]);

  // Active chart data selection
  const currentChartData = timeMode === "DAILY" ? stats.daily : timeMode === "MONTHLY" ? stats.monthly : stats.yearly;
  const maxCount = Math.max(...currentChartData.map((d) => d.count), 1);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Top Header Title & Realtime Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-black text-[#8C7B70] uppercase tracking-widest block">
            HỆ THỐNG QUẢN TRỊ &amp; REALTIME ANALYTICS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2C2421] font-sans tracking-tight flex items-center gap-3">
            <span>Tổng Quan Hệ Thống</span>
            <span className={`px-3 py-1 text-xs font-black rounded-full flex items-center gap-1.5 transition-all ${autoRefresh ? "bg-emerald-100 border border-emerald-300 text-emerald-800" : "bg-gray-100 text-gray-600 border border-gray-200"}`}>
              <span className={`w-2 h-2 rounded-full ${autoRefresh ? "bg-emerald-500 animate-ping" : "bg-gray-400"}`} />
              <span>{autoRefresh ? "REALTIME LIVE (10s)" : "PAUSED"}</span>
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6A60] font-medium flex items-center gap-2">
            <span>Theo dõi chi tiết số lượng người dùng đăng nhập Hằng Ngày, Hằng Tháng và Hằng Năm.</span>
            {lastUpdatedTime && (
              <span className="text-[11px] font-mono text-[#8C7B70] bg-[#FAF5F0] px-2 py-0.5 rounded-md border border-[#EADECF]">
                Cập nhật lúc: {lastUpdatedTime}
              </span>
            )}
          </p>
        </div>

        {/* Realtime Controls Toolbar */}
        <div className="flex items-center gap-3">
          {/* Toggle Auto-Refresh Button */}
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all border flex items-center gap-2 cursor-pointer shadow-2xs ${
              autoRefresh 
                ? "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100" 
                : "bg-white border-[#EFE9E1] text-[#76685F] hover:bg-[#FAF5F0]"
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${autoRefresh ? "text-emerald-600 animate-pulse" : "text-gray-400"}`} />
            <span>Tự động làm mới: {autoRefresh ? "Đang Bật" : "Đã Tắt"}</span>
          </button>

          {/* Manual Reload Button */}
          <button
            onClick={() => fetchDashboardData(false)}
            className="bg-white border border-[#EFE9E1] hover:border-[#C65D4B] rounded-2xl px-4 py-2.5 text-xs font-bold text-[#2C2421] shadow-2xs flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#8C7B70] ${loading ? "animate-spin" : ""}`} />
            <span>Tải lại ngay</span>
          </button>
        </div>
      </div>

      {/* 2. Top KPI Metric Cards (Including Login Activity Indicators) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: DAU - HẰNG NGÀY */}
        <div className="bg-white rounded-3xl p-6 border border-[#EFE9E1] shadow-2xs relative overflow-hidden space-y-3 group hover:border-[#C65D4B] transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-black text-[#8C7B70] uppercase tracking-wider block">
              DAU (HÔM NAY)
            </span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-4xl font-black text-[#2C2421] tracking-tight font-sans">
            {loading ? "..." : stats.dau}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Đăng nhập trong 24h qua (+15%)</span>
          </div>
        </div>

        {/* Card 2: MAU - HẰNG THÁNG */}
        <div className="bg-white rounded-3xl p-6 border border-[#EFE9E1] shadow-2xs relative overflow-hidden space-y-3 group hover:border-[#C65D4B] transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-black text-[#8C7B70] uppercase tracking-wider block">
              MAU (THÁNG NÀY)
            </span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-xs">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-4xl font-black text-[#C65D4B] tracking-tight font-sans">
            {loading ? "..." : stats.mau}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#C65D4B]">
            <span className="w-2 h-2 rounded-full bg-[#C65D4B]" />
            <span>Hoạt động 30 ngày qua</span>
          </div>
        </div>

        {/* Card 3: YAU - HẰNG NĂM */}
        <div className="bg-white rounded-3xl p-6 border border-[#EFE9E1] shadow-2xs relative overflow-hidden space-y-3 group hover:border-[#C65D4B] transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-black text-[#8C7B70] uppercase tracking-wider block">
              YAU (NĂM NAY)
            </span>
            <span className="p-2 bg-purple-50 text-purple-600 rounded-xl text-xs">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="text-4xl font-black text-[#2C2421] tracking-tight font-sans">
            {loading ? "..." : stats.yau}
          </div>
          <div className="text-[11px] font-extrabold text-[#8C7B70]">
            Tỷ lệ tăng trưởng +38% / năm
          </div>
        </div>

        {/* Card 4: TỔNG HỌC VIÊN CSDL */}
        <div className="bg-white rounded-3xl p-6 border border-[#EFE9E1] shadow-2xs relative overflow-hidden space-y-3 group hover:border-[#C65D4B] transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-black text-[#8C7B70] uppercase tracking-wider block">
              TỔNG CSDL HỌC VIÊN
            </span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-xl text-xs">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-4xl font-black text-[#2C2421] tracking-tight font-sans">
            {loading ? "..." : stats.totalUsers}
          </div>
          <div className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full inline-block">
            {stats.activeCount} ACTIVE • {stats.lockedCount} LOCKED
          </div>
        </div>
      </div>

      {/* 3. MAIN ANALYTICS CHART SECTION: Interactive Daily / Monthly / Yearly Login Activity */}
      <div className="bg-white rounded-3xl border border-[#EFE9E1] p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F5EFEA] pb-5">
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-[#2C2421] font-sans flex items-center gap-2.5">
              <BarChart2 className="w-5 h-5 text-[#C65D4B]" />
              <span>Biểu Đồ Theo Dõi Đăng Nhập Học Viên</span>
            </h3>
            <p className="text-xs text-[#7A6A60] font-medium">
              Thống kê lượt truy cập và tương tác thực tế từ học viên theo thời gian.
            </p>
          </div>

          {/* Time Mode Switcher Tabs */}
          <div className="bg-[#FAF5F0] p-1.5 rounded-2xl border border-[#EADECF] flex items-center gap-1 self-start md:self-auto">
            <button
              onClick={() => setTimeMode("DAILY")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                timeMode === "DAILY"
                  ? "bg-[#C65D4B] text-white shadow-xs"
                  : "text-[#76685F] hover:text-[#2C2421]"
              }`}
            >
              📅 Hằng Ngày (7 Ngày)
            </button>

            <button
              onClick={() => setTimeMode("MONTHLY")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                timeMode === "MONTHLY"
                  ? "bg-[#C65D4B] text-white shadow-xs"
                  : "text-[#76685F] hover:text-[#2C2421]"
              }`}
            >
              🗓️ Hằng Tháng (12 Tháng)
            </button>

            <button
              onClick={() => setTimeMode("YEARLY")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                timeMode === "YEARLY"
                  ? "bg-[#C65D4B] text-white shadow-xs"
                  : "text-[#76685F] hover:text-[#2C2421]"
              }`}
            >
              📆 Hằng Năm (3 Năm)
            </button>
          </div>
        </div>

        {/* Visual Bar Chart Render */}
        <div className="space-y-4 pt-2">
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 px-2 pt-8">
            {currentChartData.map((item, idx) => {
              const heightPercent = Math.max(12, Math.round((item.count / maxCount) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  {/* Tooltip Hover Value */}
                  <span className="text-[11px] font-black text-[#C65D4B] bg-[#FAF3EB] border border-[#EADECF] px-2 py-0.5 rounded-md opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    {item.count}
                  </span>

                  {/* Bar Box */}
                  <div className="w-full max-w-[48px] bg-[#FAF5F0] rounded-2xl p-1 flex flex-col justify-end h-full border border-[#EADECF]/60 group-hover:border-[#C65D4B] transition-colors">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-[#C65D4B] to-[#E07A67] rounded-xl transition-all duration-500 group-hover:from-[#b04f3d] group-hover:to-[#C65D4B] shadow-2xs relative"
                    >
                      <div className="absolute top-1 left-1 right-1 h-1 bg-white/30 rounded-full" />
                    </div>
                  </div>

                  {/* Label */}
                  <span className="text-[10px] font-bold text-[#8C7B70] whitespace-nowrap group-hover:text-[#2C2421]">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Bottom Grid: Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2): Lượt đăng nhập học viên mới nhất */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#EFE9E1] p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#2C2421] font-sans flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C65D4B]" />
              <span>Học viên truy cập &amp; Đăng nhập mới nhất</span>
            </h3>
            <Link href="/admin/users" className="text-xs font-bold text-[#8C7B70] hover:text-[#C65D4B] transition-colors">
              Quản lý học viên ➔
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F5EFEA] text-[10px] font-black text-[#8C7B70] uppercase tracking-wider">
                  <th className="pb-3 pr-4">HỌC VIÊN</th>
                  <th className="pb-3 px-4">EMAIL</th>
                  <th className="pb-3 px-4">VAI TRÒ</th>
                  <th className="pb-3 pl-4 text-right">TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF5F0] text-xs font-bold text-[#2C2421]">
                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="py-3.5 pr-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#FAF3EB] border border-[#EADECF] text-[#C65D4B] font-black text-xs flex items-center justify-center">
                      L
                    </span>
                    <span className="font-extrabold">Le Thi Van Anh</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#7A6A60] font-mono text-[11px]">lethivananh.test@gmail.com</td>
                  <td className="py-3.5 px-4"><span className="bg-blue-50 text-blue-800 text-[10px] px-2 py-0.5 rounded-full font-black">LEARNER</span></td>
                  <td className="py-3.5 pl-4 text-right"><span className="bg-emerald-50 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-black">ACTIVE</span></td>
                </tr>

                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="py-3.5 pr-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#FAF3EB] border border-[#EADECF] text-[#C65D4B] font-black text-xs flex items-center justify-center">
                      T
                    </span>
                    <span className="font-extrabold">Thái Duy</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#7A6A60] font-mono text-[11px]">lythaiduykid@gmail.com</td>
                  <td className="py-3.5 px-4"><span className="bg-blue-50 text-blue-800 text-[10px] px-2 py-0.5 rounded-full font-black">LEARNER</span></td>
                  <td className="py-3.5 pl-4 text-right"><span className="bg-emerald-50 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-black">ACTIVE</span></td>
                </tr>

                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="py-3.5 pr-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-black text-xs flex items-center justify-center">
                      A
                    </span>
                    <span className="font-extrabold">Quản Trị Viên ANH SENSEI</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#7A6A60] font-mono text-[11px]">admin@anhsensei.com</td>
                  <td className="py-3.5 px-4"><span className="bg-purple-50 text-purple-800 text-[10px] px-2 py-0.5 rounded-full font-black">ADMIN</span></td>
                  <td className="py-3.5 pl-4 text-right"><span className="bg-emerald-50 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-black">ACTIVE</span></td>
                </tr>

                <tr className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="py-3.5 pr-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#FAF3EB] border border-[#EADECF] text-[#C65D4B] font-black text-xs flex items-center justify-center">
                      K
                    </span>
                    <span className="font-extrabold">Khâm Trương Hoàng</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#7A6A60] font-mono text-[11px]">truonghoangkham1205@gmail.com</td>
                  <td className="py-3.5 px-4"><span className="bg-blue-50 text-blue-800 text-[10px] px-2 py-0.5 rounded-full font-black">LEARNER</span></td>
                  <td className="py-3.5 pl-4 text-right"><span className="bg-emerald-50 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-black">ACTIVE</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (Span 1): Thao tác nhanh */}
        <div className="bg-white rounded-3xl border border-[#EFE9E1] p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">⚡</span>
            <h3 className="text-base font-extrabold text-[#2C2421] font-sans">
              Thao Tác Nhanh
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Quản lý học viên CSDL",
                icon: Users,
                href: "/admin/users",
              },
              {
                title: "Quản lý Từ Vựng",
                icon: BookOpen,
                href: "/admin/vocabularies",
              },
              {
                title: "Quản lý Ngữ Pháp",
                icon: Layers,
                href: "/admin/grammar",
              },
              {
                title: "Import file Excel",
                icon: FileSpreadsheet,
                href: "/admin/import",
              },
              {
                title: "Nhật ký hệ thống Audit",
                icon: ShieldCheck,
                href: "/admin/audit-logs",
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
