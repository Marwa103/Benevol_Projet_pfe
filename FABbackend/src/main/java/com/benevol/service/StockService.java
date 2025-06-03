
package com.benevol.service;

import com.benevol.dto.stock.StockItemDto;
import com.benevol.dto.stock.CreateStockItemDto;
import com.benevol.model.StockItem;
import com.benevol.repository.StockItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class StockService {

    @Autowired
    private StockItemRepository stockItemRepository;

    public List<StockItemDto> getAllStockItems() {
        List<StockItem> stockItems = stockItemRepository.findByOrderByNomAsc();
        return stockItems.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    public StockItemDto getStockItemById(String id) {
        StockItem stockItem = stockItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Article de stock non trouvé"));
        return convertToDto(stockItem);
    }

    public List<StockItemDto> getLowStockItems() {
        List<StockItem> lowStockItems = stockItemRepository.findLowStockItems();
        return lowStockItems.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    public StockItemDto createStockItem(CreateStockItemDto createDto) {
        StockItem stockItem = new StockItem();
        stockItem.setId(UUID.randomUUID().toString());
        stockItem.setNom(createDto.getNom());
        stockItem.setCategorie(createDto.getCategorie());
        stockItem.setQuantite(createDto.getQuantite());
        stockItem.setUnite(createDto.getUnite());
        stockItem.setSeuilAlerte(createDto.getSeuilMinimum());
        stockItem.setDescription(createDto.getDescription());
        stockItem.setDateCreation(LocalDateTime.now());

        StockItem savedStockItem = stockItemRepository.save(stockItem);
        return convertToDto(savedStockItem);
    }

    public StockItemDto updateStockItem(String id, CreateStockItemDto updateDto) {
        StockItem stockItem = stockItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Article de stock non trouvé"));

        stockItem.setNom(updateDto.getNom());
        stockItem.setCategorie(updateDto.getCategorie());
        stockItem.setQuantite(updateDto.getQuantite());
        stockItem.setUnite(updateDto.getUnite());
        stockItem.setSeuilAlerte(updateDto.getSeuilMinimum());
        stockItem.setDescription(updateDto.getDescription());
        stockItem.setDateModification(LocalDateTime.now());

        StockItem savedStockItem = stockItemRepository.save(stockItem);
        return convertToDto(savedStockItem);
    }

    public StockItemDto updateStockQuantity(String id, Integer quantity) {
        StockItem stockItem = stockItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Article de stock non trouvé"));

        stockItem.setQuantite(quantity);
        stockItem.setDateModification(LocalDateTime.now());

        StockItem savedStockItem = stockItemRepository.save(stockItem);
        return convertToDto(savedStockItem);
    }

    public void deleteStockItem(String id) {
        StockItem stockItem = stockItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Article de stock non trouvé"));

        stockItemRepository.delete(stockItem);
    }

    private StockItemDto convertToDto(StockItem stockItem) {
        StockItemDto dto = new StockItemDto();
        dto.setId(stockItem.getId());
        dto.setNom(stockItem.getNom());
        dto.setCategorie(stockItem.getCategorie());
        dto.setQuantite(stockItem.getQuantite());
        dto.setUnite(stockItem.getUnite());
        dto.setSeuil(stockItem.getSeuilAlerte());
        dto.setLowStock(stockItem.getQuantite() <= stockItem.getSeuilAlerte());
        dto.setDescription(stockItem.getDescription());
        dto.setDateCreation(stockItem.getDateCreation());
        dto.setDateModification(stockItem.getDateModification());
        return dto;
    }
}
