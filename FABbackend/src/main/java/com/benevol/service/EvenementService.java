
package com.benevol.service;

import com.benevol.dto.evenement.EvenementDto;
import com.benevol.dto.evenement.CreateEvenementDto;
import com.benevol.model.Evenement;
import com.benevol.model.StatutEvenement;
import com.benevol.repository.EvenementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
// Imports LocalDateTime et UUID supprimu00e9s car ils ne sont plus utilisu00e9s

@Service
@Transactional
public class EvenementService {

    @Autowired
    private EvenementRepository evenementRepository;

    public List<EvenementDto> getAllEvenements() {
        List<Evenement> evenements = evenementRepository.findByOrderByDateDebutDesc();
        return evenements.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    public EvenementDto getEvenementById(String id) {
        Evenement evenement = evenementRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Événement non trouvé"));
        return convertToDto(evenement);
    }

    public EvenementDto createEvenement(CreateEvenementDto createDto) {
        Evenement evenement = new Evenement();
        // L'ID sera généré automatiquement par @GeneratedValue
        // Pas besoin de setId manuellement
        
        evenement.setTitre(createDto.getTitre());
        evenement.setDescription(createDto.getDescription());
        evenement.setLieu(createDto.getLieu());
        evenement.setDateDebut(createDto.getDateDebut());
        evenement.setDateFin(createDto.getDateFin());
        evenement.setOrganisateur(createDto.getOrganisateur());
        evenement.setStatut(StatutEvenement.PLANNED); // Utiliser PLANNED au lieu de PLANIFIE qui n'existe pas dans l'enum
        // La date de création est gérée automatiquement par @CreationTimestamp
        // Pas besoin de setDateCreation manuellement

        Evenement savedEvenement = evenementRepository.save(evenement);
        return convertToDto(savedEvenement);
    }

    public EvenementDto updateEvenement(String id, CreateEvenementDto updateDto) {
        Evenement evenement = evenementRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Événement non trouvé"));

        evenement.setTitre(updateDto.getTitre());
        evenement.setDescription(updateDto.getDescription());
        evenement.setLieu(updateDto.getLieu());
        evenement.setDateDebut(updateDto.getDateDebut());
        evenement.setDateFin(updateDto.getDateFin());
        evenement.setOrganisateur(updateDto.getOrganisateur());
        // La date de modification est gérée automatiquement par @UpdateTimestamp
        // Pas besoin de setDateModification manuellement

        Evenement savedEvenement = evenementRepository.save(evenement);
        return convertToDto(savedEvenement);
    }

    public void deleteEvenement(String id) {
        Evenement evenement = evenementRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Événement non trouvé"));

        evenementRepository.delete(evenement);
    }

    private EvenementDto convertToDto(Evenement evenement) {
        EvenementDto dto = new EvenementDto();
        dto.setId(evenement.getId());
        dto.setTitre(evenement.getTitre());
        dto.setDescription(evenement.getDescription());
        dto.setLieu(evenement.getLieu());
        dto.setDateDebut(evenement.getDateDebut());
        dto.setDateFin(evenement.getDateFin());
        dto.setOrganisateur(evenement.getOrganisateur());
        dto.setStatut(evenement.getStatut());
        // Ces dates sont gérées automatiquement par JPA, on les récupère simplement
        // pour les transmettre au DTO
        // Ajouter des vérifications pour éviter les erreurs en cas de dates nulles
        if (evenement.getDateCreation() != null) {
            dto.setDateCreation(evenement.getDateCreation());
        }
        if (evenement.getDateModification() != null) {
            dto.setDateModification(evenement.getDateModification());
        }
        return dto;
    }
}
