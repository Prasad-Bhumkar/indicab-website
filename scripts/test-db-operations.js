// Load environment variables
require('node:dotenv').config();

// Configure ts-node to handle TypeScript imports
require('node:ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'CommonJS'
  }
});
const { connectDB } = require('../src/lib/db');
const User = require('../src/models/User');

async function testDatabase() {
  try {
    await connectDB();
    console.log('✅ Connected to database');

    // Test user creation
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123'
    });
    await user.save();
    console.log('✅ Created test user:', user.email);

    // Test user retrieval
    const foundUser = await User.findOne({ email: 'test@example.com' });
    console.log('✅ Retrieved user:', foundUser.email);

    console.log('✅ All database tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    process.exit(0);
  }
}

testDatabase();