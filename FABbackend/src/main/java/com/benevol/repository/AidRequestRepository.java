
package com.benevol.repository;

import com.benevol.model.AidRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AidRequestRepository extends JpaRepository<AidRequest, String> {

    @Query("SELECT ar FROM AidRequest ar ORDER BY ar.dateDemande DESC")
    List<AidRequest> findAllOrderByDateDemandeDesc();

    @Query("SELECT ar FROM AidRequest ar WHERE ar.association.id = :associationId ORDER BY ar.dateDemande DESC")
    List<AidRequest> findByAssociationIdOrderByDateDemandeDesc(@Param("associationId") String associationId);

    @Query("SELECT ar FROM AidRequest ar WHERE ar.statut = :statut ORDER BY ar.dateDemande DESC")
    List<AidRequest> findByStatutOrderByDateDemandeDesc(@Param("statut") String statut);

    @Query("SELECT COUNT(ar) FROM AidRequest ar WHERE ar.statut = 'PENDING'")
    long countPendingRequests();

    @Query("SELECT COUNT(ar) FROM AidRequest ar WHERE ar.statut = 'APPROVED'")
    long countApprovedRequests();
}
