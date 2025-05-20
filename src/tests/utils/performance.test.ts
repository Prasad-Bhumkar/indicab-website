import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { measureApiCall, measureComponentRender, performanceMonitor, usePerformanceMeasure } from '@/utils/performance';

describe('PerformanceMonitor', () => {
  beforeEach(() => {
    performanceMonitor.clearMetrics();
  });

  it('tracks metrics correctly', () => {
    performanceMonitor.startMeasure('test-metric');
    performanceMonitor.endMeasure('test-metric', { test: 'data' });

    const metrics = performanceMonitor.getMetrics('test-metric');
    expect(metrics).toHaveLength(1);
    expect(metrics[0].name).toBe('test-metric');
    expect(metrics[0].metadata).toEqual({ test: 'data' });
  });

  it('calculates average metrics correctly', () => {
    performanceMonitor.startMeasure('test-metric');
    performanceMonitor.endMeasure('test-metric');
    performanceMonitor.startMeasure('test-metric');
    performanceMonitor.endMeasure('test-metric');

    const average = performanceMonitor.getAverageMetric('test-metric');
    expect(average).toBeGreaterThan(0);
  });

  it('calculates percentile metrics correctly', () => {
    // Add multiple metrics with different values
    for (let i = 1; i <= 10; i++) {
      performanceMonitor.addMetric({
        name: 'test-metric',
        value: i,
        timestamp: Date.now()
      });
    }

    const p50 = performanceMonitor.getPercentileMetric('test-metric', 50);
    const p90 = performanceMonitor.getPercentileMetric('test-metric', 90);

    expect(p50).toBe(5);
    expect(p90).toBe(9);
  });

  it('limits the number of stored metrics', () => {
    const maxMetrics = 1000;
    for (let i = 0; i < maxMetrics + 100; i++) {
      performanceMonitor.addMetric({
        name: 'test-metric',
        value: i,
        timestamp: Date.now()
      });
    }

    expect(performanceMonitor.getMetrics('test-metric')).toHaveLength(maxMetrics);
  });
});

describe('Component Performance Measurement', () => {
  it('measures component render time', () => {
    const { start, end } = measureComponentRender('TestComponent');
    start();
    end({ props: { test: true } });

    const metrics = performanceMonitor.getMetrics('render-TestComponent');
    expect(metrics).toHaveLength(1);
    expect(metrics[0].metadata).toEqual({ props: { test: true } });
  });
});

describe('API Performance Measurement', () => {
  it('measures API call duration', () => {
    const { start, end } = measureApiCall('/api/test');
    start();
    end({ status: 200 });

    const metrics = performanceMonitor.getMetrics('api-/api/test');
    expect(metrics).toHaveLength(1);
    expect(metrics[0].metadata).toEqual({ status: 200 });
  });
});

describe('usePerformanceMeasure Hook', () => {
  it('tracks component render count and time', () => {
    const { result } = renderHook(() => usePerformanceMeasure('TestComponent'));

    // Force a re-render
    result.current;

    const metrics = performanceMonitor.getMetrics('render-count-TestComponent');
    expect(metrics).toHaveLength(1);
    expect(metrics[0].metadata).toHaveProperty('renderTime');
    expect(metrics[0].metadata).toHaveProperty('renderCount');
  });
});

describe('Web Vitals', () => {
  it('initializes web vitals observers', () => {
    const mockObserver = vi.fn();
    global.PerformanceObserver = vi.fn().mockImplementation(mockObserver);

    // Call the function that initializes web vitals
    require('@/utils/performance').measureWebVitals();

    // Verify that PerformanceObserver was called for each web vital
    expect(mockObserver).toHaveBeenCalledTimes(3);
  });
});

performanceMonitor.addMetric({
  name: 'test-metric',
  value: 123,
  timestamp: Date.now(),
  metadata: { test: true }
});

performanceMonitor.addMetric({
  name: 'test-metric-2',
  value: 456,
  timestamp: Date.now(),
  metadata: { test: true }
}); 