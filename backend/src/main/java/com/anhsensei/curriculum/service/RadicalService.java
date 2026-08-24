package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.Radical;
import com.anhsensei.curriculum.dto.RadicalDto;
import com.anhsensei.curriculum.repository.RadicalRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RadicalService {

    private final RadicalRepository radicalRepository;

    public RadicalService(RadicalRepository radicalRepository) {
        this.radicalRepository = radicalRepository;
    }

    @Cacheable("radicals")
    public List<RadicalDto> getAllRadicals() {
        return radicalRepository.findAllByOrderByRadicalNumberAsc()
                .stream()
                .map(RadicalDto::new)
                .collect(Collectors.toList());
    }
}
