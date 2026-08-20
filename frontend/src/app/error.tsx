'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md rounded-xl bg-white p-6 shadow-lg border border-[#C65D4B]/30">
        <h2 className="text-xl font-bold text-[#C65D4B]">Đã xảy ra lỗi hệ thống</h2>
        <p className="mt-2 text-sm text-[#6E5E52]">
          {error.message || 'Không thể thực hiện yêu cầu lúc này. Vui lòng thử lại.'}
        </p>
        <button
          onClick={() => reset()}
          className="mt-4 rounded-lg bg-[#8B6F5A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8B6F5A]/90"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
