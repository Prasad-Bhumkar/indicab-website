# Bundle Size Monitoring Setup

## Manual Implementation Steps

1. **Install Dependencies**:
```bash
npm install --save-dev webpack-bundle-analyzer size-limit
```

2. **Update package.json scripts**:
```json
"scripts": {
  "analyze": "ANALYZE=true next build",
  "size": "size-limit",
  "size:why": "size-limit --why"
}
```

3. **Create .size-limit.json**:
```json
[
  {
    "path": ".next/static/chunks/*.js",
    "limit": "150 KB",
    "webpack": false
  },
  {
    "path": ".next/static/css/*.css",
    "limit": "50 KB"
  }
]
```

4. **Configure Bundle Analyzer** (in next.config.mjs):
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true
});
```

## Optimization Techniques

### Code Splitting
- Use dynamic imports for heavy components
- Split vendor libraries
- Lazy load non-critical components

### Best Practices
- Monitor bundle sizes in CI
- Set performance budgets
- Visualize dependencies
- Remove unused code

## CI Integration
Add to your GitHub Actions workflow:
```yaml
- name: Check bundle size
  run: npm run size
```

## Troubleshooting
- If limits are exceeded: analyze with `npm run size:why`
- For large bundles: check duplicate dependencies
- For unexpected bloat: run bundle analyzer