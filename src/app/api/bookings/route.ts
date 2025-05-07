import { NextRequest, NextResponse } from 'next/server';
// Ensure the correct path to the database connection file
import dbConnect from '../../../../lib/database';
import Booking from '@/models/Booking';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.user || !body.vehicle || !body.startDate || !body.endDate || !body.totalAmount) {
      return NextResponse.json(
        { message: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Validate date range
    if (new Date(body.endDate) <= new Date(body.startDate)) {
      return NextResponse.json(
        { message: 'End date must be after start date' },
        { status: 400 }
      );
    }

    await dbConnect();

    const booking = new Booking({
      user: body.user,
      vehicle: body.vehicle,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      totalAmount: body.totalAmount,
      status: body.status || 'pending',
      paymentStatus: body.paymentStatus || 'pending',
      paymentMethod: body.paymentMethod,
    });

    const savedBooking = await booking.save();

    return NextResponse.json(
      { 
        id: savedBooking._id,
        status: savedBooking.status,
        paymentStatus: savedBooking.paymentStatus
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
