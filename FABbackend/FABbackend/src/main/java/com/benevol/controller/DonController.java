package com.benevol.controller;

import com.benevol.dto.don.DonDto;
import com.benevol.dto.don.DonResponseDto;
import com.benevol.dto.don.CreateDonDto;
import com.benevol.service.DonService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/don")
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:5173", "http://127.0.0.1:8080", "http://127.0.0.1:5173"})
public class DonController {

    @Autowired
    private DonService donService;

    @PostMapping("/visitor")
    @PreAuthorize("permitAll()") // Autoriser tous les utilisateurs à faire des dons
    public ResponseEntity<DonResponseDto> createVisitorDon(@Valid @RequestBody CreateDonDto createDonDto) {
        DonDto don = donService.createVisitorDon(createDonDto);
        return ResponseEntity.ok(new DonResponseDto(don));
    }

    @PostMapping("/create")
    public ResponseEntity<DonResponseDto> createDon(@Valid @RequestBody CreateDonDto createDonDto, Authentication authentication) {
        DonDto don = donService.createDon(createDonDto, authentication.getName());
        return ResponseEntity.ok(new DonResponseDto(don));
    }

    @GetMapping("/history")
    @PreAuthorize("hasRole('ACCOUNTANT') or hasRole('ADMIN')")
    public ResponseEntity<List<DonResponseDto>> getDonHistory() {
        List<DonDto> dons = donService.getAllDons();
        List<DonResponseDto> responseList = dons.stream()
                .map(DonResponseDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ACCOUNTANT') or hasRole('ADMIN')")
    public ResponseEntity<DonResponseDto> getDonById(@PathVariable String id) {
        DonDto don = donService.getDonById(id);
        return ResponseEntity.ok(new DonResponseDto(don));
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasRole('ACCOUNTANT') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getDonStatistics() {
        Map<String, Object> stats = donService.getDonStatistics();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/my-donations")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<DonResponseDto>> getMyDonations(Authentication authentication) {
        List<DonDto> dons = donService.getDonationsByUser(authentication.getName());
        List<DonResponseDto> responseList = dons.stream()
                .map(DonResponseDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseList);
    }





}