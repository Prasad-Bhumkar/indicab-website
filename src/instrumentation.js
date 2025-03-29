export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { init } = require('@sentry/nextjs');
    init({
      debug: false,
      autoInstrument: false,
      tracesSampleRate: 0.1
    });
  }
}