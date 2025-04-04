import { render, screen } from '@testing-library/react';

import BookingForm from './BookingForm';
import { describe, expect, test } from 'vitest';

// No need to import describe from @jest/globals as it's globally available in Jest

describe('BookingForm Component', () => {
  test('renders form with required fields', () => {
    render(<BookingForm />);
    
    expect(screen.getByLabelText(/pickup location/i)).toBeTruthy();
    expect(screen.getByLabelText(/destination/i)).toBeTruthy();
    expect(screen.getByLabelText(/date/i)).toBeTruthy();
    expect(screen.getByLabelText(/time/i)).toBeTruthy();
    expect(screen.getByLabelText(/vehicle type/i)).toBeTruthy();
  });

  test('contains submit button', () => {
    render(<BookingForm />);
    const bookNowButton = screen.getByRole('button', { name: /book now/i });
    expect(bookNowButton).toBeTruthy();
  });

  test('matches snapshot', () => {
    const { container } = render(<BookingForm />);
    expect(container).toMatchSnapshot();
  });
});