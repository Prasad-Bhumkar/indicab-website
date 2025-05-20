import React from 'react';

import { vi } from 'vitest';

// Mock implementation of next/navigation's useRouter hook
const mockRouter = {
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn().mockResolvedValue(undefined),
    push: vi.fn().mockResolvedValue(true),
    replace: vi.fn().mockResolvedValue(true),
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    isFallback: false,
    isReady: true,
    basePath: '',
    locale: undefined,
    locales: undefined,
    defaultLocale: undefined,
    events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
    },
    beforePopState: vi.fn(),
    isPreview: false,
    isLocaleDomain: false,
};

// Mock the 'next/navigation' module's useRouter hook
vi.mock('next/navigation', () => ({
    useRouter: () => mockRouter,
}));

export const NextRouterMockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>;
};

// Hook to use the mocked router in components
export function useRouter() {
    return mockRouter;
}
