'use client'
import { BookingProvider } from '../../context/BookingContext'
import BookingTest from '../../components/BookingTest'

export default function BookingTestPage() {
  return (
    <BookingProvider>
      <BookingTest />
    </BookingProvider>
  )
}