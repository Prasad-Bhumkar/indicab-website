'use client'
import { useEffect, useState } from 'react'
import { createBooking } from '../services/booking/api'

export default function TestBookingAPI() {
  const [result, setResult] = useState<string>('Testing...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testBooking = async () => {
      try {
        const testData = {
          pickup: 'Test Location',
          destination: 'Test Destination',
          startDate: new Date(),
          endDate: new Date(Date.now() + 86400000),
          vehicleType: 'sedan',
          fare: 100,
          customerId: 'test-user',
          status: 'pending' as const
        }

        const booking = await createBooking(testData)
        setResult(`✅ Success! Booking ID: ${booking.id}`)
      } catch (err) {
        setError(`❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    }

    testBooking()
  }, [])

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h2 className="text-lg font-bold mb-2">Booking API Test</h2>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <p className="text-green-600">{result}</p>
      )}
    </div>
  )
}