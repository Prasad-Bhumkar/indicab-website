import { test, expect } from '@playwright/test';

test.describe('Payment Flow', () => {
    test('create payment intent and complete payment', async ({ page }) => {
        // Navigate to booking page (assuming booking is prerequisite)
        await page.goto('/booking');

        // Fill in necessary booking details (simplified)
        await page.getByLabel(/from/i).selectOption('Delhi');
        await page.getByLabel(/to/i).selectOption('Agra');
        await page.getByLabel(/vehicle type/i).selectOption('sedan');
        const dateInput = page.getByLabel(/date/i);
        if (await dateInput.isVisible()) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const _formattedDate = tomorrow.toISOString().split('T')[0];
            await dateInput.fill(_formattedDate);
        }
        await page.getByLabel(/passenger name/i).fill('Test User');
        await page.getByLabel(/passenger phone/i).fill('9876543210');
        await page.getByLabel(/passenger email/i).fill('test@example.com');

        // Proceed to payment step
        await page.getByRole('button', { name: /proceed|continue|book now/i }).click();

        // Wait for payment form to appear
        await expect(page.getByText(/payment/i)).toBeVisible();

        // Simulate payment input (Stripe test card)
        await page.frameLocator('iframe[name^="__privateStripeFrame"]').getByPlaceholder('Card number').fill('4242 4242 4242 4242');
        await page.frameLocator('iframe[name^="__privateStripeFrame"]').getByPlaceholder('MM / YY').fill('12/34');
        await page.frameLocator('iframe[name^="__privateStripeFrame"]').getByPlaceholder('CVC').fill('123');
        await page.frameLocator('iframe[name^="__privateStripeFrame"]').getByPlaceholder('ZIP Code').fill('12345');

        // Submit payment
        await page.getByRole('button', { name: /pay/i }).click();

        // Verify payment success message
        await expect(page.getByText(/payment successful|thank you/i)).toBeVisible({ timeout: 15000 });
    });
});
