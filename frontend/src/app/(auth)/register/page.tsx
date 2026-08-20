import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl border border-[#8B6F5A]/20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#8B6F5A]">Đăng ký tài khoản</h1>
          <p className="text-sm text-[#6E5E52]">Bắt đầu hành trình tự học tiếng Nhật</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2D241E]">Họ và tên</label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#8B6F5A] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2D241E]">Email</label>
            <input
              type="email"
              placeholder="user@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#8B6F5A] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2D241E]">Mật khẩu</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-[#8B6F5A] focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#C65D4B] py-2.5 font-semibold text-white transition hover:bg-[#C65D4B]/90"
          >
            Đăng ký
          </button>
        </form>

        <p className="text-center text-xs text-[#6E5E52]">
          Đã có tài khoản?{" "}
          <Link href="/login" className="font-semibold text-[#8B6F5A] hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </main>
  );
}
