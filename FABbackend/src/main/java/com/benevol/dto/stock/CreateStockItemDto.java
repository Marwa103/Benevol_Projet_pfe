
package com.benevol.dto.stock;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateStockItemDto {
    
    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 200, message = "Le nom doit contenir entre 2 et 200 caractères")
    private String nom;

    private String description;

    @NotNull(message = "La quantité est obligatoire")
    @Min(value = 0, message = "La quantité ne peut être négative")
    private Integer quantite;

    @NotBlank(message = "L'unité est obligatoire")
    @Size(max = 50, message = "L'unité ne peut dépasser 50 caractères")
    private String unite;

    @NotBlank(message = "La catégorie est obligatoire")
    @Size(max = 100, message = "La catégorie ne peut dépasser 100 caractères")
    private String categorie;

    @Min(value = 0, message = "Le seuil minimum ne peut être négatif")
    private Integer seuilMinimum = 0;

    // Constructeurs
    public CreateStockItemDto() {}

    // Getters et Setters
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }

    public String getUnite() { return unite; }
    public void setUnite(String unite) { this.unite = unite; }

    public String getCategorie() { return categorie; }
    public void setCategorie(String categorie) { this.categorie = categorie; }

    public Integer getSeuilMinimum() { return seuilMinimum; }
    public void setSeuilMinimum(Integer seuilMinimum) { this.seuilMinimum = seuilMinimum; }
}
