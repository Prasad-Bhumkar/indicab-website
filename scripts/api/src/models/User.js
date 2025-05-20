"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
    },
    passwordHash: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        validate: {
            validator: function (_v) {
                return /^\d{10}$/.test(_v);
            },
            message: function (_props) { return "".concat(_props.value, " is not a valid phone number!"); }
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'driver'],
        default: 'user'
    },
    bookings: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Booking'
        }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
UserSchema.pre('save', function (_next) {
    this.updatedAt = new Date();
    _next();
});
exports.default = mongoose_1.models.User || (0, mongoose_1.model)('User', UserSchema);
