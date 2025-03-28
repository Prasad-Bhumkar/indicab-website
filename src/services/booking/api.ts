import { BookingState } from '../../context/BookingContext'

export async function createBooking(booking: Omit<BookingState, 'id'>): Promise<BookingState> {
  // In a real app, this would call your backend API
  return {
    ...booking,
    id: Math.random().toString(36).substring(2, 9),
    fare: booking.fare || 0
  }
}