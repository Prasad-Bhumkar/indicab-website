'use client'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { PaymentForm } from './PaymentForm'
import { useBookingContext } from '../context/BookingContext'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PaymentStep({ booking, onBack }: { 
  booking: any
  onBack: () => void 
}) {
  const { state } = useBookingContext()

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

      <Elements stripe={stripePromise}>
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
