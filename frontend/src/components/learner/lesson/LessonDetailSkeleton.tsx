"use client";

export default function LessonDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-48 bg-[#DED3C8]/40 rounded-md" />

      {/* Header Banner skeleton */}
      <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-8 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="h-5 w-28 bg-[#DED3C8]/40 rounded-lg" />
            <div className="h-8 w-64 bg-[#DED3C8]/50 rounded-xl" />
            <div className="h-4 w-80 bg-[#DED3C8]/30 rounded-md" />
          </div>
          <div className="h-16 w-56 bg-[#DED3C8]/40 rounded-2xl" />
        </div>
      </div>

      {/* Content Tabs skeleton */}
      <div className="h-12 w-full max-w-md bg-[#DED3C8]/40 rounded-2xl" />

      {/* Content Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="h-48 bg-[#DED3C8]/30 rounded-2xl" />
        <div className="h-48 bg-[#DED3C8]/30 rounded-2xl" />
        <div className="h-48 bg-[#DED3C8]/30 rounded-2xl" />
      </div>
    </div>
  );
}
