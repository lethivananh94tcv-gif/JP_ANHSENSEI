"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flame, X, Sparkles, Rocket } from "lucide-react";

interface JlptNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JlptNoticeModal({ isOpen, onClose }: JlptNoticeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          className="bg-[#FFFDF9] border-2 border-[#DED3C8] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative overflow-hidden text-center space-y-5 select-none"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#76685F] hover:text-[#231917] hover:bg-[#FAF4EB] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Decorative Flame / Target Icon */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-[#FDF0EE] rounded-full blur-xs opacity-90" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#C65D4B] to-[#E68371] text-white flex items-center justify-center shadow-md relative z-10 border border-white/20">
              <Flame className="w-8 h-8 fill-white/20 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 text-lg">🎯</span>
          </div>

          {/* Title & Badge */}
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 border border-amber-300 rounded-full text-[10px] font-black uppercase tracking-wider">
              <Rocket className="w-3 h-3 text-amber-600" />
              Sắp ra mắt phiên bản mới
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#231917]">
              Luyện Thi JLPT Đang Hoàn Thiện! 🎯
            </h3>
          </div>

          {/* Body Description */}
          <p className="text-xs sm:text-sm text-[#56423E] font-medium leading-relaxed bg-[#FAF4EB] p-4 rounded-2xl border border-[#E5D7C7]">
            Xin lỗi bạn nhé! Tính năng <strong className="text-[#C65D4B]">Luyện Thi JLPT</strong> hiện đang được đội ngũ biên soạn & hoàn thiện bộ đề thi chuẩn. Hệ thống sẽ mở khóa trong phiên bản cập nhật sắp tới! 🚀
          </p>

          {/* Encouragement Notice */}
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#8B786D]">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Hãy luyện tập Từ vựng, Ngữ pháp & Kanji N5/N4 ngay nhé!</span>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-[#C65D4B] hover:bg-[#B04F3F] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all cursor-pointer hover:scale-102 active:scale-98"
          >
            Đã hiểu & Tiếp tục học bài
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
