package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.Lesson;
import com.anhsensei.curriculum.domain.Level;
import com.anhsensei.curriculum.dto.CreateLessonRequest;
import com.anhsensei.curriculum.dto.LessonDto;
import com.anhsensei.curriculum.dto.UpdateLessonRequest;
import com.anhsensei.curriculum.repository.LessonRepository;
import com.anhsensei.curriculum.repository.LevelRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonService {

    private final LessonRepository lessonRepository;
    private final LevelRepository levelRepository;

    public LessonService(LessonRepository lessonRepository, LevelRepository levelRepository) {
        this.lessonRepository = lessonRepository;
        this.levelRepository = levelRepository;
    }

    @Transactional
    public LessonDto createLesson(Long levelId, CreateLessonRequest request, Long adminId) {
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Trình độ (Level) có ID: " + levelId));

        if ("ARCHIVED".equalsIgnoreCase(level.getStatus())) {
            throw new IllegalStateException("Không thể tạo Bài học (Lesson) thuộc Level đã bị ARCHIVED");
        }

        if (lessonRepository.existsByLevelIdAndSortOrderAndStatusNot(levelId, request.getSortOrder(), "ARCHIVED")) {
            throw new IllegalStateException("Thứ tự sắp xếp (sortOrder) " + request.getSortOrder() + " đã bị trùng trong cùng Trình độ (Level)");
        }

        Lesson lesson = new Lesson();
        lesson.setLevel(level);
        lesson.setTitle(request.getTitle().trim());
        lesson.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);
        lesson.setSortOrder(request.getSortOrder());
        lesson.setIsSample(request.getIsSample() != null ? request.getIsSample() : false);
        lesson.setEstimatedMinutes(request.getEstimatedMinutes());
        lesson.setStatus("DRAFT");
        lesson.setCreatedBy(adminId);
        lesson.setUpdatedBy(adminId);

        Lesson saved = lessonRepository.save(lesson);
        return new LessonDto(saved);
    }

    @Transactional
    public LessonDto updateLesson(Long lessonId, UpdateLessonRequest request, Long adminId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Bài học (Lesson) có ID: " + lessonId));

        if ("ARCHIVED".equalsIgnoreCase(lesson.getStatus())) {
            throw new IllegalStateException("Không thể chỉnh sửa Lesson đã ở trạng thái ARCHIVED");
        }

        // Optimistic Locking Check
        if (request.getVersion() != null && !request.getVersion().equals(lesson.getVersion())) {
            throw new IllegalStateException("Dữ liệu Lesson đã bị chỉnh sửa bởi một phiên giao dịch khác. Vui lòng tải lại trang.");
        }

        Long levelId = lesson.getLevel().getLevelId();
        if (lessonRepository.existsByLevelIdAndSortOrderAndStatusNotExcludingId(levelId, request.getSortOrder(), "ARCHIVED", lessonId)) {
            throw new IllegalStateException("Thứ tự sắp xếp (sortOrder) " + request.getSortOrder() + " đã bị trùng trong cùng Trình độ (Level)");
        }

        lesson.setTitle(request.getTitle().trim());
        lesson.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);
        lesson.setSortOrder(request.getSortOrder());
        if (request.getIsSample() != null) {
            lesson.setIsSample(request.getIsSample());
        }
        lesson.setEstimatedMinutes(request.getEstimatedMinutes());
        lesson.setUpdatedBy(adminId);

        Lesson saved = lessonRepository.save(lesson);
        return new LessonDto(saved);
    }

    @Transactional(readOnly = true)
    public LessonDto getLessonById(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Bài học (Lesson) có ID: " + lessonId));
        return new LessonDto(lesson);
    }

    @Transactional(readOnly = true)
    public List<LessonDto> getLessonsByLevelForAdmin(Long levelId) {
        return lessonRepository.findByLevel_LevelIdOrderBySortOrderAsc(levelId).stream()
                .map(LessonDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public LessonDto archiveLesson(Long lessonId, Long adminId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Bài học (Lesson) có ID: " + lessonId));

        lesson.setStatus("ARCHIVED");
        lesson.setDeletedAt(OffsetDateTime.now());
        lesson.setUpdatedBy(adminId);

        Lesson saved = lessonRepository.save(lesson);
        return new LessonDto(saved);
    }
}
