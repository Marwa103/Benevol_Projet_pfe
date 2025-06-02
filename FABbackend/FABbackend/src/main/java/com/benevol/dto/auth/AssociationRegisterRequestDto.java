
package com.benevol.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AssociationRegisterRequestDto {
    
    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 100, message = "Le nom doit contenir entre 2 et 100 caractères")
    private String name;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format d'email invalide")
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    private String password;

    @NotBlank(message = "Le nom de l'association est obligatoire")
    @Size(min = 2, max = 100, message = "Le nom de l'association doit contenir entre 2 et 100 caractères")
    private String associationName;

    @NotBlank(message = "La description est obligatoire")
    @Size(min = 10, message = "La description doit contenir au moins 10 caractères")
    private String description;

    @NotBlank(message = "Le téléphone est obligatoire")
    private String phone;

    @NotBlank(message = "L'adresse est obligatoire")
    private String address;

    @NotBlank(message = "La ville est obligatoire")
    private String city;

    // Constructeurs
    public AssociationRegisterRequestDto() {}

    // Getters et Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getAssociationName() { return associationName; }
    public void setAssociationName(String associationName) { this.associationName = associationName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
}
