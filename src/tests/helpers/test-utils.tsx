
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';

import type { BookingState } from '@/context/BookingContext';

// Custom render function that includes providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, options);
};

// Mock data generators
const mockUser = {
  name: 'Test User',
  email: 'test@example.com',
  id: '123',
};

const mockBooking: BookingState = {
  id: 'booking-123',
  pickupLocation: 'Delhi',
  dropLocation: 'Agra',
  pickupDate: new Date().toISOString(),
  returnDate: new Date(Date.now() + 86400000).toISOString(),
  vehicleType: 'Sedan',
  passengers: 2,
  contactName: 'Test User',
  contactEmail: 'test@example.com',
  contactPhone: '9876543210',
  specialRequests: '',
  totalAmount: 1000,
  fare: 0,
  status: 'confirmed',
};

// Mock API responses
const mockApiResponses = {
  success: { status: 'success', data: {} },
  error: { status: 'error', message: 'Something went wrong' },
};

// Export everything
export * from '@testing-library/react';
export { customRender, mockApiResponses, mockBooking, mockUser };

