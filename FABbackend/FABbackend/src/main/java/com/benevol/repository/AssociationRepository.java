
package com.benevol.repository;

import com.benevol.model.Association;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssociationRepository extends JpaRepository<Association, String> {
    
    // Trouver une association par l'email de l'utilisateur
    @Query("SELECT a FROM Association a WHERE a.user.email = :email")
    Optional<Association> findByUserEmail(@Param("email") String email);
    
    // Trouver une association par l'ID de l'utilisateur
    @Query("SELECT a FROM Association a WHERE a.user.id = :userId")
    Optional<Association> findByUserId(@Param("userId") String userId);
    
    // Trouver toutes les associations approuvées
    @Query("SELECT a FROM Association a WHERE a.isApproved = true ORDER BY a.dateInscription DESC")
    List<Association> findAllApproved();
    
    // Trouver toutes les associations en attente d'approbation
    @Query("SELECT a FROM Association a WHERE a.isApproved = false ORDER BY a.dateInscription DESC")
    List<Association> findAllPending();
    
    // Trouver une association par email
    Optional<Association> findByEmail(String email);
    
    // Trouver les associations par ville
    List<Association> findByVilleContainingIgnoreCase(String ville);
    
    // Vérifier si une association existe par email
    boolean existsByEmail(String email);
    
    // Compter les associations approuvées
    @Query("SELECT COUNT(a) FROM Association a WHERE a.isApproved = true")
    long countApproved();
    
    // Compter les associations en attente
    @Query("SELECT COUNT(a) FROM Association a WHERE a.isApproved = false")
    long countPending();
}
