
package com.benevol.dto.evenement;

import com.benevol.model.StatutEvenement;
import java.time.LocalDateTime;

public class EvenementDto {
    
    private String id;
    private String titre;
    private String description;
    private String lieu;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    private String organisateur;
    private StatutEvenement statut;
    private String imageUrl;
    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;

    // Constructeurs
    public EvenementDto() {}

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLieu() { return lieu; }
    public void setLieu(String lieu) { this.lieu = lieu; }

    public LocalDateTime getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDateTime dateDebut) { this.dateDebut = dateDebut; }

    public LocalDateTime getDateFin() { return dateFin; }
    public void setDateFin(LocalDateTime dateFin) { this.dateFin = dateFin; }

    public String getOrganisateur() { return organisateur; }
    public void setOrganisateur(String organisateur) { this.organisateur = organisateur; }

    public StatutEvenement getStatut() { return statut; }
    public void setStatut(StatutEvenement statut) { this.statut = statut; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }

    public LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(LocalDateTime dateModification) { this.dateModification = dateModification; }
}
