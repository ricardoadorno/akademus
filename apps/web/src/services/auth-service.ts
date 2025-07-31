import { apiClient } from './api-client';
import type { LoginRequest, RegisterRequest, LoginResponse, AuthResponse, User } from '../types/auth-types';

export const authService = {
  register: (data: RegisterRequest): Promise<AuthResponse> =>
    apiClient.post('/auth/register', data).then(r => r.data),

  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    // First, get the access token
    const loginResponse: LoginResponse = await apiClient.post('/auth/login', credentials).then(r => r.data);
    
    // Store the token in localStorage so the interceptor can use it
    localStorage.setItem('auth_token', loginResponse.access_token);
    
    // Then fetch the user data
    const user: User = await apiClient.get('/auth/profile').then(r => r.data);
    
    return {
      user,
      token: loginResponse.access_token
    };
  },

  getCurrentUser: (): Promise<User> =>
    apiClient.get('/auth/profile').then(r => r.data),

  logout: (): Promise<void> => {
    // Clear the token from localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return apiClient.post('/auth/logout').then(r => r.data);
  },
};
