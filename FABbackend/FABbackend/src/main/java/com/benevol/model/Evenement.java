
package com.benevol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "evenements")
public class Evenement {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank(message = "Le titre est obligatoire")
    @Size(min = 5, max = 200, message = "Le titre doit contenir entre 5 et 200 caractères")
    @Column(nullable = false)
    private String titre;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotBlank(message = "Le lieu est obligatoire")
    @Size(min = 2, max = 200, message = "Le lieu doit contenir entre 2 et 200 caractères")
    @Column(nullable = false)
    private String lieu;

    @NotNull(message = "La date de début est obligatoire")
    @Column(name = "date_debut", nullable = false)
    private LocalDateTime dateDebut;

    @Column(name = "date_fin")
    private LocalDateTime dateFin;

    @NotBlank(message = "L'organisateur est obligatoire")
    @Size(min = 2, max = 200, message = "Le nom de l'organisateur doit contenir entre 2 et 200 caractères")
    @Column(nullable = false)
    private String organisateur;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutEvenement statut = StatutEvenement.PLANNED;

    @Column(name = "nombre_max_participants")
    private Integer nombreMaxParticipants;

    @Column(name = "nombre_participants_actuels")
    private Integer nombreParticipantsActuels = 0;

    @Column(name = "is_public")
    private Boolean isPublic = true;

    @CreationTimestamp
    @Column(name = "date_creation", nullable = false, updatable = false)
    private LocalDateTime dateCreation;

    @UpdateTimestamp
    @Column(name = "date_modification")
    private LocalDateTime dateModification;

    // Constructeurs
    public Evenement() {}

    public Evenement(String titre, String lieu, LocalDateTime dateDebut, String organisateur) {
        this.titre = titre;
        this.lieu = lieu;
        this.dateDebut = dateDebut;
        this.organisateur = organisateur;
    }

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

    public Integer getNombreMaxParticipants() { return nombreMaxParticipants; }
    public void setNombreMaxParticipants(Integer nombreMaxParticipants) { this.nombreMaxParticipants = nombreMaxParticipants; }

    public Integer getNombreParticipantsActuels() { return nombreParticipantsActuels; }
    public void setNombreParticipantsActuels(Integer nombreParticipantsActuels) { this.nombreParticipantsActuels = nombreParticipantsActuels; }

    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }

    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }

    public LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(LocalDateTime dateModification) { this.dateModification = dateModification; }
}
