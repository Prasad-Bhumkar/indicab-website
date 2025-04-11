// Simple database connection test
// Load environment variables
require('dotenv').config();

// Configure ts-node to handle TypeScript imports
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'CommonJS'
  }
});
const { connectDB } = require('../src/lib/db');

async function testConnection() {
  try {
    await connectDB();
    console.log('✅ Database connection successful');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

testConnection();