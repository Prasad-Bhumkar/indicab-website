import { expect, test, describe } from 'bun:test';
import fs from 'fs';
import path from 'path';

describe('Hero Component', () => {
  test('Hero component exists', () => {
    const componentPath = path.join(process.cwd(), 'src/components/Hero.tsx');
    const exists = fs.existsSync(componentPath);
    expect(exists).toBe(true);
  });

  test('Hero component contains a headline and subtext', () => {
    const componentPath = path.join(process.cwd(), 'src/components/Hero.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for headline elements
    expect(content).toContain('h1');
    expect(content).toContain('p');
  });

  test('Hero has a call-to-action button', () => {
    const componentPath = path.join(process.cwd(), 'src/components/Hero.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for CTA button
    expect(content).toContain('Button');
    expect(content).toContain('Book');
  });
});
