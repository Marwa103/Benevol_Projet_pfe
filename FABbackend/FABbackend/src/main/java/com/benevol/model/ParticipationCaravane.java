
package com.benevol.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "participation_caravanes")
public class ParticipationCaravane {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "caravane_id", nullable = false)
    private Caravane caravane;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "association_id", nullable = false)
    private Association association;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutParticipation statut = StatutParticipation.PENDING;

    @Column(columnDefinition = "TEXT")
    private String commentaire;

    @CreationTimestamp
    @Column(name = "date_inscription", nullable = false, updatable = false)
    private LocalDateTime dateInscription;

    @Column(name = "date_confirmation")
    private LocalDateTime dateConfirmation;

    // Constructeurs
    public ParticipationCaravane() {}

    public ParticipationCaravane(Caravane caravane, Association association) {
        this.caravane = caravane;
        this.association = association;
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Caravane getCaravane() { return caravane; }
    public void setCaravane(Caravane caravane) { this.caravane = caravane; }

    public Association getAssociation() { return association; }
    public void setAssociation(Association association) { this.association = association; }

    public StatutParticipation getStatut() { return statut; }
    public void setStatut(StatutParticipation statut) { this.statut = statut; }

    public String getCommentaire() { return commentaire; }
    public void setCommentaire(String commentaire) { this.commentaire = commentaire; }

    public LocalDateTime getDateInscription() { return dateInscription; }
    public void setDateInscription(LocalDateTime dateInscription) { this.dateInscription = dateInscription; }

    public LocalDateTime getDateConfirmation() { return dateConfirmation; }
    public void setDateConfirmation(LocalDateTime dateConfirmation) { this.dateConfirmation = dateConfirmation; }
}
