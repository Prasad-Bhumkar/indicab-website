import { connectDB } from '../src/lib/db';

async function testConnection() {
  try {
    console.log('Attempting to connect to database...');
    await connectDB();
    console.log('✅ Database connection successful');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

testConnection();