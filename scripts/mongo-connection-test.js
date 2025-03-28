const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

if (!uri || uri.includes('your-mongodb-connection-string')) {
  console.error('❌ Configure MONGODB_URI in .env.local first');
  process.exit(1);
}

console.log('Testing MongoDB connection...');
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 5000
})
.then(() => {
  console.log('✅ Connection successful');
  console.log(`Host: ${mongoose.connection.host}`);
  process.exit(0);
})
.catch(err => {
  console.error('❌ Connection failed:', err.message);
  process.exit(1);
});