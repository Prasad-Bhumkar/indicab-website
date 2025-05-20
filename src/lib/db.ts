import mongoose, { type ConnectOptions, Schema, model, models } from "mongoose";

import { logger } from './logger';

/**
 * Interface for cached MongoDB connection
 */
interface CachedConnection {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
	lastConnected: Date | null;
}

declare global {
	// Use var for Node.js globalThis
	var indicabMongooseCache: CachedConnection;
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI && process.env.SKIP_DB_CONNECTION !== 'true') {
	throw new Error('MONGODB_URI environment variable is not defined');
}

if (!MONGODB_URI) {
	const error = new Error("MONGODB_URI environment variable is not defined");
	logger.error(error.message);
	throw error;
}

if (!MONGODB_URI.startsWith("mongodb")) {
	const error = new Error(
		"Invalid MONGODB_URI format - must start with mongodb:// or mongodb+srv://",
	);
	logger.error(error.message);
	throw error;
}

if (!globalThis.indicabMongooseCache) {
	globalThis.indicabMongooseCache = {
		conn: null,
		promise: null,
		lastConnected: null,
	};
}

/**
 * Establishes or returns existing MongoDB connection
 * @throws {Error} If connection fails
 * @returns {Promise<typeof mongoose>} Mongoose connection
 */
export async function connectDB(): Promise<typeof mongoose> {
	// Skip DB connection if flag is set (for tests)
	if (process.env.SKIP_DB_CONNECTION === 'true') {
		logger.info('Skipping MongoDB connection due to SKIP_DB_CONNECTION flag');
		return mongoose;
	}

	if (globalThis.indicabMongooseCache.conn) {
		const conn = globalThis.indicabMongooseCache.conn;
		if (!conn) {
			const error = new Error("MongoDB connection not established");
			logger.error(error.message);
			throw error;
		}

		// Verify connection is still alive
		try {
			if (!conn.connection?.db) {
				throw new Error("MongoDB connection not properly established");
			}
			await conn.connection.db.admin().ping();
			return conn;
		} catch (error) {
			logger.warn("MongoDB connection stale, reconnecting...", { error });
			globalThis.indicabMongooseCache.conn = null;
		}
	}

	if (!globalThis.indicabMongooseCache.promise) {
		const _opts: ConnectOptions = {
			bufferCommands: false,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
			heartbeatFrequencyMS: 10000,
		};

		logger.info("Establishing new MongoDB connection...");
		globalThis.indicabMongooseCache.promise = mongoose
			.connect(MONGODB_URI!, _opts)
			.then((conn) => {
				logger.info("MongoDB connected successfully");
				globalThis.indicabMongooseCache.lastConnected = new Date();
				return conn;
			});
	}

	try {
		globalThis.indicabMongooseCache.conn =
			await globalThis.indicabMongooseCache.promise;
		logger.debug("Using existing MongoDB connection");
	} catch (error) {
		logger.error("MongoDB connection failed:", { error });
		globalThis.indicabMongooseCache.promise = null;
		throw new Error(
			`MongoDB connection failed: ${error instanceof Error ? error.message : String(error)}`,
		);
	}

	const conn = globalThis.indicabMongooseCache.conn;
	if (!conn) throw new Error("MongoDB connection not established");
	return conn;
}

export async function disconnectDB(): Promise<void> {
	// Skip if not connected or if SKIP_DB_CONNECTION flag is set
	if (!globalThis.indicabMongooseCache.conn || process.env.SKIP_DB_CONNECTION === 'true') {
		return;
	}

	try {
		await globalThis.indicabMongooseCache.conn.disconnect();
		globalThis.indicabMongooseCache.conn = null;
		logger.info('Disconnected from MongoDB');
	} catch (error) {
		logger.error('Error disconnecting from MongoDB:', { error });
		throw new Error('Failed to disconnect from database');
	}
}

// Initialize connection (only in non-test environments and if not skipped)
if (process.env.NODE_ENV !== 'test' && process.env.SKIP_DB_CONNECTION !== 'true') {
	try {
		connectDB().catch(err => {
			logger.error('Initial database connection failed:', { error: err });
		});
	} catch (err) {
		logger.error('Failed to initialize database connection', { error: err });
	}
}

export { Schema, model, models, mongoose };

