
package com.benevol.dto.admin;

import java.time.LocalDateTime;

public class PendingAssociationDto {
    
    private String id;
    private String nom;
    private String email;
    private String telephone;
    private String adresse;
    private String ville;
    private String description;
    private LocalDateTime dateInscription;
    private boolean isApproved;
    
    // Informations du responsable
    private String nomResponsable;
    private String prenomResponsable;

    // Constructeurs
    public PendingAssociationDto() {}

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getDateInscription() { return dateInscription; }
    public void setDateInscription(LocalDateTime dateInscription) { this.dateInscription = dateInscription; }

    public boolean isApproved() { return isApproved; }
    public void setApproved(boolean approved) { isApproved = approved; }

    public String getNomResponsable() { return nomResponsable; }
    public void setNomResponsable(String nomResponsable) { this.nomResponsable = nomResponsable; }

    public String getPrenomResponsable() { return prenomResponsable; }
    public void setPrenomResponsable(String prenomResponsable) { this.prenomResponsable = prenomResponsable; }
}
