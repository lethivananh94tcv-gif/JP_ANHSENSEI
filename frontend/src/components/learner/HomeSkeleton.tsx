"use client";

export default function HomeSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-pulse">
      {/* Welcome Skeleton */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-[#DED3C8]/40 rounded-xl" />
          <div className="h-4 w-80 bg-[#DED3C8]/30 rounded-lg" />
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <div className="h-16 w-36 bg-[#DED3C8]/40 rounded-2xl" />
          <div className="h-16 w-36 bg-[#DED3C8]/40 rounded-2xl" />
          <div className="h-16 w-36 bg-[#DED3C8]/40 rounded-2xl" />
        </div>
      </div>

      {/* Primary Actions Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-64 bg-[#DED3C8]/30 rounded-3xl" />
        <div className="lg:col-span-4 h-64 bg-[#DED3C8]/30 rounded-3xl" />
      </div>

      {/* Learning Path Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-48 bg-[#DED3C8]/40 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="h-48 bg-[#DED3C8]/30 rounded-3xl" />
          <div className="h-48 bg-[#DED3C8]/30 rounded-3xl" />
          <div className="h-48 bg-[#DED3C8]/30 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
