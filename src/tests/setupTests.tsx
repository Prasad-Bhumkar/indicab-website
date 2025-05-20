import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { vi } from 'vitest';
import 'vitest-dom/extend-expect';

// Mock process.env for tests
process.env.SKIP_DB_CONNECTION = 'true';
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

// Setup browser globals
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: []
}));

// Mock fetch API
global.fetch = vi.fn();

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
    dispatchEvent: vi.fn()
  }))
});

// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  captureMessage: vi.fn(),
  captureEvent: vi.fn(),
  withScope: vi.fn(callback => callback({ setExtras: vi.fn(), setTags: vi.fn() })),
  configureScope: vi.fn(),
  startTransaction: vi.fn(() => ({
    finish: vi.fn(),
    setName: vi.fn(),
    setData: vi.fn()
  })),
  Severity: {
    Error: 'error',
    Warning: 'warning',
    Info: 'info'
  }
}));

// Mock Vercel Analytics and Speed Insights
vi.mock('@vercel/analytics/react', () => ({
  Analytics: ({ children }) => children
}));

vi.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: ({ children }) => children
}));

// Mock MongoDB/Mongoose
vi.mock('mongoose', () => {
  const mongoose = {
    connect: vi.fn().mockResolvedValue({}),
    disconnect: vi.fn().mockResolvedValue({}),
    Schema: vi.fn(),
    model: vi.fn().mockReturnValue({
      findOne: vi.fn().mockResolvedValue({}),
      find: vi.fn().mockResolvedValue([]),
      create: vi.fn().mockResolvedValue({}),
    }),
    connection: {
      db: {
        admin: vi.fn().mockReturnValue({
          ping: vi.fn().mockResolvedValue(true)
        })
      }
    }
  };
  return mongoose;
});

// Mock for leaflet and other mapping libraries
vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(() => ({
      setView: vi.fn(),
      remove: vi.fn()
    })),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn()
    })),
    marker: vi.fn(() => ({
      addTo: vi.fn()
    })),
    icon: vi.fn().mockReturnValue({}),
    latLngBounds: vi.fn().mockReturnValue({
      extend: vi.fn()
    })
  }
}));

vi.mock('react-leaflet', () => ({
  MapContainer: vi.fn().mockImplementation(({ children }) => (
    <div data-testid="map-container">{children}</div>
  )),
  TileLayer: vi.fn().mockImplementation(() => <div data-testid="tile-layer" />),
  Marker: vi.fn().mockImplementation(({ children }) => (
    <div data-testid="marker">{children}</div>
  )),
  Popup: vi.fn().mockImplementation(({ children }) => (
    <div data-testid="popup">{children}</div>
  ))
}));

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

// Add global timeout for all tests
vi.setConfig({
  testTimeout: 10000
}); 