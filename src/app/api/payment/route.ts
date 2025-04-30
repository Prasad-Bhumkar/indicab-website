import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import logger from '../../../lib/logger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, bookingId } = await request.json();

    if (!amount || !bookingId) {
      return NextResponse.json({ error: 'Missing amount or bookingId' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // amount in cents
      currency: 'usd',
      metadata: { bookingId },
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    logger.error('Stripe payment error:', error);
    return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 });
  }
}
