
package com.benevol.repository;

import com.benevol.model.Evenement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EvenementRepository extends JpaRepository<Evenement, String> {
    List<Evenement> findByOrderByDateDebutDesc();
    List<Evenement> findByStatut(String statut);
    List<Evenement> findByDateDebutAfter(LocalDateTime date);
}
