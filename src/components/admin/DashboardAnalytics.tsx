'use client';

import { trackEvent } from '@/utils/analytics';
import { usePerformanceMonitor } from '@/utils/performance';
import { useEffect, useState } from 'react';

interface MetricCard {
    title: string;
    value: number;
    change: number;
    trend: 'up' | 'down';
}

export const DashboardAnalytics = () => {
    const { metrics } = usePerformanceMonitor();
    const [analytics, setAnalytics] = useState<MetricCard[]>([]);

    useEffect(() => {
        // Track component view
        trackEvent({
            category: 'Dashboard',
            action: 'View Analytics',
        });

        // Transform metrics into analytics cards
        const transformedMetrics = Object.entries(metrics).map(([key, value]) => ({
            title: key,
            value: value.current,
            change: value.change,
            trend: value.change >= 0 ? 'up' : 'down'
        }));
        setAnalytics(transformedMetrics);
    }, [metrics]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analytics.map((metric) => (
                <div
                    key={metric.title}
                    className="bg-white p-4 rounded-lg shadow"
                    onClick={() => trackEvent({
                        category: 'Dashboard',
                        action: 'Click Metric',
                        label: metric.title
                    })}
                >
                    <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                        {metric.value}
                    </p>
                    <div className="mt-2 flex items-center">
                        <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.change}%
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}; 