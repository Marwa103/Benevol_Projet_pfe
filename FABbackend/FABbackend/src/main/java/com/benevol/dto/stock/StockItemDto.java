
package com.benevol.dto.stock;

import java.time.LocalDateTime;

public class StockItemDto {
    
    private String id;
    private String nom;
    private String categorie;
    private int quantite;
    private String unite;
    private int seuil;
    private boolean isLowStock;
    private String description;
    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;

    // Constructeurs
    public StockItemDto() {}

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getCategorie() { return categorie; }
    public void setCategorie(String categorie) { this.categorie = categorie; }

    public int getQuantite() { return quantite; }
    public void setQuantite(int quantite) { this.quantite = quantite; }

    public String getUnite() { return unite; }
    public void setUnite(String unite) { this.unite = unite; }

    public int getSeuil() { return seuil; }
    public void setSeuil(int seuil) { this.seuil = seuil; }

    public boolean isLowStock() { return isLowStock; }
    public void setLowStock(boolean lowStock) { isLowStock = lowStock; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }

    public LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(LocalDateTime dateModification) { this.dateModification = dateModification; }
}
