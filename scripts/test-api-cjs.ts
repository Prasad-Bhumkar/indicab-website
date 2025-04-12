import { connectDB } from '../src/lib/db';
import User from '../src/models/User';
import Vehicle from '../src/models/Vehicle';
import Booking from '../src/models/Booking';

async function testBookingFlow() {
  try {
    await connectDB();
    console.log('✅ Connected to database');

    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123'
    });
    await user.save();
    console.log('✅ Created test user:', user.email);

    const vehicle = new Vehicle({
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      type: 'Sedan',
      dailyRate: 50,
      imageUrl: '/assets/cars/camry.jpg'
    });
    await vehicle.save();
    console.log('✅ Created test vehicle:', `${vehicle.year} ${vehicle.make} ${vehicle.model}`);

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 3);

    const booking = new Booking({
      user: user._id,
      vehicle: vehicle._id,
      startDate,
      endDate,
      totalAmount: 150,
      status: 'confirmed'
    });
    await booking.save();
    console.log('✅ Created booking:', booking._id);

    const foundBooking = await Booking.findById(booking._id)
      .populate('user')
      .populate('vehicle');

    console.log('✅ Booking verification:');
    console.log('  User:', foundBooking?.user.email);
    console.log('  Vehicle:', `${foundBooking?.vehicle.year} ${foundBooking?.vehicle.make} ${foundBooking?.vehicle.model}`);
    console.log('  Total:', foundBooking?.totalAmount);

    console.log('✅ All tests passed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    process.exit(0);
  }
}

testBookingFlow();