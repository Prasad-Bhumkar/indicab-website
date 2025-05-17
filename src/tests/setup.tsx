import '@testing-library/jest-dom';
import React from 'react';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { SessionProvider } from 'next-auth/react';

// Mock Stripe
vi.mock('@stripe/stripe-js', () => ({
    loadStripe: vi.fn(() => Promise.resolve({
        elements: vi.fn(),
        createPaymentMethod: vi.fn(),
    })),
}));

// Mock next-auth session
vi.mock('next-auth/react', (): JSX.Element => ({
    SessionProvider: ({ children }: { children: React.ReactNode }): JSX.Element => (
        <div>{children}</div>
    ),
    useSession: () => ({
        data: {
            user: {
                name: 'Test User',
                email: 'test@example.com',
            },
            expires: '2025-01-01',
        },
        status: 'authenticated',
    }),
}));

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

// Test provider component
const _TestProviders = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <SessionProvider
            session={{
                user: { name: 'Test User', email: 'test@example.com' },
                expires: '2025-01-01',
            }}
        >
            {children}
        </SessionProvider>
    );
};

export { _TestProviders };
