"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LearnerHeader from "@/components/learner/LearnerHeader";
import LearnerFooter from "@/components/learner/LearnerFooter";
import KanjiLessonDetailView from "@/components/learner/kanji/KanjiLessonDetailView";

export default function LearnerKanjiTopicDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const topicIdStr = params.topicId as string;
  const topicId = Number(topicIdStr) || 1;

  const tabParam = searchParams.get("tab")?.toUpperCase();
  const initialTab =
    tabParam === "TEST"
      ? "TEST"
      : tabParam === "STROKE"
      ? "STROKE"
      : tabParam === "TYPING"
      ? "TYPING"
      : tabParam === "READING"
      ? "READING"
      : "CARD";

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2421] font-sans flex flex-col">
      {/* 1. LEARNER TOP NAVIGATION HEADER */}
      <LearnerHeader />

      <main className="flex-1 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Breadcrumb Navigation matching Vocabulary Lesson Page */}
          <div className="flex items-center justify-between text-xs font-semibold text-[#8B6F5A]">
            <div className="flex items-center gap-1.5">
              <Link href="/" className="hover:text-[#C65D4B] transition-colors">
                Trang chủ
              </Link>
              <span>/</span>
              <Link href="/kanji" className="hover:text-[#C65D4B] transition-colors">
                Hán tự (Kanji)
              </Link>
              <span>/</span>
              <span className="text-[#C65D4B] font-bold">Bài học Hán tự #{topicId}</span>
            </div>

            <button
              onClick={() => router.push("/kanji")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#FAF3EB] text-[#8B6F5A] hover:text-[#C65D4B] border border-[#E5D7C5] rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C65D4B] group-hover:-translate-x-0.5 transition-transform" />
              <span>Về danh sách Kanji</span>
            </button>
          </div>

          {/* KANJI LESSON DETAIL VIEW CONTENT */}
          <KanjiLessonDetailView
            topicId={topicId}
            onBack={() => router.push("/kanji")}
            initialTab={initialTab}
          />
        </div>
      </main>

      {/* 2. LEARNER FOOTER */}
      <LearnerFooter />
    </div>
  );
}
