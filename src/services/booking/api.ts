import { BookingState } from '../../context/BookingContext'

interface CreateBookingParams extends Omit<BookingState, 'id'> {
  // Additional API-specific parameters if needed
}

interface UpdateBookingParams extends Partial<Omit<BookingState, 'id'>> {
  // Additional API-specific parameters if needed
}

export async function createBooking(booking: CreateBookingParams): Promise<BookingState> {
  try {
    // In a real app, this would call your backend API
    const token = localStorage.getItem('token') || 'default-token'; // Fallback token
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(booking)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Booking creation failed')
    }

    const data: BookingState = await response.json()
    return {
      id: data.id || Math.random().toString(36).substring(2, 9),
      pickupLocation: data.pickupLocation,
      dropLocation: data.dropLocation,
      pickupDate: data.pickupDate,
      returnDate: data.returnDate,
      vehicleType: data.vehicleType,
      fare: data.fare || 0,
      customerId: data.customerId,
      status: data.status || 'pending'
    }
  } catch (error) {
    console.error('Booking API error:', error)
    throw new Error(error instanceof Error ? error.message : 'Booking creation failed')
  }
}

export async function getBooking(bookingId: string): Promise<BookingState> {
  try {
    const token = localStorage.getItem('token') || 'default-token';
    const response = await fetch(`/api/bookings/${bookingId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to retrieve booking');
    }

    const data = await response.json();
    return {
      id: data.id,
      pickupLocation: data.pickupLocation,
      dropLocation: data.dropLocation,
      pickupDate: data.pickupDate,
      returnDate: data.returnDate,
      vehicleType: data.vehicleType,
      fare: data.fare || 0,
      customerId: data.customerId,
      status: data.status || 'pending',
    };
  } catch (error) {
    console.error('Get booking error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to retrieve booking');
  }
}

export async function updateBooking(bookingId: string, updateData: UpdateBookingParams): Promise<BookingState> {
  try {
    const token = localStorage.getItem('token') || 'default-token';
    const response = await fetch(`/api/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update booking');
    }

    const data = await response.json();
    return {
      id: data.id,
      pickupLocation: data.pickupLocation,
      dropLocation: data.dropLocation,
      pickupDate: data.pickupDate,
      returnDate: data.returnDate,
      vehicleType: data.vehicleType,
      fare: data.fare || 0,
      customerId: data.customerId,
      status: data.status || 'pending',
    };
  } catch (error) {
    console.error('Update booking error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to update booking');
  }
}

export async function cancelBooking(bookingId: string): Promise<BookingState> {
  try {
    const token = localStorage.getItem('token') || 'default-token';
    const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to cancel booking');
    }

    const data = await response.json();
    return {
      id: data.id,
      pickupLocation: data.pickupLocation,
      dropLocation: data.dropLocation,
      pickupDate: data.pickupDate,
      returnDate: data.returnDate,
      vehicleType: data.vehicleType,
      fare: data.fare || 0,
      customerId: data.customerId,
      status: 'cancelled',
    };
  } catch (error) {
    console.error('Cancel booking error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to cancel booking');
  }
}
