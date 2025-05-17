import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
    test('should navigate to main pages', async ({ page }) => {
        // Start from the homepage
        await page.goto('/');

        // Check that we're on the homepage
        await expect(page).toHaveTitle(/IndiCab/);

        // Navigate to Routes page
        await page.getByRole('link', { name: 'Routes' }).click();
        await expect(page).toHaveURL(/.*routes/);
        await expect(page.getByRole('heading', { name: 'All Routes' })).toBeVisible();

        // Navigate to Services page
        await page.getByRole('link', { name: 'Services' }).click();
        await expect(page).toHaveURL(/.*services/);
        await expect(page.getByRole('heading', { name: /services/i })).toBeVisible();

        // Navigate to About page
        await page.getByRole('link', { name: 'About' }).click();
        await expect(page).toHaveURL(/.*about/);
        await expect(page.getByRole('heading', { name: /about/i })).toBeVisible();

        // Navigate to Contact page
        await page.getByRole('link', { name: 'Contact' }).click();
        await expect(page).toHaveURL(/.*contact/);
        await expect(page.getByRole('heading', { name: /contact/i })).toBeVisible();
    });

    test('mobile menu works correctly', async ({ page }) => {
        // Use a mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        // Go to the homepage
        await page.goto('/');

        // Open the mobile menu
        await page.getByRole('button', { name: /menu/i }).click();

        // Check that mobile menu is visible
        await expect(page.getByRole('navigation')).toBeVisible();

        // Click on a link in the mobile menu
        await page.getByRole('link', { name: 'Contact' }).click();

        // Check that we navigated to the Contact page
        await expect(page).toHaveURL(/.*contact/);
    });
});
