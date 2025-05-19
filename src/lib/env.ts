import { z } from 'zod';

const envSchema = z.object({
  // Database
  MONGODB_URI: z.string().url(),
  
  // Authentication
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  
  // API Keys
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  POSTHOG_API_KEY: z.string(),
  SENTRY_AUTH_TOKEN: z.string(),
  
  // Redis
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
  
  // URLs
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
  
  // Feature Flags
  ENABLE_ANALYTICS: z.enum(['true', 'false']).transform((val: string) => val === 'true'),
  ENABLE_SENTRY: z.enum(['true', 'false']).transform((val: string) => val === 'true'),
  ENABLE_POSTHOG: z.enum(['true', 'false']).transform((val: string) => val === 'true'),
});

export const env = envSchema.parse(process.env);

// Type for the validated environment variables
export type Env = z.infer<typeof envSchema>;

// Helper function to check if we're in production
export const isProd = process.env.NODE_ENV === 'production';

// Helper function to check if we're in development
export const isDev = process.env.NODE_ENV === 'development';

// Helper function to check if we're in test
export const isTest = process.env.NODE_ENV === 'test'; 