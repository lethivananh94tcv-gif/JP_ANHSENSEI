"use client";

interface VocabularyHubErrorStateProps {
  message?: string;
  correlationId?: string;
  onRetry: () => void;
}

export function VocabularyHubErrorState({
  message = "Đã xảy ra lỗi khi tải dữ liệu từ máy chủ.",
  correlationId,
  onRetry,
}: VocabularyHubErrorStateProps) {
  return (
    <div className="w-full max-w-[1180px] mx-auto px-4 py-16 text-center space-y-4">
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 max-w-lg mx-auto space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 font-bold text-xl flex items-center justify-center mx-auto">
          ⚠️
        </div>
        <h3 className="text-base font-serif font-black text-rose-900">
          Không thể kết nối dữ liệu
        </h3>
        <p className="text-xs text-rose-700 leading-relaxed font-medium">
          {message}
        </p>

        {correlationId && (
          <p className="text-[10px] font-mono text-rose-500 bg-white/60 p-2 rounded-lg truncate">
            Mã lỗi (Correlation ID): {correlationId}
          </p>
        )}

        <button
          type="button"
          onClick={onRetry}
          className="px-6 py-2.5 bg-[#C65D4B] hover:bg-[#b54f3e] text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
        >
          Thử lại ↻
        </button>
      </div>
    </div>
  );
}

interface VocabularyHubEmptyStateProps {
  title?: string;
  description?: string;
}

export function VocabularyHubEmptyState({
  title = "Chưa có bài học nào",
  description = "Hiện tại cấp độ này chưa có bài học nào được xuất bản.",
}: VocabularyHubEmptyStateProps) {
  return (
    <div className="w-full bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-12 text-center space-y-3">
      <span className="text-4xl">📭</span>
      <h3 className="text-base font-serif font-black text-[#302A26]">{title}</h3>
      <p className="text-xs text-[#756A62] max-w-md mx-auto">{description}</p>
    </div>
  );
}
