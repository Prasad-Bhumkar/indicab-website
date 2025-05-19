export enum ErrorType {
    RUNTIME = 'RUNTIME',
    VALIDATION = 'VALIDATION',
}

export class AppError extends Error {
    constructor(
        message: string,
        public statusCode: number = 500,
        public code: string = 'INTERNAL_SERVER_ERROR'
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export class ErrorService {
    static async handleError(error: unknown, context?: string): Promise<AppError> {
        if (error instanceof AppError) {
            console.error('AppError handled:', {
                message: error.message,
                code: error.code,
                statusCode: error.statusCode,
                context,
                stack: error.stack
            });
            return error;
        }

        if (error instanceof Error) {
            const appError = new AppError(error.message);
            console.error('Error converted to AppError:', {
                message: error.message,
                code: appError.code,
                statusCode: appError.statusCode,
                context,
                stack: error.stack
            });
            return appError;
        }

        const appError = new AppError('An unexpected error occurred');
        console.error('Unknown error converted to AppError:', {
            message: appError.message,
            code: appError.code,
            statusCode: appError.statusCode,
            context,
            originalError: error
        });
        return appError;
    }

    static async logWarning(message: string, context?: string): Promise<void> {
        console.warn('Warning:', {
            message,
            context,
            timestamp: new Date().toISOString()
        });
    }

    static async logInfo(message: string, context?: string): Promise<void> {
        console.info('Info:', {
            message,
            context,
            timestamp: new Date().toISOString()
        });
    }
}
