
package com.benevol.dto.user;

import jakarta.validation.constraints.Size;

public class UpdateUserDto {
    
    @Size(min = 2, max = 100, message = "Le nom doit contenir entre 2 et 100 caractères")
    private String nom;

    @Size(min = 2, max = 100, message = "Le prénom doit contenir entre 2 et 100 caractères")
    private String prenom;

    @Size(max = 20, message = "Le téléphone ne peut dépasser 20 caractères")
    private String telephone;

    @Size(max = 100, message = "La ville ne peut dépasser 100 caractères")
    private String ville;

    @Size(max = 255, message = "L'adresse ne peut dépasser 255 caractères")
    private String adresse;

    // Constructeurs
    public UpdateUserDto() {}

    // Getters et Setters
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }
}
