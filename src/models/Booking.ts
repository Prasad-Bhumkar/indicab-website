import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  user: string;
  vehicle: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod?: string;
}

const BookingSchema: Schema = new Schema({
  user: { type: String, required: true },
  vehicle: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  paymentStatus: { type: String, default: 'pending' },
  paymentMethod: { type: String }
});

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;