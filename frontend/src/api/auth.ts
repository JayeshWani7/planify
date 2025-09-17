import { api, ApiResponse } from './client';
import {
  LoginCredentials,
  RegisterData,
  User,
  UpdateProfileData,
  ChangePasswordData,
} from '@/types/auth.types';

export const authApi = {
  // Register new user
  register: (data: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> => {
    return api.post<{ user: User; token: string }>('/auth/register', data);
  },

  // Login user
  login: (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> => {
    return api.post<{ user: User; token: string }>('/auth/login', credentials);
  },

  // Get current user profile
  getProfile: (): Promise<ApiResponse<{ user: User }>> => {
    return api.get<{ user: User }>('/auth/profile');
  },

  // Update user profile
  updateProfile: (data: UpdateProfileData): Promise<ApiResponse<{ user: User }>> => {
    return api.put<{ user: User }>('/auth/profile', data);
  },

  // Change password
  changePassword: (data: ChangePasswordData): Promise<ApiResponse<any>> => {
    return api.put<any>('/auth/change-password', {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  },

  // Logout user
  logout: (): Promise<ApiResponse<any>> => {
    return api.post<any>('/auth/logout');
  },

  // Delete user account
  deleteAccount: (): Promise<ApiResponse<any>> => {
    return api.delete<any>('/auth/account');
  },

  // Verify token (check if user is still authenticated)
  verifyToken: (): Promise<ApiResponse<{ user: User }>> => {
    return api.get<{ user: User }>('/auth/profile');
  },
};

export default authApi;