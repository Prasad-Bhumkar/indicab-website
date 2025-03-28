'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PaymentForm } from './PaymentForm.new'

interface BookingFormProps {
  vehicleId: string
  dailyRate: number
}

export default function BookingForm({ vehicleId, dailyRate }: BookingFormProps) {
  const [dates, setDates] = useState({
    startDate: '',
    endDate: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [booking, setBooking] = useState<any>(null)
  const router = useRouter()

  const calculateTotal = (startDate: string, endDate: string, rate: number): number => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return days * rate
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vehicleId,
          startDate: dates.startDate,
          endDate: dates.endDate,
          totalAmount: calculateTotal(dates.startDate, dates.endDate, dailyRate)
        })
      })

      if (!res.ok) {
        throw new Error(await res.text())
      }

      const bookingData = await res.json()
      setBooking(bookingData)
    } catch (err: any) {
      setError(err.message || 'Failed to create booking')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Book This Vehicle</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 border rounded-md"
              value={dates.startDate}
              onChange={(e) => setDates({...dates, startDate: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 border rounded-md"
              value={dates.endDate}
              onChange={(e) => setDates({...dates, endDate: e.target.value})}
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}

        {booking ? (
          <div className="mt-6">
            <PaymentForm 
              amount={calculateTotal(dates.startDate, dates.endDate, dailyRate)} 
              bookingId={booking._id}
            />
          </div>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        )}
      </form>
    </div>
  )
}