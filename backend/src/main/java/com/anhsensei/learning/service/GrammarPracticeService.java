package com.anhsensei.learning.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.anhsensei.curriculum.domain.QuestionBank;
import com.anhsensei.curriculum.domain.QuestionBankOption;
import com.anhsensei.curriculum.repository.GrammarExampleRepository;
import com.anhsensei.curriculum.repository.GrammarPointRepository;
import com.anhsensei.curriculum.repository.QuestionBankRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GrammarPracticeService {

    private final QuestionBankRepository questionBankRepository;
    private final GrammarPointRepository grammarPointRepository;
    private final GrammarExampleRepository grammarExampleRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public GrammarPracticeService(QuestionBankRepository questionBankRepository,
                                  GrammarPointRepository grammarPointRepository,
                                  GrammarExampleRepository grammarExampleRepository) {
        this.questionBankRepository = questionBankRepository;
        this.grammarPointRepository = grammarPointRepository;
        this.grammarExampleRepository = grammarExampleRepository;
    }

    public static class PracticeQuestionDto {
        private Long questionId;
        private String type;
        private String title;
        private String promptJp;
        private String promptVi;
        private List<String> options = new ArrayList<>();
        private String correctAnswer;
        private String explanation;

        public PracticeQuestionDto() {}

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getPromptJp() { return promptJp; }
        public void setPromptJp(String promptJp) { this.promptJp = promptJp; }

        public String getPromptVi() { return promptVi; }
        public void setPromptVi(String promptVi) { this.promptVi = promptVi; }

        public List<String> getOptions() { return options; }
        public void setOptions(List<String> options) { this.options = options; }

        public String getCorrectAnswer() { return correctAnswer; }
        public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }

        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }
    }

    @Transactional(readOnly = true)
    public List<PracticeQuestionDto> generatePracticeSession(Long lessonId, int limit) {
        List<PracticeQuestionDto> result = new ArrayList<>();

        List<QuestionBank> dbQuestions = questionBankRepository.findQuestionsWithOptionsByLessonId(lessonId);
        List<QuestionBank> activeQuestions = dbQuestions.stream()
                .filter(q -> "ACTIVE".equalsIgnoreCase(q.getStatus()))
                .collect(Collectors.toList());

        Collections.shuffle(activeQuestions);

        for (QuestionBank q : activeQuestions) {
            if (result.size() >= limit) break;

            PracticeQuestionDto dto = new PracticeQuestionDto();
            dto.setQuestionId(q.getQuestionId());
            dto.setType(q.getQuestionType() != null ? q.getQuestionType() : "FILL_BLANK");
            dto.setTitle(q.getPrompt() != null ? q.getPrompt() : "Luyện tập ngữ pháp Bài " + lessonId);
            dto.setPromptJp(q.getJapaneseText() != null ? q.getJapaneseText() : q.getPrompt());
            dto.setPromptVi("Chọn đáp án ngữ pháp đúng cho Bài " + lessonId);
            dto.setExplanation(q.getExplanation() != null ? q.getExplanation() : "Đáp án chuẩn ngữ pháp tiếng Nhật.");

            List<String> opts = new ArrayList<>();
            String correct = "";

            if (q.getOptions() != null && !q.getOptions().isEmpty()) {
                for (QuestionBankOption opt : q.getOptions()) {
                    opts.add(opt.getOptionText());
                    if (Boolean.TRUE.equals(opt.getIsCorrect())) {
                        correct = opt.getOptionText();
                    }
                }
            }

            // Fallback: If DB options table is empty but validAnswers exists as JSON
            if (opts.isEmpty() && q.getValidAnswers() != null) {
                try {
                    List<String> validList = objectMapper.readValue(q.getValidAnswers(), new TypeReference<List<String>>() {});
                    if (validList != null && !validList.isEmpty()) {
                        correct = validList.get(0);
                        opts = generateSmartOptions(correct);
                    }
                } catch (Exception ignored) {}
            }

            if (correct.isEmpty() && !opts.isEmpty()) {
                correct = opts.get(0);
            }

            if (!opts.isEmpty()) {
                Collections.shuffle(opts);
                dto.setOptions(opts);
                dto.setCorrectAnswer(correct);
                result.add(dto);
            }
        }

        if (result.size() < limit) {
            int needed = limit - result.size();
            for (int i = 0; i < needed; i++) {
                PracticeQuestionDto dto = createLessonSpecificSyntheticQuestion(lessonId, i);
                result.add(dto);
            }
        }

        return result;
    }

    private List<String> generateSmartOptions(String correct) {
        Set<String> set = new LinkedHashSet<>();
        set.add(correct);

        if ("は".equals(correct)) {
            set.addAll(Arrays.asList("が", "に", "で"));
        } else if ("ではありません".equals(correct)) {
            set.addAll(Arrays.asList("です", "でした", "ます"));
        } else if ("じゃありません".equals(correct)) {
            set.addAll(Arrays.asList("ではありませんか", "ありません", "ないです"));
        } else if ("ですか".equals(correct)) {
            set.addAll(Arrays.asList("ですね", "ですよ", "ですが"));
        } else if ("も".equals(correct)) {
            set.addAll(Arrays.asList("は", "を", "に"));
        } else if ("の".equals(correct)) {
            set.addAll(Arrays.asList("と", "へ", "から"));
        } else if ("へ".equals(correct)) {
            set.addAll(Arrays.asList("に", "で", "を"));
        } else if ("で".equals(correct)) {
            set.addAll(Arrays.asList("に", "へ", "を"));
        } else if ("を".equals(correct)) {
            set.addAll(Arrays.asList("が", "は", "に"));
        } else if ("に".equals(correct)) {
            set.addAll(Arrays.asList("で", "へ", "を"));
        } else if ("から".equals(correct)) {
            set.addAll(Arrays.asList("まで", "より", "ので"));
        } else if ("まで".equals(correct)) {
            set.addAll(Arrays.asList("から", "ほど", "までで"));
        } else if ("どなた".equals(correct)) {
            set.addAll(Arrays.asList("だれ", "なに", "どこ"));
        } else if ("です".equals(correct)) {
            set.addAll(Arrays.asList("ます", "でした", "ません"));
        } else {
            set.addAll(Arrays.asList("は", "が", "に", "で", "を", "です", "ます"));
        }

        List<String> list = new ArrayList<>(set);
        return list.subList(0, Math.min(4, list.size()));
    }

    private PracticeQuestionDto createLessonSpecificSyntheticQuestion(Long lessonId, int index) {
        PracticeQuestionDto dto = new PracticeQuestionDto();
        dto.setQuestionId((long) (-1000 - (lessonId * 100) - index));
        dto.setType("FILL_BLANK");

        int lNum = lessonId.intValue();
        int step = index % 10;

        if (lNum == 1) {
            dto.setTitle("Bài 1 - Giới thiệu bản thân & Trợ từ (Câu " + (step + 1) + "/10)");
            if (step == 0) {
                dto.setPromptJp("私（わたし） [ ? ] 学生（がくせい）です。");
                dto.setPromptVi("Chọn trợ từ chủ đề câu.");
                dto.setCorrectAnswer("は");
                dto.setOptions(shuffle(Arrays.asList("は", "が", "に", "で")));
                dto.setExplanation("Trợ từ 「は」 đứng sau danh từ chỉ chủ đề của câu.");
            } else if (step == 1) {
                dto.setPromptJp("田中（たなか）さんは 先生（せんせい） [ ? ]。");
                dto.setPromptVi("Chọn phủ định lịch sự của です.");
                dto.setCorrectAnswer("ではありません");
                dto.setOptions(shuffle(Arrays.asList("ではありません", "です", "でした", "ます")));
                dto.setExplanation("Phủ định lịch sự của 「～です」 là 「～ではありません」.");
            } else if (step == 2) {
                dto.setPromptJp("ミラーさんは 会社員（かいしゃいん） [ ? ]。");
                dto.setPromptVi("Chọn trợ từ nghi vấn tạo câu hỏi.");
                dto.setCorrectAnswer("ですか");
                dto.setOptions(shuffle(Arrays.asList("ですか", "ですね", "ですよ", "ですが")));
                dto.setExplanation("Thêm 「か」 ở cuối câu để tạo câu hỏi.");
            } else if (step == 3) {
                dto.setPromptJp("私（わたし）は ベトナム人（じん）です。ナムさん [ ? ] ベトナム人（じん）です。");
                dto.setPromptVi("Chọn trợ từ đồng tán 'cũng là...'.");
                dto.setCorrectAnswer("も");
                dto.setOptions(shuffle(Arrays.asList("も", "は", "を", "に")));
                dto.setExplanation("Trợ từ 「も」 dùng khi thuộc tính/thông tin trùng khớp với câu trước.");
            } else if (step == 4) {
                dto.setPromptJp("私（わたし） [ ? ] 傘（かさ）です。");
                dto.setPromptVi("Chọn trợ từ sở hữu.");
                dto.setCorrectAnswer("の");
                dto.setOptions(shuffle(Arrays.asList("の", "と", "へ", "から")));
                dto.setExplanation("Trợ từ 「の」 nối 2 danh từ biểu thị quyền sở hữu.");
            } else if (step == 5) {
                dto.setPromptJp("IMC [ ? ] 社員（しゃいん）です。");
                dto.setPromptVi("Chọn trợ từ biểu thị trực thuộc tổ chức.");
                dto.setCorrectAnswer("の");
                dto.setOptions(shuffle(Arrays.asList("の", "は", "で", "を")));
                dto.setExplanation("Trợ từ 「の」 thể hiện mối quan hệ thuộc tổ chức/công ty.");
            } else if (step == 6) {
                dto.setPromptJp("サントスさんは 学生（がくせい） [ ? ]。");
                dto.setPromptVi("Chọn phủ định thân mật của です.");
                dto.setCorrectAnswer("じゃありません");
                dto.setOptions(shuffle(Arrays.asList("じゃありません", "ではありませんか", "ありません", "ないです")));
                dto.setExplanation("Trong giao tiếp hàng ngày dùng 「じゃありません」.");
            } else if (step == 7) {
                dto.setPromptJp("あの方（かた）は [ ? ] ですか。... 木村（きむら）さんです。");
                dto.setPromptVi("Chọn từ hỏi người lịch sự.");
                dto.setCorrectAnswer("どなた");
                dto.setOptions(shuffle(Arrays.asList("どなた", "だれ", "なん", "どこ")));
                dto.setExplanation("「あの方」 đi với từ hỏi lịch sự 「どなた」.");
            } else if (step == 8) {
                dto.setPromptJp("ワンさんは 医者（いしゃ）ですか。... いいえ、医者（いしゃ） [ ? ]。");
                dto.setPromptVi("Chọn đáp án câu trả lời phủ định.");
                dto.setCorrectAnswer("ではありません");
                dto.setOptions(shuffle(Arrays.asList("ではありません", "です", "でした", "ます")));
                dto.setExplanation("Trả lời phủ định: いいえ、N1 ではありません.");
            } else {
                dto.setPromptJp("サントスさんは ブラジル人（じん） [ ? ]。");
                dto.setPromptVi("Chọn đuôi câu khẳng định danh từ.");
                dto.setCorrectAnswer("です");
                dto.setOptions(shuffle(Arrays.asList("です", "ます", "でした", "ません")));
                dto.setExplanation("Vị ngữ danh từ khẳng định ở hiện tại dùng 「です」.");
            }
            return dto;
        }

        if (lNum == 2) {
            dto.setTitle("Bài 2 - Chỉ định từ đồ vật (Câu " + (step + 1) + "/10)");
            if (step == 0) {
                dto.setPromptJp("これ [ ? ] 本（ほん）です。");
                dto.setPromptVi("Chọn trợ từ cho chỉ định từ これ.");
                dto.setCorrectAnswer("は");
                dto.setOptions(shuffle(Arrays.asList("は", "が", "の", "を")));
                dto.setExplanation("Cấu trúc: これ は N です.");
            } else if (step == 1) {
                dto.setPromptJp("[ ? ] 本（ほん）は 私（わたし）の です。");
                dto.setPromptVi("Chọn định từ chỉ định đi trực tiếp trước danh từ 本.");
                dto.setCorrectAnswer("この");
                dto.setOptions(shuffle(Arrays.asList("この", "これ", "ここ", "こちら")));
                dto.setExplanation("この đi trực tiếp trước danh từ: この + N.");
            } else if (step == 2) {
                dto.setPromptJp("それ は [ ? ] ですか。... 辞書（じしょ）です。");
                dto.setPromptVi("Chọn từ hỏi đồ vật.");
                dto.setCorrectAnswer("何（なん）");
                dto.setOptions(shuffle(Arrays.asList("何（なん）", "だれ", "どこ", "どれ")));
                dto.setExplanation("Dùng 「何（なん）」 để hỏi cái gì.");
            } else {
                dto.setPromptJp("あれ は [ ? ] の 傘（かさ）ですか。... 田中（たなか）さんのです。");
                dto.setPromptVi("Chọn từ hỏi sở hữu.");
                dto.setCorrectAnswer("だれ");
                dto.setOptions(shuffle(Arrays.asList("だれ", "なに", "どこ", "どれ")));
                dto.setExplanation("「だれ の N」 hỏi đồ vật của ai.");
            }
            return dto;
        }

        if (lNum == 4) {
            dto.setTitle("Bài 4 - Thời gian & Động từ (Câu " + (step + 1) + "/10)");
            if (step == 0) {
                dto.setPromptJp("今（いま） [ ? ] 時（じ）です。");
                dto.setPromptVi("Bây giờ là 4 giờ. (Lưu ý 4 giờ đọc đặc biệt)");
                dto.setCorrectAnswer("よ");
                dto.setOptions(shuffle(Arrays.asList("よ", "よん", "し", "よっ")));
                dto.setExplanation("4 giờ đọc đặc biệt là よじ (không đọc よんじ).");
            } else if (step == 1) {
                dto.setPromptJp("8時15分 [ ? ]。");
                dto.setPromptVi("Bây giờ là 8 giờ 15 phút.");
                dto.setCorrectAnswer("です");
                dto.setOptions(shuffle(Arrays.asList("です", "ます", "でした", "ません")));
                dto.setExplanation("Mốc thời gian dùng danh từ + です.");
            } else if (step == 2) {
                dto.setPromptJp("毎朝（まいあさ） 7時（じ） [ ? ] 起（お）きます。");
                dto.setPromptVi("Chọn trợ từ mốc thời gian cụ thể.");
                dto.setCorrectAnswer("に");
                dto.setOptions(shuffle(Arrays.asList("に", "で", "を", "は")));
                dto.setExplanation("Trợ từ 「に」 đi sau mốc thời gian có con số cụ thể.");
            } else if (step == 3) {
                dto.setPromptJp("9時（じ） [ ? ] 5時（じ） [ ? ] 働（はたら）きます。");
                dto.setPromptVi("Từ 9 giờ đến 5 giờ.");
                dto.setCorrectAnswer("から / まで");
                dto.setOptions(shuffle(Arrays.asList("から / まで", "に / に", "で / から", "と / と")));
                dto.setExplanation("Cấu trúc: N1 から N2 まで (Từ N1 đến N2).");
            } else {
                dto.setPromptJp("昨日（きのう） 勉強（べんきょう）し [ ? ]。");
                dto.setPromptVi("Hôm qua tớ đã học bài.");
                dto.setCorrectAnswer("ました");
                dto.setOptions(shuffle(Arrays.asList("ました", "ます", "ません", "ませんでした")));
                dto.setExplanation("Quá quá khẳng định động từ dùng V-ました.");
            }
            return dto;
        }

        if (lNum == 20) {
            dto.setTitle("Bài 20 - Thể thông thường (普通形) (Câu " + (step + 1) + "/10)");
            if (step == 0) {
                dto.setPromptJp("今日（きょう） 暇（ひま）？... [ ? ]、暇（ひま）だよ。");
                dto.setPromptVi("Hôm nay rảnh không? ... Ừ, rảnh chứ.");
                dto.setCorrectAnswer("うん");
                dto.setOptions(shuffle(Arrays.asList("うん", "はい", "うーん", "いいえ")));
                dto.setExplanation("Trong thể thông thường, dùng うん thay cho はい.");
            } else if (step == 1) {
                dto.setPromptJp("昨日（きのう） どこか 行（い）った？... ううん、どこも [ ? ]。");
                dto.setPromptVi("Hôm qua có đi đâu không? ... Không, tớ không đi đâu cả.");
                dto.setCorrectAnswer("行（い）かなかった");
                dto.setOptions(shuffle(Arrays.asList("行（い）かなかった", "行（い）きませんでした", "行（い）く", "行（い）った")));
                dto.setExplanation("Quá khứ phủ định thể thông thường của động từ là V-なかった.");
            } else if (step == 2) {
                dto.setPromptJp("これ 美味（おい）しい？... うん、[ ? ] 美味（おい）しいよ。");
                dto.setPromptVi("Cái này ngon không? ... Ừ, rất ngon.");
                dto.setCorrectAnswer("すごく");
                dto.setOptions(shuffle(Arrays.asList("すごく", "とても", "あまり", "ぜんぜん")));
                dto.setExplanation("Phó từ nhấn mạnh 「すごく」 thường dùng trong văn nói thân mật.");
            } else if (step == 3) {
                dto.setPromptJp("明日（あした） 雨（あめ） [ ? ]？... ううん、雨（あめ）じゃないよ。");
                dto.setPromptVi("Ngày mai trời mưa à? ... Không, không mưa đâu.");
                dto.setCorrectAnswer("かな");
                dto.setOptions(shuffle(Arrays.asList("かな", "だ", "ですか", "でした")));
                dto.setExplanation("Trong câu hỏi danh từ thể thông thường, bỏ だ ở cuối câu.");
            } else {
                dto.setPromptJp("昨日のテスト、[ ? ]。");
                dto.setPromptVi("Bài kiểm tra hôm qua rất khó.");
                dto.setCorrectAnswer("難（むずか）しかった");
                dto.setOptions(shuffle(Arrays.asList("難（むずか）しかった", "難（むずか）しいです", "難（むずか）しくない", "難（むずか）しい")));
                dto.setExplanation("Quá khứ tính từ đuôi い chuyển thành ～かった.");
            }
            return dto;
        }

        dto.setTitle("Bài " + lessonId + " - Luyện tập ngữ pháp (Câu " + (step + 1) + "/10)");
        dto.setPromptJp("日本語（にほんご） [ ? ] 勉強（べんきょう）します。");
        dto.setPromptVi("Học tiếng Nhật (Chọn trợ từ tân ngữ).");
        dto.setCorrectAnswer("を");
        dto.setOptions(shuffle(Arrays.asList("を", "は", "に", "で")));
        dto.setExplanation("Trợ từ 「を」 đánh dấu tân ngữ trực tiếp.");
        return dto;
    }

    private List<String> shuffle(List<String> list) {
        List<String> copy = new ArrayList<>(list);
        Collections.shuffle(copy);
        return copy;
    }
}
