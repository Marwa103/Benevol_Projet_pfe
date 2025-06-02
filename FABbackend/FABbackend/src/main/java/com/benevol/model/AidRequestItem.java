
package com.benevol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;

@Entity
@Table(name = "aid_request_items")
public class AidRequestItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aid_request_id", nullable = false)
    private AidRequest aidRequest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_item_id", nullable = false)
    private StockItem stockItem;

    @Min(value = 1, message = "La quantité demandée doit être positive")
    @Column(name = "quantite_demandee", nullable = false)
    private Integer quantiteDemandee;

    @Min(value = 0, message = "La quantité approuvée ne peut être négative")
    @Column(name = "quantite_approuvee")
    private Integer quantiteApprouvee = 0;

    // Constructeurs
    public AidRequestItem() {}

    public AidRequestItem(AidRequest aidRequest, StockItem stockItem, Integer quantiteDemandee) {
        this.aidRequest = aidRequest;
        this.stockItem = stockItem;
        this.quantiteDemandee = quantiteDemandee;
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public AidRequest getAidRequest() { return aidRequest; }
    public void setAidRequest(AidRequest aidRequest) { this.aidRequest = aidRequest; }

    public StockItem getStockItem() { return stockItem; }
    public void setStockItem(StockItem stockItem) { this.stockItem = stockItem; }

    public Integer getQuantiteDemandee() { return quantiteDemandee; }
    public void setQuantiteDemandee(Integer quantiteDemandee) { this.quantiteDemandee = quantiteDemandee; }

    public Integer getQuantiteApprouvee() { return quantiteApprouvee; }
    public void setQuantiteApprouvee(Integer quantiteApprouvee) { this.quantiteApprouvee = quantiteApprouvee; }
}
