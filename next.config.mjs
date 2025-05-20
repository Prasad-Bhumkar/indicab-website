import NextBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Skip environment variable validation in test environment
const isTest = process.env.NODE_ENV === 'test';

// Environment variable validation
const requiredEnvVars = [
  'GOOGLE_MAPS_API_KEY',
  'MONGODB_URI',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'NEXT_PUBLIC_SENTRY_DSN',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
];

// Validate environment variables only when not in test environment
if (!isTest) {
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.warn(`Missing recommended environment variable: ${envVar}`);
    }
  });
}

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['indicab.com', 'images.indicab.com', 'static.indicab.com'],
  },
  eslint: {
    ignoreDuringBuilds: true, // We run ESLint separately in CI
  },
  typescript: {
    ignoreBuildErrors: true, // We run type checking separately in CI
  },
  poweredByHeader: false,
  experimental: {
    // Configure serverActions as an object, not a boolean
    serverActions: {
      allowedOrigins: ['localhost:3000', 'indicab.com'],
      bodySizeLimit: '2mb'
    }
  },
  // Update: moved from experimental to root
  serverExternalPackages: [
    'mongoose',
    'winston',
    'winston-daily-rotate-file',
    '@googlemaps/google-maps-services-js',
  ],
  // Move i18n config to use App Router internationalization
  // See: https://nextjs.org/docs/app/building-your-application/routing/internationalization
  async rewrites() {
    return [
      // Handle i18n routes for App Router
      {
        source: '/:locale/:path*',
        destination: '/:path*',
        locale: false,
      },
    ];
  },
  // Handle Node.js modules in client-side code
  webpack: (config, { isServer }) => {
    // Ignore specific warning messages
    config.ignoreWarnings = [
      { 
        module: /node_modules\/@opentelemetry\/instrumentation-/,
        message: /Critical dependency: the request of a dependency is an expression/,
      },
      {
        module: /node_modules\/@sentry\/node/,
        message: /Critical dependency/,
      }
    ];

    // Handle Node.js modules in client-side code
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        path: false,
        os: false,
        util: false,
        crypto: false,
        zlib: false,
        stream: false,
        http: false,
        https: false
      };
    }
    
    return config;
  },
};

// Only use Sentry in production or when explicitly enabled
const withSentry = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.NODE_ENV === 'production'
  ? withSentryConfig
  : (config) => config;

export default withSentry(
  withBundleAnalyzer(nextConfig),
  {
    // Sentry config options
    silent: true,
    org: process.env.SENTRY_ORG || '',
    project: process.env.SENTRY_PROJECT || '',
  },
); 