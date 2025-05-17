import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
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
            validator: function(_v: string) {
                return /^\d{10}$/.test(_v);
            },
            message: (_props: any) => `${_props.value} is not a valid phone number!`
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'driver'],
        default: 'user'
    },
    bookings: [{
        type: Schema.Types.ObjectId,
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

UserSchema.pre('save', function(this: any, _next: () => void) {
    this.updatedAt = new Date();
    _next();
});

export default models.User || model('User', UserSchema);
