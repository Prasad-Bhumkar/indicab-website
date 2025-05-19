'use server';

import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Create server-side logger
const _logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: { service: 'indicab-website' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    }),
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

// Type-safe logger interface
export const logger = {
  error: (message: string, meta?: any) => _logger.error(message, meta),
  warn: (message: string, meta?: any) => _logger.warn(message, meta),
  info: (message: string, meta?: any) => _logger.info(message, meta),
  debug: (message: string, meta?: any) => _logger.debug(message, meta),
};

// Export the raw logger instance
export { _logger };
