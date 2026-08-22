"use client";

export default function VocabularyHubSkeleton() {
  return (
    <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 py-8 space-y-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="w-full bg-[#FAF3EB]/70 border border-[#DED3C8] rounded-3xl p-8 h-[190px] flex justify-between items-center" />

      {/* Level Selector Skeleton */}
      <div className="flex gap-3 overflow-hidden">
        <div className="w-24 h-10 bg-[#FFFCF7] rounded-2xl border border-[#DED3C8]" />
        <div className="w-20 h-10 bg-[#FFFCF7] rounded-2xl border border-[#DED3C8]" />
        <div className="w-20 h-10 bg-[#FFFCF7] rounded-2xl border border-[#DED3C8]" />
      </div>

      {/* Two Column Layout Skeleton */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content 72% */}
        <div className="w-full lg:w-[72%] space-y-8">
          <div className="w-full bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-8 h-[180px]" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[120px]">
            <div className="bg-[#FFFCF7] rounded-3xl border border-[#DED3C8]" />
            <div className="bg-[#FFFCF7] rounded-3xl border border-[#DED3C8]" />
            <div className="bg-[#FFFCF7] rounded-3xl border border-[#DED3C8]" />
          </div>
        </div>

        {/* Sidebar 28% */}
        <div className="w-full lg:w-[28%] space-y-6">
          <div className="w-full bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-6 h-[160px]" />
        </div>
      </div>
    </div>
  );
}
