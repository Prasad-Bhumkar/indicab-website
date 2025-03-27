# Progressive Web App Implementation Guide

## Manual Setup Steps

1. **Install Dependencies**:
```bash
npm install next-pwa
```

2. **Update next.config.mjs**:
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

// Add withPWA to your config exports
module.exports = withPWA(withSentryConfig(
  withBundleAnalyzer(nextConfig),
  sentryWebpackPluginOptions
));
```

3. **Configure manifest.json** (in public/manifest.json):
```json
{
  "name": "IndiCab",
  "short_name": "IndiCab",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0c9242",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## Required Assets
- Create `/public/icons` directory with app icons in multiple sizes
- Add splash screens for iOS
- Create maskable icons for Android

## Features Implemented
✅ Offline support via service worker
✅ Install prompt
✅ App-like experience
✅ Web app manifest
✅ Caching strategies

## Testing
- Use Chrome DevTools > Application tab
- Test installability
- Verify offline functionality
- Check cache storage

## Troubleshooting
- If PWA doesn't register: check HTTPS requirement
- If icons don't appear: verify manifest paths
- If updates don't apply: check skipWaiting