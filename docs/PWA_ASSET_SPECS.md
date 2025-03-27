# PWA Asset Specifications

## Required Icon Sizes
Create these in `/public/icons/`:

| Size | Purpose | File Name |
|------|---------|-----------|
| 192x192 | Android homescreen | icon-192x192.png |
| 512x512 | Splash screen | icon-512x512.png | 
| 180x180 | iOS homescreen | apple-touch-icon.png |
| 1024x1024 | App Store | app-store-icon.png |

## Recommended Additional Sizes
- 16x16 (favicon)
- 32x32 
- 48x48
- 144x144
- 256x256

## Splash Screens
Create HTML meta tags in your layout:

```html
<!-- iOS -->
<link rel="apple-touch-startup-image" href="/splash/iphone5_splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)">
<!-- Add more sizes as needed -->

<!-- Android -->
<meta name="theme-color" content="#0c9242">
<meta name="mobile-web-app-capable" content="yes">
```

## Implementation Checklist
1. [ ] Generate all required icon sizes
2. [ ] Add to manifest.json
3. [ ] Create splash screen assets
4. [ ] Add iOS meta tags to layout
5. [ ] Test on Android/Chrome
6. [ ] Test on iOS/Safari
7. [ ] Verify install prompt
8. [ ] Test offline functionality