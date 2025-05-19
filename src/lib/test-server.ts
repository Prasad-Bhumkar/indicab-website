import { createServer } from 'http';
import { parse } from 'url';

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { createBooking, deleteBooking, getBooking, updateBooking } from './api';

export async function createServer() {
  // Create an in-memory MongoDB instance
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  // Connect to the in-memory database
  await mongoose.connect(uri);

  // Create a test HTTP server
  const server = createServer(async (req, res) => {
    const { pathname, query } = parse(req.url || '', true);
    const method = req.method?.toLowerCase();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (method === 'options') {
      res.statusCode = 204;
      res.end();
      return;
    }

    // Parse request body
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        let response;

        // Route handling
        if (pathname?.startsWith('/api/bookings')) {
          const id = pathname.split('/').pop();

          switch (method) {
            case 'post':
              response = await createBooking(JSON.parse(body));
              break;
            case 'get':
              response = await getBooking(id);
              break;
            case 'put':
              response = await updateBooking(id, JSON.parse(body));
              break;
            case 'delete':
              response = await deleteBooking(id);
              break;
            default:
              response = { status: 'error', message: 'Method not allowed' };
          }
        } else {
          response = { status: 'error', message: 'Not found' };
        }

        // Send response
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = response.status === 'success' ? 200 : 400;
        res.end(JSON.stringify(response));
      } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ status: 'error', message: 'Internal server error' }));
      }
    });
  });

  // Add utility methods
  server.resetDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  };

  server.close = async () => {
    await mongoose.connection.close();
    await mongod.stop();
    return new Promise((resolve, reject) => {
      server.close(err => {
        if (err) reject(err);
        else resolve(undefined);
      });
    });
  };

  // Start the server
  return new Promise((resolve) => {
    server.listen(0, () => {
      resolve(server);
    });
  });
} 