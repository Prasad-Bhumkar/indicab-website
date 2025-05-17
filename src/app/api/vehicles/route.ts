import { connectDB } from '../../../lib/db';
import Vehicle from '../../../models/Vehicle';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();
        const _vehicles = await Vehicle.find({});
        return NextResponse.json(_vehicles);
    } catch (_error) {
        return NextResponse.json(
            { error: 'Failed to fetch vehicles' },
            { status: 500 }
        );
    }
}

export async function POST(_request: Request) {
    try {
        await connectDB();
        const _body = await _request.json();
        const vehicle = new Vehicle(_body);
        await vehicle.save();
        return NextResponse.json(vehicle, { status: 201 });
    } catch (_error) {
        return NextResponse.json(
            { error: 'Failed to create vehicle' },
            { status: 400 }
        );
    }
}
