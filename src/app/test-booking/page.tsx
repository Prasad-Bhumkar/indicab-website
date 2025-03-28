'use client'
import { BookingProvider } from '@context/BookingContext'
import BookingForm from '@components/BookingForm'

export default function TestBookingPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Booking Flow Test</h1>
      <BookingProvider>
        <BookingForm />
      </BookingProvider>
    </div>
  )
}