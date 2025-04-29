import { z } from 'zod';

export const bookingSchema = z.object({
  pickupLocation: z.string().min(1, 'Pickup location is required'),
  dropLocation: z.string().min(1, 'Drop location is required'),
  pickupDate: z.string().datetime('Invalid pickup date'),
  returnDate: z.string().datetime().optional(),
  vehicleType: z.string().min(1, 'Vehicle type is required'),
  passengers: z.number().int().min(1).max(20),
  contactName: z.string().min(1, 'Contact name is required'),
  contactPhone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number'),
  contactEmail: z.string().email('Invalid email address'),
  specialRequirements: z.string().optional(),
  isRoundTrip: z.boolean().default(false),
  paymentMethod: z.enum(['card', 'cash', 'upi']),
  promoCode: z.string().optional()
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const bookingUpdateSchema = bookingSchema.partial().extend({
  id: z.string().min(1, 'Booking ID is required')
});

export type BookingUpdateInput = z.infer<typeof bookingUpdateSchema>;