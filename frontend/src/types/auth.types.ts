// User types for frontend
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isEmailVerified: boolean;
  profilePicture?: string;
  bio?: string;
  phone?: string;
  dateOfBirth?: string;
  communityId?: string;
  clubId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  fullName: string;
}

export enum UserRole {
  USER = 'user',
  COMMUNITY_LEAD = 'community_lead',
  CLUB_LEAD = 'club_lead',
  CLUB_MEMBER = 'club_member',
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  phone?: string;
  dateOfBirth?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}