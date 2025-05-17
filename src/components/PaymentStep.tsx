'use client'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { PaymentForm } from './PaymentForm'
import { useBookingContext } from '../context/BookingContext'
import { useEffect, useState } from 'react'

// Mock Stripe for testing
const _mockStripe = {
    elements: () => ({
        create: () => { },
        update: () => { },
        mount: () => { },
        unmount: () => { },
        destroy: () => { },
    }),
}

const _stripePromise = process.env.NODE_ENV === 'test'
    ? Promise.resolve(_mockStripe)
    : loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export default function PaymentStep({ booking, onBack }: {
    booking: any
    onBack: () => void
}): JSX.Element {
    const { state } = useBookingContext()
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        if (process.env.NODE_ENV === 'test') {
            setClientSecret('mock_client_secret')
            return
        }

        // Fetch the client secret from your server
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: state.fare }),
        })
            .then((_res) => _res.json())
            .then((_data) => setClientSecret(_data.clientSecret))
            .catch((_err) => console.error('Error fetching client secret:', _err))
    }, [state.fare])

    if (!clientSecret) return null

    return (
        <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-lg mb-2">Booking Summary</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Vehicle:</div>
                    <div>{state.vehicleType}</div>
                    <div className="text-gray-500">Pickup:</div>
                    <div>{state.pickup}</div>
                    <div className="text-gray-500">Destination:</div>
                    <div>{state.destination}</div>
                    <div className="text-gray-500">Dates:</div>
                    <div>
                        {state.startDate?.toLocaleDateString()} - {state.endDate?.toLocaleDateString()}
                    </div>
                    <div className="text-gray-500">Total:</div>
                    <div className="font-medium">${state.fare}</div>
                </div>
            </div>

            <Elements stripe={_stripePromise} options={{ clientSecret }}>
                <PaymentForm
                    amount={state.fare}
                    bookingId={booking.id}
                />
            </Elements>

            <button
                onClick={onBack}
                className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
                ← Back to booking details
            </button>
        </div>
    )
}
