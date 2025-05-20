process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
process.env.SKIP_DB_CONNECTION = 'true';
process.env.NODE_ENV = 'test';

import 'vitest-dom/extend-expect';

import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';

// Mock Next.js App Router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '',
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
  }),
}));

let connectDB: any;
beforeAll(async () => {
  connectDB = (await import('../lib/db')).connectDB;
  await connectDB();
  console.log('✅ Connected to test database');
});

afterAll(async () => {
  await mongoose.connection.close();
  console.log('✅ Closed database connection');
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterEach(async () => {
  // Additional cleanup if needed
});

// Optionally export test utilities if needed
export const testConfig = {
  timeout: 10000,
  database: {
    url: process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/indicab-test',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  api: {
    baseUrl: process.env.TEST_API_URL || 'http://localhost:3000/api',
    timeout: 5000
  }
};

export const testUtils = {
  clearCollection: async (collectionName: string) => {
    const collection = mongoose.connection.collections[collectionName];
    if (collection) {
      await collection.deleteMany({});
    }
  },
  createTestData: async (model: any, data: any) => {
    return await model.create(data);
  },
  cleanupTestData: async (model: any, query: any) => {
    await model.deleteMany(query);
  }
}; 