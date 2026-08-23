"use client";

import { useState, useRef } from "react";
import { RefreshCw, Edit3, Trash2 } from "lucide-react";
import { KanjiTopicItemDto } from "./KanjiLessonDetailView";

interface InteractiveStrokeCanvasProps {
  items: KanjiTopicItemDto[];
}

export default function InteractiveStrokeCanvas({ items }: InteractiveStrokeCanvasProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const currentItem = items[selectedIdx];

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#C65D4B";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Selector - Flex Wrap Grid so all Kanji buttons are visible */}
      <div className="bg-[#FAF3EB] border border-[#DED3C8] p-3 rounded-2xl shadow-2xs">
        <div className="text-[11px] font-extrabold text-[#8B6F5A] mb-2 flex items-center justify-between">
          <span>🎯 CHỌN CHỮ HÁN CẦN LUYỆN VIẾT ({selectedIdx + 1}/{items.length}):</span>
          <span className="text-[#C65D4B]">{currentItem.character} ({currentItem.meaningVi})</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {items.map((it, idx) => (
            <button
              key={it.kanjiId}
              onClick={() => {
                setSelectedIdx(idx);
                clearCanvas();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border ${
                selectedIdx === idx
                  ? "bg-[#C65D4B] text-white border-[#C65D4B] shadow-md scale-105"
                  : "bg-white text-[#8B6F5A] border-[#DED3C8] hover:border-[#C65D4B] hover:bg-[#FAF3EB]"
              }`}
            >
              {it.character} <span className="text-[10px] opacity-80">({it.meaningVi})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Drawing Canvas */}
      <div className="bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-6 text-center space-y-4 shadow-md">
        <div className="space-y-1">
          <span className="bg-[#FAF3EB] text-[#C65D4B] border border-[#DED3C8] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
            ✏️ KHUNG LUYỆN VIẾT NÉT HÁN TỰ ({currentItem.strokeCount} NÉT)
          </span>
          <h2 className="text-3xl font-black text-[#231917]">
            Tập viết chữ: <span className="text-[#C65D4B]">{currentItem.character}</span> ({currentItem.meaningVi})
          </h2>
          <p className="text-xs text-[#76685F]">
            Dùng chuột hoặc ngón tay vẽ đè lên chữ mờ để luyện tập nét vẽ
          </p>
        </div>

        {/* Interactive Canvas Box */}
        <div className="relative w-64 h-64 mx-auto border-2 border-dashed border-[#C65D4B]/40 rounded-2xl bg-[#FAF3EB] flex items-center justify-center overflow-hidden shadow-inner">
          {/* Background Guide Character */}
          <span className="absolute text-[140px] font-sans font-black text-[#8B6F5A]/15 select-none pointer-events-none">
            {currentItem.character}
          </span>

          <canvas
            ref={canvasRef}
            width={256}
            height={256}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="absolute inset-0 cursor-crosshair touch-none"
          />
        </div>

        {/* Action & Navigation Buttons */}
        <div className="flex justify-between items-center pt-2 border-t border-[#DED3C8]/60">
          <button
            onClick={() => {
              if (selectedIdx > 0) {
                setSelectedIdx(selectedIdx - 1);
                clearCanvas();
              }
            }}
            disabled={selectedIdx === 0}
            className="px-3.5 py-2 bg-[#FAF3EB] disabled:opacity-40 hover:bg-[#C65D4B] hover:text-white border border-[#DED3C8] text-[#8B6F5A] text-xs font-black rounded-xl transition-all"
          >
            ◀ Chữ trước
          </button>

          <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-[#FAF3EB] hover:bg-[#C65D4B] hover:text-white border border-[#DED3C8] text-[#8B6F5A] text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Xóa nét vẽ
          </button>

          <button
            onClick={() => {
              if (selectedIdx < items.length - 1) {
                setSelectedIdx(selectedIdx + 1);
                clearCanvas();
              }
            }}
            disabled={selectedIdx === items.length - 1}
            className="px-3.5 py-2 bg-[#FAF3EB] disabled:opacity-40 hover:bg-[#C65D4B] hover:text-white border border-[#DED3C8] text-[#8B6F5A] text-xs font-black rounded-xl transition-all"
          >
            Chữ tiếp ➔
          </button>
        </div>
      </div>
    </div>
  );
}
