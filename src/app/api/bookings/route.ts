import { connectDB } from '../../../lib/db';
import Booking from '../../../models/Booking';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find({})
      .populate('user', '-passwordHash')
      .populate('vehicle');
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const booking = new Booking(body);
    await booking.save();
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 400 }
    );
  }
}