package com.benevol.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benevol.dto.aidrequest.AidRequestDto;
import com.benevol.service.AidRequestService;

@RestController
@RequestMapping("/api/aid-request")
@CrossOrigin(origins = "*")
public class AidRequestController {

    @Autowired
    private AidRequestService service;

    @GetMapping("/all")
    public ResponseEntity<List<AidRequestDto>> getAll() {
        return ResponseEntity.ok(service.getAllAidRequests());
    }
}