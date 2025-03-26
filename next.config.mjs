/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode to prevent double renders
  typescript: {
    // Disable TypeScript errors during builds
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com', 'same-assets.com'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    typedRoutes: true,
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.same-app.com'],
    },
  },
};

export default nextConfig;
