import apiService from "./apiService";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export interface CaravaneDto {
  id: string;
  nom: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  adresse: string;
  latitude?: number;
  longitude?: number;
  statut: 'PLANIFIEE' | 'EN_COURS' | 'TERMINEE' | 'ANNULEE';
  capaciteMax: number;
  nbParticipants: number;
  dateCreation: string;
  version: number;
}

export interface CreateCaravaneDto {
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  adresse: string;
  latitude: number;
  longitude: number;
  capaciteMax: number;
  organisateur: string;
}

class CaravaneService {
  async getAllCaravanes(): Promise<CaravaneDto[]> {
    try {
      return await apiService.get<CaravaneDto[]>(API_ENDPOINTS.CARAVANE.ALL);
    } catch (error) {
      console.error('Error fetching caravanes:', error);
      throw error;
    }
  }

  async getCaravaneById(id: string): Promise<CaravaneDto> {
    try {
      return await apiService.get<CaravaneDto>(API_ENDPOINTS.CARAVANE.DETAIL(id));
    } catch (error) {
      console.error('Error fetching caravane:', error);
      throw error;
    }
  }

  async createCaravane(data: CreateCaravaneDto): Promise<CaravaneDto> {
    try {
      console.log('Création caravane - données envoyées:', JSON.stringify(data));
      if (!data.titre || !data.adresse || !data.lieu || !data.dateDebut || !data.dateFin || !data.organisateur) {
        console.error('Données de caravane incomplètes:', data);
        throw new Error('Données de caravane incomplètes');
      }
      if (typeof data.capaciteMax !== 'number') {
        data.capaciteMax = parseInt(data.capaciteMax as any) || 100;
      }
      if (data.dateDebut && typeof data.dateDebut === 'object') {
        data.dateDebut = (data.dateDebut as Date).toISOString();
      }
      if (data.dateFin && typeof data.dateFin === 'object') {
        data.dateFin = (data.dateFin as Date).toISOString();
      }
      const response = await apiService.post<CaravaneDto>(API_ENDPOINTS.CARAVANE.CREATE, data);
      console.log('Réponse du serveur après création:', response);
      return response;
    } catch (error) {
      console.error('Erreur détaillée lors de la création de la caravane:', error);
      throw error;
    }
  }

  async updateCaravane(id: string, data: CreateCaravaneDto & { version: number }): Promise<CaravaneDto> {
    try {
      console.log('Mise à jour caravane avec version:', id, data.version, JSON.stringify(data));
      if (data.version === undefined) {
        throw new Error('Version manquante pour la mise à jour de la caravane. Verrouillage optimiste impossible.');
      }
      if (typeof data.version !== 'number') {
        data.version = parseInt(data.version as any);
      }
      return await apiService.put<CaravaneDto>(API_ENDPOINTS.CARAVANE.UPDATE(id), data);
    } catch (error: any) {
      console.error('Error updating caravane:', error);
      if (error.toString().includes('StaleObjectStateException') ||
          error.toString().includes('ObjectOptimisticLockingFailureException')) {
        throw new Error('La caravane a été modifiée par un autre utilisateur. Veuillez rafraîchir la page et réessayer.');
      }
      throw error;
    }
  }

  async deleteCaravane(id: string, version?: number): Promise<void> {
    try {
      console.log('Suppression caravane:', id, 'version:', version);
      const url = version !== undefined
        ? `${API_ENDPOINTS.CARAVANE.DELETE(id)}?version=${version}`
        : API_ENDPOINTS.CARAVANE.DELETE(id);
      await apiService.delete(url);
    } catch (error: any) {
      console.error('Error deleting caravane:', error);
      if (error.toString().includes('ObjectOptimisticLockingFailureException') || 
          error.toString().includes('StaleObjectStateException')) {
        throw new Error('La caravane a été modifiée par un autre utilisateur. Veuillez rafraîchir la page et réessayer.');
      }
      throw error;
    }
  }

  async participateInCaravane(id: string): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.CARAVANE.PARTICIPATE(id), {});
    } catch (error) {
      console.error('Error participating in caravane:', error);
      throw error;
    }
  }

  async getPendingParticipationRequests(): Promise<any[]> {
    try {
      return await apiService.get<any[]>(API_ENDPOINTS.CARAVANE.PARTICIPATION_REQUESTS);
    } catch (error) {
      console.error('Erreur lors de la récupération des demandes de participation:', error);
      throw error;
    }
  }
}

export const caravaneService = new CaravaneService();
export default caravaneService;
