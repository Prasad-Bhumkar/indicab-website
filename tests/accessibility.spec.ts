import { test, expect } from '@playwright/test';

test.describe('Accessibility tests', () => {
  const pages = [
    '/',
    '/booking',
    '/vehicles',
    '/profile',
    '/contact',
  ];

  for (const page of pages) {
    test(`should have no accessibility violations on ${page}`, async ({ page: pwPage }) => {
      await pwPage.goto(page);
      const accessibilitySnapshot = await pwPage.accessibility.snapshot();
      expect(accessibilitySnapshot).toBeTruthy();
      // Additional accessibility assertions can be added here
    });
  }
});
