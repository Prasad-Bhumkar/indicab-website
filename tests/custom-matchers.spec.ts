import { test, expect } from '@playwright/test';
import { registerCustomMatchers } from './helpers/custom-matchers';

// Register custom matchers before tests
registerCustomMatchers();

test.describe('Custom Matchers Tests', () => {
  test('validates route formats correctly', async ({ page }) => {
    await page.goto('/routes');

    // Get route text from the page
    const routeElement = page.getByText(/Delhi to Agra|Mumbai to Pune/i).first();
    const routeText = await routeElement.textContent() as string;

    // Use our custom matcher
    expect(routeText).toBeValidRouteFormat();

    // Negative test
    expect('Delhi-Agra').not.toBeValidRouteFormat();
  });

  test('validates fare formats correctly', async ({ page }) => {
    await page.goto('/routes');

    // Find a price element on the page
    const priceElement = page.locator('text=/₹[0-9,]+/').first();
    const priceText = await priceElement.textContent() as string;

    // Use our custom matcher
    expect(priceText).toBeValidFareFormat();

    // Negative test
    expect('Rs.1499').not.toBeValidFareFormat();
  });

  test('checks for accessibility attributes', async ({ page }) => {
    await page.goto('/');

    // Test accessibility attributes on search button
    const searchButtonHTML = await page.locator('button[type="submit"]').first().evaluate(
      (element) => element.outerHTML
    );

    // Use our custom matcher to check for required accessibility attributes
    expect(searchButtonHTML).toHaveA11yAttributes(['aria-label', 'type']);
  });

  test('checks for IndiCab-specific styles', async ({ page }) => {
    await page.goto('/');

    // Find an element with primary button styling
    const primaryButtonHTML = await page.locator('button').first().evaluate(
      (element) => element.outerHTML
    );

    // Use our custom matcher to check for IndiCab-specific styling
    expect(primaryButtonHTML).toHaveIndicabStyle('bg-primary');
  });
});
