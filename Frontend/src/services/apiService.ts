


import { ApiError, ApiErrorTypes } from "@/utils/apiConfig";
// src/services/apiService.ts
import axios from 'axios';


interface ApiRequestOptions {
  headers?: Record<string, string>;
  body?: any;
}

class ApiService {
  private getAuthToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  private getDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = {
        type: ApiErrorTypes.SERVER_ERROR,
        message: 'Une erreur est survenue',
      };

      switch (response.status) {
        case 401:
          error.type = ApiErrorTypes.UNAUTHORIZED;
          error.message = 'Authentification requise';
          // Déconnexion automatique si le token est invalide/expiré
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('beneviolUser');
          break;
        case 403:
          error.type = ApiErrorTypes.FORBIDDEN;
          error.message = 'Accès refusé';
          break;
        case 404:
          error.type = ApiErrorTypes.NOT_FOUND;
          error.message = 'Ressource non trouvée';
          break;
        case 422:
          error.type = ApiErrorTypes.VALIDATION;
          try {
            const errorData = await response.json();
            error.message = errorData.message || 'Erreur de validation';
            error.details = errorData.errors;
          } catch {
            error.message = 'Erreur de validation';
          }
          break;
        case 500:
          error.message = 'Erreur serveur';
          break;
        default:
          error.message = `Erreur HTTP ${response.status}`;
      }

      throw error;
    }

    return await response.json();
  }

  public async get<T>(url: string, options: ApiRequestOptions = {}): Promise<T> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          ...this.getDefaultHeaders(),
          ...options.headers,
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.name === 'TypeError') {
        throw {
          type: ApiErrorTypes.NETWORK_ERROR,
          message: 'Problème de connexion au serveur',
        };
      }
      throw error;
    }
  }

  public async post<T>(url: string, data: any, options: ApiRequestOptions = {}): Promise<T> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...this.getDefaultHeaders(),
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.name === 'TypeError') {
        throw {
          type: ApiErrorTypes.NETWORK_ERROR,
          message: 'Problème de connexion au serveur',
        };
      }
      throw error;
    }
  }

  public async put<T>(url: string, data: any, options: ApiRequestOptions = {}): Promise<T> {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          ...this.getDefaultHeaders(),
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.name === 'TypeError') {
        throw {
          type: ApiErrorTypes.NETWORK_ERROR,
          message: 'Problème de connexion au serveur',
        };
      }
      throw error;
    }
  }

  public async delete<T>(url: string, options: ApiRequestOptions = {}): Promise<T> {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          ...this.getDefaultHeaders(),
          ...options.headers,
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.name === 'TypeError') {
        throw {
          type: ApiErrorTypes.NETWORK_ERROR,
          message: 'Problème de connexion au serveur',
        };
      }
      throw error;
    }
  }
}

export const apiService = new ApiService();
export default apiService;
