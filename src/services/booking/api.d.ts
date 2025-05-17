import { BookingState } from '../../context/BookingContext';

export declare function createBooking(
    booking: Omit<BookingState, 'id'>
): Promise<BookingState>;
