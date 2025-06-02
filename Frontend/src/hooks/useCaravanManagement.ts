import { useState, useEffect, useCallback } from 'react';
import { Caravan } from '../components/caravans/types';
import { useToast } from '../components/ui/use-toast';
import caravaneService, { CaravaneDto, CreateCaravaneDto } from '../services/caravaneService';
import { useAuth } from './useAuth';

// Fonction pour mapper les données du backend vers le frontend
const mapDtoToCaravan = (dto: CaravaneDto): Caravan => {
  return {
    id: dto.id,
    name: dto.nom, // Interface frontend utilise 'name'
    titre: dto.nom, // Backend utilise 'nom' mais attend 'titre' pour la création
    description: dto.description,
    location: dto.lieu, // Interface frontend utilise 'location'
    lieu: dto.lieu, // Backend utilise 'lieu'
    address: dto.adresse, // Interface frontend utilise 'address'
    adresse: dto.adresse, // Backend utilise 'adresse'
    latitude: dto.latitude || 0,
    longitude: dto.longitude || 0,
    // Formatage des dates pour l'affichage
    date: `${new Date(dto.dateDebut).toLocaleDateString()} - ${new Date(dto.dateFin).toLocaleDateString()}`,
    startDate: new Date(dto.dateDebut),
    endDate: new Date(dto.dateFin),
    dateDebut: dto.dateDebut,
    dateFin: dto.dateFin,
    // Mappage du statut
    status: dto.statut.toLowerCase() === 'en_cours' ? 'active' : 'planned',
    statut: dto.statut,
    capaciteMax: dto.capaciteMax || 100,
    nbParticipants: dto.nbParticipants || 0,
    // Pour l'instant, on n'a pas les services dans le DTO, on le simule avec un tableau vide
    services: [], // Ce champ devrait être rempli avec les données réelles si elles sont disponibles
    associations: 0, // Ce champ devrait être rempli avec les données réelles si elles sont disponibles
    version: dto.version // Important pour le verrouillage optimiste
  };
};

// Fonction pour mapper les données du frontend vers le backend
const mapCaravanToCreateDto = (caravan: Partial<Caravan>, userId: string): CreateCaravaneDto => {
  // Formatter les dates avec l'heure à midi pour éviter les problèmes de timezone
  const formatDateWithNoonTime = (date: Date | undefined): string => {
    if (!date) return new Date().toISOString();
    
    const d = new Date(date);
    // Régler l'heure à midi
    d.setHours(12, 0, 0, 0);
    return d.toISOString();
  };

  console.log('Mapping caravan to DTO:', caravan);
  
  // Utiliser les champs backend si disponibles, sinon utiliser les champs frontend correspondants
  return {
    titre: caravan.titre || caravan.name || '', // Required field
    description: caravan.description || '',
    // Format complet pour LocalDateTime (YYYY-MM-DDThh:mm:ss)
    dateDebut: formatDateWithNoonTime(caravan.startDate),
    dateFin: formatDateWithNoonTime(caravan.endDate),
    lieu: caravan.lieu || caravan.location || '',
    adresse: caravan.adresse || caravan.address || '', // Required field
    latitude: caravan.latitude || 0,
    longitude: caravan.longitude || 0,
    capaciteMax: typeof caravan.capaciteMax === 'number' ? caravan.capaciteMax : 100, // Default value if not provided
    organisateur: userId
  };
};

// Types pour les requêtes de participation
interface ParticipationRequest {
  id: string;
  caravanId: string;
  caravanName: string;
  userId: string;
  userName: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const useCaravanManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [caravans, setCaravans] = useState<Caravan[]>([]);
  const [loading, setLoading] = useState(false);
  const [participationRequests, setParticipationRequests] = useState<ParticipationRequest[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour charger les caravanes depuis l'API
  const fetchCaravans = useCallback(async () => {
    setLoading(true);
    try {
      console.log('Chargement des caravanes depuis l\'API...');
      const caravansData = await caravaneService.getAllCaravanes();
      console.log('Données de caravanes reçues:', caravansData);
      
      const mappedCaravans = caravansData.map(mapDtoToCaravan);
      console.log('Caravanes mappées pour l\'interface:', mappedCaravans);
      
      setCaravans(mappedCaravans);
      setError(null);
    } catch (err) {
      console.error('Erreur détaillée lors du chargement des caravanes:', err);
      setError('Impossible de charger les caravanes');
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les caravanes',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Charger les caravanes au montage du composant
  useEffect(() => {
    console.log('useEffect: Chargement initial des caravanes');
    fetchCaravans();
  }, [fetchCaravans]);
  
  // Forcer un rechargement des caravanes après 2 secondes (pour debug)
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('useEffect: Rechargement forcé des caravanes après délai');
      fetchCaravans();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fonction pour créer ou mettre à jour une caravane
  const handleCreateCaravan = useCallback(async (caravanData: Partial<Caravan>, editingCaravan: Caravan | null = null) => {
    console.log('handleCreateCaravan appelé avec:', caravanData, 'editing:', editingCaravan ? editingCaravan.id : 'nouvelle');
    
    // Vérification du titre minimal pour une caravane (au moins 5 caractères)
    if (caravanData.name && caravanData.name.length < 5) {
      toast({
        title: 'Erreur de validation',
        description: 'Le titre de la caravane doit contenir au moins 5 caractères',
        variant: 'destructive',
      });
      return false;
    }
    
    // Validation des données obligatoires
    if (!caravanData.name || !caravanData.location || !caravanData.startDate || !caravanData.endDate) {
      toast({
        title: 'Erreur',
        description: 'Le titre, le lieu et les dates sont obligatoires',
        variant: 'destructive',
      });
      return false;
    }

    try {
      if (!user || !user.id) {
        toast({
          title: 'Erreur',
          description: 'Vous devez être connecté pour créer une caravane',
          variant: 'destructive',
        });
        return false;
      }

      // Préparation des données à envoyer au backend
      const createDto = mapCaravanToCreateDto(caravanData, user.id);
      console.log('DTO préparé pour l\'API:', createDto);

      let response;
      if (editingCaravan && editingCaravan.id) {
        try {
          // Pour la mise à jour, inclure la version actuelle de la caravane
          response = await caravaneService.updateCaravane(editingCaravan.id, {
            ...createDto,
            version: editingCaravan.version || 0 // Par défaut 0 si version undefined
          });
          
          toast({
            title: 'Succès',
            description: 'Caravane mise à jour avec succès',
            variant: 'default',
          });
        } catch (updateErr: any) {
          console.error('Erreur lors de la mise à jour:', updateErr);
          
          // Si erreur de verrouillage optimiste
          if (updateErr.toString().includes('StaleObjectStateException') ||
              updateErr.toString().includes('ObjectOptimisticLockingFailureException')) {
            toast({
              title: 'Erreur',
              description: 'Cette caravane a été modifiée. Veuillez rafraîchir la page.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Erreur',
              description: 'Impossible de modifier la caravane',
              variant: 'destructive',
            });
          }
          return false;
        }
      } else {
        // Création d'une nouvelle caravane - pas besoin de version
        console.log('Création d\'une nouvelle caravane avec:', createDto);
        response = await caravaneService.createCaravane(createDto);
        
        console.log('Réponse après création:', response);
        toast({
          title: 'Succès',
          description: 'Nouvelle caravane créée avec succès',
          variant: 'default',
        });
      }

      // Mettre à jour la liste des caravanes
      console.log('Rafraîchissement de la liste des caravanes...');
      await fetchCaravans();
      console.log('Liste des caravanes rafraîchie');
      return true;
    } catch (err: any) {
      console.error('Erreur complète lors de la création/modification de la caravane:', err);
      
      // Vérifier si c'est une erreur de verrouillage optimiste
      if (err.toString().includes('ObjectOptimisticLockingFailureException') || 
          err.toString().includes('StaleObjectStateException')) {
        toast({
          title: 'Conflit de version',
          description: 'Cette caravane a été modifiée par un autre utilisateur. Veuillez recharger et réessayer.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Erreur',
          description: 'Impossible de créer/modifier la caravane: ' + (err.message || err.toString()),
          variant: 'destructive',
        });
      }
      return false;
    }
  }, [user, toast, fetchCaravans]);

  // Fonction pour supprimer une caravane
  const handleDeleteCaravan = useCallback(async (id: string) => {
    try {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer cette caravane ?')) {
        try {
          console.log('Tentative de suppression de la caravane:', id);
          // Obtenir la version la plus récente de la caravane avant de la supprimer
          const latestCaravan = await caravaneService.getCaravaneById(id);
          console.log('Caravane récupérée avant suppression:', latestCaravan);
          
          // Vérifier que la version existe
          if (latestCaravan.version === undefined) {
            console.warn('Caravane sans version détectée, risque de conflit de verrouillage optimiste');
          }
          
          // Utiliser la fonction qui accepte la version comme paramètre (ajouter la version)
          await caravaneService.deleteCaravane(id, latestCaravan.version);
          
          // Mettre à jour la liste des caravanes
          console.log('Suppression réussie, rafraîchissement de la liste...');
          await fetchCaravans();
          
          toast({
            title: 'Succès',
            description: 'Caravane supprimée avec succès',
            variant: 'default',
          });
        } catch (deleteErr: any) {
          console.error('Erreur détaillée lors de la suppression de la caravane:', deleteErr);
          
          // Gérer spécifiquement les erreurs de verrouillage optimiste
          if (deleteErr.toString().includes('StaleObjectStateException') ||
              deleteErr.toString().includes('ObjectOptimisticLockingFailureException')) {
            toast({
              title: 'Conflit de version',
              description: 'Cette caravane a été modifiée par un autre utilisateur. Essayez de rafraîchir la page.',
              variant: 'destructive',
            });
            return;
          }
          
          throw deleteErr; // Propager les autres erreurs pour le traitement dans le bloc catch principal
        }
      }
    } catch (err: any) {
      console.error('Erreur globale lors de la suppression de la caravane:', err);
      
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer la caravane: ' + (err.message || err.toString()),
        variant: 'destructive',
      });
    }
  }, [toast, fetchCaravans]);

  // Fonctions pour gérer les requêtes de participation (à implémenter si nécessaire)
  const handleApproveRequest = useCallback(async (requestId: string) => {
    // À implémenter si besoin
    console.log('Approuver la demande', requestId);
  }, []);

  const handleRejectRequest = useCallback(async (requestId: string) => {
    // À implémenter si besoin
    console.log('Rejeter la demande', requestId);
  }, []);

  return {
    caravans,
    participationRequests,
    loading,
    error,
    handleCreateCaravan,
    handleDeleteCaravan,
    handleApproveRequest,
    handleRejectRequest,
    refreshCaravans: fetchCaravans
  };
};