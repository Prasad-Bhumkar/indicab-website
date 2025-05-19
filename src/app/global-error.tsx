'use client';

import * as Sentry from '@sentry/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unhandled errors to Sentry
    Sentry.captureException(error, {
      tags: {
        location: 'global-error-boundary',
        url: window.location.href,
      },
      extra: {
        digest: error.digest,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      },
    });

    // Add global error handlers with Sentry integration
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      Sentry.captureException(event.reason, {
        tags: { type: 'unhandled-rejection' },
      });
      console.error('Unhandled promise rejection:', event.reason);
    };

    const handleError = (event: ErrorEvent) => {
      Sentry.captureException(event.error, {
        tags: { type: 'unhandled-error' },
      });
      console.error('Unhandled error:', event.error);
    };

    // Add performance monitoring
    const reportWebVitals = (metric: any) => {
      if (metric.name === 'CLS') {
        Sentry.captureMessage('High Cumulative Layout Shift', {
          level: 'warning',
          tags: { metric: 'CLS', value: metric.value },
        });
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Something went wrong!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {error.message || 'An unexpected error occurred'}
              </p>
              {error.digest && (
                <p className="mt-1 text-xs text-gray-500">
                  Error ID: {error.digest}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Our team has been notified and is working on fixing this issue.
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <button
                onClick={() => {
                  Sentry.captureMessage('User attempted error recovery', {
                    level: 'info',
                  });
                  reset();
                }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              >
                Try again
              </button>
              <button
                onClick={() => {
                  Sentry.captureMessage('User navigated to home after error', {
                    level: 'info',
                  });
                  window.location.href = '/';
                }}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              >
                Go back home
              </button>
            </div>
          </div>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
} 