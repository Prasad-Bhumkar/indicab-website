import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import BookingForm from './BookingForm';
import { describe, expect, test, vi } from 'vitest';

describe('BookingForm Component', () => {
  test('renders form with required fields', () => {
    render(<BookingForm />);
    
    expect(screen.getByLabelText(/pickup location/i)).toBeTruthy();
    expect(screen.getByLabelText(/destination/i)).toBeTruthy();
    expect(screen.getByLabelText(/start date/i)).toBeTruthy();
    expect(screen.getByLabelText(/end date/i)).toBeTruthy();
    expect(screen.getByLabelText(/vehicle type/i)).toBeTruthy();
  });

  test('contains submit button', () => {
    render(<BookingForm />);
    const submitButton = screen.getByRole('button', { name: /continue to payment/i });
    expect(submitButton).toBeTruthy();
  });

  test('shows validation errors on empty submit', async () => {
    render(<BookingForm />);
    const submitButton = screen.getByRole('button', { name: /continue to payment/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/pickup location is required/i)).toBeInTheDocument();
      expect(screen.getByText(/destination is required/i)).toBeInTheDocument();
      expect(screen.getByText(/vehicle type is required/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    const mockCreateBooking = vi.fn().mockResolvedValue({ id: '123', fare: 100 });
    vi.mock('../services/booking/api', () => ({
      createBooking: mockCreateBooking,
    }));

    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/pickup location/i), { target: { value: 'Mumbai' } });
    fireEvent.change(screen.getByLabelText(/destination/i), { target: { value: 'Pune' } });
    fireEvent.change(screen.getByLabelText(/vehicle type/i), { target: { value: 'Sedan' } });
    fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));

    await waitFor(() => {
      expect(mockCreateBooking).toHaveBeenCalled();
    });
  });

  test('matches snapshot', () => {
    const { container } = render(<BookingForm />);
    expect(container).toMatchSnapshot();
  });
});
