import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 1.0,
    attachStacktrace: true,
});

// Export Sentry hooks needed for server components
export const onRequestError = Sentry.captureRequestError;

export async function register() {
  // Skip instrumentation in test environment
  if (process.env.NODE_ENV === 'test' || process.env.SKIP_INSTRUMENTATION === 'true') {
    console.log('Skipping instrumentation setup in test environment');
    return;
  }

  // Only instrument on the server
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      // Use console.log for server instrumentation instead of logger
      // to avoid client-side fs module issues
      console.log('Server instrumentation initialized');
    } catch (error) {
      console.error('Failed to initialize server instrumentation:', error);
    }
  }
}
