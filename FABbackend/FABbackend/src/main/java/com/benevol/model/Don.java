package com.benevol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "dons")
public class Don {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank(message = "Le nom du donateur est obligatoire")
    @Size(min = 2, max = 200, message = "Le nom du donateur doit contenir entre 2 et 200 caractères")
    @Column(name = "nom_donateur", nullable = false)
    private String nomDonateur;

    @DecimalMin(value = "0.0", message = "Le montant ne peut être négatif")
    @Column(precision = 10, scale = 2)
    private BigDecimal montant = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeDon type;

    @Column(columnDefinition = "TEXT")
    private String commentaire;

    @OneToMany(mappedBy = "don", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DonItem> items = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "date_creation", nullable = false, updatable = false)
    private LocalDateTime dateCreation;

    @Column(name = "email_donateur")
    private String emailDonateur;

    @Column(name = "is_visitor", nullable = false)
    private boolean isVisitor = false; // Par défaut, false pour les utilisateurs authentifiés

    // Constructeurs
    public Don() {}

    public Don(String nomDonateur, TypeDon type) {
        this.nomDonateur = nomDonateur;
        this.type = type;
    }

    // Méthodes utilitaires
    public void addItem(DonItem item) {
        items.add(item);
        item.setDon(this);
    }

    public void removeItem(DonItem item) {
        items.remove(item);
        item.setDon(null);
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNomDonateur() { return nomDonateur; }
    public void setNomDonateur(String nomDonateur) { this.nomDonateur = nomDonateur; }

    public BigDecimal getMontant() { return montant; }
    public void setMontant(BigDecimal montant) { this.montant = montant; }

    public TypeDon getType() { return type; }
    public void setType(TypeDon type) { this.type = type; }

    public String getCommentaire() { return commentaire; }
    public void setCommentaire(String commentaire) { this.commentaire = commentaire; }

    public List<DonItem> getItems() { return items; }
    public void setItems(List<DonItem> items) { this.items = items; }

    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }

    public String getEmailDonateur() { return emailDonateur; }
    public void setEmailDonateur(String emailDonateur) { this.emailDonateur = emailDonateur; }

    public boolean isVisitor() { return isVisitor; }
    public void setVisitor(boolean isVisitor) { this.isVisitor = isVisitor; }
}