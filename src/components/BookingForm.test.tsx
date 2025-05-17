import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import BookingForm from './BookingForm';
import { BookingContext, BookingState } from '../context/BookingContext';
import { AuthContext } from '../context/AuthContext';

// Mock useRouter from 'next/navigation'
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn().mockResolvedValue(undefined),
    }),
}));

// Mock PaymentStep to avoid Stripe initialization in tests
vi.mock('./PaymentStep', (): JSX.Element => {
    return {
        __esModule: true,
        default: () => <div data-testid="mock-payment-step">Mock Payment Step</div>,
    };
});

// Mock the booking API
const mockCreateBooking = vi.fn();
vi.mock('../services/booking/api', () => ({
    createBooking: mockCreateBooking,
}));

// Mock AuthContext value
const _mockAuthContextValue = {
    user: { id: 'user123', name: 'Test User' },
    signIn: vi.fn(),
    signOut: vi.fn(),
};

// Provide a mock BookingContext state matching BookingState type
const _mockBookingContextValue = {
    state: {
        id: '',
        pickupLocation: '',
        dropLocation: '',
        pickupDate: '',
        returnDate: '',
        vehicleType: '',
        fare: 0,
        customerId: '',
        status: 'pending',
    } as BookingState,
    dispatch: vi.fn(),
};

const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => (
    <AuthContext.Provider value={_mockAuthContextValue}>
        <BookingContext.Provider value={_mockBookingContextValue}>
            {children}
        </BookingContext.Provider>
    </AuthContext.Provider>
);

describe('BookingForm Component', (): JSX.Element => {
    const validFormData = {
        pickupLocation: 'Mumbai',
        dropLocation: 'Pune',
        pickupDate: '2024-04-01T10:00',
        returnDate: '2024-04-03T10:00',
        vehicleType: 'Sedan',
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockCreateBooking.mockResolvedValue({ id: '123', fare: 1000 });
    });

    test('renders form with required fields', (): JSX.Element => {
        render(<BookingForm />, { wrapper: AllProviders });

        expect(screen.getByLabelText(/pickup location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/destination/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/pickup date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/return date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/vehicle type/i)).toBeInTheDocument();
    });

    test('contains submit button', (): JSX.Element => {
        render(<BookingForm />, { wrapper: AllProviders });
        const submitButton = screen.getByRole('button', { name: /continue to payment/i });
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).not.toBeDisabled();
    });

    test('shows validation errors on empty submit', async (): JSX.Element => {
        render(<BookingForm />, { wrapper: AllProviders });
        const submitButton = screen.getByRole('button', { name: /continue to payment/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/pickup location is required/i)).toBeInTheDocument();
            expect(screen.getByText(/destination is required/i)).toBeInTheDocument();
            expect(screen.getByText(/pickup date is required/i)).toBeInTheDocument();
            expect(screen.getByText(/vehicle type is required/i)).toBeInTheDocument();
        });
    });

    test('validates return date is after pickup date', async (): JSX.Element => {
        render(<BookingForm />, { wrapper: AllProviders });

        // Fill in pickup date after return date
        fireEvent.change(screen.getByLabelText(/pickup date/i), { target: { value: '2024-04-03T10:00' } });
        fireEvent.change(screen.getByLabelText(/return date/i), { target: { value: '2024-04-01T10:00' } });
        fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));

        await waitFor(() => {
            expect(screen.getByText(/return date must be after pickup date/i)).toBeInTheDocument();
        });
    });

    test('submits form with valid data', async (): JSX.Element => {
        render(<BookingForm />, { wrapper: AllProviders });

        // Fill in all form fields
        Object.entries(validFormData).forEach(([field, value]) => {
            fireEvent.change(screen.getByLabelText(new RegExp(field.replace(/([A-Z])/g, ' $1').toLowerCase(), 'i')), {
                target: { value },
            });
        });

        fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));

        await waitFor(() => {
            expect(mockCreateBooking).toHaveBeenCalledWith(expect.objectContaining(validFormData));
        });
    });

    test('handles API errors gracefully', async (): JSX.Element => {
        mockCreateBooking.mockRejectedValueOnce(new Error('Network error'));
        render(<BookingForm />, { wrapper: AllProviders });

        // Fill in all form fields
        Object.entries(validFormData).forEach(([field, value]) => {
            fireEvent.change(screen.getByLabelText(new RegExp(field.replace(/([A-Z])/g, ' $1').toLowerCase(), 'i')), {
                target: { value },
            });
        });

        fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));

        await waitFor(() => {
            expect(screen.getByText(/failed to create booking/i)).toBeInTheDocument();
        });
    });

    test('disables form submission while submitting', async (): JSX.Element => {
        mockCreateBooking.mockImplementationOnce(() => new Promise(_resolve => setTimeout(_resolve, 100)));
        render(<BookingForm />, { wrapper: AllProviders });

        // Fill in all form fields
        Object.entries(validFormData).forEach(([field, value]) => {
            fireEvent.change(screen.getByLabelText(new RegExp(field.replace(/([A-Z])/g, ' $1').toLowerCase(), 'i')), {
                target: { value },
            });
        });

        const submitButton = screen.getByRole('button', { name: /continue to payment/i });
        fireEvent.click(submitButton);

        expect(submitButton).toBeDisabled();
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        await waitFor(() => {
            expect(submitButton).not.toBeDisabled();
            expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
        });
    });

    test('clears form after successful submission', async (): JSX.Element => {
        render(<BookingForm />, { wrapper: AllProviders });

        // Fill in all form fields
        Object.entries(validFormData).forEach(([field, value]) => {
            const input = screen.getByLabelText(new RegExp(field.replace(/([A-Z])/g, ' $1').toLowerCase(), 'i'));
            fireEvent.change(input, { target: { value } });
            expect(input).toHaveValue(value);
        });

        fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));

        await waitFor(() => {
            // Check that all fields are cleared
            Object.keys(validFormData).forEach(field => {
                const input = screen.getByLabelText(new RegExp(field.replace(/([A-Z])/g, ' $1').toLowerCase(), 'i'));
                expect(input).toHaveValue('');
            });
        });
    });

    test('shows success message after booking creation', async (): JSX.Element => {
        render(<BookingForm />, { wrapper: AllProviders });

        // Fill in all form fields
        Object.entries(validFormData).forEach(([field, value]) => {
            fireEvent.change(screen.getByLabelText(new RegExp(field.replace(/([A-Z])/g, ' $1').toLowerCase(), 'i')), {
                target: { value },
            });
        });

        fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));

        await waitFor(() => {
            expect(screen.getByText(/booking created successfully/i)).toBeInTheDocument();
            expect(screen.getByText(/fare: ₹1,000/i)).toBeInTheDocument();
        });
    });

    test('matches snapshot', (): JSX.Element => {
        const { container } = render(<BookingForm />, { wrapper: AllProviders });
        expect(container).toMatchSnapshot();
    });
});
