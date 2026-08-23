"use client";

import { useState, useEffect } from "react";
import { Search, BookOpen, Layers } from "lucide-react";

export interface RadicalDto {
  radicalId: number;
  radicalNumber: number;
  character: string;
  nameVi: string;
  strokeCount: number;
  meaningVi: string;
  examples: string;
}

export default function KanjiRadicalsView() {
  const [radicals, setRadicals] = useState<RadicalDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRadical, setSelectedRadical] = useState<RadicalDto | null>(null);

  useEffect(() => {
    const fetchRadicals = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/v1/curriculum/radicals");
        if (res.ok) {
          const data = await res.json();
          setRadicals(data);
        }
      } catch (err) {
        console.error("Lỗi khi tải 214 bộ thủ:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRadicals();
  }, []);

  const filtered = radicals.filter(
    (r) =>
      r.character.includes(search) ||
      r.nameVi.toLowerCase().includes(search.toLowerCase()) ||
      (r.meaningVi && r.meaningVi.toLowerCase().includes(search.toLowerCase())) ||
      r.radicalNumber.toString() === search
  );

  return (
    <div className="space-y-6">
      {/* Header Info & Search */}
      <div className="bg-white border-2 border-[#DED3C8] rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="inline-block bg-[#FAF3EB] text-[#C65D4B] px-3 py-1 rounded-full text-xs font-bold border border-[#DED3C8] mb-1">
              ⛩️ THƯ VIỆN KHO HỌC LIỆU
            </span>
            <h2 className="text-2xl font-black text-[#231917]">214 Bộ Thủ Hán Tự (Radicals)</h2>
            <p className="text-xs text-[#76685F]">
              Nền tảng bóc tách cấu tạo và ghi nhớ mọi Hán tự tiếng Nhật
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B6F5A]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo chữ, tên bộ thủ, số nét..."
              className="w-full pl-9 pr-4 py-2 bg-[#FAF3EB] border border-[#DED3C8] focus:border-[#C65D4B] rounded-xl text-xs font-bold text-[#231917] outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Radicals Grid */}
      {loading ? (
        <div className="text-center py-16 text-[#76685F] font-bold">Đang tải danh sách 214 Bộ thủ...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-[#76685F] border border-[#DED3C8]">
          Không tìm thấy bộ thủ nào phù hợp với từ khóa "{search}".
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((r) => (
            <div
              key={r.radicalId || r.radicalNumber}
              onClick={() => setSelectedRadical(r)}
              className="bg-white border-2 border-[#DED3C8] hover:border-[#C65D4B] rounded-2xl p-4 cursor-pointer shadow-2xs hover:shadow-md transition-all flex flex-col justify-between items-center text-center group"
            >
              <span className="text-[10px] font-black text-[#8B6F5A] bg-[#FAF3EB] px-2 py-0.5 rounded-md border border-[#DED3C8]">
                Bộ #{r.radicalNumber} • {r.strokeCount} nét
              </span>

              <div className="my-2">
                <span className="text-4xl font-black text-[#C65D4B] group-hover:scale-110 transition-transform inline-block">
                  {r.character}
                </span>
                <h4 className="text-xs font-extrabold text-[#231917] mt-1">{r.nameVi}</h4>
              </div>

              <span className="text-[11px] text-[#76685F] line-clamp-1">{r.meaningVi || "—"}</span>
            </div>
          ))}
        </div>
      )}

      {/* Radical Detail Modal */}
      {selectedRadical && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#FFFDF9] border-2 border-[#C65D4B] rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedRadical(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF3EB] hover:bg-[#C65D4B] hover:text-white border border-[#DED3C8] font-bold text-xs flex items-center justify-center transition-all"
            >
              ✕
            </button>

            <div className="text-center space-y-2">
              <span className="bg-[#FAF3EB] text-[#C65D4B] px-3 py-1 rounded-full text-xs font-bold border border-[#DED3C8]">
                BỘ THỦ #{selectedRadical.radicalNumber} ({selectedRadical.strokeCount} NÉT)
              </span>
              <h2 className="text-6xl font-black text-[#C65D4B] pt-2">{selectedRadical.character}</h2>
              <h3 className="text-lg font-black text-[#231917]">Tên bộ: {selectedRadical.nameVi}</h3>
            </div>

            <div className="bg-[#FAF3EB] border border-[#DED3C8] rounded-2xl p-4 space-y-2 text-xs">
              <p>
                <strong className="text-[#8B6F5A]">Ý nghĩa:</strong> {selectedRadical.meaningVi || "Đang cập nhật"}
              </p>
              <p>
                <strong className="text-[#8B6F5A]">Chữ Hán ví dụ:</strong>{" "}
                <span className="font-bold text-[#C65D4B]">{selectedRadical.examples || "—"}</span>
              </p>
            </div>

            <button
              onClick={() => setSelectedRadical(null)}
              className="w-full py-2.5 bg-[#C65D4B] hover:bg-[#b04f3f] text-white font-extrabold rounded-xl text-xs shadow-md transition-all"
            >
              Đóng cửa sổ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
