
package com.benevol.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "aid_requests")
public class AidRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "association_id", nullable = false)
    private Association association;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AidRequestStatus statut = AidRequestStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String commentaire;

    @OneToMany(mappedBy = "aidRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AidRequestItem> items = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "date_demande", nullable = false, updatable = false)
    private LocalDateTime dateDemande;

    @Column(name = "date_reponse")
    private LocalDateTime dateReponse;

    @UpdateTimestamp
    @Column(name = "date_modification")
    private LocalDateTime dateModification;

    // Constructeurs
    public AidRequest() {}

    public AidRequest(Association association) {
        this.association = association;
    }

    // Méthodes utilitaires
    public void addItem(AidRequestItem item) {
        items.add(item);
        item.setAidRequest(this);
    }

    public void removeItem(AidRequestItem item) {
        items.remove(item);
        item.setAidRequest(null);
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Association getAssociation() { return association; }
    public void setAssociation(Association association) { this.association = association; }

    public AidRequestStatus getStatut() { return statut; }
    public void setStatut(AidRequestStatus statut) { this.statut = statut; }

    public String getCommentaire() { return commentaire; }
    public void setCommentaire(String commentaire) { this.commentaire = commentaire; }

    public List<AidRequestItem> getItems() { return items; }
    public void setItems(List<AidRequestItem> items) { this.items = items; }

    public LocalDateTime getDateDemande() { return dateDemande; }
    public void setDateDemande(LocalDateTime dateDemande) { this.dateDemande = dateDemande; }

    public LocalDateTime getDateReponse() { return dateReponse; }
    public void setDateReponse(LocalDateTime dateReponse) { this.dateReponse = dateReponse; }

    public LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(LocalDateTime dateModification) { this.dateModification = dateModification; }
}
