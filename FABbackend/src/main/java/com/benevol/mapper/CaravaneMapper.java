
package com.benevol.mapper;

import com.benevol.dto.caravane.CaravaneDto;
import com.benevol.dto.caravane.CreateCaravaneDto;
import com.benevol.model.Caravane;
import org.springframework.stereotype.Component;

@Component
public class CaravaneMapper {

    public CaravaneDto toDto(Caravane caravane) {
        if (caravane == null) {
            return null;
        }
        CaravaneDto dto = new CaravaneDto();
        dto.setId(caravane.getId());
        dto.setTitre(caravane.getTitre());
        dto.setDescription(caravane.getDescription());
        dto.setAdresse(caravane.getAdresse());
        dto.setLatitude(caravane.getLatitude());
        dto.setLongitude(caravane.getLongitude());
        dto.setDateDebut(caravane.getDateDebut());
        dto.setDateFin(caravane.getDateFin());
        dto.setOrganisateur(caravane.getOrganisateur());
        dto.setStatut(caravane.getStatut());
//        dto.setServicesOfferts(caravane.getServicesOfferts());
        dto.setNombreParticipants(caravane.getParticipations().size());
        dto.setDateCreation(caravane.getDateCreation());
        dto.setDateModification(caravane.getDateModification());
        return dto;
    }

    public Caravane toEntity(CreateCaravaneDto createDto) {
        if (createDto == null) {
            return null;
        }
        Caravane caravane = new Caravane();
        caravane.setTitre(createDto.getTitre());
        caravane.setDescription(createDto.getDescription());
        caravane.setAdresse(createDto.getAdresse());
        caravane.setLatitude(createDto.getLatitude());
        caravane.setLongitude(createDto.getLongitude());
        caravane.setDateDebut(createDto.getDateDebut());
        caravane.setDateFin(createDto.getDateFin());
        caravane.setOrganisateur(createDto.getOrganisateur());
//        caravane.setServicesOfferts(createDto.getServicesOfferts());
        return caravane;
    }

    public void updateEntityFromDto(Caravane caravane, CreateCaravaneDto updateDto) {
        if (caravane != null && updateDto != null) {
            caravane.setTitre(updateDto.getTitre());
            caravane.setDescription(updateDto.getDescription());
            caravane.setAdresse(updateDto.getAdresse());
            caravane.setLatitude(updateDto.getLatitude());
            caravane.setLongitude(updateDto.getLongitude());
            caravane.setDateDebut(updateDto.getDateDebut());
            caravane.setDateFin(updateDto.getDateFin());
            caravane.setOrganisateur(updateDto.getOrganisateur());
//            caravane.setServicesOfferts(updateDto.getServicesOfferts());
        }
    }
}
