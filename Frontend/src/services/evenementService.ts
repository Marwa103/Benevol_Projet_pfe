import apiService from "./apiService";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export interface EvenementDto {
  id: string;
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  statut: 'PLANIFIE' | 'EN_COURS' | 'TERMINE' | 'ANNULE';
  capaciteMax: number;
  nbParticipants: number;
  dateCreation: string;
}

export interface CreateEvenementDto {
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  capaciteMax: number;
  organisateur: string; // Champ obligatoire exigu00e9 par le backend
}

class EvenementService {
  async getAllEvenements(): Promise<EvenementDto[]> {
    try {
      return await apiService.get<EvenementDto[]>(API_ENDPOINTS.EVENEMENT.ALL);
    } catch (error) {
      console.error('Error fetching evenements:', error);
      throw error;
    }
  }

  async getEvenementById(id: string): Promise<EvenementDto> {
    try {
      return await apiService.get<EvenementDto>(API_ENDPOINTS.EVENEMENT.DETAIL(id));
    } catch (error) {
      console.error('Error fetching evenement:', error);
      throw error;
    }
  }

  async createEvenement(data: CreateEvenementDto): Promise<EvenementDto> {
    try {
      // Simple, comme pour les dons qui fonctionnent
      return await apiService.post<EvenementDto>(API_ENDPOINTS.EVENEMENT.CREATE, data);
    } catch (error) {
      console.error('Error creating evenement:', error);
      throw error;
    }
  }

  async updateEvenement(id: string, data: CreateEvenementDto): Promise<EvenementDto> {
    try {
      // Simple, comme pour les dons qui fonctionnent
      console.log('Mise à jour événement:', id, JSON.stringify(data));
      return await apiService.put<EvenementDto>(API_ENDPOINTS.EVENEMENT.UPDATE(id), data);
    } catch (error) {
      console.error('Error updating evenement:', error);
      throw error;
    }
  }

  async deleteEvenement(id: string): Promise<void> {
    try {
      // Simple, comme pour les dons qui fonctionnent
      console.log('Suppression événement:', id);
      await apiService.delete(API_ENDPOINTS.EVENEMENT.DELETE(id));
    } catch (error) {
      console.error('Error deleting evenement:', error);
      throw error;
    }
  }
}

export const evenementService = new EvenementService();
export default evenementService;