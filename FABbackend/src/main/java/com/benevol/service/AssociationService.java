package com.benevol.service;

import com.benevol.dto.association.AssociationDto;
import com.benevol.dto.association.RegisterAssociationDto;
import com.benevol.dto.association.AidRequestDto;
import com.benevol.dto.association.CreateAidRequestDto;
import com.benevol.model.Association;
import com.benevol.model.User;
import com.benevol.model.UserRole;
import com.benevol.model.AidRequest;
import com.benevol.model.AidRequestStatus;
import com.benevol.repository.AssociationRepository;
import com.benevol.repository.UserRepository;
import com.benevol.repository.AidRequestRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class AssociationService {

    private final AssociationRepository associationRepository;
    private final UserRepository userRepository;
    private final AidRequestRepository aidRequestRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    public AssociationService(AssociationRepository associationRepository, UserRepository userRepository, AidRequestRepository aidRequestRepository, PasswordEncoder passwordEncoder, JavaMailSender mailSender) {
		this.associationRepository = associationRepository;
		this.userRepository = userRepository;
		this.aidRequestRepository = aidRequestRepository;
		this.passwordEncoder = passwordEncoder;
		this.mailSender = mailSender;
	}

	public List<AssociationDto> getAllAssociations() {
        List<Association> associations = associationRepository.findAll();
        return associations.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    public List<AssociationDto> getAllApprovedAssociations() {
        // Utilisation de la méthode findAllApproved() au lieu de findByIsApproved(true)
        List<Association> associations = associationRepository.findAllApproved();
        return associations.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    public List<AssociationDto> getPendingAssociations() {
        // Utilisation de la méthode findAllPending() au lieu de findByIsApproved(false)
        List<Association> associations = associationRepository.findAllPending();
        return associations.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    public AssociationDto getAssociationById(String id) {
        Association association = associationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Association non trouvée"));
        return convertToDto(association);
    }

    public AssociationDto registerAssociation(RegisterAssociationDto registerDto) {
        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            throw new RuntimeException("Un utilisateur avec cet email existe déjà");
        }

        if (associationRepository.existsByEmail(registerDto.getEmail())) {
            throw new RuntimeException("Une association avec cet email existe déjà");
        }

        // Créer l'utilisateur pour l'association
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getMotDePasse())); // Utilisation de setPassword() au lieu de setMotDePasse()
        user.setName(registerDto.getNom()); // Utilisation de setName() au lieu de setNom()
        // Note: La classe User n'a pas de setPrenom(), setVille(), ni setAdresse() - ces champs sont potentiellement dans un profil séparé
        user.setRole(UserRole.ASSOCIATION);
        user.setDateCreation(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        // Créer l'association
        Association association = new Association();
        association.setId(UUID.randomUUID().toString());
        association.setUser(savedUser); // Utilisation de setUser() au lieu de setUserId()
        association.setNom(registerDto.getNom());
        association.setDescription(registerDto.getDescription());
        association.setEmail(registerDto.getEmail());
        association.setTelephone(registerDto.getTelephone());
        association.setAdresse(registerDto.getAdresse());
        association.setVille(registerDto.getVille());
        association.setIsApproved(false); // En attente d'approbation
        association.setDateInscription(LocalDateTime.now()); // Utilisation de setDateInscription() au lieu de setDateCreation()

        Association savedAssociation = associationRepository.save(association);
        return convertToDto(savedAssociation);
    }

    public AssociationDto approveAssociation(String id) {
        Association association = associationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Association non trouvée"));

        association.setIsApproved(true);
        // La date de modification est automatiquement gérée par @UpdateTimestamp

        Association savedAssociation = associationRepository.save(association);
        return convertToDto(savedAssociation);
    }

    public void deleteAssociation(String id) {
        Association association = associationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Association non trouvée"));

        // Supprimer aussi l'utilisateur associé
        if (association.getUser() != null) {
            userRepository.deleteById(association.getUser().getId());
        }

        associationRepository.delete(association);
    }

    // Méthodes pour les demandes d'aide
    public AidRequestDto createAidRequest(CreateAidRequestDto createDto, String userEmail) {
        // Trouver l'association de l'utilisateur connecté
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        Association association = associationRepository.findByUserId(user.getId())
            .orElseThrow(() -> new RuntimeException("Association non trouvée pour cet utilisateur"));

        AidRequest aidRequest = new AidRequest();
        aidRequest.setId(UUID.randomUUID().toString());
        aidRequest.setAssociation(association); // Utiliser setAssociation au lieu de setAssociationId
        aidRequest.setStatut(AidRequestStatus.PENDING); // Utiliser l'enum directement, pas .name()
        // La date de demande est automatiquement gérée par @CreationTimestamp

        AidRequest savedAidRequest = aidRequestRepository.save(aidRequest);
        return convertToAidRequestDto(savedAidRequest);
    }

    public List<AidRequestDto> getAidRequestsByAssociation(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        Association association = associationRepository.findByUserId(user.getId())
            .orElseThrow(() -> new RuntimeException("Association non trouvée pour cet utilisateur"));

        List<AidRequest> aidRequests = aidRequestRepository.findByAssociationIdOrderByDateDemandeDesc(association.getId());
        return aidRequests.stream()
            .map(this::convertToAidRequestDto)
            .collect(Collectors.toList());
    }

    public List<AidRequestDto> getAllAidRequests() {
        // La méthode findByOrderByDateDemandeDesc dans le repository attend un paramètre status
        // Ou bien on peut simplement utiliser findAll() et trier les résultats
        List<AidRequest> aidRequests = aidRequestRepository.findAll();
        return aidRequests.stream()
            .sorted((a1, a2) -> a2.getDateDemande().compareTo(a1.getDateDemande())) // Tri par date de demande décroissante
            .map(this::convertToAidRequestDto)
            .collect(Collectors.toList());
    }

    public AidRequestDto approveAidRequest(String id) {
        AidRequest aidRequest = aidRequestRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Demande d'aide non trouvée"));

        aidRequest.setStatut(AidRequestStatus.APPROVED); // Utiliser l'enum directement, pas .name()
        aidRequest.setDateReponse(LocalDateTime.now()); // Cette ligne est OK

        AidRequest savedAidRequest = aidRequestRepository.save(aidRequest);
        return convertToAidRequestDto(savedAidRequest);
    }

    public AidRequestDto rejectAidRequest(String id) {
        AidRequest aidRequest = aidRequestRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Demande d'aide non trouvée"));

        aidRequest.setStatut(AidRequestStatus.REJECTED); // Utiliser l'enum directement, pas .name()
        aidRequest.setDateReponse(LocalDateTime.now()); // Cette ligne est OK

        AidRequest savedAidRequest = aidRequestRepository.save(aidRequest);
        return convertToAidRequestDto(savedAidRequest);
    }

    private AssociationDto convertToDto(Association association) {
        AssociationDto dto = new AssociationDto();
        dto.setId(association.getId());
        dto.setNom(association.getNom());
        dto.setDescription(association.getDescription());
        dto.setEmail(association.getEmail());
        dto.setTelephone(association.getTelephone());
        dto.setAdresse(association.getAdresse());
        dto.setVille(association.getVille());
        dto.setLogo(association.getLogo());
        dto.setApproved(association.getIsApproved()); // Utiliser setApproved au lieu de setIsApproved
        dto.setDateInscription(association.getDateInscription()); // Utiliser setDateInscription au lieu de setDateCreation
        
        // Ajouter les informations du responsable si disponibles
        if (association.getUser() != null) {
            dto.setNomResponsable(association.getUser().getName());
            dto.setPrenomResponsable("");
            // Possibilité d'utiliser un mapper pour l'utilisateur si nécessaire
            // dto.setUser(userMapper.toDto(association.getUser()));
        }
        return dto;
    }

    private AidRequestDto convertToAidRequestDto(AidRequest aidRequest) {
        AidRequestDto dto = new AidRequestDto();
        dto.setId(aidRequest.getId());
        
        // Le DTO utilise dateCreation et non dateDemande
        dto.setDateCreation(aidRequest.getDateDemande());
        
        // Le DTO a un champ statut de type AidRequestStatus (enum)
        dto.setStatut(aidRequest.getStatut());
        
        // Le DTO a un champ association de type AssociationDto
        if (aidRequest.getAssociation() != null) {
            dto.setAssociation(convertToDto(aidRequest.getAssociation()));
        }
        
        // Note: Les champs titre, description et quantite ne sont pas dans l'entité AidRequest
        // Ces champs devront peut-être être remplis autrement
        
        return dto;
    }
    
    public Association approuverDemande(String id) {
        Association association = associationRepository.findById(id).get();
        association.setIsApproved(true);
        //envoyerMailConfirmation(association);
        return associationRepository.save(association);
    }

    private void envoyerMailConfirmation(Association association) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("no-reply@benevol.com");
        message.setSubject("Demande Approuvée");
        message.setText("Votre demande avec le nom " + association.getNom() + " a été approuvée.");
        mailSender.send(message);
    }
}
