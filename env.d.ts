// Ensure this file is included in your tsconfig.json
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_SENTRY_DSN: string;
            SENTRY_DSN: string;
            SENTRY_ORG: string;
            SENTRY_PROJECT: string;
            NODE_ENV: 'development' | 'production' | 'test';
        }
    }
}

// If this is a module (uses import/export), this is needed
export { };
