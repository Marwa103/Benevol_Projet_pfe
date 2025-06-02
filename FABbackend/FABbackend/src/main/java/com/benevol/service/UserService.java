
package com.benevol.service;

import com.benevol.dto.user.UserDto;
import com.benevol.model.User;
import com.benevol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDto getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        return convertToUserDto(user);
    }

    private UserDto convertToUserDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setNom(user.getName()); // Utiliser getName() au lieu de getNom()
        
        // Les propriétés suivantes n'existent pas dans User, utiliser des valeurs par défaut
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
