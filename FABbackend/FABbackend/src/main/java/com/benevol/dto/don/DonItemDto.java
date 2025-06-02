
package com.benevol.dto.don;

public class DonItemDto {
    
    private String id;
    private String nom;
    private int quantite;
    private String unite;
    private String description;

    // Constructeurs
    public DonItemDto() {}

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public int getQuantite() { return quantite; }
    public void setQuantite(int quantite) { this.quantite = quantite; }

    public String getUnite() { return unite; }
    public void setUnite(String unite) { this.unite = unite; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
