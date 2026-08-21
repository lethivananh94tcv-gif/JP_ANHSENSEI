"use client";

import Link from "next/link";

export default function LearningTypeGrid() {
  const cards = [
    {
      title: "Từ vựng",
      subtitle: "Học từ mới ➔",
      desc: "Từ vựng JLPT kèm phát âm Kana, Hán tự gốc và nghĩa tiếng Việt.",
      icon: "🎴",
      href: "/levels",
      isAvailable: true,
    },
    {
      title: "Ngữ pháp",
      subtitle: "Cấu trúc câu ➔",
      desc: "Mẫu câu ngữ pháp phân loại theo cấp độ kèm ví dụ minh họa.",
      icon: "📖",
      href: "/levels",
      isAvailable: true,
    },
    {
      title: "Kanji",
      subtitle: "Hán tự ➔",
      desc: "Học chữ Hán Onyomi, Kunyomi và thứ tự nét vẽ chuẩn xác.",
      icon: "✍️",
      href: "/levels",
      isAvailable: true,
    },
    {
      title: "Luyện tập",
      subtitle: "Làm bài test ➔",
      desc: "Trắc nghiệm kiểm tra kiến thức và đo lường tiến độ học tập.",
      icon: "🎯",
      href: "/levels",
      isAvailable: false,
      badge: "Sắp ra mắt",
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#231917] tracking-tight">
          Bạn muốn học gì hôm nay?
        </h2>
        <p className="text-xs text-[#76685F]">Lựa chọn phân loại kiến thức theo nhu cầu cá nhân</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => {
          const ContentNode = (
            <div className="bg-[#FFFDF9] border border-[#DED3C8] rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group h-full">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] border border-[#DED3C8]/60 text-2xl flex items-center justify-center text-[#C65D4B]">
                    {card.icon}
                  </div>
                  {card.badge && (
                    <span className="text-[10px] font-bold text-[#8B6F5A] bg-[#F5EFE6] px-2.5 py-0.5 rounded-full border border-[#DED3C8]">
                      {card.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-serif font-extrabold text-[#231917] group-hover:text-[#C65D4B] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-[#76685F] leading-relaxed line-clamp-2">
                  {card.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DED3C8]/50 flex justify-between items-center text-xs font-bold text-[#8B6F5A] group-hover:text-[#C65D4B] transition-colors">
                <span>{card.subtitle}</span>
              </div>
            </div>
          );

          return card.isAvailable ? (
            <Link key={card.title} href={card.href} className="block h-full">
              {ContentNode}
            </Link>
          ) : (
            <div key={card.title} className="opacity-80 cursor-not-allowed h-full">
              {ContentNode}
            </div>
          );
        })}
      </div>
    </section>
  );
}
