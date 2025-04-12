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
  static handleError(error: Error, type: ErrorType, context: any) {
    // Log the error to the console or a logging service
    console.error('Error handled:', { error, type, context });
    return new AppError(error.message, type);
  }

  static logInfo(message: string, context: any) {
    // Log informational messages
    console.info('Info:', { message, context });
  }
}
