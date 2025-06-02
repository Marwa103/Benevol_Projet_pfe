
package com.benevol.service;

import com.benevol.dto.auth.LoginRequestDto;
import com.benevol.dto.auth.RegisterRequestDto;
import com.benevol.dto.auth.AssociationRegisterRequestDto;
import com.benevol.dto.auth.LoginResponseDto;
import com.benevol.model.User;
import com.benevol.model.UserRole;
import com.benevol.repository.UserRepository;
import com.benevol.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Imports supprimu00e9s car ils ne sont plus utilisu00e9s

@Service
@Transactional
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public LoginResponseDto login(LoginRequestDto loginRequest) {
        // Authentifier l'utilisateur
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        // Générer le token JWT
        String token = jwtTokenProvider.generateToken(authentication);

        // Récupérer l'utilisateur
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        LoginResponseDto response = new LoginResponseDto();
        response.setToken(token);
        response.setUser(convertToUserDto(user));

        return response;
    }

    public LoginResponseDto register(RegisterRequestDto registerRequest) {
        System.out.println("Traitement de l'inscription dans le service: " + registerRequest.getEmail());
        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            System.err.println("Échec: Email existe déjà: " + registerRequest.getEmail());
            throw new RuntimeException("Un utilisateur avec cet email existe déjà");
        }

        // Créer le nouvel utilisateur
        User savedUser;
        try {
            User user = new User();
            // L'ID sera généré automatiquement par @GeneratedValue
            // Pas besoin de setId manuellement

            user.setEmail(registerRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Utiliser setPassword au lieu de setMotDePasse
            user.setName(registerRequest.getName()); // Utiliser setName au lieu de setNom
            user.setRole(UserRole.VISITOR); // Par défaut
            // La date de création est gérée automatiquement par @CreationTimestamp
            // Pas besoin de setDateCreation manuellement

            System.out.println("Tentative de sauvegarde de l'utilisateur: " + user.getEmail());
            savedUser = userRepository.save(user);
            System.out.println("Utilisateur sauvegardé avec succès: " + savedUser.getId());
        } catch (Exception e) {
            System.err.println("Erreur lors de la création de l'utilisateur: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }

        // Créer l'authentification et générer le token
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                savedUser.getEmail(),
                registerRequest.getPassword()
        );
        String token = jwtTokenProvider.generateToken(authentication);

        LoginResponseDto response = new LoginResponseDto();
        response.setToken(token);
        response.setUser(convertToUserDto(savedUser));

        return response;
    }

    public LoginResponseDto registerAssociation(AssociationRegisterRequestDto registerRequest) {
        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Un utilisateur avec cet email existe déjà");
        }

        // Créer le nouvel utilisateur association
        User user = new User();
        // L'ID sera généré automatiquement par @GeneratedValue
        // Pas besoin de setId manuellement

        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Utiliser setPassword au lieu de setMotDePasse
        user.setName(registerRequest.getName()); // Utiliser setName au lieu de setNom
        user.setRole(UserRole.ASSOCIATION);
        // La date de création est gérée automatiquement par @CreationTimestamp
        // Pas besoin de setDateCreation manuellement

        User savedUser = userRepository.save(user);

        // Créer l'authentification et générer le token
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                savedUser.getEmail(),
                registerRequest.getPassword()
        );
        String token = jwtTokenProvider.generateToken(authentication);

        LoginResponseDto response = new LoginResponseDto();
        response.setToken(token);
        response.setUser(convertToUserDto(savedUser));

        return response;
    }

    private com.benevol.dto.user.UserDto convertToUserDto(User user) {
        com.benevol.dto.user.UserDto dto = new com.benevol.dto.user.UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setNom(user.getName()); // Utiliser getName() au lieu de getNom()
        // Les propriétés suivantes n'existent pas dans User, on utilise des valeurs par défaut
        dto.setPrenom(""); // User n'a pas de champ prénom
        dto.setTelephone(""); // User n'a pas de champ téléphone
        dto.setVille(""); // User n'a pas de champ ville
        dto.setAdresse(""); // User n'a pas de champ adresse
        dto.setRole(user.getRole());
        dto.setDateCreation(user.getDateCreation());
        dto.setDateModification(user.getDateModification());
        return dto;
    }
}
