package com.benevol.dto.association;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

/**
 * DTO pour renvoyer les données d'association au format attendu par le frontend
 */
public class AssociationResponseDto {
    
    private String id;
    
    @JsonProperty("name")
    private String nom;
    
    private String description;
    
    private String email;
    
    @JsonProperty("phone")
    private String telephone;
    
    @JsonProperty("address")
    private String adresse;
    
    @JsonProperty("city")
    private String ville;
    
    private String logo;
    
    @JsonProperty("registrationDate")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateInscription;
    
    @JsonProperty("isApproved")
    private boolean approved;
    
    // Constructeurs
    public AssociationResponseDto() {}
    
    public AssociationResponseDto(AssociationDto dto) {
        this.id = dto.getId();
        this.nom = dto.getNom();
        this.description = dto.getDescription();
        this.email = dto.getEmail();
        this.telephone = dto.getTelephone();
        this.adresse = dto.getAdresse();
        this.ville = dto.getVille();
        this.logo = dto.getLogo();
        this.dateInscription = dto.getDateInscription();
        this.approved = dto.isApproved();
    }
    
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
    
    public String getLogo() { return logo; }
    public void setLogo(String logo) { this.logo = logo; }
    
    public LocalDateTime getDateInscription() { return dateInscription; }
    public void setDateInscription(LocalDateTime dateInscription) { this.dateInscription = dateInscription; }
    
    public boolean isApproved() { return approved; }
    public void setApproved(boolean approved) { this.approved = approved; }
}
