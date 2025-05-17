export interface AppError {
    id?: string;
    message?: string;
}

export const ErrorService = {
    handleError: (error: Error, _type: any, _context: any): AppError => {
        console.error('Handled error:', error, _type, _context);
        return { id: 'stub-error-id', message: error.message };
    },
    handle: (error: Error, _type: any, _context: any): AppError => {
        console.error('Handled error:', error, _type, _context);
        return { id: 'stub-error-id', message: error.message };
    },
    logInfo: (message: string, _context: any) => {
        console.info('Log info:', message, _context);
    }
};
