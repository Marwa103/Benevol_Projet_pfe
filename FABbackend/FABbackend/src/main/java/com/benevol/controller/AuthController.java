
package com.benevol.controller;

import com.benevol.dto.auth.LoginRequestDto;
import com.benevol.dto.auth.RegisterRequestDto;
import com.benevol.dto.auth.AssociationRegisterRequestDto;
import com.benevol.dto.auth.LoginResponseDto;
import com.benevol.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:5173", "http://127.0.0.1:8080", "http://127.0.0.1:5173"})
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto loginRequest) {
        LoginResponseDto response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponseDto> register(@Valid @RequestBody RegisterRequestDto registerRequest) {
        System.out.println("Requête d'inscription reçue: " + registerRequest.getEmail() + ", " + registerRequest.getName());
        try {
            LoginResponseDto response = authService.register(registerRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Erreur lors de l'inscription: " + e.getMessage());
            throw e;
        }
    }

    @PostMapping("/register-association")
    public ResponseEntity<LoginResponseDto> registerAssociation(@Valid @RequestBody AssociationRegisterRequestDto registerRequest) {
        LoginResponseDto response = authService.registerAssociation(registerRequest);
        return ResponseEntity.ok(response);
    }
}
