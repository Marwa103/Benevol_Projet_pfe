
package com.benevol.controller;

import com.benevol.dto.admin.AdminStatisticsDto;
import com.benevol.dto.admin.PendingAssociationDto;
import com.benevol.dto.adapter.AdminStatisticsFrontendAdapter;
import com.benevol.dto.adapter.PendingAssociationFrontendAdapter;
import com.benevol.dto.don.DonDto;
import com.benevol.dto.stock.StockItemDto;
import com.benevol.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/statistiques")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        AdminStatisticsDto statistics = adminService.getAdminStatistics();
        Map<String, Object> frontendStats = AdminStatisticsFrontendAdapter.adapt(statistics);
        return ResponseEntity.ok(frontendStats);
    }

    @GetMapping("/associations-pending")
    public ResponseEntity<List<Map<String, Object>>> getPendingAssociations() {
        List<PendingAssociationDto> pendingAssociations = adminService.getPendingAssociations();
        List<Map<String, Object>> frontendAssociations = PendingAssociationFrontendAdapter.adaptList(pendingAssociations);
        return ResponseEntity.ok(frontendAssociations);
    }

    @PutMapping("/valider-association/{id}")
    public ResponseEntity<Map<String, String>> verifyAssociation(@PathVariable String id) {
        adminService.verifyAssociation(id);
        return ResponseEntity.ok(Map.of("message", "Association validée avec succès"));
    }

    @GetMapping("/stock")
    public ResponseEntity<List<StockItemDto>> getStockItems() {
        List<StockItemDto> stockItems = adminService.getStockItems();
        return ResponseEntity.ok(stockItems);
    }

    @GetMapping("/donations")
    public ResponseEntity<List<DonDto>> getDonations() {
        List<DonDto> donations = adminService.getDonations();
        return ResponseEntity.ok(donations);
    }

    @PostMapping("/stock")
    public ResponseEntity<StockItemDto> createStockItem(@RequestBody StockItemDto stockItemDto) {
        StockItemDto stockItem = adminService.createStockItem(stockItemDto);
        return ResponseEntity.ok(stockItem);
    }

    @PutMapping("/stock/{id}")
    public ResponseEntity<StockItemDto> updateStockItem(
            @PathVariable String id,
            @RequestBody StockItemDto stockItemDto) {
        StockItemDto stockItem = adminService.updateStockItem(id, stockItemDto);
        return ResponseEntity.ok(stockItem);
    }

    @DeleteMapping("/stock/{id}")
    public ResponseEntity<Void> deleteStockItem(@PathVariable String id) {
        adminService.deleteStockItem(id);
        return ResponseEntity.noContent().build();
    }
}
