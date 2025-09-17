/**
 * Custom Application Error class for handling operational errors
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errors?: any[];

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    errors?: any[]
  ) {
    super(message);
    
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Create a bad request error (400)
   */
  static badRequest(message: string, errors?: any[]): AppError {
    return new AppError(message, 400, true, errors);
  }

  /**
   * Create an unauthorized error (401)
   */
  static unauthorized(message: string = 'Unauthorized access'): AppError {
    return new AppError(message, 401);
  }

  /**
   * Create a forbidden error (403)
   */
  static forbidden(message: string = 'Forbidden access'): AppError {
    return new AppError(message, 403);
  }

  /**
   * Create a not found error (404)
   */
  static notFound(message: string = 'Resource not found'): AppError {
    return new AppError(message, 404);
  }

  /**
   * Create a conflict error (409)
   */
  static conflict(message: string): AppError {
    return new AppError(message, 409);
  }

  /**
   * Create a validation error (422)
   */
  static validation(message: string, errors?: any[]): AppError {
    return new AppError(message, 422, true, errors);
  }

  /**
   * Create an internal server error (500)
   */
  static internal(message: string = 'Internal server error'): AppError {
    return new AppError(message, 500, false);
  }
}

export default AppError;