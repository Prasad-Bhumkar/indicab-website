import { useEffect, useRef } from 'react';

import { PerformanceObserver, performance } from 'perf_hooks';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observer: PerformanceObserver;
  private readonly maxMetrics = 1000;

  constructor() {
    this.observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.metrics.push({
          name: entry.name,
          value: entry.duration,
          timestamp: Date.now(),
          metadata: {
            entryType: entry.entryType,
            startTime: entry.startTime,
            duration: entry.duration
          }
        });
      });

      // Keep only the last maxMetrics entries
      if (this.metrics.length > this.maxMetrics) {
        this.metrics = this.metrics.slice(-this.maxMetrics);
      }
    });

    this.observer.observe({ 
      entryTypes: ['measure', 'resource', 'navigation', 'paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] 
    });
  }

  startMeasure(name: string) {
    performance.mark(`${name}-start`);
  }

  endMeasure(name: string, metadata?: Record<string, any>) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    // Add metadata to the last metric
    const lastMetric = this.metrics[this.metrics.length - 1];
    if (lastMetric && lastMetric.name === name) {
      lastMetric.metadata = { ...lastMetric.metadata, ...metadata };
    }
  }

  getMetrics(name?: string) {
    return name
      ? this.metrics.filter(m => m.name === name)
      : this.metrics;
  }

  getAverageMetric(name: string) {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return 0;

    const sum = metrics.reduce((acc, m) => acc + m.value, 0);
    return sum / metrics.length;
  }

  getPercentileMetric(name: string, percentile: number) {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return 0;

    const sorted = metrics.sort((a, b) => a.value - b.value);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index].value;
  }

  clearMetrics() {
    this.metrics = [];
    performance.clearMarks();
    performance.clearMeasures();
  }

  disconnect() {
    this.observer.disconnect();
  }

  public addMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }
}

// Create a singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Utility functions for common performance measurements
export const measurePageLoad = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        performanceMonitor.addMetric({
          name: 'page-load',
          value: navigation.loadEventEnd - navigation.startTime,
          timestamp: Date.now(),
          metadata: {
            domComplete: navigation.domComplete,
            domInteractive: navigation.domInteractive,
            loadEventEnd: navigation.loadEventEnd,
            responseEnd: navigation.responseEnd,
            responseStart: navigation.responseStart,
            requestStart: navigation.requestStart,
            connectEnd: navigation.connectEnd,
            connectStart: navigation.connectStart,
            domainLookupEnd: navigation.domainLookupEnd,
            domainLookupStart: navigation.domainLookupStart,
            redirectEnd: navigation.redirectEnd,
            redirectStart: navigation.redirectStart,
            secureConnectionStart: navigation.secureConnectionStart,
            startTime: navigation.startTime,
            unloadEventEnd: navigation.unloadEventEnd,
            unloadEventStart: navigation.unloadEventStart
          }
        });
      }
    });
  }
};

export const measureComponentRender = (componentName: string) => {
  return {
    start: () => performanceMonitor.startMeasure(`render-${componentName}`),
    end: (metadata?: Record<string, any>) => performanceMonitor.endMeasure(`render-${componentName}`, metadata)
  };
};

export const measureApiCall = (endpoint: string) => {
  return {
    start: () => performanceMonitor.startMeasure(`api-${endpoint}`),
    end: (metadata?: Record<string, any>) => performanceMonitor.endMeasure(`api-${endpoint}`, metadata)
  };
};

// React performance hook
export const usePerformanceMeasure = (componentName: string) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());

  useEffect(() => {
    const currentTime = performance.now();
    const renderTime = currentTime - lastRenderTime.current;
    
    renderCount.current += 1;
    performanceMonitor.addMetric({
      name: `render-count-${componentName}`,
      value: renderCount.current,
      timestamp: Date.now(),
      metadata: {
        renderTime,
        renderCount: renderCount.current
      }
    });

    lastRenderTime.current = currentTime;
  });
};

// Web Vitals monitoring
export const measureWebVitals = () => {
  if (typeof window !== 'undefined') {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        performanceMonitor.addMetric({
          name: 'lcp',
          value: entry.startTime,
          timestamp: Date.now(),
          metadata: {
            element: (entry as any).element?.tagName,
            size: (entry as any).size,
            url: (entry as any).url
          }
        });
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        performanceMonitor.addMetric({
          name: 'fid',
          value: (entry as any).processingStart - entry.startTime,
          timestamp: Date.now(),
          metadata: {
            name: entry.name,
            target: (entry as any).target?.tagName
          }
        });
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        performanceMonitor.addMetric({
          name: 'cls',
          value: (entry as any).value,
          timestamp: Date.now(),
          metadata: {
            sources: (entry as any).sources?.map((source: any) => ({
              node: source.node?.tagName,
              currentRect: source.currentRect,
              previousRect: source.previousRect
            }))
          }
        });
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }
}; 