'use client'
import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { BookingContext } from '../context/BookingContext'
import { useAuthContext } from '../context/AuthContext'
import LocationSearch from './booking/LocationSearch'
import DateRangePicker from './DateRangePicker'
import VehicleTypeSelector from './VehicleTypeSelector'
import { calculateFare } from '../../lib/pricing'
import { createBooking } from '../../services/booking/api'
import PaymentStep from './PaymentStep.new'

type BookingFormData = z.infer<typeof bookingSchema>

const bookingSchema = z.object({
  pickup: z.string().min(1, 'Pickup location is required'),
  destination: z.string().min(1, 'Destination is required'),
  startDate: z.date(),
  endDate: z.date(),
  vehicleType: z.string().min(1, 'Vehicle type is required')
})

export default function BookingForm() {
  const router = useRouter()
  const { user } = useAuthContext()
  const { dispatch } = useContext(BookingContext)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      pickup: localStorage.getItem('booking_pickup') || '',
      destination: localStorage.getItem('booking_destination') || '',
      startDate: new Date(localStorage.getItem('booking_startDate') || Date.now()),
      endDate: new Date(localStorage.getItem('booking_endDate') || Date.now() + 86400000),
      vehicleType: localStorage.getItem('booking_vehicleType') || ''
    }
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

    setLoading(true)
    try {
      const fare = calculateFare(data.vehicleType, data.startDate, data.endDate)
      const booking = await createBooking({
        ...data,
        userId: user.id,
        fare
      })
      persistFormData(data)
      dispatch({ 
        type: 'SET_BOOKING', 
        payload: {
          ...booking,
          fare: booking.fare || 0
        }
      })
      setStep(2)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
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
            />

            <LocationSearch 
              name="destination"
              control={control}
              label="Destination"
              placeholder="Enter destination"
              error={errors.destination}
              disabled={loading}
            />

            <DateRangePicker 
              control={control}
              startName="startDate"
              endName="endDate"
              errors={errors}
              disabled={loading}
            />

            <VehicleTypeSelector 
              name="vehicleType"
              control={control}
              error={errors.vehicleType}
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
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
          booking={watch()} 
          onBack={() => setStep(1)} 
        />
      )}
    </div>
  )
}