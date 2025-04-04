export type ErrorType = 'VALIDATION' | 'AUTHENTICATION' | 'AUTHORIZATION' | 'NOT_FOUND' | 'SERVER_ERROR';

export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface ErrorMetadata {
  code: string;
  type: ErrorType;
  severity: ErrorSeverity;
  details?: Record<string, unknown>;
}

export interface ErrorContext {
  userId?: string;
  requestId?: string;
  timestamp?: Date;
}
