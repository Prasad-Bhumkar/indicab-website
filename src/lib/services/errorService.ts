import { logger } from '../logger';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ErrorService {
  static async handleError(error: unknown, context?: string): Promise<AppError> {
    let appError: AppError;

    if (error instanceof AppError) {
      appError = error;
    } else if (error instanceof Error) {
      appError = new AppError(error.message);
    } else {
      appError = new AppError('An unexpected error occurred');
    }

    // Log the error with context
    await logger.error(appError.message, {
      message: appError.message,
      code: appError.code,
      statusCode: appError.statusCode,
      context,
      stack: appError.stack
    });

    return appError;
  }

  static async logWarning(message: string, context?: string): Promise<void> {
    await logger.warn(message, {
      message,
      context,
      timestamp: new Date().toISOString()
    });
  }

  static async logInfo(message: string, context?: string): Promise<void> {
    await logger.info(message, {
      message,
      context,
      timestamp: new Date().toISOString()
    });
  }
}