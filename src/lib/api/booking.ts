import { BookingFormData } from '@/types/booking';
import { Booking, BookingDocument } from '../models/booking';
import { logger } from '../utils/logger';
import { validateBookingData } from './validators/booking';

export async function createBooking(bookingData: BookingFormData): Promise<{ bookingId: string }> {
    try {
        // Validate input data
        await validateBookingData(bookingData);

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

        // Create a new booking using the Mongoose model
        const newBooking = new Booking(_bookingRecord);
        await newBooking.save();

        return { bookingId };
    } catch (error) {
        if (error instanceof Error) {
            logger.error('Booking creation failed:', { error: error.message });
            throw error; // Re-throw validation errors
        }
        logger.error('Unexpected error creating booking:', { error });
        throw new Error('Failed to create booking due to server error');
    }
}

export async function getBookings(): Promise<BookingDocument[]> {
    try {
        // Use the model directly without getCollection
        const bookings = await Booking.find().exec();
        return bookings;
    } catch (error) {
        logger.error('Error fetching bookings', { error });
        throw new Error('Failed to fetch bookings');
    }
}

export async function getBookingById(bookingId: string): Promise<BookingDocument | null> {
    try {
        // Use the model directly without getCollection
        const booking = await Booking.findById(bookingId).exec();
        return booking;
    } catch (error) {
        logger.error(`Error fetching booking id ${bookingId}`, { error });
        throw new Error('Failed to fetch booking');
    }
}
