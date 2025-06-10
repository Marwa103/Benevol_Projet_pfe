
package com.benevol.controller;

import com.benevol.dto.association.AssociationDto;
import com.benevol.dto.association.AssociationResponseDto;
import com.benevol.dto.association.AidRequestDto;
import com.benevol.dto.association.CreateAidRequestDto;
import com.benevol.model.Association;
import com.benevol.service.AssociationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/association")
@CrossOrigin(origins = "*")
public class AssociationController {

    @Autowired
    private AssociationService associationService;
    
    @GetMapping("/all")
    public ResponseEntity<List<AssociationResponseDto>> getAssociations() {
        List<AssociationDto> associations = associationService.getAllAssociations();
        List<AssociationResponseDto> responseList = associations.stream()
            .map(AssociationResponseDto::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssociationResponseDto> getAssociationById(@PathVariable String id) {
        AssociationDto association = associationService.getAssociationById(id);
        return ResponseEntity.ok(new AssociationResponseDto(association));
    }

    @PostMapping("/aid-request")
    @PreAuthorize("hasRole('ASSOCIATION')")
    public ResponseEntity<AidRequestDto> createAidRequest(
            @Valid @RequestBody CreateAidRequestDto createAidRequestDto,
            Principal principal) {
        AidRequestDto aidRequest = associationService.createAidRequest(createAidRequestDto, principal.getName());
        return ResponseEntity.ok(aidRequest);
    }

    @GetMapping("/aid-requests")
    @PreAuthorize("hasRole('ASSOCIATION')")
    public ResponseEntity<List<AidRequestDto>> getMyAidRequests(Principal principal) {
        List<AidRequestDto> aidRequests = associationService.getAidRequestsByAssociation(principal.getName());
        return ResponseEntity.ok(aidRequests);
    }

    @GetMapping("/aid-requests/all")
    @PreAuthorize("hasRole('ACCOUNTANT') or hasRole('ADMIN')")
    public ResponseEntity<List<AidRequestDto>> getAllAidRequests() {
        List<AidRequestDto> aidRequests = associationService.getAllAidRequests();
        return ResponseEntity.ok(aidRequests);
    }

    @PutMapping("/aid-request/{id}/approve")
    @PreAuthorize("hasRole('ACCOUNTANT') or hasRole('ADMIN')")
    public ResponseEntity<AidRequestDto> approveAidRequest(@PathVariable String id) {
        AidRequestDto aidRequest = associationService.approveAidRequest(id);
        return ResponseEntity.ok(aidRequest);
    }

    @PutMapping("/aid-request/{id}/reject")
    @PreAuthorize("hasRole('ACCOUNTANT') or hasRole('ADMIN')")
    public ResponseEntity<AidRequestDto> rejectAidRequest(@PathVariable String id) {
        AidRequestDto aidRequest = associationService.rejectAidRequest(id);
        return ResponseEntity.ok(aidRequest);
    }
    
    @GetMapping("/approved")
    public ResponseEntity<List<AssociationResponseDto>> getAllAssociations() {
        List<AssociationDto> associations = associationService.getAllApprovedAssociations();
        List<AssociationResponseDto> responseList = associations.stream()
            .map(AssociationResponseDto::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(responseList);
    }
    
    @PutMapping("/approuver/{id}")
    public ResponseEntity<Association> approuverDemande(@PathVariable String id) {
    	Association association = associationService.approuverDemande(id);
        return ResponseEntity.ok(association);
    }
}
