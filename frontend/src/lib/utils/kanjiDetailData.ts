import { KANJI_MEANING_MAP, COMMON_VOCAB_MAP, getSinoVietnamese } from "./kanjiDictionaryMap";


export interface KanjiVocabItem {
  word: string;
  reading: string;
  meaning: string;
}

export interface KanjiDetailData {
  displayOrder: number | string;
  character: string;
  sinoVi: string; // e.g. "HỘI"
  strokeCount: number;
  radical?: string;
  meaningVi: string; // e.g. "gặp, hội, cuộc họp"
  kunyomi: string; // e.g. "あ（う）"
  kunyomiFormatted: string; // e.g. "あ（う） → 会う（あう） = gặp"
  kunExamples: KanjiVocabItem[];
  onyomi: string; // e.g. "カイ、エ"
  onyomiFormatted: string; // e.g. "カイ、エ → 会社（かいしゃ）, 会議（かいぎ）, 会場（かいじょう）"
  onExamples: KanjiVocabItem[];
  importantVocab: KanjiVocabItem[];
}

export const KANJI_RICH_DATABASE: Record<string, Partial<KanjiDetailData>> = {
  会: {
    character: "会",
    sinoVi: "HỘI",
    strokeCount: 6,
    radical: "人",
    meaningVi: "gặp, hội, cuộc họp",
    kunyomi: "あ（う）",
    kunyomiFormatted: "あ（う） → 会う（あう） = gặp",
    kunExamples: [{ word: "会う", reading: "あう", meaning: "gặp" }],
    onyomi: "カイ、エ",
    onyomiFormatted: "カイ、エ → 会社（かいしゃ）, 会議（かいぎ）, 会場（かいじょう）",
    onExamples: [
      { word: "会社", reading: "かいしゃ", meaning: "công ty" },
      { word: "会議", reading: "かいぎ", meaning: "cuộc họp" },
      { word: "会場", reading: "かいじょう", meaning: "hội trường/địa điểm" },
    ],
    importantVocab: [
      { word: "会う", reading: "あう", meaning: "gặp" },
      { word: "会社", reading: "かいしゃ", meaning: "công ty" },
      { word: "会議", reading: "かいぎ", meaning: "cuộc họp" },
      { word: "会場", reading: "かいじょう", meaning: "hội trường/địa điểm" },
    ],
  },
  社: {
    character: "社",
    sinoVi: "XÃ",
    strokeCount: 7,
    radical: "示",
    meaningVi: "xã hội, công ty, đền thờ",
    kunyomi: "やしろ",
    kunyomiFormatted: "やしろ → 社（やしろ） = đền thờ",
    kunExamples: [{ word: "社", reading: "やしろ", meaning: "đền thờ" }],
    onyomi: "シャ",
    onyomiFormatted: "シャ → 会社（かいしゃ）, 社長（しゃちょう）, 社会（しゃかい）",
    onExamples: [
      { word: "会社", reading: "かいしゃ", meaning: "công ty" },
      { word: "社長", reading: "しゃちょう", meaning: "giám đốc" },
      { word: "社会", reading: "しゃかい", meaning: "xã hội" },
    ],
    importantVocab: [
      { word: "会社", reading: "かいしゃ", meaning: "công ty" },
      { word: "社長", reading: "しゃちょう", meaning: "giám đốc/chủ tịch" },
      { word: "社会", reading: "しゃかい", meaning: "xã hội" },
      { word: "神社", reading: "じんじゃ", meaning: "đền thờ Shinto" },
    ],
  },
  国: {
    character: "国",
    sinoVi: "QUỐC",
    strokeCount: 8,
    radical: "口",
    meaningVi: "đất nước, quốc gia",
    kunyomi: "くに",
    kunyomiFormatted: "くに → 国（くに） = đất nước",
    kunExamples: [{ word: "国", reading: "くに", meaning: "đất nước" }],
    onyomi: "コク",
    onyomiFormatted: "コク → 外国（がいこく）, 中国（ちゅうごく）, 韓国（かんこく）",
    onExamples: [
      { word: "外国", reading: "がいこく", meaning: "nước ngoài" },
      { word: "中国", reading: "ちゅうごく", meaning: "Trung Quốc" },
      { word: "韓国", reading: "かんこく", meaning: "Hàn Quốc" },
    ],
    importantVocab: [
      { word: "国", reading: "くに", meaning: "đất nước" },
      { word: "外国", reading: "がいこく", meaning: "nước ngoài" },
      { word: "外国人", reading: "がいこくじん", meaning: "người nước ngoài" },
      { word: "中国", reading: "ちゅうごく", meaning: "Trung Quốc" },
    ],
  },
  校: {
    character: "校",
    sinoVi: "GIÁO",
    strokeCount: 10,
    radical: "木",
    meaningVi: "trường học",
    kunyomi: "—",
    kunyomiFormatted: "—",
    kunExamples: [],
    onyomi: "コウ",
    onyomiFormatted: "コウ → 学校（がっこう）, 高校（こうこう）, 校長（こうちょう）",
    onExamples: [
      { word: "学校", reading: "がっこう", meaning: "trường học" },
      { word: "高校", reading: "こうこう", meaning: "trường cấp 3" },
      { word: "校長", reading: "こうちょう", meaning: "hiệu trưởng" },
    ],
    importantVocab: [
      { word: "学校", reading: "がっこう", meaning: "trường học" },
      { word: "高校", reading: "こうこう", meaning: "trường trung học phổ thông" },
      { word: "校長", reading: "こうちょう", meaning: "hiệu trưởng" },
      { word: "小学校", reading: "しょうがっこう", meaning: "trường tiểu học" },
    ],
  },
  店: {
    character: "店",
    sinoVi: "TIỆM",
    strokeCount: 8,
    radical: "广",
    meaningVi: "cửa hàng, quán",
    kunyomi: "みせ",
    kunyomiFormatted: "みせ → 店（みせ） = cửa hàng",
    kunExamples: [{ word: "店", reading: "みせ", meaning: "cửa hàng" }],
    onyomi: "テン",
    onyomiFormatted: "テン → 店員（てんいん）, 喫茶店（きっさてん）, 売店（ばいてん）",
    onExamples: [
      { word: "店員", reading: "てんいん", meaning: "nhân viên bán hàng" },
      { word: "喫茶店", reading: "きっさてん", meaning: "quán cà phê" },
      { word: "売店", reading: "ばいてん", meaning: "quầy bán hàng" },
    ],
    importantVocab: [
      { word: "店", reading: "みせ", meaning: "cửa hàng" },
      { word: "店員", reading: "てんいん", meaning: "nhân viên cửa hàng" },
      { word: "喫茶店", reading: "きっさてん", meaning: "quán cà phê" },
      { word: "売店", reading: "ばいてん", meaning: "căn tin/quầy bán hàng" },
    ],
  },
  駅: {
    character: "駅",
    sinoVi: "DỊCH",
    strokeCount: 14,
    radical: "馬",
    meaningVi: "nhà ga",
    kunyomi: "—",
    kunyomiFormatted: "—",
    kunExamples: [],
    onyomi: "エキ",
    onyomiFormatted: "エキ → 駅（えき）, 駅前（えきまえ）, 駅員（えきいん）",
    onExamples: [
      { word: "駅", reading: "えき", meaning: "nhà ga" },
      { word: "駅前", reading: "えきまえ", meaning: "trước nhà ga" },
      { word: "駅員", reading: "えきいん", meaning: "nhân viên nhà ga" },
    ],
    importantVocab: [
      { word: "駅", reading: "えき", meaning: "nhà ga" },
      { word: "駅前", reading: "えきまえ", meaning: "khu vực trước nhà ga" },
      { word: "駅員", reading: "えきいん", meaning: "nhân viên nhà ga" },
      { word: "東京駅", reading: "とうきょうえき", meaning: "Ga Tokyo" },
    ],
  },
  車: {
    character: "車",
    sinoVi: "XA",
    strokeCount: 7,
    radical: "車",
    meaningVi: "xe cộ, bánh xe",
    kunyomi: "くるま",
    kunyomiFormatted: "くるま → 車（くるま） = xe ô tô",
    kunExamples: [{ word: "車", reading: "くるま", meaning: "xe ô tô" }],
    onyomi: "シャ",
    onyomiFormatted: "シャ → 電車（でんしゃ）, 自動車（じどうしゃ）, 自転車（じてんしゃ）",
    onExamples: [
      { word: "電車", reading: "でんしゃ", meaning: "tàu điện" },
      { word: "自動車", reading: "じどうしゃ", meaning: "xe xe hơi/ô tô" },
      { word: "自転車", reading: "じてんしゃ", meaning: "xe đạp" },
    ],
    importantVocab: [
      { word: "車", reading: "くるま", meaning: "xe ô tô" },
      { word: "電車", reading: "でんしゃ", meaning: "tàu điện" },
      { word: "自転車", reading: "じてんしゃ", meaning: "xe đạp" },
      { word: "自動車", reading: "じどうしゃ", meaning: "xe hơi/ô tô" },
    ],
  },
  人: {
    character: "人",
    sinoVi: "NHÂN",
    strokeCount: 2,
    radical: "人",
    meaningVi: "người, nhân loại",
    kunyomi: "ひと",
    kunyomiFormatted: "ひと → 人（ひと） = người, 一人（ひとり） = 1 người",
    kunExamples: [
      { word: "人", reading: "ひと", meaning: "người" },
      { word: "一人", reading: "ひとり", meaning: "1 người" },
    ],
    onyomi: "ジン、ニン",
    onyomiFormatted: "ジン、ニン → 日本人（にほんじん）, 三人（さんにん）",
    onExamples: [
      { word: "日本人", reading: "にほんじん", meaning: "người Nhật" },
      { word: "三人", reading: "さんにん", meaning: "3 người" },
    ],
    importantVocab: [
      { word: "人", reading: "ひと", meaning: "người" },
      { word: "一人", reading: "ひとり", meaning: "một mình / 1 người" },
      { word: "三人", reading: "さんにん", meaning: "3 người" },
      { word: "日本人", reading: "にほんじん", meaning: "người Nhật" },
    ],
  },
  日: {
    character: "日",
    sinoVi: "NHẬT",
    strokeCount: 4,
    radical: "日",
    meaningVi: "ngày, mặt trời, Nhật Bản",
    kunyomi: "ひ、か",
    kunyomiFormatted: "ひ、か → 日（ひ） = mặt trời/ngày, 三日（みっか） = ngày mùng 3",
    kunExamples: [
      { word: "日", reading: "ひ", meaning: "mặt trời/ngày" },
      { word: "三日", reading: "みっか", meaning: "ngày mùng 3 / 3 ngày" },
    ],
    onyomi: "ニチ、ジツ",
    onyomiFormatted: "ニチ、ジツ → 日本（にほん）, 毎日（まいにち）, 日曜日（にちようび）",
    onExamples: [
      { word: "日本", reading: "にほん", meaning: "Nhật Bản" },
      { word: "毎日", reading: "まいにち", meaning: "hàng ngày" },
      { word: "日曜日", reading: "にちようび", meaning: "Chủ Nhật" },
    ],
    importantVocab: [
      { word: "日", reading: "ひ", meaning: "ngày / mặt trời" },
      { word: "日本", reading: "にほん", meaning: "Nhật Bản" },
      { word: "毎日", reading: "まいにち", meaning: "mỗi ngày" },
      { word: "日曜日", reading: "にちようび", meaning: "Chủ Nhật" },
    ],
  },
  月: {
    character: "月",
    sinoVi: "NGUYỆT",
    strokeCount: 4,
    radical: "月",
    meaningVi: "tháng, mặt trăng",
    kunyomi: "つき",
    kunyomiFormatted: "つき → 月（つき） = mặt trăng",
    kunExamples: [{ word: "月", reading: "つき", meaning: "mặt trăng" }],
    onyomi: "ゲツ、ガツ",
    onyomiFormatted: "ゲツ、ガツ → 一月（いちがつ）, 月曜日（げつようび）, 今月（こんげつ）",
    onExamples: [
      { word: "一月", reading: "いちがつ", meaning: "tháng 1" },
      { word: "月曜日", reading: "げつようび", meaning: "Thứ Hai" },
      { word: "今月", reading: "こんげつ", meaning: "tháng này" },
    ],
    importantVocab: [
      { word: "月", reading: "つき", meaning: "mặt trăng" },
      { word: "今月", reading: "こんげつ", meaning: "tháng này" },
      { word: "月曜日", reading: "げつようび", meaning: "Thứ Hai" },
      { word: "毎月", reading: "まいつき/まいげつ", meaning: "mỗi tháng" },
    ],
  },
  火: {
    character: "火",
    sinoVi: "HỎA",
    strokeCount: 4,
    radical: "火",
    meaningVi: "ngọn lửa, hỏa hoạn",
    kunyomi: "ひ",
    kunyomiFormatted: "ひ → 火（ひ） = ngọn lửa",
    kunExamples: [{ word: "火", reading: "ひ", meaning: "ngọn lửa" }],
    onyomi: "カ",
    onyomiFormatted: "カ → 火曜日（かようび）, 火事（かじ）, 花火（はなび）",
    onExamples: [
      { word: "火曜日", reading: "かようび", meaning: "Thứ Ba" },
      { word: "火事", reading: "かじ", meaning: "hỏa hoạn" },
      { word: "花火", reading: "はなび", meaning: "pháo hoa" },
    ],
    importantVocab: [
      { word: "火", reading: "ひ", meaning: "ngọn lửa" },
      { word: "火曜日", reading: "かようび", meaning: "Thứ Ba" },
      { word: "火事", reading: "かじ", meaning: "hỏa hoạn" },
      { word: "花火", reading: "はなび", meaning: "pháo hoa" },
    ],
  },
  水: {
    character: "水",
    sinoVi: "THỦY",
    strokeCount: 4,
    radical: "水",
    meaningVi: "nước uống, thủy lợi",
    kunyomi: "みず",
    kunyomiFormatted: "みず → 水（みず） = nước uống",
    kunExamples: [{ word: "水", reading: "みず", meaning: "nước uống" }],
    onyomi: "スイ",
    onyomiFormatted: "スイ → 水曜日（すいようび）, 水泳（すいえい）, 水着（みずぎ）",
    onExamples: [
      { word: "水曜日", reading: "すいようび", meaning: "Thứ Tư" },
      { word: "水泳", reading: "すいえい", meaning: "bơi lội" },
    ],
    importantVocab: [
      { word: "水", reading: "みず", meaning: "nước" },
      { word: "水曜日", reading: "すいようび", meaning: "Thứ Tư" },
      { word: "水泳", reading: "すいえい", meaning: "bơi lội" },
      { word: "海水", reading: "かいすい", meaning: "nước biển" },
    ],
  },
  木: {
    character: "木",
    sinoVi: "MỘC",
    strokeCount: 4,
    radical: "木",
    meaningVi: "cây cối, gỗ",
    kunyomi: "き",
    kunyomiFormatted: "き → 木（き） = cái cây",
    kunExamples: [{ word: "木", reading: "き", meaning: "cái cây" }],
    onyomi: "モク、ボク",
    onyomiFormatted: "モク、ボク → 木曜日（もくようび）, 大木（たいぼく）",
    onExamples: [
      { word: "木曜日", reading: "もくようび", meaning: "Thứ Năm" },
      { word: "大木", reading: "たいぼく", meaning: "cây cổ thụ" },
    ],
    importantVocab: [
      { word: "木", reading: "き", meaning: "cái cây" },
      { word: "木曜日", reading: "もくようび", meaning: "Thứ Năm" },
      { word: "木材", reading: "もくざい", meaning: "gỗ xây dựng" },
    ],
  },
  金: {
    character: "金",
    sinoVi: "KIM",
    strokeCount: 8,
    radical: "金",
    meaningVi: "vàng, tiền bạc, kim loại",
    kunyomi: "かね",
    kunyomiFormatted: "かね → お金（おかね） = tiền bạc",
    kunExamples: [{ word: "お金", reading: "おかね", meaning: "tiền bạc" }],
    onyomi: "キン",
    onyomiFormatted: "キン → 金曜日（きんようび）, 料金（りょうきん）, 金メダル（きんめだる）",
    onExamples: [
      { word: "金曜日", reading: "きんようび", meaning: "Thứ Sáu" },
      { word: "料金", reading: "りょうきん", meaning: "tiền phí" },
    ],
    importantVocab: [
      { word: "お金", reading: "おかね", meaning: "tiền bạc" },
      { word: "金曜日", reading: "きんようび", meaning: "Thứ Sáu" },
      { word: "料金", reading: "りょうきん", meaning: "tiền phí" },
      { word: "現金", reading: "げんきん", meaning: "tiền mặt" },
    ],
  },
  土: {
    character: "土",
    sinoVi: "THỔ",
    strokeCount: 3,
    radical: "土",
    meaningVi: "đất đai, thổ địa",
    kunyomi: "つち",
    kunyomiFormatted: "つち → 土（つち） = đất",
    kunExamples: [{ word: "土", reading: "つち", meaning: "đất" }],
    onyomi: "ド、ト",
    onyomiFormatted: "ド、ト → 土曜日（どようび）, 土地（とち）",
    onExamples: [
      { word: "土曜日", reading: "どようび", meaning: "Thứ Bảy" },
      { word: "土地", reading: "とち", meaning: "đất đai" },
    ],
    importantVocab: [
      { word: "土", reading: "つち", meaning: "đất" },
      { word: "土曜日", reading: "どようび", meaning: "Thứ Bảy" },
      { word: "土地", reading: "とち", meaning: "đất đai" },
    ],
  },
  買: {
    character: "買",
    sinoVi: "MÃI",
    strokeCount: 12,
    radical: "貝",
    meaningVi: "mua sắm",
    kunyomi: "か（う）",
    kunyomiFormatted: "か（う） → 買う（かう） = mua",
    kunExamples: [{ word: "買う", reading: "かう", meaning: "mua" }],
    onyomi: "バイ",
    onyomiFormatted: "バイ → 売買（ばいばい）, 買収（ばいしゅう）",
    onExamples: [
      { word: "売買", reading: "ばいばい", meaning: "mua bán" },
    ],
    importantVocab: [
      { word: "買う", reading: "かう", meaning: "mua" },
      { word: "買い物", reading: "かいもの", meaning: "mua sắm" },
      { word: "売買", reading: "ばいばい", meaning: "giao dịch mua bán" },
    ],
  },
  食: {
    character: "食",
    sinoVi: "THỰC",
    strokeCount: 9,
    radical: "食",
    meaningVi: "ăn, thực phẩm, bữa ăn",
    kunyomi: "た（べる）",
    kunyomiFormatted: "た（べる） → 食べる（たべる） = ăn",
    kunExamples: [{ word: "食べる", reading: "たべる", meaning: "ăn" }],
    onyomi: "ショク",
    onyomiFormatted: "ショク → 食事（しょくじ）, 食堂（しょくどう）, 朝食（ちょうしょく）",
    onExamples: [
      { word: "食事", reading: "しょくじ", meaning: "bữa ăn" },
      { word: "食堂", reading: "しょくどう", meaning: "nhà ăn" },
      { word: "朝食", reading: "ちょうしょく", meaning: "bữa sáng" },
    ],
    importantVocab: [
      { word: "食べる", reading: "たべる", meaning: "ăn" },
      { word: "食べ物", reading: "たべもの", meaning: "thức ăn" },
      { word: "食事", reading: "しょくじ", meaning: "bữa ăn" },
      { word: "食堂", reading: "しょくどう", meaning: "nhà ăn/quán ăn" },
    ],
  },
  飲: {
    character: "飲",
    sinoVi: "ẨM",
    strokeCount: 12,
    radical: "食",
    meaningVi: "uống, đồ uống",
    kunyomi: "の（む）",
    kunyomiFormatted: "の（む） → 飲む（のむ） = uống",
    kunExamples: [{ word: "飲む", reading: "のむ", meaning: "uống" }],
    onyomi: "イン",
    onyomiFormatted: "イン → 飲料（いんりょう）, 飲酒（いんしゅ）",
    onExamples: [
      { word: "飲料", reading: "いんりょう", meaning: "thức uống" },
      { word: "飲酒", reading: "いんしゅ", meaning: "uống rượu" },
    ],
    importantVocab: [
      { word: "飲む", reading: "のむ", meaning: "uống" },
      { word: "飲み物", reading: "のみもの", meaning: "đồ uống" },
      { word: "飲料水", reading: "いんりょうすい", meaning: "nước uống" },
    ],
  },
  見: {
    character: "見",
    sinoVi: "KIẾN",
    strokeCount: 7,
    radical: "見",
    meaningVi: "nhìn, xem, ý kiến",
    kunyomi: "み（る）",
    kunyomiFormatted: "み（る） → 見る（みる） = nhìn/xem",
    kunExamples: [{ word: "見る", reading: "みる", meaning: "nhìn/xem" }],
    onyomi: "ケン",
    onyomiFormatted: "ケン → 意見（いけん）, 見学（けんがく）",
    onExamples: [
      { word: "意見", reading: "いけん", meaning: "ý kiến" },
      { word: "見学", reading: "けんがく", meaning: "tham quan học tập" },
    ],
    importantVocab: [
      { word: "見る", reading: "みる", meaning: "nhìn/xem" },
      { word: "見せる", reading: "みせる", meaning: "cho xem" },
      { word: "意見", reading: "いけん", meaning: "ý kiến" },
      { word: "見学", reading: "けんがく", meaning: "tham quan thực tế" },
    ],
  },
  行: {
    character: "行",
    sinoVi: "HÀNH",
    strokeCount: 6,
    radical: "行",
    meaningVi: "đi, tiến hành, hàng lối",
    kunyomi: "い（く）、おこな（う）",
    kunyomiFormatted: "い（く） → 行く（いく） = đi",
    kunExamples: [
      { word: "行く", reading: "いく", meaning: "đi" },
      { word: "行う", reading: "おこなう", meaning: "tiến hành" },
    ],
    onyomi: "コウ、ギョウ",
    onyomiFormatted: "コウ、ギョウ → 銀行（ぎんこう）, 行動（こうどう）, 旅行（りょこう）",
    onExamples: [
      { word: "銀行", reading: "ぎんこう", meaning: "ngân hàng" },
      { word: "旅行", reading: "りょこう", meaning: "du lịch" },
    ],
    importantVocab: [
      { word: "行く", reading: "いく", meaning: "đi" },
      { word: "銀行", reading: "ぎんこう", meaning: "ngân hàng" },
      { word: "旅行", reading: "りょこう", meaning: "du lịch" },
      { word: "行う", reading: "おこなう", meaning: "thực hiện/tiến hành" },
    ],
  },
  来: {
    character: "来",
    sinoVi: "LAI",
    strokeCount: 7,
    radical: "木",
    meaningVi: "đến, tương lai",
    kunyomi: "く（る）",
    kunyomiFormatted: "く（る） → 来る（くる） = đến",
    kunExamples: [{ word: "来る", reading: "くる", meaning: "đến" }],
    onyomi: "ライ",
    onyomiFormatted: "ライ → 来週（らいしゅう）, 来年（らいねん）, 未来（みらい）",
    onExamples: [
      { word: "来週", reading: "らいしゅう", meaning: "tuần sau" },
      { word: "来年", reading: "らいねん", meaning: "năm sau" },
      { word: "未来", reading: "みらい", meaning: "tương lai" },
    ],
    importantVocab: [
      { word: "来る", reading: "くる", meaning: "đến" },
      { word: "来週", reading: "らいしゅう", meaning: "tuần sau" },
      { word: "来年", reading: "らいねん", meaning: "năm sau" },
      { word: "未来", reading: "みらい", meaning: "tương lai" },
    ],
  },
};

// Extended dictionary of common N5/N4 Kanji with exact definitions & vocabulary translations
export const MORE_KANJI_DATABASE: Record<string, Partial<KanjiDetailData>> = {
  所: {
    character: "所",
    sinoVi: "SỞ",
    strokeCount: 8,
    radical: "戸",
    meaningVi: "Nơi chốn, địa điểm, trụ sở",
    kunyomi: "ところ",
    kunyomiFormatted: "ところ → 所（ところ）, 台所（だいどころ）",
    kunExamples: [
      { word: "所", reading: "ところ", meaning: "Nơi chốn, địa điểm" },
      { word: "台所", reading: "だいどころ", meaning: "Nhà bếp, gian bếp" },
    ],
    onyomi: "ショ",
    onyomiFormatted: "ショ → 事務所（じむしょ）, 住所（じゅうしょ）, 場所（ばしょ）",
    onExamples: [
      { word: "事務所", reading: "じむしょ", meaning: "Văn phòng làm việc" },
      { word: "住所", reading: "じゅうしょ", meaning: "Địa chỉ nhà" },
      { word: "場所", reading: "ばしょ", meaning: "Địa điểm, vị trí" },
    ],
    importantVocab: [
      { word: "所", reading: "ところ", meaning: "Nơi chốn, địa điểm" },
      { word: "台所", reading: "だいどころ", meaning: "Nhà bếp, gian bếp" },
      { word: "事務所", reading: "じむしょ", meaning: "Văn phòng làm việc" },
      { word: "住所", reading: "じゅうしょ", meaning: "Địa chỉ nhà" },
    ],
  },
  図: {
    character: "図",
    sinoVi: "ĐỒ",
    strokeCount: 7,
    radical: "囗",
    meaningVi: "Bản đồ, sơ đồ, bức vẽ",
    kunyomi: "え",
    kunyomiFormatted: "え → 図画（ずが） = vẽ tranh",
    kunExamples: [],
    onyomi: "ズ、ト",
    onyomiFormatted: "ズ、ト → 地図（ちず）, 図書館（としょかん）",
    onExamples: [
      { word: "地図", reading: "ちず", meaning: "Bản đồ" },
      { word: "図書館", reading: "としょかん", meaning: "Thư viện" },
    ],
    importantVocab: [
      { word: "図", reading: "ず", meaning: "Sơ đồ, bản vẽ" },
      { word: "地図", reading: "ちず", meaning: "Bản đồ" },
      { word: "図書館", reading: "としょかん", meaning: "Thư viện" },
    ],
  },
  館: {
    character: "館",
    sinoVi: "QUÁN",
    strokeCount: 16,
    radical: "食",
    meaningVi: "Tòa nhà, hội quán, đại sảnh",
    kunyomi: "やかた",
    kunyomiFormatted: "やかた → 館（やかた） = dinh thự",
    kunExamples: [],
    onyomi: "カン",
    onyomiFormatted: "カン → 旅館（りょかん）, 美術館（びじゅつかん）, 図書館（としょかん）",
    onExamples: [
      { word: "旅館", reading: "りょかん", meaning: "Khách sạn kiểu truyền thống Nhật" },
      { word: "美術館", reading: "びじゅつかん", meaning: "Bảo tàng mỹ thuật" },
      { word: "図書館", reading: "としょかん", meaning: "Thư viện" },
    ],
    importantVocab: [
      { word: "旅館", reading: "りょかん", meaning: "Khách sạn kiểu truyền thống Nhật" },
      { word: "美術館", reading: "びじゅつかん", meaning: "Bảo tàng mỹ thuật" },
      { word: "図書館", reading: "としょかん", meaning: "Thư viện" },
      { word: "映画館", reading: "えいがかん", meaning: "Rạp chiếu phim" },
    ],
  },
  屋: {
    character: "屋",
    sinoVi: "ỐC",
    strokeCount: 9,
    radical: "尸",
    meaningVi: "Căn nhà, cửa hàng, mái nhà",
    kunyomi: "や",
    kunyomiFormatted: "や → 部屋（へや）, 本屋（ほんや）, 屋上（おくじょう）",
    kunExamples: [
      { word: "部屋", reading: "へや", meaning: "Căn phòng" },
      { word: "本屋", reading: "ほんや", meaning: "Hiệu sách" },
    ],
    onyomi: "オク",
    onyomiFormatted: "オク → 屋上（おくじょう） = sân thượng",
    onExamples: [{ word: "屋上", reading: "おくじょう", meaning: "Sân thượng" }],
    importantVocab: [
      { word: "部屋", reading: "へや", meaning: "Căn phòng" },
      { word: "本屋", reading: "ほんや", meaning: "Hiệu sách" },
      { word: "屋上", reading: "おくじょう", meaning: "Sân thượng" },
    ],
  },
  堂: {
    character: "堂",
    sinoVi: "ĐƯỜNG",
    strokeCount: 11,
    radical: "土",
    meaningVi: "Ngôi đền, nhà lớn, hội trường",
    kunyomi: "—",
    kunyomiFormatted: "—",
    kunExamples: [],
    onyomi: "ドウ",
    onyomiFormatted: "ドウ → 食堂（しょくどう）, 講堂（こうどう）",
    onExamples: [
      { word: "食堂", reading: "しょくどう", meaning: "Nhà ăn, căn tin" },
      { word: "講堂", reading: "こうどう", meaning: "Giảng đường, hội trường" },
    ],
    importantVocab: [
      { word: "食堂", reading: "しょくどう", meaning: "Nhà ăn, căn tin" },
      { word: "講堂", reading: "こうどう", meaning: "Giảng đường, hội trường" },
    ],
  },
  場: {
    character: "場",
    sinoVi: "TRƯỜNG",
    strokeCount: 12,
    radical: "土",
    meaningVi: "Quảng trường, địa điểm, nơi chốn",
    kunyomi: "ば",
    kunyomiFormatted: "ば → 場所（ばしょ）, 広場（ひろば）",
    kunExamples: [
      { word: "場所", reading: "ばしょ", meaning: "Địa điểm, vị trí" },
      { word: "広場", reading: "ひろば", meaning: "Quảng trường" },
    ],
    onyomi: "ジョウ",
    onyomiFormatted: "ジョウ → 駐車場（ちゅうしゃじょう）, 会場（かいじょう）",
    onExamples: [
      { word: "駐車場", reading: "ちゅうしゃじょう", meaning: "Bãi đỗ xe" },
      { word: "会場", reading: "かいじょう", meaning: "Hội trường, địa điểm tổ chức" },
    ],
    importantVocab: [
      { word: "場所", reading: "ばしょ", meaning: "Địa điểm, vị trí" },
      { word: "広場", reading: "ひろば", meaning: "Quảng trường" },
      { word: "駐車場", reading: "ちゅうしゃじょう", meaning: "Bãi đỗ xe" },
    ],
  },
  家: {
    character: "家",
    sinoVi: "GIA",
    strokeCount: 10,
    radical: "宀",
    meaningVi: "Nhà cửa, gia đình, người chuyên môn",
    kunyomi: "いえ、うち",
    kunyomiFormatted: "いえ、うち → 家（いえ） = ngôi nhà, うち = nhà tôi",
    kunExamples: [{ word: "家", reading: "いえ", meaning: "Ngôi nhà" }],
    onyomi: "カ、ケ",
    onyomiFormatted: "カ、ケ → 家族（かぞく）, 家事（かじ）, 画家（がか）",
    onExamples: [
      { word: "家族", reading: "かぞく", meaning: "Gia đình" },
      { word: "家事", reading: "かじ", meaning: "Việc nhà, nội trợ" },
      { word: "画家", reading: "がか", meaning: "Họa sĩ" },
    ],
    importantVocab: [
      { word: "家", reading: "いえ", meaning: "Ngôi nhà" },
      { word: "家族", reading: "かぞく", meaning: "Gia đình" },
      { word: "家事", reading: "かじ", meaning: "Việc nhà" },
    ],
  },
  一: {
    character: "一",
    sinoVi: "NHẤT",
    strokeCount: 1,
    radical: "一",
    meaningVi: "Số 1, một",
    kunyomi: "ひと、ひとつ",
    kunyomiFormatted: "ひと → 一人（ひとり） = 1 người, 一つ（ひとつ） = 1 cái",
    kunExamples: [
      { word: "一つ", reading: "ひとつ", meaning: "1 cái (đếm vật)" },
      { word: "一人", reading: "ひとり", meaning: "1 người / một mình" },
      { word: "一日", reading: "ついたち", meaning: "Ngày mùng 1" },
    ],
    onyomi: "イチ、イツ",
    onyomiFormatted: "イチ、イツ → 一日（いちにち）, 一年（いちねん）, 一生懸命（いっしょうけんめい）",
    onExamples: [
      { word: "一日", reading: "いちにち", meaning: "1 ngày" },
      { word: "一年", reading: "いちねん", meaning: "1 năm" },
      { word: "一生懸命", reading: "いっしょうけんめい", meaning: "Cố gắng hết sức" },
    ],
    importantVocab: [
      { word: "一人", reading: "ひとり", meaning: "1 người / một mình" },
      { word: "一つ", reading: "ひとつ", meaning: "1 cái (đếm vật)" },
      { word: "一日", reading: "ついたち", meaning: "Ngày mùng 1" },
      { word: "一日", reading: "いちにち", meaning: "1 ngày" },
      { word: "一生懸命", reading: "いっしょうけんめい", meaning: "Cố gắng hết sức" },
    ],
  },
  二: {
    character: "二",
    sinoVi: "NHỊ",
    strokeCount: 2,
    radical: "二",
    meaningVi: "Số 2, hai",
    kunyomi: "ふた、ふたつ",
    kunyomiFormatted: "ふた → 二つ（ふたつ） = 2 cái, 二人（ふたり） = 2 người",
    kunExamples: [
      { word: "二つ", reading: "ふたつ", meaning: "2 cái (đếm vật)" },
      { word: "二人", reading: "ふたり", meaning: "2 người" },
      { word: "二日", reading: "ふつか", meaning: "Ngày mùng 2 / 2 ngày" },
    ],
    onyomi: "ニ",
    onyomiFormatted: "ニ → 二月（にかつ）, 二次会（にじかい）",
    onExamples: [
      { word: "二月", reading: "にかつ", meaning: "Tháng 2" },
      { word: "二次会", reading: "にじかい", meaning: "Tăng 2 (bữa tiệc)" },
    ],
    importantVocab: [
      { word: "二つ", reading: "ふたつ", meaning: "2 cái (đếm vật)" },
      { word: "二人", reading: "ふたり", meaning: "2 người" },
      { word: "二日", reading: "ふつか", meaning: "Ngày mùng 2 / 2 ngày" },
      { word: "二月", reading: "にかつ", meaning: "Tháng 2" },
    ],
  },
  三: {
    character: "三",
    sinoVi: "TAM",
    strokeCount: 3,
    radical: "一",
    meaningVi: "Số 3, ba",
    kunyomi: "みっ、みっつ",
    kunyomiFormatted: "みっ → 三日（みっか） = ngày mùng 3, 三つ（みっつ） = 3 cái",
    kunExamples: [
      { word: "三日", reading: "みっか", meaning: "Ngày mùng 3 / 3 ngày" },
      { word: "三つ", reading: "みっつ", meaning: "3 cái (đếm vật)" },
    ],
    onyomi: "サン",
    onyomiFormatted: "サン → 三人（さんにん）, 三月（さんがつ）, 三年（さんねん）",
    onExamples: [
      { word: "三人", reading: "さんにん", meaning: "3 người" },
      { word: "三月", reading: "さんがつ", meaning: "Tháng 3" },
      { word: "三年", reading: "さんねん", meaning: "3 năm" },
    ],
    importantVocab: [
      { word: "三日", reading: "みっか", meaning: "Ngày mùng 3 / 3 ngày" },
      { word: "三つ", reading: "みっつ", meaning: "3 cái (đếm vật)" },
      { word: "三人", reading: "さんにん", meaning: "3 người" },
      { word: "三月", reading: "さんがつ", meaning: "Tháng 3" },
    ],
  },
  四: {
    character: "四",
    sinoVi: "TỨ",
    strokeCount: 5,
    radical: "囗",
    meaningVi: "Số 4, bốn",
    kunyomi: "よっ、よっつ、よん、よ",
    kunyomiFormatted: "よっ → 四つ（よっつ） = 4 cái, 四日（よっか） = ngày mùng 4",
    kunExamples: [
      { word: "四つ", reading: "よっつ", meaning: "4 cái (đếm vật)" },
      { word: "四日", reading: "よっか", meaning: "Ngày mùng 4 / 4 ngày" },
    ],
    onyomi: "シ",
    onyomiFormatted: "シ → 四人（よにん）, 四月（しがつ）",
    onExamples: [
      { word: "四人", reading: "よにん", meaning: "4 người" },
      { word: "四月", reading: "しがつ", meaning: "Tháng 4" },
    ],
    importantVocab: [
      { word: "四つ", reading: "よっつ", meaning: "4 cái (đếm vật)" },
      { word: "四日", reading: "よっか", meaning: "Ngày mùng 4 / 4 ngày" },
      { word: "四人", reading: "よにん", meaning: "4 người" },
      { word: "四月", reading: "しがつ", meaning: "Tháng 4" },
    ],
  },
  五: {
    character: "五",
    sinoVi: "NGŨ",
    strokeCount: 4,
    radical: "二",
    meaningVi: "Số 5, năm",
    kunyomi: "いつ、いつつ",
    kunyomiFormatted: "いつ → 五つ（いつつ） = 5 cái, 五日（いつか） = ngày mùng 5",
    kunExamples: [
      { word: "五つ", reading: "いつつ", meaning: "5 cái (đếm vật)" },
      { word: "五日", reading: "いつか", meaning: "Ngày mùng 5 / 5 ngày" },
    ],
    onyomi: "ゴ",
    onyomiFormatted: "ゴ → 五人（ごにん）, 五月（ごがつ）",
    onExamples: [
      { word: "五人", reading: "ごにん", meaning: "5 người" },
      { word: "五月", reading: "ごがつ", meaning: "Tháng 5" },
    ],
    importantVocab: [
      { word: "五つ", reading: "いつつ", meaning: "5 cái (đếm vật)" },
      { word: "五日", reading: "いつか", meaning: "Ngày mùng 5 / 5 ngày" },
      { word: "五人", reading: "ごにん", meaning: "5 người" },
      { word: "五月", reading: "ごがつ", meaning: "Tháng 5" },
    ],
  },
  六: {
    character: "六",
    sinoVi: "LỤC",
    strokeCount: 4,
    radical: "八",
    meaningVi: "Số 6, sáu",
    kunyomi: "むっ、むっつ、むい",
    kunyomiFormatted: "むっ → 六つ（むっつ） = 6 cái, 六日（むいか） = ngày mùng 6",
    kunExamples: [
      { word: "六つ", reading: "むっつ", meaning: "6 cái (đếm vật)" },
      { word: "六日", reading: "むいか", meaning: "Ngày mùng 6 / 6 ngày" },
    ],
    onyomi: "ロク",
    onyomiFormatted: "ロク → 六人（ろくにん）, 六月（ろくがつ）",
    onExamples: [
      { word: "六人", reading: "ろくにん", meaning: "6 người" },
      { word: "六月", reading: "ろくがつ", meaning: "Tháng 6" },
    ],
    importantVocab: [
      { word: "六つ", reading: "むっつ", meaning: "6 cái (đếm vật)" },
      { word: "六日", reading: "むいか", meaning: "Ngày mùng 6 / 6 ngày" },
      { word: "六人", reading: "ろくにん", meaning: "6 người" },
      { word: "六月", reading: "ろくがつ", meaning: "Tháng 6" },
    ],
  },
  七: {
    character: "七",
    sinoVi: "THẤT",
    strokeCount: 2,
    radical: "一",
    meaningVi: "Số 7, bảy",
    kunyomi: "なな、なつ、なのか",
    kunyomiFormatted: "なな → 七つ（ななつ） = 7 cái, 七日（なのか） = ngày mùng 7",
    kunExamples: [
      { word: "七つ", reading: "ななつ", meaning: "7 cái (đếm vật)" },
      { word: "七日", reading: "なのか", meaning: "Ngày mùng 7 / 7 ngày" },
    ],
    onyomi: "シチ",
    onyomiFormatted: "シチ → 七人（しちにん）, 七月（しちがつ）",
    onExamples: [
      { word: "七人", reading: "しちにん", meaning: "7 người" },
      { word: "七月", reading: "しちがつ", meaning: "Tháng 7" },
    ],
    importantVocab: [
      { word: "七つ", reading: "ななつ", meaning: "7 cái (đếm vật)" },
      { word: "七日", reading: "なのか", meaning: "Ngày mùng 7 / 7 ngày" },
      { word: "七人", reading: "しちにん", meaning: "7 người" },
      { word: "七月", reading: "しちがつ", meaning: "Tháng 7" },
    ],
  },
  八: {
    character: "八",
    sinoVi: "BÁT",
    strokeCount: 2,
    radical: "八",
    meaningVi: "Số 8, tám",
    kunyomi: "やっ、やっつ、よう",
    kunyomiFormatted: "やっ → 八つ（やっつ） = 8 cái, 八日（ようか） = ngày mùng 8",
    kunExamples: [
      { word: "八つ", reading: "やっつ", meaning: "8 cái (đếm vật)" },
      { word: "八日", reading: "ようか", meaning: "Ngày mùng 8 / 8 ngày" },
    ],
    onyomi: "ハチ",
    onyomiFormatted: "ハチ → 八人（はちにん）, 八月（はちがつ）",
    onExamples: [
      { word: "八人", reading: "はちにん", meaning: "8 người" },
      { word: "八月", reading: "はちがつ", meaning: "Tháng 8" },
    ],
    importantVocab: [
      { word: "八つ", reading: "やっつ", meaning: "8 cái (đếm vật)" },
      { word: "八日", reading: "ようか", meaning: "Ngày mùng 8 / 8 ngày" },
      { word: "八人", reading: "はちにん", meaning: "8 người" },
      { word: "八月", reading: "はちがつ", meaning: "Tháng 8" },
    ],
  },
  九: {
    character: "九",
    sinoVi: "CỬU",
    strokeCount: 2,
    radical: "乙",
    meaningVi: "Số 9, chín",
    kunyomi: "ここの、ここのつ",
    kunyomiFormatted: "ここの → 九つ（ここのつ） = 9 cái, 九日（ここのか） = ngày mùng 9",
    kunExamples: [
      { word: "九つ", reading: "ここのつ", meaning: "9 cái (đếm vật)" },
      { word: "九日", reading: "ここのか", meaning: "Ngày mùng 9 / 9 ngày" },
    ],
    onyomi: "キュウ、ク",
    onyomiFormatted: "キュウ、ク → 九月（くがつ）",
    onExamples: [{ word: "九月", reading: "くがつ", meaning: "Tháng 9" }],
    importantVocab: [
      { word: "九つ", reading: "ここのつ", meaning: "9 cái (đếm vật)" },
      { word: "九日", reading: "ここのか", meaning: "Ngày mùng 9 / 9 ngày" },
      { word: "九月", reading: "くがつ", meaning: "Tháng 9" },
    ],
  },
  十: {
    character: "十",
    sinoVi: "THẬP",
    strokeCount: 2,
    radical: "十",
    meaningVi: "Số 10, mười",
    kunyomi: "とお、と",
    kunyomiFormatted: "とお → 十（とお） = 10 cái, 十日（とおか） = ngày mùng 10",
    kunExamples: [
      { word: "十", reading: "とお", meaning: "10 cái (đếm vật)" },
      { word: "十日", reading: "とおか", meaning: "Ngày mùng 10 / 10 ngày" },
    ],
    onyomi: "ジュウ",
    onyomiFormatted: "ジュウ → 十月（じゅうがつ）, 十分（じゅうぶん）",
    onExamples: [
      { word: "十月", reading: "じゅうがつ", meaning: "Tháng 10" },
      { word: "十分", reading: "じゅうぶん", meaning: "Đầy đủ" },
    ],
    importantVocab: [
      { word: "十", reading: "とお", meaning: "10 cái (đếm vật)" },
      { word: "十日", reading: "とおか", meaning: "Ngày mùng 10 / 10 ngày" },
      { word: "十月", reading: "じゅうがつ", meaning: "Tháng 10" },
      { word: "十分", reading: "じゅうぶん", meaning: "Đầy đủ" },
    ],
  },
  会: {
    character: "会",
    sinoVi: "HỘI",
    strokeCount: 6,
    radical: "人",
    meaningVi: "Gặp gỡ, hội họp, cuộc họp",
    kunyomi: "あ（う）",
    kunyomiFormatted: "あ（う） → 会う（あう） = gặp",
    kunExamples: [{ word: "会う", reading: "あう", meaning: "gặp" }],
    onyomi: "カイ、エ",
    onyomiFormatted: "カイ、エ → 会社（かいしゃ）, 会議（かいぎ）, 会場（かいじょう）",
    onExamples: [
      { word: "会社", reading: "かいしゃ", meaning: "công ty" },
      { word: "会議", reading: "かいぎ", meaning: "cuộc họp" },
      { word: "会場", reading: "かいじょう", meaning: "hội trường/địa điểm" },
    ],
    importantVocab: [
      { word: "会う", reading: "あう", meaning: "gặp gỡ" },
      { word: "会社", reading: "かいしゃ", meaning: "công ty" },
      { word: "会議", reading: "かいぎ", meaning: "cuộc họp" },
      { word: "会場", reading: "かいじょう", meaning: "hội trường/địa điểm" },
    ],
  },
  社: {
    character: "社",
    sinoVi: "XÃ",
    strokeCount: 7,
    radical: "示",
    meaningVi: "Xã hội, công ty, đền thờ",
    kunyomi: "やしろ",
    kunyomiFormatted: "やしろ → 社（やしろ） = đền thờ",
    kunExamples: [{ word: "社", reading: "やしろ", meaning: "đền thờ" }],
    onyomi: "シャ",
    onyomiFormatted: "シャ → 会社（かいしゃ）, 社長（しゃちょう）, 社会（しゃかい）",
    onExamples: [
      { word: "会社", reading: "かいしゃ", meaning: "công ty" },
      { word: "社長", reading: "しゃちょう", meaning: "giám đốc" },
      { word: "社会", reading: "しゃかい", meaning: "xã hội" },
    ],
    importantVocab: [
      { word: "会社", reading: "かいしゃ", meaning: "công ty" },
      { word: "社長", reading: "しゃちょう", meaning: "giám đốc/chủ tịch" },
      { word: "社会", reading: "しゃかい", meaning: "xã hội" },
      { word: "神社", reading: "じんじゃ", meaning: "đền thờ Shinto" },
    ],
  },
  国: {
    character: "国",
    sinoVi: "QUỐC",
    strokeCount: 8,
    radical: "口",
    meaningVi: "Đất nước, quốc gia",
    kunyomi: "くに",
    kunyomiFormatted: "くに → 国（くに） = đất nước",
    kunExamples: [{ word: "国", reading: "くに", meaning: "đất nước" }],
    onyomi: "コク",
    onyomiFormatted: "コク → 外国（がいこく）, 中国（ちゅうごく）, 韓国（かんこく）",
    onExamples: [
      { word: "外国", reading: "がいこく", meaning: "nước ngoài" },
      { word: "中国", reading: "ちゅうごく", meaning: "Trung Quốc" },
      { word: "韓国", reading: "かんこく", meaning: "Hàn Quốc" },
    ],
  },
};

// Fallback dictionary mapping Kanji character to true Vietnamese meaning

Object.assign(KANJI_RICH_DATABASE, MORE_KANJI_DATABASE);

/**
 * Helper to get exact compound word translation from dictionary or smart fallback
 */
function resolveVocabMeaning(word: string, fallbackSinoVi?: string): string {
  if (!word) return "Từ ghép ví dụ";

  // Check direct lookup
  if (COMMON_VOCAB_MAP[word]) return COMMON_VOCAB_MAP[word].meaning;

  // Check base verb without suffix like する
  const baseWord = word.replace(/(する|な|の|に)$/, "");
  if (COMMON_VOCAB_MAP[baseWord]) return COMMON_VOCAB_MAP[baseWord].meaning;

  // Smart fallback description if word is not in static dictionary
  if (fallbackSinoVi && fallbackSinoVi !== "—") {
    return `Ví dụ từ ghép với Hán tự ${fallbackSinoVi}`;
  }

  return "Từ ghép ví dụ";
}

/**
 * Smart helper that parses raw API props or database strings and returns
 * full structured Kanji details matching the user's exact standard.
 */
export function getKanjiDetails(item: {
  character: string;
  displayOrder?: number | string;
  sinoVi?: string;
  meaningVi?: string;
  kunyomi?: string;
  onyomi?: string;
  strokeCount?: number;
  radical?: string;
  kunExamples?: string;
  onExamples?: string;
}): KanjiDetailData {
  const char = item.character || "一";
  const preset = KANJI_RICH_DATABASE[char];

  const sinoVi = item.sinoVi || preset?.sinoVi || getSinoVietnamese(char) || "—";
  const strokeCount = item.strokeCount || preset?.strokeCount || 1;
  const radical = item.radical || preset?.radical || "—";

  // Check if meaningVi is missing or equal to Sino-Vietnamese reading (like "TAM", "NHẤT")
  let meaningVi = preset?.meaningVi || KANJI_MEANING_MAP[char];
  if (!meaningVi || meaningVi.trim().toUpperCase() === sinoVi.trim().toUpperCase()) {
    meaningVi = KANJI_MEANING_MAP[char] || item.meaningVi || `Chữ Hán ${char}`;
  }

  const kunyomi = item.kunyomi || preset?.kunyomi || "—";
  const onyomi = item.onyomi || preset?.onyomi || "—";

  // Build Kunyomi formatted string
  let kunyomiFormatted = preset?.kunyomiFormatted || "";
  let kunExamples: KanjiVocabItem[] = preset?.kunExamples ? [...preset.kunExamples] : [];

  if (!kunyomiFormatted && item.kunExamples) {
    kunyomiFormatted = `${kunyomi} → ${item.kunExamples}`;
  } else if (!kunyomiFormatted) {
    kunyomiFormatted = kunyomi;
  }

  // Build Onyomi formatted string
  let onyomiFormatted = preset?.onyomiFormatted || "";
  let onExamples: KanjiVocabItem[] = preset?.onExamples ? [...preset.onExamples] : [];

  if (!onyomiFormatted && item.onExamples) {
    onyomiFormatted = `${onyomi} → ${item.onExamples}`;
  } else if (!onyomiFormatted) {
    onyomiFormatted = onyomi;
  }

  // Parse raw examples from API string if preset not available
  if (kunExamples.length === 0 && item.kunExamples && item.kunExamples !== "—") {
    kunExamples = parseRawExampleString(item.kunExamples, sinoVi);
  }
  if (onExamples.length === 0 && item.onExamples && item.onExamples !== "—") {
    onExamples = parseRawExampleString(item.onExamples, sinoVi);
  }

  // Build "Important Vocab" list
  let importantVocab: KanjiVocabItem[] = preset?.importantVocab ? [...preset.importantVocab] : [];

  if (importantVocab.length === 0) {
    const combinedMap = new Map<string, KanjiVocabItem>();
    [...kunExamples, ...onExamples].forEach((ex) => {
      if (ex.word && !combinedMap.has(ex.word)) {
        combinedMap.set(ex.word, ex);
      }
    });
    importantVocab = Array.from(combinedMap.values());
  }

  // Enrich vocab items with exact translations from COMMON_VOCAB_MAP
  importantVocab = importantVocab.map((v) => {
    const meaning = resolveVocabMeaning(v.word, sinoVi);
    const lookup = COMMON_VOCAB_MAP[v.word] || COMMON_VOCAB_MAP[v.word.replace(/(する|な|の|に)$/, "")];
    return {
      word: v.word,
      reading: v.reading || lookup?.reading || v.word,
      meaning: (v.meaning && v.meaning !== "từ ghép ví dụ" && v.meaning !== "từ ghép") ? v.meaning : meaning,
    };
  });

  return {
    displayOrder: item.displayOrder ?? 1,
    character: char,
    sinoVi: sinoVi.toUpperCase(),
    strokeCount,
    radical,
    meaningVi,
    kunyomi,
    kunyomiFormatted,
    kunExamples,
    onyomi,
    onyomiFormatted,
    onExamples,
    importantVocab,
  };
}

/**
 * Helper to parse raw string like "うご → 動く(うごく), 動かす(うごかす)" or "会社(かいしゃ), 会議(かいぎ)"
 */
function parseRawExampleString(rawStr: string, sinoVi?: string): KanjiVocabItem[] {
  if (!rawStr || rawStr === "—") return [];

  // Strip prefix like "うご → " or "ひと → "
  const cleanedStr = rawStr.replace(/^[^\s]+[→⇒]\s*/, "").replace(/[※🔹🔸]/g, "");
  const parts = cleanedStr.split(/[,、;\n]+/).map((s) => s.trim()).filter(Boolean);

  return parts.map((part) => {
    // Pattern: Word(reading) e.g. 動く(うごく)
    const match = part.match(/^([^\(（]+)[\(（]([^\)）]+)[\)）]/);
    if (match) {
      const word = match[1].trim();
      const reading = match[2].trim();
      return {
        word,
        reading,
        meaning: resolveVocabMeaning(word, sinoVi),
      };
    }

    return {
      word: part,
      reading: COMMON_VOCAB_MAP[part]?.reading || part,
      meaning: resolveVocabMeaning(part, sinoVi),
    };
  });
}