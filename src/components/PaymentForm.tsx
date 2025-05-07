'use client'
import * as Sentry from '@sentry/nextjs'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'
import Button from './ui/Button'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function PaymentForm({ amount, bookingId }: { amount: number, bookingId: string }) {
  return (
    <Elements stripe={stripePromise} options={{ amount, currency: 'usd' }}>
      <CheckoutForm amount={amount} bookingId={bookingId} />
    </Elements>
  )
}

function CheckoutForm({ amount, bookingId }: { amount: number, bookingId: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    Sentry.addBreadcrumb({
      category: 'payment',
      message: 'Payment submission started',
      level: 'info',
    })

    setLoading(true)
    setError('')

    try {
      // Create payment intent
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, bookingId })
      })

      if (!res.ok) throw new Error('Payment failed')

      const { clientSecret } = await res.json()

      // Confirm payment
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/bookings/${bookingId}/confirmation`
        }
      })

      if (error) throw error

      Sentry.captureMessage('Payment completed successfully', 'info')
    } catch (err: unknown) {
      Sentry.captureException(err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Payment failed')
      }
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
        className="w-full"
      >
        {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  )
}
