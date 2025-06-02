
package com.benevol.dto.aidrequest;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class CreateAidRequestItemDto {

    @NotBlank(message = "L'ID de l'article est obligatoire")
    private String itemId;

    @NotBlank(message = "Le nom de l'article est obligatoire")
    private String itemName;

    @Min(value = 1, message = "La quantité demandée doit être positive")
    private Integer quantiteDemandee;

    // Constructeurs
    public CreateAidRequestItemDto() {}

    // Getters et Setters
    public String getItemId() { return itemId; }
    public void setItemId(String itemId) { this.itemId = itemId; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public Integer getQuantiteDemandee() { return quantiteDemandee; }
    public void setQuantiteDemandee(Integer quantiteDemandee) { this.quantiteDemandee = quantiteDemandee; }
}
