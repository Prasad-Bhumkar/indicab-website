import { BookingFormData } from '@/types/booking';

export async function validateBookingData(data: BookingFormData): Promise<void> {
  if (!data.pickup || !data.destination) {
    throw new Error('Pickup and destination locations are required');
  }
  
  if (!data.startDate || !data.endDate) {
    throw new Error('Start and end dates are required');
  }
  
  if (data.startDate >= data.endDate) {
    throw new Error('End date must be after start date');
  }
  
  if (!data.vehicleType) {
    throw new Error('Vehicle type is required');
  }
  
  if (typeof data.fare !== 'number' || data.fare <= 0) {
    throw new Error('Fare must be a positive number');
  }
  
  if (!data.customerId) {
    throw new Error('Customer ID is required');
  }
}