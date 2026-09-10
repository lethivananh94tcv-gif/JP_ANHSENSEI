// Complete Kana to Romaji Engine supporting Hepburn & Kunrei-shiki variants
// Used across Verb Practice, Typing Mode, and Kanji Trainers

export function toRomajiVariants(kanaStr: string): string[] {
  if (!kanaStr) return [];

  const s = kanaStr.trim().toLowerCase();
  const variants = new Set<string>();

  const digraphs: Record<string, string> = {
    "きゃ": "kya", "きゅ": "kyu", "きょ": "kyo",
    "しゃ": "sha", "しゅ": "shu", "しょ": "sho",
    "ちゃ": "cha", "ちゅ": "chu", "ちょ": "cho",
    "にゃ": "nya", "にゅ": "nyu", "にょ": "nyo",
    "ひゃ": "hya", "ひゅ": "hyu", "ひょ": "hyo",
    "みゃ": "mya", "みゅ": "myu", "みょ": "myo",
    "りゃ": "rya", "りゅ": "ryu", "りょ": "ryo",
    "ぎゃ": "gya", "ぎゅ": "gyu", "ぎょ": "gyo",
    "じゃ": "ja", "じゅ": "ju", "じょ": "jo",
    "びゃ": "bya", "びゅ": "byu", "びょ": "byo",
    "ぴゃ": "pya", "ぴゅ": "pyu", "ぴょ": "pyo",
    "キャ": "kya", "キュ": "kyu", "キョ": "kyo",
    "シャ": "sha", "シュ": "shu", "ショ": "sho",
    "チャ": "cha", "チュ": "chu", "チョ": "cho",
    "ニャ": "nya", "ニュ": "nyu", "ニョ": "nyo",
    "ヒャ": "hya", "ヒュ": "hyu", "ヒョ": "hyo",
    "ミャ": "mya", "ミュ": "myu", "ミョ": "myo",
    "リャ": "rya", "リュ": "ryu", "リョ": "ryo",
    "ギャ": "gya", "ギュ": "gyu", "ギョ": "gyo",
    "ジャ": "ja", "ジュ": "ju", "ジョ": "jo",
    "ビャ": "bya", "ビュ": "byu", "ビョ": "byo",
    "ピャ": "pya", "ピュ": "pyu", "ピョ": "pyo",
    "ティ": "ti", "ディ": "di", "テュ": "tyu", "デュ": "dyu",
    "ファ": "fa", "フィ": "fi", "フェ": "fe", "フォ": "fo", "フュ": "fyu",
    "ウィ": "wi", "ウェ": "we", "ウォ": "wo",
    "ヴァ": "va", "ヴィ": "vi", "ヴェ": "ve", "ヴォ": "vo",
    "ツィ": "tsi", "チェ": "che", "シェ": "she", "ジェ": "je",
    "クォ": "kwo", "クァ": "kwa", "グァ": "gwa", "スィ": "si", "ズィ": "zi",
  };

  const singles: Record<string, string> = {
    "あ": "a", "い": "i", "う": "u", "え": "e", "お": "o",
    "か": "ka", "き": "ki", "く": "ku", "け": "ke", "こ": "ko",
    "さ": "sa", "し": "shi", "す": "su", "せ": "se", "そ": "so",
    "た": "ta", "ち": "chi", "つ": "tsu", "て": "te", "と": "to",
    "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no",
    "は": "ha", "ひ": "hi", "ふ": "fu", "へ": "he", "ほ": "ho",
    "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo",
    "や": "ya", "ゆ": "yu", "よ": "yo",
    "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro",
    "わ": "wa", "を": "wo", "ん": "n",
    "が": "ga", "ぎ": "gi", "ぐ": "gu", "げ": "ge", "ご": "go",
    "ざ": "za", "じ": "ji", "ず": "zu", "ぜ": "ze", "ぞ": "zo",
    "だ": "da", "ぢ": "ji", "づ": "zu", "で": "de", "ど": "do",
    "ば": "ba", "び": "bi", "ぶ": "bu", "べ": "be", "ぼ": "bo",
    "ぱ": "pa", "ぴ": "pi", "ぷ": "pu", "ぺ": "pe", "ぽ": "po",
    "ア": "a", "イ": "i", "ウ": "u", "エ": "e", "オ": "o",
    "カ": "ka", "キ": "ki", "ク": "ku", "ケ": "ke", "コ": "ko",
    "サ": "sa", "シ": "shi", "ス": "su", "セ": "se", "ソ": "so",
    "タ": "ta", "チ": "chi", "ツ": "tsu", "テ": "te", "ト": "to",
    "ナ": "na", "ニ": "ni", "ヌ": "nu", "ネ": "ne", "ノ": "no",
    "ハ": "ha", "ヒ": "hi", "フ": "fu", "ヘ": "he", "ホ": "ho",
    "マ": "ma", "ミ": "mi", "ム": "mu", "メ": "me", "モ": "mo",
    "ヤ": "ya", "ユ": "yu", "ヨ": "yo",
    "ラ": "ra", "リ": "ri", "ル": "ru", "レ": "re", "ロ": "ro",
    "ワ": "wa", "ヲ": "wo", "ン": "n",
    "ガ": "ga", "ギ": "gi", "グ": "gu", "ゲ": "ge", "ゴ": "go",
    "ザ": "za", "ジ": "ji", "ズ": "zu", "ゼ": "ze", "ゾ": "zo",
    "ダ": "da", "ヂ": "ji", "ヅ": "zu", "デ": "de", "ド": "do",
    "バ": "ba", "ビ": "bi", "ブ": "bu", "ベ": "be", "ボ": "bo",
    "パ": "pa", "ピ": "pi", "プ": "pu", "ペ": "pe", "ポ": "po",
    "ぁ": "a", "ぃ": "i", "ぅ": "u", "ぇ": "e", "ぉ": "o",
    "ァ": "a", "ィ": "i", "ゥ": "u", "ェ": "e", "ォ": "o",
  };

  let mainRomaji = "";
  let i = 0;
  while (i < s.length) {
    if (s[i] === "〜" || s[i] === "~" || s[i] === "～" || s[i] === "…" || s[i] === ".") {
      i++;
      continue;
    }

    // Sokuon (っ / ッ) - doubled consonant
    if ((s[i] === "っ" || s[i] === "ッ") && i + 1 < s.length) {
      const nextPair = s.substring(i + 1, i + 3);
      const nextChar = s[i + 1];
      let nextRomaji = "";
      if (digraphs[nextPair]) {
        nextRomaji = digraphs[nextPair];
      } else if (singles[nextChar]) {
        nextRomaji = singles[nextChar];
      }
      if (nextRomaji) {
        mainRomaji += nextRomaji[0];
      }
      i++;
      continue;
    }

    // Chōonpu (ー / — / -) - Katakana Long Vowel Mark
    if (s[i] === "ー" || s[i] === "—" || s[i] === "-") {
      const lastChar = mainRomaji.length > 0 ? mainRomaji[mainRomaji.length - 1] : "";
      if ("aeiou".includes(lastChar)) {
        mainRomaji += lastChar;
      }
      i++;
      continue;
    }

    const pair = s.substring(i, i + 2);
    if (digraphs[pair]) {
      mainRomaji += digraphs[pair];
      i += 2;
      continue;
    }

    const ch = s[i];
    if (singles[ch]) {
      mainRomaji += singles[ch];
    } else if (ch !== "〜" && ch !== "~" && ch !== "～") {
      mainRomaji += ch;
    }
    i++;
  }

  variants.add(mainRomaji);

  // Add Kunrei-shiki variants
  const kunrei = mainRomaji
    .replace(/shi/g, "si")
    .replace(/chi/g, "ti")
    .replace(/tsu/g, "tu")
    .replace(/ji/g, "zi")
    .replace(/fu/g, "hu");
  variants.add(kunrei);

  // Add Hepburn variants
  const hepburn = mainRomaji
    .replace(/ti/g, "chi")
    .replace(/si/g, "shi")
    .replace(/tu/g, "tsu")
    .replace(/zi/g, "ji")
    .replace(/hu/g, "fu");
  variants.add(hepburn);

  // Add long-vowel variants (ou -> o / oo, uu -> u)
  if (mainRomaji.includes("ou")) {
    variants.add(mainRomaji.replace(/ou/g, "o"));
    variants.add(mainRomaji.replace(/ou/g, "oo"));
  }

  return Array.from(variants);
}
