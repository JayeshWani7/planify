import { Request, Response, NextFunction } from 'express';
import { User } from '@/models/User.model';
import { AuthenticatedRequest } from '@/types/common.types';
import { LoginCredentials, RegisterData, AuthResponse, UserRole } from '@/types/user.types';
import { AppError } from '@/utils/AppError';
import { generateToken } from '@/utils/jwt.utils';

/**
 * Register a new user
 */
export const register = async (
  req: Request<{}, AuthResponse, RegisterData>,
  res: Response<AuthResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, firstName, lastName, role = UserRole.USER } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw AppError.conflict('User with this email already exists');
    }

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      role,
    });

    await user.save();

    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    });

    // Get public profile
    const userProfile = user.getPublicProfile();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userProfile,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
export const login = async (
  req: Request<{}, AuthResponse, LoginCredentials>,
  res: Response<AuthResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user with password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw AppError.unauthorized('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw AppError.unauthorized('Your account has been deactivated');
    }

    // Check if user is blocked
    if (user.isBlocked) {
      throw AppError.unauthorized('Your account has been blocked');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw AppError.unauthorized('Invalid email or password');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    });

    // Get public profile
    const userProfile = user.getPublicProfile();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userProfile,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 */
export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw AppError.unauthorized('Authentication required');
    }

    const userProfile = req.user.getPublicProfile();

    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: { user: userProfile },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw AppError.unauthorized('Authentication required');
    }

    const allowedUpdates = ['firstName', 'lastName', 'bio', 'phone', 'dateOfBirth'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      throw AppError.badRequest('Invalid updates detected');
    }

    // Update user
    Object.assign(req.user, req.body);
    await req.user.save();

    const userProfile = req.user.getPublicProfile();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: userProfile },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Change user password
 */
export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw AppError.unauthorized('Authentication required');
    }

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      throw AppError.notFound('User not found');
    }

    // Check current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      throw AppError.badRequest('Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user account (soft delete)
 */
export const deleteAccount = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw AppError.unauthorized('Authentication required');
    }

    // Soft delete - deactivate account
    req.user.isActive = false;
    await req.user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: 'Account deactivated successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user (client-side token removal)
 */
export const logout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // In a JWT-based system, logout is typically handled client-side
    // by removing the token from storage. However, we can track this server-side
    // for analytics or implement token blacklisting if needed.

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};