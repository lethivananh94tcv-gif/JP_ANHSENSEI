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
      <div className="bg-white rounded-3xl p-8 border border-sky-100 shadow-sm text-center">
        <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4 text-sky-600">
          <Sparkles className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-stone-800 mb-2">Hoàn Thành Luyện Phản Xạ!</h3>
        <p className="text-stone-600 mb-6">
          Bạn đã hoàn thành <span className="text-sky-600 font-bold">{score}/{dialogSteps.length}</span> tình huống hội thoại.
        </p>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-sky-200 transition-all hover:scale-105"
        >
          <RefreshCw className="w-5 h-5" />
          Luyện Tập Lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm">
      {/* Step Info */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-full">
            PHẢN XẠ HỘI THOẠI - BÀI {lessonNum}
          </span>
          <span className="text-sm text-stone-500 font-medium">
            Tình huống {currentStepIdx + 1} / {dialogSteps.length}
          </span>
        </div>
        <Volume2 className="w-5 h-5 text-stone-400 cursor-pointer hover:text-sky-600 transition-colors" />
      </div>

      {/* Dialogue Prompt */}
      <div className="bg-sky-50/50 rounded-2xl p-6 mb-8 border border-sky-100">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
              {currentStep.npcName} vừa đối thoại:
            </div>
            <div className="text-xl sm:text-2xl font-bold text-stone-800 leading-relaxed mb-1">
              <JapaneseFuriganaText text={currentStep.npcJp} />
            </div>
            <div className="text-stone-500 text-sm italic">
              ({currentStep.npcVi})
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-sky-100/80 flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
          <p className="text-sm font-semibold text-stone-700">
            {currentStep.userPromptVi}
          </p>
        </div>
      </div>

      {/* Response Options */}
      <div className="space-y-3 mb-8">
        {currentStep.options.map((opt, idx) => {
          let style = "bg-stone-50 hover:bg-sky-50/60 border-stone-200 text-stone-700";

          if (isAnswered) {
            if (opt.isCorrect) {
              style = "bg-emerald-100 border-emerald-400 text-emerald-900 font-bold";
            } else if (idx === selectedOptIdx) {
              style = "bg-rose-100 border-rose-400 text-rose-900 font-bold";
            } else {
              style = "bg-stone-50 border-stone-100 text-stone-400 opacity-60";
            }
          } else if (selectedOptIdx === idx) {
            style = "bg-sky-100 border-sky-400 text-sky-900 font-bold ring-2 ring-sky-400/30";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${style}`}
            >
              <div>
                <div className="text-lg font-semibold mb-1">
                  <JapaneseFuriganaText text={opt.textJp} />
                </div>
                <div className="text-xs text-stone-500">
                  {opt.textVi}
                </div>
              </div>
              {isAnswered && opt.isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback box */}
      {isAnswered && selectedOptIdx !== null && (
        <div
          className={`p-4 rounded-2xl mb-6 border text-sm ${
            currentStep.options[selectedOptIdx].isCorrect
              ? "bg-emerald-50 border-emerald-200 text-emerald-900 font-medium"
              : "bg-rose-50 border-rose-200 text-rose-900 font-medium"
          }`}
        >
          {currentStep.options[selectedOptIdx].feedback}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        {!isAnswered ? (
          <button
            onClick={handleCheckAnswer}
            disabled={selectedOptIdx === null}
            className={`px-8 py-3.5 rounded-2xl font-bold transition-all shadow-md ${
              selectedOptIdx !== null
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-sky-200 hover:scale-105"
                : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
            }`}
          >
            Phản Xạ Câu Trả Lời
          </button>
        ) : (
          <button
            onClick={handleNextStep}
            className="flex items-center gap-2 px-8 py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl shadow-lg shadow-sky-200 transition-all hover:scale-105"
          >
            <span>{currentStepIdx + 1 < dialogSteps.length ? "Tình Huống Tiếp" : "Xem Kết Quả"}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
