import * as Sentry from '@sentry/nextjs';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogData {
  message?: string;
  [key: string]: any;
}

/**
 * Standardized logger for the application
 * Logs to console in development and both console and Sentry in production
 */
class Logger {
  private isDev = process.env.NODE_ENV !== 'production';

  /**
   * Log debug message
   */
  debug(data: LogData | string): void {
    if (this.isDev) {
      if (typeof data === 'string') {
        console.debug('[DEBUG]', data);
      } else {
        console.debug('[DEBUG]', data.message || '', data);
      }
    }
  }

  /**
   * Log info message
   */
  info(data: LogData | string): void {
    if (typeof data === 'string') {
      console.info('[INFO]', data);
    } else {
      console.info('[INFO]', data.message || '', data);
    }

    // Only send to Sentry if explicitly requested
    if (typeof data === 'object' && data.reportToSentry) {
      Sentry.captureMessage(
        data.message || 'Info event',
        Sentry.Severity.Info
      );
    }
  }

  /**
   * Log warning message
   */
  warn(data: LogData | string): void {
    if (typeof data === 'string') {
      console.warn('[WARN]', data);
    } else {
      console.warn('[WARN]', data.message || '', data);
    }

    // Send warnings to Sentry in production
    if (!this.isDev) {
      const message = typeof data === 'string' ? data : (data.message || 'Warning event');
      Sentry.captureMessage(message, Sentry.Severity.Warning);
    }
  }

  /**
   * Log error message
   */
  error(data: LogData | string | Error): void {
    if (data instanceof Error) {
      console.error('[ERROR]', data.message, data);
      
      if (!this.isDev) {
        Sentry.captureException(data);
      }
    } else if (typeof data === 'string') {
      console.error('[ERROR]', data);
      
      if (!this.isDev) {
        Sentry.captureMessage(data, Sentry.Severity.Error);
      }
    } else {
      console.error('[ERROR]', data.message || '', data);
      
      if (!this.isDev) {
        if (data.error instanceof Error) {
          Sentry.captureException(data.error);
        } else {
          Sentry.captureMessage(
            data.message || 'Error event',
            Sentry.Severity.Error
          );
        }
      }
    }
  }
}

export const logger = new Logger();
