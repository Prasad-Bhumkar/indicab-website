import { Schema, model, models } from '../lib/db';

interface IVehicle {
  make: string;
  model: string;
  year: number;
  type: 'hatchback' | 'sedan' | 'suv' | 'luxury';
  seatingCapacity: number;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  dailyRate: number;
  available?: boolean;
  imageUrl: string;
  features?: string[];
  bookings?: Schema.Types.ObjectId[];
}

const VehicleSchema = new Schema<IVehicle>({
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
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  }]
});

export default models.Vehicle || model<IVehicle>('Vehicle', VehicleSchema);