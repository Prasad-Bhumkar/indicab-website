'use client'
import { Button } from '@/components/ui/button'
import * as Sentry from '@sentry/nextjs'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useTranslation } from 'next-i18next'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { formatCurrency } from '../utils/format'

interface PaymentFormProps {
  amount: number
  bookingId: string
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function PaymentForm({ amount, bookingId, onSuccess, onError }: PaymentFormProps): JSX.Element {
  return (
    <Elements 
      stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)} 
      options={{ 
        amount, 
        currency: 'inr',
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
      <CheckoutForm 
        amount={amount} 
        bookingId={bookingId} 
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  )
}

interface CheckoutFormProps extends PaymentFormProps {}

function CheckoutForm({ amount, bookingId, onSuccess, onError }: CheckoutFormProps): JSX.Element {
  const { t } = useTranslation()
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) {
      const error = new Error('Stripe not initialized')
      onError?.(error)
      return
    }

    Sentry.addBreadcrumb({
      category: 'payment',
      message: 'Payment submission started',
      level: 'info',
      data: {
        bookingId,
        amount,
      },
    })

    setLoading(true)
    setError('')

    try {
      // Create payment intent
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount, 
          bookingId,
          currency: 'inr',
          metadata: {
            bookingId,
            amount: amount.toString(),
          }
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Payment failed')
      }

      const { clientSecret } = await response.json()

      // Confirm payment
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/bookings/${bookingId}/confirmation`,
          payment_method_data: {
            billing_details: {
              name: 'Customer Name', // You might want to get this from user context
            },
          },
        },
        redirect: 'if_required',
      })

      if (stripeError) {
        throw stripeError
      }

      Sentry.captureMessage('Payment completed successfully', {
        level: 'info',
        tags: { bookingId },
      })
      
      toast.success(t('Payment successful!'))
      onSuccess?.()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed'
      setError(errorMessage)
      toast.error(t(errorMessage))
      
      Sentry.captureException(err, {
        tags: { component: 'PaymentForm' },
        extra: { bookingId, amount },
      })
      
      onError?.(err instanceof Error ? err : new Error(errorMessage))
    } finally {
      setLoading(false)
    }
  }, [stripe, elements, amount, bookingId, onSuccess, onError, t])

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4"
      aria-label={t('Payment form')}
    >
      <div className="bg-gray-50 p-4 rounded-md">
        <PaymentElement 
          options={{
            layout: 'tabs',
            defaultValues: {
              billingDetails: {
                name: 'Customer Name', // You might want to get this from user context
              },
            },
          }}
        />
      </div>

      {error && (
        <div 
          className="text-red-500 text-sm p-3 bg-red-50 rounded-md" 
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-busy={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {t('Processing...')}
          </span>
        ) : (
          t('Pay {{amount}}', { amount: formatCurrency(amount) })
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        {t('Your payment is secured by Stripe')}
      </p>
    </form>
  )
}
