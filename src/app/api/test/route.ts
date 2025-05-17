import { NextResponse } from 'next/server'
import { createBooking } from '../../../services/booking/api'

export async function GET() {
  try {
    const testData = {
      pickupLocation: 'Test Location',
      dropLocation: 'Test Destination',
      pickupDate: new Date().toISOString(),
      returnDate: new Date(Date.now() + 86400000).toISOString(),
      vehicleType: 'sedan',
      fare: 100,
      customerId: 'test-user',
      status: 'pending' as const
    }

    const booking = await createBooking(testData)
    
    return NextResponse.json({
      success: true,
      booking,
      message: 'Booking API test successful'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Booking API test failed'
    }, { status: 500 })
  }
}