'use client';

import * as Sentry from '@sentry/nextjs';

const _SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
    dsn: _SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.01,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay(),
    ],
});

// Export the Sentry hooks required for client-side instrumentation
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
export const onRouterTransitionComplete = Sentry.captureRouterTransitionComplete;
export const onRouterTransitionError = Sentry.captureRouterTransitionError;

// Initialize any additional client-side instrumentation if needed
export function register() {
  // Additional client-side instrumentation setup can go here
  
  // Only initialize when not in test environment
  if (process.env.NODE_ENV !== 'test') {
    // Example: Initialize performance monitoring
    if (typeof window !== 'undefined') {
      // Initialize client-side performance monitoring
    }
  }
}
