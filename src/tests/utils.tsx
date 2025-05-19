import type { ReactElement } from 'react';

import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';


import { TestProviders } from './setup';

// Custom render function that includes providers
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: TestProviders, ...options });
}

// Mock data generators
export const generateMockUser = (overrides = {}) => ({
  id: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  ...overrides,
});

export const generateMockSession = (overrides = {}) => ({
  user: generateMockUser(),
  expires: '2025-01-01',
  ...overrides,
});

// Mock API response helpers
export const mockApiSuccess = (data: unknown, status = 200) => {
  return {
    ok: true,
    status,
    json: () => Promise.resolve(data),
  };
};

export const mockApiError = (error: string, status = 500) => {
  return {
    ok: false,
    status,
    json: () => Promise.resolve({ error }),
  };
};

// Test data
export const testData = {
  user: generateMockUser(),
  session: generateMockSession(),
  booking: {
    id: 'test-booking-id',
    userId: 'test-user-id',
    status: 'pending',
    pickupLocation: {
      address: '123 Test St',
      coordinates: [0, 0],
    },
    dropoffLocation: {
      address: '456 Test Ave',
      coordinates: [1, 1],
    },
    createdAt: new Date().toISOString(),
  },
  vehicle: {
    id: 'test-vehicle-id',
    type: 'sedan',
    model: 'Test Model',
    licensePlate: 'TEST123',
    status: 'available',
  },
};

// Custom matchers
export const customMatchers = {
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
};

// Mock router
export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
};

// Mock navigation
export const mockNavigation = {
  useRouter: () => mockRouter,
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
};

// Mock session
export const mockSession = {
  data: {
    user: testData.user,
    expires: '2025-01-01',
  },
  status: 'authenticated',
};

// Mock Stripe
export const mockStripe = {
  elements: jest.fn(),
  createPaymentMethod: jest.fn(),
  confirmCardPayment: jest.fn(),
  confirmCardSetup: jest.fn(),
  createToken: jest.fn(),
  createSource: jest.fn(),
  retrieveSource: jest.fn(),
  retrievePaymentIntent: jest.fn(),
};

// Helper to wait for async operations
export const waitForAsync = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to mock IntersectionObserver
export const mockIntersectionObserver = {
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
};

// Helper to mock ResizeObserver
export const mockResizeObserver = {
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
};

// Helper to mock window.matchMedia
export const mockMatchMedia = (matches = true) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}; 