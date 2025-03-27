'use client'

import { useReportWebVitals } from 'next/web-vitals'
// @ts-ignore - Temporary until Sentry types are fully resolved
const Sentry = require('@sentry/nextjs')

export function WebVitalsTracker() {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'FCP':
      case 'LCP':
      case 'CLS':
      case 'FID':
      case 'TTFB':
        Sentry.metrics.distribution(metric.name, metric.value)
        console.debug(metric.name, metric.value)
        break
      default:
        console.debug(metric.name, metric.value)
    }
  })

  return null
}