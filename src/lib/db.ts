import mongoose, { type ConnectOptions, Schema, model, models } from "mongoose";

import { _logger } from './logger';

/**
 * Interface for cached MongoDB connection
 */
interface CachedConnection {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
	lastConnected: Date | null;
}

declare global {
	// Using let instead of var for better scoping
	let indicabMongooseCache: CachedConnection;
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
	const error = new Error("MONGODB_URI environment variable is not defined");
	_logger.error(error.message);
	throw error;
}

if (!MONGODB_URI.startsWith("mongodb")) {
	const error = new Error(
		"Invalid MONGODB_URI format - must start with mongodb:// or mongodb+srv://",
	);
	_logger.error(error.message);
	logger.error(error.message);
	throw error;
}

if (!global.indicabMongooseCache) {
	global.indicabMongooseCache = {
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
	if (global.indicabMongooseCache.conn) {
		const conn = global.indicabMongooseCache.conn;
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
			global.indicabMongooseCache.conn = null;
		}
	}

	if (!global.indicabMongooseCache.promise) {
		const _opts: ConnectOptions = {
			bufferCommands: false,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
			heartbeatFrequencyMS: 10000,
		};

		logger.info("Establishing new MongoDB connection...");
		global.indicabMongooseCache.promise = mongoose
			.connect(MONGODB_URI, _opts)
			.then((conn) => {
				logger.info("MongoDB connected successfully");
				global.indicabMongooseCache.lastConnected = new Date();
				return conn;
			});
	}

	try {
		global.indicabMongooseCache.conn =
			await global.indicabMongooseCache.promise;
		logger.debug("Using existing MongoDB connection");
	} catch (error) {
		logger.error("MongoDB connection failed:", { error });
		global.indicabMongooseCache.promise = null;
		throw new Error(
			`MongoDB connection failed: ${error instanceof Error ? error.message : String(error)}`,
		);
	}

	const conn = global.indicabMongooseCache.conn;
	if (!conn) throw new Error("MongoDB connection not established");
	return conn;
}

export { Schema, model, models, mongoose };

