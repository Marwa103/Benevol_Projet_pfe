package com.benevol.config;

import com.benevol.model.User;
import com.benevol.model.UserRole;

import com.benevol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AnnimatorInitializr implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByEmail("animateur@benevol.com").isEmpty()) {
            User com = new User();
            com.setEmail("animateur@benevol.com");
            com.setPassword(passwordEncoder.encode("animateur123")); // mot de passe chiffré
            com.setRole(UserRole.ANIMATOR); // ou simplement "ADMIN" si Role est String
            com.setName("animateur");

            userRepository.save(com);
            System.out.println("✅ animateur créé : animateur@benevol.com / animateur123");
        } else {
            System.out.println("ℹ️ animateur déjà existant.");
        }
    }
}
