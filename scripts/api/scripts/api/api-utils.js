"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testUserAPI = testUserAPI;
exports.testVehicleAPI = testVehicleAPI;
exports.testBookingAPI = testBookingAPI;
exports.testFullAPIFlow = testFullAPIFlow;
var bcrypt = __importStar(require("bcryptjs"));
var db_1 = require("../../src/lib/db");
var Booking_1 = __importDefault(require("../../src/models/Booking"));
var User_1 = __importDefault(require("../../src/models/User"));
var Vehicle_1 = __importDefault(require("../../src/models/Vehicle"));
var api_1 = require("../../src/services/booking/api");
/**
 * Default test data
 */
var defaultTestUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123',
    phone: '1234567890'
};
var defaultTestVehicle = {
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    type: 'sedan',
    seatingCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    dailyRate: 50,
    imageUrl: 'https://example.com/corolla.jpg'
};
var defaultTestBooking = {
    pickupLocation: 'Test Location',
    dropLocation: 'Test Destination',
    startDate: new Date(),
    endDate: new Date(Date.now() + 86400000), // 1 day later
    vehicleType: 'sedan',
    fare: 100,
    customerId: 'test-user',
    status: 'pending'
};
/**
 * User API Tests
 */
function testUserAPI() {
    return __awaiter(this, arguments, void 0, function (testData) {
        var userData, passwordHash, user, error_1;
        if (testData === void 0) { testData = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userData = __assign(__assign({}, defaultTestUser), testData);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, bcrypt.hash(userData.password, 10)];
                case 2:
                    passwordHash = _a.sent();
                    user = new User_1.default(__assign(__assign({}, userData), { passwordHash: passwordHash }));
                    return [4 /*yield*/, user.save()];
                case 3:
                    _a.sent();
                    console.log('✅ User created:', user.email);
                    return [2 /*return*/, user];
                case 4:
                    error_1 = _a.sent();
                    console.error('❌ User creation failed:', error_1 instanceof Error ? error_1.message : error_1);
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Vehicle API Tests
 */
function testVehicleAPI() {
    return __awaiter(this, arguments, void 0, function (testData) {
        var vehicleData, vehicle, error_2;
        if (testData === void 0) { testData = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vehicleData = __assign(__assign({}, defaultTestVehicle), testData);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    vehicle = new Vehicle_1.default(vehicleData);
                    return [4 /*yield*/, vehicle.save()];
                case 2:
                    _a.sent();
                    console.log('✅ Vehicle created:', vehicle.make, vehicle.model);
                    return [2 /*return*/, vehicle];
                case 3:
                    error_2 = _a.sent();
                    console.error('❌ Vehicle creation failed:', error_2 instanceof Error ? error_2.message : error_2);
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Booking API Tests
 */
function testBookingAPI() {
    return __awaiter(this, arguments, void 0, function (testData) {
        var bookingData, booking, error_3;
        if (testData === void 0) { testData = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookingData = __assign(__assign({}, defaultTestBooking), testData);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, api_1.createBooking)({
                            pickupLocation: bookingData.pickupLocation,
                            dropLocation: bookingData.dropLocation,
                            pickupDate: bookingData.startDate.toISOString(),
                            returnDate: bookingData.endDate.toISOString(),
                            vehicleType: bookingData.vehicleType,
                            fare: bookingData.fare,
                            customerId: bookingData.customerId,
                            status: bookingData.status
                        })];
                case 2:
                    booking = _a.sent();
                    console.log('✅ Booking created:', booking.id);
                    if (!booking.id) {
                        throw new Error('Booking ID was not generated');
                    }
                    return [2 /*return*/, booking];
                case 3:
                    error_3 = _a.sent();
                    console.error('❌ Booking creation failed:', error_3 instanceof Error ? error_3.message : error_3);
                    throw error_3;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Full API Integration Test
 */
function testFullAPIFlow() {
    return __awaiter(this, void 0, void 0, function () {
        var user, booking, verifiedBooking, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    // Connect to database
                    return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    // Connect to database
                    _a.sent();
                    console.log('Database connected');
                    return [4 /*yield*/, testUserAPI()];
                case 2:
                    user = _a.sent();
                    // Create test vehicle
                    return [4 /*yield*/, testVehicleAPI()];
                case 3:
                    // Create test vehicle
                    _a.sent();
                    return [4 /*yield*/, testBookingAPI({
                            customerId: user._id.toString()
                        })];
                case 4:
                    booking = _a.sent();
                    return [4 /*yield*/, Booking_1.default.findById(booking.id)
                            .populate('user', '-passwordHash')
                            .populate('vehicle')];
                case 5:
                    verifiedBooking = _a.sent();
                    if (!verifiedBooking) {
                        throw new Error('Booking not found in database');
                    }
                    console.log('✅ Full API flow verified:', {
                        user: verifiedBooking.user,
                        vehicle: verifiedBooking.vehicle,
                        total: verifiedBooking.totalAmount
                    });
                    console.log('🎉 All API tests completed successfully!');
                    return [3 /*break*/, 7];
                case 6:
                    error_4 = _a.sent();
                    console.error('❌ API test failed:', error_4 instanceof Error ? error_4.message : error_4);
                    throw error_4;
                case 7: return [2 /*return*/];
            }
        });
    });
}
/**
 * Command-line interface
 */
if (require.main === module) {
    var testType = process.argv[2];
    switch (testType) {
        case 'user':
            testUserAPI().catch(function () { return process.exit(1); });
            break;
        case 'vehicle':
            testVehicleAPI().catch(function () { return process.exit(1); });
            break;
        case 'booking':
            testBookingAPI().catch(function () { return process.exit(1); });
            break;
        case 'full':
            testFullAPIFlow().catch(function () { return process.exit(1); });
            break;
        default:
            console.log('Usage: ts-node api-utils.ts [user|vehicle|booking|full]');
            process.exit(1);
    }
}
