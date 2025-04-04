/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.json',
    ignoreBuildErrors: false,
  },
  transpilePackages: ['@components', '@app'],
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{ kebabCase member }}',
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['next-image'],
    allowedDevOrigins: ['yk9qkx-3001.csb.app'],
    turbo: {
      resolveAlias: {
        components: './src/components',
        utils: './src/utils'
      }
    }
  },
  async redirects() {
    return [
      {
        source: '/images/cars/:path*',
        destination: '/assets/cars/:path*',
        permanent: true,
      }
    ]
  },
  outputFileTracingIncludes: {
    '/*': ['./public/**/*'],
  }
}

export default nextConfig
