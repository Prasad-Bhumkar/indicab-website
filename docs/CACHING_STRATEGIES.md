# Caching Strategies Implementation Guide

## Service Worker Configuration
- **Location**: `public/sw.js`
- **Cached Assets**:
  - Core application shell
  - Static assets (CSS, JS, images)
  - Critical API responses
- **Cache Invalidation**: Versioned cache name (`indicab-cache-v1`)

## Implementation Steps

1. **Service Worker Registration**:
```typescript
// Add to your root layout component
import ServiceWorkerRegistration from '../components/ServiceWorkerRegistration'

// Add inside <body>
<ServiceWorkerRegistration />
```

2. **HTTP Caching Headers** (in next.config.mjs):
```javascript
headers: async () => [
  {
    source: '/_next/static/(.*)',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
    ]
  },
  {
    source: '/static/(.*)',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
    ]
  }
]
```

## Best Practices
- Cache static assets with long max-age
- Use content hashing for bundle files
- Implement cache-busting for updated assets
- Cache API responses judiciously
- Test offline functionality

## Cache Management
| Resource Type | Cache Policy | Duration |
|--------------|-------------|----------|
| Static Assets | immutable | 1 year |
| HTML Pages | no-cache | - |
| API Data | stale-while-revalidate | 10 min |

## Troubleshooting
- If assets don't update: increment cache version
- If offline doesn't work: check service worker registration
- If cache grows too large: implement periodic cleanup