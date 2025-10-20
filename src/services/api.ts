// API Service Layer
// Centralized API configuration and utilities

// Environment configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  enableLogging: import.meta.env.VITE_ENABLE_LOGGING === 'true',
} as const;

// API Response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Custom API Error class
export class ApiException extends Error {
  public readonly status?: number;
  public readonly code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.code = code;
  }
}

// HTTP Methods type
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Request options interface
interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

// Logger utility
const logger = {
  log: (message: string, data?: any) => {
    if (API_CONFIG.enableLogging) {
      console.log(`[API] ${message}`, data || '');
    }
  },
  error: (message: string, error?: any) => {
    if (API_CONFIG.enableLogging) {
      console.error(`[API Error] ${message}`, error || '');
    }
  },
};

// Main API client class
class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  // Set authentication token
  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Remove authentication token
  removeAuthToken() {
    delete this.defaultHeaders['Authorization'];
  }

  // Main request method
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const { method = 'GET', headers = {}, body, timeout = API_CONFIG.timeout } = options;

    // Merge headers
    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };

    // Prepare request configuration
    const config: RequestInit = {
      method,
      headers: requestHeaders,
      signal: AbortSignal.timeout(timeout),
    };

    // Add body for non-GET requests
    if (body && method !== 'GET') {
      config.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    logger.log(`${method} ${url}`, { headers: requestHeaders, body });

    try {
      const response = await fetch(url, config);
      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage = responseData?.message || `HTTP Error: ${response.status}`;
        logger.error(`Request failed: ${method} ${url}`, {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        });
        throw new ApiException(errorMessage, response.status, responseData?.code);
      }

      logger.log(`${method} ${url} - Success`, responseData);
      return responseData;
    } catch (error) {
      if (error instanceof ApiException) {
        throw error;
      }

      // Handle network errors, timeouts, etc.
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      logger.error(`Request failed: ${method} ${url}`, error);
      throw new ApiException(errorMessage);
    }
  }

  // HTTP method helpers
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  async post<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body, headers });
  }

  async put<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body, headers });
  }

  async patch<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body, headers });
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }
}

// Create and export API client instance
export const apiClient = new ApiClient();

// Utility functions for common operations
export const api = {
  // Authentication
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiClient.post('/auth/login', credentials),
    logout: () => apiClient.post('/auth/logout'),
    refreshToken: () => apiClient.post('/auth/refresh'),
  },

  // Groups API
  groups: {
    getAll: () => apiClient.get('/groups'),
    getById: (id: number) => apiClient.get(`/groups/${id}`),
    create: (group: any) => apiClient.post('/groups', group),
    update: (id: number, group: any) => apiClient.put(`/groups/${id}`, group),
    delete: (id: number) => apiClient.delete(`/groups/${id}`),
  },

  // Facilities API
  facilities: {
    getAll: () => apiClient.get('/facilities'),
    getById: (id: number) => apiClient.get(`/facilities/${id}`),
    getByGroupId: (groupId: number) => apiClient.get(`/facilities?groupId=${groupId}`),
    create: (facility: any) => apiClient.post('/facilities', facility),
    update: (id: number, facility: any) => apiClient.put(`/facilities/${id}`, facility),
    delete: (id: number) => apiClient.delete(`/facilities/${id}`),
  },

  // Dashboard API
  dashboard: {
    getStats: () => apiClient.get('/dashboard/stats'),
    getRecentActivities: () => apiClient.get('/dashboard/activities'),
  },
};

// Export types and utilities
export { API_CONFIG };
export type { HttpMethod, RequestOptions };