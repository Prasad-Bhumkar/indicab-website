// MongoDB Connection Options Script
require('dotenv').config();
// Using mongoose directly instead of importing from TypeScript module
const mongoose = require('mongoose');

/**
 * This script provides options for resolving MongoDB connection issues
 */

console.log('\n=== MongoDB Connection Troubleshooting ===\n');

// Check if MONGODB_URI is defined
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌ MONGODB_URI is not defined in your .env file');
  console.log('  Please make sure you have a .env file with MONGODB_URI defined');
  process.exit(1);
}

console.log(`🔍 Found MongoDB URI: ${uri}`);
console.log('Here are your options to resolve MongoDB connection issues:\n');

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
console.log('  node scripts/mongodb-connection-helper.js\n');

console.log('For more information, refer to the MongoDB documentation:');
console.log('  https://www.mongodb.com/docs/\n');