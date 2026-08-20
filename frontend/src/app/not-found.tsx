import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md rounded-xl bg-white p-8 shadow-lg border border-[#8B6F5A]/20">
        <h1 className="text-6xl font-extrabold text-[#C65D4B]">404</h1>
        <h2 className="mt-2 text-xl font-bold text-[#8B6F5A]">Không tìm thấy trang</h2>
        <p className="mt-2 text-sm text-[#6E5E52]">
          Trang bạn đang truy cập không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-[#8B6F5A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8B6F5A]/90"
        >
          Trở về Trang chủ
        </Link>
      </div>
    </div>
  );
}
