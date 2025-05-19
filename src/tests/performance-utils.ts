import { performance } from 'perf_hooks';

// Performance measurement utilities
export const measurePerformance = async <T>(
  fn: () => Promise<T>,
  iterations = 1
): Promise<{
  result: T;
  averageTime: number;
  minTime: number;
  maxTime: number;
}> => {
  const times: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    times.push(end - start);
  }

  const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);

  return {
    result: await fn(),
    averageTime,
    minTime,
    maxTime,
  };
};

// Memory usage measurement
export const measureMemoryUsage = () => {
  const used = process.memoryUsage();
  return {
    rss: `${Math.round(used.rss / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)}MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)}MB`,
    external: `${Math.round(used.external / 1024 / 1024)}MB`,
  };
};

// Component render performance
export const measureRenderPerformance = async (
  renderFn: () => Promise<void>,
  iterations = 100
) => {
  const times: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await renderFn();
    const end = performance.now();
    times.push(end - start);
  }

  return {
    averageRenderTime: times.reduce((a, b) => a + b, 0) / times.length,
    minRenderTime: Math.min(...times),
    maxRenderTime: Math.max(...times),
    p95RenderTime: times.sort((a, b) => a - b)[Math.floor(iterations * 0.95)],
  };
};

// API response time measurement
export const measureApiResponseTime = async (
  apiCall: () => Promise<Response>,
  iterations = 10
) => {
  const times: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await apiCall();
    const end = performance.now();
    times.push(end - start);
  }

  return {
    averageResponseTime: times.reduce((a, b) => a + b, 0) / times.length,
    minResponseTime: Math.min(...times),
    maxResponseTime: Math.max(...times),
    p95ResponseTime: times.sort((a, b) => a - b)[Math.floor(iterations * 0.95)],
  };
};

// Performance expectations
export const expectPerformance = {
  toBeFasterThan: (actual: number, expected: number) => {
    expect(actual).toBeLessThan(expected);
  },
  toBeWithinRange: (actual: number, min: number, max: number) => {
    expect(actual).toBeGreaterThanOrEqual(min);
    expect(actual).toBeLessThanOrEqual(max);
  },
  toHaveConsistentPerformance: (times: number[], threshold = 0.2) => {
    const average = times.reduce((a, b) => a + b, 0) / times.length;
    const variance = times.reduce((a, b) => a + Math.pow(b - average, 2), 0) / times.length;
    const standardDeviation = Math.sqrt(variance);
    const coefficientOfVariation = standardDeviation / average;
    
    expect(coefficientOfVariation).toBeLessThan(threshold);
  },
}; 