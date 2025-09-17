import { Document } from 'mongoose';

export enum UserRole {
  USER = 'user',
  COMMUNITY_LEAD = 'community_lead',
  CLUB_LEAD = 'club_lead',
  CLUB_MEMBER = 'club_member',
  ADMIN = 'admin'
}

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isEmailVerified: boolean;
  profilePicture?: string;
  bio?: string;
  phone?: string;
  dateOfBirth?: Date;
  
  // Community and Club associations
  communityId?: string;
  clubId?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  
  // Account status
  isActive: boolean;
  isBlocked: boolean;
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
  getPublicProfile(): Partial<IUser>;
}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
  getPublicProfile(): Partial<IUser>;
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
    user: Partial<IUser>;
    token: string;
  };
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}