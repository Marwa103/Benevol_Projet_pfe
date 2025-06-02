package com.benevol.controller;

import com.benevol.dto.publication.CreatePublicationDto;
import com.benevol.dto.publication.PublicationDto;
import com.benevol.service.PublicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publication")
@CrossOrigin(origins = "http://localhost:5173")
public class PublicationController {

    @Autowired
    private PublicationService service;

    @GetMapping("/all")
    public ResponseEntity<List<PublicationDto>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ANIMATOR') or hasRole('ADMIN')")
    public ResponseEntity<PublicationDto> create(@Valid @RequestBody CreatePublicationDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ANIMATOR') or hasRole('ADMIN')")
    public ResponseEntity<PublicationDto> update(@PathVariable String id, @Valid @RequestBody CreatePublicationDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ANIMATOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
