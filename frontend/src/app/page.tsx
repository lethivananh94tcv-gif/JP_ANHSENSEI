"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LearnerDashboardPage from "./(learner)/dashboard/page";

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ name?: string; fullName?: string; email?: string; role?: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token");
      if (storedUser && token) {
        try {
          const parsed = JSON.parse(storedUser);
          setCurrentUser(parsed);
        } catch (e) {
          console.error("Failed to parse user data from localStorage", e);
          router.replace("/login");
        }
      } else {
        router.replace("/login");
      }
    }
  }, [router]);

  if (currentUser) {
    return <LearnerDashboardPage />;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#231917] font-sans flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#C65D4B] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-[#8B6F5A]">Đang chuyển hướng đến trang đăng nhập...</p>
      </div>
    </div>
  );
}
