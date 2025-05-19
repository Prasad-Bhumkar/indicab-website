import { expect, test } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('homepage should load within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
  });

  test('booking form should be interactive within 2 seconds', async ({ page }) => {
    await page.goto('/booking');
    
    // Measure time to interactive
    const startTime = Date.now();
    await page.waitForSelector('form', { state: 'attached' });
    const interactiveTime = Date.now() - startTime;
    expect(interactiveTime).toBeLessThan(2000);
  });

  test('routes page should load data within 2 seconds', async ({ page }) => {
    await page.goto('/routes');
    
    // Measure time to load routes data
    const startTime = Date.now();
    await page.waitForSelector('[data-testid="route-list"]', { state: 'attached' });
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2000);
  });

  test('should maintain 60fps during animations', async ({ page }) => {
    await page.goto('/');
    
    // Start performance measurement
    await page.evaluate(() => {
      window.performance.mark('animation-start');
    });
    
    // Trigger animation (e.g., opening menu)
    await page.click('[data-testid="menu-button"]');
    
    // Wait for animation to complete
    await page.waitForTimeout(1000);
    
    // Measure frame rate
    const frameRate = await page.evaluate(() => {
      const marks = performance.getEntriesByType('mark');
      const measures = performance.getEntriesByType('measure');
      return measures.length / ((marks[1].startTime - marks[0].startTime) / 1000);
    });
    
    expect(frameRate).toBeGreaterThan(55); // Allow small margin for variance
  });

  test('should not have layout shifts during load', async ({ page }) => {
    await page.goto('/');
    
    // Measure Cumulative Layout Shift (CLS)
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let cls = 0;
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          }
          resolve(cls);
        }).observe({ entryTypes: ['layout-shift'] });
      });
    });
    
    expect(cls).toBeLessThan(0.1); // Good CLS score is less than 0.1
  });

  test('should have good First Input Delay (FID)', async ({ page }) => {
    await page.goto('/');
    
    // Measure FID
    const fid = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          resolve(entries[0].duration);
        }).observe({ entryTypes: ['first-input'] });
      });
    });
    
    expect(fid).toBeLessThan(100); // Good FID is less than 100ms
  });
}); 