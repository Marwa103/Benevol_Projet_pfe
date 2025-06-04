
package com.benevol.dto.caravane;

import com.benevol.model.StatutCaravane;
import java.time.LocalDateTime;
import java.util.List;

public class CaravaneDto {
    
    private String id;
    private String titre;
    private String description;
    private String adresse;
    private Double latitude;
    private Double longitude;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    private String organisateur;
    private StatutCaravane statut;
//    private List<String> servicesOfferts;
    private int nombreParticipants;
    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;

    // Constructeurs
    public CaravaneDto() {}

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

    public int getNombreParticipants() { return nombreParticipants; }
    public void setNombreParticipants(int nombreParticipants) { this.nombreParticipants = nombreParticipants; }

    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }

    public LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(LocalDateTime dateModification) { this.dateModification = dateModification; }
}
