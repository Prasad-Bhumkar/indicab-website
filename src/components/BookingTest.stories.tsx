import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';
import { Elements } from '@stripe/react-stripe-js';
import type { Stripe } from '@stripe/stripe-js';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { vi } from 'vitest';

import { AuthContext } from '../context/AuthContext';
import { BookingContext } from '../context/BookingContext';

import BookingTest from './BookingTest';

// Mock Stripe
const _mockStripe = {
    elements: () => ({
        create: vi.fn(),
        update: vi.fn(),
        mount: vi.fn(),
        unmount: vi.fn(),
        destroy: vi.fn(),
    }),
    redirectToCheckout: vi.fn(),
    confirmPayment: vi.fn(),
    confirmCardPayment: vi.fn(),
    confirmAcssDebitPayment: vi.fn(),
    confirmUsBankAccountPayment: vi.fn(),
    confirmAlipayPayment: vi.fn(),
    confirmAuBecsDebitPayment: vi.fn(),
    confirmBancontactPayment: vi.fn(),
    confirmBlikPayment: vi.fn(),
    confirmBoletoPayment: vi.fn(),
    confirmEpsPayment: vi.fn(),
    confirmFpxPayment: vi.fn(),
    confirmGiropayPayment: vi.fn(),
    confirmGrabPayPayment: vi.fn(),
    confirmIdealPayment: vi.fn(),
    confirmKlarnaPayment: vi.fn(),
    confirmKonbiniPayment: vi.fn(),
    confirmOxxoPayment: vi.fn(),
    confirmP24Payment: vi.fn(),
    confirmPayNowPayment: vi.fn(),
    confirmPromptPayPayment: vi.fn(),
    confirmSepaDebitPayment: vi.fn(),
    confirmSofortPayment: vi.fn(),
    confirmWechatPayPayment: vi.fn(),
    createPaymentMethod: vi.fn(),
    createToken: vi.fn(),
    createSource: vi.fn(),
    handleCardAction: vi.fn(),
    handleNextAction: vi.fn(),
    paymentRequest: vi.fn(),
    retrievePaymentIntent: vi.fn(),
    retrieveSetupIntent: vi.fn(),
    verifyMicrodepositsForPayment: vi.fn(),
    verifyMicrodepositsForSetup: vi.fn(),
    _registerWrapper: vi.fn(),
} as unknown as Stripe;

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        refresh: vi.fn(),
        forward: vi.fn(),
        beforePopState: vi.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js app router
const _appRouter = {
    back: vi.fn(),
    forward: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
};
// Mock context providers wrapper
const ContextWrapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const _mockDispatch = vi.fn();
    const mockUser = {
        id: '123',
        email: 'test@example.com',
    };

    return (
        <AppRouterContext.Provider value={_appRouter}>
            <AuthContext.Provider value={{ user: mockUser, status: 'authenticated', signIn: vi.fn(), signOut: vi.fn() }}>
                <BookingContext.Provider value={{
                    state: {
                        id: '',
                        pickupLocation: '',
                        dropLocation: '',
                        pickupDate: '',
                        returnDate: '',
                        vehicleType: '',
                        fare: 0,
                        customerId: mockUser.id,
                        status: 'pending'
                    }, dispatch: _mockDispatch
                }}>
                    <Elements stripe={_mockStripe}>
                        {children}
                    </Elements>
                </BookingContext.Provider>
            </AuthContext.Provider>
        </AppRouterContext.Provider>
    );
};

export default {
    title: 'Components/BookingTest',
    component: BookingTest,
    decorators: [
        (_Story): JSX.Element => (
            <ContextWrapper>
                <_Story />
            </ContextWrapper>
        ),
    ],
} as Meta<typeof BookingTest>;

const _Template: StoryFn<typeof BookingTest> = () => <BookingTest />;

export const _Default = _Template.bind({});
_Default.args = {};
