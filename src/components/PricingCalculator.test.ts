import { expect, test, describe } from 'bun:test';
import fs from 'fs';
import path from 'path';

describe('PricingCalculator Component', () => {
  test('PricingCalculator component exists', () => {
    const componentPath = path.join(process.cwd(), 'src/components/PricingCalculator.tsx');
    const exists = fs.existsSync(componentPath);
    expect(exists).toBe(true);
  });

  test('PricingCalculator has city selection', () => {
    const componentPath = path.join(process.cwd(), 'src/components/PricingCalculator.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for cities
    expect(content).toContain('cities');
    expect(content).toContain('Mumbai');
    expect(content).toContain('Delhi');
    expect(content).toContain('Bangalore');
  });

  test('PricingCalculator has vehicle type selection', () => {
    const componentPath = path.join(process.cwd(), 'src/components/PricingCalculator.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for vehicle selection
    expect(content).toContain('vehicles');
    expect(content).toContain('Sedan');
    expect(content).toContain('SUV');
    expect(content).toContain('Luxury');
  });

  test('PricingCalculator has route distance data', () => {
    const componentPath = path.join(process.cwd(), 'src/components/PricingCalculator.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for route distances
    expect(content).toContain('routeDistances');
    expect(content).toContain('Mumbai-Pune');
    expect(content).toContain('Delhi-Jaipur');
  });

  test('PricingCalculator has booking button', () => {
    const componentPath = path.join(process.cwd(), 'src/components/PricingCalculator.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for booking action
    expect(content).toContain('Button');
    expect(content).toContain('import { Button }');
  });
});
