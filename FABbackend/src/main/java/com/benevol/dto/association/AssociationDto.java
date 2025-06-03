
package com.benevol.dto.association;

import com.benevol.dto.user.UserDto;
import java.time.LocalDateTime;

public class AssociationDto {
    
    private String id;
    private String nom;
    private String description;
    private String email;
    private String telephone;
    private String adresse;
    private String ville;
    private String logo;
    private LocalDateTime dateInscription;
    private boolean isApproved;
    private UserDto user;
    
    // Informations du responsable
    private String nomResponsable;
    private String prenomResponsable;

    // Constructeurs
    public AssociationDto() {}

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }

    public LocalDateTime getDateInscription() { return dateInscription; }
    public void setDateInscription(LocalDateTime dateInscription) { this.dateInscription = dateInscription; }

    public boolean isApproved() { return isApproved; }
    public void setApproved(boolean approved) { isApproved = approved; }

    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }

    public String getLogo() { return logo; }
    public void setLogo(String logo) { this.logo = logo; }

    public String getNomResponsable() { return nomResponsable; }
    public void setNomResponsable(String nomResponsable) { this.nomResponsable = nomResponsable; }

    public String getPrenomResponsable() { return prenomResponsable; }
    public void setPrenomResponsable(String prenomResponsable) { this.prenomResponsable = prenomResponsable; }
}
