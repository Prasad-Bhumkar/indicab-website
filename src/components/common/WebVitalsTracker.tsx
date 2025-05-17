'use client'
import { useReportWebVitals } from 'next/web-vitals'
import * as Sentry from '@sentry/nextjs'

export function WebVitalsTracker() {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'FCP':
      case 'LCP':
      case 'CLS':
      case 'FID':
      case 'TTFB':
        Sentry.captureMessage(`Web Vital: ${metric.name} - ${metric.value}`)
        console.debug(metric.name, metric.value)
        break
      default:
        console.debug(metric.name, metric.value)
    }
  })

  return null
}
