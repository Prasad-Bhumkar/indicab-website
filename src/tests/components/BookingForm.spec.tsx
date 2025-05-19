import { describe, expect, it, vi } from 'vitest';

import { BookingForm } from '@/components/BookingForm';

import { fireEvent, render, screen, waitFor } from '../helpers/test-utils';

// Mock the API call
vi.mock('@/lib/api', () => ({
  createBooking: vi.fn(() => Promise.resolve({ status: 'success' })),
}));

describe('BookingForm', () => {
  it('renders the booking form with all required fields', () => {
    render(<BookingForm />);
    
    // Check for required form fields
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/passenger name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/passenger phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/passenger email/i)).toBeInTheDocument();
  });

  it('validates required fields before submission', async () => {
    render(<BookingForm />);
    
    // Try to submit without filling required fields
    fireEvent.click(screen.getByRole('button', { name: /book now/i }));
    
    // Check for validation messages
    await waitFor(() => {
      expect(screen.getByText(/from is required/i)).toBeInTheDocument();
      expect(screen.getByText(/to is required/i)).toBeInTheDocument();
      expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    render(<BookingForm />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/from/i), { target: { value: 'Delhi' } });
    fireEvent.change(screen.getByLabelText(/to/i), { target: { value: 'Agra' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-04-01' } });
    fireEvent.change(screen.getByLabelText(/passenger name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/passenger phone/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/passenger email/i), { target: { value: 'test@example.com' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /book now/i }));
    
    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/booking successful/i)).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    // Mock API error
    vi.mocked(createBooking).mockRejectedValueOnce(new Error('API Error'));
    
    render(<BookingForm />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/from/i), { target: { value: 'Delhi' } });
    fireEvent.change(screen.getByLabelText(/to/i), { target: { value: 'Agra' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-04-01' } });
    fireEvent.change(screen.getByLabelText(/passenger name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/passenger phone/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/passenger email/i), { target: { value: 'test@example.com' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /book now/i }));
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
}); 