import { connectDB } from '../src/lib/db';
import User from '../src/models/User';
import Vehicle from '../src/models/Vehicle';
import Booking from '../src/models/Booking';
import bcrypt from 'bcryptjs';

async function testAPI() {
    try {
        // Connect to database
        await connectDB();
        console.log('Database connected');

        // Test User API
        const _testUser = {
            name: 'Test User',
            email: 'test@example.com',
            passwordHash: await bcrypt.hash('test123', 10),
            phone: '1234567890'
        };
        const savedUser = await User.create(_testUser);
        console.log('✅ User created:', savedUser.email);

        // Test Vehicle API
        const _testVehicle = {
            make: 'Toyota',
            model: 'Corolla',
            year: 2022,
            type: 'sedan',
            seatingCapacity: 5,
            fuelType: 'petrol',
            transmission: 'automatic',
            dailyRate: 50,
            imageUrl: 'https://example.com/corolla.jpg'
        };
        const savedVehicle = await Vehicle.create(_testVehicle);
        console.log('✅ Vehicle created:', savedVehicle.make, savedVehicle.model);

        // Test Booking API
        const _testBooking = {
            user: savedUser._id,
            vehicle: savedVehicle._id,
            startDate: new Date(),
            endDate: new Date(Date.now() + 86400000), // 1 day later
            totalAmount: 100
        };
        const _savedBooking = await Booking.create(_testBooking);
        console.log('✅ Booking created for:', savedUser.email);

        // Verify populated booking
        const verifiedBooking = await Booking.findById(_savedBooking._id)
            .populate('user', '-passwordHash')
            .populate('vehicle');
        console.log('✅ Booking verified:', {
            user: verifiedBooking.user.email,
            vehicle: verifiedBooking.vehicle.make,
            total: verifiedBooking.totalAmount
        });

        console.log('🎉 All tests completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
}

testAPI();
