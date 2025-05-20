"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../lib/db");
var _VehicleSchema = new db_1.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    type: {
        type: String,
        enum: ['hatchback', 'sedan', 'suv', 'luxury'],
        required: true
    },
    seatingCapacity: { type: Number, required: true },
    fuelType: {
        type: String,
        enum: ['petrol', 'diesel', 'electric', 'hybrid'],
        required: true
    },
    transmission: {
        type: String,
        enum: ['manual', 'automatic'],
        required: true
    },
    dailyRate: { type: Number, required: true },
    available: { type: Boolean, default: true },
    imageUrl: { type: String, required: true },
    features: [{
            type: String,
            enum: ['ac', 'bluetooth', 'gps', 'sunroof', 'leather', 'heated-seats']
        }],
    bookings: [{
            type: db_1.Schema.Types.ObjectId,
            ref: 'Booking'
        }]
});
exports.default = db_1.models.Vehicle || (0, db_1.model)('Vehicle', _VehicleSchema);
