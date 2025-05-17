export interface AppError {
  id?: string;
  message?: string;
}

export const ErrorService = {
  handleError: (error: Error, type: any, context: any): AppError => {
    console.error('Handled error:', error, type, context);
    return { id: 'stub-error-id', message: error.message };
  },
  handle: (error: Error, type: any, context: any): AppError => {
    console.error('Handled error:', error, type, context);
    return { id: 'stub-error-id', message: error.message };
  },
  logInfo: (message: string, context: any) => {
    console.info('Log info:', message, context);
  }
};
