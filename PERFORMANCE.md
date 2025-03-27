# Performance Monitoring Setup

## Overview
This document explains the performance monitoring infrastructure implemented in the IndiCab application.

## Implemented Optimizations

### 1. Web Vitals Tracking
- **Location**: `src/components/WebVitalsTracker.tsx`
- **Metrics Tracked**:
  - FCP (First Contentful Paint)
  - LCP (Largest Contentful Paint)
  - CLS (Cumulative Layout Shift)
  - FID (First Input Delay)
  - TTFB (Time to First Byte)
- **Reporting**: Metrics are sent to Sentry for monitoring

### 2. Lighthouse CI
- **Configuration**: `lighthouserc.js`
- **Tested Pages**:
  - Homepage (`/`)
  - Bookings page (`/bookings`)
  - About page (`/about`)
- **Performance Budgets**:
  - Performance: ≥90%
  - Accessibility: ≥95%
  - Best Practices: ≥90%
  - SEO: ≥90%

### 3. GitHub Actions Workflow
- **Location**: `.github/workflows/lighthouse.yml`
- **Runs On**:
  - Pull requests to `main`
  - Direct pushes to `main`
  - Version tags (`v*`)
- **Outputs**:
  - PR comments with results
  - Artifacts with full reports

## How to Use

### Running Locally
```bash
# Build the application
npm run build

# Start production server
npm run start

# In another terminal, run Lighthouse tests
npm run lhci:all
```

### Interpreting Results
- Check PR comments for summary
- Download artifacts for full reports
- View historical trends in Sentry

## Troubleshooting

### Common Issues
1. **Low Performance Score**:
   - Check large images/unoptimized assets
   - Review JavaScript bundle sizes
   - Verify caching headers

2. **Accessibility Warnings**:
   - Fix missing alt text
   - Ensure proper contrast ratios
   - Verify ARIA attributes

3. **Sentry Integration Issues**:
   - Verify `SENTRY_DSN` environment variable
   - Check Sentry project configuration

## Maintenance
- Review Lighthouse scores weekly
- Monitor Sentry performance dashboards
- Update budgets as needed in `lighthouserc.js`