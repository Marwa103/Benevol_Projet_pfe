
package com.benevol.mapper;

import com.benevol.dto.association.AssociationDto;
import com.benevol.dto.admin.PendingAssociationDto;
import com.benevol.model.Association;
import org.springframework.stereotype.Component;

@Component
public class AssociationMapper {


    public AssociationDto toDto(Association association) {
        if (association == null) {
            return null;
        }
        
        // Créer et initialiser le DTO avec les valeurs de l'entité
        AssociationDto dto = new AssociationDto();
        dto.setId(association.getId());
        dto.setNom(association.getNom());
        dto.setDescription(association.getDescription());
        dto.setEmail(association.getEmail());
        dto.setTelephone(association.getTelephone());
        dto.setAdresse(association.getAdresse());
        dto.setVille(association.getVille());
        dto.setLogo(association.getLogo());
        dto.setApproved(association.getIsApproved());
        dto.setDateInscription(association.getDateInscription());
        
        // Ajouter les informations du responsable si disponibles
        if (association.getUser() != null) {

            dto.setNomResponsable(association.getUser().getName());
            dto.setPrenomResponsable("") ;
        }
        
        return dto;
    }

    public PendingAssociationDto toPendingDto(Association association) {
        if (association == null) {
            return null;
        }
        PendingAssociationDto dto = new PendingAssociationDto();
        dto.setId(association.getId());
        dto.setNom(association.getNom());
        dto.setEmail(association.getEmail());
        dto.setDescription(association.getDescription());
        dto.setVille(association.getVille());
        dto.setTelephone(association.getTelephone());
        dto.setDateInscription(association.getDateInscription());
        if (association.getUser() != null) {

            dto.setNomResponsable(association.getUser().getName());

            dto.setPrenomResponsable("");
        }
        return dto;
    }
}
