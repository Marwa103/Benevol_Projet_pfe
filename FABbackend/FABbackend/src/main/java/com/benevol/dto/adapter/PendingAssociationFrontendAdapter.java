package com.benevol.dto.adapter;

import com.benevol.dto.admin.PendingAssociationDto;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Classe adaptateur pour convertir les PendingAssociationDto au format attendu par le frontend
 */
public class PendingAssociationFrontendAdapter {
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;
    
    /**
     * Convertit un PendingAssociationDto au format attendu par le frontend
     * @param pendingAssociation L'association en attente au format backend
     * @return Map avec les propriu00e9tu00e9s au format attendu par le frontend
     */
    public static Map<String, Object> adapt(PendingAssociationDto pendingAssociation) {
        Map<String, Object> frontendAssociation = new HashMap<>();
        
        frontendAssociation.put("id", pendingAssociation.getId());
        frontendAssociation.put("name", pendingAssociation.getNom()); // nom -> name
        frontendAssociation.put("email", pendingAssociation.getEmail());
        frontendAssociation.put("city", pendingAssociation.getVille()); // ville -> city
        frontendAssociation.put("registrationDate", 
                pendingAssociation.getDateInscription() != null 
                ? pendingAssociation.getDateInscription().format(DATE_FORMATTER) 
                : null); // dateInscription -> registrationDate
        
        return frontendAssociation;
    }
    
    /**
     * Convertit une liste de PendingAssociationDto au format attendu par le frontend
     * @param pendingAssociations Liste d'associations en attente au format backend
     * @return Liste de Maps avec les propriu00e9tu00e9s au format attendu par le frontend
     */
    public static List<Map<String, Object>> adaptList(List<PendingAssociationDto> pendingAssociations) {
        return pendingAssociations.stream()
                .map(PendingAssociationFrontendAdapter::adapt)
                .collect(Collectors.toList());
    }
}
