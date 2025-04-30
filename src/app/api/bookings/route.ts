import { connectDB } from '../../../lib/db';
import Booking from '../../../models/Booking';
import { NextRequest, NextResponse } from 'next/server';
import { validateRequest, handleApiError } from '../../../middleware/validateRequest';
import { bookingSchema, bookingUpdateSchema } from '../../../lib/validations/booking';
import { createBooking as createBookingApi } from '../../../lib/api/booking';

import * as Sentry from '@sentry/nextjs';
import logger from '../../../lib/logger';

export async function getAllBookings() {
  try {
    await connectDB();
    const bookings = await Booking.find({})
      .populate('user', '-passwordHash')
      .populate('vehicle')
      .sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error) {
    logger.error('API error getting all bookings:', error);
    return handleApiError(error);
  }
}

export async function createBooking(request: Request) {
  try {
    await connectDB();
    const { data } = await validateRequest(bookingSchema)(request);
    const booking = new Booking(data);
    await booking.save();
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    logger.error('API error creating booking:', error);
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
    logger.error('API error updating booking:', error);
    return handleApiError(error);
  }
}


export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'pickup', 'dropoff', 'vehicleType', 'date', 'time'];
    const missingFields = requiredFields.filter(field => !bookingData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    const result = await createBookingApi(bookingData);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    logger.error('API error creating booking:', error);
    Sentry.captureException(error);
    
    return NextResponse.json(
      { message: 'Failed to create booking. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const bookingId = searchParams.get('id');
  
  if (!bookingId) {
    return NextResponse.json(
      { message: 'Booking ID is required' },
      { status: 400 }
    );
  }
  
  try {
    const booking = await Booking.findById(bookingId).populate('user', '-passwordHash').populate('vehicle');
    
    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(booking);
  } catch (error) {
    logger.error('API error fetching booking:', error);
    Sentry.captureException(error);
    
    return NextResponse.json(
      { message: 'Failed to fetch booking details.' },
      { status: 500 }
    );
  }
}
