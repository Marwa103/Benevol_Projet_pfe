
package com.benevol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "stock_items")
public class StockItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 200, message = "Le nom doit contenir entre 2 et 200 caractères")
    @Column(nullable = false)
    private String nom;

    @NotBlank(message = "La catégorie est obligatoire")
    @Size(max = 100, message = "La catégorie ne peut dépasser 100 caractères")
    @Column(nullable = false)
    private String categorie;

    @Min(value = 0, message = "La quantité ne peut être négative")
    @Column(nullable = false)
    private Integer quantite = 0;

    @NotBlank(message = "L'unité est obligatoire")
    @Size(max = 50, message = "L'unité ne peut dépasser 50 caractères")
    @Column(nullable = false)
    private String unite;

    @Min(value = 0, message = "Le seuil d'alerte ne peut être négatif")
    @Column(name = "seuil_alerte", nullable = false)
    private Integer seuilAlerte = 0;

    @Column(columnDefinition = "TEXT")
    private String description;

    @CreationTimestamp
    @Column(name = "date_creation", nullable = false, updatable = false)
    private LocalDateTime dateCreation;

    @UpdateTimestamp
    @Column(name = "date_modification")
    private LocalDateTime dateModification;

    // Constructeurs
    public StockItem() {}

    public StockItem(String nom, String categorie, Integer quantite, String unite, Integer seuilAlerte) {
        this.nom = nom;
        this.categorie = categorie;
        this.quantite = quantite;
        this.unite = unite;
        this.seuilAlerte = seuilAlerte;
    }

    // Méthode utilitaire pour vérifier si l'item est en rupture de stock
    public boolean isLowStock() {
        return this.quantite <= this.seuilAlerte;
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getCategorie() { return categorie; }
    public void setCategorie(String categorie) { this.categorie = categorie; }

    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }

    public String getUnite() { return unite; }
    public void setUnite(String unite) { this.unite = unite; }

    public Integer getSeuilAlerte() { return seuilAlerte; }
    public void setSeuilAlerte(Integer seuilAlerte) { this.seuilAlerte = seuilAlerte; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }

    public LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(LocalDateTime dateModification) { this.dateModification = dateModification; }
}
