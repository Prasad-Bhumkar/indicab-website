import type AxeBuilderType from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('homepage should be accessible', async ({ page }) => {
    await page.goto('/');
    const accessibilityScanResults = await (new (AxeBuilder as typeof AxeBuilderType)({ page })).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('booking form should be accessible', async ({ page }) => {
    await page.goto('/booking');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('routes page should be accessible', async ({ page }) => {
    await page.goto('/routes');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('navigation should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement?.getAttribute('role'))).toBe('link');
    
    // Test skip links
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement?.getAttribute('href'))).toBe('#main-content');
  });

  test('form controls should be properly labeled', async ({ page }) => {
    await page.goto('/booking');
    
    // Check form labels
    const formControls = await page.$$('input, select, textarea');
    for (const control of formControls) {
      const id = await control.getAttribute('id');
      const label = await page.$(`label[for="${id}"]`);
      expect(label).not.toBeNull();
    }
  });

  test('color contrast should meet WCAG standards', async ({ page }) => {
    await page.goto('/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'wcag2aaa'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
}); 