import { expect, test } from '@playwright/test';

test.describe('Error Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    // Enable error logging
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`Browser console error: ${msg.text()}`);
      }
    });

    // Enable request logging
    page.on('request', request => {
      console.log(`Request: ${request.method()} ${request.url()}`);
    });

    // Enable response logging
    page.on('response', response => {
      console.log(`Response: ${response.status()} ${response.url()}`);
    });
  });

  test('handles component error gracefully', async ({ page }) => {
    // Navigate to a page with a component that might throw an error
    await page.goto('/test-error-page');

    // Verify error boundary is displayed
    await expect(page.getByText('Something went wrong')).toBeVisible();
    await expect(page.getByText('Try Again')).toBeVisible();

    // Test retry functionality
    await page.getByText('Try Again').click();
    await expect(page.getByText('Retry attempt: 1')).toBeVisible();

    // Test error reporting
    await page.getByText('Report Issue').click();
    await expect(page.getByText('Report an Issue')).toBeVisible();
  });

  test('handles API error gracefully', async ({ page }) => {
    // Mock API error
    await page.route('**/api/*', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });

    // Navigate to a page that makes API calls
    await page.goto('/api-test-page');

    // Verify error handling
    await expect(page.getByText('Failed to load data')).toBeVisible();
    await expect(page.getByText('Try Again')).toBeVisible();
  });

  test('handles network error gracefully', async ({ page }) => {
    // Simulate network error
    await page.route('**/*', route => {
      route.abort('failed');
    });

    // Navigate to a page
    await page.goto('/');

    // Verify error handling
    await expect(page.getByText('Network Error')).toBeVisible();
    await expect(page.getByText('Try Again')).toBeVisible();
  });

  test('handles performance degradation', async ({ page }) => {
    // Navigate to a page
    await page.goto('/');

    // Measure performance metrics
    const metrics = await page.evaluate(() => {
      const performance = window.performance;
      return {
        loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
        domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime
      };
    });

    // Verify performance metrics are within acceptable range
    expect(metrics.loadTime).toBeLessThan(3000); // 3 seconds
    expect(metrics.domContentLoaded).toBeLessThan(2000); // 2 seconds
    expect(metrics.firstPaint).toBeLessThan(1000); // 1 second
  });

  test('handles multiple errors in sequence', async ({ page }) => {
    // Navigate to a page with multiple error scenarios
    await page.goto('/multi-error-test');

    // Test first error
    await expect(page.getByText('First Error')).toBeVisible();
    await page.getByText('Try Again').click();

    // Test second error
    await expect(page.getByText('Second Error')).toBeVisible();
    await page.getByText('Try Again').click();

    // Verify retry count
    await expect(page.getByText('Retry attempt: 2')).toBeVisible();
  });

  test('handles error boundary with custom fallback', async ({ page }) => {
    // Navigate to a page with custom error fallback
    await page.goto('/custom-error-page');

    // Verify custom fallback is displayed
    await expect(page.getByText('Custom Error UI')).toBeVisible();
    await expect(page.getByText('Custom Retry Button')).toBeVisible();
  });

  test('handles error reporting flow', async ({ page }) => {
    // Navigate to a page that might error
    await page.goto('/error-reporting-test');

    // Trigger error
    await page.getByText('Trigger Error').click();

    // Open error report dialog
    await page.getByText('Report Issue').click();

    // Fill error report form
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('What happened?').fill('Test error report');

    // Submit error report
    await page.getByText('Submit Report').click();

    // Verify success message
    await expect(page.getByText('Your feedback has been sent. Thank you!')).toBeVisible();
  });

  test('handles error boundary with performance monitoring', async ({ page }) => {
    // Navigate to a page with performance monitoring
    await page.goto('/performance-test');

    // Trigger error
    await page.getByText('Trigger Error').click();

    // Verify performance metrics are recorded
    const metrics = await page.evaluate(() => {
      return window.performance.getEntriesByType('measure')
        .filter(entry => entry.name.includes('error-boundary'))
        .map(entry => ({
          name: entry.name,
          duration: entry.duration
        }));
    });

    expect(metrics).toContainEqual(
      expect.objectContaining({
        name: 'error-boundary-handling'
      })
    );
  });
}); 