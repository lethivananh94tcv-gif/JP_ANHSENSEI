"use client";

export default function FlashcardSkeleton() {
  return (
    <div className="w-full max-w-xl mx-auto my-6 space-y-6 animate-pulse">
      {/* Progress Skeleton */}
      <div className="w-full h-8 bg-[#EFE8DE] rounded-2xl" />

      {/* Card Skeleton */}
      <div className="w-full h-[360px] bg-[#EFE8DE] rounded-3xl border-2 border-[#DED3C8]" />

      {/* Rating Buttons Skeleton */}
      <div className="grid grid-cols-3 gap-3">
        <div className="h-12 bg-[#EFE8DE] rounded-2xl" />
        <div className="h-12 bg-[#EFE8DE] rounded-2xl" />
        <div className="h-12 bg-[#EFE8DE] rounded-2xl" />
      </div>
    </div>
  );
}
