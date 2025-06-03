
package com.benevol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "don_items")
public class DonItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "don_id", nullable = false)
    private Don don;

    @NotBlank(message = "Le nom de l'article est obligatoire")
    @Size(min = 2, max = 200, message = "Le nom de l'article doit contenir entre 2 et 200 caractères")
    @Column(name = "nom_article", nullable = false)
    private String nomArticle;

    @Min(value = 1, message = "La quantité doit être positive")
    @Column(nullable = false)
    private Integer quantite;

    @Size(max = 50, message = "L'unité ne peut dépasser 50 caractères")
    private String unite;

    @Column(columnDefinition = "TEXT")
    private String description;

    // Constructeurs
    public DonItem() {}

    public DonItem(Don don, String nomArticle, Integer quantite) {
        this.don = don;
        this.nomArticle = nomArticle;
        this.quantite = quantite;
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Don getDon() { return don; }
    public void setDon(Don don) { this.don = don; }

    public String getNomArticle() { return nomArticle; }
    public void setNomArticle(String nomArticle) { this.nomArticle = nomArticle; }

    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }

    public String getUnite() { return unite; }
    public void setUnite(String unite) { this.unite = unite; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
