
package com.benevol.dto.don;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateDonItemDto {
    
    @NotBlank(message = "Le nom de l'article est obligatoire")
    @Size(min = 2, max = 200, message = "Le nom de l'article doit contenir entre 2 et 200 caractères")
    private String nom;

    @Min(value = 1, message = "La quantité doit être positive")
    private Integer quantite;

    @Size(max = 50, message = "L'unité ne peut dépasser 50 caractères")
    private String unite;

    private String description;

    // Constructeurs
    public CreateDonItemDto() {}

    // Getters et Setters
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }

    public String getUnite() { return unite; }
    public void setUnite(String unite) { this.unite = unite; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
