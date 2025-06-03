import axios from 'axios';
import apiService from './apiService';
import { API_ENDPOINTS } from '@/utils/apiConfig';
import { StockItem } from '@/utils/types';

interface AdminStatistics {
  totalAssociations: number;
  pendingRequests: number;
  totalDonations: number;
  pendingHelpRequests: number;
}

interface PendingAssociation {
  id: string;
  name: string;
  email: string;
  city: string;
  registrationDate: string;
}

interface DonationData {
  id: string;
  montant: number;
  dateCreation: string;
  nomDonateur: string;
  status: string;
}

// Pas besoin de redéfinir l'URL ici, on utilise API_ENDPOINTS
export const getAdminStatistics = async (): Promise<AdminStatistics> => {
  try {
    const response = await apiService.get<AdminStatistics>(`${API_ENDPOINTS.ADMIN.STATISTICS}`, {});
    return response;
  } catch (error) {
    console.error('Error fetching admin statistics:', error);
    // Return default values in case of error
    return {
      totalAssociations: 0,
      pendingRequests: 0,
      totalDonations: 0,
      pendingHelpRequests: 0
    };
  }
};

export const getPendingAssociations = async (): Promise<PendingAssociation[]> => {
  try {
    const response = await apiService.get<PendingAssociation[]>(`${API_ENDPOINTS.ADMIN.PENDING_ASSOCIATIONS}`, {});
    return response;
  } catch (error) {
    console.error('Error fetching pending associations:', error);
    return [];
  }
};

export const verifyAssociation = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiService.put<{ message?: string }>(`${API_ENDPOINTS.ADMIN.VERIFY_ASSOCIATION}/${id}`, {});
    return {
      success: true,
      message: response.message || 'Association validée avec succès'
    };
  } catch (error: any) {
    console.error('Error verifying association:', error);
    return {
      success: false,
      message: error.message || 'Erreur lors de la validation'
    };
  }
};

// Nouvelles fonctions pour récupérer les informations de stock et de dons
export const getAdminStockItems = async (): Promise<StockItem[]> => {
  try {
    const response = await apiService.get<StockItem[]>(`${API_ENDPOINTS.ADMIN.STOCK}`, {});
    return response;
  } catch (error) {
    console.error('Error fetching stock items:', error);
    return [];
  }
};

export const getAdminDonations = async (): Promise<DonationData[]> => {
  try {
    const response = await apiService.get<DonationData[]>(`${API_ENDPOINTS.ADMIN.DONATIONS}`, {});
    return response;
  } catch (error) {
    console.error('Error fetching donations:', error);
    return [];
  }
};
