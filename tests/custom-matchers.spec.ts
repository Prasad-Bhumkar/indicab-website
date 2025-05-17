import { test, expect } from '@playwright/test';
import { registerCustomMatchers } from './helpers/custom-matchers';

// Register custom matchers before tests
registerCustomMatchers();

test.describe('Custom Matchers Tests', () => {
    test('validates route formats correctly', async ({ page }) => {
        await page.goto('/routes');

        // Get route text from the page
        const _routeElement = page.getByText(/Delhi to Agra|Mumbai to Pune/i).first();
        const _routeText = await _routeElement.textContent() as string;

        // Use our custom matcher
        expect(_routeText).toBeValidRouteFormat();

        // Negative test
        expect('Delhi-Agra').not.toBeValidRouteFormat();
    });

    test('validates fare formats correctly', async ({ page }) => {
        await page.goto('/routes');

        // Find a price element on the page
        const _priceElement = page.locator('text=/₹[0-9,]+/').first();
        const _priceText = await _priceElement.textContent() as string;

        // Use our custom matcher
        expect(_priceText).toBeValidFareFormat();

        // Negative test
        expect('Rs.1499').not.toBeValidFareFormat();
    });

    test('checks for accessibility attributes', async ({ page }) => {
        await page.goto('/');

        // Test accessibility attributes on search button
        const _searchButtonHTML = await page.locator('button[type="submit"]').first().evaluate(
            (_element) => _element.outerHTML
        );

        // Use our custom matcher to check for required accessibility attributes
        expect(_searchButtonHTML).toHaveA11yAttributes(['aria-label', 'type']);
    });

    test('checks for IndiCab-specific styles', async ({ page }) => {
        await page.goto('/');

        // Find an element with primary button styling
        const _primaryButtonHTML = await page.locator('button').first().evaluate(
            (_element) => _element.outerHTML
        );

        // Use our custom matcher to check for IndiCab-specific styling
        expect(_primaryButtonHTML).toHaveIndicabStyle('bg-primary');
    });
});
