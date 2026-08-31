"use client";

import { useEffect, useState } from "react";
import JapaneseFuriganaText from "@/components/learner/JapaneseFuriganaText";
import { Edit3, CheckCircle2, XCircle, ArrowRight, Sparkles, RefreshCw, Volume2 } from "lucide-react";

export interface ClozeQuestion {
  id: number;
  type: "FILL_BLANK" | "TRANSFORMATION" | "GRAMMAR" | "PARTICLE" | "STRUCTURE" | "CONCEPT";
  title: string;
  promptJp: string;
  promptVi: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
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

interface GrammarClozeTransformPracticeProps {
  lessonNum: number;
  grammarPoints?: GrammarPointInput[];
  onComplete?: () => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getParticleDistractors(target: string): string[] {
  if (target === "は") return ["は", "が", "に", "で"];
  if (target === "ではありません") return ["ではありません", "です", "でした", "ます"];
  if (target === "じゃありません") return ["じゃありません", "ではありませんか", "ありません", "ないです"];
  if (target === "ですか") return ["ですか", "ですね", "ですよ", "ですが"];
  if (target === "も") return ["も", "は", "を", "に"];
  if (target === "の") return ["の", "と", "へ", "から"];
  if (target === "へ") return ["へ", "に", "で", "を"];
  if (target === "で") return ["で", "に", "へ", "を"];
  if (target === "を") return ["を", "が", "は", "に"];
  if (target === "に") return ["に", "で", "へ", "を"];
  if (target === "から") return ["から", "まで", "より", "ので"];
  if (target === "まで") return ["まで", "から", "ほど", "までで"];
  if (target === "どなた") return ["どなた", "だれ", "なん", "どこ"];
  if (target === "です") return ["です", "ます", "でした", "ません"];
  if (target === "ます") return ["ます", "です", "ました", "ません"];
  if (target === "ました") return ["ました", "ます", "ませんでした", "でした"];
  if (target === "ませんでした") return ["ませんでした", "ません", "ました", "でした"];
  if (target === "てください") return ["てください", "てはいけません", "てもいいです", "てくださいませんか"];
  if (target === "ています") return ["ています", "てあります", "ておきます", "てみます"];
  if (target === "てもいいです") return ["てもいいです", "てはいけません", "なければなりません", "てください"];
  if (target === "てはいけません") return ["てはいけません", "てもいいです", "てください", "ないでください"];
  if (target === "ながら") return ["ながら", "まえに", "あとで", "たら"];
  if (target === "しか") return ["しか", "だけ", "も", "は"];
  if (target === "が見えます") return ["が見えます", "が見られます", "を見ます", "を見せます"];
  if (target === "が聞こえます") return ["が聞こえます", "が聞けます", "を聞きます", "を聞かせます"];
  
  return [target, "は", "に", "で"].filter((val, idx, self) => self.indexOf(val) === idx).slice(0, 4);
}

export function autoGenerateClozeFromGrammarPoints(
  points: GrammarPointInput[],
  lessonNum: number
): ClozeQuestion[] {
  if (!points || points.length === 0) return [];

  const questions: ClozeQuestion[] = [];
  let qId = 1;

  points.forEach((point) => {
    const rawPattern = point.pattern || "";

    if (point.examples && point.examples.length > 0) {
      point.examples.forEach((ex) => {
        const text = ex.japaneseText || "";
        
        let targetKey = "";
        if (rawPattern.includes("ではありません")) targetKey = "ではありません";
        else if (rawPattern.includes("じゃありません")) targetKey = "じゃありません";
        else if (rawPattern.includes("ですか")) targetKey = "ですか";
        else if (rawPattern.includes(" は ")) targetKey = "は";
        else if (rawPattern.includes(" も ")) targetKey = "も";
        else if (rawPattern.includes(" の ")) targetKey = "の";
        else if (rawPattern.includes(" へ ")) targetKey = "へ";
        else if (rawPattern.includes(" で ")) targetKey = "で";
        else if (rawPattern.includes(" に ")) targetKey = "に";
        else if (rawPattern.includes(" を ")) targetKey = "を";
        else if (rawPattern.includes("から")) targetKey = "から";
        else if (rawPattern.includes("まで")) targetKey = "まで";
        else if (rawPattern.includes("てください")) targetKey = "てください";
        else if (rawPattern.includes("ています")) targetKey = "ています";

        let promptJp = text;
        let answer = targetKey;

        if (targetKey && text.includes(targetKey)) {
          promptJp = text.replace(targetKey, " [ ? ] ");
        } else {
          const words = text.split(/\s+/);
          if (words.length > 1) {
            answer = words[words.length - 1];
            promptJp = words.slice(0, -1).join(" ") + " [ ? ]";
          } else {
            promptJp = text + " [ ? ]";
            answer = "です";
          }
        }

        const options = getParticleDistractors(answer);

        questions.push({
          id: qId++,
          type: "FILL_BLANK",
          title: `Bài ${lessonNum}: Luyện tập mẫu 「${point.pattern}」`,
          promptJp: promptJp,
          promptVi: ex.meaningVi || point.meaning,
          options: shuffleArray(options),
          correctAnswer: answer,
          explanation: point.explanation || `Điền đúng mẫu ngữ pháp ${point.pattern}.`
        });
      });
    }

    questions.push({
      id: qId++,
      type: "GRAMMAR",
      title: `Bài ${lessonNum}: Ý nghĩa của 「${point.pattern}」`,
      promptJp: `Mẫu ngữ pháp 「${point.pattern}」 có ý nghĩa chính là gì?`,
      promptVi: `Chọn ý nghĩa chính xác cho mẫu ngữ pháp ${point.pattern}.`,
      options: shuffleArray([
        point.meaning,
        "Diễn tả hành động xảy ra ngắt quãng trong quá khứ",
        "Cảm ơn người khác một cách trang trọng",
        "Diễn tả khả năng xảy ra ở tương lai xa"
      ]),
      correctAnswer: point.meaning,
      explanation: point.explanation || `Ý nghĩa chuẩn: ${point.meaning}.`
    });

    if (point.structure) {
      questions.push({
        id: qId++,
        type: "STRUCTURE",
        title: `Bài ${lessonNum}: Cấu trúc 「${point.pattern}」`,
        promptJp: `Cấu trúc kết hợp của mẫu 「${point.pattern}」 là gì?`,
        promptVi: `Chọn công thức kết hợp đúng cho Bài ${lessonNum}.`,
        options: shuffleArray([
          point.structure,
          "V-ます + なければならない",
          "N + じゃありませんか",
          "V-普通形 + と思う"
        ]),
        correctAnswer: point.structure,
        explanation: `Cấu trúc chia: ${point.structure}.`
      });
    }
  });

  return questions;
}

function getLessonFallbackQuestions(num: number): ClozeQuestion[] {
  const n5QuestionsMap: Record<number, ClozeQuestion[]> = {
    1: [
      { id: 101, type: "GRAMMAR", title: "Bài 1: Cấu trúc N1 は N2 です", promptJp: "私（わたし） [ ? ] 学生（がくせい）です。", promptVi: "Chọn trợ từ đánh dấu chủ đề.", options: shuffleArray(["は", "が", "に", "で"]), correctAnswer: "は", explanation: "Trợ từ 「は」 đứng sau danh từ để đánh dấu chủ đề của câu." },
      { id: 102, type: "GRAMMAR", title: "Bài 1: Phủ định lịch sự (ではありません)", promptJp: "田中（たなか）さんは 先生（せんせい） [ ? ]。", promptVi: "Chọn dạng phủ định lịch sự của です.", options: shuffleArray(["ではありません", "です", "でした", "ます"]), correctAnswer: "ではありません", explanation: "Phủ định lịch sự của 「～です」 là 「～ではありません」." },
      { id: 103, type: "GRAMMAR", title: "Bài 1: Câu hỏi nghi vấn (ですか)", promptJp: "ミラーさんは 会社員（かいしゃいん） [ ? ]。", promptVi: "Chọn trợ từ tạo câu hỏi.", options: shuffleArray(["ですか", "ですね", "ですよ", "ですが"]), correctAnswer: "ですか", explanation: "Thêm 「か」 vào cuối câu để chuyển thành câu hỏi." },
      { id: 104, type: "PARTICLE", title: "Bài 1: Trợ từ đồng tán (も)", promptJp: "私（わたし）は ベトナム人（じん）です。ナムさん [ ? ] ベトナム人（じん）です。", promptVi: "Chọn trợ từ có nghĩa là 'cũng'.", options: shuffleArray(["も", "は", "を", "に"]), correctAnswer: "も", explanation: "Trợ từ 「も」 có nghĩa là 'cũng'." },
      { id: 105, type: "PARTICLE", title: "Bài 1: Trợ từ sở hữu & Trực thuộc (の)", promptJp: "私（わたし） [ ? ] 傘（かさ）です。", promptVi: "Chọn trợ từ nối 2 danh từ chỉ sở hữu.", options: shuffleArray(["の", "と", "へ", "から"]), correctAnswer: "の", explanation: "Trợ từ 「の」 nối 2 danh từ để biểu thị quyền sở hữu." },
      { id: 106, type: "GRAMMAR", title: "Bài 1: Phủ định thân mật (じゃありません)", promptJp: "サントスさんは 学生（がくせい） [ ? ]。", promptVi: "Chọn dạng phủ định thân mật trong văn nói.", options: shuffleArray(["じゃありません", "ではありませんか", "ありません", "ないです"]), correctAnswer: "じゃありません", explanation: "Trong giao tiếp thân mật dùng 「じゃありません」." },
      { id: 107, type: "GRAMMAR", title: "Bài 1: Từ hỏi người lịch sự (どなた)", promptJp: "あの方（かた）は [ ? ] ですか。... 木村（きむら）さんです。", promptVi: "Chọn từ hỏi lịch sự thay cho だれ.", options: shuffleArray(["どなた", "だれ", "なん", "どこ"]), correctAnswer: "どなた", explanation: "「あの方」 là từ lịch sự của 「あの人」, đi với từ hỏi lịch sự 「どなた」." },
      { id: 108, type: "GRAMMAR", title: "Bài 1: Trả lời phủ định (いいえ、〜ではありません)", promptJp: "ワンさんは 医者（いしゃ）ですか。... いいえ、医者（いしゃ） [ ? ]。", promptVi: "Chọn đáp án trả lời phủ định.", options: shuffleArray(["ではありません", "です", "でした", "ます"]), correctAnswer: "ではありません", explanation: "Trả lời phủ định: いいえ、N1 ではありません." },
      { id: 109, type: "PARTICLE", title: "Bài 1: Trực thuộc công ty (IMC の 社員)", promptJp: "IMC [ ? ] 社員（しゃいん）です。", promptVi: "Chọn trợ từ thể hiện trực thuộc tổ chức.", options: shuffleArray(["の", "は", "で", "を"]), correctAnswer: "の", explanation: "Trợ từ 「の」 biểu thị trực thuộc công ty/tổ chức." },
      { id: 110, type: "GRAMMAR", title: "Bài 1: Vị ngữ khẳng định danh từ (です)", promptJp: "サントスさんは ブラジル人（じん） [ ? ]。", promptVi: "Hoàn thành câu khẳng định danh từ.", options: shuffleArray(["です", "ます", "でした", "ません"]), correctAnswer: "です", explanation: "Khẳng định danh từ dùng 「です」 ở cuối câu." }
    ],
    2: [
      { id: 201, type: "GRAMMAR", title: "Bài 2: Chỉ định từ đồ vật (これ・それ・あれ)", promptJp: "これ [ ? ] 本（ほん）です。", promptVi: "Chọn trợ từ cho chỉ định từ これ.", options: shuffleArray(["は", "が", "の", "を"]), correctAnswer: "は", explanation: "Cấu trúc: これ は N です." },
      { id: 202, type: "GRAMMAR", title: "Bài 2: Định từ chỉ định (この・その・あの)", promptJp: "[ ? ] 本（ほん）は 私（わたし）の です。", promptVi: "Chọn từ chỉ định đi trực tiếp trước danh từ 本.", options: shuffleArray(["この", "これ", "ここ", "こちら"]), correctAnswer: "この", explanation: "この đi trực tiếp trước danh từ: この N." },
      { id: 203, type: "GRAMMAR", title: "Bài 2: Từ hỏi đồ vật (何)", promptJp: "それ は [ ? ] ですか。... 辞書（じしょ）です。", promptVi: "Chọn từ hỏi đồ vật.", options: shuffleArray(["何（なん）", "だれ", "どこ", "どれ"]), correctAnswer: "何（なん）", explanation: "Dùng 「何（なん）」 để hỏi cái gì." },
      { id: 204, type: "GRAMMAR", title: "Bài 2: Từ hỏi sở hữu (だれの N)", promptJp: "あれ は [ ? ] の 傘（かさ）ですか。... 田中（たなか）さんのです。", promptVi: "Chọn từ hỏi sở hữu.", options: shuffleArray(["だれ", "なに", "どこ", "どれ"]), correctAnswer: "だれ", explanation: "「だれ の N」 hỏi đồ vật của ai." }
    ],
    3: [
      { id: 301, type: "GRAMMAR", title: "Bài 3: Chỉ địa điểm (ここ・そこ・あそこ)", promptJp: "ここ [ ? ] 教室（きょうしつ）です。", promptVi: "Chọn trợ từ phù hợp.", options: shuffleArray(["は", "が", "に", "で"]), correctAnswer: "は", explanation: "Cấu trúc: ここ は N です." },
      { id: 302, type: "GRAMMAR", title: "Bài 3: Từ hỏi địa điểm (どこ / どちら)", promptJp: "お手洗い（おてあらい）は [ ? ] ですか。", promptVi: "Chọn từ hỏi địa điểm.", options: shuffleArray(["どこ", "なに", "だれ", "いつ"]), correctAnswer: "どこ", explanation: "Dùng 「どこ」 để hỏi địa điểm." }
    ],
    4: [
      { id: 401, type: "GRAMMAR", title: "Bài 4: Động từ thể ます", promptJp: "毎朝（まいあさ） 6時（じ）に 起（お）き [ ? ]。", promptVi: "Chọn đuôi động từ hiện tại/tương lai.", options: shuffleArray(["ます", "ました", "ません", "ませんでした"]), correctAnswer: "ます", explanation: "Hành động thói quen ở hiện tại dùng V-ます." },
      { id: 402, type: "PARTICLE", title: "Bài 4: Trợ từ mốc thời gian (に)", promptJp: "7時（じ）半（はん） [ ? ] 朝（あさ）ごはんを 食（た）べます。", promptVi: "Chọn trợ từ mốc thời gian cụ thể.", options: shuffleArray(["に", "で", "を", "は"]), correctAnswer: "に", explanation: "Trợ từ 「に」 đi sau mốc thời gian có con số cụ thể." }
    ],
    5: [
      { id: 501, type: "GRAMMAR", title: "Bài 5: Động từ di chuyển (行きます / 来ます / 帰ります)", promptJp: "明日（あした） 京都（きょうと） [ ? ] 行（い）きます。", promptVi: "Chọn trợ từ phương hướng di chuyển.", options: shuffleArray(["へ", "で", "を", "から"]), correctAnswer: "へ", explanation: "Trợ từ 「へ」 (đọc là e) chỉ phương hướng di chuyển." },
      { id: 502, type: "PARTICLE", title: "Bài 5: Phương tiện di chuyển (で)", promptJp: "電車（でんしゃ） [ ? ] 会社（かいしゃ）へ 行（い）きます。", promptVi: "Chọn trợ từ phương tiện.", options: shuffleArray(["で", "へ", "に", "を"]), correctAnswer: "で", explanation: "Trợ từ 「で」 chỉ phương tiện di chuyển." }
    ]
  };

  const n4QuestionsMap: Record<number, ClozeQuestion[]> = {
    27: [
      { id: 2701, type: "GRAMMAR", title: "Bài 27: Thể khả năng (V-可能形)", promptJp: "私（わたし）は 漢字（かんじ）が 読（よ）め [ ? ]。", promptVi: "Tôi có thể đọc được chữ Hán.", options: shuffleArray(["ます", "られます", "させます", "ています"]), correctAnswer: "ます", explanation: "読めます là thể khả năng của 読みます." },
      { id: 2702, type: "GRAMMAR", title: "Bài 27: Đi với phủ định (〜しか〜ない)", promptJp: "ひらがな [ ? ] 書（か）けません。", promptVi: "Tôi chỉ có thể viết chữ Hiragana thôi.", options: shuffleArray(["しか", "だけ", "も", "は"]), correctAnswer: "しか", explanation: "〜しか đi với động từ phủ định chỉ sự ít ỏi." },
      { id: 2703, type: "GRAMMAR", title: "Bài 27: Thấy tự nhiên (が見えます)", promptJp: "部屋（へや）から 海（うみ）が [ ? ]。", promptVi: "Từ trong phòng có thể nhìn thấy biển.", options: shuffleArray(["見（み）えます", "見（み）られます", "見（み）せます", "見（み）ます"]), correctAnswer: "見（み）えます", explanation: "見えます chỉ khả năng thị giác tự nhiên." },
      { id: 2704, type: "GRAMMAR", title: "Bài 27: Nghe tự nhiên (が聞こえます)", promptJp: "波（なみ）の 音（おと）が [ ? ]。", promptVi: "Có thể nghe thấy tiếng sóng biển.", options: shuffleArray(["聞（き）こえます", "聞（き）けます", "聞（き）きます", "聞（き）こさせます"]), correctAnswer: "聞（き）こえます", explanation: "聞こえます chỉ khả năng thính giác tự nhiên." }
    ],
    28: [
      { id: 2801, type: "GRAMMAR", title: "Bài 28: Vừa làm vừa (〜ながら)", promptJp: "音楽（おんがく）を 聴（き）き [ ? ] 勉強（べんきょう）します。", promptVi: "Tớ vừa nghe nhạc vừa học bài.", options: shuffleArray(["ながら", "まえに", "あとで", "たら"]), correctAnswer: "ながら", explanation: "V1-ながら V2 diễn tả 2 hành động song song." },
      { id: 2802, type: "GRAMMAR", title: "Bài 28: Liệt kê lý do (〜し、〜し)", promptJp: "駅（えき）から 近（ちか）いし、車（くるま）で 来（こ）られる [ ? ]、便利（べんり）です。", promptVi: "Vừa gần ga lại vừa đến được bằng ô tô nên tiện lợi.", options: shuffleArray(["し", "から", "ので", "て"]), correctAnswer: "し", explanation: "〜し dùng liệt kê các lý do tương đồng." }
    ]
  };

  if (n5QuestionsMap[num]) return n5QuestionsMap[num];
  if (n4QuestionsMap[num]) return n4QuestionsMap[num];

  return [
    {
      id: num * 100 + 1,
      type: "GRAMMAR",
      title: `Bài ${num}: Trợ từ & Cấu trúc chính`,
      promptJp: `日本語（にほんご） [ ? ] 勉強（べんきょう）します。`,
      promptVi: `Chọn trợ từ phù hợp cho tân ngữ trong Bài ${num}.`,
      options: shuffleArray(["を", "は", "に", "で"]),
      correctAnswer: "を",
      explanation: `Trợ từ を đánh dấu tân ngữ tác động của động từ.`
    },
    {
      id: num * 100 + 2,
      type: "PARTICLE",
      title: `Bài ${num}: Mốc thời gian & Vị trí`,
      promptJp: `毎朝（まいあさ） 7時（じ） [ ? ] 起（お）きます。`,
      promptVi: `Điền trợ từ mốc thời gian cụ thể.`,
      options: shuffleArray(["に", "で", "へ", "を"]),
      correctAnswer: "に",
      explanation: `Trợ từ に chỉ thời gian cụ thể.`
    }
  ];
}

export default function GrammarClozeTransformPractice({
  lessonNum,
  grammarPoints,
  onComplete,
}: GrammarClozeTransformPracticeProps) {
  const [questions, setQuestions] = useState<ClozeQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchQuestions() {
      setLoading(true);

      // Priority 1: Generate directly from actual lesson knowledge (grammarPoints prop)
      if (grammarPoints && grammarPoints.length > 0) {
        const generated = autoGenerateClozeFromGrammarPoints(grammarPoints, lessonNum);
        if (generated.length > 0 && isMounted) {
          setQuestions(generated);
          setLoading(false);
          return;
        }
      }

      // Priority 2: Fetch from backend API
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        const res = await fetch(`/api/v1/learner/grammar/lessons/${lessonNum}/practice-session?limit=10`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const json = await res.json();
          const items = Array.isArray(json) ? json : (json.data || []);
          if (items.length > 0 && isMounted) {
            const mapped: ClozeQuestion[] = items.map((q: any, i: number) => {
              const rawOpts = Array.isArray(q.options) && q.options.length > 0 ? q.options : ["は", "が", "に", "で"];
              return {
                id: q.questionId || i + 1,
                type: q.type || "FILL_BLANK",
                title: q.title || `Câu hỏi luyện tập Bài ${lessonNum}`,
                promptJp: q.promptJp || q.prompt || "日本語 [ ? ] 勉強します",
                promptVi: q.promptVi || "Chọn đáp án đúng",
                options: shuffleArray(rawOpts),
                correctAnswer: q.correctAnswer || rawOpts[0],
                explanation: q.explanation || "Giải thích đáp án chuẩn ngữ pháp."
              };
            });
            setQuestions(mapped);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        // Fallback
      }

      // Priority 3: Lesson-specific fallbacks
      if (isMounted) {
        const dynamicFallback = getLessonFallbackQuestions(lessonNum);
        setQuestions(dynamicFallback.map(q => ({ ...q, options: shuffleArray(q.options) })));
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [lessonNum, grammarPoints]);

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = questions[currentIdx] || getLessonFallbackQuestions(lessonNum)[0];

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswered) return;
    setIsAnswered(true);

    if (selectedOption === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (onComplete) onComplete();
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (loading) {
    return (
      <div className="bg-[#1C1513] rounded-3xl p-8 border-2 border-[#D4AF37]/30 shadow-2xl text-center py-16">
        <RefreshCw className="w-10 h-10 text-[#FFB020] animate-spin mx-auto mb-4" />
        <p className="text-[#D4C5B3] font-bold">Đang khai mở cuộn bí kíp ngữ pháp...</p>
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-gradient-to-b from-[#211816] to-[#140E0D] rounded-3xl p-8 border-2 border-[#D4AF37]/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
        <div className="w-20 h-20 bg-[#D94129]/20 border border-[#D94129]/40 rounded-3xl flex items-center justify-center mx-auto mb-4 text-[#FF7A63] shadow-[0_0_25px_rgba(217,65,41,0.4)]">
          <Sparkles className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-[#FFF5E6] mb-2">Hoàn Thành Thử Thách Ngữ Pháp!</h3>
        <p className="text-[#D4C5B3] mb-6">
          Bạn đạt <span className="text-[#FFB020] font-black text-xl">{score}/{questions.length}</span> câu chính xác ({percentage}%).
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 bg-gradient-to-r from-[#D94129] to-[#FF5733] hover:brightness-110 text-white font-black px-7 py-3.5 rounded-2xl shadow-[0_0_25px_rgba(217,65,41,0.5)] transition-all hover:scale-105 cursor-pointer"
          >
            <RefreshCw className="w-5 h-5" />
            Rèn Luyện Lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#1F1715] via-[#16100E] to-[#0E0908] rounded-2xl p-4 sm:p-5 border-2 border-[#D4AF37]/35 shadow-[0_10px_40px_rgba(0,0,0,0.85)] relative overflow-hidden">
      {/* Background Spirit Glow Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Progress */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#D4AF37]/20 relative z-10">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-[#2B1B17] border border-[#FF6B4A]/40 text-[#FF9E85] text-[11px] font-black rounded-lg shadow-[0_0_10px_rgba(255,107,74,0.2)]">
            ⛩️ {currentQ.type} - BÀI {lessonNum}
          </span>
          <span className="text-xs text-[#D4C5B3] font-bold">
            Câu <span className="text-[#FFB020] font-black">{currentIdx + 1}</span> / {questions.length}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#D4C5B3] text-sm">
          <Volume2 className="w-4 h-4 cursor-pointer hover:text-[#FFB020] transition-colors" />
        </div>
      </div>

      {/* Main Mystical Prompt Card */}
      <div className="bg-gradient-to-br from-[#2D211E] via-[#241A18] to-[#1B1210] rounded-xl p-3.5 sm:p-4 mb-3 border-2 border-[#D4AF37]/40 shadow-md relative z-10">
        <h4 className="text-[10px] font-black text-[#FFB020] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#FFB020]" />
          <span>{currentQ.title}</span>
        </h4>
        <div className="text-xl sm:text-2xl font-black text-[#FFF5E6] tracking-wide mb-1.5 leading-snug drop-shadow-md">
          <JapaneseFuriganaText text={currentQ.promptJp} />
        </div>
        <p className="text-[#D4C5B3] text-xs italic font-semibold tracking-wide">
          &ldquo;{currentQ.promptVi}&rdquo;
        </p>
      </div>

      {/* Multiple Choice Option Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3.5 relative z-10">
        {currentQ.options.map((option, idx) => {
          let btnStyle = "bg-[#251D1A] hover:bg-[#312521] border-[#D4AF37]/25 text-[#FFF0DD] hover:border-[#FFB020] hover:shadow-[0_0_15px_rgba(255,176,32,0.2)]";

          if (isAnswered) {
            if (option === currentQ.correctAnswer) {
              btnStyle = "bg-emerald-950/90 border-2 border-emerald-400 text-emerald-200 font-black shadow-[0_0_15px_rgba(52,211,153,0.4)]";
            } else if (option === selectedOption) {
              btnStyle = "bg-rose-950/90 border-2 border-rose-500 text-rose-200 font-black shadow-[0_0_15px_rgba(244,63,94,0.4)]";
            } else {
              btnStyle = "bg-[#1C1513] border-white/5 text-[#7A6960] opacity-40";
            }
          } else if (selectedOption === option) {
            btnStyle = "bg-[#3D251D] border-2 border-[#FF5733] text-[#FFE8D6] font-black ring-2 ring-[#FF5733]/40 shadow-[0_0_15px_rgba(255,87,51,0.35)]";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(option)}
              disabled={isAnswered}
              className={`py-2.5 px-3.5 rounded-xl border text-left transition-all duration-150 flex items-center justify-between cursor-pointer ${btnStyle}`}
            >
              <span className="text-sm sm:text-base font-bold">
                <JapaneseFuriganaText text={option} />
              </span>
              {isAnswered && option === currentQ.correctAnswer && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              )}
              {isAnswered && option === selectedOption && option !== currentQ.correctAnswer && (
                <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback & Explanation Box */}
      {isAnswered && (
        <div
          className={`p-3 rounded-xl mb-3 border-2 relative z-10 backdrop-blur-md ${
            selectedOption === currentQ.correctAnswer
              ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-100 shadow-md"
              : "bg-rose-950/90 border-rose-500/50 text-rose-100 shadow-md"
          }`}
        >
          <div className="flex items-center gap-2 font-black mb-0.5 text-xs">
            {selectedOption === currentQ.correctAnswer ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Chính xác! (+1 điểm)</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Chưa đúng! Đáp án chuẩn: {currentQ.correctAnswer}</span>
              </>
            )}
          </div>
          <p className="text-xs mt-0.5 text-[#E6D9C8] leading-relaxed">
            {currentQ.explanation}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end relative z-10">
        {!isAnswered ? (
          <button
            onClick={handleCheckAnswer}
            disabled={!selectedOption}
            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedOption
                ? "bg-gradient-to-r from-[#D94129] via-[#FF5733] to-[#E6B655] hover:brightness-110 text-white shadow-[0_0_20px_rgba(217,65,41,0.5)] hover:scale-102 active:scale-95"
                : "bg-[#251D1A] text-[#76675E] border border-white/5 cursor-not-allowed shadow-none"
            }`}
          >
            Kiểm Tra Đáp Án
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#D94129] via-[#FF5733] to-[#E6B655] hover:brightness-110 text-white text-xs font-black rounded-xl shadow-[0_0_20px_rgba(217,65,41,0.5)] transition-all hover:scale-102 active:scale-95 cursor-pointer"
          >
            <span>{currentIdx + 1 < questions.length ? "Câu Tiếp Theo" : "Xem Kết Quả"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
