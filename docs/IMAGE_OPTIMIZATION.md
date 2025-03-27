# Image Optimization Setup Guide

## Required Manual Configuration

1. **Update `next.config.mjs`**:
```javascript
// Add this to your nextConfig object
images: {
  domains: [
    'images.unsplash.com', 
    'same-assets.com',
    'localhost'
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
```

2. **Implementation Guidelines**:
- Use the custom `<Image>` component from `src/components/optimized/Image.tsx`
- Always specify width and height
- Add alt text for accessibility
- Use the `placeholder="blur"` prop for smooth loading
- Set `priority` for above-the-fold images

## Best Practices
- Compress images before uploading (aim for <100KB)
- Use modern formats (WebP/AVIF)
- Implement lazy loading
- Set appropriate cache headers
- Use responsive images with srcset

## Troubleshooting
- If images don't load: check domain whitelist
- If blur placeholder fails: provide blurDataURL
- If optimization isn't working: check Next.js version