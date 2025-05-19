import type React from 'react';

import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';


import { _TestProviders } from '../setup';

// Custom render function that includes providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    wrapper: _TestProviders,
    ...options,
  });
};

// Mock data generators
const mockUser = {
  name: 'Test User',
  email: 'test@example.com',
  id: '123',
};

const mockBooking = {
  id: 'booking-123',
  from: 'Delhi',
  to: 'Agra',
  date: new Date().toISOString(),
  status: 'confirmed',
  userId: '123',
};

// Mock API responses
const mockApiResponses = {
  success: { status: 'success', data: {} },
  error: { status: 'error', message: 'Something went wrong' },
};

// Export everything
export * from '@testing-library/react';
export { mockApiResponses, mockBooking, mockUser, customRender as render };
