import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { performanceMonitor } from './performance';

interface LazyLoadResult {
    loading: () => ReactNode;
    error: (error: Error) => ReactNode;
    component: () => Promise<any>;
}

// Component lazy loading
export const lazyLoad = (importFn: () => Promise<any>): LazyLoadResult => {
    return {
        loading: () => <div>Loading...</div>,
        error: (error: Error) => <div>Error: {error.message}</div>,
        component: importFn,
    };
};

// React hook for performance monitoring
export function usePerformanceMonitoring() {
    useEffect(() => {
        // Track page load time
        const pageLoadTime = performance.now();
        performanceMonitor.trackMetric('page_load_time', pageLoadTime);

        // Track memory usage
        if (performance.memory) {
            const memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
            performanceMonitor.trackMetric('memory_usage', memoryUsage);
        }

        // Track FPS
        let frameCount = 0;
        let lastTime = performance.now();
        const fpsInterval = setInterval(() => {
            const currentTime = performance.now();
            const elapsed = currentTime - lastTime;
            frameCount++;

            if (elapsed >= 1000) {
                const fps = Math.round((frameCount * 1000) / elapsed);
                performanceMonitor.trackMetric('fps', fps);
                frameCount = 0;
                lastTime = currentTime;
            }
        }, 1000);

        return () => {
            clearInterval(fpsInterval);
        };
    }, []);
} 