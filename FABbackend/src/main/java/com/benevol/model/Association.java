
package com.benevol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDateTime;

@Entity
@Table(name = "associations")
public class Association {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 200, message = "Le nom doit contenir entre 2 et 200 caractères")
    @Column(nullable = false)
    private String nom;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format d'email invalide")
    @Column(unique = true, nullable = false)
    private String email;

    @Size(max = 20, message = "Le téléphone ne peut dépasser 20 caractères")
    private String telephone;

    @Column(columnDefinition = "TEXT")
    private String adresse;

    @Size(max = 100, message = "La ville ne peut dépasser 100 caractères")
    private String ville;

    private String logo;

    @Column(name = "is_approved")
    private Boolean isApproved = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private User user;

    @CreationTimestamp
    @Column(name = "date_inscription", nullable = false, updatable = false)
    private LocalDateTime dateInscription;

    @UpdateTimestamp
    @Column(name = "date_modification")
    private LocalDateTime dateModification;

    // Constructeurs
    public Association() {}

    public Association(String nom, String email, User user) {
        this.nom = nom;
        this.email = email;
        this.user = user;
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

    public Boolean getIsApproved() { return isApproved; }
    public void setIsApproved(Boolean isApproved) { this.isApproved = isApproved; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDateTime getDateInscription() { return dateInscription; }
    public void setDateInscription(LocalDateTime dateInscription) { this.dateInscription = dateInscription; }

    public LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(LocalDateTime dateModification) { this.dateModification = dateModification; }
}
