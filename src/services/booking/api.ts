import { BookingState } from '../../context/BookingContext'

interface CreateBookingParams extends Omit<BookingState, 'id'> {
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
      pickup: data.pickup,
      destination: data.destination,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
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
