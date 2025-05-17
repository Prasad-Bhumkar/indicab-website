'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

interface Booking {
    _id: string
    startDate: string
    endDate: string
    totalAmount: number
    status: string
    vehicle: {
        make: string
        model: string
    }
}

export default function BookingConfirmationPage({ params }: { params: { id: string } }): JSX.Element {
    const [booking, setBooking] = useState<Booking | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchBooking() {
            try {
                const _res = await fetch(`/api/bookings/${params.id}`)
                const _data = await _res.json()
                setBooking(_data)
            } catch (error) {
                console.error('Error fetching booking:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchBooking()
    }, [params.id])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!booking) {
        return <div className="text-center py-8">Booking not found</div>
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
                <h1 className="text-3xl font-bold mt-4">Booking Confirmed!</h1>
                <p className="text-gray-600 mt-2">Reference: {booking._id}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-500">Vehicle</p>
                        <p>{booking.vehicle.make} {booking.vehicle.model}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Dates</p>
                        <p>
                            {new Date(booking.startDate).toLocaleDateString()} - {' '}
                            {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500">Total</p>
                        <p>${booking.totalAmount}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Status</p>
                        <p className="capitalize">{booking.status}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                    href="/vehicles"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                >
                    Book Another Vehicle
                </Link>
                <Link
                    href="/dashboard"
                    className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-center"
                >
                    View My Bookings
                </Link>
            </div>
        </div>
    )
}
