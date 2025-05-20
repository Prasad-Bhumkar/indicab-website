import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { BookingState } from '@/context/BookingContext';
import { cancelBooking, createBooking, getBooking, updateBooking } from '@/services/booking/api';

// Mock fetch globally
global.fetch = vi.fn();

// Mock localStorage
const _localStorageMock = {
    getItem: vi.fn(() => 'test-token'),
    setItem: vi.fn(),
    clear: vi.fn(),
};
global.localStorage = _localStorageMock as any;

describe('Booking API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('createBooking', () => {
        const mockBookingData: Omit<BookingState, 'id'> = {
            pickupLocation: 'Mumbai',
            dropLocation: 'Pune',
            pickupDate: '2024-04-01T10:00:00Z',
            returnDate: '2024-04-03T10:00:00Z',
            vehicleType: 'SUV',
            contactName: 'Test User',
            contactEmail: 'test@example.com',
            contactPhone: '9876543210',
            status: 'pending',
            fare: 0
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

            const _result = await createBooking(mockBookingData);
            expect(_result).toEqual(expect.objectContaining({
                id: expect.any(String),
                pickupLocation: mockBookingData.pickupLocation,
                dropLocation: mockBookingData.dropLocation,
                pickupDate: mockBookingData.pickupDate,
                returnDate: mockBookingData.returnDate,
                vehicleType: mockBookingData.vehicleType,
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
            const _incompleteResponse = {
                pickupLocation: mockBookingData.pickupLocation,
                dropLocation: mockBookingData.dropLocation,
                pickupDate: mockBookingData.pickupDate,
                vehicleType: mockBookingData.vehicleType,
            };

            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(_incompleteResponse),
            });

            const _result = await createBooking(mockBookingData);
            expect(_result).toEqual(expect.objectContaining({
                id: expect.any(String),
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

            const _result = await getBooking(bookingId);
            expect(_result).toEqual(mockBooking);
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

            const _result = await updateBooking(bookingId, updateData);
            expect(_result).toEqual(mockResponse);
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

            const _result = await cancelBooking(bookingId);
            expect(_result).toEqual(mockResponse);
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
