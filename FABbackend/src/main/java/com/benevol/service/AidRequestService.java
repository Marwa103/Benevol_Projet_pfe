
package com.benevol.service;

import com.benevol.dto.aidrequest.AidRequestDto;
import com.benevol.dto.aidrequest.AidRequestItemDto;
import com.benevol.dto.aidrequest.CreateAidRequestDto;
import com.benevol.model.AidRequest;
import com.benevol.model.AidRequestItem;
import com.benevol.model.AidRequestStatus;
import com.benevol.model.StockItem;
import com.benevol.model.User;
import com.benevol.repository.AidRequestRepository;
import com.benevol.repository.AssociationRepository;
import com.benevol.repository.StockItemRepository;
import com.benevol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AidRequestService {

    @Autowired
    private AidRequestRepository aidRequestRepository;

    @Autowired
    private AssociationRepository associationRepository;

    @Autowired
    private StockItemRepository stockItemRepository;

    @Autowired
    private UserRepository userRepository;

    public List<AidRequestDto> getAllAidRequests() {
        // La méthode findByOrderByDateDemandeDesc dans le repository attend un paramètre status
        // Ou bien on peut simplement utiliser findAll() et trier les résultats
        List<AidRequest> aidRequests = aidRequestRepository.findAll();
        return aidRequests.stream()
            .sorted((a1, a2) -> a2.getDateDemande().compareTo(a1.getDateDemande())) // Tri par date de demande décroissante
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    public List<AidRequestDto> getAidRequestsByStatus(String status) {
        // Convertir le String status en enum AidRequestStatus pour la requête
        AidRequestStatus statusEnum = AidRequestStatus.valueOf(status);
        List<AidRequest> aidRequests = aidRequestRepository.findByStatutOrderByDateDemandeDesc(statusEnum.name());
        return aidRequests.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    public List<AidRequestDto> getMyAidRequests() {
        String associationId = getCurrentAssociationId();
        List<AidRequest> aidRequests = aidRequestRepository.findByAssociationIdOrderByDateDemandeDesc(associationId);
        return aidRequests.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    public AidRequestDto getAidRequestById(String id) {
        AidRequest aidRequest = aidRequestRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Demande d'aide non trouvée"));
        return convertToDto(aidRequest);
    }

    public AidRequestDto createAidRequest(CreateAidRequestDto createDto) {
        String associationId = getCurrentAssociationId();

        AidRequest aidRequest = new AidRequest();
        // L'ID sera généré automatiquement par @GeneratedValue(strategy = GenerationType.UUID)
        // Pas besoin de setId manuellement
        
        // Récupérer l'Association complète au lieu de juste l'ID
        var association = associationRepository.findById(associationId)
            .orElseThrow(() -> new RuntimeException("Association non trouvée"));
        aidRequest.setAssociation(association);
        
        // Utiliser l'enum directement, pas le nom comme String
        aidRequest.setStatut(AidRequestStatus.PENDING);
        
        // La date de demande est gérée automatiquement par @CreationTimestamp
        // Pas besoin de setDateDemande manuellement

        // Créer les items de la demande
        if (createDto.getItems() != null && !createDto.getItems().isEmpty()) {
            List<AidRequestItem> items = createDto.getItems().stream()
                .map(itemDto -> {
                    AidRequestItem item = new AidRequestItem();
                    // L'ID sera généré automatiquement
                    // Pas besoin de setId manuellement
                    
                    // À remplacer par la relation directe avec AidRequest
                    item.setAidRequest(aidRequest);
                    
                    // Utiliser le repository pour récupérer le StockItem à partir de son ID
                    StockItem stockItem = stockItemRepository.findById(itemDto.getItemId())
                        .orElseThrow(() -> new RuntimeException("Item de stock non trouvé avec l'ID: " + itemDto.getItemId()));
                    item.setStockItem(stockItem);
                    // Uniformiser la casse: utiliser QuantiteDemandee partout
                    item.setQuantiteDemandee(itemDto.getQuantiteDemandee()); // Corriger la casse
                    return item;
                })
                .collect(Collectors.toList());
            aidRequest.setItems(items);
        }

        AidRequest savedAidRequest = aidRequestRepository.save(aidRequest);
        return convertToDto(savedAidRequest);
    }

    public AidRequestDto updateAidRequestStatus(String id, String status) {
        AidRequest aidRequest = aidRequestRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Demande d'aide non trouvée"));

        // Convertir le String status en enum AidRequestStatus
        AidRequestStatus statusEnum = AidRequestStatus.valueOf(status);
        aidRequest.setStatut(statusEnum);
        aidRequest.setDateReponse(LocalDateTime.now());

        AidRequest savedAidRequest = aidRequestRepository.save(aidRequest);
        return convertToDto(savedAidRequest);
    }

    public void deleteAidRequest(String id) {
        AidRequest aidRequest = aidRequestRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Demande d'aide non trouvée"));

        aidRequestRepository.delete(aidRequest);
    }

    private String getCurrentAssociationId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        // Trouver l'association de l'utilisateur connecté par son email
        var association = associationRepository.findByUserEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("Association non trouvée pour cet utilisateur"));

        return association.getId();
    }

    /**
     * Méthode utilitaire pour récupérer l'ID de l'utilisateur actuellement connecté.
     * Préparée pour utilisation future dans d'autres fonctionnalités.
     * @return L'ID de l'utilisateur connecté
     */
    @SuppressWarnings("unused")
    private String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        // Récupérer l'utilisateur par son email via UserRepository
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        return user.getId();
    }

    private AidRequestDto convertToDto(AidRequest aidRequest) {
        AidRequestDto dto = new AidRequestDto();
        dto.setId(aidRequest.getId());
        
        // S'assurer que l'association n'est pas null avant d'accéder à son ID
        if (aidRequest.getAssociation() != null) {
            dto.setAssociationId(aidRequest.getAssociation().getId());
            
            // Si besoin d'informations supplémentaires sur l'association
            // dto.setAssociationName(aidRequest.getAssociation().getNom());
        }
        
        // S'assurer que le statut n'est pas null avant d'appeler name()
        if (aidRequest.getStatut() != null) {
            dto.setStatut(aidRequest.getStatut().name());
        }
        
        dto.setDateDemande(aidRequest.getDateDemande());
        dto.setDateReponse(aidRequest.getDateReponse());

        if (aidRequest.getItems() != null && !aidRequest.getItems().isEmpty()) {
            dto.setItems(aidRequest.getItems().stream()
                .map(item -> {
                    // Utiliser le nom simple de la classe grâce à l'import ajouté
                    AidRequestItemDto itemDto = new AidRequestItemDto();
                    itemDto.setId(item.getId());
                    
                    // Accéder à l'item de stock via la relation plutôt que des méthodes qui n'existent pas
                    if (item.getStockItem() != null) {
                        itemDto.setItemId(item.getStockItem().getId());
                        itemDto.setItemName(item.getStockItem().getNom());
                    }
                    // Uniformiser la casse: utiliser QuantiteDemandee partout
                    itemDto.setQuantiteDemandee(item.getQuantiteDemandee()); // Corriger la casse
                    return itemDto;
                })
                .collect(Collectors.toList()));
        }

        return dto;
    }
}
