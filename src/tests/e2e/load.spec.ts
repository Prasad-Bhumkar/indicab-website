import { expect, test } from '@playwright/test';

test.describe('Load Tests', () => {
  test('should handle multiple concurrent users', async ({ browser }) => {
    const numUsers = 10;
    const pages = await Promise.all(
      Array(numUsers).fill(null).map(() => browser.newPage())
    );

    try {
      // Simulate multiple users accessing the site simultaneously
      await Promise.all(pages.map(page => page.goto('/')));

      // Check response times
      const responseTimes = await Promise.all(
        pages.map(page => page.evaluate(() => performance.now()))
      );

      // Verify all pages loaded successfully
      for (const page of pages) {
        expect(await page.title()).toBeTruthy();
      }

      // Verify response times are within acceptable range
      const maxResponseTime = Math.max(...responseTimes);
      expect(maxResponseTime).toBeLessThan(5000); // 5 seconds max
    } finally {
      // Clean up
      await Promise.all(pages.map(page => page.close()));
    }
  });

  test('should handle rapid form submissions', async ({ page }) => {
    await page.goto('/booking');
    
    const numSubmissions = 5;
    const submissionPromises = [];

    for (let i = 0; i < numSubmissions; i++) {
      // Fill form
      await page.fill('[name="from"]', 'Delhi');
      await page.fill('[name="to"]', 'Agra');
      await page.fill('[name="date"]', '2024-04-01');
      await page.fill('[name="passengerName"]', `Test User ${i}`);
      await page.fill('[name="passengerPhone"]', '9876543210');
      await page.fill('[name="passengerEmail"]', `test${i}@example.com`);

      // Submit form
      submissionPromises.push(
        page.click('button[type="submit"]')
          .then(() => page.waitForResponse(response => response.url().includes('/api/bookings')))
      );
    }

    // Wait for all submissions to complete
    const responses = await Promise.all(submissionPromises);

    // Verify all submissions were successful
    for (const response of responses) {
      expect(response.status()).toBe(200);
    }
  });

  test('should handle concurrent API requests', async ({ browser }) => {
    const numRequests = 20;
    const page = await browser.newPage();
    await page.goto('/');

    try {
      // Make multiple concurrent API requests
      const requests = Array(numRequests).fill(null).map(() =>
        page.evaluate(() =>
          fetch('/api/routes')
            .then(response => response.json())
        )
      );

      // Wait for all requests to complete
      const responses = await Promise.all(requests);

      // Verify all requests were successful
      for (const response of responses) {
        expect(response.status).toBe('success');
      }

      // Check server response times
      const responseTimes = await page.evaluate(() => {
        const entries = performance.getEntriesByType('resource');
        return entries
          .filter(entry => entry.name.includes('/api/'))
          .map(entry => entry.duration);
      });

      // Verify response times are within acceptable range
      const maxResponseTime = Math.max(...responseTimes);
      expect(maxResponseTime).toBeLessThan(2000); // 2 seconds max
    } finally {
      await page.close();
    }
  });

  test('should maintain performance under load', async ({ page }) => {
    await page.goto('/');
    
    // Start performance measurement
    await page.evaluate(() => {
      window.performance.mark('load-test-start');
    });

    // Simulate user interactions
    for (let i = 0; i < 50; i++) {
      await page.click('[data-testid="menu-button"]');
      await page.waitForTimeout(100);
      await page.click('[data-testid="menu-button"]');
    }

    // Measure performance metrics
    const metrics = await page.evaluate(() => {
      window.performance.mark('load-test-end');
      window.performance.measure('load-test', 'load-test-start', 'load-test-end');
      
      const measure = performance.getEntriesByName('load-test')[0];
      const fps = 50 / (measure.duration / 1000); // 50 interactions / duration in seconds
      
      return {
        duration: measure.duration,
        fps,
        memory: performance.memory?.usedJSHeapSize
      };
    });

    // Verify performance metrics
    expect(metrics.fps).toBeGreaterThan(30); // Maintain at least 30 FPS
    expect(metrics.duration).toBeLessThan(10000); // Complete within 10 seconds
  });
}); 