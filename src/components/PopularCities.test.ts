import { expect, test, describe } from 'bun:test';
import fs from 'fs';
import path from 'path';

describe('PopularCities Component', () => {
  test('PopularCities component exists', () => {
    const componentPath = path.join(process.cwd(), 'src/components/PopularCities.tsx');
    const exists = fs.existsSync(componentPath);
    expect(exists).toBe(true);
  });

  test('PopularCities component contains city links', () => {
    const componentPath = path.join(process.cwd(), 'src/components/PopularCities.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for elements that should exist in city cards
    expect(content).toContain('Link');
    expect(content).toContain('cities.map');
    expect(content).toContain('city');
  });

  test('Component has a section title', () => {
    const componentPath = path.join(process.cwd(), 'src/components/PopularCities.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for a title/heading element
    expect(content).toContain('Service Cities');
  });
});
