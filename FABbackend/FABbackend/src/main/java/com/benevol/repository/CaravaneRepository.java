
package com.benevol.repository;

import com.benevol.model.Caravane;
import com.benevol.model.StatutCaravane;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CaravaneRepository extends JpaRepository<Caravane, String> {
    List<Caravane> findByOrderByDateDebutDesc();
    List<Caravane> findByStatut(StatutCaravane statut);
    List<Caravane> findByOrganisateur(String organisateur);
    List<Caravane> findByStatutIn(List<StatutCaravane> statuts);





        // 🔽 Ajoute ces méthodes pour les statistiques :
        long countByStatut(StatutCaravane statut);

}
