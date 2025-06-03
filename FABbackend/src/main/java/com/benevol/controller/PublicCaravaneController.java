
package com.benevol.controller;

import com.benevol.dto.caravane.CaravaneDto;
import com.benevol.service.CaravaneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/public/caravane")
@CrossOrigin(origins = "*")
public class PublicCaravaneController {

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
}
