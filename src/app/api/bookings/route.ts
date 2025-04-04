import { connectDB } from '../../../lib/db';
import Booking from '../../../models/Booking';
import { NextResponse } from 'next/server';
import { validateRequest, handleApiError } from '../../../middleware/validateRequest';
import { bookingSchema, bookingUpdateSchema } from '../../../lib/validations/booking';

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find({})
      .populate('user', '-passwordHash')
      .populate('vehicle')
      .sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { data } = await validateRequest(bookingSchema)(request);
    const booking = new Booking(data);
    await booking.save();
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const { data } = await validateRequest(bookingUpdateSchema)(request);
    const { id, ...updateData } = data;
    
    const booking = await Booking.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).populate('vehicle');

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    return handleApiError(error);
  }
}