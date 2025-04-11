import mongoose, { ConnectOptions, Schema, model, models } from 'mongoose';

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var indicabMongooseCache: CachedConnection;
}

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in environment variables');
}

if (!global.indicabMongooseCache) {
  global.indicabMongooseCache = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
  if (global.indicabMongooseCache.conn) {
    const conn = global.indicabMongooseCache.conn;
    if (!conn) throw new Error('MongoDB connection not established');
    return conn;
  }

  if (!global.indicabMongooseCache.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
    };
    global.indicabMongooseCache.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    global.indicabMongooseCache.conn = await global.indicabMongooseCache.promise;
  } catch (e) {
    global.indicabMongooseCache.promise = null;
    throw e;
  }

  const conn = global.indicabMongooseCache.conn;
  if (!conn) throw new Error('MongoDB connection not established');
  return conn;
}

export { mongoose, Schema, model, models };