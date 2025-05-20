require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not defined in .env');
}

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas cluster!');

    // List all databases in the cluster
    const databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  } catch (e) {
    console.error('❌ Connection failed:', e);
  } finally {
    await client.close();
  }
}

main().catch(console.error); 