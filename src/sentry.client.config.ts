import * as Sentry from '@sentry/nextjs';
// @ts-expect-error: Replay may not exist in all Sentry SDKs
const Replay = (Sentry as any).Replay;

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
    tracesSampleRate: 1.0,
    debug: process.env.NODE_ENV === 'development',
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    integrations: [
        Replay ? new Replay({
            maskAllText: true,
            blockAllMedia: true,
        }) : undefined,
    ].filter(Boolean),
}); 