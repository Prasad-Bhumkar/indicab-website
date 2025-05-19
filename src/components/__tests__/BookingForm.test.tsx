import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuthContext } from '../../context/AuthContext';
import { BookingContext } from '../../context/BookingContext';
import BookingForm from '../BookingForm';

// Mock the auth context
vi.mock('../../context/AuthContext', () => ({
    useAuthContext: vi.fn()
}));

// Mock the router
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn()
    })
}));

describe('BookingForm', () => {
    const mockDispatch = vi.fn();
    const mockUser = {
        id: '123',
        name: 'Test User',
        email: 'test@example.com'
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (useAuthContext as any).mockReturnValue({ user: mockUser });
    });

    it('renders the booking form with all required fields', () => {
        render(
            <BookingContext.Provider value={{ state: {}, dispatch: mockDispatch }}>
                <BookingForm />
            </BookingContext.Provider>
        );

        // Check for required form fields
        expect(screen.getByLabelText(/pickup location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/destination/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/vehicle type/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /continue to payment/i })).toBeInTheDocument();
    });

    it('shows validation errors for empty required fields', async () => {
        render(
            <BookingContext.Provider value={{ state: {}, dispatch: mockDispatch }}>
                <BookingForm />
            </BookingContext.Provider>
        );

        // Submit form without filling required fields
        const submitButton = screen.getByRole('button', { name: /continue to payment/i });
        fireEvent.click(submitButton);

        // Check for validation error messages
        await waitFor(() => {
            expect(screen.getByText(/pickup location is required/i)).toBeInTheDocument();
            expect(screen.getByText(/destination is required/i)).toBeInTheDocument();
            expect(screen.getByText(/vehicle type is required/i)).toBeInTheDocument();
        });
    });

    it('handles form submission with valid data', async () => {
        render(
            <BookingContext.Provider value={{ state: {}, dispatch: mockDispatch }}>
                <BookingForm />
            </BookingContext.Provider>
        );

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/pickup location/i), {
            target: { value: 'Mumbai' }
        });
        fireEvent.change(screen.getByLabelText(/destination/i), {
            target: { value: 'Delhi' }
        });
        fireEvent.change(screen.getByLabelText(/vehicle type/i), {
            target: { value: 'sedan' }
        });

        // Submit the form
        const submitButton = screen.getByRole('button', { name: /continue to payment/i });
        fireEvent.click(submitButton);

        // Verify dispatch was called with correct data
        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
                type: 'SET_BOOKING',
                payload: expect.objectContaining({
                    pickupLocation: 'Mumbai',
                    dropLocation: 'Delhi',
                    vehicleType: 'sedan'
                })
            }));
        });
    });

    it('redirects to login if user is not authenticated', async () => {
        (useAuthContext as any).mockReturnValue({ user: null });
        const mockRouter = { push: vi.fn() };

        render(
            <BookingContext.Provider value={{ state: {}, dispatch: mockDispatch }}>
                <BookingForm />
            </BookingContext.Provider>
        );

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/pickup location/i), {
            target: { value: 'Mumbai' }
        });
        fireEvent.change(screen.getByLabelText(/destination/i), {
            target: { value: 'Delhi' }
        });
        fireEvent.change(screen.getByLabelText(/vehicle type/i), {
            target: { value: 'sedan' }
        });

        // Submit the form
        const submitButton = screen.getByRole('button', { name: /continue to payment/i });
        fireEvent.click(submitButton);

        // Verify redirect to login
        await waitFor(() => {
            expect(screen.getByText(/please login to continue booking/i)).toBeInTheDocument();
        });
    });
}); 