"use client";

import { useState, useEffect, useRef } from "react";
import { Trash2, Sparkles, RefreshCw } from "lucide-react";
import { KanjiTopicItemDto } from "./KanjiLessonDetailView";

interface InteractiveStrokeCanvasProps {
  items: KanjiTopicItemDto[];
}

interface StrokeInfo {
  paths: string[];
  numbers: { x: number; y: number; num: number }[];
  viewBox: string;
}

// Convert character to KanjiVG 5-character hex code e.g. "会" -> "04f1a"
function getKanjiVgHex(char: string): string {
  if (!char) return "04f1a";
  const code = char.charCodeAt(0).toString(16).toLowerCase();
  return `0${code.padStart(4, "0")}`;
}

export default function InteractiveStrokeCanvas({ items }: InteractiveStrokeCanvasProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Stroke Data State
  const [strokeData, setStrokeData] = useState<StrokeInfo | null>(null);
  const [loadingSvg, setLoadingSvg] = useState(false);

  // Animation States
  const [currentStep, setCurrentStep] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  const currentItem = items[selectedIdx];

  // Fetch KanjiVG SVG for exact stroke paths & stroke order numbers for ANY Kanji
  useEffect(() => {
    let isMounted = true;
    const fetchKanjiSvg = async () => {
      if (!currentItem?.character) return;
      try {
        setLoadingSvg(true);
        const hex = getKanjiVgHex(currentItem.character);
        const res = await fetch(`https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`);

        if (res.ok) {
          const svgText = await res.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(svgText, "image/svg+xml");

          // Extract stroke paths
          const pathElements = Array.from(doc.querySelectorAll("path"));
          const paths = pathElements
            .map((p) => p.getAttribute("d"))
            .filter((d): d is String => Boolean(d))
            .map((d) => String(d));

          // Extract stroke numbers
          const textElements = Array.from(doc.querySelectorAll("g[id*='StrokeNumbers'] text"));
          const numbers = textElements.map((t, idx) => {
            const transform = t.getAttribute("transform") || "";
            const match = transform.match(/matrix\([^)]*?\s+([^)]*?\s+)?([\d.-]+)\s+([\d.-]+)\)/) ||
                          transform.match(/translate\(([\d.-]+)[\s,]+([\d.-]+)\)/);
            let x = 20;
            let y = 20;
            if (match) {
              x = parseFloat(match[match.length - 2]);
              y = parseFloat(match[match.length - 1]);
            } else {
              x = parseFloat(t.getAttribute("x") || "20");
              y = parseFloat(t.getAttribute("y") || "20");
            }
            return { x, y, num: idx + 1 };
          });

          if (isMounted && paths.length > 0) {
            setStrokeData({
              paths,
              numbers,
              viewBox: "0 0 109 109",
            });
          }
        } else {
          setStrokeData(null);
        }
      } catch (err) {
        console.error("Lỗi tải SVG nét vẽ KanjiVG:", err);
        if (isMounted) setStrokeData(null);
      } finally {
        if (isMounted) setLoadingSvg(false);
      }
    };

    fetchKanjiSvg();
    return () => {
      isMounted = false;
    };
  }, [selectedIdx, currentItem?.character]);

  // Reset Animation & Canvas when character changes
  useEffect(() => {
    setCurrentStep(0);
    setIsHolding(false);
    clearCanvas();
  }, [selectedIdx]);

  // Auto Stroke-by-Stroke Animation Engine with 5s Hold Loop
  useEffect(() => {
    const totalStrokes = strokeData?.paths.length || currentItem?.strokeCount || 1;
    let timer: NodeJS.Timeout;

    if (isHolding) {
      // Hold completed character for 5 seconds (5000ms), then restart
      timer = setTimeout(() => {
        setIsHolding(false);
        setCurrentStep(1);
      }, 5000);
    } else {
      // Step-by-step drawing interval (550ms per stroke)
      timer = setTimeout(() => {
        setCurrentStep((prev) => {
          if (prev >= totalStrokes) {
            setIsHolding(true);
            return totalStrokes;
          }
          return prev + 1;
        });
      }, 550);
    }

    return () => clearTimeout(timer);
  }, [currentStep, isHolding, strokeData, currentItem?.strokeCount]);

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

  const totalStrokes = strokeData?.paths.length || currentItem?.strokeCount || 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Kanji Selector Chips */}
      <div className="bg-[#FAF3EB] border border-[#DED3C8] p-3 rounded-2xl shadow-2xs">
        <div className="text-[11px] font-extrabold text-[#8B6F5A] mb-2 flex items-center justify-between">
          <span>🎯 CHỌN CHỮ HÁN CẦN LUYỆN VIẾT ({selectedIdx + 1}/{items.length}):</span>
          <span className="text-[#C65D4B] font-bold">{currentItem.character} ({currentItem.meaningVi})</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {items.map((it, idx) => (
            <button
              key={it.kanjiId}
              onClick={() => {
                setSelectedIdx(idx);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all border ${
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

      {/* Main 2-Column Grid: Left (Automatic Stroke Order Animation) | Right (Interactive Practice Canvas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* COLUMN 1: KHUNG MẪU VIẾT TỰ ĐỘNG (Auto Loop Stroke Order Animation) */}
        <div className="bg-[#FFFDF9] border-2 border-[#E5D7C5] rounded-3xl p-6 text-center space-y-4 shadow-md flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-[#3D261D]">
              Thứ tự nét chữ <span className="text-[#C65D4B]">{currentItem.character}</span> ({currentItem.meaningVi})
            </h3>
            <p className="text-[11px] text-[#76685F]">
              {isHolding ? (
                <span className="text-[#8B261D] font-bold animate-pulse">
                  ✨ Hoàn thành! Giữ 5s trước khi lặp lại nét 1...
                </span>
              ) : (
                <span>Tự động chạy từng nét viết theo thứ tự quy chuẩn</span>
              )}
            </p>
          </div>

          {/* Animated SVG Stroke Viewer Box */}
          <div className="relative w-64 h-64 mx-auto border-2 border-[#E5D7C5] rounded-2xl bg-[#FAF6F0] flex items-center justify-center overflow-hidden shadow-inner">
            {/* Guide Grid Background */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-dashed border-[#E5D7C5]/60 pointer-events-none">
              <div className="border-r border-b border-dashed border-[#E5D7C5]/60"></div>
              <div className="border-b border-dashed border-[#E5D7C5]/60"></div>
              <div className="border-r border-dashed border-[#E5D7C5]/60"></div>
              <div></div>
            </div>

            {loadingSvg ? (
              <div className="text-xs font-bold text-[#8B6F5A] flex flex-col items-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin text-[#C65D4B]" />
                <span>Đang tải nét vẽ {currentItem.character}...</span>
              </div>
            ) : strokeData ? (
              <svg viewBox={strokeData.viewBox} className="w-full h-full p-4 relative z-10">
                {/* Background Full Faint Character Strokes */}
                {strokeData.paths.map((pathStr, index) => (
                  <path
                    key={`bg-${index}`}
                    d={pathStr}
                    fill="none"
                    stroke="#DED3C8"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}

                {/* Animated Highlighted Active Strokes up to currentStep */}
                {strokeData.paths.map((pathStr, index) => {
                  const isFinished = index < currentStep - 1;
                  const isCurrent = index === currentStep - 1;
                  if (index >= currentStep) return null;

                  return (
                    <path
                      key={`active-${index}`}
                      d={pathStr}
                      fill="none"
                      stroke={isCurrent ? "#C65D4B" : "#3D261D"}
                      strokeWidth={isCurrent ? "5.5" : "4.8"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={isCurrent ? "transition-all duration-300 drop-shadow-sm" : ""}
                    />
                  );
                })}

                {/* Stroke Start Position Numbers (①, ②, ③...) */}
                {strokeData.numbers.map((pt) => {
                  const isHighlighted = pt.num === currentStep;
                  if (pt.num > currentStep) return null; // Show numbers up to current step

                  return (
                    <g key={`num-${pt.num}`}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="5.5"
                        fill={isHighlighted ? "#C65D4B" : "#8B6F5A"}
                        stroke="#FFF"
                        strokeWidth="1.5"
                      />
                      <text
                        x={pt.x}
                        y={pt.y + 1.8}
                        fill="#FFF"
                        fontSize="5"
                        fontWeight="900"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {pt.num}
                      </text>
                    </g>
                  );
                })}
              </svg>
            ) : (
              /* Fallback Dynamic Display */
              <div className="relative flex flex-col items-center justify-center space-y-2">
                <span className="text-[120px] font-sans font-black text-[#C65D4B]">
                  {currentItem.character}
                </span>
              </div>
            )}

            {/* Step Counter Badge */}
            <div className="absolute top-2 right-2 bg-white/95 border border-[#E5D7C5] px-2.5 py-0.5 rounded-full text-[10px] font-black text-[#8B261D] shadow-2xs z-20">
              {isHolding ? `Giữ 5s (Xong ${totalStrokes} nét)` : `Nét ${currentStep}/${totalStrokes}`}
            </div>
          </div>

          {/* Automatic Progress Status Indicator Bar (No Play/Pause Button) */}
          <div className="pt-2 border-t border-[#DED3C8]/60 space-y-2">
            <div className="w-full bg-[#FAF3EB] h-2 rounded-full overflow-hidden border border-[#DED3C8]/50">
              <div
                className={`h-full transition-all duration-300 ${
                  isHolding ? "bg-[#8B261D]" : "bg-[#C65D4B]"
                }`}
                style={{
                  width: `${(currentStep / totalStrokes) * 100}%`,
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-extrabold text-[#8B6F5A]">
              <span>Tự động phát nét vẽ</span>
              <span className="text-[#C65D4B]">
                {isHolding ? "Tự lặp lại sau 5s..." : `Đang vẽ nét thứ ${currentStep}`}
              </span>
            </div>
          </div>
        </div>

        {/* COLUMN 2: KHUNG TỰ LUYỆN VIẾT (Interactive Canvas Box) */}
        <div className="bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl p-6 text-center space-y-4 shadow-md flex flex-col justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 bg-[#FAF3EB] text-[#C65D4B] border border-[#DED3C8] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
              ✏️ BẢNG TỰ LUYỆN VIẾT NÉT
            </span>
            <h3 className="text-xl font-extrabold text-[#231917]">
              Thực hành vẽ chữ: <span className="text-[#C65D4B]">{currentItem.character}</span>
            </h3>
            <p className="text-[11px] text-[#76685F]">
              Vẽ trực tiếp bằng chuột hoặc ngón tay lên bảng bên dưới
            </p>
          </div>

          {/* Interactive Canvas Box */}
          <div className="relative w-64 h-64 mx-auto border-2 border-dashed border-[#C65D4B]/40 rounded-2xl bg-[#FAF3EB] flex items-center justify-center overflow-hidden shadow-inner">
            {/* Guide Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-dashed border-[#DED3C8]/70 pointer-events-none">
              <div className="border-r border-b border-dashed border-[#DED3C8]/70"></div>
              <div className="border-b border-dashed border-[#DED3C8]/70"></div>
              <div className="border-r border-dashed border-[#DED3C8]/70"></div>
              <div></div>
            </div>

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
              className="absolute inset-0 cursor-crosshair touch-none z-10"
            />
          </div>

          {/* Action & Clear Buttons */}
          <div className="flex justify-between items-center pt-2 border-t border-[#DED3C8]/60">
            <button
              onClick={() => {
                if (selectedIdx > 0) {
                  setSelectedIdx(selectedIdx - 1);
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
    </div>
  );
}
