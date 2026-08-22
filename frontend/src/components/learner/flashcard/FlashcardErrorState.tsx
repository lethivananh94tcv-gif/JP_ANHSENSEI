"use client";

interface FlashcardErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export default function FlashcardErrorState({
  message = "Không thể tải danh sách thẻ flashcard. Vui lòng kiểm tra lại kết nối.",
  onRetry,
}: FlashcardErrorStateProps) {
  return (
    <div className="w-full max-w-md mx-auto my-12 bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-8 shadow-md text-center space-y-4">
      <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center text-2xl font-bold">
        ⚠️
      </div>
      <h3 className="text-xl font-serif font-black text-[#231917]">Đã xảy ra lỗi</h3>
      <p className="text-xs sm:text-sm font-semibold text-[#76685F]">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="px-6 py-2.5 bg-[#8B6F5A] hover:bg-[#785d49] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-xs transition-all cursor-pointer"
      >
        Thử lại
      </button>
    </div>
  );
}
