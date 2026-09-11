"use client";

import { useState } from "react";
import { Search, Sparkles, BookOpen, Check, Copy, HelpCircle } from "lucide-react";
import { detectGroup, conjugateAll, getGroupDisplayName, ConjugationForm, getFormDisplayName, VerbConjugationResult } from "@/lib/japanese/verbConjugator";
import DynamicConjugationRuleCard from "@/components/learner/verbs/DynamicConjugationRuleCard";

export default function QuickVerbConjugatorWidget() {
  const [activeTab, setActiveTab] = useState<"search" | "rules">("search");
  const [inputVerb, setInputVerb] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedForm, setCopiedForm] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputVerb.trim());
  };

  const detectedGroup = searchQuery ? detectGroup(searchQuery) : null;
  const conjugatedForms = searchQuery ? conjugateAll(searchQuery) : null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedForm(label);
    setTimeout(() => setCopiedForm(null), 1500);
  };

  const formList: Array<{ key: keyof VerbConjugationResult; formEnum: ConjugationForm }> = [
    { key: "masu", formEnum: "MASU" },
    { key: "dict", formEnum: "DICT" },
    { key: "te", formEnum: "TE" },
    { key: "nai", formEnum: "NAI" },
    { key: "ta", formEnum: "TA" },
    { key: "potential", formEnum: "POTENTIAL" },
    { key: "volitional", formEnum: "VOLITIONAL" },
    { key: "imperative", formEnum: "IMPERATIVE" },
    { key: "conditionalBa", formEnum: "CONDITIONAL_BA" },
    { key: "passive", formEnum: "PASSIVE" },
    { key: "causative", formEnum: "CAUSATIVE" },
  ];

  if (activeTab === "rules") {
    return (
      <div className="space-y-2">
        <div className="flex bg-[#FAF6F0] p-1 rounded-2xl border border-[#DED3C8] mb-2">
          <button
            onClick={() => setActiveTab("search")}
            className="flex-1 py-1.5 rounded-xl font-extrabold text-xs text-[#756A62] hover:text-[#302A26] transition-all flex items-center justify-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Tra Cứu 10 Thể
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className="flex-1 py-1.5 rounded-xl font-extrabold text-xs bg-[#C65D4B] text-white shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Bảng Quy Tắc
          </button>
        </div>
        <DynamicConjugationRuleCard activeForm="TE" />
      </div>
    );
  }

  return (
    <div className="bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#F0705A]/10 text-[#C65D4B] flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-sm text-[#302A26] flex items-center gap-1.5">
              Tra Cứu Thể Chia
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F0705A]/10 text-[#C65D4B]">
                Quick Tool
              </span>
            </h3>
            <p className="text-xs text-[#756A62]">Nhập động từ (masu/từ điển) để tra 10 thể chia</p>
          </div>
        </div>
      </div>

      {/* Header Mode Switcher */}
      <div className="flex bg-[#FAF6F0] p-1 rounded-2xl border border-[#DED3C8]">
        <button
          onClick={() => setActiveTab("search")}
          className="flex-1 py-1.5 rounded-xl font-extrabold text-xs bg-[#C65D4B] text-white shadow-sm transition-all flex items-center justify-center gap-1.5"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Tra Cứu 10 Thể
        </button>
        <button
          onClick={() => setActiveTab("rules")}
          className="flex-1 py-1.5 rounded-xl font-extrabold text-xs text-[#756A62] hover:text-[#302A26] transition-all flex items-center justify-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Bảng Quy Tắc Chia
        </button>
      </div>

      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={inputVerb}
          onChange={(e) => setInputVerb(e.target.value)}
          placeholder="Ví dụ: 行きます, 食べます, 書く..."
          className="w-full bg-[#FAF6F0] border border-[#DED3C8] rounded-2xl pl-4 pr-10 py-2.5 text-sm text-[#302A26] placeholder-[#A0958C] focus:outline-none focus:ring-2 focus:ring-[#C65D4B]/30 focus:border-[#C65D4B] transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-xl bg-[#C65D4B] text-white flex items-center justify-center hover:bg-[#B04C3B] transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* Suggested Quick Tags */}
      {!searchQuery && (
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold text-[#A0958C] uppercase tracking-wider">Thử tra nhanh:</p>
          <div className="flex flex-wrap gap-1.5">
            {["行きます", "食べます", "書きます", "します", "来ます"].map((verb) => (
              <button
                key={verb}
                onClick={() => {
                  setInputVerb(verb);
                  setSearchQuery(verb);
                }}
                className="px-2.5 py-1 text-xs bg-[#FAF6F0] border border-[#EBE1D7] hover:border-[#C65D4B] text-[#554B43] rounded-xl transition-all hover:text-[#C65D4B]"
              >
                {verb}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result Display */}
      {searchQuery && conjugatedForms && (
        <div className="space-y-3 pt-2 border-t border-[#EBE1D7]">
          <div className="flex items-center justify-between bg-[#F0705A]/10 p-3 rounded-2xl">
            <div>
              <span className="text-xs text-[#756A62]">Động từ gốc:</span>
              <p className="font-extrabold text-base text-[#C65D4B]">{searchQuery}</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold px-2.5 py-1 bg-white border border-[#DED3C8] rounded-xl text-[#302A26]">
                {detectedGroup ? getGroupDisplayName(detectedGroup) : "Nhóm động từ"}
              </span>
            </div>
          </div>

          <div className="max-h-[260px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
            {formList.map(({ key, formEnum }) => {
              const val = conjugatedForms[key];
              const formLabel = getFormDisplayName(formEnum);
              if (!val) return null;

              return (
                <div
                  key={key}
                  className="flex items-center justify-between px-3 py-2 bg-[#FAF6F0] hover:bg-[#F5EFE6] rounded-xl border border-[#EBE1D7] transition-all group"
                >
                  <div>
                    <p className="text-[11px] text-[#756A62] font-medium">{formLabel}</p>
                    <p className="font-bold text-sm text-[#302A26]">{val}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(val, formLabel)}
                    className="p-1.5 rounded-lg text-[#A0958C] hover:text-[#C65D4B] hover:bg-white transition-all"
                    title="Sao chép"
                  >
                    {copiedForm === formLabel ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
