'use client'
import { useState } from 'react'
import { PaymentForm } from './PaymentForm.new'
import { useRouter } from 'next/navigation'

export default function BookingForm({ 
  vehicleId,
  dailyRate
}: {
  vehicleId: string
  dailyRate: number
}) {
  const router = useRouter()
  const [dates, setDates] = useState({
    startDate: '',
    endDate: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
          endDate: dates.endDate
        })
      })

      if (!res.ok) {
        throw new Error(await res.text())
      }

      const booking = await res.json()
      router.push(`/bookings/${booking._id}`)
    } catch (err: any) {
      setError(err?.message || 'Failed to create booking')
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

        <div className="mb-4">
          <p className="text-lg font-semibold">
            Total: ${dailyRate} <span className="text-sm font-normal">per day</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}

      <div className="mt-6">
        <PaymentForm 
          amount={calculateTotal(dates.startDate, dates.endDate, dailyRate)} 
          bookingId={booking._id}
        />
      </div>
      </form>
    </div>
  )
}