import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { PaymentForm } from './PaymentForm';

// Mock Stripe
vi.mock('@stripe/stripe-js', () => ({
    loadStripe: () => Promise.resolve({
        elements: () => ({
            create: () => ({
                mount: vi.fn(),
                unmount: vi.fn(),
                destroy: vi.fn(),
            }),
        }),
    }),
}));

describe('PaymentForm', (): JSX.Element => {
    const mockProps = {
        amount: 1000,
        bookingId: 'test-booking-123',
        onSuccess: vi.fn(),
        onError: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders payment form with correct amount', (): JSX.Element => {
        render(<PaymentForm {...mockProps} />);
        expect(screen.getByText(/₹1,000/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /pay/i })).toBeInTheDocument();
    });

    it('displays loading state while processing payment', async (): JSX.Element => {
        render(<PaymentForm {...mockProps} />);
        const payButton = screen.getByRole('button', { name: /pay/i });

        fireEvent.click(payButton);

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
        expect(payButton).toBeDisabled();
    });

    it('handles successful payment', async (): JSX.Element => {
        const mockCreatePaymentIntent = vi.fn().mockResolvedValue({
            clientSecret: 'test_secret',
        });

        global.fetch = vi.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ clientSecret: 'test_secret' }),
            })
        );

        render(<PaymentForm {...mockProps} />);
        const payButton = screen.getByRole('button', { name: /pay/i });

        fireEvent.click(payButton);

        await waitFor(() => {
            expect(mockProps.onSuccess).toHaveBeenCalled();
        });
    });

    it('handles payment error', async (): JSX.Element => {
        global.fetch = vi.fn().mockImplementation(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: 'Payment failed' }),
            })
        );

        render(<PaymentForm {...mockProps} />);
        const payButton = screen.getByRole('button', { name: /pay/i });

        fireEvent.click(payButton);

        await waitFor(() => {
            expect(mockProps.onError).toHaveBeenCalledWith('Payment failed');
        });
    });

    it('validates required fields', (): JSX.Element => {
        render(<PaymentForm {...mockProps} amount={0} bookingId="" />);
        const payButton = screen.getByRole('button', { name: /pay/i });

        fireEvent.click(payButton);

        expect(screen.getByText(/invalid amount/i)).toBeInTheDocument();
        expect(screen.getByText(/booking id required/i)).toBeInTheDocument();
    });

    it('cleans up Stripe elements on unmount', (): JSX.Element => {
        const { unmount } = render(<PaymentForm {...mockProps} />);
        const mockStripeElement = {
            unmount: vi.fn(),
            destroy: vi.fn(),
        };

        unmount();

        expect(mockStripeElement.unmount).toHaveBeenCalled();
        expect(mockStripeElement.destroy).toHaveBeenCalled();
    });
}); 
