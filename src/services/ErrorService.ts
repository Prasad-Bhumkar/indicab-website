import { ErrorInfo } from 'react';
import { ErrorContext, ErrorMetadata, ErrorType, ErrorSeverity } from '../types/errors';

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
  static logInfo(message: string, context: { [key: string]: any }) {
    console.info(`[${new Date().toISOString()}] INFO: ${message}`, context);
  }

  static handle(error: Error, type: ErrorType, context: ErrorContext): AppError {
    const errorId = Math.random().toString(36).substring(2, 9);
    console.error(`[${new Date().toISOString()}] ERROR: ${error.message}`, {
      errorId,
      type,
      ...context,
      stack: error.stack
    });
    return new AppError(error.message, { 
      code: type,
      type: type,
      severity: ErrorSeverity.HIGH 
    }, context);
  }

  static handleError(error: Error, type: ErrorType, context: ErrorContext) {
    return this.handle(error, type, context);
  }

  public static createError(
    message: string,
    metadata: ErrorMetadata,
    context?: ErrorContext
  ): AppError {
    const errorId = Math.random().toString(36).substring(2, 9);
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`, {
      errorId,
      ...metadata,
      ...context
    });
    return new AppError(message, metadata, context);
  }

  public static logError(error: AppError): void {
    console.error(`[${new Date().toISOString()}] ERROR: ${error.message}`, {
      errorId: Math.random().toString(36).substring(2, 9),
      ...error.metadata,
      ...error.context,
      stack: error.stack
    });
  }
}

export type { ErrorType };
export type { AppError };
