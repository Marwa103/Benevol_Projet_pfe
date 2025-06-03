
package com.benevol.repository;

import com.benevol.model.Don;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DonRepository extends JpaRepository<Don, String> {
    List<Don> findByOrderByDateCreationDesc();
    
    List<Don> findByEmailDonateurOrderByDateCreationDesc(String email);
    
    @Query("SELECT SUM(d.montant) FROM Don d")
    Double getTotalDonations();
    
    @Query("SELECT SUM(d.montant) FROM Don d WHERE d.dateCreation >= :startDate")
    Double getTotalDonationsSince(LocalDateTime startDate);

    @Query("SELECT SUM(d.montant) FROM Don d WHERE d.emailDonateur = :email")
    Integer sumMontantByEmailDonateur(String email);

}
