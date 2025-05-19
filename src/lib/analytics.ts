import posthog from 'posthog-js';

import { AnalyticsEvent } from '../models/AnalyticsEvent';

import { connectDB } from "./db";

// Initialize PostHog
if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        capture_pageview: false, // We'll handle pageviews manually
        capture_pageleave: true,
        loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') {
                posthog.debug();
            }
        },
    });
}

// Helper function to store event in database
const storeEventInDB = async (event: {
    category: string;
    action: string;
    label?: string;
    value?: number;
    userId?: string;
    userRole?: string;
    userType?: string;
    properties?: Record<string, unknown>;
}): Promise<void> => {
    try {
        await connectDB();
        await AnalyticsEvent.create({
            ...event,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('Failed to store analytics event in database:', error);
    }
};

// Track page views
export const trackPageView = async (path: string): Promise<void> => {
    try {
        // Track in PostHog
        posthog.capture('$pageview', {
            path,
            timestamp: new Date().toISOString(),
        });

        // Store in database
        await storeEventInDB({
            category: 'Page',
            action: 'View',
            label: path,
            properties: { path }
        });
    } catch (error) {
        console.error('Failed to track page view:', error);
    }
};

// Track vehicle status changes
export const trackVehicleStatus = async (vehicleId: string, newStatus: string): Promise<void> => {
    try {
        // Track in PostHog
        posthog.capture('vehicle_status_changed', {
            vehicle_id: vehicleId,
            new_status: newStatus,
            timestamp: new Date().toISOString(),
        });

        // Store in database
        await storeEventInDB({
            category: 'Vehicle',
            action: 'Status Change',
            label: newStatus,
            properties: { vehicleId, newStatus }
        });
    } catch (error) {
        console.error('Failed to track vehicle status:', error);
    }
};

// Track driver status changes
export const trackDriverStatus = async (driverId: string, newStatus: string): Promise<void> => {
    try {
        // Track in PostHog
        posthog.capture('driver_status_changed', {
            driver_id: driverId,
            new_status: newStatus,
            timestamp: new Date().toISOString(),
        });

        // Store in database
        await storeEventInDB({
            category: 'Driver',
            action: 'Status Change',
            label: newStatus,
            properties: { driverId, newStatus }
        });
    } catch (error) {
        console.error('Failed to track driver status:', error);
    }
};

// Track user actions
export const trackUserAction = async (
    action: string,
    properties?: Record<string, string | number | boolean>
): Promise<void> => {
    try {
        // Track in PostHog
        posthog.capture(action, {
            ...properties,
            timestamp: new Date().toISOString(),
        });

        // Store in database
        await storeEventInDB({
            category: 'User',
            action,
            properties
        });
    } catch (error) {
        console.error('Failed to track user action:', error);
    }
};

// Track errors
export const trackError = async (
    error: Error,
    context?: Record<string, string | number | boolean>
): Promise<void> => {
    try {
        // Track in PostHog
        posthog.capture('error_occurred', {
            error_name: error.name,
            error_message: error.message,
            error_stack: error.stack,
            ...context,
            timestamp: new Date().toISOString(),
        });

        // Store in database
        await storeEventInDB({
            category: 'Error',
            action: error.name,
            label: error.message,
            properties: {
                stack: error.stack,
                ...context
            }
        });
    } catch (err) {
        console.error('Failed to track error:', err);
    }
};

// Track maintenance events
export const trackMaintenanceEvent = async (
    vehicleId: string,
    maintenanceType: string,
    cost: number,
    technician: string
): Promise<void> => {
    try {
        // Track in PostHog
        posthog.capture('maintenance_event', {
            vehicle_id: vehicleId,
            maintenance_type: maintenanceType,
            cost,
            technician,
            timestamp: new Date().toISOString(),
        });

        // Store in database
        await storeEventInDB({
            category: 'Maintenance',
            action: maintenanceType,
            value: cost,
            properties: { vehicleId, technician }
        });
    } catch (error) {
        console.error('Failed to track maintenance event:', error);
    }
};

// Track trip events
export const trackTripEvent = async (
    tripId: string,
    driverId: string,
    vehicleId: string,
    fare: number,
    duration: number
): Promise<void> => {
    try {
        // Track in PostHog
        posthog.capture('trip_completed', {
            trip_id: tripId,
            driver_id: driverId,
            vehicle_id: vehicleId,
            fare,
            duration,
            timestamp: new Date().toISOString(),
        });

        // Store in database
        await storeEventInDB({
            category: 'Trip',
            action: 'Completed',
            value: fare,
            properties: { tripId, driverId, vehicleId, duration }
        });
    } catch (error) {
        console.error('Failed to track trip event:', error);
    }
};

// Track search events
export const trackSearch = async (
    query: string,
    filters?: Record<string, string | number | boolean>
): Promise<void> => {
    try {
        // Track in PostHog
        posthog.capture('search_performed', {
            query,
            filters,
            timestamp: new Date().toISOString(),
        });

        // Store in database
        await storeEventInDB({
            category: 'Search',
            action: 'Performed',
            label: query,
            properties: { filters }
        });
    } catch (error) {
        console.error('Failed to track search:', error);
    }
};

// Track filter changes
export const trackFilterChange = async (filterType: string, value: string): Promise<void> => {
    try {
        // Track in PostHog
        posthog.capture('filter_changed', {
            filter_type: filterType,
            value,
            timestamp: new Date().toISOString(),
        });

        // Store in database
        await storeEventInDB({
            category: 'Filter',
            action: 'Changed',
            label: filterType,
            properties: { value }
        });
    } catch (error) {
        console.error('Failed to track filter change:', error);
    }
};

// Track user identification
export const identifyUser = async (
    userId: string,
    traits?: Record<string, string | number | boolean>
): Promise<void> => {
    try {
        // Track in PostHog
        posthog.identify(userId, traits);

        // Store in database
        await storeEventInDB({
            category: 'User',
            action: 'Identified',
            userId,
            properties: traits
        });
    } catch (error) {
        console.error('Failed to identify user:', error);
    }
};

// Track user reset
export const resetUser = async (): Promise<void> => {
    try {
        // Track in PostHog
        posthog.reset();

        // Store in database
        await storeEventInDB({
            category: 'User',
            action: 'Reset'
        });
    } catch (error) {
        console.error('Failed to reset user:', error);
    }
}; 