import mongoose, { ConnectOptions, Schema, model, models } from 'mongoose';

interface CachedConnection {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Import mongoose and types
// Removed duplicate import

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI in your environment variables');
}

// Global variable to cache the connection and mongoose instance
declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
}

// Initialize cache if it doesn't exist
if (!global.mongooseCache) {
    global.mongooseCache = { conn: null, promise: null };
}

const cached = global.mongooseCache;

/**
 * Establishes a connection to MongoDB
 * @returns Promise<typeof mongoose>
 */
async function dbConnect(): Promise<typeof mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const _opts: ConnectOptions = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, _opts).then(() => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (_e) {
        cached.promise = null;
        throw _e;
    }

    return cached.conn;
}

export default dbConnect;

// Export mongoose utilities for model definitions
export { mongoose, Schema, model, models };
