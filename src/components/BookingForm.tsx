'use client'
import * as Sentry from '@sentry/nextjs'
import { useState, useContext, useEffect } from 'react'
import { BookingState } from '../context/BookingContext' // Import BookingState type
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { BookingContext } from '../context/BookingContext'
import { useAuthContext } from '../context/AuthContext'
import LocationSearch from './booking/LocationSearch'
import DateRangePicker from './DateRangePicker'
import VehicleTypeSelector from './VehicleTypeSelector'
import { calculateFare } from '../lib/pricing' // Updated import statement
import { createBooking } from '../services/booking/api' // Updated import statement
import PaymentStep from './PaymentStep'

type BookingFormData = z.infer<typeof bookingSchema>

const bookingSchema = z.object({
  pickup: z.string().min(1, 'Pickup location is required'),
  destination: z.string().min(1, 'Destination is required'),
  startDate: z.date(),
  endDate: z.date(),
  vehicleType: z.string().min(1, 'Vehicle type is required')
})

import ErrorBoundary from './common/ErrorBoundary'
import BookingProgress from './BookingProgress'

export default function BookingForm() {
  const router = useRouter()
  const { user } = useAuthContext()
  const { dispatch } = useContext(BookingContext)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('') // Explicit type definition

  const handleError = (error: unknown) => { // Improved error handling
    console.error('BookingForm error:', error)
    setError(error instanceof Error ? error.message : 'An unknown error occurred')
  }

  const [defaultValues, setDefaultValues] = useState<Partial<BookingFormData>>({
    pickup: '',
    destination: '',
    startDate: new Date(),
    endDate: new Date(Date.now() + 86400000),
    vehicleType: ''
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDefaultValues({
        pickup: localStorage.getItem('booking_pickup') || '',
        destination: localStorage.getItem('booking_destination') || '',
        startDate: new Date(localStorage.getItem('booking_startDate') || Date.now()),
        endDate: new Date(localStorage.getItem('booking_endDate') || Date.now() + 86400000),
        vehicleType: localStorage.getItem('booking_vehicleType') || ''
      })
    }
  }, [])

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues
  })

  const persistFormData = (data: Partial<BookingFormData>) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Date) {
        localStorage.setItem(`booking_${key}`, value.toISOString())
      } else if (typeof value === 'string') {
        localStorage.setItem(`booking_${key}`, value)
      }
    })
  }

  const onSubmit = async (data: BookingFormData) => {
    if (!user) {
      setError('Please login to continue booking')
      router.push('/auth/login')
      return
    }

    Sentry.addBreadcrumb({
      category: 'booking',
      message: 'Booking submission started',
      level: 'info',
    })

    setLoading(true)
    try {
      // Validate date range
      if (data.startDate >= data.endDate) {
        throw new Error('End date must be after start date')
      }
      
      // Validate pickup and destination are different
      if (data.pickup.toLowerCase() === data.destination.toLowerCase()) {
        throw new Error('Pickup and destination cannot be the same')
      }

      const fare = calculateFare(data.vehicleType, data.startDate, data.endDate)
      const bookingData = {
        pickupLocation: data.pickup,
        dropLocation: data.destination,
        pickupDate: data.startDate.toISOString(),
        returnDate: data.endDate.toISOString(),
        vehicleType: data.vehicleType,
        customerId: user.id,
        fare,
        status: 'pending' as const
      }
      const bookingResponse = await createBooking(bookingData)
      persistFormData(data)

      Sentry.captureMessage('Booking created successfully', 'info')
      
      const bookingState: BookingState = {
        id: bookingResponse.id || '',
        pickupLocation: data.pickup,
        dropLocation: data.destination,
        pickupDate: data.startDate.toISOString(),
        returnDate: data.endDate.toISOString(),
        vehicleType: data.vehicleType,
        fare: bookingResponse.fare || 0,
        customerId: user.id,
        status: 'pending'
      }

      dispatch({
        type: 'SET_BOOKING',
        payload: bookingState
      })
      setStep(2)
    } catch (err: unknown) {
      Sentry.captureException(err)
      setError(err instanceof Error ? err.message : 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ErrorBoundary 
      onError={handleError}
      fallback={
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-red-800 mb-4">Booking Error</h3>
          <p className="text-red-700 mb-4">
            We encountered an issue loading the booking form. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Refresh Page
          </button>
        </div>
      }
    >
      <div className="bg-white rounded-lg shadow-md p-6">
        <BookingProgress />
      <div className="flex mb-6">
        {[1, 2].map((i) => (
          <div key={i} className="flex-1">
            <div className={`h-2 rounded-full ${step >= i ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <p className={`text-sm mt-2 ${step >= i ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              {i === 1 ? 'Trip Details' : 'Payment'}
            </p>
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
<LocationSearch 
  name="pickup"
  control={control}
  label="Pickup Location"
  placeholder="Enter pickup location"
  error={errors.pickup}
  disabled={loading}
  aria-required="true"
  aria-invalid={errors.pickup ? "true" : "false"}
  aria-describedby={errors.pickup ? "pickup-error" : undefined}
/>

{errors.pickup && (
  <span id="pickup-error" role="alert" className="text-red-600 text-sm mt-1">
    {errors.pickup.message}
  </span>
)}

<LocationSearch 
  name="destination"
  control={control}
  label="Destination"
  placeholder="Enter destination"
  error={errors.destination}
  disabled={loading}
  aria-required="true"
  aria-invalid={errors.destination ? "true" : "false"}
  aria-describedby={errors.destination ? "destination-error" : undefined}
/>

{errors.destination && (
  <span id="destination-error" role="alert" className="text-red-600 text-sm mt-1">
    {errors.destination.message}
  </span>
)}

<DateRangePicker 
  control={control}
  startName="startDate"
  endName="endDate"
  errors={errors}
  aria-label="Select start and end dates"
/>

<VehicleTypeSelector 
  name="vehicleType"
  control={control}
  error={errors.vehicleType}
  disabled={loading}
  aria-required="true"
  aria-invalid={errors.vehicleType ? "true" : "false"}
  aria-describedby={errors.vehicleType ? "vehicleType-error" : undefined}
/>

{errors.vehicleType && (
  <span id="vehicleType-error" role="alert" className="text-red-600 text-sm mt-1">
    {errors.vehicleType.message}
  </span>
)}


<button
  type="submit"
  disabled={loading}
  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  aria-disabled={loading}
>
  {loading ? (
    <span className="flex items-center justify-center">
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing...
    </span>
  ) : 'Continue to Payment'}
</button>

          </div>
        </form>
      ) : (
        <PaymentStep 
          booking={{
            ...watch(),
            id: '',
            fare: 0,
            customerId: user?.id || '',
            status: 'pending'
          }}
          onBack={() => setStep(1)} 
        />
      )}
      </div>
    </ErrorBoundary>
  )
}
