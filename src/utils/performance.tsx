// Performance metrics tracking
export const trackPerformanceMetrics = () => {
    if (typeof window !== 'undefined') {
        // Track First Contentful Paint (FCP)
        const fcpObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('FCP:', entry.startTime);
                // Send to analytics
            }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Track Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('LCP:', entry.startTime);
                // Send to analytics
            }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Track First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('FID:', entry.processingStart - entry.startTime);
                // Send to analytics
            }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Track Cumulative Layout Shift (CLS)
        const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('CLS:', entry.value);
                // Send to analytics
            }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
};

// Image optimization
export const optimizeImage = (src: string, width: number, quality = 75) => {
    return `${src}?w=${width}&q=${quality}`;
};

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

interface CacheEntry<T> {
    value: T;
    expiry: number;
}

class CacheManager {
    private cache: Map<string, CacheEntry<any>> = new Map();

    set<T>(key: string, value: T, ttlSeconds: number): void {
        const expiry = Date.now() + ttlSeconds * 1000;
        this.cache.set(key, { value, expiry });
    }

    get<T>(key: string): T | null {
        const entry = this.cache.get(key);
        if (!entry) return null;

        if (Date.now() > entry.expiry) {
            this.cache.delete(key);
            return null;
        }

        return entry.value as T;
    }

    delete(key: string): void {
        this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }
}

export const cacheManager = new CacheManager();

interface PerformanceMetric {
    name: string;
    value: number;
    timestamp: number;
}

class PerformanceMonitor {
    private metrics: PerformanceMetric[] = [];
    private readonly maxMetrics = 1000;

    trackMetric(name: string, value: number): void {
        this.metrics.push({
            name,
            value,
            timestamp: Date.now()
        });

        // Keep only the last maxMetrics entries
        if (this.metrics.length > this.maxMetrics) {
            this.metrics = this.metrics.slice(-this.maxMetrics);
        }

        // Store in cache for real-time monitoring
        const cachedMetrics = cacheManager.get<PerformanceMetric[]>('performance_metrics') || [];
        cacheManager.set('performance_metrics', [...cachedMetrics, this.metrics[this.metrics.length - 1]], 3600);
    }

    getMetrics(name?: string): PerformanceMetric[] {
        return name
            ? this.metrics.filter(m => m.name === name)
            : this.metrics;
    }

    getAverageMetric(name: string): number {
        const metrics = this.getMetrics(name);
        if (metrics.length === 0) return 0;

        const sum = metrics.reduce((acc, m) => acc + m.value, 0);
        return sum / metrics.length;
    }

    clearMetrics(): void {
        this.metrics = [];
    }
}

export const performanceMonitor = new PerformanceMonitor(); 