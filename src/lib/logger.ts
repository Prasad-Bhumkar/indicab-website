import * as Sentry from '@sentry/nextjs';
import fs from 'fs';
import path from 'path';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

class Logger {
  private static instance: Logger;
  private logFile = './logs/app.log';

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatTimestamp(): string {
    const now = new Date();
    return now.toISOString().replace('T', ' ').replace(/\..+/, '');
  }

  private logToFile(message: string) {
    if (process.env.NODE_ENV === 'production') {
      try {
        const logDir = path.dirname(this.logFile);
        
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true });
        }
        
        fs.appendFileSync(this.logFile, message);
      } catch (err) {
        console.error('Failed to write to log file:', err);
      }
    }
  }

  log(level: LogLevel, message: string, context?: LogContext) {
    const timestamp = this.formatTimestamp();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    const fullMessage = context 
      ? `${logMessage}\n${JSON.stringify(context, null, 2)}` 
      : logMessage;

    // Log to appropriate console method
    console[level](fullMessage);

    // Log to file in production
    this.logToFile(fullMessage + '\n');

    // Capture errors to Sentry
    if (level === 'error') {
      Sentry.captureException(new Error(message), { extra: context });
    }
  }

  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV !== 'production') {
      this.log('debug', message, context);
    }
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  error(message: string, context?: LogContext) {
    this.log('error', message, context);
  }
}

export const logger = Logger.getInstance();
