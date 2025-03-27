module.exports = {
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
  contentSecurityPolicy: "default-src 'self'; img-src 'self' data: https://*;"
}