import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { connectDB } from '@/lib/db';
import Booking from '@/models/Booking';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16'
});

/**
 * @openapi
 * /api/payment:
 *   post:
 *     summary: Process payment for a booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentRequest'
 *     responses:
 *       200:
 *         description: Payment processed
 *       400:
 *         description: Bad request
 *       404:
 *         description: Booking not found
 *       409:
 *         description: Payment conflict
 *       500:
 *         description: Internal server error
 */
export async function POST(request: Request) {
    try {
        const { bookingId, paymentMethodId } = await request.json();

        await connectDB();
        const booking = await Booking.findById(bookingId);
        
        if (!booking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(booking.totalAmount * 100), // Convert to cents
            currency: 'inr',
            payment_method: paymentMethodId,
            confirm: true,
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/bookings/${bookingId}/confirmation`
        });

        // Update booking with payment information
        booking.paymentStatus = 'completed';
        booking.paymentIntentId = paymentIntent.id;
        await booking.save();

        return NextResponse.json({
            success: true,
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Payment processing error:', error);
        return NextResponse.json(
            { error: 'Payment processing failed' },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const paymentIntentId = searchParams.get('payment_intent');

        if (!paymentIntentId) {
            return NextResponse.json(
                { error: 'Payment intent ID is required' },
                { status: 400 }
            );
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        return NextResponse.json({
            status: paymentIntent.status,
            amount: paymentIntent.amount / 100, // Convert from cents
            currency: paymentIntent.currency
        });
    } catch (error) {
        console.error('Payment status check error:', error);
        return NextResponse.json(
            { error: 'Failed to check payment status' },
            { status: 500 }
        );
    }
}
