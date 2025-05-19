import { Analytics } from '@vercel/analytics/react';
import type { ReactNode } from 'react';

interface AnalyticsEvent {
    category: string;
    action: string;
    label?: string;
    value?: number;
    nonInteraction?: boolean;
    transport?: 'beacon' | 'xhr' | 'image';
}

interface UserProperties {
    userId?: string;
    userRole?: string;
    userType?: string;
}

class Analytics {
    private static instance: Analytics;
    private queue: AnalyticsEvent[] = [];
    private userProperties: UserProperties = {};

    private constructor() {
        // Initialize analytics
        this.setupErrorTracking();
    }

    public static getInstance(): Analytics {
        if (!Analytics.instance) {
            Analytics.instance = new Analytics();
        }
        return Analytics.instance;
    }

    private setupErrorTracking() {
        window.addEventListener('error', (event) => {
            this.trackEvent({
                category: 'Error',
                action: 'Unhandled Error',
                label: event.message,
                nonInteraction: true
            });
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.trackEvent({
                category: 'Error',
                action: 'Unhandled Promise Rejection',
                label: event.reason?.message || 'Unknown error',
                nonInteraction: true
            });
        });
    }

    public setUserProperties(properties: UserProperties) {
        this.userProperties = { ...this.userProperties, ...properties };
    }

    public trackEvent(event: AnalyticsEvent) {
        // Add user properties to event
        const enrichedEvent = {
            ...event,
            ...this.userProperties,
            timestamp: new Date().toISOString()
        };

        // Add to queue
        this.queue.push(enrichedEvent);

        // Process queue
        this.processQueue();

        // Log in development
        if (process.env.NODE_ENV === 'development') {
            console.log('Analytics Event:', enrichedEvent);
        }
    }

    private async processQueue() {
        if (this.queue.length === 0) return;

        try {
            const events = [...this.queue];
            this.queue = [];

            // Send events to analytics endpoint
            await fetch('/api/analytics/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ events }),
            });
        } catch (error) {
            console.error('Error sending analytics events:', error);
            // Put events back in queue
            this.queue = [...this.queue, ...this.queue];
        }
    }

    public trackPageView(path: string) {
        this.trackEvent({
            category: 'Page',
            action: 'View',
            label: path,
            nonInteraction: true
        });
    }

    public trackUserAction(action: string, label?: string) {
        this.trackEvent({
            category: 'User',
            action,
            label
        });
    }

    public trackError(error: Error, context?: string) {
        this.trackEvent({
            category: 'Error',
            action: error.name,
            label: `${context ? context + ': ' : ''}${error.message}`,
            nonInteraction: true
        });
    }
}

export const analytics = Analytics.getInstance();

export const trackEvent = (event: AnalyticsEvent) => {
    analytics.trackEvent(event);
};

export const trackPageView = (path: string) => {
    analytics.trackPageView(path);
};

export const trackUserAction = (action: string, label?: string) => {
    analytics.trackUserAction(action, label);
};

export const trackError = (error: Error, context?: string) => {
    analytics.trackError(error, context);
};

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}; 