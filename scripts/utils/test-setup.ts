import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';
import { connectDB } from '../../src/lib/db';

/**
 * Global test setup and teardown
 */

// Setup before all tests
beforeAll(async () => {
  // Connect to test database
  await connectDB();
  console.log('✅ Connected to test database');
});

// Cleanup after all tests
afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
  console.log('✅ Closed database connection');
});

// Setup before each test
beforeEach(async () => {
  // Clear all collections
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Cleanup after each test
afterEach(async () => {
  // Additional cleanup if needed
});

/**
 * Test environment configuration
 */
export const testConfig = {
  // Test timeouts
  timeout: 10000,
  
  // Test database options
  database: {
    url: process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/indicab-test',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  
  // Test API configuration
  api: {
    baseUrl: process.env.TEST_API_URL || 'http://localhost:3000/api',
    timeout: 5000
  }
};

/**
 * Test utilities
 */
export const testUtils = {
  // Clear specific collection
  clearCollection: async (collectionName: string) => {
    const collection = mongoose.connection.collections[collectionName];
    if (collection) {
      await collection.deleteMany({});
    }
  },
  
  // Create test data
  createTestData: async (model: any, data: any) => {
    return await model.create(data);
  },
  
  // Clean up test data
  cleanupTestData: async (model: any, query: any) => {
    await model.deleteMany(query);
  }
}; 