import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
    test('user login process', async ({ page }) => {
        // Go to the auth page
        await page.goto('/auth');

        // Ensure we're on the auth page and the login form is showing
        await expect(page.getByRole('heading', { name: /login|sign in/i })).toBeVisible();

        // Fill in login credentials
        await page.getByLabel(/email/i).fill('test@example.com');
        await page.getByLabel(/password/i).fill('Password123!');

        // Click login button
        await page.getByRole('button', { name: /login|sign in/i }).click();

        // Verify successful login (might redirect to profile or show success message)
        try {
            // Check if we're redirected to profile/dashboard
            await expect(page).toHaveURL(/.*profile|.*dashboard/);
        } catch {
            // Or check for success message if not redirected
            await expect(page.getByText(/login successful|welcome back/i)).toBeVisible();
        }
    });

    test('user registration process', async ({ page }) => {
        // Go to the auth page
        await page.goto('/auth');

        // Switch to signup tab/form if needed
        const signupTab = page.getByRole('tab', { name: /sign up|register/i });
        if (await signupTab.isVisible()) {
            await signupTab.click();
        }

        // Wait for signup form to be visible
        await expect(page.getByRole('heading', { name: /sign up|register|create account/i })).toBeVisible();

        // Generate a unique email
        const _uniqueEmail = `test${Date.now()}@example.com`;

        // Fill in registration details
        await page.getByLabel(/name/i).fill('Test User');
        await page.getByLabel(/email/i).fill(_uniqueEmail);
        await page.getByLabel(/password/i).fill('Password123!');

        if (await page.getByLabel(/confirm password/i).isVisible()) {
            await page.getByLabel(/confirm password/i).fill('Password123!');
        }

        // Accept terms if present
        const termsCheckbox = page.getByLabel(/terms|agree/i);
        if (await termsCheckbox.isVisible()) {
            await termsCheckbox.check();
        }

        // Submit registration form
        await page.getByRole('button', { name: /sign up|register|create account/i }).click();

        // Verify successful registration (either redirect or success message)
        try {
            // Check if we're redirected to profile/dashboard
            await expect(page).toHaveURL(/.*profile|.*dashboard/, { timeout: 10000 });
        } catch {
            // Or check for success message if not redirected
            await expect(page.getByText(/registration successful|account created|verification/i)).toBeVisible();
        }
    });

    test('password reset flow', async ({ page }) => {
        // Go to the auth page
        await page.goto('/auth');

        // Click on forgot password link
        await page.getByText(/forgot password/i).click();

        // Check that we're on the password reset page
        await expect(page.getByRole('heading', { name: /reset password|forgot password/i })).toBeVisible();

        // Fill in email for password reset
        await page.getByLabel(/email/i).fill('test@example.com');

        // Submit reset request
        await page.getByRole('button', { name: /reset|send|submit/i }).click();

        // Verify success message
        await expect(page.getByText(/email sent|check your email|instructions sent/i)).toBeVisible();
    });
});
