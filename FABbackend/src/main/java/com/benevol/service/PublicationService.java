package com.benevol.service;

import com.benevol.dto.publication.CreatePublicationDto;
import com.benevol.dto.publication.PublicationDto;
import com.benevol.mapper.PublicationMapper;
import com.benevol.model.Publication;
import com.benevol.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PublicationService {

    @Autowired
    private PublicationRepository repository;

    @Autowired
    private PublicationMapper mapper;

    public List<PublicationDto> getAll() {
        return repository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public PublicationDto create(CreatePublicationDto dto) {
        Publication entity = mapper.toEntity(dto);
        return mapper.toDto(repository.save(entity));
    }

    public PublicationDto update(String id, CreatePublicationDto dto) {
        Publication existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Publication introuvable"));

        mapper.updateEntity(existing, dto);
        return mapper.toDto(repository.save(existing));
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}
