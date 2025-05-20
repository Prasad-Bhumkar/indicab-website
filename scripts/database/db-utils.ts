import dotenv from 'dotenv';
import { connectDB } from '../../src/lib/db';

dotenv.config();

/**
 * MongoDB connection and testing utilities
 */

export interface ConnectionOptions {
  uri: string;
  retryAttempts: number;
  timeoutMs: number;
}

export const defaultOptions: ConnectionOptions = {

  uri: process.env.MONGODB_URI || '',
  retryAttempts: 3,
  timeoutMs: 5000,
};

/**
 * Tests the database connection
 */
export async function testConnection(_options: ConnectionOptions = defaultOptions): Promise<void> {
  try {
    console.log('Attempting to connect to database...');
    await connectDB();
    console.log('✅ Database connection successful');
    return;
  } catch (error) {
    console.error('❌ Database connection failed:', error instanceof Error ? error.message : error);
    throw error;
  }
}

/**
 * Validates MongoDB connection and provides troubleshooting information
 */
export async function validateConnection(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('\n❌ MONGODB_URI is not defined in your .env file');
    console.log('Please configure your MongoDB connection using one of these options:\n');
    printConnectionOptions();
    process.exit(1);
  }

  try {
    await testConnection();
    console.log('\n✅ MongoDB connection is properly configured and working\n');
  } catch (error) {
    console.error('\n❌ MongoDB connection failed. Here are your options to resolve the issue:\n');
    printConnectionOptions();
    throw error;
  }
}

/**
 * Prints MongoDB connection setup options
 */
function printConnectionOptions(): void {
  console.log('Option 1: Install and start MongoDB locally');
  console.log('  - Download MongoDB Community Server from: https://www.mongodb.com/try/download/community');
  console.log('  - Install MongoDB following the installation guide');
  console.log('  - Start MongoDB service');
  console.log('  - If using localhost, update your .env with: MONGODB_URI=mongodb://localhost:27017/indicab-test\n');

  console.log('Option 2: Use MongoDB Atlas (cloud-hosted MongoDB)');
  console.log('  - Create a free MongoDB Atlas account: https://www.mongodb.com/cloud/atlas/register');
  console.log('  - Set up a new cluster');
  console.log('  - Get your connection string from Atlas');
  console.log('  - Update your .env file with the new connection string');
  console.log('  - Example: MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/indicab-test\n');

  console.log('Option 3: Use Docker to run MongoDB');
  console.log('  - Install Docker from: https://www.docker.com/products/docker-desktop/');
  console.log('  - Run MongoDB in a container:');
  console.log('    docker run -d -p 27017:27017 --name mongodb mongo:latest');
  console.log('  - Update your .env with: MONGODB_URI=mongodb://localhost:27017/indicab-test\n');

  console.log('After setting up MongoDB using one of these options, run the connection test again:');
  console.log('  npm run test:db\n');

  console.log('For more information, refer to the MongoDB documentation:');
  console.log('  https://www.mongodb.com/docs/\n');
}

// Command-line interface
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'test':
      testConnection().catch(() => process.exit(1));
      break;
    case 'validate':
      validateConnection().catch(() => process.exit(1));
      break;
    default:
      console.log('Usage: ts-node db-utils.ts [test|validate]');
      process.exit(1);
  }
} 