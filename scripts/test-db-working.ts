// @ts-check
import 'ts-node/register';
import { connectDB } from '../src/lib/db';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    await connectDB();
    console.log('✅ Database connection successful');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

testConnection();