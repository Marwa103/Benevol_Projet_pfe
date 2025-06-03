package com.benevol.service;

import com.benevol.dto.don.DonDto;
import com.benevol.dto.don.CreateDonDto;
import com.benevol.model.Don;
import com.benevol.model.DonItem;
import com.benevol.model.TypeDon;
import com.benevol.repository.DonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class DonService {

    @Autowired
    private DonRepository donRepository;

    public List<DonDto> getAllDons() {
        List<Don> dons = donRepository.findByOrderByDateCreationDesc();
        return dons.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public DonDto getDonById(String id) {
        Don don = donRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Don non trouvé"));
        return convertToDto(don);
    }

    public DonDto createVisitorDon(CreateDonDto createDto) {
        Don don = new Don();
        don.setNomDonateur(createDto.getNomDonateur());
        don.setMontant(createDto.getMontant());
        don.setType(createDto.getTypeDon());
        don.setDateCreation(LocalDateTime.now());
        don.setVisitor(true); // Marquer comme don de visiteur
        don.setEmailDonateur(createDto.getEmailDonateur()); // Sauvegarder l'email si fourni

        // Gérer les items pour les dons matériels
        if (createDto.getTypeDon() == TypeDon.MATERIAL && createDto.getItems() != null) {
            List<DonItem> items = createDto.getItems().stream()
                    .map(itemDto -> {
                        DonItem item = new DonItem();
                        item.setDon(don);  // Association bidirectionnelle
                        item.setNomArticle(itemDto.getNom());
                        item.setQuantite(itemDto.getQuantite());
                        return item;
                    })
                    .collect(Collectors.toList());
            don.setItems(items);
        }

        return convertToDto(donRepository.save(don));
    }

    public DonDto createDon(CreateDonDto createDto, String email) {
        Don don = new Don();
        don.setNomDonateur(createDto.getNomDonateur());
        don.setMontant(createDto.getMontant());
        don.setType(createDto.getTypeDon());
        don.setDateCreation(LocalDateTime.now());
        don.setEmailDonateur(email); // Sauvegarder l'email de l'utilisateur qui fait le don
        don.setVisitor(false); // Marquer comme don d'utilisateur authentifié

        // Gérer les items pour les dons matériels
        if (createDto.getTypeDon() == TypeDon.MATERIAL && createDto.getItems() != null) {
            List<DonItem> items = createDto.getItems().stream()
                    .map(itemDto -> {
                        DonItem item = new DonItem();
                        item.setDon(don);  // Association bidirectionnelle
                        item.setNomArticle(itemDto.getNom());
                        item.setQuantite(itemDto.getQuantite());
                        return item;
                    })
                    .collect(Collectors.toList());
            don.setItems(items);
        }

        Don savedDon = donRepository.save(don);
        return convertToDto(savedDon);
    }

    public void deleteDon(String id) {
        Don don = donRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Don non trouvé"));

        donRepository.delete(don);
    }

    public List<DonDto> getDonationsByUser(String email) {
        List<Don> dons = donRepository.findByEmailDonateurOrderByDateCreationDesc(email);
        return dons.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Map<String, Object> getDonStatistics() {
        Map<String, Object> stats = new HashMap<>();

        Double totalDonations = donRepository.getTotalDonations();
        stats.put("totalMonetary", totalDonations != null ? totalDonations : 0.0);

        List<Don> allDons = donRepository.findAll();
        long materialDonations = allDons.stream()
                .filter(don -> don.getType() == TypeDon.MATERIAL)
                .count();

        stats.put("totalMaterial", materialDonations);
        stats.put("totalDonations", allDons.size());

        // Statistiques mensuelles (simulation)
        stats.put("monthlyDonations", List.of(
                Map.of("month", "Jan", "amount", 15000),
                Map.of("month", "Feb", "amount", 22000),
                Map.of("month", "Mar", "amount", 38000),
                Map.of("month", "Apr", "amount", 75000)
        ));

        return stats;
    }

    private DonDto convertToDto(Don don) {
        DonDto dto = new DonDto();
        dto.setId(don.getId());
        dto.setNomDonateur(don.getNomDonateur());
        dto.setMontant(don.getMontant());
        dto.setTypeDon(don.getType());
        dto.setDateCreation(don.getDateCreation());
        dto.setEmailDonateur(don.getEmailDonateur());

        if (don.getItems() != null && !don.getItems().isEmpty()) {
            dto.setItems(don.getItems().stream()
                    .map(item -> {
                        com.benevol.dto.don.DonItemDto itemDto = new com.benevol.dto.don.DonItemDto();
                        itemDto.setId(item.getId());
                        itemDto.setNom(item.getNomArticle());
                        itemDto.setQuantite(item.getQuantite());
                        itemDto.setUnite(item.getUnite());
                        itemDto.setDescription(item.getDescription());
                        return itemDto;
                    })
                    .collect(Collectors.toList()));
        }

        return dto;
    }
}