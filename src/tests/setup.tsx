import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SessionProvider } from 'next-auth/react';

import React from 'react';

import { afterEach, expect, vi } from 'vitest';

// Mock Stripe
vi.mock('@stripe/stripe-js', () => ({
    loadStripe: vi.fn(() => Promise.resolve({
        elements: vi.fn(),
        createPaymentMethod: vi.fn(),
        confirmCardPayment: vi.fn(),
        confirmCardSetup: vi.fn(),
        createToken: vi.fn(),
        createSource: vi.fn(),
        retrieveSource: vi.fn(),
        retrievePaymentIntent: vi.fn(),
    })),
}));

// Mock next-auth session
vi.mock('next-auth/react', () => ({
    SessionProvider: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    useSession: () => ({
        data: {
            user: {
                name: 'Test User',
                email: 'test@example.com',
                id: 'test-user-id',
                role: 'user',
            },
            expires: '2025-01-01',
        },
        status: 'authenticated',
    }),
    signIn: vi.fn(),
    signOut: vi.fn(),
}));

// Mock next/router
vi.mock('next/router', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        pathname: '/',
        query: {},
        asPath: '/',
        events: {
            on: vi.fn(),
            off: vi.fn(),
            emit: vi.fn(),
        },
    }),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        pathname: '/',
        query: {},
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
    useParams: () => ({}),
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock ResizeObserver
const mockResizeObserver = vi.fn();
mockResizeObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
});
window.ResizeObserver = mockResizeObserver;

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Cleanup after each test case
afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    mockFetch.mockClear();
});

// Test provider component
export const TestProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider
            session={{
                user: { 
                    name: 'Test User', 
                    email: 'test@example.com',
                    id: 'test-user-id',
                    role: 'user',
                },
                expires: '2025-01-01',
            }}
        >
            {children}
        </SessionProvider>
    );
};

// Custom render function with providers
export const renderWithProviders = (ui: React.ReactElement) => {
    const user = userEvent.setup();
    return {
        user,
        ...render(ui, { wrapper: TestProviders }),
    };
};

// Mock data
export const mockUser = {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
};

export const mockSession = {
    user: mockUser,
    expires: '2025-01-01',
};

// Helper functions
export const mockApiResponse = (data: unknown, status = 200) => {
    mockFetch.mockResolvedValueOnce({
        ok: status >= 200 && status < 300,
        status,
        json: () => Promise.resolve(data),
    });
};

export const mockApiError = (error: string, status = 500) => {
    mockFetch.mockResolvedValueOnce({
        ok: false,
        status,
        json: () => Promise.resolve({ error }),
    });
};

// Global test providers
const customRender = (ui: React.ReactElement, options = {}) => {
    return {
        ...render(
            <SessionProvider session={null}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {ui}
                    <Toaster />
                </ThemeProvider>
            </SessionProvider>
        ),
    };
};

// Override render method
export { customRender as render };
