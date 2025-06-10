package com.benevol;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.benevol.model.Association;
import com.benevol.repository.AssociationRepository;
import com.benevol.repository.UserRepository;

@SpringBootApplication
public class BenevolApplication {

	public static void main(String[] args) {
		SpringApplication.run(BenevolApplication.class, args);
	}

	@Bean
    public CommandLineRunner commandLineRunner(UserRepository userRepository, AssociationRepository associationRepository){
        return args -> {
        	for(int i=0; i<5; i++) {        		
        		Association association = new Association();
        		association.setNom("MARWA TEST " + i);
        		association.setDescription("Commencer la description par une accroche vivante. Choisir un point de vue (une description vue par un personnage ou vue de l'ext\u00E9rieur). Ne pas chercher \u00E0 tout d\u00E9crire, mais choisir les \u00E9l\u00E9ments significatifs.");
        		association.setEmail("marwa.test"+i+"@benevol.com");
        		association.setTelephone("+212-0000000000");
        		association.setAdresse("Adresse " + i);
        		association.setVille("Paris 7500"+i);
        		association.setLogo("Logo"+i);
        		association.setIsApproved(false);
        		association.setUser(userRepository.findAll().get(0));
        		associationRepository.save(association);
        	}
        	
        };
    }
}
