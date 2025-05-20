import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'test'
    ? 'http://localhost:8000/mock-api/bookings'
    : 'https://api.example.com/bookings';

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Booking {
    id: string;
    date: string;
    time: string;
    origin: string;
    destination: string;
    carType: string;
    fare: string;
    status: BookingStatus;
    driver?: {
        name: string;
        contact: string;
    };
}

export const fetchBookings = async (_userId: string): Promise<Booking[]> => {
    try {
        const _response = await axios.get<Booking[]>(`${API_URL}?userId=${_userId}`);
        return _response.data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw new Error('Error fetching bookings');
    }
};

export const cancelBooking = async (_bookingId: string): Promise<boolean> => {
    try {
        await axios.delete(`${API_URL}/${_bookingId}`);
        return true;
    } catch (error) {
        console.error('Error cancelling booking:', error);
        throw new Error('Failed to cancel booking');
    }
};

export const modifyBooking = async (
    _bookingId: string,
    _changes: Partial<Booking>
): Promise<Booking> => {
    try {
        const _response = await axios.patch<Booking>(`${API_URL}/${_bookingId}`, _changes);
        return _response.data;
    } catch (error) {
        console.error('Error modifying booking:', error);
        throw new Error('Failed to modify booking');
    }
};
