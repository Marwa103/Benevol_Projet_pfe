
import apiService from "./apiService";
import { API_ENDPOINTS } from "@/utils/apiConfig";
import { AssociationDto, AidRequestDto, CreateAidRequestDto } from "@/utils/backendTypes";

class AssociationService {
  async getAllAssociations(): Promise<AssociationDto[]> {
    try {
      return await apiService.get<AssociationDto[]>(API_ENDPOINTS.ASSOCIATION.ALL);
    } catch (error) {
      console.error('Error fetching associations:', error);
      throw error;
    }
  }

  async getAssociationById(id: string): Promise<AssociationDto> {
    try {
      return await apiService.get<AssociationDto>(API_ENDPOINTS.ASSOCIATION.DETAIL(id));
    } catch (error) {
      console.error('Error fetching association:', error);
      throw error;
    }
  }

  async createAidRequest(data: CreateAidRequestDto): Promise<AidRequestDto> {
    try {
      return await apiService.post<AidRequestDto>(API_ENDPOINTS.AID_REQUEST.CREATE, data);
    } catch (error) {
      console.error('Error creating aid request:', error);
      throw error;
    }
  }

   async createAssociationAidRequest(data: CreateAidRequestDto): Promise<AidRequestDto> {
    try {
      return await apiService.post<AidRequestDto>(API_ENDPOINTS.ASSOCIATION.CREATE, data);
    } catch (error) {
      console.error('Error creating aid request:', error);
      throw error;
    }
  }

  async getMyAidRequests(): Promise<AidRequestDto[]> {
    try {
      return await apiService.get<AidRequestDto[]>(API_ENDPOINTS.AID_REQUEST.MY_REQUESTS);
    } catch (error) {
      console.error('Error fetching my aid requests:', error);
      throw error;
    }
  }

  async getAllAidRequests(): Promise<AidRequestDto[]> {
    try {
      return await apiService.get<AidRequestDto[]>(API_ENDPOINTS.AID_REQUEST.ALL);
    } catch (error) {
      console.error('Error fetching all aid requests:', error);
      throw error;
    }
  }

  async approveAidRequest(id: string): Promise<AidRequestDto> {
    try {
      return await apiService.put<AidRequestDto>(API_ENDPOINTS.AID_REQUEST.APPROVE(id), {});
    } catch (error) {
      console.error('Error approving aid request:', error);
      throw error;
    }
  }

  async rejectAidRequest(id: string): Promise<AidRequestDto> {
    try {
      return await apiService.put<AidRequestDto>(API_ENDPOINTS.AID_REQUEST.REJECT(id), {});
    } catch (error) {
      console.error('Error rejecting aid request:', error);
      throw error;
    }
  }
}

export const associationService = new AssociationService();
export default associationService;
