import * as Sentry from '@sentry/nextjs';
// Check if logger exists, if not create a simple one
import { logger } from '../logger';

// If logger doesn't exist, you might need to create it:
/*
import { logger } from '../logger';

// Fallback logger if the import fails
const fallbackLogger = {
  error: (data: any) => console.error('[ERROR]', data),
  warn: (data: any) => console.warn('[WARN]', data),
  info: (data: any) => console.info('[INFO]', data),
  debug: (data: any) => console.debug('[DEBUG]', data),
};

// Use the imported logger or fallback
const log = typeof logger !== 'undefined' ? logger : fallbackLogger;
*/

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

/**
 * Error types for categorization
 */
export enum ErrorType {
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  RUNTIME = 'RUNTIME',
  UNKNOWN = 'UNKNOWN'
}

/**
 * Error metadata interface
 */
export interface ErrorMetadata {
  code: string;
  type: ErrorType;
  severity: ErrorSeverity;
  details?: Record<string, unknown>;
}

/**
 * Error context interface
 */
export interface ErrorContext {
  userId?: string;
  requestId?: string;
  timestamp?: Date;
  component?: string;
  action?: string;
  [key: string]: unknown;
}

/**
 * Standardized application error class
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly type: ErrorType;
  public readonly severity: ErrorSeverity;
  public readonly context: ErrorContext;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    metadata: Partial<ErrorMetadata> = {},
    context: ErrorContext = {},
    statusCode = 500
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = metadata.code || 'UNKNOWN_ERROR';
    this.type = metadata.type || ErrorType.UNKNOWN;
    this.severity = metadata.severity || ErrorSeverity.MEDIUM;
    this.details = metadata.details;
    this.context = {
      ...context,
      timestamp: context.timestamp || new Date()
    };
    
    // Ensures proper stack trace in Node.js
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Converts the error to a plain object for logging or serialization
   */
  toJSON() {
    return {
      message: this.message,
      name: this.name,
      code: this.code,
      type: this.type,
      severity: this.severity,
      statusCode: this.statusCode,
      details: this.details,
      context: this.context,
      stack: this.stack
    };
  }
}

/**
 * Validation error class
 */
export class ValidationError extends AppError {
  constructor(
    message = 'Validation Error',
    details: Record<string, unknown> = {},
    context: ErrorContext = {}
  ) {
    super(message, {
      code: 'VALIDATION_ERROR',
      type: ErrorType.VALIDATION,
      severity: ErrorSeverity.MEDIUM,
      details
    }, context, 400);
    this.name = 'ValidationError';
  }
}

/**
 * Authentication error class
 */
export class AuthenticationError extends AppError {
  constructor(
    message = 'Authentication Error',
    context: ErrorContext = {}
  ) {
    super(message, {
      code: 'AUTHENTICATION_ERROR',
      type: ErrorType.AUTHENTICATION,
      severity: ErrorSeverity.HIGH
    }, context, 401);
    this.name = 'AuthenticationError';
  }
}

/**
 * Not found error class
 */
export class NotFoundError extends AppError {
  constructor(
    message = 'Resource Not Found',
    context: ErrorContext = {}
  ) {
    super(message, {
      code: 'NOT_FOUND_ERROR',
      type: ErrorType.NOT_FOUND,
      severity: ErrorSeverity.LOW
    }, context, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Main error handler utility
 */
export class ErrorHandler {
  /**
   * Handles any type of error, standardizing it to AppError
   */
  static async handleError(error: unknown, context: ErrorContext = {}): Promise<AppError> {
    // If it's already an AppError, just log it
    if (error instanceof AppError) {
      await this.logError(error);
      return error;
    }

    // Convert standard Error to AppError
    if (error instanceof Error) {
      const appError = new AppError(
        error.message,
        { severity: ErrorSeverity.HIGH },
        { ...context, originalError: error.name }
      );
      
      // Preserve the original stack trace
      appError.stack = error.stack;
      
      await this.logError(appError);
      return appError;
    }

    // Handle non-Error objects
    const appError = new AppError(
      typeof error === 'string' ? error : 'An unexpected error occurred',
      { severity: ErrorSeverity.HIGH },
      { ...context, originalError: error }
    );
    
    await this.logError(appError);
    return appError;
  }

  /**
   * Logs an error with appropriate severity and sends to Sentry
   */
  static async logError(error: AppError): Promise<void> {
    // Log to console/logger
    const logData = {
      message: error.message,
      code: error.code,
      type: error.type,
      severity: error.severity,
      statusCode: error.statusCode,
      context: error.context,
      stack: error.stack
    };

    logger.error(logData);
    
    // Send to Sentry with appropriate severity
    let sentrySeverity: 'info' | 'warning' | 'error' | 'fatal';
    
    switch (error.severity) {
      case ErrorSeverity.LOW:
        sentrySeverity = 'info';
        break;
      case ErrorSeverity.MEDIUM:
        sentrySeverity = 'warning';
        break;
      case ErrorSeverity.HIGH:
        sentrySeverity = 'error';
        break;
      case ErrorSeverity.CRITICAL:
        sentrySeverity = 'fatal';
        break;
      default:
        sentrySeverity = 'error';
    }
    
    Sentry.withScope((scope) => {
      // Add context data to Sentry scope
      scope.setLevel(sentrySeverity);
      
      if (error.code) {
        scope.setTag('error.code', error.code);
      }
      
      if (error.type) {
        scope.setTag('error.type', error.type);
      }
      
      if (error.context) {
        Object.entries(error.context).forEach(([key, value]) => {
          scope.setContext(key, { value });
        });
      }
      
      if (error.details) {
        scope.setContext('details', error.details);
      }
      
      Sentry.captureException(error);
    });
  }

  /**
   * Logs a warning message
   */
  static async logWarning(message: string, context: ErrorContext = {}): Promise<void> {
    const logData = {
      message,
      context,
      timestamp: new Date().toISOString()
    };
    
    logger.warn(logData);
    
    Sentry.withScope((scope) => {
      scope.setLevel('warning');
      
      if (context) {
        Object.entries(context).forEach(([key, value]) => {
          scope.setContext(key, { value });
        });
      }
      
      Sentry.captureMessage(message, 'warning');
    });
  }

  /**
   * Logs an informational message
   */
  static async logInfo(message: string, context: ErrorContext = {}): Promise<void> {
    const logData = {
      message,
      context,
      timestamp: new Date().toISOString()
    };
    
    logger.info(logData);
    
    // Only send to Sentry if it's important enough
    if (context.reportToSentry) {
      Sentry.withScope((scope) => {
        scope.setLevel('info');
        
        if (context) {
          Object.entries(context).forEach(([key, value]) => {
            scope.setContext(key, { value });
          });
        }
        
        Sentry.captureMessage(message, 'info');
      });
    }
  }

  /**
   * Helper to create a validation error with field-specific details
   */
  static createValidationError(
    message = 'Validation Error',
    fieldErrors: Record<string, string> = {},
    context: ErrorContext = {}
  ): ValidationError {
    return new ValidationError(message, { fieldErrors }, context);
  }
}

/**
 * API response helper for Next.js API routes
 */
export function createErrorResponse(error: unknown, defaultMessage = 'An unexpected error occurred') {
  if (error instanceof AppError) {
    return {
      error: {
        message: error.message,
        code: error.code,
        type: error.type,
        ...(error instanceof ValidationError && error.details ? { details: error.details } : {})
      },
      status: error.statusCode
    };
  }
  
  if (error instanceof Error) {
    return {
      error: {
        message: error.message,
        code: 'UNKNOWN_ERROR',
        type: ErrorType.UNKNOWN
      },
      status: 500
    };
  }
  
  return {
    error: {
      message: defaultMessage,
      code: 'UNKNOWN_ERROR',
      type: ErrorType.UNKNOWN
    },
    status: 500
  };
}