// Database test with verified paths
const { connectDB } = require('../src/lib/db.ts');

async function testConnection() {
  try {
    console.log('Attempting to connect to database...');
    await connectDB();
    console.log('✅ Database connection successful');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

testConnection();