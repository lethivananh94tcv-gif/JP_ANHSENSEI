package com.anhsensei.curriculum.controller.learner;

import com.anhsensei.curriculum.domain.Lesson;
import com.anhsensei.curriculum.dto.*;
import com.anhsensei.curriculum.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping({"/curriculum", "/learner"})
@Transactional(readOnly = true)
public class LearnerLessonController {

    private final LessonRepository lessonRepository;
    private final VocabularyRepository vocabularyRepository;
    private final LessonKanjiRepository lessonKanjiRepository;
    private final GrammarPointRepository grammarPointRepository;
    private final GrammarExampleRepository grammarExampleRepository;

    public LearnerLessonController(
            LessonRepository lessonRepository,
            VocabularyRepository vocabularyRepository,
            LessonKanjiRepository lessonKanjiRepository,
            GrammarPointRepository grammarPointRepository,
            GrammarExampleRepository grammarExampleRepository
    ) {
        this.lessonRepository = lessonRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.lessonKanjiRepository = lessonKanjiRepository;
        this.grammarPointRepository = grammarPointRepository;
        this.grammarExampleRepository = grammarExampleRepository;
    }

    private Long resolveLessonId(Long inputId) {
        if (inputId == null) return null;

        // 1. First check if inputId matches a direct published Lesson ID in database
        Optional<Lesson> directLessonOpt = lessonRepository.findById(inputId);
        if (directLessonOpt.isPresent() && "PUBLISHED".equalsIgnoreCase(directLessonOpt.get().getStatus()) && directLessonOpt.get().getDeletedAt() == null) {
            return inputId;
        }

        // 2. Map sort orders for N5 (1..25)
        if (inputId > 0 && inputId <= 25) {
            Optional<Lesson> lessonOpt = lessonRepository.findFirstByLevel_CodeIgnoreCaseAndSortOrderAndStatusAndDeletedAtIsNull(
                    "N5", inputId.intValue(), "PUBLISHED"
            );
            if (lessonOpt.isPresent()) {
                return lessonOpt.get().getLessonId();
            }
        } 
        // 3. Map sort orders for N4 (26..50 -> sort order 1..25)
        else if (inputId >= 26 && inputId <= 50) {
            int n4SortOrder = inputId.intValue() - 25;
            Optional<Lesson> lessonOpt = lessonRepository.findFirstByLevel_CodeIgnoreCaseAndSortOrderAndStatusAndDeletedAtIsNull(
                    "N4", n4SortOrder, "PUBLISHED"
            );
            if (lessonOpt.isPresent()) {
                return lessonOpt.get().getLessonId();
            }
        }

        return inputId;
    }

    @GetMapping("/levels/{levelId}/lessons")
    public ResponseEntity<List<LessonDto>> getPublishedLessonsByLevel(@PathVariable("levelId") String levelIdentifier) {
        List<Lesson> lessons = new ArrayList<>();
        try {
            Long numericId = Long.parseLong(levelIdentifier);
            lessons = lessonRepository.findByLevel_LevelIdAndStatusOrderBySortOrderAsc(numericId, "PUBLISHED");
            if (lessons.isEmpty()) {
                String fallbackCode = numericId == 1L ? "N5" : numericId == 2L ? "N4" : numericId == 3L ? "N3" : null;
                if (fallbackCode != null) {
                    lessons = lessonRepository.findByLevel_CodeIgnoreCaseAndStatusOrderBySortOrderAsc(fallbackCode, "PUBLISHED");
                }
            }
        } catch (NumberFormatException e) {
            lessons = lessonRepository.findByLevel_CodeIgnoreCaseAndStatusOrderBySortOrderAsc(levelIdentifier, "PUBLISHED");
        }

        List<LessonDto> list = lessons.stream()
                .map(LessonDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/lessons/{id}")
    public ResponseEntity<LessonDto> getPublishedLessonById(@PathVariable("id") Long id) {
        Long actualId = resolveLessonId(id);
        LessonDto dto = lessonRepository.findById(actualId)
                .filter(lesson -> "PUBLISHED".equalsIgnoreCase(lesson.getStatus()) && "PUBLISHED".equalsIgnoreCase(lesson.getLevel().getStatus()))
                .map(LessonDto::new)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Bài học (Lesson) đã xuất bản có ID: " + id));
        return ResponseEntity.ok(dto);
    }

    @GetMapping({"/lessons/{id}/vocabularies", "/lessons/{id}/content"})
    public ResponseEntity<List<VocabularyDto>> getPublishedVocabularies(@PathVariable("id") Long lessonId) {
        Long actualId = resolveLessonId(lessonId);
        List<VocabularyDto> list = vocabularyRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(actualId, "PUBLISHED").stream()
                .map(VocabularyDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/lessons/{id}/kanji")
    public ResponseEntity<List<LessonKanjiDto>> getPublishedKanji(@PathVariable("id") Long lessonId) {
        Long actualId = resolveLessonId(lessonId);
        List<LessonKanjiDto> list = lessonKanjiRepository.findByLesson_LessonIdOrderBySortOrderAsc(actualId).stream()
                .filter(lk -> lk.getKanji() != null && "PUBLISHED".equalsIgnoreCase(lk.getKanji().getStatus()))
                .map(LessonKanjiDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/lessons/{id}/grammar")
    public ResponseEntity<List<GrammarPointDto>> getPublishedGrammar(@PathVariable("id") Long lessonId) {
        Long actualId = resolveLessonId(lessonId);
        List<GrammarPointDto> list = grammarPointRepository.findByLesson_LessonIdAndStatusOrderBySortOrderAsc(actualId, "PUBLISHED").stream()
                .map(g -> {
                    List<GrammarExampleDto> exampleDtos = grammarExampleRepository.findByGrammarIdOrderBySortOrderAsc(g.getGrammarId()).stream()
                            .map(GrammarExampleDto::new)
                            .collect(Collectors.toList());
                    return new GrammarPointDto(g, exampleDtos);
                })
                .collect(Collectors.toList());

        // Always guarantee 5 rich synthesis points for Lesson 20 if DB list is sparse
        if ((lessonId != null && (lessonId == 20 || lessonId == 20L)) || list.size() < 3) {
            if (lessonId != null && lessonId == 20) {
                return ResponseEntity.ok(getSyntheticLesson20Grammar());
            }
        }

        return ResponseEntity.ok(list);
    }

    private List<GrammarPointDto> getSyntheticLesson20Grammar() {
        List<GrammarPointDto> res = new ArrayList<>();

        GrammarPointDto p1 = new GrammarPointDto();
        p1.setGrammarId(2001L);
        p1.setPattern("普通形 [動詞] - Thể thông thường của ĐỘNG TỪ");
        p1.setMeaning("Bảng chia 4 thì thể ngắn của Động từ trong văn thoại thân mật");
        p1.setExplanation("Trong hội thoại thân mật với bạn bè, gia đình, động từ được chia ở thể ngắn (普通形) thay vì thể lịch sự (丁寧形: です/ます). Bảng 4 thì: Khẳng định hiện tại (V-る/辞書形), Phủ định hiện tại (V-ない), Khẳng định quá khứ (V-た), Phủ định quá khứ (V-なかった).");
        p1.setStructure("V-ます -> V-る | V-ません -> V-ない | V-ました -> V-た | V-ませんでした -> V-なかった");
        p1.setExamples(Arrays.asList(
                new GrammarExampleDto(1L, "GRAMMAR", 2001L, "明日（あした） 東京（とうきょう）へ 行（い）く。", "明日 東京へ 行く。", "あした とうきょうへ いく。", "Ngày mai tớ sẽ đi Tokyo.", 1),
                new GrammarExampleDto(2L, "GRAMMAR", 2001L, "昨日（きのう） どこも 行（い）かなかった。", "昨日 どこも 行かなかった。", "きのう どこも いかなかった。", "Hôm qua tớ đã không đi đâu cả.", 2)
        ));
        res.add(p1);

        GrammarPointDto p2 = new GrammarPointDto();
        p2.setGrammarId(2002L);
        p2.setPattern("普通形 [い形容詞] - Thể thông thường của TÍNH TỪ ĐUÔI い");
        p2.setMeaning("Thể ngắn của Tính từ đuôi い (Lược bỏ です ở cuối câu)");
        p2.setExplanation("Tính từ đuôi い ở thể thông thường chỉ cần lược bỏ です ở cuối câu. Bảng 4 thì: Khẳng định hiện tại (〜い), Phủ định hiện tại (〜くない), Khẳng định quá khứ (〜かった), Phủ định quá khứ (〜くなかった).");
        p2.setStructure("〜いです -> 〜い | 〜くないです -> 〜くない | 〜かったです -> 〜かった | 〜くなかったです -> 〜くなかった");
        p2.setExamples(Arrays.asList(
                new GrammarExampleDto(3L, "GRAMMAR", 2002L, "この ラーメン、すごく おいしいよ。", "この ラーメン、すごく おいしいよ。", "この ラーメン、すごく おいしいよ。", "Món mì ramen này ngon lắm đấy.", 1),
                new GrammarExampleDto(4L, "GRAMMAR", 2002L, "昨日（きのう）の テスト、難（むずか）しかった。", "昨日の テスト、難しかった。", "きのうの テスト、むずかしかった。", "Bài kiểm tra hôm qua đã rất khó.", 2)
        ));
        res.add(p2);

        GrammarPointDto p3 = new GrammarPointDto();
        p3.setGrammarId(2003L);
        p3.setPattern("普通形 [な形容詞] - Thể thông thường của TÍNH TỪ ĐUÔI な");
        p3.setMeaning("Thể ngắn của Tính từ đuôi な (だ / じゃない / だった / じゃなかった)");
        p3.setExplanation("Tính từ đuôi な biến đổi です thành だ / じゃない / だった / じゃなかった. Lưu ý đặc biệt: Khi đặt câu hỏi nghi vấn trong thể thông thường, bắt buộc LƯỢC BỎ だ ở cuối câu và lên giọng (Vd: 今日 暇？ - không dùng 暇だ？).");
        p3.setStructure("〜です -> 〜だ | 〜じゃありません -> 〜じゃない | 〜でした -> 〜だった | 〜じゃありませんでした -> 〜じゃなかった");
        p3.setExamples(Arrays.asList(
                new GrammarExampleDto(5L, "GRAMMAR", 2003L, "今日（きょう） 暇（ひま）？ ... うん、暇（ひま）だよ。", "今日 暇？ ... うん、暇だよ。", "きょう ひま？ ... うん、ひまだよ。", "Hôm nay rảnh không? ... Ừ, rảnh chứ.", 1),
                new GrammarExampleDto(6L, "GRAMMAR", 2003L, "あの 町（まち）は 静（しず）かじゃなかった。", "あの 町は 静かじゃなかった。", "あの まちは しずかじゃなかった。", "Thành phố đó đã không yên tĩnh chút nào.", 2)
        ));
        res.add(p3);

        GrammarPointDto p4 = new GrammarPointDto();
        p4.setGrammarId(2004L);
        p4.setPattern("普通形 [名詞] - Thể thông thường của DANH TỪ");
        p4.setMeaning("Thể ngắn của Danh từ (だ / じゃない / だった / じゃなかった)");
        p4.setExplanation("Danh từ biến đổi 4 thì thể thông thường tương tự tính từ đuôi な. Lược bỏ だ khi hỏi nghi vấn.");
        p4.setStructure("N + です -> だ | N + じゃありません -> じゃない | N + でした -> だった | N + じゃありませんでした -> じゃなかった");
        p4.setExamples(Arrays.asList(
                new GrammarExampleDto(7L, "GRAMMAR", 2004L, "昨日（きのう） 雨（あめ）だった？ ... ううん、雨（あめ）じゃなかった。", "昨日 雨だった？ ... ううん、雨じゃなかった。", "きのう あめだった？ ... ううん、あめじゃなかった。", "Hôm qua trời mưa à? ... Không, đã không mưa.", 1),
                new GrammarExampleDto(8L, "GRAMMAR", 2004L, "あしたは 休み（やすみ）だ。", "あしたは 休みだ。", "あしたは やすみだ。", "Ngày mai là ngày nghỉ.", 2)
        ));
        res.add(p4);

        GrammarPointDto p5 = new GrammarPointDto();
        p5.setGrammarId(2005L);
        p5.setPattern("会話のルール - Quy tắc văn thoại thân mật (Giản lược & Nuốt âm)");
        p5.setMeaning("Tổng hợp các quy tắc rút gọn, nuốt âm và trợ từ trong hội thoại hàng ngày");
        p5.setExplanation("Trong văn thoại thực tế: (1) Lược bỏ các trợ từ は, を, へ. (2) Rút gọn Vています thành Vてる (Vd: 何してるの？, 知ってる). (3) Dùng うん (đồng ý) và ううん (phủ định). (4) Đuôi câu cảm xúc: 〜よ (mách nhỏ/nhấn mạnh), 〜ね (xác nhận/đồng cảm), 〜の (hỏi nhẹ nhàng).");
        p5.setStructure("Lược bỏ Trợ từ は/を/へ | Vています -> Vてる | うん/ううん | Từ cuối câu 〜よ/〜ね/〜の");
        p5.setExamples(Arrays.asList(
                new GrammarExampleDto(9L, "GRAMMAR", 2005L, "今（いま） 何（なに） してるの？ ... テレビ 見（み）てる。", "今 何 してるの？ ... テレビ 見てる。", "いま なに してるの？ ... テレビ みてる。", "Bây giờ đang làm gì đấy? ... Tớ đang xem tivi.", 1),
                new GrammarExampleDto(10L, "GRAMMAR", 2005L, "これ 食（た）べる？ ... うん、食（た）べる！", "これ 食べる？ ... うん、食べる！", "これ たべる？ ... うん、たべる！", "Ăn cái này không? ... Ừ, ăn chứ!", 2)
        ));
        res.add(p5);

        return res;
    }
}
