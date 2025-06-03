package com.benevol.mapper;

import com.benevol.dto.publication.CreatePublicationDto;
import com.benevol.dto.publication.PublicationDto;
import com.benevol.model.Publication;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class PublicationMapper {

    public PublicationDto toDto(Publication entity) {
        return PublicationDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .type(entity.getType())
                .imageUrl(entity.getImageUrl())
                .relatedEventId(entity.getRelatedEventId())
                .relatedCaravanId(entity.getRelatedCaravanId())
                .publishDate(entity.getPublishDate())
                .build();
    }

    public Publication toEntity(CreatePublicationDto dto) {
        return Publication.builder()
                .id(UUID.randomUUID().toString())
                .title(dto.getTitle())
                .content(dto.getContent())
                .type(dto.getType())
                .imageUrl(dto.getImageUrl())
                .relatedEventId(dto.getRelatedEventId())
                .relatedCaravanId(dto.getRelatedCaravanId())
                .build();
    }

    public void updateEntity(Publication entity, CreatePublicationDto dto) {
        entity.setTitle(dto.getTitle());
        entity.setContent(dto.getContent());
        entity.setType(dto.getType());
        entity.setImageUrl(dto.getImageUrl());
        entity.setRelatedCaravanId(dto.getRelatedCaravanId());
        entity.setRelatedEventId(dto.getRelatedEventId());
    }
}
