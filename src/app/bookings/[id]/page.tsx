'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function BookingConfirmation({ params }: { params: { id: string } }) {
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await fetch(`/api/bookings/${params.id}`)
        const data = await res.json()
        setBooking(data)
      } catch (error) {
        console.error('Error fetching booking:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBooking()
  }, [params.id])

  if (loading) {
    return <div className="text-center py-8">Loading booking details...</div>
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
        <h1 className="text-3xl font-bold mt-4">Booking Confirmed!</h1>
        <p className="text-gray-600 mt-2">
          Your booking reference: {booking?._id}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Vehicle</p>
            <p>{booking?.vehicle?.make} {booking?.vehicle?.model}</p>
          </div>
          <div>
            <p className="text-gray-500">Dates</p>
            <p>
              {new Date(booking?.startDate).toLocaleDateString()} - {' '}
              {new Date(booking?.endDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total Amount</p>
            <p>${booking?.totalAmount}</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <p className="capitalize">{booking?.status}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Link
          href="/vehicles"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Book Another Vehicle
        </Link>
        <Link
          href="/dashboard"
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
        >
          View My Bookings
        </Link>
      </div>
    </div>
  )
}