"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.models = exports.model = exports.Schema = void 0;
exports.connectDB = connectDB;
var mongoose_1 = __importStar(require("mongoose"));
exports.mongoose = mongoose_1.default;
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return mongoose_1.Schema; } });
Object.defineProperty(exports, "model", { enumerable: true, get: function () { return mongoose_1.model; } });
Object.defineProperty(exports, "models", { enumerable: true, get: function () { return mongoose_1.models; } });
var logger_1 = require("./logger");
var MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    var error = new Error("MONGODB_URI environment variable is not defined");
    logger_1._logger.error(error.message);
    throw error;
}
if (!MONGODB_URI.startsWith("mongodb")) {
    var error = new Error("Invalid MONGODB_URI format - must start with mongodb:// or mongodb+srv://");
    logger_1._logger.error(error.message);
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
function connectDB() {
    return __awaiter(this, void 0, void 0, function () {
        var conn_1, error, error_1, _opts, _a, error_2, conn;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!globalThis.indicabMongooseCache.conn) return [3 /*break*/, 4];
                    conn_1 = globalThis.indicabMongooseCache.conn;
                    if (!conn_1) {
                        error = new Error("MongoDB connection not established");
                        logger_1._logger.error(error.message);
                        throw error;
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    if (!((_b = conn_1.connection) === null || _b === void 0 ? void 0 : _b.db)) {
                        throw new Error("MongoDB connection not properly established");
                    }
                    return [4 /*yield*/, conn_1.connection.db.admin().ping()];
                case 2:
                    _c.sent();
                    return [2 /*return*/, conn_1];
                case 3:
                    error_1 = _c.sent();
                    logger_1._logger.warn("MongoDB connection stale, reconnecting...", { error: error_1 });
                    globalThis.indicabMongooseCache.conn = null;
                    return [3 /*break*/, 4];
                case 4:
                    if (!globalThis.indicabMongooseCache.promise) {
                        _opts = {
                            bufferCommands: false,
                            serverSelectionTimeoutMS: 5000,
                            socketTimeoutMS: 45000,
                            heartbeatFrequencyMS: 10000,
                        };
                        logger_1._logger.info("Establishing new MongoDB connection...");
                        globalThis.indicabMongooseCache.promise = mongoose_1.default
                            .connect(MONGODB_URI, _opts)
                            .then(function (conn) {
                            logger_1._logger.info("MongoDB connected successfully");
                            globalThis.indicabMongooseCache.lastConnected = new Date();
                            return conn;
                        });
                    }
                    _c.label = 5;
                case 5:
                    _c.trys.push([5, 7, , 8]);
                    _a = globalThis.indicabMongooseCache;
                    return [4 /*yield*/, globalThis.indicabMongooseCache.promise];
                case 6:
                    _a.conn =
                        _c.sent();
                    logger_1._logger.debug("Using existing MongoDB connection");
                    return [3 /*break*/, 8];
                case 7:
                    error_2 = _c.sent();
                    logger_1._logger.error("MongoDB connection failed:", { error: error_2 });
                    globalThis.indicabMongooseCache.promise = null;
                    throw new Error("MongoDB connection failed: ".concat(error_2 instanceof Error ? error_2.message : String(error_2)));
                case 8:
                    conn = globalThis.indicabMongooseCache.conn;
                    if (!conn)
                        throw new Error("MongoDB connection not established");
                    return [2 /*return*/, conn];
            }
        });
    });
}
