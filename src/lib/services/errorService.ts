export enum ErrorType {
  RUNTIME = 'RUNTIME',
  VALIDATION = 'VALIDATION',
}

export class AppError extends Error {
  constructor(message: string, public type: ErrorType = ErrorType.RUNTIME) {
    super(message);
    this.name = 'AppError';
  }
}

export class ErrorService {
  static handleError<T>(error: Error, type: ErrorType, context: T) {
    // Log the error to the console or a logging service
    console.error('Error handled:', { error, type, context });
    return new AppError(error.message, type);
  }

  static logInfo<T>(message: string, context: T) {
    // Log informational messages
    console.info('Info:', { message, context });
  }
}
