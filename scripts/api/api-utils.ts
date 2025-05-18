import { connectDB } from '../../src/lib/db';
import User from '../../src/models/User';
import Vehicle from '../../src/models/Vehicle';
import Booking from '../../src/models/Booking';
import { createBooking } from '../../src/services/booking/api';
import bcrypt from 'bcryptjs';

/**
 * Types for test data
 */
interface TestUser {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface TestVehicle {
  make: string;
  model: string;
  year: number;
  type: string;
  seatingCapacity: number;
  fuelType: string;
  transmission: string;
  dailyRate: number;
  imageUrl: string;
}

interface TestBooking {
  pickup: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  vehicleType: string;
  fare: number;
  customerId: string;
  status: string;
}

/**
 * Default test data
 */
const defaultTestUser: TestUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'test123',
  phone: '1234567890'
};

const defaultTestVehicle: TestVehicle = {
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

const defaultTestBooking: TestBooking = {
  pickup: 'Test Location',
  destination: 'Test Destination',
  startDate: new Date(),
  endDate: new Date(Date.now() + 86400000), // 1 day later
  vehicleType: 'sedan',
  fare: 100,
  customerId: 'test-user',
  status: 'pending'
};

/**
 * User API Tests
 */
export async function testUserAPI(testData: Partial<TestUser> = {}): Promise<any> {
  const userData = { ...defaultTestUser, ...testData };
  
  try {
    const user = await User.create({
      ...userData,
      passwordHash: await bcrypt.hash(userData.password, 10)
    });
    console.log('✅ User created:', user.email);
    return user;
  } catch (error) {
    console.error('❌ User creation failed:', error instanceof Error ? error.message : error);
    throw error;
  }
}

/**
 * Vehicle API Tests
 */
export async function testVehicleAPI(testData: Partial<TestVehicle> = {}): Promise<any> {
  const vehicleData = { ...defaultTestVehicle, ...testData };
  
  try {
    const vehicle = await Vehicle.create(vehicleData);
    console.log('✅ Vehicle created:', vehicle.make, vehicle.model);
    return vehicle;
  } catch (error) {
    console.error('❌ Vehicle creation failed:', error instanceof Error ? error.message : error);
    throw error;
  }
}

/**
 * Booking API Tests
 */
export async function testBookingAPI(testData: Partial<TestBooking> = {}): Promise<any> {
  const bookingData = { ...defaultTestBooking, ...testData };
  
  try {
    const booking = await createBooking(bookingData);
    console.log('✅ Booking created:', booking);
    
    if (!booking.id) {
      throw new Error('Booking ID was not generated');
    }
    
    return booking;
  } catch (error) {
    console.error('❌ Booking creation failed:', error instanceof Error ? error.message : error);
    throw error;
  }
}

/**
 * Full API Integration Test
 */
export async function testFullAPIFlow(): Promise<void> {
  try {
    // Connect to database
    await connectDB();
    console.log('Database connected');

    // Create test user
    const user = await testUserAPI();

    // Create test vehicle
    const vehicle = await testVehicleAPI();

    // Create test booking
    const booking = await testBookingAPI({
      customerId: user._id
    });

    // Verify booking with populated data
    const verifiedBooking = await Booking.findById(booking.id)
      .populate('user', '-passwordHash')
      .populate('vehicle');

    console.log('✅ Full API flow verified:', {
      user: verifiedBooking.user.email,
      vehicle: verifiedBooking.vehicle.make,
      total: verifiedBooking.totalAmount
    });

    console.log('🎉 All API tests completed successfully!');
  } catch (error) {
    console.error('❌ API test failed:', error instanceof Error ? error.message : error);
    throw error;
  }
}

/**
 * Command-line interface
 */
if (require.main === module) {
  const testType = process.argv[2];
  
  switch (testType) {
    case 'user':
      testUserAPI().catch(() => process.exit(1));
      break;
    case 'vehicle':
      testVehicleAPI().catch(() => process.exit(1));
      break;
    case 'booking':
      testBookingAPI().catch(() => process.exit(1));
      break;
    case 'full':
      testFullAPIFlow().catch(() => process.exit(1));
      break;
    default:
      console.log('Usage: ts-node api-utils.ts [user|vehicle|booking|full]');
      process.exit(1);
  }
} 