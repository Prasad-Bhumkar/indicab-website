'use client'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from './ui/button'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  amount: number
  bookingId: string
}

export function PaymentForm({ amount, bookingId }: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} bookingId={bookingId} />
    </Elements>
  )
}

function CheckoutForm({ amount, bookingId }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount,
          bookingId,
          currency: 'usd'
        })
      })

      if (!res.ok) {
        throw new Error('Failed to create payment intent')
      }

      const { clientSecret } = await res.json()

      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/bookings/${bookingId}/confirmation`
        }
      })

      if (stripeError) {
        throw stripeError
      }

      alert('Payment successful!')
    } catch (err: any) {
      setError(err.message || 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button 
        type="submit" 
        disabled={!stripe || loading}
        className="w-full mt-4"
      >
        {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  )
}