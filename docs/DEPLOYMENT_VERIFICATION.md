# Deployment Verification Checklist

## Pre-Deployment Checks
1. [ ] All tests passing (unit, integration, e2e)
2. [ ] Lighthouse scores meet thresholds:
   - Performance ≥ 90
   - Accessibility ≥ 95  
   - Best Practices ≥ 90
3. [ ] Bundle sizes within limits
4. [ ] PWA manifest valid

## Post-Deployment Tests
1. **Performance Metrics**:
   ```bash
   npm run test:performance
   ```
   - Verify Web Vitals in production
   - Check Sentry performance data

2. **PWA Functionality**:
   - Test install prompt
   - Verify offline mode
   - Check splash screens

3. **Caching Verification**:
   ```bash
   curl -I https://yourdomain.com/static/asset.js
   ```
   - Check `Cache-Control` headers
   - Validate service worker cache

4. **Image Optimization**:
   - Inspect network requests for WebP
   - Verify responsive images
   - Check lazy loading

## Monitoring Setup
1. **Sentry Alerts**:
   - Configure for LCP > 2.5s
   - Set up FID > 100ms alerts

2. **Lighthouse CI**:
   - Monitor score trends
   - Set up Slack notifications

3. **Bundle Size**:
   - Weekly reports
   - PR size checks

## Rollback Plan
1. Immediate revert if:
   - LCP > 4s
   - Critical errors detected
   - PWA not functional
2. Hotfix procedures documented