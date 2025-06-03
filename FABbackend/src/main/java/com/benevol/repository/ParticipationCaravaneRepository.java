
package com.benevol.repository;

import com.benevol.model.ParticipationCaravane;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipationCaravaneRepository extends JpaRepository<ParticipationCaravane, String> {
    List<ParticipationCaravane> findByCaravaneId(String caravaneId);
    List<ParticipationCaravane> findByAssociationId(String associationId);
    Optional<ParticipationCaravane> findByCaravaneIdAndAssociationId(String caravaneId, String associationId);
    @Query("SELECT COUNT(DISTINCT p.association.id) FROM ParticipationCaravane p")
    long countDistinctAssociationBy();

}
