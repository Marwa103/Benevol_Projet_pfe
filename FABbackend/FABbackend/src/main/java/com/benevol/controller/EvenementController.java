package com.benevol.controller;

import com.benevol.dto.evenement.EvenementDto;
import com.benevol.dto.evenement.CreateEvenementDto;
import com.benevol.service.EvenementService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evenement")
@CrossOrigin(origins = "http://localhost:8080",
        allowedHeaders = "*",
        exposedHeaders = "Authorization",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class EvenementController {

    @Autowired
    private EvenementService evenementService;

    // Ajout d'un endpoint public pour vérifier l'accessibilité
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("API Evenement is accessible");
    }

    @GetMapping("/all")
    public ResponseEntity<List<EvenementDto>> getAllEvenements() {
        List<EvenementDto> evenements = evenementService.getAllEvenements();
        return ResponseEntity.ok(evenements);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EvenementDto> getEvenementById(@PathVariable String id) {
        EvenementDto evenement = evenementService.getEvenementById(id);
        return ResponseEntity.ok(evenement);
    }
    @PostMapping("/create")
    public ResponseEntity<EvenementDto> createEvenement(
            @Valid @RequestBody CreateEvenementDto dto) {

        System.out.println("Reçu: " + dto.toString()); // Debug 1
        System.out.println("Validation OK, création en cours...");

        EvenementDto result = evenementService.createEvenement(dto);
        return ResponseEntity.ok(result);
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ANIMATOR') or hasRole('ADMIN')")
    public ResponseEntity<EvenementDto> updateEvenement(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String id,
            @Valid @RequestBody CreateEvenementDto updateEvenementDto) {

        EvenementDto evenement = evenementService.updateEvenement(id, updateEvenementDto);
        return ResponseEntity.ok(evenement);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ANIMATOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEvenement(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String id) {

        evenementService.deleteEvenement(id);
        return ResponseEntity.noContent().build();
    }
}