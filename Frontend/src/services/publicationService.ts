import apiService from './apiService';
import { Publication } from '@/utils/types';

const BASE_URL = '/publication';

export const getAllPublications = async (): Promise<Publication[]> => {
  return await apiService.get(`${BASE_URL}/all`);
};

export const createPublication = async (data: Partial<Publication>): Promise<Publication> => {
  return await apiService.post(`${BASE_URL}/create`, data);
};

export const updatePublication = async (id: string, data: Partial<Publication>): Promise<Publication> => {
  return await apiService.put(`${BASE_URL}/${id}`, data);
};

export const deletePublication = async (id: string): Promise<void> => {
  await apiService.delete(`${BASE_URL}/${id}`);
};


