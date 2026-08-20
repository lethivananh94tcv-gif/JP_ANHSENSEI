export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#8B6F5A] border-t-transparent"></div>
        <p className="text-sm font-medium text-[#8B6F5A]">Đang tải dữ liệu...</p>
      </div>
    </div>
  );
}
