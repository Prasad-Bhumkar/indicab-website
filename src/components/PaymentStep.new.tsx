'use client'
import { useState } from 'react'
import { useBookingContext } from '../context/BookingContext'
import type { BookingState } from '../context/BookingContext'

interface PaymentStepProps {
  booking: BookingState
  onBack: () => void
}

export default function PaymentStep({ booking, onBack }: PaymentStepProps) {
  const { state } = useBookingContext()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Payment successful!')
    } catch (err) {
      setError('Payment processing failed')
    } finally {
      setLoading(false)
    }
  }

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

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="card">Credit/Debit Card</option>
            <option value="wallet">Digital Wallet</option>
            <option value="netbanking">Net Banking</option>
          </select>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? 'Processing...' : `Pay $${state.fare.toFixed(2)}`}
        </button>
      </div>

      <button
        onClick={onBack}
        className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        ← Back to booking details
      </button>
    </div>
  )
}