'use client'
import { useCallback, useEffect, useState } from 'react'

import * as Sentry from '@sentry/nextjs'
import { Elements } from '@stripe/react-stripe-js'
import type { Stripe } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-hot-toast'

import { useBookingContext } from '../context/BookingContext'
import { formatCurrency } from '../utils/format'

import { PaymentForm } from './PaymentForm'

// Mock Stripe for testing
const mockStripe = {
    elements: () => ({
        create: () => { },
        update: () => { },
        mount: () => { },
        unmount: () => { },
        destroy: () => { },
    }),
}

const stripePromise = process.env.NODE_ENV === 'test'
    ? Promise.resolve(mockStripe as unknown as Stripe)
    : loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

interface PaymentStepProps {
    onBack: () => void
}

export default function PaymentStep({ onBack }: PaymentStepProps): JSX.Element | null {
    const { t } = useTranslation()
    const { state } = useBookingContext()
    const [clientSecret, setClientSecret] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>('')

    const fetchPaymentIntent = useCallback(async () => {
        if (process.env.NODE_ENV === 'test') {
            setClientSecret('mock_client_secret')
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError('')

            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    amount: state.fare,
                    currency: 'inr',
                    metadata: {
                        bookingId: state.id,
                        vehicleType: state.vehicleType,
                    }
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create payment intent')
            }

            const data = await response.json()
            setClientSecret(data.clientSecret)

            Sentry.addBreadcrumb({
                category: 'payment',
                message: 'Payment intent created',
                level: 'info',
                data: {
                    bookingId: state.id,
                    amount: state.fare,
                },
            })
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to initialize payment'
            setError(errorMessage)
            toast.error(t(errorMessage))
            
            Sentry.captureException(err, {
                tags: { component: 'PaymentStep' },
                extra: { bookingId: state.id },
            })
        } finally {
            setLoading(false)
        }
    }, [state.fare, state.id, state.vehicleType, t])

    useEffect(() => {
        fetchPaymentIntent()
    }, [fetchPaymentIntent])

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                <span className="ml-3 text-gray-600">{t('Initializing payment...')}</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-md">
                <h3 className="text-red-800 font-medium mb-2">{t('Payment Error')}</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                    onClick={fetchPaymentIntent}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                >
                    {t('Try Again')}
                </button>
            </div>
        )
    }

    if (!clientSecret) {
        return null
    }

    if (!state.pickupDate || !state.returnDate) {
        return null;
    }

    return (
        <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-lg mb-2">{t('Booking Summary')}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">{t('Vehicle')}:</div>
                    <div>{state.vehicleType}</div>
                    <div className="text-gray-500">{t('Pickup')}:</div>
                    <div>{state.pickupLocation}</div>
                    <div className="text-gray-500">{t('Destination')}:</div>
                    <div>{state.dropLocation}</div>
                    <div className="text-gray-500">{t('Dates')}:</div>
                    <div>
                        {new Date(state.pickupDate).toLocaleDateString()} - {state.returnDate ? new Date(state.returnDate).toLocaleDateString() : ''}
                    </div>
                    <div className="text-gray-500">{t('Total')}:</div>
                    <div className="font-medium">{formatCurrency(state.fare)}</div>
                </div>
            </div>

            <Elements 
                stripe={stripePromise} 
                options={{ 
                    clientSecret,
                    appearance: {
                        theme: 'stripe',
                        variables: {
                            colorPrimary: '#3B82F6',
                            colorBackground: '#ffffff',
                            colorText: '#1F2937',
                            colorDanger: '#EF4444',
                            fontFamily: 'system-ui, sans-serif',
                            spacingUnit: '4px',
                            borderRadius: '4px',
                        },
                    },
                }}
            >
                <PaymentForm
                    amount={state.fare}
                    bookingId={state.id}
                    onSuccess={() => {
                        toast.success(t('Payment successful!'))
                        Sentry.captureMessage('Payment completed successfully', {
                            level: 'info',
                            tags: { bookingId: state.id },
                        })
                    }}
                    onError={(error) => {
                        toast.error(t('Payment failed'))
                        Sentry.captureException(error, {
                            tags: { component: 'PaymentForm' },
                            extra: { bookingId: state.id },
                        })
                    }}
                />
            </Elements>

            <button
                onClick={onBack}
                className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
            >
                ← {t('Back to booking details')}
            </button>
        </div>
    )
}
