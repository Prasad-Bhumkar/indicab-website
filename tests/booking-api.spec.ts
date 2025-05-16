import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createBooking, getBooking, updateBooking, cancelBooking } from '../src/services/booking/api';
import { BookingState } from '../src/context/BookingContext';

// Mock fetch globally
global.fetch = vi.fn();

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(() => 'test-token'),
  setItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

describe('Booking API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createBooking', () => {
    const mockBookingData: Omit<BookingState, 'id'> = {
      pickupLocation: 'Delhi Airport',
      dropLocation: 'Agra',
      pickupDate: '2024-04-01T10:00:00Z',
      returnDate: '2024-04-03T10:00:00Z',
      vehicleType: 'SUV',
      fare: 5000,
      customerId: 'customer-123',
      status: 'pending',
    };

    it('successfully creates a booking', async () => {
      const mockResponse = {
        id: 'booking-123',
        ...mockBookingData,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await createBooking(mockBookingData);
      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        pickupLocation: mockBookingData.pickupLocation,
        dropLocation: mockBookingData.dropLocation,
        pickupDate: mockBookingData.pickupDate,
        returnDate: mockBookingData.returnDate,
        vehicleType: mockBookingData.vehicleType,
        fare: mockBookingData.fare,
        customerId: mockBookingData.customerId,
        status: mockBookingData.status,
      }));

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/bookings',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token',
          }),
          body: JSON.stringify(mockBookingData),
        })
      );
    });

    it('handles booking creation error', async () => {
      const errorMessage = 'Booking creation failed';
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
      });

      await expect(createBooking(mockBookingData)).rejects.toThrow(errorMessage);
    });

    it('uses default values when response data is incomplete', async () => {
      const incompleteResponse = {
        pickupLocation: mockBookingData.pickupLocation,
        dropLocation: mockBookingData.dropLocation,
        pickupDate: mockBookingData.pickupDate,
        vehicleType: mockBookingData.vehicleType,
        customerId: mockBookingData.customerId,
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(incompleteResponse),
      });

      const result = await createBooking(mockBookingData);
      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        fare: 0,
        status: 'pending',
      }));
    });

    it('handles network errors', async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      await expect(createBooking(mockBookingData)).rejects.toThrow('Network error');
    });
  });

  describe('getBooking', () => {
    const bookingId = 'booking-123';

    it('successfully retrieves a booking', async () => {
      const mockBooking = {
        id: bookingId,
        status: 'confirmed',
        pickupLocation: 'Delhi Airport',
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockBooking),
      });

      const result = await getBooking(bookingId);
      expect(result).toEqual(mockBooking);
      expect(global.fetch).toHaveBeenCalledWith(`/api/bookings/${bookingId}`);
    });

    it('handles booking retrieval error', async () => {
      const errorMessage = 'Booking not found';
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: errorMessage }),
      });

      await expect(getBooking(bookingId)).rejects.toThrow(errorMessage);
    });
  });

  describe('updateBooking', () => {
    const bookingId = 'booking-123';
    const updateData = {
      passengers: 5,
      vehicleType: 'Premium SUV',
    };

    it('successfully updates a booking', async () => {
      const mockResponse = {
        id: bookingId,
        ...updateData,
        status: 'updated',
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await updateBooking(bookingId, updateData);
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/bookings/${bookingId}`,
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(updateData),
        })
      );
    });

    it('handles booking update error', async () => {
      const errorMessage = 'Failed to update booking';
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: errorMessage }),
      });

      await expect(updateBooking(bookingId, updateData)).rejects.toThrow(errorMessage);
    });
  });

  describe('cancelBooking', () => {
    const bookingId = 'booking-123';

    it('successfully cancels a booking', async () => {
      const mockResponse = {
        id: bookingId,
        status: 'cancelled',
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await cancelBooking(bookingId);
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/bookings/${bookingId}/cancel`,
        expect.objectContaining({
          method: 'POST',
        })
      );
    });

    it('handles booking cancellation error', async () => {
      const errorMessage = 'Cannot cancel booking';
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: errorMessage }),
      });

      await expect(cancelBooking(bookingId)).rejects.toThrow(errorMessage);
    });
  });
});
