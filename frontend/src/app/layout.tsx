import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="vi">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
