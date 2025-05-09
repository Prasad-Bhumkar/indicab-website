import { expect, test, describe } from 'bun:test';
import fs from 'fs';
import path from 'path';

describe('Footer Component', () => {
  test('Footer component exists', () => {
    const componentPath = path.join(process.cwd(), 'src/components/Footer.tsx');
    const exists = fs.existsSync(componentPath);
    expect(exists).toBe(true);
  });

  test('Footer component has important sections', () => {
    const componentPath = path.join(process.cwd(), 'src/components/Footer.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for footer sections
    expect(content).toContain('footer');
    expect(content).toContain('Link');
    expect(content).toContain('IndiCab');
  });

  test('Footer has links to important pages', () => {
    const componentPath = path.join(process.cwd(), 'src/components/Footer.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for important page links in quickLinks array
    expect(content).toContain("href: '/about'");
    expect(content).toContain("href: '/contact'");
    expect(content).toContain("href: '/privacy'");
    expect(content).toContain("href: '/terms'");
  });
});
