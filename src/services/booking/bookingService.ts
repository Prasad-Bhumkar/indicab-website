import axios, { AxiosResponse } from 'axios';

const API_URL = process.env.NODE_ENV === 'test' 
  ? 'http://localhost:8000/mock-api/bookings' 
  : 'https://api.example.com/bookings';

// Mock data for development/testing
const mockBookings: Booking[] = [
  {
    id: "BK-2023-001",
    date: "15 Oct 2023",
    time: "10:00 AM",
    origin: "Delhi",
    destination: "Agra",
    carType: "Premium Sedan",
    fare: "₹2,499",
    status: "completed",
    driver: {
      name: "Raj Kumar",
      contact: "123-456-7890"
    }
  },
  // Add more mock bookings as needed
];

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

export const fetchBookings = async (userId: string): Promise<Booking[]> => {
  try {
    const response: AxiosResponse<Booking[]> = await axios.get(`${API_URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw new Error('Error fetching bookings');
  }
};

export const cancelBooking = async (bookingId: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${bookingId}`);
    return true;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw new Error('Failed to cancel booking');
  }
};

export const modifyBooking = async (
  bookingId: string, 
  changes: Partial<Booking>
): Promise<Booking> => {
  try {
    const response: AxiosResponse<Booking> = await axios.patch(`${API_URL}/${bookingId}`, changes);
    return response.data;
  } catch (error) {
    console.error('Error modifying booking:', error);
    throw new Error('Failed to modify booking');
  }
};
