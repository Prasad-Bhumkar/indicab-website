import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { createBooking, deleteBooking, getBooking, updateBooking } from '@/lib/api';
import { createServer } from '@/lib/test-server';

import { mockBooking } from '../helpers/test-utils';

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
  });

  describe('POST /api/bookings', () => {
    it('creates a new booking successfully', async () => {
      const response = await createBooking({
        from: 'Delhi',
        to: 'Agra',
        date: new Date().toISOString(),
        passengerName: 'Test User',
        passengerPhone: '9876543210',
        passengerEmail: 'test@example.com',
      });

      expect(response.status).toBe('success');
      expect(response.data).toHaveProperty('id');
      expect(response.data.from).toBe('Delhi');
      expect(response.data.to).toBe('Agra');

      // Store the booking ID for other tests
      testBookingId = response.data.id;
    });

    it('validates required fields', async () => {
      const response = await createBooking({
        from: '',
        to: '',
        date: '',
        passengerName: '',
        passengerPhone: '',
        passengerEmail: '',
      });

      expect(response.status).toBe('error');
      expect(response.errors).toContain('from is required');
      expect(response.errors).toContain('to is required');
      expect(response.errors).toContain('date is required');
    });
  });

  describe('GET /api/bookings/:id', () => {
    it('retrieves a booking by ID', async () => {
      // First create a booking
      const createResponse = await createBooking(mockBooking);
      const bookingId = createResponse.data.id;

      // Then retrieve it
      const response = await getBooking(bookingId);

      expect(response.status).toBe('success');
      expect(response.data.id).toBe(bookingId);
      expect(response.data.from).toBe(mockBooking.from);
      expect(response.data.to).toBe(mockBooking.to);
    });

    it('returns 404 for non-existent booking', async () => {
      const response = await getBooking('non-existent-id');

      expect(response.status).toBe('error');
      expect(response.message).toBe('Booking not found');
    });
  });

  describe('PUT /api/bookings/:id', () => {
    it('updates a booking successfully', async () => {
      // First create a booking
      const createResponse = await createBooking(mockBooking);
      const bookingId = createResponse.data.id;

      // Then update it
      const updateData = {
        from: 'Mumbai',
        to: 'Pune',
        date: new Date().toISOString(),
      };

      const response = await updateBooking(bookingId, updateData);

      expect(response.status).toBe('success');
      expect(response.data.from).toBe('Mumbai');
      expect(response.data.to).toBe('Pune');
    });

    it('validates update data', async () => {
      const response = await updateBooking(testBookingId, {
        from: '',
        to: '',
      });

      expect(response.status).toBe('error');
      expect(response.errors).toContain('from is required');
      expect(response.errors).toContain('to is required');
    });
  });

  describe('DELETE /api/bookings/:id', () => {
    it('deletes a booking successfully', async () => {
      // First create a booking
      const createResponse = await createBooking(mockBooking);
      const bookingId = createResponse.data.id;

      // Then delete it
      const response = await deleteBooking(bookingId);

      expect(response.status).toBe('success');

      // Verify it's deleted
      const getResponse = await getBooking(bookingId);
      expect(getResponse.status).toBe('error');
      expect(getResponse.message).toBe('Booking not found');
    });

    it('returns 404 for non-existent booking', async () => {
      const response = await deleteBooking('non-existent-id');

      expect(response.status).toBe('error');
      expect(response.message).toBe('Booking not found');
    });
  });
}); 