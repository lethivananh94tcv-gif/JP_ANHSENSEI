import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ANH SENSEI — Nền tảng tự học tiếng Nhật JLPT N5 - N3",
  description: "Tự học tiếng Nhật với Flashcard Spaced Repetition, Quiz tự động chấm và AI Tutor RAG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${notoSerifJP.variable}`}>
      <body className={`${beVietnamPro.className} min-h-screen antialiased bg-[#FDFBF7] text-[#2C221E]`}>
        {children}
      </body>
    </html>
  );
}
