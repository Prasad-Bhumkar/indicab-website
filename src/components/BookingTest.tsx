import { useBookingContext } from '../context/BookingContext'
import BookingForm from './BookingForm'

export default function BookingTest() {
  const { state } = useBookingContext()
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Booking Test</h2>
      <div className="mb-4 p-4 bg-gray-50 rounded">
        <h3 className="font-medium mb-2">Current Booking State:</h3>
        <pre className="text-sm">{JSON.stringify(state, null, 2)}</pre>
      </div>
      <BookingForm />
    </div>
  )
}