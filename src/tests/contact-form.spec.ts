import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
    test('should display validation errors for empty required fields', async ({ page }) => {
        // Go to the contact page
        await page.goto('/contact');

        // Submit the form without filling in required fields
        await page.getByRole('button', { name: /send message/i }).click();

        // Check for validation error message
        await expect(page.getByText(/please fill in all required fields/i)).toBeVisible();
    });

    test('should submit the form with valid data', async ({ page }) => {
        // Go to the contact page
        await page.goto('/contact');

        // Fill in the form
        await page.getByLabel(/name/i).fill('John Doe');
        await page.getByLabel(/email/i).fill('john@example.com');
        await page.getByLabel(/phone/i).fill('9876543210');

        // Select a subject from dropdown
        await page.getByLabel(/subject/i).selectOption('Booking Inquiry');

        // Fill in message
        await page.getByLabel(/message/i).fill('This is a test message from automated testing.');

        // Submit the form
        await page.getByRole('button', { name: /send message/i }).click();

        // Check for success message after submission
        await expect(page.getByText(/thank you.*message has been sent/i)).toBeVisible({ timeout: 5000 });
    });

    test('shows loading state during form submission', async ({ page }) => {
        // Go to the contact page
        await page.goto('/contact');

        // Fill in all required fields
        await page.getByLabel(/name/i).fill('Jane Smith');
        await page.getByLabel(/email/i).fill('jane@example.com');
        await page.getByLabel(/message/i).fill('Another test message');

        // Click submit button and check for loading state
        await page.getByRole('button', { name: /send message/i }).click();

        // Check if button text changes to indicate loading
        await expect(page.getByRole('button', { name: /sending/i })).toBeVisible();

        // Wait for success message
        await expect(page.getByText(/thank you.*message has been sent/i)).toBeVisible({ timeout: 5000 });
    });
});
