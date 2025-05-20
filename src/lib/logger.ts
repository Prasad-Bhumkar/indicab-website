'use client';

// Only import winston on the server side
const winston = typeof window === 'undefined' ? require('winston') : null;

// Determine if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Create logger with appropriate configuration
const createLogger = () => {
	// In browser, use minimal configuration or console
	if (isBrowser) {
		return {
			error: (message: string, meta?: any) => console.error(message, meta),
			warn: (message: string, meta?: any) => console.warn(message, meta),
			info: (message: string, meta?: any) => console.info(message, meta),
			debug: (message: string, meta?: any) => console.debug(message, meta),
		};
	}
	
	// In Node.js, use winston
	return winston.createLogger({
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
		],
	});
};

// Create the logger instance
const _loggerInstance = createLogger();

// Type-safe logger interface that works in both environments
export const logger = {
	error: (message: string, meta?: any) => isBrowser 
		? _loggerInstance.error(message, meta) 
		: (_loggerInstance as any).error(message, meta),
	warn: (message: string, meta?: any) => isBrowser 
		? _loggerInstance.warn(message, meta) 
		: (_loggerInstance as any).warn(message, meta),
	info: (message: string, meta?: any) => isBrowser 
		? _loggerInstance.info(message, meta) 
		: (_loggerInstance as any).info(message, meta),
	debug: (message: string, meta?: any) => isBrowser 
		? _loggerInstance.debug(message, meta) 
		: (_loggerInstance as any).debug(message, meta),
};

// Export the logger instance for compatibility
export const _logger = logger;
