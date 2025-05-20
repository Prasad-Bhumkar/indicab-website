'use client'
import * as Sentry from '@sentry/nextjs'
import { useReportWebVitals } from 'next/web-vitals'

import { _logger } from '@/lib/logger'

export function WebVitalsTracker() {
    useReportWebVitals((metric) => {
        switch (metric.name) {
            case 'FCP':
            case 'LCP':
            case 'CLS':
            case 'FID':
            case 'TTFB':
                Sentry.captureMessage(`Web Vital: ${metric.name} - ${metric.value}`)
                _logger.debug(metric.name, metric.value)
                break
            default:
                _logger.debug(metric.name, metric.value)
        }
    })

    return null
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
    if (process.env.NODE_ENV === 'development') {
        _logger.debug('Web Vitals:', metric)
    }

    // Send metrics to analytics
    if (metric.label === 'web-vital') {
        _logger.info('Core Web Vital:', {
            name: metric.name,
            value: metric.value,
            id: metric.id
        })
    }
}
