
package com.benevol.controller;

import com.benevol.dto.caravane.CaravaneDto;
import com.benevol.dto.caravane.CaravaneStatsDto;
import com.benevol.dto.caravane.CreateCaravaneDto;
import com.benevol.service.CaravaneService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/caravane")
@CrossOrigin(origins = "http://localhost:5173")
public class CaravaneController {

    @Autowired
    private CaravaneService caravaneService;

    @GetMapping("/all")
    public ResponseEntity<List<CaravaneDto>> getAllCaravanes() {
        List<CaravaneDto> caravanes = caravaneService.getAllCaravanes();
        return ResponseEntity.ok(caravanes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CaravaneDto> getCaravaneById(@PathVariable String id) {
        CaravaneDto caravane = caravaneService.getCaravaneById(id);
        return ResponseEntity.ok(caravane);
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ANIMATOR') or hasRole('ADMIN')")
    public ResponseEntity<CaravaneDto> createCaravane(@Valid @RequestBody CreateCaravaneDto createCaravaneDto) {
        CaravaneDto caravane = caravaneService.createCaravane(createCaravaneDto);
        return ResponseEntity.ok(caravane);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ANIMATOR') or hasRole('ADMIN')")
    public ResponseEntity<CaravaneDto> updateCaravane(
            @PathVariable String id,
            @Valid @RequestBody CreateCaravaneDto updateCaravaneDto) {
        CaravaneDto caravane = caravaneService.updateCaravane(id, updateCaravaneDto);
        return ResponseEntity.ok(caravane);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ANIMATOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCaravane(@PathVariable String id) {
        caravaneService.deleteCaravane(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/participate")
    @PreAuthorize("hasRole('ASSOCIATION')")
    public ResponseEntity<Void> participateInCaravane(@PathVariable String id) {
        caravaneService.participateInCaravane(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/actives-ou-planifiees")
    public ResponseEntity<List<CaravaneDto>> getCaravanesActivesOuPlanifiees() {
        List<CaravaneDto> caravanes = caravaneService.getCaravanesByStatut("EN_COURS", "PLANIFIEE");
        return ResponseEntity.ok(caravanes);
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ANIMATOR') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> getStats() {
        return ResponseEntity.ok(caravaneService.getCaravaneStats());
    }

}
