// Simple database connection verifier
import { connectDB } from '../src/lib/db';

async function verifyConnection() {
  try {
    console.log('⏳ Attempting to connect to MongoDB...');
    const connection = await connectDB();
    console.log('✅ Successfully connected to MongoDB');
    console.log(`🛢️ Database name: ${connection.connection.db.databaseName}`);
    console.log(`🔄 Ready state: ${connection.connection.readyState}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

verifyConnection();