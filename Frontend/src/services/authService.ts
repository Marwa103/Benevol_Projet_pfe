
import apiService from "./apiService";
import { API_ENDPOINTS } from "@/utils/apiConfig";
import { User, UserRole } from "@/utils/types";

// Types correspondant à votre backend
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AssociationRegisterRequest extends RegisterRequest {
  associationName: string;
  description: string;
  phone: string;
  address: string;
  city: string;
}

// Réponse d'authentification de votre backend
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    nom: string;
    role: string;
  };
}

class AuthService {
  async login(email: string, password: string): Promise<User> {
    const loginData: LoginRequest = { email, password };

    try {
      // ✅ ici : pas de .data
      const { token, user } = await apiService.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        loginData
      );

      localStorage.setItem('jwtToken', token);

      return {
        id: user.id,
        email: user.email,
        name: user.nom,
        role: this.mapRoleFromBackend(user.role),
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(name: string, email: string, password: string): Promise<User> {
    const registerData: RegisterRequest = { name, email, password };

    try {
      const { token, user } = await apiService.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        registerData
      );

      localStorage.setItem('jwtToken', token);

      return {
        id: user.id,
        email: user.email,
        name: user.nom,
        role: this.mapRoleFromBackend(user.role),
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async registerAssociation(data: AssociationRegisterRequest): Promise<User> {
    try {
      const { token, user } = await apiService.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER_ASSOCIATION,
        data
      );

      localStorage.setItem('jwtToken', token);

      return {
        id: user.id,
        email: user.email,
        name: user.nom,
        role: this.mapRoleFromBackend(user.role),
      };
    } catch (error) {
      console.error('Association registration error:', error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  private mapRoleFromBackend(backendRole: string): UserRole {
    switch (backendRole.toUpperCase()) {
      case 'ADMIN': return UserRole.ADMIN;
      case 'ACCOUNTANT': return UserRole.ACCOUNTANT;
      case 'ANIMATOR': return UserRole.ANIMATOR;
      case 'ASSOCIATION': return UserRole.ASSOCIATION;
      default: return UserRole.VISITOR;
    }
  }
}

export const authService = new AuthService();
export default authService;
