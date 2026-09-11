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

export function detectGroup(masuForm: string, kanjiForm?: string): VerbGroup {
  const text = (masuForm || '').trim();
  const textKanji = (kanjiForm || '').trim();

  // Check group 3 irregulars
  if (text.includes('します') || text === 'する' || text.endsWith('する') || textKanji.endsWith('する')) {
    return 'GROUP_3';
  }
  if (text.includes('きます') || text.includes('來ます') || text.includes('来ます') || text === 'くる' || text === '来る') {
    return 'GROUP_3';
  }

  // Masu form detection
  if (text.endsWith('ます')) {
    const stem = text.substring(0, text.length - 2);
    if (stem.length === 0) return 'GROUP_2';

    const lastChar = stem.charAt(stem.length - 1);
    const iColumn = ['い', 'ち', 'り', 'き', 'ぎ', 'み', 'び', 'に', 'し'];

    if (iColumn.includes(lastChar)) {
      // Group 1 verbs ending in i-column before masu
      return 'GROUP_1';
    } else {
      // e-column or single syllable (e.g. 見ます, 居ます)
      return 'GROUP_2';
    }
  }

  // Dictionary form fallback detection
  if (text.endsWith('る')) {
    return 'GROUP_2';
  }

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

  // If already target is MASU
  if (targetForm === 'MASU') {
    return text.endsWith('ます') ? text : text + 'ます';
  }

  // Check irregular exceptions
  if (text.includes('行きます') || text.includes('いきます') || text === '行く' || text === 'いく') {
    const prefix = text.includes('行き') ? '行' : (text.includes('いき') ? 'い' : '');
    switch (targetForm) {
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

  // Handle Group 3 (Suru / Kuru)
  if (group === 'GROUP_3') {
    if (text.endsWith('します') || text === 'する') {
      const stem = text.endsWith('します') ? text.substring(0, text.length - 3) : text.substring(0, text.length - 2);
      switch (targetForm) {
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
    if (text.endsWith('きます') || text.endsWith('来ます') || text === 'くる' || text === '来る') {
      const isKanji = text.includes('来');
      const stem = isKanji ? '来' : '';
      switch (targetForm) {
        case 'DICT': return stem ? '来る' : 'くる';
        case 'TE': return stem ? '来' : 'きて';
        case 'NAI': return stem ? '来ない' : 'こない';
        case 'TA': return stem ? '来た' : 'きた';
        case 'POTENTIAL': return stem ? '来られる' : 'こられる';
        case 'VOLITIONAL': return stem ? '来よう' : 'こよう';
        case 'IMPERATIVE': return stem ? '来い' : 'こい';
        case 'CONDITIONAL_BA': return stem ? '来れば' : 'くれば';
        case 'PASSIVE': return stem ? '来られる' : 'こられる';
        case 'CAUSATIVE': return stem ? '来させる' : 'こさせる';
      }
    }
  }

  // Handle Group 2 (Ichidan)
  if (group === 'GROUP_2') {
    let stem = text;
    if (text.endsWith('ます')) {
      stem = text.substring(0, text.length - 2);
    } else if (text.endsWith('る')) {
      stem = text.substring(0, text.length - 1);
    }
    switch (targetForm) {
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

  const uMap: Record<string, string> = { い: 'う', ち: 'つ', り: 'る', き: 'く', ぎ: 'ぐ', み: 'む', び: 'ぶ', に: 'ぬ', し: 'す' };
  const aMap: Record<string, string> = { い: 'わ', ち: 'た', り: 'ら', き: 'か', ぎ: 'が', み: 'ま', び: 'ば', に: 'な', し: 'さ' };
  const eMap: Record<string, string> = { い: 'え', ち: 'て', り: 'れ', き: 'け', ぎ: 'げ', み: 'め', び: 'べ', に: 'ね', し: 'せ' };
  const oMap: Record<string, string> = { い: 'お', ち: 'と', り: 'ろ', き: 'こ', ぎ: 'ご', み: 'も', び: 'ぼ', に: 'の', し: 'そ' };

  switch (targetForm) {
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
