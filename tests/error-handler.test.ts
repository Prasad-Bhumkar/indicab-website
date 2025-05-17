import { vi } from 'vitest';
import { ErrorHandler, AppError, ValidationError, ErrorSeverity, ErrorType } from '../src/lib/errors/errorHandler';

// Mock Sentry
const mockSentry = {
  captureException: vi.fn(),
  captureMessage: vi.fn(),
  withScope: vi.fn((callback: (scope: any) => void) => {
    const scope = {
      setLevel: vi.fn(),
      setTag: vi.fn(),
      setContext: vi.fn()
    };
    callback(scope);
    return scope;
  }),
  Severity: {
    Info: 'info',
    Warning: 'warning',
    Error: 'error',
    Fatal: 'fatal'
  }
};

vi.mock('@sentry/nextjs', () => mockSentry);

// Mock logger
const mockLogger = {
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
  debug: vi.fn()
};

vi.mock('../src/lib/logger', () => ({
  logger: mockLogger
}));

describe('ErrorHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('handleError should handle AppError correctly', async () => {
    const appError = new AppError('Test error', {
      code: 'TEST_ERROR',
      type: ErrorType.VALIDATION,
      severity: ErrorSeverity.MEDIUM
    });

    const result = await ErrorHandler.handleError(appError);
    
    expect(result).toBe(appError);
    // Add more assertions for logger and Sentry calls
  });

  test('handleError should convert standard Error to AppError', async () => {
    const standardError = new Error('Standard error');
    
    const result = await ErrorHandler.handleError(standardError);
    
    expect(result).toBeInstanceOf(AppError);
    expect(result.message).toBe('Standard error');
    expect(result.severity).toBe(ErrorSeverity.HIGH);
    // Add more assertions
  });

  test('handleError should handle string errors', async () => {
    const result = await ErrorHandler.handleError('String error');
    
    expect(result).toBeInstanceOf(AppError);
    expect(result.message).toBe('String error');
    // Add more assertions
  });

  test('handleError should handle unknown errors', async () => {
    const result = await ErrorHandler.handleError(null);
    
    expect(result).toBeInstanceOf(AppError);
    expect(result.message).toBe('An unexpected error occurred');
    // Add more assertions
  });

  test('createValidationError should create proper ValidationError', () => {
    const fieldErrors = { name: 'Name is required', email: 'Invalid email' };
    
    const error = ErrorHandler.createValidationError('Validation failed', fieldErrors);
    
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe('Validation failed');
    expect(error.details).toEqual({ fieldErrors });
    expect(error.statusCode).toBe(400);
  });
});
