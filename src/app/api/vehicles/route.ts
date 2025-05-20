import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Vehicle from '../../../models/Vehicle';

/**
 * @openapi
 * /api/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     responses:
 *       200:
 *         description: List of vehicles
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new vehicle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleRequest'
 *     responses:
 *       201:
 *         description: Vehicle created
 *       400:
 *         description: Bad request
 *       409:
 *         description: Duplicate vehicle
 *       500:
 *         description: Internal server error
 */

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
