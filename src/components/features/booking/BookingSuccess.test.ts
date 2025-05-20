import fs from 'fs';
import path from 'path';

import { describe, expect } from 'vitest';

describe('BookingSuccess Component', () => {
    test('BookingSuccess component exists', () => {
        const _componentPath = path.join(process.cwd(), 'src/components/BookingSuccess.tsx');
        const _exists = fs.existsSync(_componentPath);
        expect(_exists).toBe(true);
    });

    test('BookingSuccess contains confirmation message and animations', () => {
        const _componentPath = path.join(process.cwd(), 'src/components/BookingSuccess.tsx');
        const content = fs.readFileSync(_componentPath, 'utf8');

        // Check for success elements
        expect(content).toContain('Booking Confirmed');
        expect(content).toContain('Your ride is booked');

        // Check for animations or confetti
        expect(content).toContain('ReactConfetti');
        expect(content).toContain('motion');
        expect(content).toContain('framer-motion');
    });

    test('BookingSuccess shows booking details', () => {
        const _componentPath = path.join(process.cwd(), 'src/components/BookingSuccess.tsx');
        const content = fs.readFileSync(_componentPath, 'utf8');

        // Check for booking details display
        expect(content).toContain('Trip Details');
        expect(content).toContain('origin');
        expect(content).toContain('destination');
        expect(content).toContain('date');
    });

    test('BookingSuccess has call-to-action buttons', () => {
        const _componentPath = path.join(process.cwd(), 'src/components/BookingSuccess.tsx');
        const content = fs.readFileSync(_componentPath, 'utf8');

        // Check for CTA buttons
        expect(content).toContain('onTrackRide');
        expect(content).toContain('Track Ride');
        expect(content).toContain('Close');
    });
});
