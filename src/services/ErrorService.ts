import { ErrorContext, ErrorMetadata, ErrorType } from '../types/errors';

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
