package com.benevol.dto.don;

import com.benevol.model.TypeDon;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class DonDto {

    private String id;
    private String nomDonateur;
    private String emailDonateur;
    private String telephoneDonateur;
    private TypeDon typeDon;
    private BigDecimal montant;
    private String description;
    private LocalDateTime dateCreation;
    private List<DonItemDto> items;

    // Constructeurs
    public DonDto() {}

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

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

    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }

    public List<DonItemDto> getItems() { return items; }
    public void setItems(List<DonItemDto> items) { this.items = items; }
}