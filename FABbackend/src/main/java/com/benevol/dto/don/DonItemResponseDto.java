package com.benevol.dto.don;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DonItemResponseDto {
    
    private String id;
    
    @JsonProperty("name")
    private String nom;
    
    @JsonProperty("quantity")
    private Integer quantite;
    
    @JsonProperty("unit")
    private String unite;
    
    private String description;
    
    // Constructeurs
    public DonItemResponseDto() {}
    
    public DonItemResponseDto(DonItemDto donItemDto) {
        this.id = donItemDto.getId();
        this.nom = donItemDto.getNom();
        this.quantite = donItemDto.getQuantite();
        this.unite = donItemDto.getUnite();
        this.description = donItemDto.getDescription();
    }
    
    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    
    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }
    
    public String getUnite() { return unite; }
    public void setUnite(String unite) { this.unite = unite; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
