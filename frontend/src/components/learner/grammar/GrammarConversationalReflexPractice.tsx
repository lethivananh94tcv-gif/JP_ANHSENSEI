"use client";

import { useState } from "react";
import JapaneseFuriganaText from "@/components/learner/JapaneseFuriganaText";
import { MessageSquare, Volume2, CheckCircle2, Sparkles, RefreshCw, ArrowRight, UserCheck, Bot } from "lucide-react";

export interface DialogueStep {
  stepId: number;
  npcName: string;
  npcJp: string;
  npcVi: string;
  userPromptVi: string;
  options: {
    textJp: string;
    textVi: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface GrammarPointInput {
  grammarId?: number;
  pattern: string;
  meaning: string;
  explanation: string;
  structure?: string;
  examples?: {
    japaneseText: string;
    furiganaText?: string;
    meaningVi: string;
  }[];
}

interface GrammarConversationalReflexPracticeProps {
  lessonNum: number;
  grammarPoints?: GrammarPointInput[];
  onComplete?: () => void;
}

export function autoGenerateReflexDialogues(
  points: GrammarPointInput[],
  lessonNum: number
): DialogueStep[] {
  if (!points || points.length === 0) return [];

  const steps: DialogueStep[] = [];
  const npcList = ["Tanaka", "Yamada", "Kimura", "Santos", "Miller", "Gupta", "Sato"];
  let stepIdCounter = 1;

  points.forEach((point, pIdx) => {
    const npc = npcList[pIdx % npcList.length];

    if (point.examples && point.examples.length > 0) {
      point.examples.forEach((ex) => {
        steps.push({
          stepId: stepIdCounter++,
          npcName: npc,
          npcJp: `${npc}: Mẫu câu 「${point.pattern}」 dùng thế nào trong ngữ cảnh thực tế?`,
          npcVi: `${npc} hỏi về ứng dụng thực tế của mẫu câu ${point.pattern}`,
          userPromptVi: `Đáp lại chuẩn xác theo ý nghĩa: "${ex.meaningVi}"`,
          options: [
            {
              textJp: ex.japaneseText,
              textVi: ex.meaningVi,
              isCorrect: true,
              feedback: `Chính xác! Cấu trúc 「${point.pattern}」 được dùng chuẩn trong ngữ cảnh này.`
            },
            {
              textJp: "いいえ、違（ちが）います。",
              textVi: "Không, sai rồi.",
              isCorrect: false,
              feedback: "Chưa phù hợp với yêu cầu tình huống."
            },
            {
              textJp: "わかりません。",
              textVi: "Tớ không biết.",
              isCorrect: false,
              feedback: "Hãy chọn mẫu ngữ pháp của bài học."
            }
          ]
        });
      });
    }
  });

  return steps;
}

function getLessonReflexFallback(num: number): DialogueStep[] {
  if (num === 1) {
    return [
      {
        stepId: 1,
        npcName: "Yamada",
        npcJp: "山田（やまだ）: 初（はじめ）まして。山田（やまだ）です。",
        npcVi: "Yamada: Rất hân hạnh được gặp bạn. Tôi là Yamada.",
        userPromptVi: "Chào lại và giới thiệu bản thân bạn tên là Nam (sinh viên).",
        options: [
          {
            textJp: "初（はじめ）まして。ナムです。学生（がくせい）です。どうぞ よろしく。",
            textVi: "Rất hân hạnh. Tôi là Nam, là sinh viên. Rất mong được giúp đỡ.",
            isCorrect: true,
            feedback: "Chính xác! Lời chào tự giới thiệu rất lịch sự và đúng mẫu Bài 1."
          },
          {
            textJp: "おはよう ございます。",
            textVi: "Chào buổi sáng.",
            isCorrect: false,
            feedback: "Khi mới gặp lần đầu nên nói 初めまして."
          },
          {
            textJp: "山田（やまだ）さん ですか。",
            textVi: "Có phải anh Yamada không?",
            isCorrect: false,
            feedback: "Đối phương vừa giới thiệu tên rồi nên không hỏi lại tên."
          }
        ]
      },
      {
        stepId: 2,
        npcName: "Kimura",
        npcJp: "木村（きむら）: ナムさんは 会社員（かいしゃいん）ですか。",
        npcVi: "Kimura: Bạn Nam có phải là nhân viên công ty không?",
        userPromptVi: "Phủ định thông tin (Bạn là sinh viên, không phải nhân viên công ty).",
        options: [
          {
            textJp: "いいえ、会社員（かいしゃいん）ではありません。学生（がくせい）です。",
            textVi: "Không, tôi không phải là nhân viên công ty. Tôi là sinh viên.",
            isCorrect: true,
            feedback: "Rất tốt! Cấu trúc phủ định ではありません và đính chính danh tính."
          },
          {
            textJp: "はい、会社員（かいしゃいん）です。",
            textVi: "Vâng, tôi là nhân viên công ty.",
            isCorrect: false,
            feedback: "Yêu cầu là phủ định thông tin."
          },
          {
            textJp: "学生（がくせい） じゃありません。",
            textVi: "Tôi không phải sinh viên.",
            isCorrect: false,
            feedback: "Sai thông tin thực tế."
          }
        ]
      }
    ];
  }

  return [
    {
      stepId: 1,
      npcName: "Sensei",
      npcJp: "先生（せんせい）: 日本語（にほんご）の 勉強（べんきょう）は どうですか。",
      npcVi: "Thầy giáo: Việc học tiếng Nhật thế nào?",
      userPromptVi: "Trả lời là tiếng Nhật thú vị.",
      options: [
        {
          textJp: "面白（おもしろ）い です。",
          textVi: "Nó rất thú vị.",
          isCorrect: true,
          feedback: "Đúng rồi! Trả lời tự nhiên và lịch sự."
        },
        {
          textJp: "いいえ、違（ちが）います。",
          textVi: "Không, sai rồi.",
          isCorrect: false,
          feedback: "Không phù hợp với câu hỏi cảm nhận."
        }
      ]
    }
  ];
}

export default function GrammarConversationalReflexPractice({
  lessonNum,
  grammarPoints,
  onComplete,
}: GrammarConversationalReflexPracticeProps) {
  const dialogSteps = (grammarPoints && grammarPoints.length > 0)
    ? autoGenerateReflexDialogues(grammarPoints, lessonNum)
    : getLessonReflexFallback(lessonNum);

  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentStep = dialogSteps[currentStepIdx] || getLessonReflexFallback(lessonNum)[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOptIdx(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOptIdx === null || isAnswered) return;
    setIsAnswered(true);

    if (currentStep.options[selectedOptIdx].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIdx + 1 < dialogSteps.length) {
      setCurrentStepIdx((prev) => prev + 1);
      setSelectedOptIdx(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (onComplete) onComplete();
    }
  };

  const handleRestart = () => {
    setCurrentStepIdx(0);
    setSelectedOptIdx(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="bg-gradient-to-b from-[#211816] to-[#140E0D] rounded-3xl p-8 border-2 border-[#D4AF37]/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
        <div className="w-20 h-20 bg-[#D94129]/20 border border-[#D94129]/40 rounded-3xl flex items-center justify-center mx-auto mb-4 text-[#FF7A63] shadow-[0_0_25px_rgba(217,65,41,0.4)]">
          <Sparkles className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-[#FFF5E6] mb-2">Hoàn Thành Luyện Phản Xạ Hội Thoại!</h3>
        <p className="text-[#D4C5B3] mb-6">
          Bạn đã chinh phục thành công <span className="text-[#FFB020] font-black text-xl">{score}/{dialogSteps.length}</span> tình huống giao tiếp.
        </p>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D94129] to-[#FF5733] hover:brightness-110 text-white font-black px-7 py-3.5 rounded-2xl shadow-[0_0_25px_rgba(217,65,41,0.5)] transition-all hover:scale-105 cursor-pointer"
        >
          <RefreshCw className="w-5 h-5" />
          Rèn Luyện Lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#1F1715] via-[#16100E] to-[#0E0908] rounded-2xl p-4 sm:p-5 border-2 border-[#D4AF37]/35 shadow-[0_10px_40px_rgba(0,0,0,0.85)] relative overflow-hidden">
      {/* Background Spirit Glow Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Step Info */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#D4AF37]/20 relative z-10">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-[#2B1B17] border border-[#FF6B4A]/40 text-[#FF9E85] text-[11px] font-black rounded-lg shadow-[0_0_10px_rgba(255,107,74,0.2)]">
            💬 PHẢN XẠ HỘI THOẠI - BÀI {lessonNum}
          </span>
          <span className="text-xs text-[#D4C5B3] font-bold">
            Tình huống <span className="text-[#FFB020] font-black">{currentStepIdx + 1}</span> / {dialogSteps.length}
          </span>
        </div>
        <Volume2 className="w-4 h-4 text-[#D4C5B3] cursor-pointer hover:text-[#FFB020] transition-colors" />
      </div>

      {/* Dialogue Prompt */}
      <div className="bg-gradient-to-br from-[#2D211E] via-[#241A18] to-[#1B1210] rounded-xl p-3.5 sm:p-4 mb-3 border-2 border-[#D4AF37]/40 shadow-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#D94129] to-[#FF5733] text-white rounded-xl flex items-center justify-center font-black flex-shrink-0 shadow-[0_0_12px_rgba(217,65,41,0.5)]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-black text-[#FFB020] uppercase tracking-wider">
              {currentStep.npcName} VỪA ĐỐI THOẠI:
            </div>
            <div className="text-base sm:text-lg font-black text-[#FFF5E6] leading-snug drop-shadow-md">
              <JapaneseFuriganaText text={currentStep.npcJp} />
            </div>
            <div className="text-[#D4C5B3] text-xs italic font-medium">
              ({currentStep.npcVi})
            </div>
          </div>
        </div>
      </div>

      {/* Response Options */}
      <div className="space-y-2 mb-3.5 relative z-10">
        {currentStep.options.map((opt, idx) => {
          let style = "bg-[#251D1A] hover:bg-[#312521] border-[#D4AF37]/25 text-[#FFF0DD] hover:border-[#FFB020] hover:shadow-[0_0_15px_rgba(255,176,32,0.2)]";

          if (isAnswered) {
            if (opt.isCorrect) {
              style = "bg-emerald-950/90 border-2 border-emerald-400 text-emerald-200 font-black shadow-[0_0_15px_rgba(52,211,153,0.4)]";
            } else if (idx === selectedOptIdx) {
              style = "bg-rose-950/90 border-2 border-rose-500 text-rose-200 font-black shadow-[0_0_15px_rgba(244,63,94,0.4)]";
            } else {
              style = "bg-[#1C1513] border-white/5 text-[#7A6960] opacity-40";
            }
          } else if (selectedOptIdx === idx) {
            style = "bg-[#3D251D] border-2 border-[#FF5733] text-[#FFE8D6] font-black ring-2 ring-[#FF5733]/40 shadow-[0_0_15px_rgba(255,87,51,0.35)]";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`w-full py-2.5 px-3.5 rounded-xl border text-left transition-all duration-150 flex items-center justify-between cursor-pointer ${style}`}
            >
              <div>
                <div className="text-sm sm:text-base font-bold">
                  <JapaneseFuriganaText text={opt.textJp} />
                </div>
                <div className="text-[11px] text-[#D4C5B3]/80">
                  {opt.textVi}
                </div>
              </div>
              {isAnswered && opt.isCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback box */}
      {isAnswered && selectedOptIdx !== null && (
        <div
          className={`p-3 rounded-xl mb-3 border-2 relative z-10 backdrop-blur-md text-xs font-bold ${
            currentStep.options[selectedOptIdx].isCorrect
              ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-100 shadow-md"
              : "bg-rose-950/90 border-rose-500/50 text-rose-100 shadow-md"
          }`}
        >
          {currentStep.options[selectedOptIdx].feedback}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end relative z-10">
        {!isAnswered ? (
          <button
            onClick={handleCheckAnswer}
            disabled={selectedOptIdx === null}
            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedOptIdx !== null
                ? "bg-gradient-to-r from-[#D94129] via-[#FF5733] to-[#E6B655] hover:brightness-110 text-white shadow-[0_0_20px_rgba(217,65,41,0.5)] hover:scale-102 active:scale-95"
                : "bg-[#251D1A] text-[#76675E] border border-white/5 cursor-not-allowed shadow-none"
            }`}
          >
            Phản Xạ Câu Trả Lời
          </button>
        ) : (
          <button
            onClick={handleNextStep}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#D94129] via-[#FF5733] to-[#E6B655] hover:brightness-110 text-white text-xs font-black rounded-xl shadow-[0_0_20px_rgba(217,65,41,0.5)] transition-all hover:scale-102 active:scale-95 cursor-pointer"
          >
            <span>{currentStepIdx + 1 < dialogSteps.length ? "Tình Huống Tiếp" : "Xem Kết Quả"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
