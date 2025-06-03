
package com.benevol.dto.association;

import com.benevol.model.AidRequestStatus;
import java.time.LocalDateTime;

public class AidRequestDto {
    
    private String id;
    private String titre;
    private String description;
    private Integer quantite;
    private LocalDateTime dateCreation;
    private AidRequestStatus statut;
    private AssociationDto association;

    // Constructeurs
    public AidRequestDto() {}

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }

    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }

    public AidRequestStatus getStatut() { return statut; }
    public void setStatut(AidRequestStatus statut) { this.statut = statut; }

    public AssociationDto getAssociation() { return association; }
    public void setAssociation(AssociationDto association) { this.association = association; }
}
