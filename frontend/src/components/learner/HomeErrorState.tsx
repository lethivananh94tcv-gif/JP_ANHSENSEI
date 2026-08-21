"use client";

interface HomeErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function HomeErrorState({ message, onRetry }: HomeErrorStateProps) {
  return (
    <div className="max-w-xl mx-auto my-16 p-8 bg-[#FFFDF9] border border-amber-200 rounded-3xl text-center space-y-4 shadow-sm">
      <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold border border-amber-200">
        ⚠️
      </div>
      <h2 className="text-xl font-serif font-extrabold text-[#231917]">
        Không thể tải dữ liệu trang chủ
      </h2>
      <p className="text-xs text-[#76685F] leading-relaxed">
        {message || "Đã xảy ra lỗi khi kết nối máy chủ. Vui lòng kiểm tra kết nối và thử lại."}
      </p>
      <div className="pt-2">
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-[#8B6F5A] hover:bg-[#765844] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
        >
          🔄 Thử lại ngay
        </button>
      </div>
    </div>
  );
}
