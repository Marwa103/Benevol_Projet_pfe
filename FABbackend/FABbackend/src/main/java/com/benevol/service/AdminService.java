
package com.benevol.service;

import com.benevol.dto.admin.AdminStatisticsDto;
import com.benevol.dto.admin.PendingAssociationDto;
import com.benevol.dto.don.DonDto;
import com.benevol.dto.stock.StockItemDto;
import com.benevol.dto.stock.CreateStockItemDto;
import com.benevol.model.Association;
import com.benevol.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.math.BigDecimal;

@Service
@Transactional
public class AdminService {

    @Autowired
    private AssociationRepository associationRepository;

    @Autowired
    private AidRequestRepository aidRequestRepository;

    @Autowired
    private DonRepository donRepository;

    // Repository non utilisé dans cette classe, à retirer ou utiliser si nécessaire
    // @Autowired
    // private UserRepository userRepository;

    @Autowired
    private StockService stockService;

    @Autowired
    private DonService donService;

    public AdminStatisticsDto getAdminStatistics() {
        AdminStatisticsDto statistics = new AdminStatisticsDto();

        // Nombre total d'associations approuvées
        long totalAssociations = associationRepository.findAllApproved().size();
        statistics.setTotalAssociations((int) totalAssociations);

        // Nombre d'associations en attente d'approbation
        long pendingRequests = associationRepository.findAllPending().size();
        statistics.setPendingRequests((int) pendingRequests);

        // Montant total des dons
        Double totalDonations = donRepository.getTotalDonations();
        // Convertir le Double en BigDecimal si non null, sinon utiliser BigDecimal.ZERO
        statistics.setTotalDonations(totalDonations != null ? new BigDecimal(totalDonations) : BigDecimal.ZERO);

        // Nombre de demandes d'aide en attente
        // Utiliser la méthode countPendingRequests() qui est définie dans le repository
        long pendingHelpRequests = aidRequestRepository.countPendingRequests();
        statistics.setPendingHelpRequests((int) pendingHelpRequests);

        return statistics;
    }

    public List<PendingAssociationDto> getPendingAssociations() {
        List<Association> pendingAssociations = associationRepository.findAllPending();
        return pendingAssociations.stream()
            .map(this::convertToPendingAssociationDto)
            .collect(Collectors.toList());
    }

    public void verifyAssociation(String id) {
        Association association = associationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Association non trouvée"));

        association.setIsApproved(true);
        // La date de modification est gérée automatiquement par @UpdateTimestamp
        // Pas besoin de l'initialiser manuellement
        associationRepository.save(association);
    }

    public List<StockItemDto> getStockItems() {
        return stockService.getAllStockItems();
    }

    public List<DonDto> getDonations() {
        return donService.getAllDons();
    }

    public StockItemDto createStockItem(StockItemDto stockItemDto) {
        CreateStockItemDto createDto = new CreateStockItemDto();
        // Mapper tous les champs disponibles du DTO vers l'objet de création
        createDto.setNom(stockItemDto.getNom());
        createDto.setCategorie(stockItemDto.getCategorie());
        createDto.setQuantite(stockItemDto.getQuantite());
        createDto.setUnite(stockItemDto.getUnite());
        createDto.setDescription(stockItemDto.getDescription());
        // Dans StockItemDto c'est 'seuil' et dans CreateStockItemDto c'est 'seuilMinimum'
        createDto.setSeuilMinimum(stockItemDto.getSeuil());
        
        return stockService.createStockItem(createDto);
    }

    public StockItemDto updateStockItem(String id, StockItemDto stockItemDto) {
        CreateStockItemDto updateDto = new CreateStockItemDto();
        // Mapper tous les champs disponibles du DTO vers l'objet de mise à jour
        updateDto.setNom(stockItemDto.getNom());
        updateDto.setCategorie(stockItemDto.getCategorie());
        updateDto.setQuantite(stockItemDto.getQuantite());
        updateDto.setUnite(stockItemDto.getUnite());
        updateDto.setDescription(stockItemDto.getDescription());
        // Dans StockItemDto c'est 'seuil' et dans CreateStockItemDto c'est 'seuilMinimum'
        updateDto.setSeuilMinimum(stockItemDto.getSeuil());
        
        return stockService.updateStockItem(id, updateDto);
    }

    public void deleteStockItem(String id) {
        stockService.deleteStockItem(id);
    }

    private PendingAssociationDto convertToPendingAssociationDto(Association association) {
        PendingAssociationDto dto = new PendingAssociationDto();
        dto.setId(association.getId());
        dto.setNom(association.getNom()); // Utiliser setNom au lieu de setName
        dto.setEmail(association.getEmail());
        dto.setVille(association.getVille()); // Utiliser setVille au lieu de setCity
        dto.setTelephone(association.getTelephone());
        dto.setAdresse(association.getAdresse());
        dto.setDescription(association.getDescription());
        dto.setDateInscription(association.getDateInscription()); // Utiliser setDateInscription avec l'objet LocalDateTime
        dto.setApproved(association.getIsApproved());
        
        // Ajouter les informations du responsable si disponible
        if (association.getUser() != null) {
            dto.setNomResponsable(association.getUser().getName());
            dto.setPrenomResponsable(""); // Valeur par défaut
        }
        return dto;
    }
}
