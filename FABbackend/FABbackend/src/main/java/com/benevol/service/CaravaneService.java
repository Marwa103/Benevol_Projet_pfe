
package com.benevol.service;

import com.benevol.dto.caravane.CaravaneDto;
import com.benevol.dto.caravane.CaravaneStatsDto;
import com.benevol.dto.caravane.CreateCaravaneDto;
import com.benevol.mapper.CaravaneMapper;
import com.benevol.model.Caravane;
import com.benevol.model.ParticipationCaravane;
import com.benevol.model.StatutCaravane;
import com.benevol.model.StatutParticipation;
import com.benevol.repository.CaravaneRepository;
import com.benevol.repository.ParticipationCaravaneRepository;
import com.benevol.repository.AssociationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class CaravaneService {

    @Autowired
    private CaravaneRepository caravaneRepository;

    @Autowired
    private ParticipationCaravaneRepository participationRepository;

    @Autowired
    private AssociationRepository associationRepository;

    @Autowired
    private CaravaneMapper caravaneMapper;

    public List<CaravaneDto> getAllCaravanes() {
        List<Caravane> caravanes = caravaneRepository.findByOrderByDateDebutDesc();
        return caravanes.stream()
            .map(caravaneMapper::toDto)
            .collect(Collectors.toList());
    }

    public CaravaneDto getCaravaneById(String id) {
        Caravane caravane = caravaneRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Caravane non trouvée"));
        return caravaneMapper.toDto(caravane);
    }

    public CaravaneDto createCaravane(CreateCaravaneDto createDto) {
        Caravane caravane = caravaneMapper.toEntity(createDto);
        caravane.setId(UUID.randomUUID().toString());
        caravane.setStatut(StatutCaravane.PLANNED);
        caravane.setDateCreation(LocalDateTime.now());

        Caravane savedCaravane = caravaneRepository.save(caravane);
        return caravaneMapper.toDto(savedCaravane);
    }

    public CaravaneDto updateCaravane(String id, CreateCaravaneDto updateDto) {
        Caravane caravane = caravaneRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Caravane non trouvée"));

        caravaneMapper.updateEntityFromDto(caravane, updateDto);
        caravane.setDateModification(LocalDateTime.now());

        Caravane savedCaravane = caravaneRepository.save(caravane);
        return caravaneMapper.toDto(savedCaravane);
    }

    public void deleteCaravane(String id) {
        Caravane caravane = caravaneRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Caravane non trouvée"));

        // Supprimer toutes les participations associées
        List<ParticipationCaravane> participations = participationRepository.findByCaravaneId(id);
        participationRepository.deleteAll(participations);

        caravaneRepository.delete(caravane);
    }

    public void participateInCaravane(String caravaneId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        // Trouver l'association de l'utilisateur connecté
        var association = associationRepository.findByUserEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("Association non trouvée pour cet utilisateur"));

        // Vérifier si l'association participe déjà
        var existingParticipation = participationRepository
            .findByCaravaneIdAndAssociationId(caravaneId, association.getId());

        if (existingParticipation.isPresent()) {
            throw new RuntimeException("Votre association participe déjà à cette caravane");
        }

        // Créer la participation
        ParticipationCaravane participation = new ParticipationCaravane();
        participation.setId(UUID.randomUUID().toString());
        
        // Charger les entités pour établir les relations
        Caravane caravane = caravaneRepository.findById(caravaneId)
            .orElseThrow(() -> new RuntimeException("Caravane non trouvée"));
        
        participation.setCaravane(caravane);
        participation.setAssociation(association);
        participation.setStatut(StatutParticipation.PENDING);
        participation.setDateInscription(LocalDateTime.now());

        participationRepository.save(participation);
    }
    public List<CaravaneDto> getCaravanesByStatut(String... statuts) {
        List<StatutCaravane> statutList = new java.util.ArrayList<>();
        for (String s : statuts) {
            try {
                statutList.add(StatutCaravane.valueOf(s));
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Statut invalide : " + s);
            }
        }

        List<Caravane> caravanes = caravaneRepository.findByStatutIn(statutList);
        return caravanes.stream()
                .map(caravaneMapper::toDto)
                .collect(Collectors.toList());
    }

    public Map<String, Long> getCaravaneStats() {
        long active = caravaneRepository.countByStatut(StatutCaravane.ACTIVE);
        long planned = caravaneRepository.countByStatut(StatutCaravane.PLANNED);
        long completed = caravaneRepository.countByStatut(StatutCaravane.COMPLETED);
        long associations = participationRepository.countDistinctAssociationBy();

        return Map.of(
                "active", active,
                "planned", planned,
                "completed", completed,
                "participatingAssociations", associations
        );
    }



}
