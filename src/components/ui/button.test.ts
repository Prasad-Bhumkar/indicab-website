import { expect, test, describe } from 'bun:test';
import fs from 'fs';
import path from 'path';

describe('Button UI Component', () => {
  test('Button component exists', () => {
    const componentPath = path.join(process.cwd(), 'src/components/ui/button.tsx');
    const exists = fs.existsSync(componentPath);
    expect(exists).toBe(true);
  });

  test('Button has variant styles', () => {
    const componentPath = path.join(process.cwd(), 'src/components/ui/button.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for button variants
    expect(content).toContain('variant');
    expect(content).toContain('default');
    expect(content).toContain('outline');
    expect(content).toContain('secondary');
    expect(content).toContain('ghost');
    expect(content).toContain('link');
  });

  test('Button has size options', () => {
    const componentPath = path.join(process.cwd(), 'src/components/ui/button.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for size options
    expect(content).toContain('size');
    expect(content).toContain('default');
    expect(content).toContain('sm');
    expect(content).toContain('lg');
  });

  test('Button uses Slot from Radix UI', () => {
    const componentPath = path.join(process.cwd(), 'src/components/ui/button.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for Slot usage
    expect(content).toContain('Slot');
    expect(content).toContain('@radix-ui/react-slot');
  });

  test('Button uses className utility', () => {
    const componentPath = path.join(process.cwd(), 'src/components/ui/button.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for CN utility
    expect(content).toContain('cn');
  });
});
