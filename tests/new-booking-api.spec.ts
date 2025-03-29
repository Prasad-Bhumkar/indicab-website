import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createBooking } from '../src/services/booking/api'
import { BookingState } from '../src/context/BookingContext'

// Mock global fetch
global.fetch = vi.fn()

describe('Booking API Service', () => {
  const validBooking: Omit<BookingState, 'id'> = {
    pickup: 'Location A',
    destination: 'Location B',
    startDate: new Date(),
    endDate: new Date(Date.now() + 86400000),
    vehicleType: 'sedan',
    fare: 100,
    customerId: 'user123',
    status: 'pending'
  }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should create a booking successfully', async () => {
    const mockResponse: BookingState = {
      ...validBooking,
      id: 'booking123'
    }

    // @ts-ignore
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const result = await createBooking(validBooking)
    expect(result).toEqual(mockResponse)
    expect(fetch).toHaveBeenCalledWith('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer null'
      },
      body: JSON.stringify(validBooking)
    })
  })

  it('should throw error when API returns failure', async () => {
    // @ts-ignore
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Invalid data' })
    })

    await expect(createBooking(validBooking))
      .rejects.toThrow('Booking creation failed')
  })

  it('should handle network errors', async () => {
    // @ts-ignore
    fetch.mockRejectedValueOnce(new Error('Network error'))

    await expect(createBooking(validBooking))
      .rejects.toThrow('Booking creation failed')
  })
})