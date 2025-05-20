import React from "react";

import type { Meta, StoryObj } from '@storybook/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { AuthProvider } from '../context/AuthContext';
import { BookingProvider } from '../context/BookingContext';
import { NextRouterMockProvider } from '../tests/NextRouterMockProvider';

import BookingForm from './BookingForm';



const _stripePromise = loadStripe('pk_test_12345'); // Replace with your test/public key

const _meta: Meta<typeof BookingForm> = {
    title: 'Components/BookingForm',
    component: BookingForm,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story): JSX.Element => (
            <NextRouterMockProvider>
                <AuthProvider>
                    <BookingProvider>
                        <Elements stripe={_stripePromise}>
                            <Story />
                        </Elements>
                    </BookingProvider>
                </AuthProvider>
            </NextRouterMockProvider>
        ),
    ],
    tags: ['autodocs'],
};


export default _meta;
type Story = StoryObj<typeof BookingForm>;

export const Default: Story = {
    args: {},
};

export const WithPrefilledData: Story = {
    args: {
        initialData: {
            pickupLocation: 'Mumbai Airport',
            dropLocation: 'Pune City',
            pickupDate: '2024-04-01T10:00',
            returnDate: '2024-04-03T10:00',
            vehicleType: 'SUV',
        },
    },
};

export const Loading: Story = {
    args: {
        isLoading: true,
    },
};

export const WithError: Story = {
    args: {
        error: 'Failed to create booking. Please try again.',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const WithSuccessMessage: Story = {
    args: {
        successMessage: 'Booking created successfully! Your fare is ₹1,000',
    },
};
