"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, Sparkles, AlertTriangle, ArrowRight } from "lucide-react";
import { ConjugationForm, getFormDisplayName } from "@/lib/japanese/verbConjugator";

interface DynamicConjugationRuleCardProps {
  activeForm: ConjugationForm;
  onFormChange?: (form: ConjugationForm) => void;
  compact?: boolean;
}

interface FormRuleData {
  title: string;
  jpName: string;
  summary: string;
  group1: {
    pattern: string;
    details: Array<{ rule: string; example: string }>;
  };
  group2: {
    pattern: string;
    example: string;
  };
  group3: {
    items: Array<{ word: string; conjugated: string }>;
  };
  exception?: {
    word: string;
    conjugated: string;
    note: string;
  };
}

const FORM_RULES: Record<ConjugationForm, FormRuleData> = {
  TE: {
    title: "Thể て (Te-form)",
    jpName: "て形",
    summary: "Dùng để nối các hành động, yêu cầu lịch sự (～てください), hoặc xin phép (～てもいいです).",
    group1: {
      pattern: "Biến đổi âm cuối của thể ます theo đuôi:",
      details: [
        { rule: "い, ち, り → って", example: "買います → 買って | 待ちます → 待って" },
        { rule: "み, び, に → んで", example: "飲みます → 飲んで | 呼びます → 呼んで" },
        { rule: "き → いて | ぎ → いで", example: "書きます → 書い て | 泳ぎます → 泳いで" },
        { rule: "し → して", example: "話します → 話して" },
      ],
    },
    group2: {
      pattern: "Bỏ ます + て",
      example: "食べます → 食べて | 見ます → 見て",
    },
    group3: {
      items: [
        { word: "します", conjugated: "して" },
        { word: "来ます (きます)", conjugated: "来て (きて)" },
      ],
    },
    exception: {
      word: "行きます (いきます)",
      conjugated: "行って (いって)",
      note: "Quy tắc đúng là き → いて nhưng 行きます là ngoại lệ duy nhất đổi thành 行って.",
    },
  },

  TA: {
    title: "Thể た (Quá khứ)",
    jpName: "た形",
    summary: "Dùng để diễn tả hành động đã xảy ra trong quá khứ hoặc kinh nghiệm (～たことがあります).",
    group1: {
      pattern: "Tương tự thể て, thay て/で bằng た/だ:",
      details: [
        { rule: "い, ち, り → った", example: "買います → 買った | 待ちます → 待った" },
        { rule: "み, び, に → んだ", example: "飲みます → 飲んだ | 呼びます → 呼んだ" },
        { rule: "き → いた | ぎ → いだ", example: "書きます → 書いた | 泳ぎます → 泳いだ" },
        { rule: "し → した", example: "話します → 話した" },
      ],
    },
    group2: {
      pattern: "Bỏ ます + た",
      example: "食べます → 食べた | 見ます → 見た",
    },
    group3: {
      items: [
        { word: "します", conjugated: "した" },
        { word: "来ます (きます)", conjugated: "来た (きた)" },
      ],
    },
    exception: {
      word: "行きます (いきます)",
      conjugated: "行った (いった)",
      note: "Ngoại lệ duy nhất tương tự thể て.",
    },
  },

  NAI: {
    title: "Thể ない (Phủ định ngắn)",
    jpName: "ない形",
    summary: "Dùng trong giao tiếp thân mật (không làm...) hoặc các cấu trúc cấm đoán/bắt buộc (～ないでください).",
    group1: {
      pattern: "Đổi âm hàng い sang âm hàng あ tương ứng + ない",
      details: [
        { rule: "き → かない | み → まない", example: "書きます → 書かない | 飲みます → 飲まない" },
        { rule: "ち → たない | り → らない", example: "待ちます → 待たない | 帰ります → 帰らない" },
        { rule: "Đuôi い → わない", example: "買います → 買わない | 会います → 会わない" },
      ],
    },
    group2: {
      pattern: "Bỏ ます + ない",
      example: "食べます → 食べない | 起きます → 起きない",
    },
    group3: {
      items: [
        { word: "します", conjugated: "しない" },
        { word: "来ます (きます)", conjugated: "来ない (こない)" },
      ],
    },
    exception: {
      word: "あります",
      conjugated: "ない",
      note: "Động từ あります phủ định ngắn là ない (không phải あらない).",
    },
  },

  DICT: {
    title: "Thể Từ điển (辞書形)",
    jpName: "辞書形",
    summary: "Dạng nguyên thể gốc của động từ trong từ điển. Dùng trong thể thông thường hoặc cấu trúc (～ことができる).",
    group1: {
      pattern: "Đổi âm hàng い sang âm hàng う tương ứng",
      details: [
        { rule: "い → う | き → く | し → す", example: "買う | 書く | 話す" },
        { rule: "ち → つ | に → ぬ | ひ → ふ", example: "待つ | 死ぬ" },
        { rule: "み → む | り → る | ぎ → ぐ", example: "飲む | 帰る | 泳ぐ" },
      ],
    },
    group2: {
      pattern: "Bỏ ます + る",
      example: "食べます → 食べる | 見ます → 見る",
    },
    group3: {
      items: [
        { word: "します", conjugated: "する" },
        { word: "来ます (きます)", conjugated: "来る (くる)" },
      ],
    },
  },

  MASU: {
    title: "Thể ます (Lịch sự)",
    jpName: "ます形",
    summary: "Thể lịch sự tiêu chuẩn dùng khi giao tiếp hàng ngày với người ngoài, cấp trên hoặc đồng nghiệp.",
    group1: {
      pattern: "Đổi âm hàng う sang âm hàng い tương ứng + ます",
      details: [
        { rule: "う → い | く → き | す → し", example: "買う → 買います | 書く → 書きます" },
        { rule: "つ → ち | む → み | る → り", example: "待つ → 待ちます | 飲む → 飲みます" },
      ],
    },
    group2: {
      pattern: "Bỏ る + ます",
      example: "食べる → 食べます | 見る → 見ます",
    },
    group3: {
      items: [
        { word: "する", conjugated: "します" },
        { word: "来る (くる)", conjugated: "来ます (きます)" },
      ],
    },
  },

  POTENTIAL: {
    title: "Thể Khả năng (可能形)",
    jpName: "可能形",
    summary: "Diễn tả khả năng có thể làm được việc gì đó (Có thể làm... / Biết làm...).",
    group1: {
      pattern: "Đổi âm hàng い sang âm hàng え + ます",
      details: [
        { rule: "き → けます | い → えます", example: "書きます → 書けます | 買います → 買えます" },
        { rule: "み → めます | ち → てます", example: "飲みます → 飲めます | 待ちます → 待てます" },
      ],
    },
    group2: {
      pattern: "Bỏ ます + られます",
      example: "食べます → 食べられます | 見ます → 見られます",
    },
    group3: {
      items: [
        { word: "します", conjugated: "できます" },
        { word: "来ます (きます)", conjugated: "来られます (こられます)" },
      ],
    },
  },

  VOLITIONAL: {
    title: "Thể Ý định (意向形)",
    jpName: "意向形",
    summary: "Dùng để rủ rê, đề nghị thân mật (Cùng làm... nhé!) hoặc diễn tả ý định (định làm...).",
    group1: {
      pattern: "Đổi âm hàng い sang âm hàng お + う",
      details: [
        { rule: "き → こう | い → おう", example: "書きます → 書こう | 買います → 買おう" },
        { rule: "み → もう | ち → とう", example: "飲みます → 飲もう | 待ちます → 待とう" },
      ],
    },
    group2: {
      pattern: "Bỏ ます + よう",
      example: "食べます → 食べよう | 見ます → 見よう",
    },
    group3: {
      items: [
        { word: "します", conjugated: "しよう" },
        { word: "来ます (きます)", conjugated: "来よう (こよう)" },
      ],
    },
  },

  IMPERATIVE: {
    title: "Thể Mệnh lệnh (命令形)",
    jpName: "命令形",
    summary: "Dùng để ra lệnh dứt khoát, thường dùng trong quân đội, hô khẩu hiệu thể thao hoặc tình huống khẩn cấp.",
    group1: {
      pattern: "Đổi âm hàng い sang âm hàng え",
      details: [
        { rule: "き → け | い → え", example: "書きます → 書け | 買います → 買え" },
        { rule: "み → め | り → れ", example: "飲みます → 飲め | 走ります → 走れ" },
      ],
    },
    group2: {
      pattern: "Bỏ ます + ろ",
      example: "食べます → 食べろ | 見ます → 見ろ",
    },
    group3: {
      items: [
        { word: "します", conjugated: "しろ" },
        { word: "来ます (きます)", conjugated: "来い (こい)" },
      ],
    },
  },

  CONDITIONAL_BA: {
    title: "Thể Điều kiện (ば形)",
    jpName: "ば形",
    summary: "Diễn tả điều kiện giả định (Nếu... thì...).",
    group1: {
      pattern: "Đổi âm hàng い sang âm hàng え + ば",
      details: [
        { rule: "き → けば | い → えば", example: "書きます → 書けば | 買います → 買えば" },
        { rule: "み → めば | ち → てば", example: "飲みます → 飲めば | 待ちます → 待てば" },
      ],
    },
    group2: {
      pattern: "Bỏ ます + れば",
      example: "食べます → 食べれば | 見ます → 見れば",
    },
    group3: {
      items: [
        { word: "します", conjugated: "すれば" },
        { word: "来ます (きます)", conjugated: "来れば (くれば)" },
      ],
    },
  },

  PASSIVE: {
    title: "Thể Bị động (受身形)",
    jpName: "受身形",
    summary: "Diễn tả hành động bị/được người khác thực hiện lên bản thân (Bị/Được làm...).",
    group1: {
      pattern: "Đổi âm hàng い sang âm hàng あ + れます (Đuôi い → われます)",
      details: [
        { rule: "き → かれます | み → まれます", example: "書きます → 書かれます | 飲みます → 飲まれます" },
        { rule: "Đuôi い → われます", example: "買います → 買われます | 会います → 会われます" },
      ],
    },
    group2: {
      pattern: "Bỏ ます + られます",
      example: "食べます → 食べられます | 見ます → 見られます",
    },
    group3: {
      items: [
        { word: "します", conjugated: "されます" },
        { word: "来ます (きます)", conjugated: "来られます (こられます)" },
      ],
    },
  },

  CAUSATIVE: {
    title: "Thể Sai khiến (使役形)",
    jpName: "使役形",
    summary: "Diễn tả việc bắt ai đó hoặc cho phép ai đó làm gì (Bắt/Cho phép làm...).",
    group1: {
      pattern: "Đổi âm hàng い sang âm hàng あ + せます (Đuôi い → わせます)",
      details: [
        { rule: "き → かせます | み → ませます", example: "書きます → 書かせます | 飲みます → 飲ませます" },
        { rule: "Đuôi い → わせます", example: "買います → 買わせます | 会います → 会わせます" },
      ],
    },
    group2: {
      pattern: "Bỏ ます + させます",
      example: "食べます → 食べさせます | 見ます → 見させます",
    },
    group3: {
      items: [
        { word: "します", conjugated: "させます" },
        { word: "来ます (きます)", conjugated: "来させます (こさせます)" },
      ],
    },
  },
};

const ALL_FORMS_LIST: ConjugationForm[] = [
  "TE",
  "NAI",
  "TA",
  "DICT",
  "MASU",
  "POTENTIAL",
  "VOLITIONAL",
  "IMPERATIVE",
  "CONDITIONAL_BA",
  "PASSIVE",
  "CAUSATIVE",
];

export default function DynamicConjugationRuleCard({
  activeForm,
  onFormChange,
  compact = false,
}: DynamicConjugationRuleCardProps) {
  const [selectedFormInternal, setSelectedFormInternal] = useState<ConjugationForm>(activeForm);

  const currentFormToUse = activeForm || selectedFormInternal;
  const ruleData = FORM_RULES[currentFormToUse] || FORM_RULES.TE;

  const handleSelectForm = (form: ConjugationForm) => {
    setSelectedFormInternal(form);
    if (onFormChange) {
      onFormChange(form);
    }
  };

  return (
    <div className="bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-5 shadow-sm space-y-4">
      {/* Header & Selector */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#EBE1D7]">
        <div className="flex items-center gap-2 text-[#302A26]">
          <div className="w-8 h-8 rounded-xl bg-[#F0705A]/10 text-[#C65D4B] flex items-center justify-center font-bold">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-black text-sm text-[#302A26] flex items-center gap-1.5">
              Quy Tắc Chia Động Từ
            </h3>
            <span className="text-[11px] font-bold text-[#C65D4B]">
              {ruleData.title} ({ruleData.jpName})
            </span>
          </div>
        </div>

        {/* Quick Form Selector Dropdown */}
        <select
          value={currentFormToUse}
          onChange={(e) => handleSelectForm(e.target.value as ConjugationForm)}
          className="bg-[#FAF6F0] border border-[#DED3C8] rounded-xl px-2.5 py-1 text-xs font-bold text-[#C65D4B] focus:outline-none focus:ring-2 focus:ring-[#C65D4B]/30"
        >
          {ALL_FORMS_LIST.map((f) => (
            <option key={f} value={f}>
              {getFormDisplayName(f)}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Note */}
      <div className="p-2.5 rounded-2xl bg-[#F0705A]/10 border border-[#F0705A]/20 text-xs font-medium text-[#756A62]">
        <span className="font-bold text-[#C65D4B]">💡 Cách dùng: </span>
        {ruleData.summary}
      </div>

      {/* Group Rules */}
      <div className="space-y-2.5 text-xs text-[#302A26]">
        {/* Nhóm 1 */}
        <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-[#EBE1D7] space-y-1.5">
          <div className="flex items-center justify-between">
            <strong className="text-[#C65D4B] font-extrabold text-xs">Nhóm I (Godan)</strong>
            <span className="text-[10px] text-[#756A62] font-semibold">{ruleData.group1.pattern}</span>
          </div>
          {ruleData.group1.details.map((d, idx) => (
            <div key={idx} className="text-[11px] bg-white p-2 rounded-xl border border-[#EBE1D7]/80">
              <span className="font-bold text-[#C65D4B]">{d.rule}</span>
              <p className="text-[#756A62] text-[10px] mt-0.5">{d.example}</p>
            </div>
          ))}
        </div>

        {/* Nhóm 2 */}
        <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-[#EBE1D7] space-y-1">
          <strong className="text-[#C65D4B] font-extrabold text-xs">Nhóm II (Ichidan)</strong>
          <p className="text-[11px] font-bold text-[#302A26]">{ruleData.group2.pattern}</p>
          <p className="text-[10px] text-[#756A62]">VD: {ruleData.group2.example}</p>
        </div>

        {/* Nhóm 3 */}
        <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-[#EBE1D7] space-y-1.5">
          <strong className="text-[#C65D4B] font-extrabold text-xs">Nhóm III (Bất quy tắc)</strong>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            {ruleData.group3.items.map((item, idx) => (
              <div key={idx} className="bg-white px-2.5 py-1.5 rounded-xl border border-[#EBE1D7] flex items-center justify-between">
                <span className="text-[#756A62] font-medium">{item.word}</span>
                <span className="font-bold text-[#C65D4B] flex items-center gap-1">
                  → {item.conjugated}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Exception Box (if exists) */}
        {ruleData.exception && (
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-700">
              <AlertTriangle className="w-3.5 h-3.5" />
              Ngoại Lệ Quan Trọng!
            </div>
            <p className="text-[11px] font-bold">
              {ruleData.exception.word} → <span className="text-[#C65D4B]">{ruleData.exception.conjugated}</span>
            </p>
            <p className="text-[10px] text-amber-800/90 leading-tight">{ruleData.exception.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
