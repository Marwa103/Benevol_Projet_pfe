
package com.benevol.dto.evenement;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public class CreateEvenementDto {
    
    @NotBlank(message = "Le titre est obligatoire")
    @Size(min = 5, max = 200, message = "Le titre doit contenir entre 5 et 200 caractères")
    private String titre;

    private String description;

    @NotBlank(message = "Le lieu est obligatoire")
    private String lieu;

    @NotNull(message = "La date de début est obligatoire")
    private LocalDateTime dateDebut;

    @NotNull(message = "La date de fin est obligatoire")
    private LocalDateTime dateFin;

    @NotBlank(message = "L'organisateur est obligatoire")
    @Size(min = 2, max = 200, message = "Le nom de l'organisateur doit contenir entre 2 et 200 caractères")
    private String organisateur;

    private String imageUrl;

    // Constructeurs
    public CreateEvenementDto() {}

    // Getters et Setters
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

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
