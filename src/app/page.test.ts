import { expect, test, describe } from 'bun:test';
import fs from 'fs';
import path from 'path';

// Test to check if the home page component exists
describe('Home Page', () => {
  test('home page component exists', () => {
    const homePage = fs.existsSync(path.join(process.cwd(), 'src/app/page.tsx'));
    expect(homePage).toBe(true);
  });

  // Test to verify the Hero component is imported in the home page
  test('home page imports Hero component', async () => {
    const homePagePath = path.join(process.cwd(), 'src/app/page.tsx');
    const content = fs.readFileSync(homePagePath, 'utf8');

    expect(content).toContain('Hero');
  });
});
