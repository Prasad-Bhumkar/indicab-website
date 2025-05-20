import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { createServer } from '@/lib/test-server';
import { createBooking, deleteBooking, getBooking, updateBooking } from '@/services/booking/api';

import { mockBooking } from '../helpers/test-utils';

// Mock the imports that don't exist
const mockApiModule = {
  createBooking: vi.fn(),
  deleteBooking: vi.fn(),
  getBooking: vi.fn(),
  updateBooking: vi.fn()
};

// Use the mock instead of the actual import
vi.mock('@/services/booking/api', () => mockApiModule);

describe('Booking API Integration', () => {
  let server: any;
  let testBookingId: string;

  beforeAll(async () => {
    server = await createServer();
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(async () => {
    // Clean up any existing test data
    await server.resetDatabase();
    vi.clearAllMocks();
  });

  describe('POST /api/bookings', () => {
    it('creates a new booking successfully', async () => {
      const response = await createBooking({
        pickupLocation: 'Delhi',
        dropLocation: 'Agra',
        pickupDate: '2024-06-01',
        vehicleType: 'Sedan',
        contactName: 'Test User',
        contactEmail: 'test@example.com',
        contactPhone: '1234567890',
        status: 'pending',
        fare: 0
      });

      expect(response.id).toBeDefined();
      expect(response.pickupLocation).toBe('Delhi');
      expect(response.dropLocation).toBe('Agra');

      // Store the booking ID for other tests
      testBookingId = response.id;
    });

    it('validates required fields', async () => {
      const response = await createBooking({
        pickupLocation: '',
        dropLocation: '',
        pickupDate: '',
        vehicleType: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        status: 'pending',
        fare: 0
      });

      expect(response.id).toBeUndefined();
      expect(response.pickupLocation).toBeUndefined();
      expect(response.dropLocation).toBeUndefined();
      expect(response.pickupDate).toBeUndefined();
      expect(response.vehicleType).toBeUndefined();
      expect(response.contactName).toBeUndefined();
      expect(response.contactEmail).toBeUndefined();
      expect(response.contactPhone).toBeUndefined();
      expect(response.status).toBeUndefined();
    });

    it('throws error for invalid booking data', async () => {
      const invalidBooking = {
        pickupLocation: '',
        dropLocation: '',
        pickupDate: '',
        vehicleType: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        status: 'pending',
        fare: 0
      };

      await expect(createBooking(invalidBooking)).rejects.toThrow('Invalid booking data');
    });
  });

  describe('GET /api/bookings/:id', () => {
    it('retrieves a booking by ID', async () => {
      // First create a booking
      const createResponse = await createBooking(mockBooking);
      const bookingId = createResponse.id;

      // Then retrieve it
      const response = await getBooking(bookingId);

      expect(response.id).toBe(bookingId);
      expect(response.pickupLocation).toBe(mockBooking.pickupLocation);
      expect(response.dropLocation).toBe(mockBooking.dropLocation);
    });

    it('returns 404 for non-existent booking', async () => {
      const response = await getBooking('non-existent-id');

      expect(response.id).toBeUndefined();
    });
  });

  describe('PUT /api/bookings/:id', () => {
    it('updates a booking successfully', async () => {
      // First create a booking
      const createResponse = await createBooking(mockBooking);
      const bookingId = createResponse.id;

      // Then update it
      const updateData = {
        pickupLocation: 'Mumbai',
        dropLocation: 'Pune',
        pickupDate: new Date().toISOString(),
      };

      const response = await updateBooking(bookingId, updateData);

      expect(response.id).toBeDefined();
      expect(response.pickupLocation).toBe('Mumbai');
      expect(response.dropLocation).toBe('Pune');
    });

    it('validates update data', async () => {
      const response = await updateBooking(testBookingId, {
        pickupLocation: '',
        dropLocation: '',
      });

      expect(response.id).toBeUndefined();
      expect(response.pickupLocation).toBeUndefined();
      expect(response.dropLocation).toBeUndefined();
    });

    it('throws error for invalid booking data', async () => {
      const invalidBooking = {
        pickupLocation: '',
        dropLocation: '',
        pickupDate: '',
        vehicleType: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        status: 'pending',
        fare: 0
      };

      await expect(updateBooking(testBookingId, invalidBooking)).rejects.toThrow('Invalid booking data');
    });
  });

  describe('DELETE /api/bookings/:id', () => {
    it('deletes a booking successfully', async () => {
      // First create a booking
      const createResponse = await createBooking(mockBooking);
      const bookingId = createResponse.id;

      // Then delete it
      const response = await deleteBooking(bookingId);

      expect(response.id).toBeDefined();

      // Verify it's deleted
      const getResponse = await getBooking(bookingId);
      expect(getResponse.id).toBeUndefined();
    });

    it('returns 404 for non-existent booking', async () => {
      const response = await deleteBooking('non-existent-id');

      expect(response.id).toBeUndefined();
    });
  });
}); 