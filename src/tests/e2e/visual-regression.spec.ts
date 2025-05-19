import { expect, test } from '@playwright/test';

// Common pages to test
const pages = [
  '/',
  '/login',
  '/register',
  '/bookings',
  '/profile',
  '/vehicles',
];

// Common viewport sizes to test
const viewports = [
  { width: 1920, height: 1080 }, // Desktop
  { width: 1366, height: 768 },  // Laptop
  { width: 768, height: 1024 },  // Tablet
  { width: 375, height: 812 },   // Mobile
];

// Test each page at different viewport sizes
test.describe('Visual Regression Tests', () => {
  for (const page of pages) {
    for (const viewport of viewports) {
      test(`Page ${page} at ${viewport.width}x${viewport.height}`, async ({ page: testPage }) => {
        // Set viewport
        await testPage.setViewportSize(viewport);
        
        // Navigate to page
        await testPage.goto(page);
        
        // Wait for network idle
        await testPage.waitForLoadState('networkidle');
        
        // Take screenshot of full page
        await expect(testPage).toHaveScreenshot(`${page.replace('/', '')}-${viewport.width}x${viewport.height}.png`, {
          fullPage: true,
        });
      });
    }
  }
});

// Test specific components
test.describe('Component Visual Tests', () => {
  test('Header component', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toHaveScreenshot('header.png');
  });

  test('Footer component', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('footer.png');
  });

  test('Navigation menu', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav).toHaveScreenshot('navigation.png');
  });
});

// Test interactive elements
test.describe('Interactive Element Tests', () => {
  test('Button hover states', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('button').first();
    
    // Normal state
    await expect(button).toHaveScreenshot('button-normal.png');
    
    // Hover state
    await button.hover();
    await expect(button).toHaveScreenshot('button-hover.png');
  });

  test('Form input states', async ({ page }) => {
    await page.goto('/login');
    const input = page.locator('input[type="email"]');
    
    // Normal state
    await expect(input).toHaveScreenshot('input-normal.png');
    
    // Focus state
    await input.focus();
    await expect(input).toHaveScreenshot('input-focus.png');
    
    // Error state
    await input.fill('invalid-email');
    await input.blur();
    await expect(input).toHaveScreenshot('input-error.png');
  });
});

// Test responsive design
test.describe('Responsive Design Tests', () => {
  test('Mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    // Closed state
    await expect(page.locator('nav')).toHaveScreenshot('mobile-menu-closed.png');
    
    // Open state
    await page.click('button[aria-label="Open menu"]');
    await expect(page.locator('nav')).toHaveScreenshot('mobile-menu-open.png');
  });
}); 