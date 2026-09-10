export type VerbGroup = 'GROUP_1' | 'GROUP_2' | 'GROUP_3';

export type ConjugationForm =
  | 'MASU'
  | 'DICT'
  | 'TE'
  | 'NAI'
  | 'TA'
  | 'POTENTIAL'
  | 'VOLITIONAL'
  | 'IMPERATIVE'
  | 'CONDITIONAL_BA'
  | 'PASSIVE'
  | 'CAUSATIVE';

export interface VerbConjugationResult {
  masu: string;
  dict: string;
  te: string;
  nai: string;
  ta: string;
  potential: string;
  volitional: string;
  imperative: string;
  conditionalBa: string;
  passive: string;
  causative: string;
}

const GROUP_1_SU_VERBS = new Set([
  "話します", "はなします", "貸します", "かします", "消します", "けします",
  "押します", "おします", "直します", "なおします", "起こします", "おこします",
  "落とします", "おとします", "探します", "さがします", "回します", "まわします",
  "渡します", "わたします", "出します", "だします", "壊します", "こわします",
  "戻します", "もどします", "沸かします", "わかします", "冷やします", "ひやします",
  "蒸します", "むします", "動かします", "うごかします", "減らします", "へらします",
  "増やします", "ふやします", "残します", "のこします", "伸ばします", "のばします",
  "鳴らします", "ならします"
]);

const GROUP_2_I_EXCEPTIONS = new Set([
  "見ます", "みます", "起きます", "おきます", "借ります", "かります",
  "降ります", "ふります", "おります", "浴びます", "あびます",
  "居ます", "います", "足ります", "たります", "着ます", "きます",
  "落ちます", "おちます", "信じます", "しんじます", "閉じます", "とじます",
  "生きます", "いきます", "感じます", "かんじます", "過ぎます", "すぎます",
  "伸びます", "のびます", "似ます", "にます", "煮ます", "にます"
]);

const E_COLUMN_CHARS = new Set([
  'え', 'け', 'げ', 'せ', 'ぜ', 'て', 'で', 'ね', 'へ', 'べ', 'ぺ', 'め', 'れ',
  'エ', 'ケ', 'ゲ', 'セ', 'ゼ', 'テ', 'デ', 'ネ', 'ヘ', 'ベ', 'ペ', 'メ', 'レ'
]);

function isGroup3Kuru(str: string): boolean {
  return (
    str === '来ます' || str === 'きます' || str === 'くる' || str === '来る' ||
    str.endsWith('来ます') || str.endsWith('てきます') || str.endsWith('てくる') || str.endsWith('て来る')
  );
}

export function detectGroup(masuForm: string, kanjiForm?: string): VerbGroup {
  const text = (masuForm || '').trim();
  const textKanji = (kanjiForm || '').trim();

  if (!text && !textKanji) return 'GROUP_1';

  // 1. Group 3 Check
  if (isGroup3Kuru(text) || isGroup3Kuru(textKanji)) {
    return 'GROUP_3';
  }

  const isGroup1Su = GROUP_1_SU_VERBS.has(text) || GROUP_1_SU_VERBS.has(textKanji);
  if (!isGroup1Su) {
    if (
      text === 'します' || text === 'する' || text.endsWith('します') || text.endsWith('する') ||
      textKanji.endsWith('します') || textKanji.endsWith('する')
    ) {
      return 'GROUP_3';
    }
  }

  // 2. Group 2 Check
  if (GROUP_2_I_EXCEPTIONS.has(text) || GROUP_2_I_EXCEPTIONS.has(textKanji)) {
    return 'GROUP_2';
  }

  if (text.endsWith('ます')) {
    const stem = text.substring(0, text.length - 2);
    if (stem.length > 0) {
      const lastChar = stem.charAt(stem.length - 1);
      if (E_COLUMN_CHARS.has(lastChar)) {
        return 'GROUP_2';
      }
    }
  } else if (text.endsWith('る')) {
    const stem = text.substring(0, text.length - 1);
    if (stem.length > 0) {
      const lastChar = stem.charAt(stem.length - 1);
      if (E_COLUMN_CHARS.has(lastChar)) {
        return 'GROUP_2';
      }
    }
  }

  // 3. Fallback: Group 1
  return 'GROUP_1';
}

export function getFormDisplayName(form: ConjugationForm): string {
  switch (form) {
    case 'MASU': return 'Thể Masu (ます形)';
    case 'DICT': return 'Thể Từ điển (辞書形)';
    case 'TE': return 'Thể Te (て形)';
    case 'NAI': return 'Thể Phủ định (ない形)';
    case 'TA': return 'Thể Quá khứ (た形)';
    case 'POTENTIAL': return 'Thể Khả năng (可能形)';
    case 'VOLITIONAL': return 'Thể Ý định (意向形)';
    case 'IMPERATIVE': return 'Thể Mệnh lệnh (命令形)';
    case 'CONDITIONAL_BA': return 'Thể Điều kiện (仮定形 - ば)';
    case 'PASSIVE': return 'Thể Bị động (受身形)';
    case 'CAUSATIVE': return 'Thể Sai khiến (使役形)';
    default: return form;
  }
}

export function getGroupDisplayName(group: VerbGroup): string {
  switch (group) {
    case 'GROUP_1': return 'Nhóm I (Godan 五段)';
    case 'GROUP_2': return 'Nhóm II (Ichidan 一段)';
    case 'GROUP_3': return 'Nhóm III (Bất quy tắc 不規則)';
    default: return group;
  }
}

export function conjugate(masuForm: string, group: VerbGroup, targetForm: ConjugationForm): string {
  if (!masuForm) return '';

  const text = masuForm.trim();

  // Check irregular exceptions
  if (text.includes('行きます') || text.includes('いきます') || text === '行く' || text === 'いく') {
    const prefix = text.includes('行き') ? '行' : (text.includes('いき') ? 'い' : '');
    switch (targetForm) {
      case 'MASU': return prefix + 'きます';
      case 'DICT': return prefix + 'く';
      case 'TE': return prefix + 'いて';
      case 'NAI': return prefix + 'かない';
      case 'TA': return prefix + 'いた';
      case 'POTENTIAL': return prefix + 'ける';
      case 'VOLITIONAL': return prefix + 'こう';
      case 'IMPERATIVE': return prefix + 'け';
      case 'CONDITIONAL_BA': return prefix + 'けば';
      case 'PASSIVE': return prefix + 'かれる';
      case 'CAUSATIVE': return prefix + 'かせる';
    }
  }

  if (text.includes('あります') || text === 'ある') {
    if (targetForm === 'NAI') return 'ない';
  }

  const effectiveGroup = group || detectGroup(text);

  // Handle Group 3 (Suru / Kuru)
  if (effectiveGroup === 'GROUP_3') {
    if (isGroup3Kuru(text)) {
      const isKanji = text.includes('来');
      let stem = '';
      if (text.endsWith('来ます')) stem = text.substring(0, text.length - 3);
      else if (text.endsWith('きます')) stem = text.substring(0, text.length - 3);
      else if (text.endsWith('来る')) stem = text.substring(0, text.length - 2);
      else if (text.endsWith('くる')) stem = text.substring(0, text.length - 2);

      switch (targetForm) {
        case 'MASU': return stem + (isKanji ? '来ます' : 'きます');
        case 'DICT': return stem + (isKanji ? '来る' : 'くる');
        case 'TE': return stem + (isKanji ? '来て' : 'きて');
        case 'NAI': return stem + (isKanji ? '来ない' : 'こない');
        case 'TA': return stem + (isKanji ? '来た' : 'きた');
        case 'POTENTIAL': return stem + (isKanji ? '来られる' : 'こられる');
        case 'VOLITIONAL': return stem + (isKanji ? '来よう' : 'こよう');
        case 'IMPERATIVE': return stem + (isKanji ? '来い' : 'こい');
        case 'CONDITIONAL_BA': return stem + (isKanji ? '来れば' : 'くれば');
        case 'PASSIVE': return stem + (isKanji ? '来られる' : 'こられる');
        case 'CAUSATIVE': return stem + (isKanji ? '来させる' : 'こさせる');
      }
    }

    if (text.endsWith('します') || text === 'する' || text.endsWith('する')) {
      let stem = text.endsWith('します') ? text.substring(0, text.length - 3) :
                 (text.endsWith('する') ? text.substring(0, text.length - 2) : text);
      if (text === 'します' || text === 'する') stem = '';
      switch (targetForm) {
        case 'MASU': return stem + 'します';
        case 'DICT': return stem + 'する';
        case 'TE': return stem + 'して';
        case 'NAI': return stem + 'しない';
        case 'TA': return stem + 'した';
        case 'POTENTIAL': return stem + 'できる';
        case 'VOLITIONAL': return stem + 'しよう';
        case 'IMPERATIVE': return stem + 'しろ';
        case 'CONDITIONAL_BA': return stem + 'すれば';
        case 'PASSIVE': return stem + 'される';
        case 'CAUSATIVE': return stem + 'させる';
      }
    }
  }

  // Handle Group 2 (Ichidan)
  if (effectiveGroup === 'GROUP_2') {
    let stem = text;
    if (text.endsWith('ます')) {
      stem = text.substring(0, text.length - 2);
    } else if (text.endsWith('る')) {
      stem = text.substring(0, text.length - 1);
    }
    switch (targetForm) {
      case 'MASU': return stem + 'ます';
      case 'DICT': return stem + 'る';
      case 'TE': return stem + 'て';
      case 'NAI': return stem + 'ない';
      case 'TA': return stem + 'た';
      case 'POTENTIAL': return stem + 'られる';
      case 'VOLITIONAL': return stem + 'よう';
      case 'IMPERATIVE': return stem + 'ろ';
      case 'CONDITIONAL_BA': return stem + 'れば';
      case 'PASSIVE': return stem + 'られる';
      case 'CAUSATIVE': return stem + 'させる';
    }
  }

  // Handle Group 1 (Godan)
  let stem = text;
  let lastKana = '';
  if (text.endsWith('ます')) {
    stem = text.substring(0, text.length - 2);
    lastKana = stem.charAt(stem.length - 1);
    stem = stem.substring(0, stem.length - 1);
  } else {
    lastKana = text.charAt(text.length - 1);
    stem = text.substring(0, text.length - 1);
  }

  const iMap: Record<string, string> = {
    う: 'い', つ: 'ち', る: 'り', く: 'き', ぐ: 'ぎ', む: 'み', ぶ: 'び', ぬ: 'に', す: 'し',
    い: 'い', ち: 'ち', り: 'り', き: 'き', ぎ: 'ぎ', み: 'み', び: 'び', に: 'に', し: 'し'
  };
  const uMap: Record<string, string> = {
    い: 'う', ち: 'つ', り: 'る', き: 'く', ぎ: 'ぐ', み: 'む', び: 'ぶ', に: 'ぬ', し: 'す',
    う: 'う', つ: 'つ', る: 'る', く: 'く', ぐ: 'ぐ', む: 'む', ぶ: 'ぶ', ぬ: 'ぬ', す: 'す'
  };
  const aMap: Record<string, string> = {
    う: 'わ', つ: 'た', る: 'ら', く: 'か', ぐ: 'が', む: 'ま', ぶ: 'ば', ぬ: 'な', す: 'さ',
    い: 'わ', ち: 'た', り: 'ら', き: 'か', ぎ: 'が', み: 'ま', び: 'ば', に: 'な', し: 'さ'
  };
  const eMap: Record<string, string> = {
    う: 'え', つ: 'て', る: 'れ', く: 'け', ぐ: 'げ', む: 'め', ぶ: 'べ', ぬ: 'ね', す: 'せ',
    い: 'え', ち: 'て', り: 'れ', き: 'け', ぎ: 'げ', み: 'め', び: 'べ', に: 'ね', し: 'せ'
  };
  const oMap: Record<string, string> = {
    う: 'お', つ: 'と', る: 'ろ', く: 'こ', ぐ: 'ご', む: 'も', ぶ: 'ぼ', ぬ: 'の', す: 'そ',
    い: 'お', ち: 'と', り: 'ろ', き: 'こ', ぎ: 'ご', み: 'も', び: 'ぼ', に: 'の', し: 'そ'
  };

  switch (targetForm) {
    case 'MASU':
      return stem + (iMap[lastKana] || lastKana) + 'ます';
    case 'DICT':
      return stem + (uMap[lastKana] || lastKana);
    case 'NAI':
      return stem + (aMap[lastKana] || lastKana) + 'ない';
    case 'POTENTIAL':
      return stem + (eMap[lastKana] || lastKana) + 'る';
    case 'VOLITIONAL':
      return stem + (oMap[lastKana] || lastKana) + 'う';
    case 'IMPERATIVE':
      return stem + (eMap[lastKana] || lastKana);
    case 'CONDITIONAL_BA':
      return stem + (eMap[lastKana] || lastKana) + 'ば';
    case 'PASSIVE':
      return stem + (aMap[lastKana] || lastKana) + 'れる';
    case 'CAUSATIVE':
      return stem + (aMap[lastKana] || lastKana) + 'せる';
    case 'TE':
    case 'TA': {
      const suffix = targetForm === 'TE' ? 'て' : 'た';
      const suffixDakuten = targetForm === 'TE' ? 'で' : 'だ';

      if (['い', 'ち', 'り', 'う', 'つ', 'る'].includes(lastKana)) {
        return stem + 'っ' + suffix;
      }
      if (['み', 'び', 'に', 'む', 'ぶ', 'ぬ'].includes(lastKana)) {
        return stem + 'ん' + suffixDakuten;
      }
      if (['き', 'く'].includes(lastKana)) {
        return stem + 'い' + suffix;
      }
      if (['ぎ', 'ぐ'].includes(lastKana)) {
        return stem + 'い' + suffixDakuten;
      }
      if (['し', 'す'].includes(lastKana)) {
        return stem + 'し' + suffix;
      }
      return stem + lastKana + suffix;
    }
  }

  return text;
}

export function conjugateAll(masuForm: string, kanjiForm?: string): VerbConjugationResult {
  const group = detectGroup(masuForm, kanjiForm);
  return {
    masu: conjugate(masuForm, group, 'MASU'),
    dict: conjugate(masuForm, group, 'DICT'),
    te: conjugate(masuForm, group, 'TE'),
    nai: conjugate(masuForm, group, 'NAI'),
    ta: conjugate(masuForm, group, 'TA'),
    potential: conjugate(masuForm, group, 'POTENTIAL'),
    volitional: conjugate(masuForm, group, 'VOLITIONAL'),
    imperative: conjugate(masuForm, group, 'IMPERATIVE'),
    conditionalBa: conjugate(masuForm, group, 'CONDITIONAL_BA'),
    passive: conjugate(masuForm, group, 'PASSIVE'),
    causative: conjugate(masuForm, group, 'CAUSATIVE'),
  };
}

export function sanitizePureVerb(input: string): string {
  if (!input) return "";
  let clean = input.trim();
  clean = clean.replace(/^[～~\s]+/, "");
  // Remove English prefix if present (e.g., "megane をかけます" -> "かけます")
  clean = clean.replace(/^[a-zA-Z\s]+[をがにでへと]?\s*/, "");
  // If there are space-separated words, take the last word (the verb)
  if (clean.includes(" ") || clean.includes("\u3000")) {
    const parts = clean.split(/[\s\u3000]+/);
    const lastPart = parts[parts.length - 1];
    if (lastPart && lastPart.trim().length > 0) {
      return lastPart.trim();
    }
  }
  return clean;
}

