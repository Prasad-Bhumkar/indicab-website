import { i18n } from 'next-i18next';

export type ErrorCode =
  | 'NETWORK_ERROR'
  | 'API_ERROR'
  | 'VALIDATION_ERROR'
  | 'AUTH_ERROR'
  | 'PERMISSION_ERROR'
  | 'NOT_FOUND'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR';

interface ErrorMessage {
  title: string;
  description: string;
  action?: string;
}

const errorMessages: Record<string, Record<ErrorCode, ErrorMessage>> = {
  en: {
    NETWORK_ERROR: {
      title: 'Network Error',
      description: 'Unable to connect to the server. Please check your internet connection and try again.',
      action: 'Retry'
    },
    API_ERROR: {
      title: 'API Error',
      description: 'An error occurred while communicating with the server. Please try again later.',
      action: 'Retry'
    },
    VALIDATION_ERROR: {
      title: 'Validation Error',
      description: 'Please check your input and try again.',
      action: 'Fix'
    },
    AUTH_ERROR: {
      title: 'Authentication Error',
      description: 'Your session has expired. Please log in again.',
      action: 'Login'
    },
    PERMISSION_ERROR: {
      title: 'Permission Denied',
      description: 'You do not have permission to perform this action.',
      action: 'Go Back'
    },
    NOT_FOUND: {
      title: 'Not Found',
      description: 'The requested resource could not be found.',
      action: 'Go Home'
    },
    SERVER_ERROR: {
      title: 'Server Error',
      description: 'An unexpected error occurred on the server. Please try again later.',
      action: 'Retry'
    },
    UNKNOWN_ERROR: {
      title: 'Error',
      description: 'An unexpected error occurred. Please try again later.',
      action: 'Retry'
    }
  },
  es: {
    NETWORK_ERROR: {
      title: 'Error de Red',
      description: 'No se pudo conectar al servidor. Por favor, verifica tu conexión a internet e inténtalo de nuevo.',
      action: 'Reintentar'
    },
    API_ERROR: {
      title: 'Error de API',
      description: 'Ocurrió un error al comunicarse con el servidor. Por favor, inténtalo más tarde.',
      action: 'Reintentar'
    },
    VALIDATION_ERROR: {
      title: 'Error de Validación',
      description: 'Por favor, verifica tu entrada e inténtalo de nuevo.',
      action: 'Corregir'
    },
    AUTH_ERROR: {
      title: 'Error de Autenticación',
      description: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      action: 'Iniciar Sesión'
    },
    PERMISSION_ERROR: {
      title: 'Permiso Denegado',
      description: 'No tienes permiso para realizar esta acción.',
      action: 'Volver'
    },
    NOT_FOUND: {
      title: 'No Encontrado',
      description: 'No se pudo encontrar el recurso solicitado.',
      action: 'Ir al Inicio'
    },
    SERVER_ERROR: {
      title: 'Error del Servidor',
      description: 'Ocurrió un error inesperado en el servidor. Por favor, inténtalo más tarde.',
      action: 'Reintentar'
    },
    UNKNOWN_ERROR: {
      title: 'Error',
      description: 'Ocurrió un error inesperado. Por favor, inténtalo más tarde.',
      action: 'Reintentar'
    }
  }
};

export const getErrorMessage = (code: ErrorCode, locale?: string): ErrorMessage => {
  const currentLocale = locale || i18n?.language || 'en';
  const messages = errorMessages[currentLocale] || errorMessages.en;
  return messages[code] || messages.UNKNOWN_ERROR;
};

export const getLocalizedError = (error: Error | string, locale?: string): ErrorMessage => {
  if (typeof error === 'string') {
    return getErrorMessage(error as ErrorCode, locale);
  }

  // Map common error types to error codes
  const errorMap: Record<string, ErrorCode> = {
    'Network Error': 'NETWORK_ERROR',
    'Failed to fetch': 'NETWORK_ERROR',
    '401': 'AUTH_ERROR',
    '403': 'PERMISSION_ERROR',
    '404': 'NOT_FOUND',
    '500': 'SERVER_ERROR'
  };

  const code = errorMap[error.message] || 'UNKNOWN_ERROR';
  return getErrorMessage(code, locale);
};

export const formatErrorDetails = (error: Error, locale?: string): string => {
  const { message, stack } = error;
  const currentLocale = locale || i18n?.language || 'en';

  if (currentLocale === 'en') {
    return `Error: ${message}\nStack: ${stack}`;
  }

  return `Error: ${message}\nStack: ${stack}`;
}; 