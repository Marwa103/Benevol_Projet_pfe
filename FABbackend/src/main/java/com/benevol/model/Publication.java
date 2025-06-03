// 1. Publication.java (Entity)
package com.benevol.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Publication {
    @Id
    private String id;

    private String title;
    @Column(length = 3000)
    private String content;

    @Enumerated(EnumType.STRING)
    private PublicationType type;

    private String imageUrl;
    private String relatedEventId;
    private String relatedCaravanId;

    private LocalDateTime publishDate;

    @PrePersist
    public void setPublishDate() {
        this.publishDate = LocalDateTime.now();
    }
}
