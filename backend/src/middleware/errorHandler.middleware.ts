import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from '@/utils/AppError';
import { config } from '@/config/env.config';

/**
 * Middleware to handle validation errors from express-validator
 */
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => ({
      field: error.type === 'field' ? (error as any).path : 'unknown',
      message: error.msg
    }));
    
    throw AppError.validation('Validation failed', formattedErrors);
  }
  
  next();
};

/**
 * Global error handler middleware
 */
export const globalErrorHandler = (
  error: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let err = error;

  // Convert non-AppError to AppError
  if (!(error instanceof AppError)) {
    err = new AppError(
      error.message || 'Internal Server Error',
      500,
      false
    );
  }

  const appError = err as AppError;

  // Log error in development
  if (config.NODE_ENV === 'development') {
    console.error('Error 💥:', error);
  }

  // Handle specific error types
  if (error.name === 'ValidationError') {
    const message = 'Invalid input data';
    err = AppError.validation(message);
  }

  if (error.name === 'CastError') {
    const message = 'Invalid ID format';
    err = AppError.badRequest(message);
  }

  if ((error as any).code === 11000) {
    const field = Object.keys((error as any).keyValue)[0];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    err = AppError.conflict(message);
  }

  // Send error response
  const response = {
    success: false,
    message: appError.message,
    ...(appError.errors && { errors: appError.errors }),
    ...(config.NODE_ENV === 'development' && { stack: error.stack })
  };

  res.status(appError.statusCode).json(response);
};

/**
 * Catch-all middleware for unhandled routes
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = AppError.notFound(`Route ${req.originalUrl} not found`);
  next(error);
};