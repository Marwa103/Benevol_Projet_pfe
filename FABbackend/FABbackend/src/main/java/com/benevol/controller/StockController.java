
package com.benevol.controller;

import com.benevol.dto.stock.StockItemDto;
import com.benevol.dto.stock.CreateStockItemDto;
import com.benevol.service.StockService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasRole('ACCOUNTANT') or hasRole('ADMIN')")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping("/all")
    public ResponseEntity<List<StockItemDto>> getAllStockItems() {
        List<StockItemDto> stockItems = stockService.getAllStockItems();
        return ResponseEntity.ok(stockItems);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockItemDto> getStockItemById(@PathVariable String id) {
        StockItemDto stockItem = stockService.getStockItemById(id);
        return ResponseEntity.ok(stockItem);
    }

    @PostMapping("/create")
    public ResponseEntity<StockItemDto> createStockItem(@Valid @RequestBody CreateStockItemDto createStockItemDto) {
        StockItemDto stockItem = stockService.createStockItem(createStockItemDto);
        return ResponseEntity.ok(stockItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockItemDto> updateStockItem(
            @PathVariable String id,
            @Valid @RequestBody CreateStockItemDto updateStockItemDto) {
        StockItemDto stockItem = stockService.updateStockItem(id, updateStockItemDto);
        return ResponseEntity.ok(stockItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStockItem(@PathVariable String id) {
        stockService.deleteStockItem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<StockItemDto>> getLowStockItems() {
        List<StockItemDto> lowStockItems = stockService.getLowStockItems();
        return ResponseEntity.ok(lowStockItems);
    }

    @PostMapping("/{id}/update-quantity")
    public ResponseEntity<StockItemDto> updateStockQuantity(
            @PathVariable String id,
            @RequestParam Integer quantity) {
        StockItemDto stockItem = stockService.updateStockQuantity(id, quantity);
        return ResponseEntity.ok(stockItem);
    }
}
