
package com.benevol.dto.don;

import com.benevol.model.TypeDon;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;

public class CreateDonDto {
    
    @NotBlank(message = "Le nom du donateur est obligatoire")
    @Size(min = 2, max = 200, message = "Le nom du donateur doit contenir entre 2 et 200 caractères")
    private String nomDonateur;

    private String emailDonateur;
    
    private String telephoneDonateur;

    @NotNull(message = "Le type de don est obligatoire")
    private TypeDon typeDon;

    @DecimalMin(value = "0.0", message = "Le montant ne peut être négatif")
    private BigDecimal montant;

    private String description;

    private List<CreateDonItemDto> items;

    // Constructeurs
    public CreateDonDto() {}

    // Getters et Setters
    public String getNomDonateur() { return nomDonateur; }
    public void setNomDonateur(String nomDonateur) { this.nomDonateur = nomDonateur; }

    public String getEmailDonateur() { return emailDonateur; }
    public void setEmailDonateur(String emailDonateur) { this.emailDonateur = emailDonateur; }

    public String getTelephoneDonateur() { return telephoneDonateur; }
    public void setTelephoneDonateur(String telephoneDonateur) { this.telephoneDonateur = telephoneDonateur; }

    public TypeDon getTypeDon() { return typeDon; }
    public void setTypeDon(TypeDon typeDon) { this.typeDon = typeDon; }

    public BigDecimal getMontant() { return montant; }
    public void setMontant(BigDecimal montant) { this.montant = montant; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<CreateDonItemDto> getItems() { return items; }
    public void setItems(List<CreateDonItemDto> items) { this.items = items; }
}
