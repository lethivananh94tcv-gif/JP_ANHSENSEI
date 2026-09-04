"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, Printer, X, CheckCircle2, XCircle, Sparkles, Calendar, User, ShieldCheck } from "lucide-react";

export interface JlptScoreReportData {
  userName?: string;
  examTitle: string;
  levelCode: string;
  versionNumber?: number;
  totalScore: number;
  vocabScore: number;
  grammarScore: number;
  listeningScore: number;
  isPass: boolean;
  completedAtDate: string;
  timeSpentMinutes: number;
}

interface JlptScoreReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: JlptScoreReportData;
}

export default function JlptScoreReportModal({ isOpen, onClose, data }: JlptScoreReportModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          className="bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden select-none space-y-6 print:shadow-none print:border-0 print:max-w-full print:w-full print:p-0"
        >
          {/* Close Button (Hidden on Print) */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#76685F] hover:text-[#231917] hover:bg-[#FAF4EB] rounded-full transition-colors cursor-pointer print:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Certificate Style Header Banner */}
          <div className="text-center space-y-2 border-b border-[#E5D7C7] pb-6">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#C65D4B] via-[#D94129] to-[#E68371] text-white mx-auto flex items-center justify-center shadow-lg border-2 border-white">
              <Award className="w-9 h-9 fill-white/20" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[10px] font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              PHIẾU BÁO ĐIỂM THI THỬ JLPT {data.levelCode} CHÍNH THỨC
            </span>

            <h2 className="text-2xl font-black text-[#1F1714]">
              OFFICIAL JLPT SCORE REPORT
            </h2>
            <p className="text-xs text-[#6E5D55] font-bold">
              {data.examTitle} {data.versionNumber ? `(Version v${data.versionNumber}.0)` : ""}
            </p>
          </div>

          {/* Student & Date Info */}
          <div className="grid grid-cols-2 gap-3 bg-[#FAF4EB] p-4 rounded-2xl border border-[#E5D7C7] text-xs">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#C65D4B]" />
              <div>
                <span className="text-[10px] text-[#8C7B70] font-bold block uppercase">Học viên:</span>
                <strong className="text-[#1F1714] font-extrabold">{data.userName || "Học Viên JP_ANHSENSEI"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C65D4B]" />
              <div>
                <span className="text-[10px] text-[#8C7B70] font-bold block uppercase">Ngày làm bài:</span>
                <strong className="text-[#1F1714] font-extrabold">{data.completedAtDate}</strong>
              </div>
            </div>
          </div>

          {/* Overall Pass/Fail Badge & Total Score */}
          <div className={`p-5 rounded-2xl border-2 flex items-center justify-between ${
            data.isPass ? "bg-emerald-50/90 border-emerald-300 text-emerald-950" : "bg-rose-50/90 border-rose-300 text-rose-950"
          }`}>
            <div className="flex items-center gap-3">
              {data.isPass ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-10 h-10 text-rose-600 shrink-0" />
              )}
              <div>
                <span className="text-xs font-black uppercase tracking-wider block">Trạng Thái Đạt Chuẩn:</span>
                <strong className={`text-xl font-black ${data.isPass ? "text-emerald-700" : "text-rose-700"}`}>
                  {data.isPass ? "🎉 ĐẠT (PASSED)" : "💪 KHÔNG ĐẠT (FAILED)"}
                </strong>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-[#8C7B70] block">Tổng Điểm Thi:</span>
              <strong className="text-2xl font-black text-[#C65D4B]">
                {data.totalScore} <span className="text-sm font-bold text-[#6E5D55]">/ 180</span>
              </strong>
            </div>
          </div>

          {/* 3 Section Breakdown Grid */}
          <div className="space-y-2">
            <h3 className="text-xs font-black text-[#1F1714] uppercase tracking-wider">
              📊 Chi Tiết Điểm Từng Môn Thi (Thang 60 Điểm/Môn):
            </h3>

            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="bg-[#FFFDF9] p-3 rounded-2xl border border-[#E5D7C7] space-y-1">
                <span className="text-[10px] font-bold text-[#8C7B70] block uppercase">1. Từ Vựng & Kanji</span>
                <strong className="text-lg font-black text-[#C65D4B] block">{data.vocabScore} / 60</strong>
                <span className={`text-[10px] font-extrabold ${data.vocabScore >= 19 ? "text-emerald-600" : "text-rose-600"}`}>
                  {data.vocabScore >= 19 ? "Qua môn (≥19đ)" : "Điểm liệt (<19đ)"}
                </span>
              </div>

              <div className="bg-[#FFFDF9] p-3 rounded-2xl border border-[#E5D7C7] space-y-1">
                <span className="text-[10px] font-bold text-[#8C7B70] block uppercase">2. Ngữ Pháp & Đọc</span>
                <strong className="text-lg font-black text-[#C65D4B] block">{data.grammarScore} / 60</strong>
                <span className={`text-[10px] font-extrabold ${data.grammarScore >= 19 ? "text-emerald-600" : "text-rose-600"}`}>
                  {data.grammarScore >= 19 ? "Qua môn (≥19đ)" : "Điểm liệt (<19đ)"}
                </span>
              </div>

              <div className="bg-[#FFFDF9] p-3 rounded-2xl border border-[#E5D7C7] space-y-1">
                <span className="text-[10px] font-bold text-[#8C7B70] block uppercase">3. Nghe Hiểu (Choukai)</span>
                <strong className="text-lg font-black text-[#C65D4B] block">{data.listeningScore} / 60</strong>
                <span className={`text-[10px] font-extrabold ${data.listeningScore >= 19 ? "text-emerald-600" : "text-rose-600"}`}>
                  {data.listeningScore >= 19 ? "Qua môn (≥19đ)" : "Điểm liệt (<19đ)"}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Note & Print Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 print:hidden">
            <div className="flex items-center gap-1.5 text-xs text-[#8C7B70] font-medium">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Kết quả đã được xác thực và lưu vào lịch sử làm bài.</span>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#FAF4EB] hover:bg-[#E5D7C7] text-[#6E5D55] font-bold text-xs rounded-xl border border-[#E5D7C7] transition-all cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#C65D4B] hover:bg-[#B44C3B] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>In Bảng Điểm (Print/PDF)</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
