package com.benevol.config;

import com.benevol.model.User;
import com.benevol.model.UserRole;

import com.benevol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class ComptableInitializr implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByEmail("comptable@benevol.com").isEmpty()) {
            User com = new User();
            com.setEmail("comptable@benevol.com");
            com.setPassword(passwordEncoder.encode("comptable123")); // mot de passe chiffré
           com.setRole(UserRole.ACCOUNTANT); // ou simplement "ADMIN" si Role est String
            com.setName("comptable");

            userRepository.save(com);
            System.out.println("✅ comptable créé : admin@benevol.com / admin123");
        } else {
            System.out.println("ℹ️ comptable déjà existant.");
        }
    }
}
