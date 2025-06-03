package com.benevol.config;

import com.benevol.model.User;
import com.benevol.model.UserRole;

import com.benevol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByEmail("admin@benevol.com").isEmpty()) {
            User admin = new User();
            admin.setEmail("admin@benevol.com");
            admin.setPassword(passwordEncoder.encode("admin123")); // mot de passe chiffré
            admin.setRole(UserRole.ADMIN); // ou simplement "ADMIN" si Role est String
            admin.setName("Super Admin");

            userRepository.save(admin);
            System.out.println("✅ Admin créé : admin@benevol.com / admin123");
        } else {
            System.out.println("ℹ️ Admin déjà existant.");
        }
    }
}
