import { connectDB } from '../../../lib/db';
import Vehicle from '../../../models/Vehicle';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const vehicles = await Vehicle.find({});
    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const vehicle = new Vehicle(body);
    await vehicle.save();
    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 400 }
    );
  }
}