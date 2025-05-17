export enum ErrorType {
    RUNTIME = 'RUNTIME',
    VALIDATION = 'VALIDATION',
}

export class AppError extends Error {
    constructor(message: string, public _type: ErrorType = ErrorType.RUNTIME) {
        super(message);
        this.name = 'AppError';
    }
}

export class ErrorService {
    static handleError<T>(error: Error, _type: ErrorType, _context: T) {
        // Log the error to the console or a logging service
        console.error('Error handled:', { error, _type, _context });
        return new AppError(error.message, _type);
    }

    static logInfo<T>(message: string, _context: T) {
        // Log informational messages
        console.info('Info:', { message, _context });
    }
}
