/** @type {import('next').NextConfig} */
import { withSentryConfig } from '@sentry/nextjs';
import withBundleAnalyzer from '@next/bundle-analyzer';

import imageConfig from './config/images.mjs';

const nextConfig = {
  images: imageConfig,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
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
    turbo: {
      resolveAlias: {
        components: './src/components',
        utils: './src/utils'
      },
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.jsx'
        }
      }
    }
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  org: 'indicab',
  project: 'production',
};

export default withSentryConfig(
  withBundleAnalyzer(nextConfig),
  sentryWebpackPluginOptions
);