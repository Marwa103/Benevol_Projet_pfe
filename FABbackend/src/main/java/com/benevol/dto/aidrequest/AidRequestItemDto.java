
package com.benevol.dto.aidrequest;

public class AidRequestItemDto {

    private String id;
    private String itemId;
    private String itemName;
    private Integer quantiteDemandee;
    private Integer quantiteApprouvee;

    // Constructeurs
    public AidRequestItemDto() {}

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getItemId() { return itemId; }
    public void setItemId(String itemId) { this.itemId = itemId; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public Integer getQuantiteDemandee() { return quantiteDemandee; }
    public void setQuantiteDemandee(Integer quantiteDemandee) { this.quantiteDemandee = quantiteDemandee; }

    public Integer getQuantiteApprouvee() { return quantiteApprouvee; }
    public void setQuantiteApprouvee(Integer quantiteApprouvee) { this.quantiteApprouvee = quantiteApprouvee; }
}
