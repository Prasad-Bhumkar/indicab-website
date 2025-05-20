import { type NextRequest, NextResponse } from "next/server";

import { validateBookingData } from '@/lib/api/validators/booking';
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

/**
 * @openapi
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingRequest'
 *     responses:
 *       201:
 *         description: Booking created
 *       400:
 *         description: Bad request
 *       409:
 *         description: Booking conflict
 *       500:
 *         description: Internal server error
 */
export async function POST(_request: NextRequest) {
	try {
		const body = await _request.json();

		// Validate input using shared validator
		try {
			await validateBookingData(body);
		} catch (validationError) {
			console.warn('Booking validation failed:', validationError);
			return NextResponse.json(
				{ message: 'Validation failed', details: validationError?.details || validationError?.message },
				{ status: 400 },
			);
		}

		await connectDB();

		// Check for overlapping bookings for the same vehicle
		const overlap = await Booking.findOne({
			vehicle: body.vehicle,
			$or: [
				{ startDate: { $lt: new Date(body.endDate) }, endDate: { $gt: new Date(body.startDate) } },
			],
		});
		if (overlap) {
			return NextResponse.json(
				{ message: 'Vehicle is already booked for the selected dates' },
				{ status: 409 },
			);
		}

		// Check vehicle availability
		const vehicle = await Booking.db.model('Vehicle').findById(body.vehicle);
		if (!vehicle || vehicle.available === false) {
			return NextResponse.json(
				{ message: 'Vehicle is unavailable' },
				{ status: 409 },
			);
		}

		const _booking = new Booking({
			user: body.user,
			vehicle: body.vehicle,
			startDate: new Date(body.startDate),
			endDate: new Date(body.endDate),
			totalAmount: body.totalAmount,
			status: body.status || 'pending',
			paymentStatus: body.paymentStatus || 'pending',
			paymentMethod: body.paymentMethod,
		});

		const savedBooking = await _booking.save();

		return NextResponse.json(
			{
				id: savedBooking._id,
				status: savedBooking.status,
				paymentStatus: savedBooking.paymentStatus,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error('Booking API error:', error);
		return NextResponse.json(
			{ message: 'Internal Server Error', details: error instanceof Error ? error.message : error },
			{ status: 500 },
		);
	}
}
