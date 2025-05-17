import { connectDB } from '../db';
import { BookingFormData } from '@/types/booking';
import { validateBookingData } from './validators/booking';

export async function createBooking(bookingData: BookingFormData): Promise<{ bookingId: string }> {
    try {
        // Validate input data
        await validateBookingData(bookingData);

        const _db = await connectDB();
        const _bookingsCollection = _db.getCollection('bookings');

        // Generate a unique booking ID with IND prefix and 6 random digits
        const bookingId = `IND${Math.floor(100000 + Math.random() * 900000)}`;

        // Create booking record with additional metadata
        const _bookingRecord = {
            ...bookingData,
            bookingId,
            status: 'confirmed',
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1
        };

        const _result = await _bookingsCollection.insertOne(_bookingRecord);

        if (!_result.acknowledged) {
            throw new Error('Booking creation not acknowledged by database');
        }

        return { bookingId };
    } catch (error) {
        if (error instanceof Error) {
            console.error('Booking creation failed:', error.message);
            throw error; // Re-throw validation errors
        }
        console.error('Unexpected error creating booking:', error);
        throw new Error('Failed to create booking due to server error');
    }
}

export async function getBookingById(bookingId: string) {
    if (!bookingId || !bookingId.startsWith('IND') || bookingId.length !== 9) {
        throw new Error('Invalid booking ID format');
    }

    try {
        const _db = await connectDB();
        const _bookingsCollection = _db.getCollection('bookings');

        const booking = await _bookingsCollection.findOne({ bookingId });

        if (!booking) {
            throw new Error('Booking not found');
        }

        return booking;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Booking retrieval failed:', error.message);
            throw error;
        }
        console.error('Unexpected error fetching booking:', error);
        throw new Error('Failed to fetch booking details due to server error');
    }
}
