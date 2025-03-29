const { createBooking } = require('../src/services/booking/api.cjs');

async function testBookingAPI() {
  console.log('Testing Booking API...');
  
  const testBooking = {
    pickup: 'Test Location',
    destination: 'Test Destination', 
    startDate: new Date(),
    endDate: new Date(Date.now() + 86400000),
    vehicleType: 'sedan',
    fare: 100,
    customerId: 'test-user',
    status: 'pending'
  };

  try {
    console.log('\n1. Testing successful booking creation...');
    const booking = await createBooking(testBooking);
    console.log('✅ Success! Created booking:', booking);
    
    if (!booking.id) {
      throw new Error('Booking ID was not generated');
    }
    
    console.log('\nAll tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testBookingAPI();