
import apiService from "./apiService";
import { API_ENDPOINTS } from "@/utils/apiConfig";
import { User } from "@/utils/types";

export interface UserProfile {
  id: string;
  email: string;
  nom: string;
  prenom?: string;
  telephone?: string;
  ville?: string;
  adresse?: string;
  role: string;
  dateCreation: string;
  dateModification?: string;
}

class UserService {
  async getProfile(): Promise<UserProfile> {
    try {
      const response = await apiService.get<UserProfile>(
        API_ENDPOINTS.USER.PROFILE
      );
      return response;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<UserProfile> {
    try {
      const response = await apiService.get<UserProfile>(
        `${API_ENDPOINTS.USER.PROFILE}/me`
      );
      return response;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
export default userService;
