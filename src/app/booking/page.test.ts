import fs from 'fs';
import path from 'path';
import { describe, expect } from 'vitest';

describe('Booking Page', () => {
    test('booking page component exists', () => {
        const _pagePath = path.join(process.cwd(), 'src/app/booking/page.tsx');
        const _exists = fs.existsSync(_pagePath);
        expect(_exists).toBe(true);
    });

    test('booking page has form elements', () => {
        const _pagePath = path.join(process.cwd(), 'src/app/booking/page.tsx');
        const content = fs.readFileSync(_pagePath, 'utf8');

        // Check for booking form elements
        expect(content).toMatch(/form|input|select|button/i);
        expect(content).toMatch(/from|to|date|time/i);
    });

    test('booking page has vehicle selection', () => {
        const _pagePath = path.join(process.cwd(), 'src/app/booking/page.tsx');
        const content = fs.readFileSync(_pagePath, 'utf8');

        // Check for vehicle selection
        expect(content).toMatch(/vehicle|car|cab|type/i);
        expect(content).toMatch(/select|choose/i);
    });

    test('booking page has pricing information', () => {
        const _pagePath = path.join(process.cwd(), 'src/app/booking/page.tsx');
        const content = fs.readFileSync(_pagePath, 'utf8');

        // Check for pricing display
        expect(content).toMatch(/price|fare|cost|total/i);
        expect(content).toMatch(/₹|Rs|INR/i);
    });

    test('booking page has submit/proceed button', () => {
        const _pagePath = path.join(process.cwd(), 'src/app/booking/page.tsx');
        const content = fs.readFileSync(_pagePath, 'utf8');

        // Check for booking action
        expect(content).toMatch(/submit|proceed|book|confirm/i);
        expect(content).toContain('Button');
    });
});
