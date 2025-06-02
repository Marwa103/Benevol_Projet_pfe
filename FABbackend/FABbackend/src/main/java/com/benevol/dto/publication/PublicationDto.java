package com.benevol.dto.publication;

import com.benevol.model.PublicationType;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PublicationDto {
    private String id;
    private String title;
    private String content;
    private PublicationType type;
    private String imageUrl;
    private String relatedEventId;
    private String relatedCaravanId;
    private LocalDateTime publishDate;
}
