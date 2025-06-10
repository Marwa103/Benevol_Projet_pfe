
// Configuration des URLs de l'API
export const API_BASE_URL = 'http://localhost:8081/api'; // Port Spring Boot

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    REGISTER_ASSOCIATION: `${API_BASE_URL}/auth/register-association`,
  },
  // User endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    ME: `${API_BASE_URL}/user/me`,
    EDIT: `${API_BASE_URL}/user/edit`,
  },
  // Caravanes endpoints
  CARAVANE: {
    ALL: `${API_BASE_URL}/caravane/all`,
    ALL_PUBLIC: `${API_BASE_URL}/public/caravane/all`,
    DETAIL: (id: string) => `${API_BASE_URL}/caravane/${id}`,
    CREATE: `${API_BASE_URL}/caravane/create`,
    UPDATE: (id: string) => `${API_BASE_URL}/caravane/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/caravane/${id}`,
    PARTICIPATE: (id: string) => `${API_BASE_URL}/caravane/${id}/participate`,
    PARTICIPATION_REQUESTS: `${API_BASE_URL}/caravane/participations/pending`,
    STATS: `${API_BASE_URL}/caravane/stats`,
  },
  // Evenement endpoints
  EVENEMENT: {
    ALL: `${API_BASE_URL}/evenement/all`,
    DETAIL: (id: string) => `${API_BASE_URL}/evenement/${id}`,
    CREATE: `${API_BASE_URL}/evenement/create`,
    UPDATE: (id: string) => `${API_BASE_URL}/evenement/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/evenement/${id}`,
  },
  // Don endpoints
  DON: {
    CREATE: `${API_BASE_URL}/don/create`,
    HISTORY: `${API_BASE_URL}/don/history`,
    DETAIL: (id: string) => `${API_BASE_URL}/don/${id}`,
    STATISTICS: `${API_BASE_URL}/don/statistics`,
    MY_DONATIONS: `${API_BASE_URL}/don/my-donations`,
  },
  // Aid Request endpoints
  AID_REQUEST: {
    ALL: `${API_BASE_URL}/aid-request/all`,
    MY_REQUESTS: `${API_BASE_URL}/aid-request/my-requests`,
    CREATE: `${API_BASE_URL}/aid-request/create`,
    DETAIL: (id: string) => `${API_BASE_URL}/aid-request/${id}`,
    APPROVE: (id: string) => `${API_BASE_URL}/aid-request/${id}/approve`,
    REJECT: (id: string) => `${API_BASE_URL}/aid-request/${id}/reject`,
    DELETE: (id: string) => `${API_BASE_URL}/aid-request/${id}`,
  },
  // Association endpoints
  ASSOCIATION: {
    ALL: `${API_BASE_URL}/association/all`,
    CREATE: `${API_BASE_URL}/association/aid-request`,
    DETAIL: (id: string) => `${API_BASE_URL}/association/${id}`,
    APPROVED: `${API_BASE_URL}/association/approved`,
    APPROVER: (id: string) => `${API_BASE_URL}/association/approuver/${id}`,
  },
  // Stock endpoints
  STOCK: {
    ALL: `${API_BASE_URL}/stock/all`,
    CREATE: `${API_BASE_URL}/stock/create`,
    UPDATE: (id: string) => `${API_BASE_URL}/stock/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/stock/${id}`,
    LOW_STOCK: `${API_BASE_URL}/stock/low-stock`,
    UPDATE_QUANTITY: (id: string) => `${API_BASE_URL}/stock/${id}/update-quantity`,
  },
  // Admin endpoints
  ADMIN: {
    STATISTICS: `${API_BASE_URL}/admin/statistiques`,
    PENDING_ASSOCIATIONS: `${API_BASE_URL}/admin/associations-pending`,
    VERIFY_ASSOCIATION: `${API_BASE_URL}/admin/valider-association`,
    STOCK: `${API_BASE_URL}/admin/stock`,
    DONATIONS: `${API_BASE_URL}/admin/donations`,
  }
};

// Types d'erreurs API possibles
export enum ApiErrorTypes {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION = 'VALIDATION',
  SERVER_ERROR = 'SERVER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
}

// Structure d'erreur API
export interface ApiError {
  type: ApiErrorTypes;
  message: string;
  details?: Record<string, string[]>;
}
