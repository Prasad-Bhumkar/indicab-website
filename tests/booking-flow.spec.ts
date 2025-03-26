import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test('complete booking process from homepage', async ({ page }) => {
    // Start from the homepage
    await page.goto('/');

    // Fill in the booking form on the homepage
    await page.getByLabel(/from/i).selectOption('Delhi');
    await page.getByLabel(/to/i).selectOption('Agra');

    // Click on search/book button
    await page.getByRole('button', { name: /search|book|find/i }).click();

    // Should be redirected to the booking page with pre-filled values
    await expect(page).toHaveURL(/.*booking/);

    // Verify that from and to values are preserved
    const fromField = page.getByLabel(/from/i);
    await expect(fromField).toHaveValue('Delhi');

    const toField = page.getByLabel(/to/i);
    await expect(toField).toHaveValue('Agra');

    // Select a vehicle type
    await page.getByLabel(/vehicle type|car type/i).selectOption({ label: /sedan|suv/i });

    // Select a date (assuming there's a date picker)
    const dateInput = page.getByLabel(/date/i);
    if (await dateInput.isVisible()) {
      // Get tomorrow's date in the format needed
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD
      await dateInput.fill(formattedDate);
    }

    // Fill passenger details
    await page.getByLabel(/passenger name/i).fill('Test User');
    await page.getByLabel(/passenger phone|contact/i).fill('9876543210');
    await page.getByLabel(/passenger email/i).fill('test@example.com');

    // Proceed to booking confirmation
    await page.getByRole('button', { name: /proceed|continue|book now/i }).click();

    // Verify booking confirmation page
    await expect(page.getByText(/booking confirmed|reservation confirmed/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/delhi.*agra/i)).toBeVisible();
  });

  test('view and filter routes on routes page', async ({ page }) => {
    // Go to the routes page
    await page.goto('/routes');

    // Check that routes are displayed
    await expect(page.getByRole('heading', { name: 'All Routes' })).toBeVisible();

    // Use filter to show specific routes
    await page.getByRole('button', { name: /filter|show filter/i }).click();

    // Select origin city
    await page.getByLabel(/from city/i).selectOption('Mumbai');

    // Select destination city
    await page.getByLabel(/to city/i).selectOption('Pune');

    // Apply filters
    await page.getByRole('button', { name: /search|apply|filter/i }).click();

    // Verify filtered results
    await expect(page.getByText(/mumbai.*pune/i)).toBeVisible();

    // Click "Book" on one of the routes
    await page.getByRole('link', { name: /book/i }).first().click();

    // Should be redirected to booking page with pre-filled values
    await expect(page).toHaveURL(/.*booking/);

    const fromField = page.getByLabel(/from/i);
    await expect(fromField).toHaveValue('Mumbai');

    const toField = page.getByLabel(/to/i);
    await expect(toField).toHaveValue('Pune');
  });
});
