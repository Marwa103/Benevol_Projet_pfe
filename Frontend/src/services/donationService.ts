


import apiService from "./apiService";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export interface DonItemDto {
  id?: string;
  nom: string;
  quantite: number;
}

export interface CreateDonDto {
  nomDonateur: string;
  montant?: number;
  typeDon: 'MONETARY' | 'MATERIAL';
  items?: DonItemDto[];
}

export interface DonDto {
  id: string;
  nomDonateur: string;
  montant?: number;
  typeDon: 'MONETARY' | 'MATERIAL';
  dateCreation: string;
  items?: DonItemDto[];
}

export interface DonStatistics {
  totalMonetary: number;
  totalMaterial: number;
  totalDonations: number;
  monthlyDonations: Array<{ month: string; amount: number }>;
}

class DonService {
  async createDon(data: CreateDonDto): Promise<DonDto> {
    try {
      return await apiService.post<DonDto>(API_ENDPOINTS.DON.CREATE, data);
    } catch (error) {
      console.error('Error creating donation:', error);
      throw error;
    }
  }

  async getDonHistory(): Promise<DonDto[]> {
    try {
      return await apiService.get<DonDto[]>(API_ENDPOINTS.DON.HISTORY);
    } catch (error) {
      console.error('Error fetching donation history:', error);
      throw error;
    }
  }

  async getMyDonations(): Promise<DonDto[]> {
    try {
      return await apiService.get<DonDto[]>(API_ENDPOINTS.DON.MY_DONATIONS);
    } catch (error) {
      console.error('Error fetching my donations:', error);
      throw error;
    }
  }

  async getDonStatistics(): Promise<DonStatistics> {
    try {
      return await apiService.get<DonStatistics>(API_ENDPOINTS.DON.STATISTICS);
    } catch (error) {
      console.error('Error fetching donation statistics:', error);
      throw error;
    }
  }
}

export const donService = new DonService();
export default donService;
