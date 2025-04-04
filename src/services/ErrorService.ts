import { toast } from 'react-hot-toast';
import { ErrorContext, ErrorMetadata, ErrorSeverity, ErrorType } from '../types/errors';

class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly metadata: ErrorMetadata,
    public readonly context?: ErrorContext
  ) {
    super(message);
    this.name = 'AppError';
  }
}

const ERROR_MESSAGES: Record<ErrorType, string> = {
  VALIDATION: 'Validation Error',
  AUTHENTICATION: 'Authentication Error',
  AUTHORIZATION: 'Authorization Error',
  NOT_FOUND: 'Resource Not Found',
  SERVER_ERROR: 'Internal Server Error'
};

export class ErrorService {
  public static createError(
    message: string,
    metadata: ErrorMetadata,
    context?: ErrorContext
  ): AppError {
    return new AppError(message, metadata, context);
  }

  public static logError(error: AppError): void {
    console.error({
      message: error.message,
      metadata: {
        code: error.metadata.code,
        type: error.metadata.type,
        severity: error.metadata.severity
      }
    });
  }
}
