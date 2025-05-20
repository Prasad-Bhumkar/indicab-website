/**
 * Logger utility for consistent application logging
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LoggerOptions {
  prefix?: string;
  includeTimestamp?: boolean;
}

interface LogMeta {
  [key: string]: unknown;
}

const defaultOptions: LoggerOptions = {
  prefix: 'indicab',
  includeTimestamp: true
};

class Logger {
  private options: LoggerOptions;

  constructor(options: LoggerOptions = {}) {
    this.options = { ...defaultOptions, ...options };
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = this.options.includeTimestamp ? `[${new Date().toISOString()}]` : '';
    const prefix = this.options.prefix ? `[${this.options.prefix}]` : '';
    const levelFormatted = `[${level.toUpperCase()}]`;
    
    return `${timestamp}${prefix}${levelFormatted} ${message}`;
  }

  error(message: string, meta?: LogMeta): void {
    const formattedMessage = this.formatMessage('error', message, meta);
    console.error(formattedMessage, meta || '');
  }

  warn(message: string, meta?: LogMeta): void {
    const formattedMessage = this.formatMessage('warn', message, meta);
    console.warn(formattedMessage, meta || '');
  }

  info(message: string, meta?: LogMeta): void {
    const formattedMessage = this.formatMessage('info', message, meta);
    console.info(formattedMessage, meta || '');
  }

  debug(message: string, meta?: LogMeta): void {
    // Only log in development
    if (process.env.NODE_ENV !== 'production') {
      const formattedMessage = this.formatMessage('debug', message, meta);
      console.debug(formattedMessage, meta || '');
    }
  }
}

export const logger = new Logger();
export default logger; 