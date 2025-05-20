import { BookingFormData } from '@/types/booking';
import { ValidationError } from '../../errors/errorHandler';

/**
 * Validates booking data before processing
 * @param data - The booking form data to validate
 * @throws ValidationError if data is invalid
 */
export async function validateBookingData(data: BookingFormData): Promise<void> {
  const errors: Record<string, string> = {};

  // Required fields check
  if (!data.pickupLocation) {
    errors.pickupLocation = 'Pickup location is required';
  }

  if (!data.dropLocation) {
    errors.dropLocation = 'Drop location is required';
  }

  if (!data.pickupDate) {
    errors.pickupDate = 'Pickup date is required';
  }

  if (!data.vehicleType) {
    errors.vehicleType = 'Vehicle type is required';
  }

  // Date validation
  if (data.pickupDate) {
    const pickupDate = new Date(data.pickupDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(pickupDate.getTime())) {
      errors.pickupDate = 'Invalid pickup date format';
    } else if (pickupDate < today) {
      errors.pickupDate = 'Pickup date cannot be in the past';
    }
  }

  if (data.returnDate) {
    const returnDate = new Date(data.returnDate);
    
    if (isNaN(returnDate.getTime())) {
      errors.returnDate = 'Invalid return date format';
    } else if (data.pickupDate) {
      const pickupDate = new Date(data.pickupDate);
      if (returnDate < pickupDate) {
        errors.returnDate = 'Return date must be after pickup date';
      }
    }
  }

  // Throw validation error if any issues found
  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Booking validation failed', {
      details: errors
    });
  }
}
