
package com.benevol.dto.admin;

import java.math.BigDecimal;

public class AdminStatisticsDto {
    
    private long totalAssociations;
    private long associationsApprouvees;
    private long pendingRequests;
    private BigDecimal totalDonations;
    private long totalDonors;
    private long pendingHelpRequests;
    private long totalEvents;
    private long totalCaravanes;
    private long totalStockItems;
    private long lowStockItems;

    // Constructeurs
    public AdminStatisticsDto() {}

    // Getters et Setters
    public long getTotalAssociations() { return totalAssociations; }
    public void setTotalAssociations(long totalAssociations) { this.totalAssociations = totalAssociations; }

    public long getAssociationsApprouvees() { return associationsApprouvees; }
    public void setAssociationsApprouvees(long associationsApprouvees) { this.associationsApprouvees = associationsApprouvees; }

    public long getPendingRequests() { return pendingRequests; }
    public void setPendingRequests(long pendingRequests) { this.pendingRequests = pendingRequests; }

    public BigDecimal getTotalDonations() { return totalDonations; }
    public void setTotalDonations(BigDecimal totalDonations) { this.totalDonations = totalDonations; }

    public long getTotalDonors() { return totalDonors; }
    public void setTotalDonors(long totalDonors) { this.totalDonors = totalDonors; }

    public long getPendingHelpRequests() { return pendingHelpRequests; }
    public void setPendingHelpRequests(long pendingHelpRequests) { this.pendingHelpRequests = pendingHelpRequests; }

    public long getTotalEvents() { return totalEvents; }
    public void setTotalEvents(long totalEvents) { this.totalEvents = totalEvents; }

    public long getTotalCaravanes() { return totalCaravanes; }
    public void setTotalCaravanes(long totalCaravanes) { this.totalCaravanes = totalCaravanes; }

    public long getTotalStockItems() { return totalStockItems; }
    public void setTotalStockItems(long totalStockItems) { this.totalStockItems = totalStockItems; }

    public long getLowStockItems() { return lowStockItems; }
    public void setLowStockItems(long lowStockItems) { this.lowStockItems = lowStockItems; }
}
