import React from "react";

import type { Meta, StoryFn } from '@storybook/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { vi } from 'vitest';
import * as z from 'zod';

import BookingForm from '../components/BookingForm';
import { AuthContext } from '../context/AuthContext';
import { BookingContext } from '../context/BookingContext';


// Load Stripe using loadStripe utility
const _stripePromise = loadStripe('your-publishable-key-here'); // Replace with your actual Stripe publishable key

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        refresh: vi.fn(),
        forward: vi.fn(),
        beforePopState: vi.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js app router
const _appRouter = {
    back: vi.fn(),
    forward: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
};

const _bookingSchema = z.object({
    pickup: z.string().min(1, 'Pickup location is required'),
    destination: z.string().min(1, 'Destination is required'),
    startDate: z.date(),
    endDate: z.date(),
    vehicleType: z.string().min(1, 'Vehicle type is required')
});

type _BookingFormData = z.infer<typeof _bookingSchema>;

// Mock context providers wrapper
const ContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
    const _mockDispatch = vi.fn();
    const _mockUser = {
        id: '123',
        email: 'test@example.com',
    };

    const mockBookingState = {
        id: '1',
        pickupLocation: 'Mumbai',
        dropLocation: 'Pune',
        pickupDate: new Date(),
        dropDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        returnDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        vehicleType: 'Sedan',
        fare: 1000,
        customerId: '123',
        status: 'pending',
        contactName: 'Test User',
        contactEmail: 'test@example.com',
        contactPhone: '9876543210',
        passengers: 2,
        specialRequests: '',
        totalAmount: 1000
    };

    return (
        <AppRouterContext.Provider value={_appRouter}>
            <AuthContext.Provider value={{ user: _mockUser, status: 'authenticated', signIn: vi.fn(), signOut: vi.fn() }}>
                <BookingContext.Provider value={{ state: { ...mockBookingState, pickupDate: mockBookingState.pickupDate.toISOString(), returnDate: mockBookingState.dropDate.toISOString(), status: 'pending' }, dispatch: _mockDispatch }}>
                    <Elements stripe={_stripePromise}>
                        {children}
                    </Elements>
                </BookingContext.Provider>
            </AuthContext.Provider>
        </AppRouterContext.Provider>
    );
};

export default {
    title: 'Features/BookingForm',
    component: BookingForm,
    decorators: [
        (_Story): JSX.Element => (
            <ContextWrapper>
                <_Story />
            </ContextWrapper>
        ),
    ],
} as Meta<typeof BookingForm>;

const Template: StoryFn = (args) => <BookingForm {...args} />;

export const _Default = Template.bind({});
_Default.args = {};

export const _WithData = Template.bind({});
_WithData.args = {
    pickup: 'Mumbai',
    destination: 'Pune',
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    vehicleType: 'Sedan',
};

export const _WithValidationErrors = Template.bind({});
_WithValidationErrors.args = {
    pickup: '',
    destination: '',
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    vehicleType: '',
};
