
package com.benevol.dto.aidrequest;

import com.benevol.dto.association.AssociationDto;
import java.time.LocalDateTime;
import java.util.List;

public class AidRequestDto {

    private String id;
    private String associationId;
    private String statut;
    private String commentaire;
    private LocalDateTime dateDemande;
    private LocalDateTime dateReponse;
    private LocalDateTime dateModification;
    private AssociationDto association;
    private List<AidRequestItemDto> items;

    // Constructeurs
    public AidRequestDto() {}

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getAssociationId() { return associationId; }
    public void setAssociationId(String associationId) { this.associationId = associationId; }

    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }

    public String getCommentaire() { return commentaire; }
    public void setCommentaire(String commentaire) { this.commentaire = commentaire; }

    public LocalDateTime getDateDemande() { return dateDemande; }
    public void setDateDemande(LocalDateTime dateDemande) { this.dateDemande = dateDemande; }

    public LocalDateTime getDateReponse() { return dateReponse; }
    public void setDateReponse(LocalDateTime dateReponse) { this.dateReponse = dateReponse; }

    public LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(LocalDateTime dateModification) { this.dateModification = dateModification; }

    public AssociationDto getAssociation() { return association; }
    public void setAssociation(AssociationDto association) { this.association = association; }

    public List<AidRequestItemDto> getItems() { return items; }
    public void setItems(List<AidRequestItemDto> items) { this.items = items; }
}
