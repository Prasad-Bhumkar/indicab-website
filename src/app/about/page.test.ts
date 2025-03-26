import { expect, test, describe } from 'bun:test';
import fs from 'fs';
import path from 'path';

describe('About Page', () => {
  test('about page component exists', () => {
    const pagePath = path.join(process.cwd(), 'src/app/about/page.tsx');
    const exists = fs.existsSync(pagePath);
    expect(exists).toBe(true);
  });

  test('about page has company information sections', () => {
    const pagePath = path.join(process.cwd(), 'src/app/about/page.tsx');
    const content = fs.readFileSync(pagePath, 'utf8');

    // Check for typical about page content
    expect(content).toMatch(/mission|vision|values|story|history/i);
    expect(content).toMatch(/about us|company|team/i);
  });

  test('about page has header and footer', () => {
    const pagePath = path.join(process.cwd(), 'src/app/about/page.tsx');
    const content = fs.readFileSync(pagePath, 'utf8');

    // Check for layout components
    expect(content).toContain('Header');
    expect(content).toContain('Footer');
  });

  test('about page has company statistics or highlights', () => {
    const pagePath = path.join(process.cwd(), 'src/app/about/page.tsx');
    const content = fs.readFileSync(pagePath, 'utf8');

    // Check for statistics/metrics
    expect(content).toMatch(/years|drivers|rides|cities|customers/i);
  });
});
