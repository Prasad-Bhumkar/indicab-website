import type { ErrorCode} from '@/utils/i18n/errors';
import { formatErrorDetails, getErrorMessage, getLocalizedError } from '@/utils/i18n/errors';

// Mock next-i18next
jest.mock('next-i18next', () => ({
  i18n: {
    language: 'en'
  }
}));

describe('Error Localization', () => {
  describe('getErrorMessage', () => {
    it('returns English error message by default', () => {
      const message = getErrorMessage('NETWORK_ERROR');
      expect(message.title).toBe('Network Error');
      expect(message.description).toContain('Unable to connect');
      expect(message.action).toBe('Retry');
    });

    it('returns Spanish error message when locale is es', () => {
      const message = getErrorMessage('NETWORK_ERROR', 'es');
      expect(message.title).toBe('Error de Red');
      expect(message.description).toContain('No se pudo conectar');
      expect(message.action).toBe('Reintentar');
    });

    it('falls back to English for unknown locale', () => {
      const message = getErrorMessage('NETWORK_ERROR', 'fr');
      expect(message.title).toBe('Network Error');
    });

    it('returns unknown error for invalid error code', () => {
      const message = getErrorMessage('INVALID_CODE' as ErrorCode);
      expect(message.title).toBe('Error');
      expect(message.description).toContain('unexpected error');
    });
  });

  describe('getLocalizedError', () => {
    it('handles string error codes', () => {
      const message = getLocalizedError('NETWORK_ERROR');
      expect(message.title).toBe('Network Error');
    });

    it('maps common error messages to error codes', () => {
      const networkError = new Error('Network Error');
      const message = getLocalizedError(networkError);
      expect(message.title).toBe('Network Error');
    });

    it('maps HTTP status codes to error codes', () => {
      const authError = new Error('401');
      const message = getLocalizedError(authError);
      expect(message.title).toBe('Authentication Error');

      const notFoundError = new Error('404');
      const message2 = getLocalizedError(notFoundError);
      expect(message2.title).toBe('Not Found');
    });

    it('returns unknown error for unmapped errors', () => {
      const unknownError = new Error('Some unknown error');
      const message = getLocalizedError(unknownError);
      expect(message.title).toBe('Error');
    });

    it('respects locale parameter', () => {
      const error = new Error('Network Error');
      const message = getLocalizedError(error, 'es');
      expect(message.title).toBe('Error de Red');
    });
  });

  describe('formatErrorDetails', () => {
    it('formats error details in English', () => {
      const error = new Error('Test error');
      error.stack = 'Error stack trace';
      const details = formatErrorDetails(error);
      expect(details).toContain('Error: Test error');
      expect(details).toContain('Stack: Error stack trace');
    });

    it('formats error details in Spanish', () => {
      const error = new Error('Test error');
      error.stack = 'Error stack trace';
      const details = formatErrorDetails(error, 'es');
      expect(details).toContain('Error: Test error');
      expect(details).toContain('Stack: Error stack trace');
    });

    it('handles errors without stack trace', () => {
      const error = new Error('Test error');
      error.stack = undefined;
      const details = formatErrorDetails(error);
      expect(details).toContain('Error: Test error');
      expect(details).toContain('Stack: undefined');
    });
  });
}); 