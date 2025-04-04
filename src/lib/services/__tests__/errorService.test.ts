import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ErrorService, AppError } from '../errorService';
import { logger } from '../../logger';

// Mock the logger
vi.mock('../../logger', () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn()
  }
}));

describe('ErrorService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('handleError', () => {
    it('should handle AppError correctly', async () => {
      const appError = new AppError('Test error', 400, 'TEST_ERROR');
      const result = await ErrorService.handleError(appError, 'test-context');

      expect(result).toBe(appError);
      expect(logger.error).toHaveBeenCalledWith({
        message: 'Test error',
        code: 'TEST_ERROR',
        statusCode: 400,
        context: 'test-context',
        stack: expect.any(String)
      });
    });

    it('should convert Error to AppError', async () => {
      const error = new Error('Standard error');
      const result = await ErrorService.handleError(error);

      expect(result).toBeInstanceOf(AppError);
      expect(result.message).toBe('Standard error');
      expect(result.statusCode).toBe(500);
      expect(logger.error).toHaveBeenCalled();
    });

    it('should handle unknown errors', async () => {
      const result = await ErrorService.handleError('unexpected error');

      expect(result).toBeInstanceOf(AppError);
      expect(result.message).toBe('An unexpected error occurred');
      expect(result.statusCode).toBe(500);
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('logWarning', () => {
    it('should log warning messages correctly', async () => {
      const message = 'Warning message';
      const context = 'test-context';

      await ErrorService.logWarning(message, context);

      expect(logger.warn).toHaveBeenCalledWith({
        message,
        context,
        timestamp: expect.any(String)
      });
    });
  });

  describe('logInfo', () => {
    it('should log info messages correctly', async () => {
      const message = 'Info message';
      const context = 'test-context';

      await ErrorService.logInfo(message, context);

      expect(logger.info).toHaveBeenCalledWith({
        message,
        context,
        timestamp: expect.any(String)
      });
    });
  });
});