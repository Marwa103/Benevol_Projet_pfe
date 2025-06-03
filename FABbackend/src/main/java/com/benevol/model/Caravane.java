
package com.benevol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "caravanes")
public class Caravane {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank(message = "Le titre est obligatoire")
    @Size(min = 5, max = 200, message = "Le titre doit contenir entre 5 et 200 caractères")
    @Column(nullable = false)
    private String titre;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotBlank(message = "L'adresse est obligatoire")
    @Column(columnDefinition = "TEXT", nullable = false)
    private String adresse;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @NotNull(message = "La date de début est obligatoire")
    @Column(name = "date_debut", nullable = false)
    private LocalDateTime dateDebut;

    @NotNull(message = "La date de fin est obligatoire")
    @Column(name = "date_fin", nullable = false)
    private LocalDateTime dateFin;

    @NotBlank(message = "L'organisateur est obligatoire")
    @Size(min = 2, max = 200, message = "Le nom de l'organisateur doit contenir entre 2 et 200 caractères")
    @Column(nullable = false)
    private String organisateur;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutCaravane statut = StatutCaravane.PLANNED;

//    @ElementCollection
//    @CollectionTable(name = "caravane_services", joinColumns = @JoinColumn(name = "caravane_id"))
//    @Column(name = "service", nullable = true)
//    private List<String> servicesOfferts = new ArrayList<>();

    @OneToMany(mappedBy = "caravane", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ParticipationCaravane> participations = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "date_creation", nullable = false, updatable = false)
    private LocalDateTime dateCreation;

    @UpdateTimestamp
    @Column(name = "date_modification")
    private LocalDateTime dateModification;

    // Constructeurs
    public Caravane() {}

    public Caravane(String titre, String adresse, Double latitude, Double longitude, 
                   LocalDateTime dateDebut, LocalDateTime dateFin, String organisateur) {
        this.titre = titre;
        this.adresse = adresse;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.organisateur = organisateur;
    }

    // Méthodes utilitaires
    public void addParticipation(ParticipationCaravane participation) {
        participations.add(participation);
        participation.setCaravane(this);
    }

    public void removeParticipation(ParticipationCaravane participation) {
        participations.remove(participation);
        participation.setCaravane(null);
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public LocalDateTime getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDateTime dateDebut) { this.dateDebut = dateDebut; }

    public LocalDateTime getDateFin() { return dateFin; }
    public void setDateFin(LocalDateTime dateFin) { this.dateFin = dateFin; }

    public String getOrganisateur() { return organisateur; }
    public void setOrganisateur(String organisateur) { this.organisateur = organisateur; }

    public StatutCaravane getStatut() { return statut; }
    public void setStatut(StatutCaravane statut) { this.statut = statut; }

//    public List<String> getServicesOfferts() { return servicesOfferts; }
//    public void setServicesOfferts(List<String> servicesOfferts) { this.servicesOfferts = servicesOfferts; }

    public List<ParticipationCaravane> getParticipations() { return participations; }
    public void setParticipations(List<ParticipationCaravane> participations) { this.participations = participations; }

    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }

    public LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(LocalDateTime dateModification) { this.dateModification = dateModification; }
}
