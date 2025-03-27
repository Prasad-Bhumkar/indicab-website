/** @type {import('next').NextConfig} */
import { withSentryConfig } from '@sentry/nextjs';
import withBundleAnalyzer from '@next/bundle-analyzer';

const imageConfig = require('./config/images');

const nextConfig = {
  images: imageConfig,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    domains: [
      'images.unsplash.com',
      'same-assets.com',
      'localhost' // For development
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    contentSecurityPolicy: "default-src 'self'; img-src 'self' data: https://*;",
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ],
  experimental: {
    optimizePackageImports: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
    typedRoutes: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  org: 'your-org-name',
  project: 'your-project-name',
};

export default withSentryConfig(
  withBundleAnalyzer(nextConfig),
  sentryWebpackPluginOptions
);