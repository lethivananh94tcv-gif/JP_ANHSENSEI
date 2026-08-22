package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.Level;
import com.anhsensei.curriculum.dto.CreateLevelRequest;
import com.anhsensei.curriculum.dto.LevelDto;
import com.anhsensei.curriculum.dto.UpdateLevelRequest;
import com.anhsensei.curriculum.repository.LevelRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LevelService {

    private final LevelRepository levelRepository;

    public LevelService(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    @Transactional
    public LevelDto createLevel(CreateLevelRequest request, Long adminId) {
        String normalizedCode = request.getCode().trim().toUpperCase();

        if (levelRepository.existsByCode(normalizedCode)) {
            throw new IllegalStateException("Mã trình độ (code) '" + normalizedCode + "' đã tồn tại trong hệ thống");
        }

        if (levelRepository.existsBySortOrderAndStatusNot(request.getSortOrder(), "ARCHIVED")) {
            throw new IllegalStateException("Thứ tự sắp xếp (sortOrder) " + request.getSortOrder() + " đã trùng với một Level chưa bị Archived");
        }

        Level level = new Level();
        level.setCode(normalizedCode);
        level.setName(request.getName().trim());
        level.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);
        level.setSortOrder(request.getSortOrder());
        level.setStatus("DRAFT");
        level.setCreatedBy(adminId);
        level.setUpdatedBy(adminId);

        Level saved = levelRepository.save(level);
        return new LevelDto(saved);
    }

    @Transactional
    public LevelDto updateLevel(Long levelId, UpdateLevelRequest request, Long adminId) {
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Trình độ (Level) có ID: " + levelId));

        if ("ARCHIVED".equalsIgnoreCase(level.getStatus())) {
            throw new IllegalStateException("Không thể chỉnh sửa Level đã ở trạng thái ARCHIVED");
        }

        // Optimistic Locking Check
        if (request.getVersion() != null && !request.getVersion().equals(level.getVersion())) {
            throw new IllegalStateException("Dữ liệu Level đã bị chỉnh sửa bởi một phiên giao dịch khác. Vui lòng tải lại trang.");
        }

        if (levelRepository.existsBySortOrderAndStatusNotExcludingId(request.getSortOrder(), "ARCHIVED", levelId)) {
            throw new IllegalStateException("Thứ tự sắp xếp (sortOrder) " + request.getSortOrder() + " đã trùng với một Level chưa bị Archived");
        }

        level.setName(request.getName().trim());
        level.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);
        level.setSortOrder(request.getSortOrder());
        level.setUpdatedBy(adminId);

        Level saved = levelRepository.save(level);
        return new LevelDto(saved);
    }

    @Transactional(readOnly = true)
    public LevelDto getLevelById(Long levelId) {
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Trình độ (Level) có ID: " + levelId));
        return new LevelDto(level);
    }

    @Transactional(readOnly = true)
    public List<LevelDto> getAllLevelsForAdmin() {
        List<Level> rawList = levelRepository.findAllByOrderBySortOrderAsc();
        java.util.Map<String, LevelDto> uniqueMap = new java.util.LinkedHashMap<>();
        for (Level l : rawList) {
            if (l.getDeletedAt() == null && !uniqueMap.containsKey(l.getCode())) {
                uniqueMap.put(l.getCode(), new LevelDto(l));
            }
        }
        return new java.util.ArrayList<>(uniqueMap.values());
    }

    @Transactional
    public LevelDto archiveLevel(Long levelId, Long adminId) {
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Trình độ (Level) có ID: " + levelId));

        level.setStatus("ARCHIVED");
        level.setDeletedAt(OffsetDateTime.now());
        level.setUpdatedBy(adminId);

        Level saved = levelRepository.save(level);
        return new LevelDto(saved);
    }
}
