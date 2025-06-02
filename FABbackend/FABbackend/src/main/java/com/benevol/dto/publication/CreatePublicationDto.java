package com.benevol.dto.publication;

import com.benevol.model.PublicationType;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePublicationDto {
    private String title;
    private String content;
    private PublicationType type;
    private String imageUrl;
    private String relatedEventId;
    private String relatedCaravanId;
}
