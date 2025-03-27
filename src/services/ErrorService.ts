import { toast } from 'react-hot-toast';

export enum ErrorType {
  API = 'API',
  VALIDATION = 'VALIDATION', 
  AUTH = 'AUTH',
  NETWORK = 'NETWORK',
  RUNTIME = 'RUNTIME'
}

interface ErrorContext {
  componentStack?: string;
  route?: string;
  userId?: string;
  [key: string]: unknown;
}

export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly context: ErrorContext;
  public readonly timestamp: Date;
  public readonly originalError?: Error;

  constructor(
    message: string,
    type: ErrorType = ErrorType.RUNTIME,
    context: ErrorContext = {},
    originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.context = context;
    this.timestamp = new Date();
    this.originalError = originalError;
  }
}

export class ErrorService {
  private static errorMessages: Record<ErrorType, string> = {
    [ErrorType.API]: 'Service unavailable. Please try again later.',
    [ErrorType.VALIDATION]: 'Please check your input and try again.',
    [ErrorType.AUTH]: 'Authentication failed. Please login again.',
    [ErrorType.NETWORK]: 'Network error. Please check your connection.',
    [ErrorType.RUNTIME]: 'Something went wrong. Please refresh the page.'
  };

  static handle(error: unknown, type: ErrorType = ErrorType.RUNTIME, context: ErrorContext = {}): AppError {
    const appError = error instanceof AppError 
      ? error 
      : new AppError(
          error instanceof Error ? error.message : 'An unexpected error occurred',
          type,
          context,
          error instanceof Error ? error : undefined
        );

    // Development logging
    if (process.env.NODE_ENV !== 'production') {
      console.groupCollapsed(`[${appError.type}] ${appError.message}`);
      console.error('Error:', appError);
      if (Object.keys(appError.context).length > 0) {
        console.log('Context:', appError.context);
      }
      if (appError.originalError) {
        console.log('Original error:', appError.originalError);
      }
      console.groupEnd();
    }

    // TODO: Add error reporting service integration
    // this.reportError(appError);

    // Show toast notification
    toast.error(this.errorMessages[appError.type], {
      duration: 5000
    });

    return appError;
  }

  private static reportError(error: AppError) {
    // Implementation for error reporting service (Sentry, etc.)
    // fetch('/api/errors', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     type: error.type,
    //     message: error.message,
    //     stack: error.stack,
    //     context: error.context
    //   })
    // });
  }
}