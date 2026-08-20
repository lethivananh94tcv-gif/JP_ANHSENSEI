import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl border border-[#8B6F5A]/20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#8B6F5A]">Đăng nhập</h1>
          <p className="text-sm text-[#6E5E52]">Chào mừng bạn trở lại với ANH SENSEI</p>
        </div>

        <form className="space-y-4">
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
            className="w-full rounded-lg bg-[#8B6F5A] py-2.5 font-semibold text-white transition hover:bg-[#8B6F5A]/90"
          >
            Đăng nhập
          </button>
        </form>

        <p className="text-center text-xs text-[#6E5E52]">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="font-semibold text-[#C65D4B] hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </main>
  );
}
