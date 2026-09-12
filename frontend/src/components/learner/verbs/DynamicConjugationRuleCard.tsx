"use client";

import { useState } from "react";
import { Sparkles, AlertTriangle, ArrowRight } from "lucide-react";
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
  patterns: Array<{ structure: string; meaning: string }>;
  group1: {
    pattern: string;
    subgroups: Array<{
      category: string;
      change: string;
      example: string;
    }>;
  };
  group2: {
    pattern: string;
    example: string;
  };
  group3: {
    note?: string;
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
    summary: "Dùng để nối các hành động liên tiếp, đưa ra lời khuyên/yêu cầu lịch sự, xin phép hoặc diễn tả trạng thái đang diễn ra.",
    patterns: [
      { structure: "Vて + ください", meaning: "Xin hãy làm V (Yêu cầu lịch sự)" },
      { structure: "Vて + もいいです", meaning: "Được phép làm V (Xin phép / Cho phép)" },
      { structure: "Vて + はいけません", meaning: "Không được làm V (Cấm đoán)" },
      { structure: "Vて + います", meaning: "Đang làm V / Trạng thái diễn ra" },
      { structure: "Vて + から", meaning: "Sau khi làm V1 thì làm V2" },
    ],
    group1: {
      pattern: "Biến đổi âm cuối của thể ます theo 4 nhóm đuôi:",
      subgroups: [
        {
          category: "1. Đuôi い, ち, り",
          change: "→ って",
          example: "買います → 買って | 待ちます → 待って | 帰ります → 帰って",
        },
        {
          category: "2. Đuôi み, び, に",
          change: "→ んで",
          example: "飲みます → 飲んで | 呼びます → 呼んで | 死にます → 死んで",
        },
        {
          category: "3. Đuôi き, ぎ",
          change: "き → いて | ぎ → いで",
          example: "書きます → 書い て | 泳ぎます → 泳いで",
        },
        {
          category: "4. Đuôi し",
          change: "→ して",
          example: "話します → 話して",
        },
      ],
    },
    group2: {
      pattern: "Bỏ ます + て",
      example: "食べます → 食べて | 見ます → 見て | 起きます → 起きて",
    },
    group3: {
      note: "Bao gồm します đơn, Danh từ ghép + します (勉強します, 散歩します...), và 来ます",
      items: [
        { word: "します", conjugated: "して" },
        { word: "Danh từ + します (VD: 勉強します)", conjugated: "勉強して" },
        { word: "来ます (きます)", conjugated: "来て (きて)" },
      ],
    },
    exception: {
      word: "行きます (いきます)",
      conjugated: "行って (いって)",
      note: "Quy tắc đúng của đuôi き là いて nhưng 行きます là ngoại lệ duy nhất đổi thành 行って.",
    },
  },

  TA: {
    title: "Thể た (Quá khứ)",
    jpName: "た形",
    summary: "Diễn tả hành động đã xảy ra trong quá khứ, trải nghiệm cá nhân hoặc thứ tự ưu tiên.",
    patterns: [
      { structure: "Vた + ことがあります", meaning: "Đã từng làm V (Kinh nghiệm / Trải nghiệm)" },
      { structure: "Vた + ほうがいいです", meaning: "Nên làm V (Lời khuyên nên làm)" },
      { structure: "Vた + り、Vた + りします", meaning: "Làm V1, V2... (Phân liệt hành động)" },
      { structure: "Vた + あとで", meaning: "Sau khi làm V..." },
    ],
    group1: {
      pattern: "Tương tự thể て, thay て/で bằng た/だ theo 4 nhóm đuôi:",
      subgroups: [
        {
          category: "1. Đuôi い, ち, り",
          change: "→ った",
          example: "買います → 買った | 待ちます → 待った | 帰ります → 帰った",
        },
        {
          category: "2. Đuôi み, び, に",
          change: "→ んだ",
          example: "飲みます → 飲んだ | 呼びます → 呼んだ | 死にます → 死んだ",
        },
        {
          category: "3. Đuôi き, ぎ",
          change: "き → いた | ぎ → いだ",
          example: "書きます → 書いた | 泳ぎます → 泳いだ",
        },
        {
          category: "4. Đuôi し",
          change: "→ した",
          example: "話します → 話した",
        },
      ],
    },
    group2: {
      pattern: "Bỏ ます + た",
      example: "食べます → 食べた | 見ます → 見た | 起きます → 起きた",
    },
    group3: {
      note: "Bao gồm します đơn, Danh từ ghép + します (勉強します, 散歩します...), và 来ます",
      items: [
        { word: "します", conjugated: "した" },
        { word: "Danh từ + します (VD: 勉強します)", conjugated: "勉強した" },
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
    summary: "Dùng trong giao tiếp thân mật (không làm V), hoặc các cấu trúc cấm đoán, khuyên bảo và nghĩa vụ.",
    patterns: [
      { structure: "Vない + でください", meaning: "Xin đừng làm V (Lời khuyên / Yêu cầu cấm)" },
      { structure: "Vない + ければなりません", meaning: "Phải làm V (Nghĩa vụ bắt buộc)" },
      { structure: "Vない + ほうがいいです", meaning: "Không nên làm V (Lời khuyên)" },
      { structure: "Vない + で + V2", meaning: "Làm V2 mà không làm V1" },
    ],
    group1: {
      pattern: "Chuyển âm hàng い sang âm hàng あ tương ứng + ない theo 4 nhóm đuôi:",
      subgroups: [
        {
          category: "1. Đuôi い, ち, り",
          change: "い → わない | ち → たない | り → らない",
          example: "買います → 買わない | 待ちます → 待たない | 帰ります → 帰らない",
        },
        {
          category: "2. Đuôi み, び, に",
          change: "み → まない | び → ばない | に → なない",
          example: "飲みます → 飲まない | 呼びます → 呼ばない | 死にます → 死なない",
        },
        {
          category: "3. Đuôi き, ぎ",
          change: "き → かない | ぎ → がない",
          example: "書きます → 書かない | 泳ぎます → 泳がない",
        },
        {
          category: "4. Đuôi し",
          change: "し → さない",
          example: "話します → 話さない",
        },
      ],
    },
    group2: {
      pattern: "Bỏ ます + ない",
      example: "食べます → 食べない | 見ます → 見ない | 起きます → 起きない",
    },
    group3: {
      note: "Bao gồm します đơn, Danh từ ghép + します (勉強します, 散歩します...), và 来ます",
      items: [
        { word: "します", conjugated: "しない" },
        { word: "Danh từ + します (VD: 勉強します)", conjugated: "勉強しない" },
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
    summary: "Dạng nguyên thể gốc trong từ điển. Dùng trong thể thông thường, diễn tả khả năng, sở thích hoặc kế hoạch.",
    patterns: [
      { structure: "V辞書 + ことができます", meaning: "Có thể làm V (Khả năng)" },
      { structure: "趣味は V辞書 + ことです", meaning: "Sở thích là làm V" },
      { structure: "V辞書 + つもり / 予定です", meaning: "Dự định / Kế hoạch làm V" },
      { structure: "V辞書 + まえに", meaning: "Trước khi làm V..." },
    ],
    group1: {
      pattern: "Chuyển âm hàng い sang âm hàng う tương ứng theo 4 nhóm đuôi:",
      subgroups: [
        {
          category: "1. Đuôi い, ち, り",
          change: "い → う | ち → つ | り → る",
          example: "買います → 買う | 待ちます → 待つ | 帰ります → 帰る",
        },
        {
          category: "2. Đuôi み, び, に",
          change: "み → む | び → ぶ | に → ぬ",
          example: "飲みます → 飲む | 呼びます → 呼ぶ | 死にます → 死ぬ",
        },
        {
          category: "3. Đuôi き, ぎ",
          change: "き → く | ぎ → ぐ",
          example: "書きます → 書く | 泳ぎます → 泳ぐ",
        },
        {
          category: "4. Đuôi し",
          change: "し → す",
          example: "話します → 話す",
        },
      ],
    },
    group2: {
      pattern: "Bỏ ます + る",
      example: "食べます → 食べる | 見ます → 見る | 起きます → 起きる",
    },
    group3: {
      note: "Bao gồm します đơn, Danh từ ghép + します (勉強します, 散歩します...), và 来ます",
      items: [
        { word: "します", conjugated: "する" },
        { word: "Danh từ + します (VD: 勉強します)", conjugated: "勉強する" },
        { word: "来ます (きます)", conjugated: "来る (くる)" },
      ],
    },
  },

  MASU: {
    title: "Thể ます (Lịch sự)",
    jpName: "ます形",
    summary: "Thể lịch sự tiêu chuẩn dùng khi giao tiếp hàng ngày với người ngoài, cấp trên hoặc đề nghị giúp đỡ.",
    patterns: [
      { structure: "Vます (bỏ ます) + ましょう", meaning: "Cùng làm V nhé! (Rủ rê lịch sự)" },
      { structure: "Vます (bỏ ます) + ましょうか", meaning: "Tôi làm V giúp bạn nhé? (Đề nghị)" },
      { structure: "Vます (bỏ ます) + に行きます", meaning: "Đi để làm V (Mục đích di chuyển)" },
      { structure: "Vます (bỏ ます) + たいです", meaning: "Muốn làm V (Mong muốn cá nhân)" },
      { structure: "Vます (bỏ ます) + やすい / にくい", meaning: "Dễ làm V / Khó làm V" },
    ],
    group1: {
      pattern: "Chuyển âm hàng う sang âm hàng い tương ứng + ます theo 4 nhóm đuôi:",
      subgroups: [
        {
          category: "1. Đuôi う, つ, る",
          change: "う → い | つ → ち | る → り",
          example: "買う → 買います | 待つ → 待ちます | 帰る → 帰ります",
        },
        {
          category: "2. Đuôi む, ぶ, ぬ",
          change: "む → み | ぶ → び | ぬ → に",
          example: "飲む → 飲みます | 呼ぶ → 呼びます | 死ぬ → 死にます",
        },
        {
          category: "3. Đuôi く, ぐ",
          change: "く → き | ぐ → ぎ",
          example: "書く → 書きます | 泳ぐ → 泳ぎます",
        },
        {
          category: "4. Đuôi す",
          change: "す → し",
          example: "話す → 話します",
        },
      ],
    },
    group2: {
      pattern: "Bỏ る + ます",
      example: "食べる → 食べます | 見る → 見ます | 起きる → 起きます",
    },
    group3: {
      note: "Bao gồm する đơn, Danh từ ghép + する (勉強する, 散歩する...), và 来る",
      items: [
        { word: "する", conjugated: "します" },
        { word: "Danh từ + する (VD: 勉強する)", conjugated: "勉強します" },
        { word: "来る (くる)", conjugated: "来ます (きます)" },
      ],
    },
  },

  POTENTIAL: {
    title: "Thể Khả năng (可能形)",
    jpName: "可能形",
    summary: "Diễn tả khả năng có thể làm được việc gì đó của bản thân hoặc điều kiện cho phép.",
    patterns: [
      { structure: "N が V可能", meaning: "Có thể làm V (Trợ từ đổi thành が)" },
      { structure: "V可能 + ようになります", meaning: "Trở nên có thể làm V (Thay đổi năng lực)" },
      { structure: "V可能 + なくなります", meaning: "Trở nên không thể làm V" },
    ],
    group1: {
      pattern: "Chuyển âm hàng い sang âm hàng え + る theo 4 nhóm đuôi:",
      subgroups: [
        {
          category: "1. Đuôi い, ち, り",
          change: "い → える | ち → てる | り → れる",
          example: "買います → 買える | 待ちます → 待てる | 帰ります → 帰れる",
        },
        {
          category: "2. Đuôi み, び, に",
          change: "み → める | び → べれる | に → ねる",
          example: "飲みます → 飲める | 呼びます → 呼べれる | 死にます → 死ねる",
        },
        {
          category: "3. Đuôi き, ぎ",
          change: "き → ける | ぎ → げる",
          example: "書きます → 書ける | 泳ぎます → 泳げる",
        },
        {
          category: "4. Đuôi し",
          change: "し → せる",
          example: "話します → 話せる",
        },
      ],
    },
    group2: {
      pattern: "Bỏ ます + られる",
      example: "食べます → 食べられる | 見ます → 見られる | 起きます → 起きられる",
    },
    group3: {
      note: "Bao gồm します đơn, Danh từ ghép + します (勉強します, 散歩します...), và 来ます",
      items: [
        { word: "します", conjugated: "できる" },
        { word: "Danh từ + します (VD: 勉強します)", conjugated: "勉強できる" },
        { word: "来ます (きます)", conjugated: "来られる (こられる)" },
      ],
    },
  },

  VOLITIONAL: {
    title: "Thể Ý định (意向形)",
    jpName: "意向形",
    summary: "Dùng để rủ rê, đề nghị thân mật (Cùng làm... nhé!) hoặc diễn tả dự định/kế hoạch.",
    patterns: [
      { structure: "V意向", meaning: "Cùng làm V nhé! (Rủ rê thân mật)" },
      { structure: "V意向 + と思っています", meaning: "Đang có ý định làm V (Kế hoạch ấp ủ)" },
      { structure: "V意向 + とします", meaning: "Sắp sửa / Định làm V thì..." },
    ],
    group1: {
      pattern: "Chuyển âm hàng い sang âm hàng お + う theo 4 nhóm đuôi:",
      subgroups: [
        {
          category: "1. Đuôi い, ち, り",
          change: "い → おう | ち → とう | り → ろう",
          example: "買います → 買おう | 待ちます → 待とう | 帰ります → 帰ろう",
        },
        {
          category: "2. Đuôi み, び, に",
          change: "み → もう | び → ぼう | に → のう",
          example: "飲みます → 飲もう | 呼びます → 呼ぼう | 死にます → 死のう",
        },
        {
          category: "3. Đuôi き, ぎ",
          change: "き → こう | ぎ → ごう",
          example: "書きます → 書こう | 泳ぎます → 泳ごう",
        },
        {
          category: "4. Đuôi し",
          change: "し → そう",
          example: "話します → 話そう",
        },
      ],
    },
    group2: {
      pattern: "Bỏ ます + よう",
      example: "食べます → 食べよう | 見ます → 見よう | 起きます → 起きよう",
    },
    group3: {
      note: "Bao gồm します đơn, Danh từ ghép + します (勉強します, 散歩します...), và 来ます",
      items: [
        { word: "します", conjugated: "しよう" },
        { word: "Danh từ + します (VD: 勉強します)", conjugated: "勉強しよう" },
        { word: "来ます (きます)", conjugated: "来よう (こよう)" },
      ],
    },
  },

  IMPERATIVE: {
    title: "Thể Mệnh lệnh (命令形)",
    jpName: "命令形",
    summary: "Dùng để ra lệnh dứt khoát, trong tình huống khẩn cấp, trích dẫn lệnh hoặc cấm đoán.",
    patterns: [
      { structure: "V命令", meaning: "Hãy làm V ngay! (Mệnh lệnh dứt khoát)" },
      { structure: "V辞書 + な", meaning: "Cấm làm V! (Mệnh lệnh cấm)" },
      { structure: "～ と言いました", meaning: "Bảo là / Ra lệnh là..." },
    ],
    group1: {
      pattern: "Chuyển âm hàng い sang âm hàng え theo 4 nhóm đuôi:",
      subgroups: [
        {
          category: "1. Đuôi い, ち, り",
          change: "い → え | ち → て | り → れ",
          example: "買います → 買え | 待ちます → 待て | 帰ります → 帰れ",
        },
        {
          category: "2. Đuôi み, び, に",
          change: "み → め | び → べ | に → ね",
          example: "飲みます → 飲め | 呼びます → 呼べ | 死にます → 死ね",
        },
        {
          category: "3. Đuôi き, ぎ",
          change: "き → け | ぎ → げ",
          example: "書きます → 書け | 泳ぎます → 泳げ",
        },
        {
          category: "4. Đuôi し",
          change: "し → せ",
          example: "話します → 話せ",
        },
      ],
    },
    group2: {
      pattern: "Bỏ ます + ろ",
      example: "食べます → 食べろ | 見ます → 見ろ | 起きます → 起きろ",
    },
    group3: {
      note: "Bao gồm します đơn, Danh từ ghép + します (勉強します, 散歩します...), và 来ます",
      items: [
        { word: "します", conjugated: "しろ" },
        { word: "Danh từ + します (VD: 勉強します)", conjugated: "勉強しろ" },
        { word: "来ます (きます)", conjugated: "来い (こい)" },
      ],
    },
  },

  CONDITIONAL_BA: {
    title: "Thể Điều kiện (ば形)",
    jpName: "ば形",
    summary: "Diễn tả điều kiện giả định (Nếu... thì...), lời khuyên hoặc kết quả tất yếu.",
    patterns: [
      { structure: "Vば + いいです(か)", meaning: "Nếu làm V thì tốt / Nên làm V thế nào?" },
      { structure: "Vば + V辞書 + ほど", meaning: "Càng làm V thì càng..." },
      { structure: "Vば + ...のに", meaning: "Giá mà / Nếu làm V thì đã..." },
    ],
    group1: {
      pattern: "Chuyển âm hàng い sang âm hàng え + ば theo 4 nhóm đuôi:",
      subgroups: [
        {
          category: "1. Đuôi い, ち, り",
          change: "い → えば | ち → てば | り → れば",
          example: "買います → 買えば | 待ちます → 待てば | 帰ります → 帰れば",
        },
        {
          category: "2. Đuôi み, び, に",
          change: "み → めば | び → べば | に → ねば",
          example: "飲みます → 飲めば | 呼びます → 呼べば | 死にます → 死ねば",
        },
        {
          category: "3. Đuôi き, ぎ",
          change: "き → けば | ぎ → げば",
          example: "書きます → 書けば | 泳ぎます → 泳げば",
        },
        {
          category: "4. Đuôi し",
          change: "し → せば",
          example: "話します → 話せば",
        },
      ],
    },
    group2: {
      pattern: "Bỏ ます + れば",
      example: "食べます → 食べれば | 見ます → 見れば | 起きます → 起きれば",
    },
    group3: {
      note: "Bao gồm します đơn, Danh từ ghép + します (勉強します, 散歩します...), và 来ます",
      items: [
        { word: "します", conjugated: "すれば" },
        { word: "Danh từ + します (VD: 勉強します)", conjugated: "勉強すれば" },
        { word: "来ます (きます)", conjugated: "来れば (くれば)" },
      ],
    },
  },

  PASSIVE: {
    title: "Thể Bị động (受身形)",
    jpName: "受身形",
    summary: "Diễn tả hành động bị/được người khác thực hiện lên bản thân, hoặc sự kiện cộng đồng.",
    patterns: [
      { structure: "N1 は N2 に V受身", meaning: "N1 bị / được N2 làm V" },
      { structure: "N は (Địa điểm) で V受身", meaning: "N được tổ chức / phát minh ở..." },
      { structure: "N1 は N2 に N3 を V受身", meaning: "N1 bị N2 làm hại đến N3 (Bị động phiền phức)" },
    ],
    group1: {
      pattern: "Chuyển âm hàng い sang âm hàng あ + れる theo 4 nhóm đuôi:",
      subgroups: [
        {
          category: "1. Đuôi い, ち, り",
          change: "い → われる | ち → たれる | り → られる",
          example: "買います → 買われる | 待ちます → 待たれる | 帰ります → 帰られる",
        },
        {
          category: "2. Đuôi み, び, に",
          change: "み → まれる | び → ばれる | に → なれる",
          example: "飲みます → 飲まれる | 呼びます → 呼ばれる | 死にます → 死なれる",
        },
        {
          category: "3. Đuôi き, ぎ",
          change: "き → かれる | ぎ → がれる",
          example: "書きます → 書かれる | 泳ぎます → 泳がれる",
        },
        {
          category: "4. Đuôi し",
          change: "し → される",
          example: "話します → 話される",
        },
      ],
    },
    group2: {
      pattern: "Bỏ ます + られる",
      example: "食べます → 食べられる | 見ます → 見られる | 起きます → 起きられる",
    },
    group3: {
      note: "Bao gồm します đơn, Danh từ ghép + します (勉強します, 散歩します...), và 来ます",
      items: [
        { word: "します", conjugated: "される" },
        { word: "Danh từ + します (VD: 勉強します)", conjugated: "勉強される" },
        { word: "来ます (きます)", conjugated: "来られる (こられる)" },
      ],
    },
  },

  CAUSATIVE: {
    title: "Thể Sai khiến (使役形)",
    jpName: "使役形",
    summary: "Diễn tả việc bắt ai đó hoặc cho phép ai đó thực hiện hành động.",
    patterns: [
      { structure: "N1 は N2 に V使役", meaning: "N1 bắt / cho phép N2 làm V" },
      { structure: "V使役 (bỏ る) + ていただけませんか", meaning: "Cho phép tôi làm V được không? (Xin phép)" },
      { structure: "V使役 + てください", meaning: "Hãy cho phép tôi làm V" },
    ],
    group1: {
      pattern: "Chuyển âm hàng い sang âm hàng あ + せる theo 4 nhóm đuôi:",
      subgroups: [
        {
          category: "1. Đuôi い, ち, り",
          change: "い → わせる | ち → たせる | り → らせる",
          example: "買います → 買わせる | 待ちます → 待たせる | 帰ります → 帰らせる",
        },
        {
          category: "2. Đuôi み, び, に",
          change: "み → ませる | び → ばせる | に → なせる",
          example: "飲みます → 飲ませる | 呼びます → 呼ばせる | 死にます → 死なせる",
        },
        {
          category: "3. Đuôi き, ぎ",
          change: "き → かせる | ぎ → がせる",
          example: "書きます → 書かせる | 泳ぎます → 泳がせる",
        },
        {
          category: "4. Đuôi し",
          change: "し → させる",
          example: "話します → 話させる",
        },
      ],
    },
    group2: {
      pattern: "Bỏ ます + させる",
      example: "食べます → 食べさせる | 見ます → 見させる | 起きます → 起きさせる",
    },
    group3: {
      note: "Bao gồm します đơn, Danh từ ghép + します (勉強します, 散歩します...), và 来ます",
      items: [
        { word: "します", conjugated: "させる" },
        { word: "Danh từ + します (VD: 勉強します)", conjugated: "勉強させる" },
        { word: "来ます (きます)", conjugated: "来させる (こさせる)" },
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
    <div className="bg-[#FFFCF7] border border-[#DED3C8] rounded-3xl p-4 sm:p-5 shadow-sm space-y-4 max-w-full overflow-hidden">
      {/* Header & Selector */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#EBE1D7]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#F0705A]/10 text-[#C65D4B] flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-black text-sm sm:text-base text-[#C65D4B] truncate">
            {ruleData.title}
          </h3>
        </div>

        {/* Quick Form Selector Dropdown */}
        <select
          value={currentFormToUse}
          onChange={(e) => handleSelectForm(e.target.value as ConjugationForm)}
          className="bg-[#FAF6F0] border border-[#DED3C8] rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#C65D4B] focus:outline-none focus:ring-2 focus:ring-[#C65D4B]/30 cursor-pointer shrink-0 max-w-[140px] sm:max-w-none"
        >
          {ALL_FORMS_LIST.map((f) => (
            <option key={f} value={f}>
              {getFormDisplayName(f)}
            </option>
          ))}
        </select>
      </div>

      {/* Summary & Grammar Patterns Section */}
      <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#EBE1D7] space-y-3 text-xs text-[#564A42]">
        <div className="leading-relaxed">
          <span className="font-extrabold text-[#C65D4B] inline-block mr-1">💡 Cách dùng:</span>
          <span className="font-medium text-[#4A4039]">{ruleData.summary}</span>
        </div>

        {ruleData.patterns && ruleData.patterns.length > 0 && (
          <div className="pt-2.5 border-t border-[#EBE1D7] space-y-2">
            <span className="font-black text-[#302A26] text-[11px] uppercase tracking-wider block">
              📌 Các cấu trúc câu thường gặp:
            </span>
            <div className="space-y-2">
              {ruleData.patterns.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white p-2.5 rounded-xl border border-[#EBE1D7] space-y-1 shadow-2xs"
                >
                  <div className="font-black text-[#C65D4B] text-xs leading-snug break-words">
                    {p.structure}
                  </div>
                  <div className="text-[#6E635B] text-[11px] font-semibold leading-tight">
                    → {p.meaning}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Group Rules Section */}
      <div className="space-y-3.5 text-xs text-[#302A26]">
        
        {/* NHÓM I (GODAN) */}
        <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#EBE1D7] space-y-2.5">
          <div className="flex flex-col gap-0.5">
            <span className="px-2.5 py-0.5 rounded-md bg-[#C65D4B]/10 text-[#C65D4B] font-black text-xs self-start">
              Nhóm I (Godan)
            </span>
            <span className="text-[11px] text-[#756A62] font-bold mt-1">{ruleData.group1.pattern}</span>
          </div>

          {/* 4 Subgroups of Group 1 */}
          <div className="space-y-2 pt-1">
            {ruleData.group1.subgroups.map((sub, idx) => (
              <div
                key={idx}
                className="bg-white p-2.5 rounded-xl border border-[#EBE1D7] space-y-1 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-black text-[#302A26] text-xs bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-[#EBE1D7]">
                    {sub.category}
                  </span>
                  <span className="font-extrabold text-[#C65D4B] text-xs">
                    {sub.change}
                  </span>
                </div>
                <div className="text-[11px] text-[#6E635B] font-medium leading-relaxed break-words pt-0.5">
                  <span className="text-[#A0958C] text-[10px] font-bold mr-1">VD:</span>
                  {sub.example}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NHÓM II (ICHIDAN) */}
        <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#EBE1D7] space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-100/80 text-indigo-800 font-black text-xs">
              Nhóm II (Ichidan)
            </span>
            <span className="text-[11px] font-bold text-[#302A26]">{ruleData.group2.pattern}</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-[#EBE1D7] text-[11px] font-semibold text-[#564A42] shadow-2xs space-y-0.5">
            <span className="text-[#756A62] text-[10px] uppercase font-bold block">Ví dụ:</span>
            <div className="font-bold text-[#302A26]">{ruleData.group2.example}</div>
          </div>
        </div>

        {/* NHÓM III (BẤT QUY TẮC) */}
        <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#EBE1D7] space-y-2.5">
          <div className="flex flex-col gap-0.5">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100/80 text-emerald-800 font-black text-xs self-start">
              Nhóm III (Bất quy tắc)
            </span>
            {ruleData.group3.note && (
              <span className="text-[10px] text-[#756A62] font-semibold mt-0.5">
                💡 {ruleData.group3.note}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            {ruleData.group3.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white px-3 py-2 rounded-xl border border-[#EBE1D7] flex items-center justify-between gap-2 text-xs shadow-2xs"
              >
                <span className="text-[#302A26] font-bold break-words">{item.word}</span>
                <span className="font-black text-[#C65D4B] flex items-center gap-1 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 text-[#C65D4B]" />
                  {item.conjugated}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* NGOẠI LỆ ĐẶC BIỆT (NẾU CÓ) */}
        {ruleData.exception && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Ngoại Lệ Đóng Vai Trò Quan Trọng!</span>
            </div>
            <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200 text-xs font-bold flex items-center justify-between gap-2">
              <span>{ruleData.exception.word}</span>
              <span className="text-[#C65D4B] font-black shrink-0">→ {ruleData.exception.conjugated}</span>
            </div>
            <p className="text-[11px] text-amber-800/90 leading-tight pt-0.5">{ruleData.exception.note}</p>
          </div>
        )}

      </div>
    </div>
  );
}
