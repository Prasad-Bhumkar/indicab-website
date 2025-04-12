// MongoDB Connection and Troubleshooting Script
require('dotenv').config();
const mongoose = require('mongoose');

console.log('\n=== MongoDB Connection Diagnostics ===\n');

// Check if MONGODB_URI is defined
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌ MONGODB_URI is not defined in your .env file');
  console.log('  Please make sure you have a .env file with MONGODB_URI defined');
  process.exit(1);
}

console.log(`🔍 Attempting to connect to: ${uri}`);

async function testMongoDBConnection() {
  try {
    // Set shorter timeouts for faster feedback
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // 5 seconds
      socketTimeoutMS: 5000,
      connectTimeoutMS: 5000
    });
    
    console.log('\n✅ Connection successful!');
    console.log(`  Connected to: ${mongoose.connection.host}:${mongoose.connection.port}`);
    console.log(`  Database name: ${mongoose.connection.name}`);
    
    // Check if we can perform a simple operation
    const adminDb = mongoose.connection.db.admin();
    const serverInfo = await adminDb.serverInfo();
    console.log(`  MongoDB version: ${serverInfo.version}`);
    
    console.log('\n🟢 Your MongoDB connection is working properly!\n');
  } catch (error) {
    console.error('\n❌ Connection failed!');
    
    if (error.name === 'MongooseServerSelectionError') {
      if (error.message.includes('ECONNREFUSED')) {
        console.log('\n🔍 Diagnosis: MongoDB server is not running or not accessible at the specified address');
        console.log('\n📋 Possible solutions:');
        console.log('  1. Install and start MongoDB locally:');
        console.log('     - Download: https://www.mongodb.com/try/download/community');
        console.log('     - After installation, start the MongoDB service');
        
        console.log('\n  2. Use MongoDB Atlas (cloud-hosted):');
        console.log('     - Create account: https://www.mongodb.com/cloud/atlas/register');
        console.log('     - Set up a cluster and update your connection string');
        console.log('     - Update .env with: MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/indicab-test');
        
        console.log('\n  3. Use Docker to run MongoDB:');
        console.log('     - Install Docker: https://www.docker.com/products/docker-desktop/');
        console.log('     - Run: docker run -d -p 27017:27017 --name mongodb mongo:latest');
      } else if (error.message.includes('authentication failed')) {
        console.log('\n🔍 Diagnosis: Authentication failed - incorrect username or password');
        console.log('\n📋 Solution: Check your connection string username and password');
      } else {
        console.log('\n🔍 Diagnosis: Server selection error');
        console.log(`\n📋 Error details: ${error.message}`);
      }
    } else {
      console.log(`\n🔍 Error type: ${error.name}`);
      console.log(`\n📋 Error details: ${error.message}`);
    }
    
    console.log('\n📚 For more help, visit: https://www.mongodb.com/docs/\n');
  } finally {
    // Close connection if it was established
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(0);
  }
}
testMongoDBConnection();
