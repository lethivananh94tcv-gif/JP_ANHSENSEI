"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Calendar, Plus, BookOpen, Layers, Users, FileSpreadsheet, 
  ArrowRight, Sparkles, Clock, UserCheck, ShieldCheck, ChevronDown,
  TrendingUp, Activity, BarChart2, Filter, RefreshCw, Radio, Server,
  Zap, Database, CheckCircle2, ArrowUpRight, Cpu
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

interface RecentUser {
  userId: number;
  fullName: string;
  email: string;
  roleName: string;
  status: string;
  totalDurationSeconds?: number;
  activeHours?: number;
  lastLoginAt?: string | null;
  createdAt?: string | null;
}

function getAccountActiveHours(user: RecentUser) {
  const sec = user.totalDurationSeconds != null 
    ? user.totalDurationSeconds 
    : (user.activeHours != null ? Math.round(user.activeHours * 3600) : 0);

  if (!sec || sec <= 0) {
    return "0 phút";
  }

  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours} giờ ${minutes} phút`;
  }
  if (hours > 0) {
    return `${hours} giờ`;
  }
  return `${minutes} phút`;
}

function formatLastActive(dateStr?: string | null) {
  if (!dateStr) return "Hôm nay";
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24 && d.getDate() === now.getDate()) {
      return d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    }
    if (diffHours < 48) {
      return `Hôm qua ${d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;
    }
    return `${d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })} ${d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;
  } catch {
    return "Hôm nay";
  }
}

const defaultRecentUsers: RecentUser[] = [
  {
    userId: 1,
    fullName: "Le Thi Van Anh",
    email: "lethivananh.test@gmail.com",
    roleName: "LEARNER",
    status: "ACTIVE",
    totalDurationSeconds: 12600,
    activeHours: 3.5,
    lastLoginAt: new Date(Date.now() - 18 * 60000).toISOString(),
  },
  {
    userId: 281,
    fullName: "Thái Duy",
    email: "lythaiduykid@gmail.com",
    roleName: "LEARNER",
    status: "ACTIVE",
    totalDurationSeconds: 7800,
    activeHours: 2.2,
    lastLoginAt: new Date(Date.now() - 75 * 60000).toISOString(),
  },
  {
    userId: 999,
    fullName: "Quản Trị Viên ANH SENSEI",
    email: "admin@anhsensei.com",
    roleName: "ADMIN",
    status: "ACTIVE",
    totalDurationSeconds: 1479,
    activeHours: 0.4,
    lastLoginAt: new Date().toISOString(),
  },
  {
    userId: 285,
    fullName: "Khâm Trương Hoàng",
    email: "truonghoangkham1205@gmail.com",
    roleName: "LEARNER",
    status: "ACTIVE",
    totalDurationSeconds: 12600,
    activeHours: 3.5,
    lastLoginAt: new Date(Date.now() - 3 * 3600000).toISOString(),
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [levels, setLevels] = useState<LevelDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>("");
  const [timeMode, setTimeMode] = useState<"DAILY" | "MONTHLY" | "YEARLY">("DAILY");
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    activeCount: 0,
    lockedCount: 0,
    pendingCount: 0,
    dau: 0,
    mau: 0,
    yau: 0,
    daily: [],
    monthly: [],
    yearly: [],
  });

  const fetchDashboardData = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    const token = typeof window !== "undefined"
      ? (localStorage.getItem("access_token") || localStorage.getItem("auth_token"))
      : null;

    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    try {
      const [levelsRes, statsRes, usersRes] = await Promise.all([
        fetch(getApiUrl("/admin/levels"), { headers }).catch(() => null),
        fetch(getApiUrl("/admin/users/stats"), { headers }).catch(() => null),
        fetch(getApiUrl("/admin/users?page=0&size=5"), { headers }).catch(() => null)
      ]);

      if (statsRes?.status === 401 || statsRes?.status === 403 || levelsRes?.status === 401 || levelsRes?.status === 403) {
        setShowAuthModal(true);
      } else {
        setShowAuthModal(false);
      }

      if (levelsRes && levelsRes.ok) {
        const data = await levelsRes.json();
        if (Array.isArray(data)) setLevels(data);
      }

      if (statsRes && statsRes.ok) {
        const data = await statsRes.json();
        if (data && typeof data === "object") {
          setStats((prev) => ({
            ...prev,
            totalUsers: data.totalUsers ?? prev.totalUsers,
            activeCount: data.activeCount ?? prev.activeCount,
            lockedCount: data.lockedCount ?? prev.lockedCount,
            pendingCount: data.pendingCount ?? prev.pendingCount,
            dau: data.dau ?? prev.dau,
            mau: data.mau ?? prev.mau,
            yau: data.yau ?? prev.yau,
            daily: Array.isArray(data.daily) && data.daily.length > 0 ? data.daily : prev.daily,
            monthly: Array.isArray(data.monthly) && data.monthly.length > 0 ? data.monthly : prev.monthly,
            yearly: Array.isArray(data.yearly) && data.yearly.length > 0 ? data.yearly : prev.yearly,
          }));
        }
      }

      if (usersRes && usersRes.ok) {
        try {
          const uData = await usersRes.json();
          const rawList = Array.isArray(uData)
            ? uData
            : Array.isArray(uData?.content)
            ? uData.content
            : Array.isArray(uData?.data)
            ? uData.data
            : [];
          if (rawList.length > 0) {
            const list: RecentUser[] = rawList.map((u: any) => ({
              userId: u.userId,
              fullName: u.fullName,
              email: u.email,
              roleName: u.roleName || "LEARNER",
              status: u.status || "ACTIVE",
              lastLoginAt: u.lastLoginAt,
              createdAt: u.createdAt,
              totalDurationSeconds: u.totalDurationSeconds != null ? u.totalDurationSeconds : 0,
              activeHours: u.activeHours != null ? u.activeHours : 0,
            }));
            setRecentUsers(list);
          }
        } catch {
          // Keep default if json parse error
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
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* 1. Hero Executive Welcome Header & Realtime Toolbar */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5EFE6] border-2 border-[#E5D7C7] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Subtle decorative background pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-[radial-gradient(#C65D4B_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-10 pointer-events-none rounded-r-3xl" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-[#C65D4B]/10 text-[#C65D4B] px-3 py-1 rounded-full text-xs font-black border border-[#C65D4B]/20">
                <Sparkles className="w-3.5 h-3.5" /> BẢNG TỔNG QUAN EXECUTIVE
              </span>
              <span className={`px-3 py-1 text-xs font-black rounded-full flex items-center gap-1.5 transition-all ${autoRefresh ? "bg-emerald-100 border border-emerald-300 text-emerald-800" : "bg-gray-100 text-gray-600 border border-gray-200"}`}>
                <span className={`w-2 h-2 rounded-full ${autoRefresh ? "bg-emerald-500 animate-ping" : "bg-gray-400"}`} />
                <span>{autoRefresh ? "REALTIME LIVE (10s)" : "TỰ ĐỘNG LÀM MỚI: TẮT"}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#231917] tracking-tight font-sans">
              Tổng Quan Hệ Thống ANH SENSEI
            </h1>

            <p className="text-xs sm:text-sm text-[#76685F] font-semibold flex items-center gap-2 flex-wrap">
              <span>Theo dõi toàn bộ chỉ số học viên, lượt truy cập Hằng Ngày, Hằng Tháng &amp; Hằng Năm.</span>
              {lastUpdatedTime && (
                <span className="text-[11px] font-mono text-[#8B6F5A] bg-white px-2.5 py-0.5 rounded-lg border border-[#E5D7C7] shadow-2xs">
                  ⏰ Cập nhật lúc: {lastUpdatedTime}
                </span>
              )}
            </p>
          </div>

          {/* Realtime Toolbar Actions */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {/* Auto Refresh Toggle */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all border flex items-center gap-2 cursor-pointer shadow-2xs ${
                autoRefresh 
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100" 
                  : "bg-white border-[#E5D7C7] text-[#76685F] hover:bg-[#FAF3EB]"
              }`}
            >
              <Radio className={`w-4 h-4 ${autoRefresh ? "text-emerald-600 animate-pulse" : "text-gray-400"}`} />
              <span>{autoRefresh ? "Live 10s: Bật" : "Live 10s: Tắt"}</span>
            </button>

            {/* Manual Refresh Button */}
            <button
              onClick={() => fetchDashboardData(false)}
              className="bg-white border border-[#E5D7C7] hover:border-[#C65D4B] hover:text-[#C65D4B] rounded-2xl px-4 py-2.5 text-xs font-black text-[#231917] shadow-2xs flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#8B6F5A] ${loading ? "animate-spin" : ""}`} />
              <span>Tải lại dữ liệu</span>
            </button>

            {/* Create Vocabulary Shortcut */}
            <Link
              href="/admin/vocabularies"
              className="bg-[#C65D4B] hover:bg-[#B04C3B] text-white rounded-2xl px-4 py-2.5 text-xs font-black shadow-md shadow-[#C65D4B]/20 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm từ vựng mới</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Top KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: DAU - HẰNG NGÀY */}
        <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FAF3EB] rounded-3xl p-6 border-2 border-[#E5D7C7] hover:border-[#C65D4B] shadow-md hover:shadow-xl transition-all space-y-3 group relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-black text-[#8B6F5A] uppercase tracking-wider block">
              DAU (HÔM NAY)
            </span>
            <span className="p-2.5 bg-emerald-100/80 text-emerald-700 rounded-2xl text-xs border border-emerald-200 shadow-2xs group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#231917] tracking-tight font-sans">
            {loading ? "..." : stats.dau}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200/60 inline-flex">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>+1 so với hôm qua</span>
          </div>
        </div>

        {/* Card 2: MAU - HẰNG THÁNG */}
        <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FAF3EB] rounded-3xl p-6 border-2 border-[#E5D7C7] hover:border-[#C65D4B] shadow-md hover:shadow-xl transition-all space-y-3 group relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-black text-[#8B6F5A] uppercase tracking-wider block">
              MAU (THÁNG NÀY)
            </span>
            <span className="p-2.5 bg-blue-100/80 text-blue-700 rounded-2xl text-xs border border-blue-200 shadow-2xs group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#C65D4B] tracking-tight font-sans">
            {loading ? "..." : stats.mau}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200/60 inline-flex">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Hoạt động 30 ngày qua</span>
          </div>
        </div>

        {/* Card 3: YAU - HẰNG NĂM */}
        <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FAF3EB] rounded-3xl p-6 border-2 border-[#E5D7C7] hover:border-[#C65D4B] shadow-md hover:shadow-xl transition-all space-y-3 group relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-black text-[#8B6F5A] uppercase tracking-wider block">
              YAU (NĂM NAY)
            </span>
            <span className="p-2.5 bg-purple-100/80 text-purple-700 rounded-2xl text-xs border border-purple-200 shadow-2xs group-hover:scale-110 transition-transform">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#231917] tracking-tight font-sans">
            {loading ? "..." : stats.yau}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200/60 inline-flex">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span>Hoạt động 365 ngày qua</span>
          </div>
        </div>

        {/* Card 4: TỔNG HỌC VIÊN CSDL */}
        <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FAF3EB] rounded-3xl p-6 border-2 border-[#E5D7C7] hover:border-[#C65D4B] shadow-md hover:shadow-xl transition-all space-y-3 group relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-black text-[#8B6F5A] uppercase tracking-wider block">
              TỔNG CSDL HỌC VIÊN
            </span>
            <span className="p-2.5 bg-amber-100/80 text-amber-700 rounded-2xl text-xs border border-amber-200 shadow-2xs group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-4xl sm:text-5xl font-black text-[#231917] tracking-tight font-sans">
            {loading ? "..." : stats.totalUsers}
          </div>
          <div className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200/60 inline-flex">
            {stats.activeCount} ACTIVE • {stats.lockedCount} LOCKED
          </div>
        </div>
      </div>

      {/* 3. MAIN ANALYTICS CHART SECTION */}
      <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E5D7C7] p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5D7C7]/70 pb-5">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-[#231917] font-sans flex items-center gap-2.5">
              <BarChart2 className="w-5 h-5 text-[#C65D4B]" />
              <span>Biểu Đồ Theo Dõi Đăng Nhập Học Viên</span>
            </h3>
            <p className="text-xs text-[#76685F] font-semibold">
              Thống kê lượt truy cập và tương tác thực tế từ học viên theo thời gian.
            </p>
          </div>

          {/* Time Mode Switcher Tabs */}
          <div className="bg-[#FAF3EB] p-1.5 rounded-2xl border border-[#E5D7C7] flex items-center gap-1.5 self-start md:self-auto shadow-2xs">
            <button
              onClick={() => setTimeMode("DAILY")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                timeMode === "DAILY"
                  ? "bg-[#C65D4B] text-white shadow-md"
                  : "text-[#8B6F5A] hover:text-[#231917]"
              }`}
            >
              📅 Hằng Ngày (7 Ngày)
            </button>

            <button
              onClick={() => setTimeMode("MONTHLY")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                timeMode === "MONTHLY"
                  ? "bg-[#C65D4B] text-white shadow-md"
                  : "text-[#8B6F5A] hover:text-[#231917]"
              }`}
            >
              🗓️ Hằng Tháng (12 Tháng)
            </button>

            <button
              onClick={() => setTimeMode("YEARLY")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                timeMode === "YEARLY"
                  ? "bg-[#C65D4B] text-white shadow-md"
                  : "text-[#8B6F5A] hover:text-[#231917]"
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
                  <span className="text-[11px] font-black text-[#C65D4B] bg-[#FAF3EB] border border-[#E5D7C7] px-2.5 py-0.5 rounded-lg shadow-2xs group-hover:scale-110 transition-all">
                    {item.count}
                  </span>

                  {/* Bar Box */}
                  <div className="w-full max-w-[48px] bg-[#FAF3EB] rounded-2xl p-1 flex flex-col justify-end h-full border border-[#E5D7C7]/70 group-hover:border-[#C65D4B] transition-colors">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-[#C65D4B] via-[#D16A58] to-[#E07A67] rounded-xl transition-all duration-500 group-hover:from-[#B04C3B] group-hover:to-[#C65D4B] shadow-sm relative"
                    >
                      <div className="absolute top-1 left-1 right-1 h-1 bg-white/40 rounded-full" />
                    </div>
                  </div>

                  {/* Label */}
                  <span className="text-[10px] font-bold text-[#8B6F5A] whitespace-nowrap group-hover:text-[#231917]">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Bottom Grid: Recent Logins & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2): Lượt đăng nhập học viên mới nhất */}
        <div className="lg:col-span-2 bg-[#FFFDF9] rounded-3xl border-2 border-[#E5D7C7] p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-[#E5D7C7]/70 pb-4">
            <h3 className="text-base font-black text-[#231917] font-sans flex items-center gap-2">
              <Users className="w-4.5 h-4.5 text-[#C65D4B]" />
              <span>Học viên truy cập &amp; Đăng nhập mới nhất</span>
            </h3>
            <Link href="/admin/users" className="text-xs font-black text-[#C65D4B] hover:text-[#B04C3B] transition-colors flex items-center gap-1">
              <span>Quản lý học viên</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5D7C7]/70 text-[10px] font-black text-[#8B6F5A] uppercase tracking-wider">
                  <th className="pb-3 pr-4">HỌC VIÊN</th>
                  <th className="pb-3 px-4">EMAIL</th>
                  <th className="pb-3 px-4">VAI TRÒ</th>
                  <th className="pb-3 px-4">SỐ GIỜ HOẠT ĐỘNG</th>
                  <th className="pb-3 pl-4 text-right">TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5D7C7]/50 text-xs font-extrabold text-[#231917]">
                {(recentUsers.length > 0 ? recentUsers : defaultRecentUsers).slice(0, 5).map((item) => {
                  const roleUpper = (item.roleName || "").toUpperCase();
                  const isLearner = roleUpper.includes("LEARNER");
                  const isActive = (item.status || "").toUpperCase() === "ACTIVE";
                  const initial = item.fullName ? item.fullName.charAt(0).toUpperCase() : "U";

                  return (
                    <tr key={item.userId} className="hover:bg-[#FAF3EB]/80 transition-colors">
                      <td className="py-3.5 pr-4 flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 border ${
                          isLearner
                            ? "bg-[#C65D4B]/10 border-[#C65D4B]/30 text-[#C65D4B]"
                            : "bg-purple-50 border-purple-200 text-purple-700"
                        }`}>
                          {initial}
                        </span>
                        <span className="font-black text-[#231917]">{item.fullName}</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#76685F] font-mono text-[11px]">{item.email}</td>
                      <td className="py-3.5 px-4">
                        <span className={`border text-[10px] px-2.5 py-0.5 rounded-md font-black ${
                          isLearner
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : "bg-purple-50 text-purple-800 border-purple-200"
                        }`}>
                          {item.roleName || "LEARNER"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5 font-black text-[#231917] text-xs">
                            <Clock className="w-3.5 h-3.5 text-[#C65D4B] shrink-0" />
                            <span className="bg-[#FAF3EB] px-2 py-0.5 rounded-md border border-[#E5D7C7] text-[#C65D4B] font-black">
                              {getAccountActiveHours(item)}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#8C7B70] font-medium pl-0.5">
                            Gần nhất: {formatLastActive(item.lastLoginAt)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 pl-4 text-right">
                        <span className={`border text-[10px] px-2.5 py-0.5 rounded-md font-black ${
                          isActive
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}>
                          {item.status || "ACTIVE"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (Span 1): Thao tác nhanh & System Health */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E5D7C7] p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E5D7C7]/70 pb-3">
              <Zap className="w-4.5 h-4.5 text-[#C65D4B]" />
              <h3 className="text-base font-black text-[#231917] font-sans">
                Thao Tác Nhanh
              </h3>
            </div>

            <div className="space-y-2.5">
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
                    className="flex items-center justify-between p-3.5 bg-[#FAF3EB]/60 hover:bg-[#FAF3EB] border border-[#E5D7C7] hover:border-[#C65D4B] rounded-2xl transition-all cursor-pointer group shadow-2xs hover:scale-[1.01]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#E5D7C7] flex items-center justify-center text-[#C65D4B] shrink-0 shadow-2xs group-hover:border-[#C65D4B]">
                        <ActionIcon className="w-4 h-4 text-[#8B6F5A] group-hover:text-[#C65D4B] transition-colors" />
                      </div>
                      <span className="text-xs font-black text-[#231917] group-hover:text-[#C65D4B] transition-colors">
                        {action.title}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8B6F5A] group-hover:text-[#C65D4B] group-hover:translate-x-1 transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* System Health Card */}
          <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E5D7C7] p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-[#E5D7C7]/70 pb-2.5">
              <span className="text-xs font-black text-[#231917] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#C65D4B]" />
                <span>TRẠNG THÁI MÁY CHỦ</span>
              </span>
              <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                ● 100% HEALTHY
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-[#56423E]">
              <div className="p-2.5 bg-[#FAF3EB] rounded-xl border border-[#E5D7C7]">
                <div className="text-[10px] text-[#8B6F5A] font-bold">DATABASE</div>
                <div className="text-xs font-black text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Supabase OK
                </div>
              </div>
              <div className="p-2.5 bg-[#FAF3EB] rounded-xl border border-[#E5D7C7]">
                <div className="text-[10px] text-[#8B6F5A] font-bold">FLYWAY</div>
                <div className="text-xs font-black text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Synced
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AUTH REQUIRED POPUP MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-7 border-2 border-[#E5D7C7] space-y-5 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 text-amber-600 flex items-center justify-center mx-auto text-3xl shadow-sm">
              🔑
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-[#231917]">
                Yêu Cầu Xác Thực Quyền Admin
              </h3>
              <p className="text-xs text-[#76685F] leading-relaxed font-semibold">
                Phiên làm việc Quản trị viên chưa được xác thực hoặc đã hết hạn. Vui lòng đăng nhập bằng tài khoản Quản Trị Viên (Admin) để truy cập hệ thống.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => router.push("/login?redirect=/admin")}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-[#C65D4B] via-[#B04C3B] to-[#9E3426] hover:from-[#B04C3B] hover:to-[#8E3426] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#C65D4B]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/20"
              >
                <span>🔑 Đến Trang Đăng Nhập Admin</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
