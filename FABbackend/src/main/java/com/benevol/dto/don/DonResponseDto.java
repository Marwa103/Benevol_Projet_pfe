

        package com.benevol.dto.don;

import com.benevol.model.TypeDon;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class DonResponseDto {

    private String id;

    @JsonProperty("donorName")
    private String donnateurNom;

    @JsonProperty("donorEmail")
    private String donnateurEmail;

    @JsonProperty("donorPhone")
    private String donnateurTelephone;

    private TypeDon type;

    @JsonProperty("amount")
    private BigDecimal montant;

    private String description;

    @JsonProperty("date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime dateDon;

    private List<DonItemResponseDto> items;


    public DonResponseDto(DonDto donDto) {
        this.id = donDto.getId();
        this.donnateurNom = donDto.getNomDonateur();
        this.donnateurEmail = donDto.getEmailDonateur();
        this.donnateurTelephone = donDto.getTelephoneDonateur();
        this.type = donDto.getTypeDon();
        this.montant = donDto.getMontant();
        this.description = donDto.getDescription();
        this.dateDon = donDto.getDateCreation();

        if (donDto.getItems() != null) {
            this.items = donDto.getItems().stream()
                    .map(DonItemResponseDto::new)
                    .toList();
        }
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getDonnateurNom() { return donnateurNom; }
    public void setDonnateurNom(String donnateurNom) { this.donnateurNom = donnateurNom; }

    public String getDonnateurEmail() { return donnateurEmail; }
    public void setDonnateurEmail(String donnateurEmail) { this.donnateurEmail = donnateurEmail; }

    public String getDonnateurTelephone() { return donnateurTelephone; }
    public void setDonnateurTelephone(String donnateurTelephone) { this.donnateurTelephone = donnateurTelephone; }

    public TypeDon getType() { return type; }
    public void setType(TypeDon type) { this.type = type; }

    public BigDecimal getMontant() { return montant; }
    public void setMontant(BigDecimal montant) { this.montant = montant; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getDateDon() { return dateDon; }
    public void setDateDon(LocalDateTime dateDon) { this.dateDon = dateDon; }

    public List<DonItemResponseDto> getItems() { return items; }
    public void setItems(List<DonItemResponseDto> items) { this.items = items; }


}
