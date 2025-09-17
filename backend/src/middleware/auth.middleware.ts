import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { User } from '@/models/User.model';
import { AuthenticatedRequest } from '@/types/common.types';
import { JwtPayload, UserRole } from '@/types/user.types';
import { config } from '@/config/env.config';
import { AppError } from '@/utils/AppError';

/**
 * Middleware to authenticate user using JWT token
 */
export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Access token is required', 401);
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new AppError('Access token is required', 401);
    }

    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    
    // Find user and check if still exists
    const user = await User.findById(decoded.userId).select('+password');
    
    if (!user) {
      throw new AppError('User associated with this token no longer exists', 401);
    }

    // Check if user is active
    if (!user.isActive) {
      throw new AppError('Your account has been deactivated', 401);
    }

    // Check if user is blocked
    if (user.isBlocked) {
      throw new AppError('Your account has been blocked', 401);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Attach user to request object
    req.user = user;
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid token', 401));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError('Token has expired', 401));
    }
    next(error);
  }
};

/**
 * Middleware to authorize user based on roles
 */
export const authorize = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to access this resource', 403));
    }

    next();
  };
};

/**
 * Optional authentication middleware - doesn't throw error if no token
 */
export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    const user = await User.findById(decoded.userId);
    
    if (user && user.isActive && !user.isBlocked) {
      req.user = user;
    }
    
    next();
  } catch (error) {
    // Silently continue without authentication
    next();
  }
};

/**
 * Middleware to check if user owns the resource or has admin privileges
 */
export const authorizeResourceOwner = (resourceUserIdField: string = 'userId') => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
    
    // Allow if user is admin or owns the resource
    if (req.user.role === UserRole.ADMIN || req.user._id.toString() === resourceUserId) {
      return next();
    }

    return next(new AppError('You can only access your own resources', 403));
  };
};